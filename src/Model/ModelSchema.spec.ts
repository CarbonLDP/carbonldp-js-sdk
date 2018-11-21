import { ObjectSchema } from "../ObjectSchema/ObjectSchema";

import { hasProperty, interfaze, module, OPTIONAL } from "../test/JasmineExtender";

import { ModelSchema } from "./ModelSchema";


describe( "ModelSchema", ():void => {

	it( "should exists", () => {
		expect( ModelSchema ).toBeDefined();
		expect( ModelSchema ).toEqual( jasmine.any( Object ) );
	} );


	describe( "[[factory]]", ():void => {

		// TODO: Test .is

	} );

} );
