"use strict";
var JasmineExtender_1 = require("./../test/JasmineExtender");
var Utils = require("./../Utils");
var StringParser = require("./StringParser");
var StringParser_1 = require("./StringParser");
describe(JasmineExtender_1.module("Carbon/HTTP/StringParser"), function () {
    it(JasmineExtender_1.isDefined(), function () {
        expect(StringParser).toBeDefined();
        expect(Utils.isObject(StringParser)).toEqual(true);
    });
    describe(JasmineExtender_1.clazz("Carbon.HTTP.StringParser.Class", "Parses a Carbon.HTTP.Response.Class and returns a String"), function () {
        it(JasmineExtender_1.hasMethod(JasmineExtender_1.INSTANCE, "parse", "Gets a string and returns a promise with the same string", [
            { name: "body", type: "Carbon.HTTP.Response.Class" }
        ], { type: "Promise<string>" }), function (done) {
            var stringParser = new StringParser.Class();
            (function () {
                expect("parse" in stringParser).toEqual(true);
                expect(Utils.isFunction(stringParser.parse)).toEqual(true);
            })();
            var promises = [];
            (function () {
                var body = "This is the body";
                var promise = stringParser.parse(body);
                expect(promise).toBeDefined();
                expect(promise instanceof Promise).toEqual(true);
                promises.push(promise.then(function (parsedBody) {
                    expect(parsedBody).toEqual(body);
                }));
            })();
            Promise.all(promises).then(function () {
                done();
            }, function (error) {
                done.fail(error);
            });
        });
    });
    it(JasmineExtender_1.hasDefaultExport("Carbon.HTTP.StringParser.Class"), function () {
        expect(StringParser_1.default).toBeDefined();
        expect(StringParser_1.default).toEqual(StringParser.Class);
    });
});
