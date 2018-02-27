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

import * as ConflictError from "./ConflictError";
import DefaultExport from "./ConflictError";

describe( module( "Carbon/HTTP/Errors/ClientErrors/ConflictError" ), ():void => {

	it( isDefined(), ():void => {
		expect( ConflictError ).toBeDefined();
		expect( ConflictError ).toEqual( jasmine.any( Object ) );
	} );

	describe( clazz(
		"Carbon.HTTP.Errors.ConflictError",
		"Error class to indicate that the request could not be processed because of a conflict, such as an ID conflict."
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
			expect( ConflictError.ConflictError ).toBeDefined();
			expect( Utils.isFunction( ConflictError.ConflictError ) ).toBe( true );
		} );

		it( extendsClass(
			"Carbon.HTTP.Errors.HTTPError"
		), ():void => {
			let error:ConflictError.ConflictError = new ConflictError.ConflictError( "Message of the error", response );

			expect( error instanceof HTTPError ).toBe( true );
		} );

		it( hasMethod(
			INSTANCE,
			"toString",
			{ type: "string" }
		), ():void => {
			let error:ConflictError.ConflictError = new ConflictError.ConflictError( "Message of the error", response );

			expect( error.toString ).toBeDefined();
			expect( Utils.isFunction( error.toString ) );

			expect( error.toString() ).toBe( "ConflictError: Message of the error" );
		} );

		it( hasProperty(
			INSTANCE,
			"name",
			"string"
		), ():void => {
			let error:ConflictError.ConflictError = new ConflictError.ConflictError( "Message of the error", response );

			expect( error.name ).toBeDefined();
			expect( Utils.isString( error.name ) ).toBe( true );

			expect( error.name ).toBe( "ConflictError" );
		} );

		it( hasProperty(
			STATIC,
			"statusCode",
			"number"
		), ():void => {
			expect( ConflictError.ConflictError.statusCode ).toBeDefined();
			expect( Utils.isNumber( ConflictError.ConflictError.statusCode ) );
			expect( ConflictError.ConflictError.statusCode ).toBe( 409 );
		} );

	} );

	it( hasDefaultExport( "Carbon.HTTP.Errors.ConflictError" ), ():void => {
		expect( DefaultExport ).toBeDefined();
		expect( DefaultExport ).toBe( ConflictError.ConflictError );
	} );

} );
