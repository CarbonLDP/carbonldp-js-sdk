import AbstractError from "./AbstractError";
import * as Utils from "./../Utils";

import {
	INSTANCE,
	clazz,
	module,
	isDefined,
	hasConstructor,
	hasMethod,
	hasProperty,
} from "./../test/JasmineExtender";

describe( module( "Carbon/Errors/AbstractError" ), function():void {

	describe( clazz(
		"Carbon.Errors.AbstractError",
		"Class that works as template for the custom errors in the SDK."
	), function():void {

		class DummyError extends AbstractError {}

		it( isDefined(), function():void {
			expect( AbstractError ).toBeDefined();
			expect( AbstractError ).not.toBeNull();
			expect( Utils.isFunction( AbstractError ) ).toBe( true );
		} );

		it( hasConstructor( [
			{name: "message", type: "string"}
		] ), function():void {
			let exception:AbstractError = new DummyError( "This is the message" );
			expect( exception instanceof Error ).toBe( true );
			expect( exception instanceof AbstractError ).toBe( true );
		} );

		it( hasMethod( INSTANCE, "toString", "Returns a string representation of the error.", {type: "string"} ), function():void {
			let exception:AbstractError = new DummyError( "This is the message" );

			expect( exception.toString ).toBeDefined();
			expect( exception.toString ).not.toBeNull();
			expect( Utils.isFunction( exception.toString ) ).toBe( true );

			expect( Utils.isString( exception.toString() ) ).toBe( true );
		} );

		it( hasProperty( INSTANCE, "name", "string" ), function():void {
			let exception:AbstractError = new DummyError( "This is the message" );

			expect( exception.name ).toBeDefined();
			expect( Utils.isString( exception.name ) ).toBe( true );
			expect( exception.name ).toEqual( "AbstractError" );
		} );

		it( hasProperty( INSTANCE, "message", "string" ), function():void {
			let exception:AbstractError = new DummyError( "This is the message" );

			expect( exception.message ).toBeDefined();
			expect( Utils.isString( exception.message ) ).toBe( true );
			expect( exception.message ).toEqual( "This is the message" );
		} );
	} );
} );
