import {
	clazz,
	hasConstructor,
	hasProperty,
	INSTANCE,
	isDefined,
	module,
} from "../test/JasmineExtender";
import * as Utils from "./../Utils";

import { BasicToken } from "./BasicToken";

describe( module( "Carbon/Auth/BasicToken" ), ():void => {

	describe( clazz(
		"CarbonLDP.Auth.BasicToken",
		"Wrapper to manage an Authentication Token in form of Username/Password."
	), ():void => {

		it( isDefined(), ():void => {
			expect( BasicToken ).toBeDefined();
			expect( Utils.isFunction( BasicToken ) ).toBe( true );
		} );

		it( hasConstructor( [
			{ name: "username", type: "string" },
			{ name: "password", type: "string" },
		] ), ():void => {
			let token:BasicToken = new BasicToken( "myUserName", "myPassword" );

			expect( token ).toBeTruthy();
			expect( token instanceof BasicToken ).toBe( true );
		} );

		it( hasProperty(
			INSTANCE,
			"username",
			"string"
		), ():void => {
			let token:BasicToken = new BasicToken( "myUserName", "myPassword" );

			expect( token.username ).toBeDefined();
			expect( Utils.isString( token.username ) ).toBe( true );

			expect( token.username ).toBe( "myUserName" );
		} );

		it( hasProperty(
			INSTANCE,
			"password",
			"string"
		), ():void => {
			let token:BasicToken = new BasicToken( "myUserName", "myPassword" );

			expect( token.password ).toBeDefined();
			expect( Utils.isString( token.password ) ).toBe( true );

			expect( token.password ).toBe( "myPassword" );
		} );

	} );

} );

