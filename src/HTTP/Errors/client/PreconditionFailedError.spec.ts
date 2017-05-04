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

import * as PreconditionFailedError  from "./PreconditionFailedError";
import DefaultExport from "./PreconditionFailedError";

describe( module( "Carbon/HTTP/Errors/client/PreconditionFailedError" ), ():void => {

	it( isDefined(), ():void => {
		expect( PreconditionFailedError ).toBeDefined();
		expect( PreconditionFailedError ).toEqual( jasmine.any( Object ) );
	} );

	describe( clazz(
		"Carbon.HTTP.Errors.PreconditionFailedError.Class",
		"Error class to indicate that the precondition header was resolved to false."
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
			expect( PreconditionFailedError.Class ).toBeDefined();
			expect( Utils.isFunction( PreconditionFailedError.Class ) ).toBe( true );
		} );

		it( extendsClass(
			"Carbon.Errors.HTTPError"
		), ():void => {
			let error:PreconditionFailedError.Class = new PreconditionFailedError.Class( "Message of the error", response );

			expect( error instanceof HTTPError ).toBe( true );
		} );

		it( hasConstructor( [
			{ name: "message", type: "string" },
			{ name: "response", type: "Carbon.HTTP.Response.Class" },
		] ), ():void => {
			let error:PreconditionFailedError.Class = new PreconditionFailedError.Class( "Message of the error", response );

			expect( error ).toBeTruthy();
			expect( error instanceof PreconditionFailedError.Class ).toBe( true );
		} );

		it( hasMethod(
			INSTANCE,
			"toString",
			{ type: "string" }
		), ():void => {
			let error:PreconditionFailedError.Class = new PreconditionFailedError.Class( "Message of the error", response );

			expect( error.toString ).toBeDefined();
			expect( Utils.isFunction( error.toString ) );

			expect( error.toString() ).toBe( "PreconditionFailedError: Message of the error" );
		} );

		it( hasProperty(
			INSTANCE,
			"name",
			"string"
		), ():void => {
			let error:PreconditionFailedError.Class = new PreconditionFailedError.Class( "Message of the error", response );

			expect( error.name ).toBeDefined();
			expect( Utils.isString( error.name ) ).toBe( true );

			expect( error.name ).toBe( "PreconditionFailedError" );
		} );

		it( hasProperty(
			STATIC,
			"statusCode",
			"number"
		), ():void => {
			expect( PreconditionFailedError.Class.statusCode ).toBeDefined();
			expect( Utils.isNumber( PreconditionFailedError.Class.statusCode ) );

			expect( PreconditionFailedError.Class.statusCode ).toBe( 412 );
		} );

	} );

	it( hasDefaultExport( "Carbon.HTTP.Errors.client.PreconditionFailedError.Class" ), ():void => {
		expect( DefaultExport ).toBeDefined();
		expect( DefaultExport ).toBe( PreconditionFailedError.Class );
	} );

} );
