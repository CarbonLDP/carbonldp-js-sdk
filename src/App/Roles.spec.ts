import {
	INSTANCE,

	module,
	clazz,
	method,

	isDefined,
	hasSignature,
	hasDefaultExport,
	hasConstructor,
	extendsClass,
	hasMethod,
} from "./../test/JasmineExtender";
import * as Utils from "./../Utils";
import AbstractContext from "./../AbstractContext";
import Documents from "./../Documents";
import * as Errors from "./../Errors";
import * as HTTP from "./../HTTP";
import * as PersistedApp from "./../PersistedApp";
import * as PersistedDocument from "./../PersistedDocument";

import AppContext from "./Context";
import * as AppRole from "./Role";
import * as PersistedRole from "./PersistedRole";
import * as AuthRoles from "./../Auth/Roles";

import * as Roles from "./Roles";
import DefaultExport from "./Roles";

describe( module( "Carbon/App/Roles" ), ():void => {

	it( isDefined(), ():void => {
		expect( Roles ).toBeDefined();
		expect( Utils.isObject( Roles ) ).toBe( true );
	} );

	describe( clazz(
		"Carbon.App.Roles.Class",
		"Class for manage roles of an application."
	), ():void => {
		let roles:Roles.Class;
		let appContext:AppContext;
		let parentContext:AbstractContext;

		beforeEach( ():void => {
			let app:PersistedApp.Class = <any> {
				rootContainer: {
					id: "http://example.com/apps/example-app/",
				},
			};
			class MockedContext extends AbstractContext {
				resolve( uri:string ):string {
					return uri;
				}
			}
			parentContext = new MockedContext();
			appContext = new AppContext( parentContext, app );


			class MockedRoles extends Roles.Class {
				constructor( context:AppContext ) {
					super( context );
				}
			}
			roles = new MockedRoles( appContext );
		} );

		it( isDefined(), ():void => {
			expect( Roles.Class ).toBeDefined();
			expect( Utils.isFunction( Roles.Class ) ).toBe( true );
		} );

		it( hasConstructor( [
			{ name: "appContext", type: "Carbon.App.Context" },
		] ), ():void => {
			expect( roles ).toBeTruthy();
			expect( roles instanceof Roles.Class ).toBe( true );
		} );

		it( extendsClass( "Carbon.Auth.Roles.Class" ), ():void => {
			expect( roles instanceof AuthRoles.Class );
		} );

		describe( method(
			INSTANCE,
			"createChild"
		), ():void => {

			it( isDefined(), ():void => {
				expect( roles.createChild ).toBeDefined();
				expect( Utils.isFunction( roles.createChild ) ).toBe( true );
			} );

			it( hasSignature(
				[ "T" ],
				"Persists the AppRole provided with the slug, if specified, as a childRole of the parentRole specified.\n" +
				"Returns a Promise with a Pointer for the stored role; and a tuple of two responses, the first one is the response of the creation, and the second one is the response of the creation of the relation parent-child of the roles.", [
					{ name: "parentRole", type: "string | Carbon.Pointer.Class", description: "The role that will be assigned as the parent of the role that wants to persist." },
					{ name: "role", type: "T & Carbon.App.Roles.Class", description: "The appRole that wants to persist." },
					{ name: "slug", type: "string", optional: true, description: "The slug where the role will be persisted." },
					{ name: "requestOptions", type: "Carbon.HTTP.Request.Options", optional: true, description: "The slug where the role will be persisted." },
				],
				{ type: "Promise<[ T & Carbon.App.PersistedRole.Class, [ Carbon.HTTP.Response.Class, Carbon.HTTP.Response.Class] ]>" }
			), ( done:{ ():void, fail:() => void } ):void => {
				let spy:jasmine.Spy = spyOn( AuthRoles.Class.prototype, "createChild" );

				let role:AppRole.Class = AppRole.Factory.create( "App Role" );
				roles.createChild( "http://example.com/role/parent/", role );
				roles.createChild( "http://example.com/role/parent/", role, "child-role" );
				roles.createChild( "http://example.com/role/parent/", role, "child-role", { timeout: 5050 } );

				expect( spy ).toHaveBeenCalledTimes( 3 );
				expect( spy ).toHaveBeenCalledWith( "http://example.com/role/parent/", role, undefined, undefined );
				expect( spy ).toHaveBeenCalledWith( "http://example.com/role/parent/", role, "child-role", undefined );
				expect( spy ).toHaveBeenCalledWith( "http://example.com/role/parent/", role, "child-role", { timeout: 5050 } );

				let promise:Promise<any> = roles.createChild( "http://example.com/role/parent/", <any> {}, "child-role" );
				expect( promise instanceof Promise ).toBe( true );
				promise.then( done.fail ).catch( ( error:Error ) => {
					expect( error instanceof Errors.IllegalArgumentError ).toBe( true );
					done();
				} );
			} );

			it( hasSignature(
				[ "T" ],
				"Persists the AppRole provided as a childRole of the parentRole specified.\n" +
				"Returns a Promise with a Pointer for the stored role; and a tuple of two responses, the first one is the response of the creation, and the second one is the response of the creation of the relation parent-child of the roles.", [
					{ name: "parentRole", type: "string | Carbon.Pointer.Class", description: "The role that will be assigned as the parent of the role that wants to persist." },
					{ name: "role", type: "T & Carbon.App.Roles.Class", description: "The appRole that wants to persist." },
					{ name: "requestOptions", type: "Carbon.HTTP.Request.Options", optional: true, description: "The slug where the role will be persisted." },
				],
				{ type: "Promise<[ T & Carbon.App.PersistedRole.Class, [ Carbon.HTTP.Response.Class, Carbon.HTTP.Response.Class] ]>" }
			), ( done:{ ():void, fail:() => void } ):void => {
				let spy:jasmine.Spy = spyOn( AuthRoles.Class.prototype, "createChild" );

				let role:AppRole.Class = AppRole.Factory.create( "App Role" );
				roles.createChild( "http://example.com/role/parent/", role );
				roles.createChild( "http://example.com/role/parent/", role, { timeout: 5050 } );

				expect( spy ).toHaveBeenCalledTimes( 2 );
				expect( spy ).toHaveBeenCalledWith( "http://example.com/role/parent/", role, undefined, undefined );
				expect( spy ).toHaveBeenCalledWith( "http://example.com/role/parent/", role, { timeout: 5050 }, undefined );

				let promise:Promise<any> = roles.createChild( "http://example.com/role/parent/", <any> {} );
				expect( promise instanceof Promise ).toBe( true );
				promise.then( done.fail ).catch( ( error:Error ) => {
					expect( error instanceof Errors.IllegalArgumentError ).toBe( true );
					expect( error.message ).toBe( "The role is not a valid `Carbon.App.Role.Class` object." );
					done();
				} );
			} );

		} );

		describe( method(
			INSTANCE,
			"createChildren"
		), ():void => {

			it( isDefined(), ():void => {
				expect( roles.createChildren ).toBeDefined();
				expect( Utils.isFunction( roles.createChildren ) ).toBe( true );
			} );

			it( hasSignature(
				[ "T" ],
				"Persists multiple new application roles as children member of the parent role specified.", [
					{ name: "parentRole", type: "string | Carbon.Pointer.Class", description: "The role that will be assigned as the parent of the roles to persist." },
					{ name: "roles", type: "(T & Carbon.App.Roles.Class)[]", description: "The roles to persist." },
					{ name: "slugs", type: "string[]", optional: true, description: "Array with the slugs that corresponds to each object in `roles` parameter, in the order in which they were defined. If an element in the array is undefined or null, the slug will be generated by the platform." },
					{ name: "requestOptions", type: "Carbon.HTTP.Request.Options", optional: true, description: "Customizable options for every create request." },
				],
				{ type: "Promise<[ (T & Carbon.App.PersistedRole.Class)[], Carbon.HTTP.Response.Class[] ]>", description: "Promise with the array of persisted but UNRESOLVED roles, and an array with the the responses of all the request made, which are the creation requests and an add member request for the parent role at the end." }
			), ( done:{ ():void, fail:() => void } ):void => {
				let spy:jasmine.Spy = spyOn( AuthRoles.Class.prototype, "createChildren" );

				let newRoles:AppRole.Class[] = [ AppRole.Factory.create( "App Role" ), AppRole.Factory.create( "App Role" ), AppRole.Factory.create( "App Role" ) ];
				let slugs:string[] = [ "child-role-01", "child-role-02", "child-role-03" ];
				roles.createChildren( "http://example.com/role/parent/", newRoles );
				roles.createChildren( "http://example.com/role/parent/", newRoles, slugs );
				roles.createChildren( "http://example.com/role/parent/", newRoles, slugs, { timeout: 5050 } );

				expect( spy ).toHaveBeenCalledTimes( 3 );
				expect( spy ).toHaveBeenCalledWith( "http://example.com/role/parent/", newRoles, undefined, undefined );
				expect( spy ).toHaveBeenCalledWith( "http://example.com/role/parent/", newRoles, slugs, undefined );
				expect( spy ).toHaveBeenCalledWith( "http://example.com/role/parent/", newRoles, slugs, { timeout: 5050 } );

				let promise:Promise<any> = roles.createChildren( "http://example.com/role/parent/", [ AppRole.Factory.create( "App Role" ) , <any> {} ], slugs );
				expect( promise instanceof Promise ).toBe( true );
				promise.then( done.fail ).catch( ( error:Error ) => {
					expect( error instanceof Errors.IllegalArgumentError ).toBe( true );
					done();
				} );
			} );

			it( hasSignature(
				[ "T" ],
				"Persists multiple new application roles as children member of the parent role specified.", [
					{ name: "parentRole", type: "string | Carbon.Pointer.Class", description: "The role that will be assigned as the parent of the roles to persist." },
					{ name: "roles", type: "(T & Carbon.App.Roles.Class)[]", description: "The roles to persist." },
					{ name: "requestOptions", type: "Carbon.HTTP.Request.Options", optional: true, description: "Customizable options for every create request." },
				],
				{ type: "Promise<[ (T & Carbon.App.PersistedRole.Class)[], Carbon.HTTP.Response.Class[] ]>", description: "Promise with the array of persisted but UNRESOLVED roles, and an array with the the responses of all the request made, which are the creation requests and an add member request for the parent role at the end." }
			), ( done:{ ():void, fail:() => void } ):void => {
				let spy:jasmine.Spy = spyOn( AuthRoles.Class.prototype, "createChildren" );

				let newRoles:AppRole.Class[] = [ AppRole.Factory.create( "App Role" ), AppRole.Factory.create( "App Role" ), AppRole.Factory.create( "App Role" ) ];
				roles.createChildren( "http://example.com/role/parent/", newRoles );
				roles.createChildren( "http://example.com/role/parent/", newRoles, { timeout: 5050 } );

				expect( spy ).toHaveBeenCalledTimes( 2 );
				expect( spy ).toHaveBeenCalledWith( "http://example.com/role/parent/", newRoles, undefined, undefined );
				expect( spy ).toHaveBeenCalledWith( "http://example.com/role/parent/", newRoles, { timeout: 5050 }, undefined );

				let promise:Promise<any> = roles.createChildren( "http://example.com/role/parent/", [ AppRole.Factory.create( "App Role" ), <any> {} ] );
				expect( promise instanceof Promise ).toBe( true );
				promise.then( done.fail ).catch( ( error:Error ) => {
					expect( error instanceof Errors.IllegalArgumentError ).toBe( true );
					done();
				} );
			} );

		} );

		describe( method(
			INSTANCE,
			"createChildAndRetrieve"
		), ():void => {

			it( isDefined(), ():void => {
				expect( roles.createChildAndRetrieve ).toBeDefined();
				expect( Utils.isFunction( roles.createChildAndRetrieve ) ).toBe( true );
			} );

			it( hasSignature(
				[ "T" ],
				"Persists the application role provided with the slug, if specified, as a childRole of the parentRole specified and resolves it.\n" +
				"Returns a Promise with a Pointer for the stored role; and a tuple of two responses, the first one is the response of the creation, and the second one is the response of the creation of the relation parent-child of the roles.", [
					{ name: "parentRole", type: "string | Carbon.Pointer.Class", description: "The role that will be assigned as the parent of the role that wants to persist." },
					{ name: "role", type: "T & Carbon.App.Roles.Class", description: "The appRole that wants to persist." },
					{ name: "slug", type: "string", optional: true, description: "The slug where the role will be persisted." },
					{ name: "requestOptions", type: "Carbon.HTTP.Request.Options", optional: true, description: "The slug where the role will be persisted." },
				],
				{ type: "Promise<[ T & Carbon.App.PersistedRole.Class, [ Carbon.HTTP.Response.Class, Carbon.HTTP.Response.Class] ]>" }
			), ( done:{ ():void, fail:() => void } ):void => {
				let spy:jasmine.Spy = spyOn( AuthRoles.Class.prototype, "createChildAndRetrieve" );

				let role:AppRole.Class = AppRole.Factory.create( "App Role" );
				roles.createChildAndRetrieve( "http://example.com/role/parent/", role );
				roles.createChildAndRetrieve( "http://example.com/role/parent/", role, "child-role" );
				roles.createChildAndRetrieve( "http://example.com/role/parent/", role, "child-role", { timeout: 5050 } );

				expect( spy ).toHaveBeenCalledTimes( 3 );
				expect( spy ).toHaveBeenCalledWith( "http://example.com/role/parent/", role, undefined, undefined );
				expect( spy ).toHaveBeenCalledWith( "http://example.com/role/parent/", role, "child-role", undefined );
				expect( spy ).toHaveBeenCalledWith( "http://example.com/role/parent/", role, "child-role", { timeout: 5050 } );

				let promise:Promise<any> = roles.createChildAndRetrieve( "http://example.com/role/parent/", <any> {}, "child-role" );
				expect( promise instanceof Promise ).toBe( true );
				promise.then( done.fail ).catch( ( error:Error ) => {
					expect( error instanceof Errors.IllegalArgumentError ).toBe( true );
					done();
				} );
			} );

			it( hasSignature(
				[ "T" ],
				"Persists the application role provided as a childRole of the parentRole specified and resolves it.\n" +
				"Returns a Promise with a Pointer for the stored role; and a tuple of two responses, the first one is the response of the creation, and the second one is the response of the creation of the relation parent-child of the roles.", [
					{ name: "parentRole", type: "string | Carbon.Pointer.Class", description: "The role that will be assigned as the parent of the role that wants to persist." },
					{ name: "role", type: "T & Carbon.App.Roles.Class", description: "The appRole that wants to persist." },
					{ name: "requestOptions", type: "Carbon.HTTP.Request.Options", optional: true, description: "The slug where the role will be persisted." },
				],
				{ type: "Promise<[ T & Carbon.App.PersistedRole.Class, [ Carbon.HTTP.Response.Class, Carbon.HTTP.Response.Class] ]>" }
			), ( done:{ ():void, fail:() => void } ):void => {
				let spy:jasmine.Spy = spyOn( AuthRoles.Class.prototype, "createChildAndRetrieve" );

				let role:AppRole.Class = AppRole.Factory.create( "App Role" );
				roles.createChildAndRetrieve( "http://example.com/role/parent/", role );
				roles.createChildAndRetrieve( "http://example.com/role/parent/", role, { timeout: 5050 } );

				expect( spy ).toHaveBeenCalledTimes( 2 );
				expect( spy ).toHaveBeenCalledWith( "http://example.com/role/parent/", role, undefined, undefined );
				expect( spy ).toHaveBeenCalledWith( "http://example.com/role/parent/", role, { timeout: 5050 }, undefined );

				let promise:Promise<any> = roles.createChildAndRetrieve( "http://example.com/role/parent/", <any> {} );
				expect( promise instanceof Promise ).toBe( true );
				promise.then( done.fail ).catch( ( error:Error ) => {
					expect( error instanceof Errors.IllegalArgumentError ).toBe( true );
					expect( error.message ).toBe( "The role is not a valid `Carbon.App.Role.Class` object." );
					done();
				} );
			} );

		} );

		describe( method(
			INSTANCE,
			"createChildrenAndRetrieve"
		), ():void => {

			it( isDefined(), ():void => {
				expect( roles.createChildrenAndRetrieve ).toBeDefined();
				expect( Utils.isFunction( roles.createChildrenAndRetrieve ) ).toBe( true );
			} );

			it( hasSignature(
				[ "T" ],
				"Persists and resolves multiple new application roles as children member of the parent role specified.", [
					{ name: "parentRole", type: "string | Carbon.Pointer.Class", description: "The role that will be assigned as the parent of the roles to persist." },
					{ name: "roles", type: "(T & Carbon.App.Roles.Class)[]", description: "The roles to persist." },
					{ name: "slugs", type: "string[]", optional: true, description: "Array with the slugs that corresponds to each object in `roles` parameter, in the order in which they were defined. If an element in the array is undefined or null, the slug will be generated by the platform." },
					{ name: "requestOptions", type: "Carbon.HTTP.Request.Options", optional: true, description: "Customizable options for every create request." },
				],
				{ type: "Promise<[ (T & Carbon.App.PersistedRole.Class)[], [ Carbon.HTTP.Response.Class[], Carbon.HTTP.Response.Class[], Carbon.HTTP.Response.Class ] ]>", description: "Promise with the array of persisted and resolved roles, and an array of the responses of the requests made. The array of response have tree elements: the first one contains an array with the responses of the creation, the second one have another array with the responses of resolving the elements and the third element is the addition as children of the parent role." }
			), ( done:{ ():void, fail:() => void } ):void => {
				let spy:jasmine.Spy = spyOn( AuthRoles.Class.prototype, "createChildrenAndRetrieve" );

				let newRoles:AppRole.Class[] = [ AppRole.Factory.create( "App Role" ), AppRole.Factory.create( "App Role" ), AppRole.Factory.create( "App Role" ) ];
				let slugs:string[] = [ "child-role-01", "child-role-02", "child-role-03" ];
				roles.createChildrenAndRetrieve( "http://example.com/role/parent/", newRoles );
				roles.createChildrenAndRetrieve( "http://example.com/role/parent/", newRoles, slugs );
				roles.createChildrenAndRetrieve( "http://example.com/role/parent/", newRoles, slugs, { timeout: 5050 } );

				expect( spy ).toHaveBeenCalledTimes( 3 );
				expect( spy ).toHaveBeenCalledWith( "http://example.com/role/parent/", newRoles, undefined, undefined );
				expect( spy ).toHaveBeenCalledWith( "http://example.com/role/parent/", newRoles, slugs, undefined );
				expect( spy ).toHaveBeenCalledWith( "http://example.com/role/parent/", newRoles, slugs, { timeout: 5050 } );

				let promise:Promise<any> = roles.createChildrenAndRetrieve( "http://example.com/role/parent/", [ AppRole.Factory.create( "App Role" ) , <any> {} ], slugs );
				expect( promise instanceof Promise ).toBe( true );
				promise.then( done.fail ).catch( ( error:Error ) => {
					expect( error instanceof Errors.IllegalArgumentError ).toBe( true );
					done();
				} );
			} );

			it( hasSignature(
				[ "T" ],
				"Persists and resolves multiple new application roles as children member of the parent role specified.", [
					{ name: "parentRole", type: "string | Carbon.Pointer.Class", description: "The role that will be assigned as the parent of the roles to persist." },
					{ name: "roles", type: "(T & Carbon.App.Roles.Class)[]", description: "The roles to persist." },
					{ name: "requestOptions", type: "Carbon.HTTP.Request.Options", optional: true, description: "Customizable options for every create request." },
				],
				{ type: "Promise<[ (T & Carbon.App.PersistedRole.Class)[], [ Carbon.HTTP.Response.Class[], Carbon.HTTP.Response.Class[], Carbon.HTTP.Response.Class ] ]>", description: "Promise with the array of persisted and resolved roles, and an array of the responses of the requests made. The array of response have tree elements: the first one contains an array with the responses of the creation, the second one have another array with the responses of resolving the elements and the third element is the addition as children of the parent role." }
			), ( done:{ ():void, fail:() => void } ):void => {
				let spy:jasmine.Spy = spyOn( AuthRoles.Class.prototype, "createChildrenAndRetrieve" );

				let newRoles:AppRole.Class[] = [ AppRole.Factory.create( "App Role" ), AppRole.Factory.create( "App Role" ), AppRole.Factory.create( "App Role" ) ];
				roles.createChildrenAndRetrieve( "http://example.com/role/parent/", newRoles );
				roles.createChildrenAndRetrieve( "http://example.com/role/parent/", newRoles, { timeout: 5050 } );

				expect( spy ).toHaveBeenCalledTimes( 2 );
				expect( spy ).toHaveBeenCalledWith( "http://example.com/role/parent/", newRoles, undefined, undefined );
				expect( spy ).toHaveBeenCalledWith( "http://example.com/role/parent/", newRoles, { timeout: 5050 }, undefined );

				let promise:Promise<any> = roles.createChildrenAndRetrieve( "http://example.com/role/parent/", [ AppRole.Factory.create( "App Role" ), <any> {} ] );
				expect( promise instanceof Promise ).toBe( true );
				promise.then( done.fail ).catch( ( error:Error ) => {
					expect( error instanceof Errors.IllegalArgumentError ).toBe( true );
					done();
				} );
			} );

		} );

		it( hasMethod(
			INSTANCE,
			"get",
			"Retrieves a role from the current context.", [
				{ name: "roleURI", type: "string", description: "The URI of the app role to retrieve." },
				{ name: "requestOptions", type: "Carbon.HTTP.Request.Options", optional: true },
			],
			{ type: "Promise<[ Carbon.PersistedRole.Class, Carbon.HTTP.Response.Class ]>" }
		), ( done:{ ():void, fail:() => void } ):void => {
			expect( roles.get ).toBeDefined();
			expect( Utils.isFunction( roles.get ) );

			let falseRole:PersistedRole.Class;
			let spy:jasmine.Spy = spyOn( AuthRoles.Class.prototype, "get" ).and.callFake( () => {
				return Promise.resolve( [ falseRole, null ] );
			} );

			let spies:any = {
				success: ( [ pointer, response ]:[ PersistedRole.Class, HTTP.Response.Class ] ):void => {
					expect( pointer ).toBeTruthy();
					expect( PersistedRole.Factory.is( pointer ) ).toBe( true );
					expect( pointer.id ).toBe( "http://example.com/roles/a-role/" );

					expect( response ).toBeNull();
				},
				error: function( error:Error ):void {
					expect( error instanceof Errors.IllegalArgumentError );
				},
			};

			let spySuccess:jasmine.Spy = spyOn( spies, "success" ).and.callThrough();
			let spyError:jasmine.Spy = spyOn( spies, "error" ).and.callThrough();

			let promises:Promise<any>[] = [];
			let promise:Promise<any>;

			falseRole = PersistedRole.Factory.decorate( PersistedDocument.Factory.decorate( AppRole.Factory.create( "Role Name" ), new Documents() ), roles );
			falseRole.id = "http://example.com/roles/a-role/";

			promise = roles.get( "http://example.com/roles/a-role/" );
			expect( promise instanceof Promise ).toBe( true );
			promise.then( spies.success ).then( () => {

				falseRole = PersistedRole.Factory.decorate( PersistedDocument.Factory.decorate( AppRole.Factory.create( "Role Name" ), new Documents() ), roles );
				falseRole.types = [];

				promise = roles.get( "http://example.com/roles/a-role/" );
				expect( promise instanceof Promise ).toBe( true );
				promises.push( promise.catch( spies.error ) );

				return Promise.all( promises ).then( ():void => {
					expect( spySuccess ).toHaveBeenCalledTimes( 1 );
					expect( spyError ).toHaveBeenCalledTimes( 1 );
					expect( spy ).toHaveBeenCalledTimes( 2 );
				} );

			} ).then( done ).catch( done.fail );
		} );

	} );

	it( hasDefaultExport(
		"Carbon.App.Roles.Class"
	), ():void => {
		expect( DefaultExport ).toBeDefined();
		expect( DefaultExport ).toBe( Roles.Class );
	} );

} );
