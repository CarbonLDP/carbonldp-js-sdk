import {
	STATIC,

	OPTIONAL,
	OBLIGATORY,

	module,
	clazz,
	interfaze,

	isDefined,
	hasMethod,
	hasProperty,
	extendsClass,
	hasDefaultExport,
} from "./test/JasmineExtender";
import * as Utils from "./Utils";
import * as PersistedDocument from "./PersistedDocument";
import * as PersistedProtectedDocument from "./PersistedProtectedDocument";
import * as App from "./App";
import Documents from "./Documents";
import * as NS from "./NS";

import * as PersistedApp from "./PersistedApp";
import DefaultExport from "./PersistedApp";

describe( module( "Carbon/PersistedApp" ), ():void => {

	it( isDefined(), ():void => {
		expect( PersistedApp ).toBeDefined();
		expect( Utils.isObject( PersistedApp ) ).toBe( true );
	} );

	describe( interfaze(
		"Carbon.PersistedApp.Class",
		"Interface that represents a persisted Carbon LDP Application."
	), ():void => {

		it( extendsClass( "Carbon.PersistedProtectedDocument.Class" ), ():void => {} );

		it( hasProperty(
			OBLIGATORY,
			"name",
			"string",
			"The name of the current application."
		), ():void => {} );

		it( hasProperty(
			OPTIONAL,
			"description",
			"string",
			"A brief description of the current application."
		), ():void => {} );

		it( hasProperty(
			OBLIGATORY,
			"rooContainer",
			"Carbon.Pointer.Class",
			"The reference to the root container where the current data of the application lives on."
		), ():void => {} );

		it( hasProperty(
			OPTIONAL,
			"allowsOrigin",
			"(string | Carbon.Pointer.Class)[]",
			`An array of string URIs or Pointers that refers to the origins allowed to connect to the application. An special URI that allows everyone to connect is at \`Carbon.NS.CS.Class.AllOrigins\` which translates to \`${ NS.CS.Class.AllOrigins }\`.`
		), ():void => {} );

	} );

	it( hasDefaultExport( "Carbon.PersistedApp.Class" ), ():void => {
		let defaultExport:DefaultExport = <any> {};
		let defaultTarget:PersistedApp.Class;

		defaultTarget = defaultExport;
		expect( defaultTarget ).toEqual( jasmine.any( Object ) );
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
