import {
	clazz,
	hasConstructor,
	hasProperty,
	INSTANCE,
	isDefined,
	module,
} from "../test/JasmineExtender";
import * as Utils from "./../Utils";

import { UsernameAndPasswordToken } from "./UsernameAndPasswordToken";

describe( module( "carbonldp/Auth/UsernameAndPasswordToken" ), ():void => {

	describe( clazz(
		"CarbonLDP.Auth.UsernameAndPasswordToken",
		"Wrapper to manage an Authentication Token in form of Username/Password."
	), ():void => {

		it( isDefined(), ():void => {
			expect( UsernameAndPasswordToken ).toBeDefined();
			expect( UsernameAndPasswordToken ).toEqual( jasmine.any( Function ) );
		} );

		it( hasConstructor( [
			{ name: "username", type: "string" },
			{ name: "password", type: "string" },
		] ), ():void => {
			let token:UsernameAndPasswordToken = new UsernameAndPasswordToken( "myUserName", "myPassword" );

			expect( token ).toBeTruthy();
			expect( token instanceof UsernameAndPasswordToken ).toBe( true );
		} );

		it( hasProperty(
			INSTANCE,
			"username",
			"string"
		), ():void => {
			let token:UsernameAndPasswordToken = new UsernameAndPasswordToken( "myUserName", "myPassword" );

			expect( token.username ).toBeDefined();
			expect( Utils.isString( token.username ) ).toBe( true );

			expect( token.username ).toBe( "myUserName" );
		} );

		it( hasProperty(
			INSTANCE,
			"password",
			"string"
		), ():void => {
			let token:UsernameAndPasswordToken = new UsernameAndPasswordToken( "myUserName", "myPassword" );

			expect( token.password ).toBeDefined();
			expect( Utils.isString( token.password ) ).toBe( true );

			expect( token.password ).toBe( "myPassword" );
		} );

	} );

} );

