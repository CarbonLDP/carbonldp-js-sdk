"use strict";
var JasmineExtender_1 = require("./test/JasmineExtender");
var Utils = require("./Utils");
var Pointer = require("./Pointer");
var PersistedDocument = require("./PersistedDocument");
var App = require("./App");
var PersistedApp = require("./PersistedApp");
var Documents_1 = require("./Documents");
var NS = require("./NS");
describe(JasmineExtender_1.module("Carbon/PersistedApp"), function () {
    it(JasmineExtender_1.isDefined(), function () {
        expect(PersistedApp).toBeDefined();
        expect(Utils.isObject(PersistedApp)).toBe(true);
    });
    describe(JasmineExtender_1.clazz("Carbon.PersistedApp.Factory", "Factory class for `Carbon.PersistedApp.Class` objects"), function () {
        it(JasmineExtender_1.isDefined(), function () {
            expect(PersistedApp.Factory).toBeDefined();
            expect(Utils.isFunction(PersistedApp.Factory)).toBe(true);
        });
        it(JasmineExtender_1.hasMethod(JasmineExtender_1.STATIC, "hasClassProperties", "Returns true if the object provided has the properties that defines a `Carbon.PersistedApp.Class` object", [
            { name: "resource", type: "Object" }
        ], { type: "boolean" }), function () {
            expect(PersistedApp.Factory.hasClassProperties).toBeDefined();
            expect(Utils.isFunction(PersistedApp.Factory.hasClassProperties)).toBe(true);
            expect(PersistedApp.Factory.hasClassProperties({ rootContainer: {} })).toBe(true);
            expect(PersistedApp.Factory.hasClassProperties({ rootContainer: Pointer.Factory.create("http://example.com/apps/example-app/") })).toBe(true);
            expect(PersistedApp.Factory.hasClassProperties({})).toBe(false);
            expect(PersistedApp.Factory.hasClassProperties(null)).toBe(false);
            expect(PersistedApp.Factory.hasClassProperties(undefined)).toBe(false);
        });
        it(JasmineExtender_1.hasMethod(JasmineExtender_1.STATIC, "is", "Returns true if the object provided is considered as an `Carbon.PersistedApp.Class` object", [
            { name: "object", type: "Object" }
        ], { type: "boolean" }), function () {
            expect(PersistedApp.Factory.is).toBeDefined();
            expect(Utils.isFunction(PersistedApp.Factory.is)).toBe(true);
            var object = {};
            expect(PersistedApp.Factory.is(object)).toBe(false);
            object.name = "App name";
            expect(PersistedApp.Factory.is(object)).toBe(false);
            object.rootContainer = {};
            expect(PersistedApp.Factory.is(object)).toBe(false);
            object.types = [NS.CS.Class.Application];
            expect(PersistedApp.Factory.is(object)).toBe(false);
            var app;
            var document;
            app = App.Factory.create("The App name");
            expect(PersistedApp.Factory.is(app)).toBe(false);
            app.rootContainer = {};
            expect(PersistedApp.Factory.is(app)).toBe(false);
            document = PersistedDocument.Factory.create("persistedApp", new Documents_1.default());
            expect(PersistedApp.Factory.is(document)).toBe(false);
            document = PersistedDocument.Factory.createFrom(object, "persistedApp", new Documents_1.default());
            expect(PersistedApp.Factory.is(document)).toBe(true);
        });
    });
});
