import {
	extendsClass,
	hasProperty,
	interfaze,
	module,
	OBLIGATORY,
} from "../test/JasmineExtender";

describe( module( "carbonldp/Auth/ACE" ), ():void => {

	describe( interfaze(
		"CarbonLDP.Auth.PersistedACE",
		"Interface that represents a persisted Access Control Entry (ACE) of a persisted Access Control List (ACL)."
	), ():void => {

		it( extendsClass( "CarbonLDP.Auth.TransientACE" ), ():void => {} );
		it( extendsClass( "CarbonLDP.Fragment" ), ():void => {} );

		it( hasProperty(
			OBLIGATORY,
			"document",
			"CarbonLDP.Auth.ACL",
			"Reference to the persisted ACL where the current ACE belongs."
		), ():void => {} );

	} );

} );
