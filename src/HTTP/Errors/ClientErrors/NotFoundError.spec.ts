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

import * as NotFoundError from "./NotFoundError";
import DefaultExport from "./NotFoundError";

describe( module( "carbonldp/HTTP/Errors/ClientErrors/NotFoundError" ), ():void => {

	it( isDefined(), ():void => {
		expect( NotFoundError ).toBeDefined();
		expect( NotFoundError ).toEqual( jasmine.any( Object ) );
	} );

	describe( clazz(
		"CarbonLDP.HTTP.Errors.NotFoundError",
		"Error class to indicate that the resource was not found."
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
			expect( NotFoundError.NotFoundError ).toBeDefined();
			expect( Utils.isFunction( NotFoundError.NotFoundError ) ).toBe( true );
		} );

		it( extendsClass(
			"CarbonLDP.HTTP.Errors.HTTPError"
		), ():void => {
			let error:NotFoundError.NotFoundError = new NotFoundError.NotFoundError( "Message of the error", response );

			expect( error instanceof HTTPError ).toBe( true );
		} );

		it( hasMethod(
			INSTANCE,
			"toString",
			{ type: "string" }
		), ():void => {
			let error:NotFoundError.NotFoundError = new NotFoundError.NotFoundError( "Message of the error", response );

			expect( error.toString ).toBeDefined();
			expect( Utils.isFunction( error.toString ) );

			expect( error.toString() ).toBe( "NotFoundError: Message of the error" );
		} );

		it( hasProperty(
			INSTANCE,
			"name",
			"string"
		), ():void => {
			let error:NotFoundError.NotFoundError = new NotFoundError.NotFoundError( "Message of the error", response );

			expect( error.name ).toBeDefined();
			expect( Utils.isString( error.name ) ).toBe( true );

			expect( error.name ).toBe( "NotFoundError" );
		} );

		it( hasProperty(
			STATIC,
			"statusCode",
			"number"
		), ():void => {
			expect( NotFoundError.NotFoundError.statusCode ).toBeDefined();
			expect( Utils.isNumber( NotFoundError.NotFoundError.statusCode ) );

			expect( NotFoundError.NotFoundError.statusCode ).toBe( 404 );
		} );

	} );

	it( hasDefaultExport( "CarbonLDP.HTTP.Errors.NotFoundError" ), ():void => {
		expect( DefaultExport ).toBeDefined();
		expect( DefaultExport ).toBe( NotFoundError.NotFoundError );
	} );

} );
