import {
	clazz,
	hasConstructor,
	hasDefaultExport,
	hasProperty,
	INSTANCE,
	isDefined,
	module,
} from "../test/JasmineExtender";
import * as Utils from "./../Utils";

import * as BasicCredentials from "./BasicCredentials";

describe( module( "Carbon/Auth/BasicCredentials" ), ():void => {

	it( isDefined(), ():void => {
		expect( BasicCredentials ).toBeDefined();
		expect( Utils.isObject( BasicCredentials ) ).toBe( true );
	} );

	describe( clazz(
		"Carbon.Auth.BasicCredentials.Class",
		"Wrapper to manage Authentication Credentials in form of Username/Password."
	), ():void => {

		it( isDefined(), ():void => {
			expect( BasicCredentials.Class ).toBeDefined();
			expect( Utils.isFunction( BasicCredentials.Class ) ).toBe( true );
		} );

		it( hasConstructor( [
			{ name: "username", type: "string" },
			{ name: "password", type: "string" },
		] ), ():void => {
			let token:BasicCredentials.Class = new BasicCredentials.Class( "myUserName", "myPassword" );

			expect( token ).toBeTruthy();
			expect( token instanceof BasicCredentials.Class ).toBe( true );
		} );

		it( hasProperty(
			INSTANCE,
			"username",
			"string"
		), ():void => {
			let token:BasicCredentials.Class = new BasicCredentials.Class( "myUserName", "myPassword" );

			expect( token.username ).toBeDefined();
			expect( Utils.isString( token.username ) ).toBe( true );

			expect( token.username ).toBe( "myUserName" );
		} );

		it( hasProperty(
			INSTANCE,
			"password",
			"string"
		), ():void => {
			let token:BasicCredentials.Class = new BasicCredentials.Class( "myUserName", "myPassword" );

			expect( token.password ).toBeDefined();
			expect( Utils.isString( token.password ) ).toBe( true );

			expect( token.password ).toBe( "myPassword" );
		} );

	} );

	it( hasDefaultExport( "Carbon.Auth.BasicCredentials.Class" ), ():void => {
		expect( BasicCredentials.default ).toBeDefined();
		expect( BasicCredentials.default ).toBe( BasicCredentials.Class );
	} );

} );

