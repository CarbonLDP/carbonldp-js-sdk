"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var NonRDFSource = require("./RDFRepresentation");
var JasmineExtender_1 = require("./test/JasmineExtender");
var Utils = require("./Utils");
var NS = require("./NS");
var PersistedDocument = require("./PersistedDocument");
var AbstractContext_1 = require("./AbstractContext");
describe(JasmineExtender_1.module("Carbon/NonRDFSource"), function () {
    it(JasmineExtender_1.isDefined(), function () {
        expect(NonRDFSource).toBeDefined();
        expect(Utils.isObject(NonRDFSource)).toBe(true);
    });
    it(JasmineExtender_1.hasProperty(JasmineExtender_1.STATIC, "RDF_CLASS", "string"), function () {
        expect(NonRDFSource.RDF_CLASS).toBeDefined();
        expect(Utils.isString(NonRDFSource.RDF_CLASS)).toBe(true);
        expect(NonRDFSource.RDF_CLASS).toBe(NS.C.Class.RDFRepresentation);
    });
    it(JasmineExtender_1.hasProperty(JasmineExtender_1.STATIC, "SCHEMA", "Carbon.ObjectSchema.Class"), function () {
        expect(NonRDFSource.SCHEMA).toBeDefined();
        expect(Utils.isObject(NonRDFSource.SCHEMA)).toBe(true);
        expect(Utils.hasProperty(NonRDFSource.SCHEMA, "mediaType")).toBe(true);
        expect(NonRDFSource.SCHEMA["mediaType"]).toEqual({
            "@id": NS.C.Predicate.mediaType,
            "@type": NS.XSD.DataType.string
        });
        expect(Utils.hasProperty(NonRDFSource.SCHEMA, "size")).toBe(true);
        expect(NonRDFSource.SCHEMA["size"]).toEqual({
            "@id": NS.C.Predicate.size,
            "@type": NS.XSD.DataType.long
        });
    });
    describe(JasmineExtender_1.clazz("Carbon.NonRDFSource.Factory", "Factory class for `Carbon.NonRDFSource.Class` objects"), function () {
        it(JasmineExtender_1.isDefined(), function () {
            expect(NonRDFSource.Factory).toBeDefined();
            expect(Utils.isFunction(NonRDFSource.Factory)).toBe(true);
        });
        it(JasmineExtender_1.hasMethod(JasmineExtender_1.STATIC, "hasClassProperties", "Returns true if the object provided has the properties that defines a `Carbon.NonRDFSource.Class` object", [
            { name: "resource", type: "Object" }
        ], { type: "boolean" }), function () {
            expect(NonRDFSource.Factory.hasClassProperties).toBeDefined();
            expect(Utils.isFunction(NonRDFSource.Factory.hasClassProperties)).toBe(true);
            var object = {};
            expect(NonRDFSource.Factory.hasClassProperties(object)).toBe(false);
            object.mediaType = "application/pdf";
            expect(NonRDFSource.Factory.hasClassProperties(object)).toBe(false);
            object.size = 1000;
            expect(NonRDFSource.Factory.hasClassProperties(object)).toBe(true);
        });
        it(JasmineExtender_1.hasMethod(JasmineExtender_1.STATIC, "is", "Returns true if the object provided is considered as an `Carbon.NonRDFSource.Class` object", [
            { name: "object", type: "Object" }
        ], { type: "boolean" }), function () {
            expect(NonRDFSource.Factory.is).toBeDefined();
            expect(Utils.isFunction(NonRDFSource.Factory.is)).toBe(true);
            var object;
            object = {};
            expect(NonRDFSource.Factory.is(object)).toBe(false);
            object.mediaType = "application/pdf";
            expect(NonRDFSource.Factory.is(object)).toBe(false);
            object.size = 1000;
            expect(NonRDFSource.Factory.is(object)).toBe(false);
            var MockedContext = (function (_super) {
                __extends(MockedContext, _super);
                function MockedContext() {
                    _super.apply(this, arguments);
                }
                MockedContext.prototype.resolve = function (uri) {
                    return uri;
                };
                return MockedContext;
            }(AbstractContext_1.default));
            var context = new MockedContext();
            object = PersistedDocument.Factory.create("", context.documents);
            expect(NonRDFSource.Factory.is(object)).toBe(false);
            object.mediaType = "application/pdf";
            expect(NonRDFSource.Factory.is(object)).toBe(false);
            object.size = 1000;
            expect(NonRDFSource.Factory.is(object)).toBe(false);
            object.types.push(NonRDFSource.RDF_CLASS);
            expect(NonRDFSource.Factory.is(object)).toBe(true);
        });
    });
});
