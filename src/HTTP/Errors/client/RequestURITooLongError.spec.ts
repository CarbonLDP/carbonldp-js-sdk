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

import * as RequestURITooLongError from "./RequestURITooLongError";
import DefaultExport from "./RequestURITooLongError";

describe( module( "Carbon/HTTP/Errors/client/RequestURITooLongError" ), ():void => {

	it( isDefined(), ():void => {
		expect( RequestURITooLongError ).toBeDefined();
		expect( RequestURITooLongError ).toEqual( jasmine.any( Object ) );
	} );

	describe( clazz(
		"Carbon.HTTP.Errors.RequestURITooLongError.Class",
		"Error class to indicate that the server is not able to process the request because the URI is too long."
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
			expect( RequestURITooLongError.Class ).toBeDefined();
			expect( Utils.isFunction( RequestURITooLongError.Class ) ).toBe( true );
		} );

		it( extendsClass(
			"Carbon.Errors.HTTPError"
		), ():void => {
			let error:RequestURITooLongError.Class = new RequestURITooLongError.Class( "Message of the error", response );

			expect( error instanceof HTTPError ).toBe( true );
		} );

		it( hasConstructor( [
			{ name: "message", type: "string" },
			{ name: "response", type: "Carbon.HTTP.Response.Class" },
		] ), ():void => {
			let error:RequestURITooLongError.Class = new RequestURITooLongError.Class( "Message of the error", response );

			expect( error ).toBeTruthy();
			expect( error instanceof RequestURITooLongError.Class ).toBe( true );
		} );

		it( hasMethod(
			INSTANCE,
			"toString",
			{ type: "string" }
		), ():void => {
			let error:RequestURITooLongError.Class = new RequestURITooLongError.Class( "Message of the error", response );

			expect( error.toString ).toBeDefined();
			expect( Utils.isFunction( error.toString ) );

			expect( error.toString() ).toBe( "RequestURITooLongError: Message of the error" );
		} );

		it( hasProperty(
			INSTANCE,
			"name",
			"string"
		), ():void => {
			let error:RequestURITooLongError.Class = new RequestURITooLongError.Class( "Message of the error", response );

			expect( error.name ).toBeDefined();
			expect( Utils.isString( error.name ) ).toBe( true );

			expect( error.name ).toBe( "RequestURITooLongError" );
		} );

		it( hasProperty(
			STATIC,
			"statusCode",
			"number"
		), ():void => {
			expect( RequestURITooLongError.Class.statusCode ).toBeDefined();
			expect( Utils.isNumber( RequestURITooLongError.Class.statusCode ) );

			expect( RequestURITooLongError.Class.statusCode ).toBe( 414 );
		} );

	} );

	it( hasDefaultExport( "Carbon.HTTP.Errors.client.RequestURITooLongError.Class" ), ():void => {
		expect( DefaultExport ).toBeDefined();
		expect( DefaultExport ).toBe( RequestURITooLongError.Class );
	} );

} );
