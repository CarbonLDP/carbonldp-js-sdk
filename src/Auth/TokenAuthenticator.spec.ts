import * as Errors from "../Errors";
import { Header } from "../HTTP/Header";
import { RequestOptions } from "../HTTP/Request";
import { Resource } from "../Resource";
import { ContextSettings } from "../Settings";
import { C } from "../Vocabularies/C";
import { CS } from "../Vocabularies/CS";
import { VCARD } from "../Vocabularies/VCARD";
import { XSD } from "../Vocabularies/XSD";
import { AbstractContext } from "./../AbstractContext";
import {
	clazz,
	constructor,
	hasDefaultExport,
	hasSignature,
	INSTANCE,
	isDefined,
	method,
	module,
} from "./../test/JasmineExtender";
import * as Utils from "./../Utils";
import * as PersistedUser from "./PersistedUser";

import * as TokenAuthenticator from "./TokenAuthenticator";
import DefaultExport from "./TokenAuthenticator";

import * as TokenCredentials from "./TokenCredentials";
import { UsernameAndPasswordToken } from "./UsernameAndPasswordToken";

describe( module( "carbonldp/Auth/TokenAuthenticator" ), ():void => {

	it( isDefined(), ():void => {
		expect( TokenAuthenticator ).toBeDefined();
		expect( Utils.isObject( TokenAuthenticator ) ).toEqual( true );
	} );

	it( "should have token container constant", () => {
		expect( TokenAuthenticator.TOKEN_CONTAINER ).toBeDefined();
		expect( TokenAuthenticator.TOKEN_CONTAINER ).toBe( "auth-tokens/" );
	} );

	describe( clazz(
		"CarbonLDP.Auth.TokenAuthenticator.Class",
		"Authenticates requests using JSON Web TokenCredentials (JWT) Authentication.",
		[
			"CarbonLDP.Auth.Authenticator<CarbonLDP.Auth.UsernameAndPasswordToken, CarbonLDP.Auth.TokenCredentials.Class>",
		]
	), ():void => {

		let context:AbstractContext;
		beforeEach( function():void {
			jasmine.Ajax.install();
			context = new class extends AbstractContext {
				protected _baseURI:string = "https://example.com/";
				protected settings:ContextSettings = {
					paths: {
						system: {
							slug: ".system/",
							paths: {
								security: "security/",
							},
						},
					},
				};
			};
		} );

		afterEach( function():void {
			jasmine.Ajax.uninstall();
		} );

		function createAuthenticatorWith( credentials?:TokenCredentials.Class ):TokenAuthenticator.Class {
			return new class extends TokenAuthenticator.Class {
				constructor() {
					super( context );
					if( credentials ) this.credentials = credentials;
				}
			};
		}


		it( isDefined(), ():void => {
			expect( TokenAuthenticator.Class ).toBeDefined();
			expect( Utils.isFunction( TokenAuthenticator.Class ) ).toEqual( true );
		} );

		describe( constructor(), ():void => {

			it( hasSignature(
				[
					{ name: "context", type: "CarbonLDP.Context", description: "The context where to authenticate the user." },
				]
			), ():void => {} );

			it( "should be instantiable", ():void => {
				const authenticator:TokenAuthenticator.Class = new TokenAuthenticator.Class( context );

				expect( authenticator ).toEqual( jasmine.any( TokenAuthenticator.Class ) );
			} );

		} );

		describe( method( INSTANCE, "isAuthenticated" ), ():void => {

			it( hasSignature(
				"Returns true if the instance contains stored credentials.",
				{ type: "boolean" }
			), ():void => {} );

			it( "should exists", ():void => {
				expect( TokenAuthenticator.Class.prototype.isAuthenticated ).toBeDefined();
				expect( TokenAuthenticator.Class.prototype.isAuthenticated ).toEqual( jasmine.any( Function ) );
			} );

			it( "should return false when no credentials", ():void => {
				const authenticator:TokenAuthenticator.Class = createAuthenticatorWith();
				expect( authenticator.isAuthenticated() ).toBe( false );
			} );

			it( "should return false when null credentials", ():void => {
				const authenticator:TokenAuthenticator.Class = createAuthenticatorWith( null );
				expect( authenticator.isAuthenticated() ).toBe( false );
			} );

			it( "should return true when not expired credentials", ():void => {
				const expirationTime:Date = new Date();
				expirationTime.setDate( expirationTime.getDate() + 1 );

				const credentials:TokenCredentials.Class = Resource.createFrom( {
					key: "token-value",
					expirationTime,
				} );

				const authenticator:TokenAuthenticator.Class = createAuthenticatorWith( credentials );
				expect( authenticator.isAuthenticated() ).toBe( true );
			} );

			it( "should return true when expired credentials with by current time", ():void => {
				const expirationTime:Date = new Date();
				const credentials:TokenCredentials.Class = Resource.createFrom( {
					key: "token-value",
					expirationTime,
				} );

				const authenticator:TokenAuthenticator.Class = createAuthenticatorWith( credentials );
				expect( authenticator.isAuthenticated() ).toBe( false );
			} );

			it( "should return true when expired credentials with by one day", ():void => {
				const expirationTime:Date = new Date();
				expirationTime.setDate( expirationTime.getDate() - 1 );

				const credentials:TokenCredentials.Class = Resource.createFrom( {
					key: "token-value",
					expirationTime,
				} );

				const authenticator:TokenAuthenticator.Class = createAuthenticatorWith( credentials );
				expect( authenticator.isAuthenticated() ).toBe( false );
			} );

		} );

		describe( method( INSTANCE, "authenticate" ), ():void => {

			it( hasSignature(
				"When a token is provided credentials will be requested, in other case the credentials provided will be validated and stored.",
				[
					{ name: "tokenOrCredentials", type: "CarbonLDP.Auth.UsernameAndPasswordToken | CarbonLDP.Auth.TokenCredentials.Class" },
				],
				{ type: "Promise<CarbonLDP.Auth.TokenCredentials.Class>" }
			), ():void => {} );

			it( "should exists", ():void => {
				expect( TokenAuthenticator.Class.prototype.authenticate ).toBeDefined();
				expect( TokenAuthenticator.Class.prototype.authenticate ).toEqual( jasmine.any( Function ) );
			} );

			it( "should get credential when token provided", ( done:DoneFn ):void => {
				let expirationTime:Date = new Date();
				expirationTime.setDate( expirationTime.getDate() + 1 );
				jasmine.Ajax.stubRequest( "https://example.com/.system/security/auth-tokens/", null, "POST" ).andReturn( {
					status: 200,
					responseText: `[ {
							"@id": "_:00",
							"@type": [
								"${ C.ResponseMetadata }",
								"${ C.VolatileResource }"
							],
							"${ C.documentMetadata }": [ {
								"@id": "_:01"
							} ]
						}, {
							"@id": "_:01",
							"@type": [
								"${ C.DocumentMetadata }",
								"${ C.VolatileResource }"
							],
							"${ C.eTag }": [ {
								"@value": "\\"1234567890\\""
							} ],
							"${ C.relatedDocument }": [ {
								"@id": "http://successful.example.com/users/my-user/"
							} ]
						}, {
							"@id": "_:02",
							"@type": [
								"${ CS.Token }",
								"${ C.VolatileResource }"
							],
							"${ CS.tokenKey }": [ {
								"@value": "token-value"
							} ],
							"${ CS.expirationTime }": {
								"@value": "${ expirationTime.toISOString() }",
								"@type": "${ XSD.dateTime }"
							},
							"${ CS.credentialsOf }": [ {
								"@id": "http://successful.example.com/users/my-user/"
							} ]
						}, {
							"@id": "http://successful.example.com/users/my-user/",
							"@graph": [ {
								"@id": "http://successful.example.com/users/my-user/",
								"@type": [ "${ CS.User }" ],
								"${ CS.name }": [ {
									"@value": "My User Name",
									"@type": "${ XSD.string }"
								} ],
								"${ VCARD.email }": [ {
									"@value": "my-user@users.com",
									"@type": "${ XSD.string }"
								} ],
								"${ CS.enabled }": [ {
									"@value": "true",
									"@type": "${ XSD.boolean }"
								} ]
							} ]
						} ]`,
				} );

				const authenticator:TokenAuthenticator.Class = new TokenAuthenticator.Class( context );
				authenticator
					.authenticate( new UsernameAndPasswordToken( "user", "pass" ) )
					.then( ( token:TokenCredentials.Class ):void => {
						expect( authenticator.isAuthenticated() ).toEqual( true );

						expect( token ).toBeDefined();
						expect( token ).not.toBeNull();
						expect( TokenCredentials.Factory.is( token ) ).toEqual( true );

						expect( PersistedUser.Factory.is( token.user ) ).toBe( true );
						done();
					} )
					.catch( done.fail );
			} );

			it( "should call _parseErrorResponse when request error", ( done:DoneFn ):void => {
				jasmine.Ajax.stubRequest( "https://example.com/.system/security/auth-tokens/" ).andReturn( {
					status: 500,
					responseText: "",
				} );

				const error:Error = new Error( "Error message" );
				const spy:jasmine.Spy = spyOn( context.documents, "_parseErrorResponse" ).and.callFake( () => Promise.reject( error ) );

				const authenticator:TokenAuthenticator.Class = new TokenAuthenticator.Class( context );
				authenticator
					.authenticate( new UsernameAndPasswordToken( "user", "pass" ) )
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


			it( "should return same credential when valid credentials", ( done:DoneFn ):void => {
				const expirationTime:Date = new Date();
				expirationTime.setDate( expirationTime.getDate() + 1 );
				const credentials:TokenCredentials.Class = Resource.createFrom( {
					types: [ CS.Token ],
					key: "token-value",
					expirationTime,
				} );

				const authenticator:TokenAuthenticator.Class = new TokenAuthenticator.Class( context );
				authenticator
					.authenticate( credentials )
					.then( ( newCredentials:TokenCredentials.Class ):void => {
						expect( authenticator.isAuthenticated() ).toEqual( true );

						expect( newCredentials ).toBeDefined();
						expect( TokenCredentials.Factory.hasClassProperties( newCredentials ) ).toEqual( true );

						expect( newCredentials ).toBe( credentials );

						done();
					} )
					.catch( done.fail )
				;
			} );

			it( "should parse expiration date if string", ( done:DoneFn ):void => {
				const expirationTime:Date = new Date();
				expirationTime.setDate( expirationTime.getDate() + 1 );

				const authenticator:TokenAuthenticator.Class = new TokenAuthenticator.Class( context );
				authenticator
					.authenticate( JSON.parse( `{
						"types": [ "${ CS.Token }" ],
						"key": "token-value",
						"expirationTime": "${ expirationTime.toISOString() }"
					}` ) )
					.then( ( credentials:TokenCredentials.Class ):void => {
						expect( authenticator.isAuthenticated() ).toEqual( true );

						expect( credentials ).toBeDefined();
						expect( TokenCredentials.Factory.hasClassProperties( credentials ) ).toEqual( true );

						expect( credentials.expirationTime ).toEqual( jasmine.any( Date ) );
						expect( credentials.expirationTime ).toEqual( expirationTime );

						done();
					} )
					.catch( done.fail )
				;
			} );

			it( "should throw error when invalid expiration date", ( done:DoneFn ):void => {
				const expirationTime:Date = new Date();
				expirationTime.setDate( expirationTime.getDate() - 1 );
				const credentials:TokenCredentials.Class = Resource.createFrom( {
					types: [ CS.Token ],
					key: "token-value",
					expirationTime,
				} );

				const authenticator:TokenAuthenticator.Class = new TokenAuthenticator.Class( context );
				authenticator
					.authenticate( credentials )
					.then( ():void => {
						done.fail( "Should not resolve." );
					} )
					.catch( error => {
						expect( error ).toEqual( jasmine.any( Errors.IllegalArgumentError ) );
						expect( error.message ).toBe( "The token has already expired." );

						expect( authenticator.isAuthenticated() ).toEqual( false );

						done();
					} )
				;
			} );

		} );

		describe( "TokenAuthenticator.addAuthentication", ():void => {

			it( "should add the header value", ():void => {
				const expirationTime:Date = new Date();
				expirationTime.setDate( expirationTime.getDate() + 1 );

				const credentials:TokenCredentials.Class = Resource.createFrom( {
					key: "token-value",
					expirationTime,
				} );

				const authenticator:TokenAuthenticator.Class = createAuthenticatorWith( credentials );

				const options:RequestOptions = {};
				authenticator.addAuthentication( options );

				expect( options.headers ).toEqual( new Map( [
					[ "authorization", new Header( [ "Token token-value" ] ), ],
				] ) );
			} );

		} );

	} );

	it( hasDefaultExport( "CarbonLDP.Auth.TokenAuthenticator.Class" ), ():void => {
		expect( DefaultExport ).toBeDefined();
		expect( DefaultExport ).toBe( TokenAuthenticator.Class );
	} );

} );
