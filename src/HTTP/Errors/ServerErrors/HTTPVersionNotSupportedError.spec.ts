import { RequestService } from "../../Request";
import { Response } from "../../Response";
import { HTTPError } from "../HTTPError";
import {
	clazz,
	extendsClass,
	hasDefaultExport,
	hasMethod,
	hasProperty,
	INSTANCE,
	isDefined,
	module,
	STATIC,
} from "./../../../test/JasmineExtender";
import * as Utils from "./../../../Utils";

import * as HTTPVersionNotSupportedError from "./HTTPVersionNotSupportedError";
import DefaultExport from "./HTTPVersionNotSupportedError";

describe( module( "Carbon/HTTP/Errors/ServerErrors/HTTPVersionNotSupportedError" ), ():void => {

	it( isDefined(), ():void => {
		expect( HTTPVersionNotSupportedError ).toBeDefined();
		expect( HTTPVersionNotSupportedError ).toEqual( jasmine.any( Object ) );
	} );

	describe( clazz(
		"Carbon.HTTP.Errors.HTTPVersionNotSupportedError",
		"Error class to indicate that the server doesn't support the HTTP protocol version used in the request."
	), ():void => {

		let response:Response;

		beforeAll( ( done:{ ():void, fail:() => void } ) => {
			jasmine.Ajax.install();
			jasmine.Ajax.stubRequest( "http://example.com/request/" ).andReturn( {
				"status": 200,
				"responseText": "A response",
			} );

			RequestService.send( "GET", "http://example.com/request/" ).then( ( _response ) => {
				response = _response;
				done();
			} ).catch( done.fail );

		} );

		afterAll( () => {
			jasmine.Ajax.uninstall();
		} );

		it( isDefined(), ():void => {
			expect( HTTPVersionNotSupportedError.HTTPVersionNotSupportedError ).toBeDefined();
			expect( Utils.isFunction( HTTPVersionNotSupportedError.HTTPVersionNotSupportedError ) ).toBe( true );
		} );

		it( extendsClass(
			"Carbon.HTTP.Errors.HTTPError"
		), ():void => {
			let error:HTTPVersionNotSupportedError.HTTPVersionNotSupportedError = new HTTPVersionNotSupportedError.HTTPVersionNotSupportedError( "Message of the error", response );

			expect( error instanceof HTTPError ).toBe( true );
		} );

		it( hasMethod(
			INSTANCE,
			"toString",
			{ type: "string" }
		), ():void => {
			let error:HTTPVersionNotSupportedError.HTTPVersionNotSupportedError = new HTTPVersionNotSupportedError.HTTPVersionNotSupportedError( "Message of the error", response );

			expect( error.toString ).toBeDefined();
			expect( Utils.isFunction( error.toString ) );

			expect( error.toString() ).toBe( "HTTPVersionNotSupportedError: Message of the error" );
		} );

		it( hasProperty(
			INSTANCE,
			"name",
			"string"
		), ():void => {
			let error:HTTPVersionNotSupportedError.HTTPVersionNotSupportedError = new HTTPVersionNotSupportedError.HTTPVersionNotSupportedError( "Message of the error", response );

			expect( error.name ).toBeDefined();
			expect( Utils.isString( error.name ) ).toBe( true );

			expect( error.name ).toBe( "HTTPVersionNotSupportedError" );
		} );

		it( hasProperty(
			STATIC,
			"statusCode",
			"number"
		), ():void => {
			expect( HTTPVersionNotSupportedError.HTTPVersionNotSupportedError.statusCode ).toBeDefined();
			expect( Utils.isNumber( HTTPVersionNotSupportedError.HTTPVersionNotSupportedError.statusCode ) );

			expect( HTTPVersionNotSupportedError.HTTPVersionNotSupportedError.statusCode ).toBe( 505 );
		} );

	} );

	it( hasDefaultExport( "Carbon.HTTP.Errors.HTTPVersionNotSupportedError" ), ():void => {
		expect( DefaultExport ).toBeDefined();
		expect( DefaultExport ).toBe( HTTPVersionNotSupportedError.HTTPVersionNotSupportedError );
	} );

} );
