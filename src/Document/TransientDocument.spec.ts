import { anyThatMatches } from "../../test/helpers/jasmine/equalities";
import {
	IDAlreadyInUseError,
	IllegalArgumentError,
} from "../Errors";
import { TransientFragment } from "../Fragment";
import {
	DigestedObjectSchema,
	ObjectSchemaDigester
} from "../ObjectSchema";
import { Pointer } from "../Pointer";
import {
	RDFDocument,
	URI,
} from "../RDF";
import {
	DocumentsRegistry,
	Registry
} from "../Registry";
import { Resource } from "../Resource";
import {
	extendsClass,
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
import {
	C,
	XSD
} from "../Vocabularies";
import {
	TransientDocument,
	TransientDocumentFactory
} from "./TransientDocument";


type DocumentProperties = TransientDocumentFactory["PROTOTYPE"];

function mockDocumentProperties():DocumentProperties {
	const fn:() => any = () => {};

	return {
		$registry: null,

		__getLocalID: fn,
		_addPointer: fn,

		getPointer: fn,


		hasMemberRelation: null,
		isMemberOfRelation: null,
		defaultInteractionModel: null,

		_normalize: fn,
		removeFragment: fn,

		hasFragment: fn,
		getFragment: fn,
		getNamedFragment: fn,
		getFragments: fn,
		createFragment: fn,
		createNamedFragment: fn,
		removeNamedFragment: fn,
		toJSON: fn,
	};
}

function createMockDocument<T extends {}>( origin:T & Partial<TransientDocument> = {} as T ):T & TransientDocument {
	return TransientDocument.createFrom( Object.assign( origin, {
		id: "https://example.com/document/",
	} ) );
}


describe( module( "carbonldp/Document" ), ():void => {

	describe( interfaze(
		"CarbonLDP.TransientDocument",
		"Interface that represents an in-memory Carbon LDP Document."
	), ():void => {

		it( extendsClass( "CarbonLDP.TransientResource" ), () => {
			const target:Resource = {} as TransientDocument;
			expect( target ).toBeDefined();
		} );

		it( extendsClass( "CarbonLDP.Resource" ), () => {
			const target:Resource = {} as TransientDocument;
			expect( target ).toBeDefined();
		} );

		it( extendsClass( "CarbonLDP.Registry<CarbonLDP.TransientFragment>" ), () => {
			const target:Registry<TransientFragment> = {} as TransientDocument;
			expect( target ).toBeDefined();
		} );


		it( hasProperty(
			OPTIONAL,
			"defaultInteractionModel",
			"CarbonLDP.Pointer",
			"A Pointer URI representing the default interaction model of the document when persisted."
		), ():void => {} );

		it( hasProperty(
			OPTIONAL,
			"hasMemberRelation",
			"CarbonLDP.Pointer",
			"A Pointer with the member of relation of the document."
		), ():void => {} );

		it( hasProperty(
			OPTIONAL,
			"isMemberOfRelation",
			"CarbonLDP.Pointer",
			"A Pointer with the inverted relation the document will have."
		), ():void => {} );

		it( hasProperty(
			OBLIGATORY,
			"_fragmentsIndex",
			"Map<string, CarbonLDP.TransientFragment>",
			"Map that stores the fragments (named fragments and blank nodes) of the Document."
		), ():void => {} );


		describe( method( OBLIGATORY, "_normalize" ), () => {

			it( hasSignature(
				"Search over the document for normal objects to convert into fragments, and unused fragments to eliminate."
			), () => {} );

			it( "should exists", ():void => {
				const document:TransientDocument = createMockDocument();

				expect( document._normalize ).toBeDefined();
				expect( document._normalize ).toEqual( jasmine.any( Function ) );
			} );


			it( "should remove `BlankNodes` not referenced from the main document", ():void => {
				type TargetDocument = TransientDocument & { object?:{ id:string } };
				const document:TargetDocument = createMockDocument( { object: { id: "_:1" } } );
				delete document.object;

				document._normalize();
				expect( document.object ).not.toBeDefined();
				expect( document.hasFragment( "_:1" ) ).toBe( false );
			} );

			it( "should remove `BlankNodes` not referenced from the fragments", ():void => {
				type TargetDocument = TransientDocument & { object:{ object?:{ id:string } } };
				const document:TargetDocument = createMockDocument( { object: { object: { id: "_:1" } } } );
				delete document.object.object;

				document._normalize();
				expect( document.object.object ).not.toBeDefined();
				expect( document.hasFragment( "_:1" ) ).toBe( false );
			} );

			it( "should maintain `NamedFragments` not referenced from the main document", ():void => {
				type TargetDocument = TransientDocument & { object?:{ id:string } };
				const document:TargetDocument = createMockDocument( { object: { id: "#1" } } );
				delete document.object;

				document._normalize();
				expect( document.object ).not.toBeDefined();
				expect( document.hasFragment( "#1" ) ).toBe( true );
			} );

			it( "should maintain `NamedFragments` not referenced from the fragments", ():void => {
				type TargetDocument = TransientDocument & { object:{ object?:{ id:string } } };
				const document:TargetDocument = createMockDocument( { object: { object: { id: "#1" } } } );
				delete document.object.object;

				document._normalize();
				expect( document.object.object ).not.toBeDefined();
				expect( document.hasFragment( "#1" ) ).toBe( true );
			} );

			it( "should convert without problems cyclical referenced fragments", ():void => {
				type TargetDocument = TransientDocument & { object?:{ self?:{} } };
				const document:TargetDocument = createMockDocument( {} );

				const object:{ id?:string, self?:{} } = { id: "_:1" };
				object.self = object;

				document.object = object;
				document._normalize();

				expect( document.object ).toBeDefined();
				expect( TransientFragment.is( document.object ) ).toBe( true );
				expect( document.hasFragment( "_:1" ) ).toBe( true );
				expect( document.object.self ).toBe( document.object );
			} );

		} );


		describe( "TransientDocument.getPointer", ():void => {

			it( "should exists", ():void => {
				const document:TransientDocument = createMockDocument();

				expect( document.getPointer ).toBeDefined();
				expect( document.getPointer ).toEqual( jasmine.any( Function ) );
			} );


			it( "should throw error when IRI of the document and no _registry", ():void => {
				const document:TransientDocument = createMockDocument();

				expect( () => {
					document.getPointer( "https://example.com/document/" );
				} ).toThrowError( IllegalArgumentError );
			} );

			it( "should throw error when relative IRI and no _registry", ():void => {
				const document:TransientDocument = createMockDocument();

				expect( () => {
					document.getPointer( "document/" );
				} ).toThrowError( IllegalArgumentError );
			} );

			it( "should throw error when another absolute IRI and no _registry", ():void => {
				const document:TransientDocument = createMockDocument();

				expect( () => {
					document.getPointer( "https://example.com/another/document/" );
				} ).toThrowError( IllegalArgumentError );
			} );

			it( "should return the document when IRI of the document and has _registry", ():void => {
				const _registry:DocumentsRegistry = new DocumentsRegistry();
				const document:TransientDocument = createMockDocument( { $registry: _registry } );

				_registry.__resourcesMap.set( _registry.__getLocalID( document.$id ), document as any );

				const returned:Pointer = document.getPointer( "https://example.com/document/" );
				expect( returned ).toBe( document );
			} );

			it( "should return document as child when relative IRI and has _registry", ():void => {
				const _registry:DocumentsRegistry = new DocumentsRegistry();
				const document:TransientDocument = createMockDocument( { $registry: _registry } );

				const returned:Pointer = document.getPointer( "relative/" );
				expect( returned ).toEqual( anyThatMatches( TransientDocument.is, "isTransientDocument" ) as any );
				expect( returned.$id ).toEqual( document.$id + "relative/" );
			} );

			it( "should return document when another absolute IRI and has _registry", ():void => {
				const _registry:DocumentsRegistry = new DocumentsRegistry();
				const document:TransientDocument = createMockDocument( { $registry: _registry } );

				const returned:Pointer = document.getPointer( "https://example.com/another/document/" );
				expect( returned ).toEqual( anyThatMatches( TransientDocument.is, "isTransientDocument" ) as any );
				expect( returned.$id ).toEqual( "https://example.com/another/document/" );
			} );


			it( "should create `NamedFragment` when relative fragment label and not exits", ():void => {
				const document:TransientDocument = createMockDocument();
				const pointer:Pointer = document.getPointer( "#fragment" );

				expect( TransientNamedFragment.is( pointer ) ).toBe( true );
				expect( document.__resourcesMap ).toEqual( new Map( [
					[ "fragment", pointer as TransientNamedFragment ],
				] ) );
			} );

			it( "should return fragment when relative fragment label and exits", ():void => {
				const document:TransientDocument = createMockDocument();
				const fragment:TransientFragment = {} as any;
				document.__resourcesMap.set( "fragment", fragment );

				expect( document.getPointer( "#fragment" ) ).toBe( fragment );
			} );

			it( "should create `NamedFragment` when absolute fragment label and not exits", ():void => {
				const document:TransientDocument = createMockDocument();
				const pointer:Pointer = document.getPointer( "https://example.com/document/#fragment" );

				expect( TransientNamedFragment.is( pointer ) ).toBe( true );
				expect( document.__resourcesMap ).toEqual( new Map( [
					[ "fragment", pointer as TransientNamedFragment ],
				] ) );
			} );

			it( "should return fragment when absolute fragment label and exits", ():void => {
				const document:TransientDocument = createMockDocument();
				const fragment:TransientFragment = {} as any;
				document.__resourcesMap.set( "fragment", fragment );

				expect( document.getPointer( "https://example.com/document/#fragment" ) ).toBe( fragment );
			} );

			it( "should create `BlankNode` when blank node label and not exists", ():void => {
				const document:TransientDocument = createMockDocument();
				const pointer:Pointer = document.getPointer( "_:1" );

				expect( TransientBlankNode.is( pointer ) ).toBe( true );
				expect( document.__resourcesMap ).toEqual( new Map( [
					[ "_:1", pointer as TransientBlankNode ],
				] ) );
			} );

			it( "should return fragment when blank node label and exits", ():void => {
				const document:TransientDocument = createMockDocument();
				const fragment:TransientFragment = {} as any;
				document.__resourcesMap.set( "_:1", fragment );

				expect( document.getPointer( "_:1" ) ).toBe( fragment );
			} );

		} );


		describe( "TransientDocument._getLocalID", ():void => {

			it( "should exists", ():void => {
				const document:TransientDocument = createMockDocument();

				expect( document.__getLocalID ).toBeDefined();
				expect( document.__getLocalID ).toEqual( jasmine.any( Function ) );
			} );


			it( "should throw error false when IRI of the document", ():void => {
				const document:TransientDocument = createMockDocument();

				expect( () => document.__getLocalID( "https://example.com/document/" ) ).toThrow();
			} );

			it( "should throw error when relative IRIs", ():void => {
				const document:TransientDocument = createMockDocument();

				expect( () => document.__getLocalID( "relative/" ) ).toThrow();
			} );

			it( "should throw error when another absolute IRIs", ():void => {
				const document:TransientDocument = createMockDocument();

				expect( () => document.__getLocalID( "https://example.com/another/document/" ) ).toThrow();
			} );

			it( "should return fragment when relative fragment label", ():void => {
				const document:TransientDocument = createMockDocument();

				expect( document.__getLocalID( "#fragment" ) ).toBe( "fragment" );
			} );

			it( "should return fragment when absolute fragment label", ():void => {
				const document:TransientDocument = createMockDocument();

				expect( document.__getLocalID( "https://example.com/document/#fragment" ) ).toBe( "fragment" );
			} );

			it( "should throw error when another absolute fragment label", ():void => {
				const document:TransientDocument = createMockDocument();

				expect( () => document.__getLocalID( "https://example.com/another/document/#fragment" ) ).toThrow();
			} );

			it( "should return label when blank node label", ():void => {
				const document:TransientDocument = createMockDocument();

				expect( document.__getLocalID( "_:1" ) ).toBe( "_:1" );
			} );

		} );

		describe( "TransientDocument._register", () => {

			it( "should exists", ():void => {
				const document:TransientDocument = createMockDocument();

				expect( document._addPointer ).toBeDefined();
				expect( document._addPointer ).toEqual( jasmine.any( Function ) );
			} );


			it( "should return BNode when bNode label as id provided", () => {
				const document:TransientDocument = createMockDocument();

				const returned:TransientBlankNode = document._addPointer( { id: "_:1" } );
				expect( returned ).toEqual( anyThatMatches( TransientBlankNode.is, "isBlankNode" ) as any );
			} );

			it( "should return BNode when no id & no slug provided", () => {
				const document:TransientDocument = createMockDocument();

				const returned:TransientBlankNode = document._addPointer( {} );
				expect( returned ).toEqual( anyThatMatches( TransientBlankNode.is, "isBlankNode" ) as any );
			} );

			it( "should return NamedFragment when slug provided", () => {
				const document:TransientDocument = createMockDocument();

				const returned:TransientBlankNode = document._addPointer( { slug: "fragment " } );
				expect( returned ).toEqual( anyThatMatches( TransientNamedFragment.is, "isTransientNamedFragment" ) as any );
			} );

			it( "should return NamedFragment when relative fragment as id provided", () => {
				const document:TransientDocument = createMockDocument();

				const returned:TransientBlankNode = document._addPointer( { id: "#fragment " } );
				expect( returned ).toEqual( anyThatMatches( TransientNamedFragment.is, "isTransientNamedFragment" ) as any );
			} );

		} );


		describe( method( OBLIGATORY, "hasFragment" ), () => {

			it( hasSignature(
				"Returns true if the Document has the fragment referenced by the ID provided.", [
					{ name: "id", type: "string" },
				],
				{ type: "boolean" }
			), () => {} );


			it( "should exists", ():void => {
				const document:TransientDocument = createMockDocument();

				expect( document.hasFragment ).toBeDefined();
				expect( document.hasFragment ).toEqual( jasmine.any( Function ) );
			} );

			it( "should return false when IRI of the document", ():void => {
				const document:TransientDocument = createMockDocument();

				expect( document.hasFragment( "https://example.com/document/" ) ).toBe( false );
			} );

			it( "should return false when relative IRIs", ():void => {
				const document:TransientDocument = createMockDocument();

				expect( document.hasFragment( "document/" ) ).toBe( false );
				expect( document.hasFragment( "another/document/" ) ).toBe( false );
			} );

			it( "should return false when another absolute IRIs", ():void => {
				const document:TransientDocument = createMockDocument();

				expect( document.hasFragment( "https://example.com/another/document/" ) ).toBe( false );
			} );

			it( "should return false when relative fragment label and not exits", ():void => {
				const document:TransientDocument = createMockDocument();

				expect( document.hasFragment( "#fragment" ) ).toBe( false );
			} );

			it( "should return true when relative fragment label and exits", ():void => {
				const document:TransientDocument = createMockDocument();
				document.__resourcesMap.set( "fragment", {} as any );

				expect( document.hasFragment( "#fragment" ) ).toBe( true );
			} );

			it( "should return false when absolute fragment label and not exits", ():void => {
				const document:TransientDocument = createMockDocument();

				expect( document.hasFragment( "https://example.com/document/#fragment" ) ).toBe( false );
			} );

			it( "should return true when absolute fragment label and exits", ():void => {
				const document:TransientDocument = createMockDocument();
				document.__resourcesMap.set( "fragment", {} as any );

				expect( document.hasFragment( "https://example.com/document/#fragment" ) ).toBe( true );
			} );

			it( "should return true when label and not exits", ():void => {
				const document:TransientDocument = createMockDocument();
				document.__resourcesMap.set( "fragment", {} as any );

				expect( document.hasFragment( "fragment" ) ).toBe( true );
			} );

			it( "should return true when label and exits", ():void => {
				const document:TransientDocument = createMockDocument();

				expect( document.hasFragment( "fragment" ) ).toBe( false );
			} );

			it( "should return false when blank node label and not exists", ():void => {
				const document:TransientDocument = createMockDocument();

				expect( document.hasFragment( "_:1" ) ).toBe( false );
			} );

			it( "should be true when blank node label and exits", ():void => {
				const document:TransientDocument = createMockDocument();
				document.__resourcesMap.set( "_:1", {} as any );

				expect( document.hasFragment( "_:1" ) ).toBe( true );
			} );

		} );


		describe( method( OBLIGATORY, "getFragment" ), () => {

			it( hasSignature(
				[ "T" ],
				"Returns the fragment referenced by the ID provided.\n" +
				"Returns `null` if no fragment exists in the Document.", [
					{ name: "id", type: "string" },
				],
				{ type: "T & CarbonLDP.TransientFragment" }
			), () => {} );

			it( "should exists", ():void => {
				const document:TransientDocument = createMockDocument();

				expect( document.getFragment ).toBeDefined();
				expect( document.getFragment ).toEqual( jasmine.any( Function ) );
			} );


			it( "should throw error when IRI of the document", ():void => {
				const document:TransientDocument = createMockDocument();

				expect( () => document.getFragment( "https://example.com/document/" ) ).toThrowError( IllegalArgumentError, `"https://example.com/document/" is out of scope.` );
			} );

			it( "should throw error when another absolute IRIs", ():void => {
				const document:TransientDocument = createMockDocument();

				expect( () => document.getFragment( "https://example.com/another/document/" ) ).toThrowError( IllegalArgumentError, `"https://example.com/another/document/" is out of scope.` );
			} );

			it( "should return null when relative fragment label and not exits", ():void => {
				const document:TransientDocument = createMockDocument();

				expect( document.getFragment( "#fragment" ) ).toBeNull();
			} );

			it( "should return fragment when relative fragment label and exits", ():void => {
				const document:TransientDocument = createMockDocument();
				const fragment:TransientFragment = {} as any;
				document.__resourcesMap.set( "fragment", fragment );

				expect( document.getFragment( "#fragment" ) ).toBe( fragment );
			} );

			it( "should return null when absolute fragment label and not exits", ():void => {
				const document:TransientDocument = createMockDocument();

				expect( document.getFragment( "https://example.com/document/#fragment" ) ).toBeNull();
			} );

			it( "should return fragment when absolute fragment label and exits", ():void => {
				const document:TransientDocument = createMockDocument();
				const fragment:TransientFragment = {} as any;
				document.__resourcesMap.set( "fragment", fragment );

				expect( document.getFragment( "https://example.com/document/#fragment" ) ).toBe( fragment );
			} );

			it( "should return null when label and not exits", ():void => {
				const document:TransientDocument = createMockDocument();

				expect( document.getFragment( "fragment" ) ).toBeNull();
			} );

			it( "should return fragment when label and exits", ():void => {
				const document:TransientDocument = createMockDocument();
				const fragment:TransientFragment = {} as any;
				document.__resourcesMap.set( "fragment", fragment );

				expect( document.getFragment( "fragment" ) ).toBe( fragment );
			} );

			it( "should return null when blank node label and not exists", ():void => {
				const document:TransientDocument = createMockDocument();

				expect( document.getFragment( "_:1" ) ).toBeNull();
			} );

			it( "should return true when blank node label and exits", ():void => {
				const document:TransientDocument = createMockDocument();
				const fragment:TransientFragment = {} as any;
				document.__resourcesMap.set( "_:1", fragment );

				expect( document.getFragment( "_:1" ) ).toBe( fragment );
			} );

		} );

		describe( method( OBLIGATORY, "getNamedFragment" ), () => {

			it( hasSignature(
				[ "T" ],
				"Returns the fragment referenced by the ID provided.\n" +
				"Returns `null` if no fragment exists in the Document.", [
					{ name: "id", type: "string" },
				],
				{ type: "T & CarbonLDP.TransientFragment" }
			), () => {} );

			it( "should exists", ():void => {
				const document:TransientDocument = createMockDocument();

				expect( document.getNamedFragment ).toBeDefined();
				expect( document.getNamedFragment ).toEqual( jasmine.any( Function ) );
			} );


			it( "should throw error when IRI of the document", ():void => {
				const document:TransientDocument = createMockDocument();

				expect( () => document.getNamedFragment( "https://example.com/document/" ) ).toThrowError( IllegalArgumentError, `"https://example.com/document/" is out of scope.` );
			} );

			it( "should throw error when another absolute IRIs", ():void => {
				const document:TransientDocument = createMockDocument();

				expect( () => document.getNamedFragment( "https://example.com/another/document/" ) ).toThrowError( IllegalArgumentError, `"https://example.com/another/document/" is out of scope.` );
			} );

			it( "should return null when relative fragment label and not exits", ():void => {
				const document:TransientDocument = createMockDocument();

				expect( document.getNamedFragment( "#fragment" ) ).toBeNull();
			} );

			it( "should return fragment when relative fragment label and exits", ():void => {
				const document:TransientDocument = createMockDocument();
				const fragment:TransientFragment = {} as any;
				document.__resourcesMap.set( "fragment", fragment );

				expect( document.getNamedFragment( "#fragment" ) ).toBe( fragment );
			} );

			it( "should return fragment when relative label and exits", ():void => {
				const document:TransientDocument = createMockDocument();
				const fragment:TransientFragment = {} as any;
				document.__resourcesMap.set( "fragment", fragment );

				expect( document.getNamedFragment( "fragment" ) ).toBe( fragment );
			} );

			it( "should return null when absolute fragment label and not exits", ():void => {
				const document:TransientDocument = createMockDocument();

				expect( document.getNamedFragment( "https://example.com/document/#fragment" ) ).toBeNull();
			} );

			it( "should return fragment when absolute fragment label and exits", ():void => {
				const document:TransientDocument = createMockDocument();
				const fragment:TransientFragment = {} as any;
				document.__resourcesMap.set( "fragment", fragment );

				expect( document.getNamedFragment( "https://example.com/document/#fragment" ) ).toBe( fragment );
			} );

			it( "should throw error when another absolute fragment label", ():void => {
				const document:TransientDocument = createMockDocument();

				expect( () => document.getNamedFragment( "https://example.com/anotherdocument/#fragment" ) ).toThrowError( IllegalArgumentError, `"https://example.com/anotherdocument/#fragment" is out of scope.` );
			} );

			it( "should throw error when blank node label and not exists", ():void => {
				const document:TransientDocument = createMockDocument();

				expect( () => document.getNamedFragment( "_:1" ) ).toThrowError( IllegalArgumentError, `A named fragment slug can't start with "_:".` );
			} );

		} );

		describe( method( OBLIGATORY, "getFragments" ), () => {

			it( hasSignature(
				"Returns an array with all the fragments in the Document.",
				{ type: "CarbonLDP.TransientFragment[]" }
			), () => {} );

			it( "should exists", ():void => {
				const document:TransientDocument = createMockDocument();

				expect( document.getFragments ).toBeDefined();
				expect( document.getFragments ).toEqual( jasmine.any( Function ) );
			} );


			it( "should return empty array when no fragments", ():void => {
				const document:TransientDocument = createMockDocument();

				expect( document.getFragments() ).toEqual( [] );
			} );

			it( "should return array with all fragments", ():void => {
				const document:TransientDocument = createMockDocument();
				document.__resourcesMap
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

		describe( method( OBLIGATORY, "createFragment" ), () => {

			it( hasSignature(
				[ "T" ],
				"Creates a `CarbonLDP.TransientNamedFragment` from the object provided and the slug specified.\n" +
				"If the slug has the form of a BlankNode ID, a `CarbonLDP.TransientFragment` is created instead.", [
					{ name: "object", type: "T" },
					{ name: "slug", type: "string" },
				],
				{ type: "T & CarbonLDP.TransientFragment" }
			), ():void => {} );

			it( hasSignature(
				[ "T" ],
				"Creates a `CarbonLDP.TransientFragment` from the object provided, since no slug is specified.", [
					{ name: "object", type: "object" },
				],
				{ type: "T & CarbonLDP.TransientFragment" }
			), ():void => {} );

			it( hasSignature(
				"Creates an empty `CarbonLDP.TransientNamedFragment` with the slug specified.\n" +
				"If the slug has the form of a BlankNode ID, a `CarbonLDP.TransientFragment` is created instead.", [
					{ name: "slug", type: "string" },
				],
				{ type: "CarbonLDP.TransientFragment" }
			), ():void => {} );

			it( hasSignature(
				"Creates an empty `CarbonLDP.TransientFragment`, since no slug is provided.",
				{ type: "CarbonLDP.TransientFragment" }
			), ():void => {} );

			it( "should exists", ():void => {
				const document:TransientDocument = createMockDocument();

				expect( document.createFragment ).toBeDefined();
				expect( document.createFragment ).toEqual( jasmine.any( Function ) );
			} );


			it( "should create `NamedFragment` when object and slug label provided", ():void => {
				const document:TransientDocument = createMockDocument();

				const fragment:TransientFragment & { string:string } = document
					.createFragment( { string: "a string" }, "fragment" );

				expect( TransientNamedFragment.is( fragment ) ).toBe( true );
				expect( fragment as { string:string } ).toEqual( {
					string: "a string",
				} );

				expect( fragment.$id ).toBe( "https://example.com/document/#fragment" );
			} );

			it( "should create `NamedFragment` when only slug label provided", ():void => {
				const document:TransientDocument = createMockDocument();
				const fragment:TransientFragment = document.createFragment( "fragment" );

				expect( TransientNamedFragment.is( fragment ) ).toBe( true );
				expect( fragment.$id ).toBe( "https://example.com/document/#fragment" );
			} );

			it( "should create `NamedFragment` when object and absolute IRI provided", ():void => {
				const document:TransientDocument = createMockDocument();
				type TargetFragment = TransientFragment & { string:string };
				const fragment:TargetFragment = document.createFragment( { string: "a string" }, "https://example.com/document/#fragment" );

				expect( TransientNamedFragment.is( fragment ) ).toBe( true );

				expect( fragment as { string:string } ).toEqual( {
					string: "a string",
				} );
				expect( fragment.$id ).toBe( "https://example.com/document/#fragment" );
			} );

			it( "should create `NamedFragment` when only absolute IRI provided", ():void => {
				const document:TransientDocument = createMockDocument();
				const fragment:TransientFragment = document.createFragment( "https://example.com/document/#fragment" );

				expect( TransientNamedFragment.is( fragment ) ).toBe( true );
				expect( fragment.$id ).toBe( "https://example.com/document/#fragment" );
			} );

			it( "should create `BlankNode` when no label provided", ():void => {
				const document:TransientDocument = createMockDocument();
				const fragment:TransientFragment = document.createFragment( {} );

				expect( TransientBlankNode.is( fragment ) ).toBe( true );
			} );

			it( "should create `BlankNode` when object and blank node label provided", ():void => {
				const document:TransientDocument = createMockDocument();
				type TargetFragment = TransientFragment & { string:string };
				const fragment:TargetFragment = document.createFragment( { string: "a string" }, "_:1" );

				expect( TransientBlankNode.is( fragment ) ).toBe( true );

				expect( fragment as { string:string } ).toEqual( {
					string: "a string",
				} );
			} );

			it( "should create `BlankNode` when only blank node label provided", ():void => {
				const document:TransientDocument = createMockDocument();
				const fragment:TransientFragment = document.createFragment( "_:1" );

				expect( TransientBlankNode.is( fragment ) ).toBe( true );
			} );

			it( "should call `convertNestedObjects` with the object provided", ():void => {
				const document:TransientDocument = createMockDocument();
				const spy:jasmine.Spy = spyOn( TransientDocument, "_convertNestedObjects" );

				const object:object = { the: "object" };
				document.createFragment( object );

				expect( spy ).toHaveBeenCalledWith( document, object );
			} );

			it( "should throw error when object but slug label is already used", ():void => {
				const document:TransientDocument = createMockDocument();
				document.__resourcesMap.set( "fragment", null );

				expect( () => document.createFragment( {}, "fragment" ) ).toThrowError( IDAlreadyInUseError, `"#fragment" is already being used.` );
			} );

			it( "should throw error when only slug label is already used", ():void => {
				const document:TransientDocument = createMockDocument();
				document.__resourcesMap.set( "fragment", null );

				expect( () => document.createFragment( "fragment" ) ).toThrowError( IDAlreadyInUseError, `"#fragment" is already being used.` );
			} );

			it( "should throw error when object but absolute IRI provided is already used", ():void => {
				const document:TransientDocument = createMockDocument();
				document.__resourcesMap.set( "fragment", null );

				expect( () => document.createFragment( {}, "https://example.com/document/#fragment" ) ).toThrowError( IDAlreadyInUseError, `"https://example.com/document/#fragment" is already being used.` );
			} );

			it( "should throw error when only absolute IRI provided is already used", ():void => {
				const document:TransientDocument = createMockDocument();
				document.__resourcesMap.set( "fragment", null );

				expect( () => document.createFragment( "https://example.com/document/#fragment" ) ).toThrowError( IDAlreadyInUseError, `"https://example.com/document/#fragment" is already being used.` );
			} );

			it( "should throw error when object but blank node label is used", ():void => {
				const document:TransientDocument = createMockDocument();
				document.__resourcesMap.set( "_:1", null );

				expect( () => document.createFragment( {}, "_:1" ) ).toThrowError( IDAlreadyInUseError, `"_:1" is already being used.` );
			} );

			it( "should throw error when only blank node label is used", ():void => {
				const document:TransientDocument = createMockDocument();
				document.__resourcesMap.set( "_:1", null );

				expect( () => document.createFragment( "_:1" ) ).toThrowError( IDAlreadyInUseError, `"_:1" is already being used.` );
			} );

		} );

		describe( method( OBLIGATORY, "createNamedFragment" ), ():void => {

			it( hasSignature(
				"Creates a `CarbonLDP.TransientNamedFragment` with the slug provided.\n" +
				"If the slug has the form of a BlankNode ID, an Error is thrown.", [
					{ name: "slug", type: "string" },
				],
				{ type: "CarbonLDP.TransientNamedFragment" }
			), ():void => {} );

			it( hasSignature(
				[ "T" ],
				"Creates a `CarbonLDP.TransientNamedFragment` from the object provided and the slug specified.\n" +
				"If the slug has the form of a BlankNode ID, an Error is thrown.", [
					{ name: "object", type: "T" },
					{ name: "slug", type: "string" },
				],
				{ type: "T & CarbonLDP.TransientNamedFragment" }
			), ():void => {} );

			it( "should exists", ():void => {
				const document:TransientDocument = createMockDocument();

				expect( document.createNamedFragment ).toBeDefined();
				expect( document.createNamedFragment ).toEqual( jasmine.any( Function ) );
			} );


			it( "should create `NamedFragment` when object and slug label provided", ():void => {
				const document:TransientDocument = createMockDocument();
				type TargetFragment = TransientNamedFragment & { string:string };
				const fragment:TargetFragment = document.createNamedFragment( { string: "a string" }, "fragment" );

				expect( TransientNamedFragment.is( fragment ) ).toBe( true );
				expect( fragment as { string:string } ).toEqual( {
					string: "a string",
				} );
				expect( fragment.$id ).toBe( "https://example.com/document/#fragment" );
				expect( fragment.slug ).toBe( "fragment" );
			} );

			it( "should create `NamedFragment` when only slug label provided", ():void => {
				const document:TransientDocument = createMockDocument();
				const fragment:TransientNamedFragment = document.createNamedFragment( "fragment" );

				expect( TransientNamedFragment.is( fragment ) ).toBe( true );
				expect( fragment.$id ).toBe( "https://example.com/document/#fragment" );
				expect( fragment.slug ).toBe( "fragment" );
			} );

			it( "should create `NamedFragment` when object and absolute IRI provided", ():void => {
				const document:TransientDocument = createMockDocument();
				type TargetFragment = TransientNamedFragment & { string:string };
				const fragment:TargetFragment = document.createNamedFragment( { string: "a string" }, "https://example.com/document/#fragment" );

				expect( TransientNamedFragment.is( fragment ) ).toBe( true );
				expect( fragment as { string:string } ).toEqual( {
					string: "a string",
				} );
				expect( fragment.$id ).toBe( "https://example.com/document/#fragment" );
				expect( fragment.slug ).toBe( "fragment" );
			} );

			it( "should create `NamedFragment` when only absolute IRI provided", ():void => {
				const document:TransientDocument = createMockDocument();
				const fragment:TransientNamedFragment = document.createNamedFragment( "https://example.com/document/#fragment" );

				expect( TransientNamedFragment.is( fragment ) ).toBe( true );
				expect( fragment.$id ).toBe( "https://example.com/document/#fragment" );
				expect( fragment.slug ).toBe( "fragment" );
			} );

			it( "should throw error when object and blank node label provided", ():void => {
				const document:TransientDocument = createMockDocument();
				expect( () => document.createNamedFragment( {}, "_:1" ) ).toThrowError( IllegalArgumentError, `A named fragment slug can't start with "_:".` );
			} );

			it( "should throw error when only blank node label provided", ():void => {
				const document:TransientDocument = createMockDocument();
				expect( () => document.createNamedFragment( "_:1" ) ).toThrowError( IllegalArgumentError, `A named fragment slug can't start with "_:".` );
			} );

			it( "should call `convertNestedObjects` with the object provided", ():void => {
				const document:TransientDocument = createMockDocument();
				const spy:jasmine.Spy = spyOn( TransientDocument, "_convertNestedObjects" );

				const object:object = { the: "object" };
				document.createNamedFragment( object, "fragment" );

				expect( spy ).toHaveBeenCalledWith( document, object );
			} );

			it( "should throw error when object but slug label is already used", ():void => {
				const document:TransientDocument = createMockDocument();
				document.__resourcesMap.set( "fragment", null );

				expect( () => document.createNamedFragment( {}, "fragment" ) ).toThrowError( IDAlreadyInUseError, `"#fragment" is already being used.` );
			} );

			it( "should throw error when only slug label is already used", ():void => {
				const document:TransientDocument = createMockDocument();
				document.__resourcesMap.set( "fragment", null );

				expect( () => document.createNamedFragment( "fragment" ) ).toThrowError( IDAlreadyInUseError, `"#fragment" is already being used.` );
			} );

			it( "should throw error when object but absolute IRI provided is already used", ():void => {
				const document:TransientDocument = createMockDocument();
				document.__resourcesMap.set( "fragment", null );

				expect( () => document.createNamedFragment( {}, "https://example.com/document/#fragment" ) ).toThrowError( IDAlreadyInUseError, `"https://example.com/document/#fragment" is already being used.` );
			} );

			it( "should throw error when only absolute IRI provided is already used", ():void => {
				const document:TransientDocument = createMockDocument();
				document.__resourcesMap.set( "fragment", null );

				expect( () => document.createNamedFragment( "https://example.com/document/#fragment" ) ).toThrowError( IDAlreadyInUseError, `"https://example.com/document/#fragment" is already being used.` );
			} );

		} );

		describe( method( OBLIGATORY, "_removeFragment" ), ():void => {

			it( hasSignature(
				"Remove the fragment referenced by the `CarbonLDP.TransientFragment` provided from the Document.", [
					{ name: "fragment", type: "CarbonLDP.TransientFragment" },
				]
			), ():void => {} );

			it( hasSignature(
				"Remove the fragment referenced by the Slug provided from the Document.", [
					{ name: "slug", type: "string" },
				]
			), ():void => {} );

			it( "should exists", ():void => {
				const document:TransientDocument = createMockDocument();

				expect( document.removeFragment ).toBeDefined();
				expect( document.removeFragment ).toEqual( jasmine.any( Function ) );
			} );


			it( "should remove providing a `NamedFragment`", ():void => {
				const document:TransientDocument = createMockDocument();

				const fragment:TransientNamedFragment = TransientNamedFragment.create( {
					slug: "fragment",
				} );
				document.__resourcesMap.set( "fragment", fragment );

				document.removeFragment( fragment );
				expect( document.__resourcesMap ).toEqual( new Map() );
			} );

			it( "should remove providing a `BlankNode`", ():void => {
				const document:TransientDocument = createMockDocument();

				const fragment:TransientBlankNode = TransientBlankNode.create( {
					$id: "_:1",
				} );
				document.__resourcesMap.set( "_:1", fragment );

				document.removeFragment( fragment );
				expect( document.__resourcesMap ).toEqual( new Map() );
			} );

			it( "should remove providing a fragment label", ():void => {
				const document:TransientDocument = createMockDocument();

				document.__resourcesMap.set( "fragment", null );

				document.removeFragment( "#fragment" );
				expect( document.__resourcesMap ).toEqual( new Map() );
			} );

			it( "should remove providing a fragment slug label", ():void => {
				const document:TransientDocument = createMockDocument();

				document.__resourcesMap.set( "fragment", null );

				document.removeFragment( "fragment" );
				expect( document.__resourcesMap ).toEqual( new Map() );
			} );

			it( "should remove providing an absolute fragment IRI", ():void => {
				const document:TransientDocument = createMockDocument();

				document.__resourcesMap.set( "fragment", null );

				document.removeFragment( "https://example.com/document/#fragment" );
				expect( document.__resourcesMap ).toEqual( new Map() );
			} );

			it( "should remove providing a blank node label", ():void => {
				const document:TransientDocument = createMockDocument();
				document.__resourcesMap.set( "_:1", null );

				document.removeFragment( "_:1" );
				expect( document.__resourcesMap ).toEqual( new Map() );
			} );

		} );

		describe( method( OBLIGATORY, "removeNamedFragment" ), ():void => {

			it( hasSignature(
				"Remove the maned fragment referenced by the `CarbonLDP.TransientNamedFragment` provided from the Document.", [
					{ name: "fragment", type: "CarbonLDP.TransientNamedFragment" },
				]
			), ():void => {} );

			it( hasSignature(
				"Remove the named fragment referenced by the Slug provided from the Document.", [
					{ name: "slug", type: "string" },
				]
			), ():void => {} );

			it( "should exists", ():void => {
				const document:TransientDocument = createMockDocument();

				expect( document.removeNamedFragment ).toBeDefined();
				expect( document.removeNamedFragment ).toEqual( jasmine.any( Function ) );
			} );


			it( "should remove providing a `NamedFragment`", ():void => {
				const document:TransientDocument = createMockDocument();

				const fragment:TransientNamedFragment = TransientNamedFragment.create( {
					slug: "fragment",
				} );
				document.__resourcesMap.set( "fragment", fragment );

				document.removeNamedFragment( fragment );
				expect( document.__resourcesMap ).toEqual( new Map() );
			} );

			it( "should throw error providing a `BlankNode`", ():void => {
				const document:TransientDocument = createMockDocument();

				const fragment:TransientBlankNode = TransientBlankNode.create( {
					$id: "_:1",
				} );
				document.__resourcesMap.set( "_:1", fragment );

				expect( () => document.removeNamedFragment( fragment as any ) ).toThrowError( IllegalArgumentError, `A named fragment slug can't start with "_:".` );
			} );

			it( "should remove providing a fragment label", ():void => {
				const document:TransientDocument = createMockDocument();

				document.__resourcesMap.set( "fragment", null );

				document.removeNamedFragment( "#fragment" );
				expect( document.__resourcesMap ).toEqual( new Map() );
			} );

			it( "should remove providing a fragment slug label", ():void => {
				const document:TransientDocument = createMockDocument();

				document.__resourcesMap.set( "fragment", null );

				document.removeNamedFragment( "fragment" );
				expect( document.__resourcesMap ).toEqual( new Map() );
			} );

			it( "should remove providing an absolute fragment IRI", ():void => {
				const document:TransientDocument = createMockDocument();

				document.__resourcesMap.set( "fragment", null );

				document.removeNamedFragment( "https://example.com/document/#fragment" );
				expect( document.__resourcesMap ).toEqual( new Map() );
			} );

			it( "should throw error providing a blank node label", ():void => {
				const document:TransientDocument = createMockDocument();
				document.__resourcesMap.set( "_:1", null );

				expect( () => document.removeNamedFragment( "_:1" ) ).toThrowError( IllegalArgumentError, `A named fragment slug can't start with "_:".` );
			} );

		} );

		describe( method( OBLIGATORY, "toJSON" ), ():void => {

			it( hasSignature(
				"Returns a JSON string from the Document using the ObjectSchema and then JSONLDConverter if provided.", [
					{ name: "objectSchemaResolver", type: "CarbonLDP.ObjectSchemaResolver", optional: true },
					{ name: "jsonLDConverter", type: "CarbonLDP.JSONLDConverter.Class", optional: true },
				],
				{ type: "CarbonLDP.RDF.RDFDocument" }
			), ():void => {} );

			it( "should exists", ():void => {
				const document:TransientDocument = createMockDocument();

				expect( document.toJSON ).toBeDefined();
				expect( document.toJSON ).toEqual( jasmine.any( Function ) );
			} );


			it( "should expand empty when no assigned registry", ():void => {
				const document:TransientDocument = createMockDocument( { the: "document" } );
				document.createFragment( { id: "_:1", the: "blank node" } );
				document.createFragment( { id: "#fragment", the: "named fragment" } );

				const rdfDocument:RDFDocument = document.toJSON();
				expect( rdfDocument ).toEqual( {
					"@id": "https://example.com/document/",
					"@graph": [
						{
							"@id": "https://example.com/document/",
						},
						{
							"@id": "_:1",
						},
						{
							"@id": "https://example.com/document/#fragment",
						},
					],
				} );
			} );

			it( "should request schema for every resource rom assigned registry", ():void => {
				const registry:DocumentsRegistry = new DocumentsRegistry();
				const spy:jasmine.Spy = spyOn( registry, "getSchemaFor" ).and.callThrough();

				const document:TransientDocument = createMockDocument( { $registry: registry, the: "document" } );
				const bNode:TransientFragment = document.createFragment( { id: "_:1", the: "blank node" } );
				const namedFragment:TransientFragment = document.createFragment( { id: "#fragment", the: "named fragment" } );

				document.toJSON();

				expect( spy ).toHaveBeenCalledWith( document );
				expect( spy ).toHaveBeenCalledWith( bNode );
				expect( spy ).toHaveBeenCalledWith( namedFragment );
			} );

			it( "should expand every resource with the assigned registry", ():void => {
				const registry:DocumentsRegistry = new DocumentsRegistry();
				const spy:jasmine.Spy = spyOn( registry.jsonldConverter, "expand" );

				spyOn( registry, "getSchemaFor" ).and.callFake( object => {
					if( object.id === "_:1" ) return { mock: "schema _:1" };
					if( object.slug === "fragment" ) return { mock: "schema fragment" };
					return { mock: "schema document" };
				} );

				const document:TransientDocument = createMockDocument( { $registry: registry, the: "document" } );
				const bNode:TransientFragment = document.createFragment( { id: "_:1", the: "blank node" } );
				const namedFragment:TransientFragment = document.createFragment( { id: "#fragment", the: "named fragment" } );

				document.toJSON();

				expect( spy ).toHaveBeenCalledWith( document, jasmine.any( DigestedObjectSchema ), { mock: "schema document" } );
				expect( spy ).toHaveBeenCalledWith( bNode, jasmine.any( DigestedObjectSchema ), { mock: "schema _:1" } );
				expect( spy ).toHaveBeenCalledWith( namedFragment, jasmine.any( DigestedObjectSchema ), { mock: "schema fragment" } );
			} );

			it( "should expand with the assigned registry", ():void => {
				const registry:DocumentsRegistry = new DocumentsRegistry();
				spyOn( registry, "getSchemaFor" ).and
					.returnValue( ObjectSchemaDigester.digestSchema( {
						"@vocab": "https://example.com/ns#",
						"the": { "@type": "string" },
					} ) );

				const document:TransientDocument = createMockDocument( { $registry: registry, the: "document" } );
				document.createFragment( { id: "_:1", the: "blank node" } );
				document.createFragment( { id: "#fragment", the: "named fragment" } );

				const rdfDocument:RDFDocument = document.toJSON();
				expect( rdfDocument ).toEqual( {
					"@id": "https://example.com/document/",
					"@graph": [
						{
							"@id": "https://example.com/document/",
							"https://example.com/ns#the": [ {
								"@value": "document",
								"@type": XSD.string,
							} ],
						},
						{
							"@id": "_:1",
							"https://example.com/ns#the": [ {
								"@value": "blank node",
								"@type": XSD.string,
							} ],
						},
						{
							"@id": "https://example.com/document/#fragment",
							"https://example.com/ns#the": [ {
								"@value": "named fragment",
								"@type": XSD.string,
							} ],
						},
					],
				} );

			} );

			it( "should expand with the provided registry", ():void => {
				const registry:DocumentsRegistry = new DocumentsRegistry();
				spyOn( registry, "getSchemaFor" ).and
					.returnValue( ObjectSchemaDigester.digestSchema( {
						"@vocab": "https://example.com/ns#",
						"the": { "@type": "string" },
					} ) );


				const anotherRegistry:DocumentsRegistry = new DocumentsRegistry();
				spyOn( anotherRegistry, "getSchemaFor" ).and
					.returnValue( ObjectSchemaDigester.digestSchema( {
						"@vocab": "https://example.com/another#",
						"the": { "@type": "string" },
					} ) );

				const document:TransientDocument = createMockDocument( { $registry: registry, the: "document" } );
				document.createFragment( { id: "_:1", the: "blank node" } );
				document.createFragment( { id: "#fragment", the: "named fragment" } );

				const rdfDocument:RDFDocument = document.toJSON( anotherRegistry );
				expect( rdfDocument ).toEqual( {
					"@id": "https://example.com/document/",
					"@graph": [
						{
							"@id": "https://example.com/document/",
							"https://example.com/another#the": [ {
								"@value": "document",
								"@type": XSD.string,
							} ],
						},
						{
							"@id": "_:1",
							"https://example.com/another#the": [ {
								"@value": "blank node",
								"@type": XSD.string,
							} ],
						},
						{
							"@id": "https://example.com/document/#fragment",
							"https://example.com/another#the": [ {
								"@value": "named fragment",
								"@type": XSD.string,
							} ],
						},
					],
				} );

			} );


		} );

	} );

	describe( interfaze(
		"CarbonLDP.TransientDocumentFactory",
		"Interface with the factory, decorate and utils for `CarbonLDP.TransientDocument` objects."
	), ():void => {

		it( extendsClass( "CarbonLDP.ModelFactory<CarbonLDP.TransientDocument>" ), ():void => {} );
		it( extendsClass( "CarbonLDP.ModelDecorator<CarbonLDP.TransientDocument>" ), ():void => {} );

		it( hasMethod(
			OBLIGATORY,
			"isDecorated",
			"Returns true if the object provided has the properties and methods of a `CarbonLDP.TransientDocument` object.", [
				{ name: "object", type: "object" },
			],
			{ type: "object is CarbonLDP.TransientDocument" }
		), ():void => {} );

		it( hasMethod(
			OBLIGATORY,
			"is",
			"Returns true if the element provided is considered a `CarbonLDP.TransientDocument` object.", [
				{ name: "value", type: "any" },
			],
			{ type: "value is CarbonLDP.TransientDocument" }
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
			"Decorates the object provided with the properties and methods of a `CarbonLDP.TransientDocument` object.", [
				{ name: "object", type: "T" },
			],
			{ type: "T & CarbonLDP.TransientDocument" }
		), ():void => {} );

	} );

	describe( property(
		STATIC,
		"TransientDocument",
		"CarbonLDP.TransientDocumentFactory",
		"Constant that implements the `CarbonLDP.TransientDocumentFactory` interface."
	), ():void => {

		describe( "TransientDocument.TYPE", ():void => {

			it( "should exists", ():void => {
				expect( TransientDocument.TYPE ).toBeDefined();
				expect( TransientDocument.TYPE ).toEqual( jasmine.any( String ) );
			} );

			it( "should be `c:Document`", ():void => {
				expect( TransientDocument.TYPE ).toBe( C.Document );
			} );

		} );

		describe( "TransientDocument.is", ():void => {

			it( "should exists", ():void => {
				expect( TransientDocument.is ).toBeDefined();
				expect( TransientDocument.is ).toEqual( jasmine.any( Function ) );
			} );

			it( "should return false when `undefined`", ():void => {
				expect( TransientDocument.is( void 0 ) ).toBe( false );
			} );

			it( "should return false when `null`", ():void => {
				expect( TransientDocument.is( null ) ).toBe( false );
			} );


			let isResourceSpy:jasmine.Spy;
			let isRegistrySpy:jasmine.Spy;
			beforeEach( ():void => {
				isResourceSpy = spyOn( Resource, "is" )
					.and.returnValue( true );
				isRegistrySpy = spyOn( Registry, "isDecorated" )
					.and.returnValue( true );
			} );

			it( "should assert that is a `Resource`", ():void => {
				const target:object = { the: "object" };
				TransientDocument.is( target );

				expect( isResourceSpy ).toHaveBeenCalledWith( target );
			} );

			it( "should assert that is a `Registry`", ():void => {
				const target:object = { the: "object" };
				TransientDocument.is( target );

				expect( isRegistrySpy ).toHaveBeenCalledWith( target );
			} );

			it( "should assert that is decorated", ():void => {
				const spy:jasmine.Spy = spyOn( TransientDocument, "isDecorated" );

				const target:object = { the: "object" };
				TransientDocument.is( target );

				expect( spy ).toHaveBeenCalledWith( target );
			} );

			it( "should return true when all assertions", ():void => {
				spyOn( TransientDocument, "isDecorated" )
					.and.returnValue( true );

				expect( TransientDocument.is( {} ) ).toBe( true );
			} );

		} );

		describe( "TransientDocument.isDecorated", ():void => {

			it( "should exists", ():void => {
				expect( TransientDocument.isDecorated ).toBeDefined();
				expect( TransientDocument.isDecorated ).toEqual( jasmine.any( Function ) );
			} );


			it( "should return false when `undefined`", ():void => {
				expect( TransientDocument.isDecorated( void 0 ) ).toBe( false );
			} );

			it( "should return false when `null`", ():void => {
				expect( TransientDocument.isDecorated( null ) ).toBe( false );
			} );

			it( "should return true when all properties", ():void => {
				const target:DocumentProperties = mockDocumentProperties();
				expect( TransientDocument.isDecorated( target ) ).toBe( true );
			} );


			it( "should return false when no `_registry`", ():void => {
				const target:DocumentProperties = mockDocumentProperties();
				delete target.$registry;
				expect( TransientDocument.isDecorated( target ) ).toBe( false );
			} );

			it( "should return false when no `_getLocalID`", ():void => {
				const target:DocumentProperties = mockDocumentProperties();
				delete target.__getLocalID;
				expect( TransientDocument.isDecorated( target ) ).toBe( false );
			} );

			it( "should return false when no `_registry`", ():void => {
				const target:DocumentProperties = mockDocumentProperties();
				delete target.$registry;
				expect( TransientDocument.isDecorated( target ) ).toBe( false );
			} );

			it( "should return false when no `getPointer`", ():void => {
				const target:DocumentProperties = mockDocumentProperties();
				delete target.getPointer;
				expect( TransientDocument.isDecorated( target ) ).toBe( false );
			} );


			it( "should return true when no `hasMemberRelation`", ():void => {
				const target:DocumentProperties = mockDocumentProperties();
				delete target.hasMemberRelation;
				expect( TransientDocument.isDecorated( target ) ).toBe( true );
			} );

			it( "should return true when no `isMemberOfRelation`", ():void => {
				const target:DocumentProperties = mockDocumentProperties();
				delete target.isMemberOfRelation;
				expect( TransientDocument.isDecorated( target ) ).toBe( true );
			} );

			it( "should return true when no `defaultInteractionModel`", ():void => {
				const target:DocumentProperties = mockDocumentProperties();
				delete target.defaultInteractionModel;
				expect( TransientDocument.isDecorated( target ) ).toBe( true );
			} );

			it( "should return false when no `_normalize`", ():void => {
				const target:DocumentProperties = mockDocumentProperties();
				delete target._normalize;
				expect( TransientDocument.isDecorated( target ) ).toBe( false );
			} );

			it( "should return false when no `_removeFragment`", ():void => {
				const target:DocumentProperties = mockDocumentProperties();
				delete target.removeFragment;
				expect( TransientDocument.isDecorated( target ) ).toBe( false );
			} );

			it( "should return false when no `hasFragment`", ():void => {
				const target:DocumentProperties = mockDocumentProperties();
				delete target.hasFragment;
				expect( TransientDocument.isDecorated( target ) ).toBe( false );
			} );

			it( "should return false when no `getFragment`", ():void => {
				const target:DocumentProperties = mockDocumentProperties();
				delete target.getFragment;
				expect( TransientDocument.isDecorated( target ) ).toBe( false );
			} );

			it( "should return false when no `getNamedFragment`", ():void => {
				const target:DocumentProperties = mockDocumentProperties();
				delete target.getNamedFragment;
				expect( TransientDocument.isDecorated( target ) ).toBe( false );
			} );

			it( "should return false when no `getFragments`", ():void => {
				const target:DocumentProperties = mockDocumentProperties();
				delete target.getFragments;
				expect( TransientDocument.isDecorated( target ) ).toBe( false );
			} );

			it( "should return false when no `createFragment`", ():void => {
				const target:DocumentProperties = mockDocumentProperties();
				delete target.createFragment;
				expect( TransientDocument.isDecorated( target ) ).toBe( false );
			} );

			it( "should return false when no `createNamedFragment`", ():void => {
				const target:DocumentProperties = mockDocumentProperties();
				delete target.createNamedFragment;
				expect( TransientDocument.isDecorated( target ) ).toBe( false );
			} );

			it( "should return false when no `removeNamedFragment`", ():void => {
				const target:DocumentProperties = mockDocumentProperties();
				delete target.removeNamedFragment;
				expect( TransientDocument.isDecorated( target ) ).toBe( false );
			} );

			it( "should return false when no `toJSON`", ():void => {
				const target:DocumentProperties = mockDocumentProperties();
				delete target.toJSON;
				expect( TransientDocument.isDecorated( target ) ).toBe( false );
			} );

		} );

		describe( "TransientDocument.create", ():void => {

			it( "should exists", ():void => {
				expect( TransientDocument.create ).toBeDefined();
				expect( TransientDocument.create ).toEqual( jasmine.any( Function ) );
			} );

			it( "should return a `Document`", ():void => {
				const target:TransientDocument = TransientDocument.create();
				expect( TransientDocument.is( target ) ).toBe( true );
			} );

		} );

		describe( "TransientDocument.createFrom", ():void => {

			it( "should exists", ():void => {
				expect( TransientDocument.createFrom ).toBeDefined();
				expect( TransientDocument.createFrom ).toEqual( jasmine.any( Function ) );
			} );

			it( "should create a `Document`", ():void => {
				const target:TransientDocument = TransientDocument.createFrom( {} );
				expect( TransientDocument.is( target ) ).toBe( true );
			} );

			it( "should convert nested objects to `Fragment`s", ():void => {
				type TargetDocument = TransientDocument & { object:object };
				const target:TargetDocument = TransientDocument.createFrom( { $id: "", object: {} } );

				expect( TransientFragment.is( target.object ) ).toBe( true );
			} );

		} );

		describe( "TransientDocument.decorate", ():void => {

			it( "should exists", ():void => {
				expect( TransientDocument.decorate ).toBeDefined();
				expect( TransientDocument.decorate ).toEqual( jasmine.any( Function ) );
			} );

			it( "should add the `TransientResource` properties", ():void => {
				const target:Resource = TransientDocument.decorate( {} );
				expect( Resource.isDecorated( target ) ).toBe( true );
			} );

			it( "should add the `Registry` properties", ():void => {
				const target:Registry<any> = TransientDocument.decorate( {} );
				expect( Registry.isDecorated( target ) ).toBe( true );
			} );

			it( "should add the `TransientDocument` properties", ():void => {
				const target:TransientDocument = TransientDocument.decorate( {} );
				expect( TransientDocument.isDecorated( target ) ).toBe( true );
			} );

		} );

		describe( "TransientDocument._convertNestedObjects", ():void => {

			it( "should exists", ():void => {
				expect( TransientDocument._convertNestedObjects ).toBeDefined();
				expect( TransientDocument._convertNestedObjects ).toEqual( jasmine.any( Function ) );
			} );

			it( "should convert single object property to `Fragment`", ():void => {
				type TargetDocument = TransientDocument & { object?:{ string:string } };
				const document:TargetDocument = createMockDocument();
				document.object = { string: "new object" };

				TransientDocument._convertNestedObjects( document, document );
				expect( document.object ).toEqual( { string: "new object" } );

				expect( TransientFragment.is( document.object ) ).toBe( true );
				expect( document.hasFragment( document.object[ "id" ] ) ).toBe( true );
			} );

			it( "should convert object array property to `Fragment`", ():void => {
				type TargetDocument = TransientDocument & { array?:{ string:string }[] };
				const document:TargetDocument = createMockDocument();
				document.array = [ { string: "element 1" }, { string: "element 2" } ];

				TransientDocument._convertNestedObjects( document, document );
				expect( document.array ).toEqual( [
					{ string: "element 1" },
					{ string: "element 2" },
				] );

				expect( TransientFragment.is( document.array[ 0 ] ) ).toBe( true );
				expect( document.hasFragment( document.array[ 0 ][ "id" ] ) ).toBe( true );

				expect( TransientFragment.is( document.array[ 1 ] ) ).toBe( true );
				expect( document.hasFragment( document.array[ 1 ][ "id" ] ) ).toBe( true );
			} );

			it( "should convert second level object property to `Fragment`", ():void => {
				type TargetDocument = TransientDocument & { object?:{ object:{ string:string } } };
				const document:TargetDocument = createMockDocument();
				document.object = { object: { string: "new object" } };

				TransientDocument._convertNestedObjects( document, document );
				expect( document.object ).toEqual( { object: { string: "new object" } } );

				expect( TransientFragment.is( document.object ) ).toBe( true );
				expect( document.hasFragment( document.object[ "id" ] ) ).toBe( true );

				expect( TransientFragment.is( document.object.object ) ).toBe( true );
				expect( document.hasFragment( document.object.object[ "id" ] ) ).toBe( true );
			} );

			it( "should convert only second level object property to `Fragment`", ():void => {
				type TargetDocument = TransientDocument & { object?:{ object:{ string:string } } };
				const document:TargetDocument = createMockDocument();
				document.object = { object: { string: "new object" } };

				TransientDocument._convertNestedObjects( document, document.object );
				expect( document.object ).toEqual( { object: { string: "new object" } } );

				expect( TransientFragment.is( document.object ) ).toBe( false );

				expect( TransientFragment.is( document.object.object ) ).toBe( true );
				expect( document.hasFragment( document.object.object[ "id" ] ) ).toBe( true );
			} );

			it( "should be a `BlankNode` when no slug/id in new object", ():void => {
				type TargetDocument = TransientDocument & { object?:{ string:string } };
				const document:TargetDocument = createMockDocument();
				document.object = { string: "new object" };

				TransientDocument._convertNestedObjects( document, document );
				expect( document.object ).toEqual( { string: "new object" } );

				expect( TransientBlankNode.is( document.object ) ).toBe( true );
			} );

			it( "should be a `BlankNode` when bnode label in id property", ():void => {
				type TargetDocument = TransientDocument & { object?:{ id?:string, string:string } };
				const document:TargetDocument = createMockDocument();
				document.object = { id: "_:1", string: "new object" };

				TransientDocument._convertNestedObjects( document, document );

				expect( document.object ).toEqual( { string: "new object" } );
				expect( TransientBlankNode.is( document.object ) ).toBe( true );

				expect( document.hasFragment( "_:1" ) ).toBe( true );
				expect( document.object ).toBe( document.getFragment( "_:1" ) );
			} );

			it( "should be a `NamedFragment` when relative fragment label in id property", ():void => {
				type TargetDocument = TransientDocument & { object?:{ id?:string, string:string } };
				const document:TargetDocument = createMockDocument();
				document.object = { id: "#fragment", string: "new object" };

				TransientDocument._convertNestedObjects( document, document );

				expect( document.object ).toEqual( { string: "new object" } );
				expect( TransientNamedFragment.is( document.object ) ).toBe( true );

				expect( document.hasFragment( "#fragment" ) ).toBe( true );
				expect( document.object ).toBe( document.getFragment( "#fragment" ) );
			} );

			it( "should be a `NamedFragment` when relative fragment label in slug property", ():void => {
				type TargetDocument = TransientDocument & { object?:{ slug?:string, string:string } };
				const document:TargetDocument = createMockDocument();
				document.object = { slug: "#1", string: "new object" };

				TransientDocument._convertNestedObjects( document, document );

				expect( document.object ).toEqual( { string: "new object" } );
				expect( TransientNamedFragment.is( document.object ) ).toBe( true );

				expect( document.hasFragment( "#1" ) ).toBe( true );
				expect( document.object ).toBe( document.getFragment( "#1" ) );
			} );

			it( "should be a `NamedFragment` when relative label in slug property", ():void => {
				type TargetDocument = TransientDocument & { object?:{ slug?:string, string:string } };
				const document:TargetDocument = createMockDocument();
				document.object = { slug: "fragment", string: "new object" };

				TransientDocument._convertNestedObjects( document, document );

				expect( document.object ).toEqual( { string: "new object" } );
				expect( TransientNamedFragment.is( document.object ) ).toBe( true );

				expect( document.hasFragment( "#fragment" ) ).toBe( true );
				expect( document.object ).toBe( document.getFragment( "#fragment" ) );
			} );

		} );

	} );

} );
