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

import RequestEntityTooLargeError from "./RequestEntityTooLargeError";
import HTTPError from "./../HTTPError";
import {Service} from "../../Request";

describe( module(
	"Carbon/HTTP/Errors/client/RequestEntityTooLargeError"
), ():void => {

	describe( clazz(
		"Carbon.HTTP.Errors.RequestEntityTooLargeError",
		"Error class to indicate that the request entity is larger than the server is able to process."
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
			expect( RequestEntityTooLargeError ).toBeDefined();
			expect( Utils.isFunction( RequestEntityTooLargeError ) ).toBe( true );
		});

		it( extendsClass(
			"Carbon.Errors.HTTPError"
		), ():void => {
			let error: RequestEntityTooLargeError = new RequestEntityTooLargeError( "Message of the error", response );

			expect( error instanceof HTTPError ).toBe( true );
		});

		it( hasConstructor([
			{ name: "message", type: "string" },
			{ name: "response", type: "Carbon.HTTP.Response" }
		]), ():void => {
			let error: RequestEntityTooLargeError = new RequestEntityTooLargeError( "Message of the error", response );

			expect( error ).toBeTruthy();
			expect( error instanceof RequestEntityTooLargeError ).toBe( true );
		});

		it( hasMethod(
			INSTANCE,
			"toString",
			{ type: "string" }
		), ():void => {
			let error: RequestEntityTooLargeError = new RequestEntityTooLargeError( "Message of the error", response );

			expect( error.toString ).toBeDefined();
			expect( Utils.isFunction( error.toString ) );

			expect( error.toString() ).toBe("RequestEntityTooLargeError: Message of the error");
		});

		it( hasProperty(
			INSTANCE,
			"name",
			"string"
		), ():void => {
			let error: RequestEntityTooLargeError = new RequestEntityTooLargeError( "Message of the error", response );

			expect( error.name ).toBeDefined();
			expect( Utils.isString( error.name ) ).toBe( true );

			expect( error.name ).toBe( "RequestEntityTooLargeError" );
		});

		it( hasProperty(
			STATIC,
			"statusCode",
			"number"
		), ():void => {
			expect( RequestEntityTooLargeError.statusCode ).toBeDefined();
			expect( Utils.isNumber( RequestEntityTooLargeError.statusCode ) );

			expect( RequestEntityTooLargeError.statusCode ).toBe( 413 );
		});

	});

});
