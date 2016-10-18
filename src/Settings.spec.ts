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
			"domain",
			"string",
			"The domain of the Carbon LDP server to be used."
		), ():void => {} );

		it( hasProperty(
			OPTIONAL,
			"http.ssl",
			"boolean",
			"Indicates if the server uses secure HTTP (HTTPS) or not."
		), ():void => {} );

		it( hasProperty(
			OPTIONAL,
			"auth.method",
			"Carbon.Auth.Method",
			"(Not supported) Indicates the default method of authentication to use."
		), ():void => {} );

		it( hasProperty(
			OPTIONAL,
			"platform.container",
			"string",
			"URI relative to the domain that indicates the slug of the platform container."
		), ():void => {} );

		it( hasProperty(
			OPTIONAL,
			"platform.apps.container",
			"string",
			"Relative URI that indicates the slug of the apps container."
		), ():void => {} );

		it( hasProperty(
			OPTIONAL,
			"platform.agents.container",
			"string",
			"Relative URI to any context, that indicates the slug of the agents container."
		), ():void => {} );

		it( hasProperty(
			OPTIONAL,
			"platform.roles.container",
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
		* domain: \`"carbonldp.com"\`
		* http.ssl: \`true\`
		* auth.method: \`Carbon.Auth.Method.TOKEN\`
		* platform.container: \`"platform/"\`
		* platform.apps.container: \`"apps/"\`
		* platform.agents.container: \`"agents/"\`
		* platform.roles.container: \`"roles/"\`
		* vocabulary: \`"vocabulary/#"\`
		`
	), ():void => {
		expect( defaultExport ).toBeDefined();
		expect( Utils.isObject( defaultExport ) ).toBe( true );

		expect( defaultExport[ "domain" ] ).toBeDefined();
		expect( defaultExport[ "domain" ] ).toBe( "carbonldp.com" );

		expect( defaultExport[ "http.ssl" ] ).toBeDefined();
		expect( defaultExport[ "http.ssl" ] ).toBe( true );

		expect( defaultExport[ "auth.method" ] ).toBeDefined();
		expect( defaultExport[ "auth.method" ] ).toBe( Auth.Method.TOKEN );

		expect( defaultExport[ "platform.container" ] ).toBeDefined();
		expect( defaultExport[ "platform.container" ] ).toBe( "platform/" );

		expect( defaultExport[ "platform.apps.container" ] ).toBeDefined();
		expect( defaultExport[ "platform.apps.container" ] ).toBe( "apps/" );

		expect( defaultExport[ "platform.roles.container" ] ).toBeDefined();
		expect( defaultExport[ "platform.roles.container" ] ).toBe( "roles/" );

		expect( defaultExport[ "platform.agents.container" ] ).toBeDefined();
		expect( defaultExport[ "platform.agents.container" ] ).toBe( "agents/" );

		expect( defaultExport[ "vocabulary" ] ).toBeDefined();
		expect( defaultExport[ "vocabulary" ] ).toBe( "vocabulary/#" );
	} );

} );
