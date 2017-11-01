import { OptionalToken, PatternToken, ValuesToken, VariableToken } from "sparqler/tokens";
import AbstractContext from "../../AbstractContext";
import { DigestedObjectSchema, Digester } from "../../ObjectSchema";
import { clazz, constructor, hasDefaultExport, INSTANCE, method, module } from "../../test/JasmineExtender";
import * as Document from "./../../Document";
import QueryContext from "./QueryContext";
import * as Module from "./QueryProperty";
import { Class as QueryProperty } from "./QueryProperty";

describe( module( "Carbon/SPARQL/QueryDocument/QueryProperty" ), ():void => {

	it( "should exists", ():void => {
		expect( Module ).toBeDefined();
		expect( Module ).toEqual( jasmine.any( Object ) );
	} );

	it( hasDefaultExport( "Carbon.SPARQL.QueryDocument.QueryProperty.Class" ), ():void => {
		expect( Module.default ).toBeDefined();
		expect( Module.default ).toBe( QueryProperty );
	} );

	describe( clazz( "Carbon.SPARQL.QueryDocument.QueryProperty.Class", "Class that represents a property in the query" ), ():void => {

		it( "should exists", ():void => {
			expect( QueryProperty ).toBeDefined();
			expect( QueryProperty ).toEqual( jasmine.any( Function ) );
		} );

		let context:AbstractContext;
		let queryContext:QueryContext;
		beforeEach( ():void => {
			context = new class extends AbstractContext {
				protected _baseURI:string = "https://example.com/";
			};
			context.setSetting( "vocabulary", "http://example.com/vocab#" );

			queryContext = new QueryContext( context );
		} );

		describe( constructor(), ():void => {

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

			it( "should add a pattern when provided", ():void => {
				const pattern:PatternToken = new OptionalToken();
				const queryProperty:QueryProperty = new QueryProperty( queryContext, "name", pattern );
				expect( queryProperty[ "_patterns" ] ).toEqual( [ new OptionalToken() ] );
			} );

		} );

		describe( method( INSTANCE, "addPattern" ), ():void => {

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

		describe( method( INSTANCE, "addOptionalPattern" ), ():void => {

			it( "should exists", ():void => {
				expect( QueryProperty.prototype.addOptionalPattern ).toBeDefined();
				expect( QueryProperty.prototype.addOptionalPattern ).toEqual( jasmine.any( Function ) );
			} );

			it( "should add a pattern when no optional", ():void => {
				const queryProperty:QueryProperty = new QueryProperty( queryContext, "name" );

				queryProperty.addOptionalPattern( new ValuesToken() );
				expect( queryProperty[ "_patterns" ] ).toEqual( [
					new ValuesToken(),
				] );

				queryProperty.addOptionalPattern( new OptionalToken() );
				expect( queryProperty[ "_patterns" ] ).toEqual( [
					new ValuesToken(),
					new OptionalToken(),
				] );
			} );

			it( "should add a pattern to the first optional token in the patterns", ():void => {
				const queryProperty:QueryProperty = new QueryProperty( queryContext, "name", new OptionalToken() );

				queryProperty.addOptionalPattern( new ValuesToken() );
				expect( queryProperty[ "_patterns" ] ).toEqual( [
					jasmine.objectContaining( {
						token: "optional",
						patterns: [
							new ValuesToken(),
						],
					} ) as any,
				] );

				queryProperty.addOptionalPattern( new OptionalToken() );
				expect( queryProperty[ "_patterns" ] ).toEqual( [
					jasmine.objectContaining( {
						token: "optional",
						patterns: [
							new ValuesToken(),
							new OptionalToken(),
						],
					} ) as any,
				] );
			} );

			it( "should add multiple patterns", ():void => {
				const queryProperty:QueryProperty = new QueryProperty( queryContext, "name" );

				queryProperty.addOptionalPattern( new ValuesToken(), new OptionalToken() );
				expect( queryProperty[ "_patterns" ] ).toEqual( [
					new ValuesToken(),
					new OptionalToken(),
				] );
			} );

			it( "should add multiple patterns to the first optional token in the patterns", ():void => {
				const queryProperty:QueryProperty = new QueryProperty( queryContext, "name", new OptionalToken() );

				queryProperty.addOptionalPattern( new ValuesToken(), new OptionalToken() );
				expect( queryProperty[ "_patterns" ] ).toEqual( [
					jasmine.objectContaining( {
						token: "optional",
						patterns: [
							new ValuesToken(),
							new OptionalToken(),
						],
					} ) as any,
				] );
			} );

		} );

		describe( method( INSTANCE, "getPatterns" ), ():void => {

			it( "should exists", ():void => {
				expect( QueryProperty.prototype.getPatterns ).toBeDefined();
				expect( QueryProperty.prototype.getPatterns ).toEqual( jasmine.any( Function ) );
			} );

			it( "should return the patterns array", ():void => {
				const queryProperty:QueryProperty = new QueryProperty( queryContext, "name" );
				expect( queryProperty.getPatterns() ).toBe( queryProperty[ "_patterns" ] );
			} );

		} );

		describe( method( INSTANCE, "getSchema" ), ():void => {

			it( "should exists", ():void => {
				expect( QueryProperty.prototype.getSchema ).toBeDefined();
				expect( QueryProperty.prototype.getSchema ).toEqual( jasmine.any( Function ) );
			} );

			it( "should initialize the schema with a general document schema", ():void => {
				const queryProperty:QueryProperty = new QueryProperty( queryContext, "name" );

				const schema:DigestedObjectSchema = Digester.combineDigestedObjectSchemas( [
					context.getObjectSchema(),
					context.getObjectSchema( Document.RDF_CLASS ),
				] );
				schema.vocab = "http://example.com/vocab#";

				expect( queryProperty[ "_schema" ] ).toBeUndefined();

				const propertySchema:DigestedObjectSchema = queryProperty.getSchema();
				expect( propertySchema ).toEqual( schema );
				expect( queryProperty[ "_schema" ] ).toBe( propertySchema );
			} );

		} );

		describe( method( INSTANCE, "addSchema" ), ():void => {

			it( "should exists", ():void => {
				expect( QueryProperty.prototype.addSchema ).toBeDefined();
				expect( QueryProperty.prototype.addSchema ).toEqual( jasmine.any( Function ) );
			} );

			it( "should add schema to the general document schema", ():void => {
				const queryProperty:QueryProperty = new QueryProperty( queryContext, "name" );

				const schemaToAdd1:DigestedObjectSchema = Digester.digestSchema( {
					"property-1": {
						"@id": "http://example.com/ns#propery-1",
					},
				} );
				const targetSchema1:DigestedObjectSchema = Digester.combineDigestedObjectSchemas( [
					context.getObjectSchema(),
					context.getObjectSchema( Document.RDF_CLASS ),
					schemaToAdd1,
				] );
				targetSchema1.vocab = "http://example.com/vocab#";

				queryProperty.addSchema( schemaToAdd1 );
				expect( queryProperty[ "_schema" ] ).toEqual( targetSchema1 );


				const schemaToAdd2:DigestedObjectSchema = Digester.digestSchema( {
					"property-1": {
						"@id": "http://example.com/ns#propery-1",
					},
				} );
				const targetSchema2:DigestedObjectSchema = Digester.combineDigestedObjectSchemas( [
					context.getObjectSchema(),
					context.getObjectSchema( Document.RDF_CLASS ),
					schemaToAdd1,
					schemaToAdd2,
				] );
				targetSchema2.vocab = "http://example.com/vocab#";

				queryProperty.addSchema( schemaToAdd2 );
				expect( queryProperty[ "_schema" ] ).toEqual( targetSchema2 );
			} );

		} );

		describe( method( INSTANCE, "toString" ), ():void => {

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
