import {
	hasDefaultExport,
	hasProperty,
	interfaze,
	module,
	OPTIONAL,
	property,
	STATIC
} from "../test/JasmineExtender";

import * as NS from "./../NS";
import * as Pointer from "./../Pointer";
import * as CredentialsSet from "./CredentialsSet";
import * as LDAPCredentials from "./LDAPCredentials";
import * as UsernameAndPasswordCredentials from "./UsernameAndPasswordCredentials";


describe( module( "Carbon/Auth/CredentialsSet" ), ():void => {

	it( "should exists", ():void => {
		expect( CredentialsSet ).toBeDefined();
		expect( CredentialsSet ).toEqual( jasmine.any( Object ) );
	} );


	it( hasProperty( STATIC, "RDF_CLASS", "string" ), ():void => {
		expect( CredentialsSet.RDF_CLASS ).toEqual( jasmine.any( String ) );
		expect( CredentialsSet.RDF_CLASS ).toBe( NS.CS.Class.CredentialsSet );
	} );

	describe( property( STATIC, "SCHEMA", "Carbon.ObjectSchema.Class" ), ():void => {

		it( "should exists", ():void => {
			expect( CredentialsSet.SCHEMA ).toBeDefined();
			expect( CredentialsSet.SCHEMA ).toEqual( jasmine.any( Object ) );
		} );

		it( "should have `cs:user` property", ():void => {
			expect( CredentialsSet.SCHEMA[ "user" ] ).toEqual( {
				"@id": NS.CS.Predicate.user,
				"@type": "@id",
			} );
		} );

		it( "should have `cs:credentials` property", ():void => {
			expect( CredentialsSet.SCHEMA[ "credentials" ] ).toEqual( {
				"@id": NS.CS.Predicate.credentials,
				"@type": "@id",
				"@container": "@set",
			} );
		} );

	} );


	describe( interfaze( "Carbon.Auth.CredentialsSet.Class", "Interface that describe the document that contains all the credentials of a user." ), ():void => {

		it( "should exists", ():void => {
			const target:CredentialsSet.Class = {} as any;
			expect( target ).toBeDefined();
		} );

		it( hasProperty( OPTIONAL, "user", "Carbon.Pointer.Class" ), ():void => {
			const target:CredentialsSet.Class[ "user" ] = Pointer.Factory.create();
			expect( target ).toBeDefined();
		} );

		it( hasProperty( OPTIONAL, "credentials", "( Carbon.Auth.UsernameAndPasswordCredentials.Class | Carbon.Auth.LDAPCredentials.Class )[]" ), ():void => {
			const target:CredentialsSet.Class[ "credentials" ] = []  as ( UsernameAndPasswordCredentials.Class | LDAPCredentials.Class )[];
			expect( target ).toBeDefined();
		} );

	} );


	it( hasDefaultExport( "Carbon.Auth.CredentialsSet.Class" ), ():void => {
		const target:CredentialsSet.default = {} as CredentialsSet.Class;
		expect( target ).toBeDefined();
	} );

} );
