import {
	BindToken,
	ConstructToken,
	IRIToken,
	OptionalToken,
	PatternToken,
	PredicateToken,
	QueryToken,
	SelectToken,
	SubjectToken,
	ValuesToken,
	VariableToken
} from "sparqler/tokens";
import { Document } from "../../Document";
import { IllegalArgumentError } from "../../Errors";
import { FreeResources } from "../../FreeResources";
import {
	GETOptions,
	RequestOptions,
	RequestUtils
} from "../../HTTP";
import { _getNotInContextMessage } from "../../HTTP/HTTPRepositoryTrait";
import {
	JSONLDCompacter,
	JSONLDParser
} from "../../JSONLD";
import {
	DocumentMetadata,
	ResponseMetadata
} from "../../LDP";
import { LDPDocumentsRepositoryTrait } from "../../LDP";
import {
	ModelDecorator,
	ModelPrototype
} from "../../Model";
import { Pointer } from "../../Pointer";
import {
	RDFDocument,
	RDFNode,
	URI
} from "../../RDF";
import { BaseDocumentsRepository } from "../../Repository";
import { PersistedResource } from "../../Resource";
import {
	isBoolean,
	isDate,
	isFunction,
	isNumber,
	isObject,
	isString
} from "../../Utils";
import {
	C,
	LDP
} from "../../Vocabularies";
import { SPARQLService } from "../Service";
import { PartialMetadata } from "./PartialMetadata";
import { QueryContext } from "./QueryContext";
import { QueryContextBuilder } from "./QueryContextBuilder";
import { QueryContextPartial } from "./QueryContextPartial";
import { QueryDocumentBuilder } from "./QueryDocumentBuilder";
import { QueryDocumentDocument } from "./QueryDocumentDocument";
import { QueryDocumentsBuilder } from "./QueryDocumentsBuilder";
import { QueryMetadata } from "./QueryMetadata";
import {
	QueryProperty,
	QueryPropertyType
} from "./QueryProperty";
import {
	areDifferentType,
	createAllPattern,
	createPropertyPatterns,
	createTypesPattern,
	getAllTriples,
	getPathProperty
} from "./Utils";


export interface QueryableDocumentsRepositoryTrait extends LDPDocumentsRepositoryTrait {
	get<T extends object>( uri:string, requestOptions?:GETOptions ):Promise<T & Document>;
	get<T extends object>( uri:string, queryBuilderFn:( queryBuilder:QueryDocumentBuilder ) => QueryDocumentBuilder ):Promise<T & Document>;
	get<T extends object>( uri:string, requestOptions:RequestOptions, queryBuilderFn:( queryBuilder:QueryDocumentBuilder ) => QueryDocumentBuilder ):Promise<T & Document>;

	resolve<T extends object>( document:Document, queryBuilderFn:( queryBuilder:QueryDocumentBuilder ) => QueryDocumentBuilder ):Promise<T & Document>;
	resolve<T extends object>( document:Document, requestOptions?:RequestOptions, queryBuilderFn?:( queryBuilder:QueryDocumentBuilder ) => QueryDocumentBuilder ):Promise<T & Document>;


	refresh<T extends object>( document:Document, requestOptions?:RequestOptions ):Promise<T & Document>;

	saveAndRefresh<T extends object>( document:Document, requestOptions?:RequestOptions ):Promise<T & Document>;


	getChildren<T extends object>( uri:string, requestOptions:RequestOptions, queryBuilderFn?:( queryBuilder:QueryDocumentsBuilder ) => QueryDocumentsBuilder ):Promise<(T & Document)[]>;
	getChildren<T extends object>( uri:string, queryBuilderFn?:( queryBuilder:QueryDocumentsBuilder ) => QueryDocumentsBuilder ):Promise<(T & Document)[]>;

	getMembers<T extends object>( uri:string, requestOptions:RequestOptions, queryBuilderFn?:( queryBuilder:QueryDocumentsBuilder ) => QueryDocumentsBuilder ):Promise<(T & Document)[]>;
	getMembers<T extends object>( uri:string, queryBuilderFn?:( queryBuilder:QueryDocumentsBuilder ) => QueryDocumentsBuilder ):Promise<(T & Document)[]>;

	listChildren<T extends object>( uri:string, requestOptions?:RequestOptions ):Promise<(T & Document)[]>;

	listMembers<T extends object>( uri:string, requestOptions?:RequestOptions ):Promise<(T & Document)[]>;
}


const emptyQueryBuildFn:QueryBuilderFn = _ => _;

function __executePatterns<T extends object>( repository:QueryableDocumentsRepositoryTrait, url:string, requestOptions:RequestOptions, queryContext:QueryContext, targetName:string, constructPatterns:PatternToken[], target?:Document ):Promise<(T & Document)[]> {
	const metadataVar:VariableToken = queryContext.getVariable( "metadata" );
	const construct:ConstructToken = new ConstructToken()
		.addTriple( new SubjectToken( metadataVar )
			.addPredicate( new PredicateToken( "a" )
				.addObject( queryContext.compactIRI( C.VolatileResource ) )
				.addObject( queryContext.compactIRI( C.QueryMetadata ) )
			)
			.addPredicate( new PredicateToken( queryContext.compactIRI( C.target ) )
				.addObject( queryContext.getVariable( targetName ) )
			)
		)
		.addPattern( new BindToken( "BNODE()", metadataVar ) )
		.addPattern( ...constructPatterns );

	const query:QueryToken = new QueryToken( construct )
		.addPrologues( ...queryContext.getPrologues() );

	const triples:SubjectToken[] = getAllTriples( constructPatterns );
	construct.addTriple( ...triples );

	RequestUtils.setRetrievalPreferences( { include: [ C.PreferResultsContext ] }, requestOptions );

	return SPARQLService
		.executeRawCONSTRUCTQuery( url, query.toString(), requestOptions )
		.then( ( [ strConstruct ] ) => strConstruct )
		.then( ( jsonldString ) => {
			return new JSONLDParser().parse( jsonldString );
		} )
		.then<(T & Document)[]>( ( rdfNodes:RDFNode[] ) => {
			const freeNodes:RDFNode[] = RDFNode.getFreeNodes( rdfNodes );
			const freeResources:FreeResources = repository._parseFreeNodes( freeNodes );

			const targetSet:Set<string> = new Set( freeResources
				.getPointers()
				.filter( QueryMetadata.is )
				.map( x => x.target || x[ C.target ] )
				// Alternative to flatMap
				.reduce( ( targets, currentTargets ) => targets.concat( currentTargets ), [] )
				.map( x => x.id )
			);

			const targetETag:string | undefined = target && target._eTag;
			if( target ) target._eTag = void 0;

			freeResources
				.getPointers()
				.filter( ResponseMetadata.is )
				.map<DocumentMetadata[] | DocumentMetadata>( responseMetadata => responseMetadata.documentsMetadata || responseMetadata[ C.documentMetadata ] )
				.map<DocumentMetadata[]>( documentsMetadata => Array.isArray( documentsMetadata ) ? documentsMetadata : [ documentsMetadata ] )
				.forEach( documentsMetadata => documentsMetadata.forEach( documentMetadata => {
					if( ! documentMetadata ) return;

					const relatedDocument:QueryDocumentDocument = documentMetadata.relatedDocument || documentMetadata[ C.relatedDocument ];
					const eTag:string = documentMetadata.eTag || documentMetadata[ C.eTag ];

					if( ! eTag ) return;
					relatedDocument._resolved = true;

					if( relatedDocument._eTag === void 0 ) relatedDocument._eTag = eTag;
					if( relatedDocument._eTag !== eTag ) relatedDocument._eTag = null;
				} ) );

			if( targetETag && targetETag === target._eTag )
				return [ target as T & Document ];

			const rdfDocuments:RDFDocument[] = rdfNodes
				.filter<any>( RDFDocument.is );

			const targetDocuments:RDFDocument[] = rdfDocuments
				.filter( x => targetSet.has( x[ "@id" ] ) );

			// FIXME
			return new JSONLDCompacter( repository.$context.registry as any, targetName, queryContext )
				.compactDocuments<T & QueryDocumentDocument>( rdfDocuments, targetDocuments );
		} )
		.catch( repository._parseFailedResponse.bind( this ) )
		;
}

function __executeBuilder<T extends object>( repository:QueryableDocumentsRepositoryTrait, url:string, requestOptions:RequestOptions, queryContext:QueryContextBuilder, targetProperty:QueryProperty, queryBuilderFn?:QueryBuilderFn, target?:Document ):Promise<(T & Document)[]> {
	const Builder:typeof QueryDocumentBuilder = targetProperty.name === "document" ?
		QueryDocumentBuilder : QueryDocumentsBuilder;
	const queryBuilder:QueryDocumentBuilder | QueryDocumentBuilder = new Builder( queryContext, targetProperty );

	targetProperty.setType( queryBuilderFn ?
		queryBuilderFn === emptyQueryBuildFn ?
			QueryPropertyType.EMPTY :
			QueryPropertyType.PARTIAL :
		QueryPropertyType.FULL
	);

	if( queryBuilderFn && queryBuilderFn.call( void 0, queryBuilder ) !== queryBuilder )
		throw new IllegalArgumentError( "The provided query builder was not returned" );

	const constructPatterns:PatternToken[] = targetProperty.getPatterns();
	return __executePatterns<T>( repository, url, requestOptions, queryContext, targetProperty.name, constructPatterns, target )
		.then( ( documents ) => {
			if( ! (queryBuilder instanceof QueryDocumentsBuilder && queryBuilder._orderData) )
				return documents;

			const { path, flow } = queryBuilder._orderData;
			const inverter:number = flow === "DESC" ? - 1 : 1;

			return documents.sort( ( a:any, b:any ) => {
				a = getPathProperty( a, path );
				b = getPathProperty( b, path );

				const aValue:any = Pointer.is( a ) ? a.$id : a;
				const bValue:any = Pointer.is( b ) ? b.$id : b;

				if( aValue === bValue ) return 0;

				if( aValue === void 0 ) return - 1 * inverter;
				if( bValue === void 0 ) return inverter;

				if( ! areDifferentType( a, b ) ) {
					if( Pointer.is( a ) ) {
						const aIsBNode:boolean = URI.isBNodeID( aValue );
						const bIsBNode:boolean = URI.isBNodeID( bValue );

						if( aIsBNode && ! bIsBNode ) return - 1 * inverter;
						if( bIsBNode && ! aIsBNode ) return inverter;
					}
				} else {
					if( Pointer.is( a ) ) return - 1 * inverter;
					if( Pointer.is( b ) ) return inverter;

					if( isNumber( a ) ) return - 1 * inverter;
					if( isNumber( b ) ) return inverter;

					if( isDate( a ) ) return - 1 * inverter;
					if( isDate( b ) ) return inverter;

					if( isBoolean( a ) ) return - 1 * inverter;
					if( isBoolean( b ) ) return inverter;

					if( isString( a ) ) return - 1 * inverter;
					if( isString( b ) ) return inverter;
				}

				if( aValue < bValue ) return - 1 * inverter;
				if( aValue > bValue ) return inverter;
			} );
		} )
		;
}

function __getQueryable<T extends object>( repository:QueryableDocumentsRepositoryTrait, uri:string, requestOptions:RequestOptions, queryBuilderFn?:QueryBuilderFn, target?:Document ):Promise<T & Document> {
	if( ! repository.$context.registry.inScope( uri ) ) return Promise.reject( new IllegalArgumentError( _getNotInContextMessage( uri ) ) );
	const url:string = repository.$context.resolve( uri );

	// FIXME
	const queryContext:QueryContextBuilder = new QueryContextBuilder( repository.$context as any );

	const documentProperty:QueryProperty = queryContext
		.addProperty( "document" )
		.setOptional( false );

	const propertyValue:ValuesToken = new ValuesToken().addValues( documentProperty.variable, queryContext.compactIRI( uri ) );
	documentProperty.addPattern( propertyValue );

	RequestUtils.setRetrievalPreferences( { include: [ C.PreferDocumentETags ] }, requestOptions );

	return __executeBuilder<T>( repository, url, requestOptions, queryContext, documentProperty, queryBuilderFn, target )
		.then( ( documents ) => documents[ 0 ] );
}


function __addRefreshPatterns( queryContext:QueryContextPartial, parentAdder:OptionalToken, resource:PersistedResource, parentName:string ):void {
	if( resource._partialMetadata.schema === PartialMetadata.ALL ) {
		parentAdder.addPattern( createAllPattern( queryContext, parentName ) );
		return;
	}

	parentAdder.addPattern( createTypesPattern( queryContext, parentName ) );

	resource._partialMetadata.schema.properties.forEach( ( digestedProperty, propertyName ) => {
		const path:string = `${ parentName }.${ propertyName }`;

		const propertyPattern:OptionalToken = new OptionalToken()
			.addPattern( ...createPropertyPatterns(
				queryContext,
				parentName,
				path,
				digestedProperty
			) );
		parentAdder.addPattern( propertyPattern );

		const propertyValues:any[] = Array.isArray( resource[ propertyName ] ) ? resource[ propertyName ] : [ resource[ propertyName ] ];
		const propertyFragment:PersistedResource = propertyValues
			.filter( PersistedResource.is )
			.find( fragment => fragment.isPartial() );
		if( ! propertyFragment ) return;

		__addRefreshPatterns( queryContext, propertyPattern, propertyFragment, path );
	} );
}

function __refreshQueryable<T extends object>( this:void, repository:QueryableDocumentsRepositoryTrait, document:Document, requestOptions:RequestOptions = {} ):Promise<T & Document> {
	if( ! repository.$context.registry.inScope( document.$id ) ) return Promise.reject( new IllegalArgumentError( _getNotInContextMessage( document.$id ) ) );
	const url:string = repository.$context.resolve( document.$id );

	// FIXME
	const queryContext:QueryContextPartial = new QueryContextPartial( document, repository.$context as any );

	const targetName:string = "document";
	const constructPatterns:OptionalToken = new OptionalToken()
		.addPattern( new ValuesToken()
			.addValues( queryContext.getVariable( targetName ), new IRIToken( url ) )
		)
	;

	__addRefreshPatterns( queryContext, constructPatterns, document, targetName );

	RequestUtils.setRetrievalPreferences( { include: [ C.PreferDocumentETags ] }, requestOptions );

	return __executePatterns<T>( repository, url, requestOptions, queryContext, targetName, constructPatterns.patterns, document )
		.then( ( documents ) => documents[ 0 ] );
}


function __executeChildrenBuilder<T extends object>( this:void, repository:QueryableDocumentsRepositoryTrait, uri:string, requestOptions:RequestOptions, queryBuilderFn?:QueryBuilderFn ):Promise<(T & Document)[]> {
	if( ! repository.$context.registry.inScope( uri ) ) return Promise.reject( new IllegalArgumentError( _getNotInContextMessage( uri ) ) );
	const url:string = repository.$context.resolve( uri );

	// FIXME
	const queryContext:QueryContextBuilder = new QueryContextBuilder( repository.$context as any );
	const childrenProperty:QueryProperty = queryContext
		.addProperty( "child" )
		.setOptional( false );

	const selectChildren:SelectToken = new SelectToken( "DISTINCT" )
		.addVariable( childrenProperty.variable )
		.addPattern( new SubjectToken( queryContext.compactIRI( url ) )
			.addPredicate( new PredicateToken( queryContext.compactIRI( LDP.contains ) )
				.addObject( childrenProperty.variable )
			)
		)
	;
	childrenProperty.addPattern( selectChildren );

	return __executeBuilder<T>( repository, url, requestOptions, queryContext, childrenProperty, queryBuilderFn );
}

function __executeMembersBuilder<T extends object>( this:void, repository:QueryableDocumentsRepositoryTrait, uri:string, requestOptions:RequestOptions, queryBuilderFn?:( queryBuilder:QueryDocumentBuilder ) => QueryDocumentBuilder ):Promise<(T & Document)[]> {
	if( ! repository.$context.registry.inScope( uri ) ) return Promise.reject( new IllegalArgumentError( _getNotInContextMessage( uri ) ) );
	const url:string = repository.$context.resolve( uri );

	// FIXME
	const queryContext:QueryContextBuilder = new QueryContextBuilder( repository.$context as any );
	const membersProperty:QueryProperty = queryContext
		.addProperty( "member" )
		.setOptional( false );

	const membershipResource:VariableToken = queryContext.getVariable( "membershipResource" );
	const hasMemberRelation:VariableToken = queryContext.getVariable( "hasMemberRelation" );
	const selectMembers:SelectToken = new SelectToken( "DISTINCT" )
		.addVariable( membersProperty.variable )
		.addPattern( new SubjectToken( queryContext.compactIRI( url ) )
			.addPredicate( new PredicateToken( queryContext.compactIRI( LDP.membershipResource ) )
				.addObject( membershipResource )
			)
			.addPredicate( new PredicateToken( queryContext.compactIRI( LDP.hasMemberRelation ) )
				.addObject( hasMemberRelation )
			)
		)
		.addPattern( new SubjectToken( membershipResource )
			.addPredicate( new PredicateToken( hasMemberRelation )
				.addObject( membersProperty.variable )
			)
		)
	;
	membersProperty.addPattern( selectMembers );

	return __executeBuilder<T>( repository, url, requestOptions, queryContext, membersProperty, queryBuilderFn );
}


export type OverloadedMembers =
	| "get"
	| "resolve"
	| "refresh"
	| "saveAndRefresh"
	;

export type QueryableDocumentsRepositoryTraitFactory =
	& ModelPrototype<QueryableDocumentsRepositoryTrait, LDPDocumentsRepositoryTrait, OverloadedMembers>
	& ModelDecorator<QueryableDocumentsRepositoryTrait, BaseDocumentsRepository>
	;

type QueryBuilderFn = Function & (( queryBuilder:QueryDocumentBuilder ) => QueryDocumentBuilder);

export const QueryableDocumentsRepositoryTrait:QueryableDocumentsRepositoryTraitFactory = {
	PROTOTYPE: {
		get<T extends object>( this:QueryableDocumentsRepositoryTrait, uri:string, requestOptionsOrQueryBuilderFn?:GETOptions | QueryBuilderFn, queryBuilderFn?:QueryBuilderFn ):Promise<T & Document> {
			const requestOptions:GETOptions = isObject( requestOptionsOrQueryBuilderFn ) ?
				requestOptionsOrQueryBuilderFn : {};

			queryBuilderFn = isFunction( requestOptionsOrQueryBuilderFn ) ?
				requestOptionsOrQueryBuilderFn : queryBuilderFn;

			const target:Document | undefined = this.$context.registry.hasPointer( uri ) ?
				this.$context.registry.getPointer( uri, true ) :
				void 0;

			if( queryBuilderFn ) {
				const types:string[] = target ? target.types : [];
				return __getQueryable( this, uri, requestOptions, _ => {
					types.forEach( type => _.withType( type ) );
					return queryBuilderFn.call( void 0, _ );
				} );
			}

			if( target.isPartial() ) requestOptions.ensureLatest = true;
			return LDPDocumentsRepositoryTrait.PROTOTYPE
				.get( uri, requestOptions );
		},

		resolve<T extends object>( this:QueryableDocumentsRepositoryTrait, document:Document, requestOptionsOrQueryBuilderFn?:RequestOptions | QueryBuilderFn, queryBuilderFn?:QueryBuilderFn ):Promise<T & Document> {
			return this.get( document.$id, requestOptionsOrQueryBuilderFn, queryBuilderFn );
		},


		refresh<T extends object>( this:QueryableDocumentsRepositoryTrait, document:Document, requestOptions?:RequestOptions ):Promise<T & Document> {
			if( ! document.isPartial() ) return LDPDocumentsRepositoryTrait.PROTOTYPE
				.refresh.call( this, document, requestOptions );

			return __refreshQueryable<T>( this, document, requestOptions );
		},

		saveAndRefresh<T extends object>( this:QueryableDocumentsRepositoryTrait, document:Document, requestOptions?:RequestOptions ):Promise<T & Document> {
			if( ! document._partialMetadata ) return LDPDocumentsRepositoryTrait.PROTOTYPE
				.saveAndRefresh.call( this, document, requestOptions );

			const cloneOptions:RequestOptions = RequestUtils.cloneOptions( requestOptions );
			return this.save<T & Document>( document, cloneOptions )
				.then<T & Document>( doc => {
					return __refreshQueryable( this, doc, requestOptions );
				} );
		},


		getChildren<T extends object>( this:QueryableDocumentsRepositoryTrait, uri:string, requestOptionsOrQueryBuilderFn?:RequestOptions | QueryBuilderFn, queryBuilderFn?:QueryBuilderFn ):Promise<(T & Document)[]> {
			const requestOptions:RequestOptions = isObject( requestOptionsOrQueryBuilderFn ) ?
				requestOptionsOrQueryBuilderFn : {};

			queryBuilderFn = isFunction( requestOptionsOrQueryBuilderFn ) ?
				requestOptionsOrQueryBuilderFn : queryBuilderFn;

			RequestUtils.setRetrievalPreferences( { include: [ C.PreferDocumentETags ] }, requestOptions );

			return __executeChildrenBuilder( this, uri, requestOptions, queryBuilderFn );
		},

		getMembers<T extends object>( uri:string, requestOptionsOrQueryBuilderFn?:RequestOptions | QueryBuilderFn, queryBuilderFn?:QueryBuilderFn ):Promise<(T & Document)[]> {
			const requestOptions:RequestOptions = isObject( requestOptionsOrQueryBuilderFn ) ?
				requestOptionsOrQueryBuilderFn : {};

			queryBuilderFn = isFunction( requestOptionsOrQueryBuilderFn ) ?
				requestOptionsOrQueryBuilderFn : queryBuilderFn;

			RequestUtils.setRetrievalPreferences( { include: [ C.PreferDocumentETags ] }, requestOptions );

			return __executeMembersBuilder( this, uri, requestOptions, queryBuilderFn );
		},

		listChildren<T extends object>( uri:string, requestOptions:RequestOptions = {} ):Promise<(T & Document)[]> {
			return __executeChildrenBuilder( this, uri, requestOptions, emptyQueryBuildFn );
		},

		listMembers<T extends object>( uri:string, requestOptions:RequestOptions = {} ):Promise<(T & Document)[]> {
			return __executeMembersBuilder( this, uri, requestOptions, emptyQueryBuildFn );
		},
	},


	isDecorated( object:object ):object is QueryableDocumentsRepositoryTrait {
		return ModelDecorator
			.hasPropertiesFrom( QueryableDocumentsRepositoryTrait.PROTOTYPE, object );
	},

	decorate<T extends object>( object:T ):T & QueryableDocumentsRepositoryTrait {
		if( QueryableDocumentsRepositoryTrait.isDecorated( object ) ) return object;

		const target:T & LDPDocumentsRepositoryTrait = ModelDecorator
			.decorateMultiple( object, LDPDocumentsRepositoryTrait );

		return ModelDecorator
			.definePropertiesFrom( QueryableDocumentsRepositoryTrait.PROTOTYPE, target );
	},
};
