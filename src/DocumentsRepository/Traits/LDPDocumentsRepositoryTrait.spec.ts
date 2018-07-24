import { spyOnDecorated } from "../../../test/helpers/jasmine/spies";
import { AnyJasmineValue } from "../../../test/helpers/types";

import { DocumentsContext } from "../../Context/DocumentsContext";

import { Document } from "../../Document/Document";
import { LDPDocumentTrait } from "../../Document/Traits/LDPDocumentTrait";

import { DocumentsRegistry } from "../../DocumentsRegistry/DocumentsRegistry";

import { IllegalArgumentError } from "../../Errors/IllegalArgumentError";

import { GeneralRepository } from "../../GeneralRepository/GeneralRepository";

import { HTTPError } from "../../HTTP/Errors/HTTPError";
import { Header } from "../../HTTP/Header";

import { ErrorResponse } from "../../LDP/ErrorResponse";
import { MapEntry } from "../../LDP/MapEntry";

import { ModelDecorator } from "../../Model/ModelDecorator";
import { ModelPrototype } from "../../Model/ModelPrototype";

import { Pointer } from "../../Pointer/Pointer";

import { BaseResource } from "../../Resource/BaseResource";

import {
	extendsClass,
	hasProperty,
	hasSignature,
	interfaze,
	method,
	module,
	OBLIGATORY,
	property,
	STATIC
} from "../../test/JasmineExtender";

import { C } from "../../Vocabularies/C";
import { LDP } from "../../Vocabularies/LDP";
import { XSD } from "../../Vocabularies/XSD";

import { BaseDocumentsRepository } from "../BaseDocumentsRepository";

import { LDPDocumentsRepositoryTrait, LDPDocumentsRepositoryTraitFactory } from "./LDPDocumentsRepositoryTrait";


describe( module( "carbonldp/DocumentsRepository/Traits/LDPDocumentsRepositoryTrait" ), () => {

	let $context:DocumentsContext;
	beforeEach( ():void => {
		$context = new DocumentsContext( "https://example.com/" );
	} );


	describe( interfaze(
		"CarbonLDP.DocumentsRepository.Traits.LDPDocumentsRepositoryTrait",
		"Documents repository with the implementation for sparql queries."
	), () => {

		it( extendsClass( "CarbonLDP.GeneralRepository<CarbonLDP.Document>" ), () => {
			const target:GeneralRepository<Document> = {} as LDPDocumentsRepositoryTrait;
			expect( target ).toBeDefined();
		} );


		it( hasProperty(
			OBLIGATORY,
			"$context",
			"CarbonLDP.DocumentsContext"
		), ():void => {
			const target:LDPDocumentsRepositoryTrait[ "$context" ] = {} as DocumentsContext;
			expect( target ).toBeDefined();
		} );


		beforeEach( () => {
			jasmine.Ajax.install();

			jasmine.Ajax.stubRequest( "https://example.com/500/" ).andReturn( {
				status: 500,
				responseText: `
							[ {
								"@id": "_:1",
								"@type": [ "${ C.ErrorResponse }" ],
								"${ C.error }": [ {
									"@id": "_:2"
								}, {
									"@id": "_:3"
								} ],
								"${ C.httpStatusCode }": [ {
									"@type": "${ XSD.int }",
									"@value": "500"
								} ]
							}, {
								"@id": "_:2",
								"@type": [ "${ C.Error }" ],
								"${ C.errorCode }": [ {
									"@language": "en",
									"@value": "code-01"
								} ],
								"${ C.errorMessage }": [ {
									"@language": "en",
									"@value": "Message 01"
								} ],
								"${ C.errorParameters }": [ {
									"@id": "_:4"
								} ]
							}, {
								"@id": "_:3",
								"@type": [ "${ C.Error }" ],
								"${ C.errorCode }": [ {
									"@language": "en",
									"@value": "code-02"
								} ],
								"${ C.errorMessage }": [ {
									"@language": "en",
									"@value": "Message 02"
								} ],
								"${ C.errorParameters }": [ {
									"@id": "_:6"
								} ]
							}, {
								"@id": "_:4",
								"@type": [ "${ C.Map }" ],
								"${ C.entry }": [ {
									"@id": "_:5"
								} ]
							}, {
								"@id": "_:5",
								"${ C.entryKey }": [ {
									"@value": "document"
								} ],
								"${ C.entryValue }": [ {
									"@id": "https://example.com/target-document/"
								} ]
							}, {
								"@id": "_:6",
								"@type": [ "${ C.Map }" ],
								"${ C.entry }": [ {
									"@id": "_:7"
								} ]
							}, {
								"@id": "_:7",
								"${ C.entryKey }": [ {
									"@value": "document"
								} ],
								"${ C.entryValue }": [ {
									"@id": "https://example.com/target-document/"
								} ]
							} ]`,
			} );
		} );

		afterEach( () => {
			jasmine.Ajax.uninstall();
		} );


		let repository:LDPDocumentsRepositoryTrait;
		let document:Document;
		beforeEach( () => {
			repository = LDPDocumentsRepositoryTrait.decorate( { $context } );

			document = Document.decorate( {
				$id: "https://example.com/",
				$repository: $context.repository,
				$registry: $context.registry,
			} );
		} );


		describe( method( OBLIGATORY, "get" ), ():void => {

			it( hasSignature(
				[ "T extends object" ],
				[
					{ name: "uri", type: "string", description: "The URI of the resource to retrieve." },
					{ name: "requestOptions", type: "CarbonLDP.HTTP.GETOptions", optional: true, description: "Customizable options for the request." },
				],
				{ type: "Promise<T & CarbonLDP.Document>" }
			), ():void => {} );

			it( "should exists", ():void => {
				expect( repository.get ).toBeDefined();
				expect( repository.get ).toEqual( jasmine.any( Function ) );
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


			it( "should request the URI provided", async () => {
				stubRequest( "https://example.com/another-resource/" );

				await repository.get( "https://example.com/another-resource/" );

				const request:JasmineAjaxRequest = jasmine.Ajax.requests.mostRecent();
				expect( request.url ).toBe( "https://example.com/another-resource/" );
			} );

			it( "should request relative URI provided", async () => {
				stubRequest( "https://example.com/relative/" );

				await repository.get( "relative/" );

				const request:JasmineAjaxRequest = jasmine.Ajax.requests.mostRecent();
				expect( request.url ).toBe( "https://example.com/relative/" );
			} );

			it( "should request resolved prefixed name provided", async () => {
				stubRequest( "https://example.com/resource/" );

				$context.extendObjectSchema( { "ex": "https://example.com/" } );

				await repository.get( "ex:resource/" );

				const request:JasmineAjaxRequest = jasmine.Ajax.requests.mostRecent();
				expect( request.url ).toBe( "https://example.com/resource/" );
			} );

			it( "should throw error when from URI outside context scope", async () => {
				await repository
					.get( "https://example.org/resource/" )
					.catch( error => {
						expect( () => { throw error; } )
							.toThrowError( IllegalArgumentError, `"https://example.org/resource/" is out of scope.` );
					} )
				;
			} );

			it( "should throw error when from URI is BNode label", async () => {
				await repository
					.get( "_:1" )
					.catch( error => {
						expect( () => { throw error; } )
							.toThrowError( IllegalArgumentError, `"_:1" is out of scope.` );
					} )
				;
			} );

			it( "should throw error when from URI is Named Fragment label", async () => {
				await repository
					.get( "#fragment" )
					.catch( error => {
						expect( () => { throw error; } )
							.toThrowError( IllegalArgumentError, `"#fragment" is out of scope.` );
					} )
				;
			} );

			it( "should throw error when unresolved prefixed name", async () => {
				await repository
					.get( "ex:resource/" )
					.catch( error => {
						expect( () => { throw error; } )
							.toThrowError( IllegalArgumentError, `"ex:resource/" is out of scope.` );
					} )
				;
			} );


			it( "should send basic request headers", async () => {
				stubRequest( "https://example.com/resource/" );

				await repository.get( "resource/" );

				const request:JasmineAjaxRequest = jasmine.Ajax.requests.mostRecent();
				expect( request.requestHeaders ).toEqual( {
					"accept": "application/ld+json",
					"prefer": `${ LDP.RDFSource }; rel=interaction-model`,
				} );
			} );

			it( "should add custom headers", async () => {
				stubRequest( "https://example.com/resource/" );

				await repository.get( "resource/", {
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

				const retrieved:Document = await repository.get( "/" );
				expect( retrieved ).toEqual( jasmine.objectContaining( {
					$id: "https://example.com/",
				} ) );
			} );

			it( "should return resource requested when in registry but not resolved", async () => {
				stubRequest( "https://example.com/resource/" );

				$context.registry._addPointer( { $id: "https://example.com/resource/" } );

				const retrieved:Document = await repository.get( "resource/" );
				expect( retrieved ).toEqual( jasmine.objectContaining( {
					$id: "https://example.com/resource/",
				} ) );
			} );

			it( "should return registered when already resolved", async () => {
				const registered:Document = $context.registry._addPointer( {
					_resolved: true,
					$id: "https://example.com/resource/",
				} );

				const retrieved:Document = await repository.get( "resource/" );
				expect( retrieved ).toBe( registered );
			} );

			it( "should return request when already resolved but ensureLatest set", async () => {
				stubRequest( "https://example.com/resource/", {
					resource: {
						"https://example.com/ns#string": "value from request",
					},
				} );

				$context.extendObjectSchema( {
					"@vocab": "https://example.com/ns#",
				} );

				$context.registry._addPointer( {
					_resolved: true,
					$id: "https://example.com/resource/",
				} );

				const retrieved:{ string:string } = await repository
					.get<{ string:string }>( "resource/", { ensureLatest: true } );

				expect( retrieved ).toEqual( {
					string: "value from request",
				} );
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


				const retrieved:Document = await repository.get( "/" );
				expect( retrieved ).toEqual( jasmine.objectContaining( {
					$id: "https://example.com/another-resource/",
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

				$context.extendObjectSchema( {
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


				const retrieved:MyResource = await repository.get<MyResource>( "/" );
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
						<any> jasmine.objectContaining<Pointer>( {
							$id: "https://example.com/another/",
						} ),
					],
				} );
			} );

			it( "should store returned data in the registry", async () => {
				stubRequest( "https://example.com/" );

				const retrieved:Document = await repository.get( "/" );

				expect( $context.registry.hasPointer( retrieved.$id ) ).toBe( true );
				expect( $context.registry.getPointer( retrieved.$id ) ).toBe( retrieved );
			} );

			it( "should add resolved values", async () => {
				stubRequest( "https://example.com/" );

				const retrieved:Document = await repository.get( "/" );

				expect( retrieved ).toEqual( jasmine.objectContaining( {
					$eTag: "\"1-12345\"",
					_resolved: true,
				} ) );
			} );


			it( "should parse ErrorResponse into error", async () => {
				await repository
					.get( "https://example.com/500/" )
					.then( () => fail( "Should not resolve" ) )
					.catch( ( error:HTTPError & ErrorResponse ) => {
						expect( error ).toBeDefined();
						expect( error ).toEqual( jasmine.any( HTTPError ) );

						expect( error.message ).toBe( "Message 01, Message 02" );
						expect( error.statusCode ).toBe( 500 );

						expect( error.errors ).toBeDefined();
						expect( error.errors.length ).toBe( 2 );

						expect( error.errors[ 0 ].errorCode ).toBe( `code-01` );
						expect( error.errors[ 0 ].errorMessage ).toBe( `Message 01` );
						expect( error.errors[ 0 ].errorParameters.entries as AnyJasmineValue<MapEntry<string, Pointer>[]> ).toEqual( [ {
							entryKey: "document",
							entryValue: jasmine.objectContaining( {
								$id: "https://example.com/target-document/",
							} ),
						} ] );

						expect( error.errors[ 1 ].errorCode ).toBe( `code-02` );
						expect( error.errors[ 1 ].errorMessage ).toBe( `Message 02` );
						expect( error.errors[ 1 ].errorParameters.entries as AnyJasmineValue<MapEntry<string, Pointer>[]> ).toEqual( [ {
							entryKey: "document",
							entryValue: jasmine.objectContaining( {
								$id: "https://example.com/target-document/",
							} ),
						} ] );
					} )
				;
			} );

		} );

		describe( method( OBLIGATORY, "resolve" ), () => {

			it( hasSignature(
				[ "T extends object" ],
				[
					{ name: "document", type: "CarbonLDP.Document", description: "The document to be resolved." },
					{ name: "requestOptions", type: "CarbonLDP.HTTP.GETOptions", description: "Customizable options for the request." },
				],
				{ type: "Promise<T & CarbonLDP.Document>" }
			), ():void => {} );

			it( "should exists", ():void => {
				expect( repository.resolve ).toBeDefined();
				expect( repository.resolve ).toEqual( jasmine.any( Function ) );
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


			it( "should request to document $id", async () => {
				stubRequest( "https://example.com/" );

				await repository.resolve( document );

				const request:JasmineAjaxRequest = jasmine.Ajax.requests.mostRecent();
				expect( request.url ).toBe( "https://example.com/" );
			} );

			it( "should send basic request headers", async () => {
				stubRequest( "https://example.com/" );

				await repository.resolve( document );

				const request:JasmineAjaxRequest = jasmine.Ajax.requests.mostRecent();
				expect( request.requestHeaders ).toEqual( {
					"accept": "application/ld+json",
					"prefer": `${ LDP.RDFSource }; rel=interaction-model`,
				} );
			} );

			it( "should add custom headers", async () => {
				stubRequest( "https://example.com/" );

				await repository.resolve( document, {
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
				$context.registry._addPointer( document );

				const retrieved:Document = await repository.resolve( document );
				expect( retrieved ).toEqual( jasmine.objectContaining( {
					$id: "https://example.com/",
				} ) );
				expect( retrieved ).toBe( document );
			} );

			it( "should return registered when already resolved", async () => {
				const registered:Document = $context.registry
					.getPointer( "https://example.com/", true );
				registered._resolved = true;

				const retrieved:Document = await repository.resolve( document );
				expect( retrieved ).toBe( registered );
			} );

			it( "should return requested when already resolved but ensureLatest set", async () => {
				stubRequest( "https://example.com/", {
					resource: {
						"https://example.com/ns#string": "value from request",
					},
				} );

				$context.extendObjectSchema( {
					"@vocab": "https://example.com/ns#",
				} );

				const registered:Document = $context.registry
					.getPointer( "https://example.com/", true );
				registered._resolved = true;


				const retrieved:{ string:string } = await repository
					.resolve<{ string:string }>( document, { ensureLatest: true } );

				expect( retrieved ).toEqual( {
					string: "value from request",
				} );
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

				$context.extendObjectSchema( {
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

				const retrieved:MyResource = await repository.resolve<MyResource>( document );
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
							$id: "https://example.com/another/",
						} ),
					],
				} );
			} );

			it( "should store returned data in the registry", async () => {
				stubRequest( "https://example.com/" );

				const retrieved:Document = await repository.resolve( document );

				const registry:DocumentsRegistry = $context.registry;
				expect( registry.hasPointer( retrieved.$id ) ).toBe( true );
				expect( registry.getPointer( retrieved.$id ) ).toBe( retrieved );
			} );

			it( "should add BasePersistedDocument values", async () => {
				stubRequest( "https://example.com/" );

				const retrieved:Document = await repository.resolve( document );

				expect( retrieved ).toEqual( jasmine.objectContaining( {
					$eTag: "\"1-12345\"",
					_resolved: true,
				} ) );
			} );


			it( "should parse ErrorResponse into error", async () => {
				document.$id = "500/";

				await repository
					.resolve( document )
					.then( () => fail( "Should not resolve" ) )
					.catch( ( error:HTTPError & ErrorResponse ) => {
						expect( error ).toBeDefined();
						expect( error ).toEqual( jasmine.any( HTTPError ) );

						expect( error.message ).toBe( "Message 01, Message 02" );
						expect( error.statusCode ).toBe( 500 );

						expect( error.errors ).toBeDefined();
						expect( error.errors.length ).toBe( 2 );

						expect( error.errors[ 0 ].errorCode ).toBe( `code-01` );
						expect( error.errors[ 0 ].errorMessage ).toBe( `Message 01` );
						expect( error.errors[ 0 ].errorParameters.entries as AnyJasmineValue<MapEntry<string, Pointer>[]> ).toEqual( [ {
							entryKey: "document",
							entryValue: jasmine.objectContaining( {
								$id: "https://example.com/target-document/",
							} ),
						} ] );

						expect( error.errors[ 1 ].errorCode ).toBe( `code-02` );
						expect( error.errors[ 1 ].errorMessage ).toBe( `Message 02` );
						expect( error.errors[ 1 ].errorParameters.entries as AnyJasmineValue<MapEntry<string, Pointer>[]> ).toEqual( [ {
							entryKey: "document",
							entryValue: jasmine.objectContaining( {
								$id: "https://example.com/target-document/",
							} ),
						} ] );
					} )
				;
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
				expect( repository.exists ).toBeDefined();
				expect( repository.exists ).toEqual( jasmine.any( Function ) );
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


			it( "should request the URI provided", async () => {
				stubRequest( "https://example.com/another-resource/" );

				await repository.exists( "https://example.com/another-resource/" );

				const request:JasmineAjaxRequest = jasmine.Ajax.requests.mostRecent();
				expect( request.url ).toBe( "https://example.com/another-resource/" );
			} );

			it( "should request relative URI provided", async () => {
				stubRequest( "https://example.com/relative/" );

				await repository.exists( "relative/" );

				const request:JasmineAjaxRequest = jasmine.Ajax.requests.mostRecent();
				expect( request.url ).toBe( "https://example.com/relative/" );
			} );

			it( "should request resolved prefixed name provided", async () => {
				stubRequest( "https://example.com/resource/" );

				$context.extendObjectSchema( { "ex": "https://example.com/" } );

				await repository.exists( "ex:resource/" );

				const request:JasmineAjaxRequest = jasmine.Ajax.requests.mostRecent();
				expect( request.url ).toBe( "https://example.com/resource/" );
			} );

			it( "should throw error when from URI outside context scope", async () => {
				await repository
					.exists( "https://example.org/resource/" )
					.catch( error => {
						expect( () => { throw error; } )
							.toThrowError( IllegalArgumentError, `"https://example.org/resource/" is out of scope.` );
					} )
				;
			} );

			it( "should throw error when from URI is BNode label", async () => {
				await repository
					.exists( "_:1" )
					.catch( error => {
						expect( () => { throw error; } )
							.toThrowError( IllegalArgumentError, `"_:1" is out of scope.` );
					} )
				;
			} );

			it( "should throw error when from URI is Named Fragment label", async () => {
				await repository
					.exists( "#fragment" )
					.catch( error => {
						expect( () => { throw error; } )
							.toThrowError( IllegalArgumentError, `"#fragment" is out of scope.` );
					} )
				;
			} );

			it( "should throw error when unresolved prefixed name", async () => {
				await repository
					.exists( "ex:resource/" )
					.catch( error => {
						expect( () => { throw error; } )
							.toThrowError( IllegalArgumentError, `"ex:resource/" is out of scope.` );
					} )
				;
			} );


			it( "should send basic request headers", async () => {
				stubRequest( "https://example.com/resource/" );

				await repository.exists( "resource/" );

				const request:JasmineAjaxRequest = jasmine.Ajax.requests.mostRecent();
				expect( request.requestHeaders ).toEqual( {
					"accept": "application/ld+json",
					"prefer": `${ LDP.RDFSource }; rel=interaction-model`,
				} );
			} );

			it( "should add custom headers", async () => {
				stubRequest( "https://example.com/resource/" );

				await repository.exists( "resource/", {
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

				const exists:boolean = await repository.exists( "resource/" );
				expect( exists ).toEqual( true );
			} );

			it( "should return false if request 404", async () => {
				stubRequest( "https://example.com/resource/", { status: 404 } );

				const exists:boolean = await repository.exists( "resource/" );
				expect( exists ).toEqual( false );
			} );


			it( "should parse ErrorResponse into error", async () => {
				await repository
					.exists( "500/" )
					.then( () => fail( "Should not resolve" ) )
					.catch( ( error:HTTPError & ErrorResponse ) => {
						expect( error ).toBeDefined();
						expect( error ).toEqual( jasmine.any( HTTPError ) );

						expect( error.message ).toBe( "Message 01, Message 02" );
						expect( error.statusCode ).toBe( 500 );

						expect( error.errors ).toBeDefined();
						expect( error.errors.length ).toBe( 2 );

						expect( error.errors[ 0 ].errorCode ).toBe( `code-01` );
						expect( error.errors[ 0 ].errorMessage ).toBe( `Message 01` );
						expect( error.errors[ 0 ].errorParameters.entries as AnyJasmineValue<MapEntry<string, Pointer>[]> ).toEqual( [ {
							entryKey: "document",
							entryValue: jasmine.objectContaining( {
								$id: "https://example.com/target-document/",
							} ),
						} ] );

						expect( error.errors[ 1 ].errorCode ).toBe( `code-02` );
						expect( error.errors[ 1 ].errorMessage ).toBe( `Message 02` );
						expect( error.errors[ 1 ].errorParameters.entries as AnyJasmineValue<MapEntry<string, Pointer>[]> ).toEqual( [ {
							entryKey: "document",
							entryValue: jasmine.objectContaining( {
								$id: "https://example.com/target-document/",
							} ),
						} ] );
					} )
				;
			} );

		} );


		describe( method( OBLIGATORY, "create" ), () => {

			it( hasSignature(
				[ "T extends object" ],
				"Persists the object as a child of the uri specified.", [
					{ name: "uri", type: "string", description: "URI of the document where to create the child." },
					{ name: "child", type: "T", description: "The object from where to create the child." },
					{ name: "requestOptions", type: "CarbonLDP.HTTP.RequestOptions", optional: true, description: "Customizable options for the request." },
				],
				{ type: "Promise<T & CarbonLDP.Document>" }
			), ():void => {} );

			it( hasSignature(
				[ "T extends object" ],
				"Persists the object with the slug specified as a child of the uri specified.", [
					{ name: "uri", type: "string", description: "URI of the document where to create the child." },
					{ name: "child", type: "T", description: "The object from where to create the child." },
					{ name: "slug", type: "string", description: "The slug that will be used in the child URI." },
					{ name: "requestOptions", type: "CarbonLDP.HTTP.RequestOptions", optional: true, description: "Customizable options for the request." },
				],
				{ type: "Promise<T & CarbonLDP.Document>" }
			), ():void => {} );

			it( hasSignature(
				[ "T extends object" ],
				"Persists multiple objects as children of the uri specified.", [
					{ name: "uri", type: "string", description: "URI of the document where to create the child." },
					{ name: "children", type: "T[]", description: "An array with the objects to be persisted as the new children." },
					{ name: "requestOptions", type: "CarbonLDP.HTTP.RequestOptions", optional: true, description: "Customizable options for every the request." },
				],
				{ type: "Promise<(T & CarbonLDP.Document)[]>", description: "Promise that contains the new UNRESOLVED persisted children." }
			), ():void => {} );

			it( hasSignature(
				[ "T extends object" ],
				"Persists multiple objects as children of the uri specified.", [
					{ name: "uri", type: "string", description: "URI of the document where to create the child." },
					{ name: "children", type: "T[]", description: "An array with the objects to be persisted as the new children." },
					{ name: "slugs", type: "string[]", description: "Array with the slugs that corresponds to each object in `object` parameter, in the order in which they were defined. If an element in the array is undefined or null, the slug will be generated by the platform." },
					{ name: "requestOptions", type: "CarbonLDP.HTTP.RequestOptions", optional: true, description: "Customizable options for every the request." },
				],
				{ type: "Promise<(T & CarbonLDP.Document)[]>", description: "Promise that contains the new UNRESOLVED persisted children." }
			), ():void => {} );

			it( "should exists", ():void => {
				expect( repository.create ).toBeDefined();
				expect( repository.create ).toEqual( jasmine.any( Function ) );
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


			it( "should request from URI", async () => {
				stubRequest( "https://example.com/resource/" );

				await repository.create( "https://example.com/resource/", {} );

				const request:JasmineAjaxRequest = jasmine.Ajax.requests.mostRecent();
				expect( request.url ).toBe( "https://example.com/resource/" );
			} );

			it( "should request from relative URI", async () => {
				stubRequest( "https://example.com/relative/" );

				await repository.create( "relative/", {} );

				const request:JasmineAjaxRequest = jasmine.Ajax.requests.mostRecent();
				expect( request.url ).toBe( "https://example.com/relative/" );
			} );

			it( "should request from resolved prefixed name", async () => {
				stubRequest( "https://example.com/resource/" );

				$context.extendObjectSchema( { "ex": "https://example.com/" } );

				await repository.create( "ex:resource/", {} );

				const request:JasmineAjaxRequest = jasmine.Ajax.requests.mostRecent();
				expect( request.url ).toBe( "https://example.com/resource/" );
			} );

			it( "should throw error when URI outside context scope", async () => {
				await repository
					.create( "https://example.org/resource/", {} )
					.catch( error => {
						expect( () => { throw error; } )
							.toThrowError( IllegalArgumentError, `"https://example.org/resource/" is out of scope.` );
					} )
				;
			} );

			it( "should throw error when URI is BNode label", async () => {
				await repository
					.create( "_:1", {} )
					.catch( error => {
						expect( () => { throw error; } )
							.toThrowError( IllegalArgumentError, `"_:1" is out of scope.` );
					} )
				;
			} );

			it( "should throw error when URI is Named Fragment label", async () => {
				await repository
					.create( "#fragment", {} )
					.catch( error => {
						expect( () => { throw error; } )
							.toThrowError( IllegalArgumentError, `"#fragment" is out of scope.` );
					} )
				;
			} );

			it( "should throw error when unresolved prefixed name", async () => {
				await repository
					.create( "ex:resource/", {} )
					.catch( error => {
						expect( () => { throw error; } )
							.toThrowError( IllegalArgumentError, `"ex:resource/" is out of scope.` );
					} )
				;
			} );


			it( "should send basic request headers in single child", async () => {
				stubRequest( "https://example.com/resource/" );

				await repository.create( "resource/", {} );

				const request:JasmineAjaxRequest = jasmine.Ajax.requests.mostRecent();
				expect( request.requestHeaders ).toEqual( {
					"accept": "application/ld+json",
					"content-type": "application/ld+json",
					"prefer": [
						`${ LDP.Container }; rel=interaction-model`,
						"return=minimal",
					].join( ", " ),
				} );
			} );

			it( "should send basic request headers in multiple child", async () => {
				stubRequest( "https://example.com/resource/" );

				await repository.create( "resource/", [ {}, {} ] );


				const firstRequest:JasmineAjaxRequest = jasmine.Ajax.requests.at( 0 );
				expect( firstRequest.requestHeaders ).toEqual( {
					"accept": "application/ld+json",
					"content-type": "application/ld+json",
					"prefer": [
						`${ LDP.Container }; rel=interaction-model`,
						"return=minimal",
					].join( ", " ),
				} );

				const secondRequest:JasmineAjaxRequest = jasmine.Ajax.requests.at( 1 );
				expect( secondRequest.requestHeaders ).toEqual( {
					"accept": "application/ld+json",
					"content-type": "application/ld+json",
					"prefer": [
						`${ LDP.Container }; rel=interaction-model`,
						"return=minimal",
					].join( ", " ),
				} );
			} );

			it( "should add custom headers in single child", async () => {
				stubRequest( "https://example.com/resource/" );

				await repository.create( "resource/", {}, {
					headers: new Map()
						.set( "custom", new Header( "custom value" ) )
					,
				} );

				const request:JasmineAjaxRequest = jasmine.Ajax.requests.mostRecent();
				expect( request.requestHeaders ).toEqual( jasmine.objectContaining( {
					"custom": "custom value",
				} ) );
			} );

			it( "should send custom request headers in multiple children", async () => {
				stubRequest( "https://example.com/resource/" );

				await repository.create( "resource/", [ {}, {} ], {
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

			it( "should add slug header when single child", async () => {
				stubRequest( "https://example.com/resource/" );

				await repository.create( "resource/", {}, "child-slug" );

				const request:JasmineAjaxRequest = jasmine.Ajax.requests.mostRecent();
				expect( request.requestHeaders ).toEqual( jasmine.objectContaining( {
					"slug": "child-slug",
				} ) );
			} );

			it( "should add slug header when multiple child", async () => {
				stubRequest( "https://example.com/resource/" );

				await repository.create( "resource/", [ {}, {} ], [ "child-slug-1", "child-slug-2" ] );

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

				await repository.create( "/", [ {}, {}, {} ], [ null, undefined, "child-slug" ] );

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

				await repository.create( "/", [ {}, {} ], [ "child-slug" ] );

				const firstRequest:JasmineAjaxRequest = jasmine.Ajax.requests.at( 0 );
				expect( firstRequest.requestHeaders ).toEqual( jasmine.objectContaining( {
					"slug": "child-slug",
				} ) );

				const secondRequest:JasmineAjaxRequest = jasmine.Ajax.requests.at( 1 );
				expect( secondRequest.requestHeaders ).not.toEqual( jasmine.objectContaining( {
					"slug": jasmine.anything() as any,
				} ) );
			} );


			it( "should send converted JSONLD when single child", async () => {
				stubRequest( "https://example.com/resource/" );

				$context
					.extendObjectSchema( {
						"@vocab": "https://example.com/ns#",
					} )
				;

				await repository.create( "resource/", {
					string: "my object",
					pointerSet: [
						{ $id: "_:1", string: "blank node" },
						{ $slug: "fragment", string: "named fragment" },
					],
				} );

				const request:JasmineAjaxRequest = jasmine.Ajax.requests.mostRecent();
				expect( JSON.parse( request.params ) ).toEqual( {
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
				} );
			} );

			it( "should send converted JSONLD when multiple children", async () => {
				stubRequest( "https://example.com/resource/" );

				$context.extendObjectSchema( {
					"@vocab": "https://example.com/ns#",
				} );

				await repository.create( "resource/", [ {
					string: "my object 1",
				}, {
					string: "my object 2",
				} ] );

				const request1:JasmineAjaxRequest = jasmine.Ajax.requests.at( 0 );
				expect( JSON.parse( request1.params ) ).toEqual( {
					"@id": "",
					"@graph": [ {
						"@id": "",
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
						"https://example.com/ns#string": [ {
							"@value": "my object 2",
							"@type": XSD.string,
						} ],
					} ],
				} );
			} );

			it( "should return same child object reference", async () => {
				stubRequest( "https://example.com/" );

				const child:object = {};

				const returned:Document = await repository.create( "/", child );

				expect( child ).toBe( returned );
			} );

			it( "should return same children object references", async () => {
				stubRequest( "https://example.com/" );

				const child1:object = {};
				const child2:object = {};

				const [ returned1, returned2 ]:Document[] = await repository.create( "/", [ child1, child2 ] );

				expect( child1 ).toBe( returned1 );
				expect( child2 ).toBe( returned2 );
			} );

			it( "should have stored the child in the registry", async () => {
				stubRequest( "https://example.com/" );

				const returned:Document = await repository.create( "/", {} );

				expect( $context.registry.hasPointer( returned.$id ) ).toBe( true );
				expect( $context.registry.getPointer( returned.$id ) ).toBe( returned );
			} );

			it( "should have stored the children in the registry", async () => {
				stubRequest( "https://example.com/" );

				const [ returned1, returned2 ]:Document[] = await repository.create( "/", [ {}, {} ] );

				expect( $context.registry.hasPointer( returned1.$id ) ).toBe( true );
				expect( $context.registry.getPointer( returned1.$id ) ).toBe( returned1 );

				expect( $context.registry.hasPointer( returned2.$id ) ).toBe( true );
				expect( $context.registry.getPointer( returned2.$id ) ).toBe( returned2 );
			} );


			it( "should throw error if child is already persisted", async () => {
				const child:Document = Document.decorate( {
					$id: "",
					$registry: $context.registry,
					$repository: $context.repository,
				} );

				await repository
					.create( "/", child )
					.then( () => fail( "Should not resolve" ) )
					.catch( error => {
						expect( () => { throw error; } )
							.toThrowError( IllegalArgumentError, "The object is already a resolvable pointer." );
					} );
			} );

			it( "should throw error if any children is already persisted", async () => {
				const child:Document = Document.decorate( {
					$id: "",
					$registry: $context.registry,
					$repository: $context.repository,
				} );

				await repository
					.create( "/", [ {}, child, {} ] )
					.then( () => fail( "Should not resolve" ) )
					.catch( error => {
						expect( () => { throw error; } )
							.toThrowError( IllegalArgumentError, `The object in "1" is already a resolvable pointer.` );
					} );

				expect( jasmine.Ajax.requests.count() ).toBe( 0 );
			} );

			it( "should throw error if child already being persisted", async () => {
				const child:object = {};

				await Promise.all( [
					repository.create( "/", child ),
					repository.create( "/", child ),
				] )
					.then( () => fail( "Should not resolve" ) )
					.catch( error => {
						expect( () => { throw error; } )
							.toThrowError( IllegalArgumentError, "The object is already being persisted." );
					} );
			} );

			it( "should be able to resend child after a failed request", async () => {
				const child:object = {};

				try {
					stubRequest( "https://example.com/", { status: 500 } );
					await repository.create( "/", child );

				} catch( error ) {
					stubRequest( "https://example.com/" );
					await repository.create( "/", child );

					expect().nothing();
				}
			} );


			it( "should add unresolved data to the child", async () => {
				stubRequest( "https://example.com/" );

				const returned:Document = await repository.create( "/", {} );

				expect( returned ).toEqual( jasmine.objectContaining( {
					_resolved: false,
					$id: "https://example.com/child-1/",
				} ) );
			} );

			it( "should add unresolved data to the children", async () => {
				stubRequest( "https://example.com/" );

				const [ returned1, returned2 ]:Document[] = await repository
					.create( "/", [ {}, {} ] );

				expect( returned1 ).toEqual( jasmine.objectContaining( {
					_resolved: false,
					$id: "https://example.com/child-1/",
				} ) );
				expect( returned2 ).toEqual( jasmine.objectContaining( {
					_resolved: false,
					$id: "https://example.com/child-2/",
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

				type BNode = { $id:string, string:string };
				type MyDoc = { blankNode1:BNode, blankNode2:BNode };

				const returned:Document & MyDoc = await repository.create<MyDoc>( "/", {
					blankNode1: {
						$id: "_:1",
						string: "blank node 1",
					},
					blankNode2: {
						$id: "_:2",
						string: "blank node 2",
					},
				} );

				expect( returned.hasPointer( "_:1" ) ).toBe( false );
				expect( returned.blankNode1 ).toEqual( jasmine.objectContaining( {
					$id: "_:new-1",
					string: "blank node 1",
				} ) );

				expect( returned.hasPointer( "_:2" ) ).toBe( false );
				expect( returned.blankNode2 ).toEqual( jasmine.objectContaining( {
					$id: "_:new-2",
					string: "blank node 2",
				} ) );
			} );


			it( "should parse ErrorResponse into error when single child", async () => {
				await repository
					.create( "500/", {} )
					.then( () => fail( "Should not resolve" ) )
					.catch( ( error:HTTPError & ErrorResponse ) => {
						expect( error ).toBeDefined();
						expect( error ).toEqual( jasmine.any( HTTPError ) );

						expect( error.message ).toBe( "Message 01, Message 02" );
						expect( error.statusCode ).toBe( 500 );

						expect( error.errors ).toBeDefined();
						expect( error.errors.length ).toBe( 2 );

						expect( error.errors[ 0 ].errorCode ).toBe( `code-01` );
						expect( error.errors[ 0 ].errorMessage ).toBe( `Message 01` );
						expect( error.errors[ 0 ].errorParameters.entries as AnyJasmineValue<MapEntry<string, Pointer>[]> ).toEqual( [ {
							entryKey: "document",
							entryValue: jasmine.objectContaining( {
								$id: "https://example.com/target-document/",
							} ),
						} ] );

						expect( error.errors[ 1 ].errorCode ).toBe( `code-02` );
						expect( error.errors[ 1 ].errorMessage ).toBe( `Message 02` );
						expect( error.errors[ 1 ].errorParameters.entries as AnyJasmineValue<MapEntry<string, Pointer>[]> ).toEqual( [ {
							entryKey: "document",
							entryValue: jasmine.objectContaining( {
								$id: "https://example.com/target-document/",
							} ),
						} ] );
					} )
				;
			} );

			it( "should parse ErrorResponse into error when multiple child", async () => {
				await repository
					.create( "500/", [ {}, {} ] )
					.then( () => fail( "Should not resolve" ) )
					.catch( ( error:HTTPError & ErrorResponse ) => {
						expect( error ).toBeDefined();
						expect( error ).toEqual( jasmine.any( HTTPError ) );

						expect( error.message ).toBe( "Message 01, Message 02" );
						expect( error.statusCode ).toBe( 500 );

						expect( error.errors ).toBeDefined();
						expect( error.errors.length ).toBe( 2 );

						expect( error.errors[ 0 ].errorCode ).toBe( `code-01` );
						expect( error.errors[ 0 ].errorMessage ).toBe( `Message 01` );
						expect( error.errors[ 0 ].errorParameters.entries as AnyJasmineValue<MapEntry<string, Pointer>[]> ).toEqual( [ {
							entryKey: "document",
							entryValue: jasmine.objectContaining( {
								$id: "https://example.com/target-document/",
							} ),
						} ] );

						expect( error.errors[ 1 ].errorCode ).toBe( `code-02` );
						expect( error.errors[ 1 ].errorMessage ).toBe( `Message 02` );
						expect( error.errors[ 1 ].errorParameters.entries as AnyJasmineValue<MapEntry<string, Pointer>[]> ).toEqual( [ {
							entryKey: "document",
							entryValue: jasmine.objectContaining( {
								$id: "https://example.com/target-document/",
							} ),
						} ] );
					} )
				;
			} );

		} );

		describe( method( OBLIGATORY, "createAndRetrieve" ), () => {

			it( hasSignature(
				[ "T extends object" ],
				"Persists the object as a child of the uri specified and retrieves the updates data from the server.", [
					{ name: "uri", type: "string", description: "URI of the document where to create the child." },
					{ name: "child", type: "T", description: "The object from where to create the child." },
					{ name: "requestOptions", type: "CarbonLDP.HTTP.RequestOptions", optional: true, description: "Customizable options for the request." },
				],
				{ type: "Promise<T & CarbonLDP.Document>" }
			), ():void => {} );

			it( hasSignature(
				[ "T extends object" ],
				"Persists the object with the slug specified as a child of the uri specified and retrieves the updates data from the server.", [
					{ name: "uri", type: "string", description: "URI of the document where to create the child." },
					{ name: "child", type: "T", description: "The object from where to create the child." },
					{ name: "slug", type: "string", description: "The slug that will be used in the child URI." },
					{ name: "requestOptions", type: "CarbonLDP.HTTP.RequestOptions", optional: true, description: "Customizable options for the request." },
				],
				{ type: "Promise<T & CarbonLDP.Document>" }
			), ():void => {} );

			it( hasSignature(
				[ "T extends object" ],
				"Persists multiple objects as children of the uri specified and retrieves the updates data from the server.", [
					{ name: "uri", type: "string", description: "URI of the document where to create the child." },
					{ name: "children", type: "T[]", description: "An array with the objects to be persisted as the new children." },
					{ name: "requestOptions", type: "CarbonLDP.HTTP.RequestOptions", optional: true, description: "Customizable options for every the request." },
				],
				{ type: "Promise<(T & CarbonLDP.Document)[]>", description: "Promise that contains the new UNRESOLVED persisted children." }
			), ():void => {} );

			it( hasSignature(
				[ "T extends object" ],
				"Persists multiple objects as children of the uri specified and retrieves the updates data from the server.", [
					{ name: "uri", type: "string", description: "URI of the document where to create the child." },
					{ name: "children", type: "T[]", description: "An array with the objects to be persisted as the new children." },
					{ name: "slugs", type: "string[]", description: "Array with the slugs that corresponds to each object in `object` parameter, in the order in which they were defined. If an element in the array is undefined or null, the slug will be generated by the platform." },
					{ name: "requestOptions", type: "CarbonLDP.HTTP.RequestOptions", optional: true, description: "Customizable options for every the request." },
				],
				{ type: "Promise<(T & CarbonLDP.Document)[]>", description: "Promise that contains the new UNRESOLVED persisted children." }
			), ():void => {} );

			it( "should exists", ():void => {
				expect( repository.createAndRetrieve ).toBeDefined();
				expect( repository.createAndRetrieve ).toEqual( jasmine.any( Function ) );
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

			function stubWaitingRequests( url:string ):void {
				jasmine.Ajax
					.requests
					.filter( url )
					.forEach( ( request, index ) => {
						request.respondWith( generateResponseOptions( url, { index } ) );
					} )
				;
			}


			it( "should request from URI", async () => {
				stubRequest( "https://example.com/resource/" );

				await repository.createAndRetrieve( "https://example.com/resource/", {} );

				const request:JasmineAjaxRequest = jasmine.Ajax.requests.mostRecent();
				expect( request.url ).toBe( "https://example.com/resource/" );
			} );

			it( "should request from relative URI", async () => {
				stubRequest( "https://example.com/relative/" );

				await repository.createAndRetrieve( "relative/", {} );

				const request:JasmineAjaxRequest = jasmine.Ajax.requests.mostRecent();
				expect( request.url ).toBe( "https://example.com/relative/" );
			} );

			it( "should request from resolved prefixed name", async () => {
				stubRequest( "https://example.com/resource/" );

				$context.extendObjectSchema( { "ex": "https://example.com/" } );

				await repository.createAndRetrieve( "ex:resource/", {} );

				const request:JasmineAjaxRequest = jasmine.Ajax.requests.mostRecent();
				expect( request.url ).toBe( "https://example.com/resource/" );
			} );

			it( "should throw error when from URI outside context scope", async () => {
				await repository
					.createAndRetrieve( "https://example.org/resource/", {} )
					.catch( error => {
						expect( () => { throw error; } )
							.toThrowError( IllegalArgumentError, `"https://example.org/resource/" is out of scope.` );
					} )
				;
			} );

			it( "should throw error when from URI is BNode label", async () => {
				await repository
					.createAndRetrieve( "_:1", {} )
					.catch( error => {
						expect( () => { throw error; } )
							.toThrowError( IllegalArgumentError, `"_:1" is out of scope.` );
					} )
				;
			} );

			it( "should throw error when from URI is Named Fragment label", async () => {
				await repository
					.createAndRetrieve( "#fragment", {} )
					.catch( error => {
						expect( () => { throw error; } )
							.toThrowError( IllegalArgumentError, `"#fragment" is out of scope.` );
					} )
				;
			} );

			it( "should throw error when unresolved prefixed name", async () => {
				await repository
					.createAndRetrieve( "ex:resource/", {} )
					.catch( error => {
						expect( () => { throw error; } )
							.toThrowError( IllegalArgumentError, `"ex:resource/" is out of scope.` );
					} )
				;
			} );


			it( "should send basic request headers in single child", async () => {
				stubRequest( "https://example.com/resource/" );

				await repository.createAndRetrieve( "resource/", {} );

				const request:JasmineAjaxRequest = jasmine.Ajax.requests.mostRecent();
				expect( request.requestHeaders ).toEqual( {
					"accept": "application/ld+json",
					"content-type": "application/ld+json",
					"prefer": [
						`${ LDP.Container }; rel=interaction-model`,
						"return=representation",
					].join( ", " ),
				} );
			} );

			it( "should send basic request headers in multiple child", async () => {
				const promises:Promise<{}[]> = repository.createAndRetrieve( "resource/", [ {}, {} ] );


				const request1:JasmineAjaxRequest = jasmine.Ajax.requests.at( 0 );
				expect( request1.requestHeaders ).toEqual( {
					"accept": "application/ld+json",
					"content-type": "application/ld+json",
					"prefer": [
						`${ LDP.Container }; rel=interaction-model`,
						"return=representation",
					].join( ", " ),
				} );

				const request2:JasmineAjaxRequest = jasmine.Ajax.requests.at( 1 );
				expect( request2.requestHeaders ).toEqual( {
					"accept": "application/ld+json",
					"content-type": "application/ld+json",
					"prefer": [
						`${ LDP.Container }; rel=interaction-model`,
						"return=representation",
					].join( ", " ),
				} );


				stubWaitingRequests( "https://example.com/resource/" );
				await promises;
			} );

			it( "should add custom headers in single child", async () => {
				stubRequest( "https://example.com/resource/" );

				await repository.createAndRetrieve( "resource/", {}, {
					headers: new Map()
						.set( "custom", new Header( "custom value" ) )
					,
				} );

				const request:JasmineAjaxRequest = jasmine.Ajax.requests.mostRecent();
				expect( request.requestHeaders ).toEqual( jasmine.objectContaining( {
					"custom": "custom value",
				} ) );
			} );

			it( "should send basic request headers in multiple children", async () => {
				const promises:Promise<{}[]> = repository.createAndRetrieve( "resource/", [ {}, {} ], {
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


				stubWaitingRequests( "https://example.com/resource/" );
				await promises;
			} );

			it( "should add slug header when single child", async () => {
				stubRequest( "https://example.com/resource/" );

				await repository.createAndRetrieve( "resource/", {}, "child-slug" );

				const request:JasmineAjaxRequest = jasmine.Ajax.requests.mostRecent();
				expect( request.requestHeaders ).toEqual( jasmine.objectContaining( {
					"slug": "child-slug",
				} ) );
			} );

			it( "should add slug header when multiple child", async () => {
				const promises:Promise<{}[]> = repository.createAndRetrieve( "resource/", [ {}, {} ], [ "child-slug-1", "child-slug-2" ] );

				const request1:JasmineAjaxRequest = jasmine.Ajax.requests.at( 0 );
				expect( request1.requestHeaders ).toEqual( jasmine.objectContaining( {
					"slug": "child-slug-1",
				} ) );

				const request2:JasmineAjaxRequest = jasmine.Ajax.requests.at( 1 );
				expect( request2.requestHeaders ).toEqual( jasmine.objectContaining( {
					"slug": "child-slug-2",
				} ) );

				stubWaitingRequests( "https://example.com/resource/" );
				await promises;
			} );

			it( "should not add slug header when multiple but less slugs than children", async () => {
				const promises:Promise<{}[]> = repository.createAndRetrieve( "/", [ {}, {} ], [ "child-slug" ] );

				const request1:JasmineAjaxRequest = jasmine.Ajax.requests.at( 0 );
				expect( request1.requestHeaders ).toEqual( jasmine.objectContaining( {
					"slug": "child-slug",
				} ) );

				const request2:JasmineAjaxRequest = jasmine.Ajax.requests.at( 1 );
				expect( request2.requestHeaders ).not.toEqual( jasmine.objectContaining( {
					"slug": jasmine.anything() as any,
				} ) );


				stubWaitingRequests( "https://example.com/" );
				await promises;
			} );


			it( "should send converted JSONLD when single child", async () => {
				stubRequest( "https://example.com/resource/" );

				$context
					.extendObjectSchema( {
						"@vocab": "https://example.com/ns#",
					} )
				;

				await repository.createAndRetrieve( "resource/", {
					string: "my object",
					pointerSet: [
						{ $id: "_:1", string: "blank node" },
						{ $slug: "fragment", string: "named fragment" },
					],
				} );

				const request:JasmineAjaxRequest = jasmine.Ajax.requests.mostRecent();
				expect( JSON.parse( request.params ) ).toEqual( {
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
				} );
			} );

			it( "should send converted JSONLD when multiple children", async () => {
				$context
					.extendObjectSchema( {
						"@vocab": "https://example.com/ns#",
					} )
				;

				const promises:Promise<Document[]> = repository.createAndRetrieve( "resource/", [ {
					string: "my object 1",
				}, {
					string: "my object 2",
				} ] );

				const request1:JasmineAjaxRequest = jasmine.Ajax.requests.at( 0 );
				expect( JSON.parse( request1.params ) ).toEqual( {
					"@id": "",
					"@graph": [ {
						"@id": "",
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
						"https://example.com/ns#string": [ {
							"@value": "my object 2",
							"@type": XSD.string,
						} ],
					} ],
				} );


				stubWaitingRequests( "https://example.com/resource/" );
				await promises;
			} );

			it( "should return same child object reference", async () => {
				stubRequest( "https://example.com/" );

				const child:object = {};

				const returned:Document = await repository.createAndRetrieve( "/", child );

				expect( child ).toBe( returned );
			} );

			it( "should return same children object references", async () => {
				const child1:object = {};
				const child2:object = {};

				const promise:Promise<Document[]> = repository.createAndRetrieve( "/", [ child1, child2 ] );

				jasmine.Ajax
					.requests
					.filter( "https://example.com/" )
					.forEach( ( request, index ) => {
						request.respondWith( generateResponseOptions( "https://example.com/", { index } ) );
					} )
				;

				const [ returned1, returned2 ]:Document[] = await promise;
				expect( child1 ).toBe( returned1 );
				expect( child2 ).toBe( returned2 );
			} );

			it( "should have stored the child in the registry", async () => {
				stubRequest( "https://example.com/" );

				const returned:Document = await repository.createAndRetrieve( "/", {} );

				expect( $context.registry.hasPointer( returned.$id ) ).toBe( true );
				expect( $context.registry.getPointer( returned.$id ) ).toBe( returned );
			} );

			it( "should have stored the children in the registry", async () => {
				const promises:Promise<Document[]> = repository.createAndRetrieve( "/", [ {}, {} ] );

				jasmine.Ajax
					.requests
					.filter( "https://example.com/" )
					.forEach( ( request, index ) => {
						request.respondWith( generateResponseOptions( "https://example.com/", { index } ) );
					} )
				;

				const [ returned1, returned2 ]:Document[] = await promises;

				expect( $context.registry.hasPointer( returned1.$id ) ).toBe( true );
				expect( $context.registry.getPointer( returned1.$id ) ).toBe( returned1 );

				expect( $context.registry.hasPointer( returned2.$id ) ).toBe( true );
				expect( $context.registry.getPointer( returned2.$id ) ).toBe( returned2 );
			} );

			it( "should throw error if child is already persisted", async () => {
				const child:Document = Document.decorate( {
					$id: "",
					$registry: $context.registry,
					$repository: $context.repository,
				} );

				await repository
					.createAndRetrieve( "/", child )
					.then( () => fail( "Should not resolve" ) )
					.catch( error => {
						expect( () => { throw error; } )
							.toThrowError( IllegalArgumentError, "The object is already a resolvable pointer." );
					} );
			} );

			it( "should throw error if any children is already persisted", async () => {
				const child:Document = Document.decorate( {
					$id: "",
					$registry: $context.registry,
					$repository: $context.repository,
				} );

				await repository
					.createAndRetrieve( "/", [ {}, child, {} ] )
					.then( () => fail( "Should not resolve" ) )
					.catch( error => {
						expect( () => { throw error; } )
							.toThrowError( IllegalArgumentError, `The object in "1" is already a resolvable pointer.` );
					} );
			} );

			it( "should throw error if child already being persisted", async () => {
				const child:object = {};

				await Promise.all( [
					repository.createAndRetrieve( "/", child ),
					repository.createAndRetrieve( "/", child ),
				] )
					.then( () => fail( "Should not resolve" ) )
					.catch( error => {
						expect( () => { throw error; } )
							.toThrowError( IllegalArgumentError, "The object is already being persisted." );
					} );
			} );

			it( "should be able to resend child after a failed request", async () => {
				const child:object = {};

				try {
					stubRequest( "https://example.com/", { status: 500 } );
					await repository.createAndRetrieve( "/", child );

				} catch( error ) {
					stubRequest( "https://example.com/" );
					await repository.createAndRetrieve( "/", child );

					expect().nothing();
				}
			} );


			it( "should add resolved data to the child", async () => {
				stubRequest( "https://example.com/" );

				const returned:Document = await repository.create( "/", {} );

				expect( returned ).toEqual( jasmine.objectContaining( {
					_resolved: true,
					$eTag: "\"1-12345\"",
					$id: "https://example.com/child-1/",
				} ) );
			} );

			it( "should add resolved data to the children", async () => {
				const promise:Promise<Document[]> = repository.create( "/", [ {}, {} ] );

				jasmine.Ajax
					.requests
					.filter( "https://example.com/" )
					.forEach( ( request, index ) => {
						request.respondWith( generateResponseOptions( "https://example.com/", { index } ) );
					} )
				;

				const [ returned1, returned2 ]:Document[] = await promise;
				expect( returned1 ).toEqual( jasmine.objectContaining( {
					_resolved: true,
					$eTag: "\"0-12345\"",
					$id: "https://example.com/child-0/",
				} ) );
				expect( returned2 ).toEqual( jasmine.objectContaining( {
					_resolved: true,
					$eTag: "\"1-12345\"",
					$id: "https://example.com/child-1/",
				} ) );
			} );

			it( "should update the child data", async () => {
				$context
					.extendObjectSchema( { "@vocab": "https://example.com/ns#" } );

				type MyResource = { string:string, pointerSet?:MyResource[] };
				const promise:Promise<Document & MyResource> = repository.createAndRetrieve( "/", {
					string: "document",
					pointerSet: [
						{
							$id: "_:1",
							string: "blank node",
							pointerSet: [],
						},
						{
							$slug: "fragment",
							string: "named fragment",
						},
						{
							$id: "_:2",
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


				const returned:Document & MyResource = await promise;
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
				$context
					.extendObjectSchema( { "@vocab": "https://example.com/ns#" } );

				type MyResource = { string:string, pointerSet?:MyResource[] };
				const promise:Promise<MyResource[]> = repository.createAndRetrieve( "/", [
					{
						string: "document 1",
						pointerSet: [
							{
								$id: "_:1.1",
								string: "fragment 1.1",
							},
						],
					},
					{
						string: "document 2",
						pointerSet: [
							{
								$id: "_:2.1",
								string: "fragment 2.1",
								pointerSet: [ {
									$id: "#2.1.1",
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

				$context
					.extendObjectSchema( { "@vocab": "https://example.com/ns#" } );


				type BNode = { $id:string, string:string };
				type MyDoc = { blankNode1:BNode, blankNode2:BNode };
				const returned:Document & MyDoc = await repository.createAndRetrieve<MyDoc>( "/", {
					blankNode1: {
						$id: "_:1",
						string: "blank node 1",
					},
					blankNode2: {
						$id: "_:2",
						string: "blank node 2",
					},
				} );

				expect( returned.hasPointer( "_:1" ) ).toBe( false );
				expect( returned.blankNode1 ).toEqual( jasmine.objectContaining( {
					$id: "_:new-1",
					string: "updated blank node 1",
				} ) );

				expect( returned.hasPointer( "_:2" ) ).toBe( false );
				expect( returned.blankNode2 ).toEqual( jasmine.objectContaining( {
					$id: "_:new-2",
					string: "updated blank node 2",
				} ) );
			} );


			it( "should parse ErrorResponse into error when single child", async () => {
				await repository
					.createAndRetrieve( "500/", {} )
					.then( () => fail( "Should not resolve" ) )
					.catch( ( error:HTTPError & ErrorResponse ) => {
						expect( error ).toBeDefined();
						expect( error ).toEqual( jasmine.any( HTTPError ) );

						expect( error.message ).toBe( "Message 01, Message 02" );
						expect( error.statusCode ).toBe( 500 );

						expect( error.errors ).toBeDefined();
						expect( error.errors.length ).toBe( 2 );

						expect( error.errors[ 0 ].errorCode ).toBe( `code-01` );
						expect( error.errors[ 0 ].errorMessage ).toBe( `Message 01` );
						expect( error.errors[ 0 ].errorParameters.entries as AnyJasmineValue<MapEntry<string, Pointer>[]> ).toEqual( [ {
							entryKey: "document",
							entryValue: jasmine.objectContaining( {
								$id: "https://example.com/target-document/",
							} ),
						} ] );

						expect( error.errors[ 1 ].errorCode ).toBe( `code-02` );
						expect( error.errors[ 1 ].errorMessage ).toBe( `Message 02` );
						expect( error.errors[ 1 ].errorParameters.entries as AnyJasmineValue<MapEntry<string, Pointer>[]> ).toEqual( [ {
							entryKey: "document",
							entryValue: jasmine.objectContaining( {
								$id: "https://example.com/target-document/",
							} ),
						} ] );
					} )
				;
			} );

			it( "should parse ErrorResponse into error when multiple child", async () => {
				await repository
					.createAndRetrieve( "500/", [ {}, {} ] )
					.then( () => fail( "Should not resolve" ) )
					.catch( ( error:HTTPError & ErrorResponse ) => {
						expect( error ).toBeDefined();
						expect( error ).toEqual( jasmine.any( HTTPError ) );

						expect( error.message ).toBe( "Message 01, Message 02" );
						expect( error.statusCode ).toBe( 500 );

						expect( error.errors ).toBeDefined();
						expect( error.errors.length ).toBe( 2 );

						expect( error.errors[ 0 ].errorCode ).toBe( `code-01` );
						expect( error.errors[ 0 ].errorMessage ).toBe( `Message 01` );
						expect( error.errors[ 0 ].errorParameters.entries as AnyJasmineValue<MapEntry<string, Pointer>[]> ).toEqual( [ {
							entryKey: "document",
							entryValue: jasmine.objectContaining( {
								$id: "https://example.com/target-document/",
							} ),
						} ] );

						expect( error.errors[ 1 ].errorCode ).toBe( `code-02` );
						expect( error.errors[ 1 ].errorMessage ).toBe( `Message 02` );
						expect( error.errors[ 1 ].errorParameters.entries as AnyJasmineValue<MapEntry<string, Pointer>[]> ).toEqual( [ {
							entryKey: "document",
							entryValue: jasmine.objectContaining( {
								$id: "https://example.com/target-document/",
							} ),
						} ] );
					} )
				;
			} );

		} );


		describe( method( OBLIGATORY, "save" ), () => {

			it( hasSignature(
				[ "T extends object" ],
				"Send the changes of the document to the server.", [
					{ name: "document", type: "CarbonLDP.Document", description: "The document to be saved." },
					{ name: "requestOptions", type: "CarbonLDP.HTTP.RequestOptions", optional: true, description: "Customizable options for the request." },
				],
				{ type: "Promise<T & CarbonLDP.Document>" }
			), () => {} );

			it( "should exists", ():void => {
				expect( repository.save ).toBeDefined();
				expect( repository.save ).toEqual( jasmine.any( Function ) );
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


			it( "should throw error when ID is outside context scope", async () => {
				document.$id = "https://example.org/resource/";

				await repository
					.save( document )
					.catch( error => {
						expect( () => { throw error; } )
							.toThrowError( IllegalArgumentError, `"https://example.org/resource/" is out of scope.` );
					} )
				;
			} );

			it( "should throw error when ID is BNode label", async () => {
				document.$id = "_:1";

				await repository
					.save( document )
					.catch( error => {
						expect( () => { throw error; } )
							.toThrowError( IllegalArgumentError, `"_:1" is out of scope.` );
					} )
				;
			} );

			it( "should throw error when ID is Named Fragment label", async () => {
				document.$id = "https://example.com/#fragment";

				await repository
					.save( document )
					.catch( error => {
						expect( () => { throw error; } )
							.toThrowError( IllegalArgumentError, `"https://example.com/#fragment" is out of scope.` );
					} )
				;
			} );

			it( "should throw error when ID is unresolved prefixed name", async () => {
				document.$id = "ex:resource/";

				await repository
					.save( document )
					.catch( error => {
						expect( () => { throw error; } )
							.toThrowError( IllegalArgumentError, `"ex:resource/" is out of scope.` );
					} )
				;
			} );


			it( "should return document if no dirty", async () => {
				const returned:Document = await repository.save( document );

				expect( returned ).toBe( document );
			} );

			it( "should send PATCH when dirty", async () => {
				stubRequest( "https://example.com/" );

				spyOnDecorated( document, "isDirty" )
					.and.returnValue( true );

				await repository.save( document );

				const request:JasmineAjaxRequest = jasmine.Ajax.requests.mostRecent();
				expect( request.url ).toBe( "https://example.com/" );
				expect( request.method ).toBe( "PATCH" );
			} );


			it( "should send basic request headers", async () => {
				stubRequest( "https://example.com/" );

				document.$eTag = "\"1-12345\"";
				spyOnDecorated( document, "isDirty" )
					.and.returnValue( true );

				await repository.save( document );

				const request:JasmineAjaxRequest = jasmine.Ajax.requests.mostRecent();
				expect( request.requestHeaders ).toEqual( {
					"accept": "application/ld+json",
					"content-type": "text/ldpatch",
					"if-match": "\"1-12345\"",
					"prefer": "return=minimal",
				} );
			} );

			it( "should add custom headers in single child", async () => {
				stubRequest( "https://example.com/" );

				spyOnDecorated( document, "isDirty" )
					.and.returnValue( true );


				await repository.save( document, {
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
					pointer:BaseResource & {
						string:string[];
						pointers:(BaseResource & {
							string:string[];
							number:number;
						})[];
					};
				};

				const object:MyDoc = Object.assign( document, {
					types: [ "https://example.com/ns#Document" ],
					list: [ 1, 2, 3, 4, 5 ],
					pointer: {
						$id: "#fragment",
						types: [ "https://example.con/ns#Fragment" ],
						string: [ "string 1", "string 2" ],
						pointers: [
							{
								$id: "_:blank-node",
								types: [ "https://example.con/ns#Fragment", "https://example.com/ns#BlankNode" ],
								string: [ "string 1" ],
								number: 100,
							},
							{
								$id: "_:to-delete",
								types: [ "https://example.con/ns#Fragment", "https://example.com/ns#BlankNode" ],
								string: [ "string --" ],
								number: - 100,
							},
						],
					},
				} );

				document._normalize();
				document._syncSnapshot();

				$context
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


				document.addType( "NewType" );
				object.list = [ 4, 1, 2, "s-1", "s-2", "s-3", 3 ];
				object.pointer.string = [ "string 2", "string 3" ];
				object.pointer.pointers[ 0 ].string = [ "string 1", "string -1" ];
				object.pointer.pointers[ 0 ].number = 100.001;
				object.pointer.pointers.splice( 1, 1 );

				await repository.save( document );

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

				Object.assign( document, {
					blankNode1: {
						$id: "_:1",
						string: "blank node 1",
					},
					blankNode2: {
						$id: "_:2",
						string: "blank node 2",
					},
				} );
				$context.registry._addPointer( document );

				type BNode = { $id:string, string:string };
				type MyDoc = { blankNode1:BNode, blankNode2:BNode };

				const returned:LDPDocumentTrait & MyDoc = await repository.save<MyDoc>( document );

				expect( returned.hasPointer( "_:1" ) ).toBe( false );
				expect( returned.blankNode1 ).toEqual( jasmine.objectContaining( {
					$id: "_:new-1",
					string: "blank node 1",
				} ) );

				expect( returned.hasPointer( "_:2" ) ).toBe( false );
				expect( returned.blankNode2 ).toEqual( jasmine.objectContaining( {
					$id: "_:new-2",
					string: "blank node 2",
				} ) );
			} );


			it( "should parse ErrorResponse into error", async () => {
				document.$id = "500/";
				spyOnDecorated( document, "isDirty" )
					.and.returnValue( true );

				await repository
					.save( document )
					.then( () => fail( "Should not resolve" ) )
					.catch( ( error:HTTPError & ErrorResponse ) => {
						expect( error ).toBeDefined();
						expect( error ).toEqual( jasmine.any( HTTPError ) );

						expect( error.message ).toBe( "Message 01, Message 02" );
						expect( error.statusCode ).toBe( 500 );

						expect( error.errors ).toBeDefined();
						expect( error.errors.length ).toBe( 2 );

						expect( error.errors[ 0 ].errorCode ).toBe( `code-01` );
						expect( error.errors[ 0 ].errorMessage ).toBe( `Message 01` );
						expect( error.errors[ 0 ].errorParameters.entries as AnyJasmineValue<MapEntry<string, Pointer>[]> ).toEqual( [ {
							entryKey: "document",
							entryValue: jasmine.objectContaining( {
								$id: "https://example.com/target-document/",
							} ),
						} ] );

						expect( error.errors[ 1 ].errorCode ).toBe( `code-02` );
						expect( error.errors[ 1 ].errorMessage ).toBe( `Message 02` );
						expect( error.errors[ 1 ].errorParameters.entries as AnyJasmineValue<MapEntry<string, Pointer>[]> ).toEqual( [ {
							entryKey: "document",
							entryValue: jasmine.objectContaining( {
								$id: "https://example.com/target-document/",
							} ),
						} ] );
					} )
				;
			} );

		} );

		describe( method( OBLIGATORY, "saveAndRefresh" ), () => {

			it( hasSignature(
				[ "T extends object" ],
				"Send the changes of the document and retrieves the updated data from the server.",
				[
					{ name: "document", type: "CarbonLDP.Document", description: "The document to be saved." },
					{ name: "requestOptions", type: "CarbonLDP.HTTP.RequestOptions", optional: true, description: "Customizable options for the request." },
				],
				{ type: "Promise<T & CarbonLDP.Document>" }
			), () => {} );

			it( "should exists", ():void => {
				expect( repository.saveAndRefresh ).toBeDefined();
				expect( repository.saveAndRefresh ).toEqual( jasmine.any( Function ) );
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


			it( "should throw error when ID is outside context scope", async () => {
				document.$id = "https://example.org/resource/";

				await repository
					.saveAndRefresh( document )
					.catch( error => {
						expect( () => { throw error; } )
							.toThrowError( IllegalArgumentError, `"https://example.org/resource/" is out of scope.` );
					} )
				;
			} );

			it( "should throw error when ID is BNode label", async () => {
				document.$id = "_:1";

				await repository
					.saveAndRefresh( document )
					.catch( error => {
						expect( () => { throw error; } )
							.toThrowError( IllegalArgumentError, `"_:1" is out of scope.` );
					} )
				;
			} );

			it( "should throw error when ID is Named Fragment label", async () => {
				document.$id = "https://example.com/#fragment";

				await repository
					.saveAndRefresh( document )
					.catch( error => {
						expect( () => { throw error; } )
							.toThrowError( IllegalArgumentError, `"https://example.com/#fragment" is out of scope.` );
					} )
				;
			} );

			it( "should throw error when ID is unresolved prefixed name", async () => {
				document.$id = "ex:resource/";

				await repository
					.saveAndRefresh( document )
					.catch( error => {
						expect( () => { throw error; } )
							.toThrowError( IllegalArgumentError, `"ex:resource/" is out of scope.` );
					} )
				;
			} );


			it( "should return if no dirty", async () => {
				const returned:Document = await repository.saveAndRefresh( document );

				expect( returned ).toBe( document );
			} );

			it( "should send PATCH to when dirty", async () => {
				stubRequest( "https://example.com/" );

				spyOnDecorated( document, "isDirty" )
					.and.returnValue( true );

				await repository.saveAndRefresh( document );

				const request:JasmineAjaxRequest = jasmine.Ajax.requests.mostRecent();
				expect( request.url ).toBe( "https://example.com/" );
				expect( request.method ).toBe( "PATCH" );
			} );


			it( "should send basic request headers", async () => {
				stubRequest( "https://example.com/" );

				document.$eTag = "\"1-12345\"";

				spyOnDecorated( document, "isDirty" )
					.and.returnValue( true );

				await repository.saveAndRefresh( document );

				const request:JasmineAjaxRequest = jasmine.Ajax.requests.mostRecent();
				expect( request.requestHeaders ).toEqual( {
					"accept": "application/ld+json",
					"content-type": "text/ldpatch",
					"if-match": "\"1-12345\"",
					"prefer": "return=representation",
				} );
			} );

			it( "should add custom headers in single child", async () => {
				stubRequest( "https://example.com/" );

				spyOnDecorated( document, "isDirty" )
					.and.returnValue( true );


				await repository.saveAndRefresh( document, {
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
					pointer:BaseResource & {
						string:string[];
						pointers:(BaseResource & {
							string:string[];
							number:number;
						})[];
					};
				};

				const object:MyDoc = Object.assign( document, {
					types: [ "https://example.com/ns#Document" ],
					list: [ 1, 2, 3, 4, 5 ],
					pointer: {
						$id: "#fragment",
						types: [ "https://example.con/ns#Fragment" ],
						string: [ "string 1", "string 2" ],
						pointers: [
							{
								$id: "_:blank-node",
								types: [ "https://example.con/ns#Fragment", "https://example.com/ns#BlankNode" ],
								string: [ "string 1" ],
								number: 100,
							},
							{
								$id: "_:to-delete",
								types: [ "https://example.con/ns#Fragment", "https://example.com/ns#BlankNode" ],
								string: [ "string --" ],
								number: - 100,
							},
						],
					},
				} );


				document._normalize();
				document._syncSnapshot();

				$context
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


				document.addType( "NewType" );
				object.list = [ 4, 1, 2, "s-1", "s-2", "s-3", 3 ];
				object.pointer.string = [ "string 2", "string 3" ];
				object.pointer.pointers[ 0 ].string = [ "string 1", "string -1" ];
				object.pointer.pointers[ 0 ].number = 100.001;
				object.pointer.pointers.splice( 1, 1 );

				await repository.saveAndRefresh( document );

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

				Object.assign( document, {
					string: "document",
				} );


				$context
					.extendObjectSchema( { "@vocab": "https://example.com/ns#" } );


				const returned:LDPDocumentTrait & MyDoc = await repository.saveAndRefresh<MyDoc>( document );
				expect( returned as MyDoc ).toEqual( {
					string: "updated document",
				} );
			} );

			it( "should update data", async () => {
				stubRequest( "https://example.com/", {} );

				Object.assign( document, {
					eTag: "\"0-12345\"",
					string: "document",
				} );


				const returned:Document = await repository.saveAndRefresh( document );
				expect( returned ).toEqual( jasmine.objectContaining( {
					$eTag: "\"1-12345\"",
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

				Object.assign( document, {
					blankNode1: {
						$id: "_:1",
						string: "blank node 1",
					},
					blankNode2: {
						$id: "_:2",
						string: "blank node 2",
					},
				} );
				$context.registry.__resourcesMap.set( "", document );

				$context.extendObjectSchema( { "@vocab": "https://example.com/ns#" } );

				type BNode = { $id:string, string:string };
				type MyDoc = { blankNode1:BNode, blankNode2:BNode };

				const returned:LDPDocumentTrait & MyDoc = await repository.saveAndRefresh<MyDoc>( document );

				expect( returned.hasPointer( "_:1" ) ).toBe( false );
				expect( returned.blankNode1 ).toEqual( jasmine.objectContaining( {
					$id: "_:new-1",
					string: "updated blank node 1",
				} ) );

				expect( returned.hasPointer( "_:2" ) ).toBe( false );
				expect( returned.blankNode2 ).toEqual( jasmine.objectContaining( {
					$id: "_:new-2",
					string: "updated blank node 2",
				} ) );
			} );


			it( "should parse ErrorResponse into error", async () => {
				spyOnDecorated( document, "isDirty" )
					.and.returnValue( true );
				document.$id = "500/";

				await repository
					.saveAndRefresh( document )
					.then( () => fail( "Should not resolve" ) )
					.catch( ( error:HTTPError & ErrorResponse ) => {
						expect( error ).toBeDefined();
						expect( error ).toEqual( jasmine.any( HTTPError ) );

						expect( error.message ).toBe( "Message 01, Message 02" );
						expect( error.statusCode ).toBe( 500 );

						expect( error.errors ).toBeDefined();
						expect( error.errors.length ).toBe( 2 );

						expect( error.errors[ 0 ].errorCode ).toBe( `code-01` );
						expect( error.errors[ 0 ].errorMessage ).toBe( `Message 01` );
						expect( error.errors[ 0 ].errorParameters.entries as AnyJasmineValue<MapEntry<string, Pointer>[]> ).toEqual( [ {
							entryKey: "document",
							entryValue: jasmine.objectContaining( {
								$id: "https://example.com/target-document/",
							} ),
						} ] );

						expect( error.errors[ 1 ].errorCode ).toBe( `code-02` );
						expect( error.errors[ 1 ].errorMessage ).toBe( `Message 02` );
						expect( error.errors[ 1 ].errorParameters.entries as AnyJasmineValue<MapEntry<string, Pointer>[]> ).toEqual( [ {
							entryKey: "document",
							entryValue: jasmine.objectContaining( {
								$id: "https://example.com/target-document/",
							} ),
						} ] );
					} )
				;
			} );

		} );

		describe( method( OBLIGATORY, "refresh" ), () => {

			it( hasSignature(
				[ "T extends object" ],
				"Update the document with the latest changes from the server.",
				[
					{ name: "document", type: "CarbonLDP.Document", description: "The document to be refreshed." },
					{ name: "requestOptions", type: "CarbonLDP.HTTP.RequestOptions", optional: true, description: "Customizable options for the request." },
				],
				{ type: "Promise<T & CarbonLDP.Document>" }
			), () => {} );

			it( "should exists", ():void => {
				expect( repository.refresh ).toBeDefined();
				expect( repository.refresh ).toEqual( jasmine.any( Function ) );
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


			it( "should throw error when ID is outside context scope", async () => {
				document.$id = "https://example.org/resource/";

				await repository
					.refresh( document )
					.catch( error => {
						expect( () => { throw error; } )
							.toThrowError( IllegalArgumentError, `"https://example.org/resource/" is out of scope.` );
					} )
				;
			} );

			it( "should throw error when ID is BNode label", async () => {
				document.$id = "_:1";

				await repository
					.refresh( document )
					.catch( error => {
						expect( () => { throw error; } )
							.toThrowError( IllegalArgumentError, `"_:1" is out of scope.` );
					} )
				;
			} );

			it( "should throw error when ID is Named Fragment label", async () => {
				document.$id = "https://example.com/#fragment";

				await repository
					.refresh( document )
					.catch( error => {
						expect( () => { throw error; } )
							.toThrowError( IllegalArgumentError, `"https://example.com/#fragment" is out of scope.` );
					} )
				;
			} );

			it( "should throw error when ID is unresolved prefixed name", async () => {
				document.$id = "ex:resource/";

				await repository
					.refresh( document )
					.catch( error => {
						expect( () => { throw error; } )
							.toThrowError( IllegalArgumentError, `"ex:resource/" is out of scope.` );
					} )
				;
			} );


			it( "should return same if no-modified received", async () => {
				stubRequest( "https://example.com/", { status: 304 } );

				const returned:Document = await repository.refresh( document );

				expect( returned ).toBe( document );
			} );


			it( "should send basic request headers", async () => {
				stubRequest( "https://example.com/" );

				document.$eTag = "\"1-12345\"";
				spyOnDecorated( document, "isDirty" )
					.and.returnValue( true );

				await repository.refresh( document );

				const request:JasmineAjaxRequest = jasmine.Ajax.requests.mostRecent();
				expect( request.requestHeaders ).toEqual( {
					"prefer": `${ LDP.RDFSource }; rel=interaction-model`,
					"accept": "application/ld+json",
					"if-none-match": "\"1-12345\"",
				} );
			} );

			it( "should add custom headers in single child", async () => {
				stubRequest( "https://example.com/" );

				spyOnDecorated( document, "isDirty" )
					.and.returnValue( true );


				await repository.refresh( document, {
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

				Object.assign( document, {
					string: "document",
					pointerSet: [
						{
							$id: "_:1",
							string: "blank node",
							pointerSet: [],
						},
						{
							$slug: "fragment",
							string: "named fragment",
						},
						{
							$id: "_:2",
							string: "to be removed",
						},
					],
				} );

				document._normalize();
				$context.registry.__resourcesMap.set( "", document );


				$context
					.extendObjectSchema( { "@vocab": "https://example.com/ns#" } );


				const returned:LDPDocumentTrait & MyResource = await repository.refresh<MyResource>( document );
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

			it( "should update data", async () => {
				stubRequest( "https://example.com/", {} );

				Object.assign( document, {
					$eTag: "\"0-12345\"",
					string: "document",
				} );


				const returned:LDPDocumentTrait = await repository.refresh( document );
				expect( returned ).toEqual( jasmine.objectContaining( {
					$eTag: "\"1-12345\"",
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

				Object.assign( document, {
					blankNode1: {
						$id: "_:1",
						string: "blank node 1",
					},
					blankNode2: {
						$id: "_:2",
						string: "blank node 2",
					},
				} );
				$context.registry.__resourcesMap.set( "", document );

				$context.extendObjectSchema( { "@vocab": "https://example.com/ns#" } );

				type BNode = { $id:string, string:string };
				type MyDoc = { blankNode1:BNode, blankNode2:BNode };

				const returned:LDPDocumentTrait & MyDoc = await repository.refresh<MyDoc>( document );

				expect( returned.hasPointer( "_:1" ) ).toBe( false );
				expect( returned.blankNode1 ).toEqual( jasmine.objectContaining( {
					$id: "_:new-1",
					string: "updated blank node 1",
				} ) );

				expect( returned.hasPointer( "_:2" ) ).toBe( false );
				expect( returned.blankNode2 ).toEqual( jasmine.objectContaining( {
					$id: "_:new-2",
					string: "updated blank node 2",
				} ) );
			} );


			it( "should parse ErrorResponse into error", async () => {
				document.$id = "500/";

				await repository
					.refresh( document )
					.then( () => fail( "Should not resolve" ) )
					.catch( ( error:HTTPError & ErrorResponse ) => {
						expect( error ).toBeDefined();
						expect( error ).toEqual( jasmine.any( HTTPError ) );

						expect( error.message ).toBe( "Message 01, Message 02" );
						expect( error.statusCode ).toBe( 500 );

						expect( error.errors ).toBeDefined();
						expect( error.errors.length ).toBe( 2 );

						expect( error.errors[ 0 ].errorCode ).toBe( `code-01` );
						expect( error.errors[ 0 ].errorMessage ).toBe( `Message 01` );
						expect( error.errors[ 0 ].errorParameters.entries as AnyJasmineValue<MapEntry<string, Pointer>[]> ).toEqual( [ {
							entryKey: "document",
							entryValue: jasmine.objectContaining( {
								$id: "https://example.com/target-document/",
							} ),
						} ] );

						expect( error.errors[ 1 ].errorCode ).toBe( `code-02` );
						expect( error.errors[ 1 ].errorMessage ).toBe( `Message 02` );
						expect( error.errors[ 1 ].errorParameters.entries as AnyJasmineValue<MapEntry<string, Pointer>[]> ).toEqual( [ {
							entryKey: "document",
							entryValue: jasmine.objectContaining( {
								$id: "https://example.com/target-document/",
							} ),
						} ] );
					} )
				;
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

			it( "should exists", ():void => {
				expect( repository.delete ).toBeDefined();
				expect( repository.delete ).toEqual( jasmine.any( Function ) );
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


			it( "should request from URI", async () => {
				stubRequest( "https://example.com/resource/" );

				await repository.delete( "https://example.com/resource/" );

				const request:JasmineAjaxRequest = jasmine.Ajax.requests.mostRecent();
				expect( request.url ).toBe( "https://example.com/resource/" );
			} );

			it( "should request from relative URI", async () => {
				stubRequest( "https://example.com/relative/" );

				await repository
					.delete( "https://example.org/resource/" )
					.catch( error => {
						expect( () => { throw error; } )
							.toThrowError( IllegalArgumentError, `"https://example.org/resource/" is out of scope.` );
					} )
				;
			} );

			it( "should throw error when from URI is BNode label", async () => {
				await repository
					.delete( "_:1" )
					.catch( error => {
						expect( () => { throw error; } )
							.toThrowError( IllegalArgumentError, `"_:1" is out of scope.` );
					} )
				;
			} );

			it( "should throw error when from URI is Named Fragment label", async () => {
				await repository
					.delete( "#fragment" )
					.catch( error => {
						expect( () => { throw error; } )
							.toThrowError( IllegalArgumentError, `"#fragment" is out of scope.` );
					} )
				;
			} );

			it( "should throw error when unresolved prefixed name", async () => {
				await repository
					.delete( "ex:resource/" )
					.catch( error => {
						expect( () => { throw error; } )
							.toThrowError( IllegalArgumentError, `"ex:resource/" is out of scope.` );
					} )
				;
			} );


			it( "should send basic request headers", async () => {
				stubRequest( "https://example.com/resource/" );

				await repository.delete( "resource/" );

				const request:JasmineAjaxRequest = jasmine.Ajax.requests.mostRecent();
				expect( request.requestHeaders ).toEqual( {
					"accept": "application/ld+json",
					"prefer": `${ LDP.RDFSource }; rel=interaction-model`,
				} );
			} );

			it( "should add custom headers", async () => {
				stubRequest( "https://example.com/resource/" );

				await repository.delete( "resource/", {
					headers: new Map()
						.set( "custom", new Header( "custom value" ) )
					,
				} );

				const request:JasmineAjaxRequest = jasmine.Ajax.requests.mostRecent();
				expect( request.requestHeaders ).toEqual( jasmine.objectContaining( {
					"custom": "custom value",
				} ) );
			} );


			it( "should remove pointer whe URI provided", async () => {
				stubRequest( "https://example.com/resource/" );

				const target:Document = $context.registry
					._addPointer( { $id: "https://example.com/resource/" } );

				await repository.delete( "resource/" );

				expect( $context.registry.hasPointer( target.$id ) ).toBe( false );
			} );


			it( "should parse ErrorResponse into error", async () => {
				await repository
					.delete( "500/" )
					.then( () => fail( "Should not resolve" ) )
					.catch( ( error:HTTPError & ErrorResponse ) => {
						expect( error ).toBeDefined();
						expect( error ).toEqual( jasmine.any( HTTPError ) );

						expect( error.message ).toBe( "Message 01, Message 02" );
						expect( error.statusCode ).toBe( 500 );

						expect( error.errors ).toBeDefined();
						expect( error.errors.length ).toBe( 2 );

						expect( error.errors[ 0 ].errorCode ).toBe( `code-01` );
						expect( error.errors[ 0 ].errorMessage ).toBe( `Message 01` );
						expect( error.errors[ 0 ].errorParameters.entries as AnyJasmineValue<MapEntry<string, Pointer>[]> ).toEqual( [ {
							entryKey: "document",
							entryValue: jasmine.objectContaining( {
								$id: "https://example.com/target-document/",
							} ),
						} ] );

						expect( error.errors[ 1 ].errorCode ).toBe( `code-02` );
						expect( error.errors[ 1 ].errorMessage ).toBe( `Message 02` );
						expect( error.errors[ 1 ].errorParameters.entries as AnyJasmineValue<MapEntry<string, Pointer>[]> ).toEqual( [ {
							entryKey: "document",
							entryValue: jasmine.objectContaining( {
								$id: "https://example.com/target-document/",
							} ),
						} ] );
					} )
				;
			} );

		} );


		describe( method( OBLIGATORY, "addMember" ), () => {

			it( hasSignature(
				"Adds the provided resource as member of the specified document.", [
					{ name: "uri", type: "string", description: "URI of the document to add the specified member." },
					{ name: "member", type: "CarbonLDP.Pointer | string", description: "URI or Pointer to add as a member." },
					{ name: "requestOptions", type: "CarbonLDP.HTTP.RequestOptions", optional: true, description: "Customizable options for the request." },
				],
				{ type: "Promise<void>" }
			), ():void => {} );

			it( "should exists", ():void => {
				expect( repository.addMember ).toBeDefined();
				expect( repository.addMember ).toEqual( jasmine.any( Function ) );
			} );


			function stubRequest( url:string, options:{ status?:number, headers?:{ [ key:string ]:string } } = {} ):void {
				const status:number = options.status ?
					options.status : 204;

				// noinspection JSMismatchedCollectionQueryUpdate
				const headers:{ [ key:string ]:string } = options.headers ?
					options.headers : {};

				jasmine.Ajax
					.stubRequest( url, null, "PUT" )
					.andReturn( {
						status,
						responseHeaders: {
							...headers,
						},
					} );
			}


			it( "should request the URI provided", async () => {
				stubRequest( "https://example.com/resource/" );

				await repository
					.addMember( "https://example.com/resource/", "member/" );

				const request:JasmineAjaxRequest = jasmine.Ajax.requests.mostRecent();
				expect( request.url ).toBe( "https://example.com/resource/" );
			} );

			it( "should request relative URI provided", async () => {
				stubRequest( "https://example.com/relative/" );

				await repository
					.addMember( "relative/", "member/" );

				const request:JasmineAjaxRequest = jasmine.Ajax.requests.mostRecent();
				expect( request.url ).toBe( "https://example.com/relative/" );
			} );

			it( "should request resolved prefixed name provided", async () => {
				stubRequest( "https://example.com/resource/" );

				$context.extendObjectSchema( { "ex": "https://example.com/" } );

				await repository
					.addMember( "ex:resource/", "member/" );

				const request:JasmineAjaxRequest = jasmine.Ajax.requests.mostRecent();
				expect( request.url ).toBe( "https://example.com/resource/" );
			} );

			it( "should throw error when URI outside context scope", async () => {
				await repository
					.addMember( "https://example.org/resource/", "member/" )
					.catch( error => {
						expect( () => { throw error; } )
							.toThrowError( IllegalArgumentError, `"https://example.org/resource/" is out of scope.` );
					} )
				;
			} );

			it( "should throw error when URI is BNode label", async () => {
				await repository
					.addMember( "_:1", "member/" )
					.catch( error => {
						expect( () => { throw error; } )
							.toThrowError( IllegalArgumentError, `"_:1" is out of scope.` );
					} )
				;
			} );

			it( "should throw error when URI is Named Fragment label", async () => {
				await repository
					.addMember( "#fragment", "member/" )
					.catch( error => {
						expect( () => { throw error; } )
							.toThrowError( IllegalArgumentError, `"#fragment" is out of scope.` );
					} )
				;
			} );

			it( "should throw error when URI is unresolved prefixed name", async () => {
				await repository
					.addMember( "ex:resource/", "member/" )
					.catch( error => {
						expect( () => { throw error; } )
							.toThrowError( IllegalArgumentError, `"ex:resource/" is out of scope.` );
					} )
				;
			} );


			it( "should send add action when relative member", async () => {
				stubRequest( "https://example.com/resource/" );

				await repository
					.addMember( "resource/", "member/" );

				const request:JasmineAjaxRequest = jasmine.Ajax.requests.mostRecent();
				expect( JSON.parse( request.params ) ).toEqual( [
					{
						"@id": jasmine.any( String ),
						"@type": [ C.AddMemberAction ],
						[ C.targetMember ]: [
							{ "@id": "https://example.com/member/" },
						],
					},
				] );
			} );

			it( "should send add action when absolute member", async () => {
				stubRequest( "https://example.com/resource/" );

				await repository
					.addMember( "resource/", "https://example.com/member/" );

				const request:JasmineAjaxRequest = jasmine.Ajax.requests.mostRecent();
				expect( JSON.parse( request.params ) ).toEqual( [
					{
						"@id": jasmine.any( String ),
						"@type": [ C.AddMemberAction ],
						[ C.targetMember ]: [
							{ "@id": "https://example.com/member/" },
						],
					},
				] );
			} );

			it( "should send add action when Pointer member", async () => {
				stubRequest( "https://example.com/resource/" );

				await repository
					.addMember( "resource/", Pointer.create( { $id: "https://example.com/member/" } ) );

				const request:JasmineAjaxRequest = jasmine.Ajax.requests.mostRecent();
				expect( JSON.parse( request.params ) ).toEqual( [
					{
						"@id": jasmine.any( String ),
						"@type": [ C.AddMemberAction ],
						[ C.targetMember ]: [
							{ "@id": "https://example.com/member/" },
						],
					},
				] );
			} );


			it( "should send basic request headers", async () => {
				stubRequest( "https://example.com/resource/" );

				await repository.addMember( "resource/", "member/" );

				const request:JasmineAjaxRequest = jasmine.Ajax.requests.mostRecent();
				expect( request.requestHeaders ).toEqual( {
					"accept": "application/ld+json",
					"content-type": "application/ld+json",
					"prefer": [
						`${ LDP.Container }; rel=interaction-model`,
					].join( ", " ),
				} );
			} );

			it( "should add custom headers", async () => {
				stubRequest( "https://example.com/resource/" );

				await repository.addMember( "resource/", "member/", {
					headers: new Map()
						.set( "custom", new Header( "custom value" ) )
					,
				} );

				const request:JasmineAjaxRequest = jasmine.Ajax.requests.mostRecent();
				expect( request.requestHeaders ).toEqual( jasmine.objectContaining( {
					"custom": "custom value",
				} ) );
			} );


			it( "should parse ErrorResponse into error", async () => {
				await repository
					.addMember( "500/", "member/" )
					.then( () => fail( "Should not resolve" ) )
					.catch( ( error:HTTPError & ErrorResponse ) => {
						expect( error ).toBeDefined();
						expect( error ).toEqual( jasmine.any( HTTPError ) );

						expect( error.message ).toBe( "Message 01, Message 02" );
						expect( error.statusCode ).toBe( 500 );

						expect( error.errors ).toBeDefined();
						expect( error.errors.length ).toBe( 2 );

						expect( error.errors[ 0 ].errorCode ).toBe( `code-01` );
						expect( error.errors[ 0 ].errorMessage ).toBe( `Message 01` );
						expect( error.errors[ 0 ].errorParameters.entries as AnyJasmineValue<MapEntry<string, Pointer>[]> ).toEqual( [ {
							entryKey: "document",
							entryValue: jasmine.objectContaining( {
								$id: "https://example.com/target-document/",
							} ),
						} ] );

						expect( error.errors[ 1 ].errorCode ).toBe( `code-02` );
						expect( error.errors[ 1 ].errorMessage ).toBe( `Message 02` );
						expect( error.errors[ 1 ].errorParameters.entries as AnyJasmineValue<MapEntry<string, Pointer>[]> ).toEqual( [ {
							entryKey: "document",
							entryValue: jasmine.objectContaining( {
								$id: "https://example.com/target-document/",
							} ),
						} ] );
					} )
				;
			} );

		} );

		describe( method( OBLIGATORY, "addMembers" ), () => {

			it( hasSignature(
				"Adds the provided resources as members of the specified document.", [
					{ name: "uri", type: "string", description: "URI of the document to add the specified member." },
					{ name: "member", type: "CarbonLDP.Pointer | string", description: "URI or Pointer to add as a member." },
					{ name: "requestOptions", type: "CarbonLDP.HTTP.RequestOptions", optional: true, description: "Customizable options for the request." },
				],
				{ type: "Promise<void>" }
			), ():void => {} );

			it( "should exists", ():void => {
				expect( repository.addMembers ).toBeDefined();
				expect( repository.addMembers ).toEqual( jasmine.any( Function ) );
			} );


			function stubRequest( url:string, options:{ status?:number, headers?:{ [ key:string ]:string } } = {} ):void {
				const status:number = options.status ?
					options.status : 204;

				// noinspection JSMismatchedCollectionQueryUpdate
				const headers:{ [ key:string ]:string } = options.headers ?
					options.headers : {};

				jasmine.Ajax
					.stubRequest( url, null, "PUT" )
					.andReturn( {
						status,
						responseHeaders: {
							...headers,
						},
					} );
			}


			it( "should request the URI provided", async () => {
				stubRequest( "https://example.com/another-resource/" );

				await repository
					.addMembers( "https://example.com/another-resource/", [ "member/" ] );

				const request:JasmineAjaxRequest = jasmine.Ajax.requests.mostRecent();
				expect( request.url ).toBe( "https://example.com/another-resource/" );
			} );

			it( "should request relative URI provided", async () => {
				stubRequest( "https://example.com/relative/" );

				await repository
					.addMembers( "relative/", [ "member/" ] );

				const request:JasmineAjaxRequest = jasmine.Ajax.requests.mostRecent();
				expect( request.url ).toBe( "https://example.com/relative/" );
			} );

			it( "should request resolved prefixed name provided", async () => {
				stubRequest( "https://example.com/resource/" );

				$context.extendObjectSchema( { "ex": "https://example.com/" } );

				await repository
					.addMembers( "ex:resource/", [ "member/" ] );

				const request:JasmineAjaxRequest = jasmine.Ajax.requests.mostRecent();
				expect( request.url ).toBe( "https://example.com/resource/" );
			} );

			it( "should throw error when URI outside context scope", async () => {
				await repository
					.addMembers( "https://example.org/resource/", [] )
					.catch( error => {
						expect( () => { throw error; } )
							.toThrowError( IllegalArgumentError, `"https://example.org/resource/" is out of scope.` );
					} )
				;
			} );

			it( "should throw error when URI is BNode label", async () => {
				await repository
					.addMembers( "_:1", [] )
					.catch( error => {
						expect( () => { throw error; } )
							.toThrowError( IllegalArgumentError, `"_:1" is out of scope.` );
					} )
				;
			} );

			it( "should throw error when URI is Named Fragment label", async () => {
				await repository
					.addMembers( "#fragment", [] )
					.catch( error => {
						expect( () => { throw error; } )
							.toThrowError( IllegalArgumentError, `"#fragment" is out of scope.` );
					} )
				;
			} );

			it( "should throw error when URI is a unresolved prefixed name", async () => {
				await repository
					.addMembers( "ex:resource/", [] )
					.catch( error => {
						expect( () => { throw error; } )
							.toThrowError( IllegalArgumentError, `"ex:resource/" is out of scope.` );
					} )
				;
			} );


			it( "should send add action when absolute member", async () => {
				stubRequest( "https://example.com/resource/" );

				await repository
					.addMembers( "resource/", [
						"https://example.com/member-1/",
						"https://example.com/member-2/",
					] );

				const request:JasmineAjaxRequest = jasmine.Ajax.requests.mostRecent();
				expect( JSON.parse( request.params ) ).toEqual( [
					{
						"@id": jasmine.any( String ),
						"@type": [ C.AddMemberAction ],
						[ C.targetMember ]: [
							{ "@id": "https://example.com/member-1/" },
							{ "@id": "https://example.com/member-2/" },
						],
					},
				] );
			} );

			it( "should send add action when relative member", async () => {
				stubRequest( "https://example.com/resource/" );

				await repository
					.addMembers( "resource/", [
						"member-1/",
						"resource/member-2/",
					] );

				const request:JasmineAjaxRequest = jasmine.Ajax.requests.mostRecent();
				expect( JSON.parse( request.params ) ).toEqual( [
					{
						"@id": jasmine.any( String ),
						"@type": [ C.AddMemberAction ],
						[ C.targetMember ]: [
							{ "@id": "https://example.com/member-1/" },
							{ "@id": "https://example.com/resource/member-2/" },
						],
					},
				] );
			} );

			it( "should send add action when Pointer member", async () => {
				stubRequest( "https://example.com/resource/" );

				await repository
					.addMembers( "resource/", [
						Pointer.create( { $id: "https://example.com/member-1/" } ),
						Pointer.create( { $id: "https://example.com/member-2/" } ),
					] );

				const request:JasmineAjaxRequest = jasmine.Ajax.requests.mostRecent();
				expect( JSON.parse( request.params ) ).toEqual( [
					{
						"@id": jasmine.any( String ),
						"@type": [ C.AddMemberAction ],
						[ C.targetMember ]: [
							{ "@id": "https://example.com/member-1/" },
							{ "@id": "https://example.com/member-2/" },
						],
					},
				] );
			} );

			it( "should send add action when Pointer & string member", async () => {
				stubRequest( "https://example.com/resource/" );

				await repository
					.addMembers( "resource/", [
						"https://example.com/member-1/",
						Pointer.create( { $id: "https://example.com/member-2/" } ),
						"member-3/",
					] );

				const request:JasmineAjaxRequest = jasmine.Ajax.requests.mostRecent();
				expect( JSON.parse( request.params ) ).toEqual( [
					{
						"@id": jasmine.any( String ),
						"@type": [ C.AddMemberAction ],
						[ C.targetMember ]: [
							{ "@id": "https://example.com/member-1/" },
							{ "@id": "https://example.com/member-2/" },
							{ "@id": "https://example.com/member-3/" },
						],
					},
				] );
			} );


			it( "should send basic request headers", async () => {
				stubRequest( "https://example.com/resource/" );

				await repository.addMembers( "resource/", [ "member/" ] );

				const request:JasmineAjaxRequest = jasmine.Ajax.requests.mostRecent();
				expect( request.requestHeaders ).toEqual( {
					"accept": "application/ld+json",
					"content-type": "application/ld+json",
					"prefer": [
						`${ LDP.Container }; rel=interaction-model`,
					].join( ", " ),
				} );
			} );

			it( "should add custom headers", async () => {
				stubRequest( "https://example.com/resource/" );

				await repository.addMembers( "resource/", [ "member/" ], {
					headers: new Map()
						.set( "custom", new Header( "custom value" ) )
					,
				} );

				const request:JasmineAjaxRequest = jasmine.Ajax.requests.mostRecent();
				expect( request.requestHeaders ).toEqual( jasmine.objectContaining( {
					"custom": "custom value",
				} ) );
			} );


			it( "should parse ErrorResponse into error", async () => {
				await repository
					.addMembers( "500/", [ "member/" ] )
					.then( () => fail( "Should not resolve" ) )
					.catch( ( error:HTTPError & ErrorResponse ) => {
						expect( error ).toBeDefined();
						expect( error ).toEqual( jasmine.any( HTTPError ) );

						expect( error.message ).toBe( "Message 01, Message 02" );
						expect( error.statusCode ).toBe( 500 );

						expect( error.errors ).toBeDefined();
						expect( error.errors.length ).toBe( 2 );

						expect( error.errors[ 0 ].errorCode ).toBe( `code-01` );
						expect( error.errors[ 0 ].errorMessage ).toBe( `Message 01` );
						expect( error.errors[ 0 ].errorParameters.entries as AnyJasmineValue<MapEntry<string, Pointer>[]> ).toEqual( [ {
							entryKey: "document",
							entryValue: jasmine.objectContaining( {
								$id: "https://example.com/target-document/",
							} ),
						} ] );

						expect( error.errors[ 1 ].errorCode ).toBe( `code-02` );
						expect( error.errors[ 1 ].errorMessage ).toBe( `Message 02` );
						expect( error.errors[ 1 ].errorParameters.entries as AnyJasmineValue<MapEntry<string, Pointer>[]> ).toEqual( [ {
							entryKey: "document",
							entryValue: jasmine.objectContaining( {
								$id: "https://example.com/target-document/",
							} ),
						} ] );
					} )
				;
			} );


		} );


		describe( method( OBLIGATORY, "removeMember" ), () => {

			it( hasSignature(
				"Removes the provided resource as member of the specified document.", [
					{ name: "uri", type: "string", description: "URI of the document to remove the specified member." },
					{ name: "member", type: "CarbonLDP.Pointer | string", description: "URI or Pointer to remove as a member." },
					{ name: "requestOptions", type: "CarbonLDP.HTTP.RequestOptions", optional: true, description: "Customizable options for the request." },
				],
				{ type: "Promise<void>" }
			), ():void => {} );

			it( "should exists", ():void => {
				expect( repository.removeMember ).toBeDefined();
				expect( repository.removeMember ).toEqual( jasmine.any( Function ) );
			} );


			function stubRequest( url:string, options:{ status?:number, headers?:{ [ key:string ]:string } } = {} ):void {
				const status:number = options.status ?
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


			it( "should request the URI provided", async () => {
				stubRequest( "https://example.com/resource/" );

				await repository
					.removeMember( "https://example.com/resource/", "member/" );

				const request:JasmineAjaxRequest = jasmine.Ajax.requests.mostRecent();
				expect( request.url ).toBe( "https://example.com/resource/" );
			} );

			it( "should request relative URI provided", async () => {
				stubRequest( "https://example.com/relative/" );

				await repository
					.removeMember( "relative/", "member/" );

				const request:JasmineAjaxRequest = jasmine.Ajax.requests.mostRecent();
				expect( request.url ).toBe( "https://example.com/relative/" );
			} );

			it( "should request resolved prefixed name provided", async () => {
				stubRequest( "https://example.com/resource/" );

				$context.extendObjectSchema( { "ex": "https://example.com/" } );

				await repository
					.removeMember( "ex:resource/", "member/" );

				const request:JasmineAjaxRequest = jasmine.Ajax.requests.mostRecent();
				expect( request.url ).toBe( "https://example.com/resource/" );
			} );

			it( "should throw error when URI outside context scope", async () => {
				await repository
					.removeMember( "https://example.org/resource/", "member/" )
					.catch( error => {
						expect( () => { throw error; } )
							.toThrowError( IllegalArgumentError, `"https://example.org/resource/" is out of scope.` );
					} )
				;
			} );

			it( "should throw error when URI is BNode label", async () => {
				await repository
					.removeMember( "_:1", "member/" )
					.catch( error => {
						expect( () => { throw error; } )
							.toThrowError( IllegalArgumentError, `"_:1" is out of scope.` );
					} )
				;
			} );

			it( "should throw error when URI is Named Fragment label", async () => {
				await repository
					.removeMember( "#fragment", "member/" )
					.catch( error => {
						expect( () => { throw error; } )
							.toThrowError( IllegalArgumentError, `"#fragment" is out of scope.` );
					} )
				;
			} );

			it( "should throw error when URI is unresolved prefixed name", async () => {
				await repository
					.removeMember( "ex:resource/", "member/" )
					.catch( error => {
						expect( () => { throw error; } )
							.toThrowError( IllegalArgumentError, `"ex:resource/" is out of scope.` );
					} )
				;
			} );


			it( "should send add action when relative member", async () => {
				stubRequest( "https://example.com/resource/" );

				await repository
					.removeMember( "resource/", "member/" );

				const request:JasmineAjaxRequest = jasmine.Ajax.requests.mostRecent();
				expect( JSON.parse( request.params ) ).toEqual( [
					{
						"@id": jasmine.any( String ),
						"@type": [ C.RemoveMemberAction ],
						[ C.targetMember ]: [
							{ "@id": "https://example.com/member/" },
						],
					},
				] );
			} );

			it( "should send add action when absolute member", async () => {
				stubRequest( "https://example.com/resource/" );

				await repository
					.removeMember( "resource/", "https://example.com/member/" );

				const request:JasmineAjaxRequest = jasmine.Ajax.requests.mostRecent();
				expect( JSON.parse( request.params ) ).toEqual( [
					{
						"@id": jasmine.any( String ),
						"@type": [ C.RemoveMemberAction ],
						[ C.targetMember ]: [
							{ "@id": "https://example.com/member/" },
						],
					},
				] );
			} );

			it( "should send add action when Pointer member", async () => {
				stubRequest( "https://example.com/resource/" );

				await repository
					.removeMember( "resource/", Pointer.create( { $id: "https://example.com/member/" } ) );

				const request:JasmineAjaxRequest = jasmine.Ajax.requests.mostRecent();
				expect( JSON.parse( request.params ) ).toEqual( [
					{
						"@id": jasmine.any( String ),
						"@type": [ C.RemoveMemberAction ],
						[ C.targetMember ]: [
							{ "@id": "https://example.com/member/" },
						],
					},
				] );
			} );


			it( "should send basic request headers", async () => {
				stubRequest( "https://example.com/resource/" );

				await repository.removeMember( "resource/", "member/" );

				const request:JasmineAjaxRequest = jasmine.Ajax.requests.mostRecent();
				expect( request.requestHeaders ).toEqual( {
					"accept": "application/ld+json",
					"content-type": "application/ld+json",
					"prefer": [
						`${ LDP.Container }; rel=interaction-model`,
						`include="${ C.PreferSelectedMembershipTriples }"`,
						`omit="${ C.PreferMembershipTriples }"`,
					].join( ", " ),
				} );
			} );

			it( "should add custom headers", async () => {
				stubRequest( "https://example.com/resource/" );

				await repository.removeMember( "resource/", "member/", {
					headers: new Map()
						.set( "custom", new Header( "custom value" ) )
					,
				} );

				const request:JasmineAjaxRequest = jasmine.Ajax.requests.mostRecent();
				expect( request.requestHeaders ).toEqual( jasmine.objectContaining( {
					"custom": "custom value",
				} ) );
			} );


			it( "should parse ErrorResponse into error", async () => {
				await repository
					.removeMember( "500/", "member/" )
					.then( () => fail( "Should not resolve" ) )
					.catch( ( error:HTTPError & ErrorResponse ) => {
						expect( error ).toBeDefined();
						expect( error ).toEqual( jasmine.any( HTTPError ) );

						expect( error.message ).toBe( "Message 01, Message 02" );
						expect( error.statusCode ).toBe( 500 );

						expect( error.errors ).toBeDefined();
						expect( error.errors.length ).toBe( 2 );

						expect( error.errors[ 0 ].errorCode ).toBe( `code-01` );
						expect( error.errors[ 0 ].errorMessage ).toBe( `Message 01` );
						expect( error.errors[ 0 ].errorParameters.entries as AnyJasmineValue<MapEntry<string, Pointer>[]> ).toEqual( [ {
							entryKey: "document",
							entryValue: jasmine.objectContaining( {
								$id: "https://example.com/target-document/",
							} ),
						} ] );

						expect( error.errors[ 1 ].errorCode ).toBe( `code-02` );
						expect( error.errors[ 1 ].errorMessage ).toBe( `Message 02` );
						expect( error.errors[ 1 ].errorParameters.entries as AnyJasmineValue<MapEntry<string, Pointer>[]> ).toEqual( [ {
							entryKey: "document",
							entryValue: jasmine.objectContaining( {
								$id: "https://example.com/target-document/",
							} ),
						} ] );
					} )
				;
			} );

		} );

		describe( method( OBLIGATORY, "removeMembers" ), () => {

			it( hasSignature(
				"Removes the provided resources as members of the specified document. If no members provided, all the available members will be removed.",
				[
					{ name: "uri", type: "string", description: "URI of the document to remove the specified member." },
					{ name: "members", type: "(CarbonLDP.Pointer | string)[]", optional: true, description: "URIs or Pointers to remove as a members." },
					{ name: "requestOptions", type: "CarbonLDP.HTTP.RequestOptions", optional: true, description: "Customizable options for the request." },
				],
				{ type: "Promise<void>" }
			), ():void => {} );

			it( "should exists", ():void => {
				expect( repository.removeMembers ).toBeDefined();
				expect( repository.removeMembers ).toEqual( jasmine.any( Function ) );
			} );


			function stubRequest( url:string, options:{ status?:number, headers?:{ [ key:string ]:string } } = {} ):void {
				const status:number = options.status ?
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


			describe( "when specified members", () => {

				it( "should request the URI provided", async () => {
					stubRequest( "https://example.com/resource/" );

					await repository
						.removeMembers( "https://example.com/resource/", [ "member/" ] );

					const request:JasmineAjaxRequest = jasmine.Ajax.requests.mostRecent();
					expect( request.url ).toBe( "https://example.com/resource/" );
				} );

				it( "should request relative URI provided", async () => {
					stubRequest( "https://example.com/relative/" );

					await repository
						.removeMembers( "relative/", [ "member/" ] );

					const request:JasmineAjaxRequest = jasmine.Ajax.requests.mostRecent();
					expect( request.url ).toBe( "https://example.com/relative/" );
				} );

				it( "should request resolved prefixed name provided", async () => {
					stubRequest( "https://example.com/resource/" );

					$context.extendObjectSchema( { "ex": "https://example.com/" } );

					await repository
						.removeMembers( "ex:resource/", [ "member/" ] );

					const request:JasmineAjaxRequest = jasmine.Ajax.requests.mostRecent();
					expect( request.url ).toBe( "https://example.com/resource/" );
				} );

				it( "should throw error when URI outside context scope", async () => {
					await repository
						.removeMembers( "https://example.org/resource/", [] )
						.catch( error => {
							expect( () => { throw error; } )
								.toThrowError( IllegalArgumentError, `"https://example.org/resource/" is out of scope.` );
						} )
					;
				} );

				it( "should throw error when URI is BNode label", async () => {
					await repository
						.removeMembers( "_:1", [] )
						.catch( error => {
							expect( () => { throw error; } )
								.toThrowError( IllegalArgumentError, `"_:1" is out of scope.` );
						} )
					;
				} );

				it( "should throw error when URI is Named Fragment label", async () => {
					await repository
						.removeMembers( "#fragment", [] )
						.catch( error => {
							expect( () => { throw error; } )
								.toThrowError( IllegalArgumentError, `"#fragment" is out of scope.` );
						} )
					;
				} );

				it( "should throw error when URI is a unresolved prefixed name", async () => {
					await repository
						.removeMembers( "ex:resource/", [] )
						.catch( error => {
							expect( () => { throw error; } )
								.toThrowError( IllegalArgumentError, `"ex:resource/" is out of scope.` );
						} )
					;
				} );


				it( "should send add action when absolute member", async () => {
					stubRequest( "https://example.com/resource/" );

					await repository
						.removeMembers( "resource/", [
							"https://example.com/member-1/",
							"https://example.com/member-2/",
						] );

					const request:JasmineAjaxRequest = jasmine.Ajax.requests.mostRecent();
					expect( JSON.parse( request.params ) ).toEqual( [
						{
							"@id": jasmine.any( String ),
							"@type": [ C.RemoveMemberAction ],
							[ C.targetMember ]: [
								{ "@id": "https://example.com/member-1/" },
								{ "@id": "https://example.com/member-2/" },
							],
						},
					] );
				} );

				it( "should send add action when relative member", async () => {
					stubRequest( "https://example.com/resource/" );

					await repository
						.removeMembers( "resource/", [
							"member-1/",
							"resource/member-2/",
						] );

					const request:JasmineAjaxRequest = jasmine.Ajax.requests.mostRecent();
					expect( JSON.parse( request.params ) ).toEqual( [
						{
							"@id": jasmine.any( String ),
							"@type": [ C.RemoveMemberAction ],
							[ C.targetMember ]: [
								{ "@id": "https://example.com/member-1/" },
								{ "@id": "https://example.com/resource/member-2/" },
							],
						},
					] );
				} );

				it( "should send add action when Pointer member", async () => {
					stubRequest( "https://example.com/resource/" );

					await repository
						.removeMembers( "resource/", [
							Pointer.create( { $id: "https://example.com/member-1/" } ),
							Pointer.create( { $id: "https://example.com/member-2/" } ),
						] );

					const request:JasmineAjaxRequest = jasmine.Ajax.requests.mostRecent();
					expect( JSON.parse( request.params ) ).toEqual( [
						{
							"@id": jasmine.any( String ),
							"@type": [ C.RemoveMemberAction ],
							[ C.targetMember ]: [
								{ "@id": "https://example.com/member-1/" },
								{ "@id": "https://example.com/member-2/" },
							],
						},
					] );
				} );

				it( "should send add action when Pointer & string member", async () => {
					stubRequest( "https://example.com/resource/" );

					await repository
						.removeMembers( "resource/", [
							"https://example.com/member-1/",
							Pointer.create( { $id: "https://example.com/member-2/" } ),
							"member-3/",
						] );

					const request:JasmineAjaxRequest = jasmine.Ajax.requests.mostRecent();
					expect( JSON.parse( request.params ) ).toEqual( [
						{
							"@id": jasmine.any( String ),
							"@type": [ C.RemoveMemberAction ],
							[ C.targetMember ]: [
								{ "@id": "https://example.com/member-1/" },
								{ "@id": "https://example.com/member-2/" },
								{ "@id": "https://example.com/member-3/" },
							],
						},
					] );
				} );


				it( "should send basic request headers", async () => {
					stubRequest( "https://example.com/resource/" );

					await repository.removeMembers( "resource/", [ "member/" ] );

					const request:JasmineAjaxRequest = jasmine.Ajax.requests.mostRecent();
					expect( request.requestHeaders ).toEqual( {
						"accept": "application/ld+json",
						"content-type": "application/ld+json",
						"prefer": [
							`${ LDP.Container }; rel=interaction-model`,
							`include="${ C.PreferSelectedMembershipTriples }"`,
							`omit="${ C.PreferMembershipTriples }"`,
						].join( ", " ),
					} );
				} );

				it( "should add custom headers", async () => {
					stubRequest( "https://example.com/resource/" );

					await repository.removeMembers( "resource/", [ "member/" ], {
						headers: new Map()
							.set( "custom", new Header( "custom value" ) )
						,
					} );

					const request:JasmineAjaxRequest = jasmine.Ajax.requests.mostRecent();
					expect( request.requestHeaders ).toEqual( jasmine.objectContaining( {
						"custom": "custom value",
					} ) );
				} );


				it( "should parse ErrorResponse into error", async () => {
					await repository
						.removeMembers( "500/", [ "member/" ] )
						.then( () => fail( "Should not resolve" ) )
						.catch( ( error:HTTPError & ErrorResponse ) => {
							expect( error ).toBeDefined();
							expect( error ).toEqual( jasmine.any( HTTPError ) );

							expect( error.message ).toBe( "Message 01, Message 02" );
							expect( error.statusCode ).toBe( 500 );

							expect( error.errors ).toBeDefined();
							expect( error.errors.length ).toBe( 2 );

							expect( error.errors[ 0 ].errorCode ).toBe( `code-01` );
							expect( error.errors[ 0 ].errorMessage ).toBe( `Message 01` );
							expect( error.errors[ 0 ].errorParameters.entries as AnyJasmineValue<MapEntry<string, Pointer>[]> ).toEqual( [ {
								entryKey: "document",
								entryValue: jasmine.objectContaining( {
									$id: "https://example.com/target-document/",
								} ),
							} ] );

							expect( error.errors[ 1 ].errorCode ).toBe( `code-02` );
							expect( error.errors[ 1 ].errorMessage ).toBe( `Message 02` );
							expect( error.errors[ 1 ].errorParameters.entries as AnyJasmineValue<MapEntry<string, Pointer>[]> ).toEqual( [ {
								entryKey: "document",
								entryValue: jasmine.objectContaining( {
									$id: "https://example.com/target-document/",
								} ),
							} ] );
						} )
					;
				} );

			} );

			describe( "When no members", () => {

				it( "should request the URI provided", async () => {
					stubRequest( "https://example.com/resource/" );

					await repository
						.removeMembers( "https://example.com/resource/" );

					const request:JasmineAjaxRequest = jasmine.Ajax.requests.mostRecent();
					expect( request.url ).toBe( "https://example.com/resource/" );
				} );

				it( "should request relative URI provided", async () => {
					stubRequest( "https://example.com/relative/" );

					await repository
						.removeMembers( "relative/" );

					const request:JasmineAjaxRequest = jasmine.Ajax.requests.mostRecent();
					expect( request.url ).toBe( "https://example.com/relative/" );
				} );

				it( "should request resolved prefixed name provided", async () => {
					stubRequest( "https://example.com/resource/" );

					$context.extendObjectSchema( { "ex": "https://example.com/" } );

					await repository
						.removeMembers( "ex:resource/" );

					const request:JasmineAjaxRequest = jasmine.Ajax.requests.mostRecent();
					expect( request.url ).toBe( "https://example.com/resource/" );
				} );

				it( "should throw error when URI outside context scope", async () => {
					await repository
						.removeMembers( "https://example.org/resource/" )
						.catch( error => {
							expect( () => { throw error; } )
								.toThrowError( IllegalArgumentError, `"https://example.org/resource/" is out of scope.` );
						} )
					;
				} );

				it( "should throw error when URI is BNode label", async () => {
					await repository
						.removeMembers( "_:1" )
						.catch( error => {
							expect( () => { throw error; } )
								.toThrowError( IllegalArgumentError, `"_:1" is out of scope.` );
						} )
					;
				} );

				it( "should throw error when URI is Named Fragment label", async () => {
					await repository
						.removeMembers( "#fragment" )
						.catch( error => {
							expect( () => { throw error; } )
								.toThrowError( IllegalArgumentError, `"#fragment" is out of scope.` );
						} )
					;
				} );

				it( "should throw error when URI is a unresolved prefixed name", async () => {
					await repository
						.removeMembers( "ex:resource/" )
						.catch( error => {
							expect( () => { throw error; } )
								.toThrowError( IllegalArgumentError, `"ex:resource/" is out of scope.` );
						} )
					;
				} );


				it( "should NOT send body", async () => {
					stubRequest( "https://example.com/resource/" );

					await repository
						.removeMembers( "resource/" );

					const request:JasmineAjaxRequest = jasmine.Ajax.requests.mostRecent();
					expect( request.params ).toBeUndefined();
				} );


				it( "should send basic request headers", async () => {
					stubRequest( "https://example.com/resource/" );

					await repository.removeMembers( "resource/" );

					const request:JasmineAjaxRequest = jasmine.Ajax.requests.mostRecent();
					expect( request.requestHeaders ).toEqual( {
						"accept": "application/ld+json",
						"prefer": [
							`${ LDP.Container }; rel=interaction-model`,
							`include="${ C.PreferMembershipTriples }"`,
							`omit="${ [
								C.PreferMembershipResources,
								C.PreferContainmentTriples,
								C.PreferContainmentResources,
								C.PreferContainer,
							].join( " " ) }"`,
						].join( ", " ),
					} );
				} );

				it( "should add custom headers", async () => {
					stubRequest( "https://example.com/resource/" );

					await repository.removeMembers( "resource/", {
						headers: new Map()
							.set( "custom", new Header( "custom value" ) )
						,
					} );

					const request:JasmineAjaxRequest = jasmine.Ajax.requests.mostRecent();
					expect( request.requestHeaders ).toEqual( jasmine.objectContaining( {
						"custom": "custom value",
					} ) );
				} );


				it( "should parse ErrorResponse into error", async () => {
					await repository
						.removeMembers( "500/" )
						.then( () => fail( "Should not resolve" ) )
						.catch( ( error:HTTPError & ErrorResponse ) => {
							expect( error ).toBeDefined();
							expect( error ).toEqual( jasmine.any( HTTPError ) );

							expect( error.message ).toBe( "Message 01, Message 02" );
							expect( error.statusCode ).toBe( 500 );

							expect( error.errors ).toBeDefined();
							expect( error.errors.length ).toBe( 2 );

							expect( error.errors[ 0 ].errorCode ).toBe( `code-01` );
							expect( error.errors[ 0 ].errorMessage ).toBe( `Message 01` );
							expect( error.errors[ 0 ].errorParameters.entries as AnyJasmineValue<MapEntry<string, Pointer>[]> ).toEqual( [ {
								entryKey: "document",
								entryValue: jasmine.objectContaining( {
									$id: "https://example.com/target-document/",
								} ),
							} ] );

							expect( error.errors[ 1 ].errorCode ).toBe( `code-02` );
							expect( error.errors[ 1 ].errorMessage ).toBe( `Message 02` );
							expect( error.errors[ 1 ].errorParameters.entries as AnyJasmineValue<MapEntry<string, Pointer>[]> ).toEqual( [ {
								entryKey: "document",
								entryValue: jasmine.objectContaining( {
									$id: "https://example.com/target-document/",
								} ),
							} ] );
						} )
					;
				} );

			} );

		} );


	} );

	describe( interfaze(
		"CarbonLDP.DocumentsRepository.Traits.LDPDocumentsRepositoryTraitFactory",
		"Interface with the decoration, factory and utils for `CarbonLDP.DocumentsRepository.Traits.LDPDocumentsRepositoryTrait` objects."
	), () => {

		it( extendsClass( "CarbonLDP.Model.ModelPrototype<CarbonLDP.DocumentsRepository.Traits.LDPDocumentsRepositoryTrait, CarbonLDP.GeneralRepository<CarbonLDP.Document>" ), () => {
			const target:ModelPrototype<LDPDocumentsRepositoryTrait, GeneralRepository<Document>> = {} as LDPDocumentsRepositoryTraitFactory;
			expect( target ).toBeDefined();
		} );

		it( extendsClass( "CarbonLDP.Model.ModelDecorator<CarbonLDP.DocumentsRepository.Traits.LDPDocumentsRepositoryTrait<any>, CarbonLDP.BaseDocumentsRepository>" ), () => {
			const target:ModelDecorator<LDPDocumentsRepositoryTrait, BaseDocumentsRepository> = {} as LDPDocumentsRepositoryTraitFactory;
			expect( target ).toBeDefined();
		} );


		describe( "LDPDocumentsRepositoryTrait.isDecorated", () => {

			it( "should exists", ():void => {
				expect( LDPDocumentsRepositoryTrait.isDecorated ).toBeDefined();
				expect( LDPDocumentsRepositoryTrait.isDecorated ).toEqual( jasmine.any( Function ) );
			} );


			it( "should call ModelDecorator.hasPropertiesFrom with the PROTOTYPE", () => {
				const spy:jasmine.Spy = spyOn( ModelDecorator, "hasPropertiesFrom" );

				LDPDocumentsRepositoryTrait.isDecorated( { the: "object" } );

				expect( spy ).toHaveBeenCalledWith( LDPDocumentsRepositoryTrait.PROTOTYPE, { the: "object" } );
			} );

		} );

		describe( "LDPDocumentsRepositoryTrait.decorate", () => {

			it( "should exists", ():void => {
				expect( LDPDocumentsRepositoryTrait.decorate ).toBeDefined();
				expect( LDPDocumentsRepositoryTrait.decorate ).toEqual( jasmine.any( Function ) );
			} );


			it( "should call ModelDecorator.definePropertiesFrom with PROTOTYPE", () => {
				const spy:jasmine.Spy = spyOn( ModelDecorator, "definePropertiesFrom" )
					.and.callThrough();

				LDPDocumentsRepositoryTrait.decorate( { $context, the: "object" } );

				expect( spy ).toHaveBeenCalledWith( LDPDocumentsRepositoryTrait.PROTOTYPE, { the: "object" } );
			} );

			it( "should no call ModelDecorator.definePropertiesFrom when already decorated", () => {
				spyOn( LDPDocumentsRepositoryTrait, "isDecorated" )
					.and.returnValue( true );

				const spy:jasmine.Spy = spyOn( ModelDecorator, "definePropertiesFrom" );
				LDPDocumentsRepositoryTrait.decorate( { $context } );

				expect( spy ).not.toHaveBeenCalled();
			} );


			it( "should decorate with GeneralRepository", () => {
				const spy:jasmine.Spy = spyOn( GeneralRepository, "decorate" )
					.and.callThrough();

				LDPDocumentsRepositoryTrait.decorate( { $context, the: "object" } );

				expect( spy ).toHaveBeenCalledWith( { the: "object" } );
			} );

		} );

	} );

	describe( property(
		STATIC,
		"LDPDocumentsRepositoryTrait",
		"CarbonLDP.DocumentsRepository.Traits.LDPDocumentsRepositoryTraitFactory"
	), () => {

		it( "should exists", ():void => {
			expect( LDPDocumentsRepositoryTrait ).toBeDefined();
			expect( LDPDocumentsRepositoryTrait ).toEqual( jasmine.any( Object ) );
		} );

	} );

} );
