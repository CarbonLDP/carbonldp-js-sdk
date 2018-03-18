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

import * as RequestHeaderFieldsTooLargeError from "./RequestHeaderFieldsTooLargeError";
import DefaultExport from "./RequestHeaderFieldsTooLargeError";

describe( module( "carbonldp/HTTP/Errors/ClientErrors/RequestHeaderFieldsTooLargeError" ), ():void => {

	it( isDefined(), ():void => {
		expect( RequestHeaderFieldsTooLargeError ).toBeDefined();
		expect( RequestHeaderFieldsTooLargeError ).toEqual( jasmine.any( Object ) );
	} );

	describe( clazz(
		"CarbonLDP.HTTP.Errors.RequestHeaderFieldsTooLargeError",
		"Error class to indicate that the server is not able to process the request because its header fields are too large."
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
			expect( RequestHeaderFieldsTooLargeError.RequestHeaderFieldsTooLargeError ).toBeDefined();
			expect( Utils.isFunction( RequestHeaderFieldsTooLargeError.RequestHeaderFieldsTooLargeError ) ).toBe( true );
		} );

		it( extendsClass(
			"CarbonLDP.HTTP.Errors.HTTPError"
		), ():void => {
			let error:RequestHeaderFieldsTooLargeError.RequestHeaderFieldsTooLargeError = new RequestHeaderFieldsTooLargeError.RequestHeaderFieldsTooLargeError( "Message of the error", response );

			expect( error instanceof HTTPError ).toBe( true );
		} );

		it( hasMethod(
			INSTANCE,
			"toString",
			{ type: "string" }
		), ():void => {
			let error:RequestHeaderFieldsTooLargeError.RequestHeaderFieldsTooLargeError = new RequestHeaderFieldsTooLargeError.RequestHeaderFieldsTooLargeError( "Message of the error", response );

			expect( error.toString ).toBeDefined();
			expect( Utils.isFunction( error.toString ) );

			expect( error.toString() ).toBe( "RequestHeaderFieldsTooLargeError: Message of the error" );
		} );

		it( hasProperty(
			INSTANCE,
			"name",
			"string"
		), ():void => {
			let error:RequestHeaderFieldsTooLargeError.RequestHeaderFieldsTooLargeError = new RequestHeaderFieldsTooLargeError.RequestHeaderFieldsTooLargeError( "Message of the error", response );

			expect( error.name ).toBeDefined();
			expect( Utils.isString( error.name ) ).toBe( true );

			expect( error.name ).toBe( "RequestHeaderFieldsTooLargeError" );
		} );

		it( hasProperty(
			STATIC,
			"statusCode",
			"number"
		), ():void => {
			expect( RequestHeaderFieldsTooLargeError.RequestHeaderFieldsTooLargeError.statusCode ).toBeDefined();
			expect( Utils.isNumber( RequestHeaderFieldsTooLargeError.RequestHeaderFieldsTooLargeError.statusCode ) );

			expect( RequestHeaderFieldsTooLargeError.RequestHeaderFieldsTooLargeError.statusCode ).toBe( 431 );
		} );

	} );

	it( hasDefaultExport( "CarbonLDP.HTTP.Errors.RequestHeaderFieldsTooLargeError" ), ():void => {
		expect( DefaultExport ).toBeDefined();
		expect( DefaultExport ).toBe( RequestHeaderFieldsTooLargeError.RequestHeaderFieldsTooLargeError );
	} );

} );
