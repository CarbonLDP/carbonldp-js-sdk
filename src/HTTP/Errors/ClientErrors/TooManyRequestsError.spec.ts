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

import * as TooManyRequestsError from "./TooManyRequestsError";
import DefaultExport from "./TooManyRequestsError";

describe( module( "Carbon/HTTP/Errors/ClientErrors/TooManyRequestsError" ), ():void => {

	it( isDefined(), ():void => {
		expect( TooManyRequestsError ).toBeDefined();
		expect( TooManyRequestsError ).toEqual( jasmine.any( Object ) );
	} );

	describe( clazz(
		"Carbon.HTTP.Errors.TooManyRequestsError",
		"Error class to indicate that the current user has sent too many request in a given amount of time."
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
			expect( TooManyRequestsError.TooManyRequestsError ).toBeDefined();
			expect( Utils.isFunction( TooManyRequestsError.TooManyRequestsError ) ).toBe( true );
		} );

		it( extendsClass(
			"Carbon.HTTP.Errors.HTTPError"
		), ():void => {
			let error:TooManyRequestsError.TooManyRequestsError = new TooManyRequestsError.TooManyRequestsError( "Message of the error", response );

			expect( error instanceof HTTPError ).toBe( true );
		} );

		it( hasMethod(
			INSTANCE,
			"toString",
			{ type: "string" }
		), ():void => {
			let error:TooManyRequestsError.TooManyRequestsError = new TooManyRequestsError.TooManyRequestsError( "Message of the error", response );

			expect( error.toString ).toBeDefined();
			expect( Utils.isFunction( error.toString ) );

			expect( error.toString() ).toBe( "TooManyRequestsError: Message of the error" );
		} );

		it( hasProperty(
			INSTANCE,
			"name",
			"string"
		), ():void => {
			let error:TooManyRequestsError.TooManyRequestsError = new TooManyRequestsError.TooManyRequestsError( "Message of the error", response );

			expect( error.name ).toBeDefined();
			expect( Utils.isString( error.name ) ).toBe( true );

			expect( error.name ).toBe( "TooManyRequestsError" );
		} );

		it( hasProperty(
			STATIC,
			"statusCode",
			"number"
		), ():void => {
			expect( TooManyRequestsError.TooManyRequestsError.statusCode ).toBeDefined();
			expect( Utils.isNumber( TooManyRequestsError.TooManyRequestsError.statusCode ) );

			expect( TooManyRequestsError.TooManyRequestsError.statusCode ).toBe( 429 );
		} );

	} );

	it( hasDefaultExport( "Carbon.HTTP.Errors.TooManyRequestsError" ), ():void => {
		expect( DefaultExport ).toBeDefined();
		expect( DefaultExport ).toBe( TooManyRequestsError.TooManyRequestsError );
	} );

} );
