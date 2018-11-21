import { createMockContext } from "../../test/helpers/mocks";

import { Context } from "../Context/Context";

import { C } from "../Vocabularies/C";

import { DigestedObjectSchema } from "./DigestedObjectSchema";
import { ObjectSchemaDigester } from "./ObjectSchemaDigester";
import { ObjectSchemaResolver } from "./ObjectSchemaResolver";


function createMock<T extends {}>( data?:T & Partial<ObjectSchemaResolver> ):ObjectSchemaResolver {
	return ObjectSchemaResolver.decorate( Object.assign( {}, data ) );
}

describe( "ObjectSchemaResolver", () => {

	it( "should exists", () => {
		expect( ObjectSchemaResolver ).toBeDefined();
		expect( ObjectSchemaResolver ).toEqual( jasmine.any( Object ) );
	} );


	describe( "[[interface]]", () => {

		describe( "ObjectSchemaResolver.getGeneralSchema", () => {

			it( "should exists", () => {
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


		describe( "ObjectSchemaResolver.hasSchemaFor", () => {

			it( "should exists", () => {
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

		describe( "ObjectSchemaResolver.getSchemaFor", () => {

			it( "should exists", () => {
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

		} );

	} );

	describe( "[[factory]]", () => {

		// TODO: Test .isDecorated
		// TODO: Test .decorate

	} );

} );
