import { AbstractContext } from "../AbstractContext";
import * as Errors from "../Errors";
import { BadResponseError } from "../HTTP/Errors";
import { RequestOptions } from "../HTTP/Request";
import { Response } from "../HTTP/Response";
import { Resource } from "../Resource";
import { ContextSettings } from "../Settings";
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
import { CS } from "../Vocabularies/CS";
import { XSD } from "../Vocabularies/XSD";

import * as Auth from "./";

import { ACE } from "./ACE";
import { ACL } from "./ACL";
import Authenticator from "./Authenticator";
import BasicAuthenticator from "./BasicAuthenticator";
import * as Credentials from "./Credentials";
import { PersistedACE } from "./PersistedACE";
import { PersistedACL } from "./PersistedACL";
import * as PersistedCredentials from "./PersistedCredentials";
import * as PersistedRole from "./PersistedRole";
import * as PersistedUser from "./PersistedUser";
import * as Role from "./Role";
import * as Roles from "./Roles";
import * as Ticket from "./Ticket";
import TokenAuthenticator from "./TokenAuthenticator";
import * as TokenCredentials from "./TokenCredentials";
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
		"carbonldp/Auth/User"
	), ():void => {
		expect( Auth.User ).toBeDefined();
		expect( Auth.User ).toBe( User );
	} );

	it( reexports(
		STATIC,
		"Users",
		"carbonldp/Auth/Users"
	), ():void => {
		expect( Auth.Users ).toBeDefined();
		expect( Auth.Users ).toBe( Users );
	} );

	it( reexports(
		STATIC,
		"Authenticator",
		"carbonldp/Auth/Authenticator"
	), ():void => {
	} );

	it( reexports(
		STATIC,
		"BasicAuthenticator",
		"carbonldp/Auth/BasicAuthenticator"
	), ():void => {
		expect( Auth.BasicAuthenticator ).toBeDefined();
		expect( Auth.BasicAuthenticator ).toBe( BasicAuthenticator );
	} );

	it( reexports(
		STATIC,
		"Credentials",
		"carbonldp/Auth/Credentials"
	), ():void => {
		expect( Auth.Credentials ).toBeDefined();
		expect( Auth.Credentials ).toBe( Credentials );
	} );

	it( reexports(
		STATIC,
		"PersistedACE",
		"CarbonLDP.Auth.PersistedACE"
	), ():void => {
		const target:Auth.PersistedACE = {} as PersistedACE;
		expect( target ).toBeDefined();
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
		"carbonldp/Auth/PersistedCredentials"
	), ():void => {
		expect( Auth.PersistedCredentials ).toBeDefined();
		expect( Auth.PersistedCredentials ).toBe( PersistedCredentials );
	} );

	it( reexports(
		STATIC,
		"PersistedUser",
		"carbonldp/Auth/PersistedUser"
	), ():void => {
		expect( Auth.PersistedUser ).toBeDefined();
		expect( Auth.PersistedUser ).toBe( PersistedUser );
	} );

	it( reexports(
		STATIC,
		"PersistedRole",
		"carbonldp/Auth/PersistedRole"
	), ():void => {
		expect( Auth.PersistedRole ).toBeDefined();
		expect( Auth.PersistedRole ).toBe( PersistedRole );
	} );

	it( reexports(
		STATIC,
		"Role",
		"carbonldp/Auth/Role"
	), ():void => {
		expect( Auth.Role ).toBeDefined();
		expect( Auth.Role ).toBe( Role );
	} );

	it( reexports(
		STATIC,
		"Roles",
		"carbonldp/Auth/Roles"
	), ():void => {
		expect( Auth.Roles ).toBeDefined();
		expect( Auth.Roles ).toBe( Roles );
	} );

	it( reexports(
		STATIC,
		"Ticket",
		"carbonldp/Auth/Ticket"
	), ():void => {
		expect( Auth.Ticket ).toBeDefined();
		expect( Auth.Ticket ).toBe( Ticket );
	} );

	it( reexports(
		STATIC,
		"TokenCredentials",
		"carbonldp/Auth/TokenCredentials"
	), ():void => {
		expect( Auth.TokenCredentials ).toBeDefined();
		expect( Auth.TokenCredentials ).toBe( TokenCredentials );
	} );

	it( reexports(
		STATIC,
		"TokenAuthenticator",
		"carbonldp/Auth/TokenAuthenticator"
	), ():void => {
		expect( Auth.TokenAuthenticator ).toBeDefined();
		expect( Auth.TokenAuthenticator ).toBe( TokenAuthenticator );
	} );

	it( reexports(
		STATIC,
		"UsernameAndPasswordToken",
		"carbonldp/Auth/UsernameAndPasswordToken"
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
			"Authenticate the user with a `username` and `password`. Uses the `CarbonLDP.Auth.Method.TOKEN` method for the authentication.", [
				{ name: "username", type: "string" },
				{ name: "password", type: "string" },
			],
			{ type: "Promise<CarbonLDP.Auth.TokenCredentials.Class>" }
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

			expect( spy ).toHaveBeenCalledWith( Auth.Method.TOKEN, "myUer@user.com", "myAwesomePassword" );
		} );

		describe( method(
			INSTANCE,
			"authenticateUsing"
		), ():void => {

			let context:AbstractContext;
			beforeEach( ():void => {
				context = new class extends AbstractContext {
					protected _baseURI:string = "http://example.com/";
					protected settings:ContextSettings = {
						paths: {
							system: {
								slug: ".system/",
								paths: {
									system: "system/",
								},
							},
						},
					};
				};
			} );

			it( hasSignature(
				"Authenticates the user with Basic HTTP Authentication, which uses an encoded string with username and password in every request.", [
					{ name: "method", type: "CarbonLDP.Auth.Method.BASIC" },
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
				promise = auth01.authenticateUsing( Auth.Method.BASIC, username, password );
				expect( promise instanceof Promise ).toBe( true );
				promises.push( promise.then( ( credentials:UsernameAndPasswordCredentials ):void => {
					spies.success( auth01, credentials );
				} ) );

				// Wrong parameters
				let auth02:Auth.Class = new Auth.Class( context );
				promise = auth02.authenticateUsing( Auth.Method.BASIC as any, {} as any );
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
					{ name: "method", type: "CarbonLDP.Auth.Method.TOKEN" },
					{ name: "username", type: "string" },
					{ name: "password", type: "string" },
				],
				{ type: "Promise<CarbonLDP.Auth.TokenCredentials.Class>" }
			), ( done:DoneFn ):void => {
				let auth:Auth.Class = new Auth.Class( context );

				expect( auth.authenticateUsing ).toBeDefined();
				expect( Utils.isFunction( auth.authenticateUsing ) ).toBe( true );
				expect( auth.isAuthenticated() ).toBe( false );

				let date:Date = new Date();
				date.setDate( date.getDate() + 1 );
				let promises:Promise<any>[] = [];
				let promise:Promise<any>;
				let spies:any = {
					success: ( _auth:Auth.Class, credentials:TokenCredentials.Class ):void => {
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

				spyOn( TokenAuthenticator.prototype, "authenticate" ).and.callFake( ():Promise<TokenCredentials.Class> => {
					return Promise.resolve( Resource.createFrom( {
						key: "token-value",
						expirationTime: date,
						user: PersistedUser.Factory.decorate( {
							_eTag: "\"1-123445\"",
							name: "My User Name",
						}, context.documents ),
					} ) );
				} );

				// Expected behavior
				let auth01:Auth.Class = new Auth.Class( context );
				promise = auth01.authenticateUsing( Auth.Method.TOKEN, "myUser@user.con", "myAwesomePassword" );
				expect( promise instanceof Promise ).toBe( true );
				promises.push( promise.then( ( credentials:TokenCredentials.Class ):void => {
					spies.success( auth01, credentials );
				} ) );

				// Wrong parameters
				let auth02:Auth.Class = new Auth.Class( context );
				promise = auth02.authenticateUsing( Auth.Method.TOKEN, {} as any );
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
				"Authenticates the user with a `CarbonLDP.Auth.TokenCredentials.Class`, which contains a JSON Web Token (JWT) that will be used in every request.", [
					{ name: "method", type: "CarbonLDP.Auth.Method.TOKEN" },
					{ name: "token", type: "CarbonLDP.Auth.TokenCredentials.Class" },
				],
				{ type: "Promise<CarbonLDP.Auth.TokenCredentials.Class>" }
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
				let token:TokenCredentials.Class;
				let promises:Promise<any>[] = [];
				let promise:Promise<any>;
				let spies:any = {
					success01: ( _auth:Auth.Class, credentials:TokenCredentials.Class ):void => {
						expect( credentials.key ).toEqual( token.key );
						expect( _auth.isAuthenticated() ).toBe( true );

						expect( _auth.authenticatedUser ).toBeTruthy();
						expect( credentials.user ).toBe( _auth.authenticatedUser );
						expect( PersistedUser.Factory.is( _auth.authenticatedUser ) ).toBe( true );
					},
					success02: ( _auth:Auth.Class, credentials:TokenCredentials.Class ):void => {
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
				promise = auth01.authenticateUsing( Auth.Method.TOKEN, token );
				expect( promise instanceof Promise ).toBe( true );
				promises.push( promise.then( ( credentials:TokenCredentials.Class ):void => {
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
				promise = auth02.authenticateUsing( Auth.Method.TOKEN, <TokenCredentials.Class> getFromStorage() );
				expect( promise instanceof Promise ).toBe( true );
				promises.push( promise.then( ( credentials:TokenCredentials.Class ):void => {
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
				promise = auth03.authenticateUsing( Auth.Method.TOKEN, token );
				expect( promise instanceof Promise ).toBe( true );
				promises.push( promise.catch( spies.fail ) );

				// Wrong parameters
				promise = auth03.authenticateUsing( Auth.Method.TOKEN, {} as any );
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

		describe( method( INSTANCE, "createTicket" ), ():void => {

			it( hasSignature(
				"Retrieves an authentication ticket for the URI specified.", [
					{ name: "uri", type: "string", description: "The URI to get an authentication ticket for." },
					{ name: "requestOptions", type: "CarbonLDP.HTTP.RequestOptions", optional: true },
				],
				{ type: "Promise<[ CarbonLDP.Auth.Ticket.Class, CarbonLDP.HTTP.Response ]>" }
			), ():void => {} );

			it( "should exists", ():void => {
				expect( Auth.Class.prototype.createTicket ).toBeDefined();
				expect( Auth.Class.prototype.createTicket ).toEqual( jasmine.any( Function ) );
			} );

			let context:AbstractContext;
			beforeEach( ():void => {
				context = new class extends AbstractContext {
					protected _baseURI:string = "https://example.com/";
					protected settings:ContextSettings = {
						paths: {
							system: {
								slug: ".system/",
								paths: {
									security: "security/",
								},
							},
						},
					};
				};
			} );

			it( "should return the ticket requested", ( done:DoneFn ):void => {
				const expirationTime:Date = new Date();
				expirationTime.setDate( expirationTime.getDate() + 1 );

				jasmine.Ajax.stubRequest( "https://example.com/.system/security/auth-tickets/", null, "POST" ).andReturn( {
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
								"@id": "https://example.com/resource/"
							} ],
							"${ CS.ticketKey }":[ {
								"@value": "12345"
							} ]
						} ]`,
				} );

				const auth:Auth.Class = new Auth.Class( context );
				auth.createTicket( "https://example.com/resource/" )
					.then( ( [ ticket, response ]:[ Ticket.Class, Response ] ) => {
						expect( response ).toEqual( jasmine.any( Response ) );

						expect( ticket ).toBeDefined();
						expect( ticket.expirationTime ).toEqual( expirationTime );
						expect( ticket.forURI.id ).toBe( "https://example.com/resource/" );
						expect( ticket.ticketKey ).toBe( "12345" );

						done();
					} )
					.catch( done.fail );
			} );

			it( "should reject when no ticket resource in the response", ( done:DoneFn ):void => {
				jasmine.Ajax.stubRequest( "https://example.com/.system/security/auth-tickets/", null, "POST" ).andReturn( {
					status: 200,
					responseText: `[]`,
				} );

				const auth:Auth.Class = new Auth.Class( context );
				auth.createTicket( "https://example.com/resource/" )
					.then( () => {
						done.fail( "Should no resolve" );
					} )
					.catch( ( error ) => {
						expect( error ).toEqual( jasmine.any( BadResponseError ) );
						expect( error.message ).toBe( `No ${ CS.Ticket } was returned.` );

						done();
					} );
			} );

			it( "should reject when multiple ticket resources in the response", ( done:DoneFn ):void => {
				const expirationTime:Date = new Date();
				expirationTime.setDate( expirationTime.getDate() + 1 );

				jasmine.Ajax.stubRequest( "https://example.com/.system/security/auth-tickets/", null, "POST" ).andReturn( {
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
							"@id": "https://example.com/resource/"
						} ],
						"${ CS.ticketKey }":[ {
							"@value": "12345"
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
							"@id": "https://example.com/resource/"
						} ],
						"${ CS.ticketKey }":[ {
							"@value": "67890"
						} ]
					} ]`,
				} );

				const auth:Auth.Class = new Auth.Class( context );
				auth.createTicket( "https://example.com/resource/" )
					.then( () => {
						done.fail( "Should no resolve" );
					} )
					.catch( ( error ) => {
						expect( error ).toEqual( jasmine.any( BadResponseError ) );
						expect( error.message ).toBe( `Multiple ${ CS.Ticket } were returned.` );

						done();
					} );
			} );


			it( "should call _parseErrorResponse when request error", ( done:DoneFn ):void => {
				jasmine.Ajax.stubRequest( "https://example.com/.system/security/auth-tickets/" ).andReturn( {
					status: 500,
				} );

				const error:Error = new Error( "Error message" );
				const spy:jasmine.Spy = spyOn( context.documents, "_parseErrorResponse" ).and.callFake( () => Promise.reject( error ) );

				const auth:Auth.Class = new Auth.Class( context );
				auth.createTicket( "https://example.com/resource/" )
					.then( () => {
						done.fail( "Should not resolve" );
					} )
					.catch( _error => {
						expect( spy ).toHaveBeenCalled();

						expect( _error ).toBeDefined();
						expect( _error ).toBe( error );

						done();
					} )
				;
			} );

		} );

		describe( method( INSTANCE, "getAuthenticatedURL" ), ():void => {

			it( hasSignature(
				"Returns a Promise with a one time use only authenticated URI.", [
					{ name: "uri", type: "string", description: "The URI to generate an authenticated URI for." },
					{ name: "requestOptions", type: "CarbonLDP.HTTP.RequestOptions", optional: true },
				],
				{ type: "Promise<string>" }
			), ():void => {} );

			it( "should exists", ():void => {
				expect( Auth.Class.prototype.getAuthenticatedURL ).toBeDefined();
				expect( Auth.Class.prototype.getAuthenticatedURL ).toEqual( jasmine.any( Function ) );
			} );

			let context:AbstractContext;
			beforeEach( ():void => {
				context = new class extends AbstractContext {
					protected _baseURI:string = "https://example.com/";
				};
			} );

			it( "should call to createTicket", ( done:DoneFn ):void => {
				const auth:Auth.Class = new Auth.Class( context );

				const spy:jasmine.Spy = spyOn( auth, "createTicket" )
					.and.returnValue( Promise.reject( "spy called" ) );

				auth.getAuthenticatedURL( "https://example.com/resource/" )
					.then( () => {
						done.fail( "Should not resolve" );
					} )
					.catch( ( returned ) => {
						expect( spy ).toHaveBeenCalledWith( "https://example.com/resource/", void 0 );

						expect( returned ).toBe( "spy called" );

						done();
					} );
			} );

			it( "should add the ticket query to the URL", ( done:DoneFn ):void => {
				const auth:Auth.Class = new Auth.Class( context );

				spyOn( auth, "createTicket" )
					.and.returnValue( Promise.resolve( [ {
					expirationTime: new Date(),
					forURI: context.documents.getPointer( "https://example.com/resource/" ),
					ticketKey: "12345",
				}, null ] ) );

				auth.getAuthenticatedURL( "https://example.com/resource/" )
					.then( ( authenticatedURL:string ) => {
						expect( authenticatedURL ).toEqual( jasmine.any( String ) );
						expect( authenticatedURL ).toBe( "https://example.com/resource/?ticket=12345" );

						done();
					} )
					.catch( done.fail );
			} );

			it( "should add the ticket query to a URL with query", ( done:DoneFn ):void => {
				const auth:Auth.Class = new Auth.Class( context );

				spyOn( auth, "createTicket" )
					.and.returnValue( Promise.resolve( [ {
					expirationTime: new Date(),
					forURI: context.documents.getPointer( "https://example.com/resource/" ),
					ticketKey: "12345",
				}, null ] ) );

				auth.getAuthenticatedURL( "https://example.com/resource/?another=value" )
					.then( ( authenticatedURL:string ) => {
						expect( authenticatedURL ).toEqual( jasmine.any( String ) );
						expect( authenticatedURL ).toBe( "https://example.com/resource/?another=value&ticket=12345" );

						done();
					} )
					.catch( done.fail );
			} );

		} );

	} );

	it( hasDefaultExport( "CarbonLDP.Auth.Class" ), ():void => {
		expect( Auth.default ).toBeDefined();
		expect( Auth.default ).toBe( Auth.Class );
	} );

} )
;
