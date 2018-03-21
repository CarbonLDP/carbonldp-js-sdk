import {
	clazz,
	hasConstructor,
	hasProperty,
	INSTANCE,
	isDefined,
	module,
} from "../test/JasmineExtender";
import * as Utils from "./../Utils";

import { BasicCredentials } from "./BasicCredentials";

describe( module( "Carbon/Auth/BasicCredentials" ), ():void => {

	describe( clazz(
		"CarbonLDP.Auth.BasicCredentials",
		"Wrapper to manage Authentication Credentials in form of Username/Password."
	), ():void => {

		it( isDefined(), ():void => {
			expect( BasicCredentials ).toBeDefined();
			expect( Utils.isFunction( BasicCredentials ) ).toBe( true );
		} );

		it( hasConstructor( [
			{ name: "username", type: "string" },
			{ name: "password", type: "string" },
		] ), ():void => {
			let token:BasicCredentials = new BasicCredentials( "myUserName", "myPassword" );

			expect( token ).toBeTruthy();
			expect( token instanceof BasicCredentials ).toBe( true );
		} );

		it( hasProperty(
			INSTANCE,
			"username",
			"string"
		), ():void => {
			let token:BasicCredentials = new BasicCredentials( "myUserName", "myPassword" );

			expect( token.username ).toBeDefined();
			expect( Utils.isString( token.username ) ).toBe( true );

			expect( token.username ).toBe( "myUserName" );
		} );

		it( hasProperty(
			INSTANCE,
			"password",
			"string"
		), ():void => {
			let token:BasicCredentials = new BasicCredentials( "myUserName", "myPassword" );

			expect( token.password ).toBeDefined();
			expect( Utils.isString( token.password ) ).toBe( true );

			expect( token.password ).toBe( "myPassword" );
		} );

	} );

} );

