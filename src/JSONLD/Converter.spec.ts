import {
	clazz,
	hasConstructor,
	hasDefaultExport,
	hasProperty,
	hasSignature,
	INSTANCE,
	isDefined,
	method,
	module,
} from "../test/JasmineExtender";

import * as Utils from "../Utils";
import * as NS from "./../NS";
import * as ObjectSchema from "./../ObjectSchema";
import * as Pointer from "./../Pointer";
import * as RDF from "./../RDF";

import * as JSONLDConverter from "./Converter";
import DefaultExport from "./Converter";

describe( module( "Carbon/JSONLD/Converter" ), ():void => {

	it( isDefined(), ():void => {
		expect( JSONLDConverter ).toBeDefined();
		expect( Utils.isObject( JSONLDConverter ) ).toEqual( true );
	} );

	describe( clazz( "Carbon.JSONLD.Converter.Class", "Class that have methods for convert expanded JSON-LD objects to compacted Carbon SDK Resources and vice versa." ), ():void => {

		it( isDefined(), ():void => {
			expect( JSONLDConverter.Class ).toBeDefined();
			expect( Utils.isFunction( JSONLDConverter.Class ) ).toEqual( true );
		} );

		it( hasConstructor( [
			{ name: "literalSerializers", type: "Map<string, Carbon.RDF.Literal.Serializer>", optional: true, description: "A Map object with the data type serializers that the converter will only be able to handle." },
		] ), ():void => {
			let jsonldConverter:JSONLDConverter.Class;

			jsonldConverter = new JSONLDConverter.Class();
			expect( jsonldConverter ).toBeTruthy();
			expect( jsonldConverter instanceof JSONLDConverter.Class ).toBe( true );

			let customSerializers:Map<string, RDF.Literal.Serializer> = new Map();
			customSerializers.set( "http://example.com/ns#my-custom-type", <any> {} );

			jsonldConverter = new JSONLDConverter.Class( customSerializers );
			expect( jsonldConverter ).toBeTruthy();
			expect( jsonldConverter instanceof JSONLDConverter.Class ).toBe( true );
		} );

		it( hasProperty(
			INSTANCE,
			"literalSerializers",
			"Map<string, Carbon.RDF.Literal.Serializer>",
			"A Map object with data-type/serializer pairs for stringify the data of a SDK Resource when expanding it."
		), ():void => {
			let jsonldConverter:JSONLDConverter.Class;
			let serializers:Map<string, RDF.Literal.Serializer>;

			jsonldConverter = new JSONLDConverter.Class();
			serializers = jsonldConverter.literalSerializers;
			expect( serializers.size ).toBeGreaterThan( 1 );

			let customSerializers:Map<string, RDF.Literal.Serializer> = new Map();
			customSerializers.set( "http://example.com/ns#my-custom-type", <any> {} );

			jsonldConverter = new JSONLDConverter.Class( customSerializers );
			serializers = jsonldConverter.literalSerializers;
			expect( serializers.size ).toBe( 1 );
		} );

		describe( method( INSTANCE, "compact" ), ():void => {

			it( hasSignature(
				"Assign the data of the expanded JSON-LD object, to the target object in a friendly mode, ie. without the JSON-LD Syntax Tokens and parsed values, in accordance to the schema provided.", [
					{ name: "expandedObject", type: "Object", description: "The JSON-LD object to compact." },
					{ name: "targetObject", type: "Object", description: "The target object where will be added the data of the expanded object." },
					{ name: "digestedSchema", type: "Carbon.ObjectSchema.DigestedObjectSchema", description: "The schema that describes how compact the expanded object." },
					{ name: "pointerLibrary", type: "Carbon.Pointer.Library", description: "An object from where one can obtain pointers to SDK Resources." },
				],
				{ type: "Object", description: "The compacted target object." }
			), ():void => {
				let jsonldConverter:JSONLDConverter.Class = new JSONLDConverter.Class();

				expect( jsonldConverter.compact ).toBeDefined();
				expect( Utils.isFunction( jsonldConverter.compact ) ).toBeDefined();

				let expandedObject:any = {
					"@id": "http://example.com/expandedObject/",
					"http://example.com/ns#string": [
						{ "@value": "some-string", "@type": "http://www.w3.org/2001/XMLSchema#string" },
					],
					"http://example.com/ns#date": [
						{ "@value": "2015-12-04T23:06:57.920Z", "@type": "http://www.w3.org/2001/XMLSchema#dateTime" },
					],
					"http://example.com/ns#numberList": [
						{
							"@list": [
								{ "@value": "2", "@type": "http://www.w3.org/2001/XMLSchema#integer" },
								{ "@value": "3", "@type": "http://www.w3.org/2001/XMLSchema#integer" },
								{ "@value": "4", "@type": "http://www.w3.org/2001/XMLSchema#integer" },
								{ "@value": "5", "@type": "http://www.w3.org/2001/XMLSchema#integer" },
								{ "@value": "6", "@type": "http://www.w3.org/2001/XMLSchema#integer" },
							],
						},
					],
					"http://example.com/ns#languageMap": [
						{ "@value": "español", "@type": "http://www.w3.org/2001/XMLSchema#string", "@language": "es" },
						{ "@value": "english", "@type": "http://www.w3.org/2001/XMLSchema#string", "@language": "en" },
						{ "@value": "日本語", "@language": "ja" },
					],
					"http://example.com/ns#pointer": [
						{ "@id": "http://example.com/pointer/" },
					],
					"http://example.com/ns#pointerList": [
						{
							"@list": [
								{ "@id": "http://example.com/pointer-1/" },
								{ "@id": "http://example.com/pointer-2/" },
								{ "@id": "http://example.com/pointer-3/" },
							],
						},
					],
					"http://example.com/ns#pointerSet": [
						{ "@id": "http://example.com/pointer-1/" },
						{ "@id": "http://example.com/pointer-2/" },
						{ "@id": "http://example.com/pointer-3/" },
					],
					"http://example.com/my-vocabulary#elementWithoutID": [
						{ "@value": "One element in a set" },
					],
					"http://example.com/my-vocabulary#relative-at-id": [
						{ "@value": "Property without an absolute @id" },
					],
				};

				let schema:ObjectSchema.Class = {
					"@vocab": "http://example.com/my-vocabulary#",
					"ex": "http://example.com/ns#",
					"xsd": "http://www.w3.org/2001/XMLSchema#",
					"string": {
						"@id": "ex:string",
						"@type": "xsd:string",
					},
					"date": {
						"@id": "ex:date",
						"@type": "xsd:dateTime",
					},
					"numberList": {
						"@id": "ex:numberList",
						"@type": "xsd:integer",
						"@container": "@list",
					},
					"languageMap": {
						"@id": "ex:languageMap",
						"@container": "@language",
					},
					"pointer": {
						"@id": "ex:pointer",
						"@type": "@id",
					},
					"pointerList": {
						"@id": "ex:pointerList",
						"@type": "@id",
						"@container": "@list",
					},
					"pointerSet": {
						"@id": "ex:pointerSet",
						"@type": "@id",
						"@container": "@set",
					},
					"elementWithoutID": {
						"@type": "xsd:string",
						"@container": "@set",
					},
					"relative@id": {
						"@id": "relative-at-id",
						"@container": "@set",
					},
				};

				let mockedPointerLibrary:Pointer.Library = {
					hasPointer: ( id:string ):boolean => {
						return true;
					},
					getPointer: ( id:string ):Pointer.Class => {
						let pointer:Pointer.Class = Pointer.Factory.create( id );
						pointer._resolved = true;
						return pointer;
					},
				};

				let compactedObject:any = {};
				let digestedSchema:ObjectSchema.DigestedObjectSchema = ObjectSchema.Digester.digestSchema( schema );

				expect( jsonldConverter.compact ).toBeDefined();
				expect( Utils.isFunction( jsonldConverter.compact ) ).toBeDefined();

				jsonldConverter.compact( expandedObject, compactedObject, digestedSchema, mockedPointerLibrary );

				expect( compactedObject ).toBeDefined();
				expect( Utils.isObject( compactedObject ) ).toEqual( true );

				expect( Utils.hasProperty( compactedObject, "string" ) ).toEqual( true );
				expect( compactedObject.string ).toEqual( "some-string" );

				expect( Utils.hasProperty( compactedObject, "date" ) ).toEqual( true );
				expect( Utils.isDate( compactedObject.date ) ).toEqual( true );

				expect( Utils.hasProperty( compactedObject, "numberList" ) ).toEqual( true );
				expect( Utils.isArray( compactedObject.numberList ) ).toEqual( true );
				expect( compactedObject.numberList.length ).toEqual( 5 );
				expect( compactedObject.numberList[ 0 ] ).toEqual( 2 );
				expect( compactedObject.numberList[ 1 ] ).toEqual( 3 );
				expect( compactedObject.numberList[ 2 ] ).toEqual( 4 );
				expect( compactedObject.numberList[ 3 ] ).toEqual( 5 );
				expect( compactedObject.numberList[ 4 ] ).toEqual( 6 );

				expect( Utils.hasProperty( compactedObject, "languageMap" ) ).toEqual( true );
				expect( Utils.isObject( compactedObject.languageMap ) ).toEqual( true );
				expect( compactedObject.languageMap.es ).toEqual( "español" );
				expect( compactedObject.languageMap.en ).toEqual( "english" );
				expect( compactedObject.languageMap.ja ).toEqual( "日本語" );

				expect( Utils.hasProperty( compactedObject, "pointer" ) ).toEqual( true );
				expect( Utils.isObject( compactedObject.pointer ) ).toEqual( true );
				expect( compactedObject.pointer.id ).toEqual( "http://example.com/pointer/" );

				expect( Utils.hasProperty( compactedObject, "pointerList" ) ).toEqual( true );
				expect( Utils.isArray( compactedObject.pointerList ) ).toEqual( true );
				expect( compactedObject.pointerList.length ).toEqual( 3 );
				expect( compactedObject.pointerList[ 0 ].id ).toEqual( "http://example.com/pointer-1/" );
				expect( compactedObject.pointerList[ 1 ].id ).toEqual( "http://example.com/pointer-2/" );
				expect( compactedObject.pointerList[ 2 ].id ).toEqual( "http://example.com/pointer-3/" );

				expect( Utils.hasProperty( compactedObject, "pointerSet" ) ).toEqual( true );
				expect( Utils.isArray( compactedObject.pointerSet ) ).toEqual( true );
				expect( compactedObject.pointerSet.length ).toEqual( 3 );
				expect( compactedObject.pointerSet[ 0 ].id ).toEqual( "http://example.com/pointer-1/" );
				expect( compactedObject.pointerSet[ 1 ].id ).toEqual( "http://example.com/pointer-2/" );
				expect( compactedObject.pointerSet[ 2 ].id ).toEqual( "http://example.com/pointer-3/" );

				expect( Utils.hasProperty( compactedObject, "elementWithoutID" ) ).toBe( true );
				expect( Utils.isArray( compactedObject.elementWithoutID ) ).toBe( true );
				expect( compactedObject.elementWithoutID.length ).toBe( 1 );
				expect( compactedObject.elementWithoutID[ 0 ] ).toBe( "One element in a set" );

				expect( Utils.hasProperty( compactedObject, "relative@id" ) ).toBe( true );
				expect( Utils.isArray( compactedObject[ "relative@id" ] ) ).toBe( true );
				expect( compactedObject[ "relative@id" ].length ).toBe( 1 );
				expect( compactedObject[ "relative@id" ][ 0 ] ).toBe( "Property without an absolute @id" );
			} );
		} );

		describe( method( INSTANCE, "expand" ), ():void => {


			it( hasSignature(
				"Creates a expanded JSON-LD object from the compacted object in accordance to the schema provided.", [
					{ name: "compactedObject", type: "Object", description: "The compacted object to generate its expanded JSON-LD object." },
					{ name: "digestedSchema", type: "Carbon.ObjectSchema.DigestedObjectSchema", description: "The schema that describes how construct the expanded object." },
				],
				{ type: "Object", description: "The expanded JSON-LD object generated." }
			), ():void => {
				let jsonldConverter:JSONLDConverter.Class = new JSONLDConverter.Class();

				expect( jsonldConverter.compact ).toBeDefined();
				expect( Utils.isFunction( jsonldConverter.compact ) ).toBeDefined();

				let generalSchema:ObjectSchema.Class = {
					"@vocab": "http://example.com/my-vocabulary#",
					"ex": "http://example.com/ns#",
					"xsd": "http://www.w3.org/2001/XMLSchema#",
					"propertyInGeneral": {
						"@id": "ex:property-in-general",
						"@type": "@id",
					},
				};

				let schemas:ObjectSchema.Class[] = [ {
					"@vocab": "http://example.com/my-vocabulary#",
					"ex": "http://example.com/ns#",
					"xsd": "http://www.w3.org/2001/XMLSchema#",
					"another": "http://example.com/another-namespace#",
					"string": {
						"@id": "ex:string",
						"@type": "xsd:string",
					},
					"date": {
						"@id": "ex:date",
						"@type": "xsd:dateTime",
					},
					"numberList": {
						"@id": "ex:numberList",
						"@type": "xsd:integer",
						"@container": "@list",
					},
					"languageMap": {
						"@id": "ex:languageMap",
						"@container": "@language",
					},
					"pointer": {
						"@id": "ex:pointer",
						"@type": "@id",
					},
					"pointerList": {
						"@id": "ex:pointerList",
						"@type": "@id",
						"@container": "@list",
					},
					"pointerSet": {
						"@id": "ex:pointerSet",
						"@type": "@id",
						"@container": "@set",
					},
					"unknownTypeLiteral": {
						"@id": "ex:unknownTypeLiteral",
					},
					"unknownTypeArray": {
						"@id": "ex:unknownTypeArray",
						"@container": "@set",
					},
					"unknownTypePointer": {
						"@id": "ex:unknownTypePointer",
					},
					"anotherPrefixedPointer": {
						"@id": "ex:another-prefixed-pointer",
						"@type": "@id",
					},
					"anotherPointerInSchema": {
						"@id": "ex:another-pointer-in-schema",
						"@type": "@id",
					},
					"vocabPointer": {
						"@id": "ex:vocab-pointer",
						"@type": "@id",
					},
					"relativePointer": {
						"@id": "ex:relative-pointer",
						"@type": "@id",
					},
				}, {
					"xsd": "http://www.w3.org/2001/XMLSchema#",
					"elementWithoutID": {
						"@type": "xsd:string",
						"@container": "@set",
					},
					"relative@id": {
						"@id": "relative-at-id",
						"@container": "@set",
					},
				} ];

				let compactedObject:any = {
					"id": "http://example.com/compactedObject/",
					"types": [
						"http://example.com/ns#MyType",
						"ex:Another-Type",
						"another:Another-Namespace-Type",
						"Another-Another-Type",
						"http://example.com/ns#Type-1",
						"http://example.com/ns#Type-2",
					],
					"string": "Some string",
					"date": new Date( "2015-12-04T23:06:57.920Z" ),
					"numberList": [ 2, 3, 4, 5, 6, ],
					"languageMap": {
						"es": "español",
						"en": "english",
						"ja": "日本語",
					},
					"pointer": Pointer.Factory.create( "http://example.com/pointer/" ),
					"pointerList": [
						Pointer.Factory.create( "http://example.com/pointer-1/" ),
						Pointer.Factory.create( "http://example.com/pointer-2/" ),
						Pointer.Factory.create( "http://example.com/pointer-3/" ),
					],
					"pointerSet": [
						Pointer.Factory.create( "http://example.com/pointer-1/" ),
						Pointer.Factory.create( "http://example.com/pointer-2/" ),
						Pointer.Factory.create( "http://example.com/pointer-3/" ),
					],
					"unknownTypeLiteral": 1,
					"unknownTypeArray": [
						1.12,
						false,
						new Date( "2015-12-04T23:06:57.920Z" ),
						"Some string",
						function():void {},
						Pointer.Factory.create( "http://example.com/pointer/" ),
					],
					"unknownTypePointer": Pointer.Factory.create( "http://example.com/pointer/" ),
					"anotherPrefixedPointer": "ex:another-resource/",
					"anotherPointerInSchema": "propertyInGeneral",
					"notInSchemaLiteral": "Property Literal not defined in Schema",
					"notInSchemaPointer": Pointer.Factory.create( "http://example.com/another-pointer/" ),
					"vocabPointer": "to-pointer",
					"relativePointer": Pointer.Factory.create( "relative-pointer/" ),
					"elementWithoutID": "This element will be converted into a set",
					"relative@id": [ "Property with a relative @id" ],
				};

				let digestedGeneralSchema:ObjectSchema.DigestedObjectSchema = ObjectSchema.Digester.digestSchema( generalSchema );
				let digestedSchema:ObjectSchema.DigestedObjectSchema = ObjectSchema.Digester.digestSchema( schemas );

				expect( jsonldConverter.expand ).toBeDefined();
				expect( Utils.isFunction( jsonldConverter.expand ) ).toBeDefined();

				let expandedObject:any = jsonldConverter.expand( compactedObject, digestedGeneralSchema, digestedSchema );

				expect( expandedObject ).toBeDefined();
				expect( Utils.isObject( expandedObject ) ).toEqual( true );

				expect( expandedObject[ "@id" ] ).toBe( "http://example.com/compactedObject/" );

				expect( Utils.isArray( expandedObject[ "@type" ] ) ).toBe( true );
				expect( expandedObject[ "@type" ].length ).toBe( 6 );
				expect( expandedObject[ "@type" ] ).toContain( "http://example.com/ns#Type-1" );
				expect( expandedObject[ "@type" ] ).toContain( "http://example.com/ns#Type-2" );
				expect( expandedObject[ "@type" ] ).toContain( "http://example.com/ns#MyType" );
				expect( expandedObject[ "@type" ] ).toContain( "http://example.com/ns#Another-Type" );
				expect( expandedObject[ "@type" ] ).toContain( "another:Another-Namespace-Type" );
				expect( expandedObject[ "@type" ] ).toContain( "http://example.com/my-vocabulary#Another-Another-Type" );

				let property:RDF.Literal.Class[] | RDF.Node.Class[] | [ RDF.List.Class ];
				let literal:RDF.Literal.Class;
				let node:RDF.Node.Class;
				let list:RDF.List.Class;

				property = expandedObject[ "http://example.com/ns#string" ];
				expect( Utils.isArray( property ) ).toBe( true );
				expect( property.length ).toBe( 1 );
				literal = <RDF.Literal.Class> property[ 0 ];
				expect( RDF.Literal.Factory.is( literal ) ).toBe( true );
				expect( RDF.Literal.Factory.hasType( literal, NS.XSD.DataType.string ) ).toBe( true );
				expect( literal[ "@value" ] ).toBe( "Some string" );

				property = expandedObject[ "http://example.com/ns#date" ];
				expect( Utils.isArray( property ) ).toBe( true );
				expect( property.length ).toBe( 1 );
				literal = <RDF.Literal.Class> property[ 0 ];
				expect( RDF.Literal.Factory.is( literal ) ).toBe( true );
				expect( RDF.Literal.Factory.hasType( literal, NS.XSD.DataType.dateTime ) ).toBe( true );
				expect( literal[ "@value" ] ).toBe( "2015-12-04T23:06:57.920Z" );

				property = expandedObject[ "http://example.com/ns#languageMap" ];
				expect( Utils.isArray( property ) ).toBe( true );
				expect( property.length ).toBe( 3 );
				literal = <RDF.Literal.Class> property[ 0 ];
				expect( RDF.Literal.Factory.is( literal ) ).toBe( true );
				expect( RDF.Literal.Factory.hasType( literal, NS.XSD.DataType.string ) ).toBe( true );
				expect( literal[ "@language" ] ).toBe( "es" );
				expect( literal[ "@value" ] ).toBe( "español" );
				literal = <RDF.Literal.Class> property[ 1 ];
				expect( RDF.Literal.Factory.is( literal ) ).toBe( true );
				expect( RDF.Literal.Factory.hasType( literal, NS.XSD.DataType.string ) ).toBe( true );
				expect( literal[ "@language" ] ).toBe( "en" );
				expect( literal[ "@value" ] ).toBe( "english" );
				literal = <RDF.Literal.Class> property[ 2 ];
				expect( RDF.Literal.Factory.is( literal ) ).toBe( true );
				expect( RDF.Literal.Factory.hasType( literal, NS.XSD.DataType.string ) ).toBe( true );
				expect( literal[ "@language" ] ).toBe( "ja" );
				expect( literal[ "@value" ] ).toBe( "日本語" );

				property = expandedObject[ "http://example.com/ns#pointer" ];
				expect( Utils.isArray( property ) ).toBe( true );
				expect( property.length ).toBe( 1 );
				node = <RDF.Node.Class> property[ 0 ];
				expect( RDF.Node.Factory.is( node ) ).toBe( true );
				expect( node[ "@id" ] ).toBe( "http://example.com/pointer/" );

				property = expandedObject[ "http://example.com/ns#pointerList" ];
				expect( Utils.isArray( property ) ).toBe( true );
				expect( property.length ).toBe( 1 );
				list = <RDF.List.Class> property[ 0 ];
				expect( RDF.List.Factory.is( list ) ).toBe( true );
				expect( list[ "@list" ].length ).toBe( 3 );
				node = <RDF.Node.Class> list[ "@list" ][ 0 ];
				expect( node[ "@id" ] ).toBe( "http://example.com/pointer-1/" );
				node = <RDF.Node.Class> list[ "@list" ][ 1 ];
				expect( node[ "@id" ] ).toBe( "http://example.com/pointer-2/" );
				node = <RDF.Node.Class> list[ "@list" ][ 2 ];
				expect( node[ "@id" ] ).toBe( "http://example.com/pointer-3/" );

				property = expandedObject[ "http://example.com/ns#pointerSet" ];
				expect( Utils.isArray( property ) ).toBe( true );
				expect( property.length ).toBe( 3 );
				node = <RDF.Node.Class> property[ 0 ];
				expect( node[ "@id" ] ).toBe( "http://example.com/pointer-1/" );
				node = <RDF.Node.Class> property[ 1 ];
				expect( node[ "@id" ] ).toBe( "http://example.com/pointer-2/" );
				node = <RDF.Node.Class> property[ 2 ];
				expect( node[ "@id" ] ).toBe( "http://example.com/pointer-3/" );

				property = expandedObject[ "http://example.com/ns#unknownTypeLiteral" ];
				expect( Utils.isArray( property ) ).toBe( true );
				expect( property.length ).toBe( 1 );
				literal = <RDF.Literal.Class> property[ 0 ];
				expect( RDF.Literal.Factory.is( literal ) ).toBe( true );
				expect( RDF.Literal.Factory.hasType( literal, NS.XSD.DataType.float ) ).toBe( true );
				expect( literal[ "@value" ] ).toBe( "1" );

				property = expandedObject[ "http://example.com/ns#unknownTypeArray" ];
				expect( Utils.isArray( property ) ).toBe( true );
				expect( property.length ).toBe( 5 );
				literal = <RDF.Literal.Class> property[ 0 ];
				expect( RDF.Literal.Factory.is( literal ) ).toBe( true );
				expect( RDF.Literal.Factory.hasType( literal, NS.XSD.DataType.float ) ).toBe( true );
				expect( literal[ "@value" ] ).toBe( "1.12" );
				literal = <RDF.Literal.Class> property[ 1 ];
				expect( RDF.Literal.Factory.is( literal ) ).toBe( true );
				expect( RDF.Literal.Factory.hasType( literal, NS.XSD.DataType.boolean ) ).toBe( true );
				expect( literal[ "@value" ] ).toBe( "false" );
				literal = <RDF.Literal.Class> property[ 2 ];
				expect( RDF.Literal.Factory.is( literal ) ).toBe( true );
				expect( RDF.Literal.Factory.hasType( literal, NS.XSD.DataType.dateTime ) ).toBe( true );
				expect( literal[ "@value" ] ).toBe( "2015-12-04T23:06:57.920Z" );
				literal = <RDF.Literal.Class> property[ 3 ];
				expect( RDF.Literal.Factory.is( literal ) ).toBe( true );
				expect( RDF.Literal.Factory.hasType( literal, NS.XSD.DataType.string ) ).toBe( true );
				expect( literal[ "@value" ] ).toBe( "Some string" );
				node = <RDF.Node.Class> property[ 4 ];
				expect( RDF.Node.Factory.is( node ) ).toBe( true );
				expect( node[ "@id" ] ).toBe( "http://example.com/pointer/" );

				property = expandedObject[ "http://example.com/ns#unknownTypePointer" ];
				expect( Utils.isArray( property ) ).toBe( true );
				expect( property.length ).toBe( 1 );
				node = <RDF.Node.Class> property[ 0 ];
				expect( RDF.Node.Factory.is( node ) ).toBe( true );
				expect( node[ "@id" ] ).toBe( "http://example.com/pointer/" );

				expect( expandedObject[ "http://example.com/ns#another-prefixed-pointer" ] ).toBeDefined();
				expect( expandedObject[ "http://example.com/ns#another-prefixed-pointer" ] ).toEqual( [ {
					"@id": "http://example.com/ns#another-resource/",
				} ] );

				expect( expandedObject[ "http://example.com/ns#another-pointer-in-schema" ] ).toBeDefined();
				expect( expandedObject[ "http://example.com/ns#another-pointer-in-schema" ] ).toEqual( [ {
					"@id": "http://example.com/ns#property-in-general",
				} ] );

				expect( expandedObject[ "http://example.com/my-vocabulary#notInSchemaLiteral" ] ).toBeDefined();
				expect( expandedObject[ "http://example.com/my-vocabulary#notInSchemaLiteral" ] ).toEqual( [ {
					"@value": "Property Literal not defined in Schema",
					"@type": NS.XSD.DataType.string,
				} ] );

				expect( expandedObject[ "http://example.com/my-vocabulary#notInSchemaPointer" ] ).toBeDefined();
				expect( expandedObject[ "http://example.com/my-vocabulary#notInSchemaPointer" ] ).toEqual( [ {
					"@id": "http://example.com/another-pointer/",
				} ] );

				expect( expandedObject[ "http://example.com/ns#vocab-pointer" ] ).toBeDefined();
				expect( expandedObject[ "http://example.com/ns#vocab-pointer" ] ).toEqual( [ {
					"@id": "http://example.com/my-vocabulary#to-pointer",
				} ] );

				expect( expandedObject[ "http://example.com/ns#relative-pointer" ] ).toBeDefined();
				expect( expandedObject[ "http://example.com/ns#relative-pointer" ] ).toEqual( [ {
					"@id": "relative-pointer/",
				} ] );

				expect( expandedObject[ "http://example.com/my-vocabulary#elementWithoutID" ] ).toBeDefined();
				property = expandedObject[ "http://example.com/my-vocabulary#elementWithoutID" ];
				expect( property ).toEqual( jasmine.any( Array ) );
				expect( property.length ).toBe( 1 );
				literal = <RDF.Literal.Class> property[ 0 ];
				expect( RDF.Literal.Factory.is( literal ) ).toBe( true );
				expect( RDF.Literal.Factory.hasType( literal, NS.XSD.DataType.string ) ).toBe( true );
				expect( literal[ "@value" ] ).toBe( "This element will be converted into a set" );

				expect( expandedObject[ "http://example.com/my-vocabulary#relative-at-id" ] ).toBeDefined();
				property = expandedObject[ "http://example.com/my-vocabulary#relative-at-id" ];
				expect( property ).toEqual( jasmine.any( Array ) );
				expect( property.length ).toBe( 1 );
				literal = <RDF.Literal.Class> property[ 0 ];
				expect( RDF.Literal.Factory.is( literal ) ).toBe( true );
				expect( RDF.Literal.Factory.hasType( literal, NS.XSD.DataType.string ) ).toBe( true );
				expect( literal[ "@value" ] ).toBe( "Property with a relative @id" );
			} );

		} );

	} );

	it( hasDefaultExport( "Carbon.JSONLD.Converter.Class" ), () => {
		expect( DefaultExport ).toBeDefined();
		expect( JSONLDConverter.Class ).toBe( DefaultExport );
	} );

} );
