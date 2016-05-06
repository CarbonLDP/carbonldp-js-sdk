"use strict";
var IndirectContainer = require("./IndirectContainer");
var JasmineExtender_1 = require("./../test/JasmineExtender");
var Utils = require("./../Utils");
var NS = require("./../NS");
describe(JasmineExtender_1.module("Carbon/LDP/IndirectContainer"), function () {
    it(JasmineExtender_1.isDefined(), function () {
        expect(IndirectContainer).toBeDefined();
        expect(Utils.isObject(IndirectContainer)).toBe(true);
    });
    it(JasmineExtender_1.hasProperty(JasmineExtender_1.STATIC, "RDF_CLASS", "string"), function () {
        expect(IndirectContainer.RDF_CLASS).toBeDefined();
        expect(Utils.isString(IndirectContainer.RDF_CLASS)).toBe(true);
        expect(IndirectContainer.RDF_CLASS).toBe(NS.LDP.Class.IndirectContainer);
    });
    describe(JasmineExtender_1.clazz("Carbon.IndirectContainer.Factory", "Factory class for `Carbon.LDP.IndirectContainer.Class` objects"), function () {
        it(JasmineExtender_1.isDefined(), function () {
            expect(IndirectContainer.Factory).toBeDefined();
            expect(Utils.isFunction(IndirectContainer.Factory)).toBe(true);
        });
        it(JasmineExtender_1.hasMethod(JasmineExtender_1.STATIC, "hasClassProperties", "Returns true if the object provided has the properties that defines a `Carbon.LDP.IndirectContainer.Class` object", [
            { name: "resource", type: "Object" }
        ], { type: "boolean" }), function () {
            expect(IndirectContainer.Factory.hasClassProperties).toBeDefined();
            expect(Utils.isFunction(IndirectContainer.Factory.hasClassProperties)).toBe(true);
            var object = {};
            expect(IndirectContainer.Factory.hasClassProperties(object)).toBe(false);
            object.insertedContentRelation = "http://example.com/myNamespace#some-wrapper-relation";
            expect(IndirectContainer.Factory.hasClassProperties(object)).toBe(true);
        });
    });
});
