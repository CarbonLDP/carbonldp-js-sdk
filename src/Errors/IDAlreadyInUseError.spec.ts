import {
	clazz,
	extendsClass,
	hasDefaultExport,
	hasProperty,
	INSTANCE,
	isDefined,
	module,
} from "./../test/JasmineExtender";
import * as Utils from "./../Utils";

import AbstractError from "./AbstractError";

import * as IDAlreadyInUseError from "./IDAlreadyInUseError";
import DefaultExport from "./IDAlreadyInUseError";

// TODO: Refactor tests
describe( module( "Carbon/Errors/IDAlreadyInUseError" ), ():void => {

	it( isDefined(), ():void => {
		expect( IDAlreadyInUseError ).toBeDefined();
		expect( IDAlreadyInUseError ).toEqual( jasmine.any( Object ) );
	} );

	describe( clazz(
		"Carbon.Errors.IDAlreadyInUseError.IDAlreadyInUseError",
		"Error class to indicate that an identifier (ID) is already in use."
	), ():void => {

		it( isDefined(), ():void => {
			expect( IDAlreadyInUseError.IDAlreadyInUseError ).toBeDefined();
			expect( Utils.isFunction( IDAlreadyInUseError.IDAlreadyInUseError ) ).toBe( true );

			let error:IDAlreadyInUseError.IDAlreadyInUseError = new IDAlreadyInUseError.IDAlreadyInUseError( "Message of the error" );
			expect( error instanceof IDAlreadyInUseError.IDAlreadyInUseError ).toBe( true );
		} );

		it( extendsClass(
			"Carbon.Errors.AbstractError.AbstractError"
		), ():void => {
			let error:IDAlreadyInUseError.IDAlreadyInUseError = new IDAlreadyInUseError.IDAlreadyInUseError( "Message of the error" );

			expect( error instanceof AbstractError ).toBe( true );
		} );

		it( hasProperty(
			INSTANCE,
			"name",
			"string"
		), ():void => {
			let error:IDAlreadyInUseError.IDAlreadyInUseError = new IDAlreadyInUseError.IDAlreadyInUseError( "Message of the error" );

			expect( error.name ).toBeDefined();
			expect( Utils.isString( error.name ) ).toBe( true );

			expect( error.name ).toBe( "IDAlreadyInUseError" );
		} );

	} );

	it( hasDefaultExport( "Carbon.Errors.IDAlreadyInUseError.IDAlreadyInUseError" ), ():void => {
		expect( DefaultExport ).toBeDefined();
		expect( DefaultExport ).toBe( IDAlreadyInUseError.IDAlreadyInUseError );
	} );

} );
