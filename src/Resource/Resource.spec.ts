import { createNonEnumerable } from "../../test/helpers/miscellaneous";
import { createMockContext } from "../../test/helpers/mocks/core";

import { AbstractContext } from "../Context/AbstractContext";

import { ModelDecorator } from "../Model/ModelDecorator";
import { ModelFactoryOptional } from "../Model/ModelFactoryOptional";
import { ModelPrototype } from "../Model/ModelPrototype";
import { ModelTypeGuard } from "../Model/ModelTypeGuard";

import { Pointer } from "../Pointer/Pointer";
import { RegisteredPointer } from "../Registry/RegisteredPointer";

import { Registry } from "../Registry/Registry";

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
} from "../test/JasmineExtender";

import { LDP } from "../Vocabularies/LDP";

import { BaseResource } from "./BaseResource";
import { Resource, ResourceFactory } from "./Resource";


describe( module( "carbonldp/Resource" ), ():void => {

	describe( interfaze(
		"CarbonLDP.Resource",
		"Interface that represents a persisted blank node of a persisted document."
	), ():void => {

		it( extendsClass( "CarbonLDP.RegisteredPointer" ), ():void => {} );


		it( hasProperty(
			OBLIGATORY,
			"$registry",
			"CarbonLDP.Registry<CarbonLDP.RegisteredPointer> | undefined",
			"Associated registry where the current resource may be stored."
		), ():void => {
			const target:Resource[ "$registry" ] = {} as Registry<RegisteredPointer> | undefined;
			expect( target ).toBeDefined();
		} );

		it( hasProperty(
			OBLIGATORY,
			"$slug",
			"string",
			"Slug if the URI of the resource. Depending of the URI type would be returned:\n" +
			"1. For blank nodes the same $id of the resource would be returned\n" +
			"2. For named fragments, the content after the `#` symbol would be returned\n" +
			"3. For documents, it's the last part URI e.g. `https://example.com/resource-1/` => `resource-1`"
		), ():void => {
			const target:Resource[ "$slug" ] = {} as "";
			expect( target ).toBeDefined();
		} );

		it( hasProperty(
			OBLIGATORY,
			"types",
			"string",
			"An array with the types of the resource."
		), ():void => {} );

		it( hasMethod(
			OBLIGATORY,
			"$addType",
			"Adds a type to the current resource.", [
				{ name: "type", type: "string", description: "The type to be added." },
			]
		), ():void => {} );

		it( hasMethod(
			OBLIGATORY,
			"$hasType",
			"Returns true if the current resource contains the type specified.", [
				{ name: "type", type: "string", description: "The type to look for." },
			]
		), ():void => {} );

		it( hasMethod(
			OBLIGATORY,
			"$removeType",
			"Remove the type specified from the current resource.", [
				{ name: "type", type: "string", description: "The type to be removed." },
			]
		), ():void => {} );


		// TODO: Test .toJSON

	} );

	describe( interfaze(
		"CarbonLDP.ResourceFactory",
		"Interface with the factory, decorate and utils methods of a `CarbonLDP.Resource` object."
	), ():void => {

		it( extendsClass( "CarbonLDP.Model.ModelPrototype<CarbonLDP.Resource, CarbonLDP.Pointer>" ), () => {
			const target:ModelPrototype<Resource, Pointer> = {} as ResourceFactory;
			expect( target ).toBeDefined();
		} );

		it( extendsClass( "CarbonLDP.Model.ModelDecorator<CarbonLDP.Resource, CarbonLDP.BaseResource>" ), () => {
			const target:ModelDecorator<Resource, BaseResource> = {} as ResourceFactory;
			expect( target ).toBeDefined();
		} );

		it( extendsClass( "CarbonLDP.Model.ModelTypeGuard<CarbonLDP.Resource>" ), () => {
			const target:ModelTypeGuard<Resource> = {} as ResourceFactory;
			expect( target ).toBeDefined();
		} );

		it( extendsClass( "CarbonLDP.Model.ModelFactoryOptional<CarbonLDP.Resource, CarbonLDP.BaseResource>" ), () => {
			const target:ModelFactoryOptional<Resource, BaseResource> = {} as ResourceFactory;
			expect( target ).toBeDefined();
		} );

	} );

	describe( property(
		STATIC,
		"Resource",
		"CarbonLDP.ResourceFactory",
		"Constant that implements the `CarbonLDP.ResourceFactory` interface."
	), ():void => {

		it( isDefined(), ():void => {
			expect( Resource ).toBeDefined();
			expect( Resource ).toEqual( jasmine.any( Object ) );
		} );

		describe( "Resource.isDecorated", ():void => {

			it( "should exists", ():void => {
				expect( Resource.isDecorated ).toBeDefined();
				expect( Resource.isDecorated ).toEqual( jasmine.any( Function ) );
			} );


			let object:ResourceFactory[ "PROTOTYPE" ];
			beforeEach( ():void => {
				object = createNonEnumerable<ResourceFactory[ "PROTOTYPE" ]>( {
					types: [],

					$slug: "",

					$addType: ():any => {},
					$hasType: ():any => {},
					$removeType: ():any => {},
					toJSON: ():any => {},
				} );
			} );

			it( "should return true when all in prototype", () => {
				expect( Resource.isDecorated( object ) ).toBe( true );
			} );

			it( "should return false if no types", () => {
				delete object.types;
				expect( Resource.isDecorated( object ) ).toBe( false );
			} );

			it( "should return false if no $slug", () => {
				delete object.$slug;
				expect( Resource.isDecorated( object ) ).toBe( false );
			} );

			it( "should return false if no $addType", () => {
				delete object.$addType;
				expect( Resource.isDecorated( object ) ).toBe( false );
			} );

			it( "should return false if no $hasType", () => {
				delete object.$hasType;
				expect( Resource.isDecorated( object ) ).toBe( false );
			} );

			it( "should return false if no $removeType", () => {
				delete object.$removeType;
				expect( Resource.isDecorated( object ) ).toBe( false );
			} );

			it( "should return false if no toJSON", () => {
				delete object.toJSON;
				expect( Resource.isDecorated( object ) ).toBe( false );
			} );

		} );

		describe( "Resource.is", ():void => {

			it( "should return false when undefined", () => {
				expect( Resource.is( void 0 ) ).toBe( false );
			} );


			let object:ResourceFactory[ "PROTOTYPE" ];
			beforeEach( ():void => {
				object = createNonEnumerable<ResourceFactory[ "PROTOTYPE" ]>( {
					types: [],

					$slug: "",

					$addType: ():any => {},
					$hasType: ():any => {},
					$removeType: ():any => {},
					toJSON: ():any => {},
				} );
			} );

			it( "should return false when only prototype", () => {
				expect( Resource.is( object ) ).toBe( false );
			} );

			it( "should return true when prototype & Pointer", () => {
				const resource:Pointer = Pointer.decorate( object );
				expect( Resource.is( resource ) ).toBe( true );
			} );

		} );

		// TODO: Separate in different tests
		it( "Resource.create", ():void => {
			expect( Resource.create ).toBeDefined();
			expect( Resource.create ).toEqual( jasmine.any( Function ) );

			let resource:Resource;

			resource = Resource.create();
			expect( resource ).toBeTruthy();
			expect( Resource.isDecorated( resource ) ).toBe( true );
			expect( resource.$id ).toBe( "" );
			expect( resource.types ).toEqual( jasmine.any( Array ) );
			expect( resource.types.length ).toBe( 0 );

			resource = Resource.create( { $id: "http://example.com/resource/" } );
			expect( resource ).toBeTruthy();
			expect( Resource.isDecorated( resource ) ).toBe( true );
			expect( resource.$id ).toBe( "http://example.com/resource/" );
			expect( resource.types ).toEqual( jasmine.any( Array ) );
			expect( resource.types.length ).toBe( 0 );

			resource = Resource.create( { $id: "http://example.com/resource/", types: [ LDP.RDFSource ] } );
			expect( resource ).toBeTruthy();
			expect( Resource.isDecorated( resource ) ).toBe( true );
			expect( resource.$id ).toBe( "http://example.com/resource/" );
			expect( resource.types ).toEqual( jasmine.any( Array ) );
			expect( resource.types.length ).toBe( 1 );
			expect( resource.types ).toEqual( [ LDP.RDFSource ] );

			resource = Resource.create( { $id: null, types: [ LDP.RDFSource, LDP.Container ] } );
			expect( resource ).toBeTruthy();
			expect( Resource.isDecorated( resource ) ).toBe( true );
			expect( resource.$id ).toBeNull();
			expect( resource.types ).toEqual( jasmine.any( Array ) );
			expect( resource.types.length ).toBe( 2 );
			expect( resource.types ).toEqual( [ LDP.RDFSource, LDP.Container ] );
		} );

		// TODO: Separate in different tests
		it( "Resource.createFrom", ():void => {
			expect( Resource.createFrom ).toBeDefined();
			expect( Resource.createFrom ).toEqual( jasmine.any( Function ) );

			let simpleResource:Resource = Resource.createFrom( { $id: "http://example.com/simple-resource/" } );
			expect( simpleResource ).toBeTruthy();
			expect( Resource.isDecorated( simpleResource ) ).toBe( true );
			expect( simpleResource.$id ).toBe( "http://example.com/simple-resource/" );
			expect( simpleResource.types ).toEqual( jasmine.any( Array ) );
			expect( simpleResource.types.length ).toBe( 0 );

			interface MyResource extends BaseResource {
				myProperty:string;
			}

			let resource:Resource & MyResource;

			resource = Resource.createFrom<MyResource>( { myProperty: "a property" } );
			expect( resource ).toBeTruthy();
			expect( Resource.isDecorated( resource ) ).toBe( true );
			expect( resource.$id ).toBe( "" );
			expect( resource.types ).toEqual( jasmine.any( Array ) );
			expect( resource.types.length ).toBe( 0 );
			expect( resource.myProperty ).toBeDefined();
			expect( resource.myProperty ).toBe( "a property" );

			resource = Resource.createFrom<MyResource>( { myProperty: "a property", $id: "http://example.com/resource/" } );
			expect( resource ).toBeTruthy();
			expect( Resource.isDecorated( resource ) ).toBe( true );
			expect( resource.$id ).toBe( "http://example.com/resource/" );
			expect( resource.types ).toEqual( jasmine.any( Array ) );
			expect( resource.types.length ).toBe( 0 );
			expect( resource.myProperty ).toBeDefined();
			expect( resource.myProperty ).toBe( "a property" );

			resource = Resource.createFrom<MyResource>( { myProperty: "a property", $id: "http://example.com/resource/", types: [ LDP.RDFSource ] } );
			expect( resource ).toBeTruthy();
			expect( Resource.isDecorated( resource ) ).toBe( true );
			expect( resource.$id ).toBe( "http://example.com/resource/" );
			expect( resource.types ).toEqual( jasmine.any( Array ) );
			expect( resource.types.length ).toBe( 1 );
			expect( resource.types ).toEqual( [ LDP.RDFSource ] );
			expect( resource.myProperty ).toBeDefined();
			expect( resource.myProperty ).toBe( "a property" );

			resource = Resource.createFrom<MyResource>( { myProperty: "a property", $id: null, types: [ LDP.RDFSource, LDP.Container ] } );
			expect( resource ).toBeTruthy();
			expect( Resource.isDecorated( resource ) ).toBe( true );
			expect( resource.$id ).toBeNull();
			expect( resource.types ).toEqual( jasmine.any( Array ) );
			expect( resource.types.length ).toBe( 2 );
			expect( resource.types ).toEqual( [ LDP.RDFSource, LDP.Container ] );
			expect( resource.myProperty ).toBeDefined();
			expect( resource.myProperty ).toBe( "a property" );
		} );

		// TODO: Separate in different tests
		it( "Resource.decorate", ():void => {
			expect( Resource.decorate ).toBeDefined();
			expect( Resource.decorate ).toEqual( jasmine.any( Function ) );


			interface MyResource {
				myProperty?:string;
			}

			let resource:Resource & MyResource;

			resource = Resource.decorate<MyResource>( {} );
			expect( Resource.isDecorated( resource ) ).toBe( true );
			expect( resource.types ).toEqual( [] );

			resource = Resource.decorate<MyResource>( { myProperty: "a property" } );
			expect( Resource.isDecorated( resource ) ).toBe( true );
			expect( resource.myProperty ).toBeDefined();
			expect( resource.myProperty ).toBe( "a property" );
			expect( resource.types ).toEqual( [] );


			resource.types = [ LDP.RDFSource ];
			resource = Resource.decorate<MyResource>( resource );
			expect( resource.types ).toEqual( [ LDP.RDFSource ] );
		} );

		describe( "Decorated `Resource`", ():void => {

			let resource:Resource;
			beforeEach( ():void => {
				resource = Resource.create();

				const context:AbstractContext<any, any> = createMockContext();
				context.extendObjectSchema( {
					"@vocab": "http://example.com/ns#",
					"exTypes": "http://example.com/types#",
				} );

				resource.$registry = context.registry;
			} );

			describe( "Resource.addType", ():void => {

				it( "should exists", ():void => {
					expect( resource.$addType ).toBeDefined();
					expect( resource.$addType ).toEqual( jasmine.any( Function ) );
				} );

				it( "should add type", ():void => {
					resource.$addType( "http://example.com/types#Type-1" );
					expect( resource.types ).toEqual( [
						"http://example.com/types#Type-1",
					] );
				} );

				it( "should append type", ():void => {
					resource.types = [ "http://example.com/types#Type-1" ];

					resource.$addType( "http://example.com/types#Type-2" );
					expect( resource.types ).toEqual( [
						"http://example.com/types#Type-1",
						"http://example.com/types#Type-2",
					] );
				} );

				it( "should not add if type already exists", ():void => {
					resource.types = [
						"http://example.com/types#Type-1",
						"http://example.com/types#Type-2",
					];

					resource.$addType( "http://example.com/types#Type-1" );
					expect( resource.types ).toEqual( [
						"http://example.com/types#Type-1",
						"http://example.com/types#Type-2",
					] );
				} );

				it( "should add resolved type from prefixed provided", ():void => {
					resource.$addType( "exTypes:Type-1" );
					expect( resource.types ).toEqual( [
						"http://example.com/types#Type-1",
					] );
				} );

				it( "should add un-resolved type from prefixed provided when no registry", ():void => {
					delete resource.$registry;

					resource.$addType( "exTypes:Type-1" );
					expect( resource.types ).toEqual( [
						"exTypes:Type-1",
					] );
				} );

				it( "should add un-resolved type from prefixed provided when no registry's context", ():void => {
					resource.$registry = Registry.decorate( { __modelDecorator: Resource } );

					resource.$addType( "exTypes:Type-1" );
					expect( resource.types ).toEqual( [
						"exTypes:Type-1",
					] );
				} );

				it( "should add un-resolved type from prefixed provided when no $registry's context", ():void => {
					resource.$registry = Registry.decorate( { $id: "", $__modelDecorator: Resource } );

					resource.$addType( "exTypes:Type-1" );
					expect( resource.types ).toEqual( [
						"exTypes:Type-1",
					] );
				} );

				it( "should add resolved type from prefixed provided when parent from registry has a context", ():void => {
					resource.$registry = Registry.decorate( { registry: resource.$registry, __modelDecorator: Resource } );

					resource.$addType( "exTypes:Type-1" );
					expect( resource.types ).toEqual( [
						"http://example.com/types#Type-1",
					] );
				} );

				it( "should add resolved type from prefixed provided when parent from $registry has a context", ():void => {
					resource.$registry = Registry.decorate( { $id: "", $registry: resource.$registry, $__modelDecorator: Resource } );

					resource.$addType( "exTypes:Type-1" );
					expect( resource.types ).toEqual( [
						"http://example.com/types#Type-1",
					] );
				} );

				it( "should not add if already exists type when prefixed provided", ():void => {
					resource.types = [
						"http://example.com/types#Type-1",
						"http://example.com/types#Type-2",
					];

					resource.$addType( "exTypes:Type-1" );
					expect( resource.types ).toEqual( [
						"http://example.com/types#Type-1",
						"http://example.com/types#Type-2",
					] );
				} );

				it( "should add resolved type with @vocab from relative provided", ():void => {
					resource.$addType( "Type-1" );
					expect( resource.types ).toEqual( [
						"http://example.com/ns#Type-1",
					] );
				} );

				it( "should add un-resolved type from relative provided when no registry", ():void => {
					resource.$registry = void 0;

					resource.$addType( "Type-1" );
					expect( resource.types ).toEqual( [
						"Type-1",
					] );
				} );

				it( "should add un-resolved type from relative provided when no registry's context", ():void => {
					resource.$registry = Registry.decorate( { __modelDecorator: Resource } );

					resource.$addType( "Type-1" );
					expect( resource.types ).toEqual( [
						"Type-1",
					] );
				} );

				it( "should add un-resolved type from relative provided when no $registry's context", ():void => {
					resource.$registry = Registry.decorate( { $id: "", $__modelDecorator: Resource } );

					resource.$addType( "Type-1" );
					expect( resource.types ).toEqual( [
						"Type-1",
					] );
				} );

			} );

			describe( "Resource.hasType", ():void => {

				it( "should exists", ():void => {
					expect( resource.$hasType ).toBeDefined();
					expect( resource.$hasType ).toEqual( jasmine.any( Function ) );
				} );

				it( "should return false when non-existent type", ():void => {
					const returned:boolean = resource.$hasType( "http://example.com/types#Type-1" );
					expect( returned ).toEqual( false );
				} );

				it( "should return true when exists type", ():void => {
					resource.types = [ "http://example.com/types#Type-1" ];

					const returned:boolean = resource.$hasType( "http://example.com/types#Type-1" );
					expect( returned ).toEqual( true );
				} );

				it( "should return true when exists type with more", ():void => {
					resource.types = [
						"http://example.com/types#Type-1",
						"http://example.com/types#Type-2",
					];

					const returned:boolean = resource.$hasType( "http://example.com/types#Type-1" );
					expect( returned ).toEqual( true );
				} );

				it( "should return false when non-existent type from a prefixed one", ():void => {
					const returned:boolean = resource.$hasType( "exTypes:Type-1" );
					expect( returned ).toEqual( false );
				} );

				it( "should return true when type exists from a prefixed one", ():void => {
					resource.types = [
						"http://example.com/types#Type-1",
						"http://example.com/types#Type-2",
					];

					const returned:boolean = resource.$hasType( "exTypes:Type-1" );
					expect( returned ).toEqual( true );
				} );

				it( "should return true when type exists from relative one", ():void => {
					resource.types = [
						"http://example.com/ns#Type-1",
						"http://example.com/ns#Type-2",
					];

					const returned:boolean = resource.$hasType( "Type-1" );
					expect( returned ).toEqual( true );
				} );

			} );

			describe( "Resource.removeType", ():void => {

				it( "should exists", ():void => {
					expect( resource.$removeType ).toBeDefined();
					expect( resource.$removeType ).toEqual( jasmine.any( Function ) );
				} );

				it( "should remove type when exists", ():void => {
					resource.types = [
						"http://example.com/types#Type-1",
						"http://example.com/types#Type-2",
					];

					resource.$removeType( "http://example.com/types#Type-2" );
					expect( resource.types ).toEqual( [
						"http://example.com/types#Type-1",
					] );
				} );

				it( "should not remove type when non-existent", ():void => {
					resource.types = [
						"http://example.com/types#Type-1",
					];

					resource.$removeType( "http://example.com/types#Type-2" );
					expect( resource.types ).toEqual( [
						"http://example.com/types#Type-1",
					] );
				} );

				it( "should remove resolved prefixed type when exists", ():void => {
					resource.types = [
						"http://example.com/types#Type-1",
						"http://example.com/types#Type-2",
					];

					resource.$removeType( "exTypes:Type-2" );
					expect( resource.types ).toEqual( [
						"http://example.com/types#Type-1",
					] );
				} );

				it( "should not remove resolved prefixed type when non-existent", ():void => {
					resource.types = [
						"http://example.com/types#Type-1",
					];

					resource.$removeType( "exTypes:Type-2" );
					expect( resource.types ).toEqual( [
						"http://example.com/types#Type-1",
					] );
				} );

				it( "should not remove prefixed type when no registry", ():void => {
					resource.$registry = void 0;
					resource.types = [
						"http://example.com/types#Type-1",
					];

					resource.$removeType( "exTypes:Type-1" );
					expect( resource.types ).toEqual( [
						"http://example.com/types#Type-1",
					] );
				} );

				it( "should not remove prefixed type when no registry's context", ():void => {
					resource.$registry = Registry.decorate( { __modelDecorator: Resource } );

					resource.types = [
						"http://example.com/types#Type-1",
					];

					resource.$removeType( "exTypes:Type-1" );
					expect( resource.types ).toEqual( [
						"http://example.com/types#Type-1",
					] );
				} );

				it( "should not remove prefixed type when no $registry's context", ():void => {
					resource.$registry = Registry.decorate( { $id: "", $__modelDecorator: Resource } );

					resource.types = [
						"http://example.com/types#Type-1",
					];

					resource.$removeType( "exTypes:Type-1" );
					expect( resource.types ).toEqual( [
						"http://example.com/types#Type-1",
					] );
				} );

				it( "should remove resolved prefixed type when exists & registry parent has a context", ():void => {
					resource.$registry = Registry.decorate( { registry: resource.$registry, __modelDecorator: Resource } );

					resource.types = [
						"http://example.com/types#Type-1",
						"http://example.com/types#Type-2",
					];

					resource.$removeType( "exTypes:Type-2" );
					expect( resource.types ).toEqual( [
						"http://example.com/types#Type-1",
					] );
				} );

				it( "should remove resolved prefixed type when exists & $registry parent has a context", ():void => {
					resource.$registry = Registry.decorate( { $id: "", $registry: resource.$registry, $__modelDecorator: Resource } );

					resource.types = [
						"http://example.com/types#Type-1",
						"http://example.com/types#Type-2",
					];

					resource.$removeType( "exTypes:Type-2" );
					expect( resource.types ).toEqual( [
						"http://example.com/types#Type-1",
					] );
				} );

				it( "should remove resolved relative type when exists", ():void => {
					resource.types = [
						"http://example.com/ns#Type-1",
						"http://example.com/ns#Type-2",
					];

					resource.$removeType( "Type-2" );
					expect( resource.types ).toEqual( [
						"http://example.com/ns#Type-1",
					] );
				} );

				it( "should not remove resolved relative type when non-existent", ():void => {
					resource.types = [
						"http://example.com/ns#Type-1",
					];

					resource.$removeType( "Type-2" );
					expect( resource.types ).toEqual( [
						"http://example.com/ns#Type-1",
					] );
				} );

				it( "should not remove relative type when no registry", ():void => {
					resource.$registry = void 0;
					resource.types = [
						"http://example.com/ns#Type-1",
					];

					resource.$removeType( "Type-1" );
					expect( resource.types ).toEqual( [
						"http://example.com/ns#Type-1",
					] );
				} );

				it( "should not remove relative type when no registry's context", ():void => {
					resource.$registry = Registry.decorate( { __modelDecorator: Resource } );

					resource.types = [
						"http://example.com/ns#Type-1",
					];

					resource.$removeType( "Type-1" );
					expect( resource.types ).toEqual( [
						"http://example.com/ns#Type-1",
					] );
				} );

				it( "should not remove relative type when no $registry's context", ():void => {
					resource.$registry = Registry.decorate( { $id: "", $__modelDecorator: Resource } );

					resource.types = [
						"http://example.com/ns#Type-1",
					];

					resource.$removeType( "Type-1" );
					expect( resource.types ).toEqual( [
						"http://example.com/ns#Type-1",
					] );
				} );

			} );

		} );

	} );

} );
