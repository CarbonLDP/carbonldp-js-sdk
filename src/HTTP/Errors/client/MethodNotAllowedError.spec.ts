import {
	INSTANCE,
	STATIC,

	module,
	clazz,

	isDefined,
	extendsClass,
	hasConstructor,
	hasProperty,
	hasMethod
} from "./../../../test/JasmineExtender";
import * as Utils from "./../../../Utils";

import Response from "./../../Response";

import MethodNotAllowedError from "./MethodNotAllowedError";
import HTTPError from "./../HTTPError";

describe( module(
	"Carbon/HTTP/Errors/client/MethodNotAllowedError"
), ():void => {

	describe( clazz(
		"Carbon.HTTP.Errors.client.MethodNotAllowedError",
		"Error class that can be throw to indicate that the current user does not have the required permissions to fulfill the request"
	), ():void => {

		let response: Response;

		beforeEach(function() {
			jasmine.Ajax.install();
			jasmine.Ajax.stubRequest("/a/request/").andReturn({
				"status": 200,
				"responseText": "A response"
			});

			let request = new XMLHttpRequest();
			request.open( "GET", "/a/request/");
			request.send();

			response = new Response( request );
		});

		afterEach(function() {
			jasmine.Ajax.uninstall();
		});

		it( isDefined(), ():void => {
			expect( MethodNotAllowedError ).toBeDefined();
			expect( Utils.isFunction( MethodNotAllowedError ) ).toBe( true );
		});

		it( extendsClass(
			"Carbon.Errors.HTTPError"
		), ():void => {
			let error: MethodNotAllowedError = new MethodNotAllowedError( "Message of the error", response );

			expect( error instanceof HTTPError ).toBe( true );
		});

		it( hasConstructor([
			{ name: "message", type: "string" },
			{ name: "response", type: "Carbon.HTTP.Response" }
		]), ():void => {
			let error: MethodNotAllowedError = new MethodNotAllowedError( "Message of the error", response );

			expect( error ).toBeTruthy();
			expect( error instanceof MethodNotAllowedError).toBe( true );
		});

		it( hasMethod(
			INSTANCE,
			"toString",
			{ type: "string" }
		), ():void => {
			let error: MethodNotAllowedError = new MethodNotAllowedError( "Message of the error", response );

			expect( error.toString ).toBeDefined();
			expect( Utils.isFunction( error.toString ) );

			expect( error.toString() ).toBe("MethodNotAllowedError: Message of the error");
		});

		it( hasProperty(
			INSTANCE,
			"name",
			"string"
		), ():void => {
			let error: MethodNotAllowedError = new MethodNotAllowedError( "Message of the error", response );

			expect( error.name ).toBeDefined();
			expect( Utils.isString( error.name ) ).toBe( true );

			expect( error.name ).toBe( "MethodNotAllowedError" );
		});

		it( hasProperty(
			STATIC,
			"statusCode",
			"number"
		), ():void => {
			expect( MethodNotAllowedError.statusCode ).toBeDefined();
			expect( Utils.isNumber( MethodNotAllowedError.statusCode ) );

			expect( MethodNotAllowedError.statusCode ).toBe( 405 );
		});

	});

});
