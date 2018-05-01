import {
	hasMethod,
	hasProperty,
	interfaze,
	module,
	OBLIGATORY,
	property,
	STATIC
} from "../../test/JasmineExtender";


describe( module( "carbonldp/LDP/DirectContainer" ), ():void => {

	describe( interfaze(
		"CarbonLDP.LDP.DirectContainer",
		"Interface of a persisted direct container."
	), ():void => {} );

	describe( interfaze(
		"CarbonLDP.LDP.DirectContainerFactory",
		"Interface with the factory, utils for `CarbonLDP.LDP.DirectContainer` objects."
	), ():void => {

		it( hasProperty(
			OBLIGATORY,
			"TYPE",
			"CarbonLDP.Vocabularies.C.DirectContainer"
		), ():void => {} );

		it( hasMethod(
			OBLIGATORY,
			"is",
			"Returns true if the object provided is considered a `CarbonLDP.LDP.DirectContainer` object.", [
				{ name: "value", type: "any" },
			],
			{ type: "value is CarbonLDP.LDP.DirectContainer" }
		), ():void => {} );

		it( hasMethod(
			OBLIGATORY,
			"create",
			[ "T extends object" ],
			"Creates a `CarbonLDP.LDP.TransientDirectContainer` object with the parameters specified.", [
				{ name: "data", type: "T & carbonLDP.LDP.BaseDirectContainer", description: "Data for creating a direct container." },
			],
			{ type: "T & CarbonLDP.LDP.TransientDirectContainer" }
		), ():void => {} );

		it( hasMethod(
			OBLIGATORY,
			"createFrom",
			[ "T extends object" ],
			"Creates a `CarbonLDP.LDP.TransientDirectContainer` object with the object provided and the parameters specified.", [
				{ name: "object", type: "T & CarbonLDP.LDP.BaseDirectContainer", description: "Object to be converted into a direct container." },
			],
			{ type: "T & CarbonLDP.LDP.TransientDirectContainer" }
		), ():void => {} );

	} );

	describe( property(
		STATIC,
		"DirectContainer",
		"CarbonLDP.LDP.DirectContainerFactory"
	), ():void => {

		// TODO: Test `TYPE`
		// TODO: Test `is`
		// TODO: Test `create`
		// TODO: Test `createFrom`

	} );

} );
