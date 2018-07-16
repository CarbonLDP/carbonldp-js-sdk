import { clazz, extendsClass, hasProperty, INSTANCE, isDefined, module } from "../test/JasmineExtender";

import * as Utils from "./../Utils";

import { AbstractError } from "./AbstractError";

import * as IllegalActionError from "./IllegalActionError";


// TODO: Refactor tests
describe( module( "carbonldp/Errors/IllegalActionError" ), ():void => {

	it( isDefined(), ():void => {
		expect( IllegalActionError ).toBeDefined();
		expect( IllegalActionError ).toEqual( jasmine.any( Object ) );
	} );

	describe( clazz(
		"CarbonLDP.Errors.IllegalActionError",
		"Error class to indicate that an action not allowed was attempted."
	), ():void => {

		it( isDefined(), ():void => {
			expect( IllegalActionError.IllegalActionError ).toBeDefined();
			expect( Utils.isFunction( IllegalActionError.IllegalActionError ) ).toBe( true );

			let error:IllegalActionError.IllegalActionError = new IllegalActionError.IllegalActionError( "Message of the error" );
			expect( error instanceof IllegalActionError.IllegalActionError ).toBe( true );
		} );

		it( extendsClass(
			"CarbonLDP.Errors.AbstractError.AbstractError"
		), ():void => {
			let error:IllegalActionError.IllegalActionError = new IllegalActionError.IllegalActionError( "Message of the error" );

			expect( error instanceof AbstractError ).toBe( true );
		} );

		it( hasProperty(
			INSTANCE,
			"name",
			"string"
		), ():void => {
			let error:IllegalActionError.IllegalActionError = new IllegalActionError.IllegalActionError( "Message of the error" );

			expect( error.name ).toBeDefined();
			expect( Utils.isString( error.name ) ).toBe( true );

			expect( error.name ).toBe( "IllegalActionError" );
		} );

	} );

} );
