/// <reference path="./../typings/jasmine/jasmine.d.ts" />
/// <reference path="./../typings/jasmine-ajax/mock-ajax.d.ts" />
/// <reference path="./../typings/typings.d.ts" />

import {
	INSTANCE,
	STATIC,

	module,
	submodule,

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

	MethodArgument,
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

	describe( clazz( "Carbon.ObjectSchema.Digester", "" ), ():void => {
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
	});
});
