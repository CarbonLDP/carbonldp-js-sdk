"use strict";
var JasmineExtender_1 = require("./test/JasmineExtender");
var Utils = require("./Utils");
var NS = require("./NS");
var APIDescription = require("./APIDescription");
describe(JasmineExtender_1.module("Carbon/APIDescription"), function () {
    it(JasmineExtender_1.isDefined(), function () {
        expect(APIDescription).toBeDefined();
        expect(Utils.isObject(APIDescription)).toBe(true);
    });
    it(JasmineExtender_1.hasProperty(JasmineExtender_1.STATIC, "RDF_CLASS", "string"), function () {
        expect(APIDescription.RDF_CLASS).toBeDefined();
        expect(Utils.isString(APIDescription.RDF_CLASS)).toBe(true);
        expect(APIDescription.RDF_CLASS).toBe(NS.C.Class.API);
    });
    it(JasmineExtender_1.hasProperty(JasmineExtender_1.STATIC, "SCHEMA", "Carbon.ObjectSchema.Class"), function () {
        expect(APIDescription.SCHEMA).toBeDefined();
        expect(Utils.isObject(APIDescription.SCHEMA)).toBe(true);
        expect(Utils.hasProperty(APIDescription.SCHEMA, "version")).toBe(true);
        expect(APIDescription.SCHEMA["version"]).toEqual({
            "@id": NS.C.Predicate.version,
            "@type": NS.XSD.DataType.string
        });
        expect(Utils.hasProperty(APIDescription.SCHEMA, "buildDate")).toBe(true);
        expect(APIDescription.SCHEMA["buildDate"]).toEqual({
            "@id": NS.C.Predicate.buildDate,
            "@type": NS.XSD.DataType.dateTime
        });
    });
});
