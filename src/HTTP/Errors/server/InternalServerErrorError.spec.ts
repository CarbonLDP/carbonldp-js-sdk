/// <reference path="../../../../typings/typings.d.ts" />

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

import InternalServerErrorError from "./InternalServerErrorError";
import HTTPError from "./../HTTPError";

describe( module(
	"Carbon/HTTP/Errors/server/InternalServerErrorError"
), ():void => {

	describe( clazz(
		"Carbon.HTTP.Errors.server.InternalServerErrorError",
		"Error class that can be throw to indicate that the server encountered an unexpected condition. This generic error is given when no more specific message is suitable"
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
			expect( InternalServerErrorError ).toBeDefined();
			expect( Utils.isFunction( InternalServerErrorError ) ).toBe( true );
		});

		it( extendsClass(
			"Carbon.Errors.HTTPError"
		), ():void => {
			let error: InternalServerErrorError = new InternalServerErrorError( "Message of the error", response );

			expect( error instanceof HTTPError ).toBe( true );
		});

		it( hasConstructor([
			{ name: "message", type: "string" },
			{ name: "response", type: "Carbon.HTTP.Response" }
		]), ():void => {
			let error: InternalServerErrorError = new InternalServerErrorError( "Message of the error", response );

			expect( error ).toBeTruthy();
			expect( error instanceof InternalServerErrorError).toBe( true );
		});

		it( hasMethod(
			INSTANCE,
			"toString",
			{ type: "string" }
		), ():void => {
			let error: InternalServerErrorError = new InternalServerErrorError( "Message of the error", response );

			expect( error.toString ).toBeDefined();
			expect( Utils.isFunction( error.toString ) );

			expect( error.toString() ).toBe("InternalServerErrorError: Message of the error");
		});

		it( hasProperty(
			INSTANCE,
			"name",
			"string"
		), ():void => {
			let error: InternalServerErrorError = new InternalServerErrorError( "Message of the error", response );

			expect( error.name ).toBeDefined();
			expect( Utils.isString( error.name ) ).toBe( true );

			expect( error.name ).toBe( "InternalServerErrorError" );
		});

		it( hasProperty(
			STATIC,
			"statusCode",
			"number"
		), ():void => {
			expect( InternalServerErrorError.statusCode ).toBeDefined();
			expect( Utils.isNumber( InternalServerErrorError.statusCode ) );

			expect( InternalServerErrorError.statusCode ).toBe( 500 );
		});

	});

});
