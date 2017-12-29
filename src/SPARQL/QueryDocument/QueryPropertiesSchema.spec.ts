import { hasDefaultExport, hasProperty, interfaze, module, OBLIGATORY } from "../../test/JasmineExtender";

import * as QueryPropertiesSchema from "./QueryPropertiesSchema";

describe( module( "Carbon/SPARQL/QueryDocument/QueryPropertiesSchema" ), ():void => {

	it( "should exists", ():void => {
		expect( QueryPropertiesSchema ).toBeDefined();
		expect( QueryPropertiesSchema ).toEqual( jasmine.any( Object ) );
	} );

	it( hasDefaultExport( "Carbon.SPARQL.QueryDocument.QueryPropertiesSchema.Class" ), ():void => {
		const target:QueryPropertiesSchema.default = {} as QueryPropertiesSchema.Class;
		expect( target ).toBeDefined();
	} );

	describe( interfaze( "Carbon.SPARQL.QueryDocument.QueryPropertiesSchema.Class", "Interface that describes an object that contains the data to to use in a partial query creation." ), ():void => {

		it( "should exists", ():void => {
			const target:QueryPropertiesSchema.Class = {} as any;
			expect( target ).toBeDefined();
		} );

		it( hasProperty(
			OBLIGATORY,
			"[ propertyName:string ]",
			"Carbon.SPARQL.QueryDocument.QueryPropertySchema.Class | string",
			"An entry that describes a property to retrieve with the name specified and the assigned property schema.\n" +
			"If a string is provided this will be interpreted as the URI of the property."
		), ():void => {} );

	} );

} );
