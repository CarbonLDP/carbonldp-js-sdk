import {
	INSTANCE,

	module,
	clazz,

	isDefined,
	extendsClass,
	hasProperty
} from "./../test/JasmineExtender";
import * as Utils from "./../Utils";

import IllegalActionError from "./IllegalActionError";
import AbstractError from "./AbstractError";

describe( module(
	"Carbon/Errors/IllegalActionError"
), ():void=> {

	describe( clazz(
		"Carbon.Errors.IllegalActionError",
		"Error class to indicate that an action not allowed was attempted."
	), ():void => {

		it( isDefined(), ():void => {
			expect( IllegalActionError ).toBeDefined();
			expect( Utils.isFunction( IllegalActionError ) ).toBe( true );

			let error:IllegalActionError = new IllegalActionError( "Message of the error" );
			expect( error instanceof IllegalActionError ).toBe( true );
		} );

		it( extendsClass(
			"Carbon.Errors.AbstractError"
		), ():void => {
			let error:IllegalActionError = new IllegalActionError( "Message of the error" );

			expect( error instanceof AbstractError ).toBe( true );
		} );

		it( hasProperty(
			INSTANCE,
			"name",
			"string"
		), ():void => {
			let error:IllegalActionError = new IllegalActionError( "Message of the error" );

			expect( error.name ).toBeDefined();
			expect( Utils.isString( error.name ) ).toBe( true );

			expect( error.name ).toBe( "IllegalActionError" );
		} );

	} );

} );
