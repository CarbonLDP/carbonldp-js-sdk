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

import * as NotImplementedError from "./NotImplementedError";
import DefaultExport from "./NotImplementedError";

// TODO: Refactor tests
describe( module( "Carbon/Errors/NotImplementedError" ), ():void => {

	it( isDefined(), ():void => {
		expect( NotImplementedError ).toBeDefined();
		expect( NotImplementedError ).toEqual( jasmine.any( Object ) );
	} );

	describe( clazz(
		"Carbon.Errors.NotImplementedError.NotImplementedError",
		"Error class to indicate that an action is not yet implemented."
	), ():void => {

		it( isDefined(), ():void => {
			expect( NotImplementedError.NotImplementedError ).toBeDefined();
			expect( Utils.isFunction( NotImplementedError.NotImplementedError ) ).toBe( true );
		} );

		it( extendsClass(
			"Carbon.Errors.AbstractError.AbstractError"
		), ():void => {
			let error:NotImplementedError.NotImplementedError = new NotImplementedError.NotImplementedError( "Message of the error" );

			expect( error instanceof AbstractError ).toBe( true );
		} );

		it( hasConstructor( [
			{ name: "message", type: "string", optional: true },
		] ), ():void => {
			let error:NotImplementedError.NotImplementedError = new NotImplementedError.NotImplementedError( "Message of the error" );

			expect( error ).toBeTruthy();
			expect( error instanceof NotImplementedError.NotImplementedError ).toBe( true );

			error = new NotImplementedError.NotImplementedError();

			expect( error ).toBeTruthy();
			expect( error instanceof NotImplementedError.NotImplementedError ).toBe( true );
		} );

		it( hasProperty(
			INSTANCE,
			"name",
			"string"
		), ():void => {
			let error:NotImplementedError.NotImplementedError = new NotImplementedError.NotImplementedError( "Message of the error" );

			expect( error.name ).toBeDefined();
			expect( Utils.isString( error.name ) ).toBe( true );

			expect( error.name ).toBe( "NotImplementedError" );
		} );

	} );

	it( hasDefaultExport( "Carbon.Errors.NotImplementedError.NotImplementedError" ), ():void => {
		expect( DefaultExport ).toBeDefined();
		expect( DefaultExport ).toBe( NotImplementedError.NotImplementedError );
	} );

} );

