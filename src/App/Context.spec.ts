import {
	INSTANCE,

	module,
	clazz,

	isDefined,
	hasConstructor,
	hasProperty,
	hasMethod,
	extendsClass,
	hasDefaultExport,
} from "./../test/JasmineExtender";

import AbstractContext from "./../AbstractContext";
import * as App from "./../App";
import * as Auth from "./Auth";
import Documents from "./../Documents";
import * as NS from "./../NS";
import PersistedApp from "./../PersistedApp";
import * as Pointer from "./../Pointer";
import * as Utils from "./../Utils";

import * as AppContext from "./Context";
import DefaultExport from "./Context";

describe( module( "Carbon/App/Context" ), ():void => {

	describe( clazz(
		"Carbon.App.Context",
		"Class that represents de scope of a CarbonLDP Application."
	), ():void => {
		let parentContext:AbstractContext;
		let appContext:AppContext.Class;

		beforeEach( ():void => {
			class MockedContext extends AbstractContext {
				resolve( uri:string ):string {
					return uri;
				}
			}
			parentContext = new MockedContext();
			let app:PersistedApp = <any> App.Factory.create( "App name", "App description" );
			app.rootContainer = <any> Pointer.Factory.create( "http://example.com/apps/example-app/" );
			appContext = new AppContext.Class( parentContext, app );

			jasmine.Ajax.install();
		} );

		afterEach( ():void => {
			jasmine.Ajax.uninstall();
		} );

		it( isDefined(), ():void => {
			expect( AppContext.Class ).toBeDefined();
			expect( Utils.isFunction( AppContext.Class ) );
		} );

		it( hasConstructor( [
			{ name: "parentContext", type: "Carbon.Context.Class" },
			{ name: "app", type: "Carbon.App.Context" },
		] ), ():void => {
			expect( appContext ).toBeTruthy();
			expect( appContext instanceof AppContext.Class );
		} );

		it( "Extends Factory decorators of documents instance", ( done:{ ():void, fail:() => void } ):void => {
			let promises:Promise<any>[] = [];
			let promise:Promise<any>;

			// Requests data
			jasmine.Ajax.stubRequest( "http://example.com/apps/example-app/a-role/", null, "GET" ).andReturn( {
				status: 200,
				responseHeaders: {
					"ETag": "\"123456789\"",
				},
				responseText: `{
					"@id": "http://example.com/apps/example-app/a-role/",
					"@graph": [
						{
							"@id": "http://example.com/apps/example-app/a-role/",
							"@type": [ "${ NS.CS.Class.AppRole }" ],
							"${ NS.CS.Predicate.namae }": "A Role"
						}
					]
				}`,
			} );
			let appDocuments:Documents = appContext.documents;

			expect( appDocuments.documentDecorators.has( NS.CS.Class.ProtectedDocument ) ).toBe( true );
			expect( appDocuments.documentDecorators.has( NS.CS.Class.AccessControlList ) ).toBe( true );
			expect( appDocuments.documentDecorators.has( NS.CS.Class.Agent ) ).toBe( true );

			// The one added by this context
			expect( appDocuments.documentDecorators.has( NS.CS.Class.AppRole ) ).toBe( true );

			promise = appDocuments.get<App.PersistedRole.Class>( "http://example.com/apps/example-app/a-role/" ).then( ( [ role, response ]:[ App.PersistedRole.Class, any ] ) => {
				expect( App.PersistedRole.Factory.is( role ) ).toBe( true );
				expect( role._roles ).toBe( appContext.auth.roles );

				expect( response ).toBeDefined();
			} );
			promises.push( promise );

			Promise.all( promises ).then( done ).catch( done.fail );
		} );

		it( extendsClass(
			"Carbon.AbstractContext.Class"
		), ():void => {
			expect( appContext instanceof AbstractContext );
		} );

		it( hasProperty(
			INSTANCE,
			"auth",
			"Carbon.App.Auth.Class",
			"Instance of `Carbon.App.Auth.Class` class for manage the auth inside of an application."
		), ():void => {
			expect( appContext.auth ).toBeDefined();
			expect( appContext.auth instanceof Auth.Class ).toBe( true );
		} );

		it( hasProperty(
			INSTANCE,
			"app",
			"Carbon.App.Class",
			"The Document that represents the CarbonLDP Application."
		), ():void => {
			expect( appContext.app ).toBeDefined();
			expect( App.Factory.is( appContext.app ) ).toBe( true );
		} );

		it( hasMethod(
			INSTANCE,
			"resolve",
			"Resolve the URI provided in the scope of the application.", [
				{ name: "uri", type: "string" },
			],
			{ type: "string" }
		), ():void => {
			expect( appContext.resolve( "/child/" ) ).toBe( "http://example.com/apps/example-app/child/" );

			expect( appContext.resolve( "/child-another/grandchild/" ) )
				.toBe( "http://example.com/apps/example-app/child-another/grandchild/" );
			expect( appContext.resolve( "http://example.com/apps/another-app/child/" ) )
				.toBe( "http://example.com/apps/another-app/child/" );
		} );

	} );

	it( hasDefaultExport( "Carbon.App.Context.Class" ), ():void => {
		expect( DefaultExport ).toBeDefined();
		expect( DefaultExport ).toBe( AppContext.Class );
	} );

} );
