import { ObjectSchema } from "../ObjectSchema";
import {
	hasProperty,
	interfaze,
	module,
	OPTIONAL
} from "../test/JasmineExtender";

import { ModelSchema } from "./ModelSchema";

describe( module( "carbonldp/ModelSchema" ), ():void => {

	describe( interfaze(
		"CarbonLDP.ModelSchema",
		"Interface that defined the TYPE and SCHEMA properties for a Persisted Model."
	), ():void => {

		it( hasProperty( OPTIONAL, "TYPE", "string", "The type the document interface is related to." ), ():void => {
			const target:ModelSchema[ "TYPE" ] = "";
			expect( target ).toBeDefined();
		} );

		it( hasProperty( OPTIONAL, "SCHEMA", "CarbonLDP.ObjectSchema", "The schema the document interface is related to." ), ():void => {
			const target:ModelSchema[ "SCHEMA" ] = {} as ObjectSchema;
			expect( target ).toBeDefined();
		} );

	} );

} );
