import { Pointer } from "./Pointer";
import * as Module from "./Resource";
import DefaultExport, { Resource } from "./Resource";

import {
	extendsClass,
	hasDefaultExport,
	hasMethod,
	hasProperty,
	interfaze,
	isDefined,
	module,
	OBLIGATORY,
	property,
	STATIC,
} from "./test/JasmineExtender";

import { LDP } from "./Vocabularies/LDP";


describe( module( "carbonldp/Resource" ), ():void => {

	it( isDefined(), ():void => {
		expect( Module ).toBeDefined();
		expect( Module ).toEqual( jasmine.any( Object ) );
	} );

	describe( interfaze(
		"CarbonLDP.Resource.Resource",
		"Interface that represents a persisted blank node of a persisted document."
	), ():void => {

		it( extendsClass( "CarbonLDP.Pointer.Pointer" ), ():void => {} );

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
		"CarbonLDP.Resource.ResourceFactory",
		"Interface with the factory, decorate and utils methods of a `CarbonLDP.Resource.Resource` object."
	), ():void => {

		it( hasMethod(
			OBLIGATORY,
			"isDecorated",
			"Returns true if the object provided has the properties of a `CarbonLDP.Resource.Resource` object.", [
				{ name: "object", type: "object" },
			],
			{ type: "object is CarbonLDP.Resource.Resource" }
		), ():void => {} );

		it( hasMethod(
			OBLIGATORY,
			"is",
			"Returns true if the object provided is considered a `CarbonLDP.Resource.Resource` object.", [
				{ name: "object", type: "object" },
			],
			{ type: "object is CarbonLDP.Resource.Resource" }
		), ():void => {} );

		it( hasMethod(
			OBLIGATORY,
			"create",
			"Creates a Resource object with the id and types provided.", [
				{ name: "id", type: "string", optional: true },
				{ name: "types", type: "string[]", optional: true },
			],
			{ type: "CarbonLDP.Resource.Resource" }
		), ():void => {} );

		it( hasMethod(
			OBLIGATORY,
			"createFrom",
			[ "T extends object" ],
			"Creates a Resource object with the id and types provided.", [
				{ name: "object", type: "T" },
				{ name: "id", type: "string", optional: true },
				{ name: "types", type: "string[]", optional: true },
			],
			{ type: "T & CarbonLDP.Resource.Resource" }
		), ():void => {} );

		it( hasMethod(
			OBLIGATORY,
			"decorate",
			[ "T extends object" ],
			"Decorates the object provided with the properties and methods of a `CarbonLDP.Resource.Resource` object.", [
				{ name: "object", type: "T" },
			],
			{ type: "T & CarbonLDP.Resource.Resource" }
		), ():void => {} );

	} );

	it( hasDefaultExport( "CarbonLDP.Resource.Resource" ), ():void => {
		let defaultExport:DefaultExport = <any> {};
		let defaultTarget:Resource;

		defaultTarget = defaultExport;
		expect( defaultTarget ).toEqual( jasmine.any( Object ) );
	} );

	describe( property( STATIC, "Resource", "CarbonLDP.Resource.ResourceFactory", "Constant that implements the `CarbonLDP.Resource.ResourceFactory` interface." ), ():void => {

		it( isDefined(), ():void => {
			expect( Resource ).toBeDefined();
			expect( Resource ).toEqual( jasmine.any( Object ) );
		} );

		// TODO: Separate in different tests
		it( "Resource.isDecorated", ():void => {
			expect( Resource.isDecorated ).toBeDefined();
			expect( Resource.isDecorated ).toEqual( jasmine.any( Function ) );

			let object:any = undefined;
			expect( Resource.isDecorated( object ) ).toBe( false );
			object = {
				types: null,

				addType: ():void => {},
				hasType: ():void => {},
				removeType: ():void => {},
			};
			expect( Resource.isDecorated( object ) ).toBe( true );

			delete object.types;
			expect( Resource.isDecorated( object ) ).toBe( false );
			object.types = null;

			delete object.addType;
			expect( Resource.isDecorated( object ) ).toBe( false );
			object.addType = ():void => {};

			delete object.hasType;
			expect( Resource.isDecorated( object ) ).toBe( false );
			object.hasType = ():void => {};

			delete object.removeType;
			expect( Resource.isDecorated( object ) ).toBe( false );
			object.removeType = ():void => {};
		} );

		// TODO: Separate in different tests
		it( "Resource.is", ():void => {
			let object:Object = undefined;
			expect( Resource.is( object ) ).toBe( false );

			object = {
				types: null,

				addType: ():void => {},
				hasType: ():void => {},
				removeType: ():void => {},
			};
			expect( Resource.is( object ) ).toBe( false );

			let resource:Pointer = Pointer.decorate( object );
			expect( Resource.is( resource ) ).toBe( true );
		} );

		// TODO: Separate in different tests
		it( "Resource.create", ():void => {
			expect( Resource.create ).toBeDefined();
			expect( Resource.create ).toEqual( jasmine.any( Function ) );

			let resource:Resource;

			resource = Resource.create();
			expect( resource ).toBeTruthy();
			expect( Resource.isDecorated( resource ) ).toBe( true );
			expect( resource.id ).toBe( "" );
			expect( resource.types ).toEqual( jasmine.any( Array ) );
			expect( resource.types.length ).toBe( 0 );

			resource = Resource.create( "http://example.com/resource/" );
			expect( resource ).toBeTruthy();
			expect( Resource.isDecorated( resource ) ).toBe( true );
			expect( resource.id ).toBe( "http://example.com/resource/" );
			expect( resource.types ).toEqual( jasmine.any( Array ) );
			expect( resource.types.length ).toBe( 0 );

			resource = Resource.create( "http://example.com/resource/", [ LDP.RDFSource ] );
			expect( resource ).toBeTruthy();
			expect( Resource.isDecorated( resource ) ).toBe( true );
			expect( resource.id ).toBe( "http://example.com/resource/" );
			expect( resource.types ).toEqual( jasmine.any( Array ) );
			expect( resource.types.length ).toBe( 1 );
			expect( resource.types ).toEqual( [ LDP.RDFSource ] );

			resource = Resource.create( null, [ LDP.RDFSource, LDP.Container ] );
			expect( resource ).toBeTruthy();
			expect( Resource.isDecorated( resource ) ).toBe( true );
			expect( resource.id ).toBe( "" );
			expect( resource.types ).toEqual( jasmine.any( Array ) );
			expect( resource.types.length ).toBe( 2 );
			expect( resource.types ).toEqual( [ LDP.RDFSource, LDP.Container ] );
		} );

		// TODO: Separate in different tests
		it( "Resource.createFrom", ():void => {
			expect( Resource.createFrom ).toBeDefined();
			expect( Resource.createFrom ).toEqual( jasmine.any( Function ) );

			let simpleResource:Resource = Resource.createFrom( {}, "http://example.com/simple-resource/" );
			expect( simpleResource ).toBeTruthy();
			expect( Resource.isDecorated( simpleResource ) ).toBe( true );
			expect( simpleResource.id ).toBe( "http://example.com/simple-resource/" );
			expect( simpleResource.types ).toEqual( jasmine.any( Array ) );
			expect( simpleResource.types.length ).toBe( 0 );

			interface MyResource {
				myProperty:string;
			}

			let resource:Resource & MyResource;

			resource = Resource.createFrom<MyResource>( { myProperty: "a property" } );
			expect( resource ).toBeTruthy();
			expect( Resource.isDecorated( resource ) ).toBe( true );
			expect( resource.id ).toBe( "" );
			expect( resource.types ).toEqual( jasmine.any( Array ) );
			expect( resource.types.length ).toBe( 0 );
			expect( resource.myProperty ).toBeDefined();
			expect( resource.myProperty ).toBe( "a property" );

			resource = Resource.createFrom<MyResource>( { myProperty: "a property" }, "http://example.com/resource/" );
			expect( resource ).toBeTruthy();
			expect( Resource.isDecorated( resource ) ).toBe( true );
			expect( resource.id ).toBe( "http://example.com/resource/" );
			expect( resource.types ).toEqual( jasmine.any( Array ) );
			expect( resource.types.length ).toBe( 0 );
			expect( resource.myProperty ).toBeDefined();
			expect( resource.myProperty ).toBe( "a property" );

			resource = Resource.createFrom<MyResource>( { myProperty: "a property" }, "http://example.com/resource/", [ LDP.RDFSource ] );
			expect( resource ).toBeTruthy();
			expect( Resource.isDecorated( resource ) ).toBe( true );
			expect( resource.id ).toBe( "http://example.com/resource/" );
			expect( resource.types ).toEqual( jasmine.any( Array ) );
			expect( resource.types.length ).toBe( 1 );
			expect( resource.types ).toEqual( [ LDP.RDFSource ] );
			expect( resource.myProperty ).toBeDefined();
			expect( resource.myProperty ).toBe( "a property" );

			resource = Resource.createFrom<MyResource>( { myProperty: "a property" }, null, [ LDP.RDFSource, LDP.Container ] );
			expect( resource ).toBeTruthy();
			expect( Resource.isDecorated( resource ) ).toBe( true );
			expect( resource.id ).toBe( "" );
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
			} );

			// TODO: Separate in different tests
			it( "Resource.addType", ():void => {
				expect( resource.addType ).toBeDefined();
				expect( resource.addType ).toEqual( jasmine.any( Function ) );

				expect( resource.types.length ).toBe( 0 );

				resource.addType( "http://example.com/types#Type-1" );
				expect( resource.types.length ).toBe( 1 );
				expect( resource.types ).toContain( "http://example.com/types#Type-1" );

				resource.addType( "http://example.com/types#Type-2" );
				expect( resource.types.length ).toBe( 2 );
				expect( resource.types ).toContain( "http://example.com/types#Type-1" );
				expect( resource.types ).toContain( "http://example.com/types#Type-2" );
			} );

			// TODO: Separate in different tests
			it( "Resource.hasType", ():void => {
				expect( resource.hasType ).toBeDefined();
				expect( resource.hasType ).toEqual( jasmine.any( Function ) );

				resource.types = [ "http://example.com/types#Type-1" ];
				expect( resource.hasType( "http://example.com/types#Type-1" ) ).toBe( true );
				expect( resource.hasType( "http://example.com/types#Type-2" ) ).toBe( false );


				resource.types = [ "http://example.com/types#Type-1", "http://example.com/types#Type-2" ];
				expect( resource.hasType( "http://example.com/types#Type-1" ) ).toBe( true );
				expect( resource.hasType( "http://example.com/types#Type-2" ) ).toBe( true );
				expect( resource.hasType( "http://example.com/types#Type-3" ) ).toBe( false );
			} );

			// TODO: Separate in different tests
			it( "Resource.removeType", ():void => {
				expect( resource.removeType ).toBeDefined();
				expect( resource.removeType ).toEqual( jasmine.any( Function ) );

				resource.types = [ "http://example.com/types#Type-1" ];
				resource.removeType( "http://example.com/types#Type-2" );
				expect( resource.types.length ).toBe( 1 );
				expect( resource.types ).toContain( "http://example.com/types#Type-1" );

				resource.types = [ "http://example.com/types#Type-1" ];
				resource.removeType( "http://example.com/types#Type-1" );
				expect( resource.types.length ).toBe( 0 );
				expect( resource.types ).not.toContain( "http://example.com/types#Type-1" );

				resource.types = [ "http://example.com/types#Type-1", "http://example.com/types#Type-2" ];
				resource.removeType( "http://example.com/types#Type-1" );
				expect( resource.types.length ).toBe( 1 );
				expect( resource.types ).not.toContain( "http://example.com/types#Type-1" );
				expect( resource.types ).toContain( "http://example.com/types#Type-2" );
				resource.removeType( "http://example.com/types#Type-2" );
				expect( resource.types.length ).toBe( 0 );
				expect( resource.types ).not.toContain( "http://example.com/types#Type-1" );
				expect( resource.types ).not.toContain( "http://example.com/types#Type-2" );
			} );

		} );

	} );

} )
;
