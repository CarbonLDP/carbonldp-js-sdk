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
import * as SPARQL from "./SPARQL";
import * as Utils from "./Utils";
import * as Pointer from "./Pointer";

// TODO: Add description
describe( module( "Carbon/Documents", "" ), ():void => {

	beforeEach( ():void => {
		jasmine.Ajax.install();
	} );

	afterEach( ():void => {
		jasmine.Ajax.uninstall();
	} );

	it( isDefined(), ():void => {
		expect( Documents ).toBeDefined();
	});

	it( hasMethod( INSTANCE, "get", [
		{ name: "uri", type: "string" }
	], { type: "Promise<[ Carbon.PersistedDocument.Class, HTTP.Response.Class ]>"}), ( done:(() => void) & { fail:( error?:any ) => void } ):void => {
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
		"Returns a Promise with a boolean indicating if the resource exists or not.", [
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
			"Create a child document for the respective parent source.", [
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
			"Create a child document for the respective parent source.", [
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
			"Create a child document for the respective parent source.", [
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
			"Create a child document for the respective parent source.", [
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
		"getChildren",
		"Return all the children of the container specified.", [
			{ name: "parentURI", type: "string", description: "URI of the document container to look for their children." },
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

		expect( documents.getChildren ).toBeDefined();
		expect( Utils.isFunction( documents.getChildren ) ).toBe( true );

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

		promise = documents.getChildren( "resource/" );
		expect( promise instanceof Promise ).toBe( true );
		promises.push( promise.then( spies.success ) );

		promise = documents.getChildren( "empty-resource/" );
		expect( promise instanceof Promise ).toBe( true );
		promises.push( promise.then( spies.successEmpty ) );

		promise = documents.getChildren( "another-empty-resource/" );
		expect( promise instanceof Promise ).toBe( true );
		promises.push( promise.then( spies.successEmpty ) );

		promise = documents.getChildren( "another-another-empty-resource/" );
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
		"createAccessPoint"
	), ():void => {

		it( hasSignature(
			"Create an AccessPoint of the document.", [
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

			let blob:Blob = new Blob( [ JSON.stringify( { "some content": "for the blob." } ) ], { type : "application/json" } );

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
			"Create an AccessPoint of the document.", [
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

			let blob:Blob = new Blob( [ JSON.stringify( { "some content": "for the blob." } ) ], { type : "application/json" } );

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
			"Upload a File to the server, creating a child for the parent specified.", [
				{ name: "parentURI", type: "string" },
				{ name: "blob", type: "Blob" },
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
		});

		it( hasSignature(
			"Upload a File to the server, creating a child for the parent specified.", [
				{ name: "parentURI", type: "string" },
				{ name: "slug", type: "string" },
				{ name: "blob", type: "Blob" },
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

			promises.push( documents.upload( "http://example.com/parent-resource/", 'slug-id', blob ).then( spy.success ) );

			Promise.all( promises ).then( ():void => {
				expect( spySuccess ).toHaveBeenCalled();
				done();
			}, done.fail );
		});

	});

	describe( method( INSTANCE, "getMembers", "Retrieves (but doesn't resolve) all the members of the document" ), () => {
		it( isDefined(), () => {
			class MockedContext extends AbstractContext {
				resolve( uri:string ):string {
					return uri;
				}
			}

			let context:MockedContext = new MockedContext();
			let documents:Documents = context.documents;

			// Property Integrity
			(() => {
				expect( "getMembers" in documents ).toEqual( true );
				expect( Utils.isFunction( documents.getMembers ) ).toEqual( true );
			})();
		});

		it( hasSignature( "", [
			{ name: "uri", type: "string" },
			{ name: "includeNonReadable", type: "boolean" },
			{ name: "requestOptions", type: "Carbon.HTTP.Request.Options", optional: true },
		], { type: "Promise<[ Carbon.Pointer.Class[], Carbon.HTTP.Response.Class[] ]>" } ), () => {
			// TODO
		});
		it( hasSignature( "", [
			{ name: "uri", type: "string" },
			{ name: "includeNonReadable", type: "boolean", optional: true },
		], { type: "Promise<[ Carbon.Pointer.Class[], Carbon.HTTP.Response.Class[] ]>" } ), () => {
			// TODO
		});
		it( hasSignature( "", [
			{ name: "uri", type: "string" },
			{ name: "requestOptions", type: "Carbon.HTTP.Request.Options", optional: true },
		], { type: "Promise<[ Carbon.Pointer.Class[], Carbon.HTTP.Response.Class[] ]>" } ), () => {
			// TODO
		});
		it( hasSignature( "", [
			{ name: "uri", type: "string" },
		], { type: "Promise<[ Carbon.Pointer.Class[], Carbon.HTTP.Response.Class[] ]>" } ), () => {
			// TODO
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
			"Add the specified resource Pointer as a member of the document container specified.", [
				{ name: "documentURI", type: "string", description: "URI of the document container where to add the member." },
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
			"Add the specified resource URI as a member of the document container specified.", [
				{ name: "documentURI", type: "string", description: "URI of the document container where to add the member." },
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
		"Add the specified resources URI or Pointers as members of the document container specified.", [
			{ name: "documentURI", type: "string", description: "URI of the document container where to add the members." },
			{ name: "members", type: "(Carbon.Pointer.Class | string)[]", description: "Array of string URIs or Pointers to add as members" },
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
			"Remove the specified resource Pointer member of the resource container specified.", [
				{ name: "documentURI", type: "string", description: "URI of the resource container where to remove the member." },
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
			"Remove the specified resource URI member of the resource container specified.", [
				{ name: "documentURI", type: "string", description: "URI of the resource container where to remove the member." },
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
		"Remove the specified resources URI or Pointers as members of the document container specified.", [
			{ name: "documentURI", type: "string", description: "URI of the document container where to remove the members." },
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
		"Remove all the members of the document container specified.", [
			{ name: "documentURI", type: "string", description: "URI of the document container where to remove the members." },
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
		"Update the document with the data of the server, if there is a diferent version on it.", [
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
		"Delete a the Resource referred by a PersistedDocument from the server.", [
			{ name: "documentURI", type: "string" },
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
