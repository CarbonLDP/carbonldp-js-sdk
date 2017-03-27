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
	extendsClass,
	hasDefaultExport,
} from "./../test/JasmineExtender";

import * as IllegalStateError from "./IllegalStateError";
import DefaultExport from "./IllegalStateError";

describe( module( "Carbon/Errors/IllegalStateError" ), function():void {

	it( isDefined(), ():void => {
		expect( IllegalStateError ).toBeDefined();
		expect( IllegalStateError ).toEqual( jasmine.any( Object ) );
	} );

	describe( clazz(
		"Carbon.Errors.IllegalStateError.Class",
		"Error class to indicate that a task can't be completed because of the lack of pre-required configuration or execution of previous tasks."
	), function():void {
		it( isDefined(), function():void {
			expect( IllegalStateError.Class ).toBeDefined();
			expect( IllegalStateError.Class ).not.toBeNull();
			expect( Utils.isFunction( IllegalStateError.Class ) ).toBe( true );
		} );

		it( extendsClass( "Carbon.Errors.AbstractError" ), function():void {
			let illegalStateError:IllegalStateError.Class = new IllegalStateError.Class( "This is the message" );
			expect( illegalStateError instanceof AbstractError ).toBe( true );
		} );

		it( hasConstructor( [
			{ name: "message", type: "string", optional: true, defaultValue: "" },
		] ), ():void => {
			let error:IllegalStateError.Class = new IllegalStateError.Class( "Message of the error" );

			expect( error ).toBeTruthy();
			expect( error instanceof IllegalStateError.Class ).toBe( true );

			error = new IllegalStateError.Class();

			expect( error ).toBeTruthy();
			expect( error instanceof IllegalStateError.Class ).toBe( true );
		} );

		it( hasMethod(
			INSTANCE,
			"toString",
			{ type: "string" }
		), ():void => {
			let error:IllegalStateError.Class = new IllegalStateError.Class( "Message of the error" );

			expect( error.toString ).toBeDefined();
			expect( Utils.isFunction( error.toString ) );

			expect( error.toString() ).toBe( "IllegalStateError: Message of the error" );

			error = new IllegalStateError.Class();
			expect( error.toString() ).toBe( "IllegalStateError: " );
		} );

		it( hasProperty(
			INSTANCE,
			"name",
			"string"
		), ():void => {
			let error:IllegalStateError.Class = new IllegalStateError.Class( "Message of the error" );

			expect( error.name ).toBeDefined();
			expect( Utils.isString( error.name ) ).toBe( true );

			expect( error.name ).toBe( "IllegalStateError" );
		} );

	} );

	it( hasDefaultExport( "Carbon.Errors.IllegalStateError.Class" ), ():void => {
		expect( DefaultExport ).toBeDefined();
		expect( DefaultExport ).toBe( IllegalStateError.Class );
	} );

} );
