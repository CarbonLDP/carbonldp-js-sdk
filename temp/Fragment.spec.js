"use strict";
var JasmineExtender_1 = require("./test/JasmineExtender");
var Utils = require("./Utils");
var Document = require("./Document");
var URI = require("./RDF/URI");
var Fragment = require("./Fragment");
describe(JasmineExtender_1.module("Carbon/Fragment"), function () {
    it(JasmineExtender_1.isDefined(), function () {
        expect(Fragment).toBeDefined();
        expect(Utils.isObject(Fragment)).toBe(true);
    });
    describe(JasmineExtender_1.clazz("Carbon.Fragment.Factory", "Factory class for Fragment objects."), function () {
        it(JasmineExtender_1.isDefined(), function () {
            expect(Fragment.Factory).toBeDefined();
            expect(Utils.isFunction(Fragment.Factory)).toBe(true);
        });
        it(JasmineExtender_1.hasMethod(JasmineExtender_1.STATIC, "hasClassProperties", "Returns true if the object provided has the properties and functions of a Fragment object", [
            { name: "resource", type: "Object" }
        ], { type: "boolean" }), function () {
            expect(Fragment.Factory.hasClassProperties).toBeDefined();
            expect(Utils.isFunction(Fragment.Factory.hasClassProperties)).toBe(true);
            var resource = undefined;
            expect(Fragment.Factory.hasClassProperties(resource)).toBe(false);
            resource = {};
            expect(Fragment.Factory.hasClassProperties(resource)).toBe(false);
            resource["document"] = null;
            expect(Fragment.Factory.hasClassProperties(resource)).toBe(true);
        });
        var document;
        beforeAll(function () {
            document = Document.Factory.create();
            document.id = "http://example.com/document/";
        });
        describe(JasmineExtender_1.method(JasmineExtender_1.STATIC, "create"), function () {
            it(JasmineExtender_1.hasSignature("Creates a Fragment with the ID provided for the document specified.", [
                { name: "id", type: "string" },
                { name: "document", type: "Carbon.Document.Class" }
            ], { type: "Carbon.Fragment.Class" }), function () {
                expect(Fragment.Factory.create).toBeDefined();
                expect(Utils.isFunction(Fragment.Factory.create)).toBe(true);
                var fragment;
                fragment = Fragment.Factory.create("#fragment", document);
                expect(fragment).toBeTruthy();
                expect(Fragment.Factory.hasClassProperties(fragment)).toBe(true);
                expect(fragment.document).toBe(document);
                expect(fragment.id).toBe("#fragment");
                fragment = Fragment.Factory.create("http://example.com/document/#fragment", document);
                expect(fragment).toBeTruthy();
                expect(Fragment.Factory.hasClassProperties(fragment)).toBe(true);
                expect(fragment.document).toBe(document);
                expect(fragment.id).toBe("http://example.com/document/#fragment");
                fragment = Fragment.Factory.create("_:BlankNode", document);
                expect(fragment).toBeTruthy();
                expect(Fragment.Factory.hasClassProperties(fragment)).toBe(true);
                expect(fragment.document).toBe(document);
                expect(fragment.id).toBe("_:BlankNode");
            });
            it(JasmineExtender_1.hasSignature("Create a Blank Node Fragment since no ID is provided for the specified document.", [
                { name: "document", type: "Carbon.Document.Class" }
            ], { type: "Carbon.Fragment.Class" }), function () {
                expect(Fragment.Factory.create).toBeDefined();
                expect(Utils.isFunction(Fragment.Factory.create)).toBe(true);
                var fragment1;
                var fragment2;
                fragment1 = Fragment.Factory.create(document);
                expect(fragment1).toBeTruthy();
                expect(Fragment.Factory.hasClassProperties(fragment1)).toBe(true);
                expect(fragment1.document).toBe(document);
                expect(URI.Util.isBNodeID(fragment1.id)).toBe(true);
                fragment2 = Fragment.Factory.create(document);
                expect(fragment2).toBeTruthy();
                expect(Fragment.Factory.hasClassProperties(fragment2)).toBe(true);
                expect(fragment2.document).toBe(document);
                expect(URI.Util.isBNodeID(fragment2.id)).toBe(true);
                expect(fragment1.id).not.toEqual(fragment2.id);
            });
        });
        describe(JasmineExtender_1.method(JasmineExtender_1.STATIC, "createFrom"), function () {
            it(JasmineExtender_1.hasSignature("Creates a Fragment from an Object with the ID provided for the document specified.", [
                { name: "object", type: "T extends Object" },
                { name: "id", type: "string" },
                { name: "document", type: "Carbon.Document.Class" }
            ], { type: "T & Carbon.Fragment.Class" }), function () {
                expect(Fragment.Factory.createFrom).toBeDefined();
                expect(Utils.isFunction(Fragment.Factory.createFrom)).toBe(true);
                var fragment;
                fragment = Fragment.Factory.createFrom({ property: "my property 1" }, "#fragment", document);
                expect(fragment).toBeTruthy();
                expect(Fragment.Factory.hasClassProperties(fragment)).toBe(true);
                expect(fragment.document).toBe(document);
                expect(fragment.id).toBe("#fragment");
                expect(fragment.property).toBe("my property 1");
                fragment = Fragment.Factory.createFrom({ property: "my property 2" }, "http://example.com/document/#fragment", document);
                expect(fragment).toBeTruthy();
                expect(Fragment.Factory.hasClassProperties(fragment)).toBe(true);
                expect(fragment.document).toBe(document);
                expect(fragment.id).toBe("http://example.com/document/#fragment");
                expect(fragment.property).toBe("my property 2");
                fragment = Fragment.Factory.createFrom({ property: "my property 3" }, "_:BlankNode", document);
                expect(fragment).toBeTruthy();
                expect(Fragment.Factory.hasClassProperties(fragment)).toBe(true);
                expect(fragment.document).toBe(document);
                expect(fragment.id).toBe("_:BlankNode");
                expect(fragment.property).toBe("my property 3");
                var anotherFragment = Fragment.Factory.createFrom({}, "_:AnotherBlankNode", document);
                expect(anotherFragment).toBeTruthy();
                expect(Fragment.Factory.hasClassProperties(anotherFragment)).toBe(true);
                expect(anotherFragment.document).toBe(document);
                expect(anotherFragment.id).toBe("_:AnotherBlankNode");
                expect(anotherFragment["property"]).toBeUndefined();
            });
            it(JasmineExtender_1.hasSignature("Create a Blank Node Fragment since no ID is provided for the specified document.", [
                { name: "object", type: "T extends Object" },
                { name: "document", type: "Carbon.Document.Class" }
            ], { type: "Carbon.Fragment.Class" }), function () {
                expect(Fragment.Factory.createFrom).toBeDefined();
                expect(Utils.isFunction(Fragment.Factory.createFrom)).toBe(true);
                var fragment1;
                var fragment2;
                fragment1 = Fragment.Factory.createFrom({ property: "my property 1" }, document);
                expect(fragment1).toBeTruthy();
                expect(Fragment.Factory.hasClassProperties(fragment1)).toBe(true);
                expect(fragment1.document).toBe(document);
                expect(URI.Util.isBNodeID(fragment1.id)).toBe(true);
                expect(fragment1.property).toBe("my property 1");
                fragment2 = Fragment.Factory.createFrom({ property: "my property 2" }, document);
                expect(fragment2).toBeTruthy();
                expect(Fragment.Factory.hasClassProperties(fragment2)).toBe(true);
                expect(fragment2.document).toBe(document);
                expect(URI.Util.isBNodeID(fragment2.id)).toBe(true);
                expect(fragment2.property).toBe("my property 2");
                expect(fragment1.id).not.toEqual(fragment2.id);
                var anotherFragment = Fragment.Factory.createFrom({}, document);
                expect(anotherFragment).toBeTruthy();
                expect(Fragment.Factory.hasClassProperties(anotherFragment)).toBe(true);
                expect(anotherFragment.document).toBe(document);
                expect(URI.Util.isBNodeID(anotherFragment.id)).toBe(true);
                expect(anotherFragment["property"]).toBeUndefined();
            });
        });
    });
    describe(JasmineExtender_1.clazz("Carbon.Fragment.Util", "Class with useful options for Fragment objects"), function () {
        it(JasmineExtender_1.isDefined(), function () {
            expect(Fragment.Util).toBeDefined();
            expect(Utils.isFunction(Fragment.Util)).toBe(true);
        });
        it(JasmineExtender_1.hasMethod(JasmineExtender_1.STATIC, "generateID", "Returns an ID for a BlankNode using an universally unique identifier (UUID)."), function () {
            var id1;
            var id2;
            id1 = Fragment.Util.generateID();
            expect(URI.Util.isBNodeID(id1)).toBe(true);
            id2 = Fragment.Util.generateID();
            expect(URI.Util.isBNodeID(id2)).toBe(true);
            expect(id1).not.toEqual(id2);
        });
    });
});
