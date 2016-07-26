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
	decoratedObject,
} from "./test/JasmineExtender";
import AbstractContext from "./AbstractContext";
import * as Document from "./Document";
import Documents from "./Documents";
import * as Pointer from "./Pointer";
import * as RetrievalPreferences from "./RetrievalPreferences";
import * as URI from "./RDF/URI";
import * as Utils from "./Utils";

import * as PersistedDocument from "./PersistedDocument";

describe( module( "Carbon/PersistedDocument" ), ():void => {

	it( isDefined(), ():void => {
		expect( PersistedDocument ).toBeDefined();
		expect( Utils.isObject( PersistedDocument ) ).toEqual( true );
	} );

	describe( clazz(
		"Carbon.PersistedDocument.Factory",
		"Factory class for PersistedDocument objects."
	), ():void => {
		let context:AbstractContext;
		beforeEach( ():void => {
			class MockedContext extends AbstractContext {
				resolve( uri:string ):string {
					return URI.Util.isRelative( uri ) ? `http://example.com/${uri}` : uri;
				}
			}
			context = new MockedContext();
		} );

		it( isDefined(), ():void => {
			expect( PersistedDocument.Factory ).toBeDefined();
			expect( Utils.isFunction( PersistedDocument.Factory ) ).toBe( true );
		} );

		it( hasMethod(
			STATIC,
			"hasClassProperties",
			"Returns true if the Document provided has the properties and functions of a PersistedDocument object", [
				{name: "document", type: "Carbon.Document.Class"},
			],
			{type: "boolean"}
		), ():void => {
			expect( PersistedDocument.Factory.hasClassProperties ).toBeDefined();
			expect( Utils.isFunction( PersistedDocument.Factory.hasClassProperties ) ).toBe( true );

			let document:any = undefined;
			expect( PersistedDocument.Factory.hasClassProperties( document ) ).toBe( false );

			document = {
				created: null,
				modified: null,
				defaultInteractionModel: null,
				accessPoints: null,

				_documents: null,
				_etag: null,

				refresh: ():void => {},
				save: ():void => {},
				destroy: ():void => {},

				getDownloadURL: ():void => {},

				addMember: ():void => {},
				addMembers: ():void => {},
				createAccessPoint: ():void => {},
				createChild: ():void => {},
				listChildren: ():void => {},
				getChildren: ():void => {},
				listMembers: ():void => {},
				getMembers: ():void => {},
				removeMember: ():void => {},
				removeMembers: ():void => {},
				removeAllMembers: ():void => {},
				upload: ():void => {},

				executeRawASKQuery: ():void => {},
				executeASKQuery: ():void => {},
				executeRawSELECTQuery: ():void => {},
				executeSELECTQuery: ():void => {},
				executeRawDESCRIBEQuery: ():void => {},
				executeRawCONSTRUCTQuery: ():void => {},
				executeUPDATE: ():void => {},
			};
			expect( PersistedDocument.Factory.hasClassProperties( document ) ).toBe( true );

			delete document.accessPoints;
			expect( PersistedDocument.Factory.hasClassProperties( document ) ).toBe( true );
			document.accessPoints = null;

			delete document.created;
			expect( PersistedDocument.Factory.hasClassProperties( document ) ).toBe( true );
			document.created = null;

			delete document.modified;
			expect( PersistedDocument.Factory.hasClassProperties( document ) ).toBe( true );
			document.modified = null;

			delete document.defaultInteractionModel;
			expect( PersistedDocument.Factory.hasClassProperties( document ) ).toBe( true );
			document.defaultInteractionModel = null;

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

			delete document.getDownloadURL;
			expect( PersistedDocument.Factory.hasClassProperties( document ) ).toBe( false );
			document.getDownloadURL = ():void => {};

			delete document.addMember;
			expect( PersistedDocument.Factory.hasClassProperties( document ) ).toBe( false );
			document.addMember = ():void => {};

			delete document.addMembers;
			expect( PersistedDocument.Factory.hasClassProperties( document ) ).toBe( false );
			document.addMembers = ():void => {};

			delete document.createAccessPoint;
			expect( PersistedDocument.Factory.hasClassProperties( document ) ).toBe( false );
			document.createAccessPoint = ():void => {};

			delete document.createChild;
			expect( PersistedDocument.Factory.hasClassProperties( document ) ).toBe( false );
			document.createChild = ():void => {};

			delete document.listChildren;
			expect( PersistedDocument.Factory.hasClassProperties( document ) ).toBe( false );
			document.listChildren = ():void => {};

			delete document.getChildren;
			expect( PersistedDocument.Factory.hasClassProperties( document ) ).toBe( false );
			document.getChildren = ():void => {};

			delete document.listMembers;
			expect( PersistedDocument.Factory.hasClassProperties( document ) ).toBe( false );
			document.listMembers = ():void => {};

			delete document.getMembers;
			expect( PersistedDocument.Factory.hasClassProperties( document ) ).toBe( false );
			document.getMembers = ():void => {};

			delete document.removeMember;
			expect( PersistedDocument.Factory.hasClassProperties( document ) ).toBe( false );
			document.removeMember = ():void => {};

			delete document.removeMembers;
			expect( PersistedDocument.Factory.hasClassProperties( document ) ).toBe( false );
			document.removeMembers = ():void => {};

			delete document.removeAllMembers;
			expect( PersistedDocument.Factory.hasClassProperties( document ) ).toBe( false );
			document.removeAllMembers = ():void => {};

			delete document.upload;
			expect( PersistedDocument.Factory.hasClassProperties( document ) ).toBe( false );
			document.upload = ():void => {};

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

			delete document.executeUPDATE;
			expect( PersistedDocument.Factory.hasClassProperties( document ) ).toBe( false );
			document.executeUPDATE = ():void => {};
		} );

		it( hasMethod(
			STATIC,
			"is",
			"Returns true if the element provided is a PersistedDocument object.", [
				{name: "object", type: "Object"},
			],
			{type: "boolean"}
		), ():void => {
			expect( PersistedDocument.Factory.is ).toBeDefined();
			expect( Utils.isFunction( PersistedDocument.Factory.is ) ).toBe( true );

			expect( PersistedDocument.Factory.is( undefined ) ).toBe( false );
			expect( PersistedDocument.Factory.is( null ) ).toBe( false );
			expect( PersistedDocument.Factory.is( "a string" ) ).toBe( false );
			expect( PersistedDocument.Factory.is( 100 ) ).toBe( false );
			expect( PersistedDocument.Factory.is( {} ) ).toBe( false );

			let object:any = Document.Factory.createFrom( {
				created: null,
				modified: null,
				defaultInteractionModel: null,
				accessPoints: null,

				_documents: null,
				_etag: null,

				refresh: ():void => {},
				save: ():void => {},
				destroy: ():void => {},

				getDownloadURL: ():void => {},

				addMember: ():void => {},
				addMembers: ():void => {},
				createAccessPoint: ():void => {},
				createChild: ():void => {},
				listChildren: ():void => {},
				getChildren: ():void => {},
				listMembers: ():void => {},
				getMembers: ():void => {},
				removeMember: ():void => {},
				removeMembers: ():void => {},
				removeAllMembers: ():void => {},
				upload: ():void => {},

				executeRawASKQuery: ():void => {},
				executeASKQuery: ():void => {},
				executeRawSELECTQuery: ():void => {},
				executeSELECTQuery: ():void => {},
				executeRawDESCRIBEQuery: ():void => {},
				executeRawCONSTRUCTQuery: ():void => {},
				executeUPDATE: ():void => {},
			} );
			expect( PersistedDocument.Factory.is( object ) ).toBe( true );
		} );

		it( hasMethod(
			STATIC,
			"create",
			"Creates an empty PersistedDocument object with the URI provided and contained by the Documents object specified.", [
				{name: "uri", type: "string"},
				{name: "documents", type: "Carbon.Documents"},
			],
			{type: "Carbon.PersistedDocument.Class"}
		), ():void => {
			expect( PersistedDocument.Factory.create ).toBeDefined();
			expect( Utils.isFunction( PersistedDocument.Factory.create ) ).toBe( true );

			let document:PersistedDocument.Class;
			document = PersistedDocument.Factory.create( "http://example.com/document/", context.documents );
			expect( PersistedDocument.Factory.is( document ) ).toBe( true );

			expect( document.id ).toBe( "http://example.com/document/" );
			expect( document._documents ).toBe( context.documents );
		} );

		it( hasMethod(
			STATIC,
			"createFrom",
			[ "T extends Object" ],
			"Creates a PersistedDocument object from the object and URI provided, with the Documents object specified as container.", [
				{name: "object", type: "T"},
				{name: "uri", type: "string"},
			],
			{type: "T & Carbon.PersistedDocument.Class"}
		), ():void => {
			expect( PersistedDocument.Factory.createFrom ).toBeDefined();
			expect( Utils.isFunction( PersistedDocument.Factory.createFrom ) ).toBe( true );

			interface MyObject {
				myProperty?:string;
			}

			interface MyPersistedDocument extends MyObject, PersistedDocument.Class {}
			let persistedDocument:MyPersistedDocument;

			persistedDocument = PersistedDocument.Factory.createFrom<MyObject>( {}, "http://example.com/document/", context.documents );
			expect( PersistedDocument.Factory.is( persistedDocument ) ).toBe( true );
			expect( persistedDocument.id ).toBe( "http://example.com/document/" );

			persistedDocument = PersistedDocument.Factory.createFrom<MyObject>( {myProperty: "a property"}, "http://example.com/document/", context.documents );
			expect( PersistedDocument.Factory.is( persistedDocument ) ).toBe( true );
			expect( persistedDocument.id ).toBe( "http://example.com/document/" );
			expect( persistedDocument.myProperty ).toBe( "a property" );
		} );

		it( hasMethod(
			STATIC,
			"decorate",
			[ "T extends Object" ],
			"Adds the properties and methods necessary for a PersistedDocument object.", [
				{name: "object", type: "T"},
				{name: "documents", type: "Carbon.Documents"},
			],
			{type: "T & Carbon.PersistedDocument.Class"}
		), ():void => {
			expect( PersistedDocument.Factory.decorate ).toBeDefined();
			expect( Utils.isFunction( PersistedDocument.Factory.decorate ) ).toBe( true );

			interface MyObject {
				myProperty?:string;
			}

			interface MyDocument extends MyObject, Document.Class {}
			let document:MyDocument;

			interface MyPersistedDocument extends MyObject, PersistedDocument.Class {
			}
			let persistedDocument:MyPersistedDocument;

			document = Document.Factory.createFrom<MyObject>( {} );
			persistedDocument = PersistedDocument.Factory.decorate<MyDocument>( document, context.documents );
			expect( PersistedDocument.Factory.is( persistedDocument ) ).toBe( true );
			expect( persistedDocument.myProperty ).toBeUndefined();
			expect( persistedDocument._documents ).toBe( context.documents );

			document = Document.Factory.createFrom<MyObject>( {myProperty: "a property"} );
			persistedDocument = PersistedDocument.Factory.decorate<MyDocument>( document, context.documents );
			expect( PersistedDocument.Factory.is( persistedDocument ) ).toBe( true );
			expect( persistedDocument.myProperty ).toBeDefined();
			expect( persistedDocument.myProperty ).toBe( "a property" );
			expect( persistedDocument._documents ).toBe( context.documents );
		} );

		describe( decoratedObject(
			"Object decorated by the `Carbon.PersistedDocument.Factory.decorate()` function.", [
				"Carbon.PersistedDocument.Class",
			]
		), ():void => {
			let document:PersistedDocument.Class;

			beforeEach( ():void => {
				context.documents.getPointer( "http://example.com/in/documents/" );
				document = PersistedDocument.Factory.create( "http://example.com/document/", context.documents );
				document.createNamedFragment( "fragment" );
				document.createFragment( "_:BlankNode" );
			} );

			it( hasProperty(
				INSTANCE,
				"_documents",
				"Carbon.Documents",
				"Documents object who is the container of the PersistedContainer."
			), ():void => {
				expect( document._documents ).toBeDefined();
				expect( Utils.isObject( document._documents ) ).toBe( true );
				expect( document._documents instanceof Documents ).toBe( true );
			} );

			it( hasProperty(
				INSTANCE,
				"_etag",
				"string",
				"The ETag (entity tag) of the PersistedDocument."
			), ():void => {
				expect( document._etag ).toBeDefined();
				// By default, the ETag is null.
				expect( document._etag ).toBeNull();
			} );

			it( hasMethod(
				INSTANCE,
				"hasPointer",
				"Returns true if the PersistedDocument object has a pointer referenced by the URI provided.", [
					{name: "id", type: "string"},
				],
				{type: "boolean"}
			), ():void => {

				expect( document.hasPointer ).toBeDefined();
				expect( Utils.isFunction( document.hasPointer ) ).toBe( true );

				expect( document.hasPointer( "http://example.com/document/" ) ).toBe( true );
				expect( document.hasPointer( "http://example.com/document/#fragment" ) ).toBe( true );
				expect( document.hasPointer( "_:BlankNode" ) ).toBe( true );
				expect( document.hasPointer( "http://example.com/in/documents/" ) ).toBe( true );

				expect( document.hasPointer( "this-uri-is-resolved-relative/" ) ).toBe( false );
				expect( document.hasPointer( "http://example.com/document/#another-fragment" ) ).toBe( false );
				expect( document.hasPointer( "_:AnotherBlankNode" ) ).toBe( false );
				expect( document.hasPointer( "http://example.com/another-document/" ) ).toBe( false );
			} );

			it( hasMethod(
				INSTANCE,
				"getPointer",
				"Returns the pointer referenced by the URI provided. If not exists a pointer is created.\n" +
				"Returns null if the URI is not inside scope of the PersistedDocument.", [
					{name: "id", type: "string"},
				],
				{type: "boolean"}
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

				// Ask to the Documents container.
				pointer = document.getPointer( "this-uri-is-resolved-relative/" );
				expect( pointer.id ).toBe( "http://example.com/this-uri-is-resolved-relative/" );
				pointer = document.getPointer( "http://example.com/in/documents/" );
				expect( pointer.id ).toBe( "http://example.com/in/documents/" );
				pointer = document.getPointer( "http://example.com/another-document/" );
				expect( pointer.id ).toBe( "http://example.com/another-document/" );
			} );

			describe( method(
				INSTANCE,
				"inScope"
			), ():void => {

				it( hasSignature(
					"Returns true if the pointer provided is in the scope of the PersistedDocument.", [
						{name: "pointer", type: "Carbon.Pointer.Class"},
					],
					{type: "boolean"}
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

					// In Documents
					pointer = Pointer.Factory.create( "this-uri-is-resolved-relative/" );
					expect( document.inScope( pointer ) ).toBe( true );
					pointer = Pointer.Factory.create( "http://example.com/in/documents/" );
					expect( document.inScope( pointer ) ).toBe( true );
					pointer = Pointer.Factory.create( "http://example.com/document/child/" );
					expect( document.inScope( pointer ) ).toBe( true );
					pointer = Pointer.Factory.create( "http://example.com/another-document/" );
					expect( document.inScope( pointer ) ).toBe( true );
					pointer = Pointer.Factory.create( "http://example.org/document/" );
					expect( document.inScope( pointer ) ).toBe( true );
				} );

				it( hasSignature(
					"Returns true if the URI provided is in the scope of the PersistedDocument.", [
						{name: "id", type: "string"},
					],
					{type: "boolean"}
				), ():void => {
					expect( document.inScope ).toBeDefined();
					expect( Utils.isFunction( document.inScope ) ).toBe( true );

					expect( document.inScope( document.id ) ).toBe( true );
					expect( document.inScope( "http://example.com/document/" ) ).toBe( true );
					expect( document.inScope( "http://example.com/document/#fragment" ) ).toBe( true );
					expect( document.inScope( "http://example.com/document/#another-fragment" ) ).toBe( true );
					expect( document.inScope( "_:BlankNode" ) ).toBe( true );
					expect( document.inScope( "#fragment" ) ).toBe( true );

					// In Documents
					expect( document.inScope( "this-uri-is-resolved-relative/" ) ).toBe( true );
					expect( document.inScope( "http://example.com/in/documents/" ) ).toBe( true );
					expect( document.inScope( "http://example.com/document/child/" ) ).toBe( true );
					expect( document.inScope( "http://example.com/another-document/" ) ).toBe( true );
					expect( document.inScope( "http://example.org/document/" ) ).toBe( true );
				} );

			} );

			it( hasMethod(
				INSTANCE,
				"refresh",
				[ "T extends Carbon.PersistedDocument.Class" ],
				"Sync the PersistedDocument with the data in the server.",
				{type: "Promise<[ T, Carbon.HTTP.Response.Class]>"}
			), ():void => {
				expect( document.refresh ).toBeDefined();
				expect( Utils.isFunction( document.refresh ) ).toBe( true );

				let spy:jasmine.Spy = spyOn( context.documents, "refresh" );
				document.refresh();
				expect( spy ).toHaveBeenCalledWith( document );
			} );

			it( hasMethod(
				INSTANCE,
				"save",
				[ "T extends Carbon.PersistedDocument.Class" ],
				"Save the PersistedDocument to the server.",
				{type: "Promise<[ T, Carbon.HTTP.Response.Class ]>"}
			), ():void => {
				expect( document.save ).toBeDefined();
				expect( Utils.isFunction( document.save ) ).toBe( true );

				let spy:jasmine.Spy = spyOn( context.documents, "save" );
				document.save();
				expect( spy ).toHaveBeenCalledWith( document );
			} );

			it( hasMethod(
				INSTANCE,
				"destroy",
				"Remove the data in the server referred by the id of the PersistedDocument.",
				{type: "Promise<Carbon.HTTP.Response.Class>"}
			), ():void => {
				expect( document.destroy ).toBeDefined();
				expect( Utils.isFunction( document.destroy ) ).toBe( true );

				let spy:jasmine.Spy = spyOn( context.documents, "delete" );
				document.destroy();
				expect( spy ).toHaveBeenCalledWith( document.id );
			} );

			it( hasMethod(
				INSTANCE,
				"getDownloadURL",
				"Returns the URI of the current document with the properties necessarily for a single download request.",
				{type: "Promise<Carbon.HTTP.Response.Class>"}
			), ():void => {
				expect( document.getDownloadURL ).toBeDefined();
				expect( Utils.isFunction( document.getDownloadURL ) ).toBe( true );

				let spy:jasmine.Spy = spyOn( context.documents, "getDownloadURL" );
				document.getDownloadURL();
				expect( spy ).toHaveBeenCalledWith( document.id );
			} );

			describe( method(
				INSTANCE,
				"addMember"
			), ():void => {

				it( hasSignature(
					"Add the specified resource Pointer as a member of the container.", [
						{name: "member", type: "Carbon.Pointer.Class", description: "Pointer object that references the resource to add as a member."},
					],
					{type: "Promise<Carbon.HTTP.Response.Class>"}
				), ():void => {
					expect( document.addMember ).toBeDefined();
					expect( Utils.isFunction( document.addMember ) ).toBeDefined();

					let spy:jasmine.Spy = spyOn( document._documents, "addMember" );

					let pointer:Pointer.Class = context.documents.getPointer( "new-member/" );
					document.addMember( pointer );

					expect( spy ).toHaveBeenCalledWith( "http://example.com/document/", pointer );
				} );

				it( hasSignature(
					"Add the specified resource URI as a member of the document.", [
						{name: "memberURI", type: "string", description: "URI of the resource to add as a member."},
					],
					{type: "Promise<Carbon.HTTP.Response.Class>"}
				), ():void => {
					expect( document.addMember ).toBeDefined();
					expect( Utils.isFunction( document.addMember ) ).toBeDefined();

					let spy:jasmine.Spy = spyOn( document._documents, "addMember" );

					document.addMember( "new-member/" );

					expect( spy ).toHaveBeenCalledWith( "http://example.com/document/", "new-member/" );
				} );

			} );

			it( hasMethod(
				INSTANCE,
				"addMembers",
				"Add the specified resources URI or Pointers as members of the document.", [
					{name: "members", type: "(Carbon.Pointer.Class | string)[]", description: "Array of string URIs or Pointers to add as members"},
				],
				{type: "Promise<Carbon.HTTP.Response.Class>"}
			), ():void => {
				expect( document.addMembers ).toBeDefined();
				expect( Utils.isFunction( document.addMembers ) ).toBeDefined();

				let spy:jasmine.Spy = spyOn( document._documents, "addMembers" );

				let pointers:Pointer.Class[] = [];
				pointers.push( context.documents.getPointer( "new-member/" ) );
				document.addMembers( pointers );

				expect( spy ).toHaveBeenCalledWith( "http://example.com/document/", pointers );
			} );

			describe( method(
				INSTANCE,
				"createChild"
			), ():void => {

				it( hasSignature( [
						{name: "slug", type: "string", description: "The slug name for the children URI."},
						{name: "object", type: "Object", description: "The object from where create the child. If it's a non `Carbon.Document.Class` object, it is transformed into one."},
					],
					{type: "Promise<[ Carbon.Pointer.Class, Carbon.HTTP.Response.Class ]>"}
				), ():void => {
					expect( document.createChild ).toBeDefined();
					expect( Utils.isFunction( document.createChild ) ).toBeDefined();

					let spy:jasmine.Spy = spyOn( document._documents, "createChild" );

					let childDocument:Document.Class = Document.Factory.create();
					document.createChild( "child", childDocument );

					expect( spy ).toHaveBeenCalledWith( "http://example.com/document/", "child", childDocument );
					spy.calls.reset();

					let object:Object = {my: "object"};
					document.createChild( "child", object );
					expect( spy ).toHaveBeenCalledWith( "http://example.com/document/", "child", object );
				} );

				it( hasSignature( [
						{name: "object", type: "Object", description: "The object from where create the child. If it's a non `Carbon.Document.Class` object, it is transformed into one."},
					],
					{type: "Promise<[ Carbon.Pointer.Class, Carbon.HTTP.Response.Class ]>"}
				), ():void => {
					expect( document.createChild ).toBeDefined();
					expect( Utils.isFunction( document.createChild ) ).toBeDefined();

					let spy:jasmine.Spy = spyOn( document._documents, "createChild" );

					let childDocument:Document.Class = Document.Factory.create();
					document.createChild( childDocument );

					expect( spy ).toHaveBeenCalledWith( "http://example.com/document/", childDocument );
					spy.calls.reset();

					let object:Object = {my: "object"};
					document.createChild( object );
					expect( spy ).toHaveBeenCalledWith( "http://example.com/document/", object );
				} );

				it( hasSignature( [
						{name: "slug", type: "string", description: "The slug name for the children URI."},
					],
					{type: "Promise<[ Carbon.Pointer.Class, Carbon.HTTP.Response.Class ]>"}
				), ():void => {
					expect( document.createChild ).toBeDefined();
					expect( Utils.isFunction( document.createChild ) ).toBeDefined();

					let spy:jasmine.Spy = spyOn( document._documents, "createChild" );

					document.createChild( "child" );
					expect( spy ).toHaveBeenCalledWith( "http://example.com/document/", "child", {} );
				} );

				it( hasSignature(
					{type: "Promise<[ Carbon.Pointer.Class, Carbon.HTTP.Response.Class ]>"}
				), ():void => {
					expect( document.createChild ).toBeDefined();
					expect( Utils.isFunction( document.createChild ) ).toBeDefined();

					let spy:jasmine.Spy = spyOn( document._documents, "createChild" );

					document.createChild();
					expect( spy ).toHaveBeenCalledWith( "http://example.com/document/", {} );
				} );

			} );

			it( hasMethod(
				INSTANCE,
				"listChildren",
				"Return all the children of the document.",
				{type: "Promise<[ Carbon.Pointer.Class[], Carbon.HTTP.Response ]>"}
			), ():void => {
				expect( document.listChildren ).toBeDefined();
				expect( Utils.isFunction( document.listChildren ) ).toBeDefined();

				let spy:jasmine.Spy = spyOn( document._documents, "listChildren" );

				document.listChildren();
				expect( spy ).toHaveBeenCalledWith( "http://example.com/document/" );
			} );

			it( hasMethod(
				INSTANCE,
				"getChildren",
				[ "T" ],
				"Return all the children of the document.", [
					{name: "retrievalPreferences", type: "Carbon.RetrievalPreferences.Class", optional: true},
				],
				{type: "Promise<[ (T & Carbon.PersistedDocument.Class)[], Carbon.HTTP.Response ]>"}
			), ():void => {
				expect( document.getChildren ).toBeDefined();
				expect( Utils.isFunction( document.getChildren ) ).toBeDefined();

				let spy:jasmine.Spy = spyOn( document._documents, "getChildren" );

				document.getChildren();
				expect( spy ).toHaveBeenCalledWith( "http://example.com/document/", undefined );
				spy.calls.reset();


				let retrievalPreferences:RetrievalPreferences.Class = {
					limit: 10,
					offset: 0,
					orderBy: [ {"@id": "http://example.com/ns#string", "@type": "string"} ],
				};
				document.getChildren( retrievalPreferences );
				expect( spy ).toHaveBeenCalledWith( "http://example.com/document/", retrievalPreferences );
			} );

			it( hasMethod(
				INSTANCE,
				"listMembers", [
					{name: "includeNonReadable", type: "boolean", optional: true, description: "By default this option is set to `true`."},
				],
				{type: "Promise<[ Carbon.Pointer.Class[], Carbon.HTTP.Response.Class ]>"}
			), ():void => {
				expect( document.listMembers ).toBeDefined();
				expect( Utils.isFunction( document.listMembers ) ).toBeDefined();

				let spy:jasmine.Spy = spyOn( document._documents, "listMembers" );

				document.listMembers();
				expect( spy ).toHaveBeenCalledWith( "http://example.com/document/", true );
				spy.calls.reset();

				document.listMembers( false );
				expect( spy ).toHaveBeenCalledWith( "http://example.com/document/", false );
			} );

			describe( method(
				INSTANCE,
				"getMembers"
			), ():void => {

				it( hasSignature(
					[ "T" ], [
						{name: "includeNonReadable", type: "boolean", optional: true, description: "By default this option is set to `true`."},
						{name: "retrievalPreferences", type: "Carbon.RetrievalPreferences.Class", optional: true},
					],
					{type: "Promise<[ (T & Carbon.PersistedDocument.Class)[], Carbon.HTTP.Response.Class ]>"}
				), ():void => {
					expect( document.getMembers ).toBeDefined();
					expect( Utils.isFunction( document.getMembers ) ).toBeDefined();

					let spy:jasmine.Spy = spyOn( document._documents, "getMembers" );

					document.getMembers();
					expect( spy ).toHaveBeenCalledWith( "http://example.com/document/", true, undefined );
					spy.calls.reset();

					document.getMembers( false );
					expect( spy ).toHaveBeenCalledWith( "http://example.com/document/", false, undefined );
					spy.calls.reset();

					let retrievalPreferences:RetrievalPreferences.Class = {
						limit: 10,
						offset: 0,
						orderBy: [ {"@id": "http://example.com/ns#string", "@type": "string"} ],
					};

					document.getMembers( false, retrievalPreferences );
					expect( spy ).toHaveBeenCalledWith( "http://example.com/document/", false, retrievalPreferences );
					spy.calls.reset();

					document.getMembers( true, retrievalPreferences );
					expect( spy ).toHaveBeenCalledWith( "http://example.com/document/", true, retrievalPreferences );
					spy.calls.reset();

					document.getMembers( retrievalPreferences );
					expect( spy ).toHaveBeenCalledWith( "http://example.com/document/", retrievalPreferences, undefined );
					spy.calls.reset();
				} );

			} );

			describe( method(
				INSTANCE,
				"removeMember"
			), ():void => {

				it( hasSignature(
					"Remove the specified resource Pointer as a member of the document.", [
						{name: "member", type: "Carbon.Pointer.Class", description: "Pointer object that references the resource to remove as a member."},
					],
					{type: "Promise<Carbon.HTTP.Response.Class>"}
				), ():void => {
					expect( document.removeMember ).toBeDefined();
					expect( Utils.isFunction( document.removeMember ) ).toBeDefined();

					let spy:jasmine.Spy = spyOn( document._documents, "removeMember" );

					let pointer:Pointer.Class = context.documents.getPointer( "remove-member/" );
					document.removeMember( pointer );

					expect( spy ).toHaveBeenCalledWith( "http://example.com/document/", pointer );
				} );

				it( hasSignature(
					"Remove the specified resource URI as a member of the document.", [
						{name: "memberURI", type: "string", description: "URI of the resource to remove as a member."},
					],
					{type: "Promise<Carbon.HTTP.Response.Class>"}
				), ():void => {
					expect( document.removeMember ).toBeDefined();
					expect( Utils.isFunction( document.removeMember ) ).toBeDefined();

					let spy:jasmine.Spy = spyOn( document._documents, "removeMember" );

					document.removeMember( "remove-member/" );

					expect( spy ).toHaveBeenCalledWith( "http://example.com/document/", "remove-member/" );
				} );

			} );

			it( hasMethod(
				INSTANCE,
				"removeMembers",
				"Remove the specified resources URI or Pointers as members of the document.", [
					{name: "members", type: "(Carbon.Pointer.Class | string)[]", description: "Array of string URIs or Pointers to remove as members"},
				],
				{type: "Promise<Carbon.HTTP.Response.Class>"}
			), ():void => {
				expect( document.removeMembers ).toBeDefined();
				expect( Utils.isFunction( document.removeMembers ) ).toBeDefined();

				let spy:jasmine.Spy = spyOn( document._documents, "removeMembers" );

				let pointers:Pointer.Class[] = [];
				pointers.push( context.documents.getPointer( "remove-member/" ) );
				document.removeMembers( pointers );

				expect( spy ).toHaveBeenCalledWith( "http://example.com/document/", pointers );
			} );

			it( hasMethod(
				INSTANCE,
				"removeAllMembers",
				"Remove the specified resources URI or Pointers as members of the document.", [
					{name: "members", type: "(Carbon.Pointer.Class | string)[]", description: "Array of string URIs or Pointers to remove as members"},
				],
				{type: "Promise<Carbon.HTTP.Response.Class>"}
			), ():void => {
				expect( document.removeAllMembers ).toBeDefined();
				expect( Utils.isFunction( document.removeAllMembers ) ).toBeDefined();

				let spy:jasmine.Spy = spyOn( document._documents, "removeAllMembers" );

				document.removeAllMembers();

				expect( spy ).toHaveBeenCalledWith( "http://example.com/document/" );
			} );

			describe( method(
				INSTANCE,
				"upload",
				"Upload a File to the server as a child of the Container."
			), ():void => {

				it( hasSignature( [
						{name: "slug", type: "string", description: "The slug that will be used in the URI of the data."},
						{name: "data", type: "Blob", description: "Binary data to store in the server. The Blob works in a Browser."},
					],
					{type: "Promise<[ Carbon.Pointer.Class, Carbon.HTTP.Response.Class ]>"}
				), ():void => {
					expect( document.upload ).toBeDefined();
					expect( Utils.isFunction( document.upload ) ).toBeDefined();

					if( typeof Blob !== "undefined" ) {
						let spy:jasmine.Spy = spyOn( document._documents, "upload" );

						let blob:Blob = new Blob( [ JSON.stringify( {"some content": "for the blob."} ) ], {type: "application/json"} );
						document.upload( "child", blob );

						expect( spy ).toHaveBeenCalledWith( "http://example.com/document/", "child", blob );
					}
				} );

				it( hasSignature( [
						{name: "data", type: "Blob", description: "Binary data to store in the server. The Blob works in a Browser."},
					],
					{type: "Promise<[ Carbon.Pointer.Class, Carbon.HTTP.Response.Class ]>"}
				), ():void => {
					expect( document.upload ).toBeDefined();
					expect( Utils.isFunction( document.upload ) ).toBeDefined();

					if( typeof Blob !== "undefined" ) {
						let spy:jasmine.Spy = spyOn( document._documents, "upload" );

						let blob:Blob = new Blob( [ JSON.stringify( {"some content": "for the blob."} ) ], {type: "application/json"} );
						document.upload( blob );

						expect( spy ).toHaveBeenCalledWith( "http://example.com/document/", blob );
					}
				} );

				it( hasSignature( [
						{name: "slug", type: "string", description: "The slug that will be used in the URI of the data."},
						{name: "data", type: "Buffer", description: "Binary data to store in the server. The Buffer only works in Node.js."},
					],
					{type: "Promise<[ Carbon.Pointer.Class, Carbon.HTTP.Response.Class ]>"}
				), ():void => {
					expect( document.upload ).toBeDefined();
					expect( Utils.isFunction( document.upload ) ).toBeDefined();

					if( typeof Buffer !== "undefined" ) {
						let spy:jasmine.Spy = spyOn( document._documents, "upload" );

						let buffer:Buffer = new Buffer( JSON.stringify( {"some content": "for the buffer."} ) );
						document.upload( "child", buffer );

						expect( spy ).toHaveBeenCalledWith( "http://example.com/document/", "child", buffer );
					}
				} );

				it( hasSignature( [
						{name: "data", type: "Buffer", description: "Binary data to store in the server. The Buffer only works in Node.js."},
					],
					{type: "Promise<[ Carbon.Pointer.Class, Carbon.HTTP.Response.Class ]>"}
				), ():void => {
					expect( document.upload ).toBeDefined();
					expect( Utils.isFunction( document.upload ) ).toBeDefined();

					if( typeof Buffer !== "undefined" ) {
						let spy:jasmine.Spy = spyOn( document._documents, "upload" );

						let buffer:Buffer = new Buffer( JSON.stringify( {"some content": "for the buffer."} ) );
						document.upload( buffer );

						expect( spy ).toHaveBeenCalledWith( "http://example.com/document/", buffer );
					}
				} );

			} );

			it( hasMethod(
				INSTANCE,
				"executeRawASKQuery",
				"Executes an ASK query in the document and returns a raw application/sparql-results+json object.", [
					{name: "askQuery", type: "string"},
					{name: "requestOptions", type: "Carbon.HTTP.Request.Options", optional: true, description: "Customizable options for the request."},
				],
				{type: "Promise<[ Carbon.SPARQL.RawResults.Class, Carbon.HTTP.Response.Class ]>"}
			), ():void => {
				expect( document.executeRawASKQuery ).toBeDefined();
				expect( Utils.isFunction( document.executeRawASKQuery ) ).toBe( true );

				let spy:jasmine.Spy = spyOn( context.documents, "executeRawASKQuery" );
				document.executeRawASKQuery( "ASK { ?subject, ?predicate, ?object }" );
				expect( spy ).toHaveBeenCalledWith( document.id, "ASK { ?subject, ?predicate, ?object }", {} );
			} );

			it( hasMethod(
				INSTANCE,
				"executeASKQuery",
				"Executes an ASK query in the document and returns a boolean of th result.", [
					{name: "askQuery", type: "string"},
					{name: "requestOptions", type: "Carbon.HTTP.Request.Options", optional: true, description: "Customizable options for the request."},
				],
				{type: "Promise<[ boolean, Carbon.HTTP.Response.Class ]>"}
			), ():void => {
				expect( document.executeASKQuery ).toBeDefined();
				expect( Utils.isFunction( document.executeASKQuery ) ).toBe( true );

				let spy:jasmine.Spy = spyOn( context.documents, "executeASKQuery" );
				document.executeASKQuery( "ASK { ?subject, ?predicate, ?object }" );
				expect( spy ).toHaveBeenCalledWith( document.id, "ASK { ?subject, ?predicate, ?object }", {} );
			} );

			it( hasMethod(
				INSTANCE,
				"executeRawSELECTQuery",
				"Executes an SELECT query in the document and returns a raw application/sparql-results+json object.", [
					{name: "selectQuery", type: "string"},
					{name: "requestOptions", type: "Carbon.HTTP.Request.Options", optional: true, description: "Customizable options for the request."},
				],
				{type: "Promise<[ Carbon.SPARQL.RawResults.Class, Carbon.HTTP.Response.Class ]>"}
			), ():void => {
				expect( document.executeRawSELECTQuery ).toBeDefined();
				expect( Utils.isFunction( document.executeRawSELECTQuery ) ).toBe( true );

				let spy:jasmine.Spy = spyOn( context.documents, "executeRawSELECTQuery" );
				document.executeRawSELECTQuery( "SELECT ?book ?title WHERE { <http://example.com/some-document/> ?book ?title }" );
				expect( spy ).toHaveBeenCalledWith( document.id, "SELECT ?book ?title WHERE { <http://example.com/some-document/> ?book ?title }", {} );
			} );

			it( hasMethod(
				INSTANCE,
				"executeSELECTQuery",
				"Executes an SELECT query in the document and returns the results as a `Carbon.SPARQL.SELECTResults.Class` object.", [
					{name: "selectQuery", type: "string"},
					{name: "requestOptions", type: "Carbon.HTTP.Request.Options", optional: true, description: "Customizable options for the request."},
				],
				{type: "Promise<[ Carbon.SPARQL.SELECTResults.Class, Carbon.HTTP.Response.Class ]>"}
			), ():void => {
				expect( document.executeSELECTQuery ).toBeDefined();
				expect( Utils.isFunction( document.executeSELECTQuery ) ).toBe( true );

				let spy:jasmine.Spy = spyOn( context.documents, "executeSELECTQuery" );
				document.executeSELECTQuery( "SELECT ?book ?title WHERE { <http://example.com/some-document/> ?book ?title }" );
				expect( spy ).toHaveBeenCalledWith( document.id, "SELECT ?book ?title WHERE { <http://example.com/some-document/> ?book ?title }", {} );
			} );

			it( hasMethod(
				INSTANCE,
				"executeRawCONSTRUCTQuery",
				"Executes an CONSTRUCT query in the document and returns a string with the resulting model.", [
					{name: "constructQuery", type: "string"},
					{name: "requestOptions", type: "Carbon.HTTP.Request.Options", optional: true, description: "Customizable options for the request."},
				],
				{type: "Promise<[ string, Carbon.HTTP.Response.Class ]>"}
			), ():void => {
				expect( document.executeRawCONSTRUCTQuery ).toBeDefined();
				expect( Utils.isFunction( document.executeRawCONSTRUCTQuery ) ).toBe( true );

				let spy:jasmine.Spy = spyOn( context.documents, "executeRawCONSTRUCTQuery" );
				document.executeRawCONSTRUCTQuery( "CONSTRUCT { ?subject ?predicate ?object } WHERE { ?subject ?predicate ?object }" );
				expect( spy ).toHaveBeenCalledWith( document.id, "CONSTRUCT { ?subject ?predicate ?object } WHERE { ?subject ?predicate ?object }", {} );
			} );

			it( hasMethod(
				INSTANCE,
				"executeRawDESCRIBEQuery",
				"Executes an DESCRIBE query in the document and returns a string with the resulting model.", [
					{name: "constructQuery", type: "string"},
					{name: "requestOptions", type: "Carbon.HTTP.Request.Options", optional: true, description: "Customizable options for the request."},
				],
				{type: "Promise<[ string, Carbon.HTTP.Response.Class ]>"}
			), ():void => {
				expect( document.executeRawDESCRIBEQuery ).toBeDefined();
				expect( Utils.isFunction( document.executeRawDESCRIBEQuery ) ).toBe( true );

				let spy:jasmine.Spy = spyOn( context.documents, "executeRawDESCRIBEQuery" );
				document.executeRawDESCRIBEQuery( "DESCRIBE { ?subject ?predicate ?object } WHERE { ?subject ?predicate ?object }" );
				expect( spy ).toHaveBeenCalledWith( document.id, "DESCRIBE { ?subject ?predicate ?object } WHERE { ?subject ?predicate ?object }", {} );
			} );

			it( hasMethod(
				INSTANCE,
				"executeUPDATE",
				"Executes an UPDATE query.", [
					{name: "updateQuery", type: "string", description: "UPDATE query to execute in the selected endpoint."},
					{name: "requestOptions", type: "Carbon.HTTP.Request.Options", optional: true, description: "Customizable options for the request."},
				],
				{type: "Promise<Carbon.HTTP.Response.Class>"}
			), ():void => {
				expect( document.executeUPDATE ).toBeDefined();
				expect( Utils.isFunction( document.executeUPDATE ) ).toBe( true );

				let spy:jasmine.Spy = spyOn( context.documents, "executeUPDATE" );
				document.executeUPDATE( `INSERT DATA { GRAPH <http://example.com/some-document/> { <http://example.com/some-document/> <http://example.com/ns#propertyString> "Property Value" } }` );
				expect( spy ).toHaveBeenCalledWith( document.id, `INSERT DATA { GRAPH <http://example.com/some-document/> { <http://example.com/some-document/> <http://example.com/ns#propertyString> "Property Value" } }`, {} );
			} );

		} );

	} );

} );
