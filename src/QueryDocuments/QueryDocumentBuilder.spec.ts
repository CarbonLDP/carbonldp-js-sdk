import { IRIRefToken, IRIToken, LiteralToken, PrefixedNameToken, ValuesToken, VariableToken, } from "sparqler/tokens";

import { createMockContext } from "../../test/helpers/mocks";

import { AbstractContext } from "../Context/AbstractContext";

import { IllegalArgumentError } from "../Errors/IllegalArgumentError";
import { IllegalStateError } from "../Errors/IllegalStateError";

import { DigestedObjectSchemaProperty } from "../ObjectSchema/DigestedObjectSchemaProperty";

import { Pointer } from "../Pointer/Pointer";

import { RegisteredPointer } from "../Registry/RegisteredPointer";

import { QueryContainer } from "./QueryContainer";
import { QueryDocumentBuilder, SubQueryDocumentsBuilder } from "./QueryDocumentBuilder";
import * as QueryObject2Module from "./QueryObject";
import { QueryObject } from "./QueryObject";
import { QueryProperty } from "./QueryProperty";
import { QueryRootProperty } from "./QueryRootProperty";
import * as QueryValue2Module from "./QueryValue";
import { QueryValue } from "./QueryValue";


describe( "QueryDocumentBuilder", () => {

	it( "should exist", () => {
		expect( QueryDocumentBuilder ).toBeDefined();
		expect( QueryDocumentBuilder ).toEqual( jasmine.any( Function ) );
	} );

	let context:AbstractContext<RegisteredPointer, any>;
	let queryContainer:QueryContainer;
	let baseProperty:QueryProperty;
	beforeEach( () => {
		context = createMockContext( { uri: "https://example.com" } );
		context.extendObjectSchema( {
			"@vocab": "https://example.com/vocab#",

			"ex": "https://example.com/ns#",
			"xsd": "http://www.w3.org/2001/XMLSchema#",

			"inheritGeneralProperty": {
				"@id": "ex:inheritProperty",
			},
			"extendedGeneralProperty": {
				"@id": "ex:extendedGeneralProperty",
			},
		} );

		queryContainer = new QueryContainer( context, { uris: [ "https://example.com/#root" ] } );
		baseProperty = queryContainer._queryProperty;
	} );

	describe( "QueryDocumentBuilder.constructor", () => {

		it( "should exist", () => {
			const builder:QueryDocumentBuilder = new QueryDocumentBuilder( queryContainer, baseProperty );
			expect( builder ).toBeDefined();
			expect( builder ).toEqual( jasmine.any( QueryDocumentBuilder ) );
		} );

		it( "should set the document property", () => {
			const builder:QueryDocumentBuilder = new QueryDocumentBuilder( queryContainer, baseProperty );
			expect( builder._queryProperty ).toEqual( baseProperty );
		} );

	} );


	describe( "QueryDocumentBuilder.inherit", () => {

		it( "should exist", () => {
			const builder:QueryDocumentBuilder = new QueryDocumentBuilder( queryContainer, baseProperty );
			expect( builder.inherit ).toBeDefined();
			expect( builder.inherit ).toEqual( jasmine.any( Object ) );
		} );


		it( "should be frozen", () => {
			const builder:QueryDocumentBuilder = new QueryDocumentBuilder( queryContainer, baseProperty );
			expect( builder.inherit ).toBeDefined();
			expect( Object.isFrozen( builder.inherit ) ).toBe( true );
		} );

		it( "should be the same for every builder", () => {
			const builder1:QueryDocumentBuilder = new QueryDocumentBuilder( queryContainer, baseProperty );
			const builder2:QueryDocumentBuilder = new QueryDocumentBuilder( queryContainer, baseProperty );
			const builder3:QueryDocumentBuilder = new QueryDocumentBuilder( queryContainer, baseProperty );

			expect( builder1.inherit ).toBe( builder2.inherit );
			expect( builder1.inherit ).toBe( builder3.inherit );
			expect( builder2.inherit ).toBe( builder3.inherit );
		} );

	} );

	describe( "QueryDocumentBuilder.all", () => {

		it( "should exist", () => {
			const builder:QueryDocumentBuilder = new QueryDocumentBuilder( queryContainer, baseProperty );
			expect( builder.all ).toBeDefined();
			expect( builder.all ).toEqual( jasmine.any( Object ) );
		} );


		it( "should be frozen", () => {
			const builder:QueryDocumentBuilder = new QueryDocumentBuilder( queryContainer, baseProperty );
			expect( builder.all ).toBeDefined();
			expect( Object.isFrozen( builder.all ) ).toBe( true );
		} );

		it( "should be the same for every builder", () => {
			const builder1:QueryDocumentBuilder = new QueryDocumentBuilder( queryContainer, baseProperty );
			const builder2:QueryDocumentBuilder = new QueryDocumentBuilder( queryContainer, baseProperty );
			const builder3:QueryDocumentBuilder = new QueryDocumentBuilder( queryContainer, baseProperty );

			expect( builder1.all ).toBe( builder2.all );
			expect( builder1.all ).toBe( builder3.all );
			expect( builder2.all ).toBe( builder3.all );
		} );

	} );


	describe( "QueryDocumentBuilder.property", () => {

		it( "should exist", () => {
			expect( QueryDocumentBuilder.prototype.property ).toBeDefined();
			expect( QueryDocumentBuilder.prototype.property ).toEqual( jasmine.any( Function ) );
		} );


		it( "should call the `getProperty` of the QueryProperty", () => {
			const spy:jasmine.Spy = spyOn( QueryProperty.prototype, "getProperty" )
				.and.returnValue( baseProperty );

			const builder:QueryDocumentBuilder = new QueryDocumentBuilder( queryContainer, baseProperty );

			builder.property( "name" );
			expect( spy ).toHaveBeenCalledWith( "name", { create: true } );

			builder.property( "object.name" );
			expect( spy ).toHaveBeenCalledWith( "object.name", { create: true } );
		} );

		it( "should be able to look in all the properties tree", () => {
			const spy0:jasmine.Spy = spyOn( baseProperty, "getProperty" )
				.and.returnValue( undefined );

			const path1:QueryProperty = baseProperty.addProperty( "path1", {} );
			const spy1:jasmine.Spy = spyOn( path1, "getProperty" )
				.and.returnValue( undefined );

			const path2:QueryProperty = path1.addProperty( "path2", {} );
			const spy2:jasmine.Spy = spyOn( path2, "getProperty" )
				.and.returnValue( undefined );

			const path3:QueryProperty = path2.addProperty( "path3", {} );
			const spy3:jasmine.Spy = spyOn( path3, "getProperty" )
				.and.returnValue( undefined );

			const builder:QueryDocumentBuilder = new QueryDocumentBuilder( queryContainer, path3 );

			try {
				builder.property( "name" );
			} catch {}

			expect( spy3 ).toHaveBeenCalledWith( "name", { create: true } );
			expect( spy3 ).toHaveBeenCalledBefore( spy2 );

			expect( spy2 ).toHaveBeenCalledWith( "name", { create: true } );
			expect( spy2 ).toHaveBeenCalledBefore( spy1 );

			expect( spy1 ).toHaveBeenCalledWith( "name", { create: true } );
			expect( spy1 ).toHaveBeenCalledBefore( spy0 );

			expect( spy0 ).toHaveBeenCalledWith( "name", { create: true } );
		} );

		it( "should throw error when the property does not exists", () => {
			baseProperty = baseProperty
				.addProperty( "path1", {} )
				.addProperty( "name", {} );
			const builder:QueryDocumentBuilder = new QueryDocumentBuilder( queryContainer, baseProperty );

			const helper:( name:string ) => void = ( name:string ) => () => builder.property( name );

			expect( helper( "name" ) ).not.toThrowError( IllegalArgumentError, `The property "name" was not declared.` );
			expect( helper( "path1.name" ) ).not.toThrowError( IllegalArgumentError, `The property "path1.name" was not declared.` );

			expect( helper( "path2.name" ) ).toThrowError( IllegalArgumentError, `The property "path2.name" was not declared.` );
			expect( helper( "path1.path2.name" ) ).toThrowError( IllegalArgumentError, `The property "path1.path2.name" was not declared.` );
		} );


		it( "should return self property's identifier when no path", () => {
			const builder:QueryDocumentBuilder = new QueryDocumentBuilder( queryContainer, baseProperty );

			const variable:VariableToken | IRIToken | LiteralToken = builder.property();
			expect( variable ).toBe( baseProperty.identifier );
		} );

		it( "should return property's variable with one level path", () => {
			const builder:QueryDocumentBuilder = new QueryDocumentBuilder( queryContainer, baseProperty );

			const targetProperty:QueryProperty = baseProperty.addProperty( "path1", {} );

			const variable:VariableToken | IRIToken | LiteralToken = builder.property( "path1" );
			expect( variable ).toBe( targetProperty.variable );
		} );

		it( "should return property's variable with three path", () => {
			const builder:QueryDocumentBuilder = new QueryDocumentBuilder( queryContainer, baseProperty );

			const targetProperty:QueryProperty = baseProperty
				.addProperty( "path1", {} )
				.addProperty( "path2", {} )
				.addProperty( "path3", {} )
			;

			const variable:VariableToken | IRIToken | LiteralToken = builder.property( "path1.path2.path3" );
			expect( variable ).toBe( targetProperty.variable );
		} );


		it( "should return first property's variable from three path base property", () => {
			const targetProperty:QueryProperty = baseProperty
				.addProperty( "path1", {} )
			;

			baseProperty = targetProperty
				.addProperty( "path2", {} )
				.addProperty( "path3", {} )
			;

			const builder:QueryDocumentBuilder = new QueryDocumentBuilder( queryContainer, baseProperty );

			const variable:VariableToken | IRIToken | LiteralToken = builder.property( "path1" );
			expect( variable ).toBe( targetProperty.variable );
		} );

		it( "should return second path property's variable from three path base property", () => {
			const targetProperty:QueryProperty = baseProperty
				.addProperty( "path1", {} )
				.addProperty( "path2", {} )
			;

			baseProperty = targetProperty
				.addProperty( "path3", {} )
			;

			const builder:QueryDocumentBuilder = new QueryDocumentBuilder( queryContainer, baseProperty );

			const variable:VariableToken | IRIToken | LiteralToken = builder.property( "path2" );
			expect( variable ).toBe( targetProperty.variable );
		} );

		it( "should return second full path property's variable from three path base property", () => {
			const targetProperty:QueryProperty = baseProperty
				.addProperty( "path1", {} )
				.addProperty( "path2", {} )
			;

			baseProperty = targetProperty
				.addProperty( "path3", {} )
			;

			const builder:QueryDocumentBuilder = new QueryDocumentBuilder( queryContainer, baseProperty );

			const variable:VariableToken | IRIToken | LiteralToken = builder.property( "path1.path2" );
			expect( variable ).toBe( targetProperty.variable );
		} );

	} );

	describe( "QueryDocumentBuilder.value", () => {

		it( "should exist", () => {
			expect( QueryDocumentBuilder.prototype.value ).toBeDefined();
			expect( QueryDocumentBuilder.prototype.value ).toEqual( jasmine.any( Function ) );
		} );


		it( "should create a QueryValue with the name provided", () => {
			const spy:jasmine.Spy = spyOn( QueryValue2Module, "QueryValue" );
			const builder:QueryDocumentBuilder = new QueryDocumentBuilder( queryContainer, baseProperty );

			builder.value( "name" );
			expect( spy ).toHaveBeenCalledWith( queryContainer, "name" );

			builder.value( 1 );
			expect( spy ).toHaveBeenCalledWith( queryContainer, 1 );

			builder.value( true );
			expect( spy ).toHaveBeenCalledWith( queryContainer, true );

			const date:Date = new Date();
			builder.value( date );
			expect( spy ).toHaveBeenCalledWith( queryContainer, date );
		} );

		it( "should return a QueryValue", () => {
			const builder:QueryDocumentBuilder = new QueryDocumentBuilder( queryContainer, baseProperty );
			expect( builder.value( "value" ) ).toEqual( jasmine.any( QueryValue ) );
			expect( builder.value( 10.01 ) ).toEqual( jasmine.any( QueryValue ) );
			expect( builder.value( true ) ).toEqual( jasmine.any( QueryValue ) );
			expect( builder.value( new Date() ) ).toEqual( jasmine.any( QueryValue ) );
		} );

	} );

	describe( "QueryDocumentBuilder.object", () => {

		it( "should exist", () => {
			expect( QueryDocumentBuilder.prototype.object ).toBeDefined();
			expect( QueryDocumentBuilder.prototype.object ).toEqual( jasmine.any( Function ) );
		} );


		it( "should create a QueryObject with the name provided", () => {
			const spy:jasmine.Spy = spyOn( QueryObject2Module, "QueryObject" );
			const builder:QueryDocumentBuilder = new QueryDocumentBuilder( queryContainer, baseProperty );

			builder.object( "https://example.com/resource/" );
			expect( spy ).toHaveBeenCalledWith( queryContainer, "https://example.com/resource/" );

			const pointer:Pointer = context.registry.getPointer( "https://example.com/resource/" );
			builder.object( pointer );
			expect( spy ).toHaveBeenCalledWith( queryContainer, "https://example.com/resource/" );
		} );

		it( "should return a QueryObject", () => {
			const builder:QueryDocumentBuilder = new QueryDocumentBuilder( queryContainer, baseProperty );
			expect( builder.object( "https://example.com/resource/" ) ).toEqual( jasmine.any( QueryObject ) );
			expect( builder.object( context.registry.getPointer( "https://example.com/resource/" ) ) ).toEqual( jasmine.any( QueryObject ) );
		} );

	} );


	describe( "QueryDocumentBuilder.withType", () => {

		it( "should exist", () => {
			expect( QueryDocumentBuilder.prototype.withType ).toBeDefined();
			expect( QueryDocumentBuilder.prototype.withType ).toEqual( jasmine.any( Function ) );
		} );


		it( "should throw error when properties already used", () => {
			const helper:( type:string ) => void = type => () => {
				const builder:QueryDocumentBuilder = new QueryDocumentBuilder( queryContainer, baseProperty );
				builder.properties( {
					"property": {},
				} );
				builder.withType( type );
			};

			expect( helper( "Type" ) ).toThrowError( IllegalStateError, "Types must be specified before the properties." );
			expect( helper( "https://example.com/ns#Type" ) ).toThrowError( IllegalStateError, "Types must be specified before the properties." );
		} );

		it( "should add the type to the property", () => {
			context.extendObjectSchema( { "ex": "https://example.com/ns#" } );
			const builder:QueryDocumentBuilder = new QueryDocumentBuilder( queryContainer, baseProperty );

			const spy:jasmine.Spy = spyOn( baseProperty, "addType" );

			builder.withType( "Type-1" );
			expect( spy ).toHaveBeenCalledWith( "Type-1" );

			builder.withType( "ex:Type-2" );
			expect( spy ).toHaveBeenCalledWith( "ex:Type-2" );
		} );

		it( "should return to itself", () => {
			const builder:QueryDocumentBuilder = new QueryDocumentBuilder( queryContainer, baseProperty );

			const returned:QueryDocumentBuilder = builder.withType( "Type" );
			expect( returned ).toBe( builder );
		} );

	} );

	describe( "QueryDocumentBuilder.properties", () => {

		it( "should exist", () => {
			expect( QueryDocumentBuilder.prototype.properties ).toBeDefined();
			expect( QueryDocumentBuilder.prototype.properties ).toEqual( jasmine.any( Function ) );
		} );


		it( "should create property with default data", () => {
			const builder:QueryDocumentBuilder = new QueryDocumentBuilder( queryContainer, baseProperty );
			builder.properties( {
				"defaultProperty": {},
			} );

			expect( baseProperty.getProperty( "defaultProperty" )!.definition )
				.toEqual( jasmine.objectContaining<DigestedObjectSchemaProperty>( {
					uri: "https://example.com/vocab#defaultProperty",
				} ) );
		} );

		it( "should create property with general inherit data", () => {
			const builder:QueryDocumentBuilder = new QueryDocumentBuilder( queryContainer, baseProperty );
			builder.properties( {
				"inheritGeneralProperty": {},
			} );

			expect( baseProperty.getProperty( "inheritGeneralProperty" )!.definition )
				.toEqual( jasmine.objectContaining<DigestedObjectSchemaProperty>( {
					uri: "https://example.com/ns#inheritProperty",
				} ) );
		} );

		it( "should create property with extended general inherit data", () => {
			const builder:QueryDocumentBuilder = new QueryDocumentBuilder( queryContainer, baseProperty );
			builder.properties( {
				"extendedGeneralProperty": {
					"@type": "xsd:string",
				},
			} );

			expect( baseProperty.getProperty( "extendedGeneralProperty" )!.definition )
				.toEqual( jasmine.objectContaining<DigestedObjectSchemaProperty>( {
					uri: "https://example.com/ns#extendedGeneralProperty",
					literal: true,
					literalType: "http://www.w3.org/2001/XMLSchema#string",
				} ) );
		} );

		it( "should create property with typed inherit data", () => {
			context.extendObjectSchema( "Type", {
				"inheritTypedProperty": {
					"@id": "ex:inheritProperty",
				},
			} );

			const builder:QueryDocumentBuilder = new QueryDocumentBuilder( queryContainer, baseProperty );
			builder.properties( {
				"inheritTypedProperty": {},
			} );

			expect( baseProperty.getProperty( "inheritTypedProperty" )!.definition )
				.toEqual( jasmine.objectContaining<DigestedObjectSchemaProperty>( {
					uri: "https://example.com/ns#inheritProperty",
				} ) );

		} );

		it( "should create property with typed local data", () => {
			context.extendObjectSchema( "Type", {
				"inheritTypedProperty": {
					"@id": "ex:inheritProperty",
				},
			} );

			const builder:QueryDocumentBuilder = new QueryDocumentBuilder( queryContainer, baseProperty );

			builder.withType( "Type" );
			context.clearObjectSchema( "Type" );

			builder.properties( {
				"inheritTypedProperty": {},
			} );

			expect( baseProperty.getProperty( "inheritTypedProperty" )!.definition )
				.toEqual( jasmine.objectContaining<DigestedObjectSchemaProperty>( {
					uri: "https://example.com/ns#inheritProperty",
				} ) );

		} );

		it( "should create property with inline data", () => {
			const builder:QueryDocumentBuilder = new QueryDocumentBuilder( queryContainer, baseProperty );
			builder.properties( {
				"inlineProperty": "ex:inlineProperty",
			} );

			expect( baseProperty.getProperty( "inlineProperty" )!.definition )
				.toEqual( jasmine.objectContaining<DigestedObjectSchemaProperty>( {
					uri: "https://example.com/ns#inlineProperty",
				} ) );
		} );

	} );

} );

describe( "SubQueryDocumentsBuilder", () => {

	it( "should exist", () => {
		expect( SubQueryDocumentsBuilder ).toBeDefined();
		expect( SubQueryDocumentsBuilder ).toEqual( jasmine.any( Function ) );
	} );

	let context:AbstractContext<any, any>;
	let queryContainer:QueryContainer;
	let baseProperty:QueryRootProperty;
	beforeEach( () => {
		context = createMockContext( { uri: "https://example.com" } );
		context.extendObjectSchema( {
			"@vocab": "https://example.com/vocab#",
			"ex": "https://example.com/ns#",
		} );

		queryContainer = new QueryContainer( context, { uris: [ "https://example.com/#root" ] } );
		baseProperty = queryContainer._queryProperty as QueryRootProperty;
	} );

	describe( "SubQueryDocumentsBuilder.constructor", () => {

		it( "should exist", () => {
			const builder:SubQueryDocumentsBuilder = new SubQueryDocumentsBuilder( queryContainer, baseProperty );
			expect( builder ).toBeDefined();
			expect( builder ).toEqual( jasmine.any( SubQueryDocumentsBuilder ) );
		} );

		it( "should extend from QueryDocumentBuilder", () => {
			const builder:SubQueryDocumentsBuilder = new SubQueryDocumentsBuilder( queryContainer, baseProperty );
			expect( builder ).toBeDefined();
			expect( builder ).toEqual( jasmine.any( QueryDocumentBuilder ) );
		} );

	} );


	describe( "SubQueryDocumentsBuilder.filter", () => {

		it( "should exist", () => {
			expect( SubQueryDocumentsBuilder.prototype.filter ).toBeDefined();
			expect( SubQueryDocumentsBuilder.prototype.filter ).toEqual( jasmine.any( Function ) );
		} );


		it( "should add the filter to the base property from base builder", () => {
			const spy:jasmine.Spy = spyOn( baseProperty, "addFilter" );

			const builder:SubQueryDocumentsBuilder = new SubQueryDocumentsBuilder( queryContainer, baseProperty );

			builder.filter( "?property1 = ?property2" );
			expect( spy ).toHaveBeenCalledWith( "?property1 = ?property2" );
		} );

		it( "should add the filter to the property in one level builder", () => {
			const subProperty:QueryProperty = baseProperty
				.addProperty( "subProperty", {} )
			;

			const builder:SubQueryDocumentsBuilder = new SubQueryDocumentsBuilder( queryContainer, subProperty );

			const spy:jasmine.Spy = spyOn( subProperty, "addFilter" );
			builder.filter( "?property1 = ?property2" );

			expect( spy ).toHaveBeenCalledWith( "?property1 = ?property2" );
		} );

		it( "should add the filter to the property in level three builder", () => {
			const subProperty:QueryProperty = baseProperty
				.addProperty( "subProperty1", {} )
				.addProperty( "subProperty1.1", {} )
				.addProperty( "subProperty1.1.1", {} )
			;

			const builder:SubQueryDocumentsBuilder = new SubQueryDocumentsBuilder( queryContainer, subProperty );

			const spy:jasmine.Spy = spyOn( subProperty, "addFilter" );
			builder.filter( "?property1 = ?property2" );

			expect( spy ).toHaveBeenCalledWith( "?property1 = ?property2" );
		} );

	} );

	describe( "SubQueryDocumentsBuilder.values", () => {

		it( "should exist", () => {
			expect( SubQueryDocumentsBuilder.prototype.values ).toBeDefined();
			expect( SubQueryDocumentsBuilder.prototype.values ).toEqual( jasmine.any( Function ) );
		} );

		it( "should add values to the property", () => {
			const targetProperty:QueryProperty = baseProperty
				.addProperty( "sub-property", {} );

			const builder:SubQueryDocumentsBuilder = new SubQueryDocumentsBuilder( queryContainer, targetProperty );

			builder.values(
				builder.value( "hello" ),
				builder.value( "world" )
			);

			expect( targetProperty.getSearchPatterns() ).toContain( new ValuesToken()
				.addVariables( targetProperty.variable )
				.addValues( new LiteralToken( "hello" ) )
				.addValues( new LiteralToken( "world" ) )
			);
		} );

		it( "should append values to the property", () => {
			const targetProperty:QueryProperty = baseProperty
				.addProperty( "sub-property", {} );

			const builder:SubQueryDocumentsBuilder = new SubQueryDocumentsBuilder( queryContainer, targetProperty );

			builder
				.values(
					builder.value( "hello" ),
					builder.value( "world" )
				)
				.values(
					builder.object( Pointer.create( { $id: "https://example.com/pointer-1" } ) ),
					builder.object( Pointer.create( { $id: "ex:pointer2" } ) )
				)
			;

			expect( targetProperty.getSearchPatterns() ).toContain( new ValuesToken()
				.addVariables( targetProperty.variable )
				.addValues( new LiteralToken( "hello" ) )
				.addValues( new LiteralToken( "world" ) )
				.addValues( new IRIRefToken( "https://example.com/pointer-1" ) )
				.addValues( new PrefixedNameToken( "ex:pointer2" ) )
			);
		} );

		it( "should throw error if blank node is provided", () => {
			const builder:SubQueryDocumentsBuilder = new SubQueryDocumentsBuilder( queryContainer, baseProperty );
			const helper:( label:string ) => void = label => () => {
				builder.values( builder.object( Pointer.create( { $id: label } ) ) );
			};

			expect( helper( "_:blank-node" ) ).toThrowError( IllegalArgumentError, `Cannot assign blank nodes ("_:blank-node").` );
			expect( helper( "_:another-one" ) ).toThrowError( IllegalArgumentError, `Cannot assign blank nodes ("_:another-one").` );
		} );

	} );

} );
