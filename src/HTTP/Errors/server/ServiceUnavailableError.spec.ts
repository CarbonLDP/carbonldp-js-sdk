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

import ServiceUnavailableError from "./ServiceUnavailableError";
import HTTPError from "./../HTTPError";
import {Service} from "../../Request";

describe( module(
	"Carbon/HTTP/Errors/server/ServiceUnavailableError"
), ():void => {

	describe( clazz(
		"Carbon.HTTP.Errors.server.ServiceUnavailableError",
		"Error class that can be throw to indicate that the server is currently unavailable (because it is overloaded or down for maintenance)"
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
			expect( ServiceUnavailableError ).toBeDefined();
			expect( Utils.isFunction( ServiceUnavailableError ) ).toBe( true );
		});

		it( extendsClass(
			"Carbon.Errors.HTTPError"
		), ():void => {
			let error: ServiceUnavailableError = new ServiceUnavailableError( "Message of the error", response );

			expect( error instanceof HTTPError ).toBe( true );
		});

		it( hasConstructor([
			{ name: "message", type: "string" },
			{ name: "response", type: "Carbon.HTTP.Response" }
		]), ():void => {
			let error: ServiceUnavailableError = new ServiceUnavailableError( "Message of the error", response );

			expect( error ).toBeTruthy();
			expect( error instanceof ServiceUnavailableError).toBe( true );
		});

		it( hasMethod(
			INSTANCE,
			"toString",
			{ type: "string" }
		), ():void => {
			let error: ServiceUnavailableError = new ServiceUnavailableError( "Message of the error", response );

			expect( error.toString ).toBeDefined();
			expect( Utils.isFunction( error.toString ) );

			expect( error.toString() ).toBe("ServiceUnavailableError: Message of the error");
		});

		it( hasProperty(
			INSTANCE,
			"name",
			"string"
		), ():void => {
			let error: ServiceUnavailableError = new ServiceUnavailableError( "Message of the error", response );

			expect( error.name ).toBeDefined();
			expect( Utils.isString( error.name ) ).toBe( true );

			expect( error.name ).toBe( "ServiceUnavailableError" );
		});

		it( hasProperty(
			STATIC,
			"statusCode",
			"number"
		), ():void => {
			expect( ServiceUnavailableError.statusCode ).toBeDefined();
			expect( Utils.isNumber( ServiceUnavailableError.statusCode ) );

			expect( ServiceUnavailableError.statusCode ).toBe( 503 );
		});

	});

});
