import {
	extendsClass,
	hasDefaultExport,
	hasProperty,
	interfaze,
	module,
	OBLIGATORY,
} from "../test/JasmineExtender";

import DefaultExport, { PersistedACE } from "./PersistedACE";

describe( module( "Carbon/Auth/ACE" ), ():void => {

	describe( interfaze(
		"Carbon.Auth.PersistedACE.PersistedACE",
		"Interface that represents a persisted Access Control Entry (ACE) of a persisted Access Control List (ACL)."
	), ():void => {

		it( extendsClass( "Carbon.Auth.ACE.ACE" ), ():void => {} );
		it( extendsClass( "Carbon.PersistedFragment.PersistedFragment" ), ():void => {} );

		it( hasProperty(
			OBLIGATORY,
			"document",
			"Carbon.Auth.PersistedACL.Class",
			"Reference to the persisted ACL where the current ACE belongs."
		), ():void => {} );

	} );

	it( hasDefaultExport( "Carbon.Auth.PersistedACE.PersistedACE" ), ():void => {
		let defaultExport:DefaultExport = <any> {};
		let persistedACE:PersistedACE;

		persistedACE = defaultExport;
		expect( persistedACE ).toEqual( jasmine.any( Object ) );
	} );

} );
