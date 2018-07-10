import { Document } from "../Document";
import { IllegalArgumentError } from "../Errors";
import {
	DigestedObjectSchema,
	ObjectSchemaResolver,
} from "../ObjectSchema";
import {
	Pointer,
	PointerLibrary,
} from "../Pointer";
import {
	PartialMetadata,
	QueryContextBuilder,
	QueryPropertyType,
} from "../QueryDocument";
import { QueryContextPartial } from "../QueryDocument/";
import {
	RDFDocument,
	RDFNode,
} from "../RDF";
import {
	DocumentsRegistry,
	RegisteredPointer,
	Registry
} from "../Registry";
import { ResolvablePointer } from "../Repository";
import { JSONLDConverter } from "./Converter";


interface CompactionNode {
	paths:string[];
	node:RDFNode;
	resource:ResolvablePointer;
	registry:Registry<any>;
	processed?:boolean;
}

export class JSONLDCompacter {
	private readonly registry:DocumentsRegistry;
	private readonly root?:string;
	private readonly resolver?:ObjectSchemaResolver;
	private readonly converter?:JSONLDConverter;
	private readonly compactionMap:Map<string, CompactionNode>;


	constructor( registry:DocumentsRegistry, root?:string, schemaResolver?:ObjectSchemaResolver, jsonldConverter?:JSONLDConverter ) {
		this.registry = registry;

		this.root = root;
		this.resolver = schemaResolver || registry;
		this.converter = jsonldConverter || registry.$context.jsonldConverter;
		this.compactionMap = new Map();
	}

	compactDocument<T extends object>( rdfDocument:RDFDocument ):T & Document {
		const rdfDocuments:RDFDocument[] = [ rdfDocument ];
		return this.compactDocuments<T>( rdfDocuments )[ 0 ];
	}

	compactDocuments<T extends object>( rdfDocuments:RDFDocument[], mainDocuments:RDFDocument[] = rdfDocuments ):(T & Document)[] {
		rdfDocuments.forEach( rdfDocument => {
			const [ documentNodes, fragmentNodes ] = RDFDocument.getNodes( rdfDocument );

			if( documentNodes.length === 0 ) throw new IllegalArgumentError( `The RDFDocument "${ rdfDocument[ "@id" ] }" does not contain a document resource.` );
			if( documentNodes.length > 1 ) throw new IllegalArgumentError( `The RDFDocument "${ rdfDocument[ "@id" ] }" contains multiple document resources.` );
			const documentNode:RDFNode = documentNodes[ 0 ];

			const targetDocument:Document = this._getResource( documentNode, this.registry );

			const currentFragments:string[] = targetDocument
				.getPointers( true )
				.map( pointer => pointer.$id )
			;

			const newFragments:string[] = fragmentNodes
				.map( fragmentNode => this._getResource( fragmentNode, targetDocument ) )
				.map( fragment => fragment.$id )
			;

			const newFragmentsSet:Set<string> = new Set( newFragments );
			currentFragments
				.filter( id => ! newFragmentsSet.has( id ) )
				.forEach( id => targetDocument.removePointer( id ) )
			;
		} );

		const compactedDocuments:Document[] = rdfDocuments
			.map( rdfDocument => rdfDocument[ "@id" ] )
			.map( this.compactionMap.get, this.compactionMap )
			.map( compactionNode => compactionNode.resource as any );

		const compactionQueue:string[] = mainDocuments
			.map( rdfDocument => rdfDocument[ "@id" ] );

		const mainCompactedDocuments:(T & Document)[] = compactionQueue
			.map( this.compactionMap.get, this.compactionMap )
			.map( compactionNode => {
				if( this.root ) compactionNode.paths.push( this.root );

				return compactionNode.resource as any;
			} );

		while( compactionQueue.length ) {
			this._processCompactionQueue( compactionQueue );

			this.compactionMap.forEach( ( node, key, map ) => {
				if( node.processed ) map.delete( key );
			} );

			if( this.compactionMap.size ) compactionQueue
				.push( this.compactionMap.keys().next().value );
		}

		compactedDocuments.forEach( persistedDocument => {
			persistedDocument._syncSavedFragments();
			this.registry.decorate( persistedDocument );
		} );

		return mainCompactedDocuments;
	}


	private _compactNode( node:RDFNode, resource:ResolvablePointer, containerLibrary:PointerLibrary, path:string ):string[] {
		const schema:DigestedObjectSchema = this.resolver.getSchemaFor( node, path );

		const isPartial:boolean = this._setOrRemovePartial( resource, schema, path );

		const compactedData:object = this.converter.compact( node, {}, schema, containerLibrary, isPartial );

		const addedProperties:string[] = [];
		new Set( [
			...Object.keys( resource ),
			...Object.keys( compactedData ),
		] ).forEach( key => {
			if( ! compactedData.hasOwnProperty( key ) ) {
				if( ! isPartial || schema.properties.has( key ) ) delete resource[ key ];
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

	private _getResource<M extends ResolvablePointer & RegisteredPointer>( node:RDFNode, registry:Registry<M> ):M {
		const resource:M = registry.getPointer( node[ "@id" ], true );

		if( Registry.isDecorated( resource ) ) registry = resource;

		this.compactionMap
			.set( resource.$id, { paths: [], node, resource, registry } );

		return resource;
	}

	private _processCompactionQueue( compactionQueue:string[] ):void {
		while( compactionQueue.length ) {
			const targetNode:string = compactionQueue.shift();

			if( ! this.compactionMap.has( targetNode ) ) continue;
			const compactionNode:CompactionNode = this.compactionMap.get( targetNode );
			compactionNode.processed = true;

			const targetPath:string = compactionNode.paths.shift();

			const addedProperties:string[] = this._compactNode( compactionNode.node, compactionNode.resource, compactionNode.registry, targetPath );
			compactionNode.resource._syncSnapshot();

			for( const propertyName of addedProperties ) {
				if( ! compactionNode.resource.hasOwnProperty( propertyName ) ) continue;

				const value:any = compactionNode.resource[ propertyName ];
				const values:any[] = Array.isArray( value ) ? value : [ value ];

				const pointers:Pointer[] = values.filter( Pointer.is );
				for( const pointer of pointers ) {
					if( ! this.compactionMap.has( pointer.$id ) ) continue;
					const subCompactionNode:CompactionNode = this.compactionMap.get( pointer.$id );

					if( targetPath ) {
						const subPath:string = `${ targetPath }.${ propertyName }`;
						if( ! this.resolver.hasSchemaFor( subCompactionNode.node, subPath ) ) continue;

						subCompactionNode.paths.push( subPath );
						compactionQueue.push( pointer.$id );
					}
				}
			}
		}
	}


	private _setOrRemovePartial( resource:ResolvablePointer, schema:DigestedObjectSchema, path:string ):boolean {
		if( this._willBePartial( resource, schema, path ) ) return true;

		if( resource.__partialMetadata ) delete resource.__partialMetadata;
		return false;
	}

	private _willBePartial( resource:ResolvablePointer, schema:DigestedObjectSchema, path:string ):boolean {
		if( this.resolver instanceof QueryContextPartial ) return true;
		if( ! (this.resolver instanceof QueryContextBuilder) ) return false;

		const type:QueryPropertyType = this.resolver.hasProperty( path ) ?
			this.resolver.getProperty( path ).getType() : void 0;

		if( type !== QueryPropertyType.PARTIAL && type !== QueryPropertyType.ALL ) return false;

		resource.__partialMetadata = new PartialMetadata(
			type === QueryPropertyType.ALL ? PartialMetadata.ALL : schema,
			resource.__partialMetadata
		);
		return true;
	}

}
