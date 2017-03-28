import {
	INSTANCE,

	module,
	clazz,

	isDefined,
	hasProperty,
	extendsClass,
	hasDefaultExport,
} from "./../test/JasmineExtender";
import * as Utils from "./../Utils";

import AbstractError from "./AbstractError";

import * as IllegalArgumentError from "./IllegalArgumentError";
import DefaultExport from "./IllegalArgumentError";

describe( module( "Carbon/Errors/IllegalArgumentError" ), ():void => {

	it( isDefined(), ():void => {
		expect( IllegalArgumentError ).toBeDefined();
		expect( IllegalArgumentError ).toEqual( jasmine.any( Object ) );
	} );

	describe( clazz(
		"Carbon.Errors.IllegalArgumentError.Class",
		"Error class to indicate that a different argument than the expected was provided."
	), ():void => {

		it( isDefined(), ():void => {
			expect( IllegalArgumentError.Class ).toBeDefined();
			expect( Utils.isFunction( IllegalArgumentError.Class ) ).toBe( true );

			let error:IllegalArgumentError.Class = new IllegalArgumentError.Class( "Message of the error" );
			expect( error instanceof IllegalArgumentError.Class ).toBe( true );
		} );

		it( extendsClass(
			"Carbon.Errors.AbstractError"
		), ():void => {
			let error:IllegalArgumentError.Class = new IllegalArgumentError.Class( "Message of the error" );

			expect( error instanceof AbstractError ).toBe( true );
		} );

		it( hasProperty(
			INSTANCE,
			"name",
			"string"
		), ():void => {
			let error:IllegalArgumentError.Class = new IllegalArgumentError.Class( "Message of the error" );

			expect( error.name ).toBeDefined();
			expect( Utils.isString( error.name ) ).toBe( true );

			expect( error.name ).toBe( "IllegalArgumentError" );
		} );

	} );

	it( hasDefaultExport( "Carbon.Errors.IllegalArgumentError.Class" ), ():void => {
		expect( DefaultExport ).toBeDefined();
		expect( DefaultExport ).toBe( IllegalArgumentError.Class );
	} );

} );
