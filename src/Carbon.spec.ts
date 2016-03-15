import {
	INSTANCE,
	STATIC,

	module,
	interfaze,
	clazz,
	method,

	isDefined,
	hasConstructor,
	hasMethod,
	hasSignature,
	hasProperty,
	hasInterface,
	extendsClass,

} from "./test/JasmineExtender";
import * as Utils from "./Utils";
import * as Auth from "./Auth";
import setting from "./settings";
import * as APIDescription from "./APIDescription";
import Apps from "./Apps";
import Documents from "./Documents";
import * as Document from "./Document";
import * as RDF from "./RDF";
import * as HTTP from "./HTTP";

import Carbon from "./Carbon";

describe( module( "Carbon" ), ():void => {

	describe( clazz(
		"Carbon",
		"Principal class that contains all references for use the SDK."
	), ():void => {
		let carbon:Carbon;
		let myCarbon:Carbon;

		it( isDefined(), ():void => {
			expect( Carbon ).toBeDefined();
			expect( Utils.isFunction( Carbon ) ).toBe( true );
		});

		it( hasProperty(
			STATIC,
			"version",
			"string",
			"Returns the version of the SDK"
		), ():void => {
			expect( Carbon.version ).toBeDefined();
			expect( Utils.isString( Carbon.version ) ).toBe( true );

			expect( Carbon.version ).toMatch( /\d+\.\d+\.\d+.*/ );
		});

		it( hasProperty(
			STATIC,
			"Apps",
			"Class<Carbon.Apps>",
			"Static property that set a reference to the Apps Class"
		), ():void => {
			expect( Carbon.Apps ).toBeDefined();
			expect( Carbon.Apps ).toBe( Apps );
		});

		it( hasProperty(
			STATIC,
			"Auth",
			"Module<Carbon.Auth>",
			"Static property that set a reference to the Auth Module"
		), ():void => {
			expect( Carbon.Auth ).toBeDefined();
			expect( Carbon.Auth ).toBe( Auth );
		});

		it( hasProperty(
			STATIC,
			"Document",
			"Module<Carbon.Document>",
			"Static property that set a reference to the Document Module"
		), ():void => {
			expect( Carbon.Document ).toBeDefined();
			expect( Carbon.Document ).toBe( Document );
		});

		it( hasProperty(
			STATIC,
			"Documents",
			"Class<Carbon.Documents>",
			"Static property that set a reference to the Documents Class"
		), ():void => {
			expect( Carbon.Documents ).toBeDefined();
			expect( Carbon.Documents ).toBe( Documents );
		});

		it( hasProperty(
			STATIC,
			"HTTP",
			"Module<Carbon.HTTP>",
			"Static property that set a reference to the HTTP Module"
		), ():void => {
			expect( Carbon.HTTP ).toBeDefined();
			expect( Carbon.HTTP ).toBe( HTTP );
		});

		it( hasProperty(
			STATIC,
			"RDF",
			"Module<Carbon.RDF>",
			"Static property that set a reference to the RDF Module"
		), ():void => {
			expect( Carbon.RDF ).toBeDefined();
			expect( Carbon.RDF ).toBe( RDF );
		});

		it( hasProperty(
			STATIC,
			"Utils",
			"Module<Carbon.Utils>",
			"Static property that set a reference to the Utils Module"
		), ():void => {
			expect( Carbon.Utils ).toBeDefined();
			expect( Carbon.Utils ).toBe( Utils );
		});

		beforeEach( ():void => {
			carbon = new Carbon();

			myCarbon = new Carbon({
				"domain": "example.com",
				"http.ssl": false,
				"auth.method": Auth.Method.TOKEN,
				"platform.container": "example-platform/",
				"platform.apps.container": "example-apps/"
			});

			jasmine.Ajax.install();
		});

		afterEach( ():void => {
			jasmine.Ajax.uninstall();
		});

		it( hasConstructor([
			{ name: "settings", type: "any", optional: true }
		]), ():void => {
			// Instantiated in BeforeEach
			expect( carbon ).toBeTruthy();
			expect( carbon instanceof Carbon ).toBe( true );

			expect( myCarbon ).toBeTruthy();
			expect( myCarbon instanceof Carbon ).toBe( true );
		});

		it( hasMethod(
			INSTANCE,
			"resolve",
			"Resolve the URI provided in the context of the instance, this information is provided in the settings object.", [
				{ name: "uri", type: "string" }
			],
			{ type: "string" }
		), ():void => {
			expect( carbon.resolve ).toBeDefined();
			expect( Utils.isFunction( carbon.resolve ) ).toBe( true );

			expect( carbon.resolve( "http://example.com/platform/my-resource/" ) ).toBe( "http://example.com/platform/my-resource/" );
			expect( carbon.resolve( "my-resource/" ) ).toBe( "https://carbonldp.com/platform/my-resource/" );

			expect( myCarbon.resolve( "http://example.com/example-platform/my-resource/" ) ).toBe( "http://example.com/example-platform/my-resource/" );
			expect( myCarbon.resolve( "my-resource/" ) ).toBe( "http://example.com/example-platform/my-resource/" );
		});

		it( hasMethod(
			INSTANCE,
			"getAPIDescription",
			"Returns the API description of the connected platform in the instance of Carbon",
			{ type: "Promise<Carbon.APIDescription.Class>"}
		), ( done:{ ():void, fail:() => void }):void => {
			expect( carbon.getAPIDescription ).toBeDefined();
			expect( Utils.isFunction( carbon.getAPIDescription ) ).toBe( true );

			let promise:Promise<any>;
			promise = carbon.getAPIDescription();
			expect( promise instanceof Promise ).toBe( true );

			jasmine.Ajax.requests.mostRecent().respondWith({
				status: 200,
				responseHeaders: {
					"ETag": 'W/"123456789"'
				},
				responseText: `[{
				    "@graph": [{
				        "@id": "https://carbonldp.com/platform/api/",
				        "@type": [
							"http://www.w3.org/ns/ldp#Resource",
							"https://carbonldp.com/ns/v1/platform#API",
							"https://carbonldp.com/ns/v1/platform#VolatileResource"
				        ],
				        "https://carbonldp.com/ns/v1/platform#buildDate": [{
				            "@type": "http://www.w3.org/2001/XMLSchema#dateTime",
				            "@value": "2016-06-01T00:00:00.000-06:00"
				        }],
				        "https://carbonldp.com/ns/v1/platform#version": [{
				            "@value": "1.0.0"
				        }]
				      }
				    ],
				    "@id": "https://carbonldp.com/platform/api/"
				}]`
			});

			promise.then( ( description:APIDescription.Class ):void => {
				expect( description ).toBeTruthy();
				expect( description.version ).toBe( "1.0.0" );
				done();
			}, done.fail );
		});

		it( hasProperty(
			INSTANCE,
			"apps",
			"Carbon.Apps",
			"Instance of the class `Carbon.Apps` in the context of the Carbon instance."
		), ():void => {
			expect( carbon.apps ).toBeDefined();
			expect( Utils.isObject( carbon.apps ) );
			expect( carbon.apps instanceof Apps );
		});

	});

});