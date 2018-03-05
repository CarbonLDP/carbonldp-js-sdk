import {
	hasDefaultExport,
	hasProperty,
	interfaze,
	module,
	OBLIGATORY,
	property,
	STATIC
} from "../test/JasmineExtender";
import { SHACL } from "../Vocabularies/SHACL";
import { XSD } from "../Vocabularies/XSD";

import DefaultExport, { ValidationReport } from "./ValidationReport";

import { ValidationResult } from "./ValidationResult";

describe( module( "Carbon/SHACL/ValidationReport" ), ():void => {

	describe( interfaze(
		"Carbon.SHACL.ValidationReport.ValidationReport",
		"Interface that represents the results of a validation process."
	), ():void => {

		it( "should exists", ():void => {
			const target:ValidationReport = {} as any;
			expect( target ).toBeDefined();
		} );

		it( hasProperty(
			OBLIGATORY,
			"conforms",
			"boolean",
			"Indicates if the validation conforms the given shape. If that's the case, no results data will be returned."
		), ():void => {
			const target:ValidationReport[ "conforms" ] = true;
			expect( target ).toBeDefined();
		} );

		it( hasProperty(
			OBLIGATORY,
			"results",
			"Carbon.SHACL.ValidationResult.ValidationResult[]",
			"The results of a failure validation process."
		), ():void => {
			const target:ValidationReport[ "results" ] = [] as ValidationResult[];
			expect( target ).toBeDefined();
		} );

		it( hasProperty(
			OBLIGATORY,
			"shapesGraphWellFormed",
			"Carbon.SHACL.ValidationResult.ValidationResult",
			"The shapesGraphWellFormed of a failure validation process."
		), ():void => {
			const target:ValidationReport[ "shapesGraphWellFormed" ] = true;
			expect( target ).toBeDefined();
		} );

	} );

	describe( interfaze(
		"Carbon.SHACL.ValidationReport.ValidationReportConstant",
		"Interface with the factory, decorate and utils methods for `Carbon.SHACL.ValidationReport.ValidationReport` objects."
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
		"ValidationReport",
		"Carbon.SHACL.ValidationReport.ValidationReportConstant"
	), ():void => {

		it( "should exist", ():void => {
			expect( ValidationReport ).toBeDefined();
			expect( ValidationReport ).toEqual( jasmine.any( Object ) );
		} );

		// TODO: Separate in different tests
		it( "ValidationReport.TYPE", ():void => {
			expect( ValidationReport.TYPE ).toBeDefined();
			expect( ValidationReport.TYPE ).toEqual( jasmine.any( String ) );

			expect( ValidationReport.TYPE ).toBe( SHACL.ValidationReport );
		} );

		// TODO: Separate in different tests
		it( "ValidationReport.SCHEMA", ():void => {
			expect( ValidationReport.SCHEMA ).toBeDefined();
			expect( ValidationReport.SCHEMA ).toEqual( jasmine.any( Object ) );

			expect( ValidationReport.SCHEMA as {} ).toEqual( {
				"conforms": jasmine.any( Object ),
				"results": jasmine.any( Object ),
				"shapesGraphWellFormed": jasmine.any( Object ),
			} );

			expect( ValidationReport.SCHEMA[ "conforms" ] ).toEqual( {
				"@id": SHACL.conforms,
				"@type": XSD.boolean,
			} );

			expect( ValidationReport.SCHEMA[ "results" ] ).toEqual( {
				"@id": SHACL.result,
				"@type": "@id",
				"@container": "@set",
			} );

			expect( ValidationReport.SCHEMA[ "shapesGraphWellFormed" ] ).toEqual( {
				"@id": SHACL.shapesGraphWellFormed,
				"@type": XSD.boolean,
			} );
		} );

	} );

	it( hasDefaultExport( "Carbon.SHACL.ValidationReport.ValidationReport" ), ():void => {
		const target:ValidationReport = {} as DefaultExport;
		expect( target ).toBeDefined();
	} );

} );
