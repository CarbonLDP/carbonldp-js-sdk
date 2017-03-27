import {
	INSTANCE,

	module,
	clazz,

	isDefined,
	hasProperty,
	extendsClass, hasDefaultExport,
} from "../test/JasmineExtender";
import AbstractError from "./AbstractError";
import * as Utils from "../Utils";

import * as InvalidJSONLDSyntaxError from "./InvalidJSONLDSyntaxError";
import DefaultExport from "./InvalidJSONLDSyntaxError";

describe( module( "Carbon/Errors/InvalidJSONLDSyntaxError" ), ():void => {

	it( isDefined(), ():void => {
		expect( InvalidJSONLDSyntaxError ).toBeDefined();
		expect( InvalidJSONLDSyntaxError ).toEqual( jasmine.any( Object ) );
	} );

	describe( clazz(
		"Carbon.Errors.InvalidJSONLDSyntaxError.Class",
		"Error class to indicate that there an invalid syntax in a JSON-LD object."
	), ():void => {

		it( isDefined(), ():void => {
			expect( InvalidJSONLDSyntaxError.Class ).toBeDefined();
			expect( Utils.isFunction( InvalidJSONLDSyntaxError.Class ) ).toBe( true );

			let error:InvalidJSONLDSyntaxError.Class = new InvalidJSONLDSyntaxError.Class( "Message of the error" );
			expect( error instanceof InvalidJSONLDSyntaxError.Class ).toBe( true );
		} );

		it( extendsClass(
			"Carbon.Errors.AbstractError"
		), ():void => {
			let error:InvalidJSONLDSyntaxError.Class = new InvalidJSONLDSyntaxError.Class( "Message of the error" );

			expect( error instanceof AbstractError ).toBe( true );
		} );

		it( hasProperty(
			INSTANCE,
			"name",
			"string"
		), ():void => {
			let error:InvalidJSONLDSyntaxError.Class = new InvalidJSONLDSyntaxError.Class( "Message of the error" );

			expect( error.name ).toBeDefined();
			expect( Utils.isString( error.name ) ).toBe( true );

			expect( error.name ).toBe( "InvalidJSONLDSyntaxError" );
		} );

	} );

	it( hasDefaultExport( "Carbon.Errors.InvalidJSONLDSyntaxError.Class" ), ():void => {
		expect( DefaultExport ).toBeDefined();
		expect( DefaultExport ).toBe( InvalidJSONLDSyntaxError.Class );
	} );

} );
