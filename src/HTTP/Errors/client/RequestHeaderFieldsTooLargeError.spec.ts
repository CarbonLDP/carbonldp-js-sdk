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
import { Service } from "../../Request";

import * as RequestHeaderFieldsTooLargeError from "./RequestHeaderFieldsTooLargeError";
import DefaultExport from "./RequestHeaderFieldsTooLargeError";

describe( module( "Carbon/HTTP/Errors/client/RequestHeaderFieldsTooLargeError" ), ():void => {

	it( isDefined(), ():void => {
		expect( RequestHeaderFieldsTooLargeError ).toBeDefined();
		expect( RequestHeaderFieldsTooLargeError ).toEqual( jasmine.any( Object ) );
	} );

	describe( clazz(
		"Carbon.HTTP.Errors.RequestHeaderFieldsTooLargeError.Class",
		"Error class to indicate that the server is not able to process the request because its header fields are too large."
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
			expect( RequestHeaderFieldsTooLargeError.Class ).toBeDefined();
			expect( Utils.isFunction( RequestHeaderFieldsTooLargeError.Class ) ).toBe( true );
		} );

		it( extendsClass(
			"Carbon.Errors.HTTPError"
		), ():void => {
			let error:RequestHeaderFieldsTooLargeError.Class = new RequestHeaderFieldsTooLargeError.Class( "Message of the error", response );

			expect( error instanceof HTTPError ).toBe( true );
		} );

		it( hasConstructor( [
			{ name: "message", type: "string" },
			{ name: "response", type: "Carbon.HTTP.Response.Class" },
		] ), ():void => {
			let error:RequestHeaderFieldsTooLargeError.Class = new RequestHeaderFieldsTooLargeError.Class( "Message of the error", response );

			expect( error ).toBeTruthy();
			expect( error instanceof RequestHeaderFieldsTooLargeError.Class ).toBe( true );
		} );

		it( hasMethod(
			INSTANCE,
			"toString",
			{ type: "string" }
		), ():void => {
			let error:RequestHeaderFieldsTooLargeError.Class = new RequestHeaderFieldsTooLargeError.Class( "Message of the error", response );

			expect( error.toString ).toBeDefined();
			expect( Utils.isFunction( error.toString ) );

			expect( error.toString() ).toBe( "RequestHeaderFieldsTooLargeError: Message of the error" );
		} );

		it( hasProperty(
			INSTANCE,
			"name",
			"string"
		), ():void => {
			let error:RequestHeaderFieldsTooLargeError.Class = new RequestHeaderFieldsTooLargeError.Class( "Message of the error", response );

			expect( error.name ).toBeDefined();
			expect( Utils.isString( error.name ) ).toBe( true );

			expect( error.name ).toBe( "RequestHeaderFieldsTooLargeError" );
		} );

		it( hasProperty(
			STATIC,
			"statusCode",
			"number"
		), ():void => {
			expect( RequestHeaderFieldsTooLargeError.Class.statusCode ).toBeDefined();
			expect( Utils.isNumber( RequestHeaderFieldsTooLargeError.Class.statusCode ) );

			expect( RequestHeaderFieldsTooLargeError.Class.statusCode ).toBe( 431 );
		} );

	} );

	it( hasDefaultExport( "Carbon.HTTP.Errors.client.RequestHeaderFieldsTooLargeError.Class" ), ():void => {
		expect( DefaultExport ).toBeDefined();
		expect( DefaultExport ).toBe( RequestHeaderFieldsTooLargeError.Class );
	} );

} );
