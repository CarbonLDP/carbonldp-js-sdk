import { AbstractContext } from "../../AbstractContext";
import { IllegalArgumentError } from "../../Errors/IllegalArgumentError";
import {
	ContainerType,
	DigestedObjectSchema,
	DigestedObjectSchemaProperty,
	ObjectSchemaDigester
} from "../../ObjectSchema";
import {
	clazz,
	constructor,
	extendsClass,
	hasDefaultExport,
	hasSignature,
	INSTANCE,
	method,
	module
} from "../../test/JasmineExtender";
import { QueryContext } from "./QueryContext";

import * as Module from "./QueryContextBuilder";
import DefaultExport, { QueryContextBuilder } from "./QueryContextBuilder";

import {
	QueryProperty,
	QueryPropertyType,
} from "./QueryProperty";

describe( module( "carbonldp/SPARQL/QueryDocument/QueryContextBuilder" ), ():void => {

	it( "should exists", ():void => {
		expect( Module ).toBeDefined();
		expect( Module ).toEqual( jasmine.any( Object ) );
	} );

	it( hasDefaultExport( "CarbonLDP.SPARQL.QueryDocument.QueryContextBuilder.QueryContextBuilder" ), ():void => {
		expect( DefaultExport ).toBeDefined();
		expect( DefaultExport ).toBe( QueryContextBuilder );
	} );

	describe( clazz( "CarbonLDP.SPARQL.QueryDocument.QueryContextBuilder.QueryContextBuilder", "Class with the shared status and data of the query." ), ():void => {

		it( "should exists", ():void => {
			expect( QueryContextBuilder ).toBeDefined();
			expect( QueryContextBuilder ).toEqual( jasmine.any( Function ) );
		} );

		let context:AbstractContext;
		beforeEach( ():void => {
			context = new class extends AbstractContext {
				protected _baseURI:string = "https://example.com/";
			};
		} );

		describe( constructor(), ():void => {

			it( hasSignature(
				[
					{ name: "context", type: "CarbonLDP.Context.Context", optional: true, description: "The carbon context from where the query belongs to." },
				]
			), ():void => {
			} );

			it( "should be instantiable", ():void => {
				const queryContext:QueryContextBuilder = new QueryContextBuilder( context );
				expect( queryContext ).toBeDefined();
				expect( queryContext ).toEqual( jasmine.any( QueryContextBuilder ) );
			} );

			it( "should initialize properties map", ():void => {
				const queryContext:QueryContextBuilder = new QueryContextBuilder( context );
				expect( queryContext[ "_propertiesMap" ] ).toEqual( new Map() );
			} );

		} );

		it( extendsClass( "CarbonLDP.SPARQL.QueryDocument.QueryContext.QueryContext" ), ():void => {
			const queryContext:QueryContextBuilder = new QueryContextBuilder( context );
			expect( queryContext ).toEqual( jasmine.any( QueryContext ) );
		} );

		describe( method( INSTANCE, "hasProperty" ), ():void => {

			it( hasSignature(
				"Returns true if a property with the name provided exists.",
				[
					{ name: "name", type: "string", description: "Name of the property to look for." },
				],
				{ type: "boolean" }
			), ():void => {
			} );

			it( "should exists", ():void => {
				expect( QueryContextBuilder.prototype.hasProperty ).toBeDefined();
				expect( QueryContextBuilder.prototype.hasProperty ).toEqual( jasmine.any( Function ) );
			} );

			it( "should return is a specific property exists", ():void => {
				const queryContext:QueryContextBuilder = new QueryContextBuilder( context );
				queryContext[ "_propertiesMap" ].set( "document", null );
				queryContext[ "_propertiesMap" ].set( "document.property", null );
				queryContext[ "_propertiesMap" ].set( "property.sub-property", null );

				expect( queryContext.hasProperty( "document" ) ).toBe( true );
				expect( queryContext.hasProperty( "document.property" ) ).toBe( true );
				expect( queryContext.hasProperty( "property.sub-property" ) ).toBe( true );

				expect( queryContext.hasProperty( "document2" ) ).toBe( false );
				expect( queryContext.hasProperty( "document.property-2" ) ).toBe( false );
				expect( queryContext.hasProperty( "property.sub-property-2" ) ).toBe( false );
			} );

		} );

		describe( method( INSTANCE, "hasProperties" ), ():void => {

			it( hasSignature(
				"Returns true if the property with the name provided any child properties under him.",
				[
					{ name: "name", type: "string", description: "Name of the property to find if has child properties." },
				],
				{ type: "boolean" }
			), ():void => {
			} );

			it( "should exists", ():void => {
				expect( QueryContextBuilder.prototype.hasProperties ).toBeDefined();
				expect( QueryContextBuilder.prototype.hasProperties ).toEqual( jasmine.any( Function ) );
			} );

			it( "should return if the a named property contains properties", ():void => {
				const queryContext:QueryContextBuilder = new QueryContextBuilder( context );
				queryContext[ "_propertiesMap" ].set( "document.property1", new QueryProperty( queryContext, "_" ) );
				queryContext[ "_propertiesMap" ].set( "document.property2", new QueryProperty( queryContext, "_" ) );
				queryContext[ "_propertiesMap" ].set( "document.property1.property1_1", new QueryProperty( queryContext, "_" ) );

				expect( queryContext.hasProperties( "" ) ).toBe( false );

				expect( queryContext.hasProperties( "document" ) ).toBe( true );

				expect( queryContext.hasProperties( "document_else" ) ).toBe( false );
				expect( queryContext.hasProperties( "another_document" ) ).toBe( false );

				expect( queryContext.hasProperties( "document.property1" ) ).toBe( true );

				expect( queryContext.hasProperties( "document.property1_1" ) ).toBe( false );
				expect( queryContext.hasProperties( "document.property2" ) ).toBe( false );
				expect( queryContext.hasProperties( "document.property1.property1_1" ) ).toBe( false );
			} );

		} );

		describe( method( INSTANCE, "getProperty" ), ():void => {

			it( hasSignature(
				"Return the property with the provided name or `undefined` if does not exists.",
				[
					{ name: "name", type: "string", description: "Name of the property to look for." },
				],
				{ type: "CarbonLDP.SPARQL.QueryDocument.QueryProperty.QueryProperty" }
			), ():void => {
			} );

			it( "should exists", ():void => {
				expect( QueryContextBuilder.prototype.getProperty ).toBeDefined();
				expect( QueryContextBuilder.prototype.getProperty ).toEqual( jasmine.any( Function ) );
			} );

			it( "should return the stored property", ():void => {
				const queryContext:QueryContextBuilder = new QueryContextBuilder( context );

				const nameProperty:QueryProperty = new QueryProperty( queryContext, "name" );
				queryContext[ "_propertiesMap" ].set( "name", nameProperty );

				const subDocumentProperty:QueryProperty = new QueryProperty( queryContext, "document.property" );
				queryContext[ "_propertiesMap" ].set( "document.property", subDocumentProperty );

				const helper:( name:string ) => QueryProperty = ( name:string ) => queryContext.getProperty( name );

				expect( helper( "name" ) ).toBe( nameProperty );
				expect( helper( "document.property" ) ).toBe( subDocumentProperty );
			} );

		} );

		describe( method( INSTANCE, "getProperties" ), ():void => {

			it( hasSignature(
				"Returns all the child properties of the matched one with the name provided.",
				[
					{ name: "name", type: "string", description: "Name of the property to look for its children properties." },
				],
				{ type: "CarbonLDP.SPARQL.QueryDocument.QueryProperty.QueryProperty[]" }
			), ():void => {
			} );

			it( "should exists", ():void => {
				expect( QueryContextBuilder.prototype.getProperties ).toBeDefined();
				expect( QueryContextBuilder.prototype.getProperties ).toEqual( jasmine.any( Function ) );
			} );

			it( "should return empty array when not properties", ():void => {
				const queryContext:QueryContextBuilder = new QueryContextBuilder( context );

				expect( queryContext.getProperties( "document" ) ).toEqual( [] );
				expect( queryContext.getProperties( "document.property-1" ) ).toEqual( [] );
				expect( queryContext.getProperties( "document-2" ) ).toEqual( [] );
			} );

			it( "should return the properties of the first level", ():void => {
				const queryContext:QueryContextBuilder = new QueryContextBuilder( context );
				queryContext[ "_propertiesMap" ].set( "document.sub-document", null );
				queryContext[ "_propertiesMap" ].set( "document.property-2", null );
				queryContext[ "_propertiesMap" ].set( "document.property-3", null );
				queryContext[ "_propertiesMap" ].set( "document.sub-document.property-1", null );
				queryContext[ "_propertiesMap" ].set( "document.sub-document.property-2", null );

				expect( queryContext.getProperties( "document" ) ).toEqual( [ null, null, null ] );
			} );

			it( "should return the properties of the second level", ():void => {
				const queryContext:QueryContextBuilder = new QueryContextBuilder( context );
				queryContext[ "_propertiesMap" ].set( "document.sub-document", null );
				queryContext[ "_propertiesMap" ].set( "document.property-2", null );
				queryContext[ "_propertiesMap" ].set( "document.property-3", null );
				queryContext[ "_propertiesMap" ].set( "document.sub-document.property-1", null );
				queryContext[ "_propertiesMap" ].set( "document.sub-document.property-2", null );

				expect( queryContext.getProperties( "document.sub-document" ) ).toEqual( [ null, null ] );
			} );

		} );

		describe( method( INSTANCE, "addProperty" ), ():void => {

			it( hasSignature(
				"Create and return a new property with the name specified.",
				[
					{ name: "name", type: "string", description: "Name that the property will have." },
				],
				{ type: "CarbonLDP.SPARQL.QueryDocument.QueryProperty.QueryProperty" }
			), ():void => {} );

			it( "should exists", ():void => {
				expect( QueryContextBuilder.prototype.addProperty ).toBeDefined();
				expect( QueryContextBuilder.prototype.addProperty ).toEqual( jasmine.any( Function ) );
			} );

			it( "should add property to the properties map", ():void => {
				const queryContext:QueryContextBuilder = new QueryContextBuilder( context );

				queryContext.addProperty( "name" );
				expect( queryContext[ "_propertiesMap" ] ).toEqual( jasmine.objectContaining( new Map( [ [
					"name",
					new QueryProperty( queryContext, "name" ),
				] ] ) ) );

				queryContext.addProperty( "document.property" );
				expect( queryContext[ "_propertiesMap" ] ).toEqual( jasmine.objectContaining( new Map( [ [
					"document.property",
					new QueryProperty( queryContext, "document.property" ),
				] ] ) ) );
			} );

		} );

		describe( method( INSTANCE, "getInheritTypeDefinition" ), ():void => {

			it( hasSignature(
				"Search for a property definition defined by the parameters provided.",
				[
					{ name: "existingSchema", type: "CarbonLDP.ObjectSchema.DigestedObjectSchema", description: "Specific schema where to look for first.\nIf not in there it will be searched in all the schemas available in the carbon context." },
					{ name: "propertyName", type: "string", description: "Name of the property definition to find for." },
					{ name: "propertyURI", type: "string", optional: true, description: "If specified, it will only retrieve the property with the same name and URI." },
				],
				{ type: "CarbonLDP.ObjectSchema.DigestedObjectSchema" }
			), ():void => {
			} );

			it( "should exists", ():void => {
				expect( QueryContextBuilder.prototype.getInheritTypeDefinition ).toBeDefined();
				expect( QueryContextBuilder.prototype.getInheritTypeDefinition ).toEqual( jasmine.any( Function ) );
			} );

			it( "should find definition in types schemas", ():void => {
				context.extendObjectSchema( "ex:aType", {
					"ex": "http://example.com/ns#",
					"property": {
						"@id": "ex:type-property",
					},
				} );

				const queryContext:QueryContextBuilder = new QueryContextBuilder( context );
				const definition:DigestedObjectSchemaProperty = queryContext.getInheritTypeDefinition( new DigestedObjectSchema(), "property" );
				expect( definition ).toEqual( jasmine.objectContaining( {
					uri: "http://example.com/ns#type-property",
				} ) );
			} );

			it( "should match URI if provided", ():void => {
				context.extendObjectSchema( "ex:Type", {
					"ex": "http://example.com/ns#",
					"property": {
						"@id": "ex:type-1-property",
					},
				} );
				context.extendObjectSchema( "ex:AnotherType", {
					"ex": "http://example.com/ns#",
					"property": {
						"@id": "ex:type-2-property",
						"@type": "@id",
					},
				} );

				const queryContext:QueryContextBuilder = new QueryContextBuilder( context );
				const definition:DigestedObjectSchemaProperty = queryContext.getInheritTypeDefinition( new DigestedObjectSchema(), "property", "http://example.com/ns#type-2-property" );
				expect( definition ).toEqual( jasmine.objectContaining( {
					uri: "http://example.com/ns#type-2-property",
					literal: false,
				} ) );
			} );

			it( "should find in parent context", ():void => {
				context = new (context.constructor as { new( context:AbstractContext ) })( context );
				context.parentContext.extendObjectSchema( "ex:Type", {
					"xsd": "http://www.w3.org/2001/XMLSchema#",
					"ex": "http://example.com/ns#",
					"property": {
						"@id": "ex:type-1-property",
						"@type": "xsd:string",
					},
				} );
				context.extendObjectSchema( "ex:AnotherType", {
					"ex": "http://example.com/ns#",
					"property": {
						"@id": "ex:type-2-property",
						"@type": "@id",
					},
				} );

				const queryContext:QueryContextBuilder = new QueryContextBuilder( context );
				const definition:DigestedObjectSchemaProperty = queryContext.getInheritTypeDefinition( new DigestedObjectSchema(), "property", "http://example.com/ns#type-1-property" );
				expect( definition ).toEqual( jasmine.objectContaining( {
					uri: "http://example.com/ns#type-1-property",
					literal: true,
					literalType: "http://www.w3.org/2001/XMLSchema#string",
				} ) );
			} );

			it( "should find first in the provided schema", ():void => {
				context = new (context.constructor as { new( context:AbstractContext ) })( context );
				context.parentContext.extendObjectSchema( "ex:Type", {
					"xsd": "http://www.w3.org/2001/XMLSchema#",
					"ex": "http://example.com/ns#",
					"property": {
						"@id": "ex:type-1-property",
						"@type": "xsd:string",
					},
				} );
				context.extendObjectSchema( "ex:AnotherType", {
					"ex": "http://example.com/ns#",
					"property": {
						"@id": "ex:type-2-property",
						"@type": "@id",
					},
				} );

				const schema:DigestedObjectSchema = ObjectSchemaDigester.digestSchema( {
					"xsd": "http://www.w3.org/2001/XMLSchema#",
					"ex": "http://example.com/ns#",
					"property": {
						"@id": "ex:type-1-property",
						"@type": "xsd:string",
						"@container": "@set",
					},
				} );

				const queryContext:QueryContextBuilder = new QueryContextBuilder( context );
				const definition:DigestedObjectSchemaProperty = queryContext.getInheritTypeDefinition( schema, "property", "http://example.com/ns#type-1-property" );
				expect( definition ).toEqual( jasmine.objectContaining( {
					uri: "http://example.com/ns#type-1-property",
					literal: true,
					literalType: "http://www.w3.org/2001/XMLSchema#string",
					containerType: ContainerType.SET,
				} ) );
			} );

		} );

		describe( method( INSTANCE, "getSchemaFor" ), ():void => {

			it( hasSignature(
				"Returns the schema of the object specified by the path.\n" +
				"If no path specified the behaviour of the parent class will be executed.",
				[
					{ name: "object", type: "object", description: "The object to look for its corresponding schema.\nNOTE: Property is ignored when a path is specified." },
					{ name: "path", type: "string", description: "An optional path that describes where the resource appears in the query." },
				],
				{ type: "CarbonLDP.ObjectSchema.DigestedObjectSchema" }
			), ():void => {
			} );

			it( "should exists", ():void => {
				expect( QueryContextBuilder.prototype.getSchemaFor ).toBeDefined();
				expect( QueryContextBuilder.prototype.getSchemaFor ).toEqual( jasmine.any( Function ) );
			} );

			it( "should return the schema of the property path when partial", ():void => {
				const queryContext:QueryContextBuilder = new QueryContextBuilder( context );

				const helper:( name:string ) => void = name => {
					const property:QueryProperty = queryContext
						.addProperty( name )
						.setType( QueryPropertyType.PARTIAL );
					const spy:jasmine.Spy = spyOn( property, "getSchema" ).and.returnValue( null );

					const returnedValue:any = queryContext.getSchemaFor( {}, name );
					expect( spy ).toHaveBeenCalled();
					expect( returnedValue ).toBeNull();
				};

				helper( "property" );
				helper( "property.another-one" );
			} );

			it( "should return the schema from context when full", ():void => {
				const queryContext:QueryContextBuilder = new QueryContextBuilder( context );

				const spy:jasmine.Spy = spyOn( queryContext.context.documents, "getSchemaFor" ).and.returnValue( null );
				const helper:( name:string ) => void = name => {
					queryContext
						.addProperty( name )
						.setType( QueryPropertyType.FULL );

					const returnedValue:any = queryContext.getSchemaFor( {}, name );
					expect( spy ).toHaveBeenCalled();
					expect( returnedValue ).toBeNull();
				};

				helper( "property" );
				helper( "property.another-one" );
			} );

			it( "should throw error when no type", ():void => {
				const queryContext:QueryContextBuilder = new QueryContextBuilder( context );

				const helper:( name:string ) => void = name => () => {
					queryContext
						.addProperty( name )
						.setType( void 0 );

					queryContext.getSchemaFor( {}, name );
				};

				expect( helper( "property" ) ).toThrowError( IllegalArgumentError, `Property "property" is not a resource.` );
				expect( helper( "property.another-one" ) ).toThrowError( IllegalArgumentError, `Property "property.another-one" is not a resource.` );
			} );

			it( "should throw error when not exits", ():void => {
				const queryContext:QueryContextBuilder = new QueryContextBuilder( context );

				const helper:( name:string ) => void = name => () => {
					queryContext.getSchemaFor( {}, name );
				};

				expect( helper( "property" ) ).toThrowError( IllegalArgumentError, `Schema path "property" does not exists.` );
				expect( helper( "property.another-one" ) ).toThrowError( IllegalArgumentError, `Schema path "property.another-one" does not exists.` );
			} );

			it( "should return the schema from the context when not exits and parent is full", ():void => {
				const queryContext:QueryContextBuilder = new QueryContextBuilder( context );

				const spy:jasmine.Spy = spyOn( queryContext.context.documents, "getSchemaFor" ).and.returnValue( null );
				const helper:( parent:string, name:string ) => void = ( parent, child ) => {
					queryContext
						.addProperty( parent )
						.setType( QueryPropertyType.FULL );

					const returnedValue:any = queryContext.getSchemaFor( {}, `${ parent }.${ child }` );
					expect( spy ).toHaveBeenCalled();
					expect( returnedValue ).toBeNull();
				};

				helper( "property-1", "child-1" );
				helper( "property-2", "child-2" );
			} );

		} );

	} );

} );
