/// <reference path="../typings/tsd.d.ts" />

import * as jsonld from "jsonld";

import Committer from "./Committer";
import * as Errors from "./Errors";
import * as HTTP from "./HTTP";
import Context from "./Context";
import * as RDF from "./RDF";
import * as Utils from "./Utils";

import * as Document from "./Document";
import * as Fragment from "./Fragment";
import * as JSONLDConverter from "./JSONLDConverter";
import * as PersistedDocument from "./PersistedDocument";
import * as Pointer from "./Pointer";
import * as NamedFragment from "./NamedFragment";
import * as NS from "./NS";
import * as ObjectSchema from "./ObjectSchema";
import * as LDP from "./NS/LDP";
import * as Resource from "./Resource";
import * as SPARQL from "./SPARQL";

function parse( input:string ):any {
	try {
		return JSON.parse( input );
	} catch ( error ) {
		// TODO: Handle SyntaxError
		throw error;
	}
}

function expand( [ result, response ]:[ Object, HTTP.Response.Class ], options?:jsonld.ExpandOptions ):Promise<[ Object, HTTP.Response.Class ]> {
	return new Promise( ( resolve:( result:Object ) => void, reject:( error:any ) => void ) => {
		jsonld.expand( result, options, function ( error:any, expanded:Object ):void {
			if ( error ) {
				// TODO: Handle jsonld.expand error
				throw error;
			}

			result = expanded;
			resolve( [ result, response ] );
		} );
	} );
}

class Documents implements Pointer.Library, Pointer.Validator, ObjectSchema.Resolver {
	_jsonldConverter:JSONLDConverter.Class;

	get jsonldConverter():JSONLDConverter.Class { return this._jsonldConverter; }

	private context:Context;
	private pointers:Map<string, Pointer.Class>;

	constructor( context:Context = null ) {
		this.context = context;

		this.pointers = new Map<string, Pointer.Class>();

		if( !! this.context && !! this.context.parentContext ) {
			let contextJSONLDConverter:JSONLDConverter.Class = this.context.parentContext.Documents.jsonldConverter;
			this._jsonldConverter = new JSONLDConverter.Class( contextJSONLDConverter.literalSerializers );
		} else {
			this._jsonldConverter = new JSONLDConverter.Class();
		}
	}

	inScope( pointer:Pointer.Class ):boolean;
	inScope( id:string ):boolean;
	inScope( idOrPointer:any ):boolean {
		let id:string = Pointer.Factory.is( idOrPointer ) ? idOrPointer.id : idOrPointer;

		if( RDF.URI.Util.isBNodeID( id ) ) return false;

		if( !! this.context ) {
			let baseURI:string = this.context.getBaseURI();
			if( RDF.URI.Util.isAbsolute( id ) && RDF.URI.Util.isBaseOf( baseURI, id ) ) return true;
		} else {
			if( RDF.URI.Util.isAbsolute( id ) ) return true;
		}

		if( !! this.context && !! this.context.parentContext ) return this.context.parentContext.Documents.inScope( id );

		return false;
	}

	hasPointer( id:string ):boolean {
		id = this.getPointerID( id );

		if( this.pointers.has( id ) ) return true;

		if( !! this.context && !! this.context.parentContext ) return this.context.parentContext.Documents.hasPointer( id );

		return false;
	}

	getPointer( id:string ):Pointer.Class {
		let localID:string = this.getPointerID( id );

		if( ! localID ) {
			if( !! this.context && !! this.context.parentContext ) return this.context.parentContext.Documents.getPointer( id );
			throw new Errors.IllegalArgumentError( "The pointer id is not supported by this module." );
		}

		let pointer:Pointer.Class;
		if( ! this.pointers.has( localID ) ) {
			pointer = this.createPointer( localID );
			this.pointers.set( localID, pointer );
		}

		return this.pointers.get( localID );
	}

	get( uri:string, requestOptions:HTTP.Request.Options = {} ):Promise<[ PersistedDocument.Class, HTTP.Response.Class ]> {
		let pointerID:string = this.getPointerID( uri );
		if( !! this.context ) uri = this.context.resolve( uri );

		if( this.pointers.has( pointerID ) ) {
			let pointer:Pointer.Class = this.getPointer( uri );
			if( pointer.isResolved() ) {
				return new Promise( ( resolve:( result:[ PersistedDocument.Class, HTTP.Response.Class ]) => void, reject:( error:Error ) => void ) => {
					resolve( [ <any> pointer, null ] );
				} );
			}
		}

		if ( this.context && this.context.Auth.isAuthenticated() ) this.context.Auth.addAuthentication( requestOptions );

		HTTP.Request.Util.setAcceptHeader( "application/ld+json", requestOptions );
		HTTP.Request.Util.setPreferredInteractionModel( LDP.Class.RDFSource, requestOptions );

		return HTTP.Request.Service.get( uri, requestOptions ).then(
			( response:HTTP.Response.Class ) => {
				let parsedObject:Object = parse( response.data );

				return expand( [ parsedObject, response ] );
			}
		).then(
			( [ expandedResult, response ]:[ Object, HTTP.Response.Class ] ) => {
				let etag:string = HTTP.Response.Util.getETag( response );
				if( etag === null ) throw new HTTP.Errors.BadResponseError( "The response doesn't contain an ETag", response );

				let rdfDocuments:RDF.Document.Class[] = RDF.Document.Util.getDocuments( expandedResult );
				let rdfDocument:RDF.Document.Class = this.getRDFDocument( rdfDocuments, response );

				let documentResources:RDF.Node.Class[] = RDF.Document.Util.getDocumentResources( rdfDocument );
				if( documentResources.length > 1 ) throw new HTTP.Errors.BadResponseError( "The RDFDocument contains more than one document resource.", response );
				if( documentResources.length === 0 ) throw new HTTP.Errors.BadResponseError( "The RDFDocument doesn\'t contain a document resource.", response );

				let documentResource:RDF.Node.Class = documentResources[ 0 ];
				let fragmentResources:RDF.Node.Class[] = RDF.Document.Util.getBNodeResources( rdfDocument );
				let namedFragmentResources:RDF.Node.Class[] = RDF.Document.Util.getFragmentResources( rdfDocument );

				let documentPointer:Pointer.Class = this.getPointer( uri );
				documentPointer._resolved = true;

				let document:PersistedDocument.Class = PersistedDocument.Factory.createFrom( documentPointer, uri, this );
				document._etag = etag;

				let fragments:Fragment.Class[] = [];
				for( let fragmentResource of fragmentResources ) {
					fragments.push( document.createFragment( fragmentResource[ "@id" ] ) );
				}

				let namedFragments:NamedFragment.Class[] = [];
				for( let namedFragmentResource of namedFragmentResources ) {
					namedFragments.push( document.createNamedFragment( namedFragmentResource[ "@id" ] ) );
				}

				this.compact( documentResource, document, document );
				this.compact( fragmentResources, fragments, document );
				this.compact( namedFragmentResources, namedFragments, document );

				// TODO: Decorate additional behavior (container, app, etc.)
				return [ document, response ];
			}
		);
	}
	createChild( parentURI:string, slug:string, childDocument:Document.Class, requestOptions?:HTTP.Request.Options ):Promise<[ Pointer.Class, HTTP.Response.Class ]>;
	createChild( parentURI:string, childDocument:Document.Class, requestOptions?:HTTP.Request.Options ):Promise<[ Pointer.Class, HTTP.Response.Class ]>;
	createChild( parentURI:string, slugOrChildDocument:any, childDocumentOrRequestOptions:any = {}, requestOptions:HTTP.Request.Options = {} ):Promise<[ Pointer.Class, HTTP.Response.Class ]> {
		let slug:string = Utils.isString( slugOrChildDocument ) ? slugOrChildDocument : null;
		let childDocument:Document.Class = ! Utils.isString( slugOrChildDocument ) ? slugOrChildDocument : childDocumentOrRequestOptions;
		requestOptions = ! Utils.isString( slugOrChildDocument ) ? childDocumentOrRequestOptions : requestOptions;

		if( PersistedDocument.Factory.is( childDocument ) ) return Utils.P.createRejectedPromise( new Errors.IllegalArgumentError( "The childDocument provided has been already persisted." ) );

		if( childDocument.id ) {
			if( ! RDF.URI.Util.isBaseOf( parentURI, childDocument.id ) ) return Utils.P.createRejectedPromise( new Errors.IllegalArgumentError( "The childDocument's URI is not relative to the parentURI specified" ) );
		}

		if ( this.context && this.context.Auth.isAuthenticated() ) this.context.Auth.addAuthentication( requestOptions );

		HTTP.Request.Util.setAcceptHeader( "application/ld+json", requestOptions );
		HTTP.Request.Util.setContentTypeHeader( "application/ld+json", requestOptions );
		HTTP.Request.Util.setPreferredInteractionModel( LDP.Class.Container, requestOptions );

		if( slug !== null ) HTTP.Request.Util.setSlug( slug, requestOptions );

		let body:string = childDocument.toJSON( this, this.jsonldConverter );

		return HTTP.Request.Service.post( parentURI, body, requestOptions ).then(
			( response:HTTP.Response.Class ) => {
				let locationHeader:HTTP.Header.Class = response.headers.get( "Location" );
				if( locationHeader === null || locationHeader.values.length < 1 ) throw new HTTP.Errors.BadResponseError( "The response is missing a Location header.", response );
				if( locationHeader.values.length !== 1 ) throw new HTTP.Errors.BadResponseError( "The response contains more than one Location header.", response );

				let locationURI:string = locationHeader.values[0].toString();
				let pointer:Pointer.Class = this.getPointer( locationURI);

				return [
					pointer,
					response,
				];
			}
		);
	}

	save( persistedDocument:PersistedDocument.Class, requestOptions:HTTP.Request.Options = {} ):Promise<[ PersistedDocument.Class, HTTP.Response.Class ]> {
		// TODO: Check if the document isDirty
		/*
		if( ! persistedDocument.isDirty() ) return new Promise<HTTP.Response.Class>( ( resolve:( result:HTTP.Response.Class ) => void ) => {
			resolve( null );
		});
		*/

		if ( this.context && this.context.Auth.isAuthenticated() ) this.context.Auth.addAuthentication( requestOptions );

		HTTP.Request.Util.setAcceptHeader( "application/ld+json", requestOptions );
		HTTP.Request.Util.setContentTypeHeader( "application/ld+json", requestOptions );
		HTTP.Request.Util.setPreferredInteractionModel( LDP.Class.RDFSource, requestOptions );
		HTTP.Request.Util.setIfMatchHeader( persistedDocument._etag, requestOptions );

		let body:string = persistedDocument.toJSON( this, this.jsonldConverter );

		return HTTP.Request.Service.put( persistedDocument.id, body, requestOptions ).then( ( response:HTTP.Response.Class ) => {
			return [ persistedDocument, response ];
		});
	}

	delete( persistedDocument:PersistedDocument.Class, requestOptions:HTTP.Request.Options = {} ):Promise<HTTP.Response.Class> {
		if ( this.context && this.context.Auth.isAuthenticated() ) this.context.Auth.addAuthentication( requestOptions );

		HTTP.Request.Util.setAcceptHeader( "application/ld+json", requestOptions );
		HTTP.Request.Util.setPreferredInteractionModel( LDP.Class.RDFSource, requestOptions );
		HTTP.Request.Util.setIfMatchHeader( persistedDocument._etag, requestOptions );

		return HTTP.Request.Service.delete( persistedDocument.id, persistedDocument.toJSON(), requestOptions );
	}

	getSchemaFor( object:Object ):ObjectSchema.DigestedObjectSchema {
		if( "@id" in object ) {
			return this.getDigestedObjectSchemaForExpandedObject( object );
		} else {
			return this.getDigestedObjectSchemaForDocument( <any> object );
		}
	}

	executeSELECTQuery( documentURI:string, selectQuery:string, requestOptions:HTTP.Request.Options = {} ):Promise<[ SPARQL.Results.Class, HTTP.Response.Class ]> {
		if( ! RDF.URI.Util.isAbsolute( documentURI ) ) {
			if( ! this.context ) throw new Errors.IllegalArgumentError( "This Documents instance doesn't support relative URIs." );
			documentURI = this.context.resolve( documentURI );
		}

		if ( this.context && this.context.Auth.isAuthenticated() ) this.context.Auth.addAuthentication( requestOptions );

		return SPARQL.Service.executeSELECTQuery( documentURI, selectQuery, requestOptions );
	}

	private getRDFDocument( rdfDocuments:RDF.Document.Class[], response:HTTP.Response.Class ):RDF.Document.Class {
		if ( rdfDocuments.length === 0 ) throw new HTTP.Errors.BadResponseError( "No document was returned.", response );
		if ( rdfDocuments.length > 1 ) throw new Error( "Unsupported: Multiple graphs are currently not supported." );
		return rdfDocuments[ 0 ];
	}

	private getPointerID( uri:string ):string {
		if( RDF.URI.Util.isBNodeID( uri ) ) throw new Errors.IllegalArgumentError( "BNodes cannot be fetched directly." );
		// TODO: Make named fragments independently resolvable
		/*
			if( RDF.URI.Util.hasFragment( uri ) ) throw new Errors.IllegalArgumentError( "Fragment URI's cannot be fetched directly." );
		*/

		if( !! this.context ) {
			// TODO: Check this, it may be incorrect
			if( RDF.URI.Util.isRelative( uri ) ) {
				let baseURI:string = this.context.getBaseURI();
				if( ! RDF.URI.Util.isBaseOf( baseURI, uri ) ) return null;

				return uri.substring( baseURI.length );
			} else {
				return uri;
			}
		} else {
			if( RDF.URI.Util.isRelative( uri ) ) throw new Errors.IllegalArgumentError( "This Documents instance doesn't support relative URIs." );
			return uri;
		}
	}

	private createPointer( localID:string ):Pointer.Class {
		let id:string = !! this.context ? this.context.resolve( localID ) : localID;
		let pointer:Pointer.Class = Pointer.Factory.create( id );
		Object.defineProperty( pointer, "resolve", {
			writable: false,
			enumerable: false,
			configurable: true,
			value: ():Promise<[ PersistedDocument.Class, HTTP.Response.Class ]> => {
				return this.get( id );
			},
		});

		return pointer;
	}

	private compact( expandedObjects:Object[], targetObjects:Object[], pointerLibrary:Pointer.Library ):Object[];
	private compact( expandedObject:Object, targetObject:Object, pointerLibrary:Pointer.Library ):Object;
	private compact( expandedObjectOrObjects:any, targetObjectOrObjects:any, pointerLibrary:Pointer.Library ):any {
		if( ! Utils.isArray( expandedObjectOrObjects ) ) return this.compactSingle( expandedObjectOrObjects, targetObjectOrObjects, pointerLibrary );

		let expandedObjects:Object[] = expandedObjectOrObjects;
		let targetObjects:Object[] = !! targetObjectOrObjects ? targetObjectOrObjects : [];
		for( let i:number = 0, length:number = expandedObjects.length; i < length; i++ ) {
			let expandedObject:Object = expandedObjects[ i ];
			let targetObject:Object = targetObjects[ i ] = !! targetObjects[ i ] ? targetObjects[ i ] : {};

			this.compactSingle( expandedObject, targetObject, pointerLibrary );
		}

		return targetObjects;
	}

	private compactSingle( expandedObject:Object, targetObject:Object, pointerLibrary:Pointer.Library ):Object {
		let digestedSchema:ObjectSchema.DigestedObjectSchema = this.getDigestedObjectSchemaForExpandedObject( expandedObject );

		return this.jsonldConverter.compact( expandedObject, targetObject, digestedSchema, pointerLibrary );
	}

	private getDigestedObjectSchemaForExpandedObject( expandedObject:Object ):ObjectSchema.DigestedObjectSchema {
		let types:string[] = this.getExpandedObjectTypes( expandedObject );

		return this.getDigestedObjectSchema( types );
	}

	private getDigestedObjectSchemaForDocument( document:Document.Class ):ObjectSchema.DigestedObjectSchema {
		let types:string[] = this.getDocumentTypes( document );

		return this.getDigestedObjectSchema( types );
	}

	private getDigestedObjectSchema( objectTypes:string[] ):ObjectSchema.DigestedObjectSchema {
		let digestedSchema:ObjectSchema.DigestedObjectSchema;
		if( !! this.context ) {
			let typesDigestedObjectSchemas:ObjectSchema.DigestedObjectSchema[] = [ this.context.getObjectSchema() ];
			for( let type of objectTypes ) {
				if( this.context.getObjectSchema( type ) ) typesDigestedObjectSchemas.push( this.context.getObjectSchema( type ) );
			}

			if( typesDigestedObjectSchemas.length > 1 ) {
				digestedSchema = ObjectSchema.Digester.combineDigestedObjectSchemas( typesDigestedObjectSchemas );
			} else {
				digestedSchema = typesDigestedObjectSchemas[ 0 ];
			}
		} else {
			digestedSchema = new ObjectSchema.DigestedObjectSchema();
		}

		return digestedSchema;
	}

	private getExpandedObjectTypes( expandedObject:Object ):string[] {
		if( ! expandedObject[ "@type" ] ) return [];

		return expandedObject[ "@type" ];
	}

	private getDocumentTypes( document:Document.Class ):string[] {
		if( ! document.types ) return [];
		return document.types;
	}
}

export default Documents;
