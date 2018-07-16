import { clazz, extendsClass, hasProperty, INSTANCE, isDefined, module } from "../test/JasmineExtender";

import * as Utils from "../Utils";

import { AbstractError } from "./AbstractError";

import * as InvalidJSONLDSyntaxError from "./InvalidJSONLDSyntaxError";


// TODO: Refactor tests
describe( module( "carbonldp/Errors/InvalidJSONLDSyntaxError" ), ():void => {

	it( isDefined(), ():void => {
		expect( InvalidJSONLDSyntaxError ).toBeDefined();
		expect( InvalidJSONLDSyntaxError ).toEqual( jasmine.any( Object ) );
	} );

	describe( clazz(
		"CarbonLDP.Errors.InvalidJSONLDSyntaxError",
		"Error class to indicate that there an invalid syntax in a JSON-LD object."
	), ():void => {

		it( isDefined(), ():void => {
			expect( InvalidJSONLDSyntaxError.InvalidJSONLDSyntaxError ).toBeDefined();
			expect( Utils.isFunction( InvalidJSONLDSyntaxError.InvalidJSONLDSyntaxError ) ).toBe( true );

			let error:InvalidJSONLDSyntaxError.InvalidJSONLDSyntaxError = new InvalidJSONLDSyntaxError.InvalidJSONLDSyntaxError( "Message of the error" );
			expect( error instanceof InvalidJSONLDSyntaxError.InvalidJSONLDSyntaxError ).toBe( true );
		} );

		it( extendsClass(
			"CarbonLDP.Errors.AbstractError.AbstractError"
		), ():void => {
			let error:InvalidJSONLDSyntaxError.InvalidJSONLDSyntaxError = new InvalidJSONLDSyntaxError.InvalidJSONLDSyntaxError( "Message of the error" );

			expect( error instanceof AbstractError ).toBe( true );
		} );

		it( hasProperty(
			INSTANCE,
			"name",
			"string"
		), ():void => {
			let error:InvalidJSONLDSyntaxError.InvalidJSONLDSyntaxError = new InvalidJSONLDSyntaxError.InvalidJSONLDSyntaxError( "Message of the error" );

			expect( error.name ).toBeDefined();
			expect( Utils.isString( error.name ) ).toBe( true );

			expect( error.name ).toBe( "InvalidJSONLDSyntaxError" );
		} );

	} );

} );
