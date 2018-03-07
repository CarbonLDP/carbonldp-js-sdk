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

import * as GatewayTimeoutError from "./GatewayTimeoutError";

describe( module( "carbonldp/HTTP/Errors/ServerErrors/GatewayTimeoutError" ), ():void => {

	it( isDefined(), ():void => {
		expect( GatewayTimeoutError ).toBeDefined();
		expect( GatewayTimeoutError ).toEqual( jasmine.any( Object ) );
	} );

	describe( clazz(
		"CarbonLDP.HTTP.Errors.GatewayTimeoutError",
		"Error class to indicate that the server, while acting as a gateway or proxy, did not receive a timely response from the upstream server."
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
			expect( GatewayTimeoutError.GatewayTimeoutError ).toBeDefined();
			expect( Utils.isFunction( GatewayTimeoutError.GatewayTimeoutError ) ).toBe( true );
		} );

		it( extendsClass(
			"CarbonLDP.HTTP.Errors.HTTPError"
		), ():void => {
			let error:GatewayTimeoutError.GatewayTimeoutError = new GatewayTimeoutError.GatewayTimeoutError( "Message of the error", response );

			expect( error instanceof HTTPError ).toBe( true );
		} );

		it( hasMethod(
			INSTANCE,
			"toString",
			{ type: "string" }
		), ():void => {
			let error:GatewayTimeoutError.GatewayTimeoutError = new GatewayTimeoutError.GatewayTimeoutError( "Message of the error", response );

			expect( error.toString ).toBeDefined();
			expect( Utils.isFunction( error.toString ) );

			expect( error.toString() ).toBe( "GatewayTimeoutError: Message of the error" );
		} );

		it( hasProperty(
			INSTANCE,
			"name",
			"string"
		), ():void => {
			let error:GatewayTimeoutError.GatewayTimeoutError = new GatewayTimeoutError.GatewayTimeoutError( "Message of the error", response );

			expect( error.name ).toBeDefined();
			expect( Utils.isString( error.name ) ).toBe( true );

			expect( error.name ).toBe( "GatewayTimeoutError" );
		} );

		it( hasProperty(
			STATIC,
			"statusCode",
			"number"
		), ():void => {
			expect( GatewayTimeoutError.GatewayTimeoutError.statusCode ).toBeDefined();
			expect( Utils.isNumber( GatewayTimeoutError.GatewayTimeoutError.statusCode ) );

			expect( GatewayTimeoutError.GatewayTimeoutError.statusCode ).toBe( 504 );
		} );

	} );

} );
