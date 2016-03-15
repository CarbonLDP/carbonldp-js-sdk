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

import NotImplementedError from "./NotImplementedError";
import HTTPError from "./../HTTPError";

describe( module(
	"Carbon/HTTP/Errors/server/NotImplementedError"
), ():void => {

	describe( clazz(
		"Carbon.HTTP.Errors.server.NotImplementedError",
		"Error class that can be throw to indicate that the server does not have the ability to fulfill the request yet"
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
			expect( NotImplementedError ).toBeDefined();
			expect( Utils.isFunction( NotImplementedError ) ).toBe( true );
		});

		it( extendsClass(
			"Carbon.Errors.HTTPError"
		), ():void => {
			let error: NotImplementedError = new NotImplementedError( "Message of the error", response );

			expect( error instanceof HTTPError ).toBe( true );
		});

		it( hasConstructor([
			{ name: "message", type: "string" },
			{ name: "response", type: "Carbon.HTTP.Response" }
		]), ():void => {
			let error: NotImplementedError = new NotImplementedError( "Message of the error", response );

			expect( error ).toBeTruthy();
			expect( error instanceof NotImplementedError).toBe( true );
		});

		it( hasMethod(
			INSTANCE,
			"toString",
			{ type: "string" }
		), ():void => {
			let error: NotImplementedError = new NotImplementedError( "Message of the error", response );

			expect( error.toString ).toBeDefined();
			expect( Utils.isFunction( error.toString ) );

			expect( error.toString() ).toBe("NotImplementedError: Message of the error");
		});

		it( hasProperty(
			INSTANCE,
			"name",
			"string"
		), ():void => {
			let error: NotImplementedError = new NotImplementedError( "Message of the error", response );

			expect( error.name ).toBeDefined();
			expect( Utils.isString( error.name ) ).toBe( true );

			expect( error.name ).toBe( "NotImplementedError" );
		});

		it( hasProperty(
			STATIC,
			"statusCode",
			"number"
		), ():void => {
			expect( NotImplementedError.statusCode ).toBeDefined();
			expect( Utils.isNumber( NotImplementedError.statusCode ) );

			expect( NotImplementedError.statusCode ).toBe( 501 );
		});

	});

});
