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
import * as HTTP from "./../HTTP";
import * as NS from "./../NS";
import * as Utils from "./../Utils";
import * as PersistedUser from "./PersistedUser";
import * as User from "./User";

import * as Users from "./Users";


describe( module( "Carbon/Auth/Users" ), ():void => {

	it( isDefined(), ():void => {
		expect( Users ).toBeDefined();
		expect( Utils.isObject( Users ) ).toBe( true );
	} );

	describe( clazz(
		"Carbon.Auth.Users.Class",
		"Abstract class for manage Users of a determined context."
	), ():void => {

		let context:AbstractContext;
		beforeEach( ():void => {
			context = new class extends AbstractContext {
				protected _baseURI:string = "https://example.com/";
			};
			context.setSetting( "users.container", "users/" );
		} );

		it( isDefined(), ():void => {
			expect( Users.Class ).toBeDefined();
			expect( Users.Class ).toEqual( jasmine.any( Function ) );
		} );

		describe( constructor(), ():void => {

			it( hasSignature(
				[
					{ name: "context", type: "Carbon.Context.Class", description: "The context where to manage its Users." },
				]
			), ():void => {} );

			it( "should be instantiable", ():void => {
				const users:Users.Class = new Users.Class( context );
				expect( users ).toEqual( jasmine.any( Users.Class ) );
			} );

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
				expect( Users.Class.prototype.register ).toBeDefined();
				expect( Users.Class.prototype.register ).toEqual( jasmine.any( Function ) );
			} );

			it( "should reject promise when no `users.container` setting is declared", ( done:DoneFn ):void => {
				context.deleteSetting( "users.container" );
				const users:Users.Class = new Users.Class( context );

				const promise:Promise<[ PersistedUser.Class, HTTP.Response.Class ]> = users.register( "user@example.com", "my-password" );
				expect( promise ).toEqual( jasmine.any( Promise ) );
				promise
					.then( () => done.fail( "Promise should not be resolved." ) )
					.catch( error => {
						expect( error ).toEqual( jasmine.any( Errors.IllegalStateError ) );
						expect( error.message ).toBe( `The "users.container" setting hasn't been defined.` );

						done();
					} );
			} );

			it( "should call `Documents.createChildAndRetrieve`", ( done:DoneFn ):void => {
				const spy:jasmine.Spy = spyOn( context.documents, "createChildAndRetrieve" )
					.and.returnValue( Promise.reject( { fake: "Error" } ) );
				const users:Users.Class = new Users.Class( context );

				users
					.register( "user@example.com", "my-password" )
					.then( () => {
						done.fail( "Should not resolve" );
					} )
					.catch( error => {
						expect( error ).toEqual( { fake: "Error" } );

						expect( spy ).toHaveBeenCalledWith( "https://example.com/users/", jasmine.any( Object ) );

						done();
					} )
				;
			} );

			it( "should create user to persist", ( done:DoneFn ):void => {
				const spy:jasmine.Spy = spyOn( context.documents, "createChildAndRetrieve" )
					.and.returnValue( Promise.reject( { fake: "Error" } ) );
				const users:Users.Class = new Users.Class( context );

				users
					.register( "user@example.com", "my-password" )
					.then( () => {
						done.fail( "Should not resolve" );
					} )
					.catch( () => {
						const user:User.Class = spy.calls.mostRecent().args[ 1 ];

						expect( User.Factory.hasClassProperties( user ) ).toBe( true );
						expect( user ).toEqual( jasmine.objectContaining( {
							credentials: jasmine.objectContaining( {
								types: jasmine.arrayContaining( [
									NS.CS.Class.UsernameAndPasswordCredentials,
									NS.C.Class.VolatileResource,
								] ) as any,
								username: "user@example.com",
								password: "my-password",
							} ) as any,
						} ) );

						expect( user ).not.toEqual( jasmine.objectContaining( {
							enabled: jasmine.anything() as any,
							disabled: jasmine.anything() as any,
						} ) );

						done();
					} )
				;
			} );

			it( "should create user to persist when disabled flag", ( done:DoneFn ):void => {
				const spy:jasmine.Spy = spyOn( context.documents, "createChildAndRetrieve" )
					.and.returnValue( Promise.reject( { fake: "Error" } ) );
				const users:Users.Class = new Users.Class( context );

				users
					.register( "user@example.com", "my-password", true )
					.then( () => {
						done.fail( "Should not resolve" );
					} )
					.catch( () => {
						const user:User.Class = spy.calls.mostRecent().args[ 1 ];

						expect( User.Factory.hasClassProperties( user ) ).toBe( true );
						expect( user ).toEqual( jasmine.objectContaining( {
							disabled: true,
							credentials: jasmine.objectContaining( {
								types: jasmine.arrayContaining( [
									NS.CS.Class.UsernameAndPasswordCredentials,
									NS.C.Class.VolatileResource,
								] ) as any,
								username: "user@example.com",
								password: "my-password",
							} ) as any,
						} ) );

						expect( user ).not.toEqual( jasmine.objectContaining( {
							enabled: jasmine.anything() as any,
						} ) );

						done();
					} )
				;
			} );

		} );

		describe( method( INSTANCE, "registerWith" ), ():void => {

			it( hasSignature(
				"Creates a new user with the provided object and credentials.\n" +
				"Returns a Promise with a persisted user, and the responses of the request.",
				[
					{ name: "email", type: "string" },
					{ name: "password", type: "string" },
				],
				{ type: "Promise<[ Carbon.Auth.PersistedUser.Class, Carbon.HTTP.Response.Class ]>" }
			), ():void => {} );

			it( "should exists", ():void => {
				expect( Users.Class.prototype.registerWith ).toBeDefined();
				expect( Users.Class.prototype.registerWith ).toEqual( jasmine.any( Function ) );
			} );


			it( "should call `Documents.createChildAndRetrieve`", ( done:DoneFn ):void => {
				const spy:jasmine.Spy = spyOn( context.documents, "createChildAndRetrieve" )
					.and.returnValue( Promise.reject( { fake: "Error" } ) );
				const users:Users.Class = new Users.Class( context );

				users
					.registerWith( {}, "user@example.com", "my-password" )
					.then( () => {
						done.fail( "Should not resolve" );
					} )
					.catch( error => {
						expect( error ).toEqual( { fake: "Error" } );

						expect( spy ).toHaveBeenCalledWith( "https://example.com/users/", jasmine.any( Object ) );

						done();
					} )
				;
			} );

			it( "should create user to persist from the object", ( done:DoneFn ):void => {
				const spy:jasmine.Spy = spyOn( context.documents, "createChildAndRetrieve" )
					.and.returnValue( Promise.reject( { fake: "Error" } ) );
				const users:Users.Class = new Users.Class( context );

				const object:object = { the: "object" };
				users
					.registerWith( object, "user@example.com", "my-password" )
					.then( () => {
						done.fail( "Should not resolve" );
					} )
					.catch( () => {
						const user:User.Class = spy.calls.mostRecent().args[ 1 ];

						expect( object ).toBe( user );
						expect( User.Factory.hasClassProperties( user ) ).toBe( true );
						expect( user ).toEqual( jasmine.objectContaining( {
							the: "object",
							credentials: jasmine.objectContaining( {
								types: jasmine.arrayContaining( [
									NS.CS.Class.UsernameAndPasswordCredentials,
									NS.C.Class.VolatileResource,
								] ) as any,
								username: "user@example.com",
								password: "my-password",
							} ) as any,
						} ) );

						expect( user ).not.toEqual( jasmine.objectContaining( {
							enabled: jasmine.anything() as any,
							disabled: jasmine.anything() as any,
						} ) );

						done();
					} )
				;
			} );

			it( "should create user to persist with disabled flag", ( done:DoneFn ):void => {
				const spy:jasmine.Spy = spyOn( context.documents, "createChildAndRetrieve" )
					.and.returnValue( Promise.reject( { fake: "Error" } ) );
				const users:Users.Class = new Users.Class( context );

				const object:object = { the: "object" };

				users
					.registerWith( object, "user@example.com", "my-password", true )
					.then( () => {
						done.fail( "Should not resolve" );
					} )
					.catch( () => {
						const user:User.Class = spy.calls.mostRecent().args[ 1 ];

						expect( object ).toBe( user );
						expect( user ).toEqual( jasmine.objectContaining( {
							the: "object",
							disabled: true,
						} ) );

						expect( user ).not.toEqual( jasmine.objectContaining( {
							enabled: jasmine.anything() as any,
						} ) );

						done();
					} )
				;
			} );


			it( "should reject promise when no `users.container` setting is declared", ( done:DoneFn ):void => {
				context.deleteSetting( "users.container" );
				const users:Users.Class = new Users.Class( context );

				const promise:Promise<[ PersistedUser.Class, HTTP.Response.Class ]> = users.registerWith( {}, "user@example.com", "my-password" );
				expect( promise ).toEqual( jasmine.any( Promise ) );
				promise
					.then( () => done.fail( "Promise should not be resolved." ) )
					.catch( error => {
						expect( error ).toEqual( jasmine.any( Errors.IllegalStateError ) );
						expect( error.message ).toBe( `The "users.container" setting hasn't been defined.` );

						done();
					} );
			} );

		} );

		describe( method( INSTANCE, "get" ), ():void => {

			it( hasSignature(
				[ "T extends object" ],
				"Retrieves the user specified from the current context.", [
					{ name: "userURI", type: "string", description: "The URI of the user to retrieve." },
					{ name: "requestOptions", type: "Carbon.HTTP.Request.Options", optional: true },
					{ name: "queryBuilderFn", type: "( queryBuilder:Carbon.SPARQL.QueryDocument.QueryDocumentBuilder.Class ) => Carbon.SPARQL.QueryDocument.QueryDocumentBuilder.Class", optional: true, description: "Function that receives a the builder that helps you to construct the retrieval query.\nThe same builder must be returned." },
				],
				{ type: "Promise<[ Carbon.Auth.PersistedUser.Class, Carbon.HTTP.Response.Class ]>" }
			), ():void => {} );

			it( hasSignature(
				[ "T extends object" ],
				"Retrieves the user specified from the current context.", [
					{ name: "userURI", type: "string", description: "The URI of the user to retrieve." },
					{ name: "queryBuilderFn", type: "( queryBuilder:Carbon.SPARQL.QueryDocument.QueryDocumentBuilder.Class ) => Carbon.SPARQL.QueryDocument.QueryDocumentBuilder.Class", optional: true, description: "Function that receives a the builder that helps you to construct the retrieval query.\nThe same builder must be returned." },
				],
				{ type: "Promise<[ Carbon.Auth.PersistedUser.Class, Carbon.HTTP.Response.Class ]>" }
			), ():void => {} );

			it( "should exists", ():void => {
				expect( Users.Class.prototype.get ).toBeDefined();
				expect( Users.Class.prototype.get ).toEqual( jasmine.any( Function ) );
			} );


			it( "should call `Documents.get`", ( done:DoneFn ):void => {
				const spy:jasmine.Spy = spyOn( context.documents, "get" )
					.and.returnValue( Promise.reject( { fake: "Error" } ) );

				const users:Users.Class = new Users.Class( context );
				users
					.get( "my-user/" )
					.then( () => {
						done.fail( "Should not resolve" );
					} )
					.catch( error => {
						expect( error ).toEqual( { fake: "Error" } );
						expect( spy ).toHaveBeenCalled();

						done();
					} )
				;
			} );

			it( "should resolve relative user URI", ( done:DoneFn ):void => {
				const spy:jasmine.Spy = spyOn( context.documents, "get" )
					.and.returnValue( Promise.reject( { fake: "Error" } ) );

				const users:Users.Class = new Users.Class( context );
				users
					.get( "my-user/" )
					.then( () => {
						done.fail( "Should not resolve" );
					} )
					.catch( error => {
						expect( error ).toEqual( { fake: "Error" } );
						expect( spy ).toHaveBeenCalled();

						const uri:string = spy.calls.mostRecent().args[ 0 ];
						expect( uri ).toBe( "https://example.com/users/my-user/" );

						done();
					} )
				;
			} );

			it( "should pass on the options", ( done:DoneFn ):void => {
				const spy:jasmine.Spy = spyOn( context.documents, "get" )
					.and.returnValue( Promise.reject( null ) );

				const users:Users.Class = new Users.Class( context );
				users
					.get( "my-user/", { timeout: 5050 } )
					.then( () => {
						done.fail( "Should not resolve" );
					} )
					.catch( error => {
						if( error ) done.fail( error );

						expect( spy ).toHaveBeenCalledWith( "https://example.com/users/my-user/", { timeout: 5050 }, void 0 );

						done();
					} )
				;
			} );

			it( "should pass on the query builder", ( done:DoneFn ):void => {
				const spy:jasmine.Spy = spyOn( context.documents, "get" )
					.and.returnValue( Promise.reject( null ) );

				const users:Users.Class = new Users.Class( context );
				users
					.get( "my-user/", _ => _ )
					.then( () => {
						done.fail( "Should not resolve" );
					} )
					.catch( error => {
						if( error ) done.fail( error );

						expect( spy ).toHaveBeenCalledWith( "https://example.com/users/my-user/", jasmine.any( Function ), void 0 );

						done();
					} )
				;
			} );

			it( "should pass on the options and query builder", ( done:DoneFn ):void => {
				const spy:jasmine.Spy = spyOn( context.documents, "get" )
					.and.returnValue( Promise.reject( null ) );

				const users:Users.Class = new Users.Class( context );
				users
					.get( "my-user/", { timeout: 5050 }, _ => _ )
					.then( () => {
						done.fail( "Should not resolve" );
					} )
					.catch( error => {
						if( error ) done.fail( error );

						expect( spy ).toHaveBeenCalledWith( "https://example.com/users/my-user/", { timeout: 5050 }, jasmine.any( Function ) );

						done();
					} )
				;
			} );


			it( "should reject when no `users.container` setting is declared", ( done:DoneFn ):void => {
				spyOn( context.documents, "get" )
					.and.returnValue( Promise.reject( { fake: "Error" } ) );

				context.deleteSetting( "users.container" );
				const users:Users.Class = new Users.Class( context );
				users
					.get( "my-user/" )
					.then( () => {
						done.fail( "Should not resolve" );
					} )
					.catch( error => {
						expect( error ).toEqual( jasmine.any( Errors.IllegalStateError ) );
						expect( error.message ).toBe( `The "users.container" setting hasn't been defined.` );

						done();
					} )
				;
			} );

			it( "should reject when invalid user URI", ( done:DoneFn ):void => {
				spyOn( context.documents, "get" )
					.and.returnValue( Promise.reject( { fake: "Error" } ) );

				const users:Users.Class = new Users.Class( context );
				users
					.get( "https://example.com/another-container/not-user/" )
					.then( () => {
						done.fail( "Should not resolve" );
					} )
					.catch( error => {
						expect( error ).toEqual( jasmine.any( Errors.IllegalArgumentError ) );
						expect( error.message ).toBe( `The URI "https://example.com/another-container/not-user/" isn't a valid user URI.` );

						done();
					} )
				;
			} );

		} );

		describe( method( INSTANCE, "enable" ), ():void => {

			it( hasSignature(
				"Activate the account of the specified user.",
				[
					{ name: "userURI", type: "string", description: "The URI of the user to activate." },
					{ name: "requestOptions", type: "Carbon.HTTP.Request.Options", optional: true, description: "Customizable options for the request." },
				],
				{ type: "Promise<[ Carbon.Auth.PersistedUser.Class, Carbon.HTTP.Response.Class[] ]>" }
			), ():void => {} );

			it( "should exists", ():void => {
				expect( Users.Class.prototype.enable ).toBeDefined();
				expect( Users.Class.prototype.enable ).toEqual( jasmine.any( Function ) );
			} );


			it( "should call the `PersistedUser.enable` method", ( done:DoneFn ):void => {
				const persistedUser:PersistedUser.Class = PersistedUser.Factory.decorate(
					context.documents.getPointer( "users/my-user/" ),
					context.documents
				);
				const spy:jasmine.Spy = spyOn( persistedUser, "enable" )
					.and.returnValue( Promise.reject( { fake: "Error" } ) );

				const users:Users.Class = new Users.Class( context );
				users
					.enable( "my-user/" )
					.then( () => {
						done.fail( "Should not resolve" );
					} )
					.catch( error => {
						expect( error ).toEqual( { fake: "Error" } );

						expect( spy ).toHaveBeenCalled();

						done();
					} )
				;
			} );

			it( "should pass on the request options", ( done:DoneFn ):void => {
				const persistedUser:PersistedUser.Class = PersistedUser.Factory.decorate(
					context.documents.getPointer( "users/my-user/" ),
					context.documents
				);
				const spy:jasmine.Spy = spyOn( persistedUser, "enable" )
					.and.returnValue( Promise.reject( null ) );

				const users:Users.Class = new Users.Class( context );
				users
					.enable( "my-user/", { timeout: 55000 } )
					.then( () => {
						done.fail( "Should not resolve" );
					} )
					.catch( () => {
						expect( spy ).toHaveBeenCalledWith( { timeout: 55000 } );

						done();
					} )
				;
			} );


			it( "should reject when no `users.container` setting is declared", ( done:DoneFn ):void => {
				context.deleteSetting( "users.container" );
				const users:Users.Class = new Users.Class( context );
				users
					.enable( "my-user/" )
					.then( () => {
						done.fail( "Should not resolve" );
					} )
					.catch( error => {
						expect( error ).toEqual( jasmine.any( Errors.IllegalStateError ) );
						expect( error.message ).toBe( `The "users.container" setting hasn't been defined.` );

						done();
					} )
				;
			} );

			it( "should reject when invalid user URI", ( done:DoneFn ):void => {
				const users:Users.Class = new Users.Class( context );
				users
					.enable( "https://example.com/another-container/not-user/" )
					.then( () => {
						done.fail( "Should not resolve" );
					} )
					.catch( error => {
						expect( error ).toEqual( jasmine.any( Errors.IllegalArgumentError ) );
						expect( error.message ).toBe( `The URI "https://example.com/another-container/not-user/" isn't a valid user URI.` );

						done();
					} )
				;
			} );

		} );

		describe( method( INSTANCE, "disable" ), ():void => {

			it( hasSignature(
				"Deactivate the account of the specified user.",
				[
					{ name: "requestOptions", type: "Carbon.HTTP.Request.Options", optional: true, description: "Customizable options for the request." },
				],
				{ type: "Promise<[ Carbon.Auth.PersistedUser.Class, Carbon.HTTP.Response.Class[] ]>" }
			), ():void => {} );

			it( "should exists", ():void => {
				expect( Users.Class.prototype.disable ).toBeDefined();
				expect( Users.Class.prototype.disable ).toEqual( jasmine.any( Function ) );
			} );


			it( "should call the `PersistedUser.disable` method", ( done:DoneFn ):void => {
				const persistedUser:PersistedUser.Class = PersistedUser.Factory.decorate(
					context.documents.getPointer( "users/my-user/" ),
					context.documents
				);
				const spy:jasmine.Spy = spyOn( persistedUser, "disable" )
					.and.returnValue( Promise.reject( { fake: "Error" } ) );

				const users:Users.Class = new Users.Class( context );
				users
					.disable( "my-user/" )
					.then( () => {
						done.fail( "Should not resolve" );
					} )
					.catch( error => {
						expect( error ).toEqual( { fake: "Error" } );

						expect( spy ).toHaveBeenCalled();

						done();
					} )
				;
			} );

			it( "should pass on the request options", ( done:DoneFn ):void => {
				const persistedUser:PersistedUser.Class = PersistedUser.Factory.decorate(
					context.documents.getPointer( "users/my-user/" ),
					context.documents
				);
				const spy:jasmine.Spy = spyOn( persistedUser, "disable" )
					.and.returnValue( Promise.reject( null ) );

				const users:Users.Class = new Users.Class( context );
				users
					.disable( "my-user/", { timeout: 55000 } )
					.then( () => {
						done.fail( "Should not resolve" );
					} )
					.catch( () => {
						expect( spy ).toHaveBeenCalledWith( { timeout: 55000 } );

						done();
					} )
				;
			} );


			it( "should reject when no `users.container` setting is declared", ( done:DoneFn ):void => {
				context.deleteSetting( "users.container" );
				const users:Users.Class = new Users.Class( context );
				users
					.disable( "my-user/" )
					.then( () => {
						done.fail( "Should not resolve" );
					} )
					.catch( error => {
						expect( error ).toEqual( jasmine.any( Errors.IllegalStateError ) );
						expect( error.message ).toBe( `The "users.container" setting hasn't been defined.` );

						done();
					} )
				;
			} );

			it( "should reject when invalid user URI", ( done:DoneFn ):void => {
				const users:Users.Class = new Users.Class( context );
				users
					.disable( "https://example.com/another-container/not-user/" )
					.then( () => {
						done.fail( "Should not resolve" );
					} )
					.catch( error => {
						expect( error ).toEqual( jasmine.any( Errors.IllegalArgumentError ) );
						expect( error.message ).toBe( `The URI "https://example.com/another-container/not-user/" isn't a valid user URI.` );

						done();
					} )
				;
			} );

		} );

		describe( method( INSTANCE, "delete" ), ():void => {

			it( hasSignature(
				"Deletes the specified user.", [
					{ name: "userURI", type: "string", description: "The URI of the user to be deleted." },
					{ name: "requestOptions", type: "Carbon.HTTP.Request.Options", optional: true, description: "Customizable options for the request." },
				],
				{ type: "Promise<[ Carbon.Auth.PersistedUser.Class, Carbon.HTTP.Response.Class ]>" }
			), ():void => {} );

			it( "should exists", ():void => {
				expect( Users.Class.prototype.delete ).toBeDefined();
				expect( Users.Class.prototype.delete ).toEqual( jasmine.any( Function ) );
			} );

			it( "should call the `Documents.delete` method", ( done:DoneFn ):void => {
				const spy:jasmine.Spy = spyOn( context.documents, "delete" )
					.and.returnValue( Promise.reject( { fake: "Error" } ) );

				const users:Users.Class = new Users.Class( context );

				users
					.delete( "my-user" )
					.then( () => {
						done.fail( "Should not resolve" );
					} )
					.catch( error => {
						expect( error ).toEqual( { fake: "Error" } );
						expect( spy ).toHaveBeenCalled();

						done();
					} )
				;
			} );

			it( "should pass on the URI and the options", ( done:DoneFn ):void => {
				const spy:jasmine.Spy = spyOn( context.documents, "delete" )
					.and.returnValue( Promise.reject( null ) );

				const users:Users.Class = new Users.Class( context );

				users
					.delete( "my-user/", { timeout: 5500 } )
					.then( () => {
						done.fail( "Should not resolve" );
					} )
					.catch( () => {
						expect( spy ).toHaveBeenCalledWith( "https://example.com/users/my-user/", { timeout: 5500 } );
						done();
					} )
				;
			} );


			it( "should reject when no `users.container` setting is declared", ( done:DoneFn ):void => {
				context.deleteSetting( "users.container" );
				const users:Users.Class = new Users.Class( context );

				users
					.delete( "my-user/" )
					.then( () => {
						done.fail( "Should not resolve" );
					} )
					.catch( error => {
						expect( error ).toEqual( jasmine.any( Errors.IllegalStateError ) );
						expect( error.message ).toBe( `The "users.container" setting hasn't been defined.` );

						done();
					} )
				;
			} );

			it( "should reject when invalid user URI", ( done:DoneFn ):void => {
				const users:Users.Class = new Users.Class( context );

				users
					.delete( "https://example.com/another-container/not-user/" )
					.then( () => {
						done.fail( "Should not resolve" );
					} )
					.catch( error => {
						expect( error ).toEqual( jasmine.any( Errors.IllegalArgumentError ) );
						expect( error.message ).toBe( `The URI "https://example.com/another-container/not-user/" isn't a valid user URI.` );

						done();
					} )
				;
			} );

		} );

	} );

	it( hasDefaultExport( "Carbon.Auth.Users.Class" ), ():void => {
		expect( Users.default ).toBeDefined();
		expect( Users.default ).toBe( Users.Class );
	} );

} );
