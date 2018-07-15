import { createMockDigestedSchema } from "../../test/helpers/mocks";
import {
	IllegalArgumentError,
	IllegalStateError
} from "../Errors";
import { DigestedObjectSchema } from "../ObjectSchema";
import { ContextSettings } from "../Settings";
import {
	clazz,
	constructor,
	hasProperty,
	hasSignature,
	INSTANCE,
	method,
	module,
} from "../test/JasmineExtender";
import { AbstractContext } from "./AbstractContext";


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

describe( module( "carbonldp/AbstractContext" ), ():void => {

	describe( clazz(
		"CarbonLDP.AbstractContext",
		[
			"M extends CarbonLP.Pointer",
			"P extends CarbonLP.AbstractContext<any, any>",
		],
		"Abstract class for defining contexts.",
		[
			"CarbonLDP.Context",
		]
	), ():void => {

		it( hasProperty(
			INSTANCE,
			"registry",
			"CarbonLDP.AbstractRegistry<M, CarbonLDP.AbstractContext<M, P>>",
			"Registry that stores the pointers of the current in accordance to the its base URI.\nTo be defined by the subclass."
		), ():void => {} );


		it( hasProperty(
			INSTANCE,
			"parentContext",
			"P",
			"The parent context provided in the constructor.\nEmpty if not provided in constructor"
		), ():void => {} );

		it( hasProperty(
			INSTANCE,
			"baseURI",
			"string",
			"The base URI of the context.\nTo be defined by the subclass."
		), ():void => {} );


		it( "should exists", ():void => {
			expect( AbstractContext ).toBeDefined();
			expect( AbstractContext ).toEqual( jasmine.any( Function ) );
		} );


		describe( constructor(), ():void => {

			it( hasSignature(
				[
					{ name: "parentContext", type: "P", optional: true },
				]
			), ():void => {} );

			it( "sub class should be an instance", ():void => {
				const context:AbstractContext<any, any> = createMock();
				expect( context ).toEqual( jasmine.any( AbstractContext ) );
			} );

			it( "should not have a parentContext", ():void => {
				const context:AbstractContext<any, any> = createMock();
				expect( context.parentContext ).toBeUndefined();
			} );

			it( "should assign parent context if provided", ():void => {
				const context:AbstractContext<any, any> = createMock();

				const subContext:AbstractContext<any, any, any> = new class extends AbstractContext<any, any, any> {
					registry:undefined;
					repository:undefined;
					protected _baseURI:string;
				}( context );

				expect( subContext.parentContext ).toBe( context );
			} );

		} );

		describe( method( INSTANCE, "resolve" ), ():void => {

			it( hasSignature(
				"Abstract method that returns an absolute URI in accordance to the context scope.", [
					{ name: "relativeURI", type: "string" },
				],
				{ type: "string" }
			), ():void => {} );

			it( "should exists", ():void => {
				expect( AbstractContext.prototype.resolve ).toBeDefined();
				expect( AbstractContext.prototype.resolve ).toEqual( jasmine.any( Function ) );
			} );

			it( "should return same string when baseURI undefined", ():void => {
				const context:AbstractContext<any, any> = createMock( { uri: void 0 } );
				const returned:string = context.resolve( "a-string" );
				expect( returned ).toBe( "a-string" );
			} );

			it( "should resolve from the baseURI defined", ():void => {
				const context:AbstractContext<any, any> = createMock( { uri: "https://example.com" } );
				const returned:string = context.resolve( "a-string" );
				expect( returned ).toBe( "https://example.com/a-string" );
			} );

			it( "should return same IRI when absolute and baseURI defined", ():void => {
				const context:AbstractContext<any, any> = createMock( { uri: "https://example.com" } );
				const returned:string = context.resolve( "https://example.com/another-thing/a-string" );
				expect( returned ).toBe( "https://example.com/another-thing/a-string" );
			} );

		} );

		describe( method( INSTANCE, "_resolvePath" ), ():void => {

			it( hasSignature(
				"Resolves the path provided into an URL using the `path` settings of the context.",
				[
					{ name: "path", type: "string", description: "The dot notation string that refers the path declared in the settings of the context." },
				],
				{ type: "string", description: "The absolute URI of the path provided." }
			), ():void => {} );

			it( "should exists", ():void => {
				expect( AbstractContext.prototype._resolvePath ).toBeDefined();
				expect( AbstractContext.prototype._resolvePath ).toEqual( jasmine.any( Function ) );
			} );


			it( "should throw error when no settings", ():void => {
				const context:AbstractContext<any, any> = createMock( {} );
				const helper:( path:string ) => void = path => () => {
					context._resolvePath( path );
				};

				expect( helper( "document" ) ).toThrowError( IllegalStateError, `The path "document" hasn't been declared.` );
				expect( helper( "document.subDocument" ) ).toThrowError( IllegalStateError, `The path "document" hasn't been declared.` );
			} );

			it( "should throw error when no settings paths", ():void => {
				const context:AbstractContext<any, any> = createMock( { settings: {} } );
				const helper:( path:string ) => void = path => () => {
					context._resolvePath( path );
				};

				expect( helper( "document" ) ).toThrowError( IllegalStateError, `The path "document" hasn't been declared.` );
				expect( helper( "document.subDocument" ) ).toThrowError( IllegalStateError, `The path "document" hasn't been declared.` );
			} );

			it( "should throw error when path not found in first level", ():void => {
				const context:AbstractContext<any, any> = createMock( { settings: { paths: {} } } );
				const helper:( path:string ) => void = path => () => {
					context._resolvePath( path );
				};

				expect( helper( "document" ) ).toThrowError( IllegalStateError, `The path "document" hasn't been declared.` );
				expect( helper( "document.subDocument" ) ).toThrowError( IllegalStateError, `The path "document" hasn't been declared.` );
			} );

			it( "should throw error when path not found in second level string", ():void => {
				const context:AbstractContext<any, any> = createMock( {
					settings: {
						paths: {
							document: "document/",
						},
					},
				} );

				const helper:( path:string ) => void = path => () => {
					context._resolvePath( path );
				};

				expect( helper( "document" ) ).not.toThrowError( IllegalStateError, `The path "document" hasn't been declared.` );
				expect( helper( "document.subDocument" ) ).toThrowError( IllegalStateError, `The path "document.subDocument" hasn't been declared.` );
			} );

			it( "should throw error when path not found in parent level object without paths", ():void => {
				const context:AbstractContext<any, any> = createMock( {
					settings: {
						paths: {
							document: {
								slug: "document/",
							},
						},
					},
				} );

				const helper:( path:string ) => void = path => () => {
					context._resolvePath( path );
				};

				expect( helper( "document" ) ).not.toThrowError( IllegalStateError, `The path "document" hasn't been declared.` );
				expect( helper( "document.subDocument" ) ).toThrowError( IllegalStateError, `The path "document.subDocument" hasn't been declared.` );
			} );

			it( "should throw error when path not found in parent level object with empty paths", ():void => {
				const context:AbstractContext<any, any> = createMock( {
					settings: {
						paths: {
							document: {
								slug: "document/",
								paths: {},
							},
						},
					},
				} );

				const helper:( path:string ) => void = path => () => {
					context._resolvePath( path );
				};

				expect( helper( "document" ) ).not.toThrowError( IllegalStateError, `The path "document" hasn't been declared.` );
				expect( helper( "document.subDocument" ) ).toThrowError( IllegalStateError, `The path "document.subDocument" hasn't been declared.` );
			} );

			it( "should throw error when path not found in parent level object with not target path", ():void => {
				const context:AbstractContext<any, any> = createMock( {
					settings: {
						paths: {
							document: {
								slug: "document/",
								paths: {
									another: "another/",
								},
							},
						},
					},
				} );

				const helper:( path:string ) => void = path => () => {
					context._resolvePath( path );
				};

				expect( helper( "document" ) ).not.toThrowError( IllegalStateError, `The path "document" hasn't been declared.` );
				expect( helper( "document.subDocument" ) ).toThrowError( IllegalStateError, `The path "document.subDocument" hasn't been declared.` );
			} );

			it( "should throw error when no slug in parent level object", ():void => {
				const context:AbstractContext<any, any> = createMock( {
					settings: {
						paths: {
							document: {
								paths: {
									subDocument: "document-1/",
								},
							},
						},
					},
				} );

				const helper:( path:string ) => void = path => () => {
					context._resolvePath( path );
				};

				expect( helper( "document" ) ).toThrowError( IllegalStateError, `The path "document" doesn't have a slug set.` );
				expect( helper( "document.subDocument" ) ).toThrowError( IllegalStateError, `The path "document" doesn't have a slug set.` );
			} );

			it( "should throw error when no slug in target level object", ():void => {
				const context:AbstractContext<any, any> = createMock( {
					settings: {
						paths: {
							document: {
								slug: "document/",
								paths: {
									subDocument: {},
								},
							},
						},
					},
				} );

				const helper:( path:string ) => void = path => () => {
					context._resolvePath( path );
				};

				expect( helper( "document" ) ).not.toThrowError( IllegalStateError, `The path "document" doesn't have a slug set.` );
				expect( helper( "document.subDocument" ) ).toThrowError( IllegalStateError, `The path "document.subDocument" doesn't have a slug set.` );
			} );

			it( "should throw error when no slug in target level object", ():void => {
				const context:AbstractContext<any, any> = createMock( {
					settings: {
						paths: {
							document: {
								slug: "document/",
								paths: {
									subDocument: {} as any,
								},
							},
						},
					},
				} );

				const helper:( path:string ) => void = path => () => {
					context._resolvePath( path );
				};

				expect( helper( "document" ) ).not.toThrowError( IllegalStateError, `The path "document" doesn't have a slug set.` );
				expect( helper( "document.subDocument" ) ).toThrowError( IllegalStateError, `The path "document.subDocument" doesn't have a slug set.` );
			} );


			it( "should resolve first level path string", ():void => {
				const context:AbstractContext<any, any> = createMock( {
					settings: {
						paths: {
							document: "document/",
						},
					},
				} );

				expect( context._resolvePath( "document" ) ).toBe( "https://example.com/document/" );
			} );

			it( "should resolve first level path object", ():void => {
				const context:AbstractContext<any, any> = createMock( {
					settings: {
						paths: {
							document: {
								slug: "document/",
							},
						},
					},
				} );

				expect( context._resolvePath( "document" ) ).toBe( "https://example.com/document/" );
			} );

			it( "should resolve second level path string", ():void => {
				const context:AbstractContext<any, any> = createMock( {
					settings: {
						paths: {
							document: {
								slug: "document/",
								paths: { subDocument: "sub-document-1/" },
							},
						},
					},
				} );

				expect( context._resolvePath( "document.subDocument" ) ).toBe( "https://example.com/document/sub-document-1/" );
			} );

			it( "should resolve second level path object", ():void => {
				const context:AbstractContext<any, any> = createMock( {
					settings: {
						paths: {
							document: {
								slug: "document/",
								paths: {
									subDocument: {
										slug: "sub-document-1/",
									},
								},
							},
						},
					},
				} );

				expect( context._resolvePath( "document.subDocument" ) ).toBe( "https://example.com/document/sub-document-1/" );
			} );

		} );

		describe( method( INSTANCE, "hasObjectSchema" ), ():void => {

			it( hasSignature(
				"Returns true if there is an ObjectSchema for the specified type.", [
					{ name: "type", type: "string", description: "The URI of the type to look for its schema." },
				],
				{ type: "boolean" }
			), ():void => {} );

			it( "should exists", ():void => {
				expect( AbstractContext.prototype.hasObjectSchema ).toBeDefined();
				expect( AbstractContext.prototype.hasObjectSchema ).toEqual( jasmine.any( Function ) );
			} );


			it( "should return false when not existing schema in schema maps", ():void => {
				const context:AbstractContext<any, any> = createMock();

				expect( context.hasObjectSchema( "https://example.com/ns#MyType" ) ).toBe( false );
				expect( context.hasObjectSchema( "ex:MyType" ) ).toBe( false );
			} );

			it( "should return true when schema with absolute type", ():void => {
				const context:AbstractContext<any, any> = createMock( {
					schemasMap: new Map( [ [ "https://example.com/ns#MyType", new DigestedObjectSchema() ] ] ),
				} );

				expect( context.hasObjectSchema( "https://example.com/ns#MyType" ) ).toBe( true );
				expect( context.hasObjectSchema( "ex:MyType" ) ).toBe( false );
			} );

			it( "should return true when prefixed type with defined prefix in general", ():void => {
				const context:AbstractContext<any, any> = createMock( {
					generalSchema: createMockDigestedSchema( { prefixes: new Map( [ [ "ex", "https://example.com/ns#" ] ] ) } ),
					schemasMap: new Map( [ [ "https://example.com/ns#MyType", new DigestedObjectSchema() ] ] ),
				} );

				expect( context.hasObjectSchema( "https://example.com/ns#MyType" ) ).toBe( true );
				expect( context.hasObjectSchema( "ex:MyType" ) ).toBe( true );
			} );

			it( "should return true when relative and default vocab schema", ():void => {
				const context:AbstractContext<any, any> = createMock( {
					settings: { vocabulary: "https://example.com/ns#" },
					schemasMap: new Map( [ [ "https://example.com/ns#MyType", new DigestedObjectSchema() ] ] ),
				} );

				expect( context.hasObjectSchema( "https://example.com/ns#MyType" ) ).toBe( true );
				expect( context.hasObjectSchema( "MyType" ) ).toBe( true );
			} );

		} );

		describe( method( INSTANCE, "getObjectSchema" ), ():void => {

			it( hasSignature(
				"Returns the ObjectSchema for the specified type", [
					{ name: "type", type: "string", optional: true, description: "The URI of the type to look for its schema." },
				],
				{ type: "CarbonLDP.DigestedObjectSchema", description: "The specified schema to look for. If no schema was found `null` will be returned." }
			), ():void => {} );

			it( hasSignature(
				"Returns the general object schema of the context.",
				{ type: "CarbonLDP.DigestedObjectSchema", description: "The general schema of the context." }
			), ():void => {} );

			it( "should exists", ():void => {
				expect( AbstractContext.prototype.getObjectSchema ).toBeDefined();
				expect( AbstractContext.prototype.getObjectSchema ).toEqual( jasmine.any( Function ) );
			} );

			it( "should throw error when not existing schema in schema maps", ():void => {
				const context:AbstractContext<any, any> = createMock();

				expect( () => {
					context.getObjectSchema( "https://example.com/ns#MyType" );
				} ).toThrowError( IllegalArgumentError, `"https://example.com/ns#MyType" hasn't an object schema.` );
			} );

			it( "should return schema with absolute type", ():void => {
				const schema:DigestedObjectSchema = new DigestedObjectSchema();
				const context:AbstractContext<any, any> = createMock( {
					schemasMap: new Map( [ [ "https://example.com/ns#MyType", schema ] ] ),
				} );

				expect( context.getObjectSchema( "https://example.com/ns#MyType" ) ).toBe( schema );
			} );

			it( "should return schema when prefixed type with defined prefix in general", ():void => {
				const schema:DigestedObjectSchema = new DigestedObjectSchema();
				const context:AbstractContext<any, any> = createMock( {
					generalSchema: createMockDigestedSchema( { prefixes: new Map( [ [ "ex", "https://example.com/ns#" ] ] ) } ),
					schemasMap: new Map( [ [ "https://example.com/ns#MyType", schema ] ] ),
				} );

				expect( context.getObjectSchema( "ex:MyType" ) ).toBe( schema );
			} );

			it( "should return schema when relative and default vocab schema", ():void => {
				const schema:DigestedObjectSchema = new DigestedObjectSchema();
				const context:AbstractContext<any, any> = createMock( {
					settings: { vocabulary: "https://example.com/ns#" },
					schemasMap: new Map( [ [ "https://example.com/ns#MyType", schema ] ] ),
				} );

				expect( context.getObjectSchema( "https://example.com/ns#MyType" ) ).toBe( schema );
				expect( context.getObjectSchema( "MyType" ) ).toBe( schema );
			} );

			it( "should return general schema with base", ():void => {
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

			it( "should not replace base in general schema when already set", ():void => {
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

			it( "should return general schema with vocab when setting set", ():void => {
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

			it( "should not replace vocab in general schema when already set and setting set", ():void => {
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

		describe( method( INSTANCE, "extendObjectSchema" ), ():void => {

			it( hasSignature(
				"Extends the schema for a specified type of Resource.\nIf a schema for the type exists in the parent context, this is duplicated for the actual context, but only the first time this schema is extended.", [
					{ name: "type", type: "string", description: "The URI of the type to extends its schema." },
					{ name: "objectSchema", type: "CarbonLDP.DigestedObjectSchema", description: "The new schema that will extends the previous one." },
				]
			), ():void => {} );

			it( hasSignature(
				"Extends the general schema of the current context.\nIf a general schema exists in the parent context, this is duplicated for the current context, but only the first time the schema is extended.", [
					{ name: "objectSchema", type: "CarbonLDP.DigestedObjectSchema", description: "The new schema that will extends the previous one." },
				]
			), ():void => {} );

			it( "should exists", ():void => {
				expect( AbstractContext.prototype.extendObjectSchema ).toBeDefined();
				expect( AbstractContext.prototype.extendObjectSchema ).toEqual( jasmine.any( Function ) );
			} );

			it( "should add when absolute type schema does not exists", ():void => {
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

			it( "should add when prefixed type schema does not exists", ():void => {
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

			it( "should add when relative type schema does not exists and vocab is set", ():void => {
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

			it( "should merge when type schema exists", ():void => {
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

			it( "should merge with general schema", ():void => {
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

			it( "should merge with parent schema when no local schema", ():void => {
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

			it( "should not affect merge to parent schema when no local schema", ():void => {
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

		} );

		describe( method( INSTANCE, "clearObjectSchema" ), ():void => {

			it( hasSignature(
				"Remove the schema of the type specified, or the general schema if no type is provided.", [
					{ name: "type", type: "string", optional: true, description: "The URI of the type to remove its schema." },
				]
			), ():void => {} );

			it( "should exists", ():void => {
				expect( AbstractContext.prototype.clearObjectSchema ).toBeDefined();
				expect( AbstractContext.prototype.clearObjectSchema ).toEqual( jasmine.any( Function ) );
			} );

			it( "should remove absolute typed schema", ():void => {
				const schemasMap:Map<string, DigestedObjectSchema> = new Map( [
					[ "https://example.com/ns#Type", createMockDigestedSchema() ],
				] );
				const context:AbstractContext<any, any> = createMock( { schemasMap } );

				context.clearObjectSchema( "https://example.com/ns#Type" );
				expect( schemasMap ).toEqual( new Map() );
			} );

			it( "should remove prefixed typed schema", ():void => {
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

			it( "should remove relative typed schema with vocab set", ():void => {
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

			it( "should clean general object schema", ():void => {
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

} );
