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

import MethodNotAllowedError from "./MethodNotAllowedError";
import HTTPError from "./../HTTPError";
import {Service} from "../../Request";

describe( module(
	"Carbon/HTTP/Errors/client/MethodNotAllowedError"
), ():void => {

	describe( clazz(
		"Carbon.HTTP.Errors.MethodNotAllowedError",
		"Error class to indicate that the method used in the request is not allowed for that URI."
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
			expect( MethodNotAllowedError ).toBeDefined();
			expect( Utils.isFunction( MethodNotAllowedError ) ).toBe( true );
		} );

		it( extendsClass(
			"Carbon.Errors.HTTPError"
		), ():void => {
			let error:MethodNotAllowedError = new MethodNotAllowedError( "Message of the error", response );

			expect( error instanceof HTTPError ).toBe( true );
		} );

		it( hasConstructor( [
			{name: "message", type: "string"},
			{name: "response", type: "Carbon.HTTP.Response"}
		] ), ():void => {
			let error:MethodNotAllowedError = new MethodNotAllowedError( "Message of the error", response );

			expect( error ).toBeTruthy();
			expect( error instanceof MethodNotAllowedError ).toBe( true );
		} );

		it( hasMethod(
			INSTANCE,
			"toString",
			{type: "string"}
		), ():void => {
			let error:MethodNotAllowedError = new MethodNotAllowedError( "Message of the error", response );

			expect( error.toString ).toBeDefined();
			expect( Utils.isFunction( error.toString ) );

			expect( error.toString() ).toBe( "MethodNotAllowedError: Message of the error" );
		} );

		it( hasProperty(
			INSTANCE,
			"name",
			"string"
		), ():void => {
			let error:MethodNotAllowedError = new MethodNotAllowedError( "Message of the error", response );

			expect( error.name ).toBeDefined();
			expect( Utils.isString( error.name ) ).toBe( true );

			expect( error.name ).toBe( "MethodNotAllowedError" );
		} );

		it( hasProperty(
			STATIC,
			"statusCode",
			"number"
		), ():void => {
			expect( MethodNotAllowedError.statusCode ).toBeDefined();
			expect( Utils.isNumber( MethodNotAllowedError.statusCode ) );

			expect( MethodNotAllowedError.statusCode ).toBe( 405 );
		} );

	} );

} );
