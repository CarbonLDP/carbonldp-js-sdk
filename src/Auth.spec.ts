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
	hasDefaultExport,
	reexports,
	hasEnumeral,
	hasSignature,
} from "./test/JasmineExtender";
import * as Utils from "./Utils";
import * as Agent from "./Auth/Agent";
import * as Agents from "./Auth/Agents";
import AbstractContext from "./AbstractContext";
import * as ACE from "./Auth/ACE";
import * as ACL from "./Auth/ACL";
import AuthenticationToken from "./Auth/AuthenticationToken";
import Authenticator from "./Auth/Authenticator";
import BasicAuthenticator from "./Auth/BasicAuthenticator";
import * as PersistedACE from "./Auth/PersistedACE";
import * as PersistedACL from "./Auth/PersistedACL";
import * as PersistedAgent from "./Auth/PersistedAgent";
import * as PersistedDocument from "./PersistedDocument";
import * as Role from "./Auth/Role";
import * as Roles from "./Auth/Roles";
import * as Ticket from "./Auth/Ticket";
import * as Token from "./Auth/Token";
import TokenAuthenticator from "./Auth/TokenAuthenticator";
import UsernameAndPasswordToken from "./Auth/UsernameAndPasswordToken";
import UsernameAndPasswordCredentials from "./Auth/UsernameAndPasswordCredentials";
import * as Errors from "./Errors";
import * as HTTP from "./HTTP";
import * as URI from "./RDF/URI";

import * as Auth from "./Auth";
import DefaultExport from "./Auth";

describe( module( "Carbon/Auth" ), ():void => {

	it( isDefined(), ():void => {
		expect( Auth ).toBeDefined();
		expect( Utils.isObject( Auth ) ).toBe( true );
	} );

	it( reexports(
		STATIC,
		"ACE",
		"Carbon.Auth.ACE"
	), ():void => {
		expect( Auth.ACE ).toBeDefined();
		expect( Auth.ACE ).toBe( ACE );
	} );

	it( reexports(
		STATIC,
		"ACL",
		"Carbon.Auth.ACL"
	), ():void => {
		expect( Auth.ACL ).toBeDefined();
		expect( Auth.ACL ).toBe( ACL );
	} );

	it( reexports(
		STATIC,
		"Agent",
		"Carbon.Auth.Agent"
	), ():void => {
		expect( Auth.Agent ).toBeDefined();
		expect( Auth.Agent ).toBe( Agent );
	} );

	it( reexports(
		STATIC,
		"Agents",
		"Carbon.Auth.Agents"
	), ():void => {
		expect( Auth.Agents ).toBeDefined();
		expect( Auth.Agents ).toBe( Agents );
	} );

	it( reexports(
		STATIC,
		"AuthenticationToken",
		"Carbon.Auth.AuthenticationToken"
	), ():void => {
	} );

	it( reexports(
		STATIC,
		"Authenticator",
		"Carbon.Auth.Authenticator"
	), ():void => {
	} );

	it( reexports(
		STATIC,
		"BasicAuthenticator",
		"Carbon.Auth.BasicAuthenticator"
	), ():void => {
		expect( Auth.BasicAuthenticator ).toBeDefined();
		expect( Auth.BasicAuthenticator ).toBe( BasicAuthenticator );
	} );

	it( reexports(
		STATIC,
		"PersistedACE",
		"Carbon.Auth.PersistedACE"
	), ():void => {
		expect( Auth.PersistedACE ).toBeDefined();
		expect( Auth.PersistedACE ).toBe( PersistedACE );
	} );

	it( reexports(
		STATIC,
		"PersistedACL",
		"Carbon.Auth.PersistedACL"
	), ():void => {
		expect( Auth.PersistedACL ).toBeDefined();
		expect( Auth.PersistedACL ).toBe( PersistedACL );
	} );

	it( reexports(
		STATIC,
		"PersistedAgent",
		"Carbon.Auth.PersistedAgent"
	), ():void => {
		expect( Auth.PersistedAgent ).toBeDefined();
		expect( Auth.PersistedAgent ).toBe( PersistedAgent );
	} );

	it( reexports(
		STATIC,
		"Role",
		"Carbon.Auth.Role"
	), ():void => {
		expect( Auth.Role ).toBeDefined();
		expect( Auth.Role ).toBe( Role );
	} );

	it( reexports(
		STATIC,
		"Roles",
		"Carbon.Auth.Roles"
	), ():void => {
		expect( Auth.Roles ).toBeDefined();
		expect( Auth.Roles ).toBe( Roles );
	} );

	it( reexports(
		STATIC,
		"Ticket",
		"Carbon.Auth.Ticket"
	), ():void => {
		expect( Auth.Ticket ).toBeDefined();
		expect( Auth.Ticket ).toBe( Ticket );
	} );

	it( reexports(
		STATIC,
		"Token",
		"Carbon.Auth.Token"
	), ():void => {
		expect( Auth.Token ).toBeDefined();
		expect( Auth.Token ).toBe( Token );
	} );

	it( reexports(
		STATIC,
		"TokenAuthenticator",
		"Carbon.Auth.TokenAuthenticator"
	), ():void => {
		expect( Auth.TokenAuthenticator ).toBeDefined();
		expect( Auth.TokenAuthenticator ).toBe( TokenAuthenticator );
	} );

	it( reexports(
		STATIC,
		"UsernameAndPasswordToken",
		"Carbon.Auth.UsernameAndPasswordToken"
	), ():void => {
		expect( Auth.UsernameAndPasswordToken ).toBeDefined();
		expect( Auth.UsernameAndPasswordToken ).toBe( UsernameAndPasswordToken );
	} );

	describe( enumeration(
		"Carbon.Auth.Method",
		"Enum with the methods of authentication supported by CarbonLDP."
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
		"Carbon.Auth.Class",
		"Abstract class that manages authentications and authorizations of a context."
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
			{name: "context", type: "Carbon.Context"},
		] ), ():void => {
			let context:AbstractContext;
			class MockedContext extends AbstractContext {
				resolve( uri:string ):string {
					return uri;
				}
			}
			context = new MockedContext();

			class MockedAuth extends Auth.Class {}
			let auth:Auth.Class = new MockedAuth( context );

			expect( auth ).toBeTruthy();
			expect( auth instanceof Auth.Class ).toBe( true );
		} );

		it( hasProperty(
			INSTANCE,
			"agents",
			"Carbon.Auth.Agents.Class",
			"Instance of `Carbon.Auth.Agents.Class` that helps you manage the agents of the current context."
		), ():void => {
			let context:AbstractContext;
			class MockedContext extends AbstractContext {
				resolve( uri:string ):string {
					return uri;
				}
			}
			context = new MockedContext();
			class MockedAuth extends Auth.Class {}
			let auth:Auth.Class = new MockedAuth( context );

			expect( auth.agents ).toBeDefined();
			expect( auth.agents ).toBeNull();
		} );

		it( hasProperty(
			INSTANCE,
			"authenticatedAgent",
			"Carbon.Auth.PersistedAgent.Class",
			"The agent of the user that has been authenticated. If no authentication exists in the current context, it will ask to it's parent context.\n" +
			"Returns `null` if the user it not authenticated."
		), ():void => {

			function createAgent( context:AbstractContext ):PersistedAgent.Class {
				let persistedAgent:PersistedAgent.Class = <PersistedAgent.Class> PersistedDocument.Factory.create( "http://example.com/agents/my-agent/", context.documents );
				persistedAgent.email = null;
				persistedAgent.name = null;
				persistedAgent.enabled = true;
				persistedAgent.types.push( Agent.RDF_CLASS );

				return persistedAgent;
			}

			(() => {
				class MockedAuth extends Auth.Class {}
				class MockedContext extends AbstractContext {
					constructor( _context?:AbstractContext ) {
						super( _context );
						this.auth = new MockedAuth( this );
					}

					resolve( uri:string ):string {
						return uri;
					}
				}
				let context:AbstractContext = new MockedContext();

				expect( context.auth.authenticatedAgent ).toBeNull();
			})();

			(() => {
				class BasicMockedAuth extends Auth.Class {}
				class MockedAuth extends Auth.Class {
					constructor( _context:AbstractContext ) {
						super( _context );
						this._authenticatedAgent = createAgent( _context );
					}
				}
				class MockedContext extends AbstractContext {
					constructor( _context?:AbstractContext ) {
						super( _context );
						this.auth = new BasicMockedAuth( this );
					}

					resolve( uri:string ):string {
						return uri;
					}
				}

				let context:AbstractContext = new MockedContext();
				let auth:Auth.Class = new MockedAuth( context );

				expect( context.auth.authenticatedAgent ).toBeNull();

				expect( auth.authenticatedAgent ).toBeTruthy();
				expect( PersistedAgent.Factory.is( auth.authenticatedAgent ) ).toBe( true );
			})();

			(() => {
				class BasicMockedAuth extends Auth.Class {}
				class MockedAuth extends Auth.Class {
					constructor( _context:AbstractContext ) {
						super( _context );
						this._authenticatedAgent = createAgent( _context );
					}
				}
				class MockedContext extends AbstractContext {
					constructor( _context?:AbstractContext, flag:boolean = false ) {
						super( _context );
						if( flag ) {
							this.auth = new MockedAuth( this );
						} else {
							this.auth = new BasicMockedAuth( this );
						}
					}

					resolve( uri:string ):string {
						return uri;
					}
				}

				let parentContext:AbstractContext = new MockedContext( null, true );
				let context:AbstractContext = new MockedContext( parentContext );

				expect( parentContext.auth.authenticatedAgent ).toBeTruthy();
				expect( PersistedAgent.Factory.is( parentContext.auth.authenticatedAgent ) ).toBe( true );

				expect( context.auth.authenticatedAgent ).toBeTruthy();
				expect( PersistedAgent.Factory.is( context.auth.authenticatedAgent ) ).toBe( true );

				expect( parentContext.auth.authenticatedAgent ).toBe( context.auth.authenticatedAgent );
			})();

			(() => {
				class BasicMockedAuth extends Auth.Class {}
				class MockedAuth extends Auth.Class {
					constructor( _context:AbstractContext ) {
						super( _context );
						this._authenticatedAgent = createAgent( _context );
					}
				}
				class MockedContext extends AbstractContext {
					constructor( _context?:AbstractContext, flag:boolean = false ) {
						super( _context );
						if( flag ) {
							this.auth = new MockedAuth( this );
						} else {
							this.auth = new BasicMockedAuth( this );
						}
					}

					resolve( uri:string ):string {
						return uri;
					}
				}

				let parentContext:AbstractContext = new MockedContext( null, true );
				let context:AbstractContext = new MockedContext( parentContext, true );

				expect( parentContext.auth.authenticatedAgent ).toBeTruthy();
				expect( PersistedAgent.Factory.is( parentContext.auth.authenticatedAgent ) ).toBe( true );

				expect( context.auth.authenticatedAgent ).toBeTruthy();
				expect( PersistedAgent.Factory.is( context.auth.authenticatedAgent ) ).toBe( true );

				expect( parentContext.auth.authenticatedAgent ).not.toBe( context.auth.authenticatedAgent );
			})();

		} );

		it( hasProperty(
			INSTANCE,
			"roles",
			"Carbon.Auth.Roles.Class",
			"Instance of a implementation of the `Carbon.Auth.Roles.Class` abstract class, that help managing the roles of the current context.\n" +
			"In this class the property is set to `null`, and implementations of this class set it to their respective role model using a valid instance of `Carbon.Auth.Roles.Class`."
		), ():void => {
			let context:AbstractContext;
			class MockedContext extends AbstractContext {
				resolve( uri:string ):string {
					return uri;
				}
			}
			context = new MockedContext();
			class MockedAuth extends Auth.Class {}
			let auth:Auth.Class = new MockedAuth( context );

			expect( auth.roles ).toBeDefined();
			expect( auth.roles ).toBeNull();
		} );

		it( hasMethod(
			INSTANCE,
			"isAuthenticated",
			"Returns true if the user is authenticated.", [
				{ name: "askParent", type: "boolean", optional: true, default: "true" },
			],
			{ type: "boolean" }
		), ():void => {

			// Property Integrity
			(function propertyIntegrity():void {
				class MockedAuth extends Auth.Class {}
				class MockedContext extends AbstractContext {
					constructor() {
						super();
						this.auth = new MockedAuth( this );
					}

					resolve( uri:string ):string {
						return uri;
					}
				}
				let context:AbstractContext = new MockedContext();

				expect( context.auth.isAuthenticated ).toBeDefined();
				expect( Utils.isFunction( context.auth.isAuthenticated ) ).toBe( true );
			})();


			// Neither current nor parent authenticated
			(function currentNotAuthenticated_parentNotAuthenticated():void {
				class MockedAuth extends Auth.Class {}
				class MockedContext extends AbstractContext {
					constructor() {
						super();
						this.auth = new MockedAuth( this );
						this._parentContext = this;
					}

					resolve( uri:string ):string {
						return uri;
					}
				}
				let context:AbstractContext = new MockedContext();
				let auth:Auth.Class = new MockedAuth( context );

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
				class MockedAuth extends Auth.Class {}
				class MockedContext extends AbstractContext {
					constructor() {
						super();
						this.auth = new MockedAuth( this );
						this._parentContext = this;
					}

					resolve( uri:string ):string {
						return uri;
					}
				}
				let context:AbstractContext = new MockedContext();
				let auth:Auth.Class = new MockedAuth( context );

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
				class MockedAuth extends Auth.Class {}
				class MockedContext extends AbstractContext {
					constructor() {
						super();
						this.auth = new MockedAuth( this );
						this._parentContext = this;
					}

					resolve( uri:string ):string {
						return uri;
					}
				}
				let context:AbstractContext = new MockedContext();
				let auth:Auth.Class = new MockedAuth( context );
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
				class MockedAuth extends Auth.Class {}
				class MockedContext extends AbstractContext {
					constructor() {
						super();
						this.auth = new MockedAuth( this );
						this._parentContext = this;
					}

					resolve( uri:string ):string {
						return uri;
					}
				}
				let context:AbstractContext = new MockedContext();
				let auth:Auth.Class = new MockedAuth( context );
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
			{ type: "Promise<Carbon.Auth.Token.Class>" }
		), ():void => {
			class MockedContext extends AbstractContext {
				resolve( uri:string ):string {
					return uri;
				}
			}
			let context:AbstractContext = new MockedContext();

			class MockedAuth extends Auth.Class {}
			let auth:Auth.Class = new MockedAuth( context );

			expect( auth.authenticate ).toBeDefined();
			expect( Utils.isFunction( auth.authenticate ) ).toBe( true );

			let spy:jasmine.Spy = spyOn( auth, "authenticateUsing" );

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
					resolve( uri:string ):string {
						return "http://example.com/" + uri;
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
				{ type: "Promise<Carbon.Auth.UsernameAndPasswordCredentials.Class>" }
			), ( done:{ ():void, fail:() => void } ):void => {
				jasmine.Ajax.stubRequest( "http://example.com/agents/me/" ).andReturn( {
					status: 200,
					responseHeaders: {
						"ETag": "1234567890",
						"Content-Location": "http://example.com/agents/my-agent/",
					},
					responseText: `[ {
						"@id": "http://example.com/agents/my-agent/",
						"@graph": [ {
							"@id": "http://example.com/agents/my-agent/",
							"@type": [ "https://carbonldp.com/ns/v1/security#Agent" ],
							"https://carbonldp.com/ns/v1/security#name": [ {
								"@value": "My Agent Name",
								"@type": "http://www.w3.org/2001/XMLSchema#string"
							} ],
							"http://www.w3.org/2001/vcard-rdf/3.0#email": [ {
								"@value": "my-agent@agents.com",
								"@type": "http://www.w3.org/2001/XMLSchema#string"
							} ],
							"https://carbonldp.com/ns/v1/security#enabled": [ {
								"@value": "true",
								"@type": "http://www.w3.org/2001/XMLSchema#boolean"
							} ]
						} ]
					} ]`,
				} );

				class MockedAuth extends Auth.Class {}
				let auth:Auth.Class = new MockedAuth( context );

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

						expect( _auth.authenticatedAgent ).toBeTruthy();
						expect( PersistedAgent.Factory.is( _auth.authenticatedAgent ) ).toBe( true );
					},
					fail: ( error ):void => {
						expect( error.name ).toBe( Errors.IllegalArgumentError.name );
					},
				};
				let spySuccess:jasmine.Spy = spyOn( spies, "success" ).and.callThrough();
				let spyFail:jasmine.Spy = spyOn( spies, "fail" ).and.callThrough();

				// Expected behavior
				let auth01:Auth.Class = new MockedAuth( context );
				promise = auth01.authenticateUsing( "BASIC", username, password );
				expect( promise instanceof Promise ).toBe( true );
				promises.push( promise.then( ( credentials:UsernameAndPasswordCredentials ):void => {
					spies.success( auth01, credentials );
				} ) );

				// Wrong parameters
				let auth02:Auth.Class = new MockedAuth( context );
				promise = auth02.authenticateUsing( "BASIC", {} );
				expect( promise instanceof Promise ).toBe( true );
				promises.push( promise.catch( spies.fail ) );

				// Nonexistent authentication type
				let auth03:Auth.Class = new MockedAuth( context );
				promise = auth03.authenticateUsing( "Error", username, password );
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
				{ type: "Promise<Carbon.Auth.Token.Class>" }
			), ( done:{():void, fail:() => void} ):void => {
				class MockedAuth extends Auth.Class {}
				let auth:Auth.Class = new MockedAuth( context );

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

						expect( _auth.authenticatedAgent ).toBeTruthy();
						expect( credentials.agent ).toBe( _auth.authenticatedAgent );
						expect( PersistedAgent.Factory.is( _auth.authenticatedAgent ) ).toBe( true );
					},
					fail: ( error ):void => {
						expect( error instanceof Errors.IllegalArgumentError ).toBe( true );
					},
				};
				let spySuccess:jasmine.Spy = spyOn( spies, "success" ).and.callThrough();
				let spyFail:jasmine.Spy = spyOn( spies, "fail" ).and.callThrough();

				jasmine.Ajax.stubRequest( /token/ ).andReturn( {
					status: 200,
					responseText: `[ {
						"@id": "_:00",
						"@type": [
							"https://carbonldp.com/ns/v1/platform#ResponseMetadata",
							"https://carbonldp.com/ns/v1/platform#VolatileResource"
						],
						"https://carbonldp.com/ns/v1/platform#resourceMetadata": [ {
							"@id": "_:01"
						} ]
					}, {
						"@id": "_:01",
						"@type": [
							"https://carbonldp.com/ns/v1/platform#ResourceMetadata",
							"https://carbonldp.com/ns/v1/platform#VolatileResource"
						],
						"https://carbonldp.com/ns/v1/platform#eTag": [ {
							"@value": "\\"1234567890\\""
						} ],
						"https://carbonldp.com/ns/v1/platform#resource": [ {
							"@id": "http://example.com/successful/agents/my-agent/"
						} ]
					}, {
						"@id": "_:02",
						"@type": [
							"https://carbonldp.com/ns/v1/security#Token",
							"https://carbonldp.com/ns/v1/platform#VolatileResource"
						],
						"https://carbonldp.com/ns/v1/security#tokenKey": [ {
							"@value": "token-value"
						} ],
						"https://carbonldp.com/ns/v1/security#expirationTime": {
							"@value": "${ date.toISOString() }",
							"@type": "http://www.w3.org/2001/XMLSchema#dateTime"
						},
						"https://carbonldp.com/ns/v1/security#credentialsOf": [ {
							"@id": "http://example.com/successful/agents/my-agent/"
						} ]
					}, {
						"@id": "http://example.com/successful/agents/my-agent/",
						"@graph": [ {
							"@id": "http://example.com/successful/agents/my-agent/",
							"@type": [ "https://carbonldp.com/ns/v1/security#Agent" ],
							"https://carbonldp.com/ns/v1/security#name": [ {
								"@value": "My Agent Name",
								"@type": "http://www.w3.org/2001/XMLSchema#string"
							} ],
							"http://www.w3.org/2001/vcard-rdf/3.0#email": [ {
								"@value": "my-agent@agents.com",
								"@type": "http://www.w3.org/2001/XMLSchema#string"
							} ],
							"https://carbonldp.com/ns/v1/security#enabled": [ {
								"@value": "true",
								"@type": "http://www.w3.org/2001/XMLSchema#boolean"
							} ]
						} ]
					} ]`,
				} );

				// Expected behavior
				let auth01:Auth.Class = new MockedAuth( context );
				promise = auth01.authenticateUsing( "TOKEN", "myUser@user.con", "myAwesomePassword" );
				expect( promise instanceof Promise ).toBe( true );
				promises.push( promise.then( ( credentials:Token.Class ):void => {
					spies.success( auth01, credentials );
				} ) );

				// Wrong parameters
				let auth02:Auth.Class = new MockedAuth( context );
				promise = auth02.authenticateUsing( "TOKEN", {} );
				expect( promise instanceof Promise ).toBe( true );
				promises.push( promise.catch( spies.fail ) );

				// Nonexistent authentication method
				let auth03:Auth.Class = new MockedAuth( context );
				promise = auth03.authenticateUsing( "Error", "myUser@user.con", "myAwesomePassword" );
				expect( promise instanceof Promise ).toBe( true );
				promises.push( promise.catch( spies.fail ) );

				Promise.all( promises ).then( ():void => {
					expect( spySuccess.calls.count() ).toBe( 1 );
					expect( spyFail.calls.count() ).toBe( 2 );
					done();
				}, done.fail );
			} );

			it( hasSignature(
				"Authenticates the user with a `Carbon.Auth.Token.Class`, which contains a JSON Web Token (JWT) that will be used in every request.", [
					{ name: "method", type: "'TOKEN'" },
					{ name: "token", type: "Carbon.Auth.Token.Class" },
				],
				{ type: "Promise<Carbon.Auth.Token.Class>" }
			), ( done:{ ():void, fail:() => void } ):void => {
				jasmine.Ajax.stubRequest( "http://example.com/agents/me/" ).andReturn( {
					status: 200,
					responseHeaders: {
						"ETag": "1234567890",
						"Content-Location": "http://example.com/agents/my-agent/",
					},
					responseText: `[ {
						"@id": "http://example.com/agents/my-agent/",
						"@graph": [ {
							"@id": "http://example.com/agents/my-agent/",
							"@type": [ "https://carbonldp.com/ns/v1/security#Agent" ],
							"https://carbonldp.com/ns/v1/security#name": [ {
								"@value": "My Agent Name",
								"@type": "http://www.w3.org/2001/XMLSchema#string"
							} ],
							"http://www.w3.org/2001/vcard-rdf/3.0#email": [ {
								"@value": "my-agent@agents.com",
								"@type": "http://www.w3.org/2001/XMLSchema#string"
							} ],
							"https://carbonldp.com/ns/v1/security#enabled": [ {
								"@value": "true",
								"@type": "http://www.w3.org/2001/XMLSchema#boolean"
							} ]
						} ]
					} ]`,
				} );
				class MockedAuth extends Auth.Class {}
				let auth01:Auth.Class = new MockedAuth( context );
				let auth02:Auth.Class = new MockedAuth( context );

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

						expect( _auth.authenticatedAgent ).toBeTruthy();
						expect( credentials.agent ).toBe( _auth.authenticatedAgent );
						expect( PersistedAgent.Factory.is( _auth.authenticatedAgent ) ).toBe( true );
					},
					success02: ( _auth:Auth.Class, credentials:Token.Class ):void => {
						expect( credentials.key ).toEqual( token.key );
						expect( _auth.isAuthenticated() ).toBe( true );

						expect( _auth.authenticatedAgent ).toBeTruthy();
						expect( credentials.agent ).toBe( _auth.authenticatedAgent );
						expect( PersistedAgent.Factory.is( _auth.authenticatedAgent ) ).toBe( true );
					},
					fail: ( error ):void => {
						expect( error.name ).toBe( Errors.IllegalArgumentError.name );
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
					key: "eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJodHRwczovL2V4YW1wbGUuY29tL3VzZXJzL2EtdXNlci8iLCJleHAiOjExNDkxMjAwMDAwMDB9.T8XSFKyiT-5PAx_yxv2uY94nfvx65zWz8mI2OlSUFnE",
					types: [
						"https://carbonldp.com/ns/v1/security#Token",
					],
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
						key: "eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJodHRwczovL2V4YW1wbGUuY29tL3VzZXJzL2EtdXNlci8iLCJleHAiOjExNDkxMjAwMDAwMDB9.T8XSFKyiT-5PAx_yxv2uY94nfvx65zWz8mI2OlSUFnE",
						types: [
							"https://carbonldp.com/ns/v1/security#Token",
						],
					};
					return JSON.parse( JSON.stringify( storedToken ) );
				};
				promise = auth02.authenticateUsing( "TOKEN", <Token.Class> getFromStorage() );
				expect( promise instanceof Promise ).toBe( true );
				promises.push( promise.then( ( credentials:Token.Class ):void => {
					spies.success02( auth01, credentials );
				} ) );

				// ExpirationDate has been reached
				let auth03:Auth.Class = new MockedAuth( context );
				date = new Date();
				date.setDate( date.getDate() - 1 );
				token = <any> {
					expirationTime: date,
					id: "_:BlankNode",
					key: "eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJodHRwczovL2V4YW1wbGUuY29tL3VzZXJzL2EtdXNlci8iLCJleHAiOjExNDkxMjAwMDAwMDB9.T8XSFKyiT-5PAx_yxv2uY94nfvx65zWz8mI2OlSUFnE",
					types: [
						"https://carbonldp.com/ns/v1/security#Token",
					],
				};
				promise = auth03.authenticateUsing( "TOKEN", token );
				expect( promise instanceof Promise ).toBe( true );
				promises.push( promise.catch( spies.fail ) );

				// Wrong parameters
				promise = auth03.authenticateUsing( "TOKEN", {} );
				expect( promise instanceof Promise ).toBe( true );
				promises.push( promise.catch( spies.fail ) );

				// Nonexistent authentication method
				promise = auth03.authenticateUsing( "Error", token );
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
			"Adds the authentication header to a `Carbon.HTTP.Request.Options` object.", [
				{ name: "options", type: "Carbon.HTTP.Request.Options" },
			]
		), ():void => {

			// Property Integrity
			(function propertyIntegrity():void {
				class MockedContext extends AbstractContext {
					resolve( uri:string ):string {
						return uri;
					}
				}
				let context:AbstractContext = new MockedContext();

				class MockedAuth extends Auth.Class {}
				let auth:Auth.Class = new MockedAuth( context );

				expect( auth.addAuthentication ).toBeDefined();
				expect( Utils.isFunction( auth.addAuthentication ) ).toBe( true );
			})();

			// Neither current nor parent authenticated
			(function currentNotAuthenticated_parentNotAuthenticated():void {
				class MockedAuth extends Auth.Class {}
				class MockedContext extends AbstractContext {
					constructor() {
						super();
						this.auth = new MockedAuth( this );
						this._parentContext = this;
					}

					resolve( uri:string ):string {
						return uri;
					}
				}
				let context:AbstractContext = new MockedContext();
				let auth:Auth.Class = new MockedAuth( context );

				let spyParent:jasmine.Spy = spyOn( context.auth, "addAuthentication" ).and.callFake( options => {
					options[ "parentAuth" ] = "no authenticated";
				} );

				let options:HTTP.Request.Options = {};

				auth.addAuthentication( options );
				expect( spyParent ).toHaveBeenCalledWith( options );
				expect( options ).toEqual( { parentAuth: "no authenticated" } );
			})();

			// Current not authenticated but parent is
			(function currentNotAuthenticated_parentAuthenticated():void {
				class MockedAuth extends Auth.Class {}
				class MockedContext extends AbstractContext {
					constructor() {
						super();
						this.auth = new MockedAuth( this );
						this._parentContext = this;
					}

					resolve( uri:string ):string {
						return uri;
					}
				}
				let context:AbstractContext = new MockedContext();
				let auth:Auth.Class = new MockedAuth( context );

				let spyParent:jasmine.Spy = spyOn( context.auth, "addAuthentication" ).and.callFake( options => {
					options[ "parentAuth" ] = "is authenticated";
				} );

				let options:HTTP.Request.Options = {};

				auth.addAuthentication( options );
				expect( spyParent ).toHaveBeenCalledWith( options );
				expect( options ).toEqual( { parentAuth: "is authenticated" } );
			})();

			// Current and parent authenticated
			(function currentAuthenticated_parentAuthenticated():void {
				class MockedAuth extends Auth.Class {}
				class MockedContext extends AbstractContext {
					constructor() {
						super();
						this.auth = new MockedAuth( this );
						this._parentContext = this;
					}

					resolve( uri:string ):string {
						return uri;
					}
				}
				let context:AbstractContext = new MockedContext();
				let auth:Auth.Class = new MockedAuth( context );

				(<any> auth).authenticator = {
					isAuthenticated: ():boolean => true, addAuthentication: ( options:any ):void => {
						options[ "currentAuth" ] = "is authenticated";
					},
				};
				let spyParent:jasmine.Spy = spyOn( context.auth, "addAuthentication" ).and.callFake( options => {
					options[ "parentAuth" ] = "is authenticated";
				} );

				let options:HTTP.Request.Options = {};

				auth.addAuthentication( options );
				expect( spyParent ).not.toHaveBeenCalled();
				expect( options ).toEqual( { currentAuth: "is authenticated" } );
			})();

			// Current authenticated but parent not
			(function currentAuthenticated_parentNotAuthenticated():void {
				class MockedAuth extends Auth.Class {}
				class MockedContext extends AbstractContext {
					constructor() {
						super();
						this.auth = new MockedAuth( this );
						this._parentContext = this;
					}

					resolve( uri:string ):string {
						return uri;
					}
				}
				let context:AbstractContext = new MockedContext();
				let auth:Auth.Class = new MockedAuth( context );
				(<any> auth).authenticator = {
					isAuthenticated: ():boolean => true, addAuthentication: ( options:any ):void => {
						options[ "currentAuth" ] = "is authenticated";
					},
				};
				let spyParent:jasmine.Spy = spyOn( context.auth, "addAuthentication" ).and.callFake( options => {
					options[ "parentAuth" ] = "no authenticated";
				} );

				let options:HTTP.Request.Options = {};

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
					resolve( uri:string ):string {
						return uri;
					}
				}
				let context:AbstractContext = new MockedContext();

				class MockedAuth extends Auth.Class {}
				let auth:Auth.Class = new MockedAuth( context );

				expect( auth.clearAuthentication ).toBeDefined();
				expect( Utils.isFunction( auth.clearAuthentication ) ).toBe( true );
			})();

			// The module isn't authenticated
			(function NotAuthenticated():void {
				class MockedContext extends AbstractContext {
					resolve( uri:string ):string {
						return uri;
					}
				}
				let context:AbstractContext = new MockedContext();

				class MockedAuth extends Auth.Class {}
				let auth:Auth.Class = new MockedAuth( context );

				auth.clearAuthentication();
				expect( (<any> auth).authenticator ).toBeFalsy();
			})();

			// The module is authenticated
			(function currentAuthenticated():void {
				class MockedContext extends AbstractContext {
					resolve( uri:string ):string {
						return uri;
					}
				}
				let context:AbstractContext = new MockedContext();

				class MockedAuth extends Auth.Class {}
				let auth:Auth.Class = new MockedAuth( context );

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
				{ name: "requestOptions", type: "Carbon.HTTP.Request.Options", optional: true },
			],
			{ type: "Promise<[ Carbon.Auth.Ticket.Class, Carbon.HTTP.Response.Class ]>" }
		), ( done:{ ():void, fail:() => void } ):void => {
			class MockedContext extends AbstractContext {
				resolve( uri:string ):string {
					return URI.Util.isAbsolute( uri ) ? uri : "http://example.com/" + uri;
				}
			}
			class MockedEmptyContext extends AbstractContext {
				resolve( uri:string ):string {
					return URI.Util.isAbsolute( uri ) ? uri : "http://example.com/empty/" + uri;
				}
			}
			class MockedMultipleContext extends AbstractContext {
				resolve( uri:string ):string {
					return URI.Util.isAbsolute( uri ) ? uri : "http://example.com/multiple/" + uri;
				}
			}

			let context:AbstractContext = new MockedContext();

			class MockedAuth extends Auth.Class {}
			let auth:Auth.Class = new MockedAuth( context );

			let auth2:Auth.Class = new MockedAuth( new MockedEmptyContext() );
			let auth3:Auth.Class = new MockedAuth( new MockedMultipleContext() );

			expect( auth.createTicket ).toBeDefined();
			expect( Utils.isFunction( auth.createTicket ) ).toBe( true );

			let expirationTime:Date = new Date();
			expirationTime.setDate( expirationTime.getDate() + 1 );

			jasmine.Ajax.stubRequest( "http://example.com/auth-tickets/", null, "POST" ).andReturn( {
				status: 200,
				responseText: `[ {
					"@id":"_:01",
					"@type":[
						"https://carbonldp.com/ns/v1/security#Ticket"
					],
					"https://carbonldp.com/ns/v1/security#expirationTime":[ {
						"@type": "http://www.w3.org/2001/XMLSchema#dateTime",
						"@value": "${ expirationTime.toISOString() }"
					} ],
					"https://carbonldp.com/ns/v1/security#forIRI":[ {
						"@id": "http://example.com/resource/"
					} ],
					"https://carbonldp.com/ns/v1/security#ticketKey":[ {
						"@value": "1234123412341234"
					} ]
				} ]`,
			} );

			jasmine.Ajax.stubRequest( "http://example.com/empty/auth-tickets/", null, "POST" ).andReturn( {
				status: 200,
				responseText: "[]",
			} );
			jasmine.Ajax.stubRequest( "http://example.com/multiple/auth-tickets/", null, "POST" ).andReturn( {
				status: 200,
				responseText: `[ {
					"@id":"_:01",
					"@type":[
						"https://carbonldp.com/ns/v1/security#Ticket"
					],
					"https://carbonldp.com/ns/v1/security#expirationTime":[ {
						"@type": "http://www.w3.org/2001/XMLSchema#dateTime",
						"@value": "${ expirationTime.toISOString() }"
					} ],
					"https://carbonldp.com/ns/v1/security#forIRI":[ {
						"@id": "http://example.com/resource/"
					} ],
					"https://carbonldp.com/ns/v1/security#ticketKey":[ {
						"@value": "1234123412341234"
					} ]
				}, {
					"@id":"_:02",
					"@type":[
						"https://carbonldp.com/ns/v1/security#Ticket"
					],
					"https://carbonldp.com/ns/v1/security#expirationTime":[ {
						"@type": "http://www.w3.org/2001/XMLSchema#dateTime",
						"@value": "${ expirationTime.toISOString() }"
					} ],
					"https://carbonldp.com/ns/v1/security#forIRI":[ {
						"@id": "http://example.com/resource/"
					} ],
					"https://carbonldp.com/ns/v1/security#ticketKey":[ {
						"@value": "1234123412341234"
					} ]
				} ]`,
			} );

			let promises:Promise<any> [] = [];
			let promise:Promise<any>;

			function checkSuccess( [ ticket, response ]:[ Ticket.Class, HTTP.Response.Class ] ):void {
				expect( ticket.expirationTime.getTime() ).toBeGreaterThan( Date.now() );
				expect( ticket.forURI.id ).toBe( "http://example.com/resource/" );
				expect( Utils.isString( ticket.ticketKey ) ).toBe( true );

				expect( response instanceof HTTP.Response.Class ).toBe( true );
			}

			function checkFail( error:Error ):void {
				expect( error instanceof HTTP.Errors.BadResponseError ).toBe( true );
			}

			promise = auth.createTicket( "http://example.com/resource/" );
			expect( promise instanceof Promise ).toBe( true );
			promises.push( promise.then( checkSuccess ) );

			promise = auth.createTicket( "resource/" );
			expect( promise instanceof Promise ).toBe( true );
			promises.push( promise.then( checkSuccess ) );

			promise = auth2.createTicket( "http://example.com/resource/" );
			expect( promise instanceof Promise ).toBe( true );
			promises.push( promise.catch( checkFail ) );

			promise = auth3.createTicket( "http://example.com/resource/" );
			expect( promise instanceof Promise ).toBe( true );
			promises.push( promise.catch( checkFail ) );

			Promise.all( promises ).then( done ).catch( done.fail );
		} );

		it( hasMethod(
			INSTANCE,
			"getAuthenticatedURL",
			"Returns a Promise with a one time use only authenticated URI.", [
				{ name: "uri", type: "string", description: "The URI to generate an authenticated URI for." },
				{ name: "requestOptions", type: "Carbon.HTTP.Request.Options", optional: true },
			],
			{ type: "Promise<string>" }
		), ( done:{ ():void, fail:() => void } ) => {
			class MockedContext extends AbstractContext {
				resolve( uri:string ):string {
					return URI.Util.isAbsolute( uri ) ? uri : "http://example.com/" + uri;
				}
			}

			let context:AbstractContext = new MockedContext();
			class MockedAuth extends Auth.Class {}
			let auth:Auth.Class = new MockedAuth( context );

			expect( auth.getAuthenticatedURL ).toBeDefined();
			expect( Utils.isFunction( auth.getAuthenticatedURL ) ).toBe( true );

			spyOn( auth, "createTicket" ).and.returnValue( Promise.resolve( [ {
				id: "_:01",
				types: [ "https://carbonldp.com/ns/v1/security#Ticket" ],
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
				expect( URI.Util.isBaseOf( "http://example.com/resource/", uri ) ).toBe( true );

				let query:Map<string, string | string[]> = URI.Util.getParameters( uri );
				expect( query.size ).toBe( 1 );
				expect( query.get( "ticket" ) ).toBe( "1234123412341234" );
			} ) );

			promise = auth.getAuthenticatedURL( "http://example.com/resource/?another=yes" );
			expect( promise instanceof Promise ).toBe( true );
			promises.push( promise.then( ( uri:string ) => {
				expect( Utils.isString( uri ) ).toBe( true );
				expect( URI.Util.isBaseOf( "http://example.com/resource/", uri ) ).toBe( true );

				let query:Map<string, string | string[]> = URI.Util.getParameters( uri );
				expect( query.size ).toBe( 2 );
				expect( query.get( "another" ) ).toBe( "yes" );
				expect( query.get( "ticket" ) ).toBe( "1234123412341234" );
			} ) );

			Promise.all( promises ).then( done ).catch( done.fail );
		} );

	} );

	it( hasDefaultExport( "Carbon.Auth.Class" ), ():void => {
		expect( DefaultExport ).toBeDefined();
		expect( DefaultExport ).toBe( Auth.Class );
	} );

} );
