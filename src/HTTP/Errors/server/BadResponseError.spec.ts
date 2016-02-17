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

import BadResponseError from "./BadResponseError";
import HTTPError from "../HTTPError";

describe( module(
	"Carbon/HTTP/Errors/server/BadResponseError"
), ():void => {

	describe( clazz(
		"Carbon.HTTP.Errors.server.BadResponseError",
		"Error class that can be throw to indicate that the response obtained can not is note the expected or cannot be interpreted"
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
			expect( BadResponseError ).toBeDefined();
			expect( Utils.isFunction( BadResponseError ) ).toBe( true );
		});

		it( extendsClass(
			"Carbon.Errors.HTTPError"
		), ():void => {
			let error: BadResponseError = new BadResponseError( "Message of the error", response );

			expect( error instanceof HTTPError ).toBe( true );
		});

		it( hasConstructor([
			{ name: "message", type: "string" },
			{ name: "response", type: "Carbon.HTTP.Response" }
		]), ():void => {
			let error: BadResponseError = new BadResponseError( "Message of the error", response );

			expect( error ).toBeTruthy();
			expect( error instanceof BadResponseError).toBe( true );
		});

		it( hasMethod(
			INSTANCE,
			"toString",
			{ type: "string" }
		), ():void => {
			let error: BadResponseError = new BadResponseError( "Message of the error", response );

			expect( error.toString ).toBeDefined();
			expect( Utils.isFunction( error.toString ) );

			expect( error.toString() ).toBe("BadResponseError: Message of the error");
		});

		it( hasProperty(
			INSTANCE,
			"name",
			"string"
		), ():void => {
			let error: BadResponseError = new BadResponseError( "Message of the error", response );

			expect( error.name ).toBeDefined();
			expect( Utils.isString( error.name ) ).toBe( true );

			expect( error.name ).toBe( "BadResponseError" );
		});

		it( hasProperty(
			STATIC,
			"statusCode",
			"number"
		), ():void => {
			expect( BadResponseError.statusCode ).toBeDefined();
			expect( Utils.isNumber( BadResponseError.statusCode ) );

			expect( BadResponseError.statusCode ).toBe( 0 );
		});

	});

});
