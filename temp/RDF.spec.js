"use strict";
var JasmineExtender_1 = require("./test/JasmineExtender");
var Utils = require("./Utils");
var Literal = require("./RDF/Literal");
var Document = require("./RDF/Document");
var List = require("./RDF/List");
var Node = require("./RDF/RDFNode");
var URI = require("./RDF/URI");
var Value = require("./RDF/Value");
var RDF = require("./RDF");
describe(JasmineExtender_1.module("Carbon/RDF"), function () {
    it(JasmineExtender_1.isDefined(), function () {
        expect(RDF).toBeDefined();
        expect(Utils.isObject(RDF)).toBe(true);
    });
    it(JasmineExtender_1.reexports(JasmineExtender_1.STATIC, "Literal", "Carbon/RDF/Literal"), function () {
        expect(RDF.Literal).toBeDefined();
        expect(RDF.Literal).toBe(Literal);
    });
    it(JasmineExtender_1.reexports(JasmineExtender_1.STATIC, "Document", "Carbon/RDF/Document"), function () {
        expect(RDF.Document).toBeDefined();
        expect(RDF.Document).toBe(Document);
    });
    it(JasmineExtender_1.reexports(JasmineExtender_1.STATIC, "List", "Carbon/RDF/List"), function () {
        expect(RDF.List).toBeDefined();
        expect(RDF.List).toBe(List);
    });
    it(JasmineExtender_1.reexports(JasmineExtender_1.STATIC, "Node", "Carbon/RDF/Node"), function () {
        expect(RDF.Node).toBeDefined();
        expect(RDF.Node).toBe(Node);
    });
    it(JasmineExtender_1.reexports(JasmineExtender_1.STATIC, "URI", "Carbon/RDF/URI"), function () {
        expect(RDF.URI).toBeDefined();
        expect(RDF.URI).toBe(URI);
    });
    it(JasmineExtender_1.reexports(JasmineExtender_1.STATIC, "Value", "Carbon/RDF/Value"), function () {
        expect(RDF.Value).toBeDefined();
        expect(RDF.Value).toBe(Value);
    });
});
