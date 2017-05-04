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

import * as UnsupportedMediaTypeError from "./UnsupportedMediaTypeError";
import DefaultExport from "./UnsupportedMediaTypeError";

describe( module( "Carbon/HTTP/Errors/client/UnsupportedMediaTypeError" ), ():void => {

	it( isDefined(), ():void => {
		expect( UnsupportedMediaTypeError ).toBeDefined();
		expect( UnsupportedMediaTypeError ).toEqual( jasmine.any( Object ) );
	} );

	describe( clazz(
		"Carbon.HTTP.Errors.UnsupportedMediaTypeError.Class",
		"Error class to indicate that the request has a media-type not supported by the server."
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
			expect( UnsupportedMediaTypeError.Class ).toBeDefined();
			expect( Utils.isFunction( UnsupportedMediaTypeError.Class ) ).toBe( true );
		} );

		it( extendsClass(
			"Carbon.Errors.HTTPError"
		), ():void => {
			let error:UnsupportedMediaTypeError.Class = new UnsupportedMediaTypeError.Class( "Message of the error", response );

			expect( error instanceof HTTPError ).toBe( true );
		} );

		it( hasConstructor( [
			{ name: "message", type: "string" },
			{ name: "response", type: "Carbon.HTTP.Response.Class" },
		] ), ():void => {
			let error:UnsupportedMediaTypeError.Class = new UnsupportedMediaTypeError.Class( "Message of the error", response );

			expect( error ).toBeTruthy();
			expect( error instanceof UnsupportedMediaTypeError.Class ).toBe( true );
		} );

		it( hasMethod(
			INSTANCE,
			"toString",
			{ type: "string" }
		), ():void => {
			let error:UnsupportedMediaTypeError.Class = new UnsupportedMediaTypeError.Class( "Message of the error", response );

			expect( error.toString ).toBeDefined();
			expect( Utils.isFunction( error.toString ) );

			expect( error.toString() ).toBe( "UnsupportedMediaTypeError: Message of the error" );
		} );

		it( hasProperty(
			INSTANCE,
			"name",
			"string"
		), ():void => {
			let error:UnsupportedMediaTypeError.Class = new UnsupportedMediaTypeError.Class( "Message of the error", response );

			expect( error.name ).toBeDefined();
			expect( Utils.isString( error.name ) ).toBe( true );

			expect( error.name ).toBe( "UnsupportedMediaTypeError" );
		} );

		it( hasProperty(
			STATIC,
			"statusCode",
			"number"
		), ():void => {
			expect( UnsupportedMediaTypeError.Class.statusCode ).toBeDefined();
			expect( Utils.isNumber( UnsupportedMediaTypeError.Class.statusCode ) );

			expect( UnsupportedMediaTypeError.Class.statusCode ).toBe( 415 );
		} );

	} );

	it( hasDefaultExport( "Carbon.HTTP.Errors.client.UnsupportedMediaTypeError.Class" ), ():void => {
		expect( DefaultExport ).toBeDefined();
		expect( DefaultExport ).toBe( UnsupportedMediaTypeError.Class );
	} );

} );
