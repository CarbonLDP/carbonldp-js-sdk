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

import * as AccessPoint from "./AccessPoint";
import * as Auth from "./Auth";
import Carbon from "./Carbon";
import Context from "./Context";
import * as Document from "./Document";
import * as Errors from "./Errors";
import * as FreeResources from "./FreeResources";
import * as HTTP from "./HTTP";
import * as JSONLD from "./JSONLD";
import * as LDP from "./LDP";
import * as LDPatch from "./LDPatch";
import * as Messaging from "./Messaging";
import {
	createDestination,
	validateEventContext,
} from "./Messaging/Utils";
import * as NS from "./NS";
import * as ObjectSchema from "./ObjectSchema";
import * as PersistedAccessPoint from "./PersistedAccessPoint";
import * as PersistedBlankNode from "./PersistedBlankNode";
import * as PersistedDocument from "./PersistedDocument";
import * as PersistedFragment from "./PersistedFragment";
import * as PersistedProtectedDocument from "./PersistedProtectedDocument";
import * as PersistedResource from "./PersistedResource";
import * as Pointer from "./Pointer";
import * as ProtectedDocument from "./ProtectedDocument";
import * as RDF from "./RDF";
import * as Resource from "./Resource";
import * as SPARQL from "./SPARQL";
import SparqlBuilder from "./SPARQL/Builder";
import {
	QueryContext,
	QueryContextBuilder,
	QueryContextPartial,
	QueryDocumentBuilder,
	QueryDocumentsBuilder,
	QueryProperty,
} from "./SPARQL/QueryDocument";
import {
	createGraphPattern,
	createPropertyPatterns,
	createTypesPattern,
} from "./SPARQL/QueryDocument/Utils";
import * as Utils from "./Utils";
import {
	mapTupleArray,
	promiseMethod,
} from "./Utils";

export class Class implements Pointer.Library, Pointer.Validator, ObjectSchema.Resolver {

	private _jsonldConverter:JSONLD.Converter.Class;
	get jsonldConverter():JSONLD.Converter.Class { return this._jsonldConverter; }

	private _documentDecorators:Map<string, ( object:object, documents?:Class ) => object>;
	get documentDecorators():Map<string, ( object:object, documents?:Class ) => object> { return this._documentDecorators; }

	private context:Context;
	private pointers:Map<string, Pointer.Class>;

	// Tracks the documents that are being resolved to avoid triggering repeated requests
	private documentsBeingResolved:Map<string, Promise<[ PersistedDocument.Class, HTTP.Response.Class ]>>;

	constructor( context?:Context ) {
		this.context = context;

		this.pointers = new Map<string, Pointer.Class>();
		this.documentsBeingResolved = new Map<string, Promise<[ PersistedDocument.Class, HTTP.Response.Class ]>>();

		if( ! ! this.context && ! ! this.context.parentContext ) {
			let contextJSONLDConverter:JSONLD.Converter.Class = this.context.parentContext.documents.jsonldConverter;
			this._jsonldConverter = new JSONLD.Converter.Class( contextJSONLDConverter.literalSerializers );
		} else {
			this._jsonldConverter = new JSONLD.Converter.Class();
		}

		let decorators:Class[ "documentDecorators" ] = new Map();
		if( this.context && this.context.parentContext ) {
			let parentDecorators:Class[ "documentDecorators" ] = this.context.parentContext.documents.documentDecorators;
			if( parentDecorators ) decorators = this._documentDecorators = Utils.M.extend( decorators, parentDecorators );
		} else {
			decorators.set( ProtectedDocument.RDF_CLASS, PersistedProtectedDocument.Factory.decorate );
			decorators.set( Auth.ACL.RDF_CLASS, Auth.PersistedACL.Factory.decorate );
			decorators.set( Auth.User.RDF_CLASS, Auth.PersistedUser.Factory.decorate );
			decorators.set( Auth.Role.RDF_CLASS, Auth.PersistedRole.Factory.decorate );
			decorators.set( Auth.Credentials.RDF_CLASS, Auth.PersistedCredentials.Factory.decorate );
		}

		this._documentDecorators = decorators;
	}

	inScope( pointer:Pointer.Class ):boolean;
	inScope( id:string ):boolean;
	inScope( idOrPointer:any ):boolean {
		let id:string = Pointer.Factory.is( idOrPointer ) ? idOrPointer.id : idOrPointer;

		if( RDF.URI.Util.isBNodeID( id ) ) return false;

		if( ! ! this.context ) {
			if( RDF.URI.Util.isPrefixed( id ) ) id = ObjectSchema.Digester.resolvePrefixedURI( id, this.context.getObjectSchema() );

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

	getPointer( id:string ):Pointer.Class {
		let localID:string = this.getPointerID( id );

		if( localID === null ) {
			if( ! ! this.context && ! ! this.context.parentContext ) return this.context.parentContext.documents.getPointer( id );
			throw new Errors.IllegalArgumentError( "The pointer id is not supported by this module." );
		}

		let pointer:Pointer.Class;
		if( ! this.pointers.has( localID ) ) {
			pointer = this.createPointer( localID );
			this.pointers.set( localID, pointer );
		}

		return this.pointers.get( localID );
	}

	removePointer( idOrPointer:string | Pointer.Class ):boolean {
		let id:string = Utils.isString( idOrPointer ) ? <string> idOrPointer : (<Pointer.Class> idOrPointer).id;
		let localID:string = this.getPointerID( id );

		if( localID === null ) {
			if( ! ! this.context && ! ! this.context.parentContext ) return this.context.parentContext.documents.removePointer( id );
			return false;
		}

		return this.pointers.delete( localID );
	}

	get<T extends object>( uri:string, requestOptions?:HTTP.Request.GETOptions, queryBuilderFn?:( queryBuilder:QueryDocumentBuilder.Class ) => QueryDocumentBuilder.Class ):Promise<[ T & PersistedDocument.Class, HTTP.Response.Class ]>;
	get<T extends object>( uri:string, queryBuilderFn?:( queryBuilder:QueryDocumentBuilder.Class ) => QueryDocumentBuilder.Class ):Promise<[ T & PersistedDocument.Class, HTTP.Response.Class ]>;
	get<T extends object>( uri:string, optionsOrQueryBuilderFn:any, queryBuilderFn?:( queryBuilder:QueryDocumentBuilder.Class ) => QueryDocumentBuilder.Class ):Promise<[ T & PersistedDocument.Class, HTTP.Response.Class ]> {
		const requestOptions:HTTP.Request.Options = HTTP.Request.Util.isOptions( optionsOrQueryBuilderFn ) ? optionsOrQueryBuilderFn : {};
		if( Utils.isFunction( optionsOrQueryBuilderFn ) ) queryBuilderFn = optionsOrQueryBuilderFn;

		return promiseMethod( () => {
			uri = this.getRequestURI( uri );

			return queryBuilderFn ?
				this.getPartialDocument( uri, requestOptions, queryBuilderFn ) :
				this.getFullDocument( uri, requestOptions );
		} );
	}

	exists( documentURI:string, requestOptions:HTTP.Request.Options = {} ):Promise<[ boolean, HTTP.Response.Class ]> {
		return promiseMethod( () => {
			documentURI = this.getRequestURI( documentURI );
			this.setDefaultRequestOptions( requestOptions, NS.LDP.Class.RDFSource );

			return this.sendRequest( HTTP.Method.HEAD, documentURI, requestOptions );
		} ).then<[ boolean, HTTP.Response.Class ]>( ( response:HTTP.Response.Class ) => {
			return [ true, response ];
		} ).catch<[ boolean, HTTP.Response.Class ]>( ( error:HTTP.Errors.Error ) => {
			if( error.statusCode === 404 ) return [ false, error.response ];
			return Promise.reject( error );
		} );
	}

	createChild<T extends object>( parentURI:string, childObject:T, slug?:string, requestOptions?:HTTP.Request.Options ):Promise<[ T & PersistedProtectedDocument.Class, HTTP.Response.Class ]>;
	createChild<T extends object>( parentURI:string, childObject:T, requestOptions?:HTTP.Request.Options ):Promise<[ T & PersistedProtectedDocument.Class, HTTP.Response.Class ]>;
	createChild<T extends object>( parentURI:string, childObject:T, slugOrRequestOptions?:any, requestOptions:HTTP.Request.Options = {} ):Promise<[ T & PersistedProtectedDocument.Class, HTTP.Response.Class ]> {
		const slug:string = Utils.isString( slugOrRequestOptions ) ? slugOrRequestOptions : null;
		requestOptions = ! Utils.isString( slugOrRequestOptions ) && ! ! slugOrRequestOptions ? slugOrRequestOptions : requestOptions;

		return promiseMethod( () => {
			parentURI = this.getRequestURI( parentURI );
			HTTP.Request.Util.setPreferredRetrieval( "minimal", requestOptions );

			return this.persistChildDocument<T>( parentURI, childObject, slug, requestOptions );
		} );
	}

	createChildren<T extends object>( parentURI:string, childrenObjects:T[], slugs?:string[], requestOptions?:HTTP.Request.Options ):Promise<[ (T & PersistedProtectedDocument.Class)[], HTTP.Response.Class[] ]>;
	createChildren<T extends object>( parentURI:string, childrenObjects:T[], requestOptions?:HTTP.Request.Options ):Promise<[ (T & PersistedProtectedDocument.Class)[], HTTP.Response.Class[] ]>;
	createChildren<T extends object>( parentURI:string, childrenObjects:T[], slugsOrRequestOptions?:any, requestOptions:HTTP.Request.Options = {} ):Promise<[ (T & PersistedProtectedDocument.Class)[], HTTP.Response.Class[] ]> {
		const slugs:string[] = Utils.isArray( slugsOrRequestOptions ) ? slugsOrRequestOptions : [];
		requestOptions = ! Utils.isArray( slugsOrRequestOptions ) && ! ! slugsOrRequestOptions ? slugsOrRequestOptions : requestOptions;

		return promiseMethod( () => {
			parentURI = this.getRequestURI( parentURI );
			HTTP.Request.Util.setPreferredRetrieval( "minimal", requestOptions );

			return Promise.all<[ T & PersistedProtectedDocument.Class, HTTP.Response.Class ]>( childrenObjects.map( ( childObject:T, index:number ) => {
				const cloneOptions:HTTP.Request.Options = HTTP.Request.Util.cloneOptions( requestOptions );
				return this.persistChildDocument<T>( parentURI, childObject, slugs[ index ], cloneOptions );
			} ) );
		} ).then( mapTupleArray );
	}

	createChildAndRetrieve<T extends object>( parentURI:string, childObject:T, slug?:string, requestOptions?:HTTP.Request.Options ):Promise<[ T & PersistedProtectedDocument.Class, HTTP.Response.Class ]>;
	createChildAndRetrieve<T extends object>( parentURI:string, childObject:T, requestOptions?:HTTP.Request.Options ):Promise<[ T & PersistedProtectedDocument.Class, HTTP.Response.Class ]>;
	createChildAndRetrieve<T extends object>( parentURI:string, childObject:T, slugOrRequestOptions?:any, requestOptions:HTTP.Request.Options = {} ):Promise<[ T & PersistedProtectedDocument.Class, HTTP.Response.Class ]> {
		requestOptions = HTTP.Request.Util.isOptions( slugOrRequestOptions ) ? slugOrRequestOptions : requestOptions;
		const slug:string = Utils.isString( slugOrRequestOptions ) ? slugOrRequestOptions : null;

		return promiseMethod( () => {
			parentURI = this.getRequestURI( parentURI );
			HTTP.Request.Util.setPreferredRetrieval( "representation", requestOptions );

			return this.persistChildDocument<T>( parentURI, childObject, slug, requestOptions );
		} );
	}

	createChildrenAndRetrieve<T extends object>( parentURI:string, childrenObjects:T[], slugs?:string[], requestOptions?:HTTP.Request.Options ):Promise<[ (T & PersistedProtectedDocument.Class)[], HTTP.Response.Class[] ]>;
	createChildrenAndRetrieve<T extends object>( parentURI:string, childrenObjects:T[], requestOptions?:HTTP.Request.Options ):Promise<[ (T & PersistedProtectedDocument.Class)[], HTTP.Response.Class[] ]>;
	createChildrenAndRetrieve<T extends object>( parentURI:string, childrenObjects:T[], slugsOrRequestOptions?:any, requestOptions:HTTP.Request.Options = {} ):Promise<[ (T & PersistedProtectedDocument.Class)[], HTTP.Response.Class[] ]> {
		const slugs:string[] = Utils.isArray( slugsOrRequestOptions ) ? slugsOrRequestOptions : [];
		requestOptions = ! Utils.isArray( slugsOrRequestOptions ) && ! ! slugsOrRequestOptions ? slugsOrRequestOptions : requestOptions;

		return promiseMethod( () => {
			parentURI = this.getRequestURI( parentURI );
			HTTP.Request.Util.setPreferredRetrieval( "representation", requestOptions );

			return Promise.all<[ T & PersistedProtectedDocument.Class, HTTP.Response.Class ]>( childrenObjects.map( ( childObject:T, index:number ) => {
				const cloneOptions:HTTP.Request.Options = HTTP.Request.Util.cloneOptions( requestOptions );
				return this.persistChildDocument<T>( parentURI, childObject, slugs[ index ], cloneOptions );
			} ) );
		} ).then( mapTupleArray );
	}


	listChildren( parentURI:string, requestOptions?:HTTP.Request.Options ):Promise<[ PersistedDocument.Class[], HTTP.Response.Class ]> {
		return promiseMethod( () => {
			parentURI = this.getRequestURI( parentURI );

			const queryContext:QueryContextBuilder.Class = new QueryContextBuilder.Class( this.context );
			const childrenVar:VariableToken = queryContext.getVariable( "child" );

			const pattens:PatternToken[] = [
				new SubjectToken( queryContext.compactIRI( parentURI ) )
					.addPredicate( new PredicateToken( queryContext.compactIRI( NS.LDP.Predicate.contains ) )
						.addObject( childrenVar )
					),
			];

			return this.executeSelectPatterns( parentURI, requestOptions, queryContext, "child", pattens );
		} );
	}

	getChildren<T extends object>( parentURI:string, requestOptions:HTTP.Request.Options, queryBuilderFn?:( queryBuilder:QueryDocumentsBuilder.Class ) => QueryDocumentsBuilder.Class ):Promise<[ (T & PersistedDocument.Class)[], HTTP.Response.Class ]>;
	getChildren<T extends object>( parentURI:string, queryBuilderFn?:( queryBuilder:QueryDocumentsBuilder.Class ) => QueryDocumentsBuilder.Class ):Promise<[ (T & PersistedDocument.Class)[], HTTP.Response.Class ]>;
	getChildren<T extends object>( parentURI:string, requestOptionsOrQueryBuilderFn?:any, queryBuilderFn?:( queryBuilder:QueryDocumentsBuilder.Class ) => QueryDocumentsBuilder.Class ):Promise<[ (T & PersistedDocument.Class)[], HTTP.Response.Class ]> {
		const requestOptions:HTTP.Request.Options = HTTP.Request.Util.isOptions( requestOptionsOrQueryBuilderFn ) ? requestOptionsOrQueryBuilderFn : {};
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
					.addPredicate( new PredicateToken( queryContext.compactIRI( NS.LDP.Predicate.contains ) )
						.addObject( childrenProperty.variable )
					)
				)
			;
			childrenProperty.addPattern( selectChildren );

			return this.executeQueryBuilder<T>( parentURI, requestOptions, queryContext, childrenProperty, queryBuilderFn );
		} );
	}

	createAccessPoint<T extends object>( documentURI:string, accessPoint:T & AccessPoint.Class, slug?:string, requestOptions?:HTTP.Request.Options ):Promise<[ T & PersistedAccessPoint.Class, HTTP.Response.Class ]>;
	createAccessPoint<T extends object>( documentURI:string, accessPoint:T & AccessPoint.Class, requestOptions?:HTTP.Request.Options ):Promise<[ T & PersistedAccessPoint.Class, HTTP.Response.Class ]>;
	createAccessPoint<T extends object>( documentURI:string, accessPoint:T & AccessPoint.Class, slugOrRequestOptions:any, requestOptions:HTTP.Request.Options = {} ):Promise<[ T & PersistedAccessPoint.Class, HTTP.Response.Class ]> {
		const slug:string = Utils.isString( slugOrRequestOptions ) ? slugOrRequestOptions : null;
		requestOptions = ! Utils.isString( slugOrRequestOptions ) && ! ! slugOrRequestOptions ? slugOrRequestOptions : requestOptions;

		return promiseMethod( () => {
			documentURI = this.getRequestURI( documentURI );
			HTTP.Request.Util.setPreferredRetrieval( "minimal", requestOptions );

			return this.persistAccessPoint( documentURI, accessPoint, slug, requestOptions );
		} );
	}

	createAccessPoints<T extends object>( documentURI:string, accessPoints:(T & AccessPoint.Class)[], slugs?:string[], requestOptions?:HTTP.Request.Options ):Promise<[ (T & PersistedAccessPoint.Class)[], HTTP.Response.Class[] ]>;
	createAccessPoints<T extends object>( documentURI:string, accessPoints:(T & AccessPoint.Class)[], requestOptions?:HTTP.Request.Options ):Promise<[ (T & PersistedAccessPoint.Class)[], HTTP.Response.Class[] ]>;
	createAccessPoints<T extends object>( documentURI:string, accessPoints:(T & AccessPoint.Class)[], slugsOrRequestOptions:any, requestOptions:HTTP.Request.Options = {} ):Promise<[ (T & PersistedAccessPoint.Class)[], HTTP.Response.Class[] ]> {
		const slugs:string[] = Utils.isArray( slugsOrRequestOptions ) ? slugsOrRequestOptions : [];
		requestOptions = ! Utils.isArray( slugsOrRequestOptions ) && ! ! slugsOrRequestOptions ? slugsOrRequestOptions : requestOptions;

		return promiseMethod( () => {
			documentURI = this.getRequestURI( documentURI );
			HTTP.Request.Util.setPreferredRetrieval( "minimal", requestOptions );

			return Promise.all<[ T & PersistedAccessPoint.Class, HTTP.Response.Class ]>( accessPoints.map( ( accessPoint:T & AccessPoint.Class, index:number ) => {
				const cloneOptions:HTTP.Request.Options = HTTP.Request.Util.cloneOptions( requestOptions );
				return this.persistAccessPoint<T>( documentURI, accessPoint, slugs[ index ], cloneOptions );
			} ) );
		} ).then( mapTupleArray );
	}

	upload( parentURI:string, data:Blob | Buffer, slug?:string, requestOptions?:HTTP.Request.Options ):Promise<[ Pointer.Class, HTTP.Response.Class ]>;
	upload( parentURI:string, data:Blob | Buffer, requestOptions?:HTTP.Request.Options ):Promise<[ Pointer.Class, HTTP.Response.Class ]>;
	upload( parentURI:string, data:Blob | Buffer, slugOrRequestOptions?:any, requestOptions:HTTP.Request.Options = {} ):Promise<[ Pointer.Class, HTTP.Response.Class ]> {
		let slug:string = Utils.isString( slugOrRequestOptions ) ? slugOrRequestOptions : null;
		requestOptions = ! Utils.isString( slugOrRequestOptions ) && ! ! slugOrRequestOptions ? slugOrRequestOptions : requestOptions;

		if( typeof Blob !== "undefined" ) {
			if( ! (data instanceof Blob) ) return Promise.reject( new Errors.IllegalArgumentError( "The data is not a valid Blob object." ) );
			HTTP.Request.Util.setContentTypeHeader( (<Blob> data).type, requestOptions );

		} else {
			if( ! (data instanceof Buffer) ) return Promise.reject( new Errors.IllegalArgumentError( "The data is not a valid Buffer object." ) );
			const fileType:( buffer:Buffer ) => { ext:string, mime:string } = require( "file-type" );

			let bufferType:{ ext:string, mime:string } = fileType( <Buffer> data );
			HTTP.Request.Util.setContentTypeHeader( bufferType ? bufferType.mime : "application/octet-stream", requestOptions );
		}

		return promiseMethod( () => {
			parentURI = this.getRequestURI( parentURI );
			this.setDefaultRequestOptions( requestOptions, NS.LDP.Class.Container );

			if( ! ! slug ) HTTP.Request.Util.setSlug( slug, requestOptions );

			return this.sendRequest( HTTP.Method.POST, parentURI, requestOptions, data );
		} ).then<[ Pointer.Class, HTTP.Response.Class ]>( ( response:HTTP.Response.Class ) => {
			let locationHeader:HTTP.Header.Class = response.getHeader( "Location" );
			if( locationHeader === null || locationHeader.values.length < 1 ) throw new HTTP.Errors.BadResponseError( "The response is missing a Location header.", response );
			if( locationHeader.values.length !== 1 ) throw new HTTP.Errors.BadResponseError( "The response contains more than one Location header.", response );

			let locationURI:string = locationHeader.values[ 0 ].toString();

			let pointer:Pointer.Class = this.getPointer( locationURI );

			return [ pointer, response ];
		} );
	}


	listMembers( uri:string, requestOptions?:HTTP.Request.Options ):Promise<[ PersistedDocument.Class[], HTTP.Response.Class ]> {
		return promiseMethod( () => {
			uri = this.getRequestURI( uri );

			const queryContext:QueryContextBuilder.Class = new QueryContextBuilder.Class( this.context );
			const memberVar:VariableToken = queryContext.getVariable( "member" );

			const membershipResource:VariableToken = queryContext.getVariable( "membershipResource" );
			const hasMemberRelation:VariableToken = queryContext.getVariable( "hasMemberRelation" );
			const pattens:PatternToken[] = [
				new SubjectToken( queryContext.compactIRI( uri ) )
					.addPredicate( new PredicateToken( queryContext.compactIRI( NS.LDP.Predicate.membershipResource ) )
						.addObject( membershipResource )
					)
					.addPredicate( new PredicateToken( queryContext.compactIRI( NS.LDP.Predicate.hasMemberRelation ) )
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

	getMembers<T extends object>( uri:string, requestOptions:HTTP.Request.Options, queryBuilderFn?:( queryBuilder:QueryDocumentsBuilder.Class ) => QueryDocumentsBuilder.Class ):Promise<[ (T & PersistedDocument.Class)[], HTTP.Response.Class ]>;
	getMembers<T extends object>( uri:string, queryBuilderFn?:( queryBuilder:QueryDocumentsBuilder.Class ) => QueryDocumentsBuilder.Class ):Promise<[ (T & PersistedDocument.Class)[], HTTP.Response.Class ]>;
	getMembers<T extends object>( uri:string, requestOptionsOrQueryBuilderFn?:any, queryBuilderFn?:( queryBuilder:QueryDocumentsBuilder.Class ) => QueryDocumentsBuilder.Class ):Promise<[ (T & PersistedDocument.Class)[], HTTP.Response.Class ]> {
		const requestOptions:HTTP.Request.Options = HTTP.Request.Util.isOptions( requestOptionsOrQueryBuilderFn ) ? requestOptionsOrQueryBuilderFn : {};
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
					.addPredicate( new PredicateToken( queryContext.compactIRI( NS.LDP.Predicate.membershipResource ) )
						.addObject( membershipResource )
					)
					.addPredicate( new PredicateToken( queryContext.compactIRI( NS.LDP.Predicate.hasMemberRelation ) )
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

	addMember( documentURI:string, member:Pointer.Class, requestOptions?:HTTP.Request.Options ):Promise<HTTP.Response.Class>;
	addMember( documentURI:string, memberURI:string, requestOptions?:HTTP.Request.Options ):Promise<HTTP.Response.Class>;
	addMember( documentURI:string, memberORUri:Pointer.Class | string, requestOptions:HTTP.Request.Options = {} ):Promise<HTTP.Response.Class> {
		return this.addMembers( documentURI, [ memberORUri ], requestOptions );
	}

	addMembers( documentURI:string, members:(Pointer.Class | string)[], requestOptions?:HTTP.Request.Options ):Promise<HTTP.Response.Class>;
	addMembers( documentURI:string, members:(Pointer.Class | string)[], requestOptions:HTTP.Request.Options = {} ):Promise<HTTP.Response.Class> {
		return promiseMethod( () => {
			const pointers:Pointer.Class[] = this._parseMembers( members );

			documentURI = this.getRequestURI( documentURI );
			this.setDefaultRequestOptions( requestOptions, NS.LDP.Class.Container );
			HTTP.Request.Util.setContentTypeHeader( "application/ld+json", requestOptions );

			const freeResources:FreeResources.Class = FreeResources.Factory.create( this );
			freeResources.createResourceFrom( LDP.AddMemberAction.Factory.create( pointers ) );

			return this.sendRequest( HTTP.Method.PUT, documentURI, requestOptions, freeResources.toJSON() );
		} );
	}

	removeMember( documentURI:string, member:Pointer.Class, requestOptions?:HTTP.Request.Options ):Promise<HTTP.Response.Class>;
	removeMember( documentURI:string, memberURI:string, requestOptions?:HTTP.Request.Options ):Promise<HTTP.Response.Class>;
	removeMember( documentURI:string, memberORUri:Pointer.Class | string, requestOptions:HTTP.Request.Options = {} ):Promise<HTTP.Response.Class> {
		return this.removeMembers( documentURI, [ memberORUri ], requestOptions );
	}

	removeMembers( documentURI:string, members:(Pointer.Class | string)[], requestOptions:HTTP.Request.Options = {} ):Promise<HTTP.Response.Class> {
		return promiseMethod( () => {
			const pointers:Pointer.Class[] = this._parseMembers( members );

			documentURI = this.getRequestURI( documentURI );
			this.setDefaultRequestOptions( requestOptions, NS.LDP.Class.Container );
			HTTP.Request.Util.setContentTypeHeader( "application/ld+json", requestOptions );

			let containerRetrievalPreferences:HTTP.Request.RetrievalPreferences = {
				include: [ NS.C.Class.PreferSelectedMembershipTriples ],
				omit: [ NS.C.Class.PreferMembershipTriples ],
			};
			HTTP.Request.Util.setRetrievalPreferences( containerRetrievalPreferences, requestOptions, false );

			const freeResources:FreeResources.Class = FreeResources.Factory.create( this );
			freeResources.createResourceFrom( LDP.RemoveMemberAction.Factory.create( pointers ) );

			return this.sendRequest( HTTP.Method.DELETE, documentURI, requestOptions, freeResources.toJSON() );
		} );
	}

	removeAllMembers( documentURI:string, requestOptions:HTTP.Request.Options = {} ):Promise<HTTP.Response.Class> {
		return promiseMethod( () => {
			documentURI = this.getRequestURI( documentURI );
			this.setDefaultRequestOptions( requestOptions, NS.LDP.Class.Container );

			let containerRetrievalPreferences:HTTP.Request.RetrievalPreferences = {
				include: [
					NS.C.Class.PreferMembershipTriples,
				],
				omit: [
					NS.C.Class.PreferMembershipResources,
					NS.C.Class.PreferContainmentTriples,
					NS.C.Class.PreferContainmentResources,
					NS.C.Class.PreferContainer,
				],
			};
			HTTP.Request.Util.setRetrievalPreferences( containerRetrievalPreferences, requestOptions, false );

			return this.sendRequest( HTTP.Method.DELETE, documentURI, requestOptions );
		} );
	}


	save<T extends object>( persistedDocument:T & PersistedDocument.Class, requestOptions:HTTP.Request.Options = {} ):Promise<[ T & PersistedDocument.Class, HTTP.Response.Class ]> {
		return promiseMethod( () => {
			if( ! PersistedDocument.Factory.is( persistedDocument ) ) throw new Errors.IllegalArgumentError( "Provided element is not a valid persisted document." );

			HTTP.Request.Util.setPreferredRetrieval( "minimal", requestOptions );
			return this.patchDocument<T>( persistedDocument, requestOptions );
		} );
	}

	refresh<T extends object>( persistedDocument:T & PersistedDocument.Class, requestOptions:HTTP.Request.Options = {} ):Promise<[ T & PersistedDocument.Class, HTTP.Response.Class ]> {
		return Utils.promiseMethod( () => {
			if( ! PersistedDocument.Factory.is( persistedDocument ) ) throw new Errors.IllegalArgumentError( "Provided element is not a valid persisted document." );

			return persistedDocument.isPartial() ?
				this.refreshPartialDocument<T>( persistedDocument, requestOptions ) :
				this.refreshFullDocument<T>( persistedDocument, requestOptions );
		} );
	}

	saveAndRefresh<T extends object>( persistedDocument:T & PersistedDocument.Class, requestOptions:HTTP.Request.Options = {} ):Promise<[ T & PersistedDocument.Class, HTTP.Response.Class[] ]> {
		const responses:HTTP.Response.Class[] = [];
		return promiseMethod( () => {
			if( ! PersistedDocument.Factory.is( persistedDocument ) ) throw new Errors.IllegalArgumentError( "Provided element is not a valid persisted document." );

			const cloneOptions:HTTP.Request.Options = HTTP.Request.Util.cloneOptions( requestOptions );
			HTTP.Request.Util.setPreferredRetrieval( persistedDocument.isPartial() ? "minimal" : "representation", cloneOptions );

			return this.patchDocument<T>( persistedDocument, cloneOptions );
		} ).then<[ T & PersistedDocument.Class, HTTP.Response.Class ]>( ( [ , response ] ) => {
			if( ! persistedDocument.isPartial() ) return [ persistedDocument, response ];

			responses.push( response );
			return this.refreshPartialDocument<T>( persistedDocument, requestOptions );
		} ).then<[ T & PersistedDocument.Class, HTTP.Response.Class[] ]>( ( [ , response ] ) => {
			responses.push( response );
			return [ persistedDocument, responses ];
		} );
	}


	delete( documentURI:string, requestOptions:HTTP.Request.Options = {} ):Promise<HTTP.Response.Class> {
		return promiseMethod( () => {
			documentURI = this.getRequestURI( documentURI );
			this.setDefaultRequestOptions( requestOptions, NS.LDP.Class.RDFSource );

			return this.sendRequest( HTTP.Method.DELETE, documentURI, requestOptions );
		} ).then( ( response:HTTP.Response.Class ) => {
			let pointerID:string = this.getPointerID( documentURI );
			this.pointers.delete( pointerID );

			return response;
		} );
	}

	getDownloadURL( documentURI:string, requestOptions?:HTTP.Request.Options ):Promise<string> {
		if( ! this.context ) return Promise.reject( new Errors.IllegalStateError( "This instance doesn't support Authenticated request." ) );
		return promiseMethod( () => {
			documentURI = this.getRequestURI( documentURI );
			return this.context.auth.getAuthenticatedURL( documentURI, requestOptions );
		} );
	}


	getGeneralSchema():ObjectSchema.DigestedObjectSchema {
		if( ! this.context ) return new ObjectSchema.DigestedObjectSchema();

		let schema:ObjectSchema.DigestedObjectSchema = ObjectSchema.Digester.combineDigestedObjectSchemas( [ this.context.getObjectSchema() ] );
		if( this.context.hasSetting( "vocabulary" ) ) schema.vocab = this.context.resolve( this.context.getSetting( "vocabulary" ) );
		return schema;
	}

	getSchemaFor( object:Object ):ObjectSchema.DigestedObjectSchema {
		return ("@id" in object) ?
			this.getDigestedObjectSchemaForExpandedObject( object ) :
			this.getDigestedObjectSchemaForDocument( <any> object );
	}


	executeRawASKQuery( documentURI:string, askQuery:string, requestOptions:HTTP.Request.Options = {} ):Promise<[ SPARQL.RawResults.Class, HTTP.Response.Class ]> {
		return promiseMethod( () => {
			documentURI = this.getRequestURI( documentURI );

			if( this.context && this.context.auth.isAuthenticated() ) this.context.auth.addAuthentication( requestOptions );

			return SPARQL.Service.executeRawASKQuery( documentURI, askQuery, requestOptions )
				.catch( this._parseErrorResponse.bind( this ) );
		} );
	}

	executeASKQuery( documentURI:string, askQuery:string, requestOptions:HTTP.Request.Options = {} ):Promise<[ boolean, HTTP.Response.Class ]> {
		return promiseMethod( () => {
			documentURI = this.getRequestURI( documentURI );

			if( this.context && this.context.auth.isAuthenticated() ) this.context.auth.addAuthentication( requestOptions );

			return SPARQL.Service.executeASKQuery( documentURI, askQuery, requestOptions )
				.catch( this._parseErrorResponse.bind( this ) );
		} );
	}

	executeRawSELECTQuery( documentURI:string, selectQuery:string, requestOptions:HTTP.Request.Options = {} ):Promise<[ SPARQL.RawResults.Class, HTTP.Response.Class ]> {
		return promiseMethod( () => {
			documentURI = this.getRequestURI( documentURI );

			if( this.context && this.context.auth.isAuthenticated() ) this.context.auth.addAuthentication( requestOptions );

			return SPARQL.Service.executeRawSELECTQuery( documentURI, selectQuery, requestOptions )
				.catch( this._parseErrorResponse.bind( this ) );
		} );
	}

	executeSELECTQuery<T extends object>( documentURI:string, selectQuery:string, requestOptions:HTTP.Request.Options = {} ):Promise<[ SPARQL.SELECTResults.Class<T>, HTTP.Response.Class ]> {
		return promiseMethod( () => {
			documentURI = this.getRequestURI( documentURI );

			if( this.context && this.context.auth.isAuthenticated() ) this.context.auth.addAuthentication( requestOptions );

			return SPARQL.Service.executeSELECTQuery<T>( documentURI, selectQuery, this, requestOptions )
				.catch( this._parseErrorResponse.bind( this ) );
		} );
	}

	executeRawCONSTRUCTQuery( documentURI:string, constructQuery:string, requestOptions:HTTP.Request.Options = {} ):Promise<[ string, HTTP.Response.Class ]> {
		return promiseMethod( () => {
			documentURI = this.getRequestURI( documentURI );

			if( this.context && this.context.auth.isAuthenticated() ) this.context.auth.addAuthentication( requestOptions );

			return SPARQL.Service.executeRawCONSTRUCTQuery( documentURI, constructQuery, requestOptions )
				.catch( this._parseErrorResponse.bind( this ) );
		} );
	}

	executeRawDESCRIBEQuery( documentURI:string, describeQuery:string, requestOptions:HTTP.Request.Options = {} ):Promise<[ string, HTTP.Response.Class ]> {
		return promiseMethod( () => {
			documentURI = this.getRequestURI( documentURI );

			if( this.context && this.context.auth.isAuthenticated() ) this.context.auth.addAuthentication( requestOptions );

			return SPARQL.Service.executeRawDESCRIBEQuery( documentURI, describeQuery, requestOptions )
				.catch( this._parseErrorResponse.bind( this ) );
		} );
	}

	executeUPDATE( documentURI:string, update:string, requestOptions:HTTP.Request.Options = {} ):Promise<HTTP.Response.Class> {
		return promiseMethod( () => {
			documentURI = this.getRequestURI( documentURI );

			if( this.context && this.context.auth.isAuthenticated() ) this.context.auth.addAuthentication( requestOptions );

			return SPARQL.Service.executeUPDATE( documentURI, update, requestOptions )
				.catch( this._parseErrorResponse.bind( this ) );
		} );
	}


	sparql( documentURI:string ):QueryClause<SPARQL.Builder.ExecuteSelect> {
		let builder:QueryClause<SPARQL.Builder.ExecuteSelect> = new SparqlBuilder( this, this.getRequestURI( documentURI ) );

		if( ! ! this.context ) {
			builder = builder.base( this.context.baseURI );
			if( this.context.hasSetting( "vocabulary" ) ) {
				builder = builder.vocab( this.context.resolve( this.context.getSetting( "vocabulary" ) ) );
			}

			let schema:ObjectSchema.DigestedObjectSchema = this.context.getObjectSchema();
			schema.prefixes.forEach( ( uri:RDF.URI.Class, prefix:string ) => {
				builder = builder.prefix( prefix, uri.stringValue );
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
		const self:Class = this;
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


	_getPersistedDocument<T extends object>( rdfDocument:RDF.Document.Class, response:HTTP.Response.Class ):T & PersistedDocument.Class {
		const [ documentResources ] = RDF.Document.Util.getNodes( rdfDocument );
		if( documentResources.length === 0 ) throw new HTTP.Errors.BadResponseError( `The RDFDocument: ${ rdfDocument[ "@id" ] }, doesn't contain a document resource.`, response );
		if( documentResources.length > 1 ) throw new HTTP.Errors.BadResponseError( `The RDFDocument: ${ rdfDocument[ "@id" ] }, contains more than one document resource.`, response );

		return new JSONLD.Compacter.Class( this ).compactDocument( rdfDocument );
	}

	_getFreeResources( nodes:RDF.Node.Class[] ):FreeResources.Class {
		let freeResourcesDocument:FreeResources.Class = FreeResources.Factory.create( this );

		let resources:Resource.Class[] = nodes.map( node => freeResourcesDocument.createResource( node[ "@id" ] ) );
		this.compact( nodes, resources, freeResourcesDocument );

		return freeResourcesDocument;
	}

	_parseErrorResponse<T extends object>( response:HTTP.Response.Class | Error ):any {
		if( response instanceof Error ) return Promise.reject( response );

		if( ! (response.status >= 400 && response.status < 600 && HTTP.Errors.statusCodeMap.has( response.status )) )
			return Promise.reject( new HTTP.Errors.UnknownError( response.data, response ) );

		const error:HTTP.Errors.Error = new (HTTP.Errors.statusCodeMap.get( response.status ))( response.data, response );
		if( ! response.data || ! this.context ) return Promise.reject( error );

		return new JSONLD.Parser.Class().parse( response.data ).then( ( freeNodes:RDF.Node.Class[] ) => {
			const freeResources:FreeResources.Class = this._getFreeResources( freeNodes );
			const errorResponses:LDP.ErrorResponse.Class[] = freeResources
				.getResources()
				.filter( ( resource ):resource is LDP.ErrorResponse.Class => resource.hasType( LDP.ErrorResponse.RDF_CLASS ) );
			if( errorResponses.length === 0 ) return Promise.reject( new Errors.IllegalArgumentError( "The response string does not contains a c:ErrorResponse." ) );
			if( errorResponses.length > 1 ) return Promise.reject( new Errors.IllegalArgumentError( "The response string contains multiple c:ErrorResponse." ) );

			Object.assign( error, errorResponses[ 0 ] );
			error.message = LDP.ErrorResponse.Util.getMessage( error );
			return Promise.reject( error );
		}, () => {
			return Promise.reject( error );
		} );
	}


	private getFullDocument<T extends object>( uri:string, requestOptions:HTTP.Request.GETOptions ):Promise<[ T & PersistedDocument.Class, HTTP.Response.Class ]> {
		if( this.hasPointer( uri ) ) {
			const pointer:Pointer.Class = this.getPointer( uri );
			if( pointer.isResolved() ) {
				const persistedDocument:T & PersistedDocument.Class = pointer as any;
				if( ! persistedDocument.isPartial() || ! requestOptions.ensureLatest )
					return Promise.resolve<[ T & PersistedDocument.Class, HTTP.Response.Class ]>( [ persistedDocument, null ] );
			}
		}

		this.setDefaultRequestOptions( requestOptions, NS.LDP.Class.RDFSource );

		if( this.documentsBeingResolved.has( uri ) )
			return this.documentsBeingResolved.get( uri ) as Promise<[ T & PersistedDocument.Class, HTTP.Response.Class ]>;

		const promise:Promise<[ T & PersistedDocument.Class, HTTP.Response.Class ]> = this.sendRequest( HTTP.Method.GET, uri, requestOptions, null, new RDF.Document.Parser() )
			.then<[ T & PersistedDocument.Class, HTTP.Response.Class ]>( ( [ rdfDocuments, response ]:[ RDF.Document.Class[], HTTP.Response.Class ] ) => {
				const eTag:string = HTTP.Response.Util.getETag( response );
				if( eTag === null ) throw new HTTP.Errors.BadResponseError( "The response doesn't contain an ETag", response );

				let targetURI:string = uri;
				const locationHeader:HTTP.Header.Class = response.getHeader( "Content-Location" );
				if( locationHeader ) {
					if( locationHeader.values.length !== 1 ) throw new HTTP.Errors.BadResponseError( "The response must contain one Content-Location header.", response );

					const locationString:string = "" + locationHeader;
					if( ! locationString ) throw new HTTP.Errors.BadResponseError( `The response doesn't contain a valid 'Content-Location' header.`, response );
					targetURI = locationString;
				}

				const rdfDocument:RDF.Document.Class = this.getRDFDocument( targetURI, rdfDocuments, response );
				if( rdfDocument === null ) throw new HTTP.Errors.BadResponseError( "No document was returned.", response );

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

	private getPartialDocument<T extends object>( uri:string, requestOptions:HTTP.Request.Options, queryBuilderFn?:( queryBuilder:QueryDocumentBuilder.Class ) => QueryDocumentBuilder.Class ):Promise<[ T & PersistedDocument.Class, HTTP.Response.Class ]> {
		const queryContext:QueryContextBuilder.Class = new QueryContextBuilder.Class( this.context );

		const documentProperty:QueryProperty.Class = queryContext
			.addProperty( "document" )
			.setOptional( false );

		const propertyValue:ValuesToken = new ValuesToken().addValues( documentProperty.variable, queryContext.compactIRI( uri ) );
		documentProperty.addPattern( propertyValue );

		return this.executeQueryBuilder<T>( uri, requestOptions, queryContext, documentProperty, queryBuilderFn )
			.then<[ T & PersistedDocument.Class, HTTP.Response.Class ]>( ( [ documents, response ] ) => [ documents[ 0 ], response ] );
	}


	private patchDocument<T extends object>( persistedDocument:T & PersistedDocument.Class, requestOptions:HTTP.Request.Options ):Promise<[ T & PersistedDocument.Class, HTTP.Response.Class ]> {
		const uri:string = this.getRequestURI( persistedDocument.id );

		if( ! persistedDocument.isDirty() ) return Promise.resolve<[ T & PersistedDocument.Class, HTTP.Response.Class ]>( [ persistedDocument, null ] );
		if( persistedDocument.isLocallyOutDated() ) throw new Errors.IllegalStateError( "Cannot save an outdated document." );

		this.setDefaultRequestOptions( requestOptions );
		HTTP.Request.Util.setContentTypeHeader( "text/ldpatch", requestOptions );
		HTTP.Request.Util.setIfMatchHeader( persistedDocument._etag, requestOptions );

		persistedDocument._normalize();
		const deltaCreator:LDPatch.DeltaCreator.Class = new LDPatch.DeltaCreator.Class( this.jsonldConverter );
		[ persistedDocument, ...persistedDocument.getFragments() ].forEach( ( resource:PersistedResource.Class ) => {
			const schema:ObjectSchema.DigestedObjectSchema = this.getSchemaFor( resource );
			deltaCreator.addResource( schema, resource._snapshot, resource );
		} );

		const body:string = deltaCreator.getPatch();

		return this.sendRequest( HTTP.Method.PATCH, uri, requestOptions, body )
			.then<[ T & PersistedDocument.Class, HTTP.Response.Class ]>( ( response:HTTP.Response.Class ) => {
				return this.applyResponseData( persistedDocument, response );
			} );
	}


	private refreshFullDocument<T extends object>( persistedDocument:T & PersistedDocument.Class, requestOptions:HTTP.Request.Options ):Promise<[ T & PersistedDocument.Class, HTTP.Response.Class ]> {
		const uri:string = this.getRequestURI( persistedDocument.id );

		this.setDefaultRequestOptions( requestOptions, NS.LDP.Class.RDFSource );
		HTTP.Request.Util.setIfNoneMatchHeader( persistedDocument._etag, requestOptions );

		return this.sendRequest( HTTP.Method.GET, uri, requestOptions, null, new RDF.Document.Parser() ).then<[ T & PersistedDocument.Class, HTTP.Response.Class ]>( ( [ rdfDocuments, response ]:[ RDF.Document.Class[], HTTP.Response.Class ] ) => {
			if( response === null ) return <any> [ rdfDocuments, response ];

			let eTag:string = HTTP.Response.Util.getETag( response );
			if( eTag === null ) throw new HTTP.Errors.BadResponseError( "The response doesn't contain an ETag", response );

			let rdfDocument:RDF.Document.Class = this.getRDFDocument( uri, rdfDocuments, response );
			if( rdfDocument === null ) throw new HTTP.Errors.BadResponseError( "No document was returned.", response );

			let updatedPersistedDocument:PersistedDocument.Class = this._getPersistedDocument( rdfDocument, response );
			updatedPersistedDocument._etag = eTag;

			return [ updatedPersistedDocument, response ];
		} ).catch<[ T & PersistedDocument.Class, HTTP.Response.Class ]>( ( error:HTTP.Errors.Error ) => {
			if( error.statusCode === 304 ) return [ persistedDocument, null ];
			return Promise.reject( error );
		} );
	}

	private refreshPartialDocument<T extends object>( persistedDocument:T & PersistedDocument.Class, requestOptions:HTTP.Request.Options ):Promise<[ T & PersistedDocument.Class, HTTP.Response.Class ]> {
		const uri:string = this.getRequestURI( persistedDocument.id );
		const queryContext:QueryContextPartial.Class = new QueryContextPartial.Class( persistedDocument, this.context );

		const targetName:string = "document";
		const constructPatterns:OptionalToken = new OptionalToken()
			.addPattern( new ValuesToken()
				.addValues( queryContext.getVariable( targetName ), new IRIToken( uri ) )
			)
		;

		(function createRefreshQuery( parentAdder:OptionalToken, resource:PersistedResource.Class, parentName:string ):void {
			parentAdder.addPattern( new OptionalToken()
				.addPattern( new SubjectToken( queryContext.getVariable( parentName ) )
					.addPredicate( new PredicateToken( "a" )
						.addObject( queryContext.getVariable( `${ parentName }.types` ) ) )
				)
			);

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
			.then<[ T & PersistedDocument.Class, HTTP.Response.Class ]>( ( [ documents, response ] ) => [ documents[ 0 ], response ] );
	}


	private executeQueryBuilder<T extends object>( uri:string, requestOptions:HTTP.Request.Options, queryContext:QueryContextBuilder.Class, targetProperty:QueryProperty.Class, queryBuilderFn?:( queryBuilder:QueryDocumentBuilder.Class ) => QueryDocumentBuilder.Class ):Promise<[ (T & PersistedDocument.Class)[], HTTP.Response.Class ]> {
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
		return this.executeConstructPatterns<T>( uri, requestOptions, queryContext, targetProperty.name, constructPatterns );
	}

	private executeConstructPatterns<T extends object>( uri:string, requestOptions:HTTP.Request.Options, queryContext:QueryContext.Class, targetName:string, constructPatterns:PatternToken[], targetDocument?:T & PersistedDocument.Class ):Promise<[ (T & PersistedDocument.Class)[], HTTP.Response.Class ]> {
		const metadataVar:VariableToken = queryContext.getVariable( "metadata" );
		const construct:ConstructToken = new ConstructToken()
			.addTriple( new SubjectToken( metadataVar )
				.addPredicate( new PredicateToken( "a" )
					.addObject( queryContext.compactIRI( NS.C.Class.VolatileResource ) )
					.addObject( queryContext.compactIRI( NS.C.Class.QueryMetadata ) )
				)
				.addPredicate( new PredicateToken( queryContext.compactIRI( NS.C.Predicate.target ) )
					.addObject( queryContext.getVariable( targetName ) )
				)
			)
			.addPattern( new BindToken( "BNODE()", metadataVar ) )
			.addPattern( ...constructPatterns );

		const query:QueryToken = new QueryToken( construct )
			.addPrologues( ...queryContext.getPrologues() );

		(function triplesAdder( patterns:PatternToken[] ):void {
			patterns.forEach( ( pattern:PatternToken ) => {
				if( pattern.token === "optional" || pattern.token === "graph" )
					return triplesAdder( pattern.patterns );

				if( pattern.token !== "subject" ) return;

				const valid:boolean = pattern.predicates
					.map( predicate => predicate.objects )
					.some( objects => objects.some( object => object.token === "variable" ) );
				if( valid ) construct.addTriple( pattern );
			} );
		})( constructPatterns );

		HTTP.Request.Util.setRetrievalPreferences( { include: [ NS.C.Class.PreferResultsContext ] }, requestOptions, false );
		HTTP.Request.Util.setRetrievalPreferences( { include: [ NS.C.Class.PreferDocumentETags ] }, requestOptions, false );

		let response:HTTP.Response.Class;
		return this.executeRawCONSTRUCTQuery( uri, query.toString(), requestOptions ).then( ( [ jsonldString, _response ]:[ string, HTTP.Response.Class ] ) => {
			response = _response;
			return new JSONLD.Parser.Class().parse( jsonldString );

		} ).then<[ (T & PersistedDocument.Class)[], HTTP.Response.Class ]>( ( rdfNodes:RDF.Node.Class[] ) => {
			const freeResources:FreeResources.Class = this._getFreeResources( rdfNodes
				.filter( node => ! RDF.Document.Factory.is( node ) )
			);

			const targetSet:Set<string> = new Set( freeResources
				.getResources()
				.filter( SPARQL.QueryDocument.QueryMetadata.Factory.is )
				.map( x => this.context ? x.target : x[ NS.C.Predicate.target ] )
				// Alternative to flatMap
				.reduce( ( targets, currentTargets ) => targets.concat( currentTargets ), [] )
				.map( x => x.id )
			);

			const targetETag:string = targetDocument && targetDocument._etag;
			if( targetDocument ) targetDocument._etag = void 0;

			freeResources
				.getResources()
				.filter( LDP.ResponseMetadata.Factory.is )
				.map<LDP.DocumentMetadata.Class[] | LDP.DocumentMetadata.Class>( responseMetadata => responseMetadata.documentsMetadata || responseMetadata[ NS.C.Predicate.documentMetadata ] )
				.map<LDP.DocumentMetadata.Class[]>( documentsMetadata => Array.isArray( documentsMetadata ) ? documentsMetadata : [ documentsMetadata ] )
				.forEach( documentsMetadata => documentsMetadata.forEach( documentMetadata => {
					if( ! documentMetadata ) return;

					const relatedDocument:PersistedDocument.Class = documentMetadata.relatedDocument || documentMetadata[ NS.C.Predicate.relatedDocument ];
					const eTag:string = documentMetadata.eTag || documentMetadata[ NS.C.Predicate.eTag ];

					if( relatedDocument._etag === void 0 ) relatedDocument._etag = eTag;
					if( relatedDocument._etag !== eTag ) relatedDocument._etag = null;
				} ) );

			if( targetDocument && targetETag === targetDocument._etag )
				return [ [ targetDocument ], null ];

			const rdfDocuments:RDF.Document.Class[] = rdfNodes
				.filter<any>( RDF.Document.Factory.is );

			const targetDocuments:RDF.Document.Class[] = rdfDocuments
				.filter( x => targetSet.has( x[ "@id" ] ) );

			const documents:(T & PersistedDocument.Class)[] = new JSONLD.Compacter
				.Class( this, targetName, queryContext )
				.compactDocuments( rdfDocuments, targetDocuments );

			return [ documents, response ];
		} );
	}

	private executeSelectPatterns( uri:string, requestOptions:HTTP.Request.Options, queryContext:QueryContext.Class, targetName:string, selectPatterns:PatternToken[] ):Promise<[ PersistedDocument.Class[], HTTP.Response.Class ]> {
		const targetVar:VariableToken = queryContext.getVariable( targetName );
		const select:SelectToken = new SelectToken()
			.addVariable( targetVar )
			.addPattern( ...selectPatterns )
		;

		const query:QueryToken = new QueryToken( select as any )
			.addPrologues( ...queryContext.getPrologues() );

		return this
			.executeSELECTQuery( uri, query.toString(), requestOptions )
			.then<[ PersistedDocument.Class[], HTTP.Response.Class ]>( ( [ results, response ] ) => {
				const name:string = targetVar.toString().slice( 1 );
				const documents:PersistedDocument.Class[] = results
					.bindings
					.map( x => x[ name ] as Pointer.Class )
					.map( x => PersistedDocument.Factory.decorate( x, this ) );

				return [ documents, response ];
			} );
	}


	private persistChildDocument<T extends object>( parentURI:string, childObject:T, slug:string, requestOptions:HTTP.Request.Options ):Promise<[ T & PersistedProtectedDocument.Class, HTTP.Response.Class ]> {
		if( PersistedDocument.Factory.is( childObject ) ) throw new Errors.IllegalArgumentError( "The child provided has been already persisted." );
		let childDocument:T & Document.Class = Document.Factory.is( childObject ) ? <T & Document.Class> childObject : Document.Factory.createFrom<T>( childObject );

		this.setDefaultRequestOptions( requestOptions, NS.LDP.Class.Container );
		return this.persistDocument<T & Document.Class, PersistedProtectedDocument.Class>( parentURI, slug, childDocument, requestOptions );
	}

	private persistAccessPoint<T extends object>( documentURI:string, accessPoint:T & AccessPoint.Class, slug:string, requestOptions:HTTP.Request.Options ):Promise<[ T & PersistedAccessPoint.Class, HTTP.Response.Class ]> {
		if( PersistedDocument.Factory.is( accessPoint ) ) throw new Errors.IllegalArgumentError( "The access-point provided has been already persisted." );

		const accessPointDocument:T & AccessPoint.DocumentClass = AccessPoint.Factory.is( accessPoint ) ?
			accessPoint : AccessPoint.Factory.createFrom<T>( accessPoint, this.getPointer( documentURI ), accessPoint.hasMemberRelation, accessPoint.isMemberOfRelation );

		if( accessPointDocument.membershipResource.id !== documentURI ) throw new Errors.IllegalArgumentError( "The documentURI must be the same as the accessPoint's membershipResource." );

		this.setDefaultRequestOptions( requestOptions, NS.LDP.Class.RDFSource );
		return this.persistDocument<T & AccessPoint.DocumentClass, PersistedAccessPoint.Class>( documentURI, slug, accessPointDocument, requestOptions );
	}

	private persistDocument<T extends Document.Class, W extends PersistedProtectedDocument.Class>( parentURI:string, slug:string, document:T, requestOptions:HTTP.Request.Options ):Promise<[ T & W, HTTP.Response.Class ]> {
		HTTP.Request.Util.setContentTypeHeader( "application/ld+json", requestOptions );

		if( document.id ) {
			let childURI:string = document.id;
			if( ! ! this.context ) childURI = this.context.resolve( childURI );
			if( ! RDF.URI.Util.isBaseOf( parentURI, childURI ) ) {
				return Promise.reject( new Errors.IllegalArgumentError( "The document's URI is not relative to the parentURI specified" ) );
			}
		}

		if( document[ "__CarbonSDK_InProgressOfPersisting" ] ) return Promise.reject( new Errors.IllegalArgumentError( "The document is already being persisted." ) );
		Object.defineProperty( document, "__CarbonSDK_InProgressOfPersisting", { configurable: true, enumerable: false, writable: false, value: true } );

		let body:string = document.toJSON( this, this.jsonldConverter );

		if( ! ! slug ) HTTP.Request.Util.setSlug( slug, requestOptions );

		return HTTP.Request.Service.post( parentURI, body, requestOptions ).then<[ T & W, HTTP.Response.Class ]>( ( response:HTTP.Response.Class ) => {
			delete document[ "__CarbonSDK_InProgressOfPersisting" ];

			let locationHeader:HTTP.Header.Class = response.getHeader( "Location" );
			if( locationHeader === null || locationHeader.values.length < 1 ) throw new HTTP.Errors.BadResponseError( "The response is missing a Location header.", response );
			if( locationHeader.values.length !== 1 ) throw new HTTP.Errors.BadResponseError( "The response contains more than one Location header.", response );

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


	private getRDFDocument( requestURL:string, rdfDocuments:RDF.Document.Class[], response:HTTP.Response.Class ):RDF.Document.Class {
		rdfDocuments = rdfDocuments.filter( ( rdfDocument:RDF.Document.Class ) => rdfDocument[ "@id" ] === requestURL );

		if( rdfDocuments.length > 1 ) throw new HTTP.Errors.BadResponseError( "Several documents share the same id.", response );

		return rdfDocuments.length > 0 ? rdfDocuments[ 0 ] : null;
	}


	private getPointerID( uri:string ):string {
		if( RDF.URI.Util.isBNodeID( uri ) ) throw new Errors.IllegalArgumentError( "BNodes cannot be fetched directly." );
		// TODO: Make named fragments independently resolvable
		/*
			if( RDF.URI.Util.hasFragment( uri ) ) throw new Errors.IllegalArgumentError( "Fragment URI's cannot be fetched directly." );
		*/

		if( ! ! this.context ) {
			if( RDF.URI.Util.isPrefixed( uri ) ) uri = ObjectSchema.Digester.resolvePrefixedURI( uri, this.getGeneralSchema() );

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

	private createPointer( localID:string ):Pointer.Class {
		return this.createPointerFrom( {}, localID );
	}

	private createPointerFrom<T extends Object>( object:T, localID:string ):T & Pointer.Class {
		let id:string = ! ! this.context ? this.context.resolve( localID ) : localID;
		let pointer:T & Pointer.Class = Pointer.Factory.createFrom<T>( object, id );
		Object.defineProperty( pointer, "resolve", {
			writable: false,
			enumerable: false,
			configurable: true,
			value: ():Promise<[ PersistedDocument.Class, HTTP.Response.Class ]> => {
				return this.get( id );
			},
		} );

		return pointer;
	}


	private compact( expandedObjects:Object[], targetObjects:Object[], pointerLibrary:Pointer.Library ):Object[];
	private compact( expandedObject:Object, targetObject:Object, pointerLibrary:Pointer.Library ):Object;
	private compact( expandedObjectOrObjects:any, targetObjectOrObjects:any, pointerLibrary:Pointer.Library ):any {
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

	private compactSingle( expandedObject:Object, targetObject:Object, pointerLibrary:Pointer.Library ):Object {
		let digestedSchema:ObjectSchema.DigestedObjectSchema = this.getDigestedObjectSchemaForExpandedObject( expandedObject );

		return this.jsonldConverter.compact( expandedObject, targetObject, digestedSchema, pointerLibrary );
	}


	private getDigestedObjectSchemaForExpandedObject( expandedObject:Object ):ObjectSchema.DigestedObjectSchema {
		let types:string[] = RDF.Node.Util.getTypes( <any> expandedObject );

		return this.getDigestedObjectSchema( types, expandedObject[ "@id" ] );
	}

	private getDigestedObjectSchemaForDocument( document:Document.Class ):ObjectSchema.DigestedObjectSchema {
		if( PersistedResource.Factory.hasClassProperties( document ) && document.isPartial() ) {
			const schemas:ObjectSchema.DigestedObjectSchema[] = [ document._partialMetadata.schema ];
			return this.getSchemaWith( schemas );
		} else {
			const types:string[] = Resource.Util.getTypes( document );
			return this.getDigestedObjectSchema( types, document.id );
		}
	}

	private getDigestedObjectSchema( objectTypes:string[], objectID:string ):ObjectSchema.DigestedObjectSchema {
		if( ! this.context ) return new ObjectSchema.DigestedObjectSchema();

		if(
			Utils.isDefined( objectID ) &&
			! RDF.URI.Util.hasFragment( objectID ) &&
			! RDF.URI.Util.isBNodeID( objectID ) &&
			objectTypes.indexOf( Document.RDF_CLASS ) === - 1
		)
			objectTypes = objectTypes.concat( Document.RDF_CLASS );

		const schemas:ObjectSchema.DigestedObjectSchema[] = objectTypes
			.filter( type => this.context.hasObjectSchema( type ) )
			.map( type => this.context.getObjectSchema( type ) )
		;

		return this.getSchemaWith( schemas );
	}

	private getSchemaWith( objectSchemas:ObjectSchema.DigestedObjectSchema[] ):ObjectSchema.DigestedObjectSchema {
		const digestedSchema:ObjectSchema.DigestedObjectSchema =
			ObjectSchema.Digester.combineDigestedObjectSchemas( [
				this.context.getObjectSchema(),
				...objectSchemas,
			] );

		if( this.context.hasSetting( "vocabulary" ) )
			digestedSchema.vocab = this.context.resolve( this.context.getSetting( "vocabulary" ) );

		return digestedSchema;
	}


	private getRequestURI( uri:string ):string {
		if( RDF.URI.Util.isBNodeID( uri ) ) {
			throw new Errors.IllegalArgumentError( "BNodes cannot be fetched directly." );
		} else if( RDF.URI.Util.isPrefixed( uri ) ) {
			if( ! this.context ) throw new Errors.IllegalArgumentError( "This Documents instance doesn't support prefixed URIs." );
			uri = ObjectSchema.Digester.resolvePrefixedURI( uri, this.context.getObjectSchema() );
			if( RDF.URI.Util.isPrefixed( uri ) ) throw new Errors.IllegalArgumentError( `The prefixed URI "${ uri }" could not be resolved.` );
		} else if( RDF.URI.Util.isRelative( uri ) ) {
			if( ! this.context ) throw new Errors.IllegalArgumentError( "This Documents instance doesn't support relative URIs." );
			uri = this.context.resolve( uri );
		} else if( this.context && ! RDF.URI.Util.isBaseOf( this.context.baseURI, uri ) ) {
			throw new Errors.IllegalArgumentError( `"${ uri }" isn't a valid URI for this Carbon instance.` );
		}
		return uri;
	}

	private setDefaultRequestOptions( requestOptions:HTTP.Request.Options, interactionModel?:string ):HTTP.Request.Options {
		if( this.context && this.context.auth.isAuthenticated() ) this.context.auth.addAuthentication( requestOptions );
		if( interactionModel ) HTTP.Request.Util.setPreferredInteractionModel( interactionModel, requestOptions );

		HTTP.Request.Util.setAcceptHeader( "application/ld+json", requestOptions );

		return requestOptions;
	}

	private updateFromPreferenceApplied<T extends object>( persistedDocument:T & PersistedDocument.Class, rdfDocuments:RDF.Document.Class[], response:HTTP.Response.Class ):[ T, HTTP.Response.Class ] {
		let eTag:string = HTTP.Response.Util.getETag( response );
		if( eTag === null ) throw new HTTP.Errors.BadResponseError( "The response doesn't contain an ETag", response );

		let rdfDocument:RDF.Document.Class = this.getRDFDocument( persistedDocument.id, rdfDocuments, response );
		if( rdfDocument === null ) throw new HTTP.Errors.BadResponseError( "No document was returned.", response );

		persistedDocument = this._getPersistedDocument<T>( rdfDocument, response );
		persistedDocument._etag = eTag;

		return [ persistedDocument, response ];
	}

	private _parseMembers( pointers:(string | Pointer.Class)[] ):Pointer.Class[] {
		return pointers.map( pointer => {
			if( Utils.isString( pointer ) ) return this.getPointer( pointer );
			if( Pointer.Factory.is( pointer ) ) return pointer;

			throw new Errors.IllegalArgumentError( "No Carbon.Pointer or URI provided." );
		} );
	}

	private applyResponseData<T extends PersistedDocument.Class>( persistedProtectedDocument:T, response:HTTP.Response.Class ):[ T, HTTP.Response.Class ] | Promise<[ T, HTTP.Response.Class ]> {
		if( response.status === 204 || ! response.data ) return [ persistedProtectedDocument, response ];

		return new JSONLD.Parser.Class().parse( response.data ).then<[ T, HTTP.Response.Class ]>( ( expandedResult:object[] ) => {
			const freeNodes:RDF.Node.Class[] = RDF.Node.Util.getFreeNodes( expandedResult );
			this.applyNodeMap( freeNodes );

			let preferenceHeader:HTTP.Header.Class = response.getHeader( "Preference-Applied" );
			if( preferenceHeader === null || preferenceHeader.toString() !== "return=representation" ) return [ persistedProtectedDocument, response ];

			const rdfDocuments:RDF.Document.Class[] = RDF.Document.Util.getDocuments( expandedResult );
			return this.updateFromPreferenceApplied<T>( persistedProtectedDocument, rdfDocuments, response );
		} );
	}

	private applyNodeMap( freeNodes:RDF.Node.Class[] ):void {
		if( ! freeNodes.length ) return;
		const freeResources:FreeResources.Class = this._getFreeResources( freeNodes );
		const responseMetadata:LDP.ResponseMetadata.Class = <LDP.ResponseMetadata.Class> freeResources.getResources().find( LDP.ResponseMetadata.Factory.is );

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

	private sendRequest( method:HTTP.Method, uri:string, options:HTTP.Request.Options, body?:string | Blob | Buffer ):Promise<HTTP.Response.Class>;
	private sendRequest<T extends object>( method:HTTP.Method, uri:string, options:HTTP.Request.Options, body?:string | Blob | Buffer, parser?:HTTP.Parser.Class<T> ):Promise<[ T, HTTP.Response.Class ]>;
	private sendRequest( method:HTTP.Method, uri:string, options:HTTP.Request.Options, body?:string | Blob | Buffer, parser?:HTTP.Parser.Class<any> ):any {
		return HTTP.Request.Service.send( method, uri, body || null, options, parser )
			.catch( this._parseErrorResponse.bind( this ) );
	}
}

export default Class;
