import { QueryPropertyType } from "./QueryPropertyType";


describe( "QueryPropertyType", () => {

	it( "should exist", () => {
		expect( QueryPropertyType ).toBeDefined();
		expect( QueryPropertyType ).toEqual( jasmine.any( Object ) );
	} );


	it( "QueryPropertyType.FULL", () => {
		expect( QueryPropertyType.FULL ).toBeDefined();
	} );

	it( "QueryPropertyType.PARTIAL", () => {
		expect( QueryPropertyType.PARTIAL ).toBeDefined();
	} );

	it( "QueryPropertyType.ALL", () => {
		expect( QueryPropertyType.ALL ).toBeDefined();
	} );

	it( "QueryPropertyType.EMPTY", () => {
		expect( QueryPropertyType.EMPTY ).toBeDefined();
	} );

} );
