"use strict";
var JasmineExtender_1 = require("./../test/JasmineExtender");
var Utils = require("./../Utils");
var NS = require("./../NS");
var RDFSource = require("./RDFSource");
describe(JasmineExtender_1.module("Carbon/LDP/RDFSource"), function () {
    it(JasmineExtender_1.isDefined(), function () {
        expect(RDFSource).toBeDefined();
        expect(Utils.isObject(RDFSource)).toBe(true);
    });
    it(JasmineExtender_1.hasProperty(JasmineExtender_1.STATIC, "RDF_CLASS", "string"), function () {
        expect(RDFSource.RDF_CLASS).toBeDefined();
        expect(Utils.isString(RDFSource.RDF_CLASS)).toBe(true);
        expect(RDFSource.RDF_CLASS).toBe(NS.LDP.Class.RDFSource);
    });
    it(JasmineExtender_1.hasProperty(JasmineExtender_1.STATIC, "SCHEMA", "Carbon.ObjectSchema.Class"), function () {
        expect(RDFSource.SCHEMA).toBeDefined();
        expect(Utils.isObject(RDFSource.SCHEMA)).toBe(true);
        expect(Utils.hasProperty(RDFSource.SCHEMA, "created")).toBe(true);
        expect(RDFSource.SCHEMA["created"]).toEqual({
            "@id": NS.C.Predicate.created,
            "@type": NS.XSD.DataType.dateTime
        });
        expect(Utils.hasProperty(RDFSource.SCHEMA, "modified")).toBe(true);
        expect(RDFSource.SCHEMA["modified"]).toEqual({
            "@id": NS.C.Predicate.modified,
            "@type": NS.XSD.DataType.dateTime
        });
    });
    describe(JasmineExtender_1.clazz("Carbon.LDP.RDFSource.Factory", "Factory class for RDFSource objects"), function () {
        it(JasmineExtender_1.isDefined(), function () {
            expect(RDFSource.Factory).toBeDefined();
            expect(Utils.isFunction(RDFSource.Factory)).toBe(true);
        });
    });
});
