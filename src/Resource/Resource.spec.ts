import { createNonEnumerable } from "../../test/helpers/miscellaneous";
import { createMockContext } from "../../test/helpers/mocks/core";

import { AbstractContext } from "../Context/AbstractContext";

import { Pointer } from "../Pointer/Pointer";

import { Registry } from "../Registry/Registry";

import { LDP } from "../Vocabularies/LDP";

import { Resource, ResourceFactory } from "./Resource";


describe( "Resource", () => {

	it( "should exist", () => {
		expect( Resource ).toBeDefined();
		expect( Resource ).toEqual( jasmine.any( Object ) );
	} );


	describe( "[[interface impl]]", () => {

		let resource:Resource;
		beforeEach( () => {
			resource = Resource.create();

			const context:AbstractContext<any, any> = createMockContext();
			context.extendObjectSchema( {
				"@vocab": "http://example.com/ns#",
				"exTypes": "http://example.com/types#",
			} );

			resource.$registry = context.registry;
		} );

		describe( "Resource.addType", () => {

			it( "should exist", () => {
				expect( resource.$addType ).toBeDefined();
				expect( resource.$addType ).toEqual( jasmine.any( Function ) );
			} );

			it( "should add type", () => {
				resource.$addType( "http://example.com/types#Type-1" );
				expect( resource.types ).toEqual( [
					"http://example.com/types#Type-1",
				] );
			} );

			it( "should append type", () => {
				resource.types = [ "http://example.com/types#Type-1" ];

				resource.$addType( "http://example.com/types#Type-2" );
				expect( resource.types ).toEqual( [
					"http://example.com/types#Type-1",
					"http://example.com/types#Type-2",
				] );
			} );

			it( "should not add if type already exists", () => {
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

			it( "should add resolved type from prefixed provided", () => {
				resource.$addType( "exTypes:Type-1" );
				expect( resource.types ).toEqual( [
					"http://example.com/types#Type-1",
				] );
			} );

			it( "should add un-resolved type from prefixed provided when no registry", () => {
				delete resource.$registry;

				resource.$addType( "exTypes:Type-1" );
				expect( resource.types ).toEqual( [
					"exTypes:Type-1",
				] );
			} );

			it( "should add un-resolved type from prefixed provided when no registry's context", () => {
				resource.$registry = Registry.decorate( { __modelDecorator: Resource } );

				resource.$addType( "exTypes:Type-1" );
				expect( resource.types ).toEqual( [
					"exTypes:Type-1",
				] );
			} );

			it( "should add un-resolved type from prefixed provided when no $registry's context", () => {
				resource.$registry = Registry.decorate( { $id: "", $__modelDecorator: Resource } );

				resource.$addType( "exTypes:Type-1" );
				expect( resource.types ).toEqual( [
					"exTypes:Type-1",
				] );
			} );

			it( "should add resolved type from prefixed provided when parent from registry has a context", () => {
				resource.$registry = Registry.decorate( { registry: resource.$registry, __modelDecorator: Resource } );

				resource.$addType( "exTypes:Type-1" );
				expect( resource.types ).toEqual( [
					"http://example.com/types#Type-1",
				] );
			} );

			it( "should add resolved type from prefixed provided when parent from $registry has a context", () => {
				resource.$registry = Registry.decorate( { $id: "", $registry: resource.$registry, $__modelDecorator: Resource } );

				resource.$addType( "exTypes:Type-1" );
				expect( resource.types ).toEqual( [
					"http://example.com/types#Type-1",
				] );
			} );

			it( "should not add if already exists type when prefixed provided", () => {
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

			it( "should add resolved type with @vocab from relative provided", () => {
				resource.$addType( "Type-1" );
				expect( resource.types ).toEqual( [
					"http://example.com/ns#Type-1",
				] );
			} );

			it( "should add un-resolved type from relative provided when no registry", () => {
				resource.$registry = void 0;

				resource.$addType( "Type-1" );
				expect( resource.types ).toEqual( [
					"Type-1",
				] );
			} );

			it( "should add un-resolved type from relative provided when no registry's context", () => {
				resource.$registry = Registry.decorate( { __modelDecorator: Resource } );

				resource.$addType( "Type-1" );
				expect( resource.types ).toEqual( [
					"Type-1",
				] );
			} );

			it( "should add un-resolved type from relative provided when no $registry's context", () => {
				resource.$registry = Registry.decorate( { $id: "", $__modelDecorator: Resource } );

				resource.$addType( "Type-1" );
				expect( resource.types ).toEqual( [
					"Type-1",
				] );
			} );

		} );

		describe( "Resource.hasType", () => {

			it( "should exist", () => {
				expect( resource.$hasType ).toBeDefined();
				expect( resource.$hasType ).toEqual( jasmine.any( Function ) );
			} );

			it( "should return false when non-existent type", () => {
				const returned:boolean = resource.$hasType( "http://example.com/types#Type-1" );
				expect( returned ).toEqual( false );
			} );

			it( "should return true when exists type", () => {
				resource.types = [ "http://example.com/types#Type-1" ];

				const returned:boolean = resource.$hasType( "http://example.com/types#Type-1" );
				expect( returned ).toEqual( true );
			} );

			it( "should return true when exists type with more", () => {
				resource.types = [
					"http://example.com/types#Type-1",
					"http://example.com/types#Type-2",
				];

				const returned:boolean = resource.$hasType( "http://example.com/types#Type-1" );
				expect( returned ).toEqual( true );
			} );

			it( "should return false when non-existent type from a prefixed one", () => {
				const returned:boolean = resource.$hasType( "exTypes:Type-1" );
				expect( returned ).toEqual( false );
			} );

			it( "should return true when type exists from a prefixed one", () => {
				resource.types = [
					"http://example.com/types#Type-1",
					"http://example.com/types#Type-2",
				];

				const returned:boolean = resource.$hasType( "exTypes:Type-1" );
				expect( returned ).toEqual( true );
			} );

			it( "should return true when type exists from relative one", () => {
				resource.types = [
					"http://example.com/ns#Type-1",
					"http://example.com/ns#Type-2",
				];

				const returned:boolean = resource.$hasType( "Type-1" );
				expect( returned ).toEqual( true );
			} );

		} );

		describe( "Resource.removeType", () => {

			it( "should exist", () => {
				expect( resource.$removeType ).toBeDefined();
				expect( resource.$removeType ).toEqual( jasmine.any( Function ) );
			} );

			it( "should remove type when exists", () => {
				resource.types = [
					"http://example.com/types#Type-1",
					"http://example.com/types#Type-2",
				];

				resource.$removeType( "http://example.com/types#Type-2" );
				expect( resource.types ).toEqual( [
					"http://example.com/types#Type-1",
				] );
			} );

			it( "should not remove type when non-existent", () => {
				resource.types = [
					"http://example.com/types#Type-1",
				];

				resource.$removeType( "http://example.com/types#Type-2" );
				expect( resource.types ).toEqual( [
					"http://example.com/types#Type-1",
				] );
			} );

			it( "should remove resolved prefixed type when exists", () => {
				resource.types = [
					"http://example.com/types#Type-1",
					"http://example.com/types#Type-2",
				];

				resource.$removeType( "exTypes:Type-2" );
				expect( resource.types ).toEqual( [
					"http://example.com/types#Type-1",
				] );
			} );

			it( "should not remove resolved prefixed type when non-existent", () => {
				resource.types = [
					"http://example.com/types#Type-1",
				];

				resource.$removeType( "exTypes:Type-2" );
				expect( resource.types ).toEqual( [
					"http://example.com/types#Type-1",
				] );
			} );

			it( "should not remove prefixed type when no registry", () => {
				resource.$registry = void 0;
				resource.types = [
					"http://example.com/types#Type-1",
				];

				resource.$removeType( "exTypes:Type-1" );
				expect( resource.types ).toEqual( [
					"http://example.com/types#Type-1",
				] );
			} );

			it( "should not remove prefixed type when no registry's context", () => {
				resource.$registry = Registry.decorate( { __modelDecorator: Resource } );

				resource.types = [
					"http://example.com/types#Type-1",
				];

				resource.$removeType( "exTypes:Type-1" );
				expect( resource.types ).toEqual( [
					"http://example.com/types#Type-1",
				] );
			} );

			it( "should not remove prefixed type when no $registry's context", () => {
				resource.$registry = Registry.decorate( { $id: "", $__modelDecorator: Resource } );

				resource.types = [
					"http://example.com/types#Type-1",
				];

				resource.$removeType( "exTypes:Type-1" );
				expect( resource.types ).toEqual( [
					"http://example.com/types#Type-1",
				] );
			} );

			it( "should remove resolved prefixed type when exists & registry parent has a context", () => {
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

			it( "should remove resolved prefixed type when exists & $registry parent has a context", () => {
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

			it( "should remove resolved relative type when exists", () => {
				resource.types = [
					"http://example.com/ns#Type-1",
					"http://example.com/ns#Type-2",
				];

				resource.$removeType( "Type-2" );
				expect( resource.types ).toEqual( [
					"http://example.com/ns#Type-1",
				] );
			} );

			it( "should not remove resolved relative type when non-existent", () => {
				resource.types = [
					"http://example.com/ns#Type-1",
				];

				resource.$removeType( "Type-2" );
				expect( resource.types ).toEqual( [
					"http://example.com/ns#Type-1",
				] );
			} );

			it( "should not remove relative type when no registry", () => {
				resource.$registry = void 0;
				resource.types = [
					"http://example.com/ns#Type-1",
				];

				resource.$removeType( "Type-1" );
				expect( resource.types ).toEqual( [
					"http://example.com/ns#Type-1",
				] );
			} );

			it( "should not remove relative type when no registry's context", () => {
				resource.$registry = Registry.decorate( { __modelDecorator: Resource } );

				resource.types = [
					"http://example.com/ns#Type-1",
				];

				resource.$removeType( "Type-1" );
				expect( resource.types ).toEqual( [
					"http://example.com/ns#Type-1",
				] );
			} );

			it( "should not remove relative type when no $registry's context", () => {
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

		// TODO: Test .toJSON

	} );

	describe( "[[factory]]", () => {

		describe( "Resource.isDecorated", () => {

			it( "should exist", () => {
				expect( Resource.isDecorated ).toBeDefined();
				expect( Resource.isDecorated ).toEqual( jasmine.any( Function ) );
			} );


			let object:ResourceFactory[ "PROTOTYPE" ];
			beforeEach( () => {
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

		describe( "Resource.is", () => {

			it( "should return false when undefined", () => {
				expect( Resource.is( void 0 ) ).toBe( false );
			} );


			let object:ResourceFactory[ "PROTOTYPE" ];
			beforeEach( () => {
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

		describe( "Resource.create", () => {

			it( "should exist", () => {
				expect( Resource.create ).toBeDefined();
				expect( Resource.create ).toEqual( jasmine.any( Function ) );
			} );


			it( "should call .createFrom with empty when no provided", () => {
				const spy:jasmine.Spy = spyOn( Resource, "createFrom" )
					.and.callThrough();

				Resource.create();
				expect( spy ).toHaveBeenCalledWith( {} );
			} );

			it( "should call .createFrom with data provided", () => {
				const spy:jasmine.Spy = spyOn( Resource, "createFrom" )
					.and.callThrough();

				Resource.create( { the: "data" } );
				expect( spy ).toHaveBeenCalledWith( { the: "data" } );
			} );

			it( "should return different reference", () => {
				const object:object = {};
				const resource:Resource = Resource.create( object );

				expect( object ).not.toBe( resource );
			} );

		} );

		describe( "Resource.createFrom", () => {

			it( "should exist", () => {
				expect( Resource.createFrom ).toBeDefined();
				expect( Resource.createFrom ).toEqual( jasmine.any( Function ) );
			} );


			it( "should return empty resource when no parameters", () => {
				const resource:Resource = Resource.createFrom( {} );
				expect( resource ).toEqual( jasmine.objectContaining( {
					$id: "",
					types: [],
				} ) );
			} );

			it( "should return resource with $id when $id provided", () => {
				const resource:Resource = Resource.createFrom( { $id: "http://example.com/resource/" } );
				expect( resource ).toEqual( jasmine.objectContaining( {
					$id: "http://example.com/resource/",
					types: [],
				} ) );
			} );

			it( "should return resource with $id & types when $id & types provided", () => {
				const resource:Resource = Resource.createFrom( { $id: "http://example.com/resource/", types: [ LDP.RDFSource, LDP.Container ] } );
				expect( resource ).toEqual( jasmine.objectContaining( {
					$id: "http://example.com/resource/",
					types: [ LDP.RDFSource, LDP.Container ],
				} ) );
			} );

			it( "should return same reference", () => {
				const object:object = {};
				const resource:Resource = Resource.create( object );

				expect( object ).toBe( resource );
			} );

		} );

		describe( "Resource.decorate", () => {

			it( "should exist", () => {
				expect( Resource.decorate ).toBeDefined();
				expect( Resource.decorate ).toEqual( jasmine.any( Function ) );
			} );


			it( "should work with .isDecorated", () => {
				const resource:Resource = Resource.decorate( {} );
				expect( Resource.isDecorated( resource ) ).toBe( true );
			} );

			it( "should work with .isDecorated", () => {
				const resource:Resource = Resource.decorate( {} );
				expect( Resource.isDecorated( resource ) ).toBe( true );
			} );

			it( "should init types", () => {
				const resource:Resource = Resource.decorate( {} );
				expect( resource.types ).toEqual( [] );
			} );

			it( "should maintain types", () => {
				const resource:Resource = Resource.decorate( { types: [ LDP.RDFSource ] } );
				expect( resource.types ).toEqual( [ LDP.RDFSource ] );
			} );

		} );

	} );

} );
