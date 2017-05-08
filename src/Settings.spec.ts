import {
	OPTIONAL,

	module,
	interfaze,

	isDefined,
	hasProperty,
	hasDefaultExport,
} from "./test/JasmineExtender";
import * as Utils from "./Utils";
import * as Auth from "./Auth";

import * as settings from "./Settings";
import defaultExport from "./Settings";

describe( module( "Carbon/Settings" ), ():void => {

	it( isDefined(), ():void => {
		expect( settings ).toBeDefined();
		expect( Utils.isObject( settings ) ).toBe( true );
	} );

	describe( interfaze(
		"Carbon.Settings.Class",
		"Interface that represents the possible settings used by the SDK."
	), ():void => {

		it( hasProperty(
			OPTIONAL,
			"auth.method",
			"Carbon.Auth.Method",
			"(Not supported) Indicates the default method of authentication to use."
		), ():void => {} );

		it( hasProperty(
			OPTIONAL,
			"system.container",
			"string",
			"URI relative to the domain that indicates the slug of the system container."
		), ():void => {} );

		it( hasProperty(
			OPTIONAL,
			"system.users.container",
			"string",
			"Relative URI to any context, that indicates the slug of the users container."
		), ():void => {} );

		it( hasProperty(
			OPTIONAL,
			"system.roles.container",
			"string",
			"Relative URI to any context, that indicates the slug of the roles container."
		), ():void => {} );

		it( hasProperty(
			OPTIONAL,
			"vocabulary",
			"string",
			"URI to be used as the default vocabulary. If a relative one is provided, the URI will be resolved by the context were it has been requested."
		), ():void => {} );

	} );

	it( hasDefaultExport(
		"Carbon.settings", `
		A object of type \`Carbon.settings.CarbonSettings\`, which is the default settings of a Carbon instance:
		* auth.method: \`Carbon.Auth.Method.TOKEN\`
		* system.container: \`".system/"\`
		* system.users.container: \`"users/"\`
		* system.roles.container: \`"roles/"\`
		* vocabulary: \`"vocabulary/#"\`
		`
	), ():void => {
		expect( defaultExport ).toBeDefined();
		expect( Utils.isObject( defaultExport ) ).toBe( true );

		expect( defaultExport[ "auth.method" ] ).toBeDefined();
		expect( defaultExport[ "auth.method" ] ).toBe( Auth.Method.TOKEN );

		expect( defaultExport[ "system.container" ] ).toBeDefined();
		expect( defaultExport[ "system.container" ] ).toBe( ".system/" );

		expect( defaultExport[ "system.roles.container" ] ).toBeDefined();
		expect( defaultExport[ "system.roles.container" ] ).toBe( "roles/" );

		expect( defaultExport[ "system.users.container" ] ).toBeDefined();
		expect( defaultExport[ "system.users.container" ] ).toBe( "users/" );

		expect( defaultExport[ "vocabulary" ] ).toBeDefined();
		expect( defaultExport[ "vocabulary" ] ).toBe( "vocabulary/#" );
	} );

} );
