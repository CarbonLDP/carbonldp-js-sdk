import { BasePointer } from "../Pointer/BasePointer";

import { extendsClass, hasProperty, interfaze, module, OBLIGATORY } from "../test/JasmineExtender";

import { BaseResource } from "./BaseResource";


describe( module( "carbonldp/Resource" ), ():void => {

	describe( interfaze(
		"CarbonLDP.BaseResource",
		"Interface with the base properties for a `CarbonLDP.Resource`."
	), ():void => {

		it( extendsClass( "CarbonLDP.BasePointer" ), ():void => {
			const target:BasePointer = {} as BaseResource;
			expect( target ).toBeDefined();
		} );

		it( hasProperty(
			OBLIGATORY,
			"types",
			"string[]",
			"Array of `types` the resource has."
		), ():void => {
			const target:BaseResource[ "types" ] = [ "" ];
			expect( target ).toBeDefined();
		} );

	} );

} );
