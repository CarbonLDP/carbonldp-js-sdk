import {
	AccessPoint,
	BaseAccessPoint
} from "../AccessPoint";
import { CarbonLDP } from "../CarbonLDP";
import {
	IllegalActionError,
	IllegalArgumentError,
} from "../Errors";
import { BaseFragment } from "../Fragment";
import { Header } from "../HTTP";
import { Pointer } from "../Pointer";
import { DocumentsRegistry } from "../Registry";
import { PersistedResource } from "../Resource";
import {
	extendsClass,
	hasSignature,
	interfaze,
	method,
	module,
	OBLIGATORY
} from "../test/JasmineExtender";
import {
	C,
	LDP,
	XSD
} from "../Vocabularies";
import { CRUDDocument } from "./CRUDDocument";
import { PersistedDocument } from "./PersistedDocument";


function createMock<T extends object>( data?:T & Partial<CRUDDocument> ):T & CRUDDocument {
	const _context:CarbonLDP | undefined = data && "_context" in data ?
		data._context : new CarbonLDP( "https://example.com/" );

	const _registry:DocumentsRegistry = _context ?
		_context.registry : new DocumentsRegistry();

	return CRUDDocument.decorate( Object.assign( {
		_registry,
		_context,
		id: "https://example.com/",
	}, data ) );
}

describe( module( "carbonldp/Document" ), ():void => {

	describe( interfaze(
		"CarbonLDP.CRUDDocument",
		"Document that contains the CRUD based request methods."
	), ():void => {

		it( extendsClass( "CarbonLDP.PersistedDocument" ), ():void => {
			const target:PersistedDocument = {} as CRUDDocument;
			expect( target ).toBeDefined();
		} );

		beforeEach( () => {
			jasmine.Ajax.install();

			jasmine.Ajax
				.stubRequest( "https://example.com/500/" )
				.andReturn( {
					status: 500,
				} );
		} );

		afterEach( () => {
			jasmine.Ajax.uninstall();
		} );


		describe( method( OBLIGATORY, "get" ), ():void => {

			it( hasSignature(
				[ "T extends object" ],
				[
					{ name: "requestOptions", type: "CarbonLDP.HTTP.GETOptions", optional: true, description: "Customizable options for the request." },
				],
				{ type: "Promise<T & CarbonLDP.Document>" }
			), ():void => {} );

			it( hasSignature(
				[ "T extends object" ],
				[
					{ name: "uri", type: "string", description: "The URI of the resource to retrieve." },
					{ name: "requestOptions", type: "CarbonLDP.HTTP.GETOptions", optional: true, description: "Customizable options for the request." },
				],
				{ type: "Promise<T & CarbonLDP.Document>" }
			), ():void => {} );

			it( "should exists", ():void => {
				const resource:CRUDDocument = createMock();

				expect( resource.get ).toBeDefined();
				expect( resource.get ).toEqual( jasmine.any( Function ) );
			} );


			function stubRequest( url:string, options:{ resource?:object, fragments?:object[], frees?:object[], headers?:{ [ key:string ]:string } } = {} ):void {
				const id:string = options.resource && options.resource[ "@id" ] ?
					options.resource[ "@id" ] : url;

				// noinspection JSMismatchedCollectionQueryUpdate
				const headers:{ [ key:string ]:string } = options.headers ?
					options.headers : {};

				const frees:object[] = options.frees ?
					options.frees : [];

				const resource:object = options.resource ?
					options.resource : {};
				const fragments:object[] = options.fragments ?
					options.fragments : [];

				jasmine.Ajax
					.stubRequest( url, null, "GET" )
					.andReturn( {
						status: 200,
						responseHeaders: {
							"ETag": "\"1-12345\"",
							...headers,
						},
						responseText: JSON.stringify( [
							...frees,
							{
								"@id": id,
								"@graph": [
									{
										"@id": id,
										...resource,
									},
									...fragments,
								],
							},
						] ),
					} );
			}


			it( "should throw error when _registry undefined", async () => {
				try {
					const resource:CRUDDocument = createMock( { _registry: void 0 } );
					await resource.get( "some/" );
				} catch( e ) {
					expect( () => { throw e; } )
						.toThrowError( IllegalActionError, `"https://example.com/" doesn't support CRUD requests.` );
				}
			} );

			it( "should parse error response", async () => {
				const resource:CRUDDocument = createMock();

				const spy:jasmine.Spy = spyOn( resource._registry, "_parseErrorResponse" )
					.and.callFake( () => Promise.reject( null ) );

				try {
					await resource.get( "https://example.com/500/" );
					fail( "Should not resolve" );
				} catch( error ) {
					if( error ) fail( error );

					expect( spy ).toHaveBeenCalled();
				}
			} );


			it( "should request self when no URI", async () => {
				stubRequest( "https://example.com/" );

				const resource:CRUDDocument = createMock();
				await resource.get();

				const request:JasmineAjaxRequest = jasmine.Ajax.requests.mostRecent();
				expect( request.url ).toBe( "https://example.com/" );
			} );

			it( "should request the URI provided", async () => {
				stubRequest( "https://example.com/another-resource/" );

				const resource:CRUDDocument = createMock();
				await resource.get( "https://example.com/another-resource/" );

				const request:JasmineAjaxRequest = jasmine.Ajax.requests.mostRecent();
				expect( request.url ).toBe( "https://example.com/another-resource/" );
			} );

			it( "should request relative URI provided", async () => {
				stubRequest( "https://example.com/relative/" );

				const resource:CRUDDocument = createMock();
				await resource.get( "relative/" );

				const request:JasmineAjaxRequest = jasmine.Ajax.requests.mostRecent();
				expect( request.url ).toBe( "https://example.com/relative/" );
			} );

			it( "should request resolved prefixed name provided", async () => {
				stubRequest( "https://example.com/resource/" );

				const _context:CarbonLDP = new CarbonLDP( "https://example.com/" );
				_context.extendObjectSchema( { "ex": "https://example.com/" } );

				const resource:CRUDDocument = createMock( { _context } );
				await resource.get( "ex:resource/" );

				const request:JasmineAjaxRequest = jasmine.Ajax.requests.mostRecent();
				expect( request.url ).toBe( "https://example.com/resource/" );
			} );

			it( "should throw error when from URI outside context scope", async () => {
				const resource:CRUDDocument = createMock();

				await resource
					.get( "https://example.org/resource/" )
					.catch( error => {
						expect( () => { throw error; } )
							.toThrowError( IllegalArgumentError, `"https://example.org/resource/" is out of scope.` );
					} )
				;
			} );

			it( "should throw error when from URI is BNode label", async () => {
				const resource:CRUDDocument = createMock();

				await resource
					.get( "_:1" )
					.catch( error => {
						expect( () => { throw error; } )
							.toThrowError( IllegalArgumentError, `"_:1" (Blank Node) can't be fetched directly.` );
					} )
				;
			} );

			it( "should throw error when from URI is Named Fragment label", async () => {
				const resource:CRUDDocument = createMock();

				await resource
					.get( "#fragment" )
					.catch( error => {
						expect( () => { throw error; } )
							.toThrowError( IllegalArgumentError, `"https://example.com/#fragment" (Named Fragment) can't be fetched directly.` );
					} )
				;
			} );

			it( "should throw error when unresolved prefixed name", async () => {
				const resource:CRUDDocument = createMock();

				await resource
					.get( "ex:resource/" )
					.catch( error => {
						expect( () => { throw error; } )
							.toThrowError( IllegalArgumentError, `"ex:resource/" is out of scope.` );
					} )
				;
			} );


			it( "should send basic request headers", async () => {
				stubRequest( "https://example.com/" );

				const resource:CRUDDocument = createMock();
				await resource.get();

				const request:JasmineAjaxRequest = jasmine.Ajax.requests.mostRecent();
				expect( request.requestHeaders ).toEqual( {
					"accept": "application/ld+json",
					"prefer": `${ LDP.RDFSource }; rel=interaction-model`,
				} );
			} );

			it( "should add authentication header", async () => {
				stubRequest( "https://example.com/" );

				const resource:CRUDDocument = createMock();

				const spy:jasmine.Spy = spyOn( resource._context.auth, "addAuthentication" );

				await resource.get();

				expect( spy ).toHaveBeenCalled();
			} );

			it( "should add custom headers when no IRI", async () => {
				stubRequest( "https://example.com/" );

				const resource:CRUDDocument = createMock();

				await resource.get( {
					headers: new Map()
						.set( "custom", new Header( "custom value" ) )
					,
				} );

				const request:JasmineAjaxRequest = jasmine.Ajax.requests.mostRecent();
				expect( request.requestHeaders ).toEqual( jasmine.objectContaining( {
					"custom": "custom value",
				} ) );
			} );

			it( "should add custom headers when specific IRI", async () => {
				stubRequest( "https://example.com/resource/" );

				const resource:CRUDDocument = createMock();

				await resource.get( "resource/", {
					headers: new Map()
						.set( "custom", new Header( "custom value" ) )
					,
				} );

				const request:JasmineAjaxRequest = jasmine.Ajax.requests.mostRecent();
				expect( request.requestHeaders ).toEqual( jasmine.objectContaining( {
					"custom": "custom value",
				} ) );
			} );


			it( "should return resource requested", async () => {
				stubRequest( "https://example.com/" );

				const resource:CRUDDocument = createMock();

				const retrieved:CRUDDocument = await resource.get();
				expect( retrieved ).toEqual( jasmine.objectContaining( {
					id: "https://example.com/",
				} ) );
			} );

			it( "should return resource requested when in registry but not resolved", async () => {
				stubRequest( "https://example.com/resource/" );

				const resource:CRUDDocument = createMock();
				resource._registry._register( { id: "https://example.com/resource/" } );

				const retrieved:CRUDDocument = await resource.get( "resource/" );
				expect( retrieved ).toEqual( jasmine.objectContaining( {
					id: "https://example.com/resource/",
				} ) );
			} );

			it( "should return registered when already resolved", async () => {
				const resource:CRUDDocument = createMock();
				const registered:CRUDDocument = resource._registry._register( {
					_resolved: true,
					id: "https://example.com/resource/",
				} );

				const retrieved:CRUDDocument = await resource.get( "resource/" );
				expect( retrieved ).toBe( registered );
			} );

			it( "should return request when already resolved but ensureLatest set", async () => {
				stubRequest( "https://example.com/resource/", {
					resource: {
						"https://example.com/ns#string": "value from request",
					},
				} );

				const resource:CRUDDocument = createMock();
				resource._context.extendObjectSchema( {
					"@vocab": "https://example.com/ns#",
				} );
				resource._registry._register( {
					_resolved: true,
					id: "https://example.com/resource/",
				} );

				const retrieved:{ string:string } = await resource
					.get<{ string:string }>( "resource/", { ensureLatest: true } );

				expect( retrieved ).toEqual( {
					string: "value from request",
				} );
			} );

			it( "should add if-none-match header when resolved and ensureLatest", async () => {
				stubRequest( "https://example.com/resource/" );

				const resource:CRUDDocument = createMock();
				resource._registry._register( {
					_resolved: true,
					_eTag: "\"0-12345\"",
					id: "https://example.com/resource/",
				} );

				await resource.get( "resource/", { ensureLatest: true } );

				const request:JasmineAjaxRequest = jasmine.Ajax.requests.mostRecent();
				expect( request.requestHeaders ).toEqual( jasmine.objectContaining( {
					"if-none-match": "\"0-12345\"",
				} ) );
			} );

			it( "should return resource from content-location header", async () => {
				stubRequest( "https://example.com/", {
					headers: {
						"content-location": "https://example.com/another-resource/",
					},
					resource: {
						"@id": "https://example.com/another-resource/",
					},
				} );

				const resource:CRUDDocument = createMock();

				const retrieved:CRUDDocument = await resource.get();
				expect( retrieved ).toEqual( jasmine.objectContaining( {
					id: "https://example.com/another-resource/",
				} ) );
			} );


			it( "should return parsed data", async () => {
				stubRequest( "https://example.com/", {
					resource: {
						"https://example.com/ns#string": "resource",
						"https://example.com/ns#pointerSet": [
							{ "@id": "_:1" },
							{ "@id": "#1" },
							{ "@id": "https://example.com/another/" },
						],
					},
					fragments: [ {
						"@id": "_:1",
						"https://example.com/ns#string": "blank node",
						"https://example.com/ns#pointerSet": [
							{ "@id": "#2" },
						],
					}, {
						"@id": "#1",
						"https://example.com/ns#string": "named fragment",
					}, {
						"@id": "#2",
						"https://example.com/ns#string": "another named fragment",
					} ],
				} );

				type MyResource = {
					string:string;
					pointerSet?:MyResource[]
				};

				const _context:CarbonLDP = new CarbonLDP( "https://example.com/" );
				_context.extendObjectSchema( {
					"ex": "https://example.com/ns#",
					"string": {
						"@id": "ex:string",
						"@type": "string",
					},
					"pointerSet": {
						"@id": "ex:pointerSet",
						"@type": "@id",
						"@container": "@set",
					},
				} );

				const resource:CRUDDocument = createMock( { _context } );

				const retrieved:MyResource = await resource.get<MyResource>();
				expect( retrieved ).toEqual( {
					string: "resource",
					pointerSet: [
						{
							string: "blank node",
							pointerSet: [ {
								string: "another named fragment",
							} ],
						},
						{
							string: "named fragment",
						},
						<any> jasmine.objectContaining( {
							id: "https://example.com/another/",
						} ),
					],
				} );
			} );

			it( "should store returned data in the registry", async () => {
				stubRequest( "https://example.com/" );

				const resource:CRUDDocument = createMock( {} );

				const retrieved:CRUDDocument = await resource.get();

				const registry:DocumentsRegistry = resource._registry;
				expect( registry.hasPointer( retrieved.id ) ).toBe( true );
				expect( registry.getPointer( retrieved.id ) ).toBe( retrieved );
			} );

			it( "should add PersistedDocument values", async () => {
				stubRequest( "https://example.com/" );

				const resource:CRUDDocument = createMock( {} );

				const retrieved:CRUDDocument = await resource.get();

				expect( retrieved ).toEqual( jasmine.objectContaining( {
					_eTag: "\"1-12345\"",
					_resolved: true,
				} ) );
			} );

		} );

		describe( method( OBLIGATORY, "resolve" ), () => {

			it( hasSignature(
				[ "T extends object" ],
				[
					{ name: "requestOptions", type: "CarbonLDP.HTTP.GETOptions", optional: true, description: "Customizable options for the request." },
				],
				{ type: "Promise<T & CarbonLDP.Document>" }
			), ():void => {} );

			it( "should exists", ():void => {
				const resource:CRUDDocument = createMock();

				expect( resource.resolve ).toBeDefined();
				expect( resource.resolve ).toEqual( jasmine.any( Function ) );
			} );


			function stubRequest( url:string, options:{ resource?:object, fragments?:object[], frees?:object[], headers?:{ [ key:string ]:string } } = {} ):void {
				const id:string = options.resource && options.resource[ "@id" ] ?
					options.resource[ "@id" ] : url;

				// noinspection JSMismatchedCollectionQueryUpdate
				const headers:{ [ key:string ]:string } = options.headers ?
					options.headers : {};

				const frees:object[] = options.frees ?
					options.frees : [];

				const resource:object = options.resource ?
					options.resource : {};
				const fragments:object[] = options.fragments ?
					options.fragments : [];

				jasmine.Ajax
					.stubRequest( url, null, "GET" )
					.andReturn( {
						status: 200,
						responseHeaders: {
							"ETag": "\"1-12345\"",
							...headers,
						},
						responseText: JSON.stringify( [
							...frees,
							{
								"@id": id,
								"@graph": [
									{
										"@id": id,
										...resource,
									},
									...fragments,
								],
							},
						] ),
					} );
			}


			it( "should throw error when _registry undefined", async () => {
				try {
					const resource:CRUDDocument = createMock( { _registry: void 0 } );
					await resource.resolve();
				} catch( e ) {
					expect( () => { throw e; } )
						.toThrowError( IllegalActionError, `"https://example.com/" doesn't support CRUD requests.` );
				}
			} );

			it( "should parse error response", async () => {
				const resource:CRUDDocument = createMock( { id: "https://example.com/500/" } );

				const spy:jasmine.Spy = spyOn( resource._registry, "_parseErrorResponse" )
					.and.callFake( () => Promise.reject( null ) );

				try {
					await resource.resolve();
					fail( "Should not resolve" );
				} catch( error ) {
					if( error ) fail( error );

					expect( spy ).toHaveBeenCalled();
				}
			} );


			it( "should request self when no URI", async () => {
				stubRequest( "https://example.com/" );

				const resource:CRUDDocument = createMock();
				await resource.resolve();

				const request:JasmineAjaxRequest = jasmine.Ajax.requests.mostRecent();
				expect( request.url ).toBe( "https://example.com/" );
			} );

			it( "should send basic request headers", async () => {
				stubRequest( "https://example.com/" );

				const resource:CRUDDocument = createMock();
				await resource.resolve();

				const request:JasmineAjaxRequest = jasmine.Ajax.requests.mostRecent();
				expect( request.requestHeaders ).toEqual( {
					"accept": "application/ld+json",
					"prefer": `${ LDP.RDFSource }; rel=interaction-model`,
				} );
			} );

			it( "should add authentication header", async () => {
				stubRequest( "https://example.com/" );

				const resource:CRUDDocument = createMock();

				const spy:jasmine.Spy = spyOn( resource._context.auth, "addAuthentication" );

				await resource.resolve();

				expect( spy ).toHaveBeenCalled();
			} );

			it( "should add custom headers", async () => {
				stubRequest( "https://example.com/" );

				const resource:CRUDDocument = createMock();

				await resource.resolve( {
					headers: new Map()
						.set( "custom", new Header( "custom value" ) )
					,
				} );

				const request:JasmineAjaxRequest = jasmine.Ajax.requests.mostRecent();
				expect( request.requestHeaders ).toEqual( jasmine.objectContaining( {
					"custom": "custom value",
				} ) );
			} );


			it( "should return resource requested", async () => {
				stubRequest( "https://example.com/" );

				const resource:CRUDDocument = createMock();

				const retrieved:CRUDDocument = await resource.resolve();
				expect( retrieved ).toEqual( jasmine.objectContaining( {
					id: "https://example.com/",
				} ) );
			} );

			it( "should return registered when already resolved", async () => {
				const resource:CRUDDocument = createMock( { id: "https://example.com/" } );

				const registered:CRUDDocument = resource._registry
					.getPointer( "https://example.com/", true );
				registered._resolved = true;

				const retrieved:CRUDDocument = await resource.resolve();
				expect( retrieved ).toBe( registered );
			} );

			it( "should return requested when already resolved but ensureLatest set", async () => {
				stubRequest( "https://example.com/", {
					resource: {
						"https://example.com/ns#string": "value from request",
					},
				} );

				const resource:CRUDDocument = createMock();

				resource._context.extendObjectSchema( {
					"@vocab": "https://example.com/ns#",
				} );

				const registered:CRUDDocument = resource._registry
					.getPointer( "https://example.com/", true );
				registered._resolved = true;


				const retrieved:{ string:string } = await resource
					.resolve<{ string:string }>( { ensureLatest: true } );

				expect( retrieved ).toEqual( {
					string: "value from request",
				} );
			} );

			it( "should add if-none-match header when resolved and ensureLatest", async () => {
				stubRequest( "https://example.com/" );

				const resource:CRUDDocument = createMock();

				const registered:CRUDDocument = resource._registry
					.getPointer( "https://example.com/", true );
				registered._resolved = true;
				registered._eTag = "\"0-12345\"";


				await resource.resolve( { ensureLatest: true } );

				const request:JasmineAjaxRequest = jasmine.Ajax.requests.mostRecent();
				expect( request.requestHeaders ).toEqual( jasmine.objectContaining( {
					"if-none-match": "\"0-12345\"",
				} ) );
			} );


			it( "should return parsed data", async () => {
				stubRequest( "https://example.com/", {
					resource: {
						"https://example.com/ns#string": "resource",
						"https://example.com/ns#pointerSet": [
							{ "@id": "_:1" },
							{ "@id": "#1" },
							{ "@id": "https://example.com/another/" },
						],
					},
					fragments: [ {
						"@id": "_:1",
						"https://example.com/ns#string": "blank node",
						"https://example.com/ns#pointerSet": [
							{ "@id": "#2" },
						],
					}, {
						"@id": "#1",
						"https://example.com/ns#string": "named fragment",
					}, {
						"@id": "#2",
						"https://example.com/ns#string": "another named fragment",
					} ],
				} );

				type MyResource = {
					string:string;
					pointerSet?:MyResource[]
				};

				const _context:CarbonLDP = new CarbonLDP( "https://example.com/" );
				_context.extendObjectSchema( {
					"ex": "https://example.com/ns#",
					"string": {
						"@id": "ex:string",
						"@type": "string",
					},
					"pointerSet": {
						"@id": "ex:pointerSet",
						"@type": "@id",
						"@container": "@set",
					},
				} );

				const resource:CRUDDocument = createMock( { _context } );

				const retrieved:MyResource = await resource.resolve<MyResource>();
				expect( retrieved ).toEqual( {
					string: "resource",
					pointerSet: [
						{
							string: "blank node",
							pointerSet: [ {
								string: "another named fragment",
							} ],
						},
						{
							string: "named fragment",
						},
						<any> jasmine.objectContaining( {
							id: "https://example.com/another/",
						} ),
					],
				} );
			} );

			it( "should store returned data in the registry", async () => {
				stubRequest( "https://example.com/" );

				const resource:CRUDDocument = createMock( {} );

				const retrieved:CRUDDocument = await resource.resolve();

				const registry:DocumentsRegistry = resource._registry;
				expect( registry.hasPointer( retrieved.id ) ).toBe( true );
				expect( registry.getPointer( retrieved.id ) ).toBe( retrieved );
			} );

			it( "should add PersistedDocument values", async () => {
				stubRequest( "https://example.com/" );

				const resource:CRUDDocument = createMock( {} );

				const retrieved:CRUDDocument = await resource.resolve();

				expect( retrieved ).toEqual( jasmine.objectContaining( {
					_eTag: "\"1-12345\"",
					_resolved: true,
				} ) );
			} );

		} );


		describe( method( OBLIGATORY, "exists" ), () => {

			it( hasSignature(
				[
					{ name: "uri", type: "string", description: "The URI to verify if its existence." },
					{ name: "requestOptions", type: "CarbonLDP.HTTP.RequestOptions", optional: true, description: "Customizable options for the request." },
				],
				{ type: "Promise<boolean>" }
			), ():void => {} );

			it( "should exists", ():void => {
				const resource:CRUDDocument = createMock();

				expect( resource.exists ).toBeDefined();
				expect( resource.exists ).toEqual( jasmine.any( Function ) );
			} );


			function stubRequest( url:string, options:{ status?:number, headers?:{ [ key:string ]:string } } = {} ):void {
				const status:number = options.status !== void 0 ?
					options.status : 200;

				// noinspection JSMismatchedCollectionQueryUpdate
				const headers:{ [ key:string ]:string } = options.headers ?
					options.headers : {};

				jasmine.Ajax
					.stubRequest( url, null, "HEAD" )
					.andReturn( {
						status,
						responseHeaders: {
							"ETag": "\"1-12345\"",
							...headers,
						},
					} );
			}


			it( "should throw error when _registry undefined", async () => {
				try {
					const resource:CRUDDocument = createMock( { _registry: void 0 } );
					await resource.exists( "resource/" );
				} catch( e ) {
					expect( () => { throw e; } )
						.toThrowError( IllegalActionError, `"https://example.com/" doesn't support CRUD requests.` );
				}
			} );

			it( "should parse error response", async () => {
				const resource:CRUDDocument = createMock();

				const spy:jasmine.Spy = spyOn( resource._registry, "_parseErrorResponse" )
					.and.callFake( () => Promise.reject( null ) );

				try {
					await resource.exists( "500/" );
					fail( "Should not exists" );
				} catch( error ) {
					if( error ) fail( error );

					expect( spy ).toHaveBeenCalled();
				}
			} );


			it( "should request the URI provided", async () => {
				stubRequest( "https://example.com/another-resource/" );

				const resource:CRUDDocument = createMock();
				await resource.exists( "https://example.com/another-resource/" );

				const request:JasmineAjaxRequest = jasmine.Ajax.requests.mostRecent();
				expect( request.url ).toBe( "https://example.com/another-resource/" );
			} );

			it( "should request relative URI provided", async () => {
				stubRequest( "https://example.com/relative/" );

				const resource:CRUDDocument = createMock();
				await resource.exists( "relative/" );

				const request:JasmineAjaxRequest = jasmine.Ajax.requests.mostRecent();
				expect( request.url ).toBe( "https://example.com/relative/" );
			} );

			it( "should request resolved prefixed name provided", async () => {
				stubRequest( "https://example.com/resource/" );

				const _context:CarbonLDP = new CarbonLDP( "https://example.com/" );
				_context.extendObjectSchema( { "ex": "https://example.com/" } );

				const resource:CRUDDocument = createMock( { _context } );
				await resource.exists( "ex:resource/" );

				const request:JasmineAjaxRequest = jasmine.Ajax.requests.mostRecent();
				expect( request.url ).toBe( "https://example.com/resource/" );
			} );

			it( "should throw error when from URI outside context scope", async () => {
				const resource:CRUDDocument = createMock();

				await resource
					.exists( "https://example.org/resource/" )
					.catch( error => {
						expect( () => { throw error; } )
							.toThrowError( IllegalArgumentError, `"https://example.org/resource/" is out of scope.` );
					} )
				;
			} );

			it( "should throw error when from URI is BNode label", async () => {
				const resource:CRUDDocument = createMock();

				await resource
					.exists( "_:1" )
					.catch( error => {
						expect( () => { throw error; } )
							.toThrowError( IllegalArgumentError, `"_:1" (Blank Node) can't be fetched directly.` );
					} )
				;
			} );

			it( "should throw error when from URI is Named Fragment label", async () => {
				const resource:CRUDDocument = createMock();

				await resource
					.exists( "#fragment" )
					.catch( error => {
						expect( () => { throw error; } )
							.toThrowError( IllegalArgumentError, `"https://example.com/#fragment" (Named Fragment) can't be fetched directly.` );
					} )
				;
			} );

			it( "should throw error when unresolved prefixed name", async () => {
				const resource:CRUDDocument = createMock();

				await resource
					.exists( "ex:resource/" )
					.catch( error => {
						expect( () => { throw error; } )
							.toThrowError( IllegalArgumentError, `"ex:resource/" is out of scope.` );
					} )
				;
			} );


			it( "should send basic request headers", async () => {
				stubRequest( "https://example.com/resource/" );

				const resource:CRUDDocument = createMock();
				await resource.exists( "resource/" );

				const request:JasmineAjaxRequest = jasmine.Ajax.requests.mostRecent();
				expect( request.requestHeaders ).toEqual( {
					"accept": "application/ld+json",
					"prefer": `${ LDP.RDFSource }; rel=interaction-model`,
				} );
			} );

			it( "should add authentication header", async () => {
				stubRequest( "https://example.com/resource/" );

				const resource:CRUDDocument = createMock();

				const spy:jasmine.Spy = spyOn( resource._context.auth, "addAuthentication" );

				await resource.exists( "resource/" );

				expect( spy ).toHaveBeenCalled();
			} );

			it( "should add custom headers", async () => {
				stubRequest( "https://example.com/resource/" );

				const resource:CRUDDocument = createMock();

				await resource.exists( "resource/", {
					headers: new Map()
						.set( "custom", new Header( "custom value" ) )
					,
				} );

				const request:JasmineAjaxRequest = jasmine.Ajax.requests.mostRecent();
				expect( request.requestHeaders ).toEqual( jasmine.objectContaining( {
					"custom": "custom value",
				} ) );
			} );


			it( "should return true if request success", async () => {
				stubRequest( "https://example.com/resource/" );

				const resource:CRUDDocument = createMock();

				const exists:boolean = await resource.exists( "resource/" );
				expect( exists ).toEqual( true );
			} );

			it( "should return false if request 404", async () => {
				stubRequest( "https://example.com/resource/", { status: 404 } );

				const resource:CRUDDocument = createMock();

				const exists:boolean = await resource.exists( "resource/" );
				expect( exists ).toEqual( false );
			} );

		} );


		describe( method( OBLIGATORY, "create" ), () => {

			it( hasSignature(
				[ "T extends object" ],
				"Persists the object as a child of the current document.", [
					{ name: "child", type: "T", description: "The object from where to create the child." },
					{ name: "requestOptions", type: "CarbonLDP.HTTP.RequestOptions", optional: true, description: "Customizable options for the request." },
				],
				{ type: "Promise<T & CarbonLDP.ProtectedDocument>" }
			), ():void => {} );

			it( hasSignature(
				[ "T extends object" ],
				"Persists the object with the slug specified as a child of the current document.", [
					{ name: "child", type: "T", description: "The object from where to create the child." },
					{ name: "slug", type: "string", description: "The slug that will be used in the child URI." },
					{ name: "requestOptions", type: "CarbonLDP.HTTP.RequestOptions", optional: true, description: "Customizable options for the request." },
				],
				{ type: "Promise<T & CarbonLDP.ProtectedDocument>" }
			), ():void => {} );

			it( hasSignature(
				[ "T extends object" ],
				"Persists multiple objects as children of the current document.", [
					{ name: "children", type: "T[]", description: "An array with the objects to be persisted as the new children." },
					{ name: "requestOptions", type: "CarbonLDP.HTTP.RequestOptions", optional: true, description: "Customizable options for every the request." },
				],
				{ type: "Promise<(T & CarbonLDP.ProtectedDocument)[]>", description: "Promise that contains the new UNRESOLVED persisted children." }
			), ():void => {} );

			it( hasSignature(
				[ "T extends object" ],
				"Persists multiple objects as children of the current document.", [
					{ name: "children", type: "T[]", description: "An array with the objects to be persisted as the new children." },
					{ name: "slugs", type: "string[]", description: "Array with the slugs that corresponds to each object in `object` parameter, in the order in which they were defined. If an element in the array is undefined or null, the slug will be generated by the platform." },
					{ name: "requestOptions", type: "CarbonLDP.HTTP.RequestOptions", optional: true, description: "Customizable options for every the request." },
				],
				{ type: "Promise<(T & CarbonLDP.ProtectedDocument)[]>", description: "Promise that contains the new UNRESOLVED persisted children." }
			), ():void => {} );

			it( hasSignature(
				[ "T extends object" ],
				"Persists the object as a child of the uri specified.", [
					{ name: "uri", type: "string", description: "URI of the document where to create the child." },
					{ name: "child", type: "T", description: "The object from where to create the child." },
					{ name: "requestOptions", type: "CarbonLDP.HTTP.RequestOptions", optional: true, description: "Customizable options for the request." },
				],
				{ type: "Promise<T & CarbonLDP.ProtectedDocument>" }
			), ():void => {} );

			it( hasSignature(
				[ "T extends object" ],
				"Persists the object with the slug specified as a child of the uri specified.", [
					{ name: "uri", type: "string", description: "URI of the document where to create the child." },
					{ name: "child", type: "T", description: "The object from where to create the child." },
					{ name: "slug", type: "string", description: "The slug that will be used in the child URI." },
					{ name: "requestOptions", type: "CarbonLDP.HTTP.RequestOptions", optional: true, description: "Customizable options for the request." },
				],
				{ type: "Promise<T & CarbonLDP.ProtectedDocument>" }
			), ():void => {} );

			it( hasSignature(
				[ "T extends object" ],
				"Persists multiple objects as children of the uri specified.", [
					{ name: "uri", type: "string", description: "URI of the document where to create the child." },
					{ name: "children", type: "T[]", description: "An array with the objects to be persisted as the new children." },
					{ name: "requestOptions", type: "CarbonLDP.HTTP.RequestOptions", optional: true, description: "Customizable options for every the request." },
				],
				{ type: "Promise<(T & CarbonLDP.ProtectedDocument)[]>", description: "Promise that contains the new UNRESOLVED persisted children." }
			), ():void => {} );

			it( hasSignature(
				[ "T extends object" ],
				"Persists multiple objects as children of the uri specified.", [
					{ name: "uri", type: "string", description: "URI of the document where to create the child." },
					{ name: "children", type: "T[]", description: "An array with the objects to be persisted as the new children." },
					{ name: "slugs", type: "string[]", description: "Array with the slugs that corresponds to each object in `object` parameter, in the order in which they were defined. If an element in the array is undefined or null, the slug will be generated by the platform." },
					{ name: "requestOptions", type: "CarbonLDP.HTTP.RequestOptions", optional: true, description: "Customizable options for every the request." },
				],
				{ type: "Promise<(T & CarbonLDP.ProtectedDocument)[]>", description: "Promise that contains the new UNRESOLVED persisted children." }
			), ():void => {} );

			it( "should exists", ():void => {
				const resource:CRUDDocument = createMock();

				expect( resource.create ).toBeDefined();
				expect( resource.create ).toEqual( jasmine.any( Function ) );
			} );


			function stubRequest( url:string, options:{ status?:number, headers?:{ [ key:string ]:string }, frees?:object[], } = {} ):void {
				const status:number = options.status !== void 0 ?
					options.status :
					options.frees && options.frees.length ?
						200 :
						204
				;

				// noinspection JSMismatchedCollectionQueryUpdate
				const headers:{ [ key:string ]:string } = options.headers ?
					options.headers : {};


				const data:string | undefined = options.frees ?
					JSON.stringify( [
						...options.frees,
					] ) :
					void 0
				;

				let counter:number = 1;

				jasmine.Ajax
					.stubRequest( url, null, "POST" )
					.andReturn( {
						status,
						responseHeaders: {
							get location():string { return `${ url }child-${ counter ++ }/`; },
							...headers,
						},
						responseText: data,
					} );
			}


			it( "should throw error when _registry undefined", async () => {
				try {
					const resource:CRUDDocument = createMock( { _registry: void 0 } );
					await resource.create( {} );
				} catch( e ) {
					expect( () => { throw e; } )
						.toThrowError( IllegalActionError, `"https://example.com/" doesn't support CRUD requests.` );
				}
			} );

			it( "should parse error response", async () => {
				const resource:CRUDDocument = createMock( { id: "https://example.com/500/" } );

				const spy:jasmine.Spy = spyOn( resource._registry, "_parseErrorResponse" )
					.and.callFake( () => Promise.reject( null ) );

				try {
					await resource.create( {} );
					fail( "Should not create" );
				} catch( error ) {
					if( error ) fail( error );

					expect( spy ).toHaveBeenCalled();
				}
			} );


			it( "should request from self when no URI", async () => {
				stubRequest( "https://example.com/" );

				const resource:CRUDDocument = createMock();
				await resource.create( {} );

				const request:JasmineAjaxRequest = jasmine.Ajax.requests.mostRecent();
				expect( request.url ).toBe( "https://example.com/" );
			} );

			it( "should request from URI", async () => {
				stubRequest( "https://example.com/another-resource/" );

				const resource:CRUDDocument = createMock();
				await resource.create( "https://example.com/another-resource/", {} );

				const request:JasmineAjaxRequest = jasmine.Ajax.requests.mostRecent();
				expect( request.url ).toBe( "https://example.com/another-resource/" );
			} );

			it( "should request from relative URI", async () => {
				stubRequest( "https://example.com/relative/" );

				const resource:CRUDDocument = createMock();
				await resource.create( "relative/", {} );

				const request:JasmineAjaxRequest = jasmine.Ajax.requests.mostRecent();
				expect( request.url ).toBe( "https://example.com/relative/" );
			} );

			it( "should request from resolved prefixed name", async () => {
				stubRequest( "https://example.com/resource/" );

				const _context:CarbonLDP = new CarbonLDP( "https://example.com/" );
				_context.extendObjectSchema( { "ex": "https://example.com/" } );

				const resource:CRUDDocument = createMock( { _context } );
				await resource.create( "ex:resource/", {} );

				const request:JasmineAjaxRequest = jasmine.Ajax.requests.mostRecent();
				expect( request.url ).toBe( "https://example.com/resource/" );
			} );

			it( "should throw error when from URI outside context scope", async () => {
				const resource:CRUDDocument = createMock();

				await resource
					.create( "https://example.org/resource/", {} )
					.catch( error => {
						expect( () => { throw error; } )
							.toThrowError( IllegalArgumentError, `"https://example.org/resource/" is out of scope.` );
					} )
				;
			} );

			it( "should throw error when from URI is BNode label", async () => {
				const resource:CRUDDocument = createMock();

				await resource
					.create( "_:1", {} )
					.catch( error => {
						expect( () => { throw error; } )
							.toThrowError( IllegalArgumentError, `"_:1" (Blank Node) can't be fetched directly.` );
					} )
				;
			} );

			it( "should throw error when from URI is Named Fragment label", async () => {
				const resource:CRUDDocument = createMock();

				await resource
					.create( "#fragment", {} )
					.catch( error => {
						expect( () => { throw error; } )
							.toThrowError( IllegalArgumentError, `"https://example.com/#fragment" (Named Fragment) can't be fetched directly.` );
					} )
				;
			} );

			it( "should throw error when unresolved prefixed name", async () => {
				const resource:CRUDDocument = createMock();

				await resource
					.create( "ex:resource/", {} )
					.catch( error => {
						expect( () => { throw error; } )
							.toThrowError( IllegalArgumentError, `"ex:resource/" is out of scope.` );
					} )
				;
			} );


			it( "should send basic request headers in single self child", async () => {
				stubRequest( "https://example.com/" );

				const resource:CRUDDocument = createMock();
				await resource.create( {} );

				const request:JasmineAjaxRequest = jasmine.Ajax.requests.mostRecent();
				expect( request.requestHeaders ).toEqual( {
					"accept": "application/ld+json",
					"content-type": "application/ld+json",
					"prefer": [
						"return=minimal",
						`${ LDP.Container }; rel=interaction-model`,
					].join( ", " ),
				} );
			} );

			it( "should send basic request headers in single URI child", async () => {
				stubRequest( "https://example.com/resource/" );

				const resource:CRUDDocument = createMock();
				await resource.create( "resource/", {} );

				const request:JasmineAjaxRequest = jasmine.Ajax.requests.mostRecent();
				expect( request.requestHeaders ).toEqual( {
					"accept": "application/ld+json",
					"content-type": "application/ld+json",
					"prefer": [
						"return=minimal",
						`${ LDP.Container }; rel=interaction-model`,
					].join( ", " ),
				} );
			} );

			it( "should send basic request headers in multiple self children", async () => {
				stubRequest( "https://example.com/" );

				const resource:CRUDDocument = createMock();
				await resource.create( [ {}, {} ] );

				const firstRequest:JasmineAjaxRequest = jasmine.Ajax.requests.at( 0 );
				expect( firstRequest.requestHeaders ).toEqual( {
					"accept": "application/ld+json",
					"content-type": "application/ld+json",
					"prefer": [
						"return=minimal",
						`${ LDP.Container }; rel=interaction-model`,
					].join( ", " ),
				} );

				const secondRequest:JasmineAjaxRequest = jasmine.Ajax.requests.at( 1 );
				expect( secondRequest.requestHeaders ).toEqual( {
					"accept": "application/ld+json",
					"content-type": "application/ld+json",
					"prefer": [
						"return=minimal",
						`${ LDP.Container }; rel=interaction-model`,
					].join( ", " ),
				} );
			} );

			it( "should send basic request headers in multiple URI child", async () => {
				stubRequest( "https://example.com/resource/" );

				const resource:CRUDDocument = createMock();
				await resource.create( "resource/", [ {}, {} ] );


				const firstRequest:JasmineAjaxRequest = jasmine.Ajax.requests.at( 0 );
				expect( firstRequest.requestHeaders ).toEqual( {
					"accept": "application/ld+json",
					"content-type": "application/ld+json",
					"prefer": [
						"return=minimal",
						`${ LDP.Container }; rel=interaction-model`,
					].join( ", " ),
				} );

				const secondRequest:JasmineAjaxRequest = jasmine.Ajax.requests.at( 1 );
				expect( secondRequest.requestHeaders ).toEqual( {
					"accept": "application/ld+json",
					"content-type": "application/ld+json",
					"prefer": [
						"return=minimal",
						`${ LDP.Container }; rel=interaction-model`,
					].join( ", " ),
				} );
			} );

			it( "should add authentication header", async () => {
				stubRequest( "https://example.com/" );

				const resource:CRUDDocument = createMock();

				const spy:jasmine.Spy = spyOn( resource._context.auth, "addAuthentication" );

				await resource.create( {} );

				expect( spy ).toHaveBeenCalled();
			} );

			it( "should add custom headers in single self child", async () => {
				stubRequest( "https://example.com/" );

				const resource:CRUDDocument = createMock();

				await resource.create( {}, {
					headers: new Map()
						.set( "custom", new Header( "custom value" ) )
					,
				} );

				const request:JasmineAjaxRequest = jasmine.Ajax.requests.mostRecent();
				expect( request.requestHeaders ).toEqual( jasmine.objectContaining( {
					"custom": "custom value",
				} ) );
			} );

			it( "should add custom headers in single URI child", async () => {
				stubRequest( "https://example.com/resource/" );

				const resource:CRUDDocument = createMock();

				await resource.create( "resource/", {}, {
					headers: new Map()
						.set( "custom", new Header( "custom value" ) )
					,
				} );

				const request:JasmineAjaxRequest = jasmine.Ajax.requests.mostRecent();
				expect( request.requestHeaders ).toEqual( jasmine.objectContaining( {
					"custom": "custom value",
				} ) );
			} );

			it( "should send custom request headers in multiple self children", async () => {
				stubRequest( "https://example.com/" );

				const resource:CRUDDocument = createMock();
				await resource.create( [ {}, {} ], {
					headers: new Map()
						.set( "custom", new Header( "custom value" ) )
					,
				} );

				const firstRequest:JasmineAjaxRequest = jasmine.Ajax.requests.at( 0 );
				expect( firstRequest.requestHeaders ).toEqual( jasmine.objectContaining( {
					"custom": "custom value",
				} ) );

				const secondRequest:JasmineAjaxRequest = jasmine.Ajax.requests.at( 1 );
				expect( secondRequest.requestHeaders ).toEqual( jasmine.objectContaining( {
					"custom": "custom value",
				} ) );
			} );

			it( "should send custom request headers in multiple URI children", async () => {
				stubRequest( "https://example.com/resource/" );

				const resource:CRUDDocument = createMock();
				await resource.create( "resource/", [ {}, {} ], {
					headers: new Map()
						.set( "custom", new Header( "custom value" ) )
					,
				} );

				const firstRequest:JasmineAjaxRequest = jasmine.Ajax.requests.at( 0 );
				expect( firstRequest.requestHeaders ).toEqual( jasmine.objectContaining( {
					"custom": "custom value",
				} ) );

				const secondRequest:JasmineAjaxRequest = jasmine.Ajax.requests.at( 1 );
				expect( secondRequest.requestHeaders ).toEqual( jasmine.objectContaining( {
					"custom": "custom value",
				} ) );
			} );

			it( "should add slug header when single self child", async () => {
				stubRequest( "https://example.com/" );

				const resource:CRUDDocument = createMock();

				await resource.create( {}, "child-slug" );

				const request:JasmineAjaxRequest = jasmine.Ajax.requests.mostRecent();
				expect( request.requestHeaders ).toEqual( jasmine.objectContaining( {
					"slug": "child-slug",
				} ) );
			} );

			it( "should add slug header when single URI child", async () => {
				stubRequest( "https://example.com/resource/" );

				const resource:CRUDDocument = createMock();

				await resource.create( "resource/", {}, "child-slug" );

				const request:JasmineAjaxRequest = jasmine.Ajax.requests.mostRecent();
				expect( request.requestHeaders ).toEqual( jasmine.objectContaining( {
					"slug": "child-slug",
				} ) );
			} );

			it( "should add slug header when multiple self child", async () => {
				stubRequest( "https://example.com/" );

				const resource:CRUDDocument = createMock();

				await resource.create( [ {}, {} ], [ "child-slug-1", "child-slug-2" ] );

				const firstRequest:JasmineAjaxRequest = jasmine.Ajax.requests.at( 0 );
				expect( firstRequest.requestHeaders ).toEqual( jasmine.objectContaining( {
					"slug": "child-slug-1",
				} ) );

				const secondRequest:JasmineAjaxRequest = jasmine.Ajax.requests.at( 1 );
				expect( secondRequest.requestHeaders ).toEqual( jasmine.objectContaining( {
					"slug": "child-slug-2",
				} ) );
			} );

			it( "should add slug header when multiple URI child", async () => {
				stubRequest( "https://example.com/resource/" );

				const resource:CRUDDocument = createMock();

				await resource.create( "resource/", [ {}, {} ], [ "child-slug-1", "child-slug-2" ] );

				const firstRequest:JasmineAjaxRequest = jasmine.Ajax.requests.at( 0 );
				expect( firstRequest.requestHeaders ).toEqual( jasmine.objectContaining( {
					"slug": "child-slug-1",
				} ) );

				const secondRequest:JasmineAjaxRequest = jasmine.Ajax.requests.at( 1 );
				expect( secondRequest.requestHeaders ).toEqual( jasmine.objectContaining( {
					"slug": "child-slug-2",
				} ) );
			} );

			it( "should add slug header if defined when multiple child", async () => {
				stubRequest( "https://example.com/" );

				const resource:CRUDDocument = createMock();

				await resource.create( [ {}, {}, {} ], [ null, undefined, "child-slug" ] );

				const firstRequest:JasmineAjaxRequest = jasmine.Ajax.requests.at( 0 );
				expect( firstRequest.requestHeaders ).not.toEqual( jasmine.objectContaining( {
					"slug": jasmine.anything() as any,
				} ) );

				const secondRequest:JasmineAjaxRequest = jasmine.Ajax.requests.at( 1 );
				expect( secondRequest.requestHeaders ).not.toEqual( jasmine.objectContaining( {
					"slug": jasmine.anything() as any,
				} ) );

				const thirdRequest:JasmineAjaxRequest = jasmine.Ajax.requests.at( 2 );
				expect( thirdRequest.requestHeaders ).toEqual( jasmine.objectContaining( {
					"slug": "child-slug",
				} ) );
			} );

			it( "should not add slug header when multiple but less slugs than children", async () => {
				stubRequest( "https://example.com/" );

				const resource:CRUDDocument = createMock();

				await resource.create( [ {}, {} ], [ "child-slug" ] );

				const firstRequest:JasmineAjaxRequest = jasmine.Ajax.requests.at( 0 );
				expect( firstRequest.requestHeaders ).toEqual( jasmine.objectContaining( {
					"slug": "child-slug",
				} ) );

				const secondRequest:JasmineAjaxRequest = jasmine.Ajax.requests.at( 1 );
				expect( secondRequest.requestHeaders ).not.toEqual( jasmine.objectContaining( {
					"slug": jasmine.anything() as any,
				} ) );
			} );


			it( "should send converted JSONLD when from self child", async () => {
				stubRequest( "https://example.com/" );

				const resource:CRUDDocument = createMock();
				resource._context
					.extendObjectSchema( {
						"@vocab": "https://example.com/ns#",
					} )
				;

				await resource.create( {
					string: "my object",
					pointerSet: [
						{ id: "_:1", string: "blank node" },
						{ slug: "fragment", string: "named fragment" },
					],
				} );

				const request:JasmineAjaxRequest = jasmine.Ajax.requests.mostRecent();
				expect( request.params ).toBe( JSON.stringify( {
					"@id": "",
					"@graph": [ {
						"@id": "",
						"https://example.com/ns#string": [ {
							"@value": "my object",
							"@type": XSD.string,
						} ],
						"https://example.com/ns#pointerSet": [ {
							"@id": "_:1",
						}, {
							"@id": "#fragment",
						} ],
					}, {
						"@id": "_:1",
						"https://example.com/ns#string": [ {
							"@value": "blank node",
							"@type": XSD.string,
						} ],
					}, {
						"@id": "#fragment",
						"https://example.com/ns#string": [ {
							"@value": "named fragment",
							"@type": XSD.string,
						} ],
					} ],
				} ) );
			} );

			it( "should send converted JSONLD when from URI child", async () => {
				stubRequest( "https://example.com/resource/" );

				const resource:CRUDDocument = createMock();
				resource._context
					.extendObjectSchema( {
						"@vocab": "https://example.com/ns#",
					} )
				;

				await resource.create( "resource/", {
					string: "my object",
					pointerSet: [
						{ id: "_:1", string: "blank node" },
						{ slug: "fragment", string: "named fragment" },
					],
				} );

				const request:JasmineAjaxRequest = jasmine.Ajax.requests.mostRecent();
				expect( request.params ).toBe( JSON.stringify( {
					"@id": "",
					"@graph": [ {
						"@id": "",
						"https://example.com/ns#string": [ {
							"@value": "my object",
							"@type": XSD.string,
						} ],
						"https://example.com/ns#pointerSet": [ {
							"@id": "_:1",
						}, {
							"@id": "#fragment",
						} ],
					}, {
						"@id": "_:1",
						"https://example.com/ns#string": [ {
							"@value": "blank node",
							"@type": XSD.string,
						} ],
					}, {
						"@id": "#fragment",
						"https://example.com/ns#string": [ {
							"@value": "named fragment",
							"@type": XSD.string,
						} ],
					} ],
				} ) );
			} );

			it( "should send converted JSONLD when multiple self children", async () => {
				stubRequest( "https://example.com/" );

				const resource:CRUDDocument = createMock();
				resource._context
					.extendObjectSchema( {
						"@vocab": "https://example.com/ns#",
					} )
				;

				await resource.create( [ {
					string: "my object 1",
				}, {
					string: "my object 2",
				} ] );

				const request1:JasmineAjaxRequest = jasmine.Ajax.requests.at( 0 );
				expect( request1.params ).toBe( JSON.stringify( {
					"@id": "",
					"@graph": [ {
						"@id": "",
						"https://example.com/ns#string": [ {
							"@value": "my object 1",
							"@type": XSD.string,
						} ],
					} ],
				} ) );

				const request2:JasmineAjaxRequest = jasmine.Ajax.requests.at( 1 );
				expect( request2.params ).toBe( JSON.stringify( {
					"@id": "",
					"@graph": [ {
						"@id": "",
						"https://example.com/ns#string": [ {
							"@value": "my object 2",
							"@type": XSD.string,
						} ],
					} ],
				} ) );
			} );

			it( "should send converted JSONLD when multiple URI children", async () => {
				stubRequest( "https://example.com/resource/" );

				const resource:CRUDDocument = createMock();
				resource._context
					.extendObjectSchema( {
						"@vocab": "https://example.com/ns#",
					} )
				;

				await resource.create( "resource/", [ {
					string: "my object 1",
				}, {
					string: "my object 2",
				} ] );

				const request1:JasmineAjaxRequest = jasmine.Ajax.requests.at( 0 );
				expect( request1.params ).toBe( JSON.stringify( {
					"@id": "",
					"@graph": [ {
						"@id": "",
						"https://example.com/ns#string": [ {
							"@value": "my object 1",
							"@type": XSD.string,
						} ],
					} ],
				} ) );

				const request2:JasmineAjaxRequest = jasmine.Ajax.requests.at( 1 );
				expect( request2.params ).toBe( JSON.stringify( {
					"@id": "",
					"@graph": [ {
						"@id": "",
						"https://example.com/ns#string": [ {
							"@value": "my object 2",
							"@type": XSD.string,
						} ],
					} ],
				} ) );
			} );

			it( "should return same child object reference", async () => {
				stubRequest( "https://example.com/" );

				const resource:CRUDDocument = createMock();
				const child:object = {};

				const returned:CRUDDocument = await resource.create( child );

				expect( child ).toBe( returned );
			} );

			it( "should return same children object references", async () => {
				stubRequest( "https://example.com/" );

				const resource:CRUDDocument = createMock();
				const child1:object = {};
				const child2:object = {};

				const [ returned1, returned2 ]:CRUDDocument[] = await resource.create( [ child1, child2 ] );

				expect( child1 ).toBe( returned1 );
				expect( child2 ).toBe( returned2 );
			} );

			it( "should have stored the child in the registry", async () => {
				stubRequest( "https://example.com/" );

				const resource:CRUDDocument = createMock();
				const returned:CRUDDocument = await resource.create( {} );

				expect( resource._registry.hasPointer( returned.id ) ).toBe( true );
				expect( resource._registry.getPointer( returned.id ) ).toBe( returned );
			} );

			it( "should have stored the children in the registry", async () => {
				stubRequest( "https://example.com/" );

				const resource:CRUDDocument = createMock();
				const [ returned1, returned2 ]:CRUDDocument[] = await resource.create( [ {}, {} ] );

				expect( resource._registry.hasPointer( returned1.id ) ).toBe( true );
				expect( resource._registry.getPointer( returned1.id ) ).toBe( returned1 );

				expect( resource._registry.hasPointer( returned2.id ) ).toBe( true );
				expect( resource._registry.getPointer( returned2.id ) ).toBe( returned2 );
			} );

			it( "should throw error if child is already persisted", async () => {
				const child:CRUDDocument = createMock( { id: "" } );
				const resource:CRUDDocument = createMock();

				try {
					await resource.create( child );
					fail( "Should not resolve" );
				} catch( error ) {
					expect( () => { throw error; } )
						.toThrowError( IllegalArgumentError, "The child provided has already been persisted." );
				}
			} );

			it( "should throw error if any children is already persisted", async () => {
				const child:CRUDDocument = createMock( { id: "" } );
				const resource:CRUDDocument = createMock();

				try {
					await resource.create( [ {}, child, {} ] );
					fail( "Should not resolve" );
				} catch( error ) {
					expect( () => { throw error; } )
						.toThrowError( IllegalArgumentError, "The child provided has already been persisted." );
				}
			} );

			it( "should throw error if child already being persisted", async () => {
				const child:object = {};
				const resource:CRUDDocument = createMock();

				try {
					await Promise.all( [
						resource.create( child ),
						resource.create( child ),
					] );
					fail( "Should not resolve" );
				} catch( error ) {
					expect( () => { throw error; } )
						.toThrowError( IllegalArgumentError, "The document is already being persisted." );
				}
			} );

			it( "should be able to resend child after a failed request", async () => {
				const resource:CRUDDocument = createMock();

				const child:object = {};
				try {
					stubRequest( "https://example.com/", { status: 500 } );
					await resource.create( child );

				} catch( error ) {
					stubRequest( "https://example.com/" );
					await resource.create( child );

					expect().nothing();
				}
			} );


			it( "should add unresolved PersistedDocument data to the child", async () => {
				stubRequest( "https://example.com/" );

				const resource:CRUDDocument = createMock();
				const returned:CRUDDocument = await resource.create( {} );

				expect( returned ).toEqual( jasmine.objectContaining( {
					_resolved: false,
					id: "https://example.com/child-1/",
				} ) );
			} );

			it( "should add unresolved PersistedDocument data to the children", async () => {
				stubRequest( "https://example.com/" );

				const resource:CRUDDocument = createMock();
				const [ returned1, returned2 ]:CRUDDocument[] = await resource.create( [ {}, {} ] );

				expect( returned1 ).toEqual( jasmine.objectContaining( {
					_resolved: false,
					id: "https://example.com/child-1/",
				} ) );
				expect( returned2 ).toEqual( jasmine.objectContaining( {
					_resolved: false,
					id: "https://example.com/child-2/",
				} ) );
			} );

			it( "should update blank nodes when response metadata returned", async () => {
				stubRequest( "https://example.com/", {
					frees: [
						{
							"@id": "_:responseMetadata",
							"@type": [ C.VolatileResource, C.ResponseMetadata ],
							[ C.documentMetadata ]: [ {
								"@id": "_:documentMetadata",
							} ],
						},
						{
							"@id": "_:documentMetadata",
							"@type": [ C.VolatileResource, C.DocumentMetadata ],
							[ C.relatedDocument ]: [ {
								"@id": "https://example.com/child-1/",
							} ],
							[ C.bNodesMap ]: [ {
								"@id": "_:map",
							} ],
						},
						{
							"@id": "_:map",
							"@type": [ C.Map ],
							[ C.entry ]: [
								{ "@id": "_:entry-1" },
								{ "@id": "_:entry-2" },
							],
						},
						{
							"@id": "_:entry-1",
							[ C.entryKey ]: [ {
								"@id": "_:1",
							} ],
							[ C.entryValue ]: [ {
								"@id": "_:new-1",
							} ],
						},
						{
							"@id": "_:entry-2",
							[ C.entryKey ]: [ {
								"@id": "_:2",
							} ],
							[ C.entryValue ]: [ {
								"@id": "_:new-2",
							} ],
						},
					],
				} );

				const resource:CRUDDocument = createMock();

				type BNode = { id:string, string:string };
				type MyDoc = { blankNode1:BNode, blankNode2:BNode };

				const returned:CRUDDocument & MyDoc = await resource.create<MyDoc>( {
					blankNode1: {
						id: "_:1",
						string: "blank node 1",
					},
					blankNode2: {
						id: "_:2",
						string: "blank node 2",
					},
				} );

				expect( returned.hasPointer( "_:1" ) ).toBe( false );
				expect( returned.blankNode1 ).toEqual( jasmine.objectContaining( {
					id: "_:new-1",
					string: "blank node 1",
				} ) );

				expect( returned.hasPointer( "_:2" ) ).toBe( false );
				expect( returned.blankNode2 ).toEqual( jasmine.objectContaining( {
					id: "_:new-2",
					string: "blank node 2",
				} ) );
			} );

		} );

		describe( method( OBLIGATORY, "createAndRetrieve" ), () => {

			it( hasSignature(
				[ "T extends object" ],
				"Persists the object as a child of the current document and retrieves the updated data from the server.", [
					{ name: "child", type: "T", description: "The object from where to create the child." },
					{ name: "requestOptions", type: "CarbonLDP.HTTP.RequestOptions", optional: true, description: "Customizable options for the request." },
				],
				{ type: "Promise<T & CarbonLDP.ProtectedDocument>" }
			), ():void => {} );

			it( hasSignature(
				[ "T extends object" ],
				"Persists the object with the slug specified as a child of the current document and retrieves the updated data from the server.", [
					{ name: "child", type: "T", description: "The object from where to create the child." },
					{ name: "slug", type: "string", description: "The slug that will be used in the child URI." },
					{ name: "requestOptions", type: "CarbonLDP.HTTP.RequestOptions", optional: true, description: "Customizable options for the request." },
				],
				{ type: "Promise<T & CarbonLDP.ProtectedDocument>" }
			), ():void => {} );

			it( hasSignature(
				[ "T extends object" ],
				"Persists multiple objects as children of the current document and retrieves the updated data from the server.", [
					{ name: "children", type: "T[]", description: "An array with the objects to be persisted as the new children." },
					{ name: "requestOptions", type: "CarbonLDP.HTTP.RequestOptions", optional: true, description: "Customizable options for every the request." },
				],
				{ type: "Promise<(T & CarbonLDP.ProtectedDocument)[]>", description: "Promise that contains the new UNRESOLVED persisted children." }
			), ():void => {} );

			it( hasSignature(
				[ "T extends object" ],
				"Persists multiple objects as children of the current document and retrieves the updated data from the server.", [
					{ name: "children", type: "T[]", description: "An array with the objects to be persisted as the new children." },
					{ name: "slugs", type: "string[]", description: "Array with the slugs that corresponds to each object in `object` parameter, in the order in which they were defined. If an element in the array is undefined or null, the slug will be generated by the platform." },
					{ name: "requestOptions", type: "CarbonLDP.HTTP.RequestOptions", optional: true, description: "Customizable options for every the request." },
				],
				{ type: "Promise<(T & CarbonLDP.ProtectedDocument)[]>", description: "Promise that contains the new UNRESOLVED persisted children." }
			), ():void => {} );

			it( hasSignature(
				[ "T extends object" ],
				"Persists the object as a child of the uri specified and retrieves the updates data from the server.", [
					{ name: "uri", type: "string", description: "URI of the document where to create the child." },
					{ name: "child", type: "T", description: "The object from where to create the child." },
					{ name: "requestOptions", type: "CarbonLDP.HTTP.RequestOptions", optional: true, description: "Customizable options for the request." },
				],
				{ type: "Promise<T & CarbonLDP.ProtectedDocument>" }
			), ():void => {} );

			it( hasSignature(
				[ "T extends object" ],
				"Persists the object with the slug specified as a child of the uri specified and retrieves the updates data from the server.", [
					{ name: "uri", type: "string", description: "URI of the document where to create the child." },
					{ name: "child", type: "T", description: "The object from where to create the child." },
					{ name: "slug", type: "string", description: "The slug that will be used in the child URI." },
					{ name: "requestOptions", type: "CarbonLDP.HTTP.RequestOptions", optional: true, description: "Customizable options for the request." },
				],
				{ type: "Promise<T & CarbonLDP.ProtectedDocument>" }
			), ():void => {} );

			it( hasSignature(
				[ "T extends object" ],
				"Persists multiple objects as children of the uri specified and retrieves the updates data from the server.", [
					{ name: "uri", type: "string", description: "URI of the document where to create the child." },
					{ name: "children", type: "T[]", description: "An array with the objects to be persisted as the new children." },
					{ name: "requestOptions", type: "CarbonLDP.HTTP.RequestOptions", optional: true, description: "Customizable options for every the request." },
				],
				{ type: "Promise<(T & CarbonLDP.ProtectedDocument)[]>", description: "Promise that contains the new UNRESOLVED persisted children." }
			), ():void => {} );

			it( hasSignature(
				[ "T extends object" ],
				"Persists multiple objects as children of the uri specified and retrieves the updates data from the server.", [
					{ name: "uri", type: "string", description: "URI of the document where to create the child." },
					{ name: "children", type: "T[]", description: "An array with the objects to be persisted as the new children." },
					{ name: "slugs", type: "string[]", description: "Array with the slugs that corresponds to each object in `object` parameter, in the order in which they were defined. If an element in the array is undefined or null, the slug will be generated by the platform." },
					{ name: "requestOptions", type: "CarbonLDP.HTTP.RequestOptions", optional: true, description: "Customizable options for every the request." },
				],
				{ type: "Promise<(T & CarbonLDP.ProtectedDocument)[]>", description: "Promise that contains the new UNRESOLVED persisted children." }
			), ():void => {} );

			it( "should exists", ():void => {
				const resource:CRUDDocument = createMock();

				expect( resource.createAndRetrieve ).toBeDefined();
				expect( resource.createAndRetrieve ).toEqual( jasmine.any( Function ) );
			} );


			function generateResponseOptions( url:string, options:{ index:number, status?:number, headers?:{ [ key:string ]:string }, frees?:object[], resource?:object, fragments?:object[] } ):JasmineAjaxRequestStubReturnOptions {
				const status:number = options.status !== void 0 ?
					options.status : 200;

				// noinspection JSMismatchedCollectionQueryUpdate
				const headers:{ [ key:string ]:string } = options.headers ?
					options.headers : {};


				const frees:object[] = options.frees ?
					options.frees : [];

				const resource:object = options.resource ?
					options.resource : {};
				const fragments:object[] = options.fragments ?
					options.fragments : [];

				return {
					status: status,
					responseHeaders: {
						"preference-applied": "return=representation",
						"eTag": `"${ options.index }-12345"`,
						"location": `${ url }child-${ options.index }/`,
						...headers,
					},
					responseText: JSON.stringify( [
						...frees,
						{
							"@id": `${ url }child-${ options.index }/`,
							"@graph": [
								{
									"@id": `${ url }child-${ options.index }/`,
									...resource,
								},
								...fragments,
							],
						},
					] ),
				};
			}

			function stubRequest( url:string, options:{ status?:number, headers?:{ [ key:string ]:string }, frees?:object[], resource?:object, fragments?:object[] } = {} ):void {
				const responseOptions:typeof options & { index:number } = Object
					.assign( { index: 1, status: 200 }, options );

				jasmine.Ajax
					.stubRequest( url, null, "POST" )
					.andReturn( generateResponseOptions( url, responseOptions ) );
			}


			it( "should throw error when _registry undefined", async () => {
				try {
					const resource:CRUDDocument = createMock( { _registry: void 0 } );
					await resource.createAndRetrieve( {} );
				} catch( e ) {
					expect( () => { throw e; } )
						.toThrowError( IllegalActionError, `"https://example.com/" doesn't support CRUD requests.` );
				}
			} );

			it( "should parse error response", async () => {
				const resource:CRUDDocument = createMock( { id: "https://example.com/500/" } );

				const spy:jasmine.Spy = spyOn( resource._registry, "_parseErrorResponse" )
					.and.callFake( () => Promise.reject( null ) );

				try {
					await resource.createAndRetrieve( {} );
					fail( "Should not create" );
				} catch( error ) {
					if( error ) fail( error );

					expect( spy ).toHaveBeenCalled();
				}
			} );


			it( "should request from self when no URI", async () => {
				stubRequest( "https://example.com/" );

				const resource:CRUDDocument = createMock();
				await resource.createAndRetrieve( {} );

				const request:JasmineAjaxRequest = jasmine.Ajax.requests.mostRecent();
				expect( request.url ).toBe( "https://example.com/" );
			} );

			it( "should request from URI", async () => {
				stubRequest( "https://example.com/resource/" );

				const resource:CRUDDocument = createMock();
				await resource.createAndRetrieve( "https://example.com/resource/", {} );

				const request:JasmineAjaxRequest = jasmine.Ajax.requests.mostRecent();
				expect( request.url ).toBe( "https://example.com/resource/" );
			} );

			it( "should request from relative URI", async () => {
				stubRequest( "https://example.com/relative/" );

				const resource:CRUDDocument = createMock();
				await resource.createAndRetrieve( "relative/", {} );

				const request:JasmineAjaxRequest = jasmine.Ajax.requests.mostRecent();
				expect( request.url ).toBe( "https://example.com/relative/" );
			} );

			it( "should request from resolved prefixed name", async () => {
				stubRequest( "https://example.com/resource/" );

				const _context:CarbonLDP = new CarbonLDP( "https://example.com/" );
				_context.extendObjectSchema( { "ex": "https://example.com/" } );

				const resource:CRUDDocument = createMock( { _context } );
				await resource.createAndRetrieve( "ex:resource/", {} );

				const request:JasmineAjaxRequest = jasmine.Ajax.requests.mostRecent();
				expect( request.url ).toBe( "https://example.com/resource/" );
			} );

			it( "should throw error when from URI outside context scope", async () => {
				const resource:CRUDDocument = createMock();

				await resource
					.createAndRetrieve( "https://example.org/resource/", {} )
					.catch( error => {
						expect( () => { throw error; } )
							.toThrowError( IllegalArgumentError, `"https://example.org/resource/" is out of scope.` );
					} )
				;
			} );

			it( "should throw error when from URI is BNode label", async () => {
				const resource:CRUDDocument = createMock();

				await resource
					.createAndRetrieve( "_:1", {} )
					.catch( error => {
						expect( () => { throw error; } )
							.toThrowError( IllegalArgumentError, `"_:1" (Blank Node) can't be fetched directly.` );
					} )
				;
			} );

			it( "should throw error when from URI is Named Fragment label", async () => {
				const resource:CRUDDocument = createMock();

				await resource
					.createAndRetrieve( "#fragment", {} )
					.catch( error => {
						expect( () => { throw error; } )
							.toThrowError( IllegalArgumentError, `"https://example.com/#fragment" (Named Fragment) can't be fetched directly.` );
					} )
				;
			} );

			it( "should throw error when unresolved prefixed name", async () => {
				const resource:CRUDDocument = createMock();

				await resource
					.createAndRetrieve( "ex:resource/", {} )
					.catch( error => {
						expect( () => { throw error; } )
							.toThrowError( IllegalArgumentError, `"ex:resource/" is out of scope.` );
					} )
				;
			} );


			it( "should send basic request headers in single self child", async () => {
				stubRequest( "https://example.com/" );

				const resource:CRUDDocument = createMock();
				await resource.createAndRetrieve( {} );

				const request:JasmineAjaxRequest = jasmine.Ajax.requests.mostRecent();
				expect( request.requestHeaders ).toEqual( {
					"accept": "application/ld+json",
					"content-type": "application/ld+json",
					"prefer": [
						"return=representation",
						`${ LDP.Container }; rel=interaction-model`,
					].join( ", " ),
				} );
			} );

			it( "should send basic request headers in single URI child", async () => {
				stubRequest( "https://example.com/resource/" );

				const resource:CRUDDocument = createMock();
				await resource.createAndRetrieve( "resource/", {} );

				const request:JasmineAjaxRequest = jasmine.Ajax.requests.mostRecent();
				expect( request.requestHeaders ).toEqual( {
					"accept": "application/ld+json",
					"content-type": "application/ld+json",
					"prefer": [
						"return=representation",
						`${ LDP.Container }; rel=interaction-model`,
					].join( ", " ),
				} );
			} );

			it( "should send basic request headers in multiple self children", async () => {
				const resource:CRUDDocument = createMock();

				// noinspection JSIgnoredPromiseFromCall
				resource.createAndRetrieve( [ {}, {} ] );

				const request1:JasmineAjaxRequest = jasmine.Ajax.requests.at( 0 );
				expect( request1.requestHeaders ).toEqual( {
					"accept": "application/ld+json",
					"content-type": "application/ld+json",
					"prefer": [
						"return=representation",
						`${ LDP.Container }; rel=interaction-model`,
					].join( ", " ),
				} );

				const request2:JasmineAjaxRequest = jasmine.Ajax.requests.at( 1 );
				expect( request2.requestHeaders ).toEqual( {
					"accept": "application/ld+json",
					"content-type": "application/ld+json",
					"prefer": [
						"return=representation",
						`${ LDP.Container }; rel=interaction-model`,
					].join( ", " ),
				} );
			} );

			it( "should send basic request headers in multiple URI child", async () => {
				const resource:CRUDDocument = createMock();

				// noinspection JSIgnoredPromiseFromCall
				resource.createAndRetrieve( "resource/", [ {}, {} ] );


				const request1:JasmineAjaxRequest = jasmine.Ajax.requests.at( 0 );
				expect( request1.requestHeaders ).toEqual( {
					"accept": "application/ld+json",
					"content-type": "application/ld+json",
					"prefer": [
						"return=representation",
						`${ LDP.Container }; rel=interaction-model`,
					].join( ", " ),
				} );

				const request2:JasmineAjaxRequest = jasmine.Ajax.requests.at( 1 );
				expect( request2.requestHeaders ).toEqual( {
					"accept": "application/ld+json",
					"content-type": "application/ld+json",
					"prefer": [
						"return=representation",
						`${ LDP.Container }; rel=interaction-model`,
					].join( ", " ),
				} );
			} );

			it( "should add authentication header", async () => {
				stubRequest( "https://example.com/" );

				const resource:CRUDDocument = createMock();

				const spy:jasmine.Spy = spyOn( resource._context.auth, "addAuthentication" );

				await resource.createAndRetrieve( {} );

				expect( spy ).toHaveBeenCalled();
			} );

			it( "should add custom headers in single self child", async () => {
				stubRequest( "https://example.com/" );

				const resource:CRUDDocument = createMock();

				await resource.createAndRetrieve( {}, {
					headers: new Map()
						.set( "custom", new Header( "custom value" ) )
					,
				} );

				const request:JasmineAjaxRequest = jasmine.Ajax.requests.mostRecent();
				expect( request.requestHeaders ).toEqual( jasmine.objectContaining( {
					"custom": "custom value",
				} ) );
			} );

			it( "should add custom headers in single URI child", async () => {
				stubRequest( "https://example.com/resource/" );

				const resource:CRUDDocument = createMock();

				await resource.createAndRetrieve( "resource/", {}, {
					headers: new Map()
						.set( "custom", new Header( "custom value" ) )
					,
				} );

				const request:JasmineAjaxRequest = jasmine.Ajax.requests.mostRecent();
				expect( request.requestHeaders ).toEqual( jasmine.objectContaining( {
					"custom": "custom value",
				} ) );
			} );

			it( "should send basic request headers in multiple self children", async () => {
				const resource:CRUDDocument = createMock();

				// noinspection JSIgnoredPromiseFromCall
				resource.createAndRetrieve( [ {}, {} ], {
					headers: new Map()
						.set( "custom", new Header( "custom value" ) )
					,
				} );

				const request1:JasmineAjaxRequest = jasmine.Ajax.requests.at( 0 );
				expect( request1.requestHeaders ).toEqual( jasmine.objectContaining( {
					"custom": "custom value",
				} ) );

				const request2:JasmineAjaxRequest = jasmine.Ajax.requests.at( 1 );
				expect( request2.requestHeaders ).toEqual( jasmine.objectContaining( {
					"custom": "custom value",
				} ) );
			} );

			it( "should send basic request headers in multiple URI children", async () => {
				const resource:CRUDDocument = createMock();

				// noinspection JSIgnoredPromiseFromCall
				resource.createAndRetrieve( "resource/", [ {}, {} ], {
					headers: new Map()
						.set( "custom", new Header( "custom value" ) )
					,
				} );

				const request1:JasmineAjaxRequest = jasmine.Ajax.requests.at( 0 );
				expect( request1.requestHeaders ).toEqual( jasmine.objectContaining( {
					"custom": "custom value",
				} ) );

				const request2:JasmineAjaxRequest = jasmine.Ajax.requests.at( 1 );
				expect( request2.requestHeaders ).toEqual( jasmine.objectContaining( {
					"custom": "custom value",
				} ) );
			} );

			it( "should add slug header when single self child", async () => {
				stubRequest( "https://example.com/" );

				const resource:CRUDDocument = createMock();

				await resource.createAndRetrieve( {}, "child-slug" );

				const request:JasmineAjaxRequest = jasmine.Ajax.requests.mostRecent();
				expect( request.requestHeaders ).toEqual( jasmine.objectContaining( {
					"slug": "child-slug",
				} ) );
			} );

			it( "should add slug header when single URI child", async () => {
				stubRequest( "https://example.com/resource/" );

				const resource:CRUDDocument = createMock();

				await resource.createAndRetrieve( "resource/", {}, "child-slug" );

				const request:JasmineAjaxRequest = jasmine.Ajax.requests.mostRecent();
				expect( request.requestHeaders ).toEqual( jasmine.objectContaining( {
					"slug": "child-slug",
				} ) );
			} );

			it( "should add slug header when multiple self child", async () => {
				const resource:CRUDDocument = createMock();

				// noinspection JSIgnoredPromiseFromCall
				resource.createAndRetrieve( [ {}, {} ], [ "child-slug-1", "child-slug-2" ] );

				const request1:JasmineAjaxRequest = jasmine.Ajax.requests.at( 0 );
				expect( request1.requestHeaders ).toEqual( jasmine.objectContaining( {
					"slug": "child-slug-1",
				} ) );

				const request2:JasmineAjaxRequest = jasmine.Ajax.requests.at( 1 );
				expect( request2.requestHeaders ).toEqual( jasmine.objectContaining( {
					"slug": "child-slug-2",
				} ) );
			} );

			it( "should add slug header when multiple URI child", async () => {
				const resource:CRUDDocument = createMock();

				// noinspection JSIgnoredPromiseFromCall
				resource.createAndRetrieve( "resource/", [ {}, {} ], [ "child-slug-1", "child-slug-2" ] );

				const request1:JasmineAjaxRequest = jasmine.Ajax.requests.at( 0 );
				expect( request1.requestHeaders ).toEqual( jasmine.objectContaining( {
					"slug": "child-slug-1",
				} ) );

				const request2:JasmineAjaxRequest = jasmine.Ajax.requests.at( 1 );
				expect( request2.requestHeaders ).toEqual( jasmine.objectContaining( {
					"slug": "child-slug-2",
				} ) );
			} );

			it( "should add slug header if defined when multiple child", async () => {
				const resource:CRUDDocument = createMock();

				// noinspection JSIgnoredPromiseFromCall
				resource.createAndRetrieve( [ {}, {}, {} ], [ null, undefined, "child-slug" ] );

				const request1:JasmineAjaxRequest = jasmine.Ajax.requests.at( 0 );
				expect( request1.requestHeaders ).not.toEqual( jasmine.objectContaining( {
					"slug": jasmine.anything() as any,
				} ) );

				const request2:JasmineAjaxRequest = jasmine.Ajax.requests.at( 1 );
				expect( request2.requestHeaders ).not.toEqual( jasmine.objectContaining( {
					"slug": jasmine.anything() as any,
				} ) );

				const request3:JasmineAjaxRequest = jasmine.Ajax.requests.at( 2 );
				expect( request3.requestHeaders ).toEqual( jasmine.objectContaining( {
					"slug": "child-slug",
				} ) );
			} );

			it( "should not add slug header when multiple but less slugs than children", async () => {
				const resource:CRUDDocument = createMock();

				// noinspection JSIgnoredPromiseFromCall
				resource.createAndRetrieve( [ {}, {} ], [ "child-slug" ] );

				const request1:JasmineAjaxRequest = jasmine.Ajax.requests.at( 0 );
				expect( request1.requestHeaders ).toEqual( jasmine.objectContaining( {
					"slug": "child-slug",
				} ) );

				const request2:JasmineAjaxRequest = jasmine.Ajax.requests.at( 1 );
				expect( request2.requestHeaders ).not.toEqual( jasmine.objectContaining( {
					"slug": jasmine.anything() as any,
				} ) );
			} );


			it( "should send converted JSONLD when from self child", async () => {
				stubRequest( "https://example.com/" );

				const resource:CRUDDocument = createMock();
				resource._context
					.extendObjectSchema( {
						"@vocab": "https://example.com/ns#",
					} )
				;

				await resource.createAndRetrieve( {
					string: "my object",
					pointerSet: [
						{ id: "_:1", string: "blank node" },
						{ slug: "fragment", string: "named fragment" },
					],
				} );

				const request:JasmineAjaxRequest = jasmine.Ajax.requests.mostRecent();
				expect( request.params ).toBe( JSON.stringify( {
					"@id": "",
					"@graph": [ {
						"@id": "",
						"https://example.com/ns#string": [ {
							"@value": "my object",
							"@type": XSD.string,
						} ],
						"https://example.com/ns#pointerSet": [ {
							"@id": "_:1",
						}, {
							"@id": "#fragment",
						} ],
					}, {
						"@id": "_:1",
						"https://example.com/ns#string": [ {
							"@value": "blank node",
							"@type": XSD.string,
						} ],
					}, {
						"@id": "#fragment",
						"https://example.com/ns#string": [ {
							"@value": "named fragment",
							"@type": XSD.string,
						} ],
					} ],
				} ) );
			} );

			it( "should send converted JSONLD when from URI child", async () => {
				stubRequest( "https://example.com/resource/" );

				const resource:CRUDDocument = createMock();
				resource._context
					.extendObjectSchema( {
						"@vocab": "https://example.com/ns#",
					} )
				;

				await resource.createAndRetrieve( "resource/", {
					string: "my object",
					pointerSet: [
						{ id: "_:1", string: "blank node" },
						{ slug: "fragment", string: "named fragment" },
					],
				} );

				const request:JasmineAjaxRequest = jasmine.Ajax.requests.mostRecent();
				expect( request.params ).toBe( JSON.stringify( {
					"@id": "",
					"@graph": [ {
						"@id": "",
						"https://example.com/ns#string": [ {
							"@value": "my object",
							"@type": XSD.string,
						} ],
						"https://example.com/ns#pointerSet": [ {
							"@id": "_:1",
						}, {
							"@id": "#fragment",
						} ],
					}, {
						"@id": "_:1",
						"https://example.com/ns#string": [ {
							"@value": "blank node",
							"@type": XSD.string,
						} ],
					}, {
						"@id": "#fragment",
						"https://example.com/ns#string": [ {
							"@value": "named fragment",
							"@type": XSD.string,
						} ],
					} ],
				} ) );
			} );

			it( "should send converted JSONLD when multiple self children", async () => {
				const resource:CRUDDocument = createMock();
				resource._context
					.extendObjectSchema( {
						"@vocab": "https://example.com/ns#",
					} )
				;

				// noinspection JSIgnoredPromiseFromCall
				resource.createAndRetrieve( [ {
					string: "my object 1",
				}, {
					string: "my object 2",
				} ] );

				const request1:JasmineAjaxRequest = jasmine.Ajax.requests.at( 0 );
				expect( request1.params ).toBe( JSON.stringify( {
					"@id": "",
					"@graph": [ {
						"@id": "",
						"https://example.com/ns#string": [ {
							"@value": "my object 1",
							"@type": XSD.string,
						} ],
					} ],
				} ) );

				const request2:JasmineAjaxRequest = jasmine.Ajax.requests.at( 1 );
				expect( request2.params ).toBe( JSON.stringify( {
					"@id": "",
					"@graph": [ {
						"@id": "",
						"https://example.com/ns#string": [ {
							"@value": "my object 2",
							"@type": XSD.string,
						} ],
					} ],
				} ) );
			} );

			it( "should send converted JSONLD when multiple URI children", async () => {
				const resource:CRUDDocument = createMock();
				resource._context
					.extendObjectSchema( {
						"@vocab": "https://example.com/ns#",
					} )
				;

				// noinspection JSIgnoredPromiseFromCall
				resource.createAndRetrieve( "resource/", [ {
					string: "my object 1",
				}, {
					string: "my object 2",
				} ] );

				const request1:JasmineAjaxRequest = jasmine.Ajax.requests.at( 0 );
				expect( request1.params ).toBe( JSON.stringify( {
					"@id": "",
					"@graph": [ {
						"@id": "",
						"https://example.com/ns#string": [ {
							"@value": "my object 1",
							"@type": XSD.string,
						} ],
					} ],
				} ) );

				const request2:JasmineAjaxRequest = jasmine.Ajax.requests.at( 1 );
				expect( request2.params ).toBe( JSON.stringify( {
					"@id": "",
					"@graph": [ {
						"@id": "",
						"https://example.com/ns#string": [ {
							"@value": "my object 2",
							"@type": XSD.string,
						} ],
					} ],
				} ) );
			} );

			it( "should return same child object reference", async () => {
				stubRequest( "https://example.com/" );

				const resource:CRUDDocument = createMock();
				const child:object = {};

				const returned:CRUDDocument = await resource.createAndRetrieve( child );

				expect( child ).toBe( returned );
			} );

			it( "should return same children object references", async () => {
				const resource:CRUDDocument = createMock();
				const child1:object = {};
				const child2:object = {};

				const promise:Promise<CRUDDocument[]> = resource.createAndRetrieve( [ child1, child2 ] );

				jasmine.Ajax
					.requests
					.filter( "https://example.com/" )
					.forEach( ( request, index ) => {
						request.respondWith( generateResponseOptions( "https://example.com/", { index } ) );
					} )
				;

				const [ returned1, returned2 ]:CRUDDocument[] = await promise;
				expect( child1 ).toBe( returned1 );
				expect( child2 ).toBe( returned2 );
			} );

			it( "should have stored the child in the registry", async () => {
				stubRequest( "https://example.com/" );

				const resource:CRUDDocument = createMock();
				const returned:CRUDDocument = await resource.createAndRetrieve( {} );

				expect( resource._registry.hasPointer( returned.id ) ).toBe( true );
				expect( resource._registry.getPointer( returned.id ) ).toBe( returned );
			} );

			it( "should have stored the children in the registry", async () => {
				const resource:CRUDDocument = createMock();

				const promises:Promise<CRUDDocument[]> = resource.createAndRetrieve( [ {}, {} ] );

				jasmine.Ajax
					.requests
					.filter( "https://example.com/" )
					.forEach( ( request, index ) => {
						request.respondWith( generateResponseOptions( "https://example.com/", { index } ) );
					} )
				;

				const [ returned1, returned2 ]:CRUDDocument[] = await promises;

				expect( resource._registry.hasPointer( returned1.id ) ).toBe( true );
				expect( resource._registry.getPointer( returned1.id ) ).toBe( returned1 );

				expect( resource._registry.hasPointer( returned2.id ) ).toBe( true );
				expect( resource._registry.getPointer( returned2.id ) ).toBe( returned2 );
			} );

			it( "should throw error if child is already persisted", async () => {
				const child:CRUDDocument = createMock( { id: "" } );
				const resource:CRUDDocument = createMock();

				try {
					await resource.createAndRetrieve( child );
					fail( "Should not resolve" );
				} catch( error ) {
					expect( () => { throw error; } )
						.toThrowError( IllegalArgumentError, "The child provided has already been persisted." );
				}
			} );

			it( "should throw error if any children is already persisted", async () => {
				const child:CRUDDocument = createMock( { id: "" } );
				const resource:CRUDDocument = createMock();

				try {
					await resource.createAndRetrieve( [ {}, child, {} ] );
					fail( "Should not resolve" );
				} catch( error ) {
					expect( () => { throw error; } )
						.toThrowError( IllegalArgumentError, "The child provided has already been persisted." );
				}
			} );

			it( "should throw error if child already being persisted", async () => {
				const child:object = {};
				const resource:CRUDDocument = createMock();

				try {
					await Promise.all( [
						resource.createAndRetrieve( child ),
						resource.createAndRetrieve( child ),
					] );
					fail( "Should not resolve" );
				} catch( error ) {
					expect( () => { throw error; } )
						.toThrowError( IllegalArgumentError, "The document is already being persisted." );
				}
			} );

			it( "should be able to resend child after a failed request", async () => {
				const resource:CRUDDocument = createMock();

				const child:object = {};
				try {
					stubRequest( "https://example.com/", { status: 500 } );
					await resource.createAndRetrieve( child );

				} catch( error ) {
					stubRequest( "https://example.com/" );
					await resource.createAndRetrieve( child );

					expect().nothing();
				}
			} );


			it( "should add resolved PersistedDocument data to the child", async () => {
				stubRequest( "https://example.com/" );

				const resource:CRUDDocument = createMock();
				const returned:CRUDDocument = await resource.create( {} );

				expect( returned ).toEqual( jasmine.objectContaining( {
					_resolved: true,
					_eTag: "\"1-12345\"",
					id: "https://example.com/child-1/",
				} ) );
			} );

			it( "should add resolved PersistedDocument data to the children", async () => {
				const resource:CRUDDocument = createMock();
				const promise:Promise<CRUDDocument[]> = resource.create( [ {}, {} ] );

				jasmine.Ajax
					.requests
					.filter( "https://example.com/" )
					.forEach( ( request, index ) => {
						request.respondWith( generateResponseOptions( "https://example.com/", { index } ) );
					} )
				;

				const [ returned1, returned2 ]:CRUDDocument[] = await promise;
				expect( returned1 ).toEqual( jasmine.objectContaining( {
					_resolved: true,
					_eTag: "\"0-12345\"",
					id: "https://example.com/child-0/",
				} ) );
				expect( returned2 ).toEqual( jasmine.objectContaining( {
					_resolved: true,
					_eTag: "\"1-12345\"",
					id: "https://example.com/child-1/",
				} ) );
			} );

			it( "should update the child data", async () => {
				const resource:CRUDDocument = createMock();
				resource._context
					.extendObjectSchema( { "@vocab": "https://example.com/ns#" } );

				type MyResource = { string:string, pointerSet?:MyResource[] };
				const promise:Promise<CRUDDocument & MyResource> = resource.createAndRetrieve( {
					string: "document",
					pointerSet: [
						{
							id: "_:1",
							string: "blank node",
							pointerSet: [],
						},
						{
							slug: "fragment",
							string: "named fragment",
						},
						{
							id: "_:2",
							string: "to be removed",
						},
					],
				} );


				jasmine.Ajax
					.requests
					.filter( "https://example.com/" )
					.forEach( ( request, index ) => {
						request.respondWith( generateResponseOptions( "https://example.com/", {
							index,
							resource: {
								"https://example.com/ns#string": "updated document",
								"https://example.com/ns#pointerSet": [
									{ "@id": "_:1" },
									{ "@id": "#fragment" },
								],
							},
							fragments: [ {
								"@id": "_:1",
								"https://example.com/ns#string": "updated blank node",
								"https://example.com/ns#pointerSet": [
									{ "@id": "#2" },
								],
							}, {
								"@id": "#fragment",
								"https://example.com/ns#string": "updated named fragment",
							}, {
								"@id": "#2",
								"https://example.com/ns#string": "new named fragment",
							} ],
						} ) );
					} )
				;


				const returned:CRUDDocument & MyResource = await promise;
				expect( returned as MyResource ).toEqual( {
					string: "updated document",
					pointerSet: [
						{
							string: "updated blank node",
							pointerSet: [
								{
									string: "new named fragment",
								},
							],
						},
						{
							string: "updated named fragment",
						},
					],
				} );
				expect( returned.hasPointer( "_:2" ) ).toBe( false );
			} );

			it( "should update the children data", async () => {
				const resource:CRUDDocument = createMock();
				resource._context
					.extendObjectSchema( { "@vocab": "https://example.com/ns#" } );

				type MyResource = { string:string, pointerSet?:MyResource[] };
				const promise:Promise<MyResource[]> = resource.createAndRetrieve( [
					{
						string: "document 1",
						pointerSet: [
							{
								id: "_:1.1",
								string: "fragment 1.1",
							},
						],
					},
					{
						string: "document 2",
						pointerSet: [
							{
								id: "_:2.1",
								string: "fragment 2.1",
								pointerSet: [ {
									id: "#2.1.1",
									string: "fragment 2.1.1",
								} ],
							},
						],
					},
				] );


				const [ request1, request2 ] = jasmine.Ajax
					.requests
					.filter( "https://example.com/" )
				;
				request1.respondWith( generateResponseOptions( "https://example.com/", {
					index: 1,
					resource: {
						"https://example.com/ns#string": "updated document 1",
						"https://example.com/ns#pointerSet": [
							{ "@id": "_:1.1" },
						],
					},
					fragments: [ {
						"@id": "_:1.1",
						"https://example.com/ns#string": "updated fragment 1.1",
					} ],
				} ) );
				request2.respondWith( generateResponseOptions( "https://example.com/", {
					index: 2,
					resource: {
						"https://example.com/ns#string": "updated document 2",
						"https://example.com/ns#pointerSet": [
							{ "@id": "_:2.1" },
						],
					},
					fragments: [ {
						"@id": "_:2.1",
						"https://example.com/ns#string": "updated fragment 2.1",
						"https://example.com/ns#pointerSet": [
							{ "@id": "https://example.com/child-2/#2.1.1" },
						],
					}, {
						"@id": "https://example.com/child-2/#2.1.1",
						"https://example.com/ns#string": "updated fragment 2.1.1",
					} ],
				} ) );


				const [ returned1, returned2 ]:MyResource[] = await promise;
				expect( returned1 ).toEqual( {
					string: "updated document 1",
					pointerSet: [
						{
							string: "updated fragment 1.1",
						},
					],
				} );
				expect( returned2 ).toEqual( {
					string: "updated document 2",
					pointerSet: [
						{
							string: "updated fragment 2.1",
							pointerSet: [
								{
									string: "updated fragment 2.1.1",
								},
							],
						},
					],
				} );
			} );

			it( "should update blank nodes when response metadata returned", async () => {
				stubRequest( "https://example.com/", {
					resource: {
						"https://example.com/ns#blankNode1": [ { "@id": "_:new-1" } ],
						"https://example.com/ns#blankNode2": [ { "@id": "_:new-2" } ],
					},
					fragments: [
						{
							"@id": "_:new-1",
							"https://example.com/ns#string": [ { "@value": "updated blank node 1" } ],
						},
						{
							"@id": "_:new-2",
							"https://example.com/ns#string": [ { "@value": "updated blank node 2" } ],
						},
					],
					frees: [
						{
							"@id": "_:responseMetadata",
							"@type": [ C.VolatileResource, C.ResponseMetadata ],
							[ C.documentMetadata ]: [ {
								"@id": "_:documentMetadata",
							} ],
						},
						{
							"@id": "_:documentMetadata",
							"@type": [ C.VolatileResource, C.DocumentMetadata ],
							[ C.relatedDocument ]: [ {
								"@id": "https://example.com/child-1/",
							} ],
							[ C.bNodesMap ]: [ {
								"@id": "_:map",
							} ],
						},
						{
							"@id": "_:map",
							"@type": [ C.Map ],
							[ C.entry ]: [
								{ "@id": "_:entry-1" },
								{ "@id": "_:entry-2" },
							],
						},
						{
							"@id": "_:entry-1",
							[ C.entryKey ]: [ {
								"@id": "_:1",
							} ],
							[ C.entryValue ]: [ {
								"@id": "_:new-1",
							} ],
						},
						{
							"@id": "_:entry-2",
							[ C.entryKey ]: [ {
								"@id": "_:2",
							} ],
							[ C.entryValue ]: [ {
								"@id": "_:new-2",
							} ],
						},
					],
				} );

				const resource:CRUDDocument = createMock();
				resource._context
					.extendObjectSchema( { "@vocab": "https://example.com/ns#" } );


				type BNode = { id:string, string:string };
				type MyDoc = { blankNode1:BNode, blankNode2:BNode };
				const returned:CRUDDocument & MyDoc = await resource.createAndRetrieve<MyDoc>( {
					blankNode1: {
						id: "_:1",
						string: "blank node 1",
					},
					blankNode2: {
						id: "_:2",
						string: "blank node 2",
					},
				} );

				expect( returned.hasPointer( "_:1" ) ).toBe( false );
				expect( returned.blankNode1 ).toEqual( jasmine.objectContaining( {
					id: "_:new-1",
					string: "updated blank node 1",
				} ) );

				expect( returned.hasPointer( "_:2" ) ).toBe( false );
				expect( returned.blankNode2 ).toEqual( jasmine.objectContaining( {
					id: "_:new-2",
					string: "updated blank node 2",
				} ) );
			} );

		} );


		describe( method( OBLIGATORY, "createAccessPoint" ), () => {

			it( hasSignature(
				[ "T extends object" ],
				"Persists the access point as a child of the current document.", [
					{ name: "accessPoint", type: "T & CarbonLDP.BaseAccessPoint", description: "object with the access point properties to persist." },
					{ name: "requestOptions", type: "CarbonLDP.HTTP.RequestOptions", optional: true, description: "Customizable options for the request." },
				],
				{ type: "Promise<T & CarbonLDP.ProtectedDocument>" }
			), ():void => {} );

			it( hasSignature(
				[ "T extends object" ],
				"Persists the access point with the slug specified as a child of the current document.", [
					{ name: "accessPoint", type: "T & CarbonLDP.BaseAccessPoint", description: "object with the access point properties to persist." },
					{ name: "slug", type: "string", description: "The slug that will be used in the child URI." },
					{ name: "requestOptions", type: "CarbonLDP.HTTP.RequestOptions", optional: true, description: "Customizable options for the request." },
				],
				{ type: "Promise<T & CarbonLDP.ProtectedDocument>" }
			), ():void => {} );

			it( hasSignature(
				[ "T extends object" ],
				"Persists the access point as a child of the uri specified.", [
					{ name: "uri", type: "string", description: "URI of the document where to create the child." },
					{ name: "accessPoint", type: "T & CarbonLDP.BaseAccessPoint", description: "object with the access point properties to persist." },
					{ name: "requestOptions", type: "CarbonLDP.HTTP.RequestOptions", optional: true, description: "Customizable options for the request." },
				],
				{ type: "Promise<T & CarbonLDP.ProtectedDocument>" }
			), ():void => {} );

			it( hasSignature(
				[ "T extends object" ],
				"Persists the access point with the slug specified as a child of the uri specified.", [
					{ name: "uri", type: "string", description: "URI of the document where to create the child." },
					{ name: "accessPoint", type: "T & CarbonLDP.BaseAccessPoint", description: "object with the access point properties to persist." },
					{ name: "slug", type: "string", description: "The slug that will be used in the child URI." },
					{ name: "requestOptions", type: "CarbonLDP.HTTP.RequestOptions", optional: true, description: "Customizable options for the request." },
				],
				{ type: "Promise<T & CarbonLDP.ProtectedDocument>" }
			), ():void => {} );

			it( "should exists", ():void => {
				const resource:CRUDDocument = createMock();

				expect( resource.createAccessPoint ).toBeDefined();
				expect( resource.createAccessPoint ).toEqual( jasmine.any( Function ) );
			} );


			function stubRequest( url:string, options:{ status?:number, headers?:{ [ key:string ]:string }, frees?:object[], } = {} ):void {
				const status:number = options.status !== void 0 ?
					options.status :
					options.frees && options.frees.length ?
						200 :
						204
				;

				// noinspection JSMismatchedCollectionQueryUpdate
				const headers:{ [ key:string ]:string } = options.headers ?
					options.headers : {};


				const data:string | undefined = options.frees ?
					JSON.stringify( [
						...options.frees,
					] ) :
					void 0
				;

				let counter:number = 1;

				jasmine.Ajax
					.stubRequest( url, null, "POST" )
					.andReturn( {
						status,
						responseHeaders: {
							get location():string { return `${ url }access-point-${ counter ++ }/`; },
							...headers,
						},
						responseText: data,
					} );
			}


			it( "should throw error when _registry undefined", async () => {
				try {
					const resource:CRUDDocument = createMock( { _registry: void 0 } );
					await resource.createAccessPoint( { hasMemberRelation: "relation" } );
				} catch( e ) {
					expect( () => { throw e; } )
						.toThrowError( IllegalActionError, `"https://example.com/" doesn't support CRUD requests.` );
				}
			} );


			it( "should request from self when no URI", async () => {
				stubRequest( "https://example.com/" );

				const resource:CRUDDocument = createMock();
				await resource.createAccessPoint( { hasMemberRelation: "relation" } );

				const request:JasmineAjaxRequest = jasmine.Ajax.requests.mostRecent();
				expect( request.url ).toBe( "https://example.com/" );
			} );

			it( "should request from URI", async () => {
				stubRequest( "https://example.com/another-resource/" );

				const resource:CRUDDocument = createMock();
				await resource.createAccessPoint( "https://example.com/another-resource/", { hasMemberRelation: "relation" } );

				const request:JasmineAjaxRequest = jasmine.Ajax.requests.mostRecent();
				expect( request.url ).toBe( "https://example.com/another-resource/" );
			} );

			it( "should request from relative URI", async () => {
				stubRequest( "https://example.com/relative/" );

				const resource:CRUDDocument = createMock();
				await resource.createAccessPoint( "relative/", { hasMemberRelation: "relation" } );

				const request:JasmineAjaxRequest = jasmine.Ajax.requests.mostRecent();
				expect( request.url ).toBe( "https://example.com/relative/" );
			} );

			it( "should request from resolved prefixed name", async () => {
				stubRequest( "https://example.com/resource/" );

				const _context:CarbonLDP = new CarbonLDP( "https://example.com/" );
				_context.extendObjectSchema( { "ex": "https://example.com/" } );

				const resource:CRUDDocument = createMock( { _context } );
				await resource.createAccessPoint( "ex:resource/", { hasMemberRelation: "relation" } );

				const request:JasmineAjaxRequest = jasmine.Ajax.requests.mostRecent();
				expect( request.url ).toBe( "https://example.com/resource/" );
			} );

			it( "should throw error when from URI outside context scope", async () => {
				const resource:CRUDDocument = createMock();

				await resource
					.createAccessPoint( "https://example.org/resource/", { hasMemberRelation: "relation" } )
					.catch( error => {
						expect( () => { throw error; } )
							.toThrowError( IllegalArgumentError, `"https://example.org/resource/" is out of scope.` );
					} )
				;
			} );

			it( "should throw error when from URI is BNode label", async () => {
				const resource:CRUDDocument = createMock();

				await resource
					.createAccessPoint( "_:1", { hasMemberRelation: "relation" } )
					.catch( error => {
						expect( () => { throw error; } )
							.toThrowError( IllegalArgumentError, `"_:1" (Blank Node) can't be fetched directly.` );
					} )
				;
			} );

			it( "should throw error when from URI is Named Fragment label", async () => {
				const resource:CRUDDocument = createMock();

				await resource
					.createAccessPoint( "#fragment", { hasMemberRelation: "relation" } )
					.catch( error => {
						expect( () => { throw error; } )
							.toThrowError( IllegalArgumentError, `"https://example.com/#fragment" (Named Fragment) can't be fetched directly.` );
					} )
				;
			} );

			it( "should throw error when unresolved prefixed name", async () => {
				const resource:CRUDDocument = createMock();

				await resource
					.createAccessPoint( "ex:resource/", { hasMemberRelation: "relation" } )
					.catch( error => {
						expect( () => { throw error; } )
							.toThrowError( IllegalArgumentError, `"ex:resource/" is out of scope.` );
					} )
				;
			} );

			it( "should parse error response", async () => {
				stubRequest( "https://example.com/500/", { status: 500 } );
				const resource:CRUDDocument = createMock( { id: "https://example.com/500/" } );

				const spy:jasmine.Spy = spyOn( resource._registry, "_parseErrorResponse" )
					.and.callFake( () => Promise.reject( null ) );

				try {
					await resource.createAccessPoint( { hasMemberRelation: "relation" } );
					fail( "Should not createAccessPoint" );
				} catch( error ) {
					if( error ) fail( error );

					expect( spy ).toHaveBeenCalled();
				}
			} );


			it( "should send basic request headers when from self", async () => {
				stubRequest( "https://example.com/" );

				const resource:CRUDDocument = createMock();
				await resource.createAccessPoint( { hasMemberRelation: "relation" } );

				const request:JasmineAjaxRequest = jasmine.Ajax.requests.mostRecent();
				expect( request.requestHeaders ).toEqual( {
					"accept": "application/ld+json",
					"content-type": "application/ld+json",
					"prefer": [
						"return=minimal",
						`${ LDP.RDFSource }; rel=interaction-model`,
					].join( ", " ),
				} );
			} );

			it( "should send basic request headers when from URI", async () => {
				stubRequest( "https://example.com/resource/" );

				const resource:CRUDDocument = createMock();
				await resource.createAccessPoint( "resource/", { hasMemberRelation: "relation" } );

				const request:JasmineAjaxRequest = jasmine.Ajax.requests.mostRecent();
				expect( request.requestHeaders ).toEqual( {
					"accept": "application/ld+json",
					"content-type": "application/ld+json",
					"prefer": [
						"return=minimal",
						`${ LDP.RDFSource }; rel=interaction-model`,
					].join( ", " ),
				} );
			} );

			it( "should add authentication header", async () => {
				stubRequest( "https://example.com/" );

				const resource:CRUDDocument = createMock();

				const spy:jasmine.Spy = spyOn( resource._context.auth, "addAuthentication" );

				await resource.createAccessPoint( { hasMemberRelation: "relation" } );

				expect( spy ).toHaveBeenCalled();
			} );

			it( "should add custom headers when from self", async () => {
				stubRequest( "https://example.com/" );

				const resource:CRUDDocument = createMock();

				await resource.createAccessPoint( { hasMemberRelation: "relation" }, {
					headers: new Map()
						.set( "custom", new Header( "custom value" ) )
					,
				} );

				const request:JasmineAjaxRequest = jasmine.Ajax.requests.mostRecent();
				expect( request.requestHeaders ).toEqual( jasmine.objectContaining( {
					"custom": "custom value",
				} ) );
			} );

			it( "should add custom headers when from URI", async () => {
				stubRequest( "https://example.com/resource/" );

				const resource:CRUDDocument = createMock();

				await resource.createAccessPoint( "resource/", { hasMemberRelation: "relation" }, {
					headers: new Map()
						.set( "custom", new Header( "custom value" ) )
					,
				} );

				const request:JasmineAjaxRequest = jasmine.Ajax.requests.mostRecent();
				expect( request.requestHeaders ).toEqual( jasmine.objectContaining( {
					"custom": "custom value",
				} ) );
			} );

			it( "should add slug header when from self", async () => {
				stubRequest( "https://example.com/" );

				const resource:CRUDDocument = createMock();

				await resource.createAccessPoint( { hasMemberRelation: "relation" }, "child-slug" );

				const request:JasmineAjaxRequest = jasmine.Ajax.requests.mostRecent();
				expect( request.requestHeaders ).toEqual( jasmine.objectContaining( {
					"slug": "child-slug",
				} ) );
			} );

			it( "should add slug header when from URI", async () => {
				stubRequest( "https://example.com/resource/" );

				const resource:CRUDDocument = createMock();

				await resource.createAccessPoint( "resource/", { hasMemberRelation: "relation" }, "child-slug" );

				const request:JasmineAjaxRequest = jasmine.Ajax.requests.mostRecent();
				expect( request.requestHeaders ).toEqual( jasmine.objectContaining( {
					"slug": "child-slug",
				} ) );
			} );


			it( "should send converted JSONLD when from self", async () => {
				stubRequest( "https://example.com/" );

				const resource:CRUDDocument = createMock();
				resource._context
					.extendObjectSchema( {
						"@vocab": "https://example.com/ns#",
					} )
				;

				await resource.createAccessPoint( {
					hasMemberRelation: "relation",
					string: "my object",
					pointerSet: [
						{ id: "_:1", string: "blank node" },
						{ slug: "fragment", string: "named fragment" },
					],
				} );

				const request:JasmineAjaxRequest = jasmine.Ajax.requests.mostRecent();
				expect( JSON.parse( request.params ) ).toEqual( {
					"@id": "",
					"@graph": [ {
						"@id": "",
						"@type": [ LDP.DirectContainer ],
						[ LDP.hasMemberRelation ]: [ {
							"@id": "https://example.com/ns#relation",
						} ],
						[ LDP.membershipResource ]: [ {
							"@id": "https://example.com/",
						} ],
						"https://example.com/ns#string": [ {
							"@value": "my object",
							"@type": XSD.string,
						} ],
						"https://example.com/ns#pointerSet": [ {
							"@id": "_:1",
						}, {
							"@id": "#fragment",
						} ],
					}, {
						"@id": "_:1",
						"https://example.com/ns#string": [ {
							"@value": "blank node",
							"@type": XSD.string,
						} ],
					}, {
						"@id": "#fragment",
						"https://example.com/ns#string": [ {
							"@value": "named fragment",
							"@type": XSD.string,
						} ],
					} ],
				} );
			} );

			it( "should send converted JSONLD when from URI", async () => {
				stubRequest( "https://example.com/resource/" );

				const resource:CRUDDocument = createMock();
				resource._context
					.extendObjectSchema( {
						"@vocab": "https://example.com/ns#",
					} )
				;

				await resource.createAccessPoint( "resource/", {
					hasMemberRelation: "relation",
					string: "my object",
					pointerSet: [
						{ id: "_:1", string: "blank node" },
						{ slug: "fragment", string: "named fragment" },
					],
				} );

				const request:JasmineAjaxRequest = jasmine.Ajax.requests.mostRecent();
				expect( JSON.parse( request.params ) ).toEqual( {
					"@id": "",
					"@graph": [ {
						"@id": "",
						"@type": [ LDP.DirectContainer ],
						[ LDP.hasMemberRelation ]: [ {
							"@id": "https://example.com/ns#relation",
						} ],
						[ LDP.membershipResource ]: [ {
							"@id": "https://example.com/resource/",
						} ],
						"https://example.com/ns#string": [ {
							"@value": "my object",
							"@type": XSD.string,
						} ],
						"https://example.com/ns#pointerSet": [ {
							"@id": "_:1",
						}, {
							"@id": "#fragment",
						} ],
					}, {
						"@id": "_:1",
						"https://example.com/ns#string": [ {
							"@value": "blank node",
							"@type": XSD.string,
						} ],
					}, {
						"@id": "#fragment",
						"https://example.com/ns#string": [ {
							"@value": "named fragment",
							"@type": XSD.string,
						} ],
					} ],
				} );
			} );

			it( "should return same object reference", async () => {
				stubRequest( "https://example.com/" );

				const resource:CRUDDocument = createMock();
				const child:BaseAccessPoint = { hasMemberRelation: "relation" };

				const returned:AccessPoint = await resource.createAccessPoint( child );

				expect( child ).toBe( returned );
			} );

			it( "should have stored the access point in the registry", async () => {
				stubRequest( "https://example.com/" );

				const resource:CRUDDocument = createMock();
				const returned:CRUDDocument = await resource.createAccessPoint( { hasMemberRelation: "relation" } );

				expect( resource._registry.hasPointer( returned.id ) ).toBe( true );
				expect( resource._registry.getPointer( returned.id ) ).toBe( returned );
			} );

			it( "should throw error if access point is already persisted", async () => {
				const child:BaseAccessPoint = PersistedResource.decorate( {
					hasMemberRelation: "relation",
				} );
				const resource:CRUDDocument = createMock();

				try {
					await resource.createAccessPoint( child );
					fail( "Should not resolve" );
				} catch( error ) {
					expect( () => { throw error; } )
						.toThrowError( IllegalArgumentError, "The access-point provided has already been persisted." );
				}
			} );

			it( "should throw error if access point already being persisted", async () => {
				const child:BaseAccessPoint = { hasMemberRelation: "relation" };
				const resource:CRUDDocument = createMock();

				try {
					await Promise.all( [
						resource.createAccessPoint( child ),
						resource.createAccessPoint( child ),
					] );
					fail( "Should not resolve" );
				} catch( error ) {
					expect( () => { throw error; } )
						.toThrowError( IllegalArgumentError, "The document is already being persisted." );
				}
			} );

			it( "should be able to resend access point after a failed request", async () => {
				const resource:CRUDDocument = createMock();

				const child:BaseAccessPoint = { hasMemberRelation: "relation" };
				try {
					stubRequest( "https://example.com/", { status: 500 } );
					await resource.createAccessPoint( child );

				} catch( error ) {
					stubRequest( "https://example.com/" );
					await resource.createAccessPoint( child );

					expect().nothing();
				}
			} );

			it( "should throw error if incorrect membershipResource", async () => {
				const child:BaseAccessPoint = {
					hasMemberRelation: "relation",
					membershipResource: Pointer.create( { id: "https://example.com/another-resource/" } ),
				};
				const resource:CRUDDocument = createMock();

				try {
					await resource.createAccessPoint( child );
					fail( "Should not resolve" );
				} catch( error ) {
					expect( () => { throw error; } )
						.toThrowError( IllegalArgumentError, "The endpoint URI must be the same as the accessPoint's membershipResource." );
				}
			} );


			it( "should add unresolved PersistedDocument data", async () => {
				stubRequest( "https://example.com/" );

				const resource:CRUDDocument = createMock();
				const returned:CRUDDocument = await resource.createAccessPoint( { hasMemberRelation: "relation" } );

				expect( returned ).toEqual( jasmine.objectContaining( {
					_resolved: false,
					id: "https://example.com/access-point-1/",
				} ) );
			} );

			it( "should add parsed AccessPoint data", async () => {
				stubRequest( "https://example.com/" );

				const resource:CRUDDocument = createMock();
				const returned:CRUDDocument = await resource.createAccessPoint( { hasMemberRelation: "relation" } );

				expect( returned ).toEqual( jasmine.objectContaining( {
					hasMemberRelation: "relation" as any,
					membershipResource: jasmine.objectContaining<Pointer>( {
						id: "https://example.com/",
					} ) as any,
				} ) );
			} );

			it( "should update blank nodes when response metadata returned", async () => {
				stubRequest( "https://example.com/", {
					frees: [
						{
							"@id": "_:responseMetadata",
							"@type": [ C.VolatileResource, C.ResponseMetadata ],
							[ C.documentMetadata ]: [ {
								"@id": "_:documentMetadata",
							} ],
						},
						{
							"@id": "_:documentMetadata",
							"@type": [ C.VolatileResource, C.DocumentMetadata ],
							[ C.relatedDocument ]: [ {
								"@id": "https://example.com/access-point-1/",
							} ],
							[ C.bNodesMap ]: [ {
								"@id": "_:map",
							} ],
						},
						{
							"@id": "_:map",
							"@type": [ C.Map ],
							[ C.entry ]: [
								{ "@id": "_:entry-1" },
								{ "@id": "_:entry-2" },
							],
						},
						{
							"@id": "_:entry-1",
							[ C.entryKey ]: [ {
								"@id": "_:1",
							} ],
							[ C.entryValue ]: [ {
								"@id": "_:new-1",
							} ],
						},
						{
							"@id": "_:entry-2",
							[ C.entryKey ]: [ {
								"@id": "_:2",
							} ],
							[ C.entryValue ]: [ {
								"@id": "_:new-2",
							} ],
						},
					],
				} );

				const resource:CRUDDocument = createMock();

				type BNode = { id:string, string:string };
				type MyDoc = { blankNode1:BNode, blankNode2:BNode };

				const returned:CRUDDocument & MyDoc = await resource.createAccessPoint<MyDoc>( {
					hasMemberRelation: "relation",
					blankNode1: {
						id: "_:1",
						string: "blank node 1",
					},
					blankNode2: {
						id: "_:2",
						string: "blank node 2",
					},
				} );

				expect( returned.hasPointer( "_:1" ) ).toBe( false );
				expect( returned.blankNode1 ).toEqual( jasmine.objectContaining( {
					id: "_:new-1",
					string: "blank node 1",
				} ) );

				expect( returned.hasPointer( "_:2" ) ).toBe( false );
				expect( returned.blankNode2 ).toEqual( jasmine.objectContaining( {
					id: "_:new-2",
					string: "blank node 2",
				} ) );
			} );

		} );

		describe( method( OBLIGATORY, "createAccessPoints" ), () => {

			it( hasSignature(
				[ "T extends object" ],
				"Persists multiple the access points as children of the current document.", [
					{ name: "accessPoints", type: "(T & CarbonLDP.BaseAccessPoint)[]", description: "The access points to persist." },
					{ name: "requestOptions", type: "CarbonLDP.HTTP.RequestOptions", optional: true, description: "Customizable options for the request." },
				],
				{ type: "Promise<T & CarbonLDP.ProtectedDocument>" }
			), ():void => {} );

			it( hasSignature(
				[ "T extends object" ],
				"Persists multiple the access points with the slug specified as children of the current document.", [
					{ name: "accessPoints", type: "(T & CarbonLDP.BaseAccessPoint)[]", description: "The access points to persist." },
					{ name: "slugs", type: "string[]", description: "Array with the slugs that corresponds to each object in `accessPoints` parameter, in the order in which they were defined. If an element in the array is undefined or null, the slug will be generated by the platform." },
					{ name: "requestOptions", type: "CarbonLDP.HTTP.RequestOptions", optional: true, description: "Customizable options for the request." },
				],
				{ type: "Promise<T & CarbonLDP.ProtectedDocument>" }
			), ():void => {} );

			it( hasSignature(
				[ "T extends object" ],
				"Persists multiple the access points as children of the uri specified.", [
					{ name: "uri", type: "string", description: "URI of the document where to create the child." },
					{ name: "accessPoints", type: "(T & CarbonLDP.BaseAccessPoint)[]", description: "The access points to persist." },
					{ name: "requestOptions", type: "CarbonLDP.HTTP.RequestOptions", optional: true, description: "Customizable options for the request." },
				],
				{ type: "Promise<T & CarbonLDP.ProtectedDocument>" }
			), ():void => {} );

			it( hasSignature(
				[ "T extends object" ],
				"Persists multiple the access points with the slug specified as children of the uri specified.", [
					{ name: "uri", type: "string", description: "URI of the document where to create the child." },
					{ name: "accessPoints", type: "(T & CarbonLDP.BaseAccessPoint)[]", description: "The access points to persist." },
					{ name: "slugs", type: "string[]", description: "Array with the slugs that corresponds to each object in `accessPoints` parameter, in the order in which they were defined. If an element in the array is undefined or null, the slug will be generated by the platform." },
					{ name: "requestOptions", type: "CarbonLDP.HTTP.RequestOptions", optional: true, description: "Customizable options for the request." },
				],
				{ type: "Promise<T & CarbonLDP.ProtectedDocument>" }
			), ():void => {} );

			it( "should exists", ():void => {
				const resource:CRUDDocument = createMock();

				expect( resource.createAccessPoints ).toBeDefined();
				expect( resource.createAccessPoints ).toEqual( jasmine.any( Function ) );
			} );


			function stubRequest( url:string, options:{ status?:number, headers?:{ [ key:string ]:string }, frees?:object[], } = {} ):void {
				const status:number = options.status !== void 0 ?
					options.status :
					options.frees && options.frees.length ?
						200 :
						204
				;

				// noinspection JSMismatchedCollectionQueryUpdate
				const headers:{ [ key:string ]:string } = options.headers ?
					options.headers : {};


				const data:string | undefined = options.frees ?
					JSON.stringify( [
						...options.frees,
					] ) :
					void 0
				;

				let counter:number = 1;

				jasmine.Ajax
					.stubRequest( url, null, "POST" )
					.andReturn( {
						status,
						responseHeaders: {
							get location():string { return `${ url }access-point-${ counter ++ }/`; },
							...headers,
						},
						responseText: data,
					} );
			}


			it( "should throw error when _registry undefined", async () => {
				try {
					const resource:CRUDDocument = createMock( { _registry: void 0 } );
					await resource.createAccessPoints( [ { hasMemberRelation: "relation" } ] );
				} catch( e ) {
					expect( () => { throw e; } )
						.toThrowError( IllegalActionError, `"https://example.com/" doesn't support CRUD requests.` );
				}
			} );

			it( "should parse error response", async () => {
				const resource:CRUDDocument = createMock( { id: "https://example.com/500/" } );

				const spy:jasmine.Spy = spyOn( resource._registry, "_parseErrorResponse" )
					.and.callFake( () => Promise.reject( null ) );

				try {
					await resource.createAccessPoints( [ { hasMemberRelation: "relation" } ] );
					fail( "Should not createAccessPoints" );
				} catch( error ) {
					if( error ) fail( error );

					expect( spy ).toHaveBeenCalled();
				}
			} );


			it( "should request from self when no URI", async () => {
				stubRequest( "https://example.com/" );

				const resource:CRUDDocument = createMock();
				await resource.createAccessPoints( [ { hasMemberRelation: "relation" } ] );

				const request:JasmineAjaxRequest = jasmine.Ajax.requests.mostRecent();
				expect( request.url ).toBe( "https://example.com/" );
			} );

			it( "should request from URI", async () => {
				stubRequest( "https://example.com/another-resource/" );

				const resource:CRUDDocument = createMock();
				await resource.createAccessPoints( "https://example.com/another-resource/", [ { hasMemberRelation: "relation" } ] );

				const request:JasmineAjaxRequest = jasmine.Ajax.requests.mostRecent();
				expect( request.url ).toBe( "https://example.com/another-resource/" );
			} );

			it( "should request from relative URI", async () => {
				stubRequest( "https://example.com/relative/" );

				const resource:CRUDDocument = createMock();
				await resource.createAccessPoints( "relative/", [ { hasMemberRelation: "relation" } ] );

				const request:JasmineAjaxRequest = jasmine.Ajax.requests.mostRecent();
				expect( request.url ).toBe( "https://example.com/relative/" );
			} );

			it( "should request from resolved prefixed name", async () => {
				stubRequest( "https://example.com/resource/" );

				const _context:CarbonLDP = new CarbonLDP( "https://example.com/" );
				_context.extendObjectSchema( { "ex": "https://example.com/" } );

				const resource:CRUDDocument = createMock( { _context } );
				await resource.createAccessPoints( "ex:resource/", [ { hasMemberRelation: "relation" } ] );

				const request:JasmineAjaxRequest = jasmine.Ajax.requests.mostRecent();
				expect( request.url ).toBe( "https://example.com/resource/" );
			} );

			it( "should throw error when from URI outside context scope", async () => {
				const resource:CRUDDocument = createMock();

				await resource
					.createAccessPoints( "https://example.org/resource/", [ { hasMemberRelation: "relation" } ] )
					.catch( error => {
						expect( () => { throw error; } )
							.toThrowError( IllegalArgumentError, `"https://example.org/resource/" is out of scope.` );
					} )
				;
			} );

			it( "should throw error when from URI is BNode label", async () => {
				const resource:CRUDDocument = createMock();

				await resource
					.createAccessPoints( "_:1", [ { hasMemberRelation: "relation" } ] )
					.catch( error => {
						expect( () => { throw error; } )
							.toThrowError( IllegalArgumentError, `"_:1" (Blank Node) can't be fetched directly.` );
					} )
				;
			} );

			it( "should throw error when from URI is Named Fragment label", async () => {
				const resource:CRUDDocument = createMock();

				await resource
					.createAccessPoints( "#fragment", [ { hasMemberRelation: "relation" } ] )
					.catch( error => {
						expect( () => { throw error; } )
							.toThrowError( IllegalArgumentError, `"https://example.com/#fragment" (Named Fragment) can't be fetched directly.` );
					} )
				;
			} );

			it( "should throw error when unresolved prefixed name", async () => {
				const resource:CRUDDocument = createMock();

				await resource
					.createAccessPoints( "ex:resource/", [ { hasMemberRelation: "relation" } ] )
					.catch( error => {
						expect( () => { throw error; } )
							.toThrowError( IllegalArgumentError, `"ex:resource/" is out of scope.` );
					} )
				;
			} );

			it( "should throw error if any has incorrect membershipResource", async () => {
				const child:BaseAccessPoint = {
					hasMemberRelation: "relation",
					membershipResource: Pointer.create( { id: "https://example.com/another-resource/" } ),
				};
				const resource:CRUDDocument = createMock();

				try {
					await resource.createAccessPoints( [ child ] );
					fail( "Should not resolve" );
				} catch( error ) {
					expect( () => { throw error; } )
						.toThrowError( IllegalArgumentError, "The endpoint URI must be the same as the accessPoint's membershipResource." );
				}
			} );


			it( "should send basic request headers when from self", async () => {
				stubRequest( "https://example.com/" );

				const resource:CRUDDocument = createMock();
				await resource.createAccessPoints( [ { hasMemberRelation: "relation" }, { hasMemberRelation: "relation" } ] );

				const firstRequest:JasmineAjaxRequest = jasmine.Ajax.requests.at( 0 );
				expect( firstRequest.requestHeaders ).toEqual( {
					"accept": "application/ld+json",
					"content-type": "application/ld+json",
					"prefer": [
						"return=minimal",
						`${ LDP.RDFSource }; rel=interaction-model`,
					].join( ", " ),
				} );

				const secondRequest:JasmineAjaxRequest = jasmine.Ajax.requests.at( 1 );
				expect( secondRequest.requestHeaders ).toEqual( {
					"accept": "application/ld+json",
					"content-type": "application/ld+json",
					"prefer": [
						"return=minimal",
						`${ LDP.RDFSource }; rel=interaction-model`,
					].join( ", " ),
				} );
			} );

			it( "should send basic request headers when from URI", async () => {
				stubRequest( "https://example.com/resource/" );

				const resource:CRUDDocument = createMock();
				await resource.createAccessPoints( "resource/", [ { hasMemberRelation: "relation" }, { hasMemberRelation: "relation" } ] );


				const firstRequest:JasmineAjaxRequest = jasmine.Ajax.requests.at( 0 );
				expect( firstRequest.requestHeaders ).toEqual( {
					"accept": "application/ld+json",
					"content-type": "application/ld+json",
					"prefer": [
						"return=minimal",
						`${ LDP.RDFSource }; rel=interaction-model`,
					].join( ", " ),
				} );

				const secondRequest:JasmineAjaxRequest = jasmine.Ajax.requests.at( 1 );
				expect( secondRequest.requestHeaders ).toEqual( {
					"accept": "application/ld+json",
					"content-type": "application/ld+json",
					"prefer": [
						"return=minimal",
						`${ LDP.RDFSource }; rel=interaction-model`,
					].join( ", " ),
				} );
			} );

			it( "should add authentication header", async () => {
				stubRequest( "https://example.com/" );

				const resource:CRUDDocument = createMock();

				const spy:jasmine.Spy = spyOn( resource._context.auth, "addAuthentication" );

				await resource.createAccessPoints( [ { hasMemberRelation: "relation" } ] );

				expect( spy ).toHaveBeenCalled();
			} );

			it( "should send custom request headers when from self", async () => {
				stubRequest( "https://example.com/" );

				const resource:CRUDDocument = createMock();
				await resource.createAccessPoints( [ { hasMemberRelation: "relation" }, { hasMemberRelation: "relation" } ], {
					headers: new Map()
						.set( "custom", new Header( "custom value" ) )
					,
				} );

				const firstRequest:JasmineAjaxRequest = jasmine.Ajax.requests.at( 0 );
				expect( firstRequest.requestHeaders ).toEqual( jasmine.objectContaining( {
					"custom": "custom value",
				} ) );

				const secondRequest:JasmineAjaxRequest = jasmine.Ajax.requests.at( 1 );
				expect( secondRequest.requestHeaders ).toEqual( jasmine.objectContaining( {
					"custom": "custom value",
				} ) );
			} );

			it( "should send custom request headers when from URI", async () => {
				stubRequest( "https://example.com/resource/" );

				const resource:CRUDDocument = createMock();
				await resource.createAccessPoints( "resource/", [ { hasMemberRelation: "relation" }, { hasMemberRelation: "relation" } ], {
					headers: new Map()
						.set( "custom", new Header( "custom value" ) )
					,
				} );

				const firstRequest:JasmineAjaxRequest = jasmine.Ajax.requests.at( 0 );
				expect( firstRequest.requestHeaders ).toEqual( jasmine.objectContaining( {
					"custom": "custom value",
				} ) );

				const secondRequest:JasmineAjaxRequest = jasmine.Ajax.requests.at( 1 );
				expect( secondRequest.requestHeaders ).toEqual( jasmine.objectContaining( {
					"custom": "custom value",
				} ) );
			} );

			it( "should add slug header when from self", async () => {
				stubRequest( "https://example.com/" );

				const resource:CRUDDocument = createMock();

				await resource.createAccessPoints( [ { hasMemberRelation: "relation" }, { hasMemberRelation: "relation" } ], [ "child-slug-1", "child-slug-2" ] );

				const firstRequest:JasmineAjaxRequest = jasmine.Ajax.requests.at( 0 );
				expect( firstRequest.requestHeaders ).toEqual( jasmine.objectContaining( {
					"slug": "child-slug-1",
				} ) );

				const secondRequest:JasmineAjaxRequest = jasmine.Ajax.requests.at( 1 );
				expect( secondRequest.requestHeaders ).toEqual( jasmine.objectContaining( {
					"slug": "child-slug-2",
				} ) );
			} );

			it( "should add slug header when from URI", async () => {
				stubRequest( "https://example.com/resource/" );

				const resource:CRUDDocument = createMock();

				await resource.createAccessPoints( "resource/", [ { hasMemberRelation: "relation" }, { hasMemberRelation: "relation" } ], [ "child-slug-1", "child-slug-2" ] );

				const firstRequest:JasmineAjaxRequest = jasmine.Ajax.requests.at( 0 );
				expect( firstRequest.requestHeaders ).toEqual( jasmine.objectContaining( {
					"slug": "child-slug-1",
				} ) );

				const secondRequest:JasmineAjaxRequest = jasmine.Ajax.requests.at( 1 );
				expect( secondRequest.requestHeaders ).toEqual( jasmine.objectContaining( {
					"slug": "child-slug-2",
				} ) );
			} );

			it( "should add slug header if defined", async () => {
				stubRequest( "https://example.com/" );

				const resource:CRUDDocument = createMock();

				await resource.createAccessPoints( [ { hasMemberRelation: "relation" }, { hasMemberRelation: "relation" }, { hasMemberRelation: "relation" } ], [ null, undefined, "child-slug" ] );

				const firstRequest:JasmineAjaxRequest = jasmine.Ajax.requests.at( 0 );
				expect( firstRequest.requestHeaders ).not.toEqual( jasmine.objectContaining( {
					"slug": jasmine.anything() as any,
				} ) );

				const secondRequest:JasmineAjaxRequest = jasmine.Ajax.requests.at( 1 );
				expect( secondRequest.requestHeaders ).not.toEqual( jasmine.objectContaining( {
					"slug": jasmine.anything() as any,
				} ) );

				const thirdRequest:JasmineAjaxRequest = jasmine.Ajax.requests.at( 2 );
				expect( thirdRequest.requestHeaders ).toEqual( jasmine.objectContaining( {
					"slug": "child-slug",
				} ) );
			} );

			it( "should not add slug header when less slugs than access points", async () => {
				stubRequest( "https://example.com/" );

				const resource:CRUDDocument = createMock();

				await resource.createAccessPoints( [ { hasMemberRelation: "relation" }, { hasMemberRelation: "relation" } ], [ "child-slug" ] );

				const firstRequest:JasmineAjaxRequest = jasmine.Ajax.requests.at( 0 );
				expect( firstRequest.requestHeaders ).toEqual( jasmine.objectContaining( {
					"slug": "child-slug",
				} ) );

				const secondRequest:JasmineAjaxRequest = jasmine.Ajax.requests.at( 1 );
				expect( secondRequest.requestHeaders ).not.toEqual( jasmine.objectContaining( {
					"slug": jasmine.anything() as any,
				} ) );
			} );


			it( "should send converted JSONLD when from self", async () => {
				stubRequest( "https://example.com/" );

				const resource:CRUDDocument = createMock();
				resource._context
					.extendObjectSchema( {
						"@vocab": "https://example.com/ns#",
					} )
				;

				await resource.createAccessPoints( [ {
					hasMemberRelation: "relation1",
					string: "my object 1",
				}, {
					hasMemberRelation: "relation2",
					string: "my object 2",
				} ] );

				const request1:JasmineAjaxRequest = jasmine.Ajax.requests.at( 0 );
				expect( JSON.parse( request1.params ) ).toEqual( {
					"@id": "",
					"@graph": [ {
						"@id": "",
						"@type": [ LDP.DirectContainer ],
						[ LDP.hasMemberRelation ]: [ {
							"@id": "https://example.com/ns#relation1",
						} ],
						[ LDP.membershipResource ]: [ {
							"@id": "https://example.com/",
						} ],
						"https://example.com/ns#string": [ {
							"@value": "my object 1",
							"@type": XSD.string,
						} ],
					} ],
				} );

				const request2:JasmineAjaxRequest = jasmine.Ajax.requests.at( 1 );
				expect( JSON.parse( request2.params ) ).toEqual( {
					"@id": "",
					"@graph": [ {
						"@id": "",
						"@type": [ LDP.DirectContainer ],
						[ LDP.hasMemberRelation ]: [ {
							"@id": "https://example.com/ns#relation2",
						} ],
						[ LDP.membershipResource ]: [ {
							"@id": "https://example.com/",
						} ],
						"https://example.com/ns#string": [ {
							"@value": "my object 2",
							"@type": XSD.string,
						} ],
					} ],
				} );
			} );

			it( "should send converted JSONLD when from URI", async () => {
				stubRequest( "https://example.com/resource/" );

				const resource:CRUDDocument = createMock();
				resource._context
					.extendObjectSchema( {
						"@vocab": "https://example.com/ns#",
					} )
				;

				await resource.createAccessPoints( "resource/", [ {
					hasMemberRelation: "relation1",
					string: "my object 1",
				}, {
					hasMemberRelation: "relation2",
					string: "my object 2",
				} ] );

				const request1:JasmineAjaxRequest = jasmine.Ajax.requests.at( 0 );
				expect( JSON.parse( request1.params ) ).toEqual( {
					"@id": "",
					"@graph": [ {
						"@id": "",
						"@type": [ LDP.DirectContainer ],
						[ LDP.hasMemberRelation ]: [ {
							"@id": "https://example.com/ns#relation1",
						} ],
						[ LDP.membershipResource ]: [ {
							"@id": "https://example.com/resource/",
						} ],
						"https://example.com/ns#string": [ {
							"@value": "my object 1",
							"@type": XSD.string,
						} ],
					} ],
				} );

				const request2:JasmineAjaxRequest = jasmine.Ajax.requests.at( 1 );
				expect( JSON.parse( request2.params ) ).toEqual( {
					"@id": "",
					"@graph": [ {
						"@id": "",
						"@type": [ LDP.DirectContainer ],
						[ LDP.hasMemberRelation ]: [ {
							"@id": "https://example.com/ns#relation2",
						} ],
						[ LDP.membershipResource ]: [ {
							"@id": "https://example.com/resource/",
						} ],
						"https://example.com/ns#string": [ {
							"@value": "my object 2",
							"@type": XSD.string,
						} ],
					} ],
				} );
			} );

			it( "should return same access point object references", async () => {
				stubRequest( "https://example.com/" );

				const resource:CRUDDocument = createMock();
				const child1:BaseAccessPoint = { hasMemberRelation: "relation1" };
				const child2:BaseAccessPoint = { hasMemberRelation: "relation2" };

				const [ returned1, returned2 ]:AccessPoint[] = await resource.createAccessPoints( [ child1, child2 ] );

				expect( child1 ).toBe( returned1 );
				expect( child2 ).toBe( returned2 );
			} );

			it( "should have stored the access points in the registry", async () => {
				stubRequest( "https://example.com/" );

				const resource:CRUDDocument = createMock();
				const [ returned1, returned2 ]:CRUDDocument[] = await resource.createAccessPoints( [ { hasMemberRelation: "relation" }, { hasMemberRelation: "relation" } ] );

				expect( resource._registry.hasPointer( returned1.id ) ).toBe( true );
				expect( resource._registry.getPointer( returned1.id ) ).toBe( returned1 );

				expect( resource._registry.hasPointer( returned2.id ) ).toBe( true );
				expect( resource._registry.getPointer( returned2.id ) ).toBe( returned2 );
			} );

			it( "should throw error if any access point is already persisted", async () => {
				const child:BaseAccessPoint = PersistedResource.decorate( {
					hasMemberRelation: "relation",
				} );
				const resource:CRUDDocument = createMock();

				try {
					await resource.createAccessPoints( [ { hasMemberRelation: "relation" }, child, { hasMemberRelation: "relation" } ] );
					fail( "Should not resolve" );
				} catch( error ) {
					expect( () => { throw error; } )
						.toThrowError( IllegalArgumentError, "The access-point provided has already been persisted." );
				}
			} );

			it( "should throw error if any already being persisted", async () => {
				const child:BaseAccessPoint = { hasMemberRelation: "relation" };
				const resource:CRUDDocument = createMock();

				try {
					await Promise.all( [
						resource.createAccessPoints( [ child ] ),
						resource.createAccessPoints( [ child ] ),
					] );
					fail( "Should not resolve" );
				} catch( error ) {
					expect( () => { throw error; } )
						.toThrowError( IllegalArgumentError, "The document is already being persisted." );
				}
			} );


			it( "should add unresolved PersistedDocument data", async () => {
				stubRequest( "https://example.com/" );

				const resource:CRUDDocument = createMock();
				const [ returned1, returned2 ]:CRUDDocument[] = await resource.createAccessPoints( [ { hasMemberRelation: "relation1" }, { hasMemberRelation: "relation2" } ] );

				expect( returned1 ).toEqual( jasmine.objectContaining( {
					_resolved: false,
					id: "https://example.com/access-point-1/",
				} ) );
				expect( returned2 ).toEqual( jasmine.objectContaining( {
					_resolved: false,
					id: "https://example.com/access-point-2/",
				} ) );
			} );

			it( "should add parsed AccessPoint data", async () => {
				stubRequest( "https://example.com/" );

				const resource:CRUDDocument = createMock();
				const [ returned1, returned2 ]:CRUDDocument[] = await resource.createAccessPoints( [ { hasMemberRelation: "relation1" }, { hasMemberRelation: "relation2" } ] );

				expect( returned1 ).toEqual( jasmine.objectContaining( {
					hasMemberRelation: "relation1" as any,
					membershipResource: jasmine.objectContaining<Pointer>( {
						id: "https://example.com/",
					} ) as any,
				} ) );
				expect( returned2 ).toEqual( jasmine.objectContaining( {
					hasMemberRelation: "relation2" as any,
					membershipResource: jasmine.objectContaining<Pointer>( {
						id: "https://example.com/",
					} ) as any,
				} ) );
			} );

			it( "should update blank nodes when response metadata returned", async () => {
				stubRequest( "https://example.com/", {
					frees: [
						{
							"@id": "_:responseMetadata",
							"@type": [ C.VolatileResource, C.ResponseMetadata ],
							[ C.documentMetadata ]: [ {
								"@id": "_:documentMetadata",
							} ],
						},
						{
							"@id": "_:documentMetadata",
							"@type": [ C.VolatileResource, C.DocumentMetadata ],
							[ C.relatedDocument ]: [ {
								"@id": "https://example.com/access-point-1/",
							} ],
							[ C.bNodesMap ]: [ {
								"@id": "_:map",
							} ],
						},
						{
							"@id": "_:map",
							"@type": [ C.Map ],
							[ C.entry ]: [
								{ "@id": "_:entry-1" },
								{ "@id": "_:entry-2" },
							],
						},
						{
							"@id": "_:entry-1",
							[ C.entryKey ]: [ {
								"@id": "_:1",
							} ],
							[ C.entryValue ]: [ {
								"@id": "_:new-1",
							} ],
						},
						{
							"@id": "_:entry-2",
							[ C.entryKey ]: [ {
								"@id": "_:2",
							} ],
							[ C.entryValue ]: [ {
								"@id": "_:new-2",
							} ],
						},
					],
				} );

				const resource:CRUDDocument = createMock();

				type BNode = { id:string, string:string };
				type MyDoc = { blankNode1:BNode, blankNode2:BNode };

				const [ returned ]:(CRUDDocument & MyDoc)[] = await resource.createAccessPoints<MyDoc>( [ {
					hasMemberRelation: "relation",
					blankNode1: {
						id: "_:1",
						string: "blank node 1",
					},
					blankNode2: {
						id: "_:2",
						string: "blank node 2",
					},
				} ] );

				expect( returned.hasPointer( "_:1" ) ).toBe( false );
				expect( returned.blankNode1 ).toEqual( jasmine.objectContaining( {
					id: "_:new-1",
					string: "blank node 1",
				} ) );

				expect( returned.hasPointer( "_:2" ) ).toBe( false );
				expect( returned.blankNode2 ).toEqual( jasmine.objectContaining( {
					id: "_:new-2",
					string: "blank node 2",
				} ) );
			} );

		} );

		describe( method( OBLIGATORY, "createAccessPointAndRetrieve" ), () => {

			it( hasSignature(
				[ "T extends object" ],
				"Persists the access point as a child of the current document and retrieves the updated data from the server.", [
					{ name: "accessPoint", type: "T & CarbonLDP.BaseAccessPoint", description: "object with the access point properties to persist." },
					{ name: "requestOptions", type: "CarbonLDP.HTTP.RequestOptions", optional: true, description: "Customizable options for the request." },
				],
				{ type: "Promise<T & CarbonLDP.ProtectedDocument>" }
			), ():void => {} );

			it( hasSignature(
				[ "T extends object" ],
				"Persists the access point with the slug specified as a child of the current document and retrieves the updated data from the server.", [
					{ name: "accessPoint", type: "T & CarbonLDP.BaseAccessPoint", description: "object with the access point properties to persist." },
					{ name: "slug", type: "string", description: "The slug that will be used in the child URI." },
					{ name: "requestOptions", type: "CarbonLDP.HTTP.RequestOptions", optional: true, description: "Customizable options for the request." },
				],
				{ type: "Promise<T & CarbonLDP.ProtectedDocument>" }
			), ():void => {} );

			it( hasSignature(
				[ "T extends object" ],
				"Persists the access point as a child of the uri specified and retrieves the updated data from the server.", [
					{ name: "uri", type: "string", description: "URI of the document where to create the child." },
					{ name: "accessPoint", type: "T & CarbonLDP.BaseAccessPoint", description: "object with the access point properties to persist." },
					{ name: "requestOptions", type: "CarbonLDP.HTTP.RequestOptions", optional: true, description: "Customizable options for the request." },
				],
				{ type: "Promise<T & CarbonLDP.ProtectedDocument>" }
			), ():void => {} );

			it( hasSignature(
				[ "T extends object" ],
				"Persists the access point with the slug specified as a child of the uri specified and retrieves the updated data from the server.", [
					{ name: "uri", type: "string", description: "URI of the document where to create the child." },
					{ name: "accessPoint", type: "T & CarbonLDP.BaseAccessPoint", description: "object with the access point properties to persist." },
					{ name: "slug", type: "string", description: "The slug that will be used in the child URI." },
					{ name: "requestOptions", type: "CarbonLDP.HTTP.RequestOptions", optional: true, description: "Customizable options for the request." },
				],
				{ type: "Promise<T & CarbonLDP.ProtectedDocument>" }
			), ():void => {} );

			it( "should exists", ():void => {
				const resource:CRUDDocument = createMock();

				expect( resource.createAccessPointAndRetrieve ).toBeDefined();
				expect( resource.createAccessPointAndRetrieve ).toEqual( jasmine.any( Function ) );
			} );


			function generateResponseOptions( url:string, options:{ index:number, status?:number, headers?:{ [ key:string ]:string }, frees?:object[], resource?:object, fragments?:object[] } ):JasmineAjaxRequestStubReturnOptions {
				const status:number = options.status !== void 0 ?
					options.status : 200;

				// noinspection JSMismatchedCollectionQueryUpdate
				const headers:{ [ key:string ]:string } = options.headers ?
					options.headers : {};


				const frees:object[] = options.frees ?
					options.frees : [];

				const resource:object = options.resource ?
					options.resource : {};
				const fragments:object[] = options.fragments ?
					options.fragments : [];

				return {
					status: status,
					responseHeaders: {
						"preference-applied": "return=representation",
						"eTag": `"${ options.index }-12345"`,
						"location": `${ url }access-point-${ options.index }/`,
						...headers,
					},
					responseText: JSON.stringify( [
						...frees,
						{
							"@id": `${ url }access-point-${ options.index }/`,
							"@graph": [
								{
									"@id": `${ url }access-point-${ options.index }/`,
									"@type": [ LDP.DirectContainer, C.AccessPoint ],
									[ LDP.hasMemberRelation ]: [ {
										"@id": "https://example.com/ns#relation",
									} ],
									[ LDP.membershipResource ]: [ {
										"@id": url,
									} ],
									...resource,
								},
								...fragments,
							],
						},
					] ),
				};
			}

			function stubRequest( url:string, options:{ status?:number, headers?:{ [ key:string ]:string }, frees?:object[], resource?:object, fragments?:object[] } = {} ):void {
				const responseOptions:typeof options & { index:number } = Object
					.assign( { index: 1, status: 200 }, options );

				jasmine.Ajax
					.stubRequest( url, null, "POST" )
					.andReturn( generateResponseOptions( url, responseOptions ) );
			}


			it( "should throw error when _registry undefined", async () => {
				try {
					const resource:CRUDDocument = createMock( { _registry: void 0 } );
					await resource.createAccessPointAndRetrieve( { hasMemberRelation: "relation" } );
				} catch( e ) {
					expect( () => { throw e; } )
						.toThrowError( IllegalActionError, `"https://example.com/" doesn't support CRUD requests.` );
				}
			} );


			it( "should request from self when no URI", async () => {
				stubRequest( "https://example.com/" );

				const resource:CRUDDocument = createMock();
				await resource.createAccessPointAndRetrieve( { hasMemberRelation: "relation" } );

				const request:JasmineAjaxRequest = jasmine.Ajax.requests.mostRecent();
				expect( request.url ).toBe( "https://example.com/" );
			} );

			it( "should request from URI", async () => {
				stubRequest( "https://example.com/another-resource/" );

				const resource:CRUDDocument = createMock();
				await resource.createAccessPointAndRetrieve( "https://example.com/another-resource/", { hasMemberRelation: "relation" } );

				const request:JasmineAjaxRequest = jasmine.Ajax.requests.mostRecent();
				expect( request.url ).toBe( "https://example.com/another-resource/" );
			} );

			it( "should request from relative URI", async () => {
				stubRequest( "https://example.com/relative/" );

				const resource:CRUDDocument = createMock();
				await resource.createAccessPointAndRetrieve( "relative/", { hasMemberRelation: "relation" } );

				const request:JasmineAjaxRequest = jasmine.Ajax.requests.mostRecent();
				expect( request.url ).toBe( "https://example.com/relative/" );
			} );

			it( "should request from resolved prefixed name", async () => {
				stubRequest( "https://example.com/resource/" );

				const _context:CarbonLDP = new CarbonLDP( "https://example.com/" );
				_context.extendObjectSchema( { "ex": "https://example.com/" } );

				const resource:CRUDDocument = createMock( { _context } );
				await resource.createAccessPointAndRetrieve( "ex:resource/", { hasMemberRelation: "relation" } );

				const request:JasmineAjaxRequest = jasmine.Ajax.requests.mostRecent();
				expect( request.url ).toBe( "https://example.com/resource/" );
			} );

			it( "should throw error when from URI outside context scope", async () => {
				const resource:CRUDDocument = createMock();

				await resource
					.createAccessPointAndRetrieve( "https://example.org/resource/", { hasMemberRelation: "relation" } )
					.catch( error => {
						expect( () => { throw error; } )
							.toThrowError( IllegalArgumentError, `"https://example.org/resource/" is out of scope.` );
					} )
				;
			} );

			it( "should throw error when from URI is BNode label", async () => {
				const resource:CRUDDocument = createMock();

				await resource
					.createAccessPointAndRetrieve( "_:1", { hasMemberRelation: "relation" } )
					.catch( error => {
						expect( () => { throw error; } )
							.toThrowError( IllegalArgumentError, `"_:1" (Blank Node) can't be fetched directly.` );
					} )
				;
			} );

			it( "should throw error when from URI is Named Fragment label", async () => {
				const resource:CRUDDocument = createMock();

				await resource
					.createAccessPointAndRetrieve( "#fragment", { hasMemberRelation: "relation" } )
					.catch( error => {
						expect( () => { throw error; } )
							.toThrowError( IllegalArgumentError, `"https://example.com/#fragment" (Named Fragment) can't be fetched directly.` );
					} )
				;
			} );

			it( "should throw error when unresolved prefixed name", async () => {
				const resource:CRUDDocument = createMock();

				await resource
					.createAccessPointAndRetrieve( "ex:resource/", { hasMemberRelation: "relation" } )
					.catch( error => {
						expect( () => { throw error; } )
							.toThrowError( IllegalArgumentError, `"ex:resource/" is out of scope.` );
					} )
				;
			} );

			it( "should parse error response", async () => {
				stubRequest( "https://example.com/500/", { status: 500 } );
				const resource:CRUDDocument = createMock( { id: "https://example.com/500/" } );

				const spy:jasmine.Spy = spyOn( resource._registry, "_parseErrorResponse" )
					.and.callFake( () => Promise.reject( null ) );

				try {
					await resource.createAccessPointAndRetrieve( { hasMemberRelation: "relation" } );
					fail( "Should not createAccessPoint" );
				} catch( error ) {
					if( error ) fail( error );

					expect( spy ).toHaveBeenCalled();
				}
			} );


			it( "should send basic request headers when from self", async () => {
				stubRequest( "https://example.com/" );

				const resource:CRUDDocument = createMock();
				await resource.createAccessPointAndRetrieve( { hasMemberRelation: "relation" } );

				const request:JasmineAjaxRequest = jasmine.Ajax.requests.mostRecent();
				expect( request.requestHeaders ).toEqual( {
					"accept": "application/ld+json",
					"content-type": "application/ld+json",
					"prefer": [
						"return=representation",
						`${ LDP.RDFSource }; rel=interaction-model`,
					].join( ", " ),
				} );
			} );

			it( "should send basic request headers when from URI", async () => {
				stubRequest( "https://example.com/resource/" );

				const resource:CRUDDocument = createMock();
				await resource.createAccessPointAndRetrieve( "resource/", { hasMemberRelation: "relation" } );

				const request:JasmineAjaxRequest = jasmine.Ajax.requests.mostRecent();
				expect( request.requestHeaders ).toEqual( {
					"accept": "application/ld+json",
					"content-type": "application/ld+json",
					"prefer": [
						"return=representation",
						`${ LDP.RDFSource }; rel=interaction-model`,
					].join( ", " ),
				} );
			} );

			it( "should add authentication header", async () => {
				stubRequest( "https://example.com/" );

				const resource:CRUDDocument = createMock();

				const spy:jasmine.Spy = spyOn( resource._context.auth, "addAuthentication" );

				await resource.createAccessPointAndRetrieve( { hasMemberRelation: "relation" } );

				expect( spy ).toHaveBeenCalled();
			} );

			it( "should add custom headers when from self", async () => {
				stubRequest( "https://example.com/" );

				const resource:CRUDDocument = createMock();

				await resource.createAccessPointAndRetrieve( { hasMemberRelation: "relation" }, {
					headers: new Map()
						.set( "custom", new Header( "custom value" ) )
					,
				} );

				const request:JasmineAjaxRequest = jasmine.Ajax.requests.mostRecent();
				expect( request.requestHeaders ).toEqual( jasmine.objectContaining( {
					"custom": "custom value",
				} ) );
			} );

			it( "should add custom headers when from URI", async () => {
				stubRequest( "https://example.com/resource/" );

				const resource:CRUDDocument = createMock();

				await resource.createAccessPointAndRetrieve( "resource/", { hasMemberRelation: "relation" }, {
					headers: new Map()
						.set( "custom", new Header( "custom value" ) )
					,
				} );

				const request:JasmineAjaxRequest = jasmine.Ajax.requests.mostRecent();
				expect( request.requestHeaders ).toEqual( jasmine.objectContaining( {
					"custom": "custom value",
				} ) );
			} );

			it( "should add slug header when from self", async () => {
				stubRequest( "https://example.com/" );

				const resource:CRUDDocument = createMock();

				await resource.createAccessPointAndRetrieve( { hasMemberRelation: "relation" }, "child-slug" );

				const request:JasmineAjaxRequest = jasmine.Ajax.requests.mostRecent();
				expect( request.requestHeaders ).toEqual( jasmine.objectContaining( {
					"slug": "child-slug",
				} ) );
			} );

			it( "should add slug header when from URI", async () => {
				stubRequest( "https://example.com/resource/" );

				const resource:CRUDDocument = createMock();

				await resource.createAccessPointAndRetrieve( "resource/", { hasMemberRelation: "relation" }, "child-slug" );

				const request:JasmineAjaxRequest = jasmine.Ajax.requests.mostRecent();
				expect( request.requestHeaders ).toEqual( jasmine.objectContaining( {
					"slug": "child-slug",
				} ) );
			} );


			it( "should send converted JSONLD when from self", async () => {
				stubRequest( "https://example.com/" );

				const resource:CRUDDocument = createMock();
				resource._context
					.extendObjectSchema( {
						"@vocab": "https://example.com/ns#",
					} )
				;

				await resource.createAccessPointAndRetrieve( {
					hasMemberRelation: "relation",
					string: "my object",
					pointerSet: [
						{ id: "_:1", string: "blank node" },
						{ slug: "fragment", string: "named fragment" },
					],
				} );

				const request:JasmineAjaxRequest = jasmine.Ajax.requests.mostRecent();
				expect( JSON.parse( request.params ) ).toEqual( {
					"@id": "",
					"@graph": [ {
						"@id": "",
						"@type": [ LDP.DirectContainer ],
						[ LDP.hasMemberRelation ]: [ {
							"@id": "https://example.com/ns#relation",
						} ],
						[ LDP.membershipResource ]: [ {
							"@id": "https://example.com/",
						} ],
						"https://example.com/ns#string": [ {
							"@value": "my object",
							"@type": XSD.string,
						} ],
						"https://example.com/ns#pointerSet": [ {
							"@id": "_:1",
						}, {
							"@id": "#fragment",
						} ],
					}, {
						"@id": "_:1",
						"https://example.com/ns#string": [ {
							"@value": "blank node",
							"@type": XSD.string,
						} ],
					}, {
						"@id": "#fragment",
						"https://example.com/ns#string": [ {
							"@value": "named fragment",
							"@type": XSD.string,
						} ],
					} ],
				} );
			} );

			it( "should send converted JSONLD when from URI", async () => {
				stubRequest( "https://example.com/resource/" );

				const resource:CRUDDocument = createMock();
				resource._context
					.extendObjectSchema( {
						"@vocab": "https://example.com/ns#",
					} )
				;

				await resource.createAccessPointAndRetrieve( "resource/", {
					hasMemberRelation: "relation",
					string: "my object",
					pointerSet: [
						{ id: "_:1", string: "blank node" },
						{ slug: "fragment", string: "named fragment" },
					],
				} );

				const request:JasmineAjaxRequest = jasmine.Ajax.requests.mostRecent();
				expect( JSON.parse( request.params ) ).toEqual( {
					"@id": "",
					"@graph": [ {
						"@id": "",
						"@type": [ LDP.DirectContainer ],
						[ LDP.hasMemberRelation ]: [ {
							"@id": "https://example.com/ns#relation",
						} ],
						[ LDP.membershipResource ]: [ {
							"@id": "https://example.com/resource/",
						} ],
						"https://example.com/ns#string": [ {
							"@value": "my object",
							"@type": XSD.string,
						} ],
						"https://example.com/ns#pointerSet": [ {
							"@id": "_:1",
						}, {
							"@id": "#fragment",
						} ],
					}, {
						"@id": "_:1",
						"https://example.com/ns#string": [ {
							"@value": "blank node",
							"@type": XSD.string,
						} ],
					}, {
						"@id": "#fragment",
						"https://example.com/ns#string": [ {
							"@value": "named fragment",
							"@type": XSD.string,
						} ],
					} ],
				} );
			} );

			it( "should return same object reference", async () => {
				stubRequest( "https://example.com/" );

				const resource:CRUDDocument = createMock();
				const child:BaseAccessPoint = { hasMemberRelation: "relation" };

				const returned:AccessPoint = await resource.createAccessPointAndRetrieve( child );

				expect( child ).toBe( returned );
			} );

			it( "should have stored the access point in the registry", async () => {
				stubRequest( "https://example.com/" );

				const resource:CRUDDocument = createMock();
				const returned:CRUDDocument = await resource.createAccessPointAndRetrieve( { hasMemberRelation: "relation" } );

				expect( resource._registry.hasPointer( returned.id ) ).toBe( true );
				expect( resource._registry.getPointer( returned.id ) ).toBe( returned );
			} );

			it( "should throw error if access point is already persisted", async () => {
				const child:BaseAccessPoint = PersistedResource.decorate( {
					hasMemberRelation: "relation",
				} );
				const resource:CRUDDocument = createMock();

				try {
					await resource.createAccessPointAndRetrieve( child );
					fail( "Should not resolve" );
				} catch( error ) {
					expect( () => { throw error; } )
						.toThrowError( IllegalArgumentError, "The access-point provided has already been persisted." );
				}
			} );

			it( "should throw error if access point already being persisted", async () => {
				const child:BaseAccessPoint = { hasMemberRelation: "relation" };
				const resource:CRUDDocument = createMock();

				try {
					await Promise.all( [
						resource.createAccessPointAndRetrieve( child ),
						resource.createAccessPointAndRetrieve( child ),
					] );
					fail( "Should not resolve" );
				} catch( error ) {
					expect( () => { throw error; } )
						.toThrowError( IllegalArgumentError, "The document is already being persisted." );
				}
			} );

			it( "should be able to resend access point after a failed request", async () => {
				const resource:CRUDDocument = createMock();

				const child:BaseAccessPoint = { hasMemberRelation: "relation" };
				try {
					stubRequest( "https://example.com/", { status: 500 } );
					await resource.createAccessPointAndRetrieve( child );

				} catch( error ) {
					stubRequest( "https://example.com/" );
					await resource.createAccessPointAndRetrieve( child );

					expect().nothing();
				}
			} );

			it( "should throw error if incorrect membershipResource", async () => {
				const child:BaseAccessPoint = {
					hasMemberRelation: "relation",
					membershipResource: Pointer.create( { id: "https://example.com/another-resource/" } ),
				};
				const resource:CRUDDocument = createMock();

				try {
					await resource.createAccessPointAndRetrieve( child );
					fail( "Should not resolve" );
				} catch( error ) {
					expect( () => { throw error; } )
						.toThrowError( IllegalArgumentError, "The endpoint URI must be the same as the accessPoint's membershipResource." );
				}
			} );

			it( "should add resolved PersistedDocument data", async () => {
				stubRequest( "https://example.com/" );

				const resource:CRUDDocument = createMock();
				const returned:CRUDDocument = await resource.createAccessPointAndRetrieve( { hasMemberRelation: "relation" } );

				expect( returned ).toEqual( jasmine.objectContaining( {
					_resolved: true,
					id: "https://example.com/access-point-1/",
				} ) );
			} );

			it( "should add & update parsed AccessPoint data", async () => {
				stubRequest( "https://example.com/" );

				const resource:CRUDDocument = createMock();
				const returned:CRUDDocument = await resource.createAccessPointAndRetrieve( { hasMemberRelation: "relation" } );

				expect( returned ).toEqual( jasmine.objectContaining( {
					types: jasmine.arrayContaining( [
						LDP.DirectContainer,
						C.AccessPoint,
					] ) as any as string[],
					hasMemberRelation: jasmine.objectContaining<Pointer>( {
						id: "https://example.com/ns#relation",
					} ) as any,
					membershipResource: jasmine.objectContaining<Pointer>( {
						id: "https://example.com/",
					} ) as any,
				} ) );
			} );

			it( "should update the child data", async () => {
				const resource:CRUDDocument = createMock();
				resource._context
					.extendObjectSchema( { "@vocab": "https://example.com/ns#" } );

				type MyResource = { string:string, pointerSet?:MyResource[] };
				const promise:Promise<CRUDDocument & MyResource> = resource.createAndRetrieve( {
					string: "document",
					pointerSet: [
						{
							id: "_:1",
							string: "blank node",
							pointerSet: [],
						},
						{
							slug: "fragment",
							string: "named fragment",
						},
						{
							id: "_:2",
							string: "to be removed",
						},
					],
				} );


				jasmine.Ajax
					.requests
					.filter( "https://example.com/" )
					.forEach( ( request, index ) => {
						request.respondWith( generateResponseOptions( "https://example.com/", {
							index,
							resource: {
								"https://example.com/ns#string": "updated document",
								"https://example.com/ns#pointerSet": [
									{ "@id": "_:1" },
									{ "@id": "#fragment" },
								],
							},
							fragments: [ {
								"@id": "_:1",
								"https://example.com/ns#string": "updated blank node",
								"https://example.com/ns#pointerSet": [
									{ "@id": "#2" },
								],
							}, {
								"@id": "#fragment",
								"https://example.com/ns#string": "updated named fragment",
							}, {
								"@id": "#2",
								"https://example.com/ns#string": "new named fragment",
							} ],
						} ) );
					} )
				;


				const returned:CRUDDocument & MyResource = await promise;
				expect( returned as MyResource ).toEqual( jasmine.objectContaining( {
					string: "updated document",
					pointerSet: [
						{
							string: "updated blank node",
							pointerSet: [
								{
									string: "new named fragment",
								},
							],
						},
						{
							string: "updated named fragment",
						},
					],
				} ) );
				expect( returned.hasPointer( "_:2" ) ).toBe( false );
			} );

			it( "should update blank nodes when response metadata returned", async () => {
				stubRequest( "https://example.com/", {
					resource: {
						"https://example.com/ns#blankNode1": [ { "@id": "_:new-1" } ],
						"https://example.com/ns#blankNode2": [ { "@id": "_:new-2" } ],
					},
					fragments: [
						{
							"@id": "_:new-1",
							"https://example.com/ns#string": [ { "@value": "updated blank node 1" } ],
						},
						{
							"@id": "_:new-2",
							"https://example.com/ns#string": [ { "@value": "updated blank node 2" } ],
						},
					],
					frees: [
						{
							"@id": "_:responseMetadata",
							"@type": [ C.VolatileResource, C.ResponseMetadata ],
							[ C.documentMetadata ]: [ {
								"@id": "_:documentMetadata",
							} ],
						},
						{
							"@id": "_:documentMetadata",
							"@type": [ C.VolatileResource, C.DocumentMetadata ],
							[ C.relatedDocument ]: [ {
								"@id": "https://example.com/access-point-1/",
							} ],
							[ C.bNodesMap ]: [ {
								"@id": "_:map",
							} ],
						},
						{
							"@id": "_:map",
							"@type": [ C.Map ],
							[ C.entry ]: [
								{ "@id": "_:entry-1" },
								{ "@id": "_:entry-2" },
							],
						},
						{
							"@id": "_:entry-1",
							[ C.entryKey ]: [ {
								"@id": "_:1",
							} ],
							[ C.entryValue ]: [ {
								"@id": "_:new-1",
							} ],
						},
						{
							"@id": "_:entry-2",
							[ C.entryKey ]: [ {
								"@id": "_:2",
							} ],
							[ C.entryValue ]: [ {
								"@id": "_:new-2",
							} ],
						},
					],
				} );

				const resource:CRUDDocument = createMock();
				resource._context
					.extendObjectSchema( { "@vocab": "https://example.com/ns#" } );

				type BNode = { id:string, string:string };
				type MyDoc = { blankNode1:BNode, blankNode2:BNode };

				const returned:CRUDDocument & MyDoc = await resource.createAccessPointAndRetrieve<MyDoc>( {
					hasMemberRelation: "relation",
					blankNode1: {
						id: "_:1",
						string: "blank node 1",
					},
					blankNode2: {
						id: "_:2",
						string: "blank node 2",
					},
				} );

				expect( returned.hasPointer( "_:1" ) ).toBe( false );
				expect( returned.blankNode1 ).toEqual( jasmine.objectContaining( {
					id: "_:new-1",
					string: "updated blank node 1",
				} ) );

				expect( returned.hasPointer( "_:2" ) ).toBe( false );
				expect( returned.blankNode2 ).toEqual( jasmine.objectContaining( {
					id: "_:new-2",
					string: "updated blank node 2",
				} ) );
			} );

		} );

		describe( method( OBLIGATORY, "createAccessPointsAndRetrieve" ), () => {

			it( hasSignature(
				[ "T extends object" ],
				"Persists multiple the access points as children of the current document and retrieves the updated data from the server.", [
					{ name: "accessPoints", type: "(T & CarbonLDP.BaseAccessPoint)[]", description: "The access points to persist." },
					{ name: "requestOptions", type: "CarbonLDP.HTTP.RequestOptions", optional: true, description: "Customizable options for the request." },
				],
				{ type: "Promise<T & CarbonLDP.ProtectedDocument>" }
			), ():void => {} );

			it( hasSignature(
				[ "T extends object" ],
				"Persists multiple the access points with the slug specified as children of the current document and retrieves the updated data from the server.", [
					{ name: "accessPoints", type: "(T & CarbonLDP.BaseAccessPoint)[]", description: "The access points to persist." },
					{ name: "slugs", type: "string[]", description: "Array with the slugs that corresponds to each object in `accessPoints` parameter, in the order in which they were defined. If an element in the array is undefined or null, the slug will be generated by the platform." },
					{ name: "requestOptions", type: "CarbonLDP.HTTP.RequestOptions", optional: true, description: "Customizable options for the request." },
				],
				{ type: "Promise<T & CarbonLDP.ProtectedDocument>" }
			), ():void => {} );

			it( hasSignature(
				[ "T extends object" ],
				"Persists multiple the access points as children of the uri specified and retrieves the updated data from the server.", [
					{ name: "uri", type: "string", description: "URI of the document where to create the child." },
					{ name: "accessPoints", type: "(T & CarbonLDP.BaseAccessPoint)[]", description: "The access points to persist." },
					{ name: "requestOptions", type: "CarbonLDP.HTTP.RequestOptions", optional: true, description: "Customizable options for the request." },
				],
				{ type: "Promise<T & CarbonLDP.ProtectedDocument>" }
			), ():void => {} );

			it( hasSignature(
				[ "T extends object" ],
				"Persists multiple the access points with the slug specified as children of the uri specified and retrieves the updated data from the server.", [
					{ name: "uri", type: "string", description: "URI of the document where to create the child." },
					{ name: "accessPoints", type: "(T & CarbonLDP.BaseAccessPoint)[]", description: "The access points to persist." },
					{ name: "slugs", type: "string[]", description: "Array with the slugs that corresponds to each object in `accessPoints` parameter, in the order in which they were defined. If an element in the array is undefined or null, the slug will be generated by the platform." },
					{ name: "requestOptions", type: "CarbonLDP.HTTP.RequestOptions", optional: true, description: "Customizable options for the request." },
				],
				{ type: "Promise<T & CarbonLDP.ProtectedDocument>" }
			), ():void => {} );

			it( "should exists", ():void => {
				const resource:CRUDDocument = createMock();

				expect( resource.createAccessPointsAndRetrieve ).toBeDefined();
				expect( resource.createAccessPointsAndRetrieve ).toEqual( jasmine.any( Function ) );
			} );


			function generateResponseOptions( url:string, options:{ index:number, status?:number, headers?:{ [ key:string ]:string }, frees?:object[], resource?:object, fragments?:object[] } ):JasmineAjaxRequestStubReturnOptions {
				const status:number = options.status !== void 0 ?
					options.status : 200;

				// noinspection JSMismatchedCollectionQueryUpdate
				const headers:{ [ key:string ]:string } = options.headers ?
					options.headers : {};


				const frees:object[] = options.frees ?
					options.frees : [];

				const resource:object = options.resource ?
					options.resource : {};
				const fragments:object[] = options.fragments ?
					options.fragments : [];

				return {
					status: status,
					responseHeaders: {
						"preference-applied": "return=representation",
						"eTag": `"${ options.index }-12345"`,
						"location": `${ url }access-point-${ options.index }/`,
						...headers,
					},
					responseText: JSON.stringify( [
						...frees,
						{
							"@id": `${ url }access-point-${ options.index }/`,
							"@graph": [
								{
									"@id": `${ url }access-point-${ options.index }/`,
									"@type": [ LDP.DirectContainer, C.AccessPoint ],
									[ LDP.hasMemberRelation ]: [ {
										"@id": `https://example.com/ns#relation${ options.index }`,
									} ],
									[ LDP.membershipResource ]: [ {
										"@id": url,
									} ],
									...resource,
								},
								...fragments,
							],
						},
					] ),
				};
			}

			function stubRequest( url:string, options:{ status?:number, headers?:{ [ key:string ]:string }, frees?:object[], resource?:object, fragments?:object[] } = {} ):void {
				const responseOptions:typeof options & { index:number } = Object
					.assign( { index: 1, status: 200 }, options );

				jasmine.Ajax
					.stubRequest( url, null, "POST" )
					.andReturn( generateResponseOptions( url, responseOptions ) );
			}


			it( "should throw error when _registry undefined", async () => {
				try {
					const resource:CRUDDocument = createMock( { _registry: void 0 } );
					await resource.createAccessPointsAndRetrieve( [ { hasMemberRelation: "relation" } ] );
				} catch( e ) {
					expect( () => { throw e; } )
						.toThrowError( IllegalActionError, `"https://example.com/" doesn't support CRUD requests.` );
				}
			} );

			it( "should parse error response", async () => {
				const resource:CRUDDocument = createMock( { id: "https://example.com/500/" } );

				const spy:jasmine.Spy = spyOn( resource._registry, "_parseErrorResponse" )
					.and.callFake( () => Promise.reject( null ) );

				try {
					await resource.createAccessPointsAndRetrieve( [ { hasMemberRelation: "relation" } ] );
					fail( "Should not createAccessPointsAndRetrieve" );
				} catch( error ) {
					if( error ) fail( error );

					expect( spy ).toHaveBeenCalled();
				}
			} );


			it( "should request from self when no URI", async () => {
				stubRequest( "https://example.com/" );

				const resource:CRUDDocument = createMock();
				await resource.createAccessPointsAndRetrieve( [ { hasMemberRelation: "relation" } ] );

				const request:JasmineAjaxRequest = jasmine.Ajax.requests.mostRecent();
				expect( request.url ).toBe( "https://example.com/" );
			} );

			it( "should request from URI", async () => {
				stubRequest( "https://example.com/another-resource/" );

				const resource:CRUDDocument = createMock();
				await resource.createAccessPointsAndRetrieve( "https://example.com/another-resource/", [ { hasMemberRelation: "relation" } ] );

				const request:JasmineAjaxRequest = jasmine.Ajax.requests.mostRecent();
				expect( request.url ).toBe( "https://example.com/another-resource/" );
			} );

			it( "should request from relative URI", async () => {
				stubRequest( "https://example.com/relative/" );

				const resource:CRUDDocument = createMock();
				await resource.createAccessPointsAndRetrieve( "relative/", [ { hasMemberRelation: "relation" } ] );

				const request:JasmineAjaxRequest = jasmine.Ajax.requests.mostRecent();
				expect( request.url ).toBe( "https://example.com/relative/" );
			} );

			it( "should request from resolved prefixed name", async () => {
				stubRequest( "https://example.com/resource/" );

				const _context:CarbonLDP = new CarbonLDP( "https://example.com/" );
				_context.extendObjectSchema( { "ex": "https://example.com/" } );

				const resource:CRUDDocument = createMock( { _context } );
				await resource.createAccessPointsAndRetrieve( "ex:resource/", [ { hasMemberRelation: "relation" } ] );

				const request:JasmineAjaxRequest = jasmine.Ajax.requests.mostRecent();
				expect( request.url ).toBe( "https://example.com/resource/" );
			} );

			it( "should throw error when from URI outside context scope", async () => {
				const resource:CRUDDocument = createMock();

				await resource
					.createAccessPointsAndRetrieve( "https://example.org/resource/", [ { hasMemberRelation: "relation" } ] )
					.catch( error => {
						expect( () => { throw error; } )
							.toThrowError( IllegalArgumentError, `"https://example.org/resource/" is out of scope.` );
					} )
				;
			} );

			it( "should throw error when from URI is BNode label", async () => {
				const resource:CRUDDocument = createMock();

				await resource
					.createAccessPointsAndRetrieve( "_:1", [ { hasMemberRelation: "relation" } ] )
					.catch( error => {
						expect( () => { throw error; } )
							.toThrowError( IllegalArgumentError, `"_:1" (Blank Node) can't be fetched directly.` );
					} )
				;
			} );

			it( "should throw error when from URI is Named Fragment label", async () => {
				const resource:CRUDDocument = createMock();

				await resource
					.createAccessPointsAndRetrieve( "#fragment", [ { hasMemberRelation: "relation" } ] )
					.catch( error => {
						expect( () => { throw error; } )
							.toThrowError( IllegalArgumentError, `"https://example.com/#fragment" (Named Fragment) can't be fetched directly.` );
					} )
				;
			} );

			it( "should throw error when unresolved prefixed name", async () => {
				const resource:CRUDDocument = createMock();

				await resource
					.createAccessPointsAndRetrieve( "ex:resource/", [ { hasMemberRelation: "relation" } ] )
					.catch( error => {
						expect( () => { throw error; } )
							.toThrowError( IllegalArgumentError, `"ex:resource/" is out of scope.` );
					} )
				;
			} );

			it( "should throw error if any has incorrect membershipResource", async () => {
				const child:BaseAccessPoint = {
					hasMemberRelation: "relation",
					membershipResource: Pointer.create( { id: "https://example.com/another-resource/" } ),
				};
				const resource:CRUDDocument = createMock();

				try {
					await resource.createAccessPointsAndRetrieve( [ child ] );
					fail( "Should not resolve" );
				} catch( error ) {
					expect( () => { throw error; } )
						.toThrowError( IllegalArgumentError, "The endpoint URI must be the same as the accessPoint's membershipResource." );
				}
			} );


			it( "should send basic request headers when from self", async () => {
				const resource:CRUDDocument = createMock();

				// noinspection JSIgnoredPromiseFromCall
				resource.createAccessPointsAndRetrieve( [ { hasMemberRelation: "relation" }, { hasMemberRelation: "relation" } ] );

				const firstRequest:JasmineAjaxRequest = jasmine.Ajax.requests.at( 0 );
				expect( firstRequest.requestHeaders ).toEqual( {
					"accept": "application/ld+json",
					"content-type": "application/ld+json",
					"prefer": [
						"return=representation",
						`${ LDP.RDFSource }; rel=interaction-model`,
					].join( ", " ),
				} );

				const secondRequest:JasmineAjaxRequest = jasmine.Ajax.requests.at( 1 );
				expect( secondRequest.requestHeaders ).toEqual( {
					"accept": "application/ld+json",
					"content-type": "application/ld+json",
					"prefer": [
						"return=representation",
						`${ LDP.RDFSource }; rel=interaction-model`,
					].join( ", " ),
				} );
			} );

			it( "should send basic request headers when from URI", async () => {
				const resource:CRUDDocument = createMock();

				// noinspection JSIgnoredPromiseFromCall
				resource.createAccessPointsAndRetrieve( "resource/", [ { hasMemberRelation: "relation" }, { hasMemberRelation: "relation" } ] );


				const firstRequest:JasmineAjaxRequest = jasmine.Ajax.requests.at( 0 );
				expect( firstRequest.requestHeaders ).toEqual( {
					"accept": "application/ld+json",
					"content-type": "application/ld+json",
					"prefer": [
						"return=representation",
						`${ LDP.RDFSource }; rel=interaction-model`,
					].join( ", " ),
				} );

				const secondRequest:JasmineAjaxRequest = jasmine.Ajax.requests.at( 1 );
				expect( secondRequest.requestHeaders ).toEqual( {
					"accept": "application/ld+json",
					"content-type": "application/ld+json",
					"prefer": [
						"return=representation",
						`${ LDP.RDFSource }; rel=interaction-model`,
					].join( ", " ),
				} );
			} );

			it( "should add authentication header", async () => {
				stubRequest( "https://example.com/" );

				const resource:CRUDDocument = createMock();

				const spy:jasmine.Spy = spyOn( resource._context.auth, "addAuthentication" );

				await resource.createAccessPointsAndRetrieve( [ { hasMemberRelation: "relation" } ] );

				expect( spy ).toHaveBeenCalled();
			} );

			it( "should send custom request headers when from self", async () => {
				const resource:CRUDDocument = createMock();

				// noinspection JSIgnoredPromiseFromCall
				resource.createAccessPointsAndRetrieve( [ { hasMemberRelation: "relation" }, { hasMemberRelation: "relation" } ], {
					headers: new Map()
						.set( "custom", new Header( "custom value" ) )
					,
				} );

				const firstRequest:JasmineAjaxRequest = jasmine.Ajax.requests.at( 0 );
				expect( firstRequest.requestHeaders ).toEqual( jasmine.objectContaining( {
					"custom": "custom value",
				} ) );

				const secondRequest:JasmineAjaxRequest = jasmine.Ajax.requests.at( 1 );
				expect( secondRequest.requestHeaders ).toEqual( jasmine.objectContaining( {
					"custom": "custom value",
				} ) );
			} );

			it( "should send custom request headers when from URI", async () => {
				const resource:CRUDDocument = createMock();

				// noinspection JSIgnoredPromiseFromCall
				resource.createAccessPointsAndRetrieve( "resource/", [ { hasMemberRelation: "relation" }, { hasMemberRelation: "relation" } ], {
					headers: new Map()
						.set( "custom", new Header( "custom value" ) )
					,
				} );

				const firstRequest:JasmineAjaxRequest = jasmine.Ajax.requests.at( 0 );
				expect( firstRequest.requestHeaders ).toEqual( jasmine.objectContaining( {
					"custom": "custom value",
				} ) );

				const secondRequest:JasmineAjaxRequest = jasmine.Ajax.requests.at( 1 );
				expect( secondRequest.requestHeaders ).toEqual( jasmine.objectContaining( {
					"custom": "custom value",
				} ) );
			} );

			it( "should add slug header when from self", async () => {
				const resource:CRUDDocument = createMock();

				// noinspection JSIgnoredPromiseFromCall
				resource.createAccessPointsAndRetrieve( [ { hasMemberRelation: "relation" }, { hasMemberRelation: "relation" } ], [ "child-slug-1", "child-slug-2" ] );

				const firstRequest:JasmineAjaxRequest = jasmine.Ajax.requests.at( 0 );
				expect( firstRequest.requestHeaders ).toEqual( jasmine.objectContaining( {
					"slug": "child-slug-1",
				} ) );

				const secondRequest:JasmineAjaxRequest = jasmine.Ajax.requests.at( 1 );
				expect( secondRequest.requestHeaders ).toEqual( jasmine.objectContaining( {
					"slug": "child-slug-2",
				} ) );
			} );

			it( "should add slug header when from URI", async () => {
				const resource:CRUDDocument = createMock();

				// noinspection JSIgnoredPromiseFromCall
				resource.createAccessPointsAndRetrieve( "resource/", [ { hasMemberRelation: "relation" }, { hasMemberRelation: "relation" } ], [ "child-slug-1", "child-slug-2" ] );

				const firstRequest:JasmineAjaxRequest = jasmine.Ajax.requests.at( 0 );
				expect( firstRequest.requestHeaders ).toEqual( jasmine.objectContaining( {
					"slug": "child-slug-1",
				} ) );

				const secondRequest:JasmineAjaxRequest = jasmine.Ajax.requests.at( 1 );
				expect( secondRequest.requestHeaders ).toEqual( jasmine.objectContaining( {
					"slug": "child-slug-2",
				} ) );
			} );

			it( "should add slug header if defined", async () => {
				const resource:CRUDDocument = createMock();

				// noinspection JSIgnoredPromiseFromCall
				resource.createAccessPointsAndRetrieve( [ { hasMemberRelation: "relation" }, { hasMemberRelation: "relation" }, { hasMemberRelation: "relation" } ], [ null, undefined, "child-slug" ] );

				const firstRequest:JasmineAjaxRequest = jasmine.Ajax.requests.at( 0 );
				expect( firstRequest.requestHeaders ).not.toEqual( jasmine.objectContaining( {
					"slug": jasmine.anything() as any,
				} ) );

				const secondRequest:JasmineAjaxRequest = jasmine.Ajax.requests.at( 1 );
				expect( secondRequest.requestHeaders ).not.toEqual( jasmine.objectContaining( {
					"slug": jasmine.anything() as any,
				} ) );

				const thirdRequest:JasmineAjaxRequest = jasmine.Ajax.requests.at( 2 );
				expect( thirdRequest.requestHeaders ).toEqual( jasmine.objectContaining( {
					"slug": "child-slug",
				} ) );
			} );

			it( "should not add slug header when less slugs than access points", async () => {
				const resource:CRUDDocument = createMock();

				// noinspection JSIgnoredPromiseFromCall
				resource.createAccessPointsAndRetrieve( [ { hasMemberRelation: "relation" }, { hasMemberRelation: "relation" } ], [ "child-slug" ] );

				const firstRequest:JasmineAjaxRequest = jasmine.Ajax.requests.at( 0 );
				expect( firstRequest.requestHeaders ).toEqual( jasmine.objectContaining( {
					"slug": "child-slug",
				} ) );

				const secondRequest:JasmineAjaxRequest = jasmine.Ajax.requests.at( 1 );
				expect( secondRequest.requestHeaders ).not.toEqual( jasmine.objectContaining( {
					"slug": jasmine.anything() as any,
				} ) );
			} );


			it( "should send converted JSONLD when from self", async () => {
				stubRequest( "https://example.com/" );

				const resource:CRUDDocument = createMock();
				resource._context
					.extendObjectSchema( {
						"@vocab": "https://example.com/ns#",
					} )
				;

				// noinspection JSIgnoredPromiseFromCall
				resource.createAccessPointsAndRetrieve( [ {
					hasMemberRelation: "relation1",
					string: "my object 1",
				}, {
					hasMemberRelation: "relation2",
					string: "my object 2",
				} ] );

				const request1:JasmineAjaxRequest = jasmine.Ajax.requests.at( 0 );
				expect( JSON.parse( request1.params ) ).toEqual( {
					"@id": "",
					"@graph": [ {
						"@id": "",
						"@type": [ LDP.DirectContainer ],
						[ LDP.hasMemberRelation ]: [ {
							"@id": "https://example.com/ns#relation1",
						} ],
						[ LDP.membershipResource ]: [ {
							"@id": "https://example.com/",
						} ],
						"https://example.com/ns#string": [ {
							"@value": "my object 1",
							"@type": XSD.string,
						} ],
					} ],
				} );

				const request2:JasmineAjaxRequest = jasmine.Ajax.requests.at( 1 );
				expect( JSON.parse( request2.params ) ).toEqual( {
					"@id": "",
					"@graph": [ {
						"@id": "",
						"@type": [ LDP.DirectContainer ],
						[ LDP.hasMemberRelation ]: [ {
							"@id": "https://example.com/ns#relation2",
						} ],
						[ LDP.membershipResource ]: [ {
							"@id": "https://example.com/",
						} ],
						"https://example.com/ns#string": [ {
							"@value": "my object 2",
							"@type": XSD.string,
						} ],
					} ],
				} );
			} );

			it( "should send converted JSONLD when from URI", async () => {
				stubRequest( "https://example.com/resource/" );

				const resource:CRUDDocument = createMock();
				resource._context
					.extendObjectSchema( {
						"@vocab": "https://example.com/ns#",
					} )
				;

				// noinspection JSIgnoredPromiseFromCall
				resource.createAccessPointsAndRetrieve( "resource/", [ {
					hasMemberRelation: "relation1",
					string: "my object 1",
				}, {
					hasMemberRelation: "relation2",
					string: "my object 2",
				} ] );

				const request1:JasmineAjaxRequest = jasmine.Ajax.requests.at( 0 );
				expect( JSON.parse( request1.params ) ).toEqual( {
					"@id": "",
					"@graph": [ {
						"@id": "",
						"@type": [ LDP.DirectContainer ],
						[ LDP.hasMemberRelation ]: [ {
							"@id": "https://example.com/ns#relation1",
						} ],
						[ LDP.membershipResource ]: [ {
							"@id": "https://example.com/resource/",
						} ],
						"https://example.com/ns#string": [ {
							"@value": "my object 1",
							"@type": XSD.string,
						} ],
					} ],
				} );

				const request2:JasmineAjaxRequest = jasmine.Ajax.requests.at( 1 );
				expect( JSON.parse( request2.params ) ).toEqual( {
					"@id": "",
					"@graph": [ {
						"@id": "",
						"@type": [ LDP.DirectContainer ],
						[ LDP.hasMemberRelation ]: [ {
							"@id": "https://example.com/ns#relation2",
						} ],
						[ LDP.membershipResource ]: [ {
							"@id": "https://example.com/resource/",
						} ],
						"https://example.com/ns#string": [ {
							"@value": "my object 2",
							"@type": XSD.string,
						} ],
					} ],
				} );
			} );

			it( "should return same access point object references", async () => {
				const resource:CRUDDocument = createMock();

				const child1:BaseAccessPoint = { hasMemberRelation: "relation1" };
				const child2:BaseAccessPoint = { hasMemberRelation: "relation2" };
				const promise:Promise<AccessPoint[]> = resource.createAccessPointsAndRetrieve( [ child1, child2 ] );

				jasmine.Ajax
					.requests
					.filter( "https://example.com/" )
					.forEach( ( request, index ) => {
						request.respondWith( generateResponseOptions( "https://example.com/", { index } ) );
					} )
				;

				const [ returned1, returned2 ]:AccessPoint[] = await promise;
				expect( child1 ).toBe( returned1 );
				expect( child2 ).toBe( returned2 );
			} );

			it( "should have stored the access points in the registry", async () => {
				const resource:CRUDDocument = createMock();

				const child1:BaseAccessPoint = { hasMemberRelation: "relation1" };
				const child2:BaseAccessPoint = { hasMemberRelation: "relation2" };
				const promise:Promise<AccessPoint[]> = resource.createAccessPointsAndRetrieve( [ child1, child2 ] );

				jasmine.Ajax
					.requests
					.filter( "https://example.com/" )
					.forEach( ( request, index ) => {
						request.respondWith( generateResponseOptions( "https://example.com/", { index } ) );
					} )
				;

				const [ returned1, returned2 ]:AccessPoint[] = await promise;

				expect( resource._registry.hasPointer( returned1.id ) ).toBe( true );
				expect( resource._registry.getPointer( returned1.id ) ).toBe( returned1 );

				expect( resource._registry.hasPointer( returned2.id ) ).toBe( true );
				expect( resource._registry.getPointer( returned2.id ) ).toBe( returned2 );
			} );

			it( "should throw error if any access point is already persisted", async () => {
				const child:BaseAccessPoint = PersistedResource.decorate( {
					hasMemberRelation: "relation",
				} );
				const resource:CRUDDocument = createMock();

				try {
					await resource.createAccessPointsAndRetrieve( [ { hasMemberRelation: "relation" }, child, { hasMemberRelation: "relation" } ] );
					fail( "Should not resolve" );
				} catch( error ) {
					expect( () => { throw error; } )
						.toThrowError( IllegalArgumentError, "The access-point provided has already been persisted." );
				}
			} );

			it( "should throw error if any already being persisted", async () => {
				const child:BaseAccessPoint = { hasMemberRelation: "relation" };
				const resource:CRUDDocument = createMock();

				try {
					await Promise.all( [
						resource.createAccessPointsAndRetrieve( [ child ] ),
						resource.createAccessPointsAndRetrieve( [ child ] ),
					] );
					fail( "Should not resolve" );
				} catch( error ) {
					expect( () => { throw error; } )
						.toThrowError( IllegalArgumentError, "The document is already being persisted." );
				}
			} );


			it( "should add resolved PersistedDocument data", async () => {
				const resource:CRUDDocument = createMock();

				const child1:BaseAccessPoint = { hasMemberRelation: "relation1" };
				const child2:BaseAccessPoint = { hasMemberRelation: "relation2" };
				const promise:Promise<AccessPoint[]> = resource.createAccessPointsAndRetrieve( [ child1, child2 ] );

				jasmine.Ajax
					.requests
					.filter( "https://example.com/" )
					.forEach( ( request, index ) => {
						request.respondWith( generateResponseOptions( "https://example.com/", { index } ) );
					} )
				;

				const [ returned1, returned2 ]:AccessPoint[] = await promise;
				expect( returned1 ).toEqual( jasmine.objectContaining( {
					_resolved: true,
					_eTag: "\"0-12345\"",
					id: "https://example.com/access-point-0/",
				} ) );
				expect( returned2 ).toEqual( jasmine.objectContaining( {
					_resolved: true,
					_eTag: "\"1-12345\"",
					id: "https://example.com/access-point-1/",
				} ) );
			} );

			it( "should add parsed AccessPoint data", async () => {
				const resource:CRUDDocument = createMock();

				const child1:BaseAccessPoint = { hasMemberRelation: "relation1" };
				const child2:BaseAccessPoint = { hasMemberRelation: "relation2" };
				const promise:Promise<AccessPoint[]> = resource.createAccessPointsAndRetrieve( [ child1, child2 ] );

				jasmine.Ajax
					.requests
					.filter( "https://example.com/" )
					.forEach( ( request, index ) => {
						request.respondWith( generateResponseOptions( "https://example.com/", { index: ++ index } ) );
					} )
				;

				const [ returned1, returned2 ]:AccessPoint[] = await promise;
				expect( returned1 ).toEqual( jasmine.objectContaining( {
					types: jasmine.arrayContaining( [
						LDP.DirectContainer,
						C.AccessPoint,
					] ) as any as string[],
					hasMemberRelation: jasmine.objectContaining<Pointer>( {
						id: "https://example.com/ns#relation1",
					} ) as any,
					membershipResource: jasmine.objectContaining<Pointer>( {
						id: "https://example.com/",
					} ) as any,
				} ) );
				expect( returned2 ).toEqual( jasmine.objectContaining( {
					types: jasmine.arrayContaining( [
						LDP.DirectContainer,
						C.AccessPoint,
					] ) as any as string[],
					hasMemberRelation: jasmine.objectContaining<Pointer>( {
						id: "https://example.com/ns#relation2",
					} ) as any,
					membershipResource: jasmine.objectContaining<Pointer>( {
						id: "https://example.com/",
					} ) as any,
				} ) );
			} );

			it( "should update blank nodes when response metadata returned", async () => {
				stubRequest( "https://example.com/", {
					resource: {
						"https://example.com/ns#blankNode1": [ { "@id": "_:new-1" } ],
						"https://example.com/ns#blankNode2": [ { "@id": "_:new-2" } ],
					},
					fragments: [
						{
							"@id": "_:new-1",
							"https://example.com/ns#string": [ { "@value": "updated blank node 1" } ],
						},
						{
							"@id": "_:new-2",
							"https://example.com/ns#string": [ { "@value": "updated blank node 2" } ],
						},
					],
					frees: [
						{
							"@id": "_:responseMetadata",
							"@type": [ C.VolatileResource, C.ResponseMetadata ],
							[ C.documentMetadata ]: [ {
								"@id": "_:documentMetadata",
							} ],
						},
						{
							"@id": "_:documentMetadata",
							"@type": [ C.VolatileResource, C.DocumentMetadata ],
							[ C.relatedDocument ]: [ {
								"@id": "https://example.com/access-point-1/",
							} ],
							[ C.bNodesMap ]: [ {
								"@id": "_:map",
							} ],
						},
						{
							"@id": "_:map",
							"@type": [ C.Map ],
							[ C.entry ]: [
								{ "@id": "_:entry-1" },
								{ "@id": "_:entry-2" },
							],
						},
						{
							"@id": "_:entry-1",
							[ C.entryKey ]: [ {
								"@id": "_:1",
							} ],
							[ C.entryValue ]: [ {
								"@id": "_:new-1",
							} ],
						},
						{
							"@id": "_:entry-2",
							[ C.entryKey ]: [ {
								"@id": "_:2",
							} ],
							[ C.entryValue ]: [ {
								"@id": "_:new-2",
							} ],
						},
					],
				} );

				const resource:CRUDDocument = createMock();
				resource._context.extendObjectSchema( { "@vocab": "https://example.com/ns#" } );

				type BNode = { id:string, string:string };
				type MyDoc = { blankNode1:BNode, blankNode2:BNode };

				const [ returned ]:(CRUDDocument & MyDoc)[] = await resource.createAccessPointsAndRetrieve<MyDoc>( [ {
					hasMemberRelation: "relation",
					blankNode1: {
						id: "_:1",
						string: "blank node 1",
					},
					blankNode2: {
						id: "_:2",
						string: "blank node 2",
					},
				} ] );

				expect( returned.hasPointer( "_:1" ) ).toBe( false );
				expect( returned.blankNode1 ).toEqual( jasmine.objectContaining( {
					id: "_:new-1",
					string: "updated blank node 1",
				} ) );

				expect( returned.hasPointer( "_:2" ) ).toBe( false );
				expect( returned.blankNode2 ).toEqual( jasmine.objectContaining( {
					id: "_:new-2",
					string: "updated blank node 2",
				} ) );
			} );

		} );


		describe( method( OBLIGATORY, "save" ), () => {

			it( hasSignature(
				[ "T extends object" ],
				"Send the changes of the document to the server.", [
					{ name: "requestOptions", type: "CarbonLDP.HTTP.RequestOptions", optional: true, description: "Customizable options for the request." },
				],
				{ type: "Promise<T & CarbonLDP.Document>" }
			), () => {} );

			it( "should exists", ():void => {
				const resource:CRUDDocument = createMock();

				expect( resource.save ).toBeDefined();
				expect( resource.save ).toEqual( jasmine.any( Function ) );
			} );


			function stubRequest( url:string, options:{ status?:number, headers?:{ [ key:string ]:string }, frees?:object[], } = {} ):void {
				const status:number = options.status !== void 0 ?
					options.status :
					options.frees && options.frees.length ?
						200 :
						204
				;

				// noinspection JSMismatchedCollectionQueryUpdate
				const headers:{ [ key:string ]:string } = options.headers ?
					options.headers : {};


				const data:string | undefined = options.frees ?
					JSON.stringify( [
						...options.frees,
					] ) :
					void 0
				;

				jasmine.Ajax
					.stubRequest( url, null, "PATCH" )
					.andReturn( {
						status,
						responseHeaders: {
							...headers,
						},
						responseText: data,
					} );
			}


			it( "should throw error when _registry undefined", async () => {
				try {
					const resource:CRUDDocument = createMock( { _registry: void 0 } );
					await resource.save();
				} catch( e ) {
					expect( () => { throw e; } )
						.toThrowError( IllegalActionError, `"https://example.com/" doesn't support CRUD requests.` );
				}
			} );


			it( "should throw error when self ID is outside context scope", async () => {
				const resource:CRUDDocument = createMock( { id: "https://example.org/resource/" } );

				await resource
					.save()
					.catch( error => {
						expect( () => { throw error; } )
							.toThrowError( IllegalArgumentError, `"https://example.org/resource/" is out of scope.` );
					} )
				;
			} );

			it( "should throw error when self ID is BNode label", async () => {
				const resource:CRUDDocument = createMock( { id: "_:1" } );

				await resource
					.save()
					.catch( error => {
						expect( () => { throw error; } )
							.toThrowError( IllegalArgumentError, `"_:1" (Blank Node) can't be fetched directly.` );
					} )
				;
			} );

			it( "should throw error when self ID is Named Fragment label", async () => {
				const resource:CRUDDocument = createMock( { id: "https://example.com/#fragment" } );

				await resource
					.save()
					.catch( error => {
						expect( () => { throw error; } )
							.toThrowError( IllegalArgumentError, `"https://example.com/#fragment" (Named Fragment) can't be fetched directly.` );
					} )
				;
			} );

			it( "should throw error when self ID is unresolved prefixed name", async () => {
				const resource:CRUDDocument = createMock( { id: "ex:resource/" } );

				await resource
					.save()
					.catch( error => {
						expect( () => { throw error; } )
							.toThrowError( IllegalArgumentError, `"ex:resource/" is out of scope.` );
					} )
				;
			} );


			it( "should return self if no dirty", async () => {
				const resource:CRUDDocument = createMock( { id: "https://example.com/" } );
				const returned:CRUDDocument = await resource.save();

				expect( returned ).toBe( resource );
			} );

			it( "should send PATCH to self when dirty", async () => {
				const resource:CRUDDocument = createMock( { id: "https://example.com/" } );

				Object.defineProperty( resource, "isDirty", { writable: true } );
				spyOn( resource, "isDirty" ).and.returnValue( true );

				// noinspection JSIgnoredPromiseFromCall
				resource.save();

				const request:JasmineAjaxRequest = jasmine.Ajax.requests.mostRecent();
				expect( request.url ).toBe( "https://example.com/" );
				expect( request.method ).toBe( "PATCH" );
			} );

			it( "should parse error response", async () => {
				stubRequest( "https://example.com/", { status: 500 } );

				const resource:CRUDDocument = createMock( { id: "https://example.com/" } );

				Object.defineProperty( resource, "isDirty", { writable: true } );
				spyOn( resource, "isDirty" ).and.returnValue( true );

				const spy:jasmine.Spy = spyOn( resource._registry, "_parseErrorResponse" )
					.and.callFake( () => Promise.reject( null ) );

				try {
					await resource.save();
					fail( "Should not resolve" );
				} catch( error ) {
					if( error ) fail( error );

					expect( spy ).toHaveBeenCalled();
				}
			} );


			it( "should send basic request headers", async () => {
				const resource:CRUDDocument = createMock( {
					_eTag: "\"1-12345\"",
					id: "https://example.com/",
				} );

				Object.defineProperty( resource, "isDirty", { writable: true } );
				spyOn( resource, "isDirty" ).and.returnValue( true );

				// noinspection JSIgnoredPromiseFromCall
				resource.save();

				const request:JasmineAjaxRequest = jasmine.Ajax.requests.mostRecent();
				expect( request.requestHeaders ).toEqual( {
					"accept": "application/ld+json",
					"content-type": "text/ldpatch",
					"if-match": "\"1-12345\"",
					"prefer": "return=minimal",
				} );
			} );

			it( "should add authentication header", async () => {
				const resource:CRUDDocument = createMock();

				Object.defineProperty( resource, "isDirty", { writable: true } );
				spyOn( resource, "isDirty" ).and.returnValue( true );


				const spy:jasmine.Spy = spyOn( resource._context.auth, "addAuthentication" );

				// noinspection JSIgnoredPromiseFromCall
				resource.save();

				expect( spy ).toHaveBeenCalled();
			} );

			it( "should add custom headers in single self child", async () => {
				const resource:CRUDDocument = createMock();

				Object.defineProperty( resource, "isDirty", { writable: true } );
				spyOn( resource, "isDirty" ).and.returnValue( true );


				// noinspection JSIgnoredPromiseFromCall
				resource.save( {
					headers: new Map()
						.set( "custom", new Header( "custom value" ) )
					,
				} );

				const request:JasmineAjaxRequest = jasmine.Ajax.requests.mostRecent();
				expect( request.requestHeaders ).toEqual( jasmine.objectContaining( {
					"custom": "custom value",
				} ) );
			} );


			it( "should send update patch", async () => {
				stubRequest( "https://example.com/" );

				type MyDoc = {
					list:(string | number)[];
					pointer:BaseFragment & {
						string:string[];
						pointers:(BaseFragment & {
							string:string[];
							number:number;
						})[];
					};
				};
				const resource:CRUDDocument & MyDoc = createMock( {
					types: [ "https://example.com/ns#Document" ],
					list: [ 1, 2, 3, 4, 5 ],
					pointer: {
						id: "#fragment",
						types: [ "https://example.con/ns#Fragment" ],
						string: [ "string 1", "string 2" ],
						pointers: [
							{
								id: "_:blank-node",
								types: [ "https://example.con/ns#Fragment", "https://example.com/ns#BlankNode" ],
								string: [ "string 1" ],
								number: 100,
							},
							{
								id: "_:to-delete",
								types: [ "https://example.con/ns#Fragment", "https://example.com/ns#BlankNode" ],
								string: [ "string --" ],
								number: - 100,
							},
						],
					},
				} );


				resource._normalize();
				resource._syncSnapshot();
				resource._syncSavedFragments();
				resource._context
					.extendObjectSchema( {
						"@vocab": "https://example.com/ns#",
						"xsd": XSD.namespace,
					} )
					.extendObjectSchema( "https://example.com/ns#Document", {
						"list": {
							"@container": "@list",
						},
						"pointer": {
							"@type": "@id",
						},
					} )
					.extendObjectSchema( "https://example.com/ns#Fragment", {
						"string": {
							"@type": XSD.string,
							"@container": "@set",
						},
						"pointer": {
							"@type": "@id",
						},
					} )
					.extendObjectSchema( "https://example.com/ns#BlankNode", {
						"number": {
							"@type": XSD.integer,
						},
					} );


				resource.addType( "NewType" );
				resource.list = [ 4, 1, 2, "s-1", "s-2", "s-3", 3 ];
				resource.pointer.string = [ "string 2", "string 3" ];
				resource.pointer.pointers[ 0 ].string = [ "string 1", "string -1" ];
				resource.pointer.pointers[ 0 ].number = 100.001;
				resource.pointer.pointers.splice( 1, 1 );

				await resource.save();

				const request:JasmineAjaxRequest = jasmine.Ajax.requests.mostRecent();
				expect( request.params ).toBe( "" +
					`@prefix xsd: <${ XSD.namespace }>. ` +
					`UpdateList <https://example.com/> <https://example.com/ns#list> 3..5 (). ` +
					`UpdateList <https://example.com/> <https://example.com/ns#list> 0..0 ( "4"^^xsd:float ). ` +
					`UpdateList <https://example.com/> <https://example.com/ns#list> 3..3 ( "s-1" "s-2" "s-3" ). ` +
					`Add { ` +
					`` + `<https://example.com/> a <https://example.com/ns#NewType>. ` +
					`` + `<https://example.com/#fragment> <https://example.com/ns#string> "string 3". ` +
					`` + `_:blank-node <https://example.com/ns#string> "string -1". ` +
					`}. ` +
					`Delete { ` +
					`` + `<https://example.com/#fragment> <https://example.com/ns#string> "string 1"; ` +
					`` + `` + `<https://example.com/ns#pointers> _:to-delete. ` +
					`` + `_:to-delete a <https://example.con/ns#Fragment>, <https://example.com/ns#BlankNode>; ` +
					`` + `` + `<https://example.com/ns#string> "string --"; ` +
					`` + `` + `<https://example.com/ns#number> "-100"^^xsd:integer. ` +
					`}.` +
					``
				);
			} );

			it( "should update blank nodes when response metadata returned", async () => {
				stubRequest( "https://example.com/", {
					frees: [
						{
							"@id": "_:responseMetadata",
							"@type": [ C.VolatileResource, C.ResponseMetadata ],
							[ C.documentMetadata ]: [ {
								"@id": "_:documentMetadata",
							} ],
						},
						{
							"@id": "_:documentMetadata",
							"@type": [ C.VolatileResource, C.DocumentMetadata ],
							[ C.relatedDocument ]: [ {
								"@id": "https://example.com/",
							} ],
							[ C.bNodesMap ]: [ {
								"@id": "_:map",
							} ],
						},
						{
							"@id": "_:map",
							"@type": [ C.Map ],
							[ C.entry ]: [
								{ "@id": "_:entry-1" },
								{ "@id": "_:entry-2" },
							],
						},
						{
							"@id": "_:entry-1",
							[ C.entryKey ]: [ {
								"@id": "_:1",
							} ],
							[ C.entryValue ]: [ {
								"@id": "_:new-1",
							} ],
						},
						{
							"@id": "_:entry-2",
							[ C.entryKey ]: [ {
								"@id": "_:2",
							} ],
							[ C.entryValue ]: [ {
								"@id": "_:new-2",
							} ],
						},
					],
				} );

				const resource:CRUDDocument & MyDoc = createMock( {
					blankNode1: {
						id: "_:1",
						string: "blank node 1",
					},
					blankNode2: {
						id: "_:2",
						string: "blank node 2",
					},
				} );
				resource._registry._resourcesMap.set( "", resource as any );

				type BNode = { id:string, string:string };
				type MyDoc = { blankNode1:BNode, blankNode2:BNode };

				const returned:CRUDDocument & MyDoc = await resource.save();

				expect( returned.hasPointer( "_:1" ) ).toBe( false );
				expect( returned.blankNode1 ).toEqual( jasmine.objectContaining( {
					id: "_:new-1",
					string: "blank node 1",
				} ) );

				expect( returned.hasPointer( "_:2" ) ).toBe( false );
				expect( returned.blankNode2 ).toEqual( jasmine.objectContaining( {
					id: "_:new-2",
					string: "blank node 2",
				} ) );
			} );

		} );

		describe( method( OBLIGATORY, "saveAndRefresh" ), () => {

			it( hasSignature(
				[ "T extends object" ],
				"Send the changes of the document and retrieves the updated data from the server.", [
					{ name: "requestOptions", type: "CarbonLDP.HTTP.RequestOptions", optional: true, description: "Customizable options for the request." },
				],
				{ type: "Promise<T & CarbonLDP.Document>" }
			), () => {} );

			it( "should exists", ():void => {
				const resource:CRUDDocument = createMock();

				expect( resource.saveAndRefresh ).toBeDefined();
				expect( resource.saveAndRefresh ).toEqual( jasmine.any( Function ) );
			} );


			function stubRequest( url:string, options:{ status?:number, headers?:{ [ key:string ]:string }, frees?:object[], resource?:object, fragments?:object[] } = {} ):void {
				const status:number = options.status !== void 0 ?
					options.status : 200;

				// noinspection JSMismatchedCollectionQueryUpdate
				const headers:{ [ key:string ]:string } = options.headers ?
					options.headers : {};


				const frees:object[] = options.frees ?
					options.frees : [];

				const resource:object = options.resource ?
					options.resource : {};

				const fragments:object[] = options.fragments ?
					options.fragments : [];

				jasmine.Ajax
					.stubRequest( url, null, "PATCH" )
					.andReturn( {
						status,
						responseHeaders: {
							"preference-applied": "return=representation",
							"eTag": `"1-12345"`,
							...headers,
						},
						responseText: JSON.stringify( [
							...frees,
							{
								"@id": `${ url }`,
								"@graph": [
									{
										"@id": `${ url }`,
										...resource,
									},
									...fragments,
								],
							},
						] ),
					} );
			}


			it( "should throw error when _registry undefined", async () => {
				try {
					const resource:CRUDDocument = createMock( { _registry: void 0 } );
					await resource.saveAndRefresh();
				} catch( e ) {
					expect( () => { throw e; } )
						.toThrowError( IllegalActionError, `"https://example.com/" doesn't support CRUD requests.` );
				}
			} );


			it( "should throw error when self ID is outside context scope", async () => {
				const resource:CRUDDocument = createMock( { id: "https://example.org/resource/" } );

				await resource
					.saveAndRefresh()
					.catch( error => {
						expect( () => { throw error; } )
							.toThrowError( IllegalArgumentError, `"https://example.org/resource/" is out of scope.` );
					} )
				;
			} );

			it( "should throw error when self ID is BNode label", async () => {
				const resource:CRUDDocument = createMock( { id: "_:1" } );

				await resource
					.saveAndRefresh()
					.catch( error => {
						expect( () => { throw error; } )
							.toThrowError( IllegalArgumentError, `"_:1" (Blank Node) can't be fetched directly.` );
					} )
				;
			} );

			it( "should throw error when self ID is Named Fragment label", async () => {
				const resource:CRUDDocument = createMock( { id: "https://example.com/#fragment" } );

				await resource
					.saveAndRefresh()
					.catch( error => {
						expect( () => { throw error; } )
							.toThrowError( IllegalArgumentError, `"https://example.com/#fragment" (Named Fragment) can't be fetched directly.` );
					} )
				;
			} );

			it( "should throw error when self ID is unresolved prefixed name", async () => {
				const resource:CRUDDocument = createMock( { id: "ex:resource/" } );

				await resource
					.saveAndRefresh()
					.catch( error => {
						expect( () => { throw error; } )
							.toThrowError( IllegalArgumentError, `"ex:resource/" is out of scope.` );
					} )
				;
			} );


			it( "should return self if no dirty", async () => {
				const resource:CRUDDocument = createMock( { id: "https://example.com/" } );
				const returned:CRUDDocument = await resource.saveAndRefresh();

				expect( returned ).toBe( resource );
			} );

			it( "should send PATCH to self when dirty", async () => {
				const resource:CRUDDocument = createMock( { id: "https://example.com/" } );

				Object.defineProperty( resource, "isDirty", { writable: true } );
				spyOn( resource, "isDirty" ).and.returnValue( true );

				// noinspection JSIgnoredPromiseFromCall
				resource.saveAndRefresh();

				const request:JasmineAjaxRequest = jasmine.Ajax.requests.mostRecent();
				expect( request.url ).toBe( "https://example.com/" );
				expect( request.method ).toBe( "PATCH" );
			} );

			it( "should parse error response", async () => {
				stubRequest( "https://example.com/", { status: 500 } );

				const resource:CRUDDocument = createMock( { id: "https://example.com/" } );

				Object.defineProperty( resource, "isDirty", { writable: true } );
				spyOn( resource, "isDirty" ).and.returnValue( true );

				const spy:jasmine.Spy = spyOn( resource._registry, "_parseErrorResponse" )
					.and.callFake( () => Promise.reject( null ) );

				try {
					await resource.saveAndRefresh();
					fail( "Should not resolve" );
				} catch( error ) {
					if( error ) fail( error );

					expect( spy ).toHaveBeenCalled();
				}
			} );


			it( "should send basic request headers", async () => {
				const resource:CRUDDocument = createMock( {
					_eTag: "\"1-12345\"",
					id: "https://example.com/",
				} );

				Object.defineProperty( resource, "isDirty", { writable: true } );
				spyOn( resource, "isDirty" ).and.returnValue( true );

				// noinspection JSIgnoredPromiseFromCall
				resource.saveAndRefresh();

				const request:JasmineAjaxRequest = jasmine.Ajax.requests.mostRecent();
				expect( request.requestHeaders ).toEqual( {
					"accept": "application/ld+json",
					"content-type": "text/ldpatch",
					"if-match": "\"1-12345\"",
					"prefer": "return=representation",
				} );
			} );

			it( "should add authentication header", async () => {
				const resource:CRUDDocument = createMock();

				Object.defineProperty( resource, "isDirty", { writable: true } );
				spyOn( resource, "isDirty" ).and.returnValue( true );


				const spy:jasmine.Spy = spyOn( resource._context.auth, "addAuthentication" );

				// noinspection JSIgnoredPromiseFromCall
				resource.saveAndRefresh();

				expect( spy ).toHaveBeenCalled();
			} );

			it( "should add custom headers in single self child", async () => {
				const resource:CRUDDocument = createMock();

				Object.defineProperty( resource, "isDirty", { writable: true } );
				spyOn( resource, "isDirty" ).and.returnValue( true );


				// noinspection JSIgnoredPromiseFromCall
				resource.saveAndRefresh( {
					headers: new Map()
						.set( "custom", new Header( "custom value" ) )
					,
				} );

				const request:JasmineAjaxRequest = jasmine.Ajax.requests.mostRecent();
				expect( request.requestHeaders ).toEqual( jasmine.objectContaining( {
					"custom": "custom value",
				} ) );
			} );


			it( "should send update patch", async () => {
				stubRequest( "https://example.com/" );

				type MyDoc = {
					list:(string | number)[];
					pointer:BaseFragment & {
						string:string[];
						pointers:(BaseFragment & {
							string:string[];
							number:number;
						})[];
					};
				};
				const resource:CRUDDocument & MyDoc = createMock( {
					types: [ "https://example.com/ns#Document" ],
					list: [ 1, 2, 3, 4, 5 ],
					pointer: {
						id: "#fragment",
						types: [ "https://example.con/ns#Fragment" ],
						string: [ "string 1", "string 2" ],
						pointers: [
							{
								id: "_:blank-node",
								types: [ "https://example.con/ns#Fragment", "https://example.com/ns#BlankNode" ],
								string: [ "string 1" ],
								number: 100,
							},
							{
								id: "_:to-delete",
								types: [ "https://example.con/ns#Fragment", "https://example.com/ns#BlankNode" ],
								string: [ "string --" ],
								number: - 100,
							},
						],
					},
				} );


				resource._normalize();
				resource._syncSnapshot();
				resource._syncSavedFragments();
				resource._context
					.extendObjectSchema( {
						"@vocab": "https://example.com/ns#",
						"xsd": XSD.namespace,
					} )
					.extendObjectSchema( "https://example.com/ns#Document", {
						"list": {
							"@container": "@list",
						},
						"pointer": {
							"@type": "@id",
						},
					} )
					.extendObjectSchema( "https://example.com/ns#Fragment", {
						"string": {
							"@type": XSD.string,
							"@container": "@set",
						},
						"pointer": {
							"@type": "@id",
						},
					} )
					.extendObjectSchema( "https://example.com/ns#BlankNode", {
						"number": {
							"@type": XSD.integer,
						},
					} );


				resource.addType( "NewType" );
				resource.list = [ 4, 1, 2, "s-1", "s-2", "s-3", 3 ];
				resource.pointer.string = [ "string 2", "string 3" ];
				resource.pointer.pointers[ 0 ].string = [ "string 1", "string -1" ];
				resource.pointer.pointers[ 0 ].number = 100.001;
				resource.pointer.pointers.splice( 1, 1 );

				await resource.saveAndRefresh();

				const request:JasmineAjaxRequest = jasmine.Ajax.requests.mostRecent();
				expect( request.params ).toBe( "" +
					`@prefix xsd: <${ XSD.namespace }>. ` +
					`UpdateList <https://example.com/> <https://example.com/ns#list> 3..5 (). ` +
					`UpdateList <https://example.com/> <https://example.com/ns#list> 0..0 ( "4"^^xsd:float ). ` +
					`UpdateList <https://example.com/> <https://example.com/ns#list> 3..3 ( "s-1" "s-2" "s-3" ). ` +
					`Add { ` +
					`` + `<https://example.com/> a <https://example.com/ns#NewType>. ` +
					`` + `<https://example.com/#fragment> <https://example.com/ns#string> "string 3". ` +
					`` + `_:blank-node <https://example.com/ns#string> "string -1". ` +
					`}. ` +
					`Delete { ` +
					`` + `<https://example.com/#fragment> <https://example.com/ns#string> "string 1"; ` +
					`` + `` + `<https://example.com/ns#pointers> _:to-delete. ` +
					`` + `_:to-delete a <https://example.con/ns#Fragment>, <https://example.com/ns#BlankNode>; ` +
					`` + `` + `<https://example.com/ns#string> "string --"; ` +
					`` + `` + `<https://example.com/ns#number> "-100"^^xsd:integer. ` +
					`}.` +
					``
				);
			} );

			it( "should update from representation", async () => {
				stubRequest( "https://example.com/", {
					resource: {
						"https://example.com/ns#string": "updated document",
					},
				} );


				type MyDoc = {
					string?:string;
				};
				const resource:CRUDDocument & MyDoc = createMock( {
					string: "document",
				} );


				resource._context
					.extendObjectSchema( { "@vocab": "https://example.com/ns#" } );


				const returned:CRUDDocument & MyDoc = await resource.saveAndRefresh();
				expect( returned as MyDoc ).toEqual( {
					string: "updated document",
				} );
			} );

			it( "should update PersistedDocument data", async () => {
				stubRequest( "https://example.com/", {} );

				const resource:CRUDDocument = createMock( {
					eTag: "\"0-12345\"",
					string: "document",
				} );


				const returned:CRUDDocument = await resource.saveAndRefresh();
				expect( returned ).toEqual( jasmine.objectContaining( {
					_eTag: "\"1-12345\"",
					_resolved: true,
				} ) );
			} );

			it( "should update blank nodes when response metadata returned", async () => {
				stubRequest( "https://example.com/", {
					resource: {
						"https://example.com/ns#blankNode1": [ { "@id": "_:new-1" } ],
						"https://example.com/ns#blankNode2": [ { "@id": "_:new-2" } ],
					},
					fragments: [
						{
							"@id": "_:new-1",
							"https://example.com/ns#string": [ { "@value": "updated blank node 1" } ],
						},
						{
							"@id": "_:new-2",
							"https://example.com/ns#string": [ { "@value": "updated blank node 2" } ],
						},
					],
					frees: [
						{
							"@id": "_:responseMetadata",
							"@type": [ C.VolatileResource, C.ResponseMetadata ],
							[ C.documentMetadata ]: [ {
								"@id": "_:documentMetadata",
							} ],
						},
						{
							"@id": "_:documentMetadata",
							"@type": [ C.VolatileResource, C.DocumentMetadata ],
							[ C.relatedDocument ]: [ {
								"@id": "https://example.com/",
							} ],
							[ C.bNodesMap ]: [ {
								"@id": "_:map",
							} ],
						},
						{
							"@id": "_:map",
							"@type": [ C.Map ],
							[ C.entry ]: [
								{ "@id": "_:entry-1" },
								{ "@id": "_:entry-2" },
							],
						},
						{
							"@id": "_:entry-1",
							[ C.entryKey ]: [ {
								"@id": "_:1",
							} ],
							[ C.entryValue ]: [ {
								"@id": "_:new-1",
							} ],
						},
						{
							"@id": "_:entry-2",
							[ C.entryKey ]: [ {
								"@id": "_:2",
							} ],
							[ C.entryValue ]: [ {
								"@id": "_:new-2",
							} ],
						},
					],
				} );

				const resource:CRUDDocument & MyDoc = createMock( {
					blankNode1: {
						id: "_:1",
						string: "blank node 1",
					},
					blankNode2: {
						id: "_:2",
						string: "blank node 2",
					},
				} );
				resource._context.extendObjectSchema( { "@vocab": "https://example.com/ns#" } );
				resource._registry._resourcesMap.set( "", resource as any );

				type BNode = { id:string, string:string };
				type MyDoc = { blankNode1:BNode, blankNode2:BNode };

				const returned:CRUDDocument & MyDoc = await resource.saveAndRefresh();

				expect( returned.hasPointer( "_:1" ) ).toBe( false );
				expect( returned.blankNode1 ).toEqual( jasmine.objectContaining( {
					id: "_:new-1",
					string: "updated blank node 1",
				} ) );

				expect( returned.hasPointer( "_:2" ) ).toBe( false );
				expect( returned.blankNode2 ).toEqual( jasmine.objectContaining( {
					id: "_:new-2",
					string: "updated blank node 2",
				} ) );
			} );

		} );

		describe( method( OBLIGATORY, "refresh" ), () => {

			it( hasSignature(
				[ "T extends object" ],
				"Update the document with the latests changes from the server.", [
					{ name: "requestOptions", type: "CarbonLDP.HTTP.RequestOptions", optional: true, description: "Customizable options for the request." },
				],
				{ type: "Promise<T & CarbonLDP.Document>" }
			), () => {} );

			it( "should exists", ():void => {
				const resource:CRUDDocument = createMock();

				expect( resource.refresh ).toBeDefined();
				expect( resource.refresh ).toEqual( jasmine.any( Function ) );
			} );


			function stubRequest( url:string, options:{ status?:number, headers?:{ [ key:string ]:string }, frees?:object[], resource?:object, fragments?:object[] } = {} ):void {
				const status:number = options.status !== void 0 ?
					options.status : 200;

				// noinspection JSMismatchedCollectionQueryUpdate
				const headers:{ [ key:string ]:string } = options.headers ?
					options.headers : {};


				const frees:object[] = options.frees ?
					options.frees : [];

				const resource:object = options.resource ?
					options.resource : {};

				const fragments:object[] = options.fragments ?
					options.fragments : [];

				jasmine.Ajax
					.stubRequest( url, null, "GET" )
					.andReturn( {
						status,
						responseHeaders: {
							"eTag": `"1-12345"`,
							...headers,
						},
						responseText: JSON.stringify( [
							...frees,
							{
								"@id": `${ url }`,
								"@graph": [
									{
										"@id": `${ url }`,
										...resource,
									},
									...fragments,
								],
							},
						] ),
					} );
			}


			it( "should throw error when _registry undefined", async () => {
				try {
					const resource:CRUDDocument = createMock( { _registry: void 0 } );
					await resource.refresh();
				} catch( e ) {
					expect( () => { throw e; } )
						.toThrowError( IllegalActionError, `"https://example.com/" doesn't support CRUD requests.` );
				}
			} );


			it( "should throw error when self ID is outside context scope", async () => {
				const resource:CRUDDocument = createMock( { id: "https://example.org/resource/" } );

				await resource
					.refresh()
					.catch( error => {
						expect( () => { throw error; } )
							.toThrowError( IllegalArgumentError, `"https://example.org/resource/" is out of scope.` );
					} )
				;
			} );

			it( "should throw error when self ID is BNode label", async () => {
				const resource:CRUDDocument = createMock( { id: "_:1" } );

				await resource
					.refresh()
					.catch( error => {
						expect( () => { throw error; } )
							.toThrowError( IllegalArgumentError, `"_:1" (Blank Node) can't be fetched directly.` );
					} )
				;
			} );

			it( "should throw error when self ID is Named Fragment label", async () => {
				const resource:CRUDDocument = createMock( { id: "https://example.com/#fragment" } );

				await resource
					.refresh()
					.catch( error => {
						expect( () => { throw error; } )
							.toThrowError( IllegalArgumentError, `"https://example.com/#fragment" (Named Fragment) can't be fetched directly.` );
					} )
				;
			} );

			it( "should throw error when self ID is unresolved prefixed name", async () => {
				const resource:CRUDDocument = createMock( { id: "ex:resource/" } );

				await resource
					.refresh()
					.catch( error => {
						expect( () => { throw error; } )
							.toThrowError( IllegalArgumentError, `"ex:resource/" is out of scope.` );
					} )
				;
			} );


			it( "should parse error response", async () => {
				stubRequest( "https://example.com/", { status: 500 } );

				const resource:CRUDDocument = createMock( { id: "https://example.com/" } );

				Object.defineProperty( resource, "isDirty", { writable: true } );
				spyOn( resource, "isDirty" ).and.returnValue( true );

				const spy:jasmine.Spy = spyOn( resource._registry, "_parseErrorResponse" )
					.and.callFake( () => Promise.reject( null ) );

				try {
					await resource.refresh();
					fail( "Should not resolve" );
				} catch( error ) {
					if( error ) fail( error );

					expect( spy ).toHaveBeenCalled();
				}
			} );

			it( "should return same if no-modified received", async () => {
				stubRequest( "https://example.com/", { status: 304 } );

				const resource:CRUDDocument = createMock( { id: "https://example.com/" } );
				const returned:CRUDDocument = await resource.refresh();

				expect( returned ).toBe( resource );
			} );


			it( "should send basic request headers", async () => {
				const resource:CRUDDocument = createMock( {
					_eTag: "\"1-12345\"",
					id: "https://example.com/",
				} );

				Object.defineProperty( resource, "isDirty", { writable: true } );
				spyOn( resource, "isDirty" ).and.returnValue( true );

				// noinspection JSIgnoredPromiseFromCall
				resource.refresh();

				const request:JasmineAjaxRequest = jasmine.Ajax.requests.mostRecent();
				expect( request.requestHeaders ).toEqual( {
					"accept": "application/ld+json",
					"if-none-match": "\"1-12345\"",
					"prefer": `${ LDP.RDFSource }; rel=interaction-model`,
				} );
			} );

			it( "should add authentication header", async () => {
				const resource:CRUDDocument = createMock();

				Object.defineProperty( resource, "isDirty", { writable: true } );
				spyOn( resource, "isDirty" ).and.returnValue( true );


				const spy:jasmine.Spy = spyOn( resource._context.auth, "addAuthentication" );

				// noinspection JSIgnoredPromiseFromCall
				resource.refresh();

				expect( spy ).toHaveBeenCalled();
			} );

			it( "should add custom headers in single self child", async () => {
				const resource:CRUDDocument = createMock();

				Object.defineProperty( resource, "isDirty", { writable: true } );
				spyOn( resource, "isDirty" ).and.returnValue( true );


				// noinspection JSIgnoredPromiseFromCall
				resource.refresh( {
					headers: new Map()
						.set( "custom", new Header( "custom value" ) )
					,
				} );

				const request:JasmineAjaxRequest = jasmine.Ajax.requests.mostRecent();
				expect( request.requestHeaders ).toEqual( jasmine.objectContaining( {
					"custom": "custom value",
				} ) );
			} );


			it( "should update document", async () => {
				stubRequest( "https://example.com/", {
					resource: {
						"https://example.com/ns#string": "updated document",
						"https://example.com/ns#pointerSet": [
							{ "@id": "_:1" },
							{ "@id": "#fragment" },
						],
					},
					fragments: [ {
						"@id": "_:1",
						"https://example.com/ns#string": "updated blank node",
						"https://example.com/ns#pointerSet": [
							{ "@id": "#2" },
						],
					}, {
						"@id": "#fragment",
						"https://example.com/ns#string": "updated named fragment",
					}, {
						"@id": "#2",
						"https://example.com/ns#string": "new named fragment",
					} ],
				} );

				type MyResource = { string:string, pointerSet?:MyResource[] };
				const resource:CRUDDocument & MyResource = createMock( {
					string: "document",
					pointerSet: [
						{
							id: "_:1",
							string: "blank node",
							pointerSet: [],
						},
						{
							slug: "fragment",
							string: "named fragment",
						},
						{
							id: "_:2",
							string: "to be removed",
						},
					],
				} );

				resource._normalize();
				resource._registry._resourcesMap.set( "", resource as any );


				resource._context
					.extendObjectSchema( { "@vocab": "https://example.com/ns#" } );


				const returned:CRUDDocument & MyResource = await resource.refresh();
				expect( returned as MyResource ).toEqual( {
					string: "updated document",
					pointerSet: [
						{
							string: "updated blank node",
							pointerSet: [
								{
									string: "new named fragment",
								},
							],
						},
						{
							string: "updated named fragment",
						},
					],
				} );
			} );

			it( "should update PersistedDocument data", async () => {
				stubRequest( "https://example.com/", {} );

				const resource:CRUDDocument = createMock( {
					eTag: "\"0-12345\"",
					string: "document",
				} );


				const returned:CRUDDocument = await resource.refresh();
				expect( returned ).toEqual( jasmine.objectContaining( {
					_eTag: "\"1-12345\"",
					_resolved: true,
				} ) );
			} );

			it( "should update blank nodes when response metadata returned", async () => {
				stubRequest( "https://example.com/", {
					resource: {
						"https://example.com/ns#blankNode1": [ { "@id": "_:new-1" } ],
						"https://example.com/ns#blankNode2": [ { "@id": "_:new-2" } ],
					},
					fragments: [
						{
							"@id": "_:new-1",
							"https://example.com/ns#string": [ { "@value": "updated blank node 1" } ],
						},
						{
							"@id": "_:new-2",
							"https://example.com/ns#string": [ { "@value": "updated blank node 2" } ],
						},
					],
					frees: [
						{
							"@id": "_:responseMetadata",
							"@type": [ C.VolatileResource, C.ResponseMetadata ],
							[ C.documentMetadata ]: [ {
								"@id": "_:documentMetadata",
							} ],
						},
						{
							"@id": "_:documentMetadata",
							"@type": [ C.VolatileResource, C.DocumentMetadata ],
							[ C.relatedDocument ]: [ {
								"@id": "https://example.com/",
							} ],
							[ C.bNodesMap ]: [ {
								"@id": "_:map",
							} ],
						},
						{
							"@id": "_:map",
							"@type": [ C.Map ],
							[ C.entry ]: [
								{ "@id": "_:entry-1" },
								{ "@id": "_:entry-2" },
							],
						},
						{
							"@id": "_:entry-1",
							[ C.entryKey ]: [ {
								"@id": "_:1",
							} ],
							[ C.entryValue ]: [ {
								"@id": "_:new-1",
							} ],
						},
						{
							"@id": "_:entry-2",
							[ C.entryKey ]: [ {
								"@id": "_:2",
							} ],
							[ C.entryValue ]: [ {
								"@id": "_:new-2",
							} ],
						},
					],
				} );

				const resource:CRUDDocument & MyDoc = createMock( {
					blankNode1: {
						id: "_:1",
						string: "blank node 1",
					},
					blankNode2: {
						id: "_:2",
						string: "blank node 2",
					},
				} );
				resource._context.extendObjectSchema( { "@vocab": "https://example.com/ns#" } );
				resource._registry._resourcesMap.set( "", resource as any );

				type BNode = { id:string, string:string };
				type MyDoc = { blankNode1:BNode, blankNode2:BNode };

				const returned:CRUDDocument & MyDoc = await resource.refresh();

				expect( returned.hasPointer( "_:1" ) ).toBe( false );
				expect( returned.blankNode1 ).toEqual( jasmine.objectContaining( {
					id: "_:new-1",
					string: "updated blank node 1",
				} ) );

				expect( returned.hasPointer( "_:2" ) ).toBe( false );
				expect( returned.blankNode2 ).toEqual( jasmine.objectContaining( {
					id: "_:new-2",
					string: "updated blank node 2",
				} ) );
			} );

		} );


		describe( method( OBLIGATORY, "delete" ), () => {

			it( hasSignature(
				"Delete the resource referred by the URI provided from the server.", [
					{ name: "uri", type: "string", description: "The resource to be deleted." },
					{ name: "requestOptions", type: "CarbonLDP.HTTP.RequestOptions", optional: true, description: "Customizable options for the request." },
				],
				{ type: "Promise<void>" }
			), ():void => {} );

			it( hasSignature(
				"Delete the current document from the server.", [
					{ name: "requestOptions", type: "CarbonLDP.HTTP.RequestOptions", optional: true, description: "Customizable options for the request." },
				],
				{ type: "Promise<void>" }
			), ():void => {} );

			it( "should exists", ():void => {
				const resource:CRUDDocument = createMock();

				expect( resource.delete ).toBeDefined();
				expect( resource.delete ).toEqual( jasmine.any( Function ) );
			} );

			function stubRequest( url:string, options:{ status?:number, headers?:{ [ key:string ]:string } } = {} ):void {
				const status:number = options.status !== void 0 ?
					options.status : 204;

				// noinspection JSMismatchedCollectionQueryUpdate
				const headers:{ [ key:string ]:string } = options.headers ?
					options.headers : {};

				jasmine.Ajax
					.stubRequest( url, null, "DELETE" )
					.andReturn( {
						status,
						responseHeaders: {
							...headers,
						},
					} );
			}


			it( "should throw error when _registry undefined", async () => {
				try {
					const resource:CRUDDocument = createMock( { _registry: void 0 } );
					await resource.delete();
				} catch( e ) {
					expect( () => { throw e; } )
						.toThrowError( IllegalActionError, `"https://example.com/" doesn't support CRUD requests.` );
				}
			} );


			it( "should request from self when no URI", async () => {
				const resource:CRUDDocument = createMock();

				// noinspection JSIgnoredPromiseFromCall
				resource.delete();

				const request:JasmineAjaxRequest = jasmine.Ajax.requests.mostRecent();
				expect( request.url ).toBe( "https://example.com/" );
			} );

			it( "should request from URI", async () => {
				const resource:CRUDDocument = createMock();

				// noinspection JSIgnoredPromiseFromCall
				resource.delete( "https://example.com/another-resource/" );

				const request:JasmineAjaxRequest = jasmine.Ajax.requests.mostRecent();
				expect( request.url ).toBe( "https://example.com/another-resource/" );
			} );

			it( "should request from relative URI", async () => {
				const resource:CRUDDocument = createMock();

				// noinspection JSIgnoredPromiseFromCall
				resource.delete( "relative/" );

				const request:JasmineAjaxRequest = jasmine.Ajax.requests.mostRecent();
				expect( request.url ).toBe( "https://example.com/relative/" );
			} );

			it( "should request from resolved prefixed name", async () => {
				const _context:CarbonLDP = new CarbonLDP( "https://example.com/" );
				_context.extendObjectSchema( { "ex": "https://example.com/" } );

				const resource:CRUDDocument = createMock( { _context } );

				// noinspection JSIgnoredPromiseFromCall
				resource.delete( "ex:resource/" );

				const request:JasmineAjaxRequest = jasmine.Ajax.requests.mostRecent();
				expect( request.url ).toBe( "https://example.com/resource/" );
			} );

			it( "should throw error when from URI outside context scope", async () => {
				const resource:CRUDDocument = createMock();

				await resource
					.delete( "https://example.org/resource/" )
					.catch( error => {
						expect( () => { throw error; } )
							.toThrowError( IllegalArgumentError, `"https://example.org/resource/" is out of scope.` );
					} )
				;
			} );

			it( "should throw error when from URI is BNode label", async () => {
				const resource:CRUDDocument = createMock();

				await resource
					.delete( "_:1" )
					.catch( error => {
						expect( () => { throw error; } )
							.toThrowError( IllegalArgumentError, `"_:1" (Blank Node) can't be fetched directly.` );
					} )
				;
			} );

			it( "should throw error when from URI is Named Fragment label", async () => {
				const resource:CRUDDocument = createMock();

				await resource
					.delete( "#fragment" )
					.catch( error => {
						expect( () => { throw error; } )
							.toThrowError( IllegalArgumentError, `"https://example.com/#fragment" (Named Fragment) can't be fetched directly.` );
					} )
				;
			} );

			it( "should throw error when unresolved prefixed name", async () => {
				const resource:CRUDDocument = createMock();

				await resource
					.delete( "ex:resource/" )
					.catch( error => {
						expect( () => { throw error; } )
							.toThrowError( IllegalArgumentError, `"ex:resource/" is out of scope.` );
					} )
				;
			} );

			it( "should parse error response", async () => {
				stubRequest( "https://example.com/", { status: 500 } );
				const resource:CRUDDocument = createMock( { id: "https://example.com/" } );

				const spy:jasmine.Spy = spyOn( resource._registry, "_parseErrorResponse" )
					.and.callFake( () => Promise.reject( null ) );

				try {
					await resource.delete();
					fail( "Should not resolve" );
				} catch( error ) {
					if( error ) fail( error );

					expect( spy ).toHaveBeenCalled();
				}
			} );


			it( "should remove self pointer from registry", async () => {
				stubRequest( "https://example.com/" );

				const resource:CRUDDocument = createMock( { id: "https://example.com/" } );
				resource._registry._resourcesMap.set( "", resource as any );

				await resource.delete();

				expect( resource._registry.hasPointer( resource.id ) ).toBe( false );
			} );

			it( "should remove pointer whe URI provided", async () => {
				stubRequest( "https://example.com/resource/" );

				const resource:CRUDDocument = createMock( { id: "https://example.com/" } );

				const target:CRUDDocument = resource._registry
					._register( { id: "https://example.com/resource/" } );

				await resource.delete( "resource/" );

				expect( resource._registry.hasPointer( target.id ) ).toBe( false );
			} );

		} );

	} );

} );
