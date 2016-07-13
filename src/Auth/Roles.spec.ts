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
import AbstractContext from "./../AbstractContext";
import * as Errors from "./../Errors";
import * as Pointer from "./../Pointer";
import * as Role from "./Role";
import * as HTTP from "./../HTTP";
import * as PersistedRole from "./PersistedRole";
import * as RetrievalPreferences from "./../RetrievalPreferences";
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

			jasmine.Ajax.stubRequest( "http://example.com/roles/role-not-found/" ).andReturn( {
				status: 404,
			} );
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
				"Persists the Role provided with the slug, if specified, as a childRole of the parentRole specified.\n" +
				"Returns a Promise with a Pointer for the stored role; and a tuple of two responses, the first one is the response of the creation, and the second one is the response of the creation of the relation parent-child of the roles.", [
					{name: "parentRole", type: "string | Carbon.Pointer.Class", description: "The role that will be assigned as the parent of the role that wants to persist."},
					{name: "role", type: "Carbon.Auth.Roles.Class", description: "The appRole that wants to persist."},
					{name: "slug", type: "string", optional: true, description: "The slug where the role will be persisted."},
					{name: "requestOptions", type: "Carbon.HTTP.Request.Options", optional: true, description: "The slug where the role will be persisted."},
				],
				{type: "Promise<[ Carbon.Pointer.Class, [ Carbon.HTTP.Response.Class, Carbon.HTTP.Response.Class] ]>"}
			), ( done:{ ():void, fail:() => void } ):void => {
				expect( roles.createChild ).toBeDefined();
				expect( Utils.isFunction( roles.createChild ) ).toBe( true );

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

					promise = roles.createChild( "role-not-found/", Role.Factory.create( "Role name" ), "new-role" );
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
				"Persists the Role provided as a childRole of the parentRole specified.\n" +
				"Returns a Promise with a Pointer for the stored role; and a tuple of two responses, the first one is the response of the creation, and the second one is the response of the creation of the relation parent-child of the roles.", [
					{name: "parentRole", type: "string | Carbon.Pointer.Class", description: "The role that will be assigned as the parent of the role that wants to persist."},
					{name: "role", type: "Carbon.Auth.Roles.Class", description: "The appRole that wants to persist."},
					{name: "requestOptions", type: "Carbon.HTTP.Request.Options", optional: true, description: "The slug where the role will be persisted."},
				],
				{type: "Promise<[ Carbon.Pointer.Class, [ Carbon.HTTP.Response.Class, Carbon.HTTP.Response.Class] ]>"}
			), ( done:{ ():void, fail:() => void } ):void => {
				expect( roles.createChild ).toBeDefined();
				expect( Utils.isFunction( roles.createChild ) ).toBe( true );

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

					promise = roles.createChild( "role-not-found/", Role.Factory.create( "Role name" ), options );
					expect( promise instanceof Promise ).toBe( true );
					promises.push( promise.catch( spies.error ) );

					Promise.all( promises ).then( ():void => {
						expect( spySuccess ).toHaveBeenCalledTimes( 2 );
						expect( spyError ).toHaveBeenCalledTimes( 1 );

						expect( spyCreate ).toHaveBeenCalledTimes( 2 );
						expect( spyCreate ).toHaveBeenCalledWith( "http://example.com/roles/", jasmine.anything(), options );
						expect( spyCreate ).toHaveBeenCalledWith( "http://example.com/roles/", jasmine.anything(), undefined );
						done();
					} ).catch( done.fail );

				} );

			} );

		} );

		it( hasMethod(
			INSTANCE,
			"get",
			"Retrieves a role from the current context.", [
				{name: "roleURI", type: "string", description: "The URI of the role to retrieve."},
				{name: "requestOptions", type: "Carbon.HTTP.Request.Options", optional: true},
			],
			{type: "Promise<[ Carbon.PersistedRole.Class, Carbon.HTTP.Response.Class ]>"}
		), ( done:{ ():void, fail:() => void } ):void => {
			expect( roles.get ).toBeDefined();
			expect( Utils.isFunction( roles.get ) );

			jasmine.Ajax.stubRequest( "http://example.com/roles/a-role/" ).andReturn( {
				status: 200,
				responseText: `[ {
					"@id": "http://example.com/roles/a-role/",
					"@graph": [ {
						"@id": "http://example.com/roles/a-role/",
						"@type": [ "https://carbonldp.com/ns/v1/security#AppRole" ],
						"https://carbonldp.com/ns/v1/platform#accessPoint": [ {
							"@id": "https://dev.carbonldp.com/apps/test-app/roles/blog-editor/agents/"
						} ],
						"https://carbonldp.com/ns/v1/security#name": [ {
							"@value": "A Role"
						} ],
						"https://carbonldp.com/ns/v1/security#parentRole": [ {
							"@id": "https://example.com/roles/root-role/"
						} ]
					} ]
				} ]`,
				responseHeaders: {
					"ETag": `"1234567890"`,
				},
			} );

			let spies:any = {
				success: ( [ pointer, response ]:[ PersistedRole.Class, HTTP.Response.Class ] ):void => {
					expect( pointer ).toBeTruthy();
					expect( PersistedRole.Factory.is( pointer ) ).toBe( true );
					expect( pointer.id ).toBe( "http://example.com/roles/a-role/" );

					expect( response ).toBeTruthy();
					expect( response instanceof HTTP.Response.Class ).toBe( true );
				},
				error: function( error:Error ):void {
					expect( error instanceof Errors.IllegalArgumentError );
				},
			};

			let spySuccess:jasmine.Spy = spyOn( spies, "success" ).and.callThrough();
			let spyError:jasmine.Spy = spyOn( spies, "error" ).and.callThrough();

			roles.get( "http://example.com/roles/a-role/" ).then( done.fail ).catch( ( error:Error ) => {
				expect( error instanceof Errors.IllegalStateError ).toBe( true );
				context.setSetting( "platform.roles.container", "roles/" );

				let promises:Promise<any>[] = [];
				let promise:Promise<any>;

				promise = roles.get( "http://example.com/roles/a-role/" );
				expect( promise instanceof Promise ).toBe( true );
				promises.push( promise.then( spies.success ) );

				promise = roles.get( "a-role/" );
				expect( promise instanceof Promise ).toBe( true );
				promises.push( promise.then( spies.success ) );

				promise = roles.get( "http://example.com/wrong-path/roles/a-role/" );
				expect( promise instanceof Promise ).toBe( true );
				promises.push( promise.catch( spies.error ) );

				Promise.all( promises ).then( ():void => {
					expect( spySuccess ).toHaveBeenCalledTimes( 2 );
					expect( spyError ).toHaveBeenCalledTimes( 1 );
					done();
				} ).catch( done.fail );

			} );

		} );

		it( hasMethod(
			INSTANCE,
			"listAgents",
			"Retrieves an array of unresolved pointers for all the agents of the specified role.", [
				{name: "roleURI", type: "string", description: "The URI of the role to look for its agents."},
				{name: "requestOptions", type: "Carbon.HTTP.Request.Options", optional: true},
			],
			{type: "Promise<[ Carbon.Auth.PersistedRole.Class, Carbon.HTTP.Response.Class ]>"}
		), ( done:{ ():void, fail:() => void } ):void => {
			expect( roles.listAgents ).toBeDefined();
			expect( Utils.isFunction( roles.listAgents ) ).toBe( true );

			jasmine.Ajax.stubRequest( "http://example.com/roles/a-role/", null, "POST" ).andReturn( {
				status: 200,
				responseText: `{
					"head": {
						"vars": [
							"agentsAccessPoint"
						]
					},
					"results": {
						"bindings": [
							{
								"agentsAccessPoint": {
									"type": "uri",
									"value": "http://example.com/roles/a-role/agents/"
								}
							}
						]
					}
				}`,
			} );
			jasmine.Ajax.stubRequest( "http://example.com/roles/a-role/agents/", null, "GET" ).andReturn( {
				status: 200,
				responseText: `[ {
					"@graph": [ {
						"@id": "http://example.com/roles/a-role/",
						"https://carbonldp.com/ns/v1/security#agent": [ {
							"@id": "http://example.com/agents/an-agent/"
						} ]
					} ],
					"@id": "http://example.com/roles/a-role/"
				}, {
					"@graph": [ {
						"@id": "http://example.com/roles/a-role/agents/",
						"@type": [ "http://www.w3.org/ns/ldp#RDFSource", "http://www.w3.org/ns/ldp#DirectContainer", "http://www.w3.org/ns/ldp#Container" ],
						"http://www.w3.org/ns/ldp#hasMemberRelation": [ {
							"@id": "https://carbonldp.com/ns/v1/security#agent"
						} ],
						"http://www.w3.org/ns/ldp#membershipResource": [ {
							"@id": "http://example.com/roles/a-role/"
						} ]
					} ],
					"@id": "http://example.com/roles/a-role/agents/"
				} ]`,
			} );

			roles.listAgents( "http://example.com/roles/a-role/", Role.Factory.create( "Role name" ) ).then( done.fail ).catch( ( stateError:Error ) => {
				expect( stateError instanceof Errors.IllegalStateError ).toBe( true );
				context.setSetting( "platform.roles.container", "roles/" );

				let spies:any = {
					success: ( [ pointers, response ]:[ Pointer.Class[], HTTP.Response.Class ] ):void => {
						expect( pointers ).toBeTruthy();
						expect( pointers.length ).toBe( 1 );
						expect( pointers[ 0 ].id ).toBe( "http://example.com/agents/an-agent/" );

						expect( response ).toBeTruthy();
						expect( response instanceof HTTP.Response.Class ).toBe( true );

					},
					error: function( error:Error ):void {
						expect( error instanceof Errors.IllegalArgumentError );
					},
				};

				let spyError:jasmine.Spy = spyOn( spies, "error" ).and.callThrough();
				let spySuccess:jasmine.Spy = spyOn( spies, "success" ).and.callThrough();
				let spyCreate:jasmine.Spy = spyOn( context.documents, "listMembers" ).and.callThrough();

				let promises:Promise<any>[] = [];
				let promise:Promise<any>;
				let options:HTTP.Request.Options = {
					timeout: 5555,
				};

				promise = roles.listAgents( "a-role/", options );
				expect( promise instanceof Promise ).toBe( true );
				promises.push( promise.then( spies.success ) );

				promise = roles.listAgents( "http://example.com/roles/a-role/" );
				expect( promise instanceof Promise ).toBe( true );
				promises.push( promise.then( spies.success ) );

				promise = roles.listAgents( "role-not-found/", options );
				expect( promise instanceof Promise ).toBe( true );
				promises.push( promise.catch( spies.error ) );

				Promise.all( promises ).then( ():void => {
					expect( spySuccess ).toHaveBeenCalledTimes( 2 );
					expect( spyError ).toHaveBeenCalledTimes( 1 );

					expect( spyCreate ).toHaveBeenCalledTimes( 2 );
					expect( spyCreate ).toHaveBeenCalledWith( "http://example.com/roles/a-role/agents/", options );
					expect( spyCreate ).toHaveBeenCalledWith( "http://example.com/roles/a-role/agents/", undefined );
					done();
				} ).catch( done.fail );

			} );

		} );

		describe( method(
			INSTANCE,
			"getAgents"
		), ():void => {

			beforeEach( ():void => {
				jasmine.Ajax.stubRequest( "http://example.com/roles/a-role/", null, "POST" ).andReturn( {
					status: 200,
					responseText: `{
						"head": {
							"vars": [
								"agentsAccessPoint"
							]
						},
						"results": {
							"bindings": [
								{
									"agentsAccessPoint": {
										"type": "uri",
										"value": "http://example.com/roles/a-role/agents/"
									}
								}
							]
						}
					}`,
				} );
				jasmine.Ajax.stubRequest( new RegExp( "roles/a-role/agents/" ), null, "GET" ).andReturn( {
					status: 200,
					responseText: `[
						{
							"@id": "_:01",
							"@type": [
								"https://carbonldp.com/ns/v1/platform#ResponseMetadata",
								"https://carbonldp.com/ns/v1/platform#VolatileResource"
							],
							"https://carbonldp.com/ns/v1/platform#resourceMetadata": [
								{
									"@id": "_:02"
								}
							]
						},
						{
							"@id": "_:02",
							"@type": [
								"https://carbonldp.com/ns/v1/platform#ResourceMetadata",
								"https://carbonldp.com/ns/v1/platform#VolatileResource"
							],
							"https://carbonldp.com/ns/v1/platform#eTag": [
								{
									"@value": "\\"1234567890\\""
								}
							],
							"https://carbonldp.com/ns/v1/platform#resource": [
								{
									"@id": "http://example.com/agents/an-agent/"
								}
							]
						},
						{
							"@graph": [
								{
									"@id": "http://example.com/roles/a-role/",
									"https://carbonldp.com/ns/v1/security#agent": [
										{
											"@id": "http://example.com/agents/an-agent/"
										}
									]
								}
							],
							"@id": "http://example.com/roles/a-role/"
						},
						{
							"@graph": [
								{
									"@id": "http://example.com/roles/a-role/agents/",
									"@type": [
										"http://www.w3.org/ns/ldp#RDFSource",
										"http://www.w3.org/ns/ldp#DirectContainer",
										"http://www.w3.org/ns/ldp#Container"
									],
									"http://www.w3.org/ns/ldp#hasMemberRelation": [
										{
											"@id": "https://carbonldp.com/ns/v1/security#agent"
										}
									],
									"http://www.w3.org/ns/ldp#membershipResource": [
										{
											"@id": "http://example.com/roles/a-role/"
										}
									]
								}
							],
							"@id": "http://example.com/roles/a-role/agents/"
						},
						{
							"@graph": [
								{
									"@id": "http://example.com/agents/an-agent/",
									"http://www.w3.org/2001/vcard-rdf/3.0#email": [
										{
											"@value": "an-agent@example.com"
										}
									],
									"https://carbonldp.com/ns/v1/security#name": [
										{
											"@value": "The Agent Name"
										}
									]
								}
							],
							"@id": "http://example.com/agents/an-agent/"
						}
					]`,
				} );
			} );

			it( isDefined(), ():void => {
				expect( roles.getAgents ).toBeDefined();
				expect( Utils.isFunction( roles.getAgents ) ).toBe( true );
			} );

			it( hasSignature(
				"Retrieves an array of resolved pointers for all the agents of the specified role.", [
					{name: "roleURI", type: "string", description: "The URI of the role to look for its agents."},
					{name: "requestOptions", type: "Carbon.HTTP.Request.Options", optional: true},
				],
				{type: "Promise<[ carbon.Auth.PersistedRole.Class, Carbon.HTTP.Response.Class ]>"}
			), ( done:{ ():void, fail:() => void } ):void => {
				roles.getAgents( "http://example.com/roles/a-role/", Role.Factory.create( "Role name" ) ).then( done.fail ).catch( ( stateError:Error ) => {
					expect( stateError instanceof Errors.IllegalStateError ).toBe( true );
					context.setSetting( "platform.roles.container", "roles/" );

					let spies:any = {
						success: ( [ pointers, response ]:[ Pointer.Class[], HTTP.Response.Class ] ):void => {
							expect( pointers ).toBeTruthy();
							expect( pointers.length ).toBe( 1 );
							expect( pointers[ 0 ].id ).toBe( "http://example.com/agents/an-agent/" );
							expect( pointers[ 0 ].isResolved() ).toBe( true );

							expect( response ).toBeTruthy();
							expect( response instanceof HTTP.Response.Class ).toBe( true );

						},
						error: function( error:Error ):void {
							expect( error instanceof Errors.IllegalArgumentError );
						},
					};

					let spyError:jasmine.Spy = spyOn( spies, "error" ).and.callThrough();
					let spySuccess:jasmine.Spy = spyOn( spies, "success" ).and.callThrough();
					let spyCreate:jasmine.Spy = spyOn( context.documents, "getMembers" ).and.callThrough();

					let promises:Promise<any>[] = [];
					let promise:Promise<any>;
					let options:HTTP.Request.Options = {
						timeout: 5555,
					};

					promise = roles.getAgents( "a-role/", options );
					expect( promise instanceof Promise ).toBe( true );
					promises.push( promise.then( spies.success ) );

					promise = roles.getAgents( "http://example.com/roles/a-role/" );
					expect( promise instanceof Promise ).toBe( true );
					promises.push( promise.then( spies.success ) );

					promise = roles.getAgents( "role-not-found/", options );
					expect( promise instanceof Promise ).toBe( true );
					promises.push( promise.catch( spies.error ) );

					Promise.all( promises ).then( ():void => {
						expect( spySuccess ).toHaveBeenCalledTimes( 2 );
						expect( spyError ).toHaveBeenCalledTimes( 1 );

						expect( spyCreate ).toHaveBeenCalledTimes( 2 );
						expect( spyCreate ).toHaveBeenCalledWith( "http://example.com/roles/a-role/agents/", options, undefined );
						expect( spyCreate ).toHaveBeenCalledWith( "http://example.com/roles/a-role/agents/", undefined, undefined );
						done();
					} ).catch( done.fail );

				} );

			} );

			it( hasSignature(
				"Retrieves an array of resolved pointers for the agents of the role, in accordance of the retrievalPreferences provided.", [
					{name: "roleURI", type: "string", description: "The URI of the role to look for its agents."},
					{name: "retrievalPreferences", type: "Carbon.RetrievalPreferences.Class", optional: true, description: "An object that specify the retrieval preferences for the request."},
					{name: "requestOptions", type: "Carbon.HTTP.Request.Options", optional: true},
				],
				{type: "Promise<[ carbon.Auth.PersistedRole.Class, Carbon.HTTP.Response.Class ]>"}
			), ( done:{ ():void, fail:() => void } ):void => {
				roles.getAgents( "http://example.com/roles/a-role/", Role.Factory.create( "Role name" ) ).then( done.fail ).catch( ( stateError:Error ) => {
					expect( stateError instanceof Errors.IllegalStateError ).toBe( true );
					context.setSetting( "platform.roles.container", "roles/" );

					let spies:any = {
						success: ( [ pointers, response ]:[ Pointer.Class[], HTTP.Response.Class ] ):void => {
							expect( pointers ).toBeTruthy();
							expect( pointers.length ).toBe( 1 );
							expect( pointers[ 0 ].id ).toBe( "http://example.com/agents/an-agent/" );
							expect( pointers[ 0 ].isResolved() ).toBe( true );

							expect( response ).toBeTruthy();
							expect( response instanceof HTTP.Response.Class ).toBe( true );

						},
						error: function( error:Error ):void {
							expect( error instanceof Errors.IllegalArgumentError );
						},
					};

					let spyError:jasmine.Spy = spyOn( spies, "error" ).and.callThrough();
					let spySuccess:jasmine.Spy = spyOn( spies, "success" ).and.callThrough();
					let spyCreate:jasmine.Spy = spyOn( context.documents, "getMembers" ).and.callThrough();

					let promises:Promise<any>[] = [];
					let promise:Promise<any>;
					let options:HTTP.Request.Options = {
						timeout: 5555,
					};
					let retrievalPreferences:RetrievalPreferences.Class = {
						limit: 10,
						offset: 0,
						orderBy: [ {"@id": "http://example.com/ns#string", "@type": "string"} ],
					};

					promise = roles.getAgents( "a-role/", retrievalPreferences, options );
					expect( promise instanceof Promise ).toBe( true );
					promises.push( promise.then( spies.success ) );

					promise = roles.getAgents( "http://example.com/roles/a-role/", retrievalPreferences );
					expect( promise instanceof Promise ).toBe( true );
					promises.push( promise.then( spies.success ) );

					promise = roles.getAgents( "role-not-found/", retrievalPreferences );
					expect( promise instanceof Promise ).toBe( true );
					promises.push( promise.catch( spies.error ) );

					Promise.all( promises ).then( ():void => {
						expect( spySuccess ).toHaveBeenCalledTimes( 2 );
						expect( spyError ).toHaveBeenCalledTimes( 1 );

						expect( spyCreate ).toHaveBeenCalledTimes( 2 );
						expect( spyCreate ).toHaveBeenCalledWith( "http://example.com/roles/a-role/agents/", retrievalPreferences, options );
						expect( spyCreate ).toHaveBeenCalledWith( "http://example.com/roles/a-role/agents/", retrievalPreferences, undefined );
						done();
					} ).catch( done.fail );

				} );

			} );

		} );

		it( hasMethod(
			INSTANCE,
			"addAgent",
			"Makes a relation in the role specified towards the agent provided.", [
				{name: "roleURI", type: "string", description: "The URI of the role where to add the agent."},
				{name: "agent", type: "string | Carbon.Pointer.Class", description: "The agent that wants to add to the role."},
				{name: "requestOptions", type: "Carbon.HTTP.Request.Options", optional: true},
			],
			{type: "Promise<Carbon.HTTP.Response.Class>"}
		), ():void => {
			expect( roles.addAgent ).toBeDefined();
			expect( Utils.isFunction( roles.addAgent ) );

			let options:HTTP.Request.Options = {timeout: 5555};
			let spy:jasmine.Spy = spyOn( roles, "addAgents" );

			roles.addAgent( "http://example.com/roles/a-role/", "http://example.com/agents/an-agent/" );
			expect( spy ).toHaveBeenCalledWith( "http://example.com/roles/a-role/", [ "http://example.com/agents/an-agent/" ], undefined );

			roles.addAgent( "http://example.com/roles/a-role-2/", "http://example.com/agents/an-agent/", options );
			expect( spy ).toHaveBeenCalledWith( "http://example.com/roles/a-role-2/", [ "http://example.com/agents/an-agent/" ], options );

			roles.addAgent( "another-role/", "http://example.com/agents/an-agent/", options );
			expect( spy ).toHaveBeenCalledWith( "another-role/", [ "http://example.com/agents/an-agent/" ], options );
		} );

		it( hasMethod(
			INSTANCE,
			"addAgents",
			"Makes a relation in the role specified towards the agents specified.", [
				{name: "roleURI", type: "string", description: "The URI of the role where to add agents."},
				{name: "agents", type: "(string | Carbon.Pointer.Class)[]", description: "An array with strings or Pointers that refers to the agents that wants to add to the role."},
				{name: "requestOptions", type: "Carbon.HTTP.Request.Options", optional: true},
			],
			{type: "Promise<Carbon.HTTP.Response.Class>"}
		), ( done:{ ():void, fail:() => void } ):void => {
			expect( roles.addAgents ).toBeDefined();
			expect( Utils.isFunction( roles.addAgents ) );

			function constructAccessPointResponse( uri:string ):string {
				return `{
					"head": {
						"vars": [
							"agentsAccessPoint"
						]
					},
					"results": {
						"bindings": [
							{
								"agentsAccessPoint": {
									"type": "uri",
									"value": "${ uri }agents/"
								}
							}
						]
					}
				}`;
			}

			jasmine.Ajax.stubRequest( "http://example.com/roles/a-role/", null, "POST" ).andReturn( {
				status: 200,
				responseText: constructAccessPointResponse( "http://example.com/roles/a-role/" ),
			} );
			jasmine.Ajax.stubRequest( "http://example.com/roles/a-role-2/", null, "POST" ).andReturn( {
				status: 200,
				responseText: constructAccessPointResponse( "http://example.com/roles/a-role-2/" ),
			} );
			jasmine.Ajax.stubRequest( "http://example.com/roles/another-role/", null, "POST" ).andReturn( {
				status: 200,
				responseText: constructAccessPointResponse( "http://example.com/roles/another-role/" ),
			} );

			let options:HTTP.Request.Options = {timeout: 5555};
			let spy:jasmine.Spy = spyOn( context.documents, "addMembers" ).and.returnValue( Promise.resolve() );
			let agents:(string | Pointer.Class)[] = [ "http://example.com/agents/an-agent/", Pointer.Factory.create( "http://example.com/agents/another-agent/" ) ];

			roles.addAgents( "http://example.com/roles/a-role/", agents ).then( done.fail ).catch( ( error:Error ) => {
				expect( error instanceof Errors.IllegalStateError ).toBe( true );
				context.setSetting( "platform.roles.container", "roles/" );

				let promises:Promise<any>[] = [];
				let promise:Promise<any>;

				promise = roles.addAgents( "http://example.com/roles/a-role/", agents );
				expect( promise instanceof Promise ).toBe( true );
				promises.push( promise );

				promise = roles.addAgents( "http://example.com/roles/a-role-2/", agents, options );
				expect( promise instanceof Promise ).toBe( true );
				promises.push( promise );

				promise = roles.addAgents( "another-role/", agents, options );
				expect( promise instanceof Promise ).toBe( true );
				promises.push( promise );

				Promise.all( promises ).then( () => {
					expect( spy ).toHaveBeenCalledWith( "http://example.com/roles/a-role/agents/", agents, undefined );
					expect( spy ).toHaveBeenCalledWith( "http://example.com/roles/a-role-2/agents/", agents, options );
					expect( spy ).toHaveBeenCalledWith( "http://example.com/roles/another-role/agents/", agents, options );
					done();
				} ).catch( done.fail );

			} );

		} );


		it( hasMethod(
			INSTANCE,
			"removeAgent",
			"Removes the relation in the role specified towards the agent provided.", [
				{name: "roleURI", type: "string", description: "The URI of the role from where to remove the agent."},
				{name: "agent", type: "string | Carbon.Pointer.Class", description: "The agent that wants to be removed from the role."},
				{name: "requestOptions", type: "Carbon.HTTP.Request.Options", optional: true},
			],
			{type: "Promise<Carbon.HTTP.Response.Class>"}
		), ():void => {
			expect( roles.removeAgent ).toBeDefined();
			expect( Utils.isFunction( roles.removeAgent ) );

			let options:HTTP.Request.Options = {timeout: 5555};
			let spy:jasmine.Spy = spyOn( roles, "removeAgents" );

			roles.removeAgent( "http://example.com/roles/a-role/", "http://example.com/agents/an-agent/" );
			expect( spy ).toHaveBeenCalledWith( "http://example.com/roles/a-role/", [ "http://example.com/agents/an-agent/" ], undefined );

			roles.removeAgent( "http://example.com/roles/a-role-2/", "http://example.com/agents/an-agent/", options );
			expect( spy ).toHaveBeenCalledWith( "http://example.com/roles/a-role-2/", [ "http://example.com/agents/an-agent/" ], options );

			roles.removeAgent( "another-role/", "http://example.com/agents/an-agent/", options );
			expect( spy ).toHaveBeenCalledWith( "another-role/", [ "http://example.com/agents/an-agent/" ], options );
		} );

		it( hasMethod(
			INSTANCE,
			"removeAgents",
			"Remove the relation in the role specified towards the agents specified.", [
				{name: "roleURI", type: "string", description: "The URI of the role from where to remove the agents."},
				{name: "agents", type: "(string | Carbon.Pointer.Class)[]", description: "An array with strings or Pointers that refers to the agents to be removed from the role."},
				{name: "requestOptions", type: "Carbon.HTTP.Request.Options", optional: true},
			],
			{type: "Promise<Carbon.HTTP.Response.Class>"}
		), ( done:{ ():void, fail:() => void } ):void => {
			expect( roles.removeAgents ).toBeDefined();
			expect( Utils.isFunction( roles.removeAgents ) );

			function constructAccessPointResponse( uri:string ):string {
				return `{
					"head": {
						"vars": [
							"agentsAccessPoint"
						]
					},
					"results": {
						"bindings": [
							{
								"agentsAccessPoint": {
									"type": "uri",
									"value": "${ uri }agents/"
								}
							}
						]
					}
				}`;
			}

			jasmine.Ajax.stubRequest( "http://example.com/roles/a-role/", null, "POST" ).andReturn( {
				status: 200,
				responseText: constructAccessPointResponse( "http://example.com/roles/a-role/" ),
			} );
			jasmine.Ajax.stubRequest( "http://example.com/roles/a-role-2/", null, "POST" ).andReturn( {
				status: 200,
				responseText: constructAccessPointResponse( "http://example.com/roles/a-role-2/" ),
			} );
			jasmine.Ajax.stubRequest( "http://example.com/roles/another-role/", null, "POST" ).andReturn( {
				status: 200,
				responseText: constructAccessPointResponse( "http://example.com/roles/another-role/" ),
			} );

			let options:HTTP.Request.Options = {timeout: 5555};
			let spy:jasmine.Spy = spyOn( context.documents, "removeMembers" ).and.returnValue( Promise.resolve() );
			let agents:(string | Pointer.Class)[] = [ "http://example.com/agents/an-agent/", Pointer.Factory.create( "http://example.com/agents/another-agent/" ) ];

			roles.removeAgents( "http://example.com/roles/a-role/", agents ).then( done.fail ).catch( ( error:Error ) => {
				expect( error instanceof Errors.IllegalStateError ).toBe( true );
				context.setSetting( "platform.roles.container", "roles/" );

				let promises:Promise<any>[] = [];
				let promise:Promise<any>;

				promise = roles.removeAgents( "http://example.com/roles/a-role/", agents );
				expect( promise instanceof Promise ).toBe( true );
				promises.push( promise );

				promise = roles.removeAgents( "http://example.com/roles/a-role-2/", agents, options );
				expect( promise instanceof Promise ).toBe( true );
				promises.push( promise );

				promise = roles.removeAgents( "another-role/", agents, options );
				expect( promise instanceof Promise ).toBe( true );
				promises.push( promise );

				Promise.all( promises ).then( () => {
					expect( spy ).toHaveBeenCalledWith( "http://example.com/roles/a-role/agents/", agents, undefined );
					expect( spy ).toHaveBeenCalledWith( "http://example.com/roles/a-role-2/agents/", agents, options );
					expect( spy ).toHaveBeenCalledWith( "http://example.com/roles/another-role/agents/", agents, options );
					done();
				} ).catch( done.fail );

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
