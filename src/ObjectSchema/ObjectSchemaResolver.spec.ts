import { createMockContext, createMockQueryableMetadata } from "../../test/helpers/mocks/core";

import { Context } from "../Context/Context";

import { ModelDecorator } from "../Model/ModelDecorator";
import { ModelPrototype } from "../Model/ModelPrototype";

import { QueryablePointer } from "../QueryDocuments/QueryablePointer";

import { BaseResource } from "../Resource/BaseResource";

import {
	extendsClass,
	hasSignature,
	INSTANCE,
	interfaze,
	method,
	module,
	OBLIGATORY,
	property
} from "../test/JasmineExtender";

import { C } from "../Vocabularies/C";

import { DigestedObjectSchema } from "./DigestedObjectSchema";
import { ObjectSchemaDigester } from "./ObjectSchemaDigester";
import { ObjectSchemaResolver, ObjectSchemaResolverFactory } from "./ObjectSchemaResolver";


function createMock<T extends {}>( data?:T & Partial<ObjectSchemaResolver> ):ObjectSchemaResolver {
	return ObjectSchemaResolver.decorate( Object.assign( {}, data ) );
}

describe( module( "carbonldp/ObjectSchema" ), ():void => {

	describe( interfaze(
		"CarbonLDP.ObjectSchemaResolver",
		"Interface that defines the methods needed for an element that can provide object schemas."
	), ():void => {

		describe( method( OBLIGATORY, "getGeneralSchema" ), ():void => {

			it( hasSignature(
				"Returns the general object schema that applies to all the objects.",
				{ type: "CarbonLDP.DigestedObjectSchema" }
			), ():void => {} );

			it( "should exists", ():void => {
				const resolver:ObjectSchemaResolver = createMock();

				expect( resolver.getGeneralSchema ).toBeDefined();
				expect( resolver.getGeneralSchema ).toEqual( jasmine.any( Function ) );
			} );


			it( "should return empty when no context", () => {
				const resolver:ObjectSchemaResolver = createMock();

				const returned:DigestedObjectSchema = resolver.getGeneralSchema();

				expect( returned ).toEqual( new DigestedObjectSchema() );
			} );

			it( "should get general schema from context", () => {
				const $context:Context = createMockContext();
				const resolver:ObjectSchemaResolver = createMock( { context: $context } );

				const schema:DigestedObjectSchema = new DigestedObjectSchema();
				const spy:jasmine.Spy = spyOn( $context, "getObjectSchema" )
					.and.returnValue( schema );

				const returned:DigestedObjectSchema = resolver.getGeneralSchema();
				expect( spy ).toHaveBeenCalledWith();
				expect( returned ).toBe( schema );
			} );

		} );


		describe( method( OBLIGATORY, "hasSchemaFor" ), ():void => {

			it( hasSignature(
				"Returns true if the object provided has an specific schema for.",
				[
					{ name: "object", type: "object", description: "The object to look for if it has an schema." },
				],
				{ type: "boolean" }
			), ():void => {} );

			it( "should exists", ():void => {
				const resolver:ObjectSchemaResolver = createMock();

				expect( resolver.hasSchemaFor ).toBeDefined();
				expect( resolver.hasSchemaFor ).toEqual( jasmine.any( Function ) );
			} );


			it( "should return true when no path provided", () => {
				const resolver:ObjectSchemaResolver = createMock();

				const returned:boolean = resolver.hasSchemaFor( {} );
				expect( returned ).toBe( true );
			} );

			it( "should return false when path provided", () => {
				const resolver:ObjectSchemaResolver = createMock();

				const returned:boolean = resolver.hasSchemaFor( {}, "path" );
				expect( returned ).toBe( false );
			} );

		} );

		describe( method( OBLIGATORY, "getSchemaFor" ), ():void => {

			it( hasSignature(
				"Returns the specific object schema that applies to the object provided.",
				[
					{ name: "object", type: "object", description: "The object to look for its schema." },
				],
				{ type: "CarbonLDP.DigestedObjectSchema" }
			), ():void => {} );

			it( "should exists", ():void => {
				const resolver:ObjectSchemaResolver = createMock();

				expect( resolver.getSchemaFor ).toBeDefined();
				expect( resolver.getSchemaFor ).toEqual( jasmine.any( Function ) );
			} );


			it( "should return get schemas from @type", () => {
				const $context:Context = createMockContext();
				const resolver:ObjectSchemaResolver = createMock( { context: $context } );

				$context.extendObjectSchema( "Type-1", {} );
				$context.extendObjectSchema( "Type-2", {} );
				const spy:jasmine.Spy = spyOn( $context, "getObjectSchema" )
					.and.callThrough();


				resolver.getSchemaFor( { "@type": [ "Type-1", "Type-2" ] } );
				expect( spy ).toHaveBeenCalledWith( "Type-1" );
				expect( spy ).toHaveBeenCalledWith( "Type-2" );
			} );

			it( "should return get schemas from types", () => {
				const $context:Context = createMockContext();
				const resolver:ObjectSchemaResolver = createMock( { context: $context } );

				$context.extendObjectSchema( "Type-1", {} );
				$context.extendObjectSchema( "Type-2", {} );
				const spy:jasmine.Spy = spyOn( $context, "getObjectSchema" )
					.and.callThrough();


				resolver.getSchemaFor( { "types": [ "Type-1", "Type-2" ] } );
				expect( spy ).toHaveBeenCalledWith( "Type-1" );
				expect( spy ).toHaveBeenCalledWith( "Type-2" );
			} );


			it( "should return c:Document schema when document URI in @id", () => {
				const $context:Context = createMockContext();
				const resolver:ObjectSchemaResolver = createMock( { context: $context } );

				$context.extendObjectSchema( C.Document, {} );
				const spy:jasmine.Spy = spyOn( $context, "getObjectSchema" )
					.and.callThrough();


				resolver.getSchemaFor( { "@id": "https://example.com/" } );
				expect( spy ).toHaveBeenCalledWith( C.Document );
			} );

			it( "should return c:Document schema when document URI in id", () => {
				const $context:Context = createMockContext();
				const resolver:ObjectSchemaResolver = createMock( { context: $context } );

				$context.extendObjectSchema( C.Document, {} );
				const spy:jasmine.Spy = spyOn( $context, "getObjectSchema" )
					.and.callThrough();


				resolver.getSchemaFor( { $id: "https://example.com/" } );
				expect( spy ).toHaveBeenCalledWith( C.Document );
			} );

			it( "should not return c:Document schema when fragment in @id", () => {
				const $context:Context = createMockContext();
				const resolver:ObjectSchemaResolver = createMock( { context: $context } );

				$context.extendObjectSchema( C.Document, {} );
				const spy:jasmine.Spy = spyOn( $context, "getObjectSchema" )
					.and.callThrough();


				resolver.getSchemaFor( { "@id": "https://example.com/#fragment" } );
				expect( spy ).not.toHaveBeenCalledWith( C.Document );
			} );

			it( "should not return c:Document schema when fragment in id", () => {
				const $context:Context = createMockContext();
				const resolver:ObjectSchemaResolver = createMock( { context: $context } );

				$context.extendObjectSchema( C.Document, {} );
				const spy:jasmine.Spy = spyOn( $context, "getObjectSchema" )
					.and.callThrough();


				resolver.getSchemaFor( { "id": "https://example.com/#fragment" } );
				expect( spy ).not.toHaveBeenCalledWith( C.Document );
			} );

			it( "should not return c:Document schema when bNode label in @id", () => {
				const $context:Context = createMockContext();
				const resolver:ObjectSchemaResolver = createMock( { context: $context } );

				$context.extendObjectSchema( C.Document, {} );
				const spy:jasmine.Spy = spyOn( $context, "getObjectSchema" )
					.and.callThrough();


				resolver.getSchemaFor( { "@id": "_:bNode" } );
				expect( spy ).not.toHaveBeenCalledWith( C.Document );
			} );

			it( "should not return c:Document schema when bNode label in id", () => {
				const $context:Context = createMockContext();
				const resolver:ObjectSchemaResolver = createMock( { context: $context } );

				$context.extendObjectSchema( C.Document, {} );
				const spy:jasmine.Spy = spyOn( $context, "getObjectSchema" )
					.and.callThrough();


				resolver.getSchemaFor( { "id": "_:bNode" } );
				expect( spy ).not.toHaveBeenCalledWith( C.Document );
			} );


			it( "should return combined schemas with the general when Node", () => {
				const $context:Context = createMockContext();
				const resolver:ObjectSchemaResolver = createMock( { context: $context } );

				$context
					.extendObjectSchema( { "inGeneral": {} } )
					.extendObjectSchema( "Type-1", { "inType": {} } )
				;

				const returned:DigestedObjectSchema = resolver.getSchemaFor( { "@type": [ "Type-1" ] } );
				expect( returned ).toEqual( ObjectSchemaDigester.digestSchema( {
					"@base": "https://example.com/",
					"inGeneral": {},
					"inType": {},
				} ) );
			} );

			it( "should return combined schemas with the general when Resource", () => {
				const $context:Context = createMockContext();
				const resolver:ObjectSchemaResolver = createMock( { context: $context } );

				$context
					.extendObjectSchema( { "inGeneral": {} } )
					.extendObjectSchema( "Type-1", { "inType": {} } )
				;

				const returned:DigestedObjectSchema = resolver.getSchemaFor( { "types": [ "Type-1" ] } );
				expect( returned ).toEqual( ObjectSchemaDigester.digestSchema( {
					"@base": "https://example.com/",
					"inGeneral": {},
					"inType": {},
				} ) );
			} );

			it( "should return combined with partial schema when queryable resource", () => {
				const $context:Context = createMockContext();
				const resolver:ObjectSchemaResolver = createMock( { context: $context } );

				$context
					.extendObjectSchema( { "inGeneral": {} } )
					.extendObjectSchema( "Type-1", { "inType": {} } )
				;


				const resource:object = QueryablePointer.decorate<Partial<QueryablePointer> & BaseResource>( {
					$repository: $context.repository,
					types: [ "Type-1" ],
					_queryableMetadata: createMockQueryableMetadata( {
						"inQueryableMetadata": {},
					} ),
				} );

				const returned:DigestedObjectSchema = resolver.getSchemaFor( resource );
				expect( returned ).toEqual( ObjectSchemaDigester.digestSchema( {
					"@base": "https://example.com/",
					"inGeneral": {},
					"inType": {},
					"inQueryableMetadata": {},
				} ) );
			} );

		} );

	} );

	describe( interfaze(
		"CarbonLDP.ObjectSchemaResolverFactory",
		"Interface with the factory and utils for `CarbonLDP.ObjectSchemaResolver` objects."
	), () => {

		it( extendsClass( "CarbonLDP.Model.ModelPrototype<CarbonLDP.ObjectSchemaResolver>" ), () => {
			const target:ModelPrototype<ObjectSchemaResolver> = {} as ObjectSchemaResolverFactory;
			expect( target ).toBeDefined();
		} );

		it( extendsClass( "CarbonLDP.Model.ModelDecorator<CarbonLDP.ObjectSchemaResolver>" ), () => {
			const target:ModelDecorator<ObjectSchemaResolver> = {} as ObjectSchemaResolverFactory;
			expect( target ).toBeDefined();
		} );

		// TODO: Test .isDecorated
		// TODO: Test .decorate

	} );

	describe( property(
		INSTANCE,
		"ObjectSchemaResolver",
		"CarbonLDP.ObjectSchemaResolverFactory"
	), () => {

		it( "should exists", ():void => {
			expect( ObjectSchemaResolver ).toBeDefined();
			expect( ObjectSchemaResolver ).toEqual( jasmine.any( Object ) );
		} );

	} );

} );
