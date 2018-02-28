import { hasDefaultExport, hasProperty, interfaze, module, OBLIGATORY } from "../../test/JasmineExtender";

import DefaultExport, { QuerySchema } from "./QuerySchema";

describe( module( "Carbon/SPARQL/QueryDocument/QuerySchema" ), ():void => {

	it( hasDefaultExport( "Carbon.SPARQL.QueryDocument.QuerySchema.QuerySchema" ), ():void => {
		const target:DefaultExport = {} as QuerySchema;
		expect( target ).toBeDefined();
	} );

	describe( interfaze( "Carbon.SPARQL.QueryDocument.QuerySchema.QuerySchema", "Interface that describes an object that contains the data to to use in a partial query creation." ), ():void => {

		it( "should exists", ():void => {
			const target:QuerySchema = {} as any;
			expect( target ).toBeDefined();
		} );

		it( hasProperty(
			OBLIGATORY,
			"[ propertyName:string ]",
			"Carbon.SPARQL.QueryDocument.QuerySchemaProperty.QuerySchemaProperty | string",
			"An entry that describes a property to retrieve with the name specified and the assigned property schema.\n" +
			"If a string is provided this will be interpreted as the URI of the property."
		), ():void => {} );

	} );

} );
