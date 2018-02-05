import {
	INSTANCE,
	STATIC,

	module,
	clazz,
	method,

	isDefined,
	hasConstructor,
	hasMethod,
	hasProperty,
	extendsClass,
	reexports,
	hasDefaultExport,
	hasSignature,
	constructor,
} from "./test/JasmineExtender";

import * as AbstractContext from "./AbstractContext";
import * as AccessPoint from "./AccessPoint";
import * as Auth from "./Auth";
import * as Document from "./Document";
import * as Documents from "./Documents";
import * as Errors from "./Errors";
import * as Fragment from "./Fragment";
import * as HTTP from "./HTTP";
import * as JSONLD from "./JSONLD";
import * as LDP from "./LDP";
import * as LDPatch from "./LDPatch";
import * as Messaging from "./Messaging";
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
import * as SHACL from "./SHACL";
import * as SPARQL from "./SPARQL";
import * as System from "./System";
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

		it( hasProperty(
			INSTANCE,
			"baseURI",
			"string",
			"Returns the URI of your Carbon LDP."
		), ():void => {
			expect( carbon.baseURI ).toBeDefined();
			expect( Utils.isString( carbon.baseURI ) ).toBe( true );

			expect( carbon.baseURI ).toMatch( "https://example.com/" );
			expect( myCarbon.baseURI ).toMatch( "http://my-carbonldp.example.com/" );
		} );

		it( hasProperty(
			INSTANCE,
			"messaging",
			"Carbon.Messaging.Service.Class",
			"Service that contains the RAW methods to manage the messaging/real-time features."
		), ():void => {
			expect( carbon.messaging ).toBeDefined();
			expect( carbon.messaging ).toEqual( jasmine.any( Messaging.Service.Class ) );
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
			"LDPatch",
			"Carbon/LDPatch"
		), ():void => {
			expect( Carbon.Class.LDPatch ).toBeDefined();
			expect( Carbon.Class.LDPatch ).toBe( LDPatch );
		} );

		it( reexports(
			STATIC,
			"Messaging",
			"Carbon/Messaging"
		), ():void => {
			expect( Carbon.Class.Messaging ).toBeDefined();
			expect( Carbon.Class.Messaging ).toBe( Messaging );
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
			"SHACL",
			"Carbon/SHACL"
		), ():void => {
			expect( Carbon.Class.SHACL ).toBeDefined();
			expect( Carbon.Class.SHACL ).toBe( SHACL );
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
			"System",
			"Carbon/System"
		), ():void => {
			expect( Carbon.Class.System ).toBeDefined();
			expect( Carbon.Class.System ).toBe( System );
		} );

		it( reexports(
			STATIC,
			"Utils",
			"Carbon/Utils"
		), ():void => {
			expect( Carbon.Class.Utils ).toBeDefined();
			expect( Carbon.Class.Utils ).toBe( Utils );
		} );


		fdescribe( constructor(), ():void => {

			it( hasSignature( [
				{ name: "url", type: "string", description: "The URL where the platform instance is located on." },
			] ), ():void => {} );

			it( hasSignature( [
				{ name: "settings", type: "Carbon.Settings.Class", description: "A settings object to fully configure the Carbon instance." },
			] ), ():void => {} );

			it( "should exists", ():void => {
				expect( Carbon.Class.constructor ).toBeDefined();
				expect( Carbon.Class.constructor ).toEqual( jasmine.any( Function ) );
			} );

			it( "should be instantiable", ():void => {
				const target:Carbon.Class = new Carbon.Class( "https://example.com/" );

				expect( target ).toBeDefined();
				expect( target ).toEqual( jasmine.any( Carbon.Class ) );
			} );

			it( "should throw error when URL has not protocol", ():void => {
				const helper:( url:string ) => () => void = url => () => {
					new Carbon.Class( url );
				};

				expect( helper( "example.com/" ) ).toThrowError( Errors.IllegalArgumentError, `The URL must contain a valid protocol: "http://", "https://".` );
				expect( helper( "localhost" ) ).toThrowError( Errors.IllegalArgumentError, `The URL must contain a valid protocol: "http://", "https://".` );
				expect( helper( "127.0.0.1" ) ).toThrowError( Errors.IllegalArgumentError, `The URL must contain a valid protocol: "http://", "https://".` );
			} );

			it( "should throw error when URL has invalid protocol", ():void => {
				const helper:( url:string ) => () => void = url => () => {
					new Carbon.Class( url );
				};

				expect( helper( "ftp://example.com/" ) ).toThrowError( Errors.IllegalArgumentError, `The URL must contain a valid protocol: "http://", "https://".` );
				expect( helper( "://127.0.0.1" ) ).toThrowError( Errors.IllegalArgumentError, `The URL must contain a valid protocol: "http://", "https://".` );
			} );

			it( "should assign the URL as the base URI with slash at the end", ():void => {
				const helper:( url:string, uri:string ) => void = ( url, uri ) => {
					const carbon:Carbon.Class = new Carbon.Class( url );
					expect( carbon.baseURI ).toBe( uri );
				};

				helper( "https://example.com/", "https://example.com/" );
				helper( "https://example.com", "https://example.com/" );

				helper( "https://localhost:8083/", "https://localhost:8083/" );
				helper( "https://localhost:8083", "https://localhost:8083/" );
			} );


			it( "should throw error when invalid host property", ():void => {
				const helper:( settings:Settings.Class ) => void = settings => () => {
					new Carbon.Class( settings );
				};

				expect( helper( { host: null } ) ).toThrowError( Errors.IllegalArgumentError, "The settings object must contains a valid host string." );
				expect( helper( { host: void 0 } ) ).toThrowError( Errors.IllegalArgumentError, "The settings object must contains a valid host string." );
				expect( helper( { host: {} } as any ) ).toThrowError( Errors.IllegalArgumentError, "The settings object must contains a valid host string." );
			} );

			it( "should throw error when invalid host with protocol", ():void => {
				const helper:( settings:Settings.Class ) => void = settings => () => {
					new Carbon.Class( settings );
				};

				expect( helper( { host: "http://example.com" } ) ).toThrowError( Errors.IllegalArgumentError, "The host must not contain a protocol." );
				expect( helper( { host: "https://example.com" } ) ).toThrowError( Errors.IllegalArgumentError, "The host must not contain a protocol." );
				expect( helper( { host: "ftps://example.com" } ) ).toThrowError( Errors.IllegalArgumentError, "The host must not contain a protocol." );
			} );

			it( "should throw error when invalid host with port", ():void => {
				const helper:( settings:Settings.Class ) => void = settings => () => {
					new Carbon.Class( settings );
				};

				expect( helper( { host: "example.com:80" } ) ).toThrowError( Errors.IllegalArgumentError, "The host must not contain a port." );
				expect( helper( { host: "example.com:8083" } ) ).toThrowError( Errors.IllegalArgumentError, "The host must not contain a port." );
			} );

			it( "should create base URI with settings host", ():void => {
				const helper:( settings:Settings.Class, uri:string ) => void = ( settings, uri ) => {
					const carbon:Carbon.Class = new Carbon.Class( settings );
					expect( carbon.baseURI ).toBe( uri );
				};

				helper( { host: "example.com" }, "https://example.com/" );
				helper( { host: "example.com/" }, "https://example.com/" );
			} );

			it( "should create base URI with settings host and ssl", ():void => {
				const helper:( settings:Settings.Class, uri:string ) => void = ( settings, uri ) => {
					const carbon:Carbon.Class = new Carbon.Class( settings );
					expect( carbon.baseURI ).toBe( uri );
				};

				helper( { host: "example.com", ssl: false }, "http://example.com/" );
				helper( { host: "example.com/", ssl: true }, "https://example.com/" );
			} );

			it( "should create base URI with settings host and port", ():void => {
				const helper:( settings:Settings.Class, uri:string ) => void = ( settings, uri ) => {
					const carbon:Carbon.Class = new Carbon.Class( settings );
					expect( carbon.baseURI ).toBe( uri );
				};

				helper( { host: "example.com", port: 8083 }, "https://example.com:8083/" );
				helper( { host: "example.com/", port: 80 }, "https://example.com:80/" );
			} );

			it( "should create base URI with settings host, ssl and port", ():void => {
				const helper:( settings:Settings.Class, uri:string ) => void = ( settings, uri ) => {
					const carbon:Carbon.Class = new Carbon.Class( settings );
					expect( carbon.baseURI ).toBe( uri );
				};

				helper( { host: "example.com", ssl: false, port: 8083 }, "http://example.com:8083/" );
				helper( { host: "example.com/", ssl: true, port: 80 }, "https://example.com:80/" );
			} );

			it( "should create base URI with settings host, ssl and port", ():void => {
				const helper:( settings:Settings.Class, uri:string ) => void = ( settings, uri ) => {
					const carbon:Carbon.Class = new Carbon.Class( settings );
					expect( carbon.baseURI ).toBe( uri );
				};

				helper( { host: "example.com", ssl: false, port: 8083 }, "http://example.com:8083/" );
				helper( { host: "example.com/", ssl: true, port: 80 }, "https://example.com:80/" );
			} );


			it( "should have the default settings when url provided", ():void => {
				const carbon:Carbon.Class = new Carbon.Class( "https://example.com/" );
				expect( carbon[ "settings" ] ).toEqual( {
					vocabulary: "vocabulary/#",
					paths: {
						system: {
							slug: ".system/",
							paths: {
								platform: "platform/",
								instance: "instance/",
								credentials: "credentials/",
								users: "users/",
								roles: "roles/",
							},
						},
					},
				} );
			} );

			it( "should merge when settings provided", ():void => {
				const carbon:Carbon.Class = new Carbon.Class( {
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
								instance: "instance/",
								credentials: "credentials/",
								roles: "roles/",
							},
						},
						users: "agents/",
					},
				} );
			} );

		} );

		it( hasMethod(
			INSTANCE,
			"resolve",
			"Resolve the URI provided in the scope your CarbonLDP Platform instance.", [
				{ name: "relativeURI", type: "string", description: "Relative URI to be resolved." },
			],
			{ type: "string", description: "The absolute URI that has been resolved." }
		), ():void => {
			expect( carbon.resolve ).toBeDefined();
			expect( Utils.isFunction( carbon.resolve ) ).toBe( true );

			expect( carbon.resolve( "my-resource/" ) ).toBe( "https://example.com/my-resource/" );
			expect( carbon.resolve( "https://example.com/my-resource/" ) ).toBe( "https://example.com/my-resource/" );
			expect( carbon.resolve( "http://my-carbon.example.com/my-resource/" ) ).toBe( "http://my-carbon.example.com/my-resource/" );

			expect( myCarbon.resolve( "my-resource/" ) ).toBe( "http://my-carbonldp.example.com/my-resource/" );
			expect( myCarbon.resolve( "http://my-carbonldp.example.com/my-resource/" ) ).toBe( "http://my-carbonldp.example.com/my-resource/" );
			expect( myCarbon.resolve( "https://example.com/my-resource/" ) ).toBe( "https://example.com/my-resource/" );
		} );

		it( hasMethod(
			INSTANCE,
			"resolveSystemURI",
			"Resolve the URI provided in the scope of the system container of a Carbon LDP.\n\nIf no `system.container` setting has been set an IllegalStateError will be thrown.\nIf the URI provided is outside the system container an IllegalArgumentError will be thrown.", [
				{ name: "relativeURI", type: "string", description: "Relative URI to be resolved." },
			],
			{ type: "string", description: "The absolute URI that has been resolved." }
		), ():void => {
			expect( carbon.resolveSystemURI ).toBeDefined();
			expect( carbon.resolveSystemURI ).toEqual( jasmine.any( Function ) );

			expect( carbon.resolveSystemURI( "my-resource/" ) ).toBe( "https://example.com/.system/my-resource/" );
			expect( carbon.resolveSystemURI( "https://example.com/.system/my-resource/" ) ).toBe( "https://example.com/.system/my-resource/" );
			expect( () => carbon.resolveSystemURI( "https://example.com/my-resource/" ) ).toThrowError( Errors.IllegalArgumentError );
			expect( () => carbon.resolveSystemURI( "https://example.com/.my-system/my-resource/" ) ).toThrowError( Errors.IllegalArgumentError );

			expect( myCarbon.resolveSystemURI( "my-resource/" ) ).toBe( "http://my-carbonldp.example.com/.my-system/my-resource/" );
			expect( myCarbon.resolveSystemURI( "http://my-carbonldp.example.com/.my-system/my-resource/" ) ).toBe( "http://my-carbonldp.example.com/.my-system/my-resource/" );
			expect( () => myCarbon.resolveSystemURI( "http://my-carbonldp.example.com/my-resource/" ) ).toThrowError( Errors.IllegalArgumentError );
			expect( () => myCarbon.resolveSystemURI( "http://my-carbonldp.example.com/.system/my-resource/" ) ).toThrowError( Errors.IllegalArgumentError );
			expect( () => myCarbon.resolveSystemURI( "https://example.com/.my-system/my-resource/" ) ).toThrowError( Errors.IllegalArgumentError );

			// No `system.container` defined
			carbon.deleteSetting( "system.container" );
			expect( () => carbon.resolveSystemURI( "my-resource/" ) ).toThrowError( Errors.IllegalStateError );
		} );

		describe( method(
			INSTANCE,
			"getPlatformMetadata",
			"Retrieves the Metadata related to the CarbonLDP Platform."
		), ():void => {

			it( "should exists", ():void => {
				expect( carbon.getPlatformMetadata ).toBeDefined();
				expect( Utils.isFunction( carbon.getPlatformMetadata ) ).toBe( true );
			} );

			it( "should reject promise when no \"system.container\" setting declared", ( done:DoneFn ):void => {
				carbon.deleteSetting( "system.container" );
				let promise:Promise<System.PlatformMetadata.Class>;

				promise = carbon.getPlatformMetadata();
				expect( promise ).toEqual( jasmine.any( Promise ) );
				promise
					.then( () => done.fail( "Promise should not be resolved." ) )
					.catch( error => {
						expect( error.message ).toMatch( /system\.container/ );
						done();
					} );
			} );

			it( "should reject promise when no \"system.platform.metadata\" setting declared", ( done:DoneFn ):void => {
				carbon.deleteSetting( "system.platform.metadata" );
				let promise:Promise<System.PlatformMetadata.Class>;

				promise = carbon.getPlatformMetadata();
				expect( promise ).toEqual( jasmine.any( Promise ) );
				promise
					.then( () => done.fail( "Promise should not be resolved." ) )
					.catch( error => {
						expect( error.message ).toMatch( /system\.platform\.metadata/ );
						done();
					} );
			} );

			it( hasSignature(
				{ type: "Promise<Carbon.PlatformMetadata.Class>" }
			), ( done:DoneFn ):void => {
				jasmine.Ajax.stubRequest( "https://example.com/.system/platform/", null, "GET" ).andReturn( {
					status: 200,
					responseHeaders: {
						"ETag": '"123456789"',
						"Content-Location": "https://example.com/.system/platform/",
					},
					responseText: `[ {
					"@graph": [ {
						"@id": "https://example.com/.system/platform/",
						"@type": [ "${ NS.C.Class.VolatileResource }", "${ NS.C.Class.Platform }" ],
						"${ NS.C.Predicate.buildDate }": [ {
							"@type": "http://www.w3.org/2001/XMLSchema#dateTime",
							"@value": "2016-06-01T00:00:00.000-06:00"
						} ],
						"${ NS.C.Predicate.version }": [ {
							"@value": "1.0.0"
						} ]
					}
					],
					"@id": "https://example.com/.system/platform/"
				} ]`,
				} );

				let promise:Promise<System.PlatformMetadata.Class>;
				promise = carbon.getPlatformMetadata();
				expect( promise ).toEqual( jasmine.any( Promise ) );

				promise.then( ( platformMetadata:System.PlatformMetadata.Class ):void => {
					expect( platformMetadata ).toBeTruthy();
					expect( Object.keys( platformMetadata ).length ).toBe( 2 );

					expect( platformMetadata.version ).toBeDefined();
					expect( platformMetadata.version ).toEqual( jasmine.any( String ) );
					expect( platformMetadata.version ).toBe( "1.0.0" );

					expect( platformMetadata.buildDate ).toBeDefined();
					expect( platformMetadata.buildDate ).toEqual( jasmine.any( Date ) );
					expect( platformMetadata.buildDate ).toEqual( new Date( "2016-06-01T06:00:00.000Z" ) );

					done();
				} ).catch( done.fail );
			} );

		} );

		describe( method(
			INSTANCE,
			"getInstanceMetadata",
			"Retrieves the Metadata related to your instance of the Carbon LDP Platform."
		), ():void => {

			it( "should exists", ():void => {
				expect( carbon.getInstanceMetadata ).toBeDefined();
				expect( Utils.isFunction( carbon.getInstanceMetadata ) ).toBe( true );
			} );

			it( "should reject promise when no \"system.container\" setting declared", ( done:DoneFn ):void => {
				carbon.deleteSetting( "system.container" );
				let promise:Promise<System.InstanceMetadata.Class>;

				promise = carbon.getInstanceMetadata();
				expect( promise ).toEqual( jasmine.any( Promise ) );
				promise
					.then( () => done.fail( "Promise should not be resolved." ) )
					.catch( error => {
						expect( error.message ).toMatch( /system\.container/ );
						done();
					} );
			} );

			it( "should reject promise when no \"system.instance.metadata\" setting declared", ( done:DoneFn ):void => {
				carbon.deleteSetting( "system.instance.metadata" );
				let promise:Promise<System.InstanceMetadata.Class>;

				promise = carbon.getInstanceMetadata();
				expect( promise ).toEqual( jasmine.any( Promise ) );
				promise
					.then( () => done.fail( "Promise should not be resolved." ) )
					.catch( error => {
						expect( error.message ).toMatch( /system\.instance\.metadata/ );
						done();
					} );
			} );

			it( hasSignature(
				{ type: "Promise<Carbon.InstanceMetadata.Class>" }
			), ( done:DoneFn ):void => {
				jasmine.Ajax.stubRequest( "https://example.com/.system/instance/", null, "GET" ).andReturn( {
					status: 200,
					responseHeaders: {
						"ETag": '"123456789"',
						"Content-Location": "https://example.com/.system/instance/",
					},
					responseText: `[ {
					"@graph": [ {
						"@id": "https://example.com/.system/instance/",
						"@type": [ "${ NS.CS.Class.ProtectedDocument }", "${ NS.C.Class.Instance }" ],
						"${ NS.CS.Predicate.namae }": [ {
							"@value": "Your instance's name"
						} ],
						"${ NS.CS.Predicate.description }": [ {
							"@value": "Your instance's description"
						} ],
						"${ NS.CS.Predicate.allowsOrigin }": [ {
							"@value": "http://example.com"
						}, {
							"@id": "${ NS.CS.Class.AllOrigins }"
						} ]
					} ],
					"@id": "https://example.com/.system/instance/"
				} ]`,
				} );

				let promise:Promise<System.InstanceMetadata.Class>;
				promise = carbon.getInstanceMetadata();
				expect( promise ).toEqual( jasmine.any( Promise ) );

				promise.then( ( instanceMetadata:System.InstanceMetadata.Class ):void => {
					expect( instanceMetadata ).toBeTruthy();
					expect( Object.keys( instanceMetadata ).length ).toBe( 3 );

					expect( instanceMetadata.name ).toBeDefined();
					expect( instanceMetadata.name ).toEqual( jasmine.any( String ) );
					expect( instanceMetadata.name ).toBe( "Your instance's name" );

					expect( instanceMetadata.description ).toBeDefined();
					expect( instanceMetadata.description ).toEqual( jasmine.any( String ) );
					expect( instanceMetadata.description ).toBe( "Your instance's description" );

					expect( instanceMetadata.allowsOrigins ).toBeDefined();
					expect( instanceMetadata.allowsOrigins ).toEqual( jasmine.any( Array ) );
					expect( instanceMetadata.allowsOrigins.length ).toBe( 2 );
					expect( instanceMetadata.allowsOrigins ).toContain( "http://example.com" );
					expect( instanceMetadata.allowsOrigins ).toContain( Pointer.Factory.create( NS.CS.Class.AllOrigins ) );

					done();
				} ).catch( done.fail );
			} );

		} );

	} );

	it( hasDefaultExport( "Carbon.Class" ), () => {
		expect( DefaultExport ).toBeDefined();
		expect( DefaultExport ).toBe( Carbon.Class );
	} );

} );
