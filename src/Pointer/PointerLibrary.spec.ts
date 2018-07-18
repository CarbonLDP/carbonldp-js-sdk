import { hasMethod, interfaze, module, OBLIGATORY } from "../test/JasmineExtender";

import { Pointer } from "./Pointer";
import { PointerLibrary } from "./PointerLibrary";


describe( module( "carbonldp/Pointer" ), ():void => {

	describe( interfaze(
		"CarbonLDP.PointerLibrary",
		"Interface that represents resources that can manage pointers."
	), ():void => {

		it( hasMethod(
			OBLIGATORY,
			"hasPointer",
			"Returns true if the object that implements this interface has a pointer referenced by the URI provided.", [
				{ name: "id", type: "string" },
			],
			{ type: "boolean" }
		), ():void => {
			const target:PointerLibrary[ "hasPointer" ] = ( id:string ) => true as boolean;
			expect( target ).toBeDefined();
		} );

		it( hasMethod(
			OBLIGATORY,
			"getPointer",
			"Returns the pointer referenced by the URI provided. If none exists, an empty pointer should be created.", [
				{ name: "id", type: "string" },
			],
			{ type: "boolean" }
		), ():void => {
			const target:PointerLibrary[ "getPointer" ] = ( id:string ) => null as Pointer;
			expect( target ).toBeDefined();
		} );

	} );

} );

