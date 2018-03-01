import AbstractContext from "../AbstractContext";
import { Documents } from "../Documents";
import * as Errors from "../Errors";
import { RequestOptions } from "../HTTP/Request";
import { Pointer } from "../Pointer";
import {
	clazz,
	decoratedObject,
	extendsClass,
	hasDefaultExport,
	hasMethod,
	hasProperty,
	hasSignature,
	INSTANCE,
	interfaze,
	isDefined,
	method,
	module,
	OBLIGATORY,
	OPTIONAL,
	STATIC,
} from "../test/JasmineExtender";
import { PersistedDocument } from "./../PersistedDocument";
import * as PersistedProtectedDocument from "./../PersistedProtectedDocument";
import * as Utils from "./../Utils";

import * as PersistedRole from "./PersistedRole";
import DefaultExport from "./PersistedRole";

import * as Role from "./Role";
import * as Roles from "./Roles";

describe( module( "Carbon/Auth/PersistedRole" ), ():void => {

	it( isDefined(), ():void => {
		expect( PersistedRole ).toBeDefined();
		expect( Utils.isObject( PersistedRole ) ).toBe( true );
	} );

	describe( interfaze(
		"Carbon.PersistedRole.Class",
		"Specific interface that represents a persisted role of an application."
	), ():void => {

		it( extendsClass( "Carbon.Auth.PersistedRole.Class" ), ():void => {} );

		it( hasProperty(
			OBLIGATORY,
			"_roles",
			"Carbon.Auth.Roles.Class",
			"(Internal) Instance of an implementation of the Roles abstract class that manage the current role."
		), ():void => {} );

		it( hasProperty(
			OPTIONAL,
			"name",
			"string",
			"A name that describes the current role."
		), ():void => {} );

		it( hasProperty(
			OPTIONAL,
			"description",
			"string",
			"An optional description of the current role."
		), ():void => {} );

		it( hasProperty(
			OPTIONAL,
			"users",
			"Carbon.Pointer.Pointer[]",
			"An array of pointers that references to all the users that have the current role."
		), ():void => {} );

		describe( method(
			OBLIGATORY,
			"createChild"
		), ():void => {

			it( hasSignature(
				[ "T extends Carbon.Auth.Roles.Class" ],
				"Persists a new role with the slug specified as a child of the current role.", [
					{ name: "role", type: "T", description: "The role to be persisted." },
					{ name: "slug", type: "string", optional: true, description: "The slug that will be used in the child role URI." },
					{ name: "requestOptions", type: "Carbon.HTTP.Request.RequestOptions", optional: true, description: "Customizable options for the request." },
				],
				{ type: "Promise<[ T & Carbon.Auth.PersistedRole.Class, Carbon.HTTP.Response.Response ]>" }
			), ():void => {} );

			it( hasSignature(
				[ "T extends Carbon.Auth.Roles.Class" ],
				"Persists a new role as a child of the current one.", [
					{ name: "role", type: "T", description: "The role to be persisted." },
					{ name: "requestOptions", type: "Carbon.HTTP.Request.RequestOptions", optional: true, description: "Customizable options for the request." },
				],
				{ type: "Promise<[ T & Carbon.Auth.PersistedRole.Class, Carbon.HTTP.Response.Response ]>" }
			), ():void => {} );

		} );

		describe( method(
			OBLIGATORY,
			"getUsers"
		), ():void => {

			it( hasSignature(
				"Retrieves an array of resolved pointers for all the users of the role.", [
					{ name: "requestOptions", type: "Carbon.HTTP.Request.RequestOptions", optional: true },
				],
				{ type: "Promise<[ carbon.Auth.PersistedRole.Class, Carbon.HTTP.Response.Response ]>" }
			), ():void => {} );

			it( hasSignature(
				"Retrieves an array of resolved pointers for the users of the role, in accordance of the retrievalPreferences provided.", [
					{ name: "retrievalPreferences", type: "Carbon.RetrievalPreferences.Class", optional: true, description: "An object that specify the retrieval preferences for the request." },
					{ name: "requestOptions", type: "Carbon.HTTP.Request.RequestOptions", optional: true },
				],
				{ type: "Promise<[ carbon.Auth.PersistedRole.Class, Carbon.HTTP.Response.Response ]>" }
			), ():void => {} );

		} );

		it( hasMethod(
			OBLIGATORY,
			"addUser",
			"Makes a relation in the role towards the users specified.", [
				{ name: "user", type: "string | Carbon.Pointer.Pointer", description: "The users that wants to add to the role." },
				{ name: "requestOptions", type: "Carbon.HTTP.Request.RequestOptions", optional: true },
			],
			{ type: "Promise<Carbon.HTTP.Response.Response>" }
		), ():void => {} );

		it( hasMethod(
			OBLIGATORY,
			"addUsers",
			"Makes a relation in the role towards the users specified.", [
				{ name: "users", type: "(string | Carbon.Pointer.Pointer)[]", description: "An array with strings or Pointers that refers to the users that wants to add to the role." },
				{ name: "requestOptions", type: "Carbon.HTTP.Request.RequestOptions", optional: true },
			],
			{ type: "Promise<Carbon.HTTP.Response.Response>" }
		), ():void => {} );

		it( hasMethod(
			OBLIGATORY,
			"removeUser",
			"Removes the relation in the role towards the users specified.", [
				{ name: "user", type: "string | Carbon.Pointer.Pointer", description: "The users that wants to be removed from the role." },
				{ name: "requestOptions", type: "Carbon.HTTP.Request.RequestOptions", optional: true },
			],
			{ type: "Promise<Carbon.HTTP.Response.Response>" }
		), ():void => {} );

		it( hasMethod(
			OBLIGATORY,
			"removeUsers",
			"Remove the relation in the role towards the users specified.", [
				{ name: "users", type: "(string | Carbon.Pointer.Pointer)[]", description: "An array with strings or Pointers that refers to the users that wants to be removed from the role." },
				{ name: "requestOptions", type: "Carbon.HTTP.Request.RequestOptions", optional: true },
			],
			{ type: "Promise<Carbon.HTTP.Response.Response>" }
		), ():void => {} );

	} );

	describe( clazz(
		"Carbon.Auth.PersistedRole.Factory",
		"Factory class for `Carbon.Auth.PersistedRole.Class` objects"
	), ():void => {

		it( isDefined(), ():void => {
			expect( PersistedRole.Factory ).toBeDefined();
			expect( Utils.isFunction( PersistedRole.Factory ) ).toBe( true );
		} );

		it( hasMethod(
			STATIC,
			"hasClassProperties",
			"Returns true if the object provided has the properties that defines a `Carbon.Auth.PersistedRole.Class` object", [
				{ name: "resource", type: "Object" },
			],
			{ type: "boolean" }
		), ():void => {
			expect( PersistedRole.Factory.hasClassProperties ).toBeDefined();
			expect( Utils.isFunction( PersistedRole.Factory.hasClassProperties ) ).toBe( true );

			let object:any = void 0;
			expect( PersistedRole.Factory.hasClassProperties( object ) ).toBe( false );

			object = {
				_roles: null,
				name: null,
				users: null,
				createChild: ():void => {},
				getUsers: ():void => {},
				addUser: ():void => {},
				addUsers: ():void => {},
				removeUser: ():void => {},
				removeUsers: ():void => {},
			};
			expect( PersistedRole.Factory.hasClassProperties( object ) ).toBe( true );

			delete object._roles;
			expect( PersistedRole.Factory.hasClassProperties( object ) ).toBe( false );
			object._roles = null;

			delete object.name;
			expect( PersistedRole.Factory.hasClassProperties( object ) ).toBe( true );
			object.name = null;

			delete object.users;
			expect( PersistedRole.Factory.hasClassProperties( object ) ).toBe( true );
			object.users = null;

			delete object.createChild;
			expect( PersistedRole.Factory.hasClassProperties( object ) ).toBe( false );
			object.createChild = ():void => {};

			delete object.getUsers;
			expect( PersistedRole.Factory.hasClassProperties( object ) ).toBe( false );
			object.getUsers = ():void => {};

			delete object.addUser;
			expect( PersistedRole.Factory.hasClassProperties( object ) ).toBe( false );
			object.addUser = ():void => {};

			delete object.addUsers;
			expect( PersistedRole.Factory.hasClassProperties( object ) ).toBe( false );
			object.addUsers = ():void => {};

			delete object.removeUser;
			expect( PersistedRole.Factory.hasClassProperties( object ) ).toBe( false );
			object.removeUser = ():void => {};

			delete object.removeUsers;
			expect( PersistedRole.Factory.hasClassProperties( object ) ).toBe( false );
			object.removeUsers = ():void => {};
		} );

		it( hasMethod(
			STATIC,
			"is",
			"Returns true if the object provided is considered a `Carbon.Auth.PersistedRole.Class` object", [
				{ name: "object", type: "object" },
			],
			{ type: "boolean" }
		), ():void => {
			expect( PersistedRole.Factory.is ).toBeDefined();
			expect( Utils.isFunction( PersistedRole.Factory.is ) ).toBe( true );

			let object:any = {};
			expect( PersistedRole.Factory.is( object ) ).toBe( false );

			object = {
				_roles: null,
				name: null,
				users: null,
				createChild: ():void => {},
				getUsers: ():void => {},
				addUser: ():void => {},
				addUsers: ():void => {},
				removeUser: ():void => {},
				removeUsers: ():void => {},
			};
			expect( PersistedRole.Factory.is( object ) ).toBe( false );

			object = Role.Factory.createFrom( object, "Role name" );
			expect( PersistedRole.Factory.is( object ) ).toBe( false );

			object = PersistedDocument.decorate( object, new Documents() );
			expect( PersistedRole.Factory.is( object ) ).toBe( false );

			object = PersistedProtectedDocument.Factory.decorate( object, new Documents() );
			expect( PersistedRole.Factory.is( object ) ).toBe( true );
		} );

		it( hasMethod(
			STATIC,
			"decorate",
			[ "T extends object" ],
			"Decorates the object provided with the methods and properties of a `Carbon.Auth.PersistedRole.Class` object.", [
				{ name: "object", type: "T" },
				{ name: "documents", type: "Carbon.Documents.Documents" },
			],
			{ type: "T & Carbon.Auth.PersistedRole.Class" }
		), ():void => {
			expect( PersistedRole.Factory.decorate ).toBeDefined();
			expect( Utils.isFunction( PersistedRole.Factory.decorate ) ).toBe( true );

			class MockedContext extends AbstractContext {
				protected _baseURI:string;

				constructor() {
					super();
					this._baseURI = "http://example.com/";
					this.settings = { paths: { system: ".system/" } };
				}
			}

			let context:AbstractContext = new MockedContext();

			interface ThePersistedRole {
				myProperty?:string;
			}

			interface MyPersistedRole extends PersistedRole.Class, ThePersistedRole {}

			let role:MyPersistedRole = PersistedRole.Factory.decorate<ThePersistedRole>( {}, context.documents );

			expect( PersistedRole.Factory.hasClassProperties( role ) ).toBe( true );
		} );

		describe( decoratedObject(
			"Object decorated by the `Carbon.Auth.PersistedRole.Factory.decorate()` function.", [
				"Carbon.Auth.PersistedRole.Class",
			]
		), ():void => {
			let role:PersistedRole.Class;
			let roles:Roles.Class;

			beforeEach( () => {
				class MockedContext extends AbstractContext {
					protected _baseURI:string;

					constructor() {
						super();
						this._baseURI = "http://example.com/";
						this.settings = { paths: { system: ".system/" } };
					}
				}

				let context:AbstractContext = new MockedContext();
				roles = context.auth.roles;

				role = PersistedRole.Factory.decorate( Role.Factory.create( "Role Name" ), context.documents );
				role.id = "http://example.com/.system/roles/a-role/";
			} );

			describe( method(
				INSTANCE,
				"createChild"
			), ():void => {

				it( isDefined(), ():void => {
					expect( role.createChild ).toBeDefined();
					expect( Utils.isFunction( role.createChild ) ).toBe( true );
				} );

				it( hasSignature(
					[ "T extends Carbon.Auth.Roles.Class" ],
					"Persists a new role with the slug specified as a child of the current role.", [
						{ name: "role", type: "T", description: "The role to be persisted." },
						{ name: "slug", type: "string", optional: true, description: "The slug that will be used in the child role URI." },
						{ name: "requestOptions", type: "Carbon.HTTP.Request.RequestOptions", optional: true, description: "Customizable options for the request." },
					],
					{ type: "Promise<[ T & Carbon.Auth.PersistedRole.Class, Carbon.HTTP.Response.Response ]>" }
				), ():void => {
					let spy:jasmine.Spy = spyOn( roles, "createChild" );

					let newRole:Role.Class = Role.Factory.create( "Role Name" );
					let options:RequestOptions = { timeout: 5050 };

					//noinspection JSIgnoredPromiseFromCall
					role.createChild( newRole, "role-slug", options );
					expect( spy ).toHaveBeenCalledWith( "http://example.com/.system/roles/a-role/", newRole, "role-slug", options );

					//noinspection JSIgnoredPromiseFromCall
					role.createChild( newRole, "role-slug" );
					expect( spy ).toHaveBeenCalledWith( "http://example.com/.system/roles/a-role/", newRole, "role-slug", undefined );

					//noinspection JSIgnoredPromiseFromCall
					role.createChild( newRole );
					expect( spy ).toHaveBeenCalledWith( "http://example.com/.system/roles/a-role/", newRole, undefined, undefined );

					role = PersistedRole.Factory.decorate( Role.Factory.create( "Role Name" ), new Documents() );
					expect( () => role.createChild( newRole, "role-slug" ) ).toThrowError( Errors.IllegalStateError );
				} );

				it( hasSignature(
					[ "T extends Carbon.Auth.Roles.Class" ],
					"Persists a new role as a child of the current one.", [
						{ name: "role", type: "T", description: "The role to be persisted." },
						{ name: "requestOptions", type: "Carbon.HTTP.Request.RequestOptions", optional: true, description: "Customizable options for the request." },
					],
					{ type: "Promise<[ T & Carbon.Auth.PersistedRole.Class, Carbon.HTTP.Response.Response ]>" }
				), ():void => {
					let spy:jasmine.Spy = spyOn( roles, "createChild" );

					let newRole:Role.Class = Role.Factory.create( "Role Name" );
					let options:RequestOptions = { timeout: 5050 };

					//noinspection JSIgnoredPromiseFromCall
					role.createChild( newRole, options );
					expect( spy ).toHaveBeenCalledWith( "http://example.com/.system/roles/a-role/", newRole, options, undefined );

					//noinspection JSIgnoredPromiseFromCall
					role.createChild( newRole );
					expect( spy ).toHaveBeenCalledWith( "http://example.com/.system/roles/a-role/", newRole, undefined, undefined );

					role = PersistedRole.Factory.decorate( Role.Factory.create( "Role Name" ), new Documents() );
					expect( () => role.createChild( newRole ) ).toThrowError( Errors.IllegalStateError );
				} );

			} );

			describe( method(
				INSTANCE,
				"getUsers"
			), ():void => {

				it( isDefined(), ():void => {
					expect( role.getUsers ).toBeDefined();
					expect( Utils.isFunction( role.getUsers ) ).toBe( true );

					role = PersistedRole.Factory.decorate( Role.Factory.create( "Role Name" ), new Documents() );
					expect( () => role.getUsers() ).toThrowError( Errors.IllegalStateError );
				} );

				it( hasSignature(
					"Retrieves an array of resolved pointers for all the users of the role.", [
						{ name: "requestOptions", type: "Carbon.HTTP.Request.RequestOptions", optional: true },
					],
					{ type: "Promise<[ carbon.Auth.PersistedRole.Class, Carbon.HTTP.Response.Response ]>" }
				), ():void => {
					let spy:jasmine.Spy = spyOn( roles, "getUsers" );

					//noinspection JSIgnoredPromiseFromCall
					role.getUsers();
					expect( spy ).toHaveBeenCalledWith( "http://example.com/.system/roles/a-role/", undefined );

					let options:RequestOptions = { timeout: 5050 };
					//noinspection JSIgnoredPromiseFromCall
					role.getUsers( options );
					expect( spy ).toHaveBeenCalledWith( "http://example.com/.system/roles/a-role/", options );
				} );

			} );

			it( hasMethod(
				INSTANCE,
				"addUser",
				"Makes a relation in the role towards the users specified.", [
					{ name: "user", type: "string | Carbon.Pointer.Pointer", description: "The users that wants to add to the role." },
					{ name: "requestOptions", type: "Carbon.HTTP.Request.RequestOptions", optional: true },
				],
				{ type: "Promise<Carbon.HTTP.Response.Response>" }
			), ():void => {
				expect( role.addUser ).toBeDefined();
				expect( Utils.isFunction( role.addUser ) ).toBe( true );

				let spy:jasmine.Spy = spyOn( roles, "addUsers" );

				//noinspection JSIgnoredPromiseFromCall
				role.addUser( "http://example.com/users/an-user/" );
				expect( spy ).toHaveBeenCalledWith( "http://example.com/.system/roles/a-role/", [ "http://example.com/users/an-user/" ], undefined );

				let options:RequestOptions = { timeout: 5050 };
				//noinspection JSIgnoredPromiseFromCall
				role.addUser( role.getPointer( "http://example.com/users/another-user/" ), options );
				expect( spy ).toHaveBeenCalledWith( "http://example.com/.system/roles/a-role/", [ role.getPointer( "http://example.com/users/another-user/" ) ], options );

				role = PersistedRole.Factory.decorate( Role.Factory.create( "Role Name" ), new Documents() );
				expect( () => role.addUser( "http://example.com/users/an-user/" ) ).toThrowError( Errors.IllegalStateError );
			} );

			it( hasMethod(
				INSTANCE,
				"addUsers",
				"Makes a relation in the role towards the users specified.", [
					{ name: "users", type: "(string | Carbon.Pointer.Pointer)[]", description: "An array with strings or Pointers that refers to the users that wants to add to the role." },
					{ name: "requestOptions", type: "Carbon.HTTP.Request.RequestOptions", optional: true },
				],
				{ type: "Promise<Carbon.HTTP.Response.Response>" }
			), ():void => {
				expect( role.addUsers ).toBeDefined();
				expect( Utils.isFunction( role.addUsers ) ).toBe( true );

				let spy:jasmine.Spy = spyOn( roles, "addUsers" );
				let users:(string | Pointer)[] = [ "http://example.com/users/an-user/", role.getPointer( "http://example.com/users/another-user/" ) ];

				//noinspection JSIgnoredPromiseFromCall
				role.addUsers( users );
				expect( spy ).toHaveBeenCalledWith( "http://example.com/.system/roles/a-role/", users, undefined );

				let options:RequestOptions = { timeout: 5050 };
				//noinspection JSIgnoredPromiseFromCall
				role.addUsers( users, options );
				expect( spy ).toHaveBeenCalledWith( "http://example.com/.system/roles/a-role/", users, options );

				role = PersistedRole.Factory.decorate( Role.Factory.create( "Role Name" ), new Documents() );
				expect( () => role.addUsers( users ) ).toThrowError( Errors.IllegalStateError );
			} );

			it( hasMethod(
				INSTANCE,
				"removeUser",
				"Removes the relation in the role towards the users specified.", [
					{ name: "user", type: "string | Carbon.Pointer.Pointer", description: "The users that wants to be removed from the role." },
					{ name: "requestOptions", type: "Carbon.HTTP.Request.RequestOptions", optional: true },
				],
				{ type: "Promise<Carbon.HTTP.Response.Response>" }
			), ():void => {
				expect( role.removeUser ).toBeDefined();
				expect( Utils.isFunction( role.removeUser ) ).toBe( true );

				let spy:jasmine.Spy = spyOn( roles, "removeUsers" );

				//noinspection JSIgnoredPromiseFromCall
				role.removeUser( "http://example.com/users/an-user/" );
				expect( spy ).toHaveBeenCalledWith( "http://example.com/.system/roles/a-role/", [ "http://example.com/users/an-user/" ], undefined );

				let options:RequestOptions = { timeout: 5050 };
				//noinspection JSIgnoredPromiseFromCall
				role.removeUser( role.getPointer( "http://example.com/users/another-user/" ), options );
				expect( spy ).toHaveBeenCalledWith( "http://example.com/.system/roles/a-role/", [ role.getPointer( "http://example.com/users/another-user/" ) ], options );

				role = PersistedRole.Factory.decorate( Role.Factory.create( "Role Name" ), new Documents() );
				expect( () => role.removeUser( "http://example.com/users/an-user/" ) ).toThrowError( Errors.IllegalStateError );
			} );

			it( hasMethod(
				INSTANCE,
				"removeUsers",
				"Remove the relation in the role towards the users specified.", [
					{ name: "users", type: "(string | Carbon.Pointer.Pointer)[]", description: "An array with strings or Pointers that refers to the users that wants to be removed from the role." },
					{ name: "requestOptions", type: "Carbon.HTTP.Request.RequestOptions", optional: true },
				],
				{ type: "Promise<Carbon.HTTP.Response.Response>" }
			), ():void => {
				expect( role.removeUsers ).toBeDefined();
				expect( Utils.isFunction( role.removeUsers ) ).toBe( true );

				let spy:jasmine.Spy = spyOn( roles, "removeUsers" );
				let users:(Pointer | string)[] = [ "http://example.com/users/an-user/", role.getPointer( "http://example.com/users/another-user/" ) ];

				//noinspection JSIgnoredPromiseFromCall
				role.removeUsers( users );
				expect( spy ).toHaveBeenCalledWith( "http://example.com/.system/roles/a-role/", users, undefined );

				let options:RequestOptions = { timeout: 5050 };
				//noinspection JSIgnoredPromiseFromCall
				role.removeUsers( users, options );
				expect( spy ).toHaveBeenCalledWith( "http://example.com/.system/roles/a-role/", users, options );

				role = PersistedRole.Factory.decorate( Role.Factory.create( "Role Name" ), new Documents() );
				expect( () => role.addUsers( users ) ).toThrowError( Errors.IllegalStateError );
			} );

		} );

	} );

	it( hasDefaultExport( "Carbon.Auth.PersistedRole.Class" ), ():void => {
		let defaultExport:DefaultExport = <any> {};
		let defaultTarget:PersistedRole.Class;

		defaultTarget = defaultExport;
		expect( defaultTarget ).toEqual( jasmine.any( Object ) );
	} );

} );
