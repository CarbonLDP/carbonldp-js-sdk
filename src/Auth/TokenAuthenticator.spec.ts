import {
	INSTANCE,

	module,

	isDefined,

	clazz,
	method,

	hasConstructor,
	hasMethod,
	hasSignature,
	hasDefaultExport,
} from "./../test/JasmineExtender";

import AbstractContext from "./../AbstractContext";
import * as PersistedAgent from "./PersistedAgent";
import * as Errors from "./../Errors";
import * as HTTP from "./../HTTP";
import * as Utils from "./../Utils";

import * as Token from "./Token";
import UsernameAndPasswordToken from "./UsernameAndPasswordToken";

import * as TokenAuthenticator from "./TokenAuthenticator";
import DefaultExport from "./TokenAuthenticator";

describe( module( "Carbon/Auth/TokenAuthenticator" ), ():void => {

	it( isDefined(), ():void => {
		expect( TokenAuthenticator ).toBeDefined();
		expect( Utils.isObject( TokenAuthenticator ) ).toEqual( true );
	} );

	describe( clazz(
		"Carbon.Auth.TokenAuthenticator.Class",
		"Authenticates requests using JSON Web Token (JWT) Authentication.", [
			"Carbon.Auth.Authenticator.Class<Carbon.Auth.UsernameAndPasswordToken.Class>"
		]
	), ():void => {

		beforeEach( function():void {
			jasmine.Ajax.install();
		} );

		afterEach( function():void {
			jasmine.Ajax.uninstall();
		} );

		it( isDefined(), ():void => {
			expect( TokenAuthenticator.Class ).toBeDefined();
			expect( Utils.isFunction( TokenAuthenticator.Class ) ).toEqual( true );
		} );

		it( hasConstructor( [
			{ name: "context", type: "Carbon.Context.Class", description: "The context where to authenticate the agent." },
		] ), ():void => {
			class MockedContext extends AbstractContext {
				resolve( uri:string ):string {
					return uri;
				}
			}

			let authenticator:TokenAuthenticator.Class = new TokenAuthenticator.Class( new MockedContext() );

			expect( ! ! authenticator ).toEqual( true );
			expect( authenticator instanceof TokenAuthenticator.Class ).toEqual( true );
		} );

		it( hasMethod(
			INSTANCE,
			"isAuthenticated",
			"Returns true if the instance contains stored credentials.",
			{ type: "boolean" }
		), ():void => {
			class MockedContext extends AbstractContext {
				resolve( uri:string ):string {
					return uri;
				}
			}

			let authenticator:TokenAuthenticator.Class = new TokenAuthenticator.Class( new MockedContext() );

			expect( "isAuthenticated" in authenticator ).toEqual( true );
			expect( Utils.isFunction( authenticator.isAuthenticated ) ).toEqual( true );

			expect( authenticator.isAuthenticated() ).toBe( false );

			let expirationTime:Date = new Date();
			expirationTime.setDate( expirationTime.getDate() + 1 );
			(<any> authenticator)._credentials = {
				key: "token-value",
				expirationTime: expirationTime,
			};
			expect( authenticator.isAuthenticated() ).toBe( true );

			(<any> authenticator)._credentials = {
				key: "token-value",
				expirationTime: new Date(),
			};
			expect( authenticator.isAuthenticated() ).toBe( false );

			expirationTime = new Date();
			expirationTime.setDate( expirationTime.getDate() - 1 );
			(<any> authenticator)._credentials = {
				key: "token-value",
				expirationTime: expirationTime,
			};
			expect( authenticator.isAuthenticated() ).toBe( false );
		} );

		describe( method(
			INSTANCE,
			"authenticate"
		), ():void => {

			it( hasSignature(
				"Stores credentials to authenticate future requests.", [
					{ name: "authenticationToken", type: "Carbon.Auth.UsernameAndPasswordToken" },
				],
				{ type: "Promise<Carbon.Auth.Token.Class>" }
			), ( done:{ ():void, fail:( error:Error ) => void } ):void => {

				// Property Integrity
				(() => {
					class MockedContext extends AbstractContext {
						resolve( uri:string ):string {
							return uri;
						}
					}
					let context:AbstractContext = new MockedContext();
					let authenticator:TokenAuthenticator.Class = new TokenAuthenticator.Class( context );

					expect( "authenticate" in authenticator ).toEqual( true );
					expect( Utils.isFunction( authenticator.authenticate ) ).toEqual( true );
				})();

				let promises:Promise<void>[] = [];

				// Successful Authentication
				(() => {
					class SuccessfulContext extends AbstractContext {
						resolve( relativeURI:string ):string {
							return "http://example.com/successful/" + relativeURI;
						}
					}

					let expirationTime:Date = new Date();
					expirationTime.setDate( expirationTime.getDate() + 1 );
					jasmine.Ajax.stubRequest( "http://example.com/successful/auth-tokens/", null, "POST" ).andReturn( {
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
								"@value": "${ expirationTime.toISOString() }",
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

					let context:SuccessfulContext = new SuccessfulContext();
					let authenticator:TokenAuthenticator.Class = new TokenAuthenticator.Class( context );

					promises.push( authenticator.authenticate( new UsernameAndPasswordToken( "user", "pass" ) ).then( ( token:Token.Class ):void => {
						expect( authenticator.isAuthenticated() ).toEqual( true );

						expect( token ).toBeDefined();
						expect( token ).not.toBeNull();
						expect( Token.Factory.is( token ) ).toEqual( true );

						expect( PersistedAgent.Factory.is( token.agent ) ).toBe( true );
					} ) );
				})();

				// Unsuccessful Authentication
				(() => {
					class UnsuccessfulContext extends AbstractContext {
						resolve( relativeURI:string ):string {
							return "http://example.com/unsuccessful/" + relativeURI;
						}
					}

					let expirationTime:Date = new Date();
					expirationTime.setDate( expirationTime.getDate() + 1 );
					jasmine.Ajax.stubRequest( "http://example.com/unsuccessful/auth-tokens/", null, "POST" ).andReturn( {
						status: 401,
					} );

					let context:UnsuccessfulContext = new UnsuccessfulContext();
					let authenticator:TokenAuthenticator.Class = new TokenAuthenticator.Class( context );

					promises.push( authenticator.authenticate( new UsernameAndPasswordToken( "user", "pass" ) ).then( () => {
						done.fail( new Error( "The authentication should have been unsuccessful." ) );
					}, ( error:Error ) => {
						expect( error instanceof HTTP.Errors.UnauthorizedError ).toEqual( true );

						expect( authenticator.isAuthenticated() ).toEqual( false );
					} ) );
				})();

				Promise.all( promises ).then( done, done.fail );
			} );

			it( hasSignature(
				"Stores credentials to authenticate future requests.", [
					{ name: "token", type: "Carbon.Auth.Token.Class" },
				],
				{ type: "Promise<Carbon.Auth.Token.Class>" }
			), ( done:{ ():void, fail:( error:Error ) => void } ):void => {

				class MockedContext extends AbstractContext {
					resolve( uri:string ):string {
						return "http://example.com/" + uri;
					}
				}
				let context:AbstractContext = new MockedContext();

				// Property Integrity
				(() => {
					let authenticator:TokenAuthenticator.Class = new TokenAuthenticator.Class( context );

					expect( "authenticate" in authenticator ).toEqual( true );
					expect( Utils.isFunction( authenticator.authenticate ) ).toEqual( true );
				})();

				let promises:Promise<void>[] = [];

				// Successful Authentication
				(() => {
					let expirationTime:Date = new Date();
					expirationTime.setDate( expirationTime.getDate() + 1 );
					let tokenString:string = `{
						"expirationTime": "${ expirationTime.toISOString() }",
						"id": "",
						"key": "token-value",
						"types": [ "https://carbonldp.com/ns/v1/security#Token" ],
						"agent": { "id": "http://exmple.com/agents/my-agent/" }
					}`;
					let authenticator:TokenAuthenticator.Class = new TokenAuthenticator.Class( context );

					promises.push( authenticator.authenticate( JSON.parse( tokenString ) )
						.then( ( tokenCredentials:Token.Class ):void => {
							expect( authenticator.isAuthenticated() ).toEqual( true );

							expect( tokenCredentials ).toBeDefined();
							expect( tokenCredentials ).not.toBeNull();
							expect( Token.Factory.hasRequiredValues( tokenCredentials ) ).toEqual( true );
						} )
					);
				})();
				(() => {
					let expirationTime:Date = new Date();
					expirationTime.setDate( expirationTime.getDate() + 1 );
					let tokenString:string = `{
						"expirationTime": "${expirationTime.toISOString()}",
						"id": "",
						"key": "token-value",
						"types": [ "https://carbonldp.com/ns/v1/security#Token" ]
					}`;
					let authenticator:TokenAuthenticator.Class = new TokenAuthenticator.Class( context );

					promises.push( authenticator.authenticate( JSON.parse( tokenString ) )
						.then( ( tokenCredentials:Token.Class ):void => {
							expect( authenticator.isAuthenticated() ).toEqual( true );

							expect( tokenCredentials ).toBeDefined();
							expect( tokenCredentials ).not.toBeNull();
							expect( Token.Factory.hasRequiredValues( tokenCredentials ) ).toEqual( true );
						} )
					);
				})();

				// Unsuccessful Authentication, time expired
				(() => {
					let expirationTime:Date = new Date();
					expirationTime.setDate( expirationTime.getDate() - 1 );
					let tokenString:string = `{
						"expirationTime": "${ expirationTime.toISOString() }",
						"id": "",
						"key": "token-value",
						"types": [ "https://carbonldp.com/ns/v1/security#Token" ],
						"agent": { "id": "http://exmple.com/agents/my-agent/" }
					}`;
					let authenticator:TokenAuthenticator.Class = new TokenAuthenticator.Class( context );

					promises.push( authenticator.authenticate( JSON.parse( tokenString ) ).then( () => {
						done.fail( new Error( "The authentication should have been unsuccessful." ) );
					}, ( error:Error ) => {
						expect( error instanceof Errors.IllegalArgumentError ).toEqual( true );

						expect( authenticator.isAuthenticated() ).toEqual( false );
					} ) );
				})();

				Promise.all( promises ).then( done, done.fail );
			} );

		} );

		it( hasMethod(
			INSTANCE,
			"addAuthentication",
			"Adds the Token Authentication header to the passed request options object.\n" +
			"The `Carbon.HTTP.Request.Options` provided is returned without modifications if it already has an authentication header.", [
				{ name: "requestOptions", type: "Carbon.HTTP.Request.Options", description: "Request options object to add Authentication headers." },
			],
			{ type: "Carbon.HTTP.Request.Options", description: "The request options with the added authentication headers." }
		), ():void => {

			// Property Integrity
			(() => {
				class MockedContext extends AbstractContext {
					resolve( uri:string ):string {
						return uri;
					}
				}

				let authenticator:TokenAuthenticator.Class = new TokenAuthenticator.Class( new MockedContext() );

				expect( "addAuthentication" in authenticator ).toEqual( true );
				expect( Utils.isFunction( authenticator.addAuthentication ) ).toEqual( true );
			})();

			(() => {
				class Context extends AbstractContext {
					resolve( relativeURI:string ):string {
						return "http://example.com/successful/" + relativeURI;
					}
				}

				let context:AbstractContext = new Context();
				let authenticator:TokenAuthenticator.Class = new TokenAuthenticator.Class( context );

				let expirationTime:Date = new Date();
				expirationTime.setDate( expirationTime.getDate() + 1 );
				(<any> authenticator)._credentials = {
					key: "token-value",
					expirationTime: expirationTime,
				};

				let requestOptions:HTTP.Request.Options = authenticator.addAuthentication( {} );

				expect( ! ! requestOptions ).toEqual( true );
				expect( Utils.isObject( requestOptions ) ).toEqual( true );
				expect( "headers" in requestOptions ).toEqual( true );
				expect( requestOptions.headers instanceof Map ).toEqual( true );
				expect( requestOptions.headers.has( "authorization" ) ).toEqual( true );

				let authorizationHeader:HTTP.Header.Class = requestOptions.headers.get( "authorization" );

				expect( authorizationHeader instanceof HTTP.Header.Class ).toEqual( true );
				expect( authorizationHeader.values.length ).toEqual( 1 );

				let authorization:string = authorizationHeader.toString();

				expect( Utils.S.startsWith( authorization, "Token " ) ).toEqual( true );
				expect( authorization.substring( 6 ) ).toEqual( "token-value" );
			})();

			(() => {
				class Context extends AbstractContext {
					resolve( relativeURI:string ):string {
						return "http://example.com/successful/" + relativeURI;
					}
				}

				let context:AbstractContext = new Context();
				let authenticator:TokenAuthenticator.Class = new TokenAuthenticator.Class( context );

				let expirationTime:Date = new Date();
				expirationTime.setDate( expirationTime.getDate() + 1 );
				(<any> authenticator)._credentials = {
					key: "token-value",
					expirationTime: expirationTime,
				};

				let requestOptions:HTTP.Request.Options = {
					headers: new Map<string, HTTP.Header.Class>(),
				};
				authenticator.addAuthentication( requestOptions );

				expect( ! ! requestOptions ).toEqual( true );
				expect( Utils.isObject( requestOptions ) ).toEqual( true );
				expect( "headers" in requestOptions ).toEqual( true );
				expect( requestOptions.headers instanceof Map ).toEqual( true );
				expect( requestOptions.headers.size ).toEqual( 1 );
				expect( requestOptions.headers.has( "authorization" ) ).toEqual( true );

				let authorizationHeader:HTTP.Header.Class = requestOptions.headers.get( "authorization" );

				expect( authorizationHeader instanceof HTTP.Header.Class ).toEqual( true );
				expect( authorizationHeader.values.length ).toEqual( 1 );

				let authorization:string = authorizationHeader.toString();

				expect( Utils.S.startsWith( authorization, "Token " ) ).toEqual( true );
				expect( authorization.substring( 6 ) ).toEqual( "token-value" );
			})();

			(() => {
				class Context extends AbstractContext {
					resolve( relativeURI:string ):string {
						return "http://example.com/successful/" + relativeURI;
					}
				}

				let context:AbstractContext = new Context();
				let authenticator:TokenAuthenticator.Class = new TokenAuthenticator.Class( context );

				let expirationTime:Date = new Date();
				expirationTime.setDate( expirationTime.getDate() + 1 );
				(<any> authenticator)._credentials = {
					key: "token-value",
					expirationTime: expirationTime,
				};

				let requestOptions:HTTP.Request.Options = {
					headers: new Map<string, HTTP.Header.Class>(),
				};
				requestOptions.headers.set( "content-type", new HTTP.Header.Class( "text/plain" ) );
				requestOptions.headers.set( "accept", new HTTP.Header.Class( "text/plain" ) );
				authenticator.addAuthentication( requestOptions );

				expect( ! ! requestOptions ).toEqual( true );
				expect( Utils.isObject( requestOptions ) ).toEqual( true );
				expect( "headers" in requestOptions ).toEqual( true );
				expect( requestOptions.headers instanceof Map ).toEqual( true );
				expect( requestOptions.headers.size ).toEqual( 3 );
				expect( requestOptions.headers.has( "content-type" ) ).toEqual( true );
				expect( requestOptions.headers.has( "accept" ) ).toEqual( true );
				expect( requestOptions.headers.has( "authorization" ) ).toEqual( true );

				let authorizationHeader:HTTP.Header.Class = requestOptions.headers.get( "authorization" );

				expect( authorizationHeader instanceof HTTP.Header.Class ).toEqual( true );
				expect( authorizationHeader.values.length ).toEqual( 1 );

				let authorization:string = authorizationHeader.toString();

				expect( Utils.S.startsWith( authorization, "Token " ) ).toEqual( true );
				expect( authorization.substring( 6 ) ).toEqual( "token-value" );
			})();

			(() => {
				class Context extends AbstractContext {
					resolve( relativeURI:string ):string {
						return "http://example.com/successful/" + relativeURI;
					}
				}

				let context:AbstractContext = new Context();
				let authenticator:TokenAuthenticator.Class = new TokenAuthenticator.Class( context );

				let expirationTime:Date = new Date();
				expirationTime.setDate( expirationTime.getDate() + 1 );
				(<any> authenticator)._credentials = {
					key: "token-value",
					expirationTime: expirationTime,
				};

				let requestOptions:HTTP.Request.Options = {
					headers: new Map<string, HTTP.Header.Class>(),
				};
				requestOptions.headers.set( "content-type", new HTTP.Header.Class( "text/plain" ) );
				requestOptions.headers.set( "accept", new HTTP.Header.Class( "text/plain" ) );
				requestOptions.headers.set( "authorization", new HTTP.Header.Class( "Another another-type-of-authorization" ) );
				authenticator.addAuthentication( requestOptions );

				expect( ! ! requestOptions ).toEqual( true );
				expect( Utils.isObject( requestOptions ) ).toEqual( true );
				expect( "headers" in requestOptions ).toEqual( true );
				expect( requestOptions.headers instanceof Map ).toEqual( true );
				expect( requestOptions.headers.size ).toEqual( 3 );
				expect( requestOptions.headers.has( "content-type" ) ).toEqual( true );
				expect( requestOptions.headers.has( "accept" ) ).toEqual( true );
				expect( requestOptions.headers.has( "authorization" ) ).toEqual( true );

				let authorizationHeader:HTTP.Header.Class = requestOptions.headers.get( "authorization" );

				expect( authorizationHeader instanceof HTTP.Header.Class ).toEqual( true );
				expect( authorizationHeader.values.length ).toEqual( 1 );

				let authorization:string = authorizationHeader.toString();

				expect( Utils.S.startsWith( authorization, "Another " ) ).toEqual( true );
				expect( authorization.substring( 8 ) ).toEqual( "another-type-of-authorization" );
			})();

			(() => {
				class Context extends AbstractContext {
					resolve( relativeURI:string ):string {
						return "http://example.com/successful/" + relativeURI;
					}
				}

				let context:AbstractContext = new Context();
				let authenticator:TokenAuthenticator.Class = new TokenAuthenticator.Class( context );

				let expirationTime:Date = new Date();
				expirationTime.setDate( expirationTime.getDate() + 1 );
				(<any> authenticator)._credentials = {
					key: "token-value",
					expirationTime: expirationTime,
				};

				let requestOptions:HTTP.Request.Options = {
					headers: new Map<string, HTTP.Header.Class>(),
				};
				requestOptions.headers.set( "content-type", new HTTP.Header.Class( "text/plain" ) );
				requestOptions.headers.set( "accept", new HTTP.Header.Class( "text/plain" ) );
				requestOptions.headers.set( "authorization", new HTTP.Header.Class( "Token another-token-value" ) );
				authenticator.addAuthentication( requestOptions );

				expect( ! ! requestOptions ).toEqual( true );
				expect( Utils.isObject( requestOptions ) ).toEqual( true );
				expect( "headers" in requestOptions ).toEqual( true );
				expect( requestOptions.headers instanceof Map ).toEqual( true );
				expect( requestOptions.headers.size ).toEqual( 3 );
				expect( requestOptions.headers.has( "content-type" ) ).toEqual( true );
				expect( requestOptions.headers.has( "accept" ) ).toEqual( true );
				expect( requestOptions.headers.has( "authorization" ) ).toEqual( true );

				let authorizationHeader:HTTP.Header.Class = requestOptions.headers.get( "authorization" );

				expect( authorizationHeader instanceof HTTP.Header.Class ).toEqual( true );
				expect( authorizationHeader.values.length ).toEqual( 1 );

				let authorization:string = authorizationHeader.toString();

				expect( Utils.S.startsWith( authorization, "Token " ) ).toEqual( true );
				expect( authorization.substring( 6 ) ).toEqual( "another-token-value" );
			})();

		} );

		it( hasMethod( INSTANCE, "clearAuthentication", `
			Clears any saved credentials and restores the Authenticator to its initial state.
		` ), ( done:{ ():void; fail:( error:any ) => void } ):void => {
			// Property Integrity
			(() => {
				class MockedContext extends AbstractContext {
					resolve( uri:string ):string {
						return uri;
					}
				}
				let authenticator:TokenAuthenticator.Class = new TokenAuthenticator.Class( new MockedContext() );

				expect( "clearAuthentication" in authenticator ).toEqual( true );
				expect( Utils.isFunction( authenticator.clearAuthentication ) ).toEqual( true );

				expect( () => authenticator.clearAuthentication() ).not.toThrow();
			})();

			let promises:Promise<void>[] = [];

			// Successful Authentication
			(() => {
				class SuccessfulContext extends AbstractContext {
					resolve( relativeURI:string ):string {
						return "http://example.com/successful/" + relativeURI;
					}
				}

				let expirationTime:Date = new Date();
				expirationTime.setDate( expirationTime.getDate() + 1 );
				jasmine.Ajax.stubRequest( "http://example.com/successful/auth-tokens/", null, "POST" ).andReturn( {
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
							"@value": "${expirationTime.toISOString()}",
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

				let context:SuccessfulContext = new SuccessfulContext();
				let authenticator:TokenAuthenticator.Class = new TokenAuthenticator.Class( context );

				promises.push( authenticator.authenticate( new UsernameAndPasswordToken( "user", "pass" ) ).then( ():void => {
					expect( authenticator.isAuthenticated() ).toEqual( true );

					authenticator.clearAuthentication();

					expect( authenticator.isAuthenticated() ).toEqual( false );
				} ) );
			})();

			Promise.all( promises ).then( done, done.fail );
		} );

	} );

	it( hasDefaultExport( "Carbon.Auth.TokenAuthenticator.Class" ), ():void => {
		expect( DefaultExport ).toBeDefined();
		expect( DefaultExport ).toBe( TokenAuthenticator.Class );
	} );

} );
