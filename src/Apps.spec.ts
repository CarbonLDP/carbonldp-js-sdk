import {
	INSTANCE,
	STATIC,

	module,
	clazz,

	isDefined,
	hasConstructor,
	hasMethod,
	hasProperty,
	extendsClass,
	hasDefaultExport
} from "./test/JasmineExtender";
import * as Utils from "./Utils";
import AbstractContext from "./AbstractContext";
import * as App from "./App";

import Apps from "./Apps";

describe( module( "Carbon/Apps" ), ():void => {
	let context:AbstractContext;

	describe( clazz(
		"Carbon.Apps",
		"Class for obtaining Carbon Apps."
	), ():void => {
		let apps:Apps;

		beforeEach( ():void => {
			class MockedContext extends AbstractContext {
				resolve( uri:string ):string {
					return uri;
				}
			}
			context = new MockedContext();
			context.setSetting( "platform.apps.container", "http://example.com/platform/apps/" );
			apps = new Apps( context );
			jasmine.Ajax.install();
		});

		afterEach( ():void => {
			jasmine.Ajax.uninstall();
		});

		it( isDefined(), ():void => {
			expect( Apps ).toBeDefined();
			expect( Utils.isFunction( Apps ) ).toBe( true );
		});

		it( hasConstructor([
			{ name: "context", type: "Carbon.Context", description: "A context from where Carbon Apps can be obtained" }
		]), ():void => {
			expect( apps ).toBeTruthy();
			expect( apps instanceof Apps ).toBe( true );
		});

		it( hasMethod(
			INSTANCE,
			"get",
			"Obtains an `Carbon.App.Context` object of the specified app URI, if it exists within the context of the Apps instance.", [
				{ name: "uri", type: "string" }
			],
			{ type: "Promise<Carbon.App.Context>"}
		), ( done:{ ():void, fail:() => void } ):void => {
			expect( apps.get ).toBeDefined();
			expect( Utils.isFunction( apps.get ) ).toBe( true );

			let spies = {
				success: ( appContext:App.Context ):void => {
					expect( appContext instanceof App.Context ).toBe( true );
				},
				fail: ():void => {
				}
			};
			let successSpy = spyOn( spies, "success" ).and.callThrough();
			let failSpy = spyOn( spies, "fail" ).and.callThrough();

			let promise:Promise<any>;

			promise = apps.get( 'example-app/' ).then( spies.success, spies.fail );
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
				          "https://carbonldp.com/ns/v1/security#Application"
				        ],
				        "https://carbonldp.com/ns/v1/security#rootContainer": [{
				            "@id": "https://example.com/apps/example-app/"
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

		it( hasMethod(
			INSTANCE,
			"getAll",
			"Obtains all the `Carbon.App.Context` objects of every app where the context of the Apps instance can reach.",
			{ type: "Promise<Carbon.App.Context[]>"}
		), ( done:{ ():void, fail:() => void } ):void => {
			expect( apps.getAll ).toBeDefined();
			expect( Utils.isFunction( apps.getAll ) ).toBe( true );

			let spies = {
				success: ( appsContext:App.Context[] ):void => {
					expect( appsContext.length ).toBe( 2 );
					for( let appContext of appsContext ) {
						expect( appContext instanceof App.Context ).toBe( true );
					}
				},
				fail: ():void => {
				}
			};
			let successSpy = spyOn( spies, "success" ).and.callThrough();
			let failSpy = spyOn( spies, "fail" ).and.callThrough();

			let promise:Promise<any>;

			promise = apps.getAll().then( spies.success, spies.fail );
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
				          "https://carbonldp.com/ns/v1/security#Application"
				        ],
				        "https://carbonldp.com/ns/v1/security#rootContainer": [{
				            "@id": "https://example.com/apps/example-app/"
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
				          "https://carbonldp.com/ns/v1/security#Application"
				        ],
				        "https://carbonldp.com/ns/v1/security#rootContainer": [{
				            "@id": "https://example.com/apps/another-app/"
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

	});

});
