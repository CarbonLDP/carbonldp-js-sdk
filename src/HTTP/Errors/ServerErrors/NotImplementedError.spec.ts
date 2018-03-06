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

import * as NotImplementedError from "./NotImplementedError";
import DefaultExport from "./NotImplementedError";

describe( module( "carbonldp/HTTP/Errors/ServerErrors/NotImplementedError" ), ():void => {

	it( isDefined(), ():void => {
		expect( NotImplementedError ).toBeDefined();
		expect( NotImplementedError ).toEqual( jasmine.any( Object ) );
	} );

	describe( clazz(
		"CarbonLDP.HTTP.Errors.NotImplementedError",
		"Error class to indicate that the server doesn't have the ability to fulfill the request yet."
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
			expect( NotImplementedError.NotImplementedError ).toBeDefined();
			expect( Utils.isFunction( NotImplementedError.NotImplementedError ) ).toBe( true );
		} );

		it( extendsClass(
			"CarbonLDP.HTTP.Errors.HTTPError"
		), ():void => {
			let error:NotImplementedError.NotImplementedError = new NotImplementedError.NotImplementedError( "Message of the error", response );

			expect( error instanceof HTTPError ).toBe( true );
		} );

		it( hasMethod(
			INSTANCE,
			"toString",
			{ type: "string" }
		), ():void => {
			let error:NotImplementedError.NotImplementedError = new NotImplementedError.NotImplementedError( "Message of the error", response );

			expect( error.toString ).toBeDefined();
			expect( Utils.isFunction( error.toString ) );

			expect( error.toString() ).toBe( "NotImplementedError: Message of the error" );
		} );

		it( hasProperty(
			INSTANCE,
			"name",
			"string"
		), ():void => {
			let error:NotImplementedError.NotImplementedError = new NotImplementedError.NotImplementedError( "Message of the error", response );

			expect( error.name ).toBeDefined();
			expect( Utils.isString( error.name ) ).toBe( true );

			expect( error.name ).toBe( "NotImplementedError" );
		} );

		it( hasProperty(
			STATIC,
			"statusCode",
			"number"
		), ():void => {
			expect( NotImplementedError.NotImplementedError.statusCode ).toBeDefined();
			expect( Utils.isNumber( NotImplementedError.NotImplementedError.statusCode ) );

			expect( NotImplementedError.NotImplementedError.statusCode ).toBe( 501 );
		} );

	} );

	it( hasDefaultExport( "CarbonLDP.HTTP.Errors.NotImplementedError" ), ():void => {
		expect( DefaultExport ).toBeDefined();
		expect( DefaultExport ).toBe( NotImplementedError.NotImplementedError );
	} );

} );
