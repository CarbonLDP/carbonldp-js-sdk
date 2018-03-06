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

import * as BadGatewayError from "./BadGatewayError";
import DefaultExport from "./BadGatewayError";

describe( module( "CarbonLDP/HTTP/Errors/ServerErrors/BadGatewayError" ), ():void => {

	it( isDefined(), ():void => {
		expect( BadGatewayError ).toBeDefined();
		expect( BadGatewayError ).toEqual( jasmine.any( Object ) );
	} );

	describe( clazz(
		"CarbonLDP.HTTP.Errors.BadGatewayError",
		"Error class to indicate that the server was acting as a gateway or proxy and received an invalid response from the upstream server."
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
			expect( BadGatewayError.BadGatewayError ).toBeDefined();
			expect( Utils.isFunction( BadGatewayError.BadGatewayError ) ).toBe( true );
		} );

		it( extendsClass(
			"CarbonLDP.HTTP.Errors.HTTPError"
		), ():void => {
			let error:BadGatewayError.BadGatewayError = new BadGatewayError.BadGatewayError( "Message of the error", response );

			expect( error instanceof HTTPError ).toBe( true );
		} );

		it( hasMethod(
			INSTANCE,
			"toString",
			{ type: "string" }
		), ():void => {
			let error:BadGatewayError.BadGatewayError = new BadGatewayError.BadGatewayError( "Message of the error", response );

			expect( error.toString ).toBeDefined();
			expect( Utils.isFunction( error.toString ) );

			expect( error.toString() ).toBe( "BadGatewayError: Message of the error" );
		} );

		it( hasProperty(
			INSTANCE,
			"name",
			"string"
		), ():void => {
			let error:BadGatewayError.BadGatewayError = new BadGatewayError.BadGatewayError( "Message of the error", response );

			expect( error.name ).toBeDefined();
			expect( Utils.isString( error.name ) ).toBe( true );

			expect( error.name ).toBe( "BadGatewayError" );
		} );

		it( hasProperty(
			STATIC,
			"statusCode",
			"number"
		), ():void => {
			expect( BadGatewayError.BadGatewayError.statusCode ).toBeDefined();
			expect( Utils.isNumber( BadGatewayError.BadGatewayError.statusCode ) );

			expect( BadGatewayError.BadGatewayError.statusCode ).toBe( 502 );
		} );

	} );

	it( hasDefaultExport( "CarbonLDP.HTTP.Errors.BadGatewayError" ), ():void => {
		expect( DefaultExport ).toBeDefined();
		expect( DefaultExport ).toBe( BadGatewayError.BadGatewayError );
	} );

} );
