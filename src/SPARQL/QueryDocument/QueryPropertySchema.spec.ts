import {
	hasDefaultExport,
	hasProperty,
	interfaze,
	module,
	OPTIONAL
} from "../../test/JasmineExtender";
import { QueryDocumentBuilder } from "./QueryDocumentBuilder";

import * as QueryPropertySchema from "./QueryPropertySchema";

describe( module( "Carbon/SPARQL/QueryDocument/QueryPropertySchema" ), ():void => {

	it( "should exists", ():void => {
		expect( QueryPropertySchema ).toBeDefined();
		expect( QueryPropertySchema ).toEqual( jasmine.any( Object ) );
	} );

	it( hasDefaultExport( "Carbon.SPARQL.QueryDocument.QueryPropertySchema.Class" ), ():void => {
		const target:QueryPropertySchema.default = {} as QueryPropertySchema.Class;
		expect( target ).toBeDefined();
	} );

	describe( interfaze( "Carbon.SPARQL.QueryDocument.QueryPropertySchema.Class", "Interface that describes an property to retrieve in a partial query creation." ), ():void => {

		it( "should exists", ():void => {
			const target:QueryPropertySchema.Class = {} as any;
			expect( target ).toBeDefined();
		} );

		it( hasProperty(
			OPTIONAL,
			"@id",
			"string",
			"The URI that the actual property has in the platform."
		), ():void => {
			const target:QueryPropertySchema.Class[ "@id" ] = "string";
			expect( target ).toBeDefined();
		} );

		it( hasProperty(
			OPTIONAL,
			"@type",
			"@id | string",
			"The type of property.\n" +
			"If `@id` is used, it will represent a Pointer.\n" +
			"For an literal it will generally expect the absolute XSD type URI, but a relative one can also be assigned. e.g. `string` will be interpreted as `http://www.w3.org/2001/XMLSchema#string`."
		), ():void => {
			const target:QueryPropertySchema.Class[ "@type" ] = "@id" || "string" as string;
			expect( target ).toBeDefined();
		} );

		it( hasProperty(
			OPTIONAL,
			"@language",
			"string",
			"The only specific language of a string primitive to be retrieved."
		), ():void => {
			const target:QueryPropertySchema.Class[ "@language" ] = "string" as string;
			expect( target ).toBeDefined();
		} );

		it( hasProperty(
			OPTIONAL,
			"@container",
			"@set | @list | @language",
			"The container type the property will be interpreted to have.\n" +
			"- `@set`: An unordered array of elements" +
			"- `@list`: An ordered array of elements." +
			"- `@language`: An object map with the language as key and the string content as the value."
		), ():void => {
			const target:QueryPropertySchema.Class[ "@container" ] = "@set" || "@list" || "@language";
			expect( target ).toBeDefined();
		} );

		it( hasProperty(
			OPTIONAL,
			"query",
			"( queryBuilder:Carbon.SPARQL.QueryDocument.QueryDocumentBuilder.QueryDocumentBuilder ) => Carbon.SPARQL.QueryDocument.QueryDocumentBuilder.QueryDocumentBuilder",
			"Function to build a query to specify sub-properties or when retrieving multiple resources to filter the resources."
		), ():void => {
			const target:QueryPropertySchema.Class[ "query" ] = ( queryBuilder:QueryDocumentBuilder ) => queryBuilder;
			expect( target ).toBeDefined();
		} );

	} );

} );
