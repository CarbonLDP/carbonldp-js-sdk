/// <reference path="./../../typings/typings.d.ts" />

import * as HTTP from "./../HTTP";
import * as Utils from "./../Utils";


import RawResults from "./RawResults";
import ResultsParser from "./RawResultsParser";

export class Class {
	private static defaultOptions:HTTP.Request.Options = {};
	private static resultsParser:ResultsParser = new ResultsParser();
	private static stringParser:HTTP.StringParser.Class = new HTTP.StringParser.Class();

	static executeRawASKQuery( url:string, askQuery:string, options:HTTP.Request.Options = {} ):Promise<[ RawResults, HTTP.Response.Class ]> {
		options = Utils.extend( options, Class.defaultOptions );

		HTTP.Request.Util.setAcceptHeader( "application/sparql-results+json", options );
		HTTP.Request.Util.setContentTypeHeader( "application/sparql-query", options );

		return HTTP.Request.Service.post( url, askQuery, options, Class.resultsParser );
	}

	static executeRawSELECTQuery( url:string, selectQuery:string, options:HTTP.Request.Options = {} ):Promise<[ RawResults, HTTP.Response.Class ]> {
		options = Utils.extend( options, Class.defaultOptions );

		HTTP.Request.Util.setAcceptHeader( "application/sparql-results+json", options );
		HTTP.Request.Util.setContentTypeHeader( "application/sparql-query", options );

		return HTTP.Request.Service.post( url, selectQuery, options, Class.resultsParser );
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
}

export default Class;
