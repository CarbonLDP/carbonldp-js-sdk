import { RequestService } from "../../Request";
import { Response } from "../../Response";
import { HTTPError } from "../HTTPError";
import {
	clazz,
	extendsClass,
	hasDefaultExport,
	hasMethod,
	hasProperty,
	INSTANCE,
	isDefined,
	module,
	STATIC,
} from "./../../../test/JasmineExtender";
import * as Utils from "./../../../Utils";

import * as UnauthorizedError from "./UnauthorizedError";
import DefaultExport from "./UnauthorizedError";

describe( module( "Carbon/HTTP/Errors/ClientErrors/UnauthorizedError" ), ():void => {

	it( isDefined(), ():void => {
		expect( UnauthorizedError ).toBeDefined();
		expect( UnauthorizedError ).toEqual( jasmine.any( Object ) );
	} );

	describe( clazz(
		"Carbon.HTTP.Errors.UnauthorizedError",
		"Error class to indicate that authentication is required or has failed."
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
			expect( UnauthorizedError.UnauthorizedError ).toBeDefined();
			expect( Utils.isFunction( UnauthorizedError.UnauthorizedError ) ).toBe( true );
		} );

		it( extendsClass(
			"Carbon.HTTP.Errors.HTTPError"
		), ():void => {
			let error:UnauthorizedError.UnauthorizedError = new UnauthorizedError.UnauthorizedError( "Message of the error", response );

			expect( error instanceof HTTPError ).toBe( true );
		} );

		it( hasMethod(
			INSTANCE,
			"toString",
			{ type: "string" }
		), ():void => {
			let error:UnauthorizedError.UnauthorizedError = new UnauthorizedError.UnauthorizedError( "Message of the error", response );

			expect( error.toString ).toBeDefined();
			expect( Utils.isFunction( error.toString ) );

			expect( error.toString() ).toBe( "UnauthorizedError: Message of the error" );
		} );

		it( hasProperty(
			INSTANCE,
			"name",
			"string"
		), ():void => {
			let error:UnauthorizedError.UnauthorizedError = new UnauthorizedError.UnauthorizedError( "Message of the error", response );

			expect( error.name ).toBeDefined();
			expect( Utils.isString( error.name ) ).toBe( true );

			expect( error.name ).toBe( "UnauthorizedError" );
		} );

		it( hasProperty(
			STATIC,
			"statusCode",
			"number"
		), ():void => {
			expect( UnauthorizedError.UnauthorizedError.statusCode ).toBeDefined();
			expect( Utils.isNumber( UnauthorizedError.UnauthorizedError.statusCode ) );

			expect( UnauthorizedError.UnauthorizedError.statusCode ).toBe( 401 );
		} );

	} );

	it( hasDefaultExport( "Carbon.HTTP.Errors.UnauthorizedError" ), ():void => {
		expect( DefaultExport ).toBeDefined();
		expect( DefaultExport ).toBe( UnauthorizedError.UnauthorizedError );
	} );

} );
