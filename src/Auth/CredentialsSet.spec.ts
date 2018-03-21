import { Pointer } from "../Pointer";
import {
	hasProperty,
	interfaze,
	module,
	OBLIGATORY,
	OPTIONAL,
	property,
	STATIC
} from "../test/JasmineExtender";
import { CS } from "../Vocabularies";
import { CredentialsSet } from "./CredentialsSet";
import { LDAPCredentials } from "./LDAPCredentials";
import { UsernameAndPasswordCredentials } from "./UsernameAndPasswordCredentials";


describe( module( "Carbon/Auth/CredentialsSet" ), ():void => {

	describe( interfaze(
		"CarbonLDP.Auth.CredentialsSet",
		"Interface that describe the document that contains all the credentials of a user."
	), ():void => {

		it( "should exists", ():void => {
			const target:CredentialsSet = {} as any;
			expect( target ).toBeDefined();
		} );

		it( hasProperty( OPTIONAL, "user", "CarbonLDP.Pointer.Class" ), ():void => {
			const target:CredentialsSet[ "user" ] = Pointer.create();
			expect( target ).toBeDefined();
		} );

		it( hasProperty( OPTIONAL, "credentials", "( CarbonLDP.Auth.UsernameAndPasswordCredentials | CarbonLDP.Auth.LDAPCredentials )[]" ), ():void => {
			const target:CredentialsSet[ "credentials" ] = []  as ( UsernameAndPasswordCredentials | LDAPCredentials )[];
			expect( target ).toBeDefined();
		} );

	} );

	describe( interfaze(
		"CarbonLDP.Auth.CredentialsSetFactory",
		"Interface with the factory for `CarbonLDP.Auth.CredentialsSet` object."
	), ():void => {

		it( hasProperty(
			OBLIGATORY,
			"TYPE",
			"CarbonLDP.Vocabularies.CS.CredentialsSet"
		), ():void => {} );

		it( hasProperty(
			OBLIGATORY,
			"SCHEMA",
			"CarbonLDP.ObjectSchema"
		), ():void => {} );

	} );

	describe( property(
		STATIC,
		"CredentialsSet",
		"CarbonLDP.Auth.CredentialsSetFactory"
	), ():void => {

		it( "should exists", ():void => {
			expect( CredentialsSet ).toBeDefined();
			expect( CredentialsSet ).toEqual( jasmine.any( Object ) );
		} );

		// TODO: Separate in different tests
		it( "CredentialsSet.TYPE", ():void => {
			expect( CredentialsSet.TYPE ).toEqual( jasmine.any( String ) );
			expect( CredentialsSet.TYPE ).toBe( CS.CredentialsSet );
		} );

		describe( "CredentialsSet.SCHEMA", ():void => {

			it( "should exists", ():void => {
				expect( CredentialsSet.SCHEMA ).toBeDefined();
				expect( CredentialsSet.SCHEMA ).toEqual( jasmine.any( Object ) );
			} );

			it( "should have `cs:user` property", ():void => {
				expect( CredentialsSet.SCHEMA[ "user" ] ).toEqual( {
					"@id": CS.user,
					"@type": "@id",
				} );
			} );

			it( "should have `cs:credentials` property", ():void => {
				expect( CredentialsSet.SCHEMA[ "credentials" ] ).toEqual( {
					"@id": CS.credentials,
					"@type": "@id",
					"@container": "@set",
				} );
			} );

		} );

	} );

} );
