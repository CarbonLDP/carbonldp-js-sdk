/// <reference path="./../../typings/typings.d.ts" />

import * as HTTP from "./../HTTP";
import * as Utils from "./../Utils";

import Results from "./Results";
import ResultsParser from "./ResultsParser";

export default class Class {
	private static defaultOptions:HTTP.Request.Options = {};
	private static parser:ResultsParser = new ResultsParser();

	static executeSELECTQuery( url:string, selectQuery:string, options:HTTP.Request.Options = {} ):Promise<[ Results, HTTP.Response.Class ]> {
		options = Utils.extend( options, Class.defaultOptions );

		HTTP.Request.Util.setAcceptHeader( "application/sparql-results+json", options );
		HTTP.Request.Util.setContentTypeHeader( "application/sparql-query", options );

		return HTTP.Request.Service.post( url, selectQuery, options, Class.parser );
	}
}
