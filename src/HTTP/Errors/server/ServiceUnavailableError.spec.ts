import {
	INSTANCE,
	STATIC,

	module,
	clazz,

	isDefined,
	extendsClass,
	hasConstructor,
	hasProperty,
	hasMethod,
	hasDefaultExport,
} from "./../../../test/JasmineExtender";
import * as Utils from "./../../../Utils";

import { Response } from "./../../Response";

import HTTPError from "./../HTTPError";
import { RequestService } from "../../Request";

import * as ServiceUnavailableError from "./ServiceUnavailableError";
import DefaultExport from"./ServiceUnavailableError";

describe( module( "Carbon/HTTP/Errors/server/ServiceUnavailableError" ), ():void => {

	it( isDefined(), ():void => {
		expect( ServiceUnavailableError ).toBeDefined();
		expect( ServiceUnavailableError ).toEqual( jasmine.any( Object ) );
	} );

	describe( clazz(
		"Carbon.HTTP.Errors.ServiceUnavailableError.Class",
		"Error class to indicate that the server is currently unavailable (because it's overloaded or down for maintenance)."
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
			expect( ServiceUnavailableError.Class ).toBeDefined();
			expect( Utils.isFunction( ServiceUnavailableError.Class ) ).toBe( true );
		} );

		it( extendsClass(
			"Carbon.Errors.HTTPError"
		), ():void => {
			let error:ServiceUnavailableError.Class = new ServiceUnavailableError.Class( "Message of the error", response );

			expect( error instanceof HTTPError ).toBe( true );
		} );

		it( hasConstructor( [
			{ name: "message", type: "string" },
			{ name: "response", type: "Carbon.HTTP.Response.Class" },
		] ), ():void => {
			let error:ServiceUnavailableError.Class = new ServiceUnavailableError.Class( "Message of the error", response );

			expect( error ).toBeTruthy();
			expect( error instanceof ServiceUnavailableError.Class ).toBe( true );
		} );

		it( hasMethod(
			INSTANCE,
			"toString",
			{ type: "string" }
		), ():void => {
			let error:ServiceUnavailableError.Class = new ServiceUnavailableError.Class( "Message of the error", response );

			expect( error.toString ).toBeDefined();
			expect( Utils.isFunction( error.toString ) );

			expect( error.toString() ).toBe( "ServiceUnavailableError: Message of the error" );
		} );

		it( hasProperty(
			INSTANCE,
			"name",
			"string"
		), ():void => {
			let error:ServiceUnavailableError.Class = new ServiceUnavailableError.Class( "Message of the error", response );

			expect( error.name ).toBeDefined();
			expect( Utils.isString( error.name ) ).toBe( true );

			expect( error.name ).toBe( "ServiceUnavailableError" );
		} );

		it( hasProperty(
			STATIC,
			"statusCode",
			"number"
		), ():void => {
			expect( ServiceUnavailableError.Class.statusCode ).toBeDefined();
			expect( Utils.isNumber( ServiceUnavailableError.Class.statusCode ) );

			expect( ServiceUnavailableError.Class.statusCode ).toBe( 503 );
		} );

	} );

	it( hasDefaultExport( "Carbon.HTTP.Errors.server.ServiceUnavailableError.Class" ), ():void => {
		expect( DefaultExport ).toBeDefined();
		expect( DefaultExport ).toBe( ServiceUnavailableError.Class );
	} );

} );
