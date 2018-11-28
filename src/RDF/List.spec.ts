import { RDFList } from "./List";


describe( "RDFList", () => {

	it( "should exist", () => {
		expect( RDFList ).toBeDefined();
		expect( RDFList ).toEqual( jasmine.any( Object ) );
	} );


	describe( "[[factory]]", () => {

		it( "should exist", () => {
			expect( RDFList.is ).toBeDefined();
			expect( RDFList.is ).toEqual( jasmine.any( Function ) );
		} );


		it( "should return false when undefined", () => {
			expect( RDFList.is( undefined ) ).toBe( false );
		} );

		it( "should return false when empty object", () => {
			const object:object = {};
			expect( RDFList.is( object ) ).toBe( false );
		} );

		it( "should return true when have properties", () => {
			const object:object = { "@list": null };
			expect( RDFList.is( object ) ).toBe( true );
		} );

	} );

} );
