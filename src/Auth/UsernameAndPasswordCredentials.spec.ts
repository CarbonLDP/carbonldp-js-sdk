import {
	clazz,
	hasConstructor,
	hasProperty,
	INSTANCE,
	isDefined,
	module,
} from "../test/JasmineExtender";

import { UsernameAndPasswordCredentials } from "./UsernameAndPasswordCredentials";

describe( module( "carbonldp/Auth/UsernameAndPasswordCredentials" ), ():void => {

	describe( clazz(
		"CarbonLDP.Auth.UsernameAndPasswordCredentials",
		"Wrapper to manage Authentication Credentials in form of Username/Password."
	), ():void => {

		it( isDefined(), ():void => {
			expect( UsernameAndPasswordCredentials ).toBeDefined();
			expect( UsernameAndPasswordCredentials ).toEqual( jasmine.any( Function ) );
		} );

		it( hasConstructor( [
			{ name: "username", type: "string" },
			{ name: "password", type: "string" },
		] ), ():void => {
			let token:UsernameAndPasswordCredentials = new UsernameAndPasswordCredentials( "myUserName", "myPassword" );

			expect( token ).toBeTruthy();
			expect( token instanceof UsernameAndPasswordCredentials ).toBe( true );
		} );

		it( hasProperty(
			INSTANCE,
			"username",
			"string"
		), ():void => {
			let token:UsernameAndPasswordCredentials = new UsernameAndPasswordCredentials( "myUserName", "myPassword" );

			expect( token.username ).toBeDefined();
			expect( token.username ).toEqual( jasmine.any( String ) );

			expect( token.username ).toBe( "myUserName" );
		} );

		it( hasProperty(
			INSTANCE,
			"password",
			"string"
		), ():void => {
			let token:UsernameAndPasswordCredentials = new UsernameAndPasswordCredentials( "myUserName", "myPassword" );

			expect( token.password ).toBeDefined();
			expect( token.password ).toEqual( jasmine.any( String ) );

			expect( token.password ).toBe( "myPassword" );
		} );

	} );

} );

