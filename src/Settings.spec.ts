import * as Settings from "./Settings";

import {
	hasDefaultExport,
	hasProperty,
	interfaze,
	isDefined,
	module,
	OPTIONAL,
} from "./test/JasmineExtender";
import * as Utils from "./Utils";

describe( module( "Carbon/Settings" ), ():void => {

	it( isDefined(), ():void => {
		expect( Settings ).toBeDefined();
		expect( Utils.isObject( Settings ) ).toBe( true );
	} );

	describe( interfaze(
		"Carbon.Settings.Class",
		"Interface that represents the possible settings used by the SDK."
	), ():void => {

		it( hasProperty(
			OPTIONAL,
			"vocabulary",
			"string",
			"URI to be used as the default vocabulary. If a relative one is provided, the URI will be resolved by the context were it has been requested."
		), ():void => {} );

	} );

	it( hasDefaultExport(
		"Carbon.Settings.defaultSettings",
		"A object of type `Carbon.Settings.InternalSettings`, which is the default internal settings of a Carbon instance."
	), ():void => {
		expect( Settings.default ).toBeDefined();
		expect( Settings.default ).toBe( Settings.defaultSettings );
		expect( Settings.default ).toEqual( jasmine.any( Object ) );

		expect( Settings.default[ "system.container" ] ).toBeDefined();
		expect( Settings.default[ "system.container" ] ).toBe( ".system/" );

		expect( Settings.default[ "system.roles.container" ] ).toBeDefined();
		expect( Settings.default[ "system.roles.container" ] ).toBe( "roles/" );

		expect( Settings.default[ "system.users.container" ] ).toBeDefined();
		expect( Settings.default[ "system.users.container" ] ).toBe( "users/" );

		expect( Settings.default[ "system.users.container" ] ).toBeDefined();
		expect( Settings.default[ "system.credentials.container" ] ).toBe( "credentials/" );

		expect( Settings.default[ "vocabulary" ] ).toBeDefined();
		expect( Settings.default[ "vocabulary" ] ).toBe( "vocabulary/#" );
	} );

} );
