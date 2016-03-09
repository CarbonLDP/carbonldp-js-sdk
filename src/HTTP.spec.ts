/// <reference path="./../typings/typings.d.ts" />

import {
	INSTANCE,
	STATIC,

	module,

	isDefined,
	reexports
} from "./test/JasmineExtender";
import * as Utils from "./Utils";

import * as Errors from "./HTTP/Errors";
import * as Header from "./HTTP/Header";
import * as JSONParser from "./HTTP/JSONParser";
import * as JSONLDParser from "./HTTP/JSONLDParser";
import Method from "./HTTP/Method";
import * as Parser from "./HTTP/Parser";
import * as Request from "./HTTP/Request";
import * as Response from "./HTTP/Response";
import StatusCode from "./HTTP/StatusCode";
import * as StringParser from "./HTTP/StringParser";

import * as HTTP from "./HTTP";

describe( module( "Carbon/HTTP" ), ():void => {

	it( isDefined(), ():void => {
		expect( HTTP ).toBeDefined();
		expect( Utils.isObject( HTTP ) ).toBe( true );
	});

	it( reexports(
		STATIC,
		"Errors",
		"Carbon/HTTP/Errors"
	), ():void => {
		expect( HTTP.Errors ).toBeDefined();
		expect( HTTP.Errors ).toBe( Errors );
	});

	it( reexports(
		STATIC,
		"Header",
		"Carbon/HTTP/Header"
	), ():void => {
		expect( HTTP.Header ).toBeDefined();
		expect( HTTP.Header ).toBe( Header );
	});

	it( reexports(
		STATIC,
		"JSONParser",
		"Carbon/HTTP/JSONParser"
	), ():void => {
		expect( HTTP.JSONParser ).toBeDefined();
		expect( HTTP.JSONParser ).toBe( JSONParser );
	});

	it( reexports(
		STATIC,
		"JSONLDParser",
		"Carbon/HTTP/JSONLDParser"
	), ():void => {
		expect( HTTP.JSONLDParser ).toBeDefined();
		expect( HTTP.JSONLDParser ).toBe( JSONLDParser );
	});

	it( reexports(
		STATIC,
		"Method",
		"Carbon/HTTP/Method"
	), ():void => {
		expect( HTTP.Method ).toBeDefined();
		expect( HTTP.Method ).toBe( Method );
	});

	it( reexports(
		STATIC,
		"Parser",
		"Carbon/HTTP/Parser"
	), ():void => {
		expect( HTTP.Parser ).toBeDefined();
		expect( HTTP.Parser ).toBe( Parser );
	});

	it( reexports(
		STATIC,
		"Request",
		"Carbon/HTTP/Request"
	), ():void => {
		expect( HTTP.Request ).toBeDefined();
		expect( HTTP.Request ).toBe( Request );
	});

	it( reexports(
		STATIC,
		"Response",
		"Carbon/HTTP/Response"
	), ():void => {
		expect( HTTP.Response ).toBeDefined();
		expect( HTTP.Response ).toBe( Response );
	});

	it( reexports(
		STATIC,
		"StatusCode",
		"Carbon/HTTP/StatusCode"
	), ():void => {
		expect( HTTP.StatusCode ).toBeDefined();
		expect( HTTP.StatusCode ).toBe( StatusCode );
	});

	it( reexports(
		STATIC,
		"StringParser",
		"Carbon/HTTP/StringParser"
	), ():void => {
		expect( HTTP.StringParser ).toBeDefined();
		expect( HTTP.StringParser ).toBe( StringParser );
	});
});