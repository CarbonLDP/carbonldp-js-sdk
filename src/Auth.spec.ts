/// <reference path="./../typings/typings.d.ts" />

import {
	INSTANCE,
	STATIC,

	module,
	clazz,
	enumeration,
	method,

	isDefined,
	hasConstructor,
	hasMethod,
	hasProperty,
	extendsClass,
	hasDefaultExport,
	reexports,
	hasEnumeral,
	hasSignature
} from "./test/JasmineExtender";
import * as Utils from "./Utils";
import AbstractContext from "./AbstractContext";
import * as App from "./App";
import AuthenticationToken from "./Auth/AuthenticationToken";
import Authenticator from "./Auth/Authenticator";
import BasicAuthenticator from "./Auth/BasicAuthenticator";
import * as Token from "./Auth/Token";
import TokenAuthenticator from "./Auth/TokenAuthenticator";
import UsernameAndPasswordToken from "./Auth/UsernameAndPasswordToken";
import UsernameAndPasswordCredentials from "./Auth/UsernameAndPasswordCredentials";
import TokenCredentials from "./Auth/TokenCredentials";
import Credentials from "./Auth/Credentials";
import Context from "./Context";
import * as Errors from "./Errors";
import * as Pointer from "./Pointer";

import * as Auth from "./Auth";
import DefaultExport from "./Auth";

describe( module( "Carbon/Auth" ), ():void => {

	it( isDefined(), ():void => {
		expect( Auth ).toBeDefined();
		expect( Utils.isObject( Auth ) ).toBe( true );
	});

	it( reexports(
		STATIC,
		"AuthenticationToken",
		"Carbon.Auth.AuthenticationToken"
	), ():void => {
	});

	it( reexports(
		STATIC,
		"Authenticator",
		"Carbon.Auth.Authenticator"
	), ():void => {
	});

	it( reexports(
		STATIC,
		"BasicAuthenticator",
		"Carbon.Auth.BasicAuthenticator"
	), ():void => {
		expect( Auth.BasicAuthenticator ).toBeDefined();
		expect( Auth.BasicAuthenticator ).toBe( BasicAuthenticator );
	});

	it( reexports(
		STATIC,
		"Token",
		"Carbon.Auth.Token"
	), ():void => {
		expect( Auth.Token ).toBeDefined();
		expect( Auth.Token ).toBe( Token );
	});

	it( reexports(
		STATIC,
		"TokenAuthenticator",
		"Carbon.Auth.TokenAuthenticator"
	), ():void => {
		expect( Auth.TokenAuthenticator ).toBeDefined();
		expect( Auth.TokenAuthenticator ).toBe( TokenAuthenticator );
	});

	it( reexports(
		STATIC,
		"UsernameAndPasswordToken",
		"Carbon.Auth.UsernameAndPasswordToken"
	), ():void => {
		expect( Auth.UsernameAndPasswordToken ).toBeDefined();
		expect( Auth.UsernameAndPasswordToken ).toBe( UsernameAndPasswordToken );
	});

	describe( enumeration(
		"Carbon.Auth.Method",
		"Enum with for the methods of authentication supported"
	), ():void => {

		it( isDefined(), ():void => {
			expect( Auth.Method ).toBeDefined();
			expect( Utils.isObject( Auth.Method ) ).toBe( true );
		});

		it( hasEnumeral(
			"BASIC",
			"HTTP Basic authentication sending the `username` and `password` in every call."
		), ():void => {
			expect( Auth.Method.BASIC ).toBeDefined();
		});

		it( hasEnumeral(
			"TOKEN",
			"Authentication with `username` and `password` generating a token that will be sent in every call."
		), ():void => {
			expect( Auth.Method.TOKEN ).toBeDefined();
		});

	});

	describe( clazz(
		"Carbon.Auth.Class",
		"Class for manage all the methods of authentication."
	), ():void => {

		it( isDefined(), ():void => {
			expect( Auth.Class ).toBeDefined();
			expect( Utils.isFunction( Auth.Class ) ).toBe( true );
		});

		it( hasConstructor(), ():void => {
			let context:AbstractContext;
			class MockedContext extends AbstractContext {
				resolve( uri:string ) {
					return uri;
				}
			}
			context = new MockedContext();

			let auth = new Auth.Class( context );

			expect( auth ).toBeTruthy();
			expect( auth instanceof Auth.Class ).toBe( true );
		});

		it( hasMethod(
			INSTANCE,
			"isAuthenticated",
			"Returns true the user is authenticated.", [
				{ name: "askParent", type: "boolean", optional: true, default: "true" }
			],
			{ type: "boolean" }
		), ():void => {
			// TODO test
		});

		it( hasMethod(
			INSTANCE,
			"authenticate",
			"Authenticate the user with an `username` and `password`. Uses the `TOKEN` method for the authentication.", [
				{ name: "username", type: "string" },
				{ name: "password", type: "string" }
			],
			{ type: "Promise<Carbon.Auth.Credentials>" }
		), ():void => {
			class MockedContext extends AbstractContext {
				resolve( uri:string ) {
					return uri;
				}
			}
			let context = new MockedContext();

			let auth = new Auth.Class( context );

			expect( auth.authenticate ).toBeDefined();
			expect( Utils.isFunction( auth.authenticate ) ).toBe( true );

			let spy = spyOn( auth, "authenticateUsing" );

			auth.authenticate( "myUer@user.com", "myAwesomePassword" );

			expect( spy ).toHaveBeenCalledWith( "TOKEN", "myUer@user.com", "myAwesomePassword" );
		});

		describe( method(
			INSTANCE,
			"authenticateUsing"
		), ():void => {
			let context:AbstractContext;
			let auth:Auth.Class;

			beforeEach( ():void => {
				class MockedContext extends AbstractContext {
					resolve( uri:string ) {
						return uri;
					}
				}
				context = new MockedContext();

				auth = new Auth.Class( context );

				jasmine.Ajax.install();
			});

			afterEach( ():void => {
				jasmine.Ajax.uninstall();
			});

			it( hasSignature(
				"Authenticates the user with Basic HTTP Authentication, witch uses encoded username and password.", [
					{ name: "method", type: "'BASIC'" },
					{ name: "username", type: "string" },
					{ name: "password", type: "string" }
				],
				{ type: "Promise<Carbon.Auth.UsernameAndPasswordCredentials.Class>"}
			), ( done:{ ():void, fail:() => void } ):void => {
				expect( auth.authenticateUsing ).toBeDefined();
				expect( Utils.isFunction( auth.authenticateUsing ) ).toBe( true );
				expect( auth.isAuthenticated() ).toBe( false );

				let username = "myUser@user.com";
				let password = "myAwesomePassword";
				let promises:Promise<any>[] = [];
				let promise:Promise<any>;
				let spies = {
					success: ( credentials:UsernameAndPasswordCredentials ):void => {
						expect( auth.isAuthenticated() ).toBe( true );
						expect( credentials.username ).toEqual( username );
						expect( credentials.password ).toEqual( password );
					},
					fail: ( error ):void => {
						expect( error.name ).toBe( Errors.IllegalArgumentError.name );
					}
				};
				let spySuccess = spyOn( spies, "success" ).and.callThrough();
				let spyFail = spyOn( spies, "fail" ).and.callThrough();

				promise = auth.authenticateUsing( "BASIC", username, password );
				expect( promise instanceof Promise ).toBe( true );
				promises.push( promise.then( spies.success, spies.fail ) );


				let auth2 = new Auth.Class( context );
				promise = auth2.authenticateUsing( "BASIC", {} );
				expect( promise instanceof Promise ).toBe( true );
				promises.push( promise.then( spies.success, spies.fail ) );

				let auth3 = new Auth.Class( context );
				promise = auth3.authenticateUsing( "Error", username, password );
				expect( promise instanceof Promise ).toBe( true );
				promises.push( promise.then( spies.success, spies.fail ) );

				Promise.all( promises ).then( ():void => {
					expect( spySuccess.calls.count() ).toBe( 1 );
					expect( spyFail.calls.count() ).toBe( 2 );
					done();
				}, done.fail );
			});

			it( hasSignature(
				"Authenticates the user with username and password, for generate a JSON Web Token (JWT).", [
					{ name: "method", type: "'TOKEN'" },
					{ name: "username", type: "string" },
					{ name: "password", type: "string" }
				],
				{ type: "Promise<Carbon.Auth.TokenCredentials.Class>"}
			), ( done:{ ():void, fail:() => void } ):void => {
				expect( auth.authenticateUsing ).toBeDefined();
				expect( Utils.isFunction( auth.authenticateUsing ) ).toBe( true );
				expect( auth.isAuthenticated() ).toBe( false );

				let date:Date = new Date();
				date.setDate( date.getDate() + 1 );
				let token = [
					{
						"@id": "_:BlankNode",
						"@type": [
							"https://carbonldp.com/ns/v1/security#Token",
							"https://carbonldp.com/ns/v1/platform#VolatileResource"
						],
						"https://carbonldp.com/ns/v1/security#expirationTime": [
							{
								"@type": "http://www.w3.org/2001/XMLSchema#dateTime",
								"@value": date
							}
						],
						"https://carbonldp.com/ns/v1/security#tokenKey": [
							{
								"@value": "eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJodHRwczovL2V4YW1wbGUuY29tL3VzZXJzL2EtdXNlci8iLCJleHAiOjExNDkxMjAwMDAwMDB9.T8XSFKyiT-5PAx_yxv2uY94nfvx65zWz8mI2OlSUFnE"
							}
						]
					}
				];
				let promises:Promise<any>[] = [];
				let promise:Promise<any>;
				let spies = {
					success: ( credentials:TokenCredentials ):void => {
						expect( auth.isAuthenticated() ).toBe( true );
						expect( credentials.token.key ).toEqual( token[0]["https://carbonldp.com/ns/v1/security#tokenKey"][0]["@value"] );
					},
					fail: ( error ):void => {
						expect( error.name ).toBe( Errors.IllegalArgumentError.name );
					}
				};
				let spySuccess = spyOn( spies, "success" ).and.callThrough();
				let spyFail = spyOn( spies, "fail" ).and.callThrough();

				promise = auth.authenticateUsing( "TOKEN", "myUser@user.con", "myAwesomePassword" );
				expect( promise instanceof Promise ).toBe( true );
				promises.push( promise.then( spies.success, spies.fail ) );

				jasmine.Ajax.stubRequest( /token/ ).andReturn({
					status: 200,
					responseText: JSON.stringify( token )
				});

				let auth2:Auth.Class = new Auth.Class( context );
				promise = auth2.authenticateUsing( "TOKEN", {} );
				expect( promise instanceof Promise ).toBe( true );
				promises.push( promise.then( spies.success, spies.fail ) );

				let auth3:Auth.Class = new Auth.Class( context );
				promise = auth3.authenticateUsing( "Error", "myUser@user.con", "myAwesomePassword" );
				expect( promise instanceof Promise ).toBe( true );
				promises.push( promise.then( spies.success, spies.fail ) );

				Promise.all( promises ).then( ():void => {
					expect( spySuccess.calls.count() ).toBe( 1 );
					expect( spyFail.calls.count() ).toBe( 2 );
					done();
				}, done.fail );
			});

			it( hasSignature(
				"Authenticates the user with a JSON Web Token (JWT), i.e. the credentials generated by TokenAuthenticator", [
					{ name: "method", type: "'TOKEN'" },
					{ name: "token", type: "Carbon.Auth.Token.Class" }
				],
				{ type: "Promise<Carbon.Auth.TokenCredentials.Class>" }
			), ( done:{ ():void, fail:() => void } ):void => {
				expect( auth.authenticateUsing ).toBeDefined();
				expect( Utils.isFunction( auth.authenticateUsing ) ).toBe( true );
				expect( auth.isAuthenticated() ).toBe( false );

				let date:Date;

				let token:Token.Class;
				let promises:Promise<any>[] = [];
				let promise:Promise<any>;
				let spies = {
					success: ( credential:TokenCredentials ):void => {
						expect( credential.token.key ).toEqual( token.key );
						expect( auth.isAuthenticated() ).toBe( true );
					},
					fail: ( error ):void => {
						expect( error.name ).toBe( Errors.IllegalArgumentError.name );
					}
				};
				let spySuccess = spyOn( spies, "success" ).and.callThrough();
				let spyFail = spyOn( spies, "fail" ).and.callThrough();

				// OK Token
				date = new Date();
				date.setDate( date.getDate() + 1 );
				token = {
					expirationTime: date,
					id: "_:BlankNode",
					key: "eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJodHRwczovL2V4YW1wbGUuY29tL3VzZXJzL2EtdXNlci8iLCJleHAiOjExNDkxMjAwMDAwMDB9.T8XSFKyiT-5PAx_yxv2uY94nfvx65zWz8mI2OlSUFnE",
					types: [
						"https://carbonldp.com/ns/v1/security#Token",
						"https://carbonldp.com/ns/v1/platform#VolatileResource"
					]
				};
				promise = auth.authenticateUsing( "TOKEN", token );
				expect( promise instanceof Promise ).toBe( true );
				promises.push( promise.then( spies.success, spies.fail ) );

				// Will fail, because expirationDate has been reached
				let auth2:Auth.Class = new Auth.Class( context );
				date = new Date();
				date.setDate( date.getDate() - 1 );
				token = {
					expirationTime: date,
					id: "_:BlankNode",
					key: "eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJodHRwczovL2V4YW1wbGUuY29tL3VzZXJzL2EtdXNlci8iLCJleHAiOjExNDkxMjAwMDAwMDB9.T8XSFKyiT-5PAx_yxv2uY94nfvx65zWz8mI2OlSUFnE",
					types: [
						"https://carbonldp.com/ns/v1/security#Token",
						"https://carbonldp.com/ns/v1/platform#VolatileResource"
					]
				};
				promise = auth2.authenticateUsing( "TOKEN", token );
				expect( promise instanceof Promise ).toBe( true );
				promises.push( promise.then( spies.success, spies.fail ) );

				// Will fail, because expirationDate is not a Date object, it's a string.
				date = new Date();
				date.setDate( date.getDate() + 1 );
				var getFromStorage = ():Object => {
					let storedToken = {
						expirationTime: date,
						id: "_:BlankNode",
						key: "eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJodHRwczovL2V4YW1wbGUuY29tL3VzZXJzL2EtdXNlci8iLCJleHAiOjExNDkxMjAwMDAwMDB9.T8XSFKyiT-5PAx_yxv2uY94nfvx65zWz8mI2OlSUFnE",
						types: [
							"https://carbonldp.com/ns/v1/security#Token",
							"https://carbonldp.com/ns/v1/platform#VolatileResource"
						]
					};
					return JSON.parse( JSON.stringify( storedToken ) );
				};
				token = <Token.Class> getFromStorage();
				promise = auth2.authenticateUsing( "TOKEN", token );
				expect( promise instanceof Promise ).toBe( true );
				promises.push( promise.then( spies.success, spies.fail ) );

				let auth3 = new Auth.Class( context );
				promise = auth3.authenticateUsing( "TOKEN", {} );
				expect( promise instanceof Promise ).toBe( true );
				promises.push( promise.then( spies.success, spies.fail ) );

				let auth4 = new Auth.Class( context );
				promise = auth4.authenticateUsing( "Error", token );
				expect( promise instanceof Promise ).toBe( true );
				promises.push( promise.then( spies.success, spies.fail ) );

				Promise.all( promises ).then( ():void => {
					expect( spySuccess.calls.count() ).toBe( 1 );
					expect( spyFail.calls.count() ).toBe( 4 );
					done();
				}, done.fail );
			});

			it( hasSignature(
				"Authenticates the user with a JSON Web Token (JWT), i.e. the credentials generated by TokenAuthenticator", [
					{ name: "method", type: "'TOKEN'" },
					{ name: "token", type: "Carbon.Auth.TokenCredentials" }
				],
				{ type: "Promise<Carbon.Auth.TokenCredentials.Class>" }
			), ( done:{ ():void, fail:() =>  void } ):void => {
				expect( auth.authenticateUsing ).toBeDefined();
				expect( Utils.isFunction( auth.authenticateUsing ) ).toBe( true );
				expect( auth.isAuthenticated() ).toBe( false );

				let date = new Date();
				date.setDate( date.getDate() + 1 );

				let token = {
					expirationTime: date,
					id: "_:BlankNode",
					key: "eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJodHRwczovL2V4YW1wbGUuY29tL3VzZXJzL2EtdXNlci8iLCJleHAiOjExNDkxMjAwMDAwMDB9.T8XSFKyiT-5PAx_yxv2uY94nfvx65zWz8mI2OlSUFnE",
					types: [
						"https://carbonldp.com/ns/v1/security#Token",
						"https://carbonldp.com/ns/v1/platform#VolatileResource"
					]
				};
				let credentials = new TokenCredentials( token );
				let promises:Promise<any>[] = [];
				let promise:Promise<any>;
				let spies = {
					success: ( credential:TokenCredentials ):void => {
						expect( auth.isAuthenticated() ).toBe( true );
						expect( credential.token.key ).toEqual( credentials.token.key );
					},
					fail: ( error ):void => {
						expect( error.name ).toBe( Errors.IllegalArgumentError.name );
					}
				};
				let spySuccess = spyOn( spies, "success" ).and.callThrough();
				let spyFail = spyOn( spies, "fail" ).and.callThrough();

				promise = auth.authenticateUsing( "TOKEN", credentials );
				expect( promise instanceof Promise ).toBe( true );
				promises.push( promise.then( spies.success, spies.fail ) );


				let auth2 = new Auth.Class( context );
				promise = auth2.authenticateUsing( "TOKEN", {} );
				expect( promise instanceof Promise ).toBe( true );
				promises.push( promise.then( spies.success, spies.fail ) );

				let auth3 = new Auth.Class( context );
				promise = auth3.authenticateUsing( "Error", credentials );
				expect( promise instanceof Promise ).toBe( true );
				promises.push( promise.then( spies.success, spies.fail ) );

				Promise.all( promises ).then( ():void => {
					expect( spySuccess.calls.count() ).toBe( 1 );
					expect( spyFail.calls.count() ).toBe( 2 );
					done();
				}, done.fail );
			});

		});

		it( hasMethod(
			INSTANCE,
			"addAuthentication",
			"Add the authentication header to a `Carbon.HTTP.Request.Options` object.", [
				{ name: "options", type: "Carbon.HTTP.Request.Options" }
			]
		), ():void => {
			// TODO test
		});

		it( hasMethod(
			INSTANCE,
			"clearAuthentication",
			"Deletes the current authentication"
		), ():void => {
			// TODO test
		});

	});

	it( hasDefaultExport( "Carbon.Auth.Class" ), ():void => {
		expect( DefaultExport ).toBeDefined();
		expect( DefaultExport ).toBe( Auth.Class );
	});

});