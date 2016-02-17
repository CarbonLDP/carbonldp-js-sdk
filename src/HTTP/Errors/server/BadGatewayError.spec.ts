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

import BadGatewayError from "./BadGatewayError";
import HTTPError from "../HTTPError";

describe( module(
	"Carbon/HTTP/Errors/server/BadGatewayError"
), ():void => {

	describe( clazz(
		"Carbon.HTTP.Errors.server.BadGatewayError",
		"Error class that can be throw to indicate that the server was acting as a gateway or proxy and received an invalid response from the upstream server"
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
			expect( BadGatewayError ).toBeDefined();
			expect( Utils.isFunction( BadGatewayError ) ).toBe( true );
		});

		it( extendsClass(
			"Carbon.Errors.HTTPError"
		), ():void => {
			let error: BadGatewayError = new BadGatewayError( "Message of the error", response );

			expect( error instanceof HTTPError ).toBe( true );
		});

		it( hasConstructor([
			{ name: "message", type: "string" },
			{ name: "response", type: "Carbon.HTTP.Response" }
		]), ():void => {
			let error: BadGatewayError = new BadGatewayError( "Message of the error", response );

			expect( error ).toBeTruthy();
			expect( error instanceof BadGatewayError).toBe( true );
		});

		it( hasMethod(
			INSTANCE,
			"toString",
			{ type: "string" }
		), ():void => {
			let error: BadGatewayError = new BadGatewayError( "Message of the error", response );

			expect( error.toString ).toBeDefined();
			expect( Utils.isFunction( error.toString ) );

			expect( error.toString() ).toBe("BadGatewayError: Message of the error");
		});

		it( hasProperty(
			INSTANCE,
			"name",
			"string"
		), ():void => {
			let error: BadGatewayError = new BadGatewayError( "Message of the error", response );

			expect( error.name ).toBeDefined();
			expect( Utils.isString( error.name ) ).toBe( true );

			expect( error.name ).toBe( "BadGatewayError" );
		});

		it( hasProperty(
			STATIC,
			"statusCode",
			"number"
		), ():void => {
			expect( BadGatewayError.statusCode ).toBeDefined();
			expect( Utils.isNumber( BadGatewayError.statusCode ) );

			expect( BadGatewayError.statusCode ).toBe( 502 );
		});

	});

});
