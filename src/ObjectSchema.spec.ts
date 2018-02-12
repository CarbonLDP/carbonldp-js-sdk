import * as ObjectSchema from "./ObjectSchema";
import DefaultExport, { DigestedObjectSchema } from "./ObjectSchema";

import {
	clazz,
	enumeration,
	hasDefaultExport,
	hasEnumeral,
	hasMethod,
	hasProperty,
	hasSignature,
	INSTANCE,
	interfaze,
	isDefined,
	method,
	module,
	OBLIGATORY,
	OPTIONAL,
	STATIC,
} from "./test/JasmineExtender";
import * as Utils from "./Utils";


function createSchema( values?:Partial<ObjectSchema.DigestedObjectSchema> ):ObjectSchema.DigestedObjectSchema {
	const schema:ObjectSchema.DigestedObjectSchema = new ObjectSchema.DigestedObjectSchema();
	return Object.assign( schema, values );
}

function createProperty( values:Partial<ObjectSchema.DigestedPropertyDefinition> ):ObjectSchema.DigestedPropertyDefinition {
	const schema:ObjectSchema.DigestedPropertyDefinition = new ObjectSchema.DigestedPropertyDefinition();
	return Object.assign( schema, values );
}


describe( module( "Carbon/ObjectSchema" ), ():void => {

	it( isDefined(), ():void => {
		expect( ObjectSchema ).toBeDefined();
		expect( Utils.isObject( ObjectSchema ) ).toEqual( true );
	} );

	describe( interfaze(
		"Carbon.ObjectSchema.Class",
		"Interface that represents an schema based in the [JSONLD contexts](https://www.w3.org/TR/json-ld/#the-context). This is used to convert from the JSONLD stored in the server to the Documents used in the SDK and vice versa."
	), ():void => {

		it( hasProperty(
			OPTIONAL,
			"@base",
			"string",
			"An absolute URI that is used to resolve relative URIs. If it's set to `null`, will invalidate a previous `@base` value."
		), ():void => {} );

		it( hasProperty(
			OPTIONAL,
			"@vocab",
			"string",
			"An absolute URI that is used to as the common prefix for all the relative properties. If it's set to `null`, will invalidate a previous `@vocab` value."
		), ():void => {} );

		it( hasProperty(
			OPTIONAL,
			"@index",
			"object",
			"[Not Supported] This element is ignored."
		), ():void => {} );

		it( hasProperty(
			OPTIONAL,
			"@language",
			"string",
			"The default language of the string properties."
		), ():void => {} );

		it( hasProperty(
			OPTIONAL,
			"@reverse",
			"object",
			"[Not Supported] This element is ignored."
		), ():void => {} );

		it( hasProperty(
			OBLIGATORY,
			"[ name:string ]",
			"(string | Carbon.ObjectSchema.PropertyDefinition)",
			"This index can be interpreted in two forms:\n- As a prefix: When the value is as string. The name is taken a a prefix and the string value must be an absolute URI.\n- As a property: When the value is of type `Carbon.ObjectSchema.PropertyDefinition`. The name is taken as the name of the property."
		), ():void => {} );

	} );

	describe( interfaze(
		"Carbon.ObjectSchema.PropertyDefinition",
		"Interface that defines the property of a schema."
	), ():void => {

		it( hasProperty(
			OPTIONAL,
			"@id",
			"string",
			"The absolute URI of the property in the JSONLD which is mapped to the key name where this definition was referred."
		), ():void => {} );

		it( hasProperty(
			OPTIONAL,
			"@type",
			"string",
			"If the property is a literal, this specifies its XSD type."
		), ():void => {} );

		it( hasProperty(
			OPTIONAL,
			"@language",
			"string",
			"The language of the property."
		), ():void => {} );

		it( hasProperty(
			OPTIONAL,
			"@container",
			"string",
			"If the property is multiple it can be of tree types:\n- `@set`: An unsorted array of elements.\n- `@list`: An sorted array of elements\n- `@language`: An string property with multiple languages."
		), ():void => {} );

	} );

	describe( interfaze(
		"Carbon.ObjectSchema.Resolver",
		"Interface that defines the methods needed for an element that can provide object schemas."
	), ():void => {

		it( hasMethod(
			OPTIONAL,
			"getGeneralSchema",
			"Returns the general object schema that applies to all the objects.",
			{ type: "Carbon.ObjectSchema.DigestedObjectSchema" }
		), ():void => {} );

		it( hasMethod(
			OPTIONAL,
			"getSchemaFor",
			"Returns the specific object schema that applies to the object provided.", [
				{ name: "object", type: "object", description: "The object to look for its schema." },
			],
			{ type: "Carbon.ObjectSchema.DigestedObjectSchema" }
		), ():void => {} );

	} );

	it( hasDefaultExport( "Carbon.ObjectSchema.Class" ), ():void => {
		let defaultExport:DefaultExport = <any> {};
		let defaultTarget:ObjectSchema.Class;

		defaultTarget = defaultExport;
		expect( defaultTarget ).toEqual( jasmine.any( Object ) );
	} );

	describe( enumeration(
		"Carbon.ObjectSchema.ContainerType",
		"Enum for the types that a container can be."
	), ():void => {

		it( isDefined(), ():void => {
			expect( ObjectSchema.ContainerType ).toBeDefined();
			expect( Utils.isObject( ObjectSchema.ContainerType ) ).toBe( true );
		} );

		it( hasEnumeral(
			"SET"
		), ():void => {
			expect( ObjectSchema.ContainerType.SET ).toBeDefined();
		} );

		it( hasEnumeral(
			"LIST"
		), ():void => {
			expect( ObjectSchema.ContainerType.LIST ).toBeDefined();
		} );

		it( hasEnumeral(
			"LANGUAGE"
		), ():void => {
			expect( ObjectSchema.ContainerType.LANGUAGE ).toBeDefined();
		} );

	} );

	describe( clazz( "Carbon.ObjectSchema.DigestedObjectSchema", "Class of a standardized Schema that is used for the SDK for compact and expand JSON-LD objects and Carbon Resources." ), ():void => {

		it( "should exists", ():void => {
			expect( ObjectSchema.DigestedObjectSchema ).toBeDefined();
			expect( ObjectSchema.DigestedObjectSchema ).toEqual( jasmine.any( Function ) );
		} );

		it( "should be instantiable", ():void => {
			const digestedSchema:ObjectSchema.DigestedObjectSchema = new ObjectSchema.DigestedObjectSchema();

			expect( digestedSchema ).toBeDefined();
			expect( digestedSchema ).toEqual( jasmine.any( ObjectSchema.DigestedObjectSchema ) );
		} );

		it( hasProperty(
			INSTANCE,
			"base",
			"string",
			"The base URI of the schema."
		), ():void => {
			const digestedSchema:ObjectSchema.DigestedObjectSchema = createSchema();

			expect( digestedSchema.base ).toEqual( jasmine.any( String ) );
			expect( digestedSchema.base ).toBe( "" );
		} );

		it( hasProperty(
			INSTANCE,
			"language",
			"string",
			"The default language of the string properties."
		), ():void => {
			const digestedSchema:ObjectSchema.DigestedObjectSchema = createSchema();

			expect( digestedSchema.language ).toBeNull();
		} );

		it( hasProperty(
			INSTANCE,
			"vocab",
			"string",
			"URI that will be used to resolve properties URIs that aren't defined in the schema."
		), ():void => {
			const digestedSchema:ObjectSchema.DigestedObjectSchema = createSchema();

			expect( digestedSchema.vocab ).toBeNull();
		} );

		it( hasProperty(
			INSTANCE,
			"prefixes",
			"Map<string, string>",
			"Map that contains the prefixes of absolutes URIs."
		), ():void => {
			const digestedSchema:ObjectSchema.DigestedObjectSchema = createSchema();

			expect( digestedSchema.prefixes ).toEqual( jasmine.any( Map ) );
			expect( digestedSchema.prefixes.size ).toBe( 0 );
		} );

		it( hasProperty(
			INSTANCE,
			"properties",
			"Map<string, Carbon.ObjectSchema.DigestedPropertyDefinition>",
			"Map that contains the definitions of the properties in the schema."
		), ():void => {
			const digestedSchema:ObjectSchema.DigestedObjectSchema = createSchema();

			expect( digestedSchema.properties ).toEqual( jasmine.any( Map ) );
			expect( digestedSchema.properties.size ).toBe( 0 );
		} );

		/*describe( "DigestedObjectSchema._resolve", ():void => {

			it( "should exists", ():void => {
				expect( DigestedObjectSchema.prototype._resolve ).toBeDefined();
				expect( DigestedObjectSchema.prototype._resolve ).toEqual( jasmine.any( Function ) );
			} );

			it( "should resolve itself", ():void => {
				const schema:ObjectSchema.DigestedObjectSchema = createSchema();

				const returned:ObjectSchema.DigestedObjectSchema = schema._resolve();
				expect( returned ).toBe( schema );
			} );

			it( "should resolve prefixes", ():void => {
				const schema:ObjectSchema.DigestedObjectSchema = createSchema( {
					prefixes: new Map( [
						[ "prefix1", "https://example.com/ns#" ],
						[ "prefix2", "schema:Prefix" ],
						[ "prefix3", "prefix2:/" ],
						[ "prefix4", "prefix1:property" ],
						[ "prefix5", "prefix4:-2" ],
						[ "prefix6", "prefix5:.5" ],
					] ),
				} );

				schema._resolve();
				expect( schema.prefixes.get( "prefix1" ) ).toBe( "https://example.com/ns#" );
				expect( schema.prefixes.get( "prefix2" ) ).toBe( "schema:Prefix" );
				expect( schema.prefixes.get( "prefix3" ) ).toBe( "schema:Prefix/" );
				expect( schema.prefixes.get( "prefix4" ) ).toBe( "https://example.com/ns#property" );
				expect( schema.prefixes.get( "prefix5" ) ).toBe( "https://example.com/ns#property-2" );
				expect( schema.prefixes.get( "prefix6" ) ).toBe( "https://example.com/ns#property-2.5" );
			} );

			it( "should resolve only prefixed property URIs", ():void => {
				const schema:ObjectSchema.DigestedObjectSchema = createSchema( {
					prefixes: new Map( [
						[ "prefix1", "https://example.com/ns#" ],
						[ "prefix2", "schema:Prefix" ],
						[ "prefix3", "prefix1:property" ],
						[ "resource", "https://example.com/resource/" ],
					] ),
					properties: new Map( [
						[ "property1", createProperty( {
							uri: "https://example.com/ns#",
						} ) ],
						[ "property2", createProperty( {
							uri: "schema:Prefix",
						} ) ],
						[ "property3", createProperty( {
							uri: "prefix1:property",
						} ) ],
						[ "property4", createProperty( {
							uri: "prefix1:property-2",
						} ) ],
						[ "property5", createProperty( {
							uri: "resource",
						} ) ],
					] ),
				} );

				schema._resolve();
				expect( schema.properties.get( "property1" ).uri ).toBe( "https://example.com/ns#" );
				expect( schema.properties.get( "property2" ).uri ).toBe( "schema:Prefix" );
				expect( schema.properties.get( "property3" ).uri ).toBe( "https://example.com/ns#property" );
				expect( schema.properties.get( "property4" ).uri ).toBe( "https://example.com/ns#property-2" );
				expect( schema.properties.get( "property5" ).uri ).toBe( "https://example.com/resource/" );
			} );

			it( "should resolve only relative property URIs with vocab", ():void => {
				const schema:ObjectSchema.DigestedObjectSchema = createSchema( {
					vocab: "https://example.com/ns#",
					base: "https://example.com/",
					properties: new Map( [
						[ "property1", createProperty( {
							uri: "https://example.com/ns#",
						} ) ],
						[ "property2", createProperty( {
							uri: "schema:Prefix",
						} ) ],
						[ "property3", createProperty( {
							uri: "prefix:property",
						} ) ],
						[ "property4", createProperty( {
							uri: "property-2",
						} ) ],
						[ "property5", createProperty( {
							uri: "resource",
						} ) ],
					] ),
				} );

				schema._resolve();

				expect( schema.properties.get( "property1" ).uri ).toBe( "https://example.com/ns#" );
				expect( schema.properties.get( "property2" ).uri ).toBe( "schema:Prefix" );
				expect( schema.properties.get( "property3" ).uri ).toBe( "prefix:property" );
				expect( schema.properties.get( "property4" ).uri ).toBe( "https://example.com/ns#property-2" );
				expect( schema.properties.get( "property5" ).uri ).toBe( "https://example.com/ns#resource" );
			} );

			it( "should resolve only relative property URIs with base when no vocab", ():void => {
				const schema:ObjectSchema.DigestedObjectSchema = createSchema( {
					base: "https://example.com/",
					properties: new Map( [
						[ "property1", createProperty( {
							uri: "https://example.com/ns#",
						} ) ],
						[ "property2", createProperty( {
							uri: "schema:Prefix",
						} ) ],
						[ "property3", createProperty( {
							uri: "prefix:property",
						} ) ],
						[ "property4", createProperty( {
							uri: "property-2",
						} ) ],
						[ "property5", createProperty( {
							uri: "resource",
						} ) ],
					] ),
				} );

				schema._resolve();

				expect( schema.properties.get( "property1" ).uri ).toBe( "https://example.com/ns#" );
				expect( schema.properties.get( "property2" ).uri ).toBe( "schema:Prefix" );
				expect( schema.properties.get( "property3" ).uri ).toBe( "prefix:property" );
				expect( schema.properties.get( "property4" ).uri ).toBe( "https://example.com/property-2" );
				expect( schema.properties.get( "property5" ).uri ).toBe( "https://example.com/resource" );
			} );

			it( "should resolve only prefixed property types", ():void => {
				const schema:ObjectSchema.DigestedObjectSchema = createSchema( {
					prefixes: new Map( [
						[ "prefix1", "https://example.com/ns#" ],
						[ "prefix2", "schema:Prefix" ],
						[ "prefix3", "prefix1:type" ],
						[ "type", "https://example.com/type/" ],
					] ),
					properties: new Map( [
						[ "property1", createProperty( {
							literalType: "https://example.com/ns#",
						} ) ],
						[ "property2", createProperty( {
							literalType: "schema:Prefix",
						} ) ],
						[ "property3", createProperty( {
							literalType: "prefix1:type",
						} ) ],
						[ "property4", createProperty( {
							literalType: "prefix1:type-2",
						} ) ],
						[ "property5", createProperty( {
							literalType: "type",
						} ) ],
					] ),
				} );

				schema._resolve();
				expect( schema.properties.get( "property1" ).literalType ).toBe( "https://example.com/ns#" );
				expect( schema.properties.get( "property2" ).literalType ).toBe( "schema:Prefix" );
				expect( schema.properties.get( "property3" ).literalType ).toBe( "https://example.com/ns#type" );
				expect( schema.properties.get( "property4" ).literalType ).toBe( "https://example.com/ns#type-2" );
				expect( schema.properties.get( "property5" ).literalType ).toBe( "https://example.com/type/" );
			} );

			it( "should resolve only prefixed property types with vocab", ():void => {
				const schema:ObjectSchema.DigestedObjectSchema = createSchema( {
					vocab: "https://example.com/ns#",
					base: "https://example.com/",
					properties: new Map( [
						[ "property1", createProperty( {
							literalType: "https://example.com/ns#",
						} ) ],
						[ "property2", createProperty( {
							literalType: "schema:Prefix",
						} ) ],
						[ "property3", createProperty( {
							literalType: "prefix:type",
						} ) ],
						[ "property4", createProperty( {
							literalType: "type-2",
						} ) ],
						[ "property5", createProperty( {
							literalType: "type",
						} ) ],
					] ),
				} );

				schema._resolve();

				expect( schema.properties.get( "property1" ).literalType ).toBe( "https://example.com/ns#" );
				expect( schema.properties.get( "property2" ).literalType ).toBe( "schema:Prefix" );
				expect( schema.properties.get( "property3" ).literalType ).toBe( "prefix:type" );
				expect( schema.properties.get( "property4" ).literalType ).toBe( "https://example.com/ns#type-2" );
				expect( schema.properties.get( "property5" ).literalType ).toBe( "https://example.com/ns#type" );
			} );

			it( "should resolve only prefixed property types with base when no vocab", ():void => {
				const schema:ObjectSchema.DigestedObjectSchema = createSchema( {
					base: "https://example.com/",
					properties: new Map( [
						[ "property1", createProperty( {
							literalType: "https://example.com/ns#",
						} ) ],
						[ "property2", createProperty( {
							literalType: "schema:Prefix",
						} ) ],
						[ "property3", createProperty( {
							literalType: "prefix:type",
						} ) ],
						[ "property4", createProperty( {
							literalType: "type-2",
						} ) ],
						[ "property5", createProperty( {
							literalType: "type",
						} ) ],
					] ),
				} );

				schema._resolve();

				expect( schema.properties.get( "property1" ).literalType ).toBe( "https://example.com/ns#" );
				expect( schema.properties.get( "property2" ).literalType ).toBe( "schema:Prefix" );
				expect( schema.properties.get( "property3" ).literalType ).toBe( "prefix:type" );
				expect( schema.properties.get( "property4" ).literalType ).toBe( "https://example.com/type-2" );
				expect( schema.properties.get( "property5" ).literalType ).toBe( "https://example.com/type" );
			} );

			it( "should clone property when URI resolved", ():void => {
				const schema:ObjectSchema.DigestedObjectSchema = createSchema( {
					vocab: "https://example.com/ns#",
					prefixes: new Map( [
						[ "prefix1", "https://example.com/ns#" ],
						[ "prefix2", "schema:Prefix" ],
						[ "prefix3", "prefix1:type" ],
						[ "type", "https://example.com/type/" ],
					] ),
					properties: new Map( [
						[ "property1", createProperty( {
							uri: "https://example.com/ns#",
						} ) ],
						[ "property2", createProperty( {
							uri: "schema:Prefix",
						} ) ],
						[ "property3", createProperty( {
							uri: "prefix1:type",
						} ) ],
						[ "property4", createProperty( {
							uri: "type",
						} ) ],
						[ "property5", createProperty( {
							uri: "type-2",
						} ) ],
					] ),
				} );

				const properties:ObjectSchema.DigestedPropertyDefinition[] = Array.from( schema.properties.values() );
				schema._resolve();

				expect( schema.properties.get( "property1" ) ).toBe( properties[ 0 ] );
				expect( schema.properties.get( "property2" ) ).toBe( properties[ 1 ] );
				expect( schema.properties.get( "property3" ) ).not.toBe( properties[ 2 ] );
				expect( schema.properties.get( "property4" ) ).not.toBe( properties[ 3 ] );
				expect( schema.properties.get( "property5" ) ).not.toBe( properties[ 4 ] );
			} );

			it( "should clone property when type resolved", ():void => {
				const schema:ObjectSchema.DigestedObjectSchema = createSchema( {
					vocab: "https://example.com/ns#",
					prefixes: new Map( [
						[ "prefix1", "https://example.com/ns#" ],
						[ "prefix2", "schema:Prefix" ],
						[ "prefix3", "prefix1:type" ],
						[ "type", "https://example.com/type/" ],
					] ),
					properties: new Map( [
						[ "property1", createProperty( {
							literalType: "https://example.com/ns#",
						} ) ],
						[ "property2", createProperty( {
							literalType: "schema:Prefix",
						} ) ],
						[ "property3", createProperty( {
							literalType: "prefix1:type",
						} ) ],
						[ "property4", createProperty( {
							literalType: "type",
						} ) ],
						[ "property5", createProperty( {
							literalType: "type-2",
						} ) ],
					] ),
				} );

				const properties:ObjectSchema.DigestedPropertyDefinition[] = Array.from( schema.properties.values() );
				schema._resolve();

				expect( schema.properties.get( "property1" ) ).toBe( properties[ 0 ] );
				expect( schema.properties.get( "property2" ) ).toBe( properties[ 1 ] );
				expect( schema.properties.get( "property3" ) ).not.toBe( properties[ 2 ] );
				expect( schema.properties.get( "property4" ) ).not.toBe( properties[ 3 ] );
				expect( schema.properties.get( "property5" ) ).not.toBe( properties[ 4 ] );
			} );

		} );*/

	} );

	describe( clazz( "Carbon.ObjectSchema.DigestedPropertyDefinition", "Class for standardized object properties of a schema." ), ():void => {

		it( isDefined(), ():void => {
			expect( ObjectSchema.DigestedPropertyDefinition ).toBeDefined();
			expect( Utils.isFunction( ObjectSchema.DigestedPropertyDefinition ) ).toBe( true );
		} );

		let digestedProperty:ObjectSchema.DigestedPropertyDefinition;
		beforeEach( ():void => {
			digestedProperty = new ObjectSchema.DigestedPropertyDefinition();
		} );

		it( "should be instantiable", ():void => {
			const instance:ObjectSchema.DigestedPropertyDefinition = new ObjectSchema.DigestedPropertyDefinition();

			expect( instance ).toBeDefined();
			expect( instance ).toEqual( jasmine.any( ObjectSchema.DigestedPropertyDefinition ) );
		} );

		it( hasProperty(
			INSTANCE,
			"uri",
			"string",
			"The absolute URI that represents the property"
		), ():void => {
			expect( digestedProperty.uri ).toBeDefined();
			expect( digestedProperty.uri ).toBeNull();
		} );

		it( hasProperty(
			INSTANCE,
			"literal",
			"boolean",
			"Indicates if the property is a literal or not."
		), ():void => {
			expect( digestedProperty.literal ).toBeDefined();
			expect( digestedProperty.literal ).toBeNull();
		} );

		it( hasProperty(
			INSTANCE,
			"literalType",
			"string",
			"The type of literal the property is. It's `null` if the property is not a literal."
		), ():void => {
			expect( digestedProperty.literalType ).toBeDefined();
			expect( digestedProperty.literalType ).toBeNull();
		} );

		it( hasProperty(
			INSTANCE,
			"language",
			"string",
			"The language the property is in."
		), ():void => {
			expect( digestedProperty.language ).toBeUndefined();
		} );

		it( hasProperty(
			INSTANCE,
			"containerType",
			"Carbon.ObjectSchema.ContainerType",
			"The type of container the property is. It's `null` if the property is no container type."
		), ():void => {
			expect( digestedProperty.containerType ).toBeDefined();
			expect( digestedProperty.containerType ).toBeNull();
		} );

	} );

	describe( clazz( "Carbon.ObjectSchema.Digester", "Class with functions to standardize a JSON-LD Context Schema." ), ():void => {

		describe( method( STATIC, "digestSchema" ), ():void => {

			it( hasSignature(
				"Processes a schema to standardize it before using it.", [
					{ name: "schema", type: "Carbon.ObjectSchema.Class" },
				],
				{ type: "Carbon.ObjectSchema.DigestedObjectSchema" }
			), ():void => {} );

			it( hasSignature(
				"Processes several schemas to standardize and combine them before using them.", [
					{ name: "schemas", type: "Array<Carbon.ObjectSchema.Class>" },
				],
				{ type: "Carbon.ObjectSchema.DigestedObjectSchema" }
			), ():void => {} );

			it( "should exists", ():void => {
				expect( ObjectSchema.Digester.digestSchema ).toBeDefined();
				expect( ObjectSchema.Digester.digestSchema ).toEqual( jasmine.any( Function ) );
			} );


			it( "should digest @vocab", ():void => {
				const schema:ObjectSchema.DigestedObjectSchema = ObjectSchema.Digester.digestSchema( {
					"@vocab": "https://example.com/ns#",
				} );

				expect( schema.vocab ).toEqual( "https://example.com/ns#" );
			} );

			it( "should digest @base", ():void => {
				const schema:ObjectSchema.DigestedObjectSchema = ObjectSchema.Digester.digestSchema( {
					"@base": "https://example.com/",
				} );

				expect( schema.base ).toEqual( "https://example.com/" );
			} );

			it( "should digest @language", ():void => {
				const schema:ObjectSchema.DigestedObjectSchema = ObjectSchema.Digester.digestSchema( {
					"@language": "en",
				} );

				expect( schema.language ).toEqual( "en" );
			} );

			it( "should digest prefixes", ():void => {
				const schema:ObjectSchema.DigestedObjectSchema = ObjectSchema.Digester.digestSchema( {
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
				const spy:jasmine.Spy = spyOn( ObjectSchema.Digester, "digestProperty" )
					.and.callThrough();

				const schema:ObjectSchema.DigestedObjectSchema = ObjectSchema.Digester.digestSchema( {
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
				const schema:ObjectSchema.DigestedObjectSchema = ObjectSchema.Digester.digestSchema( [
					{ "@vocab": "https://example.com/ns-1#" },
					{ "@vocab": "https://example.com/ns-2#" },
					{},
				] );

				expect( schema.vocab ).toBe( "https://example.com/ns-2#" );
			} );

			it( "should keep last set @base", ():void => {
				const schema:ObjectSchema.DigestedObjectSchema = ObjectSchema.Digester.digestSchema( [
					{ "@base": "https://example.com/base-1/" },
					{ "@base": "https://example.com/base-2/" },
					{},
				] );

				expect( schema.base ).toBe( "https://example.com/base-2/" );
			} );

			it( "should keep last set @language", ():void => {
				const schema:ObjectSchema.DigestedObjectSchema = ObjectSchema.Digester.digestSchema( [
					{ "@language": "en-US" },
					{ "@language": "en-UK" },
					{},
				] );

				expect( schema.language ).toBe( "en-UK" );
			} );

			it( "should combine prefixes", ():void => {
				const schema:ObjectSchema.DigestedObjectSchema = ObjectSchema.Digester.digestSchema( [
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
				const schema:ObjectSchema.DigestedObjectSchema = ObjectSchema.Digester.digestSchema( [
					{ "prefix": "https://example.com/prefix-1/ns#" },
					{ "prefix": "https://example.com/prefix-2/ns#" },
					{},
				] );

				expect( schema.prefixes ).toEqual( new Map( [
					[ "prefix", "https://example.com/prefix-2/ns#" ],
				] ) );
			} );

			it( "should combine properties", ():void => {
				const spy:jasmine.Spy = spyOn( ObjectSchema.Digester, "digestProperty" )
					.and.callThrough();

				const schema:ObjectSchema.DigestedObjectSchema = ObjectSchema.Digester.digestSchema( [
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
				const spy:jasmine.Spy = spyOn( ObjectSchema.Digester, "digestProperty" )
					.and.callThrough();

				const schema:ObjectSchema.DigestedObjectSchema = ObjectSchema.Digester.digestSchema( [
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
					{ name: "definition", type: "Carbon.ObjectSchema.PropertyDefinition" },
				],
				{ type: "Carbon.ObjectSchema.DigestedPropertyDefinition" }
			), ():void => {} );

			it( "should exists", ():void => {
				expect( ObjectSchema.Digester.digestProperty ).toBeDefined();
				expect( ObjectSchema.Digester.digestProperty ).toEqual( jasmine.any( Function ) );
			} );


			it( "should digest @id", ():void => {
				const definition:ObjectSchema.DigestedPropertyDefinition = ObjectSchema.Digester.digestProperty( "property", {
					"@id": "https://example.com/ns#property",
				} );

				expect( definition ).toEqual( jasmine.objectContaining( {
					uri: "https://example.com/ns#property",
				} ) );
			} );

			it( "should digest name when @id", ():void => {
				const definition:ObjectSchema.DigestedPropertyDefinition = ObjectSchema.Digester.digestProperty( "property", {} );

				expect( definition ).toEqual( jasmine.objectContaining( {
					uri: "property",
				} ) );
			} );

			it( "should digest @type when string", ():void => {
				const definition:ObjectSchema.DigestedPropertyDefinition = ObjectSchema.Digester.digestProperty( "property", {
					"@type": "https://example.com/ns#type",
				} );

				expect( definition ).toEqual( jasmine.objectContaining( {
					literal: true,
					literalType: "https://example.com/ns#type",
				} ) );
			} );

			it( "should digest @type when @id", ():void => {
				const definition:ObjectSchema.DigestedPropertyDefinition = ObjectSchema.Digester.digestProperty( "property", {
					"@type": "@id",
				} );

				expect( definition ).toEqual( jasmine.objectContaining( {
					literal: false,
					pointerType: ObjectSchema.PointerType.ID,
				} ) );
			} );

			it( "should digest @type when @vocab", ():void => {
				const definition:ObjectSchema.DigestedPropertyDefinition = ObjectSchema.Digester.digestProperty( "property", {
					"@type": "@vocab",
				} );

				expect( definition ).toEqual( jasmine.objectContaining( {
					literal: false,
					pointerType: ObjectSchema.PointerType.VOCAB,
				} ) );
			} );

			it( "should digest @language", ():void => {
				const definition:ObjectSchema.DigestedPropertyDefinition = ObjectSchema.Digester.digestProperty( "property", {
					"@language": "en",
				} );

				expect( definition ).toEqual( jasmine.objectContaining( {
					language: "en",
				} ) );
			} );

			it( "should digest @container when @set", ():void => {
				const definition:ObjectSchema.DigestedPropertyDefinition = ObjectSchema.Digester.digestProperty( "property", {
					"@container": "@set",
				} );

				expect( definition ).toEqual( jasmine.objectContaining( {
					containerType: ObjectSchema.ContainerType.SET,
				} ) );
			} );

			it( "should digest @container when @list", ():void => {
				const definition:ObjectSchema.DigestedPropertyDefinition = ObjectSchema.Digester.digestProperty( "property", {
					"@container": "@list",
				} );

				expect( definition ).toEqual( jasmine.objectContaining( {
					containerType: ObjectSchema.ContainerType.LIST,
				} ) );
			} );

			it( "should digest @container when @language", ():void => {
				const definition:ObjectSchema.DigestedPropertyDefinition = ObjectSchema.Digester.digestProperty( "property", {
					"@container": "@language",
				} );

				expect( definition ).toEqual( jasmine.objectContaining( {
					containerType: ObjectSchema.ContainerType.LANGUAGE,
				} ) );
			} );

		} );

		describe( method( STATIC, "combineDigestedObjectSchemas" ), ():void => {

			it( hasSignature(
				"Combine several standardized schemas into one.", [
					{ name: "digestedSchemas", type: "Carbon.ObjectSchema.DigestedObjectSchema[]" },
				],
				{ type: "Carbon.ObjectSchema.DigestedObjectSchema" }
			), ():void => {} );

			it( "should exists", ():void => {
				expect( ObjectSchema.Digester.combineDigestedObjectSchemas ).toBeDefined();
				expect( ObjectSchema.Digester.combineDigestedObjectSchemas ).toEqual( jasmine.any( Function ) );
			} );


			it( "should return new schema reference", ():void => {
				const schema1:ObjectSchema.DigestedObjectSchema = new ObjectSchema.DigestedObjectSchema();
				const schema2:ObjectSchema.DigestedObjectSchema = new ObjectSchema.DigestedObjectSchema();

				const schema:ObjectSchema.DigestedObjectSchema = ObjectSchema.Digester.combineDigestedObjectSchemas( [
					schema1,
					schema2,
				] );

				expect( schema ).not.toBe( schema1 );
				expect( schema ).not.toBe( schema2 );
			} );

			it( "should keep last set vocab", ():void => {
				const schema:ObjectSchema.DigestedObjectSchema = ObjectSchema.Digester.combineDigestedObjectSchemas( [
					createSchema( { vocab: "https://example.com/ns-1#" } ),
					createSchema( { vocab: "https://example.com/ns-2#" } ),
					createSchema( {} ),
				] );

				expect( schema.vocab ).toBe( "https://example.com/ns-2#" );
			} );

			it( "should keep last set base", ():void => {
				const schema:ObjectSchema.DigestedObjectSchema = ObjectSchema.Digester.combineDigestedObjectSchemas( [
					createSchema( { base: "https://example.com/base-1/" } ),
					createSchema( { base: "https://example.com/base-2/" } ),
					createSchema( {} ),
				] );

				expect( schema.base ).toBe( "https://example.com/base-2/" );
			} );

			it( "should keep last set language", ():void => {
				const schema:ObjectSchema.DigestedObjectSchema = ObjectSchema.Digester.combineDigestedObjectSchemas( [
					createSchema( { language: "en-US" } ),
					createSchema( { language: "en-UK" } ),
					createSchema( {} ),
				] );

				expect( schema.language ).toBe( "en-UK" );
			} );

			it( "should combine prefixes", ():void => {
				const schema:ObjectSchema.DigestedObjectSchema = ObjectSchema.Digester.combineDigestedObjectSchemas( [
					createSchema( { prefixes: new Map( [ [ "prefix1", "https://example.com/prefix-1/ns#" ] ] ) } ),
					createSchema( { prefixes: new Map( [ [ "prefix2", "https://example.com/prefix-2/ns#" ] ] ) } ),
					createSchema( {} ),
				] );

				expect( schema.prefixes ).toEqual( new Map( [
					[ "prefix1", "https://example.com/prefix-1/ns#" ],
					[ "prefix2", "https://example.com/prefix-2/ns#" ],
				] ) );
			} );

			it( "should keep last same prefix", ():void => {
				const schema:ObjectSchema.DigestedObjectSchema = ObjectSchema.Digester.combineDigestedObjectSchemas( [
					createSchema( { prefixes: new Map( [ [ "prefix", "https://example.com/prefix-1/ns#" ] ] ) } ),
					createSchema( { prefixes: new Map( [ [ "prefix", "https://example.com/prefix-2/ns#" ] ] ) } ),
					createSchema( {} ),
				] );

				expect( schema.prefixes ).toEqual( new Map( [
					[ "prefix", "https://example.com/prefix-2/ns#" ],
				] ) );
			} );

			it( "should combine properties", ():void => {
				const schema:ObjectSchema.DigestedObjectSchema = ObjectSchema.Digester.combineDigestedObjectSchemas( [
					createSchema( { properties: new Map( [ [ "property1", createProperty( { uri: "https://example.com/ns#property1" } ) ] ] ) } ),
					createSchema( { properties: new Map( [ [ "property2", createProperty( { uri: "https://example.com/ns#property2" } ) ] ] ) } ),
					createSchema( {} ),
				] );

				expect( schema.properties ).toEqual( new Map( [
					[ "property1", createProperty( { uri: "https://example.com/ns#property1" } ) ],
					[ "property2", createProperty( { uri: "https://example.com/ns#property2" } ) ],
				] ) );
			} );

			it( "should keep last same property", ():void => {
				const schema:ObjectSchema.DigestedObjectSchema = ObjectSchema.Digester.combineDigestedObjectSchemas( [
					createSchema( { properties: new Map( [ [ "property", createProperty( { uri: "https://example.com/ns#property1" } ) ] ] ) } ),
					createSchema( { properties: new Map( [ [ "property", createProperty( { uri: "https://example.com/ns#property2" } ) ] ] ) } ),
					createSchema( {} ),
				] );

				expect( schema.properties ).toEqual( new Map( [
					[ "property", createProperty( { uri: "https://example.com/ns#property2" } ) ],
				] ) );
			} );

		} );

	} );

	describe( clazz( "Carbon.ObjectSchema.Util", "Class with useful functions that use schemas." ), ():void => {

		it( isDefined(), ():void => {
			expect( ObjectSchema.Util ).toBeDefined();
			expect( Utils.isFunction( ObjectSchema.Util ) ).toBe( true );
		} );

		describe( method( STATIC, "resolveURI" ), ():void => {

			it( hasSignature(
				"Tries to resolve a non absolute URI using the schema and the configuration provided.", [
					{ name: "uri", type: "string", description: "The URI to ve resolved." },
					{ name: "schema", type: "Carbon.ObjectSchema.DigestedObjectSchema", description: "The schema where to find the prefixes or the default vocabulary to utilize." },
					{ name: "relativeTo", type: "{ vocab?:boolean, base?:boolean }", optional: true, description: "An additional configuration object to specify the resolution mode of a relative URI, where the vocab takes priority before the base." },
				],
				{ type: "string", description: "The resolved absolute URI." } ), ():void => {
			} );

			it( "should exists", ():void => {
				expect( ObjectSchema.Util.resolveURI ).toBeDefined();
				expect( ObjectSchema.Util.resolveURI ).toEqual( jasmine.any( Function ) );
			} );


			it( "should not alter absolute uris", ():void => {
				const schema:ObjectSchema.DigestedObjectSchema = createSchema( {
					vocab: "https://example.com/ns#",
					prefixes: new Map( [
						[ "prefix", "https://example.com/prefix#" ],
					] ),
				} );

				expect( ObjectSchema.Util.resolveURI( "https://example.com/", schema ) ).toBe( "https://example.com/" );
				expect( ObjectSchema.Util.resolveURI( "http://example.com/resource/", schema ) ).toBe( "http://example.com/resource/" );
			} );

			it( "should not alter blank node labels", ():void => {
				const schema:ObjectSchema.DigestedObjectSchema = createSchema( {
					vocab: "https://example.com/ns#",
					prefixes: new Map( [
						[ "_", "https://example.com/prefix#" ],
					] ),
				} );

				expect( ObjectSchema.Util.resolveURI( "_:blank-node", schema ) ).toBe( "_:blank-node" );
				expect( ObjectSchema.Util.resolveURI( "_:1", schema ) ).toBe( "_:1" );
			} );

			it( "should resolve relative with vocab schema", ():void => {
				const schema:ObjectSchema.DigestedObjectSchema = createSchema( {
					vocab: "https://example.com/ns#",
				} );

				expect( ObjectSchema.Util.resolveURI( "relative-uri", schema, { vocab: true } ) ).toBe( "https://example.com/ns#relative-uri" );
				expect( ObjectSchema.Util.resolveURI( "another", schema, { vocab: true } ) ).toBe( "https://example.com/ns#another" );
			} );

			it( "should resolve relative with base schema", ():void => {
				const schema:ObjectSchema.DigestedObjectSchema = createSchema( {
					base: "https://example.com/ns#",
				} );

				expect( ObjectSchema.Util.resolveURI( "relative-uri", schema, { base: true } ) ).toBe( "https://example.com/relative-uri" );
				expect( ObjectSchema.Util.resolveURI( "another", schema, { base: true } ) ).toBe( "https://example.com/another" );
			} );

			it( "should resolve relative with vocab schema before base", ():void => {
				const schema:ObjectSchema.DigestedObjectSchema = createSchema( {
					vocab: "https://example.com/ns#",
					base: "https://example.com/ns#",
				} );

				expect( ObjectSchema.Util.resolveURI( "relative-uri", schema, { vocab: true, base: true } ) ).toBe( "https://example.com/ns#relative-uri" );
				expect( ObjectSchema.Util.resolveURI( "another", schema, { vocab: true, base: true } ) ).toBe( "https://example.com/ns#another" );
			} );

			it( "should resolve relative with base schema when no vocab", ():void => {
				const schema:ObjectSchema.DigestedObjectSchema = createSchema( {
					base: "https://example.com/ns#",
				} );

				expect( ObjectSchema.Util.resolveURI( "relative-uri", schema, { vocab: true, base: true } ) ).toBe( "https://example.com/relative-uri" );
				expect( ObjectSchema.Util.resolveURI( "another", schema, { vocab: true, base: true } ) ).toBe( "https://example.com/another" );
			} );

			it( "should resolve prefixed name from prefixes", ():void => {
				const schema:ObjectSchema.DigestedObjectSchema = createSchema( {
					prefixes: new Map( [
						[ "prefix1", "https://example.com/prefix-1#" ],
						[ "prefix2", "https://example.com/prefix-2/" ],
					] ),
				} );

				expect( ObjectSchema.Util.resolveURI( "prefix1:slug", schema ) ).toBe( "https://example.com/prefix-1#slug" );
				expect( ObjectSchema.Util.resolveURI( "prefix2:resource/", schema ) ).toBe( "https://example.com/prefix-2/resource/" );
			} );

			it( "should resolve prefixed name from properties' @id", ():void => {
				const schema:ObjectSchema.DigestedObjectSchema = createSchema( {
					properties: new Map( [
						[ "prefix1", createProperty( { uri: "https://example.com/prefix-1#" } ) ],
						[ "prefix2", createProperty( { uri: "https://example.com/prefix-2/" } ) ],
					] ),
				} );

				expect( ObjectSchema.Util.resolveURI( "prefix1:slug", schema ) ).toBe( "https://example.com/prefix-1#slug" );
				expect( ObjectSchema.Util.resolveURI( "prefix2:resource/", schema ) ).toBe( "https://example.com/prefix-2/resource/" );
			} );

			it( "should resolve recursive prefixed name", ():void => {
				const schema:ObjectSchema.DigestedObjectSchema = createSchema( {
					prefixes: new Map( [
						[ "prefix1", "https://example.com/prefix-1#" ],
						[ "prefix2", "prefix1:?" ],
					] ),
				} );

				expect( ObjectSchema.Util.resolveURI( "prefix2:query", schema ) ).toBe( "https://example.com/prefix-1#?query" );
				expect( ObjectSchema.Util.resolveURI( "prefix2:another&flag", schema ) ).toBe( "https://example.com/prefix-1#?another&flag" );
			} );

			it( "should relative from prefix", ():void => {
				const schema:ObjectSchema.DigestedObjectSchema = createSchema( {
					prefixes: new Map( [
						[ "Restaurant", "https://example.com/ns#Restaurant" ],
						[ "Brewery", "https://example.com/ns#Brewery" ],
					] ),
				} );

				expect( ObjectSchema.Util.resolveURI( "Restaurant", schema ) ).toBe( "https://example.com/ns#Restaurant" );
				expect( ObjectSchema.Util.resolveURI( "Brewery", schema ) ).toBe( "https://example.com/ns#Brewery" );
			} );

		} );

	} );

} );
