import {
	hasProperty,
	interfaze,
	module,
	OBLIGATORY
} from "../test/JasmineExtender";

import { QuerySchema } from "./QuerySchema";

describe( module( "carbonldp/QueryDocuments/QuerySchema" ), ():void => {

	describe( interfaze( "CarbonLDP.QueryDocuments.QuerySchema", "Interface that describes an object that contains the data to to use in a partial query creation." ), ():void => {

		it( "should exists", ():void => {
			const target:QuerySchema = {} as any;
			expect( target ).toBeDefined();
		} );

		it( hasProperty(
			OBLIGATORY,
			"[ propertyName:string ]",
			"CarbonLDP.QueryDocuments.QuerySchemaProperty | string",
			"An entry that describes a property to retrieve with the name specified and the assigned property schema.\n" +
			"If a string is provided this will be interpreted as the URI of the property."
		), ():void => {} );

	} );

} );
