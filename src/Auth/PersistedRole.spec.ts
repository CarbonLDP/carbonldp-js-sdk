import {
	STATIC,
	INSTANCE,

	module,
	clazz,
	method,

	isDefined,
	hasMethod,
	decoratedObject,
	hasSignature, interfaze, extendsClass, hasProperty, OBLIGATORY, OPTIONAL,
} from "./../test/JasmineExtender";
import AbstractContext from "../AbstractContext";
import Documents from "./../Documents";
import * as Errors from "./../Errors";
import * as HTTP from "./../HTTP";
import * as RetrievalPreferences from "./../RetrievalPreferences";
import * as Role from "./Role";
import * as Roles from "./Roles";
import * as PersistedDocument from "./../PersistedDocument";
import * as PersistedProtectedDocument from "./../PersistedProtectedDocument";
import * as Pointer from "./../Pointer";
import * as URI from "./../RDF/URI";
import * as Utils from "./../Utils";

import * as PersistedRole from "./PersistedRole";

describe( module( "Carbon/Auth/PersistedRole" ), ():void => {

	it( isDefined(), ():void => {
		expect( PersistedRole ).toBeDefined();
		expect( Utils.isObject( PersistedRole ) ).toBe( true );
	} );

	describe( interfaze(
		"Carbon.App.PersistedRole.Class",
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
			"agents",
			"Carbon.Pointer.Class[]",
			"An array of pointers that references to all the agents that have the current role."
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
					{ name: "requestOptions", type: "Carbon.HTTP.Request.Options", optional: true, description: "Customizable options for the request." },
				],
				{ type: "Promise<[ T & Carbon.Auth.PersistedRole.Class, Carbon.HTTP.Response.Class ]>" }
			), ():void => {} );

			it( hasSignature(
				[ "T extends Carbon.Auth.Roles.Class" ],
				"Persists a new role as a child of the current one.", [
					{ name: "role", type: "T", description: "The role to be persisted." },
					{ name: "requestOptions", type: "Carbon.HTTP.Request.Options", optional: true, description: "Customizable options for the request." },
				],
				{ type: "Promise<[ T & Carbon.Auth.PersistedRole.Class, Carbon.HTTP.Response.Class ]>" }
			), ():void => {} );

		} );

		it( hasMethod(
			OBLIGATORY,
			"listAgents",
			"Retrieves an array of unresolved pointers for all the agents of the role.", [
				{ name: "requestOptions", type: "Carbon.HTTP.Request.Options", optional: true },
			],
			{ type: "Promise<[ Carbon.Auth.PersistedRole.Class, Carbon.HTTP.Response.Class ]>" }
		), ():void => {} );

		describe( method(
			OBLIGATORY,
			"getAgents"
		), ():void => {

			it( hasSignature(
				"Retrieves an array of resolved pointers for all the agents of the role.", [
					{ name: "requestOptions", type: "Carbon.HTTP.Request.Options", optional: true },
				],
				{ type: "Promise<[ carbon.Auth.PersistedRole.Class, Carbon.HTTP.Response.Class ]>" }
			), ():void => {} );

			it( hasSignature(
				"Retrieves an array of resolved pointers for the agents of the role, in accordance of the retrievalPreferences provided.", [
					{ name: "retrievalPreferences", type: "Carbon.RetrievalPreferences.Class", optional: true, description: "An object that specify the retrieval preferences for the request." },
					{ name: "requestOptions", type: "Carbon.HTTP.Request.Options", optional: true },
				],
				{ type: "Promise<[ carbon.Auth.PersistedRole.Class, Carbon.HTTP.Response.Class ]>" }
			), ():void => {} );

		} );

		it( hasMethod(
			OBLIGATORY,
			"addAgent",
			"Makes a relation in the role towards the agents specified.", [
				{ name: "agent", type: "string | Carbon.Pointer.Class", description: "The agents that wants to add to the role." },
				{ name: "requestOptions", type: "Carbon.HTTP.Request.Options", optional: true },
			],
			{ type: "Promise<Carbon.HTTP.Response.Class>" }
		), ():void => {} );

		it( hasMethod(
			OBLIGATORY,
			"addAgents",
			"Makes a relation in the role towards the agents specified.", [
				{ name: "agents", type: "(string | Carbon.Pointer.Class)[]", description: "An array with strings or Pointers that refers to the agents that wants to add to the role." },
				{ name: "requestOptions", type: "Carbon.HTTP.Request.Options", optional: true },
			],
			{ type: "Promise<Carbon.HTTP.Response.Class>" }
		), ():void => {} );

		it( hasMethod(
			OBLIGATORY,
			"removeAgent",
			"Removes the relation in the role towards the agents specified.", [
				{ name: "agent", type: "string | Carbon.Pointer.Class", description: "The agents that wants to be removed from the role." },
				{ name: "requestOptions", type: "Carbon.HTTP.Request.Options", optional: true },
			],
			{ type: "Promise<Carbon.HTTP.Response.Class>" }
		), ():void => {} );

		it( hasMethod(
			OBLIGATORY,
			"removeAgents",
			"Remove the relation in the role towards the agents specified.", [
				{ name: "agents", type: "(string | Carbon.Pointer.Class)[]", description: "An array with strings or Pointers that refers to the agents that wants to be removed from the role." },
				{ name: "requestOptions", type: "Carbon.HTTP.Request.Options", optional: true },
			],
			{ type: "Promise<Carbon.HTTP.Response.Class>" }
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
				agents: null,
				createChild: ():void => {},
				listAgents: ():void => {},
				getAgents: ():void => {},
				addAgent: ():void => {},
				addAgents: ():void => {},
				removeAgent: ():void => {},
				removeAgents: ():void => {},
			};
			expect( PersistedRole.Factory.hasClassProperties( object ) ).toBe( true );

			delete object._roles;
			expect( PersistedRole.Factory.hasClassProperties( object ) ).toBe( false );
			object._roles = null;

			delete object.name;
			expect( PersistedRole.Factory.hasClassProperties( object ) ).toBe( true );
			object.name = null;

			delete object.agents;
			expect( PersistedRole.Factory.hasClassProperties( object ) ).toBe( true );
			object.agents = null;

			delete object.createChild;
			expect( PersistedRole.Factory.hasClassProperties( object ) ).toBe( false );
			object.createChild = ():void => {};

			delete object.listAgents;
			expect( PersistedRole.Factory.hasClassProperties( object ) ).toBe( false );
			object.listAgents = ():void => {};

			delete object.getAgents;
			expect( PersistedRole.Factory.hasClassProperties( object ) ).toBe( false );
			object.getAgents = ():void => {};

			delete object.addAgent;
			expect( PersistedRole.Factory.hasClassProperties( object ) ).toBe( false );
			object.addAgent = ():void => {};

			delete object.addAgents;
			expect( PersistedRole.Factory.hasClassProperties( object ) ).toBe( false );
			object.addAgents = ():void => {};

			delete object.removeAgent;
			expect( PersistedRole.Factory.hasClassProperties( object ) ).toBe( false );
			object.removeAgent = ():void => {};

			delete object.removeAgents;
			expect( PersistedRole.Factory.hasClassProperties( object ) ).toBe( false );
			object.removeAgents = ():void => {};
		} );

		it( hasMethod(
			STATIC,
			"is",
			"Returns true if the object provided is considered a `Carbon.Auth.PersistedRole.Class` object", [
				{ name: "object", type: "Object" },
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
				agents: null,
				createChild: ():void => {},
				listAgents: ():void => {},
				getAgents: ():void => {},
				addAgent: ():void => {},
				addAgents: ():void => {},
				removeAgent: ():void => {},
				removeAgents: ():void => {},
			};
			expect( PersistedRole.Factory.is( object ) ).toBe( false );

			object = Role.Factory.createFrom( object, "Role name" );
			expect( PersistedRole.Factory.is( object ) ).toBe( false );

			object = PersistedDocument.Factory.decorate( object, new Documents() );
			expect( PersistedRole.Factory.is( object ) ).toBe( false );

			object = PersistedProtectedDocument.Factory.decorate( object );
			expect( PersistedRole.Factory.is( object ) ).toBe( true );
		} );

		it( hasMethod(
			STATIC,
			"decorate",
			[ "T extends Carbon.PersistedDocument.Class" ],
			"Decorates the object provided with the methods and properties of a `Carbon.Auth.PersistedRole.Class` object.", [
				{ name: "object", type: "T" },
			],
			{ type: "T & Carbon.Auth.PersistedRole.Class" }
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

			let document:PersistedDocument.Class = PersistedDocument.Factory.createFrom( { name: "Role Name" }, "", new Documents() );
			let role:MyPersistedRole = PersistedRole.Factory.decorate<ThePersistedRole & PersistedDocument.Class>( document, roles );

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

				role = PersistedRole.Factory.decorate( PersistedDocument.Factory.decorate( Role.Factory.create( "Role Name" ), new Documents() ), roles );
				role.id = "http://example.com/roles/a-role/";
			} );

			describe( method(
				INSTANCE,
				"createChild"
			), ():void => {

				it( isDefined(), ():void => {
					expect( role.listAgents ).toBeDefined();
					expect( Utils.isFunction( role.listAgents ) ).toBe( true );
				} );

				it( hasSignature(
					[ "T extends Carbon.Auth.Roles.Class" ],
					"Persists a new role with the slug specified as a child of the current role.", [
						{ name: "role", type: "T", description: "The role to be persisted." },
						{ name: "slug", type: "string", optional: true, description: "The slug that will be used in the child role URI." },
						{ name: "requestOptions", type: "Carbon.HTTP.Request.Options", optional: true, description: "Customizable options for the request." },
					],
					{ type: "Promise<[ T & Carbon.Auth.PersistedRole.Class, Carbon.HTTP.Response.Class ]>" }
				), ():void => {
					let spy:jasmine.Spy = spyOn( roles, "createChild" );

					let newRole:Role.Class = Role.Factory.create( "Role Name" );
					let options:HTTP.Request.Options = { timeout: 5050 };

					role.createChild( newRole, "role-slug", options );
					expect( spy ).toHaveBeenCalledWith( "http://example.com/roles/a-role/", newRole, "role-slug", options );

					role.createChild( newRole, "role-slug" );
					expect( spy ).toHaveBeenCalledWith( "http://example.com/roles/a-role/", newRole, "role-slug", undefined );

					role.createChild( newRole );
					expect( spy ).toHaveBeenCalledWith( "http://example.com/roles/a-role/", newRole, undefined, undefined );

					role = PersistedRole.Factory.decorate( PersistedDocument.Factory.decorate( Role.Factory.create( "Role Name" ), new Documents() ), null );
					expect( () => role.createChild( newRole, "role-slug" ) ).toThrowError( Errors.IllegalStateError );
				} );

				it( hasSignature(
					[ "T extends Carbon.Auth.Roles.Class" ],
					"Persists a new role as a child of the current one.", [
						{ name: "role", type: "T", description: "The role to be persisted." },
						{ name: "requestOptions", type: "Carbon.HTTP.Request.Options", optional: true, description: "Customizable options for the request." },
					],
					{ type: "Promise<[ T & Carbon.Auth.PersistedRole.Class, Carbon.HTTP.Response.Class ]>" }
				), ():void => {
					let spy:jasmine.Spy = spyOn( roles, "createChild" );

					let newRole:Role.Class = Role.Factory.create( "Role Name" );
					let options:HTTP.Request.Options = { timeout: 5050 };

					role.createChild( newRole, options );
					expect( spy ).toHaveBeenCalledWith( "http://example.com/roles/a-role/", newRole, options, undefined );

					role.createChild( newRole );
					expect( spy ).toHaveBeenCalledWith( "http://example.com/roles/a-role/", newRole, undefined, undefined );

					role = PersistedRole.Factory.decorate( PersistedDocument.Factory.decorate( Role.Factory.create( "Role Name" ), new Documents() ), null );
					expect( () => role.createChild( newRole ) ).toThrowError( Errors.IllegalStateError );
				} );

			} );

			it( hasMethod(
				INSTANCE,
				"listAgents",
				"Retrieves an array of unresolved pointers for all the agents of the role.", [
					{ name: "requestOptions", type: "Carbon.HTTP.Request.Options", optional: true },
				],
				{ type: "Promise<[ Carbon.Auth.PersistedRole.Class, Carbon.HTTP.Response.Class ]>" }
			), ():void => {
				expect( role.listAgents ).toBeDefined();
				expect( Utils.isFunction( role.listAgents ) ).toBe( true );

				let spy:jasmine.Spy = spyOn( roles, "listAgents" );

				role.listAgents();
				expect( spy ).toHaveBeenCalledWith( "http://example.com/roles/a-role/", undefined );

				let options:HTTP.Request.Options = { timeout: 5050 };
				role.listAgents( options );
				expect( spy ).toHaveBeenCalledWith( "http://example.com/roles/a-role/", options );

				role = PersistedRole.Factory.decorate( PersistedDocument.Factory.decorate( Role.Factory.create( "Role Name" ), new Documents() ), null );
				expect( () => role.listAgents() ).toThrowError( Errors.IllegalStateError );
			} );

			describe( method(
				INSTANCE,
				"getAgents"
			), ():void => {

				it( isDefined(), ():void => {
					expect( role.getAgents ).toBeDefined();
					expect( Utils.isFunction( role.getAgents ) ).toBe( true );

					role = PersistedRole.Factory.decorate( PersistedDocument.Factory.decorate( Role.Factory.create( "Role Name" ), new Documents() ), null );
					expect( () => role.getAgents() ).toThrowError( Errors.IllegalStateError );
				} );

				it( hasSignature(
					"Retrieves an array of resolved pointers for all the agents of the role.", [
						{ name: "requestOptions", type: "Carbon.HTTP.Request.Options", optional: true },
					],
					{ type: "Promise<[ carbon.Auth.PersistedRole.Class, Carbon.HTTP.Response.Class ]>" }
				), ():void => {
					let spy:jasmine.Spy = spyOn( roles, "getAgents" );

					role.getAgents();
					expect( spy ).toHaveBeenCalledWith( "http://example.com/roles/a-role/", undefined, undefined );

					let options:HTTP.Request.Options = { timeout: 5050 };
					role.getAgents( options );
					expect( spy ).toHaveBeenCalledWith( "http://example.com/roles/a-role/", options, undefined );
				} );

				it( hasSignature(
					"Retrieves an array of resolved pointers for the agents of the role, in accordance of the retrievalPreferences provided.", [
						{ name: "retrievalPreferences", type: "Carbon.RetrievalPreferences.Class", optional: true, description: "An object that specify the retrieval preferences for the request." },
						{ name: "requestOptions", type: "Carbon.HTTP.Request.Options", optional: true },
					],
					{ type: "Promise<[ carbon.Auth.PersistedRole.Class, Carbon.HTTP.Response.Class ]>" }
				), ():void => {
					let spy:jasmine.Spy = spyOn( roles, "getAgents" );

					role.getAgents();
					expect( spy ).toHaveBeenCalledWith( "http://example.com/roles/a-role/", undefined, undefined );

					let retrievalPreferences:RetrievalPreferences.Class = {
						limit: 10,
						offset: 0,
						orderBy: [ { "@id": "http://example.com/ns#string", "@type": "string" } ],
					};
					role.getAgents( retrievalPreferences );
					expect( spy ).toHaveBeenCalledWith( "http://example.com/roles/a-role/", retrievalPreferences, undefined );

					let options:HTTP.Request.Options = { timeout: 5050 };
					role.getAgents( retrievalPreferences, options );
					expect( spy ).toHaveBeenCalledWith( "http://example.com/roles/a-role/", retrievalPreferences, options );

				} );
			} );

			it( hasMethod(
				INSTANCE,
				"addAgent",
				"Makes a relation in the role towards the agents specified.", [
					{ name: "agent", type: "string | Carbon.Pointer.Class", description: "The agents that wants to add to the role." },
					{ name: "requestOptions", type: "Carbon.HTTP.Request.Options", optional: true },
				],
				{ type: "Promise<Carbon.HTTP.Response.Class>" }
			), ():void => {
				expect( role.addAgent ).toBeDefined();
				expect( Utils.isFunction( role.addAgent ) ).toBe( true );

				let spy:jasmine.Spy = spyOn( roles, "addAgents" );

				role.addAgent( "http://example.com/agents/an-agent/" );
				expect( spy ).toHaveBeenCalledWith( "http://example.com/roles/a-role/", [ "http://example.com/agents/an-agent/" ], undefined );

				let options:HTTP.Request.Options = { timeout: 5050 };
				role.addAgent( role.getPointer( "http://example.com/agents/another-agent/" ), options );
				expect( spy ).toHaveBeenCalledWith( "http://example.com/roles/a-role/", [ role.getPointer( "http://example.com/agents/another-agent/" ) ], options );

				role = PersistedRole.Factory.decorate( PersistedDocument.Factory.decorate( Role.Factory.create( "Role Name" ), new Documents() ), null );
				expect( () => role.addAgent( "http://example.com/agents/an-agent/" ) ).toThrowError( Errors.IllegalStateError );
			} );

			it( hasMethod(
				INSTANCE,
				"addAgents",
				"Makes a relation in the role towards the agents specified.", [
					{ name: "agents", type: "(string | Carbon.Pointer.Class)[]", description: "An array with strings or Pointers that refers to the agents that wants to add to the role." },
					{ name: "requestOptions", type: "Carbon.HTTP.Request.Options", optional: true },
				],
				{ type: "Promise<Carbon.HTTP.Response.Class>" }
			), ():void => {
				expect( role.addAgents ).toBeDefined();
				expect( Utils.isFunction( role.addAgents ) ).toBe( true );

				let spy:jasmine.Spy = spyOn( roles, "addAgents" );
				let agents:(string | Pointer.Class)[] = [ "http://example.com/agents/an-agent/", role.getPointer( "http://example.com/agents/another-agent/" ) ];

				role.addAgents( agents );
				expect( spy ).toHaveBeenCalledWith( "http://example.com/roles/a-role/", agents, undefined );

				let options:HTTP.Request.Options = { timeout: 5050 };
				role.addAgents( agents, options );
				expect( spy ).toHaveBeenCalledWith( "http://example.com/roles/a-role/", agents, options );

				role = PersistedRole.Factory.decorate( PersistedDocument.Factory.decorate( Role.Factory.create( "Role Name" ), new Documents() ), null );
				expect( () => role.addAgents( agents ) ).toThrowError( Errors.IllegalStateError );
			} );

			it( hasMethod(
				INSTANCE,
				"removeAgent",
				"Removes the relation in the role towards the agents specified.", [
					{ name: "agent", type: "string | Carbon.Pointer.Class", description: "The agents that wants to be removed from the role." },
					{ name: "requestOptions", type: "Carbon.HTTP.Request.Options", optional: true },
				],
				{ type: "Promise<Carbon.HTTP.Response.Class>" }
			), ():void => {
				expect( role.removeAgent ).toBeDefined();
				expect( Utils.isFunction( role.removeAgent ) ).toBe( true );

				let spy:jasmine.Spy = spyOn( roles, "removeAgents" );

				role.removeAgent( "http://example.com/agents/an-agent/" );
				expect( spy ).toHaveBeenCalledWith( "http://example.com/roles/a-role/", [ "http://example.com/agents/an-agent/" ], undefined );

				let options:HTTP.Request.Options = { timeout: 5050 };
				role.removeAgent( role.getPointer( "http://example.com/agents/another-agent/" ), options );
				expect( spy ).toHaveBeenCalledWith( "http://example.com/roles/a-role/", [ role.getPointer( "http://example.com/agents/another-agent/" ) ], options );

				role = PersistedRole.Factory.decorate( PersistedDocument.Factory.decorate( Role.Factory.create( "Role Name" ), new Documents() ), null );
				expect( () => role.removeAgent( "http://example.com/agents/an-agent/" ) ).toThrowError( Errors.IllegalStateError );
			} );

			it( hasMethod(
				INSTANCE,
				"removeAgents",
				"Remove the relation in the role towards the agents specified.", [
					{ name: "agents", type: "(string | Carbon.Pointer.Class)[]", description: "An array with strings or Pointers that refers to the agents that wants to be removed from the role." },
					{ name: "requestOptions", type: "Carbon.HTTP.Request.Options", optional: true },
				],
				{ type: "Promise<Carbon.HTTP.Response.Class>" }
			), ():void => {
				expect( role.removeAgents ).toBeDefined();
				expect( Utils.isFunction( role.removeAgents ) ).toBe( true );

				let spy:jasmine.Spy = spyOn( roles, "removeAgents" );
				let agents:(Pointer.Class | string)[] = [ "http://example.com/agents/an-agent/", role.getPointer( "http://example.com/agents/another-agent/" ) ];

				role.removeAgents( agents );
				expect( spy ).toHaveBeenCalledWith( "http://example.com/roles/a-role/", agents, undefined );

				let options:HTTP.Request.Options = { timeout: 5050 };
				role.removeAgents( agents, options );
				expect( spy ).toHaveBeenCalledWith( "http://example.com/roles/a-role/", agents, options );

				role = PersistedRole.Factory.decorate( PersistedDocument.Factory.decorate( Role.Factory.create( "Role Name" ), new Documents() ), null );
				expect( () => role.addAgents( agents ) ).toThrowError( Errors.IllegalStateError );
			} );

		} );

	} );

} );
