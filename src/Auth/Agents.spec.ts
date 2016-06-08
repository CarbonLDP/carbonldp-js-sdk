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
	hasSignature,
	hasDefaultExport,
	hasConstructor,
	hasMethod,
} from "./../test/JasmineExtender";
import * as Utils from "./../Utils";
import * as Errors from "./../Errors";
import * as HTTP from "./../HTTP";
import AbstractContext from "./../AbstractContext";

describe( module( "Carbon/Auth/Agents" ), ():void => {

	it( isDefined(), ():void => {
		expect( Agents ).toBeDefined();
		expect( Utils.isObject( Agents ) ).toBe( true );
	});

	describe( clazz(
		"Carbon.Auth.Agents.Class",
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
			"register"
		), ():void => {

			it( hasSignature(
				"Persists an Agent Document in the server, generating a random unique slug.\n" +
				"Returns a Promise with a Pointer for the stored Agent, and the response of the call.", [
					{ name: "agentDocument", type: "Carbon.Auth.Agents.Agent.Class" }
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

				expect( agents.register ).toBeDefined();
				expect( Utils.isFunction( agents.register ) ).toBe( true );

				let spy = spyOn( context.documents, "createChild" );
				let agent:Agent.Class = Agent.Factory.create( "Agent name", "email.of.agent@example.com", "myAwesomePassword");

				agents.register( agent ).then( done.fail ).catch( error => {
					expect( error instanceof  Errors.IllegalStateError ).toBe( true );
					context.setSetting( "platform.agents.container", "agents/" );

					let promises:Promise<any>[] = [];
					let promise:Promise<any>;

					promise = agents.register( agent );
					expect( promise instanceof Promise ).toBe( true );
					promises.push( promise );

					promise = agents.register( null );
					expect( promise instanceof Promise ).toBe( true );
					promises.push( promise.catch( ( error:Error ) => {
						expect( error instanceof Errors.IllegalArgumentError );
					}));

					Promise.all( promises ).then( ():void => {
						expect( spy ).toHaveBeenCalledWith( "http://example.com/container/agents/", agent );
						done();
					});
				});
			});

			it( hasSignature(
				"Persists an Agent Document in the server using the slug specified.\n" +
				"Returns a Promise with a Pointer for the stored Agent, and the response of the call.", [
					{ name: "slug", type: "string" },
					{ name: "agentDocument", type: "Carbon.Auth.Agents.Agent.Class" }
				],
				{ type: "Promise<Carbon.Pointer.Class, Carbon.HTTP.Response.Class>" }
			), ( done:{ ():void, fail:() => void } ):void => {
				let agents:Agents.Class;
				let context:AbstractContext;

				class MockedContext extends AbstractContext {
					resolve( uri:string ) {
						return "http://example.com/container/" + uri;
					}
				}
				context = new MockedContext();
				agents = new Agents.Class( context );

				expect( agents.register ).toBeDefined();
				expect( Utils.isFunction( agents.register ) ).toBe( true );

				let spy = spyOn( context.documents, "createChild" );
				let agent:Agent.Class = Agent.Factory.create( "Agent name", "email.of.agent@example.com", "myAwesomePassword" );

				agents.register( "agentSlug", agent ).then( done.fail ).catch( error => {
					expect( error instanceof  Errors.IllegalStateError ).toBe( true );
					context.setSetting( "platform.agents.container", "agents/" );

					let promises:Promise<any>[] = [];
					let promise:Promise<any>;

					promise = agents.register( "agentSlug", agent );
					expect( promise instanceof Promise ).toBe( true );
					promises.push( promise );

					agents.register( null, agent );
					expect( promise instanceof Promise ).toBe( true );
					promises.push( promise );

					promise = agents.register( "agentSlug", null );
					expect( promise instanceof Promise ).toBe( true );
					promises.push( promise.catch( ( error:Error ) => {
						expect( error instanceof Errors.IllegalArgumentError );
					}));

					Promise.all( promises ).then( ():void => {
						expect( spy ).toHaveBeenCalledWith( "http://example.com/container/agents/", "agentSlug", agent );
						expect( spy ).toHaveBeenCalledWith( "http://example.com/container/agents/", agent );
						expect( spy ).toHaveBeenCalled();
						done();
					});
				});

			});

		});

		it( hasMethod(
			INSTANCE,
			"get",
			"Retrieves the agent specified from the current context.", [
				{ name: "agentURI", type: "string", description: "The URI of the agent to retrieve." },
				{ name: "requestOptions", type: "Carbon.HTTP.Request.Options", optional: true }
			],
			{ type: "Promise<[ Carbon.Auth.PersistedAgent.Class, Carbon.HTTP.Response.Class ]>" }
		), ( done:{ ():void, fail:() => void } ) => {
			let agents:Agents.Class;
			let context:AbstractContext;

			class MockedContext extends AbstractContext {
				resolve( uri:string ) {
					return "http://example.com/" + uri;
				}
			}
			context = new MockedContext();
			agents = new Agents.Class( context );

			expect( agents.get ).toBeDefined();
			expect( Utils.isFunction( agents.get ) ).toBe( true );

			let promise:Promise<any>;

			let options:HTTP.Request.Options = { timeout: 5555 };
			let spy = spyOn( context.documents, "get" ).and.returnValue( Promise.resolve() );

			promise = agents.get( "http://example.com/agents/an-agent/" );
			expect( promise instanceof Promise ).toBe( true );

			promise.then( done.fail ).catch( ( error:Error ) => {
				expect( error instanceof  Errors.IllegalStateError ).toBe( true );
				context.setSetting( "platform.agents.container", "agents/" );

				let promises:Promise<any>[] = [];
				let promise:Promise<any>;

				promise = agents.get( "http://example.com/agents/an-agent/" );
				expect( promise instanceof Promise ).toBe( true );
				promises.push( promise );

				promise = agents.get( "http://example.com/agents/another-agent/", options );
				expect( promise instanceof Promise ).toBe( true );
				promises.push( promise );

				promise = agents.get( "http://example.com/agents/another-another-agent/" );
				expect( promise instanceof Promise ).toBe( true );
				promises.push( promise );

				promise = agents.get( "http://example.com/not-an-agents/resource/" );
				expect( promise instanceof Promise ).toBe( true );
				promises.push( promise.catch( ( error:Error ) => {
					expect( error instanceof Errors.IllegalArgumentError ).toBe( true );
				}));

				Promise.all( promises ).then( () => {
					expect( spy ).toHaveBeenCalledWith( "http://example.com/agents/another-another-agent/", undefined );
					expect( spy ).toHaveBeenCalledWith( "http://example.com/agents/another-agent/", options );
					expect( spy ).toHaveBeenCalledWith( "http://example.com/agents/an-agent/", undefined );
					done();
				}).catch( done.fail );
			});

		});

	});

	it( hasDefaultExport(
		"Carbon.Auth.Agents.Class"
	), ():void => {
		expect( DefaultExport ).toBeDefined();
		expect( DefaultExport ).toBe( Agents.Class );
	})

});
