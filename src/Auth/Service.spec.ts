import { AbstractContext } from "../AbstractContext";
import { IllegalArgumentError } from "../Errors";
import { RequestOptions } from "../HTTP/Request";
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
import { C } from "../Vocabularies/C";
import { CS } from "../Vocabularies/CS";
import { XSD } from "../Vocabularies/XSD";
import { AuthMethod } from "./AuthMethod";
import * as PersistedUser from "./PersistedUser";
import * as Roles from "./Roles";

import { AuthService } from "./Service";

import * as TokenCredentials from "./TokenCredentials";
import * as User from "./User";
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

		// TODO: Separate in different tests
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

		// TODO: Move to constructor tests
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

		// TODO: Separate in different tests
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

		// TODO: Move to constructor tests
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

		// TODO: Separate in different tests
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

		// TODO: Separate in different tests
		it( hasMethod(
			INSTANCE,
			"authenticate",
			"Authenticate the user with a `username` and `password`. Uses the `CarbonLDP.Auth.AuthMethod.TOKEN` method for the authentication.", [
				{ name: "username", type: "string" },
				{ name: "password", type: "string" },
			],
			{ type: "Promise<CarbonLDP.Auth.TokenCredentials>" }
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

			it( hasSignature(
				"Authenticates the user with Basic HTTP Authentication, which uses an encoded string with username and password in every request.", [
					{ name: "method", type: "CarbonLDP.Auth.AuthMethod.BASIC" },
					{ name: "username", type: "string" },
					{ name: "password", type: "string" },
				],
				{ type: "Promise<CarbonLDP.Auth.UsernameAndPasswordCredentials>" }
			), ():void => {} );

			it( hasSignature(
				"Authenticates the user with a username and password, and generates a JSON Web Token (JWT) credential that will be used in every request.", [
					{ name: "method", type: "CarbonLDP.Auth.AuthMethod.TOKEN" },
					{ name: "username", type: "string" },
					{ name: "password", type: "string" },
				],
				{ type: "Promise<CarbonLDP.Auth.TokenCredentials>" }
			), ():void => {} );

			it( hasSignature(
				"Authenticates the user with a `CarbonLDP.Auth.TokenCredentials`, which contains a JSON Web Token (JWT) that will be used in every request.", [
					{ name: "method", type: "CarbonLDP.Auth.AuthMethod.TOKEN" },
					{ name: "token", type: "CarbonLDP.Auth.TokenCredentialsBase" },
				],
				{ type: "Promise<CarbonLDP.Auth.TokenCredentials>" }
			), ():void => {} );


			let context:AbstractContext;
			beforeEach( () => {
				context = new class extends AbstractContext {
					protected _baseURI:string = "https://example.com/";
					protected settings:ContextSettings = {
						paths: {
							users: {
								slug: "users/",
								paths: { me: "me/" },
							},
						},
					};
				};

				jasmine.Ajax.stubRequest( "https://example.com/users/me/" ).andReturn( {
					status: 200,
					responseHeaders: {
						"eTag": `"1-12345"`,
					},
					responseText: `[ {
							"@id": "https://example.com/users/me/",
							"@graph": [
								{
									"@id": "https://example.com/users/me/",
									"@type": [ "${ C.Document }", "${ CS.AuthenticatedUserInformationAccessor }" ],
									"${ CS.authenticatedUserMetadata }": [ {
										"@id": "_:1"
									} ]
								},
								{
									"@id": "_:1",
									"@type": [ "${ CS.AuthenticatedUserMetadata }", "${ C.VolatileResource }" ],
									"${ CS.user }": [ {
										"@id": "https://example.com/users/the-user/"
									} ]
								}
							]
						} ]`,
				} );
				jasmine.Ajax.stubRequest( "https://example.com/users/the-user/" ).andReturn( {
					status: 200,
					responseHeaders: {
						"eTag": `"2-12345"`,
					},
					responseText: `{
						"@id": "https://example.com/users/the-user/",
						"@graph": [
							{
								"@id": "https://example.com/users/the-user/",
								"@type": [
									"${ C.Document }",
									"${ CS.User }"
								],
								"${ CS.name }": [ {
									"@value": "The user name"
								} ]
							}
						]
					}`,
				} );
			} );

			it( "should exists", ():void => {
				expect( AuthService.prototype.authenticateUsing ).toBeDefined();
				expect( AuthService.prototype.authenticateUsing ).toEqual( jasmine.any( Function ) );
			} );

			it( "should throw error if invalid auth method", ( done:DoneFn ):void => {
				const auth:AuthService = new AuthService( context );
				auth
					.authenticateUsing( "ERROR" as any, "username", "password" )
					.then( () => done.fail( "should not resolve" ) )
					.catch( error => {
						expect( () => { throw error; } ).toThrowError( IllegalArgumentError, `Invalid authentication method "ERROR".` );

						done();
					} );
			} );


			describe( "When BASIC auth method with basic credentials", ():void => {

				it( "should return credentials", ( done:DoneFn ):void => {
					const auth:AuthService = new AuthService( context );
					auth
						.authenticateUsing( AuthMethod.BASIC, "username", "password" )
						.then( credentials => {
							expect( credentials ).toBeDefined();
							expect( credentials ).toEqual( jasmine.objectContaining( {
								username: "username",
								password: "password",
							} ) );

							done();
						} )
						.catch( done.fail );
				} );

				it( "should populate the authenticated user", ( done:DoneFn ):void => {
					const auth:AuthService = new AuthService( context );
					auth
						.authenticateUsing( AuthMethod.BASIC, "username", "password" )
						.then( () => {
							expect( auth.authenticatedUser ).toBeDefined();
							expect( auth.authenticatedUser ).toEqual( jasmine.objectContaining( {
								types: jasmine.arrayContaining( [ User.RDF_CLASS ] ) as any,
								name: "The user name",
							} ) );

							done();
						} )
						.catch( done.fail );
				} );

			} );

			describe( "When TOKEN auth method with basic credentials", ():void => {

				beforeEach( ():void => {
					jasmine.Ajax.stubRequest( "https://example.com/users/me/" ).andReturn( {
						status: 200,
						responseHeaders: {
							"eTag": `"1-12345"`,
							"Preference-Applied": `include="${ CS.PreferAuthToken }"`,
						},
						responseText: `[ {
						"@id": "_:1",
						"@type": [ "${ C.ResponseMetadata }", "${ C.VolatileResource }" ],
						"${ CS.authToken }": [ {
							"@id": "_:2"
						} ]
					}, {
						"@id": "_:2",
						"@type": [ "${ CS.TokenCredentials }", "${ C.VolatileResource }" ],
						"${ CS.token }": [ {
							"@value": "token-key"
						} ],
						"${ CS.expiresOn }": [ {
							"@value": "${ new Date( Date.now() + 24 * 60 * 60 * 1000 ).toISOString() }",
							"@type": "${ XSD.dateTime }"
						} ]
					}, {
						"@id": "https://example.com/users/me/",
						"@graph": [
							{
								"@id": "https://example.com/users/me/",
								"@type": [ "${ C.Document }", "${ CS.AuthenticatedUserInformationAccessor }" ],
								"${ CS.authenticatedUserMetadata }": [ {
									"@id": "_:1"
								} ]
							},
							{
								"@id": "_:1",
								"@type": [ "${ CS.AuthenticatedUserMetadata }", "${ C.VolatileResource }" ],
								"${ CS.user }": [ {
									"@id": "https://example.com/users/the-user/"
								} ]
							}
						]
					} ]`,
					} );
				} );

				it( "should return credentials", ( done:DoneFn ):void => {
					const auth:AuthService = new AuthService( context );
					auth
						.authenticateUsing( AuthMethod.TOKEN, "username", "password" )
						.then( credentials => {
							expect( credentials ).toBeDefined();
							expect( credentials ).toEqual( jasmine.objectContaining( {
								token: "token-key",
								expiresOn: jasmine.any( Date ) as any as Date,
							} ) );

							done();
						} )
						.catch( done.fail );
				} );

				it( "should populate the authenticated user", ( done:DoneFn ):void => {
					const auth:AuthService = new AuthService( context );
					auth
						.authenticateUsing( AuthMethod.TOKEN, "username", "password" )
						.then( () => {
							expect( auth.authenticatedUser ).toBeDefined();
							expect( auth.authenticatedUser ).toEqual( jasmine.objectContaining( {
								types: jasmine.arrayContaining( [ User.RDF_CLASS ] ) as any,
								name: "The user name",
							} ) );

							done();
						} )
						.catch( done.fail );
				} );

			} );

			describe( "When TOKEN auth method with token credentials", ():void => {

				it( "should throw error if invalid token credentials", ( done:DoneFn ):void => {
					const auth:AuthService = new AuthService( context );
					auth
						.authenticateUsing( AuthMethod.TOKEN, {} as any )
						.then( () => done.fail( "should not resolve" ) )
						.catch( error => {
							expect( () => { throw error; } ).toThrowError( IllegalArgumentError, `Invalid authentication token.` );

							done();
						} );
				} );

				it( "should return credentials", ( done:DoneFn ):void => {
					const tokenCredentials:TokenCredentials.TokenCredentials = <TokenCredentials.TokenCredentials> {
						token: "token-key",
						expiresOn: new Date( Date.now() + 24 * 60 * 60 * 1000 ),
					};

					const auth:AuthService = new AuthService( context );
					auth
						.authenticateUsing( AuthMethod.TOKEN, tokenCredentials )
						.then( credentials => {
							expect( credentials ).toBeDefined();
							expect( credentials ).toEqual( jasmine.objectContaining( {
								token: "token-key",
								expiresOn: jasmine.any( Date ) as any as Date,
							} ) );

							done();
						} )
						.catch( done.fail );
				} );

				it( "should populate the authenticated user", ( done:DoneFn ):void => {
					const tokenCredentials:TokenCredentials.TokenCredentials = <TokenCredentials.TokenCredentials> {
						token: "token-key",
						expiresOn: new Date( Date.now() + 24 * 60 * 60 * 1000 ),
					};

					const auth:AuthService = new AuthService( context );
					auth
						.authenticateUsing( AuthMethod.TOKEN, tokenCredentials )
						.then( () => {
							expect( auth.authenticatedUser ).toBeDefined();
							expect( auth.authenticatedUser ).toEqual( jasmine.objectContaining( {
								types: jasmine.arrayContaining( [ User.RDF_CLASS ] ) as any,
								name: "The user name",
							} ) );

							done();
						} )
						.catch( done.fail );
				} );

			} );

		} );

		// TODO: Separate in different tests
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

		// TODO: Separate in different tests
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
