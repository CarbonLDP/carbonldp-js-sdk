import { ContainerType } from "./ContainerType";


describe( "ContainerType", ():void => {

	it( "should exist", ():void => {
		expect( ContainerType ).toBeDefined();
		expect( ContainerType ).toEqual( jasmine.any( Object ) );
	} );


	it( "ContainerType.SET", ():void => {
		expect( ContainerType.SET ).toBeDefined();
	} );

	it( "ContainerType.LIST", ():void => {
		expect( ContainerType.LIST ).toBeDefined();
	} );

	it( "ContainerType.LANGUAGE", ():void => {
		expect( ContainerType.LANGUAGE ).toBeDefined();
	} );

} );
