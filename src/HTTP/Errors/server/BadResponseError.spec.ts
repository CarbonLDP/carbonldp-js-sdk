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

import * as BadResponseError from "./BadResponseError";
import DefaultExport from "./BadResponseError";

describe( module( "Carbon/HTTP/Errors/server/BadResponseError" ), ():void => {

	it( isDefined(), ():void => {
		expect( BadResponseError ).toBeDefined();
		expect( BadResponseError ).toEqual( jasmine.any( Object ) );
	} );

	describe( clazz(
		"Carbon.HTTP.Errors.BadResponseError.Class",
		"Error class to indicate that the response obtained isn't the expected or can't be interpreted."
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
			expect( BadResponseError.Class ).toBeDefined();
			expect( Utils.isFunction( BadResponseError.Class ) ).toBe( true );
		} );

		it( extendsClass(
			"Carbon.Errors.HTTPError"
		), ():void => {
			let error:BadResponseError.Class = new BadResponseError.Class( "Message of the error", response );

			expect( error instanceof HTTPError ).toBe( true );
		} );

		it( hasConstructor( [
			{ name: "message", type: "string" },
			{ name: "response", type: "Carbon.HTTP.Response.Class" },
		] ), ():void => {
			let error:BadResponseError.Class = new BadResponseError.Class( "Message of the error", response );

			expect( error ).toBeTruthy();
			expect( error instanceof BadResponseError.Class ).toBe( true );
		} );

		it( hasMethod(
			INSTANCE,
			"toString",
			{ type: "string" }
		), ():void => {
			let error:BadResponseError.Class = new BadResponseError.Class( "Message of the error", response );

			expect( error.toString ).toBeDefined();
			expect( Utils.isFunction( error.toString ) );

			expect( error.toString() ).toBe( "BadResponseError: Message of the error" );
		} );

		it( hasProperty(
			INSTANCE,
			"name",
			"string"
		), ():void => {
			let error:BadResponseError.Class = new BadResponseError.Class( "Message of the error", response );

			expect( error.name ).toBeDefined();
			expect( Utils.isString( error.name ) ).toBe( true );

			expect( error.name ).toBe( "BadResponseError" );
		} );

		it( hasProperty(
			STATIC,
			"statusCode",
			"number"
		), ():void => {
			expect( BadResponseError.Class.statusCode ).toBeDefined();
			expect( Utils.isNumber( BadResponseError.Class.statusCode ) );

			expect( BadResponseError.Class.statusCode ).toBe( 0 );
		} );

	} );

	it( hasDefaultExport( "Carbon.HTTP.Errors.server.BadResponseError.Class" ), ():void => {
		expect( DefaultExport ).toBeDefined();
		expect( DefaultExport ).toBe( BadResponseError.Class );
	} );

} );
