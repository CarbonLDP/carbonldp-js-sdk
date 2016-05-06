"use strict";
var JasmineExtender_1 = require("./../test/JasmineExtender");
var AddMemberAction = require("./AddMemberAction");
var Document = require("./../Document");
var NS = require("./../NS");
var Pointer = require("./../Pointer");
var Utils = require("./../Utils");
describe(JasmineExtender_1.module("Carbon/LDP/AddMemberAction"), function () {
    it(JasmineExtender_1.isDefined(), function () {
        expect(AddMemberAction).toBeDefined();
        expect(Utils.isObject(AddMemberAction)).toBe(true);
    });
    it(JasmineExtender_1.hasProperty(JasmineExtender_1.STATIC, "RDF_CLASS", "string"), function () {
        expect(AddMemberAction.RDF_CLASS).toBeDefined();
        expect(Utils.isString(AddMemberAction.RDF_CLASS)).toBe(true);
        expect(AddMemberAction.RDF_CLASS).toBe(NS.C.Class.AddMemberAction);
    });
    it(JasmineExtender_1.hasProperty(JasmineExtender_1.STATIC, "SCHEMA", "Carbon.ObjectSchema.Class"), function () {
        expect(AddMemberAction.SCHEMA).toBeDefined();
        expect(Utils.isObject(AddMemberAction.SCHEMA)).toBe(true);
        expect(Utils.hasProperty(AddMemberAction.SCHEMA, "targetMembers")).toBe(true);
        expect(AddMemberAction.SCHEMA["targetMembers"]).toEqual({
            "@id": NS.C.Predicate.targetMember,
            "@container": "@set",
            "@type": "@id"
        });
    });
    describe(JasmineExtender_1.clazz("Carbon.LDP.AddMemberAction.Factory", "Factory class for LDP AddMemberAction objects"), function () {
        it(JasmineExtender_1.isDefined(), function () {
            expect(AddMemberAction.Factory).toBeDefined();
            expect(Utils.isFunction(AddMemberAction.Factory)).toBe(true);
        });
        it(JasmineExtender_1.hasMethod(JasmineExtender_1.STATIC, "hasClassProperties", "Returns true if the object has the properties to be defined as a LDP AddMemberAction", [
            { name: "resource", type: "Carbon.RDF.Node.Class" }
        ], { type: "boolean" }), function () {
            expect(AddMemberAction.Factory.hasClassProperties).toBeDefined();
            expect(Utils.isFunction(AddMemberAction.Factory.hasClassProperties)).toBe(true);
            var object = {};
            expect(AddMemberAction.Factory.hasClassProperties(object)).toBe(false);
            object.targetMembers = {};
            expect(AddMemberAction.Factory.hasClassProperties(object)).toBe(true);
        });
        it(JasmineExtender_1.hasMethod(JasmineExtender_1.STATIC, "createDocument", "Create and returns a `Carbon.Document.Class` object with a AddMemberAction fragment for the specified targetMembers.", [
            { name: "targetMembers", type: "Carbon.Pointer.Class", description: "The target member to add in a `addMember` request." }
        ], { type: "Carbon.Document.Class" }), function () {
            expect(AddMemberAction.Factory.createDocument).toBeDefined();
            expect(Utils.isFunction(AddMemberAction.Factory.createDocument)).toBe(true);
            var pointers = [];
            pointers.push(Pointer.Factory.create("the-pointer/"));
            var document = AddMemberAction.Factory.createDocument(pointers);
            expect(Document.Factory.is(document)).toBe(true);
            var fragments = document.getFragments();
            expect(fragments.length).toBe(1);
            var addMemberAction = fragments[0];
            expect(AddMemberAction.Factory.hasClassProperties(addMemberAction)).toBe(true);
            expect(addMemberAction.targetMembers).toEqual(pointers);
            expect(addMemberAction.types).toContain(AddMemberAction.RDF_CLASS);
        });
    });
});
