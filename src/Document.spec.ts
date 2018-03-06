import { Minus } from "../test/helpers/types";
import { BlankNode } from "./BlankNode";

import DefaultExport, { Document } from "./Document";

import { IDAlreadyInUseError } from "./Errors/IDAlreadyInUseError";
import { IllegalArgumentError } from "./Errors/IllegalArgumentError";
import { Fragment } from "./Fragment";
import * as JSONLDConverterModule from "./JSONLD/Converter";
import { JSONLDConverter } from "./JSONLD/Converter";
import { NamedFragment } from "./NamedFragment";
import {
	DigestedObjectSchema,
	ObjectSchemaDigester,
	ObjectSchemaResolver,
} from "./ObjectSchema";
import { Pointer } from "./Pointer";
import { RDFDocument } from "./RDF/Document";
import { URI } from "./RDF/URI";
import { Resource } from "./Resource";
import {
	extendsClass,
	hasDefaultExport,
	hasMethod,
	hasProperty,
	hasSignature,
	interfaze,
	method,
	module,
	OBLIGATORY,
	OPTIONAL,
	property,
	STATIC,
} from "./test/JasmineExtender";
import { C } from "./Vocabularies/C";
import { LDP } from "./Vocabularies/LDP";
import { XSD } from "./Vocabularies/XSD";


type DocumentProperties = Minus<Document, Resource>;

function mockDocumentProperties():DocumentProperties {
	return {
		hasMemberRelation: null,
		isMemberOfRelation: null,
		defaultInteractionModel: null,

		_fragmentsIndex: null,
		_normalize: ():any => {},
		_removeFragment: ():any => {},

		hasPointer: ():any => {},
		getPointer: ():any => {},

		inScope: ():any => {},

		hasFragment: ():any => {},
		getFragment: ():any => {},
		getNamedFragment: ():any => {},
		getFragments: ():any => {},
		createFragment: ():any => {},
		createNamedFragment: ():any => {},
		removeNamedFragment: ():any => {},
		toJSON: ():any => {},
	};
}

function createMockDocument<T extends {}>( origin:T = {} as T ):T & Document {
	return Document.createFrom( Object.assign( origin, { id: "https://example.com/document/" } ) );
}


describe( module( "Carbon/Document" ), ():void => {

	describe( interfaze(
		"Carbon.Document.Document",
		"Interface that represents an in-memory Carbon LDP Document."
	), ():void => {

		it( hasProperty(
			OPTIONAL,
			"defaultInteractionModel",
			"Carbon.Pointer.Pointer",
			"A Pointer URI representing the default interaction model of the document when persisted."
		), ():void => {} );

		it( hasProperty(
			OPTIONAL,
			"isMemberOfRelation",
			"Carbon.Pointer.Pointer",
			"A Pointer with the member of relation of the document."
		), ():void => {} );

		it( hasProperty(
			OPTIONAL,
			"hasMemberRelation",
			"Carbon.Pointer.Pointer",
			"A Pointer with the inverted relation the document will have."
		), ():void => {} );

		it( hasProperty(
			OBLIGATORY,
			"_fragmentsIndex",
			"Map<string, Carbon.Fragment.Fragment>",
			"Map that stores the fragments (named fragments and blank nodes) of the Document."
		), ():void => {} );

		it( hasMethod(
			OBLIGATORY,
			"_normalize",
			"Search over the document for normal objects to convert into fragments, and unused fragments to eliminate."
		), ():void => {} );

		it( hasMethod(
			OBLIGATORY,
			"hasPointer",
			"Returns true if the Document has a pointer referenced by the URI provided.", [
				{ name: "id", type: "string" },
			],
			{ type: "boolean" }
		), ():void => {} );

		it( hasMethod(
			OBLIGATORY,
			"getPointer",
			"Returns the pointer referenced by the URI provided. If no pointer exists, one is created and then returned.\n" +
			"Returns `null` if the URI is outside the scope of the Document.", [
				{ name: "id", type: "string" },
			],
			{ type: "boolean" }
		), ():void => {} );

		describe( method(
			OBLIGATORY,
			"inScope"
		), ():void => {

			it( hasSignature(
				"Returns true if the pointer provided is inside the scope of the Document.", [
					{ name: "pointer", type: "Carbon.Pointer.Pointer" },
				],
				{ type: "boolean" }
			), ():void => {} );

			it( hasSignature(
				"Returns true if the URI provided is inside the scope of the Document.", [
					{ name: "id", type: "string" },
				],
				{ type: "boolean" }
			), ():void => {} );

		} );

		it( hasMethod(
			OBLIGATORY,
			"hasFragment",
			"Returns true if the Document has the fragment referenced by the ID provided.", [
				{ name: "id", type: "string" },
			],
			{ type: "boolean" }
		), ():void => {} );

		it( hasMethod(
			OBLIGATORY,
			"getFragment",
			[ "T" ],
			"Returns the fragment referenced by the ID provided.\n" +
			"Returns `null` if no fragment exists in the Document.", [
				{ name: "id", type: "string" },
			],
			{ type: "T & Carbon.Fragment.Fragment" }
		), ():void => {} );

		it( hasMethod(
			OBLIGATORY,
			"getNamedFragment",
			[ "T" ],
			"Returns the fragment referenced by the ID provided.\n" +
			"Returns `null` if no fragment exists in the Document.", [
				{ name: "id", type: "string" },
			],
			{ type: "T & Carbon.Fragment.Fragment" }
		), ():void => {} );

		it( hasMethod(
			OBLIGATORY,
			"getFragments",
			"Returns an array with all the fragments in the Document.",
			{ type: "Carbon.Fragment.Fragment[]" }
		), ():void => {} );

		describe( method(
			OBLIGATORY,
			"createFragment"
		), ():void => {

			it( hasSignature(
				[ "T" ],
				"Creates a `Carbon.NamedFragment.NamedFragment` from the object provided and the slug specified.\n" +
				"If the slug has the form of a BlankNode ID, a `Carbon.Fragment.Fragment` is created instead.", [
					{ name: "object", type: "T" },
					{ name: "slug", type: "string" },
				],
				{ type: "T & Carbon.Fragment.Fragment" }
			), ():void => {} );

			it( hasSignature(
				[ "T" ],
				"Creates a `Carbon.Fragment.Fragment` from the object provided, since no slug is specified.", [
					{ name: "object", type: "object" },
				],
				{ type: "T & Carbon.Fragment.Fragment" }
			), ():void => {} );

			it( hasSignature(
				"Creates an empty `Carbon.NamedFragment.NamedFragment` with the slug specified.\n" +
				"If the slug has the form of a BlankNode ID, a `Carbon.Fragment.Fragment` is created instead.", [
					{ name: "slug", type: "string" },
				],
				{ type: "Carbon.Fragment.Fragment" }
			), ():void => {} );

			it( hasSignature(
				"Creates an empty `Carbon.Fragment.Fragment`, since no slug is provided.",
				{ type: "Carbon.Fragment.Fragment" }
			), ():void => {} );

		} );

		describe( method(
			OBLIGATORY,
			"createNamedFragment"
		), ():void => {

			it( hasSignature(
				"Creates a `Carbon.NamedFragment.NamedFragment` with the slug provided.\n" +
				"If the slug has the form of a BlankNode ID, an Error is thrown.", [
					{ name: "slug", type: "string" },
				],
				{ type: "Carbon.NamedFragment.NamedFragment" }
			), ():void => {} );

			it( hasSignature(
				[ "T" ],
				"Creates a `Carbon.NamedFragment.NamedFragment` from the object provided and the slug specified.\n" +
				"If the slug has the form of a BlankNode ID, an Error is thrown.", [
					{ name: "object", type: "T" },
					{ name: "slug", type: "string" },
				],
				{ type: "T & Carbon.NamedFragment.NamedFragment" }
			), ():void => {} );

		} );

		describe( method(
			OBLIGATORY,
			"_removeFragment"
		), ():void => {

			it( hasSignature(
				"Remove the fragment referenced by the `Carbon.Fragment.Fragment` provided from the Document.", [
					{ name: "fragment", type: "Carbon.Fragment.Fragment" },
				]
			), ():void => {} );

			it( hasSignature(
				"Remove the fragment referenced by the Slug provided from the Document.", [
					{ name: "slug", type: "string" },
				]
			), ():void => {} );

		} );

		describe( method(
			OBLIGATORY,
			"removeNamedFragment"
		), ():void => {

			it( hasSignature(
				"Remove the maned fragment referenced by the `Carbon.NamedFragment.NamedFragment` provided from the Document.", [
					{ name: "fragment", type: "Carbon.NamedFragment.NamedFragment" },
				]
			), ():void => {} );

			it( hasSignature(
				"Remove the named fragment referenced by the Slug provided from the Document.", [
					{ name: "slug", type: "string" },
				]
			), ():void => {} );

		} );

		describe( method(
			OBLIGATORY,
			"toJSON"
		), ():void => {

			it( hasSignature(
				"Returns a JSON string from the Document using the ObjectSchema and then JSONLDConverter if provided.", [
					{ name: "objectSchemaResolver", type: "Carbon.ObjectSchema.ObjectSchemaResolver", optional: true },
					{ name: "jsonLDConverter", type: "Carbon.JSONLDConverter.Class", optional: true },
				],
				{ type: "Carbon.RDF.Document.RDFDocument" }
			), ():void => {} );

		} );

	} );

	describe( interfaze(
		"Carbon.Document.DocumentFactory",
		"Interface with the factory, decorate and utils for `Carbon.Document.Document` objects."
	), ():void => {

		it( extendsClass( "Carbon.ModelFactory.ModelFactory<Carbon.Document.Document>" ), ():void => {} );
		it( extendsClass( "Carbon.ModelDecorator.ModelDecorator<Carbon.Document.Document>" ), ():void => {} );

	} );

	describe( property(
		STATIC,
		"Document",
		"Carbon.Document.DocumentFactory",
		"Constant that implements the `Carbon.Document.DocumentFactory` interface."
	), ():void => {

		describe( "Document.TYPE", ():void => {

			it( "should exists", ():void => {
				expect( Document.TYPE ).toBeDefined();
				expect( Document.TYPE ).toEqual( jasmine.any( String ) );
			} );

			it( "should be `c:Document`", ():void => {
				expect( Document.TYPE ).toBe( C.Document );
			} );

		} );

		describe( "Document.SCHEMA", ():void => {

			it( "should exists", ():void => {
				expect( Document.SCHEMA ).toBeDefined();
				expect( Document.SCHEMA ).toEqual( jasmine.any( Object ) );
			} );

			it( "should have `contains` definition", ():void => {
				expect( Document.SCHEMA[ "contains" ] ).toEqual( {
					"@id": LDP.contains,
					"@container": "@set",
					"@type": "@id",
				} );
			} );

			it( "should have `members` definition", ():void => {
				expect( Document.SCHEMA[ "members" ] ).toEqual( {
					"@id": LDP.member,
					"@container": "@set",
					"@type": "@id",
				} );
			} );

			it( "should have `membershipResource` definition", ():void => {
				expect( Document.SCHEMA[ "membershipResource" ] ).toEqual( {
					"@id": LDP.membershipResource,
					"@type": "@id",
				} );
			} );

			it( "should have `isMemberOfRelation` definition", ():void => {
				expect( Document.SCHEMA[ "isMemberOfRelation" ] ).toEqual( {
					"@id": LDP.isMemberOfRelation,
					"@type": "@id",
				} );
			} );

			it( "should have `hasMemberRelation` definition", ():void => {
				expect( Document.SCHEMA[ "hasMemberRelation" ] ).toEqual( {
					"@id": LDP.hasMemberRelation,
					"@type": "@id",
				} );
			} );

			it( "should have `insertContentRelation` definition", ():void => {
				expect( Document.SCHEMA[ "insertedContentRelation" ] ).toEqual( {
					"@id": LDP.insertedContentRelation,
					"@type": "@id",
				} );
			} );

			it( "should have `created` definition", ():void => {
				expect( Document.SCHEMA[ "created" ] ).toEqual( {
					"@id": C.created,
					"@type": XSD.dateTime,
				} );
			} );

			it( "should have `modified` definition", ():void => {
				expect( Document.SCHEMA[ "modified" ] ).toEqual( {
					"@id": C.modified,
					"@type": XSD.dateTime,
				} );
			} );

			it( "should have `defaultInteractionModel` definition", ():void => {
				expect( Document.SCHEMA[ "defaultInteractionModel" ] ).toEqual( {
					"@id": C.defaultInteractionModel,
					"@type": "@id",
				} );
			} );

			it( "should have `accessPoints` definition", ():void => {
				expect( Document.SCHEMA[ "accessPoints" ] ).toEqual( {
					"@id": C.accessPoint,
					"@type": "@id",
					"@container": "@set",
				} );
			} );

		} );

		describe( "Document.is", ():void => {

			it( "should exists", ():void => {
				expect( Document.is ).toBeDefined();
				expect( Document.is ).toEqual( jasmine.any( Function ) );
			} );

			it( "should return false when `undefined`", ():void => {
				expect( Document.is( void 0 ) ).toBe( false );
			} );

			it( "should return false when `null`", ():void => {
				expect( Document.is( null ) ).toBe( false );
			} );

			it( "should assert that is a `Resource`", ():void => {
				const spy:jasmine.Spy = spyOn( Resource, "is" );

				const target:object = { the: "object" };
				Document.is( target );

				expect( spy ).toHaveBeenCalledWith( target );
			} );

			it( "should assert that is decorated", ():void => {
				spyOn( Resource, "is" ).and.returnValue( true );
				const spy:jasmine.Spy = spyOn( Document, "isDecorated" );

				const target:object = { the: "object" };
				Document.is( target );

				expect( spy ).toHaveBeenCalledWith( target );
			} );

			it( "should assert that is a document", ():void => {
				spyOn( Resource, "is" ).and.returnValue( true );
				spyOn( Document, "isDecorated" ).and.returnValue( true );

				expect( Document.is( {} ) ).toBe( true );
			} );

		} );

		describe( "Document.isDecorated", ():void => {

			it( "should exists", ():void => {
				expect( Document.isDecorated ).toBeDefined();
				expect( Document.isDecorated ).toEqual( jasmine.any( Function ) );
			} );

			it( "should return false when `undefined`", ():void => {
				expect( Document.isDecorated( void 0 ) ).toBe( false );
			} );

			it( "should return false when `null`", ():void => {
				expect( Document.isDecorated( null ) ).toBe( false );
			} );

			it( "should return true when all properties", ():void => {
				const target:DocumentProperties = mockDocumentProperties();
				expect( Document.isDecorated( target ) ).toBe( true );
			} );

			it( "should return true when no `hasMemberRelation`", ():void => {
				const target:DocumentProperties = mockDocumentProperties();
				delete target.hasMemberRelation;
				expect( Document.isDecorated( target ) ).toBe( true );
			} );

			it( "should return true when no `isMemberOfRelation`", ():void => {
				const target:DocumentProperties = mockDocumentProperties();
				delete target.isMemberOfRelation;
				expect( Document.isDecorated( target ) ).toBe( true );
			} );

			it( "should return true when no `defaultInteractionModel`", ():void => {
				const target:DocumentProperties = mockDocumentProperties();
				delete target.defaultInteractionModel;
				expect( Document.isDecorated( target ) ).toBe( true );
			} );

			it( "should return false when no `_fragmentsIndex`", ():void => {
				const target:DocumentProperties = mockDocumentProperties();
				delete target._fragmentsIndex;
				expect( Document.isDecorated( target ) ).toBe( false );
			} );

			it( "should return false when no `_normalize`", ():void => {
				const target:DocumentProperties = mockDocumentProperties();
				delete target._normalize;
				expect( Document.isDecorated( target ) ).toBe( false );
			} );

			it( "should return false when no `_removeFragment`", ():void => {
				const target:DocumentProperties = mockDocumentProperties();
				delete target._removeFragment;
				expect( Document.isDecorated( target ) ).toBe( false );
			} );

			it( "should return false when no `hasPointer`", ():void => {
				const target:DocumentProperties = mockDocumentProperties();
				delete target.hasPointer;
				expect( Document.isDecorated( target ) ).toBe( false );
			} );

			it( "should return false when no `getPointer`", ():void => {
				const target:DocumentProperties = mockDocumentProperties();
				delete target.getPointer;
				expect( Document.isDecorated( target ) ).toBe( false );
			} );

			it( "should return false when no `inScope`", ():void => {
				const target:DocumentProperties = mockDocumentProperties();
				delete target.inScope;
				expect( Document.isDecorated( target ) ).toBe( false );
			} );

			it( "should return false when no `hasFragment`", ():void => {
				const target:DocumentProperties = mockDocumentProperties();
				delete target.hasFragment;
				expect( Document.isDecorated( target ) ).toBe( false );
			} );

			it( "should return false when no `getFragment`", ():void => {
				const target:DocumentProperties = mockDocumentProperties();
				delete target.getFragment;
				expect( Document.isDecorated( target ) ).toBe( false );
			} );

			it( "should return false when no `getNamedFragment`", ():void => {
				const target:DocumentProperties = mockDocumentProperties();
				delete target.getNamedFragment;
				expect( Document.isDecorated( target ) ).toBe( false );
			} );

			it( "should return false when no `getFragments`", ():void => {
				const target:DocumentProperties = mockDocumentProperties();
				delete target.getFragments;
				expect( Document.isDecorated( target ) ).toBe( false );
			} );

			it( "should return false when no `createFragment`", ():void => {
				const target:DocumentProperties = mockDocumentProperties();
				delete target.createFragment;
				expect( Document.isDecorated( target ) ).toBe( false );
			} );

			it( "should return false when no `createNamedFragment`", ():void => {
				const target:DocumentProperties = mockDocumentProperties();
				delete target.createNamedFragment;
				expect( Document.isDecorated( target ) ).toBe( false );
			} );

			it( "should return false when no `removeNamedFragment`", ():void => {
				const target:DocumentProperties = mockDocumentProperties();
				delete target.removeNamedFragment;
				expect( Document.isDecorated( target ) ).toBe( false );
			} );

			it( "should return false when no `toJSON`", ():void => {
				const target:DocumentProperties = mockDocumentProperties();
				delete target.toJSON;
				expect( Document.isDecorated( target ) ).toBe( false );
			} );

		} );

		describe( "Document.create", ():void => {

			it( "should exists", ():void => {
				expect( Document.create ).toBeDefined();
				expect( Document.create ).toEqual( jasmine.any( Function ) );
			} );

			it( "should return a `Document`", ():void => {
				const target:Document = Document.create();
				expect( Document.is( target ) ).toBe( true );
			} );

		} );

		describe( "Document.createFrom", ():void => {

			it( "should exists", ():void => {
				expect( Document.createFrom ).toBeDefined();
				expect( Document.createFrom ).toEqual( jasmine.any( Function ) );
			} );

			it( "should create a `Document`", ():void => {
				const target:Document = Document.createFrom( {} );
				expect( Document.is( target ) ).toBe( true );
			} );

			it( "should convert nested objects to `Fragment`s", ():void => {
				type TargetDocument = Document & { object:object };
				const target:TargetDocument = Document.createFrom( { object: {} } );

				// TODO use `isFragment` instead
				expect( Resource.is( target.object ) ).toBe( true );
			} );

		} );

		describe( "Document.decorate", ():void => {

			it( "should exists", ():void => {
				expect( Document.decorate ).toBeDefined();
				expect( Document.decorate ).toEqual( jasmine.any( Function ) );
			} );

			it( "should add the `Resource` properties", ():void => {
				const target:Resource = Document.decorate( {} );
				expect( Resource.isDecorated( target ) ).toBe( true );
			} );

			it( "should work with the `isDecorated` function", ():void => {
				const target:Document = Document.decorate( {} );
				expect( Document.isDecorated( target ) ).toBe( true );
			} );

			it( "should add en empty Map in `_fragmentsIndex`", ():void => {
				const target:Document = Document.decorate( {} );
				expect( target._fragmentsIndex ).toEqual( jasmine.any( Map ) );
			} );

		} );

		describe( "Document instance", ():void => {

			describe( "Document.hasPointer", ():void => {

				it( "should exists", ():void => {
					const document:Document = createMockDocument();

					expect( document.hasPointer ).toBeDefined();
					expect( document.hasPointer ).toEqual( jasmine.any( Function ) );
				} );

				it( "should return true when IRI of the document", ():void => {
					const document:Document = createMockDocument();

					expect( document.hasPointer( "https://example.com/document/" ) ).toBe( true );
				} );

				it( "should return false when relative IRIs", ():void => {
					const document:Document = createMockDocument();

					expect( document.hasPointer( "document/" ) ).toBe( false );
					expect( document.hasPointer( "another/document/" ) ).toBe( false );
				} );

				it( "should return false when another absolute IRIs", ():void => {
					const document:Document = createMockDocument();

					expect( document.hasPointer( "https://example.com/another/document/" ) ).toBe( false );
				} );

				it( "should return false when relative fragment label and not exits", ():void => {
					const document:Document = createMockDocument();

					expect( document.hasPointer( "#fragment" ) ).toBe( false );
				} );

				it( "should return true when relative fragment label and exits", ():void => {
					const document:Document = createMockDocument();
					document._fragmentsIndex.set( "fragment", {} as any );

					expect( document.hasPointer( "#fragment" ) ).toBe( true );
				} );

				it( "should return false when absolute fragment label and not exits", ():void => {
					const document:Document = createMockDocument();

					expect( document.hasPointer( "https://example.com/document/#fragment" ) ).toBe( false );
				} );

				it( "should return true when absolute fragment label and exits", ():void => {
					const document:Document = createMockDocument();
					document._fragmentsIndex.set( "fragment", {} as any );

					expect( document.hasPointer( "https://example.com/document/#fragment" ) ).toBe( true );
				} );

				it( "should return false when blank node label and not exists", ():void => {
					const document:Document = createMockDocument();

					expect( document.hasPointer( "_:1" ) ).toBe( false );
				} );

				it( "should be true when blank node label and exits", ():void => {
					const document:Document = createMockDocument();
					document._fragmentsIndex.set( "_:1", {} as any );

					expect( document.hasPointer( "_:1" ) ).toBe( true );
				} );

			} );

			describe( "Document.getPointer", ():void => {

				it( "should exists", ():void => {
					const document:Document = createMockDocument();

					expect( document.getPointer ).toBeDefined();
					expect( document.getPointer ).toEqual( jasmine.any( Function ) );
				} );

				it( "should return the document when IRI of the document", ():void => {
					const document:Document = createMockDocument();

					const pointer:Pointer = document.getPointer( "https://example.com/document/" );
					expect( pointer ).toBe( document );
				} );

				it( "should return null when relative IRIs", ():void => {
					const document:Document = createMockDocument();

					expect( document.getPointer( "document/" ) ).toBeNull();
					expect( document.getPointer( "another/document/" ) ).toBeNull();
				} );

				it( "should return null when another absolute IRIs", ():void => {
					const document:Document = createMockDocument();

					expect( document.getPointer( "https://example.com/another/document/" ) ).toBeNull();
				} );

				it( "should create `NamedFragment` when relative fragment label and not exits", ():void => {
					const document:Document = createMockDocument();
					const pointer:Pointer = document.getPointer( "#fragment" );

					expect( NamedFragment.is( pointer ) ).toBe( true );
					expect( document._fragmentsIndex ).toEqual( new Map( [
						[ "fragment", pointer as NamedFragment ],
					] ) );
				} );

				it( "should return fragment when relative fragment label and exits", ():void => {
					const document:Document = createMockDocument();
					const fragment:Fragment = {} as any;
					document._fragmentsIndex.set( "fragment", fragment );

					expect( document.getPointer( "#fragment" ) ).toBe( fragment );
				} );

				it( "should create `NamedFragment` when absolute fragment label and not exits", ():void => {
					const document:Document = createMockDocument();
					const pointer:Pointer = document.getPointer( "https://example.com/document/#fragment" );

					expect( NamedFragment.is( pointer ) ).toBe( true );
					expect( document._fragmentsIndex ).toEqual( new Map( [
						[ "fragment", pointer as NamedFragment ],
					] ) );
				} );

				it( "should return fragment when absolute fragment label and exits", ():void => {
					const document:Document = createMockDocument();
					const fragment:Fragment = {} as any;
					document._fragmentsIndex.set( "fragment", fragment );

					expect( document.getPointer( "https://example.com/document/#fragment" ) ).toBe( fragment );
				} );

				it( "should create `BlankNode` when blank node label and not exists", ():void => {
					const document:Document = createMockDocument();
					const pointer:Pointer = document.getPointer( "_:1" );

					expect( BlankNode.is( pointer ) ).toBe( true );
					expect( document._fragmentsIndex ).toEqual( new Map( [
						[ "_:1", pointer as BlankNode ],
					] ) );
				} );

				it( "should return true when blank node label and exits", ():void => {
					const document:Document = createMockDocument();
					const fragment:Fragment = {} as any;
					document._fragmentsIndex.set( "_:1", fragment );

					expect( document.getPointer( "_:1" ) ).toBe( fragment );
				} );

			} );


			describe( "Document.inScope", ():void => {

				it( "should exists", ():void => {
					const document:Document = createMockDocument();

					expect( document.inScope ).toBeDefined();
					expect( document.inScope ).toEqual( jasmine.any( Function ) );
				} );

				describe( "When string IRI", ():void => {

					it( "should return true when IRI of the document", ():void => {
						const document:Document = createMockDocument();

						expect( document.inScope( "https://example.com/document/" ) ).toBe( true );
					} );

					it( "should return false when relative IRIs", ():void => {
						const document:Document = createMockDocument();

						expect( document.inScope( "document/" ) ).toBe( false );
						expect( document.inScope( "another/document/" ) ).toBe( false );
					} );

					it( "should return false when another absolute IRIs", ():void => {
						const document:Document = createMockDocument();

						expect( document.inScope( "https://example.com/another/document/" ) ).toBe( false );
					} );

					it( "should return true when relative fragment label", ():void => {
						const document:Document = createMockDocument();

						expect( document.inScope( "#fragment" ) ).toBe( true );
					} );

					it( "should return true when absolute fragment label", ():void => {
						const document:Document = createMockDocument();

						expect( document.inScope( "https://example.com/document/#fragment" ) ).toBe( true );
					} );

					it( "should return false when another absolute fragment label", ():void => {
						const document:Document = createMockDocument();

						expect( document.inScope( "https://example.com/another/document/#fragment" ) ).toBe( false );
					} );

					it( "should return true when blank node label", ():void => {
						const document:Document = createMockDocument();

						expect( document.inScope( "_:1" ) ).toBe( true );
					} );

				} );

				describe( "When Pointer", ():void => {

					it( "should return true when IRI of the document", ():void => {
						const document:Document = createMockDocument();

						expect( document.inScope( Pointer.create( "https://example.com/document/" ) ) ).toBe( true );
					} );

					it( "should return false when relative IRIs", ():void => {
						const document:Document = createMockDocument();

						expect( document.inScope( Pointer.create( "document/" ) ) ).toBe( false );
						expect( document.inScope( Pointer.create( "another/document/" ) ) ).toBe( false );
					} );

					it( "should return false when another absolute IRIs", ():void => {
						const document:Document = createMockDocument();

						expect( document.inScope( Pointer.create( "https://example.com/another/document/" ) ) ).toBe( false );
					} );

					it( "should return true when relative fragment label", ():void => {
						const document:Document = createMockDocument();

						expect( document.inScope( Pointer.create( "#fragment" ) ) ).toBe( true );
					} );

					it( "should return true when absolute fragment label", ():void => {
						const document:Document = createMockDocument();

						expect( document.inScope( Pointer.create( "https://example.com/document/#fragment" ) ) ).toBe( true );
					} );

					it( "should return false when another absolute fragment label", ():void => {
						const document:Document = createMockDocument();

						expect( document.inScope( Pointer.create( "https://example.com/another/document/#fragment" ) ) ).toBe( false );
					} );

					it( "should return true when blank node label", ():void => {
						const document:Document = createMockDocument();

						expect( document.inScope( Pointer.create( "_:1" ) ) ).toBe( true );
					} );

				} );

			} );


			describe( "Document.hasFragment", ():void => {

				it( "should exists", ():void => {
					const document:Document = createMockDocument();

					expect( document.hasFragment ).toBeDefined();
					expect( document.hasFragment ).toEqual( jasmine.any( Function ) );
				} );

				it( "should return false when IRI of the document", ():void => {
					const document:Document = createMockDocument();

					expect( document.hasFragment( "https://example.com/document/" ) ).toBe( false );
				} );

				it( "should return false when relative IRIs", ():void => {
					const document:Document = createMockDocument();

					expect( document.hasFragment( "document/" ) ).toBe( false );
					expect( document.hasFragment( "another/document/" ) ).toBe( false );
				} );

				it( "should return false when another absolute IRIs", ():void => {
					const document:Document = createMockDocument();

					expect( document.hasFragment( "https://example.com/another/document/" ) ).toBe( false );
				} );

				it( "should return false when relative fragment label and not exits", ():void => {
					const document:Document = createMockDocument();

					expect( document.hasFragment( "#fragment" ) ).toBe( false );
				} );

				it( "should return true when relative fragment label and exits", ():void => {
					const document:Document = createMockDocument();
					document._fragmentsIndex.set( "fragment", {} as any );

					expect( document.hasFragment( "#fragment" ) ).toBe( true );
				} );

				it( "should return false when absolute fragment label and not exits", ():void => {
					const document:Document = createMockDocument();

					expect( document.hasFragment( "https://example.com/document/#fragment" ) ).toBe( false );
				} );

				it( "should return true when absolute fragment label and exits", ():void => {
					const document:Document = createMockDocument();
					document._fragmentsIndex.set( "fragment", {} as any );

					expect( document.hasFragment( "https://example.com/document/#fragment" ) ).toBe( true );
				} );

				it( "should return false when blank node label and not exists", ():void => {
					const document:Document = createMockDocument();

					expect( document.hasFragment( "_:1" ) ).toBe( false );
				} );

				it( "should be true when blank node label and exits", ():void => {
					const document:Document = createMockDocument();
					document._fragmentsIndex.set( "_:1", {} as any );

					expect( document.hasFragment( "_:1" ) ).toBe( true );
				} );

			} );

			describe( "Document.getFragment", ():void => {

				it( "should exists", ():void => {
					const document:Document = createMockDocument();

					expect( document.getFragment ).toBeDefined();
					expect( document.getFragment ).toEqual( jasmine.any( Function ) );
				} );

				it( "should throw error when IRI of the document", ():void => {
					const document:Document = createMockDocument();

					expect( () => document.getFragment( "https://example.com/document/" ) ).toThrowError( IllegalArgumentError, "The id is out of scope." );
				} );

				it( "should throw error when another absolute IRIs", ():void => {
					const document:Document = createMockDocument();

					expect( () => document.getFragment( "https://example.com/another/document/" ) ).toThrowError( IllegalArgumentError, "The id is out of scope." );
				} );

				it( "should return null when relative fragment label and not exits", ():void => {
					const document:Document = createMockDocument();

					expect( document.getFragment( "#fragment" ) ).toBeNull();
				} );

				it( "should return fragment when relative fragment label and exits", ():void => {
					const document:Document = createMockDocument();
					const fragment:Fragment = {} as any;
					document._fragmentsIndex.set( "fragment", fragment );

					expect( document.getFragment( "#fragment" ) ).toBe( fragment );
				} );

				it( "should return null when absolute fragment label and not exits", ():void => {
					const document:Document = createMockDocument();

					expect( document.getFragment( "https://example.com/document/#fragment" ) ).toBeNull();
				} );

				it( "should return fragment when absolute fragment label and exits", ():void => {
					const document:Document = createMockDocument();
					const fragment:Fragment = {} as any;
					document._fragmentsIndex.set( "fragment", fragment );

					expect( document.getFragment( "https://example.com/document/#fragment" ) ).toBe( fragment );
				} );

				it( "should return null when blank node label and not exists", ():void => {
					const document:Document = createMockDocument();

					expect( document.getFragment( "_:1" ) ).toBeNull();
				} );

				it( "should return true when blank node label and exits", ():void => {
					const document:Document = createMockDocument();
					const fragment:Fragment = {} as any;
					document._fragmentsIndex.set( "_:1", fragment );

					expect( document.getFragment( "_:1" ) ).toBe( fragment );
				} );

			} );

			describe( "Document.getNamedFragment", ():void => {

				it( "should exists", ():void => {
					const document:Document = createMockDocument();

					expect( document.getNamedFragment ).toBeDefined();
					expect( document.getNamedFragment ).toEqual( jasmine.any( Function ) );
				} );

				it( "should throw error when IRI of the document", ():void => {
					const document:Document = createMockDocument();

					expect( () => document.getNamedFragment( "https://example.com/document/" ) ).toThrowError( IllegalArgumentError, "The id is out of scope." );
				} );

				it( "should throw error when another absolute IRIs", ():void => {
					const document:Document = createMockDocument();

					expect( () => document.getNamedFragment( "https://example.com/another/document/" ) ).toThrowError( IllegalArgumentError, "The id is out of scope." );
				} );

				it( "should return null when relative fragment label and not exits", ():void => {
					const document:Document = createMockDocument();

					expect( document.getNamedFragment( "#fragment" ) ).toBeNull();
				} );

				it( "should return fragment when relative fragment label and exits", ():void => {
					const document:Document = createMockDocument();
					const fragment:Fragment = {} as any;
					document._fragmentsIndex.set( "fragment", fragment );

					expect( document.getNamedFragment( "#fragment" ) ).toBe( fragment );
				} );

				it( "should return fragment when relative label and exits", ():void => {
					const document:Document = createMockDocument();
					const fragment:Fragment = {} as any;
					document._fragmentsIndex.set( "fragment", fragment );

					expect( document.getNamedFragment( "fragment" ) ).toBe( fragment );
				} );

				it( "should return null when absolute fragment label and not exits", ():void => {
					const document:Document = createMockDocument();

					expect( document.getNamedFragment( "https://example.com/document/#fragment" ) ).toBeNull();
				} );

				it( "should return fragment when absolute fragment label and exits", ():void => {
					const document:Document = createMockDocument();
					const fragment:Fragment = {} as any;
					document._fragmentsIndex.set( "fragment", fragment );

					expect( document.getNamedFragment( "https://example.com/document/#fragment" ) ).toBe( fragment );
				} );

				it( "should throw error when another absolute fragment label", ():void => {
					const document:Document = createMockDocument();

					expect( () => document.getNamedFragment( "https://example.com/anotherdocument/#fragment" ) ).toThrowError( IllegalArgumentError, "The id is out of scope." );
				} );

				it( "should throw error when blank node label and not exists", ():void => {
					const document:Document = createMockDocument();

					expect( () => document.getNamedFragment( "_:1" ) ).toThrowError( IllegalArgumentError, "Named fragments can't have a id that starts with '_:'." );
				} );

			} );


			describe( "Document.getFragments", ():void => {

				it( "should exists", ():void => {
					const document:Document = createMockDocument();

					expect( document.getFragments ).toBeDefined();
					expect( document.getFragments ).toEqual( jasmine.any( Function ) );
				} );

				it( "should return empty array when no fragments", ():void => {
					const document:Document = createMockDocument();

					expect( document.getFragments() ).toEqual( [] );
				} );

				it( "should return array with all fragments", ():void => {
					const document:Document = createMockDocument();
					document._fragmentsIndex
						.set( "fragment", { the: "first fragment" } as any )
						.set( "_:1", { the: "second fragment" } as any )
						.set( "another", { the: "third fragment" } as any )
						.set( "_:2", { the: "fourth fragment" } as any )
					;

					expect( document.getFragments() ).toEqual( [
						{ the: "first fragment" } as any,
						{ the: "second fragment" } as any,
						{ the: "third fragment" } as any,
						{ the: "fourth fragment" } as any,
					] );
				} );

			} );


			describe( "Document.createFragment", ():void => {

				it( "should exists", ():void => {
					const document:Document = createMockDocument();

					expect( document.createFragment ).toBeDefined();
					expect( document.createFragment ).toEqual( jasmine.any( Function ) );
				} );

				it( "should create `NamedFragment` when object and slug label provided", ():void => {
					const document:Document = createMockDocument();
					const fragment:{ string:string } = document.createFragment( { string: "a string" }, "fragment" );

					// TODO: Use `isNamedFragment`
					expect( Resource.is( fragment ) ).toBe( true );
					expect( Fragment.isDecorated( fragment ) ).toBe( true );

					expect( fragment ).toEqual( {
						string: "a string",
					} );
				} );

				it( "should create `NamedFragment` when only slug label provided", ():void => {
					const document:Document = createMockDocument();
					const fragment:Fragment = document.createFragment( "fragment" );

					// TODO: Use `isNamedFragment`
					expect( Resource.is( fragment ) ).toBe( true );
					expect( Fragment.isDecorated( fragment ) ).toBe( true );
				} );

				it( "should create `NamedFragment` when object and absolute IRI provided", ():void => {
					const document:Document = createMockDocument();
					type TargetFragment = Fragment & { string:string };
					const fragment:TargetFragment = document.createFragment( { string: "a string" }, "https://example.com/document/#fragment" );

					// TODO: Use `isNamedFragment`
					expect( Resource.is( fragment ) ).toBe( true );
					expect( Fragment.isDecorated( fragment ) ).toBe( true );

					expect( fragment as { string:string } ).toEqual( {
						string: "a string",
					} );
				} );

				it( "should create `NamedFragment` when only absolute IRI provided", ():void => {
					const document:Document = createMockDocument();
					const fragment:Fragment = document.createFragment( "https://example.com/document/#fragment" );

					// TODO: Use `isNamedFragment`
					expect( Resource.is( fragment ) ).toBe( true );
					expect( Fragment.isDecorated( fragment ) ).toBe( true );
				} );

				it( "should create `BlankNode` when no label provided", ():void => {
					const document:Document = createMockDocument();
					const fragment:Fragment = document.createFragment( {} );

					// TODO: Use `isBlankNode`
					expect( Resource.is( fragment ) ).toBe( true );
					expect( Fragment.isDecorated( fragment ) ).toBe( true );
					expect( URI.isBNodeID( fragment.id ) ).toBe( true );
				} );

				it( "should create `BlankNode` when object and blank node label provided", ():void => {
					const document:Document = createMockDocument();
					type TargetFragment = Fragment & { string:string };
					const fragment:TargetFragment = document.createFragment( { string: "a string" }, "_:1" );

					// TODO: Use `isBlankNode`
					expect( Resource.is( fragment ) ).toBe( true );
					expect( Fragment.isDecorated( fragment ) ).toBe( true );
					expect( URI.isBNodeID( fragment.id ) ).toBe( true );

					expect( fragment as { string:string } ).toEqual( {
						string: "a string",
					} );
				} );

				it( "should create `BlankNode` when only blank node label provided", ():void => {
					const document:Document = createMockDocument();
					const fragment:Fragment = document.createFragment( "_:1" );

					// TODO: Use `isBlankNode`
					expect( Resource.is( fragment ) ).toBe( true );
					expect( Fragment.isDecorated( fragment ) ).toBe( true );
					expect( URI.isBNodeID( fragment.id ) ).toBe( true );
				} );

				it( "should call `convertNestedObjects` with the object provided", ():void => {
					const document:Document = createMockDocument();
					const spy:jasmine.Spy = spyOn( Document, "_convertNestedObjects" );

					const object:object = { the: "object" };
					document.createFragment( object );

					expect( spy ).toHaveBeenCalledWith( document, object );
				} );

				it( "should throw error when object but slug label is already used", ():void => {
					const document:Document = createMockDocument();
					document._fragmentsIndex.set( "fragment", null );

					expect( () => document.createFragment( {}, "fragment" ) ).toThrowError( IDAlreadyInUseError, "The slug provided is already being used by a fragment." );
				} );

				it( "should throw error when only slug label is already used", ():void => {
					const document:Document = createMockDocument();
					document._fragmentsIndex.set( "fragment", null );

					expect( () => document.createFragment( "fragment" ) ).toThrowError( IDAlreadyInUseError, "The slug provided is already being used by a fragment." );
				} );

				it( "should throw error when object but absolute IRI provided is already used", ():void => {
					const document:Document = createMockDocument();
					document._fragmentsIndex.set( "fragment", null );

					expect( () => document.createFragment( {}, "https://example.com/document/#fragment" ) ).toThrowError( IDAlreadyInUseError, "The slug provided is already being used by a fragment." );
				} );

				it( "should throw error when only absolute IRI provided is already used", ():void => {
					const document:Document = createMockDocument();
					document._fragmentsIndex.set( "fragment", null );

					expect( () => document.createFragment( "https://example.com/document/#fragment" ) ).toThrowError( IDAlreadyInUseError, "The slug provided is already being used by a fragment." );
				} );

				it( "should throw error when object but blank node label is used", ():void => {
					const document:Document = createMockDocument();
					document._fragmentsIndex.set( "_:1", null );

					expect( () => document.createFragment( {}, "_:1" ) ).toThrowError( IDAlreadyInUseError, "The slug provided is already being used by a fragment." );
				} );

				it( "should throw error when only blank node label is used", ():void => {
					const document:Document = createMockDocument();
					document._fragmentsIndex.set( "_:1", null );

					expect( () => document.createFragment( "_:1" ) ).toThrowError( IDAlreadyInUseError, "The slug provided is already being used by a fragment." );
				} );

			} );

			describe( "Document.createNamedFragment", ():void => {

				it( "should exists", ():void => {
					const document:Document = createMockDocument();

					expect( document.createNamedFragment ).toBeDefined();
					expect( document.createNamedFragment ).toEqual( jasmine.any( Function ) );
				} );

				it( "should create `NamedFragment` when object and slug label provided", ():void => {
					const document:Document = createMockDocument();
					type TargetFragment = Fragment & { string:string };
					const fragment:TargetFragment = document.createNamedFragment( { string: "a string" }, "fragment" );

					// TODO: Use `isNamedFragment`
					expect( Resource.is( fragment ) ).toBe( true );
					expect( Fragment.isDecorated( fragment ) ).toBe( true );

					expect( fragment as { string:string } ).toEqual( {
						string: "a string",
					} );
				} );

				it( "should create `NamedFragment` when only slug label provided", ():void => {
					const document:Document = createMockDocument();
					const fragment:Fragment = document.createNamedFragment( "fragment" );

					// TODO: Use `isNamedFragment`
					expect( Resource.is( fragment ) ).toBe( true );
					expect( Fragment.isDecorated( fragment ) ).toBe( true );
				} );

				it( "should create `NamedFragment` when object and absolute IRI provided", ():void => {
					const document:Document = createMockDocument();
					type TargetFragment = Fragment & { string:string };
					const fragment:TargetFragment = document.createNamedFragment( { string: "a string" }, "https://example.com/document/#fragment" );

					// TODO: Use `isNamedFragment`
					expect( Resource.is( fragment ) ).toBe( true );
					expect( Fragment.isDecorated( fragment ) ).toBe( true );

					expect( fragment as { string:string } ).toEqual( {
						string: "a string",
					} );
				} );

				it( "should create `NamedFragment` when only absolute IRI provided", ():void => {
					const document:Document = createMockDocument();
					const fragment:Fragment = document.createNamedFragment( "https://example.com/document/#fragment" );

					// TODO: Use `isNamedFragment`
					expect( Resource.is( fragment ) ).toBe( true );
					expect( Fragment.isDecorated( fragment ) ).toBe( true );
				} );

				it( "should throw error when object and blank node label provided", ():void => {
					const document:Document = createMockDocument();
					expect( () => document.createNamedFragment( {}, "_:1" ) ).toThrowError( IllegalArgumentError, "Named fragments can't have a slug that starts with '_:'." );
				} );

				it( "should throw error when only blank node label provided", ():void => {
					const document:Document = createMockDocument();
					expect( () => document.createNamedFragment( "_:1" ) ).toThrowError( IllegalArgumentError, "Named fragments can't have a slug that starts with '_:'." );
				} );

				it( "should call `convertNestedObjects` with the object provided", ():void => {
					const document:Document = createMockDocument();
					const spy:jasmine.Spy = spyOn( Document, "_convertNestedObjects" );

					const object:object = { the: "object" };
					document.createNamedFragment( object, "fragment" );

					expect( spy ).toHaveBeenCalledWith( document, object );
				} );

				it( "should throw error when object but slug label is already used", ():void => {
					const document:Document = createMockDocument();
					document._fragmentsIndex.set( "fragment", null );

					expect( () => document.createNamedFragment( {}, "fragment" ) ).toThrowError( IDAlreadyInUseError, "The slug provided is already being used by a fragment." );
				} );

				it( "should throw error when only slug label is already used", ():void => {
					const document:Document = createMockDocument();
					document._fragmentsIndex.set( "fragment", null );

					expect( () => document.createNamedFragment( "fragment" ) ).toThrowError( IDAlreadyInUseError, "The slug provided is already being used by a fragment." );
				} );

				it( "should throw error when object but absolute IRI provided is already used", ():void => {
					const document:Document = createMockDocument();
					document._fragmentsIndex.set( "fragment", null );

					expect( () => document.createNamedFragment( {}, "https://example.com/document/#fragment" ) ).toThrowError( IDAlreadyInUseError, "The slug provided is already being used by a fragment." );
				} );

				it( "should throw error when only absolute IRI provided is already used", ():void => {
					const document:Document = createMockDocument();
					document._fragmentsIndex.set( "fragment", null );

					expect( () => document.createNamedFragment( "https://example.com/document/#fragment" ) ).toThrowError( IDAlreadyInUseError, "The slug provided is already being used by a fragment." );
				} );

			} );


			describe( "Document._removeFragment", ():void => {

				it( "should exists", ():void => {
					const document:Document = createMockDocument();

					expect( document._removeFragment ).toBeDefined();
					expect( document._removeFragment ).toEqual( jasmine.any( Function ) );
				} );

				it( "should remove providing a `NamedFragment`", ():void => {
					const document:Document = createMockDocument();

					const fragment:NamedFragment = NamedFragment.create( document, "fragment" );
					document._fragmentsIndex.set( "fragment", fragment );

					document._removeFragment( fragment );
					expect( document._fragmentsIndex ).toEqual( new Map() );
				} );

				it( "should remove providing a `BlankNode`", ():void => {
					const document:Document = createMockDocument();

					const fragment:BlankNode = BlankNode.create( document, "_:1" );
					document._fragmentsIndex.set( "_:1", fragment );

					document._removeFragment( fragment );
					expect( document._fragmentsIndex ).toEqual( new Map() );
				} );

				it( "should remove providing a fragment label", ():void => {
					const document:Document = createMockDocument();

					document._fragmentsIndex.set( "fragment", null );

					document._removeFragment( "#fragment" );
					expect( document._fragmentsIndex ).toEqual( new Map() );
				} );

				it( "should remove providing a fragment slug label", ():void => {
					const document:Document = createMockDocument();

					document._fragmentsIndex.set( "fragment", null );

					document._removeFragment( "fragment" );
					expect( document._fragmentsIndex ).toEqual( new Map() );
				} );

				it( "should remove providing an absolute fragment IRI", ():void => {
					const document:Document = createMockDocument();

					document._fragmentsIndex.set( "fragment", null );

					document._removeFragment( "https://example.com/document/#fragment" );
					expect( document._fragmentsIndex ).toEqual( new Map() );
				} );

				it( "should remove providing a blank node label", ():void => {
					const document:Document = createMockDocument();
					document._fragmentsIndex.set( "_:1", null );

					document._removeFragment( "_:1" );
					expect( document._fragmentsIndex ).toEqual( new Map() );
				} );

			} );

			describe( "Document.removeNamedFragment", ():void => {

				it( "should exists", ():void => {
					const document:Document = createMockDocument();

					expect( document.removeNamedFragment ).toBeDefined();
					expect( document.removeNamedFragment ).toEqual( jasmine.any( Function ) );
				} );

				it( "should remove providing a `NamedFragment`", ():void => {
					const document:Document = createMockDocument();

					const fragment:NamedFragment = NamedFragment.create( document, "fragment" );
					document._fragmentsIndex.set( "fragment", fragment );

					document.removeNamedFragment( fragment );
					expect( document._fragmentsIndex ).toEqual( new Map() );
				} );

				it( "should throw error providing a `BlankNode`", ():void => {
					const document:Document = createMockDocument();

					const fragment:BlankNode = BlankNode.create( document, "_:1" );
					document._fragmentsIndex.set( "_:1", fragment );

					expect( () => document.removeNamedFragment( fragment as any ) ).toThrowError( IllegalArgumentError, "You can only remove NamedFragments." );
				} );

				it( "should remove providing a fragment label", ():void => {
					const document:Document = createMockDocument();

					document._fragmentsIndex.set( "fragment", null );

					document.removeNamedFragment( "#fragment" );
					expect( document._fragmentsIndex ).toEqual( new Map() );
				} );

				it( "should remove providing a fragment slug label", ():void => {
					const document:Document = createMockDocument();

					document._fragmentsIndex.set( "fragment", null );

					document.removeNamedFragment( "fragment" );
					expect( document._fragmentsIndex ).toEqual( new Map() );
				} );

				it( "should remove providing an absolute fragment IRI", ():void => {
					const document:Document = createMockDocument();

					document._fragmentsIndex.set( "fragment", null );

					document.removeNamedFragment( "https://example.com/document/#fragment" );
					expect( document._fragmentsIndex ).toEqual( new Map() );
				} );

				it( "should throw error providing a blank node label", ():void => {
					const document:Document = createMockDocument();
					document._fragmentsIndex.set( "_:1", null );

					expect( () => document.removeNamedFragment( "_:1" ) ).toThrowError( IllegalArgumentError, "You can only remove NamedFragments." );
				} );

			} );


			describe( "Document.toJSON", ():void => {

				it( "should exists", ():void => {
					const document:Document = createMockDocument();

					expect( document.toJSON ).toBeDefined();
					expect( document.toJSON ).toEqual( jasmine.any( Function ) );
				} );

				it( "should expand all resources with a new `JSONLDConverter` with empty `DigestedObjectSchema`s when none provided", ():void => {
					const document:Document = createMockDocument( { the: "document" } );
					document.createFragment( { then: "blank node" }, "_:1" );
					document.createFragment( { then: "named fragment" }, "fragment" );

					const jsonldConverter:jasmine.SpyObj<JSONLDConverter> = jasmine
						.createSpyObj<JSONLDConverter>( "JSONLDConverter", [ "expand" ] );
					spyOn( JSONLDConverterModule, "JSONLDConverter" ).and.returnValue( jsonldConverter );

					document.toJSON();
					expect( jsonldConverter.expand ).toHaveBeenCalledWith( document, new DigestedObjectSchema(), new DigestedObjectSchema() );
					expect( jsonldConverter.expand ).toHaveBeenCalledWith( { then: "blank node" }, new DigestedObjectSchema(), new DigestedObjectSchema() );
					expect( jsonldConverter.expand ).toHaveBeenCalledWith( { then: "named fragment" }, new DigestedObjectSchema(), new DigestedObjectSchema() );
				} );

				it( "should get the schemas of every resource with the `ObjectSchemaResolver`", ():void => {
					const document:Document = createMockDocument( { the: "document" } );
					document.createFragment( { then: "blank node" }, "_:1" );
					document.createFragment( { then: "named fragment" }, "fragment" );

					const schemaResolver:jasmine.SpyObj<ObjectSchemaResolver> = jasmine
						.createSpyObj<ObjectSchemaResolver>(
							"ObjectSchemaResolver", {
								"getGeneralSchema": new DigestedObjectSchema(),
								"getSchemaFor": new DigestedObjectSchema(),
							}
						);

					document.toJSON( schemaResolver );

					expect( schemaResolver.getGeneralSchema ).toHaveBeenCalledTimes( 1 );

					expect( schemaResolver.getSchemaFor ).toHaveBeenCalledWith( document );
					expect( schemaResolver.getSchemaFor ).toHaveBeenCalledWith( { then: "blank node" } );
					expect( schemaResolver.getSchemaFor ).toHaveBeenCalledWith( { then: "named fragment" } );
				} );

				it( "should expand all resources with a new `JSONLDConverter` with the schemas of the `ObjectSchemaResolver` provided", ():void => {
					const document:Document = createMockDocument( { the: "document" } );
					document.createFragment( { then: "blank node" }, "_:1" );
					document.createFragment( { then: "named fragment" }, "fragment" );

					const generalSchema:DigestedObjectSchema = ObjectSchemaDigester.digestSchema( { "@base": "https://example.com/schema/general/" } );
					const resourceSchema:DigestedObjectSchema = ObjectSchemaDigester.digestSchema( { "@base": "https://example.com/schema/resource/" } );
					const schemaResolver:jasmine.SpyObj<ObjectSchemaResolver> = jasmine
						.createSpyObj<ObjectSchemaResolver>(
							"ObjectSchemaResolver", {
								"getGeneralSchema": generalSchema,
								"getSchemaFor": resourceSchema,
							}
						);

					const jsonldConverter:jasmine.SpyObj<JSONLDConverter> = jasmine
						.createSpyObj<JSONLDConverter>( "JSONLDConverter", [ "expand" ] );
					spyOn( JSONLDConverterModule, "JSONLDConverter" ).and.returnValue( jsonldConverter );

					document.toJSON( schemaResolver );
					expect( jsonldConverter.expand ).toHaveBeenCalledWith( document, generalSchema, resourceSchema );
					expect( jsonldConverter.expand ).toHaveBeenCalledWith( { then: "blank node" }, generalSchema, resourceSchema );
					expect( jsonldConverter.expand ).toHaveBeenCalledWith( { then: "named fragment" }, generalSchema, resourceSchema );
				} );

				it( "should expand all resources with the `JSONLDConverter` provided and the schemas of the `ObjectSchemaResolver` also provided", ():void => {
					const document:Document = createMockDocument( { the: "document" } );
					document.createFragment( { then: "blank node" }, "_:1" );
					document.createFragment( { then: "named fragment" }, "fragment" );

					const generalSchema:DigestedObjectSchema = ObjectSchemaDigester.digestSchema( { "@base": "https://example.com/schema/general/" } );
					const resourceSchema:DigestedObjectSchema = ObjectSchemaDigester.digestSchema( { "@base": "https://example.com/schema/resource/" } );
					const schemaResolver:jasmine.SpyObj<ObjectSchemaResolver> = jasmine
						.createSpyObj<ObjectSchemaResolver>(
							"ObjectSchemaResolver", {
								"getGeneralSchema": generalSchema,
								"getSchemaFor": resourceSchema,
							}
						);

					const jsonldConverter:jasmine.SpyObj<JSONLDConverter> = jasmine
						.createSpyObj<JSONLDConverter>( "JSONLDConverter", { "expand": {} } );

					document.toJSON( schemaResolver, jsonldConverter );
					expect( jsonldConverter.expand ).toHaveBeenCalledWith( document, generalSchema, resourceSchema );
					expect( jsonldConverter.expand ).toHaveBeenCalledWith( { then: "blank node" }, generalSchema, resourceSchema );
					expect( jsonldConverter.expand ).toHaveBeenCalledWith( { then: "named fragment" }, generalSchema, resourceSchema );
				} );

				it( "should return a `RDFDocument` with the expanded resources", ():void => {
					const document:Document = createMockDocument( { the: "document" } );
					document.createFragment( { then: "blank node" }, "_:1" );
					document.createFragment( { then: "named fragment" }, "fragment" );

					const jsonldConverter:jasmine.SpyObj<JSONLDConverter> = jasmine.createSpyObj<JSONLDConverter>( "JSONLDConverter", [ "expand" ] );
					jsonldConverter.expand.and.callFake( ( resource ) => {
						if( resource === document ) return {
							"@id": "https://example.com/document/",
							the: "expanded document",
						};

						if( resource === document.getFragment( "_:1" ) ) return {
							"@id": "_:1",
							the: "expanded blank node",
						};

						return {
							"@id": "https://example.com/document/#fragment",
							the: "expanded named fragment",
						};
					} );

					const expanded:RDFDocument = document.toJSON( void 0, jsonldConverter );
					expect( expanded ).toEqual( {
						"@id": "https://example.com/document/",
						"@graph": [
							{
								"@id": "https://example.com/document/",
								the: "expanded document",
							},
							{
								"@id": "_:1",
								the: "expanded blank node",
							},
							{
								"@id": "https://example.com/document/#fragment",
								the: "expanded named fragment",
							},
						],
					} );
				} );

			} );


			describe( "Document._normalize", ():void => {

				it( "should exists", ():void => {
					const document:Document = createMockDocument();

					expect( document._normalize ).toBeDefined();
					expect( document._normalize ).toEqual( jasmine.any( Function ) );
				} );

				it( "should remove `BlankNodes` not referenced from the main document", ():void => {
					type TargetDocument = Document & { object?:{ id:string } };
					const document:TargetDocument = createMockDocument( { object: { id: "_:1" } } );
					delete document.object;

					document._normalize();
					expect( document.object ).not.toBeDefined();
					expect( document.hasFragment( "_:1" ) ).toBe( false );
				} );

				it( "should remove `BlankNodes` not referenced from the fragments", ():void => {
					type TargetDocument = Document & { object:{ object?:{ id:string } } };
					const document:TargetDocument = createMockDocument( { object: { object: { id: "_:1" } } } );
					delete document.object.object;

					document._normalize();
					expect( document.object.object ).not.toBeDefined();
					expect( document.hasFragment( "_:1" ) ).toBe( false );
				} );

				it( "should maintain `NamedFragments` not referenced from the main document", ():void => {
					type TargetDocument = Document & { object?:{ id:string } };
					const document:TargetDocument = createMockDocument( { object: { id: "#1" } } );
					delete document.object;

					document._normalize();
					expect( document.object ).not.toBeDefined();
					expect( document.hasFragment( "#1" ) ).toBe( true );
				} );

				it( "should maintain `NamedFragments` not referenced from the fragments", ():void => {
					type TargetDocument = Document & { object:{ object?:{ id:string } } };
					const document:TargetDocument = createMockDocument( { object: { object: { id: "#1" } } } );
					delete document.object.object;

					document._normalize();
					expect( document.object.object ).not.toBeDefined();
					expect( document.hasFragment( "#1" ) ).toBe( true );
				} );

				it( "should convert without problems cyclical referenced fragments", ():void => {
					type TargetDocument = Document & { object?:{ self?:{} } };
					const document:TargetDocument = createMockDocument( {} );

					const object:{ id?:string, self?:{} } = { id: "_:1" };
					object.self = object;

					document.object = object;
					document._normalize();

					expect( document.object ).toBeDefined();
					// TODO: Use `isFragment`
					expect( Resource.is( document.object ) ).toBe( true );
					expect( document.hasFragment( "_:1" ) ).toBe( true );
					expect( document.object.self ).toBe( document.object );
				} );

			} );

		} );

		describe( "Document._convertNestedObjects", ():void => {

			it( "should exists", ():void => {
				expect( Document._convertNestedObjects ).toBeDefined();
				expect( Document._convertNestedObjects ).toEqual( jasmine.any( Function ) );
			} );

			it( "should convert single object property to `Fragment`", ():void => {
				type TargetDocument = Document & { object?:{ string:string } };
				const document:TargetDocument = createMockDocument();
				document.object = { string: "new object" };

				Document._convertNestedObjects( document, document );
				expect( document.object ).toEqual( { string: "new object" } );

				// TODO: Use `isFragment`
				expect( Resource.is( document.object ) ).toBe( true );
				expect( document.hasFragment( document.object[ "id" ] ) ).toBe( true );
			} );

			it( "should convert object array property to `Fragment`", ():void => {
				type TargetDocument = Document & { array?:{ string:string }[] };
				const document:TargetDocument = createMockDocument();
				document.array = [ { string: "element 1" }, { string: "element 2" } ];

				Document._convertNestedObjects( document, document );
				expect( document.array ).toEqual( [
					{ string: "element 1" },
					{ string: "element 2" },
				] );

				// TODO: Use `isFragment`
				expect( Resource.is( document.array[ 0 ] ) ).toBe( true );
				expect( document.hasFragment( document.array[ 0 ][ "id" ] ) ).toBe( true );

				expect( Resource.is( document.array[ 1 ] ) ).toBe( true );
				expect( document.hasFragment( document.array[ 1 ][ "id" ] ) ).toBe( true );
			} );

			it( "should convert second level object property to `Fragment`", ():void => {
				type TargetDocument = Document & { object?:{ object:{ string:string } } };
				const document:TargetDocument = createMockDocument();
				document.object = { object: { string: "new object" } };

				Document._convertNestedObjects( document, document );
				expect( document.object ).toEqual( { object: { string: "new object" } } );

				// TODO: Use `isFragment`
				expect( Resource.is( document.object ) ).toBe( true );
				expect( document.hasFragment( document.object[ "id" ] ) ).toBe( true );

				expect( Resource.is( document.object.object ) ).toBe( true );
				expect( document.hasFragment( document.object.object[ "id" ] ) ).toBe( true );
			} );

			it( "should convert only second level object property to `Fragment`", ():void => {
				type TargetDocument = Document & { object?:{ object:{ string:string } } };
				const document:TargetDocument = createMockDocument();
				document.object = { object: { string: "new object" } };

				Document._convertNestedObjects( document, document.object );
				expect( document.object ).toEqual( { object: { string: "new object" } } );

				// TODO: Use `isFragment`
				expect( Resource.is( document.object ) ).toBe( false );

				expect( Resource.is( document.object.object ) ).toBe( true );
				expect( document.hasFragment( document.object.object[ "id" ] ) ).toBe( true );
			} );

			it( "should be a `BlankNode` when no slug/id in new object", ():void => {
				type TargetDocument = Document & { object?:{ string:string } };
				const document:TargetDocument = createMockDocument();
				document.object = { string: "new object" };

				Document._convertNestedObjects( document, document );
				expect( document.object ).toEqual( { string: "new object" } );

				// TODO: Use `isBlankNode`
				expect( URI.isBNodeID( document.object[ "id" ] ) ).toBe( true );
			} );

			it( "should be a `BlankNode` when bnode label in id property", ():void => {
				type TargetDocument = Document & { object?:{ id?:string, string:string } };
				const document:TargetDocument = createMockDocument();
				document.object = { id: "_:1", string: "new object" };

				Document._convertNestedObjects( document, document );
				expect( document.object ).toEqual( { string: "new object" } );
				// TODO: Use `isBlankNode`
				expect( URI.isBNodeID( document.object[ "id" ] ) ).toBe( true );

				expect( document.hasFragment( "_:1" ) ).toBe( true );
				expect( document.object ).toBe( document.getFragment( "_:1" ) );
			} );

			it( "should be a `NamedFragment` when relative fragment label in id property", ():void => {
				type TargetDocument = Document & { object?:{ id?:string, string:string } };
				const document:TargetDocument = createMockDocument();
				document.object = { id: "#fragment", string: "new object" };

				Document._convertNestedObjects( document, document );
				expect( document.object ).toEqual( { string: "new object" } );
				// TODO: Use `isNamedFragment`
				expect( Resource.is( document.object ) ).toBe( true );
				expect( NamedFragment.isDecorated( document.object ) ).toBe( true );

				expect( document.hasFragment( "#fragment" ) ).toBe( true );
				expect( document.object ).toBe( document.getFragment( "#fragment" ) );
			} );

			it( "should be a `NamedFragment` when relative fragment label in slug property", ():void => {
				type TargetDocument = Document & { object?:{ slug?:string, string:string } };
				const document:TargetDocument = createMockDocument();
				document.object = { slug: "#1", string: "new object" };

				Document._convertNestedObjects( document, document );
				expect( document.object ).toEqual( { string: "new object" } );
				// TODO: Use `isNamedFragment`
				expect( Resource.is( document.object ) ).toBe( true );
				expect( NamedFragment.isDecorated( document.object ) ).toBe( true );

				expect( document.hasFragment( "#1" ) ).toBe( true );
				expect( document.object ).toBe( document.getFragment( "#1" ) );
			} );

			it( "should be a `NamedFragment` when relative label in slug property", ():void => {
				type TargetDocument = Document & { object?:{ slug?:string, string:string } };
				const document:TargetDocument = createMockDocument();
				document.object = { slug: "fragment", string: "new object" };

				Document._convertNestedObjects( document, document );
				expect( document.object ).toEqual( { string: "new object" } );
				// TODO: Use `isNamedFragment`
				expect( Resource.is( document.object ) ).toBe( true );
				expect( NamedFragment.isDecorated( document.object ) ).toBe( true );

				expect( document.hasFragment( "#fragment" ) ).toBe( true );
				expect( document.object ).toBe( document.getFragment( "#fragment" ) );
			} );

		} );

	} );

	it( hasDefaultExport( "Carbon.Document.Document" ), ():void => {
		const target:DefaultExport = {} as Document;
		expect( target ).toBeDefined();
	} );

} );
