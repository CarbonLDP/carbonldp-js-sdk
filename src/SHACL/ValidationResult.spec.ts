import { SHACL } from "../Vocabularies/SHACL";
import { XSD } from "../Vocabularies/XSD";

import { ValidationResult } from "./ValidationResult";


describe( "ValidationResult", () => {

	it( "should exist", () => {
		expect( ValidationResult ).toBeDefined();
		expect( ValidationResult ).toEqual( jasmine.any( Object ) );
	} );


	describe( "[[factory]]", () => {

		describe( "ValidationResult.TYPE", () => {

			it( "should exist", () => {
				expect( ValidationResult.TYPE ).toBeDefined();
				expect( ValidationResult.TYPE ).toEqual( jasmine.any( String ) );
			} );

			it( "should be `shacl:ValidationResult`", () => {
				expect( ValidationResult.TYPE ).toBe( SHACL.ValidationResult );
			} );

		} );

		describe( "ValidationResult.SCHEMA", () => {

			it( "should exist", () => {
				expect( ValidationResult.SCHEMA ).toBeDefined();
				expect( ValidationResult.SCHEMA ).toEqual( jasmine.any( Object ) );
			} );


			it( "should have model properties", () => {
				expect( ValidationResult.SCHEMA as {} ).toEqual( {
					"focusNode": jasmine.any( Object ),
					"resultPath": jasmine.any( Object ),
					"value": jasmine.any( Object ),
					"sourceShape": jasmine.any( Object ),
					"sourceConstraintComponent": jasmine.any( Object ),
					"detail": jasmine.any( Object ),
					"resultMessage": jasmine.any( Object ),
					"resultSeverity": jasmine.any( Object ),
				} );
			} );

			it( "should have `shacl:focusNode`", () => {
				expect( ValidationResult.SCHEMA[ "focusNode" ] ).toEqual( {
					"@id": SHACL.focusNode,
					"@type": "@id",
				} );
			} );

			it( "should have `shacl:resultPath`", () => {
				expect( ValidationResult.SCHEMA[ "resultPath" ] ).toEqual( {
					"@id": SHACL.resultPath,
					"@type": "@id",
				} );
			} );

			it( "should have `shacl:value`", () => {
				expect( ValidationResult.SCHEMA[ "value" ] ).toEqual( {
					"@id": SHACL.value,
				} );
			} );

			it( "should have `shacl:sourceShape`", () => {
				expect( ValidationResult.SCHEMA[ "sourceShape" ] ).toEqual( {
					"@id": SHACL.sourceShape,
					"@type": "@id",
				} );
			} );

			it( "should have `shacl:sourceConstraintComponent`", () => {
				expect( ValidationResult.SCHEMA[ "sourceConstraintComponent" ] ).toEqual( {
					"@id": SHACL.sourceConstraintComponent,
					"@type": "@id",
				} );
			} );

			it( "should have `shacl:detail`", () => {
				expect( ValidationResult.SCHEMA[ "detail" ] ).toEqual( {
					"@id": SHACL.detail,
					"@type": "@id",
				} );
			} );

			it( "should have `shacl:resultMessage`", () => {
				expect( ValidationResult.SCHEMA[ "resultMessage" ] ).toEqual( {
					"@id": SHACL.resultMessage,
					"@type": XSD.string,
				} );
			} );

			it( "should have `shacl:resultSeverity`", () => {
				expect( ValidationResult.SCHEMA[ "resultSeverity" ] ).toEqual( {
					"@id": SHACL.resultSeverity,
					"@type": "@id",
				} );
			} );

		} );

	} );

} );
