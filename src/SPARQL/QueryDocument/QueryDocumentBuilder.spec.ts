import {
	FilterToken,
	IRIToken,
	LiteralToken,
	OptionalToken,
	PredicateToken,
	PrefixedNameToken,
	SubjectToken,
	ValuesToken,
} from "sparqler/tokens";

import AbstractContext from "../../AbstractContext";
import {
	IllegalArgumentError,
	IllegalStateError
} from "../../Errors";
import {
	DigestedObjectSchema,
	ObjectSchemaDigester,
} from "../../ObjectSchema";
import {
	clazz,
	constructor,
	hasDefaultExport,
	hasSignature,
	INSTANCE,
	method,
	module,
	property,
} from "../../test/JasmineExtender";
import { Document } from "./../../Document";
import { Pointer } from "./../../Pointer";
import QueryContextBuilder from "./QueryContextBuilder";

import * as Module from "./QueryDocumentBuilder";
import DefaultExpot, { QueryDocumentBuilder } from "./QueryDocumentBuilder";

import * as QueryObject from "./QueryObject";
import * as QueryProperty from "./QueryProperty";
import * as QueryValue from "./QueryValue";
import * as QueryVariable from "./QueryVariable";

describe( module( "Carbon/SPARQL/QueryDocument/QueryDocumentBuilder" ), ():void => {

	it( "should exists", ():void => {
		expect( Module ).toBeDefined();
		expect( Module ).toEqual( jasmine.any( Object ) );
	} );

	it( hasDefaultExport( "Carbon.SPARQL.QueryDocument.QueryDocumentBuilder.QueryDocumentBuilder" ), ():void => {
		expect( DefaultExpot ).toBeDefined();
		expect( DefaultExpot ).toBe( QueryDocumentBuilder );
	} );

	describe( clazz( "Carbon.SPARQL.QueryDocument.QueryDocumentBuilder.QueryDocumentBuilder", "Class with the helpers and properties for construct a query document" ), ():void => {

		it( "should exists", ():void => {
			expect( QueryDocumentBuilder ).toBeDefined();
			expect( QueryDocumentBuilder ).toEqual( jasmine.any( Function ) );
		} );

		let context:AbstractContext;
		let queryContext:QueryContextBuilder;
		let baseProperty:QueryProperty.Class;
		beforeEach( ():void => {
			context = new class extends AbstractContext {
				protected _baseURI:string = "http://example.com";
			};
			context.extendObjectSchema( {
				"@vocab": "http://example.com/vocab#",
				"ex": "http://example.com/ns#",
			} );

			queryContext = new QueryContextBuilder( context );
			baseProperty = queryContext
				.addProperty( "document" )
				.setOptional( false );
		} );

		describe( constructor(), ():void => {

			it( "should exists", ():void => {
				const builder:QueryDocumentBuilder = new QueryDocumentBuilder( queryContext, baseProperty );
				expect( builder ).toBeDefined();
				expect( builder ).toEqual( jasmine.any( QueryDocumentBuilder ) );
			} );

			it( "should set the document property", ():void => {
				const builder:QueryDocumentBuilder = new QueryDocumentBuilder( queryContext, baseProperty );
				expect( builder[ "_document" ] ).toEqual( baseProperty );
			} );

			it( "should initialize the schema with a general document schema", ():void => {
				const builder:QueryDocumentBuilder = new QueryDocumentBuilder( queryContext, baseProperty );

				const schema:DigestedObjectSchema = ObjectSchemaDigester.combineDigestedObjectSchemas( [
					context.getObjectSchema(),
					context.getObjectSchema( Document.TYPE ),
				] );
				schema.vocab = "http://example.com/vocab#";

				expect( builder[ "_schema" ] ).toEqual( schema );
			} );

		} );

		describe( property( INSTANCE, "inherit", "Readonly<{}>", "Property to make a descriptive inheritance os a query property definition." ), ():void => {

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

		describe( property( INSTANCE, "all", "Readonly<{}>", "Property to describe the fetching of the entire resource properties." ), ():void => {

			it( "should exists", ():void => {
				const builder:QueryDocumentBuilder = new QueryDocumentBuilder( queryContext, baseProperty );
				expect( builder.all ).toBeDefined();
				expect( builder.all ).toEqual( jasmine.any( Object ) );
			} );

			it( "should be frozen", ():void => {
				const builder:QueryDocumentBuilder = new QueryDocumentBuilder( queryContext, baseProperty );
				expect( builder.all ).toBeDefined();
				expect( Object.isFrozen( builder.all ) ).toBe( true );
			} );

			it( "should be the same for every builder", ():void => {
				const builder1:QueryDocumentBuilder = new QueryDocumentBuilder( queryContext, baseProperty );
				const builder2:QueryDocumentBuilder = new QueryDocumentBuilder( queryContext, baseProperty );
				const builder3:QueryDocumentBuilder = new QueryDocumentBuilder( queryContext, baseProperty );

				expect( builder1.all ).toBe( builder2.all );
				expect( builder1.all ).toBe( builder3.all );
				expect( builder2.all ).toBe( builder3.all );
			} );

		} );

		describe( method( INSTANCE, "property" ), ():void => {

			it( hasSignature(
				"Returns the property specified by the name provided.\n" +
				"If no name is provided, the property where the query belongs to is returned. In case the the main query, it will be the target document(s).",
				[
					{ name: "name", type: "string", optional: true, description: "Optional name of the property to look for." },
				],
				{ type: "Carbon.SPARQL.QueryDocument.QueryProperty.Class" }
			), ():void => {
			} );

			it( "should exists", ():void => {
				expect( QueryDocumentBuilder.prototype.property ).toBeDefined();
				expect( QueryDocumentBuilder.prototype.property ).toEqual( jasmine.any( Function ) );
			} );

			it( "should call the `getProperty` of the query context", ():void => {
				spyOn( queryContext, "hasProperty" ).and.returnValue( true );
				const spy:jasmine.Spy = spyOn( queryContext, "getProperty" );
				const builder:QueryDocumentBuilder = new QueryDocumentBuilder( queryContext, baseProperty );

				builder.property( "name" );
				expect( spy ).toHaveBeenCalledWith( "document.name" );
				builder.property( "object.name" );
				expect( spy ).toHaveBeenCalledWith( "document.object.name" );
			} );

			it( "should be able to look in all the properties tree", ():void => {
				spyOn( queryContext, "getProperty" );
				const spy:jasmine.Spy = spyOn( queryContext, "hasProperty" ).and.returnValue( false );

				baseProperty = new QueryProperty.Class( queryContext, "document.path1.path2.path3" );
				const builder:QueryDocumentBuilder = new QueryDocumentBuilder( queryContext, baseProperty );

				try {
					builder.property( "name" );
				} catch {}

				expect( spy ).toHaveBeenCalledWith( "document.path1.path2.path3.name" );
				expect( spy ).toHaveBeenCalledWith( "document.path1.path2.name" );
				expect( spy ).toHaveBeenCalledWith( "document.path1.name" );
				expect( spy ).toHaveBeenCalledWith( "document.name" );
			} );

			it( "should throw error when the property does not exists", ():void => {
				spyOn( queryContext, "getProperty" );
				spyOn( queryContext, "hasProperty" ).and.callFake( name => name === "document.path1.name" );

				baseProperty = new QueryProperty.Class( queryContext, "document.path1.path2.path3" );
				const builder:QueryDocumentBuilder = new QueryDocumentBuilder( queryContext, baseProperty );
				const helper:( name:string ) => void = ( name:string ) => () => builder.property( name );

				expect( helper( "name" ) ).not.toThrowError( IllegalArgumentError, `The "name" property was not declared.` );
				expect( helper( "path1.name" ) ).not.toThrowError( IllegalArgumentError, `The "path1.name" property was not declared.` );

				expect( helper( "path2.name" ) ).toThrowError( IllegalArgumentError, `The "path2.name" property was not declared.` );
				expect( helper( "path1.path2.name" ) ).toThrowError( IllegalArgumentError, `The "path1.path2.name" property was not declared.` );
			} );

		} );

		describe( method( INSTANCE, "value" ), ():void => {

			it( hasSignature(
				"Wraps a basic value to be used correctly in the query filters and values.",
				[
					{ name: "value", type: "string | number | boolean | Date", description: "Value to be converted in a safe to use in query object." },
				],
				{ type: "Carbon.SPARQL.QueryDocument.QueryValue.Class" }
			), ():void => {
			} );

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

			it( hasSignature(
				"Wraps a pointer or URi to be used correctly in the query filters and values.",
				[
					{ name: "value", type: "Carbon.Pointer.Pointer | string", description: "Pointer or URI to be converted in a safe to use in query object." },
				],
				{ type: "Carbon.SPARQL.QueryDocument.QueryObject.Class" }
			), ():void => {
			} );

			it( "should exists", ():void => {
				expect( QueryDocumentBuilder.prototype.object ).toBeDefined();
				expect( QueryDocumentBuilder.prototype.object ).toEqual( jasmine.any( Function ) );
			} );

			it( "should create a QueryObject with the name provided", ():void => {
				const spy:jasmine.Spy = spyOn( QueryObject, "Class" );
				const builder:QueryDocumentBuilder = new QueryDocumentBuilder( queryContext, baseProperty );

				builder.object( "http://example.com/resource/" );
				expect( spy ).toHaveBeenCalledWith( queryContext, "http://example.com/resource/" );

				const pointer:Pointer = context.documents.getPointer( "http://example.com/resource/" );
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

			it( hasSignature(
				"Specified a type the target document(s) has" +
				"and also uses its schema (if exits) from where to inherit the specification of the properties defined in the query",
				[
					{ name: "type", type: "string", description: "The type of the target and schema" },
				],
				{ type: "this" }
			), ():void => {
			} );

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

				expect( helper( "Type" ) ).toThrowError( IllegalStateError, "Types must be specified before the properties." );
				expect( helper( "http://example.com/ns#Type" ) ).toThrowError( IllegalStateError, "Types must be specified before the properties." );
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
				expect( builder[ "_schema" ].properties.get( "property-1" ) ).toEqual( schema1.properties.get( "property-1" ) );

				builder.withType( "Type-2" );
				const schema2:DigestedObjectSchema = context.getObjectSchema( "Type-2" );
				expect( builder[ "_schema" ].properties ).not.toBe( schema2.properties );
				expect( builder[ "_schema" ].properties.get( "property-1" ) ).toEqual( schema2.properties.get( "property-1" ) );
				expect( builder[ "_schema" ].properties.get( "property-2" ) ).toEqual( schema2.properties.get( "property-2" ) );
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

			it( hasSignature(
				"Method that allows to specify the property to be retrieved the the target document",
				[
					{ name: "propertiesSchema", type: "Carbon.SPARQL.QueryDocument.QueryPropertiesSchema.Class", description: "Similar as an schema object, but this specifies the properties to be retrieved." },
				],
				{ type: "this" }
			), ():void => {
			} );

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

				expect( baseProperty.getSchema().properties ).toEqual( jasmine.objectContaining( new Map( [ [
					"defaultProperty",
					jasmine.objectContaining( {
						uri: "http://example.com/vocab#defaultProperty",
					} ) as any,
				] ] ) ) );

				expect( baseProperty.getSchema().properties ).toEqual( jasmine.objectContaining( new Map( [ [
					"inheritProperty",
					jasmine.objectContaining( {
						uri: "http://example.com/ns#inheritProperty",
					} ) as any,
				] ] ) ) );

				expect( baseProperty.getSchema().properties ).toEqual( jasmine.objectContaining( new Map( [ [
					"extendedProperty",
					jasmine.objectContaining( {
						uri: "http://example.com/ns#extendedProperty",
						literal: true,
						literalType: "http://www.w3.org/2001/XMLSchema#string",
					} ) as any,
				] ] ) ) );

				expect( baseProperty.getSchema().properties ).toEqual( jasmine.objectContaining( new Map( [ [
					"inlineProperty",
					jasmine.objectContaining( {
						uri: "http://example.com/ns#inlineProperty",
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

		describe( method( INSTANCE, "filter" ), ():void => {

			it( hasSignature(
				"Adds an filter that affects all the query, not only possible indicated properties values.",
				[
					{ name: "constraint", type: "string", description: "RAW constrain of the filter to make." },
				],
				{ type: "this" }
			), ():void => {
			} );

			it( "should exists", ():void => {
				expect( QueryDocumentBuilder.prototype.filter ).toBeDefined();
				expect( QueryDocumentBuilder.prototype.filter ).toEqual( jasmine.any( Function ) );
			} );

			it( "should add the filter to the base property", ():void => {
				const builder:QueryDocumentBuilder = new QueryDocumentBuilder( queryContext, baseProperty );
				const helper:( constraint:string, propertyName?:string ) => void = ( constraint, propertyName ) => {
					const targetBuilder:QueryDocumentBuilder = propertyName ?
						new QueryDocumentBuilder( queryContext, queryContext.addProperty( propertyName ) ) :
						builder
					;

					targetBuilder.filter( constraint );
					expect( baseProperty.getPatterns() ).toContain( new FilterToken( constraint ) );
				};

				helper( "?property1 = ?property2" );
				helper( "?property1 = 12345" );

				helper( "?document__subProperty = 12345", "document.subProperty" );
				helper( "?document__subProperty = 12345", "document.subProperty.subSubProperty" );
			} );

		} );

		describe( method( INSTANCE, "values" ), ():void => {

			it( hasSignature(
				"Adds a filter to the specific values of the property where the query is been applied.\n" +
				"NOTE: Using this function makes all the properties in the path of the one's applied, will be obligatory to exists.",
				[
					{ name: "...values", type: "(Carbon.SPARQL.QueryDocument.QueryValue.Class | Carbon.SPARQL.QueryDocument.QueryObject.Class)[]", description: "Values the property must have so that the document would be returned." },
				],
				{ type: "this" }
			), ():void => {
			} );

			it( "should exists", ():void => {
				expect( QueryDocumentBuilder.prototype.values ).toBeDefined();
				expect( QueryDocumentBuilder.prototype.values ).toEqual( jasmine.any( Function ) );
			} );

			it( "should add values as non optional of the property", ():void => {
				const builder:QueryDocumentBuilder = new QueryDocumentBuilder( queryContext, baseProperty );

				builder.values(
					builder.value( "hello" ),
					builder.value( "world" )
				);
				expect( baseProperty.getPatterns() ).toContain( new ValuesToken()
					.addValues(
						baseProperty.variable,
						new LiteralToken( "hello" ),
						new LiteralToken( "world" )
					)
				);

				builder.values(
					builder.object( Pointer.create( "http://example.com/pointer-1" ) ),
					builder.object( Pointer.create( "ex:pointer2" ) )
				);
				expect( baseProperty.getPatterns() ).toContain( new ValuesToken()
					.addValues(
						baseProperty.variable,
						new LiteralToken( "hello" ),
						new LiteralToken( "world" ),

						new IRIToken( "http://example.com/pointer-1" ),
						new PrefixedNameToken( "ex:pointer2" )
					)
				);
			} );

			it( "should throw error if blank node is provided", ():void => {
				const builder:QueryDocumentBuilder = new QueryDocumentBuilder( queryContext, baseProperty );
				const helper:( label:string ) => void = label => () => {
					builder.values( builder.object( Pointer.create( label ) ) );
				};

				expect( helper( "_:blank-node" ) ).toThrowError( IllegalArgumentError, `Blank node "_:blank-node" is not a valid value.` );
				expect( helper( "_:another-one" ) ).toThrowError( IllegalArgumentError, `Blank node "_:another-one" is not a valid value.` );
			} );

		} );

	} );

} );
