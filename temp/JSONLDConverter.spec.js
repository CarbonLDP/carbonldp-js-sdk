"use strict";
var JasmineExtender_1 = require("./test/JasmineExtender");
var Utils = require("./Utils");
var JSONLDConverter = require("./JSONLDConverter");
var ObjectSchema = require("./ObjectSchema");
describe(JasmineExtender_1.module("Carbon/JSONLDConverter"), function () {
    it(JasmineExtender_1.isDefined(), function () {
        expect(JSONLDConverter).toBeDefined();
        expect(Utils.isObject(JSONLDConverter)).toEqual(true);
    });
    describe(JasmineExtender_1.clazz("Carbon.JSONLDConverter.Class", ""), function () {
        it(JasmineExtender_1.isDefined(), function () {
            expect(JSONLDConverter.Class).toBeDefined();
            expect(Utils.isFunction(JSONLDConverter.Class)).toEqual(true);
        });
        describe(JasmineExtender_1.method(JasmineExtender_1.INSTANCE, "compact"), function () {
            it(JasmineExtender_1.hasSignature("", [
                { name: "expandedObject", type: "Object" },
                { name: "targetObject", type: "Object" },
                { name: "digestedSchema", type: "Carbon.ObjectSchema.DigestedObjectSchema" },
                { name: "pointerLibrary", type: "Carbon.Pointer.Library" },
            ], { type: "Object", description: "" }), function () {
                var jsonldConverter = new JSONLDConverter.Class();
                expect(jsonldConverter.compact).toBeDefined();
                expect(Utils.isFunction(jsonldConverter.compact)).toBeDefined();
                var expandedObject = {
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
                var schema = {
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
                var mockedResolveFunction = function () { throw Error("Don't call this method, duh"); };
                var mockedPointerLibrary = {
                    hasPointer: function (id) {
                        return true;
                    },
                    getPointer: function (id) {
                        return {
                            _id: id,
                            _resolved: true,
                            get id() {
                                return this._id;
                            },
                            isResolved: function () {
                                return this._resolved;
                            },
                            resolve: mockedResolveFunction
                        };
                    },
                };
                var compactedObject = {};
                var digestedSchema = ObjectSchema.Digester.digestSchema(schema);
                jsonldConverter.compact(expandedObject, compactedObject, digestedSchema, mockedPointerLibrary);
                expect(compactedObject).toBeDefined();
                expect(Utils.isObject(compactedObject)).toEqual(true);
                expect(Utils.hasProperty(compactedObject, "string")).toEqual(true);
                expect(compactedObject.string).toEqual("some-string");
                expect(Utils.hasProperty(compactedObject, "date")).toEqual(true);
                expect(Utils.isDate(compactedObject.date)).toEqual(true);
                expect(Utils.hasProperty(compactedObject, "numberList")).toEqual(true);
                expect(Utils.isArray(compactedObject.numberList)).toEqual(true);
                expect(compactedObject.numberList.length).toEqual(5);
                expect(compactedObject.numberList[0]).toEqual(2);
                expect(compactedObject.numberList[1]).toEqual(3);
                expect(compactedObject.numberList[2]).toEqual(4);
                expect(compactedObject.numberList[3]).toEqual(5);
                expect(compactedObject.numberList[4]).toEqual(6);
                expect(Utils.hasProperty(compactedObject, "languageMap")).toEqual(true);
                expect(Utils.isObject(compactedObject.languageMap)).toEqual(true);
                expect(compactedObject.languageMap.es).toEqual("español");
                expect(compactedObject.languageMap.en).toEqual("english");
                expect(compactedObject.languageMap.jp).toEqual("日本語");
                expect(Utils.hasProperty(compactedObject, "pointer")).toEqual(true);
                expect(Utils.isObject(compactedObject.pointer)).toEqual(true);
                expect(compactedObject.pointer.id).toEqual("http://example.com/pointer");
                expect(Utils.hasProperty(compactedObject, "pointerList")).toEqual(true);
                expect(Utils.isArray(compactedObject.pointerList)).toEqual(true);
                expect(compactedObject.pointerList.length).toEqual(3);
                expect(compactedObject.pointerList[0].id).toEqual("http://example.com/pointer-1");
                expect(compactedObject.pointerList[1].id).toEqual("http://example.com/pointer-2");
                expect(compactedObject.pointerList[2].id).toEqual("http://example.com/pointer-3");
                expect(Utils.hasProperty(compactedObject, "pointerSet")).toEqual(true);
                expect(Utils.isArray(compactedObject.pointerSet)).toEqual(true);
                expect(compactedObject.pointerSet.length).toEqual(3);
                expect(compactedObject.pointerSet[0].id).toEqual("http://example.com/pointer-1");
                expect(compactedObject.pointerSet[1].id).toEqual("http://example.com/pointer-2");
                expect(compactedObject.pointerSet[2].id).toEqual("http://example.com/pointer-3");
            });
        });
        describe(JasmineExtender_1.method(JasmineExtender_1.INSTANCE, "expand"), function () {
            it(JasmineExtender_1.hasSignature("", [
                { name: "compactedObject", type: "Object" },
                { name: "digestedSchema", type: "Carbon.ObjectSchema.DigestedObjectSchema" },
            ], { type: "Object", description: "" }), function () {
                var jsonldConverter = new JSONLDConverter.Class();
                expect(jsonldConverter.compact).toBeDefined();
                expect(Utils.isFunction(jsonldConverter.compact)).toBeDefined();
                var schema = {
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
                var mockedResolveFunction = function () { throw Error("Don't call this method, duh"); };
                var compactedObject = {
                    "uri": "http://example.com/compactedObject",
                    "string": "some-string",
                    "date": new Date("2015-12-04T23:06:57.920Z"),
                    "numberList": [2, 3, 4, 5, 6,],
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
                        new Date("2015-12-04T23:06:57.920Z"),
                        "some-string",
                        function () { },
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
                var digestedSchema = ObjectSchema.Digester.digestSchema(schema);
                var expandedObject = jsonldConverter.expand(compactedObject, digestedSchema);
                expect(expandedObject).toBeDefined();
                expect(Utils.isObject(expandedObject)).toEqual(true);
            });
        });
    });
});
