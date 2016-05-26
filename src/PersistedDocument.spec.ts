import * as PersistedDocument from "./PersistedDocument";

import {
	INSTANCE,
	STATIC,

	module,
	clazz,
	method,

	isDefined,
	hasMethod,
	hasSignature,
	hasProperty,
	decoratedObject
} from "./test/JasmineExtender";
import * as Utils from "./Utils";
import * as Document from "./Document";
import AbstractContext from "./AbstractContext";
import * as AccessPoint from "./AccessPoint";
import Documents from "./Documents";
import * as HTTP from "./HTTP";
import * as Pointer from "./Pointer";
import * as URI from "./RDF/URI";

describe( module( "Carbon/PersistedDocument" ), ():void => {

	it( isDefined(), ():void => {
		expect( PersistedDocument ).toBeDefined();
		expect( Utils.isObject( PersistedDocument ) ).toEqual( true );
	});

	describe( clazz(
		"Carbon.PersistedDocument.Factory",
		"Factory class for PersistedDocument objects."
	), ():void => {
		let context:AbstractContext;
		beforeEach( ():void => {
			class MockedContext extends AbstractContext {
				resolve( uri:string ) {
					return URI.Util.isRelative( uri ) ? `http://example.com/${uri}` : uri;
				}
			}
			context = new MockedContext();
		});

		it( isDefined(), ():void => {
			expect( PersistedDocument.Factory ).toBeDefined();
			expect( Utils.isFunction( PersistedDocument.Factory ) ).toBe( true );
		});

		it( hasMethod(
			STATIC,
			"hasClassProperties",
			"Returns true if the Document provided has the properties and functions of a PersistedDocument object", [
				{ name: "document", type: "Carbon.Document.Class" }
			],
			{ type: "boolean" }
		), ():void => {
			expect( PersistedDocument.Factory.hasClassProperties ).toBeDefined();
			expect( Utils.isFunction( PersistedDocument.Factory.hasClassProperties ) ).toBe( true );

			let document:any = undefined;
			expect( PersistedDocument.Factory.hasClassProperties( document ) ).toBe( false );
			
			document = {
				_documents: null,
				_etag: null,
				refresh: () => {},
				save: () => {},
				destroy: () => {},
				createAccessPoint: () => {},
				executeRawASKQuery: () => {},
				executeASKQuery: () => {},
				executeRawSELECTQuery: () => {},
				executeSELECTQuery: () => {},
				executeRawDESCRIBEQuery: () => {},
				executeRawCONSTRUCTQuery: () => {},
			};
			expect( PersistedDocument.Factory.hasClassProperties( document ) ).toBe( true );
			
			delete document._documents;
			expect( PersistedDocument.Factory.hasClassProperties( document ) ).toBe( false );
			document._documents = null;
			
			delete document._etag;
			expect( PersistedDocument.Factory.hasClassProperties( document ) ).toBe( false );
			document._etag = null;
			
			delete document.refresh;
			expect( PersistedDocument.Factory.hasClassProperties( document ) ).toBe( false );
			document.refresh = ():void => {};
			
			delete document.save;
			expect( PersistedDocument.Factory.hasClassProperties( document ) ).toBe( false );
			document.save = ():void => {};
			
			delete document.destroy;
			expect( PersistedDocument.Factory.hasClassProperties( document ) ).toBe( false );
			document.destroy = ():void => {};
			
			delete document.createAccessPoint;
			expect( PersistedDocument.Factory.hasClassProperties( document ) ).toBe( false );
			document.createAccessPoint = ():void => {};
			
			delete document.executeRawASKQuery;
			expect( PersistedDocument.Factory.hasClassProperties( document ) ).toBe( false );
			document.executeRawASKQuery = ():void => {};
			
			delete document.executeASKQuery;
			expect( PersistedDocument.Factory.hasClassProperties( document ) ).toBe( false );
			document.executeASKQuery = ():void => {};
			
			delete document.executeRawSELECTQuery;
			expect( PersistedDocument.Factory.hasClassProperties( document ) ).toBe( false );
			document.executeRawSELECTQuery = ():void => {};
			
			delete document.executeSELECTQuery;
			expect( PersistedDocument.Factory.hasClassProperties( document ) ).toBe( false );
			document.executeSELECTQuery = ():void => {};
			
			delete document.executeRawDESCRIBEQuery;
			expect( PersistedDocument.Factory.hasClassProperties( document ) ).toBe( false );
			document.executeRawDESCRIBEQuery = ():void => {};
			
			delete document.executeRawCONSTRUCTQuery;
			expect( PersistedDocument.Factory.hasClassProperties( document ) ).toBe( false );
			document.executeRawCONSTRUCTQuery = ():void => {};
		});

		it( hasMethod(
			STATIC,
			"is",
			"Returns true if the element provided is a PersistedDocument object.", [
				{ name: "object", type: "Object" }
			],
			{ type: "boolean" }
		), ():void => {
			expect( PersistedDocument.Factory.is ).toBeDefined();
			expect( Utils.isFunction( PersistedDocument.Factory.is ) ).toBe( true );

			expect( PersistedDocument.Factory.is( undefined ) ).toBe( false );
			expect( PersistedDocument.Factory.is( null ) ).toBe( false );
			expect( PersistedDocument.Factory.is( "a string" ) ).toBe( false );
			expect( PersistedDocument.Factory.is( 100 ) ).toBe( false );
			expect( PersistedDocument.Factory.is( {} ) ).toBe( false );

			let object = Document.Factory.create();
			object["_documents"] = null;
			object["_etag"] = null;
			object["refresh"] = ():void => {};
			object["save"] = ():void => {};
			object["destroy"] = ():void => {};
			object["createAccessPoint"] = ():void => {};
			object["executeRawASKQuery"] = ():void => {};
			object["executeASKQuery"] = ():void => {};
			object["executeRawSELECTQuery"] = ():void => {};
			object["executeSELECTQuery"] = ():void => {};
			object["executeRawDESCRIBEQuery"] = ():void => {};
			object["executeRawCONSTRUCTQuery"] = ():void => {};
			expect( PersistedDocument.Factory.is( object ) ).toBe( true );
		});

		it( hasMethod(
			STATIC,
			"create",
			"Creates an empty PersistedDocument object with the URI provided and contained by the Documents object specified.", [
				{ name: "uri", type: "string" },
				{ name: "documents", type: "Carbon.Documents" }
			],
			{ type: "Carbon.PersistedDocument.Class" }
		), ():void => {
			expect( PersistedDocument.Factory.create ).toBeDefined();
			expect( Utils.isFunction( PersistedDocument.Factory.create ) ).toBe( true );

			let document:PersistedDocument.Class;
			document = PersistedDocument.Factory.create( "http://example.com/resource/", context.documents );
			expect( PersistedDocument.Factory.is( document ) ).toBe( true );
			expect( document.id ).toBe( "http://example.com/resource/" );
			expect( document._documents ).toBe( context.documents );
		});

		it( hasMethod(
			STATIC,
			"createFrom",
			"Creates a PersistedDocument object from the object and URI provided, with the Documents object specified as container.", [
				{ name: "object", type: "T extends Object" },
				{ name: "uri", type: "string" }
			],
			{ type: "Carbon.PersistedDocument.Class" }
		), ():void => {
			expect( PersistedDocument.Factory.createFrom ).toBeDefined();
			expect( Utils.isFunction( PersistedDocument.Factory.createFrom ) ).toBe( true );

			interface MyObject {
				myProperty?:string
			}

			interface MyPersistedDocument extends MyObject, PersistedDocument.Class {}
			let persistedDocument:MyPersistedDocument;

			persistedDocument = PersistedDocument.Factory.createFrom<MyObject>( {}, "http://example.com/resource/", context.documents );
			expect( PersistedDocument.Factory.is( persistedDocument ) ).toBe( true );
			expect( persistedDocument.id ).toBe( "http://example.com/resource/" );

			persistedDocument = PersistedDocument.Factory.createFrom<MyObject>( { myProperty: "a property" }, "http://example.com/resource/", context.documents );
			expect( PersistedDocument.Factory.is( persistedDocument ) ).toBe( true );
			expect( persistedDocument.id ).toBe( "http://example.com/resource/" );
			expect( persistedDocument.myProperty ).toBe( "a property" );
		});

		it( hasMethod(
			STATIC,
			"decorate",
			"Adds the properties and methods necessary for a PersistedDocument object.", [
				{ name: "object", type: "T extends Object" },
				{ name: "documents", type: "Carbon.Documents" }
			],
			{ type: "T & Carbon.PersistedDocument.Class" }
		), ():void => {
			expect( PersistedDocument.Factory.decorate ).toBeDefined();
			expect( Utils.isFunction( PersistedDocument.Factory.decorate ) ).toBe( true );

			interface MyObject {
				myProperty?:string
			}

			interface MyDocument extends MyObject, Document.Class {}
			let document:MyDocument;

			interface MyPersistedDocument extends MyObject, PersistedDocument.Class {}
			let persistedDocument:MyPersistedDocument;

			document = Document.Factory.createFrom<MyObject>( {} );
			persistedDocument = PersistedDocument.Factory.decorate<MyDocument>( document, context.documents );
			expect( PersistedDocument.Factory.is( persistedDocument ) ).toBe( true );
			expect( persistedDocument.myProperty ).toBeUndefined();
			expect( persistedDocument._documents ).toBe( context.documents );

			document = Document.Factory.createFrom<MyObject>( { myProperty: "a property" } );
			persistedDocument = PersistedDocument.Factory.decorate<MyDocument>( document, context.documents );
			expect( PersistedDocument.Factory.is( persistedDocument ) ).toBe( true );
			expect( persistedDocument.myProperty ).toBeDefined();
			expect( persistedDocument.myProperty ).toBe( "a property" );
			expect( persistedDocument._documents ).toBe( context.documents );
		});

		describe( decoratedObject(
			"Object decorated by the Carbon.LDP.PersistedContainer.Factory.decorate function.", [
				"Carbon.LDP.PersistedContainer.Class"
			]
		), ():void => {
			let document:PersistedDocument.Class;

			beforeEach( ():void => {
				context.documents.getPointer( "http://example.com/in/documents/" );
				document = PersistedDocument.Factory.create( "http://example.com/document/", context.documents );
				document.createNamedFragment( "fragment" );
				document.createFragment( "_:BlankNode" );
			});

			it( hasProperty(
				INSTANCE,
				"_documents",
				"Carbon.Documents",
				"Documents object who is the container of the PersistedContainer."
			), ():void => {
				expect( document._documents ).toBeDefined();
				expect( Utils.isObject( document._documents ) ).toBe( true );
				expect( document._documents instanceof Documents ).toBe( true );
			});

			it( hasProperty(
				INSTANCE,
				"_etag",
				"string",
				"The ETag (entity tag) of the PersistedDocument."
			), ():void => {
				expect( document._etag ).toBeDefined();
				// By default, the ETag is null.
				expect( document._etag ).toBeNull();
			});

			it( hasMethod(
				INSTANCE,
				"hasPointer",
				"Returns true if the PersistedDocument object has a pointer referenced by the URI provided.", [
					{ name: "id", type: "string" }
				],
				{ type: "boolean" }
			), ():void => {

				expect( document.hasPointer ).toBeDefined();
				expect( Utils.isFunction( document.hasPointer ) ).toBe( true );

				expect( document.hasPointer( "http://example.com/document/" ) ).toBe( true );
				expect( document.hasPointer( "http://example.com/document/#fragment" ) ).toBe( true );
				expect( document.hasPointer( "_:BlankNode" ) ).toBe( true );
				expect( document.hasPointer( "http://example.com/in/documents/" ) ).toBe( true );

				// TODO fix throw null error
				//expect( document.hasPointer( "this-is-considered-a-fragment/" ) ).toBe( false );

				expect( document.hasPointer( "http://example.com/document/#another-fragment" ) ).toBe( false );
				expect( document.hasPointer( "_:AnotherBlankNode" ) ).toBe( false );
				expect( document.hasPointer( "http://example.com/another-document/" ) ).toBe( false );
			});

			it( hasMethod(
				INSTANCE,
				"getPointer",
				"Returns the pointer referenced by the URI provided. If not exists a pointer is created.\n" +
				"Returns null if the URI is not inside scope of the PersistedDocument.", [
					{ name: "id", type: "string" }
				],
				{ type: "boolean" }
			), ():void => {
				expect( document.getPointer ).toBeDefined();
				expect( Utils.isFunction( document.getPointer ) ).toBe( true );

				let pointer:Pointer.Class;

				pointer = document.getPointer( "http://example.com/document/" );
				expect( pointer ).toBe( document );
				pointer = document.getPointer( "http://example.com/document/#fragment" );
				expect( pointer.id ).toBe( "http://example.com/document/#fragment" );
				pointer = document.getPointer( "_:BlankNode" );
				expect( pointer.id ).toBe( "_:BlankNode" );
				pointer = document.getPointer( "#fragment" );
				expect( pointer.id ).toBe( "http://example.com/document/#fragment" );

				pointer = document.getPointer( "http://example.com/document/#another-fragment" );
				expect( pointer.id ).toBe( "http://example.com/document/#another-fragment" );
				pointer = document.getPointer( "_:AnotherBlankNode" );
				expect( pointer.id ).toBe( "_:AnotherBlankNode" );
				pointer = document.getPointer( "this-is-considered-a-fragment/" );
				expect( pointer.id ).toBe( "http://example.com/document/#this-is-considered-a-fragment/" );

				// Ask to the Documents container.
				pointer = document.getPointer( "http://example.com/in/documents/" );
				expect( pointer.id ).toBe( "http://example.com/in/documents/" );
				pointer = document.getPointer( "http://example.com/another-document/" );
				expect( pointer.id ).toBe( "http://example.com/another-document/" );
			});

			describe( method(
				INSTANCE,
				"inScope"
			), ():void => {

				it( hasSignature(
					"Returns true if the pointer provided is in the scope of the PersistedDocument.", [
						{ name: "pointer", type: "Carbon.Pointer.Class" }
					],
					{ type: "boolean" }
				), ():void => {
					expect( document.inScope ).toBeDefined();
					expect( Utils.isFunction( document.inScope ) ).toBe( true );

					let pointer:Pointer.Class;

					expect( document.inScope.bind( document, undefined ) ).toThrowError();
					expect( document.inScope.bind( document, null ) ).toThrowError();

					expect( document.inScope( document ) ).toBe( true );
					pointer = Pointer.Factory.create( "http://example.com/document/" );
					expect( document.inScope( pointer ) ).toBe( true );
					pointer = Pointer.Factory.create( "http://example.com/document/#fragment" );
					expect( document.inScope( pointer ) ).toBe( true );
					pointer = Pointer.Factory.create( "http://example.com/document/#another-fragment" );
					expect( document.inScope( pointer ) ).toBe( true );
					pointer = Pointer.Factory.create( "_:BlankNode" );
					expect( document.inScope( pointer ) ).toBe( true );
					pointer = Pointer.Factory.create( "#fragment" );
					expect( document.inScope( pointer ) ).toBe( true );
					pointer = Pointer.Factory.create( "this-is-considered-a-fragment/" );
					expect( document.inScope( pointer ) ).toBe( true );

					// In Documents
					pointer = Pointer.Factory.create( "http://example.com/in/documents/" );
					expect( document.inScope( pointer ) ).toBe( true );
					pointer = Pointer.Factory.create( "http://example.com/document/child/" );
					expect( document.inScope( pointer ) ).toBe( true );
					pointer = Pointer.Factory.create( "http://example.com/another-document/" );
					expect( document.inScope( pointer ) ).toBe( true );
					pointer = Pointer.Factory.create( "http://example.org/document/" );
					expect( document.inScope( pointer ) ).toBe( true );
				});

				it( hasSignature(
					"Returns true if the URI provided is in the scope of the PersistedDocument.", [
						{ name: "id", type: "string" }
					],
					{ type: "boolean" }
				), ():void => {
					expect( document.inScope ).toBeDefined();
					expect( Utils.isFunction( document.inScope ) ).toBe( true );

					expect( document.inScope( document.id ) ).toBe( true );
					expect( document.inScope( "http://example.com/document/" ) ).toBe( true );
					expect( document.inScope( "http://example.com/document/#fragment" ) ).toBe( true );
					expect( document.inScope( "http://example.com/document/#another-fragment" ) ).toBe( true );
					expect( document.inScope( "_:BlankNode" ) ).toBe( true );
					expect( document.inScope( "#fragment" ) ).toBe( true );
					expect( document.inScope( "this-is-considered-a-fragment/" ) ).toBe( true );

					// In Documents
					expect( document.inScope( "http://example.com/in/documents/" ) ).toBe( true );
					expect( document.inScope( "http://example.com/document/child/" ) ).toBe( true );
					expect( document.inScope( "http://example.com/another-document/" ) ).toBe( true );
					expect( document.inScope( "http://example.org/document/" ) ).toBe( true );
				});

			});

			it( hasMethod(
				INSTANCE,
				"refresh",
				"Sync the PersistedDocument with the data in the server.",
				{ type: "Promise<void>" }
			), ():void => {
				expect( document.refresh ).toBeDefined();
				expect( Utils.isFunction( document.refresh ) ).toBe( true );

				let spy = spyOn( context.documents, "refresh" );
				document.refresh();
				expect( spy ).toHaveBeenCalledWith( document );
			});

			it( hasMethod(
				INSTANCE,
				"save",
				"Save the PersistedDocument to the server.",
				{ type: "Promise<[ Carbon.PersistedDocument.Class, HTTP.Response.Class ]>" }
			), ():void => {
				expect( document.save ).toBeDefined();
				expect( Utils.isFunction( document.save ) ).toBe( true );

				let spy = spyOn( context.documents, "save" );
				document.save();
				expect( spy ).toHaveBeenCalledWith( document );
			});

			it( hasMethod(
				INSTANCE,
				"destroy",
				"Remove the data in the server referred by the id of the PersistedDocument.",
				{ type: "Promise<Carbon.HTTP.Response.Class>" }
			), ():void => {
				expect( document.destroy ).toBeDefined();
				expect( Utils.isFunction( document.destroy ) ).toBe( true );

				let spy = spyOn( context.documents, "delete" );
				document.destroy();
				expect( spy ).toHaveBeenCalledWith( document.id );
			});

			it( hasMethod(
				INSTANCE,
				"createAccessPoint",
				"Creates an AccessPoint for the PersistedDocument.",
				{ type: "Promise<[Carbon.Pointer.Class, Carbon.HTTP.Response.Class]>" }
			), ():void => {
				expect( document.createAccessPoint ).toBeDefined();
				expect( Utils.isFunction( document.createAccessPoint ) ).toBe( true );

				let accessPoint:AccessPoint.Class = AccessPoint.Factory.create( document, "http://example.com/" );
				let requestOptions:HTTP.Request.Options = {};

				let spy = spyOn( context.documents, "createAccessPoint" );
				document.createAccessPoint( accessPoint, "slug", requestOptions );
				expect( spy ).toHaveBeenCalledWith( accessPoint, "slug", requestOptions );
			});

			it( hasMethod(
				INSTANCE,
				"executeRawASKQuery",
				"Executes an ASK query in the document and returns a raw application/sparql-results+json object.", [
					{ name: "askQuery", type: "string" },
					{ name: "requestOptions", type: "Carbon.HTTP.Request.Options", optional: true }
				],
				{ type: "Promise<[ Carbon.SPARQL.RawResults.Class, Carbon.HTTP.Response.Class ]>" }
			), ():void => {
				expect( document.executeRawASKQuery ).toBeDefined();
				expect( Utils.isFunction( document.executeRawASKQuery ) ).toBe( true );

				let spy = spyOn( context.documents, "executeRawASKQuery" );
				document.executeRawASKQuery( "ASK { ?subject, ?predicate, ?object }" );
				expect( spy ).toHaveBeenCalledWith( document.id, "ASK { ?subject, ?predicate, ?object }", {} );
			});

			it( hasMethod(
				INSTANCE,
				"executeASKQuery",
				"Executes an ASK query in the document and returns a boolean of th result.", [
					{ name: "askQuery", type: "string" },
					{ name: "requestOptions", type: "Carbon.HTTP.Request.Options", optional: true }
				],
				{ type: "Promise<[ boolean, Carbon.HTTP.Response.Class ]>" }
			), ():void => {
				expect( document.executeASKQuery ).toBeDefined();
				expect( Utils.isFunction( document.executeASKQuery ) ).toBe( true );

				let spy = spyOn( context.documents, "executeASKQuery" );
				document.executeASKQuery( "ASK { ?subject, ?predicate, ?object }" );
				expect( spy ).toHaveBeenCalledWith( document.id, "ASK { ?subject, ?predicate, ?object }", {} );
			});

			it( hasMethod(
				INSTANCE,
				"executeRawSELECTQuery",
				"Executes an SELECT query in the document and returns a raw application/sparql-results+json object.",[
					{ name: "selectQuery", type: "string" },
					{ name: "requestOptions", type: "Carbon.HTTP.Request.Options", optional: true }
				],
				{ type: "Promise<[ Carbon.SPARQL.RawResults.Class, Carbon.HTTP.Response.Class ]>" }
			), ():void => {
				expect( document.executeRawSELECTQuery ).toBeDefined();
				expect( Utils.isFunction( document.executeRawSELECTQuery ) ).toBe( true );

				let spy = spyOn( context.documents, "executeRawSELECTQuery" );
				document.executeRawSELECTQuery( "SELECT ?book ?title WHERE { <http://example.com/some-document/> ?book ?title }" );
				expect( spy ).toHaveBeenCalledWith( document.id, "SELECT ?book ?title WHERE { <http://example.com/some-document/> ?book ?title }", {} );
			});

			it( hasMethod(
				INSTANCE,
				"executeSELECTQuery",
				"Executes an SELECT query in the document and returns the results as a `Carbon.SPARQL.SELECTResults.Class` object.",[
					{ name: "selectQuery", type: "string" },
					{ name: "requestOptions", type: "Carbon.HTTP.Request.Options", optional: true }
				],
				{ type: "Promise<[ Carbon.SPARQL.SELECTResults.Class, Carbon.HTTP.Response.Class ]>" }
			), ():void => {
				expect( document.executeSELECTQuery ).toBeDefined();
				expect( Utils.isFunction( document.executeSELECTQuery ) ).toBe( true );

				let spy = spyOn( context.documents, "executeSELECTQuery" );
				document.executeSELECTQuery( "SELECT ?book ?title WHERE { <http://example.com/some-document/> ?book ?title }" );
				expect( spy ).toHaveBeenCalledWith( document.id, "SELECT ?book ?title WHERE { <http://example.com/some-document/> ?book ?title }", {} );
			});

			it( hasMethod(
				INSTANCE,
				"executeRawCONSTRUCTQuery",
				"Executes an CONSTRUCT query in the document and returns a string with the resulting model.",[
					{ name: "constructQuery", type: "string" },
					{ name: "requestOptions", type: "Carbon.HTTP.Request.Options", optional: true }
				],
				{ type: "Promise<[ string, Carbon.HTTP.Response.Class ]>" }
			), ():void => {
				expect( document.executeRawCONSTRUCTQuery ).toBeDefined();
				expect( Utils.isFunction( document.executeRawCONSTRUCTQuery ) ).toBe( true );

				let spy = spyOn( context.documents, "executeRawCONSTRUCTQuery" );
				document.executeRawCONSTRUCTQuery( "CONSTRUCT { ?subject ?predicate ?object } WHERE { ?subject ?predicate ?object }" );
				expect( spy ).toHaveBeenCalledWith( document.id, "CONSTRUCT { ?subject ?predicate ?object } WHERE { ?subject ?predicate ?object }", {} );
			});

			it( hasMethod(
				INSTANCE,
				"executeRawDESCRIBEQuery",
				"Executes an DESCRIBE query in the document and returns a string with the resulting model.",[
					{ name: "constructQuery", type: "string" },
					{ name: "requestOptions", type: "Carbon.HTTP.Request.Options", optional: true }
				],
				{ type: "Promise<[ string, Carbon.HTTP.Response.Class ]>" }
			), ():void => {
				expect( document.executeRawDESCRIBEQuery ).toBeDefined();
				expect( Utils.isFunction( document.executeRawDESCRIBEQuery ) ).toBe( true );

				let spy = spyOn( context.documents, "executeRawDESCRIBEQuery" );
				document.executeRawDESCRIBEQuery( "DESCRIBE { ?subject ?predicate ?object } WHERE { ?subject ?predicate ?object }" );
				expect( spy ).toHaveBeenCalledWith( document.id, "DESCRIBE { ?subject ?predicate ?object } WHERE { ?subject ?predicate ?object }", {} );
			});

		});

	});

});