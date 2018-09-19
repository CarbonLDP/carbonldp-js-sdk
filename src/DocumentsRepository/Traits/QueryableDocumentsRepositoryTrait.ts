import { ConstructToken, IRIRefToken, PropertyToken, QueryToken, SubjectToken } from "sparqler/tokens";

import { Document } from "../../Document/Document";

import { IllegalArgumentError } from "../../Errors/IllegalArgumentError";
import { IllegalStateError } from "../../Errors/IllegalStateError";

import { FreeResources } from "../../FreeResources/FreeResources";

import { GETOptions, RequestOptions, RequestUtils } from "../../HTTP/Request";

import { JSONLDParser } from "../../JSONLD/JSONLDParser";

import { ModelDecorator } from "../../Model/ModelDecorator";
import { ModelPrototype } from "../../Model/ModelPrototype";

import { Pointer } from "../../Pointer/Pointer";

import { QueryableMetadataContainer } from "../../QueryDocuments/QueryableMetadataContainer";
import { QueryableProperty } from "../../QueryDocuments/QueryableProperty";
import { QueryContainer } from "../../QueryDocuments/QueryContainer";
import { QueryContainerType } from "../../QueryDocuments/QueryContainerType";
import { QueryDocumentBuilder } from "../../QueryDocuments/QueryDocumentBuilder";
import { QueryDocumentContainer } from "../../QueryDocuments/QueryDocumentContainer";
import { QueryDocumentsBuilder } from "../../QueryDocuments/QueryDocumentsBuilder";
import { QueryMetadata } from "../../QueryDocuments/QueryMetadata";
import { QueryProperty } from "../../QueryDocuments/QueryProperty";
import { QueryPropertyType } from "../../QueryDocuments/QueryPropertyType";
import { QueryResultCompacter } from "../../QueryDocuments/QueryResultCompacter";
import { _areDifferentType, _getPathProperty } from "../../QueryDocuments/Utils";

import { RDFDocument } from "../../RDF/Document";
import { RDFNode } from "../../RDF/Node";
import { URI } from "../../RDF/URI";

import { SPARQLService } from "../../SPARQL/SPARQLService";

import { isBoolean, isDate, isFunction, isNumber, isObject, isString, UUIDUtils } from "../../Utils";

import { C } from "../../Vocabularies/C";

import { BaseDocumentsRepository } from "../BaseDocumentsRepository";
import { _getErrorResponseParserFn } from "../Utils";

import { LDPDocumentsRepositoryTrait } from "./LDPDocumentsRepositoryTrait";


export interface QueryableDocumentsRepositoryTrait extends LDPDocumentsRepositoryTrait {
	get<T extends object>( uri:string, requestOptions?:GETOptions ):Promise<T & Document>;
	get<T extends object>( uri:string, queryBuilderFn:( queryBuilder:QueryDocumentBuilder ) => QueryDocumentBuilder ):Promise<T & Document>;
	get<T extends object>( uri:string, requestOptions:RequestOptions, queryBuilderFn:( queryBuilder:QueryDocumentBuilder ) => QueryDocumentBuilder ):Promise<T & Document>;

	resolve<T extends object>( document:Document, requestOptions?:GETOptions ):Promise<T & Document>;
	resolve<T extends object>( document:Document, queryBuilderFn:( queryBuilder:QueryDocumentBuilder ) => QueryDocumentBuilder ):Promise<T & Document>;
	resolve<T extends object>( document:Document, requestOptions:RequestOptions, queryBuilderFn?:( queryBuilder:QueryDocumentBuilder ) => QueryDocumentBuilder ):Promise<T & Document>;


	refresh<T extends object>( document:Document, requestOptions?:RequestOptions ):Promise<T & Document>;

	saveAndRefresh<T extends object>( document:Document, requestOptions?:RequestOptions ):Promise<T & Document>;


	getChildren<T extends object>( uri:string, requestOptions:RequestOptions, queryBuilderFn?:( queryBuilder:QueryDocumentsBuilder ) => QueryDocumentsBuilder ):Promise<(T & Document)[]>;
	getChildren<T extends object>( uri:string, queryBuilderFn?:( queryBuilder:QueryDocumentsBuilder ) => QueryDocumentsBuilder ):Promise<(T & Document)[]>;

	getMembers<T extends object>( uri:string, requestOptions:RequestOptions, queryBuilderFn?:( queryBuilder:QueryDocumentsBuilder ) => QueryDocumentsBuilder ):Promise<(T & Document)[]>;
	getMembers<T extends object>( uri:string, queryBuilderFn?:( queryBuilder:QueryDocumentsBuilder ) => QueryDocumentsBuilder ):Promise<(T & Document)[]>;

	listChildren<T extends object>( uri:string, requestOptions?:RequestOptions ):Promise<(T & Document)[]>;

	listMembers<T extends object>( uri:string, requestOptions?:RequestOptions ):Promise<(T & Document)[]>;
}


type QueryData = {
	containerType:QueryContainerType;
	queryBuilderFn?:QueryBuilderFn;
	rootType?:QueryPropertyType;
};


function __executeQueryContainer<T extends object>( this:void, repository:QueryableDocumentsRepositoryTrait, url:string, requestOptions:RequestOptions, queryContainer:QueryContainer ):Promise<(T & Document)[]> {
	const construct:ConstructToken = new ConstructToken()
		.addTriple(
			// Add QueryMetadata of the target elements
			new SubjectToken( new IRIRefToken( `cldp-sdk://metadata-${ UUIDUtils.generate() }` ) )
				.addProperty( new PropertyToken( "a" )
					.addObject( queryContainer.compactIRI( C.VolatileResource ) )
					.addObject( queryContainer.compactIRI( C.QueryMetadata ) )
				)
				.addProperty( new PropertyToken( queryContainer.compactIRI( C.target ) )
					.addObject( queryContainer._queryProperty.variable )
				)
		)
		// Add construct and search patterns
		.addTriple( ...queryContainer._queryProperty.getConstructPatterns() )
		.addPattern( ...queryContainer._queryProperty.getSearchPatterns() )
	;

	// Add the used prefixes
	const query:QueryToken = new QueryToken( construct )
		.addPrologues( ...queryContainer.getPrologues() );

	// Header to convert the triples into quads
	RequestUtils.setRetrievalPreferences( { include: [ C.PreferResultsContext ] }, requestOptions );

	return SPARQLService
		.executeRawCONSTRUCTQuery( url, query.toString(), requestOptions )
		.then( ( [ strConstruct ] ) => strConstruct )
		.then( ( jsonldString ) => {
			return new JSONLDParser().parse( jsonldString );
		} )
		.then<(T & Document)[]>( ( rdfNodes:RDFNode[] ) => {
			const freeNodes:RDFNode[] = RDFDocument.getFreeNodes( rdfNodes );

			const freeResources:FreeResources = FreeResources
				.parseFreeNodes( repository.context.registry, freeNodes );

			const targetDocuments:string[] = freeResources
				.getPointers( true )
				.filter<QueryMetadata>( QueryMetadata.is )
				.map<Pointer | Pointer[]>( x => x.target )
				// Alternative to flatMap
				.reduce<Pointer[]>( ( targets, currentTargets ) => targets.concat( currentTargets ), [] )
				.map( x => x.$id )
			;

			const rdfDocuments:RDFDocument[] = rdfNodes
				.filter( RDFDocument.is );

			return new QueryResultCompacter( repository.context.registry, queryContainer )
				.compactDocuments<T & Document>( rdfDocuments, targetDocuments );
		} )
		.catch( _getErrorResponseParserFn( repository.context.registry ) )
		;
}

function __executeQueryBuilder<T extends object>( repository:QueryableDocumentsRepositoryTrait, uri:string, requestOptions:RequestOptions, queryData:QueryData ):Promise<(T & Document)[]> {
	const { queryBuilderFn } = queryData;

	if( ! repository.context.registry.inScope( uri, true ) )
		return Promise.reject( new IllegalArgumentError( `"${ uri }" is out of scope.` ) );

	const url:string = repository.context
		.getObjectSchema()
		.resolveURI( uri, { base: true } );

	const queryContainer:QueryDocumentContainer = new QueryDocumentContainer( repository.context, {
		containerType: queryData.containerType,
		uri: url,
	} );

	const queryBuilder:QueryDocumentBuilder | QueryDocumentsBuilder = queryContainer._queryProperty.isMultipleContainer()
		? new QueryDocumentsBuilder( queryContainer, queryContainer._queryProperty )
		: new QueryDocumentBuilder( queryContainer, queryContainer._queryProperty );

	if( queryData.rootType !== void 0 ) queryContainer._queryProperty
		.setType( queryData.rootType );

	if( queryBuilderFn && queryBuilderFn.call( void 0, queryBuilder ) !== queryBuilder )
		throw new IllegalArgumentError( "The provided query builder was not returned" );

	return __executeQueryContainer<T>( repository, url, requestOptions, queryContainer )
		.then( documents => {
			if( ! queryContainer._queryProperty.order ) return documents;

			const { path, flow } = queryContainer._queryProperty.order;
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
		} );
}


function __getQueryable<T extends object>( repository:QueryableDocumentsRepositoryTrait, uri:string, requestOptions:RequestOptions, queryBuilderFn?:QueryBuilderFn ):Promise<T & Document> {
	RequestUtils.setRetrievalPreferences( { include: [ C.DocumentChecksums ] }, requestOptions );

	const queryData:QueryData = {
		containerType: QueryContainerType.DOCUMENT,
		queryBuilderFn,
	};

	return __executeQueryBuilder<T>( repository, uri, requestOptions, queryData )
		.then( ( documents ) => documents[ 0 ] );
}


function __addRefreshProperties( parentProperty:QueryProperty, queryableProperty:QueryableProperty ):void {
	queryableProperty.subProperties.forEach( ( subProperty, propertyName ) => {
		const queryProperty:QueryProperty = parentProperty._addSubProperty( propertyName, subProperty );
		__addRefreshProperties( queryProperty, subProperty );
	} );
}

function __refreshQueryable<T extends object>( this:void, repository:QueryableDocumentsRepositoryTrait, document:Document, requestOptions:RequestOptions = {} ):Promise<T & Document> {
	if( ! repository.context.registry.inScope( document.$id, true ) )
		return Promise.reject( new IllegalArgumentError( `"${ document.$id }" is out of scope.` ) );

	const url:string = repository.context
		.getObjectSchema()
		.resolveURI( document.$id, { base: true } );


	const queryContainer:QueryableMetadataContainer = new QueryableMetadataContainer( repository.context, document.$_queryableMetadata );
	__addRefreshProperties( queryContainer._queryProperty, document.$_queryableMetadata );

	RequestUtils.setRetrievalPreferences( { include: [ C.DocumentChecksums ] }, requestOptions );

	return __executeQueryContainer<T>( repository, url, requestOptions, queryContainer )
		.then( ( documents ) => documents[ 0 ] );
}


export type OverriddenMembers =
	| "get"
	| "resolve"
	| "refresh"
	| "saveAndRefresh"
	;

export type QueryableDocumentsRepositoryTraitFactory =
	& ModelPrototype<QueryableDocumentsRepositoryTrait, LDPDocumentsRepositoryTrait, OverriddenMembers>
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

			const target:Document | undefined = this.context.registry.hasPointer( uri ) ?
				this.context.registry.getPointer( uri, true ) :
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
				.get.call( this, uri, requestOptions )
				.then( ( document:T & Document ) => {
					// Remove query metadata if exists
					document.$_queryableMetadata = void 0;

					return document;
				} );
		},

		resolve<T extends object>( this:QueryableDocumentsRepositoryTrait, document:Document, requestOptionsOrQueryBuilderFn?:RequestOptions | QueryBuilderFn, queryBuilderFn?:QueryBuilderFn ):Promise<T & Document> {
			return this.get( document.$id, requestOptionsOrQueryBuilderFn, queryBuilderFn );
		},


		refresh<T extends object>( this:QueryableDocumentsRepositoryTrait, document:Document, requestOptions?:RequestOptions ):Promise<T & Document> {
			if( ! document.$isQueried() ) return LDPDocumentsRepositoryTrait.PROTOTYPE
				.refresh.call( this, document, requestOptions );

			return __refreshQueryable<T>( this, document, requestOptions );
		},

		saveAndRefresh<T extends object>( this:QueryableDocumentsRepositoryTrait, document:Document, requestOptions?:RequestOptions ):Promise<T & Document> {
			if( ! document.$_queryableMetadata ) return LDPDocumentsRepositoryTrait.PROTOTYPE
				.saveAndRefresh.call( this, document, requestOptions );

			if( document.$eTag === null ) return Promise.reject( new IllegalStateError( `The document "${ document.$id }" is locally outdated and cannot be saved.` ) );

			const cloneOptions:RequestOptions = RequestUtils.cloneOptions( requestOptions || {} );
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

			RequestUtils.setRetrievalPreferences( { include: [ C.DocumentChecksums ] }, requestOptions );

			return __executeQueryBuilder<T>( this, uri, requestOptions, {
				rootType: queryBuilderFn ? void 0 : QueryPropertyType.FULL,
				containerType: QueryContainerType.CHILDREN,
				queryBuilderFn,
			} );
		},

		getMembers<T extends object>( this:QueryableDocumentsRepositoryTrait, uri:string, requestOptionsOrQueryBuilderFn?:RequestOptions | QueryBuilderFn, queryBuilderFn?:QueryBuilderFn ):Promise<(T & Document)[]> {
			const requestOptions:RequestOptions = isObject( requestOptionsOrQueryBuilderFn ) ?
				requestOptionsOrQueryBuilderFn : {};

			queryBuilderFn = isFunction( requestOptionsOrQueryBuilderFn ) ?
				requestOptionsOrQueryBuilderFn : queryBuilderFn;

			RequestUtils.setRetrievalPreferences( { include: [ C.DocumentChecksums ] }, requestOptions );

			return __executeQueryBuilder<T>( this, uri, requestOptions, {
				rootType: queryBuilderFn ? void 0 : QueryPropertyType.FULL,
				containerType: QueryContainerType.MEMBERS,
				queryBuilderFn,
			} );
		},

		listChildren<T extends object>( this:QueryableDocumentsRepositoryTrait, uri:string, requestOptions:RequestOptions = {} ):Promise<(T & Document)[]> {
			return __executeQueryBuilder<T>( this, uri, requestOptions, {
				containerType: QueryContainerType.CHILDREN,
				rootType: QueryPropertyType.EMPTY,
			} );
		},

		listMembers<T extends object>( this:QueryableDocumentsRepositoryTrait, uri:string, requestOptions:RequestOptions = {} ):Promise<(T & Document)[]> {
			return __executeQueryBuilder<T>( this, uri, requestOptions, {
				rootType: QueryPropertyType.EMPTY,
				containerType: QueryContainerType.MEMBERS,
			} );
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
