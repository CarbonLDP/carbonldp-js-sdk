"use strict";
var JasmineExtender_1 = require("./test/JasmineExtender");
var Utils = require("./Utils");
var Pointer = require("./Pointer");
describe(JasmineExtender_1.module("Carbon/Pointer"), function () {
    it(JasmineExtender_1.isDefined(), function () {
        expect(Pointer).toBeDefined();
        expect(Utils.isObject(Pointer)).toBe(true);
    });
    describe(JasmineExtender_1.clazz("Carbon.Pointer.Factory", "Factory class for Pointer objects."), function () {
        it(JasmineExtender_1.isDefined(), function () {
            expect(Pointer.Factory).toBeDefined();
            expect(Utils.isFunction(Pointer.Factory)).toBe(true);
        });
        it(JasmineExtender_1.hasMethod(JasmineExtender_1.STATIC, "hasClassProperties", "Returns true if the object provided has the properties and functions of a Pointer object", [
            { name: "resource", type: "Object" }
        ], { type: "boolean" }), function () {
            expect(Pointer.Factory.hasClassProperties).toBeDefined();
            expect(Utils.isFunction(Pointer.Factory.hasClassProperties)).toBe(true);
            var pointer = undefined;
            expect(Pointer.Factory.hasClassProperties(pointer)).toBe(false);
            pointer = {};
            expect(Pointer.Factory.hasClassProperties(pointer)).toBe(false);
            pointer["_id"] = null;
            expect(Pointer.Factory.hasClassProperties(pointer)).toBe(false);
            pointer["_resolved"] = null;
            expect(Pointer.Factory.hasClassProperties(pointer)).toBe(false);
            pointer["id"] = null;
            expect(Pointer.Factory.hasClassProperties(pointer)).toBe(false);
            pointer["isResolved"] = function () { return null; };
            expect(Pointer.Factory.hasClassProperties(pointer)).toBe(false);
            pointer["resolve"] = function () { return null; };
            expect(Pointer.Factory.hasClassProperties(pointer)).toBe(true);
        });
        it(JasmineExtender_1.hasMethod(JasmineExtender_1.STATIC, "is", "Returns true if the value provided is a Pinter object.", [
            { name: "value", type: "any" }
        ], { type: "boolean" }), function () {
            expect(Pointer.Factory.is).toBeDefined();
            expect(Utils.isFunction(Pointer.Factory.is)).toBe(true);
            expect(Pointer.Factory.is(undefined)).toBe(false);
            expect(Pointer.Factory.is(null)).toBe(false);
            expect(Pointer.Factory.is("a string")).toBe(false);
            expect(Pointer.Factory.is(100)).toBe(false);
            expect(Pointer.Factory.is({})).toBe(false);
            var value = {};
            value["_id"] = null;
            value["_resolved"] = null;
            value["id"] = null;
            value["isResolved"] = function () { return null; };
            value["resolve"] = function () { return null; };
            expect(Pointer.Factory.is(value)).toBe(true);
        });
        it(JasmineExtender_1.hasMethod(JasmineExtender_1.STATIC, "create", "Create a Pointer object with id if provided.", [
            { name: "id", type: "string", optional: true }
        ], { type: "Carbon.Pointer.Class" }), function () {
            expect(Pointer.Factory.create).toBeDefined();
            expect(Utils.isFunction(Pointer.Factory.create)).toBe(true);
            var pointer;
            pointer = Pointer.Factory.create();
            expect(pointer).toBeTruthy();
            expect(Pointer.Factory.hasClassProperties(pointer)).toBe(true);
            expect(pointer.id).toBe("");
            pointer = Pointer.Factory.create("http://example.com/pointer/");
            expect(pointer).toBeTruthy();
            expect(Pointer.Factory.hasClassProperties(pointer)).toBe(true);
            expect(pointer.id).toBe("http://example.com/pointer/");
        });
        it(JasmineExtender_1.hasMethod(JasmineExtender_1.STATIC, "decorate", "Decorates the object provided with the elements of a Pointer object.", [
            { name: "object", type: "T extends Object" }
        ], { type: "T & Carbon.Pointer.Class" }), function () {
            expect(Pointer.Factory.decorate).toBeDefined();
            expect(Utils.isFunction(Pointer.Factory.decorate)).toBe(true);
            var pointer;
            pointer = Pointer.Factory.decorate({});
            expect(Pointer.Factory.hasClassProperties(pointer)).toBe(true);
            pointer = Pointer.Factory.decorate({ myProperty: "a property" });
            expect(Pointer.Factory.hasClassProperties(pointer)).toBe(true);
            expect(pointer.myProperty).toBeDefined();
            expect(pointer.myProperty).toBe("a property");
            expect(pointer.isResolved()).toBe(false);
            pointer._resolved = true;
            pointer = Pointer.Factory.decorate(pointer);
            expect(pointer.isResolved()).toBe(true);
        });
        describe(JasmineExtender_1.decoratedObject("Object decorated by the Carbon.Pointer.Factory.decorate function.", [
            "Carbon.Pointer.Class"
        ]), function () {
            var pointer;
            beforeEach(function () {
                pointer = Pointer.Factory.create("http://example.com/pointer/");
            });
            it(JasmineExtender_1.hasProperty(JasmineExtender_1.INSTANCE, "_id", "string", "URI that identifies the pointer."), function () {
                expect(pointer._id).toBeDefined();
                expect(Utils.isString(pointer._id)).toBe(true);
                expect(pointer._id).toBe("http://example.com/pointer/");
            });
            it(JasmineExtender_1.hasProperty(JasmineExtender_1.INSTANCE, "_resolved", "boolean", "Flag variable that indicate if the pointer has been resolved."), function () {
                expect(pointer._resolved).toBeDefined();
                expect(Utils.isBoolean(pointer._resolved)).toBe(true);
                expect(pointer._resolved).toBe(false);
            });
            it(JasmineExtender_1.hasProperty(JasmineExtender_1.INSTANCE, "id", "string", "Accessor for the _id variable."), function () {
                expect(pointer.id).toBeDefined();
                expect(Utils.isString(pointer.id)).toBe(true);
                expect(pointer.id).toBe(pointer._id);
                pointer.id = "http://example.com/pointer/change/";
                expect(pointer._id).toBe("http://example.com/pointer/change/");
            });
            it(JasmineExtender_1.hasMethod(JasmineExtender_1.INSTANCE, "isResolved", "Returns true if the pointer has been resolved. It checks the `_resolved` property.", { type: "boolean" }), function () {
                expect(pointer.isResolved).toBeDefined();
                expect(Utils.isFunction(pointer.isResolved)).toBe(true);
                expect(pointer.isResolved()).toBe(false);
                pointer._resolved = true;
                expect(pointer.isResolved()).toBe(true);
            });
            it(JasmineExtender_1.hasMethod(JasmineExtender_1.INSTANCE, "resolve", "Resolve the pointer. This function throw an Error, it should be reimplemented for the respective type of pointer."), function (done) {
                expect(pointer.resolve).toBeDefined();
                expect(Utils.isFunction(pointer.resolve)).toBe(true);
                var promise = pointer.resolve();
                expect(promise instanceof Promise).toBe(true);
                promise.then(done.fail, function (error) {
                    expect(error.name).toBe("NotImplementedError");
                    done();
                });
            });
        });
    });
});
