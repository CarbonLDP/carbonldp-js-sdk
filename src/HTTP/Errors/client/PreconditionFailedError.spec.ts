import {
	INSTANCE,
	STATIC,

	module,
	clazz,

	isDefined,
	extendsClass,
	hasConstructor,
	hasProperty,
	hasMethod
} from "./../../../test/JasmineExtender";
import * as Utils from "./../../../Utils";

import Response from "./../../Response";

import PreconditionFailedError from "./PreconditionFailedError";
import HTTPError from "./../HTTPError";
import {Service} from "../../Request";

describe( module(
	"Carbon/HTTP/Errors/client/PreconditionFailedError"
), ():void => {

	describe( clazz(
		"Carbon.HTTP.Errors.client.PreconditionFailedError",
		"Error class that can be throw to indicate that the precondition header was resolved to false"
	), ():void => {

		let response:Response;

		beforeAll( ( done:{ ():void, fail:() => void } ) => {
			jasmine.Ajax.install();
			jasmine.Ajax.stubRequest( "http://example.com/request/" ).andReturn( {
				"status": 200,
				"responseText": "A response"
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
			expect( PreconditionFailedError ).toBeDefined();
			expect( Utils.isFunction( PreconditionFailedError ) ).toBe( true );
		} );

		it( extendsClass(
			"Carbon.Errors.HTTPError"
		), ():void => {
			let error:PreconditionFailedError = new PreconditionFailedError( "Message of the error", response );

			expect( error instanceof HTTPError ).toBe( true );
		} );

		it( hasConstructor( [
			{name: "message", type: "string"},
			{name: "response", type: "Carbon.HTTP.Response"}
		] ), ():void => {
			let error:PreconditionFailedError = new PreconditionFailedError( "Message of the error", response );

			expect( error ).toBeTruthy();
			expect( error instanceof PreconditionFailedError ).toBe( true );
		} );

		it( hasMethod(
			INSTANCE,
			"toString",
			{type: "string"}
		), ():void => {
			let error:PreconditionFailedError = new PreconditionFailedError( "Message of the error", response );

			expect( error.toString ).toBeDefined();
			expect( Utils.isFunction( error.toString ) );

			expect( error.toString() ).toBe( "PreconditionFailedError: Message of the error" );
		} );

		it( hasProperty(
			INSTANCE,
			"name",
			"string"
		), ():void => {
			let error:PreconditionFailedError = new PreconditionFailedError( "Message of the error", response );

			expect( error.name ).toBeDefined();
			expect( Utils.isString( error.name ) ).toBe( true );

			expect( error.name ).toBe( "PreconditionFailedError" );
		} );

		it( hasProperty(
			STATIC,
			"statusCode",
			"number"
		), ():void => {
			expect( PreconditionFailedError.statusCode ).toBeDefined();
			expect( Utils.isNumber( PreconditionFailedError.statusCode ) );

			expect( PreconditionFailedError.statusCode ).toBe( 412 );
		} );

	} );

} );
