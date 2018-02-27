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

import * as NotAcceptableError from "./NotAcceptableError";
import DefaultExport from "./NotAcceptableError";

describe( module( "Carbon/HTTP/Errors/client/NotAcceptableError" ), ():void => {

	it( isDefined(), ():void => {
		expect( NotAcceptableError ).toBeDefined();
		expect( NotAcceptableError ).toEqual( jasmine.any( Object ) );
	} );

	describe( clazz(
		"Carbon.HTTP.Errors.NotAcceptableError.Class",
		"Error class to indicate that the server cannot respond with the data type specified by the accept header of the request."
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
			expect( NotAcceptableError.Class ).toBeDefined();
			expect( Utils.isFunction( NotAcceptableError.Class ) ).toBe( true );
		} );

		it( extendsClass(
			"Carbon.Errors.HTTPError"
		), ():void => {
			let error:NotAcceptableError.Class = new NotAcceptableError.Class( "Message of the error", response );

			expect( error instanceof HTTPError ).toBe( true );
		} );

		it( hasConstructor( [
			{ name: "message", type: "string" },
			{ name: "response", type: "Carbon.HTTP.Response.Class" },
		] ), ():void => {
			let error:NotAcceptableError.Class = new NotAcceptableError.Class( "Message of the error", response );

			expect( error ).toBeTruthy();
			expect( error instanceof NotAcceptableError.Class ).toBe( true );
		} );

		it( hasMethod(
			INSTANCE,
			"toString",
			{ type: "string" }
		), ():void => {
			let error:NotAcceptableError.Class = new NotAcceptableError.Class( "Message of the error", response );

			expect( error.toString ).toBeDefined();
			expect( Utils.isFunction( error.toString ) );

			expect( error.toString() ).toBe( "NotAcceptableError: Message of the error" );
		} );

		it( hasProperty(
			INSTANCE,
			"name",
			"string"
		), ():void => {
			let error:NotAcceptableError.Class = new NotAcceptableError.Class( "Message of the error", response );

			expect( error.name ).toBeDefined();
			expect( Utils.isString( error.name ) ).toBe( true );

			expect( error.name ).toBe( "NotAcceptableError" );
		} );

		it( hasProperty(
			STATIC,
			"statusCode",
			"number"
		), ():void => {
			expect( NotAcceptableError.Class.statusCode ).toBeDefined();
			expect( Utils.isNumber( NotAcceptableError.Class.statusCode ) );

			expect( NotAcceptableError.Class.statusCode ).toBe( 406 );
		} );

	} );

	it( hasDefaultExport( "Carbon.HTTP.Errors.client.NotAcceptableError.Class" ), ():void => {
		expect( DefaultExport ).toBeDefined();
		expect( DefaultExport ).toBe( NotAcceptableError.Class );
	} );

} );
