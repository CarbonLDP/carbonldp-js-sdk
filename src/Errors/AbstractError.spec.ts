import {
	clazz,
	hasConstructor,
	hasDefaultExport,
	hasProperty,
	INSTANCE,
	isDefined,
	module,
} from "../test/JasmineExtender";
import * as Utils from "./../Utils";

import * as AbstractError from "./AbstractError";
import DefaultExport from "./AbstractError";

// TODO: Refactor tests
describe( module( "CarbonLDP/Errors/AbstractError" ), function():void {

	it( isDefined(), ():void => {
		expect( AbstractError ).toBeDefined();
		expect( AbstractError ).toEqual( jasmine.any( Object ) );
	} );

	describe( clazz(
		"CarbonLDP.Errors.AbstractError.AbstractError",
		"Class that works as template for the custom errors in the SDK."
	), function():void {

		class DummyError extends AbstractError.AbstractError {}

		it( isDefined(), function():void {
			expect( AbstractError.AbstractError ).toBeDefined();
			expect( AbstractError.AbstractError ).not.toBeNull();
			expect( Utils.isFunction( AbstractError.AbstractError ) ).toBe( true );
		} );

		it( hasConstructor( [
			{ name: "message", type: "string" },
		] ), function():void {
			let exception:AbstractError.AbstractError = new DummyError( "This is the message" );
			expect( exception instanceof Error ).toBe( true );
			expect( exception instanceof AbstractError.AbstractError ).toBe( true );
		} );

		it( hasProperty( INSTANCE, "name", "string" ), function():void {
			let exception:AbstractError.AbstractError = new DummyError( "This is the message" );

			expect( exception.name ).toBeDefined();
			expect( Utils.isString( exception.name ) ).toBe( true );
			expect( exception.name ).toEqual( "AbstractError" );
		} );

		it( hasProperty( INSTANCE, "message", "string" ), function():void {
			let exception:AbstractError.AbstractError = new DummyError( "This is the message" );

			expect( exception.message ).toBeDefined();
			expect( Utils.isString( exception.message ) ).toBe( true );
			expect( exception.message ).toEqual( "This is the message" );
		} );

	} );

	it( hasDefaultExport( "CarbonLDP.Errors.AbstractError.AbstractError" ), ():void => {
		expect( DefaultExport ).toBeDefined();
		expect( DefaultExport ).toBe( AbstractError.AbstractError );
	} );

} );
