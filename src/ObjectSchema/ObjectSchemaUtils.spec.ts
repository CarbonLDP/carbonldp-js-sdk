import { ObjectSchemaUtils } from "./ObjectSchemaUtils";


describe( "ObjectSchemaUtils", ():void => {

	it( "should exists", ():void => {
		expect( ObjectSchemaUtils ).toBeDefined();
		expect( ObjectSchemaUtils ).toEqual( jasmine.any( Function ) );
	} );


	// TODO: Test .resolveProperty

} );
