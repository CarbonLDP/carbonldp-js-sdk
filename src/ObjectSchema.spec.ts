/// <reference path="./../typings/typings.d.ts" />

import {
	INSTANCE,
	STATIC,

	module,

	isDefined,

	interfaze,
	clazz,
	method,

	hasConstructor,
	hasMethod,
	hasSignature,
	hasProperty,
	hasInterface,
	extendsClass,
	enumeration,
	hasEnumeral
} from "./test/JasmineExtender";

import * as Errors from "./Errors";
import * as Pointer from "./Pointer";
import * as RDF from "./RDF";
import * as Utils from "./Utils";

import * as ObjectSchema from "./ObjectSchema";

describe( module( "Carbon/ObjectSchema" ), ():void => {

	it( isDefined(), ():void => {
		expect( ObjectSchema ).toBeDefined();
		expect( Utils.isObject( ObjectSchema ) ).toEqual( true );
	});

	describe( enumeration(
		"Carbon.ObjectSchema.ContainerType",
		"Enum for the types a container can be."
	), ():void => {

		it( isDefined(), ():void => {
			expect( ObjectSchema.ContainerType ).toBeDefined();
			expect( Utils.isObject( ObjectSchema.ContainerType ) ).toBe( true );
		});

		it( hasEnumeral(
			"SET"
		), ():void => {
			expect( ObjectSchema.ContainerType.SET ).toBeDefined();
		});

		it( hasEnumeral(
			"LIST"
		), ():void => {
			expect( ObjectSchema.ContainerType.LIST ).toBeDefined();
		});

		it( hasEnumeral(
			"LANGUAGE"
		), ():void => {
			expect( ObjectSchema.ContainerType.LANGUAGE ).toBeDefined();
		});

	});

	describe( clazz(
		"Carbon.ObjectSchema.DigestedObjectSchema",
		"Class of a standardized Schema."
	), ():void => {

		it( isDefined(), ():void => {
			expect( ObjectSchema.DigestedObjectSchema ).toBeDefined();
			expect( Utils.isFunction( ObjectSchema.DigestedObjectSchema ) ).toBe( true );
		});

		let digestedSchema:ObjectSchema.DigestedObjectSchema;

		beforeEach( ():void => {
			digestedSchema = new ObjectSchema.DigestedObjectSchema();
		});

		it( hasConstructor(), ():void => {
			expect( digestedSchema ).toBeTruthy();
			expect( digestedSchema instanceof ObjectSchema.DigestedObjectSchema ).toBe( true );
		});

		it( hasProperty(
			INSTANCE,
			"base",
			"string",
			"This property is initialized with an empty string."
		), ():void => {
			expect( digestedSchema.base ).toBeDefined();
			expect( Utils.isString( digestedSchema.base ) ).toBe( true );
			expect( digestedSchema.base ).toBe( "" );
		});

		it( hasProperty(
			INSTANCE,
			"prefixes",
			"Map<string, Carbon.RDF.URI.Class>",
			"This property is initialized with an empty Map."
		), ():void => {
			expect( digestedSchema.prefixes ).toBeDefined();
			expect( Utils.isMap( digestedSchema.prefixes ) ).toBe( true );
			expect( digestedSchema.prefixes.size ).toBe( 0 );
		});

		it( hasProperty(
			INSTANCE,
			"properties",
			"Map<string, Carbon.ObjectSchema.DigestedPropertyDefinition>",
			"This property is initialized with an empty Map."
		), ():void => {
			expect( digestedSchema.properties ).toBeDefined();
			expect( Utils.isMap( digestedSchema.properties ) ).toBe( true );
			expect( digestedSchema.properties.size ).toBe( 0 );
		});

		it( hasProperty(
			INSTANCE,
			"prefixedURIs",
			"Map<string, Carbon.RDF.URI.Class[]>",
			"This property is initialized with an empty Map."
		), ():void => {
			expect( digestedSchema.prefixedURIs ).toBeDefined();
			expect( Utils.isMap( digestedSchema.prefixedURIs ) ).toBe( true );
			expect( digestedSchema.prefixedURIs.size ).toBe( 0 );
		});

	});

	describe( clazz(
		"Carbon.ObjectSchema.DigestedPropertyDefinition",
		"Class for standardized object properties in a Schema."
	), ():void => {

		it( isDefined(), ():void => {
			expect( ObjectSchema.DigestedPropertyDefinition ).toBeDefined();
			expect( Utils.isFunction( ObjectSchema.DigestedPropertyDefinition ) ).toBe( true );
		});

		let digestedProperty:ObjectSchema.DigestedPropertyDefinition;
		beforeEach( ():void => {
			digestedProperty = new ObjectSchema.DigestedPropertyDefinition();
		});

		it( hasConstructor(), ():void => {
			expect( digestedProperty ).toBeTruthy();
			expect( digestedProperty instanceof ObjectSchema.DigestedPropertyDefinition ).toBe( true );
		});

		it( hasProperty(
			INSTANCE,
			"uri",
			"Carbon.RDF.URI.Class",
			"This property is initialized with null."
		), ():void => {
			expect( digestedProperty.uri ).toBeDefined();
			expect( digestedProperty.uri ).toBeNull();
		});

		it( hasProperty(
			INSTANCE,
			"literal",
			"boolean",
			"This property is initialized with null."
		), ():void => {
			expect( digestedProperty.literal ).toBeDefined();
			expect( digestedProperty.literal ).toBeNull();
		});

		it( hasProperty(
			INSTANCE,
			"uri",
			"Carbon.RDF.URI.Class",
			"This property is initialized with null."
		), ():void => {
			expect( digestedProperty.uri ).toBeDefined();
			expect( digestedProperty.uri ).toBeNull();
		});

		it( hasProperty(
			INSTANCE,
			"literalType",
			"Carbon.RDF.URI.Class",
			"This property is initialized with null."
		), ():void => {
			expect( digestedProperty.literalType ).toBeDefined();
			expect( digestedProperty.literalType ).toBeNull();
		});

		it( hasProperty(
			INSTANCE,
			"language",
			"string",
			"This property is initialized with null."
		), ():void => {
			expect( digestedProperty.language ).toBeDefined();
			expect( digestedProperty.language ).toBeNull();
		});

		it( hasProperty(
			INSTANCE,
			"containerType",
			"Carbon.ObjectSchema.ContainerType",
			"This property is initialized with null."
		), ():void => {
			expect( digestedProperty.containerType ).toBeDefined();
			expect( digestedProperty.containerType ).toBeNull();
		});

	});

	describe( clazz( "Carbon.ObjectSchema.Digester", "Class with options for standardize a JSON-LD Schema." ), ():void => {
		describe( method( STATIC, "digestSchema" ), ():void => {
			it( hasSignature( `
					Processes a schema to standardize it before using it.
				`, [
				{ name: "schema", type: "Carbon.ObjectSchema.Class" }
			], { type: "Carbon.ObjectSchema.DigestedObjectSchema" } ), ():void => {
				expect( ObjectSchema.Digester.digestSchema ).toBeDefined();
				expect( Utils.isFunction( ObjectSchema.Digester.digestSchema ) ).toBeDefined();

				let schema:ObjectSchema.Class = {
					"skos": "http://www.w3.org/2004/02/skos/core#",
					"dct": "http://purl.org/dc/terms/",
					"xsd": "http://www.w3.org/2001/XMLSchema#",
					"hasTopConcept": {
						"@id": "skos:hasTopConcept",
						"@type": "@id",
						"@container": "@set",
					},
					"name": {
						"@id": "dct:name",
						"@type": "xsd:string",
					},
					"created": {
						"@id": "dct:created",
						"@type": "xsd:datetime",
					},
				};

				let digestedSchema:ObjectSchema.DigestedObjectSchema = ObjectSchema.Digester.digestSchema( schema );

				expect( digestedSchema.prefixes.size ).toEqual( 3 );
				expect( digestedSchema.prefixes.has( "skos" ) ).toEqual( true );
				expect( digestedSchema.prefixes.get( "skos" ) instanceof RDF.URI.Class ).toEqual( true );
				expect( digestedSchema.prefixes.get( "skos" ).toString() ).toEqual( "http://www.w3.org/2004/02/skos/core#" );

				expect( digestedSchema.properties.size ).toEqual( 3 );
				expect( digestedSchema.properties.has( "hasTopConcept" ) ).toEqual( true );
				expect( digestedSchema.properties.get( "hasTopConcept" ) instanceof ObjectSchema.DigestedPropertyDefinition ).toEqual( true );
				expect( digestedSchema.properties.get( "hasTopConcept" ).literal ).toEqual( false );
				expect( digestedSchema.properties.get( "hasTopConcept" ).literalType ).toEqual( null );
				expect( digestedSchema.properties.get( "hasTopConcept" ).uri instanceof RDF.URI.Class ).toEqual( true );
				expect( digestedSchema.properties.get( "hasTopConcept" ).uri.toString() ).toEqual( "http://www.w3.org/2004/02/skos/core#hasTopConcept" );
				expect( digestedSchema.properties.get( "hasTopConcept" ).containerType ).toEqual( ObjectSchema.ContainerType.SET );
				expect( digestedSchema.properties.get( "hasTopConcept" ).language ).toEqual( null );

				expect( digestedSchema.properties.has( "name" ) ).toEqual( true );
				expect( digestedSchema.properties.get( "name" ) instanceof ObjectSchema.DigestedPropertyDefinition ).toEqual( true );
				expect( digestedSchema.properties.get( "name" ).literal ).toEqual( true );
				expect( digestedSchema.properties.get( "name" ).literalType instanceof RDF.URI.Class ).toEqual( true );
				expect( digestedSchema.properties.get( "name" ).literalType.toString() ).toEqual( "http://www.w3.org/2001/XMLSchema#string" );
				expect( digestedSchema.properties.get( "name" ).uri instanceof RDF.URI.Class ).toEqual( true );
				expect( digestedSchema.properties.get( "name" ).uri.toString() ).toEqual( "http://purl.org/dc/terms/name" );
				expect( digestedSchema.properties.get( "name" ).containerType ).toEqual( null );
				expect( digestedSchema.properties.get( "name" ).language ).toEqual( null );
			});

			it( hasSignature( `
					Processes several schemas to standardize and combine them before using them.
				`, [
				{ name: "schemas", type: "Array<Carbon.ObjectSchema.Class>" }
			], { type: "Carbon.ObjectSchema.DigestedObjectSchema" } ), ():void => {
				expect( ObjectSchema.Digester.digestSchema ).toBeDefined();
				expect( Utils.isFunction( ObjectSchema.Digester.digestSchema ) ).toBeDefined();

				let schemas:ObjectSchema.Class[] = [
					{
						"skos": "http://www.w3.org/2004/02/skos/core#",
						"dct": "http://purl.org/dc/terms/",
						"xsd": "http://www.w3.org/2001/XMLSchema#",
					},
					{
						"hasTopConcept": {
							"@id": "skos:hasTopConcept",
							"@type": "@id",
							"@container": "@set",
						},
						"name": {
							"@id": "dct:name",
							"@type": "xsd:string",
						},
						"created": {
							"@id": "dct:created",
							"@type": "xsd:datetime",
						},
					},
				];

				let digestedSchema:ObjectSchema.DigestedObjectSchema = ObjectSchema.Digester.digestSchema( schemas );

				expect( digestedSchema.prefixes.size ).toEqual( 3 );
				expect( digestedSchema.prefixes.has( "skos" ) ).toEqual( true );
				expect( digestedSchema.prefixes.get( "skos" ) instanceof RDF.URI.Class ).toEqual( true );
				expect( digestedSchema.prefixes.get( "skos" ).toString() ).toEqual( "http://www.w3.org/2004/02/skos/core#" );

				expect( digestedSchema.properties.size ).toEqual( 3 );
				expect( digestedSchema.properties.has( "hasTopConcept" ) ).toEqual( true );
				expect( digestedSchema.properties.get( "hasTopConcept" ) instanceof ObjectSchema.DigestedPropertyDefinition ).toEqual( true );
				expect( digestedSchema.properties.get( "hasTopConcept" ).literal ).toEqual( false );
				expect( digestedSchema.properties.get( "hasTopConcept" ).literalType ).toEqual( null );
				expect( digestedSchema.properties.get( "hasTopConcept" ).uri instanceof RDF.URI.Class ).toEqual( true );
				expect( digestedSchema.properties.get( "hasTopConcept" ).uri.toString() ).toEqual( "http://www.w3.org/2004/02/skos/core#hasTopConcept" );
				expect( digestedSchema.properties.get( "hasTopConcept" ).containerType ).toEqual( ObjectSchema.ContainerType.SET );
				expect( digestedSchema.properties.get( "hasTopConcept" ).language ).toEqual( null );

				expect( digestedSchema.properties.has( "name" ) ).toEqual( true );
				expect( digestedSchema.properties.get( "name" ) instanceof ObjectSchema.DigestedPropertyDefinition ).toEqual( true );
				expect( digestedSchema.properties.get( "name" ).literal ).toEqual( true );
				expect( digestedSchema.properties.get( "name" ).literalType instanceof RDF.URI.Class ).toEqual( true );
				expect( digestedSchema.properties.get( "name" ).literalType.toString() ).toEqual( "http://www.w3.org/2001/XMLSchema#string" );
				expect( digestedSchema.properties.get( "name" ).uri instanceof RDF.URI.Class ).toEqual( true );
				expect( digestedSchema.properties.get( "name" ).uri.toString() ).toEqual( "http://purl.org/dc/terms/name" );
				expect( digestedSchema.properties.get( "name" ).containerType ).toEqual( null );
				expect( digestedSchema.properties.get( "name" ).language ).toEqual( null );
			});
		});

		it( hasMethod(
			STATIC,
			"combineDigestedObjectSchemas",
			"Combine several standardized schemas in one.", [
				{ name: "digestedSchemas", type: "Carbon.ObjectSchema.DigestedObjectSchema[]" }
			],
			{ type: "Carbon.ObjectSchema.DigestedObjectSchema" }
		), ():void => {

			expect( ObjectSchema.Digester.digestSchema ).toBeDefined();
			expect( Utils.isFunction( ObjectSchema.Digester.digestSchema ) ).toBeDefined();

			let schemas:ObjectSchema.Class[] = [
				{
					"skos": "http://www.w3.org/2004/02/skos/core#",
					"hasTopConcept": {
						"@id": "skos:hasTopConcept",
						"@type": "@id",
						"@container": "@set",
					},
				},
				{
					"dct": "http://purl.org/dc/terms/",
					"xsd": "http://www.w3.org/2001/XMLSchema#",
					"name": {
						"@id": "dct:name",
						"@type": "xsd:string",
					},
				},
				{
					"dct": "http://purl.org/dc/terms/",
					"xsd": "http://www.w3.org/2001/XMLSchema#",
					"name": {
						"@id": "dct:name",
						"@type": "xsd:string",
					},
					"created": {
						"@id": "dct:created",
						"@type": "xsd:datetime",
					},
				},
			];

			let digestedSchemas:ObjectSchema.DigestedObjectSchema[] = [];
			for ( let schema of schemas ) {
				digestedSchemas.push( ObjectSchema.Digester.digestSchema( schema ) );
			}

			let digestedSchema:ObjectSchema.DigestedObjectSchema = ObjectSchema.Digester.combineDigestedObjectSchemas( digestedSchemas );

			expect( digestedSchema.prefixes.size ).toEqual( 3 );
			expect( digestedSchema.prefixes.has( "skos" ) ).toEqual( true );
			expect( digestedSchema.prefixes.get( "skos" ) instanceof RDF.URI.Class ).toEqual( true );
			expect( digestedSchema.prefixes.get( "skos" ).toString() ).toEqual( "http://www.w3.org/2004/02/skos/core#" );

			expect( digestedSchema.properties.size ).toEqual( 3 );
			expect( digestedSchema.properties.has( "hasTopConcept" ) ).toEqual( true );
			expect( digestedSchema.properties.get( "hasTopConcept" ) instanceof ObjectSchema.DigestedPropertyDefinition ).toEqual( true );
			expect( digestedSchema.properties.get( "hasTopConcept" ).literal ).toEqual( false );
			expect( digestedSchema.properties.get( "hasTopConcept" ).literalType ).toEqual( null );
			expect( digestedSchema.properties.get( "hasTopConcept" ).uri instanceof RDF.URI.Class ).toEqual( true );
			expect( digestedSchema.properties.get( "hasTopConcept" ).uri.toString() ).toEqual( "http://www.w3.org/2004/02/skos/core#hasTopConcept" );
			expect( digestedSchema.properties.get( "hasTopConcept" ).containerType ).toEqual( ObjectSchema.ContainerType.SET );
			expect( digestedSchema.properties.get( "hasTopConcept" ).language ).toEqual( null );

			expect( digestedSchema.properties.has( "name" ) ).toEqual( true );
			expect( digestedSchema.properties.get( "name" ) instanceof ObjectSchema.DigestedPropertyDefinition ).toEqual( true );
			expect( digestedSchema.properties.get( "name" ).literal ).toEqual( true );
			expect( digestedSchema.properties.get( "name" ).literalType instanceof RDF.URI.Class ).toEqual( true );
			expect( digestedSchema.properties.get( "name" ).literalType.toString() ).toEqual( "http://www.w3.org/2001/XMLSchema#string" );
			expect( digestedSchema.properties.get( "name" ).uri instanceof RDF.URI.Class ).toEqual( true );
			expect( digestedSchema.properties.get( "name" ).uri.toString() ).toEqual( "http://purl.org/dc/terms/name" );
			expect( digestedSchema.properties.get( "name" ).containerType ).toEqual( null );
			expect( digestedSchema.properties.get( "name" ).language ).toEqual( null );
		});

	});

});
