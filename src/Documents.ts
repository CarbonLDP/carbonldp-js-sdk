import * as Errors from "./Errors";
import * as HTTP from "./HTTP";
import Context from "./Context";
import * as RDF from "./RDF";
import * as Utils from "./Utils";

import * as AccessPoint from "./AccessPoint";
import * as Auth from "./Auth";
import * as Document from "./Document";
import * as FreeResources from "./FreeResources";
import * as JSONLD from "./JSONLD";
import * as PersistedAccessPoint from "./PersistedAccessPoint";
import * as PersistedBlankNode from "./PersistedBlankNode";
import * as PersistedDocument from "./PersistedDocument";
import * as PersistedFragment from "./PersistedFragment";
import * as PersistedNamedFragment from "./PersistedNamedFragment";
import * as PersistedProtectedDocument from "./PersistedProtectedDocument";
import * as ProtectedDocument from "./ProtectedDocument";
import * as Pointer from "./Pointer";
import * as NS from "./NS";
import * as ObjectSchema from "./ObjectSchema";
import * as LDP from "./LDP";
import * as SPARQL from "./SPARQL";
import * as Resource from "./Resource";
import * as RetrievalPreferences from "./RetrievalPreferences";

import SparqlBuilder from "./SPARQL/Builder";
import { QueryClause } from "sparqler/Clauses";
import { promiseMethod } from "./Utils";

export interface DocumentDecorator {
	decorator:( object:Object, ...parameters:any[] ) => Object;
	parameters?:any[];
}

export class Class implements Pointer.Library, Pointer.Validator, ObjectSchema.Resolver {
	private static _documentSchema:ObjectSchema.DigestedObjectSchema = ObjectSchema.Digester.digestSchema( Document.SCHEMA );

	private _jsonldConverter:JSONLD.Converter.Class;
	get jsonldConverter():JSONLD.Converter.Class { return this._jsonldConverter; }

	private _documentDecorators:Map<string, DocumentDecorator>;
	get documentDecorators():Map<string, DocumentDecorator> { return this._documentDecorators; }

	private context:Context;
	private pointers:Map<string, Pointer.Class>;

	// Tracks the documents that are being resolved to avoid triggering repeated requests
	private documentsBeingResolved:Map<string, Promise<[ PersistedDocument.Class, HTTP.Response.Class ]>>;

	constructor( context:Context = null ) {
		this.context = context;

		this.pointers = new Map<string, Pointer.Class>();
		this.documentsBeingResolved = new Map<string, Promise<[ PersistedDocument.Class, HTTP.Response.Class ]>>();

		if( ! ! this.context && ! ! this.context.parentContext ) {
			let contextJSONLDConverter:JSONLD.Converter.Class = this.context.parentContext.documents.jsonldConverter;
			this._jsonldConverter = new JSONLD.Converter.Class( contextJSONLDConverter.literalSerializers );
		} else {
			this._jsonldConverter = new JSONLD.Converter.Class();
		}

		let decorators:Map<string, DocumentDecorator> = new Map();
		if( ! ! this.context && ! ! this.context.parentContext ) {
			let parentDecorators:Map<string, DocumentDecorator> = this.context.parentContext.documents.documentDecorators;
			if( parentDecorators ) decorators = this._documentDecorators = Utils.M.extend( decorators, parentDecorators );
		} else {
			decorators.set( ProtectedDocument.RDF_CLASS, { decorator: PersistedProtectedDocument.Factory.decorate } );
			decorators.set( Auth.ACL.RDF_CLASS, { decorator: Auth.PersistedACL.Factory.decorate } );
			decorators.set( Auth.User.RDF_CLASS, { decorator: Auth.PersistedUser.Factory.decorate, parameters: [ this ] } );
			decorators.set( Auth.Role.RDF_CLASS, { decorator: Auth.PersistedRole.Factory.decorate, parameters: [ this ] } );
			decorators.set( Auth.Credentials.RDF_CLASS, { decorator: Auth.PersistedCredentials.Factory.decorate, parameters: [ this ] } );
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

	removePointer( id:Pointer.Class ):boolean;
	removePointer( id:string ):boolean;
	removePointer( idOrPointer:string | Pointer.Class ):boolean {
		let id:string = Utils.isString( idOrPointer ) ? <string> idOrPointer : (<Pointer.Class> idOrPointer).id;
		let localID:string = this.getPointerID( id );

		if( localID === null ) {
			if( ! ! this.context && ! ! this.context.parentContext ) return this.context.parentContext.documents.removePointer( id );
			return false;
		}

		return this.pointers.delete( localID );
	}

	get<T>( uri:string, requestOptions:HTTP.Request.Options = {} ):Promise<[ T & PersistedDocument.Class, HTTP.Response.Class ]> {
		return promiseMethod( () => {
			const pointerID:string = this.getPointerID( uri );

			uri = this.getRequestURI( uri );
			this.setDefaultRequestOptions( requestOptions, NS.LDP.Class.RDFSource );

			if( this.hasPointer( uri ) ) {
				let pointer:Pointer.Class = this.getPointer( uri );
				if( pointer.isResolved() ) {
					return Promise.resolve<[ T & PersistedDocument.Class, HTTP.Response.Class ]>( [ <any> pointer, null ] );
				}
			}

			if( this.documentsBeingResolved.has( pointerID ) ) return this.documentsBeingResolved.get( pointerID ) as Promise<[ T & PersistedDocument.Class, HTTP.Response.Class ]>;

			const promise:Promise<[ T & PersistedDocument.Class, HTTP.Response.Class ]> = HTTP.Request.Service.get( uri, requestOptions, new RDF.Document.Parser() ).then<[ T & PersistedDocument.Class, HTTP.Response.Class ]>( ( [ rdfDocuments, response ]:[ RDF.Document.Class[], HTTP.Response.Class ] ) => {
				let eTag:string = HTTP.Response.Util.getETag( response );
				if( eTag === null ) throw new HTTP.Errors.BadResponseError( "The response doesn't contain an ETag", response );

				let locationHeader:HTTP.Header.Class = response.getHeader( "Content-Location" );
				if( ! ! locationHeader ) {
					if( locationHeader.values.length !== 1 ) throw new HTTP.Errors.BadResponseError( "The response contains more than one Content-Location header.", response );

					uri = locationHeader.toString();
					if( ! uri ) throw new HTTP.Errors.BadResponseError( `The response doesn't contain a valid 'Content-Location' header.`, response );
				}

				let rdfDocument:RDF.Document.Class = this.getRDFDocument( uri, rdfDocuments, response );
				if( rdfDocument === null ) throw new HTTP.Errors.BadResponseError( "No document was returned.", response );

				let document:T & PersistedDocument.Class = this._getPersistedDocument<T>( rdfDocument, response );
				document._etag = eTag;

				this.documentsBeingResolved.delete( pointerID );
				return [ document, response ];
			} ).catch( error => {
				this.documentsBeingResolved.delete( pointerID );
				return Promise.reject( error );
			} );

			this.documentsBeingResolved.set( pointerID, promise );
			return promise;
		} );
	}

	exists( documentURI:string, requestOptions:HTTP.Request.Options = {} ):Promise<[ boolean, HTTP.Response.Class ]> {
		return promiseMethod( () => {
			documentURI = this.getRequestURI( documentURI );
			this.setDefaultRequestOptions( requestOptions, NS.LDP.Class.RDFSource );

			return HTTP.Request.Service.head( documentURI, requestOptions );
		} ).then<[ boolean, HTTP.Response.Class ]>( ( response:HTTP.Response.Class ) => {
			return [ true, response ];
		} ).catch<[ boolean, HTTP.Response.Class ]>( ( error:HTTP.Errors.Error ) => {
			if( error.statusCode === 404 ) return [ false, error.response ];
			return Promise.reject( error );
		} );
	}

	createChild<T>( parentURI:string, childObject:T, slug?:string, requestOptions?:HTTP.Request.Options ):Promise<[ T & PersistedProtectedDocument.Class, HTTP.Response.Class ]>;
	createChild<T>( parentURI:string, childObject:T, requestOptions?:HTTP.Request.Options ):Promise<[ T & PersistedProtectedDocument.Class, HTTP.Response.Class ]>;
	createChild<T>( parentURI:string, childObject:T, slugOrRequestOptions?:any, requestOptions:HTTP.Request.Options = {} ):Promise<[ T & PersistedProtectedDocument.Class, HTTP.Response.Class ]> {
		let slug:string = Utils.isString( slugOrRequestOptions ) ? slugOrRequestOptions : null;
		requestOptions = ! Utils.isString( slugOrRequestOptions ) && ! ! slugOrRequestOptions ? slugOrRequestOptions : requestOptions;

		return promiseMethod( () => {
			if( PersistedDocument.Factory.is( childObject ) ) return Promise.reject( new Errors.IllegalArgumentError( "The child provided has been already persisted." ) );
			let childDocument:T & Document.Class = Document.Factory.is( childObject ) ? <T & Document.Class> childObject : Document.Factory.createFrom<T>( childObject );

			this.setDefaultRequestOptions( requestOptions, NS.LDP.Class.Container );
			return this.persistDocument<T & Document.Class, PersistedProtectedDocument.Class>( parentURI, slug, childDocument, requestOptions );
		} );
	}

	createChildren<T>( parentURI:string, childrenObjects:T[], slugs?:string[], requestOptions?:HTTP.Request.Options ):Promise<[ (T & PersistedProtectedDocument.Class)[], HTTP.Response.Class[] ]>;
	createChildren<T>( parentURI:string, childrenObjects:T[], requestOptions?:HTTP.Request.Options ):Promise<[ (T & PersistedProtectedDocument.Class)[], HTTP.Response.Class[] ]>;
	createChildren<T>( parentURI:string, childrenObjects:T[], slugsOrRequestOptions?:any, requestOptions:HTTP.Request.Options = {} ):Promise<[ (T & PersistedProtectedDocument.Class)[], HTTP.Response.Class[] ]> {
		let slugs:string[] = Utils.isArray( slugsOrRequestOptions ) ? slugsOrRequestOptions : null;
		requestOptions = ! Utils.isArray( slugsOrRequestOptions ) && ! ! slugsOrRequestOptions ? slugsOrRequestOptions : requestOptions;

		return Promise.all<[ T & PersistedProtectedDocument.Class, HTTP.Response.Class ]>( childrenObjects.map( ( childObject:T, index:number ) => {
			let slug:string = (slugs !== null && index < slugs.length && ! ! slugs[ index ]) ? slugs[ index ] : null;

			let options:HTTP.Request.Options = Object.assign( {}, requestOptions );
			if( requestOptions.headers ) options.headers = Utils.M.extend( new Map(), requestOptions.headers );
			return this.createChild<T>( parentURI, childObject, slug, options );

		} ) ).then<[ (T & PersistedProtectedDocument.Class)[], HTTP.Response.Class[] ]>( ( requestResponses:[ T & PersistedProtectedDocument.Class, HTTP.Response.Class ][] ) => {
			let persistedDocuments:(T & PersistedProtectedDocument.Class)[] = requestResponses.map( response => response[ 0 ] );
			let responses:HTTP.Response.Class[] = requestResponses.map( response => response[ 1 ] );

			return [ persistedDocuments, responses ];
		} );
	}

	createChildAndRetrieve<T>( parentURI:string, childObject:T, slug?:string, requestOptions?:HTTP.Request.Options ):Promise<[ T & PersistedProtectedDocument.Class, HTTP.Response.Class[] ]>;
	createChildAndRetrieve<T>( parentURI:string, childObject:T, requestOptions?:HTTP.Request.Options ):Promise<[ T & PersistedProtectedDocument.Class, HTTP.Response.Class[] ]>;
	createChildAndRetrieve<T>( parentURI:string, childObject:T, slugOrRequestOptions?:any, requestOptions:HTTP.Request.Options = {} ):Promise<[ T & PersistedProtectedDocument.Class, HTTP.Response.Class[] ]> {
		let responses:HTTP.Response.Class[] = [];

		let options:HTTP.Request.Options = HTTP.Request.Util.isOptions( slugOrRequestOptions ) ? slugOrRequestOptions : requestOptions;
		HTTP.Request.Util.setPreferredRetrievalResource( "Created", options );

		return this.createChild( parentURI, childObject, slugOrRequestOptions, requestOptions ).then<[ T & PersistedProtectedDocument.Class, HTTP.Response.Class ]>( ( [ document, createResponse ]:[ T & PersistedProtectedDocument.Class, HTTP.Response.Class ] ) => {
			responses.push( createResponse );
			if( document.isResolved() ) return [ document, null ];

			return this.get<T & PersistedProtectedDocument.Class>( document.id );
		} ).then<[ T & PersistedProtectedDocument.Class, HTTP.Response.Class[] ]>( ( [ persistedDocument, resolveResponse ]:[ T & PersistedProtectedDocument.Class, HTTP.Response.Class ] ) => {
			if( ! ! resolveResponse ) responses.push( resolveResponse );

			return [ persistedDocument, responses ];
		} );
	}

	createChildrenAndRetrieve<T>( parentURI:string, childrenObjects:T[], slugs?:string[], requestOptions?:HTTP.Request.Options ):Promise<[ (T & PersistedProtectedDocument.Class)[], HTTP.Response.Class[][] ]>;
	createChildrenAndRetrieve<T>( parentURI:string, childrenObjects:T[], requestOptions?:HTTP.Request.Options ):Promise<[ (T & PersistedProtectedDocument.Class)[], HTTP.Response.Class[][] ]>;
	createChildrenAndRetrieve<T>( parentURI:string, childrenObjects:T[], slugsOrRequestOptions?:any, requestOptions:HTTP.Request.Options = {} ):Promise<[ (T & PersistedProtectedDocument.Class)[], HTTP.Response.Class[][] ]> {
		let responses:HTTP.Response.Class[][] = [];

		let options:HTTP.Request.Options = HTTP.Request.Util.isOptions( slugsOrRequestOptions ) ? slugsOrRequestOptions : requestOptions;
		HTTP.Request.Util.setPreferredRetrievalResource( "Created", options );

		return this.createChildren( parentURI, childrenObjects, slugsOrRequestOptions, requestOptions ).then<[ (T & PersistedProtectedDocument.Class)[], HTTP.Response.Class[] ]>( ( [ documents, creationResponses ]:[ (T & PersistedProtectedDocument.Class)[], HTTP.Response.Class[] ] ) => {
			responses.push( creationResponses );
			if( documents.every( document => document.isResolved() ) ) return [ documents, null ];

			return Pointer.Util.resolveAll<T & PersistedProtectedDocument.Class>( documents );
		} ).then<[ (T & PersistedProtectedDocument.Class)[], HTTP.Response.Class[][] ]>( ( [ persistedDocuments, resolveResponses ]:[ (T & PersistedProtectedDocument.Class)[], HTTP.Response.Class[] ] ) => {
			if( ! ! resolveResponses ) responses.push( resolveResponses );

			return [ persistedDocuments, responses ];
		} );
	}

	listChildren( parentURI:string, requestOptions:HTTP.Request.Options = {} ):Promise<[ PersistedDocument.Class[], HTTP.Response.Class ]> {
		return promiseMethod( () => {
			parentURI = this.getRequestURI( parentURI );
			this.setDefaultRequestOptions( requestOptions, NS.LDP.Class.Container );

			let containerRetrievalPreferences:HTTP.Request.ContainerRetrievalPreferences = {
				include: [
					NS.LDP.Class.PreferContainment,
				],
				omit: [
					NS.LDP.Class.PreferMembership,
					NS.LDP.Class.PreferMinimalContainer,
					NS.C.Class.PreferContainmentResources,
					NS.C.Class.PreferMembershipResources,
				],
			};
			HTTP.Request.Util.setContainerRetrievalPreferences( containerRetrievalPreferences, requestOptions );

			return HTTP.Request.Service.get( parentURI, requestOptions, new RDF.Document.Parser() );
		} ).then<[ PersistedDocument.Class[], HTTP.Response.Class ]>( ( [ rdfDocuments, response ]:[ RDF.Document.Class[], HTTP.Response.Class ] ) => {
			let rdfDocument:RDF.Document.Class = this.getRDFDocument( parentURI, rdfDocuments, response );
			if( rdfDocument === null ) return [ [], response ];

			let documentResource:RDF.Node.Class = this.getDocumentResource( rdfDocument, response );
			let childPointers:Pointer.Class[] = RDF.Node.Util.getPropertyPointers( documentResource, NS.LDP.Predicate.contains, this );
			let persistedChildPointers:PersistedDocument.Class[] = childPointers.map( pointer => PersistedDocument.Factory.decorate( pointer, this ) );

			return [ persistedChildPointers, response ];
		} );
	}

	getChildren<T>( parentURI:string, retrievalPreferences?:RetrievalPreferences.Class, requestOptions?:HTTP.Request.Options ):Promise<[ (T & PersistedDocument.Class)[], HTTP.Response.Class ]>;
	getChildren<T>( parentURI:string, requestOptions?:HTTP.Request.Options ):Promise<[ (T & PersistedDocument.Class)[], HTTP.Response.Class ]>;
	getChildren<T>( parentURI:string, retPrefReqOpt?:any, requestOptions?:HTTP.Request.Options ):Promise<[ (T & PersistedDocument.Class)[], HTTP.Response.Class ]> {
		let retrievalPreferences:RetrievalPreferences.Class = RetrievalPreferences.Factory.is( retPrefReqOpt ) ? retPrefReqOpt : null;
		requestOptions = HTTP.Request.Util.isOptions( retPrefReqOpt ) ? retPrefReqOpt : ( HTTP.Request.Util.isOptions( requestOptions ) ? requestOptions : {} );

		let containerURI:string;
		return promiseMethod( () => {
			parentURI = this.getRequestURI( parentURI );
			this.setDefaultRequestOptions( requestOptions, NS.LDP.Class.Container );

			containerURI = parentURI;
			if( ! ! retrievalPreferences ) parentURI += RetrievalPreferences.Util.stringifyRetrievalPreferences( retrievalPreferences, this.getGeneralSchema() );

			let containerRetrievalPreferences:HTTP.Request.ContainerRetrievalPreferences = {
				include: [
					NS.LDP.Class.PreferContainment,
					NS.C.Class.PreferContainmentResources,
				],
				omit: [
					NS.LDP.Class.PreferMembership,
					NS.LDP.Class.PreferMinimalContainer,
					NS.C.Class.PreferMembershipResources,
				],
			};
			HTTP.Request.Util.setContainerRetrievalPreferences( containerRetrievalPreferences, requestOptions );

			return HTTP.Request.Service.get( parentURI, requestOptions, new JSONLD.Parser.Class() );
		} ).then<[ (T & PersistedDocument.Class)[], HTTP.Response.Class ]>( ( [ expandedResult, response ]:[ any, HTTP.Response.Class ] ) => {
			let freeNodes:RDF.Node.Class[] = RDF.Node.Util.getFreeNodes( expandedResult );
			let rdfDocuments:RDF.Document.Class[] = RDF.Document.Util.getDocuments( expandedResult ).filter( document => document[ "@id" ] !== containerURI );

			let resources:(T & PersistedDocument.Class)[] = <any> this.getPersistedMetadataResources( freeNodes, rdfDocuments, response );
			return [ resources, response ];
		} );
	}

	createAccessPoint<T>( documentURI:string, accessPoint:T & AccessPoint.Class, slug?:string, requestOptions?:HTTP.Request.Options ):Promise<[ T & PersistedAccessPoint.Class, HTTP.Response.Class ]>;
	createAccessPoint<T>( documentURI:string, accessPoint:T & AccessPoint.Class, requestOptions?:HTTP.Request.Options ):Promise<[ T & PersistedAccessPoint.Class, HTTP.Response.Class ]>;
	createAccessPoint<T>( documentURI:string, accessPoint:T & AccessPoint.Class, slugOrRequestOptions:any, requestOptions:HTTP.Request.Options = {} ):Promise<[ T & PersistedAccessPoint.Class, HTTP.Response.Class ]> {
		if( this.context ) documentURI = this.context.resolve( documentURI );
		const slug:string = Utils.isString( slugOrRequestOptions ) ? slugOrRequestOptions : null;
		requestOptions = ! Utils.isString( slugOrRequestOptions ) && ! ! slugOrRequestOptions ? slugOrRequestOptions : requestOptions;

		return promiseMethod( () => {
			if( PersistedDocument.Factory.is( accessPoint ) ) return Promise.reject( new Errors.IllegalArgumentError( "The accessPoint provided has been already persisted." ) );
			let accessPointDocument:T & AccessPoint.DocumentClass = AccessPoint.Factory.is( accessPoint ) ? <any> accessPoint
				: AccessPoint.Factory.createFrom<T>( accessPoint, this.getPointer( documentURI ), accessPoint.hasMemberRelation, accessPoint.isMemberOfRelation );
			if( accessPointDocument.membershipResource.id !== documentURI ) return Promise.reject( new Errors.IllegalArgumentError( "The documentURI must be the same as the accessPoint's membershipResource" ) );


			this.setDefaultRequestOptions( requestOptions, NS.LDP.Class.RDFSource );
			return this.persistDocument<T & AccessPoint.DocumentClass, PersistedAccessPoint.Class>( documentURI, slug, accessPointDocument, requestOptions );
		} );
	}


	createAccessPoints<T>( documentURI:string, accessPoints:(T & AccessPoint.Class)[], slugs?:string[], requestOptions?:HTTP.Request.Options ):Promise<[ (T & PersistedAccessPoint.Class)[], HTTP.Response.Class[] ]>;
	createAccessPoints<T>( documentURI:string, accessPoints:(T & AccessPoint.Class)[], requestOptions?:HTTP.Request.Options ):Promise<[ (T & PersistedAccessPoint.Class)[], HTTP.Response.Class[] ]>;
	createAccessPoints<T>( documentURI:string, accessPoints:(T & AccessPoint.Class)[], slugsOrRequestOptions:any, requestOptions:HTTP.Request.Options = {} ):Promise<[ (T & PersistedAccessPoint.Class)[], HTTP.Response.Class[] ]> {
		let slugs:string[] = Utils.isArray( slugsOrRequestOptions ) ? slugsOrRequestOptions : null;
		requestOptions = ! Utils.isArray( slugsOrRequestOptions ) && ! ! slugsOrRequestOptions ? slugsOrRequestOptions : requestOptions;

		return Promise.all<[ T & PersistedAccessPoint.Class, HTTP.Response.Class ]>( accessPoints.map( ( accessPoint:T & AccessPoint.Class, index:number ) => {
			let slug:string = (slugs !== null && index < slugs.length && ! ! slugs[ index ]) ? slugs[ index ] : null;

			let options:HTTP.Request.Options = Object.assign( {}, requestOptions );
			if( requestOptions.headers ) options.headers = Utils.M.extend( new Map(), requestOptions.headers );
			return this.createAccessPoint<T>( documentURI, accessPoint, slug, options );

		} ) ).then<[ (T & PersistedAccessPoint.Class)[], HTTP.Response.Class[] ]>( ( requestResponses:[ T & PersistedAccessPoint.Class, HTTP.Response.Class ][] ) => {
			let persistedAccessPoints:(T & PersistedAccessPoint.Class)[] = requestResponses.map( response => response[ 0 ] );
			let responses:HTTP.Response.Class[] = requestResponses.map( response => response[ 1 ] );

			return [ persistedAccessPoints, responses ];
		} );
	}

	upload( parentURI:string, data:Buffer, slug?:string, requestOptions?:HTTP.Request.Options ):Promise<[ Pointer.Class, HTTP.Response.Class ]>;
	upload( parentURI:string, data:Buffer, requestOptions?:HTTP.Request.Options ):Promise<[ Pointer.Class, HTTP.Response.Class ]>;
	upload( parentURI:string, data:Blob, slug?:string, requestOptions?:HTTP.Request.Options ):Promise<[ Pointer.Class, HTTP.Response.Class ]>;
	upload( parentURI:string, data:Blob, requestOptions?:HTTP.Request.Options ):Promise<[ Pointer.Class, HTTP.Response.Class ]>;
	upload( parentURI:string, data:Blob | Buffer, slugOrRequestOptions?:any, requestOptions:HTTP.Request.Options = {} ):Promise<[ Pointer.Class, HTTP.Response.Class ]> {
		let slug:string = Utils.isString( slugOrRequestOptions ) ? slugOrRequestOptions : null;
		requestOptions = ! Utils.isString( slugOrRequestOptions ) && ! ! slugOrRequestOptions ? slugOrRequestOptions : requestOptions;

		if( typeof Blob !== "undefined" ) {
			if( ! ( data instanceof Blob ) ) return Promise.reject( new Errors.IllegalArgumentError( "The data is not a valid Blob object." ) );
			HTTP.Request.Util.setContentTypeHeader( (<Blob> data).type, requestOptions );

		} else {
			if( ! ( data instanceof Buffer ) ) return Promise.reject( new Errors.IllegalArgumentError( "The data is not a valid Buffer object." ) );
			const fileType:( buffer:Buffer ) => { ext:string, mime:string } = require( "file-type" );

			let bufferType:{ ext:string, mime:string } = fileType( <Buffer> data );
			HTTP.Request.Util.setContentTypeHeader( bufferType ? bufferType.mime : "application/octet-stream", requestOptions );
		}

		return promiseMethod( () => {
			parentURI = this.getRequestURI( parentURI );
			this.setDefaultRequestOptions( requestOptions, NS.LDP.Class.Container );

			if( ! ! slug ) HTTP.Request.Util.setSlug( slug, requestOptions );

			return HTTP.Request.Service.post( parentURI, <any> data, requestOptions );
		} ).then<[ Pointer.Class, HTTP.Response.Class ]>( ( response:HTTP.Response.Class ) => {
			let locationHeader:HTTP.Header.Class = response.getHeader( "Location" );
			if( locationHeader === null || locationHeader.values.length < 1 ) throw new HTTP.Errors.BadResponseError( "The response is missing a Location header.", response );
			if( locationHeader.values.length !== 1 ) throw new HTTP.Errors.BadResponseError( "The response contains more than one Location header.", response );

			let locationURI:string = locationHeader.values[ 0 ].toString();

			let pointer:Pointer.Class = this.getPointer( locationURI );

			return [ pointer, response ];
		} );
	}

	listMembers( uri:string, includeNonReadable?:boolean, requestOptions?:HTTP.Request.Options ):Promise<[ PersistedDocument.Class[], HTTP.Response.Class ]>;
	listMembers( uri:string, requestOptions?:HTTP.Request.Options ):Promise<[ PersistedDocument.Class[], HTTP.Response.Class ]>;
	listMembers( uri:string, nonReadReqOpt?:any, reqOpt?:HTTP.Request.Options ):Promise<[ PersistedDocument.Class[], HTTP.Response.Class ]> {
		let includeNonReadable:boolean = Utils.isBoolean( nonReadReqOpt ) ? nonReadReqOpt : true;
		let requestOptions:HTTP.Request.Options = HTTP.Request.Util.isOptions( nonReadReqOpt ) ? nonReadReqOpt : ( HTTP.Request.Util.isOptions( reqOpt ) ? reqOpt : {} );

		return promiseMethod( () => {
			uri = this.getRequestURI( uri );
			this.setDefaultRequestOptions( requestOptions, NS.LDP.Class.Container );

			let containerRetrievalPreferences:HTTP.Request.ContainerRetrievalPreferences = {
				include: [
					NS.LDP.Class.PreferMinimalContainer,
					NS.LDP.Class.PreferMembership,
				],
				omit: [
					NS.LDP.Class.PreferContainment,
					NS.C.Class.PreferContainmentResources,
					NS.C.Class.PreferMembershipResources,
				],
			};

			if( includeNonReadable ) {
				containerRetrievalPreferences.include.push( NS.C.Class.NonReadableMembershipResourceTriples );
			} else {
				containerRetrievalPreferences.omit.push( NS.C.Class.NonReadableMembershipResourceTriples );
			}
			HTTP.Request.Util.setContainerRetrievalPreferences( containerRetrievalPreferences, requestOptions );

			return HTTP.Request.Service.get( uri, requestOptions, new RDF.Document.Parser() );
		} ).then<[ PersistedDocument.Class[], HTTP.Response.Class ]>( ( [ rdfDocuments, response ]:[ RDF.Document.Class[], HTTP.Response.Class ] ) => {
			let rdfDocument:RDF.Document.Class = this.getRDFDocument( uri, rdfDocuments, response );
			if( rdfDocument === null ) throw new HTTP.Errors.BadResponseError( "No document was returned.", response );

			let documentResource:RDF.Node.Class = this.getDocumentResource( rdfDocument, response );
			let membershipResource:RDF.Node.Class = this.getMembershipResource( documentResource, rdfDocuments, response );
			if( membershipResource === null ) return [ [], response ];

			let hasMemberRelation:string = RDF.Node.Util.getPropertyURI( documentResource, NS.LDP.Predicate.hasMemberRelation );

			let memberPointers:Pointer.Class[] = RDF.Node.Util.getPropertyPointers( membershipResource, hasMemberRelation, this );
			let persistedMemberPointers:PersistedDocument.Class[] = memberPointers.map( pointer => PersistedDocument.Factory.decorate( pointer, this ) );

			return [ persistedMemberPointers, response ];
		} );
	}

	getMembers<T>( uri:string, includeNonReadable?:boolean, retrievalPreferences?:RetrievalPreferences.Class, requestOptions?:HTTP.Request.Options ):Promise<[ (T & PersistedDocument.Class)[], HTTP.Response.Class ]>;
	getMembers<T>( uri:string, includeNonReadable?:boolean, requestOptions?:HTTP.Request.Options ):Promise<[ (T & PersistedDocument.Class)[], HTTP.Response.Class ]>;
	getMembers<T>( uri:string, retrievalPreferences?:RetrievalPreferences.Class, requestOptions?:HTTP.Request.Options ):Promise<[ (T & PersistedDocument.Class)[], HTTP.Response.Class ]>;
	getMembers<T>( uri:string, requestOptions?:HTTP.Request.Options ):Promise<[ (T & PersistedDocument.Class)[], HTTP.Response.Class ]>;
	getMembers<T>( uri:string, nonReadRetPrefReqOpt?:any, retPrefReqOpt?:any, requestOptions?:HTTP.Request.Options ):Promise<[ (T & PersistedDocument.Class)[], HTTP.Response.Class ]> {
		let includeNonReadable:boolean = Utils.isBoolean( nonReadRetPrefReqOpt ) ? nonReadRetPrefReqOpt : true;
		let retrievalPreferences:RetrievalPreferences.Class = RetrievalPreferences.Factory.is( nonReadRetPrefReqOpt ) ? nonReadRetPrefReqOpt : ( RetrievalPreferences.Factory.is( retPrefReqOpt ) ? retPrefReqOpt : null );
		requestOptions = HTTP.Request.Util.isOptions( nonReadRetPrefReqOpt ) ? nonReadRetPrefReqOpt : ( HTTP.Request.Util.isOptions( retPrefReqOpt ) ? retPrefReqOpt : ( HTTP.Request.Util.isOptions( requestOptions ) ? requestOptions : {} ) );

		let containerURI:string;
		return promiseMethod( () => {
			uri = this.getRequestURI( uri );
			this.setDefaultRequestOptions( requestOptions, NS.LDP.Class.Container );

			containerURI = uri;
			if( ! ! retrievalPreferences ) uri += RetrievalPreferences.Util.stringifyRetrievalPreferences( retrievalPreferences, this.getGeneralSchema() );

			let containerRetrievalPreferences:HTTP.Request.ContainerRetrievalPreferences = {
				include: [
					NS.LDP.Class.PreferMinimalContainer,
					NS.LDP.Class.PreferMembership,
					NS.C.Class.PreferMembershipResources,
				],
				omit: [
					NS.LDP.Class.PreferContainment,
					NS.C.Class.PreferContainmentResources,
				],
			};

			if( includeNonReadable ) {
				containerRetrievalPreferences.include.push( NS.C.Class.NonReadableMembershipResourceTriples );
			} else {
				containerRetrievalPreferences.omit.push( NS.C.Class.NonReadableMembershipResourceTriples );
			}
			HTTP.Request.Util.setContainerRetrievalPreferences( containerRetrievalPreferences, requestOptions );

			return HTTP.Request.Service.get( uri, requestOptions, new JSONLD.Parser.Class() );
		} ).then<[ (T & PersistedDocument.Class)[], HTTP.Response.Class ]>( ( [ expandedResult, response ]:[ any, HTTP.Response.Class ] ) => {
			let freeNodes:RDF.Node.Class[] = RDF.Node.Util.getFreeNodes( expandedResult );
			let rdfDocuments:RDF.Document.Class[] = RDF.Document.Util.getDocuments( expandedResult );

			let rdfDocument:RDF.Document.Class = this.getRDFDocument( containerURI, rdfDocuments, response );
			if( rdfDocument === null ) throw new HTTP.Errors.BadResponseError( "No document was returned.", response );

			let containerResource:RDF.Node.Class = this.getDocumentResource( rdfDocument, response );
			let membershipResource:RDF.Node.Class = this.getMembershipResource( containerResource, rdfDocuments, response );
			if( membershipResource === null ) return [ [], response ];

			rdfDocuments = (<any[]> rdfDocuments).filter( ( targetRDFDocument:RDF.Node.Class ) => {
				return ! RDF.Node.Util.areEqual( targetRDFDocument, containerResource )
					&& ! RDF.Node.Util.areEqual( targetRDFDocument, membershipResource )
					;
			} );

			let resources:( T & PersistedDocument.Class)[] = this.getPersistedMetadataResources( freeNodes, rdfDocuments, response );
			return [ resources, response ];
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

			let document:Document.Class = LDP.AddMemberAction.Factory.createDocument( pointers );

			let body:string = document.toJSON( this, this.jsonldConverter );

			return HTTP.Request.Service.put( documentURI, body, requestOptions );
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

			let document:Document.Class = LDP.RemoveMemberAction.Factory.createDocument( pointers );
			let containerRetrievalPreferences:HTTP.Request.ContainerRetrievalPreferences = {
				include: [ NS.C.Class.PreferSelectedMembershipTriples ],
				omit: [ NS.C.Class.PreferMembershipTriples ],
			};
			HTTP.Request.Util.setContainerRetrievalPreferences( containerRetrievalPreferences, requestOptions, false );

			let body:string = document.toJSON( this, this.jsonldConverter );

			return HTTP.Request.Service.delete( documentURI, body, requestOptions );
		} );
	}

	removeAllMembers( documentURI:string, requestOptions:HTTP.Request.Options = {} ):Promise<HTTP.Response.Class> {
		return promiseMethod( () => {
			documentURI = this.getRequestURI( documentURI );
			this.setDefaultRequestOptions( requestOptions, NS.LDP.Class.Container );

			let containerRetrievalPreferences:HTTP.Request.ContainerRetrievalPreferences = {
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
			HTTP.Request.Util.setContainerRetrievalPreferences( containerRetrievalPreferences, requestOptions, false );

			return HTTP.Request.Service.delete( documentURI, requestOptions );
		} );
	}

	save<T>( persistedDocument:T & PersistedDocument.Class, requestOptions:HTTP.Request.Options = {} ):Promise<[ T & PersistedDocument.Class, HTTP.Response.Class ]> {
		return promiseMethod( () => {

			// TODO: Check if the document isDirty
			/*
			if( ! persistedDocument.isDirty() ) return new Promise<HTTP.Response.Class>( ( resolve:( result:HTTP.Response.Class ) => void ) => {
				resolve( null );
			});
			*/
			const uri:string = this.getRequestURI( persistedDocument.id );
			this.setDefaultRequestOptions( requestOptions, NS.LDP.Class.RDFSource );
			HTTP.Request.Util.setContentTypeHeader( "application/ld+json", requestOptions );
			HTTP.Request.Util.setIfMatchHeader( persistedDocument._etag, requestOptions );

			persistedDocument._normalize();
			const body:string = persistedDocument.toJSON( this, this.jsonldConverter );

			return HTTP.Request.Service.put( uri, body, requestOptions );
		} ).then<[ T & PersistedDocument.Class, HTTP.Response.Class ]>( ( response:HTTP.Response.Class ) => {
			return [ persistedDocument, response ];
		} );
	}

	refresh<T>( persistedDocument:T & PersistedDocument.Class, requestOptions:HTTP.Request.Options = {} ):Promise<[ T & PersistedDocument.Class, HTTP.Response.Class ]> {
		let uri:string;
		return promiseMethod( () => {
			uri = this.getRequestURI( persistedDocument.id );
			this.setDefaultRequestOptions( requestOptions, NS.LDP.Class.RDFSource );

			// Add header to check id the document has been modified
			HTTP.Request.Util.setIfNoneMatchHeader( persistedDocument._etag, requestOptions );

			return HTTP.Request.Service.get( uri, requestOptions, new RDF.Document.Parser() );
		} ).then<[ T & PersistedDocument.Class, HTTP.Response.Class ]>( ( [ rdfDocuments, response ]:[ RDF.Document.Class[], HTTP.Response.Class ] ) => {
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

	saveAndRefresh<T>( persistedDocument:T & PersistedDocument.Class, requestOptions:HTTP.Request.Options = {} ):Promise<[ T & PersistedDocument.Class, HTTP.Response.Class[] ]> {
		let responses:HTTP.Response.Class[] = [];
		HTTP.Request.Util.setPreferredRetrievalResource( "Modified", requestOptions );

		return this.save<T>( persistedDocument, requestOptions ).then( ( [ document, saveResponse ]:[ T & PersistedDocument.Class, HTTP.Response.Class ] ) => {
			let preferenceHeader:HTTP.Header.Class = saveResponse.getHeader( "Preference-Applied" );
			if( preferenceHeader !== null && preferenceHeader.toString() === "return=representation" )
				return this.updateFromPreferenceApplied<T & PersistedDocument.Class>( persistedDocument, saveResponse );

			responses.push( saveResponse );
			return persistedDocument.refresh<T>();
		} ).then<[ T & PersistedDocument.Class, HTTP.Response.Class[] ]>( ( [ document, refreshResponse ]:[ T & PersistedDocument.Class, HTTP.Response.Class ] ) => {
			responses.push( refreshResponse );
			return [ persistedDocument, responses ];
		} );
	}


	delete( documentURI:string, requestOptions:HTTP.Request.Options = {} ):Promise<HTTP.Response.Class> {
		return promiseMethod( () => {
			documentURI = this.getRequestURI( documentURI );
			this.setDefaultRequestOptions( requestOptions, NS.LDP.Class.RDFSource );

			return HTTP.Request.Service.delete( documentURI, requestOptions );
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
		return ( "@id" in object ) ?
			this.getDigestedObjectSchemaForExpandedObject( object ) :
			this.getDigestedObjectSchemaForDocument( <any> object );
	}

	executeRawASKQuery( documentURI:string, askQuery:string, requestOptions:HTTP.Request.Options = {} ):Promise<[ SPARQL.RawResults.Class, HTTP.Response.Class ]> {
		return promiseMethod( () => {
			documentURI = this.getRequestURI( documentURI );

			if( this.context && this.context.auth.isAuthenticated() ) this.context.auth.addAuthentication( requestOptions );

			return SPARQL.Service.executeRawASKQuery( documentURI, askQuery, requestOptions );
		} );
	}

	executeASKQuery( documentURI:string, askQuery:string, requestOptions:HTTP.Request.Options = {} ):Promise<[ boolean, HTTP.Response.Class ]> {
		return promiseMethod( () => {
			documentURI = this.getRequestURI( documentURI );

			if( this.context && this.context.auth.isAuthenticated() ) this.context.auth.addAuthentication( requestOptions );

			return SPARQL.Service.executeASKQuery( documentURI, askQuery, requestOptions );
		} );
	}

	executeRawSELECTQuery( documentURI:string, selectQuery:string, requestOptions:HTTP.Request.Options = {} ):Promise<[ SPARQL.RawResults.Class, HTTP.Response.Class ]> {
		return promiseMethod( () => {
			documentURI = this.getRequestURI( documentURI );

			if( this.context && this.context.auth.isAuthenticated() ) this.context.auth.addAuthentication( requestOptions );

			return SPARQL.Service.executeRawSELECTQuery( documentURI, selectQuery, requestOptions );
		} );
	}

	executeSELECTQuery<T>( documentURI:string, selectQuery:string, requestOptions:HTTP.Request.Options = {} ):Promise<[ SPARQL.SELECTResults.Class<T>, HTTP.Response.Class ]> {
		return promiseMethod( () => {
			documentURI = this.getRequestURI( documentURI );

			if( this.context && this.context.auth.isAuthenticated() ) this.context.auth.addAuthentication( requestOptions );

			return SPARQL.Service.executeSELECTQuery<T>( documentURI, selectQuery, this, requestOptions );
		} );
	}

	executeRawCONSTRUCTQuery( documentURI:string, constructQuery:string, requestOptions:HTTP.Request.Options = {} ):Promise<[ string, HTTP.Response.Class ]> {
		return promiseMethod( () => {
			documentURI = this.getRequestURI( documentURI );

			if( this.context && this.context.auth.isAuthenticated() ) this.context.auth.addAuthentication( requestOptions );

			return SPARQL.Service.executeRawCONSTRUCTQuery( documentURI, constructQuery, requestOptions );
		} );
	}

	executeRawDESCRIBEQuery( documentURI:string, describeQuery:string, requestOptions:HTTP.Request.Options = {} ):Promise<[ string, HTTP.Response.Class ]> {
		return promiseMethod( () => {
			documentURI = this.getRequestURI( documentURI );

			if( this.context && this.context.auth.isAuthenticated() ) this.context.auth.addAuthentication( requestOptions );

			return SPARQL.Service.executeRawDESCRIBEQuery( documentURI, describeQuery, requestOptions );
		} );
	}

	executeUPDATE( documentURI:string, update:string, requestOptions:HTTP.Request.Options = {} ):Promise<HTTP.Response.Class> {
		return promiseMethod( () => {
			documentURI = this.getRequestURI( documentURI );

			if( this.context && this.context.auth.isAuthenticated() ) this.context.auth.addAuthentication( requestOptions );

			return SPARQL.Service.executeUPDATE( documentURI, update, requestOptions );
		} );
	}

	sparql( documentURI:string ):QueryClause {
		let sparqlBuilder:SparqlBuilder = new SparqlBuilder();
		sparqlBuilder._documents = this;
		sparqlBuilder._entryPoint = documentURI;

		let builder:QueryClause = sparqlBuilder.base( documentURI );

		if( ! ! this.context ) {
			builder.base( this.context.baseURI );
			if( this.context.hasSetting( "vocabulary" ) ) builder.vocab( this.context.resolve( this.context.getSetting( "vocabulary" ) ) );

			let schema:ObjectSchema.DigestedObjectSchema = this.context.getObjectSchema();
			schema.prefixes.forEach( ( uri:RDF.URI.Class, prefix:string ) => {
				builder.prefix( prefix, uri.stringValue );
			} );
		}

		return builder;
	}

	_getPersistedDocument<T>( rdfDocument:RDF.Document.Class, response:HTTP.Response.Class ):T & PersistedDocument.Class {
		let documentResource:RDF.Node.Class = this.getDocumentResource( rdfDocument, response );
		let fragmentResources:RDF.Node.Class[] = RDF.Document.Util.getBNodeResources( rdfDocument );
		fragmentResources = fragmentResources.concat( RDF.Document.Util.getFragmentResources( rdfDocument ) );

		let uri:string = documentResource[ "@id" ];
		let documentPointer:Pointer.Class = this.getPointer( uri );

		let persistedDocument:T & PersistedDocument.Class;
		if( PersistedDocument.Factory.is( documentPointer ) ) {
			persistedDocument = this.updatePersistedDocument( <PersistedDocument.Class> documentPointer, documentResource, fragmentResources );
		} else {
			persistedDocument = this.createPersistedDocument( documentPointer, documentResource, fragmentResources );
		}

		persistedDocument._resolved = true;
		return persistedDocument;
	}

	_getFreeResources( nodes:RDF.Node.Class[] ):FreeResources.Class {
		let freeResourcesDocument:FreeResources.Class = FreeResources.Factory.create( this );

		let resources:Resource.Class[] = nodes.map( node => freeResourcesDocument.createResource( node[ "@id" ] ) );
		this.compact( nodes, resources, freeResourcesDocument );

		return freeResourcesDocument;
	}

	private persistDocument<T extends Document.Class, W extends PersistedProtectedDocument.Class>( parentURI:string, slug:string, document:T, requestOptions:HTTP.Request.Options ):Promise<[ T & W, HTTP.Response.Class ]> {
		parentURI = this.getRequestURI( parentURI );
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

		return HTTP.Request.Service.post( parentURI, body, requestOptions ).then( ( response:HTTP.Response.Class ):Promise<[ T & W, HTTP.Response.Class ]> | [ T & W, HTTP.Response.Class ] => {
			delete document[ "__CarbonSDK_InProgressOfPersisting" ];

			let locationHeader:HTTP.Header.Class = response.getHeader( "Location" );
			if( locationHeader === null || locationHeader.values.length < 1 ) throw new HTTP.Errors.BadResponseError( "The response is missing a Location header.", response );
			if( locationHeader.values.length !== 1 ) throw new HTTP.Errors.BadResponseError( "The response contains more than one Location header.", response );

			let localID:string = this.getPointerID( locationHeader.values[ 0 ].toString() );
			this.pointers.set( localID, this.createPointerFrom( document, localID ) );
			let persistedProtectedDocument:T & W = <T & W> PersistedProtectedDocument.Factory.decorate<T>( document, this );

			let preferenceHeader:HTTP.Header.Class = response.getHeader( "Preference-Applied" );
			if( preferenceHeader === null || preferenceHeader.toString() !== "return=representation" ) return [ persistedProtectedDocument, response ];

			return this.updateFromPreferenceApplied<T & W>( persistedProtectedDocument, response );
		} ).catch( ( error ) => {
			delete document[ "__CarbonSDK_InProgressOfPersisting" ];
			return Promise.reject( error );
		} );
	}

	private getRDFDocument( requestURL:string, rdfDocuments:RDF.Document.Class[], response:HTTP.Response.Class ):RDF.Document.Class {
		rdfDocuments = rdfDocuments.filter( ( rdfDocument:RDF.Document.Class ) => rdfDocument[ "@id" ] === requestURL );

		if( rdfDocuments.length > 1 ) throw new HTTP.Errors.BadResponseError( "Several documents share the same id.", response );

		return rdfDocuments.length > 0 ? rdfDocuments[ 0 ] : null;
	}

	private getDocumentResource( rdfDocument:RDF.Document.Class, response:HTTP.Response.Class ):RDF.Node.Class {
		let documentResources:RDF.Node.Class[] = RDF.Document.Util.getDocumentResources( rdfDocument );
		if( documentResources.length === 0 ) throw new HTTP.Errors.BadResponseError( `The RDFDocument: ${ rdfDocument[ "@id" ] }, doesn't contain a document resource.`, response );
		if( documentResources.length > 1 ) throw new HTTP.Errors.BadResponseError( `The RDFDocument: ${ rdfDocument[ "@id" ] }, contains more than one document resource.`, response );

		return documentResources[ 0 ];
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
		let types:string[] = Resource.Util.getTypes( document );

		return this.getDigestedObjectSchema( types, document.id );
	}

	private getDigestedObjectSchema( objectTypes:string[], objectID:string ):ObjectSchema.DigestedObjectSchema {
		if( ! this.context ) return new ObjectSchema.DigestedObjectSchema();

		let objectSchemas:ObjectSchema.DigestedObjectSchema[] = [ this.context.getObjectSchema() ];
		if( Utils.isDefined( objectID ) && ! RDF.URI.Util.hasFragment( objectID ) && ! RDF.URI.Util.isBNodeID( objectID ) ) objectSchemas.push( Class._documentSchema );

		for( let type of objectTypes ) {
			if( this.context.hasObjectSchema( type ) ) objectSchemas.push( this.context.getObjectSchema( type ) );
		}

		let digestedSchema:ObjectSchema.DigestedObjectSchema = ObjectSchema.Digester.combineDigestedObjectSchemas( objectSchemas );
		if( this.context.hasSetting( "vocabulary" ) ) digestedSchema.vocab = this.context.resolve( this.context.getSetting( "vocabulary" ) );

		return digestedSchema;
	}

	private updateObject( target:Object, source:Object ):any {
		let keys:string[] = Utils.A.joinWithoutDuplicates( Object.keys( source ), Object.keys( target ) );

		for( let key of keys ) {
			if( Utils.hasProperty( source, key ) ) {
				target[ key ] = source[ key ];
			} else {
				delete target[ key ];
			}
		}

		return target;
	}

	private getAssociatedFragment( blankNodes:PersistedFragment.Class[], namedFragments:Map<string, PersistedNamedFragment.Class>, searchedFragment:RDF.Node.Class ):PersistedFragment.Class {
		if( ! RDF.URI.Util.isBNodeID( searchedFragment[ "@id" ] ) ) return namedFragments.get( searchedFragment[ "@id" ] );

		let bNodeIdentifier:string = RDF.Node.Util.getProperty( searchedFragment, NS.C.Predicate.bNodeIdentifier, null );

		for( let fragment of blankNodes ) {
			if( ! RDF.URI.Util.isBNodeID( fragment.id ) ) continue;
			let persistedBlankNode:PersistedBlankNode.Class = <any> fragment;
			if( ! ! persistedBlankNode.bNodeIdentifier && persistedBlankNode.bNodeIdentifier === bNodeIdentifier ) return fragment;
		}
		return null;
	}

	private getRequestURI( uri:string ):string {
		if( RDF.URI.Util.isPrefixed( uri ) ) {
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

	private setDefaultRequestOptions( requestOptions:HTTP.Request.Options, interactionModel:string ):HTTP.Request.Options {
		if( this.context && this.context.auth.isAuthenticated() ) this.context.auth.addAuthentication( requestOptions );

		HTTP.Request.Util.setAcceptHeader( "application/ld+json", requestOptions );
		HTTP.Request.Util.setPreferredInteractionModel( interactionModel, requestOptions );

		return requestOptions;
	}

	private getMembershipResource( documentResource:RDF.Node.Class, rdfDocuments:RDF.Document.Class[], response:HTTP.Response.Class ):RDF.Node.Class {
		let membershipResource:RDF.Node.Class;

		let membershipResourceURI:string = RDF.Node.Util.getPropertyURI( documentResource, NS.LDP.Predicate.membershipResource );
		if( documentResource[ "@id" ] === membershipResourceURI ) {
			membershipResource = documentResource;
		} else if( membershipResourceURI === null ) {
			if( documentResource[ "@type" ].indexOf( NS.LDP.Class.BasicContainer ) !== - 1 ) {
				membershipResource = documentResource;
			} else {
				throw new HTTP.Errors.BadResponseError( "The document is not an ldp:BasicContainer and it doesn't contain an ldp:membershipResource triple.", response );
			}
		} else {
			let membershipResourceDocument:RDF.Document.Class = this.getRDFDocument( membershipResourceURI, rdfDocuments, response );
			if( membershipResourceDocument === null ) return null;
			membershipResource = this.getDocumentResource( membershipResourceDocument, response );
		}

		return membershipResource;
	}

	private createPersistedDocument<T>( documentPointer:Pointer.Class, documentResource:RDF.Node.Class, fragmentResources:RDF.Node.Class[] ):T & PersistedDocument.Class {
		let persistedDocument:PersistedDocument.Class = PersistedDocument.Factory.decorate( documentPointer, this );

		let fragments:PersistedFragment.Class[] = [];
		for( let fragmentResource of fragmentResources ) {
			fragments.push( persistedDocument.createFragment( fragmentResource[ "@id" ] ) );
		}

		this.compact( documentResource, persistedDocument, persistedDocument );
		this.compact( fragmentResources, fragments, persistedDocument );

		// TODO: Move this to a more appropriate place. See also updatePersistedDocument() method
		persistedDocument._syncSnapshot();
		fragments.forEach( ( fragment:PersistedFragment.Class ) => fragment._syncSnapshot() );
		persistedDocument._syncSavedFragments();

		this.decoratePersistedDocument( persistedDocument );
		return persistedDocument as T & PersistedDocument.Class;
	}

	private updatePersistedDocument<T>( persistedDocument:PersistedDocument.Class, documentResource:RDF.Node.Class, fragmentResources:RDF.Node.Class[] ):T & PersistedDocument.Class {
		let namedFragmentsMap:Map<string, PersistedNamedFragment.Class> = new Map();
		let blankNodesArray:PersistedBlankNode.Class[] = [];

		persistedDocument.getFragments().forEach( fragment => {
			persistedDocument._removeFragment( fragment.id );

			if( RDF.URI.Util.isBNodeID( fragment.id ) ) {
				blankNodesArray.push( fragment as PersistedBlankNode.Class );
			} else {
				let fragmentID:string = RDF.URI.Util.isRelative( fragment.id ) ? RDF.URI.Util.resolve( persistedDocument.id, fragment.id ) : fragment.id;
				namedFragmentsMap.set( fragmentID, <PersistedNamedFragment.Class> fragment );
			}
		} );

		let newFragments:[ PersistedFragment.Class, RDF.Node.Class ][] = [];
		for( let fragmentResource of fragmentResources ) {
			let fragment:PersistedFragment.Class = this.getAssociatedFragment( blankNodesArray, namedFragmentsMap, fragmentResource );

			fragment = persistedDocument.createFragment( fragment || {}, fragmentResource[ "@id" ] );
			newFragments.push( [ fragment, fragmentResource ] );
		}

		for( let [ fragment, resource ] of newFragments ) {
			this.updateObject( fragment, this.compact( resource, {}, persistedDocument ) );
			fragment._syncSnapshot();
		}
		persistedDocument._syncSavedFragments();

		this.updateObject( persistedDocument, this.compact( documentResource, {}, persistedDocument ) );
		persistedDocument._syncSnapshot();

		this.decoratePersistedDocument( persistedDocument );
		return persistedDocument as T & PersistedDocument.Class;
	}

	private getPersistedMetadataResources<T>( freeNodes:RDF.Node.Class[], rdfDocuments:RDF.Document.Class[], response:HTTP.Response.Class ):(T & PersistedDocument.Class)[] {
		let freeResources:FreeResources.Class = this._getFreeResources( freeNodes );

		let descriptionResources:LDP.ResponseMetadata.Class[] = freeResources.getResources().filter( LDP.ResponseMetadata.Factory.is );
		if( descriptionResources.length === 0 ) return [];
		if( descriptionResources.length > 1 ) throw new HTTP.Errors.BadResponseError( `The response contained multiple ${ LDP.ResponseMetadata.RDF_CLASS } objects.`, response );

		rdfDocuments.forEach( rdfDocument => this._getPersistedDocument( rdfDocument, response ) );

		let responseMetadata:LDP.ResponseMetadata.Class = descriptionResources[ 0 ];
		return responseMetadata.resourcesMetadata.map( ( resourceMetadata:LDP.ResourceMetadata.Class ) => {
			let resource:T & PersistedDocument.Class = <T & PersistedDocument.Class> resourceMetadata.resource;
			resource._etag = resourceMetadata.eTag;

			return resource;
		} );
	}

	private decoratePersistedDocument( persistedDocument:PersistedDocument.Class ):void {
		this._documentDecorators.forEach( ( options:DocumentDecorator, type:string ) => {
			if( persistedDocument.hasType( type ) ) {
				options.decorator.apply( null, [ persistedDocument ].concat( options.parameters ) );
			}
		} );
	}

	private updateFromPreferenceApplied<T>( persistedDocument:T & PersistedDocument.Class, response:HTTP.Response.Class ):Promise<[ T, HTTP.Response.Class ]> {
		return new RDF.Document.Parser().parse( response.data ).then( ( rdfDocuments:RDF.Document.Class[] ):[ T, HTTP.Response.Class ] => {
			let eTag:string = HTTP.Response.Util.getETag( response );
			if( eTag === null ) throw new HTTP.Errors.BadResponseError( "The response doesn't contain an ETag", response );

			let rdfDocument:RDF.Document.Class = this.getRDFDocument( persistedDocument.id, rdfDocuments, response );
			if( rdfDocument === null ) throw new HTTP.Errors.BadResponseError( "No document was returned.", response );

			persistedDocument = <any> this._getPersistedDocument( rdfDocument, response );
			persistedDocument._etag = eTag;

			return [ persistedDocument, response ];
		} );
	}

	private _parseMembers( pointers:(string | Pointer.Class)[] ):Pointer.Class[] {
		return pointers.map( pointer => {
			if( Utils.isString( pointer ) ) return this.getPointer( pointer );
			if( Pointer.Factory.is( pointer ) ) return pointer;

			throw new Errors.IllegalArgumentError( "No Carbon.Pointer or URI provided." );
		} );
	}
}

export default Class;
