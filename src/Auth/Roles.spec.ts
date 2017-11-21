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
import * as HTTP from "./../HTTP";
import * as Pointer from "./../Pointer";
import * as NS from "./../NS";
import * as Utils from "./../Utils";
import * as PersistedRole from "./PersistedRole";
import * as Role from "./Role";


import * as Roles from "./Roles";
import DefaultExport from "./Roles";

describe( module( "Carbon/Auth/Roles" ), ():void => {

	it( isDefined(), ():void => {
		expect( Roles ).toBeDefined();
		expect( Utils.isObject( Roles ) ).toBe( true );
	} );

	describe( clazz(
		"Carbon.Auth.Roles.Class",
		"Class that manage the roles of a Carbon LDP."
	), ():void => {
		let roles:Roles.Class;
		let context:AbstractContext;

		beforeEach( ():void => {
			class MockedContext extends AbstractContext {
				protected _baseURI:string;

				constructor() {
					super();
					this._baseURI = "http://example.com/";
					this.setSetting( "system.container", ".system/" );
				}
			}

			context = new MockedContext();

			class MockRoles extends Roles.Class {}

			roles = new MockRoles( context );

			jasmine.Ajax.install();

			jasmine.Ajax.stubRequest( "http://example.com/.system/roles/role-not-found/" ).andReturn( {
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
			{ name: "context", type: "Carbon.Context.Class" },
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
					{ name: "parentRole", type: "string | Carbon.Pointer.Class", description: "The role that will be assigned as the parent of the role that wants to persist." },
					{ name: "role", type: "T", description: "The appRole that wants to persist." },
					{ name: "slug", type: "string", optional: true, description: "The slug where the role will be persisted." },
					{ name: "requestOptions", type: "Carbon.HTTP.Request.Options", optional: true, description: "The slug where the role will be persisted." },
				],
				{ type: "Promise<[ T & Carbon.Auth.PersistedRole.Class, Carbon.HTTP.Response.Class ]>" }
			), ( done:{ ():void, fail:() => void } ):void => {
				expect( roles.createChild ).toBeDefined();
				expect( Utils.isFunction( roles.createChild ) ).toBe( true );

				jasmine.Ajax.stubRequest( "http://example.com/.system/roles/parent/" ).andReturn( {
					status: 200,
				} );
				jasmine.Ajax.stubRequest( "http://example.com/.system/roles/" ).andReturn( {
					status: 200,
					responseHeaders: {
						"Location": "http://example.com/.system/roles/new-role/",
					},
				} );

				let spies:any = {
					success: ( [ pointer, response ]:[ Pointer.Class, HTTP.Response.Class ] ):void => {
						expect( pointer ).toBeTruthy();
						expect( Pointer.Factory.is( pointer ) ).toBe( true );
						expect( pointer.id ).toBe( "http://example.com/.system/roles/new-role/" );

						expect( response ).toBeTruthy();
						expect( response instanceof HTTP.Response.Class ).toBe( true );
					},
					error: function( error:Error ):void {
						expect( error instanceof Errors.IllegalArgumentError );
					},
				};

				let spyError:jasmine.Spy = spyOn( spies, "error" ).and.callThrough();
				let spySuccess:jasmine.Spy = spyOn( spies, "success" ).and.callThrough();


				roles.createChild( "http://example.com/.system/roles/parent/", Role.Factory.create( "Role name" ) ).then( done.fail ).catch( ( error:Error ) => {
					expect( error instanceof Errors.IllegalStateError ).toBe( true );
					context.setSetting( "system.roles.container", "roles/" );

					let promises:Promise<any>[] = [];
					let promise:Promise<any>;

					promise = roles.createChild( "parent/", Role.Factory.create( "Role name" ), "new-role" );
					expect( promise instanceof Promise ).toBe( true );
					promises.push( promise.then( spies.success ) );

					promise = roles.createChild( "http://example.com/.system/roles/parent/", Role.Factory.create( "Role name" ) );
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
				[ "T extends Carbon.Auth.Roles.Class" ],
				"Persists the Role provided as a childRole of the parentRole specified.\n" +
				"Returns a Promise with a Pointer for the stored role; and a tuple of two responses, the first one is the response of the creation, and the second one is the response of the creation of the relation parent-child of the roles.", [
					{ name: "parentRole", type: "string | Carbon.Pointer.Class", description: "The role that will be assigned as the parent of the role that wants to persist." },
					{ name: "role", type: "T", description: "The appRole that wants to persist." },
					{ name: "requestOptions", type: "Carbon.HTTP.Request.Options", optional: true, description: "The slug where the role will be persisted." },
				],
				{ type: "Promise<[ T & Carbon.Auth.PersistedRole.Class, Carbon.HTTP.Response.Class ]>" }
			), ( done:{ ():void, fail:() => void } ):void => {
				expect( roles.createChild ).toBeDefined();
				expect( Utils.isFunction( roles.createChild ) ).toBe( true );

				jasmine.Ajax.stubRequest( "http://example.com/.system/roles/parent/" ).andReturn( {
					status: 200,
				} );
				jasmine.Ajax.stubRequest( "http://example.com/.system/roles/" ).andReturn( {
					status: 200,
					responseHeaders: {
						"Location": "http://example.com/.system/roles/new-role/",
					},
				} );

				let spies:any = {
					success: ( [ pointer, response ]:[ Pointer.Class, HTTP.Response.Class ] ):void => {
						expect( pointer ).toBeTruthy();
						expect( Pointer.Factory.is( pointer ) ).toBe( true );
						expect( pointer.id ).toBe( "http://example.com/.system/roles/new-role/" );

						expect( response ).toBeTruthy();
						expect( response instanceof HTTP.Response.Class ).toBe( true );
					},
					error: function( error:Error ):void {
						expect( error instanceof Errors.IllegalArgumentError );
					},
				};

				let spyError:jasmine.Spy = spyOn( spies, "error" ).and.callThrough();
				let spySuccess:jasmine.Spy = spyOn( spies, "success" ).and.callThrough();
				let spyCreate:jasmine.Spy = spyOn( context.documents, "createChild" ).and.callThrough();

				roles.createChild( "http://example.com/.system/roles/parent/", Role.Factory.create( "Role name" ) ).then( done.fail ).catch( ( error:Error ) => {
					expect( error instanceof Errors.IllegalStateError ).toBe( true );
					context.setSetting( "system.roles.container", "roles/" );

					let promises:Promise<any>[] = [];
					let promise:Promise<any>;
					let options:HTTP.Request.Options = {
						timeout: 5555,
					};

					promise = roles.createChild( "parent/", Role.Factory.create( "Role name" ), options );
					expect( promise instanceof Promise ).toBe( true );
					promises.push( promise.then( spies.success ) );

					promise = roles.createChild( "http://example.com/.system/roles/parent/", Role.Factory.create( "Role name" ) );
					expect( promise instanceof Promise ).toBe( true );
					promises.push( promise.then( spies.success ) );

					promise = roles.createChild( "role-not-found/", Role.Factory.create( "Role name" ), options );
					expect( promise instanceof Promise ).toBe( true );
					promises.push( promise.catch( spies.error ) );

					Promise.all( promises ).then( ():void => {
						expect( spySuccess ).toHaveBeenCalledTimes( 2 );
						expect( spyError ).toHaveBeenCalledTimes( 1 );

						expect( spyCreate ).toHaveBeenCalledTimes( 2 );
						expect( spyCreate ).toHaveBeenCalledWith( "http://example.com/.system/roles/", jasmine.anything(), null, options );
						expect( spyCreate ).toHaveBeenCalledWith( "http://example.com/.system/roles/", jasmine.anything(), null, undefined );
						done();
					} ).catch( done.fail );

				} );

			} );

		} );

		it( hasMethod(
			INSTANCE,
			"get",
			[ "T" ],
			"Retrieves a role from the current context.", [
				{ name: "roleURI", type: "string", description: "The URI of the role to retrieve." },
				{ name: "requestOptions", type: "Carbon.HTTP.Request.Options", optional: true },
			],
			{ type: "Promise<[ T & Carbon.PersistedRole.Class, Carbon.HTTP.Response.Class ]>" }
		), ( done:{ ():void, fail:() => void } ):void => {
			expect( roles.get ).toBeDefined();
			expect( Utils.isFunction( roles.get ) );

			jasmine.Ajax.stubRequest( "http://example.com/.system/roles/a-role/" ).andReturn( {
				status: 200,
				responseText: `[ {
					"@id": "http://example.com/.system/roles/a-role/",
					"@graph": [ {
						"@id": "http://example.com/.system/roles/a-role/",
						"@type": [
							"${ NS.C.Class.Document }",
							"http://example.com/ns#Role"
						 ],
						"${ NS.C.Predicate.accessPoint }": [ {
							"@id": "https://dev.carbonldp.com/.system/roles/a-role/users/"
						} ],
						"${ NS.CS.Predicate.name }": [ {
							"@value": "A Role"
						} ],
						"${ NS.CS.Predicate.parentRole }": [ {
							"@id": "https://example.com/.system/roles/parent-role/"
						} ]
					} ]
				} ]`,
				responseHeaders: {
					"ETag": `"1234567890"`,
					"Content-Location": "http://example.com/.system/roles/a-role/",
				},
			} );
			context.documents.documentDecorators.set( "http://example.com/ns#Role", PersistedRole.Factory.decorate );

			let spies:any = {
				success: ( [ pointer, response ]:[ PersistedRole.Class, HTTP.Response.Class ] ):void => {
					expect( pointer ).toBeTruthy();
					expect( PersistedRole.Factory.is( pointer ) ).toBe( true );
					expect( pointer.id ).toBe( "http://example.com/.system/roles/a-role/" );

					expect( response ).toBeTruthy();
					expect( response instanceof HTTP.Response.Class ).toBe( true );
				},
				error: function( error:Error ):void {
					expect( error instanceof Errors.IllegalArgumentError );
				},
			};

			let spySuccess:jasmine.Spy = spyOn( spies, "success" ).and.callThrough();
			let spyError:jasmine.Spy = spyOn( spies, "error" ).and.callThrough();

			roles.get( "http://example.com/.system/roles/a-role/" ).then( done.fail ).catch( ( error:Error ) => {
				expect( error instanceof Errors.IllegalStateError ).toBe( true );
				context.setSetting( "system.roles.container", "roles/" );

				let promises:Promise<any>[] = [];
				let promise:Promise<any>;

				promise = roles.get( "http://example.com/.system/roles/a-role/" );
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

		xdescribe( method(
			INSTANCE,
			"getUsers"
		), ():void => {

			beforeEach( ():void => {
				jasmine.Ajax.stubRequest( "http://example.com/.system/roles/a-role/", null, "POST" ).andReturn( {
					status: 200,
					responseText: `{
						"head": {
							"vars": [
								"accessPoint"
							]
						},
						"results": {
							"bindings": [
								{
									"accessPoint": {
										"type": "uri",
										"value": "http://example.com/.system/roles/a-role/users/"
									}
								}
							]
						}
					}`,
				} );
				jasmine.Ajax.stubRequest( new RegExp( ".system/roles/a-role/users/" ), null, "GET" ).andReturn( {
					status: 200,
					responseText: `[
						{
							"@id": "_:01",
							"@type": [
								"${ NS.C.Class.ResponseMetadata }",
								"${ NS.C.Class.VolatileResource }"
							],
							"${ NS.C.Predicate.documentMetadata }": [
								{
									"@id": "_:02"
								}
							]
						},
						{
							"@id": "_:02",
							"@type": [
								"${ NS.C.Class.DocumentMetadata }",
								"${ NS.C.Class.VolatileResource }"
							],
							"${ NS.C.Predicate.eTag }": [
								{
									"@value": "\\"1234567890\\""
								}
							],
							"${ NS.C.Predicate.relatedDocument }": [
								{
									"@id": "http://example.com/users/an-user/"
								}
							]
						},
						{
							"@graph": [
								{
									"@id": "http://example.com/.system/roles/a-role/",
									"${ NS.CS.Predicate.user }": [
										{
											"@id": "http://example.com/users/an-user/"
										}
									]
								}
							],
							"@id": "http://example.com/.system/roles/a-role/"
						},
						{
							"@graph": [
								{
									"@id": "http://example.com/.system/roles/a-role/users/",
									"@type": [
										"${ NS.C.Class.Document }",
										"http://www.w3.org/ns/ldp#RDFSource",
										"http://www.w3.org/ns/ldp#DirectContainer",
										"http://www.w3.org/ns/ldp#Container"
									],
									"http://www.w3.org/ns/ldp#hasMemberRelation": [
										{
											"@id": "${ NS.CS.Predicate.user }"
										}
									],
									"http://www.w3.org/ns/ldp#membershipResource": [
										{
											"@id": "http://example.com/.system/roles/a-role/"
										}
									]
								}
							],
							"@id": "http://example.com/.system/roles/a-role/users/"
						},
						{
							"@graph": [
								{
									"@id": "http://example.com/users/an-user/",
									"@type": [ "${ NS.C.Class.Document }" ],
									"http://www.w3.org/2001/vcard-rdf/3.0#email": [
										{
											"@value": "an-user@example.com"
										}
									],
									"${ NS.CS.Predicate.name }": [
										{
											"@value": "The User Name"
										}
									]
								}
							],
							"@id": "http://example.com/users/an-user/"
						}
					]`,
				} );
			} );

			it( isDefined(), ():void => {
				expect( roles.getUsers ).toBeDefined();
				expect( Utils.isFunction( roles.getUsers ) ).toBe( true );
			} );

			it( hasSignature(
				[ "T" ],
				"Retrieves an array of resolved pointers for all the users of the specified role.", [
					{ name: "roleURI", type: "string", description: "The URI of the role to look for its users." },
					{ name: "requestOptions", type: "Carbon.HTTP.Request.Options", optional: true },
				],
				// TODO: Change to `PersistedUser`
				{ type: "Promise<[ (T & Carbon.PersistedDocument.Class)[], Carbon.HTTP.Response.Class ]>" }
			), ( done:{ ():void, fail:() => void } ):void => {
				roles.getUsers( "http://example.com/.system/roles/a-role/" ).then( done.fail ).catch( ( stateError:Error ) => {
					expect( stateError instanceof Errors.IllegalStateError ).toBe( true );
					context.setSetting( "system.roles.container", "roles/" );

					let spies:any = {
						success: ( [ pointers, response ]:[ Pointer.Class[], HTTP.Response.Class ] ):void => {
							expect( pointers ).toBeTruthy();
							expect( pointers.length ).toBe( 1 );
							expect( pointers[ 0 ].id ).toBe( "http://example.com/users/an-user/" );
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

					promise = roles.getUsers( "a-role/", options );
					expect( promise instanceof Promise ).toBe( true );
					promises.push( promise.then( spies.success ) );

					promise = roles.getUsers( "http://example.com/.system/roles/a-role/" );
					expect( promise instanceof Promise ).toBe( true );
					promises.push( promise.then( spies.success ) );

					promise = roles.getUsers( "role-not-found/", options );
					expect( promise instanceof Promise ).toBe( true );
					promises.push( promise.catch( spies.error ) );

					Promise.all( promises ).then( ():void => {
						expect( spySuccess ).toHaveBeenCalledTimes( 2 );
						expect( spyError ).toHaveBeenCalledTimes( 1 );

						expect( spyCreate ).toHaveBeenCalledTimes( 2 );
						expect( spyCreate ).toHaveBeenCalledWith( "http://example.com/.system/roles/a-role/users/", options, undefined );
						expect( spyCreate ).toHaveBeenCalledWith( "http://example.com/.system/roles/a-role/users/", undefined, undefined );
						done();
					} ).catch( done.fail );

				} );

			} );

		} );

		it( hasMethod(
			INSTANCE,
			"addUser",
			"Makes a relation in the role specified towards the user provided.", [
				{ name: "roleURI", type: "string", description: "The URI of the role where to add the user." },
				{ name: "user", type: "string | Carbon.Pointer.Class", description: "The user that wants to add to the role." },
				{ name: "requestOptions", type: "Carbon.HTTP.Request.Options", optional: true },
			],
			{ type: "Promise<Carbon.HTTP.Response.Class>" }
		), ():void => {
			expect( roles.addUser ).toBeDefined();
			expect( Utils.isFunction( roles.addUser ) );

			let options:HTTP.Request.Options = { timeout: 5555 };
			let spy:jasmine.Spy = spyOn( roles, "addUsers" );

			roles.addUser( "http://example.com/.system/roles/a-role/", "http://example.com/users/an-user/" );
			expect( spy ).toHaveBeenCalledWith( "http://example.com/.system/roles/a-role/", [ "http://example.com/users/an-user/" ], undefined );

			roles.addUser( "http://example.com/.system/roles/a-role-2/", "http://example.com/users/an-user/", options );
			expect( spy ).toHaveBeenCalledWith( "http://example.com/.system/roles/a-role-2/", [ "http://example.com/users/an-user/" ], options );

			roles.addUser( "another-role/", "http://example.com/users/an-user/", options );
			expect( spy ).toHaveBeenCalledWith( "another-role/", [ "http://example.com/users/an-user/" ], options );
		} );

		it( hasMethod(
			INSTANCE,
			"addUsers",
			"Makes a relation in the role specified towards the users specified.", [
				{ name: "roleURI", type: "string", description: "The URI of the role where to add users." },
				{ name: "users", type: "(string | Carbon.Pointer.Class)[]", description: "An array with strings or Pointers that refers to the users that wants to add to the role." },
				{ name: "requestOptions", type: "Carbon.HTTP.Request.Options", optional: true },
			],
			{ type: "Promise<Carbon.HTTP.Response.Class>" }
		), ( done:{ ():void, fail:() => void } ):void => {
			expect( roles.addUsers ).toBeDefined();
			expect( Utils.isFunction( roles.addUsers ) );

			function constructAccessPointResponse( uri:string ):string {
				return `{
					"head": {
						"vars": [
							"accessPoint"
						]
					},
					"results": {
						"bindings": [
							{
								"accessPoint": {
									"type": "uri",
									"value": "${ uri }users/"
								}
							}
						]
					}
				}`;
			}

			jasmine.Ajax.stubRequest( "http://example.com/.system/roles/a-role/", null, "POST" ).andReturn( {
				status: 200,
				responseText: constructAccessPointResponse( "http://example.com/.system/roles/a-role/" ),
			} );
			jasmine.Ajax.stubRequest( "http://example.com/.system/roles/a-role-2/", null, "POST" ).andReturn( {
				status: 200,
				responseText: constructAccessPointResponse( "http://example.com/.system/roles/a-role-2/" ),
			} );
			jasmine.Ajax.stubRequest( "http://example.com/.system/roles/another-role/", null, "POST" ).andReturn( {
				status: 200,
				responseText: constructAccessPointResponse( "http://example.com/.system/roles/another-role/" ),
			} );

			let options:HTTP.Request.Options = { timeout: 5555 };
			let spy:jasmine.Spy = spyOn( context.documents, "addMembers" ).and.returnValue( Promise.resolve() );
			let users:(string | Pointer.Class)[] = [ "http://example.com/users/an-user/", Pointer.Factory.create( "http://example.com/users/another-user/" ) ];

			roles.addUsers( "http://example.com/.system/roles/a-role/", users ).then( done.fail ).catch( ( error:Error ) => {
				expect( error instanceof Errors.IllegalStateError ).toBe( true );
				context.setSetting( "system.roles.container", "roles/" );

				let promises:Promise<any>[] = [];
				let promise:Promise<any>;

				promise = roles.addUsers( "http://example.com/.system/roles/a-role/", users );
				expect( promise instanceof Promise ).toBe( true );
				promises.push( promise );

				promise = roles.addUsers( "http://example.com/.system/roles/a-role-2/", users, options );
				expect( promise instanceof Promise ).toBe( true );
				promises.push( promise );

				promise = roles.addUsers( "another-role/", users, options );
				expect( promise instanceof Promise ).toBe( true );
				promises.push( promise );

				Promise.all( promises ).then( () => {
					expect( spy ).toHaveBeenCalledWith( "http://example.com/.system/roles/a-role/users/", users, undefined );
					expect( spy ).toHaveBeenCalledWith( "http://example.com/.system/roles/a-role-2/users/", users, options );
					expect( spy ).toHaveBeenCalledWith( "http://example.com/.system/roles/another-role/users/", users, options );
					done();
				} ).catch( done.fail );

			} );

		} );


		it( hasMethod(
			INSTANCE,
			"removeUser",
			"Removes the relation in the role specified towards the user provided.", [
				{ name: "roleURI", type: "string", description: "The URI of the role from where to remove the user." },
				{ name: "user", type: "string | Carbon.Pointer.Class", description: "The user that wants to be removed from the role." },
				{ name: "requestOptions", type: "Carbon.HTTP.Request.Options", optional: true },
			],
			{ type: "Promise<Carbon.HTTP.Response.Class>" }
		), ():void => {
			expect( roles.removeUser ).toBeDefined();
			expect( Utils.isFunction( roles.removeUser ) );

			let options:HTTP.Request.Options = { timeout: 5555 };
			let spy:jasmine.Spy = spyOn( roles, "removeUsers" );

			roles.removeUser( "http://example.com/.system/roles/a-role/", "http://example.com/users/an-user/" );
			expect( spy ).toHaveBeenCalledWith( "http://example.com/.system/roles/a-role/", [ "http://example.com/users/an-user/" ], undefined );

			roles.removeUser( "http://example.com/.system/roles/a-role-2/", "http://example.com/users/an-user/", options );
			expect( spy ).toHaveBeenCalledWith( "http://example.com/.system/roles/a-role-2/", [ "http://example.com/users/an-user/" ], options );

			roles.removeUser( "another-role/", "http://example.com/users/an-user/", options );
			expect( spy ).toHaveBeenCalledWith( "another-role/", [ "http://example.com/users/an-user/" ], options );
		} );

		it( hasMethod(
			INSTANCE,
			"removeUsers",
			"Remove the relation in the role specified towards the users specified.", [
				{ name: "roleURI", type: "string", description: "The URI of the role from where to remove the users." },
				{ name: "users", type: "(string | Carbon.Pointer.Class)[]", description: "An array with strings or Pointers that refers to the users to be removed from the role." },
				{ name: "requestOptions", type: "Carbon.HTTP.Request.Options", optional: true },
			],
			{ type: "Promise<Carbon.HTTP.Response.Class>" }
		), ( done:{ ():void, fail:() => void } ):void => {
			expect( roles.removeUsers ).toBeDefined();
			expect( Utils.isFunction( roles.removeUsers ) );

			function constructAccessPointResponse( uri:string ):string {
				return `{
					"head": {
						"vars": [
							"accessPoint"
						]
					},
					"results": {
						"bindings": [
							{
								"accessPoint": {
									"type": "uri",
									"value": "${ uri }users/"
								}
							}
						]
					}
				}`;
			}

			jasmine.Ajax.stubRequest( "http://example.com/.system/roles/a-role/", null, "POST" ).andReturn( {
				status: 200,
				responseText: constructAccessPointResponse( "http://example.com/.system/roles/a-role/" ),
			} );
			jasmine.Ajax.stubRequest( "http://example.com/.system/roles/a-role-2/", null, "POST" ).andReturn( {
				status: 200,
				responseText: constructAccessPointResponse( "http://example.com/.system/roles/a-role-2/" ),
			} );
			jasmine.Ajax.stubRequest( "http://example.com/.system/roles/another-role/", null, "POST" ).andReturn( {
				status: 200,
				responseText: constructAccessPointResponse( "http://example.com/.system/roles/another-role/" ),
			} );

			let options:HTTP.Request.Options = { timeout: 5555 };
			let spy:jasmine.Spy = spyOn( context.documents, "removeMembers" ).and.returnValue( Promise.resolve() );
			let users:(string | Pointer.Class)[] = [ "http://example.com/users/an-user/", Pointer.Factory.create( "http://example.com/users/another-user/" ) ];

			roles.removeUsers( "http://example.com/.system/roles/a-role/", users ).then( done.fail ).catch( ( error:Error ) => {
				expect( error instanceof Errors.IllegalStateError ).toBe( true );
				context.setSetting( "system.roles.container", "roles/" );

				let promises:Promise<any>[] = [];
				let promise:Promise<any>;

				promise = roles.removeUsers( "http://example.com/.system/roles/a-role/", users );
				expect( promise instanceof Promise ).toBe( true );
				promises.push( promise );

				promise = roles.removeUsers( "http://example.com/.system/roles/a-role-2/", users, options );
				expect( promise instanceof Promise ).toBe( true );
				promises.push( promise );

				promise = roles.removeUsers( "another-role/", users, options );
				expect( promise instanceof Promise ).toBe( true );
				promises.push( promise );

				Promise.all( promises ).then( () => {
					expect( spy ).toHaveBeenCalledWith( "http://example.com/.system/roles/a-role/users/", users, undefined );
					expect( spy ).toHaveBeenCalledWith( "http://example.com/.system/roles/a-role-2/users/", users, options );
					expect( spy ).toHaveBeenCalledWith( "http://example.com/.system/roles/another-role/users/", users, options );
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
