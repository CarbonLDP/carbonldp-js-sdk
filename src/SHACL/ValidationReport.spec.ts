import { SHACL } from "../Vocabularies/SHACL";
import { XSD } from "../Vocabularies/XSD";

import { ValidationReport } from "./ValidationReport";


describe( "ValidationReport", ():void => {

	it( "should exist", ():void => {
		expect( ValidationReport ).toBeDefined();
		expect( ValidationReport ).toEqual( jasmine.any( Object ) );
	} );


	describe( "[[factory]]", ():void => {

		describe( "ValidationReport.TYPE", ():void => {

			it( "should exist", () => {
				expect( ValidationReport.TYPE ).toBeDefined();
				expect( ValidationReport.TYPE ).toEqual( jasmine.any( String ) );
			} );

			it( "should be `shacl:ValidationReport`", () => {
				expect( ValidationReport.TYPE ).toBe( SHACL.ValidationReport );
			} );

		} );

		describe( "ValidationReport.SCHEMA", ():void => {

			it( "should exist", () => {
				expect( ValidationReport.SCHEMA ).toBeDefined();
				expect( ValidationReport.SCHEMA ).toEqual( jasmine.any( Object ) );
			} );


			it( "should have model properties", () => {
				expect( ValidationReport.SCHEMA as {} ).toEqual( {
					"conforms": jasmine.any( Object ),
					"results": jasmine.any( Object ),
					"shapesGraphWellFormed": jasmine.any( Object ),
				} );
			} );

			it( "should have `shacl:conforms`", () => {
				expect( ValidationReport.SCHEMA[ "conforms" ] ).toEqual( {
					"@id": SHACL.conforms,
					"@type": XSD.boolean,
				} );
			} );

			it( "should have `shacl:result`", () => {
				expect( ValidationReport.SCHEMA[ "results" ] ).toEqual( {
					"@id": SHACL.result,
					"@type": "@id",
					"@container": "@set",
				} );
			} );

			it( "should have `shacl:shapesGraphWellFormed`", () => {
				expect( ValidationReport.SCHEMA[ "shapesGraphWellFormed" ] ).toEqual( {
					"@id": SHACL.shapesGraphWellFormed,
					"@type": XSD.boolean,
				} );
			} );

		} );

	} );

} );
