/// <reference path="../../typings/typings.d.ts" />

import {
	INSTANCE,

	module,
	clazz,

	isDefined,
	hasProperty,
	extendsClass
} from "./../test/JasmineExtender";
import * as Utils from "./../Utils";

import IDAlreadyInUseError from "./IDAlreadyInUseError";
import AbstractError from "./AbstractError";

describe( module( "Carbon/Errors/IDAlreadyInUseError" ), ():void => {

	describe( clazz(
		"Carbon.Errors.IDAlreadyInUseError",
		"Error class to indicates that an ID is already in use"
	), ():void => {

		it( isDefined(), ():void => {
			expect( IDAlreadyInUseError ).toBeDefined();
			expect( Utils.isFunction( IDAlreadyInUseError ) ).toBe( true );

			let error: IDAlreadyInUseError = new IDAlreadyInUseError( "Message of the error" );
			expect( error instanceof IDAlreadyInUseError ).toBe( true );
		});

		it( extendsClass(
			"Carbon.Errors.AbstractError"
		), ():void => {
			let error: IDAlreadyInUseError = new IDAlreadyInUseError( "Message of the error" );

			expect( error instanceof AbstractError ).toBe( true );
		});

		it( hasProperty(
			INSTANCE,
			"name",
			"string"
		), ():void => {
			let error: IDAlreadyInUseError = new IDAlreadyInUseError( "Message of the error" );

			expect( error.name ).toBeDefined();
			expect( Utils.isString( error.name ) ).toBe( true );

			expect( error.name ).toBe( "IDAlreadyInUseError" );
		});

	});

});
