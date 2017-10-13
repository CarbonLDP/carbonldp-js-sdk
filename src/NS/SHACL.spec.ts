import { clazz, hasProperty, module, STATIC } from "../test/JasmineExtender";
import * as SHACL from "./SHACL";

describe( module( "Carbon/NS/SHACL" ), ():void => {

	it( "should exists", ():void => {
		expect( SHACL ).toBeDefined();
		expect( SHACL ).toEqual( jasmine.any( Object ) );
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

	describe( clazz(
		"Class",
		"Class that contains the classes defined by the Shapes Constraint Language (SHACL) specification."
	), ():void => {

		it( "should exists", ():void => {
			expect( SHACL.Class ).toBeDefined();
			expect( SHACL.Class ).toEqual( jasmine.any( Function ) );
			expect( Object.keys( SHACL.Class ).length ).toBe( 2 );
		} );

		it( hasProperty(
			STATIC,
			"ValidationReport",
			"string"
		), ():void => {
			expect( SHACL.Class.ValidationReport ).toBeDefined();
			expect( SHACL.Class.ValidationReport ).toEqual( jasmine.any( String ) );

			expect( SHACL.Class.ValidationReport ).toBe( "http://www.w3.org/ns/shacl#ValidationReport" );
		} );

		it( hasProperty(
			STATIC,
			"ValidationResult",
			"string"
		), ():void => {
			expect( SHACL.Class.ValidationResult ).toBeDefined();
			expect( SHACL.Class.ValidationResult ).toEqual( jasmine.any( String ) );

			expect( SHACL.Class.ValidationResult ).toBe( "http://www.w3.org/ns/shacl#ValidationResult" );
		} );

	} );

	describe( clazz(
		"Carbon.NS.SHACL.Predicate",
		"Class that contains the predicated defied by the Shapes Constraint Language (SHACL) specification."
	), ():void => {

		it( "should exists", ():void => {
			expect( SHACL.Predicate ).toBeDefined();
			expect( SHACL.Predicate ).toEqual( jasmine.any( Function ) );
			expect( Object.keys( SHACL.Predicate ).length ).toBe( 11 );
		} );

		it( hasProperty(
			STATIC,
			"conforms",
			"string"
		), ():void => {
			expect( SHACL.Predicate.conforms ).toBeDefined();
			expect( SHACL.Predicate.conforms ).toEqual( jasmine.any( String ) );

			expect( SHACL.Predicate.conforms ).toBe( "http://www.w3.org/ns/shacl#conforms" );
		} );

		it( hasProperty(
			STATIC,
			"detail",
			"string"
		), ():void => {
			expect( SHACL.Predicate.detail ).toBeDefined();
			expect( SHACL.Predicate.detail ).toEqual( jasmine.any( String ) );

			expect( SHACL.Predicate.detail ).toBe( "http://www.w3.org/ns/shacl#detail" );
		} );

		it( hasProperty(
			STATIC,
			"focusNode",
			"string"
		), ():void => {
			expect( SHACL.Predicate.focusNode ).toBeDefined();
			expect( SHACL.Predicate.focusNode ).toEqual( jasmine.any( String ) );

			expect( SHACL.Predicate.focusNode ).toBe( "http://www.w3.org/ns/shacl#focusNode" );
		} );

		it( hasProperty(
			STATIC,
			"result",
			"string"
		), ():void => {
			expect( SHACL.Predicate.result ).toBeDefined();
			expect( SHACL.Predicate.result ).toEqual( jasmine.any( String ) );

			expect( SHACL.Predicate.result ).toBe( "http://www.w3.org/ns/shacl#result" );
		} );

		it( hasProperty(
			STATIC,
			"resultMessage",
			"string"
		), ():void => {
			expect( SHACL.Predicate.resultMessage ).toBeDefined();
			expect( SHACL.Predicate.resultMessage ).toEqual( jasmine.any( String ) );

			expect( SHACL.Predicate.resultMessage ).toBe( "http://www.w3.org/ns/shacl#resultMessage" );
		} );

		it( hasProperty(
			STATIC,
			"resultPath",
			"string"
		), ():void => {
			expect( SHACL.Predicate.resultPath ).toBeDefined();
			expect( SHACL.Predicate.resultPath ).toEqual( jasmine.any( String ) );

			expect( SHACL.Predicate.resultPath ).toBe( "http://www.w3.org/ns/shacl#resultPath" );
		} );

		it( hasProperty(
			STATIC,
			"resultSeverity",
			"string"
		), ():void => {
			expect( SHACL.Predicate.resultSeverity ).toBeDefined();
			expect( SHACL.Predicate.resultSeverity ).toEqual( jasmine.any( String ) );

			expect( SHACL.Predicate.resultSeverity ).toBe( "http://www.w3.org/ns/shacl#resultSeverity" );
		} );

		it( hasProperty(
			STATIC,
			"shapesGraphWellFormed",
			"string"
		), ():void => {
			expect( SHACL.Predicate.shapesGraphWellFormed ).toBeDefined();
			expect( SHACL.Predicate.shapesGraphWellFormed ).toEqual( jasmine.any( String ) );

			expect( SHACL.Predicate.shapesGraphWellFormed ).toBe( "http://www.w3.org/ns/shacl#shapesGraphWellFormed" );
		} );

		it( hasProperty(
			STATIC,
			"sourceConstraintComponent",
			"string"
		), ():void => {
			expect( SHACL.Predicate.sourceConstraintComponent ).toBeDefined();
			expect( SHACL.Predicate.sourceConstraintComponent ).toEqual( jasmine.any( String ) );

			expect( SHACL.Predicate.sourceConstraintComponent ).toBe( "http://www.w3.org/ns/shacl#sourceConstraintComponent" );
		} );

		it( hasProperty(
			STATIC,
			"sourceShape",
			"string"
		), ():void => {
			expect( SHACL.Predicate.sourceShape ).toBeDefined();
			expect( SHACL.Predicate.sourceShape ).toEqual( jasmine.any( String ) );

			expect( SHACL.Predicate.sourceShape ).toBe( "http://www.w3.org/ns/shacl#sourceShape" );
		} );

		it( hasProperty(
			STATIC,
			"value",
			"string"
		), ():void => {
			expect( SHACL.Predicate.value ).toBeDefined();
			expect( SHACL.Predicate.value ).toEqual( jasmine.any( String ) );

			expect( SHACL.Predicate.value ).toBe( "http://www.w3.org/ns/shacl#value" );
		} );

	} );

} );
