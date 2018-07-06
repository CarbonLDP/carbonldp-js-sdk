import {
	hasMethod,
	interfaze,
	module,
	OBLIGATORY
} from "../test/JasmineExtender";
import { ModelFactory } from "./ModelFactory";

describe( module( "carbonldp/ModelTypeGuard" ), () => {

	describe( interfaze(
		"CarbonLDP.ModelTypeGuard",
		[ "M extends object" ],
		"Interface that contains the method to assert a value as an specific model."
	), () => {


		it( hasMethod(
			OBLIGATORY,
			"is",
			[
				{ name: "value", type: "value" },
			],
			{ type: "value is T" }
		), ():void => {
			const target:ModelFactory<any>[ "is" ] = ( object ):object is any => false;
			expect( target ).toBeDefined();
		} );

	} );

} );
