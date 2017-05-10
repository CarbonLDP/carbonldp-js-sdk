import {
	INSTANCE,

	module,
	clazz,

	isDefined,
	hasDefaultExport,
	hasConstructor,
	hasMethod,
} from "./../test/JasmineExtender";
import AbstractContext from "./../AbstractContext";
import * as Errors from "./../Errors";
import * as HTTP from "./../HTTP";
import * as PersistedDocument from "./../PersistedDocument";
import * as Utils from "./../Utils";
import * as PersistedUser from "./PersistedUser";
import * as User from "./User";

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
			{ name: "context", type: "Carbon.Context.Class", description: "The context where to manage its Users." },
		] ), ():void => {
			let users:Users.Class;
			let context:AbstractContext;

			class MockedContext extends AbstractContext {
				protected _baseURI:string;

				constructor() {
					super();
					this._baseURI = "http://example.com/";
					this.setSetting( "system.container", ".system/" );
				}
			}
			context = new MockedContext();

			class MockedUsers extends Users.Class {}
			users = new MockedUsers( context );

			expect( users ).toBeTruthy();
			expect( users instanceof Users.Class ).toBe( true );
		} );

		it( hasMethod(
			INSTANCE,
			"register",
			"Persists a `Carbon.Auth.User.Class` object using the slug specified.\n" +
			"Returns a Promise with a Pointer to the stored User, and the response of the request.",
			[
				{ name: "userDocument", type: "Carbon.Auth.User.Class" },
				{ name: "slug", type: "string", optional: true },
			],
			{ type: "Promise<Carbon.Pointer.Class, Carbon.HTTP.Response.Class>" }
		), ( done:{ ():void, fail:() => void } ):void => {
			let users:Users.Class;
			let context:AbstractContext;

			class MockedContext extends AbstractContext {
				protected _baseURI:string;

				constructor() {
					super();
					this._baseURI = "http://example.com/";
					this.setSetting( "system.container", ".system/" );
				}
			}
			context = new MockedContext();
			class MockedUsers extends Users.Class {}
			users = new MockedUsers( context );

			expect( users.register ).toBeDefined();
			expect( Utils.isFunction( users.register ) ).toBe( true );

			let spy:jasmine.Spy = spyOn( context.documents, "createChild" );
			let user:User.Class = User.Factory.create( "User name", "email.of.user@example.com", "myAwesomePassword" );

			users.register( user ).then( done.fail ).catch( stateError => {
				expect( stateError instanceof Errors.IllegalStateError ).toBe( true );
				context.setSetting( "system.users.container", "users/" );

				let promises:Promise<any>[] = [];
				let promise:Promise<any>;

				promise = users.register( user, "userSlug" );
				expect( promise instanceof Promise ).toBe( true );
				promises.push( promise );

				users.register( user, null );
				expect( promise instanceof Promise ).toBe( true );
				promises.push( promise );

				users.register( user );
				expect( promise instanceof Promise ).toBe( true );
				promises.push( promise );

				promise = users.register( null );
				expect( promise instanceof Promise ).toBe( true );
				promises.push( promise.catch( ( error:Error ) => {
					expect( error instanceof Errors.IllegalArgumentError );
				} ) );

				Promise.all( promises ).then( ():void => {
					expect( spy ).toHaveBeenCalledTimes( 3 );
					expect( spy ).toHaveBeenCalledWith( "http://example.com/users/", user, "userSlug" );
					expect( spy ).toHaveBeenCalledWith( "http://example.com/users/", user, null );
					expect( spy ).not.toHaveBeenCalledWith( "http://example.com/users/", user );
					done();
				} );

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
					this.setSetting( "system.container", ".system/" );
				}
			}
			context = new MockedContext();

			class MockedUsers extends Users.Class {}
			users = new MockedUsers( context );

			expect( users.get ).toBeDefined();
			expect( Utils.isFunction( users.get ) ).toBe( true );

			let options:HTTP.Request.Options = { timeout: 5555 };
			let spy:jasmine.Spy = spyOn( context.documents, "get" ).and.returnValue( Promise.resolve() );

			users.get( "http://example.com/users/an-user/" ).then( done.fail ).catch( ( stateError:Error ) => {
				expect( stateError instanceof Errors.IllegalStateError ).toBe( true );
				context.setSetting( "system.users.container", "users/" );

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

		} );

		it( hasMethod(
			INSTANCE,
			"enable",
			"Activate the account of the user specified.", [
				{ name: "userURI", type: "string", description: "The URI of the user to be activated." },
				{ name: "requestOptions", type: "Carbon.HTTP.Request.Options", optional: true },
			],
			{ type: "Promise<[ Carbon.Auth.PersistedUser.Class, [ Carbon.HTTP.Response.Class, Carbon.HTTP.Response.Class ] ]>" }
		), ( done:{ ():void, fail:() => void } ) => {
			let users:Users.Class;
			let context:AbstractContext;

			class MockedContext extends AbstractContext {
				protected _baseURI:string;

				constructor() {
					super();
					this._baseURI = "http://example.com/";
					this.setSetting( "system.container", ".system/" );
				}
			}
			context = new MockedContext();
			class MockedUsers extends Users.Class {}
			users = new MockedUsers( context );

			expect( users.enable ).toBeDefined();
			expect( Utils.isFunction( users.enable ) ).toBe( true );

			let options:HTTP.Request.Options = { timeout: 5555 };
			let spyGet:jasmine.Spy = spyOn( context.documents, "get" ).and.callFake( ():[ PersistedUser.Class, HTTP.Response.Class ] => {
				let persistedUser:PersistedUser.Class = <any> PersistedDocument.Factory.createFrom( { enabled: false }, "", context.documents );
				return [ persistedUser, null ];
			} );
			let spySave:jasmine.Spy = spyOn( context.documents, "save" ).and.returnValue( Promise.resolve( [ null, null ] ) );

			users.enable( "http://example.com/users/an-user/" ).then( done.fail ).catch( ( stateError:Error ) => {
				expect( stateError instanceof Errors.IllegalStateError ).toBe( true );
				context.setSetting( "system.users.container", "users/" );

				let promises:Promise<any>[] = [];
				let promise:Promise<any>;

				promise = users.enable( "http://example.com/users/an-user/" );
				expect( promise instanceof Promise ).toBe( true );
				promises.push( promise );

				promise = users.enable( "http://example.com/users/another-user/", options );
				expect( promise instanceof Promise ).toBe( true );
				promises.push( promise );

				promise = users.enable( "http://example.com/users/another-another-user/" );
				expect( promise instanceof Promise ).toBe( true );
				promises.push( promise );

				promise = users.enable( "http://example.com/not-an-users/resource/" );
				expect( promise instanceof Promise ).toBe( true );
				promises.push( promise.catch( ( error:Error ) => {
					expect( error instanceof Errors.IllegalArgumentError ).toBe( true );
				} ) );

				Promise.all( promises ).then( () => {
					expect( spyGet.calls.count() ).toBe( 3 );
					expect( spyGet ).toHaveBeenCalledWith( "http://example.com/users/another-another-user/", undefined );
					expect( spyGet ).toHaveBeenCalledWith( "http://example.com/users/another-user/", options );
					expect( spyGet ).toHaveBeenCalledWith( "http://example.com/users/an-user/", undefined );

					expect( spySave.calls.count() ).toBe( 3 );
					for( let call of spySave.calls.all() ) {
						expect( call.args[ 0 ].enabled ).toBe( true );
					}
					done();
				} ).catch( done.fail );
			} );

		} );

		it( hasMethod(
			INSTANCE,
			"disable",
			"Deactivate the account of the user specified.", [
				{ name: "userURI", type: "string", description: "The URI of the user to be deactivated." },
				{ name: "requestOptions", type: "Carbon.HTTP.Request.Options", optional: true },
			],
			{ type: "Promise<[ Carbon.Auth.PersistedUser.Class, [ Carbon.HTTP.Response.Class, Carbon.HTTP.Response.Class ] ]>" }
		), ( done:{ ():void, fail:() => void } ) => {
			let users:Users.Class;
			let context:AbstractContext;

			class MockedContext extends AbstractContext {
				protected _baseURI:string;

				constructor() {
					super();
					this._baseURI = "http://example.com/";
					this.setSetting( "system.container", ".system/" );
				}
			}
			context = new MockedContext();
			class MockedUsers extends Users.Class {}
			users = new MockedUsers( context );

			expect( users.disable ).toBeDefined();
			expect( Utils.isFunction( users.disable ) ).toBe( true );

			let options:HTTP.Request.Options = { timeout: 5555 };
			let spyGet:jasmine.Spy = spyOn( context.documents, "get" ).and.callFake( ():[ PersistedUser.Class, HTTP.Response.Class ] => {
				let persistedUser:PersistedUser.Class = <any> PersistedDocument.Factory.createFrom( { enabled: true }, "", context.documents );
				return [ persistedUser, null ];
			} );
			let spySave:jasmine.Spy = spyOn( context.documents, "save" ).and.returnValue( Promise.resolve( [ null, null ] ) );

			users.disable( "http://example.com/users/an-user/" ).then( done.fail ).catch( ( stateError:Error ) => {
				expect( stateError instanceof Errors.IllegalStateError ).toBe( true );
				context.setSetting( "system.users.container", "users/" );

				let promises:Promise<any>[] = [];
				let promise:Promise<any>;

				promise = users.disable( "http://example.com/users/an-user/" );
				expect( promise instanceof Promise ).toBe( true );
				promises.push( promise );

				promise = users.disable( "http://example.com/users/another-user/", options );
				expect( promise instanceof Promise ).toBe( true );
				promises.push( promise );

				promise = users.disable( "http://example.com/users/another-another-user/" );
				expect( promise instanceof Promise ).toBe( true );
				promises.push( promise );

				promise = users.disable( "http://example.com/not-an-users/resource/" );
				expect( promise instanceof Promise ).toBe( true );
				promises.push( promise.catch( ( error:Error ) => {
					expect( error instanceof Errors.IllegalArgumentError ).toBe( true );
				} ) );

				Promise.all( promises ).then( () => {
					expect( spyGet.calls.count() ).toBe( 3 );
					expect( spyGet ).toHaveBeenCalledWith( "http://example.com/users/another-another-user/", undefined );
					expect( spyGet ).toHaveBeenCalledWith( "http://example.com/users/another-user/", options );
					expect( spyGet ).toHaveBeenCalledWith( "http://example.com/users/an-user/", undefined );

					expect( spySave.calls.count() ).toBe( 3 );
					for( let call of spySave.calls.all() ) {
						expect( call.args[ 0 ].enabled ).toBe( false );
					}
					done();
				} ).catch( done.fail );
			} );

		} );

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
					this.setSetting( "system.container", ".system/" );
				}
			}
			context = new MockedContext();
			class MockedUsers extends Users.Class {}
			users = new MockedUsers( context );

			expect( users.delete ).toBeDefined();
			expect( Utils.isFunction( users.delete ) ).toBe( true );

			let options:HTTP.Request.Options = { timeout: 5555 };
			let spy:jasmine.Spy = spyOn( context.documents, "delete" ).and.returnValue( Promise.resolve() );

			users.delete( "http://example.com/users/an-user/" ).then( done.fail ).catch( ( stateError:Error ) => {
				expect( stateError instanceof Errors.IllegalStateError ).toBe( true );
				context.setSetting( "system.users.container", "users/" );

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

				Promise.all( promises ).then( () => {
					expect( spy ).toHaveBeenCalledWith( "http://example.com/users/another-another-user/", undefined );
					expect( spy ).toHaveBeenCalledWith( "http://example.com/users/another-user/", options );
					expect( spy ).toHaveBeenCalledWith( "http://example.com/users/an-user/", undefined );
					done();
				} ).catch( done.fail );
			} );

		} );

	} );

	it( hasDefaultExport(
		"Carbon.Auth.Users.Class"
	), ():void => {
		expect( DefaultExport ).toBeDefined();
		expect( DefaultExport ).toBe( Users.Class );
	} );

} );
