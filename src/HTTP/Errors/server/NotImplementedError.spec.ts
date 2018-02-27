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

import * as NotImplementedError from "./NotImplementedError";
import DefaultExport from "./NotImplementedError";

describe( module( "Carbon/HTTP/Errors/server/NotImplementedError" ), ():void => {

	it( isDefined(), ():void => {
		expect( NotImplementedError ).toBeDefined();
		expect( NotImplementedError ).toEqual( jasmine.any( Object ) );
	} );

	describe( clazz(
		"Carbon.HTTP.Errors.NotImplementedError.Class",
		"Error class to indicate that the server doesn't have the ability to fulfill the request yet."
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
			expect( NotImplementedError.Class ).toBeDefined();
			expect( Utils.isFunction( NotImplementedError.Class ) ).toBe( true );
		} );

		it( extendsClass(
			"Carbon.Errors.HTTPError"
		), ():void => {
			let error:NotImplementedError.Class = new NotImplementedError.Class( "Message of the error", response );

			expect( error instanceof HTTPError ).toBe( true );
		} );

		it( hasConstructor( [
			{ name: "message", type: "string" },
			{ name: "response", type: "Carbon.HTTP.Response.Class" },
		] ), ():void => {
			let error:NotImplementedError.Class = new NotImplementedError.Class( "Message of the error", response );

			expect( error ).toBeTruthy();
			expect( error instanceof NotImplementedError.Class ).toBe( true );
		} );

		it( hasMethod(
			INSTANCE,
			"toString",
			{ type: "string" }
		), ():void => {
			let error:NotImplementedError.Class = new NotImplementedError.Class( "Message of the error", response );

			expect( error.toString ).toBeDefined();
			expect( Utils.isFunction( error.toString ) );

			expect( error.toString() ).toBe( "NotImplementedError: Message of the error" );
		} );

		it( hasProperty(
			INSTANCE,
			"name",
			"string"
		), ():void => {
			let error:NotImplementedError.Class = new NotImplementedError.Class( "Message of the error", response );

			expect( error.name ).toBeDefined();
			expect( Utils.isString( error.name ) ).toBe( true );

			expect( error.name ).toBe( "NotImplementedError" );
		} );

		it( hasProperty(
			STATIC,
			"statusCode",
			"number"
		), ():void => {
			expect( NotImplementedError.Class.statusCode ).toBeDefined();
			expect( Utils.isNumber( NotImplementedError.Class.statusCode ) );

			expect( NotImplementedError.Class.statusCode ).toBe( 501 );
		} );

	} );

	it( hasDefaultExport( "Carbon.HTTP.Errors.server.NotImplementedError.Class" ), ():void => {
		expect( DefaultExport ).toBeDefined();
		expect( DefaultExport ).toBe( NotImplementedError.Class );
	} );

} );
