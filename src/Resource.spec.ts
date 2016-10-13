import {
	INSTANCE,
	STATIC,

	OBLIGATORY,

	module,
	clazz,
	interfaze,
	decoratedObject,

	isDefined,
	hasMethod,
	hasProperty,
	extendsClass,
	hasDefaultExport,
} from "./test/JasmineExtender";
import * as NS from "./NS";
import * as Pointer from "./Pointer";
import * as Utils from "./Utils";

import * as Resource from "./Resource";
import DefaultExport from "./Resource";

describe( module( "Carbon/Resource" ), ():void => {

	it( isDefined(), ():void => {
		expect( Resource ).toBeDefined();
		expect( Utils.isObject( Resource ) ).toBe( true );
	} );

	describe( interfaze(
		"Carbon.Resource.Class",
		"Interface that represents a persisted blank node of a persisted document."
	), ():void => {

		it( extendsClass( "Carbon.Pointer.Class" ), ():void => {} );

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

	it( hasDefaultExport( "Carbon.Resource.Class" ), ():void => {
		let defaultExport:DefaultExport = <any> {};
		let defaultTarget:Resource.Class;

		defaultTarget = defaultExport;
		expect( defaultTarget ).toEqual( jasmine.any( Object ) );
	} );

	describe( clazz(
		"Carbon.Resource.Factory",
		"Factory class for `Carbon.Resource.Class` objects."
	), ():void => {

		it( isDefined(), ():void => {
			expect( Resource.Factory ).toBeDefined();
			expect( Utils.isFunction( Resource.Factory ) ).toBe( true );
		} );

		it( hasMethod(
			STATIC,
			"hasClassProperties",
			"Returns true if the object provided has the properties of a `Carbon.Resource.Class` object.", [
				{name: "object", type: "Object"},
			],
			{type: "boolean"}
		), ():void => {
			expect( Resource.Factory.hasClassProperties ).toBeDefined();
			expect( Utils.isFunction( Resource.Factory.hasClassProperties ) ).toBe( true );

			let object:any = undefined;
			expect( Resource.Factory.hasClassProperties( object ) ).toBe( false );
			object = {
				types: null,

				addType: ():void => {},
				hasType: ():void => {},
				removeType: ():void => {},
			};
			expect( Resource.Factory.hasClassProperties( object ) ).toBe( true );

			delete object.types;
			expect( Resource.Factory.hasClassProperties( object ) ).toBe( false );
			object.types = null;

			delete object.addType;
			expect( Resource.Factory.hasClassProperties( object ) ).toBe( false );
			object.addType = ():void => {};

			delete object.hasType;
			expect( Resource.Factory.hasClassProperties( object ) ).toBe( false );
			object.hasType = ():void => {};

			delete object.removeType;
			expect( Resource.Factory.hasClassProperties( object ) ).toBe( false );
			object.removeType = ():void => {};
		} );

		it( hasMethod(
			STATIC,
			"is",
			"Returns true if the object provided is considered a `Carbon.Resource.Class` object.", [
				{name: "resource", type: "Object"},
			],
			{type: "boolean"}
		), ():void => {
			let object:Object = undefined;
			expect( Resource.Factory.is( object ) ).toBe( false );

			object = {
				types: null,

				addType: ():void => {},
				hasType: ():void => {},
				removeType: ():void => {},
			};
			expect( Resource.Factory.is( object ) ).toBe( false );

			let resource:Pointer.Class = Pointer.Factory.decorate( object );
			expect( Resource.Factory.is( resource ) ).toBe( true );
		} );

		it( hasMethod(
			STATIC,
			"create",
			"Creates a Resource object with the id and types provided.", [
				{name: "id", type: "string", optional: true},
				{name: "types", type: "string[]", optional: true},
			],
			{type: "Carbon.Resource.Class"}
		), ():void => {
			expect( Resource.Factory.create ).toBeDefined();
			expect( Utils.isFunction( Resource.Factory.create ) ).toBe( true );

			let resource:Resource.Class;

			resource = Resource.Factory.create();
			expect( resource ).toBeTruthy();
			expect( Resource.Factory.hasClassProperties( resource ) ).toBe( true );
			expect( resource.id ).toBe( "" );
			expect( Utils.isArray( resource.types ) ).toBe( true );
			expect( resource.types.length ).toBe( 0 );

			resource = Resource.Factory.create( "http://example.com/resource/" );
			expect( resource ).toBeTruthy();
			expect( Resource.Factory.hasClassProperties( resource ) ).toBe( true );
			expect( resource.id ).toBe( "http://example.com/resource/" );
			expect( Utils.isArray( resource.types ) ).toBe( true );
			expect( resource.types.length ).toBe( 0 );

			resource = Resource.Factory.create( "http://example.com/resource/", [ NS.LDP.Class.RDFSource ] );
			expect( resource ).toBeTruthy();
			expect( Resource.Factory.hasClassProperties( resource ) ).toBe( true );
			expect( resource.id ).toBe( "http://example.com/resource/" );
			expect( Utils.isArray( resource.types ) ).toBe( true );
			expect( resource.types.length ).toBe( 1 );
			expect( resource.types ).toEqual( [ NS.LDP.Class.RDFSource ] );

			resource = Resource.Factory.create( null, [ NS.LDP.Class.RDFSource, NS.LDP.Class.Container ] );
			expect( resource ).toBeTruthy();
			expect( Resource.Factory.hasClassProperties( resource ) ).toBe( true );
			expect( resource.id ).toBe( "" );
			expect( Utils.isArray( resource.types ) ).toBe( true );
			expect( resource.types.length ).toBe( 2 );
			expect( resource.types ).toEqual( [ NS.LDP.Class.RDFSource, NS.LDP.Class.Container ] );
		} );

		it( hasMethod(
			STATIC,
			"createFrom",
			[ "T extends Object" ],
			"Creates a Resource object with the id and types provided.", [
				{name: "object", type: "T"},
				{name: "id", type: "string", optional: true},
				{name: "types", type: "string[]", optional: true},
			],
			{type: "T & Carbon.Resource.Class"}
		), ():void => {
			expect( Resource.Factory.createFrom ).toBeDefined();
			expect( Utils.isFunction( Resource.Factory.createFrom ) ).toBe( true );

			let simpleResource:Resource.Class = Resource.Factory.createFrom( {}, "http://example.com/simple-resource/" );
			expect( simpleResource ).toBeTruthy();
			expect( Resource.Factory.hasClassProperties( simpleResource ) ).toBe( true );
			expect( simpleResource.id ).toBe( "http://example.com/simple-resource/" );
			expect( Utils.isArray( simpleResource.types ) ).toBe( true );
			expect( simpleResource.types.length ).toBe( 0 );

			interface MyResource {
				myProperty:string;
			}
			let resource:Resource.Class & MyResource;

			resource = Resource.Factory.createFrom<MyResource>( {myProperty: "a property"} );
			expect( resource ).toBeTruthy();
			expect( Resource.Factory.hasClassProperties( resource ) ).toBe( true );
			expect( resource.id ).toBe( "" );
			expect( Utils.isArray( resource.types ) ).toBe( true );
			expect( resource.types.length ).toBe( 0 );
			expect( resource.myProperty ).toBeDefined();
			expect( resource.myProperty ).toBe( "a property" );

			resource = Resource.Factory.createFrom<MyResource>( {myProperty: "a property"}, "http://example.com/resource/" );
			expect( resource ).toBeTruthy();
			expect( Resource.Factory.hasClassProperties( resource ) ).toBe( true );
			expect( resource.id ).toBe( "http://example.com/resource/" );
			expect( Utils.isArray( resource.types ) ).toBe( true );
			expect( resource.types.length ).toBe( 0 );
			expect( resource.myProperty ).toBeDefined();
			expect( resource.myProperty ).toBe( "a property" );

			resource = Resource.Factory.createFrom<MyResource>( {myProperty: "a property"}, "http://example.com/resource/", [ NS.LDP.Class.RDFSource ] );
			expect( resource ).toBeTruthy();
			expect( Resource.Factory.hasClassProperties( resource ) ).toBe( true );
			expect( resource.id ).toBe( "http://example.com/resource/" );
			expect( Utils.isArray( resource.types ) ).toBe( true );
			expect( resource.types.length ).toBe( 1 );
			expect( resource.types ).toEqual( [ NS.LDP.Class.RDFSource ] );
			expect( resource.myProperty ).toBeDefined();
			expect( resource.myProperty ).toBe( "a property" );

			resource = Resource.Factory.createFrom<MyResource>( {myProperty: "a property"}, null, [ NS.LDP.Class.RDFSource, NS.LDP.Class.Container ] );
			expect( resource ).toBeTruthy();
			expect( Resource.Factory.hasClassProperties( resource ) ).toBe( true );
			expect( resource.id ).toBe( "" );
			expect( Utils.isArray( resource.types ) ).toBe( true );
			expect( resource.types.length ).toBe( 2 );
			expect( resource.types ).toEqual( [ NS.LDP.Class.RDFSource, NS.LDP.Class.Container ] );
			expect( resource.myProperty ).toBeDefined();
			expect( resource.myProperty ).toBe( "a property" );
		} );

		it( hasMethod(
			STATIC,
			"decorate",
			[ "T extends Object" ],
			"Decorates the object provided with the properties and methods of a `Carbon.Resource.Class` object.", [
				{name: "object", type: "T"},
			],
			{type: "T & Carbon.Resource.Class"}
		), ():void => {
			expect( Resource.Factory.decorate ).toBeDefined();
			expect( Utils.isFunction( Resource.Factory.decorate ) ).toBe( true );


			interface MyResource {
				myProperty?:string;
			}
			let resource:Resource.Class & MyResource;

			resource = Resource.Factory.decorate<MyResource>( {} );
			expect( Resource.Factory.hasClassProperties( resource ) ).toBe( true );
			expect( resource.types ).toEqual( [] );

			resource = Resource.Factory.decorate<MyResource>( {myProperty: "a property"} );
			expect( Resource.Factory.hasClassProperties( resource ) ).toBe( true );
			expect( resource.myProperty ).toBeDefined();
			expect( resource.myProperty ).toBe( "a property" );
			expect( resource.types ).toEqual( [] );


			resource.types = [ NS.LDP.Class.RDFSource ];
			resource = Resource.Factory.decorate<MyResource>( resource );
			expect( resource.types ).toEqual( [ NS.LDP.Class.RDFSource ] );
		} );

		describe( decoratedObject(
			"Object decorated by the `Carbon.Resource.Factory.decorate()` function.", [
				"Carbon.Resource.Class",
			]
		), ():void => {
			let resource:Resource.Class;

			beforeEach( ():void => {
				resource = Resource.Factory.create();
			} );

			it( hasMethod(
				INSTANCE,
				"addType",
				"Adds a type to the Resource.", [
					{name: "type", type: "string", description: "The type to be added."},
				]
			), ():void => {
				expect( resource.addType ).toBeDefined();
				expect( Utils.isFunction( resource.addType ) ).toBe( true );

				expect( resource.types.length ).toBe( 0 );

				resource.addType( "http://example.com/types#Type-1" );
				expect( resource.types.length ).toBe( 1 );
				expect( resource.types ).toContain( "http://example.com/types#Type-1" );

				resource.addType( "http://example.com/types#Type-2" );
				expect( resource.types.length ).toBe( 2 );
				expect( resource.types ).toContain( "http://example.com/types#Type-1" );
				expect( resource.types ).toContain( "http://example.com/types#Type-2" );
			} );

			it( hasMethod(
				INSTANCE,
				"hasType",
				"Returns true if the Resource contains the type specified.", [
					{name: "type", type: "string", description: "The type to look for."},
				]
			), ():void => {
				expect( resource.hasType ).toBeDefined();
				expect( Utils.isFunction( resource.hasType ) ).toBe( true );

				resource.types = [ "http://example.com/types#Type-1" ];
				expect( resource.hasType( "http://example.com/types#Type-1" ) ).toBe( true );
				expect( resource.hasType( "http://example.com/types#Type-2" ) ).toBe( false );


				resource.types = [ "http://example.com/types#Type-1", "http://example.com/types#Type-2" ];
				expect( resource.hasType( "http://example.com/types#Type-1" ) ).toBe( true );
				expect( resource.hasType( "http://example.com/types#Type-2" ) ).toBe( true );
				expect( resource.hasType( "http://example.com/types#Type-3" ) ).toBe( false );
			} );

			it( hasMethod(
				INSTANCE,
				"removeType",
				"Remove the type specified from the Resource.", [
					{name: "type", type: "string", description: "The type to be removed."},
				]
			), ():void => {
				expect( resource.removeType ).toBeDefined();
				expect( Utils.isFunction( resource.removeType ) ).toBe( true );

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

} );
