/// <reference path="./../typings/typings.d.ts" />

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
import * as Document from "./Document";
import Documents from "./Documents";
import * as Fragment from "./Fragment";
import * as HTTP from "./HTTP";
import * as PersistedDocument from "./PersistedDocument";
import * as ObjectSchema from "./ObjectSchema";
import * as SPARQL from "./SPARQL";
import * as Utils from "./Utils";

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

	it( hasMethod( INSTANCE, "createChild", [
		{ name: "parentURI", type: "string" },
		{ name: "childDocument", type: "Carbon.Document.Class" },
	], { type:"Promise<HTTP.Response.Class>"}), ( done:(() => void) & { fail:( error?:any ) => void } ):void => {
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
