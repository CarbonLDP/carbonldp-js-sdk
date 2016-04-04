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

import UnauthorizedError from "./UnauthorizedError";
import HTTPError from "./../HTTPError";

describe( module(
	"Carbon/HTTP/Errors/client/UnauthorizedError"
), ():void => {

	describe( clazz(
		"Carbon.HTTP.Errors.client.UnauthorizedError",
		"Error class that can be throw to indicate that authentication is required or has failed"
	), ():void => {

		let response: Response;

		beforeEach(function() {
			jasmine.Ajax.install();
			jasmine.Ajax.stubRequest( "/a/request/" ).andReturn({
				"status": 200,
				"responseText": "A response"
			});

			let request = new XMLHttpRequest();
			request.open( "GET", "/a/request/" );
			request.send();

			response = new Response( request );
		});

		afterEach(function() {
			jasmine.Ajax.uninstall();
		});

		it( isDefined(), ():void => {
			expect( UnauthorizedError ).toBeDefined();
			expect( Utils.isFunction( UnauthorizedError ) ).toBe( true );
		});

		it( extendsClass(
			"Carbon.Errors.HTTPError"
		), ():void => {
			let error: UnauthorizedError = new UnauthorizedError( "Message of the error", response );

			expect( error instanceof HTTPError ).toBe( true );
		});

		it( hasConstructor([
			{ name: "message", type: "string" },
			{ name: "response", type: "Carbon.HTTP.Response" }
		]), ():void => {
			let error: UnauthorizedError = new UnauthorizedError( "Message of the error", response );

			expect( error ).toBeTruthy();
			expect( error instanceof UnauthorizedError).toBe( true );
		});

		it( hasMethod(
			INSTANCE,
			"toString",
			{ type: "string" }
		), ():void => {
			let error: UnauthorizedError = new UnauthorizedError( "Message of the error", response );

			expect( error.toString ).toBeDefined();
			expect( Utils.isFunction( error.toString ) );

			expect( error.toString() ).toBe("UnauthorizedError: Message of the error");
		});

		it( hasProperty(
			INSTANCE,
			"name",
			"string"
		), ():void => {
			let error: UnauthorizedError = new UnauthorizedError( "Message of the error", response );

			expect( error.name ).toBeDefined();
			expect( Utils.isString( error.name ) ).toBe( true );

			expect( error.name ).toBe( "UnauthorizedError" );
		});

		it( hasProperty(
			STATIC,
			"statusCode",
			"number"
		), ():void => {
			expect( UnauthorizedError.statusCode ).toBeDefined();
			expect( Utils.isNumber( UnauthorizedError.statusCode ) );

			expect( UnauthorizedError.statusCode ).toBe( 401 );
		});

	});

});
