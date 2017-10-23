import { FilterToken, IRIToken, OptionalToken, PredicateToken, SubjectToken, ValuesToken } from "sparqler/tokens";

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
		beforeEach( ():void => {
			context = new class extends AbstractContext {
				protected _baseURI:string = "http://example.com";
			};
			context.setSetting( "vocabulary", "http://example.com/vocab#" );
			queryContext = new QueryContext( context );
		} );

		describe( constructor(), ():void => {

			it( "should exists", ():void => {
				const builder:QueryDocumentBuilder = new QueryDocumentBuilder( queryContext );
				expect( builder ).toBeDefined();
				expect( builder ).toEqual( jasmine.any( QueryDocumentBuilder ) );
			} );

			it( "should initialize the schema with the general schema", ():void => {
				const builder:QueryDocumentBuilder = new QueryDocumentBuilder( queryContext );
				expect( builder[ "_schema" ] ).not.toBe( context.getObjectSchema() );

				const schema:DigestedObjectSchema = context.getObjectSchema();
				schema.vocab = "http://example.com/vocab#";
				expect( builder[ "_schema" ] ).toEqual( schema );
			} );

			it( "should initialize the document variable", ():void => {
				const builder:QueryDocumentBuilder = new QueryDocumentBuilder( queryContext );
				expect( builder[ "_document" ] ).toEqual( new QueryVariable.Class( "document", 0 ) );
			} );

			it( "should initialize the document variable with a name", ():void => {
				const builder:QueryDocumentBuilder = new QueryDocumentBuilder( queryContext, "another_name" );
				expect( builder[ "_document" ] ).toEqual( new QueryVariable.Class( "another_name", 0 ) );
			} );

		} );

		describe( property( INSTANCE, "inherit", "Readonly<{}>" ), ():void => {

			it( "should exists", ():void => {
				const builder:QueryDocumentBuilder = new QueryDocumentBuilder( queryContext );
				expect( builder.inherit ).toBeDefined();
				expect( builder.inherit ).toEqual( jasmine.any( Object ) );
			} );

			it( "should be frozen", ():void => {
				const builder:QueryDocumentBuilder = new QueryDocumentBuilder( queryContext );
				expect( builder.inherit ).toBeDefined();
				expect( Object.isFrozen( builder.inherit ) ).toBe( true );
			} );

			it( "should be the same for every builder", ():void => {
				const builder1:QueryDocumentBuilder = new QueryDocumentBuilder( queryContext );
				const builder2:QueryDocumentBuilder = new QueryDocumentBuilder( queryContext );
				const builder3:QueryDocumentBuilder = new QueryDocumentBuilder( queryContext );

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
				const builder:QueryDocumentBuilder = new QueryDocumentBuilder( queryContext );

				builder.property( "name" );
				expect( spy ).toHaveBeenCalledWith( "name" );
				builder.property( "object.name" );
				expect( spy ).toHaveBeenCalledWith( "object.name" );
			} );

		} );

		describe( method( INSTANCE, "value" ), ():void => {

			it( "should exists", ():void => {
				expect( QueryDocumentBuilder.prototype.value ).toBeDefined();
				expect( QueryDocumentBuilder.prototype.value ).toEqual( jasmine.any( Function ) );
			} );

			it( "should create a QueryValue with the name provided", ():void => {
				const spy:jasmine.Spy = spyOn( QueryValue, "Class" );
				const builder:QueryDocumentBuilder = new QueryDocumentBuilder( queryContext );

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
				const builder:QueryDocumentBuilder = new QueryDocumentBuilder( queryContext );
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
				const builder:QueryDocumentBuilder = new QueryDocumentBuilder( queryContext );

				builder.object( "http://example.com/resource/" );
				expect( spy ).toHaveBeenCalledWith( queryContext, "http://example.com/resource/" );

				const pointer:Pointer.Class = context.documents.getPointer( "http://example.com/resource/" );
				builder.object( pointer );
				expect( spy ).toHaveBeenCalledWith( queryContext, pointer );
			} );

			it( "should return a QueryObject", ():void => {
				const builder:QueryDocumentBuilder = new QueryDocumentBuilder( queryContext );
				expect( builder.object( "http://example.com/resource/" ) ).toEqual( jasmine.any( QueryObject.Class ) );
				expect( builder.object( context.documents.getPointer( "http://example.com/resource/" ) ) ).toEqual( jasmine.any( QueryObject.Class ) );
			} );

		} );

		describe( method( INSTANCE, "properties" ), ():void => {

			it( "should exists", ():void => {
				expect( QueryDocumentBuilder.prototype.properties ).toBeDefined();
				expect( QueryDocumentBuilder.prototype.properties ).toEqual( jasmine.any( Function ) );
			} );

			it( "should add properties to the schema", ():void => {
				context.extendObjectSchema( {

					"ex": "http://example.com/ns#",
					"inheritProperty": {
						"@id": "ex:inheritProperty",
					},
					"extendedProperty": {
						"@id": "ex:extendedProperty",
					},
				} );
				const builder:QueryDocumentBuilder = new QueryDocumentBuilder( queryContext );
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
				const builder:QueryDocumentBuilder = new QueryDocumentBuilder( queryContext );
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
						.addPattern( new ValuesToken()
							.addValues( new QueryVariable.Class( "defaultProperty_predicate", jasmine.any( Number ) as any ), new IRIToken( "http://example.com/vocab#defaultProperty" ) ) )
						.addPattern( new SubjectToken( new QueryVariable.Class( "document", jasmine.any( Number ) as any ) )
							.addPredicate( new PredicateToken( new QueryVariable.Class( "defaultProperty_predicate", jasmine.any( Number ) as any ) )
								.addObject( new QueryVariable.Class( "defaultProperty_object", jasmine.any( Number ) as any ) ) ) )
					,
				] );

				const inheritProperty:QueryProperty.Class = builder.property( "inheritProperty" );
				expect( inheritProperty ).toBeDefined();
				expect( inheritProperty.getPatterns() ).toEqual( [
					new OptionalToken()
						.addPattern( new ValuesToken()
							.addValues( new QueryVariable.Class( "inheritProperty_predicate", jasmine.any( Number ) as any ), new IRIToken( "http://example.com/ns#inheritProperty" ) ) )
						.addPattern( new SubjectToken( new QueryVariable.Class( "document", jasmine.any( Number ) as any ) )
							.addPredicate( new PredicateToken( new QueryVariable.Class( "inheritProperty_predicate", jasmine.any( Number ) as any ) )
								.addObject( new QueryVariable.Class( "inheritProperty_object", jasmine.any( Number ) as any ) ) ) )
					,
				] );

				const extendedProperty:QueryProperty.Class = builder.property( "extendedProperty" );
				expect( extendedProperty ).toBeDefined();
				expect( extendedProperty.getPatterns() ).toEqual( [
					new OptionalToken()
						.addPattern( new ValuesToken()
							.addValues( new QueryVariable.Class( "extendedProperty_predicate", jasmine.any( Number ) as any ), new IRIToken( "http://example.com/ns#extendedProperty" ) ) )
						.addPattern( new SubjectToken( new QueryVariable.Class( "document", jasmine.any( Number ) as any ) )
							.addPredicate( new PredicateToken( new QueryVariable.Class( "extendedProperty_predicate", jasmine.any( Number ) as any ) )
								.addObject( new QueryVariable.Class( "extendedProperty_object", jasmine.any( Number ) as any ) ) ) )
						.addPattern( new FilterToken( "datatype( ?extendedProperty_object ) = <http://www.w3.org/2001/XMLSchema#string>" ) )
					,
				] );

				const inlineProperty:QueryProperty.Class = builder.property( "inlineProperty" );
				expect( inlineProperty ).toBeDefined();
				expect( inlineProperty.getPatterns() ).toEqual( [
					new OptionalToken()
						.addPattern( new ValuesToken()
							.addValues( new QueryVariable.Class( "inlineProperty_predicate", jasmine.any( Number ) as any ), new IRIToken( "http://example.com/ns#inlineProperty" ) ) )
						.addPattern( new SubjectToken( new QueryVariable.Class( "document", jasmine.any( Number ) as any ) )
							.addPredicate( new PredicateToken( new QueryVariable.Class( "inlineProperty_predicate", jasmine.any( Number ) as any ) )
								.addObject( new QueryVariable.Class( "inlineProperty_object", jasmine.any( Number ) as any ) ) ) )
					,
				] );
			} );

		} );

	} );

} );
