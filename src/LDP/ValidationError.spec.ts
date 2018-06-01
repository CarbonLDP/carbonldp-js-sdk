import { TransientResource } from "../Resource";
import {
	extendsClass,
	hasProperty,
	interfaze,
	module,
	OBLIGATORY,
	property,
	STATIC
} from "../test/JasmineExtender";
import { C } from "../Vocabularies/C";

import { ValidationError } from "./ValidationError";

describe( module( "carbonldp/LDP/ValidationError" ), ():void => {

	it( "should exists", ():void => {
		expect( ValidationError ).toBeDefined();
		expect( ValidationError ).toEqual( jasmine.any( Object ) );
	} );

	describe( interfaze(
		"CarbonLDP.LDP.ValidationError",
		"Interface that contains the properties that describe how the validation failed."
	), ():void => {

		it( extendsClass( "CarbonLDP.TransientResource" ), ():void => {
			const target:TransientResource = {} as ValidationError;
			expect( target ).toBeDefined();
		} );

		it( "should exists", ():void => {
			const target:ValidationError = {} as any;
			expect( target ).toBeDefined();
		} );

		it( hasProperty(
			OBLIGATORY,
			"errorDetails",
			"CarbonLDP.Pointer",
			"Pointer with the error details of how the validation failed."
		), ():void => {
			const target:ValidationError = { errorDetails: true } as any;
			expect( target.errorDetails ).toBeDefined();
		} );

	} );

	describe( interfaze(
		"CarbonLDP.LDP.ValidationErrorFactory",
		"Interface with the factory, decorate and utils methods for `CarbonLDP.LDP.ValidationError` objects."
	), ():void => {

		it( hasProperty(
			OBLIGATORY,
			"TYPE",
			"string"
		), ():void => {} );

		it( hasProperty(
			OBLIGATORY,
			"SCHEMA",
			"CarbonLDP.ObjectSchema"
		), ():void => {} );

	} );

	describe( property(
		STATIC,
		"ValidationError",
		"CarbonLDP.LDP.ValidationErrorFactory"
	), ():void => {

		it( "should exist", ():void => {
			expect( ValidationError ).toBeDefined();
			expect( ValidationError ).toEqual( jasmine.any( Object ) );
		} );

		// TODO: Separate in different tests
		it( "ValidationError.TYPE", ():void => {
			expect( ValidationError.TYPE ).toBeDefined();
			expect( ValidationError.TYPE ).toEqual( jasmine.any( String ) );

			expect( ValidationError.TYPE ).toBe( C.ValidationError );
		} );

		// TODO: Separate in different tests
		it( "ValidationError.SCHEMA", ():void => {
			expect( ValidationError.SCHEMA ).toBeDefined();
			expect( ValidationError.SCHEMA ).toEqual( jasmine.any( Object ) );

			expect( ValidationError.SCHEMA as {} ).toEqual( {
				"errorDetails": jasmine.any( Object ),
			} );

			expect( ValidationError.SCHEMA[ "errorDetails" ] ).toEqual( {
				"@id": C.errorDetails,
				"@type": "@id",
			} );
		} );

	} );

} );
