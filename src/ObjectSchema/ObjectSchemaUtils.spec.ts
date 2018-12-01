import { ObjectSchemaUtils } from "./ObjectSchemaUtils";


describe( "ObjectSchemaUtils", ():void => {

	it( "should exist", ():void => {
		expect( ObjectSchemaUtils ).toBeDefined();
		expect( ObjectSchemaUtils ).toEqual( jasmine.any( Function ) );
	} );


	// TODO: Test .resolveProperty

} );
