import { Pointer, PointerLibrary } from "../Pointer";

import { Serializer } from "../RDF/Literal/Serializer";

import { XSD } from "../Vocabularies/XSD";

import { DigestedObjectSchema, ObjectSchemaDigester } from "./../ObjectSchema";

import { JSONLDConverter } from "./JSONLDConverter";


describe( "JSONLDConverter", () => {

	it( "should exist", () => {
		expect( JSONLDConverter ).toBeDefined();
		expect( JSONLDConverter ).toEqual( jasmine.any( Function ) );
	} );


	describe( "JSONLDConverter.constructor", () => {

		it( "should be instantiable", () => {
			const jsonldConverter:JSONLDConverter = new JSONLDConverter();
			expect( jsonldConverter ).toEqual( jasmine.any( JSONLDConverter ) );
		} );


		it( "should accept custom serializers", () => {
			const customSerializers:Map<string, Serializer> = new Map();
			customSerializers.set( "http://example.com/ns#my-custom-type", <any>{} );

			const jsonldConverter:JSONLDConverter = new JSONLDConverter( customSerializers );
			expect( jsonldConverter ).toEqual( jasmine.any( JSONLDConverter ) );
		} );

		it( "should extend provided serializers", () => {
			const serializer:Serializer = {
				serialize( value:any ):string { return "" + value; },
			};

			const customSerializers:Map<string, Serializer> = new Map();
			customSerializers.set( "http://example.com/ns#my-custom-type", serializer );

			const jsonldConverter:JSONLDConverter = new JSONLDConverter( customSerializers );
			expect( jsonldConverter ).toEqual( jasmine.any( JSONLDConverter ) );

			expect( jsonldConverter.literalSerializers.size ).toBe( 1 );
			expect( jsonldConverter.literalSerializers.get( "http://example.com/ns#my-custom-type" ) ).toBe( serializer );
		} );

	} );


	describe( "JSONLDConverter.compact", () => {

		it( "should exist", () => {
			expect( JSONLDConverter.prototype.compact ).toBeDefined();
			expect( JSONLDConverter.prototype.compact ).toEqual( jasmine.any( Function ) );
		} );


		it( "should compact expanded object", () => {
			const pointerLibrary:PointerLibrary = {
				hasPointer: ( id:string ):boolean => {
					return ! ! id;
				},
				getPointer: ( id:string ):Pointer => {
					return Pointer.createFrom( { $id: id } );
				},
			};

			const digestedSchema:DigestedObjectSchema = ObjectSchemaDigester.digestSchema( {
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
			} );

			const expandedObject:object = {
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
			const compactedObject:object = {};

			const jsonldConverter:JSONLDConverter = new JSONLDConverter();
			jsonldConverter.compact( expandedObject, compactedObject, digestedSchema, pointerLibrary );

			expect( compactedObject ).toEqual( {
				$id: "http://example.com/expandedObject/",
				types: [],

				string: "some-string",
				date: new Date( "2015-12-04T23:06:57.920Z" ),
				numberList: [ 2, 3, 4, 5, 6 ],
				languageMap: {
					es: "español",
					en: "english",
					ja: "日本語",
				},
				pointer: pointerLibrary.getPointer( "http://example.com/pointer/" ),
				pointerList: [
					pointerLibrary.getPointer( "http://example.com/pointer-1/" ),
					pointerLibrary.getPointer( "http://example.com/pointer-2/" ),
					pointerLibrary.getPointer( "http://example.com/pointer-3/" ),
				],
				pointerSet: [
					pointerLibrary.getPointer( "http://example.com/pointer-1/" ),
					pointerLibrary.getPointer( "http://example.com/pointer-2/" ),
					pointerLibrary.getPointer( "http://example.com/pointer-3/" ),
				],
				elementWithoutID: [ "One element in a set" ],
				"relative@id": [ "Property without an absolute @id" ],
			} );
		} );

	} );

	describe( "JSONLDConverter.expand", () => {

		it( "should exist", () => {
			expect( JSONLDConverter.prototype.expand ).toBeDefined();
			expect( JSONLDConverter.prototype.expand ).toEqual( jasmine.any( Function ) );
		} );


		it( "should expand compacted object", () => {
			const digestedGeneralSchema:DigestedObjectSchema = ObjectSchemaDigester.digestSchema( {
				"@vocab": "http://example.com/my-vocabulary#",
				"ex": "http://example.com/ns#",
				"xsd": "http://www.w3.org/2001/XMLSchema#",
				"propertyInGeneral": {
					"@id": "ex:property-in-general",
					"@type": "@id",
				},
			} );
			const digestedSchema:DigestedObjectSchema = ObjectSchemaDigester.digestSchema( [
				{
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
				},
				{
					"xsd": "http://www.w3.org/2001/XMLSchema#",
					"elementWithoutID": {
						"@type": "xsd:string",
						"@container": "@set",
					},
					"relative@id": {
						"@id": "relative-at-id",
						"@container": "@set",
					},
				},
			] );

			const compactedObject:object = {
				"$id": "http://example.com/compactedObject/",
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
				"numberList": [ 2, 3, 4, 5, 6 ],
				"languageMap": {
					"es": "español",
					"en": "english",
					"ja": "日本語",
				},
				"pointer": Pointer.create( { $id: "http://example.com/pointer/" } ),
				"pointerList": [
					Pointer.create( { $id: "http://example.com/pointer-1/" } ),
					Pointer.create( { $id: "http://example.com/pointer-2/" } ),
					Pointer.create( { $id: "http://example.com/pointer-3/" } ),
				],
				"pointerSet": [
					Pointer.create( { $id: "http://example.com/pointer-1/" } ),
					Pointer.create( { $id: "http://example.com/pointer-2/" } ),
					Pointer.create( { $id: "http://example.com/pointer-3/" } ),
				],
				"unknownTypeLiteral": 1,
				"unknownTypeArray": [
					1.12,
					false,
					new Date( "2015-12-04T23:06:57.920Z" ),
					"Some string",
					function():void {},
					Pointer.create( { $id: "http://example.com/pointer/" } ),
				],
				"unknownTypePointer": Pointer.create( { $id: "http://example.com/pointer/" } ),
				"anotherPrefixedPointer": "ex:another-resource/",
				"anotherPointerInSchema": "propertyInGeneral",
				"notInSchemaLiteral": "Property Literal not defined in Schema",
				"notInSchemaPointer": Pointer.create( { $id: "http://example.com/another-pointer/" } ),
				"vocabPointer": "to-pointer",
				"relativePointer": Pointer.create( { $id: "relative-pointer/" } ),
				"elementWithoutID": "This element will be converted into a set",
				"relative@id": [ "Property with a relative @id" ],
			};

			const jsonldConverter:JSONLDConverter = new JSONLDConverter();
			const expandedObject:object = jsonldConverter.expand( compactedObject, digestedGeneralSchema, digestedSchema );

			expect( expandedObject ).toEqual( {
				"@id": "http://example.com/compactedObject/",
				"@type": [
					"http://example.com/ns#MyType",
					"http://example.com/ns#Another-Type",
					"another:Another-Namespace-Type",
					"http://example.com/my-vocabulary#Another-Another-Type",
					"http://example.com/ns#Type-1",
					"http://example.com/ns#Type-2",
				],

				"http://example.com/ns#string": [
					{
						"@value": "Some string",
						"@type": XSD.string,
					},
				],
				"http://example.com/ns#date": [
					{
						"@value": "2015-12-04T23:06:57.920Z",
						"@type": XSD.dateTime,
					},
				],
				"http://example.com/ns#numberList": [ {
					"@list": [
						{
							"@value": "2",
							"@type": XSD.integer,
						},
						{
							"@value": "3",
							"@type": XSD.integer,
						},
						{
							"@value": "4",
							"@type": XSD.integer,
						},
						{
							"@value": "5",
							"@type": XSD.integer,
						},
						{
							"@value": "6",
							"@type": XSD.integer,
						},
					],
				} ],
				"http://example.com/ns#languageMap": [
					{
						"@value": "español",
						"@type": XSD.string,
						"@language": "es",
					},
					{
						"@value": "english",
						"@type": XSD.string,
						"@language": "en",
					},
					{
						"@value": "日本語",
						"@type": XSD.string,
						"@language": "ja",
					},
				],
				"http://example.com/ns#pointer": [
					{
						"@id": "http://example.com/pointer/",
					},
				],
				"http://example.com/ns#pointerList": [ {
					"@list": [
						{
							"@id": "http://example.com/pointer-1/",
						},
						{
							"@id": "http://example.com/pointer-2/",
						},
						{
							"@id": "http://example.com/pointer-3/",
						},
					],
				} ],
				"http://example.com/ns#pointerSet": [
					{
						"@id": "http://example.com/pointer-1/",
					},
					{
						"@id": "http://example.com/pointer-2/",
					},
					{
						"@id": "http://example.com/pointer-3/",
					},
				],
				"http://example.com/ns#unknownTypeLiteral": [
					{
						"@value": "1",
						"@type": XSD.float,
					},
				],
				"http://example.com/ns#unknownTypeArray": [
					{
						"@value": "1.12",
						"@type": XSD.float,
					},
					{
						"@value": "false",
						"@type": XSD.boolean,
					},
					{
						"@value": "2015-12-04T23:06:57.920Z",
						"@type": XSD.dateTime,
					},
					{
						"@value": "Some string",
						"@type": XSD.string,
					},
					{
						"@id": "http://example.com/pointer/",
					},
				],
				"http://example.com/ns#unknownTypePointer": [
					{
						"@id": "http://example.com/pointer/",
					},
				],

				"http://example.com/ns#another-prefixed-pointer": [
					{
						"@id": "http://example.com/ns#another-resource/",
					},
				],
				"http://example.com/ns#another-pointer-in-schema": [
					{
						"@id": "http://example.com/ns#property-in-general",
					},
				],
				"http://example.com/my-vocabulary#notInSchemaLiteral": [
					{
						"@value": "Property Literal not defined in Schema",
						"@type": XSD.string,
					},
				],
				"http://example.com/my-vocabulary#notInSchemaPointer": [
					{
						"@id": "http://example.com/another-pointer/",
					},
				],
				"http://example.com/ns#vocab-pointer": [
					{
						"@id": "http://example.com/my-vocabulary#to-pointer",
					},
				],
				"http://example.com/ns#relative-pointer": [
					{
						"@id": "relative-pointer/",
					},
				],

				"http://example.com/my-vocabulary#elementWithoutID": [
					{
						"@value": "This element will be converted into a set",
						"@type": XSD.string,
					},
				],
				"http://example.com/my-vocabulary#relative-at-id": [
					{
						"@value": "Property with a relative @id",
						"@type": XSD.string,
					},
				],
			} );
		} );

	} );

} );
