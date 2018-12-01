import { OptionalToken, VariableToken } from "sparqler/tokens";

import { createMockContext, createMockDigestedSchema, createMockDigestedSchemaProperty } from "../../test/helpers/mocks";

import { AbstractContext } from "../Context/AbstractContext";

import { DigestedObjectSchema } from "../ObjectSchema/DigestedObjectSchema";
import { DigestedObjectSchemaProperty } from "../ObjectSchema/DigestedObjectSchemaProperty";

import { QueryContainer } from "./QueryContainer";

import { QueryProperty } from "./QueryProperty";
import { QueryPropertyType } from "./QueryPropertyType";


describe( "QueryProperty", () => {

	it( "should exist", () => {
		expect( QueryProperty ).toBeDefined();
		expect( QueryProperty ).toEqual( jasmine.any( Function ) );
	} );

	let context:AbstractContext<any, any>;
	let queryContainer:QueryContainer;
	beforeEach( () => {
		context = createMockContext( { settings: { vocabulary: "https://example.com/vocab#" } } );
		queryContainer = new QueryContainer( context, { uri: "root/" } );
	} );

	describe( "QueryProperty.constructor", () => {

		it( "should exist", () => {
			const queryProperty:QueryProperty = new QueryProperty( {
				queryContainer: queryContainer,
				name: "name",
				definition: new DigestedObjectSchemaProperty(),
				optional: true,
			} );
			expect( queryProperty ).toEqual( jasmine.any( QueryProperty ) );
		} );


		it( "should create full name with no parent", () => {
			const queryProperty:QueryProperty = new QueryProperty( {
				queryContainer: queryContainer,
				name: "name",
				definition: new DigestedObjectSchemaProperty(),
				optional: true,
			} );

			expect( queryProperty.fullName ).toEqual( "name" );
		} );

		it( "should create full name with parent", () => {
			const parentProperty:QueryProperty = new QueryProperty( {
				queryContainer: queryContainer,
				name: "parent",
				definition: new DigestedObjectSchemaProperty(),
				optional: true,
			} );

			const queryProperty:QueryProperty = new QueryProperty( {
				queryContainer: queryContainer,
				name: "name",
				parent: parentProperty,
				definition: new DigestedObjectSchemaProperty(),
				optional: true,
			} );

			expect( queryProperty.fullName ).toEqual( "parent.name" );
		} );

		it( "should create full name with parent with parent", () => {
			const grandParentProperty:QueryProperty = new QueryProperty( {
				queryContainer: queryContainer,
				name: "grandParent",
				definition: new DigestedObjectSchemaProperty(),
				optional: true,
			} );

			const parentProperty:QueryProperty = new QueryProperty( {
				queryContainer: queryContainer,
				name: "parent",
				parent: grandParentProperty,
				definition: new DigestedObjectSchemaProperty(),
				optional: true,
			} );

			const queryProperty:QueryProperty = new QueryProperty( {
				queryContainer: queryContainer,
				name: "name",
				parent: parentProperty,
				definition: new DigestedObjectSchemaProperty(),
				optional: true,
			} );

			expect( queryProperty.fullName ).toEqual( "grandParent.parent.name" );
		} );


		it( "should create an variable token", () => {
			const queryProperty:QueryProperty = new QueryProperty( {
				queryContainer: queryContainer,
				name: "name",
				definition: new DigestedObjectSchemaProperty(),
				optional: true,
			} );

			expect( queryProperty.variable ).toEqual( jasmine.any( VariableToken ) );
		} );

	} );


	// TODO: Test .hasProperties
	// TODO: Test .addProperty
	// TODO: Test ._addSubProperty


	// TODO: Test .setType
	// TODO: Test .addValues
	// TODO: Test .addType
	// TODO: Test .addFilter
	// TODO: Test .setObligatory
	// TODO: Test ._isPartial
	// TODO: Test ._isComplete


	// TODO: Test .getSelfPattern

	describe( "QueryProperty.getSearchPatterns", () => {

		it( "should exist", () => {
			expect( QueryProperty.prototype.getSearchPatterns ).toBeDefined();
			expect( QueryProperty.prototype.getSearchPatterns ).toEqual( jasmine.any( Function ) );
		} );


		it( "should return the patterns as optional", () => {
			const queryProperty:QueryProperty = new QueryProperty( {
				queryContainer: queryContainer,
				name: "name",
				parent: new QueryProperty( {
					queryContainer: queryContainer,
					name: "parent",
					definition: new DigestedObjectSchemaProperty(),
					optional: true,
				} ),
				definition: new DigestedObjectSchemaProperty(),
				optional: true,
			} );

			expect( queryProperty.getSearchPatterns() ).toEqual( [
				jasmine.any( OptionalToken ) as any as OptionalToken,
			] );
		} );

		it( "should return the patterns when obligatory", () => {
			const queryProperty:QueryProperty = new QueryProperty( {
					queryContainer: queryContainer,
					name: "name",
					parent: new QueryProperty( {
						queryContainer: queryContainer,
						name: "parent",
						definition: new DigestedObjectSchemaProperty(),
						optional: true,
					} ),
					definition: new DigestedObjectSchemaProperty(),
					optional: false,
				} )
			;

			expect( queryProperty.getSearchPatterns() ).not.toEqual( [
				jasmine.any( OptionalToken ) as any as OptionalToken,
			] );
		} );

		// TODO: Test more cases

	} );

	// TODO: Test .getConstructPatterns


	describe( "QueryProperty.getSchemaFor", () => {

		it( "should exist", () => {
			expect( QueryProperty.prototype.getSchemaFor ).toBeDefined();
			expect( QueryProperty.prototype.getSchemaFor ).toEqual( jasmine.any( Function ) );
		} );


		it( "should return empty schema when no properties", () => {
			const queryProperty:QueryProperty = new QueryProperty( {
				queryContainer: queryContainer,
				name: "name",
				definition: new DigestedObjectSchemaProperty(),
				optional: true,
			} );

			const propertySchema:DigestedObjectSchema = queryProperty.getSchemaFor( {} );
			expect( propertySchema ).toEqual( new DigestedObjectSchema() );
		} );

		it( "should return schema from sub-properties", () => {
			const queryProperty:QueryProperty = new QueryProperty( {
				queryContainer: queryContainer,
				name: "name",
				definition: new DigestedObjectSchemaProperty(),
				optional: true,
				propertyType: QueryPropertyType.PARTIAL,
			} );

			queryProperty.addProperty( "property1", {} );
			queryProperty.addProperty( "property2", { "@id": "https://example.com/property2" } );

			const propertySchema:DigestedObjectSchema = queryProperty.getSchemaFor( {} );
			expect( propertySchema ).toEqual( createMockDigestedSchema( {
				properties: new Map<string, DigestedObjectSchemaProperty>( [
					[ "property1", createMockDigestedSchemaProperty( { uri: "https://example.com/vocab#property1" } ) ],
					[ "property2", createMockDigestedSchemaProperty( { uri: "https://example.com/property2" } ) ],
				] ),
			} ) );
		} );

	} );

} );
