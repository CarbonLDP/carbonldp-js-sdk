import { hasMethod, interfaze, module, OBLIGATORY } from "../test/JasmineExtender";

import { ModelDecorator } from "./ModelDecorator";


describe( module( "carbonldp/Model" ), ():void => {

	describe( interfaze(
		"CarbonLDP.Model.ModelDecorator",
		[ "MODEL extends object", "BASE extends object = object" ],
		"Interface with the standard methods of a model decoration."
	), ():void => {

		it( hasMethod(
			OBLIGATORY,
			"isDecorated",
			[
				{ name: "object", type: "object" },
			],
			{ type: "object is MODEL" }
		), ():void => {
			const target:ModelDecorator<any>[ "isDecorated" ] = ( object ):object is any => ! ! object;
			expect( target ).toBeDefined();
		} );

		it( hasMethod(
			OBLIGATORY,
			"decorate",
			[ "W extends BASE" ],
			[
				{ name: "object", type: "W" },
			],
			{ type: "W & MODEL" }
		), ():void => {
			const target:ModelDecorator<any>[ "decorate" ] = ( object ) => object;
			expect( target ).toBeDefined();
		} );

	} );

} );
