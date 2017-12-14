import {
	OPTIONAL,

	module,
	interfaze,

	isDefined,
	hasProperty,
	hasDefaultExport,
} from "./test/JasmineExtender";
import * as Utils from "./Utils";

import * as Settings from "./Settings";

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

		it( hasProperty(
			OPTIONAL,
			"system.container",
			"string",
			"URI relative to the domain that indicates the slug of the system container."
		), ():void => {} );

		it( hasProperty(
			OPTIONAL,
			"system.security.container",
			"string",
			"IRI slug of the container of the security related resources."
		), ():void => {
			const target:Settings.Class[ "system.security.container" ] = "" as string;
			expect( target ).toBeDefined();
		} );

		it( hasProperty(
			OPTIONAL,
			"users.container",
			"string",
			"Relative URI to any context, that indicates the slug of the users container."
		), ():void => {} );

		it( hasProperty(
			OPTIONAL,
			"system.roles.container",
			"string",
			"Relative URI to any context, that indicates the slug of the roles container."
		), ():void => {} );

	} );

	it( hasDefaultExport(
		"Carbon.settings", `
		A object of type \`Carbon.settings.CarbonSettings\`, which is the default settings of a Carbon instance:
		* vocabulary: \`"vocabulary/#"\`
		* system.container: \`".system/"\`
		* system.security.container: \`"security/"\`
		* users.container: \`"users/"\`
		* system.roles.container: \`"roles/"\`
		`
	), ():void => {
		const defaultExport:Settings.Class = Settings.default;

		expect( defaultExport ).toBeDefined();
		expect( Utils.isObject( defaultExport ) ).toBe( true );

		expect( defaultExport[ "system.container" ] ).toBeDefined();
		expect( defaultExport[ "system.container" ] ).toBe( ".system/" );

		expect( defaultExport[ "vocabulary" ] ).toBeDefined();
		expect( defaultExport[ "vocabulary" ] ).toBe( "vocabulary/#" );


		expect( defaultExport[ "system.security.container" ] ).toBeDefined();
		expect( defaultExport[ "system.security.container" ] ).toBe( "security/" );

		expect( defaultExport[ "users.container" ] ).toBeDefined();
		expect( defaultExport[ "users.container" ] ).toBe( "users/" );

		expect( defaultExport[ "system.roles.container" ] ).toBeDefined();
		expect( defaultExport[ "system.roles.container" ] ).toBe( "roles/" );

	} );

} );
