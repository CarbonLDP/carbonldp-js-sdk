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

import * as PreconditionRequiredError  from "./PreconditionRequiredError";
import DefaultExport from "./PreconditionRequiredError";

describe( module( "Carbon/HTTP/Errors/client/PreconditionRequiredError" ), ():void => {

	it( isDefined(), ():void => {
		expect( PreconditionRequiredError ).toBeDefined();
		expect( PreconditionRequiredError ).toEqual( jasmine.any( Object ) );
	} );

	describe( clazz(
		"Carbon.HTTP.Errors.PreconditionRequiredError.Class",
		"Error class to indicate that the request is missing a precondition header."
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
			expect( PreconditionRequiredError.Class ).toBeDefined();
			expect( Utils.isFunction( PreconditionRequiredError.Class ) ).toBe( true );
		} );

		it( extendsClass(
			"Carbon.Errors.HTTPError"
		), ():void => {
			let error:PreconditionRequiredError.Class = new PreconditionRequiredError.Class( "Message of the error", response );

			expect( error instanceof HTTPError ).toBe( true );
		} );

		it( hasConstructor( [
			{ name: "message", type: "string" },
			{ name: "response", type: "Carbon.HTTP.Response.Class" },
		] ), ():void => {
			let error:PreconditionRequiredError.Class = new PreconditionRequiredError.Class( "Message of the error", response );

			expect( error ).toBeTruthy();
			expect( error instanceof PreconditionRequiredError.Class ).toBe( true );
		} );

		it( hasMethod(
			INSTANCE,
			"toString",
			{ type: "string" }
		), ():void => {
			let error:PreconditionRequiredError.Class = new PreconditionRequiredError.Class( "Message of the error", response );

			expect( error.toString ).toBeDefined();
			expect( Utils.isFunction( error.toString ) );

			expect( error.toString() ).toBe( "PreconditionRequiredError: Message of the error" );
		} );

		it( hasProperty(
			INSTANCE,
			"name",
			"string"
		), ():void => {
			let error:PreconditionRequiredError.Class = new PreconditionRequiredError.Class( "Message of the error", response );

			expect( error.name ).toBeDefined();
			expect( Utils.isString( error.name ) ).toBe( true );

			expect( error.name ).toBe( "PreconditionRequiredError" );
		} );

		it( hasProperty(
			STATIC,
			"statusCode",
			"number"
		), ():void => {
			expect( PreconditionRequiredError.Class.statusCode ).toBeDefined();
			expect( Utils.isNumber( PreconditionRequiredError.Class.statusCode ) );

			expect( PreconditionRequiredError.Class.statusCode ).toBe( 428 );
		} );

	} );

	it( hasDefaultExport( "Carbon.HTTP.Errors.client.PreconditionRequiredError.Class" ), ():void => {
		expect( DefaultExport ).toBeDefined();
		expect( DefaultExport ).toBe( PreconditionRequiredError.Class );
	} );

} );
