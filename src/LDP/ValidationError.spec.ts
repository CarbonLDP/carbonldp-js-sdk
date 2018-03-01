import { Resource } from "../Resource";
import {
	extendsClass,
	hasDefaultExport,
	hasProperty,
	interfaze,
	module,
	OBLIGATORY,
	property,
	STATIC
} from "../test/JasmineExtender";
import { C } from "../Vocabularies/C";

import DefaultExport, { ValidationError } from "./ValidationError";

describe( module( "Carbon/LDP/ValidationError" ), ():void => {

	it( "should exists", ():void => {
		expect( ValidationError ).toBeDefined();
		expect( ValidationError ).toEqual( jasmine.any( Object ) );
	} );

	describe( interfaze(
		"Carbon.LDP.ValidationError.ValidationError",
		"Interface that contains the properties that describe how the validation failed."
	), ():void => {

		it( extendsClass( "Carbon.Resource.Resource" ), ():void => {
			const target:Resource = {} as ValidationError;
			expect( target ).toBeDefined();
		} );

		it( "should exists", ():void => {
			const target:ValidationError = {} as any;
			expect( target ).toBeDefined();
		} );

		it( hasProperty(
			OBLIGATORY,
			"errorDetails",
			"Carbon.Pointer.Pointer",
			"Pointer with the error details of how the validation failed."
		), ():void => {
			const target:ValidationError = { errorDetails: true } as any;
			expect( target.errorDetails ).toBeDefined();
		} );

	} );

	describe( interfaze(
		"Carbon.LDP.ValidationError.ValidationErrorFactory",
		"Interface with the factory, decorate and utils methods for `Carbon.LDP.ValidationError.ValidationError` objects."
	), ():void => {

		it( hasProperty(
			OBLIGATORY,
			"TYPE",
			"string"
		), ():void => {} );

		it( hasProperty(
			OBLIGATORY,
			"SCHEMA",
			"Carbon.ObjectSchema.ObjectSchema"
		), ():void => {} );

	} );

	describe( property(
		STATIC,
		"ValidationError",
		"Carbon.LDP.ValidationError.ValidationErrorFactory"
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

	it( hasDefaultExport( "Carbon.LDP.ValidationError.ValidationError" ), ():void => {
		const target:ValidationError = {} as DefaultExport;
		expect( target ).toBeDefined();
	} );

} );
