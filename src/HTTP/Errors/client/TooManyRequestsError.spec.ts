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

import TooManyRequestsError from "./TooManyRequestsError";
import HTTPError from "./../HTTPError";
import {Service} from "../../Request";

describe( module(
	"Carbon/HTTP/Errors/client/TooManyRequestsError"
), ():void => {

	describe( clazz(
		"Carbon.HTTP.Errors.client.TooManyRequestsError",
		"Error class to indicate that the current user has sent too many request in a given amount of time."
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
			expect( TooManyRequestsError ).toBeDefined();
			expect( Utils.isFunction( TooManyRequestsError ) ).toBe( true );
		});

		it( extendsClass(
			"Carbon.Errors.HTTPError"
		), ():void => {
			let error: TooManyRequestsError = new TooManyRequestsError( "Message of the error", response );

			expect( error instanceof HTTPError ).toBe( true );
		});

		it( hasConstructor([
			{ name: "message", type: "string" },
			{ name: "response", type: "Carbon.HTTP.Response" }
		]), ():void => {
			let error: TooManyRequestsError = new TooManyRequestsError( "Message of the error", response );

			expect( error ).toBeTruthy();
			expect( error instanceof TooManyRequestsError).toBe( true );
		});

		it( hasMethod(
			INSTANCE,
			"toString",
			{ type: "string" }
		), ():void => {
			let error: TooManyRequestsError = new TooManyRequestsError( "Message of the error", response );

			expect( error.toString ).toBeDefined();
			expect( Utils.isFunction( error.toString ) );

			expect( error.toString() ).toBe("TooManyRequestsError: Message of the error");
		});

		it( hasProperty(
			INSTANCE,
			"name",
			"string"
		), ():void => {
			let error: TooManyRequestsError = new TooManyRequestsError( "Message of the error", response );

			expect( error.name ).toBeDefined();
			expect( Utils.isString( error.name ) ).toBe( true );

			expect( error.name ).toBe( "TooManyRequestsError" );
		});

		it( hasProperty(
			STATIC,
			"statusCode",
			"number"
		), ():void => {
			expect( TooManyRequestsError.statusCode ).toBeDefined();
			expect( Utils.isNumber( TooManyRequestsError.statusCode ) );

			expect( TooManyRequestsError.statusCode ).toBe( 429 );
		});

	});

});
