import {
	DigestedObjectSchema,
	Resolver
} from "../ObjectSchema";
import * as PersistedDocument from "../PersistedDocument";
import * as PersistedResource from "../PersistedResource";
import * as Pointer from "../Pointer";
import * as RDFDocument from "../RDF/Document";
import * as RDFNode from "../RDF/Node";
import { Util as URIUtils } from "../RDF/URI";
import {
	PartialMetadata,
	QueryContextBuilder,
	QueryProperty
} from "../SPARQL/QueryDocument";
import * as Documents from "./../Documents";
import * as Converter from "./Converter";

function getRelativeID( node:RDFNode.Class ):string {
	const id:string = node[ "@id" ];
	return URIUtils.hasFragment( id ) ? URIUtils.getFragment( id ) : id;
}

interface CompactionNode {
	path:string;
	node:RDFNode.Class;
	resource:PersistedResource.Class;
	containerLibrary:Pointer.Library;
	added?:boolean;
}

export class Class {
	private documents:Documents.Class;
	private root:string;
	private resolver?:Resolver;
	private converter?:Converter.Class;
	private compactionMap:Map<string, CompactionNode>;

	constructor( documents:Documents.Class, root?:string, schemaResolver?:Resolver, jsonldConverter?:Converter.Class ) {
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
			.map( compactionNode => compactionNode.resource as any );

		this.processCompactionQueue( compactionQueue );
		while( this.compactionMap.size ) {
			const first:string = this.compactionMap.keys().next().value;
			this.processCompactionQueue( [ first ] );
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

	compactNode( node:RDFNode.Class, resource:PersistedResource.Class, containerLibrary:Pointer.Library, path:string ):void {
		const schema:DigestedObjectSchema = this.resolver.getSchemaFor( node, path );
		const compactedData:object = this.converter.compact( node, {}, schema, containerLibrary );

		new Set( [
			...Object.keys( resource ),
			...Object.keys( compactedData ),
		] ).forEach( key => {
			if( ! compactedData.hasOwnProperty( key ) ) {
				if( ! resource.isPartial() || schema.properties.has( key ) ) delete resource[ key ];
				return;
			}

			if( ! Array.isArray( resource[ key ] ) ) {
				resource[ key ] = compactedData[ key ];
				return;
			}

			const values:any[] = Array.isArray( compactedData[ key ] ) ? compactedData[ key ] : [ compactedData[ key ] ];
			resource[ key ].length = 0;
			resource[ key ].push( ...values );
		} );

		if( this.resolver instanceof QueryContextBuilder.Class ) {
			if( ! this.resolver.isPartial( path ) ) return;
			resource._partialMetadata = new PartialMetadata.Class( schema, resource._partialMetadata );
		}
	}

	private getResource<T extends PersistedResource.Class>( node:RDFNode.Class, containerLibrary:Pointer.Library, isDocument?:boolean ):T {
		const resource:T = containerLibrary.getPointer( node[ "@id" ] ) as any;

		if( isDocument ) containerLibrary = PersistedDocument.Factory.decorate( resource, this.documents );
		this.compactionMap.set( resource.id, { path: this.root, node, resource, containerLibrary } );

		return resource;
	}

	private processCompactionQueue( compactionQueue:string[] ):void {
		while( compactionQueue.length ) {
			const targetNode:string = compactionQueue.shift();

			const compactionNode:CompactionNode = this.compactionMap.get( targetNode );
			this.compactionMap.delete( targetNode );

			this.compactNode( compactionNode.node, compactionNode.resource, compactionNode.containerLibrary, compactionNode.path );
			compactionNode.resource._syncSnapshot();

			for( const propertyName in compactionNode.resource ) {
				if( ! compactionNode.resource.hasOwnProperty( propertyName ) ) continue;

				const value:any = compactionNode.resource[ propertyName ];
				const values:any[] = Array.isArray( value ) ? value : [ value ];

				const pointers:Pointer.Class[] = values.filter( Pointer.Factory.is );
				for( const pointer of pointers ) {
					const subCompactionNode:CompactionNode = this.compactionMap.get( pointer.id );
					if( ! subCompactionNode || subCompactionNode.added ) continue;

					const parentPath:string = compactionNode.path ? `${ compactionNode.path }.` : "";
					subCompactionNode.path = parentPath + propertyName;
					subCompactionNode.added = true;

					compactionQueue.push( pointer.id );
				}
			}
		}
	}

}

export default Class;
