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

import * as ForbiddenError from "./ForbiddenError";
import DefaultExport from "./ForbiddenError";

describe( module( "Carbon/HTTP/Errors/client/ForbiddenError" ), ():void => {

	it( isDefined(), ():void => {
		expect( ForbiddenError ).toBeDefined();
		expect( ForbiddenError ).toEqual( jasmine.any( Object ) );
	} );

	describe( clazz(
		"Carbon.HTTP.Errors.ForbiddenError.Class",
		"Error class to indicate that the current user doesn't have permissions to fulfill the request."
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
			expect( ForbiddenError.Class ).toBeDefined();
			expect( Utils.isFunction( ForbiddenError.Class ) ).toBe( true );
		} );

		it( extendsClass(
			"Carbon.Errors.HTTPError"
		), ():void => {
			let error:ForbiddenError.Class = new ForbiddenError.Class( "Message of the error", response );

			expect( error instanceof HTTPError ).toBe( true );
		} );

		it( hasConstructor( [
			{ name: "message", type: "string" },
			{ name: "response", type: "Carbon.HTTP.Response.Class" },
		] ), ():void => {
			let error:ForbiddenError.Class = new ForbiddenError.Class( "Message of the error", response );

			expect( error ).toBeTruthy();
			expect( error instanceof ForbiddenError.Class ).toBe( true );
		} );

		it( hasMethod(
			INSTANCE,
			"toString",
			{ type: "string" }
		), ():void => {
			let error:ForbiddenError.Class = new ForbiddenError.Class( "Message of the error", response );

			expect( error.toString ).toBeDefined();
			expect( Utils.isFunction( error.toString ) );

			expect( error.toString() ).toBe( "ForbiddenError: Message of the error" );
		} );

		it( hasProperty(
			INSTANCE,
			"name",
			"string"
		), ():void => {
			let error:ForbiddenError.Class = new ForbiddenError.Class( "Message of the error", response );

			expect( error.name ).toBeDefined();
			expect( Utils.isString( error.name ) ).toBe( true );

			expect( error.name ).toBe( "ForbiddenError" );
		} );

		it( hasProperty(
			STATIC,
			"statusCode",
			"number"
		), ():void => {
			expect( ForbiddenError.Class.statusCode ).toBeDefined();
			expect( Utils.isNumber( ForbiddenError.Class.statusCode ) );

			expect( ForbiddenError.Class.statusCode ).toBe( 403 );
		} );

	} );

	it( hasDefaultExport( "Carbon.HTTP.Errors.client.ForbiddenError.Class" ), ():void => {
		expect( DefaultExport ).toBeDefined();
		expect( DefaultExport ).toBe( ForbiddenError.Class );
	} );

} );
