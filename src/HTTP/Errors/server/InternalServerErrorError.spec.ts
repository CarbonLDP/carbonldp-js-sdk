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

import * as InternalServerErrorError from "./InternalServerErrorError";
import DefaultExport from "./InternalServerErrorError";

describe( module( "Carbon/HTTP/Errors/server/InternalServerErrorError" ), ():void => {

	it( isDefined(), ():void => {
		expect( InternalServerErrorError ).toBeDefined();
		expect( InternalServerErrorError ).toEqual( jasmine.any( Object ) );
	} );

	describe( clazz(
		"Carbon.HTTP.Errors.InternalServerErrorError.Class",
		"Error class to indicate that the server encountered an unexpected condition. This generic error is given when no other specific error is suitable."
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
			expect( InternalServerErrorError.Class ).toBeDefined();
			expect( Utils.isFunction( InternalServerErrorError.Class ) ).toBe( true );
		} );

		it( extendsClass(
			"Carbon.Errors.HTTPError"
		), ():void => {
			let error:InternalServerErrorError.Class = new InternalServerErrorError.Class( "Message of the error", response );

			expect( error instanceof HTTPError ).toBe( true );
		} );

		it( hasConstructor( [
			{ name: "message", type: "string" },
			{ name: "response", type: "Carbon.HTTP.Response.Class" },
		] ), ():void => {
			let error:InternalServerErrorError.Class = new InternalServerErrorError.Class( "Message of the error", response );

			expect( error ).toBeTruthy();
			expect( error instanceof InternalServerErrorError.Class ).toBe( true );
		} );

		it( hasMethod(
			INSTANCE,
			"toString",
			{ type: "string" }
		), ():void => {
			let error:InternalServerErrorError.Class = new InternalServerErrorError.Class( "Message of the error", response );

			expect( error.toString ).toBeDefined();
			expect( Utils.isFunction( error.toString ) );

			expect( error.toString() ).toBe( "InternalServerErrorError: Message of the error" );
		} );

		it( hasProperty(
			INSTANCE,
			"name",
			"string"
		), ():void => {
			let error:InternalServerErrorError.Class = new InternalServerErrorError.Class( "Message of the error", response );

			expect( error.name ).toBeDefined();
			expect( Utils.isString( error.name ) ).toBe( true );

			expect( error.name ).toBe( "InternalServerErrorError" );
		} );

		it( hasProperty(
			STATIC,
			"statusCode",
			"number"
		), ():void => {
			expect( InternalServerErrorError.Class.statusCode ).toBeDefined();
			expect( Utils.isNumber( InternalServerErrorError.Class.statusCode ) );

			expect( InternalServerErrorError.Class.statusCode ).toBe( 500 );
		} );

	} );

	it( hasDefaultExport( "Carbon.HTTP.Errors.server.InternalServerErrorError.Class" ), ():void => {
		expect( DefaultExport ).toBeDefined();
		expect( DefaultExport ).toBe( InternalServerErrorError.Class );
	} );

} );
