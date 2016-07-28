import {
	STATIC,

	module,
	clazz,

	isDefined,
	hasMethod
} from "./test/JasmineExtender";
import * as NS from "./NS";
import * as Pointer from "./Pointer";
import * as Utils from "./Utils";

import * as Resource from "./Resource";

describe( module( "Carbon/Resource" ), ():void => {

	it( isDefined(), ():void => {
		expect( Resource ).toBeDefined();
		expect( Utils.isObject( Resource ) ).toBe( true );
	} );

	describe( clazz(
		"Carbon.Resource.Factory",
		"Factory class for Resource objects."
	), ():void => {

		it( isDefined(), ():void => {
			expect( Resource.Factory ).toBeDefined();
			expect( Utils.isFunction( Resource.Factory ) ).toBe( true );
		} );

		it( hasMethod(
			STATIC,
			"hasClassProperties",
			"Returns true if the object provided has the properties and functions of a Resource object", [
				{name: "resource", type: "Object"}
			],
			{type: "boolean"}
		), ():void => {
			expect( Resource.Factory.hasClassProperties ).toBeDefined();
			expect( Utils.isFunction( Resource.Factory.hasClassProperties ) ).toBe( true );

			let resource:any = undefined;
			expect( Resource.Factory.hasClassProperties( resource ) ).toBe( false );
			resource = {
				types: null,
			};
			expect( Resource.Factory.hasClassProperties( resource ) ).toBe( true );

			delete resource.types;
			expect( Resource.Factory.hasClassProperties( resource ) ).toBe( false );
			resource.types = null;
		} );

		it( hasMethod(
			STATIC,
			"is",
			"Returns true if the object is a `Carbon.Resource.Class` (by duck type)", [
				{name: "resource", type: "Object"}
			],
			{type: "boolean"}
		), ():void => {
			let object:Object = undefined;
			expect( Resource.Factory.is( object ) ).toBe( false );
			object = {};
			expect( Resource.Factory.is( object ) ).toBe( false );
			object[ "types" ] = null;
			expect( Resource.Factory.is( object ) ).toBe( false );

			let resource = Pointer.Factory.decorate( object );
			expect( Resource.Factory.is( resource ) ).toBe( true );

			resource = Pointer.Factory.create();
			resource[ "types" ] = null;
			expect( Resource.Factory.is( resource ) ).toBe( true );

		} );

		it( hasMethod(
			STATIC,
			"create",
			"Create a Resource object with id and types if provided.", [
				{name: "id", type: "string", optional: true},
				{name: "types", type: "string[]", optional: true}
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
			"Create a Resource object with id and types if provided.", [
				{name: "object", type: "T"},
				{name: "id", type: "string", optional: true},
				{name: "types", type: "string[]", optional: true}
			],
			{type: "T & Carbon.Resource.Class"}
		), ():void => {
			expect( Resource.Factory.createFrom ).toBeDefined();
			expect( Utils.isFunction( Resource.Factory.createFrom ) ).toBe( true );

			let simpleResource = Resource.Factory.createFrom( {}, "http://example.com/simple-resource/" );
			expect( simpleResource ).toBeTruthy();
			expect( Resource.Factory.hasClassProperties( simpleResource ) ).toBe( true );
			expect( simpleResource.id ).toBe( "http://example.com/simple-resource/" );
			expect( Utils.isArray( simpleResource.types ) ).toBe( true );
			expect( simpleResource.types.length ).toBe( 0 );

			interface MyResource {
				myProperty:string
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
			"Decorates the object provided with the elements of a Resource object.", [
				{name: "object", type: "T"},
			],
			{type: "T & Carbon.Resource.Class"}
		), ():void => {
			expect( Resource.Factory.decorate ).toBeDefined();
			expect( Utils.isFunction( Resource.Factory.decorate ) ).toBe( true );


			interface MyResource {
				myProperty?:string
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

	} );

} );