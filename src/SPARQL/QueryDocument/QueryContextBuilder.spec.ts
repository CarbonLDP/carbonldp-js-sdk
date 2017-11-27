import AbstractContext from "../../AbstractContext";
import { DigestedPropertyDefinition } from "../../ObjectSchema";
import { clazz, constructor, extendsClass, hasDefaultExport, INSTANCE, method, module } from "../../test/JasmineExtender";
import * as URI from "./../../RDF/URI";
import QueryContext from "./QueryContext";
import * as Module from "./QueryContextBuilder";
import { Class as QueryContextBuilder } from "./QueryContextBuilder";
import QueryProperty from "./QueryProperty";

describe( module( "Carbon/SPARQL/QueryDocument/QueryContextBuilder" ), ():void => {

	it( "should exists", ():void => {
		expect( Module ).toBeDefined();
		expect( Module ).toEqual( jasmine.any( Object ) );
	} );

	it( hasDefaultExport( "Carbon.SPARQL.QueryDocument.QueryContextBuilder.Class" ), ():void => {
		expect( Module.default ).toBeDefined();
		expect( Module.default ).toBe( QueryContextBuilder );
	} );

	describe( clazz( "Carbon.SPARQL.QueryDocument.QueryContextBuilder.Class", "Class with the shared status and data of the query." ), ():void => {

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

		it( extendsClass( "Carbon.SPARQL.QueryDocument.QueryContext.Class" ), ():void => {
			const queryContext:QueryContextBuilder = new QueryContextBuilder( context );
			expect( queryContext ).toEqual( jasmine.any( QueryContext ) );
		} );

		describe( method( INSTANCE, "hasProperty" ), ():void => {

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
				const definition:DigestedPropertyDefinition = queryContext.getInheritTypeDefinition( "property" );
				expect( definition ).toEqual( jasmine.objectContaining( {
					uri: new URI.Class( "http://example.com/ns#type-property" ),
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
				const definition:DigestedPropertyDefinition = queryContext.getInheritTypeDefinition( "property", "http://example.com/ns#type-2-property" );
				expect( definition ).toEqual( jasmine.objectContaining( {
					uri: new URI.Class( "http://example.com/ns#type-2-property" ),
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
				const definition:DigestedPropertyDefinition = queryContext.getInheritTypeDefinition( "property", "http://example.com/ns#type-1-property" );
				expect( definition ).toEqual( jasmine.objectContaining( {
					uri: new URI.Class( "http://example.com/ns#type-1-property" ),
					literal: true,
					literalType: new URI.Class( "http://www.w3.org/2001/XMLSchema#string" ),
				} ) );
			} );

		} );

		describe( method( INSTANCE, "getSchemaFor" ), ():void => {

			it( "should exists", ():void => {
				expect( QueryContextBuilder.prototype.getSchemaFor ).toBeDefined();
				expect( QueryContextBuilder.prototype.getSchemaFor ).toEqual( jasmine.any( Function ) );
			} );

			it( "should return the schema of the property defined by the path", ():void => {
				const queryContext:QueryContextBuilder = new QueryContextBuilder( context );

				const helper:( name:string ) => void = name => {
					const property:QueryProperty = queryContext.addProperty( name );
					const spy:jasmine.Spy = spyOn( property, "getSchema" ).and.returnValue( null );

					const returnedValue:any = queryContext.getSchemaFor( {}, name );
					expect( spy ).toHaveBeenCalled();
					expect( returnedValue ).toBeNull();
				};

				helper( "property" );
				helper( "property.another-one" );
			} );

		} );

	} );

} );
