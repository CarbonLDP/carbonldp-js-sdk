import {
	hasMethod,
	interfaze,
	module,
	OBLIGATORY
} from "../test/JasmineExtender";
import { ModelFactory } from "./ModelFactory";


describe( module( "carbonldp/Model" ), ():void => {

	describe( interfaze(
		"CarbonLDP.Model.ModelFactory",
		[ "M extends object", "B extends object = object" ],
		"Interface with the standard methods for a model creation."
	), ():void => {

		it( hasMethod(
			OBLIGATORY,
			"create",
			[ "W extends object" ],
			[
				{ name: "data", type: "W & B" },
			],
			{ type: "W & M" }
		), ():void => {
			const target:ModelFactory<any>[ "create" ] = () => {};
			expect( target ).toBeDefined();
		} );

		it( hasMethod(
			OBLIGATORY,
			"createFrom",
			[ "W extends object" ],
			[
				{ name: "object", type: "W & B" },
			],
			{ type: "W & M" }
		), ():void => {
			const target:ModelFactory<any>[ "createFrom" ] = ( object ) => object;
			expect( target ).toBeDefined();
		} );

	} );

} );
