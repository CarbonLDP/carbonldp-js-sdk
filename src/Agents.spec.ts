import * as Agents from "./Agents";
import DefaultExport from "./Agents";

import * as Agent from "./Agents/Agent";

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
} from "./test/JasmineExtender";
import * as Utils from "./Utils";
import * as Errors from "./Errors";
import AbstractContext from "./AbstractContext";

describe( module( "Carbon/Agents" ), ():void => {

	it( isDefined(), ():void => {
		expect( Agents ).toBeDefined();
		expect( Utils.isObject( Agents ) ).toBe( true );
	});

	describe( clazz(
		"Carbon.Agents.Class",
		"Class for manage Agents of a determined context."
	), ():void => {

		it( isDefined(), ():void => {
			expect( Agents.Class ).toBeDefined();
			expect( Utils.isFunction( Agents.Class ) ).toBe( true );
		});

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
		});

		describe( method(
			INSTANCE,
			"createAgent"
		), ():void => {

			it( hasSignature(
				"Persists an Agent Document in the server, generating a random unique slug.\n" +
				"Returns a Promise with a Pointer for the stored Agent, and the response of the call.", [
					{ name: "agentDocument", type: "Carbon.Agents.Agent.Class" }
				],
				{ type: "Promise<Carbon.Pointer.Class, Carbon.HTTP.Response.Class>" }
			), ( done ):void => {
				let agents:Agents.Class;
				let context:AbstractContext;

				class MockedContext extends AbstractContext {
					resolve( uri:string ) {
						return "http://example.com/container/" + uri;
					}
				}
				context = new MockedContext();
				agents = new Agents.Class( context );

				expect( agents.createAgent ).toBeDefined();
				expect( Utils.isFunction( agents.createAgent ) ).toBe( true );

				let spy = spyOn( context.documents, "createChild" );
				let agent:Agent.Class = Agent.Factory.create( "Agent name", "email.of.agent@example.com", "myAwesomePassword");

				expect( () => agents.createAgent( agent ) ).toThrowError( Errors.IllegalStateError );
				context.setSetting( "platform.agents.container", "agents/" );

				agents.createAgent( agent );
				expect( spy ).toHaveBeenCalledWith( "http://example.com/container/agents/", agent );

				let promise:Promise<any>;
				promise = agents.createAgent( null );
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
				"Persists an Agent Document in the server using the slug specified.\n" +
				"Returns a Promise with a Pointer for the stored Agent, and the response of the call.", [
					{ name: "slug", type: "string" },
					{ name: "agentDocument", type: "Carbon.Agents.Agent.Class" }
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

				expect( agents.createAgent ).toBeDefined();
				expect( Utils.isFunction( agents.createAgent ) ).toBe( true );

				let promise:Promise<any>;
				let spy = spyOn( context.documents, "createChild" );
				let agent:Agent.Class = Agent.Factory.create( "Agent name", "email.of.agent@example.com", "myAwesomePassword" );

				expect( () => agents.createAgent( "agentSlug", agent ) ).toThrowError( Errors.IllegalStateError );
				context.setSetting( "platform.agents.container", "agents/" );

				agents.createAgent( "agentSlug", agent );
				expect( spy ).toHaveBeenCalledWith( "http://example.com/container/agents/", "agentSlug", agent );

				spy.calls.reset();
				agents.createAgent( null, agent );
				expect( spy ).toHaveBeenCalledWith( "http://example.com/container/agents/", agent );

				promise = agents.createAgent( "agentSlug", null );
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
		"Agent",
		"Carbon/Agents/Agent"
	), ():void => {
		expect( Agents.Agent ).toBeDefined();
		expect( Agents.Agent ).toBe( Agent );
	});

	it( hasDefaultExport(
		"Carbon.Agents.Class"
	), ():void => {
		expect( DefaultExport ).toBeDefined();
		expect( DefaultExport ).toBe( Agents.Class );
	})

});
