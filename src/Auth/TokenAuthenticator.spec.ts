import {
	clazz,
	constructor,
	hasDefaultExport,
	hasSignature,
	INSTANCE,
	isDefined,
	method,
	module,
} from "../test/JasmineExtender";

import AbstractContext from "./../AbstractContext";
import * as Errors from "./../Errors";
import {
	Header,
	Request
} from "./../HTTP";
import * as NS from "./../NS";
import * as Resource from "./../Resource";
import * as Utils from "./../Utils";
import * as PersistedUser from "./PersistedUser";

import * as TokenAuthenticator from "./TokenAuthenticator";
import DefaultExport from "./TokenAuthenticator";

import * as TokenCredentials from "./TokenCredentials";
import UsernameAndPasswordToken from "./UsernameAndPasswordToken";

describe( module( "Carbon/Auth/TokenAuthenticator" ), ():void => {

	it( isDefined(), ():void => {
		expect( TokenAuthenticator ).toBeDefined();
		expect( Utils.isObject( TokenAuthenticator ) ).toEqual( true );
	} );

	it( "should have token container constant", () => {
		expect( TokenAuthenticator.TOKEN_CONTAINER ).toBeDefined();
		expect( TokenAuthenticator.TOKEN_CONTAINER ).toBe( "auth-tokens/" );
	} );

	describe( clazz(
		"Carbon.Auth.TokenAuthenticator.Class",
		"Authenticates requests using JSON Web TokenCredentials (JWT) Authentication.",
		[
			"Carbon.Auth.Authenticator.Class<Carbon.Auth.UsernameAndPasswordToken.Class, Carbon.Auth.TokenCredentials.Class>",
		]
	), ():void => {

		let context:AbstractContext;
		beforeEach( function():void {
			jasmine.Ajax.install();
			context = new class extends AbstractContext {
				protected _baseURI:string = "https://example.com/";
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
					{ name: "context", type: "Carbon.Context.Class", description: "The context where to authenticate the user." },
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

				const credentials:TokenCredentials.Class = Resource.Factory.createFrom( {
					key: "token-value",
					expirationTime,
				} );

				const authenticator:TokenAuthenticator.Class = createAuthenticatorWith( credentials );
				expect( authenticator.isAuthenticated() ).toBe( true );
			} );

			it( "should return true when expired credentials with by current time", ():void => {
				const expirationTime:Date = new Date();
				const credentials:TokenCredentials.Class = Resource.Factory.createFrom( {
					key: "token-value",
					expirationTime,
				} );

				const authenticator:TokenAuthenticator.Class = createAuthenticatorWith( credentials );
				expect( authenticator.isAuthenticated() ).toBe( false );
			} );

			it( "should return true when expired credentials with by one day", ():void => {
				const expirationTime:Date = new Date();
				expirationTime.setDate( expirationTime.getDate() - 1 );

				const credentials:TokenCredentials.Class = Resource.Factory.createFrom( {
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
					{ name: "tokenOrCredentials", type: "Carbon.Auth.UsernameAndPasswordToken | Carbon.Auth.TokenCredentials.Class" },
				],
				{ type: "Promise<Carbon.Auth.TokenCredentials.Class>" }
			), ():void => {} );

			beforeEach( ():void => {
				context.setSetting( "system.container", ".system/" );
				context.setSetting( "system.security.container", "security/" );
			} );

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
								"${ NS.C.Class.ResponseMetadata }",
								"${ NS.C.Class.VolatileResource }"
							],
							"${ NS.C.Predicate.documentMetadata }": [ {
								"@id": "_:01"
							} ]
						}, {
							"@id": "_:01",
							"@type": [
								"${ NS.C.Class.DocumentMetadata }",
								"${ NS.C.Class.VolatileResource }"
							],
							"${ NS.C.Predicate.eTag }": [ {
								"@value": "\\"1234567890\\""
							} ],
							"${ NS.C.Predicate.relatedDocument }": [ {
								"@id": "http://successful.example.com/users/my-user/"
							} ]
						}, {
							"@id": "_:02",
							"@type": [
								"${ NS.CS.Class.Token }",
								"${ NS.C.Class.VolatileResource }"
							],
							"${ NS.CS.Predicate.tokenKey }": [ {
								"@value": "token-value"
							} ],
							"${ NS.CS.Predicate.expirationTime }": {
								"@value": "${ expirationTime.toISOString() }",
								"@type": "${ NS.XSD.DataType.dateTime }"
							},
							"${ NS.CS.Predicate.credentialsOf }": [ {
								"@id": "http://successful.example.com/users/my-user/"
							} ]
						}, {
							"@id": "http://successful.example.com/users/my-user/",
							"@graph": [ {
								"@id": "http://successful.example.com/users/my-user/",
								"@type": [ "${ NS.CS.Class.User }" ],
								"${ NS.CS.Predicate.name }": [ {
									"@value": "My User Name",
									"@type": "${ NS.XSD.DataType.string }"
								} ],
								"${ NS.VCARD.Predicate.email }": [ {
									"@value": "my-user@users.com",
									"@type": "${ NS.XSD.DataType.string }"
								} ],
								"${ NS.CS.Predicate.enabled }": [ {
									"@value": "true",
									"@type": "${ NS.XSD.DataType.boolean }"
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
				const credentials:TokenCredentials.Class = Resource.Factory.createFrom( {
					types: [ NS.CS.Class.Token ],
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
						"types": [ "${ NS.CS.Class.Token }" ],
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
				const credentials:TokenCredentials.Class = Resource.Factory.createFrom( {
					types: [ NS.CS.Class.Token ],
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

				const credentials:TokenCredentials.Class = Resource.Factory.createFrom( {
					key: "token-value",
					expirationTime,
				} );

				const authenticator:TokenAuthenticator.Class = createAuthenticatorWith( credentials );

				const options:Request.Options = {};
				authenticator.addAuthentication( options );

				expect( options.headers ).toEqual( new Map( [
					[ "authorization", new Header.Class( [ new Header.Value( "Token token-value" ) ] ), ],
				] ) );
			} );

		} );

	} );

	it( hasDefaultExport( "Carbon.Auth.TokenAuthenticator.Class" ), ():void => {
		expect( DefaultExport ).toBeDefined();
		expect( DefaultExport ).toBe( TokenAuthenticator.Class );
	} );

} );
