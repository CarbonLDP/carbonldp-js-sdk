import { hasProperty, interfaze, module, OBLIGATORY } from "../test/JasmineExtender";

import { QuerySchema2 } from "./QuerySchema2";


describe( module( "carbonldp/QueryDocuments/QuerySchema2" ), ():void => {

	describe( interfaze( "CarbonLDP.QueryDocuments.QuerySchema2", "Interface that describes an object that contains the data to to use in a partial query creation." ), ():void => {

		it( "should exists", ():void => {
			const target:QuerySchema2 = {} as any;
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
