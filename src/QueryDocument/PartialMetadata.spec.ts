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

import * as Module from "./PartialMetadata";
import { PartialMetadata } from "./PartialMetadata";

describe( module( "carbonldp/QueryDocument/PartialMetadata" ), ():void => {

	it( "should exists", ():void => {
		expect( Module ).toBeDefined();
		expect( Module ).toEqual( jasmine.any( Object ) );
	} );

	describe( clazz( "CarbonLDP.QueryDocument.PartialMetadata", "Class that contains the metadata of a partial document." ), ():void => {

		it( "should exists", ():void => {
			expect( PartialMetadata ).toBeDefined();
			expect( PartialMetadata ).toEqual( jasmine.any( Function ) );
		} );

		describe( constructor(), ():void => {

			it( hasSignature(
				[
					{ name: "schema", type: "CarbonLDP.DigestedObjectSchema", description: "The schema with the information of the partial properties of the partial resource." },
					{ name: "previousPartial", type: "CarbonLDP.QueryDocument.PartialMetadata", optional: true, description: "The previous partial metadata to merge with the new partial schema." },
				]
			), ():void => {} );

			it( "should exists", ():void => {
				const partialMetadata:PartialMetadata = new PartialMetadata( new DigestedObjectSchema() );

				expect( partialMetadata ).toBeDefined();
				expect( partialMetadata ).toEqual( jasmine.any( PartialMetadata ) );
			} );


			it( "should store copy of schema provided", () => {
				const schema:DigestedObjectSchema = createMockDigestedSchema( {
					prefixes: new Map( [
						[ "ex", "https://example.com/ns#" ],
					] ),
				} );

				const partial:PartialMetadata = new PartialMetadata( schema );
				expect( schema ).toEqual( partial.schema );
			} );

			it( "should not copy of schema base", () => {
				const schema:DigestedObjectSchema = createMockDigestedSchema( {
					base: "https://example.com/",
					prefixes: new Map( [
						[ "ex", "https://example.com/ns#" ],
					] ),
				} );

				const partial:PartialMetadata = new PartialMetadata( schema );
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

				const partial:PartialMetadata = new PartialMetadata( schema );
				expect( partial.schema ).toEqual( createMockDigestedSchema( {
					prefixes: new Map( [
						[ "ex", "https://example.com/ns#" ],
					] ),
				} ) );
			} );

			it( "should merge provided schema and schema from partial", () => {
				const previousPartial:PartialMetadata = new PartialMetadata( createMockDigestedSchema( {
					prefixes: new Map( [
						[ "ex", "https://example.com/ns#" ],
					] ),
				} ) );

				const currentPartial:PartialMetadata = new PartialMetadata( createMockDigestedSchema( {
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
				const partial:PartialMetadata = new PartialMetadata( PartialMetadata.ALL );
				expect( partial.schema ).toBe( PartialMetadata.ALL );
			} );

			it( "should set ALL schema when ALL set in previous partial", () => {
				const previousPartial:PartialMetadata = new PartialMetadata( PartialMetadata.ALL );

				const partial:PartialMetadata = new PartialMetadata( createMockDigestedSchema(), previousPartial );
				expect( partial.schema ).toBe( PartialMetadata.ALL );
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


				const previousPartial:PartialMetadata = new PartialMetadata( previousSchema );

				expect( () => {
					new PartialMetadata( currentSchema, previousPartial );
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


				const previousPartial:PartialMetadata = new PartialMetadata( previousSchema );

				expect( () => {
					new PartialMetadata( currentSchema, previousPartial );
				} ).toThrowError( IllegalArgumentError, `Property "property" has different "uri": "https://example.com/ns#property", "https://example.com/vocab#property".` );
			} );

		} );

	} );

} );
