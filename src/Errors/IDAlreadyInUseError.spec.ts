import { clazz, extendsClass, hasProperty, INSTANCE, isDefined, module } from "../test/JasmineExtender";

import * as Utils from "./../Utils";

import { AbstractError } from "./AbstractError";

import * as IDAlreadyInUseError from "./IDAlreadyInUseError";


// TODO: Refactor tests
describe( module( "carbonldp/Errors/IDAlreadyInUseError" ), ():void => {

	it( isDefined(), ():void => {
		expect( IDAlreadyInUseError ).toBeDefined();
		expect( IDAlreadyInUseError ).toEqual( jasmine.any( Object ) );
	} );

	describe( clazz(
		"CarbonLDP.Errors.IDAlreadyInUseError",
		"Error class to indicate that an identifier (ID) is already in use."
	), ():void => {

		it( isDefined(), ():void => {
			expect( IDAlreadyInUseError.IDAlreadyInUseError ).toBeDefined();
			expect( Utils.isFunction( IDAlreadyInUseError.IDAlreadyInUseError ) ).toBe( true );

			let error:IDAlreadyInUseError.IDAlreadyInUseError = new IDAlreadyInUseError.IDAlreadyInUseError( "Message of the error" );
			expect( error instanceof IDAlreadyInUseError.IDAlreadyInUseError ).toBe( true );
		} );

		it( extendsClass(
			"CarbonLDP.Errors.AbstractError.AbstractError"
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

} );
