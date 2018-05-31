import {
	clazz,
	hasSignature,
	method,
	module,
	STATIC
} from "../test/JasmineExtender";
import { ContainerType } from "./ContainerType";
import { DigestedObjectSchema } from "./DigestedObjectSchema";
import { DigestedObjectSchemaProperty } from "./DigestedObjectSchemaProperty";
import { ObjectSchemaDigester } from "./ObjectSchemaDigester";
import { PointerType } from "./PointerType";


function createMockSchema( values?:Partial<DigestedObjectSchema> ):DigestedObjectSchema {
	const schema:DigestedObjectSchema = new DigestedObjectSchema();
	return Object.assign( schema, values );
}

function createMockProperty( values:Partial<DigestedObjectSchemaProperty> ):DigestedObjectSchemaProperty {
	const schema:DigestedObjectSchemaProperty = new DigestedObjectSchemaProperty();
	return Object.assign( schema, values );
}

describe( module( "carbonldp/ObjectSchema" ), ():void => {

	describe( clazz(
		"CarbonLDP.ObjectSchemaDigester",
		"Class with functions to standardize a JSON-LD Context Schema."
	), ():void => {

		describe( method( STATIC, "digestSchema" ), ():void => {

			it( hasSignature(
				"Processes a schema to standardize it before using it.", [
					{ name: "schema", type: "CarbonLDP.ObjectSchema" },
				],
				{ type: "CarbonLDP.DigestedObjectSchema" }
			), ():void => {} );

			it( hasSignature(
				"Processes several schemas to standardize and combine them before using them.", [
					{ name: "schemas", type: "Array<CarbonLDP.ObjectSchema>" },
				],
				{ type: "CarbonLDP.DigestedObjectSchema" }
			), ():void => {} );

			it( "should exists", ():void => {
				expect( ObjectSchemaDigester.digestSchema ).toBeDefined();
				expect( ObjectSchemaDigester.digestSchema ).toEqual( jasmine.any( Function ) );
			} );


			it( "should digest @vocab", ():void => {
				const schema:DigestedObjectSchema = ObjectSchemaDigester.digestSchema( {
					"@vocab": "https://example.com/ns#",
				} );

				expect( schema.vocab ).toEqual( "https://example.com/ns#" );
			} );

			it( "should digest @base", ():void => {
				const schema:DigestedObjectSchema = ObjectSchemaDigester.digestSchema( {
					"@base": "https://example.com/",
				} );

				expect( schema.base ).toEqual( "https://example.com/" );
			} );

			it( "should digest @language", ():void => {
				const schema:DigestedObjectSchema = ObjectSchemaDigester.digestSchema( {
					"@language": "en",
				} );

				expect( schema.language ).toEqual( "en" );
			} );

			it( "should digest prefixes", ():void => {
				const schema:DigestedObjectSchema = ObjectSchemaDigester.digestSchema( {
					"skos": "http://www.w3.org/2004/02/skos/core#",
					"dct": "http://purl.org/dc/terms/",
					"Concept": "skos:Concept",
				} );

				expect( schema.prefixes ).toEqual( new Map( [
					[ "skos", "http://www.w3.org/2004/02/skos/core#" ],
					[ "dct", "http://purl.org/dc/terms/" ],
					[ "Concept", "skos:Concept" ],
				] ) );
			} );

			it( "should digest properties", ():void => {
				const spy:jasmine.Spy = spyOn( ObjectSchemaDigester, "digestProperty" )
					.and.callThrough();

				const schema:DigestedObjectSchema = ObjectSchemaDigester.digestSchema( {
					"hasTopConcept": {
						"@id": "skos:hasTopConcept",
						"@type": "@id",
						"@container": "@set",
					},
					"name": {
						"@id": "dct:name",
						"@type": "xsd:string",
					},
				} );

				expect( spy ).toHaveBeenCalledWith( "hasTopConcept", {
					"@id": "skos:hasTopConcept",
					"@type": "@id",
					"@container": "@set",
				} );
				expect( spy ).toHaveBeenCalledWith( "name", {
					"@id": "dct:name",
					"@type": "xsd:string",
				} );

				expect( schema.properties ).toEqual( new Map( [
					[ "hasTopConcept", spy.calls.all()[ 0 ].returnValue ],
					[ "name", spy.calls.all()[ 1 ].returnValue ],
				] ) );
			} );


			it( "should keep last set @vocab", ():void => {
				const schema:DigestedObjectSchema = ObjectSchemaDigester.digestSchema( [
					{ "@vocab": "https://example.com/ns-1#" },
					{ "@vocab": "https://example.com/ns-2#" },
					{},
				] );

				expect( schema.vocab ).toBe( "https://example.com/ns-2#" );
			} );

			it( "should keep last set @base", ():void => {
				const schema:DigestedObjectSchema = ObjectSchemaDigester.digestSchema( [
					{ "@base": "https://example.com/base-1/" },
					{ "@base": "https://example.com/base-2/" },
					{},
				] );

				expect( schema.base ).toBe( "https://example.com/base-2/" );
			} );

			it( "should keep last set @language", ():void => {
				const schema:DigestedObjectSchema = ObjectSchemaDigester.digestSchema( [
					{ "@language": "en-US" },
					{ "@language": "en-UK" },
					{},
				] );

				expect( schema.language ).toBe( "en-UK" );
			} );

			it( "should combine prefixes", ():void => {
				const schema:DigestedObjectSchema = ObjectSchemaDigester.digestSchema( [
					{ "prefix1": "https://example.com/prefix-1/ns#" },
					{ "prefix2": "https://example.com/prefix-2/ns#" },
					{},
				] );

				expect( schema.prefixes ).toEqual( new Map( [
					[ "prefix1", "https://example.com/prefix-1/ns#" ],
					[ "prefix2", "https://example.com/prefix-2/ns#" ],
				] ) );
			} );

			it( "should keep last same prefix", ():void => {
				const schema:DigestedObjectSchema = ObjectSchemaDigester.digestSchema( [
					{ "prefix": "https://example.com/prefix-1/ns#" },
					{ "prefix": "https://example.com/prefix-2/ns#" },
					{},
				] );

				expect( schema.prefixes ).toEqual( new Map( [
					[ "prefix", "https://example.com/prefix-2/ns#" ],
				] ) );
			} );

			it( "should combine properties", ():void => {
				const spy:jasmine.Spy = spyOn( ObjectSchemaDigester, "digestProperty" )
					.and.callThrough();

				const schema:DigestedObjectSchema = ObjectSchemaDigester.digestSchema( [
					{ "property1": {} },
					{ "property2": {} },
					{},
				] );

				expect( schema.properties ).toEqual( new Map( [
					[ "property1", spy.calls.all()[ 0 ].returnValue ],
					[ "property2", spy.calls.all()[ 1 ].returnValue ],
				] ) );
			} );

			it( "should keep last same property", ():void => {
				const spy:jasmine.Spy = spyOn( ObjectSchemaDigester, "digestProperty" )
					.and.callThrough();

				const schema:DigestedObjectSchema = ObjectSchemaDigester.digestSchema( [
					{ "property": {} },
					{ "property": {} },
					{},
				] );

				expect( schema.properties ).toEqual( new Map( [
					[ "property", spy.calls.mostRecent().returnValue ],
				] ) );
			} );

		} );

		describe( method( STATIC, "digestProperty" ), ():void => {

			it( hasSignature(
				"Process an schema property definition before using it.", [
					{ name: "name", type: "string" },
					{ name: "definition", type: "CarbonLDP.ObjectSchemaProperty" },
				],
				{ type: "CarbonLDP.DigestedObjectSchemaProperty" }
			), ():void => {} );

			it( "should exists", ():void => {
				expect( ObjectSchemaDigester.digestProperty ).toBeDefined();
				expect( ObjectSchemaDigester.digestProperty ).toEqual( jasmine.any( Function ) );
			} );


			it( "should digest @id", ():void => {
				const definition:DigestedObjectSchemaProperty = ObjectSchemaDigester.digestProperty( "property", {
					"@id": "https://example.com/ns#property",
				} );

				expect( definition ).toEqual( jasmine.objectContaining( {
					uri: "https://example.com/ns#property",
				} ) );
			} );

			it( "should digest name when @id", ():void => {
				const definition:DigestedObjectSchemaProperty = ObjectSchemaDigester.digestProperty( "property", {} );

				expect( definition ).toEqual( jasmine.objectContaining( {
					uri: "property",
				} ) );
			} );

			it( "should digest @type when string", ():void => {
				const definition:DigestedObjectSchemaProperty = ObjectSchemaDigester.digestProperty( "property", {
					"@type": "https://example.com/ns#type",
				} );

				expect( definition ).toEqual( jasmine.objectContaining( {
					literal: true,
					literalType: "https://example.com/ns#type",
				} ) );
			} );

			it( "should digest @type when @id", ():void => {
				const definition:DigestedObjectSchemaProperty = ObjectSchemaDigester.digestProperty( "property", {
					"@type": "@id",
				} );

				expect( definition ).toEqual( jasmine.objectContaining( {
					literal: false,
					pointerType: PointerType.ID,
				} ) );
			} );

			it( "should digest @type when @vocab", ():void => {
				const definition:DigestedObjectSchemaProperty = ObjectSchemaDigester.digestProperty( "property", {
					"@type": "@vocab",
				} );

				expect( definition ).toEqual( jasmine.objectContaining( {
					literal: false,
					pointerType: PointerType.VOCAB,
				} ) );
			} );

			it( "should digest @language", ():void => {
				const definition:DigestedObjectSchemaProperty = ObjectSchemaDigester.digestProperty( "property", {
					"@language": "en",
				} );

				expect( definition ).toEqual( jasmine.objectContaining( {
					language: "en",
				} ) );
			} );

			it( "should digest @container when @set", ():void => {
				const definition:DigestedObjectSchemaProperty = ObjectSchemaDigester.digestProperty( "property", {
					"@container": "@set",
				} );

				expect( definition ).toEqual( jasmine.objectContaining( {
					containerType: ContainerType.SET,
				} ) );
			} );

			it( "should digest @container when @list", ():void => {
				const definition:DigestedObjectSchemaProperty = ObjectSchemaDigester.digestProperty( "property", {
					"@container": "@list",
				} );

				expect( definition ).toEqual( jasmine.objectContaining( {
					containerType: ContainerType.LIST,
				} ) );
			} );

			it( "should digest @container when @language", ():void => {
				const definition:DigestedObjectSchemaProperty = ObjectSchemaDigester.digestProperty( "property", {
					"@container": "@language",
				} );

				expect( definition ).toEqual( jasmine.objectContaining( {
					containerType: ContainerType.LANGUAGE,
				} ) );
			} );

		} );

		describe( method( STATIC, "combineDigestedObjectSchemas" ), ():void => {

			it( hasSignature(
				"Combine several standardized schemas into one.", [
					{ name: "digestedSchemas", type: "CarbonLDP.DigestedObjectSchema[]" },
				],
				{ type: "CarbonLDP.DigestedObjectSchema" }
			), ():void => {} );

			it( "should exists", ():void => {
				expect( ObjectSchemaDigester.combineDigestedObjectSchemas ).toBeDefined();
				expect( ObjectSchemaDigester.combineDigestedObjectSchemas ).toEqual( jasmine.any( Function ) );
			} );


			it( "should return new schema reference", ():void => {
				const schema1:DigestedObjectSchema = new DigestedObjectSchema();
				const schema2:DigestedObjectSchema = new DigestedObjectSchema();

				const schema:DigestedObjectSchema = ObjectSchemaDigester.combineDigestedObjectSchemas( [
					schema1,
					schema2,
				] );

				expect( schema ).not.toBe( schema1 );
				expect( schema ).not.toBe( schema2 );
			} );

			it( "should keep last set vocab", ():void => {
				const schema:DigestedObjectSchema = ObjectSchemaDigester.combineDigestedObjectSchemas( [
					createMockSchema( { vocab: "https://example.com/ns-1#" } ),
					createMockSchema( { vocab: "https://example.com/ns-2#" } ),
					createMockSchema( {} ),
				] );

				expect( schema.vocab ).toBe( "https://example.com/ns-2#" );
			} );

			it( "should keep last set base", ():void => {
				const schema:DigestedObjectSchema = ObjectSchemaDigester.combineDigestedObjectSchemas( [
					createMockSchema( { base: "https://example.com/base-1/" } ),
					createMockSchema( { base: "https://example.com/base-2/" } ),
					createMockSchema( {} ),
				] );

				expect( schema.base ).toBe( "https://example.com/base-2/" );
			} );

			it( "should keep last set language", ():void => {
				const schema:DigestedObjectSchema = ObjectSchemaDigester.combineDigestedObjectSchemas( [
					createMockSchema( { language: "en-US" } ),
					createMockSchema( { language: "en-UK" } ),
					createMockSchema( {} ),
				] );

				expect( schema.language ).toBe( "en-UK" );
			} );

			it( "should combine prefixes", ():void => {
				const schema:DigestedObjectSchema = ObjectSchemaDigester.combineDigestedObjectSchemas( [
					createMockSchema( { prefixes: new Map( [ [ "prefix1", "https://example.com/prefix-1/ns#" ] ] ) } ),
					createMockSchema( { prefixes: new Map( [ [ "prefix2", "https://example.com/prefix-2/ns#" ] ] ) } ),
					createMockSchema( {} ),
				] );

				expect( schema.prefixes ).toEqual( new Map( [
					[ "prefix1", "https://example.com/prefix-1/ns#" ],
					[ "prefix2", "https://example.com/prefix-2/ns#" ],
				] ) );
			} );

			it( "should keep last same prefix", ():void => {
				const schema:DigestedObjectSchema = ObjectSchemaDigester.combineDigestedObjectSchemas( [
					createMockSchema( { prefixes: new Map( [ [ "prefix", "https://example.com/prefix-1/ns#" ] ] ) } ),
					createMockSchema( { prefixes: new Map( [ [ "prefix", "https://example.com/prefix-2/ns#" ] ] ) } ),
					createMockSchema( {} ),
				] );

				expect( schema.prefixes ).toEqual( new Map( [
					[ "prefix", "https://example.com/prefix-2/ns#" ],
				] ) );
			} );

			it( "should combine properties", ():void => {
				const schema:DigestedObjectSchema = ObjectSchemaDigester.combineDigestedObjectSchemas( [
					createMockSchema( { properties: new Map( [ [ "property1", createMockProperty( { uri: "https://example.com/ns#property1" } ) ] ] ) } ),
					createMockSchema( { properties: new Map( [ [ "property2", createMockProperty( { uri: "https://example.com/ns#property2" } ) ] ] ) } ),
					createMockSchema( {} ),
				] );

				expect( schema.properties ).toEqual( new Map( [
					[ "property1", createMockProperty( { uri: "https://example.com/ns#property1" } ) ],
					[ "property2", createMockProperty( { uri: "https://example.com/ns#property2" } ) ],
				] ) );
			} );

			it( "should keep last same property", ():void => {
				const schema:DigestedObjectSchema = ObjectSchemaDigester.combineDigestedObjectSchemas( [
					createMockSchema( { properties: new Map( [ [ "property", createMockProperty( { uri: "https://example.com/ns#property1" } ) ] ] ) } ),
					createMockSchema( { properties: new Map( [ [ "property", createMockProperty( { uri: "https://example.com/ns#property2" } ) ] ] ) } ),
					createMockSchema( {} ),
				] );

				expect( schema.properties ).toEqual( new Map( [
					[ "property", createMockProperty( { uri: "https://example.com/ns#property2" } ) ],
				] ) );
			} );

		} );

	} );

} );