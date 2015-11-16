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

import * as Utils from "./../Utils";

import UsernameAndPasswordToken from "./UsernameAndPasswordToken";

import * as BasicAuthenticator from "./BasicAuthenticator";

describe( module( "Carbon/Auth/BasicAuthenticator" ), ():void => {
	it( isDefined(), ():void => {
		expect( BasicAuthenticator ).toBeDefined();
		expect( Utils.isObject( BasicAuthenticator ) ).toEqual( true );
	});

	describe( clazz( "Carbon.Auth.BasicAuthenticator.Class", `
		Authenticates requests using Basic Authentication
	`), ():void => {
		it( isDefined(), ():void => {
			expect( BasicAuthenticator.Class ).toBeDefined();
			expect( Utils.isFunction( BasicAuthenticator.Class ) ).toEqual( true );
		});

		it( hasConstructor(), ():void => {
			let authenticator:BasicAuthenticator.Class = new BasicAuthenticator.Class();

			expect( !! authenticator ).toEqual( true );
			expect( authenticator instanceof BasicAuthenticator.Class ).toEqual( true );
		});

		it( hasMethod( INSTANCE, "isAuthenticated", `
			returns true if the instance contains stored credentials.
		`, { type: "boolean" } ), ( done:() => void ):void => {
			let authenticator:BasicAuthenticator.Class = new BasicAuthenticator.Class();

			expect( authenticator.isAuthenticated ).toBeDefined();
			expect( Utils.isFunction( authenticator.isAuthenticated ) ).toBeDefined();

			expect( authenticator.isAuthenticated() ).toEqual( false );

			authenticator.authenticate( new UsernameAndPasswordToken( "foo", "foo" ) ).then( ():void => {
				expect( authenticator.isAuthenticated() ).toEqual( true );

				authenticator.clearAuthentication();

				expect( authenticator.isAuthenticated() ).toEqual( false );

				done();
			});
		});

		it( hasMethod( INSTANCE, "authenticate", `
			Stores credentials to authenticate future requests.
		`, [
			{ name: "authenticationToken", type: "Carbon.Auth.UsernameAndPasswordToken" }
		], { type: "Promise<void>" } ), ():void => {
			let authenticator:BasicAuthenticator.Class = new BasicAuthenticator.Class();

			expect( authenticator.authenticate ).toBeDefined();
			expect( Utils.isFunction( authenticator.authenticate ) ).toBeDefined();
		});
	});
});
