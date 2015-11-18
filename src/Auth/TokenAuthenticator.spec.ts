/// <reference path="../../typings/jasmine/jasmine.d.ts" />
/// <reference path="../../typings/jasmine-ajax/mock-ajax.d.ts" />
/// <reference path="../../typings/es6/es6.d.ts" />
/// <reference path="../../typings/es6-promise/es6-promise.d.ts" />

import {
		INSTANCE,
		STATIC,

		module,
		submodule,

		isDefined,

		interfaze,
		clazz,
		method,

		hasConstructor,
		hasMethod,
		hasSignature,
		hasProperty,
		hasInterface,
		extendsClass,

		MethodArgument,
} from "./../test/JasmineExtender";

import Context from "./../Context";
import * as Errors from "./../Errors";
import * as HTTP from "./../HTTP";
import * as Utils from "./../Utils";

import AuthenticationToken from "./AuthenticationToken";
import UsernameAndPasswordToken from "./UsernameAndPasswordToken";

import * as TokenAuthenticator from "./TokenAuthenticator";

describe( module( "Carbon/Auth/TokenAuthenticator" ), ():void => {
	it( isDefined(), ():void => {
		expect( TokenAuthenticator ).toBeDefined();
		expect( Utils.isObject( TokenAuthenticator ) ).toEqual( true );
	});

	describe( clazz( "Carbon.Auth.TokenAuthenticator.Class", `
		Authenticates requests using Basic Authentication
	`), ():void => {
		it( isDefined(), ():void => {
			expect( TokenAuthenticator.Class ).toBeDefined();
			expect( Utils.isFunction( TokenAuthenticator.Class ) ).toEqual( true );
		});

		it( hasConstructor(
			[
				{ name: "context", type: "Carbon.Context", description: "The context where to authenticate the agent." }
			]
		), ():void => {
			class DummyContext extends Context {}

			let authenticator:TokenAuthenticator.Class = new TokenAuthenticator.Class( new DummyContext() );

			expect( !! authenticator ).toEqual( true );
			expect( authenticator instanceof TokenAuthenticator.Class ).toEqual( true );
		});

		it( hasMethod( INSTANCE, "isAuthenticated", `
			returns true if the instance contains stored credentials.
		`, { type: "boolean" } ), ():void => {
			// TODO
		});

		it( hasMethod( INSTANCE, "authenticate", `
			Stores credentials to authenticate future requests.
		`, [
			{ name: "authenticationToken", type: "Carbon.Auth.UsernameAndPasswordToken" }
		], { type: "Promise<void>" } ), ():void => {
			// TODO
		});

		it( hasMethod( INSTANCE, "addAuthentication", `
			Adds the Basic authentication header to the passed request options object.
		`, [
			{ name: "requestOptions", type:"Carbon.HTTP.Request.Options", description: "Request options object to add Authentication headers." }
		], { type: "Carbon.HTTP.Request.Options", description: "The request options with the added authentication headers." } ), ():void => {
			// TODO
		});

		it( hasMethod( INSTANCE, "clearAuthentication", `
			Clears any saved credentials and restores the Authenticator to its initial state.
		` ), ():void => {
			// TODO
		});

		it( hasMethod( INSTANCE, "supports",
			`Returns true if the Authenticator supports the AuthenticationToken.`,
			[
				{ name: "authenticationToken", type: "Carbon.Auth.AuthenticationToken" }
			],
			{ type: "boolean" }
		), ():void => {
			// TODO
		});
	});
});
