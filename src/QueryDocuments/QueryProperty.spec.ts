import {
	OptionalToken,
	ValuesToken,
	VariableToken,
} from "sparqler/tokens";

import { createMockContext } from "../../test/helpers/mocks";
import { AbstractContext } from "../Context";
import {
	DigestedObjectSchema,
	ObjectSchemaDigester,
} from "../ObjectSchema";
import {
	clazz,
	constructor,
	enumeration,
	hasEnumeral,
	hasProperty,
	hasSignature,
	INSTANCE,
	method,
	module,
} from "../test/JasmineExtender";
import { QueryContext } from "./QueryContext";

import * as Module from "./QueryProperty";
import {
	QueryProperty,
	QueryPropertyType
} from "./QueryProperty";

describe( module( "carbonldp/QueryDocuments/QueryProperty" ), ():void => {

	it( "should exists", ():void => {
		expect( Module ).toBeDefined();
		expect( Module ).toEqual( jasmine.any( Object ) );
	} );

	describe( enumeration(
		"CarbonLDP.QueryDocuments.QueryPropertyType",
		"Enum fot the type of data expected to return for a property."
	), () => {

		it( hasEnumeral(
			"FULL",
			"The property is expected to point to a fulled resolved document"
		), () => {
			expect( QueryPropertyType.FULL ).toBeDefined();
		} );

		it( hasEnumeral(
			"PARTIAL",
			"The property is expected to point to a partial resource (document/fragment)."
		), () => {
			expect( QueryPropertyType.PARTIAL ).toBeDefined();
		} );

		it( hasEnumeral(
			"ALL",
			"The property is expected to point to a resource with all is properties but without related fragments resolved."
		), () => {
			expect( QueryPropertyType.ALL ).toBeDefined();
		} );

		it( hasEnumeral(
			"EMPTY",
			"The property point to a literal, or its known."
		), () => {
			expect( QueryPropertyType.EMPTY ).toBeDefined();
		} );

	} );

	describe( clazz(
		"CarbonLDP.QueryDocuments.QueryProperty",
		"Class that represents a property in the query"
	), ():void => {

		it( "should exists", ():void => {
			expect( QueryProperty ).toBeDefined();
			expect( QueryProperty ).toEqual( jasmine.any( Function ) );
		} );

		let context:AbstractContext<any, any>;
		let queryContext:QueryContext;
		beforeEach( ():void => {
			context = createMockContext( { settings: { vocabulary: "http://example.com/vocab#" } } );

			queryContext = new QueryContext( context );
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
				const queryProperty:QueryProperty = new QueryProperty( queryContext, "name" );
				expect( queryProperty ).toEqual( jasmine.any( QueryProperty ) );
			} );

			it( "should create an variable token", ():void => {
				const queryProperty:QueryProperty = new QueryProperty( queryContext, "name" );
				expect( queryProperty[ "variable" ] ).toEqual( jasmine.any( VariableToken ) );
			} );

			it( "should initialize patterns", ():void => {
				const queryProperty:QueryProperty = new QueryProperty( queryContext, "name" );
				expect( queryProperty[ "_patterns" ] ).toEqual( [] );
			} );

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

		describe( method( INSTANCE, "addPattern" ), ():void => {

			it( hasSignature(
				"Adds an pattern to query specification of the property retrieval.",
				[
					{ name: "...patterns", type: "SPARQL/tokens/PatternToken[]" },
				],
				{ type: "this" }
			), ():void => {
			} );

			it( "should exists", ():void => {
				expect( QueryProperty.prototype.addPattern ).toBeDefined();
				expect( QueryProperty.prototype.addPattern ).toEqual( jasmine.any( Function ) );
			} );

			it( "should add a pattern", ():void => {
				const queryProperty:QueryProperty = new QueryProperty( queryContext, "name" );

				queryProperty.addPattern( new ValuesToken() );
				expect( queryProperty[ "_patterns" ] ).toEqual( [
					new ValuesToken(),
				] );

				queryProperty.addPattern( new OptionalToken() );
				expect( queryProperty[ "_patterns" ] ).toEqual( [
					new ValuesToken(),
					new OptionalToken(),
				] );
			} );

			it( "should add multiple patterns", ():void => {
				const queryProperty:QueryProperty = new QueryProperty( queryContext, "name" );

				queryProperty.addPattern( new ValuesToken(), new OptionalToken() );
				expect( queryProperty[ "_patterns" ] ).toEqual( [
					new ValuesToken(),
					new OptionalToken(),
				] );
			} );

		} );

		describe( method( INSTANCE, "getPatterns" ), ():void => {

			it( hasSignature(
				"Returns the pattern to be used in the query that specifies the property and its elements\n" +
				"If the property is optional the patterns will be wrapped in an optional SPARQL token.",
				{ type: "SPARQL/tokens/PatternToken[]" }
			), ():void => {
			} );

			it( "should exists", ():void => {
				expect( QueryProperty.prototype.getPatterns ).toBeDefined();
				expect( QueryProperty.prototype.getPatterns ).toEqual( jasmine.any( Function ) );
			} );

			it( "should return the patterns array when isn't optional", ():void => {
				const queryProperty:QueryProperty = new QueryProperty( queryContext, "name" )
					.setOptional( false );
				expect( queryProperty.getPatterns() ).toEqual( queryProperty[ "_patterns" ] );
			} );

			it( "should return the patterns as optional array when is optional", ():void => {
				const queryProperty:QueryProperty = new QueryProperty( queryContext, "name" );
				expect( queryProperty.getPatterns() ).toEqual( [ new OptionalToken()
					.addPattern( ...queryProperty[ "_patterns" ] ),
				] );
			} );

		} );

		describe( method( INSTANCE, "getSchema" ), ():void => {

			it( hasSignature(
				"Returns the specific schema for the property objects that was created query definition.",
				{ type: "CarbonLDP.DigestedObjectSchema" }
			), ():void => {} );

			it( "should exists", ():void => {
				expect( QueryProperty.prototype.getSchema ).toBeDefined();
				expect( QueryProperty.prototype.getSchema ).toEqual( jasmine.any( Function ) );
			} );

			it( "should initialize the schema with an empty schema", ():void => {
				const queryProperty:QueryProperty = new QueryProperty( queryContext, "name" );

				const schema:DigestedObjectSchema = ObjectSchemaDigester.digestSchema( {} );
				expect( queryProperty[ "_schema" ] ).toBeUndefined();

				const propertySchema:DigestedObjectSchema = queryProperty.getSchema();
				expect( propertySchema ).toEqual( schema );
				expect( queryProperty[ "_schema" ] ).toBe( propertySchema );
			} );

		} );

		describe( method( INSTANCE, "toString" ), ():void => {

			it( hasSignature(
				"Returns the string representation of the query property that is the SPARQL variable string.",
				{ type: "string" }
			), ():void => {
			} );

			it( "should override the default toString", ():void => {
				expect( QueryProperty.prototype.toString ).not.toBe( Object.prototype.toString );
			} );

			it( "should return the string of the variable", ():void => {
				const helper:( name:string ) => void = name => {
					const queryProperty:QueryProperty = new QueryProperty( queryContext, name );
					expect( queryProperty.toString() ).toBe( queryProperty[ "variable" ].toString() );
				};

				helper( "name" );
				helper( "another_name" );
				helper( "ex:property" );
				helper( "property.subProperty" );
				helper( "ex:property.ex:subProperty" );
			} );

		} );

	} );

} );