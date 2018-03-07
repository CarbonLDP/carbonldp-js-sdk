import {
	clazz,
	extendsClass,
	hasMethod,
	hasProperty,
	INSTANCE,
	isDefined,
	module,
	STATIC,
} from "../../../test/JasmineExtender";
import { RequestService } from "../../Request";
import { Response } from "../../Response";
import { HTTPError } from "../HTTPError";
import * as Utils from "./../../../Utils";

import * as PreconditionFailedError from "./PreconditionFailedError";

describe( module( "carbonldp/HTTP/Errors/ClientErrors/PreconditionFailedError" ), ():void => {

	it( isDefined(), ():void => {
		expect( PreconditionFailedError ).toBeDefined();
		expect( PreconditionFailedError ).toEqual( jasmine.any( Object ) );
	} );

	describe( clazz(
		"CarbonLDP.HTTP.Errors.PreconditionFailedError",
		"Error class to indicate that the precondition header was resolved to false."
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
			expect( PreconditionFailedError.PreconditionFailedError ).toBeDefined();
			expect( Utils.isFunction( PreconditionFailedError.PreconditionFailedError ) ).toBe( true );
		} );

		it( extendsClass(
			"CarbonLDP.HTTP.Errors.HTTPError"
		), ():void => {
			let error:PreconditionFailedError.PreconditionFailedError = new PreconditionFailedError.PreconditionFailedError( "Message of the error", response );

			expect( error instanceof HTTPError ).toBe( true );
		} );

		it( hasMethod(
			INSTANCE,
			"toString",
			{ type: "string" }
		), ():void => {
			let error:PreconditionFailedError.PreconditionFailedError = new PreconditionFailedError.PreconditionFailedError( "Message of the error", response );

			expect( error.toString ).toBeDefined();
			expect( Utils.isFunction( error.toString ) );

			expect( error.toString() ).toBe( "PreconditionFailedError: Message of the error" );
		} );

		it( hasProperty(
			INSTANCE,
			"name",
			"string"
		), ():void => {
			let error:PreconditionFailedError.PreconditionFailedError = new PreconditionFailedError.PreconditionFailedError( "Message of the error", response );

			expect( error.name ).toBeDefined();
			expect( Utils.isString( error.name ) ).toBe( true );

			expect( error.name ).toBe( "PreconditionFailedError" );
		} );

		it( hasProperty(
			STATIC,
			"statusCode",
			"number"
		), ():void => {
			expect( PreconditionFailedError.PreconditionFailedError.statusCode ).toBeDefined();
			expect( Utils.isNumber( PreconditionFailedError.PreconditionFailedError.statusCode ) );

			expect( PreconditionFailedError.PreconditionFailedError.statusCode ).toBe( 412 );
		} );

	} );

} );
