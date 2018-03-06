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

import * as PreconditionRequiredError from "./PreconditionRequiredError";
import DefaultExport from "./PreconditionRequiredError";

describe( module( "CarbonLDP/HTTP/Errors/ClientErrors/PreconditionRequiredError" ), ():void => {

	it( isDefined(), ():void => {
		expect( PreconditionRequiredError ).toBeDefined();
		expect( PreconditionRequiredError ).toEqual( jasmine.any( Object ) );
	} );

	describe( clazz(
		"CarbonLDP.HTTP.Errors.PreconditionRequiredError",
		"Error class to indicate that the request is missing a precondition header."
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
			expect( PreconditionRequiredError.PreconditionRequiredError ).toBeDefined();
			expect( Utils.isFunction( PreconditionRequiredError.PreconditionRequiredError ) ).toBe( true );
		} );

		it( extendsClass(
			"CarbonLDP.HTTP.Errors.HTTPError"
		), ():void => {
			let error:PreconditionRequiredError.PreconditionRequiredError = new PreconditionRequiredError.PreconditionRequiredError( "Message of the error", response );

			expect( error instanceof HTTPError ).toBe( true );
		} );

		it( hasMethod(
			INSTANCE,
			"toString",
			{ type: "string" }
		), ():void => {
			let error:PreconditionRequiredError.PreconditionRequiredError = new PreconditionRequiredError.PreconditionRequiredError( "Message of the error", response );

			expect( error.toString ).toBeDefined();
			expect( Utils.isFunction( error.toString ) );

			expect( error.toString() ).toBe( "PreconditionRequiredError: Message of the error" );
		} );

		it( hasProperty(
			INSTANCE,
			"name",
			"string"
		), ():void => {
			let error:PreconditionRequiredError.PreconditionRequiredError = new PreconditionRequiredError.PreconditionRequiredError( "Message of the error", response );

			expect( error.name ).toBeDefined();
			expect( Utils.isString( error.name ) ).toBe( true );

			expect( error.name ).toBe( "PreconditionRequiredError" );
		} );

		it( hasProperty(
			STATIC,
			"statusCode",
			"number"
		), ():void => {
			expect( PreconditionRequiredError.PreconditionRequiredError.statusCode ).toBeDefined();
			expect( Utils.isNumber( PreconditionRequiredError.PreconditionRequiredError.statusCode ) );

			expect( PreconditionRequiredError.PreconditionRequiredError.statusCode ).toBe( 428 );
		} );

	} );

	it( hasDefaultExport( "CarbonLDP.HTTP.Errors.PreconditionRequiredError" ), ():void => {
		expect( DefaultExport ).toBeDefined();
		expect( DefaultExport ).toBe( PreconditionRequiredError.PreconditionRequiredError );
	} );

} );
