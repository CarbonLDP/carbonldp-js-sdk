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
import * as Pointer from "./Pointer";
import * as Utils from "./Utils";

import * as JSONLDConverter from "./JSONLDConverter";
import * as ObjectSchema from "./ObjectSchema";

describe( module( "Carbon/JSONLDConverter" ), ():void => {
	it( isDefined(), ():void => {
		expect( JSONLDConverter ).toBeDefined();
		expect( Utils.isObject( JSONLDConverter ) ).toEqual( true );
	});

	describe( clazz( "Carbon.JSONLDConverter.Class", "Class that have methods for convert between expanded JSON-LD objects to compacted Carbon SDK Resources and vice versa." ), ():void => {
		it( isDefined(), ():void => {
			expect( JSONLDConverter.Class ).toBeDefined();
			expect( Utils.isFunction( JSONLDConverter.Class ) ).toEqual( true );
		});

		describe( method( INSTANCE, "compact" ), ():void => {
			// TODO: Improve signature description
			it( hasSignature( "Returns a Carbon SDK Resource generated from the JSON-LD object provided.", [
				{ name: "expandedObject", type: "Object" },
				{ name: "targetObject", type: "Object" },
				{ name: "digestedSchema", type: "Carbon.ObjectSchema.DigestedObjectSchema" },
				{ name: "pointerLibrary", type: "Carbon.Pointer.Library" },
			], { type: "Object", description: "" } ), ():void => {
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
						{ "@value": "日本語", "@language": "jp" },
					],
					"http://example.com/ns#pointer": [
						{ "@id": "http://example.com/pointer" },
					],
					"http://example.com/ns#pointerList": [
						{
							"@list": [
								{ "@id": "http://example.com/pointer-1" },
								{ "@id": "http://example.com/pointer-2" },
								{ "@id": "http://example.com/pointer-3" },
							],
						},
					],
					"http://example.com/ns#pointerSet": [
						{ "@id": "http://example.com/pointer-1" },
						{ "@id": "http://example.com/pointer-2" },
						{ "@id": "http://example.com/pointer-3" },
					],
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
							get id() {
								return this._id;
							},
							isResolved: function() {
								return this._resolved;
							},
							resolve: mockedResolveFunction
						};
					},
				};

				let compactedObject:any = {};
				let digestedSchema:ObjectSchema.DigestedObjectSchema = ObjectSchema.Digester.digestSchema( schema );
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
			});
		});

		describe( method( INSTANCE, "expand" ), ():void => {
			// TODO: Improve signature description
			it( hasSignature( "Returns a JSON-LD object generated from the Carbon SDK Resource provided.", [
				{ name: "compactedObject", type: "Object" },
				{ name: "digestedSchema", type: "Carbon.ObjectSchema.DigestedObjectSchema" },
			], { type: "Object", description: "" } ), ():void => {
				let jsonldConverter:JSONLDConverter.Class = new JSONLDConverter.Class();

				expect( jsonldConverter.compact ).toBeDefined();
				expect( Utils.isFunction( jsonldConverter.compact ) ).toBeDefined();

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
					"unknownTypeLiteral": {
						"@id": "ex:unknownTypeLiteral",
					},
					"unknownTypeArray": {
						"@id": "ex:unknownTypeArray",
					},
					"unknownTypePointer": {
						"@id": "ex:unknownTypePointer",
					},
				};

				let mockedResolveFunction:() => Promise<void> = function():Promise<void> { throw Error( "Don't call this method, duh" ); };

				let compactedObject:any = {
					"uri": "http://example.com/compactedObject",
					"string": "some-string",
					"date": new Date( "2015-12-04T23:06:57.920Z" ),
					"numberList": [ 2, 3, 4, 5, 6, ],
					"languageMap": {
						"es": "español",
						"en": "english",
						"jp": "日本語",
					},
					"pointer": {
						uri: "http://example.com/pointer",
						resolve: mockedResolveFunction,
					},
					"pointerList": [
						{
							uri: "http://example.com/pointer-1",
							resolve: mockedResolveFunction,
						},
						{
							uri: "http://example.com/pointer-2",
							resolve: mockedResolveFunction,
						},
						{
							uri: "http://example.com/pointer-3",
							resolve: mockedResolveFunction,
						},
					],
					"pointerSet": [
						{
							uri: "http://example.com/pointer-1",
							resolve: mockedResolveFunction,
						},
						{
							uri: "http://example.com/pointer-2",
							resolve: mockedResolveFunction,
						},
						{
							uri: "http://example.com/pointer-3",
							resolve: mockedResolveFunction,
						},
					],
					"unknownTypeLiteral": 1,
					"unknownTypeArray": [
						1.12,
						false,
						new Date( "2015-12-04T23:06:57.920Z" ),
						"some-string",
						function():void {},
						{
							uri: "http://example.com/pointer",
							resolve: mockedResolveFunction,
						},
					],
					"unknownTypePointer": {
						uri: "http://example.com/pointer",
						resolve: mockedResolveFunction,
					},
				};

				let digestedSchema:ObjectSchema.DigestedObjectSchema = ObjectSchema.Digester.digestSchema( schema );
				let expandedObject:any = jsonldConverter.expand( compactedObject, digestedSchema );

				expect( expandedObject ).toBeDefined();
				expect( Utils.isObject( expandedObject ) ).toEqual( true );
			});
		});
	});
});
