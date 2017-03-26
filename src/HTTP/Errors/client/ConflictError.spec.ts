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

import * as ConflictError from "./ConflictError";
import DefaultExport from "./ConflictError";

describe( module( "Carbon/HTTP/Errors/client/ConflictError" ), ():void => {

	it( isDefined(), ():void => {
		expect( ConflictError ).toBeDefined();
		expect( ConflictError ).toEqual( jasmine.any( Object ) );
	} );

	describe( clazz(
		"Carbon.HTTP.Errors.ConflictError.Class",
		"Error class to indicate that the request could not be processed because of a conflict, such as an ID conflict."
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
			expect( ConflictError.Class ).toBeDefined();
			expect( Utils.isFunction( ConflictError.Class ) ).toBe( true );
		} );

		it( extendsClass(
			"Carbon.Errors.HTTPError"
		), ():void => {
			let error:ConflictError.Class = new ConflictError.Class( "Message of the error", response );

			expect( error instanceof HTTPError ).toBe( true );
		} );

		it( hasConstructor( [
			{ name: "message", type: "string" },
			{ name: "response", type: "Carbon.HTTP.Response.Class" },
		] ), ():void => {
			let error:ConflictError.Class = new ConflictError.Class( "Message of the error", response );

			expect( error ).toBeTruthy();
			expect( error instanceof ConflictError.Class ).toBe( true );
		} );

		it( hasMethod(
			INSTANCE,
			"toString",
			{ type: "string" }
		), ():void => {
			let error:ConflictError.Class = new ConflictError.Class( "Message of the error", response );

			expect( error.toString ).toBeDefined();
			expect( Utils.isFunction( error.toString ) );

			expect( error.toString() ).toBe( "ConflictError: Message of the error" );
		} );

		it( hasProperty(
			INSTANCE,
			"name",
			"string"
		), ():void => {
			let error:ConflictError.Class = new ConflictError.Class( "Message of the error", response );

			expect( error.name ).toBeDefined();
			expect( Utils.isString( error.name ) ).toBe( true );

			expect( error.name ).toBe( "ConflictError" );
		} );

		it( hasProperty(
			STATIC,
			"statusCode",
			"number"
		), ():void => {
			expect( ConflictError.Class.statusCode ).toBeDefined();
			expect( Utils.isNumber( ConflictError.Class.statusCode ) );
			expect( ConflictError.Class.statusCode ).toBe( 409 );
		} );

	} );

	it( hasDefaultExport( "Carbon.HTTP.Errors.client.ConflictError.Class" ), ():void => {
		expect( DefaultExport ).toBeDefined();
		expect( DefaultExport ).toBe( ConflictError.Class );
	} );

} );
