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
import * as Errors from "./../Errors";
import * as HTTP from "./../HTTP";
import * as PersistedApp from "./../PersistedApp";

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
	});

	describe( clazz(
		"Carbon.App.Roles.Class",
		"Class for manage roles of an application."
	), ():void => {
		let roles:Roles.Class;
		let appContext:AppContext;
		let parentContext:AbstractContext;

		beforeEach( ():void => {
			let app:PersistedApp.Class  = <any> {
				rootContainer: {
					id: "http://example.com/apps/example-app/"
				}
			};
			class MockedContext extends AbstractContext {
				resolve( uri:string ) {
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
		});

		it( isDefined(), ():void => {
			expect( Roles.Class ).toBeDefined();
			expect( Utils.isFunction( Roles.Class ) ).toBe( true );
		});

		it( hasConstructor([
			{ name: "appContext", type: "Carbon.App.Context" }
		]), ():void => {
			expect( roles ).toBeTruthy();
			expect( roles instanceof Roles.Class ).toBe( true );
		});

		it( extendsClass( "Carbon.Auth.Roles" ), ():void => {
			expect( roles instanceof AuthRoles.Class );
		});

		describe( method(
			INSTANCE,
			"createChild"
		), ():void => {

			it( isDefined(), ():void => {
				expect( roles.createChild ).toBeDefined();
				expect( Utils.isFunction( roles.createChild ) ).toBe( true );
			});

			it( hasSignature(
				"Persists the AppRole provided with the slug, if specified, as a childRole of the parentRole specified.\n" +
				"Returns a Promise with a Pointer for the stored role; and a tuple of two responses, the first one is the response of the creation, and the second one is the response of the creation of the relation parent-child of the roles.", [
					{ name: "parentRole", type: "string | Carbon.Pointer.Class", description: "The role that will be assigned as the parent of the role that wants to persist." },
					{ name: "role", type: "Carbon.App.Roles.Class", description: "The appRole that wants to persist." },
					{ name: "slug", type: "string", optional: true, description: "The slug where the role will be persisted." },
					{ name: "requestOptions", type: "Carbon.HTTP.Request.Options", optional: true, description: "The slug where the role will be persisted." },
				],
				{ type: "Promise<[ Carbon.Pointer.Class, [ Carbon.HTTP.Response.Class, Carbon.HTTP.Response.Class] ]>" }
			), ( done:{ ():void, fail:() => void } ):void => {
				let spy = spyOn( AuthRoles.Class.prototype, "createChild" );

				let role = AppRole.Factory.create( "App Role" );
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
				});
			});

			it( hasSignature(
				"Persists the AppRole provided as a childRole of the parentRole specified.\n" +
				"Returns a Promise with a Pointer for the stored role; and a tuple of two responses, the first one is the response of the creation, and the second one is the response of the creation of the relation parent-child of the roles.", [
					{ name: "parentRole", type: "string | Carbon.Pointer.Class", description: "The role that will be assigned as the parent of the role that wants to persist." },
					{ name: "role", type: "Carbon.App.Roles.Class", description: "The appRole that wants to persist." },
					{ name: "requestOptions", type: "Carbon.HTTP.Request.Options", optional: true, description: "The slug where the role will be persisted." },
				],
				{ type: "Promise<[ Carbon.Pointer.Class, [ Carbon.HTTP.Response.Class, Carbon.HTTP.Response.Class] ]>" }
			), ( done:{ ():void, fail:() => void } ):void => {
				let spy = spyOn( AuthRoles.Class.prototype, "createChild" );

				let role = AppRole.Factory.create( "App Role" );
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
				});
			});

		});

		it( hasMethod(
			INSTANCE,
			"get",
			"Retrieves a role from the current context."
		), ( done:{ ():void, fail:() => void } ):void => {
			expect( roles.get ).toBeDefined();
			expect( Utils.isFunction( roles.get ) );

			let falseRole:PersistedRole.Class;
			let spy = spyOn( AuthRoles.Class.prototype, "get" ).and.callFake( () => {
				return Promise.resolve( [ falseRole, null ] );
			});

			let spies = {
				success: ( [ pointer, response ]:[ PersistedRole.Class, HTTP.Response.Class ] ):void => {
					expect( pointer ).toBeTruthy();
					expect( PersistedRole.Factory.is( pointer ) ).toBe( true );
					expect( pointer.id ).toBe( "http://example.com/roles/a-role/" );
				},
				error: function( error:Error ):void {
					expect( error instanceof Errors.IllegalArgumentError );
				}
			};

			let spySuccess = spyOn( spies, "success" ).and.callThrough();
			let spyError = spyOn( spies, "error" ).and.callThrough();

			let promises:Promise<any>[] = [];
			let promise:Promise<any>;

			falseRole = PersistedRole.Factory.decorate( AppRole.Factory.create( "Role Name" ) );
			falseRole.id = "http://example.com/roles/a-role/";

			promise = roles.get( "http://example.com/roles/a-role/" );
			expect( promise instanceof Promise ).toBe( true );
			promise.then( spies.success ).then( () => {

				falseRole = PersistedRole.Factory.decorate( AppRole.Factory.create( "Role Name" ) );
				falseRole.types = [];

				promise = roles.get( "http://example.com/roles/a-role/" );
				expect( promise instanceof Promise ).toBe( true );
				promises.push( promise.catch( spies.error ) );

				Promise.all( promises ).then( ():void => {
					expect( spySuccess ).toHaveBeenCalledTimes( 1 );
					expect( spyError ).toHaveBeenCalledTimes( 1 );
					expect( spy ).toHaveBeenCalledTimes( 2 );
					done();
				}).catch( done.fail );
			});
		});

	});

	it( hasDefaultExport(
		"Carbon.App.Roles.Class"
	), ():void => {
		expect( DefaultExport ).toBeDefined();
		expect( DefaultExport ).toBe( Roles.Class );
	})

});