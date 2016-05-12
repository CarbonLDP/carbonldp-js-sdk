import {
	INSTANCE,
	STATIC,

	module,
	interfaze,
	clazz,
	method,

	isDefined,
	hasConstructor,
	hasMethod,
	hasSignature,
	hasProperty,
	hasInterface,
	extendsClass,
	decoratedObject,
} from "./test/JasmineExtender";
import * as Utils from "./Utils";
import * as Errors from "./Errors";
import * as Pointer from "./Pointer";
import * as Fragment from "./Fragment";
import * as NamedFragment from "./NamedFragment";
import * as URI from "./RDF/URI";
import AbstractContext from "./AbstractContext";
import JSONLDConverter from "./JSONLDConverter";
import * as Resource from "./Resource";

import * as Document from "./Document";

describe( module( "Carbon/Document" ), ():void => {

	it( isDefined(), ():void => {
		expect( Document ).toBeDefined();
		expect( Utils.isObject( Document ) ).toBe( true );
	});

	describe( clazz(
		"Carbon.Document.Factory",
		"Factory class for Document objects."
	), ():void => {

		it( isDefined(), ():void => {
			expect( Document.Factory ).toBeDefined();
			expect( Utils.isFunction( Document.Factory ) ).toBe( true );
		});

		it( hasMethod(
			STATIC,
			"hasClassProperties",
			"Returns true if the object provided has the properties and functions of a Document object", [
				{ name: "documentResource", type: "Object" }
			],
			{ type: "boolean" }
		), ():void => {
			expect( Document.Factory.hasClassProperties ).toBeDefined();
			expect( Utils.isFunction( Document.Factory.hasClassProperties ) ).toBe( true );

			let resource:Object = undefined;
			expect( Document.Factory.hasClassProperties( resource ) ).toBe( false );
			resource = {};
			expect( Document.Factory.hasClassProperties( resource ) ).toBe( false );
			resource["_fragmentsIndex"] = null;
			expect( Document.Factory.hasClassProperties( resource ) ).toBe( false );
			resource["hasFragment"] = ():void => {};
			expect( Document.Factory.hasClassProperties( resource ) ).toBe( false );
			resource["getFragment"] = ():void => {};
			expect( Document.Factory.hasClassProperties( resource ) ).toBe( false );
			resource["getNamedFragment"] = ():void => {};
			expect( Document.Factory.hasClassProperties( resource ) ).toBe( false );
			resource["getFragments"] = ():void => {};
			expect( Document.Factory.hasClassProperties( resource ) ).toBe( false );
			resource["createFragment"] = ():void => {};
			expect( Document.Factory.hasClassProperties( resource ) ).toBe( false );
			resource["createNamedFragment"] = ():void => {};
			expect( Document.Factory.hasClassProperties( resource ) ).toBe( false );
			resource["removeFragment"] = ():void => {};
			expect( Document.Factory.hasClassProperties( resource ) ).toBe( false );
			resource["toJSON"] = ():void => {};
			expect( Document.Factory.hasClassProperties( resource ) ).toBe( true );
		});

		it( hasMethod(
			STATIC,
			"is",
			"Returns true if the object is considered a Document object", [
				{ name: "object", type: "Object" }
			],
			{ type: "boolean" }
		), ():void => {
			expect( Document.Factory.hasClassProperties ).toBeDefined();
			expect( Utils.isFunction( Document.Factory.hasClassProperties ) ).toBe( true );

			let resource:Object = undefined;
			expect( Document.Factory.is( resource ) ).toBe( false );
			resource = {};
			expect( Document.Factory.is( resource ) ).toBe( false );
			resource["_fragmentsIndex"] = null;
			expect( Document.Factory.is( resource ) ).toBe( false );
			resource["hasFragment"] = ():void => {};
			expect( Document.Factory.is( resource ) ).toBe( false );
			resource["getFragment"] = ():void => {};
			expect( Document.Factory.is( resource ) ).toBe( false );
			resource["getNamedFragment"] = ():void => {};
			expect( Document.Factory.is( resource ) ).toBe( false );
			resource["getFragments"] = ():void => {};
			expect( Document.Factory.is( resource ) ).toBe( false );
			resource["createFragment"] = ():void => {};
			expect( Document.Factory.is( resource ) ).toBe( false );
			resource["createNamedFragment"] = ():void => {};
			expect( Document.Factory.is( resource ) ).toBe( false );
			resource["removeFragment"] = ():void => {};
			expect( Document.Factory.is( resource ) ).toBe( false );
			resource["toJSON"] = ():void => {};
			expect( Document.Factory.is( resource ) ).toBe( false );

			let document = Resource.Factory.createFrom( resource );
			expect( Document.Factory.is( document ) ).toBe( true );
		});

		describe( method(
			STATIC,
			"create"
		), ():void => {

			it( hasSignature(
				"Creates an empty Document object.",
				{ type: "Carbon.Document.Class" }
			), ():void => {
				expect( Document.Factory.create ).toBeDefined();
				expect( Utils.isFunction( Document.Factory.create ) ).toBe( true );

				let document:Document.Class;
				document = Document.Factory.create();
				expect( document.id ).toBe( "" );
				expect( Document.Factory.hasClassProperties( document ) ).toBe( true );
			});

		});


		describe( method(
			STATIC,
			"createFrom"
		), ():void => {

			it( hasSignature(
				"Creates a Document object from the object provided.", [
					{ name: "object", type: "T extends Object" }
				],
				{ type: "Carbon.Document.Class" }
			), ():void => {
				expect( Document.Factory.createFrom ).toBeDefined();
				expect( Utils.isFunction( Document.Factory.createFrom ) ).toBe( true );

				interface myInterface {
					myProperty?:string;
				}
				let document:Document.Class & myInterface;

				document = Document.Factory.createFrom<myInterface>( {} );
				expect( Document.Factory.hasClassProperties( document ) ).toBe( true );
				expect( document.id ).toBe( "" );
				expect( document.myProperty ).toBeUndefined();


				document = Document.Factory.createFrom<myInterface>( { myProperty: "a property" } );
				expect( Document.Factory.hasClassProperties( document ) ).toBe( true );
				expect( document.id ).toBe( "" );
				expect( document.myProperty ).toBe( "a property" );

				(() => {
					let object = {
						myProperty: "THE property",
						myBlankNode: {
							myProperty: "A BlankNode property"
						},
						myNamedFragment: {
							slug: "namedFragment",
							myProperty: "A NamedFragment property"
						}
					};
					document = Document.Factory.createFrom<myInterface>( object );
					expect( object ).toBe( document );
					expect( document.id ).toBe( "" );
					expect( document.myProperty ).toBe( "THE property" );
					expect( document.hasFragment( "namedFragment" ) ).toBe( true );

					let fragments:Fragment.Class[] = document.getFragments();
					expect( fragments.length ).toBe( 2 );

					let theBNode:Fragment.Class & myInterface,
						theNFragment:NamedFragment.Class & myInterface;

					theBNode = <Fragment.Class & myInterface> fragments[ 0 ];
					theNFragment = <NamedFragment.Class & myInterface> fragments[ 1 ];

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

				(() => {
					let object:any = {
						myProperty: "THE property",
						myBlankNode: {
							myProperty: "A BlankNode property"
						},
						myNamedFragment: {
							slug: "namedFragment",
							myProperty: "A NamedFragment property",
							anotherFragment: {
								myProperty: "A nested BlankNode property"
							}
						}
					};
					document = Document.Factory.createFrom<myInterface>( object );
					expect( object ).toBe( document );
					expect( document.id ).toBe( "" );
					expect( document.myProperty ).toBe( "THE property" );
					expect( document.hasFragment( "namedFragment" ) ).toBe( true );

					let fragments:Fragment.Class[] = document.getFragments();
					expect( fragments.length ).toBe( 3 );

					let theBNode:Fragment.Class & myInterface,
						theNestedBNode:Fragment.Class & myInterface,
						theNFragment:NamedFragment.Class & myInterface;
					theBNode = <Fragment.Class & myInterface> fragments[ 0 ];
					theNFragment = <NamedFragment.Class & myInterface> fragments[ 1 ];
					theNestedBNode = <Fragment.Class & myInterface> fragments[ 2 ];

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

				(() => {
					let fragment:any = {
						myProperty: "A BlankNode property"
					};
					let object:any = {
						myProperty: "THE property",
						myBlankNode: fragment,
						myNamedFragment: {
							slug: "namedFragment",
							myProperty: "A NamedFragment property",
							sameBlankNode: fragment
						}
					};
					document = Document.Factory.createFrom<myInterface>( object );
					expect( object ).toBe( document );
					expect( document.id ).toBe( "" );
					expect( document.myProperty ).toBe( "THE property" );
					expect( document.hasFragment( "namedFragment" ) ).toBe( true );

					let fragments:Fragment.Class[] = document.getFragments();
					expect( fragments.length ).toBe( 2 );

					let theBNode:Fragment.Class & myInterface,
						theNFragment:NamedFragment.Class & myInterface;
					theBNode = <Fragment.Class & myInterface> fragments[ 0 ];
					theNFragment = <NamedFragment.Class & myInterface> fragments[ 1 ];

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

				(() => {
					let anotherBlankNode_1:any = {
						id: "_:2",
						myProperty: "Another BNode property",
					};
					let anotherBlankNode_2:any = {
						id: "_:2",
						newProperty: "New property",
					};
					let object:any = {
						id: "http://example.org/resource/",
						myProperty: "THE property",
						myNamedFragment: {
							id: "http://example.org/resource/#namedFragment",
							myProperty: "A NamedFragment property",
							anotherBlankNode: anotherBlankNode_1
						},
						myBlankNode: {
							id: "_:1",
							myProperty: "A BNode property",
							myNamedFragment: {
								slug: "namedFragment",
								myProperty: "A replace of the NamedFragment property",
								anotherBlankNode: anotherBlankNode_2
							}
						}
					};
					document = Document.Factory.createFrom<myInterface>( object );
					expect( object ).toBe( document );
					expect( document.id ).toBe( "http://example.org/resource/" );
					expect( document.myProperty ).toBe( "THE property" );
					expect( document.hasFragment( "namedFragment" ) ).toBe( true );

					let fragments:Fragment.Class[] = document.getFragments();
					expect( fragments.length ).toBe( 3 );

					let theBNode:Fragment.Class & myInterface,
						anotherBNode:Fragment.Class & myInterface,
						theNFragment:NamedFragment.Class & myInterface;
					theNFragment = <NamedFragment.Class & myInterface> fragments[ 0 ];
					anotherBNode = <Fragment.Class & myInterface> fragments[ 1 ];
					theBNode = <Fragment.Class & myInterface> fragments[ 2 ];

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

					expect( document[ "myNamedFragment" ][ "anotherBlankNode" ] ).toBe( anotherBlankNode_1 );
					expect( document[ "myNamedFragment" ][ "anotherBlankNode" ] ).toBe( document[ "myBlankNode" ][ "myNamedFragment" ][ "anotherBlankNode" ] );
					expect( document[ "myBlankNode" ][ "myNamedFragment" ][ "anotherBlankNode" ] ).not.toBe( anotherBlankNode_2 );
					expect( document[ "myBlankNode" ][ "myNamedFragment" ][ "anotherBlankNode" ] ).toBe( anotherBlankNode_1 );
				})();

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
							}
						}
					};
					document = Document.Factory.createFrom<myInterface>( object );
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

				(() => {
					let object:any = {
						myProperty: "The ONE property",
						date: new Date(),
						pointerList: [
							{
								slug: "Fragment_1",
								myProperty: "The Named Fragment"
							},
							{
								id: "_:Fragment_2",
								myProperty: "The Blank Node"
							}
						],
						pointer: {
							id: "#Fragment_1",
							myProperty: "The real Named Fragment"
						}
					};

					document = Document.Factory.createFrom<myInterface>( object );
					expect( object ).toBe( document );
					expect( document.id ).toBe( "" );
					expect( document.myProperty ).toBe( "The ONE property" );
					expect( document.hasFragment( "Fragment_1" ) ).toBe( true );
					expect( document.hasFragment( "_:Fragment_2" ) ).toBe( true );

					let fragments:Fragment.Class[] = document.getFragments();
					expect( Utils.isArray( fragments ) ).toBe( true );
					expect( fragments.length ).toBe( 2 );

					let theBNode:Fragment.Class & myInterface,
						theNFragment:NamedFragment.Class & myInterface;
					theNFragment = <NamedFragment.Class & myInterface> fragments[ 0 ];
					theBNode = <Fragment.Class & myInterface> fragments[ 1 ];

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

			});

		});

		it( hasMethod(
			STATIC,
			"decorate",
			"Adds the properties and method necessary for a Document object.", [
				{ name: "object", type: "T extends Object" }
			],
			{ type: "T & Carbon.Document.Class" }
		), ():void => {
			expect( Document.Factory.decorate ).toBeDefined();
			expect( Utils.isFunction( Document.Factory.decorate ) ).toBe( true );

			let document:{ myProperty?: string } & Document.Class;
			let anotherDocument:{ myProperty?: string } & Document.Class;

			document = Document.Factory.decorate( {} );
			expect( Document.Factory.hasClassProperties( document ) ).toBe( true );

			document = Document.Factory.decorate( { myProperty: "a property" } );
			expect( Document.Factory.hasClassProperties( document ) ).toBe( true );
			expect( document.myProperty ).toBeDefined();
			expect( document.myProperty ).toBe( "a property" );

			anotherDocument = Document.Factory.decorate( document );
			expect( anotherDocument ).toBe( document );
		});

		describe( decoratedObject(
			"Object decorated by the Carbon.LDP.PersistedContainer.Factory.decorate function.", [
				"Carbon.LDP.PersistedContainer.Class"
			]
		), ():void => {
			let document:Document.Class;

			beforeEach( ():void => {
				document = Document.Factory.create();
				document.id = "http://example.com/document/";
			});

			it( hasProperty(
				INSTANCE,
				"_fragmentsIndex",
				"Map<string, Carbon.Fragment.Class>",
				"Map object for store the fragment pointers (named fragments and blank nodes) of the document."
			), ():void => {
				expect( document._fragmentsIndex ).toBeDefined();
				expect( Utils.isMap( document._fragmentsIndex ) ).toBe( true );
			});

			it( hasMethod(
				INSTANCE,
				"hasPointer",
				"Returns true if the Document object has a pointer referenced by the URI provided.", [
					{ name: "id", type: "string" }
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
			});

			it( hasMethod(
				INSTANCE,
				"getPointer",
				"Returns the pointer referenced by the URI provided. If not exists a pointer is created.\n" +
				"Returns null if the URI is not inside scope of the document.", [
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
				pointer = document.getPointer( "this-is-considered-a-fragment/" );
				expect( pointer.id ).toBe( "http://example.com/document/#this-is-considered-a-fragment/" );

				pointer = document.getPointer( "http://example.com/another-document/" );
				expect( pointer ).toBeNull();
			});

			describe( method(
				INSTANCE,
				"inScope"
			), ():void => {

				it( hasSignature(
					"Returns true if the pointer provided is in the scope of the document.", [
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
					pointer = Pointer.Factory.create( "this-is-considered-fragment/" );
					expect( document.inScope( pointer ) ).toBe( true );

					pointer = Pointer.Factory.create( "http://example.com/document/child/" );
					expect( document.inScope( pointer ) ).toBe( false );
					pointer = Pointer.Factory.create( "http://example.com/another-document/" );
					expect( document.inScope( pointer ) ).toBe( false );
					pointer = Pointer.Factory.create( "http://example.org/document/" );
					expect( document.inScope( pointer ) ).toBe( false );
				});

				it( hasSignature(
					"Returns true if the URI provided is in the scope of the document.", [
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
					expect( document.inScope( "this-is-considered-fragment/" ) ).toBe( true );

					expect( document.inScope( "http://example.com/document/child/" ) ).toBe( false );
					expect( document.inScope( "http://example.com/another-document/" ) ).toBe( false );
					expect( document.inScope( "http://example.org/document/" ) ).toBe( false );
				});

			});

			it( hasMethod(
				INSTANCE,
				"hasFragment",
				"Returns true if the document has the fragment id provided", [
					{ name: "id", type: "string" }
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
			});

			it( hasMethod(
				INSTANCE,
				"getFragment",
				"Returns the fragment referenced by the URI provided.\n" +
				"Returns null if no fragment exists in the document.", [
					{ name: "id", type: "string"}
				],
				{ type: "Carbon.Fragment.Class" }
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
			});

			it( hasMethod(
				INSTANCE,
				"getNamedFragment",
				"Returns the fragment referenced by the URI provided.\n" +
				"Returns null if no fragment exists in the document.", [
					{ name: "id", type: "string"}
				],
				{ type: "Carbon.Fragment.Class" }
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
			});

			it( hasMethod(
				INSTANCE,
				"getFragments",
				"Returns an array of the fragments in the document",
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
				if ( NamedFragment.Factory.hasClassProperties( fragments[ 0 ] ) ) {
					expect( fragments[ 0 ].id ).toBe( "http://example.com/document/#fragment" );
					expect( fragments[ 1 ].id ).toBe( "_:BlankNode" );
				} else {
					expect( fragments[ 0 ].id ).toBe( "_:BlankNode" );
					expect( fragments[ 1 ].id ).toBe( "http://example.com/document/#fragment" );
				}
			});

			describe( method(
				INSTANCE,
				"createFragment"
			), ():void => {

				it( hasSignature(
					"Creates a NamedFragment from the object provided and the slug specified.", [
						{ name: "slug", type: "string" },
						{ name: "object", type: "Object" }
					],
					{ type: "Carbon.NamedFragment.Class" }
				), ():void => {
					expect( document.createFragment ).toBeDefined();
					expect( Utils.isFunction( document.createFragment ) ).toBe( true );

					interface MyInterface { myProperty?:string, myPointer?:MyInterface }

					let object:MyInterface;
					let fragment:Fragment.Class & MyInterface;

					object = {};
					fragment = document.createFragment<MyInterface>( "fragment", object );
					expect( object ).toBe( fragment );
					expect( Fragment.Factory.hasClassProperties( fragment ) ).toBe( true );
					expect( fragment.id ).toBe( "http://example.com/document/#fragment" );
					expect( fragment.myProperty ).toBeUndefined();

					object = { myProperty: "The property" };
					fragment = document.createFragment<MyInterface>( "http://example.com/document/#another-fragment", object );
					expect( Fragment.Factory.hasClassProperties( fragment ) ).toBe( true );
					expect( fragment.id ).toBe( "http://example.com/document/#another-fragment" );
					expect( fragment.myProperty ).toBe( "The property" );

					object = { myProperty: "The BlankNode property" };
					fragment = document.createFragment<MyInterface>( "_:BlankNode", object );
					expect( Fragment.Factory.hasClassProperties( fragment ) ).toBe( true );
					expect( fragment.id ).toBe( "_:BlankNode" );
					expect( fragment.myProperty ).toBe( "The BlankNode property" );

					object = { myProperty: "Fragment with nested object", myPointer: { myProperty: "The Nested object" } };
					fragment = document.createFragment<MyInterface>( "#another-another-fragment", object );
					expect( Fragment.Factory.hasClassProperties( fragment ) ).toBe( true );
					expect( fragment.id ).toBe( "http://example.com/document/#another-another-fragment" );
					expect( fragment.myProperty ).toBe( "Fragment with nested object" );
					expect( fragment.myPointer ).toBeDefined();
					expect( Fragment.Factory.hasClassProperties(  fragment.myPointer ) ).toBe( true );
					expect( URI.Util.isBNodeID( (<Fragment.Class> fragment.myPointer).id ) ).toBe( true );
					expect( fragment.myPointer.myProperty ).toBeDefined();
					expect( fragment.myPointer.myProperty ).toBe( "The Nested object" );

					object = { myProperty: "Fragment with nested object", myPointer: { myProperty: "The Nested object" } };
					fragment = document.createFragment<MyInterface>( "_:AnotherBlankNode", object );
					expect( Fragment.Factory.hasClassProperties( fragment ) ).toBe( true );
					expect( fragment.id ).toBe( "_:AnotherBlankNode" );
					expect( fragment.myProperty ).toBe( "Fragment with nested object" );
					expect( fragment.myPointer ).toBeDefined();
					expect( Fragment.Factory.hasClassProperties(  fragment.myPointer ) ).toBe( true );
					expect( URI.Util.isBNodeID( (<Fragment.Class> fragment.myPointer).id ) ).toBe( true );
					expect( fragment.myPointer.myProperty ).toBeDefined();
					expect( fragment.myPointer.myProperty ).toBe( "The Nested object" );

					expect( document.createFragment.bind( document, "http://example.com/another-document/#fragment", {} ) ).toThrowError( Errors.IllegalArgumentError );
					expect( document.createFragment.bind( document, "fragment", {} ) ).toThrowError( Errors.IDAlreadyInUseError );
					expect( document.createFragment.bind( document, "_:BlankNode", {} ) ).toThrowError( Errors.IDAlreadyInUseError );
				});

				it( hasSignature(
					"Creates a BlankNode from the object provided, sing no slug was specififed.", [
						{ name: "object", type: "Object" }
					],
					{ type: "Carbon.Fragment.Class" }
				), ():void => {
					expect( document.createFragment ).toBeDefined();
					expect( Utils.isFunction( document.createFragment ) ).toBe( true );

					interface MyInterface { myProperty?:string, myPointer?:MyInterface }

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
					expect( Fragment.Factory.hasClassProperties(  fragment.myPointer ) ).toBe( true );
					expect( URI.Util.isBNodeID( (<Fragment.Class> fragment.myPointer).id ) ).toBe( true );
					expect( fragment.myPointer.myProperty ).toBeDefined();
					expect( fragment.myPointer.myProperty ).toBe( "The Nested object" );
				});

				it( hasSignature(
					"Creates a Fragment with the slug provided.", [
						{ name: "slug", type: "string" }
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

					expect( document.createFragment.bind( document, "http://example.com/another-document/#fragment" ) ).toThrowError( Errors.IllegalArgumentError );
					expect( document.createFragment.bind( document, "fragment" ) ).toThrowError( Errors.IDAlreadyInUseError );
					expect( document.createFragment.bind( document, "_:BlankNode" ) ).toThrowError( Errors.IDAlreadyInUseError );
				});

				it( hasSignature(
					"Creates a Blank Node Fragment, since no slug is provided",
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
				});

			});

			describe( method(
				INSTANCE,
				"createNamedFragment"
			), ():void => {

				it( hasSignature(
					"Creates a NamedFragment with the slug provided", [
						{ name: "slug", type: "string" }
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

					expect( document.createNamedFragment.bind( document, "_:BlankNode" ) ).toThrowError( Errors.IllegalArgumentError );

					expect( document.createNamedFragment.bind( document, "http://example.com/another-document/#fragment" ) ).toThrowError( Errors.IllegalArgumentError );
					expect( document.createNamedFragment.bind( document, "fragment" ) ).toThrowError( Errors.IDAlreadyInUseError );
				});

				it( hasSignature(
					"Creates a NamedFragment from the object provided and the slug specified.", [
						{ name: "slug", type: "string" },
						{ name: "object", type: "Object" }
					],
					{ type: "Carbon.NamedFragment.Class" }
				), ():void => {

					expect( document.createNamedFragment ).toBeDefined();
					expect( Utils.isFunction( document.createNamedFragment ) ).toBe( true );

					interface MyInterface { myProperty?:string, myPointer?:MyInterface }

					let object:MyInterface;
					let fragment:Fragment.Class & MyInterface;

					object = {};
					fragment = document.createNamedFragment<MyInterface>( "fragment", object );
					expect( object ).toBe( fragment );
					expect( Fragment.Factory.hasClassProperties( fragment ) ).toBe( true );
					expect( fragment.id ).toBe( "http://example.com/document/#fragment" );
					expect( fragment.myProperty ).toBeUndefined();

					object = { myProperty: "The property" };
					fragment = document.createNamedFragment<MyInterface>( "http://example.com/document/#another-fragment", object );
					expect( Fragment.Factory.hasClassProperties( fragment ) ).toBe( true );
					expect( fragment.id ).toBe( "http://example.com/document/#another-fragment" );
					expect( fragment.myProperty ).toBe( "The property" );

					object = { myProperty: "Fragment with nested object", myPointer: { myProperty: "The Nested object" } };
					fragment = document.createNamedFragment<MyInterface>( "#another-another-fragment", object );
					expect( Fragment.Factory.hasClassProperties( fragment ) ).toBe( true );
					expect( fragment.id ).toBe( "http://example.com/document/#another-another-fragment" );
					expect( fragment.myProperty ).toBe( "Fragment with nested object" );
					expect( fragment.myPointer ).toBeDefined();
					expect( Fragment.Factory.hasClassProperties(  fragment.myPointer ) ).toBe( true );
					expect( URI.Util.isBNodeID( (<Fragment.Class> fragment.myPointer).id ) ).toBe( true );
					expect( fragment.myPointer.myProperty ).toBeDefined();
					expect( fragment.myPointer.myProperty ).toBe( "The Nested object" );
				})

			});

			describe( method(
				INSTANCE,
				"removeFragment"
			), ():void => {

				it( hasSignature(
					"Remove the fragment referenced by the NamedFragment object provided from the Document.", [
						{ name: "fragment", type: "Carbon.NamedFragment.Class" }
					]
				), ():void => {
					// TODO wait implementation in the Document Module
				});

				it( hasSignature(
					"Remove the fragment referenced by the Fragment object provided from the Document.", [
						{ name: "fragment", type: "Carbon.Fragment.Class" }
					]
				), ():void => {
					// TODO wait implementation in the Document Module
				});

				it( hasSignature(
					"Remove the fragment referenced by the Slug string provided from the Document.", [
						{ name: "slug", type: "string" }
					]
				), ():void => {
					// TODO wait implementation in the Document Module
				});

			});

			describe( method(
				INSTANCE,
				"toJSON"
			), ():void => {
				let jsonEmptyDocument:string;
				let jsonFullDocument:string;

				beforeAll( ():void => {
					let emptyObject = {
						"@id": "http://example.com/document/",
						"@graph": [{
							"@id": "http://example.com/document/",
							"@type": []
						},{
							"@id": "_:BlankNode",
							"@type": []
						},{
							"@id": "http://example.com/document/#fragment",
							"@type": []
						}]
					};
					jsonEmptyDocument = JSON.stringify( emptyObject );

					let fullObject = {
						"@id": "http://example.com/document/",
						"@graph": [{
							"@id": "http://example.com/document/",
							"@type": [],
							"http://example.com/ns#myProperty": [{
								"@value": "a property",
								"@type": "http://www.w3.org/2001/XMLSchema#string"
							}],
							"http://example.com/ns#myDate": [{
								"@value": "2016-06-01",
								"@type": "http://www.w3.org/2001/XMLSchema#date"
							}],
							"http://example.com/ns#myFragment": [{
								"@id": "_:BlankNode"
							}, {
								"@id": "http://example.com/document/#fragment"
							}]
						},{
							"@id": "_:BlankNode",
							"@type": []
						},{
							"@id": "http://example.com/document/#fragment",
							"@type": []
						}]
					};
					jsonFullDocument = JSON.stringify( fullObject );
				});

				beforeEach( ():void => {
					document.createFragment( "_:BlankNode" );
					document.createFragment( "fragment" );
					document[ "myProperty" ] = "a property";
					document[ "myDate" ] = new Date( "2016-06-01" );
					document[ "myFragment" ] = document.getFragments();
				});

				it( hasSignature(
					"Returns a JSON string from the document using an ObjectSchema and a JSONLDConverter", [
						{ name: "objectSchemaResolver", type: "Carbon.ObjectSchema.Resolver" },
						{ name: "jsonLDConverter", type: "JSONLDConverter" }
					],
					{ type: "string" }
				), ():void => {
					expect( document.toJSON ).toBeDefined();
					expect( Utils.isFunction( document.toJSON ) ).toBe( true );

					class MockedContext extends AbstractContext {
						resolve( uri:string ) {
							return uri;
						}
					}
					let context:AbstractContext = new MockedContext();
					let converter:JSONLDConverter = new JSONLDConverter();
					let json:string;

					json = document.toJSON( context.documents, converter );
					expect( json ).toEqual( jsonEmptyDocument );

					context.extendObjectSchema({
						"ex": "http://example.com/ns#",
						"xsd": "http://www.w3.org/2001/XMLSchema#",
						"ldp": "http://www.w3.org/ns/ldp#",
						"myProperty": {
							"@id": "ex:myProperty",
							"@type": "xsd:string"
						},
						"myDate": {
							"@id": "ex:myDate",
							"@type": "xsd:date",
						},
						"myFragment": {
							"@id": "ex:myFragment",
							"@type": "@id",
							"@container": "@set"
						}
					});
					json = document.toJSON( context.documents, converter );
					expect( json ).toEqual( jsonFullDocument );
				});

				it( hasSignature(
					"Returns a JSON string from the document using an ObjectSchema", [
						{ name: "objectSchemaResolver", type: "Carbon.ObjectSchema.Resolver" }
					],
					{ type: "string" }
				), ():void => {
					expect( document.toJSON ).toBeDefined();
					expect( Utils.isFunction( document.toJSON ) ).toBe( true );

					class MockedContext extends AbstractContext {
						resolve( uri:string ) {
							return uri;
						}
					}
					let context:AbstractContext = new MockedContext();
					let json:string;

					json = document.toJSON( context.documents );
					expect( json ).toEqual( jsonEmptyDocument );

					context.extendObjectSchema({
						"ex": "http://example.com/ns#",
						"xsd": "http://www.w3.org/2001/XMLSchema#",
						"ldp": "http://www.w3.org/ns/ldp#",
						"myProperty": {
							"@id": "ex:myProperty",
							"@type": "xsd:string"
						},
						"myDate": {
							"@id": "ex:myDate",
							"@type": "xsd:date",
						},
						"myFragment": {
							"@id": "ex:myFragment",
							"@type": "@id",
							"@container": "@set"
						}
					});
					json = document.toJSON( context.documents );
					expect( json ).toEqual( jsonFullDocument );

					context.clearObjectSchema();
					context.setSetting( "vocabulary", "vocabulary/#" );
					json = document.toJSON( context.documents );
					expect( json ).toEqual( JSON.stringify( {
						"@id": "http://example.com/document/",
						"@graph": [{
							"@id": "http://example.com/document/",
							"@type": [],
							"vocabulary/#myProperty": [{
								"@value": "a property",
								"@type": "http://www.w3.org/2001/XMLSchema#string"
							}],
							"vocabulary/#myDate": [{
								"@value": "2016-06-01T00:00:00.000Z",
								"@type": "http://www.w3.org/2001/XMLSchema#dateTime"
							}],
							"vocabulary/#myFragment": [{
								"@id": "_:BlankNode"
							}, {
								"@id": "http://example.com/document/#fragment"
							}]
						},{
							"@id": "_:BlankNode",
							"@type": []
						},{
							"@id": "http://example.com/document/#fragment",
							"@type": []
						}]
					}) );
				});

				it( hasSignature(
					"Returns a JSON string from the document using the default ObjectSchema",
					{ type: "string" }
				), ():void => {
					expect( document.toJSON ).toBeDefined();
					expect( Utils.isFunction( document.toJSON ) ).toBe( true );

					let json:string;
					json = document.toJSON();
					expect( json ).toEqual( jsonEmptyDocument );
				});

			});

		});

	});

});