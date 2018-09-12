import { IRIRefToken, LiteralToken, PrefixedNameToken, ValuesToken, } from "sparqler/tokens";

import { createMockContext } from "../../test/helpers/mocks";

import { AbstractContext } from "../Context/AbstractContext";

import { IllegalArgumentError } from "../Errors/IllegalArgumentError";
import { IllegalStateError } from "../Errors/IllegalStateError";

import { Pointer } from "../Pointer/Pointer";

import { clazz, constructor, extendsClass, hasSignature, INSTANCE, method, module, property } from "../test/JasmineExtender";

import { QueryBuilderProperty } from "./QueryBuilderProperty";
import { QueryContainerType } from "./QueryContainerType";
import { QueryDocumentBuilder2, SubQueryDocumentsBuilder } from "./QueryDocumentBuilder2";
import { QueryDocumentContainer } from "./QueryDocumentContainer";
import * as QueryObject2Module from "./QueryObject2";
import { QueryObject2 } from "./QueryObject2";
import { QueryRootProperty } from "./QueryRootProperty";
import * as QueryValue2Module from "./QueryValue2";
import { QueryValue2 } from "./QueryValue2";
import { QueryVariable } from "./QueryVariable";


describe( module( "carbonldp/QueryDocuments/QueryDocumentBuilder2" ), ():void => {

	describe( clazz( "CarbonLDP.QueryDocuments.QueryDocumentBuilder2", "Class with the helpers and properties for construct a query document" ), ():void => {

		it( "should exists", ():void => {
			expect( QueryDocumentBuilder2 ).toBeDefined();
			expect( QueryDocumentBuilder2 ).toEqual( jasmine.any( Function ) );
		} );

		let context:AbstractContext<any, any>;
		let queryContainer:QueryDocumentContainer;
		let baseProperty:QueryBuilderProperty;
		beforeEach( ():void => {
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

			queryContainer = new QueryDocumentContainer( context, { name: "root", uri: "https://example.com/#root", containerType: QueryContainerType.DOCUMENT } );
			baseProperty = queryContainer._queryProperty;
		} );

		describe( constructor(), ():void => {

			it( "should exists", ():void => {
				const builder:QueryDocumentBuilder2 = new QueryDocumentBuilder2( queryContainer, baseProperty );
				expect( builder ).toBeDefined();
				expect( builder ).toEqual( jasmine.any( QueryDocumentBuilder2 ) );
			} );

			it( "should set the document property", ():void => {
				const builder:QueryDocumentBuilder2 = new QueryDocumentBuilder2( queryContainer, baseProperty );
				expect( builder._queryProperty ).toEqual( baseProperty );
			} );

		} );


		describe( property( INSTANCE, "inherit", "Readonly<{}>", "Property to make a descriptive inheritance os a query property definition." ), ():void => {

			it( "should exists", ():void => {
				const builder:QueryDocumentBuilder2 = new QueryDocumentBuilder2( queryContainer, baseProperty );
				expect( builder.inherit ).toBeDefined();
				expect( builder.inherit ).toEqual( jasmine.any( Object ) );
			} );

			it( "should be frozen", ():void => {
				const builder:QueryDocumentBuilder2 = new QueryDocumentBuilder2( queryContainer, baseProperty );
				expect( builder.inherit ).toBeDefined();
				expect( Object.isFrozen( builder.inherit ) ).toBe( true );
			} );

			it( "should be the same for every builder", ():void => {
				const builder1:QueryDocumentBuilder2 = new QueryDocumentBuilder2( queryContainer, baseProperty );
				const builder2:QueryDocumentBuilder2 = new QueryDocumentBuilder2( queryContainer, baseProperty );
				const builder3:QueryDocumentBuilder2 = new QueryDocumentBuilder2( queryContainer, baseProperty );

				expect( builder1.inherit ).toBe( builder2.inherit );
				expect( builder1.inherit ).toBe( builder3.inherit );
				expect( builder2.inherit ).toBe( builder3.inherit );
			} );

		} );

		describe( property( INSTANCE, "all", "Readonly<{}>", "Property to describe the fetching of the entire resource properties." ), ():void => {

			it( "should exists", ():void => {
				const builder:QueryDocumentBuilder2 = new QueryDocumentBuilder2( queryContainer, baseProperty );
				expect( builder.all ).toBeDefined();
				expect( builder.all ).toEqual( jasmine.any( Object ) );
			} );

			it( "should be frozen", ():void => {
				const builder:QueryDocumentBuilder2 = new QueryDocumentBuilder2( queryContainer, baseProperty );
				expect( builder.all ).toBeDefined();
				expect( Object.isFrozen( builder.all ) ).toBe( true );
			} );

			it( "should be the same for every builder", ():void => {
				const builder1:QueryDocumentBuilder2 = new QueryDocumentBuilder2( queryContainer, baseProperty );
				const builder2:QueryDocumentBuilder2 = new QueryDocumentBuilder2( queryContainer, baseProperty );
				const builder3:QueryDocumentBuilder2 = new QueryDocumentBuilder2( queryContainer, baseProperty );

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
				{ type: "CarbonLDP.QueryDocuments.QueryVariable" }
			), ():void => {} );

			it( "should exists", ():void => {
				expect( QueryDocumentBuilder2.prototype.property ).toBeDefined();
				expect( QueryDocumentBuilder2.prototype.property ).toEqual( jasmine.any( Function ) );
			} );

			it( "should call the `getProperty` of the QueryBuilderProperty", ():void => {
				const spy:jasmine.Spy = spyOn( QueryBuilderProperty.prototype, "getProperty" )
					.and.returnValue( baseProperty );

				const builder:QueryDocumentBuilder2 = new QueryDocumentBuilder2( queryContainer, baseProperty );

				builder.property( "name" );
				expect( spy ).toHaveBeenCalledWith( "name", { create: true } );

				builder.property( "object.name" );
				expect( spy ).toHaveBeenCalledWith( "object.name", { create: true } );
			} );

			it( "should be able to look in all the properties tree", ():void => {
				const spy0:jasmine.Spy = spyOn( baseProperty, "getProperty" )
					.and.returnValue( undefined );

				const path1:QueryBuilderProperty = baseProperty.addProperty( "path1", {} );
				const spy1:jasmine.Spy = spyOn( path1, "getProperty" )
					.and.returnValue( undefined );

				const path2:QueryBuilderProperty = path1.addProperty( "path2", {} );
				const spy2:jasmine.Spy = spyOn( path2, "getProperty" )
					.and.returnValue( undefined );

				const path3:QueryBuilderProperty = path2.addProperty( "path3", {} );
				const spy3:jasmine.Spy = spyOn( path3, "getProperty" )
					.and.returnValue( undefined );

				const builder:QueryDocumentBuilder2 = new QueryDocumentBuilder2( queryContainer, path3 );

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

			it( "should throw error when the property does not exists", ():void => {
				baseProperty = baseProperty
					.addProperty( "path1", {} )
					.addProperty( "name", {} );
				const builder:QueryDocumentBuilder2 = new QueryDocumentBuilder2( queryContainer, baseProperty );

				const helper:( name:string ) => void = ( name:string ) => () => builder.property( name );

				expect( helper( "name" ) ).not.toThrowError( IllegalArgumentError, `The property "name" was not declared.` );
				expect( helper( "path1.name" ) ).not.toThrowError( IllegalArgumentError, `The property "path1.name" was not declared.` );

				expect( helper( "path2.name" ) ).toThrowError( IllegalArgumentError, `The property "path2.name" was not declared.` );
				expect( helper( "path1.path2.name" ) ).toThrowError( IllegalArgumentError, `The property "path1.path2.name" was not declared.` );
			} );


			it( "should return self property's variable when no path", ():void => {
				const builder:QueryDocumentBuilder2 = new QueryDocumentBuilder2( queryContainer, baseProperty );

				const variable:QueryVariable = builder.property();
				expect( variable ).toBe( baseProperty.variable );
			} );

			it( "should return property's variable with one level path", ():void => {
				const builder:QueryDocumentBuilder2 = new QueryDocumentBuilder2( queryContainer, baseProperty );

				const targetProperty:QueryBuilderProperty = baseProperty.addProperty( "path1", {} );

				const variable:QueryVariable = builder.property( "path1" );
				expect( variable ).toBe( targetProperty.variable );
			} );

			it( "should return property's variable with three path", ():void => {
				const builder:QueryDocumentBuilder2 = new QueryDocumentBuilder2( queryContainer, baseProperty );

				const targetProperty:QueryBuilderProperty = baseProperty
					.addProperty( "path1", {} )
					.addProperty( "path2", {} )
					.addProperty( "path3", {} )
				;

				const variable:QueryVariable = builder.property( "path1.path2.path3" );
				expect( variable ).toBe( targetProperty.variable );
			} );


			it( "should return first property's variable from three path base property", ():void => {
				const targetProperty:QueryBuilderProperty = baseProperty
					.addProperty( "path1", {} )
				;

				baseProperty = targetProperty
					.addProperty( "path2", {} )
					.addProperty( "path3", {} )
				;

				const builder:QueryDocumentBuilder2 = new QueryDocumentBuilder2( queryContainer, baseProperty );

				const variable:QueryVariable = builder.property( "path1" );
				expect( variable ).toBe( targetProperty.variable );
			} );

			it( "should return second path property's variable from three path base property", ():void => {
				const targetProperty:QueryBuilderProperty = baseProperty
					.addProperty( "path1", {} )
					.addProperty( "path2", {} )
				;

				baseProperty = targetProperty
					.addProperty( "path3", {} )
				;

				const builder:QueryDocumentBuilder2 = new QueryDocumentBuilder2( queryContainer, baseProperty );

				const variable:QueryVariable = builder.property( "path2" );
				expect( variable ).toBe( targetProperty.variable );
			} );

			it( "should return second full path property's variable from three path base property", ():void => {
				const targetProperty:QueryBuilderProperty = baseProperty
					.addProperty( "path1", {} )
					.addProperty( "path2", {} )
				;

				baseProperty = targetProperty
					.addProperty( "path3", {} )
				;

				const builder:QueryDocumentBuilder2 = new QueryDocumentBuilder2( queryContainer, baseProperty );

				const variable:QueryVariable = builder.property( "path1.path2" );
				expect( variable ).toBe( targetProperty.variable );
			} );

		} );

		describe( method( INSTANCE, "value" ), ():void => {

			it( hasSignature(
				"Wraps a basic value to be used correctly in the query filters and values.",
				[
					{ name: "value", type: "string | number | boolean | Date", description: "Value to be converted in a safe to use in query object." },
				],
				{ type: "CarbonLDP.QueryDocuments.QueryValue" }
			), ():void => {} );

			it( "should exists", ():void => {
				expect( QueryDocumentBuilder2.prototype.value ).toBeDefined();
				expect( QueryDocumentBuilder2.prototype.value ).toEqual( jasmine.any( Function ) );
			} );


			it( "should create a QueryValue with the name provided", ():void => {
				const spy:jasmine.Spy = spyOn( QueryValue2Module, "QueryValue2" );
				const builder:QueryDocumentBuilder2 = new QueryDocumentBuilder2( queryContainer, baseProperty );

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

			it( "should return a QueryValue", ():void => {
				const builder:QueryDocumentBuilder2 = new QueryDocumentBuilder2( queryContainer, baseProperty );
				expect( builder.value( "value" ) ).toEqual( jasmine.any( QueryValue2 ) );
				expect( builder.value( 10.01 ) ).toEqual( jasmine.any( QueryValue2 ) );
				expect( builder.value( true ) ).toEqual( jasmine.any( QueryValue2 ) );
				expect( builder.value( new Date() ) ).toEqual( jasmine.any( QueryValue2 ) );
			} );

		} );

		describe( method( INSTANCE, "object" ), ():void => {

			it( hasSignature(
				"Wraps a pointer or URi to be used correctly in the query filters and values.",
				[
					{ name: "value", type: "CarbonLDP.Pointer | string", description: "Pointer or URI to be converted in a safe to use in query object." },
				],
				{ type: "CarbonLDP.QueryDocuments.QueryObject" }
			), ():void => {} );

			it( "should exists", ():void => {
				expect( QueryDocumentBuilder2.prototype.object ).toBeDefined();
				expect( QueryDocumentBuilder2.prototype.object ).toEqual( jasmine.any( Function ) );
			} );


			it( "should create a QueryObject with the name provided", ():void => {
				const spy:jasmine.Spy = spyOn( QueryObject2Module, "QueryObject2" );
				const builder:QueryDocumentBuilder2 = new QueryDocumentBuilder2( queryContainer, baseProperty );

				builder.object( "https://example.com/resource/" );
				expect( spy ).toHaveBeenCalledWith( queryContainer, "https://example.com/resource/" );

				const pointer:Pointer = context.registry.getPointer( "https://example.com/resource/" );
				builder.object( pointer );
				expect( spy ).toHaveBeenCalledWith( queryContainer, "https://example.com/resource/" );
			} );

			it( "should return a QueryObject", ():void => {
				const builder:QueryDocumentBuilder2 = new QueryDocumentBuilder2( queryContainer, baseProperty );
				expect( builder.object( "https://example.com/resource/" ) ).toEqual( jasmine.any( QueryObject2 ) );
				expect( builder.object( context.registry.getPointer( "https://example.com/resource/" ) ) ).toEqual( jasmine.any( QueryObject2 ) );
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
			), ():void => {} );

			it( "should exists", ():void => {
				expect( QueryDocumentBuilder2.prototype.withType ).toBeDefined();
				expect( QueryDocumentBuilder2.prototype.withType ).toEqual( jasmine.any( Function ) );
			} );


			it( "should throw error when properties already used", ():void => {
				const helper:( type:string ) => void = type => () => {
					const builder:QueryDocumentBuilder2 = new QueryDocumentBuilder2( queryContainer, baseProperty );
					builder.properties( {
						"property": {},
					} );
					builder.withType( type );
				};

				expect( helper( "Type" ) ).toThrowError( IllegalStateError, "Types must be specified before the properties." );
				expect( helper( "https://example.com/ns#Type" ) ).toThrowError( IllegalStateError, "Types must be specified before the properties." );
			} );

			it( "should add the type to the property", ():void => {
				context.extendObjectSchema( { "ex": "https://example.com/ns#" } );
				const builder:QueryDocumentBuilder2 = new QueryDocumentBuilder2( queryContainer, baseProperty );

				const spy:jasmine.Spy = spyOn( baseProperty, "addType" );

				builder.withType( "Type-1" );
				expect( spy ).toHaveBeenCalledWith( "Type-1" );

				builder.withType( "ex:Type-2" );
				expect( spy ).toHaveBeenCalledWith( "ex:Type-2" );
			} );

			it( "should return to itself", ():void => {
				const builder:QueryDocumentBuilder2 = new QueryDocumentBuilder2( queryContainer, baseProperty );

				const returned:QueryDocumentBuilder2 = builder.withType( "Type" );
				expect( returned ).toBe( builder );
			} );

		} );

		describe( method( INSTANCE, "properties" ), ():void => {

			it( hasSignature(
				"Method that allows to specify the property to be retrieved the the target document",
				[
					{ name: "propertiesSchema", type: "CarbonLDP.QueryDocuments.QuerySchema", description: "Similar as an schema object, but this specifies the properties to be retrieved." },
				],
				{ type: "this" }
			), ():void => {} );

			it( "should exists", ():void => {
				expect( QueryDocumentBuilder2.prototype.properties ).toBeDefined();
				expect( QueryDocumentBuilder2.prototype.properties ).toEqual( jasmine.any( Function ) );
			} );


			it( "should create property with default data", ():void => {
				const builder:QueryDocumentBuilder2 = new QueryDocumentBuilder2( queryContainer, baseProperty );
				builder.properties( {
					"defaultProperty": {},
				} );

				expect( baseProperty.getProperty( "defaultProperty" ).definition )
					.toEqual( jasmine.objectContaining( {
						uri: "https://example.com/vocab#defaultProperty",
					} ) );
			} );

			it( "should create property with general inherit data", ():void => {
				const builder:QueryDocumentBuilder2 = new QueryDocumentBuilder2( queryContainer, baseProperty );
				builder.properties( {
					"inheritGeneralProperty": {},
				} );

				expect( baseProperty.getProperty( "inheritGeneralProperty" ).definition )
					.toEqual( jasmine.objectContaining( {
						uri: "https://example.com/ns#inheritProperty",
					} ) );
			} );

			it( "should create property with extended general inherit data", ():void => {
				const builder:QueryDocumentBuilder2 = new QueryDocumentBuilder2( queryContainer, baseProperty );
				builder.properties( {
					"extendedGeneralProperty": {
						"@type": "xsd:string",
					},
				} );

				expect( baseProperty.getProperty( "extendedGeneralProperty" ).definition )
					.toEqual( jasmine.objectContaining( {
						uri: "https://example.com/ns#extendedGeneralProperty",
						literal: true,
						literalType: "http://www.w3.org/2001/XMLSchema#string",
					} ) );
			} );

			it( "should create property with typed inherit data", ():void => {
				context.extendObjectSchema( "Type", {
					"inheritTypedProperty": {
						"@id": "ex:inheritProperty",
					},
				} );

				const builder:QueryDocumentBuilder2 = new QueryDocumentBuilder2( queryContainer, baseProperty );
				builder.properties( {
					"inheritTypedProperty": {},
				} );

				expect( baseProperty.getProperty( "inheritTypedProperty" ).definition )
					.toEqual( jasmine.objectContaining( {
						uri: "https://example.com/ns#inheritProperty",
					} ) );

			} );

			it( "should create property with typed local data", ():void => {
				context.extendObjectSchema( "Type", {
					"inheritTypedProperty": {
						"@id": "ex:inheritProperty",
					},
				} );

				const builder:QueryDocumentBuilder2 = new QueryDocumentBuilder2( queryContainer, baseProperty );

				builder.withType( "Type" );
				context.clearObjectSchema( "Type" );

				builder.properties( {
					"inheritTypedProperty": {},
				} );

				expect( baseProperty.getProperty( "inheritTypedProperty" ).definition )
					.toEqual( jasmine.objectContaining( {
						uri: "https://example.com/ns#inheritProperty",
					} ) );

			} );

			it( "should create property with inline data", ():void => {
				const builder:QueryDocumentBuilder2 = new QueryDocumentBuilder2( queryContainer, baseProperty );
				builder.properties( {
					"inlineProperty": "ex:inlineProperty",
				} );

				expect( baseProperty.getProperty( "inlineProperty" ).definition )
					.toEqual( jasmine.objectContaining( {
						uri: "https://example.com/ns#inlineProperty",
					} ) );
			} );

		} );

	} );

	describe( clazz( "CarbonLDP.QueryDocuments.SubQueryDocumentsBuilder", "Class with the helpers and properties for construct a query document" ), ():void => {

		it( "should exists", ():void => {
			expect( SubQueryDocumentsBuilder ).toBeDefined();
			expect( SubQueryDocumentsBuilder ).toEqual( jasmine.any( Function ) );
		} );

		let context:AbstractContext<any, any>;
		let queryContainer:QueryDocumentContainer;
		let baseProperty:QueryRootProperty;
		beforeEach( ():void => {
			context = createMockContext( { uri: "https://example.com" } );
			context.extendObjectSchema( {
				"@vocab": "https://example.com/vocab#",
				"ex": "https://example.com/ns#",
			} );

			queryContainer = new QueryDocumentContainer( context, { name: "root", uri: "https://example.com/#root", containerType: QueryContainerType.DOCUMENT } );
			baseProperty = queryContainer._queryProperty;
		} );

		describe( constructor(), ():void => {

			it( "should exists", ():void => {
				const builder:SubQueryDocumentsBuilder = new SubQueryDocumentsBuilder( queryContainer, baseProperty );
				expect( builder ).toBeDefined();
				expect( builder ).toEqual( jasmine.any( SubQueryDocumentsBuilder ) );
			} );

		} );

		it( extendsClass( "CarbonLDP.QueryDocuments.QueryDocumentBuilder" ), () => {
			const builder:SubQueryDocumentsBuilder = new SubQueryDocumentsBuilder( queryContainer, baseProperty );
			expect( builder ).toBeDefined();
			expect( builder ).toEqual( jasmine.any( QueryDocumentBuilder2 ) );
		} );


		describe( method( INSTANCE, "filter" ), ():void => {

			it( hasSignature(
				"Adds an filter that affects all the query, not only possible indicated properties values.",
				[
					{ name: "constraint", type: "string", description: "RAW constrain of the filter to make." },
				],
				{ type: "this" }
			), ():void => {} );

			it( "should exists", ():void => {
				expect( SubQueryDocumentsBuilder.prototype.filter ).toBeDefined();
				expect( SubQueryDocumentsBuilder.prototype.filter ).toEqual( jasmine.any( Function ) );
			} );


			it( "should add the filter to the base property from base builder", ():void => {
				const spy:jasmine.Spy = spyOn( baseProperty, "addFilter" );

				const builder:SubQueryDocumentsBuilder = new SubQueryDocumentsBuilder( queryContainer, baseProperty );

				builder.filter( "?property1 = ?property2" );
				expect( spy ).toHaveBeenCalledWith( "?property1 = ?property2" );
			} );

			it( "should add the filter to the property in one level builder", ():void => {
				const subProperty:QueryBuilderProperty = baseProperty
					.addProperty( "subProperty", {} )
				;

				const builder:SubQueryDocumentsBuilder = new SubQueryDocumentsBuilder( queryContainer, subProperty );

				const spy:jasmine.Spy = spyOn( subProperty, "addFilter" );
				builder.filter( "?property1 = ?property2" );

				expect( spy ).toHaveBeenCalledWith( "?property1 = ?property2" );
			} );

			it( "should add the filter to the property in level three builder", ():void => {
				const subProperty:QueryBuilderProperty = baseProperty
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

		describe( method( INSTANCE, "values" ), ():void => {

			it( hasSignature(
				"Adds a filter to the specific values of the property where the query is been applied.\n" +
				"NOTE: Using this function makes all the properties in the path of the one's applied, will be obligatory to exists.",
				[
					{ name: "...values", type: "(CarbonLDP.QueryDocuments.QueryValue | CarbonLDP.QueryDocuments.QueryObject)[]", description: "Values the property must have so that the document would be returned." },
				],
				{ type: "this" }
			), ():void => {} );

			it( "should exists", ():void => {
				expect( SubQueryDocumentsBuilder.prototype.values ).toBeDefined();
				expect( SubQueryDocumentsBuilder.prototype.values ).toEqual( jasmine.any( Function ) );
			} );

			it( "should add values to the property", ():void => {
				const builder:SubQueryDocumentsBuilder = new SubQueryDocumentsBuilder( queryContainer, baseProperty );

				builder.values(
					builder.value( "hello" ),
					builder.value( "world" )
				);

				expect( baseProperty.getSearchPatterns() ).toContain( new ValuesToken()
					.addVariables( baseProperty.variable )
					.addValues( new LiteralToken( "hello" ) )
					.addValues( new LiteralToken( "world" ) )
				);
			} );

			it( "should append values to the property", ():void => {
				const builder:SubQueryDocumentsBuilder = new SubQueryDocumentsBuilder( queryContainer, baseProperty );

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

				expect( baseProperty.getSearchPatterns() ).toContain( new ValuesToken()
					.addVariables( baseProperty.variable )
					.addValues( new LiteralToken( "hello" ) )
					.addValues( new LiteralToken( "world" ) )
					.addValues( new IRIRefToken( "https://example.com/pointer-1" ) )
					.addValues( new PrefixedNameToken( "ex:pointer2" ) )
				);
			} );

			it( "should throw error if blank node is provided", ():void => {
				const builder:SubQueryDocumentsBuilder = new SubQueryDocumentsBuilder( queryContainer, baseProperty );
				const helper:( label:string ) => void = label => () => {
					builder.values( builder.object( Pointer.create( { $id: label } ) ) );
				};

				expect( helper( "_:blank-node" ) ).toThrowError( IllegalArgumentError, `Cannot assign blank nodes ("_:blank-node").` );
				expect( helper( "_:another-one" ) ).toThrowError( IllegalArgumentError, `Cannot assign blank nodes ("_:another-one").` );
			} );

		} );

	} );

} );
