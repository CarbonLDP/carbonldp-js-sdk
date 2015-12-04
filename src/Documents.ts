/// <reference path="../typings/tsd.d.ts" />

import * as jsonld from "jsonld";

import Committer from "./Committer";
import * as Errors from "./Errors";
import * as HTTP from "./HTTP";
import Context from "./Context";
import * as RDF from "./RDF";
import * as Utils from "./Utils";

import * as Document from "./Document";
import * as PersistedDocument from "./PersistedDocument";

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

class Documents {
	private context:Context;

	constructor( context:Context ) {
		this.context = context;
	}

	get( uri:string, requestOptions:HTTP.Request.Options = {} ):Promise<HTTP.ProcessedResponse<PersistedDocument.Class>> {
		if ( RDF.URI.Util.isRelative( uri ) ) {
			if ( ! this.context ) throw new Errors.IllegalArgumentError( "IllegalArgument: This module doesn't support relative URIs." );
			uri = this.context.resolve( uri );
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
				let expandedResult:any = processedResponse.result;
				let rdfDocuments:RDF.Document.Class[] = RDF.Document.Util.getDocuments( expandedResult );
				let rdfDocument:RDF.Document.Class = this.getRDFDocument( rdfDocuments, processedResponse.response );

				let document:Document.Class = Document.factory.from( rdfDocument );
				this.injectBehaviors( ( <RDF.Resource.Class[]>document.getFragments() ).concat( document ) );
				this.injectDefinitions( ( <RDF.Resource.Class[]>document.getFragments() ).concat( document ) );

				return {
					result: document,
					response: processedResponse.response,
				};
			}
		).then(
			( processedResponse:HTTP.ProcessedResponse<Document.Class> ) => {
				let document:Document.Class = processedResponse.result;

				let persistedDocument:PersistedDocument.Class = PersistedDocument.Factory.from( document, this.context );

				let etag:string = HTTP.Response.Util.getETag( processedResponse.response );
				if( etag === null ) throw new HTTP.Errors.BadResponseError( "The response doesn't contain an ETag", processedResponse.response );

				persistedDocument._etag = etag;

				// TODO: Inject persisted container behavior

				return {
					result: persistedDocument,
					response: processedResponse.response,
				};
			}
		);
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

	private injectDefinitions( resources:RDF.Resource.Class[] ):RDF.Resource.Class[] {
		let definitionURIs:string[] = this.context.getDefinitionURIs();

		for ( let i:number = 0, length:number = definitionURIs.length; i < length; i ++ ) {
			let definitionURI:string = definitionURIs[ i ];
			let toInject:RDF.Resource.Class[] = [];
			for ( let j:number = 0, resourcesLength:number = resources.length; j < resourcesLength; j ++ ) {
				let resource:RDF.Resource.Class = resources[ j ];
				if ( resource.types.indexOf( definitionURI ) !== - 1 ) toInject.push( resource );
			}
			if ( toInject.length > 0 ) RDF.Resource.Factory.injectDescriptions( toInject, this.context.getDefinition( definitionURI ) );
		}

		return resources;
	}
}

export default Documents;
