import { RequestService } from "../../Request";
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

import { Response } from "./../../Response";

import { HTTPError } from "./../HTTPError";

import * as BadRequestError from "./BadRequestError";
import DefaultExport from "./BadRequestError";

describe( module( "CarbonLDP/HTTP/Errors/ClientErrors/BadRequestError" ), ():void => {

	it( isDefined(), ():void => {
		expect( BadRequestError ).toBeDefined();
		expect( BadRequestError ).toEqual( jasmine.any( Object ) );
	} );

	describe( clazz(
		"CarbonLDP.HTTP.Errors.BadRequestError",
		"Error class to indicate that a malformed request has been sent."
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
			expect( BadRequestError.BadRequestError ).toBeDefined();
			expect( Utils.isFunction( BadRequestError.BadRequestError ) ).toBe( true );
		} );

		it( extendsClass(
			"CarbonLDP.HTTP.Errors.HTTPError"
		), ():void => {
			let error:BadRequestError.BadRequestError = new BadRequestError.BadRequestError( "Message of the error", response );

			expect( error instanceof HTTPError ).toBe( true );
		} );

		it( hasMethod(
			INSTANCE,
			"toString",
			{ type: "string" }
		), ():void => {
			let error:BadRequestError.BadRequestError = new BadRequestError.BadRequestError( "Message of the error", response );

			expect( error.toString ).toBeDefined();
			expect( Utils.isFunction( error.toString ) );

			expect( error.toString() ).toBe( "BadRequestError: Message of the error" );
		} );

		it( hasProperty(
			INSTANCE,
			"name",
			"string"
		), ():void => {
			let error:BadRequestError.BadRequestError = new BadRequestError.BadRequestError( "Message of the error", response );

			expect( error.name ).toBeDefined();
			expect( Utils.isString( error.name ) ).toBe( true );

			expect( error.name ).toBe( "BadRequestError" );
		} );

		it( hasProperty(
			STATIC,
			"statusCode",
			"number"
		), ():void => {
			expect( BadRequestError.BadRequestError.statusCode ).toBeDefined();
			expect( Utils.isNumber( BadRequestError.BadRequestError.statusCode ) );
			expect( BadRequestError.BadRequestError.statusCode ).toBe( 400 );
		} );

	} );

	it( hasDefaultExport( "CarbonLDP.HTTP.Errors.BadRequestError" ), ():void => {
		expect( DefaultExport ).toBeDefined();
		expect( DefaultExport ).toBe( BadRequestError.BadRequestError );
	} );

} );
