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
} from "../test/JasmineExtender";
import * as Utils from "../Utils";
import { C } from "../Vocabularies/C";
import {
	createDocument,
	createDocumentFrom,
	decorateDocument,
	isDecoratedDocument,
	isDocument
} from "./factory";

import DefaultExport, { Document } from "./index";
import { LDP } from "../Vocabularies/LDP";
import { XSD } from "../Vocabularies/XSD";

describe( module( "Carbon/Document" ), ():void => {

	it( "should exists", ():void => {
		expect( Document ).toBeDefined();
		expect( Utils.isObject( Document ) ).toBe( true );
	} );

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
					{ name: "objectSchemaResolver", type: "Carbon.ObjectSchema.ObjectSchemaResolver", optional:true },
					{ name: "jsonLDConverter", type: "Carbon.JSONLDConverter.Class", optional: true },
				],
				{ type: "Carbon.RDF.Document.Class" }
			), ():void => {} );

		} );

	} );

	describe( interfaze(
		"Carbon.Document.DocumentFactory",
		"Interface with the factory and decorate properties and methods for an Carbon LDP Document"
	), ():void => {

		it( extendsClass( "Carbon.ModelFactory.ModelFactory<Carbon.Document.Document>" ), ():void => {} );
		it( extendsClass( "Carbon.ModelDecorator.ModelDecorator<Carbon.Document.Document>" ), ():void => {} );

	} );

	describe( property( STATIC, "Document", "Carbon.Document.DocumentFactory", "Constant that implements the `Carbon.Document.DocumentFactory` interface." ), ():void => {

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

			it( "should be `isDocument`", ():void => {
				expect( Document.is ).toBe( isDocument );
			} );

		} );

		describe( "Document.isDecorated", ():void => {

			it( "should exists", ():void => {
				expect( Document.isDecorated ).toBeDefined();
				expect( Document.isDecorated ).toEqual( jasmine.any( Function ) );
			} );

			it( "should be `isDecoratedDocument`", ():void => {
				expect( Document.isDecorated ).toBe( isDecoratedDocument );
			} );

		} );

		describe( "Document.create", ():void => {

			it( "should exists", ():void => {
				expect( Document.create ).toBeDefined();
				expect( Document.create ).toEqual( jasmine.any( Function ) );
			} );

			it( "should be `createDocument`", ():void => {
				expect( Document.create ).toBe( createDocument );
			} );

		} );

		describe( "Document.createFrom", ():void => {

			it( "should exists", ():void => {
				expect( Document.createFrom ).toBeDefined();
				expect( Document.createFrom ).toEqual( jasmine.any( Function ) );
			} );

			it( "should be `createDocumentFrom`", ():void => {
				expect( Document.createFrom ).toBe( createDocumentFrom );
			} );

		} );

		describe( "Document.decorate", ():void => {

			it( "should exists", ():void => {
				expect( Document.decorate ).toBeDefined();
				expect( Document.decorate ).toEqual( jasmine.any( Function ) );
			} );

			it( "should be `decorateDocument`", ():void => {
				expect( Document.decorate ).toBe( decorateDocument );
			} );

		} );

	} );

	it( hasDefaultExport( "Carbon.Document.Document" ), ():void => {
		const target:DefaultExport = {} as Document;
		expect( target ).toBeDefined();
	} );

} );
