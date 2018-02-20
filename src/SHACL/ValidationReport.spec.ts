import {
	hasDefaultExport,
	hasProperty,
	interfaze,
	module,
	OBLIGATORY,
	STATIC
} from "../test/JasmineExtender";
import { SHACL } from "../Vocabularies/SHACL";
import { XSD } from "../Vocabularies/XSD";
import * as ValidationReport from "./ValidationReport";
import DefaultExport from "./ValidationReport";
import * as ValidationResult from "./ValidationResult";

describe( module( "Carbon/SHACL/ValidationReport" ), ():void => {

	it( "should exists", ():void => {
		expect( ValidationReport ).toBeDefined();
		expect( ValidationReport ).toEqual( jasmine.any( Object ) );
	} );

	it( hasProperty(
		STATIC,
		"RDF_CLASS",
		"string"
	), ():void => {
		expect( ValidationReport.RDF_CLASS ).toBeDefined();
		expect( ValidationReport.RDF_CLASS ).toEqual( jasmine.any( String ) );

		expect( ValidationReport.RDF_CLASS ).toBe( SHACL.ValidationReport );
	} );

	it( hasProperty(
		STATIC,
		"SCHEMA",
		"Carbon.ObjectSchema.Class"
	), ():void => {
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

	describe( interfaze(
		"Carbon.SHACL.ValidationReport.Class",
		"Interface that represents the results of a validation process."
	), ():void => {

		it( "should exists", ():void => {
			const target:ValidationReport.Class = {} as any;
			expect( target ).toBeDefined();
		} );

		it( hasProperty(
			OBLIGATORY,
			"conforms",
			"boolean",
			"Indicates if the validation conforms the given shape. If that's the case, no results data will be returned."
		), ():void => {
			const target:ValidationReport.Class[ "conforms" ] = true;
			expect( target ).toBeDefined();
		} );

		it( hasProperty(
			OBLIGATORY,
			"results",
			"Carbon.SHACL.ValidationResult.Class[]",
			"The results of a failure validation process."
		), ():void => {
			const target:ValidationReport.Class[ "results" ] = [] as ValidationResult.Class[];
			expect( target ).toBeDefined();
		} );

		it( hasProperty(
			OBLIGATORY,
			"shapesGraphWellFormed",
			"Carbon.SHACL.ValidationResult.Class",
			"The shapesGraphWellFormed of a failure validation process."
		), ():void => {
			const target:ValidationReport.Class[ "shapesGraphWellFormed" ] = true;
			expect( target ).toBeDefined();
		} );

	} );

	it( hasDefaultExport( "Carbon.SHACL.ValidationReport.Class" ), ():void => {
		const target:ValidationReport.Class = {} as DefaultExport;
		expect( target ).toBeDefined();
	} );

} );
