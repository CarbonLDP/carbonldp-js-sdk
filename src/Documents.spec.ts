import {
	INSTANCE,
	STATIC,

	module,

	isDefined,

	interfaze,
	clazz,
	method,

	hasConstructor,
	hasMethod,
	hasSignature,
	hasProperty,
	hasInterface,
	extendsClass,

	MethodArgument,
} from "./test/JasmineExtender";

import AbstractContext from "./AbstractContext";
import * as AccessPoint from "./AccessPoint";
import * as Document from "./Document";
import Documents from "./Documents";
import * as Errors from "./Errors";
import * as Fragment from "./Fragment";
import * as HTTP from "./HTTP";
import * as NS from "./NS";
import * as ObjectSchema from "./ObjectSchema";
import * as PersistedBlankNode from "./PersistedBlankNode";
import * as PersistedDocument from "./PersistedDocument";
import * as PersistedNamedFragment from "./PersistedNamedFragment";
import * as Pointer from "./Pointer";
import * as RetrievalPreferences from "./RetrievalPreferences";
import * as SPARQL from "./SPARQL";
import * as URI from "./RDF/URI";
import * as Utils from "./Utils";

// TODO: Add description
describe( module( "Carbon/Documents" ), ():void => {

	describe( clazz( "Carbon.Documents", "Class that contains methods for retrieving, saving and updating documents from the server." ), ():void => {

		beforeEach( ():void => {
			jasmine.Ajax.install();
		} );

		afterEach( ():void => {
			jasmine.Ajax.uninstall();
		} );

		it( isDefined(), ():void => {
			expect( Documents ).toBeDefined();
		});

		it( hasMethod(
			INSTANCE,
			"get",
			"Obtains a Document from the CarbonLDP server, returning a Promise with a `Carbon.PersistedDocument.Class` and the Response of the request.", [
				{ name: "uri", type: "string" },
			],
			{ type: "Promise<[ Carbon.PersistedDocument.Class, HTTP.Response.Class ]>" }
		), ( done:(() => void) & { fail:( error?:any ) => void } ):void => {
			let promises:Promise<any>[] = [];

			class MockedContext extends AbstractContext {
				resolve( uri:string ):string {
					return uri;
				}
			}

			let context:MockedContext = new MockedContext();
			let documents:Documents = context.documents;

			let responseBody:string = JSON.stringify({
				"@id": "http://example.com/resource/",
				"@graph": [
					{
						"@id": "http://example.com/resource/",
						"http://example.com/ns#string": [{ "@value": "Document Resource" }],
						"http://example.com/ns#pointerSet": [
							{ "@id": "_:1" },
							{ "@id": "_:2" },
							{ "@id": "http://example.com/resource/#1" },
							{ "@id": "http://example.com/external-resource/" },
						],
					},
					{
						"@id": "_:1",
						"http://example.com/ns#string": [{ "@value": "Fragment 1" }],
						"http://example.com/ns#pointerSet": [
							{ "@id": "http://example.com/resource/" },
							{ "@id": "http://example.com/resource/#1" },
						],
					},
					{
						"@id": "_:2",
						"http://example.com/ns#string": [{ "@value": "Fragment 2" }],
					},
					{
						"@id": "http://example.com/resource/#1",
						"http://example.com/ns#string": [{ "@value": "NamedFragment 1" }],
					},
					{
						"@id": "http://example.com/resource/#2",
						"http://example.com/ns#string": [{ "@value": "NamedFragment 1" }],
					},
				],
			});

			let objectSchema:ObjectSchema.Class = {
				"ex": "http://example.com/ns#",
				"xsd": "http://www.w3.org/2001/XMLSchema#",
				"string": {
					"@id": "ex:string",
					"@type": "xsd:string",
				},
				"date": {
					"@id": "ex:date",
					"@type": "xsd:dateTime",
				},
				"numberList": {
					"@id": "ex:numberList",
					"@type": "xsd:integer",
					"@container": "@list",
				},
				"languageMap": {
					"@id": "ex:languageMap",
					"@container": "@language",
				},
				"pointer": {
					"@id": "ex:pointer",
					"@type": "@id",
				},
				"pointerList": {
					"@id": "ex:pointerList",
					"@type": "@id",
					"@container": "@list",
				},
				"pointerSet": {
					"@id": "ex:pointerSet",
					"@type": "@id",
					"@container": "@set",
				},
			};

			context.extendObjectSchema( objectSchema );

			jasmine.Ajax.stubRequest( "http://example.com/resource/", null, "GET" ).andReturn( {
				status: 200,
				responseHeaders: {
					"ETag": "162458126348712643",
				},
				responseText: responseBody,
			} );

			promises.push( documents.get( "http://example.com/resource/" ).then( ( [ document, response ]:[ PersistedDocument.Class, HTTP.Response.Class ] ):void => {
				expect( document ).toBeDefined();
				expect( Utils.isObject( document ) ).toEqual( true );

				expect( response ).toBeDefined();
				expect( Utils.isObject( response ) ).toEqual( true );

				// TODO: Finish assertions
			}) );

			Promise.all( promises ).then( ():void => {
				done();
			}, ( error:Error ):void => {
				error = !! error ? error : new Error( "Unknown error" );
				done.fail( error );
			});
		});

		it( hasMethod(
			INSTANCE,
			"exists",
			"Retrieves a boolean indicating if the resource exists or not in the CarbonLDP server.", [
				{ name: "documentURI", type: "string" },
				{ name: "requestOptions", type: "Carbon.HTTP.Request.Options", optional: true },
			],
			{ type: "Promise<[ boolean, Carbon.HTTP.Response.Class ]>" }
		), ( done:{ ():void, fail:() => void } ):void => {
			let promises:Promise<any>[] = [];

			class MockedContext extends AbstractContext {
				resolve( uri:string ):string {
					return uri;
				}
			}

			let context:MockedContext = new MockedContext();
			let documents:Documents = context.documents;

			let spies = {
				exists: ( [ exists, response ]:[ boolean, HTTP.Response.Class ] ):void => {
					expect( exists ).toBe( true );
					expect( response instanceof  HTTP.Response.Class ).toBe( true );
				},
				notExists: ( [ exists, response ]:[ boolean, HTTP.Response.Class ] ):void => {
					expect( exists ).toBe( false );
					expect( response instanceof  HTTP.Response.Class ).toBe( true );
				},
				fail: ( error:HTTP.Errors.Error ):void => {
					expect( error instanceof HTTP.Errors.Error ).toBe( true );
				}
			};
			let spyExists = spyOn( spies, "exists" ).and.callThrough();
			let spyNotExists = spyOn( spies, "notExists" ).and.callThrough();
			let spyFail = spyOn( spies, "fail" ).and.callThrough();

			jasmine.Ajax.stubRequest( "http://example.com/resource/exists/", null, "HEAD" ).andReturn( {
				status: 200
			});
			jasmine.Ajax.stubRequest( "http://example.com/resource/not-exists/", null, "HEAD" ).andReturn( {
				status: 404
			});
			jasmine.Ajax.stubRequest( "http://example.com/resource/error/", null, "HEAD" ).andReturn( {
				status: 500
			});

			let promise:Promise<any>;

			promise = documents.exists( "http://example.com/resource/exists/" );
			expect( promise instanceof Promise ).toBe( true );
			promises.push( promise.then( spies.exists ) );

			promise = documents.exists( "http://example.com/resource/not-exists/" );
			expect( promise instanceof Promise ).toBe( true );
			promises.push( promise.then( spies.notExists ) );

			promise = documents.exists( "http://example.com/resource/error/" );
			expect( promise instanceof Promise ).toBe( true );
			promises.push( promise.catch( spies.fail ) );

			Promise.all( promises ).then( ():void => {
				expect( spyExists ).toHaveBeenCalledTimes( 1 );
				expect( spyNotExists ).toHaveBeenCalledTimes( 1 );
				expect( spyFail ).toHaveBeenCalledTimes( 1 );
				done();
			}, done.fail );
		});

		// TODO: Test that it handles relative parentURIs and childDocuments with relativeURIs
		describe( method(
			INSTANCE,
			"createChild"
		), ():void => {

			it( hasSignature(
				"Persists a child document in the CarbonLDP server, for the respective parent source.", [
					{ name: "parentURI", type: "string" },
					{ name: "childDocument", type: "Carbon.Document.Class" },
					{ name: "requestOptions", type: "Carbon.HTTP.Request.Options", optional: true },
				],
				{ type:"Promise<[Carbon.Pointer.Class, Carbon.HTTP.Response.Class]>" }
			), ( done:(() => void) & { fail:( error?:any ) => void } ):void => {
				let promises:Promise<any>[] = [];

				class MockedContext extends AbstractContext {
					resolve( uri:string ):string {
						return uri;
					}
				}

				let context:MockedContext = new MockedContext();
				let documents:Documents = context.documents;

				let objectSchema:ObjectSchema.Class = {
					"ex": "http://example.com/ns#",
					"xsd": "http://www.w3.org/2001/XMLSchema#",
					"string": {
						"@id": "ex:string",
						"@type": "xsd:string",
					},
					"date": {
						"@id": "ex:date",
						"@type": "xsd:dateTime",
					},
					"numberList": {
						"@id": "ex:numberList",
						"@type": "xsd:integer",
						"@container": "@list",
					},
					"languageMap": {
						"@id": "ex:languageMap",
						"@container": "@language",
					},
					"pointer": {
						"@id": "ex:pointer",
						"@type": "@id",
					},
					"pointerList": {
						"@id": "ex:pointerList",
						"@type": "@id",
						"@container": "@list",
					},
					"pointerSet": {
						"@id": "ex:pointerSet",
						"@type": "@id",
						"@container": "@set",
					},
				};

				let childDocument:Document.Class = Document.Factory.create();
				let fragment1:Fragment.Class = childDocument.createFragment();
				let fragment2:Fragment.Class = childDocument.createFragment();
				let namedFragment1:Fragment.Class = childDocument.createFragment( "1" );
				let namedFragment2:Fragment.Class = childDocument.createFragment( "2" );

				(<any> childDocument).string = "Some string";
				(<any> childDocument).date = new Date();
				(<any> childDocument).pointerList = [ fragment1, fragment2 ];
				(<any> childDocument).pointerSet = [ fragment1, namedFragment1 ];

				(<any> namedFragment2).pointer = childDocument;

				context.extendObjectSchema( objectSchema );

				jasmine.Ajax.stubRequest( "http://example.com/parent-resource/", null, "POST" ).andReturn( {
					status: 200,
					responseHeaders: {
						"Location": "http://example.com/parent-resource/new-resource/",
					},
				} );

				promises.push( documents.createChild( "http://example.com/parent-resource/", childDocument ).then( ( response:any ):void => {
					expect( response ).toBeDefined();

					// TODO: Finish assertions
				}) );

				Promise.all( promises ).then( ():void => {
					done();
				}, ( error:Error ):void => {
					error = !! error ? error : new Error( "Unknown error" );
					done.fail( error );
				});
			});

			it( hasSignature(
				"Persists a child document in the CarbonLDP server, for the respective parent source.", [
					{ name: "parentURI", type: "string" },
					{ name: "slug", type: "string" },
					{ name: "childDocument", type: "Carbon.Document.Class" },
					{ name: "requestOptions", type: "Carbon.HTTP.Request.Options", optional: true },
				],
				{ type:"Promise<[Carbon.Pointer.Class, Carbon.HTTP.Response.Class]>" }
			), ( done:(() => void) & { fail:( error?:any ) => void } ):void => {
				let promises:Promise<any>[] = [];

				class MockedContext extends AbstractContext {
					resolve( uri:string ):string {
						return uri;
					}
				}

				let context:MockedContext = new MockedContext();
				let documents:Documents = context.documents;

				let objectSchema:ObjectSchema.Class = {
					"ex": "http://example.com/ns#",
					"xsd": "http://www.w3.org/2001/XMLSchema#",
					"string": {
						"@id": "ex:string",
						"@type": "xsd:string",
					},
					"date": {
						"@id": "ex:date",
						"@type": "xsd:dateTime",
					},
					"numberList": {
						"@id": "ex:numberList",
						"@type": "xsd:integer",
						"@container": "@list",
					},
					"languageMap": {
						"@id": "ex:languageMap",
						"@container": "@language",
					},
					"pointer": {
						"@id": "ex:pointer",
						"@type": "@id",
					},
					"pointerList": {
						"@id": "ex:pointerList",
						"@type": "@id",
						"@container": "@list",
					},
					"pointerSet": {
						"@id": "ex:pointerSet",
						"@type": "@id",
						"@container": "@set",
					},
				};

				let childDocument:Document.Class = Document.Factory.create();
				let fragment1:Fragment.Class = childDocument.createFragment();
				let fragment2:Fragment.Class = childDocument.createFragment();
				let namedFragment1:Fragment.Class = childDocument.createFragment( "1" );
				let namedFragment2:Fragment.Class = childDocument.createFragment( "2" );

				(<any> childDocument).string = "Some string";
				(<any> childDocument).date = new Date();
				(<any> childDocument).pointerList = [ fragment1, fragment2 ];
				(<any> childDocument).pointerSet = [ fragment1, namedFragment1 ];

				(<any> namedFragment2).pointer = childDocument;

				context.extendObjectSchema( objectSchema );

				jasmine.Ajax.stubRequest( "http://example.com/parent-resource/", null, "POST" ).andReturn( {
					status: 200,
					responseHeaders: {
						"Location": "http://example.com/parent-resource/new-resource/",
					},
				} );

				promises.push( documents.createChild( "http://example.com/parent-resource/", "child-document", childDocument ).then( ( response:any ):void => {
					expect( response ).toBeDefined();

					// TODO: Finish assertions
				}) );

				Promise.all( promises ).then( ():void => {
					done();
				}, ( error:Error ):void => {
					error = !! error ? error : new Error( "Unknown error" );
					done.fail( error );
				});
			});

			it( hasSignature(
				"Persists a child document in the CarbonLDP server, for the respective parent source.", [
					{ name: "parentURI", type: "string" },
					{ name: "childObject", type: "Object" },
					{ name: "requestOptions", type: "Carbon.HTTP.Request.Options", optional: true },
				],
				{ type:"Promise<[Carbon.Pointer.Class, Carbon.HTTP.Response.Class]>" }
			), ( done:(() => void) & { fail:( error?:any ) => void } ):void => {
				let promises:Promise<any>[] = [];

				class MockedContext extends AbstractContext {
					resolve( uri:string ):string {
						return uri;
					}
				}

				let context:MockedContext = new MockedContext();
				let documents:Documents = context.documents;

				let objectSchema:ObjectSchema.Class = {
					"ex": "http://example.com/ns#",
					"xsd": "http://www.w3.org/2001/XMLSchema#",
					"string": {
						"@id": "ex:string",
						"@type": "xsd:string",
					},
					"date": {
						"@id": "ex:date",
						"@type": "xsd:dateTime",
					},
					"numberList": {
						"@id": "ex:numberList",
						"@type": "xsd:integer",
						"@container": "@list",
					},
					"languageMap": {
						"@id": "ex:languageMap",
						"@container": "@language",
					},
					"pointer": {
						"@id": "ex:pointer",
						"@type": "@id",
					},
					"pointerList": {
						"@id": "ex:pointerList",
						"@type": "@id",
						"@container": "@list",
					},
					"pointerSet": {
						"@id": "ex:pointerSet",
						"@type": "@id",
						"@container": "@set",
					},
				};

				let childObject = {
					string: "The ONE string",
					date: new Date(),
					pointerList: [
						{
							slug: "Fragment_1",
							string: "The Named Fragment"
						},
						{
							id: "_:Fragment_2",
							string: "The Blank Node"
						}
					],
					pointer: {
						id: "#Fragment_1",
						string: "The real Named Fragment"
					}
				};

				context.extendObjectSchema( objectSchema );

				jasmine.Ajax.stubRequest( "http://example.com/parent-resource/", null, "POST" ).andReturn( {
					status: 200,
					responseHeaders: {
						"Location": "http://example.com/parent-resource/new-resource/",
					},
				} );

				promises.push( documents.createChild( "http://example.com/parent-resource/", childObject ).then( ( [ pointer, response ]:[Pointer.Class, HTTP.Response.Class] ):void => {
					expect( Pointer.Factory.is( pointer ) ).toBe( true );

					// TODO: Finish assertions
				}) );

				Promise.all( promises ).then( ():void => {
					done();
				}, ( error:Error ):void => {
					error = !! error ? error : new Error( "Unknown error" );
					done.fail( error );
				});
			});

			it( hasSignature(
				"Persists a child document in the CarbonLDP server, for the respective parent source.", [
					{ name: "parentURI", type: "string" },
					{ name: "slug", type: "string" },
					{ name: "childObject", type: "Object" },
					{ name: "requestOptions", type: "Carbon.HTTP.Request.Options", optional: true },
				],
				{ type:"Promise<[Carbon.Pointer.Class, Carbon.HTTP.Response.Class]>" }
			), ( done:(() => void) & { fail:( error?:any ) => void } ):void => {
				let promises:Promise<any>[] = [];

				class MockedContext extends AbstractContext {
					resolve( uri:string ):string {
						return uri;
					}
				}

				let context:MockedContext = new MockedContext();
				let documents:Documents = context.documents;

				let objectSchema:ObjectSchema.Class = {
					"ex": "http://example.com/ns#",
					"xsd": "http://www.w3.org/2001/XMLSchema#",
					"string": {
						"@id": "ex:string",
						"@type": "xsd:string",
					},
					"date": {
						"@id": "ex:date",
						"@type": "xsd:dateTime",
					},
					"numberList": {
						"@id": "ex:numberList",
						"@type": "xsd:integer",
						"@container": "@list",
					},
					"languageMap": {
						"@id": "ex:languageMap",
						"@container": "@language",
					},
					"pointer": {
						"@id": "ex:pointer",
						"@type": "@id",
					},
					"pointerList": {
						"@id": "ex:pointerList",
						"@type": "@id",
						"@container": "@list",
					},
					"pointerSet": {
						"@id": "ex:pointerSet",
						"@type": "@id",
						"@container": "@set",
					},
				};

				let childObject = {
					string: "The ONE string",
					date: new Date(),
					pointerList: [
						{
							slug: "Fragment_1",
							string: "The Named Fragment",
						},
						{
							id: "_:Fragment_2",
							string: "The Blank Node",
						}
					],
					pointer: {
						id: "#Fragment_1",
						string: "The real Named Fragment",
					}
				};

				context.extendObjectSchema( objectSchema );

				jasmine.Ajax.stubRequest( "http://example.com/parent-resource/", null, "POST" ).andReturn( {
					status: 200,
					responseHeaders: {
						"Location": "http://example.com/parent-resource/new-resource/",
					},
				} );

				promises.push( documents.createChild( "http://example.com/parent-resource/", "child-document", childObject ).then( ( response:any ):void => {
					expect( response ).toBeDefined();
					// TODO: Finish assertions
				}) );

				Promise.all( promises ).then( ():void => {
					done();
				}, ( error:Error ):void => {
					error = !! error ? error : new Error( "Unknown error" );
					done.fail( error );
				});
			});
		});

		it( hasMethod(
			INSTANCE,
			"listChildren",
			"Retrieves an array of unresolved pointers that refers to all children of the container specified.", [
				{ name: "parentURI", type: "string", description: "URI of the document container from where to look for its children." },
				{ name: "requestOptions", type: "Carbon.HTTP.Request.Options", optional: true }
			],
			{ type: "Promise<[ Carbon.Pointer.Class[], Carbon.HTTP.Response ]>" }
		), ( done:{ ():void, fail:() => void } ):void => {
			class MockedContext extends AbstractContext {
				resolve( uri:string ):string {
					return "http://example.com/" + uri;
				}
			}
			let context:MockedContext = new MockedContext();
			let documents:Documents = context.documents;

			expect( documents.listChildren ).toBeDefined();
			expect( Utils.isFunction( documents.listChildren ) ).toBe( true );

			jasmine.Ajax.stubRequest( "http://example.com/empty-resource/", null, "GET" ).andReturn( {
				status: 200,
				responseText: "[]"
			});
			jasmine.Ajax.stubRequest( "http://example.com/another-empty-resource/", null, "GET" ).andReturn( {
				status: 200,
				responseText: `[
				  {
				    "@graph": [
				      {
				        "@id": "http://example.com/resource/",
				        "http://www.w3.org/ns/ldp#contains": []
				      }
				    ],
				    "@id": "http://example.com/resource/"
				  }
				]`
			});
			jasmine.Ajax.stubRequest( "http://example.com/another-another-empty-resource/", null, "GET" ).andReturn( {
				status: 200,
				responseText: `[
				  {
				    "@graph": [
				      {
				        "@id": "http://example.com/resource/"
				      }
				    ],
				    "@id": "http://example.com/resource/"
				  }
				]`
			});
			jasmine.Ajax.stubRequest( "http://example.com/resource/", null, "GET" ).andReturn( {
				status: 200,
				responseText: `[
				  {
				    "@graph": [
				      {
				        "@id": "http://example.com/resource/",
				        "http://www.w3.org/ns/ldp#contains": [
				          {
				            "@id": "http://example.com/resource/pointer-01/"
				          },
				          {
				            "@id": "http://example.com/resource/pointer-02/"
				          }
				        ]
				      }
				    ],
				    "@id": "http://example.com/resource/"
				  }
				]`
			});

			let spies = {
				success: ( [ pointers, response ]:[ Pointer.Class[], HTTP.Response.Class ]  ):void => {
					expect( pointers ).toBeDefined();
					expect( Utils.isArray( pointers ) ).toBe( true );
					expect( pointers.length ).toBe( 2 );
					expect( Pointer.Factory.is( pointers[ 0 ] ) ).toBe( true );
					expect( pointers[ 0 ].id ).toBe( "http://example.com/resource/pointer-01/" );
					expect( Pointer.Factory.is( pointers[ 1 ] ) ).toBe( true );
					expect( pointers[ 1 ].id ).toBe( "http://example.com/resource/pointer-02/" );

					expect( response ).toBeDefined();
					expect( response instanceof HTTP.Response.Class ).toBe( true );
				},
				successEmpty: ( [ pointers, response ]:[ Pointer.Class[], HTTP.Response.Class ]  ):void => {
					expect( pointers ).toBeDefined();
					expect( Utils.isArray( pointers ) ).toBe( true );
					expect( pointers.length ).toBe( 0 );

					expect( response ).toBeDefined();
					expect( response instanceof HTTP.Response.Class ).toBe( true );
				},
				fail: ( error:Error ):void => {
					expect( error ).toBeDefined();
					expect( error instanceof Errors.IllegalArgumentError ).toBe( true );
				}
			};
			let spySuccess = spyOn( spies, "success" ).and.callThrough();
			let spyEmpty = spyOn( spies, "successEmpty" ).and.callThrough();
			let spyFail = spyOn( spies, "fail" ).and.callThrough();

			let promises:Promise<any>[] = [];
			let promise:Promise<any>;

			promise = documents.listChildren( "resource/" );
			expect( promise instanceof Promise ).toBe( true );
			promises.push( promise.then( spies.success ) );

			promise = documents.listChildren( "empty-resource/" );
			expect( promise instanceof Promise ).toBe( true );
			promises.push( promise.then( spies.successEmpty ) );

			promise = documents.listChildren( "another-empty-resource/" );
			expect( promise instanceof Promise ).toBe( true );
			promises.push( promise.then( spies.successEmpty ) );

			promise = documents.listChildren( "another-another-empty-resource/" );
			expect( promise instanceof Promise ).toBe( true );
			promises.push( promise.then( spies.successEmpty ) );

			Promise.all( promises ).then( ():void => {
				expect( spySuccess ).toHaveBeenCalledTimes( 1 );
				expect( spyEmpty ).toHaveBeenCalledTimes( 3 );
				expect( spyFail ).not.toHaveBeenCalled();
				done();
			}).catch( done.fail );
		});

		describe( method(
			INSTANCE,
			"getChildren"
		), () => {
			let documents:Documents;

			beforeEach( () => {
				class MockedContext extends AbstractContext {
					resolve( uri:string ):string {
						return "http://example.com/" + uri;
					}
				}

				let context:MockedContext = new MockedContext();
				context.extendObjectSchema({
					"ex": "http://example.com/ns#",
					"xsd": "http://www.w3.org/2001/XMLSchema#",
					"string": {
						"@id": "ex:string",
						"@type": "xsd:string",
					},
					"pointer": {
						"@id": "ex:pointer",
						"@type": "@id",
					},
				});

				documents = context.documents;
			});

			it( isDefined(), () => {
				expect( documents.getChildren ).toBeDefined();
				expect( Utils.isFunction( documents.getChildren ) ).toBe( true );
			});

			function stubListRequest( resource:string ):void {
				jasmine.Ajax.stubRequest( new RegExp( resource ), null, "GET" ).andReturn( {
					status: 200,
					responseText: `[
						{
						    "@id": "_:00",
						    "@type": [
						      "https://carbonldp.com/ns/v1/platform#ResponseMetadata",
						      "https://carbonldp.com/ns/v1/platform#VolatileResource"
						    ],
						    "https://carbonldp.com/ns/v1/platform#resourceMetadata": [{
								"@id": "_:01"
							}, {
								"@id": "_:02"
							}]
						},
						{
						    "@id": "_:01",
						    "@type": [
						        "https://carbonldp.com/ns/v1/platform#ResourceMetadata",
						        "https://carbonldp.com/ns/v1/platform#VolatileResource"
						    ],
						    "https://carbonldp.com/ns/v1/platform#eTag": [{
						        "@value": "\\"1234567890\\""
						    }],
						    "https://carbonldp.com/ns/v1/platform#resource": [{
						        "@id": "http://example.com/resource/element-01/"
						    }]
						},
						{
							"@id": "_:02",
							"@type": [
								"https://carbonldp.com/ns/v1/platform#ResourceMetadata",
								"https://carbonldp.com/ns/v1/platform#VolatileResource"
							],
							"https://carbonldp.com/ns/v1/platform#eTag": [{
								"@value": "\\"0987654321\\""
							}],
							"https://carbonldp.com/ns/v1/platform#resource": [{
								"@id": "http://example.com/resource/element-02/"
							}]
						},
						{
							"@id": "http://example.com/${ resource }/",
							"@graph": [{
								"@id": "http://example.com/${ resource }/",
						        "http://www.w3.org/ns/ldp#contains": [{
						            "@id": "http://example.com/resource/element-01/"
						        }, {
						            "@id": "http://example.com/resource/element-02/"
						        }]
						    }]
						},
						{
							"@id": "http://example.com/resource/element-01/",
							"@graph": [{
								"@id": "http://example.com/resource/element-01/",
								"@type": [ "http://www.w3.org/ns/ldp#BasicContainer" ],
								"http://example.com/ns#string": [{ "@value": "Document of resource 01" }],
								"http://example.com/ns#pointer": [
									{ "@id": "http://example.com/resource/element-01/#1" }
								]
						    }, {
								"@id": "http://example.com/resource/element-01/#1",
								"http://example.com/ns#string": [{ "@value": "NamedFragment of resource 01" }]
						    }]
						},
						{
							"@id": "http://example.com/resource/element-02/",
							"@graph": [{
								"@id": "http://example.com/resource/element-02/",
								"@type": [ "http://www.w3.org/ns/ldp#BasicContainer" ],
								"http://example.com/ns#string": [{ "@value": "Document of resource 02" }],
								"http://example.com/ns#pointer": [
									{ "@id": "_:01" }
								]
						    }, {
								"@id": "_:01",
								"http://example.com/ns#string": [{ "@value": "BlankNode of resource 02" }]
						    }]
						}
					]`
				});
			}

			function checkResponse( pointers:PersistedDocument.Class[], response:HTTP.Response.Class ):void {
				expect( pointers ).toBeDefined();
				expect( Utils.isArray( pointers ) ).toBe( true );
				expect( pointers.length ).toBe( 2 );
				expect( Pointer.Util.getIDs( pointers ) ).toEqual( [ "http://example.com/resource/element-01/", "http://example.com/resource/element-02/" ] );

				expect( pointers[ 0 ].id ).toBe( "http://example.com/resource/element-01/" );
				expect( pointers[ 0 ].isResolved() ).toBe( true );
				expect( pointers[ 0 ][ "_etag" ] ).toBe( "\"1234567890\"" );
				expect( pointers[ 0 ][ "string" ] ).toBe( "Document of resource 01" );
				expect( pointers[ 0 ][ "pointer" ] ).toBeDefined();
				expect( pointers[ 0 ][ "pointer" ][ "id" ] ).toBe( "http://example.com/resource/element-01/#1" );
				expect( pointers[ 0 ][ "pointer" ][ "string" ] ).toBe( "NamedFragment of resource 01" );

				expect( pointers[ 1 ].id ).toBe( "http://example.com/resource/element-02/" );
				expect( pointers[ 1 ].isResolved() ).toBe( true );
				expect( pointers[ 1 ][ "_etag" ] ).toBe( "\"0987654321\"" );
				expect( pointers[ 1 ][ "string" ] ).toBe( "Document of resource 02" );
				expect( pointers[ 1 ][ "pointer" ] ).toBeDefined();
				expect( pointers[ 1 ][ "pointer" ][ "id" ] ).toBe( "_:01" );
				expect( pointers[ 1 ][ "pointer" ][ "string" ] ).toBe( "BlankNode of resource 02" );

				expect( response ).toBeDefined();
				expect( response instanceof HTTP.Response.Class ).toBe( true );
			}

			function getPrefers( request:JasmineAjaxRequest ):[ string[], string[] ] {
				let prefers:[ string[], string[] ] = <any> [];
				let types:string[] = [ "include", "omit" ];

				for ( let index in types ) {
					let preferType:string = `return=representation; ${ types[ index ] }=`;
					let prefersValues:HTTP.Header.Class = new HTTP.Header.Class( request.requestHeaders[ "prefer" ] );
					let preferInclude:HTTP.Header.Value = prefersValues.values.find( ( value:HTTP.Header.Value ) => {
						return value.toString().startsWith( preferType );
					});
					prefers[ index ] = preferInclude.toString().substring( preferType.length + 1, preferInclude.toString().length - 1 ).split( " " );
				}
				return prefers;
			}

			function checkPrefer( request:JasmineAjaxRequest, nonReadable:boolean = true ) {
				let includes:string[] = null;
				let omits:string[] = null;

				expect( request.requestHeaders[ "prefer" ] ).toBeDefined();

				[ includes, omits ] = getPrefers( request );

				expect( includes ).toContain( NS.LDP.Class.PreferContainment );
				expect( includes ).toContain( NS.C.Class.PreferContainmentResources );

				expect( omits ).toContain( NS.LDP.Class.PreferMembership );
				expect( omits ).toContain( NS.C.Class.PreferMembershipResources );
			}

			it( hasSignature(
				"Retrieves an array of resolved Documents that refers the all children of the container specified, or a part of them in accordance of the retrieval preferences if specified.", [
					{ name: "parentURI", type: "string", description: "URI of the document from where to look for its children." },
					{ name: "retrievalPreferences", type: "Carbon.RetrievalPreferences.Class", optional: true, description: "An object that specify the retrieval preferences for the request." },
					{ name: "requestOptions", type: "Carbon.HTTP.Request.Options", optional: true, description: "Options that can be specified to change the behavior of the request." },
				],
				{ type: "Promise<[ Carbon.PersistedDocument.Class[], Carbon.HTTP.Response.Class ]>" }
			), ( done:{ ():void, fail:() => void }) => {
				let promises:Promise<any> [] = [];

				(() => {
					stubListRequest( "resource-1/" );

					let options:HTTP.Request.Options = { timeout: 12345 };
					let retrievalPreferences:RetrievalPreferences.Class = {
						limit: 10,
						offset: 0,
						orderBy: [ { "@id": "http://example.com/ns#string", "@type": "string" } ]
					};

					let promise:Promise<[ PersistedDocument.Class[], HTTP.Response.Class ]> = documents.getChildren( "resource-1/", retrievalPreferences, options );

					expect( promise instanceof Promise ).toBe( true );
					promises.push( promise.then( ( [ pointers, response ]:[ PersistedDocument.Class[], HTTP.Response.Class ] ) => {

						checkResponse( pointers, response );

						expect( options.timeout ).toBe( 12345 );
						expect( options.headers ).toBeDefined();

						let request:JasmineAjaxRequest = jasmine.Ajax.requests.filter( /resource-1/ )[ 0 ];
						let url:string = decodeURI( request.url );
						expect( url.indexOf( "resource-1/?limit=10&offset=0&orderBy=<http://example.com/ns%23string>;<http://www.w3.org/2001/XMLSchema%23string>" ) ).not.toBe( -1 );
						checkPrefer( request );
					}) );
				})();

				(() => {
					stubListRequest( "resource-2/" );

					let retrievalPreferences:RetrievalPreferences.Class = {
						limit: 10,
						offset: 0,
						orderBy: [ { "@id": "http://example.com/ns#string", "@type": "string" } ]
					};

					let promise:Promise<[ PersistedDocument.Class[], HTTP.Response.Class ]> = documents.getChildren( "resource-2/", retrievalPreferences );

					expect( promise instanceof Promise ).toBe( true );
					promises.push( promise.then( ( [ pointers, response ]:[ PersistedDocument.Class[], HTTP.Response.Class ] ) => {

						checkResponse( pointers, response );

						let request:JasmineAjaxRequest = jasmine.Ajax.requests.filter( /resource-2/ )[ 0 ];
						let url:string = decodeURI( request.url );
						expect( url.indexOf( "resource-2/?limit=10&offset=0&orderBy=<http://example.com/ns%23string>;<http://www.w3.org/2001/XMLSchema%23string>" ) ).not.toBe( -1 );
						checkPrefer( request );
					}) );
				})();

				(() => {
					jasmine.Ajax.stubRequest( new RegExp( "resource-3/" ), null, "GET" ).andReturn( {
						status: 200,
						responseText: `[]`
					});

					let retrievalPreferences:RetrievalPreferences.Class = {
						limit: 10,
						offset: 0,
						orderBy: [ { "@id": "http://example.com/ns#string", "@type": "string" } ]
					};

					let promise:Promise<[ PersistedDocument.Class[], HTTP.Response.Class ]> = documents.getChildren( "resource-3/", retrievalPreferences );

					expect( promise instanceof Promise ).toBe( true );
					promises.push( promise.then( ( [ pointers, response ]:[ PersistedDocument.Class[], HTTP.Response.Class ] ) => {

						expect( pointers ).toBeDefined();
						expect( Utils.isArray( pointers ) ).toBeDefined();
						expect( pointers.length ).toBe( 0 );

						expect( response ).toBeDefined();

						let request:JasmineAjaxRequest = jasmine.Ajax.requests.filter( /resource-3/ )[ 0 ];
						let url:string = decodeURI( request.url );
						expect( url.indexOf( "resource-3/?limit=10&offset=0&orderBy=<http://example.com/ns%23string>;<http://www.w3.org/2001/XMLSchema%23string>" ) ).not.toBe( -1 );
						checkPrefer( request );
					}) );
				})();

				(() => {
					jasmine.Ajax.stubRequest( new RegExp( "resource-4/" ), null, "GET" ).andReturn( {
						status: 200,
						responseText: `{}`
					});

					let retrievalPreferences:RetrievalPreferences.Class = {
						limit: 10,
						offset: 0,
						orderBy: [ { "@id": "http://example.com/ns#string", "@type": "string" } ]
					};

					let promise:Promise<[ PersistedDocument.Class[], HTTP.Response.Class ]> = documents.getChildren( "resource-4/", retrievalPreferences );

					expect( promise instanceof Promise ).toBe( true );
					promises.push( promise.then( ( [ pointers, response ]:[ PersistedDocument.Class[], HTTP.Response.Class ] ) => {

						expect( pointers ).toBeDefined();
						expect( Utils.isArray( pointers ) ).toBeDefined();
						expect( pointers.length ).toBe( 0 );

						expect( response ).toBeDefined();

						let request:JasmineAjaxRequest = jasmine.Ajax.requests.filter( /resource-4/ )[ 0 ];
						let url:string = decodeURI( request.url );
						expect( url.indexOf( "resource-4/?limit=10&offset=0&orderBy=<http://example.com/ns%23string>;<http://www.w3.org/2001/XMLSchema%23string>" ) ).not.toBe( -1 );
						checkPrefer( request );
					}) );
				})();

				Promise.all( promises ).then( done ).catch( done.fail );
			});

			it( hasSignature(
				"Retrieves an array of resolved Documents that refers the all children of the container specified.", [
					{ name: "parentURI", type: "string", description: "URI of the document from where to look for its children." },
					{ name: "requestOptions", type: "Carbon.HTTP.Request.Options", optional: true, description: "Options that can be specified to change the behavior of the request." },
				],
				{ type: "Promise<[ Carbon.PersistedDocument.Class[], Carbon.HTTP.Response.Class ]>" }
			), ( done:{ ():void, fail:() => void } ) => {
				let promises:Promise<any> [] = [];

				(() => {
					stubListRequest( "resource-1/" );

					let options:HTTP.Request.Options = { timeout: 12345 };
					let promise:Promise<[ PersistedDocument.Class[], HTTP.Response.Class ]> = documents.getChildren( "resource-1/", options );

					expect( promise instanceof Promise ).toBe( true );
					promises.push( promise.then( ( [ pointers, response ]:[ PersistedDocument.Class[], HTTP.Response.Class ] ) => {

						checkResponse( pointers, response );

						expect( options.timeout ).toBe( 12345 );
						expect( options.headers ).toBeDefined();

						let request:JasmineAjaxRequest = jasmine.Ajax.requests.filter( /resource-1/ )[ 0 ];
						expect( request.url ).toMatch( "resource-1/" );
						checkPrefer( request );
					}) );
				})();

				(() => {
					stubListRequest( "resource-2/" );

					let promise:Promise<[ PersistedDocument.Class[], HTTP.Response.Class ]> = documents.getChildren( "resource-2/" );

					expect( promise instanceof Promise ).toBe( true );
					promises.push( promise.then( ( [ pointers, response ]:[ PersistedDocument.Class[], HTTP.Response.Class ] ) => {

						checkResponse( pointers, response );

						let request:JasmineAjaxRequest = jasmine.Ajax.requests.filter( /resource-2/ )[ 0 ];
						expect( request.url ).toMatch( "resource-2/" );
						checkPrefer( request );
					}) );
				})();

				(() => {
					jasmine.Ajax.stubRequest( new RegExp( "resource-3/" ), null, "GET" ).andReturn( {
						status: 200,
						responseText: `[]`
					});

					let promise:Promise<[ PersistedDocument.Class[], HTTP.Response.Class ]> = documents.getChildren( "resource-3/" );

					expect( promise instanceof Promise ).toBe( true );
					promises.push( promise.then( ( [ pointers, response ]:[ PersistedDocument.Class[], HTTP.Response.Class ] ) => {

						expect( pointers ).toBeDefined();
						expect( Utils.isArray( pointers ) ).toBeDefined();
						expect( pointers.length ).toBe( 0 );

						expect( response ).toBeDefined();

						let request:JasmineAjaxRequest = jasmine.Ajax.requests.filter( /resource-3/ )[ 0 ];
						expect( request.url.indexOf( "resource-3/" ) ).not.toBe( -1 );
						checkPrefer( request );
					}) );
				})();

				(() => {
					jasmine.Ajax.stubRequest( new RegExp( "resource-4/" ), null, "GET" ).andReturn( {
						status: 200,
						responseText: `{}`
					});

					let promise:Promise<[ PersistedDocument.Class[], HTTP.Response.Class ]> = documents.getChildren( "resource-4/" );

					expect( promise instanceof Promise ).toBe( true );
					promises.push( promise.then( ( [ pointers, response ]:[ PersistedDocument.Class[], HTTP.Response.Class ] ) => {

						expect( pointers ).toBeDefined();
						expect( Utils.isArray( pointers ) ).toBeDefined();
						expect( pointers.length ).toBe( 0 );

						expect( response ).toBeDefined();

						let request:JasmineAjaxRequest = jasmine.Ajax.requests.filter( /resource-4/ )[ 0 ];
						expect( request.url.indexOf( "resource-4/" ) ).not.toBe( -1 );
						checkPrefer( request );
					}) );
				})();

				Promise.all( promises ).then( done ).catch( done.fail );
			});

		});

		describe( method(
			INSTANCE,
			"createAccessPoint"
		), ():void => {

			it( hasSignature(
				"Persists an AccessPoint in the CarbonLDP server, in the document specified.", [
					{ name: "documentURI", type: "string" },
					{ name: "accessPoint", type: "Carbon.AccessPoint.Class" },
					{ name: "slug", type: "string", optional: true },
					{ name: "requestOptions", type: "Carbon.HTTP.Request.Options", optional: true },
				],
				{ type: "Promise<[Carbon.Pointer.Class, Carbon.HTTP.Response.Class]>" }
			), ( done:(() => void) & { fail:( error?:any ) => void } ):void => {
				let promises:Promise<any>[] = [];

				class MockedContext extends AbstractContext {
					resolve( uri:string ):string {
						return uri;
					}
				}

				let context:MockedContext = new MockedContext();
				let documents:Documents = context.documents;
				let spy = {
					success: ( [ pointer, response ]:[Pointer.Class, HTTP.Response.Class] ):void => {
						expect( pointer.id ).toBe( "http://example.com/parent-resource/access-point/" );
					},
					fail: ( error:Error ) => {
						expect( error instanceof Errors.IllegalArgumentError ).toBe( true );
					}
				};
				let spySuccess = spyOn( spy, "success" ).and.callThrough();
				let spyFail = spyOn( spy, "fail" ).and.callThrough();

				jasmine.Ajax.stubRequest( "http://example.com/parent-resource/", null, "POST" ).andReturn( {
					status: 200,
					responseHeaders: {
						"Location": "http://example.com/parent-resource/access-point/",
					},
				} );

				let membershipResource:Pointer.Class = Pointer.Factory.create("http://example.com/parent-resource/");
				let promise:Promise<any>;
				let accessPoint:AccessPoint.Class;
	
				accessPoint = AccessPoint.Factory.create( membershipResource, "http://example.com/myNamespace#some-relation" );
				promise = documents.createAccessPoint( "http://example.com/parent-resource/", accessPoint, "access-point" );
				expect( promise instanceof Promise ).toBe( true );
				promises.push( promise.then( spy.success ) );

				accessPoint = AccessPoint.Factory.create( membershipResource, "http://example.com/myNamespace#some-relation" );
				promise = documents.createAccessPoint( "http://example.com/parent-resource/", accessPoint );
				expect( promise instanceof Promise ).toBe( true );
				promises.push( promise.then( spy.success ) );

				promise = documents.createAccessPoint( "http://example.com/the-bad-parent-resource/", accessPoint );
				expect( promise instanceof Promise ).toBe( true );
				promises.push( promise.catch( spy.fail ) );

				accessPoint.id = "http://example.com/bad-access-point-id/";
				promise = documents.createAccessPoint( "http://example.com/parent-resource/", accessPoint );
				expect( promise instanceof Promise ).toBe( true );
				promises.push( promise.catch( spy.fail ) );

				accessPoint.id = "";
				let persisted = PersistedDocument.Factory.decorate( accessPoint, documents );
				promise = documents.createAccessPoint( "http://example.com/parent-resource/", persisted );
				expect( promise instanceof Promise ).toBe( true );
				promises.push( promise.catch( spy.fail ) );

				Promise.all( promises ).then( ():void => {
					expect( spySuccess ).toHaveBeenCalledTimes( 2 );
					expect( spyFail ).toHaveBeenCalledTimes( 3 );
					done();
				}, done.fail );
			});

			it( hasSignature(
				"Persists an AccessPoint in the CarbonLDP server, in the document specified.", [
					{ name: "accessPoint", type: "Carbon.AccessPoint.Class" },
					{ name: "slug", type: "string", optional: true },
					{ name: "requestOptions", type: "Carbon.HTTP.Request.Options", optional: true },
				],
				{ type: "Promise<[Carbon.Pointer.Class, Carbon.HTTP.Response.Class]>" }
			), ( done:(() => void) & { fail:( error?:any ) => void } ):void => {

				let promises:Promise<any>[] = [];

				class MockedContext extends AbstractContext {
					resolve( uri:string ):string {
						return uri;
					}
				}

				let context:MockedContext = new MockedContext();
				let documents:Documents = context.documents;
				let spy = {
					success: ( [ pointer, response ]:[Pointer.Class, HTTP.Response.Class] ):void => {
						expect( pointer.id ).toBe( "http://example.com/parent-resource/access-point/" );
					},
					fail: ( error:Error ) => {
						expect( error instanceof Errors.IllegalArgumentError ).toBe( true );
					}
				};
				let spySuccess = spyOn( spy, "success" ).and.callThrough();
				let spyFail = spyOn( spy, "fail" ).and.callThrough();

				jasmine.Ajax.stubRequest( "http://example.com/parent-resource/", null, "POST" ).andReturn( {
					status: 200,
					responseHeaders: {
						"Location": "http://example.com/parent-resource/access-point/",
					},
				} );

				let membershipResource:Pointer.Class = Pointer.Factory.create("http://example.com/parent-resource/");
				let promise:Promise<any>;
				let accessPoint:AccessPoint.Class;

				accessPoint = AccessPoint.Factory.create( membershipResource, "http://example.com/myNamespace#some-relation" );
				promise = documents.createAccessPoint( accessPoint, "access-point" );
				expect( promise instanceof Promise ).toBe( true );
				promises.push( promise.then( spy.success ) );

				accessPoint = AccessPoint.Factory.create( membershipResource, "http://example.com/myNamespace#some-relation" );
				promise = documents.createAccessPoint( accessPoint );
				expect( promise instanceof Promise ).toBe( true );
				promises.push( promise.then( spy.success ) );

				accessPoint.id = "http://example.com/bad-access-point-id/";
				promise = documents.createAccessPoint( accessPoint );
				expect( promise instanceof Promise ).toBe( true );
				promises.push( promise.catch( spy.fail ) );

				accessPoint.id = "";
				let persisted = PersistedDocument.Factory.decorate( accessPoint, documents );
				promise = documents.createAccessPoint( persisted );
				expect( promise instanceof Promise ).toBe( true );
				promises.push( promise.catch( spy.fail ) );

				Promise.all( promises ).then( ():void => {
					expect( spySuccess ).toHaveBeenCalledTimes( 2 );
					expect( spyFail ).toHaveBeenCalledTimes( 2 );
					done();
				}, done.fail );
			});
		});

		describe( method(
			INSTANCE,
			"upload"
		), ():void => {

			it( hasSignature(
				"Upload a binary data to the CarbonLDP server, creating a child for the parent specified. This signature only works in a Browser.", [
					{ name: "parentURI", type: "string" },
					{ name: "data", type: "Blob" },
					{ name: "requestOptions", type: "Carbon.HTTP.Request.Options", optional: true },
				],
				{ type:"Promise<[Carbon.Pointer.Class, Carbon.HTTP.Response.Class]>" }
			), ( done:{ ():void, fail:() => void } ):void => {
				let promises:Promise<any>[] = [];

				class MockedContext extends AbstractContext {
					resolve( uri:string ):string {
						return uri;
					}
				}

				let context:MockedContext = new MockedContext();
				let documents:Documents = context.documents;

				expect( documents.upload ).toBeDefined();
				expect( Utils.isFunction( documents.upload ) ).toBe( true );

				if ( typeof Blob !== "undefined" ) {

					let spy = {
						success: ( response:[Pointer.Class, HTTP.Response.Class] ):void => {
							expect( response ).toBeDefined();
							expect( Utils.isArray( response ) ).toBe( true );
							expect( response.length ).toBe( 2 );

							let pointer:Pointer.Class = response[ 0 ];
							expect( pointer.id ).toBe( "http://example.com/parent-resource/new-auto-generated-id/" );
						}
					};
					let spySuccess = spyOn( spy, "success" ).and.callThrough();

					let blob:Blob = new Blob( [ JSON.stringify( { "some content": "for the blob." } ) ], { type : "application/json" } );

					jasmine.Ajax.stubRequest( "http://example.com/parent-resource/", null, "POST" ).andReturn( {
						status: 200,
						responseHeaders: {
							"Location": "http://example.com/parent-resource/new-auto-generated-id/",
						},
					} );

					promises.push( documents.upload( "http://example.com/parent-resource/", blob ).then( spy.success ) );

					Promise.all( promises ).then( ():void => {
						expect( spySuccess ).toHaveBeenCalled();
						done();
					}, done.fail );

				} else { done(); }
			});

			it( hasSignature(
				"Upload a binary data to the CarbonLDP server, creating a child for the parent specified. This signature only works in a Browser.", [
					{ name: "parentURI", type: "string" },
					{ name: "slug", type: "string" },
					{ name: "data", type: "Blob" },
					{ name: "requestOptions", type: "Carbon.HTTP.Request.Options", optional: true },
				],
				{ type:"Promise<[Carbon.Pointer.Class, Carbon.HTTP.Response.Class]>" }
			), ( done:{ ():void, fail:() => void } ):void => {
				let promises:Promise<any>[] = [];

				class MockedContext extends AbstractContext {
					resolve( uri:string ):string {
						return uri;
					}
				}

				let context:MockedContext = new MockedContext();
				let documents:Documents = context.documents;

				expect( documents.upload ).toBeDefined();
				expect( Utils.isFunction( documents.upload ) ).toBe( true );

				if ( typeof Blob !== "undefined" ) {

						let spy = {
							success: ( response:[Pointer.Class, HTTP.Response.Class] ):void => {
								expect( response ).toBeDefined();
								expect( Utils.isArray( response ) ).toBe( true );
								expect( response.length ).toBe( 2 );

								let pointer:Pointer.Class = response[ 0 ];
								expect( pointer.id ).toBe( "http://example.com/parent-resource/slug-id/" );
							}
						};
						let spySuccess = spyOn( spy, "success" ).and.callThrough();

						let blob:Blob = new Blob( [ JSON.stringify( { "some content": "for the blob." } ) ], { type : "application/json" } );

						jasmine.Ajax.stubRequest( "http://example.com/parent-resource/", null, "POST" ).andReturn( {
							status: 200,
							responseHeaders: {
								"Location": "http://example.com/parent-resource/slug-id/",
							},
						});

						promises.push( documents.upload( "http://example.com/parent-resource/", "slug-id", blob ).then( spy.success ) );

						Promise.all( promises ).then( ():void => {
							expect( spySuccess ).toHaveBeenCalled();
							done();
					}, done.fail );

				} else { done(); }
			});

			it( hasSignature(
				"Upload a binary data to the CarbonLDP server, creating a child for the parent specified. This signature only works in Node.js.", [
					{ name: "parentURI", type: "string" },
					{ name: "data", type: "Buffer" },
					{ name: "requestOptions", type: "Carbon.HTTP.Request.Options", optional: true },
				],
				{ type:"Promise<[Carbon.Pointer.Class, Carbon.HTTP.Response.Class]>" }
			), ( done:{ ():void, fail:() => void } ):void => {
				let promises:Promise<any>[] = [];

				class MockedContext extends AbstractContext {
					resolve( uri:string ):string {
						return uri;
					}
				}

				let context:MockedContext = new MockedContext();
				let documents:Documents = context.documents;

				expect( documents.upload ).toBeDefined();
				expect( Utils.isFunction( documents.upload ) ).toBe( true );

				if ( typeof Buffer !== "undefined" ) {

					let spy = {
						success: ( response:[Pointer.Class, HTTP.Response.Class] ):void => {
							expect( response ).toBeDefined();
							expect( Utils.isArray( response ) ).toBe( true );
							expect( response.length ).toBe( 2 );

							let pointer:Pointer.Class = response[ 0 ];
							expect( pointer.id ).toBe( "http://example.com/parent-resource/new-auto-generated-id/" );
						}
					};
					let spySuccess = spyOn( spy, "success" ).and.callThrough();

					let buffer:Buffer = new Buffer( JSON.stringify( { "some content": "for the buffer." } ) );

					jasmine.Ajax.stubRequest( "http://example.com/parent-resource/", null, "POST" ).andReturn( {
						status: 200,
						responseHeaders: {
							"Location": "http://example.com/parent-resource/new-auto-generated-id/",
						},
					} );

					promises.push( documents.upload( "http://example.com/parent-resource/", buffer ).then( spy.success ) );

					Promise.all( promises ).then( ():void => {
						expect( spySuccess ).toHaveBeenCalled();
						done();
					}, done.fail );

				} else { done(); }
			});

			it( hasSignature(
				"Upload a binary data to the CarbonLDP server, creating a child for the parent specified. This signature only works in Node.js.", [
					{ name: "parentURI", type: "string" },
					{ name: "slug", type: "string" },
					{ name: "data", type: "Buffer" },
					{ name: "requestOptions", type: "Carbon.HTTP.Request.Options", optional: true },
				],
				{ type:"Promise<[Carbon.Pointer.Class, Carbon.HTTP.Response.Class]>" }
			), ( done:{ ():void, fail:() => void } ):void => {
				let promises:Promise<any>[] = [];

				class MockedContext extends AbstractContext {
					resolve( uri:string ):string {
						return uri;
					}
				}

				let context:MockedContext = new MockedContext();
				let documents:Documents = context.documents;

				expect( documents.upload ).toBeDefined();
				expect( Utils.isFunction( documents.upload ) ).toBe( true );

				if ( typeof Buffer !== "undefined" ) {

					let spy = {
						success: ( response:[Pointer.Class, HTTP.Response.Class] ):void => {
							expect( response ).toBeDefined();
							expect( Utils.isArray( response ) ).toBe( true );
							expect( response.length ).toBe( 2 );

							let pointer:Pointer.Class = response[ 0 ];
							expect( pointer.id ).toBe( "http://example.com/parent-resource/new-auto-generated-id/" );
						}
					};
					let spySuccess = spyOn( spy, "success" ).and.callThrough();

					let buffer:Buffer = new Buffer( JSON.stringify( { "some content": "for the buffer." } ) );

					jasmine.Ajax.stubRequest( "http://example.com/parent-resource/", null, "POST" ).andReturn( {
						status: 200,
						responseHeaders: {
							"Location": "http://example.com/parent-resource/new-auto-generated-id/",
						},
					} );

					promises.push( documents.upload( "http://example.com/parent-resource/", "slug-id", buffer ).then( spy.success ) );

					Promise.all( promises ).then( ():void => {
						expect( spySuccess ).toHaveBeenCalled();
						done();
					}, done.fail );

				} else { done(); }
			});

		});

		describe( method( INSTANCE, "listMembers" ), () => {
			let documents:Documents;

			beforeEach( () => {
				class MockedContext extends AbstractContext {
					resolve( uri:string ):string {
						return "http://example.com/" + uri;
					}
				}

				let context:MockedContext = new MockedContext();
				documents = context.documents;
			});

			it( isDefined(), () => {
				expect( documents.listMembers ).toBeDefined();
				expect( Utils.isFunction( documents.listMembers ) ).toBe( true );
			});

			it( hasSignature(
				"Retrieves all the members of a document with out resolving them, where you can specify if the response should include the Non Readable resources and options for the request.", [
					{ name: "uri", type: "string", description: "URI of the document from where to look for its members." },
					{ name: "includeNonReadable", type: "boolean", optional: true, description: "Specify if the the response should include the Non Readable resources. By default this is set to `true`." },
					{ name: "requestOptions", type: "Carbon.HTTP.Request.Options", optional: true, description: "Options that can be specified for change the behavior of the request." },
				],
				{ type: "Promise<[ Carbon.Pointer.Class[], Carbon.HTTP.Response.Class ]>" }
			), ( done:{ ():void, fail:() => void }) => {
				let promises:Promise<any> [] = [];

				(() => {
					stubListRequest( "resource-1/" );

					let options:HTTP.Request.Options = { timeout: 12345 };
					let promise:Promise<[ Pointer.Class[], HTTP.Response.Class ]> = documents.listMembers( "resource-1/", true, options );

					expect( promise instanceof Promise ).toBe( true );
					promises.push( promise.then( ( [ pointers, response ]:[ Pointer.Class[], HTTP.Response.Class ] ) => {

						checkResponse( pointers, response );

						expect( options.timeout ).toBe( 12345 );
						expect( options.headers ).toBeDefined();

						let request:JasmineAjaxRequest = jasmine.Ajax.requests.filter( /resource-1/ )[ 0 ];
						expect( request.url ).toMatch( "resource-1/" );
						checkPrefer( request, "include" );
					}) );
				})();

				(() => {
					stubListRequest( "resource-2/" );

					let options:HTTP.Request.Options = { timeout: 12345 };
					let promise:Promise<[ Pointer.Class[], HTTP.Response.Class ]> = documents.listMembers( "resource-2/", false, options );

					expect( promise instanceof Promise ).toBe( true );
					promises.push( promise.then( ( [ pointers, response ]:[ Pointer.Class[], HTTP.Response.Class ] ) => {

						checkResponse( pointers, response );

						expect( options.timeout ).toBe( 12345 );
						expect( options.headers ).toBeDefined();

						let request:JasmineAjaxRequest = jasmine.Ajax.requests.filter( /resource-2/ )[ 0 ];
						expect( request.url ).toMatch( "resource-2/" );
						checkPrefer( request, "omit" );
					}) );
				})();

				(() => {
					stubListRequest( "resource-3/" );

					let promise:Promise<[ Pointer.Class[], HTTP.Response.Class ]> = documents.listMembers( "resource-3/", true );

					expect( promise instanceof Promise ).toBe( true );
					promises.push( promise.then( ( [ pointers, response ]:[ Pointer.Class[], HTTP.Response.Class ] ) => {

						checkResponse( pointers, response );

						let request:JasmineAjaxRequest = jasmine.Ajax.requests.filter( /resource-3/ )[ 0 ];
						expect( request.url ).toMatch( "resource-3/" );
						checkPrefer( request, "include" );
					}) );
				})();

				(() => {
					stubListRequest( "resource-4/" );

					let promise:Promise<[ Pointer.Class[], HTTP.Response.Class ]> = documents.listMembers( "resource-4/", false );

					expect( promise instanceof Promise ).toBe( true );
					promises.push( promise.then( ( [ pointers, response ]:[ Pointer.Class[], HTTP.Response.Class ] ) => {

						checkResponse( pointers, response );

						let request:JasmineAjaxRequest = jasmine.Ajax.requests.filter( /resource-4/ )[ 0 ];
						expect( request.url ).toMatch( "resource-4/" );
						checkPrefer( request, "omit" );
					}) );
				})();

				(() => {
					stubListRequest( "resource-5/" );

					let promise:Promise<[ Pointer.Class[], HTTP.Response.Class ]> = documents.listMembers( "resource-5/" );

					expect( promise instanceof Promise ).toBe( true );
					promises.push( promise.then( ( [ pointers, response ]:[ Pointer.Class[], HTTP.Response.Class ] ) => {

						checkResponse( pointers, response );

						let request:JasmineAjaxRequest = jasmine.Ajax.requests.filter( /resource-5/ )[ 0 ];
						expect( request.url ).toMatch( "resource-5/" );
						checkPrefer( request, "include" );
					}) );
				})();

				Promise.all( promises ).then( done ).catch( done.fail );
			});

			it( hasSignature(
				"Retrieves all the members of a document with out resolving them, where you can specify options for the request.", [
					{ name: "uri", type: "string", description: "URI of the document from where to look for its members." },
					{ name: "requestOptions", type: "Carbon.HTTP.Request.Options", optional: true, description: "Options that can be specified for change the behavior of the request." },
				],
				{ type: "Promise<[ Carbon.Pointer.Class[], Carbon.HTTP.Response.Class ]>" }
			), ( done:{ ():void, fail:() => void } ) => {
				let promises:Promise<any> [] = [];

				(() => {
					stubListRequest( "resource-1/" );

					let options:HTTP.Request.Options = { timeout: 12345 };
					let promise:Promise<[ Pointer.Class[], HTTP.Response.Class ]> = documents.listMembers( "resource-1/", options );

					expect( promise instanceof Promise ).toBe( true );
					promises.push( promise.then( ( [ pointers, response ]:[ Pointer.Class[], HTTP.Response.Class ] ) => {

						checkResponse( pointers, response );

						expect( options.timeout ).toBe( 12345 );
						expect( options.headers ).toBeDefined();

						let request:JasmineAjaxRequest = jasmine.Ajax.requests.filter( /resource-1/ )[ 0 ];
						expect( request.url ).toMatch( "resource-1/" );
						checkPrefer( request, "include" );
					}) );
				})();

				(() => {
					stubListRequest( "resource-2/" );

					let promise:Promise<[ Pointer.Class[], HTTP.Response.Class ]> = documents.listMembers( "resource-2/" );

					expect( promise instanceof Promise ).toBe( true );
					promises.push( promise.then( ( [ pointers, response ]:[ Pointer.Class[], HTTP.Response.Class ] ) => {

						checkResponse( pointers, response );

						let request:JasmineAjaxRequest = jasmine.Ajax.requests.filter( /resource-2/ )[ 0 ];
						expect( request.url ).toMatch( "resource-2/" );
						checkPrefer( request, "include" );
					}) );
				})();

				Promise.all( promises ).then( done ).catch( done.fail );
			});

			function stubListRequest( resource:string ):void {
				jasmine.Ajax.stubRequest( new RegExp( resource ), null, "GET" ).andReturn( {
					status: 200,
					responseText: `[{
							"@id": "http://example.com/${ resource }",
							"@graph": [{
								"@id": "http://example.com/${ resource }",
								"@type": [ "http://www.w3.org/ns/ldp#BasicContainer" ],
								"http://www.w3.org/ns/ldp#hasMemberRelation": [{
						            "@id": "http://www.w3.org/ns/ldp#my-member"
						        }],
						        "http://www.w3.org/ns/ldp#my-member": [{
						            "@id": "http://example.com/resource/element-01/"
						        }, {
						            "@id": "http://example.com/resource/element-02/"
						        }, {
						            "@id": "http://example.com/resource/element-03/"
						        }]
						    }]
						}]`
				});
			}

			function checkResponse( pointers:Pointer.Class[], response:HTTP.Response.Class ):void {
				expect( pointers ).toBeDefined();
				expect( Utils.isArray( pointers ) ).toBe( true );
				expect( pointers.length ).toBe( 3 );
				expect( Pointer.Util.getIDs( pointers ) ).toEqual( [ "http://example.com/resource/element-01/", "http://example.com/resource/element-02/", "http://example.com/resource/element-03/" ] );

				expect( response ).toBeDefined();
				expect( response instanceof HTTP.Response.Class ).toBe( true );
			}

			function checkPrefer( request:JasmineAjaxRequest, preferType:string ) {
				let prefer:string = `return=representation; ${ preferType }=`;
				expect( request.requestHeaders[ "prefer" ] ).toBeDefined();
				let prefers:HTTP.Header.Class = new HTTP.Header.Class( request.requestHeaders[ "prefer" ] );
				let preferInclude:HTTP.Header.Value = prefers.values.find( ( value:HTTP.Header.Value ) => {
					return value.toString().startsWith( prefer );
				});
				let includes:string[] = preferInclude.toString().substring( prefer.length, preferInclude.toString().length - 1 ).split( " " );
				expect( includes ).toContain( NS.C.Class.NonReadableMembershipResourceTriples );
			}

		});

		describe( method( INSTANCE, "getMembers", "Retrieves and resolve all the members of a specified document." ), () => {
			let documents:Documents;

			beforeEach( () => {
				class MockedContext extends AbstractContext {
					resolve( uri:string ):string {
						return "http://example.com/" + uri;
					}
				}

				let context:MockedContext = new MockedContext();
				context.extendObjectSchema({
					"ex": "http://example.com/ns#",
					"xsd": "http://www.w3.org/2001/XMLSchema#",
					"string": {
						"@id": "ex:string",
						"@type": "xsd:string",
					},
					"pointer": {
						"@id": "ex:pointer",
						"@type": "@id",
					},
				});

				documents = context.documents;
			});

			it( isDefined(), () => {
				expect( documents.getMembers ).toBeDefined();
				expect( Utils.isFunction( documents.getMembers ) ).toBe( true );
			});

			function stubListRequest( resource:string ):void {
				jasmine.Ajax.stubRequest( new RegExp( resource ), null, "GET" ).andReturn( {
					status: 200,
					responseText: `[
						{
						    "@id": "_:00",
						    "@type": [
						      "https://carbonldp.com/ns/v1/platform#ResponseMetadata",
						      "https://carbonldp.com/ns/v1/platform#VolatileResource"
						    ],
						    "https://carbonldp.com/ns/v1/platform#resourceMetadata": [{
								"@id": "_:01"
							}, {
								"@id": "_:02"
							}]
						},
						{
						    "@id": "_:01",
						    "@type": [
						        "https://carbonldp.com/ns/v1/platform#ResourceMetadata",
						        "https://carbonldp.com/ns/v1/platform#VolatileResource"
						    ],
						    "https://carbonldp.com/ns/v1/platform#eTag": [{
						        "@value": "\\"1234567890\\""
						    }],
						    "https://carbonldp.com/ns/v1/platform#resource": [{
						        "@id": "http://example.com/resource/element-01/"
						    }]
						},
						{
							"@id": "_:02",
							"@type": [
								"https://carbonldp.com/ns/v1/platform#ResourceMetadata",
								"https://carbonldp.com/ns/v1/platform#VolatileResource"
							],
							"https://carbonldp.com/ns/v1/platform#eTag": [{
								"@value": "\\"0987654321\\""
							}],
							"https://carbonldp.com/ns/v1/platform#resource": [{
								"@id": "http://example.com/resource/element-02/"
							}]
						},
						{
							"@id": "http://example.com/${ resource }/",
							"@graph": [{
								"@id": "http://example.com/${ resource }/",
								"@type": [ "http://www.w3.org/ns/ldp#BasicContainer" ],
								"http://www.w3.org/ns/ldp#hasMemberRelation": [{
						            "@id": "http://www.w3.org/ns/ldp#my-member"
						        }],
						        "http://www.w3.org/ns/ldp#my-member": [{
						            "@id": "http://example.com/resource/element-01/"
						        }, {
						            "@id": "http://example.com/resource/element-02/"
						        }]
						    }]
						},
						{
							"@id": "http://example.com/resource/element-01/",
							"@graph": [{
								"@id": "http://example.com/resource/element-01/",
								"@type": [ "http://www.w3.org/ns/ldp#BasicContainer" ],
								"http://example.com/ns#string": [{ "@value": "Document of resource 01" }],
								"http://example.com/ns#pointer": [
									{ "@id": "http://example.com/resource/element-01/#1" }
								]
						    }, {
								"@id": "http://example.com/resource/element-01/#1",
								"http://example.com/ns#string": [{ "@value": "NamedFragment of resource 01" }]
						    }]
						},
						{
							"@id": "http://example.com/resource/element-02/",
							"@graph": [{
								"@id": "http://example.com/resource/element-02/",
								"@type": [ "http://www.w3.org/ns/ldp#BasicContainer" ],
								"http://example.com/ns#string": [{ "@value": "Document of resource 02" }],
								"http://example.com/ns#pointer": [
									{ "@id": "_:01" }
								]
						    }, {
								"@id": "_:01",
								"http://example.com/ns#string": [{ "@value": "BlankNode of resource 02" }]
						    }]
						}
					]`
				});
			}

			function checkResponse( pointers:PersistedDocument.Class[], response:HTTP.Response.Class ):void {
				expect( pointers ).toBeDefined();
				expect( Utils.isArray( pointers ) ).toBe( true );
				expect( pointers.length ).toBe( 2 );
				expect( Pointer.Util.getIDs( pointers ) ).toEqual( [ "http://example.com/resource/element-01/", "http://example.com/resource/element-02/" ] );

				expect( pointers[ 0 ].id ).toBe( "http://example.com/resource/element-01/" );
				expect( pointers[ 0 ].isResolved() ).toBe( true );
				expect( pointers[ 0 ][ "_etag" ] ).toBe( "\"1234567890\"" );
				expect( pointers[ 0 ][ "string" ] ).toBe( "Document of resource 01" );
				expect( pointers[ 0 ][ "pointer" ] ).toBeDefined();
				expect( pointers[ 0 ][ "pointer" ][ "id" ] ).toBe( "http://example.com/resource/element-01/#1" );
				expect( pointers[ 0 ][ "pointer" ][ "string" ] ).toBe( "NamedFragment of resource 01" );

				expect( pointers[ 1 ].id ).toBe( "http://example.com/resource/element-02/" );
				expect( pointers[ 1 ].isResolved() ).toBe( true );
				expect( pointers[ 1 ][ "_etag" ] ).toBe( "\"0987654321\"" );
				expect( pointers[ 1 ][ "string" ] ).toBe( "Document of resource 02" );
				expect( pointers[ 1 ][ "pointer" ] ).toBeDefined();
				expect( pointers[ 1 ][ "pointer" ][ "id" ] ).toBe( "_:01" );
				expect( pointers[ 1 ][ "pointer" ][ "string" ] ).toBe( "BlankNode of resource 02" );

				expect( response ).toBeDefined();
				expect( response instanceof HTTP.Response.Class ).toBe( true );
			}

			function getPrefers( request:JasmineAjaxRequest ):[ string[], string[] ] {
				let prefers:[ string[], string[] ] = <any> [];
				let types:string[] = [ "include", "omit" ];

				for ( let index in types ) {
					let preferType:string = `return=representation; ${ types[ index ] }=`;
					let prefersValues:HTTP.Header.Class = new HTTP.Header.Class( request.requestHeaders[ "prefer" ] );
					let preferInclude:HTTP.Header.Value = prefersValues.values.find( ( value:HTTP.Header.Value ) => {
						return value.toString().startsWith( preferType );
					});
					prefers[ index ] = preferInclude.toString().substring( preferType.length + 1, preferInclude.toString().length - 1 ).split( " " );
				}
				return prefers;
			}

			function checkPrefer( request:JasmineAjaxRequest, nonReadable:boolean = true ) {
				let includes:string[] = null;
				let omits:string[] = null;

				expect( request.requestHeaders[ "prefer" ] ).toBeDefined();

				[ includes, omits ] = getPrefers( request );

				expect( includes ).toContain( NS.LDP.Class.PreferMembership );
				expect( includes ).toContain( NS.C.Class.PreferMembershipResources );
				expect( omits ).toContain( NS.LDP.Class.PreferContainment );
				expect( omits ).toContain( NS.C.Class.PreferContainmentResources );

				if ( nonReadable ) {
					expect( includes ).toContain( NS.C.Class.NonReadableMembershipResourceTriples );
				} else {
					expect( omits ).toContain( NS.C.Class.NonReadableMembershipResourceTriples );
				}
			}

			it( hasSignature(
				"Retrieves all the members of a document and their contents, where you can specify if the response should include the Non Readable resources, the retrieval preferences and the options for the request.", [
					{ name: "uri", type: "string", description: "URI of the document from where to look for its members." },
					{ name: "includeNonReadable", type: "boolean", optional: true, description: "Specify if the the response should include the Non Readable resources. By default this is set to `true`." },
					{ name: "retrievalPreferences", type: "Carbon.RetrievalPreferences.Class", optional: true, description: "An object for specify the retrieval preferences for the request." },
					{ name: "requestOptions", type: "Carbon.HTTP.Request.Options", optional: true, description: "Options that can be specified for change the behavior of the request." },
				],
				{ type: "Promise<[ Carbon.Pointer.Class[], Carbon.HTTP.Response.Class ]>" }
			), ( done:{ ():void, fail:() => void }) => {
				let promises:Promise<any> [] = [];

				(() => {
					stubListRequest( "resource-1/" );

					let options:HTTP.Request.Options = { timeout: 12345 };
					let retrievalPreferences:RetrievalPreferences.Class = {
						limit: 10,
						offset: 0,
						orderBy: [ { "@id": "http://example.com/ns#string", "@type": "string" } ]
					};

					let promise:Promise<[ PersistedDocument.Class[], HTTP.Response.Class ]> = documents.getMembers( "resource-1/", true, retrievalPreferences, options );

					expect( promise instanceof Promise ).toBe( true );
					promises.push( promise.then( ( [ pointers, response ]:[ PersistedDocument.Class[], HTTP.Response.Class ] ) => {

						checkResponse( pointers, response );

						expect( options.timeout ).toBe( 12345 );
						expect( options.headers ).toBeDefined();

						let request:JasmineAjaxRequest = jasmine.Ajax.requests.filter( /resource-1/ )[ 0 ];
						let url:string = decodeURI( request.url );
						expect( url.indexOf( "resource-1/?limit=10&offset=0&orderBy=<http://example.com/ns%23string>;<http://www.w3.org/2001/XMLSchema%23string>" ) ).not.toBe( -1 );
						checkPrefer( request, true );
					}) );
				})();

				(() => {
					stubListRequest( "resource-2/" );

					let options:HTTP.Request.Options = { timeout: 12345 };
					let retrievalPreferences:RetrievalPreferences.Class = {
						limit: 10,
						offset: 0,
						orderBy: [ { "@id": "http://example.com/ns#string", "@type": "string" } ]
					};

					let promise:Promise<[ PersistedDocument.Class[], HTTP.Response.Class ]> = documents.getMembers( "resource-2/", false, retrievalPreferences, options );

					expect( promise instanceof Promise ).toBe( true );
					promises.push( promise.then( ( [ pointers, response ]:[ PersistedDocument.Class[], HTTP.Response.Class ] ) => {

						checkResponse( pointers, response );

						expect( options.timeout ).toBe( 12345 );
						expect( options.headers ).toBeDefined();

						let request:JasmineAjaxRequest = jasmine.Ajax.requests.filter( /resource-2/ )[ 0 ];
						let url:string = decodeURI( request.url );
						expect( url.indexOf( "resource-2/?limit=10&offset=0&orderBy=<http://example.com/ns%23string>;<http://www.w3.org/2001/XMLSchema%23string>" ) ).not.toBe( -1 );
						checkPrefer( request, false );
					}) );
				})();

				(() => {
					stubListRequest( "resource-3/" );

					let retrievalPreferences:RetrievalPreferences.Class = {
						limit: 10,
						offset: 0,
						orderBy: [ { "@id": "http://example.com/ns#string", "@type": "string" } ]
					};

					let promise:Promise<[ PersistedDocument.Class[], HTTP.Response.Class ]> = documents.getMembers( "resource-3/", true, retrievalPreferences );

					expect( promise instanceof Promise ).toBe( true );
					promises.push( promise.then( ( [ pointers, response ]:[ PersistedDocument.Class[], HTTP.Response.Class ] ) => {

						checkResponse( pointers, response );

						let request:JasmineAjaxRequest = jasmine.Ajax.requests.filter( /resource-3/ )[ 0 ];
						let url:string = decodeURI( request.url );
						expect( url.indexOf( "resource-3/?limit=10&offset=0&orderBy=<http://example.com/ns%23string>;<http://www.w3.org/2001/XMLSchema%23string>" ) ).not.toBe( -1 );
						checkPrefer( request, true );
					}) );
				})();

				(() => {
					stubListRequest( "resource-4/" );

					let retrievalPreferences:RetrievalPreferences.Class = {
						limit: 10,
						offset: 0,
						orderBy: [ { "@id": "http://example.com/ns#string", "@type": "string" } ]
					};

					let promise:Promise<[ PersistedDocument.Class[], HTTP.Response.Class ]> = documents.getMembers( "resource-4/", false, retrievalPreferences );

					expect( promise instanceof Promise ).toBe( true );
					promises.push( promise.then( ( [ pointers, response ]:[ PersistedDocument.Class[], HTTP.Response.Class ] ) => {

						checkResponse( pointers, response );

						let request:JasmineAjaxRequest = jasmine.Ajax.requests.filter( /resource-4/ )[ 0 ];
						let url:string = decodeURI( request.url );
						expect( url.indexOf( "resource-4/?limit=10&offset=0&orderBy=<http://example.com/ns%23string>;<http://www.w3.org/2001/XMLSchema%23string>" ) ).not.toBe( -1 );
						checkPrefer( request, false );
					}) );
				})();

				Promise.all( promises ).then( done ).catch( done.fail );
			});

			it( hasSignature(
				"Retrieves all the members of a document and their contents, where you can specify if the response should include the Non Readable resources and options for the request.", [
					{ name: "uri", type: "string", description: "URI of the document from where to look for its members." },
					{ name: "includeNonReadable", type: "boolean", optional: true, description: "Specify if the the response should include the Non Readable resources. By default this is set to `true`." },
					{ name: "requestOptions", type: "Carbon.HTTP.Request.Options", optional: true, description: "Options that can be specified for change the behavior of the request." },
				],
				{ type: "Promise<[ Carbon.Pointer.Class[], Carbon.HTTP.Response.Class ]>" }
			), ( done:{ ():void, fail:() => void }) => {
				let promises:Promise<any> [] = [];

				(() => {
					stubListRequest( "resource-1/" );

					let options:HTTP.Request.Options = { timeout: 12345 };
					let promise:Promise<[ PersistedDocument.Class[], HTTP.Response.Class ]> = documents.getMembers( "resource-1/", true, options );

					expect( promise instanceof Promise ).toBe( true );
					promises.push( promise.then( ( [ pointers, response ]:[ PersistedDocument.Class[], HTTP.Response.Class ] ) => {

						checkResponse( pointers, response );

						expect( options.timeout ).toBe( 12345 );
						expect( options.headers ).toBeDefined();

						let request:JasmineAjaxRequest = jasmine.Ajax.requests.filter( /resource-1/ )[ 0 ];
						expect( request.url ).toMatch( "resource-1/" );
						checkPrefer( request, true );
					}) );
				})();

				(() => {
					stubListRequest( "resource-2/" );

					let options:HTTP.Request.Options = { timeout: 12345 };
					let promise:Promise<[ PersistedDocument.Class[], HTTP.Response.Class ]> = documents.getMembers( "resource-2/", false, options );

					expect( promise instanceof Promise ).toBe( true );
					promises.push( promise.then( ( [ pointers, response ]:[ PersistedDocument.Class[], HTTP.Response.Class ] ) => {

						checkResponse( pointers, response );

						expect( options.timeout ).toBe( 12345 );
						expect( options.headers ).toBeDefined();

						let request:JasmineAjaxRequest = jasmine.Ajax.requests.filter( /resource-2/ )[ 0 ];
						expect( request.url ).toMatch( "resource-2/" );
						checkPrefer( request, false );
					}) );
				})();

				(() => {
					stubListRequest( "resource-3/" );

					let promise:Promise<[ PersistedDocument.Class[], HTTP.Response.Class ]> = documents.getMembers( "resource-3/", true );

					expect( promise instanceof Promise ).toBe( true );
					promises.push( promise.then( ( [ pointers, response ]:[ PersistedDocument.Class[], HTTP.Response.Class ] ) => {

						checkResponse( pointers, response );

						let request:JasmineAjaxRequest = jasmine.Ajax.requests.filter( /resource-3/ )[ 0 ];
						expect( request.url ).toMatch( "resource-3/" );
						checkPrefer( request, true );
					}) );
				})();

				(() => {
					stubListRequest( "resource-4/" );

					let promise:Promise<[ PersistedDocument.Class[], HTTP.Response.Class ]> = documents.getMembers( "resource-4/", false );

					expect( promise instanceof Promise ).toBe( true );
					promises.push( promise.then( ( [ pointers, response ]:[ PersistedDocument.Class[], HTTP.Response.Class ] ) => {

						checkResponse( pointers, response );

						let request:JasmineAjaxRequest = jasmine.Ajax.requests.filter( /resource-4/ )[ 0 ];
						expect( request.url ).toMatch( "resource-4/" );
						checkPrefer( request, false );
					}) );
				})();

				Promise.all( promises ).then( done ).catch( done.fail );
			});

			it( hasSignature(
				"Retrieves all the members of a document and their content, where you can specify the retrieval preferences and the options for the request.", [
					{ name: "uri", type: "string", description: "URI of the document from where to look for its members." },
					{ name: "retrievalPreferences", type: "Carbon.RetrievalPreferences.Class", optional: true, description: "An object for specify the retrieval preferences for the request." },
					{ name: "requestOptions", type: "Carbon.HTTP.Request.Options", optional: true, description: "Options that can be specified for change the behavior of the request." },
				],
				{ type: "Promise<[ Carbon.Pointer.Class[], Carbon.HTTP.Response.Class ]>" }
			), ( done:{ ():void, fail:() => void }) => {
				let promises:Promise<any> [] = [];

				(() => {
					stubListRequest( "resource-1/" );

					let options:HTTP.Request.Options = { timeout: 12345 };
					let retrievalPreferences:RetrievalPreferences.Class = {
						limit: 10,
						offset: 0,
						orderBy: [ { "@id": "http://example.com/ns#string", "@type": "string" } ]
					};

					let promise:Promise<[ PersistedDocument.Class[], HTTP.Response.Class ]> = documents.getMembers( "resource-1/", retrievalPreferences, options );

					expect( promise instanceof Promise ).toBe( true );
					promises.push( promise.then( ( [ pointers, response ]:[ PersistedDocument.Class[], HTTP.Response.Class ] ) => {

						checkResponse( pointers, response );

						expect( options.timeout ).toBe( 12345 );
						expect( options.headers ).toBeDefined();

						let request:JasmineAjaxRequest = jasmine.Ajax.requests.filter( /resource-1/ )[ 0 ];
						let url:string = decodeURI( request.url );
						expect( url.indexOf( "resource-1/?limit=10&offset=0&orderBy=<http://example.com/ns%23string>;<http://www.w3.org/2001/XMLSchema%23string>" ) ).not.toBe( -1 );
						checkPrefer( request );
					}) );
				})();

				(() => {
					stubListRequest( "resource-2/" );

					let retrievalPreferences:RetrievalPreferences.Class = {
						limit: 10,
						offset: 0,
						orderBy: [ { "@id": "http://example.com/ns#string", "@type": "string" } ]
					};

					let promise:Promise<[ PersistedDocument.Class[], HTTP.Response.Class ]> = documents.getMembers( "resource-2/", retrievalPreferences );

					expect( promise instanceof Promise ).toBe( true );
					promises.push( promise.then( ( [ pointers, response ]:[ PersistedDocument.Class[], HTTP.Response.Class ] ) => {

						checkResponse( pointers, response );

						let request:JasmineAjaxRequest = jasmine.Ajax.requests.filter( /resource-2/ )[ 0 ];
						let url:string = decodeURI( request.url );
						expect( url.indexOf( "resource-2/?limit=10&offset=0&orderBy=<http://example.com/ns%23string>;<http://www.w3.org/2001/XMLSchema%23string>" ) ).not.toBe( -1 );
						checkPrefer( request );
					}) );
				})();

				Promise.all( promises ).then( done ).catch( done.fail );
			});

			it( hasSignature(
				"Retrieves all the members of a document and their contents, where you can specify options for the request.", [
					{ name: "uri", type: "string", description: "URI of the document from where to look for its members." },
					{ name: "requestOptions", type: "Carbon.HTTP.Request.Options", optional: true, description: "Options that can be specified for change the behavior of the request." },
				],
				{ type: "Promise<[ Carbon.Pointer.Class[], Carbon.HTTP.Response.Class ]>" }
			), ( done:{ ():void, fail:() => void } ) => {
				let promises:Promise<any> [] = [];

				(() => {
					stubListRequest( "resource-1/" );

					let options:HTTP.Request.Options = { timeout: 12345 };
					let promise:Promise<[ PersistedDocument.Class[], HTTP.Response.Class ]> = documents.getMembers( "resource-1/", options );

					expect( promise instanceof Promise ).toBe( true );
					promises.push( promise.then( ( [ pointers, response ]:[ PersistedDocument.Class[], HTTP.Response.Class ] ) => {

						checkResponse( pointers, response );

						expect( options.timeout ).toBe( 12345 );
						expect( options.headers ).toBeDefined();

						let request:JasmineAjaxRequest = jasmine.Ajax.requests.filter( /resource-1/ )[ 0 ];
						expect( request.url ).toMatch( "resource-1/" );
						checkPrefer( request );
					}) );
				})();

				(() => {
					stubListRequest( "resource-2/" );

					let promise:Promise<[ PersistedDocument.Class[], HTTP.Response.Class ]> = documents.getMembers( "resource-2/" );

					expect( promise instanceof Promise ).toBe( true );
					promises.push( promise.then( ( [ pointers, response ]:[ PersistedDocument.Class[], HTTP.Response.Class ] ) => {

						checkResponse( pointers, response );

						let request:JasmineAjaxRequest = jasmine.Ajax.requests.filter( /resource-2/ )[ 0 ];
						expect( request.url ).toMatch( "resource-2/" );
						checkPrefer( request );
					}) );
				})();

				Promise.all( promises ).then( done ).catch( done.fail );
			});

		});

		describe( method(
			INSTANCE,
			"addMember"
		), ():void => {

			class MockedContext extends AbstractContext {
				resolve( uri:string ):string {
					return "http://example.com/" + uri;
				}
			}
			let context:MockedContext;
			let documents:Documents;

			beforeEach( ():void => {
				context = new MockedContext();
				documents = context.documents;
			});

			it( hasSignature(
				"Add a member relation to the resource Pointer in the document container specified.", [
					{ name: "documentURI", type: "string", description: "URI of the document container from where the member will be added." },
					{ name: "member", type: "Carbon.Pointer.Class", description: "Pointer object that references the resource to add as a member." },
					{ name: "requestOptions", type: "Carbon.HTTP.Request.Options", optional: true }
				],
				{ type: "Promise<Carbon.HTTP.Response>"}
			), ():void => {
				expect( documents.addMember ).toBeDefined();
				expect( Utils.isFunction( documents.addMember ) ).toBe( true );

				let spy = spyOn( documents, "addMembers" );

				let pointer:Pointer.Class = documents.getPointer( "new-member/" );
				documents.addMember( "resource/", pointer );
				expect( spy ).toHaveBeenCalledWith( "resource/", [ pointer ], {} );
			});

			it( hasSignature(
				"Add a member relation to the resource URI in the document container specified.", [
					{ name: "documentURI", type: "string", description: "URI of the document container from where the member will be added." },
					{ name: "memberURI", type: "string", description: "URI of the resource to add as a member." },
					{ name: "requestOptions", type: "Carbon.HTTP.Request.Options", optional: true }
				],
				{ type: "Promise<Carbon.HTTP.Response>"}
			), ():void => {
				expect( documents.addMember ).toBeDefined();
				expect( Utils.isFunction( documents.addMember ) ).toBe( true );

				let spy = spyOn( documents, "addMembers" );

				documents.addMember( "resource/", "new-member/" );
				expect( spy ).toHaveBeenCalledWith( "resource/", [ "new-member/" ], {} );
			});

		});

		it( hasMethod(
			INSTANCE,
			"addMembers",
			"Add a member relation to every resources URI or Pointer provided in the document container specified.", [
				{ name: "documentURI", type: "string", description: "URI of the document container from where the members will be added." },
				{ name: "members", type: "(Carbon.Pointer.Class | string)[]", description: "Array of string URIs or Pointers to add as members." },
				{ name: "requestOptions", type: "Carbon.HTTP.Request.Options", optional: true }
			],
			{ type: "Promise<Carbon.HTTP.Response>"}
		), ( done:{ ():void, fail:() => void } ):void => {
			class MockedContext extends AbstractContext {
				resolve( uri:string ):string {
					return "http://example.com/" + uri;
				}
			}
			let context:MockedContext = new MockedContext();
			let documents:Documents = context.documents;

			expect( documents.addMembers ).toBeDefined();
			expect( Utils.isFunction( documents.addMembers ) ).toBe( true );

			jasmine.Ajax.stubRequest( "http://example.com/resource/", null, "PUT" ).andReturn( {
				status: 200
			});

			let spies = {
				success: ( response:any ):void => {
					expect( response ).toBeDefined();
					expect( response instanceof HTTP.Response.Class ).toBe( true );
				},
				fail: ( error:Error ):void => {
					expect( error ).toBeDefined();
					expect( error instanceof Errors.IllegalArgumentError );
				}
			};
			let spySuccess = spyOn( spies, "success" ).and.callThrough();
			let spyFail = spyOn( spies, "fail" ).and.callThrough();

			let promises:Promise<any>[] = [];
			let promise:Promise<any>;
			let members:(Pointer.Class | string)[];

			members = [ documents.getPointer( "new-member-01/" ), "new-member-02/" ];
			promise = documents.addMembers( "resource/", members );
			expect( promise instanceof Promise ).toBe( true );
			promises.push( promise.then( spies.success ) );

			members = [ documents.getPointer( "new-member-01/" ), "new-member-02/", <any> { "something": "nor string or Pointer" } ];
			promise = documents.addMembers( "resource/", members );
			expect( promise instanceof Promise ).toBe( true );
			promises.push( promise.catch( spies.fail ) );

			Promise.all( promises ).then( ():void => {
				expect( spySuccess ).toHaveBeenCalledTimes( 1 );
				expect( spyFail ).toHaveBeenCalledTimes( 1 );
				done();
			}, done.fail );
		});

		describe( method(
			INSTANCE,
			"removeMember"
		), ():void => {

			class MockedContext extends AbstractContext {
				resolve( uri:string ):string {
					return "http://example.com/" + uri;
				}
			}
			let context:MockedContext;
			let documents:Documents;

			beforeEach( ():void => {
				context = new MockedContext();
				documents = context.documents;
			});

			it( hasSignature(
				"Remove the member relation to the Pointer provided from the resource container specified.", [
					{ name: "documentURI", type: "string", description: "URI of the resource container from where the member will be removed." },
					{ name: "member", type: "Carbon.Pointer.Class", description: "Pointer object that references the resource to remove as a member." },
					{ name: "requestOptions", type: "Carbon.HTTP.Request.Options", optional: true }
				],
				{ type: "Promise<Carbon.HTTP.Response>"}
			), ():void => {
				expect( documents.removeMember ).toBeDefined();
				expect( Utils.isFunction( documents.removeMember ) ).toBe( true );

				let spy = spyOn( documents, "removeMembers" );

				let pointer:Pointer.Class = documents.getPointer( "remove-member/" );
				documents.removeMember( "resource/", pointer );
				expect( spy ).toHaveBeenCalledWith( "resource/", [ pointer ], {} );
			});

			it( hasSignature(
				"Remove the member relation to the resource URI from the resource container specified.", [
					{ name: "documentURI", type: "string", description: "URI of the resource container from where the member will be removed." },
					{ name: "memberURI", type: "string", description: "URI of the resource to remove as a member." },
					{ name: "requestOptions", type: "Carbon.HTTP.Request.Options", optional: true }
				],
				{ type: "Promise<Carbon.HTTP.Response>"}
			), ():void => {
				expect( documents.removeMember ).toBeDefined();
				expect( Utils.isFunction( documents.removeMember ) ).toBe( true );

				let spy = spyOn( documents, "removeMembers" );

				documents.removeMember( "resource/", "remove-member/" );
				expect( spy ).toHaveBeenCalledWith( "resource/", [ "remove-member/" ], {} );
			});

		});

		it( hasMethod(
			INSTANCE,
			"removeMembers",
			"Remove the member relation to every specified resources URI or Pointer form the document container specified.", [
				{ name: "documentURI", type: "string", description: "URI of the document container from where the members will be removed." },
				{ name: "members", type: "(Carbon.Pointer.Class | string)[]", description: "Array of string URIs or Pointers to remove as members" },
				{ name: "requestOptions", type: "Carbon.HTTP.Request.Options", optional: true }
			],
			{ type: "Promise<Carbon.HTTP.Response>" }
		), ( done:{ ():void, fail:() => void } ):void => {
			class MockedContext extends AbstractContext {
				resolve( uri:string ):string {
					return "http://example.com/" + uri;
				}
			}
			let context:MockedContext = new MockedContext();
			let documents:Documents = context.documents;

			expect( documents.removeMembers ).toBeDefined();
			expect( Utils.isFunction( documents.removeMembers ) ).toBe( true );

			jasmine.Ajax.stubRequest( "http://example.com/resource/", null, "DELETE" ).andReturn( {
				status: 200
			});

			let spies = {
				success: ( response:any ):void => {
					expect( response ).toBeDefined();
					expect( response instanceof HTTP.Response.Class ).toBe( true );
				},
				fail: ( error:Error ):void => {
					expect( error ).toBeDefined();
					expect( error instanceof Errors.IllegalArgumentError ).toBe( true );
				}
			};
			let spySuccess = spyOn( spies, "success" ).and.callThrough();
			let spyFail = spyOn( spies, "fail" ).and.callThrough();

			let promises:Promise<any>[] = [];
			let promise:Promise<any>;
			let members:(Pointer.Class | string)[];

			members = [ documents.getPointer( "remove-member-01/" ), "remove-member-02/" ];
			promise = documents.removeMembers( "resource/", members );
			expect( promise instanceof Promise ).toBe( true );
			promises.push( promise.then( spies.success ) );

			members = [ documents.getPointer( "remove-member-01/" ), "remove-member-02/", <any> { "something": "nor string or Pointer" } ];
			promise = documents.removeMembers( "resource/", members );
			expect( promise instanceof Promise ).toBe( true );
			promises.push( promise.catch( spies.fail ) );

			Promise.all( promises ).then( ():void => {
				expect( spySuccess ).toHaveBeenCalledTimes( 1 );
				expect( spyFail ).toHaveBeenCalledTimes( 1 );
				done();
			}, done.fail );
		});

		it( hasMethod(
			INSTANCE,
			"removeAllMembers",
			"Remove all the member relations form the document container specified.", [
				{ name: "documentURI", type: "string", description: "URI of the document container from where the members will be removed." },
				{ name: "requestOptions", type: "Carbon.HTTP.Request.Options", optional: true }
			],
			{ type: "Promise<Carbon.HTTP.Response>"}
		), ( done:{ ():void, fail:() => void } ):void => {
			class MockedContext extends AbstractContext {
				resolve( uri:string ):string {
					return "http://example.com/" + uri;
				}
			}
			let context:MockedContext = new MockedContext();
			let documents:Documents = context.documents;

			expect( documents.removeAllMembers ).toBeDefined();
			expect( Utils.isFunction( documents.removeAllMembers ) ).toBe( true );

			jasmine.Ajax.stubRequest( "http://example.com/resource/", null, "DELETE" ).andReturn( {
				status: 200
			});

			let spies = {
				success: ( response:any ):void => {
					expect( response ).toBeDefined();
					expect( response instanceof HTTP.Response.Class ).toBe( true );
				},
				fail: ( error:Error ):void => {
					expect( error ).toBeDefined();
					expect( error instanceof Errors.IllegalArgumentError ).toBe( true );
				}
			};
			let spySuccess = spyOn( spies, "success" ).and.callThrough();
			let spyFail = spyOn( spies, "fail" ).and.callThrough();

			let promises:Promise<any>[] = [];
			let promise:Promise<any>;

			promise = documents.removeAllMembers( "resource/" );
			expect( promise instanceof Promise ).toBe( true );
			promises.push( promise.then( spies.success ) );

			Promise.all( promises ).then( ():void => {
				expect( spySuccess ).toHaveBeenCalledTimes( 1 );
				expect( spyFail ).not.toHaveBeenCalled();
				done();
			}).catch( done.fail );
		});

		it( hasMethod(
			INSTANCE,
			"refresh",
			"Update the document with the data of the CarbonLDP server, if there is a newest version.", [
				{ name: "persistedDocument", type: "Carbon.PersistedDocument.Class", description: "The persisted document to update." },
				{ name: "requestOptions", type: "Carbon.HTTP.Request.Options", optional: true }
			],
			{ type: "Promise<[ Carbon.PersistedDocument.Class, Carbon.HTTP.Response ]>" }
		), ( done:{ ():void, fail:() => void } ):void => {
		class MockedContext extends AbstractContext {
			resolve( uri:string ):string {
				return uri;
			}
		}
		let context:MockedContext = new MockedContext();
		let documents:Documents = context.documents;

			expect( documents.refresh ).toBeDefined();
			expect( Utils.isFunction( documents.refresh ) ).toBe( true );

			let objectSchema:ObjectSchema.Class = {
				"ex": "http://example.com/ns#",
				"xsd": "http://www.w3.org/2001/XMLSchema#",
				"string": {
					"@id": "ex:string",
					"@type": "xsd:string",
				},
				"date": {
					"@id": "ex:date",
					"@type": "xsd:dateTime",
				},
				"numberList": {
					"@id": "ex:numberList",
					"@type": "xsd:integer",
					"@container": "@list",
				},
				"languageMap": {
					"@id": "ex:languageMap",
					"@container": "@language",
				},
				"pointer": {
					"@id": "ex:pointer",
					"@type": "@id",
				},
				"pointerList": {
					"@id": "ex:pointerList",
					"@type": "@id",
					"@container": "@list",
				},
				"pointerSet": {
					"@id": "ex:pointerSet",
					"@type": "@id",
					"@container": "@set",
				},
			};

			context.extendObjectSchema( objectSchema );

			jasmine.Ajax.stubRequest( "http://example.com/resource/", null, "HEAD" ).andReturn( {
				status: 200,
				responseHeaders: {
					"ETag": `"0123456789"`
				}
			});
			jasmine.Ajax.stubRequest( "http://example.com/resource/", null, "GET" ).andReturn( {
				status: 200,
				responseText: `[{
					"@id": "http://example.com/resource/",
					"@graph": [
						{
							"@id": "http://example.com/resource/",
							"http://example.com/ns#string": [{ "@value": "Document Resource" }],
							"http://example.com/ns#pointer": [{ "@id": "http://example.com/resource/#1" }],
							"http://example.com/ns#pointerSet": [
								{ "@id": "_:1" },
								{ "@id": "_:2" },
								{ "@id": "http://example.com/resource/#1" },
								{ "@id": "http://example.com/external-resource/" }
							]
						},
						{
							"@id": "_:1",
							"${NS.C.Predicate.bNodeIdentifier}": "UUID fo _:1",
							"http://example.com/ns#string": [{ "@value": "Fragment 1" }],
							"http://example.com/ns#pointerSet": [
								{ "@id": "http://example.com/resource/" },
								{ "@id": "http://example.com/resource/#1" }
							]
						},
						{
							"@id": "_:2",
							"${NS.C.Predicate.bNodeIdentifier}": "UUID fo _:2",
							"http://example.com/ns#string": [{ "@value": "Fragment 2" }]
						},
						{
							"@id": "http://example.com/resource/#1",
							"http://example.com/ns#string": [{ "@value": "NamedFragment 1" }]
						},
						{
							"@id": "http://example.com/resource/#2",
							"http://example.com/ns#string": [{ "@value": "NamedFragment 2" }]
						}
					]
				}]`,
				responseHeaders: {
					"ETag": `"0123456789"`
				}
			});

			let document:PersistedDocument.Class;
			let fragment:PersistedNamedFragment.Class;
			let blankNode01:PersistedBlankNode.Class;
			let blankNode02:PersistedBlankNode.Class;

			let promises:Promise<any>[] = [];

			let spies = {
				init: ( [ persistedDoc, response ]:[ PersistedDocument.Class, HTTP.Response.Class ] ):any => {
					document = persistedDoc;
					fragment = persistedDoc.getNamedFragment( "#1" );
					blankNode01 = <PersistedBlankNode.Class> persistedDoc.getFragment( "_:1" );
					blankNode02 = <PersistedBlankNode.Class> persistedDoc.getFragment( "_:2" );

					expect( document[ "string" ] ).toBe( "Document Resource" );
					expect( fragment[ "string" ] ).toBe( "NamedFragment 1" );
					expect( document[ "pointer" ] ).toBe( fragment );
					expect( blankNode01[ "string" ] ).toBe( "Fragment 1" );
					expect( blankNode02[ "string" ] ).toBe( "Fragment 2" );

					document[ "new-property" ] = "A new property that will be erased at refresh";

					let promise:Promise<any> = documents.refresh( document );
					expect( promise instanceof Promise ).toBe( true );

					return promise.then( spies.same );
				},
				same: ( [ persistedDoc, response ]:[ PersistedDocument.Class, HTTP.Response.Class ] ):any => {
					expect( persistedDoc ).toBe( document );
					expect( response ).toBeNull();

					jasmine.Ajax.stubRequest( "http://example.com/resource/", null, "HEAD" ).andReturn( {
						status: 200,
						responseHeaders: {
							"ETag": `"dif0123456789"`
						}
					});
					jasmine.Ajax.stubRequest( "http://example.com/resource/", null, "GET" ).andReturn( {
						status: 200,
						responseText: `[{
							"@id": "http://example.com/resource/",
							"@graph": [
								{
									"@id": "http://example.com/resource/",
									"http://example.com/ns#string": [{ "@value": "Changed Document Resource" }],
									"http://example.com/ns#pointer": [{ "@id": "_:0001" }],
									"http://example.com/ns#pointerSet": [
										{ "@id": "_:0001" },
										{ "@id": "_:2" },
										{ "@id": "http://example.com/resource/#1" },
										{ "@id": "http://example.com/external-resource/" }
									]
								},
								{
									"@id": "_:0001",
									"${NS.C.Predicate.bNodeIdentifier}": "UUID fo _:1",
									"http://example.com/ns#string": [{ "@value": "Changed Fragment 1" }],
									"http://example.com/ns#pointerSet": [
										{ "@id": "http://example.com/resource/" },
										{ "@id": "http://example.com/resource/#1" }
									]
								},
								{
									"@id": "_:2",
									"${NS.C.Predicate.bNodeIdentifier}": "NOT the UUID fo _:2",
									"http://example.com/ns#string": [{ "@value": "Fragment 2" }]
								},
								{
									"@id": "http://example.com/resource/#1",
									"http://example.com/ns#string": [{ "@value": "Changed NamedFragment 1" }]
								},
								{
									"@id": "http://example.com/resource/#3",
									"http://example.com/ns#string": [{ "@value": "NamedFragment 3" }]
								}
							]
						}]`,
						responseHeaders: {
							"ETag": `"dif0123456789"`
						}
					});

					let promise:Promise<any> = documents.refresh( document );
					expect( promise instanceof Promise ).toBe( true );

					return promise.then( spies.success );
				},
				success: ( [ persistedDoc, response ]:[ PersistedDocument.Class, HTTP.Response.Class ] ):any => {
					expect( persistedDoc ).toBe( document );
					expect( document[ "string" ] ).toBe( "Changed Document Resource" );
					expect( fragment[ "string" ] ).toBe( "Changed NamedFragment 1" );

					expect( document[ "pointer" ] ).toBe( blankNode01 );
					expect( document[ "pointer" ][ "string" ] ).toBe( "Changed Fragment 1" );
					expect( blankNode01[ "string"] ).toBe( "Changed Fragment 1" );
					expect( blankNode01.id ).toBe( "_:0001" );
					expect( blankNode01 ).toBe( document.getFragment( "_:0001" ) );
					expect( document[ "pointerSet" ][ 0 ] ).toBe( blankNode01 );
					expect( document.hasFragment( "_:1") ).toBe( false );

					expect( blankNode02.id ).toBe( "_:2" );
					expect( blankNode02.id ).not.toBe( document.getFragment( "_:2" ) );
					expect( document[ "pointerSet" ][ 1 ] ).not.toBe( blankNode02 );

					expect( document.hasFragment( "#2" ) ).toBe( false );
					expect( document.hasFragment( "#3" ) ).toBe( true );

					expect( document[ "new-property" ] ).toBeUndefined();

					expect( response ).toBeDefined();
					expect( response instanceof HTTP.Response.Class ).toBe( true );
				}
			};

			let spySuccess = spyOn( spies, "success" ).and.callThrough();
			let spySame = spyOn( spies, "same" ).and.callThrough();

			let promise:Promise<any> = documents.get( "http://example.com/resource/" );
			expect( promise instanceof Promise ).toBe( true );
			promises.push( promise.then( spies.init ) );

			Promise.all( promises ).then( ():void => {
				expect( spySame ).toHaveBeenCalledTimes( 1 );
				expect( spySuccess ).toHaveBeenCalledTimes( 1 );
				done();
			}).catch( done.fail );
		});

		it( hasMethod(
			INSTANCE,
			"delete",
			"Delete the resource in the CarbonLDP server referred by the URI provided.", [
				{ name: "documentURI", type: "string", description: "The resource to delete from the server." },
				{ name: "requestOptions", type: "Carbon.HTTP.Request.Options", optional: true }
			],
			{ type: "Promise<Carbon.HTTP.Response.Class>" }
		), ( done:{ ():void, fail:() => void } ):void => {
			class MockedContext extends AbstractContext {
				resolve( uri:string ):string {
					return uri;
				}
			}

			let context:MockedContext = new MockedContext();
			let documents:Documents = context.documents;

			expect( documents.delete ).toBeDefined();
			expect( Utils.isFunction( documents.delete ) ).toBe( true );

			jasmine.Ajax.stubRequest( "http://example.com/resource/", null, "DELETE" ).andReturn( {
				status: 200
			});

			let spies = {
				success: ( response:any ):void => {
					expect( response ).toBeDefined();
					expect( response instanceof HTTP.Response.Class ).toBe( true );
				}
			};
			let spySuccess = spyOn( spies, "success" ).and.callThrough();

			let promise:Promise<any> = documents.delete( "http://example.com/resource/" ).then( spies.success );

			Promise.all( [ promise ] ).then( ():void => {
				expect( spySuccess ).toHaveBeenCalled();
				done();
			}, done.fail );
		});

		it( hasMethod( INSTANCE, "executeRawASKQuery", `
				Executes an ASK query on a document and returns a raw application/sparql-results+json object
			`, [
			{ name: "documentURI", type: "string" },
			{ name: "askQuery", type: "string" },
			{ name: "requestOptions", type: "Carbon.HTTP.Request.Options", optional: true },
		], { type: "Promise<[ Carbon.SPARQL.RawResults.Class, Carbon.HTTP.Response.Class ]>" } ), ():void => {
			class MockedContext extends AbstractContext {
				resolve( uri:string ):string {
					return uri;
				}
			}

			let context:MockedContext = new MockedContext();
			let documents:Documents = context.documents;

			// Property Integrity
			(() => {
				expect( "executeRawASKQuery" in documents ).toEqual( true );
				expect( Utils.isFunction( documents.executeRawASKQuery ) ).toEqual( true );
			})();

			// Proper execution
			(() => {
				spyOn( SPARQL.Service, "executeRawASKQuery" );

				documents.executeRawASKQuery( "http://example.com/document/", "ASK { ?subject, ?predicate, ?object }" );

				// TODO: Test authentication and relative URIs check

				expect( SPARQL.Service.executeRawASKQuery ).toHaveBeenCalled();
			})();
		});
		it( hasMethod( INSTANCE, "executeRawSELECTQuery", `Executes a SELECT query on a document and returns a raw application/sparql-results+json object`, [
			{ name: "documentURI", type: "string" },
			{ name: "selectQuery", type: "string" },
			{ name: "requestOptions", type: "Carbon.HTTP.Request.Options", optional: true },
		], { type: "Promise<[ Carbon.SPARQL.RawResults.Class, Carbon.HTTP.Response.Class ]>" } ), ():void => {
			class MockedContext extends AbstractContext {
				resolve( uri:string ):string {
					return uri;
				}
			}

			let context:MockedContext = new MockedContext();
			let documents:Documents = context.documents;

			// Property Integrity
			(() => {
				expect( "executeRawSELECTQuery" in documents ).toEqual( true );
				expect( Utils.isFunction( documents.executeRawSELECTQuery ) ).toEqual( true );
			})();

			// Proper execution
			(() => {
				spyOn( SPARQL.Service, "executeRawSELECTQuery" );

				documents.executeRawSELECTQuery( "http://example.com/document/", "SELECT ?book ?title WHERE { <http://example.com/some-document/> ?book ?title }" );

				// TODO: Test authentication and relative URIs check

				expect( SPARQL.Service.executeRawSELECTQuery ).toHaveBeenCalled();
			})();
		});

		it( hasMethod( INSTANCE, "executeRawCONSTRUCTQuery", `
				Executes a CONSTRUCT query on a document and returns a string with the resulting model
			`, [
			{ name: "documentURI", type: "string" },
			{ name: "constructQuery", type: "string" },
			{ name: "requestOptions", type: "Carbon.HTTP.Request.Options", optional: true },
		], { type: "Promise<[ string, Carbon.HTTP.Response.Class ]>" } ), ():void => {
			class MockedContext extends AbstractContext {
				resolve( uri:string ):string {
					return uri;
				}
			}

			let context:MockedContext = new MockedContext();
			let documents:Documents = context.documents;

			// Property Integrity
			(() => {
				expect( "executeRawCONSTRUCTQuery" in documents ).toEqual( true );
				expect( Utils.isFunction( documents.executeRawCONSTRUCTQuery ) ).toEqual( true );
			})();

			// Proper execution
			(() => {
				spyOn( SPARQL.Service, "executeRawCONSTRUCTQuery" );

				documents.executeRawCONSTRUCTQuery( "http://example.com/document/", "CONSTRUCT { ?subject ?predicate ?object } WHERE { ?subject ?predicate ?object }" );

				// TODO: Test authentication and relative URIs check

				expect( SPARQL.Service.executeRawCONSTRUCTQuery ).toHaveBeenCalled();
			})();
		});

		it( hasMethod( INSTANCE, "executeRawDESCRIBEQuery", `
				Executes a DESCRIBE Query and returns a string with the resulting model
			`, [
			{ name: "documentURI", type: "string" },
			{ name: "describeQuery", type: "string" },
			{ name: "requestOptions", type: "Carbon.HTTP.Request.Options", optional: true },
		], { type: "Promise<[ string, Carbon.HTTP.Response.Class ]>" } ), ():void => {
			class MockedContext extends AbstractContext {
				resolve( uri:string ):string {
					return uri;
				}
			}

			let context:MockedContext = new MockedContext();
			let documents:Documents = context.documents;

			// Property Integrity
			(() => {
				expect( "executeRawDESCRIBEQuery" in documents ).toEqual( true );
				expect( Utils.isFunction( documents.executeRawDESCRIBEQuery ) ).toEqual( true );
			})();

			// Proper execution
			(() => {
				spyOn( SPARQL.Service, "executeRawDESCRIBEQuery" );

				documents.executeRawDESCRIBEQuery( "http://example.com/document/", "DESCRIBE { ?subject ?predicate ?object } WHERE { ?subject ?predicate ?object }" );

				// TODO: Test authentication and relative URIs check

				expect( SPARQL.Service.executeRawDESCRIBEQuery ).toHaveBeenCalled();
			})();
		});

	});

});

