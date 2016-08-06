import {
	INSTANCE,

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
import * as PersistedAgent from "./PersistedAgent";
import * as PersistedDocument from "./../PersistedDocument";
import AbstractContext from "./../AbstractContext";
import * as Agent from "./Agent";

import * as Agents from "./Agents";
import DefaultExport from "./Agents";

describe( module( "Carbon/Auth/Agents" ), ():void => {

	it( isDefined(), ():void => {
		expect( Agents ).toBeDefined();
		expect( Utils.isObject( Agents ) ).toBe( true );
	} );

	describe( clazz(
		"Carbon.Auth.Agents.Class",
		"Class for manage Agents of a determined context."
	), ():void => {

		it( isDefined(), ():void => {
			expect( Agents.Class ).toBeDefined();
			expect( Utils.isFunction( Agents.Class ) ).toBe( true );
		} );

		it( hasConstructor(), ():void => {
			let agents:Agents.Class;
			let context:AbstractContext;

			class MockedContext extends AbstractContext {
				resolve( uri:string ):string {
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
			"register",
			"Persists a `Carbon.Auth.Agent.Class` object using the slug specified.\n" +
			"Returns a Promise with a Pointer to the stored Agent, and the response of the request.",
			[
				{ name: "agentDocument", type: "Carbon.Auth.Agent.Class" },
				{ name: "slug", type: "string", optional: true },
			],
			{ type: "Promise<Carbon.Pointer.Class, Carbon.HTTP.Response.Class>" }
		), ( done:{ ():void, fail:() => void } ):void => {
			let agents:Agents.Class;
			let context:AbstractContext;

			class MockedContext extends AbstractContext {
				resolve( uri:string ):string {
					return "http://example.com/container/" + uri;
				}
			}
			context = new MockedContext();
			agents = new Agents.Class( context );

			expect( agents.register ).toBeDefined();
			expect( Utils.isFunction( agents.register ) ).toBe( true );

			let spy:jasmine.Spy = spyOn( context.documents, "createChild" );
			let agent:Agent.Class = Agent.Factory.create( "Agent name", "email.of.agent@example.com", "myAwesomePassword" );

			agents.register( agent ).then( done.fail ).catch( stateError => {
				expect( stateError instanceof Errors.IllegalStateError ).toBe( true );
				context.setSetting( "platform.agents.container", "agents/" );

				let promises:Promise<any>[] = [];
				let promise:Promise<any>;

				promise = agents.register( agent, "agentSlug" );
				expect( promise instanceof Promise ).toBe( true );
				promises.push( promise );

				agents.register( agent, null );
				expect( promise instanceof Promise ).toBe( true );
				promises.push( promise );

				agents.register( agent );
				expect( promise instanceof Promise ).toBe( true );
				promises.push( promise );

				promise = agents.register( null );
				expect( promise instanceof Promise ).toBe( true );
				promises.push( promise.catch( ( error:Error ) => {
					expect( error instanceof Errors.IllegalArgumentError );
				} ) );

				Promise.all( promises ).then( ():void => {
					expect( spy ).toHaveBeenCalledTimes( 3 );
					expect( spy ).toHaveBeenCalledWith( "http://example.com/container/agents/", agent, "agentSlug" );
					expect( spy ).toHaveBeenCalledWith( "http://example.com/container/agents/", agent, null );
					expect( spy ).not.toHaveBeenCalledWith( "http://example.com/container/agents/", agent );
					done();
				} );
			} );

		} );

		it( hasMethod(
			INSTANCE,
			"get",
			"Retrieves the agent specified from the current context.", [
				{name: "agentURI", type: "string", description: "The URI of the agent to retrieve."},
				{name: "requestOptions", type: "Carbon.HTTP.Request.Options", optional: true},
			],
			{type: "Promise<[ Carbon.Auth.PersistedAgent.Class, Carbon.HTTP.Response.Class ]>"}
		), ( done:{ ():void, fail:() => void } ) => {
			let agents:Agents.Class;
			let context:AbstractContext;

			class MockedContext extends AbstractContext {
				resolve( uri:string ):string {
					return "http://example.com/" + uri;
				}
			}
			context = new MockedContext();
			agents = new Agents.Class( context );

			expect( agents.get ).toBeDefined();
			expect( Utils.isFunction( agents.get ) ).toBe( true );

			let options:HTTP.Request.Options = {timeout: 5555};
			let spy:jasmine.Spy = spyOn( context.documents, "get" ).and.returnValue( Promise.resolve() );

			agents.get( "http://example.com/agents/an-agent/" ).then( done.fail ).catch( ( stateError:Error ) => {
				expect( stateError instanceof Errors.IllegalStateError ).toBe( true );
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
				} ) );

				Promise.all( promises ).then( () => {
					expect( spy ).toHaveBeenCalledWith( "http://example.com/agents/another-another-agent/", undefined );
					expect( spy ).toHaveBeenCalledWith( "http://example.com/agents/another-agent/", options );
					expect( spy ).toHaveBeenCalledWith( "http://example.com/agents/an-agent/", undefined );
					done();
				} ).catch( done.fail );
			} );

		} );

		it( hasMethod(
			INSTANCE,
			"enable",
			"Activate the account of the agent specified.", [
				{name: "agentURI", type: "string", description: "The URI of the agent to be activated."},
				{name: "requestOptions", type: "Carbon.HTTP.Request.Options", optional: true},
			],
			{type: "Promise<[ Carbon.Auth.PersistedAgent.Class, [ Carbon.HTTP.Response.Class, Carbon.HTTP.Response.Class ] ]>"}
		), ( done:{ ():void, fail:() => void } ) => {
			let agents:Agents.Class;
			let context:AbstractContext;

			class MockedContext extends AbstractContext {
				resolve( uri:string ):string {
					return "http://example.com/" + uri;
				}
			}
			context = new MockedContext();
			agents = new Agents.Class( context );

			expect( agents.enable ).toBeDefined();
			expect( Utils.isFunction( agents.enable ) ).toBe( true );

			let options:HTTP.Request.Options = {timeout: 5555};
			let spyGet:jasmine.Spy = spyOn( context.documents, "get" ).and.callFake( ():[ PersistedAgent.Class, HTTP.Response.Class ] => {
				let persistedAgent:PersistedAgent.Class = <any> PersistedDocument.Factory.createFrom( {enabled: false}, "", context.documents );
				return [ persistedAgent, null ];
			} );
			let spySave:jasmine.Spy = spyOn( context.documents, "save" ).and.returnValue( Promise.resolve( [ null, null ] ) );

			agents.enable( "http://example.com/agents/an-agent/" ).then( done.fail ).catch( ( stateError:Error ) => {
				expect( stateError instanceof Errors.IllegalStateError ).toBe( true );
				context.setSetting( "platform.agents.container", "agents/" );

				let promises:Promise<any>[] = [];
				let promise:Promise<any>;

				promise = agents.enable( "http://example.com/agents/an-agent/" );
				expect( promise instanceof Promise ).toBe( true );
				promises.push( promise );

				promise = agents.enable( "http://example.com/agents/another-agent/", options );
				expect( promise instanceof Promise ).toBe( true );
				promises.push( promise );

				promise = agents.enable( "http://example.com/agents/another-another-agent/" );
				expect( promise instanceof Promise ).toBe( true );
				promises.push( promise );

				promise = agents.enable( "http://example.com/not-an-agents/resource/" );
				expect( promise instanceof Promise ).toBe( true );
				promises.push( promise.catch( ( error:Error ) => {
					expect( error instanceof Errors.IllegalArgumentError ).toBe( true );
				} ) );

				Promise.all( promises ).then( () => {
					expect( spyGet.calls.count() ).toBe( 3 );
					expect( spyGet ).toHaveBeenCalledWith( "http://example.com/agents/another-another-agent/", undefined );
					expect( spyGet ).toHaveBeenCalledWith( "http://example.com/agents/another-agent/", options );
					expect( spyGet ).toHaveBeenCalledWith( "http://example.com/agents/an-agent/", undefined );

					expect( spySave.calls.count() ).toBe( 3 );
					for( let call of spySave.calls.all() ) {
						expect( call.args[ 0 ].enabled ).toBe( true );
					}
					done();
				} ).catch( done.fail );
			} );

		} );

		it( hasMethod(
			INSTANCE,
			"disable",
			"Deactivate the account of the agent specified.", [
				{name: "agentURI", type: "string", description: "The URI of the agent to be deactivated."},
				{name: "requestOptions", type: "Carbon.HTTP.Request.Options", optional: true},
			],
			{type: "Promise<[ Carbon.Auth.PersistedAgent.Class, [ Carbon.HTTP.Response.Class, Carbon.HTTP.Response.Class ] ]>"}
		), ( done:{ ():void, fail:() => void } ) => {
			let agents:Agents.Class;
			let context:AbstractContext;

			class MockedContext extends AbstractContext {
				resolve( uri:string ):string {
					return "http://example.com/" + uri;
				}
			}
			context = new MockedContext();
			agents = new Agents.Class( context );

			expect( agents.disable ).toBeDefined();
			expect( Utils.isFunction( agents.disable ) ).toBe( true );

			let options:HTTP.Request.Options = {timeout: 5555};
			let spyGet:jasmine.Spy = spyOn( context.documents, "get" ).and.callFake( ():[ PersistedAgent.Class, HTTP.Response.Class ] => {
				let persistedAgent:PersistedAgent.Class = <any> PersistedDocument.Factory.createFrom( {enabled: true}, "", context.documents );
				return [ persistedAgent, null ];
			} );
			let spySave:jasmine.Spy = spyOn( context.documents, "save" ).and.returnValue( Promise.resolve( [ null, null ] ) );

			agents.disable( "http://example.com/agents/an-agent/" ).then( done.fail ).catch( ( stateError:Error ) => {
				expect( stateError instanceof Errors.IllegalStateError ).toBe( true );
				context.setSetting( "platform.agents.container", "agents/" );

				let promises:Promise<any>[] = [];
				let promise:Promise<any>;

				promise = agents.disable( "http://example.com/agents/an-agent/" );
				expect( promise instanceof Promise ).toBe( true );
				promises.push( promise );

				promise = agents.disable( "http://example.com/agents/another-agent/", options );
				expect( promise instanceof Promise ).toBe( true );
				promises.push( promise );

				promise = agents.disable( "http://example.com/agents/another-another-agent/" );
				expect( promise instanceof Promise ).toBe( true );
				promises.push( promise );

				promise = agents.disable( "http://example.com/not-an-agents/resource/" );
				expect( promise instanceof Promise ).toBe( true );
				promises.push( promise.catch( ( error:Error ) => {
					expect( error instanceof Errors.IllegalArgumentError ).toBe( true );
				} ) );

				Promise.all( promises ).then( () => {
					expect( spyGet.calls.count() ).toBe( 3 );
					expect( spyGet ).toHaveBeenCalledWith( "http://example.com/agents/another-another-agent/", undefined );
					expect( spyGet ).toHaveBeenCalledWith( "http://example.com/agents/another-agent/", options );
					expect( spyGet ).toHaveBeenCalledWith( "http://example.com/agents/an-agent/", undefined );

					expect( spySave.calls.count() ).toBe( 3 );
					for( let call of spySave.calls.all() ) {
						expect( call.args[ 0 ].enabled ).toBe( false );
					}
					done();
				} ).catch( done.fail );
			} );

		} );

		it( hasMethod(
			INSTANCE,
			"delete",
			"Deletes the agent specified.", [
				{name: "agentURI", type: "string", description: "The URI of the agent to be deleted."},
				{name: "requestOptions", type: "Carbon.HTTP.Request.Options", optional: true},
			],
			{type: "Promise<[ Carbon.Auth.PersistedAgent.Class, Carbon.HTTP.Response.Class ]>"}
		), ( done:{ ():void, fail:() => void } ) => {
			let agents:Agents.Class;
			let context:AbstractContext;

			class MockedContext extends AbstractContext {
				resolve( uri:string ):string {
					return "http://example.com/" + uri;
				}
			}
			context = new MockedContext();
			agents = new Agents.Class( context );

			expect( agents.delete ).toBeDefined();
			expect( Utils.isFunction( agents.delete ) ).toBe( true );

			let options:HTTP.Request.Options = {timeout: 5555};
			let spy:jasmine.Spy = spyOn( context.documents, "delete" ).and.returnValue( Promise.resolve() );

			agents.delete( "http://example.com/agents/an-agent/" ).then( done.fail ).catch( ( stateError:Error ) => {
				expect( stateError instanceof Errors.IllegalStateError ).toBe( true );
				context.setSetting( "platform.agents.container", "agents/" );

				let promises:Promise<any>[] = [];
				let promise:Promise<any>;

				promise = agents.delete( "http://example.com/agents/an-agent/" );
				expect( promise instanceof Promise ).toBe( true );
				promises.push( promise );

				promise = agents.delete( "http://example.com/agents/another-agent/", options );
				expect( promise instanceof Promise ).toBe( true );
				promises.push( promise );

				promise = agents.delete( "http://example.com/agents/another-another-agent/" );
				expect( promise instanceof Promise ).toBe( true );
				promises.push( promise );

				promise = agents.delete( "http://example.com/not-an-agents/resource/" );
				expect( promise instanceof Promise ).toBe( true );
				promises.push( promise.catch( ( error:Error ) => {
					expect( error instanceof Errors.IllegalArgumentError ).toBe( true );
				} ) );

				Promise.all( promises ).then( () => {
					expect( spy ).toHaveBeenCalledWith( "http://example.com/agents/another-another-agent/", undefined );
					expect( spy ).toHaveBeenCalledWith( "http://example.com/agents/another-agent/", options );
					expect( spy ).toHaveBeenCalledWith( "http://example.com/agents/an-agent/", undefined );
					done();
				} ).catch( done.fail );
			} );

		} );

	} );

	it( hasDefaultExport(
		"Carbon.Auth.Agents.Class"
	), ():void => {
		expect( DefaultExport ).toBeDefined();
		expect( DefaultExport ).toBe( Agents.Class );
	} );

} );
