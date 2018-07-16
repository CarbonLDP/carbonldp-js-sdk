import { ObjectSchema } from "../ObjectSchema/ObjectSchema";

import { hasProperty, interfaze, module, OPTIONAL } from "../test/JasmineExtender";

import { ModelSchema } from "./ModelSchema";


describe( module( "carbonldp/Model" ), ():void => {

	describe( interfaze(
		"CarbonLDP.Model.ModelSchema",
		[ "TYPE extends string = string" ],
		"Interface that defined the TYPE and SCHEMA properties for a Persisted Model."
	), ():void => {

		it( hasProperty(
			OPTIONAL,
			"TYPE",
			"TYPE",
			"The type the document interface is related to."
		), ():void => {
			const target:ModelSchema<"SOME">[ "TYPE" ] = "SOME";
			expect( target ).toBeDefined();
		} );

		it( hasProperty(
			OPTIONAL,
			"SCHEMA",
			"CarbonLDP.ObjectSchema",
			"The schema the document interface is related to."
		), ():void => {
			const target:ModelSchema[ "SCHEMA" ] = {} as ObjectSchema;
			expect( target ).toBeDefined();
		} );

	} );

} );
