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

import * as MethodNotAllowedError from "./MethodNotAllowedError";
import DefaultExport from "./MethodNotAllowedError";

describe( module( "Carbon/HTTP/Errors/client/MethodNotAllowedError" ), ():void => {

	it( isDefined(), ():void => {
		expect( MethodNotAllowedError ).toBeDefined();
		expect( MethodNotAllowedError ).toEqual( jasmine.any( Object ) );
	} );

	describe( clazz(
		"Carbon.HTTP.Errors.MethodNotAllowedError.Class",
		"Error class to indicate that the method used in the request is not allowed for that URI."
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
			expect( MethodNotAllowedError.Class ).toBeDefined();
			expect( Utils.isFunction( MethodNotAllowedError.Class ) ).toBe( true );
		} );

		it( extendsClass(
			"Carbon.Errors.HTTPError"
		), ():void => {
			let error:MethodNotAllowedError.Class = new MethodNotAllowedError.Class( "Message of the error", response );

			expect( error instanceof HTTPError ).toBe( true );
		} );

		it( hasConstructor( [
			{ name: "message", type: "string" },
			{ name: "response", type: "Carbon.HTTP.Response.Class" },
		] ), ():void => {
			let error:MethodNotAllowedError.Class = new MethodNotAllowedError.Class( "Message of the error", response );

			expect( error ).toBeTruthy();
			expect( error instanceof MethodNotAllowedError.Class ).toBe( true );
		} );

		it( hasMethod(
			INSTANCE,
			"toString",
			{ type: "string" }
		), ():void => {
			let error:MethodNotAllowedError.Class = new MethodNotAllowedError.Class( "Message of the error", response );

			expect( error.toString ).toBeDefined();
			expect( Utils.isFunction( error.toString ) );

			expect( error.toString() ).toBe( "MethodNotAllowedError: Message of the error" );
		} );

		it( hasProperty(
			INSTANCE,
			"name",
			"string"
		), ():void => {
			let error:MethodNotAllowedError.Class = new MethodNotAllowedError.Class( "Message of the error", response );

			expect( error.name ).toBeDefined();
			expect( Utils.isString( error.name ) ).toBe( true );

			expect( error.name ).toBe( "MethodNotAllowedError" );
		} );

		it( hasProperty(
			STATIC,
			"statusCode",
			"number"
		), ():void => {
			expect( MethodNotAllowedError.Class.statusCode ).toBeDefined();
			expect( Utils.isNumber( MethodNotAllowedError.Class.statusCode ) );

			expect( MethodNotAllowedError.Class.statusCode ).toBe( 405 );
		} );

	} );

	it( hasDefaultExport( "Carbon.HTTP.Errors.client.MethodNotAllowedError.Class" ), ():void => {
		expect( DefaultExport ).toBeDefined();
		expect( DefaultExport ).toBe( MethodNotAllowedError.Class );
	} );

} );
