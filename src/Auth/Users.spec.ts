import {
	clazz,
	hasConstructor,
	hasDefaultExport,
	hasMethod,
	hasSignature,
	INSTANCE,
	isDefined,
	method,
	module,
} from "../test/JasmineExtender";
import { CS } from "../Vocabularies/CS";
import { VCARD } from "../Vocabularies/VCARD";
import AbstractContext from "./../AbstractContext";
import * as Errors from "./../Errors";
import * as HTTP from "./../HTTP";
import * as Utils from "./../Utils";
import * as PersistedCredentials from "./PersistedCredentials";
import * as PersistedUser from "./PersistedUser";

import * as Users from "./Users";
import DefaultExport from "./Users";

describe( module( "Carbon/Auth/Users" ), ():void => {

	it( isDefined(), ():void => {
		expect( Users ).toBeDefined();
		expect( Utils.isObject( Users ) ).toBe( true );
	} );

	describe( clazz(
		"Carbon.Auth.Users.Class",
		"Abstract class for manage Users of a determined context."
	), ():void => {

		it( isDefined(), ():void => {
			expect( Users.Class ).toBeDefined();
			expect( Utils.isFunction( Users.Class ) ).toBe( true );
		} );

		it( hasConstructor( [
			{ name: "context", type: "Carbon.Context.Context", description: "The context where to manage its Users." },
		] ), ():void => {
			const context:AbstractContext = new class extends AbstractContext {
				protected _baseURI:string;
			};
			const users:Users.Class = new Users.Class( context );

			expect( users ).toBeTruthy();
			expect( users instanceof Users.Class ).toBe( true );
		} );

		describe( method( INSTANCE, "register" ), ():void => {

			it( hasSignature(
				"Creates a new user with the provided credentials.\n" +
				"Returns a Promise with a persisted user, and the responses of the request.",
				[
					{ name: "email", type: "string" },
					{ name: "password", type: "string" },
				],
				{ type: "Promise<[ Carbon.Auth.PersistedUser.Class, Carbon.HTTP.Response.Class ]>" }
			), ():void => {} );

			it( "should exists", ():void => {
				const context:AbstractContext = new class extends AbstractContext {
					protected _baseURI:string;
				};
				const users:Users.Class = new Users.Class( context );

				expect( users.register ).toBeDefined();
				expect( Utils.isFunction( users.register ) ).toBe( true );
			} );

			it( "should reject promise when no \"system\" path is declared", ( done:DoneFn ):void => {
				const context:AbstractContext = new class extends AbstractContext {
					protected _baseURI:string;

					constructor() {
						super();
						this._baseURI = "http://example.com/";
						this.settings = { paths: {} };
					}
				};
				const users:Users.Class = new Users.Class( context );

				const promise:Promise<[ PersistedUser.Class, HTTP.Response.Class ]> = users.register( "user@example.com", "my-password" );
				expect( promise ).toEqual( jasmine.any( Promise ) );
				promise
					.then( () => done.fail( "Promise should not be resolved." ) )
					.catch( error => {
						expect( error.message ).toContain( "system" );
						done();
					} );
			} );

			it( "should reject promise when no \"system.credentials\" path is declared", ( done:DoneFn ):void => {
				const context:AbstractContext = new class extends AbstractContext {
					protected _baseURI:string;

					constructor() {
						super();
						this._baseURI = "http://example.com";
						this.settings = { paths: { system: { slug: ".system/" } } };
					}
				};

				const users:Users.Class = new Users.Class( context );

				const promise:Promise<[ PersistedUser.Class, HTTP.Response.Class ]> = users.register( "user@example.com", "my-password" );
				expect( promise ).toEqual( jasmine.any( Promise ) );
				promise
					.then( () => done.fail( "Promise should not be resolved." ) )
					.catch( error => {
						expect( error.message ).toContain( "system.credentials" );
						done();
					} );
			} );

			it( "should register a new user", ( done:DoneFn ):void => {
				const context:AbstractContext = new class extends AbstractContext {
					protected _baseURI:string;

					constructor() {
						super();
						this._baseURI = "http://example.com";
						this.settings = { paths: { system: { slug: ".system/", paths: { credentials: "credentials/" } } } };
					}
				};
				const users:Users.Class = new Users.Class( context );

				// Mock request to credentials creation
				jasmine.Ajax.install();
				jasmine.Ajax.stubRequest( "http://example.com/.system/credentials/" ).andReturn( {
					status: 201,
					responseHeaders: {
						"Location": "http://example.com/.system/credentials/a-user-credentials/",
						"Preference-Applied": "return=representation",
						"ETag": '"1234567890"',
					},
					responseText: `{
						"@id": "http://example.com/.system/credentials/a-user-credentials/",
						"@graph": [ {
							"@id": "http://example.com/.system/credentials/a-user-credentials/",
							"@type": [ "${ CS.Credentials }" ],
							"${ VCARD.email }": {
								"@value": "user@example.com"
							},
							"${ CS.password }": {
								"@value": "my-encrypted-password"
							},
							"${ CS.credentialsOf }": {
								"@id": "http://example.com/users/a-user/"
							}
						} ]
					}`,
				} );

				const promise:Promise<[ PersistedUser.Class, HTTP.Response.Class ]> = users.register( "user@example.com", "my-password" );
				expect( promise ).toEqual( jasmine.any( Promise ) );

				promise.then( ( [ persistedUser, response ]:[ PersistedUser.Class, HTTP.Response.Class ] ) => {
					expect( response ).toEqual( jasmine.any( HTTP.Response.Class ) );

					expect( PersistedUser.Factory.is( persistedUser ) ).toBe( true );
					expect( persistedUser ).toEqual( jasmine.objectContaining( { credentials: jasmine.any( Object ) as any } ) );
					expect( persistedUser.credentials ).toEqual( jasmine.objectContaining( { email: "user@example.com" } ) );
					expect( persistedUser.credentials ).toEqual( jasmine.objectContaining( { password: "my-encrypted-password" } ) );
					expect( persistedUser.credentials ).not.toEqual( jasmine.objectContaining( { enabled: jasmine.any( Boolean ) as any } ) );
					expect( PersistedCredentials.Factory.hasClassProperties( persistedUser.credentials ) ).toBe( true );

					jasmine.Ajax.uninstall();
					done();
				} ).catch( done.fail );
			} );

		} );

		it( hasMethod(
			INSTANCE,
			"get",
			"Retrieves the user specified from the current context.", [
				{ name: "userURI", type: "string", description: "The URI of the user to retrieve." },
				{ name: "requestOptions", type: "Carbon.HTTP.Request.Options", optional: true },
			],
			{ type: "Promise<[ Carbon.Auth.PersistedUser.Class, Carbon.HTTP.Response.Class ]>" }
		), ( done:{ ():void, fail:() => void } ) => {
			let users:Users.Class;
			let context:AbstractContext;

			class MockedContext extends AbstractContext {
				protected _baseURI:string;

				constructor() {
					super();
					this._baseURI = "http://example.com/";
					this.settings = { paths: { system: { slug: ".system/" }, users: "users/" } };
				}
			}

			context = new MockedContext();

			users = new Users.Class( context );

			expect( users.get ).toBeDefined();
			expect( Utils.isFunction( users.get ) ).toBe( true );

			let options:HTTP.Request.Options = { timeout: 5555 };
			let spy:jasmine.Spy = spyOn( context.documents, "get" ).and.returnValue( Promise.resolve() );

			let promises:Promise<any>[] = [];
			let promise:Promise<any>;

			promise = users.get( "http://example.com/users/an-user/" );
			expect( promise instanceof Promise ).toBe( true );
			promises.push( promise );

			promise = users.get( "http://example.com/users/another-user/", options );
			expect( promise instanceof Promise ).toBe( true );
			promises.push( promise );

			promise = users.get( "http://example.com/users/another-another-user/" );
			expect( promise instanceof Promise ).toBe( true );
			promises.push( promise );

			promise = users.get( "http://example.com/not-an-users/resource/" );
			expect( promise instanceof Promise ).toBe( true );
			promises.push( promise.catch( ( error:Error ) => {
				expect( error instanceof Errors.IllegalArgumentError ).toBe( true );
			} ) );

			Promise.all( promises ).then( () => {
				expect( spy ).toHaveBeenCalledWith( "http://example.com/users/another-another-user/", undefined );
				expect( spy ).toHaveBeenCalledWith( "http://example.com/users/another-user/", options );
				expect( spy ).toHaveBeenCalledWith( "http://example.com/users/an-user/", undefined );
				done();
			} ).catch( done.fail );
		} );

		describe( "enableCredentials", ():void => {

			it( "should exists", ():void => {
				const context:AbstractContext = new class extends AbstractContext {
					protected _baseURI:string;
				};
				const users:Users.Class = new Users.Class( context );

				expect( users.enableCredentials ).toBeDefined();
				expect( users.enableCredentials ).toEqual( jasmine.any( Function ) );
			} );

			it( "should reject promise when no \"users\" setting is declared", ( done:DoneFn ):void => {
				const context:AbstractContext = new class extends AbstractContext {
					protected _baseURI:string;
				};
				const users:Users.Class = new Users.Class( context );

				const promise:Promise<[ PersistedUser.Class, HTTP.Response.Class[] ]> = users.enableCredentials( "a-user/" );
				expect( promise ).toEqual( jasmine.any( Promise ) );
				promise
					.then( () => done.fail( "Promise should not be resolved." ) )
					.catch( error => {
						expect( error.message ).toContain( "users" );
						done();
					} );
			} );

			it( "should reject promise when IRI provided is not a user IRI", ( done:DoneFn ):void => {
				const context:AbstractContext = new class extends AbstractContext {
					protected _baseURI:string;

					constructor() {
						super();
						this._baseURI = "http://example.com/";
						this.settings = { paths: { system: ".system/", users: "users/" } };
					}
				};
				const users:Users.Class = new Users.Class( context );

				const promise:Promise<[ PersistedUser.Class, HTTP.Response.Class[] ]> = users.enableCredentials( "http://example.com/not-users-container/a-user/" );
				expect( promise ).toEqual( jasmine.any( Promise ) );
				promise
					.then( () => done.fail( "Promise should not be resolved." ) )
					.catch( error => {
						expect( error.message ).toMatch( /valid.+user/ );
						done();
					} );
			} );

			it( "should call the enableCredentials() of the persisted user", ( done:DoneFn ):void => {
				const context:AbstractContext = new class extends AbstractContext {
					protected _baseURI:string;

					constructor() {
						super();
						this._baseURI = "http://example.com/";
						this.settings = { paths: { system: ".system/", users: "users/" } };
					}
				};
				const users:Users.Class = new Users.Class( context );

				// Spies decorator and function called
				const mockedResponse:HTTP.Response.Class = new HTTP.Response.Class( {} as any, "response-data" );
				const mockedUser:PersistedUser.Class = PersistedUser.Factory.decorate(
					context.documents.getPointer( "http://example.com/users/a-user/" ),
					context.documents
				);
				const decoratorSpy:jasmine.Spy = spyOn( PersistedUser.Factory, "decorate" ).and.callThrough();
				Object.defineProperty( mockedUser, "enableCredentials", { writable: true } );
				const enableCredentialsSpy:jasmine.Spy = spyOn( mockedUser, "enableCredentials" ).and.returnValue( [ null, [ mockedResponse ] ] );

				const promise:Promise<[ PersistedUser.Class, HTTP.Response.Class[] ]> = users.enableCredentials( "a-user/" );
				expect( promise ).toEqual( jasmine.any( Promise ) );
				promise.then( ( [ returnedUser, responses ] ) => {
					expect( responses ).toEqual( jasmine.any( Array ) );
					expect( responses.length ).toBe( 1 );
					responses.forEach( response => expect( response ).toBe( mockedResponse ) );

					// Null from the spy
					expect( returnedUser ).toBeNull();

					expect( decoratorSpy ).toHaveBeenCalledTimes( 1 );
					expect( decoratorSpy ).toHaveBeenCalledWith( mockedUser, context.documents );

					expect( enableCredentialsSpy ).toHaveBeenCalledTimes( 1 );
					done();
				} ).catch( done.fail );
			} );

		} );

		it( hasMethod(
			INSTANCE,
			"disableCredentials",
			"Activate the account of the user specified.", [
				{ name: "userURI", type: "string", description: "The URI of the user to deactivate its credentials." },
				{ name: "requestOptions", type: "Carbon.HTTP.Request.Options", optional: true },
			],
			{ type: "Promise<[ Carbon.Auth.PersistedUser.Class, Carbon.HTTP.Response.Class[] ]>" }
		), () => {} );

		describe( "disableCredentials", ():void => {

			it( "should exists", ():void => {
				const context:AbstractContext = new class extends AbstractContext {
					protected _baseURI:string;
				};
				const users:Users.Class = new Users.Class( context );

				expect( users.disableCredentials ).toBeDefined();
				expect( users.disableCredentials ).toEqual( jasmine.any( Function ) );
			} );

			it( "should reject promise when no \"users\" setting is declared", ( done:DoneFn ):void => {
				const context:AbstractContext = new class extends AbstractContext {
					protected _baseURI:string;
				};
				const users:Users.Class = new Users.Class( context );

				const promise:Promise<[ PersistedUser.Class, HTTP.Response.Class[] ]> = users.disableCredentials( "a-user/" );
				expect( promise ).toEqual( jasmine.any( Promise ) );
				promise
					.then( () => done.fail( "Promise should not be resolved." ) )
					.catch( error => {
						expect( error.message ).toContain( "users" );
						done();
					} );
			} );

			it( "should reject promise when IRI provided is not a user IRI", ( done:DoneFn ):void => {
				const context:AbstractContext = new class extends AbstractContext {
					protected _baseURI:string;

					constructor() {
						super();
						this._baseURI = "http://example.com/";
						this.settings = { paths: { system: ".system/", users: "users/" } };
					}
				};
				const users:Users.Class = new Users.Class( context );

				const promise:Promise<[ PersistedUser.Class, HTTP.Response.Class[] ]> = users.disableCredentials( "http://example.com/not-users-container/a-user/" );
				expect( promise ).toEqual( jasmine.any( Promise ) );
				promise
					.then( () => done.fail( "Promise should not be resolved." ) )
					.catch( error => {
						expect( error.message ).toMatch( /valid.+user/ );
						done();
					} );
			} );

			it( "should call the disableCredentials() of the persisted user", ( done:DoneFn ):void => {
				const context:AbstractContext = new class extends AbstractContext {
					protected _baseURI:string;

					constructor() {
						super();
						this._baseURI = "http://example.com/";
						this.settings = { paths: { system: ".system/", users: "users/" } };
					}
				};
				const users:Users.Class = new Users.Class( context );

				// Spies decorator and function called
				const mockedResponse:HTTP.Response.Class = new HTTP.Response.Class( {} as any, "response-data" );
				const mockedUser:PersistedUser.Class = PersistedUser.Factory.decorate(
					context.documents.getPointer( "http://example.com/users/a-user/" ),
					context.documents
				);
				const decoratorSpy:jasmine.Spy = spyOn( PersistedUser.Factory, "decorate" ).and.callThrough();
				Object.defineProperty( mockedUser, "disableCredentials", { writable: true } );
				const enableCredentialsSpy:jasmine.Spy = spyOn( mockedUser, "disableCredentials" ).and.returnValue( [ null, [ mockedResponse ] ] );

				const promise:Promise<[ PersistedUser.Class, HTTP.Response.Class[] ]> = users.disableCredentials( "a-user/" );
				expect( promise ).toEqual( jasmine.any( Promise ) );
				promise.then( ( [ returnedUser, responses ] ) => {
					expect( responses ).toEqual( jasmine.any( Array ) );
					expect( responses.length ).toBe( 1 );
					responses.forEach( response => expect( response ).toBe( mockedResponse ) );

					// Null from the spy
					expect( returnedUser ).toBeNull();

					expect( decoratorSpy ).toHaveBeenCalledTimes( 1 );
					expect( decoratorSpy ).toHaveBeenCalledWith( mockedUser, context.documents );

					expect( enableCredentialsSpy ).toHaveBeenCalledTimes( 1 );
					done();
				} ).catch( done.fail );
			} );

		} );

		it( hasMethod(
			INSTANCE,
			"disableCredentials",
			"Deactivate the account of the user specified.", [
				{ name: "userURI", type: "string", description: "The URI of the user to activate its credentials." },
				{ name: "requestOptions", type: "Carbon.HTTP.Request.Options", optional: true },
			],
			{ type: "Promise<[ Carbon.Auth.PersistedUser.Class, [ Carbon.HTTP.Response.Class, Carbon.HTTP.Response.Class ] ]>" }
		), () => {} );

		it( hasMethod(
			INSTANCE,
			"delete",
			"Deletes the user specified.", [
				{ name: "userURI", type: "string", description: "The URI of the user to be deleted." },
				{ name: "requestOptions", type: "Carbon.HTTP.Request.Options", optional: true },
			],
			{ type: "Promise<[ Carbon.Auth.PersistedUser.Class, Carbon.HTTP.Response.Class ]>" }
		), ( done:{ ():void, fail:() => void } ) => {
			let users:Users.Class;
			let context:AbstractContext;

			class MockedContext extends AbstractContext {
				protected _baseURI:string;

				constructor() {
					super();
					this._baseURI = "http://example.com/";
					this.settings = { paths: { system: ".system/", users: "users/" } };
				}
			}

			context = new MockedContext();
			users = new Users.Class( context );

			expect( users.delete ).toBeDefined();
			expect( Utils.isFunction( users.delete ) ).toBe( true );

			let options:HTTP.Request.Options = { timeout: 5555 };
			let spy:jasmine.Spy = spyOn( context.documents, "delete" ).and.returnValue( Promise.resolve() );

			let promises:Promise<any>[] = [];
			let promise:Promise<any>;

			promise = users.delete( "http://example.com/users/an-user/" );
			expect( promise instanceof Promise ).toBe( true );
			promises.push( promise );

			promise = users.delete( "http://example.com/users/another-user/", options );
			expect( promise instanceof Promise ).toBe( true );
			promises.push( promise );

			promise = users.delete( "http://example.com/users/another-another-user/" );
			expect( promise instanceof Promise ).toBe( true );
			promises.push( promise );

			promise = users.delete( "http://example.com/not-an-users/resource/" );
			expect( promise instanceof Promise ).toBe( true );
			promises.push( promise.catch( ( error:Error ) => {
				expect( error instanceof Errors.IllegalArgumentError ).toBe( true );
			} ) );

			Promise.all( promises ).then( ():void => {
				expect( spy ).toHaveBeenCalledWith( "http://example.com/users/another-another-user/", undefined );
				expect( spy ).toHaveBeenCalledWith( "http://example.com/users/another-user/", options );
				expect( spy ).toHaveBeenCalledWith( "http://example.com/users/an-user/", undefined );
				done();
			} ).catch( done.fail );
		} );

	} );

	it( hasDefaultExport(
		"Carbon.Auth.Users.Class"
	), ():void => {
		expect( DefaultExport ).toBeDefined();
		expect( DefaultExport ).toBe( Users.Class );
	} );

} );
