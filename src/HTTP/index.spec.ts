import {
	isDefined,
	module,
	reexports,
	STATIC,
} from "../test/JasmineExtender";
import * as Utils from "../Utils";

import * as HTTP from "./";
import * as Errors from "./Errors";
import * as Header from "./Header";
import { HTTPMethod } from "./HTTPMethod";
import * as JSONParser from "./JSONParser";
import * as Parser from "./Parser";
import * as Request from "./Request";
import * as Response from "./Response";
import StatusCode from "./StatusCode";
import * as StringParser from "./StringParser";

describe( module( "Carbon/HTTP" ), ():void => {

	it( isDefined(), ():void => {
		expect( HTTP ).toBeDefined();
		expect( Utils.isObject( HTTP ) ).toBe( true );
	} );

	it( reexports(
		STATIC,
		"Errors",
		"Carbon/HTTP/Errors"
	), ():void => {
		expect( HTTP.Errors ).toBeDefined();
		expect( HTTP.Errors ).toBe( Errors );
	} );

	it( reexports(
		STATIC,
		"Header",
		"Carbon/HTTP/Header"
	), ():void => {
		expect( HTTP.Header ).toBeDefined();
		expect( HTTP.Header ).toBe( Header );
	} );

	it( reexports(
		STATIC,
		"JSONParser",
		"Carbon/HTTP/JSONParser"
	), ():void => {
		expect( HTTP.JSONParser ).toBeDefined();
		expect( HTTP.JSONParser ).toBe( JSONParser );
	} );

	it( reexports(
		STATIC,
		"HTTPMethod",
		"Carbon.HTTP.HTTPMethod.HTTPMethod"
	), ():void => {
		expect( HTTP.HTTPMethod ).toBeDefined();
		expect( HTTP.HTTPMethod ).toBe( HTTPMethod );
	} );

	it( reexports(
		STATIC,
		"Parser",
		"Carbon/HTTP/Parser"
	), ():void => {
		expect( HTTP.Parser ).toBeDefined();
		expect( HTTP.Parser ).toBe( Parser );
	} );

	it( reexports(
		STATIC,
		"Request",
		"Carbon/HTTP/Request"
	), ():void => {
		expect( HTTP.Request ).toBeDefined();
		expect( HTTP.Request ).toBe( Request );
	} );

	it( reexports(
		STATIC,
		"Response",
		"Carbon/HTTP/Response"
	), ():void => {
		expect( Response ).toBeDefined();
		expect( Response ).toBe( Response );
	} );

	it( reexports(
		STATIC,
		"StatusCode",
		"Carbon.HTTP.StatusCode.StatusCode"
	), ():void => {
		expect( HTTP.StatusCode ).toBeDefined();
		expect( HTTP.StatusCode ).toBe( StatusCode );
	} );

	it( reexports(
		STATIC,
		"StringParser",
		"Carbon/HTTP/StringParser"
	), ():void => {
		expect( HTTP.StringParser ).toBeDefined();
		expect( HTTP.StringParser ).toBe( StringParser );
	} );

} );
