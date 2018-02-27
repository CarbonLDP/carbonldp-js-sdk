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

import * as NotFoundError from "./NotFoundError";
import DefaultExport from "./NotFoundError";

describe( module( "Carbon/HTTP/Errors/client/NotFoundError" ), ():void => {

	it( isDefined(), ():void => {
		expect( NotFoundError ).toBeDefined();
		expect( NotFoundError ).toEqual( jasmine.any( Object ) );
	} );

	describe( clazz(
		"Carbon.HTTP.Errors.NotFoundError.Class",
		"Error class to indicate that the resource was not found."
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
			expect( NotFoundError.Class ).toBeDefined();
			expect( Utils.isFunction( NotFoundError.Class ) ).toBe( true );
		} );

		it( extendsClass(
			"Carbon.Errors.HTTPError"
		), ():void => {
			let error:NotFoundError.Class = new NotFoundError.Class( "Message of the error", response );

			expect( error instanceof HTTPError ).toBe( true );
		} );

		it( hasConstructor( [
			{ name: "message", type: "string" },
			{ name: "response", type: "Carbon.HTTP.Response.Class" },
		] ), ():void => {
			let error:NotFoundError.Class = new NotFoundError.Class( "Message of the error", response );

			expect( error ).toBeTruthy();
			expect( error instanceof NotFoundError.Class ).toBe( true );
		} );

		it( hasMethod(
			INSTANCE,
			"toString",
			{ type: "string" }
		), ():void => {
			let error:NotFoundError.Class = new NotFoundError.Class( "Message of the error", response );

			expect( error.toString ).toBeDefined();
			expect( Utils.isFunction( error.toString ) );

			expect( error.toString() ).toBe( "NotFoundError: Message of the error" );
		} );

		it( hasProperty(
			INSTANCE,
			"name",
			"string"
		), ():void => {
			let error:NotFoundError.Class = new NotFoundError.Class( "Message of the error", response );

			expect( error.name ).toBeDefined();
			expect( Utils.isString( error.name ) ).toBe( true );

			expect( error.name ).toBe( "NotFoundError" );
		} );

		it( hasProperty(
			STATIC,
			"statusCode",
			"number"
		), ():void => {
			expect( NotFoundError.Class.statusCode ).toBeDefined();
			expect( Utils.isNumber( NotFoundError.Class.statusCode ) );

			expect( NotFoundError.Class.statusCode ).toBe( 404 );
		} );

	} );

	it( hasDefaultExport( "Carbon.HTTP.Errors.client.NotFoundError.Class" ), ():void => {
		expect( DefaultExport ).toBeDefined();
		expect( DefaultExport ).toBe( NotFoundError.Class );
	} );

} );
