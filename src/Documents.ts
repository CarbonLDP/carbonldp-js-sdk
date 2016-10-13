import * as Errors from "./Errors";
import * as HTTP from "./HTTP";
import Context from "./Context";
import * as RDF from "./RDF";
import * as Utils from "./Utils";

import * as AccessPoint from "./AccessPoint";
import * as AppRole from "./App/Role";
import * as Auth from "./Auth";
import * as Document from "./Document";
import * as FreeResources from "./FreeResources";
import * as JSONLD from "./JSONLD";
import * as PersistedAccessPoint from "./PersistedAccessPoint";
import * as PersistedAppRole from "./App/PersistedRole";
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

export class Class implements Pointer.Library, Pointer.Validator, ObjectSchema.Resolver {
	private static _documentSchema:ObjectSchema.DigestedObjectSchema = ObjectSchema.Digester.digestSchema( Document.SCHEMA );

	private _jsonldConverter:JSONLD.Converter.Class;

	get jsonldConverter():JSONLD.Converter.Class { return this._jsonldConverter; }

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
	}

	inScope( pointer:Pointer.Class ):boolean;
	inScope( id:string ):boolean;
	inScope( idOrPointer:any ):boolean {
		let id:string = Pointer.Factory.is( idOrPointer ) ? idOrPointer.id : idOrPointer;

		if( RDF.URI.Util.isBNodeID( id ) ) return false;

		if( ! ! this.context ) {
			if( RDF.URI.Util.isPrefixed( id ) ) id = ObjectSchema.Digester.resolvePrefixedURI( id, this.context.getObjectSchema() );

			let baseURI:string = this.context.getBaseURI();
			if( RDF.URI.Util.isRelative( id ) ) return true;
			if( RDF.URI.Util.isBaseOf( baseURI, id ) ) return true;
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

	get<T>( uri:string, requestOptions:HTTP.Request.Options = {} ):Promise<[ T & PersistedDocument.Class, HTTP.Response.Class ]> {
		let pointerID:string = this.getPointerID( uri );

		uri = this.getRequestURI( uri );
		this.setDefaultRequestOptions( requestOptions, NS.LDP.Class.RDFSource );

		if( this.hasPointer( uri ) ) {
			let pointer:Pointer.Class = this.getPointer( uri );
			if( pointer.isResolved() ) {
				return Promise.resolve<[ T & PersistedDocument.Class, HTTP.Response.Class ]>( [ <any> pointer, null ] );
			}
		}

		if( this.documentsBeingResolved.has( pointerID ) ) return this.documentsBeingResolved.get( pointerID );

		let promise:Promise<[ T & PersistedDocument.Class, HTTP.Response.Class ]> = HTTP.Request.Service.get( uri, requestOptions, new RDF.Document.Parser() ).then( ( [ rdfDocuments, response ]:[ RDF.Document.Class[], HTTP.Response.Class ] ) => {
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

			let document:PersistedDocument.Class = this._getPersistedDocument( rdfDocument, response );
			document._etag = eTag;

			this.documentsBeingResolved.delete( pointerID );
			return [ <any> document, response ];
		} );

		this.documentsBeingResolved.set( pointerID, promise );
		return promise;
	}

	exists( documentURI:string, requestOptions:HTTP.Request.Options = {} ):Promise<[ boolean, HTTP.Response.Class ]> {
		documentURI = this.getRequestURI( documentURI );
		this.setDefaultRequestOptions( requestOptions, NS.LDP.Class.RDFSource );

		return HTTP.Request.Service.head( documentURI, requestOptions ).then( ( response:HTTP.Response.Class ) => [ true, response ], ( error:HTTP.Errors.Error ) => {
			if( error.response.status === 404 )
				return [ false, error.response ];

			return Promise.reject<any>( error );
		} );
	}

	createChild<T extends Document.Class>( parentURI:string, childDocument:T, slug?:string, requestOptions?:HTTP.Request.Options ):Promise<[ T & PersistedProtectedDocument.Class, HTTP.Response.Class ]>;
	createChild<T extends Document.Class>( parentURI:string, childDocument:T, requestOptions?:HTTP.Request.Options ):Promise<[ T & PersistedProtectedDocument.Class, HTTP.Response.Class ]>;
	createChild<T extends Object>( parentURI:string, childObject:T, slug?:string, requestOptions?:HTTP.Request.Options ):Promise<[ T & PersistedProtectedDocument.Class, HTTP.Response.Class ]>;
	createChild<T extends Object>( parentURI:string, childObject:T, requestOptions?:HTTP.Request.Options ):Promise<[ T & PersistedProtectedDocument.Class, HTTP.Response.Class ]>;
	createChild<T extends Object>( parentURI:string, childObject:T, slugOrRequestOptions?:any, requestOptions:HTTP.Request.Options = {} ):Promise<[ T & PersistedProtectedDocument.Class, HTTP.Response.Class ]> {
		let slug:string = Utils.isString( slugOrRequestOptions ) ? slugOrRequestOptions : null;
		requestOptions = ! Utils.isString( slugOrRequestOptions ) && ! ! slugOrRequestOptions ? slugOrRequestOptions : requestOptions;

		if( PersistedDocument.Factory.is( childObject ) ) return Promise.reject<any>( new Errors.IllegalArgumentError( "The child provided has been already persisted." ) );
		let childDocument:Document.Class = Document.Factory.is( childObject ) ? <any> childObject : Document.Factory.createFrom( childObject );

		parentURI = this.getRequestURI( parentURI );
		this.setDefaultRequestOptions( requestOptions, NS.LDP.Class.Container );
		HTTP.Request.Util.setContentTypeHeader( "application/ld+json", requestOptions );

		if( childDocument.id ) {
			let childURI:string = childDocument.id;
			if( ! ! this.context ) childURI = this.context.resolve( childURI );
			if( ! RDF.URI.Util.isBaseOf( parentURI, childURI ) ) {
				return Promise.reject<any>( new Errors.IllegalArgumentError( "The childDocument's URI is not relative to the parentURI specified" ) );
			}
		}

		if( childDocument[ "__CarbonSDK_InProgressOfPersisting" ] ) return Promise.reject<any>( new Errors.IllegalArgumentError( "The childDocument is already being persisted." ) );
		Object.defineProperty( childDocument, "__CarbonSDK_InProgressOfPersisting", { configurable: true, enumerable: false, writable: false, value: true } );

		let body:string = childDocument.toJSON( this, this.jsonldConverter );

		if( ! ! slug ) HTTP.Request.Util.setSlug( slug, requestOptions );

		return HTTP.Request.Service.post( parentURI, body, requestOptions ).then( ( response:HTTP.Response.Class ) => {
			delete childDocument[ "__CarbonSDK_InProgressOfPersisting" ];

			let locationHeader:HTTP.Header.Class = response.getHeader( "Location" );
			if( locationHeader === null || locationHeader.values.length < 1 ) throw new HTTP.Errors.BadResponseError( "The response is missing a Location header.", response );
			if( locationHeader.values.length !== 1 ) throw new HTTP.Errors.BadResponseError( "The response contains more than one Location header.", response );

			let localID:string = this.getPointerID( locationHeader.values[ 0 ].toString() );
			let persistedDocument:PersistedDocument.Class = PersistedDocument.Factory.decorate( this.createPointerFrom( childDocument, localID ), this );
			let persistedProtectedDocument:PersistedProtectedDocument.Class = PersistedProtectedDocument.Factory.decorate( persistedDocument );
			this.pointers.set( localID, persistedProtectedDocument );

			return [
				persistedProtectedDocument,
				response,
			];
		} );
	}

	createChildAndRetrieve<T extends Object>( parentURI:string, childObject:T, slug?:string, requestOptions?:HTTP.Request.Options ):Promise<[ T & PersistedProtectedDocument.Class, [ HTTP.Response.Class, HTTP.Response.Class ] ]>;
	createChildAndRetrieve<T extends Object>( parentURI:string, childObject:T, requestOptions?:HTTP.Request.Options ):Promise<[ T & PersistedProtectedDocument.Class, [ HTTP.Response.Class, HTTP.Response.Class ] ]>;
	createChildAndRetrieve<T extends Object>( parentURI:string, childObject:T, slugOrRequestOptions?:any, requestOptions?:HTTP.Request.Options ):Promise<[ T & PersistedProtectedDocument.Class, [ HTTP.Response.Class, HTTP.Response.Class ] ]> {
		let createResponse:HTTP.Response.Class;
		return this.createChild( parentURI, childObject, slugOrRequestOptions, requestOptions ).then( ( [ document, response ]:[ T & PersistedProtectedDocument.Class, HTTP.Response.Class ] ) => {
			createResponse = response;
			return this.get<T>( document.id );
		} ).then( ( [ persistedDocument, response ]:[ T & PersistedDocument.Class, HTTP.Response.Class ] ) => {
			return [ persistedDocument, [ createResponse, response ] ];
		} );
	}

	listChildren( parentURI:string, requestOptions:HTTP.Request.Options = {} ):Promise<[ PersistedDocument.Class[], HTTP.Response.Class ]> {
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

		return HTTP.Request.Service.get( parentURI, requestOptions, new RDF.Document.Parser() )
			.then( ( [ rdfDocuments, response ]:[ RDF.Document.Class[], HTTP.Response.Class ] ) => {
				let rdfDocument:RDF.Document.Class = this.getRDFDocument( parentURI, rdfDocuments, response );
				if( rdfDocument === null ) return [ [], response ];

				let documentResource:RDF.Node.Class = this.getDocumentResource( rdfDocument, response );
				let childPointers:Pointer.Class[] = RDF.Value.Util.getPropertyPointers( documentResource, NS.LDP.Predicate.contains, this );
				let persistedChildPointers:PersistedDocument.Class[] = childPointers.map( pointer => PersistedDocument.Factory.decorate( pointer, this ) );

				return [ persistedChildPointers, response ];
			} );
	}

	getChildren<T>( parentURI:string, retrievalPreferences?:RetrievalPreferences.Class, requestOptions?:HTTP.Request.Options ):Promise<[ (T & PersistedDocument.Class)[], HTTP.Response.Class ]>;
	getChildren<T>( parentURI:string, requestOptions?:HTTP.Request.Options ):Promise<[ (T & PersistedDocument.Class)[], HTTP.Response.Class ]>;
	getChildren<T>( parentURI:string, retPrefReqOpt?:any, requestOptions?:HTTP.Request.Options ):Promise<[ (T & PersistedDocument.Class)[], HTTP.Response.Class ]> {
		let retrievalPreferences:RetrievalPreferences.Class = RetrievalPreferences.Factory.is( retPrefReqOpt ) ? retPrefReqOpt : null;
		requestOptions = HTTP.Request.Util.isOptions( retPrefReqOpt ) ? retPrefReqOpt : ( HTTP.Request.Util.isOptions( requestOptions ) ? requestOptions : {} );

		parentURI = this.getRequestURI( parentURI );
		this.setDefaultRequestOptions( requestOptions, NS.LDP.Class.Container );

		let containerURI:string = parentURI;
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

		return HTTP.Request.Service.get( parentURI, requestOptions, new JSONLD.Parser.Class() ).then( ( [ expandedResult, response ]:[ any, HTTP.Response.Class ] ) => {
			let freeNodes:RDF.Node.Class[] = RDF.Node.Util.getFreeNodes( expandedResult );
			let rdfDocuments:RDF.Document.Class[] = RDF.Document.Util.getDocuments( expandedResult ).filter( document => document[ "@id" ] !== containerURI );

			let resources:PersistedDocument.Class[] = this.getPersistedMetadataResources( freeNodes, rdfDocuments, response );
			return [ resources, response ];
		} );
	}

	createAccessPoint<T extends AccessPoint.Class>( documentURI:string, accessPoint:T, slug?:string, requestOptions?:HTTP.Request.Options ):Promise<[ T & PersistedAccessPoint.Class, HTTP.Response.Class ]>;
	createAccessPoint<T extends AccessPoint.Class>( documentURI:string, accessPoint:T, requestOptions?:HTTP.Request.Options ):Promise<[ T & PersistedAccessPoint.Class, HTTP.Response.Class ]>;
	createAccessPoint<T extends AccessPoint.Class>( documentURI:string, accessPoint:T, slugOrRequestOptions:any, requestOptions:HTTP.Request.Options = {} ):Promise<[ T & PersistedAccessPoint.Class, HTTP.Response.Class ]> {
		let slug:string = Utils.isString( slugOrRequestOptions ) ? slugOrRequestOptions : null;
		requestOptions = ! Utils.isString( slugOrRequestOptions ) && ! ! slugOrRequestOptions ? slugOrRequestOptions : requestOptions;

		documentURI = this.getRequestURI( documentURI );
		this.setDefaultRequestOptions( requestOptions, NS.LDP.Class.RDFSource );
		HTTP.Request.Util.setContentTypeHeader( "application/ld+json", requestOptions );

		if( PersistedDocument.Factory.is( accessPoint ) ) return Promise.reject<any>( new Errors.IllegalArgumentError( "The accessPoint provided has been already persisted." ) );

		let accessPointDocument:T & AccessPoint.DocumentClass = AccessPoint.Factory.is( accessPoint ) ? <any> accessPoint
			: AccessPoint.Factory.createFrom<T>( accessPoint, this.getPointer( documentURI ), accessPoint.hasMemberRelation, accessPoint.isMemberOfRelation );
		if( accessPointDocument.membershipResource.id !== documentURI ) return Promise.reject<any>( new Errors.IllegalArgumentError( "The documentURI must be the same as the accessPoint's membershipResource" ) );

		// TODO: Reuse logic with createChild
		if( accessPointDocument.id ) {
			let childURI:string = accessPointDocument.id;
			if( ! ! this.context ) childURI = this.context.resolve( childURI );
			if( ! RDF.URI.Util.isBaseOf( documentURI, childURI ) ) {
				return Promise.reject<any>( new Errors.IllegalArgumentError( "The accessPoint's URI is not relative to the parentURI specified" ) );
			}
		}

		if( accessPoint[ "__CarbonSDK_InProgressOfPersisting" ] ) return Promise.reject<any>( new Errors.IllegalArgumentError( "The accessPoint is already being persisted." ) );
		Object.defineProperty( accessPoint, "__CarbonSDK_InProgressOfPersisting", { configurable: true, enumerable: false, writable: false, value: true } );

		let body:string = accessPointDocument.toJSON( this, this.jsonldConverter );

		if( ! ! slug ) HTTP.Request.Util.setSlug( slug, requestOptions );

		return HTTP.Request.Service.post( documentURI, body, requestOptions ).then( ( response:HTTP.Response.Class ) => {
			delete accessPoint[ "__CarbonSDK_InProgressOfPersisting" ];

			let locationHeader:HTTP.Header.Class = response.getHeader( "Location" );
			if( locationHeader === null || locationHeader.values.length < 1 ) throw new HTTP.Errors.BadResponseError( "The response is missing a Location header.", response );
			if( locationHeader.values.length !== 1 ) throw new HTTP.Errors.BadResponseError( "The response contains more than one Location header.", response );

			let localID:string = this.getPointerID( locationHeader.values[ 0 ].toString() );
			let persistedAccessPoint:T & AccessPoint.DocumentClass & PersistedDocument.Class = PersistedDocument.Factory.decorate<T & AccessPoint.DocumentClass>( this.createPointerFrom( accessPointDocument, localID ), this );
			let persistedProtectedAccessPoint:T & PersistedAccessPoint.Class = PersistedProtectedDocument.Factory.decorate<T & AccessPoint.DocumentClass & PersistedDocument.Class>( persistedAccessPoint );
			this.pointers.set( localID, persistedAccessPoint );

			return [
				persistedProtectedAccessPoint,
				response,
			];
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
			if( ! ( data instanceof Blob ) ) return Promise.reject<any>( new Errors.IllegalArgumentError( "The data is not a valid Blob object." ) );
			HTTP.Request.Util.setContentTypeHeader( (<Blob> data).type, requestOptions );

		} else {
			if( ! ( data instanceof Buffer ) ) return Promise.reject<any>( new Errors.IllegalArgumentError( "The data is not a valid Buffer object." ) );
			const fileType:( buffer:Buffer ) => { ext:string, mime:string } = require( "file-type" );

			let bufferType:{ ext:string, mime:string } = fileType( <Buffer> data );
			HTTP.Request.Util.setContentTypeHeader( bufferType ? bufferType.mime : "application/octet-stream", requestOptions );
		}

		parentURI = this.getRequestURI( parentURI );
		this.setDefaultRequestOptions( requestOptions, NS.LDP.Class.Container );

		if( ! ! slug ) HTTP.Request.Util.setSlug( slug, requestOptions );

		return HTTP.Request.Service.post( parentURI, <any> data, requestOptions ).then( ( response:HTTP.Response.Class ) => {
			let locationHeader:HTTP.Header.Class = response.getHeader( "Location" );
			if( locationHeader === null || locationHeader.values.length < 1 ) throw new HTTP.Errors.BadResponseError( "The response is missing a Location header.", response );
			if( locationHeader.values.length !== 1 ) throw new HTTP.Errors.BadResponseError( "The response contains more than one Location header.", response );

			let locationURI:string = locationHeader.values[ 0 ].toString();

			let pointer:Pointer.Class = this.getPointer( locationURI );

			return [
				pointer,
				response,
			];
		} );
	}

	listMembers( uri:string, includeNonReadable?:boolean, requestOptions?:HTTP.Request.Options ):Promise<[ PersistedDocument.Class[], HTTP.Response.Class ]>;
	listMembers( uri:string, requestOptions?:HTTP.Request.Options ):Promise<[ PersistedDocument.Class[], HTTP.Response.Class ]>;
	listMembers( uri:string, nonReadReqOpt?:any, reqOpt?:HTTP.Request.Options ):Promise<[ PersistedDocument.Class[], HTTP.Response.Class ]> {
		let includeNonReadable:boolean = Utils.isBoolean( nonReadReqOpt ) ? nonReadReqOpt : true;
		let requestOptions:HTTP.Request.Options = HTTP.Request.Util.isOptions( nonReadReqOpt ) ? nonReadReqOpt : ( HTTP.Request.Util.isOptions( reqOpt ) ? reqOpt : {} );

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

		return HTTP.Request.Service.get( uri, requestOptions, new RDF.Document.Parser() ).then( ( [ rdfDocuments, response ]:[ RDF.Document.Class[], HTTP.Response.Class ] ) => {
			let rdfDocument:RDF.Document.Class = this.getRDFDocument( uri, rdfDocuments, response );
			if( rdfDocument === null ) throw new HTTP.Errors.BadResponseError( "No document was returned.", response );

			let documentResource:RDF.Node.Class = this.getDocumentResource( rdfDocument, response );
			let membershipResource:RDF.Node.Class = this.getMembershipResource( documentResource, rdfDocuments, response );
			if( membershipResource === null ) return [ [], response ];

			let hasMemberRelation:string = RDF.Node.Util.getPropertyURI( documentResource, NS.LDP.Predicate.hasMemberRelation );

			let memberPointers:Pointer.Class[] = RDF.Value.Util.getPropertyPointers( membershipResource, hasMemberRelation, this );
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

		uri = this.getRequestURI( uri );
		this.setDefaultRequestOptions( requestOptions, NS.LDP.Class.Container );

		let containerURI:string = uri;
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

		return HTTP.Request.Service.get( uri, requestOptions, new JSONLD.Parser.Class() ).then( ( [ expandedResult, response ]:[ any, HTTP.Response.Class ] ) => {
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

			let resources:PersistedDocument.Class[] = this.getPersistedMetadataResources( freeNodes, rdfDocuments, response );
			return [ <any> resources, response ];
		} );
	}

	addMember( documentURI:string, member:Pointer.Class, requestOptions?:HTTP.Request.Options ):Promise<HTTP.Response.Class>;
	addMember( documentURI:string, memberURI:string, requestOptions?:HTTP.Request.Options ):Promise<HTTP.Response.Class>;
	addMember( documentURI:string, memberORUri:Pointer.Class | string, requestOptions:HTTP.Request.Options = {} ):Promise<HTTP.Response.Class> {
		return this.addMembers( documentURI, [ memberORUri ], requestOptions );
	}

	addMembers( documentURI:string, members:(Pointer.Class | string)[], requestOptions?:HTTP.Request.Options ):Promise<HTTP.Response.Class>;
	addMembers( documentURI:string, members:(Pointer.Class | string)[], requestOptions:HTTP.Request.Options = {} ):Promise<HTTP.Response.Class> {
		let pointers:Pointer.Class[] = [];
		for( let member  of members ) {
			member = Utils.isString( member ) ? this.getPointer( <string> member ) : member;
			if( ! Pointer.Factory.is( member ) ) return Promise.reject<any>( new Errors.IllegalArgumentError( "No Carbon.Pointer or URI provided." ) );

			pointers.push( <Pointer.Class> member );
		}

		documentURI = this.getRequestURI( documentURI );
		this.setDefaultRequestOptions( requestOptions, NS.LDP.Class.Container );
		HTTP.Request.Util.setContentTypeHeader( "application/ld+json", requestOptions );

		let document:Document.Class = LDP.AddMemberAction.Factory.createDocument( pointers );

		let body:string = document.toJSON( this, this.jsonldConverter );

		return HTTP.Request.Service.put( documentURI, body, requestOptions );
	}

	removeMember( documentURI:string, member:Pointer.Class, requestOptions?:HTTP.Request.Options ):Promise<HTTP.Response.Class>;
	removeMember( documentURI:string, memberURI:string, requestOptions?:HTTP.Request.Options ):Promise<HTTP.Response.Class>;
	removeMember( documentURI:string, memberORUri:Pointer.Class | string, requestOptions:HTTP.Request.Options = {} ):Promise<HTTP.Response.Class> {
		return this.removeMembers( documentURI, [ memberORUri ], requestOptions );
	}

	removeMembers( documentURI:string, members:(Pointer.Class | string)[], requestOptions:HTTP.Request.Options = {} ):Promise<HTTP.Response.Class> {
		let pointers:Pointer.Class[] = [];
		for( let member of members ) {
			member = Utils.isString( member ) ? this.getPointer( <string> member ) : member;
			if( ! Pointer.Factory.is( member ) ) return Promise.reject<any>( new Errors.IllegalArgumentError( "No Carbon.Pointer or URI provided." ) );

			pointers.push( <Pointer.Class> member );
		}

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
	}

	removeAllMembers( documentURI:string, requestOptions:HTTP.Request.Options = {} ):Promise<HTTP.Response.Class> {
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
	}

	save<T extends PersistedDocument.Class>( persistedDocument:T, requestOptions:HTTP.Request.Options = {} ):Promise<[ T, HTTP.Response.Class ]> {
		// TODO: Check if the document isDirty
		/*
		if( ! persistedDocument.isDirty() ) return new Promise<HTTP.Response.Class>( ( resolve:( result:HTTP.Response.Class ) => void ) => {
			resolve( null );
		});
		*/
		let uri:string = this.getRequestURI( persistedDocument.id );
		this.setDefaultRequestOptions( requestOptions, NS.LDP.Class.RDFSource );
		HTTP.Request.Util.setContentTypeHeader( "application/ld+json", requestOptions );
		HTTP.Request.Util.setIfMatchHeader( persistedDocument._etag, requestOptions );

		persistedDocument._normalize();
		let body:string = persistedDocument.toJSON( this, this.jsonldConverter );

		return HTTP.Request.Service.put( uri, body, requestOptions ).then( ( response:HTTP.Response.Class ) => {
			return [ persistedDocument, response ];
		} );
	}

	refresh<T extends PersistedDocument.Class>( persistedDocument:T, requestOptions:HTTP.Request.Options = {} ):Promise<[ T, HTTP.Response.Class ]> {
		let uri:string = this.getRequestURI( persistedDocument.id );
		this.setDefaultRequestOptions( requestOptions, NS.LDP.Class.RDFSource );

		return HTTP.Request.Service.head( uri, requestOptions ).then( ( headerResponse:HTTP.Response.Class ) => {
			let eTag:string = HTTP.Response.Util.getETag( headerResponse );
			if( eTag === persistedDocument._etag ) return <any> [ persistedDocument, null ];

			return HTTP.Request.Service.get( uri, requestOptions, new RDF.Document.Parser() );

		} ).then( ( [ rdfDocuments, response ]:[ RDF.Document.Class[], HTTP.Response.Class ] ) => {
			if( response === null ) return <any> [ rdfDocuments, response ];

			let eTag:string = HTTP.Response.Util.getETag( response );
			if( eTag === null ) throw new HTTP.Errors.BadResponseError( "The response doesn't contain an ETag", response );

			let rdfDocument:RDF.Document.Class = this.getRDFDocument( uri, rdfDocuments, response );
			if( rdfDocument === null ) throw new HTTP.Errors.BadResponseError( "No document was returned.", response );

			let updatedPersistedDocument:PersistedDocument.Class = this._getPersistedDocument( rdfDocument, response );
			updatedPersistedDocument._etag = eTag;

			return [ updatedPersistedDocument, response ];
		} );
	}

	saveAndRefresh<T extends PersistedDocument.Class>( persistedDocument:T, requestOptions:HTTP.Request.Options = {} ):Promise<[ T, [ HTTP.Response.Class, HTTP.Response.Class] ]> {
		// TODO: Check how to manage the requestOptions for the multiple calls

		let saveResponse:HTTP.Response.Class;
		return this.save<T>( persistedDocument ).then( ( [ document, response ]:[ T, HTTP.Response.Class ] ) => {
			saveResponse = response;
			return this.refresh<T>( persistedDocument );
		} ).then( ( [ document, response ]:[ T, HTTP.Response.Class ] ) => {
			return [ persistedDocument, [ saveResponse, response ] ];
		} );
	}


	delete( documentURI:string, requestOptions:HTTP.Request.Options = {} ):Promise<HTTP.Response.Class> {
		documentURI = this.getRequestURI( documentURI );
		this.setDefaultRequestOptions( requestOptions, NS.LDP.Class.RDFSource );

		return HTTP.Request.Service.delete( documentURI, requestOptions ).then( ( response:HTTP.Response.Class ) => {
			let pointerID:string = this.getPointerID( documentURI );
			this.pointers.delete( pointerID );

			return response;
		} );
	}

	getDownloadURL( documentURI:string, requestOptions?:HTTP.Request.Options ):Promise<string> {
		if( ! this.context.auth ) Promise.reject<any>( new Errors.IllegalStateError( "This instance doesn't support Authenticated request." ) );
		return this.context.auth.getAuthenticatedURL( documentURI, requestOptions );
	}

	getGeneralSchema():ObjectSchema.DigestedObjectSchema {
		if( ! this.context ) return new ObjectSchema.DigestedObjectSchema();

		let schema:ObjectSchema.DigestedObjectSchema = ObjectSchema.Digester.combineDigestedObjectSchemas( [ this.context.getObjectSchema() ] );
		if( this.context.hasSetting( "vocabulary" ) ) schema.vocab = this.context.resolve( this.context.getSetting( "vocabulary" ) );
		return schema;
	}

	getSchemaFor( object:Object ):ObjectSchema.DigestedObjectSchema {
		let schema:ObjectSchema.DigestedObjectSchema = ( "@id" in object ) ?
			this.getDigestedObjectSchemaForExpandedObject( object ) :
			this.getDigestedObjectSchemaForDocument( <any> object );

		return schema;
	}

	executeRawASKQuery( documentURI:string, askQuery:string, requestOptions:HTTP.Request.Options = {} ):Promise<[ SPARQL.RawResults.Class, HTTP.Response.Class ]> {
		documentURI = this.getRequestURI( documentURI );

		if( this.context && this.context.auth && this.context.auth.isAuthenticated() ) this.context.auth.addAuthentication( requestOptions );

		return SPARQL.Service.executeRawASKQuery( documentURI, askQuery, requestOptions );
	}

	executeASKQuery( documentURI:string, askQuery:string, requestOptions:HTTP.Request.Options = {} ):Promise<[ boolean, HTTP.Response.Class ]> {
		documentURI = this.getRequestURI( documentURI );

		if( this.context && this.context.auth && this.context.auth.isAuthenticated() ) this.context.auth.addAuthentication( requestOptions );

		return SPARQL.Service.executeASKQuery( documentURI, askQuery, requestOptions );
	}

	executeRawSELECTQuery( documentURI:string, selectQuery:string, requestOptions:HTTP.Request.Options = {} ):Promise<[ SPARQL.RawResults.Class, HTTP.Response.Class ]> {
		documentURI = this.getRequestURI( documentURI );

		if( this.context && this.context.auth && this.context.auth.isAuthenticated() ) this.context.auth.addAuthentication( requestOptions );

		return SPARQL.Service.executeRawSELECTQuery( documentURI, selectQuery, requestOptions );
	}

	executeSELECTQuery( documentURI:string, selectQuery:string, requestOptions:HTTP.Request.Options = {} ):Promise<[ SPARQL.SELECTResults.Class, HTTP.Response.Class ]> {
		documentURI = this.getRequestURI( documentURI );

		if( this.context && this.context.auth && this.context.auth.isAuthenticated() ) this.context.auth.addAuthentication( requestOptions );

		return SPARQL.Service.executeSELECTQuery( documentURI, selectQuery, this, requestOptions );
	}

	executeRawCONSTRUCTQuery( documentURI:string, constructQuery:string, requestOptions:HTTP.Request.Options = {} ):Promise<[ string, HTTP.Response.Class ]> {
		documentURI = this.getRequestURI( documentURI );

		if( this.context && this.context.auth && this.context.auth.isAuthenticated() ) this.context.auth.addAuthentication( requestOptions );

		return SPARQL.Service.executeRawCONSTRUCTQuery( documentURI, constructQuery, requestOptions );
	}

	executeRawDESCRIBEQuery( documentURI:string, describeQuery:string, requestOptions:HTTP.Request.Options = {} ):Promise<[ string, HTTP.Response.Class ]> {
		documentURI = this.getRequestURI( documentURI );

		if( this.context && this.context.auth && this.context.auth.isAuthenticated() ) this.context.auth.addAuthentication( requestOptions );

		return SPARQL.Service.executeRawDESCRIBEQuery( documentURI, describeQuery, requestOptions );
	}

	executeUPDATE( documentURI:string, update:string, requestOptions:HTTP.Request.Options = {} ):Promise<HTTP.Response.Class> {
		if( ! RDF.URI.Util.isAbsolute( documentURI ) ) {
			if( ! this.context ) throw new Errors.IllegalArgumentError( "This Documents instance doesn't support relative URIs." );
			documentURI = this.context.resolve( documentURI );
		}

		if( this.context && this.context.auth && this.context.auth.isAuthenticated() ) this.context.auth.addAuthentication( requestOptions );

		return SPARQL.Service.executeUPDATE( documentURI, update, requestOptions );
	}

	_getPersistedDocument( rdfDocument:RDF.Document.Class, response:HTTP.Response.Class ):PersistedDocument.Class {
		let documentResource:RDF.Node.Class = this.getDocumentResource( rdfDocument, response );
		let fragmentResources:RDF.Node.Class[] = RDF.Document.Util.getBNodeResources( rdfDocument );
		fragmentResources = fragmentResources.concat( RDF.Document.Util.getFragmentResources( rdfDocument ) );

		let uri:string = documentResource[ "@id" ];
		let documentPointer:Pointer.Class = this.getPointer( uri );

		if( documentPointer.isResolved() ) {
			this.updatePersistedDocument( <PersistedDocument.Class> documentPointer, documentResource, fragmentResources );
		} else {
			this.createPersistedDocument( documentPointer, documentResource, fragmentResources );
		}

		return <PersistedDocument.Class> documentPointer;
	}

	_getFreeResources( nodes:RDF.Node.Class[] ):FreeResources.Class {
		let freeResourcesDocument:FreeResources.Class = FreeResources.Factory.create( this );

		let resources:Resource.Class[] = nodes.map( node => freeResourcesDocument.createResource( node[ "@id" ] ) );
		this.compact( nodes, resources, freeResourcesDocument );

		return freeResourcesDocument;
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
				let baseURI:string = this.context.getBaseURI();
				if( ! RDF.URI.Util.isBaseOf( baseURI, uri ) ) return null;

				return uri.substring( baseURI.length );
			} else {
				return uri[ 0 ] === "/" ? uri.substr( 1 ) : uri;
			}
		} else {
			if( RDF.URI.Util.isRelative( uri ) ) throw new Errors.IllegalArgumentError( "This Documents instance doesn't support relative URIs." );
			if( RDF.URI.Util.isPrefixed( uri ) ) throw new Errors.IllegalArgumentError( "This Documents instance doesn't support prefixed URIs." );
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

		let bNodeIdentifier:string = RDF.Value.Util.getProperty( searchedFragment, NS.C.Predicate.bNodeIdentifier, null );

		for( let fragment of blankNodes ) {
			if( ! RDF.URI.Util.isBNodeID( fragment.id ) ) continue;
			let persistedBlankNode:PersistedBlankNode.Class = <any> fragment;
			if( ! ! persistedBlankNode.bNodeIdentifier && persistedBlankNode.bNodeIdentifier === bNodeIdentifier ) return fragment;
		}
		return null;
	}

	private getRequestURI( uri:string ):string {
		if( RDF.URI.Util.isRelative( uri ) ) {
			if( ! this.context ) throw new Errors.IllegalArgumentError( "This Documents instance doesn't support relative URIs." );
			uri = this.context.resolve( uri );
		} else if( RDF.URI.Util.isPrefixed( uri ) ) {
			if( ! this.context ) throw new Errors.IllegalArgumentError( "This Documents instance doesn't support prefixed URIs." );
			uri = ObjectSchema.Digester.resolvePrefixedURI( uri, this.context.getObjectSchema() );

			if( RDF.URI.Util.isPrefixed( uri ) ) throw new Errors.IllegalArgumentError( `The prefixed URI "${ uri }" could not be resolved.` );
		}
		return uri;
	}

	private setDefaultRequestOptions( requestOptions:HTTP.Request.Options, interactionModel:string ):void {
		if( this.context && this.context.auth && this.context.auth.isAuthenticated() ) this.context.auth.addAuthentication( requestOptions );

		HTTP.Request.Util.setAcceptHeader( "application/ld+json", requestOptions );
		HTTP.Request.Util.setPreferredInteractionModel( interactionModel, requestOptions );
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

	private createPersistedDocument( documentPointer:Pointer.Class, documentResource:RDF.Node.Class, fragmentResources:RDF.Node.Class[] ):PersistedDocument.Class {
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
		persistedDocument._resolved = true;

		// TODO: Decorate additional behavior (app, etc.). See also updatePersistedDocument() method
		// TODO: Make it dynamic. See also updatePersistedDocument() method
		if( persistedDocument.hasType( ProtectedDocument.RDF_CLASS ) ) PersistedProtectedDocument.Factory.decorate( persistedDocument );
		if( persistedDocument.hasType( Auth.ACL.RDF_CLASS ) ) Auth.PersistedACL.Factory.decorate( persistedDocument );
		if( persistedDocument.hasType( Auth.Agent.RDF_CLASS ) ) Auth.PersistedAgent.Factory.decorate( persistedDocument );
		if( persistedDocument.hasType( AppRole.RDF_CLASS ) ) PersistedAppRole.Factory.decorate( persistedDocument, this.context.auth ? this.context.auth.roles : null );

		return persistedDocument;
	}

	private updatePersistedDocument( persistedDocument:PersistedDocument.Class, documentResource:RDF.Node.Class, fragmentResources:RDF.Node.Class[] ):PersistedDocument.Class {
		let namedFragmentsMap:Map<string, PersistedNamedFragment.Class> = new Map();
		let blankNodesArray:PersistedBlankNode.Class[] = <PersistedBlankNode.Class[]> persistedDocument.getFragments().filter( fragment => {
			persistedDocument._removeFragment( fragment.id );
			if( RDF.URI.Util.isBNodeID( fragment.id ) ) return true;

			namedFragmentsMap.set( fragment.id, <PersistedNamedFragment.Class> fragment );
			return false;
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

		return persistedDocument;
	}

	private getPersistedMetadataResources( freeNodes:RDF.Node.Class[], rdfDocuments:RDF.Document.Class[], response:HTTP.Response.Class ):PersistedDocument.Class[] {
		let freeResources:FreeResources.Class = this._getFreeResources( freeNodes );

		let descriptionResources:LDP.ResponseMetadata.Class[] = <any> freeResources.getResources().filter( LDP.ResponseMetadata.Factory.hasRDFClass );
		if( descriptionResources.length === 0 ) return [];
		if( descriptionResources.length > 1 ) throw new HTTP.Errors.BadResponseError( `The response contained multiple ${ LDP.ResponseMetadata.RDF_CLASS } objects.`, response );

		rdfDocuments.forEach( rdfDocument => this._getPersistedDocument( rdfDocument, response ) );

		let responseMetadata:LDP.ResponseMetadata.Class = descriptionResources[ 0 ];
		return responseMetadata.resourcesMetadata.map( ( resourceMetadata:LDP.ResourceMetadata.Class ) => {
			let resource:PersistedDocument.Class = <PersistedDocument.Class> resourceMetadata.resource;
			resource._etag = resourceMetadata.eTag;

			return resource;
		} );
	}

}

export default Class;
