import { Minus } from "../test/helpers/types";

import { Document } from "./Document";
import { Documents } from "./Documents";
import DefaultExport, { ServiceAwareDocument } from "./ServiceAwareDocument";

import {
	extendsClass,
	hasDefaultExport,
	hasMethod,
	hasProperty,
	interfaze,
	module,
	OBLIGATORY,
	property,
	STATIC
} from "./test/JasmineExtender";

describe( module( "Carbon/ServiceAwareDocument" ), ():void => {

	describe( interfaze(
		"Carbon.ServiceAwareDocument.ServiceAwareDocument",
		"Interface that has a reference to its `Carbon.Documents.Documents`."
	), ():void => {

		it( extendsClass( "Carbon.Document.Document" ), ():void => {} );

		it( hasProperty(
			OBLIGATORY,
			"_documents",
			"Carbon.Documents.Documents",
			"Reference to the Documents instance where this documents belongs to."
		), ():void => {
			const target:ServiceAwareDocument[ "_documents" ] = {} as Documents;
			expect( target ).toBeDefined();
		} );

	} );

	describe( interfaze(
		"Carbon.ServiceAwareDocument.ServiceAwareDocumentConstant",
		"Interface with the factory, decorate adn utils methods od a `Carbon.ServiceAwareDocument.ServiceAwareDocument`"
	), ():void => {

		it( hasMethod(
			OBLIGATORY,
			"isDecorated",
			"Returns true if the object has the specific properties of the `Carbon.ServiceAwareDocument.ServiceAwareDocument` interface.",
			[
				{ name: "object", type: "object", description: "The object to be tested." },
			],
			{ type: "object is Carbon.ServiceAwareDocument.ServiceAwareDocument" }
		), ():void => {} );

		it( hasMethod(
			OBLIGATORY,
			"decorate",
			[ "T extends Carbon.Document.Document" ],
			"Decorates the provided document with the properties of the `Carbon.ServiceAwareDocument.ServiceAwareDocument` interface.",
			[
				{ name: "document", type: "T", description: "Document object to decorate." },
				{ name: "documents", type: "Carbon.Documents.Documents", description: "Documents instance where the provided document will belong to." },
			],
			{ type: "T & Carbon.ServiceAwareDocument.ServiceAwareDocument" }
		), ():void => {} );

	} );

	describe( property(
		STATIC,
		"ServiceAwareDocument",
		"Carbon.ServiceAwareDocument.ServiceAwareDocumentConstant",
		"Constant that implements the `Carbon.ServiceAwareDocument.ServiceAwareDocumentConstant` interface."
	), ():void => {

		it( "should exist", ():void => {
			expect( ServiceAwareDocument ).toBeDefined();
			expect( ServiceAwareDocument ).toEqual( jasmine.any( Object ) );
		} );

		describe( "ServiceAwareDocument.isDecorated", ():void => {

			it( "should exist", ():void => {
				expect( ServiceAwareDocument.isDecorated ).toBeDefined();
				expect( ServiceAwareDocument.isDecorated ).toEqual( jasmine.any( Function ) );
			} );

			it( "should return false if falsy is provided", ():void => {
				expect( ServiceAwareDocument.isDecorated( void 0 ) ).toBe( false );
				expect( ServiceAwareDocument.isDecorated( null ) ).toBe( false );
			} );

			it( "should return false if has a missing class property", ():void => {
				const object:Partial<ServiceAwareDocument> = {
					_documents: null,
				};

				expect( ServiceAwareDocument.isDecorated( object ) ).toBe( true );

				delete object._documents;
				expect( ServiceAwareDocument.isDecorated( object ) ).toBe( false );
				object._documents = null;
			} );

		} );

		describe( "ServiceAwareDocument.decorate", ():void => {

			it( "should exist", ():void => {
				expect( ServiceAwareDocument.decorate ).toBeDefined();
				expect( ServiceAwareDocument.decorate ).toEqual( jasmine.any( Function ) );
			} );

			it( "should return the same reference of the object provided", ():void => {
				const documents:Documents = new Documents();
				const object:object = {};

				const decoratedObject:ServiceAwareDocument = ServiceAwareDocument.decorate( object, documents );
				expect( object ).toBe( decoratedObject );
			} );

			it( "should not decorate if already has the specific properties", ():void => {
				const documents:Documents = new Documents();
				const object:Minus<Document, ServiceAwareDocument> = {
					_documents: null,
				};

				const decoratedObject:ServiceAwareDocument = ServiceAwareDocument.decorate( object, documents );
				expect( decoratedObject._documents ).toBeNull();
			} );

			it( "should add the new properties", ():void => {
				const documents:Documents = new Documents();
				const decoratedObject:ServiceAwareDocument = ServiceAwareDocument.decorate( {}, documents );
				expect( decoratedObject ).toEqual( jasmine.objectContaining( {
					_documents: documents,
				} ) );
			} );

		} );

	} );

	it( hasDefaultExport( "Carbon.ServiceAwareDocument.ServiceAwareDocument" ), ():void => {
		const defaultTarget:ServiceAwareDocument = <DefaultExport> {};
		expect( defaultTarget ).toBeDefined();
	} );

} );
