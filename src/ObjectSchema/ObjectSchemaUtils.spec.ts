import {
	clazz,
	hasSignature,
	isDefined,
	method,
	module,
	STATIC
} from "../test/JasmineExtender";
import { DigestedObjectSchema } from "./DigestedObjectSchema";
import { DigestedObjectSchemaProperty } from "./DigestedObjectSchemaProperty";
import { ObjectSchemaUtils } from "./ObjectSchemaUtils";


function createMockSchema( values?:Partial<DigestedObjectSchema> ):DigestedObjectSchema {
	const schema:DigestedObjectSchema = new DigestedObjectSchema();
	return Object.assign( schema, values );
}

function createMockProperty( values:Partial<DigestedObjectSchemaProperty> ):DigestedObjectSchemaProperty {
	const schema:DigestedObjectSchemaProperty = new DigestedObjectSchemaProperty();
	return Object.assign( schema, values );
}

describe( module( "carbonldp/ObjectSchema" ), ():void => {

	describe( clazz( "CarbonLDP.ObjectSchemaUtils",
		"Class with useful functions that use schemas."
	), ():void => {

		it( isDefined(), ():void => {
			expect( ObjectSchemaUtils ).toBeDefined();
			expect( ObjectSchemaUtils ).toEqual( jasmine.any( Function ) );
		} );

		describe( method( STATIC, "resolveURI" ), ():void => {

			it( hasSignature(
				"Tries to resolve a non absolute URI using the schema and the configuration provided.", [
					{ name: "uri", type: "string", description: "The URI to ve resolved." },
					{ name: "schema", type: "CarbonLDP.DigestedObjectSchema", description: "The schema where to find the prefixes or the default vocabulary to utilize." },
					{ name: "relativeTo", type: "{ vocab?:boolean, base?:boolean }", optional: true, description: "An additional configuration object to specify the resolution mode of a relative URI, where the vocab takes priority before the base." },
				],
				{ type: "string", description: "The resolved absolute URI." } ), ():void => {
			} );

			it( "should exists", ():void => {
				expect( ObjectSchemaUtils.resolveURI ).toBeDefined();
				expect( ObjectSchemaUtils.resolveURI ).toEqual( jasmine.any( Function ) );
			} );


			it( "should not alter absolute uris", ():void => {
				const schema:DigestedObjectSchema = createMockSchema( {
					vocab: "https://example.com/ns#",
					prefixes: new Map( [
						[ "prefix", "https://example.com/prefix#" ],
					] ),
				} );

				expect( ObjectSchemaUtils.resolveURI( "https://example.com/", schema ) ).toBe( "https://example.com/" );
				expect( ObjectSchemaUtils.resolveURI( "http://example.com/resource/", schema ) ).toBe( "http://example.com/resource/" );
			} );

			it( "should not alter blank node labels", ():void => {
				const schema:DigestedObjectSchema = createMockSchema( {
					vocab: "https://example.com/ns#",
					prefixes: new Map( [
						[ "_", "https://example.com/prefix#" ],
					] ),
				} );

				expect( ObjectSchemaUtils.resolveURI( "_:blank-node", schema ) ).toBe( "_:blank-node" );
				expect( ObjectSchemaUtils.resolveURI( "_:1", schema ) ).toBe( "_:1" );
			} );

			it( "should resolve relative with vocab schema", ():void => {
				const schema:DigestedObjectSchema = createMockSchema( {
					vocab: "https://example.com/ns#",
				} );

				expect( ObjectSchemaUtils.resolveURI( "relative-uri", schema, { vocab: true } ) ).toBe( "https://example.com/ns#relative-uri" );
				expect( ObjectSchemaUtils.resolveURI( "another", schema, { vocab: true } ) ).toBe( "https://example.com/ns#another" );
			} );

			it( "should resolve relative with base schema", ():void => {
				const schema:DigestedObjectSchema = createMockSchema( {
					base: "https://example.com/ns#",
				} );

				expect( ObjectSchemaUtils.resolveURI( "relative-uri", schema, { base: true } ) ).toBe( "https://example.com/relative-uri" );
				expect( ObjectSchemaUtils.resolveURI( "another", schema, { base: true } ) ).toBe( "https://example.com/another" );
			} );

			it( "should resolve relative with vocab schema before base", ():void => {
				const schema:DigestedObjectSchema = createMockSchema( {
					vocab: "https://example.com/ns#",
					base: "https://example.com/ns#",
				} );

				expect( ObjectSchemaUtils.resolveURI( "relative-uri", schema, { vocab: true, base: true } ) ).toBe( "https://example.com/ns#relative-uri" );
				expect( ObjectSchemaUtils.resolveURI( "another", schema, { vocab: true, base: true } ) ).toBe( "https://example.com/ns#another" );
			} );

			it( "should resolve relative with base schema when no vocab", ():void => {
				const schema:DigestedObjectSchema = createMockSchema( {
					base: "https://example.com/ns#",
				} );

				expect( ObjectSchemaUtils.resolveURI( "relative-uri", schema, { vocab: true, base: true } ) ).toBe( "https://example.com/relative-uri" );
				expect( ObjectSchemaUtils.resolveURI( "another", schema, { vocab: true, base: true } ) ).toBe( "https://example.com/another" );
			} );

			it( "should resolve prefixed name from prefixes", ():void => {
				const schema:DigestedObjectSchema = createMockSchema( {
					prefixes: new Map( [
						[ "prefix1", "https://example.com/prefix-1#" ],
						[ "prefix2", "https://example.com/prefix-2/" ],
					] ),
				} );

				expect( ObjectSchemaUtils.resolveURI( "prefix1:slug", schema ) ).toBe( "https://example.com/prefix-1#slug" );
				expect( ObjectSchemaUtils.resolveURI( "prefix2:resource/", schema ) ).toBe( "https://example.com/prefix-2/resource/" );
			} );

			it( "should resolve prefixed name from properties' @id", ():void => {
				const schema:DigestedObjectSchema = createMockSchema( {
					properties: new Map( [
						[ "prefix1", createMockProperty( { uri: "https://example.com/prefix-1#" } ) ],
						[ "prefix2", createMockProperty( { uri: "https://example.com/prefix-2/" } ) ],
					] ),
				} );

				expect( ObjectSchemaUtils.resolveURI( "prefix1:slug", schema ) ).toBe( "https://example.com/prefix-1#slug" );
				expect( ObjectSchemaUtils.resolveURI( "prefix2:resource/", schema ) ).toBe( "https://example.com/prefix-2/resource/" );
			} );

			it( "should resolve recursive prefixed name", ():void => {
				const schema:DigestedObjectSchema = createMockSchema( {
					prefixes: new Map( [
						[ "prefix1", "https://example.com/prefix-1#" ],
						[ "prefix2", "prefix1:?" ],
					] ),
				} );

				expect( ObjectSchemaUtils.resolveURI( "prefix2:query", schema ) ).toBe( "https://example.com/prefix-1#?query" );
				expect( ObjectSchemaUtils.resolveURI( "prefix2:another&flag", schema ) ).toBe( "https://example.com/prefix-1#?another&flag" );
			} );

			it( "should relative from prefix", ():void => {
				const schema:DigestedObjectSchema = createMockSchema( {
					prefixes: new Map( [
						[ "Restaurant", "https://example.com/ns#Restaurant" ],
						[ "Brewery", "https://example.com/ns#Brewery" ],
					] ),
				} );

				expect( ObjectSchemaUtils.resolveURI( "Restaurant", schema ) ).toBe( "https://example.com/ns#Restaurant" );
				expect( ObjectSchemaUtils.resolveURI( "Brewery", schema ) ).toBe( "https://example.com/ns#Brewery" );
			} );

		} );

	} );

} );
