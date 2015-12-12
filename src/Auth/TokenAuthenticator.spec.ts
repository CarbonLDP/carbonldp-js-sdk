/// <reference path="./../../typings/tsd.d.ts" />
/// <reference path="./../../typings/jasmine/jasmine.d.ts" />
/// <reference path="./../../typings/jasmine-ajax/mock-ajax.d.ts" />

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

		beforeEach( function ():void {
			jasmine.Ajax.install();
		} );

		afterEach( function ():void {
			jasmine.Ajax.uninstall();
		} );

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
			class DummyContext extends Context {}

			let authenticator:TokenAuthenticator.Class = new TokenAuthenticator.Class( new DummyContext() );

			expect( "isAuthenticated" in authenticator ).toEqual( true );
			expect( Utils.isFunction( authenticator.isAuthenticated ) ).toEqual( true );

			// TODO
		});

		it( hasMethod( INSTANCE, "authenticate", `
			Stores credentials to authenticate future requests.
		`, [
			{ name: "authenticationToken", type: "Carbon.Auth.UsernameAndPasswordToken" }
		], { type: "Promise<void>" } ), ( done:( error?:Error ) => void ):void => {
			class DummyContext extends Context {}
			let authenticator:TokenAuthenticator.Class = new TokenAuthenticator.Class( new DummyContext() );

			expect( "authenticate" in authenticator ).toEqual( true );
			expect( Utils.isFunction( authenticator.authenticate ) ).toEqual( true );

			let promises:Promise<void>[] = [];

			// Successful Authentication
			(() => {
				class SuccessfulContext extends Context {
					resolve( relativeURI:string ):string {
						return "http://example.com/successful/" + relativeURI;
					}
				}

				let expirationTime:Date = new Date();
				expirationTime.setDate( expirationTime.getDate() + 1 );
				jasmine.Ajax.stubRequest( "http://example.com/successful/auth-tokens/", null, "POST" ).andReturn( {
					status: 200,
					responseText: `
						{
							"@id": "",
							"@type": [
								"https://carbonldp.com/ns/v1/security#Token"
							],
							"https://carbonldp.com/ns/v1/security#tokenKey": "token-value",
							"https://carbonldp.com/ns/v1/security#expirationTime": {
								"@value": "${expirationTime.toISOString()}",
								"@type": "http://www.w3.org/2001/XMLSchema#dateTime"
							}
						}
					`
				} );

				let context:SuccessfulContext = new SuccessfulContext();
				let authenticator:TokenAuthenticator.Class = new TokenAuthenticator.Class( context );

				promises.push( authenticator.authenticate( new UsernameAndPasswordToken( "user", "pass" ) ).then( ():void => {
					expect( authenticator.isAuthenticated() ).toEqual( true );
				}) );
			})();

			// Unsuccessful Authentication
			(() => {
				class UnsuccessfulContext extends Context {
					resolve( relativeURI:string ):string {
						return "http://example.com/unsuccessful/" + relativeURI;
					}
				}

				let expirationTime:Date = new Date();
				expirationTime.setDate( expirationTime.getDate() + 1 );
				jasmine.Ajax.stubRequest( "http://example.com/unsuccessful/auth-tokens/", null, "POST" ).andReturn( {
					status: 401
				} );

				let context:UnsuccessfulContext = new UnsuccessfulContext();
				let authenticator:TokenAuthenticator.Class = new TokenAuthenticator.Class( context );

				promises.push( authenticator.authenticate( new UsernameAndPasswordToken( "user", "pass" ) ).then(
					() => {
						done( new Error( "The authentication should have been unsuccessful." ) );
					},
					( error:Error ) => {
						expect( error instanceof HTTP.Errors.UnauthorizedError ).toEqual( true );

						expect( authenticator.isAuthenticated() ).toEqual( false );
					}
				) );
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
		], { type: "Carbon.HTTP.Request.Options", description: "The request options with the added authentication headers." } ), (  done:( error?:Error ) => void ):void => {
			class DummyContext extends Context {}
			let authenticator:TokenAuthenticator.Class = new TokenAuthenticator.Class( new DummyContext() );

			expect( "addAuthentication" in authenticator ).toEqual( true );
			expect( Utils.isFunction( authenticator.addAuthentication ) ).toEqual( true );

			let promises:Promise<void>[] = [];

			// Successful Authentication
			(() => {
				class SuccessfulContext extends Context {
					resolve( relativeURI:string ):string {
						return "http://example.com/successful/" + relativeURI;
					}
				}

				let expirationTime:Date = new Date();
				expirationTime.setDate( expirationTime.getDate() + 1 );
				jasmine.Ajax.stubRequest( "http://example.com/successful/auth-tokens/", null, "POST" ).andReturn( {
					status: 200,
					// TODO: Change this line to a multi line (right now its throwing ParseError on PhantomJS
					responseText: '' +
						'{' +
						'	"@id": "",' +
						'	"@type": [' +
						'		"https://carbonldp.com/ns/v1/security#Token"' +
						'	],' +
						'	"https://carbonldp.com/ns/v1/security#tokenKey": "token-value",' +
						'	"https://carbonldp.com/ns/v1/security#expirationTime": {' +
						'		"@value": "' + expirationTime.toISOString() + ',' +
						'		"@type": "http://www.w3.org/2001/XMLSchema#dateTime"' +
						'	}' +
						'}'
				} );

				let context:SuccessfulContext = new SuccessfulContext();
				let authenticator:TokenAuthenticator.Class = new TokenAuthenticator.Class( context );

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

					expect( Utils.S.startsWith( authorization, "Token " ) ).toEqual( true );
					expect( atob( authorization.substring( 6 ) ) ).toEqual( "token-value" );
				}) );
			})();

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
			class DummyContext extends Context {}
			let authenticator:TokenAuthenticator.Class = new TokenAuthenticator.Class( new DummyContext() );

			expect( "clearAuthentication" in authenticator ).toEqual( true );
			expect( Utils.isFunction( authenticator.clearAuthentication ) ).toEqual( true );

			let promises:Promise<void>[] = [];

			// Successful Authentication
			(() => {
				class SuccessfulContext extends Context {
					resolve( relativeURI:string ):string {
						return "http://example.com/successful/" + relativeURI;
					}
				}

				let expirationTime:Date = new Date();
				expirationTime.setDate( expirationTime.getDate() + 1 );
				jasmine.Ajax.stubRequest( "http://example.com/successful/auth-tokens/", null, "POST" ).andReturn( {
					status: 200,
					// TODO: Change this line to a multi line (right now its throwing ParseError on PhantomJS
					responseText: '' +
					'{' +
					'	"@id": "",' +
					'	"@type": [' +
					'		"https://carbonldp.com/ns/v1/security#Token"' +
					'	],' +
					'	"https://carbonldp.com/ns/v1/security#tokenKey": "token-value",' +
					'	"https://carbonldp.com/ns/v1/security#expirationTime": {' +
					'		"@value": "' + expirationTime.toISOString() + ',' +
					'		"@type": "http://www.w3.org/2001/XMLSchema#dateTime"' +
					'	}' +
					'}'
				} );

				let context:SuccessfulContext = new SuccessfulContext();
				let authenticator:TokenAuthenticator.Class = new TokenAuthenticator.Class( context );

				promises.push( authenticator.authenticate( new UsernameAndPasswordToken( "user", "pass" ) ).then( ():void => {
					expect( authenticator.isAuthenticated() ).toEqual( true );

					authenticator.clearAuthentication();

					expect( authenticator.isAuthenticated() ).toEqual( false );
				}) );
			})();

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
			class DummyContext extends Context {}
			let authenticator:TokenAuthenticator.Class = new TokenAuthenticator.Class( new DummyContext() );

			expect( authenticator.supports ).toBeDefined();
			expect( Utils.isFunction( authenticator.supports ) ).toEqual( true );

			class DummyToken implements AuthenticationToken {}

			expect( authenticator.supports( new UsernameAndPasswordToken( "user", "pass" ) ) ).toEqual( true );
			expect( authenticator.supports( new DummyToken() ) ).toEqual( false );
		});
	});
});
