"use strict";
var AccessPoint = require("./AccessPoint");
var JasmineExtender_1 = require("./test/JasmineExtender");
var Utils = require("./Utils");
var NS = require("./NS");
var Pointer = require("./Pointer");
var DirectContainer = require("./LDP/DirectContainer");
describe(JasmineExtender_1.module("Carbon/AccessPoints"), function () {
    it(JasmineExtender_1.isDefined(), function () {
        expect(AccessPoint).toBeDefined();
        expect(Utils.isObject(AccessPoint)).toBe(true);
    });
    it(JasmineExtender_1.hasProperty(JasmineExtender_1.STATIC, "RDF_CLASS", "string"), function () {
        expect(AccessPoint.RDF_CLASS).toBeDefined();
        expect(Utils.isString(AccessPoint.RDF_CLASS)).toBe(true);
        expect(AccessPoint.RDF_CLASS).toBe(NS.C.Class.AccessPoint);
    });
    describe(JasmineExtender_1.clazz("Carbon.AccessPoint.Factory", "Factory class for `Carbon.AccessPoint.Class` objects"), function () {
        it(JasmineExtender_1.isDefined(), function () {
            expect(AccessPoint.Factory).toBeDefined();
            expect(Utils.isFunction(AccessPoint.Factory)).toBe(true);
        });
        it(JasmineExtender_1.hasMethod(JasmineExtender_1.STATIC, "hasClassProperties", "Returns true if the object provided has the properties that defines a `Carbon.AccessPoint.Class` object", [
            { name: "resource", type: "Object" }
        ], { type: "boolean" }), function () {
            expect(AccessPoint.Factory.hasClassProperties).toBeDefined();
            expect(Utils.isFunction(AccessPoint.Factory.hasClassProperties)).toBe(true);
            var object = {};
            expect(AccessPoint.Factory.hasClassProperties(object)).toBe(false);
            object.membershipResource = "http://some-membership-resource.com";
            expect(AccessPoint.Factory.hasClassProperties(object)).toBe(true);
        });
        it(JasmineExtender_1.hasMethod(JasmineExtender_1.STATIC, "create", "Create a `Carbon.AccessPoint.Class` object with the parameters specified.", [
            { name: "membershipResource", type: "Carbon.Pointer.Class" },
            { name: "hasMemberRelation", type: "string | Carbon.Pointer.Class" },
            { name: "memberOfRelation", type: "string | Carbon.Pointer.Class", optional: true }
        ], { type: "Carbon.AccessPoint.Class" }), function () {
            expect(AccessPoint.Factory.create).toBeDefined();
            expect(Utils.isFunction(AccessPoint.Factory.create)).toBe(true);
            var spy = spyOn(AccessPoint.Factory, "createFrom");
            var pointer = Pointer.Factory.create();
            AccessPoint.Factory.create(pointer, "http://example.com/myNamespace#some-relation");
            expect(spy).toHaveBeenCalledWith({}, pointer, "http://example.com/myNamespace#some-relation", undefined);
            spy.calls.reset();
            AccessPoint.Factory.create(pointer, pointer);
            expect(spy).toHaveBeenCalledWith({}, pointer, pointer, undefined);
            spy.calls.reset();
            AccessPoint.Factory.create(pointer, "http://example.com/myNamespace#some-relation", "http://example.com/myNamespace#some-inverted-relation");
            expect(spy).toHaveBeenCalledWith({}, pointer, "http://example.com/myNamespace#some-relation", "http://example.com/myNamespace#some-inverted-relation");
            spy.calls.reset();
            AccessPoint.Factory.create(pointer, pointer, pointer);
            expect(spy).toHaveBeenCalledWith({}, pointer, pointer, pointer);
        });
        it(JasmineExtender_1.hasMethod(JasmineExtender_1.STATIC, "createFrom", "Create a `Carbon.AccessPoint.Class` object with the object provided.", [
            { name: "object", type: "T extends Object" },
            { name: "membershipResource", type: "Carbon.Pointer.Class" },
            { name: "hasMemberRelation", type: "string | Carbon.Pointer.Class" },
            { name: "memberOfRelation", type: "string | Carbon.Pointer.Class", optional: true }
        ], { type: "T & Carbon.AccessPoint.Class" }), function () {
            expect(AccessPoint.Factory.createFrom).toBeDefined();
            expect(Utils.isFunction(AccessPoint.Factory.createFrom)).toBe(true);
            var spy = spyOn(DirectContainer.Factory, "createFrom");
            var pointer = Pointer.Factory.create();
            AccessPoint.Factory.createFrom({}, pointer, "http://example.com/myNamespace#some-relation");
            expect(spy).toHaveBeenCalledWith({}, pointer, "http://example.com/myNamespace#some-relation", undefined);
            spy.calls.reset();
            AccessPoint.Factory.createFrom({}, pointer, pointer);
            expect(spy).toHaveBeenCalledWith({}, pointer, pointer, undefined);
            spy.calls.reset();
            AccessPoint.Factory.createFrom({}, pointer, "http://example.com/myNamespace#some-relation", "http://example.com/myNamespace#some-inverted-relation");
            expect(spy).toHaveBeenCalledWith({}, pointer, "http://example.com/myNamespace#some-relation", "http://example.com/myNamespace#some-inverted-relation");
            spy.calls.reset();
            AccessPoint.Factory.createFrom({}, pointer, pointer, pointer);
            expect(spy).toHaveBeenCalledWith({}, pointer, pointer, pointer);
        });
    });
});
