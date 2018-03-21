import { Pointer } from "../Pointer";
import { Resource } from "../Resource";
import {
	extendsClass,
	hasProperty,
	interfaze,
	module,
	OBLIGATORY,
	property,
	STATIC,
} from "../test/JasmineExtender";
import {
	CS,
	XSD
} from "../Vocabularies";

import { LDAPCredentials } from "./LDAPCredentials";

describe( module( "Carbon/Auth/LDAPCredentials" ), ():void => {

	describe( interfaze(
		"CarbonLDP.Auth.LDAPCredentials",
		"Interface that represents an in-memory LDAPCredentials of a user."
	), ():void => {

		it( extendsClass( "CarbonLDP.Resource" ), ():void => {
			const target:Resource = {} as LDAPCredentials;
			expect( target ).toBeDefined();
		} );

		it( hasProperty(
			OBLIGATORY,
			"ldapServer",
			"string",
			"URI of the LDAP Server document."
		), ():void => {
			const target:LDAPCredentials[ "ldapServer" ] = Pointer.create();
			expect( target ).toBeDefined();
		} );

		it( hasProperty(
			OBLIGATORY,
			"ldapUserDN",
			"string",
			"User identification in the LDAP Server."
		), ():void => {
			const target:LDAPCredentials[ "ldapUserDN" ] = "user@email.com";
			expect( target ).toBeDefined();
		} );

	} );

	describe( interfaze(
		"CarbonLDP.Auth.LDAPCredentialsFactory",
		"Interface with the factory for `CaronLDP.Auth.LDAPCredentials` objects"
	), ():void => {

		it( hasProperty( OBLIGATORY, "TYPE", "string" ), ():void => {} );

		it( hasProperty( OBLIGATORY, "SCHEMA", "CarbonLDP.ObjectSchema" ), ():void => {} );

	} );

	describe( property(
		STATIC,
		"LDAPCredentials",
		"CarbonLDP.Auth.LDAPCredentialsFactory"
	), ():void => {

		// TODO: Separate in different test
		it( "LDAPCredentials.TYPE", ():void => {
			expect( LDAPCredentials.TYPE ).toEqual( jasmine.any( String ) );
			expect( LDAPCredentials.TYPE ).toBe( CS.LDAPCredentials );
		} );

		describe( "LDAPCredentials.SCHEMA", ():void => {

			it( "should exists", ():void => {
				expect( LDAPCredentials.SCHEMA ).toBeDefined();
				expect( LDAPCredentials.SCHEMA ).toEqual( jasmine.any( Object ) );
			} );

			it( "should have `cs:ldapServer` property", ():void => {
				expect( LDAPCredentials.SCHEMA[ "ldapServer" ] ).toEqual( {
					"@id": CS.ldapServer,
					"@type": "@id",
				} );
			} );

			it( "should have `cs:ldapUserDN` property", ():void => {
				expect( LDAPCredentials.SCHEMA[ "ldapUserDN" ] ).toEqual( {
					"@id": CS.ldapUserDN,
					"@type": XSD.string,
				} );
			} );

		} );

	} );

} );
