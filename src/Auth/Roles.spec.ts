import {
	INSTANCE,
	STATIC,

	module,
	clazz,
	method,

	isDefined,
	hasSignature,
	reexports,
	hasDefaultExport,
	hasConstructor,
} from "./../test/JasmineExtender";
import AbstractContext from "./../AbstractContext";
import * as Errors from "./../Errors";
import * as Pointer from "./../Pointer";
import * as Role from "./Role";
import * as HTTP from "./../HTTP";
import * as URI from "./../RDF/URI";
import * as Utils from "./../Utils";


import * as Roles from "./Roles";
import DefaultExport from "./Roles";

describe( module( "Carbon/Auth/Roles" ), ():void => {

	it( isDefined(), ():void => {
		expect( Roles ).toBeDefined();
		expect( Utils.isObject( Roles ) ).toBe( true );
	} );

	describe( clazz(
		"Carbon.Auth.Roles.Class",
		"Class for manage roles of an application."
	), ():void => {
		let roles:Roles.Class;
		let context:AbstractContext;

		beforeEach( ():void => {
			class MockedContext extends AbstractContext {
				resolve( uri:string ):string {
					return URI.Util.resolve( "http://example.com/", uri );
				}
			}
			context = new MockedContext();

			class MockRoles extends Roles.Class {}
			roles = new MockRoles( context );

			jasmine.Ajax.install();
		} );

		afterEach( ():void => {
			jasmine.Ajax.uninstall();
		} );

		it( isDefined(), ():void => {
			expect( Roles.Class ).toBeDefined();
			expect( Utils.isFunction( Roles.Class ) ).toBe( true );
		} );

		it( hasConstructor( [
			{name: "context", type: "Carbon.Context"},
		] ), ():void => {
			expect( roles ).toBeTruthy();
			expect( roles instanceof Roles.Class ).toBe( true );
		} );

		describe( method(
			INSTANCE,
			"createChild"
		), ():void => {

			it( hasSignature(
				[ "T extends Carbon.Auth.Roles.Class" ],
				"Persists the Role provided with the slug, if specified, as a childRole of the parentRole specified.\n" +
				"Returns a Promise with a Pointer for the stored role; and a tuple of two responses, the first one is the response of the creation, and the second one is the response of the creation of the relation parent-child of the roles.", [
					{name: "parentRole", type: "string | Carbon.Pointer.Class", description: "The role that will be assigned as the parent of the role that wants to persist."},
					{name: "role", type: "T", description: "The appRole that wants to persist."},
					{name: "slug", type: "string", optional: true, description: "The slug where the role will be persisted."},
					{name: "requestOptions", type: "Carbon.HTTP.Request.Options", optional: true, description: "The slug where the role will be persisted."},
				],
				{type: "Promise<[ T & Carbon.PersistedDocument.Class, [ Carbon.HTTP.Response.Class, Carbon.HTTP.Response.Class] ]>"}
			), ( done:{ ():void, fail:() => void } ):void => {
				expect( roles.createChild ).toBeDefined();
				expect( Utils.isFunction( roles.createChild ) ).toBe( true );

				jasmine.Ajax.stubRequest( "http://example.com/roles/parent/no-found/" ).andReturn( {
					status: 404,
				} );
				jasmine.Ajax.stubRequest( "http://example.com/roles/parent/" ).andReturn( {
					status: 200,
				} );
				jasmine.Ajax.stubRequest( "http://example.com/roles/" ).andReturn( {
					status: 200,
					responseHeaders: {
						"Location": "http://example.com/roles/new-role/",
					},
				} );

				let spies:any = {
					success: ( [ pointer, [ response1, response2 ] ]:[ Pointer.Class, [ HTTP.Response.Class, HTTP.Response.Class ] ] ):void => {
						expect( pointer ).toBeTruthy();
						expect( Pointer.Factory.is( pointer ) ).toBe( true );
						expect( pointer.id ).toBe( "http://example.com/roles/new-role/" );

						expect( response1 ).toBeTruthy();
						expect( response1 instanceof HTTP.Response.Class ).toBe( true );

						expect( response2 ).toBeTruthy();
						expect( response2 instanceof HTTP.Response.Class ).toBe( true );

					},
					error: function( error:Error ):void {
						expect( error instanceof Errors.IllegalArgumentError );
					},
				};

				let spyError:jasmine.Spy = spyOn( spies, "error" ).and.callThrough();
				let spySuccess:jasmine.Spy = spyOn( spies, "success" ).and.callThrough();


				roles.createChild( "http://example.com/roles/parent/", Role.Factory.create( "Role name" ) ).then( done.fail ).catch( ( error:Error ) => {
					expect( error instanceof Errors.IllegalStateError ).toBe( true );
					context.setSetting( "platform.roles.container", "roles/" );

					let promises:Promise<any>[] = [];
					let promise:Promise<any>;

					promise = roles.createChild( "parent/", Role.Factory.create( "Role name" ), "new-role" );
					expect( promise instanceof Promise ).toBe( true );
					promises.push( promise.then( spies.success ) );

					promise = roles.createChild( "http://example.com/roles/parent/", Role.Factory.create( "Role name" ) );
					expect( promise instanceof Promise ).toBe( true );
					promises.push( promise.then( spies.success ) );

					promise = roles.createChild( "parent/no-found/", Role.Factory.create( "Role name" ), "new-role" );
					expect( promise instanceof Promise ).toBe( true );
					promises.push( promise.catch( spies.error ) );

					Promise.all( promises ).then( ():void => {
						let requests:JasmineAjaxRequest[] = jasmine.Ajax.requests.filter( /roles\/$/ );
						expect( requests.length ).toBe( 2 );
						expect( requests[ 0 ].requestHeaders[ "slug" ] ).toBe( "new-role" );
						expect( requests[ 1 ].requestHeaders[ "slug" ] ).toBeUndefined();

						expect( spySuccess ).toHaveBeenCalledTimes( 2 );
						expect( spyError ).toHaveBeenCalledTimes( 1 );
						done();
					} ).catch( done.fail );

				} );

			} );

			it( hasSignature(
				[ "T extends Carbon.Auth.Roles.Class" ],
				"Persists the Role provided as a childRole of the parentRole specified.\n" +
				"Returns a Promise with a Pointer for the stored role; and a tuple of two responses, the first one is the response of the creation, and the second one is the response of the creation of the relation parent-child of the roles.", [
					{name: "parentRole", type: "string | Carbon.Pointer.Class", description: "The role that will be assigned as the parent of the role that wants to persist."},
					{name: "role", type: "T", description: "The appRole that wants to persist."},
					{name: "requestOptions", type: "Carbon.HTTP.Request.Options", optional: true, description: "The slug where the role will be persisted."},
				],
				{type: "Promise<[ T & Carbon.PersistedDocument.Class, [ Carbon.HTTP.Response.Class, Carbon.HTTP.Response.Class] ]>"}
			), ( done:{ ():void, fail:() => void } ):void => {
				expect( roles.createChild ).toBeDefined();
				expect( Utils.isFunction( roles.createChild ) ).toBe( true );

				jasmine.Ajax.stubRequest( "http://example.com/roles/parent/no-found/" ).andReturn( {
					status: 404,
				} );
				jasmine.Ajax.stubRequest( "http://example.com/roles/parent/" ).andReturn( {
					status: 200,
				} );
				jasmine.Ajax.stubRequest( "http://example.com/roles/" ).andReturn( {
					status: 200,
					responseHeaders: {
						"Location": "http://example.com/roles/new-role/",
					},
				} );

				let spies:any = {
					success: ( [ pointer, [ response1, response2 ] ]:[ Pointer.Class, [ HTTP.Response.Class, HTTP.Response.Class ] ] ):void => {
						expect( pointer ).toBeTruthy();
						expect( Pointer.Factory.is( pointer ) ).toBe( true );
						expect( pointer.id ).toBe( "http://example.com/roles/new-role/" );

						expect( response1 ).toBeTruthy();
						expect( response1 instanceof HTTP.Response.Class ).toBe( true );

						expect( response2 ).toBeTruthy();
						expect( response2 instanceof HTTP.Response.Class ).toBe( true );

					},
					error: function( error:Error ):void {
						expect( error instanceof Errors.IllegalArgumentError );
					},
				};

				let spyError:jasmine.Spy = spyOn( spies, "error" ).and.callThrough();
				let spySuccess:jasmine.Spy = spyOn( spies, "success" ).and.callThrough();
				let spyCreate:jasmine.Spy = spyOn( context.documents, "createChild" ).and.callThrough();

				roles.createChild( "http://example.com/roles/parent/", Role.Factory.create( "Role name" ) ).then( done.fail ).catch( ( error:Error ) => {
					expect( error instanceof Errors.IllegalStateError ).toBe( true );
					context.setSetting( "platform.roles.container", "roles/" );

					let promises:Promise<any>[] = [];
					let promise:Promise<any>;
					let options:HTTP.Request.Options = {
						timeout: 5555,
					};

					promise = roles.createChild( "parent/", Role.Factory.create( "Role name" ), options );
					expect( promise instanceof Promise ).toBe( true );
					promises.push( promise.then( spies.success ) );

					promise = roles.createChild( "http://example.com/roles/parent/", Role.Factory.create( "Role name" ) );
					expect( promise instanceof Promise ).toBe( true );
					promises.push( promise.then( spies.success ) );

					promise = roles.createChild( "parent/no-found/", Role.Factory.create( "Role name" ), options );
					expect( promise instanceof Promise ).toBe( true );
					promises.push( promise.catch( spies.error ) );

					Promise.all( promises ).then( ():void => {
						expect( spySuccess ).toHaveBeenCalledTimes( 2 );
						expect( spyError ).toHaveBeenCalledTimes( 1 );

						expect( spyCreate ).toHaveBeenCalledTimes( 2 );
						expect( spyCreate ).toHaveBeenCalledWith( "http://example.com/roles/", jasmine.anything(), null, options );
						expect( spyCreate ).toHaveBeenCalledWith( "http://example.com/roles/", jasmine.anything(), null, undefined );
						done();
					} ).catch( done.fail );

				} );

			} );

		} );

	} );

	it( hasDefaultExport(
		"Carbon.Auth.Roles.Class"
	), ():void => {
		expect( DefaultExport ).toBeDefined();
		expect( DefaultExport ).toBe( Roles.Class );
	} );

} );
