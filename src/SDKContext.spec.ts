import * as SDKContext from "./SDKContext";
import DefaultExport from "./SDKContext";

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
	decoratedObject,
	hasSignature,
	hasDefaultExport
} from "./test/JasmineExtender";
import * as Utils from "./Utils";
import * as Auth from "./Auth";
import Documents from "./Documents";
import Context from "./Context";
import * as ObjectSchema from "./ObjectSchema";

describe( module( "Carbon/SDKContext" ), ():void => {

	it( isDefined(), ():void => {
		expect( SDKContext ).toBeDefined();
		expect( Utils.isObject( SDKContext ) ).toBe( true );
	} );

	describe( clazz(
		"Carbon.SDKContext.Class",
		"Base class for every Context in the SDK."
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
				toEqual: function( util ) {
					return {
						compare: function( actual, expected ) {
							return {pass: util.equals( actual, expected, [ compareMap ] )};
						}
					};

					function compareMap( actual, expected ) {
						if( actual instanceof Map ) {
							var pass = actual.size === expected.size;
							if( pass ) {
								actual.forEach( ( v, k ) => { pass = pass && util.equals( v, expected.get( k ) ); } );
							}
							return pass;
						} else {
							return undefined;
						}
					}
				}
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
			"Instance of a implementation of the Auth class for manage all the authentications and authorizations in the context.\n" +
			"In the SDKContext this property is set to `null`, and in it children contexts, they instantiate a valid implementation of the `Carbon.Auth.Class` abstract class."
		), ():void => {
			expect( context.auth ).toBeDefined();
			expect( context.auth instanceof Auth.Class );
		} );

		it( hasProperty(
			INSTANCE,
			"documents",
			"Carbon.Documents",
			"Instance of Documents class for manage all the documents in the context."
		), ():void => {
			expect( context.documents ).toBeDefined();
			expect( context.documents instanceof Documents ).toBe( true );
		} );

		it( hasProperty(
			INSTANCE,
			"parentContext",
			"Carbon.Context",
			"Accessor for the parent context of the context. It is null since SDKContext.Class its the base of all context."
		), ():void => {
			expect( context.parentContext ).toBeDefined();
			expect( context.parentContext ).toBeNull();
		} );

		it( hasMethod(
			INSTANCE,
			"getBaseURI",
			"Returns the base URI of the context, witch for is an empty string for this context.",
			{type: "string"}
		), ():void => {
			expect( context.getBaseURI ).toBeDefined();
			expect( Utils.isFunction( context.getBaseURI ) ).toBe( true );

			expect( context.getBaseURI() ).toBe( "" );
		} );

		it( hasMethod(
			INSTANCE,
			"resolve",
			"Returns URI provided resolved in this context, witch is the same URI provided.", [
				{name: "relativeURI", type: "string"}
			],
			{type: "string"}
		), ():void => {
			expect( context.resolve ).toBeDefined();
			expect( Utils.isFunction( context.resolve ) ).toBe( true );

			expect( context.resolve( "http://example.com/a/uri/" ) ).toBe( "http://example.com/a/uri/" );
			expect( context.resolve( "a/relative/uri/" ) ).toBe( "a/relative/uri/" );
		} );

		it( hasMethod(
			INSTANCE,
			"hasSetting",
			"Returns true if the setting looked for is established in the context.", [
				{name: "name", type: "string"}
			],
			{type: "boolean"}
		), ():void => {
			expect( context.hasSetting ).toBeDefined();
			expect( Utils.isFunction( context.hasSetting ) ).toBe( true );

			expect( context.hasSetting( "a.setting" ) ).toBe( false );

			class MyContext extends SDKContext.Class {
				constructor() {
					super();
					this.settings.set( "a.setting", "my setting" );
				}
			}
			let mockedContext:Context = new MyContext();

			expect( mockedContext.hasSetting( "a.setting" ) ).toBe( true );
			expect( mockedContext.hasSetting( "another.setting" ) ).toBe( false );
		} );

		it( hasMethod(
			INSTANCE,
			"getSetting",
			`Returns the value of the setting looked for.
			Returns \`null\` if no setting with the name specified exists.`, [
				{name: "name", type: "string"}
			],
			{type: "string"}
		), ():void => {
			expect( context.getSetting ).toBeDefined();
			expect( Utils.isFunction( context.getSetting ) ).toBeDefined();

			expect( context.getSetting( "a.setting " ) ).toBeNull();

			class MyContext extends SDKContext.Class {
				constructor() {
					super();
					this.settings.set( "a.setting", "my setting" );
				}
			}
			let mockedContext:Context = new MyContext();

			expect( mockedContext.getSetting( "a.setting" ) ).toBe( "my setting" );
			expect( mockedContext.getSetting( "another.setting" ) ).toBeNull();
		} );

		it( hasMethod(
			INSTANCE,
			"setSetting",
			"Set a setting in the the context.", [
				{name: "name", type: "string"},
				{name: "value", type: "any"}
			]
		), ():void => {
			expect( context.setSetting ).toBeDefined();
			expect( Utils.isFunction( context.setSetting ) ).toBe( true );

			context.setSetting( "a.setting", "my setting" );
			expect( context.hasSetting( "a.setting" ) ).toBe( true );

			context.setSetting( "a.setting", "the same setting" );
			expect( context.getSetting( "a.setting" ) ).toBe( "the same setting" );
		} );

		it( hasMethod(
			INSTANCE,
			"deleteSetting",
			"Deletes the setting specified from the the context.", [
				{name: "name", type: "string"}
			]
		), ():void => {
			expect( context.deleteSetting ).toBeDefined();
			expect( Utils.isFunction( context.deleteSetting ) ).toBe( true );

			class MyContext extends SDKContext.Class {
				constructor() {
					super();
					this.settings.set( "a.setting", "my setting" );
				}
			}
			let mockedContext:Context = new MyContext();

			mockedContext.deleteSetting( "a.setting" );
			expect( mockedContext.hasSetting( "a.setting" ) ).toBe( false );
		} );

		it( hasMethod(
			INSTANCE,
			"hasObjectSchema",
			"Returns true if the is an ObjectSchema for the specified type.", [
				{name: "type", type: "string"}
			],
			{type: "boolean"}
		), ():void => {
			expect( context.hasObjectSchema ).toBeDefined();
			expect( Utils.isFunction( context.hasObjectSchema ) ).toBe( true );

			expect( context.hasObjectSchema( "http://example.com/ns#MyType" ) ).toBe( false );

			class MyContext extends SDKContext.Class {
				constructor() {
					super();
					this.typeObjectSchemaMap.set( "http://example.com/ns#MyType", null );
				}
			}
			let mockedContext:Context = new MyContext();

			expect( mockedContext.hasObjectSchema( "http://example.com/ns#MyType" ) ).toBe( true );
		} );

		it( hasMethod(
			INSTANCE,
			"getObjectSchema",
			`Returns the ObjectSchema for the specified type or null if not exits.
			If no type specified the general object schema of the context is returned. This is an schema that applies for all the types.`, [
				{name: "type", type: "string", optional: true, default: "null"}
			],
			{type: "Carbon.ObjectSchema.DigestedObjectSchema"}
		), ():void => {
			expect( context.getObjectSchema ).toBeDefined();
			expect( Utils.isFunction( context.getObjectSchema ) ).toBe( true );

			// Mocked Context
			let rawObjectSchema:ObjectSchema.Class = {
				"ex": "http://example.com/ns#",
				"xsd": "http://www.w3.org/2001/XMLSchema#",
				"string": {
					"@id": "ex:string",
					"@type": "xsd:string"
				},
				"pointer": {
					"@id": "ex:pointer",
					"@type": "@id"
				}
			};
			let objectSchema:ObjectSchema.DigestedObjectSchema;
			objectSchema = new ObjectSchema.DigestedObjectSchema();
			class MyContext extends SDKContext.Class {
				constructor() {
					super();
					this.typeObjectSchemaMap.set( "http://example.com/ns#MyType", objectSchema );
					this.generalObjectSchema = ObjectSchema.Digester.digestSchema( rawObjectSchema );
				}
			}
			let mockedContext:Context = new MyContext();

			// Schema by type
			expect( context.getObjectSchema( "http://example.com/ns#MyType" ) ).toBeNull();

			let returnedSchema:ObjectSchema.DigestedObjectSchema;
			returnedSchema = mockedContext.getObjectSchema( "http://example.com/ns#MyType" );
			expect( returnedSchema instanceof ObjectSchema.DigestedObjectSchema ).toBe( true );
			expect( returnedSchema ).toBe( objectSchema );

			// General Schema
			returnedSchema = context.getObjectSchema();
			expect( returnedSchema instanceof ObjectSchema.DigestedObjectSchema ).toBe( true );
			expect( returnedSchema ).toEqual( SDKContext.instance.getObjectSchema() );

			returnedSchema = mockedContext.getObjectSchema();
			expect( returnedSchema instanceof ObjectSchema.DigestedObjectSchema ).toBe( true );
			expect( returnedSchema ).toEqual( ObjectSchema.Digester.digestSchema( rawObjectSchema ) );
		} );

		describe( method(
			INSTANCE,
			"extendObjectSchema"
		), ():void => {

			it( hasSignature(
				"Extends an Schema for a specified type of Resource", [
					{name: "type", type: "string"},
					{name: "objectSchema", type: "Carbon.ObjectSchema.DigestedObjectSchema"}
				]
			), ():void => {
				expect( context.extendObjectSchema ).toBeDefined();
				expect( Utils.isFunction( context.extendObjectSchema ) ).toBe( true );

				let objectSchema:ObjectSchema.Class = {
					"ex": "http://example.com/ns#",
					"xsd": "http://www.w3.org/2001/XMLSchema#",
					"string": {
						"@id": "ex:string",
						"@type": "xsd:string"
					},
					"pointer": {
						"@id": "ex:pointer",
						"@type": "@id"
					}
				};
				context.extendObjectSchema( "http://example.com/ns#MyType", objectSchema );

				expect( context.hasObjectSchema( "http://example.com/ns#MyType" ) ).toBe( true );

				let digestedSchema:ObjectSchema.DigestedObjectSchema = context.getObjectSchema( "http://example.com/ns#MyType" );
				expect( digestedSchema instanceof ObjectSchema.DigestedObjectSchema ).toBe( true );

				expect( digestedSchema ).toEqual( ObjectSchema.Digester.digestSchema( objectSchema ) );
			} );

			it( hasSignature(
				"Extends the General Schema of the context.", [
					{name: "objectSchema", type: "Carbon.ObjectSchema.DigestedObjectSchema"}
				]
			), ():void => {
				expect( context.extendObjectSchema ).toBeDefined();
				expect( Utils.isFunction( context.extendObjectSchema ) ).toBe( true );

				let objectSchema:ObjectSchema.Class = {
					"ex": "http://example.com/ns#",
					"xsd": "http://www.w3.org/2001/XMLSchema#",
					"string": {
						"@id": "ex:string",
						"@type": "xsd:string"
					},
					"pointer": {
						"@id": "ex:pointer",
						"@type": "@id"
					}
				};
				context.extendObjectSchema( objectSchema );

				let digestedSchema:ObjectSchema.DigestedObjectSchema = context.getObjectSchema();
				expect( digestedSchema instanceof ObjectSchema.DigestedObjectSchema ).toBe( true );
				let some = new ObjectSchema.DigestedObjectSchema();
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
			"Remove the Schema of the type specified, if not provided empty the General Schema.", [
				{name: "type", type: "string", optional: true}
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
					"@type": "xsd:string"
				},
				"pointer": {
					"@id": "ex:pointer",
					"@type": "@id"
				}
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

			//General schema
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
		"Instance of SDKContext.Class for be used as a singleton and for base parent in every context."
	), ():void => {
		expect( SDKContext.instance ).toBeDefined();
		expect( SDKContext.instance ).toBeTruthy();
		expect( SDKContext.instance instanceof SDKContext.Class ).toBe( true );
	} );

	it( hasDefaultExport(
		"Carbon.SDKContext.instance"
	), ():void => {
		expect( DefaultExport ).toBeDefined();
		expect( DefaultExport ).toBe( SDKContext.instance );
	} );

} );