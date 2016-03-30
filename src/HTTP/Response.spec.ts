import {
	INSTANCE,
	STATIC,

	module,
	clazz,
	method,

	isDefined,
	hasConstructor,
	hasMethod,
	hasProperty,
	hasDefaultExport
} from "./../test/JasmineExtender";
import * as Utils from "./../Utils";
import * as Header from "./Header";

import * as Response from "./Response";
import DefaultExport from "./Response";

describe( module(
	"Carbon/HTTP/Response"
), ():void => {

	let request: XMLHttpRequest;
	let response: Response.Class;
	let rawResponse: JasmineAjaxRequestStubReturnOptions = {
		"status": 200,
		"responseText": "A body response",
		responseHeaders: {
			"Content-Type": "text/plain",
			"Server": "Apache/2.4.1 (Unix)",
			"ETag": 'W/"123456789"'
		}
	};

	it( isDefined(), ():void => {
		expect( Utils.isObject( Response) ).toBe( true );
		expect( Response ).toBeDefined();
	});

	describe( clazz(
		"Carbon.HTTP.Response.Class",
		"Class that represents an HTTP Response"
	), ():void => {

		beforeEach( ():void => {
			jasmine.Ajax.install();
			jasmine.Ajax.stubRequest( "/a/request/" ).andReturn( rawResponse );

			request = new XMLHttpRequest();
			request.open( "GET", "/a/request/" );
			request.send();
		});

		afterEach( ():void => {
			jasmine.Ajax.uninstall();
		});

		it( isDefined(), ():void => {
			expect( Response.Class ).toBeDefined();
			expect( Utils.isFunction( Response.Class ) ).toBe( true );
		});

		it( hasConstructor([
			{ name: "request", type: "XMLHttpRequest" }
		]), ():void => {
			response = new Response.Class( request );

			expect( response ).toBeDefined();
			expect( response instanceof Response.Class ).toBe( true );
		});

		it( hasProperty(
			INSTANCE,
			"status",
			"number",
			"The status code returned by the request"
		), ():void => {
			response = new Response.Class( request );

			expect( response.status ).toBeDefined();
			expect( Utils.isNumber( response.status ) ).toBe( true );

			expect( response.status ).toBe( rawResponse.status );
		});

		it( hasProperty(
			INSTANCE,
			"data",
			"string",
			"The body returned by the request"
		), ():void => {
			response = new Response.Class( request );

			expect( response.data ).toBeDefined();
			expect( Utils.isString( response.data ) ).toBe( true );

			expect( response.data ).toBe( rawResponse.responseText );
		});

		it( hasProperty(
			INSTANCE,
			"headers",
			"Map<string, Carbon.HTTP.Header.Class>",
			"A map object containing the headers returned by the request"
		), ():void => {
			response = new Response.Class( request );

			expect( response.headers ).toBeDefined();
			expect( Utils.isMap( response.headers ) ).toBe( true );

			let objectKeys:Array<string> = Object.keys( rawResponse.responseHeaders );
			expect( response.headers.size ).toBe( objectKeys.length );
			for (let header of objectKeys ) {
				expect( response.getHeader( header) ).toEqual( new Header.Class( rawResponse.responseHeaders[ header ] ) );
			}
		});

		it( hasProperty(
			INSTANCE,
			"request",
			"XMLHttpRequest",
			"The XMLHttpRequest object that was provided in the constructor"
		), ():void => {
			response = new Response.Class( request );

			expect( response.request ).toBeDefined();
			expect( response.request instanceof XMLHttpRequest ).toBe( true );

			expect( response.request ).toBe( request );
		});
		
		it( hasMethod(
			INSTANCE,
			"getHeader",
			"Return the Header object referred by the name provided.", [
				{ name: "name", type: "string" }
			],
			{ type: "Carbon.HTTP.Header.Class" }
		), ():void => {
			response = new Response.Class( request );

			expect( response.getHeader ).toBeDefined();
			expect( Utils.isFunction( response.getHeader ) ).toBe( true );

			let header:Header.Class = response.getHeader( "Content-Type" );
			expect( header instanceof Header.Class ).toBe( true );
		});

	});

	describe( clazz(
		"Carbon.HTTP.Response.Util",
		"Class with useful methods to use with a `Carbon.HTTP.Response.Class` object"
	), ():void => {

		beforeEach( ():void => {
			jasmine.Ajax.install();
			jasmine.Ajax.stubRequest( "/a/request/full/" ).andReturn( rawResponse );
			jasmine.Ajax.stubRequest( "/a/request/empty/" ).andReturn( {} );
		});

		afterEach( ():void => {
			jasmine.Ajax.uninstall();
		});

		it( isDefined(), ():void => {
			expect( Response.Util ).toBeDefined();
			expect( Utils.isFunction( Response.Util ) ).toBe( true );
		});

		it( hasMethod(
			STATIC,
			"getETag",
			"Return the ETag string header of a `Carbon.HTTP.Response.Class` object. Returns null if no ETag exists", [
				{ name: "response", type: "Carbon.HTTP.Response.Class" }
			],
			{ type: "string" }
		), ():void => {
			expect( Response.Util.getETag ).toBeDefined();
			expect( Utils.isFunction( Response.Util.getETag ) ).toBe( true );

			request = new XMLHttpRequest();
			request.open( "GET", "/a/request/full/" );
			request.send();
			response = new Response.Class( request );
			expect( Response.Util.getETag( response ) ).toBe( rawResponse.responseHeaders[ "ETag" ] );

			request = new XMLHttpRequest();
			request.open( "GET", "/a/request/empty/" );
			request.send();
			response = new Response.Class( request );
			expect( Response.Util.getETag( response ) ).toBeNull();
		});

	});

	it( hasDefaultExport(
		"Carbon.HTTP.Response.Class"
	), ():void => {
		expect( DefaultExport ).toBe( Response.Class );
	});

});
