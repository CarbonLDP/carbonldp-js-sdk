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
	hasDefaultExport,
	reexports,
	hasEnumeral,
	hasSignature
} from "./test/JasmineExtender";
import * as Utils from "./Utils";
import AbstractContext from "./AbstractContext";
import AuthenticationToken from "./Auth/AuthenticationToken";
import Authenticator from "./Auth/Authenticator";
import BasicAuthenticator from "./Auth/BasicAuthenticator";
import * as HTTP from "./HTTP";
import * as Token from "./Auth/Token";
import TokenAuthenticator from "./Auth/TokenAuthenticator";
import UsernameAndPasswordToken from "./Auth/UsernameAndPasswordToken";
import UsernameAndPasswordCredentials from "./Auth/UsernameAndPasswordCredentials";
import * as Errors from "./Errors";

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
		"Enum with the methods of authentication supported by CarbonLDP."
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
		"Class that manage authentications and authorizations."
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
			"Returns true if the user is authenticated.", [
				{ name: "askParent", type: "boolean", optional: true, default: "true" }
			],
			{ type: "boolean" }
		), ():void => {

			// Property Integrity
			( function propertyIntegrity() {
				class MockedContext extends AbstractContext {
					resolve( uri:string ) {
						return uri;
					}
				}
				let context = new MockedContext();
				let auth = new Auth.Class( context );

				expect( auth.isAuthenticated ).toBeDefined();
				expect( Utils.isFunction( auth. isAuthenticated ) ).toBe( true );
			} )();


			// Neither current nor parent authenticated
			( function currentNotAuthenticated_parentNotAuthenticated() {
				class MockedContext extends AbstractContext {
					constructor() {
						super();
						this._parentContext = this;
					}
					resolve( uri:string ) {
						return uri;
					}
				}
				let context = new MockedContext();
				let auth = new Auth.Class( context );
				let spyParent = spyOn( context.auth, "isAuthenticated" ).and.returnValue( false );

				expect( auth.isAuthenticated() ).toBe( false );
				expect( spyParent ).toHaveBeenCalled();
				spyParent.calls.reset();

				expect( auth.isAuthenticated( true ) ).toBe( false );
				expect( spyParent ).toHaveBeenCalled();
				spyParent.calls.reset();

				expect( auth.isAuthenticated( false ) ).toBe( false );
				expect( spyParent ).not.toHaveBeenCalled();
			} )();

			// Current not authenticated but parent is
			( function currentNotAuthenticated_parentAuthenticated() {
				class MockedContext extends AbstractContext {
					constructor() {
						super();
						this._parentContext = this;
					}
					resolve( uri:string ) {
						return uri;
					}
				}
				let context = new MockedContext();
				let auth = new Auth.Class( context );
				let spyParent = spyOn( context.auth, "isAuthenticated" ).and.returnValue( true );

				expect( auth.isAuthenticated() ).toBe( true );
				expect( spyParent ).toHaveBeenCalled();
				spyParent.calls.reset();

				expect( auth.isAuthenticated( true ) ).toBe( true );
				expect( spyParent ).toHaveBeenCalled();
				spyParent.calls.reset();

				expect( auth.isAuthenticated( false ) ).toBe( false );
				expect( spyParent ).not.toHaveBeenCalled();
			} )();

			// Current and parent authenticated
			( function currentAuthenticated_parentAuthenticated() {
				class MockedContext extends AbstractContext {
					constructor() {
						super();
						this._parentContext = this;
					}
					resolve( uri:string ) {
						return uri;
					}
				}
				let context = new MockedContext();

				let auth = new Auth.Class( context );
				(<any> auth).authenticator = { isAuthenticated: () => true };

				let spyParent = spyOn( context.auth, "isAuthenticated" ).and.returnValue( true );

				expect( auth.isAuthenticated() ).toBe( true );
				expect( spyParent ).not.toHaveBeenCalled();
				spyParent.calls.reset();

				expect( auth.isAuthenticated( true ) ).toBe( true );
				expect( spyParent ).not.toHaveBeenCalled();
				spyParent.calls.reset();

				expect( auth.isAuthenticated( false ) ).toBe( true );
				expect( spyParent ).not.toHaveBeenCalled();
			} )();

			// Current authenticated but parent not
			( function currentAuthenticated_parentNotAuthenticated() {
				class MockedContext extends AbstractContext {
					constructor() {
						super();
						this._parentContext = this;
					}
					resolve( uri:string ) {
						return uri;
					}
				}
				let context = new MockedContext();

				let auth = new Auth.Class( context );
				(<any> auth).authenticator = { isAuthenticated: () => true };

				let spyParent = spyOn( context.auth, "isAuthenticated" ).and.returnValue( false );

				expect( auth.isAuthenticated() ).toBe( true );
				expect( spyParent ).not.toHaveBeenCalled();
				spyParent.calls.reset();

				expect( auth.isAuthenticated( true ) ).toBe( true );
				expect( spyParent ).not.toHaveBeenCalled();
				spyParent.calls.reset();

				expect( auth.isAuthenticated( false ) ).toBe( true );
				expect( spyParent ).not.toHaveBeenCalled();
			} )();

		});

		it( hasMethod(
			INSTANCE,
			"authenticate",
			"Authenticate the user with a `username` and `password`. Uses the `TOKEN` method for the authentication.", [
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

			beforeEach( ():void => {
				class MockedContext extends AbstractContext {
					resolve( uri:string ) {
						return "http://example.com/" + uri;
					}
				}
				context = new MockedContext();

				jasmine.Ajax.install();
			});

			afterEach( ():void => {
				jasmine.Ajax.uninstall();
			});

			it( hasSignature(
				"Authenticates the user with Basic HTTP Authentication, which uses an encoded string with username and password in every request.", [
					{ name: "method", type: "'BASIC'" },
					{ name: "username", type: "string" },
					{ name: "password", type: "string" }
				],
				{ type: "Promise<Carbon.Auth.UsernameAndPasswordCredentials.Class>"}
			), ( done:{ ():void, fail:() => void } ):void => {
				let auth = new Auth.Class( context );
				expect( auth.authenticateUsing ).toBeDefined();
				expect( Utils.isFunction( auth.authenticateUsing ) ).toBe( true );
				expect( auth.isAuthenticated() ).toBe( false );

				let username = "myUser@user.com";
				let password = "myAwesomePassword";
				let promises:Promise<any>[] = [];
				let promise:Promise<any>;
				let spies = {
					success: ( credentials:UsernameAndPasswordCredentials ):void => {
						expect( auth01.isAuthenticated() ).toBe( true );
						expect( credentials.username ).toEqual( username );
						expect( credentials.password ).toEqual( password );
					},
					fail: ( error ):void => {
						expect( error.name ).toBe( Errors.IllegalArgumentError.name );
					}
				};
				let spySuccess = spyOn( spies, "success" ).and.callThrough();
				let spyFail = spyOn( spies, "fail" ).and.callThrough();

				// Expected behavior
				let auth01 = new Auth.Class( context );
				promise = auth01.authenticateUsing( "BASIC", username, password );
				expect( promise instanceof Promise ).toBe( true );
				promises.push( promise.then( spies.success, spies.fail ) );

				// Wrong parameters
				let auth02 = new Auth.Class( context );
				promise = auth02.authenticateUsing( "BASIC", {} );
				expect( promise instanceof Promise ).toBe( true );
				promises.push( promise.then( spies.success, spies.fail ) );

				// Nonexistent authentication type
				let auth03 = new Auth.Class( context );
				promise = auth03.authenticateUsing( "Error", username, password );
				expect( promise instanceof Promise ).toBe( true );
				promises.push( promise.then( spies.success, spies.fail ) );

				Promise.all( promises ).then( ():void => {
					expect( spySuccess.calls.count() ).toBe( 1 );
					expect( spyFail.calls.count() ).toBe( 2 );
					done();
				}, done.fail );
			});

			it( hasSignature(
				"Authenticates the user with a username and password, and generates a JSON Web Token (JWT) credential that will be used in every request.", [
					{ name: "method", type: "'TOKEN'" },
					{ name: "username", type: "string" },
					{ name: "password", type: "string" }
				],
				{ type: "Promise<Carbon.Auth.Token.Class>"}
			), ( done:{ ():void, fail:() => void } ):void => {
				let auth = new Auth.Class( context );
				expect( auth.authenticateUsing ).toBeDefined();
				expect( Utils.isFunction( auth.authenticateUsing ) ).toBe( true );
				expect( auth.isAuthenticated() ).toBe( false );

				let date:Date = new Date();
				date.setDate( date.getDate() + 1 );
				let token:Object = [
					{
						"@id": "_:BlankNode",
						"@type": [
							"https://carbonldp.com/ns/v1/security#Token",
							"https://carbonldp.com/ns/v1/platform#VolatileResource"
						],
						"https://carbonldp.com/ns/v1/security#expirationTime": [
							{
								"@type": "http://www.w3.org/2001/XMLSchema#dateTime",
								"@value": date.toISOString()
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
					success: ( credentials:Token.Class ):void => {
						expect( auth01.isAuthenticated() ).toBe( true );
						expect( credentials.key ).toEqual( token[0]["https://carbonldp.com/ns/v1/security#tokenKey"][0]["@value"] );
					},
					fail: ( error ):void => {
						expect( error instanceof Errors.IllegalArgumentError ).toBe( true );
					}
				};
				let spySuccess = spyOn( spies, "success" ).and.callThrough();
				let spyFail = spyOn( spies, "fail" ).and.callThrough();

				jasmine.Ajax.stubRequest( /token/ ).andReturn({
					status: 200,
					responseText: JSON.stringify( token )
				});

				// Expected behavior
				let auth01 = new Auth.Class( context );
				promise = auth01.authenticateUsing( "TOKEN", "myUser@user.con", "myAwesomePassword" );
				expect( promise instanceof Promise ).toBe( true );
				promises.push( promise.then( spies.success, spies.fail ) );

				// Wrong parameters
				let auth02:Auth.Class = new Auth.Class( context );
				promise = auth02.authenticateUsing( "TOKEN", {} );
				expect( promise instanceof Promise ).toBe( true );
				promises.push( promise.then( spies.success, spies.fail ) );

				// Nonexistent authentication method
				let auth03:Auth.Class = new Auth.Class( context );
				promise = auth03.authenticateUsing( "Error", "myUser@user.con", "myAwesomePassword" );
				expect( promise instanceof Promise ).toBe( true );
				promises.push( promise.then( spies.success, spies.fail ) );

				Promise.all( promises ).then( ():void => {
					expect( spySuccess.calls.count() ).toBe( 1 );
					expect( spyFail.calls.count() ).toBe( 2 );
					done();
				}, done.fail );
			});

			it( hasSignature(
				"Authenticates the user with a `Carbon.Auth.Token.Class`, which contains a JSON Web Token (JWT) that will be used in every request.", [
					{ name: "method", type: "'TOKEN'" },
					{ name: "token", type: "Carbon.Auth.Token.Class" }
				],
				{ type: "Promise<Carbon.Auth.Token.Class>" }
			), ( done:{ ():void, fail:() => void } ):void => {
				let auth01 = new Auth.Class( context );
				let auth02 = new Auth.Class( context );

				expect( auth01.authenticateUsing ).toBeDefined();
				expect( Utils.isFunction( auth01.authenticateUsing ) ).toBe( true );
				expect( auth01.isAuthenticated() ).toBe( false );


				let date:Date;
				let token:Token.Class;
				let promises:Promise<any>[] = [];
				let promise:Promise<any>;
				let spies = {
					success01: ( credential:Token.Class ):void => {
						expect( credential.key ).toEqual( token.key );
						expect( auth01.isAuthenticated() ).toBe( true );
					},
					success02: ( credential:Token.Class ):void => {
						expect( credential.key ).toEqual( token.key );
						expect( auth02.isAuthenticated() ).toBe( true );
					},
					fail: ( error ):void => {
						expect( error.name ).toBe( Errors.IllegalArgumentError.name );
					}
				};
				let spySuccess01 = spyOn( spies, "success01" ).and.callThrough();
				let spySuccess02 = spyOn( spies, "success02" ).and.callThrough();
				let spyFail = spyOn( spies, "fail" ).and.callThrough();

				// Expected behavior
				date = new Date();
				date.setDate( date.getDate() + 1 );
				token = <any> {
					expirationTime: date,
					id: "_:BlankNode",
					key: "eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJodHRwczovL2V4YW1wbGUuY29tL3VzZXJzL2EtdXNlci8iLCJleHAiOjExNDkxMjAwMDAwMDB9.T8XSFKyiT-5PAx_yxv2uY94nfvx65zWz8mI2OlSUFnE",
					types: [
						"https://carbonldp.com/ns/v1/security#Token",
						"https://carbonldp.com/ns/v1/platform#VolatileResource"
					]
				};
				promise = auth01.authenticateUsing( "TOKEN", token );
				expect( promise instanceof Promise ).toBe( true );
				promises.push( promise.then( spies.success01, spies.fail ) );

				// Expected behavior. If expirationDate is a string the method parse it to a Date object
				date = new Date();
				date.setDate( date.getDate() + 1 );
				var getFromStorage = ():Object => {
					let storedToken = {
						expirationTime: date.toISOString(),
						id: "_:BlankNode",
						key: "eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJodHRwczovL2V4YW1wbGUuY29tL3VzZXJzL2EtdXNlci8iLCJleHAiOjExNDkxMjAwMDAwMDB9.T8XSFKyiT-5PAx_yxv2uY94nfvx65zWz8mI2OlSUFnE",
						types: [
							"https://carbonldp.com/ns/v1/security#Token",
							"https://carbonldp.com/ns/v1/platform#VolatileResource"
						]
					};
					return JSON.parse( JSON.stringify( storedToken ) );
				};
				promise = auth02.authenticateUsing( "TOKEN", <Token.Class> getFromStorage() );
				expect( promise instanceof Promise ).toBe( true );
				promises.push( promise.then( spies.success02, spies.fail ) );

				// ExpirationDate has been reached
				let auth03:Auth.Class = new Auth.Class( context );
				date = new Date();
				date.setDate( date.getDate() - 1 );
				token = <any> {
					expirationTime: date,
					id: "_:BlankNode",
					key: "eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJodHRwczovL2V4YW1wbGUuY29tL3VzZXJzL2EtdXNlci8iLCJleHAiOjExNDkxMjAwMDAwMDB9.T8XSFKyiT-5PAx_yxv2uY94nfvx65zWz8mI2OlSUFnE",
					types: [
						"https://carbonldp.com/ns/v1/security#Token",
						"https://carbonldp.com/ns/v1/platform#VolatileResource"
					]
				};
				promise = auth03.authenticateUsing( "TOKEN", token );
				expect( promise instanceof Promise ).toBe( true );
				promises.push( promise.then( spies.success01, spies.fail ) );

				// Wrong parameters
				promise = auth03.authenticateUsing( "TOKEN", {} );
				expect( promise instanceof Promise ).toBe( true );
				promises.push( promise.then( spies.success01, spies.fail ) );

				// Nonexistent authentication method
				promise = auth03.authenticateUsing( "Error", token );
				expect( promise instanceof Promise ).toBe( true );
				promises.push( promise.then( spies.success01, spies.fail ) );

				Promise.all( promises ).then( ():void => {
					expect( spySuccess01.calls.count() ).toBe( 1 );
					expect( spySuccess02.calls.count() ).toBe( 1 );
					expect( spyFail.calls.count() ).toBe( 3 );
					done();
				}, done.fail );
			});

		});

		it( hasMethod(
			INSTANCE,
			"addAuthentication",
			"Adds the authentication header to a `Carbon.HTTP.Request.Options` object.", [
				{ name: "options", type: "Carbon.HTTP.Request.Options" }
			]
		), ():void => {

			// Property Integrity
			( function propertyIntegrity() {
				class MockedContext extends AbstractContext {
					resolve( uri:string ) {
						return uri;
					}
				}
				let context = new MockedContext();
				let auth = new Auth.Class( context );

				expect( auth.addAuthentication ).toBeDefined();
				expect( Utils.isFunction( auth.addAuthentication ) ).toBe( true );
			} )();

			// Neither current nor parent authenticated
			( function currentNotAuthenticated_parentNotAuthenticated() {
				class MockedContext extends AbstractContext {
					constructor() {
						super();
						this._parentContext = this;
					}
					resolve( uri:string ) {
						return uri;
					}
				}
				let context = new MockedContext();
				let auth = new Auth.Class( context );

				let spyParent = spyOn( context.auth, "addAuthentication" ).and.callFake( options => {
					options[ "parentAuth" ] = "no authenticated";
				} );

				let options:HTTP.Request.Options = {};

				auth.addAuthentication( options );
				expect( spyParent ).toHaveBeenCalledWith( options );
				expect( options ).toEqual( { parentAuth: "no authenticated" } );
			} )();

			// Current not authenticated but parent is
			( function currentNotAuthenticated_parentAuthenticated() {
				class MockedContext extends AbstractContext {
					constructor() {
						super();
						this._parentContext = this;
					}
					resolve( uri:string ) {
						return uri;
					}
				}
				let context = new MockedContext();
				let auth = new Auth.Class( context );

				let spyParent = spyOn( context.auth, "addAuthentication" ).and.callFake( options => {
					options[ "parentAuth" ] = "is authenticated";
				} );

				let options:HTTP.Request.Options = {};

				auth.addAuthentication( options );
				expect( spyParent ).toHaveBeenCalledWith( options );
				expect( options ).toEqual( { parentAuth: "is authenticated" } );
			} )();

			// Current and parent authenticated
			( function currentAuthenticated_parentAuthenticated() {
				class MockedContext extends AbstractContext {
					constructor() {
						super();
						this._parentContext = this;
					}
					resolve( uri:string ) {
						return uri;
					}
				}
				let context = new MockedContext();
				let auth = new Auth.Class( context );

				(<any> auth).authenticator = { isAuthenticated: () => true, addAuthentication: options => {
					options[ "currentAuth" ] = "is authenticated";
				} };
				let spyParent = spyOn( context.auth, "addAuthentication" ).and.callFake( options => {
					options[ "parentAuth" ] = "is authenticated";
				} );

				let options:HTTP.Request.Options = {};

				auth.addAuthentication( options );
				expect( spyParent ).not.toHaveBeenCalled();
				expect( options ).toEqual( { currentAuth: "is authenticated" } );
			} )();

			// Current authenticated but parent not
			( function currentAuthenticated_parentNotAuthenticated() {
				class MockedContext extends AbstractContext {
					constructor() {
						super();
						this._parentContext = this;
					}
					resolve( uri:string ) {
						return uri;
					}
				}
				let context = new MockedContext();
				let auth = new Auth.Class( context );

				(<any> auth).authenticator = { isAuthenticated: () => true, addAuthentication: options => {
					options[ "currentAuth" ] = "is authenticated";
				} };
				let spyParent = spyOn( context.auth, "addAuthentication" ).and.callFake( options => {
					options[ "parentAuth" ] = "no authenticated";
				} );

				let options:HTTP.Request.Options = {};

				auth.addAuthentication( options );
				expect( spyParent ).not.toHaveBeenCalled();
				expect( options ).toEqual( { currentAuth: "is authenticated" } );
			} )();

		});

		it( hasMethod(
			INSTANCE,
			"clearAuthentication",
			"Deletes the authentication of the current instance."
		), ():void => {

			// Property Integrity
			( function propertyIntegrity() {
				class MockedContext extends AbstractContext {
					resolve( uri:string ) {
						return uri;
					}
				}
				let context = new MockedContext();
				let auth = new Auth.Class( context );

				expect( auth.clearAuthentication ).toBeDefined();
				expect( Utils.isFunction( auth.clearAuthentication ) ).toBe( true );
			} )();

			// The module isn't authenticated
			( function NotAuthenticated() {
				class MockedContext extends AbstractContext {
					resolve( uri:string ) {
						return uri;
					}
				}
				let context = new MockedContext();
				let auth = new Auth.Class( context );

				auth.clearAuthentication();
				expect( (<any> auth).authenticator ).toBeFalsy();
			} )();

			// The module is authenticated
			( function currentAuthenticated() {
				class MockedContext extends AbstractContext {
					resolve( uri:string ) {
						return uri;
					}
				}
				let context = new MockedContext();
				let auth = new Auth.Class( context );
				(<any> auth).authenticator = {
					isAuthenticated: () => true,
					clearAuthentication: () => {}
				};
				let spyClear = spyOn( (<any> auth).authenticator, "clearAuthentication" );

				expect( auth.isAuthenticated() ).toBe( true );
				auth.clearAuthentication();
				expect( (<any> auth).authenticator ).toBeFalsy();
				expect( auth.isAuthenticated() ).toBe( false );
				expect( spyClear ).toHaveBeenCalled();
			} )();

		});

	});

	it( hasDefaultExport( "Carbon.Auth.Class" ), ():void => {
		expect( DefaultExport ).toBeDefined();
		expect( DefaultExport ).toBe( Auth.Class );
	});

});