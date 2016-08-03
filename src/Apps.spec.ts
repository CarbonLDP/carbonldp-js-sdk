import {
	INSTANCE,

	method,
	module,
	clazz,

	isDefined,
	hasConstructor,
	hasMethod,
	hasSignature,
	hasDefaultExport,
} from "./test/JasmineExtender";
import AbstractContext from "./AbstractContext";
import * as App from "./App";
import AppContext from "./App/Context";
import * as Errors from "./Errors";
import IllegalStateError from "./Errors/IllegalStateError";
import * as NS from "./NS";
import * as RDF from "./RDF";
import * as Utils from "./Utils";

import * as Apps from "./Apps";
import DefaultExport from "./Apps";

describe( module( "Carbon/Apps" ), ():void => {
	let context:AbstractContext;

	it( isDefined(), ():void => {
		expect( Apps ).toBeDefined();
		expect( Utils.isObject( Apps ) ).toBe( true );
	} );

	describe( clazz(
		"Carbon.Apps.Class",
		"Class for managing Carbon Apps."
	), ():void => {
		let apps:Apps.Class;
		let platformBaseURI:string = "http://example.com/platform/";
		let appsContainerURI:string = `${platformBaseURI}apps/`;

		beforeEach( ():void => {
			class MockedContext extends AbstractContext {
				resolve( uri:string ):string {
					if( ! RDF.URI.Util.isAbsolute( uri ) ) return RDF.URI.Util.resolve( platformBaseURI, uri );
					return uri;
				}
			}
			context = new MockedContext();
			apps = new Apps.Class( context );
			jasmine.Ajax.install();
		} );

		afterEach( ():void => {
			jasmine.Ajax.uninstall();
		} );

		it( isDefined(), ():void => {
			expect( Apps.Class ).toBeDefined();
			expect( Utils.isFunction( Apps.Class ) ).toBe( true );
		} );

		it( hasConstructor( [
			{ name: "context", type: "Carbon.Context", description: "A context from where Carbon Apps can be administrated." },
		] ), ():void => {
			expect( apps ).toBeTruthy();
			expect( apps instanceof Apps.Class ).toBe( true );
		} );

		describe( method(
			INSTANCE,
			"getContext"
		), ():void => {

			it( hasSignature(
				"Retrieves a `Carbon.App.Context` object from the specified app's URI.", [
					{ name: "uri", type: "string", description: "URI of the app to retrieve and create its context." },
				],
				{ type: "Promise<Carbon.App.Context>" }
			), ( done:{ ():void, fail:() => void } ):void => {
				expect( apps.getContext ).toBeDefined();
				expect( Utils.isFunction( apps.getContext ) ).toBe( true );

				jasmine.Ajax.stubRequest( "http://example.com/platform/apps/example-app/", null, "GET" ).andReturn( {
					status: 200,
					responseHeaders: {
						ETag: '"123456789"',
					},
					responseText: `[ {
						"@id": "http://example.com/platform/apps/example-app/",
						"@graph": [ {
							"@id": "http://example.com/platform/apps/example-app/",
							"@type": [ "${ NS.CS.Class.Application }" ],
							"https://carbonldp.com/ns/v1/security#rootContainer": [ {
								"@id": "https://example.com/apps/example-app/"
							} ],
							"${ NS.CS.Predicate.namae }": [ {
								"@value": "Example App name"
							} ],
							"${ NS.CS.Predicate.description }": [ {
								"@value": "Example App description"
							} ]
						} ]
					} ]`,
				} );

				let spies:any = {
					success: ( appContext:AppContext ):void => {
						expect( appContext instanceof AppContext ).toBe( true );
					},
					fail: ( error ):void => {
						expect( error instanceof Errors.IllegalArgumentError ).toBe( true );
					},
				};
				let successSpy:jasmine.Spy = spyOn( spies, "success" ).and.callThrough();
				let failSpy:jasmine.Spy = spyOn( spies, "fail" ).and.callThrough();

				let promises:Promise<any>[] = [];
				let promise:Promise<any>;
				let spy:jasmine.Spy;

				spy = spyOn( context.documents, "get" ).and.callThrough();

				// Test missing `platform.apps.container` setting
				apps.getContext( "example-app/" ).catch( error => {
					expect( error instanceof IllegalStateError ).toBe( true );
					context.setSetting( "platform.apps.container", appsContainerURI );

					// Test the correct execution of the method
					promise = apps.getContext( "example-app/" );
					expect( promise instanceof Promise ).toBe( true );
					promises.push( promise.then( spies.success ) );

					// Test the correct execution of the method
					promise = apps.getContext( "http://example.com/platform/apps/example-app/" );
					expect( promise instanceof Promise ).toBe( true );
					promises.push( promise.then( spies.success ) );

					// Test sending incorrect app URI
					promise = apps.getContext( "http://example.com/another-wrong-uri/example-app/" );
					expect( promise instanceof Promise ).toBe( true );
					promises.push( promise.catch( spies.fail ) );

					Promise.all( promises ).then( ():void => {
						expect( spy ).toHaveBeenCalledWith( "http://example.com/platform/apps/example-app/" );
						expect( successSpy.calls.count() ).toBe( 2 );
						expect( failSpy.calls.count() ).toBe( 1 );
						done();
					} ).catch( done.fail );
				} );

			} );

			it( hasSignature(
				"Retrieves a `Carbon.App.Context` object from the specified app's Pointer.", [
					{ name: "pointer", type: "Carbon.Pointer.Class", description: "Pointer of the app to retrieve and create its context." },
				],
				{ type: "Promise<Carbon.App.Context>" }
			), ( done:{ ():void, fail:() => void } ):void => {
				expect( apps.getContext ).toBeDefined();
				expect( Utils.isFunction( apps.getContext ) ).toBe( true );

				jasmine.Ajax.stubRequest( "http://example.com/platform/apps/example-app/", null, "GET" ).andReturn( {
					status: 200,
					responseHeaders: {
						ETag: '"1234567890"',
					},
					responseText: `[ {
						"@id": "http://example.com/platform/apps/example-app/",
						"@graph": [ {
							"@id": "http://example.com/platform/apps/example-app/",
							"@type": [ "${ NS.CS.Class.Application }" ],
							"https://carbonldp.com/ns/v1/security#rootContainer": [ {
								"@id": "https://example.com/apps/example-app/"
							} ],
							"${ NS.CS.Predicate.namae }": [ {
								"@value": "Example App name"
							} ],
							"${ NS.CS.Predicate.description }": [ {
								"@value": "Example App description"
							} ]
						} ]
					} ]`,
				} );

				let spies:any = {
					success: ( appContext:AppContext ):void => {
						expect( appContext instanceof AppContext ).toBe( true );
					},
					fail: ( error ):void => {
						expect( error instanceof Errors.IllegalArgumentError ).toBe( true );
					},
				};
				let successSpy:jasmine.Spy = spyOn( spies, "success" ).and.callThrough();
				let failSpy:jasmine.Spy = spyOn( spies, "fail" ).and.callThrough();

				let promises:Promise<any>[] = [];
				let promise:Promise<any>;

				let spyGet:jasmine.Spy = spyOn( context.documents, "get" ).and.callThrough();

				// Test missing `platform.apps.container` setting
				apps.getContext( context.documents.getPointer( "apps/example-app/" ) ).catch( error => {
					expect( error instanceof IllegalStateError ).toBe( true );
					context.setSetting( "platform.apps.container", appsContainerURI );

					// Text correct execution of the method
					promise = apps.getContext( context.documents.getPointer( "apps/example-app/" ) );
					expect( promise instanceof Promise ).toBe( true );
					promises.push( promise.then( spies.success ) );

					// Text correct execution of the method
					promise = apps.getContext( context.documents.getPointer( "http://example.com/platform/apps/example-app/" ) );
					expect( promise instanceof Promise ).toBe( true );
					promises.push( promise.then( spies.success ) );

					// Test sending incorrect app Pointer
					promise = apps.getContext( context.documents.getPointer( "http://example.com/another-wrong-uri/example-app/" ) );
					expect( promise instanceof Promise ).toBe( true );
					promises.push( promise.catch( spies.fail ) );

					Promise.all( promises ).then( ():void => {
						expect( spyGet ).toHaveBeenCalledWith( "http://example.com/platform/apps/example-app/" );
						expect( successSpy.calls.count() ).toBe( 2 );
						expect( failSpy.calls.count() ).toBe( 1 );
						done();
					}, done.fail );

				} );

			} );

		} );

		it( hasMethod(
			INSTANCE,
			"getAllContexts",
			"Retrieves an array of `Carbon.App.Context` objects, of every app the current user have access to.",
			{ type: "Promise<Carbon.App.Context[]>" }
		), ( done:{ ():void, fail:() => void } ):void => {
			expect( apps.getAllContexts ).toBeDefined();
			expect( Utils.isFunction( apps.getAllContexts ) ).toBe( true );

			jasmine.Ajax.stubRequest( "http://example.com/platform/apps/", null, "GET" ).andReturn( {
				status: 200,
				responseHeaders: {
					ETag: '"123456789"',
				},
				responseText: `[
					{
						"@id": "_:00",
						"@type": [
							"https://carbonldp.com/ns/v1/platform#ResponseMetadata",
							"https://carbonldp.com/ns/v1/platform#VolatileResource"
						],
						"https://carbonldp.com/ns/v1/platform#resourceMetadata": [ {
							"@id": "_:01"
						}, {
							"@id": "_:02"
						} ]
					},
					{
						"@id": "_:01",
						"@type": [
							"https://carbonldp.com/ns/v1/platform#ResourceMetadata",
							"https://carbonldp.com/ns/v1/platform#VolatileResource"
						],
						"https://carbonldp.com/ns/v1/platform#eTag": [ {
							"@value": "\\"1234567890\\""
						} ],
						"https://carbonldp.com/ns/v1/platform#resource": [ {
							"@id": "http://example.com/platform/apps/example-app/"
						} ]
					},
					{
						"@id": "_:02",
						"@type": [
							"https://carbonldp.com/ns/v1/platform#ResourceMetadata",
							"https://carbonldp.com/ns/v1/platform#VolatileResource"
						],
						"https://carbonldp.com/ns/v1/platform#eTag": [ {
							"@value": "\\"0987654321\\""
						} ],
						"https://carbonldp.com/ns/v1/platform#resource": [ {
							"@id": "http://example.com/platform/apps/another-app/"
						} ]
					},
					{
						"@id": "http://example.com/platform/apps/",
						"@graph": [ {
							"@id": "http://example.com/platform/apps/",
							"@type": [ "http://www.w3.org/ns/ldp#BasicContainer" ],
							"http://www.w3.org/ns/ldp#hasMemberRelation": [ {
								"@id": "http://www.w3.org/ns/ldp#member"
							} ],
							"http://www.w3.org/ns/ldp#member": [ {
								"@id": "http://example.com/platform/apps/example-app/"
							}, {
								"@id": "http://example.com/platform/apps/another-app/"
							} ]
						} ]
					},
					{
						"@id": "http://example.com/platform/apps/another-app/",
						"@graph": [ {
							"@id": "http://example.com/platform/apps/another-app/",
							"@type": [ "${NS.CS.Class.Application}" ],
							"https://carbonldp.com/ns/v1/security#rootContainer": [ {
								"@id": "https://example.com/apps/another-app/"
							} ],
							"${NS.CS.Predicate.namae}": [ {
								"@value": "Another App name"
							} ]
						} ]
					},
					{
						"@id": "http://example.com/platform/apps/example-app/",
						"@graph": [ {
							"@id": "http://example.com/platform/apps/example-app/",
							"@type": [ "${NS.CS.Class.Application}" ],
							"https://carbonldp.com/ns/v1/security#rootContainer": [ {
								"@id": "https://example.com/apps/example-app/"
							} ],
							"${NS.CS.Predicate.namae}": [ {
								"@value": "Example App name"
							} ],
							"${NS.CS.Predicate.description}": [ {
								"@value": "Example App description"
							} ]
						} ]
					}
				]`,
			} );


			let spies:any = {
				success: ( appsContext:AppContext[] ):void => {
					expect( appsContext.length ).toBe( 2 );
					for( let appContext of appsContext ) {
						expect( appContext instanceof AppContext ).toBe( true );
					}
				},
			};
			let successSpy:jasmine.Spy = spyOn( spies, "success" ).and.callThrough();

			let promise:Promise<any>;

			// Test missing `platform.apps.container` setting
			apps.getAllContexts().catch( stateError => {
				expect( stateError instanceof IllegalStateError ).toBe( true );
				context.setSetting( "platform.apps.container", appsContainerURI );

				// Text correct execution of the method
				promise = apps.getAllContexts().then( spies.success );
				expect( promise instanceof Promise ).toBe( true );

				promise.then( ():void => {
					expect( successSpy.calls.count() ).toBe( 1 );
					done();
				} ).catch( done.fail );

			} );

		} );

		it( hasMethod(
			INSTANCE,
			"create",
			"Persists a `Carbon.App.Class` object using the slug specified.\n" +
			"Returns a Promise with a Pointer to the stored App, and the response of the request.", [
				{ name: "slug", type: "string", description: "Slug that will be used for the URI of the new app." },
				{ name: "appDocument", type: "Carbon.App.Class", description: "App document that will be persisted." },
			],
			{ type: "Promise<[ Carbon.Pointer.Class, Carbon.HTTP.Response.Class ]>" }
		), ( done:{():void, fail:() => void} ):void => {
			expect( apps.create ).toBeDefined();
			expect( Utils.isFunction( apps.create ) ).toBe( true );

			let promises:Promise<any>[] = [];
			let promise:Promise<any>;
			let spy:jasmine.Spy = spyOn( context.documents, "createChild" );
			let app:App.Class = App.Factory.create( "App name", "App description" );

			// Test missing `platform.apps.container` setting
			promises.push( apps.create( app ).catch( stateError => {
				expect( stateError instanceof IllegalStateError ).toBe( true );
			} ) );

			context.setSetting( "platform.apps.container", appsContainerURI );

			//  Test correct execution of the method
			promise = apps.create( app );
			expect( promise instanceof Promise ).toBe( true );
			promises.push( promise.then( () => {
				expect( spy ).toHaveBeenCalledWith( appsContainerURI, app, null );
			} ) );

			// Test incorrect `Carbon.App.Class` object provided
			promise = apps.create( null );
			expect( promise instanceof Promise ).toBe( true );
			promises.push( promise.catch( error => {
				expect( error instanceof Errors.IllegalArgumentError );
			} ) );

			// Test correct execution of the method
			promise = apps.create( app, "slug-of-app" );
			expect( promise instanceof Promise ).toBe( true );
			promises.push( promise.then( () => {
				expect( spy ).toHaveBeenCalledWith( appsContainerURI, app, "slug-of-app" );
			} ) );

			// Test correct execution of the method, where delegate the manage of the `null` slug to `context.documents.createChild` method
			apps.create( app, null );
			expect( promise instanceof Promise ).toBe( true );
			promises.push( promise.then( () => {
				expect( spy ).toHaveBeenCalledWith( appsContainerURI, app, null );
			} ) );

			// Test incorrect `Carbon.App.Class` object provided
			promise = apps.create( null, "slug-of-app" );
			expect( promise instanceof Promise ).toBe( true );
			promises.push( promise.catch( error => {
				expect( error instanceof Errors.IllegalArgumentError );
			} ) );

			Promise.all( promises ).then( done ).catch( done.fail );
		} );
	} );

	it( hasDefaultExport( "Carbon.Apps.Class" ), ():void => {
		expect( DefaultExport ).toBeDefined();
		expect( Apps.Class ).toBe( DefaultExport );
	} );

} );
