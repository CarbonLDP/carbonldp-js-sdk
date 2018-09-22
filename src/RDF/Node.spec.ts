import { Pointer, PointerLibrary } from "../Pointer";
import {
	hasMethod,
	hasProperty,
	hasSignature,
	interfaze,
	isDefined,
	method,
	module,
	OBLIGATORY,
	property,
	STATIC,
} from "../test/JasmineExtender";
import { XSD } from "../Vocabularies";
import * as Utils from "./../Utils";
import { RDFDocument } from "./Document";
import { RDFList } from "./List";

import { RDFNode } from "./Node";

describe( module( "carbonldp/RDF/Node" ), ():void => {

	describe( interfaze(
		"CarbonLDP.RDF.RDFNode",
		"Interface that represents an RDF Node."
	), ():void => {

		it( hasProperty(
			OBLIGATORY,
			"@id",
			"string",
			"The ID URI of the current node."
		), ():void => {} );

	} );

	describe( interfaze(
		"CarbonLDP.RDF.RDFNodeFactory",
		"Interface with the factory and utils for `CarbonLDP.RDF.RDFNode` objects."
	), ():void => {

		it( hasMethod(
			OBLIGATORY,
			"is",
			"Returns true if the object provided is considered a `CarbonLDP.RDF.RDFNode` object.", [
				{ name: "value", type: "any" },
			],
			{ type: "value is CarbonLDP.RDF.RDFNode" }
		), ():void => {} );

		it( hasMethod(
			OBLIGATORY,
			"create",
			"Creates a `CarbonLDP.RDF.RDFNode` object with the URI provided.", [
				{ name: "uri", type: "string" },
			],
			{ type: "CarbonLDP.RDF.RDFNode" }
		), ():void => {} );


		describe( method( OBLIGATORY, "getID" ), () => {

			it( hasSignature(
				"Returns the `@id` of the node.", [
					{ name: "node", type: "CarbonLDP.RDF.RDFNode" },
				],
				{ type: "string" }
			), ():void => {} );

			it( "should exists", ():void => {
				expect( RDFNode.getID ).toBeDefined();
				expect( RDFNode.getID ).toEqual( jasmine.any( Function ) );
			} );

			it( "should return the @id of the node", () => {
				const returned:string = RDFNode.getID( { "@id": "the-id/" } );
				expect( returned ).toBe( "the-id/" );
			} );

		} );

		describe( method( OBLIGATORY, "getRelativeID" ), () => {

			it( hasSignature(
				"Returns the relative `@id` of the node when it is a fragment node.", [
					{ name: "node", type: "CarbonLDP.RDF.RDFNode" },
				],
				{ type: "string" }
			), ():void => {} );

			it( "should exists", ():void => {
				expect( RDFNode.getRelativeID ).toBeDefined();
				expect( RDFNode.getRelativeID ).toEqual( jasmine.any( Function ) );
			} );


			it( "should return the fragment when resource is a named fragment", () => {
				const returned:string = RDFNode.getRelativeID( { "@id": "https://example.com/#fragment" } );
				expect( returned ).toBe( "fragment" );
			} );

			it( "should return bNode label when resource is bNode", () => {
				const returned:string = RDFNode.getRelativeID( { "@id": "_:1" } );
				expect( returned ).toBe( "_:1" );
			} );

		} );

		it( hasMethod(
			OBLIGATORY,
			"areEqual",
			"Returns true if the objects represent the same resource.", [
				{ name: "node1", type: "CarbonLDP.RDF.RDFNode" },
				{ name: "node2", type: "CarbonLDP.RDF.RDFNode" },
			],
			{ type: "boolean" }
		), ():void => {} );

		it( hasMethod(
			OBLIGATORY,
			"isFragment",
			"Returns true if the node has a fragment `@id`, i.e. a named fragment or a blank node label.", [
				{ name: "node", type: "CarbonLDP.RDF.RDFNode" },
			],
			{ type: "boolean" }
		), ():void => {} );

		it( hasMethod(
			OBLIGATORY,
			"hasType",
			"Returns true if the Node provided has the specified type.", [
				{ name: "object", type: "CarbonLDP.RDF.RDFNode", description: "The Node to evaluate." },
				{ name: "type", type: "string", description: "The type to look for it existence." },
			],
			{ type: "boolean" }
		), ():void => {} );

		it( hasMethod(
			OBLIGATORY,
			"getTypes",
			"Returns an array with the types of the Node provided.", [
				{ name: "object", type: "CarbonLDP.RDF.RDFNode", description: "The Node to evaluate." },
			],
			{ type: "string[]" }
		), ():void => {} );

		it( hasMethod(
			OBLIGATORY,
			"getList",
			"Returns the List object from the provided property of an expanded JSON-LD object.\n" +
			"Returns `undefined` if no List object is found.", [
				{ name: "expandedValues", type: "string | (string | CarbonLDP.RDF.RDFNode | CarbonLDP.RDF.RDFList | CarbonLDP.RDF.RDFValue | CarbonLDP.RDF.RDFLiteral)[]" },
			],
			{ type: "CarbonLDP.RDF.RDFList" }
		), ():void => {} );

		it( hasMethod(
			OBLIGATORY,
			"getPropertyLiterals",
			"Returns the property array with the parsed Literals.\n" +
			"Returns `undefined` if it cannot be parsed.", [
				{ name: "expandedValues", type: "string | (string | CarbonLDP.RDF.RDFNode | CarbonLDP.RDF.RDFList | CarbonLDP.RDF.RDFValue | CarbonLDP.RDF.RDFLiteral)[]" },
				{ name: "propertyURI", type: "string" },
				{ name: "literalType", type: "string" },
			],
			{ type: "any[]" }
		), ():void => {} );

		it( hasMethod(
			OBLIGATORY,
			"getPropertyLanguageMap",
			"Returns an object associating the language with the parsed string literal.\n" +
			"Returns an empty object if it is not a property with language.", [
				{ name: "expandedValues", type: "string | (string | CarbonLDP.RDF.RDFNode | CarbonLDP.RDF.RDFList | CarbonLDP.RDF.RDFValue | CarbonLDP.RDF.RDFLiteral)[]" },
				{ name: "pointerLibrary", type: "CarbonLDP.PointerLibrary" },
			],
			{ type: "object" }
		), ():void => {} );

	} );

	describe( property(
		STATIC,
		"RDFNode",
		"CarbonLDP.RDF.RDFNodeFactory"
	), ():void => {

		it( isDefined(), ():void => {
			expect( RDFNode ).toBeDefined();
			expect( RDFNode ).toEqual( jasmine.any( Object ) );
		} );

		// TODO: Separate in different tests
		it( "RDFNode.is", ():void => {
			expect( RDFNode.is ).toBeDefined();
			expect( Utils.isFunction( RDFNode.is ) ).toBe( true );

			expect( RDFNode.is( { "@id": "http://example.com/resource/" } ) ).toBe( true );
			expect( RDFNode.is( { "@id": "http://example.com/resource/", "@type": "@id" } ) ).toBe( true );
			expect( RDFNode.is( { "@id": "http://example.com/resource/", "something": "else" } ) ).toBe( true );

			expect( RDFNode.is( { "@id": [ "something", "else" ] } ) ).toBe( false );
			expect( RDFNode.is( { "id": "http://example.com/resource/" } ) ).toBe( false );
			expect( RDFNode.is( { "@type": "http://example.com/types/my-type/" } ) ).toBe( false );
			expect( RDFNode.is( {} ) ).toBe( false );
		} );

		// TODO: Separate in different tests
		it( "RDFNode.create", ():void => {
			expect( RDFNode.create ).toBeDefined();
			expect( Utils.isFunction( RDFNode.create ) ).toBe( true );

			expect( RDFNode.create( "http://example.com/resource/" ) ).toEqual( { "@id": "http://example.com/resource/" } );
			// Does not verify if it is an URI
			expect( RDFNode.create( "some thing that is not an URI, but works" ) ).toEqual( { "@id": "some thing that is not an URI, but works" } );
		} );

		let documentResource:any;
		let pointerLibrary:PointerLibrary;
		let result:any;
		beforeEach( ():void => {
			let expandedObject:any = [ {
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

			documentResource = RDFDocument.getDocumentResources( expandedObject )[ 0 ];
			pointerLibrary = {
				hasPointer: () => { throw new Error( "Not implemented." ); },
				getPointer: id => Pointer.create( { $id: id } ),
			};
		} );

		// TODO: Separate in different tests
		it( "RDFNode.areEqual", ():void => {
			expect( RDFNode.areEqual ).toBeDefined();
			expect( Utils.isFunction( RDFNode.areEqual ) ).toBe( true );

			let node1:RDFNode = { "@id": "http://example.com/resouce/1-one/" };
			let node1Copy:RDFNode = { "@id": "http://example.com/resouce/1-one/" };
			let node2:RDFNode = { "@id": "http://example.com/resouce/2-two/" };
			expect( RDFNode.areEqual( node1, node1 ) ).toBe( true );
			expect( RDFNode.areEqual( node1, node1Copy ) ).toBe( true );
			expect( RDFNode.areEqual( node1Copy, node1 ) ).toBe( true );

			expect( RDFNode.areEqual( node1, node2 ) ).toBe( false );
		} );

		// TODO: Separate in different tests
		it( "RDFNode.hasType", ():void => {
			expect( RDFNode.hasType ).toBeDefined();
			expect( Utils.isFunction( RDFNode.hasType ) ).toBe( true );

			let node:any;
			node = {
				"@id": "http://example.com/resouce/",
				"@type": [ "http://example.com/type-1/" ],
			};
			expect( RDFNode.hasType( node, "http://example.com/type-1/" ) ).toBe( true );
			expect( RDFNode.hasType( node, "http://example.com/type-2/" ) ).toBe( false );

			node = {
				"@id": "http://example.com/resouce/",
				"@type": [ "http://example.com/type-1/", "http://example.com/type-2/" ],
			};
			expect( RDFNode.hasType( node, "http://example.com/type-1/" ) ).toBe( true );
			expect( RDFNode.hasType( node, "http://example.com/type-2/" ) ).toBe( true );
			expect( RDFNode.hasType( node, "http://example.com/type-3/" ) ).toBe( false );

			node = {
				"@id": "http://example.com/resouce/",
				"@type": [],
			};
			expect( RDFNode.hasType( node, "http://example.com/type-1/" ) ).toBe( false );
			expect( RDFNode.hasType( node, "http://example.com/type-2/" ) ).toBe( false );

			node = {
				"@id": "http://example.com/resouce/",
			};
			expect( RDFNode.hasType( node, "http://example.com/type-1/" ) ).toBe( false );
			expect( RDFNode.hasType( node, "http://example.com/type-2/" ) ).toBe( false );
		} );

		// TODO: Separate in different tests
		it( "RDFNode.getTypes", ():void => {
			expect( RDFNode.getTypes ).toBeDefined();
			expect( Utils.isFunction( RDFNode.getTypes ) ).toBe( true );

			let node:any;
			node = {
				"@id": "http://example.com/resouce/",
				"@type": [ "http://example.com/type-1/" ],
			};
			expect( RDFNode.getTypes( node ) ).toEqual( [ "http://example.com/type-1/" ] );

			node = {
				"@id": "http://example.com/resouce/",
				"@type": [ "http://example.com/type-1/", "http://example.com/type-2/" ],
			};
			expect( RDFNode.getTypes( node ) ).toEqual( [ "http://example.com/type-1/", "http://example.com/type-2/" ] );

			node = {
				"@id": "http://example.com/resouce/",
				"@type": [],
			};
			expect( RDFNode.getTypes( node ) ).toEqual( [] );

			node = {
				"@id": "http://example.com/resouce/",
			};
			expect( RDFNode.getTypes( node ) ).toEqual( [] );
		} );

		// TODO: Separate in different tests
		it( "RDFNode.getList", ():void => {
			expect( RDFNode.getList ).toBeDefined();
			expect( Utils.isFunction( RDFNode.getList ) ).toBe( true );

			result = RDFNode.getList( documentResource[ "http://example.com/ns#list" ] );
			expect( RDFList.is( result ) ).toBe( true );


			result = RDFNode.getList( documentResource[ "http://example.com/ns#set" ] );
			expect( result ).toBeUndefined();

			result = RDFNode.getList( documentResource[ "http://example.com/ns#string" ] );
			expect( result ).toBeUndefined();
		} );

		// TODO: Separate in different tests
		it( "RDFNode.getPropertyLiterals", ():void => {
			expect( RDFNode.getPropertyLiterals ).toBeDefined();
			expect( Utils.isFunction( RDFNode.getPropertyLiterals ) ).toBe( true );

			result = RDFNode.getPropertyLiterals( documentResource[ "http://example.com/ns#string" ], XSD.string );
			expect( Utils.isArray( result ) ).toBe( true );
			expect( result.length ).toBe( 1 );
			expect( Utils.isString( result[ 0 ] ) ).toBe( true );
			expect( result[ 0 ] ).toBe( "a string" );

			result = RDFNode.getPropertyLiterals( documentResource[ "http://example.com/ns#integer" ], XSD.integer );
			expect( Utils.isArray( result ) ).toBe( true );
			expect( result.length ).toBe( 1 );
			expect( Utils.isNumber( result[ 0 ] ) ).toBe( true );
			expect( result[ 0 ] ).toBe( 100 );

			result = RDFNode.getPropertyLiterals( documentResource[ "http://example.com/ns#date" ], XSD.dateTime );
			expect( Utils.isArray( result ) ).toBe( true );
			expect( result.length ).toBe( 1 );
			expect( Utils.isDate( result[ 0 ] ) ).toBe( true );
			expect( result[ 0 ] ).toEqual( new Date( "2001-02-15T05:35:12.029Z" ) );

			result = RDFNode.getPropertyLiterals( documentResource[ "http://example.com/ns#set" ], XSD.integer );
			expect( Utils.isArray( result ) ).toBe( true );
			expect( result.length ).toBe( 1 );
			expect( Utils.isNumber( result[ 0 ] ) ).toBe( true );
			expect( result[ 0 ] ).toEqual( 100 );

			result = RDFNode.getPropertyLiterals( documentResource[ "http://example.com/ns#date" ], XSD.float );
			expect( Utils.isArray( result ) ).toBe( true );
			expect( result.length ).toBe( 0 );

			result = RDFNode.getPropertyLiterals( documentResource[ "http://example.com/ns#pointer" ], XSD.string );
			expect( Utils.isArray( result ) ).toBe( true );
			expect( result.length ).toBe( 0 );

			result = RDFNode.getPropertyLiterals( documentResource[ "http://example.com/ns#list" ], XSD.integer );
			expect( Utils.isArray( result ) ).toBe( true );
			expect( result.length ).toBe( 0 );

			result = RDFNode.getPropertyLiterals( documentResource[ "http://example.com/ns#empty-property" ], XSD.object );
			expect( Utils.isArray( result ) ).toBe( true );
			expect( result.length ).toBe( 0 );

			result = RDFNode.getPropertyLiterals( documentResource[ "http://example.com/ns#no-property" ], XSD.string );
			expect( result ).toBeUndefined();
		} );

		// TODO: Separate in different tests
		it( "RDFNode.getPropertyLanguageMap", ():void => {
			expect( RDFNode.getPropertyLanguageMap ).toBeDefined();
			expect( Utils.isFunction( RDFNode.getPropertyLanguageMap ) ).toBe( true );

			result = RDFNode.getPropertyLanguageMap( documentResource[ "http://example.com/ns#internationalString" ] );
			expect( Utils.isObject( result ) ).toBe( true );
			expect( Utils.hasProperty( result, "en" ) ).toBe( true );
			expect( result[ "en" ] ).toBe( "a string" );
			expect( Utils.hasProperty( result, "es" ) ).toBe( true );
			expect( result[ "es" ] ).toBe( "una cadena" );
			expect( Utils.hasProperty( result, "ja" ) ).toBe( true );
			expect( result[ "ja" ] ).toBe( "文字列" );

			result = RDFNode.getPropertyLanguageMap( documentResource[ "http://example.com/ns#string" ] );
			expect( Utils.isObject( result ) ).toBe( true );
			expect( result ).toEqual( {} );

			result = RDFNode.getPropertyLanguageMap( documentResource[ "http://example.com/ns#empty-property" ] );
			expect( Utils.isObject( result ) ).toBe( true );
			expect( result ).toEqual( {} );

			result = RDFNode.getPropertyLanguageMap( documentResource[ "http://example.com/ns#no-property" ] );
			expect( result ).toBeUndefined();
		} );

	} );

} );
