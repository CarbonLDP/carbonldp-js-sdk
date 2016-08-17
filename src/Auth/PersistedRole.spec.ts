import {
	STATIC,
	INSTANCE,

	module,
	clazz,
	method,

	isDefined,
	hasMethod,
	decoratedObject,
	hasSignature,
} from "./../test/JasmineExtender";
import AbstractContext from "../AbstractContext";
import * as Errors from "./../Errors";
import * as HTTP from "./../HTTP";
import * as RetrievalPreferences from "./../RetrievalPreferences";
import * as Role from "./Role";
import * as Roles from "./Roles";
import * as URI from "./../RDF/URI";
import * as Utils from "./../Utils";

import * as PersistedRole from "./PersistedRole";

describe( module( "Carbon/Auth/PersistedRole" ), ():void => {

	it( isDefined(), ():void => {
		expect( PersistedRole ).toBeDefined();
		expect( Utils.isObject( PersistedRole ) ).toBe( true );
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
				{name: "resource", type: "Object"},
			],
			{type: "boolean"}
		), ():void => {
			expect( PersistedRole.Factory.hasClassProperties ).toBeDefined();
			expect( Utils.isFunction( PersistedRole.Factory.hasClassProperties ) ).toBe( true );

			let object:any;
			expect( PersistedRole.Factory.hasClassProperties( object ) ).toBe( false );

			object = {
				_roles: null,
				name: null,
				agents: null,
				listAgents: ():void => {},
				getAgents: ():void => {},
			};
			expect( PersistedRole.Factory.hasClassProperties( object ) ).toBe( true );

			delete object._roles;
			expect( PersistedRole.Factory.hasClassProperties( object ) ).toBe( false );
			object._roles = null;

			delete object.name;
			expect( PersistedRole.Factory.hasClassProperties( object ) ).toBe( false );
			object.name = null;

			delete object.agents;
			expect( PersistedRole.Factory.hasClassProperties( object ) ).toBe( true );
			object.agents = null;

			delete object.listAgents;
			expect( PersistedRole.Factory.hasClassProperties( object ) ).toBe( false );
			object.listAgents = ():void => {};

			delete object.getAgents;
			expect( PersistedRole.Factory.hasClassProperties( object ) ).toBe( false );
			object.getAgents = ():void => {};
		} );

		it( hasMethod(
			STATIC,
			"is",
			"Returns true if the object provided is considered a `Carbon.Auth.PersistedRole.Class` object", [
				{name: "object", type: "Object"},
			],
			{type: "boolean"}
		), ():void => {
			expect( PersistedRole.Factory.is ).toBeDefined();
			expect( Utils.isFunction( PersistedRole.Factory.is ) ).toBe( true );

			let object:any;


			object = {};
			expect( PersistedRole.Factory.is( object ) ).toBe( false );

			object = {
				_roles: null,
				name: null,
				agents: null,
				listAgents: ():void => {},
				getAgents: ():void => {},
			};
			expect( PersistedRole.Factory.is( object ) ).toBe( false );

			object = Role.Factory.createFrom( object, "Role name" );
			expect( PersistedRole.Factory.is( object ) ).toBe( true );
		} );

		it( hasMethod(
			STATIC,
			"decorate",
			"Decorates the object provided with the methods and properties of a `Carbon.Auth.PersistedRole.Class` object.", [
				{name: "object", type: "T extends Object"},
			],
			{type: "T & Carbon.Auth.PersistedRole.Class"}
		), ():void => {
			expect( PersistedRole.Factory.decorate ).toBeDefined();
			expect( Utils.isFunction( PersistedRole.Factory.decorate ) ).toBe( true );

			class MockedContext extends AbstractContext {
				resolve( uri:string ):string {
					return URI.Util.resolve( "http://example.com/", uri );
				}
			}
			let context:AbstractContext = new MockedContext();

			class MockRoles extends Roles.Class {}
			let roles:Roles.Class = new MockRoles( context );

			interface ThePersistedRole {
				myProperty?:string;
			}
			interface MyPersistedRole extends PersistedRole.Class, ThePersistedRole {}

			let object:Object = {name: "Role Name"};
			let role:MyPersistedRole;
			role = PersistedRole.Factory.decorate<ThePersistedRole>( object, roles );

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
					resolve( uri:string ):string {
						return URI.Util.resolve( "http://example.com/", uri );
					}
				}
				let context:AbstractContext = new MockedContext();

				class MockRoles extends Roles.Class {}
				roles = new MockRoles( context );

				role = PersistedRole.Factory.decorate( Role.Factory.create( "Role Name" ), roles );
				role.id = "http://example.com/roles/a-role/";
			} );

			it( hasMethod(
				INSTANCE,
				"listAgents",
				"Retrieves an array of unresolved pointers for all the agents of the role.", [
					{name: "requestOptions", type: "Carbon.HTTP.Request.Options", optional: true},
				],
				{type: "Promise<[ Carbon.Auth.PersistedRole.Class, Carbon.HTTP.Response.Class ]>"}
			), ():void => {
				expect( role.listAgents ).toBeDefined();
				expect( Utils.isFunction( role.listAgents ) ).toBe( true );

				let spy:jasmine.Spy = spyOn( roles, "listAgents" );

				role.listAgents();
				expect( spy ).toHaveBeenCalledWith( "http://example.com/roles/a-role/", undefined );

				let options:HTTP.Request.Options = {timeout: 5050};
				role.listAgents( options );
				expect( spy ).toHaveBeenCalledWith( "http://example.com/roles/a-role/", options );

				role = PersistedRole.Factory.decorate( Role.Factory.create( "Role Name" ), null );
				expect( () => role.listAgents() ).toThrowError( Errors.IllegalStateError );
			} );

			describe( method(
				INSTANCE,
				"getAgents"
			), ():void => {

				it( isDefined(), ():void => {
					expect( role.getAgents ).toBeDefined();
					expect( Utils.isFunction( role.getAgents ) ).toBe( true );

					role = PersistedRole.Factory.decorate( Role.Factory.create( "Role Name" ), null );
					expect( () => role.getAgents() ).toThrowError( Errors.IllegalStateError );
				} );

				it( hasSignature(
					"Retrieves an array of resolved pointers for all the agents of the role.", [
						{name: "requestOptions", type: "Carbon.HTTP.Request.Options", optional: true},
					],
					{type: "Promise<[ carbon.Auth.PersistedRole.Class, Carbon.HTTP.Response.Class ]>"}
				), ():void => {
					let spy:jasmine.Spy = spyOn( roles, "getAgents" );

					role.getAgents();
					expect( spy ).toHaveBeenCalledWith( "http://example.com/roles/a-role/", undefined, undefined );

					let options:HTTP.Request.Options = {timeout: 5050};
					role.getAgents( options );
					expect( spy ).toHaveBeenCalledWith( "http://example.com/roles/a-role/", options, undefined );
				} );

				it( hasSignature(
					"Retrieves an array of resolved pointers for the agents of the role, in accordance of the retrievalPreferences provided.", [
						{name: "retrievalPreferences", type: "Carbon.RetrievalPreferences.Class", optional: true, description: "An object that specify the retrieval preferences for the request."},
						{name: "requestOptions", type: "Carbon.HTTP.Request.Options", optional: true},
					],
					{type: "Promise<[ carbon.Auth.PersistedRole.Class, Carbon.HTTP.Response.Class ]>"}
				), ():void => {
					let spy:jasmine.Spy = spyOn( roles, "getAgents" );

					role.getAgents();
					expect( spy ).toHaveBeenCalledWith( "http://example.com/roles/a-role/", undefined, undefined );

					let retrievalPreferences:RetrievalPreferences.Class = {
						limit: 10,
						offset: 0,
						orderBy: [ {"@id": "http://example.com/ns#string", "@type": "string"} ],
					};
					role.getAgents( retrievalPreferences );
					expect( spy ).toHaveBeenCalledWith( "http://example.com/roles/a-role/", retrievalPreferences, undefined );

					let options:HTTP.Request.Options = {timeout: 5050};
					role.getAgents( retrievalPreferences, options );
					expect( spy ).toHaveBeenCalledWith( "http://example.com/roles/a-role/", retrievalPreferences, options );

				} );
			} );

		} );

	} );

} );
