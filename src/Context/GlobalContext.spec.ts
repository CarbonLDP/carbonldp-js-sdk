import { AbstractContext } from "./AbstractContext";
import { GlobalContext } from "./GlobalContext";


describe( "GlobalContext", () => {

	it( "should exist", () => {
		expect( GlobalContext ).toBeDefined();
		expect( GlobalContext ).toEqual( jasmine.any( Function ) );
	} );


	describe( "GlobalContext.instance", () => {

		it( "should exist", () => {
			expect( GlobalContext.instance ).toBeDefined();
			expect( GlobalContext.instance ).toEqual( jasmine.any( GlobalContext ) );
		} );

		it( "should extend from AbstractContext", ():void => {
			expect( GlobalContext.instance ).toEqual( jasmine.any( AbstractContext ) );
		} );


		it( "should have baseURI as an empty string", () => {
			expect( GlobalContext.instance.baseURI ).toBe( "" );
		} );

		it( "should have parentContext as undefined", () => {
			expect( GlobalContext.instance.parentContext ).toBeUndefined();
		} );

		it( "should has default decorators", () => {
			expect( GlobalContext.instance.registry.__modelDecorators ).toEqual( new Map( [] ) );
		} );

	} );

} );
