"use strict";
var JasmineExtender_1 = require("./../test/JasmineExtender");
var Utils = require("./../Utils");
var RawResults = require("./RawResults");
describe(JasmineExtender_1.module("Carbon/SPARQL/RawResults"), function () {
    it(JasmineExtender_1.isDefined(), function () {
        expect(RawResults).toBeDefined();
        expect(Utils.isObject(RawResults)).toBe(true);
    });
    describe(JasmineExtender_1.clazz("Carbon.SPARQL.RawResults", "Class where specifies the types a SPARQL query result can be"), function () {
        it(JasmineExtender_1.isDefined(), function () {
            expect(RawResults.ValueTypes).toBeDefined();
            expect(Utils.isFunction(RawResults.ValueTypes)).toBe(true);
        });
        it(JasmineExtender_1.hasProperty(JasmineExtender_1.STATIC, "URI", "string"), function () {
            expect(RawResults.ValueTypes.URI).toBeDefined();
            expect(Utils.isString(RawResults.ValueTypes.URI)).toBe(true);
            expect(RawResults.ValueTypes.URI).toBe("uri");
        });
        it(JasmineExtender_1.hasProperty(JasmineExtender_1.STATIC, "LITERAL", "string"), function () {
            expect(RawResults.ValueTypes.LITERAL).toBeDefined();
            expect(Utils.isString(RawResults.ValueTypes.LITERAL)).toBe(true);
            expect(RawResults.ValueTypes.LITERAL).toBe("literal");
        });
        it(JasmineExtender_1.hasProperty(JasmineExtender_1.STATIC, "BNODE", "string"), function () {
            expect(RawResults.ValueTypes.BNODE).toBeDefined();
            expect(Utils.isString(RawResults.ValueTypes.BNODE)).toBe(true);
            expect(RawResults.ValueTypes.BNODE).toBe("bnode");
        });
    });
    describe(JasmineExtender_1.clazz("Carbon.SPARQL.RawResults.Factory", "Factory class for RawResults objects"), function () {
        it(JasmineExtender_1.isDefined(), function () {
            expect(RawResults.Factory).toBeDefined();
            expect(Utils.isFunction(RawResults.Factory)).toBe(true);
        });
        it(JasmineExtender_1.hasMethod(JasmineExtender_1.STATIC, "hasClassProperties", "Returns true if the object provided contains the properties required to be a `Carbon.SPARQL.RawResult.Class` object", [
            { name: "value", type: "Object" }
        ], { type: "boolean" }), function () {
            expect(RawResults.Factory.hasClassProperties).toBeDefined();
            expect(Utils.isFunction(RawResults.Factory.hasClassProperties)).toBe(true);
            var object;
            object = {};
            expect(RawResults.Factory.hasClassProperties(object)).toBe(false);
            object = { "head": {} };
            expect(RawResults.Factory.hasClassProperties(object)).toBe(true);
            object = { "results": {} };
            expect(RawResults.Factory.hasClassProperties(object)).toBe(false);
            object = { "head": {}, results: {} };
            expect(RawResults.Factory.hasClassProperties(object)).toBe(true);
            object = { "boolean": {} };
            expect(RawResults.Factory.hasClassProperties(object)).toBe(false);
            object = { "head": {}, boolean: {} };
            expect(RawResults.Factory.hasClassProperties(object)).toBe(true);
            expect(RawResults.Factory.hasClassProperties(null)).toBe(false);
            expect(RawResults.Factory.hasClassProperties(undefined)).toBe(false);
        });
        it(JasmineExtender_1.hasMethod(JasmineExtender_1.STATIC, "is", "Returns true if the object provided is a `Carbon.SPARQL.RawResult.Class` object", [
            { name: "value", type: "any" }
        ], { type: "boolean" }), function () {
            expect(RawResults.Factory.is).toBeDefined();
            expect(Utils.isFunction(RawResults.Factory.is)).toBe(true);
            var object;
            object = { "head": {} };
            expect(RawResults.Factory.is(object)).toBe(true);
            object = { "head": {}, results: {} };
            expect(RawResults.Factory.is(object)).toBe(true);
            object = { "head": {}, boolean: {} };
            expect(RawResults.Factory.is(object)).toBe(true);
            object = { "boolean": {} };
            expect(RawResults.Factory.is(object)).toBe(false);
            object = { "results": {} };
            expect(RawResults.Factory.is(object)).toBe(false);
            expect(RawResults.Factory.is("another thing")).toBe(false);
            expect(RawResults.Factory.is(100)).toBe(false);
            expect(RawResults.Factory.is({})).toBe(false);
            expect(RawResults.Factory.is([])).toBe(false);
            expect(RawResults.Factory.is(null)).toBe(false);
            expect(RawResults.Factory.is(undefined)).toBe(false);
        });
    });
});
