import * as Document from "./Document";
import * as DocumentedDocument from "./DocumentedDocument";
import DefaultExport from "./DocumentedDocument";
import * as Documents from "./Documents";
import { clazz, extendsClass, hasDefaultExport, hasMethod, hasProperty, interfaze, module, OBLIGATORY, STATIC } from "./test/JasmineExtender";

describe( module( "Carbon/DocumentedDocument" ), ():void => {

	describe( interfaze(
		"Carbon.DocumentedDocument.Class",
		"Interface that has a reference to its `Carbon.Documents.Class`."
	), ():void => {

		it( extendsClass( "Carbon.Document.Class" ), ():void => {} );

		it( hasProperty(
			OBLIGATORY,
			"_documents",
			"Carbon.Documents.Class",
			"Reference to the Documents instance where this documents belongs to."
		), ():void => {
			const documentedDocument:DocumentedDocument.Class = <any> {};
			documentedDocument._documents;
		} );

	} );

	describe( clazz(
		"Carbon.DocumentedDocument.Factory",
		"Factory class for `Carbon.DocumentDocumented.Class` objects."
	), ():void => {

		it( hasMethod(
			STATIC,
			"hasClassProperties",
			"Returns true if the object has the specific properties of the `Carbon.DocumentedDocument.Class` interface.",
			[
				{ name: "object", type: "object", description: "The object to be tested." },
			],
			{ type: "boolean" }
		), ():void => {
			expect( DocumentedDocument.Factory.hasClassProperties ).toBeDefined();
		} );

		it( hasMethod(
			STATIC,
			"decorate",
			[ "T extends Carbon.Document.Class" ],
			"Decorates the provided document with the properties of the `Carbon.DocumentedDocument.Class` interface.",
			[
				{ name: "document", type: "T", description: "Document object to decorate." },
				{ name: "documents", type: "Carbon.Documents.Class", description: "Documents instance where the provided document will belong to." },
			],
			{ type: "T & Carbon.DocumentedDocument.Class" }
		), ():void => {
			expect( DocumentedDocument.Factory.decorate ).toBeDefined();
		} );

	} );

	it( hasDefaultExport( "Carbon.DocumentedDocument.Class" ), ():void => {
		const defaultTarget:DocumentedDocument.Class = <DefaultExport> {};
		expect( defaultTarget ).toBeDefined();
	} );
} );


describe( "Carbon.DocumentedDocument.Factory", ():void => {

	it( "should exists", ():void => {
		expect( DocumentedDocument.Factory ).toBeDefined();
		expect( DocumentedDocument.Factory ).toEqual( jasmine.any( Function ) );
	} );

	describe( "hasClassProperties", ():void => {

		it( "should exists", ():void => {
			expect( DocumentedDocument.Factory.hasClassProperties ).toBeDefined();
			expect( DocumentedDocument.Factory.hasClassProperties ).toEqual( jasmine.any( Function ) );
		} );

		it( "should return false if falsy is provided", ():void => {
			expect( DocumentedDocument.Factory.hasClassProperties( void 0 ) ).toBe( false );
			expect( DocumentedDocument.Factory.hasClassProperties( null ) ).toBe( false );
		} );

		it( "should return false if has a missing class property", ():void => {
			const object:Partial<DocumentedDocument.Class> = {
				_documents: null,
			};

			expect( DocumentedDocument.Factory.hasClassProperties( object ) ).toBe( true );

			delete object._documents;
			expect( DocumentedDocument.Factory.hasClassProperties( object ) ).toBe( false );
			object._documents = null;
		} );

	} );

	describe( "decorate", ():void => {

		it( "should exists", ():void => {
			expect( DocumentedDocument.Factory.decorate ).toBeDefined();
			expect( DocumentedDocument.Factory.decorate ).toEqual( jasmine.any( Function ) );
		} );

		it( "should return the same reference of the object provided", ():void => {
			const documents:Documents.Class = new Documents.Class();
			const object:Document.Class = Document.Factory.createFrom( {
				_documents: null,
			} );

			const decoratedObject:DocumentedDocument.Class = DocumentedDocument.Factory.decorate( object, documents );
			expect( object ).toBe( decoratedObject );
		} );

		it( "should not decorate if already has the specific properties", ():void => {
			const documents:Documents.Class = new Documents.Class();
			const object:Document.Class = Document.Factory.createFrom( {
				_documents: null,
			} );

			const decoratedObject:DocumentedDocument.Class = DocumentedDocument.Factory.decorate( object, documents );
			expect( decoratedObject._documents ).toBeNull();
		} );

		it( "should add the new properties", ():void => {
			const documents:Documents.Class = new Documents.Class();
			const object:Document.Class = Document.Factory.create();

			const decoratedObject:DocumentedDocument.Class = DocumentedDocument.Factory.decorate( object, documents );
			expect( decoratedObject ).toEqual( jasmine.objectContaining( {
				_documents: documents,
			} ) );
		} );

	} );

} );
