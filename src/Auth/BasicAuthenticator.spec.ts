/// <reference path="./../../typings/typings.d.ts" />

import {
	INSTANCE,
	STATIC,

	module,

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

import * as Errors from "./../Errors";
import * as HTTP from "./../HTTP";
import * as Utils from "./../Utils";

import AuthenticationToken from "./AuthenticationToken";
import UsernameAndPasswordToken from "./UsernameAndPasswordToken";
import * as UsernameAndPasswordCredentials from "./UsernameAndPasswordCredentials";

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
		], { type: "Promise<void>" } ), ( done:( error?:Error ) => void ):void => {

			// Property Integrity
			(() => {
				let authenticator:BasicAuthenticator.Class = new BasicAuthenticator.Class();

				expect( authenticator.authenticate ).toBeDefined();
				expect( Utils.isFunction( authenticator.authenticate ) ).toEqual( true );
			})();

			let promises:Promise<any>[] = [];

			// Successful Authentication
			(() => {
				let authenticator:BasicAuthenticator.Class = new BasicAuthenticator.Class();
				let promise:Promise<UsernameAndPasswordCredentials.Class>;
				promise = authenticator.authenticate( new UsernameAndPasswordToken( "foo", "foo" ) );

				expect( !! promise ).toEqual( true );
				expect( promise instanceof Promise ).toEqual( true );

				promises.push( promise.then( ( credentials: UsernameAndPasswordCredentials.Class ):void => {
					expect( authenticator.isAuthenticated() ).toEqual( true );

					expect( credentials ).toBeDefined();
					expect( credentials ).not.toBeNull();

					expect( "username" in credentials ).toEqual( true );
					expect( !! credentials.username ).toEqual( true );
					expect( Utils.isString( credentials.username ) ).toEqual( true );

					expect( "password" in credentials ).toEqual( true );
					expect( !! credentials.password ).toEqual( true );
					expect( Utils.isString( credentials.password ) ).toEqual( true );
				}, done ) );
			})();

			(() => {
				let unsuccessfulAuthenticator:BasicAuthenticator.Class = new BasicAuthenticator.Class();
				let promise:Promise<UsernameAndPasswordCredentials.Class>;
				promise = unsuccessfulAuthenticator.authenticate( new UsernameAndPasswordToken( null, null ) );

				expect( !! promise ).toEqual( true );
				expect( promise instanceof Promise ).toEqual( true );

				promises.push( promise.then( ():void => {
					done( new Error( "Promise should have failed." ) );
				}, ( error:Error ):void => {
					expect( error instanceof Errors.IllegalArgumentError ).toEqual( true );

					expect( unsuccessfulAuthenticator.isAuthenticated() ).toEqual( false );
					return;
				}) );
			})();

			Promise.all( promises ).then( ():void => {
				done();
			}, ( error:Error ):void => {
				done( error );
			});
		});

		it( hasMethod( INSTANCE, "addAuthentication", `
			Adds the Basic authentication header to the passed request options object.
		`, [
			{ name: "requestOptions", type:"Carbon.HTTP.Request.Options", description: "Request options object to add Authentication headers." }
		], { type: "Carbon.HTTP.Request.Options", description: "The request options with the added authentication headers." } ), ( done:( error?:Error ) => void ):void => {
			let promises:Promise<void>[] = [];
			let authenticator:BasicAuthenticator.Class = new BasicAuthenticator.Class();

			expect( authenticator.addAuthentication ).toBeDefined();
			expect( Utils.isFunction( authenticator.addAuthentication ) ).toEqual( true );

			expect( ():void => {
				authenticator.addAuthentication( {} );
			}).toThrow( new Errors.IllegalStateError( "The authenticator isn't authenticated." ) );

			promises.push( authenticator.authenticate( new UsernameAndPasswordToken( "user", "pass" ) ).then( ():void => {
				let requestOptions = authenticator.addAuthentication( {} );

				expect( !! requestOptions ).toEqual( true );
				expect( Utils.isObject( requestOptions ) ).toEqual( true );
				expect( "headers" in requestOptions ).toEqual( true );
				expect( requestOptions.headers instanceof Map ).toEqual( true );
				expect( requestOptions.headers.has( "Authorization" ) ).toEqual( true );

				let authorizationHeader:HTTP.Header.Class = requestOptions.headers.get( "Authorization" );

				expect( authorizationHeader instanceof HTTP.Header.Class ).toEqual( true );
				expect( authorizationHeader.values.length ).toEqual( 1 );

				let authorization:string = authorizationHeader.toString();

				expect( Utils.S.startsWith( authorization, "Basic " ) ).toEqual( true );
				expect( atob( authorization.substring( 6 ) ) ).toEqual( "user:pass" );
			}, done ));

			// TODO: Test case where other headers are already provided
			// TODO: Test case where an Authorization header is already provided, but no Basic authentication value is
			// TODO: Test another case where a Basic Authorization header is already provided

			Promise.all( promises ).then( ():void => {
				done();
			}, ( error:Error ):void => {
				done( error );
			});
		});

		it( hasMethod( INSTANCE, "clearAuthentication", `
			Clears any saved credentials and restores the Authenticator to its initial state.
		` ), ( done:( error?:Error ) => void ):void => {
			let promises:Promise<void>[] = [];
			let authenticator:BasicAuthenticator.Class = new BasicAuthenticator.Class();

			expect( authenticator.clearAuthentication ).toBeDefined();
			expect( Utils.isFunction( authenticator.clearAuthentication ) ).toEqual( true );

			// Expect not to throw an error
			authenticator.clearAuthentication();

			promises.push( authenticator.authenticate( new UsernameAndPasswordToken( "user", "pass" ) ).then( ():void => {
				expect( authenticator.isAuthenticated() ).toEqual( true );

				authenticator.clearAuthentication();

				expect( authenticator.isAuthenticated() ).toEqual( false );
			}, done ));

			Promise.all( promises ).then( ():void => {
				done();
			}, ( error:Error ):void => {
				done( error );
			});
		});

		it( hasMethod( INSTANCE, "supports",
			`Returns true if the Authenticator supports the AuthenticationToken.`,
			[
				{ name: "authenticationToken", type: "Carbon.Auth.AuthenticationToken" }
			],
			{ type: "boolean" }
		), ():void => {
			let authenticator:BasicAuthenticator.Class = new BasicAuthenticator.Class();

			expect( authenticator.supports ).toBeDefined();
			expect( Utils.isFunction( authenticator.supports ) ).toEqual( true );

			class DummyToken implements AuthenticationToken {}

			expect( authenticator.supports( new UsernameAndPasswordToken( "user", "pass" ) ) ).toEqual( true );
			expect( authenticator.supports( new DummyToken() ) ).toEqual( false );
		});
	});
});
