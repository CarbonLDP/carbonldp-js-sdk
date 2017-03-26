import {
	INSTANCE,

	module,
	clazz,

	isDefined,
	hasProperty,
	extendsClass,
	hasConstructor,
	hasMethod,
	hasDefaultExport,
} from "./../test/JasmineExtender";
import * as Utils from "./../Utils";

import AbstractError from "./AbstractError";

import * as NotImplementedError from "./NotImplementedError";
import DefaultExport from "./NotImplementedError";

describe( module( "Carbon/Errors/NotImplementedError" ), ():void => {

	it( isDefined(), ():void => {
		expect( NotImplementedError ).toBeDefined();
		expect( NotImplementedError ).toEqual( jasmine.any( Object ) );
	} );

	describe( clazz(
		"Carbon.Errors.NotImplementedError.Class",
		"Error class to indicate that an action is not yet implemented."
	), ():void => {

		it( isDefined(), ():void => {
			expect( NotImplementedError.Class ).toBeDefined();
			expect( Utils.isFunction( NotImplementedError.Class ) ).toBe( true );
		} );

		it( extendsClass(
			"Carbon.Errors.AbstractError"
		), ():void => {
			let error:NotImplementedError.Class = new NotImplementedError.Class( "Message of the error" );

			expect( error instanceof AbstractError ).toBe( true );
		} );

		it( hasConstructor( [
			{ name: "message", type: "string", optional: true, defaultValue: "" },
		] ), ():void => {
			let error:NotImplementedError.Class = new NotImplementedError.Class( "Message of the error" );

			expect( error ).toBeTruthy();
			expect( error instanceof NotImplementedError.Class ).toBe( true );

			error = new NotImplementedError.Class();

			expect( error ).toBeTruthy();
			expect( error instanceof NotImplementedError.Class ).toBe( true );
		} );

		it( hasMethod(
			INSTANCE,
			"toString",
			{ type: "string" }
		), ():void => {
			let error:NotImplementedError.Class = new NotImplementedError.Class( "Message of the error" );

			expect( error.toString ).toBeDefined();
			expect( Utils.isFunction( error.toString ) );

			expect( error.toString() ).toBe( "NotImplementedError: Message of the error" );

			error = new NotImplementedError.Class();
			expect( error.toString() ).toBe( "NotImplementedError: " );
		} );

		it( hasProperty(
			INSTANCE,
			"name",
			"string"
		), ():void => {
			let error:NotImplementedError.Class = new NotImplementedError.Class( "Message of the error" );

			expect( error.name ).toBeDefined();
			expect( Utils.isString( error.name ) ).toBe( true );

			expect( error.name ).toBe( "NotImplementedError" );
		} );

	} );

	it( hasDefaultExport( "Carbon.Errors.NotImplementedError.Class" ), ():void => {
		expect( DefaultExport ).toBeDefined();
		expect( DefaultExport ).toBe( NotImplementedError.Class );
	} );

} );

