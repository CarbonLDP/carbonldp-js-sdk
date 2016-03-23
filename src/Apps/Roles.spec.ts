import * as Roles from "./Roles";
import DefaultExport from "./Roles";

import * as Role from "./Roles/Role";

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
import * as Utils from "./../Utils";
import * as Errors from "./../Errors";
import AbstractContext from "./../AbstractContext";
import * as App from "./../App";
import * as Document from "./../Document";
import * as PersistedDocument from "./../PersistedDocument";
import * as PersistedContainer from "./../LDP/PersistedContainer";
import * as Pointer from "./../Pointer";

describe( module( "Carbon/Roles" ), ():void => {

	it( isDefined(), ():void => {
		expect( Roles ).toBeDefined();
		expect( Utils.isObject( Roles ) ).toBe( true );
	});

	describe( clazz(
		"Carbon.Apps.Roles.Class",
		"Class for manage Roles of a determined context."
	), ():void => {

		it( isDefined(), ():void => {
			expect( Roles.Class ).toBeDefined();
			expect( Utils.isFunction( Roles.Class ) ).toBe( true );
		});

		it( hasConstructor([
			{ name: "appContext", type: "Carbon.App.Context" }
		]), ():void => {
			let roles:Roles.Class;
			let app:App.Class;
			let context:AbstractContext;
			let appContext:App.Context;

			app = <App.Class> Document.Factory.create( "http://example.com/platform/apps/example-app/" );
			app.rootContainer = PersistedContainer.Factory.decorate(
				<PersistedDocument.Class> Pointer.Factory.create( "http://example.com/apps/example-app/" )
			);
			class MockedContext extends AbstractContext {
				resolve( uri:string ) {
					return "http://example.com/platform/" + uri;
				}
			}
			context = new MockedContext();
			appContext = new App.Context( context, app );

			roles = new Roles.Class( appContext );

			expect( roles ).toBeTruthy();
			expect( roles instanceof Roles.Class ).toBe( true );
		});

		describe( method(
			INSTANCE,
			"create"
		), ():void => {

			it( hasSignature(
				"Persists an Role Document in the server, generating a random unique slug.\n" +
				"Returns a Promise with a Pointer for the stored Role, and the response of the call.", [
					{ name: "agentDocument", type: "Carbon.Apps.Roles.Role.Class" }
				],
				{ type: "Promise<Carbon.Pointer.Class, Carbon.HTTP.Response.Class>" }
			), ( done ):void => {
				let roles:Roles.Class;
				let app:App.Class;
				let context:AbstractContext;
				let appContext:App.Context;

				app = <App.Class> Document.Factory.create( "http://example.com/platform/apps/example-app/" );
				app.rootContainer = PersistedContainer.Factory.decorate(
					<PersistedDocument.Class> Pointer.Factory.create( "http://example.com/apps/example-app/" )
				);
				class MockedContext extends AbstractContext {
					resolve( uri:string ) {
						return uri;
					}
				}
				context = new MockedContext();
				appContext = new App.Context( context, app );

				roles = new Roles.Class( appContext );

				expect( roles.create ).toBeDefined();
				expect( Utils.isFunction( roles.create ) ).toBe( true );

				let spy = spyOn( appContext.documents, "createChild" );
				let role:Role.Class = Role.Factory.create( "Role name" );

				expect( () => roles.create( role ) ).toThrowError( Errors.IllegalStateError );
				context.setSetting( "platform.apps.roles.container", "roles/" );

				roles.create( role );
				expect( spy ).toHaveBeenCalledWith( "http://example.com/apps/example-app/roles/", role );

				let promise:Promise<any>;
				promise = roles.create( null );
				expect( promise instanceof Promise ).toBe( true );

				let spies = {
					onError: function( error:Error ):void {
						expect( error instanceof Errors.IllegalArgumentError );
					}
				};
				spy = spyOn( spies, "onError" ).and.callThrough();
				promise = promise.catch( spies.onError );

				Promise.all( [promise] ).then( ():void => {
					expect( spy ).toHaveBeenCalled();
					done();
				});
			});

			it( hasSignature(
				"Persists an Role Document in the server using the slug specified.\n" +
				"Returns a Promise with a Pointer for the stored Role, and the response of the call.", [
					{ name: "slug", type: "string" },
					{ name: "agentDocument", type: "Carbon.Apps.Roles.Role.Class" }
				],
				{ type: "Promise<Carbon.Pointer.Class, Carbon.HTTP.Response.Class>" }
			), ( done:() => void ):void => {
				let roles:Roles.Class;
				let app:App.Class;
				let context:AbstractContext;
				let appContext:App.Context;

				app = <App.Class> Document.Factory.create( "http://example.com/platform/apps/example-app/" );
				app.rootContainer = PersistedContainer.Factory.decorate(
					<PersistedDocument.Class> Pointer.Factory.create( "http://example.com/apps/example-app/" )
				);
				class MockedContext extends AbstractContext {
					resolve( uri:string ) {
						return uri;
					}
				}
				context = new MockedContext();
				appContext = new App.Context( context, app );

				roles = new Roles.Class( appContext );

				expect( roles.create ).toBeDefined();
				expect( Utils.isFunction( roles.create ) ).toBe( true );

				let promise:Promise<any>;
				let spy = spyOn( appContext.documents, "createChild" );
				let role:Role.Class = Role.Factory.create( "Role name" );

				expect( () => roles.create( "agentSlug", role ) ).toThrowError( Errors.IllegalStateError );
				context.setSetting( "platform.apps.roles.container", "roles/" );

				roles.create( "agentSlug", role );
				expect( spy ).toHaveBeenCalledWith( "http://example.com/apps/example-app/roles/", "agentSlug", role );

				spy.calls.reset();
				roles.create( null, role );
				expect( spy ).toHaveBeenCalledWith( "http://example.com/apps/example-app/roles/", role );

				promise = roles.create( "agentSlug", null );
				expect( promise instanceof Promise ).toBe( true );

				let spies = {
					onError: function( error ):void {
						expect( error instanceof Errors.IllegalArgumentError );
					}
				};
				spy = spyOn( spies, "onError" ).and.callThrough();
				promise = promise.catch( spies.onError );

				Promise.all( [promise] ).then( ():void => {
					expect( spy ).toHaveBeenCalled();
					done();
				});
			});

		});

	});

	it( reexports(
		STATIC,
		"Role",
		"Carbon/Roles/Role"
	), ():void => {
		expect( Roles.Role ).toBeDefined();
		expect( Roles.Role ).toBe( Role );
	});

	it( hasDefaultExport(
		"Carbon.Apps.Roles.Class"
	), ():void => {
		expect( DefaultExport ).toBeDefined();
		expect( DefaultExport ).toBe( Roles.Class );
	})

});