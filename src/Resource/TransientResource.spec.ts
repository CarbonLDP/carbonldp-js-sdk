import { createMockContext } from "../../test/helpers/mocks";
import { AbstractContext } from "../Context/AbstractContext";
import { Pointer } from "../Pointer";
import { RegistryService } from "../Registry";
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
import { LDP } from "../Vocabularies";
import { BaseResource } from "./BaseResource";

import { TransientResource } from "./TransientResource";


describe( module( "carbonldp/Resource" ), ():void => {

	describe( interfaze(
		"CarbonLDP.TransientResource",
		"Interface that represents a persisted blank node of a persisted document."
	), ():void => {

		it( extendsClass( "CarbonLDP.Pointer" ), ():void => {} );

		it( hasProperty(
			OBLIGATORY,
			"types",
			"string",
			"An array with the types of the resource."
		), ():void => {} );

		it( hasMethod(
			OBLIGATORY,
			"addType",
			"Adds a type to the current resource.", [
				{ name: "type", type: "string", description: "The type to be added." },
			]
		), ():void => {} );

		it( hasMethod(
			OBLIGATORY,
			"hasType",
			"Returns true if the current resource contains the type specified.", [
				{ name: "type", type: "string", description: "The type to look for." },
			]
		), ():void => {} );

		it( hasMethod(
			OBLIGATORY,
			"removeType",
			"Remove the type specified from the current resource.", [
				{ name: "type", type: "string", description: "The type to be removed." },
			]
		), ():void => {} );

	} );

	describe( interfaze(
		"CarbonLDP.TransientResourceFactory",
		"Interface with the factory, decorate and utils methods of a `CarbonLDP.TransientResource` object."
	), ():void => {

		it( hasMethod(
			OBLIGATORY,
			"isDecorated",
			"Returns true if the object provided has the properties of a `CarbonLDP.TransientResource` object.", [
				{ name: "object", type: "object" },
			],
			{ type: "object is CarbonLDP.TransientResource" }
		), ():void => {} );

		it( hasMethod(
			OBLIGATORY,
			"is",
			"Returns true if the object provided is considered a `CarbonLDP.TransientResource` object.", [
				{ name: "object", type: "object" },
			],
			{ type: "object is CarbonLDP.TransientResource" }
		), ():void => {} );

		it( hasMethod(
			OBLIGATORY,
			"create",
			[ "T extends object" ],
			"Creates a Resource object with the id and types provided.", [
				{ name: "data", type: "T & CarbonLDP.BaseResource", description: "Data to be used in the creation of the resource." },
			],
			{ type: "CarbonLDP.TransientResource" }
		), ():void => {} );

		it( hasMethod(
			OBLIGATORY,
			"createFrom",
			[ "T extends object" ],
			"Creates a Resource object with the id and types provided.", [
				{ name: "object", type: "T & CarbonLDP.BaseResource", description: "Object that will be converted into a resource." },
			],
			{ type: "T & CarbonLDP.TransientResource" }
		), ():void => {} );

		it( hasMethod(
			OBLIGATORY,
			"decorate",
			[ "T extends object" ],
			"Decorates the object provided with the properties and methods of a `CarbonLDP.TransientResource` object.", [
				{ name: "object", type: "T" },
			],
			{ type: "T & CarbonLDP.TransientResource" }
		), ():void => {} );

	} );

	describe( property( STATIC, "TransientResource", "CarbonLDP.TransientResourceFactory", "Constant that implements the `CarbonLDP.TransientResourceFactory` interface." ), ():void => {

		it( isDefined(), ():void => {
			expect( TransientResource ).toBeDefined();
			expect( TransientResource ).toEqual( jasmine.any( Object ) );
		} );

		// TODO: Separate in different tests
		it( "TransientResource.isDecorated", ():void => {
			expect( TransientResource.isDecorated ).toBeDefined();
			expect( TransientResource.isDecorated ).toEqual( jasmine.any( Function ) );

			let object:any = undefined;
			expect( TransientResource.isDecorated( object ) ).toBe( false );
			object = {
				types: null,

				addType: ():void => {},
				hasType: ():void => {},
				removeType: ():void => {},
			};
			expect( TransientResource.isDecorated( object ) ).toBe( true );

			delete object.types;
			expect( TransientResource.isDecorated( object ) ).toBe( false );
			object.types = null;

			delete object.addType;
			expect( TransientResource.isDecorated( object ) ).toBe( false );
			object.addType = ():void => {};

			delete object.hasType;
			expect( TransientResource.isDecorated( object ) ).toBe( false );
			object.hasType = ():void => {};

			delete object.removeType;
			expect( TransientResource.isDecorated( object ) ).toBe( false );
			object.removeType = ():void => {};
		} );

		// TODO: Separate in different tests
		it( "TransientResource.is", ():void => {
			let object:Object = undefined;
			expect( TransientResource.is( object ) ).toBe( false );

			object = {
				types: null,

				addType: ():void => {},
				hasType: ():void => {},
				removeType: ():void => {},
			};
			expect( TransientResource.is( object ) ).toBe( false );

			let resource:Pointer = Pointer.decorate( object );
			expect( TransientResource.is( resource ) ).toBe( true );
		} );

		// TODO: Separate in different tests
		it( "TransientResource.create", ():void => {
			expect( TransientResource.create ).toBeDefined();
			expect( TransientResource.create ).toEqual( jasmine.any( Function ) );

			let resource:TransientResource;

			resource = TransientResource.create();
			expect( resource ).toBeTruthy();
			expect( TransientResource.isDecorated( resource ) ).toBe( true );
			expect( resource.$id ).toBe( "" );
			expect( resource.types ).toEqual( jasmine.any( Array ) );
			expect( resource.types.length ).toBe( 0 );

			resource = TransientResource.create( { $id: "http://example.com/resource/" } );
			expect( resource ).toBeTruthy();
			expect( TransientResource.isDecorated( resource ) ).toBe( true );
			expect( resource.$id ).toBe( "http://example.com/resource/" );
			expect( resource.types ).toEqual( jasmine.any( Array ) );
			expect( resource.types.length ).toBe( 0 );

			resource = TransientResource.create( { $id: "http://example.com/resource/", types: [ LDP.RDFSource ] } );
			expect( resource ).toBeTruthy();
			expect( TransientResource.isDecorated( resource ) ).toBe( true );
			expect( resource.$id ).toBe( "http://example.com/resource/" );
			expect( resource.types ).toEqual( jasmine.any( Array ) );
			expect( resource.types.length ).toBe( 1 );
			expect( resource.types ).toEqual( [ LDP.RDFSource ] );

			resource = TransientResource.create( { $id: null, types: [ LDP.RDFSource, LDP.Container ] } );
			expect( resource ).toBeTruthy();
			expect( TransientResource.isDecorated( resource ) ).toBe( true );
			expect( resource.$id ).toBe( "" );
			expect( resource.types ).toEqual( jasmine.any( Array ) );
			expect( resource.types.length ).toBe( 2 );
			expect( resource.types ).toEqual( [ LDP.RDFSource, LDP.Container ] );
		} );

		// TODO: Separate in different tests
		it( "TransientResource.createFrom", ():void => {
			expect( TransientResource.createFrom ).toBeDefined();
			expect( TransientResource.createFrom ).toEqual( jasmine.any( Function ) );

			let simpleResource:TransientResource = TransientResource.createFrom( { $id: "http://example.com/simple-resource/" } );
			expect( simpleResource ).toBeTruthy();
			expect( TransientResource.isDecorated( simpleResource ) ).toBe( true );
			expect( simpleResource.$id ).toBe( "http://example.com/simple-resource/" );
			expect( simpleResource.types ).toEqual( jasmine.any( Array ) );
			expect( simpleResource.types.length ).toBe( 0 );

			interface MyResource extends BaseResource {
				myProperty:string;
			}

			let resource:TransientResource & MyResource;

			resource = TransientResource.createFrom<MyResource>( { myProperty: "a property" } );
			expect( resource ).toBeTruthy();
			expect( TransientResource.isDecorated( resource ) ).toBe( true );
			expect( resource.$id ).toBe( "" );
			expect( resource.types ).toEqual( jasmine.any( Array ) );
			expect( resource.types.length ).toBe( 0 );
			expect( resource.myProperty ).toBeDefined();
			expect( resource.myProperty ).toBe( "a property" );

			resource = TransientResource.createFrom<MyResource>( { myProperty: "a property", $id: "http://example.com/resource/" } );
			expect( resource ).toBeTruthy();
			expect( TransientResource.isDecorated( resource ) ).toBe( true );
			expect( resource.$id ).toBe( "http://example.com/resource/" );
			expect( resource.types ).toEqual( jasmine.any( Array ) );
			expect( resource.types.length ).toBe( 0 );
			expect( resource.myProperty ).toBeDefined();
			expect( resource.myProperty ).toBe( "a property" );

			resource = TransientResource.createFrom<MyResource>( { myProperty: "a property", $id: "http://example.com/resource/", types: [ LDP.RDFSource ] } );
			expect( resource ).toBeTruthy();
			expect( TransientResource.isDecorated( resource ) ).toBe( true );
			expect( resource.$id ).toBe( "http://example.com/resource/" );
			expect( resource.types ).toEqual( jasmine.any( Array ) );
			expect( resource.types.length ).toBe( 1 );
			expect( resource.types ).toEqual( [ LDP.RDFSource ] );
			expect( resource.myProperty ).toBeDefined();
			expect( resource.myProperty ).toBe( "a property" );

			resource = TransientResource.createFrom<MyResource>( { myProperty: "a property", $id: null, types: [ LDP.RDFSource, LDP.Container ] } );
			expect( resource ).toBeTruthy();
			expect( TransientResource.isDecorated( resource ) ).toBe( true );
			expect( resource.$id ).toBe( "" );
			expect( resource.types ).toEqual( jasmine.any( Array ) );
			expect( resource.types.length ).toBe( 2 );
			expect( resource.types ).toEqual( [ LDP.RDFSource, LDP.Container ] );
			expect( resource.myProperty ).toBeDefined();
			expect( resource.myProperty ).toBe( "a property" );
		} );

		// TODO: Separate in different tests
		it( "TransientResource.decorate", ():void => {
			expect( TransientResource.decorate ).toBeDefined();
			expect( TransientResource.decorate ).toEqual( jasmine.any( Function ) );


			interface MyResource {
				myProperty?:string;
			}

			let resource:TransientResource & MyResource;

			resource = TransientResource.decorate<MyResource>( {} );
			expect( TransientResource.isDecorated( resource ) ).toBe( true );
			expect( resource.types ).toEqual( [] );

			resource = TransientResource.decorate<MyResource>( { myProperty: "a property" } );
			expect( TransientResource.isDecorated( resource ) ).toBe( true );
			expect( resource.myProperty ).toBeDefined();
			expect( resource.myProperty ).toBe( "a property" );
			expect( resource.types ).toEqual( [] );


			resource.types = [ LDP.RDFSource ];
			resource = TransientResource.decorate<MyResource>( resource );
			expect( resource.types ).toEqual( [ LDP.RDFSource ] );
		} );

		describe( "Decorated `Resource`", ():void => {

			let resource:TransientResource;
			beforeEach( ():void => {
				resource = TransientResource.create();

				const context:AbstractContext<any, any> = createMockContext();
				context.extendObjectSchema( {
					"@vocab": "http://example.com/ns#",
					"exTypes": "http://example.com/types#",
				} );

				resource._registry = context.registry;
			} );

			describe( "TransientResource.addType", ():void => {

				it( "should exists", ():void => {
					expect( resource.addType ).toBeDefined();
					expect( resource.addType ).toEqual( jasmine.any( Function ) );
				} );

				it( "should add type", ():void => {
					resource.addType( "http://example.com/types#Type-1" );
					expect( resource.types ).toEqual( [
						"http://example.com/types#Type-1",
					] );
				} );

				it( "should append type", ():void => {
					resource.types = [ "http://example.com/types#Type-1" ];

					resource.addType( "http://example.com/types#Type-2" );
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

					resource.addType( "http://example.com/types#Type-1" );
					expect( resource.types ).toEqual( [
						"http://example.com/types#Type-1",
						"http://example.com/types#Type-2",
					] );
				} );

				it( "should add resolved type from prefixed provided", ():void => {
					resource.addType( "exTypes:Type-1" );
					expect( resource.types ).toEqual( [
						"http://example.com/types#Type-1",
					] );
				} );

				it( "should add un-resolved type from prefixed provided when no registry", ():void => {
					delete resource._registry;

					resource.addType( "exTypes:Type-1" );
					expect( resource.types ).toEqual( [
						"exTypes:Type-1",
					] );
				} );

				it( "should add un-resolved type from prefixed provided when no registry's context", ():void => {
					resource._registry = new RegistryService( TransientResource );

					resource.addType( "exTypes:Type-1" );
					expect( resource.types ).toEqual( [
						"exTypes:Type-1",
					] );
				} );

				it( "should not add if already exists type when prefixed provided", ():void => {
					resource.types = [
						"http://example.com/types#Type-1",
						"http://example.com/types#Type-2",
					];

					resource.addType( "exTypes:Type-1" );
					expect( resource.types ).toEqual( [
						"http://example.com/types#Type-1",
						"http://example.com/types#Type-2",
					] );
				} );

				it( "should add resolved type with @vocab from relative provided", ():void => {
					resource.addType( "Type-1" );
					expect( resource.types ).toEqual( [
						"http://example.com/ns#Type-1",
					] );
				} );

				it( "should add un-resolved type from relative provided when no registry", ():void => {
					delete resource._registry;

					resource.addType( "Type-1" );
					expect( resource.types ).toEqual( [
						"Type-1",
					] );
				} );

				it( "should add un-resolved type from relative provided when no registry's context", ():void => {
					resource._registry = new RegistryService( TransientResource );

					resource.addType( "Type-1" );
					expect( resource.types ).toEqual( [
						"Type-1",
					] );
				} );

			} );

			describe( "TransientResource.hasType", ():void => {

				it( "should exists", ():void => {
					expect( resource.hasType ).toBeDefined();
					expect( resource.hasType ).toEqual( jasmine.any( Function ) );
				} );

				it( "should return false when non-existent type", ():void => {
					const returned:boolean = resource.hasType( "http://example.com/types#Type-1" );
					expect( returned ).toEqual( false );
				} );

				it( "should return true when exists type", ():void => {
					resource.types = [ "http://example.com/types#Type-1" ];

					const returned:boolean = resource.hasType( "http://example.com/types#Type-1" );
					expect( returned ).toEqual( true );
				} );

				it( "should return true when exists type with more", ():void => {
					resource.types = [
						"http://example.com/types#Type-1",
						"http://example.com/types#Type-2",
					];

					const returned:boolean = resource.hasType( "http://example.com/types#Type-1" );
					expect( returned ).toEqual( true );
				} );

				it( "should return false when non-existent type from a prefixed one", ():void => {
					const returned:boolean = resource.hasType( "exTypes:Type-1" );
					expect( returned ).toEqual( false );
				} );

				it( "should return true when type exists from a prefixed one", ():void => {
					resource.types = [
						"http://example.com/types#Type-1",
						"http://example.com/types#Type-2",
					];

					const returned:boolean = resource.hasType( "exTypes:Type-1" );
					expect( returned ).toEqual( true );
				} );

				it( "should return true when type exists from relative one", ():void => {
					resource.types = [
						"http://example.com/ns#Type-1",
						"http://example.com/ns#Type-2",
					];

					const returned:boolean = resource.hasType( "Type-1" );
					expect( returned ).toEqual( true );
				} );

			} );

			describe( "TransientResource.removeType", ():void => {

				it( "should exists", ():void => {
					expect( resource.removeType ).toBeDefined();
					expect( resource.removeType ).toEqual( jasmine.any( Function ) );
				} );

				it( "should remove type when exists", ():void => {
					resource.types = [
						"http://example.com/types#Type-1",
						"http://example.com/types#Type-2",
					];

					resource.removeType( "http://example.com/types#Type-2" );
					expect( resource.types ).toEqual( [
						"http://example.com/types#Type-1",
					] );
				} );

				it( "should not remove type when non-existent", ():void => {
					resource.types = [
						"http://example.com/types#Type-1",
					];

					resource.removeType( "http://example.com/types#Type-2" );
					expect( resource.types ).toEqual( [
						"http://example.com/types#Type-1",
					] );
				} );

				it( "should remove resolved prefixed type when exists", ():void => {
					resource.types = [
						"http://example.com/types#Type-1",
						"http://example.com/types#Type-2",
					];

					resource.removeType( "exTypes:Type-2" );
					expect( resource.types ).toEqual( [
						"http://example.com/types#Type-1",
					] );
				} );

				it( "should not remove resolved prefixed type when non-existent", ():void => {
					resource.types = [
						"http://example.com/types#Type-1",
					];

					resource.removeType( "exTypes:Type-2" );
					expect( resource.types ).toEqual( [
						"http://example.com/types#Type-1",
					] );
				} );

				it( "should not remove prefixed type when no registry", ():void => {
					delete resource._registry;
					resource.types = [
						"http://example.com/types#Type-1",
					];

					resource.removeType( "exTypes:Type-1" );
					expect( resource.types ).toEqual( [
						"http://example.com/types#Type-1",
					] );
				} );

				it( "should not remove prefixed type when no registry's context", ():void => {
					resource._registry = new RegistryService( TransientResource );

					resource.types = [
						"http://example.com/types#Type-1",
					];

					resource.removeType( "exTypes:Type-1" );
					expect( resource.types ).toEqual( [
						"http://example.com/types#Type-1",
					] );
				} );

				it( "should remove resolved relative type when exists", ():void => {
					resource.types = [
						"http://example.com/ns#Type-1",
						"http://example.com/ns#Type-2",
					];

					resource.removeType( "Type-2" );
					expect( resource.types ).toEqual( [
						"http://example.com/ns#Type-1",
					] );
				} );

				it( "should not remove resolved relative type when non-existent", ():void => {
					resource.types = [
						"http://example.com/ns#Type-1",
					];

					resource.removeType( "Type-2" );
					expect( resource.types ).toEqual( [
						"http://example.com/ns#Type-1",
					] );
				} );

				it( "should not remove relative type when no registry", ():void => {
					delete resource._registry;
					resource.types = [
						"http://example.com/ns#Type-1",
					];

					resource.removeType( "Type-1" );
					expect( resource.types ).toEqual( [
						"http://example.com/ns#Type-1",
					] );
				} );

				it( "should not remove relative type when no registry's context", ():void => {
					resource._registry = new RegistryService( TransientResource );

					resource.types = [
						"http://example.com/ns#Type-1",
					];

					resource.removeType( "Type-1" );
					expect( resource.types ).toEqual( [
						"http://example.com/ns#Type-1",
					] );
				} );

			} );

		} );

	} );

} )
;
