import { RequestService } from "../../Request";
import { Response } from "../../Response";
import { HTTPError } from "../HTTPError";
import {
	clazz,
	extendsClass,
	hasMethod,
	hasProperty,
	INSTANCE,
	isDefined,
	module,
	STATIC,
} from "./../../../test/JasmineExtender";
import * as Utils from "./../../../Utils";

import * as RequestURITooLongError from "./RequestURITooLongError";

describe( module( "carbonldp/HTTP/Errors/ClientErrors/RequestURITooLongError" ), ():void => {

	it( isDefined(), ():void => {
		expect( RequestURITooLongError ).toBeDefined();
		expect( RequestURITooLongError ).toEqual( jasmine.any( Object ) );
	} );

	describe( clazz(
		"CarbonLDP.HTTP.Errors.RequestURITooLongError",
		"Error class to indicate that the server is not able to process the request because the URI is too long."
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
			expect( RequestURITooLongError.RequestURITooLongError ).toBeDefined();
			expect( Utils.isFunction( RequestURITooLongError.RequestURITooLongError ) ).toBe( true );
		} );

		it( extendsClass(
			"CarbonLDP.HTTP.Errors.HTTPError"
		), ():void => {
			let error:RequestURITooLongError.RequestURITooLongError = new RequestURITooLongError.RequestURITooLongError( "Message of the error", response );

			expect( error instanceof HTTPError ).toBe( true );
		} );

		it( hasMethod(
			INSTANCE,
			"toString",
			{ type: "string" }
		), ():void => {
			let error:RequestURITooLongError.RequestURITooLongError = new RequestURITooLongError.RequestURITooLongError( "Message of the error", response );

			expect( error.toString ).toBeDefined();
			expect( Utils.isFunction( error.toString ) );

			expect( error.toString() ).toBe( "RequestURITooLongError: Message of the error" );
		} );

		it( hasProperty(
			INSTANCE,
			"name",
			"string"
		), ():void => {
			let error:RequestURITooLongError.RequestURITooLongError = new RequestURITooLongError.RequestURITooLongError( "Message of the error", response );

			expect( error.name ).toBeDefined();
			expect( Utils.isString( error.name ) ).toBe( true );

			expect( error.name ).toBe( "RequestURITooLongError" );
		} );

		it( hasProperty(
			STATIC,
			"statusCode",
			"number"
		), ():void => {
			expect( RequestURITooLongError.RequestURITooLongError.statusCode ).toBeDefined();
			expect( Utils.isNumber( RequestURITooLongError.RequestURITooLongError.statusCode ) );

			expect( RequestURITooLongError.RequestURITooLongError.statusCode ).toBe( 414 );
		} );

	} );

} );
