import {
	INSTANCE,

	module,
	clazz,

	isDefined,
	hasDefaultExport,
	hasConstructor,
	hasMethod, extendsClass,
} from "./../test/JasmineExtender";
import AbstractContext from "./../AbstractContext";
import * as AuthAgents from "./../Auth/Agents";
import AppContext from "./Context";
import PersistedApp from "./../PersistedApp";
import * as Utils from "./../Utils";

import * as AppAgents from "./Agents";
import DefaultExport from "./Agents";

describe( module( "Carbon/App/Agents" ), ():void => {

	it( isDefined(), ():void => {
		expect( AppAgents ).toBeDefined();
		expect( Utils.isObject( AppAgents ) ).toBe( true );
	} );

	describe( clazz(
		"Carbon.App.Agents.Class",
		"Class for manage Agents of an application context."
	), ():void => {

		it( isDefined(), ():void => {
			expect( AppAgents.Class ).toBeDefined();
			expect( Utils.isFunction( AppAgents.Class ) ).toBe( true );
		} );

		it( hasConstructor( [
			{ name: "context", type: "Carbon.App.Context.Class", description: "The application context where to manage its Agents." },
		] ), ():void => {
			let app:PersistedApp = <any> {
				rootContainer: {
					id: "http://example.com/apps/example-app/",
				},
			};
			class MockedContext extends AbstractContext {
				resolve( uri:string ):string {
					return uri;
				}
			}
			let parentContext:AbstractContext = new MockedContext();
			let appContext:AppContext = new AppContext( parentContext, app );
			let agents:AppAgents.Class = new AppAgents.Class( appContext );

			expect( agents ).toBeTruthy();
			expect( agents instanceof AppAgents.Class ).toBe( true );
		} );

		it( extendsClass( "Carbon.Auth.Agents.Class" ), ():void => {
			let app:PersistedApp = <any> {
				rootContainer: {
					id: "http://example.com/apps/example-app/",
				},
			};
			class MockedContext extends AbstractContext {
				resolve( uri:string ):string {
					return uri;
				}
			}
			let parentContext:AbstractContext = new MockedContext();
			let appContext:AppContext = new AppContext( parentContext, app );
			let agents:AppAgents.Class = new AppAgents.Class( appContext );

			expect( agents instanceof AppAgents.Class ).toBe( true );
			expect( agents instanceof AuthAgents.Class ).toBe( true );
		} );

		it( hasMethod(
			INSTANCE,
			"get",
			"Retrieves the application agent specified from the current application context.", [
				{ name: "agentURI", type: "string", description: "The URI of the application agent to retrieve." },
				{ name: "requestOptions", type: "Carbon.HTTP.Request.Options", optional: true, description: "Customizable options for the request." },
			],
			{ type: "Promise<[ Carbon.App.PersistedAgent.Class, Carbon.HTTP.Response.Class ]>" }
		), () => {
			let app:PersistedApp = <any> {
				rootContainer: {
					id: "http://example.com/apps/example-app/",
				},
			};
			class MockedContext extends AbstractContext {
				resolve( uri:string ):string {
					return uri;
				}
			}
			let parentContext:AbstractContext = new MockedContext();
			let appContext:AppContext = new AppContext( parentContext, app );
			let agents:AppAgents.Class = new AppAgents.Class( appContext );

			expect( agents.get ).toBeDefined();
			expect( Utils.isFunction( agents.get ) ).toBe( true );

			let spy:jasmine.Spy = spyOn( AuthAgents.Class.prototype, "get" );

			agents.get( "http://example.com/apps/example-app/agents/an-agent/" );
			expect( spy ).toHaveBeenCalledWith( "http://example.com/apps/example-app/agents/an-agent/", undefined );
		} );

	} );

	it( hasDefaultExport(
		"Carbon.App.Agents.Class"
	), ():void => {
		expect( DefaultExport ).toBeDefined();
		expect( DefaultExport ).toBe( AppAgents.Class );
	} );

} );
