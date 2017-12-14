import {
	extendsClass,
	hasDefaultExport,
	hasProperty,
	interfaze,
	isDefined,
	module,
	OBLIGATORY,
	property,
	STATIC,
} from "../test/JasmineExtender";

import * as NS from "./../NS";
import * as Pointer from "./../Pointer";
import * as Resource from "./../Resource";

import * as LDAPCredentials from "./LDAPCredentials";

describe( module( "Carbon/Auth/LDAPCredentials" ), ():void => {

	it( isDefined(), ():void => {
		expect( LDAPCredentials ).toBeDefined();
		expect( LDAPCredentials ).toEqual( jasmine.any( Object ) );
	} );


	it( hasProperty( STATIC, "RDF_CLASS", "string" ), ():void => {
		expect( LDAPCredentials.RDF_CLASS ).toEqual( jasmine.any( String ) );
		expect( LDAPCredentials.RDF_CLASS ).toBe( NS.CS.Class.LDAPCredentials );
	} );

	describe( property( STATIC, "SCHEMA", "Carbon.ObjectSchema.Class" ), ():void => {

		it( "should exists", ():void => {
			expect( LDAPCredentials.SCHEMA ).toBeDefined();
			expect( LDAPCredentials.SCHEMA ).toEqual( jasmine.any( Object ) );
		} );

		it( "should have `cs:ldapServer` property", ():void => {
			expect( LDAPCredentials.SCHEMA[ "ldapServer" ] ).toEqual( {
				"@id": NS.CS.Predicate.ldapServer,
				"@type": "@id",
			} );
		} );

		it( "should have `cs:ldapUserDN` property", ():void => {
			expect( LDAPCredentials.SCHEMA[ "ldapUserDN" ] ).toEqual( {
				"@id": NS.CS.Predicate.ldapUserDN,
				"@type": NS.XSD.DataType.string,
			} );
		} );

	} );


	describe( interfaze(
		"Carbon.Auth.LDAPCredentials.Class",
		"Interface that represents an in-memory LDAPCredentials of a user."
	), ():void => {

		it( extendsClass( "Carbon.Resource.Class" ), ():void => {
			const target:Resource.Class = {} as LDAPCredentials.Class;
			expect( target ).toBeDefined();
		} );

		it( hasProperty(
			OBLIGATORY,
			"ldapServer",
			"string",
			"URI of the LDAP Server document."
		), ():void => {
			const target:LDAPCredentials.Class[ "ldapServer" ] = Pointer.Factory.create();
			expect( target ).toBeDefined();
		} );

		it( hasProperty(
			OBLIGATORY,
			"ldapUserDN",
			"string",
			"User identification in the LDAP Server."
		), ():void => {
			const target:LDAPCredentials.Class[ "ldapUserDN" ] = "user@email.com";
			expect( target ).toBeDefined();
		} );

	} );

	it( hasDefaultExport( "Carbon.Auth.LDAPCredentials.Class" ), ():void => {
		const target:LDAPCredentials.default = {} as LDAPCredentials.Class;
		expect( target ).toBeDefined();
	} );

} );
