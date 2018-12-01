import { anyThatMatches } from "../test/helpers/jasmine/equalities";

import { AccessPoint } from "./AccessPoint/AccessPoint";
import { TransientAccessPoint } from "./AccessPoint/TransientAccessPoint";

import { CarbonLDP } from "./CarbonLDP";
import { CarbonLDPSettings } from "./CarbonLDPSettings";

import { AbstractContext } from "./Context/AbstractContext";
import { DocumentsContext } from "./Context/DocumentsContext";
import { GlobalContext } from "./Context/GlobalContext";

import { Document } from "./Document/Document";

import * as Errors from "./Errors";

import { Fragment } from "./Fragment/Fragment";
import { TransientFragment } from "./Fragment/TransientFragment";

import { FreeResources } from "./FreeResources/FreeResources";

import * as HTTP from "./HTTP";
import * as JSONLD from "./JSONLD";
import * as LDP from "./LDP";
import * as LDPatch from "./LDPatch";
import * as Messaging from "./Messaging";

import { ContainerType } from "./ObjectSchema/ContainerType";
import { DigestedObjectSchema } from "./ObjectSchema/DigestedObjectSchema";
import { DigestedObjectSchemaProperty } from "./ObjectSchema/DigestedObjectSchemaProperty";
import { ObjectSchemaDigester } from "./ObjectSchema/ObjectSchemaDigester";
import { ObjectSchemaUtils } from "./ObjectSchema/ObjectSchemaUtils";
import { PointerType } from "./ObjectSchema/PointerType";

import { Pointer } from "./Pointer/Pointer";

import * as RDF from "./RDF";

import { Resource } from "./Resource/Resource";

import * as SHACL from "./SHACL";
import * as SPARQL from "./SPARQL";
import * as System from "./System";
import * as Utils from "./Utils";
import * as Vocabularies from "./Vocabularies";


describe( "CarbonLDP", ():void => {

	it( "should exist", ():void => {
		expect( CarbonLDP ).toBeDefined();
		expect( CarbonLDP ).toEqual( jasmine.any( Function ) );
	} );


	it( "should have the version", ():void => {
		expect( CarbonLDP.version ).toBeDefined();
		expect( CarbonLDP.version ).toEqual( jasmine.any( String ) );

		expect( CarbonLDP.version ).toMatch( /\d+\.\d+\.\d+.*/ );
	} );


	it( "CarbonLDP.AbstractContext", ():void => {
		expect( CarbonLDP.AbstractContext ).toBeDefined();
		expect( CarbonLDP.AbstractContext ).toBe( AbstractContext );
	} );

	it( "CarbonLDP.AccessPoint", ():void => {
		expect( CarbonLDP.AccessPoint ).toBeDefined();
		expect( CarbonLDP.AccessPoint ).toBe( AccessPoint );
	} );

	it( "CarbonLDP.TransientAccessPoint", ():void => {
		expect( CarbonLDP.TransientAccessPoint ).toBeDefined();
		expect( CarbonLDP.TransientAccessPoint ).toBe( TransientAccessPoint );
	} );

	it( "CarbonLDP.Errors", ():void => {
		expect( CarbonLDP.Errors ).toBeDefined();
		expect( CarbonLDP.Errors ).toBe( Errors );
	} );

	it( "CarbonLDP.FreeResources", ():void => {
		expect( CarbonLDP.FreeResources ).toBeDefined();
		expect( CarbonLDP.FreeResources ).toBe( FreeResources );
	} );

	it( "CarbonLDP.HTTP", ():void => {
		expect( CarbonLDP.HTTP ).toBeDefined();
		expect( CarbonLDP.HTTP ).toBe( HTTP );
	} );

	it( "CarbonLDP.JSONLD", ():void => {
		expect( CarbonLDP.JSONLD ).toBeDefined();
		expect( CarbonLDP.JSONLD ).toBe( JSONLD );
	} );

	it( "CarbonLDP.LDP", ():void => {
		expect( CarbonLDP.LDP ).toBeDefined();
		expect( CarbonLDP.LDP ).toBe( LDP );
	} );

	it( "CarbonLDP.LDPatch", ():void => {
		expect( CarbonLDP.LDPatch ).toBeDefined();
		expect( CarbonLDP.LDPatch ).toBe( LDPatch );
	} );

	it( "CarbonLDP.Messaging", ():void => {
		expect( CarbonLDP.Messaging ).toBeDefined();
		expect( CarbonLDP.Messaging ).toBe( Messaging );
	} );

	it( "CarbonLDP.Vocabularies", ():void => {
		expect( CarbonLDP.Vocabularies ).toBeDefined();
		expect( CarbonLDP.Vocabularies ).toBe( Vocabularies );
	} );

	it( "CarbonLDP.DigestedObjectSchema", ():void => {
		expect( CarbonLDP.DigestedObjectSchema ).toBeDefined();
		expect( CarbonLDP.DigestedObjectSchema ).toBe( DigestedObjectSchema );
	} );

	it( "CarbonLDP.ContainerType", ():void => {
		expect( CarbonLDP.ContainerType ).toBeDefined();
		expect( CarbonLDP.ContainerType ).toBe( ContainerType );
	} );

	it( "CarbonLDP.PointerType", ():void => {
		expect( CarbonLDP.PointerType ).toBeDefined();
		expect( CarbonLDP.PointerType ).toBe( PointerType );
	} );

	it( "CarbonLDP.ObjectSchemaDigester", ():void => {
		expect( CarbonLDP.ObjectSchemaDigester ).toBeDefined();
		expect( CarbonLDP.ObjectSchemaDigester ).toBe( ObjectSchemaDigester );
	} );

	it( "CarbonLDP.ObjectSchemaUtils", ():void => {
		expect( CarbonLDP.ObjectSchemaUtils ).toBeDefined();
		expect( CarbonLDP.ObjectSchemaUtils ).toBe( ObjectSchemaUtils );
	} );

	it( "CarbonLDP.DigestedObjectSchemaProperty", ():void => {
		expect( CarbonLDP.DigestedObjectSchemaProperty ).toBeDefined();
		expect( CarbonLDP.DigestedObjectSchemaProperty ).toBe( DigestedObjectSchemaProperty );
	} );

	it( "CarbonLDP.Document", ():void => {
		expect( CarbonLDP.Document ).toBeDefined();
		expect( CarbonLDP.Document ).toBe( Document );
	} );

	it( "CarbonLDP.Fragment", ():void => {
		expect( CarbonLDP.Fragment ).toBeDefined();
		expect( CarbonLDP.Fragment ).toBe( Fragment );
	} );

	it( "CarbonLDP.TransientFragment", ():void => {
		expect( CarbonLDP.TransientFragment ).toBeDefined();
		expect( CarbonLDP.TransientFragment ).toBe( TransientFragment );
	} );

	it( "CarbonLDP.Pointer", ():void => {
		expect( CarbonLDP.Pointer ).toBeDefined();
		expect( CarbonLDP.Pointer ).toBe( Pointer );
	} );

	it( "CarbonLDP.RDF", ():void => {
		expect( CarbonLDP.RDF ).toBeDefined();
		expect( CarbonLDP.RDF ).toBe( RDF );
	} );

	it( "CarbonLDP.Resource", ():void => {
		expect( CarbonLDP.Resource ).toBeDefined();
		expect( CarbonLDP.Resource ).toBe( Resource );
	} );

	it( "CarbonLDP.GlobalContext", ():void => {
		expect( CarbonLDP.GlobalContext ).toBeDefined();
		expect( CarbonLDP.GlobalContext ).toBe( GlobalContext );
	} );

	it( "CarbonLDP.SHACL", ():void => {
		expect( CarbonLDP.SHACL ).toBeDefined();
		expect( CarbonLDP.SHACL ).toBe( SHACL );
	} );

	it( "CarbonLDP.SPARQL", ():void => {
		expect( CarbonLDP.SPARQL ).toBeDefined();
		expect( CarbonLDP.SPARQL ).toBe( SPARQL );
	} );

	it( "CarbonLDP.System", ():void => {
		expect( CarbonLDP.System ).toBeDefined();
		expect( CarbonLDP.System ).toBe( System );
	} );

	it( "CarbonLDP.Utils", ():void => {
		expect( CarbonLDP.Utils ).toBeDefined();
		expect( CarbonLDP.Utils ).toBe( Utils );
	} );


	describe( "CarbonLDP.constructor", ():void => {

		it( "should exist", ():void => {
			expect( CarbonLDP.constructor ).toBeDefined();
			expect( CarbonLDP.constructor ).toEqual( jasmine.any( Function ) );
		} );

		it( "should be instantiable", ():void => {
			const target:CarbonLDP = new CarbonLDP( "https://example.com/" );

			expect( target ).toBeDefined();
			expect( target ).toEqual( jasmine.any( CarbonLDP ) );
		} );

		it( "should extend from DocumentsContext", ():void => {
			const carbon:CarbonLDP = new CarbonLDP( "https://example.com" );
			expect( carbon ).toEqual( jasmine.any( DocumentsContext ) );
		} );


		it( "should initialize documents root document", () => {
			const context:CarbonLDP = new CarbonLDP( "https://example.com/" );

			expect( context.documents ).toEqual( anyThatMatches( Document.is ) as any );
			expect( context.documents.$id ).toEqual( "https://example.com/" );
		} );


		it( "should throw error when URL has not protocol", ():void => {
			const helper:( url:string ) => () => void = url => () => {
				new CarbonLDP( url );
			};

			expect( helper( "example.com/" ) ).toThrowError( Errors.IllegalArgumentError, `The URL must contain a valid protocol: "http://", "https://".` );
			expect( helper( "localhost" ) ).toThrowError( Errors.IllegalArgumentError, `The URL must contain a valid protocol: "http://", "https://".` );
			expect( helper( "127.0.0.1" ) ).toThrowError( Errors.IllegalArgumentError, `The URL must contain a valid protocol: "http://", "https://".` );
		} );

		it( "should throw error when URL has invalid protocol", ():void => {
			const helper:( url:string ) => () => void = url => () => {
				new CarbonLDP( url );
			};

			expect( helper( "ftp://example.com/" ) ).toThrowError( Errors.IllegalArgumentError, `The URL must contain a valid protocol: "http://", "https://".` );
			expect( helper( "://127.0.0.1" ) ).toThrowError( Errors.IllegalArgumentError, `The URL must contain a valid protocol: "http://", "https://".` );
		} );

		it( "should assign the URL as the base URI with slash at the end", ():void => {
			const helper:( url:string, uri:string ) => void = ( url, uri ) => {
				const carbon:CarbonLDP = new CarbonLDP( url );
				expect( carbon.baseURI ).toBe( uri );
			};

			helper( "https://example.com/", "https://example.com/" );
			helper( "https://example.com", "https://example.com/" );

			helper( "https://localhost:8083/", "https://localhost:8083/" );
			helper( "https://localhost:8083", "https://localhost:8083/" );
		} );


		it( "should throw error when invalid host property", ():void => {
			const helper:( settings:CarbonLDPSettings ) => void = settings => () => {
				new CarbonLDP( settings );
			};

			expect( helper( { host: null } ) ).toThrowError( Errors.IllegalArgumentError, "The settings object must contains a valid host string." );
			expect( helper( { host: void 0 } ) ).toThrowError( Errors.IllegalArgumentError, "The settings object must contains a valid host string." );
			expect( helper( { host: {} } as any ) ).toThrowError( Errors.IllegalArgumentError, "The settings object must contains a valid host string." );
		} );

		it( "should throw error when invalid host with protocol", ():void => {
			const helper:( settings:CarbonLDPSettings ) => void = settings => () => {
				new CarbonLDP( settings );
			};

			expect( helper( { host: "http://example.com" } ) ).toThrowError( Errors.IllegalArgumentError, "The host must not contain a protocol." );
			expect( helper( { host: "https://example.com" } ) ).toThrowError( Errors.IllegalArgumentError, "The host must not contain a protocol." );
			expect( helper( { host: "ftps://example.com" } ) ).toThrowError( Errors.IllegalArgumentError, "The host must not contain a protocol." );
		} );

		it( "should throw error when invalid host with port", ():void => {
			const helper:( settings:CarbonLDPSettings ) => void = settings => () => {
				new CarbonLDP( settings );
			};

			expect( helper( { host: "example.com:80" } ) ).toThrowError( Errors.IllegalArgumentError, "The host must not contain a port." );
			expect( helper( { host: "example.com:8083" } ) ).toThrowError( Errors.IllegalArgumentError, "The host must not contain a port." );
		} );

		it( "should create base URI with settings host", ():void => {
			const helper:( settings:CarbonLDPSettings, uri:string ) => void = ( settings, uri ) => {
				const carbon:CarbonLDP = new CarbonLDP( settings );
				expect( carbon.baseURI ).toBe( uri );
			};

			helper( { host: "example.com" }, "https://example.com/" );
			helper( { host: "example.com/" }, "https://example.com/" );
		} );

		it( "should create base URI with settings host and ssl", ():void => {
			const helper:( settings:CarbonLDPSettings, uri:string ) => void = ( settings, uri ) => {
				const carbon:CarbonLDP = new CarbonLDP( settings );
				expect( carbon.baseURI ).toBe( uri );
			};

			helper( { host: "example.com", ssl: false }, "http://example.com/" );
			helper( { host: "example.com/", ssl: true }, "https://example.com/" );
		} );

		it( "should create base URI with settings host and port", ():void => {
			const helper:( settings:CarbonLDPSettings, uri:string ) => void = ( settings, uri ) => {
				const carbon:CarbonLDP = new CarbonLDP( settings );
				expect( carbon.baseURI ).toBe( uri );
			};

			helper( { host: "example.com", port: 8083 }, "https://example.com:8083/" );
			helper( { host: "example.com/", port: 80 }, "https://example.com:80/" );
		} );

		it( "should create base URI with settings host, ssl and port", ():void => {
			const helper:( settings:CarbonLDPSettings, uri:string ) => void = ( settings, uri ) => {
				const carbon:CarbonLDP = new CarbonLDP( settings );
				expect( carbon.baseURI ).toBe( uri );
			};

			helper( { host: "example.com", ssl: false, port: 8083 }, "http://example.com:8083/" );
			helper( { host: "example.com/", ssl: true, port: 80 }, "https://example.com:80/" );
		} );

		it( "should create base URI with settings host, ssl and port", ():void => {
			const helper:( settings:CarbonLDPSettings, uri:string ) => void = ( settings, uri ) => {
				const carbon:CarbonLDP = new CarbonLDP( settings );
				expect( carbon.baseURI ).toBe( uri );
			};

			helper( { host: "example.com", ssl: false, port: 8083 }, "http://example.com:8083/" );
			helper( { host: "example.com/", ssl: true, port: 80 }, "https://example.com:80/" );
		} );


		it( "should have the default settings when url provided", ():void => {
			const carbon:CarbonLDP = new CarbonLDP( "https://example.com/" );
			expect( carbon[ "_settings" ] ).toEqual( {
				vocabulary: "vocabularies/main/#",
				paths: {
					system: {
						slug: ".system/",
						paths: {
							platform: "platform/",
							credentials: "credentials/",
							roles: "roles/",
						},
					},
					users: {
						slug: "users/",
						paths: {
							me: "me/",
						},
					},
				},
			} );
		} );

		it( "should merge when settings provided", ():void => {
			const carbon:CarbonLDP = new CarbonLDP( {
				host: "example.com",
				vocabulary: "https://schema.org/",
				paths: {
					system: {
						slug: "https://secure.example.com/",
						paths: {
							roles: null,
							another: "another/",
						},
					},
					users: "agents/",
				},
			} );

			expect( carbon[ "_settings" ] ).toEqual( {
				vocabulary: "https://schema.org/",
				paths: {
					system: {
						slug: "https://secure.example.com/",
						paths: {
							platform: "platform/",
							credentials: "credentials/",
							another: "another/",
						},
					},
					users: {
						slug: "agents/",
						paths: {
							me: "me/",
						},
					},
				},
			} );
		} );


		it( "should retrieve the version form the class", ():void => {
			const carbon:CarbonLDP = new CarbonLDP( "https://example.com" );

			expect( carbon.version ).toEqual( jasmine.any( String ) );
			expect( carbon.version ).toBe( CarbonLDP.version );
		} );

	} );


	describe( "CarbonLDP.resolve", ():void => {

		it( "should exist", ():void => {
			expect( CarbonLDP.prototype.resolve ).toBeDefined();
			expect( CarbonLDP.prototype.resolve ).toEqual( jasmine.any( Function ) );
		} );


		it( "should resolve relative URIs", ():void => {
			const carbon:CarbonLDP = new CarbonLDP( "https://example.com/" );

			expect( carbon.resolve( "my-resource/" ) ).toBe( "https://example.com/my-resource/" );
			expect( carbon.resolve( "a-parent/my-resource/" ) ).toBe( "https://example.com/a-parent/my-resource/" );
		} );

		it( "should not resolve absolute URIs", ():void => {
			const carbon:CarbonLDP = new CarbonLDP( "https://example.com/" );

			expect( carbon.resolve( "https://example.com/my-resource/" ) ).toBe( "https://example.com/my-resource/" );
			expect( carbon.resolve( "http://another-carbon.example.com/my-resource/" ) ).toBe( "http://another-carbon.example.com/my-resource/" );
		} );

	} );

	describe( "CarbonLDP.getPlatformMetadata", ():void => {

		beforeEach( ():void => {
			jasmine.Ajax.install();
		} );

		afterEach( ():void => {
			jasmine.Ajax.uninstall();
		} );

		it( "should exist", ():void => {
			expect( CarbonLDP.prototype.getPlatformMetadata ).toBeDefined();
			expect( CarbonLDP.prototype.getPlatformMetadata ).toEqual( jasmine.any( Function ) );
		} );


		it( "should ask for `system.platform` path", ( done:DoneFn ):void => {
			const carbon:CarbonLDP = new CarbonLDP( "https://example.com/" );

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
						"@type": [ "${Vocabularies.C.Document}", "${Vocabularies.C.Platform}" ],
						"${Vocabularies.C.created}": [ {
							"@type": "${Vocabularies.XSD.dateTime}",
							"@value": "2016-05-01T00:00:00.000-06:00"
						} ],
						"${Vocabularies.C.modified}": [ {
							"@type": "${Vocabularies.XSD.dateTime}",
							"@value": "2016-05-01T00:00:00.000-06:00"
						} ],
						"${Vocabularies.C.instance}": [ {
							"@id": "_:1"
						} ]
					}, {
						"@id": "_:1",
						"@type": [ "${Vocabularies.C.VolatileResource}", "${Vocabularies.C.PlatformInstance}" ],
						"${Vocabularies.C.buildDate}": [ {
							"@type": "http://www.w3.org/2001/XMLSchema#dateTime",
							"@value": "2016-06-01T00:00:00.000-06:00"
						} ],
						"${Vocabularies.C.version}": [ {
							"@value": "1.0.0"
						} ]
					} ],
					"@id": "https://example.com/.system/platform/"
				} ]`,
			} );

			const carbon:CarbonLDP = new CarbonLDP( "https://example.com/" );
			spyOn( carbon, "_resolvePath" ).and.returnValue( "https://example.com/.system/platform/" );

			carbon
				.getPlatformMetadata()
				.then( ( platformMetadata ):void => {
					type AllPartial<T> = { [P in keyof T]?:Partial<T[P]> };
					type JSPlatform = AllPartial<System.PlatformMetadata>;

					expect( platformMetadata as JSPlatform ).toEqual( {
						created: new Date( "2016-05-01T06:00:00.000Z" ),
						modified: new Date( "2016-05-01T06:00:00.000Z" ),
						instance: {
							buildDate: new Date( "2016-06-01T06:00:00.000Z" ),
							version: "1.0.0",
						},
					} );

					done();
				} )
				.catch( done.fail );
		} );

	} );

} );
