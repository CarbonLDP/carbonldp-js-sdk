import { IllegalArgumentError } from "../Errors";
import { Header } from "../HTTP/Header";
import { RequestOptions } from "../HTTP/Request";
import { Resource } from "../Resource";
import { ContextSettings } from "../Settings";
import {
	clazz,
	hasSignature,
	INSTANCE,
	isDefined,
	method,
	module,
} from "../test/JasmineExtender";
import { C } from "../Vocabularies/C";
import { CS } from "../Vocabularies/CS";
import { XSD } from "../Vocabularies/XSD";
import { AbstractContext } from "./../AbstractContext";
import * as Utils from "./../Utils";

import { TokenAuthenticator } from "./TokenAuthenticator";

import {
	TokenCredentials,
	TokenCredentialsBase
} from "./TokenCredentials";
import { UsernameAndPasswordToken } from "./UsernameAndPasswordToken";

describe( module( "carbonldp/Auth/TokenAuthenticator" ), ():void => {

	describe( clazz(
		"CarbonLDP.Auth.TokenAuthenticator",
		"Authenticates requests using JSON Web TokenCredentials (JWT) Authentication.",
		[
			"CarbonLDP.Auth.Authenticator<CarbonLDP.Auth.UsernameAndPasswordToken, CarbonLDP.Auth.TokenCredentials>",
		]
	), ():void => {

		let context:AbstractContext;
		beforeEach( function():void {
			jasmine.Ajax.install();

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

		afterEach( function():void {
			jasmine.Ajax.uninstall();
		} );

		function createAuthenticatorWith( credentials?:TokenCredentials ):TokenAuthenticator {
			return new class extends TokenAuthenticator {
				constructor() {
					super( context );
					if( credentials ) this.credentials = credentials;
				}
			};
		}


		it( isDefined(), ():void => {
			expect( TokenAuthenticator ).toBeDefined();
			expect( Utils.isFunction( TokenAuthenticator ) ).toEqual( true );
		} );

		describe( method( INSTANCE, "isAuthenticated" ), ():void => {

			it( hasSignature(
				"Returns true if the instance contains stored credentials.",
				{ type: "boolean" }
			), ():void => {} );

			it( "should exists", ():void => {
				expect( TokenAuthenticator.prototype.isAuthenticated ).toBeDefined();
				expect( TokenAuthenticator.prototype.isAuthenticated ).toEqual( jasmine.any( Function ) );
			} );

			it( "should return false when no credentials", ():void => {
				const authenticator:TokenAuthenticator = createAuthenticatorWith();
				expect( authenticator.isAuthenticated() ).toBe( false );
			} );

			it( "should return false when null credentials", ():void => {
				const authenticator:TokenAuthenticator = createAuthenticatorWith( null );
				expect( authenticator.isAuthenticated() ).toBe( false );
			} );

			it( "should return true when not expired credentials", ():void => {
				const expiresOn:Date = new Date();
				expiresOn.setDate( expiresOn.getDate() + 1 );

				const credentials:TokenCredentials = Resource.createFrom( {
					token: "token-value",
					expiresOn,
				} );

				const authenticator:TokenAuthenticator = createAuthenticatorWith( credentials );
				expect( authenticator.isAuthenticated() ).toBe( true );
			} );

			it( "should return true when expired credentials with by current time", ():void => {
				const expiresOn:Date = new Date();
				const credentials:TokenCredentials = Resource.createFrom( {
					token: "token-value",
					expiresOn,
				} );

				const authenticator:TokenAuthenticator = createAuthenticatorWith( credentials );
				expect( authenticator.isAuthenticated() ).toBe( false );
			} );

			it( "should return true when expired credentials with by one day", ():void => {
				const expiresOn:Date = new Date();
				expiresOn.setDate( expiresOn.getDate() - 1 );

				const credentials:TokenCredentials = Resource.createFrom( {
					token: "token-value",
					expiresOn,
				} );

				const authenticator:TokenAuthenticator = createAuthenticatorWith( credentials );
				expect( authenticator.isAuthenticated() ).toBe( false );
			} );

		} );

		describe( method( INSTANCE, "authenticate" ), ():void => {

			let expiresOn:Date;
			beforeEach( ():void => {
				expiresOn = new Date( Date.now() + 24 * 60 * 60 * 1000 );

				jasmine.Ajax.stubRequest( "https://example.com/users/me/" ).andReturn( {
					status: 200,
					responseHeaders: {
						"eTag": `"1-12345"`,
						"Preference-Applied": `${ CS.PreferAuthToken }`,
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
							"@value": "${ expiresOn.toISOString() }",
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

			it( hasSignature(
				"When a token is provided credentials will be requested, in other case the credentials provided will be validated and stored.",
				[
					{ name: "tokenOrCredentials", type: "CarbonLDP.Auth.UsernameAndPasswordToken | CarbonLDP.Auth.TokenCredentialsBase" },
				],
				{ type: "Promise<CarbonLDP.Auth.TokenCredentials>" }
			), ():void => {} );

			it( "should exists", ():void => {
				expect( TokenAuthenticator.prototype.authenticate ).toBeDefined();
				expect( TokenAuthenticator.prototype.authenticate ).toEqual( jasmine.any( Function ) );
			} );

			it( "should return credentials when authentication token", ( done:DoneFn ):void => {
				const authenticator:TokenAuthenticator = new TokenAuthenticator( context );
				authenticator
					.authenticate( new UsernameAndPasswordToken( "user", "pass" ) )
					.then( ( token:TokenCredentials ):void => {
						expect( token ).toBeDefined();
						expect( token ).toEqual( jasmine.objectContaining( {
							types: jasmine.arrayContaining( [ CS.TokenCredentials ] ) as any as string[],
							token: "token-key",
							expiresOn,
						} ) );

						done();
					} )
					.catch( done.fail );
			} );

			it( "should set authenticated when authentication token", ( done:DoneFn ):void => {
				const authenticator:TokenAuthenticator = new TokenAuthenticator( context );
				authenticator
					.authenticate( new UsernameAndPasswordToken( "user", "pass" ) )
					.then( ():void => {
						expect( authenticator.isAuthenticated() ).toEqual( true );

						done();
					} )
					.catch( done.fail );
			} );

			it( "should call _parseErrorResponse when request error", ( done:DoneFn ):void => {
				jasmine.Ajax.stubRequest( "https://example.com/users/me/" ).andReturn( {
					status: 500,
					responseText: "",
				} );

				const expectedError:Error = new Error( "Error message" );
				const spy:jasmine.Spy = spyOn( context.documents, "_parseErrorResponse" )
					.and.callFake( () => Promise.reject( expectedError ) );

				const authenticator:TokenAuthenticator = new TokenAuthenticator( context );
				authenticator
					.authenticate( new UsernameAndPasswordToken( "user", "pass" ) )
					.then( () => done.fail( "Should not resolve" ) )
					.catch( error => {
						expect( spy ).toHaveBeenCalled();

						expect( error ).toBeDefined();
						expect( error ).toBe( expectedError );

						done();
					} )
				;
			} );


			it( "should return same credentials when valid token credentials", ( done:DoneFn ):void => {
				const credentials:TokenCredentials = TokenCredentials.createFrom( {
					token: "token-value",
					expiresOn,
				} );

				const authenticator:TokenAuthenticator = new TokenAuthenticator( context );
				authenticator
					.authenticate( credentials )
					.then( ( tokenCredentials:TokenCredentials ):void => {
						expect( tokenCredentials ).toBeDefined();
						expect( tokenCredentials ).toBe( credentials );

						done();
					} )
					.catch( done.fail )
				;
			} );

			it( "should set authenticated when valid token credentials", ( done:DoneFn ):void => {
				const credentials:TokenCredentials = TokenCredentials.createFrom( {
					token: "token-value",
					expiresOn,
				} );

				const authenticator:TokenAuthenticator = new TokenAuthenticator( context );
				authenticator
					.authenticate( credentials )
					.then( ():void => {
						expect( authenticator.isAuthenticated() ).toBe( true );

						done();
					} )
					.catch( done.fail )
				;
			} );

			it( "should throw error when invalid expiration date", ( done:DoneFn ):void => {
				const credentials:TokenCredentials = TokenCredentials.createFrom( {
					token: "token-value",
					expiresOn: new Date( Date.now() - 24 * 60 * 60 * 1000 ),
				} );

				const authenticator:TokenAuthenticator = new TokenAuthenticator( context );
				authenticator
					.authenticate( credentials )
					.then( ():void => {
						done.fail( "Should not resolve." );
					} )
					.catch( error => {
						expect( () => { throw error; } ).toThrowError( IllegalArgumentError, "The token has already expired." );

						done();
					} )
				;
			} );

			it( "should not authenticate when invalid expiration date", ( done:DoneFn ):void => {
				const credentials:TokenCredentials = TokenCredentials.createFrom( {
					token: "token-value",
					expiresOn: new Date( Date.now() - 24 * 60 * 60 * 1000 ),
				} );

				const authenticator:TokenAuthenticator = new TokenAuthenticator( context );
				authenticator
					.authenticate( credentials )
					.then( ():void => {
						done.fail( "Should not resolve." );
					} )
					.catch( () => {
						expect( authenticator.isAuthenticated() ).toBe( false );

						done();
					} )
				;
			} );


			it( "should return credentials when token credentials base", ( done:DoneFn ):void => {
				const credentials:TokenCredentialsBase = { token: "token-value", expiresOn };

				const authenticator:TokenAuthenticator = new TokenAuthenticator( context );
				authenticator
					.authenticate( credentials )
					.then( ( tokenCredentials:TokenCredentials ):void => {
						expect( tokenCredentials ).toBeDefined();
						expect( credentials ).toBe( tokenCredentials );

						done();
					} )
					.catch( done.fail )
				;
			} );

			it( "should parse expiration date if string in token credentials base", ( done:DoneFn ):void => {
				const credentials:TokenCredentialsBase = { token: "token-value", expiresOn: expiresOn.toISOString() };

				const authenticator:TokenAuthenticator = new TokenAuthenticator( context );
				authenticator
					.authenticate( credentials )
					.then( ( tokenCredentials:TokenCredentials ):void => {
						expect( tokenCredentials ).toBeDefined();

						expect( tokenCredentials.expiresOn ).toEqual( jasmine.any( Date ) );
						expect( tokenCredentials.expiresOn ).toEqual( new Date( credentials.expiresOn as string ) );

						done();
					} )
					.catch( done.fail )
				;
			} );

		} );

		describe( "TokenAuthenticator.addAuthentication", ():void => {

			it( "should add the header value", ():void => {
				const expiresOn:Date = new Date();
				expiresOn.setDate( expiresOn.getDate() + 1 );

				const credentials:TokenCredentials = Resource.createFrom( {
					token: "token-value",
					expiresOn,
				} );

				const authenticator:TokenAuthenticator = createAuthenticatorWith( credentials );

				const options:RequestOptions = {};
				authenticator.addAuthentication( options );

				expect( options.headers ).toEqual( new Map( [
					[ "authorization", new Header( [ "Token token-value" ] ), ],
				] ) );
			} );

		} );

	} );

} );
