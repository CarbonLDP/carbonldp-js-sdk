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

import HTTPVersionNotSupportedError from "./HTTPVersionNotSupportedError";
import HTTPError from "./../HTTPError";
import {Service} from "../../Request";

describe( module(
	"Carbon/HTTP/Errors/server/HTTPVersionNotSupportedError"
), ():void => {

	describe( clazz(
		"Carbon.HTTP.Errors.server.HTTPVersionNotSupportedError",
		"Error class that can be throw to indicate that the server does not support the HTTP protocol version used in the request"
	), ():void => {

		let response: Response;

		beforeAll( ( done:{ ():void, fail:() => void } ) => {
			jasmine.Ajax.install();
			jasmine.Ajax.stubRequest( "http://example.com/request/" ).andReturn({
				"status": 200,
				"responseText": "A response"
			});

			Service.send( "GET", "http://example.com/request/" ).then( ( _response ) => {
				response = _response;
				done();
			}).catch( done.fail );

		});

		afterAll( () => {
			jasmine.Ajax.uninstall();
		});

		it( isDefined(), ():void => {
			expect( HTTPVersionNotSupportedError ).toBeDefined();
			expect( Utils.isFunction( HTTPVersionNotSupportedError ) ).toBe( true );
		});

		it( extendsClass(
			"Carbon.Errors.HTTPError"
		), ():void => {
			let error: HTTPVersionNotSupportedError = new HTTPVersionNotSupportedError( "Message of the error", response );

			expect( error instanceof HTTPError ).toBe( true );
		});

		it( hasConstructor([
			{ name: "message", type: "string" },
			{ name: "response", type: "Carbon.HTTP.Response" }
		]), ():void => {
			let error: HTTPVersionNotSupportedError = new HTTPVersionNotSupportedError( "Message of the error", response );

			expect( error ).toBeTruthy();
			expect( error instanceof HTTPVersionNotSupportedError).toBe( true );
		});

		it( hasMethod(
			INSTANCE,
			"toString",
			{ type: "string" }
		), ():void => {
			let error: HTTPVersionNotSupportedError = new HTTPVersionNotSupportedError( "Message of the error", response );

			expect( error.toString ).toBeDefined();
			expect( Utils.isFunction( error.toString ) );

			expect( error.toString() ).toBe("HTTPVersionNotSupportedError: Message of the error");
		});

		it( hasProperty(
			INSTANCE,
			"name",
			"string"
		), ():void => {
			let error: HTTPVersionNotSupportedError = new HTTPVersionNotSupportedError( "Message of the error", response );

			expect( error.name ).toBeDefined();
			expect( Utils.isString( error.name ) ).toBe( true );

			expect( error.name ).toBe( "HTTPVersionNotSupportedError" );
		});

		it( hasProperty(
			STATIC,
			"statusCode",
			"number"
		), ():void => {
			expect( HTTPVersionNotSupportedError.statusCode ).toBeDefined();
			expect( Utils.isNumber( HTTPVersionNotSupportedError.statusCode ) );

			expect( HTTPVersionNotSupportedError.statusCode ).toBe( 505 );
		});

	});

});
