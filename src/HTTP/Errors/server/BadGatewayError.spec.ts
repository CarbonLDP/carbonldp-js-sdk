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

import Response from "./../../Response";

import HTTPError from "./../HTTPError";
import { Service } from "../../Request";

import * as BadGatewayError from "./BadGatewayError";
import DefaultExport from "./BadGatewayError";

describe( module( "Carbon/HTTP/Errors/server/BadGatewayError" ), ():void => {

	it( isDefined(), ():void => {
		expect( BadGatewayError ).toBeDefined();
		expect( BadGatewayError ).toEqual( jasmine.any( Object ) );
	} );

	describe( clazz(
		"Carbon.HTTP.Errors.BadGatewayError.Class",
		"Error class to indicate that the server was acting as a gateway or proxy and received an invalid response from the upstream server."
	), ():void => {

		let response:Response;

		beforeAll( ( done:{ ():void, fail:() => void } ) => {
			jasmine.Ajax.install();
			jasmine.Ajax.stubRequest( "http://example.com/request/" ).andReturn( {
				"status": 200,
				"responseText": "A response",
			} );

			Service.send( "GET", "http://example.com/request/" ).then( ( _response ) => {
				response = _response;
				done();
			} ).catch( done.fail );

		} );

		afterAll( () => {
			jasmine.Ajax.uninstall();
		} );

		it( isDefined(), ():void => {
			expect( BadGatewayError.Class ).toBeDefined();
			expect( Utils.isFunction( BadGatewayError.Class ) ).toBe( true );
		} );

		it( extendsClass(
			"Carbon.Errors.HTTPError"
		), ():void => {
			let error:BadGatewayError.Class = new BadGatewayError.Class( "Message of the error", response );

			expect( error instanceof HTTPError ).toBe( true );
		} );

		it( hasConstructor( [
			{ name: "message", type: "string" },
			{ name: "response", type: "Carbon.HTTP.Response.Class" },
		] ), ():void => {
			let error:BadGatewayError.Class = new BadGatewayError.Class( "Message of the error", response );

			expect( error ).toBeTruthy();
			expect( error instanceof BadGatewayError.Class ).toBe( true );
		} );

		it( hasMethod(
			INSTANCE,
			"toString",
			{ type: "string" }
		), ():void => {
			let error:BadGatewayError.Class = new BadGatewayError.Class( "Message of the error", response );

			expect( error.toString ).toBeDefined();
			expect( Utils.isFunction( error.toString ) );

			expect( error.toString() ).toBe( "BadGatewayError: Message of the error" );
		} );

		it( hasProperty(
			INSTANCE,
			"name",
			"string"
		), ():void => {
			let error:BadGatewayError.Class = new BadGatewayError.Class( "Message of the error", response );

			expect( error.name ).toBeDefined();
			expect( Utils.isString( error.name ) ).toBe( true );

			expect( error.name ).toBe( "BadGatewayError" );
		} );

		it( hasProperty(
			STATIC,
			"statusCode",
			"number"
		), ():void => {
			expect( BadGatewayError.Class.statusCode ).toBeDefined();
			expect( Utils.isNumber( BadGatewayError.Class.statusCode ) );

			expect( BadGatewayError.Class.statusCode ).toBe( 502 );
		} );

	} );

	it( hasDefaultExport( "Carbon.HTTP.Errors.server.BadGatewayError.Class" ), ():void => {
		expect( DefaultExport ).toBeDefined();
		expect( DefaultExport ).toBe( BadGatewayError.Class );
	} );

} );
