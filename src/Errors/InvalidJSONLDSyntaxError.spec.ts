import {
	INSTANCE,

	module,
	clazz,

	isDefined,
	hasProperty,
	extendsClass, hasDefaultExport,
} from "../test/JasmineExtender";
import AbstractError from "./AbstractError";
import * as Utils from "../Utils";

import * as InvalidJSONLDSyntaxError from "./InvalidJSONLDSyntaxError";
import DefaultExport from "./InvalidJSONLDSyntaxError";

// TODO: Refactor tests
describe( module( "CarbonLDP/Errors/InvalidJSONLDSyntaxError" ), ():void => {

	it( isDefined(), ():void => {
		expect( InvalidJSONLDSyntaxError ).toBeDefined();
		expect( InvalidJSONLDSyntaxError ).toEqual( jasmine.any( Object ) );
	} );

	describe( clazz(
		"CarbonLDP.Errors.InvalidJSONLDSyntaxError.InvalidJSONLDSyntaxError",
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

	it( hasDefaultExport( "CarbonLDP.Errors.InvalidJSONLDSyntaxError.InvalidJSONLDSyntaxError" ), ():void => {
		expect( DefaultExport ).toBeDefined();
		expect( DefaultExport ).toBe( InvalidJSONLDSyntaxError.InvalidJSONLDSyntaxError );
	} );

} );
