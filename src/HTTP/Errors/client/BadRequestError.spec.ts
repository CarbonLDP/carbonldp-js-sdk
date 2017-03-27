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

import * as BadRequestError from "./BadRequestError";
import DefaultExport from "./BadRequestError";

describe( module( "Carbon/HTTP/Errors/client/BadRequestError" ), ():void => {

	it( isDefined(), ():void => {
		expect( BadRequestError ).toBeDefined();
		expect( BadRequestError ).toEqual( jasmine.any( Object ) );
	} );

	describe( clazz(
		"Carbon.HTTP.Errors.BadRequestError.Class",
		"Error class to indicate that a malformed request has been sent."
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
			expect( BadRequestError.Class ).toBeDefined();
			expect( Utils.isFunction( BadRequestError.Class ) ).toBe( true );
		} );

		it( extendsClass(
			"Carbon.Errors.HTTPError"
		), ():void => {
			let error:BadRequestError.Class = new BadRequestError.Class( "Message of the error", response );

			expect( error instanceof HTTPError ).toBe( true );
		} );

		it( hasConstructor( [
			{ name: "message", type: "string" },
			{ name: "response", type: "Carbon.HTTP.Response.Class" },
		] ), ():void => {
			let error:BadRequestError.Class = new BadRequestError.Class( "Message of the error", response );

			expect( error ).toBeTruthy();
			expect( error instanceof BadRequestError.Class ).toBe( true );
		} );

		it( hasMethod(
			INSTANCE,
			"toString",
			{ type: "string" }
		), ():void => {
			let error:BadRequestError.Class = new BadRequestError.Class( "Message of the error", response );

			expect( error.toString ).toBeDefined();
			expect( Utils.isFunction( error.toString ) );

			expect( error.toString() ).toBe( "BadRequestError: Message of the error" );
		} );

		it( hasProperty(
			INSTANCE,
			"name",
			"string"
		), ():void => {
			let error:BadRequestError.Class = new BadRequestError.Class( "Message of the error", response );

			expect( error.name ).toBeDefined();
			expect( Utils.isString( error.name ) ).toBe( true );

			expect( error.name ).toBe( "BadRequestError" );
		} );

		it( hasProperty(
			STATIC,
			"statusCode",
			"number"
		), ():void => {
			expect( BadRequestError.Class.statusCode ).toBeDefined();
			expect( Utils.isNumber( BadRequestError.Class.statusCode ) );
			expect( BadRequestError.Class.statusCode ).toBe( 400 );
		} );

	} );

	it( hasDefaultExport( "Carbon.HTTP.Errors.client.BadRequestError.Class" ), ():void => {
		expect( DefaultExport ).toBeDefined();
		expect( DefaultExport ).toBe( BadRequestError.Class );
	} );

} );
