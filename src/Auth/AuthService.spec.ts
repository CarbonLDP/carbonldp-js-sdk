import { anyThatMatches } from "../../test/helpers/jasmine-equalities";
import { createMockAuthService, } from "../../test/helpers/mocks";
import { CarbonLDP } from "../CarbonLDP";
import { IllegalArgumentError } from "../Errors";
import { RequestOptions } from "../HTTP";
import {
	clazz,
	constructor,
	hasMethod,
	hasProperty,
	hasSignature,
	INSTANCE,
	method,
	module,
	property
} from "../test/JasmineExtender";
import * as Utils from "../Utils";
import { C } from "../Vocabularies/C";
import { CS } from "../Vocabularies/CS";
import { XSD } from "../Vocabularies/XSD";
import { AbstractAuthenticator } from "./AbstractAuthenticator";
import { Authenticator } from "./Authenticator";
import { AuthMethod } from "./AuthMethod";

import { AuthService } from "./AuthService";

import { TokenCredentials } from "./TokenCredentials";
import {
	TransientUser,
	User,
} from "./User";
import { UsersEndpoint } from "./UsersEndpoint";


describe( module( "carbonldp/Auth/Service" ), ():void => {

	describe( clazz(
		"CarbonLDP.AuthService",
		"Abstract class that manages authentications and authorizations."
	), ():void => {

		let context:CarbonLDP;
		beforeEach( ():void => {
			context = new CarbonLDP( "https://example.com" );

			jasmine.Ajax.install();
		} );

		afterEach( ():void => {
			jasmine.Ajax.uninstall();
		} );

		it( "should exists", ():void => {
			expect( AuthService ).toBeDefined();
			expect( AuthService ).toEqual( jasmine.any( Function ) );
		} );


		describe( constructor(), ():void => {

			it( hasSignature( [
				{ name: "context", type: "CarbonLDP.Context" },
			] ), ():void => {} );

			it( "should be instantiable", ():void => {
				const auth:AuthService = new AuthService( context );
				expect( auth ).toEqual( jasmine.any( AuthService ) );
			} );

			it( "should assign UsersEndpoint in users", ():void => {
				const auth:AuthService = new AuthService( context );

				expect( auth.users ).toEqual( anyThatMatches( UsersEndpoint.is, "UsersEndpoint" ) as any );
				expect( auth.users ).toEqual( jasmine.objectContaining( {
					id: "https://example.com/users/",
				} ) );
			} );

		} );

		// TODO: Move to constructor tests
		it( hasProperty(
			INSTANCE,
			"users",
			"CarbonLDP.Auth.UsersEndpoint",
			"Instance of `CarbonLDP.Auth.UsersEndpoint` that helps managing the users of your Carbon LDP."
		), ():void => {} );

		// TODO: Separate in different tests
		describe( property(
			INSTANCE,
			"authenticatedUser",
			"CarbonLDP.Auth.User",
			"The user of the user that has been authenticated.\n" +
			"Returns `null` if the user it not authenticated."
		), ():void => {

			it( "should return null when no authenticated", ():void => {
				const auth:AuthService = new AuthService( context );
				expect( auth.authenticatedUser ).toBeNull();
			} );

			it( "should return the document when authenticated", ():void => {
				let auth:AuthService = createMockAuthService( { context, user: true } );
				expect( auth.authenticatedUser ).toBeTruthy();
				expect( User.is( auth.authenticatedUser ) ).toBe( true );
			} );

		} );


		describe( method( INSTANCE, "isAuthenticated" ), ():void => {

			it( hasSignature(
				"Returns true if the user is authenticated.", [
					{ name: "askParent", type: "boolean", optional: true, defaultValue: "true" },
				],
				{ type: "boolean" }
			), ():void => {} );

			it( "should exists", ():void => {
				expect( AuthService.prototype.isAuthenticated ).toBeDefined();
				expect( AuthService.prototype.isAuthenticated ).toEqual( jasmine.any( Function ) );
			} );

			it( "should return false when no authenticator", ():void => {
				const auth:AuthService = new AuthService( context );
				expect( auth.isAuthenticated() ).toBe( false );
			} );

			it( "should return false when authenticator no authenticated", ():void => {
				const authenticator:jasmine.SpyObj<AbstractAuthenticator<{}, {}>> = jasmine.createSpyObj( "Authenticator", { isAuthenticated: false } );
				const auth:AuthService = createMockAuthService( { context, authenticator } );
				expect( auth.isAuthenticated() ).toBe( false );
			} );

			it( "should return true when authenticator authenticated", ():void => {
				const authenticator:jasmine.SpyObj<AbstractAuthenticator<{}, {}>> = jasmine.createSpyObj( "Authenticator", { isAuthenticated: true } );
				const auth:AuthService = createMockAuthService( { context, authenticator } );
				expect( auth.isAuthenticated() ).toBe( true );
			} );

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
			let auth:AuthService = new AuthService( context );

			expect( auth.authenticate ).toBeDefined();
			expect( Utils.isFunction( auth.authenticate ) ).toBe( true );

			let spy:jasmine.Spy = spyOn( auth, "authenticateUsing" );

			//noinspection JSIgnoredPromiseFromCall
			auth.authenticate( "myUer@user.com", "myAwesomePassword" );

			expect( spy ).toHaveBeenCalledWith( AuthMethod.TOKEN, "myUer@user.com", "myAwesomePassword" );
		} );

		describe( method( INSTANCE, "authenticateUsing" ), ():void => {

			it( hasSignature(
				"Authenticates the user with Basic HTTP Authentication, which uses an encoded string with username and password in every request.", [
					{ name: "method", type: "CarbonLDP.Auth.AuthMethod.BASIC" },
					{ name: "username", type: "string" },
					{ name: "password", type: "string" },
				],
				{ type: "Promise<CarbonLDP.Auth.BasicCredentials>" }
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


			beforeEach( () => {
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
								_resolved: false,
								types: jasmine.arrayContaining( [ TransientUser.TYPE ] ) as any,
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
						"${ CS.expires }": [ {
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
								expires: jasmine.any( Date ) as any as Date,
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
								_resolved: false,
								types: jasmine.arrayContaining( [ TransientUser.TYPE ] ) as any,
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
					const tokenCredentials:TokenCredentials = <TokenCredentials> {
						token: "token-key",
						expires: new Date( Date.now() + 24 * 60 * 60 * 1000 ),
					};

					const auth:AuthService = new AuthService( context );
					auth
						.authenticateUsing( AuthMethod.TOKEN, tokenCredentials )
						.then( credentials => {
							expect( credentials ).toBeDefined();
							expect( credentials ).toEqual( jasmine.objectContaining( {
								token: "token-key",
								expires: jasmine.any( Date ) as any as Date,
							} ) );

							done();
						} )
						.catch( done.fail );
				} );

				it( "should populate the authenticated user", ( done:DoneFn ):void => {
					const tokenCredentials:TokenCredentials = <TokenCredentials> {
						token: "token-key",
						expires: new Date( Date.now() + 24 * 60 * 60 * 1000 ),
					};

					const auth:AuthService = new AuthService( context );
					auth
						.authenticateUsing( AuthMethod.TOKEN, tokenCredentials )
						.then( () => {
							expect( auth.authenticatedUser ).toBeDefined();
							expect( auth.authenticatedUser ).toEqual( jasmine.objectContaining( {
								_resolved: false,
								types: jasmine.arrayContaining( [ TransientUser.TYPE ] ) as any,
							} ) );

							done();
						} )
						.catch( done.fail );
				} );

			} );

		} );

		describe( method( INSTANCE, "addAuthentication" ), ():void => {

			it( hasSignature(
				"Adds the authentication header to a `CarbonLDP.HTTP.RequestOptions` object.", [
					{ name: "options", type: "CarbonLDP.HTTP.RequestOptions" },
				]
			), ():void => {} );

			it( "should exists", ():void => {
				expect( AuthService.prototype.addAuthentication ).toBeDefined();
				expect( AuthService.prototype.addAuthentication ).toEqual( jasmine.any( Function ) );
			} );

			it( "should not alter options if not authenticated", ():void => {
				const auth:AuthService = new AuthService( context );
				const options:RequestOptions = {};

				auth.addAuthentication( options );
				expect( options ).toEqual( {} );
			} );

			it( "should add authentication from authenticator if authenticated", ():void => {
				const authenticator:jasmine.SpyObj<Authenticator<{}>> = jasmine
					.createSpyObj( "Authenticator", {
						"addAuthentication": void 0,
						"isAuthenticated": true,
					} );
				const auth:AuthService = createMockAuthService( { context, authenticator } );

				const options:RequestOptions = { timeout: 5050 };
				auth.addAuthentication( options );
				expect( authenticator.addAuthentication ).toHaveBeenCalledWith( options );
			} );

			it( "should NOT add authentication from authenticator if NOT authenticated", ():void => {
				const authenticator:jasmine.SpyObj<Authenticator<{}>> = jasmine
					.createSpyObj( "Authenticator", {
						"addAuthentication": void 0,
						"isAuthenticated": false,
					} );
				const auth:AuthService = createMockAuthService( { context, authenticator } );

				const options:RequestOptions = { timeout: 5050 };
				auth.addAuthentication( options );
				expect( authenticator.addAuthentication ).not.toHaveBeenCalled();
			} );

		} );

		describe( method( INSTANCE, "clearAuthentication" ), ():void => {

			it( hasSignature( "Deletes the authentication of the current instance." ), ():void => {} );

			it( "should exists", ():void => {
				expect( AuthService.prototype.clearAuthentication ).toBeDefined();
				expect( AuthService.prototype.clearAuthentication ).toEqual( jasmine.any( Function ) );
			} );

			it( "should do nothing if no sub-authenticator", ():void => {
				const auth:AuthService = createMockAuthService( { context } );
				auth.clearAuthentication();
			} );

			it( "should clear sub-authenticator", ():void => {
				const authenticator:Authenticator<any> = jasmine
					.createSpyObj<Authenticator<any>>( "Authenticator", {
						"clearAuthentication": void 0,
					} );

				const auth:AuthService = createMockAuthService( { context, authenticator } );

				auth.clearAuthentication();
				expect( authenticator.clearAuthentication ).toHaveBeenCalled();
			} );

		} );

	} );

} );
