"use strict";
var App = require("./App");
var JasmineExtender_1 = require("./test/JasmineExtender");
var Utils = require("./Utils");
var NS = require("./NS");
var Errors = require("./Errors");
var Document = require("./Document");
var Context_1 = require("./App/Context");
describe(JasmineExtender_1.module("Carbon/App"), function () {
    it(JasmineExtender_1.isDefined(), function () {
        expect(App).toBeDefined();
        expect(Utils.isObject(App)).toBe(true);
    });
    it(JasmineExtender_1.hasProperty(JasmineExtender_1.STATIC, "RDF_CLASS", "string"), function () {
        expect(App.RDF_CLASS).toBeDefined();
        expect(Utils.isString(App.RDF_CLASS)).toBe(true);
        expect(App.RDF_CLASS).toBe(NS.CS.Class.Application);
    });
    it(JasmineExtender_1.hasProperty(JasmineExtender_1.STATIC, "SCHEMA", "Carbon.ObjectSchema.Class"), function () {
        expect(App.SCHEMA).toBeDefined();
        expect(Utils.isObject(App.SCHEMA)).toBe(true);
        expect(Utils.hasProperty(App.SCHEMA, "rootContainer")).toBe(true);
        expect(App.SCHEMA["rootContainer"]).toEqual({
            "@id": NS.CS.Predicate.rootContainer,
            "@type": "@id"
        });
    });
    describe(JasmineExtender_1.clazz("Carbon.App.Factory", "Factory class for `Carbon.App.Class` objects"), function () {
        it(JasmineExtender_1.isDefined(), function () {
            expect(App.Factory).toBeDefined();
            expect(Utils.isFunction(App.Factory)).toBe(true);
        });
        it(JasmineExtender_1.hasMethod(JasmineExtender_1.STATIC, "hasClassProperties", "Returns true if the object provided has the properties that defines a `Carbon.App.Class` object", [
            { name: "resource", type: "Object" }
        ], { type: "boolean" }), function () {
            expect(App.Factory.hasClassProperties).toBeDefined();
            expect(Utils.isFunction(App.Factory.hasClassProperties)).toBe(true);
            var object = {};
            expect(App.Factory.hasClassProperties(object)).toBe(false);
            object.name = "A name";
            expect(App.Factory.hasClassProperties(object)).toBe(true);
            object.description = "A description";
            expect(App.Factory.hasClassProperties(object)).toBe(true);
        });
        it(JasmineExtender_1.hasMethod(JasmineExtender_1.STATIC, "is", "Returns true if the object provided is considered as an `Carbon.App.Class` object", [
            { name: "object", type: "Object" }
        ], { type: "boolean" }), function () {
            expect(App.Factory.is).toBeDefined();
            expect(Utils.isFunction(App.Factory.is)).toBe(true);
            var object = {};
            expect(App.Factory.is(object)).toBe(false);
            object.name = "A name";
            expect(App.Factory.is(object)).toBe(false);
            object.description = "A description";
            expect(App.Factory.is(object)).toBe(false);
            object.types = [NS.CS.Class.Application];
            expect(App.Factory.is(object)).toBe(false);
            object = Document.Factory.create();
            expect(App.Factory.is(object)).toBe(false);
            object.types.push(NS.CS.Class.Application);
            expect(App.Factory.is(object)).toBe(false);
            object.name = "A name";
            expect(App.Factory.is(object)).toBe(true);
            object.description = "A description";
            expect(App.Factory.is(object)).toBe(true);
        });
        it(JasmineExtender_1.hasMethod(JasmineExtender_1.STATIC, "create", "Create a empty `Carbon.App.Class` object.", [
            { name: "name", type: "string" },
            { name: "description", type: "string", optional: true }
        ], { type: "Carbon.App.Class" }), function () {
            expect(App.Factory.create).toBeDefined();
            expect(Utils.isFunction(App.Factory.create)).toBe(true);
            var spy = spyOn(App.Factory, "createFrom");
            App.Factory.create("The App name", "The App description");
            expect(spy).toHaveBeenCalledWith({}, "The App name", "The App description");
            App.Factory.create("Another App name");
            expect(spy).toHaveBeenCalledWith({}, "Another App name", undefined);
        });
        it(JasmineExtender_1.hasMethod(JasmineExtender_1.STATIC, "createFrom", "Create a `Carbon.App.Class` object with the object provided.", [
            { name: "object", type: "T extends Object" },
            { name: "name", type: "string" },
            { name: "description", type: "string", optional: true }
        ], { type: "T & Carbon.App.Class" }), function () {
            expect(App.Factory.createFrom).toBeDefined();
            expect(Utils.isFunction(App.Factory.createFrom)).toBe(true);
            var app;
            app = App.Factory.createFrom({}, "App name");
            expect(App.Factory.is(app)).toBe(true);
            expect(app.myProperty).toBeUndefined();
            expect(app.name).toBe("App name");
            expect(app.description).toBeUndefined();
            app = App.Factory.createFrom({}, "App name", "App description");
            expect(App.Factory.is(app)).toBe(true);
            expect(app.myProperty).toBeUndefined();
            expect(app.name).toBe("App name");
            expect(app.description).toBe("App description");
            app = App.Factory.createFrom({ myProperty: "a property" }, "App name");
            expect(App.Factory.is(app)).toBe(true);
            expect(app.myProperty).toBeDefined();
            expect(app.myProperty).toBe("a property");
            expect(app.name).toBe("App name");
            expect(app.description).toBeUndefined();
            app = App.Factory.createFrom({ myProperty: "a property" }, "App name", "App description");
            expect(App.Factory.is(app)).toBe(true);
            expect(app.myProperty).toBeDefined();
            expect(app.myProperty).toBe("a property");
            expect(app.name).toBe("App name");
            expect(app.description).toBe("App description");
            expect(function () { return App.Factory.createFrom({}, ""); }).toThrowError(Errors.IllegalArgumentError);
            expect(function () { return App.Factory.createFrom({}, "", "App description"); }).toThrowError(Errors.IllegalArgumentError);
            expect(function () { return App.Factory.createFrom({ myProperty: "a property" }, ""); }).toThrowError(Errors.IllegalArgumentError);
            expect(function () { return App.Factory.createFrom({ myProperty: "a property" }, "", "App description"); }).toThrowError(Errors.IllegalArgumentError);
            expect(function () { return App.Factory.createFrom({}, {}); }).toThrowError(Errors.IllegalArgumentError);
            expect(function () { return App.Factory.createFrom({}, 1); }).toThrowError(Errors.IllegalArgumentError);
            expect(function () { return App.Factory.createFrom({}, null); }).toThrowError(Errors.IllegalArgumentError);
            expect(function () { return App.Factory.createFrom({}, undefined); }).toThrowError(Errors.IllegalArgumentError);
        });
    });
    it(JasmineExtender_1.reexports(JasmineExtender_1.STATIC, "App", "Carbon/App/Context"), function () {
        expect(App.Context).toBeDefined();
        expect(App.Context).toEqual(Context_1.default);
    });
});
