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

import * as UnsupportedMediaTypeError from "./UnsupportedMediaTypeError";
import DefaultExport from "./UnsupportedMediaTypeError";

describe( module( "CarbonLDP/HTTP/Errors/ClientErrors/UnsupportedMediaTypeError" ), ():void => {

	it( isDefined(), ():void => {
		expect( UnsupportedMediaTypeError ).toBeDefined();
		expect( UnsupportedMediaTypeError ).toEqual( jasmine.any( Object ) );
	} );

	describe( clazz(
		"CarbonLDP.HTTP.Errors.UnsupportedMediaTypeError",
		"Error class to indicate that the request has a media-type not supported by the server."
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
			expect( UnsupportedMediaTypeError.UnsupportedMediaTypeError ).toBeDefined();
			expect( Utils.isFunction( UnsupportedMediaTypeError.UnsupportedMediaTypeError ) ).toBe( true );
		} );

		it( extendsClass(
			"CarbonLDP.HTTP.Errors.HTTPError"
		), ():void => {
			let error:UnsupportedMediaTypeError.UnsupportedMediaTypeError = new UnsupportedMediaTypeError.UnsupportedMediaTypeError( "Message of the error", response );

			expect( error instanceof HTTPError ).toBe( true );
		} );

		it( hasMethod(
			INSTANCE,
			"toString",
			{ type: "string" }
		), ():void => {
			let error:UnsupportedMediaTypeError.UnsupportedMediaTypeError = new UnsupportedMediaTypeError.UnsupportedMediaTypeError( "Message of the error", response );

			expect( error.toString ).toBeDefined();
			expect( Utils.isFunction( error.toString ) );

			expect( error.toString() ).toBe( "UnsupportedMediaTypeError: Message of the error" );
		} );

		it( hasProperty(
			INSTANCE,
			"name",
			"string"
		), ():void => {
			let error:UnsupportedMediaTypeError.UnsupportedMediaTypeError = new UnsupportedMediaTypeError.UnsupportedMediaTypeError( "Message of the error", response );

			expect( error.name ).toBeDefined();
			expect( Utils.isString( error.name ) ).toBe( true );

			expect( error.name ).toBe( "UnsupportedMediaTypeError" );
		} );

		it( hasProperty(
			STATIC,
			"statusCode",
			"number"
		), ():void => {
			expect( UnsupportedMediaTypeError.UnsupportedMediaTypeError.statusCode ).toBeDefined();
			expect( Utils.isNumber( UnsupportedMediaTypeError.UnsupportedMediaTypeError.statusCode ) );

			expect( UnsupportedMediaTypeError.UnsupportedMediaTypeError.statusCode ).toBe( 415 );
		} );

	} );

	it( hasDefaultExport( "CarbonLDP.HTTP.Errors.UnsupportedMediaTypeError" ), ():void => {
		expect( DefaultExport ).toBeDefined();
		expect( DefaultExport ).toBe( UnsupportedMediaTypeError.UnsupportedMediaTypeError );
	} );

} );
