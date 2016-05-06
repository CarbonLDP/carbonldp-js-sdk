"use strict";
var JasmineExtender_1 = require("./test/JasmineExtender");
var Utils = require("./Utils");
var Document = require("./Document");
var Fragment = require("./Fragment");
var NamedFragment = require("./NamedFragment");
describe(JasmineExtender_1.module("Carbon/NamedFragment"), function () {
    it(JasmineExtender_1.isDefined(), function () {
        expect(NamedFragment).toBeDefined();
        expect(Utils.isObject(NamedFragment)).toBe(true);
    });
    describe(JasmineExtender_1.clazz("Carbon.NamedFragment.Factory", "Factory class for NamedFragment objects."), function () {
        it(JasmineExtender_1.isDefined(), function () {
            expect(NamedFragment.Factory).toBeDefined();
            expect(Utils.isFunction(NamedFragment.Factory)).toBe(true);
        });
        var document;
        beforeAll(function () {
            document = Document.Factory.create();
            document.id = "http://example.com/document/";
        });
        it(JasmineExtender_1.hasMethod(JasmineExtender_1.STATIC, "hasClassProperties", "Returns true if the object provided has the properties and functions of a NamedFragment object", [
            { name: "resource", type: "Carbon.Fragment.Class" }
        ], { type: "boolean" }), function () {
            expect(NamedFragment.Factory.hasClassProperties).toBeDefined();
            expect(Utils.isFunction(NamedFragment.Factory.hasClassProperties)).toBe(true);
            var resource = undefined;
            expect(NamedFragment.Factory.hasClassProperties(resource)).toBe(false);
            resource = Fragment.Factory.create(document);
            expect(NamedFragment.Factory.hasClassProperties(resource)).toBe(false);
            resource["slug"] = null;
            expect(NamedFragment.Factory.hasClassProperties(resource)).toBe(true);
        });
        it(JasmineExtender_1.hasMethod(JasmineExtender_1.STATIC, "create", "Creates a NamedFragment with the Slug provided for the document specified.", [
            { name: "slug", type: "string" },
            { name: "document", type: "Carbon.Document.Class" }
        ], { type: "Carbon.NamedFragment.Class" }), function () {
            expect(NamedFragment.Factory.create).toBeDefined();
            expect(Utils.isFunction(NamedFragment.Factory.create)).toBe(true);
            var fragment;
            fragment = NamedFragment.Factory.create("fragment", document);
            expect(fragment).toBeTruthy();
            expect(NamedFragment.Factory.hasClassProperties(fragment)).toBe(true);
            expect(fragment.document).toBe(document);
            expect(fragment.id).toBe("http://example.com/document/#fragment");
            fragment = NamedFragment.Factory.create("another-fragment", document);
            expect(fragment).toBeTruthy();
            expect(NamedFragment.Factory.hasClassProperties(fragment)).toBe(true);
            expect(fragment.document).toBe(document);
            expect(fragment.id).toBe("http://example.com/document/#another-fragment");
        });
        it(JasmineExtender_1.hasMethod(JasmineExtender_1.STATIC, "createFrom", "Creates a NamedFragment from an Object with the Slug provided for the document specified.", [
            { name: "object", type: "T extends Object" },
            { name: "slug", type: "string" },
            { name: "document", type: "Carbon.Document.Class" },
        ], { type: "T & Carbon.NamedFragment.Class" }), function () {
            expect(NamedFragment.Factory.createFrom).toBeDefined();
            expect(Utils.isFunction(NamedFragment.Factory.createFrom)).toBe(true);
            var fragment;
            fragment = NamedFragment.Factory.createFrom({ property: "my property 1" }, "fragment", document);
            expect(fragment).toBeTruthy();
            expect(NamedFragment.Factory.hasClassProperties(fragment)).toBe(true);
            expect(fragment.document).toBe(document);
            expect(fragment.id).toBe("http://example.com/document/#fragment");
            expect(fragment.property).toBe("my property 1");
            fragment = NamedFragment.Factory.createFrom({ property: "my property 2" }, "another-fragment", document);
            expect(fragment).toBeTruthy();
            expect(NamedFragment.Factory.hasClassProperties(fragment)).toBe(true);
            expect(fragment.document).toBe(document);
            expect(fragment.id).toBe("http://example.com/document/#another-fragment");
            expect(fragment.property).toBe("my property 2");
            var anotherFragment = NamedFragment.Factory.createFrom({}, "some-fragment", document);
            expect(anotherFragment).toBeTruthy();
            expect(NamedFragment.Factory.hasClassProperties(anotherFragment)).toBe(true);
            expect(anotherFragment.document).toBe(document);
            expect(anotherFragment.id).toBe("http://example.com/document/#some-fragment");
            expect(anotherFragment["property"]).toBeUndefined();
        });
    });
});
