import {
	hasMethod,
	interfaze,
	module,
	OBLIGATORY
} from "../test/JasmineExtender";
import { ModelTypeGuard } from "./ModelTypeGuard";


describe( module( "carbonldp/Model" ), () => {

	describe( interfaze(
		"CarbonLDP.Model.ModelTypeGuard",
		[ "MODEL extends object" ],
		"Interface that contains the method to assert a value as an specific model."
	), () => {


		it( hasMethod(
			OBLIGATORY,
			"is",
			[
				{ name: "value", type: "value" },
			],
			{ type: "value is MODEL" }
		), ():void => {
			const target:ModelTypeGuard<any>[ "is" ] = ( object ):object is any => ! ! object;
			expect( target ).toBeDefined();
		} );

	} );

} );
