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

import BadRequestError from "./BadRequestError";
import HTTPError from "../HTTPError";

describe( module(
	"Carbon/HTTP/Errors/BadRequestError"
), ():void => {

	describe( clazz(
		"Carbon.HTTP.Errors.BadRequestError",
		"Error class that can be throw to indicate has been send a request that doesn"
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
			expect( BadRequestError ).toBeDefined();
			expect( Utils.isFunction( BadRequestError ) ).toBe( true );
		});

		it( extendsClass(
			"Carbon.Errors.HTTPError"
		), ():void => {
			let error: BadRequestError = new BadRequestError( "Message of the error", response );

			expect( error instanceof HTTPError ).toBe( true );
		});

		it( hasConstructor([
			{ name: "message", type: "string" },
			{ name: "response", type: "Carbon.HTTP.Response" }
		]), ():void => {
			let error: BadRequestError = new BadRequestError( "Message of the error", response );

			expect( error ).toBeTruthy();
			expect( error instanceof BadRequestError).toBe( true );
		});

		it( hasMethod(
			INSTANCE,
			"toString",
			{ type: "string" }
		), ():void => {
			let error: BadRequestError = new BadRequestError( "Message of the error", response );

			expect( error.toString ).toBeDefined();
			expect( Utils.isFunction( error.toString ) );

			expect( error.toString() ).toBe("BadRequestError: Message of the error");
		});

		it( hasProperty(
			INSTANCE,
			"name",
			"string"
		), ():void => {
			let error: BadRequestError = new BadRequestError( "Message of the error", response );

			expect( error.name ).toBeDefined();
			expect( Utils.isString( error.name ) ).toBe( true );

			expect( error.name ).toBe( "BadRequestError" );
		});

		it( hasProperty(
			STATIC,
			"statusCode",
			"number"
		), ():void => {
			expect( BadRequestError.statusCode ).toBeDefined();
			expect( Utils.isNumber( BadRequestError.statusCode ) );
			expect( BadRequestError.statusCode ).toBe( 400 );
		});

	});

});
