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

import * as NotAcceptableError from "./NotAcceptableError";
import DefaultExport from "./NotAcceptableError";

describe( module( "carbonldp/HTTP/Errors/ClientErrors/NotAcceptableError" ), ():void => {

	it( isDefined(), ():void => {
		expect( NotAcceptableError ).toBeDefined();
		expect( NotAcceptableError ).toEqual( jasmine.any( Object ) );
	} );

	describe( clazz(
		"CarbonLDP.HTTP.Errors.NotAcceptableError",
		"Error class to indicate that the server cannot respond with the data type specified by the accept header of the request."
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
			expect( NotAcceptableError.NotAcceptableError ).toBeDefined();
			expect( Utils.isFunction( NotAcceptableError.NotAcceptableError ) ).toBe( true );
		} );

		it( extendsClass(
			"CarbonLDP.HTTP.Errors.HTTPError"
		), ():void => {
			let error:NotAcceptableError.NotAcceptableError = new NotAcceptableError.NotAcceptableError( "Message of the error", response );

			expect( error instanceof HTTPError ).toBe( true );
		} );

		it( hasMethod(
			INSTANCE,
			"toString",
			{ type: "string" }
		), ():void => {
			let error:NotAcceptableError.NotAcceptableError = new NotAcceptableError.NotAcceptableError( "Message of the error", response );

			expect( error.toString ).toBeDefined();
			expect( Utils.isFunction( error.toString ) );

			expect( error.toString() ).toBe( "NotAcceptableError: Message of the error" );
		} );

		it( hasProperty(
			INSTANCE,
			"name",
			"string"
		), ():void => {
			let error:NotAcceptableError.NotAcceptableError = new NotAcceptableError.NotAcceptableError( "Message of the error", response );

			expect( error.name ).toBeDefined();
			expect( Utils.isString( error.name ) ).toBe( true );

			expect( error.name ).toBe( "NotAcceptableError" );
		} );

		it( hasProperty(
			STATIC,
			"statusCode",
			"number"
		), ():void => {
			expect( NotAcceptableError.NotAcceptableError.statusCode ).toBeDefined();
			expect( Utils.isNumber( NotAcceptableError.NotAcceptableError.statusCode ) );

			expect( NotAcceptableError.NotAcceptableError.statusCode ).toBe( 406 );
		} );

	} );

	it( hasDefaultExport( "CarbonLDP.HTTP.Errors.NotAcceptableError" ), ():void => {
		expect( DefaultExport ).toBeDefined();
		expect( DefaultExport ).toBe( NotAcceptableError.NotAcceptableError );
	} );

} );
