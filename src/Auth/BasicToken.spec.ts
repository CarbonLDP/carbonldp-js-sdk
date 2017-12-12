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

import * as BasicToken from "./BasicToken";

describe( module( "Carbon/Auth/BasicToken" ), ():void => {

	it( isDefined(), ():void => {
		expect( BasicToken ).toBeDefined();
		expect( Utils.isObject( BasicToken ) ).toBe( true );
	} );

	describe( clazz(
		"Carbon.Auth.BasicToken.Class",
		"Wrapper to manage an Authentication Token in form of Username/Password.", [
			"Carbon.Auth.AuthenticationToken.Class",
		]
	), ():void => {

		it( isDefined(), ():void => {
			expect( BasicToken.Class ).toBeDefined();
			expect( Utils.isFunction( BasicToken.Class ) ).toBe( true );
		} );

		it( hasConstructor( [
			{ name: "username", type: "string" },
			{ name: "password", type: "string" },
		] ), ():void => {
			let token:BasicToken.Class = new BasicToken.Class( "myUserName", "myPassword" );

			expect( token ).toBeTruthy();
			expect( token instanceof BasicToken.Class ).toBe( true );
		} );

		it( hasProperty(
			INSTANCE,
			"username",
			"string"
		), ():void => {
			let token:BasicToken.Class = new BasicToken.Class( "myUserName", "myPassword" );

			expect( token.username ).toBeDefined();
			expect( Utils.isString( token.username ) ).toBe( true );

			expect( token.username ).toBe( "myUserName" );
		} );

		it( hasProperty(
			INSTANCE,
			"password",
			"string"
		), ():void => {
			let token:BasicToken.Class = new BasicToken.Class( "myUserName", "myPassword" );

			expect( token.password ).toBeDefined();
			expect( Utils.isString( token.password ) ).toBe( true );

			expect( token.password ).toBe( "myPassword" );
		} );

	} );

	it( hasDefaultExport( "Carbon.Auth.BasicToken.Class" ), ():void => {
		expect( BasicToken.default ).toBeDefined();
		expect( BasicToken.default ).toBe( BasicToken.Class );
	} );

} );

