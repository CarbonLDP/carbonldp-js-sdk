import {
	STATIC,

	module,
	clazz,

	isDefined,
	hasMethod,
} from "./test/JasmineExtender";
import * as Utils from "./Utils";
import * as PersistedDocument from "./PersistedDocument";
import * as PersistedProtectedDocument from "./PersistedProtectedDocument";
import * as App from "./App";
import * as PersistedApp from "./PersistedApp";
import Documents from "./Documents";
import * as NS from "./NS";

describe( module( "Carbon/PersistedApp" ), ():void => {

	it( isDefined(), ():void => {
		expect( PersistedApp ).toBeDefined();
		expect( Utils.isObject( PersistedApp ) ).toBe( true );
	} );

	describe( clazz(
		"Carbon.PersistedApp.Factory",
		"Factory class for `Carbon.PersistedApp.Class` objects."
	), ():void => {

		it( isDefined(), ():void => {
			expect( PersistedApp.Factory ).toBeDefined();
			expect( Utils.isFunction( PersistedApp.Factory ) ).toBe( true );
		} );

		it( hasMethod(
			STATIC,
			"hasClassProperties",
			"Returns true if the object provided has the properties of a `Carbon.PersistedApp.Class` object.", [
				{name: "resource", type: "Object"},
			],
			{type: "boolean"}
		), ():void => {
			expect( PersistedApp.Factory.hasClassProperties ).toBeDefined();
			expect( Utils.isFunction( PersistedApp.Factory.hasClassProperties ) ).toBe( true );

			let object:any = void 0;
			expect( PersistedApp.Factory.hasClassProperties( object ) ).toBe( false );

			object = {
				rootContainer: null,
			};
			expect( PersistedApp.Factory.hasClassProperties( object ) ).toBe( true );

			delete object.rootContainer;
			expect( PersistedApp.Factory.hasClassProperties( object ) ).toBe( false );
			object.rootContainer = null;
		} );

		it( hasMethod(
			STATIC,
			"is",
			"Returns true if the object provided is considered a `Carbon.PersistedApp.Class` object.", [
				{name: "object", type: "Object"},
			],
			{type: "boolean"}
		), ():void => {
			expect( PersistedApp.Factory.is ).toBeDefined();
			expect( Utils.isFunction( PersistedApp.Factory.is ) ).toBe( true );

			let object:any = {
				types: [ NS.CS.Class.Application ],
				name: "App name",
				rootContainer: {},
			};
			expect( PersistedApp.Factory.is( object ) ).toBe( false );

			let app:App.Class = App.Factory.createFrom( object,  "The App name" );
			expect( PersistedApp.Factory.is( app ) ).toBe( false );

			let document:PersistedDocument.Class = PersistedDocument.Factory.decorate( app, new Documents() );
			expect( PersistedApp.Factory.is( document ) ).toBe( false );

			let protectedDocument:PersistedProtectedDocument.Class = PersistedProtectedDocument.Factory.decorate( document );
			expect( PersistedApp.Factory.is( protectedDocument ) ).toBe( true );
		} );

	} );

} );
