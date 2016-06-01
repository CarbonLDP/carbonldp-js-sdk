import {
	INSTANCE,

	module,
	clazz,
	method,

	isDefined,
	hasSignature,
	hasDefaultExport,
	hasConstructor, extendsClass,
} from "./../test/JasmineExtender";
import * as Utils from "./../Utils";
import AbstractContext from "./../AbstractContext";
import * as Errors from "./../Errors";
import * as PersistedApp from "./../PersistedApp";

import AppContext from "./Context";
import * as AppRole from "./Role";
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

	});

	it( hasDefaultExport(
		"Carbon.App.Roles.Class"
	), ():void => {
		expect( DefaultExport ).toBeDefined();
		expect( DefaultExport ).toBe( Roles.Class );
	})

});