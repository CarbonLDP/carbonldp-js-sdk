import { anyThatMatches } from "../test/helpers/jasmine/equalities";
import { createMockRegistry } from "../test/helpers/mocks";
import {
	FreeResources,
	FreeResourcesFactory
} from "./FreeResources";
import { Pointer } from "./Pointer";
import {
	Registry,
	RegistryService
} from "./Registry";
import { TransientResource } from "./Resource";
import {
	extendsClass,
	hasMethod,
	hasProperty,
	hasSignature,
	interfaze,
	isDefined,
	method,
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
			"_registry",
			"CarbonLDP.RegistryService<CarbonLDP.Pointer, any>",
			"The registry where the FreeResources scope is in."
		), ():void => {
		} );

	} );

	describe( interfaze(
		"CarbonLDP.FreeResources",
		"Interface that represents a set of free resources."
	), ():void => {

		it( extendsClass( "CarbonLDP.Registry<CarbonLDP.TransientResource>" ), ():void => {} );

		it( hasProperty(
			OBLIGATORY,
			"_registry",
			"CarbonLDP.RegistryService<CarbonLDP.Pointer, any> | undefined"
		), ():void => {} );


		let freeResources:FreeResources;
		let registry:RegistryService<any, any>;
		beforeEach( ():void => {
			registry = createMockRegistry();
			freeResources = FreeResources.create( { _registry: registry } );
		} );

		describe( "FreeResources.hasPointer", ():void => {

			it( "should exists", ():void => {
				expect( freeResources.hasPointer ).toBeDefined();
				expect( freeResources.hasPointer ).toEqual( jasmine.any( Function ) );
			} );

			it( "should return false when no resource local ID", ():void => {
				expect( freeResources.hasPointer( "_:some" ) ).toBe( false );
			} );

			it( "should return true when has resource local ID", ():void => {
				freeResources._addPointer( { id: "_:some" } );
				expect( freeResources.hasPointer( "_:some" ) ).toBe( true );
			} );

			it( "should return false when no resource in parent registry", ():void => {
				expect( freeResources.hasPointer( "https://example.com/some/" ) ).toBe( false );
			} );

			it( "should return true when resource in parent registry", ():void => {
				registry._addPointer( { id: "https://example.com/some/" } );
				expect( freeResources.hasPointer( "https://example.com/some/" ) ).toBe( true );
			} );

		} );

		describe( "FreeResources.getPointer", ():void => {

			it( "should exists", ():void => {
				expect( freeResources.getPointer ).toBeDefined();
				expect( freeResources.getPointer ).toEqual( jasmine.any( Function ) );
			} );

			it( "should return existing resource", ():void => {
				const resource:TransientResource = freeResources._addPointer( { id: "_:some" } );
				expect( freeResources.getPointer( "_:some" ) ).toBe( resource );
			} );

			it( "should create non-existing resource", ():void => {
				const resource:Pointer = freeResources.getPointer( "_:another" );

				expect( resource.$id ).toBe( "_:another" );
				expect( resource ).toEqual( anyThatMatches( TransientResource.is, "Resource" ) as any );
			} );

			it( "should return from parent resource", ():void => {
				const parentResource:Pointer = registry.getPointer( "https://example.com/some/" );

				const resource:Pointer = freeResources.getPointer( "https://example.com/some/" );
				expect( resource ).toBe( parentResource );
			} );

		} );

		describe( "FreeResources.inScope", ():void => {

			it( "should exist", ():void => {
				expect( freeResources.inScope ).toBeDefined();
				expect( freeResources.inScope ).toEqual( jasmine.any( Function ) );
			} );

			it( "should accept blank nodes labels", ():void => {
				expect( freeResources.inScope( "_:some" ) ).toBe( true );
			} );

			it( "should reject absolute IRIs when local", ():void => {
				expect( freeResources.inScope( "https://example.com/", true ) ).toBe( false );
			} );

			it( "should accept absolute IRIs when global", ():void => {
				expect( freeResources.inScope( "https://example.com/" ) ).toBe( true );
			} );

			it( "should reject relative IRIs, when local", ():void => {
				expect( freeResources.inScope( "resource/", true ) ).toBe( false );
			} );

			it( "should reject relative IRIs, when global", ():void => {
				expect( freeResources.inScope( "resource/" ) ).toBe( true );
			} );

		} );

		// TODO: Test in `FreeResources.decorate`
		it( "FreeResources._documents", ():void => {
			expect( freeResources.$parentRegistry ).toBeDefined();
			expect( freeResources.$parentRegistry ).toEqual( jasmine.any( RegistryService ) );
		} );

		describe( method( OBLIGATORY, "toJSON" ), () => {

			it( hasSignature(
				"Converts the resources contained in the current `CarbonLDP.FreeResources` object to a JSON object.",
				{ type: "CarbonLDP.RDF.RDFNode[]" }
			), ():void => {} );

			it( "should exists", ():void => {
				expect( freeResources.toJSON ).toBeDefined();
				expect( freeResources.toJSON ).toEqual( jasmine.any( Function ) );
			} );


			it( "should expand resource with schema in context", () => {
				registry.context
					.extendObjectSchema( "http://example.com/ns#MyType", {
						"anotherProperty": {
							"@id": "http://example.com/ns#another-property",
							"@type": "http://www.w3.org/2001/XMLSchema#string",
						},
					} );

				freeResources._addPointer( TransientResource.createFrom( {
					$id: "_:some",
					types: [ "http://example.com/ns#MyType" ],
					"http://example.com/ns#property": "A Property",
					"anotherProperty": "Another Property",
				} ) );

				expect( freeResources.toJSON() ).toEqual( [ {
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
				} ] );
			} );

			it( "should expand resource with no registry and context", () => {
				delete freeResources.$parentRegistry;

				freeResources._addPointer( TransientResource.createFrom( {
					$id: "_:another",
					types: [ "http://example.com/ns#MyType" ],
					"http://example.com/ns#property": "A Property",
					"anotherProperty": "Another Property",
				} ) );

				expect( freeResources.toJSON() ).toEqual( [ {
					"@id": "_:another",
					"@type": [ "http://example.com/ns#MyType" ],
					"http://example.com/ns#property": [ {
						"@value": "A Property",
						"@type": "http://www.w3.org/2001/XMLSchema#string",
					} ],
				} ] );
			} );

		} );

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

		describe( method( OBLIGATORY, "is" ), () => {

			it( hasSignature(
				"Returns true if the object is considered a `CarbonLDP.FreeResources` object.", [
					{ name: "object", type: "object", description: "Object to evaluate." },
				],
				{ type: "object is CarbonLDP.FreeResources" }
			), ():void => {} );

			it( "should exists", ():void => {
				expect( FreeResources.is ).toBeDefined();
				expect( FreeResources.is ).toEqual( jasmine.any( Function ) );
			} );


			let isRegistry:jasmine.Spy;
			let isDecorated:jasmine.Spy;
			beforeEach( ():void => {
				isRegistry = spyOn( Registry, "isDecorated" )
					.and.returnValue( true );
				isDecorated = spyOn( FreeResources, "isDecorated" )
					.and.returnValue( true );
			} );

			it( "should assert that is a Registry", () => {
				FreeResources.is( { the: "object" } );
				expect( isRegistry ).toHaveBeenCalledWith( { the: "object" } );
			} );

			it( "should assert that is self decorated", () => {
				FreeResources.is( { the: "object" } );
				expect( isDecorated ).toHaveBeenCalledWith( { the: "object" } );
			} );

			it( "should return true when all assertions", () => {
				const returned:boolean = FreeResources.is( {} );
				expect( returned ).toBe( true );
			} );

		} );

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

			let object:FreeResourcesFactory[ "PROTOTYPE" ] = void 0;
			expect( FreeResources.isDecorated( object ) ).toBe( false );

			let fx:() => any = () => {};
			object = {
				$parentRegistry: null,
				__getLocalID: fx,
				_addPointer: fx,
				toJSON: fx,
			};
			expect( FreeResources.isDecorated( object ) ).toBe( true );

			delete object.$parentRegistry;
			expect( FreeResources.isDecorated( object ) ).toBe( false );
			object.$parentRegistry = null;

			delete object.__getLocalID;
			expect( FreeResources.isDecorated( object ) ).toBe( false );
			object.__getLocalID = fx;

			delete object._addPointer;
			expect( FreeResources.isDecorated( object ) ).toBe( false );
			object._addPointer = fx;

			delete object.toJSON;
			expect( FreeResources.isDecorated( object ) ).toBe( false );
			object.toJSON = fx;
		} );

		// TODO: Separate in different tests
		it( "FreeResources.create", ():void => {
			expect( FreeResources.create ).toBeDefined();
			expect( FreeResources.create ).toEqual( jasmine.any( Function ) );

			const registry:RegistryService<any, any> = createMockRegistry();
			let freeResources:FreeResources = FreeResources.create( { _registry: registry } );

			expect( freeResources ).toBeTruthy();
			expect( FreeResources.isDecorated( freeResources ) );
		} );

		// TODO: Separate in different tests
		it( "FreeResources.createFrom", ():void => {
			expect( FreeResources.createFrom ).toBeDefined();
			expect( FreeResources.createFrom ).toEqual( jasmine.any( Function ) );

			const registry:RegistryService<any, any> = createMockRegistry();
			let freeResources:FreeResources = FreeResources.create( { _registry: registry } );
			expect( freeResources ).toBeTruthy();
			expect( FreeResources.isDecorated( freeResources ) );

			interface My {
				myProperty:string;
			}

			let myFreeResources:FreeResources & My = FreeResources.createFrom( { myProperty: "The property", _registry: registry } );
			expect( myFreeResources ).toBeTruthy();
			expect( FreeResources.isDecorated( myFreeResources ) );
			expect( myFreeResources.myProperty ).toBeDefined();
			expect( myFreeResources.myProperty ).toBe( "The property" );
		} );

		// TODO: Separate in different tests
		it( "FreeResources.decorate", ():void => {
			expect( FreeResources.decorate ).toBeDefined();
			expect( FreeResources.decorate ).toEqual( jasmine.any( Function ) );

			let fx:() => any = () => null;
			let object:FreeResourcesFactory[ "PROTOTYPE" ] = {
				$parentRegistry: null,
				__getLocalID: fx,
				_addPointer: fx,
				toJSON: fx,
			};

			let freeResources:FreeResources = FreeResources.decorate( object );
			expect( freeResources ).toBeTruthy();
			expect( FreeResources.isDecorated( freeResources ) ).toBe( true );

			interface My {
				myProperty:string;
			}

			let anotherFreeResources:FreeResources & My = FreeResources.decorate<My>( { myProperty: "The property" } );
			expect( anotherFreeResources ).toBeTruthy();
			expect( FreeResources.isDecorated( anotherFreeResources ) ).toBe( true );
		} );

	} );

} );
