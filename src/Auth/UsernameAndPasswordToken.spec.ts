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

import * as UsernameAndPasswordToken from "./UsernameAndPasswordToken";
import DefaultExport from "./UsernameAndPasswordToken";

describe( module( "CarbonLDP/Auth/UsernameAndPasswordToken" ), ():void => {

	it( isDefined(), ():void => {
		expect( UsernameAndPasswordToken ).toBeDefined();
		expect( Utils.isObject( UsernameAndPasswordToken ) ).toBe( true );
	} );

	describe( clazz(
		"CarbonLDP.Auth.UsernameAndPasswordToken.Class",
		"Wrapper to manage an Authentication Token in form of Username/Password.", [
			"CarbonLDP.Auth.AuthenticationToken.Class",
		]
	), ():void => {

		it( isDefined(), ():void => {
			expect( UsernameAndPasswordToken.Class ).toBeDefined();
			expect( Utils.isFunction( UsernameAndPasswordToken.Class ) ).toBe( true );
		} );

		it( hasConstructor( [
			{name: "username", type: "string"},
			{name: "password", type: "string"},
		] ), ():void => {
			let token:UsernameAndPasswordToken.Class = new UsernameAndPasswordToken.Class( "myUserName", "myPassword" );

			expect( token ).toBeTruthy();
			expect( token instanceof UsernameAndPasswordToken.Class ).toBe( true );
		} );

		it( hasProperty(
			INSTANCE,
			"username",
			"string"
		), ():void => {
			let token:UsernameAndPasswordToken.Class = new UsernameAndPasswordToken.Class( "myUserName", "myPassword" );

			expect( token.username ).toBeDefined();
			expect( Utils.isString( token.username ) ).toBe( true );

			expect( token.username ).toBe( "myUserName" );
		} );

		it( hasProperty(
			INSTANCE,
			"password",
			"string"
		), ():void => {
			let token:UsernameAndPasswordToken.Class = new UsernameAndPasswordToken.Class( "myUserName", "myPassword" );

			expect( token.password ).toBeDefined();
			expect( Utils.isString( token.password ) ).toBe( true );

			expect( token.password ).toBe( "myPassword" );
		} );

	} );

	it( hasDefaultExport( "CarbonLDP.Auth.UsernameAndPasswordToken.Class" ), ():void => {
		expect( DefaultExport ).toBeDefined();
		expect( DefaultExport ).toBe( UsernameAndPasswordToken.Class );
	} );

} );

