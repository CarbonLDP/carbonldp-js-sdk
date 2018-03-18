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

import * as ForbiddenError from "./ForbiddenError";
import DefaultExport from "./ForbiddenError";

describe( module( "carbonldp/HTTP/Errors/ClientErrors/ForbiddenError" ), ():void => {

	it( isDefined(), ():void => {
		expect( ForbiddenError ).toBeDefined();
		expect( ForbiddenError ).toEqual( jasmine.any( Object ) );
	} );

	describe( clazz(
		"CarbonLDP.HTTP.Errors.ForbiddenError",
		"Error class to indicate that the current user doesn't have permissions to fulfill the request."
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
			expect( ForbiddenError.ForbiddenError ).toBeDefined();
			expect( Utils.isFunction( ForbiddenError.ForbiddenError ) ).toBe( true );
		} );

		it( extendsClass(
			"CarbonLDP.HTTP.Errors.HTTPError"
		), ():void => {
			let error:ForbiddenError.ForbiddenError = new ForbiddenError.ForbiddenError( "Message of the error", response );

			expect( error instanceof HTTPError ).toBe( true );
		} );

		it( hasMethod(
			INSTANCE,
			"toString",
			{ type: "string" }
		), ():void => {
			let error:ForbiddenError.ForbiddenError = new ForbiddenError.ForbiddenError( "Message of the error", response );

			expect( error.toString ).toBeDefined();
			expect( Utils.isFunction( error.toString ) );

			expect( error.toString() ).toBe( "ForbiddenError: Message of the error" );
		} );

		it( hasProperty(
			INSTANCE,
			"name",
			"string"
		), ():void => {
			let error:ForbiddenError.ForbiddenError = new ForbiddenError.ForbiddenError( "Message of the error", response );

			expect( error.name ).toBeDefined();
			expect( Utils.isString( error.name ) ).toBe( true );

			expect( error.name ).toBe( "ForbiddenError" );
		} );

		it( hasProperty(
			STATIC,
			"statusCode",
			"number"
		), ():void => {
			expect( ForbiddenError.ForbiddenError.statusCode ).toBeDefined();
			expect( Utils.isNumber( ForbiddenError.ForbiddenError.statusCode ) );

			expect( ForbiddenError.ForbiddenError.statusCode ).toBe( 403 );
		} );

	} );

	it( hasDefaultExport( "CarbonLDP.HTTP.Errors.ForbiddenError" ), ():void => {
		expect( DefaultExport ).toBeDefined();
		expect( DefaultExport ).toBe( ForbiddenError.ForbiddenError );
	} );

} );
