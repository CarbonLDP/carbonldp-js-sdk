import { Document } from "../Document/Document";

import { IllegalArgumentError } from "../Errors/IllegalArgumentError";

import { Fragment } from "../Fragment/Fragment";

import { GeneralRegistry } from "../GeneralRegistry/GeneralRegistry";
import { JSONLDConverter } from "../JSONLD/JSONLDConverter";

import { DigestedObjectSchema } from "../ObjectSchema/DigestedObjectSchema";

import { Pointer } from "../Pointer/Pointer";

import { RDFDocument } from "../RDF/Document";
import { RDFNode } from "../RDF/Node";

import { QueryableProperty } from "./QueryableProperty";
import { QueryableRootProperty } from "./QueryableRootProperty";
import { QueryContainer } from "./QueryContainer";
import { QueryProperty2 } from "./QueryProperty2";


interface CompactionNode {
	isCompacted?:true;
	isDocument:boolean;
	registry:Document;
	node:RDFNode;
}

export class QueryResultCompacter {
	private readonly registry:GeneralRegistry<Document>;
	private readonly queryContainer:QueryContainer;

	private get jsonldConverter():JSONLDConverter {
		return this.queryContainer.context.jsonldConverter;
	}

	private readonly compactionMap:Map<string, CompactionNode>;


	constructor( registry:GeneralRegistry<Document>, queryContainer:QueryContainer ) {
		this.registry = registry;
		this.queryContainer = queryContainer;

		this.compactionMap = new Map();
	}

	compactDocuments<T extends object>( rdfDocuments:RDFDocument[], targetDocuments?:string[] ):(T & Document)[] {
		if( ! targetDocuments )
			targetDocuments = rdfDocuments.map( x => x[ "@id" ] );

		rdfDocuments.forEach( rdfDocument => {
			const registry:Document = this.registry.getPointer( rdfDocument[ "@id" ], true );


			const previousFragments:Set<string> = new Set();
			registry
				.$getPointers( true )
				.forEach( pointer => previousFragments.add( pointer.$id ) );


			rdfDocument[ "@graph" ].forEach( rdfNode => {
				const nodeID:string = rdfNode[ "@id" ];
				const isDocument:boolean = nodeID === rdfDocument[ "@id" ];

				this.compactionMap.set( nodeID, {
					node: rdfNode,
					registry,
					isDocument,
				} );

				// Remove updated fragments
				if( ! isDocument ) previousFragments.delete( nodeID );
			} );

			// Delete not updated fragments
			previousFragments
				.forEach( pointer => registry.$removePointer( pointer ) );
		} );

		targetDocuments.forEach( documentID => {
			const compactionNode:CompactionNode | undefined = this.compactionMap.get( documentID );
			if( ! compactionNode ) throw new IllegalArgumentError( `Invalid data provided.` );

			const targetProperty:QueryProperty2 = this.queryContainer._queryProperty;
			const metadataProperty:QueryableProperty = new QueryableProperty( targetProperty );

			this.__processNode2( compactionNode, targetProperty, metadataProperty );
		} );

		// Compact missing resources
		this.compactionMap.forEach( ( { node, registry, isCompacted } ) => {
			if( isCompacted ) return;

			const resource:object = registry.$getPointer( node[ "@id" ] );
			const targetSchema:DigestedObjectSchema = this.queryContainer.context.registry.getSchemaFor( node );

			this.jsonldConverter.update( resource, node, targetSchema, registry );
		} );

		// Finish all documents after all compactions
		this.compactionMap.forEach( ( { node, registry } ) => {
			const resource:Document | Fragment = registry.$getPointer( node[ "@id" ] ) as any;
			this.registry.decorate( resource );
			resource.$_syncSnapshot();
		} );

		return targetDocuments.map( documentID => {
			const document:Document = this.registry.getPointer( documentID, true );
			return document as T & Document;
		} );
	}


	private __processNode2( compactionNode:CompactionNode, queryProperty:QueryProperty2, metadataProperty:QueryableProperty ):void {
		compactionNode.isCompacted = true;
		const { node, registry } = compactionNode;

		const resource:Document | Fragment = registry.$getPointer( node[ "@id" ] ) as any;

		const isPartial:boolean = queryProperty._isPartial();
		if( isPartial ) {
			metadataProperty = resource.$_queryableMetadata
				? resource.$_queryableMetadata
				: resource.$_queryableMetadata = new QueryableRootProperty( {
					uri: resource.$id,
					propertyType: queryProperty.propertyType,
				} );
		}

		const targetSchema:DigestedObjectSchema = queryProperty.getSchemaFor( node );
		this.jsonldConverter.update( resource, node, targetSchema, registry, isPartial );


		queryProperty.subProperties.forEach( subQueryProperty => {
			// Is virtual property
			if( resource.hasOwnProperty( subQueryProperty.name ) && subQueryProperty.pathBuilderFn ) {
				Object.defineProperty( resource, subQueryProperty.name, {
					enumerable: false,
					configurable: true,
					writable: true,
				} );
			}

			const subMetadataProperty:QueryableProperty = metadataProperty
				.getProperty( subQueryProperty );

			if( ! resource.hasOwnProperty( subQueryProperty.name ) ) return;
			if( subQueryProperty.propertyType === void 0 ) return;

			const values:any[] = Array.isArray( resource[ subQueryProperty.name ] )
				? resource[ subQueryProperty.name ]
				: [ resource[ subQueryProperty.name ] ];

			values.forEach( value => {
				if( ! Pointer.is( value ) ) return;

				const subCompactionNode:CompactionNode | undefined = this.compactionMap.get( value.$id );
				if( ! subCompactionNode ) throw new IllegalArgumentError( `Invalid data provided.` );

				// Clear property since sub-document will no longer be part of the query
				if( subCompactionNode.isDocument ) subMetadataProperty.propertyType = void 0;

				this.__processNode2( subCompactionNode, subQueryProperty, subMetadataProperty );
			} );

		} );
	}

}
