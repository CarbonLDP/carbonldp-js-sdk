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

import ConflictError from "./ConflictError";
import HTTPError from "../HTTPError";

describe( module(
	"Carbon/HTTP/Errors/ConflictError"
), ():void => {

	describe( clazz(
		"Carbon.HTTP.Errors.ConflictError",
		"Error class that can be throw to indicate that the request could not be processed because of conflict in the request, such as an ID conflict"
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
			expect( ConflictError ).toBeDefined();
			expect( Utils.isFunction( ConflictError ) ).toBe( true );
		});

		it( extendsClass(
			"Carbon.Errors.HTTPError"
		), ():void => {
			let error: ConflictError = new ConflictError( "Message of the error", response );

			expect( error instanceof HTTPError ).toBe( true );
		});

		it( hasConstructor([
			{ name: "message", type: "string" },
			{ name: "response", type: "Carbon.HTTP.Response" }
		]), ():void => {
			let error: ConflictError = new ConflictError( "Message of the error", response );

			expect( error ).toBeTruthy();
			expect( error instanceof ConflictError).toBe( true );
		});

		it( hasMethod(
			INSTANCE,
			"toString",
			{ type: "string" }
		), ():void => {
			let error: ConflictError = new ConflictError( "Message of the error", response );

			expect( error.toString ).toBeDefined();
			expect( Utils.isFunction( error.toString ) );

			expect( error.toString() ).toBe("ConflictError: Message of the error");
		});

		it( hasProperty(
			INSTANCE,
			"name",
			"string"
		), ():void => {
			let error: ConflictError = new ConflictError( "Message of the error", response );

			expect( error.name ).toBeDefined();
			expect( Utils.isString( error.name ) ).toBe( true );

			expect( error.name ).toBe( "ConflictError" );
		});

		it( hasProperty(
			STATIC,
			"statusCode",
			"number"
		), ():void => {
			expect( ConflictError.statusCode ).toBeDefined();
			expect( Utils.isNumber( ConflictError.statusCode ) );
			expect( ConflictError.statusCode ).toBe( 409 );
		});

	});

});
