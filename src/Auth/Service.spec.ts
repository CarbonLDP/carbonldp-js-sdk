import { anyThatMatches } from "../../test/helpers/jasmine-equalities";
import {
	createMockAuthService,
	createMockContext,
} from "../../test/helpers/mocks";

import { Context } from "../Context";
import { Endpoint } from "../Endpoint";
import * as Errors from "../Errors";
import { BadResponseError } from "../HTTP/Errors";
import { RequestOptions } from "../HTTP/Request";
import { Response } from "../HTTP/Response";
import { PersistedProtectedDocument } from "../PersistedProtectedDocument";
import { Resource } from "../Resource";
import {
	clazz,
	constructor,
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
import { Authenticator } from "./Authenticator";
import { AuthMethod } from "./AuthMethod";
import { BasicCredentials } from "./BasicCredentials";
import { BasicToken } from "./BasicToken";
import { PersistedACL } from "./PersistedACL";
import { PersistedUser } from "./PersistedUser";
import * as Roles from "./Roles";

import { AuthService } from "./Service";

import * as Ticket from "./Ticket";
import TokenAuthenticator from "./TokenAuthenticator";
import * as TokenCredentials from "./TokenCredentials";
import { User } from "./User";
import { UsersEndpoint } from "./UsersEndpoint";


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

		let context:Context;
		beforeEach( ():void => {
			context = createMockContext();
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

				expect( auth.users ).toEqual( anyThatMatches( PersistedProtectedDocument.is ) as any, "PersistedProtectedDocument" );
				expect( auth.users ).toEqual( anyThatMatches( Endpoint.isDecorated ) as any, "Endpoint" );
				expect( auth.users ).toEqual( anyThatMatches( UsersEndpoint.isDecorated ) as any, "UsersEndpoint" );

				expect( auth.users ).toEqual( jasmine.objectContaining( {
					id: "https://example.com/users/",
				} ) );
			} );

		} );

		it( hasProperty(
			INSTANCE,
			"users",
			"CarbonLDP.Auth.UsersEndpoint",
			"Instance of `CarbonLDP.Auth.UsersEndpoint` that helps managing the users of your Carbon LDP."
		), ():void => {} );

		// TODO: Separate in different tests
		it( hasProperty(
			INSTANCE,
			"authenticatedUser",
			"CarbonLDP.Auth.PersistedUser",
			"The user of the user that has been authenticated.\n" +
			"Returns `null` if the user it not authenticated."
		), ():void => {

			(() => {
				const auth:AuthService = new AuthService( context );
				expect( auth.authenticatedUser ).toBeNull();
			})();

			(() => {
				// Authenticated Auth
				let auth:AuthService = createMockAuthService( context, { user: true } );
				expect( auth.authenticatedUser ).toBeTruthy();
				expect( PersistedUser.is( auth.authenticatedUser ) ).toBe( true );
			})();

			(() => {
				context.auth = createMockAuthService( context, { user: true } );

				let contextWithParent:Context = createMockContext( { parentContext: context, auth: true } );

				expect( context.auth.authenticatedUser ).toBeTruthy();
				expect( PersistedUser.is( context.auth.authenticatedUser ) ).toBe( true );

				expect( contextWithParent.auth.authenticatedUser ).toBeTruthy();
				expect( PersistedUser.is( contextWithParent.auth.authenticatedUser ) ).toBe( true );

				expect( context.auth.authenticatedUser ).toBe( contextWithParent.auth.authenticatedUser );
			})();

			(() => {
				context.auth = createMockAuthService( context, { user: true } );

				let childContext:Context = createMockContext( { parentContext: context } );
				childContext.auth = createMockAuthService( childContext, { user: true } );

				expect( context.auth.authenticatedUser ).toBeTruthy();
				expect( PersistedUser.is( context.auth.authenticatedUser ) ).toBe( true );

				expect( childContext.auth.authenticatedUser ).toBeTruthy();
				expect( PersistedUser.is( childContext.auth.authenticatedUser ) ).toBe( true );

				expect( context.auth.authenticatedUser ).not.toBe( childContext.auth.authenticatedUser );
			})();

		} );

		it( hasProperty(
			INSTANCE,
			"roles",
			"CarbonLDP.Auth.Roles.Class",
			"Instance of `CarbonLDP.Auth.Roles.Class` that helps managing the roles of your Carbon LDP."
		), ():void => {
			let auth:AuthService = new AuthService( context );

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
			(():void => {
				const auth:AuthService = new AuthService( context );
				expect( auth.isAuthenticated ).toBeDefined();
				expect( Utils.isFunction( auth.isAuthenticated ) ).toBe( true );
			})();


			// Neither current nor parent authenticated
			(():void => {
				let parentAuth:AuthService = new AuthService( context );
				context.auth = parentAuth;

				let subContext:Context = createMockContext( { parentContext: context } );
				let auth:AuthService = new AuthService( subContext );

				let spyParent:jasmine.Spy = spyOn( parentAuth, "isAuthenticated" ).and.returnValue( false );

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
			(():void => {
				context.auth = new AuthService( context );

				let subContext:Context = createMockContext( { parentContext: context } );
				let auth:AuthService = new AuthService( subContext );

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
			(():void => {
				context.auth = createMockAuthService( context );
				const spyParent:jasmine.Spy = spyOn( context.auth, "isAuthenticated" ).and.returnValue( true );

				const authenticator:jasmine.SpyObj<Authenticator<{}, {}>> = jasmine.createSpyObj( "Authenticator", { isAuthenticated: true } );
				const subContext:Context = createMockContext( { parentContext: context } );
				const auth:AuthService = createMockAuthService( subContext, { authenticator: authenticator } );

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
			(():void => {
				context.auth = createMockAuthService( context );
				const spyParent:jasmine.Spy = spyOn( context.auth, "isAuthenticated" ).and.returnValue( false );

				const subContext:Context = createMockContext( { parentContext: context } );
				const authenticator:jasmine.SpyObj<Authenticator<{}, {}>> = jasmine.createSpyObj( "Authenticator", { isAuthenticated: true } );
				const auth:AuthService = createMockAuthService( subContext, { authenticator } );

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
			{ type: "Promise<CarbonLDP.Auth.TokenCredentials.Class>" }
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
				{ type: "Promise<CarbonLDP.Auth.TokenCredentials.Class>" }
			), ():void => {} );

			it( hasSignature(
				"Authenticates the user with a `CarbonLDP.Auth.TokenCredentials.Class`, which contains a JSON Web Token (JWT) that will be used in every request.", [
					{ name: "method", type: "CarbonLDP.AuthMethod.TOKEN" },
					{ name: "token", type: "CarbonLDP.Auth.TokenCredentials.Class" },
				],
				{ type: "Promise<CarbonLDP.Auth.TokenCredentials.Class>" }
			), ():void => {} );

			it( "should exists", ():void => {
				expect( AuthService.prototype.authenticateUsing ).toBeDefined();
				expect( AuthService.prototype.authenticateUsing ).toEqual( jasmine.any( Function ) );
			} );

			it( "should reject if invalid method", ( done:DoneFn ):void => {
				const auth:AuthService = new AuthService( context );

				auth
					.authenticateUsing( "Error" as any, "username", "password" )
					.then( () => {
						done.fail( "Should not resolve" );
					} )
					.catch( error => {
						expect( () => { throw error; } ).toThrowError( Errors.IllegalArgumentError, "Unsupported authentication method \"Error\"" );

						done();
					} )
				;
			} );


			describe( "When BASIC method", ():void => {

				it( "should get authenticated user with `Users` class", ( done:DoneFn ):void => {
					const auth:AuthService = new AuthService( context );

					const spy:jasmine.Spy = jasmine.createSpy( "get" )
						.and.returnValue( Promise.reject( null ) );
					Object.defineProperty( auth.users, "get", { value: spy } );

					auth
						.authenticateUsing( AuthMethod.BASIC, "username", "password" )
						.then( () => {
							done.fail( "Should not resolve" );
						} )
						.catch( error => {
							if( error ) done.fail( error );

							expect( spy ).toHaveBeenCalledWith( "me/", jasmine.any( Object ) );

							done();
						} )
					;
				} );

				it( "should store authenticated user", ( done:DoneFn ):void => {
					const auth:AuthService = new AuthService( context );

					const user:PersistedUser = PersistedUser.decorate(
						context.documents.getPointer( "https://example.com/users/a-user/" ),
						context.documents
					);
					Object.defineProperty( auth.users, "get", { value: () => Promise.resolve( user ) } );

					auth
						.authenticateUsing( AuthMethod.BASIC, "username", "password" )
						.then( () => {
							expect( auth.authenticatedUser ).toBe( user );

							done();
						} )
						.catch( done.fail )
					;
				} );

				it( "should return the credentials", ( done:DoneFn ):void => {
					const auth:AuthService = new AuthService( context );

					Object.defineProperty( auth.users, "get", { value: () => Promise.resolve() } );

					auth
						.authenticateUsing( AuthMethod.BASIC, "username", "password" )
						.then( ( credentials ) => {
							expect( credentials ).toEqual( jasmine.any( BasicCredentials ) );
							expect( credentials.username ).toBe( "username" );
							expect( credentials.password ).toBe( "password" );

							done();
						} )
						.catch( done.fail )
					;
				} );

			} );

			describe( "When TOKEN method and username/password", ():void => {

				it( "should authenticate with the TokenAuthenticator", ( done:DoneFn ):void => {
					const spy:jasmine.Spy = spyOn( TokenAuthenticator.prototype, "authenticate" )
						.and.returnValue( Promise.reject( null ) );

					const auth:AuthService = new AuthService( context );
					auth
						.authenticateUsing( AuthMethod.TOKEN, "username", "password" )
						.then( () => {
							done.fail( "Should not resolve" );
						} )
						.catch( error => {
							if( error ) done.fail( error );

							const token:BasicToken = new BasicToken( "username", "password" );
							expect( spy ).toHaveBeenCalledWith( token );

							done();
						} )
					;
				} );

				it( "should return the credentials", ( done:DoneFn ):void => {
					const credentials:TokenCredentials.Class = Resource.createFrom( {
						key: "token-value",
						expirationTime: new Date( Date.now() + 24 * 60 * 60 * 100 ),
						user: PersistedUser.decorate( {
							_resolved: true,
							_etag: "\"1-123445\"",
							name: "My User Name",
						}, context.documents ),
					} );

					spyOn( TokenAuthenticator.prototype, "authenticate" )
						.and.returnValue( Promise.resolve( credentials ) );

					const auth:AuthService = new AuthService( context );
					auth
						.authenticateUsing( AuthMethod.TOKEN, "username", "password" )
						.then( ( returned ) => {
							expect( returned ).toBe( credentials );

							done();
						} )
						.catch( done.fail )
					;
				} );

				it( "should get authenticated user when no valid user in credentials", ( done:DoneFn ):void => {
					const credentials:TokenCredentials.Class = Resource.createFrom( {
						key: "token-value",
						expirationTime: new Date( Date.now() + 24 * 60 * 60 * 100 ),
					} );

					spyOn( TokenAuthenticator.prototype, "authenticate" )
						.and.returnValue( Promise.resolve( credentials ) );
					spyOn( TokenAuthenticator.prototype, "addAuthentication" )
						.and.returnValue( null );

					const auth:AuthService = new AuthService( context );

					const spy:jasmine.Spy = jasmine.createSpy( "get" )
						.and.returnValue( Promise.reject( null ) );
					Object.defineProperty( auth.users, "get", { value: spy } );


					auth
						.authenticateUsing( AuthMethod.TOKEN, "username", "password" )
						.then( () => {
							done.fail( "Should not resolve" );
						} )
						.catch( ( error ) => {
							if( error ) done.fail( error );

							expect( spy ).toHaveBeenCalledWith( "me/", jasmine.any( Object ) );

							done();
						} )
					;
				} );

				it( "should store authenticated user", ( done:DoneFn ):void => {
					const credentials:TokenCredentials.Class = Resource.createFrom( {
						key: "token-value",
						expirationTime: new Date( Date.now() + 24 * 60 * 60 * 100 ),
					} );

					spyOn( TokenAuthenticator.prototype, "authenticate" )
						.and.returnValue( Promise.resolve( credentials ) );
					spyOn( TokenAuthenticator.prototype, "addAuthentication" )
						.and.returnValue( null );

					const auth:AuthService = new AuthService( context );


					const user:PersistedUser = PersistedUser.decorate(
						context.documents.getPointer( "https://example.com/users/a-user/" ),
						context.documents
					);
					Object.defineProperty( auth.users, "get", { value: () => Promise.resolve( user ) } );

					auth
						.authenticateUsing( AuthMethod.TOKEN, "username", "password" )
						.then( () => {
							expect( auth.authenticatedUser ).toBe( user );

							done();
						} )
						.catch( done.fail )
					;
				} );

			} );

			describe( "When TOKEN method and credentials", ():void => {

				it( "should reject when invalid token credentials", ( done:DoneFn ):void => {
					const auth:AuthService = new AuthService( context );
					auth
						.authenticateUsing( AuthMethod.TOKEN, {} as any )
						.then( () => {
							done.fail( "Should not resolve" );
						} )
						.catch( error => {
							expect( () => { throw error; } ).toThrowError( Errors.IllegalArgumentError, "The token credentials provided in not valid." );

							done();
						} )
					;
				} );

				it( "should authenticate with the TokenAuthenticator", ( done:DoneFn ):void => {
					const spy:jasmine.Spy = spyOn( TokenAuthenticator.prototype, "authenticate" )
						.and.returnValue( Promise.reject( null ) );

					const credentials:TokenCredentials.Class = Resource.createFrom( {
						key: "token-value",
						expirationTime: new Date( Date.now() + 24 * 60 * 60 * 100 ),
						user: PersistedUser.decorate( {
							_resolved: true,
							_eTag: "\"1-123445\"",
							name: "My User Name",
						}, context.documents ),
					} );

					const auth:AuthService = new AuthService( context );
					auth
						.authenticateUsing( AuthMethod.TOKEN, credentials )
						.then( () => {
							done.fail( "Should not resolve" );
						} )
						.catch( error => {
							if( error ) done.fail( error );

							expect( spy ).toHaveBeenCalledWith( credentials );

							done();
						} )
					;
				} );

				it( "should return the credentials", ( done:DoneFn ):void => {
					const credentials:TokenCredentials.Class = Resource.createFrom( {
						key: "token-value",
						expirationTime: new Date( Date.now() + 24 * 60 * 60 * 100 ),
						user: PersistedUser.decorate( {
							_resolved: true,
							_etag: "\"1-123445\"",
							name: "My User Name",
						}, context.documents ),
					} );

					const auth:AuthService = new AuthService( context );
					auth
						.authenticateUsing( AuthMethod.TOKEN, credentials )
						.then( ( returned ) => {
							expect( returned ).toBe( credentials );

							done();
						} )
						.catch( done.fail )
					;
				} );

				it( "should store authenticated user", ( done:DoneFn ):void => {
					const credentials:TokenCredentials.Class = Resource.createFrom( {
						key: "token-value",
						expirationTime: new Date( Date.now() + 24 * 60 * 60 * 100 ),
						user: PersistedUser.decorate(
							context.documents.getPointer( "https://example.com/users/a-user/" ),
							context.documents
						),
					} );

					spyOn( TokenAuthenticator.prototype, "authenticate" )
						.and.returnValue( Promise.resolve( credentials ) );
					spyOn( TokenAuthenticator.prototype, "addAuthentication" )
						.and.returnValue( null );

					const auth:AuthService = new AuthService( context );

					auth
						.authenticateUsing( AuthMethod.TOKEN, credentials )
						.then( () => {
							expect( auth.authenticatedUser ).toBe( credentials.user );

							done();
						} )
						.catch( done.fail )
					;
				} );

				it( "should get authenticated user when no valid user in credentials", ( done:DoneFn ):void => {
					const credentials:TokenCredentials.Class = Resource.createFrom( {
						key: "token-value",
						expirationTime: new Date( Date.now() + 24 * 60 * 60 * 100 ),
					} );

					spyOn( TokenAuthenticator.prototype, "addAuthentication" )
						.and.returnValue( null );

					const auth:AuthService = new AuthService( context );

					const spy:jasmine.Spy = jasmine.createSpy( "get" )
						.and.returnValue( Promise.reject( null ) );
					Object.defineProperty( auth.users, "get", { value: spy } );


					auth
						.authenticateUsing( AuthMethod.TOKEN, credentials )
						.then( () => {
							done.fail( "Should not resolve" );
						} )
						.catch( ( error ) => {
							if( error ) done.fail( error );

							expect( spy ).toHaveBeenCalledWith( "me/", jasmine.any( Object ) );

							done();
						} );
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
			(():void => {
				let auth:AuthService = new AuthService( context );

				expect( auth.addAuthentication ).toBeDefined();
				expect( Utils.isFunction( auth.addAuthentication ) ).toBe( true );
			})();

			// Neither current nor parent authenticated
			(():void => {
				const mockAuthSpy:jasmine.SpyObj<AuthService> = jasmine
					.createSpyObj( "AuthService", [ "addAuthentication" ] );
				context.auth = mockAuthSpy;

				let subContext:Context = createMockContext( { parentContext: context } );
				let auth:AuthService = new AuthService( subContext );

				let options:RequestOptions & { parentAuth?:string } = {};

				auth.addAuthentication( options );
				expect( mockAuthSpy.addAuthentication ).toHaveBeenCalledWith( options );
			})();

			// Current not authenticated but parent is
			(():void => {
				const mockAuthSpy:jasmine.SpyObj<AuthService> = jasmine
					.createSpyObj( "AuthService", [ "addAuthentication" ] );
				context.auth = mockAuthSpy;

				let subContext:Context = createMockContext( { parentContext: context } );
				let auth:AuthService = new AuthService( subContext );

				let options:RequestOptions & { parentAuth?:string } = {};

				auth.addAuthentication( options );
				expect( mockAuthSpy.addAuthentication ).toHaveBeenCalledWith( options );
			})();

			// Current and parent authenticated
			(():void => {
				const mockAuthSpy:jasmine.SpyObj<AuthService> = jasmine
					.createSpyObj( "AuthService", [ "addAuthentication" ] );
				context.auth = mockAuthSpy;

				let subContext:Context = createMockContext( { parentContext: context } );
				let auth:AuthService = new AuthService( subContext );

				(<any> auth).authenticator = {
					isAuthenticated: ():boolean => true, addAuthentication: ( mockOptions:any ):void => {
						mockOptions[ "currentAuth" ] = "is authenticated";
					},
				};

				let options:RequestOptions & { currentAuth?:string } = {};

				auth.addAuthentication( options );
				expect( mockAuthSpy.addAuthentication ).not.toHaveBeenCalled();
				expect( options ).toEqual( { currentAuth: "is authenticated" } );
			})();

			// Current authenticated but parent not
			(():void => {
				const parentAuth:AuthService = new AuthService( context );
				let spyParent:jasmine.Spy = spyOn( parentAuth, "addAuthentication" ).and.callFake( mockOptions => {
					mockOptions[ "parentAuth" ] = "no authenticated";
				} );

				let subContext:Context = createMockContext( { parentContext: context } );
				let auth:AuthService = new AuthService( subContext );
				(<any> auth).authenticator = {
					isAuthenticated: ():boolean => true, addAuthentication: ( mockOptions:any ):void => {
						mockOptions[ "currentAuth" ] = "is authenticated";
					},
				};

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
			(():void => {
				let auth:AuthService = new AuthService( context );

				expect( auth.clearAuthentication ).toBeDefined();
				expect( Utils.isFunction( auth.clearAuthentication ) ).toBe( true );
			})();

			// The module isn't authenticated
			(():void => {
				let auth:AuthService = new AuthService( context );

				auth.clearAuthentication();
				expect( (<any> auth).authenticator ).toBeFalsy();
			})();

			// The module is authenticated
			(():void => {
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

		describe( method( INSTANCE, "createTicket" ), ():void => {

			it( hasSignature(
				"Retrieves an authentication ticket for the URI specified.", [
					{ name: "uri", type: "string", description: "The URI to get an authentication ticket for." },
					{ name: "requestOptions", type: "CarbonLDP.HTTP.RequestOptions", optional: true },
				],
				{ type: "Promise<[ CarbonLDP.Auth.Ticket.Class, CarbonLDP.HTTP.Response ]>" }
			), ():void => {} );

			it( "should exists", ():void => {
				expect( AuthService.prototype.createTicket ).toBeDefined();
				expect( AuthService.prototype.createTicket ).toEqual( jasmine.any( Function ) );
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

				const auth:AuthService = new AuthService( context );
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

				const auth:AuthService = new AuthService( context );
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

				const auth:AuthService = new AuthService( context );
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

				const auth:AuthService = new AuthService( context );
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
				expect( AuthService.prototype.getAuthenticatedURL ).toBeDefined();
				expect( AuthService.prototype.getAuthenticatedURL ).toEqual( jasmine.any( Function ) );
			} );

			it( "should call to createTicket", ( done:DoneFn ):void => {
				const auth:AuthService = new AuthService( context );

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
				const auth:AuthService = new AuthService( context );

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
				const auth:AuthService = new AuthService( context );

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

} );
