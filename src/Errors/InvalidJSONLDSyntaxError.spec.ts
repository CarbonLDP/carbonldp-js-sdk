import {
	INSTANCE,

	module,
	clazz,

	isDefined,
	hasProperty,
	extendsClass,
} from "../test/JasmineExtender";
import AbstractError from "./AbstractError";
import * as Utils from "../Utils";

import InvalidJSONLDSyntaxError from "./InvalidJSONLDSyntaxError";

describe( module( "Carbon/Errors/InvalidJSONLDSyntaxError" ), ():void => {

	describe( clazz(
		"Carbon.Errors.InvalidJSONLDSyntaxError",
		"Error class to indicate that there an invalid syntax in a JSON-LD object."
	), ():void => {

		it( isDefined(), ():void => {
			expect( InvalidJSONLDSyntaxError ).toBeDefined();
			expect( Utils.isFunction( InvalidJSONLDSyntaxError ) ).toBe( true );

			let error:InvalidJSONLDSyntaxError = new InvalidJSONLDSyntaxError( "Message of the error" );
			expect( error instanceof InvalidJSONLDSyntaxError ).toBe( true );
		} );

		it( extendsClass(
			"Carbon.Errors.AbstractError"
		), ():void => {
			let error:InvalidJSONLDSyntaxError = new InvalidJSONLDSyntaxError( "Message of the error" );

			expect( error instanceof AbstractError ).toBe( true );
		} );

		it( hasProperty(
			INSTANCE,
			"name",
			"string"
		), ():void => {
			let error:InvalidJSONLDSyntaxError = new InvalidJSONLDSyntaxError( "Message of the error" );

			expect( error.name ).toBeDefined();
			expect( Utils.isString( error.name ) ).toBe( true );

			expect( error.name ).toBe( "InvalidJSONLDSyntaxError" );
		} );

	} );

} );
