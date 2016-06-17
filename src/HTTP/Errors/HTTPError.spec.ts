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
} from "./../../test/JasmineExtender";
import * as Utils from "./../../Utils";

import Response from "./../Response";

import HTTPError from "./HTTPError";
import AbstractError from "./../../Errors/AbstractError";
import {Service} from "../Request";

describe( module(
	"Carbon/HTTP/Errors/HTTPError"
), ():void => {

	describe( clazz(
		"Carbon.HTTP.Errors.HTTPError",
		"Error class for define any type of HTTP Error used in the SDK."
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
			expect( error instanceof HTTPError ).toBe( true );
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
