"use strict";
var JasmineExtender_1 = require("./../../test/JasmineExtender");
var Utils = require("./../../Utils");
var XSD = require("./Serializers/XSD");
var Serializers = require("./Serializers");
describe(JasmineExtender_1.module("Carbon/RDF/Literal/Serializers"), function () {
    it(JasmineExtender_1.isDefined(), function () {
        expect(Serializers).toBeDefined();
        expect(Utils.isObject(Serializers)).toBe(true);
    });
    it(JasmineExtender_1.reexports(JasmineExtender_1.STATIC, "XSD", "Carbon/RDF/Literal/Serializers/XSD"), function () {
        expect(Serializers.XSD).toBeDefined();
        expect(Serializers.XSD).toBe(XSD);
    });
});
