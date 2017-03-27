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

import * as IDAlreadyInUseError from "./IDAlreadyInUseError";
import DefaultExport from "./IDAlreadyInUseError";

describe( module( "Carbon/Errors/IDAlreadyInUseError" ), ():void => {

	it( isDefined(), ():void => {
		expect( IDAlreadyInUseError ).toBeDefined();
		expect( IDAlreadyInUseError ).toEqual( jasmine.any( Object ) );
	} );

	describe( clazz(
		"Carbon.Errors.IDAlreadyInUseError.Class",
		"Error class to indicate that an identifier (ID) is already in use."
	), ():void => {

		it( isDefined(), ():void => {
			expect( IDAlreadyInUseError.Class ).toBeDefined();
			expect( Utils.isFunction( IDAlreadyInUseError.Class ) ).toBe( true );

			let error:IDAlreadyInUseError.Class = new IDAlreadyInUseError.Class( "Message of the error" );
			expect( error instanceof IDAlreadyInUseError.Class ).toBe( true );
		} );

		it( extendsClass(
			"Carbon.Errors.AbstractError"
		), ():void => {
			let error:IDAlreadyInUseError.Class = new IDAlreadyInUseError.Class( "Message of the error" );

			expect( error instanceof AbstractError ).toBe( true );
		} );

		it( hasProperty(
			INSTANCE,
			"name",
			"string"
		), ():void => {
			let error:IDAlreadyInUseError.Class = new IDAlreadyInUseError.Class( "Message of the error" );

			expect( error.name ).toBeDefined();
			expect( Utils.isString( error.name ) ).toBe( true );

			expect( error.name ).toBe( "IDAlreadyInUseError" );
		} );

	} );

	it( hasDefaultExport( "Carbon.Errors.IDAlreadyInUseError.Class" ), ():void => {
		expect( DefaultExport ).toBeDefined();
		expect( DefaultExport ).toBe( IDAlreadyInUseError.Class );
	} );

} );
