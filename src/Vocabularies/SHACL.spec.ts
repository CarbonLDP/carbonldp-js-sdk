import {
	hasProperty,
	module,
	namespaze,
	STATIC
} from "../test/JasmineExtender";

import { SHACL } from "./SHACL";

describe( module( "carbonldp/Vocabularies/SHACL" ), ():void => {

	describe( namespaze( "CarbonLDP.Vocabularies.SHACL", "Vocabulary of the Shapes Constraint Language (SHACL) specification." ), ():void => {

		it( "should exists", ():void => {
			expect( SHACL ).toEqual( jasmine.any( Object ) );
		} );

		it( "should test all exported IRIs", ():void => {
			expect( Object.keys( SHACL ).length ).toBe( 14 );
		} );

		it( hasProperty(
			STATIC,
			"namespace",
			"string",
			"The IRI namespace prefix with the SHACL vocabulary."
		), ():void => {
			expect( SHACL.namespace ).toBeDefined();
			expect( SHACL.namespace ).toEqual( jasmine.any( String ) );

			expect( SHACL.namespace ).toBe( "http://www.w3.org/ns/shacl#" );
		} );

		it( hasProperty(
			STATIC,
			"ValidationReport",
			"string"
		), ():void => {
			expect( SHACL.ValidationReport ).toBeDefined();
			expect( SHACL.ValidationReport ).toEqual( jasmine.any( String ) );

			expect( SHACL.ValidationReport ).toBe( "http://www.w3.org/ns/shacl#ValidationReport" );
		} );

		it( hasProperty(
			STATIC,
			"ValidationResult",
			"string"
		), ():void => {
			expect( SHACL.ValidationResult ).toBeDefined();
			expect( SHACL.ValidationResult ).toEqual( jasmine.any( String ) );

			expect( SHACL.ValidationResult ).toBe( "http://www.w3.org/ns/shacl#ValidationResult" );
		} );

		it( hasProperty(
			STATIC,
			"conforms",
			"string"
		), ():void => {
			expect( SHACL.conforms ).toBeDefined();
			expect( SHACL.conforms ).toEqual( jasmine.any( String ) );

			expect( SHACL.conforms ).toBe( "http://www.w3.org/ns/shacl#conforms" );
		} );

		it( hasProperty(
			STATIC,
			"detail",
			"string"
		), ():void => {
			expect( SHACL.detail ).toBeDefined();
			expect( SHACL.detail ).toEqual( jasmine.any( String ) );

			expect( SHACL.detail ).toBe( "http://www.w3.org/ns/shacl#detail" );
		} );

		it( hasProperty(
			STATIC,
			"focusNode",
			"string"
		), ():void => {
			expect( SHACL.focusNode ).toBeDefined();
			expect( SHACL.focusNode ).toEqual( jasmine.any( String ) );

			expect( SHACL.focusNode ).toBe( "http://www.w3.org/ns/shacl#focusNode" );
		} );

		it( hasProperty(
			STATIC,
			"result",
			"string"
		), ():void => {
			expect( SHACL.result ).toBeDefined();
			expect( SHACL.result ).toEqual( jasmine.any( String ) );

			expect( SHACL.result ).toBe( "http://www.w3.org/ns/shacl#result" );
		} );

		it( hasProperty(
			STATIC,
			"resultMessage",
			"string"
		), ():void => {
			expect( SHACL.resultMessage ).toBeDefined();
			expect( SHACL.resultMessage ).toEqual( jasmine.any( String ) );

			expect( SHACL.resultMessage ).toBe( "http://www.w3.org/ns/shacl#resultMessage" );
		} );

		it( hasProperty(
			STATIC,
			"resultPath",
			"string"
		), ():void => {
			expect( SHACL.resultPath ).toBeDefined();
			expect( SHACL.resultPath ).toEqual( jasmine.any( String ) );

			expect( SHACL.resultPath ).toBe( "http://www.w3.org/ns/shacl#resultPath" );
		} );

		it( hasProperty(
			STATIC,
			"resultSeverity",
			"string"
		), ():void => {
			expect( SHACL.resultSeverity ).toBeDefined();
			expect( SHACL.resultSeverity ).toEqual( jasmine.any( String ) );

			expect( SHACL.resultSeverity ).toBe( "http://www.w3.org/ns/shacl#resultSeverity" );
		} );

		it( hasProperty(
			STATIC,
			"shapesGraphWellFormed",
			"string"
		), ():void => {
			expect( SHACL.shapesGraphWellFormed ).toBeDefined();
			expect( SHACL.shapesGraphWellFormed ).toEqual( jasmine.any( String ) );

			expect( SHACL.shapesGraphWellFormed ).toBe( "http://www.w3.org/ns/shacl#shapesGraphWellFormed" );
		} );

		it( hasProperty(
			STATIC,
			"sourceConstraintComponent",
			"string"
		), ():void => {
			expect( SHACL.sourceConstraintComponent ).toBeDefined();
			expect( SHACL.sourceConstraintComponent ).toEqual( jasmine.any( String ) );

			expect( SHACL.sourceConstraintComponent ).toBe( "http://www.w3.org/ns/shacl#sourceConstraintComponent" );
		} );

		it( hasProperty(
			STATIC,
			"sourceShape",
			"string"
		), ():void => {
			expect( SHACL.sourceShape ).toBeDefined();
			expect( SHACL.sourceShape ).toEqual( jasmine.any( String ) );

			expect( SHACL.sourceShape ).toBe( "http://www.w3.org/ns/shacl#sourceShape" );
		} );

		it( hasProperty(
			STATIC,
			"value",
			"string"
		), ():void => {
			expect( SHACL.value ).toBeDefined();
			expect( SHACL.value ).toEqual( jasmine.any( String ) );

			expect( SHACL.value ).toBe( "http://www.w3.org/ns/shacl#value" );
		} );

	} );

} );
