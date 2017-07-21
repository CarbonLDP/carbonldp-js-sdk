import * as Errors from "./../Errors";
import * as HTTP from "./../HTTP";
import * as Pointer from "./../Pointer";
import * as RDF from "./../RDF";
import * as Utils from "./../Utils";

import * as RawResults from "./RawResults";
import ResultsParser from "./RawResultsParser";
import * as SELECTResults from "./SELECTResults";


export class Class {
	private static defaultOptions:HTTP.Request.Options = {};
	private static resultsParser:ResultsParser = new ResultsParser();
	private static stringParser:HTTP.StringParser.Class = new HTTP.StringParser.Class();

	static executeRawASKQuery( url:string, askQuery:string, options:HTTP.Request.Options = {} ):Promise<[ RawResults.Class, HTTP.Response.Class ]> {
		options = Utils.extend( options, Class.defaultOptions );

		HTTP.Request.Util.setAcceptHeader( "application/sparql-results+json", options );
		HTTP.Request.Util.setContentTypeHeader( "application/sparql-query", options );

		return HTTP.Request.Service.post( url, askQuery, options, Class.resultsParser );
	}

	static executeASKQuery( url:string, askQuery:string, options:HTTP.Request.Options = {} ):Promise<[ boolean, HTTP.Response.Class ]> {
		return Class.executeRawASKQuery( url, askQuery, options ).then( ( [ rawResults, response ]:[ RawResults.Class, HTTP.Response.Class ] ):[ boolean, HTTP.Response.Class ] => {
			return [ rawResults.boolean, response ];
		} );
	}

	static executeRawSELECTQuery( url:string, selectQuery:string, options:HTTP.Request.Options = {} ):Promise<[ RawResults.Class, HTTP.Response.Class ]> {
		options = Utils.extend( options, Class.defaultOptions );

		HTTP.Request.Util.setAcceptHeader( "application/sparql-results+json", options );
		HTTP.Request.Util.setContentTypeHeader( "application/sparql-query", options );

		return HTTP.Request.Service.post( url, selectQuery, options, Class.resultsParser );
	}

	static executeSELECTQuery( url:string, selectQuery:string, pointerLibrary:Pointer.Library, options:HTTP.Request.Options = {} ):Promise<[ SELECTResults.Class, HTTP.Response.Class]> {
		return Class.executeRawSELECTQuery( url, selectQuery, options ).then( ( [ rawResults, response ]:[ RawResults.Class, HTTP.Response.Class ] ):[ SELECTResults.Class, HTTP.Response.Class] => {
			let rawBindings:RawResults.BindingObject[] = rawResults.results.bindings;
			let bindings:SELECTResults.BindingObject[] = [];

			for( let bindingColumn of rawBindings ) {
				let binding:SELECTResults.BindingObject = {};
				for( let bindingRow in bindingColumn ) {
					if( ! bindingColumn.hasOwnProperty( bindingRow ) ) continue;

					let bindingCell:RawResults.BindingProperty = bindingColumn[ bindingRow ];
					binding[ bindingRow ] = Class.parseRawBindingProperty( bindingCell, pointerLibrary );
				}
				bindings.push( binding );
			}

			let results:SELECTResults.Class = {
				vars: rawResults.head.vars,
				bindings: bindings,
			};
			return [ results, response ];
		} );
	}

	static executeRawCONSTRUCTQuery( url:string, constructQuery:string, options:HTTP.Request.Options = {} ):Promise<[ string, HTTP.Response.Class ]> {
		options = Utils.extend( options, Class.defaultOptions );

		if( HTTP.Request.Util.getHeader( "Accept", options ) === undefined ) HTTP.Request.Util.setAcceptHeader( "application/ld+json", options );
		HTTP.Request.Util.setContentTypeHeader( "application/sparql-query", options );

		return HTTP.Request.Service.post( url, constructQuery, options, Class.stringParser );
	}

	static executeRawDESCRIBEQuery( url:string, describeQuery:string, options:HTTP.Request.Options = {} ):Promise<[ string, HTTP.Response.Class ]> {
		options = Utils.extend( options, Class.defaultOptions );

		if( HTTP.Request.Util.getHeader( "Accept", options ) === undefined ) HTTP.Request.Util.setAcceptHeader( "application/ld+json", options );
		HTTP.Request.Util.setContentTypeHeader( "application/sparql-query", options );

		return HTTP.Request.Service.post( url, describeQuery, options, Class.stringParser );
	}

	static executeUPDATE( url:string, updateQuery:string, options:HTTP.Request.Options = {} ):Promise<HTTP.Response.Class> {
		options = Utils.extend( options, Class.defaultOptions );

		if( HTTP.Request.Util.getHeader( "Accept", options ) === undefined ) HTTP.Request.Util.setAcceptHeader( "application/ld+json", options );
		HTTP.Request.Util.setContentTypeHeader( "application/sparql-update", options );

		return HTTP.Request.Service.post( url, updateQuery, options );
	}

	private static parseRawBindingProperty( rawBindingProperty:RawResults.BindingProperty, pointerLibrary:Pointer.Library ):any {
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
