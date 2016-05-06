"use strict";
var JasmineExtender_1 = require("./test/JasmineExtender");
var Utils = require("./Utils");
var C = require("./NS/C");
var CP = require("./NS/CP");
var CS = require("./NS/CS");
var LDP = require("./NS/LDP");
var RDF = require("./NS/RDF");
var XSD = require("./NS/XSD");
var VCARD = require("./NS/VCARD");
var NS = require("./NS");
describe(JasmineExtender_1.module("Carbon/NS"), function () {
    it(JasmineExtender_1.isDefined(), function () {
        expect(NS).toBeDefined();
        expect(Utils.isObject(NS)).toBe(true);
    });
    it(JasmineExtender_1.reexports(JasmineExtender_1.STATIC, "C", "Carbon/NS/C"), function () {
        expect(NS.C).toBeDefined();
        expect(NS.C).toBe(C);
    });
    it(JasmineExtender_1.reexports(JasmineExtender_1.STATIC, "CP", "Carbon/NS/CP"), function () {
        expect(NS.CP).toBeDefined();
        expect(NS.CP).toBe(CP);
    });
    it(JasmineExtender_1.reexports(JasmineExtender_1.STATIC, "CS", "Carbon/NS/CS"), function () {
        expect(NS.CS).toBeDefined();
        expect(NS.CS).toBe(CS);
    });
    it(JasmineExtender_1.reexports(JasmineExtender_1.STATIC, "LDP", "Carbon/NS/LDP"), function () {
        expect(NS.LDP).toBeDefined();
        expect(NS.LDP).toBe(LDP);
    });
    it(JasmineExtender_1.reexports(JasmineExtender_1.STATIC, "RDF", "Carbon/NS/RDF"), function () {
        expect(NS.RDF).toBeDefined();
        expect(NS.RDF).toBe(RDF);
    });
    it(JasmineExtender_1.reexports(JasmineExtender_1.STATIC, "XSD", "Carbon/NS/XSD"), function () {
        expect(NS.XSD).toBeDefined();
        expect(NS.XSD).toBe(XSD);
    });
    it(JasmineExtender_1.reexports(JasmineExtender_1.STATIC, "VCARD", "Carbon/NS/VCARD"), function () {
        expect(NS.VCARD).toBeDefined();
        expect(NS.VCARD).toBe(VCARD);
    });
});
