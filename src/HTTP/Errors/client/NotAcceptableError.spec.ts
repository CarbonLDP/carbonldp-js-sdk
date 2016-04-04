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

import NotAcceptableError from "./NotAcceptableError";
import HTTPError from "./../HTTPError";

describe( module(
	"Carbon/HTTP/Errors/client/NotAcceptableError"
), ():void => {

	describe( clazz(
		"Carbon.HTTP.Errors.client.NotAcceptableError",
		"Error class that can be throw to indicate that the server cannot respond with the accept-header specified in the request"
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
			expect( NotAcceptableError ).toBeDefined();
			expect( Utils.isFunction( NotAcceptableError ) ).toBe( true );
		});

		it( extendsClass(
			"Carbon.Errors.HTTPError"
		), ():void => {
			let error: NotAcceptableError = new NotAcceptableError( "Message of the error", response );

			expect( error instanceof HTTPError ).toBe( true );
		});

		it( hasConstructor([
			{ name: "message", type: "string" },
			{ name: "response", type: "Carbon.HTTP.Response" }
		]), ():void => {
			let error: NotAcceptableError = new NotAcceptableError( "Message of the error", response );

			expect( error ).toBeTruthy();
			expect( error instanceof NotAcceptableError).toBe( true );
		});

		it( hasMethod(
			INSTANCE,
			"toString",
			{ type: "string" }
		), ():void => {
			let error: NotAcceptableError = new NotAcceptableError( "Message of the error", response );

			expect( error.toString ).toBeDefined();
			expect( Utils.isFunction( error.toString ) );

			expect( error.toString() ).toBe("NotAcceptableError: Message of the error");
		});

		it( hasProperty(
			INSTANCE,
			"name",
			"string"
		), ():void => {
			let error: NotAcceptableError = new NotAcceptableError( "Message of the error", response );

			expect( error.name ).toBeDefined();
			expect( Utils.isString( error.name ) ).toBe( true );

			expect( error.name ).toBe( "NotAcceptableError" );
		});

		it( hasProperty(
			STATIC,
			"statusCode",
			"number"
		), ():void => {
			expect( NotAcceptableError.statusCode ).toBeDefined();
			expect( Utils.isNumber( NotAcceptableError.statusCode ) );

			expect( NotAcceptableError.statusCode ).toBe( 406 );
		});

	});

});
