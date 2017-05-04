import * as Utils from "./../Utils";

import {
	INSTANCE,
	clazz,
	module,
	isDefined,
	hasConstructor,
	hasMethod,
	hasProperty,
	hasDefaultExport,
} from "./../test/JasmineExtender";

import * as AbstractError from "./AbstractError";
import DefaultExport from "./AbstractError";

describe( module( "Carbon/Errors/AbstractError" ), function():void {

	it( isDefined(), ():void => {
		expect( AbstractError ).toBeDefined();
		expect( AbstractError ).toEqual( jasmine.any( Object ) );
	} );

	describe( clazz(
		"Carbon.Errors.AbstractError.Class",
		"Class that works as template for the custom errors in the SDK."
	), function():void {

		class DummyError extends AbstractError.Class {}

		it( isDefined(), function():void {
			expect( AbstractError.Class ).toBeDefined();
			expect( AbstractError.Class ).not.toBeNull();
			expect( Utils.isFunction( AbstractError.Class ) ).toBe( true );
		} );

		it( hasConstructor( [
			{ name: "message", type: "string" },
		] ), function():void {
			let exception:AbstractError.Class = new DummyError( "This is the message" );
			expect( exception instanceof Error ).toBe( true );
			expect( exception instanceof AbstractError.Class ).toBe( true );
		} );

		it( hasMethod( INSTANCE, "toString", "Returns a string representation of the error.", { type: "string" } ), function():void {
			let exception:AbstractError.Class = new DummyError( "This is the message" );

			expect( exception.toString ).toBeDefined();
			expect( exception.toString ).not.toBeNull();
			expect( Utils.isFunction( exception.toString ) ).toBe( true );

			expect( Utils.isString( exception.toString() ) ).toBe( true );
		} );

		it( hasProperty( INSTANCE, "name", "string" ), function():void {
			let exception:AbstractError.Class = new DummyError( "This is the message" );

			expect( exception.name ).toBeDefined();
			expect( Utils.isString( exception.name ) ).toBe( true );
			expect( exception.name ).toEqual( "AbstractError" );
		} );

		it( hasProperty( INSTANCE, "message", "string" ), function():void {
			let exception:AbstractError.Class = new DummyError( "This is the message" );

			expect( exception.message ).toBeDefined();
			expect( Utils.isString( exception.message ) ).toBe( true );
			expect( exception.message ).toEqual( "This is the message" );
		} );
	} );

	it( hasDefaultExport( "Carbon.Errors.AbstractError.Class" ), ():void => {
		expect( DefaultExport ).toBeDefined();
		expect( DefaultExport ).toBe( AbstractError.Class );
	} );

} );
