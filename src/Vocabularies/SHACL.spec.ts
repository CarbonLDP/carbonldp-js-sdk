import { hasProperty, interfaze, module, OBLIGATORY, property } from "../test/JasmineExtender";

import { SHACL } from "./SHACL";


describe( module( "carbonldp/Vocabularies/SHACL" ), ():void => {

	describe( interfaze( "CarbonLDP.Vocabularies.SHACL",
		"Interface that describes the used vocabulary of the Shapes Constraint Language (SHACL) specification."
	), ():void => {

		it( hasProperty(
			OBLIGATORY,
			"namespace",
			"string",
			"http://www.w3.org/ns/shacl#"
		), ():void => {
			const target:SHACL[ "namespace" ] = "http://www.w3.org/ns/shacl#";
			expect( target ).toBeDefined();
		} );

		it( hasProperty(
			OBLIGATORY,
			"ValidationReport",
			"http://www.w3.org/ns/shacl#ValidationReport"
		), ():void => {
			const target:SHACL[ "ValidationReport" ] = "http://www.w3.org/ns/shacl#ValidationReport";
			expect( target ).toBeDefined();
		} );

		it( hasProperty(
			OBLIGATORY,
			"ValidationResult",
			"http://www.w3.org/ns/shacl#ValidationResult"
		), ():void => {
			const target:SHACL[ "ValidationResult" ] = "http://www.w3.org/ns/shacl#ValidationResult";
			expect( target ).toBeDefined();
		} );

		it( hasProperty(
			OBLIGATORY,
			"conforms",
			"http://www.w3.org/ns/shacl#conforms"
		), ():void => {
			const target:SHACL[ "conforms" ] = "http://www.w3.org/ns/shacl#conforms";
			expect( target ).toBeDefined();
		} );

		it( hasProperty(
			OBLIGATORY,
			"detail",
			"http://www.w3.org/ns/shacl#detail"
		), ():void => {
			const target:SHACL[ "detail" ] = "http://www.w3.org/ns/shacl#detail";
			expect( target ).toBeDefined();
		} );

		it( hasProperty(
			OBLIGATORY,
			"focusNode",
			"http://www.w3.org/ns/shacl#focusNode"
		), ():void => {
			const target:SHACL[ "focusNode" ] = "http://www.w3.org/ns/shacl#focusNode";
			expect( target ).toBeDefined();
		} );

		it( hasProperty(
			OBLIGATORY,
			"result",
			"http://www.w3.org/ns/shacl#result"
		), ():void => {
			const target:SHACL[ "result" ] = "http://www.w3.org/ns/shacl#result";
			expect( target ).toBeDefined();
		} );

		it( hasProperty(
			OBLIGATORY,
			"resultMessage",
			"http://www.w3.org/ns/shacl#resultMessage"
		), ():void => {
			const target:SHACL[ "resultMessage" ] = "http://www.w3.org/ns/shacl#resultMessage";
			expect( target ).toBeDefined();
		} );

		it( hasProperty(
			OBLIGATORY,
			"resultPath",
			"http://www.w3.org/ns/shacl#resultPath"
		), ():void => {
			const target:SHACL[ "resultPath" ] = "http://www.w3.org/ns/shacl#resultPath";
			expect( target ).toBeDefined();
		} );

		it( hasProperty(
			OBLIGATORY,
			"resultSeverity",
			"http://www.w3.org/ns/shacl#resultSeverity"
		), ():void => {
			const target:SHACL[ "resultSeverity" ] = "http://www.w3.org/ns/shacl#resultSeverity";
			expect( target ).toBeDefined();
		} );

		it( hasProperty(
			OBLIGATORY,
			"shapesGraphWellFormed",
			"http://www.w3.org/ns/shacl#shapesGraphWellFormed"
		), ():void => {
			const target:SHACL[ "shapesGraphWellFormed" ] = "http://www.w3.org/ns/shacl#shapesGraphWellFormed";
			expect( target ).toBeDefined();
		} );

		it( hasProperty(
			OBLIGATORY,
			"sourceConstraintComponent",
			"http://www.w3.org/ns/shacl#sourceConstraintComponent"
		), ():void => {
			const target:SHACL[ "sourceConstraintComponent" ] = "http://www.w3.org/ns/shacl#sourceConstraintComponent";
			expect( target ).toBeDefined();
		} );

		it( hasProperty(
			OBLIGATORY,
			"sourceShape",
			"http://www.w3.org/ns/shacl#sourceShape"
		), ():void => {
			const target:SHACL[ "sourceShape" ] = "http://www.w3.org/ns/shacl#sourceShape";
			expect( target ).toBeDefined();
		} );

		it( hasProperty(
			OBLIGATORY,
			"value",
			"http://www.w3.org/ns/shacl#value"
		), ():void => {
			const target:SHACL[ "value" ] = "http://www.w3.org/ns/shacl#value";
			expect( target ).toBeDefined();
		} );

	} );

	describe( property(
		"SHACL",
		"CarbonLDP.Vocabularies.SHACL",
		"Constant that implements the used vocabulary of the Shapes Constraint Language (SHACL) specification."
	), ():void => {

		it( "should exist", ():void => {
			expect( SHACL ).toEqual( jasmine.any( Object ) );
		} );

		it( "should test all exported IRIs", ():void => {
			expect( Object.keys( SHACL ).length ).toBe( 14 );
		} );

		it( "SHACL.namespace", ():void => {
			expect( SHACL.namespace ).toBeDefined();
			expect( SHACL.namespace ).toEqual( jasmine.any( String ) );

			expect( SHACL.namespace ).toBe( "http://www.w3.org/ns/shacl#" );
		} );

		it( "SHACL.ValidationReport", ():void => {
			expect( SHACL.ValidationReport ).toBeDefined();
			expect( SHACL.ValidationReport ).toEqual( jasmine.any( String ) );

			expect( SHACL.ValidationReport ).toBe( "http://www.w3.org/ns/shacl#ValidationReport" );
		} );

		it( "SHACL.ValidationResult", ():void => {
			expect( SHACL.ValidationResult ).toBeDefined();
			expect( SHACL.ValidationResult ).toEqual( jasmine.any( String ) );

			expect( SHACL.ValidationResult ).toBe( "http://www.w3.org/ns/shacl#ValidationResult" );
		} );

		it( "SHACL.conforms", ():void => {
			expect( SHACL.conforms ).toBeDefined();
			expect( SHACL.conforms ).toEqual( jasmine.any( String ) );

			expect( SHACL.conforms ).toBe( "http://www.w3.org/ns/shacl#conforms" );
		} );

		it( "SHACL.detail", ():void => {
			expect( SHACL.detail ).toBeDefined();
			expect( SHACL.detail ).toEqual( jasmine.any( String ) );

			expect( SHACL.detail ).toBe( "http://www.w3.org/ns/shacl#detail" );
		} );

		it( "SHACL.focusNode", ():void => {
			expect( SHACL.focusNode ).toBeDefined();
			expect( SHACL.focusNode ).toEqual( jasmine.any( String ) );

			expect( SHACL.focusNode ).toBe( "http://www.w3.org/ns/shacl#focusNode" );
		} );

		it( "SHACL.result", ():void => {
			expect( SHACL.result ).toBeDefined();
			expect( SHACL.result ).toEqual( jasmine.any( String ) );

			expect( SHACL.result ).toBe( "http://www.w3.org/ns/shacl#result" );
		} );

		it( "SHACL.resultMessage", ():void => {
			expect( SHACL.resultMessage ).toBeDefined();
			expect( SHACL.resultMessage ).toEqual( jasmine.any( String ) );

			expect( SHACL.resultMessage ).toBe( "http://www.w3.org/ns/shacl#resultMessage" );
		} );

		it( "SHACL.resultPath", ():void => {
			expect( SHACL.resultPath ).toBeDefined();
			expect( SHACL.resultPath ).toEqual( jasmine.any( String ) );

			expect( SHACL.resultPath ).toBe( "http://www.w3.org/ns/shacl#resultPath" );
		} );

		it( "SHACL.resultSeverity", ():void => {
			expect( SHACL.resultSeverity ).toBeDefined();
			expect( SHACL.resultSeverity ).toEqual( jasmine.any( String ) );

			expect( SHACL.resultSeverity ).toBe( "http://www.w3.org/ns/shacl#resultSeverity" );
		} );

		it( "SHACL.shapesGraphWellFormed", ():void => {
			expect( SHACL.shapesGraphWellFormed ).toBeDefined();
			expect( SHACL.shapesGraphWellFormed ).toEqual( jasmine.any( String ) );

			expect( SHACL.shapesGraphWellFormed ).toBe( "http://www.w3.org/ns/shacl#shapesGraphWellFormed" );
		} );

		it( "SHACL.sourceConstraintComponent", ():void => {
			expect( SHACL.sourceConstraintComponent ).toBeDefined();
			expect( SHACL.sourceConstraintComponent ).toEqual( jasmine.any( String ) );

			expect( SHACL.sourceConstraintComponent ).toBe( "http://www.w3.org/ns/shacl#sourceConstraintComponent" );
		} );

		it( "SHACL.sourceShape", ():void => {
			expect( SHACL.sourceShape ).toBeDefined();
			expect( SHACL.sourceShape ).toEqual( jasmine.any( String ) );

			expect( SHACL.sourceShape ).toBe( "http://www.w3.org/ns/shacl#sourceShape" );
		} );

		it( "SHACL.value", ():void => {
			expect( SHACL.value ).toBeDefined();
			expect( SHACL.value ).toEqual( jasmine.any( String ) );

			expect( SHACL.value ).toBe( "http://www.w3.org/ns/shacl#value" );
		} );

	} );

} );
