import { Document } from "../Document/Document";

import { IllegalArgumentError } from "../Errors/IllegalArgumentError";

import { GeneralRegistry } from "../GeneralRegistry/GeneralRegistry";

import { JSONLDConverter } from "../JSONLD/JSONLDConverter";

import { DigestedObjectSchema } from "../ObjectSchema/DigestedObjectSchema";
import { DigestedObjectSchemaProperty } from "../ObjectSchema/DigestedObjectSchemaProperty";

import { Pointer } from "../Pointer/Pointer";
import { PointerLibrary } from "../Pointer/PointerLibrary";

import { RDFDocument } from "../RDF/Document";
import { RDFNode } from "../RDF/Node";

import { C } from "../Vocabularies/C";
import { XSD } from "../Vocabularies/XSD";

import { QueryablePointer } from "./QueryablePointer";
import { QueryableProperty } from "./QueryableProperty";
import { QueryableRootProperty } from "./QueryableRootProperty";
import { QueryContainer } from "./QueryContainer";
import { QueryProperty } from "./QueryProperty";
import { QueryPropertyType } from "./QueryPropertyType";


interface CompactionNode {
	isCompacted?:true;
	document:Document;
	node:RDFNode;
	resource:QueryablePointer & { types?:string[] };
}

/**
 * Class for compacting a set of RDF resources by level of relations.
 */
export class QueryResultCompacter {

	private get jsonldConverter():JSONLDConverter {
		return this.queryContainer.context.jsonldConverter;
	}

	private readonly registry:GeneralRegistry<Document>;
	private readonly queryContainer:QueryContainer;


	constructor( registry:GeneralRegistry<Document>, queryContainer:QueryContainer ) {
		this.registry = registry;
		this.queryContainer = queryContainer;
	}

	/**
	 * Returns the resources as documents converted from the JSON-LD data provided.
	 * @param rdfDocuments All the RDF documents returned by the query.
	 * @param targetDocuments The main resources that will be set as the roots of the compaction.
	 */
	compactDocuments<T extends object>( rdfDocuments:RDFDocument[], targetDocuments?:string[] ):(T & Document)[] {
		if( ! targetDocuments )
			targetDocuments = rdfDocuments.map( x => x[ "@id" ] );

		// Map that stores all the resources provided to be compacted
		const compactionMap:Map<string, CompactionNode> = new Map();

		rdfDocuments.forEach( rdfDocument => {
			const document:Document = this.registry.getPointer( rdfDocument[ "@id" ], true );

			// Temporally set as a partial document
			if( ! document.$_queryableMetadata ) {
				document.$_queryableMetadata = new QueryableRootProperty( {
					uri: document.$id,
					propertyType: QueryPropertyType.PARTIAL,
				} );
			}


			// Previous defined fragments
			const previousFragments:Set<string> = new Set();
			document
				.$getPointers( true )
				.forEach( pointer => previousFragments.add( pointer.$id ) );


			rdfDocument[ "@graph" ].forEach( rdfNode => {
				const nodeID:string = rdfNode[ "@id" ];

				// Get fragment of the same document
				const resource:QueryablePointer = nodeID !== rdfDocument[ "@id" ]
					? document.$getPointer( nodeID, true )
					: document;

				compactionMap.set( nodeID, {
					node: rdfNode,
					document: document,
					resource: resource,
				} );

				// Remove updated fragments
				previousFragments.delete( nodeID );
			} );

			// Delete not updated fragments
			previousFragments
				.forEach( pointer => document.$removePointer( pointer ) );
		} );


		// Compact starting form the target documents
		targetDocuments.forEach( documentID => {
			const compactionNode:CompactionNode | undefined = compactionMap.get( documentID );
			if( ! compactionNode ) throw new IllegalArgumentError( `Invalid data provided.` );

			const queryProperty:QueryProperty = this.queryContainer._queryProperty;
			const metadataProperty:QueryableProperty = compactionNode.resource.$_queryableMetadata!;

			this.__processNode( compactionMap, compactionNode, queryProperty, metadataProperty );
		} );

		compactionMap.forEach( ( { node, resource, document, isCompacted } ) => {
			// Compact missing resources
			if( ! isCompacted ) {
				const targetSchema:DigestedObjectSchema = this.queryContainer.context.registry.getSchemaFor( node );
				this.jsonldConverter.update( resource, node, targetSchema, document );

				// Remove possible metadata
				resource.$_queryableMetadata = void 0;
			}

			// Decorate models
			this.registry.decorate( resource );
		} );

		rdfDocuments
			.map( RDFNode.getID )
			.map( id => compactionMap.get( id ) )
			.filter( compactionNode => compactionNode )
			.forEach( ( { resource, node } ) => {
				// Sync documents (and its fragments)
				resource.$_syncSnapshot();


				// Extract checksum to eTag

				const rawValues:RDFNode[ any ] | undefined = node[ C.checksum ];
				if( ! rawValues || typeof rawValues === "string" ) return;

				const [ eTag ] = RDFNode.getPropertyLiterals( rawValues, XSD.string );
				if( ! eTag ) return;

				resource.$eTag = `"${ eTag }"`;
				resource.$_resolved = true;
			} )
		;

		return targetDocuments.map( id => {
			return compactionMap
				.get( id )
				.resource as T & Document;
		} );
	}


	private __processNode( compactionMap:Map<string, CompactionNode>, compactionNode:CompactionNode, queryProperty:QueryProperty, metadataProperty:QueryableProperty ):void {
		const { node, document, resource } = compactionNode;
		compactionNode.isCompacted = true;

		const targetSchema:DigestedObjectSchema = queryProperty.getSchemaFor( node );
		const pointerLibrary:PointerLibrary = __createPointerLibrary( compactionMap, document );

		const targetNode:RDFNode = {
			...node,
			// Avoid compaction of c:document
			[ C.document ]: null,
			// Avoid compaction of c:checksum
			[ C.checksum ]: null,
		};

		this.jsonldConverter
			.update( resource, targetNode, targetSchema, pointerLibrary, ! queryProperty._isComplete() );

		if( ! queryProperty._isPartial() ) {
			resource.$_queryableMetadata = void 0;
			return;
		}

		queryProperty.subProperties.forEach( ( subQueryProperty, propertyName ) => {
			// Is virtual property, set to non-enumerable
			if( resource.hasOwnProperty( propertyName ) && subQueryProperty.pathBuilderFn ) {
				Object.defineProperty( resource, propertyName, {
					enumerable: false,
					configurable: true,
					writable: true,
				} );
			}

			const subMetadataProperty:QueryableProperty = metadataProperty
				.getProperty( propertyName, subQueryProperty );

			if( ! resource.hasOwnProperty( propertyName ) ) return;
			if( subQueryProperty.propertyType === void 0 ) return;

			const values:any[] = Array.isArray( resource[ propertyName ] )
				? resource[ propertyName ]
				: [ resource[ propertyName ] ];

			values.forEach( value => {
				if( ! Pointer.is( value ) ) return;

				const subCompactionNode:CompactionNode | undefined = compactionMap.get( value.$id );
				if( ! subCompactionNode ) throw new IllegalArgumentError( `Invalid data provided.` );


				if( subCompactionNode.resource.$_queryableMetadata ) {
					// Merge possible new data
					subCompactionNode.resource.$_queryableMetadata
						.mergeData( propertyName, subMetadataProperty );

					if( subCompactionNode.document === document && ! subCompactionNode.isCompacted ) {
						// May be floating, so add to parent
						metadataProperty
							.setProperty( propertyName, subCompactionNode.resource.$_queryableMetadata );

					} else {
						// Clear type since in sub-document
						subMetadataProperty.propertyType = void 0;
					}

				} else {
					if( subCompactionNode.document === document ) {
						// Add the created metadata
						subCompactionNode.resource.$_queryableMetadata = subMetadataProperty;

					} else {
						// Add a floating metadata
						subCompactionNode.resource.$_queryableMetadata = new QueryableProperty( {
							propertyType: subMetadataProperty.propertyType,
							optional: subMetadataProperty.optional,
							definition: Object.assign( new DigestedObjectSchemaProperty(), subMetadataProperty.definition, {
								uri: null,
							} ),
						} );

						// Clear type since in sub-document
						subMetadataProperty.propertyType = void 0;
					}
				}

				// Process sub-node
				this.__processNode( compactionMap, subCompactionNode, subQueryProperty, subCompactionNode.resource.$_queryableMetadata! );
			} );

		} );
	}

}

function __createPointerLibrary( compactionMap:Map<string, CompactionNode>, document:Document ):PointerLibrary {
	return {
		hasPointer( id:string ):boolean {
			if( compactionMap.has( id ) ) return true;
			return document.$hasPointer( id );
		},

		getPointer( id:string ):Pointer {
			if( compactionMap.has( id ) )
				return compactionMap
					.get( id )
					.resource;

			return document
				.$getPointer( id );
		},
	};
}
