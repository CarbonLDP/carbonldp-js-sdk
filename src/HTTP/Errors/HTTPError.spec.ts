/// <reference path="../../../typings/typings.d.ts" />

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
} from "../../test/JasmineExtender";
import * as Utils from "../../Utils";

import Response from "../Response";

import HTTPError from "./HTTPError";
import AbstractError from "../../Errors/AbstractError";

describe( module(
	"Carbon/HTTP/Errors/HTTPError"
), ():void => {

	describe( clazz(
		"Carbon.HTTP.Errors.HTTPError",
		"Error class for define any type of HTTP Error occurred"
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
			expect( HTTPError ).toBeDefined();
			expect( Utils.isFunction( HTTPError ) ).toBe( true );
		});

		it( extendsClass(
			"Carbon.Errors.AbstractError"
		), ():void => {
			let error: HTTPError = new HTTPError( "Message of the error", response );

			expect( error instanceof AbstractError ).toBe( true );
		});

		it( hasConstructor([
			{ name: "message", type: "string" },
			{ name: "response", type: "Carbon.HTTP.Response" }
		]), ():void => {
			let error: HTTPError = new HTTPError( "Message of the error", response );

			expect( error ).toBeTruthy();
			expect( error instanceof HTTPError).toBe( true );
		});

		it( hasMethod(
			INSTANCE,
			"toString",
			{ type: "string" }
		), ():void => {
			let error: HTTPError = new HTTPError( "Message of the error", response );

			expect( error.toString ).toBeDefined();
			expect( Utils.isFunction( error.toString ) );

			expect( error.toString() ).toBe("HTTPError: Message of the error");
		});

		it( hasProperty(
			INSTANCE,
			"name",
			"string"
		), ():void => {
			let error: HTTPError = new HTTPError( "Message of the error", response );

			expect( error.name ).toBeDefined();
			expect( Utils.isString( error.name ) ).toBe( true );

			expect( error.name ).toBe( "HTTPError" );
		});

		it( hasProperty(
			STATIC,
			"statusCode",
			"number"
		), ():void => {
			expect( HTTPError.statusCode ).toBeDefined();
			expect( Utils.isNumber( HTTPError.statusCode ) );
			expect( HTTPError.statusCode ).toBeNull();
		});

	});

});
