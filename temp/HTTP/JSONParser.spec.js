"use strict";
var JasmineExtender_1 = require("./../test/JasmineExtender");
var Utils = require("./../Utils");
var JSONParser = require("./JSONParser");
var JSONParser_1 = require("./JSONParser");
describe(JasmineExtender_1.module("Carbon/HTTP/JSONParser"), function () {
    it(JasmineExtender_1.isDefined(), function () {
        expect(JSONParser).toBeDefined();
        expect(Utils.isObject(JSONParser)).toBe(true);
    });
    describe(JasmineExtender_1.clazz("Carbon.HTTP.JSONParser.Class", "Class wrapper for native `JSON.parse` using `Promise` pattern"), function () {
        it(JasmineExtender_1.isDefined(), function () {
            expect(JSONParser.Class).toBeDefined();
            expect(Utils.isFunction(JSONParser.Class)).toBe(true);
            var value = new JSONParser.Class();
            expect(value).toBeTruthy();
            expect(value instanceof JSONParser.Class).toBe(true);
        });
        it(JasmineExtender_1.hasMethod(JasmineExtender_1.INSTANCE, "parse", [
            { name: "body", type: "string", description: "A JSON string to parse" }
        ], { type: "Promise <Object>" }), function (done) {
            var parser = new JSONParser.Class();
            var jsonString = "{\n\t\t\t   \"anObject\": {\n\t\t\t      \"numericProperty\": -122,\n\t\t\t      \"nullProperty\": null,\n\t\t\t      \"booleanProperty\": true,\n\t\t\t      \"dateProperty\": \"2011-09-23\"\n\t\t\t   },\n\t\t\t   \"arrayOfObjects\": [\n\t\t\t      {\n\t\t\t         \"item\": 1\n\t\t\t      },\n\t\t\t      {\n\t\t\t         \"item\": 2\n\t\t\t      },\n\t\t\t      {\n\t\t\t         \"item\": 3\n\t\t\t      }\n\t\t\t   ],\n\t\t\t   \"arrayOfIntegers\": [\n\t\t\t      1,\n\t\t\t      2,\n\t\t\t      3,\n\t\t\t      4,\n\t\t\t      5\n\t\t\t   ]\n\t\t\t}";
            var jsonObject = {
                anObject: {
                    numericProperty: -122,
                    nullProperty: null,
                    booleanProperty: true,
                    dateProperty: "2011-09-23"
                },
                arrayOfObjects: [
                    {
                        item: 1
                    },
                    {
                        item: 2
                    },
                    {
                        item: 3
                    }
                ],
                arrayOfIntegers: [
                    1,
                    2,
                    3,
                    4,
                    5
                ]
            };
            expect(parser.parse).toBeDefined();
            expect(Utils.isFunction(parser.parse)).toBe(true);
            var spy = {
                success: function (resultObject) {
                    expect(resultObject).toEqual(jsonObject);
                },
                error: function (errorObject) {
                    expect(errorObject instanceof Error).toBe(true);
                }
            };
            var success = spyOn(spy, 'success').and.callThrough();
            var error = spyOn(spy, 'error').and.callThrough();
            var promises = [];
            promises.push(parser.parse(jsonString).then(spy.success, spy.error));
            promises.push(parser.parse("some String /12121/ that is not JSON ))(*&^%$#@!").then(spy.success, spy.error));
            Promise.all(promises).then(function () {
                expect(success.calls.count()).toBe(1);
                expect(error.calls.count()).toBe(1);
                done();
            }, done.fail);
        });
    });
    it(JasmineExtender_1.hasDefaultExport("Carbon.HTTP.JSONParser.Class"), function () {
        expect(JSONParser_1.default).toBeDefined();
        expect(JSONParser_1.default).toBe(JSONParser.Class);
    });
});
