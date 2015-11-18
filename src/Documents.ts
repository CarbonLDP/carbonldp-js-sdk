/// <reference path="../typings/tsd.d.ts" />

import * as jsonld from "jsonld";

import Committer from "./Committer";
import * as Errors from "./Errors";
import * as HTTP from "./HTTP";
import Context from "./Context";
import * as RDF from "./RDF";
import * as Utils from "./Utils";

import * as Document from "./Document";
import * as RDFSource from "./LDP/RDFSource";
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

class Documents implements Committer<Document.Class> {
	private context:Context;

	constructor( context:Context = null ) {
		this.context = context;
	}

	get( uri:string, requestOptions:HTTP.Request.Options = {} ):Promise<HTTP.ProcessedResponse<Document.Class>> {
		if ( RDF.URI.Util.isRelative( uri ) ) {
			if ( ! this.context ) throw new Errors.IllegalArgumentError( "IllegalArgument: This module doesn't support relative URIs." );
			uri = this.context.resolve( uri );
		}

		if ( this.context && this.context.Auth.isAuthenticated() ) this.context.Auth.addAuthentication( requestOptions );

		HTTP.Request.Service.setAcceptHeader( "application/ld+json", requestOptions );
		HTTP.Request.Service.setPreferredInteractionModel( LDP.Class.RDFSource, requestOptions );

		return HTTP.Request.Service.get( uri, requestOptions ).then(
			( response:HTTP.Response ) => {
				let parsedObject:Object = parse( response.data );

				return expand( {
					result: parsedObject,
					response: response
				} );
			}
		).then(
			( processedResponse:HTTP.ProcessedResponse<Object> ) => {
				let expandedResult:any = processedResponse.result;
				let rdfDocuments:RDF.Document.Class[] = RDF.Document.Util.getDocuments( expandedResult );
				let rdfDocument:RDF.Document.Class = this.getRDFDocument( rdfDocuments );

				let document:Document.Class = Document.factory.from( rdfDocument );

				this.injectDefinitions( (<RDF.Resource.Class[]>document.getFragments()).concat( document ) );
				// TODO: Inject persisted states

				return {
					result: document,
					response: processedResponse.response
				};
			}
		);
	}

	commit( document:Document.Class, requestOptions:HTTP.Request.Options = {} ):Promise<HTTP.Response> {
		// TODO: Check if the document was already persisted
		// TODO: Check if the document is dirty

		if ( this.context && this.context.Auth.isAuthenticated() ) this.context.Auth.addAuthentication( requestOptions );

		HTTP.Request.Service.setAcceptHeader( "application/ld+json", requestOptions );
		HTTP.Request.Service.setPreferredInteractionModel( LDP.Class.RDFSource, requestOptions );

		return HTTP.Request.Service.put( document.uri, document.toJSON(), requestOptions );
	}

	private getRDFDocument( rdfDocuments:RDF.Document.Class[] ):RDF.Document.Class {
		if ( rdfDocuments.length === 0 ) throw new Error( "BadResponse: No document was returned." );
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
