/// <reference path="../typings/es6-promise/es6-promise.d.ts" />
/// <reference path="../typings/jsonld.js/jsonld.js.d.ts" />
/// <amd-dependency path="jsonld" name="jsonld" />
declare var jsonld;

//@formatter:off
import Committer from './Committer';
import * as Errors from './Errors';
import * as HTTP from './HTTP';
import Parent from './Parent';
import * as RDF from './RDF';
import * as Utils from './Utils';

import * as Document from './Document';
import * as RDFSource from './LDP/RDFSource';
import * as LDP from './NS/LDP';
//@formatter:on

enum InteractionModel {
	RDFSource,
	Container
}

function parse( input:string ):any {
	try {
		return JSON.parse( input );
	} catch ( error ) {
		// TODO: Handle SyntaxError
		throw error;
	}
}

function expand( input:HTTP.ProcessedResponse<any>, options?:jsonld.ExpandOptions ):Promise<Object> {
	return new Promise( ( resolve, reject ) => {
		jsonld.expand( input.result, options, function ( error, expanded:Object ) {
			if ( error ) {
				// TODO: Handle jsonld.expand error
				throw error;
			}

			input.result = expanded;
			resolve( input );

		} );
	} );
}

function setPreferredInteractionModel( interactionModel:InteractionModel, requestOptions:HTTP.Request.Options ) {
	var headers = requestOptions.headers ? requestOptions.headers : requestOptions.headers = new Map<string, HTTP.Header.Class>();
	if ( ! headers.has( "Prefer" ) ) headers.set( "Prefer", new HTTP.Header.Class() );
	var prefer:HTTP.Header.Class = headers.get( "Prefer" );
	prefer.values.push( new HTTP.Header.Value( LDP.Class.RDFSource + "; rel=interaction-model" ) );
}

function setAcceptHeader( requestOptions:HTTP.Request.Options ) {
	var headers = requestOptions.headers ? requestOptions.headers : requestOptions.headers = new Map<string, HTTP.Header.Class>();
	headers.set( "Accept", new HTTP.Header.Class( "application/ld+json" ) );
}

class Documents implements Committer<Document.Class> {
	private parent:Parent;

	constructor( parent:Parent = null ) {
		this.parent = parent;
	}

	get( uri:string, requestOptions:HTTP.Request.Options = {} ):Promise<HTTP.ProcessedResponse<Document.Class>> {
		if ( RDF.URI.Util.isRelative( uri ) ) {
			if ( ! this.parent ) throw new Errors.IllegalArgumentError( "IllegalArgument: This module doesn't support relative URIs." );
			uri = this.parent.resolve( uri );
		}

		if ( this.parent && this.parent.Auth.isAuthenticated() ) this.parent.Auth.addAuthentication( requestOptions );

		setAcceptHeader( requestOptions );
		setPreferredInteractionModel( InteractionModel.RDFSource, requestOptions );

		return HTTP.Request.Service.get( uri, requestOptions ).then(
			( response:HTTP.Response ) => {
				var parsedObject = parse( response.data );

				return expand( {
					result: parsedObject,
					response: response
				} );
			}
		).then(
			( processedResponse:HTTP.ProcessedResponse<Object> ) => {
				var expandedResult:any = processedResponse.result;
				var rdfDocuments:RDF.Document.Class[] = RDF.Document.Util.getDocuments( expandedResult );
				var rdfDocument:RDF.Document.Class = this.getRDFDocument( rdfDocuments );

				var document:Document.Class = Document.factory.from( rdfDocument );

				this.injectDefinitions( (<RDF.Resource.Class[]>document.getFragments()).concat( document ) );
				// TODO: Inject persisted states

				return {
					result: document,
					response: processedResponse.response
				}
			}
		);
	}

	commit( document:Document.Class, requestOptions:HTTP.Request.Options = {} ):Promise<HTTP.Response> {
		// TODO: Check if the document was already persisted
		// TODO: Check if the document is dirty

		if ( this.parent && this.parent.Auth.isAuthenticated() ) this.parent.Auth.addAuthentication( requestOptions );

		setAcceptHeader( requestOptions );
		setPreferredInteractionModel( InteractionModel.RDFSource, requestOptions );

		return HTTP.Request.Service.put( document.uri, document.toJSON(), requestOptions );
	}

	private getRDFDocument( rdfDocuments:RDF.Document.Class[] ):RDF.Document.Class {
		if ( rdfDocuments.length === 0 ) throw new Error( 'BadResponse: No document was returned.' );
		if ( rdfDocuments.length > 1 ) throw new Error( 'Unsupported: Multiple graphs are currently not supported.' );
		return rdfDocuments[ 0 ];
	}

	private injectDefinitions( resources:RDF.Resource.Class[] ):RDF.Resource.Class[] {
		let definitionURIs:string[] = this.parent.getDefinitionURIs();

		for ( let i:number = 0, length:number = definitionURIs.length; i < length; i ++ ) {
			let definitionURI:string = definitionURIs[ i ];
			let toInject:RDF.Resource.Class[] = [];
			for ( let j:number = 0, resourcesLength:number = resources.length; j < resourcesLength; j ++ ) {
				let resource:RDF.Resource.Class = resources[ j ];
				if ( resource.types.indexOf( definitionURI ) !== - 1 ) toInject.push( resource );
			}
			if ( toInject.length > 0 ) RDF.Resource.Factory.injectDescriptions( toInject, this.parent.getDefinition( definitionURI ) );
		}

		return resources;
	}
}

export default Documents;