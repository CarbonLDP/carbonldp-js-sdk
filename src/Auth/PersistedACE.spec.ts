import {
	OBLIGATORY,

	module,
	interfaze,

	isDefined,
	extendsClass,
	hasProperty,
	hasDefaultExport,
} from "../test/JasmineExtender";

import * as Utils from "./../Utils";

import * as PersistedACE from "./PersistedACE";
import DefaultExport from "./PersistedACE";

describe( module( "Carbon/Auth/ACE" ), ():void => {

	it( isDefined(), ():void => {
		expect( PersistedACE ).toBeDefined();
		expect( Utils.isObject( PersistedACE ) ).toBe( true );
	} );

	describe( interfaze(
		"Carbon.Auth.PersistedACE.Class",
		"Interface that represents a persisted Access Control Entry (ACE) of a persisted Access Control List (ACL)."
	), ():void => {

		it( extendsClass( "Carbon.Auth.ACE.Class" ), ():void => {} );
		it( extendsClass( "Carbon.PersistedFragment.Class" ), ():void => {} );

		it( hasProperty(
			OBLIGATORY,
			"document",
			"Carbon.Auth.PersistedACL.Class",
			"Reference to the persisted ACL where the current ACE belongs."
		), ():void => {} );

	} );

	it( hasDefaultExport( "Carbon.Auth.PersistedACE.Class" ), ():void => {
		let defaultExport:DefaultExport = <any> {};
		let persistedACE:PersistedACE.Class;

		persistedACE = defaultExport;
		expect( persistedACE ).toEqual( jasmine.any( Object ) );
	} );

} );
