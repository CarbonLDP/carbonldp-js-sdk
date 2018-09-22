import { hasSignature, interfaze, method, module, OBLIGATORY } from "../test/JasmineExtender";

import { Pointer } from "./Pointer";
import { $PointerValidator, PointerValidator } from "./PointerValidator";


describe( module( "carbonldp/Pointer" ), ():void => {

	describe( interfaze(
		"CarbonLDP.PointerValidator",
		"Interface that represents resources that can validate pointers."
	), ():void => {

		describe( method(
			OBLIGATORY,
			"inScope"
		), ():void => {

			it( hasSignature(
				"Returns true if the pointer provided is in the scope of the object that implements this interface.", [
					{ name: "pointer", type: "CarbonLDP.Pointer" },
				],
				{ type: "boolean" }
			), ():void => {
				const target:PointerValidator[ "inScope" ] = ( pointer:Pointer ) => ! ! pointer;
				expect( target ).toBeDefined();
			} );

			it( hasSignature(
				"Returns true if the URI provided is in the scope of the object that implements this interface.", [
					{ name: "id", type: "string" },
				],
				{ type: "boolean" }
			), ():void => {
				const target:PointerValidator[ "inScope" ] = ( id:string ) => ! ! id;
				expect( target ).toBeDefined();
			} );

		} );

	} );

	describe( interfaze(
		"CarbonLDP.$PointerValidator",
		"Interface that represents resources that can validate pointers."
	), ():void => {

		describe( method(
			OBLIGATORY,
			"$inScope"
		), ():void => {

			it( hasSignature(
				"Returns true if the pointer provided is in the scope of the object that implements this interface.", [
					{ name: "pointer", type: "CarbonLDP.Pointer" },
				],
				{ type: "boolean" }
			), ():void => {
				const target:$PointerValidator[ "$inScope" ] = ( pointer:Pointer ) => ! ! pointer;
				expect( target ).toBeDefined();
			} );

			it( hasSignature(
				"Returns true if the URI provided is in the scope of the object that implements this interface.", [
					{ name: "id", type: "string" },
				],
				{ type: "boolean" }
			), ():void => {
				const target:$PointerValidator[ "$inScope" ] = ( id:string ) => ! ! id;
				expect( target ).toBeDefined();
			} );

		} );

	} );

} );

