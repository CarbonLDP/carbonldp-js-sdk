import AbstractContext from "./AbstractContext";

import * as Document from "./Document";
import DefaultExport from "./Document";
import * as Errors from "./Errors";
import * as Fragment from "./Fragment";
import JSONLDConverter from "./JSONLD/Converter";
import * as NamedFragment from "./NamedFragment";
import * as NS from "./Vocabularies/index";
import * as Pointer from "./Pointer";
import * as URI from "./RDF/URI";
import * as Resource from "./Resource";
import {
	clazz,
	decoratedObject,
	hasDefaultExport,
	hasMethod,
	hasProperty,
	hasSignature,
	INSTANCE,
	interfaze,
	isDefined,
	method,
	module,
	OBLIGATORY,
	OPTIONAL,
	STATIC,
} from "./test/JasmineExtender";
import * as Utils from "./Utils";

describe( module( "Carbon/Document" ), ():void => {

	it( isDefined(), ():void => {
		expect( Document ).toBeDefined();
		expect( Utils.isObject( Document ) ).toBe( true );
	} );

	it( hasProperty(
		STATIC,
		"RDF_CLASS",
		"string"
	), ():void => {
		expect( Document.RDF_CLASS ).toBeDefined();
		expect( Utils.isString( Document.RDF_CLASS ) ).toBe( true );

		expect( Document.RDF_CLASS ).toBe( NS.C.Document );
	} );

	it( hasProperty(
		STATIC,
		"SCHEMA",
		"Carbon.ObjectSchema.Class"
	), ():void => {
		expect( Document.SCHEMA ).toBeDefined();
		expect( Utils.isObject( Document.SCHEMA ) ).toBe( true );

		expect( Utils.hasProperty( Document.SCHEMA, "contains" ) ).toBe( true );
		expect( Document.SCHEMA[ "contains" ] ).toEqual( {
			"@id": NS.LDP.Predicate.contains,
			"@container": "@set",
			"@type": "@id",
		} );

		expect( Utils.hasProperty( Document.SCHEMA, "members" ) ).toBe( true );
		expect( Document.SCHEMA[ "members" ] ).toEqual( {
			"@id": NS.LDP.Predicate.member,
			"@container": "@set",
			"@type": "@id",
		} );


		expect( Utils.hasProperty( Document.SCHEMA, "membershipResource" ) ).toBe( true );
		expect( Document.SCHEMA[ "membershipResource" ] ).toEqual( {
			"@id": NS.LDP.Predicate.membershipResource,
			"@type": "@id",
		} );

		expect( Utils.hasProperty( Document.SCHEMA, "isMemberOfRelation" ) ).toBe( true );
		expect( Document.SCHEMA[ "isMemberOfRelation" ] ).toEqual( {
			"@id": NS.LDP.Predicate.isMemberOfRelation,
			"@type": "@id",
		} );

		expect( Utils.hasProperty( Document.SCHEMA, "hasMemberRelation" ) ).toBe( true );
		expect( Document.SCHEMA[ "hasMemberRelation" ] ).toEqual( {
			"@id": NS.LDP.Predicate.hasMemberRelation,
			"@type": "@id",
		} );

		expect( Utils.hasProperty( Document.SCHEMA, "insertedContentRelation" ) ).toBe( true );
		expect( Document.SCHEMA[ "insertedContentRelation" ] ).toEqual( {
			"@id": NS.LDP.Predicate.insertedContentRelation,
			"@type": "@id",
		} );

		expect( Utils.hasProperty( Document.SCHEMA, "created" ) ).toBe( true );
		expect( Document.SCHEMA[ "created" ] ).toEqual( {
			"@id": NS.C.created,
			"@type": NS.XSD.DataType.dateTime,
		} );

		expect( Utils.hasProperty( Document.SCHEMA, "modified" ) ).toBe( true );
		expect( Document.SCHEMA[ "modified" ] ).toEqual( {
			"@id": NS.C.modified,
			"@type": NS.XSD.DataType.dateTime,
		} );

		expect( Utils.hasProperty( Document.SCHEMA, "defaultInteractionModel" ) ).toBe( true );
		expect( Document.SCHEMA[ "defaultInteractionModel" ] ).toEqual( {
			"@id": NS.C.defaultInteractionModel,
			"@type": "@id",
		} );

		expect( Utils.hasProperty( Document.SCHEMA, "accessPoints" ) ).toBe( true );
		expect( Document.SCHEMA[ "accessPoints" ] ).toEqual( {
			"@id": NS.C.accessPoint,
			"@type": "@id",
			"@container": "@set",
		} );
	} );

	describe( interfaze(
		"Carbon.Document.Class",
		"Interface that represents an in-memory Carbon LDP Document."
	), ():void => {

		it( hasProperty(
			OPTIONAL,
			"defaultInteractionModel",
			"Carbon.Pointer.Class",
			"A Pointer URI representing the default interaction model of the document when persisted."
		), ():void => {} );

		it( hasProperty(
			OPTIONAL,
			"isMemberOfRelation",
			"Carbon.Pointer.Class",
			"A Pointer with the member of relation of the document."
		), ():void => {} );

		it( hasProperty(
			OPTIONAL,
			"hasMemberRelation",
			"Carbon.Pointer.Class",
			"A Pointer with the inverted relation the document will have."
		), ():void => {} );

		it( hasProperty(
			OBLIGATORY,
			"_fragmentsIndex",
			"Map<string, Carbon.Fragment.Class>",
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
					{ name: "pointer", type: "Carbon.Pointer.Class" },
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
			{ type: "T & Carbon.Fragment.Class" }
		), ():void => {} );

		it( hasMethod(
			OBLIGATORY,
			"getNamedFragment",
			[ "T" ],
			"Returns the fragment referenced by the ID provided.\n" +
			"Returns `null` if no fragment exists in the Document.", [
				{ name: "id", type: "string" },
			],
			{ type: "T & Carbon.Fragment.Class" }
		), ():void => {} );

		it( hasMethod(
			OBLIGATORY,
			"getFragments",
			"Returns an array with all the fragments in the Document.",
			{ type: "Carbon.Fragment.Class[]" }
		), ():void => {} );

		describe( method(
			OBLIGATORY,
			"createFragment"
		), ():void => {

			it( hasSignature(
				[ "T" ],
				"Creates a `Carbon.NamedFragment.Class` from the object provided and the slug specified.\n" +
				"If the slug has the form of a BlankNode ID, a `Carbon.Fragment.Class` is created instead.", [
					{ name: "object", type: "T" },
					{ name: "slug", type: "string" },
				],
				{ type: "T & Carbon.Fragment.Class" }
			), ():void => {} );

			it( hasSignature(
				[ "T" ],
				"Creates a `Carbon.Fragment.Class` from the object provided, since no slug is specified.", [
					{ name: "object", type: "object" },
				],
				{ type: "T & Carbon.Fragment.Class" }
			), ():void => {} );

			it( hasSignature(
				"Creates an empty `Carbon.NamedFragment.Class` with the slug specified.\n" +
				"If the slug has the form of a BlankNode ID, a `Carbon.Fragment.Class` is created instead.", [
					{ name: "slug", type: "string" },
				],
				{ type: "Carbon.Fragment.Class" }
			), ():void => {} );

			it( hasSignature(
				"Creates an empty `Carbon.Fragment.Class`, since no slug is provided.",
				{ type: "Carbon.Fragment.Class" }
			), ():void => {} );

		} );

		describe( method(
			OBLIGATORY,
			"createNamedFragment"
		), ():void => {

			it( hasSignature(
				"Creates a `Carbon.NamedFragment.Class` with the slug provided.\n" +
				"If the slug has the form of a BlankNode ID, an Error is thrown.", [
					{ name: "slug", type: "string" },
				],
				{ type: "Carbon.NamedFragment.Class" }
			), ():void => {} );

			it( hasSignature(
				[ "T" ],
				"Creates a `Carbon.NamedFragment.Class` from the object provided and the slug specified.\n" +
				"If the slug has the form of a BlankNode ID, an Error is thrown.", [
					{ name: "object", type: "T" },
					{ name: "slug", type: "string" },
				],
				{ type: "T & Carbon.NamedFragment.Class" }
			), ():void => {} );

		} );

		describe( method(
			OBLIGATORY,
			"_removeFragment"
		), ():void => {

			it( hasSignature(
				"Remove the fragment referenced by the `Carbon.Fragment.Class` provided from the Document.", [
					{ name: "fragment", type: "Carbon.Fragment.Class" },
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
				"Remove the maned fragment referenced by the `Carbon.NamedFragment.Class` provided from the Document.", [
					{ name: "fragment", type: "Carbon.NamedFragment.Class" },
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
				"Returns a JSON string from the Document using an ObjectSchema and a JSONLDConverter.", [
					{ name: "objectSchemaResolver", type: "Carbon.ObjectSchema.Resolver" },
					{ name: "jsonLDConverter", type: "Carbon.JSONLDConverter.Class" },
				],
				{ type: "string" }
			), ():void => {} );

			it( hasSignature(
				"Returns a JSON string from the Document using an ObjectSchema", [
					{ name: "objectSchemaResolver", type: "Carbon.ObjectSchema.Resolver" },
				],
				{ type: "string" }
			), ():void => {} );

			it( hasSignature(
				"Returns a JSON string from the Document using the default ObjectSchema.",
				{ type: "string" }
			), ():void => {} );

		} );

	} );

	it( hasDefaultExport( "Carbon.Document.Class" ), ():void => {
		let defaultExport:DefaultExport = <any> {};
		let defaultTarget:Document.Class;

		defaultTarget = defaultExport;
		expect( defaultTarget ).toEqual( jasmine.any( Object ) );
	} );

	describe( clazz(
		"Carbon.Document.Factory",
		"Factory class for `Carbon.Document.Class` objects."
	), ():void => {

		it( isDefined(), ():void => {
			expect( Document.Factory ).toBeDefined();
			expect( Utils.isFunction( Document.Factory ) ).toBe( true );
		} );

		it( hasMethod(
			STATIC,
			"hasClassProperties",
			"Returns true if the object provided has the properties and methods of a `Carbon.Document.Class` object.", [
				{ name: "documentResource", type: "Object" },
			],
			{ type: "boolean" }
		), ():void => {
			expect( Document.Factory.hasClassProperties ).toBeDefined();
			expect( Utils.isFunction( Document.Factory.hasClassProperties ) ).toBe( true );

			let resource:any = undefined;
			expect( Document.Factory.hasClassProperties( resource ) ).toBe( false );

			resource = {
				hasMemberRelation: null,
				isMemberOfRelation: null,
				defaultInteractionModel: null,

				_fragmentsIndex: null,
				_normalize: ():void => {},
				_removeFragment: ():void => {},
				hasFragment: ():void => {},
				getFragment: ():void => {},
				getNamedFragment: ():void => {},
				getFragments: ():void => {},
				createFragment: ():void => {},
				createNamedFragment: ():void => {},
				removeNamedFragment: ():void => {},
				toJSON: ():void => {},
			};
			expect( Document.Factory.hasClassProperties( resource ) ).toBe( true );

			delete resource.hasMemberRelation;
			expect( Document.Factory.hasClassProperties( resource ) ).toBe( true );
			resource.hasMemberRelation = null;

			delete resource.isMemberOfRelation;
			expect( Document.Factory.hasClassProperties( resource ) ).toBe( true );
			resource.isMemberOfRelation = null;

			delete resource.defaultInteractionModel;
			expect( Document.Factory.hasClassProperties( resource ) ).toBe( true );
			resource.defaultInteractionModel = null;

			delete resource._fragmentsIndex;
			expect( Document.Factory.hasClassProperties( resource ) ).toBe( false );
			resource._fragmentsIndex = null;

			delete resource._normalize;
			expect( Document.Factory.hasClassProperties( resource ) ).toBe( false );
			resource._normalize = ():void => {};

			delete resource._removeFragment;
			expect( Document.Factory.hasClassProperties( resource ) ).toBe( false );
			resource._removeFragment = ():void => {};

			delete resource.hasFragment;
			expect( Document.Factory.hasClassProperties( resource ) ).toBe( false );
			resource.hasFragment = ():void => {};

			delete resource.getFragment;
			expect( Document.Factory.hasClassProperties( resource ) ).toBe( false );
			resource.getFragment = ():void => {};

			delete resource.getNamedFragment;
			expect( Document.Factory.hasClassProperties( resource ) ).toBe( false );
			resource.getNamedFragment = ():void => {};

			delete resource.getFragments;
			expect( Document.Factory.hasClassProperties( resource ) ).toBe( false );
			resource.getFragments = ():void => {};

			delete resource.createFragment;
			expect( Document.Factory.hasClassProperties( resource ) ).toBe( false );
			resource.createFragment = ():void => {};

			delete resource.createNamedFragment;
			expect( Document.Factory.hasClassProperties( resource ) ).toBe( false );
			resource.createNamedFragment = ():void => {};

			delete resource.removeNamedFragment;
			expect( Document.Factory.hasClassProperties( resource ) ).toBe( false );
			resource.removeNamedFragment = ():void => {};

			delete resource.toJSON;
			expect( Document.Factory.hasClassProperties( resource ) ).toBe( false );
			resource.toJSON = ():void => {};
		} );

		it( hasMethod(
			STATIC,
			"is",
			"Returns true if the object provided is considered a `Carbon.Document.Class` object.", [
				{ name: "object", type: "object" },
			],
			{ type: "boolean" }
		), ():void => {
			expect( Document.Factory.hasClassProperties ).toBeDefined();
			expect( Utils.isFunction( Document.Factory.hasClassProperties ) ).toBe( true );

			let resource:Object = undefined;
			expect( Document.Factory.is( resource ) ).toBe( false );
			resource = {};
			expect( Document.Factory.is( resource ) ).toBe( false );
			resource[ "_fragmentsIndex" ] = null;
			expect( Document.Factory.is( resource ) ).toBe( false );
			resource[ "_normalize" ] = ():void => {};
			expect( Document.Factory.is( resource ) ).toBe( false );
			resource[ "_removeFragment" ] = ():void => {};
			expect( Document.Factory.is( resource ) ).toBe( false );
			resource[ "hasFragment" ] = ():void => {};
			expect( Document.Factory.is( resource ) ).toBe( false );
			resource[ "getFragment" ] = ():void => {};
			expect( Document.Factory.is( resource ) ).toBe( false );
			resource[ "getNamedFragment" ] = ():void => {};
			expect( Document.Factory.is( resource ) ).toBe( false );
			resource[ "getFragments" ] = ():void => {};
			expect( Document.Factory.is( resource ) ).toBe( false );
			resource[ "createFragment" ] = ():void => {};
			expect( Document.Factory.is( resource ) ).toBe( false );
			resource[ "createNamedFragment" ] = ():void => {};
			expect( Document.Factory.is( resource ) ).toBe( false );
			resource[ "removeNamedFragment" ] = ():void => {};
			expect( Document.Factory.is( resource ) ).toBe( false );
			resource[ "toJSON" ] = ():void => {};
			expect( Document.Factory.is( resource ) ).toBe( false );

			let document:Resource.Class = Resource.Factory.createFrom( resource );
			expect( Document.Factory.is( document ) ).toBe( true );
		} );

		describe( method(
			STATIC,
			"create"
		), ():void => {

			it( hasSignature(
				"Creates a `Carbon.Document.Class` object.",
				{ type: "Carbon.Document.Class" }
			), ():void => {
				expect( Document.Factory.create ).toBeDefined();
				expect( Utils.isFunction( Document.Factory.create ) ).toBe( true );

				let document:Document.Class;
				document = Document.Factory.create();
				expect( document.id ).toBe( "" );
				expect( Document.Factory.hasClassProperties( document ) ).toBe( true );
			} );

		} );


		describe( method(
			STATIC,
			"createFrom"
		), ():void => {

			it( hasSignature(
				[ "T extends Object" ],
				"Creates a `Carbon.Document.Class` object from the object provided.", [
					{ name: "object", type: "T", description: "Object to be converted into a Document." },
				],
				{ type: "T & Carbon.Document.Class" }
			), ():void => {
				expect( Document.Factory.createFrom ).toBeDefined();
				expect( Utils.isFunction( Document.Factory.createFrom ) ).toBe( true );

				interface MyInterface {
					myProperty?:string;
				}

				let document:Document.Class & MyInterface;

				document = Document.Factory.createFrom<MyInterface>( {} );
				expect( Document.Factory.hasClassProperties( document ) ).toBe( true );
				expect( document.id ).toBe( "" );
				expect( document.myProperty ).toBeUndefined();


				document = Document.Factory.createFrom<MyInterface>( { myProperty: "a property" } );
				expect( Document.Factory.hasClassProperties( document ) ).toBe( true );
				expect( document.id ).toBe( "" );
				expect( document.myProperty ).toBe( "a property" );

				// Conversion of simple nested objects to BlankNodes and NamedFragments
				(() => {
					let object:any = {
						myProperty: "THE property",
						myBlankNode: {
							myProperty: "A BlankNode property",
						},
						myNamedFragment: {
							slug: "namedFragment",
							myProperty: "A NamedFragment property",
						},
					};
					document = Document.Factory.createFrom<MyInterface>( object );
					expect( object ).toBe( document );
					expect( document.id ).toBe( "" );
					expect( document.myProperty ).toBe( "THE property" );
					expect( document.hasFragment( "namedFragment" ) ).toBe( true );

					let fragments:Fragment.Class[] = document.getFragments();
					expect( fragments.length ).toBe( 2 );

					let theBNode:Fragment.Class & MyInterface,
						theNFragment:NamedFragment.Class & MyInterface;

					theBNode = <Fragment.Class & MyInterface> fragments[ 0 ];
					theNFragment = <NamedFragment.Class & MyInterface> fragments[ 1 ];

					expect( URI.Util.isBNodeID( theBNode.id ) ).toBe( true );
					expect( theBNode.myProperty ).toBe( "A BlankNode property" );
					expect( document[ "myBlankNode" ] ).toBe( theBNode );
					expect( object[ "myBlankNode" ] ).toBe( document[ "myBlankNode" ] );

					expect( URI.Util.getFragment( theNFragment.id ) ).toEqual( theNFragment.slug );
					expect( theNFragment.slug ).toBe( "namedFragment" );
					expect( theNFragment.myProperty ).toBe( "A NamedFragment property" );
					expect( document[ "myNamedFragment" ] ).toBe( theNFragment );
					expect( object[ "myNamedFragment" ] ).toBe( document[ "myNamedFragment" ] );
				})();

				// Conversion double nested objects to BlankNodes and NamedFragments
				(() => {
					let object:any = {
						myProperty: "THE property",
						myBlankNode: {
							myProperty: "A BlankNode property",
						},
						myNamedFragment: {
							slug: "namedFragment",
							myProperty: "A NamedFragment property",
							anotherFragment: {
								myProperty: "A nested BlankNode property",
							},
						},
					};
					document = Document.Factory.createFrom<MyInterface>( object );
					expect( object ).toBe( document );
					expect( document.id ).toBe( "" );
					expect( document.myProperty ).toBe( "THE property" );
					expect( document.hasFragment( "namedFragment" ) ).toBe( true );

					let fragments:Fragment.Class[] = document.getFragments();
					expect( fragments.length ).toBe( 3 );

					let theBNode:Fragment.Class & MyInterface,
						theNestedBNode:Fragment.Class & MyInterface,
						theNFragment:NamedFragment.Class & MyInterface;
					theBNode = <Fragment.Class & MyInterface> fragments[ 0 ];
					theNFragment = <NamedFragment.Class & MyInterface> fragments[ 1 ];
					theNestedBNode = <Fragment.Class & MyInterface> fragments[ 2 ];

					expect( URI.Util.isBNodeID( theBNode.id ) ).toBe( true );
					expect( theBNode.myProperty ).toBe( "A BlankNode property" );
					expect( document[ "myBlankNode" ] ).toBe( theBNode );
					expect( object[ "myBlankNode" ] ).toBe( document[ "myBlankNode" ] );

					expect( URI.Util.getFragment( theNFragment.id ) ).toEqual( theNFragment.slug );
					expect( theNFragment.slug ).toBe( "namedFragment" );
					expect( theNFragment.myProperty ).toBe( "A NamedFragment property" );
					expect( document[ "myNamedFragment" ] ).toBe( theNFragment );
					expect( object[ "myNamedFragment" ] ).toBe( document[ "myNamedFragment" ] );

					expect( URI.Util.isBNodeID( theNestedBNode.id ) ).toBe( true );
					expect( theNestedBNode.myProperty ).toBe( "A nested BlankNode property" );
					expect( theNFragment[ "anotherFragment" ] ).toBe( theNestedBNode );
					expect( object[ "anotherFragment" ] ).toBe( document[ "anotherFragment" ] );
				})();

				// Conversion of a nested object with a reference to another nested object
				(() => {
					let fragment:any = {
						myProperty: "A BlankNode property",
					};
					let object:any = {
						myProperty: "THE property",
						myBlankNode: fragment,
						myNamedFragment: {
							slug: "namedFragment",
							myProperty: "A NamedFragment property",
							sameBlankNode: fragment,
						},
					};
					document = Document.Factory.createFrom<MyInterface>( object );
					expect( object ).toBe( document );
					expect( document.id ).toBe( "" );
					expect( document.myProperty ).toBe( "THE property" );
					expect( document.hasFragment( "namedFragment" ) ).toBe( true );

					let fragments:Fragment.Class[] = document.getFragments();
					expect( fragments.length ).toBe( 2 );

					let theBNode:Fragment.Class & MyInterface,
						theNFragment:NamedFragment.Class & MyInterface;
					theBNode = <Fragment.Class & MyInterface> fragments[ 0 ];
					theNFragment = <NamedFragment.Class & MyInterface> fragments[ 1 ];

					expect( URI.Util.isBNodeID( theBNode.id ) ).toBe( true );
					expect( theBNode.myProperty ).toBe( "A BlankNode property" );
					expect( document[ "myBlankNode" ] ).toBe( theBNode );
					expect( document[ "myBlankNode" ] ).toBe( document[ "myNamedFragment" ][ "sameBlankNode" ] );
					expect( object[ "myBlankNode" ] ).toBe( document[ "myBlankNode" ] );

					expect( URI.Util.getFragment( theNFragment.id ) ).toEqual( theNFragment.slug );
					expect( theNFragment.slug ).toBe( "namedFragment" );
					expect( theNFragment.myProperty ).toBe( "A NamedFragment property" );
					expect( document[ "myNamedFragment" ] ).toBe( theNFragment );
					expect( object[ "myNamedFragment" ] ).toBe( document[ "myNamedFragment" ] );

					expect( theNFragment[ "sameBlankNode" ] ).toBe( theBNode );
					expect( object[ "myNamedFragment" ][ "sameBlankNode" ] ).toBe( document[ "myNamedFragment" ][ "sameBlankNode" ] );
					expect( fragment ).toBe( document[ "myBlankNode" ] );
				})();

				// If there are multiples nested objects that implies the same Fragment, the reference to the first converted is preserved adding changes from the remaining ones
				(() => {
					let anotherBlankNode1:any = {
						id: "_:2",
						myProperty: "Another BNode property",
					};
					let anotherBlankNode2:any = {
						id: "_:2",
						newProperty: "New property",
					};
					let object:any = {
						id: "http://example.org/resource/",
						myProperty: "THE property",
						myNamedFragment: {
							id: "http://example.org/resource/#namedFragment",
							myProperty: "A NamedFragment property",
							anotherBlankNode: anotherBlankNode1,
						},
						myBlankNode: {
							id: "_:1",
							myProperty: "A BNode property",
							myNamedFragment: {
								slug: "namedFragment",
								myProperty: "A replace of the NamedFragment property",
								anotherBlankNode: anotherBlankNode2,
							},
						},
					};
					document = Document.Factory.createFrom<MyInterface>( object );
					expect( object ).toBe( document );
					expect( document.id ).toBe( "http://example.org/resource/" );
					expect( document.myProperty ).toBe( "THE property" );
					expect( document.hasFragment( "namedFragment" ) ).toBe( true );

					let fragments:Fragment.Class[] = document.getFragments();
					expect( fragments.length ).toBe( 3 );

					let theBNode:Fragment.Class & MyInterface,
						anotherBNode:Fragment.Class & MyInterface,
						theNFragment:NamedFragment.Class & MyInterface;
					theNFragment = <NamedFragment.Class & MyInterface> fragments[ 0 ];
					anotherBNode = <Fragment.Class & MyInterface> fragments[ 1 ];
					theBNode = <Fragment.Class & MyInterface> fragments[ 2 ];

					expect( URI.Util.getDocumentURI( theNFragment.id ) ).toEqual( "http://example.org/resource/" );
					expect( URI.Util.getFragment( theNFragment.id ) ).toEqual( theNFragment.slug );
					expect( theNFragment.slug ).toBe( "namedFragment" );
					expect( theNFragment.myProperty ).toBe( "A replace of the NamedFragment property" );
					expect( theNFragment[ "anotherBlankNode" ] ).toBe( anotherBNode );
					expect( document[ "myNamedFragment" ] ).toBe( theNFragment );
					expect( object[ "myNamedFragment" ] ).toBe( document[ "myNamedFragment" ] );
					expect( object[ "myNamedFragment" ][ "anotherBlankNode" ] ).toBe( document[ "myNamedFragment" ][ "anotherBlankNode" ] );

					expect( URI.Util.isBNodeID( theBNode.id ) ).toBe( true );
					expect( theBNode.id ).toBe( "_:1" );
					expect( theBNode.myProperty ).toBe( "A BNode property" );
					expect( document[ "myBlankNode" ] ).toBe( theBNode );
					expect( object[ "myBlankNode" ] ).toBe( document[ "myBlankNode" ] );

					expect( URI.Util.isBNodeID( anotherBNode.id ) ).toBe( true );
					expect( anotherBNode.id ).toBe( "_:2" );
					expect( anotherBNode.myProperty ).toBe( "Another BNode property" );
					expect( anotherBNode[ "newProperty" ] ).toBe( "New property" );

					expect( document[ "myNamedFragment" ][ "anotherBlankNode" ] ).toBe( anotherBlankNode1 );
					expect( document[ "myNamedFragment" ][ "anotherBlankNode" ] ).toBe( document[ "myBlankNode" ][ "myNamedFragment" ][ "anotherBlankNode" ] );
					expect( document[ "myBlankNode" ][ "myNamedFragment" ][ "anotherBlankNode" ] ).not.toBe( anotherBlankNode2 );
					expect( document[ "myBlankNode" ][ "myNamedFragment" ][ "anotherBlankNode" ] ).toBe( anotherBlankNode1 );
				})();

				// If a nested object is a fragment that refers outside the scope of the current converted document, it will not be added as a fragment of the document
				(() => {
					let object:any = {
						id: "http://example.org/resource/",
						myProperty: "THE property",
						myNamedFragment: {
							id: "http://example.org/no-parent-resource/#namedFragment",
							myProperty: "A NamedFragment property",
							anotherBlankNode: {
								id: "_:2",
								myProperty: "Another BNode property",
							},
						},
					};
					document = Document.Factory.createFrom<MyInterface>( object );
					expect( object ).toBe( document );
					expect( document.id ).toBe( "http://example.org/resource/" );
					expect( document.myProperty ).toBe( "THE property" );
					expect( document.hasFragment( "namedFragment" ) ).toBe( false );

					let fragments:Fragment.Class[] = document.getFragments();
					expect( Utils.isArray( fragments ) ).toBe( true );
					expect( fragments.length ).toBe( 0 );
					expect( object[ "myNamedFragment" ] ).toBe( document[ "myNamedFragment" ] );
					expect( object[ "myNamedFragment" ][ "anotherBlankNode" ] ).toBe( document[ "myNamedFragment" ][ "anotherBlankNode" ] );
				})();

				// Nested objects from an array are also converted to fragments
				(() => {
					let object:any = {
						myProperty: "The ONE property",
						date: new Date(),
						pointerList: [
							{
								slug: "Fragment_1",
								myProperty: "The Named Fragment",
							},
							{
								id: "_:Fragment_2",
								myProperty: "The Blank Node",
							},
						],
						pointer: {
							id: "#Fragment_1",
							myProperty: "The real Named Fragment",
						},
					};

					document = Document.Factory.createFrom<MyInterface>( object );
					expect( object ).toBe( document );
					expect( document.id ).toBe( "" );
					expect( document.myProperty ).toBe( "The ONE property" );
					expect( document.hasFragment( "Fragment_1" ) ).toBe( true );
					expect( document.hasFragment( "_:Fragment_2" ) ).toBe( true );

					let fragments:Fragment.Class[] = document.getFragments();
					expect( Utils.isArray( fragments ) ).toBe( true );
					expect( fragments.length ).toBe( 2 );

					let theBNode:Fragment.Class & MyInterface,
						theNFragment:NamedFragment.Class & MyInterface;
					theNFragment = <NamedFragment.Class & MyInterface> fragments[ 0 ];
					theBNode = <Fragment.Class & MyInterface> fragments[ 1 ];

					expect( theNFragment.id ).toEqual( "#Fragment_1" );
					expect( theNFragment.slug ).toBe( "Fragment_1" );
					expect( theNFragment.myProperty ).toBe( "The real Named Fragment" );

					expect( URI.Util.isBNodeID( theBNode.id ) ).toBe( true );
					expect( theBNode.id ).toBe( "_:Fragment_2" );
					expect( theBNode.myProperty ).toBe( "The Blank Node" );

					expect( document[ "pointerList" ][ 0 ] ).toBe( fragments[ 0 ] );
					expect( document[ "pointerList" ][ 1 ] ).toBe( fragments[ 1 ] );
					expect( document[ "pointer" ] ).toBe( theNFragment );

					expect( object[ "pointer" ] ).toBe( document[ "pointer" ] );
					expect( object[ "pointerList" ][ 0 ] ).toBe( document[ "pointerList" ][ 0 ] );
					expect( object[ "pointerList" ][ 1 ] ).toBe( document[ "pointerList" ][ 1 ] );
				})();

			} );

		} );

		it( hasMethod(
			STATIC,
			"decorate",
			[ "T extends Object" ],
			"Decorates the object provided with the properties and methods of a `Carbon.Document.Class` object.", [
				{ name: "object", type: "T", description: "Object to be decorated." },
			],
			{ type: "T & Carbon.Document.Class" }
		), ():void => {
			expect( Document.Factory.decorate ).toBeDefined();
			expect( Utils.isFunction( Document.Factory.decorate ) ).toBe( true );

			let document:{ myProperty?:string } & Document.Class;
			let anotherDocument:{ myProperty?:string } & Document.Class;

			document = Document.Factory.decorate( {} );
			expect( Document.Factory.hasClassProperties( document ) ).toBe( true );

			document = Document.Factory.decorate( { myProperty: "a property" } );
			expect( Document.Factory.hasClassProperties( document ) ).toBe( true );
			expect( document.myProperty ).toBeDefined();
			expect( document.myProperty ).toBe( "a property" );

			anotherDocument = Document.Factory.decorate( document );
			expect( anotherDocument ).toBe( document );
		} );

		describe( decoratedObject(
			"Object decorated by the `Carbon.Document.Factory.decorate()` function.", [
				"Carbon.Document.Class",
			]
		), ():void => {
			let document:Document.Class;

			beforeEach( ():void => {
				document = Document.Factory.create();
				document.id = "http://example.com/document/";
			} );

			it( hasProperty(
				INSTANCE,
				"_fragmentsIndex",
				"Map<string, Carbon.Fragment.Class>",
				"Map that stores the fragments (named fragments and blank nodes) of the Document."
			), ():void => {
				expect( document._fragmentsIndex ).toBeDefined();
				expect( Utils.isMap( document._fragmentsIndex ) ).toBe( true );
			} );

			it( hasMethod(
				INSTANCE,
				"_normalize",
				"Search over the document for normal objects to convert into fragments, and unused fragments to eliminate."
			), ():void => {
				expect( document._normalize ).toBeDefined();
				expect( Utils.isFunction( document._normalize ) ).toBe( true );

				document[ "object" ] = { string: "A new object" };
				expect( Pointer.Factory.is( document[ "object" ] ) ).toBe( false );

				document._normalize();
				expect( Pointer.Factory.is( document[ "object" ] ) ).toBe( true );
				expect( document[ "object" ][ "string" ] ).toBe( "A new object" );
				expect( URI.Util.isBNodeID( document[ "object" ].id ) ).toBe( true );
				expect( document.hasFragment( document[ "object" ].id ) ).toBe( true );

				document[ "array" ] = [ { string: "Element 1" }, { string: "Element 2" } ];
				document[ "object" ][ "object" ] = { string: "Nested object inside the new object" };

				document._normalize();
				expect( document[ "array" ].length ).toBe( 2 );
				expect( Pointer.Factory.is( document[ "array" ][ 0 ] ) ).toBe( true );
				expect( document.hasFragment( document[ "array" ][ 0 ].id ) ).toBe( true );
				expect( document[ "array" ][ 0 ][ "string" ] ).toBe( "Element 1" );
				expect( Pointer.Factory.is( document[ "array" ][ 1 ] ) ).toBe( true );
				expect( document.hasFragment( document[ "array" ][ 1 ].id ) ).toBe( true );
				expect( document[ "array" ][ 1 ][ "string" ] ).toBe( "Element 2" );

				expect( Pointer.Factory.is( document[ "object" ][ "object" ] ) ).toBe( true );
				expect( document.hasFragment( document[ "object" ][ "object" ].id ) ).toBe( true );
				expect( document[ "object" ][ "object" ][ "string" ] ).toBe( "Nested object inside the new object" );

				let fragment:Fragment.Class;
				fragment = document.createFragment( { string: "Fragment that will be deleted" } );

				document._normalize();
				expect( document.hasFragment( fragment.id ) ).toBe( false );

				document.createFragment( { string: "Fragment that will not be deleted" }, "named-fragment" );

				fragment = document.createFragment( { string: "Fragment with a reference" } );
				document[ "fragment" ] = fragment;

				fragment = document.createFragment( { string: "Another fragment that will be deleted" } );

				document._normalize();
				expect( document.hasFragment( fragment.id ) ).toBe( false );
				expect( Pointer.Factory.is( document[ "fragment" ] ) ).toBe( true );
				expect( document.hasFragment( document[ "fragment" ].id ) ).toBe( true );
				expect( URI.Util.isBNodeID( document[ "object" ].id ) ).toBe( true );
				expect( document.hasFragment( "named-fragment" ) ).toBe( true );

				expect( Pointer.Factory.is( document[ "object" ] ) ).toBe( true );
				expect( document[ "object" ][ "string" ] ).toBe( "A new object" );
				expect( URI.Util.isBNodeID( document[ "object" ].id ) ).toBe( true );
				expect( document.hasFragment( document[ "object" ].id ) ).toBe( true );

				expect( document[ "array" ].length ).toBe( 2 );
				expect( Pointer.Factory.is( document[ "array" ][ 0 ] ) ).toBe( true );
				expect( document.hasFragment( document[ "array" ][ 0 ].id ) ).toBe( true );
				expect( document[ "array" ][ 0 ][ "string" ] ).toBe( "Element 1" );
				expect( Pointer.Factory.is( document[ "array" ][ 1 ] ) ).toBe( true );
				expect( document.hasFragment( document[ "array" ][ 1 ].id ) ).toBe( true );
				expect( document[ "array" ][ 1 ][ "string" ] ).toBe( "Element 2" );

				expect( Pointer.Factory.is( document[ "object" ][ "object" ] ) ).toBe( true );
				expect( document.hasFragment( document[ "object" ][ "object" ].id ) ).toBe( true );
				expect( document[ "object" ][ "object" ][ "string" ] ).toBe( "Nested object inside the new object" );

				fragment = document[ "object" ];
				delete document[ "object" ];
				document._normalize();
				expect( document.hasFragment( fragment.id ) ).toBe( false );

				fragment = document.createFragment( { string: "Cyclical Fragment" } );
				fragment[ "cycle" ] = fragment;
				document[ "cyclical-fragment" ] = fragment;
				document._normalize();
				expect( document[ "cyclical-fragment" ] ).toBeDefined();
				expect( document.hasFragment( fragment.id ) ).toBe( true );
			} );

			it( hasMethod(
				INSTANCE,
				"hasPointer",
				"Returns true if the Document has a pointer referenced by the URI provided.", [
					{ name: "id", type: "string" },
				],
				{ type: "boolean" }
			), ():void => {
				expect( document.hasPointer ).toBeDefined();
				expect( Utils.isFunction( document.hasPointer ) ).toBe( true );

				expect( document.hasPointer( "http://example.com/document/" ) ).toBe( true );
				expect( document.hasPointer( "document/" ) ).toBe( false );
				expect( document.hasPointer( "http://example.com/document/#fragment" ) ).toBe( false );
				expect( document.hasPointer( "_:BlankNode" ) ).toBe( false );
				expect( document.hasPointer( "http://example.com/another-document/" ) ).toBe( false );
			} );

			it( hasMethod(
				INSTANCE,
				"getPointer",
				"Returns the pointer referenced by the URI provided. If no pointer exists, one is created and then returned.\n" +
				"Returns `null` if the URI is outside the scope of the Document.", [
					{ name: "id", type: "string" },
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

				pointer = document.getPointer( "relative-uri-is-not-valid/" );
				expect( pointer ).toBeNull();
				pointer = document.getPointer( "http://example.com/another-document/" );
				expect( pointer ).toBeNull();
			} );

			describe( method(
				INSTANCE,
				"inScope"
			), ():void => {

				it( hasSignature(
					"Returns true if the pointer provided is inside the scope of the Document.", [
						{ name: "pointer", type: "Carbon.Pointer.Class" },
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

					pointer = Pointer.Factory.create( "relative-uri-is-not-valid/" );
					expect( document.inScope( pointer ) ).toBe( false );
					pointer = Pointer.Factory.create( "http://example.com/document/child/" );
					expect( document.inScope( pointer ) ).toBe( false );
					pointer = Pointer.Factory.create( "http://example.com/another-document/" );
					expect( document.inScope( pointer ) ).toBe( false );
					pointer = Pointer.Factory.create( "http://example.org/document/" );
					expect( document.inScope( pointer ) ).toBe( false );
				} );

				it( hasSignature(
					"Returns true if the URI provided is inside the scope of the Document.", [
						{ name: "id", type: "string" },
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

					expect( document.inScope( "relative-uri-is-not-valid/" ) ).toBe( false );
					expect( document.inScope( "http://example.com/document/child/" ) ).toBe( false );
					expect( document.inScope( "http://example.com/another-document/" ) ).toBe( false );
					expect( document.inScope( "http://example.org/document/" ) ).toBe( false );
				} );

			} );

			it( hasMethod(
				INSTANCE,
				"hasFragment",
				"Returns true if the Document has the fragment referenced by the ID provided.", [
					{ name: "id", type: "string" },
				],
				{ type: "boolean" }
			), ():void => {
				expect( document.hasFragment ).toBeDefined();
				expect( Utils.isFunction( document.hasFragment ) ).toBe( true );

				expect( document.hasFragment( "http://example.com/document/" ) ).toBe( false );
				expect( document.hasFragment( "http://example.com/document/#fragment" ) ).toBe( false );
				expect( document.hasFragment( "http://example.com/document/#another-fragment" ) ).toBe( false );
				expect( document.hasFragment( "_:BlankNode" ) ).toBe( false );

				document.getPointer( "http://example.com/document/#fragment" );
				document.getPointer( "_:BlankNode" );

				expect( document.hasFragment( "http://example.com/document/#fragment" ) ).toBe( true );
				expect( document.hasFragment( "#fragment" ) ).toBe( true );
				expect( document.hasFragment( "fragment" ) ).toBe( true );

				expect( document.hasFragment( "_:BlankNode" ) ).toBe( true );

				expect( document.hasFragment( "http://example.com/document/#another-fragment" ) ).toBe( false );
			} );

			it( hasMethod(
				INSTANCE,
				"getFragment",
				[ "T" ],
				"Returns the fragment referenced by the ID provided.\n" +
				"Returns `null` if no fragment exists in the Document.", [
					{ name: "id", type: "string" },
				],
				{ type: "T & Carbon.Fragment.Class" }
			), ():void => {
				expect( document.getFragment ).toBeDefined();
				expect( Utils.isFunction( document.getFragment ) ).toBe( true );

				let fragment:Fragment.Class;
				expect( document.getFragment( "http://example.com/document/#fragment" ) ).toBeNull();
				expect( document.getFragment( "#fragment" ) ).toBeNull();
				expect( document.getFragment( "fragment" ) ).toBeNull();
				expect( document.getFragment( "_:BlankNode" ) ).toBeNull();

				document.getPointer( "http://example.com/document/#fragment" );
				document.getPointer( "_:BlankNode" );

				fragment = document.getFragment( "http://example.com/document/#fragment" );
				expect( Fragment.Factory.hasClassProperties( fragment ) ).toBe( true );
				expect( fragment.id ).toBe( "http://example.com/document/#fragment" );
				fragment = document.getFragment( "#fragment" );
				expect( Fragment.Factory.hasClassProperties( fragment ) ).toBe( true );
				expect( fragment.id ).toBe( "http://example.com/document/#fragment" );
				fragment = document.getFragment( "fragment" );
				expect( Fragment.Factory.hasClassProperties( fragment ) ).toBe( true );
				expect( fragment.id ).toBe( "http://example.com/document/#fragment" );
				fragment = document.getFragment( "_:BlankNode" );
				expect( Fragment.Factory.hasClassProperties( fragment ) ).toBe( true );
				expect( fragment.id ).toBe( "_:BlankNode" );
			} );

			it( hasMethod(
				INSTANCE,
				"getNamedFragment",
				[ "T" ],
				"Returns the fragment referenced by the ID provided.\n" +
				"Returns `null` if no fragment exists in the Document.", [
					{ name: "id", type: "string" },
				],
				{ type: "T & Carbon.Fragment.Class" }
			), ():void => {
				expect( document.getNamedFragment ).toBeDefined();
				expect( Utils.isFunction( document.getNamedFragment ) ).toBe( true );

				expect( document.getNamedFragment.bind( document, "_:BlankNode" ) ).toThrowError( Errors.IllegalArgumentError );
				expect( document.getNamedFragment.bind( document, "http://example.com/another-document/#fragment" ) ).toThrowError( Errors.IllegalArgumentError );

				expect( document.getNamedFragment( "http://example.com/document/#fragment" ) ).toBeNull();
				expect( document.getNamedFragment( "#fragment" ) ).toBeNull();
				expect( document.getNamedFragment( "fragment" ) ).toBeNull();

				document.getPointer( "http://example.com/document/#fragment" );
				document.getPointer( "_:BlankNode" );

				let fragment:Fragment.Class;
				fragment = document.getNamedFragment( "http://example.com/document/#fragment" );
				expect( NamedFragment.Factory.hasClassProperties( fragment ) ).toBe( true );
				expect( fragment.id ).toBe( "http://example.com/document/#fragment" );
				fragment = document.getNamedFragment( "#fragment" );
				expect( NamedFragment.Factory.hasClassProperties( fragment ) ).toBe( true );
				expect( fragment.id ).toBe( "http://example.com/document/#fragment" );
				fragment = document.getNamedFragment( "fragment" );
				expect( NamedFragment.Factory.hasClassProperties( fragment ) ).toBe( true );
				expect( fragment.id ).toBe( "http://example.com/document/#fragment" );
			} );

			it( hasMethod(
				INSTANCE,
				"getFragments",
				"Returns an array with all the fragments in the Document.",
				{ type: "Carbon.Fragment.Class[]" }
			), ():void => {
				expect( document.getFragments ).toBeDefined();
				expect( Utils.isFunction( document.getFragments ) ).toBe( true );

				let fragments:Fragment.Class[];
				fragments = document.getFragments();
				expect( Utils.isArray( fragments ) ).toBe( true );
				expect( fragments.length ).toBe( 0 );

				document.getPointer( "http://example.com/document/#fragment" );
				document.getPointer( "_:BlankNode" );

				fragments = document.getFragments();
				expect( Utils.isArray( fragments ) ).toBe( true );
				expect( fragments.length ).toBe( 2 );
				if( NamedFragment.Factory.hasClassProperties( fragments[ 0 ] ) ) {
					expect( fragments[ 0 ].id ).toBe( "http://example.com/document/#fragment" );
					expect( fragments[ 1 ].id ).toBe( "_:BlankNode" );
				} else {
					expect( fragments[ 0 ].id ).toBe( "_:BlankNode" );
					expect( fragments[ 1 ].id ).toBe( "http://example.com/document/#fragment" );
				}
			} );

			describe( method(
				INSTANCE,
				"createFragment"
			), ():void => {

				it( hasSignature(
					[ "T" ],
					"Creates a `Carbon.NamedFragment.Class` from the object provided and the slug specified.\n" +
					"If the slug has the form of a BlankNode ID, a `Carbon.Fragment.Class` is created instead.", [
						{ name: "object", type: "T" },
						{ name: "slug", type: "string" },
					],
					{ type: "T & Carbon.Fragment.Class" }
				), ():void => {
					expect( document.createFragment ).toBeDefined();
					expect( Utils.isFunction( document.createFragment ) ).toBe( true );

					interface MyInterface {
						myProperty?:string;
						myPointer?:MyInterface;
					}

					let object:MyInterface;
					let fragment:Fragment.Class & MyInterface;

					object = {};
					fragment = document.createFragment<MyInterface>( object, "fragment" );
					expect( object ).toBe( fragment );
					expect( Fragment.Factory.hasClassProperties( fragment ) ).toBe( true );
					expect( fragment.id ).toBe( "http://example.com/document/#fragment" );
					expect( fragment.myProperty ).toBeUndefined();

					object = { myProperty: "The property" };
					fragment = document.createFragment<MyInterface>( object, "http://example.com/document/#another-fragment" );
					expect( Fragment.Factory.hasClassProperties( fragment ) ).toBe( true );
					expect( fragment.id ).toBe( "http://example.com/document/#another-fragment" );
					expect( fragment.myProperty ).toBe( "The property" );

					object = { myProperty: "The BlankNode property" };
					fragment = document.createFragment<MyInterface>( object, "_:BlankNode" );
					expect( Fragment.Factory.hasClassProperties( fragment ) ).toBe( true );
					expect( fragment.id ).toBe( "_:BlankNode" );
					expect( fragment.myProperty ).toBe( "The BlankNode property" );

					object = { myProperty: "Fragment with nested object", myPointer: { myProperty: "The Nested object" } };
					fragment = document.createFragment<MyInterface>( object, "#another-another-fragment" );
					expect( Fragment.Factory.hasClassProperties( fragment ) ).toBe( true );
					expect( fragment.id ).toBe( "http://example.com/document/#another-another-fragment" );
					expect( fragment.myProperty ).toBe( "Fragment with nested object" );
					expect( fragment.myPointer ).toBeDefined();
					expect( Fragment.Factory.hasClassProperties( fragment.myPointer ) ).toBe( true );
					expect( URI.Util.isBNodeID( (<Fragment.Class> fragment.myPointer).id ) ).toBe( true );
					expect( fragment.myPointer.myProperty ).toBeDefined();
					expect( fragment.myPointer.myProperty ).toBe( "The Nested object" );

					object = { myProperty: "Fragment with nested object", myPointer: { myProperty: "The Nested object" } };
					fragment = document.createFragment<MyInterface>( object, "_:AnotherBlankNode" );
					expect( Fragment.Factory.hasClassProperties( fragment ) ).toBe( true );
					expect( fragment.id ).toBe( "_:AnotherBlankNode" );
					expect( fragment.myProperty ).toBe( "Fragment with nested object" );
					expect( fragment.myPointer ).toBeDefined();
					expect( Fragment.Factory.hasClassProperties( fragment.myPointer ) ).toBe( true );
					expect( URI.Util.isBNodeID( (<Fragment.Class> fragment.myPointer).id ) ).toBe( true );
					expect( fragment.myPointer.myProperty ).toBeDefined();
					expect( fragment.myPointer.myProperty ).toBe( "The Nested object" );

					expect( () => document.createFragment( {}, "http://example.com/another-document/#fragment" ) ).toThrowError( Errors.IllegalArgumentError );
					expect( () => document.createFragment( {}, "fragment" ) ).toThrowError( Errors.IDAlreadyInUseError );
					expect( () => document.createFragment( {}, "_:BlankNode" ) ).toThrowError( Errors.IDAlreadyInUseError );
				} );

				it( hasSignature(
					[ "T" ],
					"Creates a `Carbon.Fragment.Class` from the object provided, since no slug is specified.", [
						{ name: "object", type: "object" },
					],
					{ type: "T & Carbon.Fragment.Class" }
				), ():void => {
					expect( document.createFragment ).toBeDefined();
					expect( Utils.isFunction( document.createFragment ) ).toBe( true );

					interface MyInterface {
						myProperty?:string;
						myPointer?:MyInterface;
					}

					let object:MyInterface;
					let fragment:Fragment.Class & MyInterface;

					object = {};
					fragment = document.createFragment<MyInterface>( object );
					expect( object ).toBe( fragment );
					expect( Fragment.Factory.hasClassProperties( fragment ) ).toBe( true );
					expect( URI.Util.isBNodeID( fragment.id ) ).toBe( true );
					expect( fragment.myProperty ).toBeUndefined();

					object = { myProperty: "The property" };
					fragment = document.createFragment<MyInterface>( object );
					expect( Fragment.Factory.hasClassProperties( fragment ) ).toBe( true );
					expect( URI.Util.isBNodeID( fragment.id ) ).toBe( true );
					expect( fragment.myProperty ).toBe( "The property" );

					object = { myProperty: "Fragment with nested object", myPointer: { myProperty: "The Nested object" } };
					fragment = document.createFragment<MyInterface>( object );
					expect( Fragment.Factory.hasClassProperties( fragment ) ).toBe( true );
					expect( URI.Util.isBNodeID( fragment.id ) ).toBe( true );
					expect( fragment.myProperty ).toBe( "Fragment with nested object" );
					expect( fragment.myPointer ).toBeDefined();
					expect( Fragment.Factory.hasClassProperties( fragment.myPointer ) ).toBe( true );
					expect( URI.Util.isBNodeID( (<Fragment.Class> fragment.myPointer).id ) ).toBe( true );
					expect( fragment.myPointer.myProperty ).toBeDefined();
					expect( fragment.myPointer.myProperty ).toBe( "The Nested object" );
				} );

				it( hasSignature(
					"Creates an empty `Carbon.NamedFragment.Class` with the slug specified.\n" +
					"If the slug has the form of a BlankNode ID, a `Carbon.Fragment.Class` is created instead.", [
						{ name: "slug", type: "string" },
					],
					{ type: "Carbon.Fragment.Class" }
				), ():void => {
					expect( document.createFragment ).toBeDefined();
					expect( Utils.isFunction( document.createFragment ) ).toBe( true );

					let fragment:Fragment.Class;

					fragment = document.createFragment( "fragment" );
					expect( Fragment.Factory.hasClassProperties( fragment ) ).toBe( true );
					expect( fragment.id ).toBe( "http://example.com/document/#fragment" );

					fragment = document.createFragment( "http://example.com/document/#another-fragment" );
					expect( Fragment.Factory.hasClassProperties( fragment ) ).toBe( true );
					expect( fragment.id ).toBe( "http://example.com/document/#another-fragment" );

					fragment = document.createFragment( "_:BlankNode" );
					expect( Fragment.Factory.hasClassProperties( fragment ) ).toBe( true );
					expect( fragment.id ).toBe( "_:BlankNode" );

					expect( () => document.createFragment( "http://example.com/another-document/#fragment" ) ).toThrowError( Errors.IllegalArgumentError );
					expect( () => document.createFragment( "fragment" ) ).toThrowError( Errors.IDAlreadyInUseError );
					expect( () => document.createFragment( "_:BlankNode" ) ).toThrowError( Errors.IDAlreadyInUseError );
				} );

				it( hasSignature(
					"Creates an empty `Carbon.Fragment.Class`, since no slug is provided.",
					{ type: "Carbon.Fragment.Class" }
				), ():void => {
					expect( document.createFragment ).toBeDefined();
					expect( Utils.isFunction( document.createFragment ) ).toBe( true );

					let fragment1:Fragment.Class;
					let fragment2:Fragment.Class;

					fragment1 = document.createFragment();
					expect( Fragment.Factory.hasClassProperties( fragment1 ) ).toBe( true );
					expect( Utils.isString( fragment1.id ) ).toBe( true );
					expect( URI.Util.isBNodeID( fragment1.id ) ).toBe( true );

					fragment2 = document.createFragment();
					expect( Fragment.Factory.hasClassProperties( fragment2 ) ).toBe( true );
					expect( Utils.isString( fragment2.id ) ).toBe( true );
					expect( URI.Util.isBNodeID( fragment2.id ) ).toBe( true );

					expect( fragment1.id ).not.toBe( fragment2.id );
				} );

			} );

			describe( method(
				INSTANCE,
				"createNamedFragment"
			), ():void => {

				it( hasSignature(
					"Creates a `Carbon.NamedFragment.Class` with the slug provided.\n" +
					"If the slug has the form of a BlankNode ID, an Error is thrown.", [
						{ name: "slug", type: "string" },
					],
					{ type: "Carbon.NamedFragment.Class" }
				), ():void => {
					expect( document.createNamedFragment ).toBeDefined();
					expect( Utils.isFunction( document.createNamedFragment ) ).toBe( true );

					let fragment:NamedFragment.Class;

					fragment = document.createNamedFragment( "fragment" );
					expect( NamedFragment.Factory.hasClassProperties( fragment ) ).toBe( true );
					expect( fragment.slug ).toBe( "fragment" );
					expect( fragment.id ).toBe( "http://example.com/document/#fragment" );

					fragment = document.createNamedFragment( "http://example.com/document/#another-fragment" );
					expect( Fragment.Factory.hasClassProperties( fragment ) ).toBe( true );
					expect( fragment.slug ).toBe( "another-fragment" );
					expect( fragment.id ).toBe( "http://example.com/document/#another-fragment" );

					expect( () => document.createNamedFragment( "_:BlankNode" ) ).toThrowError( Errors.IllegalArgumentError );
					expect( () => document.createNamedFragment( "http://example.com/another-document/#fragment" ) ).toThrowError( Errors.IllegalArgumentError );
					expect( () => document.createNamedFragment( "fragment" ) ).toThrowError( Errors.IDAlreadyInUseError );
				} );

				it( hasSignature(
					[ "T" ],
					"Creates a `Carbon.NamedFragment.Class` from the object provided and the slug specified.\n" +
					"If the slug has the form of a BlankNode ID, an Error is thrown.", [
						{ name: "object", type: "T" },
						{ name: "slug", type: "string" },
					],
					{ type: "T & Carbon.NamedFragment.Class" }
				), ():void => {

					expect( document.createNamedFragment ).toBeDefined();
					expect( Utils.isFunction( document.createNamedFragment ) ).toBe( true );

					interface MyInterface {
						myProperty?:string;
						myPointer?:MyInterface;
					}

					let object:MyInterface;
					let fragment:Fragment.Class & MyInterface;

					object = {};
					fragment = document.createNamedFragment<MyInterface>( object, "fragment" );
					expect( object ).toBe( fragment );
					expect( Fragment.Factory.hasClassProperties( fragment ) ).toBe( true );
					expect( fragment.id ).toBe( "http://example.com/document/#fragment" );
					expect( fragment.myProperty ).toBeUndefined();

					object = { myProperty: "The property" };
					fragment = document.createNamedFragment<MyInterface>( object, "http://example.com/document/#another-fragment" );
					expect( Fragment.Factory.hasClassProperties( fragment ) ).toBe( true );
					expect( fragment.id ).toBe( "http://example.com/document/#another-fragment" );
					expect( fragment.myProperty ).toBe( "The property" );

					object = { myProperty: "Fragment with nested object", myPointer: { myProperty: "The Nested object" } };
					fragment = document.createNamedFragment<MyInterface>( object, "#another-another-fragment" );
					expect( Fragment.Factory.hasClassProperties( fragment ) ).toBe( true );
					expect( fragment.id ).toBe( "http://example.com/document/#another-another-fragment" );
					expect( fragment.myProperty ).toBe( "Fragment with nested object" );
					expect( fragment.myPointer ).toBeDefined();
					expect( Fragment.Factory.hasClassProperties( fragment.myPointer ) ).toBe( true );
					expect( URI.Util.isBNodeID( (<Fragment.Class> fragment.myPointer).id ) ).toBe( true );
					expect( fragment.myPointer.myProperty ).toBeDefined();
					expect( fragment.myPointer.myProperty ).toBe( "The Nested object" );
				} );

			} );

			describe( method(
				INSTANCE,
				"_removeFragment"
			), ():void => {

				it( isDefined(), () => {
					expect( document._removeFragment ).toBeDefined();
					expect( Utils.isFunction( document._removeFragment ) ).toBe( true );
				} );

				it( hasSignature(
					"Remove the fragment referenced by the `Carbon.Fragment.Class` provided from the Document.", [
						{ name: "fragment", type: "Carbon.Fragment.Class" },
					]
				), ():void => {
					let fragment1:NamedFragment.Class = document.createNamedFragment( "slug" );
					let fragment2:Fragment.Class = document.createFragment();

					expect( document.getFragments().length ).toBe( 2 );

					document._removeFragment( fragment1 );
					expect( document.getFragments().length ).toBe( 1 );
					expect( document.hasFragment( fragment1.id ) ).toBe( false );
					expect( document.hasFragment( fragment2.id ) ).toBe( true );

					document._removeFragment( fragment2 );
					expect( document.getFragments().length ).toBe( 0 );
					expect( document.hasFragment( fragment1.id ) ).toBe( false );
					expect( document.hasFragment( fragment2.id ) ).toBe( false );
				} );

				it( hasSignature(
					"Remove the fragment referenced by the Slug provided from the Document.", [
						{ name: "slug", type: "string" },
					]
				), ():void => {
					document.createNamedFragment( "slug" );
					document.createFragment( "_:bNode" );

					expect( document.getFragments().length ).toBe( 2 );

					document._removeFragment( "slug" );
					expect( document.getFragments().length ).toBe( 1 );
					expect( document.hasFragment( "slug" ) ).toBe( false );
					expect( document.hasFragment( "_:bNode" ) ).toBe( true );

					document._removeFragment( "_:bNode" );
					expect( document.getFragments().length ).toBe( 0 );
					expect( document.hasFragment( "slug" ) ).toBe( false );
					expect( document.hasFragment( "_:bNode" ) ).toBe( false );
				} );

			} );

			describe( method(
				INSTANCE,
				"removeNamedFragment"
			), ():void => {

				it( isDefined(), ():void => {
					expect( document.removeNamedFragment ).toBeDefined();
					expect( Utils.isFunction( document.removeNamedFragment ) ).toBe( true );
				} );

				it( hasSignature(
					"Remove the maned fragment referenced by the `Carbon.NamedFragment.Class` provided from the Document.", [
						{ name: "fragment", type: "Carbon.NamedFragment.Class" },
					]
				), ():void => {
					let fragment1:NamedFragment.Class = document.createNamedFragment( "slug" );
					let fragment2:Fragment.Class = document.createFragment();

					expect( document.getFragments().length ).toBe( 2 );

					document.removeNamedFragment( fragment1 );
					expect( document.getFragments().length ).toBe( 1 );
					expect( document.hasFragment( fragment1.id ) ).toBe( false );
					expect( document.hasFragment( fragment2.id ) ).toBe( true );

					expect( () => document.removeNamedFragment( <any> fragment2 ) ).toThrowError( Errors.IllegalArgumentError );
				} );

				it( hasSignature(
					"Remove the named fragment referenced by the Slug provided from the Document.", [
						{ name: "slug", type: "string" },
					]
				), ():void => {
					document.createNamedFragment( "slug" );
					document.createFragment( "_:bNode" );

					expect( document.getFragments().length ).toBe( 2 );

					document.removeNamedFragment( "slug" );
					expect( document.getFragments().length ).toBe( 1 );
					expect( document.hasFragment( "slug" ) ).toBe( false );
					expect( document.hasFragment( "_:bNode" ) ).toBe( true );

					expect( () => document.removeNamedFragment( "_:bNode" ) ).toThrowError( Errors.IllegalArgumentError );
				} );

			} );

			describe( method(
				INSTANCE,
				"toJSON"
			), ():void => {
				let jsonEmptyDocument:string;
				let jsonFullDocument:string;

				beforeAll( ():void => {
					let emptyObject:any = {
						"@id": "http://example.com/document/",
						"@graph": [ {
							"@id": "http://example.com/document/",
							"@type": [],
						}, {
							"@id": "_:BlankNode",
							"@type": [],
						}, {
							"@id": "http://example.com/document/#fragment",
							"@type": [],
						} ],
					};
					jsonEmptyDocument = JSON.stringify( emptyObject );

					let fullObject:any = {
						"@id": "http://example.com/document/",
						"@graph": [ {
							"@id": "http://example.com/document/",
							"@type": [],
							"http://example.com/ns#myProperty": [ {
								"@value": "a property",
								"@type": "http://www.w3.org/2001/XMLSchema#string",
							} ],
							"http://example.com/ns#myDate": [ {
								"@value": "2016-06-01",
								"@type": "http://www.w3.org/2001/XMLSchema#date",
							} ],
							"http://example.com/ns#myFragment": [ {
								"@id": "_:BlankNode",
							}, {
								"@id": "http://example.com/document/#fragment",
							} ],
						}, {
							"@id": "_:BlankNode",
							"@type": [],
						}, {
							"@id": "http://example.com/document/#fragment",
							"@type": [],
						} ],
					};
					jsonFullDocument = JSON.stringify( fullObject );
				} );

				beforeEach( ():void => {
					document.createFragment( {}, "_:BlankNode" );
					document.createFragment( "fragment" );
					document[ "myProperty" ] = "a property";
					document[ "myDate" ] = new Date( "2016-06-01" );
					document[ "myFragment" ] = document.getFragments();
				} );

				it( hasSignature(
					"Returns a JSON string from the Document using an ObjectSchema and a JSONLDConverter.", [
						{ name: "objectSchemaResolver", type: "Carbon.ObjectSchema.Resolver" },
						{ name: "jsonLDConverter", type: "Carbon.JSONLDConverter.Class" },
					],
					{ type: "string" }
				), ():void => {
					expect( document.toJSON ).toBeDefined();
					expect( Utils.isFunction( document.toJSON ) ).toBe( true );

					class MockedContext extends AbstractContext {
						protected _baseURI:string;

						constructor() {
							super();
							this._baseURI = "http://example.com/";
							this.settings = { paths: { system: ".system/" } };
						}
					}

					let context:AbstractContext = new MockedContext();
					let converter:JSONLDConverter = new JSONLDConverter();
					let json:string;

					json = document.toJSON( context.documents, converter );
					expect( json ).toEqual( jsonEmptyDocument );

					context.extendObjectSchema( {
						"ex": "http://example.com/ns#",
						"xsd": "http://www.w3.org/2001/XMLSchema#",
						"ldp": "http://www.w3.org/ns/ldp#",
						"myProperty": {
							"@id": "ex:myProperty",
							"@type": "xsd:string",
						},
						"myDate": {
							"@id": "ex:myDate",
							"@type": "xsd:date",
						},
						"myFragment": {
							"@id": "ex:myFragment",
							"@type": "@id",
							"@container": "@set",
						},
					} );
					json = document.toJSON( context.documents, converter );
					expect( json ).toEqual( jsonFullDocument );
				} );

				it( hasSignature(
					"Returns a JSON string from the Document using an ObjectSchema", [
						{ name: "objectSchemaResolver", type: "Carbon.ObjectSchema.Resolver" },
					],
					{ type: "string" }
				), ():void => {
					expect( document.toJSON ).toBeDefined();
					expect( Utils.isFunction( document.toJSON ) ).toBe( true );

					class MockedContext extends AbstractContext {
						protected _baseURI:string;

						constructor() {
							super();
							this._baseURI = "http://example.com/";
							this.settings = { paths: { system: ".system/" } };
						}
					}

					let context:AbstractContext = new MockedContext();
					let json:string;

					json = document.toJSON( context.documents );
					expect( json ).toEqual( jsonEmptyDocument );

					context.extendObjectSchema( {
						"ex": "http://example.com/ns#",
						"xsd": "http://www.w3.org/2001/XMLSchema#",
						"ldp": "http://www.w3.org/ns/ldp#",
						"myProperty": {
							"@id": "ex:myProperty",
							"@type": "xsd:string",
						},
						"myDate": {
							"@id": "ex:myDate",
							"@type": "xsd:date",
						},
						"myFragment": {
							"@id": "ex:myFragment",
							"@type": "@id",
							"@container": "@set",
						},
					} );
					json = document.toJSON( context.documents );
					expect( json ).toEqual( jsonFullDocument );

					context.clearObjectSchema();
					context.extendObjectSchema( {
						"@vocab": context.resolve( "vocabulary/#" ),
					} );
					json = document.toJSON( context.documents );
					expect( json ).toEqual( JSON.stringify( {
						"@id": "http://example.com/document/",
						"@graph": [ {
							"@id": "http://example.com/document/",
							"@type": [],
							"http://example.com/vocabulary/#myProperty": [ {
								"@value": "a property",
								"@type": "http://www.w3.org/2001/XMLSchema#string",
							} ],
							"http://example.com/vocabulary/#myDate": [ {
								"@value": "2016-06-01T00:00:00.000Z",
								"@type": "http://www.w3.org/2001/XMLSchema#dateTime",
							} ],
							"http://example.com/vocabulary/#myFragment": [ {
								"@id": "_:BlankNode",
							}, {
								"@id": "http://example.com/document/#fragment",
							} ],
						}, {
							"@id": "_:BlankNode",
							"@type": [],
						}, {
							"@id": "http://example.com/document/#fragment",
							"@type": [],
						} ],
					} ) );
				} );

				it( hasSignature(
					"Returns a JSON string from the Document using the default ObjectSchema.",
					{ type: "string" }
				), ():void => {
					expect( document.toJSON ).toBeDefined();
					expect( Utils.isFunction( document.toJSON ) ).toBe( true );

					let emptyObject:any = {
						"@id": "http://example.com/document/",
						"@graph": [ {
							"@id": "http://example.com/document/",
							"@type": [],
						}, {
							"@id": "_:BlankNode",
							"@type": [],
						}, {
							"@id": "http://example.com/document/#fragment",
							"@type": [],
						} ],
					};
					jsonEmptyDocument = JSON.stringify( emptyObject );

					let json:string;
					json = document.toJSON();
					expect( json ).toEqual( jsonEmptyDocument );
				} );

			} );

		} );

	} );

} );
