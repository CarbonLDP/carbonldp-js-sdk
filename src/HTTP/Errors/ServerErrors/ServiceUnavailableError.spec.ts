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

import * as ServiceUnavailableError from "./ServiceUnavailableError";
import DefaultExport from "./ServiceUnavailableError";

describe( module( "CarbonLDP/HTTP/Errors/ServerErrors/ServiceUnavailableError" ), ():void => {

	it( isDefined(), ():void => {
		expect( ServiceUnavailableError ).toBeDefined();
		expect( ServiceUnavailableError ).toEqual( jasmine.any( Object ) );
	} );

	describe( clazz(
		"CarbonLDP.HTTP.Errors.ServiceUnavailableError",
		"Error class to indicate that the server is currently unavailable (because it's overloaded or down for maintenance)."
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
			expect( ServiceUnavailableError.ServiceUnavailableError ).toBeDefined();
			expect( Utils.isFunction( ServiceUnavailableError.ServiceUnavailableError ) ).toBe( true );
		} );

		it( extendsClass(
			"CarbonLDP.HTTP.Errors.HTTPError"
		), ():void => {
			let error:ServiceUnavailableError.ServiceUnavailableError = new ServiceUnavailableError.ServiceUnavailableError( "Message of the error", response );

			expect( error instanceof HTTPError ).toBe( true );
		} );

		it( hasMethod(
			INSTANCE,
			"toString",
			{ type: "string" }
		), ():void => {
			let error:ServiceUnavailableError.ServiceUnavailableError = new ServiceUnavailableError.ServiceUnavailableError( "Message of the error", response );

			expect( error.toString ).toBeDefined();
			expect( Utils.isFunction( error.toString ) );

			expect( error.toString() ).toBe( "ServiceUnavailableError: Message of the error" );
		} );

		it( hasProperty(
			INSTANCE,
			"name",
			"string"
		), ():void => {
			let error:ServiceUnavailableError.ServiceUnavailableError = new ServiceUnavailableError.ServiceUnavailableError( "Message of the error", response );

			expect( error.name ).toBeDefined();
			expect( Utils.isString( error.name ) ).toBe( true );

			expect( error.name ).toBe( "ServiceUnavailableError" );
		} );

		it( hasProperty(
			STATIC,
			"statusCode",
			"number"
		), ():void => {
			expect( ServiceUnavailableError.ServiceUnavailableError.statusCode ).toBeDefined();
			expect( Utils.isNumber( ServiceUnavailableError.ServiceUnavailableError.statusCode ) );

			expect( ServiceUnavailableError.ServiceUnavailableError.statusCode ).toBe( 503 );
		} );

	} );

	it( hasDefaultExport( "CarbonLDP.HTTP.Errors.ServiceUnavailableError" ), ():void => {
		expect( DefaultExport ).toBeDefined();
		expect( DefaultExport ).toBe( ServiceUnavailableError.ServiceUnavailableError );
	} );

} );
