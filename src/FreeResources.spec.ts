import { AbstractContext } from "./AbstractContext";
import { Documents } from "./Documents";
import * as Errors from "./Errors";

import { FreeResources } from "./FreeResources";

import { Pointer } from "./Pointer";
import { URI } from "./RDF/URI";
import {
	Resource,
	TransientResource
} from "./Resource";
import {
	extendsClass,
	hasMethod,
	hasProperty,
	interfaze,
	isDefined,
	module,
	OBLIGATORY,
	property,
	STATIC,
} from "./test/JasmineExtender";

describe( module( "carbonldp/FreeResources" ), ():void => {

	describe( interfaze(
		"CarbonLDP.BaseFreeResources",
		"Interface for the basic properties to create a free resources container."
	), ():void => {

		it( hasProperty(
			OBLIGATORY,
			"_documents",
			"CarbonLDP.Documents",
			"A `CarbonLDP.Documents` object where the FreeResources scope is in."
		), ():void => {
		} );

	} );

	describe( interfaze(
		"CarbonLDP.FreeResources",
		"Interface that represents a set of free resources."
	), ():void => {

		it( extendsClass( "CarbonLDP.PointerLibrary" ), ():void => {} );
		it( extendsClass( "CarbonLDP.PointerValidator" ), ():void => {} );

		it( hasProperty(
			OBLIGATORY,
			"_documents",
			"Private property that contains the Documents class where the object scope is in.",
			"CarbonLDP.Documents"
		), ():void => {} );

		it( hasProperty(
			OBLIGATORY,
			"_resourcesIndex",
			"Private property that contains the references of every free resource in a map form.",
			"Map<string, CarbonLDP.TransientResource>"
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
			{ type: "CarbonLDP.TransientResource" }
		), ():void => {} );

		it( hasMethod(
			OBLIGATORY,
			"getResources",
			"Returns an array with all the resources inside the FreeResources object.",
			{ type: "CarbonLDP.TransientResource[]" }
		), ():void => {} );

		it( hasMethod(
			OBLIGATORY,
			"createResource",
			"Creates and returns a new free resource. Throw an Error if no valid ID if provided or if it's already in use.", [
				{ name: "id", type: "string", optional: true, description: "The ID of the resource to create. It should be an ID as a BlankNode." },
			],
			{ type: "CarbonLDP.TransientResource" }
		), ():void => {} );

		it( hasMethod(
			OBLIGATORY,
			"createResourceFrom",
			[ "T" ],
			"Create and returns a new free resource from an object. Throw an Error if no valid id is provided or if it is already in use.", [
				{ name: "object", type: "T", description: "The object to be used as the new resource." },
				{ name: "id", type: "string", optional: true, description: "The ID of the resource to create. It should be an ID as a BlankNode." },
			],
			{ type: "CarbonLDP.TransientResource" }
		), ():void => {} );

		it( hasMethod(
			OBLIGATORY,
			"getPointer",
			"Returns the pointer referred by the ID specified, or creates one if no pointer exists in the scope.", [
				{ name: "id", type: "string", description: "The ID of the pointer sought for or the one to create." },
			],
			{ type: "CarbonLDP.Pointer" }
		), ():void => {} );

		it( hasMethod(
			OBLIGATORY,
			"toJSON",
			"Converts the resources contained in the current `CarbonLDP.FreeResources` object to a JSON object.",
			{ type: "CarbonLDP.RDF.RDFNode[]" }
		), ():void => {} );

	} );

	describe( interfaze(
		"CarbonLDP.FreeResourcesFactory",
		"Interfaces with the factory, decorate and utils methods of a `CarbonLDP.FreeResources` object."
	), ():void => {

		it( hasMethod(
			OBLIGATORY,
			"isDecorated",
			"Returns true if the object provided has the properties and methods of a `CarbonLDP.FreeResources` object.", [
				{ name: "object", type: "object", description: "Object to evaluate." },
			],
			{ type: "object is CarbonLDP.FreeResources" }
		), ():void => {} );

		it( hasMethod(
			OBLIGATORY,
			"is",
			"Returns true if the object is considered a `CarbonLDP.FreeResources` object.", [
				{ name: "object", type: "object", description: "Object to evaluate." },
			],
			{ type: "object is CarbonLDP.FreeResources" }
		), ():void => {} );

		it( hasMethod(
			OBLIGATORY,
			"create",
			[ "T extends object" ],
			"Creates a empty `CarbonLDP.FreeResources` object.", [
				{ name: "data", type: "T & CarbonLDP.BaseFreeResources", description: "Data to be used in the creation of the free resources container." },
			],
			{ type: "CarbonLDP.FreeResources" }
		), ():void => {} );

		it( hasMethod(
			OBLIGATORY,
			"createFrom",
			[ "T extends object" ],
			"Creates a `CarbonLDP.FreeResources` object from the plain object provided.", [
				{ name: "object", type: "T & CarbonLDP.BaseFreeResources", description: "The object that wants be converted in a `CarbonLDP.FreeResources`." },
			],
			{ type: "T & CarbonLDP.FreeResources" }
		), ():void => {} );

		it( hasMethod(
			OBLIGATORY,
			"decorate",
			[ "T extends object" ],
			"Decorates the object provided with the properties and methods of a `CarbonLDP.FreeResources` object.", [
				{ name: "object", type: "T" },
			],
			{ type: "T & CarbonLDP.FreeResources" }
		), ():void => {} );

	} );

	describe( property( STATIC, "FreeResources", "CarbonLDP.FreeResourcesFactory", "Constant that implements the `CarbonLDP.FreeResourcesFactory` interface." ), ():void => {

		it( isDefined(), ():void => {
			expect( FreeResources ).toBeDefined();
			expect( FreeResources ).toEqual( jasmine.any( Object ) );
		} );

		// TODO: Separate in different tests
		it( "FreeResources.isDecorated", ():void => {
			expect( FreeResources.isDecorated ).toBeDefined();
			expect( FreeResources.isDecorated ).toEqual( jasmine.any( Function ) );

			let object:any = void 0;
			expect( FreeResources.isDecorated( object ) ).toBe( false );

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
			expect( FreeResources.isDecorated( object ) ).toBe( true );

			delete object._documents;
			expect( FreeResources.isDecorated( object ) ).toBe( false );
			object._documents = null;

			delete object._resourcesIndex;
			expect( FreeResources.isDecorated( object ) ).toBe( false );
			object._resourcesIndex = null;

			delete object.hasResource;
			expect( FreeResources.isDecorated( object ) ).toBe( false );
			object.hasResource = fx;

			delete object.getResource;
			expect( FreeResources.isDecorated( object ) ).toBe( false );
			object.getResource = fx;

			delete object.getResources;
			expect( FreeResources.isDecorated( object ) ).toBe( false );
			object.getResources = fx;

			delete object.createResource;
			expect( FreeResources.isDecorated( object ) ).toBe( false );
			object.createResource = fx;

			delete object.createResourceFrom;
			expect( FreeResources.isDecorated( object ) ).toBe( false );
			object.createResourceFrom = fx;

			delete object.hasPointer;
			expect( FreeResources.isDecorated( object ) ).toBe( false );
			object.hasPointer = fx;

			delete object.getPointer;
			expect( FreeResources.isDecorated( object ) ).toBe( false );
			object.getPointer = fx;

			delete object.inScope;
			expect( FreeResources.isDecorated( object ) ).toBe( false );
			object.inScope = fx;

			delete object.toJSON;
			expect( FreeResources.isDecorated( object ) ).toBe( false );
			object.toJSON = fx;
		} );

		// TODO: Test `FreeResources.is`

		// TODO: Separate in different tests
		it( "FreeResources.create", ():void => {
			expect( FreeResources.create ).toBeDefined();
			expect( FreeResources.create ).toEqual( jasmine.any( Function ) );

			let documents:Documents = new Documents();
			let freeResources:FreeResources = FreeResources.create( { _documents: documents } );

			expect( freeResources ).toBeTruthy();
			expect( FreeResources.isDecorated( freeResources ) );
		} );

		// TODO: Separate in different tests
		it( "FreeResources.createFrom", ():void => {
			expect( FreeResources.createFrom ).toBeDefined();
			expect( FreeResources.createFrom ).toEqual( jasmine.any( Function ) );

			let documents:Documents = new Documents();

			let freeResources:FreeResources = FreeResources.createFrom( { _documents: documents } );
			expect( freeResources ).toBeTruthy();
			expect( FreeResources.isDecorated( freeResources ) );

			interface My {
				myProperty:string;
			}

			let myFreeResources:FreeResources & My = FreeResources.createFrom( { myProperty: "The property", _documents: documents } );
			expect( myFreeResources ).toBeTruthy();
			expect( FreeResources.isDecorated( myFreeResources ) );
			expect( myFreeResources.myProperty ).toBeDefined();
			expect( myFreeResources.myProperty ).toBe( "The property" );
		} );

		// TODO: Separate in different tests
		it( "FreeResources.decorate", ():void => {
			expect( FreeResources.decorate ).toBeDefined();
			expect( FreeResources.decorate ).toEqual( jasmine.any( Function ) );

			let documents:Documents = new Documents();
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

			let freeResources:FreeResources = FreeResources.decorate( object, documents );
			expect( freeResources ).toBeTruthy();
			expect( FreeResources.isDecorated( freeResources ) ).toBe( true );
			expect( freeResources._resourcesIndex ).toBeNull();
			expect( freeResources.hasResource ).toBe( fx );
			expect( freeResources.getResources ).toBe( fx );

			interface My {
				myProperty:string;
			}

			let anotherFreeResources:FreeResources & My = FreeResources.decorate<My>( { myProperty: "The property" }, documents );
			expect( anotherFreeResources ).toBeTruthy();
			expect( anotherFreeResources._resourcesIndex ).not.toBeNull();
			expect( anotherFreeResources.hasResource ).not.toBe( fx );
			expect( anotherFreeResources.getResources ).not.toBe( fx );
			expect( FreeResources.isDecorated( anotherFreeResources ) ).toBe( true );
		} );


		// TODO: Move to an appropriate place
		describe( "Decorated FreeResources object", ():void => {

			let freeResources:FreeResources;
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

				freeResources = FreeResources.create( { _documents: documents } );
			} );

			// TODO: Test in `FreeResources.decorate`
			it( "FreeResources._documents", ():void => {
				expect( freeResources._documents ).toBeDefined();
				expect( freeResources._documents instanceof Documents ).toBe( true );
			} );

			// TODO: Test in `FreeResources.decorate`
			it( "FreeResources._resourcesIndex", ():void => {
				expect( freeResources._resourcesIndex ).toBeDefined();
				expect( freeResources._resourcesIndex instanceof Map ).toBe( true );
			} );

			// TODO: Separate in different tests
			it( "FreeResources.hasResources", ():void => {
				expect( freeResources.hasResource ).toBeDefined();
				expect( freeResources.hasResource ).toEqual( jasmine.any( Function ) );

				expect( freeResources.hasResource( "_:any..." ) ).toBe( false );

				let resource:TransientResource & { val:string } = Resource.createFrom( { id: "_:1", val: "The resource" } );
				freeResources._resourcesIndex.set( "_:some", resource );
				expect( freeResources.hasResource( "_:some" ) ).toBe( true );

				expect( freeResources.hasResource( "_:any..." ) ).toBe( false );
			} );

			// TODO: Separate in different tests
			it( "FreeResources.getResource", ():void => {
				expect( freeResources.getResource ).toBeDefined();
				expect( freeResources.getResource ).toEqual( jasmine.any( Function ) );


				expect( freeResources.getResource( "_:any..." ) ).toBeNull();

				let resource:TransientResource & { val:string } = TransientResource.createFrom( { id: "_:some", val: "The resource" } );
				freeResources._resourcesIndex.set( "_:some", resource );
				expect( freeResources.getResource( "_:some" ) ).toBe( resource );

				expect( freeResources.getResource( "_:any..." ) ).toBeNull();
			} );

			// TODO: Separate in different tests
			it( "FreeResources.getResources", ():void => {
				expect( freeResources.getResources ).toBeDefined();
				expect( freeResources.getResources ).toEqual( jasmine.any( Function ) );

				let resources:TransientResource[];

				resources = freeResources.getResources();
				expect( resources ).toEqual( jasmine.any( Array ) );
				expect( resources.length ).toBe( 0 );

				freeResources._resourcesIndex.set( "_:some", TransientResource.create( { id: "_:some" } ) );
				freeResources._resourcesIndex.set( "_:another", TransientResource.create( { id: "_:another" } ) );
				resources = freeResources.getResources();
				expect( resources ).toEqual( jasmine.any( Array ) );
				expect( resources.length ).toBe( 2 );
				expect( resources[ 0 ].id ).toBe( "_:some" );
				expect( resources[ 1 ].id ).toBe( "_:another" );
			} );

			// TODO: Separate in different tests
			it( "FreeResources.createResource", ():void => {
				expect( freeResources.createResource ).toBeDefined();
				expect( freeResources.createResource ).toEqual( jasmine.any( Function ) );

				let resource00:TransientResource;
				resource00 = freeResources.createResource();
				expect( resource00 ).toBeTruthy();
				expect( URI.isBNodeID( resource00.id ) ).toBe( true );

				let resource01:TransientResource;
				resource01 = freeResources.createResource();
				expect( resource01 ).toBeTruthy();
				expect( URI.isBNodeID( resource01.id ) ).toBe( true );
				expect( resource00.id ).not.toBe( resource01.id );

				let resource02:TransientResource;
				resource02 = freeResources.createResource( "_:some" );
				expect( resource02 ).toBeTruthy();
				expect( URI.isBNodeID( resource02.id ) ).toBe( true );
				expect( resource02.id ).toBe( "_:some" );

				expect( () => freeResources.createResource( "no-valid-id" ) ).toThrowError( Errors.IllegalArgumentError );
				expect( () => freeResources.createResource( "_:some" ) ).toThrowError( Errors.IDAlreadyInUseError );
			} );

			// TODO: Separate in different tests
			it( "FreeResources.createResourceFrom", ():void => {
				expect( freeResources.createResourceFrom ).toBeDefined();
				expect( freeResources.createResourceFrom ).toEqual( jasmine.any( Function ) );

				let resourceObject00:Object = {};
				let resource00:TransientResource;
				resource00 = freeResources.createResourceFrom( resourceObject00 );
				expect( resource00 ).toBeTruthy();
				expect( URI.isBNodeID( resource00.id ) ).toBe( true );
				expect( resource00 ).toEqual( resourceObject00 as TransientResource );

				let resourceObject01:Object = {};
				let resource01:TransientResource;
				resource01 = freeResources.createResourceFrom( resourceObject01 );
				expect( resource01 ).toBeTruthy();
				expect( URI.isBNodeID( resource01.id ) ).toBe( true );
				expect( resource00.id ).not.toBe( resource01.id );
				expect( resource01 ).toEqual( resourceObject01 as TransientResource );

				let resourceObject02:Object = {};
				let resource02:TransientResource;
				resource02 = freeResources.createResourceFrom( resourceObject02, "_:some" );
				expect( resource02 ).toBeTruthy();
				expect( URI.isBNodeID( resource02.id ) ).toBe( true );
				expect( resource02.id ).toBe( "_:some" );
				expect( resource02 ).toEqual( resourceObject02 as TransientResource );

				expect( () => freeResources.createResourceFrom( {}, "no-valid-id" ) ).toThrowError( Errors.IllegalArgumentError );
				expect( () => freeResources.createResourceFrom( {}, "_:some" ) ).toThrowError( Errors.IDAlreadyInUseError );
			} );

			// TODO: Separate in different tests
			it( "FreeResources.hasPointer", ():void => {
				expect( freeResources.hasPointer ).toBeDefined();
				expect( freeResources.hasPointer ).toEqual( jasmine.any( Function ) );

				expect( freeResources.hasPointer( "_:some" ) ).toBe( false );

				freeResources._resourcesIndex.set( "_:some", TransientResource.create( { id: "_:some" } ) );
				expect( freeResources.hasPointer( "_:some" ) ).toBe( true );

				expect( freeResources.hasPointer( "http://example.com/some/" ) ).toBe( false );

				documents.getPointer( "http://example.com/some/" );
				expect( freeResources.hasPointer( "http://example.com/some/" ) ).toBe( true );
			} );

			// TODO: Separate in different tests
			it( "FreeResources.getPointer", ():void => {
				expect( freeResources.getPointer ).toBeDefined();
				expect( freeResources.getPointer ).toEqual( jasmine.any( Function ) );

				let resource:TransientResource = TransientResource.create( { id: "_:some" } );
				freeResources._resourcesIndex.set( "_:some", resource );
				expect( freeResources.getPointer( "_:some" ) ).toBe( resource );

				let pointer:Pointer = freeResources.getPointer( "_:another" );
				expect( pointer ).toBeTruthy();
				expect( pointer.id ).toBe( "_:another" );
				expect( freeResources._resourcesIndex.get( "_:another" ) ).toBe( pointer as TransientResource );

				pointer = freeResources.getPointer( "http://example.com/some/" );
				expect( pointer ).toBeTruthy();
				expect( documents.getPointer( "http://example.com/some/" ) ).toBe( pointer );
			} );

			describe( "FreeResources.inScope", ():void => {

				it( "should exist", ():void => {
					expect( freeResources.inScope ).toBeDefined();
					expect( freeResources.inScope ).toEqual( jasmine.any( Function ) );
				} );

				// TODO: Separate in different tests
				it( "should test method", ():void => {
					expect( freeResources.inScope( "_:some" ) ).toBe( true );

					// Asks to its documents instance
					expect( freeResources.inScope( "http://example.com/some/" ) ).toBe( true );
					expect( freeResources.inScope( "relative-document/" ) ).toBe( true );
				} );

			} );

			// TODO: Separate in different tests
			it( "FreeResources.toJSON", ():void => {
				expect( freeResources.toJSON ).toBeDefined();
				expect( freeResources.toJSON ).toEqual( jasmine.any( Function ) );

				context.extendObjectSchema( "http://example.com/ns#MyType", {
					"anotherProperty": {
						"@id": "http://example.com/ns#another-property",
						"@type": "http://www.w3.org/2001/XMLSchema#string",
					},
				} );

				let resource:TransientResource = TransientResource.createFrom( {
					id: "_:some",
					types: [ "http://example.com/ns#MyType" ],
					"http://example.com/ns#property": "A Property",
					"anotherProperty": "Another Property",
				} );
				freeResources._resourcesIndex.set( "_:some", resource );

				let expandedResource:object = {
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
				expect( freeResources.toJSON() ).toEqual( [ expandedResource ] );

				let anotherResource:TransientResource = TransientResource.createFrom( {
					id: "_:another",
					types: [ "http://example.com/ns#MyType" ],
					"http://example.com/ns#property": "A Property",
					"anotherProperty": "Another Property",
				} );
				freeResources._resourcesIndex.set( "_:another", anotherResource );

				let anotherExpandedResource:object = {
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
				expect( freeResources.toJSON() ).toEqual( [ expandedResource, anotherExpandedResource ] );
			} );

		} );

	} );

} );
