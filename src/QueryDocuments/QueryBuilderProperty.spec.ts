import { VariableToken } from "sparqler/tokens";

import { createMockContext, MockQueryContainer } from "../../test/helpers/mocks";

import { AbstractContext } from "../Context/AbstractContext";

import { DigestedObjectSchemaProperty } from "../ObjectSchema/DigestedObjectSchemaProperty";

import { clazz, constructor, hasProperty, hasSignature, INSTANCE, module, } from "../test/JasmineExtender";

import { QueryBuilderProperty } from "./QueryBuilderProperty";
import { QueryContainer } from "./QueryContainer";


describe( module( "carbonldp/QueryDocuments/QueryBuilderProperty" ), ():void => {

	describe( clazz(
		"CarbonLDP.QueryDocuments.QueryBuilderProperty",
		"Class that represents a property in the query"
	), ():void => {

		it( "should exists", ():void => {
			expect( QueryBuilderProperty ).toBeDefined();
			expect( QueryBuilderProperty ).toEqual( jasmine.any( Function ) );
		} );

		it( hasProperty(
			INSTANCE,
			"name",
			"string",
			"The name of the query property."
		), ():void => {
		} );

		it( hasProperty(
			INSTANCE,
			"variable",
			"CarbonLDP.QueryDocuments.QueryVariable",
			"The variable that represents the property in the query."
		), ():void => {
		} );


		let context:AbstractContext<any, any>;
		let queryContainer:QueryContainer;
		beforeEach( ():void => {
			context = createMockContext( { settings: { vocabulary: "https://example.com/vocab#" } } );
			queryContainer = new MockQueryContainer( context );
		} );

		describe( constructor(), ():void => {

			it( hasSignature(
				"Creates a query property for the specified name.\n" +
				"By default the property will be optional, i.e. the patterns returned will be wrapped by an optional token.",
				[
					{ name: "context", type: "CarbonLDP.QueryDocuments.QueryContext", description: "The context of the query where the property is been used." },
					{ name: "name", type: "string", description: "The name of the property." },
				]
			), ():void => {
			} );

			it( "should exists", ():void => {
				const queryProperty:QueryBuilderProperty = new QueryBuilderProperty( {
					queryContainer: queryContainer,
					name: "name",
					definition: new DigestedObjectSchemaProperty(),
					optional: true,
				} );
				expect( queryProperty ).toEqual( jasmine.any( QueryBuilderProperty ) );
			} );


			it( "should create full name with no parent", ():void => {
				const queryProperty:QueryBuilderProperty = new QueryBuilderProperty( {
					queryContainer: queryContainer,
					name: "name",
					definition: new DigestedObjectSchemaProperty(),
					optional: true,
				} );

				expect( queryProperty.fullName ).toEqual( "name" );
			} );

			it( "should create full name with parent", ():void => {
				const parentProperty:QueryBuilderProperty = new QueryBuilderProperty( {
					queryContainer: queryContainer,
					name: "parent",
					definition: new DigestedObjectSchemaProperty(),
					optional: true,
				} );

				const queryProperty:QueryBuilderProperty = new QueryBuilderProperty( {
					queryContainer: queryContainer,
					name: "name",
					parent: parentProperty,
					definition: new DigestedObjectSchemaProperty(),
					optional: true,
				} );

				expect( queryProperty.fullName ).toEqual( "parent.name" );
			} );

			it( "should create full name with parent with parent", ():void => {
				const grandParentProperty:QueryBuilderProperty = new QueryBuilderProperty( {
					queryContainer: queryContainer,
					name: "grandParent",
					definition: new DigestedObjectSchemaProperty(),
					optional: true,
				} );

				const parentProperty:QueryBuilderProperty = new QueryBuilderProperty( {
					queryContainer: queryContainer,
					name: "parent",
					parent: grandParentProperty,
					definition: new DigestedObjectSchemaProperty(),
					optional: true,
				} );

				const queryProperty:QueryBuilderProperty = new QueryBuilderProperty( {
					queryContainer: queryContainer,
					name: "name",
					parent: parentProperty,
					definition: new DigestedObjectSchemaProperty(),
					optional: true,
				} );

				expect( queryProperty.fullName ).toEqual( "grandParent.parent.name" );
			} );


			it( "should create an variable token", ():void => {
				const queryProperty:QueryBuilderProperty = new QueryBuilderProperty( {
					queryContainer: queryContainer,
					name: "name",
					definition: new DigestedObjectSchemaProperty(),
					optional: true,
				} );

				expect( queryProperty.variable ).toEqual( jasmine.any( VariableToken ) );
			} );

		} );


		// TODO: Test .getSelfPattern
		// TODO: Test .getSearchPatterns
		// TODO: Test .getConstructPatterns


		// TODO: Test .hasProperties
		// TODO: Test .addProperty


		// TODO: Test .addValues
		// TODO: Test .addType
		// TODO: Test .addFilter
		// TODO: Test .setObligatory

	} );

} );
