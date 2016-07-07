import {
	INSTANCE,

	module,
	clazz,

	isDefined,
	hasProperty,
	extendsClass,
	hasConstructor,
	hasMethod
} from "./../test/JasmineExtender";
import * as Utils from "./../Utils";

import NotImplementedError from "./NotImplementedError";
import AbstractError from "./AbstractError";

describe( module(
	"Carbon/Errors/NotImplementedError"
), ():void => {

	describe( clazz(
		"Carbon.Errors.NotImplementedError",
		"Error class to indicate that an action is not yet implemented."
	), ():void => {

		it( isDefined(), ():void => {
			expect( NotImplementedError ).toBeDefined();
			expect( Utils.isFunction( NotImplementedError ) ).toBe( true );
		} );

		it( extendsClass(
			"Carbon.Errors.AbstractError"
		), ():void => {
			let error:NotImplementedError = new NotImplementedError( "Message of the error" );

			expect( error instanceof AbstractError ).toBe( true );
		} );

		it( hasConstructor( [
			{name: "message", type: "string", optional: true, default: ""}
		] ), ():void => {
			let error:NotImplementedError = new NotImplementedError( "Message of the error" );

			expect( error ).toBeTruthy();
			expect( error instanceof NotImplementedError ).toBe( true );

			error = new NotImplementedError();

			expect( error ).toBeTruthy();
			expect( error instanceof NotImplementedError ).toBe( true );
		} );

		it( hasMethod(
			INSTANCE,
			"toString",
			{type: "string"}
		), ():void => {
			let error:NotImplementedError = new NotImplementedError( "Message of the error" );

			expect( error.toString ).toBeDefined();
			expect( Utils.isFunction( error.toString ) );

			expect( error.toString() ).toBe( "NotImplementedError: Message of the error" );

			error = new NotImplementedError();
			expect( error.toString() ).toBe( "NotImplementedError: " );
		} );

		it( hasProperty(
			INSTANCE,
			"name",
			"string"
		), ():void => {
			let error:NotImplementedError = new NotImplementedError( "Message of the error" );

			expect( error.name ).toBeDefined();
			expect( Utils.isString( error.name ) ).toBe( true );

			expect( error.name ).toBe( "NotImplementedError" );
		} );


	} );

} );

