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

import * as RequestEntityTooLargeError from "./RequestEntityTooLargeError";
import DefaultExport from "./RequestEntityTooLargeError";

describe( module( "carbonldp/HTTP/Errors/ClientErrors/RequestEntityTooLargeError" ), ():void => {

	it( isDefined(), ():void => {
		expect( RequestEntityTooLargeError ).toBeDefined();
		expect( RequestEntityTooLargeError ).toEqual( jasmine.any( Object ) );
	} );

	describe( clazz(
		"CarbonLDP.HTTP.Errors.RequestEntityTooLargeError",
		"Error class to indicate that the request entity is larger than the server is able to process."
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
			expect( RequestEntityTooLargeError.RequestEntityTooLargeError ).toBeDefined();
			expect( Utils.isFunction( RequestEntityTooLargeError.RequestEntityTooLargeError ) ).toBe( true );
		} );

		it( extendsClass(
			"CarbonLDP.HTTP.Errors.HTTPError"
		), ():void => {
			let error:RequestEntityTooLargeError.RequestEntityTooLargeError = new RequestEntityTooLargeError.RequestEntityTooLargeError( "Message of the error", response );

			expect( error instanceof HTTPError ).toBe( true );
		} );

		it( hasMethod(
			INSTANCE,
			"toString",
			{ type: "string" }
		), ():void => {
			let error:RequestEntityTooLargeError.RequestEntityTooLargeError = new RequestEntityTooLargeError.RequestEntityTooLargeError( "Message of the error", response );

			expect( error.toString ).toBeDefined();
			expect( Utils.isFunction( error.toString ) );

			expect( error.toString() ).toBe( "RequestEntityTooLargeError: Message of the error" );
		} );

		it( hasProperty(
			INSTANCE,
			"name",
			"string"
		), ():void => {
			let error:RequestEntityTooLargeError.RequestEntityTooLargeError = new RequestEntityTooLargeError.RequestEntityTooLargeError( "Message of the error", response );

			expect( error.name ).toBeDefined();
			expect( Utils.isString( error.name ) ).toBe( true );

			expect( error.name ).toBe( "RequestEntityTooLargeError" );
		} );

		it( hasProperty(
			STATIC,
			"statusCode",
			"number"
		), ():void => {
			expect( RequestEntityTooLargeError.RequestEntityTooLargeError.statusCode ).toBeDefined();
			expect( Utils.isNumber( RequestEntityTooLargeError.RequestEntityTooLargeError.statusCode ) );

			expect( RequestEntityTooLargeError.RequestEntityTooLargeError.statusCode ).toBe( 413 );
		} );

	} );

	it( hasDefaultExport( "CarbonLDP.HTTP.Errors.RequestEntityTooLargeError" ), ():void => {
		expect( DefaultExport ).toBeDefined();
		expect( DefaultExport ).toBe( RequestEntityTooLargeError.RequestEntityTooLargeError );
	} );

} );
