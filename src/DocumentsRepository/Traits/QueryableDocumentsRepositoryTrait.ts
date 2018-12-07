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
import { QueryablePointer } from "../../QueryDocuments/QueryablePointer";

import { QueryableProperty } from "../../QueryDocuments/QueryableProperty";
import { QueryContainer } from "../../QueryDocuments/QueryContainer";
import { QueryContainerPropertyType } from "../../QueryDocuments/QueryContainerPropertyType";
import { QueryDocumentBuilder } from "../../QueryDocuments/QueryDocumentBuilder";
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


/**
 * Trait of a {@link DocumentsRepository} with methods for advanced reading requests.
 */
export interface QueryableDocumentsRepositoryTrait extends LDPDocumentsRepositoryTrait {
	/**
	 * Retrieves the properties of the document of the URI specified set by the query function.
	 * @param uri URI of the document to be retrieved.
	 * @param queryBuilderFn Function that specify the structure of the document to be retrieved.
	 */
	get<T extends object>( uri:string, queryBuilderFn:( queryBuilder:QueryDocumentBuilder ) => QueryDocumentBuilder ):Promise<T & Document>;
	/**
	 * Retrieves the entire document of the URI specified or only the properties set by the query function when provided.
	 * @param uri URI of the document to be retrieved.
	 * @param requestOptions Customizable options for the request.
	 * @param queryBuilderFn Function that specify the structure of the document to be retrieved.
	 */
	get<T extends object>( uri:string, requestOptions?:GETOptions, queryBuilderFn?:( queryBuilder:QueryDocumentBuilder ) => QueryDocumentBuilder ):Promise<T & Document>;
	/**
	 * Retrieves the properties set by the query function, of the documents specified.
	 * @param uris URIs of the documents to be retrieved.
	 * @param queryBuilderFn Function that specify the structure of the documents to be retrieved.
	 */
	get<T extends object>( uris:string[], queryBuilderFn:( queryBuilder:QueryDocumentBuilder ) => QueryDocumentBuilder ):Promise<(T & Document)[]>;
	/**
	 * Retrieves the entire documents of the URIs specified or only the properties set by the query function when provided.
	 * @param uris URIs of the documents to be retrieved.
	 * @param requestOptions Customizable options for the request.
	 * @param queryBuilderFn Function that specify the structure of the documents to be retrieved.
	 */
	get<T extends object>( uris:string[], requestOptions?:GETOptions, queryBuilderFn?:( queryBuilder:QueryDocumentBuilder ) => QueryDocumentBuilder ):Promise<(T & Document)[]>;

	/**
	 * Resolves the properties of the document of the URI specified set by the query function.
	 * @param document Document to be resolved.
	 * @param queryBuilderFn Function that specify the structure of the document to be resolved.
	 */
	resolve<T extends object>( document:Document, queryBuilderFn:( queryBuilder:QueryDocumentBuilder ) => QueryDocumentBuilder ):Promise<T & Document>;
	/**
	 * Resolves the entire document of the URI specified or only the properties set by the query function when provided.
	 * @param document Document to be resolved.
	 * @param requestOptions Customizable options for the request.
	 * @param queryBuilderFn Function that specify the structure of the document to be resolved.
	 */
	resolve<T extends object>( document:Document, requestOptions?:GETOptions, queryBuilderFn?:( queryBuilder:QueryDocumentBuilder ) => QueryDocumentBuilder ):Promise<T & Document>;


	/**
	 * Refreshes with the latest data of the specified document.
	 * If the document was retrieved partially, only the partial properties will be refreshed.
	 * @param document The document to be refreshed.
	 * @param requestOptions Customizable options for the request.
	 */
	refresh<T extends object>( document:Document, requestOptions?:RequestOptions ):Promise<T & Document>;

	/**
	 * Saves the changes of the specified document and retrieves its latest changes.
	 * If the document was retrieved partially, only the partial properties will be refreshed.
	 * @param document The resource to saved and refreshed.
	 * @param requestOptions Customizable options for the request.
	 */
	saveAndRefresh<T extends object>( document:Document, requestOptions?:RequestOptions ):Promise<T & Document>;


	/**
	 * Retrieves the entire children of the document of the specified URI or only the properties set by the query function.
	 * @param uri URI of the document to retrieve its children.
	 * @param requestOptions Customizable options for the request.
	 * @param queryBuilderFn Function that specify the structure of the children to be retrieved.
	 */
	getChildren<T extends object>( uri:string, requestOptions:RequestOptions, queryBuilderFn?:( queryBuilder:QueryDocumentsBuilder ) => QueryDocumentsBuilder ):Promise<(T & Document)[]>;
	/**
	 * Retrieved the entire children of the document of the specified URI or only the properties set by the query function.
	 * @param uri URI of the document to retrieve its children.
	 * @param queryBuilderFn Function that specify the structure of the children to be retrieved.
	 */
	getChildren<T extends object>( uri:string, queryBuilderFn?:( queryBuilder:QueryDocumentsBuilder ) => QueryDocumentsBuilder ):Promise<(T & Document)[]>;

	/**
	 * Retrieves the entire members of the document of the specified URI or only the properties set by the query function.
	 * @param uri URI of the document to retrieve its members.
	 * @param requestOptions Customizable options for the request.
	 * @param queryBuilderFn Function that specify the structure of the members to be retrieved.
	 */
	getMembers<T extends object>( uri:string, requestOptions:RequestOptions, queryBuilderFn?:( queryBuilder:QueryDocumentsBuilder ) => QueryDocumentsBuilder ):Promise<(T & Document)[]>;
	/**
	 * Retrieved the entire members of the document of the specified URI or only the properties set by the query function.
	 * @param uri URI of the document to retrieve its members.
	 * @param queryBuilderFn Function that specify the structure of the members to be retrieved.
	 */
	getMembers<T extends object>( uri:string, queryBuilderFn?:( queryBuilder:QueryDocumentsBuilder ) => QueryDocumentsBuilder ):Promise<(T & Document)[]>;

	/**
	 * Retrieves the shallow children of the document of the specified URI.
	 * @param uri URI of the document to retrieve its shallow children.
	 * @param requestOptions Customizable options for the request.
	 */
	listChildren<T extends object>( uri:string, requestOptions?:RequestOptions ):Promise<(T & Document)[]>;

	/**
	 * Retrieves the shallow members of the document of the specified URI
	 * @param uri URI of the document to retrieve its shallow members.
	 * @param requestOptions Customizable options for the request.
	 */
	listMembers<T extends object>( uri:string, requestOptions?:RequestOptions ):Promise<(T & Document)[]>;
}


type QueryData = {
	containerPropertyType?:QueryContainerPropertyType;
	queryBuilderFn?:QueryBuilderFn;
	rootType?:QueryPropertyType;
};


function __executeQueryBuilder( queryContainer:QueryContainer, queryData:QueryData ):void {
	const queryBuilder:QueryDocumentBuilder | QueryDocumentsBuilder = "containerPropertyType" in queryContainer._queryProperty
		? new QueryDocumentsBuilder( queryContainer, queryContainer._queryProperty )
		: new QueryDocumentBuilder( queryContainer, queryContainer._queryProperty );

	if( queryData.rootType !== void 0 ) queryContainer._queryProperty
		.setType( queryData.rootType );

	if( queryData.queryBuilderFn && queryData.queryBuilderFn.call( void 0, queryBuilder ) !== queryBuilder )
		throw new IllegalArgumentError( "The provided query builder was not returned" );
}

function __sortQueryDocuments<T extends Document>( queryContainer:QueryContainer, documents:T[] ):T[] {
	if( ! ("order" in queryContainer._queryProperty) || ! queryContainer._queryProperty.order ) return documents;

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
}


function __requestQueryDocuments<T extends object>( this:void, repository:QueryableDocumentsRepositoryTrait, url:string, requestOptions:RequestOptions, queryContainer:QueryContainer ):Promise<(T & Document)[]> {
	const construct:ConstructToken = new ConstructToken()
		.addTriple(
			// Add QueryMetadata of the target elements
			new SubjectToken( new IRIRefToken( `cldp-sdk://metadata-${UUIDUtils.generate()}` ) )
				.addProperty( new PropertyToken( "a" )
					.addObject( queryContainer.compactIRI( C.VolatileResource ) )
					.addObject( queryContainer.compactIRI( C.QueryMetadata ) )
				)
				.addProperty( new PropertyToken( queryContainer.compactIRI( C.target ) )
					.addObject( queryContainer._queryProperty.identifier )
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
	RequestUtils.setRetrievalPreferences( { include: [ C.PreferResultsContexts ] }, requestOptions );

	return SPARQLService
		.executeRawCONSTRUCTQuery( url, query.toString(), requestOptions )
		.then( ( [ strConstruct ] ) => strConstruct )
		.then( ( jsonldString ) => {
			return new JSONLDParser().parse( jsonldString );
		} )
		.then<(T & Document)[]>( ( rdfNodes:RDFNode[] ) => {
			const freeNodes:RDFNode[] = RDFDocument.getFreeNodes( rdfNodes );

			rdfNodes.forEach( ( node, index ) => { // TODO: Remove when `cldp-sdk://` fixed
				if( ! RDFNode.getID( node ).startsWith( "cldp-sdk://" ) ) return;
				if( ! Array.isArray( node[ "@graph" ] ) ) return;

				freeNodes.push( ...node[ "@graph" ] as RDFNode[] );
				rdfNodes.splice( index, 1 );
			} );

			const freeResources:FreeResources = FreeResources
				.parseFreeNodes( repository.context.registry, freeNodes );

			const targetDocuments:string[] = freeResources
				.getPointers( true )
				.filter( QueryMetadata.is )
				.map( x => x.targets )
				.reduce( ( targets, x ) => targets.concat( x ), [] )
				.map( x => x.$id )
			;

			const rdfDocuments:RDFDocument[] = rdfNodes
				.filter( RDFDocument.is );

			return new QueryResultCompacter( repository.context.registry, queryContainer )
				.compactDocuments<T & Document>( rdfDocuments, targetDocuments );
		} )
		.then( documents => __sortQueryDocuments( queryContainer, documents ) )
		.catch( _getErrorResponseParserFn( repository.context.registry ) )
		;
}


function __requestRelations<T extends object>( repository:QueryableDocumentsRepositoryTrait, uri:string, requestOptions:RequestOptions, queryData:QueryData ):Promise<(T & Document)[]> {
	if( ! repository.context.registry.inScope( uri, true ) )
		return Promise.reject( new IllegalArgumentError( `"${uri}" is out of scope.` ) );

	const url:string = repository.context
		.getObjectSchema()
		.resolveURI( uri, { base: true } );

	const queryContainer:QueryContainer = new QueryContainer( repository.context, {
		containerPropertyType: queryData.containerPropertyType,
		uri: url,
	} );

	__executeQueryBuilder( queryContainer, queryData );

	return __requestQueryDocuments<T>( repository, url, requestOptions, queryContainer );
}

function __requestDocuments<T extends object>( repository:QueryableDocumentsRepositoryTrait, uris:string[], requestOptions:RequestOptions, queryData:QueryData ):Promise<(T & Document)[]> {
	for( const uri of uris ) {
		if( ! repository.context.registry.inScope( uri, true ) )
			return Promise.reject( new IllegalArgumentError( `"${uri}" is out of scope.` ) );
	}

	const urls:string[] = uris.map( uri => repository.context
		.getObjectSchema()
		.resolveURI( uri, { base: true } )
	);

	const queryContainer:QueryContainer = new QueryContainer( repository.context, {
		uris: urls,
	} );

	__executeQueryBuilder( queryContainer, queryData );

	const url:string = urls.length === 1 ? urls[ 0 ] : repository.context.baseURI;
	RequestUtils.setRetrievalPreferences( { include: [ C.PreferDocumentChecksums ] }, requestOptions );

	return __requestQueryDocuments<T>( repository, url, requestOptions, queryContainer );
}


function __getQueryable<T extends object>( repository:QueryableDocumentsRepositoryTrait, uri:string, requestOptions:RequestOptions, queryBuilderFn?:QueryBuilderFn ):Promise<T & Document> {
	return __requestDocuments<T>( repository, [ uri ], requestOptions, { queryBuilderFn } )
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
		return Promise.reject( new IllegalArgumentError( `"${document.$id}" is out of scope.` ) );

	const url:string = repository.context
		.getObjectSchema()
		.resolveURI( document.$id, { base: true } );


	const queryContainer:QueryContainer = new QueryContainer( repository.context, { uris: [ url ] } );
	__addRefreshProperties( queryContainer._queryProperty, document.$_queryableMetadata );

	RequestUtils.setRetrievalPreferences( { include: [ C.PreferDocumentChecksums ] }, requestOptions );

	return __requestQueryDocuments<T>( repository, url, requestOptions, queryContainer )
		.then( ( documents ) => documents[ 0 ] );
}


export type OverriddenMembers =
	| "get"
	| "resolve"
	| "refresh"
	| "saveAndRefresh"
	;

/**
 * Factory, decorator and utils for {@link QueryableDocumentsRepositoryTrait}.
 */
export type QueryableDocumentsRepositoryTraitFactory =
	& ModelPrototype<QueryableDocumentsRepositoryTrait, LDPDocumentsRepositoryTrait, OverriddenMembers>
	& ModelDecorator<QueryableDocumentsRepositoryTrait, BaseDocumentsRepository>
	;

type QueryBuilderFn = Function & (( queryBuilder:QueryDocumentBuilder ) => QueryDocumentBuilder);

/**
 * Constant that implements {@link QueryableDocumentsRepositoryTraitFactory}.
 */
export const QueryableDocumentsRepositoryTrait:QueryableDocumentsRepositoryTraitFactory = {
	PROTOTYPE: {
		get<T extends object>( this:QueryableDocumentsRepositoryTrait, uriOrURIs:string | string[], requestOptionsOrQueryBuilderFn?:GETOptions | QueryBuilderFn, queryBuilderFn?:QueryBuilderFn ):Promise<(T & Document) | (T & Document)[]> {
			const requestOptions:GETOptions = isObject( requestOptionsOrQueryBuilderFn ) ?
				requestOptionsOrQueryBuilderFn : {};

			queryBuilderFn = isFunction( requestOptionsOrQueryBuilderFn ) ?
				requestOptionsOrQueryBuilderFn : queryBuilderFn;

			if( typeof uriOrURIs !== "string" ) {
				return __requestDocuments<T>( this, uriOrURIs, requestOptions, {
					rootType: queryBuilderFn ? void 0 : QueryPropertyType.FULL,
					queryBuilderFn,
				} );
			}

			const uri:string = uriOrURIs;
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
					if( ! document.$_queryableMetadata )
						return document;

					// Remove possible query metadata

					const resources:QueryablePointer[] = document.$getFragments();
					resources.push( document );

					resources.forEach( resource => {
						resource.$_queryableMetadata = void 0;
					} );

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

			if( document.$eTag === null ) return Promise.reject( new IllegalStateError( `The document "${document.$id}" is locally outdated and cannot be saved.` ) );

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

			RequestUtils.setRetrievalPreferences( { include: [ C.PreferDocumentChecksums ] }, requestOptions );

			return __requestRelations<T>( this, uri, requestOptions, {
				rootType: queryBuilderFn ? void 0 : QueryPropertyType.FULL,
				containerPropertyType: QueryContainerPropertyType.CHILD,
				queryBuilderFn,
			} );
		},

		getMembers<T extends object>( this:QueryableDocumentsRepositoryTrait, uri:string, requestOptionsOrQueryBuilderFn?:RequestOptions | QueryBuilderFn, queryBuilderFn?:QueryBuilderFn ):Promise<(T & Document)[]> {
			const requestOptions:RequestOptions = isObject( requestOptionsOrQueryBuilderFn ) ?
				requestOptionsOrQueryBuilderFn : {};

			queryBuilderFn = isFunction( requestOptionsOrQueryBuilderFn ) ?
				requestOptionsOrQueryBuilderFn : queryBuilderFn;

			RequestUtils.setRetrievalPreferences( { include: [ C.PreferDocumentChecksums ] }, requestOptions );

			return __requestRelations<T>( this, uri, requestOptions, {
				rootType: queryBuilderFn ? void 0 : QueryPropertyType.FULL,
				containerPropertyType: QueryContainerPropertyType.MEMBER,
				queryBuilderFn,
			} );
		},

		listChildren<T extends object>( this:QueryableDocumentsRepositoryTrait, uri:string, requestOptions:RequestOptions = {} ):Promise<(T & Document)[]> {
			return __requestRelations<T>( this, uri, requestOptions, {
				containerPropertyType: QueryContainerPropertyType.CHILD,
				rootType: QueryPropertyType.EMPTY,
			} );
		},

		listMembers<T extends object>( this:QueryableDocumentsRepositoryTrait, uri:string, requestOptions:RequestOptions = {} ):Promise<(T & Document)[]> {
			return __requestRelations<T>( this, uri, requestOptions, {
				rootType: QueryPropertyType.EMPTY,
				containerPropertyType: QueryContainerPropertyType.MEMBER,
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
