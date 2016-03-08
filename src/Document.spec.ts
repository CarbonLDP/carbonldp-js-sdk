/// <reference path="./../typings/typings.d.ts" />

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
import * as NS from "./NS";

import * as Document from "./Document";

describe( module( "Document" ), ():void => {

	it( isDefined(), ():void => {
		expect( Document ).toBeDefined();
		expect( Utils.isObject( Document ) ).toBe( true );
	});

	describe( clazz(
		"Factory",
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
				{ name: "documentResource", type: "Objet" }
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

		describe( method(
			STATIC,
			"create"
		), ():void => {

			it( hasSignature(
				"Creates an empty Document object which reference to the URI provided.", [
				{ name: "uri", type: "string" }
			],
				{ type: "Carbon.Document.Class" }
			), ():void => {
				expect( Document.Factory.create ).toBeDefined();
				expect( Utils.isFunction( Document.Factory.create ) ).toBe( true );

				let document:Document.Class;
				document = Document.Factory.create( "http://example.com/resource/" );
				expect( document.id ).toBe( "http://example.com/resource/" );
				expect( Document.Factory.hasClassProperties( document ) ).toBe( true );
			});

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
				"Creates a Document object from the object provided and will reference to the URI provided.", [
					{ name: "object", type: "T extends Object" },
					{ name: "uri", type: "string" }
				],
				{ type: "Carbon.Document.Class" }
			), ():void => {
				expect( Document.Factory.createFrom ).toBeDefined();
				expect( Utils.isFunction( Document.Factory.createFrom ) ).toBe( true );

				let document:Document.Class;
				document = Document.Factory.createFrom( {}, "http://example.com/resource/" );
				expect( Document.Factory.hasClassProperties( document ) ).toBe( true );
				expect( document.id ).toBe( "http://example.com/resource/" );

				document = Document.Factory.createFrom( { myProperty: "a property" }, "http://example.com/resource/" );
				expect( Document.Factory.hasClassProperties( document ) ).toBe( true );
				expect( document.id ).toBe( "http://example.com/resource/" );
				expect( document[ "myProperty" ] ).toBe( "a property" );
			});

			it( hasSignature(
				"Creates a Document object from the object provided.",
				{ type: "Carbon.Document.Class" }
			), ():void => {
				expect( Document.Factory.createFrom ).toBeDefined();
				expect( Utils.isFunction( Document.Factory.createFrom ) ).toBe( true );

				let document:Document.Class;
				document = Document.Factory.createFrom( {} );
				expect( Document.Factory.hasClassProperties( document ) ).toBe( true );
				expect( document.id ).toBe( "" );

				document = Document.Factory.createFrom( { myProperty: "a property" } );
				expect( Document.Factory.hasClassProperties( document ) ).toBe( true );
				expect( document.id ).toBe( "" );
				expect( document[ "myProperty" ] ).toBe( "a property" );
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
				document = Document.Factory.create( "http://example.com/document/" );
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

				pointer = document.getPointer( "document/" );
				expect( pointer ).toBeNull();
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

					pointer = Pointer.Factory.create( "http://example.com/document/child/" );
					expect( document.inScope( pointer ) ).toBe( false );
					pointer = Pointer.Factory.create( "http://example.com/another-document/" );
					expect( document.inScope( pointer ) ).toBe( false );
					pointer = Pointer.Factory.create( "http://example.org/document/" );
					expect( document.inScope( pointer ) ).toBe( false );
					pointer = Pointer.Factory.create( "document/" );
					expect( document.inScope( pointer ) ).toBe( false );
					pointer = Pointer.Factory.create( "child/" );
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

					expect( document.inScope( "http://example.com/document/child/" ) ).toBe( false );
					expect( document.inScope( "http://example.com/another-document/" ) ).toBe( false );
					expect( document.inScope( "http://example.org/document/" ) ).toBe( false );
					expect( document.inScope( "document/" ) ).toBe( false );

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
					expect( fragment.id ).toBe( "http://example.com/document/#fragment");

					fragment = document.createFragment( "http://example.com/document/#another-fragment" );
					expect( Fragment.Factory.hasClassProperties( fragment ) ).toBe( true );
					expect( fragment.id ).toBe( "http://example.com/document/#another-fragment");

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

			it( hasMethod(
				INSTANCE,
				"createNamedFragment",
				"Create a Named Fragment with the slug provided", [
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
				expect( fragment.id ).toBe( "http://example.com/document/#fragment");

				fragment = document.createNamedFragment( "http://example.com/document/#another-fragment" );
				expect( Fragment.Factory.hasClassProperties( fragment ) ).toBe( true );
				expect( fragment.slug ).toBe( "another-fragment" );
				expect( fragment.id ).toBe( "http://example.com/document/#another-fragment");

				expect( document.createNamedFragment.bind( document, "_:BlankNode" ) ).toThrowError( Errors.IllegalArgumentError );

				expect( document.createNamedFragment.bind( document, "http://example.com/another-document/#fragment" ) ).toThrowError( Errors.IllegalArgumentError );
				expect( document.createNamedFragment.bind( document, "fragment" ) ).toThrowError( Errors.IDAlreadyInUseError );
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