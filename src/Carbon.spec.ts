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
	reexports,
	hasDefaultExport,
} from "./test/JasmineExtender";

import * as AbstractContext from "./AbstractContext";
import * as AccessPoint from "./AccessPoint";
import * as APIDescription from "./APIDescription";
import * as Auth from "./Auth";
import * as Document from "./Document";
import * as Documents from "./Documents";
import * as Errors from "./Errors";
import * as Fragment from "./Fragment";
import * as HTTP from "./HTTP";
import * as JSONLD from "./JSONLD";
import * as LDP from "./LDP";
import * as NamedFragment from "./NamedFragment";
import * as NS from "./NS";
import * as ObjectSchema from "./ObjectSchema";
import * as PersistedDocument from "./PersistedDocument";
import * as PersistedFragment from "./PersistedFragment";
import * as PersistedNamedFragment from "./PersistedNamedFragment";
import * as PersistedResource from "./PersistedResource";
import * as Pointer from "./Pointer";
import * as RDF from "./RDF";
import * as Resource from "./Resource";
import * as SDKContext from "./SDKContext";
import * as Settings from "./Settings";
import * as SPARQL from "./SPARQL";
import * as Utils from "./Utils";

import * as Carbon from "./Carbon";
import DefaultExport from "./Carbon";


describe( module( "Carbon" ), ():void => {

	it( isDefined(), ():void => {
		expect( Carbon ).toBeDefined();
		expect( Carbon ).toEqual( jasmine.any( Object ) );
	} );

	describe( clazz(
		"Carbon.Class",
		"The main class of the SDK, which contains all the references of the modules used in the the SDK."
	), ():void => {
		let carbon:Carbon.Class;
		let myCarbon:Carbon.Class;

		beforeEach( ():void => {
			carbon = new Carbon.Class( "carbonldp.com", true );

			myCarbon = new Carbon.Class( "example.com", false, {
				"auth.method": Auth.Method.TOKEN,
				"system.container": ".another-system/",
				"system.roles.container": "example-roles/",
			} );

			jasmine.Ajax.install();
		} );

		afterEach( ():void => {
			jasmine.Ajax.uninstall();
		} );

		it( isDefined(), ():void => {
			expect( Carbon.Class ).toBeDefined();
			expect( Utils.isFunction( Carbon.Class ) ).toBe( true );
		} );

		it( extendsClass( "Carbon.AbstractContext.Class" ), ():void => {
			expect( carbon instanceof AbstractContext.Class ).toBe( true );
		} );

		it( hasProperty(
			STATIC,
			"version",
			"string",
			"Returns the version of the SDK."
		), ():void => {
			expect( Carbon.Class.version ).toBeDefined();
			expect( Utils.isString( Carbon.Class.version ) ).toBe( true );

			expect( Carbon.Class.version ).toMatch( /\d+\.\d+\.\d+.*/ );
		} );

		it( hasProperty(
			INSTANCE,
			"version",
			"string",
			"Returns the version of the SDK."
		), ():void => {
			expect( carbon.version ).toBeDefined();
			expect( Utils.isString( carbon.version ) ).toBe( true );

			expect( carbon.version ).toMatch( /\d+\.\d+\.\d+.*/ );
		} );

		it( reexports(
			STATIC,
			"AccessPoint",
			"Carbon/AccessPoint"
		), ():void => {
			expect( Carbon.Class.AccessPoint ).toBeDefined();
			expect( Carbon.Class.AccessPoint ).toBe( AccessPoint );
		} );

		it( reexports(
			STATIC,
			"Auth",
			"Carbon/Auth"
		), ():void => {
			expect( Carbon.Class.Auth ).toBeDefined();
			expect( Carbon.Class.Auth ).toBe( Auth );
		} );

		it( reexports(
			STATIC,
			"Document",
			"Carbon/Document"
		), ():void => {
			expect( Carbon.Class.Document ).toBeDefined();
			expect( Carbon.Class.Document ).toBe( Document );
		} );

		it( reexports(
			STATIC,
			"Documents",
			"Carbon/Documents"
		), ():void => {
			expect( Carbon.Class.Documents ).toBeDefined();
			expect( Carbon.Class.Documents ).toBe( Documents );
		} );

		it( reexports(
			STATIC,
			"Errors",
			"Carbon/Errors"
		), ():void => {
			expect( Carbon.Class.Errors ).toBeDefined();
			expect( Carbon.Class.Errors ).toBe( Errors );
		} );

		it( reexports(
			STATIC,
			"Fragment",
			"Carbon/Fragment"
		), ():void => {
			expect( Carbon.Class.Fragment ).toBeDefined();
			expect( Carbon.Class.Fragment ).toBe( Fragment );
		} );

		it( reexports(
			STATIC,
			"HTTP",
			"Carbon/HTTP"
		), ():void => {
			expect( Carbon.Class.HTTP ).toBeDefined();
			expect( Carbon.Class.HTTP ).toBe( HTTP );
		} );

		it( reexports(
			STATIC,
			"JSONLD",
			"Carbon/JSONLD"
		), ():void => {
			expect( Carbon.Class.JSONLD ).toBeDefined();
			expect( Carbon.Class.JSONLD ).toBe( JSONLD );
		} );

		it( reexports(
			STATIC,
			"LDP",
			"Carbon/LDP"
		), ():void => {
			expect( Carbon.Class.LDP ).toBeDefined();
			expect( Carbon.Class.LDP ).toBe( LDP );
		} );

		it( reexports(
			STATIC,
			"NamedFragment",
			"Carbon/NamedFragment"
		), ():void => {
			expect( Carbon.Class.NamedFragment ).toBeDefined();
			expect( Carbon.Class.NamedFragment ).toBe( NamedFragment );
		} );

		it( reexports(
			STATIC,
			"NS",
			"Carbon/NS"
		), ():void => {
			expect( Carbon.Class.NS ).toBeDefined();
			expect( Carbon.Class.NS ).toBe( NS );
		} );

		it( reexports(
			STATIC,
			"ObjectSchema",
			"Carbon/ObjectSchema"
		), ():void => {
			expect( Carbon.Class.ObjectSchema ).toBeDefined();
			expect( Carbon.Class.ObjectSchema ).toBe( ObjectSchema );
		} );

		it( reexports(
			STATIC,
			"PersistedDocument",
			"Carbon/PersistedDocument"
		), ():void => {
			expect( Carbon.Class.PersistedDocument ).toBeDefined();
			expect( Carbon.Class.PersistedDocument ).toBe( PersistedDocument );
		} );

		it( reexports(
			STATIC,
			"PersistedFragment",
			"Carbon/PersistedFragment"
		), ():void => {
			expect( Carbon.Class.PersistedFragment ).toBeDefined();
			expect( Carbon.Class.PersistedFragment ).toBe( PersistedFragment );
		} );

		it( reexports(
			STATIC,
			"PersistedNamedFragment",
			"Carbon/PersistedNamedFragment"
		), ():void => {
			expect( Carbon.Class.PersistedNamedFragment ).toBeDefined();
			expect( Carbon.Class.PersistedNamedFragment ).toBe( PersistedNamedFragment );
		} );

		it( reexports(
			STATIC,
			"PersistedResource",
			"Carbon/PersistedResource"
		), ():void => {
			expect( Carbon.Class.PersistedResource ).toBeDefined();
			expect( Carbon.Class.PersistedResource ).toBe( PersistedResource );
		} );

		it( reexports(
			STATIC,
			"Pointer",
			"Carbon/Pointer"
		), ():void => {
			expect( Carbon.Class.Pointer ).toBeDefined();
			expect( Carbon.Class.Pointer ).toBe( Pointer );
		} );

		it( reexports(
			STATIC,
			"RDF",
			"Carbon/RDF"
		), ():void => {
			expect( Carbon.Class.RDF ).toBeDefined();
			expect( Carbon.Class.RDF ).toBe( RDF );
		} );

		it( reexports(
			STATIC,
			"Resource",
			"Carbon/Resource"
		), ():void => {
			expect( Carbon.Class.Resource ).toBeDefined();
			expect( Carbon.Class.Resource ).toBe( Resource );
		} );

		it( reexports(
			STATIC,
			"SDKContext",
			"Carbon/SDKContext"
		), ():void => {
			expect( Carbon.Class.SDKContext ).toBeDefined();
			expect( Carbon.Class.SDKContext ).toBe( SDKContext );
		} );

		it( reexports(
			STATIC,
			"Settings",
			"Carbon/Settings"
		), ():void => {
			expect( Carbon.Class.Settings ).toBeDefined();
			expect( Carbon.Class.Settings ).toBe( Settings );
		} );

		it( reexports(
			STATIC,
			"SPARQL",
			"Carbon/SPARQL"
		), ():void => {
			expect( Carbon.Class.SPARQL ).toBeDefined();
			expect( Carbon.Class.SPARQL ).toBe( SPARQL );
		} );

		it( reexports(
			STATIC,
			"Utils",
			"Carbon/Utils"
		), ():void => {
			expect( Carbon.Class.Utils ).toBeDefined();
			expect( Carbon.Class.Utils ).toBe( Utils );
		} );

		it( hasConstructor( [
			{ name: "settings", type: "Carbon.Settings.Class", optional: true },
		] ), ():void => {
			// Instantiated in BeforeEach
			expect( carbon ).toBeTruthy();
			expect( carbon instanceof Carbon.Class ).toBe( true );

			expect( myCarbon ).toBeTruthy();
			expect( myCarbon instanceof Carbon.Class ).toBe( true );
		} );

		it( hasMethod(
			INSTANCE,
			"resolve",
			"Resolve the URI provided in the scope your CarbonLDP Platform instance.", [
				{ name: "uri", type: "string" },
			],
			{ type: "string" }
		), ():void => {
			expect( carbon.resolve ).toBeDefined();
			expect( Utils.isFunction( carbon.resolve ) ).toBe( true );

			expect( carbon.resolve( "http://example.com/my-resource/" ) ).toBe( "http://example.com/my-resource/" );
			expect( carbon.resolve( "my-resource/" ) ).toBe( "https://carbonldp.com/my-resource/" );

			expect( myCarbon.resolve( "http://example.com/my-resource/" ) ).toBe( "http://example.com/my-resource/" );
			expect( myCarbon.resolve( "my-resource/" ) ).toBe( "http://example.com/my-resource/" );
		} );

		it( hasMethod(
			INSTANCE,
			"getAPIDescription",
			"Returns the API description of the related CarbonLDP Platform.",
			{ type: "Promise<Carbon.APIDescription.Class>" }
		), ( done:{ ():void, fail:() => void } ):void => {
			expect( carbon.getAPIDescription ).toBeDefined();
			expect( Utils.isFunction( carbon.getAPIDescription ) ).toBe( true );

			jasmine.Ajax.stubRequest( /api/, null, "GET" ).andReturn( {
				status: 200,
				responseHeaders: {
					"ETag": 'W/"123456789"',
				},
				responseText: `[ {
					"@graph": [ {
						"@id": "https://carbonldp.com/api/",
						"@type": [
							"http://www.w3.org/ns/ldp#Resource",
							"https://carbonldp.com/ns/v1/platform#API",
							"https://carbonldp.com/ns/v1/platform#VolatileResource"
						],
						"https://carbonldp.com/ns/v1/platform#buildDate": [ {
							"@type": "http://www.w3.org/2001/XMLSchema#dateTime",
							"@value": "2016-06-01T00:00:00.000-06:00"
						} ],
						"https://carbonldp.com/ns/v1/platform#version": [ {
							"@value": "1.0.0"
						} ]
					}
					],
					"@id": "https://carbonldp.com/api/"
				} ]`,
			} );

			let promise:Promise<any>;
			promise = carbon.getAPIDescription();
			expect( promise instanceof Promise ).toBe( true );

			promise.then( ( description:APIDescription.Class ):void => {
				expect( description ).toBeTruthy();
				expect( description.version ).toBe( "1.0.0" );
				done();
			}, done.fail );
		} );

	} );

	it( hasDefaultExport( "Carbon.Class" ), () => {
		expect( DefaultExport ).toBeDefined();
		expect( DefaultExport ).toBe( Carbon.Class );
	} );

} );
