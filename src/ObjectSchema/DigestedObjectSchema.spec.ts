import { clazz, hasProperty, hasSignature, INSTANCE, method, module } from "../test/JasmineExtender";

import { DigestedObjectSchema } from "./DigestedObjectSchema";
import { DigestedObjectSchemaProperty } from "./DigestedObjectSchemaProperty";


function createMock( values?:Partial<DigestedObjectSchema> ):DigestedObjectSchema {
	const schema:DigestedObjectSchema = new DigestedObjectSchema();
	return Object.assign( schema, values );
}

function createMockProperty( values:Partial<DigestedObjectSchemaProperty> ):DigestedObjectSchemaProperty {
	const property:DigestedObjectSchemaProperty = new DigestedObjectSchemaProperty();
	return Object.assign( property, values );
}

describe( module( "carbonldp/ObjectSchema" ), ():void => {

	describe( clazz(
		"CarbonLDP.DigestedObjectSchema",
		"Class of a standardized Schema that is used for the SDK for compact and expand JSON-LD objects and Carbon Resources."
	), ():void => {

		it( "should exists", ():void => {
			expect( DigestedObjectSchema ).toBeDefined();
			expect( DigestedObjectSchema ).toEqual( jasmine.any( Function ) );
		} );

		it( "should be instantiable", ():void => {
			const digestedSchema:DigestedObjectSchema = new DigestedObjectSchema();

			expect( digestedSchema ).toBeDefined();
			expect( digestedSchema ).toEqual( jasmine.any( DigestedObjectSchema ) );
		} );

		it( hasProperty(
			INSTANCE,
			"base",
			"string",
			"The base URI of the schema."
		), ():void => {
			const digestedSchema:DigestedObjectSchema = createMock();

			expect( digestedSchema.base ).toEqual( jasmine.any( String ) );
			expect( digestedSchema.base ).toBe( "" );
		} );

		it( hasProperty(
			INSTANCE,
			"language",
			"string",
			"The default language of the string properties."
		), ():void => {
			const digestedSchema:DigestedObjectSchema = createMock();

			expect( digestedSchema.language ).toBeNull();
		} );

		it( hasProperty(
			INSTANCE,
			"vocab",
			"string",
			"URI that will be used to resolve properties URIs that aren't defined in the schema."
		), ():void => {
			const digestedSchema:DigestedObjectSchema = createMock();

			expect( digestedSchema.vocab ).toBeUndefined();
		} );

		it( hasProperty(
			INSTANCE,
			"prefixes",
			"Map<string, string>",
			"Map that contains the prefixes of absolutes URIs."
		), ():void => {
			const digestedSchema:DigestedObjectSchema = createMock();

			expect( digestedSchema.prefixes ).toEqual( jasmine.any( Map ) );
			expect( digestedSchema.prefixes.size ).toBe( 0 );
		} );

		it( hasProperty(
			INSTANCE,
			"properties",
			"Map<string, CarbonLDP.DigestedObjectSchemaProperty>",
			"Map that contains the definitions of the properties in the schema."
		), ():void => {
			const digestedSchema:DigestedObjectSchema = createMock();

			expect( digestedSchema.properties ).toEqual( jasmine.any( Map ) );
			expect( digestedSchema.properties.size ).toBe( 0 );
		} );


		describe( method( INSTANCE, "resolveURI" ), ():void => {

			it( hasSignature(
				"Tries to resolve a non absolute URI using the schema and the configuration provided.", [
					{ name: "uri", type: "string", description: "The URI to ve resolved." },
					{ name: "schema", type: "CarbonLDP.DigestedObjectSchema", description: "The schema where to find the prefixes or the default vocabulary to utilize." },
					{ name: "relativeTo", type: "{ vocab?:boolean, base?:boolean }", optional: true, description: "An additional configuration object to specify the resolution mode of a relative URI, where the vocab takes priority before the base." },
				],
				{ type: "string", description: "The resolved absolute URI." } ), ():void => {
			} );

			it( "should exists", ():void => {
				const digestedSchema:DigestedObjectSchema = createMock();

				expect( digestedSchema.resolveURI ).toBeDefined();
				expect( digestedSchema.resolveURI ).toEqual( jasmine.any( Function ) );
			} );


			it( "should not alter absolute uris", ():void => {
				const schema:DigestedObjectSchema = createMock( {
					vocab: "https://example.com/ns#",
					prefixes: new Map( [
						[ "prefix", "https://example.com/prefix#" ],
					] ),
				} );

				expect( schema.resolveURI( "https://example.com/" ) ).toBe( "https://example.com/" );
				expect( schema.resolveURI( "http://example.com/resource/" ) ).toBe( "http://example.com/resource/" );
			} );

			it( "should not alter blank node labels", ():void => {
				const schema:DigestedObjectSchema = createMock( {
					vocab: "https://example.com/ns#",
					prefixes: new Map( [
						[ "_", "https://example.com/prefix#" ],
					] ),
				} );

				expect( schema.resolveURI( "_:blank-node" ) ).toBe( "_:blank-node" );
				expect( schema.resolveURI( "_:1" ) ).toBe( "_:1" );
			} );

			it( "should resolve relative with vocab schema", ():void => {
				const schema:DigestedObjectSchema = createMock( {
					vocab: "https://example.com/ns#",
				} );

				expect( schema.resolveURI( "relative-uri", { vocab: true } ) ).toBe( "https://example.com/ns#relative-uri" );
				expect( schema.resolveURI( "another", { vocab: true } ) ).toBe( "https://example.com/ns#another" );
			} );

			it( "should resolve relative with base schema", ():void => {
				const schema:DigestedObjectSchema = createMock( {
					base: "https://example.com/ns#",
				} );

				expect( schema.resolveURI( "relative-uri", { base: true } ) ).toBe( "https://example.com/relative-uri" );
				expect( schema.resolveURI( "another", { base: true } ) ).toBe( "https://example.com/another" );
			} );

			it( "should resolve relative with vocab schema before base", ():void => {
				const schema:DigestedObjectSchema = createMock( {
					vocab: "https://example.com/ns#",
					base: "https://example.com/ns#",
				} );

				expect( schema.resolveURI( "relative-uri", { vocab: true, base: true } ) ).toBe( "https://example.com/ns#relative-uri" );
				expect( schema.resolveURI( "another", { vocab: true, base: true } ) ).toBe( "https://example.com/ns#another" );
			} );

			it( "should resolve relative with base schema when no vocab", ():void => {
				const schema:DigestedObjectSchema = createMock( {
					base: "https://example.com/ns#",
				} );

				expect( schema.resolveURI( "relative-uri", { vocab: true, base: true } ) ).toBe( "https://example.com/relative-uri" );
				expect( schema.resolveURI( "another", { vocab: true, base: true } ) ).toBe( "https://example.com/another" );
			} );

			it( "should resolve prefixed name from prefixes", ():void => {
				const schema:DigestedObjectSchema = createMock( {
					prefixes: new Map( [
						[ "prefix1", "https://example.com/prefix-1#" ],
						[ "prefix2", "https://example.com/prefix-2/" ],
					] ),
				} );

				expect( schema.resolveURI( "prefix1:slug" ) ).toBe( "https://example.com/prefix-1#slug" );
				expect( schema.resolveURI( "prefix2:resource/" ) ).toBe( "https://example.com/prefix-2/resource/" );
			} );

			it( "should resolve prefixed name from properties' @id", ():void => {
				const schema:DigestedObjectSchema = createMock( {
					properties: new Map( [
						[ "prefix1", createMockProperty( { uri: "https://example.com/prefix-1#" } ) ],
						[ "prefix2", createMockProperty( { uri: "https://example.com/prefix-2/" } ) ],
					] ),
				} );

				expect( schema.resolveURI( "prefix1:slug" ) ).toBe( "https://example.com/prefix-1#slug" );
				expect( schema.resolveURI( "prefix2:resource/" ) ).toBe( "https://example.com/prefix-2/resource/" );
			} );

			it( "should resolve recursive prefixed name", ():void => {
				const schema:DigestedObjectSchema = createMock( {
					prefixes: new Map( [
						[ "prefix1", "https://example.com/prefix-1#" ],
						[ "prefix2", "prefix1:?" ],
					] ),
				} );

				expect( schema.resolveURI( "prefix2:query" ) ).toBe( "https://example.com/prefix-1#?query" );
				expect( schema.resolveURI( "prefix2:another&flag" ) ).toBe( "https://example.com/prefix-1#?another&flag" );
			} );

			it( "should relative from prefix", ():void => {
				const schema:DigestedObjectSchema = createMock( {
					prefixes: new Map( [
						[ "Restaurant", "https://example.com/ns#Restaurant" ],
						[ "Brewery", "https://example.com/ns#Brewery" ],
					] ),
				} );

				expect( schema.resolveURI( "Restaurant" ) ).toBe( "https://example.com/ns#Restaurant" );
				expect( schema.resolveURI( "Brewery" ) ).toBe( "https://example.com/ns#Brewery" );
			} );

		} );

	} );

} );
