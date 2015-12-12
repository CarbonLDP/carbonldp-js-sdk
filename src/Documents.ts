/// <reference path="../typings/tsd.d.ts" />

import * as jsonld from "jsonld";

import Committer from "./Committer";
import * as Errors from "./Errors";
import * as HTTP from "./HTTP";
import Context from "./Context";
import * as RDF from "./RDF";
import * as Utils from "./Utils";

import * as ContextDigester from "./ContextDigester";
import * as Document from "./Document";
import * as Fragment from "./Fragment";
import * as JSONLDConverter from "./JSONLDConverter";
import * as PersistedDocument from "./PersistedDocument";
import * as Pointer from "./Pointer";
import * as NamedFragment from "./NamedFragment";
import * as NS from "./NS";

import * as LDP from "./NS/LDP";

function parse( input:string ):any {
	try {
		return JSON.parse( input );
	} catch ( error ) {
		// TODO: Handle SyntaxError
		throw error;
	}
}

function expand( input:HTTP.ProcessedResponse<any>, options?:jsonld.ExpandOptions ):Promise<Object> {
	return new Promise( ( resolve:( result:Object ) => void, reject:( error:any ) => void ) => {
		jsonld.expand( input.result, options, function ( error:any, expanded:Object ):void {
			if ( error ) {
				// TODO: Handle jsonld.expand error
				throw error;
			}

			input.result = expanded;
			resolve( input );
		} );
	} );
}

class Documents implements Pointer.Library, Pointer.Validator {
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
		let id:string = Pointer.Factory.is( idOrPointer ) ? idOrPointer.uri : idOrPointer;

		if( RDF.URI.Util.isBNodeID( id ) ) return false;
		if( RDF.URI.Util.hasFragment( id ) ) return false;

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

	get( uri:string, requestOptions:HTTP.Request.Options = {} ):Promise<HTTP.ProcessedResponse<PersistedDocument.Class>> {
		let pointerID:string = this.getPointerID( uri );
		if( !! this.context ) uri = this.context.resolve( uri );

		if( this.pointers.has( pointerID ) ) {
			// TODO: Check if the pointer has been already resolved and refresh it
		}

		if ( this.context && this.context.Auth.isAuthenticated() ) this.context.Auth.addAuthentication( requestOptions );

		HTTP.Request.Util.setAcceptHeader( "application/ld+json", requestOptions );
		HTTP.Request.Util.setPreferredInteractionModel( LDP.Class.RDFSource, requestOptions );

		return HTTP.Request.Service.get( uri, requestOptions ).then(
			( response:HTTP.Response.Class ) => {
				let parsedObject:Object = parse( response.data );

				return expand( {
					result: parsedObject,
					response: response,
				} );
			}
		).then(
			( processedResponse:HTTP.ProcessedResponse<Object> ) => {
				let etag:string = HTTP.Response.Util.getETag( processedResponse.response );
				if( etag === null ) throw new HTTP.Errors.BadResponseError( "The response doesn't contain an ETag", processedResponse.response );

				let expandedResult:any = processedResponse.result;
				let rdfDocuments:RDF.Document.Class[] = RDF.Document.Util.getDocuments( expandedResult );
				let rdfDocument:RDF.Document.Class = this.getRDFDocument( rdfDocuments, processedResponse.response );

				let documentResources:RDF.Node.Class[] = RDF.Document.Util.getDocumentResources( rdfDocument );
				if( documentResources.length > 1 ) throw new HTTP.Errors.BadResponseError( "The RDFDocument contains more than one document resource.", processedResponse.response );
				if( documentResources.length === 0 ) throw new HTTP.Errors.BadResponseError( "The RDFDocument doesn\'t contain a document resource.", processedResponse.response );

				let documentResource:RDF.Node.Class = documentResources[ 0 ];
				let fragmentResources:RDF.Node.Class[] = RDF.Document.Util.getBNodeResources( rdfDocument );
				let namedFragmentResources:RDF.Node.Class[] = RDF.Document.Util.getFragmentResources( rdfDocument );

				let documentPointer:Pointer.Class = this.getPointer( uri );

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
				return {
					result: document,
					response: processedResponse.response,
				};
			}
		);
	}

	createChild( parentURI:string, child:Document.Class, requestOptions:HTTP.Request.Options = {} ):Promise<HTTP.Response.Class> {
		// TODO: Validate that the child is not persisted already

		if ( this.context && this.context.Auth.isAuthenticated() ) this.context.Auth.addAuthentication( requestOptions );

		HTTP.Request.Util.setAcceptHeader( "application/ld+json", requestOptions );
		HTTP.Request.Util.setContentTypeHeader( "application/ld+json", requestOptions );
		HTTP.Request.Util.setPreferredInteractionModel( LDP.Class.Container, requestOptions );

		// return HTTP.Request.Service.post( parentURI,
	}

	save( persistedDocument:PersistedDocument.Class, requestOptions:HTTP.Request.Options = {} ):Promise<HTTP.Response.Class> {
		if( ! persistedDocument.isDirty() ) return new Promise<HTTP.Response.Class>( ( resolve:( result:HTTP.Response.Class ) => void ) => {
			resolve( null );
		});

		if ( this.context && this.context.Auth.isAuthenticated() ) this.context.Auth.addAuthentication( requestOptions );

		HTTP.Request.Util.setAcceptHeader( "application/ld+json", requestOptions );
		HTTP.Request.Util.setContentTypeHeader( "application/ld+json", requestOptions );
		HTTP.Request.Util.setPreferredInteractionModel( LDP.Class.RDFSource, requestOptions );
		HTTP.Request.Util.setIfMatchHeader( persistedDocument._etag, requestOptions );

		return HTTP.Request.Service.put( persistedDocument.uri, persistedDocument.toJSON(), requestOptions );
	}

	delete( persistedDocument:PersistedDocument.Class, requestOptions:HTTP.Request.Options = {} ):Promise<HTTP.Response.Class> {
		if ( this.context && this.context.Auth.isAuthenticated() ) this.context.Auth.addAuthentication( requestOptions );

		HTTP.Request.Util.setAcceptHeader( "application/ld+json", requestOptions );
		HTTP.Request.Util.setPreferredInteractionModel( LDP.Class.RDFSource, requestOptions );
		HTTP.Request.Util.setIfMatchHeader( persistedDocument._etag, requestOptions );

		return HTTP.Request.Service.delete( persistedDocument.uri, persistedDocument.toJSON(), requestOptions );
	}

	private getRDFDocument( rdfDocuments:RDF.Document.Class[], response:HTTP.Response.Class ):RDF.Document.Class {
		if ( rdfDocuments.length === 0 ) throw new HTTP.Errors.BadResponseError( "No document was returned.", response );
		if ( rdfDocuments.length > 1 ) throw new Error( "Unsupported: Multiple graphs are currently not supported." );
		return rdfDocuments[ 0 ];
	}

	private getPointerID( uri:string ):string {
		if( RDF.URI.Util.isBNodeID( uri ) ) throw new Errors.IllegalArgumentError( "BNodes cannot be fetched directly." );
		if( RDF.URI.Util.hasFragment( uri ) ) throw new Errors.IllegalArgumentError( "Fragment URI's cannot be fetched directly." );

		if( !! this.context ) {
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
		let uri:string = !! this.context ? this.context.resolve( localID ) : localID;
		return {
			uri: uri,
			resolve: function():Promise<void> {
				// TODO
				return null;
			},
		};
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
		let digestedContext:ContextDigester.DigestedContext;
		if( !! this.context ) {
			let types:string[] = this.getExpandedObjectTypes( expandedObject );

			let typesDigestedContexts:ContextDigester.DigestedContext[] = [];
			for( let type of types ) {
				if( this.context.hasClassContext( type ) ) typesDigestedContexts.push( this.context.getClassContext( type ) );
			}

			if( typesDigestedContexts.length === 0 ) {
				digestedContext = this.context.getMainContext();
			} else {
				digestedContext = ContextDigester.Class.combineDigestedContexts( typesDigestedContexts );
			}
		} else {
			digestedContext = new ContextDigester.DigestedContext();
		}

		return this.jsonldConverter.compact( expandedObject, targetObject, digestedContext, pointerLibrary );

	}

	private getExpandedObjectTypes( expandedObject:Object ):string[] {
		let types:string[] = [];
		if( ! expandedObject[ NS.RDF.Predicate.type ] ) return types;

		for( let typeObject of expandedObject[ NS.RDF.Predicate.type ] ) {
			if( ! typeObject[ "@id" ] ) continue;
			types.push( typeObject[ "@id" ] );
		}

		return types;
	}
}

export default Documents;
