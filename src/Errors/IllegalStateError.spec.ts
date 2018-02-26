import {
	clazz,
	extendsClass,
	hasConstructor,
	hasDefaultExport,
	hasProperty,
	INSTANCE,
	isDefined,
	module,
} from "./../test/JasmineExtender";

import * as Utils from "./../Utils";
import AbstractError from "./AbstractError";

import * as IllegalStateError from "./IllegalStateError";
import DefaultExport from "./IllegalStateError";

// TODO: Refactor tests
describe( module( "Carbon/Errors/IllegalStateError" ), function():void {

	it( isDefined(), ():void => {
		expect( IllegalStateError ).toBeDefined();
		expect( IllegalStateError ).toEqual( jasmine.any( Object ) );
	} );

	describe( clazz(
		"Carbon.Errors.IllegalStateError.IllegalStateError",
		"Error class to indicate that a task can't be completed because of the lack of pre-required configuration or execution of previous tasks."
	), function():void {

		it( isDefined(), function():void {
			expect( IllegalStateError.IllegalStateError ).toBeDefined();
			expect( IllegalStateError.IllegalStateError ).not.toBeNull();
			expect( Utils.isFunction( IllegalStateError.IllegalStateError ) ).toBe( true );
		} );

		it( extendsClass( "Carbon.Errors.AbstractError.AbstractError" ), function():void {
			let illegalStateError:IllegalStateError.IllegalStateError = new IllegalStateError.IllegalStateError( "This is the message" );
			expect( illegalStateError instanceof AbstractError ).toBe( true );
		} );

		it( hasConstructor( [
			{ name: "message", type: "string", optional: true },
		] ), ():void => {
			let error:IllegalStateError.IllegalStateError = new IllegalStateError.IllegalStateError( "Message of the error" );

			expect( error ).toBeTruthy();
			expect( error instanceof IllegalStateError.IllegalStateError ).toBe( true );

			error = new IllegalStateError.IllegalStateError();

			expect( error ).toBeTruthy();
			expect( error instanceof IllegalStateError.IllegalStateError ).toBe( true );
		} );

		it( hasProperty(
			INSTANCE,
			"name",
			"string"
		), ():void => {
			let error:IllegalStateError.IllegalStateError = new IllegalStateError.IllegalStateError( "Message of the error" );

			expect( error.name ).toBeDefined();
			expect( Utils.isString( error.name ) ).toBe( true );

			expect( error.name ).toBe( "IllegalStateError" );
		} );

	} );

	it( hasDefaultExport( "Carbon.Errors.IllegalStateError.IllegalStateError" ), ():void => {
		expect( DefaultExport ).toBeDefined();
		expect( DefaultExport ).toBe( IllegalStateError.IllegalStateError );
	} );

} );
