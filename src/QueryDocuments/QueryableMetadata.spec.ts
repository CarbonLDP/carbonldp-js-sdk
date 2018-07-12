import {
	createMockDigestedSchema,
	createMockDigestedSchemaProperty
} from "../../test/helpers/mocks";
import { IllegalArgumentError } from "../Errors";
import { DigestedObjectSchema } from "../ObjectSchema";
import {
	clazz,
	constructor,
	hasSignature,
	module
} from "../test/JasmineExtender";

import * as Module from "./QueryableMetadata";
import { QueryableMetadata } from "./QueryableMetadata";

describe( module( "carbonldp/QueryDocuments/QueryableMetadata" ), ():void => {

	it( "should exists", ():void => {
		expect( Module ).toBeDefined();
		expect( Module ).toEqual( jasmine.any( Object ) );
	} );

	describe( clazz( "CarbonLDP.QueryDocuments.QueryableMetadata", "Class that contains the metadata of a partial document." ), ():void => {

		it( "should exists", ():void => {
			expect( QueryableMetadata ).toBeDefined();
			expect( QueryableMetadata ).toEqual( jasmine.any( Function ) );
		} );

		describe( constructor(), ():void => {

			it( hasSignature(
				[
					{ name: "schema", type: "CarbonLDP.DigestedObjectSchema", description: "The schema with the information of the partial properties of the partial resource." },
					{ name: "previousPartial", type: "CarbonLDP.QueryDocuments.QueryableMetadata", optional: true, description: "The previous partial metadata to merge with the new partial schema." },
				]
			), ():void => {} );

			it( "should exists", ():void => {
				const partialMetadata:QueryableMetadata = new QueryableMetadata( new DigestedObjectSchema() );

				expect( partialMetadata ).toBeDefined();
				expect( partialMetadata ).toEqual( jasmine.any( QueryableMetadata ) );
			} );


			it( "should store copy of schema provided", () => {
				const schema:DigestedObjectSchema = createMockDigestedSchema( {
					prefixes: new Map( [
						[ "ex", "https://example.com/ns#" ],
					] ),
				} );

				const partial:QueryableMetadata = new QueryableMetadata( schema );
				expect( schema ).toEqual( partial.schema );
			} );

			it( "should not copy of schema base", () => {
				const schema:DigestedObjectSchema = createMockDigestedSchema( {
					base: "https://example.com/",
					prefixes: new Map( [
						[ "ex", "https://example.com/ns#" ],
					] ),
				} );

				const partial:QueryableMetadata = new QueryableMetadata( schema );
				expect( partial.schema ).toEqual( createMockDigestedSchema( {
					prefixes: new Map( [
						[ "ex", "https://example.com/ns#" ],
					] ),
				} ) );
			} );

			it( "should not copy of schema vocab", () => {
				const schema:DigestedObjectSchema = createMockDigestedSchema( {
					vocab: "https://example.com/ns#",
					prefixes: new Map( [
						[ "ex", "https://example.com/ns#" ],
					] ),
				} );

				const partial:QueryableMetadata = new QueryableMetadata( schema );
				expect( partial.schema ).toEqual( createMockDigestedSchema( {
					prefixes: new Map( [
						[ "ex", "https://example.com/ns#" ],
					] ),
				} ) );
			} );

			it( "should merge provided schema and schema from partial", () => {
				const previousPartial:QueryableMetadata = new QueryableMetadata( createMockDigestedSchema( {
					prefixes: new Map( [
						[ "ex", "https://example.com/ns#" ],
					] ),
				} ) );

				const currentPartial:QueryableMetadata = new QueryableMetadata( createMockDigestedSchema( {
					prefixes: new Map<string, string>( [
						[ "ldp", "https://www.w3.org/ns/ldp" ],
					] ),
				} ), previousPartial );

				expect( currentPartial.schema ).toEqual( createMockDigestedSchema( {
					prefixes: new Map( [
						[ "ex", "https://example.com/ns#" ],
						[ "ldp", "https://www.w3.org/ns/ldp" ],
					] ),
				} ) );
			} );


			it( "should set ALL schema when ALL is provided", () => {
				const partial:QueryableMetadata = new QueryableMetadata( QueryableMetadata.ALL );
				expect( partial.schema ).toBe( QueryableMetadata.ALL );
			} );

			it( "should set ALL schema when ALL set in previous partial", () => {
				const previousPartial:QueryableMetadata = new QueryableMetadata( QueryableMetadata.ALL );

				const partial:QueryableMetadata = new QueryableMetadata( createMockDigestedSchema(), previousPartial );
				expect( partial.schema ).toBe( QueryableMetadata.ALL );
			} );


			it( "should throw error when has contradiction in prefixes merge", () => {
				const previousSchema:DigestedObjectSchema = createMockDigestedSchema( {
					prefixes: new Map( [
						[ "ex", "https://example.com/ns#" ],
					] ),
				} );
				const currentSchema:DigestedObjectSchema = createMockDigestedSchema( {
					prefixes: new Map( [
						[ "ex", "https://example.com/vocab#" ],
					] ),
				} );


				const previousPartial:QueryableMetadata = new QueryableMetadata( previousSchema );

				expect( () => {
					new QueryableMetadata( currentSchema, previousPartial );
				} ).toThrowError( IllegalArgumentError, `Prefix "ex" has different value: "https://example.com/ns#", "https://example.com/vocab#".` );
			} );

			it( "should throw error when has contradiction in property merge", () => {
				const previousSchema:DigestedObjectSchema = createMockDigestedSchema( {
					properties: new Map( [
						[ "property", createMockDigestedSchemaProperty( {
							uri: "https://example.com/ns#property",
						} ) ],
					] ),
				} );
				const currentSchema:DigestedObjectSchema = createMockDigestedSchema( {
					properties: new Map( [
						[ "property", createMockDigestedSchemaProperty( {
							uri: "https://example.com/vocab#property",
						} ) ],
					] ),
				} );


				const previousPartial:QueryableMetadata = new QueryableMetadata( previousSchema );

				expect( () => {
					new QueryableMetadata( currentSchema, previousPartial );
				} ).toThrowError( IllegalArgumentError, `Property "property" has different "uri": "https://example.com/ns#property", "https://example.com/vocab#property".` );
			} );

		} );

	} );

} );
