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
} from "../../../test/JasmineExtender";
import * as Utils from "../../../Utils";

import Response from "../../Response";

import InternalServerError from "./InternalServerError";
import HTTPError from "../HTTPError";

describe( module(
	"Carbon/HTTP/Errors/server/InternalServerError"
), ():void => {

	describe( clazz(
		"Carbon.HTTP.Errors.server.InternalServerError",
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
			expect( InternalServerError ).toBeDefined();
			expect( Utils.isFunction( InternalServerError ) ).toBe( true );
		});

		it( extendsClass(
			"Carbon.Errors.HTTPError"
		), ():void => {
			let error: InternalServerError = new InternalServerError( "Message of the error", response );

			expect( error instanceof HTTPError ).toBe( true );
		});

		it( hasConstructor([
			{ name: "message", type: "string" },
			{ name: "response", type: "Carbon.HTTP.Response" }
		]), ():void => {
			let error: InternalServerError = new InternalServerError( "Message of the error", response );

			expect( error ).toBeTruthy();
			expect( error instanceof InternalServerError).toBe( true );
		});

		it( hasMethod(
			INSTANCE,
			"toString",
			{ type: "string" }
		), ():void => {
			let error: InternalServerError = new InternalServerError( "Message of the error", response );

			expect( error.toString ).toBeDefined();
			expect( Utils.isFunction( error.toString ) );

			expect( error.toString() ).toBe("InternalServerError: Message of the error");
		});

		it( hasProperty(
			INSTANCE,
			"name",
			"string"
		), ():void => {
			let error: InternalServerError = new InternalServerError( "Message of the error", response );

			expect( error.name ).toBeDefined();
			expect( Utils.isString( error.name ) ).toBe( true );

			expect( error.name ).toBe( "InternalServerError" );
		});

		it( hasProperty(
			STATIC,
			"statusCode",
			"number"
		), ():void => {
			expect( InternalServerError.statusCode ).toBeDefined();
			expect( Utils.isNumber( InternalServerError.statusCode ) );

			expect( InternalServerError.statusCode ).toBe( 500 );
		});

	});

});
