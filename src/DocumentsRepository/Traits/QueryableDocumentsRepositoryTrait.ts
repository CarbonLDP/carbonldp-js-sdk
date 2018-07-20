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

import { Document } from "../../Document/Document";

import { IllegalArgumentError } from "../../Errors/IllegalArgumentError";
import { IllegalStateError } from "../../Errors/IllegalStateError";

import { FreeResources } from "../../FreeResources/FreeResources";

import { GETOptions, RequestOptions, RequestUtils } from "../../HTTP/Request";

import { JSONLDCompacter } from "../../JSONLD/JSONLDCompacter";
import { JSONLDParser } from "../../JSONLD/JSONLDParser";

import { DocumentMetadata } from "../../LDP/DocumentMetadata";
import { ResponseMetadata } from "../../LDP/ResponseMetadata";

import { ModelDecorator } from "../../Model/ModelDecorator";
import { ModelPrototype } from "../../Model/ModelPrototype";

import { Pointer } from "../../Pointer/Pointer";

import { QueryableMetadata } from "../../QueryDocuments/QueryableMetadata";
import { QueryablePointer } from "../../QueryDocuments/QueryablePointer";
import { QueryContext } from "../../QueryDocuments/QueryContext";
import { QueryContextBuilder } from "../../QueryDocuments/QueryContextBuilder";
import { QueryContextPartial } from "../../QueryDocuments/QueryContextPartial";
import { QueryDocumentBuilder } from "../../QueryDocuments/QueryDocumentBuilder";
import { QueryDocumentsBuilder } from "../../QueryDocuments/QueryDocumentsBuilder";
import { QueryMetadata } from "../../QueryDocuments/QueryMetadata";
import { QueryProperty, QueryPropertyType } from "../../QueryDocuments/QueryProperty";
import {
	_areDifferentType,
	_createAllPattern,
	_createPropertyPatterns,
	_createTypesPattern,
	_getAllTriples,
	_getPathProperty
} from "../../QueryDocuments/Utils";

import { RDFDocument } from "../../RDF/Document";
import { RDFNode } from "../../RDF/Node";
import { URI } from "../../RDF/URI";

import { SPARQLService } from "../../SPARQL/SPARQLService";

import { isBoolean, isDate, isFunction, isNumber, isObject, isString } from "../../Utils";

import { C } from "../../Vocabularies/C";
import { LDP } from "../../Vocabularies/LDP";

import { BaseDocumentsRepository } from "../BaseDocumentsRepository";
import { _getErrorResponseParserFn } from "../Utils";

import { LDPDocumentsRepositoryTrait } from "./LDPDocumentsRepositoryTrait";


export interface QueryableDocumentsRepositoryTrait extends LDPDocumentsRepositoryTrait {
	$get<T extends object>( uri:string, requestOptions?:GETOptions ):Promise<T & Document>;
	$get<T extends object>( uri:string, queryBuilderFn:( queryBuilder:QueryDocumentBuilder ) => QueryDocumentBuilder ):Promise<T & Document>;
	$get<T extends object>( uri:string, requestOptions:RequestOptions, queryBuilderFn:( queryBuilder:QueryDocumentBuilder ) => QueryDocumentBuilder ):Promise<T & Document>;

	$resolve<T extends object>( document:Document, requestOptions?:GETOptions ):Promise<T & Document>;
	$resolve<T extends object>( document:Document, queryBuilderFn:( queryBuilder:QueryDocumentBuilder ) => QueryDocumentBuilder ):Promise<T & Document>;
	$resolve<T extends object>( document:Document, requestOptions:RequestOptions, queryBuilderFn?:( queryBuilder:QueryDocumentBuilder ) => QueryDocumentBuilder ):Promise<T & Document>;


	$refresh<T extends object>( document:Document, requestOptions?:RequestOptions ):Promise<T & Document>;

	$saveAndRefresh<T extends object>( document:Document, requestOptions?:RequestOptions ):Promise<T & Document>;


	getChildren<T extends object>( uri:string, requestOptions:RequestOptions, queryBuilderFn?:( queryBuilder:QueryDocumentsBuilder ) => QueryDocumentsBuilder ):Promise<(T & Document)[]>;
	getChildren<T extends object>( uri:string, queryBuilderFn?:( queryBuilder:QueryDocumentsBuilder ) => QueryDocumentsBuilder ):Promise<(T & Document)[]>;

	getMembers<T extends object>( uri:string, requestOptions:RequestOptions, queryBuilderFn?:( queryBuilder:QueryDocumentsBuilder ) => QueryDocumentsBuilder ):Promise<(T & Document)[]>;
	getMembers<T extends object>( uri:string, queryBuilderFn?:( queryBuilder:QueryDocumentsBuilder ) => QueryDocumentsBuilder ):Promise<(T & Document)[]>;

	listChildren<T extends object>( uri:string, requestOptions?:RequestOptions ):Promise<(T & Document)[]>;

	listMembers<T extends object>( uri:string, requestOptions?:RequestOptions ):Promise<(T & Document)[]>;
}


const emptyQueryBuildFn:QueryBuilderFn = _ => _;

function __executePatterns<T extends object>( this:void, repository:QueryableDocumentsRepositoryTrait, url:string, requestOptions:RequestOptions, queryContext:QueryContext, targetName:string, constructPatterns:PatternToken[], target?:Document ):Promise<(T & Document)[]> {
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

	const triples:SubjectToken[] = _getAllTriples( constructPatterns );
	construct.addTriple( ...triples );

	RequestUtils.setRetrievalPreferences( { include: [ C.PreferResultsContext ] }, requestOptions );

	return SPARQLService
		.executeRawCONSTRUCTQuery( url, query.toString(), requestOptions )
		.then( ( [ strConstruct ] ) => strConstruct )
		.then( ( jsonldString ) => {
			return new JSONLDParser().parse( jsonldString );
		} )
		.then<(T & Document)[]>( ( rdfNodes:RDFNode[] ) => {
			const freeNodes:RDFNode[] = RDFDocument.getFreeNodes( rdfNodes );

			let freeResources:FreeResources;
			try {
				freeResources = FreeResources.parseFreeNodes( repository.$context.registry, freeNodes );
			} catch( e ) {
				throw e;
			}

			const targetSet:Set<string> = new Set( freeResources
				.getPointers( true )
				.filter<QueryMetadata>( QueryMetadata.is )
				.map<Pointer | Pointer[]>( x => x.target )
				// Alternative to flatMap
				.reduce<Pointer[]>( ( targets, currentTargets ) => targets.concat( currentTargets ), [] )
				.map( x => x.$id )
			);

			const targetETag:string | undefined = target && target.$eTag;
			if( target ) target.$eTag = void 0;

			freeResources
				.getPointers( true )
				.filter( ResponseMetadata.is )
				.map<DocumentMetadata[] | DocumentMetadata>( responseMetadata => responseMetadata.documentsMetadata || responseMetadata[ C.documentMetadata ] )
				.map<DocumentMetadata[]>( documentsMetadata => Array.isArray( documentsMetadata ) ? documentsMetadata : [ documentsMetadata ] )
				.forEach( documentsMetadata => documentsMetadata.forEach( documentMetadata => {
					if( ! documentMetadata ) return;

					const relatedDocument:Document = documentMetadata.relatedDocument || documentMetadata[ C.relatedDocument ];
					const eTag:string = documentMetadata.eTag || documentMetadata[ C.eTag ];

					if( ! eTag ) return;
					relatedDocument.$_resolved = true;

					if( relatedDocument.$eTag === void 0 ) relatedDocument.$eTag = eTag;
					if( relatedDocument.$eTag !== eTag ) relatedDocument.$eTag = null;
				} ) );

			if( targetETag && targetETag === target.$eTag )
				return [ target as T & Document ];

			const rdfDocuments:RDFDocument[] = rdfNodes
				.filter<any>( RDFDocument.is );

			const targetDocuments:RDFDocument[] = rdfDocuments
				.filter( x => targetSet.has( x[ "@id" ] ) );

			return new JSONLDCompacter( repository.$context.registry, targetName, queryContext )
				.compactDocuments<T & Document>( rdfDocuments, targetDocuments );
		} )
		.catch( _getErrorResponseParserFn( repository.$context.registry ) )
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
				a = _getPathProperty( a, path );
				b = _getPathProperty( b, path );

				const aValue:any = Pointer.is( a ) ? a.$id : a;
				const bValue:any = Pointer.is( b ) ? b.$id : b;

				if( aValue === bValue ) return 0;

				if( aValue === void 0 ) return - 1 * inverter;
				if( bValue === void 0 ) return inverter;

				if( ! _areDifferentType( a, b ) ) {
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
	if( ! repository.$context.registry.inScope( uri, true ) ) return Promise.reject( new IllegalArgumentError( `"${ uri }" is out of scope.` ) );
	const url:string = repository.$context.getObjectSchema().resolveURI( uri, { base: true } );

	const queryContext:QueryContextBuilder = new QueryContextBuilder( repository.$context );

	const documentProperty:QueryProperty = queryContext
		.addProperty( "document" )
		.setOptional( false );

	const propertyValue:ValuesToken = new ValuesToken().addValues( documentProperty.variable, queryContext.compactIRI( uri ) );
	documentProperty.addPattern( propertyValue );

	RequestUtils.setRetrievalPreferences( { include: [ C.PreferDocumentETags ] }, requestOptions );

	return __executeBuilder<T>( repository, url, requestOptions, queryContext, documentProperty, queryBuilderFn, target )
		.then( ( documents ) => documents[ 0 ] );
}


function __addRefreshPatterns( queryContext:QueryContextPartial, parentAdder:OptionalToken, resource:QueryablePointer, parentName:string ):void {
	if( resource.$_queryableMetadata.schema === QueryableMetadata.ALL ) {
		parentAdder.addPattern( _createAllPattern( queryContext, parentName ) );
		return;
	}

	parentAdder.addPattern( _createTypesPattern( queryContext, parentName ) );

	resource.$_queryableMetadata.schema.properties.forEach( ( digestedProperty, propertyName ) => {
		const path:string = `${ parentName }.${ propertyName }`;

		const propertyPattern:OptionalToken = new OptionalToken()
			.addPattern( ..._createPropertyPatterns(
				queryContext,
				parentName,
				path,
				digestedProperty
			) );
		parentAdder.addPattern( propertyPattern );

		const propertyValues:any[] = Array.isArray( resource[ propertyName ] ) ? resource[ propertyName ] : [ resource[ propertyName ] ];
		const propertyFragment:QueryablePointer = propertyValues
			.filter( QueryablePointer.is )
			.find( fragment => fragment.$isQueried() );
		if( ! propertyFragment ) return;

		__addRefreshPatterns( queryContext, propertyPattern, propertyFragment, path );
	} );
}

function __refreshQueryable<T extends object>( this:void, repository:QueryableDocumentsRepositoryTrait, document:Document, requestOptions:RequestOptions = {} ):Promise<T & Document> {
	if( ! repository.$context.registry.inScope( document.$id, true ) ) return Promise.reject( new IllegalArgumentError( `"${ document.$id }" is out of scope.` ) );
	const url:string = repository.$context.getObjectSchema().resolveURI( document.$id, { base: true } );

	const queryContext:QueryContextPartial = new QueryContextPartial( document, repository.$context );

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
	if( ! repository.$context.registry.inScope( uri, true ) ) return Promise.reject( new IllegalArgumentError( `"${ uri }" is out of scope.` ) );
	const url:string = repository.$context.getObjectSchema().resolveURI( uri, { base: true } );

	const queryContext:QueryContextBuilder = new QueryContextBuilder( repository.$context );
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
	if( ! repository.$context.registry.inScope( uri, true ) ) return Promise.reject( new IllegalArgumentError( `"${ uri }" is out of scope.` ) );
	const url:string = repository.$context.getObjectSchema().resolveURI( uri, { base: true } );

	const queryContext:QueryContextBuilder = new QueryContextBuilder( repository.$context );
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


export type OverriddenMembers =
	| "$get"
	| "$resolve"
	| "$refresh"
	| "$saveAndRefresh"
	;

export type QueryableDocumentsRepositoryTraitFactory =
	& ModelPrototype<QueryableDocumentsRepositoryTrait, LDPDocumentsRepositoryTrait, OverriddenMembers>
	& ModelDecorator<QueryableDocumentsRepositoryTrait, BaseDocumentsRepository>
	;

type QueryBuilderFn = Function & (( queryBuilder:QueryDocumentBuilder ) => QueryDocumentBuilder);

export const QueryableDocumentsRepositoryTrait:QueryableDocumentsRepositoryTraitFactory = {
	PROTOTYPE: {
		$get<T extends object>( this:QueryableDocumentsRepositoryTrait, uri:string, requestOptionsOrQueryBuilderFn?:GETOptions | QueryBuilderFn, queryBuilderFn?:QueryBuilderFn ):Promise<T & Document> {
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

			if( target && target.$isQueried() ) requestOptions.ensureLatest = true;
			return LDPDocumentsRepositoryTrait.PROTOTYPE
				.$get.call( this, uri, requestOptions );
		},

		$resolve<T extends object>( this:QueryableDocumentsRepositoryTrait, document:Document, requestOptionsOrQueryBuilderFn?:RequestOptions | QueryBuilderFn, queryBuilderFn?:QueryBuilderFn ):Promise<T & Document> {
			return this.$get( document.$id, requestOptionsOrQueryBuilderFn, queryBuilderFn );
		},


		$refresh<T extends object>( this:QueryableDocumentsRepositoryTrait, document:Document, requestOptions?:RequestOptions ):Promise<T & Document> {
			if( ! document.$isQueried() ) return LDPDocumentsRepositoryTrait.PROTOTYPE
				.$refresh.call( this, document, requestOptions );

			return __refreshQueryable<T>( this, document, requestOptions );
		},

		$saveAndRefresh<T extends object>( this:QueryableDocumentsRepositoryTrait, document:Document, requestOptions?:RequestOptions ):Promise<T & Document> {
			if( ! document.$_queryableMetadata ) return LDPDocumentsRepositoryTrait.PROTOTYPE
				.$saveAndRefresh.call( this, document, requestOptions );

			if( document.$eTag === null ) return Promise.reject( new IllegalStateError( `The document "${ document.$id }" is locally outdated and cannot be saved.` ) );

			const cloneOptions:RequestOptions = RequestUtils.cloneOptions( requestOptions || {} );
			return this.$save<T & Document>( document, cloneOptions )
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

	decorate<T extends BaseDocumentsRepository>( object:T ):T & QueryableDocumentsRepositoryTrait {
		if( QueryableDocumentsRepositoryTrait.isDecorated( object ) ) return object;

		const target:T & LDPDocumentsRepositoryTrait = ModelDecorator
			.decorateMultiple( object, LDPDocumentsRepositoryTrait );

		return ModelDecorator
			.definePropertiesFrom( QueryableDocumentsRepositoryTrait.PROTOTYPE, target );
	},
};
