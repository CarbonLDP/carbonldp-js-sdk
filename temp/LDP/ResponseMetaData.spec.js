"use strict";
var JasmineExtender_1 = require("../test/JasmineExtender");
var NS = require("./../NS");
var Resource = require("./../Resource");
var Utils = require("./../Utils");
var ResponseMetaData = require("./ResponseMetaData");
describe(JasmineExtender_1.module("Carbon/LDP/ResponseMetaData"), function () {
    it(JasmineExtender_1.isDefined(), function () {
        expect(ResponseMetaData).toBeDefined();
        expect(Utils.isObject(ResponseMetaData)).toBe(true);
    });
    it(JasmineExtender_1.hasProperty(JasmineExtender_1.STATIC, "RDF_CLASS", "string"), function () {
        expect(ResponseMetaData.RDF_CLASS).toBeDefined();
        expect(Utils.isString(ResponseMetaData.RDF_CLASS)).toBe(true);
        expect(ResponseMetaData.RDF_CLASS).toBe(NS.C.Class.ResponseMetaData);
    });
    it(JasmineExtender_1.hasProperty(JasmineExtender_1.STATIC, "SCHEMA", "Carbon.ObjectSchema.Class"), function () {
        expect(ResponseMetaData.SCHEMA).toBeDefined();
        expect(Utils.isObject(ResponseMetaData.SCHEMA)).toBe(true);
        expect(Utils.hasProperty(ResponseMetaData.SCHEMA, "responsePropertyResource")).toBe(true);
        expect(ResponseMetaData.SCHEMA["responsePropertyResource"]).toEqual({
            "@id": NS.C.Predicate.responsePropertyResource,
            "@type": "@id",
        });
        expect(Utils.hasProperty(ResponseMetaData.SCHEMA, "eTag")).toBe(true);
        expect(ResponseMetaData.SCHEMA["eTag"]).toEqual({
            "@id": NS.C.Predicate.eTag,
            "@type": NS.XSD.DataType.string,
        });
    });
    describe(JasmineExtender_1.clazz("Carbon.LDP.ResponseMetaData.Factory", "Factory class form `Carbon.LDP.ResponseMetaData.Class` objects."), function () {
        it(JasmineExtender_1.isDefined(), function () {
            expect(ResponseMetaData.Factory).toBeDefined();
            expect(Utils.isFunction(ResponseMetaData.Factory)).toBe(true);
        });
        it(JasmineExtender_1.hasMethod(JasmineExtender_1.STATIC, "hasClassProperties", "Return true if the object provided has the properties of a `Carbon.LDP.ResponseMetaData.Class` object.", [
            { name: "object", type: "Object", description: "Object to check." }
        ], { type: "boolean" }), function () {
            expect(ResponseMetaData.Factory.hasClassProperties).toBeDefined();
            expect(Utils.isFunction(ResponseMetaData.Factory.hasClassProperties)).toBe(true);
            var object;
            expect(ResponseMetaData.Factory.hasClassProperties(object)).toBe(false);
            object = null;
            expect(ResponseMetaData.Factory.hasClassProperties(object)).toBe(false);
            object = {};
            expect(ResponseMetaData.Factory.hasClassProperties(object)).toBe(false);
            object["responsePropertyResource"] = null;
            expect(ResponseMetaData.Factory.hasClassProperties(object)).toBe(false);
            object["eTag"] = null;
            expect(ResponseMetaData.Factory.hasClassProperties(object)).toBe(true);
        });
        it(JasmineExtender_1.hasMethod(JasmineExtender_1.STATIC, "is", "Return true if the object provided can be classified as a `Carbon.LDP.ResponseMetaData.Class` object.", [
            { name: "object", type: "Object", description: "Object to check." }
        ], { type: "boolean" }), function () {
            expect(ResponseMetaData.Factory.is).toBeDefined();
            expect(Utils.isFunction(ResponseMetaData.Factory.is)).toBe(true);
            var object;
            expect(ResponseMetaData.Factory.is(object)).toBe(false);
            object = null;
            expect(ResponseMetaData.Factory.is(object)).toBe(false);
            object = {};
            expect(ResponseMetaData.Factory.is(object)).toBe(false);
            object["responsePropertyResource"] = null;
            expect(ResponseMetaData.Factory.is(object)).toBe(false);
            object["eTag"] = null;
            expect(ResponseMetaData.Factory.is(object)).toBe(false);
            Resource.Factory.decorate(object);
            expect(ResponseMetaData.Factory.is(object)).toBe(false);
            object["types"].push(NS.C.Class.VolatileResource);
            expect(ResponseMetaData.Factory.is(object)).toBe(false);
            object["types"].push(NS.C.Class.ResponseMetaData);
            expect(ResponseMetaData.Factory.is(object)).toBe(true);
        });
        it(JasmineExtender_1.hasMethod(JasmineExtender_1.STATIC, "hasRDFClass", "Return true if the object provided have the RDF_CLASS of a ResponseMetaData, either if it's a Resource or a RDF object.", [
            { name: "object", type: "Object", description: "Object to check." }
        ], { type: "boolean" }), function () {
            expect(ResponseMetaData.Factory.hasRDFClass).toBeDefined();
            expect(Utils.isFunction(ResponseMetaData.Factory.hasRDFClass)).toBe(true);
            var object;
            expect(ResponseMetaData.Factory.hasRDFClass(object)).toBe(false);
            object = null;
            expect(ResponseMetaData.Factory.hasRDFClass(object)).toBe(false);
            object = {};
            expect(ResponseMetaData.Factory.hasRDFClass(object)).toBe(false);
            object = { types: [NS.C.Class.VolatileResource] };
            expect(ResponseMetaData.Factory.hasRDFClass(object)).toBe(false);
            object = { types: [NS.C.Class.ResponseMetaData] };
            expect(ResponseMetaData.Factory.hasRDFClass(object)).toBe(true);
            object = { types: [NS.C.Class.VolatileResource, NS.C.Class.ResponseMetaData] };
            expect(ResponseMetaData.Factory.hasRDFClass(object)).toBe(true);
            object = { types: [NS.C.Class.ResponseMetaData, NS.C.Class.VolatileResource] };
            expect(ResponseMetaData.Factory.hasRDFClass(object)).toBe(true);
            object = { "@type": [NS.C.Class.VolatileResource] };
            expect(ResponseMetaData.Factory.hasRDFClass(object)).toBe(false);
            object = { "@type": [NS.C.Class.ResponseMetaData] };
            expect(ResponseMetaData.Factory.hasRDFClass(object)).toBe(true);
            object = { "@type": [NS.C.Class.VolatileResource, NS.C.Class.ResponseMetaData] };
            expect(ResponseMetaData.Factory.hasRDFClass(object)).toBe(true);
            object = { "@type": [NS.C.Class.ResponseMetaData, NS.C.Class.VolatileResource] };
            expect(ResponseMetaData.Factory.hasRDFClass(object)).toBe(true);
        });
    });
});
