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
} from "./../../test/JasmineExtender";
import * as Utils from "./../../Utils";

import Response from "./../Response";

import UnknownError from "./UnknownError";
import HTTPError from "./HTTPError";

describe( module(
	"Carbon/HTTP/Errors/UnknownError"
), ():void => {

	describe( clazz(
		"Carbon.HTTP.Errors.UnknownError",
		"Error class that defines any error that can not be identified"
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
			expect( UnknownError ).toBeDefined();
			expect( Utils.isFunction( UnknownError ) ).toBe( true );
		});

		it( extendsClass(
			"Carbon.Errors.HTTPError"
		), ():void => {
			let error: UnknownError = new UnknownError( "Message of the error", response );

			expect( error instanceof HTTPError ).toBe( true );
		});

		it( hasConstructor([
			{ name: "message", type: "string" },
			{ name: "response", type: "Carbon.HTTP.Response" }
		]), ():void => {
			let error: UnknownError = new UnknownError( "Message of the error", response );

			expect( error ).toBeTruthy();
			expect( error instanceof UnknownError).toBe( true );
		});

		it( hasMethod(
			INSTANCE,
			"toString",
			{ type: "string" }
		), ():void => {
			let error: UnknownError = new UnknownError( "Message of the error", response );

			expect( error.toString ).toBeDefined();
			expect( Utils.isFunction( error.toString ) );

			expect( error.toString() ).toBe("UnknownError: Message of the error");
		});

		it( hasProperty(
			INSTANCE,
			"name",
			"string"
		), ():void => {
			let error: UnknownError = new UnknownError( "Message of the error", response );

			expect( error.name ).toBeDefined();
			expect( Utils.isString( error.name ) ).toBe( true );

			expect( error.name ).toBe( "UnknownError" );
		});

		it( hasProperty(
			STATIC,
			"statusCode",
			"number"
		), ():void => {
			expect( UnknownError.statusCode ).toBeDefined();
			expect( Utils.isNumber( UnknownError.statusCode ) );
			expect( UnknownError.statusCode ).toBeNull();
		});

	});

});
