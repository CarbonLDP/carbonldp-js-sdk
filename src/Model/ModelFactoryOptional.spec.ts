import { extendsClass, hasMethod, interfaze, module, OBLIGATORY } from "../test/JasmineExtender";

import { ModelFactoryOptional } from "./ModelFactoryOptional";


describe( module( "carbonldp/Model" ), ():void => {

	describe( interfaze(
		"CarbonLDP.Model.ModelFactoryOptional",
		[ "MODEL extends object", "BASE extends object = object" ],
		"Interface with the methods for a model creation with an optional base data."
	), ():void => {

		it( extendsClass( "CarbonLDP.Model.ModelFactory<MODEL, BASE>" ), () => {} );

		it( hasMethod(
			OBLIGATORY,
			"create",
			[ "W extends object" ],
			[
				{ name: "data", type: "W & BASE", optional: true },
			],
			{ type: "W & MODEL" }
		), ():void => {
			const target:ModelFactoryOptional<any>[ "create" ] = () => {};
			expect( target ).toBeDefined();
		} );

	} );

} );
