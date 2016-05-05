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

import RequestURITooLongError from "./RequestURITooLongError";
import HTTPError from "./../HTTPError";
import {Service} from "../../Request";

describe( module(
	"Carbon/HTTP/Errors/client/RequestURITooLongError"
), ():void => {

	describe( clazz(
		"Carbon.HTTP.Errors.client.RequestURITooLongError",
		"Error class that can be throw to indicate that the server is no able to process the request because its URI is too long"
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
			expect( RequestURITooLongError ).toBeDefined();
			expect( Utils.isFunction( RequestURITooLongError ) ).toBe( true );
		});

		it( extendsClass(
			"Carbon.Errors.HTTPError"
		), ():void => {
			let error: RequestURITooLongError = new RequestURITooLongError( "Message of the error", response );

			expect( error instanceof HTTPError ).toBe( true );
		});

		it( hasConstructor([
			{ name: "message", type: "string" },
			{ name: "response", type: "Carbon.HTTP.Response" }
		]), ():void => {
			let error: RequestURITooLongError = new RequestURITooLongError( "Message of the error", response );

			expect( error ).toBeTruthy();
			expect( error instanceof RequestURITooLongError).toBe( true );
		});

		it( hasMethod(
			INSTANCE,
			"toString",
			{ type: "string" }
		), ():void => {
			let error: RequestURITooLongError = new RequestURITooLongError( "Message of the error", response );

			expect( error.toString ).toBeDefined();
			expect( Utils.isFunction( error.toString ) );

			expect( error.toString() ).toBe("RequestURITooLongError: Message of the error");
		});

		it( hasProperty(
			INSTANCE,
			"name",
			"string"
		), ():void => {
			let error: RequestURITooLongError = new RequestURITooLongError( "Message of the error", response );

			expect( error.name ).toBeDefined();
			expect( Utils.isString( error.name ) ).toBe( true );

			expect( error.name ).toBe( "RequestURITooLongError" );
		});

		it( hasProperty(
			STATIC,
			"statusCode",
			"number"
		), ():void => {
			expect( RequestURITooLongError.statusCode ).toBeDefined();
			expect( Utils.isNumber( RequestURITooLongError.statusCode ) );

			expect( RequestURITooLongError.statusCode ).toBe( 414 );
		});

	});

});
