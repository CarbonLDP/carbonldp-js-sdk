import {module, isDefined, clazz, hasMethod, STATIC, decoratedObject, hasProperty, INSTANCE} from "./test/JasmineExtender";
import * as Utils from "./Utils";

import * as PersistedResource from "./PersistedResource";

describe( module( "Carbon/PersistedResource" ), ():void => {

	it( isDefined(), ():void => {
		expect( PersistedResource ).toBeDefined();
		expect( Utils.isObject( PersistedResource ) ).toBe( true );
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
				{ name: "object", type: "Object" }
			],
			{ type: "boolean" }
		), ():void => {
			expect( PersistedResource.Factory.hasClassProperties ).toBeDefined();
			expect( Utils.isFunction( PersistedResource.Factory.hasClassProperties ) ).toBe( true );

			let object:any;
			expect( PersistedResource.Factory.hasClassProperties( object ) ).toBe( false );

			object = {
				_snapshot: null,
				_syncSnapshot:() => {},
				isDirty: () => {},
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
		});

		it( hasMethod(
			STATIC,
			"decorate",
			"Decorates the object provided with the properties and methods of a `Carbon.PersistedResource.Class` object.", [
				{ name: "fragment", type: "T extends Object", description: "The object to convert into a persisted resource one." },
				{ name: "snapshot", type: "Object", optional:true, description: "An shallow copy of the resource, which will be used to track its changes." }
			]
		), ():void => {
			expect( PersistedResource.Factory.decorate ).toBeDefined();
			expect( Utils.isFunction( PersistedResource.Factory.decorate ) ).toBe( true );

			let fn = () => {};
			let object:any = {
				_snapshot: null,
				_syncSnapshot:fn,
				isDirty: fn,
			};
			let persistedResource:PersistedResource.Class;

			persistedResource = PersistedResource.Factory.decorate( object );
			expect( persistedResource._snapshot ).toEqual( jasmine.any( Object ) );
			expect( persistedResource._syncSnapshot ).toBe( fn );
			expect( persistedResource.isDirty ).toBe( fn );

			persistedResource = PersistedResource.Factory.decorate( {} );
			expect( persistedResource._snapshot ).toEqual( jasmine.any( Object ) );
			expect( persistedResource._syncSnapshot ).not.toBe( fn );
			expect( persistedResource.isDirty ).not.toBe( fn );

			let snapshot:Object = { some: "some" };
			persistedResource = PersistedResource.Factory.decorate( {}, snapshot );
			expect( persistedResource._snapshot ).toBe( snapshot );
			expect( persistedResource._snapshot ).toEqual( { some: "some" } );
			expect( persistedResource._syncSnapshot ).not.toBe( fn );
			expect( persistedResource.isDirty ).not.toBe( fn );
		} );

		describe( decoratedObject(
			"Object decorated by the `Carbon.PersistedResource.Factory.decorate()` function.", [
				"Carbon.PersistedResource.Class"
			]
		), ():void => {

			it( hasProperty(
				INSTANCE,
				"_snapshot",
				"Object"
			), ():void => {
				let persistedResource:PersistedResource.Class;

				persistedResource = PersistedResource.Factory.decorate( { some: "some" } );
				expect( persistedResource._snapshot ).toBeDefined();
				expect( Utils.isObject( persistedResource._snapshot ) ).toBe( true );
				expect( persistedResource._snapshot ).toEqual( jasmine.any( Object ) );

				let snapshot:Object = { some: "some" };
				persistedResource = PersistedResource.Factory.decorate( { some: "some" }, snapshot );
				expect( persistedResource._snapshot ).toBeDefined();
				expect( persistedResource._snapshot ).toBe( snapshot );
				expect( persistedResource._snapshot ).toEqual( { some: "some" } );
			} );

			it( hasMethod(
				INSTANCE,
				"_syncSnapshot",
				"Updates the snapshot with the data of the resource."
			), ():void => {
				let persistedResource:PersistedResource.Class;
				let snapshot:Object;

				persistedResource = PersistedResource.Factory.decorate( { some: "some" } );
				expect( persistedResource._syncSnapshot ).toBeDefined();
				expect( Utils.isFunction( persistedResource._syncSnapshot ) ).toBe( true );

				snapshot = persistedResource._snapshot;
				expect( snapshot ).toEqual( {} );

				expect( () => persistedResource._syncSnapshot() ).not.toThrow();

				expect( snapshot ).not.toBe( persistedResource._snapshot );
				snapshot = persistedResource._snapshot;
				expect( snapshot ).toEqual( { some: "some" } );

				persistedResource[ "another" ] = "another";
				expect( () => persistedResource._syncSnapshot() ).not.toThrow();

				expect( snapshot ).not.toBe( persistedResource._snapshot );
				snapshot = persistedResource._snapshot;
				expect( snapshot ).toEqual( { some: "some", another: "another" } );

				delete persistedResource[ "some" ];
				expect( () => persistedResource._syncSnapshot() ).not.toThrow();

				expect( snapshot ).not.toBe( persistedResource._snapshot );
				snapshot = persistedResource._snapshot;
				expect( snapshot ).toEqual( { another: "another" } );
			} );

			it( hasMethod(
				INSTANCE,
				"isDirty",
				"Returns true if the resource has been modified in accordance from its snapshot."
			), ():void => {
				let persistedResource:PersistedResource.Class;

				persistedResource = PersistedResource.Factory.decorate( { some: "some" }, { some: "some" } );
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
			} );

		} );

	} );

} );