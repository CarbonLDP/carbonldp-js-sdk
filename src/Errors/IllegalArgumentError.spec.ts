import {
	clazz,
	extendsClass,
	hasDefaultExport,
	hasProperty,
	INSTANCE,
	isDefined,
	module,
} from "./../test/JasmineExtender";
import * as Utils from "./../Utils";

import AbstractError from "./AbstractError";

import * as IllegalArgumentError from "./IllegalArgumentError";
import DefaultExport from "./IllegalArgumentError";

// TODO: Refactor tests
describe( module( "Carbon/Errors/IllegalArgumentError" ), ():void => {

	it( isDefined(), ():void => {
		expect( IllegalArgumentError ).toBeDefined();
		expect( IllegalArgumentError ).toEqual( jasmine.any( Object ) );
	} );

	describe( clazz(
		"Carbon.Errors.IllegalArgumentError.IllegalArgumentError",
		"Error class to indicate that a different argument than the expected was provided."
	), ():void => {

		it( isDefined(), ():void => {
			expect( IllegalArgumentError.IllegalArgumentError ).toBeDefined();
			expect( Utils.isFunction( IllegalArgumentError.IllegalArgumentError ) ).toBe( true );

			let error:IllegalArgumentError.IllegalArgumentError = new IllegalArgumentError.IllegalArgumentError( "Message of the error" );
			expect( error instanceof IllegalArgumentError.IllegalArgumentError ).toBe( true );
		} );

		it( extendsClass(
			"Carbon.Errors.AbstractError.AbstractError"
		), ():void => {
			let error:IllegalArgumentError.IllegalArgumentError = new IllegalArgumentError.IllegalArgumentError( "Message of the error" );

			expect( error instanceof AbstractError ).toBe( true );
		} );

		it( hasProperty(
			INSTANCE,
			"name",
			"string"
		), ():void => {
			let error:IllegalArgumentError.IllegalArgumentError = new IllegalArgumentError.IllegalArgumentError( "Message of the error" );

			expect( error.name ).toBeDefined();
			expect( Utils.isString( error.name ) ).toBe( true );

			expect( error.name ).toBe( "IllegalArgumentError" );
		} );

	} );

	it( hasDefaultExport( "Carbon.Errors.IllegalArgumentError.IllegalArgumentError" ), ():void => {
		expect( DefaultExport ).toBeDefined();
		expect( DefaultExport ).toBe( IllegalArgumentError.IllegalArgumentError );
	} );

} );
