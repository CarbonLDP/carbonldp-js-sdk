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
import Pointer from "./Pointer";
import * as RDFRepresentation from "./RDFRepresentation";

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
				success: ( response:[Pointer, HTTP.Response.Class] ):void => {
					expect( response ).toBeDefined();
					expect( Utils.isArray( response ) ).toBe( true );
					expect( response.length ).toBe( 2 );

					let pointer:Pointer = response[ 0 ];
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
				success: ( response:[Pointer, HTTP.Response.Class] ):void => {
					expect( response ).toBeDefined();
					expect( Utils.isArray( response ) ).toBe( true );
					expect( response.length ).toBe( 2 );

					let pointer:Pointer = response[ 0 ];
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

	it( hasMethod(
		INSTANCE,
		"delete",
		"Delete a the Resource referred by a PersistedDocument from the server.", [
			{ name: "persistedDocument", type: "Carbon.PersistedDocument.Class" },
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
		let document:PersistedDocument.Class = PersistedDocument.Factory.create( "http://example.com/resource/", documents );

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

		let promise:Promise<any> = documents.delete( document ).then( spies.success );

		Promise.all( [ promise ] ).then( ():void => {
			expect( spySuccess ).toHaveBeenCalled();
			done();
		}, done.fail );
	});

	it( hasMethod(
		INSTANCE,
		"download",
		"Obtains the Blob object from the server referred by the RDFRepresentation Document provided.", [
			{ name: "rdfRepresentation", type: "Carbon.RDFRepresentation.Class" }
		],
		{ type: "Promise<[ Blob, Carbon.HTTP.Response.Class ]>" }
	), ( done:{ ():void, fail:() => void } ):void => {
		class MockedContext extends AbstractContext {
			resolve( uri:string ):string {
				return uri;
			}
		}

		let context:MockedContext = new MockedContext();
		let documents:Documents = context.documents;

		let document:PersistedDocument.Class = PersistedDocument.Factory.create( "http://example.com/resource/", documents );
		document.types.push( RDFRepresentation.RDF_CLASS );

		let rdfRepresentation:RDFRepresentation.Class = RDFRepresentation.Factory.decorate( document );
		rdfRepresentation.mediaType = "text/plain";
		rdfRepresentation.fileIdentifier = "00-01";
		rdfRepresentation.size = 68;

		expect( documents.download ).toBeDefined();
		expect( Utils.isFunction( documents.download ) ).toBe( true );

		jasmine.Ajax.stubRequest( "http://example.com/resource/", null, "GET" ).andReturn({
			status: 200,
			response: <any> new Blob( [ "486921aa54686973206973206d7920504c41494e20626f72696e672054455854202028ca0203f21bc29aa4279657e205c2028202225e1202229202f" ], { type: "text/plain" } )
		});

		let spies = {
			success: ( response:any ):void => {
				expect( Utils.isArray( response ) ).toBe( true );
				
				expect( response[ 0 ] instanceof Blob ).toBe( true );
				expect( response[ 1 ] instanceof HTTP.Response.Class ).toBe( true );
			}
		};
		let spySuccess = spyOn( spies, "success" ).and.callThrough();

		let promise:Promise<any> = documents.download( rdfRepresentation ).then( spies.success );

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
