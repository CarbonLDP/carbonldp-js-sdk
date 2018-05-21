import { createMockContext } from "../../test/helpers/mocks";
import { AbstractContext } from "../AbstractContext";
import { MessagingDocument } from "../Messaging";
import {
	extendsClass,
	hasMethod,
	hasProperty,
	hasSignature,
	interfaze,
	isDefined,
	method,
	module,
	OBLIGATORY,
	OPTIONAL,
	property,
	STATIC,
} from "../test/JasmineExtender";
import { CRUDDocument } from "./CRUDDocument";
import { Document } from "./Document";
import { MembersDocument } from "./MembersDocument";
import { QueryDocumentDocument } from "./QueryDocumentDocument";
import { SPARQLDocument } from "./SPARQLDocument";


describe( module( "carbonldp/Document" ), ():void => {

	describe( interfaze(
		"CarbonLDP.Document",
		"Interface that represents a persisted blank node of a persisted document."
	), ():void => {

		it( extendsClass( "CarbonLDP.TransientDocument" ), ():void => {} );
		it( extendsClass( "CarbonLDP.Resource" ), ():void => {} );
		it( extendsClass( "CarbonLDP.Messaging.MessagingDocument" ), ():void => {} );

		it( hasProperty(
			OPTIONAL,
			"created",
			"Date",
			"The time when the document was persisted."
		), ():void => {} );

		it( hasProperty(
			OPTIONAL,
			"modified",
			"Date",
			"The last time the document was saved."
		), ():void => {} );

		it( hasProperty(
			OPTIONAL,
			"defaultInteractionModel",
			"CarbonLDP.Pointer",
			"A Pointer representing the default interaction model of the document."
		), ():void => {} );

		it( hasProperty(
			OPTIONAL,
			"isMemberOfRelation",
			"CarbonLDP.Pointer",
			"A Pointer with the member of relation of the document."
		), ():void => {} );

		it( hasProperty(
			OPTIONAL,
			"hasMemberRelation",
			"CarbonLDP.Pointer",
			"A Pointer with the inverted relation the document."
		), ():void => {} );

		it( hasProperty(
			OPTIONAL,
			"accessPoints",
			"CarbonLDP.Pointer[]",
			"Array with the access points of the document."
		), ():void => {} );

		it( hasProperty(
			OPTIONAL,
			"contains",
			"CarbonLDP.Pointer",
			"Array with the children of the document."
		), ():void => {} );

		it( hasProperty(
			OBLIGATORY,
			"_eTag",
			"string",
			"The ETag (entity tag) of the persisted document."
		), ():void => {} );

		it( hasProperty(
			OBLIGATORY,
			"_fragmentsIndex",
			"Map<string, CarbonLDP.Fragment>",
			"Map that stores the persisted fragments (named fragments and blank nodes) of the document."
		), ():void => {} );

		it( hasProperty(
			OBLIGATORY,
			"_savedFragments",
			"CarbonLDP.Fragment[]",
			"Array with a copy of every fragment that that is currently persisted in the server."
		), ():void => {} );

		it( hasMethod(
			OBLIGATORY,
			"_syncSavedFragments",
			"Set all the current fragments in the document as fragments that are saved in the server."
		), ():void => {} );

		it( hasMethod(
			OBLIGATORY,
			"isLocallyOutDated",
			"Returns true when the document contains data of multiple requests with different versions of the resource."
		), ():void => {} );

		describe( method(
			OBLIGATORY,
			"createFragment"
		), ():void => {

			it( hasSignature(
				[ "T extends object" ],
				"Creates a Fragment from the object provided and the slug specified.", [
					{ name: "object", type: "T" },
					{ name: "slug", type: "string" },
				],
				{ type: "T & CarbonLDP.Fragment" }
			), ():void => {} );

			it( hasSignature(
				[ "T extends object" ],
				"Creates a BlankNode from the object provided, sing no slug was specified.", [
					{ name: "object", type: "T" },
				],
				{ type: "T & CarbonLDP.Fragment" }
			), ():void => {} );

			it( hasSignature(
				"Creates a Fragment with the slug provided.", [
					{ name: "slug", type: "string" },
				],
				{ type: "CarbonLDP.Fragment" }
			), ():void => {} );

			it( hasSignature(
				"Creates a BlankNode, since no slug is provided",
				{ type: "CarbonLDP.Fragment" }
			), ():void => {} );

		} );

		describe( method(
			OBLIGATORY,
			"createNamedFragment"
		), ():void => {

			it( hasSignature(
				"Creates a NamedFragment with the slug provided", [
					{ name: "slug", type: "string" },
				],
				{ type: "CarbonLDP.NamedFragment" }
			), ():void => {} );

			it( hasSignature(
				[ "T extends object" ],
				"Creates a NamedFragment from the object provided and the slug specified.", [
					{ name: "object", type: "T" },
					{ name: "slug", type: "string" },
				],
				{ type: "T & CarbonLDP.NamedFragment" }
			), ():void => {} );

		} );


		describe( method(
			OBLIGATORY,
			"addMember"
		), ():void => {

			it( hasSignature(
				"Adds the specified resource Pointer as a member of the document.", [
					{ name: "member", type: "CarbonLDP.Pointer", description: "Pointer object that references the resource to add as a member." },
				],
				{ type: "Promise<void>" }
			), ():void => {} );

			it( hasSignature(
				"Adds the specified resource URI as a member of the document.", [
					{ name: "memberURI", type: "string", description: "URI of the resource to add as a member." },
				],
				{ type: "Promise<void>" }
			), ():void => {} );

		} );

		it( hasMethod(
			OBLIGATORY,
			"addMembers",
			"Adds the specified resources as members of the document.", [
				{ name: "members", type: "(CarbonLDP.Pointer | string)[]", description: "Array of URIs or Pointers to add as members." },
			],
			{ type: "Promise<void>" }
		), ():void => {} );


		describe( method( OBLIGATORY, "listChildren" ), ():void => {

			it( hasSignature(
				[ "T extends object" ],
				"Retrieves the empty children of the document.", [
					{ name: "requestOptions", type: "CarbonLDP.HTTP.RequestOptions", optional: true, description: "Customizable options for the request." },
				],
				{ type: "Promise<(T & CarbonLDP.Document)[]>" }
			), ():void => {} );

		} );

		describe( method( OBLIGATORY, "getChildren" ), ():void => {

			it( hasSignature(
				[ "T extends object" ],
				"Retrieves the children of the document, building a query on which one is able to specify the properties to be retrieve and sub-documents' properties and on and on.", [
					{ name: "requestOptions", type: "CarbonLDP.HTTP.RequestOptions", optional: true, description: "Customizable options for the request." },
					{ name: "queryBuilderFn", type: "( queryBuilder:CarbonLDP.SPARQL.QueryDocument.QueryDocumentsBuilder ) => CarbonLDP.SPARQL.QueryDocument.QueryDocumentsBuilder", optional: true, description: "Function that receives a the builder that helps you to construct the children retrieval query.\nThe same builder must be returned." },
				],
				{ type: "Promise<(T & CarbonLDP.Document)[]>" }
			), ():void => {} );

			it( hasSignature(
				[ "T extends object" ],
				"Retrieves the children of the document, building a query on which one is able to specify the properties to be retrieve and sub-documents' properties and on and on.", [
					{ name: "queryBuilderFn", type: "( queryBuilder:CarbonLDP.SPARQL.QueryDocument.QueryDocumentsBuilder ) => CarbonLDP.SPARQL.QueryDocument.QueryDocumentsBuilder", optional: true, description: "Function that receives a the builder that helps you to construct the children retrieval query.\nThe same builder must be returned." },
				],
				{ type: "Promise<(T & CarbonLDP.Document)[]>" }
			), ():void => {} );

		} );


		describe( method( OBLIGATORY, "listMembers" ), ():void => {

			it( hasSignature(
				[ "T extends object" ],
				"Retrieves the empty members of the document.", [
					{ name: "requestOptions", type: "CarbonLDP.HTTP.RequestOptions", optional: true, description: "Customizable options for the request." },
				],
				{ type: "Promise<(T & CarbonLDP.Document)[]>" }
			), ():void => {} );

		} );

		describe( method( OBLIGATORY, "getMembers" ), ():void => {

			it( hasSignature(
				[ "T extends object" ],
				"Retrieves the members of the document, building a query on which one is able to specify the properties to be retrieve and sub-documents' properties and on and on.", [
					{ name: "requestOptions", type: "CarbonLDP.HTTP.RequestOptions", optional: true, description: "Customizable options for the request." },
					{ name: "queryBuilderFn", type: "( queryBuilder:CarbonLDP.SPARQL.QueryDocument.QueryDocumentsBuilder ) => CarbonLDP.SPARQL.QueryDocument.QueryDocumentsBuilder", optional: true, description: "Function that receives a the builder that helps you to construct the members retrieval query.\nThe same builder must be returned." },
				],
				{ type: "Promise<(T & CarbonLDP.Document)[]>" }
			), ():void => {} );

			it( hasSignature(
				[ "T extends object" ],
				"Retrieves the members of the document, building a query on which one is able to specify the properties to be retrieve and sub-documents' properties and on and on.", [
					{ name: "queryBuilderFn", type: "( queryBuilder:CarbonLDP.SPARQL.QueryDocument.QueryDocumentsBuilder ) => CarbonLDP.SPARQL.QueryDocument.QueryDocumentsBuilder", optional: true, description: "Function that receives a the builder that helps you to construct the members retrieval query.\nThe same builder must be returned." },
				],
				{ type: "Promise<(T & CarbonLDP.Document)[]>" }
			), ():void => {} );

		} );


		describe( method(
			OBLIGATORY,
			"removeMember"
		), ():void => {

			it( hasSignature(
				"Remove the specified resource Pointer as a member of the current document.", [
					{ name: "member", type: "CarbonLDP.Pointer", description: "Pointer object that references the resource to remove as a member." },
				],
				{ type: "Promise<void>" }
			), ():void => {} );

			it( hasSignature(
				"Remove the specified resource URI as a member of the current document.", [
					{ name: "memberURI", type: "string", description: "URI of the resource to remove as a member." },
				],
				{ type: "Promise<void>" }
			), ():void => {} );

		} );

		it( hasMethod(
			OBLIGATORY,
			"removeMembers",
			"Remove the specified resources URI or Pointers as members of the current document.", [
				{ name: "members", type: "(CarbonLDP.Pointer | string)[]", description: "Array of URIs or Pointers to remove as members" },
			],
			{ type: "Promise<void>" }
		), ():void => {} );

		it( hasMethod(
			OBLIGATORY,
			"removeAllMembers",
			"Remove the specified resources URI or Pointers as members of the current document.",
			{ type: "Promise<void>" }
		), ():void => {} );

		it( hasMethod(
			OBLIGATORY,
			"executeRawASKQuery",
			"Executes an ASK query in the document and returns a raw application/sparql-results+json object.", [
				{ name: "askQuery", type: "string" },
				{ name: "requestOptions", type: "CarbonLDP.HTTP.RequestOptions", optional: true, description: "Customizable options for the request." },
			],
			{ type: "Promise<CarbonLDP.SPARQL.SPARQLRawResults>" }
		), ():void => {} );

		it( hasMethod(
			OBLIGATORY,
			"executeASKQuery",
			"Executes an ASK query in the document and returns a boolean of the result.", [
				{ name: "askQuery", type: "string" },
				{ name: "requestOptions", type: "CarbonLDP.HTTP.RequestOptions", optional: true, description: "Customizable options for the request." },
			],
			{ type: "Promise<boolean>" }
		), ():void => {} );

		it( hasMethod(
			OBLIGATORY,
			"executeRawSELECTQuery",
			"Executes a SELECT query in the document and returns a raw application/sparql-results+json object.", [
				{ name: "selectQuery", type: "string" },
				{ name: "requestOptions", type: "CarbonLDP.HTTP.RequestOptions", optional: true, description: "Customizable options for the request." },
			],
			{ type: "Promise<CarbonLDP.SPARQL.SPARQLRawResults>" }
		), ():void => {} );

		it( hasMethod(
			OBLIGATORY,
			"executeSELECTQuery",
			[ "T extends object" ],
			"Executes a SELECT query in the document and returns the results as a `CarbonLDP.SPARQL.SPARQLSelectResults` object.", [
				{ name: "selectQuery", type: "string" },
				{ name: "requestOptions", type: "CarbonLDP.HTTP.RequestOptions", optional: true, description: "Customizable options for the request." },
			],
			{ type: "Promise<CarbonLDP.SPARQL.SPARQLSelectResults<T>>" }
		), ():void => {} );

		it( hasMethod(
			OBLIGATORY,
			"executeRawCONSTRUCTQuery",
			"Executes a CONSTRUCT query in the document and returns a string with the resulting model.", [
				{ name: "constructQuery", type: "string" },
				{ name: "requestOptions", type: "CarbonLDP.HTTP.RequestOptions", optional: true, description: "Customizable options for the request." },
			],
			{ type: "Promise<string>" }
		), ():void => {} );

		it( hasMethod(
			OBLIGATORY,
			"executeRawDESCRIBEQuery",
			"Executes a DESCRIBE query in the document and returns a string with the resulting model.", [
				{ name: "constructQuery", type: "string" },
				{ name: "requestOptions", type: "CarbonLDP.HTTP.RequestOptions", optional: true, description: "Customizable options for the request." },
			],
			{ type: "Promise<string>" }
		), ():void => {} );

		it( hasMethod(
			OBLIGATORY,
			"executeUPDATE",
			"Executes an UPDATE query.", [
				{ name: "updateQuery", type: "string", description: "UPDATE query to execute in the selected endpoint." },
				{ name: "requestOptions", type: "CarbonLDP.HTTP.RequestOptions", optional: true, description: "Customizable options for the request." },
			],
			{ type: "Promise<void>" }
		), ():void => {} );

		it( hasMethod(
			OBLIGATORY,
			"sparql",
			"Method that creates an instance of SPARQLER for the document end-point.",
			{ type: "SPARQLER/Clauses/QueryClause" }
		), ():void => {} );

	} );

	describe( interfaze(
		"CarbonLDP.DocumentFactory",
		"Interface with factory, decorate and utils methods for `CarbonLDP.Document` objects."
	), ():void => {

		it( hasMethod(
			OBLIGATORY,
			"isDecorated",
			"Returns true if the Document provided has the properties and methods of a `CarbonLDP.Document` object.", [
				{ name: "object", type: "object" },
			],
			{ type: "object is CarbonLDP.Document" }
		), ():void => {} );

		it( hasMethod(
			OBLIGATORY,
			"is",
			"Returns true if the element provided is considered a `CarbonLDP.Document` object.", [
				{ name: "value", type: "any" },
			],
			{ type: "value is CarbonLDP.Document" }
		), ():void => {} );

		it( hasMethod(
			OBLIGATORY,
			"create",
			[ "T extends object" ],
			"Creates a `CarbonLDP.TransientDocument` object with the data provided.", [
				{ name: "data", type: "T & CarbonLDP.BaseDocument", description: "Data to be used in the creation of the document." },
			],
			{ type: "T & CarbonLDP.TransientDocument" }
		), ():void => {} );

		it( hasMethod(
			OBLIGATORY,
			"createFrom",
			[ "T extends object" ],
			"Creates a Document object from the object provided.", [
				{ name: "object", type: "T & CarbonLDP.BaseDocument", description: "The object to be transformed in a document." },
			],
			{ type: "T & CarbonLDP.TransientDocument" }
		), ():void => {} );

		it( hasMethod(
			OBLIGATORY,
			"decorate",
			[ "T extends object" ],
			"Decorates the object provided with the properties and methods of a `CarbonLDP.Document` object.", [
				{ name: "object", type: "T" },
			],
			{ type: "T & CarbonLDP.Document" }
		), ():void => {} );

	} );

	describe( property(
		STATIC,
		"Document",
		"CarbonLDP.DocumentFactory",
		"Constant that implements the `CarbonLDP.DocumentFactory` interface."
	), ():void => {

		let context:AbstractContext<any, any>;
		beforeEach( ():void => {
			context = createMockContext( { uri: "http://example.com/" } );
		} );

		it( isDefined(), ():void => {
			expect( Document ).toBeDefined();
			expect( Document ).toEqual( jasmine.any( Object ) );
		} );

		describe( "Document.isDecorated", ():void => {

			it( "should exists", ():void => {
				expect( Document.isDecorated ).toBeDefined();
				expect( Document.isDecorated ).toEqual( jasmine.any( Function ) );
			} );


			let object:typeof Document.PROTOTYPE;
			beforeEach( ():void => {
				object = {
					created: null,
					modified: null,
					accessPoints: null,

					_savedFragments: null,
					_syncSavedFragments: ():any => {},

					isDirty: ():any => {},
					revert: ():any => {},

					get: ():any => {},
					resolve: ():any => {},

					refresh: ():any => {},
					save: ():any => {},
					saveAndRefresh: ():any => {},
				};
			} );


			it( "should return false when `undefined`", ():void => {
				expect( Document.isDecorated( void 0 ) ).toBe( false );
			} );

			it( "should return false when `null`", ():void => {
				expect( Document.isDecorated( null ) ).toBe( false );
			} );

			it( "should return true when prototype properties", ():void => {
				expect( Document.isDecorated( object ) ).toBe( true );
			} );


			it( "should return true when no accessPoints", ():void => {
				delete object.accessPoints;
				expect( Document.isDecorated( object ) ).toBe( true );
			} );

			it( "should return true when no created", ():void => {
				delete object.created;
				expect( Document.isDecorated( object ) ).toBe( true );
			} );

			it( "should return true when no modified", ():void => {
				delete object.modified;
				expect( Document.isDecorated( object ) ).toBe( true );
			} );


			it( "should return false when no _savedFragments", ():void => {
				delete object._savedFragments;
				expect( Document.isDecorated( object ) ).toBe( false );
			} );

			it( "should return false when no _syncSavedFragments", ():void => {
				delete object._syncSavedFragments;
				expect( Document.isDecorated( object ) ).toBe( false );
			} );


			it( "should return false when no isDirty", ():void => {
				delete object.isDirty;
				expect( Document.isDecorated( object ) ).toBe( false );
			} );

			it( "should return false when no revert", ():void => {
				delete object.revert;
				expect( Document.isDecorated( object ) ).toBe( false );
			} );


			it( "should return false when no refresh", ():void => {
				delete object.refresh;
				expect( Document.isDecorated( object ) ).toBe( false );
			} );

			it( "should return false when no save", ():void => {
				delete object.save;
				expect( Document.isDecorated( object ) ).toBe( false );
			} );

			it( "should return false when no saveAndRefresh", ():void => {
				delete object.saveAndRefresh;
				expect( Document.isDecorated( object ) ).toBe( false );
			} );

		} );

		describe( "Document.is", ():void => {

			it( "should exists", ():void => {
				expect( Document.is ).toBeDefined();
				expect( Document.is ).toEqual( jasmine.any( Function ) );
			} );


			let isCRUDDocument:jasmine.Spy;
			let isMembersDocument:jasmine.Spy;
			let isSPARQLDocument:jasmine.Spy;
			let isMessagingDocument:jasmine.Spy;
			let isQueryDocumentDocument:jasmine.Spy;
			beforeEach( ():void => {
				isCRUDDocument = spyOn( CRUDDocument, "is" )
					.and.returnValue( true );
				isMembersDocument = spyOn( MembersDocument, "isDecorated" )
					.and.returnValue( true );
				isSPARQLDocument = spyOn( SPARQLDocument, "isDecorated" )
					.and.returnValue( true );
				isMessagingDocument = spyOn( MessagingDocument, "isDecorated" )
					.and.returnValue( true );
				isQueryDocumentDocument = spyOn( QueryDocumentDocument, "isDecorated" )
					.and.returnValue( true );
			} );

			it( "should assert that is a CURDDocument", ():void => {
				Document.is( { the: "document" } );
				expect( isCRUDDocument ).toHaveBeenCalledWith( { the: "document" } );
			} );

			it( "should assert that is a MembersDocument", ():void => {
				Document.is( { the: "document" } );
				expect( isMembersDocument ).toHaveBeenCalledWith( { the: "document" } );
			} );

			it( "should assert that is SPARQLDocument", ():void => {
				Document.is( { the: "document" } );
				expect( isSPARQLDocument ).toHaveBeenCalledWith( { the: "document" } );
			} );

			it( "should assert that is MessagingDocument", ():void => {
				Document.is( { the: "document" } );
				expect( isMessagingDocument ).toHaveBeenCalledWith( { the: "document" } );
			} );

			it( "should assert that is QueryDocumentDocument", ():void => {
				Document.is( { the: "document" } );
				expect( isQueryDocumentDocument ).toHaveBeenCalledWith( { the: "document" } );
			} );

			it( "should assert is been decorated", ():void => {
				const spy:jasmine.Spy = spyOn( Document, "isDecorated" );

				Document.is( { the: "document" } );
				expect( spy ).toHaveBeenCalledWith( { the: "document" } );
			} );

			it( "should return true when all assertions passed", ():void => {
				spyOn( Document, "isDecorated" )
					.and.returnValue( true );

				const returned:boolean = Document.is( { the: "document" } );
				expect( returned ).toBe( true );
			} );

		} );

		describe( "Document.decorate", ():void => {

			it( "should exists", ():void => {
				expect( Document.decorate ).toBeDefined();
				expect( Document.decorate ).toEqual( jasmine.any( Function ) );
			} );


			it( "should decorate self properties", ():void => {
				const resource:Document = Document.decorate( {} );
				expect( Document.isDecorated( resource ) ).toBe( true );
			} );

			it( "should decorate fully properties", ():void => {
				const resource:Document = Document.decorate( {} );
				expect( Document.is( resource ) ).toBe( true );
			} );

			it( "should return same object reference", ():void => {
				const object:object = { the: "object" };
				const resource:Document = Document.decorate( object );
				expect( object ).toBe( resource );
			} );

		} );


		describe( "Document instance", ():void => {
		} );

	} );

} );
