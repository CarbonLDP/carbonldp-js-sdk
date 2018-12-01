import { createMockDigestedSchema } from "../../test/helpers/mocks";

import { IllegalArgumentError } from "../Errors/IllegalArgumentError";

import { DigestedObjectSchema } from "../ObjectSchema/DigestedObjectSchema";

import { AbstractContext } from "./AbstractContext";
import { ContextSettings } from "./ContextSettings";


function createMock<PARENT extends AbstractContext<any, any, any> = undefined>( data?:{
	parentContext?:PARENT;

	uri?:string;
	settings?:ContextSettings,

	generalSchema?:DigestedObjectSchema,
	schemasMap?:Map<string, DigestedObjectSchema>,
} ):AbstractContext<undefined, undefined, PARENT> {
	return new class extends AbstractContext<undefined, undefined, PARENT> {
		registry:undefined;
		repository:undefined;

		_baseURI:string;

		constructor( parentContext?:PARENT ) {
			super( parentContext );

			this._baseURI = data && "uri" in data ? data.uri : "https://example.com/";
			if( data && data.settings ) this._settings = data.settings;

			if( data && data.generalSchema ) this._generalObjectSchema = data.generalSchema;
			if( data && data.schemasMap ) this._typeObjectSchemaMap = data.schemasMap;
		}

	}( data && data.parentContext );
}


describe( "AbstractContext", () => {

	it( "should exist", () => {
		expect( AbstractContext ).toBeDefined();
		expect( AbstractContext ).toEqual( jasmine.any( Function ) );
	} );


	describe( "AbstractContext.constructor", () => {

		it( "should be instantiable", () => {
			const context:AbstractContext<any, any> = createMock();
			expect( context ).toEqual( jasmine.any( AbstractContext ) );
		} );

		it( "should not have a parentContext", () => {
			const context:AbstractContext<any, any> = createMock();
			expect( context.parentContext ).toBeUndefined();
		} );

		it( "should assign parent context if provided", () => {
			const context:AbstractContext<any, any> = createMock();

			const subContext:AbstractContext<any, any, any> = new class extends AbstractContext<any, any, any> {
				registry:undefined;
				repository:undefined;
				protected _baseURI:string;
			}( context );

			expect( subContext.parentContext ).toBe( context );
		} );

	} );


	describe( "AbstractContext.resolve", () => {

		it( "should exist", () => {
			expect( AbstractContext.prototype.resolve ).toBeDefined();
			expect( AbstractContext.prototype.resolve ).toEqual( jasmine.any( Function ) );
		} );


		it( "should return same string when baseURI undefined", () => {
			const context:AbstractContext<any, any> = createMock( { uri: void 0 } );
			const returned:string = context.resolve( "a-string" );
			expect( returned ).toBe( "a-string" );
		} );

		it( "should resolve from the baseURI defined", () => {
			const context:AbstractContext<any, any> = createMock( { uri: "https://example.com" } );
			const returned:string = context.resolve( "a-string" );
			expect( returned ).toBe( "https://example.com/a-string" );
		} );

		it( "should return same IRI when absolute and baseURI defined", () => {
			const context:AbstractContext<any, any> = createMock( { uri: "https://example.com" } );
			const returned:string = context.resolve( "https://example.com/another-thing/a-string" );
			expect( returned ).toBe( "https://example.com/another-thing/a-string" );
		} );

	} );


	describe( "AbstractContext.hasObjectSchema", () => {

		it( "should exist", () => {
			expect( AbstractContext.prototype.hasObjectSchema ).toBeDefined();
			expect( AbstractContext.prototype.hasObjectSchema ).toEqual( jasmine.any( Function ) );
		} );


		it( "should return false when not existing schema in schema maps", () => {
			const context:AbstractContext<any, any> = createMock();

			expect( context.hasObjectSchema( "https://example.com/ns#MyType" ) ).toBe( false );
			expect( context.hasObjectSchema( "ex:MyType" ) ).toBe( false );
		} );

		it( "should return true when schema with absolute type", () => {
			const context:AbstractContext<any, any> = createMock( {
				schemasMap: new Map( [ [ "https://example.com/ns#MyType", new DigestedObjectSchema() ] ] ),
			} );

			expect( context.hasObjectSchema( "https://example.com/ns#MyType" ) ).toBe( true );
			expect( context.hasObjectSchema( "ex:MyType" ) ).toBe( false );
		} );

		it( "should return true when prefixed type with defined prefix in general", () => {
			const context:AbstractContext<any, any> = createMock( {
				generalSchema: createMockDigestedSchema( { prefixes: new Map( [ [ "ex", "https://example.com/ns#" ] ] ) } ),
				schemasMap: new Map( [ [ "https://example.com/ns#MyType", new DigestedObjectSchema() ] ] ),
			} );

			expect( context.hasObjectSchema( "https://example.com/ns#MyType" ) ).toBe( true );
			expect( context.hasObjectSchema( "ex:MyType" ) ).toBe( true );
		} );

		it( "should return true when relative and default vocab schema", () => {
			const context:AbstractContext<any, any> = createMock( {
				settings: { vocabulary: "https://example.com/ns#" },
				schemasMap: new Map( [ [ "https://example.com/ns#MyType", new DigestedObjectSchema() ] ] ),
			} );

			expect( context.hasObjectSchema( "https://example.com/ns#MyType" ) ).toBe( true );
			expect( context.hasObjectSchema( "MyType" ) ).toBe( true );
		} );

	} );

	describe( "AbstractContext.getObjectSchema", () => {

		it( "should exist", () => {
			expect( AbstractContext.prototype.getObjectSchema ).toBeDefined();
			expect( AbstractContext.prototype.getObjectSchema ).toEqual( jasmine.any( Function ) );
		} );


		it( "should throw error when not existing schema in schema maps", () => {
			const context:AbstractContext<any, any> = createMock();

			expect( () => {
				context.getObjectSchema( "https://example.com/ns#MyType" );
			} ).toThrowError( IllegalArgumentError, `"https://example.com/ns#MyType" hasn't an object schema.` );
		} );

		it( "should return schema with absolute type", () => {
			const schema:DigestedObjectSchema = new DigestedObjectSchema();
			const context:AbstractContext<any, any> = createMock( {
				schemasMap: new Map( [ [ "https://example.com/ns#MyType", schema ] ] ),
			} );

			expect( context.getObjectSchema( "https://example.com/ns#MyType" ) ).toBe( schema );
		} );

		it( "should return schema when prefixed type with defined prefix in general", () => {
			const schema:DigestedObjectSchema = new DigestedObjectSchema();
			const context:AbstractContext<any, any> = createMock( {
				generalSchema: createMockDigestedSchema( { prefixes: new Map( [ [ "ex", "https://example.com/ns#" ] ] ) } ),
				schemasMap: new Map( [ [ "https://example.com/ns#MyType", schema ] ] ),
			} );

			expect( context.getObjectSchema( "ex:MyType" ) ).toBe( schema );
		} );

		it( "should return schema when relative and default vocab schema", () => {
			const schema:DigestedObjectSchema = new DigestedObjectSchema();
			const context:AbstractContext<any, any> = createMock( {
				settings: { vocabulary: "https://example.com/ns#" },
				schemasMap: new Map( [ [ "https://example.com/ns#MyType", schema ] ] ),
			} );

			expect( context.getObjectSchema( "https://example.com/ns#MyType" ) ).toBe( schema );
			expect( context.getObjectSchema( "MyType" ) ).toBe( schema );
		} );

		it( "should return general schema with base", () => {
			const context:AbstractContext<any, any> = createMock( {
				generalSchema: createMockDigestedSchema( {
					prefixes: new Map( [
						[ "schema", "https://schema.org/" ],
					] ),
				} ),
			} );

			expect( context.getObjectSchema() ).toEqual( createMockDigestedSchema( {
				base: "https://example.com/",
				prefixes: new Map( [
					[ "schema", "https://schema.org/" ],
				] ),
			} ) );
		} );

		it( "should not replace base in general schema when already set", () => {
			const context:AbstractContext<any, any> = createMock( {
				generalSchema: createMockDigestedSchema( {
					base: "https://not-example.com/",
					prefixes: new Map( [
						[ "schema", "https://schema.org/" ],
					] ),
				} ),
			} );

			expect( context.getObjectSchema() ).toEqual( createMockDigestedSchema( {
				base: "https://not-example.com/",
				prefixes: new Map( [
					[ "schema", "https://schema.org/" ],
				] ),
			} ) );
		} );

		it( "should return general schema with vocab when setting set", () => {
			const context:AbstractContext<any, any> = createMock( {
				settings: { vocabulary: "https://example.com/ns#" },
				generalSchema: createMockDigestedSchema( {
					prefixes: new Map( [
						[ "schema", "https://schema.org/" ],
					] ),
				} ),
			} );

			expect( context.getObjectSchema() ).toEqual( createMockDigestedSchema( {
				base: "https://example.com/",
				vocab: "https://example.com/ns#",
				prefixes: new Map( [
					[ "schema", "https://schema.org/" ],
				] ),
			} ) );
		} );

		it( "should not replace vocab in general schema when already set and setting set", () => {
			const context:AbstractContext<any, any> = createMock( {
				settings: { vocabulary: "https://example.com/ns#" },
				generalSchema: createMockDigestedSchema( {
					vocab: "https://example.com/another-ns#",
					prefixes: new Map( [
						[ "schema", "https://schema.org/" ],
					] ),
				} ),
			} );

			expect( context.getObjectSchema() ).toEqual( createMockDigestedSchema( {
				base: "https://example.com/",
				vocab: "https://example.com/another-ns#",
				prefixes: new Map( [
					[ "schema", "https://schema.org/" ],
				] ),
			} ) );
		} );

	} );

	describe( "AbstractContext.extendObjectSchema", () => {

		it( "should exist", () => {
			expect( AbstractContext.prototype.extendObjectSchema ).toBeDefined();
			expect( AbstractContext.prototype.extendObjectSchema ).toEqual( jasmine.any( Function ) );
		} );


		it( "should add when absolute type schema does not exists", () => {
			const schemasMap:Map<string, DigestedObjectSchema> = new Map();
			const context:AbstractContext<any, any> = createMock( { schemasMap } );

			context.extendObjectSchema( "https://example.com/ns#Type", {
				"ex": "https://example.com/ns#",
			} );

			expect( schemasMap ).toEqual( new Map( [ [
				"https://example.com/ns#Type",
				createMockDigestedSchema( {
					prefixes: new Map( [ [ "ex", "https://example.com/ns#" ] ] ),
				} ),
			] ] ) );
		} );

		it( "should add when prefixed type schema does not exists", () => {
			const schemasMap:Map<string, DigestedObjectSchema> = new Map();
			const context:AbstractContext<any, any> = createMock( {
				generalSchema: createMockDigestedSchema( {
					prefixes: new Map( [
						[ "ex", "https://example.com/ns#" ],
					] ),
				} ),
				schemasMap,
			} );

			context.extendObjectSchema( "ex:Type", {
				"schema": "https://schema.org/",
			} );

			expect( schemasMap ).toEqual( new Map( [ [
				"https://example.com/ns#Type",
				createMockDigestedSchema( {
					prefixes: new Map( [ [ "schema", "https://schema.org/" ] ] ),
				} ),
			] ] ) );
		} );

		it( "should add when relative type schema does not exists and vocab is set", () => {
			const schemasMap:Map<string, DigestedObjectSchema> = new Map();
			const context:AbstractContext<any, any> = createMock( {
				settings: { vocabulary: "https://example.com/ns#" },
				schemasMap,
			} );

			context.extendObjectSchema( "Type", {
				"schema": "https://schema.org/",
			} );

			expect( schemasMap ).toEqual( new Map( [ [
				"https://example.com/ns#Type",
				createMockDigestedSchema( {
					prefixes: new Map( [ [ "schema", "https://schema.org/" ] ] ),
				} ),
			] ] ) );
		} );

		it( "should merge when type schema exists", () => {
			const schemasMap:Map<string, DigestedObjectSchema> = new Map( [
				[ "https://example.com/ns#Type", createMockDigestedSchema( {
					prefixes: new Map( [ [ "schema", "https://schema.org/" ] ] ),
				} ) ],
			] );
			const context:AbstractContext<any, any> = createMock( { schemasMap } );

			context.extendObjectSchema( "https://example.com/ns#Type", {
				"rdfs": "http://www.w3.org/2000/01/rdf-schema#",
			} );

			expect( schemasMap ).toEqual( new Map( [ [
				"https://example.com/ns#Type",
				createMockDigestedSchema( {
					prefixes: new Map( [
						[ "schema", "https://schema.org/" ],
						[ "rdfs", "http://www.w3.org/2000/01/rdf-schema#" ],
					] ),
				} ),
			] ] ) );
		} );


		it( "should add absolute model schema when does not exists", () => {
			const schemasMap:Map<string, DigestedObjectSchema> = new Map();
			const context:AbstractContext<any, any> = createMock( { schemasMap } );

			context.extendObjectSchema( {
				TYPE: "https://example.com/ns#Type",
				SCHEMA: {
					"ex": "https://example.com/ns#",
				},
			} );

			expect( schemasMap ).toEqual( new Map( [ [
				"https://example.com/ns#Type",
				createMockDigestedSchema( {
					prefixes: new Map( [ [ "ex", "https://example.com/ns#" ] ] ),
				} ),
			] ] ) );
		} );

		it( "should add prefixed model schema when does not exists", () => {
			const schemasMap:Map<string, DigestedObjectSchema> = new Map();
			const context:AbstractContext<any, any> = createMock( {
				generalSchema: createMockDigestedSchema( {
					prefixes: new Map( [
						[ "ex", "https://example.com/ns#" ],
					] ),
				} ),
				schemasMap,
			} );

			context.extendObjectSchema( {
				TYPE: "ex:Type",
				SCHEMA: {
					"schema": "https://schema.org/",
				},
			} );

			expect( schemasMap ).toEqual( new Map( [ [
				"https://example.com/ns#Type",
				createMockDigestedSchema( {
					prefixes: new Map( [ [ "schema", "https://schema.org/" ] ] ),
				} ),
			] ] ) );
		} );

		it( "should add relative model schema when does not exists and vocab is set", () => {
			const schemasMap:Map<string, DigestedObjectSchema> = new Map();
			const context:AbstractContext<any, any> = createMock( {
				settings: { vocabulary: "https://example.com/ns#" },
				schemasMap,
			} );

			context.extendObjectSchema( {
				TYPE: "Type",
				SCHEMA: {
					"schema": "https://schema.org/",
				},
			} );

			expect( schemasMap ).toEqual( new Map( [ [
				"https://example.com/ns#Type",
				createMockDigestedSchema( {
					prefixes: new Map( [ [ "schema", "https://schema.org/" ] ] ),
				} ),
			] ] ) );
		} );

		it( "should merge when type schema exists", () => {
			const schemasMap:Map<string, DigestedObjectSchema> = new Map( [
				[ "https://example.com/ns#Type", createMockDigestedSchema( {
					prefixes: new Map( [ [ "schema", "https://schema.org/" ] ] ),
				} ) ],
			] );
			const context:AbstractContext<any, any> = createMock( { schemasMap } );

			context.extendObjectSchema( {
				TYPE: "https://example.com/ns#Type",
				SCHEMA: {
					"rdfs": "http://www.w3.org/2000/01/rdf-schema#",
				},
			} );

			expect( schemasMap ).toEqual( new Map( [ [
				"https://example.com/ns#Type",
				createMockDigestedSchema( {
					prefixes: new Map( [
						[ "schema", "https://schema.org/" ],
						[ "rdfs", "http://www.w3.org/2000/01/rdf-schema#" ],
					] ),
				} ),
			] ] ) );
		} );


		it( "should merge with general schema", () => {
			const generalSchema:DigestedObjectSchema = createMockDigestedSchema( {
				prefixes: new Map( [
					[ "ex", "https://example.com/ns#" ],
				] ),
			} );
			const context:AbstractContext<any, any> = createMock( {
				generalSchema,
			} );

			context.extendObjectSchema( {
				"schema": "https://schema.org/",
			} );

			expect( generalSchema ).toEqual( createMockDigestedSchema( {
				prefixes: new Map( [
					[ "ex", "https://example.com/ns#" ],
					[ "schema", "https://schema.org/" ],
				] ),
			} ) );
		} );

		it( "should merge with parent schema when no local schema", () => {
			const parentSchema:DigestedObjectSchema = createMockDigestedSchema( {
				prefixes: new Map( [
					[ "ex", "https://example.com/ns#" ],
				] ),
			} );
			const parentContext:AbstractContext<any, any> = createMock( { generalSchema: parentSchema } );

			const context:AbstractContext<any, any, any> = createMock( { parentContext } );
			context.extendObjectSchema( {
				"schema": "https://schema.org/",
			} );

			expect( context.getObjectSchema() ).toEqual( createMockDigestedSchema( {
				base: "https://example.com/",
				prefixes: new Map( [
					[ "ex", "https://example.com/ns#" ],
					[ "schema", "https://schema.org/" ],
				] ),
			} ) );
		} );

		it( "should not affect merge to parent schema when no local schema", () => {
			const parentSchema:DigestedObjectSchema = createMockDigestedSchema( {
				prefixes: new Map( [
					[ "ex", "https://example.com/ns#" ],
				] ),
			} );
			const parentContext:AbstractContext<any, any> = createMock( { generalSchema: parentSchema } );

			const context:AbstractContext<any, any, any> = createMock( { parentContext } );
			context.extendObjectSchema( {
				"schema": "https://schema.org/",
			} );

			expect( parentSchema ).toEqual( createMockDigestedSchema( {
				prefixes: new Map( [
					[ "ex", "https://example.com/ns#" ],
				] ),
			} ) );
		} );


		it( "should merge general schema and model schema", () => {
			const generalSchema:DigestedObjectSchema = createMockDigestedSchema();
			const schemasMap:Map<string, DigestedObjectSchema> = new Map();

			const context:AbstractContext<any, any> = createMock( { generalSchema, schemasMap } );


			context.extendObjectSchema( [
				{
					"schema": "https://schema.org/",
				},
				{
					TYPE: "https://example.com/ns#Type",
					SCHEMA: {
						"rdfs": "http://www.w3.org/2000/01/rdf-schema#",
					},
				},
			] );


			expect( generalSchema ).toEqual( createMockDigestedSchema( {
				prefixes: new Map( [
					[ "schema", "https://schema.org/" ],
				] ),
			} ) );

			expect( schemasMap ).toEqual( new Map( [ [
				"https://example.com/ns#Type",
				createMockDigestedSchema( {
					prefixes: new Map( [
						[ "rdfs", "http://www.w3.org/2000/01/rdf-schema#" ],
					] ),
				} ),
			] ] ) );
		} );

	} );

	describe( "AbstractContext.clearObjectSchema", () => {

		it( "should exist", () => {
			expect( AbstractContext.prototype.clearObjectSchema ).toBeDefined();
			expect( AbstractContext.prototype.clearObjectSchema ).toEqual( jasmine.any( Function ) );
		} );


		it( "should remove absolute typed schema", () => {
			const schemasMap:Map<string, DigestedObjectSchema> = new Map( [
				[ "https://example.com/ns#Type", createMockDigestedSchema() ],
			] );
			const context:AbstractContext<any, any> = createMock( { schemasMap } );

			context.clearObjectSchema( "https://example.com/ns#Type" );
			expect( schemasMap ).toEqual( new Map() );
		} );

		it( "should remove prefixed typed schema", () => {
			const schemasMap:Map<string, DigestedObjectSchema> = new Map( [
				[ "https://example.com/ns#Type", createMockDigestedSchema() ],
			] );
			const context:AbstractContext<any, any> = createMock( {
				generalSchema: createMockDigestedSchema( {
					prefixes: new Map( [
						[ "ex", "https://example.com/ns#" ],
					] ),
				} ),
				schemasMap,
			} );

			context.clearObjectSchema( "ex:Type" );
			expect( schemasMap ).toEqual( new Map() );
		} );

		it( "should remove relative typed schema with vocab set", () => {
			const schemasMap:Map<string, DigestedObjectSchema> = new Map( [
				[ "https://example.com/ns#Type", createMockDigestedSchema() ],
			] );
			const context:AbstractContext<any, any> = createMock( {
				settings: { vocabulary: "https://example.com/ns#" },
				schemasMap,
			} );

			context.clearObjectSchema( "Type" );
			expect( schemasMap ).toEqual( new Map() );
		} );

		it( "should clean general object schema", () => {
			const generalSchema:DigestedObjectSchema = createMockDigestedSchema( {
				prefixes: new Map( [
					[ "ex", "https://example.com/ns#" ],
				] ),
			} );
			const context:AbstractContext<any, any> = createMock( { generalSchema } );

			context.clearObjectSchema();
			expect( context.getObjectSchema() ).toEqual( createMockDigestedSchema( {
				base: "https://example.com/",
			} ) );
		} );

	} );

} );
