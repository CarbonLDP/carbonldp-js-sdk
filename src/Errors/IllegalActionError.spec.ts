import {
	INSTANCE,

	module,
	clazz,

	isDefined,
	extendsClass,
	hasProperty,
	hasDefaultExport,
} from "./../test/JasmineExtender";
import * as Utils from "./../Utils";

import AbstractError from "./AbstractError";

import * as IllegalActionError from "./IllegalActionError";
import DefaultExport from "./IllegalActionError";

describe( module( "Carbon/Errors/IllegalActionError" ), ():void => {

	it( isDefined(), ():void => {
		expect( IllegalActionError ).toBeDefined();
		expect( IllegalActionError ).toEqual( jasmine.any( Object ) );
	} );

	describe( clazz(
		"Carbon.Errors.IllegalActionError.Class",
		"Error class to indicate that an action not allowed was attempted."
	), ():void => {

		it( isDefined(), ():void => {
			expect( IllegalActionError.Class ).toBeDefined();
			expect( Utils.isFunction( IllegalActionError.Class ) ).toBe( true );

			let error:IllegalActionError.Class = new IllegalActionError.Class( "Message of the error" );
			expect( error instanceof IllegalActionError.Class ).toBe( true );
		} );

		it( extendsClass(
			"Carbon.Errors.AbstractError"
		), ():void => {
			let error:IllegalActionError.Class = new IllegalActionError.Class( "Message of the error" );

			expect( error instanceof AbstractError ).toBe( true );
		} );

		it( hasProperty(
			INSTANCE,
			"name",
			"string"
		), ():void => {
			let error:IllegalActionError.Class = new IllegalActionError.Class( "Message of the error" );

			expect( error.name ).toBeDefined();
			expect( Utils.isString( error.name ) ).toBe( true );

			expect( error.name ).toBe( "IllegalActionError" );
		} );

	} );

	it( hasDefaultExport( "Carbon.Errors.IllegalActionError.Class" ), ():void => {
		expect( DefaultExport ).toBeDefined();
		expect( DefaultExport ).toBe( IllegalActionError.Class );
	} );

} );
