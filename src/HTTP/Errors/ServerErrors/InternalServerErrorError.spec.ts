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

import * as InternalServerErrorError from "./InternalServerErrorError";

describe( module( "carbonldp/HTTP/Errors/ServerErrors/InternalServerErrorError" ), ():void => {

	it( isDefined(), ():void => {
		expect( InternalServerErrorError ).toBeDefined();
		expect( InternalServerErrorError ).toEqual( jasmine.any( Object ) );
	} );

	describe( clazz(
		"CarbonLDP.HTTP.Errors.InternalServerErrorError",
		"Error class to indicate that the server encountered an unexpected condition. This generic error is given when no other specific error is suitable."
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
			expect( InternalServerErrorError.InternalServerErrorError ).toBeDefined();
			expect( Utils.isFunction( InternalServerErrorError.InternalServerErrorError ) ).toBe( true );
		} );

		it( extendsClass(
			"CarbonLDP.HTTP.Errors.HTTPError"
		), ():void => {
			let error:InternalServerErrorError.InternalServerErrorError = new InternalServerErrorError.InternalServerErrorError( "Message of the error", response );

			expect( error instanceof HTTPError ).toBe( true );
		} );

		it( hasMethod(
			INSTANCE,
			"toString",
			{ type: "string" }
		), ():void => {
			let error:InternalServerErrorError.InternalServerErrorError = new InternalServerErrorError.InternalServerErrorError( "Message of the error", response );

			expect( error.toString ).toBeDefined();
			expect( Utils.isFunction( error.toString ) );

			expect( error.toString() ).toBe( "InternalServerErrorError: Message of the error" );
		} );

		it( hasProperty(
			INSTANCE,
			"name",
			"string"
		), ():void => {
			let error:InternalServerErrorError.InternalServerErrorError = new InternalServerErrorError.InternalServerErrorError( "Message of the error", response );

			expect( error.name ).toBeDefined();
			expect( Utils.isString( error.name ) ).toBe( true );

			expect( error.name ).toBe( "InternalServerErrorError" );
		} );

		it( hasProperty(
			STATIC,
			"statusCode",
			"number"
		), ():void => {
			expect( InternalServerErrorError.InternalServerErrorError.statusCode ).toBeDefined();
			expect( Utils.isNumber( InternalServerErrorError.InternalServerErrorError.statusCode ) );

			expect( InternalServerErrorError.InternalServerErrorError.statusCode ).toBe( 500 );
		} );

	} );

} );
