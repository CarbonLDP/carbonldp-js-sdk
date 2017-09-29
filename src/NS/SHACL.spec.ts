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
			expect( Object.keys( SHACL.Class ).length ).toBe( 1 );
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

	} );

	describe( clazz(
		"Carbon.NS.SHACL.Predicate",
		"Class that contains the predicated defied by the Shapes Constraint Language (SHACL) specification."
	), ():void => {

		it( "should exists", ():void => {
			expect( SHACL.Predicate ).toBeDefined();
			expect( SHACL.Predicate ).toEqual( jasmine.any( Function ) );
			expect( Object.keys( SHACL.Predicate ).length ).toBe( 3 );
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
			"result",
			"string"
		), ():void => {
			expect( SHACL.Predicate.result ).toBeDefined();
			expect( SHACL.Predicate.result ).toEqual( jasmine.any( String ) );

			expect( SHACL.Predicate.result ).toBe( "http://www.w3.org/ns/shacl#result" );
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

	} );

} );
