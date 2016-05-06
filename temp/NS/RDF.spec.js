"use strict";
var JasmineExtender_1 = require("./../test/JasmineExtender");
var Utils = require("./../Utils");
var RDF = require("./RDF");
describe(JasmineExtender_1.module("Carbon/NS/RDF"), function () {
    it(JasmineExtender_1.isDefined(), function () {
        expect(RDF).toBeDefined();
        expect(Utils.isObject(RDF)).toBe(true);
    });
    it(JasmineExtender_1.hasProperty(JasmineExtender_1.STATIC, "namespace", "string"), function () {
        expect(RDF.namespace).toBeDefined();
        expect(Utils.isString(RDF.namespace)).toBe(true);
        expect(RDF.namespace).toBe("http://www.w3.org/1999/02/22-rdf-syntax-ns#");
    });
    describe(JasmineExtender_1.clazz("Carbon.NS.RDF.Predicate", "Class that contains predicates defined in the RDF Syntax Specification"), function () {
        it(JasmineExtender_1.isDefined(), function () {
            expect(RDF.Predicate).toBeDefined();
            expect(Utils.isFunction(RDF.Predicate)).toBe(true);
            expect(Object.keys(RDF.Predicate).length).toBe(1);
        });
        it(JasmineExtender_1.hasProperty(JasmineExtender_1.STATIC, "type", "string"), function () {
            expect(RDF.Predicate.type).toBeDefined();
            expect(Utils.isString(RDF.Predicate.type)).toBe(true);
            expect(RDF.Predicate.type).toBe("http://www.w3.org/1999/02/22-rdf-syntax-ns#type");
        });
    });
});
