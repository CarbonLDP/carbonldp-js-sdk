import { Path, PathBuilder } from "sparqler/patterns";

import { hasProperty, interfaze, module, OPTIONAL } from "../test/JasmineExtender";

import { SubQueryDocumentsBuilder } from "./QueryDocumentBuilder";
import { QuerySchemaProperty } from "./QuerySchemaProperty";


describe( module( "carbonldp/QueryDocuments/QuerySchemaProperty" ), ():void => {

	describe( interfaze( "CarbonLDP.QueryDocuments.QuerySchemaProperty", "Interface that describes an property to retrieve in a partial query creation." ), ():void => {

		it( "should exists", ():void => {
			const target:QuerySchemaProperty = {} as any;
			expect( target ).toBeDefined();
		} );

		it( hasProperty(
			OPTIONAL,
			"@id",
			"string",
			"The URI that the actual property has in the platform."
		), ():void => {
			const target:QuerySchemaProperty[ "@id" ] = "string";
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
			const target:QuerySchemaProperty[ "@type" ] = "@id" || "string" as string;
			expect( target ).toBeDefined();
		} );

		it( hasProperty(
			OPTIONAL,
			"@language",
			"string",
			"The only specific language of a string primitive to be retrieved."
		), ():void => {
			const target:QuerySchemaProperty[ "@language" ] = "string" as string;
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
			const target:QuerySchemaProperty[ "@container" ] = "@set" || "@list" || "@language";
			expect( target ).toBeDefined();
		} );

		it( hasProperty(
			OPTIONAL,
			"query",
			"( queryBuilder:CarbonLDP.QueryDocuments.SubQueryBuilder ) => CarbonLDP.QueryDocuments.SubQueryBuilder",
			"Function to build a query to specify sub-properties or when retrieving multiple resources to filter the resources."
		), ():void => {
			const target:QuerySchemaProperty[ "query" ] = ( queryBuilder:SubQueryDocumentsBuilder ) => queryBuilder;
			expect( target ).toBeDefined();
		} );

		it( hasProperty(
			OPTIONAL,
			"path",
			"( path:sparqler/patterns/PathBuilder ) => sparqler/patterns/Path",
			"Function to build a path to specify an property that may point to data from another document."
		), ():void => {
			const target:QuerySchemaProperty[ "path" ] = ( pathBuilder:PathBuilder ) => pathBuilder.subPath() as Path;
			expect( target ).toBeDefined();
		} );

	} );

} );
