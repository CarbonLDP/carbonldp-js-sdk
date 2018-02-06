import * as Auth from "./Auth";
import * as Documents from "./Documents";
import { IllegalStateError } from "./Errors";
import * as ObjectSchema from "./ObjectSchema";
import * as SDKContext from "./SDKContext";
import { ContextSettings } from "./Settings";

import {
	clazz,
	constructor,
	hasDefaultExport,
	hasProperty,
	hasSignature,
	INSTANCE,
	isDefined,
	method,
	module,
	STATIC,
} from "./test/JasmineExtender";

fdescribe( module( "Carbon/SDKContext" ), ():void => {

	it( isDefined(), ():void => {
		expect( SDKContext ).toBeDefined();
		expect( SDKContext ).toEqual( jasmine.any( Object ) );
	} );

	describe( clazz( "Carbon.SDKContext.Class", "Base class of every Context in the SDK.", [ "Carbon.Context.Class" ] ), ():void => {

		it( isDefined(), ():void => {
			expect( SDKContext.Class ).toBeDefined();
			expect( SDKContext.Class ).toEqual( jasmine.any( Function ) );
		} );

		describe( constructor(), ():void => {

			it( "should exists", ():void => {
				expect( SDKContext.Class.prototype ).toBeDefined();
				expect( SDKContext.Class.prototype ).toEqual( jasmine.any( Object ) );
			} );

			it( "should be instantiable", ():void => {
				const target:SDKContext.Class = new SDKContext.Class();

				expect( target ).toBeDefined();
				expect( target ).toEqual( jasmine.any( SDKContext.Class ) );
			} );

			it( "should instantiate auth as property", ():void => {
				const target:SDKContext.Class = new SDKContext.Class();

				expect( target.auth ).toBeDefined();
				expect( target.auth ).toEqual( jasmine.any( Auth.Class ) );
			} );

			it( "should instantiate documents as property", ():void => {
				const target:SDKContext.Class = new SDKContext.Class();

				expect( target.documents ).toBeDefined();
				expect( target.documents ).toEqual( jasmine.any( Documents.Class ) );
			} );

		} );

		it( hasProperty(
			INSTANCE,
			"auth",
			"Carbon.Auth.Class",
			"Instance of an implementation of the `Carbon.Auth.Class` class to manage authentications and authorizations in the context.\n" +
			"In an instance of the SDKContext this property is set to `null`, and its children contexts must instantiate a valid implementation of the `Carbon.Auth.Class` abstract class."
		), ():void => {} );

		it( hasProperty(
			INSTANCE,
			"documents",
			"Carbon.Documents.Class",
			"Instance of `Carbon.Documents.Class` class to manage all the documents in the context."
		), ():void => {} );

		it( hasProperty(
			INSTANCE,
			"baseURI",
			"string",
			"The base URI of the context. For an instance of `Carbon.SDKContext.Class`, this is an empty string."
		), ():void => {
			const context:SDKContext.Class = new SDKContext.Class();

			expect( context.baseURI ).toBeDefined();
			expect( context.baseURI ).toEqual( jasmine.any( String ) );

			expect( context.baseURI ).toBe( "" );
		} );

		it( hasProperty(
			INSTANCE,
			"parentContext",
			"Carbon.Context.Class",
			"Parent context of the current context. For an instance of `Carbon.SDKContext.Class`, this is set to null since it is the root parent of every context in the SDK."
		), ():void => {
			const context:SDKContext.Class = new SDKContext.Class();

			expect( context.parentContext ).toBeDefined();
			expect( context.parentContext ).toBeNull();
		} );


		type ExtendedContext = SDKContext.Class & { _generalSchema:ObjectSchema.DigestedObjectSchema };

		function createContext( settings?:ContextSettings, generalSchema?:ObjectSchema.DigestedObjectSchema, schemasMap?:Map<string, ObjectSchema.DigestedObjectSchema> ):ExtendedContext {
			return new class extends SDKContext.Class {
				get baseURI():string { return "https://example.com/"; }

				get _generalSchema():ObjectSchema.DigestedObjectSchema { return this.generalObjectSchema; }

				constructor() {
					super();
					this.settings = settings ? settings : {};
					this.generalObjectSchema = generalSchema ? generalSchema : new ObjectSchema.DigestedObjectSchema();
					this.typeObjectSchemaMap = schemasMap ? schemasMap : new Map();
				}
			};
		}

		function createSchema( values?:Partial<ObjectSchema.DigestedObjectSchema> ):ObjectSchema.DigestedObjectSchema {
			return Object.assign( new ObjectSchema.DigestedObjectSchema(), values );
		}


		describe( method( INSTANCE, "resolve" ), ():void => {

			it( hasSignature(
				"Returns the resolved relative URI specified, in accordance with the scope of the context.", [
					{ name: "relativeURI", type: "string" },
				],
				{ type: "string" }
			), ():void => {} );

			it( "should exists", ():void => {
				expect( SDKContext.Class.prototype.resolve ).toBeDefined();
				expect( SDKContext.Class.prototype.resolve ).toEqual( jasmine.any( Function ) );
			} );

			it( "should resolve using the baseURI", ():void => {
				const context:SDKContext.Class = new SDKContext.Class();

				const spy:jasmine.Spy = spyOnProperty( context, "baseURI", "get" ).and
					.returnValue( "https://example.com" );

				expect( context.resolve( "relative/uri/" ) ).toBe( "https://example.com/relative/uri/" );
				expect( spy ).toHaveBeenCalledTimes( 1 );

				expect( context.resolve( "http://not-example.com/uri/" ) ).toBe( "http://not-example.com/uri/" );
				expect( spy ).toHaveBeenCalledTimes( 2 );
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
				expect( SDKContext.Class.prototype._resolvePath ).toBeDefined();
				expect( SDKContext.Class.prototype._resolvePath ).toEqual( jasmine.any( Function ) );
			} );


			it( "should throw error when no settings paths", ():void => {
				const context:SDKContext.Class = createContext( {} );
				const helper:( path:string ) => void = path => () => {
					context._resolvePath( path );
				};

				expect( helper( "document" ) ).toThrowError( IllegalStateError, `The path "document" hasn't been declared.` );
				expect( helper( "document.subDocument" ) ).toThrowError( IllegalStateError, `The path "document" hasn't been declared.` );
			} );

			it( "should throw error when path not found in first level", ():void => {
				const context:SDKContext.Class = createContext( { paths: {} } );
				const helper:( path:string ) => void = path => () => {
					context._resolvePath( path );
				};

				expect( helper( "document" ) ).toThrowError( IllegalStateError, `The path "document" hasn't been declared.` );
				expect( helper( "document.subDocument" ) ).toThrowError( IllegalStateError, `The path "document" hasn't been declared.` );
			} );

			it( "should throw error when path not found in second level string", ():void => {
				const context:SDKContext.Class = createContext( {
					paths: {
						document: "document/",
					},
				} );

				const helper:( path:string ) => void = path => () => {
					context._resolvePath( path );
				};

				expect( helper( "document" ) ).not.toThrowError( IllegalStateError, `The path "document" hasn't been declared.` );
				expect( helper( "document.subDocument" ) ).toThrowError( IllegalStateError, `The path "document.subDocument" hasn't been declared.` );
			} );

			it( "should throw error when path not found in parent level object without paths", ():void => {
				const context:SDKContext.Class = createContext( {
					paths: {
						document: {
							slug: "document/",
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
				const context:SDKContext.Class = createContext( {
					paths: {
						document: {
							slug: "document/",
							paths: {},
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
				const context:SDKContext.Class = createContext( {
					paths: {
						document: {
							slug: "document/",
							paths: {
								another: "another/",
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
				const context:SDKContext.Class = createContext( {
					paths: {
						document: {
							paths: {
								subDocument: "document-1/",
							},
						} as any,
					},
				} );

				const helper:( path:string ) => void = path => () => {
					context._resolvePath( path );
				};

				expect( helper( "document" ) ).toThrowError( IllegalStateError, `The path "document" doesn't have a slug set.` );
				expect( helper( "document.subDocument" ) ).toThrowError( IllegalStateError, `The path "document" doesn't have a slug set.` );
			} );

			it( "should throw error when no slug in target level object", ():void => {
				const context:SDKContext.Class = createContext( {
					paths: {
						document: {
							slug: "document/",
							paths: {
								subDocument: {} as any,
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
				const context:SDKContext.Class = createContext( {
					paths: {
						document: {
							slug: "document/",
							paths: {
								subDocument: {} as any,
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
				const context:SDKContext.Class = createContext( {
					paths: {
						document: "document/",
					},
				} );

				expect( context._resolvePath( "document" ) ).toBe( "https://example.com/document/" );
			} );

			it( "should resolve first level path object", ():void => {
				const context:SDKContext.Class = createContext( {
					paths: {
						document: {
							slug: "document/",
						},
					},
				} );

				expect( context._resolvePath( "document" ) ).toBe( "https://example.com/document/" );
			} );

			it( "should resolve second level path string", ():void => {
				const context:SDKContext.Class = createContext( {
					paths: {
						document: {
							slug: "document/",
							paths: { subDocument: "sub-document-1/" },
						},
					},
				} );

				expect( context._resolvePath( "document.subDocument" ) ).toBe( "https://example.com/document/sub-document-1/" );
			} );

			it( "should resolve second level path object", ():void => {
				const context:SDKContext.Class = createContext( {
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
				expect( SDKContext.Class.prototype.hasObjectSchema ).toBeDefined();
				expect( SDKContext.Class.prototype.hasObjectSchema ).toEqual( jasmine.any( Function ) );
			} );


			it( "should return false when not existing schema in schema maps", ():void => {
				const context:SDKContext.Class = createContext();

				expect( context.hasObjectSchema( "https://example.com/ns#MyType" ) ).toBe( false );
				expect( context.hasObjectSchema( "ex:MyType" ) ).toBe( false );
			} );

			it( "should return true when schema with absolute type", ():void => {
				const context:SDKContext.Class = createContext(
					null,
					null,
					new Map( [ [ "https://example.com/ns#MyType", new ObjectSchema.DigestedObjectSchema() ] ] )
				);

				expect( context.hasObjectSchema( "https://example.com/ns#MyType" ) ).toBe( true );
				expect( context.hasObjectSchema( "ex:MyType" ) ).toBe( false );
			} );

			it( "should return true when prefixed type with defined prefix in general", ():void => {
				const context:SDKContext.Class = createContext(
					null,
					createSchema( { prefixes: new Map( [ [ "ex", "https://example.com/ns#" ] ] ) } ),
					new Map( [ [ "https://example.com/ns#MyType", new ObjectSchema.DigestedObjectSchema() ] ] )
				);

				expect( context.hasObjectSchema( "https://example.com/ns#MyType" ) ).toBe( true );
				expect( context.hasObjectSchema( "ex:MyType" ) ).toBe( true );
			} );

			it( "should return true when relative and default vocab schema", ():void => {
				const context:SDKContext.Class = createContext(
					{ vocabulary: "https://example.com/ns#" },
					null,
					new Map( [ [ "https://example.com/ns#MyType", new ObjectSchema.DigestedObjectSchema() ] ] )
				);

				expect( context.hasObjectSchema( "https://example.com/ns#MyType" ) ).toBe( true );
				expect( context.hasObjectSchema( "MyType" ) ).toBe( true );
			} );

		} );

		describe( method( INSTANCE, "getObjectSchema" ), ():void => {

			it( hasSignature(
				"Returns the ObjectSchema for the specified type", [
					{ name: "type", type: "string", optional: true, description: "The URI of the type to look for its schema." },
				],
				{ type: "Carbon.ObjectSchema.DigestedObjectSchema", description: "The specified schema to look for. If no schema was found `null` will be returned." }
			), ():void => {} );

			it( hasSignature(
				"Returns the general object schema of the context.",
				{ type: "Carbon.ObjectSchema.DigestedObjectSchema", description: "The general schema of the context." }
			), ():void => {} );

			it( "should exists", ():void => {
				expect( SDKContext.Class.prototype.getObjectSchema ).toBeDefined();
				expect( SDKContext.Class.prototype.getObjectSchema ).toEqual( jasmine.any( Function ) );
			} );

			it( "should return null when not existing schema in schema maps", ():void => {
				const context:SDKContext.Class = createContext();

				expect( context.getObjectSchema( "https://example.com/ns#MyType" ) ).toBeNull();
				expect( context.getObjectSchema( "ex:MyType" ) ).toBeNull();
			} );

			it( "should return schema with absolute type", ():void => {
				const schema:ObjectSchema.DigestedObjectSchema = new ObjectSchema.DigestedObjectSchema();
				const context:SDKContext.Class = createContext(
					null,
					null,
					new Map( [ [ "https://example.com/ns#MyType", schema ] ] )
				);

				expect( context.getObjectSchema( "https://example.com/ns#MyType" ) ).toBe( schema );
				expect( context.getObjectSchema( "ex:MyType" ) ).toBeNull();
			} );

			it( "should return schema when prefixed type with defined prefix in general", ():void => {
				const schema:ObjectSchema.DigestedObjectSchema = new ObjectSchema.DigestedObjectSchema();
				const context:SDKContext.Class = createContext(
					null,
					createSchema( { prefixes: new Map( [ [ "ex", "https://example.com/ns#" ] ] ) } ),
					new Map( [ [ "https://example.com/ns#MyType", schema ] ] )
				);

				expect( context.getObjectSchema( "https://example.com/ns#MyType" ) ).toBe( schema );
				expect( context.getObjectSchema( "ex:MyType" ) ).toBe( schema );
			} );

			it( "should return schema when relative and default vocab schema", ():void => {
				const schema:ObjectSchema.DigestedObjectSchema = new ObjectSchema.DigestedObjectSchema();
				const context:SDKContext.Class = createContext(
					{ vocabulary: "https://example.com/ns#" },
					null,
					new Map( [ [ "https://example.com/ns#MyType", schema ] ] )
				);

				expect( context.getObjectSchema( "https://example.com/ns#MyType" ) ).toBe( schema );
				expect( context.getObjectSchema( "MyType" ) ).toBe( schema );
			} );

			it( "should return general schema with base", ():void => {
				const context:SDKContext.Class = createContext(
					null,
					createSchema( {
						prefixes: new Map( [
							[ "schema", "https://schema.org/" ],
						] ),
					} )
				);

				expect( context.getObjectSchema() ).toEqual( createSchema( {
					base: "https://example.com/",
					prefixes: new Map( [
						[ "schema", "https://schema.org/" ],
					] ),
				} ) );
			} );

			it( "should not replace base in general schema when already set", ():void => {
				const context:SDKContext.Class = createContext(
					null,
					createSchema( {
						base: "https://not-example.com/",
						prefixes: new Map( [
							[ "schema", "https://schema.org/" ],
						] ),
					} )
				);

				expect( context.getObjectSchema() ).toEqual( createSchema( {
					base: "https://not-example.com/",
					prefixes: new Map( [
						[ "schema", "https://schema.org/" ],
					] ),
				} ) );
			} );

			it( "should return general schema with vocab when setting set", ():void => {
				const context:SDKContext.Class = createContext(
					{ vocabulary: "https://example.com/ns#" },
					createSchema( {
						prefixes: new Map( [
							[ "schema", "https://schema.org/" ],
						] ),
					} )
				);

				expect( context.getObjectSchema() ).toEqual( createSchema( {
					base: "https://example.com/",
					vocab: "https://example.com/ns#",
					prefixes: new Map( [
						[ "schema", "https://schema.org/" ],
					] ),
				} ) );
			} );

			it( "should not replace vocab in general schema when already set and setting set", ():void => {
				const context:SDKContext.Class = createContext(
					{ vocabulary: "https://example.com/ns#" },
					createSchema( {
						vocab: "https://example.com/another-ns#",
						prefixes: new Map( [
							[ "schema", "https://schema.org/" ],
						] ),
					} )
				);

				expect( context.getObjectSchema() ).toEqual( createSchema( {
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
					{ name: "objectSchema", type: "Carbon.ObjectSchema.DigestedObjectSchema", description: "The new schema that will extends the previous one." },
				]
			), ():void => {} );

			it( hasSignature(
				"Extends the general schema of the current context.\nIf a general schema exists in the parent context, this is duplicated for the current context, but only the first time the schema is extended.", [
					{ name: "objectSchema", type: "Carbon.ObjectSchema.DigestedObjectSchema", description: "The new schema that will extends the previous one." },
				]
			), ():void => {} );

			it( "should exists", ():void => {
				expect( SDKContext.Class.prototype.extendObjectSchema ).toBeDefined();
				expect( SDKContext.Class.prototype.extendObjectSchema ).toEqual( jasmine.any( Function ) );
			} );

			it( "should add when absolute type schema does not exists", ():void => {
				const schemasMap:Map<string, ObjectSchema.DigestedObjectSchema> = new Map();
				const context:SDKContext.Class = createContext( null, null, schemasMap );

				context.extendObjectSchema( "https://example.com/ns#Type", {
					"ex": "https://example.com/ns#",
				} );

				expect( schemasMap ).toEqual( new Map( [ [
					"https://example.com/ns#Type",
					createSchema( {
						prefixes: new Map( [ [ "ex", "https://example.com/ns#" ] ] ),
					} ),
				] ] ) );
			} );

			it( "should add when prefixed type schema does not exists", ():void => {
				const schemasMap:Map<string, ObjectSchema.DigestedObjectSchema> = new Map();
				const context:SDKContext.Class = createContext(
					null,
					createSchema( {
						prefixes: new Map( [
							[ "ex", "https://example.com/ns#" ],
						] ),
					} ),
					schemasMap
				);

				context.extendObjectSchema( "ex:Type", {
					"schema": "https://schema.org/",
				} );

				expect( schemasMap ).toEqual( new Map( [ [
					"https://example.com/ns#Type",
					createSchema( {
						prefixes: new Map( [ [ "schema", "https://schema.org/" ] ] ),
					} ),
				] ] ) );
			} );

			it( "should add when relative type schema does not exists and vocab is set", ():void => {
				const schemasMap:Map<string, ObjectSchema.DigestedObjectSchema> = new Map();
				const context:SDKContext.Class = createContext(
					{ vocabulary: "https://example.com/ns#" },
					null,
					schemasMap
				);

				context.extendObjectSchema( "Type", {
					"schema": "https://schema.org/",
				} );

				expect( schemasMap ).toEqual( new Map( [ [
					"https://example.com/ns#Type",
					createSchema( {
						prefixes: new Map( [ [ "schema", "https://schema.org/" ] ] ),
					} ),
				] ] ) );
			} );

			it( "should merge when type schema exists", ():void => {
				const schemasMap:Map<string, ObjectSchema.DigestedObjectSchema> = new Map( [
					[ "https://example.com/ns#Type", createSchema( {
						prefixes: new Map( [ [ "schema", "https://schema.org/" ] ] ),
					} ) ],
				] );
				const context:SDKContext.Class = createContext( null, null, schemasMap );

				context.extendObjectSchema( "https://example.com/ns#Type", {
					"rdfs": "http://www.w3.org/2000/01/rdf-schema#",
				} );

				expect( schemasMap ).toEqual( new Map( [ [
					"https://example.com/ns#Type",
					createSchema( {
						prefixes: new Map( [
							[ "schema", "https://schema.org/" ],
							[ "rdfs", "http://www.w3.org/2000/01/rdf-schema#" ],
						] ),
					} ),
				] ] ) );
			} );

			it( "should merge with general schema", ():void => {
				const context:ExtendedContext = createContext(
					null,
					createSchema( {
						prefixes: new Map( [
							[ "ex", "https://example.com/ns#" ],
						] ),
					} )
				);

				context.extendObjectSchema( {
					"schema": "https://schema.org/",
				} );

				expect( context._generalSchema ).toEqual( createSchema( {
					prefixes: new Map( [
						[ "ex", "https://example.com/ns#" ],
						[ "schema", "https://schema.org/" ],
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
				expect( SDKContext.Class.prototype.clearObjectSchema ).toBeDefined();
				expect( SDKContext.Class.prototype.clearObjectSchema ).toEqual( jasmine.any( Function ) );
			} );

			it( "should remove absolute typed schema", ():void => {
				const schemasMap:Map<string, ObjectSchema.DigestedObjectSchema> = new Map( [
					[ "https://example.com/ns#Type", createSchema() ],
				] );
				const context:SDKContext.Class = createContext(
					null,
					null,
					schemasMap
				);

				context.clearObjectSchema( "https://example.com/ns#Type" );
				expect( schemasMap ).toEqual( new Map() );
			} );

			it( "should remove prefixed typed schema", ():void => {
				const schemasMap:Map<string, ObjectSchema.DigestedObjectSchema> = new Map( [
					[ "https://example.com/ns#Type", createSchema() ],
				] );
				const context:SDKContext.Class = createContext(
					null,
					createSchema( {
						prefixes: new Map( [
							[ "ex", "https://example.com/ns#" ],
						] ),
					} ),
					schemasMap
				);

				context.clearObjectSchema( "ex:Type" );
				expect( schemasMap ).toEqual( new Map() );
			} );

			it( "should remove relative typed schema with vocab set", ():void => {
				const schemasMap:Map<string, ObjectSchema.DigestedObjectSchema> = new Map( [
					[ "https://example.com/ns#Type", createSchema() ],
				] );
				const context:SDKContext.Class = createContext(
					{ vocabulary: "https://example.com/ns#" },
					null,
					schemasMap
				);

				context.clearObjectSchema( "Type" );
				expect( schemasMap ).toEqual( new Map() );
			} );

			it( "should clean general object schema", ():void => {
				const context:ExtendedContext = createContext(
					null,
					createSchema( {
						base: "https://example.com/",
						prefixes: new Map( [
							[ "ex", "https://example.com/ns#" ],
						] ),
					} )
				);

				context.clearObjectSchema();
				expect( context._generalSchema ).toEqual( createSchema() );
			} );

		} );

	} );

	it( hasProperty(
		STATIC,
		"instance",
		"Carbon.SDKContext.Class",
		"Instance of `Carbon.SDKContext.Class` that is used as the root parent in every context."
	), ():void => {
		expect( SDKContext.instance ).toBeDefined();
		expect( SDKContext.instance ).toEqual( jasmine.any( SDKContext.Class ) );
	} );

	it( hasDefaultExport(
		"Carbon.SDKContext.instance"
	), ():void => {
		expect( SDKContext.default ).toBeDefined();
		expect( SDKContext.default ).toBe( SDKContext.instance );
	} );

} );
