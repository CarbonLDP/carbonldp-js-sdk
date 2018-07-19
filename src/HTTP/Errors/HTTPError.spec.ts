import { AbstractError } from "../../Errors";
import {
	clazz,
	extendsClass,
	hasConstructor,
	hasMethod,
	hasProperty,
	INSTANCE,
	isDefined,
	module,
	STATIC,
} from "../../test/JasmineExtender";
import { RequestService } from "../Request";
import { Response } from "../Response";
import * as Utils from "./../../Utils";

import * as HTTPError from "./HTTPError";

describe( module(
	"carbonldp/HTTP/Errors/HTTPError"
), ():void => {

	it( isDefined(), ():void => {
		expect( HTTPError ).toBeDefined();
		expect( HTTPError ).toEqual( jasmine.any( Object ) );
	} );

	describe( clazz(
		"CarbonLDP.HTTP.Errors.HTTPError",
		"Generic error class that defines any type of HTTP Error used in the SDK."
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
			expect( HTTPError.HTTPError ).toBeDefined();
			expect( Utils.isFunction( HTTPError.HTTPError ) ).toBe( true );
		} );

		it( extendsClass(
			"CarbonLDP.Errors.AbstractError.AbstractError"
		), ():void => {
			let error:HTTPError.HTTPError = new HTTPError.HTTPError( "Message of the error", response );

			expect( error ).toEqual( jasmine.any( AbstractError ) );
		} );

		it( hasConstructor( [
			{ name: "message", type: "string" },
			{ name: "response", type: "CarbonLDP.HTTP.Response" },
		] ), ():void => {
			let error:HTTPError.HTTPError = new HTTPError.HTTPError( "Message of the error", response );

			expect( error ).toBeTruthy();
			expect( error ).toEqual( jasmine.any( HTTPError.HTTPError ) );
		} );

		it( hasMethod(
			INSTANCE,
			"toString",
			{ type: "string" }
		), ():void => {
			let error:HTTPError.HTTPError = new HTTPError.HTTPError( "Message of the error", response );

			expect( error.toString ).toBeDefined();
			expect( Utils.isFunction( error.toString ) );

			expect( error.toString() ).toBe( "HTTPError: Message of the error" );
		} );

		it( hasProperty(
			INSTANCE,
			"name",
			"string"
		), ():void => {
			let error:HTTPError.HTTPError = new HTTPError.HTTPError( "Message of the error", response );

			expect( error.name ).toBeDefined();
			expect( Utils.isString( error.name ) ).toBe( true );

			expect( error.name ).toBe( "HTTPError" );
		} );

		it( hasProperty(
			STATIC,
			"statusCode",
			"number"
		), ():void => {
			expect( HTTPError.HTTPError.statusCode ).toBeDefined();
			expect( Utils.isNumber( HTTPError.HTTPError.statusCode ) );
			expect( HTTPError.HTTPError.statusCode ).toBeNull();
		} );

		it( hasProperty(
			INSTANCE,
			"response",
			"number"
		), ():void => {
			let error:HTTPError.HTTPError = new HTTPError.HTTPError( "Message of the error", response );

			expect( error.response ).toBeDefined();
			expect( error.response ).toBe( response );
		} );

	} );

} );
