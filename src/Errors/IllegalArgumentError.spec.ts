import {
	INSTANCE,

	module,
	clazz,

	isDefined,
	hasProperty,
	extendsClass
} from "./../test/JasmineExtender";
import * as Utils from "./../Utils";

import IllegalArgumentError from "./IllegalArgumentError";
import AbstractError from "./AbstractError";

describe( module(
	"Carbon/Errors/IllegalArgumentError"
), ():void => {

	describe( clazz(
		"Carbon.Errors.IllegalArgumentError",
		"Error class that indicates an illegal argument was provided to in a function"
	), ():void => {

		it( isDefined(), ():void => {
			expect( IllegalArgumentError ).toBeDefined();
			expect( Utils.isFunction( IllegalArgumentError ) ).toBe( true );

			let error:IllegalArgumentError = new IllegalArgumentError( "Message of the error" );
			expect( error instanceof IllegalArgumentError ).toBe( true );
		} );

		it( extendsClass(
			"Carbon.Errors.AbstractError"
		), ():void => {
			let error:IllegalArgumentError = new IllegalArgumentError( "Message of the error" );

			expect( error instanceof AbstractError ).toBe( true );
		} );

		it( hasProperty(
			INSTANCE,
			"name",
			"string"
		), ():void => {
			let error:IllegalArgumentError = new IllegalArgumentError( "Message of the error" );

			expect( error.name ).toBeDefined();
			expect( Utils.isString( error.name ) ).toBe( true );

			expect( error.name ).toBe( "IllegalArgumentError" );
		} );

	} );

} );