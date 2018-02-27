import { RequestService } from "../Request";
import { Response } from "../Response";
import {
	clazz,
	extendsClass,
	hasConstructor,
	hasDefaultExport,
	hasMethod,
	hasProperty,
	INSTANCE,
	isDefined,
	module,
	STATIC,
} from "./../../test/JasmineExtender";
import * as Utils from "./../../Utils";
import { HTTPError } from "./HTTPError";

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
			expect( UnknownError.UnknownError ).toBeDefined();
			expect( Utils.isFunction( UnknownError.UnknownError ) ).toBe( true );
		} );

		it( extendsClass(
			"Carbon.HTTP.Errors.HTTPError"
		), ():void => {
			let error:UnknownError.UnknownError = new UnknownError.UnknownError( "Message of the error", response );

			expect( error instanceof HTTPError ).toBe( true );
		} );

		it( hasMethod(
			INSTANCE,
			"toString",
			{ type: "string" }
		), ():void => {
			let error:UnknownError.UnknownError = new UnknownError.UnknownError( "Message of the error", response );

			expect( error.toString ).toBeDefined();
			expect( Utils.isFunction( error.toString ) );

			expect( error.toString() ).toBe( "UnknownError: Message of the error" );
		} );

		it( hasProperty(
			INSTANCE,
			"name",
			"string"
		), ():void => {
			let error:UnknownError.UnknownError = new UnknownError.UnknownError( "Message of the error", response );

			expect( error.name ).toBeDefined();
			expect( Utils.isString( error.name ) ).toBe( true );

			expect( error.name ).toBe( "UnknownError" );
		} );

		it( hasProperty(
			STATIC,
			"statusCode",
			"number"
		), ():void => {
			expect( UnknownError.UnknownError.statusCode ).toBeDefined();
			expect( Utils.isNumber( UnknownError.UnknownError.statusCode ) );
			expect( UnknownError.UnknownError.statusCode ).toBeNull();
		} );

	} );

	it( hasDefaultExport( "Carbon.HTTP.Errors.UnknownError" ), ():void => {
		expect( DefaultExport ).toBeDefined();
		expect( DefaultExport ).toBe( UnknownError.UnknownError );
	} );

} );
