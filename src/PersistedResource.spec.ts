import * as PersistedResource from "./PersistedResource";
import DefaultExport from "./PersistedResource";
import { Resource } from "./Resource";
import { clazz, decoratedObject, extendsClass, hasDefaultExport, hasMethod, hasProperty, INSTANCE, interfaze, isDefined, module, OBLIGATORY, STATIC, } from "./test/JasmineExtender";
import * as Utils from "./Utils";

describe( module( "Carbon/PersistedResource" ), ():void => {

	it( isDefined(), ():void => {
		expect( PersistedResource ).toBeDefined();
		expect( Utils.isObject( PersistedResource ) ).toBe( true );
	} );

	describe( interfaze(
		"Carbon.PersistedResource.Class",
		"Interface that represents any persisted resource in the SDK."
	), ():void => {

		it( extendsClass( "Carbon.Resource.Resource" ), ():void => {
			const target:Resource = {} as PersistedResource.Class;
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

	it( hasDefaultExport( "Carbon.PersistedResource.Class" ), ():void => {
		let defaultExport:DefaultExport = <any> {};
		let defaultTarget:PersistedResource.Class;

		defaultTarget = defaultExport;
		expect( defaultTarget ).toEqual( jasmine.any( Object ) );
	} );

	describe( clazz( "Carbon.PersistedResource.Factory", "Factory class for `Carbon.PersistedResource.Class` objects." ), ():void => {

		it( isDefined(), ():void => {
			expect( PersistedResource.Factory ).toBeDefined();
			expect( Utils.isFunction( PersistedResource.Factory ) ).toBe( true );
		} );

		it( hasMethod(
			STATIC,
			"hasClassProperties",
			"Returns true if the object provided has the properties and methods of a `Carbon.PersistedResource.Class` object.", [
				{ name: "object", type: "object" },
			],
			{ type: "boolean" }
		), ():void => {
			expect( PersistedResource.Factory.hasClassProperties ).toBeDefined();
			expect( Utils.isFunction( PersistedResource.Factory.hasClassProperties ) ).toBe( true );

			let object:any = undefined;
			expect( PersistedResource.Factory.hasClassProperties( object ) ).toBe( false );

			object = {
				_snapshot: null,
				_syncSnapshot: ():void => {},
				isDirty: ():void => {},
				revert: ():void => {},
				isPartial: ():void => {},
			};
			expect( PersistedResource.Factory.hasClassProperties( object ) ).toBe( true );

			delete object._snapshot;
			expect( PersistedResource.Factory.hasClassProperties( object ) ).toBe( false );
			object._snapshot = null;

			delete object._syncSnapshot;
			expect( PersistedResource.Factory.hasClassProperties( object ) ).toBe( false );
			object._syncSnapshot = () => {};

			delete object.isDirty;
			expect( PersistedResource.Factory.hasClassProperties( object ) ).toBe( false );
			object.isDirty = () => {};

			delete object.revert;
			expect( PersistedResource.Factory.hasClassProperties( object ) ).toBe( false );
			object.revert = () => {};

			delete object.isPartial;
			expect( PersistedResource.Factory.hasClassProperties( object ) ).toBe( false );
			object.isPartial = () => {};
		} );

		it( hasMethod(
			STATIC,
			"decorate",
			[ "T extends object" ],
			"Decorates the object provided with the properties and methods of a `Carbon.PersistedResource.Class` object.", [
				{ name: "fragment", type: "T", description: "The object to convert into a persisted resource one." },
			]
		), ():void => {
			expect( PersistedResource.Factory.decorate ).toBeDefined();
			expect( Utils.isFunction( PersistedResource.Factory.decorate ) ).toBe( true );

			let fn:Function = ():void => {};
			let object:any = {
				_snapshot: null,
				_syncSnapshot: fn,
				isDirty: fn,
				revert: fn,
				isPartial: fn,
			};
			let persistedResource:PersistedResource.Class;

			persistedResource = PersistedResource.Factory.decorate( object );
			expect( persistedResource._snapshot ).toEqual( jasmine.any( Object ) );
			expect( persistedResource._syncSnapshot ).toBe( fn );
			expect( persistedResource.isDirty ).toBe( fn );

			persistedResource = PersistedResource.Factory.decorate( {} as Resource );
			expect( persistedResource._snapshot ).toEqual( jasmine.any( Object ) );
			expect( persistedResource._syncSnapshot ).not.toBe( fn );
			expect( persistedResource.isDirty ).not.toBe( fn );
		} );

		describe( decoratedObject(
			"Object decorated by the `Carbon.PersistedResource.Factory.decorate()` function.", [
				"Carbon.PersistedResource.Class",
			]
		), ():void => {

			it( hasProperty(
				INSTANCE,
				"_snapshot",
				"Object",
				"The shallow copy of the resource, which is used to track the changes on the resource."
			), ():void => {
				let persistedResource:PersistedResource.Class;

				persistedResource = PersistedResource.Factory.decorate( Resource.decorate( { some: "some" } ) );
				expect( persistedResource._snapshot ).toBeDefined();
				expect( Utils.isObject( persistedResource._snapshot ) ).toBe( true );
				expect( persistedResource._snapshot ).toEqual( jasmine.any( Object ) );
			} );

			it( hasMethod(
				INSTANCE,
				"_syncSnapshot",
				"Updates the snapshot with the data of the resource."
			), ():void => {
				let persistedResource:PersistedResource.Class;
				let snapshot:Object;

				persistedResource = PersistedResource.Factory.decorate( Resource.decorate( { some: "some" } ) );
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

				let resource:Resource = Resource.createFrom( { another: "another" }, "http://example.com/resource/", [ "http://example.com/ns#Type" ] );
				persistedResource = PersistedResource.Factory.decorate( resource );
				expect( () => persistedResource._syncSnapshot() ).not.toThrow();

				expect( persistedResource._snapshot ).not.toEqual( resource );
				let resourceSnapshot:Resource = persistedResource._snapshot as Resource;
				expect( Utils.ObjectUtils.areEqual( resource, resourceSnapshot, { arrays: true } ) ).toBe( true );
				expect( resourceSnapshot.id ).toEqual( resource.id );
				expect( resourceSnapshot.types ).toEqual( resource.types );
			} );

			it( hasMethod(
				INSTANCE,
				"isDirty",
				"Returns true if the resource presents differences from its snapshot."
			), ():void => {
				let persistedResource:PersistedResource.Class;

				persistedResource = PersistedResource.Factory.decorate( Resource.decorate( { some: "some" } ) );
				persistedResource._snapshot = Resource.decorate( { some: "some" } );

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

				let resource:Resource = Resource.createFrom( { another: "another" }, "http://example.com/resource/", [ "http://example.com/ns#Type" ] );
				persistedResource = PersistedResource.Factory.decorate( resource );

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

			it( hasMethod(
				INSTANCE,
				"revert",
				"Revert the changes made to the resource into the state of the snapshot."
			), ():void => {
				let resource:Resource & { another:string, toDelete?:boolean } = Resource.createFrom( { another: "another" }, "http://example.com/resource/", [ "http://example.com/ns#Type" ] );
				let persistedResource:PersistedResource.Class = PersistedResource.Factory.decorate( resource );
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

		} );

	} );

} );
