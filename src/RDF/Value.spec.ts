import { AbstractContext } from "../AbstractContext";
import { PersistedDocument } from "../PersistedDocument";
import {
	Pointer,
	PointerLibrary,
} from "../Pointer";
import {
	hasDefaultExport,
	hasMethod,
	hasProperty,
	interfaze,
	isDefined,
	module,
	OBLIGATORY,
	OPTIONAL,
	property,
	STATIC,
} from "../test/JasmineExtender";
import { RDFDocument } from "./../RDF/Document";
import * as Utils from "./../Utils";

import DefaultExport, { RDFValue } from "./Value";

describe( module( "Carbon/RDF/Value" ), ():void => {

	describe( interfaze(
		"Carbon.RDF.Value.RDFValue",
		"Interface that represents an `rdf:Value`."
	), ():void => {

		it( hasProperty(
			OPTIONAL,
			"@id",
			"string",
			"The ID URI of the current value."
		), ():void => {} );

		it( hasProperty(
			OPTIONAL,
			"@type",
			"string",
			"The URI if the XSD type of the possible value."
		), ():void => {} );

		it( hasProperty(
			OPTIONAL,
			"@value",
			"string",
			"The possible string value if the current object value."
		), ():void => {} );

	} );

	it( hasDefaultExport( "Carbon.RDF.Value.RDFValue" ), ():void => {
		let defaultExport:DefaultExport = <any> {};
		let defaultTarget:RDFValue;

		defaultTarget = defaultExport;
		expect( defaultTarget ).toEqual( jasmine.any( Object ) );
	} );

	describe( interfaze(
		"Carbon.RDF.Value.RDFValueFactory",
		"Interface with the utils for `Carbon.RDF.Value.RDFValue` objects."
	), ():void => {

		it( hasMethod(
			OBLIGATORY,
			"parse",
			"Returns the parsed object from an Literal, Node, or List.\n" +
			"Returns null if it cannot be parsed", [
				{ name: "pointerLibrary", type: "Carbon.Pointer.PointerLibrary" },
				{ name: "value", type: "Carbon.RDF.Literal.RDFLiteral | Carbon.RDF.Node.RDFNode | Carbon.RDF.List.RDFList | Carbon.RDF.Value.RDFValue | string" },
			],
			{ type: "any" }
		), ():void => {} );

	} );

	describe( property(
		STATIC,
		"RDFValue",
		"Carbon.RDF.Value.RDFValueFactory",
		"Class with useful functions to manage `Carbon.RDF.Value.RDFValue` objects."
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

			documentResource = RDFDocument.getDocumentResources( expandedObject )[ 0 ];
			pointerLibrary = PersistedDocument.create( context.documents, expandedObject[ "@id" ] );
		} );

		it( isDefined(), ():void => {
			expect( RDFValue ).toBeDefined();
			expect( RDFValue ).toEqual( jasmine.any( Object ) );
		} );

		// TODO: Separate in different tests
		it( "RDFValue.parse", ():void => {
			expect( RDFValue.parse ).toBeDefined();
			expect( Utils.isFunction( RDFValue.parse ) ).toBe( true );

			let value:RDFValue;

			value = documentResource[ "http://example.com/ns#string" ][ 0 ];
			result = RDFValue.parse( pointerLibrary, value  );
			expect( Utils.isString( result ) ).toBe( true );
			expect( result ).toBe( "a string" );

			value = documentResource[ "http://example.com/ns#date" ][ 0 ];
			result = RDFValue.parse( pointerLibrary, value  );
			expect( Utils.isDate( result ) ).toBe( true );
			expect( result ).toEqual( new Date( "2001-02-15T05:35:12.029Z" ) );

			value = documentResource[ "http://example.com/ns#pointer" ][ 0 ];
			result = RDFValue.parse( pointerLibrary, value  );
			expect( Pointer.is( result ) ).toBe( true );
			expect( result.id ).toBe( "http://example.com/pointer/1" );

			value = documentResource[ "http://example.com/ns#list" ][ 0 ];
			result = RDFValue.parse( pointerLibrary, value  );
			expect( Utils.isArray( result ) ).toBe( true );
			expect( result.length ).toBe( 3 );
			expect( result[ 0 ] ).toBe( 100 );
			expect( result[ 1 ] ).toEqual( new Date( "2001-02-15T05:35:12.029Z" ) );
			expect( Pointer.is( result[ 2 ] ) ).toBe( true );
			expect( result[ 2 ].id ).toBe( "http://example.com/pointer/1" );

			value = documentResource[ "http://example.com/ns#empty-property" ][ 0 ];
			result = RDFValue.parse( pointerLibrary, value  );
			expect( result ).toBeNull();
		} );

	} );

} );
