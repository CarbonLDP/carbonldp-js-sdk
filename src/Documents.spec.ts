import {
	INSTANCE,

	module,

	clazz,
	method,

	isDefined,
	hasConstructor,
	hasMethod,
	hasSignature,
	hasProperty,
} from "./test/JasmineExtender";

import AbstractContext from "./AbstractContext";
import * as AccessPoint from "./AccessPoint";
import * as Document from "./Document";
import Documents from "./Documents";
import * as Errors from "./Errors";
import * as Fragment from "./Fragment";
import * as JSONLDConverter from "./JSONLDConverter";
import * as HTTP from "./HTTP";
import * as NS from "./NS";
import * as ObjectSchema from "./ObjectSchema";
import * as PersistedBlankNode from "./PersistedBlankNode";
import * as PersistedDocument from "./PersistedDocument";
import * as PersistedNamedFragment from "./PersistedNamedFragment";
import * as Pointer from "./Pointer";
import * as RetrievalPreferences from "./RetrievalPreferences";
import * as SPARQL from "./SPARQL";
import * as Utils from "./Utils";

describe( module( "Carbon/Documents" ), ():void => {

	describe( clazz( "Carbon.Documents", "Class that contains methods for retrieving, saving and updating documents from the CarbonLDP server." ), ():void => {

		beforeEach( ():void => {
			jasmine.Ajax.install();
		} );

		afterEach( ():void => {
			jasmine.Ajax.uninstall();
		} );

		it( isDefined(), ():void => {
			expect( Documents ).toBeDefined();
			expect( Utils.isFunction( Documents ) ).toBe( true );
		} );

		it( hasConstructor( [
			{name: "context", type: "Carbon.Context", optional: true, description: "The context where the documents instance will live. If no context is provided, calling its methods with relative URIs will throw an error, since there will be no form to resolve them."}
		] ), ():void => {
			class MockedContext extends AbstractContext {
				resolve( uri:string ):string {
					return uri;
				}
			}

			let context:MockedContext = new MockedContext();

			let documents:Documents = new Documents( context );
			expect( documents ).toBeTruthy();
			expect( documents instanceof Documents ).toBe( true );

			documents = new Documents();
			expect( documents ).toBeTruthy();
			expect( documents instanceof Documents ).toBe( true );
		} );

		it( hasProperty(
			INSTANCE,
			"jsonldConverter",
			"Carbon.JSONLDConverter.Class",
			"Instance of `Carbon.JSONLDConverter.Class` that is used to compact retrieved documents and to expand documents to persist. This property is not writable."
		), ():void => {
			class MockedContext extends AbstractContext {
				resolve( uri:string ):string {
					return uri;
				}
			}

			let context:MockedContext = new MockedContext();
			let documents:Documents = context.documents;

			expect( documents.jsonldConverter ).toBeDefined();
			expect( documents.jsonldConverter instanceof JSONLDConverter.Class ).toBe( true );
		} );

		describe( method(
			INSTANCE,
			"inScope"
		), ():void => {

			it( isDefined(), ():void => {
				class MockedContext extends AbstractContext {
					resolve( uri:string ):string {
						return uri;
					}
				}

				let context:MockedContext = new MockedContext();
				let documents:Documents = context.documents;

				expect( documents.inScope ).toBeDefined();
				expect( Utils.isFunction( documents.inScope ) ).toBe( true );
			} );

			it( hasSignature(
				"Returns true if the pointer provided is inside the scope of the Documents instance.", [
					{name: "pointer", type: "Carbon.Pointer.Class", description: "Pointer to evaluate."}
				],
				{type: "boolean"}
			), ():void => {
				class MockedContext extends AbstractContext {
					resolve( uri:string ):string {
						return "http://example.com/" + uri;
					}
				}

				let context:MockedContext = new MockedContext();
				let documents:Documents = context.documents;

				let pointer:Pointer.Class;

				pointer = Pointer.Factory.create( "http://example.com/document/child/" );
				expect( documents.inScope( pointer ) ).toBe( true );
				pointer = Pointer.Factory.create( "http://example.com/another-document/" );
				expect( documents.inScope( pointer ) ).toBe( true );
				pointer = Pointer.Factory.create( "http://example.com/document/" );
				expect( documents.inScope( pointer ) ).toBe( true );
				pointer = Pointer.Factory.create( "a-relative-document/" );
				expect( documents.inScope( pointer ) ).toBe( true );

				pointer = Pointer.Factory.create( "http://example.com/document/#fragment" );
				expect( documents.inScope( pointer ) ).toBe( true );
				pointer = Pointer.Factory.create( "http://example.com/document/#another-fragment" );
				expect( documents.inScope( pointer ) ).toBe( true );

				pointer = Pointer.Factory.create( "_:BlankNode" );
				expect( documents.inScope( pointer ) ).toBe( false );

				// Asks to context.parentContext.documents
				pointer = Pointer.Factory.create( "http://example.org/document/" );
				expect( documents.inScope( pointer ) ).toBe( true );
			} );

			it( hasSignature(
				"Returns true if the URI provided is inside the scope of the Documents instance.", [
					{name: "id", type: "string", description: "URI to evaluate."}
				],
				{type: "boolean"}
			), ():void => {
				class MockedContext extends AbstractContext {
					resolve( uri:string ):string {
						return "http://example.com/" + uri;
					}
				}

				let context:MockedContext = new MockedContext();
				let documents:Documents = context.documents;

				expect( documents.inScope( "http://example.com/document/" ) ).toBe( true );
				expect( documents.inScope( "http://example.com/document/child/" ) ).toBe( true );
				expect( documents.inScope( "http://example.com/another-document/" ) ).toBe( true );
				expect( documents.inScope( "a-relative-document/" ) ).toBe( true );

				expect( documents.inScope( "http://example.com/document/#fragment" ) ).toBe( true );
				expect( documents.inScope( "http://example.com/document/#another-fragment" ) ).toBe( true );

				expect( documents.inScope( "_:BlankNode" ) ).toBe( false );

				// Asks to context.parentContext.documents
				expect( documents.inScope( "http://example.org/document/" ) ).toBe( true );
			} );

		} );

		it( hasMethod(
			INSTANCE,
			"hasPointer",
			"Returns true if the Documents instance has a pointer referenced by the URI provided.", [
				{name: "id", type: "string", description: "URI to look for."}
			],
			{type: "boolean"}
		), ():void => {
			let context:MockedContext;
			let documents:Documents;

			class MockedContext extends AbstractContext {
				resolve( uri:string ):string {
					return "http://example.com/" + uri;
				}
			}
			context = new MockedContext();
			documents = context.documents;

			expect( documents.hasPointer ).toBeDefined();
			expect( Utils.isFunction( documents.hasPointer ) ).toBe( true );

			expect( documents.hasPointer( "http://example.com/document/" ) ).toBe( false );
			expect( documents.hasPointer( "document/" ) ).toBe( false );
			expect( documents.hasPointer( "http://example.com/document/#fragment" ) ).toBe( false );
			expect( documents.hasPointer( "http://example.com/another-document/" ) ).toBe( false );

			expect( () => documents.hasPointer( "_:BlankNode" ) ).toThrowError( Errors.IllegalArgumentError );

			context = new MockedContext();
			documents = context.documents;
			( <any> documents).pointers.set( "document/", Pointer.Factory.create( "http://example.com/document/" ) );
			expect( documents.hasPointer( "http://example.com/document/" ) ).toBe( true );
			expect( documents.hasPointer( "http://example.com/document/#fragment" ) ).toBe( false );
			expect( documents.hasPointer( "document/" ) ).toBe( true );

			expect( documents.hasPointer( "http://example.com/another-document/" ) ).toBe( false );

			( <any> documents).pointers.set( "document/", Pointer.Factory.create( "http://example.com/document/" ) );
			( <any> documents).pointers.set( "another-document/", Pointer.Factory.create( "http://example.com/another-document/" ) );
			expect( documents.hasPointer( "http://example.com/document/" ) ).toBe( true );
			expect( documents.hasPointer( "document/" ) ).toBe( true );
			expect( documents.hasPointer( "http://example.com/another-document/" ) ).toBe( true );
		} );

		it( hasMethod(
			INSTANCE,
			"getPointer",
			"Returns the pointer referenced by the URI provided. If no pointer exists, one is created and then returned.\n" +
			"Returns `null` if the URI is outside the scope of the Documents instance.", [
				{name: "id", type: "string", description: "URI to look for."}
			],
			{type: "boolean"}
		), ():void => {
			let context:MockedContext;
			let documents:Documents;

			class MockedContext extends AbstractContext {
				resolve( uri:string ):string {
					return "http://example.com/" + uri;
				}
			}
			context = new MockedContext();
			documents = context.documents;

			expect( documents.getPointer ).toBeDefined();
			expect( Utils.isFunction( documents.getPointer ) ).toBe( true );

			let pointer:Pointer.Class;

			pointer = documents.getPointer( "http://example.com/document/" );
			expect( Pointer.Factory.is( pointer ) ).toBe( true );
			expect( pointer.id ).toBe( "http://example.com/document/" );

			pointer = documents.getPointer( "document/" );
			expect( Pointer.Factory.is( pointer ) ).toBe( true );
			expect( pointer.id ).toBe( "http://example.com/document/" );

			pointer = documents.getPointer( "http://example.com/document/#fragment" );
			expect( Pointer.Factory.is( pointer ) ).toBe( true );
			expect( pointer.id ).toBe( "http://example.com/document/#fragment" );

			pointer = documents.getPointer( "http://example.com/another-document/" );
			expect( Pointer.Factory.is( pointer ) ).toBe( true );
			expect( pointer.id ).toBe( "http://example.com/another-document/" );

			// Asks to context.parentContext.documents
			pointer = documents.getPointer( "http://example.org/document/" );
			expect( Pointer.Factory.is( pointer ) ).toBe( true );
			expect( pointer.id ).toBe( "http://example.org/document/" );

			expect( () => documents.getPointer( "_:BlankNode" ) ).toThrowError( Errors.IllegalArgumentError );

			let anotherPointer:Pointer.Class = Pointer.Factory.create( "http://example.com/document/" );
			context = new MockedContext();
			documents = context.documents;
			( <any> documents).pointers.set( "document/", anotherPointer );
			pointer = documents.getPointer( "http://example.com/document/" );
			expect( pointer ).toBe( anotherPointer );
			pointer = documents.getPointer( "document/" );
			expect( pointer ).toBe( anotherPointer );
		} );

		it( hasMethod(
			INSTANCE,
			"get",
			"Retrieves the Carbon Document referred by the URI specified from the CarbonLDP server.", [
				{name: "uri", type: "string", description: "The URI of the document to retrieve."},
				{name: "requestOptions", type: "Carbon.HTTP.Request.Options", optional: true, description: "Customizable options for the request."},
			],
			{type: "Promise<[ Carbon.PersistedDocument.Class, HTTP.Response.Class ]>"}
		), ( done:(() => void) & { fail:( error?:any ) => void } ):void => {
			let promises:Promise<any>[] = [];

			class MockedContext extends AbstractContext {
				resolve( uri:string ):string {
					return uri;
				}
			}

			let context:MockedContext = new MockedContext();
			let documents:Documents = context.documents;

			let responseBody:string = JSON.stringify( {
				"@id": "http://example.com/resource/",
				"@graph": [
					{
						"@id": "http://example.com/resource/",
						"http://example.com/ns#string": [ {"@value": "Document Resource"} ],
						"http://example.com/ns#pointerSet": [
							{"@id": "_:1"},
							{"@id": "_:2"},
							{"@id": "http://example.com/resource/#1"},
							{"@id": "http://example.com/external-resource/"},
						],
					},
					{
						"@id": "_:1",
						"http://example.com/ns#string": [ {"@value": "Fragment 1"} ],
						"http://example.com/ns#pointerSet": [
							{"@id": "http://example.com/resource/"},
							{"@id": "http://example.com/resource/#1"},
						],
					},
					{
						"@id": "_:2",
						"http://example.com/ns#string": [ {"@value": "Fragment 2"} ],
					},
					{
						"@id": "http://example.com/resource/#1",
						"http://example.com/ns#string": [ {"@value": "NamedFragment 1"} ],
					},
					{
						"@id": "http://example.com/resource/#2",
						"http://example.com/ns#string": [ {"@value": "NamedFragment 2"} ],
					},
				],
			} );

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

				expect( document[ "string" ] ).toBe( "Document Resource" );

				(function documentResource() {
					expect( document[ "pointerSet" ].length ).toBe( 4 );
					expect( Pointer.Util.getIDs( document[ "pointerSet" ] ) ).toContain( "_:1" );
					expect( Pointer.Util.getIDs( document[ "pointerSet" ] ) ).toContain( "_:2" );
					expect( Pointer.Util.getIDs( document[ "pointerSet" ] ) ).toContain( "http://example.com/resource/#1" );
					expect( Pointer.Util.getIDs( document[ "pointerSet" ] ) ).toContain( "http://example.com/external-resource/" );
				})();

				(function documentFragments() {

					let fragment:Fragment.Class;
					expect( document.getFragments().length ).toBe( 4 );

					(function documentBlankNode_1() {
						fragment = document.getFragment( "_:1" );
						expect( fragment ).toBeTruthy();
						expect( fragment[ "string" ] ).toBe( "Fragment 1" );
						expect( fragment[ "pointerSet" ].length ).toBe( 2 );
						expect( Pointer.Util.getIDs( fragment[ "pointerSet" ] ) ).toContain( "http://example.com/resource/" );
						expect( Pointer.Util.getIDs( fragment[ "pointerSet" ] ) ).toContain( "http://example.com/resource/#1" );
						expect( fragment[ "pointerSet" ].find( pointer => pointer.id === "http://example.com/resource/" ) ).toBe( document );
						expect( fragment[ "pointerSet" ].find( pointer => pointer.id === "http://example.com/resource/#1" ) ).toBe( document.getFragment( "1" ) );
					})();

					(function documentBlankNode_2() {
						fragment = document.getFragment( "_:2" );
						expect( fragment ).toBeTruthy();
						expect( fragment[ "string" ] ).toBe( "Fragment 2" );
					})();

					(function documentNamedFragment_1() {
						fragment = document.getFragment( "1" );
						expect( fragment ).toBeTruthy();
						expect( fragment[ "string" ] ).toBe( "NamedFragment 1" );
					})();

					(function documentNamedFragment_1() {
						fragment = document.getFragment( "2" );
						expect( fragment ).toBeTruthy();
						expect( fragment[ "string" ] ).toBe( "NamedFragment 2" );
					})();

				})();

			} ) );

			Promise.all( promises ).then( ():void => {
				done();
			}, ( error:Error ):void => {
				error = ! ! error ? error : new Error( "Unknown error" );
				done.fail( error );
			} );
		} );

		it( hasMethod(
			INSTANCE,
			"exists",
			"Retrieves a boolean indicating if the resource exists or not in the CarbonLDP server.", [
				{name: "documentURI", type: "string", description: "The URI to verify if it exists."},
				{name: "requestOptions", type: "Carbon.HTTP.Request.Options", optional: true, description: "Customizable options for the request."},
			],
			{type: "Promise<[ boolean, Carbon.HTTP.Response.Class ]>"}
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
					expect( response instanceof HTTP.Response.Class ).toBe( true );
				},
				notExists: ( [ exists, response ]:[ boolean, HTTP.Response.Class ] ):void => {
					expect( exists ).toBe( false );
					expect( response instanceof HTTP.Response.Class ).toBe( true );
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
			} );
			jasmine.Ajax.stubRequest( "http://example.com/resource/not-exists/", null, "HEAD" ).andReturn( {
				status: 404
			} );
			jasmine.Ajax.stubRequest( "http://example.com/resource/error/", null, "HEAD" ).andReturn( {
				status: 500
			} );

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
		} );

		describe( method(
			INSTANCE,
			"createChild"
		), ():void => {

			it( hasSignature(
				"Persists a child document for the respective parent source.", [
					{name: "parentURI", type: "string", description: "URI of the document where to create a new child."},
					{name: "childDocument", type: "Carbon.Document.Class", description: "Document to persists as a new child."},
					{name: "requestOptions", type: "Carbon.HTTP.Request.Options", optional: true, description: "Customizable options for the request."},
				],
				{type: "Promise<[Carbon.Pointer.Class, Carbon.HTTP.Response.Class]>"}
			), ( done:(() => void) & { fail:( error?:any ) => void } ):void => {
				let promises:Promise<any>[] = [];

				class MockedContext extends AbstractContext {
					resolve( uri:string ):string {
						return "http://example.com/" + uri;
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

				promises.push( documents.createChild( "parent-resource/", childDocument ).then( ( [ pointer, response ]:[ Pointer.Class, HTTP.Response.Class ] ):void => {
					expect( response ).toBeDefined();
					expect( response instanceof HTTP.Response.Class ).toBe( true );

					expect( pointer ).toBeDefined();
					expect( Pointer.Factory.is( pointer ) ).toBe( true );
					expect( pointer.id ).toBe( "http://example.com/parent-resource/new-resource/" );
					expect( pointer.isResolved() ).toBe( false );
				} ) );

				Promise.all( promises ).then( ():void => {
					done();
				}, ( error:Error ):void => {
					error = ! ! error ? error : new Error( "Unknown error" );
					done.fail( error );
				} );
			} );

			it( hasSignature(
				"Persists a child document for the respective parent source.", [
					{name: "parentURI", type: "string", description: "URI of the document where to create a new child."},
					{name: "slug", type: "string", description: "Slug that will be used for the URI of the new child."},
					{name: "childDocument", type: "Carbon.Document.Class", description: "Document to persists as a new child."},
					{name: "requestOptions", type: "Carbon.HTTP.Request.Options", optional: true, description: "Customizable options for the request."},
				],
				{type: "Promise<[Carbon.Pointer.Class, Carbon.HTTP.Response.Class]>"}
			), ( done:(() => void) & { fail:( error?:any ) => void } ):void => {
				let promises:Promise<any>[] = [];

				class MockedContext extends AbstractContext {
					resolve( uri:string ):string {
						return "http://example.com/" + uri;
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

				promises.push( documents.createChild( "parent-resource/", "child-document", childDocument ).then( ( [ pointer, response ]:[ Pointer.Class, HTTP.Response.Class ] ):void => {
					expect( response ).toBeDefined();
					expect( response instanceof HTTP.Response.Class ).toBe( true );

					expect( pointer ).toBeDefined();
					expect( Pointer.Factory.is( pointer ) ).toBe( true );
					expect( pointer.id ).toBe( "http://example.com/parent-resource/new-resource/" );
					expect( pointer.isResolved() ).toBe( false );
				} ) );

				Promise.all( promises ).then( ():void => {
					done();
				}, ( error:Error ):void => {
					error = ! ! error ? error : new Error( "Unknown error" );
					done.fail( error );
				} );
			} );

			it( hasSignature(
				"Persists JavaScript object as a child document for the respective parent source.", [
					{name: "parentURI", type: "string", description: "URI of the document where to create a new child."},
					{name: "childObject", type: "Object", description: "A normal JavaScript object that will be converted and persisted as a new child document."},
					{name: "requestOptions", type: "Carbon.HTTP.Request.Options", optional: true, description: "Customizable options for the request."},
				],
				{type: "Promise<[Carbon.Pointer.Class, Carbon.HTTP.Response.Class]>"}
			), ( done:(() => void) & { fail:( error?:any ) => void } ):void => {
				let promises:Promise<any>[] = [];

				class MockedContext extends AbstractContext {
					resolve( uri:string ):string {
						return "http://example.com/" + uri;
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

				promises.push( documents.createChild( "parent-resource/", childObject ).then( ( [ pointer, response ]:[ Pointer.Class, HTTP.Response.Class ] ):void => {
					expect( response ).toBeDefined();
					expect( response instanceof HTTP.Response.Class ).toBe( true );

					expect( pointer ).toBeDefined();
					expect( Pointer.Factory.is( pointer ) ).toBe( true );
					expect( pointer.id ).toBe( "http://example.com/parent-resource/new-resource/" );
					expect( pointer.isResolved() ).toBe( false );
				} ) );

				Promise.all( promises ).then( ():void => {
					done();
				}, ( error:Error ):void => {
					error = ! ! error ? error : new Error( "Unknown error" );
					done.fail( error );
				} );
			} );

			it( hasSignature(
				"Persists JavaScript object as a child document for the respective parent source.", [
					{name: "parentURI", type: "string", description: "URI of the document where to create a new child."},
					{name: "slug", type: "string", description: "Slug that will be used for the URI of the new child."},
					{name: "childObject", type: "Object", description: "A normal JavaScript object that will be converted and persisted as a new child document."},
					{name: "requestOptions", type: "Carbon.HTTP.Request.Options", optional: true, description: "Customizable options for the request."},
				],
				{type: "Promise<[Carbon.Pointer.Class, Carbon.HTTP.Response.Class]>"}
			), ( done:(() => void) & { fail:( error?:any ) => void } ):void => {
				let promises:Promise<any>[] = [];

				class MockedContext extends AbstractContext {
					resolve( uri:string ):string {
						return "http://example.com/" + uri;
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

				promises.push( documents.createChild( "parent-resource/", "child-document", childObject ).then( ( [ pointer, response ]:[ Pointer.Class, HTTP.Response.Class ] ):void => {
					expect( response ).toBeDefined();
					expect( response instanceof HTTP.Response.Class ).toBe( true );

					expect( pointer ).toBeDefined();
					expect( Pointer.Factory.is( pointer ) ).toBe( true );
					expect( pointer.id ).toBe( "http://example.com/parent-resource/new-resource/" );
					expect( pointer.isResolved() ).toBe( false );
				} ) );

				Promise.all( promises ).then( ():void => {
					done();
				}, ( error:Error ):void => {
					error = ! ! error ? error : new Error( "Unknown error" );
					done.fail( error );
				} );
			} );
		} );

		it( hasMethod(
			INSTANCE,
			"listChildren",
			"Retrieves an array of unresolved pointers that refers to the children of the container specified.", [
				{name: "parentURI", type: "string", description: "URI of the document container where to look for its children."},
				{name: "requestOptions", type: "Carbon.HTTP.Request.Options", optional: true, description: "Customizable options for the request."}
			],
			{type: "Promise<[ Carbon.Pointer.Class[], Carbon.HTTP.Response ]>"}
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
			} );
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
			} );
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
			} );
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
			} );

			let spies = {
				success: ( [ pointers, response ]:[ Pointer.Class[], HTTP.Response.Class ] ):void => {
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
				successEmpty: ( [ pointers, response ]:[ Pointer.Class[], HTTP.Response.Class ] ):void => {
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
			} ).catch( done.fail );
		} );

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
				context.extendObjectSchema( {
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
				} );

				documents = context.documents;
			} );

			it( isDefined(), () => {
				expect( documents.getChildren ).toBeDefined();
				expect( Utils.isFunction( documents.getChildren ) ).toBe( true );
			} );

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
							"@id": "http://example.com/${ resource }",
							"@graph": [{
								"@id": "http://example.com/${ resource }",
								"@type": [ "http://www.w3.org/ns/ldp#BasicContainer" ],
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
				} );
			}

			function checkResponse( resource:string, pointers:PersistedDocument.Class[], response:HTTP.Response.Class ):void {
				expect( documents.hasPointer( resource ) ).toBe( false );
				expect( (<any> documents).pointers.size ).toBe( 2 );

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

				for( let index:number = 0, length:number = types.length; index < length; ++ index ) {
					let preferType:string = `return=representation; ${ types[ index ] }=`;
					let prefersValues:HTTP.Header.Class = new HTTP.Header.Class( request.requestHeaders[ "prefer" ] );
					let preferInclude:HTTP.Header.Value = prefersValues.values.find( ( value:HTTP.Header.Value ) => {
						return value.toString().startsWith( preferType );
					} );
					prefers[ index ] = preferInclude.toString().substring( preferType.length + 1, preferInclude.toString().length - 1 ).split( " " );
				}
				return prefers;
			}

			function checkPrefer( request:JasmineAjaxRequest ) {
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
				"Retrieves an array of resolved Documents that refers all children of the container specified, or a part of them in accordance to the retrieval preferences specified.", [
					{name: "parentURI", type: "string", description: "URI of the document from where to look for its children."},
					{name: "retrievalPreferences", type: "Carbon.RetrievalPreferences.Class", optional: true, description: "An object that specify the retrieval preferences for the request."},
					{name: "requestOptions", type: "Carbon.HTTP.Request.Options", optional: true, description: "Customizable options for the request."},
				],
				{type: "Promise<[ Carbon.PersistedDocument.Class[], Carbon.HTTP.Response.Class ]>"}
			), ( done:{ ():void, fail:() => void } ) => {
				let promises:Promise<any> [] = [];

				(() => {
					stubListRequest( "resource-1/" );

					let options:HTTP.Request.Options = {timeout: 12345};
					let retrievalPreferences:RetrievalPreferences.Class = {
						limit: 10,
						offset: 0,
						orderBy: [ {"@id": "http://example.com/ns#string", "@type": "string"} ]
					};

					let promise:Promise<[ PersistedDocument.Class[], HTTP.Response.Class ]> = documents.getChildren( "resource-1/", retrievalPreferences, options );

					expect( promise instanceof Promise ).toBe( true );
					promises.push( promise.then( ( [ pointers, response ]:[ PersistedDocument.Class[], HTTP.Response.Class ] ) => {

						checkResponse( "resource-1/", pointers, response );

						expect( options.timeout ).toBe( 12345 );
						expect( options.headers ).toBeDefined();

						let request:JasmineAjaxRequest = jasmine.Ajax.requests.filter( /resource-1/ )[ 0 ];
						let url:string = decodeURI( request.url );
						expect( url.indexOf( "resource-1/?limit=10&offset=0&orderBy=<http://example.com/ns%23string>;<http://www.w3.org/2001/XMLSchema%23string>" ) ).not.toBe( - 1 );
						checkPrefer( request );
					} ) );
				})();

				(() => {
					stubListRequest( "resource-2/" );

					let retrievalPreferences:RetrievalPreferences.Class = {
						limit: 10,
						offset: 0,
						orderBy: [ {"@id": "http://example.com/ns#string", "@type": "string"} ]
					};

					let promise:Promise<[ PersistedDocument.Class[], HTTP.Response.Class ]> = documents.getChildren( "resource-2/", retrievalPreferences );

					expect( promise instanceof Promise ).toBe( true );
					promises.push( promise.then( ( [ pointers, response ]:[ PersistedDocument.Class[], HTTP.Response.Class ] ) => {

						checkResponse( "resource-2/", pointers, response );

						let request:JasmineAjaxRequest = jasmine.Ajax.requests.filter( /resource-2/ )[ 0 ];
						let url:string = decodeURI( request.url );
						expect( url.indexOf( "resource-2/?limit=10&offset=0&orderBy=<http://example.com/ns%23string>;<http://www.w3.org/2001/XMLSchema%23string>" ) ).not.toBe( - 1 );
						checkPrefer( request );
					} ) );
				})();

				(() => {
					jasmine.Ajax.stubRequest( new RegExp( "resource-3/" ), null, "GET" ).andReturn( {
						status: 200,
						responseText: `[]`
					} );

					let retrievalPreferences:RetrievalPreferences.Class = {
						limit: 10,
						offset: 0,
						orderBy: [ {"@id": "http://example.com/ns#string", "@type": "string"} ]
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
						expect( url.indexOf( "resource-3/?limit=10&offset=0&orderBy=<http://example.com/ns%23string>;<http://www.w3.org/2001/XMLSchema%23string>" ) ).not.toBe( - 1 );
						checkPrefer( request );
					} ) );
				})();

				(() => {
					jasmine.Ajax.stubRequest( new RegExp( "resource-4/" ), null, "GET" ).andReturn( {
						status: 200,
						responseText: `{}`
					} );

					let retrievalPreferences:RetrievalPreferences.Class = {
						limit: 10,
						offset: 0,
						orderBy: [ {"@id": "http://example.com/ns#string", "@type": "string"} ]
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
						expect( url.indexOf( "resource-4/?limit=10&offset=0&orderBy=<http://example.com/ns%23string>;<http://www.w3.org/2001/XMLSchema%23string>" ) ).not.toBe( - 1 );
						checkPrefer( request );
					} ) );
				})();

				Promise.all( promises ).then( done ).catch( done.fail );
			} );

			it( hasSignature(
				"Retrieves an array of resolved Documents that refers all children of the container specified.", [
					{name: "parentURI", type: "string", description: "URI of the document from where to look for its children."},
					{name: "requestOptions", type: "Carbon.HTTP.Request.Options", optional: true, description: "Customizable options for the request."},
				],
				{type: "Promise<[ Carbon.PersistedDocument.Class[], Carbon.HTTP.Response.Class ]>"}
			), ( done:{ ():void, fail:() => void } ) => {
				let promises:Promise<any> [] = [];

				(() => {
					stubListRequest( "resource-1/" );

					let options:HTTP.Request.Options = {timeout: 12345};
					let promise:Promise<[ PersistedDocument.Class[], HTTP.Response.Class ]> = documents.getChildren( "resource-1/", options );

					expect( promise instanceof Promise ).toBe( true );
					promises.push( promise.then( ( [ pointers, response ]:[ PersistedDocument.Class[], HTTP.Response.Class ] ) => {

						checkResponse( "resource-1/", pointers, response );

						expect( options.timeout ).toBe( 12345 );
						expect( options.headers ).toBeDefined();

						let request:JasmineAjaxRequest = jasmine.Ajax.requests.filter( /resource-1/ )[ 0 ];
						expect( request.url ).toMatch( "resource-1/" );
						checkPrefer( request );
					} ) );
				})();

				(() => {
					stubListRequest( "resource-2/" );

					let promise:Promise<[ PersistedDocument.Class[], HTTP.Response.Class ]> = documents.getChildren( "resource-2/" );

					expect( promise instanceof Promise ).toBe( true );
					promises.push( promise.then( ( [ pointers, response ]:[ PersistedDocument.Class[], HTTP.Response.Class ] ) => {

						checkResponse( "resource-2/", pointers, response );

						let request:JasmineAjaxRequest = jasmine.Ajax.requests.filter( /resource-2/ )[ 0 ];
						expect( request.url ).toMatch( "resource-2/" );
						checkPrefer( request );
					} ) );
				})();

				(() => {
					jasmine.Ajax.stubRequest( new RegExp( "resource-3/" ), null, "GET" ).andReturn( {
						status: 200,
						responseText: `[]`
					} );

					let promise:Promise<[ PersistedDocument.Class[], HTTP.Response.Class ]> = documents.getChildren( "resource-3/" );

					expect( promise instanceof Promise ).toBe( true );
					promises.push( promise.then( ( [ pointers, response ]:[ PersistedDocument.Class[], HTTP.Response.Class ] ) => {

						expect( pointers ).toBeDefined();
						expect( Utils.isArray( pointers ) ).toBeDefined();
						expect( pointers.length ).toBe( 0 );

						expect( response ).toBeDefined();

						let request:JasmineAjaxRequest = jasmine.Ajax.requests.filter( /resource-3/ )[ 0 ];
						expect( request.url.indexOf( "resource-3/" ) ).not.toBe( - 1 );
						checkPrefer( request );
					} ) );
				})();

				(() => {
					jasmine.Ajax.stubRequest( new RegExp( "resource-4/" ), null, "GET" ).andReturn( {
						status: 200,
						responseText: `{}`
					} );

					let promise:Promise<[ PersistedDocument.Class[], HTTP.Response.Class ]> = documents.getChildren( "resource-4/" );

					expect( promise instanceof Promise ).toBe( true );
					promises.push( promise.then( ( [ pointers, response ]:[ PersistedDocument.Class[], HTTP.Response.Class ] ) => {

						expect( pointers ).toBeDefined();
						expect( Utils.isArray( pointers ) ).toBeDefined();
						expect( pointers.length ).toBe( 0 );

						expect( response ).toBeDefined();

						let request:JasmineAjaxRequest = jasmine.Ajax.requests.filter( /resource-4/ )[ 0 ];
						expect( request.url.indexOf( "resource-4/" ) ).not.toBe( - 1 );
						checkPrefer( request );
					} ) );
				})();

				Promise.all( promises ).then( done ).catch( done.fail );
			} );

		} );

		describe( method(
			INSTANCE,
			"createAccessPoint"
		), ():void => {

			it( hasSignature(
				"Persists an AccessPoint in the document specified.", [
					{name: "documentURI", type: "string", description: "URI of the document where to create a new access point."},
					{name: "accessPoint", type: "Carbon.AccessPoint.Class", description: "AccessPoint Document to persist."},
					{name: "slug", type: "string", optional: true, description: "Slug that will be used for the URI of the new access point."},
					{name: "requestOptions", type: "Carbon.HTTP.Request.Options", optional: true, description: "Customizable options for the request."},
				],
				{type: "Promise<[Carbon.Pointer.Class, Carbon.HTTP.Response.Class]>"}
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
						expect( response instanceof HTTP.Response.Class ).toBe( true );
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

				let membershipResource:Pointer.Class = Pointer.Factory.create( "http://example.com/parent-resource/" );
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
			} );

			it( hasSignature(
				"Persists an AccessPoint in the document specified.", [
					{name: "accessPoint", type: "Carbon.AccessPoint.Class", description: "AccessPoint Document to persist."},
					{name: "slug", type: "string", optional: true, description: "Slug that will be used for the URI of the new access point."},
					{name: "requestOptions", type: "Carbon.HTTP.Request.Options", optional: true, description: "Customizable options for the request."},
				],
				{type: "Promise<[Carbon.Pointer.Class, Carbon.HTTP.Response.Class]>"}
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
						expect( response instanceof HTTP.Response.Class ).toBe( true );
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

				let membershipResource:Pointer.Class = Pointer.Factory.create( "http://example.com/parent-resource/" );
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
			} );
		} );

		describe( method(
			INSTANCE,
			"upload"
		), ():void => {

			it( hasSignature(
				"Upload binary data, creating a child for the parent specified. This signature only works in a web browser.", [
					{name: "parentURI", type: "string", description: "URI of the document where to upload the new binary data child."},
					{name: "data", type: "Blob", description: "Blob of the binary data to upload."},
					{name: "requestOptions", type: "Carbon.HTTP.Request.Options", optional: true, description: "Customizable options for the request."},
				],
				{type: "Promise<[Carbon.Pointer.Class, Carbon.HTTP.Response.Class]>"}
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

				if( typeof Blob !== "undefined" ) {

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

					let blob:Blob = new Blob( [ JSON.stringify( {"some content": "for the blob."} ) ], {type: "application/json"} );

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
			} );

			it( hasSignature(
				"Upload binary data, creating a child for the parent specified. This signature only works in a web browser.", [
					{name: "parentURI", type: "string", description: "URI of the document where to upload the new binary data child."},
					{name: "slug", type: "string", description: "Slug that will be used for the URI of the new binary child."},
					{name: "data", type: "Blob", description: "Blob of the binary data to upload."},
					{name: "requestOptions", type: "Carbon.HTTP.Request.Options", optional: true, description: "Customizable options for the request."},
				],
				{type: "Promise<[Carbon.Pointer.Class, Carbon.HTTP.Response.Class]>"}
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

				if( typeof Blob !== "undefined" ) {

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

					let blob:Blob = new Blob( [ JSON.stringify( {"some content": "for the blob."} ) ], {type: "application/json"} );

					jasmine.Ajax.stubRequest( "http://example.com/parent-resource/", null, "POST" ).andReturn( {
						status: 200,
						responseHeaders: {
							"Location": "http://example.com/parent-resource/slug-id/",
						},
					} );

					promises.push( documents.upload( "http://example.com/parent-resource/", "slug-id", blob ).then( spy.success ) );

					Promise.all( promises ).then( ():void => {
						expect( spySuccess ).toHaveBeenCalled();
						done();
					}, done.fail );

				} else { done(); }
			} );

			it( hasSignature(
				"Upload binary data, creating a child for the parent specified. This signature only works in Node.js.", [
					{name: "parentURI", type: "string", description: "URI of the document where to upload the new binary data child."},
					{name: "data", type: "Buffer", description: "Buffer of the binary data to upload."},
					{name: "requestOptions", type: "Carbon.HTTP.Request.Options", optional: true, description: "Customizable options for the request."},
				],
				{type: "Promise<[Carbon.Pointer.Class, Carbon.HTTP.Response.Class]>"}
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

				if( typeof Buffer !== "undefined" ) {

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

					let buffer:Buffer = new Buffer( JSON.stringify( {"some content": "for the buffer."} ) );

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
			} );

			it( hasSignature(
				"Upload binary data, creating a child for the parent specified. This signature only works in Node.js.", [
					{name: "parentURI", type: "string", description: "URI of the document where to upload the new binary data child."},
					{name: "slug", type: "string", description: "Slug that will be used fot he URI of the new binary child."},
					{name: "data", type: "Buffer", description: "Buffer of the binary data to upload."},
					{name: "requestOptions", type: "Carbon.HTTP.Request.Options", optional: true, description: "Customizable options for the request."},
				],
				{type: "Promise<[Carbon.Pointer.Class, Carbon.HTTP.Response.Class]>"}
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

				if( typeof Buffer !== "undefined" ) {

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

					let buffer:Buffer = new Buffer( JSON.stringify( {"some content": "for the buffer."} ) );

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
			} );

		} );

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
			} );

			it( isDefined(), () => {
				expect( documents.listMembers ).toBeDefined();
				expect( Utils.isFunction( documents.listMembers ) ).toBe( true );
			} );

			it( hasSignature(
				"Retrieves all the members of a document without resolving them.", [
					{name: "uri", type: "string", description: "URI of the document from where to look for its members."},
					{name: "includeNonReadable", type: "boolean", optional: true, description: "Specify if the response should include the Non Readable resources. By default this is set to `true`."},
					{name: "requestOptions", type: "Carbon.HTTP.Request.Options", optional: true, description: "Customizable options for the request."},
				],
				{type: "Promise<[ Carbon.Pointer.Class[], Carbon.HTTP.Response.Class ]>"}
			), ( done:{ ():void, fail:() => void } ) => {
				let promises:Promise<any> [] = [];

				(() => {
					stubListRequest( "resource-1/" );

					let options:HTTP.Request.Options = {timeout: 12345};
					let promise:Promise<[ Pointer.Class[], HTTP.Response.Class ]> = documents.listMembers( "resource-1/", true, options );

					expect( promise instanceof Promise ).toBe( true );
					promises.push( promise.then( ( [ pointers, response ]:[ Pointer.Class[], HTTP.Response.Class ] ) => {

						checkResponse( "resource-1/", pointers, response );

						expect( options.timeout ).toBe( 12345 );
						expect( options.headers ).toBeDefined();

						let request:JasmineAjaxRequest = jasmine.Ajax.requests.filter( /resource-1/ )[ 0 ];
						expect( request.url ).toMatch( "resource-1/" );
						checkPrefer( request, "include" );
					} ) );
				})();

				(() => {
					stubListRequest( "resource-2/" );

					let options:HTTP.Request.Options = {timeout: 12345};
					let promise:Promise<[ Pointer.Class[], HTTP.Response.Class ]> = documents.listMembers( "resource-2/", false, options );

					expect( promise instanceof Promise ).toBe( true );
					promises.push( promise.then( ( [ pointers, response ]:[ Pointer.Class[], HTTP.Response.Class ] ) => {

						checkResponse( "resource-2/", pointers, response );

						expect( options.timeout ).toBe( 12345 );
						expect( options.headers ).toBeDefined();

						let request:JasmineAjaxRequest = jasmine.Ajax.requests.filter( /resource-2/ )[ 0 ];
						expect( request.url ).toMatch( "resource-2/" );
						checkPrefer( request, "omit" );
					} ) );
				})();

				(() => {
					stubListRequest( "resource-3/" );

					let promise:Promise<[ Pointer.Class[], HTTP.Response.Class ]> = documents.listMembers( "resource-3/", true );

					expect( promise instanceof Promise ).toBe( true );
					promises.push( promise.then( ( [ pointers, response ]:[ Pointer.Class[], HTTP.Response.Class ] ) => {

						checkResponse( "resource-3/", pointers, response );

						let request:JasmineAjaxRequest = jasmine.Ajax.requests.filter( /resource-3/ )[ 0 ];
						expect( request.url ).toMatch( "resource-3/" );
						checkPrefer( request, "include" );
					} ) );
				})();

				(() => {
					stubListRequest( "resource-4/" );

					let promise:Promise<[ Pointer.Class[], HTTP.Response.Class ]> = documents.listMembers( "resource-4/", false );

					expect( promise instanceof Promise ).toBe( true );
					promises.push( promise.then( ( [ pointers, response ]:[ Pointer.Class[], HTTP.Response.Class ] ) => {

						checkResponse( "resource-4/", pointers, response );

						let request:JasmineAjaxRequest = jasmine.Ajax.requests.filter( /resource-4/ )[ 0 ];
						expect( request.url ).toMatch( "resource-4/" );
						checkPrefer( request, "omit" );
					} ) );
				})();

				(() => {
					stubListRequest( "resource-5/" );

					let promise:Promise<[ Pointer.Class[], HTTP.Response.Class ]> = documents.listMembers( "resource-5/" );

					expect( promise instanceof Promise ).toBe( true );
					promises.push( promise.then( ( [ pointers, response ]:[ Pointer.Class[], HTTP.Response.Class ] ) => {

						checkResponse( "resource-5/", pointers, response );

						let request:JasmineAjaxRequest = jasmine.Ajax.requests.filter( /resource-5/ )[ 0 ];
						expect( request.url ).toMatch( "resource-5/" );
						checkPrefer( request, "include" );
					} ) );
				})();

				Promise.all( promises ).then( done ).catch( done.fail );
			} );

			it( hasSignature(
				"Retrieves all the members of a document without resolving them.", [
					{name: "uri", type: "string", description: "URI of the document from where to look for its members."},
					{name: "requestOptions", type: "Carbon.HTTP.Request.Options", optional: true, description: "Customizable options for the request."},
				],
				{type: "Promise<[ Carbon.Pointer.Class[], Carbon.HTTP.Response.Class ]>"}
			), ( done:{ ():void, fail:() => void } ) => {
				let promises:Promise<any> [] = [];

				(() => {
					stubListRequest( "resource-1/" );

					let options:HTTP.Request.Options = {timeout: 12345};
					let promise:Promise<[ Pointer.Class[], HTTP.Response.Class ]> = documents.listMembers( "resource-1/", options );

					expect( promise instanceof Promise ).toBe( true );
					promises.push( promise.then( ( [ pointers, response ]:[ Pointer.Class[], HTTP.Response.Class ] ) => {

						checkResponse( "resource-1/", pointers, response );

						expect( options.timeout ).toBe( 12345 );
						expect( options.headers ).toBeDefined();

						let request:JasmineAjaxRequest = jasmine.Ajax.requests.filter( /resource-1/ )[ 0 ];
						expect( request.url ).toMatch( "resource-1/" );
						checkPrefer( request, "include" );
					} ) );
				})();

				(() => {
					stubListRequest( "resource-2/" );

					let promise:Promise<[ Pointer.Class[], HTTP.Response.Class ]> = documents.listMembers( "resource-2/" );

					expect( promise instanceof Promise ).toBe( true );
					promises.push( promise.then( ( [ pointers, response ]:[ Pointer.Class[], HTTP.Response.Class ] ) => {

						checkResponse( "resource-2/", pointers, response );

						let request:JasmineAjaxRequest = jasmine.Ajax.requests.filter( /resource-2/ )[ 0 ];
						expect( request.url ).toMatch( "resource-2/" );
						checkPrefer( request, "include" );
					} ) );
				})();

				Promise.all( promises ).then( done ).catch( done.fail );
			} );

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
				} );
			}

			function checkResponse( resource:string, pointers:Pointer.Class[], response:HTTP.Response.Class ):void {
				expect( (<any> documents).pointers.size ).toBe( 3 );
				expect( documents.hasPointer( resource ) ).toBe( false );

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
				} );
				let includes:string[] = preferInclude.toString().substring( prefer.length, preferInclude.toString().length - 1 ).split( " " );
				expect( includes ).toContain( NS.C.Class.NonReadableMembershipResourceTriples );
			}

		} );

		describe( method( INSTANCE, "getMembers", "Retrieves and resolve all the members of a specified document." ), () => {
			let documents:Documents;

			beforeEach( () => {
				class MockedContext extends AbstractContext {
					resolve( uri:string ):string {
						return "http://example.com/" + uri;
					}
				}

				let context:MockedContext = new MockedContext();
				context.extendObjectSchema( {
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
				} );

				documents = context.documents;
			} );

			it( isDefined(), () => {
				expect( documents.getMembers ).toBeDefined();
				expect( Utils.isFunction( documents.getMembers ) ).toBe( true );
			} );

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
				} );
			}

			function checkResponse( resource:string, pointers:PersistedDocument.Class[], response:HTTP.Response.Class ):void {
				expect( documents.hasPointer( resource ) ).toBe( false );
				expect( (<any> documents).pointers.size ).toBe( 2 );

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

				for( let index:number = 0, length:number = types.length; index < length; ++ index ) {
					let preferType:string = `return=representation; ${ types[ index ] }=`;
					let prefersValues:HTTP.Header.Class = new HTTP.Header.Class( request.requestHeaders[ "prefer" ] );
					let preferInclude:HTTP.Header.Value = prefersValues.values.find( ( value:HTTP.Header.Value ) => {
						return value.toString().startsWith( preferType );
					} );
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

				if( nonReadable ) {
					expect( includes ).toContain( NS.C.Class.NonReadableMembershipResourceTriples );
				} else {
					expect( omits ).toContain( NS.C.Class.NonReadableMembershipResourceTriples );
				}
			}

			it( hasSignature(
				"Retrieves all the members of a document and their contents, or a part of them in accordance to the retrieval preferences specified.", [
					{name: "uri", type: "string", description: "URI of the document from where to look for its members."},
					{name: "includeNonReadable", type: "boolean", optional: true, description: "Specify if the response should include the Non Readable resources. By default this is set to `true`."},
					{name: "retrievalPreferences", type: "Carbon.RetrievalPreferences.Class", optional: true, description: "An object to specify the retrieval preferences for the request."},
					{name: "requestOptions", type: "Carbon.HTTP.Request.Options", optional: true, description: "Customizable options for the request."},
				],
				{type: "Promise<[ Carbon.Pointer.Class[], Carbon.HTTP.Response.Class ]>"}
			), ( done:{ ():void, fail:() => void } ) => {
				let promises:Promise<any> [] = [];

				(() => {
					stubListRequest( "resource-1/" );

					let options:HTTP.Request.Options = {timeout: 12345};
					let retrievalPreferences:RetrievalPreferences.Class = {
						limit: 10,
						offset: 0,
						orderBy: [ {"@id": "http://example.com/ns#string", "@type": "string"} ]
					};

					let promise:Promise<[ PersistedDocument.Class[], HTTP.Response.Class ]> = documents.getMembers( "resource-1/", true, retrievalPreferences, options );

					expect( promise instanceof Promise ).toBe( true );
					promises.push( promise.then( ( [ pointers, response ]:[ PersistedDocument.Class[], HTTP.Response.Class ] ) => {

						checkResponse( "resource-1/", pointers, response );

						expect( options.timeout ).toBe( 12345 );
						expect( options.headers ).toBeDefined();

						let request:JasmineAjaxRequest = jasmine.Ajax.requests.filter( /resource-1/ )[ 0 ];
						let url:string = decodeURI( request.url );
						expect( url.indexOf( "resource-1/?limit=10&offset=0&orderBy=<http://example.com/ns%23string>;<http://www.w3.org/2001/XMLSchema%23string>" ) ).not.toBe( - 1 );
						checkPrefer( request, true );
					} ) );
				})();

				(() => {
					stubListRequest( "resource-2/" );

					let options:HTTP.Request.Options = {timeout: 12345};
					let retrievalPreferences:RetrievalPreferences.Class = {
						limit: 10,
						offset: 0,
						orderBy: [ {"@id": "http://example.com/ns#string", "@type": "string"} ]
					};

					let promise:Promise<[ PersistedDocument.Class[], HTTP.Response.Class ]> = documents.getMembers( "resource-2/", false, retrievalPreferences, options );

					expect( promise instanceof Promise ).toBe( true );
					promises.push( promise.then( ( [ pointers, response ]:[ PersistedDocument.Class[], HTTP.Response.Class ] ) => {

						checkResponse( "resource-2/", pointers, response );

						expect( options.timeout ).toBe( 12345 );
						expect( options.headers ).toBeDefined();

						let request:JasmineAjaxRequest = jasmine.Ajax.requests.filter( /resource-2/ )[ 0 ];
						let url:string = decodeURI( request.url );
						expect( url.indexOf( "resource-2/?limit=10&offset=0&orderBy=<http://example.com/ns%23string>;<http://www.w3.org/2001/XMLSchema%23string>" ) ).not.toBe( - 1 );
						checkPrefer( request, false );
					} ) );
				})();

				(() => {
					stubListRequest( "resource-3/" );

					let retrievalPreferences:RetrievalPreferences.Class = {
						limit: 10,
						offset: 0,
						orderBy: [ {"@id": "http://example.com/ns#string", "@type": "string"} ]
					};

					let promise:Promise<[ PersistedDocument.Class[], HTTP.Response.Class ]> = documents.getMembers( "resource-3/", true, retrievalPreferences );

					expect( promise instanceof Promise ).toBe( true );
					promises.push( promise.then( ( [ pointers, response ]:[ PersistedDocument.Class[], HTTP.Response.Class ] ) => {

						checkResponse( "resource-3/", pointers, response );

						let request:JasmineAjaxRequest = jasmine.Ajax.requests.filter( /resource-3/ )[ 0 ];
						let url:string = decodeURI( request.url );
						expect( url.indexOf( "resource-3/?limit=10&offset=0&orderBy=<http://example.com/ns%23string>;<http://www.w3.org/2001/XMLSchema%23string>" ) ).not.toBe( - 1 );
						checkPrefer( request, true );
					} ) );
				})();

				(() => {
					stubListRequest( "resource-4/" );

					let retrievalPreferences:RetrievalPreferences.Class = {
						limit: 10,
						offset: 0,
						orderBy: [ {"@id": "http://example.com/ns#string", "@type": "string"} ]
					};

					let promise:Promise<[ PersistedDocument.Class[], HTTP.Response.Class ]> = documents.getMembers( "resource-4/", false, retrievalPreferences );

					expect( promise instanceof Promise ).toBe( true );
					promises.push( promise.then( ( [ pointers, response ]:[ PersistedDocument.Class[], HTTP.Response.Class ] ) => {

						checkResponse( "resource-4/", pointers, response );

						let request:JasmineAjaxRequest = jasmine.Ajax.requests.filter( /resource-4/ )[ 0 ];
						let url:string = decodeURI( request.url );
						expect( url.indexOf( "resource-4/?limit=10&offset=0&orderBy=<http://example.com/ns%23string>;<http://www.w3.org/2001/XMLSchema%23string>" ) ).not.toBe( - 1 );
						checkPrefer( request, false );
					} ) );
				})();

				Promise.all( promises ).then( done ).catch( done.fail );
			} );

			it( hasSignature(
				"Retrieves all the members of a document and their contents.", [
					{name: "uri", type: "string", description: "URI of the document from where to look for its members."},
					{name: "includeNonReadable", type: "boolean", optional: true, description: "Specify if the response should include the Non Readable resources. By default this is set to `true`."},
					{name: "requestOptions", type: "Carbon.HTTP.Request.Options", optional: true, description: "Customizable options for the request."},
				],
				{type: "Promise<[ Carbon.Pointer.Class[], Carbon.HTTP.Response.Class ]>"}
			), ( done:{ ():void, fail:() => void } ) => {
				let promises:Promise<any> [] = [];

				(() => {
					stubListRequest( "resource-1/" );

					let options:HTTP.Request.Options = {timeout: 12345};
					let promise:Promise<[ PersistedDocument.Class[], HTTP.Response.Class ]> = documents.getMembers( "resource-1/", true, options );

					expect( promise instanceof Promise ).toBe( true );
					promises.push( promise.then( ( [ pointers, response ]:[ PersistedDocument.Class[], HTTP.Response.Class ] ) => {

						checkResponse( "resource-1/", pointers, response );

						expect( options.timeout ).toBe( 12345 );
						expect( options.headers ).toBeDefined();

						let request:JasmineAjaxRequest = jasmine.Ajax.requests.filter( /resource-1/ )[ 0 ];
						expect( request.url ).toMatch( "resource-1/" );
						checkPrefer( request, true );
					} ) );
				})();

				(() => {
					stubListRequest( "resource-2/" );

					let options:HTTP.Request.Options = {timeout: 12345};
					let promise:Promise<[ PersistedDocument.Class[], HTTP.Response.Class ]> = documents.getMembers( "resource-2/", false, options );

					expect( promise instanceof Promise ).toBe( true );
					promises.push( promise.then( ( [ pointers, response ]:[ PersistedDocument.Class[], HTTP.Response.Class ] ) => {

						checkResponse( "resource-2/", pointers, response );

						expect( options.timeout ).toBe( 12345 );
						expect( options.headers ).toBeDefined();

						let request:JasmineAjaxRequest = jasmine.Ajax.requests.filter( /resource-2/ )[ 0 ];
						expect( request.url ).toMatch( "resource-2/" );
						checkPrefer( request, false );
					} ) );
				})();

				(() => {
					stubListRequest( "resource-3/" );

					let promise:Promise<[ PersistedDocument.Class[], HTTP.Response.Class ]> = documents.getMembers( "resource-3/", true );

					expect( promise instanceof Promise ).toBe( true );
					promises.push( promise.then( ( [ pointers, response ]:[ PersistedDocument.Class[], HTTP.Response.Class ] ) => {

						checkResponse( "resource-3/", pointers, response );

						let request:JasmineAjaxRequest = jasmine.Ajax.requests.filter( /resource-3/ )[ 0 ];
						expect( request.url ).toMatch( "resource-3/" );
						checkPrefer( request, true );
					} ) );
				})();

				(() => {
					stubListRequest( "resource-4/" );

					let promise:Promise<[ PersistedDocument.Class[], HTTP.Response.Class ]> = documents.getMembers( "resource-4/", false );

					expect( promise instanceof Promise ).toBe( true );
					promises.push( promise.then( ( [ pointers, response ]:[ PersistedDocument.Class[], HTTP.Response.Class ] ) => {

						checkResponse( "resource-4/", pointers, response );

						let request:JasmineAjaxRequest = jasmine.Ajax.requests.filter( /resource-4/ )[ 0 ];
						expect( request.url ).toMatch( "resource-4/" );
						checkPrefer( request, false );
					} ) );
				})();

				Promise.all( promises ).then( done ).catch( done.fail );
			} );

			it( hasSignature(
				"Retrieves all the members of a document and their content, or a part of them in accordance to the retrieval preferences specified.", [
					{name: "uri", type: "string", description: "URI of the document from where to look for its members."},
					{name: "retrievalPreferences", type: "Carbon.RetrievalPreferences.Class", optional: true, description: "An object to specify the retrieval preferences for the request."},
					{name: "requestOptions", type: "Carbon.HTTP.Request.Options", optional: true, description: "Customizable options for the request."},
				],
				{type: "Promise<[ Carbon.Pointer.Class[], Carbon.HTTP.Response.Class ]>"}
			), ( done:{ ():void, fail:() => void } ) => {
				let promises:Promise<any> [] = [];

				(() => {
					stubListRequest( "resource-1/" );

					let options:HTTP.Request.Options = {timeout: 12345};
					let retrievalPreferences:RetrievalPreferences.Class = {
						limit: 10,
						offset: 0,
						orderBy: [ {"@id": "http://example.com/ns#string", "@type": "string"} ]
					};

					let promise:Promise<[ PersistedDocument.Class[], HTTP.Response.Class ]> = documents.getMembers( "resource-1/", retrievalPreferences, options );

					expect( promise instanceof Promise ).toBe( true );
					promises.push( promise.then( ( [ pointers, response ]:[ PersistedDocument.Class[], HTTP.Response.Class ] ) => {

						checkResponse( "resource-1/", pointers, response );

						expect( options.timeout ).toBe( 12345 );
						expect( options.headers ).toBeDefined();

						let request:JasmineAjaxRequest = jasmine.Ajax.requests.filter( /resource-1/ )[ 0 ];
						let url:string = decodeURI( request.url );
						expect( url.indexOf( "resource-1/?limit=10&offset=0&orderBy=<http://example.com/ns%23string>;<http://www.w3.org/2001/XMLSchema%23string>" ) ).not.toBe( - 1 );
						checkPrefer( request );
					} ) );
				})();

				(() => {
					stubListRequest( "resource-2/" );

					let retrievalPreferences:RetrievalPreferences.Class = {
						limit: 10,
						offset: 0,
						orderBy: [ {"@id": "http://example.com/ns#string", "@type": "string"} ]
					};

					let promise:Promise<[ PersistedDocument.Class[], HTTP.Response.Class ]> = documents.getMembers( "resource-2/", retrievalPreferences );

					expect( promise instanceof Promise ).toBe( true );
					promises.push( promise.then( ( [ pointers, response ]:[ PersistedDocument.Class[], HTTP.Response.Class ] ) => {

						checkResponse( "resource-2/", pointers, response );

						let request:JasmineAjaxRequest = jasmine.Ajax.requests.filter( /resource-2/ )[ 0 ];
						let url:string = decodeURI( request.url );
						expect( url.indexOf( "resource-2/?limit=10&offset=0&orderBy=<http://example.com/ns%23string>;<http://www.w3.org/2001/XMLSchema%23string>" ) ).not.toBe( - 1 );
						checkPrefer( request );
					} ) );
				})();

				Promise.all( promises ).then( done ).catch( done.fail );
			} );

			it( hasSignature(
				"Retrieves all the members of a document and their contents.", [
					{name: "uri", type: "string", description: "URI of the document from where to look for its members."},
					{name: "requestOptions", type: "Carbon.HTTP.Request.Options", optional: true, description: "Customizable options for the request."},
				],
				{type: "Promise<[ Carbon.Pointer.Class[], Carbon.HTTP.Response.Class ]>"}
			), ( done:{ ():void, fail:() => void } ) => {
				let promises:Promise<any> [] = [];

				(() => {
					stubListRequest( "resource-1/" );

					let options:HTTP.Request.Options = {timeout: 12345};
					let promise:Promise<[ PersistedDocument.Class[], HTTP.Response.Class ]> = documents.getMembers( "resource-1/", options );

					expect( promise instanceof Promise ).toBe( true );
					promises.push( promise.then( ( [ pointers, response ]:[ PersistedDocument.Class[], HTTP.Response.Class ] ) => {

						checkResponse( "resource-1/", pointers, response );

						expect( options.timeout ).toBe( 12345 );
						expect( options.headers ).toBeDefined();

						let request:JasmineAjaxRequest = jasmine.Ajax.requests.filter( /resource-1/ )[ 0 ];
						expect( request.url ).toMatch( "resource-1/" );
						checkPrefer( request );
					} ) );
				})();

				(() => {
					stubListRequest( "resource-2/" );

					let promise:Promise<[ PersistedDocument.Class[], HTTP.Response.Class ]> = documents.getMembers( "resource-2/" );

					expect( promise instanceof Promise ).toBe( true );
					promises.push( promise.then( ( [ pointers, response ]:[ PersistedDocument.Class[], HTTP.Response.Class ] ) => {

						checkResponse( "resource-2/", pointers, response );

						let request:JasmineAjaxRequest = jasmine.Ajax.requests.filter( /resource-2/ )[ 0 ];
						expect( request.url ).toMatch( "resource-2/" );
						checkPrefer( request );
					} ) );
				})();

				(() => {
					stubListRequest( "resource-3/" );

					let promise:Promise<[ PersistedDocument.Class[], HTTP.Response.Class ]> = documents.getMembers( "resource-3/" );

					expect( promise instanceof Promise ).toBe( true );
					promises.push( promise.then( ( [ pointers, response ]:[ PersistedDocument.Class[], HTTP.Response.Class ] ) => {
						expect( (<any> documents).pointers.size ).toBe( 2 );
						expect( documents.hasPointer( "resource-3/" ) ).toBe( false );
						checkResponse( "resource-3/", pointers, response );

						let request:JasmineAjaxRequest = jasmine.Ajax.requests.filter( /resource-3/ )[ 0 ];
						expect( request.url ).toMatch( "resource-3/" );
						checkPrefer( request );
					} ) );
				})();

				(() => {
					jasmine.Ajax.stubRequest( "http://example.com/resource-4/", null, "GET" ).andReturn( {
						status: 200,
						responseText: `[ {
							"@id": "http://example.com/resource-4/",
							"@graph": [{
								"@id": "http://example.com/resource-4/",
								"@type": [ "http://www.w3.org/ns/ldp#DirectContainer" ],
								"http://www.w3.org/ns/ldp#hasMemberRelation": [{
						            "@id": "http://www.w3.org/ns/ldp#my-member"
						        }],
						        "http://www.w3.org/ns/ldp#membershipResource": [{
						            "@id": "http://example.com/resource/"
						        }]
						    }]
						},
						{
							"@id": "http://example.com/resource/",
							"@graph": [{
								"@id": "http://example.com/resource/",
								"@type": [ "http://www.w3.org/ns/ldp#BasicContainer" ],
						        "http://www.w3.org/ns/ldp#my-member": [{
						            "@id": "http://example.com/resource/element-01/"
						        }, {
						            "@id": "http://example.com/resource/element-02/"
						        }]
						    }]
						},
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
						} ]`
					} );

					let promise:Promise<[ PersistedDocument.Class[], HTTP.Response.Class ]> = documents.getMembers( "resource-4/" );

					expect( promise instanceof Promise ).toBe( true );
					promises.push( promise.then( ( [ pointers, response ]:[ PersistedDocument.Class[], HTTP.Response.Class ] ) => {
						expect( documents.hasPointer( "resource/" ) ).toBe( false );
						checkResponse( "resource-4/", pointers, response );

						let request:JasmineAjaxRequest = jasmine.Ajax.requests.filter( /resource-4/ )[ 0 ];
						expect( request.url ).toMatch( "resource-4/" );
						checkPrefer( request );
					} ) );
				})();

				Promise.all( promises ).then( done ).catch( done.fail );
			} );

		} );

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
			} );

			it( hasSignature(
				"Add a member relation to the resource Pointer in the document container specified.", [
					{name: "documentURI", type: "string", description: "URI of the document container where the member will be added."},
					{name: "member", type: "Carbon.Pointer.Class", description: "Pointer object that references the resource to add as a member."},
					{name: "requestOptions", type: "Carbon.HTTP.Request.Options", optional: true, description: "Customizable options for the request."}
				],
				{type: "Promise<Carbon.HTTP.Response>"}
			), ():void => {
				expect( documents.addMember ).toBeDefined();
				expect( Utils.isFunction( documents.addMember ) ).toBe( true );

				let spy = spyOn( documents, "addMembers" );

				let pointer:Pointer.Class = documents.getPointer( "new-member/" );
				documents.addMember( "resource/", pointer );
				expect( spy ).toHaveBeenCalledWith( "resource/", [ pointer ], {} );
			} );

			it( hasSignature(
				"Add a member relation to the resource URI in the document container specified.", [
					{name: "documentURI", type: "string", description: "URI of the document container where the member will be added."},
					{name: "memberURI", type: "string", description: "URI of the resource to add as a member."},
					{name: "requestOptions", type: "Carbon.HTTP.Request.Options", optional: true, description: "Customizable options for the request."}
				],
				{type: "Promise<Carbon.HTTP.Response>"}
			), ():void => {
				expect( documents.addMember ).toBeDefined();
				expect( Utils.isFunction( documents.addMember ) ).toBe( true );

				let spy = spyOn( documents, "addMembers" );

				documents.addMember( "resource/", "new-member/" );
				expect( spy ).toHaveBeenCalledWith( "resource/", [ "new-member/" ], {} );
			} );

		} );

		it( hasMethod(
			INSTANCE,
			"addMembers",
			"Add a member relation to every resource URI or Pointer provided in the document container specified.", [
				{name: "documentURI", type: "string", description: "URI of the document container where the members will be added."},
				{name: "members", type: "(Carbon.Pointer.Class | string)[]", description: "Array of URIs or Pointers to add as members."},
				{name: "requestOptions", type: "Carbon.HTTP.Request.Options", optional: true, description: "Customizable options for the request."}
			],
			{type: "Promise<Carbon.HTTP.Response>"}
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
			} );

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

			members = [ documents.getPointer( "new-member-01/" ), "new-member-02/", <any> {"something": "nor string or Pointer"} ];
			promise = documents.addMembers( "resource/", members );
			expect( promise instanceof Promise ).toBe( true );
			promises.push( promise.catch( spies.fail ) );

			Promise.all( promises ).then( ():void => {
				expect( spySuccess ).toHaveBeenCalledTimes( 1 );
				expect( spyFail ).toHaveBeenCalledTimes( 1 );
				done();
			}, done.fail );
		} );

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
			} );

			it( hasSignature(
				"Remove the member relation between the Pointer and the resource container specified.", [
					{name: "documentURI", type: "string", description: "URI of the resource container from where the member will be removed."},
					{name: "member", type: "Carbon.Pointer.Class", description: "Pointer object that references the resource to remove as a member."},
					{name: "requestOptions", type: "Carbon.HTTP.Request.Options", optional: true, description: "Customizable options for the request."}
				],
				{type: "Promise<Carbon.HTTP.Response>"}
			), ():void => {
				expect( documents.removeMember ).toBeDefined();
				expect( Utils.isFunction( documents.removeMember ) ).toBe( true );

				let spy = spyOn( documents, "removeMembers" );

				let pointer:Pointer.Class = documents.getPointer( "remove-member/" );
				documents.removeMember( "resource/", pointer );
				expect( spy ).toHaveBeenCalledWith( "resource/", [ pointer ], {} );
			} );

			it( hasSignature(
				"Remove the member relation between the resource URI and the resource container specified.", [
					{name: "documentURI", type: "string", description: "URI of the resource container from where the member will be removed."},
					{name: "memberURI", type: "string", description: "URI of the resource to remove as a member."},
					{name: "requestOptions", type: "Carbon.HTTP.Request.Options", optional: true, description: "Customizable options for the request."}
				],
				{type: "Promise<Carbon.HTTP.Response>"}
			), ():void => {
				expect( documents.removeMember ).toBeDefined();
				expect( Utils.isFunction( documents.removeMember ) ).toBe( true );

				let spy = spyOn( documents, "removeMembers" );

				documents.removeMember( "resource/", "remove-member/" );
				expect( spy ).toHaveBeenCalledWith( "resource/", [ "remove-member/" ], {} );
			} );

		} );

		it( hasMethod(
			INSTANCE,
			"removeMembers",
			"Remove the member relation to every specified resource URI or Pointer form the document container specified.", [
				{name: "documentURI", type: "string", description: "URI of the document container where the members will be removed."},
				{name: "members", type: "(Carbon.Pointer.Class | string)[]", description: "Array of URIs or Pointers to remove as members"},
				{name: "requestOptions", type: "Carbon.HTTP.Request.Options", optional: true, description: "Customizable options for the request."}
			],
			{type: "Promise<Carbon.HTTP.Response>"}
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
			} );

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

			members = [ documents.getPointer( "remove-member-01/" ), "remove-member-02/", <any> {"something": "nor string or Pointer"} ];
			promise = documents.removeMembers( "resource/", members );
			expect( promise instanceof Promise ).toBe( true );
			promises.push( promise.catch( spies.fail ) );

			Promise.all( promises ).then( ():void => {
				expect( spySuccess ).toHaveBeenCalledTimes( 1 );
				expect( spyFail ).toHaveBeenCalledTimes( 1 );
				done();
			}, done.fail );
		} );

		it( hasMethod(
			INSTANCE,
			"removeAllMembers",
			"Remove all the member relations from the document container specified.", [
				{name: "documentURI", type: "string", description: "URI of the document container where the members will be removed."},
				{name: "requestOptions", type: "Carbon.HTTP.Request.Options", optional: true, description: "Customizable options for the request."}
			],
			{type: "Promise<Carbon.HTTP.Response>"}
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
			} );

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
			} ).catch( done.fail );
		} );

		it( hasMethod(
			INSTANCE,
			"refresh",
			"Update the specified document with the data of the CarbonLDP server, if a newest version exists.", [
				{name: "persistedDocument", type: "Carbon.PersistedDocument.Class", description: "The persisted document to update."},
				{name: "requestOptions", type: "Carbon.HTTP.Request.Options", optional: true, description: "Customizable options for the request."}
			],
			{type: "Promise<[ Carbon.PersistedDocument.Class, Carbon.HTTP.Response ]>"}
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
			} );
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
			} );

			let document:PersistedDocument.Class;
			let fragment:PersistedNamedFragment.Class;
			let blankNode01:PersistedBlankNode.Class;
			let blankNode02:PersistedBlankNode.Class;

			let promises:Promise<any>[] = [];

			let spies = {
				init: ( [ persistedDoc, response ]:[ PersistedDocument.Class, HTTP.Response.Class ] ):any => {
					expect( response instanceof HTTP.Response.Class ).toBe( true );

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
					document[ "new-pointer" ] = document.createFragment( {id: "_:new-pointer", string: "Pointer that will be erased at refresh"} );

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
					} );
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
									"@id": "_:1",
									"${NS.C.Predicate.bNodeIdentifier}": "UUID fo _:2",
									"http://example.com/ns#string": [{ "@value": "Old Fragment 2" }]
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
									"http://example.com/ns#string": [{ "@value": "New Fragment 2" }]
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
					} );

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
					expect( blankNode01[ "string" ] ).toBe( "Changed Fragment 1" );
					expect( blankNode01.id ).toBe( "_:0001" );
					expect( blankNode01 ).toBe( document.getFragment( "_:0001" ) );
					expect( document[ "pointerSet" ][ 0 ] ).toBe( blankNode01 );

					expect( blankNode02.id ).not.toBe( "_:2" );
					expect( blankNode02 ).not.toBe( document.getFragment( "_:2" ) );
					expect( document[ "pointerSet" ][ 1 ] ).not.toBe( blankNode02 );
					expect( document[ "pointerSet" ][ 1 ] ).toBe( document.getFragment( "_:2" ) );
					expect( document.getFragment( "_:2" )[ "string" ] ).toBe( "New Fragment 2" );

					expect( blankNode02.id ).toBe( "_:1" );
					expect( document.getFragment( "_:1" ) ).toBe( blankNode02 );
					expect( blankNode02[ "string" ] ).toBe( "Old Fragment 2" );

					expect( document.hasFragment( "#2" ) ).toBe( false );
					expect( document.hasFragment( "#3" ) ).toBe( true );

					expect( document[ "new-property" ] ).toBeUndefined();
					expect( document[ "new-pointer" ] ).toBeUndefined();
					expect( document.hasFragment( "_:new-pointer" ) ).toBe( false );

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
			} ).catch( done.fail );
		} );

		it( hasMethod(
			INSTANCE,
			"delete",
			"Delete the resource from the CarbonLDP server referred by the URI provided.", [
				{name: "documentURI", type: "string", description: "The resource to delete from the CarbonLDP server."},
				{name: "requestOptions", type: "Carbon.HTTP.Request.Options", optional: true, description: "Customizable options for the request."}
			],
			{type: "Promise<Carbon.HTTP.Response.Class>"}
		), ( done:{ ():void, fail:() => void } ):void => {
			class MockedContext extends AbstractContext {
				resolve( uri:string ):string {
					return "http://example.com/" + uri;
				}
			}

			let context:MockedContext = new MockedContext();
			let documents:Documents = context.documents;

			expect( documents.delete ).toBeDefined();
			expect( Utils.isFunction( documents.delete ) ).toBe( true );

			jasmine.Ajax.stubRequest( "http://example.com/resource/", null, "DELETE" ).andReturn( {
				status: 200
			} );

			let spies = {
				success: ( response:any ):void => {
					expect( response ).toBeDefined();
					expect( response instanceof HTTP.Response.Class ).toBe( true );
				}
			};
			let spySuccess = spyOn( spies, "success" ).and.callThrough();

			let promises:Promise<any>[] = [];
			let promise:Promise<any>;

			// Proper execution
			promise = documents.delete( "http://example.com/resource/" );
			expect( promise instanceof Promise ).toBe( true );
			promises.push( promise.then( spies.success ) );

			// Relative URI
			promise = documents.delete( "resource/" );
			expect( promise instanceof Promise ).toBe( true );
			promises.push( promise.then( spies.success ) );

			Promise.all( promises ).then( ():void => {
				expect( spySuccess ).toHaveBeenCalled();
				done();
			}, done.fail );
		} );

		it( hasMethod(
			INSTANCE,
			"getDownloadURL",
			"Add to the URI provided with the properties necessarily for a single download request.", [
				{name: "documentURI", type: "string", description: "The URI of the document that will be converted in a single download request."},
				{name: "requestOptions", type: "Carbon.HTTP.Request.Options", optional: true}
			],
			{type: "Promise<Carbon.HTTP.Response.Class>"}
		), ( done:{ ():void, fail:() => void } ):void => {
			class MockedContext extends AbstractContext {
				resolve( uri:string ):string {
					return uri;
				}
			}

			let context:MockedContext = new MockedContext();
			let documents:Documents = context.documents;

			expect( documents.getDownloadURL ).toBeDefined();
			expect( Utils.isFunction( documents.getDownloadURL ) ).toBe( true );

			spyOn( context.auth, "getAuthenticatedURL" ).and.returnValue( Promise.resolve( "http://example.com/resource/?ticket=1234567890" ) );

			documents.getDownloadURL( "http://example.com/resource/" ).then( ( downloadURL:string ) => {
				expect( downloadURL ).toBe( "http://example.com/resource/?ticket=1234567890" );
				done();
			} ).catch( done.fail );
		} );

		it( hasMethod( INSTANCE, "executeRawASKQuery",
			"Executes an ASK query on a document and returns a raw application/sparql-results+json object.", [
				{name: "documentURI", type: "string", description: "URI of the document that works as a SPARQL endpoint where to execute the SPARQL query."},
				{name: "askQuery", type: "string", description: "ASK query to execute in the selected endpoint."},
				{name: "requestOptions", type: "Carbon.HTTP.Request.Options", optional: true, description: "Customizable options for the request."},
			], {type: "Promise<[ Carbon.SPARQL.RawResults.Class, Carbon.HTTP.Response.Class ]>"}
		), ():void => {
			class MockedContext extends AbstractContext {
				resolve( uri:string ):string {
					return "http://example.com/" + uri;
				}
			}

			let context:MockedContext = new MockedContext();
			let documents:Documents = context.documents;

			// Property Integrity
			(() => {
				expect( "executeRawASKQuery" in documents ).toEqual( true );
				expect( Utils.isFunction( documents.executeRawASKQuery ) ).toEqual( true );
			})();

			let spyService = spyOn( SPARQL.Service, "executeRawASKQuery" );

			// Proper execution
			(function ProperExecution() {
				documents.executeRawASKQuery( "http://example.com/document/", "ASK { ?subject, ?predicate, ?object }" );

				expect( spyService ).toHaveBeenCalledWith( "http://example.com/document/", "ASK { ?subject, ?predicate, ?object }", jasmine.any( Object ) );
				spyService.calls.reset();
			})();

			// Relative URI
			(function RelativeURI() {
				documents.executeRawASKQuery( "document/", "ASK { ?subject, ?predicate, ?object }" );

				expect( spyService ).toHaveBeenCalledWith( "http://example.com/document/", "ASK { ?subject, ?predicate, ?object }", jasmine.any( Object ) );
				spyService.calls.reset();
			})();
		} );

		it( hasMethod( INSTANCE, "executeRawSELECTQuery",
			"Executes a SELECT query on a document and returns a raw application/sparql-results+json object.", [
				{name: "documentURI", type: "string", description: "URI of the document that works as a SPARQL endpoint where to execute the SPARQL query."},
				{name: "selectQuery", type: "string", description: "SELECT query to execute in the selected endpoint."},
				{name: "requestOptions", type: "Carbon.HTTP.Request.Options", optional: true, description: "Customizable options for the request."},
			], {type: "Promise<[ Carbon.SPARQL.RawResults.Class, Carbon.HTTP.Response.Class ]>"}
		), ():void => {
			class MockedContext extends AbstractContext {
				resolve( uri:string ):string {
					return "http://example.com/" + uri;
				}
			}

			let context:MockedContext = new MockedContext();
			let documents:Documents = context.documents;

			// Property Integrity
			(() => {
				expect( "executeRawSELECTQuery" in documents ).toEqual( true );
				expect( Utils.isFunction( documents.executeRawSELECTQuery ) ).toEqual( true );
			})();

			let spyService = spyOn( SPARQL.Service, "executeRawSELECTQuery" );

			// Proper execution
			(function ProperExecution() {

				documents.executeRawSELECTQuery( "http://example.com/document/", "SELECT ?book ?title WHERE { <http://example.com/some-document/> ?book ?title }" );

				expect( spyService ).toHaveBeenCalledWith( "http://example.com/document/", "SELECT ?book ?title WHERE { <http://example.com/some-document/> ?book ?title }", jasmine.any( Object ) );
				spyService.calls.reset();
			})();

			// Relative URI
			(function RelativeURI() {

				documents.executeRawSELECTQuery( "document/", "SELECT ?book ?title WHERE { <http://example.com/some-document/> ?book ?title }" );

				expect( spyService ).toHaveBeenCalledWith( "http://example.com/document/", "SELECT ?book ?title WHERE { <http://example.com/some-document/> ?book ?title }", jasmine.any( Object ) );
				spyService.calls.reset();
			})();
		} );

		it( hasMethod( INSTANCE, "executeRawCONSTRUCTQuery",
			"Executes a CONSTRUCT query on a document and returns a string with the resulting model.", [
				{name: "documentURI", type: "string", description: "URI of the document that works as a SPARQL endpoint where to execute the SPARQL query."},
				{name: "constructQuery", type: "string", description: "CONSTRUCT query to execute in the selected endpoint."},
				{name: "requestOptions", type: "Carbon.HTTP.Request.Options", optional: true, description: "Customizable options for the request."},
			], {type: "Promise<[ string, Carbon.HTTP.Response.Class ]>"}
		), ():void => {
			class MockedContext extends AbstractContext {
				resolve( uri:string ):string {
					return "http://example.com/" + uri;
				}
			}

			let context:MockedContext = new MockedContext();
			let documents:Documents = context.documents;

			// Property Integrity
			(() => {
				expect( "executeRawCONSTRUCTQuery" in documents ).toEqual( true );
				expect( Utils.isFunction( documents.executeRawCONSTRUCTQuery ) ).toEqual( true );
			})();

			let spyService = spyOn( SPARQL.Service, "executeRawCONSTRUCTQuery" );

			// Proper execution
			(function ProperExecution() {

				documents.executeRawCONSTRUCTQuery( "http://example.com/document/", "CONSTRUCT { ?subject ?predicate ?object } WHERE { ?subject ?predicate ?object }" );

				expect( spyService ).toHaveBeenCalledWith( "http://example.com/document/", "CONSTRUCT { ?subject ?predicate ?object } WHERE { ?subject ?predicate ?object }", jasmine.any( Object ) );
				spyService.calls.reset();
			})();

			// Relative URI
			(function RelativeURI() {

				documents.executeRawCONSTRUCTQuery( "document/", "CONSTRUCT { ?subject ?predicate ?object } WHERE { ?subject ?predicate ?object }" );

				expect( spyService ).toHaveBeenCalledWith( "http://example.com/document/", "CONSTRUCT { ?subject ?predicate ?object } WHERE { ?subject ?predicate ?object }", jasmine.any( Object ) );
				spyService.calls.reset();
			})();
		} );

		it( hasMethod( INSTANCE, "executeRawDESCRIBEQuery",
			"Executes a DESCRIBE query and returns a string with the resulting model.", [
				{name: "documentURI", type: "string", description: "URI of the document that works as a SPARQL endpoint where to execute the SPARQL query."},
				{name: "describeQuery", type: "string", description: "DESCRIBE query to execute in the selected endpoint."},
				{name: "requestOptions", type: "Carbon.HTTP.Request.Options", optional: true, description: "Customizable options for the request."},
			], {type: "Promise<[ string, Carbon.HTTP.Response.Class ]>"}
		), ():void => {
			class MockedContext extends AbstractContext {
				resolve( uri:string ):string {
					return "http://example.com/" + uri;
				}
			}

			let context:MockedContext = new MockedContext();
			let documents:Documents = context.documents;

			// Property Integrity
			(() => {
				expect( "executeRawDESCRIBEQuery" in documents ).toEqual( true );
				expect( Utils.isFunction( documents.executeRawDESCRIBEQuery ) ).toEqual( true );
			})();

			let spyService = spyOn( SPARQL.Service, "executeRawDESCRIBEQuery" );

			// Proper execution
			(function ProperExecution() {

				documents.executeRawDESCRIBEQuery( "http://example.com/document/", "DESCRIBE { ?subject ?predicate ?object } WHERE { ?subject ?predicate ?object }" );

				expect( spyService ).toHaveBeenCalledWith( "http://example.com/document/", "DESCRIBE { ?subject ?predicate ?object } WHERE { ?subject ?predicate ?object }", jasmine.any( Object ) );
				spyService.calls.reset();
			})();

			// Relative URI
			(function RelativeURI() {

				documents.executeRawDESCRIBEQuery( "document/", "DESCRIBE { ?subject ?predicate ?object } WHERE { ?subject ?predicate ?object }" );

				expect( spyService ).toHaveBeenCalledWith( "http://example.com/document/", "DESCRIBE { ?subject ?predicate ?object } WHERE { ?subject ?predicate ?object }", jasmine.any( Object ) );
				spyService.calls.reset();
			})();
		} );

	} );

} );

