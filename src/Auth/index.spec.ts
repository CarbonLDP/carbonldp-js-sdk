import { AbstractContext } from "../AbstractContext";
import * as Errors from "../Errors";
import { BadResponseError } from "../HTTP/Errors";
import { RequestOptions } from "../HTTP/Request";
import { Response } from "../HTTP/Response";
import { URI } from "../RDF/URI";
import {
	clazz,
	enumeration,
	hasConstructor,
	hasDefaultExport,
	hasEnumeral,
	hasMethod,
	hasProperty,
	hasSignature,
	INSTANCE,
	isDefined,
	method,
	module,
	reexports,
	STATIC,
} from "../test/JasmineExtender";
import * as Utils from "../Utils";
import { C } from "../Vocabularies/C";
import { CS } from "../Vocabularies/CS";
import { XSD } from "../Vocabularies/XSD";
import * as ACE from "./ACE";
import * as ACL from "./ACL";
import Authenticator from "./Authenticator";
import BasicAuthenticator from "./BasicAuthenticator";
import * as Credentials from "./Credentials";

import * as Auth from "./";
import DefaultExport from "./";

import * as PersistedACE from "./PersistedACE";
import * as PersistedACL from "./PersistedACL";
import * as PersistedCredentials from "./PersistedCredentials";
import * as PersistedRole from "./PersistedRole";
import * as PersistedUser from "./PersistedUser";
import * as Role from "./Role";
import * as Roles from "./Roles";
import * as Ticket from "./Ticket";
import * as Token from "./Token";
import TokenAuthenticator from "./TokenAuthenticator";
import * as User from "./User";
import UsernameAndPasswordCredentials from "./UsernameAndPasswordCredentials";
import UsernameAndPasswordToken from "./UsernameAndPasswordToken";
import * as Users from "./Users";

describe( module( "carbonldp/Auth" ), ():void => {

	it( isDefined(), ():void => {
		expect( Auth ).toBeDefined();
		expect( Utils.isObject( Auth ) ).toBe( true );
	} );

	it( reexports(
		STATIC,
		"ACE",
		"CarbonLDP.Auth.ACE"
	), ():void => {
		expect( Auth.ACE ).toBeDefined();
		expect( Auth.ACE ).toBe( ACE );
	} );

	it( reexports(
		STATIC,
		"ACL",
		"CarbonLDP.Auth.ACL"
	), ():void => {
		expect( Auth.ACL ).toBeDefined();
		expect( Auth.ACL ).toBe( ACL );
	} );

	it( reexports(
		STATIC,
		"User",
		"CarbonLDP.Auth.User"
	), ():void => {
		expect( Auth.User ).toBeDefined();
		expect( Auth.User ).toBe( User );
	} );

	it( reexports(
		STATIC,
		"Users",
		"CarbonLDP.Auth.Users"
	), ():void => {
		expect( Auth.Users ).toBeDefined();
		expect( Auth.Users ).toBe( Users );
	} );

	it( reexports(
		STATIC,
		"Authenticator",
		"CarbonLDP.Auth.Authenticator"
	), ():void => {
	} );

	it( reexports(
		STATIC,
		"BasicAuthenticator",
		"CarbonLDP.Auth.BasicAuthenticator"
	), ():void => {
		expect( Auth.BasicAuthenticator ).toBeDefined();
		expect( Auth.BasicAuthenticator ).toBe( BasicAuthenticator );
	} );

	it( reexports(
		STATIC,
		"Credentials",
		"CarbonLDP.Auth.Credentials"
	), ():void => {
		expect( Auth.Credentials ).toBeDefined();
		expect( Auth.Credentials ).toBe( Credentials );
	} );

	it( reexports(
		STATIC,
		"PersistedACE",
		"CarbonLDP.Auth.PersistedACE"
	), ():void => {
		expect( Auth.PersistedACE ).toBeDefined();
		expect( Auth.PersistedACE ).toBe( PersistedACE );
	} );

	it( reexports(
		STATIC,
		"PersistedACL",
		"CarbonLDP.Auth.PersistedACL"
	), ():void => {
		expect( Auth.PersistedACL ).toBeDefined();
		expect( Auth.PersistedACL ).toBe( PersistedACL );
	} );

	it( reexports(
		STATIC,
		"PersistedCredentials",
		"CarbonLDP.Auth.PersistedCredentials"
	), ():void => {
		expect( Auth.PersistedCredentials ).toBeDefined();
		expect( Auth.PersistedCredentials ).toBe( PersistedCredentials );
	} );

	it( reexports(
		STATIC,
		"PersistedUser",
		"CarbonLDP.Auth.PersistedUser"
	), ():void => {
		expect( Auth.PersistedUser ).toBeDefined();
		expect( Auth.PersistedUser ).toBe( PersistedUser );
	} );

	it( reexports(
		STATIC,
		"PersistedRole",
		"CarbonLDP.Auth.PersistedRole"
	), ():void => {
		expect( Auth.PersistedRole ).toBeDefined();
		expect( Auth.PersistedRole ).toBe( PersistedRole );
	} );

	it( reexports(
		STATIC,
		"Role",
		"CarbonLDP.Auth.Role"
	), ():void => {
		expect( Auth.Role ).toBeDefined();
		expect( Auth.Role ).toBe( Role );
	} );

	it( reexports(
		STATIC,
		"Roles",
		"CarbonLDP.Auth.Roles"
	), ():void => {
		expect( Auth.Roles ).toBeDefined();
		expect( Auth.Roles ).toBe( Roles );
	} );

	it( reexports(
		STATIC,
		"Ticket",
		"CarbonLDP.Auth.Ticket"
	), ():void => {
		expect( Auth.Ticket ).toBeDefined();
		expect( Auth.Ticket ).toBe( Ticket );
	} );

	it( reexports(
		STATIC,
		"Token",
		"CarbonLDP.Auth.Token"
	), ():void => {
		expect( Auth.Token ).toBeDefined();
		expect( Auth.Token ).toBe( Token );
	} );

	it( reexports(
		STATIC,
		"TokenAuthenticator",
		"CarbonLDP.Auth.TokenAuthenticator"
	), ():void => {
		expect( Auth.TokenAuthenticator ).toBeDefined();
		expect( Auth.TokenAuthenticator ).toBe( TokenAuthenticator );
	} );

	it( reexports(
		STATIC,
		"UsernameAndPasswordToken",
		"CarbonLDP.Auth.UsernameAndPasswordToken"
	), ():void => {
		expect( Auth.UsernameAndPasswordToken ).toBeDefined();
		expect( Auth.UsernameAndPasswordToken ).toBe( UsernameAndPasswordToken );
	} );

	describe( enumeration(
		"CarbonLDP.Auth.Method",
		"Enum with the methods of authentication supported by Carbon LDP."
	), ():void => {

		it( isDefined(), ():void => {
			expect( Auth.Method ).toBeDefined();
			expect( Utils.isObject( Auth.Method ) ).toBe( true );
		} );

		it( hasEnumeral(
			"BASIC",
			"HTTP Basic authentication sending the `username` and `password` in every call."
		), ():void => {
			expect( Auth.Method.BASIC ).toBeDefined();
		} );

		it( hasEnumeral(
			"TOKEN",
			"Authentication with `username` and `password` generating a token that will be sent in every call."
		), ():void => {
			expect( Auth.Method.TOKEN ).toBeDefined();
		} );

	} );

	describe( clazz(
		"CarbonLDP.Auth.Class",
		"Abstract class that manages authentications and authorizations."
	), ():void => {

		beforeEach( ():void => {
			jasmine.Ajax.install();
		} );

		afterEach( ():void => {
			jasmine.Ajax.uninstall();
		} );

		it( isDefined(), ():void => {
			expect( Auth.Class ).toBeDefined();
			expect( Utils.isFunction( Auth.Class ) ).toBe( true );
		} );

		it( hasConstructor( [
			{ name: "context", type: "CarbonLDP.Context" },
		] ), ():void => {
			let auth:Auth.Class = new Auth.Class( new class extends AbstractContext {
				protected _baseURI:string;

				constructor() {
					super();
					this._baseURI = "http://example.com/";
					this.settings = { paths: { system: ".system/" } };
				}
			} );

			expect( auth ).toBeTruthy();
			expect( auth instanceof Auth.Class ).toBe( true );
		} );

		it( hasProperty(
			INSTANCE,
			"users",
			"CarbonLDP.Auth.Users.Class",
			"Instance of `CarbonLDP.Auth.Users.Class` that helps managing the users of your Carbon LDP."
		), ():void => {
			class MockedContext extends AbstractContext {
				protected _baseURI:string;

				constructor() {
					super();
					this._baseURI = "";
				}
			}

			let auth:Auth.Class = new Auth.Class( new MockedContext() );

			expect( auth.users ).toBeDefined();
			expect( auth.users ).toEqual( jasmine.any( Users.Class ) );
		} );

		it( hasProperty(
			INSTANCE,
			"authenticatedUser",
			"CarbonLDP.Auth.PersistedUser.Class",
			"The user of the user that has been authenticated.\n" +
			"Returns `null` if the user it not authenticated."
		), ():void => {

			function createUser( context:AbstractContext ):PersistedUser.Class {
				return PersistedUser.Factory.decorate( {
					id: "http://example.com/users/my-user/",
					types: [ User.RDF_CLASS ],
					email: null,
					name: null,
					enabled: true,
				}, context.documents );
			}

			(() => {
				class MockedContext extends AbstractContext {
					protected _baseURI:string;

					constructor() {
						super();
						this._baseURI = "";
					}
				}

				let context:AbstractContext = new MockedContext();

				expect( context.auth.authenticatedUser ).toBeNull();
			})();

			(() => {
				class MockedContext extends AbstractContext {
					protected _baseURI:string;

					constructor() {
						super();
						this._baseURI = "";
					}
				}

				let context:AbstractContext = new MockedContext();

				expect( context.auth.authenticatedUser ).toBeNull();

				// Authenticated Auth
				let auth:Auth.Class = new class extends Auth.Class {
					constructor() {
						super( context );
						this._authenticatedUser = createUser( context );
					}
				};
				expect( auth.authenticatedUser ).toBeTruthy();
				expect( PersistedUser.Factory.is( auth.authenticatedUser ) ).toBe( true );
			})();

			(() => {
				let parentContext:AbstractContext = new class extends AbstractContext {
					protected _baseURI:string;

					constructor() {
						super();
						this._baseURI = "";
						this.auth = new class extends Auth.Class {
							constructor( _context:AbstractContext ) {
								super( _context );
								this._authenticatedUser = createUser( _context );
							}
						}( this );
					}
				};
				let context:AbstractContext = new class extends AbstractContext {
					protected _baseURI:string;

					constructor() {
						super( parentContext );
						this._baseURI = "";
					}
				};

				expect( parentContext.auth.authenticatedUser ).toBeTruthy();
				expect( PersistedUser.Factory.is( parentContext.auth.authenticatedUser ) ).toBe( true );

				expect( context.auth.authenticatedUser ).toBeTruthy();
				expect( PersistedUser.Factory.is( context.auth.authenticatedUser ) ).toBe( true );

				expect( parentContext.auth.authenticatedUser ).toBe( context.auth.authenticatedUser );
			})();

			(() => {
				let parentContext:AbstractContext = new class extends AbstractContext {
					protected _baseURI:string;

					constructor() {
						super();
						this._baseURI = "";
						this.auth = new class extends Auth.Class {
							constructor( _context:AbstractContext ) {
								super( _context );
								this._authenticatedUser = createUser( _context );
							}
						}( this );
					}
				};
				let context:AbstractContext = new class extends AbstractContext {
					protected _baseURI:string;

					constructor() {
						super( parentContext );
						this._baseURI = "";
						this.auth = new class extends Auth.Class {
							constructor( _context:AbstractContext ) {
								super( _context );
								this._authenticatedUser = createUser( _context );
							}
						}( this );
					}
				};

				expect( parentContext.auth.authenticatedUser ).toBeTruthy();
				expect( PersistedUser.Factory.is( parentContext.auth.authenticatedUser ) ).toBe( true );

				expect( context.auth.authenticatedUser ).toBeTruthy();
				expect( PersistedUser.Factory.is( context.auth.authenticatedUser ) ).toBe( true );

				expect( parentContext.auth.authenticatedUser ).not.toBe( context.auth.authenticatedUser );
			})();

		} );

		it( hasProperty(
			INSTANCE,
			"roles",
			"CarbonLDP.Auth.Roles.Class",
			"Instance of `CarbonLDP.Auth.Roles.Class` that helps managing the roles of your Carbon LDP."
		), ():void => {
			let auth:Auth.Class = new Auth.Class( new class extends AbstractContext {
				protected _baseURI:string;

				constructor() {
					super();
					this._baseURI = "";
				}
			} );

			expect( auth.roles ).toBeDefined();
			expect( auth.roles ).toEqual( jasmine.any( Roles.Class ) );
		} );

		it( hasMethod(
			INSTANCE,
			"isAuthenticated",
			"Returns true if the user is authenticated.", [
				{ name: "askParent", type: "boolean", optional: true, defaultValue: "true" },
			],
			{ type: "boolean" }
		), ():void => {

			// Property Integrity
			(function propertyIntegrity():void {
				class MockedContext extends AbstractContext {
					protected _baseURI:string;

					constructor() {
						super();
						this._baseURI = "";
					}
				}

				let context:AbstractContext = new MockedContext();

				expect( context.auth.isAuthenticated ).toBeDefined();
				expect( Utils.isFunction( context.auth.isAuthenticated ) ).toBe( true );
			})();


			// Neither current nor parent authenticated
			(function currentNotAuthenticated_parentNotAuthenticated():void {
				class MockedContext extends AbstractContext {
					protected _baseURI:string;

					constructor() {
						super();
						this._baseURI = "";
						this._parentContext = this;
					}
				}

				let context:AbstractContext = new MockedContext();
				let auth:Auth.Class = new Auth.Class( context );

				let spyParent:jasmine.Spy = spyOn( context.auth, "isAuthenticated" ).and.returnValue( false );

				expect( auth.isAuthenticated() ).toBe( false );
				expect( spyParent ).toHaveBeenCalled();
				spyParent.calls.reset();

				expect( auth.isAuthenticated( true ) ).toBe( false );
				expect( spyParent ).toHaveBeenCalled();
				spyParent.calls.reset();

				expect( auth.isAuthenticated( false ) ).toBe( false );
				expect( spyParent ).not.toHaveBeenCalled();
			})();

			// Current not authenticated but parent is
			(function currentNotAuthenticated_parentAuthenticated():void {
				class MockedContext extends AbstractContext {
					protected _baseURI:string;

					constructor() {
						super();
						this._baseURI = "";
						this._parentContext = this;
					}
				}

				let context:AbstractContext = new MockedContext();
				let auth:Auth.Class = new Auth.Class( context );

				let spyParent:jasmine.Spy = spyOn( context.auth, "isAuthenticated" ).and.returnValue( true );

				expect( auth.isAuthenticated() ).toBe( true );
				expect( spyParent ).toHaveBeenCalled();
				spyParent.calls.reset();

				expect( auth.isAuthenticated( true ) ).toBe( true );
				expect( spyParent ).toHaveBeenCalled();
				spyParent.calls.reset();

				expect( auth.isAuthenticated( false ) ).toBe( false );
				expect( spyParent ).not.toHaveBeenCalled();
			})();

			// Current and parent authenticated
			(function currentAuthenticated_parentAuthenticated():void {
				class MockedContext extends AbstractContext {
					protected _baseURI:string;

					constructor() {
						super();
						this._baseURI = "";
						this._parentContext = this;
					}
				}

				let context:AbstractContext = new MockedContext();
				let auth:Auth.Class = new Auth.Class( context );
				(<any> auth).authenticator = { isAuthenticated: ():boolean => true };

				let spyParent:jasmine.Spy = spyOn( context.auth, "isAuthenticated" ).and.returnValue( true );

				expect( auth.isAuthenticated() ).toBe( true );
				expect( spyParent ).not.toHaveBeenCalled();
				spyParent.calls.reset();

				expect( auth.isAuthenticated( true ) ).toBe( true );
				expect( spyParent ).not.toHaveBeenCalled();
				spyParent.calls.reset();

				expect( auth.isAuthenticated( false ) ).toBe( true );
				expect( spyParent ).not.toHaveBeenCalled();
			})();

			// Current authenticated but parent not
			(function currentAuthenticated_parentNotAuthenticated():void {
				class MockedContext extends AbstractContext {
					protected _baseURI:string;

					constructor() {
						super();
						this._baseURI = "";
						this._parentContext = this;
					}
				}

				let context:AbstractContext = new MockedContext();
				let auth:Auth.Class = new Auth.Class( context );
				(<any> auth).authenticator = { isAuthenticated: ():boolean => true };

				let spyParent:jasmine.Spy = spyOn( context.auth, "isAuthenticated" ).and.returnValue( false );

				expect( auth.isAuthenticated() ).toBe( true );
				expect( spyParent ).not.toHaveBeenCalled();
				spyParent.calls.reset();

				expect( auth.isAuthenticated( true ) ).toBe( true );
				expect( spyParent ).not.toHaveBeenCalled();
				spyParent.calls.reset();

				expect( auth.isAuthenticated( false ) ).toBe( true );
				expect( spyParent ).not.toHaveBeenCalled();
			})();

		} );

		it( hasMethod(
			INSTANCE,
			"authenticate",
			"Authenticate the user with a `username` and `password`. Uses the `TOKEN` method for the authentication.", [
				{ name: "username", type: "string" },
				{ name: "password", type: "string" },
			],
			{ type: "Promise<CarbonLDP.Auth.Token.Class>" }
		), ():void => {
			let auth:Auth.Class = new Auth.Class( new class extends AbstractContext {
				protected _baseURI:string;

				constructor() {
					super();
					this._baseURI = "";
				}
			} );

			expect( auth.authenticate ).toBeDefined();
			expect( Utils.isFunction( auth.authenticate ) ).toBe( true );

			let spy:jasmine.Spy = spyOn( auth, "authenticateUsing" );

			//noinspection JSIgnoredPromiseFromCall
			auth.authenticate( "myUer@user.com", "myAwesomePassword" );

			expect( spy ).toHaveBeenCalledWith( "TOKEN", "myUer@user.com", "myAwesomePassword" );
		} );

		describe( method(
			INSTANCE,
			"authenticateUsing"
		), ():void => {
			let context:AbstractContext;

			beforeEach( ():void => {
				class MockedContext extends AbstractContext {
					protected _baseURI:string;

					constructor() {
						super();
						this._baseURI = "http://example.com/";
						this.settings = { paths: { system: ".system/" } };
					}
				}

				context = new MockedContext();
			} );

			it( hasSignature(
				"Authenticates the user with Basic HTTP Authentication, which uses an encoded string with username and password in every request.", [
					{ name: "method", type: "'BASIC'" },
					{ name: "username", type: "string" },
					{ name: "password", type: "string" },
				],
				{ type: "Promise<CarbonLDP.Auth.UsernameAndPasswordCredentials.Class>" }
			), ( done:{ ():void, fail:() => void } ):void => {
				jasmine.Ajax.stubRequest( "http://example.com/users/me/", null, "GET" ).andReturn( {
					status: 200,
					responseHeaders: {
						"ETag": "1234567890",
						"Content-Location": "http://example.com/users/my-user/",
					},
					responseText: `[ {
						"@id": "http://example.com/users/my-user/",
						"@graph": [ {
							"@id": "http://example.com/users/my-user/",
							"@type": [ "${ CS.User }" ],
							"${ CS.name }": [ {
								"@value": "My User Name",
								"@type": "${ XSD.string }"
							} ],
							"${ CS.credentials }": [ {
								"@id": "http://example.com/.system/credentials/my-user-credentials/"
							} ]
						} ]
					} ]`,
				} );

				let auth:Auth.Class = new Auth.Class( context );

				expect( auth.authenticateUsing ).toBeDefined();
				expect( Utils.isFunction( auth.authenticateUsing ) ).toBe( true );
				expect( auth.isAuthenticated() ).toBe( false );

				let username:string = "myUser@user.com";
				let password:string = "myAwesomePassword";
				let promises:Promise<any>[] = [];
				let promise:Promise<any>;

				let spies:any = {
					success: ( _auth:Auth.Class, credentials:UsernameAndPasswordCredentials ):void => {
						expect( _auth.isAuthenticated() ).toBe( true );

						expect( credentials.username ).toEqual( username );
						expect( credentials.password ).toEqual( password );

						expect( _auth.authenticatedUser ).toBeTruthy();
						expect( PersistedUser.Factory.is( _auth.authenticatedUser ) ).toBe( true );
					},
					fail: ( error ):void => {
						expect( error ).toEqual( jasmine.any( Errors.IllegalArgumentError ) );
					},
				};
				let spySuccess:jasmine.Spy = spyOn( spies, "success" ).and.callThrough();
				let spyFail:jasmine.Spy = spyOn( spies, "fail" ).and.callThrough();

				// Expected behavior
				let auth01:Auth.Class = new Auth.Class( context );
				promise = auth01.authenticateUsing( "BASIC", username, password );
				expect( promise instanceof Promise ).toBe( true );
				promises.push( promise.then( ( credentials:UsernameAndPasswordCredentials ):void => {
					spies.success( auth01, credentials );
				} ) );

				// Wrong parameters
				let auth02:Auth.Class = new Auth.Class( context );
				promise = auth02.authenticateUsing( "BASIC" as any, {} as any );
				expect( promise instanceof Promise ).toBe( true );
				promises.push( promise.catch( spies.fail ) );

				// Nonexistent authentication type
				let auth03:Auth.Class = new Auth.Class( context );
				promise = auth03.authenticateUsing( "Error" as any, username, password );
				expect( promise instanceof Promise ).toBe( true );
				promises.push( promise.catch( spies.fail ) );

				Promise.all( promises ).then( ():void => {
					expect( spySuccess.calls.count() ).toBe( 1 );
					expect( spyFail.calls.count() ).toBe( 2 );
					done();
				}, done.fail );
			} );

			it( hasSignature(
				"Authenticates the user with a username and password, and generates a JSON Web Token (JWT) credential that will be used in every request.", [
					{ name: "method", type: "'TOKEN'" },
					{ name: "username", type: "string" },
					{ name: "password", type: "string" },
				],
				{ type: "Promise<CarbonLDP.Auth.Token.Class>" }
			), ( done:{ ():void, fail:() => void } ):void => {
				let auth:Auth.Class = new Auth.Class( context );

				expect( auth.authenticateUsing ).toBeDefined();
				expect( Utils.isFunction( auth.authenticateUsing ) ).toBe( true );
				expect( auth.isAuthenticated() ).toBe( false );

				let date:Date = new Date();
				date.setDate( date.getDate() + 1 );
				let promises:Promise<any>[] = [];
				let promise:Promise<any>;
				let spies:any = {
					success: ( _auth:Auth.Class, credentials:Token.Class ):void => {
						expect( _auth.isAuthenticated() ).toBe( true );
						expect( credentials.key ).toEqual( "token-value" );

						expect( _auth.authenticatedUser ).toBeTruthy();
						expect( credentials.user ).toBe( _auth.authenticatedUser );
						expect( PersistedUser.Factory.is( _auth.authenticatedUser ) ).toBe( true );
					},
					fail: ( error ):void => {
						expect( error instanceof Errors.IllegalArgumentError ).toBe( true );
					},
				};
				let spySuccess:jasmine.Spy = spyOn( spies, "success" ).and.callThrough();
				let spyFail:jasmine.Spy = spyOn( spies, "fail" ).and.callThrough();

				jasmine.Ajax.stubRequest( "http://example.com/.system/auth-tokens/" ).andReturn( {
					status: 200,
					responseText: `[ {
						"@id": "_:00",
						"@type": [
							"${ C.ResponseMetadata }",
							"${ C.VolatileResource }"
						],
						"${ C.documentMetadata }": [ {
							"@id": "_:01"
						} ]
					}, {
						"@id": "_:01",
						"@type": [
							"${ C.DocumentMetadata }",
							"${ C.VolatileResource }"
						],
						"${ C.eTag }": [ {
							"@value": "\\"1234567890\\""
						} ],
						"${ C.relatedDocument }": [ {
							"@id": "http://example.com/users/my-user/"
						} ]
					}, {
						"@id": "_:02",
						"@type": [
							"${ CS.Token }",
							"${ C.VolatileResource }"
						],
						"${ CS.tokenKey }": [ {
							"@value": "token-value"
						} ],
						"${ CS.expirationTime }": {
							"@value": "${ date.toISOString() }",
							"@type": "${ XSD.dateTime }"
						},
						"${ CS.credentialsOf }": [ {
							"@id": "http://example.com/users/my-user/"
						} ]
					}, {
						"@id": "http://example.com/users/my-user/",
						"@graph": [ {
							"@id": "http://example.com/users/my-user/",
							"@type": [ "${ CS.User }" ],
							"${ CS.name }": [ {
								"@value": "My User Name",
								"@type": "${ XSD.string }"
							} ],
							"${ CS.credentials }": [ {
								"@id": "http://example.com/.system/credentials/my-user-credentials/"
							} ]
						} ]
					} ]`,
				} );

				// Expected behavior
				let auth01:Auth.Class = new Auth.Class( context );
				promise = auth01.authenticateUsing( "TOKEN", "myUser@user.con", "myAwesomePassword" );
				expect( promise instanceof Promise ).toBe( true );
				promises.push( promise.then( ( credentials:Token.Class ):void => {
					spies.success( auth01, credentials );
				} ) );

				// Wrong parameters
				let auth02:Auth.Class = new Auth.Class( context );
				promise = auth02.authenticateUsing( "TOKEN", {} as any );
				expect( promise instanceof Promise ).toBe( true );
				promises.push( promise.catch( spies.fail ) );

				// Nonexistent authentication method
				let auth03:Auth.Class = new Auth.Class( context );
				promise = auth03.authenticateUsing( "Error" as any, "myUser@user.con", "myAwesomePassword" );
				expect( promise instanceof Promise ).toBe( true );
				promises.push( promise.catch( spies.fail ) );

				Promise.all( promises ).then( ():void => {
					expect( spySuccess.calls.count() ).toBe( 1 );
					expect( spyFail.calls.count() ).toBe( 2 );
					done();
				}, done.fail );
			} );

			it( hasSignature(
				"Authenticates the user with a `CarbonLDP.Auth.Token.Class`, which contains a JSON Web Token (JWT) that will be used in every request.", [
					{ name: "method", type: "'TOKEN'" },
					{ name: "token", type: "CarbonLDP.Auth.Token.Class" },
				],
				{ type: "Promise<CarbonLDP.Auth.Token.Class>" }
			), ( done:{ ():void, fail:() => void } ):void => {
				jasmine.Ajax.stubRequest( "http://example.com/users/me/" ).andReturn( {
					status: 200,
					responseHeaders: {
						"ETag": "1234567890",
						"Content-Location": "http://example.com/users/my-user/",
					},
					responseText: `[ {
						"@id": "http://example.com/users/my-user/",
						"@graph": [ {
							"@id": "http://example.com/users/my-user/",
							"@type": [ "${ CS.User }" ],
							"${ CS.name }": [ {
								"@value": "My User Name",
								"@type": "${ XSD.string }"
							} ],
							"${ CS.credentials }": [ {
								"@id": "http://example.com/.system/credentials/my-user-credentials/"
							} ]
						} ]
					} ]`,
				} );
				let auth01:Auth.Class = new Auth.Class( context );
				let auth02:Auth.Class = new Auth.Class( context );

				expect( auth01.authenticateUsing ).toBeDefined();
				expect( Utils.isFunction( auth01.authenticateUsing ) ).toBe( true );
				expect( auth01.isAuthenticated() ).toBe( false );


				let date:Date;
				let token:Token.Class;
				let promises:Promise<any>[] = [];
				let promise:Promise<any>;
				let spies:any = {
					success01: ( _auth:Auth.Class, credentials:Token.Class ):void => {
						expect( credentials.key ).toEqual( token.key );
						expect( _auth.isAuthenticated() ).toBe( true );

						expect( _auth.authenticatedUser ).toBeTruthy();
						expect( credentials.user ).toBe( _auth.authenticatedUser );
						expect( PersistedUser.Factory.is( _auth.authenticatedUser ) ).toBe( true );
					},
					success02: ( _auth:Auth.Class, credentials:Token.Class ):void => {
						expect( credentials.key ).toEqual( token.key );
						expect( _auth.isAuthenticated() ).toBe( true );

						expect( _auth.authenticatedUser ).toBeTruthy();
						expect( credentials.user ).toBe( _auth.authenticatedUser );
						expect( PersistedUser.Factory.is( _auth.authenticatedUser ) ).toBe( true );
					},
					fail: ( error ):void => {
						expect( error ).toEqual( jasmine.any( Errors.IllegalArgumentError ) );
					},
				};
				let spySuccess01:jasmine.Spy = spyOn( spies, "success01" ).and.callThrough();
				let spySuccess02:jasmine.Spy = spyOn( spies, "success02" ).and.callThrough();
				let spyFail:jasmine.Spy = spyOn( spies, "fail" ).and.callThrough();

				// Expected behavior
				date = new Date();
				date.setDate( date.getDate() + 1 );
				token = <any> {
					expirationTime: date,
					id: "_:BlankNode",
					key: "dG9rZW4tdmFsdWU=",
					types: [ CS.Token ],
				};
				promise = auth01.authenticateUsing( "TOKEN", token );
				expect( promise instanceof Promise ).toBe( true );
				promises.push( promise.then( ( credentials:Token.Class ):void => {
					spies.success01( auth01, credentials );
				} ) );

				// Expected behavior. If expirationDate is a string the method parse it to a Date object
				date = new Date();
				date.setDate( date.getDate() + 1 );
				let getFromStorage:Function = ():Object => {
					let storedToken:any = {
						expirationTime: date.toISOString(),
						id: "_:BlankNode",
						key: "dG9rZW4tdmFsdWU=",
						types: [ CS.Token ],
					};
					return JSON.parse( JSON.stringify( storedToken ) );
				};
				promise = auth02.authenticateUsing( "TOKEN", <Token.Class> getFromStorage() );
				expect( promise instanceof Promise ).toBe( true );
				promises.push( promise.then( ( credentials:Token.Class ):void => {
					spies.success02( auth01, credentials );
				} ) );

				// ExpirationDate has been reached
				let auth03:Auth.Class = new Auth.Class( context );
				date = new Date();
				date.setDate( date.getDate() - 1 );
				token = <any> {
					expirationTime: date,
					id: "_:BlankNode",
					key: "dG9rZW4tdmFsdWU=",
					types: [ CS.Token ],
				};
				promise = auth03.authenticateUsing( "TOKEN", token );
				expect( promise instanceof Promise ).toBe( true );
				promises.push( promise.catch( spies.fail ) );

				// Wrong parameters
				promise = auth03.authenticateUsing( "TOKEN", {} as any );
				expect( promise instanceof Promise ).toBe( true );
				promises.push( promise.catch( spies.fail ) );

				// Nonexistent authentication method
				promise = auth03.authenticateUsing( "Error" as any, token );
				expect( promise instanceof Promise ).toBe( true );
				promises.push( promise.catch( spies.fail ) );

				Promise.all( promises ).then( ():void => {
					expect( spySuccess01.calls.count() ).toBe( 1 );
					expect( spySuccess02.calls.count() ).toBe( 1 );
					expect( spyFail.calls.count() ).toBe( 3 );
					done();
				}, done.fail );
			} );

		} );

		it( hasMethod(
			INSTANCE,
			"addAuthentication",
			"Adds the authentication header to a `CarbonLDP.HTTP.RequestOptions` object.", [
				{ name: "options", type: "CarbonLDP.HTTP.RequestOptions" },
			]
		), ():void => {

			// Property Integrity
			(function propertyIntegrity():void {
				class MockedContext extends AbstractContext {
					protected _baseURI:string;

					constructor() {
						super();
						this._baseURI = "";
					}
				}

				let context:AbstractContext = new MockedContext();

				let auth:Auth.Class = new Auth.Class( context );

				expect( auth.addAuthentication ).toBeDefined();
				expect( Utils.isFunction( auth.addAuthentication ) ).toBe( true );
			})();

			// Neither current nor parent authenticated
			(function currentNotAuthenticated_parentNotAuthenticated():void {
				class MockedContext extends AbstractContext {
					protected _baseURI:string;

					constructor() {
						super();
						this.auth = new Auth.Class( this );
						this._baseURI = "";
						this._parentContext = this;
					}
				}

				let context:AbstractContext = new MockedContext();
				let auth:Auth.Class = new Auth.Class( context );

				let spyParent:jasmine.Spy = spyOn( context.auth, "addAuthentication" ).and.callFake( mockOptions => {
					mockOptions[ "parentAuth" ] = "no authenticated";
				} );

				let options:RequestOptions & { parentAuth?:string } = {};

				auth.addAuthentication( options );
				expect( spyParent ).toHaveBeenCalledWith( options );
				expect( options ).toEqual( { parentAuth: "no authenticated" } );
			})();

			// Current not authenticated but parent is
			(function currentNotAuthenticated_parentAuthenticated():void {
				class MockedContext extends AbstractContext {
					protected _baseURI:string;

					constructor() {
						super();
						this.auth = new Auth.Class( this );
						this._baseURI = "";
						this._parentContext = this;
					}
				}

				let context:AbstractContext = new MockedContext();
				let auth:Auth.Class = new Auth.Class( context );

				let spyParent:jasmine.Spy = spyOn( context.auth, "addAuthentication" ).and.callFake( mockOptions => {
					mockOptions[ "parentAuth" ] = "is authenticated";
				} );

				let options:RequestOptions & { parentAuth?:string } = {};

				auth.addAuthentication( options );
				expect( spyParent ).toHaveBeenCalledWith( options );
				expect( options ).toEqual( { parentAuth: "is authenticated" } );
			})();

			// Current and parent authenticated
			(function currentAuthenticated_parentAuthenticated():void {
				class MockedContext extends AbstractContext {
					protected _baseURI:string;

					constructor() {
						super();
						this.auth = new Auth.Class( this );
						this._baseURI = "";
						this._parentContext = this;
					}
				}

				let context:AbstractContext = new MockedContext();
				let auth:Auth.Class = new Auth.Class( context );

				(<any> auth).authenticator = {
					isAuthenticated: ():boolean => true, addAuthentication: ( mockOptions:any ):void => {
						mockOptions[ "currentAuth" ] = "is authenticated";
					},
				};
				let spyParent:jasmine.Spy = spyOn( context.auth, "addAuthentication" ).and.callFake( mockOptions => {
					mockOptions[ "parentAuth" ] = "is authenticated";
				} );

				let options:RequestOptions & { currentAuth?:string } = {};

				auth.addAuthentication( options );
				expect( spyParent ).not.toHaveBeenCalled();
				expect( options ).toEqual( { currentAuth: "is authenticated" } );
			})();

			// Current authenticated but parent not
			(function currentAuthenticated_parentNotAuthenticated():void {
				class MockedContext extends AbstractContext {
					protected _baseURI:string;

					constructor() {
						super();
						this.auth = new Auth.Class( this );
						this._baseURI = "";
						this._parentContext = this;
					}
				}

				let context:AbstractContext = new MockedContext();
				let auth:Auth.Class = new Auth.Class( context );
				(<any> auth).authenticator = {
					isAuthenticated: ():boolean => true, addAuthentication: ( mockOptions:any ):void => {
						mockOptions[ "currentAuth" ] = "is authenticated";
					},
				};
				let spyParent:jasmine.Spy = spyOn( context.auth, "addAuthentication" ).and.callFake( mockOptions => {
					mockOptions[ "parentAuth" ] = "no authenticated";
				} );

				let options:RequestOptions & { currentAuth?:string } = {};

				auth.addAuthentication( options );
				expect( spyParent ).not.toHaveBeenCalled();
				expect( options ).toEqual( { currentAuth: "is authenticated" } );
			})();

		} );

		it( hasMethod(
			INSTANCE,
			"clearAuthentication",
			"Deletes the authentication of the current instance."
		), ():void => {

			// Property Integrity
			(function propertyIntegrity():void {
				class MockedContext extends AbstractContext {
					protected _baseURI:string;

					constructor() {
						super();
						this._baseURI = "";
					}
				}

				let context:AbstractContext = new MockedContext();

				let auth:Auth.Class = new Auth.Class( context );

				expect( auth.clearAuthentication ).toBeDefined();
				expect( Utils.isFunction( auth.clearAuthentication ) ).toBe( true );
			})();

			// The module isn't authenticated
			(function NotAuthenticated():void {
				class MockedContext extends AbstractContext {
					protected _baseURI:string;

					constructor() {
						super();
						this._baseURI = "";
					}
				}

				let context:AbstractContext = new MockedContext();

				let auth:Auth.Class = new Auth.Class( context );

				auth.clearAuthentication();
				expect( (<any> auth).authenticator ).toBeFalsy();
			})();

			// The module is authenticated
			(function currentAuthenticated():void {
				class MockedContext extends AbstractContext {
					protected _baseURI:string;

					constructor() {
						super();
						this._baseURI = "";
					}
				}

				let context:AbstractContext = new MockedContext();

				let auth:Auth.Class = new Auth.Class( context );

				(<any> auth).authenticator = {
					isAuthenticated: ():boolean => true,
					clearAuthentication: ():void => {},
				};
				let spyClear:jasmine.Spy = spyOn( (<any> auth).authenticator, "clearAuthentication" );

				expect( auth.isAuthenticated() ).toBe( true );
				auth.clearAuthentication();
				expect( (<any> auth).authenticator ).toBeFalsy();
				expect( auth.isAuthenticated() ).toBe( false );
				expect( spyClear ).toHaveBeenCalled();
			})();

		} );

		it( hasMethod(
			INSTANCE,
			"createTicket",
			"Retrieves an authentication ticket for the URI specified.", [
				{ name: "uri", type: "string", description: "The URI to get an authentication ticket for." },
				{ name: "requestOptions", type: "CarbonLDP.HTTP.RequestOptions", optional: true },
			],
			{ type: "Promise<[ CarbonLDP.Auth.Ticket.Class, CarbonLDP.HTTP.Response ]>" }
		), ( done:{ ():void, fail:() => void } ):void => {
			class MockedContext extends AbstractContext {
				protected _baseURI:string;

				constructor() {
					super();
					this._baseURI = "http://example.com/";
					this.settings = { paths: { system: ".system/" } };
				}
			}

			class MockedEmptyContext extends AbstractContext {
				protected _baseURI:string;

				constructor() {
					super();
					this._baseURI = "http://empty.example.com/";
					this.settings = { paths: { system: ".system/" } };
				}
			}

			class MockedMultipleContext extends AbstractContext {
				protected _baseURI:string;

				constructor() {
					super();
					this._baseURI = "http://multiple.example.com/";
					this.settings = { paths: { system: ".system/" } };
				}
			}

			let auth:Auth.Class = new Auth.Class( new MockedContext() );
			let auth2:Auth.Class = new Auth.Class( new MockedEmptyContext() );
			let auth3:Auth.Class = new Auth.Class( new MockedMultipleContext() );

			expect( auth.createTicket ).toBeDefined();
			expect( Utils.isFunction( auth.createTicket ) ).toBe( true );

			let expirationTime:Date = new Date();
			expirationTime.setDate( expirationTime.getDate() + 1 );

			jasmine.Ajax.stubRequest( "http://example.com/.system/auth-tickets/", null, "POST" ).andReturn( {
				status: 200,
				responseText: `[ {
					"@id":"_:01",
					"@type":[
						"${ CS.Ticket }"
					],
					"${ CS.expirationTime }":[ {
						"@type": "${ XSD.dateTime }",
						"@value": "${ expirationTime.toISOString() }"
					} ],
					"${ CS.forIRI }":[ {
						"@id": "http://example.com/resource/"
					} ],
					"${ CS.ticketKey }":[ {
						"@value": "1234123412341234"
					} ]
				} ]`,
			} );

			jasmine.Ajax.stubRequest( "http://empty.example.com/.system/auth-tickets/", null, "POST" ).andReturn( {
				status: 200,
				responseText: "[]",
			} );
			jasmine.Ajax.stubRequest( "http://multiple.example.com/.system/auth-tickets/", null, "POST" ).andReturn( {
				status: 200,
				responseText: `[ {
					"@id":"_:01",
					"@type":[
						"${ CS.Ticket }"
					],
					"${ CS.expirationTime }":[ {
						"@type": "${ XSD.dateTime }",
						"@value": "${ expirationTime.toISOString() }"
					} ],
					"${ CS.forIRI }":[ {
						"@id": "http://multiple.example.com/resource/"
					} ],
					"${ CS.ticketKey }":[ {
						"@value": "1234123412341234"
					} ]
				}, {
					"@id":"_:02",
					"@type":[
						"${ CS.Ticket }"
					],
					"${ CS.expirationTime }":[ {
						"@type": "${ XSD.dateTime }",
						"@value": "${ expirationTime.toISOString() }"
					} ],
					"${ CS.forIRI }":[ {
						"@id": "http://multiple.example.com/resource/"
					} ],
					"${ CS.ticketKey }":[ {
						"@value": "1234123412341234"
					} ]
				} ]`,
			} );

			let promises:Promise<any> [] = [];
			let promise:Promise<any>;

			function checkSuccess( [ ticket, response ]:[ Ticket.Class, Response ] ):void {
				expect( ticket.expirationTime.getTime() ).toBeGreaterThan( Date.now() );
				expect( ticket.forURI.id ).toBe( "http://example.com/resource/" );
				expect( Utils.isString( ticket.ticketKey ) ).toBe( true );

				expect( response instanceof Response ).toBe( true );
			}

			function checkFail( error:Error ):void {
				expect( error instanceof BadResponseError ).toBe( true );
			}

			promise = auth.createTicket( "http://example.com/resource/" );
			expect( promise instanceof Promise ).toBe( true );
			promises.push( promise.then( checkSuccess ) );

			promise = auth.createTicket( "resource/" );
			expect( promise instanceof Promise ).toBe( true );
			promises.push( promise.then( checkSuccess ) );

			promise = auth2.createTicket( "http://empty.example.com/resource/" );
			expect( promise instanceof Promise ).toBe( true );
			promises.push( promise.catch( checkFail ) );

			promise = auth3.createTicket( "http://multiple.example.com/resource/" );
			expect( promise instanceof Promise ).toBe( true );
			promises.push( promise.catch( checkFail ) );

			Promise.all( promises ).then( done ).catch( done.fail );
		} );

		it( hasMethod(
			INSTANCE,
			"getAuthenticatedURL",
			"Returns a Promise with a one time use only authenticated URI.", [
				{ name: "uri", type: "string", description: "The URI to generate an authenticated URI for." },
				{ name: "requestOptions", type: "CarbonLDP.HTTP.RequestOptions", optional: true },
			],
			{ type: "Promise<string>" }
		), ( done:{ ():void, fail:() => void } ) => {
			class MockedContext extends AbstractContext {
				protected _baseURI:string;

				constructor() {
					super();
					this._baseURI = "http://example.com/";
					this.settings = { paths: { system: ".system/" } };
				}
			}

			let context:AbstractContext = new MockedContext();
			let auth:Auth.Class = new Auth.Class( context );

			expect( auth.getAuthenticatedURL ).toBeDefined();
			expect( Utils.isFunction( auth.getAuthenticatedURL ) ).toBe( true );

			spyOn( auth, "createTicket" ).and.returnValue( Promise.resolve( [ {
				id: "_:01",
				types: [ CS.Ticket ],
				expirationTime: new Date(),
				forURI: context.documents.getPointer( "http://example.com/resource/" ),
				ticketKey: "1234123412341234",
			}, null ] ) );

			let promises:Promise<any>[] = [];
			let promise:Promise<any>;

			promise = auth.getAuthenticatedURL( "http://example.com/resource/" );
			expect( promise instanceof Promise ).toBe( true );
			promises.push( promise.then( ( uri:string ) => {
				expect( Utils.isString( uri ) ).toBe( true );
				expect( URI.isBaseOf( "http://example.com/resource/", uri ) ).toBe( true );

				let query:Map<string, string | string[]> = URI.getParameters( uri );
				expect( query.size ).toBe( 1 );
				expect( query.get( "ticket" ) ).toBe( "1234123412341234" );
			} ) );

			promise = auth.getAuthenticatedURL( "http://example.com/resource/?another=yes" );
			expect( promise instanceof Promise ).toBe( true );
			promises.push( promise.then( ( uri:string ) => {
				expect( Utils.isString( uri ) ).toBe( true );
				expect( URI.isBaseOf( "http://example.com/resource/", uri ) ).toBe( true );

				let query:Map<string, string | string[]> = URI.getParameters( uri );
				expect( query.size ).toBe( 2 );
				expect( query.get( "another" ) ).toBe( "yes" );
				expect( query.get( "ticket" ) ).toBe( "1234123412341234" );
			} ) );

			Promise.all( promises ).then( done ).catch( done.fail );
		} );

	} );

	it( hasDefaultExport( "CarbonLDP.Auth.Class" ), ():void => {
		expect( DefaultExport ).toBeDefined();
		expect( DefaultExport ).toBe( Auth.Class );
	} );

} );
