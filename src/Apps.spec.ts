import {
	INSTANCE,
	STATIC,

	method,
	module,
	clazz,

	isDefined,
	hasConstructor,
	hasMethod,
	hasSignature,
	reexports,
	hasDefaultExport
} from "./test/JasmineExtender";
import * as Utils from "./Utils";
import AbstractContext from "./AbstractContext";
import AppContext from "./App/Context";
import * as NS from "./NS";
import * as Errors from "./Errors";
import * as App from "./App";
import * as Pointer from "./Pointer";
import * as RDF from "./RDF";

import * as Apps from "./Apps";
import DefaultExport from "./Apps";

describe( module( "Carbon/Apps" ), ():void => {
	let context:AbstractContext;

	it( isDefined(), ():void => {
		expect( Apps ).toBeDefined();
		expect( Utils.isObject( Apps ) ).toBe( true );
	});

	describe( clazz(
		"Carbon.Apps.Class",
		"Class for obtaining Carbon Apps."
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
			context.setSetting( "platform.apps.container", appsContainerURI );
			apps = new Apps.Class( context );
			jasmine.Ajax.install();
		});

		afterEach( ():void => {
			jasmine.Ajax.uninstall();
		});

		it( isDefined(), ():void => {
			expect( Apps.Class ).toBeDefined();
			expect( Utils.isFunction( Apps.Class ) ).toBe( true );
		});

		it( hasConstructor([
			{ name: "context", type: "Carbon.Context", description: "A context from where Carbon Apps can be obtained" }
		]), ():void => {
			expect( apps ).toBeTruthy();
			expect( apps instanceof Apps.Class ).toBe( true );
		});

		describe( method(
			INSTANCE,
			"getContext"
		), ():void => {

			it( hasSignature(
				"Obtains a `Carbon.App.Context` object of the specified app URI, if it exists within the context of the Apps instance.", [
					{ name: "uri", type: "string" }
				],
				{ type: "Promise<Carbon.App.Context>"}
			), ( done:{ ():void, fail:() => void } ):void => {
				expect( apps.getContext ).toBeDefined();
				expect( Utils.isFunction( apps.getContext ) ).toBe( true );

				let spies = {
					success: ( appContext:AppContext ):void => {
						expect( appContext instanceof AppContext ).toBe( true );
					},
					fail: ( some ):void => {
						console.log( some );
					}
				};
				let successSpy = spyOn( spies, "success" ).and.callThrough();
				let failSpy = spyOn( spies, "fail" ).and.callThrough();

				let promise:Promise<any>;
				let spy:jasmine.Spy;

				spy = spyOn( context.documents, "get" ).and.callThrough();

				promise = apps.getContext( 'example-app/' ).then( spies.success, spies.fail );
				expect( promise instanceof Promise ).toBe( true );

				jasmine.Ajax.requests.mostRecent().respondWith({
					status: 200,
					responseHeaders: {
						ETag: 'W/"123456789"'
					},
					responseText: `[{
				    "@id": "http://example.com/platform/apps/example-app/",
				    "@graph": [{
				        "@id": "http://example.com/platform/apps/example-app/",
				        "@type": [
				          "http://www.w3.org/ns/ldp#RDFSource",
				          "http://www.w3.org/ns/ldp#BasicContainer",
				          "${NS.CS.Class.Application}"
				        ],
				        "https://carbonldp.com/ns/v1/security#rootContainer": [{
				            "@id": "https://example.com/apps/example-app/"
				        }],
				        "${NS.CS.Predicate.name}": [{
				            "@value": "Example App name"
				        }],
				        "${NS.CS.Predicate.description}": [{
				            "@value": "Example App description"
				        }]
				    }]
				}]`
				});

				promise.then( ():void => {
					expect( spy ).toHaveBeenCalledWith( "http://example.com/platform/apps/example-app/" );
					expect( successSpy.calls.count() ).toBe( 1 );
					expect( failSpy.calls.count() ).toBe( 0 );
					done();
				}, done.fail );
			});

			it( hasSignature(
				"Obtains a `Carbon.App.Context` object of the specified Pointer object, if it exists within the context of the Apps instance.", [
					{ name: "pointer", type: "Carbon.Pointer.Class" }
				],
				{ type: "Promise<Carbon.App.Context>"}
			), ( done:{ ():void, fail:() => void } ):void => {
				expect( apps.getContext ).toBeDefined();
				expect( Utils.isFunction( apps.getContext ) ).toBe( true );

				let spies = {
					success: ( appContext:AppContext ):void => {
						expect( appContext instanceof AppContext ).toBe( true );
					},
					fail: ( some ):void => {
						console.log( some );
					}
				};
				let successSpy = spyOn( spies, "success" ).and.callThrough();
				let failSpy = spyOn( spies, "fail" ).and.callThrough();

				let promise:Promise<any>;
				let pointer:Pointer.Class;
				let spy:jasmine.Spy;

				spy = spyOn( context.documents, "get" ).and.callThrough();
				pointer = context.documents.getPointer( "apps/example-app/" );

				promise = apps.getContext( pointer ).then( spies.success, spies.fail );
				expect( promise instanceof Promise ).toBe( true );

				jasmine.Ajax.requests.mostRecent().respondWith({
					status: 200,
					responseHeaders: {
						ETag: 'W/"123456789"'
					},
					responseText: `[{
				    "@id": "http://example.com/platform/apps/example-app/",
				    "@graph": [{
				        "@id": "http://example.com/platform/apps/example-app/",
				        "@type": [
				          "http://www.w3.org/ns/ldp#RDFSource",
				          "http://www.w3.org/ns/ldp#BasicContainer",
				          "${NS.CS.Class.Application}"
				        ],
				        "https://carbonldp.com/ns/v1/security#rootContainer": [{
				            "@id": "https://example.com/apps/example-app/"
				        }],
				        "${NS.CS.Predicate.name}": [{
				            "@value": "Example App name"
				        }],
				        "${NS.CS.Predicate.description}": [{
				            "@value": "Example App description"
				        }]
				    }]
				}]`
				});

				promise.then( ():void => {
					expect( spy ).toHaveBeenCalledWith( "http://example.com/platform/apps/example-app/" );
					expect( successSpy.calls.count() ).toBe( 1 );
					expect( failSpy.calls.count() ).toBe( 0 );
					done();
				}, done.fail );
			});

		});

		it( hasMethod(
			INSTANCE,
			"getAllContexts",
			"Obtains all the `Carbon.App.Context` objects of every app where the context of the Apps instance can reach.",
			{ type: "Promise<Carbon.App.Context[]>"}
		), ( done:{ ():void, fail:() => void } ):void => {
			expect( apps.getAllContexts ).toBeDefined();
			expect( Utils.isFunction( apps.getAllContexts ) ).toBe( true );

			let spies = {
				success: ( appsContext:AppContext[] ):void => {
					expect( appsContext.length ).toBe( 2 );
					for( let appContext of appsContext ) {
						expect( appContext instanceof AppContext ).toBe( true );
					}
				},
				fail: ():void => {
				}
			};
			let successSpy = spyOn( spies, "success" ).and.callThrough();
			let failSpy = spyOn( spies, "fail" ).and.callThrough();

			let promise:Promise<any>;

			promise = apps.getAllContexts().then( spies.success, spies.fail );
			expect( promise instanceof Promise ).toBe( true );

			jasmine.Ajax.requests.at( 0 ).respondWith({
				status: 200,
				responseHeaders: {
					ETag: 'W/"123456789"'
				},
				responseText: `[{
				    "@id": "http://example.com/platform/apps/",
				    "@graph": [{
				        "@id": "http://example.com/platform/apps/",
				        "@type": [
				          "http://www.w3.org/ns/ldp#BasicContainer"
				        ],
				        "http://www.w3.org/ns/ldp#hasMemberRelation": [{
				            "@id": "http://www.w3.org/ns/ldp#member"
				        }],
				        "http://www.w3.org/ns/ldp#member": [{
				            "@id": "http://example.com/platform/apps/example-app/"
				        }, {
				            "@id": "http://example.com/platform/apps/another-app/"
				        }]
				    }]
				}]`
			});
			jasmine.Ajax.stubRequest( /example-app/ ).andReturn({
				status: 200,
				responseHeaders: {
					ETag: 'W/"123456789"'
				},
				responseText: `[{
				    "@id": "http://example.com/platform/apps/example-app/",
				    "@graph": [{
				        "@id": "http://example.com/platform/apps/example-app/",
				        "@type": [
				          "http://www.w3.org/ns/ldp#RDFSource",
				          "http://www.w3.org/ns/ldp#BasicContainer",
				          "${NS.CS.Class.Application}"
				        ],
				        "https://carbonldp.com/ns/v1/security#rootContainer": [{
				            "@id": "https://example.com/apps/example-app/"
				        }],
				        "${NS.CS.Predicate.name}": [{
				            "@value": "Example App name"
				        }],
				        "${NS.CS.Predicate.description}": [{
				            "@value": "Example App description"
				        }]
				    }]
				}]`
			});
			jasmine.Ajax.stubRequest( /another-app/ ).andReturn({
				status: 200,
				responseHeaders: {
					ETag: 'W/"123456789"'
				},
				responseText: `[{
				    "@id": "http://example.com/platform/apps/another-app/",
				    "@graph": [{
				        "@id": "http://example.com/platform/apps/another-app/",
				        "@type": [
				          "http://www.w3.org/ns/ldp#RDFSource",
				          "http://www.w3.org/ns/ldp#BasicContainer",
				          "${NS.CS.Class.Application}"
				        ],
				        "https://carbonldp.com/ns/v1/security#rootContainer": [{
				            "@id": "https://example.com/apps/another-app/"
				        }],
				        "${NS.CS.Predicate.name}": [{
				            "@value": "Another App name"
				        }]
				    }]
				}]`
			});

			promise.then( ():void => {
				expect( successSpy.calls.count() ).toBe( 1 );
				expect( failSpy.calls.count() ).toBe( 0 );
				done();
			}, done.fail );
		});

		describe( method(
			INSTANCE,
			"create"
		), ():void => {

			it( hasSignature(
				"Persists an App Document in the server, generating a unique slug.\n" +
				"Returns a Pointer for the stored App Document, and the response of the call.", [
					{ name: "appDocument", type: "Carbon.App.Class" }
				],
				{ type: "Promise<Carbon.Pointer.Class, Carbon.HTTP.Response.Class>" }
			), ( done ):void => {
				expect( apps.create ).toBeDefined();
				expect( Utils.isFunction( apps.create ) ).toBe( true );

				let spy = spyOn( context.documents, "createChild" );
				let app:App.Class = App.Factory.create( "App name", "App description" );

				apps.create( app );
				expect( spy ).toHaveBeenCalledWith( appsContainerURI, null, app );

				let promise:Promise<any> = apps.create( null );
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

			it( hasSignature(
				"Persists an App Document in the server using the slug specified.\n" +
				"Returns a Pointer for the stored App Document, and the response of the call.", [
					{ name: "slug", type: "string" },
					{ name: "appDocument", type: "Carbon.App.Class" }
				],
				{ type: "Promise<Carbon.Pointer.Class, Carbon.HTTP.Response.Class>" }
			), ( done:() => void ):void => {
				expect( apps.create ).toBeDefined();
				expect( Utils.isFunction( apps.create ) ).toBe( true );

				let promise:Promise<any>;
				let spy = spyOn( context.documents, "createChild" );
				let app:App.Class = App.Factory.create( "App name", "App description" );

				apps.create( "slug-of-app", app );
				expect( spy ).toHaveBeenCalledWith( appsContainerURI, "slug-of-app", app );

				spy.calls.reset();
				apps.create( null, app );
				expect( spy ).toHaveBeenCalledWith( appsContainerURI, null, app );

				promise = apps.create( "slug-of-app", null );
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

	it( hasDefaultExport( "Carbon.Apps.Class" ), ():void => {
		expect( DefaultExport ).toBeDefined();
		expect( Apps.Class ).toBe( DefaultExport );
	});

});
