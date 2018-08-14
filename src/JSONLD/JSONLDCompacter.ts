import { Document } from "../Document/Document";

import { IllegalArgumentError } from "../Errors/IllegalArgumentError";

import { GeneralRegistry } from "../GeneralRegistry/GeneralRegistry";

import { DigestedObjectSchema } from "../ObjectSchema/DigestedObjectSchema";
import { ObjectSchemaResolver } from "../ObjectSchema/ObjectSchemaResolver";

import { Pointer } from "../Pointer/Pointer";
import { $PointerLibrary, PointerLibrary } from "../Pointer/PointerLibrary";

import { QueryableMetadata } from "../QueryDocuments/QueryableMetadata";
import { QueryablePointer } from "../QueryDocuments/QueryablePointer";
import { QueryContextBuilder } from "../QueryDocuments/QueryContextBuilder";
import { QueryContextPartial } from "../QueryDocuments/QueryContextPartial";
import { QueryPropertyType } from "../QueryDocuments/QueryProperty";

import { RDFDocument } from "../RDF/Document";
import { RDFNode } from "../RDF/Node";

import { RegisteredPointer } from "../Registry/RegisteredPointer";
import { $Registry, _getPointer, Registry } from "../Registry/Registry";

import { JSONLDConverter } from "./JSONLDConverter";


interface CompactionNode {
	paths:string[];
	node:RDFNode;
	resource:QueryablePointer;
	registry:Registry<any> | $Registry<any>;
	processed?:boolean;
}

export class JSONLDCompacter {
	private readonly registry:GeneralRegistry<Document>;
	private readonly root?:string;
	private readonly resolver?:ObjectSchemaResolver;
	private readonly converter?:JSONLDConverter;
	private readonly compactionMap:Map<string, CompactionNode>;


	constructor( registry:GeneralRegistry<Document>, root?:string, schemaResolver?:ObjectSchemaResolver, jsonldConverter?:JSONLDConverter ) {
		this.registry = registry;

		this.root = root;
		this.resolver = schemaResolver || registry;
		this.converter = jsonldConverter || registry.context.jsonldConverter;
		this.compactionMap = new Map();
	}

	compactDocument<T extends object>( rdfDocument:RDFDocument ):T & Document {
		const rdfDocuments:RDFDocument[] = [ rdfDocument ];
		return this.compactDocuments<T>( rdfDocuments )[ 0 ];
	}

	compactDocuments<T extends object>( rdfDocuments:RDFDocument[], mainDocuments?:RDFDocument[] ):(T & Document)[] {
		if( ! mainDocuments || ! mainDocuments.length ) mainDocuments = rdfDocuments;

		const documents:Document[] = rdfDocuments.map( rdfDocument => {
			const [ documentNodes, fragmentNodes ] = RDFDocument.getNodes( rdfDocument );

			if( documentNodes.length === 0 ) throw new IllegalArgumentError( `The RDFDocument "${ rdfDocument[ "@id" ] }" does not contain a document resource.` );
			if( documentNodes.length > 1 ) throw new IllegalArgumentError( `The RDFDocument "${ rdfDocument[ "@id" ] }" contains multiple document resources.` );

			const document:Document = this.__getResource( documentNodes[ 0 ], this.registry );
			this.__processFragments( document, fragmentNodes );

			return document;
		} );

		const compactionQueue:string[] = mainDocuments
			.map( rdfDocument => rdfDocument[ "@id" ] );

		const mainCompactedDocuments:(T & Document)[] = compactionQueue
			.map( this.compactionMap.get, this.compactionMap )
			.map( compactionNode => {
				if( this.root ) compactionNode.paths.push( this.root );

				return compactionNode.resource as any;
			} );

		while( compactionQueue.length ) {
			this.__processCompactionQueue( compactionQueue );

			this.compactionMap.forEach( ( node, key, map ) => {
				if( node.processed ) map.delete( key );
			} );

			if( this.compactionMap.size ) compactionQueue
				.push( this.compactionMap.keys().next().value );
		}


		documents
			.forEach( persistedDocument => {
				persistedDocument.$_syncSnapshot();
				this.registry.decorate( persistedDocument );
			} );

		return mainCompactedDocuments;
	}


	private __compactNode( node:RDFNode, resource:QueryablePointer, containerLibrary:PointerLibrary | $PointerLibrary, path:string ):string[] {
		const schema:DigestedObjectSchema = this.resolver.getSchemaFor( node, path );

		const isPartial:boolean = this.__setOrRemovePartial( resource, schema, path );

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

	private __getResource<M extends QueryablePointer & RegisteredPointer>( node:RDFNode, registry:Registry<M> | $Registry<M> ):M {
		const resource:M = _getPointer( registry, node[ "@id" ], true );

		if( Registry.isDecorated( resource ) ) registry = resource;

		this.compactionMap
			.set( resource.$id, { paths: [], node, resource, registry } );

		return resource;
	}


	private __processFragments( document:Document, fragmentNodes:RDFNode[] ):void {
		const currentFragments:string[] = document
			.$getPointers( true )
			.map( pointer => pointer.$id )
		;

		const newFragments:string[] = fragmentNodes
			.map( fragmentNode => this.__getResource( fragmentNode, document ) )
			.map( fragment => fragment.$id )
		;

		const newFragmentsSet:Set<string> = new Set( newFragments );
		currentFragments
			.filter( id => ! newFragmentsSet.has( id ) )
			.forEach( id => document.$removePointer( id ) )
		;
	}


	private __processCompactionQueue( compactionQueue:string[] ):void {
		while( compactionQueue.length ) {
			const targetNode:string = compactionQueue.shift();

			if( ! this.compactionMap.has( targetNode ) ) continue;
			const compactionNode:CompactionNode = this.compactionMap.get( targetNode );
			compactionNode.processed = true;

			const targetPath:string = compactionNode.paths.shift();

			const addedProperties:string[] = this.__compactNode( compactionNode.node, compactionNode.resource, compactionNode.registry, targetPath );

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


	private __setOrRemovePartial( resource:QueryablePointer, schema:DigestedObjectSchema, path:string ):boolean {
		if( this.__willBePartial( resource, schema, path ) ) return true;

		if( resource.$_queryableMetadata ) resource.$_queryableMetadata = void 0;
		return false;
	}

	private __willBePartial( resource:QueryablePointer, schema:DigestedObjectSchema, path:string ):boolean {
		if( this.resolver instanceof QueryContextPartial ) return true;
		if( ! (this.resolver instanceof QueryContextBuilder) ) return false;

		const type:QueryPropertyType = this.resolver.hasProperty( path ) ?
			this.resolver.getProperty( path ).getType() : void 0;

		if( type !== QueryPropertyType.PARTIAL && type !== QueryPropertyType.ALL ) return false;

		resource.$_queryableMetadata = new QueryableMetadata(
			type === QueryPropertyType.ALL ? QueryableMetadata.ALL : schema,
			resource.$_queryableMetadata
		);
		return true;
	}

}
