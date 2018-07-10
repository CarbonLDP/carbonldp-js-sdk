import {
	hasProperty,
	interfaze,
	module,
	OPTIONAL
} from "../test/JasmineExtender";
import { BasePointer } from "./BasePointer";


describe( module( "carbonldp/Pointer" ), ():void => {

	describe( interfaze(
		"CarbonLDP.BasePointer",
		"Interface with the base properties for a `CarbonLDP.Pointer`."
	), ():void => {

		it( hasProperty(
			OPTIONAL,
			"$id",
			"string",
			"The URI that identifies the pointer."
		), ():void => {
			const target:BasePointer[ "$id" ] = "";
			expect( target ).toBeDefined();
		} );

	} );

} );
