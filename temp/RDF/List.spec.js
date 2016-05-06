"use strict";
var JasmineExtender_1 = require("./../test/JasmineExtender");
var Utils = require("./../Utils");
var List = require("./List");
describe(JasmineExtender_1.module("Carbon/RDF/List"), function () {
    it(JasmineExtender_1.isDefined(), function () {
        expect(List).toBeDefined();
        expect(Utils.isObject(List)).toBe(true);
    });
    describe(JasmineExtender_1.clazz("Carbon.RDF.List.Factory", "Class Factory to manage creation and management of List objects"), function () {
        it(JasmineExtender_1.isDefined(), function () {
            expect(List.Factory).toBeDefined();
            expect(Utils.isFunction(List.Factory)).toBe(true);
        });
        it(JasmineExtender_1.hasMethod(JasmineExtender_1.STATIC, "is", "Returns true if the object provided can be called a RDF List", [
            { name: "value", type: "any" }
        ], { type: "boolean" }), function () {
            expect(List.Factory.is).toBeDefined();
            expect(Utils.isFunction(List.Factory.is)).toBe(true);
            expect(List.Factory.is({ "@list": [] })).toBe(true);
            expect(List.Factory.is({ "@list": ["a"] })).toBe(true);
            expect(List.Factory.is({ "@list": [{ "@value": "a", "@type": "xsd:string" }, { "@value": 1, "@type": "xsd:number" }] })).toBe(true);
            expect(List.Factory.is({ "@list": [1, 2, 3] })).toBe(true);
            expect(List.Factory.is({ "@list": "something else" })).toBe(false);
            expect(List.Factory.is({ "@list": 1 })).toBe(false);
            expect(List.Factory.is({ "list": [] })).toBe(false);
            expect(List.Factory.is({ "something": "else" })).toBe(false);
            expect(List.Factory.is({})).toBe(false);
        });
    });
});
