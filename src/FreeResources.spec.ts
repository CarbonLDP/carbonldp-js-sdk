import AbstractContext from "./AbstractContext";
import Documents from "./Documents";
import * as Errors from "./Errors";

import * as FreeResources from "./FreeResources";
import DefaultExport from "./FreeResources";
import { Pointer } from "./Pointer";
import * as URI from "./RDF/URI";
import { Resource } from "./Resource";
import {
	clazz,
	decoratedObject,
	extendsClass,
	hasDefaultExport,
	hasMethod,
	hasProperty,
	hasSignature,
	INSTANCE,
	interfaze,
	isDefined,
	method,
	module,
	OBLIGATORY,
	STATIC,
} from "./test/JasmineExtender";
import * as Utils from "./Utils";

describe( module( "Carbon/FreeResources" ), ():void => {

	it( isDefined(), ():void => {
		expect( FreeResources ).toBeDefined();
		expect( Utils.isObject( FreeResources ) ).toBe( true );
	} );

	describe( interfaze(
		"Carbon.FreeResources.Class",
		"Interface that represents a set of free resources."
	), ():void => {

		it( extendsClass( "Carbon.Pointer.PointerLibrary" ), ():void => {} );
		it( extendsClass( "Carbon.Pointer.PointerValidator" ), ():void => {} );

		it( hasProperty(
			OBLIGATORY,
			"_documents",
			"Private property that contains the Documents class where the object scope is in.",
			"Carbon.Documents.Class"
		), ():void => {} );

		it( hasProperty(
			OBLIGATORY,
			"_resourcesIndex",
			"Private property that contains the references of every free resource in a map form.",
			"Map<string, Carbon.Resource.Resource>"
		), ():void => {} );

		it( hasMethod(
			OBLIGATORY,
			"hasResource",
			"Returns true if a resource with the ID specified exists.", [
				{ name: "id", type: "string", description: "The ID of the resource to sought for." },
			],
			{ type: "boolean" }
		), ():void => {} );

		it( hasMethod(
			OBLIGATORY,
			"getResource",
			"Returns the resource referred by the ID provided. If no resource exists with the ID specified, `null` is returned.", [
				{ name: "id", type: "string", description: "The ID of the resource to sought for." },
			],
			{ type: "Carbon.Resource.Resource" }
		), ():void => {} );

		it( hasMethod(
			OBLIGATORY,
			"getResources",
			"Returns an array with all the resources inside the FreeResources object.",
			{ type: "Carbon.Resource.Resource[]" }
		), ():void => {} );

		it( hasMethod(
			OBLIGATORY,
			"createResource",
			"Creates and returns a new free resource. Throw an Error if no valid ID if provided or if it's already in use.", [
				{ name: "id", type: "string", optional: true, description: "The ID of the resource to create. It should be an ID as a BlankNode." },
			],
			{ type: "Carbon.Resource.Resource" }
		), ():void => {} );

		it( hasMethod(
			OBLIGATORY,
			"createResourceFrom",
			[ "T" ],
			"Create and returns a new free resource from an object. Throw an Error if no valid id is provided or if it is already in use.", [
				{ name: "object", type: "T", description: "The object to be used as the new resource." },
				{ name: "id", type: "string", optional: true, description: "The ID of the resource to create. It should be an ID as a BlankNode." },
			],
			{ type: "Carbon.Resource.Resource" }
		), ():void => {} );

		it( hasMethod(
			OBLIGATORY,
			"getPointer",
			"Returns the pointer referred by the ID specified, or creates one if no pointer exists in the scope.", [
				{ name: "id", type: "string", description: "The ID of the pointer sought for or the one to create." },
			],
			{ type: "Carbon.Pointer.Pointer" }
		), ():void => {} );

		it( hasMethod(
			OBLIGATORY,
			"toJSON",
			"Converts the resources contained in the current `Carbon.FreeResources.Class` object to a JSON string.",
			{ type: "string" }
		), ():void => {} );

	} );

	it( hasDefaultExport( "Carbon.FreeResources.Class" ), ():void => {
		let defaultExport:DefaultExport = <any> {};
		let defaultTarget:FreeResources.Class;

		defaultTarget = defaultExport;
		expect( defaultTarget ).toEqual( jasmine.any( Object ) );
	} );

	describe( clazz( "Carbon.FreeResources.Factory", "Factory class for `Carbon.FreeResources.Class` objects." ), ():void => {

		it( isDefined(), ():void => {
			expect( FreeResources.Factory ).toBeDefined();
			expect( Utils.isFunction( FreeResources.Factory ) ).toBe( true );
		} );

		it( hasMethod(
			STATIC,
			"hasClassProperties",
			"Returns true if the object provided has the properties and methods of a `Carbon.FreeResources.Class` object.", [
				{ name: "object", type: "Object", description: "Object to evaluate." },
			],
			{ type: "boolean" }
		), ():void => {
			expect( FreeResources.Factory.hasClassProperties ).toBeDefined();
			expect( Utils.isFunction( FreeResources.Factory.hasClassProperties ) ).toBe( true );

			let object:any = void 0;
			expect( FreeResources.Factory.hasClassProperties( object ) ).toBe( false );

			let fx:Function = () => {};
			object = {
				_documents: null,
				_resourcesIndex: null,
				hasResource: fx,
				getResource: fx,
				getResources: fx,
				createResource: fx,
				createResourceFrom: fx,
				hasPointer: fx,
				getPointer: fx,
				inScope: fx,
				toJSON: fx,
			};
			expect( FreeResources.Factory.hasClassProperties( object ) ).toBe( true );

			delete object._documents;
			expect( FreeResources.Factory.hasClassProperties( object ) ).toBe( false );
			object._documents = null;

			delete object._resourcesIndex;
			expect( FreeResources.Factory.hasClassProperties( object ) ).toBe( false );
			object._resourcesIndex = null;

			delete object.hasResource;
			expect( FreeResources.Factory.hasClassProperties( object ) ).toBe( false );
			object.hasResource = fx;

			delete object.getResource;
			expect( FreeResources.Factory.hasClassProperties( object ) ).toBe( false );
			object.getResource = fx;

			delete object.getResources;
			expect( FreeResources.Factory.hasClassProperties( object ) ).toBe( false );
			object.getResources = fx;

			delete object.createResource;
			expect( FreeResources.Factory.hasClassProperties( object ) ).toBe( false );
			object.createResource = fx;

			delete object.createResourceFrom;
			expect( FreeResources.Factory.hasClassProperties( object ) ).toBe( false );
			object.createResourceFrom = fx;

			delete object.hasPointer;
			expect( FreeResources.Factory.hasClassProperties( object ) ).toBe( false );
			object.hasPointer = fx;

			delete object.getPointer;
			expect( FreeResources.Factory.hasClassProperties( object ) ).toBe( false );
			object.getPointer = fx;

			delete object.inScope;
			expect( FreeResources.Factory.hasClassProperties( object ) ).toBe( false );
			object.inScope = fx;

			delete object.toJSON;
			expect( FreeResources.Factory.hasClassProperties( object ) ).toBe( false );
			object.toJSON = fx;
		} );

		it( hasMethod(
			STATIC,
			"create",
			"Creates a empty `Carbon.FreeResources.Class` object.", [
				{ name: "documents", type: "Carbon.Documents.Class", description: "A `Carbon.Documents.Class` object where the FreeResources scope is in." },
			],
			{ type: "Carbon.FreeResources.Class" }
		), ():void => {
			expect( FreeResources.Factory.create ).toBeDefined();
			expect( Utils.isFunction( FreeResources.Factory.create ) ).toBe( true );

			let documents:Documents = new Documents();
			let freeResources:FreeResources.Class = FreeResources.Factory.create( documents );

			expect( freeResources ).toBeTruthy();
			expect( FreeResources.Factory.hasClassProperties( freeResources ) );
		} );

		it( hasMethod(
			STATIC,
			"createFrom",
			[ "T extends Object" ],
			"Creates a `Carbon.FreeResources.Class` object from the plain object provided.", [
				{ name: "object", type: "T", description: "The object that wants be converted in a `Carbon.FreeResources.Class`." },
				{ name: "documents", type: "Carbon.Documents.Class", description: "A `Carbon.Documents.Class` object where the FreeResource scope is in." },
			],
			{ type: "T & Carbon.FreeResources.Class" }
		), ():void => {
			expect( FreeResources.Factory.createFrom ).toBeDefined();
			expect( Utils.isFunction( FreeResources.Factory.createFrom ) ).toBe( true );

			let documents:Documents = new Documents();

			let freeResources:FreeResources.Class = FreeResources.Factory.createFrom( {}, documents );
			expect( freeResources ).toBeTruthy();
			expect( FreeResources.Factory.hasClassProperties( freeResources ) );

			interface My {
				myProperty:string;
			}

			let myFreeResources:FreeResources.Class & My = FreeResources.Factory.createFrom( { myProperty: "The property" }, documents );
			expect( myFreeResources ).toBeTruthy();
			expect( FreeResources.Factory.hasClassProperties( myFreeResources ) );
			expect( myFreeResources.myProperty ).toBeDefined();
			expect( myFreeResources.myProperty ).toBe( "The property" );
		} );

		it( hasMethod(
			STATIC,
			"decorate",
			[ "T extends Object" ],
			"Decorates the object provided with the properties and methods of a `Carbon.FreeResources.Class` object.", [
				{ name: "object", type: "T" },
			],
			{ type: "T & Carbon.FreeResources.Class" }
		), ():void => {
			expect( FreeResources.Factory.decorate ).toBeDefined();
			expect( Utils.isFunction( FreeResources.Factory.decorate ) ).toBe( true );

			let fx:Function = () => null;
			let object:any = {
				_documents: null,
				_resourcesIndex: null,
				hasResource: fx,
				getResource: fx,
				getResources: fx,
				createResource: fx,
				createResourceFrom: fx,
				hasPointer: fx,
				getPointer: fx,
				inScope: fx,
				toJSON: fx,
			};
			let freeResources:FreeResources.Class = FreeResources.Factory.decorate( object );
			expect( freeResources ).toBeTruthy();
			expect( FreeResources.Factory.hasClassProperties( freeResources ) ).toBe( true );
			expect( freeResources._resourcesIndex ).toBeNull();
			expect( freeResources.hasResource ).toBe( fx );
			expect( freeResources.getResources ).toBe( fx );

			interface My {
				myProperty:string;
			}

			let anotherFreeResources:FreeResources.Class & My = FreeResources.Factory.decorate<My>( { myProperty: "The property" } );
			expect( anotherFreeResources ).toBeTruthy();
			expect( anotherFreeResources._resourcesIndex ).not.toBeNull();
			expect( anotherFreeResources.hasResource ).not.toBe( fx );
			expect( anotherFreeResources.getResources ).not.toBe( fx );

			expect( FreeResources.Factory.hasClassProperties( anotherFreeResources ) ).toBe( false );
			anotherFreeResources._documents = null;
			expect( FreeResources.Factory.hasClassProperties( anotherFreeResources ) ).toBe( true );
		} );


		describe( decoratedObject(
			"Object decorated by the `Carbon.FreeResources.Factory.decorate()` method.", [
				"Carbon.FreeResources.Class",
			]
		), ():void => {
			let freeResources:FreeResources.Class;
			let context:AbstractContext;
			let documents:Documents;

			beforeEach( ():void => {
				class MockedContext extends AbstractContext {
					protected _baseURI:string;

					constructor() {
						super();
						this._baseURI = "http://example.com/";
						this.settings = { paths: { system: ".system/" } };
					}
				}

				context = new MockedContext();
				documents = new Documents( context );

				freeResources = FreeResources.Factory.create( documents );
			} );

			it( hasProperty(
				INSTANCE,
				"_documents",
				"Private property that contains the Documents class where the object scope is in.",
				"Carbon.Documents.Class"
			), ():void => {
				expect( freeResources._documents ).toBeDefined();
				expect( freeResources._documents instanceof Documents ).toBe( true );
			} );

			it( hasProperty(
				INSTANCE,
				"_resourcesIndex",
				"Private property that contains the references of every free resource in a map form.",
				"Map<string, Carbon.Resource.Resource>"
			), ():void => {
				expect( freeResources._resourcesIndex ).toBeDefined();
				expect( freeResources._resourcesIndex instanceof Map ).toBe( true );
			} );

			it( hasMethod(
				INSTANCE,
				"hasResource",
				"Returns true if a resource with the ID specified exists.", [
					{ name: "id", type: "string", description: "The ID of the resource to sought for." },
				],
				{ type: "boolean" }
			), ():void => {
				expect( freeResources.hasResource ).toBeDefined();
				expect( Utils.isFunction( freeResources.hasResource ) ).toBe( true );

				expect( freeResources.hasResource( "_:any..." ) ).toBe( false );

				let resource:Resource & { val:string } = Resource.createFrom( { val: "The resource" } );
				freeResources._resourcesIndex.set( "_:some", resource );
				expect( freeResources.hasResource( "_:some" ) ).toBe( true );

				expect( freeResources.hasResource( "_:any..." ) ).toBe( false );
			} );

			it( hasMethod(
				INSTANCE,
				"getResource",
				"Returns the resource referred by the ID provided. If no resource exists with the ID specified, `null` is returned.", [
					{ name: "id", type: "string", description: "The ID of the resource to sought for." },
				],
				{ type: "Carbon.Resource.Resource" }
			), ():void => {
				expect( freeResources.getResource ).toBeDefined();
				expect( Utils.isFunction( freeResources.getResource ) ).toBe( true );


				expect( freeResources.getResource( "_:any..." ) ).toBeNull();

				let resource:Resource & { val:string } = Resource.createFrom( { val: "The resource" }, "_:some" );
				freeResources._resourcesIndex.set( "_:some", resource );
				expect( freeResources.getResource( "_:some" ) ).toBe( resource );

				expect( freeResources.getResource( "_:any..." ) ).toBeNull();
			} );

			it( hasMethod(
				INSTANCE,
				"getResources",
				"Returns an array with all the resources inside the FreeResources object.",
				{ type: "Carbon.Resource.Resource[]" }
			), ():void => {
				expect( freeResources.getResources ).toBeDefined();
				expect( Utils.isFunction( freeResources.getResources ) ).toBe( true );

				let resources:Resource[];

				resources = freeResources.getResources();
				expect( resources ).toBeTruthy();
				expect( Utils.isArray( resources ) ).toBe( true );
				expect( resources.length ).toBe( 0 );

				freeResources._resourcesIndex.set( "_:some", Resource.create( "_:some" ) );
				freeResources._resourcesIndex.set( "_:another", Resource.create( "_:another" ) );
				resources = freeResources.getResources();
				expect( resources ).toBeTruthy();
				expect( Utils.isArray( resources ) ).toBe( true );
				expect( resources.length ).toBe( 2 );
				expect( resources[ 0 ].id ).toBe( "_:some" );
				expect( resources[ 1 ].id ).toBe( "_:another" );
			} );

			it( hasMethod(
				INSTANCE,
				"createResource",
				"Creates and returns a new free resource. Throw an Error if no valid ID if provided or if it's already in use.", [
					{ name: "id", type: "string", optional: true, description: "The ID of the resource to create. It should be an ID as a BlankNode." },
				],
				{ type: "Carbon.Resource.Resource" }
			), ():void => {
				expect( freeResources.createResource ).toBeDefined();
				expect( Utils.isFunction( freeResources.createResource ) ).toBe( true );

				let resource00:Resource;
				resource00 = freeResources.createResource();
				expect( resource00 ).toBeTruthy();
				expect( URI.Util.isBNodeID( resource00.id ) ).toBe( true );

				let resource01:Resource;
				resource01 = freeResources.createResource();
				expect( resource01 ).toBeTruthy();
				expect( URI.Util.isBNodeID( resource01.id ) ).toBe( true );
				expect( resource00.id ).not.toBe( resource01.id );

				let resource02:Resource;
				resource02 = freeResources.createResource( "_:some" );
				expect( resource02 ).toBeTruthy();
				expect( URI.Util.isBNodeID( resource02.id ) ).toBe( true );
				expect( resource02.id ).toBe( "_:some" );

				expect( () => freeResources.createResource( "no-valid-id" ) ).toThrowError( Errors.IllegalArgumentError );
				expect( () => freeResources.createResource( "_:some" ) ).toThrowError( Errors.IDAlreadyInUseError );
			} );

			it( hasMethod(
				INSTANCE,
				"createResourceFrom",
				[ "T" ],
				"Create and returns a new free resource from an object. Throw an Error if no valid id is provided or if it is already in use.", [
					{ name: "object", type: "T", description: "The object to be used as the new resource." },
					{ name: "id", type: "string", optional: true, description: "The ID of the resource to create. It should be an ID as a BlankNode." },
				],
				{ type: "Carbon.Resource.Resource" }
			), ():void => {
				expect( freeResources.createResourceFrom ).toBeDefined();
				expect( Utils.isFunction( freeResources.createResourceFrom ) ).toBe( true );

				let resourceObject00:Object = {};
				let resource00:Resource;
				resource00 = freeResources.createResourceFrom( resourceObject00 );
				expect( resource00 ).toBeTruthy();
				expect( URI.Util.isBNodeID( resource00.id ) ).toBe( true );
				expect( resource00 ).toEqual( resourceObject00 as Resource );

				let resourceObject01:Object = {};
				let resource01:Resource;
				resource01 = freeResources.createResourceFrom( resourceObject01 );
				expect( resource01 ).toBeTruthy();
				expect( URI.Util.isBNodeID( resource01.id ) ).toBe( true );
				expect( resource00.id ).not.toBe( resource01.id );
				expect( resource01 ).toEqual( resourceObject01 as Resource );

				let resourceObject02:Object = {};
				let resource02:Resource;
				resource02 = freeResources.createResourceFrom( resourceObject02, "_:some" );
				expect( resource02 ).toBeTruthy();
				expect( URI.Util.isBNodeID( resource02.id ) ).toBe( true );
				expect( resource02.id ).toBe( "_:some" );
				expect( resource02 ).toEqual( resourceObject02 as Resource );

				expect( () => freeResources.createResourceFrom( {}, "no-valid-id" ) ).toThrowError( Errors.IllegalArgumentError );
				expect( () => freeResources.createResourceFrom( {}, "_:some" ) ).toThrowError( Errors.IDAlreadyInUseError );
			} );

			it( hasMethod(
				INSTANCE,
				"hasPointer",
				"Returns true if a pointer exists in the scope of the FreeResources object and its parents.",
				{ type: "boolean" }
			), ():void => {
				expect( freeResources.hasPointer ).toBeDefined();
				expect( Utils.isFunction( freeResources.hasPointer ) ).toBe( true );

				expect( freeResources.hasPointer( "_:some" ) ).toBe( false );

				freeResources._resourcesIndex.set( "_:some", Resource.create( "_:some" ) );
				expect( freeResources.hasPointer( "_:some" ) ).toBe( true );

				expect( freeResources.hasPointer( "http://example.com/some/" ) ).toBe( false );

				documents.getPointer( "http://example.com/some/" );
				expect( freeResources.hasPointer( "http://example.com/some/" ) ).toBe( true );
			} );

			it( hasMethod(
				INSTANCE,
				"getPointer",
				"Returns the pointer referred by the ID specified, or creates one if no pointer exists in the scope.", [
					{ name: "id", type: "string", description: "The ID of the pointer sought for or the one to create." },
				],
				{ type: "Carbon.Pointer.Pointer" }
			), ():void => {
				expect( freeResources.getPointer ).toBeDefined();
				expect( Utils.isFunction( freeResources.getPointer ) ).toBe( true );

				let resource:Resource = Resource.create( "_:some" );
				freeResources._resourcesIndex.set( "_:some", resource );
				expect( freeResources.getPointer( "_:some" ) ).toBe( resource );

				let pointer:Pointer = freeResources.getPointer( "_:another" );
				expect( pointer ).toBeTruthy();
				expect( pointer.id ).toBe( "_:another" );
				expect( freeResources._resourcesIndex.get( "_:another" ) ).toBe( pointer as Resource );

				pointer = freeResources.getPointer( "http://example.com/some/" );
				expect( pointer ).toBeTruthy();
				expect( documents.getPointer( "http://example.com/some/" ) ).toBe( pointer );
			} );

			describe( method(
				INSTANCE,
				"inScope"
			), ():void => {

				it( isDefined(), ():void => {
					expect( freeResources.inScope ).toBeDefined();
					expect( Utils.isFunction( freeResources.inScope ) ).toBe( true );
				} );

				it( hasSignature(
					"Returns true if the the ID provided is in the scope of the object.", [
						{ name: "id", type: "string", description: "The ID to evaluate if is in the scope." },
					],
					{ type: "boolean" }
				), ():void => {
					expect( freeResources.inScope( "_:some" ) ).toBe( true );

					// Asks to its documents instance
					expect( freeResources.inScope( "http://example.com/some/" ) ).toBe( true );
					expect( freeResources.inScope( "relative-document/" ) ).toBe( true );
				} );

				it( hasSignature(
					"Returns true if the the Pointer provided can be in the scope of the object.", [
						{ name: "pointer", type: "Carbon.Pointer.Pointer", description: "Pointer to be evaluated if can be in the scope." },
					],
					{ type: "boolean" }
				), ():void => {
					expect( freeResources.inScope( Pointer.create( "_:some" ) ) ).toBe( true );

					// Asks to its documents instance
					expect( freeResources.inScope( Pointer.create( "http://example.com/some/" ) ) ).toBe( true );
					expect( freeResources.inScope( Pointer.create( "relative-document/" ) ) ).toBe( true );
				} );

			} );

			it( hasMethod(
				INSTANCE,
				"toJSON",
				"Converts the resources contained in the current `Carbon.FreeResources.Class` object to a JSON string.",
				{ type: "string" }
			), ():void => {
				expect( freeResources.toJSON ).toBeDefined();
				expect( Utils.isFunction( freeResources.toJSON ) ).toBe( true );

				context.extendObjectSchema( "http://example.com/ns#MyType", {
					"anotherProperty": {
						"@id": "http://example.com/ns#another-property",
						"@type": "http://www.w3.org/2001/XMLSchema#string",
					},
				} );

				let resource:Resource = Resource.createFrom( {
					types: [ "http://example.com/ns#MyType" ],
					"http://example.com/ns#property": "A Property",
					"anotherProperty": "Another Property",
				}, "_:some" );
				freeResources._resourcesIndex.set( "_:some", resource );

				let expandedResource:any = {
					"@id": "_:some",
					"@type": [ "http://example.com/ns#MyType" ],
					"http://example.com/ns#property": [ {
						"@value": "A Property",
						"@type": "http://www.w3.org/2001/XMLSchema#string",
					} ],
					"http://example.com/ns#another-property": [ {
						"@value": "Another Property",
						"@type": "http://www.w3.org/2001/XMLSchema#string",
					} ],
				};
				let expectedString:string = JSON.stringify( [ expandedResource ] );
				expect( freeResources.toJSON() ).toBe( expectedString );

				let anotherResource:Resource = Resource.createFrom( {
					types: [ "http://example.com/ns#MyType" ],
					"http://example.com/ns#property": "A Property",
					"anotherProperty": "Another Property",
				}, "_:another" );
				freeResources._resourcesIndex.set( "_:another", anotherResource );

				let anotherExpandedResource:any = {
					"@id": "_:another",
					"@type": [ "http://example.com/ns#MyType" ],
					"http://example.com/ns#property": [ {
						"@value": "A Property",
						"@type": "http://www.w3.org/2001/XMLSchema#string",
					} ],
					"http://example.com/ns#another-property": [ {
						"@value": "Another Property",
						"@type": "http://www.w3.org/2001/XMLSchema#string",
					} ],
				};
				let anotherExpectedString:string = JSON.stringify( [ expandedResource, anotherExpandedResource ] );
				expect( freeResources.toJSON() ).toBe( anotherExpectedString );
			} );

		} );

	} );

} );
