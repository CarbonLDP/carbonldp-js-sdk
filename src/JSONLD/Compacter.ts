import { Documents } from "../Documents";
import {
	DigestedObjectSchema,
	ObjectSchemaResolver,
} from "../ObjectSchema";
import * as PersistedDocument from "../PersistedDocument";
import * as PersistedResource from "../PersistedResource";
import {
	Pointer,
	PointerLibrary,
} from "../Pointer";
import * as RDFDocument from "../RDF/Document";
import * as RDFNode from "../RDF/Node";
import { Util as URIUtils } from "../RDF/URI";
import {
	PartialMetadata,
	QueryContextBuilder,
	QueryProperty,
} from "../SPARQL/QueryDocument";
import { JSONLDConverter } from "./Converter";

function getRelativeID( node:RDFNode.Class ):string {
	const id:string = node[ "@id" ];
	return URIUtils.hasFragment( id ) ? URIUtils.getFragment( id ) : id;
}

interface CompactionNode {
	paths:string[];
	node:RDFNode.Class;
	resource:PersistedResource.Class;
	containerLibrary:PointerLibrary;
	processed?:boolean;
}

export class JSONLDCompacter {
	private documents:Documents;
	private root?:string;
	private resolver?:ObjectSchemaResolver;
	private converter?:JSONLDConverter;
	private compactionMap:Map<string, CompactionNode>;

	constructor( documents:Documents, root?:string, schemaResolver?:ObjectSchemaResolver, jsonldConverter?:JSONLDConverter ) {
		this.documents = documents;
		this.root = root;
		this.resolver = schemaResolver || documents;
		this.converter = jsonldConverter || documents.jsonldConverter;
		this.compactionMap = new Map();
	}

	compactDocument<T extends PersistedDocument.Class>( rdfDocument:RDFDocument.Class ):T {
		const rdfDocuments:RDFDocument.Class[] = [ rdfDocument ];
		return this.compactDocuments<T>( rdfDocuments )[ 0 ];
	}

	compactDocuments<T extends PersistedDocument.Class>( rdfDocuments:RDFDocument.Class[], mainDocuments:RDFDocument.Class[] = rdfDocuments ):T[] {
		rdfDocuments.forEach( rdfDocument => {
			const [ [ documentNode ], fragmentNodes ] = RDFDocument.Util.getNodes( rdfDocument );
			const targetDocument:PersistedDocument.Class = this.getResource( documentNode, this.documents, true );

			const fragmentsSet:Set<string> = new Set( targetDocument._fragmentsIndex.keys() );

			fragmentNodes.forEach( fragmentNode => {
				const fragmentID:string = getRelativeID( fragmentNode );
				if( fragmentsSet.has( fragmentID ) ) fragmentsSet.delete( fragmentID );

				this.getResource( fragmentNode, targetDocument );
			} );

			fragmentsSet.forEach( targetDocument._removeFragment, targetDocument );
		} );

		const compactedDocuments:PersistedDocument.Class[] = rdfDocuments
			.map( rdfDocument => rdfDocument[ "@id" ] )
			.map( this.compactionMap.get, this.compactionMap )
			.map( compactionNode => compactionNode.resource as any );

		const compactionQueue:string[] = mainDocuments
			.map( rdfDocument => rdfDocument[ "@id" ] );

		const mainCompactedDocuments:T[] = compactionQueue
			.map( this.compactionMap.get, this.compactionMap )
			.map( compactionNode => {
				if( this.root ) compactionNode.paths.push( this.root );

				return compactionNode.resource as any;
			} );

		while( compactionQueue.length ) {
			this.processCompactionQueue( compactionQueue );

			this.compactionMap.forEach( ( node, key, map ) => {
				if( node.processed ) map.delete( key );
			} );

			if( this.compactionMap.size ) compactionQueue
				.push( this.compactionMap.keys().next().value );
		}

		compactedDocuments.forEach( persistedDocument => {
			persistedDocument._syncSavedFragments();
			persistedDocument._resolved = true;

			persistedDocument.types
				.map( type => this.documents.documentDecorators.get( type ) )
				.forEach( decorator => decorator && decorator.call( void 0, persistedDocument, this.documents ) );
		} );

		return mainCompactedDocuments;
	}

	private compactNode( node:RDFNode.Class, resource:PersistedResource.Class, containerLibrary:PointerLibrary, path:string ):string[] {
		const schema:DigestedObjectSchema = this.resolver.getSchemaFor( node, path );

		if( this.resolver instanceof QueryContextBuilder.Class ) {
			const type:QueryProperty.PropertyType = this.resolver.hasProperty( path ) ?
				this.resolver.getProperty( path ).getType() : void 0;

			if( type === QueryProperty.PropertyType.PARTIAL || type === QueryProperty.PropertyType.ALL ) {
				resource._partialMetadata = new PartialMetadata.Class(
					type === QueryProperty.PropertyType.ALL ? PartialMetadata.ALL : schema,
					resource._partialMetadata
				);
			}
		}

		const compactedData:object = this.converter.compact( node, {}, schema, containerLibrary, resource.isPartial() );

		const addedProperties:string[] = [];

		new Set( [
			...Object.keys( resource ),
			...Object.keys( compactedData ),
		] ).forEach( key => {
			if( ! compactedData.hasOwnProperty( key ) ) {
				if( ! resource.isPartial() || schema.properties.has( key ) ) delete resource[ key ];
				return;
			}

			addedProperties.push( key );

			if( ! Array.isArray( resource[ key ] ) ) {
				resource[ key ] = compactedData[ key ];
				return;
			}

			const values:any[] = Array.isArray( compactedData[ key ] ) ? compactedData[ key ] : [ compactedData[ key ] ];
			resource[ key ].length = 0;
			resource[ key ].push( ...values );
		} );

		return addedProperties
			.filter( x => schema.properties.has( x ) )
			;
	}

	private getResource<T extends PersistedResource.Class>( node:RDFNode.Class, containerLibrary:PointerLibrary, isDocument?:boolean ):T {
		const resource:T = containerLibrary.getPointer( node[ "@id" ] ) as any;

		if( isDocument ) containerLibrary = PersistedDocument.Factory.decorate( resource, this.documents );
		this.compactionMap.set( resource.id, { paths: [], node, resource, containerLibrary } );

		return resource;
	}

	private processCompactionQueue( compactionQueue:string[] ):void {
		while( compactionQueue.length ) {
			const targetNode:string = compactionQueue.shift();

			if( ! this.compactionMap.has( targetNode ) ) continue;
			const compactionNode:CompactionNode = this.compactionMap.get( targetNode );
			compactionNode.processed = true;

			const targetPath:string = compactionNode.paths.shift();

			const addedProperties:string[] = this.compactNode( compactionNode.node, compactionNode.resource, compactionNode.containerLibrary, targetPath );
			compactionNode.resource._syncSnapshot();

			for( const propertyName of addedProperties ) {
				if( ! compactionNode.resource.hasOwnProperty( propertyName ) ) continue;

				const value:any = compactionNode.resource[ propertyName ];
				const values:any[] = Array.isArray( value ) ? value : [ value ];

				const pointers:Pointer[] = values.filter( Pointer.is );
				for( const pointer of pointers ) {
					if( ! this.compactionMap.has( pointer.id ) ) continue;
					const subCompactionNode:CompactionNode = this.compactionMap.get( pointer.id );

					if( targetPath ) {
						const subPath:string = `${ targetPath }.${ propertyName }`;
						if( ! this.resolver.hasSchemaFor( subCompactionNode.node, subPath ) ) continue;

						subCompactionNode.paths.push( subPath );
						compactionQueue.push( pointer.id );
					}
				}
			}
		}
	}

}

export default JSONLDCompacter;
