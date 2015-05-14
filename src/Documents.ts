/// <reference path="../typings/es6-promise/es6-promise.d.ts" />
/// <reference path="../typings/jsonld.js/jsonld.js.d.ts" />
/// <amd-dependency path="jsonld" name="jsonld" />
declare
var jsonld;

//@formatter:off
import * as HTTP from './HTTP';
import Parent from './Parent';
import * as REST from './REST';
import * as Utils from './Utils';
import {
	RDFDocument,
	URI
} from './RDF';
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
			if ( ! error ) {
				input.result = expanded;
				resolve( input );
			} else reject( error );
		} );
	} );
}

function setDocumentURI( document:RDFDocument.Class, response:HTTP.Response ):void {
	// TODO: Implement
}

class Documents {
	private parent:Parent;

	constructor( parent:Parent = null ) {
		this.parent = parent;

	}

	get( uri:string ):Promise<HTTP.ProcessedResponse<RDFDocument.Class[]>> {
		if ( URI.Util.isRelative( uri ) ) {
			if ( ! this.parent ) throw new Error( "IllegalArgument: This module doesn't support relative URIs." );
			uri = this.parent.resolve( uri );
		}

		return REST.get( uri ).then(
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
				var documents:RDFDocument.Class[] = RDFDocument.Util.getDocuments( expandedResult );

				if ( documents.length === 1 ) {
					if ( ! Utils.hasProperty( documents[ 0 ], '@id' ) ) setDocumentURI( documents[ 0 ], processedResponse.response );
				}

				return {
					result: documents,
					response: processedResponse.response
				}
			}
		);
	}

}

export default Documents;