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
import AbstractContext from "./AbstractContext";
import * as ACE from "./Auth/ACE";
import * as ACL from "./Auth/ACL";
import AuthenticationToken from "./Auth/AuthenticationToken";
import Authenticator from "./Auth/Authenticator";
import BasicAuthenticator from "./Auth/BasicAuthenticator";
import * as PersistedACE from "./Auth/PersistedACE";
import * as PersistedACL from "./Auth/PersistedACL";
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
		"Enum with for the methods of authentication supported"
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
		"Abstract class that will manage the authentication and authorization of a context."
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
			"Returns true the user is authenticated.", [
				{name: "askParent", type: "boolean", optional: true, default: "true"},
			],
			{type: "boolean"}
		), ():void => {
			// TODO test
		} );
		it( hasMethod(
			INSTANCE,
			"authenticate",
			"Authenticate the user with an `username` and `password`. Uses the `TOKEN` method for the authentication.", [
				{name: "username", type: "string"},
				{name: "password", type: "string"},
			],
			{type: "Promise<Carbon.Auth.Credentials>"}
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
				"Authenticates the user with Basic HTTP Authentication, witch uses encoded username and password.", [
					{name: "method", type: "'BASIC'"},
					{name: "username", type: "string"},
					{name: "password", type: "string"},
				],
				{type: "Promise<Carbon.Auth.UsernameAndPasswordCredentials.Class>"}
			), ( done:{ ():void, fail:() => void } ):void => {
				class MockedAuth extends Auth.Class {}
				let auth01:Auth.Class = new MockedAuth( context );

				expect( auth01.authenticateUsing ).toBeDefined();
				expect( Utils.isFunction( auth01.authenticateUsing ) ).toBe( true );
				expect( auth01.isAuthenticated() ).toBe( false );

				let username:string = "myUser@user.com";
				let password:string = "myAwesomePassword";
				let promises:Promise<any>[] = [];
				let promise:Promise<any>;
				let spies:any = {
					success: ( credentials:UsernameAndPasswordCredentials ):void => {
						expect( auth01.isAuthenticated() ).toBe( true );
						expect( credentials.username ).toEqual( username );
						expect( credentials.password ).toEqual( password );
					},
					fail: ( error ):void => {
						expect( error.name ).toBe( Errors.IllegalArgumentError.name );
					},
				};
				let spySuccess:jasmine.Spy = spyOn( spies, "success" ).and.callThrough();
				let spyFail:jasmine.Spy = spyOn( spies, "fail" ).and.callThrough();

				promise = auth01.authenticateUsing( "BASIC", username, password );
				expect( promise instanceof Promise ).toBe( true );
				promises.push( promise.then( spies.success, spies.fail ) );


				let auth02:Auth.Class = new MockedAuth( context );
				promise = auth02.authenticateUsing( "BASIC", {} );
				expect( promise instanceof Promise ).toBe( true );
				promises.push( promise.then( spies.success, spies.fail ) );

				let auth03:Auth.Class = new MockedAuth( context );
				promise = auth03.authenticateUsing( "Error", username, password );
				expect( promise instanceof Promise ).toBe( true );
				promises.push( promise.then( spies.success, spies.fail ) );

				Promise.all( promises ).then( ():void => {
					expect( spySuccess.calls.count() ).toBe( 1 );
					expect( spyFail.calls.count() ).toBe( 2 );
					done();
				}, done.fail );
			} );

			it( hasSignature(
				"Authenticates the user with username and password, and generates a JSON Web Token (JWT) credentials.", [
					{name: "method", type: "'TOKEN'"},
					{name: "username", type: "string"},
					{name: "password", type: "string"},
				],
				{type: "Promise<Carbon.Auth.Token.Class>"}
			), ( done:{ ():void, fail:() => void } ):void => {
				class MockedAuth extends Auth.Class {}
				let auth01:Auth.Class = new MockedAuth( context );

				expect( auth01.authenticateUsing ).toBeDefined();
				expect( Utils.isFunction( auth01.authenticateUsing ) ).toBe( true );
				expect( auth01.isAuthenticated() ).toBe( false );

				let date:Date = new Date();
				date.setDate( date.getDate() + 1 );
				let token:Object = [
					{
						"@id": "_:BlankNode",
						"@type": [
							"https://carbonldp.com/ns/v1/security#Token",
							"https://carbonldp.com/ns/v1/platform#VolatileResource",
						],
						"https://carbonldp.com/ns/v1/security#expirationTime": [ {
							"@type": "http://www.w3.org/2001/XMLSchema#dateTime",
							"@value": date.toISOString(),
						} ],
						"https://carbonldp.com/ns/v1/security#tokenKey": [ {
							"@value": "eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJodHRwczovL2V4YW1wbGUuY29tL3VzZXJzL2EtdXNlci8iLCJleHAiOjExNDkxMjAwMDAwMDB9.T8XSFKyiT-5PAx_yxv2uY94nfvx65zWz8mI2OlSUFnE",
						} ],
					},
				];
				let promises:Promise<any>[] = [];
				let promise:Promise<any>;
				let spies:any = {
					success: ( credentials:Token.Class ):void => {
						expect( auth01.isAuthenticated() ).toBe( true );
						expect( credentials.key ).toEqual( token[ 0 ][ "https://carbonldp.com/ns/v1/security#tokenKey" ][ 0 ][ "@value" ] );
					},
					fail: ( error ):void => {
						expect( error instanceof Errors.IllegalArgumentError ).toBe( true );
					},
				};
				let spySuccess:jasmine.Spy = spyOn( spies, "success" ).and.callThrough();
				let spyFail:jasmine.Spy = spyOn( spies, "fail" ).and.callThrough();

				jasmine.Ajax.stubRequest( /token/ ).andReturn( {
					status: 200,
					responseText: JSON.stringify( token ),
				} );

				promise = auth01.authenticateUsing( "TOKEN", "myUser@user.con", "myAwesomePassword" );
				expect( promise instanceof Promise ).toBe( true );
				promises.push( promise.then( spies.success, spies.fail ) );

				let auth02:Auth.Class = new MockedAuth( context );
				promise = auth02.authenticateUsing( "TOKEN", {} );
				expect( promise instanceof Promise ).toBe( true );
				promises.push( promise.then( spies.success, spies.fail ) );

				let auth03:Auth.Class = new MockedAuth( context );
				promise = auth03.authenticateUsing( "Error", "myUser@user.con", "myAwesomePassword" );
				expect( promise instanceof Promise ).toBe( true );
				promises.push( promise.then( spies.success, spies.fail ) );

				Promise.all( promises ).then( ():void => {
					expect( spySuccess.calls.count() ).toBe( 1 );
					expect( spyFail.calls.count() ).toBe( 2 );
					done();
				}, done.fail );
			} );

			it( hasSignature(
				"Authenticates the user with a JSON Web Token (JWT), i.e. the credentials generated by TokenAuthenticator.", [
					{name: "method", type: "'TOKEN'"},
					{name: "token", type: "Carbon.Auth.Token.Class"},
				],
				{type: "Promise<Carbon.Auth.Token.Class>"}
			), ( done:{ ():void, fail:() => void } ):void => {
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
					},
				};
				let spySuccess01:jasmine.Spy = spyOn( spies, "success01" ).and.callThrough();
				let spySuccess02:jasmine.Spy = spyOn( spies, "success02" ).and.callThrough();
				let spyFail:jasmine.Spy = spyOn( spies, "fail" ).and.callThrough();

				// OK Token
				date = new Date();
				date.setDate( date.getDate() + 1 );
				token = <any> {
					expirationTime: date,
					id: "_:BlankNode",
					key: "eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJodHRwczovL2V4YW1wbGUuY29tL3VzZXJzL2EtdXNlci8iLCJleHAiOjExNDkxMjAwMDAwMDB9.T8XSFKyiT-5PAx_yxv2uY94nfvx65zWz8mI2OlSUFnE",
					types: [
						"https://carbonldp.com/ns/v1/security#Token",
						"https://carbonldp.com/ns/v1/platform#VolatileResource",
					],
				};
				promise = auth01.authenticateUsing( "TOKEN", token );
				expect( promise instanceof Promise ).toBe( true );
				promises.push( promise.then( spies.success01, spies.fail ) );

				// Will be OK, if expirationDate is a string the method tries parse it to a Date object
				date = new Date();
				date.setDate( date.getDate() + 1 );
				let getFromStorage:Function = ():Object => {
					let storedToken:any = {
						expirationTime: date.toISOString(),
						id: "_:BlankNode",
						key: "eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJodHRwczovL2V4YW1wbGUuY29tL3VzZXJzL2EtdXNlci8iLCJleHAiOjExNDkxMjAwMDAwMDB9.T8XSFKyiT-5PAx_yxv2uY94nfvx65zWz8mI2OlSUFnE",
						types: [
							"https://carbonldp.com/ns/v1/security#Token",
							"https://carbonldp.com/ns/v1/platform#VolatileResource",
						],
					};
					return JSON.parse( JSON.stringify( storedToken ) );
				};
				promise = auth02.authenticateUsing( "TOKEN", <Token.Class> getFromStorage() );
				expect( promise instanceof Promise ).toBe( true );
				promises.push( promise.then( spies.success02, spies.fail ) );

				// Will fail, because expirationDate has been reached
				let auth03:Auth.Class = new MockedAuth( context );
				date = new Date();
				date.setDate( date.getDate() - 1 );
				token = <any> {
					expirationTime: date,
					id: "_:BlankNode",
					key: "eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJodHRwczovL2V4YW1wbGUuY29tL3VzZXJzL2EtdXNlci8iLCJleHAiOjExNDkxMjAwMDAwMDB9.T8XSFKyiT-5PAx_yxv2uY94nfvx65zWz8mI2OlSUFnE",
					types: [
						"https://carbonldp.com/ns/v1/security#Token",
						"https://carbonldp.com/ns/v1/platform#VolatileResource",
					],
				};
				promise = auth03.authenticateUsing( "TOKEN", token );
				expect( promise instanceof Promise ).toBe( true );
				promises.push( promise.then( spies.success01, spies.fail ) );

				promise = auth03.authenticateUsing( "TOKEN", {} );
				expect( promise instanceof Promise ).toBe( true );
				promises.push( promise.then( spies.success01, spies.fail ) );

				promise = auth03.authenticateUsing( "Error", token );
				expect( promise instanceof Promise ).toBe( true );
				promises.push( promise.then( spies.success01, spies.fail ) );

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
			"Add the authentication header to a `Carbon.HTTP.Request.Options` object.", [
				{name: "options", type: "Carbon.HTTP.Request.Options"},
			]
		), ():void => {
			// TODO test
		} );

		it( hasMethod(
			INSTANCE,
			"clearAuthentication",
			"Deletes the current authentication"
		), ():void => {
			// TODO test
		} );

		it( hasMethod(
			INSTANCE,
			"createTicket",
			"Retrieves a authentication ticket, which one only works one time and oly for the URI specified.", [
				{name: "uri", type: "string", description: "The URI to get an authentication ticket for."},
				{name: "requestOptions", type: "Carbon.HTTP.Request.Options", optional: true},
			],
			{type: "Promise<[ Carbon.Auth.Ticket.Class, Carbon.HTTP.Response.Class ]>"}
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
			"Returns a Promise with a URI authenticated for only one use.", [
				{name: "uri", type: "string", description: "The URI to generate an authenticated URI for."},
				{name: "requestOptions", type: "Carbon.HTTP.Request.Options", optional: true},
			]
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
