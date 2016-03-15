/// <reference path="./../../typings/typings.d.ts" />

import {
	STATIC,

	module,
	clazz,

	isDefined,
	hasMethod
} from "./../test/JasmineExtender";
import * as Utils from "./../Utils";
import * as Pointer from "./../Pointer";
import * as PersistedDocument from "./../PersistedDocument";
import * as RDFDocument from "./../RDF/Document";
import * as RDFList from "./../RDF/List";
import AbstractContext from "./../AbstractContext";
import * as XSD from "./../NS/XSD";

import * as Value from "./Value";

describe( module( "Carbon/RDF/Value" ), ():void => {

	it( isDefined(), ():void => {
		expect( Value ).toBeDefined();
		expect( Utils.isObject( Value ) ).toBe( true );
	});

	describe( clazz(
		"Carbon.RDF.Value.Util",
		"Class with useful functions for manage RDF Values."
	), ():void => {
		let expandedObject:any;
		let documentResource:any;
		let pointerLibrary:Pointer.Library;
		let result:any;
		let context:AbstractContext;

		beforeEach( ():void => {
			expandedObject = [{
				"@id": "http://example.com/resource/",
				"@graph": [
					{
						"@id": "http://example.com/resource/",
						"http://example.com/ns#string": [{
							"@value": "a string"
						}],
						"http://example.com/ns#integer": [{
							"@value": "100",
							"@type": "http://www.w3.org/2001/XMLSchema#integer"
						}],
						"http://example.com/ns#date": [{
							"@value": "2001-02-15T05:35:12.029Z",
							"@type": "http://www.w3.org/2001/XMLSchema#dateTime"
						}],
						"http://example.com/ns#pointer": [{
							"@id": "http://example.com/pointer/1",
							"@type": "@id"
						}],
						"http://example.com/ns#list": [{
							"@list": [{
								"@value": "100",
								"@type": "http://www.w3.org/2001/XMLSchema#integer"
							}, {
								"@value": "2001-02-15T05:35:12.029Z",
								"@type": "http://www.w3.org/2001/XMLSchema#dateTime"
							}, {
								"@id": "http://example.com/pointer/1",
								"@type": "@id"
							}]
						}],
						"http://example.com/ns#set": [{
							"@value": "100",
							"@type": "http://www.w3.org/2001/XMLSchema#integer"
						}, {
							"@value": "2001-02-15T05:35:12.029Z",
							"@type": "http://www.w3.org/2001/XMLSchema#dateTime"
						}, {
							"@id": "http://example.com/pointer/1",
							"@type": "@id"
						}],
						"http://example.com/ns#internationalString": [{
							"@value": "a string",
							"@language": "en",
							"@type": "http://www.w3.org/2001/XMLSchema#string"
						}, {
							"@value": "una cadena",
							"@language": "es"
						}, {
							"@value": "文字列",
							"@language": "ja"
						}],
						"http://example.com/ns#pointerSet": [
							{ "@id": "_:1" },
							{ "@id": "http://example.com/resource/#1" },
							{ "@id": "http://example.com/external-resource/" },
						],
						"http://example.com/ns#empty-property": [{}]
					},
					{
						"@id": "_:1",
						"http://example.com/ns#string": [{
							"@value": "Fragment 1"
						}],
						"http://example.com/ns#pointerSet": [
							{ "@id": "http://example.com/resource/" },
							{ "@id": "http://example.com/resource/#1" },
						],
					},
					{
						"@id": "http://example.com/resource/#1",
						"http://example.com/ns#string": [{
							"@value": "NamedFragment 1"
						}],
					},
				],
			}];

			class MockedContext extends AbstractContext {
				resolve( uri:string ):string {
					return uri;
				}
			}
			context = new MockedContext();

			documentResource = RDFDocument.Util.getDocumentResources( expandedObject )[ 0 ];
			pointerLibrary = PersistedDocument.Factory.create( expandedObject["@id"], context.documents );
		});

		it( isDefined(), ():void => {
			expect( Value.Util ).toBeDefined();
			expect( Utils.isFunction( Value.Util ) ).toBe( true );
		});

		it( hasMethod(
			STATIC,
			"areEqual",
			"Returns true if the two Values are considered equal.", [
				{ name: "value1", type: "Carbon.RDF.Value.Class" },
				{ name: "value2", type: "Carbon.RDF.Value.Class" }
			],
			{ type: "boolean" }
		), ():void => {
			expect( Value.Util.areEqual ).toBeDefined();
			expect( Utils.isFunction( Value.Util.areEqual ) ).toBe( true );

			let value1:Value.Class = undefined, value2:Value.Class = undefined;
			let result:boolean;

			result = Value.Util.areEqual( value1, value2 );
			expect( result ).toBe( false );

			value1 = {};
			value2 = {};
			result = Value.Util.areEqual( value1, value2 );
			expect( result ).toBe( false );

			// TODO wait implementation of `Carbon.RDF.Literal.Util.areEqual` function
		});

		it( hasMethod(
			STATIC,
			"getProperty",
			"Returns the property searched, parsed in accordance to the RDF object it is.\n" +
			"Returns null if the property is not found or cannot be parsed.", [
				{ name: "expandedObject", type: "any" },
				{ name: "propertyURI", type: "string" },
				{ name: "pointerLibrary", type: "Carbon.Pointer.Library" }
			],
			{ type: "any" }
		), ():void => {
			expect( Value.Util.getProperty ).toBeDefined();
			expect( Utils.isFunction( Value.Util.getProperty ) ).toBe( true );

			result = Value.Util.getProperty( documentResource, "http://example.com/ns#string", pointerLibrary );
			expect( Utils.isString( result ) ).toBe( true );
			expect( result ).toBe( "a string" );
			result = Value.Util.getProperty( documentResource, "http://example.com/ns#integer", pointerLibrary );
			expect( Utils.isNumber( result ) ).toBe( true );
			expect( result ).toBe( 100 );
			result = Value.Util.getProperty( documentResource, "http://example.com/ns#date", pointerLibrary );
			expect( Utils.isDate( result ) ).toBe( true );
			expect( result ).toEqual( new Date( "2001-02-15T05:35:12.029Z" ) );

			result = Value.Util.getProperty( documentResource, "http://example.com/ns#pointer", pointerLibrary );
			expect( Pointer.Factory.is( result ) ).toBe( true );
			expect( result.id ).toBe( "http://example.com/pointer/1" );
			expect( result.isResolved() ).toBe( false );


			result = Value.Util.getProperty( documentResource, "http://example.com/ns#list", pointerLibrary );
			expect( Utils.isArray( result ) ).toBe( true );
			expect( result.length ).toBe( 3 );
			expect( result[ 0 ] ).toBe( 100 );
			expect( result[ 1 ] ).toEqual( new Date( "2001-02-15T05:35:12.029Z" ) );
			expect( Pointer.Factory.is( result[ 2 ] ) ).toBe( true );
			expect( result[ 2 ].id ).toBe( "http://example.com/pointer/1" );

			result = Value.Util.getProperty( documentResource, "http://example.com/ns#set", pointerLibrary );
			expect( Utils.isNumber( result ) ).toBe( true );
			expect( result ).toBe( 100 );

			result = Value.Util.getProperty( documentResource, "http://example.com/ns#no-property", pointerLibrary );
			expect( result ).toBeNull();

			result = Value.Util.getProperty( documentResource, "http://example.com/ns#empty-property", pointerLibrary );
			expect( result ).toBeNull();
		});

		it( hasMethod(
			STATIC,
			"getPropertyPointer",
			"Returns the property searched as a Pointer.\n" +
			"Returns null if the property is not found or cannot be parsed as a Pointer.", [
				{ name: "expandedObject", type: "any" },
				{ name: "propertyURI", type: "string" },
				{ name: "pointerLibrary", type: "Carbon.Pointer.Library" }
			],
			{ type: "any" }
		), ():void => {
			expect( Value.Util.getPropertyPointer ).toBeDefined();
			expect( Utils.isFunction( Value.Util.getPropertyPointer ) ).toBe( true );

			let pointer:Pointer.Class;

			result = Value.Util.getPropertyPointer( documentResource, "http://example.com/ns#pointer", pointerLibrary );
			expect( Pointer.Factory.is( result ) ).toBe( true );
			expect( result.id ).toBe( "http://example.com/pointer/1" );

			result = Value.Util.getPropertyPointer( documentResource, "http://example.com/ns#pointerSet", pointerLibrary );
			expect( Pointer.Factory.is( result ) ).toBe( true );
			expect( result.id ).toBe( "_:1" );

			result = Value.Util.getPropertyPointer( documentResource, "http://example.com/ns#string", pointerLibrary );
			expect( result ).toBeNull();
			result = Value.Util.getPropertyPointer( documentResource, "http://example.com/ns#no-property", pointerLibrary );
			expect( result ).toBeNull();
			result = Value.Util.getPropertyPointer( documentResource, "http://example.com/ns#empty-property", pointerLibrary );
			expect( result ).toBeNull();
		});

		it( hasMethod(
			STATIC,
			"getPropertyLiteral",
			"Returns the property searched as a javascript variable. The property must be an RDF Literal.\n" +
			"Returns null if the property is not found, the type provided not match with the type of the Literal, or cannot be parsed from a Literal.", [
				{ name: "expandedObject", type: "any" },
				{ name: "propertyURI", type: "string" },
				{ name: "literalType", type: "string" }
			],
			{ type: "any" }
		), ():void => {
			expect( Value.Util.getPropertyLiteral ).toBeDefined();
			expect( Utils.isFunction( Value.Util.getPropertyLiteral ) ).toBe( true );

			result = Value.Util.getPropertyLiteral( documentResource, "http://example.com/ns#string", XSD.DataType.string );
			expect( Utils.isString( result ) ).toBe( true );
			expect( result ).toBe( "a string" );
			result = Value.Util.getPropertyLiteral( documentResource, "http://example.com/ns#integer", XSD.DataType.integer );
			expect( Utils.isNumber( result ) ).toBe( true );
			expect( result ).toBe( 100 );
			result = Value.Util.getPropertyLiteral( documentResource, "http://example.com/ns#date", XSD.DataType.dateTime );
			expect( Utils.isDate( result ) ).toBe( true );
			expect( result ).toEqual( new Date( "2001-02-15T05:35:12.029Z" ) );

			result = Value.Util.getPropertyLiteral( documentResource, "http://example.com/ns#no-property", XSD.DataType.string );
			expect( result ).toBeNull();
			result = Value.Util.getPropertyLiteral( documentResource, "http://example.com/ns#date", XSD.DataType.float );
			expect( result ).toBeNull();
			result = Value.Util.getPropertyLiteral( documentResource, "http://example.com/ns#pointer", XSD.DataType.string );
			expect( result ).toBeNull();
			result = Value.Util.getPropertyLiteral( documentResource, "http://example.com/ns#empty-property", XSD.DataType.object );
			expect( result ).toBeNull();
		});

		it( hasMethod(
			STATIC,
			"getPropertyList",
			"Returns the property searched as an Array with every element parsed to its respective type of element.\n" +
			"Returns null if the property is not found or cannot be parsed.", [
				{ name: "expandedObject", type: "any" },
				{ name: "propertyURI", type: "string" },
				{ name: "pointerLibrary", type: "Carbon.Pointer.Library" }
			],
			{ type: "any" }
		), ():void => {
			expect( Value.Util.getPropertyList ).toBeDefined();
			expect( Utils.isFunction( Value.Util.getPropertyList ) ).toBe( true );

			result = Value.Util.getPropertyList( documentResource, "http://example.com/ns#list", pointerLibrary );
			expect( Utils.isArray( result ) ).toBe( true );
			expect( result.length ).toBe( 3 );
			expect( result[ 0 ] ).toBe( 100 );
			expect( result[ 1 ] ).toEqual( new Date( "2001-02-15T05:35:12.029Z" ) );
			expect( Pointer.Factory.is( result[ 2 ] ) ).toBe( true );
			expect( result[ 2 ].id ).toBe( "http://example.com/pointer/1" );

			result = Value.Util.getPropertyList( documentResource, "http://example.com/ns#no-property", pointerLibrary );
			expect( result ).toBeNull();
			result = Value.Util.getPropertyList( documentResource, "http://example.com/ns#string", pointerLibrary );
			expect( result ).toBeNull();
		});

		it( hasMethod(
			STATIC,
			"getPropertyPointerList",
			"Returns the property list searched as an Array of Pointers. It will be filtered no pointer values.\n" +
			"Returns null if the property is not found or is not a List.", [
				{ name: "expandedObject", type: "any" },
				{ name: "propertyURI", type: "string" },
				{ name: "pointerLibrary", type: "Carbon.Pointer.Library" }
			],
			{ type: "any" }
		), ():void => {
			expect( Value.Util.getPropertyPointerList ).toBeDefined();
			expect( Utils.isFunction( Value.Util.getPropertyPointerList ) ).toBe( true );

			result = Value.Util.getPropertyPointerList( documentResource, "http://example.com/ns#list", pointerLibrary );
			expect( Utils.isArray( result ) ).toBe( true );
			expect( result.length ).toBe( 1 );
			expect( Pointer.Factory.is( result[ 0 ] ) ).toBe( true );
			expect( result[ 0 ].id ).toBe( "http://example.com/pointer/1" );

			result = Value.Util.getPropertyPointerList( documentResource, "http://example.com/ns#no-property", pointerLibrary );
			expect( result ).toBeNull();
			result = Value.Util.getPropertyPointerList( documentResource, "http://example.com/ns#string", pointerLibrary );
			expect( result ).toBeNull();
			result = Value.Util.getPropertyPointerList( documentResource, "http://example.com/ns#empty-property", pointerLibrary );
			expect( result ).toBeNull();
		});

		it( hasMethod(
			STATIC,
			"getPropertyLiteralList",
			"Returns the property list searched as an Array of parsed Literals. It will be filtered no Literal values with the type specified.\n" +
			"Returns null if the property is not found or is not a List.", [
				{ name: "expandedObject", type: "any" },
				{ name: "propertyURI", type: "string" },
				{ name: "pointerLibrary", type: "Carbon.Pointer.Library" }
			],
			{ type: "any" }
		), ():void => {
			expect( Value.Util.getPropertyLiteralList ).toBeDefined();
			expect( Utils.isFunction( Value.Util.getPropertyLiteralList ) ).toBe( true );

			result = Value.Util.getPropertyLiteralList( documentResource, "http://example.com/ns#list", XSD.DataType.integer );
			expect( Utils.isArray( result ) ).toBe( true );
			expect( result.length ).toBe( 1 );
			expect( result[ 0 ] ).toBe( 100 );

			result = Value.Util.getPropertyLiteralList( documentResource, "http://example.com/ns#no-property", XSD.DataType.integer );
			expect( result ).toBeNull();
			result = Value.Util.getPropertyLiteralList( documentResource, "http://example.com/ns#string", XSD.DataType.integer );
			expect( result ).toBeNull();
			result = Value.Util.getPropertyLiteralList( documentResource, "http://example.com/ns#empty-property", XSD.DataType.object );
			expect( result ).toBeNull();
		});

		it( hasMethod(
			STATIC,
			"getProperties",
			"Returns the property searched as an Array with the parsed Literal, Pointer or List.\n" +
			"Returns null if the property is not found, or an empty array if cannot be parsed.", [
				{ name: "expandedObject", type: "any" },
				{ name: "propertyURI", type: "string" },
				{ name: "pointerLibrary", type: "Carbon.Pointer.Library" }
			],
			{ type: "any" }
		), ():void => {
			expect( Value.Util.getProperties ).toBeDefined();
			expect( Utils.isFunction( Value.Util.getProperties ) ).toBe( true );

			result = Value.Util.getProperties( documentResource, "http://example.com/ns#string", pointerLibrary );
			expect( Utils.isArray( result ) ).toBe( true );
			expect( result.length ).toBe( 1 );
			expect( Utils.isString( result[ 0 ] ) ).toBe( true );
			expect( result[ 0 ] ).toBe( "a string" );

			result = Value.Util.getProperties( documentResource, "http://example.com/ns#integer", pointerLibrary );
			expect( Utils.isArray( result ) ).toBe( true );
			expect( result.length ).toBe( 1 );
			expect( Utils.isNumber( result[ 0 ] ) ).toBe( true );
			expect( result[ 0 ] ).toBe( 100 );

			result = Value.Util.getProperties( documentResource, "http://example.com/ns#date", pointerLibrary );
			expect( Utils.isArray( result ) ).toBe( true );
			expect( result.length ).toBe( 1 );
			expect( Utils.isDate( result[ 0 ] ) ).toBe( true );
			expect( result[ 0 ] ).toEqual( new Date( "2001-02-15T05:35:12.029Z" ) );

			result = Value.Util.getProperties( documentResource, "http://example.com/ns#pointer", pointerLibrary );
			expect( Utils.isArray( result ) ).toBe( true );
			expect( result.length ).toBe( 1 );
			expect( Pointer.Factory.is( result[ 0 ] ) ).toBe( true );
			expect( result[ 0 ].id ).toBe( "http://example.com/pointer/1" );

			result = Value.Util.getProperties( documentResource, "http://example.com/ns#list", pointerLibrary );
			expect( Utils.isArray( result ) ).toBe( true );
			expect( result.length ).toBe( 1 );
			expect( Utils.isArray( result[ 0 ] ) ).toBe( true );
			expect( result[ 0 ].length ).toBe( 3 );
			expect( result[ 0 ][ 0 ] ).toBe( 100 );
			expect( result[ 0 ][ 1 ] ).toEqual( new Date( "2001-02-15T05:35:12.029Z" ) );
			expect( Pointer.Factory.is( result[ 0 ][ 2 ] ) ).toBe( true );
			expect( result[ 0 ][ 2 ].id ).toBe( "http://example.com/pointer/1" );

			result = Value.Util.getProperties( documentResource, "http://example.com/ns#pointerSet", pointerLibrary );
			expect( Utils.isArray( result ) ).toBe( true );
			expect( result.length ).toBe( 3 );
			expect( Pointer.Factory.is( result[ 0 ] ) ).toBe( true );
			expect( result[ 0 ].id ).toBe( "_:1" );
			expect( Pointer.Factory.is( result[ 1 ] ) ).toBe( true );
			expect( result[ 1 ].id ).toBe( "http://example.com/resource/#1" );
			expect( Pointer.Factory.is( result[ 2 ] ) ).toBe( true );
			expect( result[ 2 ].id ).toBe( "http://example.com/external-resource/" );

			result = Value.Util.getProperties( documentResource, "http://example.com/ns#empty-property", pointerLibrary );
			expect( Utils.isArray( result ) ).toBe( true );
			expect( result.length ).toBe( 0 );

			result = Value.Util.getProperties( documentResource, "http://example.com/ns#no-property", pointerLibrary );
			expect( result ).toBeNull();
		});

		it( hasMethod(
			STATIC,
			"getPropertyPointers",
			"Returns the property searched as an Array with the parsed Pointer.\n" +
			"Returns null if the property is not found, or an empty array if the property cannot be parsed as a pointer.", [
				{ name: "expandedObject", type: "any" },
				{ name: "propertyURI", type: "string" },
				{ name: "pointerLibrary", type: "Carbon.Pointer.Library" }
			],
			{ type: "any" }
		), ():void => {
			expect( Value.Util.getPropertyPointers ).toBeDefined();
			expect( Utils.isFunction( Value.Util.getPropertyPointers ) ).toBe( true );

			result = Value.Util.getPropertyPointers( documentResource, "http://example.com/ns#pointer", pointerLibrary );
			expect( Utils.isArray( result ) ).toBe( true );
			expect( result.length ).toBe( 1 );
			expect( Pointer.Factory.is( result[ 0 ] ) ).toBe( true );
			expect( result[ 0 ].id ).toBe( "http://example.com/pointer/1" );

			result = Value.Util.getPropertyPointers( documentResource, "http://example.com/ns#pointerSet", pointerLibrary );
			expect( Utils.isArray( result ) ).toBe( true );
			expect( result.length ).toBe( 3 );
			expect( Pointer.Factory.is( result[ 0 ] ) ).toBe( true );
			expect( result[ 0 ].id ).toBe( "_:1" );
			expect( Pointer.Factory.is( result[ 1 ] ) ).toBe( true );
			expect( result[ 1 ].id ).toBe( "http://example.com/resource/#1" );
			expect( Pointer.Factory.is( result[ 2 ] ) ).toBe( true );
			expect( result[ 2 ].id ).toBe( "http://example.com/external-resource/" );

			result = Value.Util.getPropertyPointers( documentResource, "http://example.com/ns#string", pointerLibrary );
			expect( Utils.isArray( result ) ).toBe( true );
			expect( result.length ).toBe( 0 );
			result = Value.Util.getPropertyPointers( documentResource, "http://example.com/ns#empty-property", pointerLibrary );
			expect( Utils.isArray( result ) ).toBe( true );
			expect( result.length ).toBe( 0 );

			result = Value.Util.getPropertyPointers( documentResource, "http://example.com/ns#no-property", pointerLibrary );
			expect( result ).toBeNull();
		});

		it( hasMethod(
			STATIC,
			"getPropertyURIs",
			"Returns the URIs of the property searched.\n" +
			"Returns null if the property is not found or an empty array if no URI was found.", [
				{ name: "expandedObject", type: "any" },
				{ name: "propertyURI", type: "string" }
			],
			{ type: "any" }
		), ():void => {
			expect( Value.Util.getPropertyURIs ).toBeDefined();
			expect( Utils.isFunction( Value.Util.getPropertyURIs ) ).toBe( true );

			result = Value.Util.getPropertyURIs( documentResource, "http://example.com/ns#pointer" );
			expect( Utils.isArray( result ) ).toBe( true );
			expect( result.length ).toBe( 1 );
			expect( result[ 0 ] ).toBe( "http://example.com/pointer/1" );

			result = Value.Util.getPropertyURIs( documentResource, "http://example.com/ns#pointerSet" );
			expect( Utils.isArray( result ) ).toBe( true );
			expect( result.length ).toBe( 3 );
			expect( result[ 0 ] ).toBe( "_:1" );
			expect( result[ 1 ] ).toBe( "http://example.com/resource/#1" );
			expect( result[ 2 ] ).toBe( "http://example.com/external-resource/" );

			result = Value.Util.getPropertyURIs( documentResource, "http://example.com/ns#string" );
			expect( Utils.isArray( result ) ).toBe( true );
			expect( result.length ).toBe( 0 );

			result = Value.Util.getPropertyURIs( documentResource, "http://example.com/ns#integer" );
			expect( Utils.isArray( result ) ).toBe( true );
			expect( result.length ).toBe( 0 );

			result = Value.Util.getPropertyURIs( documentResource, "http://example.com/ns#list" );
			expect( Utils.isArray( result ) ).toBe( true );
			expect( result.length ).toBe( 0 );

			result = Value.Util.getPropertyURIs( documentResource, "http://example.com/ns#empty-property" );
			expect( Utils.isArray( result ) ).toBe( true );
			expect( result.length ).toBe( 0 );

			result = Value.Util.getPropertyURIs( documentResource, "http://example.com/ns#no-property" );
			expect( result ).toBeNull();
		});

		it( hasMethod(
			STATIC,
			"getPropertyLiterals",
			"Returns the property searched as an Array with the parsed Literal.\n" +
			"Returns null if the property is not found, or an empty array if cannot be parsed.", [
				{ name: "expandedObject", type: "any" },
				{ name: "propertyURI", type: "string" },
				{ name: "literalType", type: "string" }
			],
			{ type: "any" }
		), ():void => {
			expect( Value.Util.getPropertyLiterals ).toBeDefined();
			expect( Utils.isFunction( Value.Util.getPropertyLiterals ) ).toBe( true );

			result = Value.Util.getPropertyLiterals( documentResource, "http://example.com/ns#string", XSD.DataType.string );
			expect( Utils.isArray( result ) ).toBe( true );
			expect( result.length ).toBe( 1 );
			expect( Utils.isString( result[ 0 ] ) ).toBe( true );
			expect( result[ 0 ] ).toBe( "a string" );

			result = Value.Util.getPropertyLiterals( documentResource, "http://example.com/ns#integer", XSD.DataType.integer );
			expect( Utils.isArray( result ) ).toBe( true );
			expect( result.length ).toBe( 1 );
			expect( Utils.isNumber( result[ 0 ] ) ).toBe( true );
			expect( result[ 0 ] ).toBe( 100 );

			result = Value.Util.getPropertyLiterals( documentResource, "http://example.com/ns#date", XSD.DataType.dateTime );
			expect( Utils.isArray( result ) ).toBe( true );
			expect( result.length ).toBe( 1 );
			expect( Utils.isDate( result[ 0 ] ) ).toBe( true );
			expect( result[ 0 ] ).toEqual( new Date( "2001-02-15T05:35:12.029Z" ) );

			result = Value.Util.getPropertyLiterals( documentResource, "http://example.com/ns#set", XSD.DataType.integer );
			expect( Utils.isArray( result ) ).toBe( true );
			expect( result.length ).toBe( 1 );
			expect( Utils.isNumber( result[ 0 ] ) ).toBe( true );
			expect( result[ 0 ] ).toEqual( 100 );

			result = Value.Util.getPropertyLiterals( documentResource, "http://example.com/ns#date", XSD.DataType.float );
			expect( Utils.isArray( result ) ).toBe( true );
			expect( result.length ).toBe( 0 );

			result = Value.Util.getPropertyLiterals( documentResource, "http://example.com/ns#pointer", XSD.DataType.string );
			expect( Utils.isArray( result ) ).toBe( true );
			expect( result.length ).toBe( 0 );

			result = Value.Util.getPropertyLiterals( documentResource, "http://example.com/ns#list", XSD.DataType.integer );
			expect( Utils.isArray( result ) ).toBe( true );
			expect( result.length ).toBe( 0 );

			result = Value.Util.getPropertyLiterals( documentResource, "http://example.com/ns#empty-property", XSD.DataType.object );
			expect( Utils.isArray( result ) ).toBe( true );
			expect( result.length ).toBe( 0 );

			result = Value.Util.getPropertyLiterals( documentResource, "http://example.com/ns#no-property", XSD.DataType.string );
			expect( result ).toBeNull();
		});

		it( hasMethod(
			STATIC,
			"getPropertyLanguageMap",
			"Returns an object associating the language with the parsed string literal.\n" +
			"Returns null if the property is not found, or an empty object if not is a property with language.", [
				{ name: "expandedObject", type: "any" },
				{ name: "propertyURI", type: "string" },
				{ name: "pointerLibrary", type: "Carbon.Pointer.Library" }
			],
			{ type: "any" }
		), ():void => {
			expect( Value.Util.getPropertyLanguageMap ).toBeDefined();
			expect( Utils.isFunction( Value.Util.getPropertyLanguageMap ) ).toBe( true );

			result = Value.Util.getPropertyLanguageMap( documentResource, "http://example.com/ns#internationalString" );
			expect( Utils.isObject( result ) ).toBe( true );
			expect( Utils.hasProperty( result, "en" ) ).toBe( true );
			expect( result[ "en" ] ).toBe( "a string" );
			expect( Utils.hasProperty( result, "es" ) ).toBe( true );
			expect( result[ "es" ] ).toBe( "una cadena" );
			expect( Utils.hasProperty( result, "ja" ) ).toBe( true );
			expect( result[ "ja" ] ).toBe( "文字列" );

			result = Value.Util.getPropertyLanguageMap( documentResource, "http://example.com/ns#string" );
			expect( Utils.isObject( result ) ).toBe( true );
			expect( result ).toEqual( {} );

			result = Value.Util.getPropertyLanguageMap( documentResource, "http://example.com/ns#empty-property" );
			expect( Utils.isObject( result ) ).toBe( true );
			expect( result ).toEqual( {} );

			result = Value.Util.getPropertyLanguageMap( documentResource, "http://example.com/ns#no-property" );
			expect( result ).toBeNull();
		});

		it( hasMethod(
			STATIC,
			"getList",
			"Returns the List object from the provided property of an expanded JSON-LD object.\n" +
			"Returns null if no List object is found.", [
				{ name: "propertyValues", type: "Array<any>" }
			],
			{ type: "Carbon.RDF.List.Class" }
		), ():void => {
			expect( Value.Util.getList ).toBeDefined();
			expect( Utils.isFunction( Value.Util.getList ) ).toBe( true );

			result = Value.Util.getList( documentResource[ "http://example.com/ns#list" ] );
			expect( RDFList.Factory.is( result ) ).toBe( true );

			result = Value.Util.getList( documentResource[ "http://example.com/ns#set" ] );
			expect( result ).toBeNull();
			result = Value.Util.getList( documentResource[ "http://example.com/ns#string" ] );
			expect( result ).toBeNull();
		});

		it( hasMethod(
			STATIC,
			"parseValue",
			"Returns the parsed object from an Literal, Node, or List.\n" +
			"Returns null if cannot be parsed", [
				{ name: "propertyValue", type: "Carbon.RDF.Value.Class" },
				{ name: "pointerLibrary", type: "Carbon.Pointer.Library" }
			],
			{ type: "any" }
		), ():void => {
			expect( Value.Util.parseValue ).toBeDefined();
			expect( Utils.isFunction( Value.Util.parseValue ) ).toBe( true );

			let property:Value.Class;

			property = documentResource[ "http://example.com/ns#string" ][ 0 ];
			result = Value.Util.parseValue( property, pointerLibrary );
			expect( Utils.isString( result ) ).toBe( true );
			expect( result ).toBe( "a string" );

			property = documentResource[ "http://example.com/ns#date" ][ 0 ];
			result = Value.Util.parseValue(property, pointerLibrary );
			expect( Utils.isDate( result ) ).toBe( true );
			expect( result ).toEqual( new Date( "2001-02-15T05:35:12.029Z" ) );

			property = documentResource[ "http://example.com/ns#pointer" ][ 0 ];
			result = Value.Util.parseValue( property, pointerLibrary );
			expect( Pointer.Factory.is( result ) ).toBe( true );
			expect( result.id ).toBe( "http://example.com/pointer/1" );

			property = documentResource[ "http://example.com/ns#list" ][ 0 ];
			result = Value.Util.parseValue( property, pointerLibrary );
			expect( Utils.isArray( result ) ).toBe( true );
			expect( result.length ).toBe( 3 );
			expect( result[ 0 ] ).toBe( 100 );
			expect( result[ 1 ] ).toEqual( new Date( "2001-02-15T05:35:12.029Z" ) );
			expect( Pointer.Factory.is( result[ 2 ] ) ).toBe( true );
			expect( result[ 2 ].id ).toBe( "http://example.com/pointer/1" );

			property = documentResource[ "http://example.com/ns#empty-property" ][ 0 ];
			result = Value.Util.parseValue( property, pointerLibrary );
			expect( result ).toBeNull();
		});

	});

});
