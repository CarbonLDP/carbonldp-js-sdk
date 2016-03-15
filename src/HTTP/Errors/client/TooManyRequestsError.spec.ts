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

import TooManyRequestsError from "./TooManyRequestsError";
import HTTPError from "./../HTTPError";

describe( module(
	"Carbon/HTTP/Errors/client/TooManyRequestsError"
), ():void => {

	describe( clazz(
		"Carbon.HTTP.Errors.client.TooManyRequestsError",
		"Error class that can be throw to indicate that the current user has sent too many request in a given amount of time"
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
			expect( TooManyRequestsError ).toBeDefined();
			expect( Utils.isFunction( TooManyRequestsError ) ).toBe( true );
		});

		it( extendsClass(
			"Carbon.Errors.HTTPError"
		), ():void => {
			let error: TooManyRequestsError = new TooManyRequestsError( "Message of the error", response );

			expect( error instanceof HTTPError ).toBe( true );
		});

		it( hasConstructor([
			{ name: "message", type: "string" },
			{ name: "response", type: "Carbon.HTTP.Response" }
		]), ():void => {
			let error: TooManyRequestsError = new TooManyRequestsError( "Message of the error", response );

			expect( error ).toBeTruthy();
			expect( error instanceof TooManyRequestsError).toBe( true );
		});

		it( hasMethod(
			INSTANCE,
			"toString",
			{ type: "string" }
		), ():void => {
			let error: TooManyRequestsError = new TooManyRequestsError( "Message of the error", response );

			expect( error.toString ).toBeDefined();
			expect( Utils.isFunction( error.toString ) );

			expect( error.toString() ).toBe("TooManyRequestsError: Message of the error");
		});

		it( hasProperty(
			INSTANCE,
			"name",
			"string"
		), ():void => {
			let error: TooManyRequestsError = new TooManyRequestsError( "Message of the error", response );

			expect( error.name ).toBeDefined();
			expect( Utils.isString( error.name ) ).toBe( true );

			expect( error.name ).toBe( "TooManyRequestsError" );
		});

		it( hasProperty(
			STATIC,
			"statusCode",
			"number"
		), ():void => {
			expect( TooManyRequestsError.statusCode ).toBeDefined();
			expect( Utils.isNumber( TooManyRequestsError.statusCode ) );

			expect( TooManyRequestsError.statusCode ).toBe( 429 );
		});

	});

});
