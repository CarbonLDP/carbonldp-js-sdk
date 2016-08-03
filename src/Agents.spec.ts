import * as Agents from "./Agents";
import DefaultExport from "./Agents";

import * as Agent from "./Agent";

import {
	INSTANCE,
	STATIC,

	module,
	clazz,
	method,

	isDefined,
	hasMethod,
	hasSignature,
	hasDefaultExport,
	hasConstructor,
} from "./test/JasmineExtender";
import * as Utils from "./Utils";
import * as Errors from "./Errors";
import AbstractContext from "./AbstractContext";

describe( module( "Carbon/Agents" ), ():void => {

	it( isDefined(), ():void => {
		expect( Agents ).toBeDefined();
		expect( Utils.isObject( Agents ) ).toBe( true );
	} );

	describe( clazz(
		"Carbon.Agents.Class",
		"Class to manage the Agents of a determined context."
	), ():void => {

		it( isDefined(), ():void => {
			expect( Agents.Class ).toBeDefined();
			expect( Utils.isFunction( Agents.Class ) ).toBe( true );
		} );

		it( hasConstructor(), ():void => {
			let agents:Agents.Class;
			let context:AbstractContext;

			class MockedContext extends AbstractContext {
				resolve( uri:string ) {
					return "http://example.com/container/" + uri;
				}
			}
			context = new MockedContext();
			agents = new Agents.Class( context );

			expect( agents ).toBeTruthy();
			expect( agents instanceof Agents.Class ).toBe( true );
		} );

		it( hasMethod(
			INSTANCE,
			"create",
			"Persists a `Carbon.Agent.Class` object using the slug specified.\n" +
			"Returns a Promise with a Pointer to the stored Agent, and the response of the request.",
			[
				{ name: "agentDocument", type: "Carbon.Agents.Agent.Class" },
				{ name: "slug", type: "string", optional: true },
			],
			{ type: "Promise<Carbon.Pointer.Class, Carbon.HTTP.Response.Class>" }
		), ( done:() => void ):void => {
			let agents:Agents.Class;
			let context:AbstractContext;

			class MockedContext extends AbstractContext {
				resolve( uri:string ) {
					return "http://example.com/container/" + uri;
				}
			}
			context = new MockedContext();
			agents = new Agents.Class( context );

			expect( agents.create ).toBeDefined();
			expect( Utils.isFunction( agents.create ) ).toBe( true );

			let promise:Promise<any>;
			let spy = spyOn( context.documents, "createChild" );
			let agent:Agent.Class = Agent.Factory.create( "Agent name", "email.of.agent@example.com", "myAwesomePassword" );

			expect( () => agents.create( agent ) ).toThrowError( Errors.IllegalStateError );
			context.setSetting( "platform.agents.container", "agents/" );

			agents.create( agent );
			expect( spy ).toHaveBeenCalledWith( "http://example.com/container/agents/", agent, null );

			agents.create( agent, "agentSlug" );
			expect( spy ).toHaveBeenCalledWith( "http://example.com/container/agents/", agent, "agentSlug" );

			spy.calls.reset();
			agents.create( agent, null );
			expect( spy ).toHaveBeenCalledWith( "http://example.com/container/agents/", agent, null );

			promise = agents.create( null, "agentSlug" );
			expect( promise instanceof Promise ).toBe( true );

			let spies = {
				onError: function( error ):void {
					expect( error instanceof Errors.IllegalArgumentError );
				}
			};
			spy = spyOn( spies, "onError" ).and.callThrough();
			promise = promise.catch( spies.onError );

			Promise.all( [ promise ] ).then( ():void => {
				expect( spy ).toHaveBeenCalled();
				done();
			} );
		} );

	} );

	it( hasDefaultExport(
		"Carbon.Agents.Class"
	), ():void => {
		expect( DefaultExport ).toBeDefined();
		expect( DefaultExport ).toBe( Agents.Class );
	} )

} );
