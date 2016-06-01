import {
	INSTANCE,
	STATIC,

	module,

	isDefined,
	hasDefaultExport
} from "./test/JasmineExtender";
import * as Utils from "./Utils";
import * as Auth from "./Auth";

import * as settings from "./settings";
import defaultExport from "./settings";

describe( module( "Carbon/settings" ), ():void => {

	it( isDefined(), ():void => {
		expect( settings ).toBeDefined();
		expect( Utils.isObject( settings ) ).toBe( true );
	});

	it( hasDefaultExport(
		"Carbon.settings",`
		A object of type \`Carbon.settings.CarbonSettings\`, whitch is the default settings of a Carbon instance:
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
	});

});