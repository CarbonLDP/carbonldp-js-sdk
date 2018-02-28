import { QueryClause } from "sparqler/clauses";
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

import {
	AccessPoint,
	AccessPointBase,
} from "./AccessPoint";
import * as Auth from "./Auth";
import { Carbon } from "./Carbon";
import { Context } from "./Context";
import { Document } from "./Document";
import * as Errors from "./Errors";
import { FreeResources } from "./FreeResources";
import { statusCodeMap } from "./HTTP/Errors";
import { HTTPError } from "./HTTP/Errors/HTTPError";
import { BadResponseError } from "./HTTP/Errors/ServerErrors/BadResponseError";
import { UnknownError } from "./HTTP/Errors/UnknownError";
import { Header } from "./HTTP/Header";
import { HTTPMethod } from "./HTTP/HTTPMethod";
import { Parser } from "./HTTP/Parser";
import {
	GETOptions,
	RequestOptions,
	RequestService,
	RequestUtils,
	RetrievalPreferences,
} from "./HTTP/Request";
import { Response } from "./HTTP/Response";
import { JSONLDCompacter } from "./JSONLD/Compacter";
import { JSONLDConverter } from "./JSONLD/Converter";
import { JSONLDParser } from "./JSONLD/Parser";
import {
	AddMemberAction,
	DocumentMetadata,
	ErrorResponse,
	RemoveMemberAction,
	ResponseMetadata,
} from "./LDP";
import * as LDPatch from "./LDPatch";
import * as Messaging from "./Messaging";
import {
	createDestination,
	validateEventContext,
} from "./Messaging/Utils";
import {
	DigestedObjectSchema,
	ObjectSchemaDigester,
	ObjectSchemaResolver,
	ObjectSchemaUtils,
} from "./ObjectSchema";
import * as PersistedAccessPoint from "./PersistedAccessPoint";
import * as PersistedBlankNode from "./PersistedBlankNode";
import * as PersistedDocument from "./PersistedDocument";
import * as PersistedFragment from "./PersistedFragment";
import * as PersistedProtectedDocument from "./PersistedProtectedDocument";
import * as PersistedResource from "./PersistedResource";
import {
	Pointer,
	PointerLibrary,
	PointerValidator,
} from "./Pointer";
import * as ProtectedDocument from "./ProtectedDocument";
import * as RDF from "./RDF";
import { RDFDocumentParser } from "./RDF/Document";
import { Resource } from "./Resource";
import {
	FinishSPARQLSelect,
	SPARQLBuilder,
} from "./SPARQL/Builder";
import {
	QueryContextBuilder,
	QueryContextPartial,
	QueryDocumentBuilder,
	QueryDocumentsBuilder,
	QueryMetadata,
	QueryProperty,
} from "./SPARQL/QueryDocument";
import { PartialMetadata } from "./SPARQL/QueryDocument/PartialMetadata";
import { QueryContext } from "./SPARQL/QueryDocument/QueryContext";
import {
	areDifferentType,
	createAllPattern,
	createPropertyPatterns,
	createTypesPattern,
	getAllTriples,
	getPathProperty,
} from "./SPARQL/QueryDocument/Utils";
import { SPARQLRawResults } from "./SPARQL/RawResults";
import { SPARQLSelectResults } from "./SPARQL/SELECTResults";
import { SPARQLService } from "./SPARQL/Service";
import * as Utils from "./Utils";
import {
	mapTupleArray,
	promiseMethod
} from "./Utils";
import { C } from "./Vocabularies/C";
import { LDP } from "./Vocabularies/LDP";

export class Documents implements PointerLibrary, PointerValidator, ObjectSchemaResolver {

	private _jsonldConverter:JSONLDConverter;
	get jsonldConverter():JSONLDConverter { return this._jsonldConverter; }

	private _documentDecorators:Map<string, ( object:object, documents?:Documents ) => object>;
	get documentDecorators():Map<string, ( object:object, documents?:Documents ) => object> { return this._documentDecorators; }

	private context:Context;
	private pointers:Map<string, Pointer>;

	// Tracks the documents that are being resolved to avoid triggering repeated requests
	private documentsBeingResolved:Map<string, Promise<[ PersistedDocument.Class, Response ]>>;

	constructor( context?:Context ) {
		this.context = context;

		this.pointers = new Map<string, Pointer>();
		this.documentsBeingResolved = new Map<string, Promise<[ PersistedDocument.Class, Response ]>>();

		if( ! ! this.context && ! ! this.context.parentContext ) {
			let contextJSONLDConverter:JSONLDConverter = this.context.parentContext.documents.jsonldConverter;
			this._jsonldConverter = new JSONLDConverter( contextJSONLDConverter.literalSerializers );
		} else {
			this._jsonldConverter = new JSONLDConverter();
		}

		let decorators:Documents[ "documentDecorators" ] = new Map();
		if( this.context && this.context.parentContext ) {
			let parentDecorators:Documents[ "documentDecorators" ] = this.context.parentContext.documents.documentDecorators;
			if( parentDecorators ) decorators = this._documentDecorators = Utils.MapUtils.extend( decorators, parentDecorators );
		} else {
			decorators.set( ProtectedDocument.RDF_CLASS, PersistedProtectedDocument.Factory.decorate );
			decorators.set( Auth.ACL.RDF_CLASS, Auth.PersistedACL.Factory.decorate );
			decorators.set( Auth.User.RDF_CLASS, Auth.PersistedUser.Factory.decorate );
			decorators.set( Auth.Role.RDF_CLASS, Auth.PersistedRole.Factory.decorate );
			decorators.set( Auth.Credentials.RDF_CLASS, Auth.PersistedCredentials.Factory.decorate );
		}

		this._documentDecorators = decorators;
	}

	inScope( pointer:Pointer ):boolean;
	inScope( id:string ):boolean;
	inScope( idOrPointer:any ):boolean {
		let id:string = Pointer.is( idOrPointer ) ? idOrPointer.id : idOrPointer;

		if( RDF.URI.Util.isBNodeID( id ) ) return false;

		if( ! ! this.context ) {
			id = ObjectSchemaUtils.resolveURI( id, this.context.getObjectSchema() );

			if( RDF.URI.Util.isRelative( id ) ) return true;
			if( RDF.URI.Util.isBaseOf( this.context.baseURI, id ) ) return true;
		} else {
			if( RDF.URI.Util.isAbsolute( id ) ) return true;
		}

		if( ! ! this.context && ! ! this.context.parentContext ) return this.context.parentContext.documents.inScope( id );

		return RDF.URI.Util.isRelative( id );
	}

	hasPointer( id:string ):boolean {
		id = this.getPointerID( id );

		if( this.pointers.has( id ) ) return true;

		if( ! ! this.context && ! ! this.context.parentContext ) return this.context.parentContext.documents.hasPointer( id );

		return false;
	}

	getPointer( id:string ):Pointer {
		let localID:string = this.getPointerID( id );

		if( localID === null ) {
			if( ! ! this.context && ! ! this.context.parentContext ) return this.context.parentContext.documents.getPointer( id );
			throw new Errors.IllegalArgumentError( "The pointer id is not supported by this module." );
		}

		let pointer:Pointer;
		if( ! this.pointers.has( localID ) ) {
			pointer = this.createPointer( localID );
			this.pointers.set( localID, pointer );
		}

		return this.pointers.get( localID );
	}

	removePointer( idOrPointer:string | Pointer ):boolean {
		let id:string = Utils.isString( idOrPointer ) ? idOrPointer : idOrPointer.id;
		let localID:string = this.getPointerID( id );

		if( localID === null ) {
			if( ! ! this.context && ! ! this.context.parentContext ) return this.context.parentContext.documents.removePointer( id );
			return false;
		}

		return this.pointers.delete( localID );
	}

	get<T extends object>( uri:string, requestOptions?:GETOptions, queryBuilderFn?:( queryBuilder:QueryDocumentBuilder.Class ) => QueryDocumentBuilder.Class ):Promise<[ T & PersistedDocument.Class, Response ]>;
	get<T extends object>( uri:string, queryBuilderFn?:( queryBuilder:QueryDocumentBuilder.Class ) => QueryDocumentBuilder.Class ):Promise<[ T & PersistedDocument.Class, Response ]>;
	get<T extends object>( uri:string, optionsOrQueryBuilderFn:any, queryBuilderFn?:( queryBuilder:QueryDocumentBuilder.Class ) => QueryDocumentBuilder.Class ):Promise<[ T & PersistedDocument.Class, Response ]> {
		const requestOptions:RequestOptions = RequestUtils.isOptions( optionsOrQueryBuilderFn ) ? optionsOrQueryBuilderFn : {};
		if( Utils.isFunction( optionsOrQueryBuilderFn ) ) queryBuilderFn = optionsOrQueryBuilderFn;

		return promiseMethod( () => {
			uri = this.getRequestURI( uri );

			return queryBuilderFn ?
				this.getPartialDocument( uri, requestOptions, queryBuilderFn ) :
				this.getFullDocument( uri, requestOptions );
		} );
	}

	exists( documentURI:string, requestOptions:RequestOptions = {} ):Promise<[ boolean, Response ]> {
		return promiseMethod( () => {
			documentURI = this.getRequestURI( documentURI );
			this.setDefaultRequestOptions( requestOptions, LDP.RDFSource );

			return this.sendRequest( HTTPMethod.HEAD, documentURI, requestOptions );
		} ).then<[ boolean, Response ]>( ( response:Response ) => {
			return [ true, response ];
		} ).catch<[ boolean, Response ]>( ( error:HTTPError ) => {
			if( error.statusCode === 404 ) return [ false, error.response ];
			return Promise.reject( error );
		} );
	}

	createChild<T extends object>( parentURI:string, childObject:T, slug?:string, requestOptions?:RequestOptions ):Promise<[ T & PersistedProtectedDocument.Class, Response ]>;
	createChild<T extends object>( parentURI:string, childObject:T, requestOptions?:RequestOptions ):Promise<[ T & PersistedProtectedDocument.Class, Response ]>;
	createChild<T extends object>( parentURI:string, childObject:T, slugOrRequestOptions?:any, requestOptions:RequestOptions = {} ):Promise<[ T & PersistedProtectedDocument.Class, Response ]> {
		const slug:string = Utils.isString( slugOrRequestOptions ) ? slugOrRequestOptions : null;
		requestOptions = ! Utils.isString( slugOrRequestOptions ) && ! ! slugOrRequestOptions ? slugOrRequestOptions : requestOptions;

		return promiseMethod( () => {
			parentURI = this.getRequestURI( parentURI );
			RequestUtils.setPreferredRetrieval( "minimal", requestOptions );

			return this.persistChildDocument<T>( parentURI, childObject, slug, requestOptions );
		} );
	}

	createChildren<T extends object>( parentURI:string, childrenObjects:T[], slugs?:string[], requestOptions?:RequestOptions ):Promise<[ (T & PersistedProtectedDocument.Class)[], Response[] ]>;
	createChildren<T extends object>( parentURI:string, childrenObjects:T[], requestOptions?:RequestOptions ):Promise<[ (T & PersistedProtectedDocument.Class)[], Response[] ]>;
	createChildren<T extends object>( parentURI:string, childrenObjects:T[], slugsOrRequestOptions?:any, requestOptions:RequestOptions = {} ):Promise<[ (T & PersistedProtectedDocument.Class)[], Response[] ]> {
		const slugs:string[] = Utils.isArray( slugsOrRequestOptions ) ? slugsOrRequestOptions : [];
		requestOptions = ! Utils.isArray( slugsOrRequestOptions ) && ! ! slugsOrRequestOptions ? slugsOrRequestOptions : requestOptions;

		return promiseMethod( () => {
			parentURI = this.getRequestURI( parentURI );
			RequestUtils.setPreferredRetrieval( "minimal", requestOptions );

			return Promise.all<[ T & PersistedProtectedDocument.Class, Response ]>( childrenObjects.map( ( childObject:T, index:number ) => {
				const cloneOptions:RequestOptions = RequestUtils.cloneOptions( requestOptions );
				return this.persistChildDocument<T>( parentURI, childObject, slugs[ index ], cloneOptions );
			} ) );
		} ).then( mapTupleArray );
	}

	createChildAndRetrieve<T extends object>( parentURI:string, childObject:T, slug?:string, requestOptions?:RequestOptions ):Promise<[ T & PersistedProtectedDocument.Class, Response ]>;
	createChildAndRetrieve<T extends object>( parentURI:string, childObject:T, requestOptions?:RequestOptions ):Promise<[ T & PersistedProtectedDocument.Class, Response ]>;
	createChildAndRetrieve<T extends object>( parentURI:string, childObject:T, slugOrRequestOptions?:any, requestOptions:RequestOptions = {} ):Promise<[ T & PersistedProtectedDocument.Class, Response ]> {
		requestOptions = RequestUtils.isOptions( slugOrRequestOptions ) ? slugOrRequestOptions : requestOptions;
		const slug:string = Utils.isString( slugOrRequestOptions ) ? slugOrRequestOptions : null;

		return promiseMethod( () => {
			parentURI = this.getRequestURI( parentURI );
			RequestUtils.setPreferredRetrieval( "representation", requestOptions );

			return this.persistChildDocument<T>( parentURI, childObject, slug, requestOptions );
		} );
	}

	createChildrenAndRetrieve<T extends object>( parentURI:string, childrenObjects:T[], slugs?:string[], requestOptions?:RequestOptions ):Promise<[ (T & PersistedProtectedDocument.Class)[], Response[] ]>;
	createChildrenAndRetrieve<T extends object>( parentURI:string, childrenObjects:T[], requestOptions?:RequestOptions ):Promise<[ (T & PersistedProtectedDocument.Class)[], Response[] ]>;
	createChildrenAndRetrieve<T extends object>( parentURI:string, childrenObjects:T[], slugsOrRequestOptions?:any, requestOptions:RequestOptions = {} ):Promise<[ (T & PersistedProtectedDocument.Class)[], Response[] ]> {
		const slugs:string[] = Utils.isArray( slugsOrRequestOptions ) ? slugsOrRequestOptions : [];
		requestOptions = ! Utils.isArray( slugsOrRequestOptions ) && ! ! slugsOrRequestOptions ? slugsOrRequestOptions : requestOptions;

		return promiseMethod( () => {
			parentURI = this.getRequestURI( parentURI );
			RequestUtils.setPreferredRetrieval( "representation", requestOptions );

			return Promise.all<[ T & PersistedProtectedDocument.Class, Response ]>( childrenObjects.map( ( childObject:T, index:number ) => {
				const cloneOptions:RequestOptions = RequestUtils.cloneOptions( requestOptions );
				return this.persistChildDocument<T>( parentURI, childObject, slugs[ index ], cloneOptions );
			} ) );
		} ).then( mapTupleArray );
	}


	listChildren( parentURI:string, requestOptions?:RequestOptions ):Promise<[ PersistedDocument.Class[], Response ]> {
		return promiseMethod( () => {
			parentURI = this.getRequestURI( parentURI );

			const queryContext:QueryContextBuilder.Class = new QueryContextBuilder.Class( this.context );
			const childrenVar:VariableToken = queryContext.getVariable( "child" );

			const pattens:PatternToken[] = [
				new SubjectToken( queryContext.compactIRI( parentURI ) )
					.addPredicate( new PredicateToken( queryContext.compactIRI( LDP.contains ) )
						.addObject( childrenVar )
					),
			];

			return this.executeSelectPatterns( parentURI, requestOptions, queryContext, "child", pattens );
		} );
	}

	getChildren<T extends object>( parentURI:string, requestOptions:RequestOptions, queryBuilderFn?:( queryBuilder:QueryDocumentsBuilder.Class ) => QueryDocumentsBuilder.Class ):Promise<[ (T & PersistedDocument.Class)[], Response ]>;
	getChildren<T extends object>( parentURI:string, queryBuilderFn?:( queryBuilder:QueryDocumentsBuilder.Class ) => QueryDocumentsBuilder.Class ):Promise<[ (T & PersistedDocument.Class)[], Response ]>;
	getChildren<T extends object>( parentURI:string, requestOptionsOrQueryBuilderFn?:any, queryBuilderFn?:( queryBuilder:QueryDocumentsBuilder.Class ) => QueryDocumentsBuilder.Class ):Promise<[ (T & PersistedDocument.Class)[], Response ]> {
		const requestOptions:RequestOptions = RequestUtils.isOptions( requestOptionsOrQueryBuilderFn ) ? requestOptionsOrQueryBuilderFn : {};
		queryBuilderFn = Utils.isFunction( requestOptionsOrQueryBuilderFn ) ? requestOptionsOrQueryBuilderFn : queryBuilderFn;

		return promiseMethod( () => {
			parentURI = this.getRequestURI( parentURI );

			const queryContext:QueryContextBuilder.Class = new QueryContextBuilder.Class( this.context );
			const childrenProperty:QueryProperty.Class = queryContext
				.addProperty( "child" )
				.setOptional( false );

			const selectChildren:SelectToken = new SelectToken()
				.addVariable( childrenProperty.variable )
				.addPattern( new SubjectToken( queryContext.compactIRI( parentURI ) )
					.addPredicate( new PredicateToken( queryContext.compactIRI( LDP.contains ) )
						.addObject( childrenProperty.variable )
					)
				)
			;
			childrenProperty.addPattern( selectChildren );

			return this.executeQueryBuilder<T>( parentURI, requestOptions, queryContext, childrenProperty, queryBuilderFn );
		} );
	}

	createAccessPoint<T extends object>( documentURI:string, accessPoint:T & AccessPointBase, slug?:string, requestOptions?:RequestOptions ):Promise<[ T & PersistedAccessPoint.Class, Response ]>;
	createAccessPoint<T extends object>( documentURI:string, accessPoint:T & AccessPointBase, requestOptions?:RequestOptions ):Promise<[ T & PersistedAccessPoint.Class, Response ]>;
	createAccessPoint<T extends object>( documentURI:string, accessPoint:T & AccessPointBase, slugOrRequestOptions:any, requestOptions:RequestOptions = {} ):Promise<[ T & PersistedAccessPoint.Class, Response ]> {
		const slug:string = Utils.isString( slugOrRequestOptions ) ? slugOrRequestOptions : null;
		requestOptions = ! Utils.isString( slugOrRequestOptions ) && ! ! slugOrRequestOptions ? slugOrRequestOptions : requestOptions;

		return promiseMethod( () => {
			documentURI = this.getRequestURI( documentURI );
			RequestUtils.setPreferredRetrieval( "minimal", requestOptions );

			return this.persistAccessPoint( documentURI, accessPoint, slug, requestOptions );
		} );
	}

	createAccessPoints<T extends object>( documentURI:string, accessPoints:(T & AccessPointBase)[], slugs?:string[], requestOptions?:RequestOptions ):Promise<[ (T & PersistedAccessPoint.Class)[], Response[] ]>;
	createAccessPoints<T extends object>( documentURI:string, accessPoints:(T & AccessPointBase)[], requestOptions?:RequestOptions ):Promise<[ (T & PersistedAccessPoint.Class)[], Response[] ]>;
	createAccessPoints<T extends object>( documentURI:string, accessPoints:(T & AccessPointBase)[], slugsOrRequestOptions:any, requestOptions:RequestOptions = {} ):Promise<[ (T & PersistedAccessPoint.Class)[], Response[] ]> {
		const slugs:string[] = Utils.isArray( slugsOrRequestOptions ) ? slugsOrRequestOptions : [];
		requestOptions = ! Utils.isArray( slugsOrRequestOptions ) && ! ! slugsOrRequestOptions ? slugsOrRequestOptions : requestOptions;

		return promiseMethod( () => {
			documentURI = this.getRequestURI( documentURI );
			RequestUtils.setPreferredRetrieval( "minimal", requestOptions );

			return Promise.all<[ T & PersistedAccessPoint.Class, Response ]>( accessPoints.map( ( accessPoint:T & AccessPointBase, index:number ) => {
				const cloneOptions:RequestOptions = RequestUtils.cloneOptions( requestOptions );
				return this.persistAccessPoint<T>( documentURI, accessPoint, slugs[ index ], cloneOptions );
			} ) );
		} ).then( mapTupleArray );
	}

	listMembers( uri:string, requestOptions?:RequestOptions ):Promise<[ PersistedDocument.Class[], Response ]> {
		return promiseMethod( () => {
			uri = this.getRequestURI( uri );

			const queryContext:QueryContextBuilder.Class = new QueryContextBuilder.Class( this.context );
			const memberVar:VariableToken = queryContext.getVariable( "member" );

			const membershipResource:VariableToken = queryContext.getVariable( "membershipResource" );
			const hasMemberRelation:VariableToken = queryContext.getVariable( "hasMemberRelation" );
			const pattens:PatternToken[] = [
				new SubjectToken( queryContext.compactIRI( uri ) )
					.addPredicate( new PredicateToken( queryContext.compactIRI( LDP.membershipResource ) )
						.addObject( membershipResource )
					)
					.addPredicate( new PredicateToken( queryContext.compactIRI( LDP.hasMemberRelation ) )
						.addObject( hasMemberRelation )
					)
				,
				new SubjectToken( membershipResource )
					.addPredicate( new PredicateToken( hasMemberRelation )
						.addObject( memberVar )
					)
				,
			];

			return this.executeSelectPatterns( uri, requestOptions, queryContext, "member", pattens );
		} );
	}

	getMembers<T extends object>( uri:string, requestOptions:RequestOptions, queryBuilderFn?:( queryBuilder:QueryDocumentsBuilder.Class ) => QueryDocumentsBuilder.Class ):Promise<[ (T & PersistedDocument.Class)[], Response ]>;
	getMembers<T extends object>( uri:string, queryBuilderFn?:( queryBuilder:QueryDocumentsBuilder.Class ) => QueryDocumentsBuilder.Class ):Promise<[ (T & PersistedDocument.Class)[], Response ]>;
	getMembers<T extends object>( uri:string, requestOptionsOrQueryBuilderFn?:any, queryBuilderFn?:( queryBuilder:QueryDocumentsBuilder.Class ) => QueryDocumentsBuilder.Class ):Promise<[ (T & PersistedDocument.Class)[], Response ]> {
		const requestOptions:RequestOptions = RequestUtils.isOptions( requestOptionsOrQueryBuilderFn ) ? requestOptionsOrQueryBuilderFn : {};
		queryBuilderFn = Utils.isFunction( requestOptionsOrQueryBuilderFn ) ? requestOptionsOrQueryBuilderFn : queryBuilderFn;

		return promiseMethod( () => {
			uri = this.getRequestURI( uri );

			const queryContext:QueryContextBuilder.Class = new QueryContextBuilder.Class( this.context );
			const membersProperty:QueryProperty.Class = queryContext
				.addProperty( "member" )
				.setOptional( false );

			const membershipResource:VariableToken = queryContext.getVariable( "membershipResource" );
			const hasMemberRelation:VariableToken = queryContext.getVariable( "hasMemberRelation" );
			const selectMembers:SelectToken = new SelectToken()
				.addVariable( membersProperty.variable )
				.addPattern( new SubjectToken( queryContext.compactIRI( uri ) )
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

			return this.executeQueryBuilder<T>( uri, requestOptions, queryContext, membersProperty, queryBuilderFn );
		} );
	}

	addMember( documentURI:string, member:Pointer, requestOptions?:RequestOptions ):Promise<Response>;
	addMember( documentURI:string, memberURI:string, requestOptions?:RequestOptions ):Promise<Response>;
	addMember( documentURI:string, memberORUri:Pointer | string, requestOptions:RequestOptions = {} ):Promise<Response> {
		return this.addMembers( documentURI, [ memberORUri ], requestOptions );
	}

	addMembers( documentURI:string, members:(Pointer | string)[], requestOptions?:RequestOptions ):Promise<Response>;
	addMembers( documentURI:string, members:(Pointer | string)[], requestOptions:RequestOptions = {} ):Promise<Response> {
		return promiseMethod( () => {
			const pointers:Pointer[] = this._parseMembers( members );

			documentURI = this.getRequestURI( documentURI );
			this.setDefaultRequestOptions( requestOptions, LDP.Container );
			RequestUtils.setContentTypeHeader( "application/ld+json", requestOptions );

			const freeResources:FreeResources = FreeResources.create( this );
			freeResources.createResourceFrom( AddMemberAction.Factory.create( pointers ) );

			const body:string = JSON.stringify( freeResources );

			return this.sendRequest( HTTPMethod.PUT, documentURI, requestOptions, body );
		} );
	}

	removeMember( documentURI:string, member:Pointer, requestOptions?:RequestOptions ):Promise<Response>;
	removeMember( documentURI:string, memberURI:string, requestOptions?:RequestOptions ):Promise<Response>;
	removeMember( documentURI:string, memberORUri:Pointer | string, requestOptions:RequestOptions = {} ):Promise<Response> {
		return this.removeMembers( documentURI, [ memberORUri ], requestOptions );
	}

	removeMembers( documentURI:string, members:(Pointer | string)[], requestOptions:RequestOptions = {} ):Promise<Response> {
		return promiseMethod( () => {
			const pointers:Pointer[] = this._parseMembers( members );

			documentURI = this.getRequestURI( documentURI );
			this.setDefaultRequestOptions( requestOptions, LDP.Container );
			RequestUtils.setContentTypeHeader( "application/ld+json", requestOptions );

			let containerRetrievalPreferences:RetrievalPreferences = {
				include: [ C.PreferSelectedMembershipTriples ],
				omit: [ C.PreferMembershipTriples ],
			};
			RequestUtils.setRetrievalPreferences( containerRetrievalPreferences, requestOptions, false );

			const freeResources:FreeResources = FreeResources.create( this );
			freeResources.createResourceFrom( RemoveMemberAction.Factory.create( pointers ) );

			const body:string = JSON.stringify( freeResources );

			return this.sendRequest( HTTPMethod.DELETE, documentURI, requestOptions, body );
		} );
	}

	removeAllMembers( documentURI:string, requestOptions:RequestOptions = {} ):Promise<Response> {
		return promiseMethod( () => {
			documentURI = this.getRequestURI( documentURI );
			this.setDefaultRequestOptions( requestOptions, LDP.Container );

			let containerRetrievalPreferences:RetrievalPreferences = {
				include: [
					C.PreferMembershipTriples,
				],
				omit: [
					C.PreferMembershipResources,
					C.PreferContainmentTriples,
					C.PreferContainmentResources,
					C.PreferContainer,
				],
			};
			RequestUtils.setRetrievalPreferences( containerRetrievalPreferences, requestOptions, false );

			return this.sendRequest( HTTPMethod.DELETE, documentURI, requestOptions );
		} );
	}


	save<T extends object>( persistedDocument:T & PersistedDocument.Class, requestOptions:RequestOptions = {} ):Promise<[ T & PersistedDocument.Class, Response ]> {
		return promiseMethod( () => {
			if( ! PersistedDocument.Factory.is( persistedDocument ) ) throw new Errors.IllegalArgumentError( "Provided element is not a valid persisted document." );

			RequestUtils.setPreferredRetrieval( "minimal", requestOptions );
			return this.patchDocument<T>( persistedDocument, requestOptions );
		} );
	}

	refresh<T extends object>( persistedDocument:T & PersistedDocument.Class, requestOptions:RequestOptions = {} ):Promise<[ T & PersistedDocument.Class, Response ]> {
		return Utils.promiseMethod( () => {
			if( ! PersistedDocument.Factory.is( persistedDocument ) ) throw new Errors.IllegalArgumentError( "Provided element is not a valid persisted document." );

			return persistedDocument.isPartial() ?
				this.refreshPartialDocument<T>( persistedDocument, requestOptions ) :
				this.refreshFullDocument<T>( persistedDocument, requestOptions );
		} );
	}

	saveAndRefresh<T extends object>( persistedDocument:T & PersistedDocument.Class, requestOptions:RequestOptions = {} ):Promise<[ T & PersistedDocument.Class, Response[] ]> {
		const responses:Response[] = [];
		return promiseMethod( () => {
			if( ! PersistedDocument.Factory.is( persistedDocument ) ) throw new Errors.IllegalArgumentError( "Provided element is not a valid persisted document." );

			const cloneOptions:RequestOptions = RequestUtils.cloneOptions( requestOptions );
			RequestUtils.setPreferredRetrieval( persistedDocument.isPartial() ? "minimal" : "representation", cloneOptions );

			return this.patchDocument<T>( persistedDocument, cloneOptions );
		} ).then<[ T & PersistedDocument.Class, Response ]>( ( [ , response ] ) => {
			if( ! persistedDocument.isPartial() ) return [ persistedDocument, response ];

			responses.push( response );
			return this.refreshPartialDocument<T>( persistedDocument, requestOptions );
		} ).then<[ T & PersistedDocument.Class, Response[] ]>( ( [ , response ] ) => {
			responses.push( response );
			return [ persistedDocument, responses ];
		} );
	}


	delete( documentURI:string, requestOptions:RequestOptions = {} ):Promise<Response> {
		return promiseMethod( () => {
			documentURI = this.getRequestURI( documentURI );
			this.setDefaultRequestOptions( requestOptions, LDP.RDFSource );

			return this.sendRequest( HTTPMethod.DELETE, documentURI, requestOptions );
		} ).then( ( response:Response ) => {
			let pointerID:string = this.getPointerID( documentURI );
			this.pointers.delete( pointerID );

			return response;
		} );
	}

	getDownloadURL( documentURI:string, requestOptions?:RequestOptions ):Promise<string> {
		if( ! this.context ) return Promise.reject( new Errors.IllegalStateError( "This instance doesn't support Authenticated request." ) );
		return promiseMethod( () => {
			documentURI = this.getRequestURI( documentURI );
			return this.context.auth.getAuthenticatedURL( documentURI, requestOptions );
		} );
	}


	getGeneralSchema():DigestedObjectSchema {
		if( ! this.context ) return new DigestedObjectSchema();
		return this.context.getObjectSchema();
	}

	hasSchemaFor( object:object, path?:string ):boolean {
		if( path !== void 0 ) return false;
		return "@id" in object || "id" in object;
	}

	getSchemaFor( object:object ):DigestedObjectSchema {
		return ("@id" in object) ?
			this.getDigestedObjectSchemaForExpandedObject( object ) :
			this.getDigestedObjectSchemaForDocument( <any> object );
	}


	executeRawASKQuery( documentURI:string, askQuery:string, requestOptions:RequestOptions = {} ):Promise<[ SPARQLRawResults, Response ]> {
		return promiseMethod( () => {
			documentURI = this.getRequestURI( documentURI );

			if( this.context && this.context.auth.isAuthenticated() ) this.context.auth.addAuthentication( requestOptions );

			return SPARQLService.executeRawASKQuery( documentURI, askQuery, requestOptions )
				.catch( this._parseErrorResponse.bind( this ) );
		} );
	}

	executeASKQuery( documentURI:string, askQuery:string, requestOptions:RequestOptions = {} ):Promise<[ boolean, Response ]> {
		return promiseMethod( () => {
			documentURI = this.getRequestURI( documentURI );

			if( this.context && this.context.auth.isAuthenticated() ) this.context.auth.addAuthentication( requestOptions );

			return SPARQLService.executeASKQuery( documentURI, askQuery, requestOptions )
				.catch( this._parseErrorResponse.bind( this ) );
		} );
	}

	executeRawSELECTQuery( documentURI:string, selectQuery:string, requestOptions:RequestOptions = {} ):Promise<[ SPARQLRawResults, Response ]> {
		return promiseMethod( () => {
			documentURI = this.getRequestURI( documentURI );

			if( this.context && this.context.auth.isAuthenticated() ) this.context.auth.addAuthentication( requestOptions );

			return SPARQLService.executeRawSELECTQuery( documentURI, selectQuery, requestOptions )
				.catch( this._parseErrorResponse.bind( this ) );
		} );
	}

	executeSELECTQuery<T extends object>( documentURI:string, selectQuery:string, requestOptions:RequestOptions = {} ):Promise<[ SPARQLSelectResults<T>, Response ]> {
		return promiseMethod( () => {
			documentURI = this.getRequestURI( documentURI );

			if( this.context && this.context.auth.isAuthenticated() ) this.context.auth.addAuthentication( requestOptions );

			return SPARQLService.executeSELECTQuery<T>( documentURI, selectQuery, this, requestOptions )
				.catch( this._parseErrorResponse.bind( this ) );
		} );
	}

	executeRawCONSTRUCTQuery( documentURI:string, constructQuery:string, requestOptions:RequestOptions = {} ):Promise<[ string, Response ]> {
		return promiseMethod( () => {
			documentURI = this.getRequestURI( documentURI );

			if( this.context && this.context.auth.isAuthenticated() ) this.context.auth.addAuthentication( requestOptions );

			return SPARQLService.executeRawCONSTRUCTQuery( documentURI, constructQuery, requestOptions )
				.catch( this._parseErrorResponse.bind( this ) );
		} );
	}

	executeRawDESCRIBEQuery( documentURI:string, describeQuery:string, requestOptions:RequestOptions = {} ):Promise<[ string, Response ]> {
		return promiseMethod( () => {
			documentURI = this.getRequestURI( documentURI );

			if( this.context && this.context.auth.isAuthenticated() ) this.context.auth.addAuthentication( requestOptions );

			return SPARQLService.executeRawDESCRIBEQuery( documentURI, describeQuery, requestOptions )
				.catch( this._parseErrorResponse.bind( this ) );
		} );
	}

	executeUPDATE( documentURI:string, update:string, requestOptions:RequestOptions = {} ):Promise<Response> {
		return promiseMethod( () => {
			documentURI = this.getRequestURI( documentURI );

			if( this.context && this.context.auth.isAuthenticated() ) this.context.auth.addAuthentication( requestOptions );

			return SPARQLService.executeUPDATE( documentURI, update, requestOptions )
				.catch( this._parseErrorResponse.bind( this ) );
		} );
	}


	sparql( documentURI:string ):QueryClause<FinishSPARQLSelect> {
		let builder:QueryClause<FinishSPARQLSelect> = new SPARQLBuilder( this, this.getRequestURI( documentURI ) );

		if( this.context ) {
			const schema:DigestedObjectSchema = this.getProcessedSchema();

			builder = builder
				.base( schema.base )
				.vocab( schema.vocab );

			schema.prefixes.forEach( ( uri:string, prefix:string ) => {
				builder = builder.prefix( prefix, uri );
			} );
		}

		return builder;
	}

	on( event:Messaging.Event.CHILD_CREATED, uriPattern:string, onEvent:( message:Messaging.ChildCreated.Class ) => void, onError:( error:Error ) => void ):void;
	on( event:Messaging.Event.ACCESS_POINT_CREATED, uriPattern:string, onEvent:( message:Messaging.AccessPointCreated.Class ) => void, onError:( error:Error ) => void ):void;
	on( event:Messaging.Event.DOCUMENT_CREATED, uriPattern:string, onEvent:( message:Messaging.DocumentCreated.Class ) => void, onError:( error:Error ) => void ):void;
	on( event:Messaging.Event.DOCUMENT_MODIFIED, uriPattern:string, onEvent:( message:Messaging.DocumentModified.Class ) => void, onError:( error:Error ) => void ):void;
	on( event:Messaging.Event.DOCUMENT_DELETED, uriPattern:string, onEvent:( message:Messaging.DocumentDeleted.Class ) => void, onError:( error:Error ) => void ):void;
	on( event:Messaging.Event.MEMBER_ADDED, uriPattern:string, onEvent:( message:Messaging.MemberAdded.Class ) => void, onError:( error:Error ) => void ):void;
	on( event:Messaging.Event.MEMBER_REMOVED, uriPattern:string, onEvent:( message:Messaging.MemberRemoved.Class ) => void, onError:( error:Error ) => void ):void;
	on( event:Messaging.Event | string, uriPattern:string, onEvent:( message:Messaging.Message.Class ) => void, onError:( error:Error ) => void ):void;
	on<T extends Messaging.Message.Class>( event:Messaging.Event | string, uriPattern:string, onEvent:( message:T ) => void, onError:( error:Error ) => void ):void {
		try {
			validateEventContext( this.context );
			const destination:string = createDestination( event, uriPattern, this.context.baseURI );
			(this.context as Carbon).messaging.subscribe( destination, onEvent, onError );
		} catch( error ) {
			if( ! onError ) throw error;
			onError( error );
		}
	}

	off( event:Messaging.Event.CHILD_CREATED, uriPattern:string, onEvent:( message:Messaging.ChildCreated.Class ) => void, onError:( error:Error ) => void ):void;
	off( event:Messaging.Event.ACCESS_POINT_CREATED, uriPattern:string, onEvent:( message:Messaging.AccessPointCreated.Class ) => void, onError:( error:Error ) => void ):void;
	off( event:Messaging.Event.DOCUMENT_CREATED, uriPattern:string, onEvent:( message:Messaging.DocumentCreated.Class ) => void, onError:( error:Error ) => void ):void;
	off( event:Messaging.Event.DOCUMENT_MODIFIED, uriPattern:string, onEvent:( message:Messaging.DocumentModified.Class ) => void, onError:( error:Error ) => void ):void;
	off( event:Messaging.Event.DOCUMENT_DELETED, uriPattern:string, onEvent:( message:Messaging.DocumentDeleted.Class ) => void, onError:( error:Error ) => void ):void;
	off( event:Messaging.Event.MEMBER_ADDED, uriPattern:string, onEvent:( message:Messaging.MemberAdded.Class ) => void, onError:( error:Error ) => void ):void;
	off( event:Messaging.Event.MEMBER_REMOVED, uriPattern:string, onEvent:( message:Messaging.MemberRemoved.Class ) => void, onError:( error:Error ) => void ):void;
	off( event:Messaging.Event | string, uriPattern:string, onEvent:( message:Messaging.Message.Class ) => void, onError:( error:Error ) => void ):void;
	off<T extends Messaging.Message.Class>( event:Messaging.Event | string, uriPattern:string, onEvent:( message:T ) => void, onError:( error:Error ) => void ):void {
		try {
			validateEventContext( this.context );
			const destination:string = createDestination( event, uriPattern, this.context.baseURI );
			(this.context as Carbon).messaging.unsubscribe( destination, onEvent );
		} catch( error ) {
			if( ! onError ) throw error;
			onError( error );
		}
	}

	one( event:Messaging.Event.CHILD_CREATED, uriPattern:string, onEvent:( message:Messaging.ChildCreated.Class ) => void, onError:( error:Error ) => void ):void;
	one( event:Messaging.Event.ACCESS_POINT_CREATED, uriPattern:string, onEvent:( message:Messaging.AccessPointCreated.Class ) => void, onError:( error:Error ) => void ):void;
	one( event:Messaging.Event.DOCUMENT_CREATED, uriPattern:string, onEvent:( message:Messaging.DocumentCreated.Class ) => void, onError:( error:Error ) => void ):void;
	one( event:Messaging.Event.DOCUMENT_MODIFIED, uriPattern:string, onEvent:( message:Messaging.DocumentModified.Class ) => void, onError:( error:Error ) => void ):void;
	one( event:Messaging.Event.DOCUMENT_DELETED, uriPattern:string, onEvent:( message:Messaging.DocumentDeleted.Class ) => void, onError:( error:Error ) => void ):void;
	one( event:Messaging.Event.MEMBER_ADDED, uriPattern:string, onEvent:( message:Messaging.MemberAdded.Class ) => void, onError:( error:Error ) => void ):void;
	one( event:Messaging.Event.MEMBER_REMOVED, uriPattern:string, onEvent:( message:Messaging.MemberRemoved.Class ) => void, onError:( error:Error ) => void ):void;
	one( event:Messaging.Event | string, uriPattern:string, onEvent:( message:Messaging.Message.Class ) => void, onError:( error:Error ) => void ):void;
	one<T extends Messaging.Message.Class>( event:Messaging.Event | string, uriPattern:string, onEvent:( message:T ) => void, onError:( error:Error ) => void ):void {
		const self:Documents = this;
		this.on( event, uriPattern, function onEventWrapper( message:T ):void {
			onEvent( message );
			self.off( event, uriPattern, onEventWrapper, onError );
		}, onError );
	}

	onDocumentCreated( uriPattern:string, onEvent:( message:Messaging.DocumentCreated.Class ) => void, onError:( error:Error ) => void ):void {
		return this.on( Messaging.Event.DOCUMENT_CREATED, uriPattern, onEvent, onError );
	}

	onChildCreated( uriPattern:string, onEvent:( message:Messaging.ChildCreated.Class ) => void, onError:( error:Error ) => void ):void {
		return this.on( Messaging.Event.CHILD_CREATED, uriPattern, onEvent, onError );
	}

	onAccessPointCreated( uriPattern:string, onEvent:( message:Messaging.AccessPointCreated.Class ) => void, onError:( error:Error ) => void ):void {
		return this.on( Messaging.Event.ACCESS_POINT_CREATED, uriPattern, onEvent, onError );
	}

	onDocumentModified( uriPattern:string, onEvent:( message:Messaging.DocumentModified.Class ) => void, onError:( error:Error ) => void ):void {
		return this.on( Messaging.Event.DOCUMENT_MODIFIED, uriPattern, onEvent, onError );
	}

	onDocumentDeleted( uriPattern:string, onEvent:( message:Messaging.DocumentDeleted.Class ) => void, onError:( error:Error ) => void ):void {
		return this.on( Messaging.Event.DOCUMENT_DELETED, uriPattern, onEvent, onError );
	}

	onMemberAdded( uriPattern:string, onEvent:( message:Messaging.MemberAdded.Class ) => void, onError:( error:Error ) => void ):void {
		return this.on( Messaging.Event.MEMBER_ADDED, uriPattern, onEvent, onError );
	}

	onMemberRemoved( uriPattern:string, onEvent:( message:Messaging.MemberRemoved.Class ) => void, onError:( error:Error ) => void ):void {
		return this.on( Messaging.Event.MEMBER_REMOVED, uriPattern, onEvent, onError );
	}


	_getPersistedDocument<T extends object>( rdfDocument:RDF.Document.Class, response:Response ):T & PersistedDocument.Class {
		const [ documentResources ] = RDF.Document.Util.getNodes( rdfDocument );
		if( documentResources.length === 0 ) throw new BadResponseError( `The RDFDocument: ${ rdfDocument[ "@id" ] }, doesn't contain a document resource.`, response );
		if( documentResources.length > 1 ) throw new BadResponseError( `The RDFDocument: ${ rdfDocument[ "@id" ] }, contains more than one document resource.`, response );

		return new JSONLDCompacter( this ).compactDocument( rdfDocument );
	}

	_getFreeResources( nodes:RDF.Node.Class[] ):FreeResources {
		let freeResourcesDocument:FreeResources = FreeResources.create( this );

		let resources:Resource[] = nodes.map( node => freeResourcesDocument.createResource( node[ "@id" ] ) );
		this.compact( nodes, resources, freeResourcesDocument );

		return freeResourcesDocument;
	}

	_parseErrorResponse<T extends object>( response:Response | Error ):any {
		if( response instanceof Error ) return Promise.reject( response );

		if( ! (response.status >= 400 && response.status < 600 && statusCodeMap.has( response.status )) )
			return Promise.reject( new UnknownError( response.data, response ) );

		const error:HTTPError = new (statusCodeMap.get( response.status ))( response.data, response );
		if( ! response.data || ! this.context ) return Promise.reject( error );

		return new JSONLDParser().parse( response.data ).then( ( freeNodes:RDF.Node.Class[] ) => {
			const freeResources:FreeResources = this._getFreeResources( freeNodes );
			const errorResponses:ErrorResponse.Class[] = freeResources
				.getResources()
				.filter( ( resource ):resource is ErrorResponse.Class => resource.hasType( ErrorResponse.RDF_CLASS ) );
			if( errorResponses.length === 0 ) return Promise.reject( new Errors.IllegalArgumentError( "The response string does not contains a c:ErrorResponse." ) );
			if( errorResponses.length > 1 ) return Promise.reject( new Errors.IllegalArgumentError( "The response string contains multiple c:ErrorResponse." ) );

			Object.assign( error, errorResponses[ 0 ] );
			error.message = ErrorResponse.Util.getMessage( error );
			return Promise.reject( error );
		}, () => {
			return Promise.reject( error );
		} );
	}


	private getFullDocument<T extends object>( uri:string, requestOptions:GETOptions ):Promise<[ T & PersistedDocument.Class, Response ]> {
		if( this.hasPointer( uri ) ) {
			const pointer:Pointer = this.getPointer( uri );
			if( pointer.isResolved() ) {
				const persistedDocument:T & PersistedDocument.Class = pointer as any;
				if( ! persistedDocument.isPartial() || ! requestOptions.ensureLatest )
					return Promise.resolve<[ T & PersistedDocument.Class, Response ]>( [ persistedDocument, null ] );
			}
		}

		this.setDefaultRequestOptions( requestOptions, LDP.RDFSource );

		if( this.documentsBeingResolved.has( uri ) )
			return this.documentsBeingResolved.get( uri ) as Promise<[ T & PersistedDocument.Class, Response ]>;

		const promise:Promise<[ T & PersistedDocument.Class, Response ]> = this.sendRequest( HTTPMethod.GET, uri, requestOptions, null, new RDFDocumentParser() )
			.then<[ T & PersistedDocument.Class, Response ]>( ( [ rdfDocuments, response ]:[ RDF.Document.Class[], Response ] ) => {
				const eTag:string = response.getETag();
				if( eTag === null ) throw new BadResponseError( "The response doesn't contain an ETag", response );

				let targetURI:string = uri;
				const locationHeader:Header = response.getHeader( "Content-Location" );
				if( locationHeader ) {
					if( locationHeader.values.length !== 1 ) throw new BadResponseError( "The response must contain one Content-Location header.", response );

					const locationString:string = "" + locationHeader;
					if( ! locationString ) throw new BadResponseError( `The response doesn't contain a valid 'Content-Location' header.`, response );
					targetURI = locationString;
				}

				const rdfDocument:RDF.Document.Class = this.getRDFDocument( targetURI, rdfDocuments, response );
				if( rdfDocument === null ) throw new BadResponseError( "No document was returned.", response );

				let document:T & PersistedDocument.Class = this._getPersistedDocument<T>( rdfDocument, response );
				document._etag = eTag;

				this.documentsBeingResolved.delete( uri );
				return [ document, response ];
			} ).catch( error => {
				this.documentsBeingResolved.delete( uri );
				return Promise.reject( error );
			} );

		this.documentsBeingResolved.set( uri, promise );
		return promise;
	}

	private getPartialDocument<T extends object>( uri:string, requestOptions:RequestOptions, queryBuilderFn?:( queryBuilder:QueryDocumentBuilder.Class ) => QueryDocumentBuilder.Class ):Promise<[ T & PersistedDocument.Class, Response ]> {
		const queryContext:QueryContextBuilder.Class = new QueryContextBuilder.Class( this.context );

		const documentProperty:QueryProperty.Class = queryContext
			.addProperty( "document" )
			.setOptional( false );

		const propertyValue:ValuesToken = new ValuesToken().addValues( documentProperty.variable, queryContext.compactIRI( uri ) );
		documentProperty.addPattern( propertyValue );

		return this.executeQueryBuilder<T>( uri, requestOptions, queryContext, documentProperty, queryBuilderFn )
			.then<[ T & PersistedDocument.Class, Response ]>( ( [ documents, response ] ) => [ documents[ 0 ], response ] );
	}


	private patchDocument<T extends object>( persistedDocument:T & PersistedDocument.Class, requestOptions:RequestOptions ):Promise<[ T & PersistedDocument.Class, Response ]> {
		const uri:string = this.getRequestURI( persistedDocument.id );

		if( ! persistedDocument.isDirty() ) return Promise.resolve<[ T & PersistedDocument.Class, Response ]>( [ persistedDocument, null ] );
		if( persistedDocument.isLocallyOutDated() ) throw new Errors.IllegalStateError( "Cannot save an outdated document." );

		this.setDefaultRequestOptions( requestOptions );
		RequestUtils.setContentTypeHeader( "text/ldpatch", requestOptions );
		RequestUtils.setIfMatchHeader( persistedDocument._etag, requestOptions );

		persistedDocument._normalize();
		const deltaCreator:LDPatch.DeltaCreator.DeltaCreator = new LDPatch.DeltaCreator.DeltaCreator( this.jsonldConverter );
		[ persistedDocument, ...persistedDocument.getFragments() ].forEach( ( resource:PersistedResource.Class ) => {
			const schema:DigestedObjectSchema = this.getSchemaFor( resource );
			deltaCreator.addResource( schema, resource._snapshot, resource );
		} );

		const body:string = deltaCreator.getPatch();

		return this.sendRequest( HTTPMethod.PATCH, uri, requestOptions, body )
			.then<[ T & PersistedDocument.Class, Response ]>( ( response:Response ) => {
				return this.applyResponseData( persistedDocument, response );
			} );
	}


	private refreshFullDocument<T extends object>( persistedDocument:T & PersistedDocument.Class, requestOptions:RequestOptions ):Promise<[ T & PersistedDocument.Class, Response ]> {
		const uri:string = this.getRequestURI( persistedDocument.id );

		this.setDefaultRequestOptions( requestOptions, LDP.RDFSource );
		RequestUtils.setIfNoneMatchHeader( persistedDocument._etag, requestOptions );

		return this.sendRequest( HTTPMethod.GET, uri, requestOptions, null, new RDFDocumentParser() ).then<[ T & PersistedDocument.Class, Response ]>( ( [ rdfDocuments, response ]:[ RDF.Document.Class[], Response ] ) => {
			if( response === null ) return <any> [ rdfDocuments, response ];

			let eTag:string = response.getETag();
			if( eTag === null ) throw new BadResponseError( "The response doesn't contain an ETag", response );

			let rdfDocument:RDF.Document.Class = this.getRDFDocument( uri, rdfDocuments, response );
			if( rdfDocument === null ) throw new BadResponseError( "No document was returned.", response );

			let updatedPersistedDocument:PersistedDocument.Class = this._getPersistedDocument( rdfDocument, response );
			updatedPersistedDocument._etag = eTag;

			return [ updatedPersistedDocument, response ];
		} ).catch<[ T & PersistedDocument.Class, Response ]>( ( error:HTTPError ) => {
			if( error.statusCode === 304 ) return [ persistedDocument, null ];
			return Promise.reject( error );
		} );
	}

	private refreshPartialDocument<T extends object>( persistedDocument:T & PersistedDocument.Class, requestOptions:RequestOptions ):Promise<[ T & PersistedDocument.Class, Response ]> {
		const uri:string = this.getRequestURI( persistedDocument.id );
		const queryContext:QueryContextPartial.Class = new QueryContextPartial.Class( persistedDocument, this.context );

		const targetName:string = "document";
		const constructPatterns:OptionalToken = new OptionalToken()
			.addPattern( new ValuesToken()
				.addValues( queryContext.getVariable( targetName ), new IRIToken( uri ) )
			)
		;

		(function createRefreshQuery( parentAdder:OptionalToken, resource:PersistedResource.Class, parentName:string ):void {
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
				const propertyFragment:PersistedFragment.Class = propertyValues
					.filter( PersistedFragment.Factory.is )
					.find( fragment => fragment.isPartial() );
				if( ! propertyFragment ) return;

				createRefreshQuery( propertyPattern, propertyFragment, path );
			} );
		})( constructPatterns, persistedDocument, targetName );

		return this.executeConstructPatterns<T>( uri, requestOptions, queryContext, targetName, constructPatterns.patterns, persistedDocument )
			.then<[ T & PersistedDocument.Class, Response ]>( ( [ documents, response ] ) => [ documents[ 0 ], response ] );
	}


	private executeQueryBuilder<T extends object>( uri:string, requestOptions:RequestOptions, queryContext:QueryContextBuilder.Class, targetProperty:QueryProperty.Class, queryBuilderFn?:( queryBuilder:QueryDocumentBuilder.Class ) => QueryDocumentBuilder.Class ):Promise<[ (T & PersistedDocument.Class)[], Response ]> {
		type Builder = QueryDocumentBuilder.Class | QueryDocumentBuilder.Class;
		// tslint:disable: variable-name
		const Builder:typeof QueryDocumentBuilder.Class = targetProperty.name === "document" ?
			QueryDocumentBuilder.Class : QueryDocumentsBuilder.Class;
		// tslint:enable: variable-name
		const queryBuilder:Builder = new Builder( queryContext, targetProperty );

		targetProperty.setType( queryBuilderFn ?
			QueryProperty.PropertyType.PARTIAL :
			QueryProperty.PropertyType.FULL
		);

		if( queryBuilderFn && queryBuilderFn.call( void 0, queryBuilder ) !== queryBuilder )
			throw new Errors.IllegalArgumentError( "The provided query builder was not returned" );

		const constructPatterns:PatternToken[] = targetProperty.getPatterns();
		return this
			.executeConstructPatterns<T>( uri, requestOptions, queryContext, targetProperty.name, constructPatterns )
			.then( ( returned ) => {
				if( queryBuilder instanceof QueryDocumentsBuilder.Class && queryBuilder._orderData ) {
					const { path, flow } = queryBuilder._orderData;
					const inverter:number = flow === "DESC" ? - 1 : 1;

					returned[ 0 ].sort( ( a:any, b:any ) => {
						a = getPathProperty( a, path );
						b = getPathProperty( b, path );

						const aValue:any = Pointer.is( a ) ? a.id : a;
						const bValue:any = Pointer.is( b ) ? b.id : b;

						if( aValue === bValue ) return 0;

						if( aValue === void 0 ) return - 1 * inverter;
						if( bValue === void 0 ) return inverter;

						if( ! areDifferentType( a, b ) ) {
							if( Pointer.is( a ) ) {
								const aIsBNode:boolean = RDF.URI.Util.isBNodeID( aValue );
								const bIsBNode:boolean = RDF.URI.Util.isBNodeID( bValue );

								if( aIsBNode && ! bIsBNode ) return - 1 * inverter;
								if( bIsBNode && ! aIsBNode ) return inverter;
							}
						} else {
							if( Pointer.is( a ) ) return - 1 * inverter;
							if( Pointer.is( b ) ) return inverter;

							if( Utils.isNumber( a ) ) return - 1 * inverter;
							if( Utils.isNumber( b ) ) return inverter;

							if( Utils.isDate( a ) ) return - 1 * inverter;
							if( Utils.isDate( b ) ) return inverter;

							if( Utils.isBoolean( a ) ) return - 1 * inverter;
							if( Utils.isBoolean( b ) ) return inverter;

							if( Utils.isString( a ) ) return - 1 * inverter;
							if( Utils.isString( b ) ) return inverter;
						}

						if( aValue < bValue ) return - 1 * inverter;
						if( aValue > bValue ) return inverter;
					} );
				}

				return returned;
			} )
			;
	}

	private executeConstructPatterns<T extends object>( uri:string, requestOptions:RequestOptions, queryContext:QueryContext, targetName:string, constructPatterns:PatternToken[], targetDocument?:T & PersistedDocument.Class ):Promise<[ (T & PersistedDocument.Class)[], Response ]> {
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

		RequestUtils.setRetrievalPreferences( { include: [ C.PreferResultsContext ] }, requestOptions, false );
		RequestUtils.setRetrievalPreferences( { include: [ C.PreferDocumentETags ] }, requestOptions, false );

		let response:Response;
		return this.executeRawCONSTRUCTQuery( uri, query.toString(), requestOptions ).then( ( [ jsonldString, _response ]:[ string, Response ] ) => {
			response = _response;
			return new JSONLDParser().parse( jsonldString );

		} ).then<[ (T & PersistedDocument.Class)[], Response ]>( ( rdfNodes:RDF.Node.Class[] ) => {
			const freeResources:FreeResources = this._getFreeResources( rdfNodes
				.filter( node => ! RDF.Document.Factory.is( node ) )
			);

			const targetSet:Set<string> = new Set( freeResources
				.getResources()
				.filter( QueryMetadata.Factory.is )
				.map( x => this.context ? x.target : x[ C.target ] )
				// Alternative to flatMap
				.reduce( ( targets, currentTargets ) => targets.concat( currentTargets ), [] )
				.map( x => x.id )
			);

			const targetETag:string = targetDocument && targetDocument._etag;
			if( targetDocument ) targetDocument._etag = void 0;

			freeResources
				.getResources()
				.filter( ResponseMetadata.Factory.is )
				.map<DocumentMetadata.Class[] | DocumentMetadata.Class>( responseMetadata => responseMetadata.documentsMetadata || responseMetadata[ C.documentMetadata ] )
				.map<DocumentMetadata.Class[]>( documentsMetadata => Array.isArray( documentsMetadata ) ? documentsMetadata : [ documentsMetadata ] )
				.forEach( documentsMetadata => documentsMetadata.forEach( documentMetadata => {
					if( ! documentMetadata ) return;

					const relatedDocument:PersistedDocument.Class = documentMetadata.relatedDocument || documentMetadata[ C.relatedDocument ];
					const eTag:string = documentMetadata.eTag || documentMetadata[ C.eTag ];

					if( relatedDocument._etag === void 0 ) relatedDocument._etag = eTag;
					if( relatedDocument._etag !== eTag ) relatedDocument._etag = null;
				} ) );

			if( targetDocument && targetETag === targetDocument._etag )
				return [ [ targetDocument ], null ];

			const rdfDocuments:RDF.Document.Class[] = rdfNodes
				.filter<any>( RDF.Document.Factory.is );

			const targetDocuments:RDF.Document.Class[] = rdfDocuments
				.filter( x => targetSet.has( x[ "@id" ] ) );

			const documents:(T & PersistedDocument.Class)[] = new JSONLDCompacter( this, targetName, queryContext )
				.compactDocuments( rdfDocuments, targetDocuments );

			return [ documents, response ];
		} );
	}

	private executeSelectPatterns( uri:string, requestOptions:RequestOptions, queryContext:QueryContext, targetName:string, selectPatterns:PatternToken[] ):Promise<[ PersistedDocument.Class[], Response ]> {
		const targetVar:VariableToken = queryContext.getVariable( targetName );
		const select:SelectToken = new SelectToken()
			.addVariable( targetVar )
			.addPattern( ...selectPatterns )
		;

		const query:QueryToken = new QueryToken( select as any )
			.addPrologues( ...queryContext.getPrologues() );

		return this
			.executeSELECTQuery( uri, query.toString(), requestOptions )
			.then<[ PersistedDocument.Class[], Response ]>( ( [ results, response ] ) => {
				const name:string = targetVar.toString().slice( 1 );
				const documents:PersistedDocument.Class[] = results
					.bindings
					.map( x => x[ name ] as Pointer )
					.map( x => PersistedDocument.Factory.decorate( x, this ) );

				return [ documents, response ];
			} );
	}


	private persistChildDocument<T extends object>( parentURI:string, childObject:T, slug:string, requestOptions:RequestOptions ):Promise<[ T & PersistedProtectedDocument.Class, Response ]> {
		if( PersistedDocument.Factory.is( childObject ) ) throw new Errors.IllegalArgumentError( "The child provided has been already persisted." );
		let childDocument:T & Document = Document.is( childObject ) ? <T & Document> childObject : Document.createFrom<T>( childObject );

		this.setDefaultRequestOptions( requestOptions, LDP.Container );
		return this.persistDocument<T & Document, PersistedProtectedDocument.Class>( parentURI, slug, childDocument, requestOptions );
	}

	private persistAccessPoint<T extends object>( documentURI:string, accessPoint:T & AccessPointBase, slug:string, requestOptions:RequestOptions ):Promise<[ T & PersistedAccessPoint.Class, Response ]> {
		if( PersistedDocument.Factory.is( accessPoint ) ) throw new Errors.IllegalArgumentError( "The access-point provided has been already persisted." );

		const accessPointDocument:T & AccessPoint = AccessPoint.is( accessPoint ) ?
			accessPoint : AccessPoint.createFrom<T>( accessPoint, this.getPointer( documentURI ), accessPoint.hasMemberRelation, accessPoint.isMemberOfRelation );

		if( accessPointDocument.membershipResource.id !== documentURI ) throw new Errors.IllegalArgumentError( "The documentURI must be the same as the accessPoint's membershipResource." );

		this.setDefaultRequestOptions( requestOptions, LDP.RDFSource );
		return this.persistDocument<T & AccessPoint, PersistedAccessPoint.Class>( documentURI, slug, accessPointDocument, requestOptions );
	}

	private persistDocument<T extends Document, W extends PersistedProtectedDocument.Class>( parentURI:string, slug:string, document:T, requestOptions:RequestOptions ):Promise<[ T & W, Response ]> {
		RequestUtils.setContentTypeHeader( "application/ld+json", requestOptions );

		if( document.id ) {
			let childURI:string = document.id;
			if( ! ! this.context ) childURI = this.context.resolve( childURI );
			if( ! RDF.URI.Util.isBaseOf( parentURI, childURI ) ) {
				return Promise.reject( new Errors.IllegalArgumentError( "The document's URI is not relative to the parentURI specified" ) );
			}
		}

		if( document[ "__CarbonSDK_InProgressOfPersisting" ] ) return Promise.reject( new Errors.IllegalArgumentError( "The document is already being persisted." ) );
		Object.defineProperty( document, "__CarbonSDK_InProgressOfPersisting", { configurable: true, enumerable: false, writable: false, value: true } );

		let body:string = JSON.stringify( document.toJSON( this, this.jsonldConverter ) );

		if( ! ! slug ) RequestUtils.setSlug( slug, requestOptions );

		return this.sendRequest( HTTPMethod.POST, parentURI, requestOptions, body ).then<[ T & W, Response ]>( ( response:Response ) => {
			delete document[ "__CarbonSDK_InProgressOfPersisting" ];

			let locationHeader:Header = response.getHeader( "Location" );
			if( locationHeader === null || locationHeader.values.length < 1 ) throw new BadResponseError( "The response is missing a Location header.", response );
			if( locationHeader.values.length !== 1 ) throw new BadResponseError( "The response contains more than one Location header.", response );

			const localID:string = this.getPointerID( locationHeader.values[ 0 ].toString() );
			this.pointers.set( localID, this.createPointerFrom( document, localID ) );

			const persistedDocument:T & W = <T & W> PersistedProtectedDocument.Factory.decorate<T>( document, this );
			persistedDocument.getFragments().forEach( PersistedFragment.Factory.decorate );

			return this.applyResponseData( persistedDocument, response );
		}, this._parseErrorResponse.bind( this ) ).catch( ( error ) => {
			delete document[ "__CarbonSDK_InProgressOfPersisting" ];
			return Promise.reject( error );
		} );
	}


	private getRDFDocument( requestURL:string, rdfDocuments:RDF.Document.Class[], response:Response ):RDF.Document.Class {
		rdfDocuments = rdfDocuments.filter( ( rdfDocument:RDF.Document.Class ) => rdfDocument[ "@id" ] === requestURL );

		if( rdfDocuments.length > 1 ) throw new BadResponseError( "Several documents share the same id.", response );

		return rdfDocuments.length > 0 ? rdfDocuments[ 0 ] : null;
	}


	private getPointerID( uri:string ):string {
		if( RDF.URI.Util.isBNodeID( uri ) ) throw new Errors.IllegalArgumentError( "BNodes cannot be fetched directly." );
		// TODO: Make named fragments independently resolvable
		/*
			if( RDF.URI.Util.hasFragment( uri ) ) throw new Errors.IllegalArgumentError( "Fragment URI's cannot be fetched directly." );
		*/

		if( ! ! this.context ) {
			uri = ObjectSchemaUtils.resolveURI( uri, this.getGeneralSchema() );

			if( ! RDF.URI.Util.isRelative( uri ) ) {
				const baseURI:string = this.context.baseURI;
				if( ! RDF.URI.Util.isBaseOf( baseURI, uri ) ) return null;

				return uri.substring( baseURI.length );
			} else {
				return uri[ 0 ] === "/" ? uri.substr( 1 ) : uri;
			}
		} else {
			if( RDF.URI.Util.isPrefixed( uri ) ) throw new Errors.IllegalArgumentError( "This Documents instance doesn't support prefixed URIs." );
			if( RDF.URI.Util.isRelative( uri ) ) throw new Errors.IllegalArgumentError( "This Documents instance doesn't support relative URIs." );
			return uri;
		}
	}

	private createPointer( localID:string ):Pointer {
		return this.createPointerFrom( {}, localID );
	}

	private createPointerFrom<T extends Object>( object:T, localID:string ):T & Pointer {
		let id:string = ! ! this.context ? this.context.resolve( localID ) : localID;
		let pointer:T & Pointer = Pointer.createFrom<T>( object, id );
		Object.defineProperty( pointer, "resolve", {
			writable: false,
			enumerable: false,
			configurable: true,
			value: ():Promise<[ PersistedDocument.Class, Response ]> => {
				return this.get( id );
			},
		} );

		return pointer;
	}


	private compact( expandedObjects:Object[], targetObjects:Object[], pointerLibrary:PointerLibrary ):Object[];
	private compact( expandedObject:Object, targetObject:Object, pointerLibrary:PointerLibrary ):Object;
	private compact( expandedObjectOrObjects:any, targetObjectOrObjects:any, pointerLibrary:PointerLibrary ):any {
		if( ! Utils.isArray( expandedObjectOrObjects ) ) return this.compactSingle( expandedObjectOrObjects, targetObjectOrObjects, pointerLibrary );

		let expandedObjects:Object[] = expandedObjectOrObjects;
		let targetObjects:Object[] = ! ! targetObjectOrObjects ? targetObjectOrObjects : [];
		for( let i:number = 0, length:number = expandedObjects.length; i < length; i ++ ) {
			let expandedObject:Object = expandedObjects[ i ];
			let targetObject:Object = targetObjects[ i ] = ! ! targetObjects[ i ] ? targetObjects[ i ] : {};

			this.compactSingle( expandedObject, targetObject, pointerLibrary );
		}

		return targetObjects;
	}

	private compactSingle( expandedObject:Object, targetObject:Object, pointerLibrary:PointerLibrary ):Object {
		let digestedSchema:DigestedObjectSchema = this.getDigestedObjectSchemaForExpandedObject( expandedObject );

		return this.jsonldConverter.compact( expandedObject, targetObject, digestedSchema, pointerLibrary );
	}


	private getDigestedObjectSchemaForExpandedObject( expandedObject:Object ):DigestedObjectSchema {
		let types:string[] = RDF.Node.Util.getTypes( <any> expandedObject );

		return this.getDigestedObjectSchema( types, expandedObject[ "@id" ] );
	}

	private getDigestedObjectSchemaForDocument( document:Document ):DigestedObjectSchema {
		if( PersistedResource.Factory.hasClassProperties( document ) && document.isPartial() ) {
			const schemas:DigestedObjectSchema[] = [ document._partialMetadata.schema ];
			return this.getProcessedSchema( schemas );
		} else {
			const types:string[] = document.types || [];
			return this.getDigestedObjectSchema( types, document.id );
		}
	}

	private getDigestedObjectSchema( objectTypes:string[], objectID:string ):DigestedObjectSchema {
		if( ! this.context ) return new DigestedObjectSchema();

		if(
			Utils.isDefined( objectID ) &&
			! RDF.URI.Util.hasFragment( objectID ) &&
			! RDF.URI.Util.isBNodeID( objectID ) &&
			objectTypes.indexOf( Document.TYPE ) === - 1
		)
			objectTypes = objectTypes.concat( Document.TYPE );

		const schemas:DigestedObjectSchema[] = objectTypes
			.filter( type => this.context.hasObjectSchema( type ) )
			.map( type => this.context.getObjectSchema( type ) )
		;

		return this.getProcessedSchema( schemas );
	}

	private getProcessedSchema( objectSchemas:DigestedObjectSchema[] = [] ):DigestedObjectSchema {
		objectSchemas.unshift( this.context.getObjectSchema() );
		return ObjectSchemaDigester
			.combineDigestedObjectSchemas( objectSchemas );
	}


	private getRequestURI( uri:string ):string {
		if( RDF.URI.Util.isBNodeID( uri ) ) {
			throw new Errors.IllegalArgumentError( "BNodes cannot be fetched directly." );
		} else if( RDF.URI.Util.isPrefixed( uri ) ) {
			if( ! this.context ) throw new Errors.IllegalArgumentError( "This Documents instance doesn't support prefixed URIs." );
			uri = ObjectSchemaUtils.resolveURI( uri, this.context.getObjectSchema() );
			if( RDF.URI.Util.isPrefixed( uri ) ) throw new Errors.IllegalArgumentError( `The prefixed URI "${ uri }" could not be resolved.` );
		} else if( RDF.URI.Util.isRelative( uri ) ) {
			if( ! this.context ) throw new Errors.IllegalArgumentError( "This Documents instance doesn't support relative URIs." );
			uri = this.context.resolve( uri );
		} else if( this.context && ! RDF.URI.Util.isBaseOf( this.context.baseURI, uri ) ) {
			throw new Errors.IllegalArgumentError( `"${ uri }" isn't a valid URI for this Carbon instance.` );
		}
		return uri;
	}

	private setDefaultRequestOptions( requestOptions:RequestOptions, interactionModel?:string ):RequestOptions {
		if( this.context && this.context.auth.isAuthenticated() ) this.context.auth.addAuthentication( requestOptions );
		if( interactionModel ) RequestUtils.setPreferredInteractionModel( interactionModel, requestOptions );

		RequestUtils.setAcceptHeader( "application/ld+json", requestOptions );

		return requestOptions;
	}

	private updateFromPreferenceApplied<T extends object>( persistedDocument:T & PersistedDocument.Class, rdfDocuments:RDF.Document.Class[], response:Response ):[ T, Response ] {
		let eTag:string = response.getETag();
		if( eTag === null ) throw new BadResponseError( "The response doesn't contain an ETag", response );

		let rdfDocument:RDF.Document.Class = this.getRDFDocument( persistedDocument.id, rdfDocuments, response );
		if( rdfDocument === null ) throw new BadResponseError( "No document was returned.", response );

		persistedDocument = this._getPersistedDocument<T>( rdfDocument, response );
		persistedDocument._etag = eTag;

		return [ persistedDocument, response ];
	}

	private _parseMembers( pointers:(string | Pointer)[] ):Pointer[] {
		return pointers.map( pointer => {
			if( Utils.isString( pointer ) ) return this.getPointer( pointer );
			if( Pointer.is( pointer ) ) return pointer;

			throw new Errors.IllegalArgumentError( "No Carbon.Pointer or URI provided." );
		} );
	}

	private applyResponseData<T extends PersistedDocument.Class>( persistedProtectedDocument:T, response:Response ):[ T, Response ] | Promise<[ T, Response ]> {
		if( response.status === 204 || ! response.data ) return [ persistedProtectedDocument, response ];

		return new JSONLDParser().parse( response.data ).then<[ T, Response ]>( ( expandedResult:object[] ) => {
			const freeNodes:RDF.Node.Class[] = RDF.Node.Util.getFreeNodes( expandedResult );
			this.applyNodeMap( freeNodes );

			let preferenceHeader:Header = response.getHeader( "Preference-Applied" );
			if( preferenceHeader === null || preferenceHeader.toString() !== "return=representation" ) return [ persistedProtectedDocument, response ];

			const rdfDocuments:RDF.Document.Class[] = RDF.Document.Util.getDocuments( expandedResult );
			return this.updateFromPreferenceApplied<T>( persistedProtectedDocument, rdfDocuments, response );
		} );
	}

	private applyNodeMap( freeNodes:RDF.Node.Class[] ):void {
		if( ! freeNodes.length ) return;
		const freeResources:FreeResources = this._getFreeResources( freeNodes );
		const responseMetadata:ResponseMetadata.Class = <ResponseMetadata.Class> freeResources.getResources().find( ResponseMetadata.Factory.is );

		for( const documentMetadata of responseMetadata.documentsMetadata ) {
			const document:PersistedDocument.Class = documentMetadata.relatedDocument as PersistedDocument.Class;
			for( const { entryKey, entryValue } of documentMetadata.bNodesMap.entries ) {
				const originalBNode:PersistedBlankNode.Class = document.getFragment( entryKey.id );
				originalBNode.id = entryValue.id;

				document._fragmentsIndex.delete( entryKey.id );
				document._fragmentsIndex.set( entryValue.id, originalBNode );
			}
			document._syncSavedFragments();
		}
	}

	private sendRequest( method:HTTPMethod, uri:string, options:RequestOptions, body?:string | Blob | Buffer ):Promise<Response>;
	private sendRequest<T extends object>( method:HTTPMethod, uri:string, options:RequestOptions, body?:string | Blob | Buffer, parser?:Parser<T> ):Promise<[ T, Response ]>;
	private sendRequest( method:HTTPMethod, uri:string, options:RequestOptions, body?:string | Blob | Buffer, parser?:Parser<any> ):any {
		return RequestService.send( method, uri, body || null, options, parser )
			.catch( this._parseErrorResponse.bind( this ) );
	}
}

export default Documents;
