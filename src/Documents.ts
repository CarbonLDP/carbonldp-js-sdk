/// <reference path="../typings/es6-promise/es6-promise.d.ts" />
/// <reference path="../typings/jsonld.js/jsonld.js.d.ts" />
/// <amd-dependency path="jsonld" name="jsonld" />
declare var jsonld;

//@formatter:off
import * as HTTP from './HTTP';
import Parent from './Parent';
import * as Utils from './Utils';
import * as Errors from './Errors';
import * as RDF from './RDF';
//@formatter:on

function parse( input:string ):any {
	try {
		return JSON.parse( input );
	} catch ( error ) {
		// TODO: Handle SyntaxError
		throw error;
	}
}

function expand( input:HTTP.ProcessedResponse<any>, options?:jsonld.ExpandOptions ):Promise<Object> {
	return new Promise( function ( resolve, reject ) {
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

class Documents {
	private parent:Parent;

	constructor( parent:Parent = null ) {
		this.parent = parent;

	}

	get( uri:string, requestOptions:HTTP.Request.Options = {} ):Promise<HTTP.ProcessedResponse<RDF.Document.Class[]>> {
		if ( RDF.URI.Util.isRelative( uri ) ) {
			if ( ! this.parent ) throw new Errors.IllegalArgumentError( "IllegalArgument: This module doesn't support relative URIs." );
			uri = this.parent.resolve( uri );
		}

		var headers = requestOptions.headers ? requestOptions.headers : requestOptions.headers = new Map<string, HTTP.Header.Class>();
		headers.set( "Accept", new HTTP.Header.Class( "application/ld+json" ) );

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
				var documents:RDF.Document.Class[] = RDF.Document.Util.getDocuments( expandedResult );

				return {
					result: documents,
					response: processedResponse.response
				}
			}
		);
	}

}

export default Documents;