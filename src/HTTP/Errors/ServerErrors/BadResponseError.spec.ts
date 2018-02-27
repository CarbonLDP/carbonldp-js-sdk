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

import * as BadResponseError from "./BadResponseError";
import DefaultExport from "./BadResponseError";

describe( module( "Carbon/HTTP/Errors/ServerErrors/BadResponseError" ), ():void => {

	it( isDefined(), ():void => {
		expect( BadResponseError ).toBeDefined();
		expect( BadResponseError ).toEqual( jasmine.any( Object ) );
	} );

	describe( clazz(
		"Carbon.HTTP.Errors.BadResponseError",
		"Error class to indicate that the response obtained isn't the expected or can't be interpreted."
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
			expect( BadResponseError.BadResponseError ).toBeDefined();
			expect( Utils.isFunction( BadResponseError.BadResponseError ) ).toBe( true );
		} );

		it( extendsClass(
			"Carbon.HTTP.Errors.HTTPError"
		), ():void => {
			let error:BadResponseError.BadResponseError = new BadResponseError.BadResponseError( "Message of the error", response );

			expect( error instanceof HTTPError ).toBe( true );
		} );

		it( hasMethod(
			INSTANCE,
			"toString",
			{ type: "string" }
		), ():void => {
			let error:BadResponseError.BadResponseError = new BadResponseError.BadResponseError( "Message of the error", response );

			expect( error.toString ).toBeDefined();
			expect( Utils.isFunction( error.toString ) );

			expect( error.toString() ).toBe( "BadResponseError: Message of the error" );
		} );

		it( hasProperty(
			INSTANCE,
			"name",
			"string"
		), ():void => {
			let error:BadResponseError.BadResponseError = new BadResponseError.BadResponseError( "Message of the error", response );

			expect( error.name ).toBeDefined();
			expect( Utils.isString( error.name ) ).toBe( true );

			expect( error.name ).toBe( "BadResponseError" );
		} );

		it( hasProperty(
			STATIC,
			"statusCode",
			"number"
		), ():void => {
			expect( BadResponseError.BadResponseError.statusCode ).toBeDefined();
			expect( Utils.isNumber( BadResponseError.BadResponseError.statusCode ) );

			expect( BadResponseError.BadResponseError.statusCode ).toBe( 0 );
		} );

	} );

	it( hasDefaultExport( "Carbon.HTTP.Errors.BadResponseError" ), ():void => {
		expect( DefaultExport ).toBeDefined();
		expect( DefaultExport ).toBe( BadResponseError.BadResponseError );
	} );

} );
