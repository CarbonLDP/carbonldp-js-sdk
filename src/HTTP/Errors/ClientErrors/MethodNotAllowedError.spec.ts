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

import * as MethodNotAllowedError from "./MethodNotAllowedError";
import DefaultExport from "./MethodNotAllowedError";

describe( module( "carbonldp/HTTP/Errors/ClientErrors/MethodNotAllowedError" ), ():void => {

	it( isDefined(), ():void => {
		expect( MethodNotAllowedError ).toBeDefined();
		expect( MethodNotAllowedError ).toEqual( jasmine.any( Object ) );
	} );

	describe( clazz(
		"CarbonLDP.HTTP.Errors.MethodNotAllowedError",
		"Error class to indicate that the method used in the request is not allowed for that URI."
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
			expect( MethodNotAllowedError.MethodNotAllowedError ).toBeDefined();
			expect( Utils.isFunction( MethodNotAllowedError.MethodNotAllowedError ) ).toBe( true );
		} );

		it( extendsClass(
			"CarbonLDP.HTTP.Errors.HTTPError"
		), ():void => {
			let error:MethodNotAllowedError.MethodNotAllowedError = new MethodNotAllowedError.MethodNotAllowedError( "Message of the error", response );

			expect( error instanceof HTTPError ).toBe( true );
		} );

		it( hasMethod(
			INSTANCE,
			"toString",
			{ type: "string" }
		), ():void => {
			let error:MethodNotAllowedError.MethodNotAllowedError = new MethodNotAllowedError.MethodNotAllowedError( "Message of the error", response );

			expect( error.toString ).toBeDefined();
			expect( Utils.isFunction( error.toString ) );

			expect( error.toString() ).toBe( "MethodNotAllowedError: Message of the error" );
		} );

		it( hasProperty(
			INSTANCE,
			"name",
			"string"
		), ():void => {
			let error:MethodNotAllowedError.MethodNotAllowedError = new MethodNotAllowedError.MethodNotAllowedError( "Message of the error", response );

			expect( error.name ).toBeDefined();
			expect( Utils.isString( error.name ) ).toBe( true );

			expect( error.name ).toBe( "MethodNotAllowedError" );
		} );

		it( hasProperty(
			STATIC,
			"statusCode",
			"number"
		), ():void => {
			expect( MethodNotAllowedError.MethodNotAllowedError.statusCode ).toBeDefined();
			expect( Utils.isNumber( MethodNotAllowedError.MethodNotAllowedError.statusCode ) );

			expect( MethodNotAllowedError.MethodNotAllowedError.statusCode ).toBe( 405 );
		} );

	} );

	it( hasDefaultExport( "CarbonLDP.HTTP.Errors.MethodNotAllowedError" ), ():void => {
		expect( DefaultExport ).toBeDefined();
		expect( DefaultExport ).toBe( MethodNotAllowedError.MethodNotAllowedError );
	} );

} );
