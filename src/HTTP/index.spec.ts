import {
	isDefined,
	module,
	reexports,
	STATIC,
} from "../test/JasmineExtender";
import * as Utils from "../Utils";

import * as HTTP from "./";

import * as Errors from "./Errors";
import { Header } from "./Header";
import { HTTPMethod } from "./HTTPMethod";
import { JSONParser } from "./JSONParser";
import { Parser } from "./Parser";
import {
	GETOptions,
	RequestOptions,
	RequestService,
	RequestUtils,
	RetrievalPreferences,
} from "./Request";
import { Response } from "./Response";
import { StatusCode } from "./StatusCode";
import { StringParser } from "./StringParser";

describe( module( "carbonldp/HTTP" ), ():void => {

	it( isDefined(), ():void => {
		expect( HTTP ).toBeDefined();
		expect( Utils.isObject( HTTP ) ).toBe( true );
	} );

	it( reexports(
		STATIC,
		"Errors",
		"carbonldp/HTTP/Errors"
	), ():void => {
		expect( HTTP.Errors ).toBeDefined();
		expect( HTTP.Errors ).toBe( Errors );
	} );

	it( reexports(
		STATIC,
		"Header",
		"CarbonLDP.HTTP.Header"
	), ():void => {
		expect( HTTP.Header ).toBeDefined();
		expect( HTTP.Header ).toBe( Header );
	} );

	it( reexports(
		STATIC,
		"JSONParser",
		"CarbonLDP.HTTP.JSONParser"
	), ():void => {
		expect( HTTP.JSONParser ).toBeDefined();
		expect( HTTP.JSONParser ).toBe( JSONParser );
	} );

	it( reexports(
		STATIC,
		"HTTPMethod",
		"CarbonLDP.HTTP.HTTPMethod"
	), ():void => {
		expect( HTTP.HTTPMethod ).toBeDefined();
		expect( HTTP.HTTPMethod ).toBe( HTTPMethod );
	} );

	it( reexports(
		STATIC,
		"Parser",
		"CarbonLDP.HTTP.Parser"
	), ():void => {
		const target:HTTP.Parser<any> = {} as Parser<any>;
		expect( target ).toBeDefined();
	} );

	it( reexports(
		STATIC,
		"GETOptions",
		"CarbonLDP.HTTP.GETOptions"
	), ():void => {
		const target:HTTP.GETOptions = {} as GETOptions;
		expect( target ).toBeDefined();
	} );

	it( reexports(
		STATIC,
		"RequestOptions",
		"CarbonLDP.HTTP.RequestOptions"
	), ():void => {
		const target:HTTP.RequestOptions = {} as RequestOptions;
		expect( target ).toBeDefined();
	} );

	it( reexports(
		STATIC,
		"RequestService",
		"CarbonLDP.HTTP.RequestService"
	), ():void => {
		expect( HTTP.RequestService ).toBeDefined();
		expect( HTTP.RequestService ).toBe( RequestService );
	} );

	it( reexports(
		STATIC,
		"RequestUtils",
		"CarbonLDP.HTTP.RequestUtils"
	), ():void => {
		expect( HTTP.RequestUtils ).toBeDefined();
		expect( HTTP.RequestUtils ).toBe( RequestUtils );
	} );

	it( reexports(
		STATIC,
		"RetrievalPreferences",
		"CarbonLDP.HTTP.RetrievalPreferences"
	), ():void => {
		const target:HTTP.RetrievalPreferences = {} as RetrievalPreferences;
		expect( target ).toBeDefined();
	} );

	it( reexports(
		STATIC,
		"Response",
		"CarbonLDP.HTTP.Response"
	), ():void => {
		expect( Response ).toBeDefined();
		expect( Response ).toBe( Response );
	} );

	it( reexports(
		STATIC,
		"StatusCode",
		"CarbonLDP.HTTP.StatusCode"
	), ():void => {
		expect( HTTP.StatusCode ).toBeDefined();
		expect( HTTP.StatusCode ).toBe( StatusCode );
	} );

	it( reexports(
		STATIC,
		"StringParser",
		"CarbonLDP.HTTP.StringParser"
	), ():void => {
		expect( HTTP.StringParser ).toBeDefined();
		expect( HTTP.StringParser ).toBe( StringParser );
	} );

} );
