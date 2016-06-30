import {
	INSTANCE,
	STATIC,

	module,

	isDefined,

	interfaze,
	clazz,
	method,

	hasConstructor,
	hasMethod,
	hasSignature,
	hasProperty,
	hasInterface,
	extendsClass,

	MethodArgument,
} from "./test/JasmineExtender";

import * as Errors from "./Errors";
import * as HTTP from "./HTTP";
import * as NS from "./NS";
import * as Pointer from "./Pointer";
import * as Utils from "./Utils";

import * as JSONLDConverter from "./JSONLDConverter";
import * as ObjectSchema from "./ObjectSchema";

describe( module( "Carbon/JSONLDConverter" ), ():void => {
	it( isDefined(), ():void => {
		expect( JSONLDConverter ).toBeDefined();
		expect( Utils.isObject( JSONLDConverter ) ).toEqual( true );
	} );

	describe( clazz( "Carbon.JSONLDConverter.Class", "" ), ():void => {
		it( isDefined(), ():void => {
			expect( JSONLDConverter.Class ).toBeDefined();
			expect( Utils.isFunction( JSONLDConverter.Class ) ).toEqual( true );
		} );

		describe( method( INSTANCE, "compact" ), ():void => {
			// TODO: Improve signature description
			it( hasSignature( "", [
				{name: "expandedObject", type: "Object"},
				{name: "targetObject", type: "Object"},
				{name: "digestedSchema", type: "Carbon.ObjectSchema.DigestedObjectSchema"},
				{name: "pointerLibrary", type: "Carbon.Pointer.Library"},
			], {type: "Object", description: ""} ), ():void => {
				let expandedObject:any = {
					"@id": "http://example.com/expandedObject/",
					"http://example.com/ns#string": [
						{"@value": "some-string", "@type": "http://www.w3.org/2001/XMLSchema#string"},
					],
					"http://example.com/ns#date": [
						{"@value": "2015-12-04T23:06:57.920Z", "@type": "http://www.w3.org/2001/XMLSchema#dateTime"},
					],
					"http://example.com/ns#numberList": [
						{
							"@list": [
								{"@value": "2", "@type": "http://www.w3.org/2001/XMLSchema#integer"},
								{"@value": "3", "@type": "http://www.w3.org/2001/XMLSchema#integer"},
								{"@value": "4", "@type": "http://www.w3.org/2001/XMLSchema#integer"},
								{"@value": "5", "@type": "http://www.w3.org/2001/XMLSchema#integer"},
								{"@value": "6", "@type": "http://www.w3.org/2001/XMLSchema#integer"},
							],
						},
					],
					"http://example.com/ns#languageMap": [
						{"@value": "español", "@type": "http://www.w3.org/2001/XMLSchema#string", "@language": "es"},
						{"@value": "english", "@type": "http://www.w3.org/2001/XMLSchema#string", "@language": "en"},
						{"@value": "日本語", "@language": "jp"},
					],
					"http://example.com/ns#pointer": [
						{"@id": "http://example.com/pointer"},
					],
					"http://example.com/ns#pointerList": [
						{
							"@list": [
								{"@id": "http://example.com/pointer-1"},
								{"@id": "http://example.com/pointer-2"},
								{"@id": "http://example.com/pointer-3"},
							],
						},
					],
					"http://example.com/ns#pointerSet": [
						{"@id": "http://example.com/pointer-1"},
						{"@id": "http://example.com/pointer-2"},
						{"@id": "http://example.com/pointer-3"},
					],
				};

				let generalSchema:ObjectSchema.Class = {
					"ex": "http://example.com/ns#",
					"xsd": "http://www.w3.org/2001/XMLSchema#",
				};

				let schema:ObjectSchema.Class = {
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
				};

				let mockedResolveFunction:() => Promise<[ Pointer.Class, HTTP.Response.Class ]> = function():Promise<[ Pointer.Class, HTTP.Response.Class ]> { throw Error( "Don't call this method, duh" ); };

				let mockedPointerLibrary:Pointer.Library = {
					hasPointer: ( id:string ):boolean => {
						return true;
					},
					getPointer: ( id:string ):Pointer.Class => {
						return {
							_id: id,
							_resolved: true,
							get id():string {
								return this._id;
							},
							isResolved: function():boolean {
								return this._resolved;
							},
							resolve: mockedResolveFunction,
						};
					},
				};

				let compactedObject:any = {};
				let digestedGeneralSchema:ObjectSchema.DigestedObjectSchema = ObjectSchema.Digester.digestSchema( generalSchema );
				let digestedSchema:ObjectSchema.DigestedObjectSchema = ObjectSchema.Digester.digestSchema( schema );
				let jsonldConverter:JSONLDConverter.Class = new JSONLDConverter.Class( digestedGeneralSchema );

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
				expect( compactedObject.languageMap.jp ).toEqual( "日本語" );

				expect( Utils.hasProperty( compactedObject, "pointer" ) ).toEqual( true );
				expect( Utils.isObject( compactedObject.pointer ) ).toEqual( true );
				expect( compactedObject.pointer.id ).toEqual( "http://example.com/pointer" );

				expect( Utils.hasProperty( compactedObject, "pointerList" ) ).toEqual( true );
				expect( Utils.isArray( compactedObject.pointerList ) ).toEqual( true );
				expect( compactedObject.pointerList.length ).toEqual( 3 );
				expect( compactedObject.pointerList[ 0 ].id ).toEqual( "http://example.com/pointer-1" );
				expect( compactedObject.pointerList[ 1 ].id ).toEqual( "http://example.com/pointer-2" );
				expect( compactedObject.pointerList[ 2 ].id ).toEqual( "http://example.com/pointer-3" );

				expect( Utils.hasProperty( compactedObject, "pointerSet" ) ).toEqual( true );
				expect( Utils.isArray( compactedObject.pointerSet ) ).toEqual( true );
				expect( compactedObject.pointerSet.length ).toEqual( 3 );
				expect( compactedObject.pointerSet[ 0 ].id ).toEqual( "http://example.com/pointer-1" );
				expect( compactedObject.pointerSet[ 1 ].id ).toEqual( "http://example.com/pointer-2" );
				expect( compactedObject.pointerSet[ 2 ].id ).toEqual( "http://example.com/pointer-3" );
			} );
		} );

		describe( method( INSTANCE, "expand" ), ():void => {
			// TODO: Improve signature description
			it( hasSignature( "", [
				{name: "compactedObject", type: "Object"},
				{name: "digestedSchema", type: "Carbon.ObjectSchema.DigestedObjectSchema"},
			], {type: "Object", description: ""} ), ():void => {
				let generalSchema:ObjectSchema.Class = {
					"@base": "http://example.com/",
					"ex": "http://example.com/ns#",
					"xsd": "http://www.w3.org/2001/XMLSchema#",
				};
				let schema:ObjectSchema.Class = {
					"@vocab": "http://example.com/my-namespace#",
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
					"unknownTypeLiteral": {
						"@id": "ex:unknownTypeLiteral",
					},
					"unknownTypeArray": {
						"@id": "ex:unknownTypeArray",
					},
					"unknownTypePointer": {
						"@id": "ex:unknownTypePointer",
					},
					"anotherPointer": {
						"@id": "ex:another-pointer",
						"@type": "@id",
					},
					"anotherPrefixedPointer": {
						"@id": "ex:another-prefixed-pointer",
						"@type": "@id",
					},
					"anotherPointerInSchema": {
						"@id": "ex:another-pointer-in-schema",
						"@type": "@id",
					},
				};

				let compactedObject:any = {
					"id": "http://example.com/compactedObject",
					"string": "some-string",
					"date": new Date( "2015-12-04T23:06:57.920Z" ),
					"numberList": [ 2, 3, 4, 5, 6, ],
					"languageMap": {
						"es": "español",
						"en": "english",
						"jp": "日本語",
					},
					"pointer": Pointer.Factory.create( "http://example.com/pointer" ),
					"pointerList": [
						Pointer.Factory.create( "http://example.com/pointer-1" ),
						Pointer.Factory.create( "http://example.com/pointer-2" ),
						Pointer.Factory.create( "http://example.com/pointer-3" ),
					],
					"pointerSet": [
						Pointer.Factory.create( "http://example.com/pointer-1" ),
						Pointer.Factory.create( "http://example.com/pointer-2" ),
						Pointer.Factory.create( "http://example.com/pointer-3" ),
					],
					"unknownTypeLiteral": 1,
					"unknownTypeArray": [
						1.12,
						false,
						new Date( "2015-12-04T23:06:57.920Z" ),
						"some-string",
						function():void {},
						Pointer.Factory.create( "http://example.com/pointer" ),
					],
					"unknownTypePointer": Pointer.Factory.create( "http://example.com/pointer" ),
					"anotherPointer": "another-resource/",
					"anotherPrefixedPointer": "ex:another-resource/",
					"anotherPointerInSchema": "string",
					"notInSchemaLiteral": "Property Literal not defined in Schema",
					"notInSchemaPointer": Pointer.Factory.create( "http://example.com/another-pointer/" ),
				};

				let digestedGeneralSchema:ObjectSchema.DigestedObjectSchema = ObjectSchema.Digester.digestSchema( generalSchema );
				let digestedSchema:ObjectSchema.DigestedObjectSchema = ObjectSchema.Digester.digestSchema( schema );
				let jsonldConverter:JSONLDConverter.Class = new JSONLDConverter.Class( digestedGeneralSchema );

				expect( jsonldConverter.compact ).toBeDefined();
				expect( Utils.isFunction( jsonldConverter.compact ) ).toBeDefined();

				let expandedObject:any = jsonldConverter.expand( compactedObject, digestedSchema );

				expect( expandedObject ).toBeDefined();
				expect( Utils.isObject( expandedObject ) ).toEqual( true );

				expect( expandedObject[ "http://example.com/ns#another-pointer" ] ).toBeDefined();
				expect( expandedObject[ "http://example.com/ns#another-pointer" ] ).toEqual( [ {
					"@id": "another-resource/",
				} ] );

				expect( expandedObject[ "http://example.com/ns#another-prefixed-pointer" ] ).toBeDefined();
				expect( expandedObject[ "http://example.com/ns#another-prefixed-pointer" ] ).toEqual( [ {
					"@id": "http://example.com/ns#another-resource/",
				} ] );

				expect( expandedObject[ "http://example.com/ns#another-pointer-in-schema" ] ).toBeDefined();
				expect( expandedObject[ "http://example.com/ns#another-pointer-in-schema" ] ).toEqual( [ {
					"@id": "http://example.com/ns#string",
				} ] );

				expect( expandedObject[ "http://example.com/my-namespace#notInSchemaLiteral" ] ).toBeDefined();
				expect( expandedObject[ "http://example.com/my-namespace#notInSchemaLiteral" ] ).toEqual( [ {
					"@value": "Property Literal not defined in Schema",
					"@type": NS.XSD.DataType.string,
				} ] );

				expect( expandedObject[ "http://example.com/my-namespace#notInSchemaPointer" ] ).toBeDefined();
				expect( expandedObject[ "http://example.com/my-namespace#notInSchemaPointer" ] ).toEqual( [ {
					"@id": "http://example.com/another-pointer/",
				} ] );
			} );
		} );
	} );
} );
