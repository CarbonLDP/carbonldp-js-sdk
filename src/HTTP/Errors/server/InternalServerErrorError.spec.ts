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

import InternalServerErrorError from "./InternalServerErrorError";
import HTTPError from "./../HTTPError";
import {Service} from "../../Request";

describe( module(
	"Carbon/HTTP/Errors/server/InternalServerErrorError"
), ():void => {

	describe( clazz(
		"Carbon.HTTP.Errors.server.InternalServerErrorError",
		"Error class to indicate that the server encountered an unexpected condition. This generic error is given when no more specific is suitable."
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
			expect( InternalServerErrorError ).toBeDefined();
			expect( Utils.isFunction( InternalServerErrorError ) ).toBe( true );
		});

		it( extendsClass(
			"Carbon.Errors.HTTPError"
		), ():void => {
			let error: InternalServerErrorError = new InternalServerErrorError( "Message of the error", response );

			expect( error instanceof HTTPError ).toBe( true );
		});

		it( hasConstructor([
			{ name: "message", type: "string" },
			{ name: "response", type: "Carbon.HTTP.Response" }
		]), ():void => {
			let error: InternalServerErrorError = new InternalServerErrorError( "Message of the error", response );

			expect( error ).toBeTruthy();
			expect( error instanceof InternalServerErrorError ).toBe( true );
		});

		it( hasMethod(
			INSTANCE,
			"toString",
			{ type: "string" }
		), ():void => {
			let error: InternalServerErrorError = new InternalServerErrorError( "Message of the error", response );

			expect( error.toString ).toBeDefined();
			expect( Utils.isFunction( error.toString ) );

			expect( error.toString() ).toBe("InternalServerErrorError: Message of the error");
		});

		it( hasProperty(
			INSTANCE,
			"name",
			"string"
		), ():void => {
			let error: InternalServerErrorError = new InternalServerErrorError( "Message of the error", response );

			expect( error.name ).toBeDefined();
			expect( Utils.isString( error.name ) ).toBe( true );

			expect( error.name ).toBe( "InternalServerErrorError" );
		});

		it( hasProperty(
			STATIC,
			"statusCode",
			"number"
		), ():void => {
			expect( InternalServerErrorError.statusCode ).toBeDefined();
			expect( Utils.isNumber( InternalServerErrorError.statusCode ) );

			expect( InternalServerErrorError.statusCode ).toBe( 500 );
		});

	});

});
