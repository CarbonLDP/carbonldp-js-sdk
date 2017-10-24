import { FilterToken, IRIToken, OptionalToken, PredicateToken, PrefixedNameToken, SubjectToken } from "sparqler/tokens";

import AbstractContext from "../../AbstractContext";
import { DigestedObjectSchema } from "../../ObjectSchema";
import * as Pointer from "../../Pointer";
import { clazz, constructor, hasDefaultExport, INSTANCE, method, module, property } from "../../test/JasmineExtender";
import * as URI from "./../../RDF/URI";
import QueryContext from "./QueryContext";
import * as Module from "./QueryDocumentBuilder";
import { Class as QueryDocumentBuilder } from "./QueryDocumentBuilder";
import * as QueryObject from "./QueryObject";
import * as QueryProperty from "./QueryProperty";
import * as QueryValue from "./QueryValue";
import * as QueryVariable from "./QueryVariable";

describe( module( "Carbon/SPARQL/QueryDocument/QueryDocumentBuilder" ), ():void => {

	it( "should exists", ():void => {
		expect( Module ).toBeDefined();
		expect( Module ).toEqual( jasmine.any( Object ) );
	} );

	it( hasDefaultExport( "Carbon.SPARQL.QueryDocument.QueryDocumentBuilder.Class" ), ():void => {
		expect( Module.default ).toBeDefined();
		expect( Module.default ).toBe( QueryDocumentBuilder );
	} );

	describe( clazz( "Carbon.SPARQL.QueryDocument.QueryDocumentBuilder.Class", "Class with the helpers and properties for construct a query document" ), ():void => {

		it( "should exists", ():void => {
			expect( QueryDocumentBuilder ).toBeDefined();
			expect( QueryDocumentBuilder ).toEqual( jasmine.any( Function ) );
		} );

		let context:AbstractContext;
		let queryContext:QueryContext;
		let baseProperty:QueryProperty.Class;
		beforeEach( ():void => {
			context = new class extends AbstractContext {
				protected _baseURI:string = "http://example.com";
			};
			context.setSetting( "vocabulary", "http://example.com/vocab#" );
			queryContext = new QueryContext( context );
			baseProperty = new QueryProperty.Class( queryContext, "document", null );
		} );

		describe( constructor(), ():void => {

			it( "should exists", ():void => {
				const builder:QueryDocumentBuilder = new QueryDocumentBuilder( queryContext, baseProperty );
				expect( builder ).toBeDefined();
				expect( builder ).toEqual( jasmine.any( QueryDocumentBuilder ) );
			} );

			it( "should initialize the schema with the general schema", ():void => {
				const builder:QueryDocumentBuilder = new QueryDocumentBuilder( queryContext, baseProperty );
				expect( builder[ "_schema" ] ).not.toBe( context.getObjectSchema() );

				const schema:DigestedObjectSchema = context.getObjectSchema();
				schema.vocab = "http://example.com/vocab#";
				expect( builder[ "_schema" ] ).toEqual( schema );
			} );

			it( "should set the document property", ():void => {
				const builder:QueryDocumentBuilder = new QueryDocumentBuilder( queryContext, baseProperty );
				expect( builder[ "_document" ] ).toEqual( baseProperty );
			} );

			it( "should add the types pattern to the property", ():void => {
				new QueryDocumentBuilder( queryContext, baseProperty );
				expect( baseProperty.getPatterns() ).toEqual( jasmine.arrayContaining( [
					jasmine.objectContaining( {
						token: "subject",
						subject: baseProperty.variable,
						predicates: jasmine.arrayContaining( [
							jasmine.objectContaining( {
								token: "predicate",
								predicate: "a",
								objects: jasmine.arrayContaining( [
									jasmine.any( QueryVariable.Class ),
								] ),
							} ),
						] ),
					} ),
				] ) as any );
			} );

		} );

		describe( property( INSTANCE, "inherit", "Readonly<{}>" ), ():void => {

			it( "should exists", ():void => {
				const builder:QueryDocumentBuilder = new QueryDocumentBuilder( queryContext, baseProperty );
				expect( builder.inherit ).toBeDefined();
				expect( builder.inherit ).toEqual( jasmine.any( Object ) );
			} );

			it( "should be frozen", ():void => {
				const builder:QueryDocumentBuilder = new QueryDocumentBuilder( queryContext, baseProperty );
				expect( builder.inherit ).toBeDefined();
				expect( Object.isFrozen( builder.inherit ) ).toBe( true );
			} );

			it( "should be the same for every builder", ():void => {
				const builder1:QueryDocumentBuilder = new QueryDocumentBuilder( queryContext, baseProperty );
				const builder2:QueryDocumentBuilder = new QueryDocumentBuilder( queryContext, baseProperty );
				const builder3:QueryDocumentBuilder = new QueryDocumentBuilder( queryContext, baseProperty );

				expect( builder1.inherit ).toBe( builder2.inherit );
				expect( builder1.inherit ).toBe( builder3.inherit );
				expect( builder2.inherit ).toBe( builder3.inherit );
			} );

		} );

		describe( method( INSTANCE, "property" ), ():void => {

			it( "should exists", ():void => {
				expect( QueryDocumentBuilder.prototype.property ).toBeDefined();
				expect( QueryDocumentBuilder.prototype.property ).toEqual( jasmine.any( Function ) );
			} );

			it( "should call the `getProperty` of the query context", ():void => {
				const spy:jasmine.Spy = spyOn( queryContext, "getProperty" );
				const builder:QueryDocumentBuilder = new QueryDocumentBuilder( queryContext, baseProperty );

				builder.property( "name" );
				expect( spy ).toHaveBeenCalledWith( "document.name" );
				builder.property( "object.name" );
				expect( spy ).toHaveBeenCalledWith( "document.object.name" );
			} );

		} );

		describe( method( INSTANCE, "value" ), ():void => {

			it( "should exists", ():void => {
				expect( QueryDocumentBuilder.prototype.value ).toBeDefined();
				expect( QueryDocumentBuilder.prototype.value ).toEqual( jasmine.any( Function ) );
			} );

			it( "should create a QueryValue with the name provided", ():void => {
				const spy:jasmine.Spy = spyOn( QueryValue, "Class" );
				const builder:QueryDocumentBuilder = new QueryDocumentBuilder( queryContext, baseProperty );

				builder.value( "name" );
				expect( spy ).toHaveBeenCalledWith( queryContext, "name" );

				builder.value( 1 );
				expect( spy ).toHaveBeenCalledWith( queryContext, 1 );

				builder.value( true );
				expect( spy ).toHaveBeenCalledWith( queryContext, true );

				const date:Date = new Date();
				builder.value( date );
				expect( spy ).toHaveBeenCalledWith( queryContext, date );
			} );

			it( "should return a QueryValue", ():void => {
				const builder:QueryDocumentBuilder = new QueryDocumentBuilder( queryContext, baseProperty );
				expect( builder.value( "value" ) ).toEqual( jasmine.any( QueryValue.Class ) );
				expect( builder.value( 10.01 ) ).toEqual( jasmine.any( QueryValue.Class ) );
				expect( builder.value( true ) ).toEqual( jasmine.any( QueryValue.Class ) );
				expect( builder.value( new Date() ) ).toEqual( jasmine.any( QueryValue.Class ) );
			} );

		} );

		describe( method( INSTANCE, "object" ), ():void => {

			it( "should exists", ():void => {
				expect( QueryDocumentBuilder.prototype.object ).toBeDefined();
				expect( QueryDocumentBuilder.prototype.object ).toEqual( jasmine.any( Function ) );
			} );

			it( "should create a QueryObject with the name provided", ():void => {
				const spy:jasmine.Spy = spyOn( QueryObject, "Class" );
				const builder:QueryDocumentBuilder = new QueryDocumentBuilder( queryContext, baseProperty );

				builder.object( "http://example.com/resource/" );
				expect( spy ).toHaveBeenCalledWith( queryContext, "http://example.com/resource/" );

				const pointer:Pointer.Class = context.documents.getPointer( "http://example.com/resource/" );
				builder.object( pointer );
				expect( spy ).toHaveBeenCalledWith( queryContext, pointer );
			} );

			it( "should return a QueryObject", ():void => {
				const builder:QueryDocumentBuilder = new QueryDocumentBuilder( queryContext, baseProperty );
				expect( builder.object( "http://example.com/resource/" ) ).toEqual( jasmine.any( QueryObject.Class ) );
				expect( builder.object( context.documents.getPointer( "http://example.com/resource/" ) ) ).toEqual( jasmine.any( QueryObject.Class ) );
			} );

		} );

		describe( method( INSTANCE, "withType" ), ():void => {

			it( "should exists", ():void => {
				expect( QueryDocumentBuilder.prototype.withType ).toBeDefined();
				expect( QueryDocumentBuilder.prototype.withType ).toEqual( jasmine.any( Function ) );
			} );

			it( "should throw error when properties already used", ():void => {
				const helper:( type:string ) => void = type => () => {
					const builder:QueryDocumentBuilder = new QueryDocumentBuilder( queryContext, baseProperty );
					builder.properties( {
						"property": {},
					} );
					builder.withType( type );
				};

				expect( helper( "Type" ) ).toThrowError( "Types must be specified before the properties." );
				expect( helper( "http://example.com/ns#Type" ) ).toThrowError( "Types must be specified before the properties." );
			} );

			it( "should add the schema of the type", ():void => {
				context.extendObjectSchema( "Type-1", {
					"property-1": {
						"@id": "property-1",
					},
				} );
				context.extendObjectSchema( "Type-2", {
					"property-1": {
						"@id": "property-2.1",
					},
					"property-2": {
						"@id": "property-2",
					},
				} );

				const builder:QueryDocumentBuilder = new QueryDocumentBuilder( queryContext, baseProperty );

				builder.withType( "Type-1" );
				const schema1:DigestedObjectSchema = context.getObjectSchema( "Type-1" );
				expect( builder[ "_schema" ].properties ).not.toBe( schema1.properties );
				expect( builder[ "_schema" ].properties.has( "property-1" ) ).toBe( true );
				expect( builder[ "_schema" ].properties.get( "property-1" ) ).toEqual( jasmine.objectContaining( {
					uri: new URI.Class( "http://example.com/vocab#property-1" ),
				} ) );

				builder.withType( "Type-2" );
				const schema2:DigestedObjectSchema = context.getObjectSchema( "Type-1" );
				expect( builder[ "_schema" ].properties ).not.toBe( schema2.properties );
				expect( builder[ "_schema" ].properties.has( "property-1" ) ).toBe( true );
				expect( builder[ "_schema" ].properties.get( "property-1" ) ).toEqual( jasmine.objectContaining( {
					uri: new URI.Class( "http://example.com/vocab#property-2.1" ),
				} ) );
				expect( builder[ "_schema" ].properties.has( "property-2" ) ).toBe( true );
				expect( builder[ "_schema" ].properties.get( "property-2" ) ).toEqual( jasmine.objectContaining( {
					uri: new URI.Class( "http://example.com/vocab#property-2" ),
				} ) );
			} );

			it( "should add the type to the property's pattern", ():void => {
				context.extendObjectSchema( {
					"ex": "http://example.com/ns#",
				} );
				const builder:QueryDocumentBuilder = new QueryDocumentBuilder( queryContext, baseProperty );
				builder.withType( "Type-1" );
				expect( baseProperty.getPatterns() ).toEqual( jasmine.arrayContaining( [
					jasmine.objectContaining( {
						token: "subject",
						subject: baseProperty.variable,
						predicates: jasmine.arrayContaining( [
							jasmine.objectContaining( {
								token: "predicate",
								predicate: "a",
								objects: jasmine.arrayContaining( [
									new IRIToken( "http://example.com/vocab#Type-1" ),
								] ),
							} ),
						] ),
					} ),
				] ) as any );

				builder.withType( "ex:Type-2" );
				expect( baseProperty.getPatterns() ).toEqual( jasmine.arrayContaining( [
					jasmine.objectContaining( {
						token: "subject",
						subject: baseProperty.variable,
						predicates: jasmine.arrayContaining( [
							jasmine.objectContaining( {
								token: "predicate",
								predicate: "a",
								objects: jasmine.arrayContaining( [
									new PrefixedNameToken( "ex:Type-2" ),
								] ),
							} ),
						] ),
					} ),
				] ) as any );
			} );

			it( "should return to itself", ():void => {
				const builder:QueryDocumentBuilder = new QueryDocumentBuilder( queryContext, baseProperty );

				const returned:QueryDocumentBuilder = builder.withType( "Type" );
				expect( returned ).toBe( builder );
			} );

		} );

		describe( method( INSTANCE, "properties" ), ():void => {

			it( "should exists", ():void => {
				expect( QueryDocumentBuilder.prototype.properties ).toBeDefined();
				expect( QueryDocumentBuilder.prototype.properties ).toEqual( jasmine.any( Function ) );
			} );

			it( "should add properties to the schema", ():void => {
				context.extendObjectSchema( {
					"xsd": "http://www.w3.org/2001/XMLSchema#",
					"ex": "http://example.com/ns#",
					"inheritProperty": {
						"@id": "ex:inheritProperty",
					},
					"extendedProperty": {
						"@id": "ex:extendedProperty",
					},
				} );

				const builder:QueryDocumentBuilder = new QueryDocumentBuilder( queryContext, baseProperty );
				builder.properties( {
					"defaultProperty": {},
					"inheritProperty": {},
					"extendedProperty": {
						"@type": "xsd:string",
					},
					"inlineProperty": "ex:inlineProperty",
				} );

				expect( builder[ "_schema" ].properties ).toEqual( jasmine.objectContaining( new Map( [ [
					"defaultProperty",
					jasmine.objectContaining( {
						uri: new URI.Class( "http://example.com/vocab#defaultProperty" ),
					} ) as any,
				] ] ) ) );

				expect( builder[ "_schema" ].properties ).toEqual( jasmine.objectContaining( new Map( [ [
					"inheritProperty",
					jasmine.objectContaining( {
						uri: new URI.Class( "http://example.com/ns#inheritProperty" ),
					} ) as any,
				] ] ) ) );

				expect( builder[ "_schema" ].properties ).toEqual( jasmine.objectContaining( new Map( [ [
					"extendedProperty",
					jasmine.objectContaining( {
						uri: new URI.Class( "http://example.com/ns#extendedProperty" ),
						literal: true,
						literalType: new URI.Class( "http://www.w3.org/2001/XMLSchema#string" ),
					} ) as any,
				] ] ) ) );

				expect( builder[ "_schema" ].properties ).toEqual( jasmine.objectContaining( new Map( [ [
					"inlineProperty",
					jasmine.objectContaining( {
						uri: new URI.Class( "http://example.com/ns#inlineProperty" ),
					} ) as any,
				] ] ) ) );
			} );

			it( "should add properties and its tokens", ():void => {
				context.extendObjectSchema( {
					"xsd": "http://www.w3.org/2001/XMLSchema#",
					"ex": "http://example.com/ns#",
					"inheritProperty": {
						"@id": "ex:inheritProperty",
					},
					"extendedProperty": {
						"@id": "ex:extendedProperty",
					},
				} );

				const builder:QueryDocumentBuilder = new QueryDocumentBuilder( queryContext, baseProperty );
				builder.properties( {
					"defaultProperty": {},
					"inheritProperty": {},
					"extendedProperty": {
						"@type": "xsd:string",
					},
					"inlineProperty": "ex:inlineProperty",
				} );

				const defaultProperty:QueryProperty.Class = builder.property( "defaultProperty" );
				expect( defaultProperty ).toBeDefined();
				expect( defaultProperty.getPatterns() ).toEqual( [
					new OptionalToken()
						.addPattern( new SubjectToken( new QueryVariable.Class( "document", jasmine.any( Number ) as any ) )
							.addPredicate( new PredicateToken( new IRIToken( "http://example.com/vocab#defaultProperty" ) )
								.addObject( new QueryVariable.Class( "document.defaultProperty", jasmine.any( Number ) as any ) ) ) )
					,
				] );

				const inheritProperty:QueryProperty.Class = builder.property( "inheritProperty" );
				expect( inheritProperty ).toBeDefined();
				expect( inheritProperty.getPatterns() ).toEqual( [
					new OptionalToken()
						.addPattern( new SubjectToken( new QueryVariable.Class( "document", jasmine.any( Number ) as any ) )
							.addPredicate( new PredicateToken( new PrefixedNameToken( "ex:inheritProperty" ) )
								.addObject( new QueryVariable.Class( "document.inheritProperty", jasmine.any( Number ) as any ) ) ) )
					,
				] );

				const extendedProperty:QueryProperty.Class = builder.property( "extendedProperty" );
				expect( extendedProperty ).toBeDefined();
				expect( extendedProperty.getPatterns() ).toEqual( [
					new OptionalToken()
						.addPattern( new SubjectToken( new QueryVariable.Class( "document", jasmine.any( Number ) as any ) )
							.addPredicate( new PredicateToken( new PrefixedNameToken( "ex:extendedProperty" ) )
								.addObject( new QueryVariable.Class( "document.extendedProperty", jasmine.any( Number ) as any ) ) ) )
						.addPattern( new FilterToken( "datatype( ?document__extendedProperty ) = xsd:string" ) )
					,
				] );

				const inlineProperty:QueryProperty.Class = builder.property( "inlineProperty" );
				expect( inlineProperty ).toBeDefined();
				expect( inlineProperty.getPatterns() ).toEqual( [
					new OptionalToken()
						.addPattern( new SubjectToken( new QueryVariable.Class( "document", jasmine.any( Number ) as any ) )
							.addPredicate( new PredicateToken( new PrefixedNameToken( "ex:inlineProperty" ) )
								.addObject( new QueryVariable.Class( "document.inlineProperty", jasmine.any( Number ) as any ) ) ) )
					,
				] );
			} );

		} );

	} );

} );
