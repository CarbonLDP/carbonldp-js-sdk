import {
	STATIC,

	module,
	clazz,

	isDefined,
	hasMethod
} from "./test/JasmineExtender";
import * as Utils from "./Utils";
import * as Pointer from "./Pointer";
import * as Document from "./Document";
import * as App from "./App";
import * as PersistedApp from "./PersistedApp";

describe( module( "Carbon/PersistedApp" ), ():void => {

	it( isDefined(), ():void => {
		expect( PersistedApp ).toBeDefined();
		expect( Utils.isObject( PersistedApp ) ).toBe( true );
	});

	describe( clazz(
		"Carbon.PersistedApp.Factory",
		"Factory class for `Carbon.PersistedApp.Class` objects"
	), ():void => {

		it( isDefined(), ():void => {
			expect( PersistedApp.Factory ).toBeDefined();
			expect( Utils.isFunction( PersistedApp.Factory ) ).toBe( true );
		});

		it( hasMethod(
			STATIC,
			"hasClassProperties",
			"Returns true if the object provided has the properties that defines a `Carbon.PersistedApp.Class` object", [
				{ name: "resource", type: "Object" }
			],
			{ type: "boolean" }
		), ():void => {
			expect( PersistedApp.Factory.hasClassProperties ).toBeDefined();
			expect( Utils.isFunction( PersistedApp.Factory.hasClassProperties ) ).toBe( true );

			expect( PersistedApp.Factory.hasClassProperties( { rootContainer: {} } ) ).toBe( true );
			expect( PersistedApp.Factory.hasClassProperties( { rootContainer: Pointer.Factory.create( "http://example.com/apps/example-app/" ) } ) ).toBe( true );

			expect( PersistedApp.Factory.hasClassProperties( {} ) ).toBe( false );
			expect( PersistedApp.Factory.hasClassProperties( null ) ).toBe( false );
			expect( PersistedApp.Factory.hasClassProperties( undefined ) ).toBe( false );
		});

		it( hasMethod(
			STATIC,
			"is",
			"Returns true if the object provided is considered as an `Carbon.PersistedApp.Class` object", [
				{ name: "object", type: "Object" }
			],
			{ type: "boolean" }
		), ():void => {
			expect( PersistedApp.Factory.is ).toBeDefined();
			expect( Utils.isFunction( PersistedApp.Factory.is ) ).toBe( true );

			expect( PersistedApp.Factory.is( {} ) ).toBe( false );
			expect( PersistedApp.Factory.is( { name: "App name" } ) ).toBe( false );
			expect( PersistedApp.Factory.is( { name: "App name", rootContainer: {} } ) ).toBe( false );

			let object:any = Document.Factory.create();
			expect( PersistedApp.Factory.is( object ) ).toBe( false );

			object = App.Factory.create( "The App name" );
			expect( PersistedApp.Factory.is( object ) ).toBe( false );

			object.rootContainer = {};
			expect( PersistedApp.Factory.is( object ) ).toBe( true );
		});

	});

});
