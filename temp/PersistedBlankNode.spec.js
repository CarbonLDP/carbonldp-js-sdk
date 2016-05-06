"use strict";
var JasmineExtender_1 = require("./test/JasmineExtender");
var NS = require("./NS");
var Utils = require("./Utils");
var PersistedBlankNode = require("./PersistedBlankNode");
describe(JasmineExtender_1.module("Carbon/LDP/PersistedBlankNode"), function () {
    it(JasmineExtender_1.isDefined(), function () {
        expect(PersistedBlankNode).toBeDefined();
        expect(Utils.isObject(PersistedBlankNode)).toBe(true);
    });
    it(JasmineExtender_1.hasProperty(JasmineExtender_1.STATIC, "SCHEMA", "Carbon.ObjectSchema.Class"), function () {
        expect(PersistedBlankNode.SCHEMA).toBeDefined();
        expect(Utils.isObject(PersistedBlankNode.SCHEMA)).toBe(true);
        expect(Utils.hasProperty(PersistedBlankNode.SCHEMA, "bNodeIdentifier")).toBe(true);
        expect(PersistedBlankNode.SCHEMA["bNodeIdentifier"]).toEqual({
            "@id": NS.C.Predicate.bNodeIdentifier,
            "@type": NS.XSD.DataType.string
        });
    });
});
