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
	VariableToken,
} from "sparqler/tokens";
import { ModelDecorator } from "../../core";
import { Document } from "../../Document";
import { BasePersistedDocument } from "../../Document/BasePersistedDocument";
import { CRUDDocument } from "../../Document/CRUDDocument";
import {
	IllegalActionError,
	IllegalArgumentError,
	IllegalStateError
} from "../../Errors";
import { FreeResources } from "../../FreeResources";
import {
	RequestOptions,
	RequestUtils
} from "../../HTTP";
import {
	JSONLDCompacter,
	JSONLDParser
} from "../../JSONLD";
import {
	DocumentMetadata,
	ResponseMetadata
} from "../../LDP";
import { Pointer } from "../../Pointer";
import {
	RDFDocument,
	RDFNode,
	URI
} from "../../RDF";
import { DocumentsRegistry } from "../../Registry";
import { PersistedResource } from "../../Resource";
import {
	isBoolean,
	isDate,
	isFunction,
	isNumber,
	isObject,
	isString,
	PickSelfProps,
	promiseMethod
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


export interface QueryDocumentDocument extends BasePersistedDocument {
	get<T extends object>( queryBuilderFn:( queryBuilder:QueryDocumentBuilder ) => QueryDocumentBuilder ):Promise<T & Document>;
	get<T extends object>( requestOptions:RequestOptions, queryBuilderFn:( queryBuilder:QueryDocumentBuilder ) => QueryDocumentBuilder ):Promise<T & Document>;
	get<T extends object>( uri:string, queryBuilderFn:( queryBuilder:QueryDocumentBuilder ) => QueryDocumentBuilder ):Promise<T & Document>;
	get<T extends object>( uri:string, requestOptions:RequestOptions, queryBuilderFn:( queryBuilder:QueryDocumentBuilder ) => QueryDocumentBuilder ):Promise<T & Document>;

	resolve<T extends object>( queryBuilderFn:( queryBuilder:QueryDocumentBuilder ) => QueryDocumentBuilder ):Promise<T & Document>;
	resolve<T extends object>( requestOptions:RequestOptions, queryBuilderFn:( queryBuilder:QueryDocumentBuilder ) => QueryDocumentBuilder ):Promise<T & Document>;


	refresh<T extends object>( requestOptions?:RequestOptions ):Promise<T & this & Document>;

	save<T extends object>( requestOptions?:RequestOptions ):Promise<T & this & Document>;

	saveAndRefresh<T extends object>( requestOptions?:RequestOptions ):Promise<T & this & Document>;


	getChildren<T extends object>( requestOptions:RequestOptions, queryBuilderFn?:( queryBuilder:QueryDocumentsBuilder ) => QueryDocumentsBuilder ):Promise<(T & Document)[]>;
	getChildren<T extends object>( queryBuilderFn?:( queryBuilder:QueryDocumentsBuilder ) => QueryDocumentsBuilder ):Promise<(T & Document)[]>;
	getChildren<T extends object>( uri:string, requestOptions:RequestOptions, queryBuilderFn?:( queryBuilder:QueryDocumentsBuilder ) => QueryDocumentsBuilder ):Promise<(T & Document)[]>;
	getChildren<T extends object>( uri:string, queryBuilderFn?:( queryBuilder:QueryDocumentsBuilder ) => QueryDocumentsBuilder ):Promise<(T & Document)[]>;

	getMembers<T extends object>( requestOptions:RequestOptions, queryBuilderFn?:( queryBuilder:QueryDocumentsBuilder ) => QueryDocumentsBuilder ):Promise<(T & Document)[]>;
	getMembers<T extends object>( queryBuilderFn?:( queryBuilder:QueryDocumentsBuilder ) => QueryDocumentsBuilder ):Promise<(T & Document)[]>;
	getMembers<T extends object>( uri:string, requestOptions:RequestOptions, queryBuilderFn?:( queryBuilder:QueryDocumentsBuilder ) => QueryDocumentsBuilder ):Promise<(T & Document)[]>;
	getMembers<T extends object>( uri:string, queryBuilderFn?:( queryBuilder:QueryDocumentsBuilder ) => QueryDocumentsBuilder ):Promise<(T & Document)[]>;


	listChildren<T extends object>( requestOptions?:RequestOptions ):Promise<(T & Document)[]>;
	listChildren<T extends object>( uri:string, requestOptions?:RequestOptions ):Promise<(T & Document)[]>;

	listMembers<T extends object>( requestOptions?:RequestOptions ):Promise<(T & Document)[]>;
	listMembers<T extends object>( uri:string, requestOptions?:RequestOptions ):Promise<(T & Document)[]>;
}


type QueryBuilderFn = Function & (( queryBuilder:QueryDocumentBuilder ) => QueryDocumentBuilder);

const emptyQueryBuildFn:QueryBuilderFn = _ => _;


function getRegistry( repository:QueryDocumentDocument ):DocumentsRegistry {
	if( repository._registry ) return repository._registry;
	throw new IllegalActionError( `"${ repository.id }" doesn't support Querying requests.` );
}

function addAuthentication( registry:DocumentsRegistry, requestOptions:RequestOptions ):void {
	if( ! registry.context || ! registry.context.auth ) return;
	registry.context.auth.addAuthentication( requestOptions );
}


function executePatterns<T extends object>( registry:DocumentsRegistry, url:string, requestOptions:RequestOptions, queryContext:QueryContext, targetName:string, constructPatterns:PatternToken[], target?:T & QueryDocumentDocument ):Promise<(T & QueryDocumentDocument)[]> {
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
	addAuthentication( registry, requestOptions );

	return SPARQLService
		.executeRawCONSTRUCTQuery( url, query.toString(), requestOptions )
		.then( ( [ strConstruct ] ) => strConstruct )
		.then( ( jsonldString ) => {
			return new JSONLDParser().parse( jsonldString );
		} )
		.then<(T & QueryDocumentDocument)[]>( ( rdfNodes:RDFNode[] ) => {
			const freeNodes:RDFNode[] = RDFNode.getFreeNodes( rdfNodes );
			const freeResources:FreeResources = registry._parseFreeNodes( freeNodes );

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
				return [ target ];

			const rdfDocuments:RDFDocument[] = rdfNodes
				.filter<any>( RDFDocument.is );

			const targetDocuments:RDFDocument[] = rdfDocuments
				.filter( x => targetSet.has( x[ "@id" ] ) );

			return new JSONLDCompacter( registry, targetName, queryContext )
				.compactDocuments<T & QueryDocumentDocument>( rdfDocuments, targetDocuments );
		} )
		.catch( registry._parseErrorFromResponse.bind( this ) )
		;
}

function executeBuilder<T extends object>( registry:DocumentsRegistry, url:string, requestOptions:RequestOptions, queryContext:QueryContextBuilder, targetProperty:QueryProperty, queryBuilderFn?:QueryBuilderFn, target?:T & QueryDocumentDocument ):Promise<(T & QueryDocumentDocument)[]> {
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
	return executePatterns<T>( registry, url, requestOptions, queryContext, targetProperty.name, constructPatterns, target )
		.then( ( documents ) => {
			if( ! (queryBuilder instanceof QueryDocumentsBuilder && queryBuilder._orderData) )
				return documents;

			const { path, flow } = queryBuilder._orderData;
			const inverter:number = flow === "DESC" ? - 1 : 1;

			return documents.sort( ( a:any, b:any ) => {
				a = getPathProperty( a, path );
				b = getPathProperty( b, path );

				const aValue:any = Pointer.is( a ) ? a.id : a;
				const bValue:any = Pointer.is( b ) ? b.id : b;

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


function addRefreshPatterns( queryContext:QueryContextPartial, parentAdder:OptionalToken, resource:PersistedResource, parentName:string ):void {
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

		addRefreshPatterns( queryContext, propertyPattern, propertyFragment, path );
	} );
}

function getPartial<T extends object>( registry:DocumentsRegistry, uri:string, requestOptions:RequestOptions, queryBuilderFn?:QueryBuilderFn ):Promise<T & QueryDocumentDocument> {
	const queryContext:QueryContextBuilder = new QueryContextBuilder( registry.context );

	const documentProperty:QueryProperty = queryContext
		.addProperty( "document" )
		.setOptional( false );

	const propertyValue:ValuesToken = new ValuesToken().addValues( documentProperty.variable, queryContext.compactIRI( uri ) );
	documentProperty.addPattern( propertyValue );

	RequestUtils.setRetrievalPreferences( { include: [ C.PreferDocumentETags ] }, requestOptions );

	const target:(T & Document) | undefined = registry.hasPointer( uri ) ?
		registry.getPointer( uri ) as T & Document :
		void 0;

	return executeBuilder<T>( registry, uri, requestOptions, queryContext, documentProperty, queryBuilderFn, target )
		.then( ( documents ) => documents[ 0 ] );
}

function refreshPartial<T extends object>( registry:DocumentsRegistry, resource:QueryDocumentDocument, requestOptions:RequestOptions ):Promise<T & QueryDocumentDocument> {
	const url:string = RequestUtils.getRequestURLFor( registry, resource );
	const queryContext:QueryContextPartial = new QueryContextPartial( resource, registry.context );

	const targetName:string = "document";
	const constructPatterns:OptionalToken = new OptionalToken()
		.addPattern( new ValuesToken()
			.addValues( queryContext.getVariable( targetName ), new IRIToken( url ) )
		)
	;

	addRefreshPatterns( queryContext, constructPatterns, resource, targetName );

	RequestUtils.setRetrievalPreferences( { include: [ C.PreferDocumentETags ] }, requestOptions );

	return executePatterns<T>( registry, url, requestOptions, queryContext, targetName, constructPatterns.patterns, resource as any )
		.then( ( documents ) => documents[ 0 ] );
}


function executeChildrenBuilder<T extends object>( this:void, repository:QueryDocumentDocument, uri:string | undefined, requestOptions:RequestOptions, queryBuilderFn?:QueryBuilderFn ):Promise<(T & Document)[]> {
	return promiseMethod( () => {
		const registry:DocumentsRegistry = getRegistry( repository );
		const url:string = RequestUtils.getRequestURLFor( registry, repository, uri );

		const queryContext:QueryContextBuilder = new QueryContextBuilder( registry.context );
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

		return executeBuilder<T & Document>( registry, url, requestOptions, queryContext, childrenProperty, queryBuilderFn );
	} );
}

function executeMembersBuilder<T extends object>( this:void, repository:QueryDocumentDocument, uri:string | undefined, requestOptions:RequestOptions, queryBuilderFn?:( queryBuilder:QueryDocumentBuilder ) => QueryDocumentBuilder ):Promise<(T & Document)[]> {
	return promiseMethod( () => {
		const registry:DocumentsRegistry = getRegistry( repository );
		const url:string = RequestUtils.getRequestURLFor( registry, repository, uri );

		const queryContext:QueryContextBuilder = new QueryContextBuilder( registry.context );
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

		return executeBuilder<T & Document>( registry, url, requestOptions, queryContext, membersProperty, queryBuilderFn );
	} );
}


const PROTOTYPE:PickSelfProps<QueryDocumentDocument, BasePersistedDocument> = {
	get<T extends object>( this:QueryDocumentDocument, uriOrOptionsOrQueryBuilderFn:string | RequestOptions | QueryBuilderFn, optionsOrQueryBuilderFn?:RequestOptions | QueryBuilderFn, queryBuilderFn?:QueryBuilderFn ):Promise<T & Document> {
		return promiseMethod( () => {
			const registry:DocumentsRegistry = getRegistry( this );

			const uri:string | undefined = isString( uriOrOptionsOrQueryBuilderFn ) ? uriOrOptionsOrQueryBuilderFn : void 0;
			const url:string = RequestUtils.getRequestURLFor( registry, this, uri );

			const requestOptions:RequestOptions = isObject( uriOrOptionsOrQueryBuilderFn ) ?
				uriOrOptionsOrQueryBuilderFn : isObject( optionsOrQueryBuilderFn ) ? optionsOrQueryBuilderFn : {};

			queryBuilderFn = isFunction( uriOrOptionsOrQueryBuilderFn ) ? uriOrOptionsOrQueryBuilderFn :
				isFunction( optionsOrQueryBuilderFn ) ? optionsOrQueryBuilderFn : queryBuilderFn;

			return getPartial<T & Document>( registry, url, requestOptions, queryBuilderFn );
		} );
	},

	resolve<T extends object>( this:QueryDocumentDocument, optionsOrQueryBuilderFn:RequestOptions | QueryBuilderFn, queryBuilderFn?:QueryBuilderFn ):Promise<T & Document> {
		return promiseMethod( () => {
			const registry:DocumentsRegistry = getRegistry( this );
			const url:string = RequestUtils.getRequestURLFor( registry, this );

			const requestOptions:RequestOptions = isObject( optionsOrQueryBuilderFn ) ? optionsOrQueryBuilderFn : {};
			if( isFunction( optionsOrQueryBuilderFn ) ) queryBuilderFn = optionsOrQueryBuilderFn;

			return getPartial<T & Document>( registry, url, requestOptions, _ => {
				if( "types" in this ) this.types.forEach( type => _.withType( type ) );
				return queryBuilderFn.call( void 0, _ );
			} );
		} );
	},


	refresh<T extends object>( this:T & Document, requestOptions:RequestOptions = {} ):Promise<T & Document> {
		return promiseMethod( () => {
			const registry:DocumentsRegistry = getRegistry( this );
			if( ! this.isPartial() ) throw new IllegalArgumentError( `"${ this.id }" isn't a partial resource.` );

			return refreshPartial<T & Document>( registry, this, requestOptions );
		} );
	},

	save<T extends object>( this:QueryDocumentDocument, requestOptions:RequestOptions = {} ):Promise<T & Document> {
		getRegistry( this );
		if( this.isOutdated() ) return Promise.reject( new IllegalStateError( `"${ this.id }" is outdated and cannot be saved.` ) );

		return CRUDDocument.PROTOTYPE.save.call( this, requestOptions );
	},

	saveAndRefresh<T extends object>( this:QueryDocumentDocument, requestOptions:RequestOptions = {} ):Promise<T & Document> {
		return promiseMethod( () => {
			const registry:DocumentsRegistry = getRegistry( this );

			if( ! this.isPartial() ) throw new IllegalArgumentError( `"${ this.id }" isn't a valid partial resource.` );

			if( ! this.isDirty() ) return refreshPartial<T & Document>( registry, this, requestOptions );

			const cloneOptions:RequestOptions = RequestUtils.cloneOptions( requestOptions );
			return this.save<T & Document>( cloneOptions )
				.then<T & Document>( doc => {
					return refreshPartial( registry, doc, requestOptions );
				} );
		} );
	},


	getChildren<T extends object>( this:QueryDocumentDocument, uriOrQueryBuilderFnOrOptions:string | QueryBuilderFn | RequestOptions, queryBuilderFnOrOptions?:QueryBuilderFn | RequestOptions, queryBuilderFn?:QueryBuilderFn ):Promise<(T & Document)[]> {
		const iri:string | undefined = isString( uriOrQueryBuilderFnOrOptions ) ? uriOrQueryBuilderFnOrOptions : void 0;

		const requestOptions:RequestOptions = isObject( uriOrQueryBuilderFnOrOptions ) ? uriOrQueryBuilderFnOrOptions :
			isObject( queryBuilderFnOrOptions ) ? queryBuilderFnOrOptions : {};

		queryBuilderFn = isFunction( uriOrQueryBuilderFnOrOptions ) ? uriOrQueryBuilderFnOrOptions :
			isFunction( queryBuilderFnOrOptions ) ? queryBuilderFnOrOptions : queryBuilderFn;

		RequestUtils.setRetrievalPreferences( { include: [ C.PreferDocumentETags ] }, requestOptions );

		return executeChildrenBuilder( this, iri, requestOptions, queryBuilderFn );
	},

	getMembers<T extends object>( this:QueryDocumentDocument, uriOrQueryBuilderFnOrOptions:string | QueryBuilderFn | RequestOptions, queryBuilderFnOrOptions?:QueryBuilderFn | RequestOptions, queryBuilderFn?:QueryBuilderFn ):Promise<(T & Document)[]> {
		const iri:string | undefined = isString( uriOrQueryBuilderFnOrOptions ) ? uriOrQueryBuilderFnOrOptions : void 0;

		const requestOptions:RequestOptions = isObject( uriOrQueryBuilderFnOrOptions ) ? uriOrQueryBuilderFnOrOptions :
			isObject( queryBuilderFnOrOptions ) ? queryBuilderFnOrOptions : {};

		queryBuilderFn = isFunction( uriOrQueryBuilderFnOrOptions ) ? uriOrQueryBuilderFnOrOptions :
			isFunction( queryBuilderFnOrOptions ) ? queryBuilderFnOrOptions : queryBuilderFn;

		RequestUtils.setRetrievalPreferences( { include: [ C.PreferDocumentETags ] }, requestOptions );

		return executeMembersBuilder( this, iri, requestOptions, queryBuilderFn );
	},


	listChildren<T extends object>( this:QueryDocumentDocument, uriOrOptions:string | RequestOptions, requestOptions?:RequestOptions ):Promise<(T & Document)[]> {
		const uri:string | undefined = isString( uriOrOptions ) ? uriOrOptions : void 0;

		requestOptions = isObject( uriOrOptions ) ? uriOrOptions :
			requestOptions ? requestOptions : {};

		return executeChildrenBuilder( this, uri, requestOptions, emptyQueryBuildFn );
	},

	listMembers<T extends object>( this:QueryDocumentDocument, uriOrOptions:string | RequestOptions, requestOptions?:RequestOptions ):Promise<(T & Document)[]> {
		const uri:string | undefined = isString( uriOrOptions ) ? uriOrOptions : void 0;

		requestOptions = isObject( uriOrOptions ) ? uriOrOptions :
			requestOptions ? requestOptions : {};

		return executeMembersBuilder( this, uri, requestOptions, emptyQueryBuildFn );
	},
};

export interface QueryDocumentDocumentFactory {
	PROTOTYPE:PickSelfProps<QueryDocumentDocument, BasePersistedDocument>;

	isDecorated( object:object ):object is QueryDocumentDocument;

	decorate<T extends object>( object:T ):T & QueryDocumentDocument;
}

export const QueryDocumentDocument:QueryDocumentDocumentFactory = {
	PROTOTYPE,

	isDecorated( object:object ):object is QueryDocumentDocument {
		return isObject( object )
			&& ModelDecorator
				.hasPropertiesFrom( PROTOTYPE, object )
			;
	},

	decorate<T extends object>( object:T ):T & QueryDocumentDocument {
		if( QueryDocumentDocument.isDecorated( object ) ) return object;

		const resource:T & BasePersistedDocument = ModelDecorator
			.decorateMultiple( object, BasePersistedDocument );

		return ModelDecorator.definePropertiesFrom( PROTOTYPE, resource );
	},
};
