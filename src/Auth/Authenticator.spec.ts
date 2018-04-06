import { AbstractContext } from "../AbstractContext";
import { Context } from "../Context";
import { IllegalStateError } from "../Errors";
import {
	Header,
	RequestOptions,
} from "../HTTP";
import { ContextSettings } from "../Settings";

import {
	clazz,
	constructor,
	hasSignature,
	INSTANCE,
	method,
	module,
} from "../test/JasmineExtender";
import {
	C,
	CS,
} from "../Vocabularies";

import { Authenticator } from "./Authenticator";

import * as PersistedUser from "./PersistedUser";

describe( module( "carbonldp/Auth/Authenticator" ), ():void => {

	describe( clazz(
		"CarbonLDP.Auth.Authenticator",
		[
			"T extends object",
			"W extends object",
		],
		"Abstract class that represents the base of an authentication token."
	), ():void => {

		it( "should exists", ():void => {
			expect( Authenticator ).toBeDefined();
			expect( Authenticator ).toEqual( jasmine.any( Function ) );
		} );


		function createMockAuthenticator( data?:{ credentials?:object, header?:string, user?:PersistedUser.Class } ):Authenticator<object, object> {
			return new class extends Authenticator<object, object> {

				protected credentials:object = data && data.credentials;
				protected authenticatedUser:PersistedUser.Class = data && data.user;

				authenticate():Promise<object> {
					throw new Error( "Method not implemented." );
				}

				protected _getHeaderValue():string {
					return data && data.header;
				}

			}( context );
		}

		let context:Context;
		beforeEach( ():void => {
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
		} );

		describe( constructor(), ():void => {

			it( hasSignature( [
				{ name: "context", type: "CarbonLDP.Context" },
			] ), ():void => {} );

			it( "should be extensible", ():void => {
				const authenticator:Authenticator<object, object> = createMockAuthenticator();

				expect( authenticator ).toBeDefined();
				expect( authenticator ).toEqual( jasmine.any( Authenticator ) );
			} );

		} );

		describe( method( INSTANCE, "isAuthenticated" ), ():void => {

			it( hasSignature(
				"Returns if its authenticated by checking the stored credentials within.",
				{ type: "boolean", description: "Boolean that indicates if the authenticator is authenticated or not." }
			), ():void => {} );

			it( "should exists", ():void => {
				expect( Authenticator.prototype.isAuthenticated ).toBeDefined();
				expect( Authenticator.prototype.isAuthenticated ).toEqual( jasmine.any( Function ) );
			} );

			it( "should return false when no credentials", ():void => {
				const authenticator:Authenticator<object, object> = createMockAuthenticator();
				expect( authenticator.isAuthenticated() ).toBe( false );
			} );

			it( "should return false when null credentials", ():void => {
				const authenticator:Authenticator<object, object> = createMockAuthenticator( { credentials: null } );
				expect( authenticator.isAuthenticated() ).toBe( false );
			} );

			it( "should return true when credentials an object", ():void => {
				const authenticator:Authenticator<object, object> = createMockAuthenticator( { credentials: {} } );
				expect( authenticator.isAuthenticated() ).toBe( true );
			} );

		} );

		describe( method( INSTANCE, "authenticate" ), ():void => {

			it( hasSignature(
				"Abstract method that should perform an authentication and store the credentials for future use.", [
					{ name: "authenticationToken", type: "T", description: "The token that will be used to perform the authentication." },
				],
				{ type: "W", description: "Promise that contains the authentication credentials if the request is successful." }
			), ():void => {} );

		} );

		describe( method( INSTANCE, "clearAuthentication" ), ():void => {

			it( hasSignature(
				"Removes the stored credentials of any."
			), ():void => {} );

			it( "should exists", ():void => {
				expect( Authenticator.prototype.clearAuthentication ).toBeDefined();
				expect( Authenticator.prototype.clearAuthentication ).toEqual( jasmine.any( Function ) );
			} );

			it( "should clear when existing", ():void => {
				const authenticator:Authenticator<object, object> = createMockAuthenticator( { credentials: {} } );

				authenticator.clearAuthentication();
				expect( authenticator.isAuthenticated() ).toBe( false );
			} );

			it( "should clear when non existing", ():void => {
				const authenticator:Authenticator<object, object> = createMockAuthenticator();

				authenticator.clearAuthentication();
				expect( authenticator.isAuthenticated() ).toBe( false );
			} );

		} );

		describe( method( INSTANCE, "addAuthentication" ), ():void => {

			it( hasSignature(
				"If the authenticator is authenticated, it adds an authentication header in the request options object provided.", [
					{ name: "requestOptions", type: "CarbonLDP.HTTP.RequestOptions", description: "The request options object where to add the authentication header." },
				],
				{ type: "CarbonLDP.HTTP.RequestOptions", description: "The request options object provided after adding the authentication header." }
			), ():void => {} );

			it( "should exists", ():void => {
				expect( Authenticator.prototype.addAuthentication ).toBeDefined();
				expect( Authenticator.prototype.addAuthentication ).toEqual( jasmine.any( Function ) );
			} );

			it( "should throw error if no authenticated", ():void => {
				const authenticator:Authenticator<object, object> = createMockAuthenticator();
				expect( () => authenticator.addAuthentication( {} ) ).toThrowError( IllegalStateError, "The authenticator isn't authenticated." );
			} );

			it( "should options provided must be the same returned", ():void => {
				const authenticator:Authenticator<object, object> = createMockAuthenticator( { credentials: {} } );

				const options:RequestOptions = {};
				const returned:RequestOptions = authenticator.addAuthentication( options );

				expect( returned ).toBe( options );
			} );

			it( "should create headers map if not defined", ():void => {
				const authenticator:Authenticator<object, object> = createMockAuthenticator( { credentials: {} } );

				const options:RequestOptions = {};
				authenticator.addAuthentication( options );

				expect( options.headers ).toEqual( jasmine.any( Map ) );
			} );

			it( "should create not replace headers map if defined", ():void => {
				const authenticator:Authenticator<object, object> = createMockAuthenticator( { credentials: {} } );

				const headers:RequestOptions[ "headers" ] = new Map();
				const options:RequestOptions = { headers };
				authenticator.addAuthentication( options );

				expect( options.headers ).toBe( headers );
			} );

			it( "should not alter if authorization header exists", ():void => {
				const authenticator:Authenticator<object, object> = createMockAuthenticator( { credentials: {} } );

				const headers:RequestOptions[ "headers" ] = new Map( [
					[ "authorization", new Header() ],
				] );

				const options:RequestOptions = { headers };
				authenticator.addAuthentication( options );

				expect( options.headers ).toEqual( new Map( [
					[ "authorization", new Header() ],
				] ) );
			} );

			it( "should call and add the header value `createHeaderValue`", ():void => {
				const authenticator:Authenticator<object, object> = createMockAuthenticator( { credentials: {} } );

				const spy:jasmine.Spy = spyOn( authenticator, "_getHeaderValue" as any )
					.and.returnValue( "value" );

				const options:RequestOptions = {};
				authenticator.addAuthentication( options );

				expect( spy ).toHaveBeenCalled();
				expect( options.headers ).toEqual( new Map( [
					[ "authorization", new Header( [ "value" ] ) ],
				] ) );
			} );

		} );

		describe( method( INSTANCE, "getAuthenticatedUser" ), ():void => {

			it( hasSignature(
				"If the authenticator is authenticated, request the authenticated user using the st credentials.", [
					{ name: "requestOptions", type: "CarbonLDP.HTTP.GETOptions", description: "The request options object where to add the authentication header." },
				],
				{ type: "CarbonLDP.Auth.PersistedUser" }
			), ():void => {} );

			beforeEach( ():void => {
				jasmine.Ajax.install();

				jasmine.Ajax.stubRequest( "https://example.com/users/me/" ).andReturn( {
					status: 200,
					responseHeaders: {
						"eTag": `"1-12345"`,
					},
					responseText: `{
						"@id": "https://example.com/users/me/",
						"@graph": [
							{
								"@id": "https://example.com/users/me/",
								"@type": [
									"${ C.Document }",
									"${ CS.AuthenticatedUserInformationAccessor }"
								],
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
					}`,
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

			afterEach( ():void => {
				jasmine.Ajax.uninstall();
			} );


			it( "should exists", ():void => {
				expect( Authenticator.prototype.getAuthenticatedUser ).toBeDefined();
				expect( Authenticator.prototype.getAuthenticatedUser ).toEqual( jasmine.any( Function ) );
			} );

			it( "should throw error if authenticator not authenticated", ( done:DoneFn ):void => {
				const authenticator:Authenticator<object, object> = createMockAuthenticator();

				authenticator
					.getAuthenticatedUser()
					.then( () => done.fail( "Should not resolve" ) )
					.catch( ( error ) => {
						expect( () => { throw error; } ).toThrowError( IllegalStateError, "The authenticator isn't authenticated." );
						done();
					} );
			} );


			it( "should retrieve the user", ( done:DoneFn ):void => {
				const authenticator:Authenticator<object, object> = createMockAuthenticator( { credentials: {} } );
				authenticator
					.getAuthenticatedUser()
					.then( user => {
						expect( user ).toEqual( jasmine.objectContaining( {
							types: jasmine.arrayContaining( [ CS.User ] ) as any as string[],
							name: "The user name",
						} ) );

						done();
					} )
					.catch( done.fail );
			} );

			it( "should send `authorization` header in request", ( done:DoneFn ):void => {
				const authenticator:Authenticator<any, any> = createMockAuthenticator( { credentials: {}, header: "the-header-value" } );
				authenticator
					.getAuthenticatedUser()
					.then( () => {
						const count:number = jasmine.Ajax.requests.count();
						for( let i:number = 0; i < count; ++ i ) {
							const request:JasmineAjaxRequest = jasmine.Ajax.requests.at( i );
							expect( request.requestHeaders ).toEqual( jasmine.objectContaining( {
								"authorization": "the-header-value",
							} ) );
						}

						done();
					} )
					.catch( done.fail );
			} );

			it( "should retrieve user if already exists in the authenticator", ( done:DoneFn ):void => {
				const mockUser:PersistedUser.Class = { the: "user" } as any;
				const authenticator:Authenticator<any, any> = createMockAuthenticator( { credentials: {}, header: "the-header-value", user: mockUser } );

				authenticator
					.getAuthenticatedUser()
					.then( ( user ) => {
						expect( user ).toBe( mockUser );

						done();
					} )
					.catch( done.fail );
			} );

			it( "should send `authorization` header from the request options", ( done:DoneFn ):void => {
				const authenticator:Authenticator<any, any> = createMockAuthenticator( { credentials: {}, header: "the-header-value" } );

				const options:RequestOptions = {
					headers: new Map<string, Header>( [
						[ "authorization", new Header( "existing-authorization" ) ],
					] ),
				};

				authenticator
					.getAuthenticatedUser( options )
					.then( () => {
						const count:number = jasmine.Ajax.requests.count();
						for( let i:number = 0; i < count; ++ i ) {
							const request:JasmineAjaxRequest = jasmine.Ajax.requests.at( i );
							expect( request.requestHeaders ).toEqual( jasmine.objectContaining( {
								"authorization": "existing-authorization",
							} ) );
						}

						done();
					} )
					.catch( done.fail );
			} );

		} );

	} );

} );
