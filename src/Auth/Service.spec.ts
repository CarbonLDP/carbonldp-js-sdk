import { AbstractContext } from "../AbstractContext";
import * as Errors from "../Errors";
import { BadResponseError } from "../HTTP/Errors";
import { RequestOptions } from "../HTTP/Request";
import { Response } from "../HTTP/Response";
import { Resource } from "../Resource";
import { ContextSettings } from "../Settings";
import {
	clazz,
	hasConstructor,
	hasMethod,
	hasProperty,
	hasSignature,
	INSTANCE,
	isDefined,
	method,
	module
} from "../test/JasmineExtender";
import * as Utils from "../Utils";
import { CS } from "../Vocabularies/CS";
import { XSD } from "../Vocabularies/XSD";
import { AuthMethod } from "./AuthMethod";
import * as PersistedUser from "./PersistedUser";
import * as Roles from "./Roles";

import { AuthService } from "./Service";

import TokenAuthenticator from "./TokenAuthenticator";
import * as TokenCredentials from "./TokenCredentials";
import * as User from "./User";
import { UsernameAndPasswordCredentials } from "./UsernameAndPasswordCredentials";
import * as Users from "./Users";

describe( module( "carbonldp/Auth/Service" ), ():void => {

	describe( clazz(
		"CarbonLDP.AuthService",
		"Abstract class that manages authentications and authorizations."
	), ():void => {

		beforeEach( ():void => {
			jasmine.Ajax.install();
		} );

		afterEach( ():void => {
			jasmine.Ajax.uninstall();
		} );

		it( isDefined(), ():void => {
			expect( AuthService ).toBeDefined();
			expect( Utils.isFunction( AuthService ) ).toBe( true );
		} );

		it( hasConstructor( [
			{ name: "context", type: "CarbonLDP.Context" },
		] ), ():void => {
			let auth:AuthService = new AuthService( new class extends AbstractContext {
				protected _baseURI:string;

				constructor() {
					super();
					this._baseURI = "http://example.com/";
					this.settings = { paths: { system: ".system/" } };
				}
			} );

			expect( auth ).toBeTruthy();
			expect( auth instanceof AuthService ).toBe( true );
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

			let auth:AuthService = new AuthService( new MockedContext() );

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
				let auth:AuthService = new class extends AuthService {
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
						this.auth = new class extends AuthService {
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
						this.auth = new class extends AuthService {
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
						this.auth = new class extends AuthService {
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
			let auth:AuthService = new AuthService( new class extends AbstractContext {
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
				let auth:AuthService = new AuthService( context );

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
				let auth:AuthService = new AuthService( context );

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
				let auth:AuthService = new AuthService( context );
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
				let auth:AuthService = new AuthService( context );
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
			"Authenticate the user with a `username` and `password`. Uses the `CarbonLDP.Auth.AuthMethod.TOKEN` method for the authentication.", [
				{ name: "username", type: "string" },
				{ name: "password", type: "string" },
			],
			{ type: "Promise<CarbonLDP.Auth.TokenCredentials.Class>" }
		), ():void => {
			let auth:AuthService = new AuthService( new class extends AbstractContext {
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

			expect( spy ).toHaveBeenCalledWith( AuthMethod.TOKEN, "myUer@user.com", "myAwesomePassword" );
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

			xit( hasSignature(
				"Authenticates the user with Basic HTTP Authentication, which uses an encoded string with username and password in every request.", [
					{ name: "method", type: "CarbonLDP.Auth.AuthMethod.BASIC" },
					{ name: "username", type: "string" },
					{ name: "password", type: "string" },
				],
				{ type: "Promise<CarbonLDP.Auth.UsernameAndPasswordCredentials>" }
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

				let auth:AuthService = new AuthService( context );

				expect( auth.authenticateUsing ).toBeDefined();
				expect( Utils.isFunction( auth.authenticateUsing ) ).toBe( true );
				expect( auth.isAuthenticated() ).toBe( false );

				let username:string = "myUser@user.com";
				let password:string = "myAwesomePassword";
				let promises:Promise<any>[] = [];
				let promise:Promise<any>;

				let spies:any = {
					success: ( _auth:AuthService, credentials:UsernameAndPasswordCredentials ):void => {
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
				let auth01:AuthService = new AuthService( context );
				promise = auth01.authenticateUsing( AuthMethod.BASIC, username, password );
				expect( promise instanceof Promise ).toBe( true );
				promises.push( promise.then( ( credentials:UsernameAndPasswordCredentials ):void => {
					spies.success( auth01, credentials );
				} ) );

				// Wrong parameters
				let auth02:AuthService = new AuthService( context );
				promise = auth02.authenticateUsing( AuthMethod.BASIC as any, {} as any );
				expect( promise instanceof Promise ).toBe( true );
				promises.push( promise.catch( spies.fail ) );

				// Nonexistent authentication type
				let auth03:AuthService = new AuthService( context );
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
					{ name: "method", type: "CarbonLDP.Auth.AuthMethod.TOKEN" },
					{ name: "username", type: "string" },
					{ name: "password", type: "string" },
				],
				{ type: "Promise<CarbonLDP.Auth.TokenCredentials.Class>" }
			), ( done:DoneFn ):void => {
				let auth:AuthService = new AuthService( context );

				expect( auth.authenticateUsing ).toBeDefined();
				expect( Utils.isFunction( auth.authenticateUsing ) ).toBe( true );
				expect( auth.isAuthenticated() ).toBe( false );

				let date:Date = new Date();
				date.setDate( date.getDate() + 1 );
				let promises:Promise<any>[] = [];
				let promise:Promise<any>;
				let spies:any = {
					success: ( _auth:AuthService, credentials:TokenCredentials.Class ):void => {
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
				let auth01:AuthService = new AuthService( context );
				promise = auth01.authenticateUsing( AuthMethod.TOKEN, "myUser@user.con", "myAwesomePassword" );
				expect( promise instanceof Promise ).toBe( true );
				promises.push( promise.then( ( credentials:TokenCredentials.Class ):void => {
					spies.success( auth01, credentials );
				} ) );

				// Wrong parameters
				let auth02:AuthService = new AuthService( context );
				promise = auth02.authenticateUsing( AuthMethod.TOKEN, {} as any );
				expect( promise instanceof Promise ).toBe( true );
				promises.push( promise.catch( spies.fail ) );

				// Nonexistent authentication method
				let auth03:AuthService = new AuthService( context );
				promise = auth03.authenticateUsing( "Error" as any, "myUser@user.con", "myAwesomePassword" );
				expect( promise instanceof Promise ).toBe( true );
				promises.push( promise.catch( spies.fail ) );

				Promise.all( promises ).then( ():void => {
					expect( spySuccess.calls.count() ).toBe( 1 );
					expect( spyFail.calls.count() ).toBe( 2 );
					done();
				}, done.fail );
			} );

			xit( hasSignature(
				"Authenticates the user with a `CarbonLDP.Auth.TokenCredentials.Class`, which contains a JSON Web Token (JWT) that will be used in every request.", [
					{ name: "method", type: "CarbonLDP.Auth.AuthMethod.TOKEN" },
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
				let auth01:AuthService = new AuthService( context );
				let auth02:AuthService = new AuthService( context );

				expect( auth01.authenticateUsing ).toBeDefined();
				expect( Utils.isFunction( auth01.authenticateUsing ) ).toBe( true );
				expect( auth01.isAuthenticated() ).toBe( false );


				let date:Date;
				let token:TokenCredentials.Class;
				let promises:Promise<any>[] = [];
				let promise:Promise<any>;
				let spies:any = {
					success01: ( _auth:AuthService, credentials:TokenCredentials.Class ):void => {
						expect( credentials.key ).toEqual( token.key );
						expect( _auth.isAuthenticated() ).toBe( true );

						expect( _auth.authenticatedUser ).toBeTruthy();
						expect( credentials.user ).toBe( _auth.authenticatedUser );
						expect( PersistedUser.Factory.is( _auth.authenticatedUser ) ).toBe( true );
					},
					success02: ( _auth:AuthService, credentials:TokenCredentials.Class ):void => {
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
				promise = auth01.authenticateUsing( AuthMethod.TOKEN, token );
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
				promise = auth02.authenticateUsing( AuthMethod.TOKEN, <TokenCredentials.Class> getFromStorage() );
				expect( promise instanceof Promise ).toBe( true );
				promises.push( promise.then( ( credentials:TokenCredentials.Class ):void => {
					spies.success02( auth01, credentials );
				} ) );

				// ExpirationDate has been reached
				let auth03:AuthService = new AuthService( context );
				date = new Date();
				date.setDate( date.getDate() - 1 );
				token = <any> {
					expirationTime: date,
					id: "_:BlankNode",
					key: "dG9rZW4tdmFsdWU=",
					types: [ CS.Token ],
				};
				promise = auth03.authenticateUsing( AuthMethod.TOKEN, token );
				expect( promise instanceof Promise ).toBe( true );
				promises.push( promise.catch( spies.fail ) );

				// Wrong parameters
				promise = auth03.authenticateUsing( AuthMethod.TOKEN, {} as any );
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

				let auth:AuthService = new AuthService( context );

				expect( auth.addAuthentication ).toBeDefined();
				expect( Utils.isFunction( auth.addAuthentication ) ).toBe( true );
			})();

			// Neither current nor parent authenticated
			(function currentNotAuthenticated_parentNotAuthenticated():void {
				class MockedContext extends AbstractContext {
					protected _baseURI:string;

					constructor() {
						super();
						this.auth = new AuthService( this );
						this._baseURI = "";
						this._parentContext = this;
					}
				}

				let context:AbstractContext = new MockedContext();
				let auth:AuthService = new AuthService( context );

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
						this.auth = new AuthService( this );
						this._baseURI = "";
						this._parentContext = this;
					}
				}

				let context:AbstractContext = new MockedContext();
				let auth:AuthService = new AuthService( context );

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
						this.auth = new AuthService( this );
						this._baseURI = "";
						this._parentContext = this;
					}
				}

				let context:AbstractContext = new MockedContext();
				let auth:AuthService = new AuthService( context );

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
						this.auth = new AuthService( this );
						this._baseURI = "";
						this._parentContext = this;
					}
				}

				let context:AbstractContext = new MockedContext();
				let auth:AuthService = new AuthService( context );
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

				let auth:AuthService = new AuthService( context );

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

				let auth:AuthService = new AuthService( context );

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

				let auth:AuthService = new AuthService( context );

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

	} );

} );
