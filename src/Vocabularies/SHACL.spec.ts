import { SHACL } from "./SHACL";


describe( "SHACL", ():void => {

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
