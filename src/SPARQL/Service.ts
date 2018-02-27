import * as Errors from "../Errors";
import * as HTTP from "../HTTP";
import { Response } from "../HTTP/Response";
import { StringParser } from "../HTTP/StringParser";
import { PointerLibrary } from "../Pointer";
import * as RDF from "./../RDF";

import * as RawResults from "./RawResults";
import ResultsParser from "./RawResultsParser";
import * as SELECTResults from "./SELECTResults";


export class Class {
	private static defaultOptions:HTTP.Request.Options = {};
	private static resultsParser:ResultsParser = new ResultsParser();
	private static stringParser:StringParser = new StringParser();

	static executeRawASKQuery( url:string, askQuery:string, options:HTTP.Request.Options = {} ):Promise<[ RawResults.Class, Response ]> {
		options = Object.assign( options, Class.defaultOptions );

		HTTP.Request.Util.setAcceptHeader( "application/sparql-results+json", options );
		HTTP.Request.Util.setContentTypeHeader( "application/sparql-query", options );

		return HTTP.Request.Service.post( url, askQuery, options, Class.resultsParser );
	}

	static executeASKQuery( url:string, askQuery:string, options:HTTP.Request.Options = {} ):Promise<[ boolean, Response ]> {
		return Class
			.executeRawASKQuery( url, askQuery, options )
			.then<[ boolean, Response ]>( ( [ rawResults, response ]:[ RawResults.Class, Response ] ) => {
				return [ rawResults.boolean, response ];
			} );
	}

	static executeRawSELECTQuery( url:string, selectQuery:string, options:HTTP.Request.Options = {} ):Promise<[ RawResults.Class, Response ]> {
		options = Object.assign( options, Class.defaultOptions );

		HTTP.Request.Util.setAcceptHeader( "application/sparql-results+json", options );
		HTTP.Request.Util.setContentTypeHeader( "application/sparql-query", options );

		return HTTP.Request.Service.post( url, selectQuery, options, Class.resultsParser );
	}

	static executeSELECTQuery<T>( url:string, selectQuery:string, pointerLibrary:PointerLibrary, options:HTTP.Request.Options = {} ):Promise<[ SELECTResults.Class<T>, Response ]> {
		return Class
			.executeRawSELECTQuery( url, selectQuery, options )
			.then<[ SELECTResults.Class<T>, Response ]>( ( [ rawResults, response ]:[ RawResults.Class, Response ] ) => {
				let rawBindings:RawResults.BindingObject[] = rawResults.results.bindings;
				let bindings:T[] = [];

				for( let bindingColumn of rawBindings ) {
					let binding:T = {} as T;
					for( let bindingRow in bindingColumn ) {
						if( ! bindingColumn.hasOwnProperty( bindingRow ) ) continue;

						let bindingCell:RawResults.BindingProperty = bindingColumn[ bindingRow ];
						binding[ bindingRow ] = Class.parseRawBindingProperty( bindingCell, pointerLibrary );
					}
					bindings.push( binding );
				}

				let results:SELECTResults.Class<T> = {
					vars: rawResults.head.vars,
					bindings: bindings,
				};
				return [ results, response ];
			} );
	}

	static executeRawCONSTRUCTQuery( url:string, constructQuery:string, options:HTTP.Request.Options = {} ):Promise<[ string, Response ]> {
		options = Object.assign( options, Class.defaultOptions );

		if( HTTP.Request.Util.getHeader( "Accept", options ) === undefined ) HTTP.Request.Util.setAcceptHeader( "application/ld+json", options );
		HTTP.Request.Util.setContentTypeHeader( "application/sparql-query", options );

		return HTTP.Request.Service.post( url, constructQuery, options, Class.stringParser );
	}

	static executeRawDESCRIBEQuery( url:string, describeQuery:string, options:HTTP.Request.Options = {} ):Promise<[ string, Response ]> {
		options = Object.assign( options, Class.defaultOptions );

		if( HTTP.Request.Util.getHeader( "Accept", options ) === undefined ) HTTP.Request.Util.setAcceptHeader( "application/ld+json", options );
		HTTP.Request.Util.setContentTypeHeader( "application/sparql-query", options );

		return HTTP.Request.Service.post( url, describeQuery, options, Class.stringParser );
	}

	static executeUPDATE( url:string, updateQuery:string, options:HTTP.Request.Options = {} ):Promise<Response> {
		options = Object.assign( options, Class.defaultOptions );

		if( HTTP.Request.Util.getHeader( "Accept", options ) === undefined ) HTTP.Request.Util.setAcceptHeader( "application/ld+json", options );
		HTTP.Request.Util.setContentTypeHeader( "application/sparql-update", options );

		return HTTP.Request.Service.post( url, updateQuery, options );
	}

	private static parseRawBindingProperty( rawBindingProperty:RawResults.BindingProperty, pointerLibrary:PointerLibrary ):any {
		switch( rawBindingProperty.type ) {
			case "uri":
				return pointerLibrary.getPointer( rawBindingProperty.value );
			case "bnode":
				throw new Errors.NotImplementedError( "BNodes cannot be queried directly" );
			case "literal":
				if( "datatype" in rawBindingProperty ) {
					return RDF.Literal.Factory.parse( rawBindingProperty.value, rawBindingProperty.datatype );
				} else {
					return RDF.Literal.Factory.parse( rawBindingProperty.value );
				}
			default:
				throw new Errors.IllegalArgumentError( "The bindingProperty has an unsupported type" );
		}
	}

}

export default Class;
