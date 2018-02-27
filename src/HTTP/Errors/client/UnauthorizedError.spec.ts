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

import * as UnauthorizedError from "./UnauthorizedError";
import DefaultExport from "./UnauthorizedError";

describe( module( "Carbon/HTTP/Errors/client/UnauthorizedError" ), ():void => {

	it( isDefined(), ():void => {
		expect( UnauthorizedError ).toBeDefined();
		expect( UnauthorizedError ).toEqual( jasmine.any( Object ) );
	} );

	describe( clazz(
		"Carbon.HTTP.Errors.UnauthorizedError.Class",
		"Error class to indicate that authentication is required or has failed."
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
			expect( UnauthorizedError.Class ).toBeDefined();
			expect( Utils.isFunction( UnauthorizedError.Class ) ).toBe( true );
		} );

		it( extendsClass(
			"Carbon.Errors.HTTPError"
		), ():void => {
			let error:UnauthorizedError.Class = new UnauthorizedError.Class( "Message of the error", response );

			expect( error instanceof HTTPError ).toBe( true );
		} );

		it( hasConstructor( [
			{ name: "message", type: "string" },
			{ name: "response", type: "Carbon.HTTP.Response.Class" },
		] ), ():void => {
			let error:UnauthorizedError.Class = new UnauthorizedError.Class( "Message of the error", response );

			expect( error ).toBeTruthy();
			expect( error instanceof UnauthorizedError.Class ).toBe( true );
		} );

		it( hasMethod(
			INSTANCE,
			"toString",
			{ type: "string" }
		), ():void => {
			let error:UnauthorizedError.Class = new UnauthorizedError.Class( "Message of the error", response );

			expect( error.toString ).toBeDefined();
			expect( Utils.isFunction( error.toString ) );

			expect( error.toString() ).toBe( "UnauthorizedError: Message of the error" );
		} );

		it( hasProperty(
			INSTANCE,
			"name",
			"string"
		), ():void => {
			let error:UnauthorizedError.Class = new UnauthorizedError.Class( "Message of the error", response );

			expect( error.name ).toBeDefined();
			expect( Utils.isString( error.name ) ).toBe( true );

			expect( error.name ).toBe( "UnauthorizedError" );
		} );

		it( hasProperty(
			STATIC,
			"statusCode",
			"number"
		), ():void => {
			expect( UnauthorizedError.Class.statusCode ).toBeDefined();
			expect( Utils.isNumber( UnauthorizedError.Class.statusCode ) );

			expect( UnauthorizedError.Class.statusCode ).toBe( 401 );
		} );

	} );

	it( hasDefaultExport( "Carbon.HTTP.Errors.client.UnauthorizedError.Class" ), ():void => {
		expect( DefaultExport ).toBeDefined();
		expect( DefaultExport ).toBe( UnauthorizedError.Class );
	} );

} );
