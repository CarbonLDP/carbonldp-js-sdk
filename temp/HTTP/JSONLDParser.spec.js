"use strict";
var JasmineExtender_1 = require("./../test/JasmineExtender");
var Utils = require("./../Utils");
var JSONLDParser = require("./JSONLDParser");
var JSONLDParser_1 = require("./JSONLDParser");
describe(JasmineExtender_1.module("Carbon/HTTP/JSONLDParser"), function () {
    it(JasmineExtender_1.isDefined(), function () {
        expect(JSONLDParser).toBeDefined();
        expect(Utils.isObject(JSONLDParser)).toBe(true);
    });
    describe(JasmineExtender_1.clazz("Carbon.HTTP.JSONLDParser.Class", "Class wrapper for native `JSON.parse` using `Promise` pattern"), function () {
        it(JasmineExtender_1.isDefined(), function () {
            expect(JSONLDParser.Class).toBeDefined();
            expect(Utils.isFunction(JSONLDParser.Class)).toBe(true);
            var value = new JSONLDParser.Class();
            expect(value).toBeTruthy();
            expect(value instanceof JSONLDParser.Class).toBe(true);
        });
        it(JasmineExtender_1.hasMethod(JasmineExtender_1.INSTANCE, "parse", [
            { name: "body", type: "string", description: "A JSON string to parse" }
        ], { type: "Promise <Object>" }), function (done) {
            var compactedObject = {
                "@context": {
                    "ex": "http://example.com/",
                    "ns": "http://example.com/ns#",
                },
                "@id": "ex:resource/",
                "@graph": [
                    {
                        "@id": "http://example.com/resource/",
                        "ns:string": [{
                                "@value": "Document Resource"
                            }],
                        "ns:pointerSet": [
                            { "@id": "_:1" },
                            { "@id": "http://example.com/resource/#1" },
                            { "@id": "http://example.com/external-resource/" },
                        ],
                    },
                    {
                        "@id": "_:1",
                        "ns:string": {
                            "@value": "Fragment 1"
                        },
                        "ns:pointerSet": [
                            { "@id": "ex:resource/" },
                            { "@id": "ex:resource/#1" },
                        ],
                    },
                    {
                        "@id": "ex:resource/#1",
                        "ns:string": {
                            "@value": "NamedFragment 1"
                        },
                    },
                ],
            };
            var expandedObject = [{
                    "@id": "http://example.com/resource/",
                    "@graph": [
                        {
                            "@id": "http://example.com/resource/",
                            "http://example.com/ns#string": [{
                                    "@value": "Document Resource"
                                }],
                            "http://example.com/ns#pointerSet": [
                                { "@id": "_:1" },
                                { "@id": "http://example.com/resource/#1" },
                                { "@id": "http://example.com/external-resource/" },
                            ],
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
            var jsonString = JSON.stringify(expandedObject);
            var errorObject = {
                "@context": "Should be error context",
                "@graph": [
                    {
                        "@id": "http://example.com/resource/",
                        "ex:string": "Document Resource",
                        "ex:pointerSet": [
                            { "@id": "_:1" },
                            { "@id": "http://example.com/resource/#1" },
                            { "@id": "http://example.com/external-resource/" },
                        ],
                    },
                    {
                        "@id": "_:1",
                        "ex:string": [{
                                "@id": "Fragment 1"
                            }],
                        "ex:pointerSet": [
                            { "@id": "http://example.com/resource/" },
                            { "@id": "http://example.com/resource/#1" },
                        ],
                    },
                    {
                        "@id": "http://example.com/resource/#1",
                        "ex:string": [{
                                "@anotherThing": "NamedFragment 1"
                            }],
                    },
                ],
            };
            var errorString = JSON.stringify(errorObject);
            var parser = new JSONLDParser.Class();
            expect(parser.parse).toBeDefined();
            expect(Utils.isFunction(parser.parse)).toBe(true);
            var spies = {
                success: function (result) {
                    expect(result).toEqual(expandedObject);
                },
                error: function (error) {
                    expect(error instanceof Error).toBe(true);
                }
            };
            var success = spyOn(spies, 'success').and.callThrough();
            var error = spyOn(spies, 'error').and.callThrough();
            var promises = [];
            promises.push(parser.parse(jsonString).then(spies.success, spies.error));
            promises.push(parser.parse("some String /12121/ that is not JSON ))(*&^%$#@!").then(spies.success, spies.error));
            promises.push(parser.parse(errorString).then(spies.success, spies.error));
            Promise.all(promises).then(function () {
                expect(success.calls.count()).toBe(1);
                expect(error.calls.count()).toBe(2);
                done();
            }, done.fail);
        });
    });
    it(JasmineExtender_1.hasDefaultExport("Carbon.HTTP.JSONLDParser.Class"), function () {
        expect(JSONLDParser_1.default).toBeDefined();
        expect(JSONLDParser_1.default).toBe(JSONLDParser.Class);
    });
});
