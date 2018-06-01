import {
	hasProperty,
	interfaze,
	module,
	OBLIGATORY
} from "../test/JasmineExtender";

import { BasePointer } from "./BasePointer";


describe( module( "carbonldp/Pointer" ), ():void => {

	describe( interfaze(
		"CarbonLDP.BasePointer",
		"Interface with the base properties for a `CarbonLDP.Pointer`."
	), ():void => {

		it( hasProperty(
			OBLIGATORY,
			"id",
			"string",
			"The `id` of the pointer."
		), ():void => {
			const target:BasePointer[ "id" ] = "";
			expect( target ).toBeDefined();
		} );

	} );

} );
