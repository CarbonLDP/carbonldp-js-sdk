import {
	INSTANCE,

	module,
	clazz,

	isDefined,
	hasConstructor,
	hasProperty,
	hasDefaultExport,
} from "./../test/JasmineExtender";
import * as Utils from "./../Utils";

import * as UsernameAndPasswordCredentials from "./UsernameAndPasswordCredentials";
import DefaultExport from "./UsernameAndPasswordCredentials";

describe( module( "Carbon/Auth/UsernameAndPasswordCredentials" ), ():void => {

	it( isDefined(), ():void => {
		expect( UsernameAndPasswordCredentials ).toBeDefined();
		expect( Utils.isObject( UsernameAndPasswordCredentials ) ).toBe( true );
	} );

	describe( clazz(
		"Carbon.Auth.UsernameAndPasswordCredentials.Class",
		"Wrapper to manage Authentication Credentials in form of Username/Password."
	), ():void => {

		it( isDefined(), ():void => {
			expect( UsernameAndPasswordCredentials.Class ).toBeDefined();
			expect( Utils.isFunction( UsernameAndPasswordCredentials.Class ) ).toBe( true );
		} );

		it( hasConstructor( [
			{name: "username", type: "string"},
			{name: "password", type: "string"},
		] ), ():void => {
			let token:UsernameAndPasswordCredentials.Class = new UsernameAndPasswordCredentials.Class( "myUserName", "myPassword" );

			expect( token ).toBeTruthy();
			expect( token instanceof UsernameAndPasswordCredentials.Class ).toBe( true );
		} );

		it( hasProperty(
			INSTANCE,
			"username",
			"string"
		), ():void => {
			let token:UsernameAndPasswordCredentials.Class = new UsernameAndPasswordCredentials.Class( "myUserName", "myPassword" );

			expect( token.username ).toBeDefined();
			expect( Utils.isString( token.username ) ).toBe( true );

			expect( token.username ).toBe( "myUserName" );
		} );

		it( hasProperty(
			INSTANCE,
			"password",
			"string"
		), ():void => {
			let token:UsernameAndPasswordCredentials.Class = new UsernameAndPasswordCredentials.Class( "myUserName", "myPassword" );

			expect( token.password ).toBeDefined();
			expect( Utils.isString( token.password ) ).toBe( true );

			expect( token.password ).toBe( "myPassword" );
		} );

	} );

	it( hasDefaultExport( "Carbon.Auth.UsernameAndPasswordCredentials.Class" ), ():void => {
		expect( DefaultExport ).toBeDefined();
		expect( DefaultExport ).toBe( UsernameAndPasswordCredentials.Class );
	} );

} );

