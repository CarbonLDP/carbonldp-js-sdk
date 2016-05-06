"use strict";
var JasmineExtender_1 = require("./../test/JasmineExtender");
var RemoveMemberAction = require("./RemoveMemberAction");
var Document = require("./../Document");
var NS = require("./../NS");
var Pointer = require("./../Pointer");
var Utils = require("./../Utils");
describe(JasmineExtender_1.module("Carbon/LDP/RemoveMemberAction"), function () {
    it(JasmineExtender_1.isDefined(), function () {
        expect(RemoveMemberAction).toBeDefined();
        expect(Utils.isObject(RemoveMemberAction)).toBe(true);
    });
    it(JasmineExtender_1.hasProperty(JasmineExtender_1.STATIC, "RDF_CLASS", "string"), function () {
        expect(RemoveMemberAction.RDF_CLASS).toBeDefined();
        expect(Utils.isString(RemoveMemberAction.RDF_CLASS)).toBe(true);
        expect(RemoveMemberAction.RDF_CLASS).toBe(NS.C.Class.RemoveMemberAction);
    });
    it(JasmineExtender_1.hasProperty(JasmineExtender_1.STATIC, "SCHEMA", "Carbon.ObjectSchema.Class"), function () {
        expect(RemoveMemberAction.SCHEMA).toBeDefined();
        expect(Utils.isObject(RemoveMemberAction.SCHEMA)).toBe(true);
        expect(Utils.hasProperty(RemoveMemberAction.SCHEMA, "targetMembers")).toBe(true);
        expect(RemoveMemberAction.SCHEMA["targetMembers"]).toEqual({
            "@id": NS.C.Predicate.targetMember,
            "@container": "@set",
            "@type": "@id"
        });
    });
    describe(JasmineExtender_1.clazz("Carbon.LDP.RemoveMemberAction.Factory", "Factory class for LDP RemoveMemberAction objects"), function () {
        it(JasmineExtender_1.isDefined(), function () {
            expect(RemoveMemberAction.Factory).toBeDefined();
            expect(Utils.isFunction(RemoveMemberAction.Factory)).toBe(true);
        });
        it(JasmineExtender_1.hasMethod(JasmineExtender_1.STATIC, "hasClassProperties", "Returns true if the object has the properties to be defined as a LDP RemoveMemberAction", [
            { name: "resource", type: "Carbon.RDF.Node.Class" }
        ], { type: "boolean" }), function () {
            expect(RemoveMemberAction.Factory.hasClassProperties).toBeDefined();
            expect(Utils.isFunction(RemoveMemberAction.Factory.hasClassProperties)).toBe(true);
            var object = {};
            expect(RemoveMemberAction.Factory.hasClassProperties(object)).toBe(false);
            object.targetMembers = {};
            expect(RemoveMemberAction.Factory.hasClassProperties(object)).toBe(true);
        });
        it(JasmineExtender_1.hasMethod(JasmineExtender_1.STATIC, "createDocument", "Create and returns a `Carbon.Document.Class` object with a RemoveMemberAction fragment for the specified targetMembers.", [
            { name: "targetMembers", type: "Carbon.Pointer.Class", description: "The target members of the remove action." }
        ], { type: "Carbon.Document.Class" }), function () {
            expect(RemoveMemberAction.Factory.createDocument).toBeDefined();
            expect(Utils.isFunction(RemoveMemberAction.Factory.createDocument)).toBe(true);
            var pointers = [];
            pointers.push(Pointer.Factory.create("the-pointer/"));
            var document = RemoveMemberAction.Factory.createDocument(pointers);
            expect(Document.Factory.is(document)).toBe(true);
            var fragments = document.getFragments();
            expect(fragments.length).toBe(1);
            var addMemberAction = fragments[0];
            expect(RemoveMemberAction.Factory.hasClassProperties(addMemberAction)).toBe(true);
            expect(addMemberAction.targetMembers).toEqual(pointers);
            expect(addMemberAction.types).toContain(RemoveMemberAction.RDF_CLASS);
        });
    });
});
