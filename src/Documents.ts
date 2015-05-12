/// <reference path="../typings/es6-promise/es6-promise.d.ts" />
/// <reference path="../typings/jsonld.js/jsonld.js.d.ts" />
/// <amd-dependency path="jsonld" name="jsonld" />
declare
var jsonld;

import * as HTTP from './HTTP';
import Parent from './Parent';
import * as REST from './REST';
import * as Utils from './Utils';
import * as RDF from './RDF';

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
			if ( ! error ) {
				input.result = expanded;
				resolve( input );
			} else reject( error );
		} );
	} );
}

class Documents {
	private parent:Parent;

	constructor( parent:Parent = null ) {
		this.parent = parent;

	}

	get( uri:string ):Promise<HTTP.ProcessedResponse<RDF.RDFDocument.Class>> {
		if ( RDF.URI.Util.isRelative( uri ) ) {
			if ( ! this.parent ) throw new Error( "IllegalArgument: This module doesn't support relative URIs." );
			uri = this.parent.resolve( uri );
		}

		return REST.get( uri ).then(
			function ( response:HTTP.Response ) {
				var parsedObject = parse( response.data );

				return expand( {
					result: parsedObject,
					response: response
				} );
			}
		).then(
			function ( processedResponse:HTTP.ProcessedResponse<Object> ) {
				var expandedResult:any = processedResponse.result;
				if ( ! Utils.isArray( expandedResult ) ) {
					if ( RDF.RDFDocument.Factory.is( expandedResult ) ) return processedResponse;
					expandedResult = [ expandedResult ];
				}

				var uri:string;
				// TODO: Get URI
				var document:RDF.RDFDocument.Class = RDF.RDFDocument.Factory.create( uri, expandedResult );

				return {
					result: document,
					response: processedResponse.response
				}
			}
		);
	}

}

export default Documents;