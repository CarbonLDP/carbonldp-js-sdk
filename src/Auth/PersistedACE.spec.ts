import {
	extendsClass,
	hasDefaultExport,
	hasProperty,
	interfaze,
	module,
	OBLIGATORY,
} from "../test/JasmineExtender";

import DefaultExport, { PersistedACE } from "./PersistedACE";

describe( module( "CarbonLDP/Auth/ACE" ), ():void => {

	describe( interfaze(
		"CarbonLDP.Auth.PersistedACE.PersistedACE",
		"Interface that represents a persisted Access Control Entry (ACE) of a persisted Access Control List (ACL)."
	), ():void => {

		it( extendsClass( "CarbonLDP.Auth.ACE.ACE" ), ():void => {} );
		it( extendsClass( "CarbonLDP.PersistedFragment.PersistedFragment" ), ():void => {} );

		it( hasProperty(
			OBLIGATORY,
			"document",
			"CarbonLDP.Auth.PersistedACL.PersistedACL",
			"Reference to the persisted ACL where the current ACE belongs."
		), ():void => {} );

	} );

	it( hasDefaultExport( "CarbonLDP.Auth.PersistedACE.PersistedACE" ), ():void => {
		let defaultExport:DefaultExport = <any> {};
		let persistedACE:PersistedACE;

		persistedACE = defaultExport;
		expect( persistedACE ).toEqual( jasmine.any( Object ) );
	} );

} );
