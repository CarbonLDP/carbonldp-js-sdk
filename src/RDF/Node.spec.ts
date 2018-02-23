import { XSD } from "../Vocabularies/XSD";
import AbstractContext from "./../AbstractContext";
import * as PersistedDocument from "./../PersistedDocument";
import {
	Pointer,
	PointerLibrary
} from "./../Pointer";
import {
	clazz,
	hasDefaultExport,
	hasMethod,
	hasProperty,
	interfaze,
	isDefined,
	module,
	OBLIGATORY,
	STATIC,
} from "./../test/JasmineExtender";
import * as Utils from "./../Utils";
import * as Document from "./Document";
import * as RDFList from "./List";

import * as RDFNode from "./Node";
import DefaultExport from "./Node";

describe( module( "Carbon/RDF/Node" ), ():void => {

	it( isDefined(), ():void => {
		expect( RDFNode ).toBeDefined();
		expect( Utils.isObject( RDFNode ) ).toBe( true );
	} );

	describe( interfaze(
		"Carbon.RDF.Node.Class",
		"Interface that represents an `rdf:Node`."
	), ():void => {

		it( hasProperty(
			OBLIGATORY,
			"@id",
			"string",
			"The ID URI of the current node."
		), ():void => {} );

	} );

	it( hasDefaultExport( "Carbon.RDF.Node.Class" ), ():void => {
		let defaultExport:DefaultExport = <any> {};
		let defaultTarget:RDFNode.Class;

		defaultTarget = defaultExport;
		expect( defaultTarget ).toEqual( jasmine.any( Object ) );
	} );

	describe( clazz(
		"Carbon.RDF.Node.Factory",
		"Factory class for `Carbon.RDF.Node.Class` objects."
	), ():void => {

		it( isDefined(), ():void => {
			expect( RDFNode.Factory ).toBeDefined();
			expect( Utils.isFunction( RDFNode.Factory ) ).toBe( true );
		} );

		it( hasMethod(
			STATIC,
			"is",
			"Returns true if the object provided is considered a `Carbon.RDF.Node.Class` object.", [
				{ name: "object", type: "object" },
			],
			{ type: "boolean" }
		), ():void => {
			expect( RDFNode.Factory.is ).toBeDefined();
			expect( Utils.isFunction( RDFNode.Factory.is ) ).toBe( true );

			expect( RDFNode.Factory.is( { "@id": "http://example.com/resource/" } ) ).toBe( true );
			expect( RDFNode.Factory.is( { "@id": "http://example.com/resource/", "@type": "@id" } ) ).toBe( true );
			expect( RDFNode.Factory.is( { "@id": "http://example.com/resource/", "something": "else" } ) ).toBe( true );

			expect( RDFNode.Factory.is( { "@id": [ "something", "else" ] } ) ).toBe( false );
			expect( RDFNode.Factory.is( { "id": "http://example.com/resource/" } ) ).toBe( false );
			expect( RDFNode.Factory.is( { "@type": "http://example.com/types/my-type/" } ) ).toBe( false );
			expect( RDFNode.Factory.is( {} ) ).toBe( false );
		} );

		it( hasMethod(
			STATIC,
			"create",
			"Creates a `Carbon.RDF.Node.Class` object with the URI provided.", [
				{ name: "uri", type: "string" },
			],
			{ type: "Carbon.RDF.Node.Class" }
		), ():void => {
			expect( RDFNode.Factory.create ).toBeDefined();
			expect( Utils.isFunction( RDFNode.Factory.create ) ).toBe( true );

			expect( RDFNode.Factory.create( "http://example.com/resource/" ) ).toEqual( { "@id": "http://example.com/resource/" } );
			// Does not verify if it is an URI
			expect( RDFNode.Factory.create( "some thing that is not an URI, but works" ) ).toEqual( { "@id": "some thing that is not an URI, but works" } );
		} );

	} );

	describe( clazz(
		"Carbon.RDF.Node.Util",
		"Class with useful functions to manage `Carbon.RDF.Node.Class` objects."
	), ():void => {
		let expandedObject:any;
		let documentResource:any;
		let pointerLibrary:PointerLibrary;
		let result:any;
		let context:AbstractContext;

		beforeEach( ():void => {
			expandedObject = [ {
				"@id": "http://example.com/resource/",
				"@graph": [
					{
						"@id": "http://example.com/resource/",
						"http://example.com/ns#string": [ {
							"@value": "a string",
						} ],
						"http://example.com/ns#integer": [ {
							"@value": "100",
							"@type": "http://www.w3.org/2001/XMLSchema#integer",
						} ],
						"http://example.com/ns#date": [ {
							"@value": "2001-02-15T05:35:12.029Z",
							"@type": "http://www.w3.org/2001/XMLSchema#dateTime",
						} ],
						"http://example.com/ns#pointer": [ {
							"@id": "http://example.com/pointer/1",
							"@type": "@id",
						} ],
						"http://example.com/ns#list": [ {
							"@list": [ {
								"@value": "100",
								"@type": "http://www.w3.org/2001/XMLSchema#integer",
							}, {
								"@value": "2001-02-15T05:35:12.029Z",
								"@type": "http://www.w3.org/2001/XMLSchema#dateTime",
							}, {
								"@id": "http://example.com/pointer/1",
								"@type": "@id",
							} ],
						} ],
						"http://example.com/ns#set": [ {
							"@value": "100",
							"@type": "http://www.w3.org/2001/XMLSchema#integer",
						}, {
							"@value": "2001-02-15T05:35:12.029Z",
							"@type": "http://www.w3.org/2001/XMLSchema#dateTime",
						}, {
							"@id": "http://example.com/pointer/1",
							"@type": "@id",
						} ],
						"http://example.com/ns#internationalString": [ {
							"@value": "a string",
							"@language": "en",
							"@type": "http://www.w3.org/2001/XMLSchema#string",
						}, {
							"@value": "una cadena",
							"@language": "es",
						}, {
							"@value": "文字列",
							"@language": "ja",
						} ],
						"http://example.com/ns#pointerSet": [
							{ "@id": "_:1" },
							{ "@id": "http://example.com/resource/#1" },
							{ "@id": "http://example.com/external-resource/" },
						],
						"http://example.com/ns#empty-property": [ {} ],
					},
					{
						"@id": "_:1",
						"http://example.com/ns#string": [ {
							"@value": "Fragment 1",
						} ],
						"http://example.com/ns#pointerSet": [
							{ "@id": "http://example.com/resource/" },
							{ "@id": "http://example.com/resource/#1" },
						],
					},
					{
						"@id": "http://example.com/resource/#1",
						"http://example.com/ns#string": [ {
							"@value": "NamedFragment 1",
						} ],
					},
				],
			} ];

			class MockedContext extends AbstractContext {
				protected _baseURI:string;

				constructor() {
					super();
					this._baseURI = "http://example.com/";
					this.settings = { vocabulary: "http://example.com/vocab#" };
				}
			}

			context = new MockedContext();

			documentResource = Document.Util.getDocumentResources( expandedObject )[ 0 ];
			pointerLibrary = PersistedDocument.Factory.create( expandedObject[ "@id" ], context.documents );
		} );

		it( isDefined(), ():void => {
			expect( RDFNode.Util ).toBeDefined();
			expect( Utils.isFunction( RDFNode.Util ) ).toBe( true );
		} );

		it( hasMethod(
			STATIC,
			"areEqual",
			"Returns true if the objects represent the same resource.", [
				{ name: "node1", type: "Carbon.RDF.Document.Class" },
				{ name: "node2", type: "Carbon.RDF.Document.Class" },
			],
			{ type: "boolean" }
		), ():void => {
			expect( RDFNode.Util.areEqual ).toBeDefined();
			expect( Utils.isFunction( RDFNode.Util.areEqual ) ).toBe( true );

			let node1:RDFNode.Class = { "@id": "http://example.com/resouce/1-one/" };
			let node1Copy:RDFNode.Class = { "@id": "http://example.com/resouce/1-one/" };
			let node2:RDFNode.Class = { "@id": "http://example.com/resouce/2-two/" };
			expect( RDFNode.Util.areEqual( node1, node1 ) ).toBe( true );
			expect( RDFNode.Util.areEqual( node1, node1Copy ) ).toBe( true );
			expect( RDFNode.Util.areEqual( node1Copy, node1 ) ).toBe( true );

			expect( RDFNode.Util.areEqual( node1, node2 ) ).toBe( false );
		} );

		it( hasMethod(
			STATIC,
			"hasType",
			"Returns true if the Node provided has the specified type.", [
				{ name: "object", type: "Object", description: "The Node to evaluate." },
				{ name: "type", type: "string", description: "The type to look for it existence." },
			],
			{ type: "boolean" }
		), ():void => {
			expect( RDFNode.Util.hasType ).toBeDefined();
			expect( Utils.isFunction( RDFNode.Util.hasType ) ).toBe( true );

			let node:any;
			node = {
				"@id": "http://example.com/resouce/",
				"@type": [ "http://example.com/type-1/" ],
			};
			expect( RDFNode.Util.hasType( node, "http://example.com/type-1/" ) ).toBe( true );
			expect( RDFNode.Util.hasType( node, "http://example.com/type-2/" ) ).toBe( false );

			node = {
				"@id": "http://example.com/resouce/",
				"@type": [ "http://example.com/type-1/", "http://example.com/type-2/" ],
			};
			expect( RDFNode.Util.hasType( node, "http://example.com/type-1/" ) ).toBe( true );
			expect( RDFNode.Util.hasType( node, "http://example.com/type-2/" ) ).toBe( true );
			expect( RDFNode.Util.hasType( node, "http://example.com/type-3/" ) ).toBe( false );

			node = {
				"@id": "http://example.com/resouce/",
				"@type": [],
			};
			expect( RDFNode.Util.hasType( node, "http://example.com/type-1/" ) ).toBe( false );
			expect( RDFNode.Util.hasType( node, "http://example.com/type-2/" ) ).toBe( false );

			node = {
				"@id": "http://example.com/resouce/",
			};
			expect( RDFNode.Util.hasType( node, "http://example.com/type-1/" ) ).toBe( false );
			expect( RDFNode.Util.hasType( node, "http://example.com/type-2/" ) ).toBe( false );
		} );

		it( hasMethod(
			STATIC,
			"getTypes",
			"Returns an array with the types of the Node provided.", [
				{ name: "object", type: "Object", description: "The Node to evaluate." },
			],
			{ type: "string[]" }
		), ():void => {
			expect( RDFNode.Util.hasType ).toBeDefined();
			expect( Utils.isFunction( RDFNode.Util.hasType ) ).toBe( true );

			let node:any;
			node = {
				"@id": "http://example.com/resouce/",
				"@type": [ "http://example.com/type-1/" ],
			};
			expect( RDFNode.Util.getTypes( node ) ).toEqual( [ "http://example.com/type-1/" ] );

			node = {
				"@id": "http://example.com/resouce/",
				"@type": [ "http://example.com/type-1/", "http://example.com/type-2/" ],
			};
			expect( RDFNode.Util.getTypes( node ) ).toEqual( [ "http://example.com/type-1/", "http://example.com/type-2/" ] );

			node = {
				"@id": "http://example.com/resouce/",
				"@type": [],
			};
			expect( RDFNode.Util.getTypes( node ) ).toEqual( [] );

			node = {
				"@id": "http://example.com/resouce/",
			};
			expect( RDFNode.Util.getTypes( node ) ).toEqual( [] );
		} );

		it( hasMethod(
			STATIC,
			"getPropertyURI",
			"Returns the URI from a property resource in the Node object.\n" +
			"Returns `null` if the property doesn't exists or the URI is not found.", [
				{ name: "node", type: "Carbon.RDF.Node.Class" },
				{ name: "predicate", type: "string" },
			],
			{ type: "string" }
		), ():void => {
			expect( RDFNode.Util.getPropertyURI ).toBeDefined();
			expect( Utils.isFunction( RDFNode.Util.getPropertyURI ) ).toBe( true );

			let document:Object = {
				"@id": "http://example.com/resource-id/",
				"http://example.com/property-1/": [ {
					"@id": "http://example.com/property-id/",
				} ],
				"http://example.com/member/": [ {
					"@id": "http://example.com/member-id-1/",
				}, {
					"@id": "http://example.com/member-id-2/",
				}, {
					"@id": "http://example.com/member-id-3/",
				} ],
			};
			let node:RDFNode.Class = <RDFNode.Class>document;
			let id:string;

			id = RDFNode.Util.getPropertyURI( node, "http://example.com/property-1/" );
			expect( id ).toBeDefined();
			expect( Utils.isString( id ) ).toBe( true );
			expect( id ).toBe( "http://example.com/property-id/" );

			id = RDFNode.Util.getPropertyURI( node, "http://example.com/member/" );
			expect( id ).toBeDefined();
			expect( Utils.isString( id ) ).toBe( true );
			expect( id ).toBe( "http://example.com/member-id-1/" );

			id = RDFNode.Util.getPropertyURI( node, "http://example.com/contains/" );
			expect( id ).toBeDefined();
			expect( id ).toBeNull();
		} );

		it( hasMethod(
			STATIC,
			"getFreeNodes",
			"Returns an array with the nodes that are neither a Document nor are contained inside a one.", [
				{ name: "object", type: "T extends Object", description: "The object to evaluate for its free nodes." },
			],
			{ type: "Carbon.RDF.Node.Class[]" }
		), ():void => {
			expect( RDFNode.Util.getFreeNodes ).toBeDefined();
			expect( Utils.isFunction( RDFNode.Util.getFreeNodes ) ).toBe( true );

			let object:any;

			object = {};
			expect( RDFNode.Util.getFreeNodes( object ) ).toEqual( [] );

			object = [];
			expect( RDFNode.Util.getFreeNodes( object ) ).toEqual( [] );
			object = [
				{
					"@id": "http://example.com/resouce/",
					"@graph": [ {} ],
				},
			];
			expect( RDFNode.Util.getFreeNodes( object ) ).toEqual( [] );
			object = [
				{
					"@id": "http://example.com/resouce-1/",
					"@graph": [ {} ],
				},
				{
					"@id": "http://example.com/resouce-2/",
					"@graph": [ {} ],
				},
			];
			expect( RDFNode.Util.getFreeNodes( object ) ).toEqual( [] );

			object = [
				{
					"@id": "http://example.com/free-node-1/",
				},
				{
					"@id": "http://example.com/resouce-1/",
					"@graph": [ {} ],
				},
				{
					"@id": "http://example.com/free-node-2/",
				},
				{
					"@id": "http://example.com/resouce-2/",
					"@graph": [ {} ],
				},
			];
			expect( RDFNode.Util.getFreeNodes( object ) ).toEqual( [ { "@id": "http://example.com/free-node-1/" }, { "@id": "http://example.com/free-node-2/" } ] );
		} );

		it( hasMethod(
			STATIC,
			"getProperty",
			"Returns the property searched, parsed in accordance to the RDF object it is.\n" +
			"Returns null if the property is not found or cannot be parsed.", [
				{ name: "expandedObject", type: "any" },
				{ name: "propertyURI", type: "string" },
				{ name: "pointerLibrary", type: "Carbon.Pointer.PointerLibrary" },
			],
			{ type: "any" }
		), ():void => {
			expect( RDFNode.Util.getProperty ).toBeDefined();
			expect( Utils.isFunction( RDFNode.Util.getProperty ) ).toBe( true );

			result = RDFNode.Util.getProperty( documentResource, "http://example.com/ns#string", pointerLibrary );
			expect( Utils.isString( result ) ).toBe( true );
			expect( result ).toBe( "a string" );
			result = RDFNode.Util.getProperty( documentResource, "http://example.com/ns#integer", pointerLibrary );
			expect( Utils.isNumber( result ) ).toBe( true );
			expect( result ).toBe( 100 );
			result = RDFNode.Util.getProperty( documentResource, "http://example.com/ns#date", pointerLibrary );
			expect( Utils.isDate( result ) ).toBe( true );
			expect( result ).toEqual( new Date( "2001-02-15T05:35:12.029Z" ) );

			result = RDFNode.Util.getProperty( documentResource, "http://example.com/ns#pointer", pointerLibrary );
			expect( Pointer.is( result ) ).toBe( true );
			expect( result.id ).toBe( "http://example.com/pointer/1" );
			expect( result.isResolved() ).toBe( false );


			result = RDFNode.Util.getProperty( documentResource, "http://example.com/ns#list", pointerLibrary );
			expect( Utils.isArray( result ) ).toBe( true );
			expect( result.length ).toBe( 3 );
			expect( result[ 0 ] ).toBe( 100 );
			expect( result[ 1 ] ).toEqual( new Date( "2001-02-15T05:35:12.029Z" ) );
			expect( Pointer.is( result[ 2 ] ) ).toBe( true );
			expect( result[ 2 ].id ).toBe( "http://example.com/pointer/1" );

			result = RDFNode.Util.getProperty( documentResource, "http://example.com/ns#set", pointerLibrary );
			expect( Utils.isNumber( result ) ).toBe( true );
			expect( result ).toBe( 100 );

			result = RDFNode.Util.getProperty( documentResource, "http://example.com/ns#no-property", pointerLibrary );
			expect( result ).toBeNull();

			result = RDFNode.Util.getProperty( documentResource, "http://example.com/ns#empty-property", pointerLibrary );
			expect( result ).toBeNull();
		} );

		it( hasMethod(
			STATIC,
			"getPropertyPointer",
			"Returns the property searched as a Pointer.\n" +
			"Returns null if the property is not found or cannot be parsed as a Pointer.", [
				{ name: "expandedObject", type: "any" },
				{ name: "propertyURI", type: "string" },
				{ name: "pointerLibrary", type: "Carbon.Pointer.PointerLibrary" },
			],
			{ type: "any" }
		), ():void => {
			expect( RDFNode.Util.getPropertyPointer ).toBeDefined();
			expect( Utils.isFunction( RDFNode.Util.getPropertyPointer ) ).toBe( true );

			let pointer:Pointer;

			result = RDFNode.Util.getPropertyPointer( documentResource, "http://example.com/ns#pointer", pointerLibrary );
			expect( Pointer.is( result ) ).toBe( true );
			expect( result.id ).toBe( "http://example.com/pointer/1" );

			result = RDFNode.Util.getPropertyPointer( documentResource, "http://example.com/ns#pointerSet", pointerLibrary );
			expect( Pointer.is( result ) ).toBe( true );
			expect( result.id ).toBe( "_:1" );

			result = RDFNode.Util.getPropertyPointer( documentResource, "http://example.com/ns#string", pointerLibrary );
			expect( result ).toBeNull();
			result = RDFNode.Util.getPropertyPointer( documentResource, "http://example.com/ns#no-property", pointerLibrary );
			expect( result ).toBeNull();
			result = RDFNode.Util.getPropertyPointer( documentResource, "http://example.com/ns#empty-property", pointerLibrary );
			expect( result ).toBeNull();
		} );

		it( hasMethod(
			STATIC,
			"getPropertyLiteral",
			"Returns the property searched as a javascript variable. The property must be an RDF Literal.\n" +
			"Returns null if the property is not found, the type provided not match with the type of the Literal, or cannot be parsed from a Literal.", [
				{ name: "expandedObject", type: "any" },
				{ name: "propertyURI", type: "string" },
				{ name: "literalType", type: "string" },
			],
			{ type: "any" }
		), ():void => {
			expect( RDFNode.Util.getPropertyLiteral ).toBeDefined();
			expect( Utils.isFunction( RDFNode.Util.getPropertyLiteral ) ).toBe( true );

			result = RDFNode.Util.getPropertyLiteral( documentResource, "http://example.com/ns#string", XSD.string );
			expect( Utils.isString( result ) ).toBe( true );
			expect( result ).toBe( "a string" );
			result = RDFNode.Util.getPropertyLiteral( documentResource, "http://example.com/ns#integer", XSD.integer );
			expect( Utils.isNumber( result ) ).toBe( true );
			expect( result ).toBe( 100 );
			result = RDFNode.Util.getPropertyLiteral( documentResource, "http://example.com/ns#date", XSD.dateTime );
			expect( Utils.isDate( result ) ).toBe( true );
			expect( result ).toEqual( new Date( "2001-02-15T05:35:12.029Z" ) );

			result = RDFNode.Util.getPropertyLiteral( documentResource, "http://example.com/ns#no-property", XSD.string );
			expect( result ).toBeNull();
			result = RDFNode.Util.getPropertyLiteral( documentResource, "http://example.com/ns#date", XSD.float );
			expect( result ).toBeNull();
			result = RDFNode.Util.getPropertyLiteral( documentResource, "http://example.com/ns#pointer", XSD.string );
			expect( result ).toBeNull();
			result = RDFNode.Util.getPropertyLiteral( documentResource, "http://example.com/ns#empty-property", XSD.object );
			expect( result ).toBeNull();
		} );

		it( hasMethod(
			STATIC,
			"getPropertyList",
			"Returns the property searched as an Array with every element parsed to its respective type of element.\n" +
			"Returns null if the property is not found or cannot be parsed.", [
				{ name: "expandedObject", type: "any" },
				{ name: "propertyURI", type: "string" },
				{ name: "pointerLibrary", type: "Carbon.Pointer.PointerLibrary" },
			],
			{ type: "any" }
		), ():void => {
			expect( RDFNode.Util.getPropertyList ).toBeDefined();
			expect( Utils.isFunction( RDFNode.Util.getPropertyList ) ).toBe( true );

			result = RDFNode.Util.getPropertyList( documentResource, "http://example.com/ns#list", pointerLibrary );
			expect( Utils.isArray( result ) ).toBe( true );
			expect( result.length ).toBe( 3 );
			expect( result[ 0 ] ).toBe( 100 );
			expect( result[ 1 ] ).toEqual( new Date( "2001-02-15T05:35:12.029Z" ) );
			expect( Pointer.is( result[ 2 ] ) ).toBe( true );
			expect( result[ 2 ].id ).toBe( "http://example.com/pointer/1" );

			result = RDFNode.Util.getPropertyList( documentResource, "http://example.com/ns#no-property", pointerLibrary );
			expect( result ).toBeNull();
			result = RDFNode.Util.getPropertyList( documentResource, "http://example.com/ns#string", pointerLibrary );
			expect( result ).toBeNull();
		} );

		it( hasMethod(
			STATIC,
			"getPropertyPointerList",
			"Returns the property list searched as an Array of Pointers. It will be filtered no pointer values.\n" +
			"Returns null if the property is not found or is not a List.", [
				{ name: "expandedObject", type: "any" },
				{ name: "propertyURI", type: "string" },
				{ name: "pointerLibrary", type: "Carbon.Pointer.PointerLibrary" },
			],
			{ type: "any" }
		), ():void => {
			expect( RDFNode.Util.getPropertyPointerList ).toBeDefined();
			expect( Utils.isFunction( RDFNode.Util.getPropertyPointerList ) ).toBe( true );

			result = RDFNode.Util.getPropertyPointerList( documentResource, "http://example.com/ns#list", pointerLibrary );
			expect( Utils.isArray( result ) ).toBe( true );
			expect( result.length ).toBe( 1 );
			expect( Pointer.is( result[ 0 ] ) ).toBe( true );
			expect( result[ 0 ].id ).toBe( "http://example.com/pointer/1" );

			result = RDFNode.Util.getPropertyPointerList( documentResource, "http://example.com/ns#no-property", pointerLibrary );
			expect( result ).toBeNull();
			result = RDFNode.Util.getPropertyPointerList( documentResource, "http://example.com/ns#string", pointerLibrary );
			expect( result ).toBeNull();
			result = RDFNode.Util.getPropertyPointerList( documentResource, "http://example.com/ns#empty-property", pointerLibrary );
			expect( result ).toBeNull();
		} );

		it( hasMethod(
			STATIC,
			"getPropertyLiteralList",
			"Returns the property list searched as an Array of parsed Literals. It will be filtered no Literal values with the type specified.\n" +
			"Returns null if the property is not found or is not a List.", [
				{ name: "expandedObject", type: "any" },
				{ name: "propertyURI", type: "string" },
				{ name: "pointerLibrary", type: "Carbon.Pointer.PointerLibrary" },
			],
			{ type: "any" }
		), ():void => {
			expect( RDFNode.Util.getPropertyLiteralList ).toBeDefined();
			expect( Utils.isFunction( RDFNode.Util.getPropertyLiteralList ) ).toBe( true );

			result = RDFNode.Util.getPropertyLiteralList( documentResource, "http://example.com/ns#list", XSD.integer );
			expect( Utils.isArray( result ) ).toBe( true );
			expect( result.length ).toBe( 1 );
			expect( result[ 0 ] ).toBe( 100 );

			result = RDFNode.Util.getPropertyLiteralList( documentResource, "http://example.com/ns#no-property", XSD.integer );
			expect( result ).toBeNull();
			result = RDFNode.Util.getPropertyLiteralList( documentResource, "http://example.com/ns#string", XSD.integer );
			expect( result ).toBeNull();
			result = RDFNode.Util.getPropertyLiteralList( documentResource, "http://example.com/ns#empty-property", XSD.object );
			expect( result ).toBeNull();
		} );

		it( hasMethod(
			STATIC,
			"getProperties",
			"Returns the property array with the parsed Literal, Pointer or List.\n" +
			"Returns an empty array if it cannot be parsed.", [
				{ name: "expandedValues", type: "any[]" },
				{ name: "pointerLibrary", type: "Carbon.Pointer.PointerLibrary" },
			],
			{ type: "any" }
		), ():void => {
			expect( RDFNode.Util.getProperties ).toBeDefined();
			expect( Utils.isFunction( RDFNode.Util.getProperties ) ).toBe( true );

			result = RDFNode.Util.getProperties( documentResource[ "http://example.com/ns#string" ], pointerLibrary );
			expect( Utils.isArray( result ) ).toBe( true );
			expect( result.length ).toBe( 1 );
			expect( Utils.isString( result[ 0 ] ) ).toBe( true );
			expect( result[ 0 ] ).toBe( "a string" );

			result = RDFNode.Util.getProperties( documentResource[ "http://example.com/ns#integer" ], pointerLibrary );
			expect( Utils.isArray( result ) ).toBe( true );
			expect( result.length ).toBe( 1 );
			expect( Utils.isNumber( result[ 0 ] ) ).toBe( true );
			expect( result[ 0 ] ).toBe( 100 );

			result = RDFNode.Util.getProperties( documentResource[ "http://example.com/ns#date" ], pointerLibrary );
			expect( Utils.isArray( result ) ).toBe( true );
			expect( result.length ).toBe( 1 );
			expect( Utils.isDate( result[ 0 ] ) ).toBe( true );
			expect( result[ 0 ] ).toEqual( new Date( "2001-02-15T05:35:12.029Z" ) );

			result = RDFNode.Util.getProperties( documentResource[ "http://example.com/ns#pointer" ], pointerLibrary );
			expect( Utils.isArray( result ) ).toBe( true );
			expect( result.length ).toBe( 1 );
			expect( Pointer.is( result[ 0 ] ) ).toBe( true );
			expect( result[ 0 ].id ).toBe( "http://example.com/pointer/1" );

			result = RDFNode.Util.getProperties( documentResource[ "http://example.com/ns#list" ], pointerLibrary );
			expect( Utils.isArray( result ) ).toBe( true );
			expect( result.length ).toBe( 1 );
			expect( Utils.isArray( result[ 0 ] ) ).toBe( true );
			expect( result[ 0 ].length ).toBe( 3 );
			expect( result[ 0 ][ 0 ] ).toBe( 100 );
			expect( result[ 0 ][ 1 ] ).toEqual( new Date( "2001-02-15T05:35:12.029Z" ) );
			expect( Pointer.is( result[ 0 ][ 2 ] ) ).toBe( true );
			expect( result[ 0 ][ 2 ].id ).toBe( "http://example.com/pointer/1" );

			result = RDFNode.Util.getProperties( documentResource[ "http://example.com/ns#pointerSet" ], pointerLibrary );
			expect( Utils.isArray( result ) ).toBe( true );
			expect( result.length ).toBe( 3 );
			expect( Pointer.is( result[ 0 ] ) ).toBe( true );
			expect( result[ 0 ].id ).toBe( "_:1" );
			expect( Pointer.is( result[ 1 ] ) ).toBe( true );
			expect( result[ 1 ].id ).toBe( "http://example.com/resource/#1" );
			expect( Pointer.is( result[ 2 ] ) ).toBe( true );
			expect( result[ 2 ].id ).toBe( "http://example.com/external-resource/" );

			result = RDFNode.Util.getProperties( documentResource[ "http://example.com/ns#empty-property" ], pointerLibrary );
			expect( Utils.isArray( result ) ).toBe( true );
			expect( result.length ).toBe( 0 );

			result = RDFNode.Util.getProperties( documentResource[ "http://example.com/ns#no-property" ], pointerLibrary );
			expect( result ).toBeNull();
		} );

		it( hasMethod(
			STATIC,
			"getPropertyPointers",
			"Returns the property array with the parsed Pointers values.\n" +
			"Returns an empty array if the property cannot be parsed as a pointer.", [
				{ name: "expandedValues", type: "any[]" },
				{ name: "pointerLibrary", type: "Carbon.Pointer.PointerLibrary" },
			],
			{ type: "any" }
		), ():void => {
			expect( RDFNode.Util.getPropertyPointers ).toBeDefined();
			expect( Utils.isFunction( RDFNode.Util.getPropertyPointers ) ).toBe( true );

			result = RDFNode.Util.getPropertyPointers( documentResource[ "http://example.com/ns#pointer" ], pointerLibrary );
			expect( Utils.isArray( result ) ).toBe( true );
			expect( result.length ).toBe( 1 );
			expect( Pointer.is( result[ 0 ] ) ).toBe( true );
			expect( result[ 0 ].id ).toBe( "http://example.com/pointer/1" );

			result = RDFNode.Util.getPropertyPointers( documentResource[ "http://example.com/ns#pointerSet" ], pointerLibrary );
			expect( Utils.isArray( result ) ).toBe( true );
			expect( result.length ).toBe( 3 );
			expect( Pointer.is( result[ 0 ] ) ).toBe( true );
			expect( result[ 0 ].id ).toBe( "_:1" );
			expect( Pointer.is( result[ 1 ] ) ).toBe( true );
			expect( result[ 1 ].id ).toBe( "http://example.com/resource/#1" );
			expect( Pointer.is( result[ 2 ] ) ).toBe( true );
			expect( result[ 2 ].id ).toBe( "http://example.com/external-resource/" );

			result = RDFNode.Util.getPropertyPointers( documentResource[ "http://example.com/ns#string" ], pointerLibrary );
			expect( Utils.isArray( result ) ).toBe( true );
			expect( result.length ).toBe( 0 );
			result = RDFNode.Util.getPropertyPointers( documentResource[ "http://example.com/ns#empty-property" ], pointerLibrary );
			expect( Utils.isArray( result ) ).toBe( true );
			expect( result.length ).toBe( 0 );

			result = RDFNode.Util.getPropertyPointers( documentResource[ "http://example.com/ns#no-property" ], pointerLibrary );
			expect( result ).toEqual( [] );
		} );

		it( hasMethod(
			STATIC,
			"getPropertyURIs",
			"Returns the URIs of the property searched.\n" +
			"Returns null if the property is not found or an empty array if no URI was found.", [
				{ name: "expandedObject", type: "any" },
				{ name: "propertyURI", type: "string" },
			],
			{ type: "any" }
		), ():void => {
			expect( RDFNode.Util.getPropertyURIs ).toBeDefined();
			expect( Utils.isFunction( RDFNode.Util.getPropertyURIs ) ).toBe( true );

			result = RDFNode.Util.getPropertyURIs( documentResource, "http://example.com/ns#pointer" );
			expect( Utils.isArray( result ) ).toBe( true );
			expect( result.length ).toBe( 1 );
			expect( result[ 0 ] ).toBe( "http://example.com/pointer/1" );

			result = RDFNode.Util.getPropertyURIs( documentResource, "http://example.com/ns#pointerSet" );
			expect( Utils.isArray( result ) ).toBe( true );
			expect( result.length ).toBe( 3 );
			expect( result[ 0 ] ).toBe( "_:1" );
			expect( result[ 1 ] ).toBe( "http://example.com/resource/#1" );
			expect( result[ 2 ] ).toBe( "http://example.com/external-resource/" );

			result = RDFNode.Util.getPropertyURIs( documentResource, "http://example.com/ns#string" );
			expect( Utils.isArray( result ) ).toBe( true );
			expect( result.length ).toBe( 0 );

			result = RDFNode.Util.getPropertyURIs( documentResource, "http://example.com/ns#integer" );
			expect( Utils.isArray( result ) ).toBe( true );
			expect( result.length ).toBe( 0 );

			result = RDFNode.Util.getPropertyURIs( documentResource, "http://example.com/ns#list" );
			expect( Utils.isArray( result ) ).toBe( true );
			expect( result.length ).toBe( 0 );

			result = RDFNode.Util.getPropertyURIs( documentResource, "http://example.com/ns#empty-property" );
			expect( Utils.isArray( result ) ).toBe( true );
			expect( result.length ).toBe( 0 );

			result = RDFNode.Util.getPropertyURIs( documentResource, "http://example.com/ns#no-property" );
			expect( result ).toBeNull();
		} );

		it( hasMethod(
			STATIC,
			"getPropertyLiterals",
			"Returns the property array with the parsed Literals.\n" +
			"Returns an empty array if it cannot be parsed.", [
				{ name: "expandedValues", type: "any[]" },
				{ name: "propertyURI", type: "string" },
				{ name: "literalType", type: "string" },
			],
			{ type: "any" }
		), ():void => {
			expect( RDFNode.Util.getPropertyLiterals ).toBeDefined();
			expect( Utils.isFunction( RDFNode.Util.getPropertyLiterals ) ).toBe( true );

			result = RDFNode.Util.getPropertyLiterals( documentResource[ "http://example.com/ns#string" ], XSD.string );
			expect( Utils.isArray( result ) ).toBe( true );
			expect( result.length ).toBe( 1 );
			expect( Utils.isString( result[ 0 ] ) ).toBe( true );
			expect( result[ 0 ] ).toBe( "a string" );

			result = RDFNode.Util.getPropertyLiterals( documentResource[ "http://example.com/ns#integer" ], XSD.integer );
			expect( Utils.isArray( result ) ).toBe( true );
			expect( result.length ).toBe( 1 );
			expect( Utils.isNumber( result[ 0 ] ) ).toBe( true );
			expect( result[ 0 ] ).toBe( 100 );

			result = RDFNode.Util.getPropertyLiterals( documentResource[ "http://example.com/ns#date" ], XSD.dateTime );
			expect( Utils.isArray( result ) ).toBe( true );
			expect( result.length ).toBe( 1 );
			expect( Utils.isDate( result[ 0 ] ) ).toBe( true );
			expect( result[ 0 ] ).toEqual( new Date( "2001-02-15T05:35:12.029Z" ) );

			result = RDFNode.Util.getPropertyLiterals( documentResource[ "http://example.com/ns#set" ], XSD.integer );
			expect( Utils.isArray( result ) ).toBe( true );
			expect( result.length ).toBe( 1 );
			expect( Utils.isNumber( result[ 0 ] ) ).toBe( true );
			expect( result[ 0 ] ).toEqual( 100 );

			result = RDFNode.Util.getPropertyLiterals( documentResource[ "http://example.com/ns#date" ], XSD.float );
			expect( Utils.isArray( result ) ).toBe( true );
			expect( result.length ).toBe( 0 );

			result = RDFNode.Util.getPropertyLiterals( documentResource[ "http://example.com/ns#pointer" ], XSD.string );
			expect( Utils.isArray( result ) ).toBe( true );
			expect( result.length ).toBe( 0 );

			result = RDFNode.Util.getPropertyLiterals( documentResource[ "http://example.com/ns#list" ], XSD.integer );
			expect( Utils.isArray( result ) ).toBe( true );
			expect( result.length ).toBe( 0 );

			result = RDFNode.Util.getPropertyLiterals( documentResource[ "http://example.com/ns#empty-property" ], XSD.object );
			expect( Utils.isArray( result ) ).toBe( true );
			expect( result.length ).toBe( 0 );

			result = RDFNode.Util.getPropertyLiterals( documentResource[ "http://example.com/ns#no-property" ], XSD.string );
			expect( result ).toBeNull();
		} );

		it( hasMethod(
			STATIC,
			"getPropertyLanguageMap",
			"Returns an object associating the language with the parsed string literal.\n" +
			"Returns an empty object if it is not a property with language.", [
				{ name: "expandedValues", type: "any[]" },
				{ name: "pointerLibrary", type: "Carbon.Pointer.PointerLibrary" },
			],
			{ type: "any" }
		), ():void => {
			expect( RDFNode.Util.getPropertyLanguageMap ).toBeDefined();
			expect( Utils.isFunction( RDFNode.Util.getPropertyLanguageMap ) ).toBe( true );

			result = RDFNode.Util.getPropertyLanguageMap( documentResource[ "http://example.com/ns#internationalString" ] );
			expect( Utils.isObject( result ) ).toBe( true );
			expect( Utils.hasProperty( result, "en" ) ).toBe( true );
			expect( result[ "en" ] ).toBe( "a string" );
			expect( Utils.hasProperty( result, "es" ) ).toBe( true );
			expect( result[ "es" ] ).toBe( "una cadena" );
			expect( Utils.hasProperty( result, "ja" ) ).toBe( true );
			expect( result[ "ja" ] ).toBe( "文字列" );

			result = RDFNode.Util.getPropertyLanguageMap( documentResource[ "http://example.com/ns#string" ] );
			expect( Utils.isObject( result ) ).toBe( true );
			expect( result ).toEqual( {} );

			result = RDFNode.Util.getPropertyLanguageMap( documentResource[ "http://example.com/ns#empty-property" ] );
			expect( Utils.isObject( result ) ).toBe( true );
			expect( result ).toEqual( {} );

			result = RDFNode.Util.getPropertyLanguageMap( documentResource[ "http://example.com/ns#no-property" ] );
			expect( result ).toBeNull();
		} );

		it( hasMethod(
			STATIC,
			"getList",
			"Returns the List object from the provided property of an expanded JSON-LD object.\n" +
			"Returns null if no List object is found.", [
				{ name: "propertyValues", type: "Array<any>" },
			],
			{ type: "Carbon.RDF.List.Class" }
		), ():void => {
			expect( RDFNode.Util.getList ).toBeDefined();
			expect( Utils.isFunction( RDFNode.Util.getList ) ).toBe( true );

			result = RDFNode.Util.getList( documentResource[ "http://example.com/ns#list" ] );
			expect( RDFList.Factory.is( result ) ).toBe( true );

			result = RDFNode.Util.getList( documentResource[ "http://example.com/ns#set" ] );
			expect( result ).toBeNull();
			result = RDFNode.Util.getList( documentResource[ "http://example.com/ns#string" ] );
			expect( result ).toBeNull();
		} );

	} );

} );
