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

import * as RequestEntityTooLargeError from "./RequestEntityTooLargeError";
import DefaultExport from "./RequestEntityTooLargeError";

describe( module( "Carbon/HTTP/Errors/client/RequestEntityTooLargeError" ), ():void => {

	it( isDefined(), ():void => {
		expect( RequestEntityTooLargeError ).toBeDefined();
		expect( RequestEntityTooLargeError ).toEqual( jasmine.any( Object ) );
	} );

	describe( clazz(
		"Carbon.HTTP.Errors.RequestEntityTooLargeError.Class",
		"Error class to indicate that the request entity is larger than the server is able to process."
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
			expect( RequestEntityTooLargeError.Class ).toBeDefined();
			expect( Utils.isFunction( RequestEntityTooLargeError.Class ) ).toBe( true );
		} );

		it( extendsClass(
			"Carbon.Errors.HTTPError"
		), ():void => {
			let error:RequestEntityTooLargeError.Class = new RequestEntityTooLargeError.Class( "Message of the error", response );

			expect( error instanceof HTTPError ).toBe( true );
		} );

		it( hasConstructor( [
			{ name: "message", type: "string" },
			{ name: "response", type: "Carbon.HTTP.Response.Class" },
		] ), ():void => {
			let error:RequestEntityTooLargeError.Class = new RequestEntityTooLargeError.Class( "Message of the error", response );

			expect( error ).toBeTruthy();
			expect( error instanceof RequestEntityTooLargeError.Class ).toBe( true );
		} );

		it( hasMethod(
			INSTANCE,
			"toString",
			{ type: "string" }
		), ():void => {
			let error:RequestEntityTooLargeError.Class = new RequestEntityTooLargeError.Class( "Message of the error", response );

			expect( error.toString ).toBeDefined();
			expect( Utils.isFunction( error.toString ) );

			expect( error.toString() ).toBe( "RequestEntityTooLargeError: Message of the error" );
		} );

		it( hasProperty(
			INSTANCE,
			"name",
			"string"
		), ():void => {
			let error:RequestEntityTooLargeError.Class = new RequestEntityTooLargeError.Class( "Message of the error", response );

			expect( error.name ).toBeDefined();
			expect( Utils.isString( error.name ) ).toBe( true );

			expect( error.name ).toBe( "RequestEntityTooLargeError" );
		} );

		it( hasProperty(
			STATIC,
			"statusCode",
			"number"
		), ():void => {
			expect( RequestEntityTooLargeError.Class.statusCode ).toBeDefined();
			expect( Utils.isNumber( RequestEntityTooLargeError.Class.statusCode ) );

			expect( RequestEntityTooLargeError.Class.statusCode ).toBe( 413 );
		} );

	} );

	it( hasDefaultExport( "Carbon.HTTP.Errors.client.RequestEntityTooLargeError.Class" ), ():void => {
		expect( DefaultExport ).toBeDefined();
		expect( DefaultExport ).toBe( RequestEntityTooLargeError.Class );
	} );

} );
