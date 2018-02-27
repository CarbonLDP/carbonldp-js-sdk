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
} from "./../../test/JasmineExtender";
import * as Utils from "./../../Utils";

import { Response } from "./../Response";

import HTTPError from "./HTTPError";
import { RequestService } from "../Request";

import * as UnknownError from "./UnknownError";
import DefaultExport from "./UnknownError";

describe( module(
	"Carbon/HTTP/Errors/UnknownError"
), ():void => {

	it( isDefined(), ():void => {
		expect( UnknownError ).toBeDefined();
		expect( UnknownError ).toEqual( jasmine.any( Object ) );
	} );

	describe( clazz(
		"Carbon.HTTP.Errors.UnknownError",
		"Error class that defines any error that could not be identified."
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
			expect( UnknownError.Class ).toBeDefined();
			expect( Utils.isFunction( UnknownError.Class ) ).toBe( true );
		} );

		it( extendsClass(
			"Carbon.Errors.HTTPError"
		), ():void => {
			let error:UnknownError.Class = new UnknownError.Class( "Message of the error", response );

			expect( error instanceof HTTPError ).toBe( true );
		} );

		it( hasConstructor( [
			{ name: "message", type: "string" },
			{ name: "response", type: "Carbon.HTTP.Response.Class" },
		] ), ():void => {
			let error:UnknownError.Class = new UnknownError.Class( "Message of the error", response );

			expect( error ).toBeTruthy();
			expect( error instanceof UnknownError.Class ).toBe( true );
		} );

		it( hasMethod(
			INSTANCE,
			"toString",
			{ type: "string" }
		), ():void => {
			let error:UnknownError.Class = new UnknownError.Class( "Message of the error", response );

			expect( error.toString ).toBeDefined();
			expect( Utils.isFunction( error.toString ) );

			expect( error.toString() ).toBe( "UnknownError: Message of the error" );
		} );

		it( hasProperty(
			INSTANCE,
			"name",
			"string"
		), ():void => {
			let error:UnknownError.Class = new UnknownError.Class( "Message of the error", response );

			expect( error.name ).toBeDefined();
			expect( Utils.isString( error.name ) ).toBe( true );

			expect( error.name ).toBe( "UnknownError" );
		} );

		it( hasProperty(
			STATIC,
			"statusCode",
			"number"
		), ():void => {
			expect( UnknownError.Class.statusCode ).toBeDefined();
			expect( Utils.isNumber( UnknownError.Class.statusCode ) );
			expect( UnknownError.Class.statusCode ).toBeNull();
		} );

	} );

	it( hasDefaultExport( "Carbon.HTTP.Errors.UnknownError.Class" ), ():void => {
		expect( DefaultExport ).toBeDefined();
		expect( DefaultExport ).toBe( UnknownError.Class );
	} );

} );
