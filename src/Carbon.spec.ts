import * as AbstractContext from "./AbstractContext";
import * as AccessPoint from "./AccessPoint";
import * as Auth from "./Auth";
import * as BlankNode from "./BlankNode";
import * as Carbon from "./Carbon";
import * as Document from "./Document";
import { Documents } from "./Documents";
import * as Errors from "./Errors";
import * as Fragment from "./Fragment";
import * as HTTP from "./HTTP";
import * as JSONLD from "./JSONLD";
import * as LDP from "./LDP";
import * as LDPatch from "./LDPatch";
import * as Messaging from "./Messaging";
import * as ModelFactory from "./ModelFactory";
import * as NamedFragment from "./NamedFragment";
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
import * as SHACL from "./SHACL";
import * as SPARQL from "./SPARQL";
import * as System from "./System";

import {
	clazz,
	constructor,
	extendsClass,
	hasDefaultExport,
	hasProperty,
	hasSignature,
	INSTANCE,
	isDefined,
	method,
	module,
	reexports,
	STATIC,
} from "./test/JasmineExtender";

import * as Utils from "./Utils";
import * as Vocabularies from "./Vocabularies/index";

describe( module( "Carbon" ), ():void => {

	it( isDefined(), ():void => {
		expect( Carbon ).toBeDefined();
		expect( Carbon ).toEqual( jasmine.any( Object ) );
	} );

	describe( clazz( "Carbon.Carbon", "The main class of the SDK, which contains all the references of the modules used in the the SDK." ), ():void => {

		it( isDefined(), ():void => {
			expect( Carbon.Carbon ).toBeDefined();
			expect( Carbon.Carbon ).toEqual( jasmine.any( Function ) );
		} );

		it( extendsClass( "Carbon.AbstractContext.AbstractContext" ), ():void => {
			const carbon:Carbon.Carbon = new Carbon.Carbon( "https://example.com" );
			expect( carbon ).toEqual( jasmine.any( AbstractContext.AbstractContext ) );
		} );

		it( hasProperty(
			STATIC,
			"version",
			"string",
			"Returns the version of the SDK."
		), ():void => {
			expect( Carbon.Carbon.version ).toBeDefined();
			expect( Carbon.Carbon.version ).toEqual( jasmine.any( String ) );

			expect( Carbon.Carbon.version ).toMatch( /\d+\.\d+\.\d+.*/ );
		} );

		it( reexports(
			STATIC,
			"AbstractContext",
			"Carbon/AbstractContext"
		), ():void => {
			expect( Carbon.Carbon.AbstractContext ).toBeDefined();
			expect( Carbon.Carbon.AbstractContext ).toBe( AbstractContext );
		} );

		it( reexports(
			STATIC,
			"AccessPoint",
			"Carbon/AccessPoint"
		), ():void => {
			expect( Carbon.Carbon.AccessPoint ).toBeDefined();
			expect( Carbon.Carbon.AccessPoint ).toBe( AccessPoint );
		} );

		it( reexports(
			STATIC,
			"Auth",
			"Carbon/Auth"
		), ():void => {
			expect( Carbon.Carbon.Auth ).toBeDefined();
			expect( Carbon.Carbon.Auth ).toBe( Auth );
		} );

		it( reexports(
			STATIC,
			"BlankNode",
			"Carbon/BlankNode"
		), ():void => {
			expect( Carbon.Carbon.BlankNode ).toBeDefined();
			expect( Carbon.Carbon.BlankNode ).toBe( BlankNode );
		} );

		it( reexports(
			STATIC,
			"Document",
			"Carbon/Document"
		), ():void => {
			expect( Carbon.Carbon.Document ).toBeDefined();
			expect( Carbon.Carbon.Document ).toBe( Document );
		} );

		it( reexports(
			STATIC,
			"Documents",
			"Carbon/Documents"
		), ():void => {
			expect( Carbon.Carbon.Documents ).toBeDefined();
			expect( Carbon.Carbon.Documents ).toBe( Documents );
		} );

		it( reexports(
			STATIC,
			"Errors",
			"Carbon/Errors"
		), ():void => {
			expect( Carbon.Carbon.Errors ).toBeDefined();
			expect( Carbon.Carbon.Errors ).toBe( Errors );
		} );

		it( reexports(
			STATIC,
			"Fragment",
			"Carbon/Fragment"
		), ():void => {
			expect( Carbon.Carbon.Fragment ).toBeDefined();
			expect( Carbon.Carbon.Fragment ).toBe( Fragment );
		} );

		it( reexports(
			STATIC,
			"HTTP",
			"Carbon/HTTP"
		), ():void => {
			expect( Carbon.Carbon.HTTP ).toBeDefined();
			expect( Carbon.Carbon.HTTP ).toBe( HTTP );
		} );

		it( reexports(
			STATIC,
			"JSONLD",
			"Carbon/JSONLD"
		), ():void => {
			expect( Carbon.Carbon.JSONLD ).toBeDefined();
			expect( Carbon.Carbon.JSONLD ).toBe( JSONLD );
		} );

		it( reexports(
			STATIC,
			"LDP",
			"Carbon/LDP"
		), ():void => {
			expect( Carbon.Carbon.LDP ).toBeDefined();
			expect( Carbon.Carbon.LDP ).toBe( LDP );
		} );

		it( reexports(
			STATIC,
			"LDPatch",
			"Carbon/LDPatch"
		), ():void => {
			expect( Carbon.Carbon.LDPatch ).toBeDefined();
			expect( Carbon.Carbon.LDPatch ).toBe( LDPatch );
		} );

		it( reexports(
			STATIC,
			"Messaging",
			"Carbon/Messaging"
		), ():void => {
			expect( Carbon.Carbon.Messaging ).toBeDefined();
			expect( Carbon.Carbon.Messaging ).toBe( Messaging );
		} );

		it( reexports(
			STATIC,
			"ModelFactory",
			"Carbon/ModelFactory"
		), ():void => {
			expect( Carbon.Carbon.ModelFactory ).toBeDefined();
			expect( Carbon.Carbon.ModelFactory ).toBe( ModelFactory );
		} );

		it( reexports(
			STATIC,
			"NamedFragment",
			"Carbon/NamedFragment"
		), ():void => {
			expect( Carbon.Carbon.NamedFragment ).toBeDefined();
			expect( Carbon.Carbon.NamedFragment ).toBe( NamedFragment );
		} );

		it( reexports(
			STATIC,
			"Vocabularies",
			"Carbon/Vocabularies"
		), ():void => {
			expect( Carbon.Carbon.Vocabularies ).toBeDefined();
			expect( Carbon.Carbon.Vocabularies ).toBe( Vocabularies );
		} );

		it( reexports(
			STATIC,
			"ObjectSchema",
			"Carbon/ObjectSchema"
		), ():void => {
			expect( Carbon.Carbon.ObjectSchema ).toBeDefined();
			expect( Carbon.Carbon.ObjectSchema ).toBe( ObjectSchema );
		} );

		it( reexports(
			STATIC,
			"PersistedDocument",
			"Carbon/PersistedDocument"
		), ():void => {
			expect( Carbon.Carbon.PersistedDocument ).toBeDefined();
			expect( Carbon.Carbon.PersistedDocument ).toBe( PersistedDocument );
		} );

		it( reexports(
			STATIC,
			"PersistedFragment",
			"Carbon/PersistedFragment"
		), ():void => {
			expect( Carbon.Carbon.PersistedFragment ).toBeDefined();
			expect( Carbon.Carbon.PersistedFragment ).toBe( PersistedFragment );
		} );

		it( reexports(
			STATIC,
			"PersistedNamedFragment",
			"Carbon/PersistedNamedFragment"
		), ():void => {
			expect( Carbon.Carbon.PersistedNamedFragment ).toBeDefined();
			expect( Carbon.Carbon.PersistedNamedFragment ).toBe( PersistedNamedFragment );
		} );

		it( reexports(
			STATIC,
			"PersistedResource",
			"Carbon/PersistedResource"
		), ():void => {
			expect( Carbon.Carbon.PersistedResource ).toBeDefined();
			expect( Carbon.Carbon.PersistedResource ).toBe( PersistedResource );
		} );

		it( reexports(
			STATIC,
			"Pointer",
			"Carbon/Pointer"
		), ():void => {
			expect( Carbon.Carbon.Pointer ).toBeDefined();
			expect( Carbon.Carbon.Pointer ).toBe( Pointer );
		} );

		it( reexports(
			STATIC,
			"RDF",
			"Carbon/RDF"
		), ():void => {
			expect( Carbon.Carbon.RDF ).toBeDefined();
			expect( Carbon.Carbon.RDF ).toBe( RDF );
		} );

		it( reexports(
			STATIC,
			"Resource",
			"Carbon/Resource"
		), ():void => {
			expect( Carbon.Carbon.Resource ).toBeDefined();
			expect( Carbon.Carbon.Resource ).toBe( Resource );
		} );

		it( reexports(
			STATIC,
			"SDKContext",
			"Carbon/SDKContext"
		), ():void => {
			expect( Carbon.Carbon.SDKContext ).toBeDefined();
			expect( Carbon.Carbon.SDKContext ).toBe( SDKContext );
		} );

		it( reexports(
			STATIC,
			"Settings",
			"Carbon/Settings"
		), ():void => {
			expect( Carbon.Carbon.Settings ).toBeDefined();
			expect( Carbon.Carbon.Settings ).toBe( Settings );
		} );

		it( reexports(
			STATIC,
			"SHACL",
			"Carbon/SHACL"
		), ():void => {
			expect( Carbon.Carbon.SHACL ).toBeDefined();
			expect( Carbon.Carbon.SHACL ).toBe( SHACL );
		} );

		it( reexports(
			STATIC,
			"SPARQL",
			"Carbon/SPARQL"
		), ():void => {
			expect( Carbon.Carbon.SPARQL ).toBeDefined();
			expect( Carbon.Carbon.SPARQL ).toBe( SPARQL );
		} );

		it( reexports(
			STATIC,
			"System",
			"Carbon/System"
		), ():void => {
			expect( Carbon.Carbon.System ).toBeDefined();
			expect( Carbon.Carbon.System ).toBe( System );
		} );

		it( reexports(
			STATIC,
			"Utils",
			"Carbon/Utils"
		), ():void => {
			expect( Carbon.Carbon.Utils ).toBeDefined();
			expect( Carbon.Carbon.Utils ).toBe( Utils );
		} );


		describe( constructor(), ():void => {

			it( hasSignature( [
				{ name: "url", type: "string", description: "The URL where the platform instance is located on." },
			] ), ():void => {} );

			it( hasSignature( [
				{ name: "settings", type: "Carbon.SettingsCarbonSettings", description: "A settings object to fully configure the Carbon instance." },
			] ), ():void => {} );

			it( "should exists", ():void => {
				expect( Carbon.Carbon.constructor ).toBeDefined();
				expect( Carbon.Carbon.constructor ).toEqual( jasmine.any( Function ) );
			} );

			it( "should be instantiable", ():void => {
				const target:Carbon.Carbon = new Carbon.Carbon( "https://example.com/" );

				expect( target ).toBeDefined();
				expect( target ).toEqual( jasmine.any( Carbon.Carbon ) );
			} );

			it( "should throw error when URL has not protocol", ():void => {
				const helper:( url:string ) => () => void = url => () => {
					new Carbon.Carbon( url );
				};

				expect( helper( "example.com/" ) ).toThrowError( Errors.IllegalArgumentError, `The URL must contain a valid protocol: "http://", "https://".` );
				expect( helper( "localhost" ) ).toThrowError( Errors.IllegalArgumentError, `The URL must contain a valid protocol: "http://", "https://".` );
				expect( helper( "127.0.0.1" ) ).toThrowError( Errors.IllegalArgumentError, `The URL must contain a valid protocol: "http://", "https://".` );
			} );

			it( "should throw error when URL has invalid protocol", ():void => {
				const helper:( url:string ) => () => void = url => () => {
					new Carbon.Carbon( url );
				};

				expect( helper( "ftp://example.com/" ) ).toThrowError( Errors.IllegalArgumentError, `The URL must contain a valid protocol: "http://", "https://".` );
				expect( helper( "://127.0.0.1" ) ).toThrowError( Errors.IllegalArgumentError, `The URL must contain a valid protocol: "http://", "https://".` );
			} );

			it( "should assign the URL as the base URI with slash at the end", ():void => {
				const helper:( url:string, uri:string ) => void = ( url, uri ) => {
					const carbon:Carbon.Carbon = new Carbon.Carbon( url );
					expect( carbon.baseURI ).toBe( uri );
				};

				helper( "https://example.com/", "https://example.com/" );
				helper( "https://example.com", "https://example.com/" );

				helper( "https://localhost:8083/", "https://localhost:8083/" );
				helper( "https://localhost:8083", "https://localhost:8083/" );
			} );


			it( "should throw error when invalid host property", ():void => {
				const helper:( settings:Settings.CarbonSettings ) => void = settings => () => {
					new Carbon.Carbon( settings );
				};

				expect( helper( { host: null } ) ).toThrowError( Errors.IllegalArgumentError, "The settings object must contains a valid host string." );
				expect( helper( { host: void 0 } ) ).toThrowError( Errors.IllegalArgumentError, "The settings object must contains a valid host string." );
				expect( helper( { host: {} } as any ) ).toThrowError( Errors.IllegalArgumentError, "The settings object must contains a valid host string." );
			} );

			it( "should throw error when invalid host with protocol", ():void => {
				const helper:( settings:Settings.CarbonSettings ) => void = settings => () => {
					new Carbon.Carbon( settings );
				};

				expect( helper( { host: "http://example.com" } ) ).toThrowError( Errors.IllegalArgumentError, "The host must not contain a protocol." );
				expect( helper( { host: "https://example.com" } ) ).toThrowError( Errors.IllegalArgumentError, "The host must not contain a protocol." );
				expect( helper( { host: "ftps://example.com" } ) ).toThrowError( Errors.IllegalArgumentError, "The host must not contain a protocol." );
			} );

			it( "should throw error when invalid host with port", ():void => {
				const helper:( settings:Settings.CarbonSettings ) => void = settings => () => {
					new Carbon.Carbon( settings );
				};

				expect( helper( { host: "example.com:80" } ) ).toThrowError( Errors.IllegalArgumentError, "The host must not contain a port." );
				expect( helper( { host: "example.com:8083" } ) ).toThrowError( Errors.IllegalArgumentError, "The host must not contain a port." );
			} );

			it( "should create base URI with settings host", ():void => {
				const helper:( settings:Settings.CarbonSettings, uri:string ) => void = ( settings, uri ) => {
					const carbon:Carbon.Carbon = new Carbon.Carbon( settings );
					expect( carbon.baseURI ).toBe( uri );
				};

				helper( { host: "example.com" }, "https://example.com/" );
				helper( { host: "example.com/" }, "https://example.com/" );
			} );

			it( "should create base URI with settings host and ssl", ():void => {
				const helper:( settings:Settings.CarbonSettings, uri:string ) => void = ( settings, uri ) => {
					const carbon:Carbon.Carbon = new Carbon.Carbon( settings );
					expect( carbon.baseURI ).toBe( uri );
				};

				helper( { host: "example.com", ssl: false }, "http://example.com/" );
				helper( { host: "example.com/", ssl: true }, "https://example.com/" );
			} );

			it( "should create base URI with settings host and port", ():void => {
				const helper:( settings:Settings.CarbonSettings, uri:string ) => void = ( settings, uri ) => {
					const carbon:Carbon.Carbon = new Carbon.Carbon( settings );
					expect( carbon.baseURI ).toBe( uri );
				};

				helper( { host: "example.com", port: 8083 }, "https://example.com:8083/" );
				helper( { host: "example.com/", port: 80 }, "https://example.com:80/" );
			} );

			it( "should create base URI with settings host, ssl and port", ():void => {
				const helper:( settings:Settings.CarbonSettings, uri:string ) => void = ( settings, uri ) => {
					const carbon:Carbon.Carbon = new Carbon.Carbon( settings );
					expect( carbon.baseURI ).toBe( uri );
				};

				helper( { host: "example.com", ssl: false, port: 8083 }, "http://example.com:8083/" );
				helper( { host: "example.com/", ssl: true, port: 80 }, "https://example.com:80/" );
			} );

			it( "should create base URI with settings host, ssl and port", ():void => {
				const helper:( settings:Settings.CarbonSettings, uri:string ) => void = ( settings, uri ) => {
					const carbon:Carbon.Carbon = new Carbon.Carbon( settings );
					expect( carbon.baseURI ).toBe( uri );
				};

				helper( { host: "example.com", ssl: false, port: 8083 }, "http://example.com:8083/" );
				helper( { host: "example.com/", ssl: true, port: 80 }, "https://example.com:80/" );
			} );


			it( "should have the default settings when url provided", ():void => {
				const carbon:Carbon.Carbon = new Carbon.Carbon( "https://example.com/" );
				expect( carbon[ "settings" ] ).toEqual( {
					vocabulary: "vocabulary/#",
					paths: {
						system: {
							slug: ".system/",
							paths: {
								platform: "platform/",
								credentials: "credentials/",
								users: "users/",
								roles: "roles/",
							},
						},
					},
				} );
			} );

			it( "should merge when settings provided", ():void => {
				const carbon:Carbon.Carbon = new Carbon.Carbon( {
					host: "example.com",
					vocabulary: "https://schema.org/",
					paths: {
						system: {
							slug: "https://secure.example.com/",
							paths: {
								users: null,
							},
						},
						users: "agents/",
					},
				} );

				expect( carbon[ "settings" ] ).toEqual( {
					vocabulary: "https://schema.org/",
					paths: {
						system: {
							slug: "https://secure.example.com/",
							paths: {
								platform: "platform/",
								credentials: "credentials/",
								roles: "roles/",
							},
						},
						users: "agents/",
					},
				} );
			} );


			it( "should retrieve the version form the class", ():void => {
				const carbon:Carbon.Carbon = new Carbon.Carbon( "https://example.com" );

				expect( carbon.version ).toEqual( jasmine.any( String ) );
				expect( carbon.version ).toBe( Carbon.Carbon.version );
			} );

			it( "should instantiate the messaging service when url", ():void => {
				const carbon:Carbon.Carbon = new Carbon.Carbon( "https://example.com" );
				expect( carbon.messaging ).toEqual( jasmine.any( Messaging.Service.Class ) );
			} );

		} );

		it( hasProperty(
			INSTANCE,
			"version",
			"string",
			"Returns the version of the SDK."
		), ():void => {} );

		it( hasProperty(
			INSTANCE,
			"baseURI",
			"string",
			"Returns the URI of your Carbon LDP."
		), ():void => {} );

		it( hasProperty(
			INSTANCE,
			"messaging",
			"Carbon.Messaging.Service.Class",
			"Service that contains the RAW methods to manage the messaging/real-time features."
		), ():void => {} );

		describe( method( INSTANCE, "resolve" ), ():void => {

			it( hasSignature(
				"Resolve the URI provided in the scope your CarbonLDP Platform instance.", [
					{ name: "relativeURI", type: "string", description: "Relative URI to be resolved." },
				],
				{ type: "string", description: "The absolute URI that has been resolved." }
			), ():void => {} );

			it( "should exists", ():void => {
				expect( Carbon.Carbon.prototype.resolve ).toBeDefined();
				expect( Carbon.Carbon.prototype.resolve ).toEqual( jasmine.any( Function ) );
			} );

			it( "should resolve relative URIs", ():void => {
				const carbon:Carbon.Carbon = new Carbon.Carbon( "https://example.com/" );

				expect( carbon.resolve( "my-resource/" ) ).toBe( "https://example.com/my-resource/" );
				expect( carbon.resolve( "a-parent/my-resource/" ) ).toBe( "https://example.com/a-parent/my-resource/" );
			} );

			it( "should not resolve absolute URIs", ():void => {
				const carbon:Carbon.Carbon = new Carbon.Carbon( "https://example.com/" );

				expect( carbon.resolve( "https://example.com/my-resource/" ) ).toBe( "https://example.com/my-resource/" );
				expect( carbon.resolve( "http://another-carbon.example.com/my-resource/" ) ).toBe( "http://another-carbon.example.com/my-resource/" );
			} );

		} );

		describe( method( INSTANCE, "getPlatformMetadata" ), ():void => {

			beforeEach( ():void => {
				jasmine.Ajax.install();
			} );

			afterEach( ():void => {
				jasmine.Ajax.uninstall();
			} );

			it( hasSignature(
				"Retrieves the Metadata related to the CarbonLDP Platform.",
				{ type: ":Promise<Carbon.System.PlatformMetadata.Class>" }
			), ():void => {} );

			it( "should exists", ():void => {
				expect( Carbon.Carbon.prototype.getPlatformMetadata ).toBeDefined();
				expect( Carbon.Carbon.prototype.getPlatformMetadata ).toEqual( jasmine.any( Function ) );
			} );


			it( "should ask for `system.platform` path", ( done:DoneFn ):void => {
				const carbon:Carbon.Carbon = new Carbon.Carbon( "https://example.com/" );

				const spy:jasmine.Spy = spyOn( carbon, "_resolvePath" )
					.and.callFake( () => { throw new Error( "Should not resolve" ); } );

				carbon
					.getPlatformMetadata()
					.then( () => done.fail( "Should not resolve" ) )
					.catch( error => {
						if( error.message !== "Should not resolve" ) done.fail( error );

						expect( spy ).toHaveBeenCalledWith( "system.platform" );

						done();
					} );
			} );

			it( "should retrieve a PlatformMetadata object", ( done:DoneFn ):void => {
				jasmine.Ajax.stubRequest( "https://example.com/.system/platform/", null, "GET" ).andReturn( {
					status: 200,
					responseHeaders: {
						"ETag": '"123456789"',
						"Content-Location": "https://example.com/.system/platform/",
					},
					responseText: `[ {
					"@graph": [ {
						"@id": "https://example.com/.system/platform/",
						"@type": [ "${ Vocabularies.C.VolatileResource }", "${ Vocabularies.C.Platform }" ],
						"${ Vocabularies.C.buildDate }": [ {
							"@type": "http://www.w3.org/2001/XMLSchema#dateTime",
							"@value": "2016-06-01T00:00:00.000-06:00"
						} ],
						"${ Vocabularies.C.version }": [ {
							"@value": "1.0.0"
						} ]
					}
					],
					"@id": "https://example.com/.system/platform/"
				} ]`,
				} );

				const carbon:Carbon.Carbon = new Carbon.Carbon( "https://example.com/" );
				spyOn( carbon, "_resolvePath" ).and.returnValue( "https://example.com/.system/platform/" );

				carbon
					.getPlatformMetadata()
					.then( ( [ platformMetadata, response ] ):void => {
						expect( response ).toEqual( jasmine.any( HTTP.Response.Class ) );

						expect( platformMetadata ).toBeTruthy();
						expect( Object.keys( platformMetadata ).length ).toBe( 2 );

						expect( platformMetadata.version ).toBeDefined();
						expect( platformMetadata.version ).toEqual( jasmine.any( String ) );
						expect( platformMetadata.version ).toBe( "1.0.0" );

						expect( platformMetadata.buildDate ).toBeDefined();
						expect( platformMetadata.buildDate ).toEqual( jasmine.any( Date ) );
						expect( platformMetadata.buildDate ).toEqual( new Date( "2016-06-01T06:00:00.000Z" ) );

						done();
					} )
					.catch( done.fail );
			} );

		} );

	} );

	it( hasDefaultExport( "Carbon.Carbon" ), () => {
		expect( Carbon.default ).toBeDefined();
		expect( Carbon.default ).toBe( Carbon.Carbon );
	} );

} );
