import * as Document from "./Document";
import * as Documents from "./Documents";
import * as ServiceAwareDocument from "./ServiceAwareDocument";
import DefaultExport from "./ServiceAwareDocument";
import { clazz, extendsClass, hasDefaultExport, hasMethod, hasProperty, interfaze, module, OBLIGATORY, STATIC } from "./test/JasmineExtender";

describe( module( "Carbon/ServiceAwareDocument" ), ():void => {

	describe( interfaze(
		"Carbon.ServiceAwareDocument.Class",
		"Interface that has a reference to its `Carbon.Documents.Class`."
	), ():void => {

		it( extendsClass( "Carbon.Document.Class" ), ():void => {} );

		it( hasProperty(
			OBLIGATORY,
			"_documents",
			"Carbon.Documents.Class",
			"Reference to the Documents instance where this documents belongs to."
		), ():void => {
			const serviceAwareDocument:ServiceAwareDocument.Class = <any> {};
			serviceAwareDocument._documents;
		} );

	} );

	describe( clazz(
		"Carbon.ServiceAwareDocument.Factory",
		"Factory class for `Carbon.DocumentDocumented.Class` objects."
	), ():void => {

		it( hasMethod(
			STATIC,
			"hasClassProperties",
			"Returns true if the object has the specific properties of the `Carbon.ServiceAwareDocument.Class` interface.",
			[
				{ name: "object", type: "object", description: "The object to be tested." },
			],
			{ type: "boolean" }
		), ():void => {
			expect( ServiceAwareDocument.Factory.hasClassProperties ).toBeDefined();
		} );

		it( hasMethod(
			STATIC,
			"decorate",
			[ "T extends Carbon.Document.Class" ],
			"Decorates the provided document with the properties of the `Carbon.ServiceAwareDocument.Class` interface.",
			[
				{ name: "document", type: "T", description: "Document object to decorate." },
				{ name: "documents", type: "Carbon.Documents.Class", description: "Documents instance where the provided document will belong to." },
			],
			{ type: "T & Carbon.ServiceAwareDocument.Class" }
		), ():void => {
			expect( ServiceAwareDocument.Factory.decorate ).toBeDefined();
		} );

	} );

	it( hasDefaultExport( "Carbon.ServiceAwareDocument.Class" ), ():void => {
		const defaultTarget:ServiceAwareDocument.Class = <DefaultExport> {};
		expect( defaultTarget ).toBeDefined();
	} );
} );


describe( "Carbon.ServiceAwareDocument.Factory", ():void => {

	it( "should exists", ():void => {
		expect( ServiceAwareDocument.Factory ).toBeDefined();
		expect( ServiceAwareDocument.Factory ).toEqual( jasmine.any( Function ) );
	} );

	describe( "hasClassProperties", ():void => {

		it( "should exists", ():void => {
			expect( ServiceAwareDocument.Factory.hasClassProperties ).toBeDefined();
			expect( ServiceAwareDocument.Factory.hasClassProperties ).toEqual( jasmine.any( Function ) );
		} );

		it( "should return false if falsy is provided", ():void => {
			expect( ServiceAwareDocument.Factory.hasClassProperties( void 0 ) ).toBe( false );
			expect( ServiceAwareDocument.Factory.hasClassProperties( null ) ).toBe( false );
		} );

		it( "should return false if has a missing class property", ():void => {
			const object:Partial<ServiceAwareDocument.Class> = {
				_documents: null,
			};

			expect( ServiceAwareDocument.Factory.hasClassProperties( object ) ).toBe( true );

			delete object._documents;
			expect( ServiceAwareDocument.Factory.hasClassProperties( object ) ).toBe( false );
			object._documents = null;
		} );

	} );

	describe( "decorate", ():void => {

		it( "should exists", ():void => {
			expect( ServiceAwareDocument.Factory.decorate ).toBeDefined();
			expect( ServiceAwareDocument.Factory.decorate ).toEqual( jasmine.any( Function ) );
		} );

		it( "should return the same reference of the object provided", ():void => {
			const documents:Documents.Class = new Documents.Class();
			const object:Document.Class = Document.Factory.createFrom( {
				_documents: null,
			} );

			const decoratedObject:ServiceAwareDocument.Class = ServiceAwareDocument.Factory.decorate( object, documents );
			expect( object ).toBe( decoratedObject );
		} );

		it( "should not decorate if already has the specific properties", ():void => {
			const documents:Documents.Class = new Documents.Class();
			const object:Document.Class = Document.Factory.createFrom( {
				_documents: null,
			} );

			const decoratedObject:ServiceAwareDocument.Class = ServiceAwareDocument.Factory.decorate( object, documents );
			expect( decoratedObject._documents ).toBeNull();
		} );

		it( "should add the new properties", ():void => {
			const documents:Documents.Class = new Documents.Class();
			const object:Document.Class = Document.Factory.create();

			const decoratedObject:ServiceAwareDocument.Class = ServiceAwareDocument.Factory.decorate( object, documents );
			expect( decoratedObject ).toEqual( jasmine.objectContaining( {
				_documents: documents,
			} ) );
		} );

	} );

} );
