"use strict";
var JasmineExtender_1 = require("./test/JasmineExtender");
var NS = require("./NS");
var Pointer = require("./Pointer");
var Utils = require("./Utils");
var Resource = require("./Resource");
describe(JasmineExtender_1.module("Carbon/Resource"), function () {
    it(JasmineExtender_1.isDefined(), function () {
        expect(Resource).toBeDefined();
        expect(Utils.isObject(Resource)).toBe(true);
    });
    describe(JasmineExtender_1.clazz("Carbon.Resource.Factory", "Factory class for Resource objects."), function () {
        it(JasmineExtender_1.isDefined(), function () {
            expect(Resource.Factory).toBeDefined();
            expect(Utils.isFunction(Resource.Factory)).toBe(true);
        });
        it(JasmineExtender_1.hasMethod(JasmineExtender_1.STATIC, "hasClassProperties", "Returns true if the object provided has the properties and functions of a Resource object", [
            { name: "resource", type: "Object" }
        ], { type: "boolean" }), function () {
            expect(Resource.Factory.hasClassProperties).toBeDefined();
            expect(Utils.isFunction(Resource.Factory.hasClassProperties)).toBe(true);
            var resource = undefined;
            expect(Resource.Factory.hasClassProperties(resource)).toBe(false);
            resource = {};
            expect(Resource.Factory.hasClassProperties(resource)).toBe(false);
            resource["types"] = null;
            expect(Resource.Factory.hasClassProperties(resource)).toBe(true);
        });
        it(JasmineExtender_1.hasMethod(JasmineExtender_1.STATIC, "is", "Returns true if the object is a `Carbon.Resource.Class` (by duck type)", [
            { name: "resource", type: "Object" }
        ], { type: "boolean" }), function () {
            var object = undefined;
            expect(Resource.Factory.is(object)).toBe(false);
            object = {};
            expect(Resource.Factory.is(object)).toBe(false);
            object["types"] = null;
            expect(Resource.Factory.is(object)).toBe(false);
            var resource = Pointer.Factory.decorate(object);
            expect(Resource.Factory.is(resource)).toBe(true);
            resource = Pointer.Factory.create();
            resource["types"] = null;
            expect(Resource.Factory.is(resource)).toBe(true);
        });
        it(JasmineExtender_1.hasMethod(JasmineExtender_1.STATIC, "create", "Create a Resource object with id and types if provided.", [
            { name: "id", type: "string", optional: true },
            { name: "types", type: "string[]", optional: true }
        ], { type: "Carbon.Resource.Class" }), function () {
            expect(Resource.Factory.create).toBeDefined();
            expect(Utils.isFunction(Resource.Factory.create)).toBe(true);
            var resource;
            resource = Resource.Factory.create();
            expect(resource).toBeTruthy();
            expect(Resource.Factory.hasClassProperties(resource)).toBe(true);
            expect(resource.id).toBe("");
            expect(Utils.isArray(resource.types)).toBe(true);
            expect(resource.types.length).toBe(0);
            resource = Resource.Factory.create("http://example.com/resource/");
            expect(resource).toBeTruthy();
            expect(Resource.Factory.hasClassProperties(resource)).toBe(true);
            expect(resource.id).toBe("http://example.com/resource/");
            expect(Utils.isArray(resource.types)).toBe(true);
            expect(resource.types.length).toBe(0);
            resource = Resource.Factory.create("http://example.com/resource/", [NS.LDP.Class.RDFSource]);
            expect(resource).toBeTruthy();
            expect(Resource.Factory.hasClassProperties(resource)).toBe(true);
            expect(resource.id).toBe("http://example.com/resource/");
            expect(Utils.isArray(resource.types)).toBe(true);
            expect(resource.types.length).toBe(1);
            expect(resource.types).toEqual([NS.LDP.Class.RDFSource]);
            resource = Resource.Factory.create(null, [NS.LDP.Class.RDFSource, NS.LDP.Class.Container]);
            expect(resource).toBeTruthy();
            expect(Resource.Factory.hasClassProperties(resource)).toBe(true);
            expect(resource.id).toBe("");
            expect(Utils.isArray(resource.types)).toBe(true);
            expect(resource.types.length).toBe(2);
            expect(resource.types).toEqual([NS.LDP.Class.RDFSource, NS.LDP.Class.Container]);
        });
        it(JasmineExtender_1.hasMethod(JasmineExtender_1.STATIC, "createFrom", "Create a Resource object with id and types if provided.", [
            { name: "object", type: "T extends Object" },
            { name: "id", type: "string", optional: true },
            { name: "types", type: "string[]", optional: true }
        ], { type: "T & Carbon.Resource.Class" }), function () {
            expect(Resource.Factory.createFrom).toBeDefined();
            expect(Utils.isFunction(Resource.Factory.createFrom)).toBe(true);
            var simpleResource = Resource.Factory.createFrom({}, "http://example.com/simple-resource/");
            expect(simpleResource).toBeTruthy();
            expect(Resource.Factory.hasClassProperties(simpleResource)).toBe(true);
            expect(simpleResource.id).toBe("http://example.com/simple-resource/");
            expect(Utils.isArray(simpleResource.types)).toBe(true);
            expect(simpleResource.types.length).toBe(0);
            var resource;
            resource = Resource.Factory.createFrom({ myProperty: "a property" });
            expect(resource).toBeTruthy();
            expect(Resource.Factory.hasClassProperties(resource)).toBe(true);
            expect(resource.id).toBe("");
            expect(Utils.isArray(resource.types)).toBe(true);
            expect(resource.types.length).toBe(0);
            expect(resource.myProperty).toBeDefined();
            expect(resource.myProperty).toBe("a property");
            resource = Resource.Factory.createFrom({ myProperty: "a property" }, "http://example.com/resource/");
            expect(resource).toBeTruthy();
            expect(Resource.Factory.hasClassProperties(resource)).toBe(true);
            expect(resource.id).toBe("http://example.com/resource/");
            expect(Utils.isArray(resource.types)).toBe(true);
            expect(resource.types.length).toBe(0);
            expect(resource.myProperty).toBeDefined();
            expect(resource.myProperty).toBe("a property");
            resource = Resource.Factory.createFrom({ myProperty: "a property" }, "http://example.com/resource/", [NS.LDP.Class.RDFSource]);
            expect(resource).toBeTruthy();
            expect(Resource.Factory.hasClassProperties(resource)).toBe(true);
            expect(resource.id).toBe("http://example.com/resource/");
            expect(Utils.isArray(resource.types)).toBe(true);
            expect(resource.types.length).toBe(1);
            expect(resource.types).toEqual([NS.LDP.Class.RDFSource]);
            expect(resource.myProperty).toBeDefined();
            expect(resource.myProperty).toBe("a property");
            resource = Resource.Factory.createFrom({ myProperty: "a property" }, null, [NS.LDP.Class.RDFSource, NS.LDP.Class.Container]);
            expect(resource).toBeTruthy();
            expect(Resource.Factory.hasClassProperties(resource)).toBe(true);
            expect(resource.id).toBe("");
            expect(Utils.isArray(resource.types)).toBe(true);
            expect(resource.types.length).toBe(2);
            expect(resource.types).toEqual([NS.LDP.Class.RDFSource, NS.LDP.Class.Container]);
            expect(resource.myProperty).toBeDefined();
            expect(resource.myProperty).toBe("a property");
        });
        it(JasmineExtender_1.hasMethod(JasmineExtender_1.STATIC, "decorate", "Decorates the object provided with the elements of a Resource object.", [
            { name: "object", type: "T extends Object" }
        ], { type: "T & Carbon.Resource.Class" }), function () {
            expect(Resource.Factory.decorate).toBeDefined();
            expect(Utils.isFunction(Resource.Factory.decorate)).toBe(true);
            var resource;
            resource = Resource.Factory.decorate({});
            expect(Resource.Factory.hasClassProperties(resource)).toBe(true);
            expect(resource.types).toEqual([]);
            resource = Resource.Factory.decorate({ myProperty: "a property" });
            expect(Resource.Factory.hasClassProperties(resource)).toBe(true);
            expect(resource.myProperty).toBeDefined();
            expect(resource.myProperty).toBe("a property");
            expect(resource.types).toEqual([]);
            resource.types = [NS.LDP.Class.RDFSource];
            resource = Resource.Factory.decorate(resource);
            expect(resource.types).toEqual([NS.LDP.Class.RDFSource]);
        });
    });
});
