"use strict";
var JasmineExtender_1 = require("../test/JasmineExtender");
var NS = require("./../NS");
var Resource = require("./../Resource");
var Utils = require("./../Utils");
var VolatileResource = require("./VolatileResource");
describe(JasmineExtender_1.module("Carbon/LDP/VolatileResource"), function () {
    it(JasmineExtender_1.isDefined(), function () {
        expect(VolatileResource).toBeDefined();
        expect(Utils.isObject(VolatileResource)).toBe(true);
    });
    it(JasmineExtender_1.hasProperty(JasmineExtender_1.STATIC, "RDF_CLASS", "string"), function () {
        expect(VolatileResource.RDF_CLASS).toBeDefined();
        expect(Utils.isString(VolatileResource.RDF_CLASS)).toBe(true);
        expect(VolatileResource.RDF_CLASS).toBe(NS.C.Class.VolatileResource);
    });
    describe(JasmineExtender_1.clazz("Carbon.LDP.VolatileResource.Factory", "Factory class form `Carbon.LDP.VolatileResource.Class` objects."), function () {
        it(JasmineExtender_1.isDefined(), function () {
            expect(VolatileResource.Factory).toBeDefined();
            expect(Utils.isFunction(VolatileResource.Factory)).toBe(true);
        });
        it(JasmineExtender_1.hasMethod(JasmineExtender_1.STATIC, "is", "Return true if the object provided can be classified as a `Carbon.LDP.VolatileResource.Class` object.", [
            { name: "object", type: "Object", description: "Object to check." }
        ], { type: "boolean" }), function () {
            expect(VolatileResource.Factory.is).toBeDefined();
            expect(Utils.isFunction(VolatileResource.Factory.is)).toBe(true);
            var object;
            expect(VolatileResource.Factory.is(object)).toBe(false);
            object = null;
            expect(VolatileResource.Factory.is(object)).toBe(false);
            object = {};
            expect(VolatileResource.Factory.is(object)).toBe(false);
            Resource.Factory.decorate(object);
            expect(VolatileResource.Factory.is(object)).toBe(false);
            object["types"].push(NS.C.Class.VolatileResource);
            expect(VolatileResource.Factory.is(object)).toBe(true);
        });
        it(JasmineExtender_1.hasMethod(JasmineExtender_1.STATIC, "hasRDFClass", "Return true if the object provided have the RDF_CLASS of a VolatileResource, either if it's a Resource or a RDF object.", [
            { name: "object", type: "Object", description: "Object to check." }
        ], { type: "boolean" }), function () {
            expect(VolatileResource.Factory.hasRDFClass).toBeDefined();
            expect(Utils.isFunction(VolatileResource.Factory.hasRDFClass)).toBe(true);
            var object;
            expect(VolatileResource.Factory.hasRDFClass(object)).toBe(false);
            object = null;
            expect(VolatileResource.Factory.hasRDFClass(object)).toBe(false);
            object = {};
            expect(VolatileResource.Factory.hasRDFClass(object)).toBe(false);
            object = { types: [] };
            expect(VolatileResource.Factory.hasRDFClass(object)).toBe(false);
            object = { types: [NS.C.Class.ResponseMetaData] };
            expect(VolatileResource.Factory.hasRDFClass(object)).toBe(false);
            object = { types: [NS.C.Class.VolatileResource] };
            expect(VolatileResource.Factory.hasRDFClass(object)).toBe(true);
            object = { types: [NS.C.Class.VolatileResource, NS.C.Class.ResponseDescription] };
            expect(VolatileResource.Factory.hasRDFClass(object)).toBe(true);
            object = { types: [NS.CS.Class.Token, NS.C.Class.VolatileResource] };
            expect(VolatileResource.Factory.hasRDFClass(object)).toBe(true);
            object = { "@type": [] };
            expect(VolatileResource.Factory.hasRDFClass(object)).toBe(false);
            object = { "@type": [NS.CS.Class.Token] };
            expect(VolatileResource.Factory.hasRDFClass(object)).toBe(false);
            object = { "@type": [NS.C.Class.VolatileResource] };
            expect(VolatileResource.Factory.hasRDFClass(object)).toBe(true);
            object = { "@type": [NS.CS.Class.Token, NS.C.Class.VolatileResource] };
            expect(VolatileResource.Factory.hasRDFClass(object)).toBe(true);
            object = { "@type": [NS.C.Class.VolatileResource, NS.C.Class.ResponseMetaData] };
            expect(VolatileResource.Factory.hasRDFClass(object)).toBe(true);
        });
    });
});
