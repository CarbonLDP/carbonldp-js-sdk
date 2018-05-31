import {
	extendsClass,
	hasProperty,
	interfaze,
	module,
	OBLIGATORY,
	OPTIONAL,
} from "../../test/JasmineExtender";


describe( module( "carbonldp/Auth/TransientUser" ), ():void => {

	describe( interfaze(
		"CarbonLDP.Auth.BaseUser",
		"Interface that represents the basic properties for a User."
	), ():void => {

		it( extendsClass( "CarbonLDP.BaseDocument" ), ():void => {} );

		it( hasProperty(
			OPTIONAL,
			"name",
			"string",
			"The optional name of the user."
		), ():void => {} );

		it( hasProperty(
			OBLIGATORY,
			"credentials",
			"CarbonLDP.Auth.UsernameAndPasswordCredentials",
			"A resource with the username and password for the basic credentials."
		), ():void => {} );

	} );

} );
