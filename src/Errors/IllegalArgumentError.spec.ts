import {
	clazz,
	extendsClass,
	hasProperty,
	INSTANCE,
	isDefined,
	module,
} from "./../test/JasmineExtender";
import * as Utils from "./../Utils";

import { AbstractError } from "./AbstractError";

import * as IllegalArgumentError from "./IllegalArgumentError";

// TODO: Refactor tests
describe( module( "carbonldp/Errors/IllegalArgumentError" ), ():void => {

	it( isDefined(), ():void => {
		expect( IllegalArgumentError ).toBeDefined();
		expect( IllegalArgumentError ).toEqual( jasmine.any( Object ) );
	} );

	describe( clazz(
		"CarbonLDP.Errors.IllegalArgumentError",
		"Error class to indicate that a different argument than the expected was provided."
	), ():void => {

		it( isDefined(), ():void => {
			expect( IllegalArgumentError.IllegalArgumentError ).toBeDefined();
			expect( Utils.isFunction( IllegalArgumentError.IllegalArgumentError ) ).toBe( true );

			let error:IllegalArgumentError.IllegalArgumentError = new IllegalArgumentError.IllegalArgumentError( "Message of the error" );
			expect( error instanceof IllegalArgumentError.IllegalArgumentError ).toBe( true );
		} );

		it( extendsClass(
			"CarbonLDP.Errors.AbstractError.AbstractError"
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

} );
