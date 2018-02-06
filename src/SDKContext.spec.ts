import {
	INSTANCE,
	STATIC,

	module,
	clazz,
	method,

	isDefined,
	hasConstructor,
	hasMethod,
	hasProperty,
	hasSignature,
	hasDefaultExport,
} from "./test/JasmineExtender";
import * as Utils from "./Utils";
import * as Auth from "./Auth";
import Documents from "./Documents";
import Context from "./Context";
import * as ObjectSchema from "./ObjectSchema";

import * as SDKContext from "./SDKContext";
import { ContextSettings } from "./Settings";
import { IllegalStateError } from "./Errors";

describe( module( "Carbon/SDKContext" ), ():void => {

	it( isDefined(), ():void => {
		expect( SDKContext ).toBeDefined();
		expect( Utils.isObject( SDKContext ) ).toBe( true );
	} );

	describe( clazz(
		"Carbon.SDKContext.Class",
		"Base class of every Context in the SDK.", [
			"Carbon.Context.Class",
		]
	), ():void => {

		it( isDefined(), ():void => {
			expect( SDKContext.Class ).toBeDefined();
			expect( Utils.isFunction( SDKContext.Class ) ).toBe( true );
		} );

		let context:SDKContext.Class;
		beforeEach( ():void => {
			context = new SDKContext.Class();
			jasmine.addMatchers( {
				// Custom handler for Map as Jasmine does not support it yet
				toEqual: function( util:any ):any {
					return {
						compare: function( actual:any, expected:any ):any {
							return { pass: util.equals( actual, expected, [ compareMap ] ) };
						},
					};

					function compareMap( actual:any, expected:any ):any {
						if( actual instanceof Map ) {
							let pass:any = actual.size === expected.size;
							if( pass ) {
								actual.forEach( ( v, k ) => { pass = pass && util.equals( v, expected.get( k ) ); } );
							}
							return pass;
						} else {
							return undefined;
						}
					}
				},
			} );
		} );

		it( hasConstructor(), ():void => {
			expect( context ).toBeTruthy();
			expect( context instanceof SDKContext.Class );
		} );

		it( hasProperty(
			INSTANCE,
			"auth",
			"Carbon.Auth.Class",
			"Instance of an implementation of the `Carbon.Auth.Class` class to manage authentications and authorizations in the context.\n" +
			"In an instance of the SDKContext this property is set to `null`, and its children contexts must instantiate a valid implementation of the `Carbon.Auth.Class` abstract class."
		), ():void => {
			expect( context.auth ).toBeDefined();
			expect( context.auth instanceof Auth.Class );
		} );

		it( hasProperty(
			INSTANCE,
			"documents",
			"Carbon.Documents.Class",
			"Instance of `Carbon.Documents.Class` class to manage all the documents in the context."
		), ():void => {
			expect( context.documents ).toBeDefined();
			expect( context.documents instanceof Documents ).toBe( true );
		} );

		it( hasProperty(
			INSTANCE,
			"baseURI",
			"string",
			"The base URI of the context. For an instance of `Carbon.SDKContext.Class`, this is an empty string."
		), ():void => {
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
			expect( context.parentContext ).toBeDefined();
			expect( context.parentContext ).toBeNull();
		} );

		it( hasMethod(
			INSTANCE,
			"resolve",
			"Returns the resolved relative URI specified, in accordance with the scope of the context.", [
				{ name: "relativeURI", type: "string" },
			],
			{ type: "string" }
		), ():void => {
			expect( context.resolve ).toBeDefined();
			expect( Utils.isFunction( context.resolve ) ).toBe( true );

			expect( context.resolve( "http://example.com/a/uri/" ) ).toBe( "http://example.com/a/uri/" );
			expect( context.resolve( "a/relative/uri/" ) ).toBe( "a/relative/uri/" );
		} );

		fdescribe( method( INSTANCE, "_resolvePath" ), ():void => {

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


			function createContext( settings:ContextSettings = {} ):SDKContext.Class {
				return new class extends SDKContext.Class {
					get baseURI():string { return "https://example.com/"; }

					protected settings:ContextSettings = settings;
				};
			}

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

		it( hasMethod(
			INSTANCE,
			"hasObjectSchema",
			"Returns true if there is an ObjectSchema for the specified type.", [
				{ name: "type", type: "string", description: "The URI of the type to look for its schema." },
			],
			{ type: "boolean" }
		), ():void => {
			expect( context.hasObjectSchema ).toBeDefined();
			expect( Utils.isFunction( context.hasObjectSchema ) ).toBe( true );

			expect( context.hasObjectSchema( "http://example.com/ns#MyType" ) ).toBe( false );

			let objectSchemaMyType:ObjectSchema.DigestedObjectSchema = new ObjectSchema.DigestedObjectSchema();
			let objectSchemaAnotherType:ObjectSchema.DigestedObjectSchema = new ObjectSchema.DigestedObjectSchema();
			let objectSchemaAnotherAnotherType:ObjectSchema.DigestedObjectSchema = new ObjectSchema.DigestedObjectSchema();

			class MyContext extends SDKContext.Class {
				constructor() {
					super();
					this.typeObjectSchemaMap.set( "http://example.com/ns#MyType", objectSchemaMyType );
					this.typeObjectSchemaMap.set( "http://example.com/types#Another-Type", objectSchemaAnotherType );
					this.typeObjectSchemaMap.set( "http://example.com/vocab#Another-Another-Type", objectSchemaAnotherAnotherType );
					this.generalObjectSchema = ObjectSchema.Digester.digestSchema( {
						"ex": "http://example.com/ns#",
						"exTypes": "http://example.com/types#",
					} );
				}

				resolve( uri:string ):string {
					return "http://example.com/" + uri;
				}
			}

			let mockedContext:Context = new MyContext();
			// mockedContext.setSetting( "vocabulary", "vocab#" );

			expect( mockedContext.hasObjectSchema( "http://example.com/ns#MyType" ) ).toBe( true );
			expect( mockedContext.hasObjectSchema( "ex:MyType" ) ).toBe( true );
			expect( mockedContext.hasObjectSchema( "exTypes:Another-Type" ) ).toBe( true );
			expect( mockedContext.hasObjectSchema( "Another-Another-Type" ) ).toBe( true );
		} );

		it( hasMethod(
			INSTANCE,
			"getObjectSchema",
			"Returns the ObjectSchema for the specified type. If no type is specified, the general object schema of the context is returned.", [
				{ name: "type", type: "string", optional: true, description: "The URI of the type to look for its schema." },
			],
			{ type: "Carbon.ObjectSchema.DigestedObjectSchema", description: "The specified schema to look for. If no schema was found `null` will be returned." }
		), ():void => {
			expect( context.getObjectSchema ).toBeDefined();
			expect( Utils.isFunction( context.getObjectSchema ) ).toBe( true );

			// Mocked Context
			let rawObjectSchema:ObjectSchema.Class = {
				"ex": "http://example.com/ns#",
				"exTypes": "http://example.com/types#",
				"xsd": "http://www.w3.org/2001/XMLSchema#",
				"string": {
					"@id": "ex:string",
					"@type": "xsd:string",
				},
				"pointer": {
					"@id": "ex:pointer",
					"@type": "@id",
				},
			};
			let objectSchemaMyType:ObjectSchema.DigestedObjectSchema = new ObjectSchema.DigestedObjectSchema();
			let objectSchemaAnotherType:ObjectSchema.DigestedObjectSchema = new ObjectSchema.DigestedObjectSchema();
			let objectSchemaAnotherAnotherType:ObjectSchema.DigestedObjectSchema = new ObjectSchema.DigestedObjectSchema();

			class MyContext extends SDKContext.Class {
				constructor() {
					super();
					this.typeObjectSchemaMap.set( "http://example.com/ns#MyType", objectSchemaMyType );
					this.typeObjectSchemaMap.set( "http://example.com/types#Another-Type", objectSchemaAnotherType );
					this.typeObjectSchemaMap.set( "http://example.com/vocab#Another-Another-Type", objectSchemaAnotherAnotherType );
					this.generalObjectSchema = ObjectSchema.Digester.digestSchema( rawObjectSchema );
				}

				resolve( uri:string ):string {
					return "http://example.com/" + uri;
				}
			}

			let mockedContext:Context = new MyContext();
			// mockedContext.setSetting( "vocabulary", "vocab#" );

			let returnedSchema:ObjectSchema.DigestedObjectSchema;

			// General Schema
			returnedSchema = context.getObjectSchema();
			expect( returnedSchema instanceof ObjectSchema.DigestedObjectSchema ).toBe( true );
			expect( returnedSchema ).toEqual( SDKContext.instance.getObjectSchema() );

			returnedSchema = mockedContext.getObjectSchema();
			expect( returnedSchema instanceof ObjectSchema.DigestedObjectSchema ).toBe( true );
			expect( returnedSchema ).toEqual( ObjectSchema.Digester.digestSchema( rawObjectSchema ) );

			// Schema by type
			expect( context.getObjectSchema( "http://example.com/ns#MyType" ) ).toBeNull();
			returnedSchema = mockedContext.getObjectSchema( "http://example.com/ns#MyType" );
			expect( returnedSchema instanceof ObjectSchema.DigestedObjectSchema ).toBe( true );
			expect( returnedSchema ).toBe( objectSchemaMyType );

			expect( context.getObjectSchema( "ex:MyType" ) ).toBeNull();
			returnedSchema = mockedContext.getObjectSchema( "ex:MyType" );
			expect( returnedSchema instanceof ObjectSchema.DigestedObjectSchema ).toBe( true );
			expect( returnedSchema ).toBe( objectSchemaMyType );

			expect( context.getObjectSchema( "exTypes:Another-Type" ) ).toBeNull();
			returnedSchema = mockedContext.getObjectSchema( "exTypes:Another-Type" );
			expect( returnedSchema instanceof ObjectSchema.DigestedObjectSchema ).toBe( true );
			expect( returnedSchema ).toBe( objectSchemaAnotherType );

			expect( context.getObjectSchema( "Another-Another-Type" ) ).toBeNull();
			returnedSchema = mockedContext.getObjectSchema( "Another-Another-Type" );
			expect( returnedSchema instanceof ObjectSchema.DigestedObjectSchema ).toBe( true );
			expect( returnedSchema ).toBe( objectSchemaAnotherAnotherType );
		} );

		describe( method(
			INSTANCE,
			"extendObjectSchema"
		), ():void => {

			it( hasSignature(
				"Extends the schema for a specified type of Resource.\nIf a schema for the type exists in the parent context, this is duplicated for the actual context, but only the first time this schema is extended.", [
					{ name: "type", type: "string", description: "The URI of the type to extends its schema." },
					{ name: "objectSchema", type: "Carbon.ObjectSchema.DigestedObjectSchema", description: "The new schema that will extends the previous one." },
				]
			), ():void => {
				class MockedSDKContext extends SDKContext.Class {
					resolve( uri:string ):string {
						return "http://example.com/" + uri;
					}
				}

				context = new MockedSDKContext();
				// context.setSetting( "vocabulary", "vocab#" );
				context.extendObjectSchema( {
					"exTypes": "http://example.com/types#",
				} );

				expect( context.extendObjectSchema ).toBeDefined();
				expect( Utils.isFunction( context.extendObjectSchema ) ).toBe( true );


				let objectSchema:ObjectSchema.Class = {
					"ex": "http://example.com/ns#",
					"xsd": "http://www.w3.org/2001/XMLSchema#",
					"string": {
						"@id": "ex:string",
						"@type": "xsd:string",
					},
					"pointer": {
						"@id": "ex:pointer",
						"@type": "@id",
					},
				};
				let digestedSchema:ObjectSchema.DigestedObjectSchema;

				context.extendObjectSchema( "http://example.com/ns#MyType", objectSchema );
				expect( context.hasObjectSchema( "http://example.com/ns#MyType" ) ).toBe( true );

				digestedSchema = context.getObjectSchema( "http://example.com/ns#MyType" );
				expect( digestedSchema instanceof ObjectSchema.DigestedObjectSchema ).toBe( true );

				expect( digestedSchema ).toEqual( ObjectSchema.Digester.digestSchema( objectSchema ) );

				// Prefixed Type
				context.extendObjectSchema( "exTypes:Another-Type", objectSchema );
				expect( context.hasObjectSchema( "http://example.com/types#Another-Type" ) ).toBe( true );

				digestedSchema = context.getObjectSchema( "http://example.com/types#Another-Type" );
				expect( digestedSchema instanceof ObjectSchema.DigestedObjectSchema ).toBe( true );

				expect( digestedSchema ).toEqual( ObjectSchema.Digester.digestSchema( objectSchema ) );

				// Prefixed Type
				context.extendObjectSchema( "ex:Another-Type", objectSchema );
				expect( context.hasObjectSchema( "http://example.com/ns#Another-Type" ) ).toBe( false );

				digestedSchema = context.getObjectSchema( "ex:Another-Type" );
				expect( digestedSchema instanceof ObjectSchema.DigestedObjectSchema ).toBe( true );

				expect( digestedSchema ).toEqual( ObjectSchema.Digester.digestSchema( objectSchema ) );

				// Prefixed Type
				context.extendObjectSchema( "Another-Type", objectSchema );
				expect( context.hasObjectSchema( "http://example.com/vocab#Another-Type" ) ).toBe( true );

				digestedSchema = context.getObjectSchema( "http://example.com/vocab#Another-Type" );
				expect( digestedSchema instanceof ObjectSchema.DigestedObjectSchema ).toBe( true );

				expect( digestedSchema ).toEqual( ObjectSchema.Digester.digestSchema( objectSchema ) );
			} );

			it( hasSignature(
				"Extends the general schema of the current context.\nIf a general schema exists in the parent context, this is duplicated for the current context, but only the first time the schema is extended.", [
					{ name: "objectSchema", type: "Carbon.ObjectSchema.DigestedObjectSchema", description: "The new schema that will extends the previous one." },
				]
			), ():void => {
				expect( context.extendObjectSchema ).toBeDefined();
				expect( Utils.isFunction( context.extendObjectSchema ) ).toBe( true );

				let objectSchema:ObjectSchema.Class = {
					"ex": "http://example.com/ns#",
					"xsd": "http://www.w3.org/2001/XMLSchema#",
					"string": {
						"@id": "ex:string",
						"@type": "xsd:string",
					},
					"pointer": {
						"@id": "ex:pointer",
						"@type": "@id",
					},
				};
				context.extendObjectSchema( objectSchema );

				let digestedSchema:ObjectSchema.DigestedObjectSchema = context.getObjectSchema();
				expect( digestedSchema instanceof ObjectSchema.DigestedObjectSchema ).toBe( true );
				let some:ObjectSchema.DigestedObjectSchema = new ObjectSchema.DigestedObjectSchema();
				expect( digestedSchema.properties ).not.toEqual( some.properties );

				let expectedDigestedSchema:ObjectSchema.DigestedObjectSchema = ObjectSchema.Digester.combineDigestedObjectSchemas( [
					ObjectSchema.Digester.digestSchema( objectSchema ),
					SDKContext.instance.getObjectSchema(),
				] );
				expect( digestedSchema ).toEqual( expectedDigestedSchema );
			} );

		} );

		it( hasMethod(
			INSTANCE,
			"clearObjectSchema",
			"Remove the schema of the type specified, or the general schema if no type is provided.", [
				{ name: "type", type: "string", optional: true, description: "The URI of the type to remove its schema." },
			]
		), ():void => {
			expect( context.clearObjectSchema ).toBeDefined();
			expect( Utils.isFunction( context.clearObjectSchema ) ).toBe( true );

			// Mocked Context
			let rawObjectSchema:ObjectSchema.Class = {
				"ex": "http://example.com/ns#",
				"xsd": "http://www.w3.org/2001/XMLSchema#",
				"string": {
					"@id": "ex:string",
					"@type": "xsd:string",
				},
				"pointer": {
					"@id": "ex:pointer",
					"@type": "@id",
				},
			};
			let objectSchema:ObjectSchema.DigestedObjectSchema = ObjectSchema.Digester.digestSchema( rawObjectSchema );

			class MyContext extends SDKContext.Class {
				constructor() {
					super();
					this.typeObjectSchemaMap.set( "http://example.com/ns#MyType", objectSchema );
					this.generalObjectSchema = ObjectSchema.Digester.digestSchema( rawObjectSchema );
				}
			}

			let mockedContext:Context = new MyContext();

			// Type schema
			expect( mockedContext.hasObjectSchema( "http://example.com/ns#MyType" ) ).toBe( true );
			mockedContext.clearObjectSchema( "http://example.com/ns#MyType" );
			expect( mockedContext.hasObjectSchema( "http://example.com/ns#MyType" ) ).toBe( false );

			// General schema
			let returnedSchema:ObjectSchema.DigestedObjectSchema;
			returnedSchema = mockedContext.getObjectSchema();
			expect( returnedSchema ).toEqual( objectSchema );
			mockedContext.clearObjectSchema();
			returnedSchema = mockedContext.getObjectSchema();
			expect( returnedSchema ).not.toEqual( objectSchema );
			expect( returnedSchema ).toEqual( new ObjectSchema.DigestedObjectSchema() );
		} );

	} );

	it( hasProperty(
		STATIC,
		"instance",
		"Carbon.SDKContext.Class",
		"Instance of `Carbon.SDKContext.Class` that is used as the root parent in every context."
	), ():void => {
		expect( SDKContext.instance ).toBeDefined();
		expect( SDKContext.instance ).toBeTruthy();
		expect( SDKContext.instance instanceof SDKContext.Class ).toBe( true );
	} );

	it( hasDefaultExport(
		"Carbon.SDKContext.instance"
	), ():void => {
		expect( SDKContext.default ).toBeDefined();
		expect( SDKContext.default ).toBe( SDKContext.instance );
	} );

} );
