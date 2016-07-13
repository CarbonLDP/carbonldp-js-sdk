import {
	INSTANCE,
	STATIC,

	module,
	clazz,

	isDefined,
	extendsClass,
	hasConstructor,
	hasProperty,
	hasMethod
} from "./../../../test/JasmineExtender";
import * as Utils from "./../../../Utils";

import Response from "./../../Response";

import GatewayTimeoutError from "./GatewayTimeoutError";
import HTTPError from "./../HTTPError";
import {Service} from "../../Request";

describe( module(
	"Carbon/HTTP/Errors/server/GatewayTimeoutError"
), ():void => {

	describe( clazz(
		"Carbon.HTTP.Errors.server.GatewayTimeoutError",
		"Error class that can be throw to indicate that the server, while acting as a gateway or proxy, did not receive a timely response from the upstream server"
	), ():void => {

		let response:Response;

		beforeAll( ( done:{ ():void, fail:() => void } ) => {
			jasmine.Ajax.install();
			jasmine.Ajax.stubRequest( "http://example.com/request/" ).andReturn( {
				"status": 200,
				"responseText": "A response"
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
			expect( GatewayTimeoutError ).toBeDefined();
			expect( Utils.isFunction( GatewayTimeoutError ) ).toBe( true );
		} );

		it( extendsClass(
			"Carbon.Errors.HTTPError"
		), ():void => {
			let error:GatewayTimeoutError = new GatewayTimeoutError( "Message of the error", response );

			expect( error instanceof HTTPError ).toBe( true );
		} );

		it( hasConstructor( [
			{name: "message", type: "string"},
			{name: "response", type: "Carbon.HTTP.Response"}
		] ), ():void => {
			let error:GatewayTimeoutError = new GatewayTimeoutError( "Message of the error", response );

			expect( error ).toBeTruthy();
			expect( error instanceof GatewayTimeoutError ).toBe( true );
		} );

		it( hasMethod(
			INSTANCE,
			"toString",
			{type: "string"}
		), ():void => {
			let error:GatewayTimeoutError = new GatewayTimeoutError( "Message of the error", response );

			expect( error.toString ).toBeDefined();
			expect( Utils.isFunction( error.toString ) );

			expect( error.toString() ).toBe( "GatewayTimeoutError: Message of the error" );
		} );

		it( hasProperty(
			INSTANCE,
			"name",
			"string"
		), ():void => {
			let error:GatewayTimeoutError = new GatewayTimeoutError( "Message of the error", response );

			expect( error.name ).toBeDefined();
			expect( Utils.isString( error.name ) ).toBe( true );

			expect( error.name ).toBe( "GatewayTimeoutError" );
		} );

		it( hasProperty(
			STATIC,
			"statusCode",
			"number"
		), ():void => {
			expect( GatewayTimeoutError.statusCode ).toBeDefined();
			expect( Utils.isNumber( GatewayTimeoutError.statusCode ) );

			expect( GatewayTimeoutError.statusCode ).toBe( 504 );
		} );

	} );

} );
