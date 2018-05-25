import { anyThatMatches } from "../../test/helpers/jasmine/equalities";
import { createMockAuthenticator } from "../../test/helpers/mocks";
import { CarbonLDP } from "../CarbonLDP";
import { IllegalStateError } from "../Errors";
import {
	Header,
	RequestOptions,
} from "../HTTP";
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

import { AbstractAuthenticator } from "./AbstractAuthenticator";

import { User } from "./User";

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
			expect( AbstractAuthenticator ).toBeDefined();
			expect( AbstractAuthenticator ).toEqual( jasmine.any( Function ) );
		} );

		let context:CarbonLDP;
		beforeEach( ():void => {
			context = new CarbonLDP( "https://example.com/" );
		} );

		describe( constructor(), ():void => {

			it( hasSignature( [
				{ name: "context", type: "CarbonLDP.Context" },
			] ), ():void => {} );

			it( "should be extensible", ():void => {
				const authenticator:AbstractAuthenticator<object, object> = createMockAuthenticator( { context } );

				expect( authenticator ).toBeDefined();
				expect( authenticator ).toEqual( jasmine.any( AbstractAuthenticator ) );
			} );

		} );

		describe( method( INSTANCE, "isAuthenticated" ), ():void => {

			it( hasSignature(
				"Returns if its authenticated by checking the stored credentials within.",
				{ type: "boolean", description: "Boolean that indicates if the authenticator is authenticated or not." }
			), ():void => {} );

			it( "should exists", ():void => {
				expect( AbstractAuthenticator.prototype.isAuthenticated ).toBeDefined();
				expect( AbstractAuthenticator.prototype.isAuthenticated ).toEqual( jasmine.any( Function ) );
			} );

			it( "should return false when no credentials", ():void => {
				const authenticator:AbstractAuthenticator<object, object> = createMockAuthenticator( { context } );
				expect( authenticator.isAuthenticated() ).toBe( false );
			} );

			it( "should return false when null credentials", ():void => {
				const authenticator:AbstractAuthenticator<object, object> = createMockAuthenticator( { context, credentials: null } );
				expect( authenticator.isAuthenticated() ).toBe( false );
			} );

			it( "should return true when credentials an object", ():void => {
				const authenticator:AbstractAuthenticator<object, object> = createMockAuthenticator( { context, credentials: {} } );
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
				expect( AbstractAuthenticator.prototype.clearAuthentication ).toBeDefined();
				expect( AbstractAuthenticator.prototype.clearAuthentication ).toEqual( jasmine.any( Function ) );
			} );

			it( "should clear when existing", ():void => {
				const authenticator:AbstractAuthenticator<object, object> = createMockAuthenticator( { context, credentials: {} } );

				authenticator.clearAuthentication();
				expect( authenticator.isAuthenticated() ).toBe( false );
			} );

			it( "should clear when non existing", ():void => {
				const authenticator:AbstractAuthenticator<object, object> = createMockAuthenticator( { context } );

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
				expect( AbstractAuthenticator.prototype.addAuthentication ).toBeDefined();
				expect( AbstractAuthenticator.prototype.addAuthentication ).toEqual( jasmine.any( Function ) );
			} );

			it( "should throw error if no authenticated", ():void => {
				const authenticator:AbstractAuthenticator<object, object> = createMockAuthenticator( { context } );
				expect( () => authenticator.addAuthentication( {} ) ).toThrowError( IllegalStateError, "The authenticator isn't authenticated." );
			} );

			it( "should options provided must be the same returned", ():void => {
				const authenticator:AbstractAuthenticator<object, object> = createMockAuthenticator( { context, credentials: {} } );

				const options:RequestOptions = {};
				const returned:RequestOptions = authenticator.addAuthentication( options );

				expect( returned ).toBe( options );
			} );

			it( "should create headers map if not defined", ():void => {
				const authenticator:AbstractAuthenticator<object, object> = createMockAuthenticator( { context, credentials: {} } );

				const options:RequestOptions = {};
				authenticator.addAuthentication( options );

				expect( options.headers ).toEqual( jasmine.any( Map ) );
			} );

			it( "should create not replace headers map if defined", ():void => {
				const authenticator:AbstractAuthenticator<object, object> = createMockAuthenticator( { context, credentials: {} } );

				const headers:RequestOptions[ "headers" ] = new Map();
				const options:RequestOptions = { headers };
				authenticator.addAuthentication( options );

				expect( options.headers ).toBe( headers );
			} );

			it( "should not alter if authorization header exists", ():void => {
				const authenticator:AbstractAuthenticator<object, object> = createMockAuthenticator( { context, credentials: {} } );

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
				const authenticator:AbstractAuthenticator<object, object> = createMockAuthenticator( { context, credentials: {} } );

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
				{ type: "CarbonLDP.Auth.User" }
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
			} );

			afterEach( ():void => {
				jasmine.Ajax.uninstall();
			} );


			it( "should exists", ():void => {
				expect( AbstractAuthenticator.prototype.getAuthenticatedUser ).toBeDefined();
				expect( AbstractAuthenticator.prototype.getAuthenticatedUser ).toEqual( jasmine.any( Function ) );
			} );

			it( "should throw error if authenticator not authenticated", ( done:DoneFn ):void => {
				const authenticator:AbstractAuthenticator<object, object> = createMockAuthenticator( { context } );

				authenticator
					.getAuthenticatedUser()
					.then( () => done.fail( "Should not resolve" ) )
					.catch( ( error ) => {
						expect( () => { throw error; } ).toThrowError( IllegalStateError, "The authenticator isn't authenticated." );
						done();
					} );
			} );


			it( "should retrieve the unresolved user", ( done:DoneFn ):void => {
				const authenticator:AbstractAuthenticator<object, object> = createMockAuthenticator( { context, credentials: {} } );
				authenticator
					.getAuthenticatedUser()
					.then( user => {
						expect( user ).toEqual( anyThatMatches( User.is, "User" ) as any );
						expect( user ).toEqual( jasmine.objectContaining( {
							_resolved: false,
							types: jasmine.arrayContaining( [ CS.User ] ) as any as string[],
						} ) );

						done();
					} )
					.catch( done.fail );
			} );

			it( "should send `authorization` header in request", ( done:DoneFn ):void => {
				const authenticator:AbstractAuthenticator<any, any> = createMockAuthenticator( { context, credentials: {}, header: "the-header-value" } );
				authenticator
					.getAuthenticatedUser()
					.then( () => {
						const request:JasmineAjaxRequest = jasmine.Ajax.requests.mostRecent();
						expect( request.requestHeaders ).toEqual( jasmine.objectContaining( {
							"authorization": "the-header-value",
						} ) );

						done();
					} )
					.catch( done.fail );
			} );

			it( "should retrieve user if already exists in the authenticator", ( done:DoneFn ):void => {
				const mockUser:User = { the: "user" } as any;
				const authenticator:AbstractAuthenticator<any, any> = createMockAuthenticator( { context, credentials: {}, header: "the-header-value", user: mockUser } );

				authenticator
					.getAuthenticatedUser()
					.then( ( user ) => {
						expect( user ).toBe( mockUser );

						done();
					} )
					.catch( done.fail );
			} );

			it( "should send `authorization` header from the request options", ( done:DoneFn ):void => {
				const authenticator:AbstractAuthenticator<any, any> = createMockAuthenticator( { context, credentials: {}, header: "the-header-value" } );

				const options:RequestOptions = {
					headers: new Map<string, Header>( [
						[ "authorization", new Header( "existing-authorization" ) ],
					] ),
				};

				authenticator
					.getAuthenticatedUser( options )
					.then( () => {
						const request:JasmineAjaxRequest = jasmine.Ajax.requests.mostRecent();
						expect( request.requestHeaders ).toEqual( jasmine.objectContaining( {
							"authorization": "existing-authorization",
						} ) );

						done();
					} )
					.catch( done.fail );
			} );

		} );

	} );

} );
