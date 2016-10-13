import {
	module,
	interfaze,

	isDefined,
	extendsClass, hasDefaultExport,
} from "../test/JasmineExtender";
import * as Auth from "./../Auth";
import * as Utils from "./../Utils";

import * as PersistedAgent from "./PersistedAgent";
import DefaultExport from "./PersistedAgent";

describe( module( "Carbon.App.PersistedAgent" ), ():void => {

	it( isDefined(), ():void => {
		expect( PersistedAgent ).toBeDefined();
		expect( Utils.isObject( PersistedAgent ) ).toBe( true );
	} );

	describe( interfaze(
		"Carbon.App.PersistedAgent.Class",
		"Specific interface that represents the persisted agents from an application."
	), ():void => {

		it( extendsClass( "Carbon.Auth.PersistedAgent.Class" ), ():void => {
			let persistedAppAgent:PersistedAgent.Class = <any> {};
			let persistedAuthAgent:Auth.PersistedAgent.Class;

			persistedAuthAgent = persistedAppAgent;
			expect( persistedAuthAgent ).toEqual( jasmine.any( Object ) );
		} );

	} );

	it( hasDefaultExport( "Carbon.App.PersistedAgent.Class" ), ():void => {
		let defaultExport:DefaultExport = <any> {};
		let persistedAgent:PersistedAgent.Class;

		persistedAgent = defaultExport;
		expect( persistedAgent ).toEqual( jasmine.any( Object ) );
	} );

} );
