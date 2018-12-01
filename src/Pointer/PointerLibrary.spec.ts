import { _getPointer } from "./PointerLibrary";


describe( "_getPointer", () => {

	it( "should exist", () => {
		expect( _getPointer ).toBeDefined();
		expect( _getPointer ).toEqual( jasmine.any( Function ) );
	} );

} );

