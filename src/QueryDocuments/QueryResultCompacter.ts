import { Document } from "../Document/Document";

import { IllegalArgumentError } from "../Errors/IllegalArgumentError";

import { GeneralRegistry } from "../GeneralRegistry/GeneralRegistry";

import { DigestedObjectSchema } from "../ObjectSchema/DigestedObjectSchema";

import { Pointer } from "../Pointer/Pointer";
import { $PointerLibrary, PointerLibrary } from "../Pointer/PointerLibrary";

import { RDFDocument } from "../RDF/Document";
import { RDFNode } from "../RDF/Node";

import { RegisteredPointer } from "../Registry/RegisteredPointer";
import { $Registry, _getPointer, Registry } from "../Registry/Registry";

import { QueryableMetadata } from "./QueryableMetadata";
import { QueryablePointer } from "./QueryablePointer";
import { QueryContainer } from "./QueryContainer";
import { QueryProperty2 } from "./QueryProperty2";


interface CompactionNode {
	paths:string[];
	node:RDFNode;
	resource:QueryablePointer;
	registry:Registry<any> | $Registry<any>;
	processed?:boolean;
}

export class QueryResultCompacter {
	private readonly registry:GeneralRegistry<Document>;
	private readonly queryContainer:QueryContainer;

	private readonly compactionMap:Map<string, CompactionNode>;


	constructor( registry:GeneralRegistry<Document>, queryContainer:QueryContainer ) {
		this.registry = registry;
		this.queryContainer = queryContainer;

		this.compactionMap = new Map();
	}

	compactDocuments<T extends object>( rdfDocuments:RDFDocument[], targetDocuments:string[] ):(T & Document)[] {
		const documents:Document[] = rdfDocuments.map( rdfDocument => {
			const [ documentNodes, fragmentNodes ] = RDFDocument.getNodes( rdfDocument );

			if( documentNodes.length === 0 ) throw new IllegalArgumentError( `The RDFDocument "${ rdfDocument[ "@id" ] }" does not contain a document resource.` );
			if( documentNodes.length > 1 ) throw new IllegalArgumentError( `The RDFDocument "${ rdfDocument[ "@id" ] }" contains multiple document resources.` );

			const document:Document = this.__getResource( documentNodes[ 0 ], this.registry );
			this.__processFragments( document, fragmentNodes );

			return document;
		} );

		const compactionQueue:string[] = targetDocuments;

		const mainCompactedDocuments:(T & Document)[] = compactionQueue
			.map( this.compactionMap.get, this.compactionMap )
			.map( compactionNode => compactionNode.resource as any );

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


	private __processNode( compactionNode:CompactionNode, path:string ):string[] {
		const property:QueryProperty2 | undefined = this.queryContainer
			._queryProperty.getProperty( path, { create: true, inherit: false } );

		if( ! property || property.isVoid() ) return [];

		const targetSchema:DigestedObjectSchema = property.isEmpty() || property.isPartial()
			? property.getSchema()
			: this.queryContainer.context.registry.getSchemaFor( compactionNode.node );

		const partialSchema:DigestedObjectSchema | undefined = property.isPartial()
			? targetSchema
			: property.isAll()
				? QueryableMetadata.ALL
				: void 0;

		return this.__compactNode( compactionNode.node, compactionNode.resource, compactionNode.registry, targetSchema, partialSchema );
	}

	private __compactNode( node:RDFNode, resource:QueryablePointer, containerLibrary:PointerLibrary | $PointerLibrary, targetSchema:DigestedObjectSchema, partialSchema?:DigestedObjectSchema ):string[] {
		if( partialSchema ) {
			resource.$_queryableMetadata = new QueryableMetadata( partialSchema, resource.$_queryableMetadata );
		} else {
			resource.$_queryableMetadata = void 0;
		}

		const compactedData:object = this.queryContainer.context.jsonldConverter
			.compact( node, {}, targetSchema, containerLibrary, ! ! partialSchema );

		const addedProperties:string[] = [];
		new Set( [
			...Object.keys( resource ),
			...Object.keys( compactedData ),
		] ).forEach( key => {
			if( ! compactedData.hasOwnProperty( key ) ) {
				if( ! partialSchema || targetSchema.properties.has( key ) ) delete resource[ key ];
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
			.filter( x => targetSchema.properties.has( x ) )
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
			const addedProperties:string[] = this.__processNode( compactionNode, targetPath );

			for( const propertyName of addedProperties ) {
				if( ! compactionNode.resource.hasOwnProperty( propertyName ) ) continue;

				const value:any = compactionNode.resource[ propertyName ];
				const values:any[] = Array.isArray( value ) ? value : [ value ];

				const pointers:Pointer[] = values.filter( Pointer.is );
				for( const pointer of pointers ) {
					if( ! this.compactionMap.has( pointer.$id ) ) continue;
					const subCompactionNode:CompactionNode = this.compactionMap.get( pointer.$id );

					const subPath:string = targetPath ? `${ targetPath }.${ propertyName }` : propertyName;
					subCompactionNode.paths.push( subPath );
					compactionQueue.push( pointer.$id );
				}
			}
		}
	}

}
