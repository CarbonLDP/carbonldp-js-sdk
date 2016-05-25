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
	reexports,

} from "./test/JasmineExtender";

import AbstractContext from "./AbstractContext";
import * as AccessPoint from "./AccessPoint";
import * as Agent from "./Agent";
import * as Agents from "./Agents";
import * as APIDescription from "./APIDescription";
import * as App from "./App";
import * as Apps from "./Apps";
import * as Auth from "./Auth";
import * as Document from "./Document";
import Documents from "./Documents";
import * as Errors from "./Errors";
import * as Fragment from "./Fragment";
import * as HTTP from "./HTTP";
import * as JSONLDConverter from "./JSONLDConverter";
import * as LDP from "./LDP";
import * as NamedFragment from "./NamedFragment";
import * as NS from "./NS";
import * as ObjectSchema from "./ObjectSchema";
import * as Persisted from "./Persisted";
import * as PersistedApp from "./PersistedApp";
import * as PersistedDocument from "./PersistedDocument";
import * as PersistedFragment from "./PersistedFragment";
import * as PersistedNamedFragment from "./PersistedNamedFragment";
import * as PersistedResource from "./PersistedResource";
import * as Pointer from "./Pointer";
import * as RDF from "./RDF";
import * as Resource from "./Resource";
import * as SDKContext from "./SDKContext";
import * as SPARQL from "./SPARQL";
import * as Utils from "./Utils";

import Carbon from "./Carbon";

describe( module( "Carbon" ), ():void => {

	describe( clazz(
		"Carbon",
		"The main class of the SDK, which contains all the references of the modules used in the the SDK."
	), ():void => {
		let carbon:Carbon;
		let myCarbon:Carbon;

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

		it( isDefined(), ():void => {
			expect( Carbon ).toBeDefined();
			expect( Utils.isFunction( Carbon ) ).toBe( true );
		});

		it( extendsClass( "Carbon.AbstractContext" ), ():void => {
			expect( carbon instanceof AbstractContext ).toBe( true );
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
			INSTANCE,
			"version",
			"string",
			"Returns the version of the SDK"
		), ():void => {
			expect( carbon.version ).toBeDefined();
			expect( Utils.isString( carbon.version ) ).toBe( true );

			expect( carbon.version ).toMatch( /\d+\.\d+\.\d+.*/ );
		});

		it( reexports(
			STATIC,
			"Agent",
			"Carbon/Agent"
		), ():void => {
			expect( Carbon.Agent ).toBeDefined();
			expect( Carbon.Agent ).toBe( Agent );
		});

		it( reexports(
			STATIC,
			"AccessPoint",
			"Carbon/AccessPoint"
		), ():void => {
			expect( Carbon.AccessPoint ).toBeDefined();
			expect( Carbon.AccessPoint ).toBe( AccessPoint );
		});

		it( reexports(
			STATIC,
			"Agents",
			"Carbon/Agents"
		), ():void => {
			expect( Carbon.Agents ).toBeDefined();
			expect( Carbon.Agents ).toBe( Agents );
		});

		it( reexports(
			STATIC,
			"App",
			"Carbon/App"
		), ():void => {
			expect( Carbon.App ).toBeDefined();
			expect( Carbon.App ).toBe( App );
		});

		it( reexports(
			STATIC,
			"Apps",
			"Carbon/Apps"
		), ():void => {
			expect( Carbon.Apps ).toBeDefined();
			expect( Carbon.Apps ).toBe( Apps );
		});

		it( reexports(
			STATIC,
			"Auth",
			"Carbon/Auth"
		), ():void => {
			expect( Carbon.Auth ).toBeDefined();
			expect( Carbon.Auth ).toBe( Auth );
		});

		it( reexports(
			STATIC,
			"Document",
			"Carbon/Document"
		), ():void => {
			expect( Carbon.Document ).toBeDefined();
			expect( Carbon.Document ).toBe( Document );
		});

		it( reexports(
			STATIC,
			"Documents",
			"Carbon/Documents"
		), ():void => {
			expect( Carbon.Documents ).toBeDefined();
			expect( Carbon.Documents ).toBe( Documents );
		});

		it( reexports(
			STATIC,
			"Errors",
			"Carbon/Errors"
		), ():void => {
			expect( Carbon.Errors ).toBeDefined();
			expect( Carbon.Errors ).toBe( Errors );
		});

		it( reexports(
			STATIC,
			"Fragment",
			"Carbon/Fragment"
		), ():void => {
			expect( Carbon.Fragment ).toBeDefined();
			expect( Carbon.Fragment ).toBe( Fragment );
		});

		it( reexports(
			STATIC,
			"HTTP",
			"Carbon/HTTP"
		), ():void => {
			expect( Carbon.HTTP ).toBeDefined();
			expect( Carbon.HTTP ).toBe( HTTP );
		});

		it( reexports(
			STATIC,
			"JSONLDConverter",
			"Carbon/JSONLDConverter"
		), ():void => {
			expect( Carbon.JSONLDConverter ).toBeDefined();
			expect( Carbon.JSONLDConverter ).toBe( JSONLDConverter );
		});

		it( reexports(
			STATIC,
			"LDP",
			"Carbon/LDP"
		), ():void => {
			expect( Carbon.LDP ).toBeDefined();
			expect( Carbon.LDP ).toBe( LDP );
		});

		it( reexports(
			STATIC,
			"NamedFragment",
			"Carbon/NamedFragment"
		), ():void => {
			expect( Carbon.NamedFragment ).toBeDefined();
			expect( Carbon.NamedFragment ).toBe( NamedFragment );
		});

		it( reexports(
			STATIC,
			"NS",
			"Carbon/NS"
		), ():void => {
			expect( Carbon.NS ).toBeDefined();
			expect( Carbon.NS ).toBe( NS );
		});

		it( reexports(
			STATIC,
			"ObjectSchema",
			"Carbon/ObjectSchema"
		), ():void => {
			expect( Carbon.ObjectSchema ).toBeDefined();
			expect( Carbon.ObjectSchema ).toBe( ObjectSchema );
		});

		it( reexports(
			STATIC,
			"Persisted",
			"Carbon/Persisted"
		), ():void => {
			expect( Carbon.Persisted ).toBeDefined();
			expect( Carbon.Persisted ).toBe( Persisted );
		});

		it( reexports(
			STATIC,
			"PersistedApp",
			"Carbon/PersistedApp"
		), ():void => {
			expect( Carbon.PersistedApp ).toBeDefined();
			expect( Carbon.PersistedApp ).toBe( PersistedApp );
		});

		it( reexports(
			STATIC,
			"PersistedDocument",
			"Carbon/PersistedDocument"
		), ():void => {
			expect( Carbon.PersistedDocument ).toBeDefined();
			expect( Carbon.PersistedDocument ).toBe( PersistedDocument );
		});

		it( reexports(
			STATIC,
			"PersistedFragment",
			"Carbon/PersistedFragment"
		), ():void => {
			expect( Carbon.PersistedFragment ).toBeDefined();
			expect( Carbon.PersistedFragment ).toBe( PersistedFragment );
		});

		it( reexports(
			STATIC,
			"PersistedNamedFragment",
			"Carbon/PersistedNamedFragment"
		), ():void => {
			expect( Carbon.PersistedNamedFragment ).toBeDefined();
			expect( Carbon.PersistedNamedFragment ).toBe( PersistedNamedFragment );
		});

		it( reexports(
			STATIC,
			"PersistedResource",
			"Carbon/PersistedResource"
		), ():void => {
			expect( Carbon.PersistedResource ).toBeDefined();
			expect( Carbon.PersistedResource ).toBe( PersistedResource );
		});

		it( reexports(
			STATIC,
			"Pointer",
			"Carbon/Pointer"
		), ():void => {
			expect( Carbon.Pointer ).toBeDefined();
			expect( Carbon.Pointer ).toBe( Pointer );
		});

		it( reexports(
			STATIC,
			"RDF",
			"Carbon/RDF"
		), ():void => {
			expect( Carbon.RDF ).toBeDefined();
			expect( Carbon.RDF ).toBe( RDF );
		});

		it( reexports(
			STATIC,
			"Resource",
			"Carbon/Resource"
		), ():void => {
			expect( Carbon.Resource ).toBeDefined();
			expect( Carbon.Resource ).toBe( Resource );
		});

		it( reexports(
			STATIC,
			"SDKContext",
			"Carbon/SDKContext"
		), ():void => {
			expect( Carbon.SDKContext ).toBeDefined();
			expect( Carbon.SDKContext ).toBe( SDKContext );
		});

		it( reexports(
			STATIC,
			"SPARQL",
			"Carbon/SPARQL"
		), ():void => {
			expect( Carbon.SPARQL ).toBeDefined();
			expect( Carbon.SPARQL ).toBe( SPARQL );
		});

		it( reexports(
			STATIC,
			"Utils",
			"Carbon/Utils"
		), ():void => {
			expect( Carbon.Utils ).toBeDefined();
			expect( Carbon.Utils ).toBe( Utils );
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

			jasmine.Ajax.stubRequest( /api/, null, "GET" ).andReturn({
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

			let promise:Promise<any>;
			promise = carbon.getAPIDescription();
			expect( promise instanceof Promise ).toBe( true );

			promise.then( ( description:APIDescription.Class ):void => {
				expect( description ).toBeTruthy();
				expect( description.version ).toBe( "1.0.0" );
				done();
			}, done.fail );
		});

		it( hasProperty(
			INSTANCE,
			"apps",
			"Carbon.Apps.Class",
			"Instance of the class `Carbon.Apps` in the context of the instanced Carbon class."
		), ():void => {
			expect( carbon.apps ).toBeDefined();
			expect( Utils.isObject( carbon.apps ) );
			expect( carbon.apps instanceof Apps.Class );
		});

	});

});