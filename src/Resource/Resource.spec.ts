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
import * as Utils from "../Utils";

import { Resource } from "./Resource";

import { TransientResource } from "./TransientResource";


describe( module( "carbonldp/Resource" ), ():void => {

	describe( interfaze(
		"CarbonLDP.Resource",
		"Interface that represents any persisted resource in the SDK."
	), ():void => {

		it( extendsClass( "CarbonLDP.TransientResource" ), ():void => {
			const target:TransientResource = {} as Resource;
			expect( target ).toBeDefined();
		} );

		it( hasProperty(
			OBLIGATORY,
			"_snapshot",
			"Object",
			"The shallow copy of the resource, which is used to track the changes on the resource."
		), ():void => {} );

		it( hasMethod(
			OBLIGATORY,
			"_syncSnapshot",
			"Updates the snapshot with the data of the resource."
		), ():void => {} );

		it( hasProperty(
			OBLIGATORY,
			"_partialMetadata",
			"CarbonLDP.SPARQL.QueryDocument.PartialMetadata",
			"Metadata for documents that are partial documents."
		), ():void => {} );

		it( hasMethod(
			OBLIGATORY,
			"isDirty",
			"Returns true if the resource presents differences from its snapshot."
		), ():void => {} );

		it( hasMethod(
			OBLIGATORY,
			"revert",
			"Revert the changes made to the resource into the state of the snapshot."
		), ():void => {} );

		it( hasMethod(
			OBLIGATORY,
			"isPartial",
			"Returns true if the resource is a partial representation of the one stored in Carbon LDP."
		), ():void => {} );

	} );

	describe( interfaze(
		"CarbonLDP.ResourceFactory",
		"Interface with the factory, decorate and utils methods of a `CarbonLDP.Resource` object"
	), ():void => {

		it( hasMethod(
			OBLIGATORY,
			"isDecorated",
			"Returns true if the object provided has the properties and methods of a `CarbonLDP.Resource` object.", [
				{ name: "object", type: "object" },
			],
			{ type: "object is CarbonLDP.Resource" }
		), ():void => {} );

		it( hasMethod(
			OBLIGATORY,
			"decorate",
			[ "T extends object" ],
			"Decorates the object provided with the properties and methods of a `CarbonLDP.Resource` object.", [
				{ name: "object", type: "T", description: "The object to convert into a persisted resource one." },
			]
		), ():void => {} );

	} );

	describe( property( STATIC, "Resource", "CarbonLDP.ResourceFactory", "Constant that implements the `CarbonLDP.ResourceFactory` interface." ), ():void => {

		it( isDefined(), ():void => {
			expect( Resource ).toBeDefined();
			expect( Resource ).toEqual( jasmine.any( Object ) );
		} );

		// TODO: Separate in different tests
		it( "Resource.isDecorated", ():void => {
			expect( Resource.isDecorated ).toBeDefined();
			expect( Utils.isFunction( Resource.isDecorated ) ).toBe( true );

			let object:any = undefined;
			expect( Resource.isDecorated( object ) ).toBe( false );

			object = {
				_snapshot: null,
				_syncSnapshot: ():void => {},
				isDirty: ():void => {},
				revert: ():void => {},
				isPartial: ():void => {},
			};
			expect( Resource.isDecorated( object ) ).toBe( true );

			delete object._snapshot;
			expect( Resource.isDecorated( object ) ).toBe( false );
			object._snapshot = null;

			delete object._syncSnapshot;
			expect( Resource.isDecorated( object ) ).toBe( false );
			object._syncSnapshot = () => {};

			delete object.isDirty;
			expect( Resource.isDecorated( object ) ).toBe( false );
			object.isDirty = () => {};

			delete object.revert;
			expect( Resource.isDecorated( object ) ).toBe( false );
			object.revert = () => {};

			delete object.isPartial;
			expect( Resource.isDecorated( object ) ).toBe( false );
			object.isPartial = () => {};
		} );

		// TODO: Separate in different tests
		it( "Resource.decorate", ():void => {
			expect( Resource.decorate ).toBeDefined();
			expect( Utils.isFunction( Resource.decorate ) ).toBe( true );

			let fn:Function = ():void => {};
			let object:any = {
				_snapshot: null,
				_syncSnapshot: fn,
				isDirty: fn,
				revert: fn,
				isPartial: fn,
			};
			let persistedResource:Resource;

			persistedResource = Resource.decorate( object );
			expect( persistedResource._snapshot ).toEqual( jasmine.any( Object ) );
			expect( persistedResource._syncSnapshot ).toBe( fn );
			expect( persistedResource.isDirty ).toBe( fn );

			persistedResource = Resource.decorate( {} as TransientResource );
			expect( persistedResource._snapshot ).toEqual( jasmine.any( Object ) );
			expect( persistedResource._syncSnapshot ).not.toBe( fn );
			expect( persistedResource.isDirty ).not.toBe( fn );
		} );

		// TODO: Test Resource.is
		// TODO: Test Resource.create
		// TODO: Test Resource.createFrom

		describe( "Resource instance", ():void => {

			// TODO: Mode to `Resource.decorate`
			it( "Resource._snapshot", ():void => {
				let persistedResource:Resource;

				persistedResource = Resource.decorate( TransientResource.decorate( { some: "some" } ) );
				expect( persistedResource._snapshot ).toBeDefined();
				expect( Utils.isObject( persistedResource._snapshot ) ).toBe( true );
				expect( persistedResource._snapshot ).toEqual( jasmine.any( Object ) );
			} );

			// TODO: Separate in different tests
			it( "Resource._syncSnapshot", ():void => {
				let persistedResource:Resource;
				let snapshot:Object;

				persistedResource = Resource.decorate( TransientResource.decorate( { some: "some" } ) );
				expect( persistedResource._syncSnapshot ).toBeDefined();
				expect( Utils.isFunction( persistedResource._syncSnapshot ) ).toBe( true );

				snapshot = persistedResource._snapshot;
				expect( snapshot ).toEqual( {} );

				expect( () => persistedResource._syncSnapshot() ).not.toThrow();

				expect( snapshot ).not.toBe( persistedResource._snapshot );
				snapshot = persistedResource._snapshot;
				expect( snapshot ).toEqual( { id: "", types: [], some: "some" } );

				persistedResource[ "another" ] = "another";
				expect( () => persistedResource._syncSnapshot() ).not.toThrow();

				expect( snapshot ).not.toBe( persistedResource._snapshot );
				snapshot = persistedResource._snapshot;
				expect( snapshot ).toEqual( { id: "", types: [], some: "some", another: "another" } );

				delete persistedResource[ "some" ];
				expect( () => persistedResource._syncSnapshot() ).not.toThrow();

				expect( snapshot ).not.toBe( persistedResource._snapshot );
				snapshot = persistedResource._snapshot;
				expect( snapshot ).toEqual( { id: "", types: [], another: "another" } );

				let resource:TransientResource = TransientResource.createFrom( { another: "another", id: "http://example.com/resource/", types: [ "http://example.com/ns#Type" ] } );
				persistedResource = Resource.decorate( resource );
				expect( () => persistedResource._syncSnapshot() ).not.toThrow();

				expect( persistedResource._snapshot ).not.toEqual( resource );
				let resourceSnapshot:TransientResource = persistedResource._snapshot as TransientResource;
				expect( Utils.ObjectUtils.areEqual( resource, resourceSnapshot, { arrays: true } ) ).toBe( true );
				expect( resourceSnapshot.id ).toEqual( resource.id );
				expect( resourceSnapshot.types ).toEqual( resource.types );
			} );

			// TODO: Separate in different tests
			it( "Resource.isDirty", ():void => {
				let persistedResource:Resource;

				persistedResource = Resource.decorate( TransientResource.decorate( { some: "some" } ) );
				persistedResource._snapshot = TransientResource.decorate( { some: "some" } );

				expect( persistedResource.isDirty ).toBeDefined();
				expect( Utils.isFunction( persistedResource.isDirty ) ).toBe( true );

				expect( persistedResource.isDirty() ).toBe( false );

				persistedResource[ "another" ] = "another";
				expect( persistedResource.isDirty() ).toBe( true );

				persistedResource._syncSnapshot();
				expect( persistedResource.isDirty() ).toBe( false );
				persistedResource[ "another" ] = "another";
				expect( persistedResource.isDirty() ).toBe( false );

				delete persistedResource[ "another" ];
				persistedResource[ "array" ] = [ 1, 2, 3, 4 ];
				expect( persistedResource.isDirty() ).toBe( true );

				persistedResource._syncSnapshot();
				expect( persistedResource.isDirty() ).toBe( false );
				persistedResource[ "array" ] = [ 1, 2, 3, 4 ];
				expect( persistedResource.isDirty() ).toBe( false );

				persistedResource[ "array" ].splice( 1, 2 );
				expect( persistedResource.isDirty() ).toBe( true );

				persistedResource._syncSnapshot();
				expect( persistedResource.isDirty() ).toBe( false );

				persistedResource[ "object" ] = { some: "some" };
				expect( persistedResource.isDirty() ).toBe( true );

				persistedResource._syncSnapshot();
				expect( persistedResource.isDirty() ).toBe( false );
				persistedResource[ "object" ] = { some: "some" };
				expect( persistedResource.isDirty() ).toBe( true );

				let resource:TransientResource = TransientResource.createFrom( { another: "another", id: "http://example.com/resource/", types: [ "http://example.com/ns#Type" ] } );
				persistedResource = Resource.decorate( resource );

				persistedResource._syncSnapshot();
				expect( persistedResource.isDirty() ).toBe( false );

				resource.id = "http://example.com/another/";
				expect( persistedResource.isDirty() ).toBe( true );
				resource.id = "http://example.com/resource/";
				expect( persistedResource.isDirty() ).toBe( false );

				resource.types = [ "http://example.com/ns#Another-Type" ];
				expect( persistedResource.isDirty() ).toBe( true );
				resource.types = [ "http://example.com/ns#Type" ];
				expect( persistedResource.isDirty() ).toBe( false );
			} );

			// TODO: Separate in different tests
			it( "Resource.revert", ():void => {
				let resource:TransientResource & { another:string, toDelete?:boolean } = TransientResource.createFrom( { another: "another", id: "http://example.com/resource/", types: [ "http://example.com/ns#Type" ] } );
				let persistedResource:Resource = Resource.decorate( resource );
				persistedResource._syncSnapshot();

				resource.id = "http://example.com/another/";
				expect( persistedResource.isDirty() ).toBe( true );
				expect( () => persistedResource.revert() ).not.toThrow();
				expect( persistedResource.isDirty() ).toBe( false );
				expect( resource.id ).toBe( "http://example.com/resource/" );

				resource.types = [ "http://example.com/ns#Another-Type" ];
				expect( persistedResource.isDirty() ).toBe( true );
				expect( () => persistedResource.revert() ).not.toThrow();
				expect( persistedResource.isDirty() ).toBe( false );
				expect( resource.types ).toEqual( [ "http://example.com/ns#Type" ] );

				resource.another = "A change";
				expect( persistedResource.isDirty() ).toBe( true );
				expect( () => persistedResource.revert() ).not.toThrow();
				expect( persistedResource.isDirty() ).toBe( false );
				expect( resource.another ).toBe( "another" );

				resource.toDelete = true;
				expect( persistedResource.isDirty() ).toBe( true );
				expect( () => persistedResource.revert() ).not.toThrow();
				expect( persistedResource.isDirty() ).toBe( false );

				resource.id = "http://example.com/another/";
				resource.types = [ "http://example.com/ns#Another-Type" ];
				resource.another = "A change";
				resource.toDelete = true;
				expect( persistedResource.isDirty() ).toBe( true );
				expect( () => persistedResource.revert() ).not.toThrow();
				expect( persistedResource.isDirty() ).toBe( false );
				expect( resource.id ).toBe( "http://example.com/resource/" );
				expect( resource.types ).toEqual( [ "http://example.com/ns#Type" ] );
				expect( resource.another ).toBe( "another" );
				expect( resource.toDelete ).toBeUndefined();
			} );

			// TODO: Test `Resource.isPartial`

		} );

	} );

} );
