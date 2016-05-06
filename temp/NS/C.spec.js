"use strict";
var JasmineExtender_1 = require("./../test/JasmineExtender");
var Utils = require("./../Utils");
var C = require("./C");
describe(JasmineExtender_1.module("Carbon/NS/C"), function () {
    it(JasmineExtender_1.isDefined(), function () {
        expect(C).toBeDefined();
        expect(Utils.isObject(C)).toBe(true);
    });
    it(JasmineExtender_1.hasProperty(JasmineExtender_1.STATIC, "namespace", "string"), function () {
        expect(C.namespace).toBeDefined();
        expect(Utils.isString(C.namespace)).toBe(true);
        expect(C.namespace).toBe("https://carbonldp.com/ns/v1/platform#");
    });
    describe(JasmineExtender_1.clazz("Carbon.NS.C.Class", "Class that contains objects defined by the Carbon Platform"), function () {
        it(JasmineExtender_1.isDefined(), function () {
            expect(C.Class).toBeDefined();
            expect(Utils.isFunction(C.Class)).toBe(true);
            expect(Object.keys(C.Class).length).toBe(15);
        });
        it(JasmineExtender_1.hasProperty(JasmineExtender_1.STATIC, "AccessPoint", "string"), function () {
            expect(C.Class.AccessPoint).toBeDefined();
            expect(Utils.isString(C.Class.AccessPoint)).toBe(true);
            expect(C.Class.AccessPoint).toBe("https://carbonldp.com/ns/v1/platform#AccessPoint");
        });
        it(JasmineExtender_1.hasProperty(JasmineExtender_1.STATIC, "API", "string"), function () {
            expect(C.Class.API).toBeDefined();
            expect(Utils.isString(C.Class.API)).toBe(true);
            expect(C.Class.API).toBe("https://carbonldp.com/ns/v1/platform#API");
        });
        it(JasmineExtender_1.hasProperty(JasmineExtender_1.STATIC, "NonReadableMembershipResourceTriples", "string"), function () {
            expect(C.Class.NonReadableMembershipResourceTriples).toBeDefined();
            expect(Utils.isString(C.Class.NonReadableMembershipResourceTriples)).toBe(true);
            expect(C.Class.NonReadableMembershipResourceTriples).toBe("https://carbonldp.com/ns/v1/platform#NonReadableMembershipResourceTriples");
        });
        it(JasmineExtender_1.hasProperty(JasmineExtender_1.STATIC, "PreferContainer", "string"), function () {
            expect(C.Class.PreferContainer).toBeDefined();
            expect(Utils.isString(C.Class.PreferContainer)).toBe(true);
            expect(C.Class.PreferContainer).toBe("https://carbonldp.com/ns/v1/platform#PreferContainer");
        });
        it(JasmineExtender_1.hasProperty(JasmineExtender_1.STATIC, "PreferContainmentResources", "string"), function () {
            expect(C.Class.PreferContainmentResources).toBeDefined();
            expect(Utils.isString(C.Class.PreferContainmentResources)).toBe(true);
            expect(C.Class.PreferContainmentResources).toBe("https://carbonldp.com/ns/v1/platform#PreferContainmentResources");
        });
        it(JasmineExtender_1.hasProperty(JasmineExtender_1.STATIC, "PreferContainmentTriples", "string"), function () {
            expect(C.Class.PreferContainmentTriples).toBeDefined();
            expect(Utils.isString(C.Class.PreferContainmentTriples)).toBe(true);
            expect(C.Class.PreferContainmentTriples).toBe("https://carbonldp.com/ns/v1/platform#PreferContainmentTriples");
        });
        it(JasmineExtender_1.hasProperty(JasmineExtender_1.STATIC, "PreferMembershipResources", "string"), function () {
            expect(C.Class.PreferMembershipResources).toBeDefined();
            expect(Utils.isString(C.Class.PreferMembershipResources)).toBe(true);
            expect(C.Class.PreferMembershipResources).toBe("https://carbonldp.com/ns/v1/platform#PreferMembershipResources");
        });
        it(JasmineExtender_1.hasProperty(JasmineExtender_1.STATIC, "PreferMembershipTriples", "string"), function () {
            expect(C.Class.PreferMembershipTriples).toBeDefined();
            expect(Utils.isString(C.Class.PreferMembershipTriples)).toBe(true);
            expect(C.Class.PreferMembershipTriples).toBe("https://carbonldp.com/ns/v1/platform#PreferMembershipTriples");
        });
        it(JasmineExtender_1.hasProperty(JasmineExtender_1.STATIC, "VolatileResource", "string"), function () {
            expect(C.Class.VolatileResource).toBeDefined();
            expect(Utils.isString(C.Class.VolatileResource)).toBe(true);
            expect(C.Class.VolatileResource).toBe("https://carbonldp.com/ns/v1/platform#VolatileResource");
        });
        it(JasmineExtender_1.hasProperty(JasmineExtender_1.STATIC, "RDFRepresentation", "string"), function () {
            expect(C.Class.RDFRepresentation).toBeDefined();
            expect(Utils.isString(C.Class.RDFRepresentation)).toBe(true);
            expect(C.Class.RDFRepresentation).toBe("https://carbonldp.com/ns/v1/platform#RDFRepresentation");
        });
        it(JasmineExtender_1.hasProperty(JasmineExtender_1.STATIC, "AddMemberAction", "string"), function () {
            expect(C.Class.AddMemberAction).toBeDefined();
            expect(Utils.isString(C.Class.AddMemberAction)).toBe(true);
            expect(C.Class.AddMemberAction).toBe("https://carbonldp.com/ns/v1/platform#AddMemberAction");
        });
        it(JasmineExtender_1.hasProperty(JasmineExtender_1.STATIC, "RemoveMemberAction", "string"), function () {
            expect(C.Class.RemoveMemberAction).toBeDefined();
            expect(Utils.isString(C.Class.RemoveMemberAction)).toBe(true);
            expect(C.Class.RemoveMemberAction).toBe("https://carbonldp.com/ns/v1/platform#RemoveMemberAction");
        });
        it(JasmineExtender_1.hasProperty(JasmineExtender_1.STATIC, "ResponseDescription", "string"), function () {
            expect(C.Class.ResponseDescription).toBeDefined();
            expect(Utils.isString(C.Class.ResponseDescription)).toBe(true);
            expect(C.Class.ResponseDescription).toBe("https://carbonldp.com/ns/v1/platform#ResponseDescription");
        });
        it(JasmineExtender_1.hasProperty(JasmineExtender_1.STATIC, "ResponseMetaData", "string"), function () {
            expect(C.Class.ResponseMetaData).toBeDefined();
            expect(Utils.isString(C.Class.ResponseMetaData)).toBe(true);
            expect(C.Class.ResponseMetaData).toBe("https://carbonldp.com/ns/v1/platform#ResponseMetaData");
        });
    });
    describe(JasmineExtender_1.clazz("Carbon.NS.C.Predicate", "Class that contains predicates defined by the Carbon Platform"), function () {
        it(JasmineExtender_1.isDefined(), function () {
            expect(C.Predicate).toBeDefined();
            expect(Utils.isFunction(C.Predicate)).toBe(true);
            expect(Object.keys(C.Predicate).length).toBe(12);
        });
        it(JasmineExtender_1.hasProperty(JasmineExtender_1.STATIC, "accessPoint", "string"), function () {
            expect(C.Predicate.accessPoint).toBeDefined();
            expect(Utils.isString(C.Predicate.accessPoint)).toBe(true);
            expect(C.Predicate.accessPoint).toBe("https://carbonldp.com/ns/v1/platform#accessPoint");
        });
        it(JasmineExtender_1.hasProperty(JasmineExtender_1.STATIC, "bNodeIdentifier", "string"), function () {
            expect(C.Predicate.bNodeIdentifier).toBeDefined();
            expect(Utils.isString(C.Predicate.bNodeIdentifier)).toBe(true);
            expect(C.Predicate.bNodeIdentifier).toBe("https://carbonldp.com/ns/v1/platform#bNodeIdentifier");
        });
        it(JasmineExtender_1.hasProperty(JasmineExtender_1.STATIC, "buildDate", "string"), function () {
            expect(C.Predicate.buildDate).toBeDefined();
            expect(Utils.isString(C.Predicate.buildDate)).toBe(true);
            expect(C.Predicate.buildDate).toBe("https://carbonldp.com/ns/v1/platform#buildDate");
        });
        it(JasmineExtender_1.hasProperty(JasmineExtender_1.STATIC, "created", "string"), function () {
            expect(C.Predicate.created).toBeDefined();
            expect(Utils.isString(C.Predicate.created)).toBe(true);
            expect(C.Predicate.created).toBe("https://carbonldp.com/ns/v1/platform#created");
        });
        it(JasmineExtender_1.hasProperty(JasmineExtender_1.STATIC, "modified", "string"), function () {
            expect(C.Predicate.modified).toBeDefined();
            expect(Utils.isString(C.Predicate.modified)).toBe(true);
            expect(C.Predicate.modified).toBe("https://carbonldp.com/ns/v1/platform#modified");
        });
        it(JasmineExtender_1.hasProperty(JasmineExtender_1.STATIC, "version", "string"), function () {
            expect(C.Predicate.version).toBeDefined();
            expect(Utils.isString(C.Predicate.version)).toBe(true);
            expect(C.Predicate.version).toBe("https://carbonldp.com/ns/v1/platform#version");
        });
        it(JasmineExtender_1.hasProperty(JasmineExtender_1.STATIC, "mediaType", "string"), function () {
            expect(C.Predicate.mediaType).toBeDefined();
            expect(Utils.isString(C.Predicate.mediaType)).toBe(true);
            expect(C.Predicate.mediaType).toBe("https://carbonldp.com/ns/v1/platform#mediaType");
        });
        it(JasmineExtender_1.hasProperty(JasmineExtender_1.STATIC, "size", "string"), function () {
            expect(C.Predicate.size).toBeDefined();
            expect(Utils.isString(C.Predicate.size)).toBe(true);
            expect(C.Predicate.size).toBe("https://carbonldp.com/ns/v1/platform#size");
        });
        it(JasmineExtender_1.hasProperty(JasmineExtender_1.STATIC, "targetMember", "string"), function () {
            expect(C.Predicate.targetMember).toBeDefined();
            expect(Utils.isString(C.Predicate.targetMember)).toBe(true);
            expect(C.Predicate.targetMember).toBe("https://carbonldp.com/ns/v1/platform#targetMember");
        });
        it(JasmineExtender_1.hasProperty(JasmineExtender_1.STATIC, "responseProperty", "string"), function () {
            expect(C.Predicate.responseProperty).toBeDefined();
            expect(Utils.isString(C.Predicate.responseProperty)).toBe(true);
            expect(C.Predicate.responseProperty).toBe("https://carbonldp.com/ns/v1/platform#responseProperty");
        });
        it(JasmineExtender_1.hasProperty(JasmineExtender_1.STATIC, "responsePropertyResource", "string"), function () {
            expect(C.Predicate.responsePropertyResource).toBeDefined();
            expect(Utils.isString(C.Predicate.responsePropertyResource)).toBe(true);
            expect(C.Predicate.responsePropertyResource).toBe("https://carbonldp.com/ns/v1/platform#responsePropertyResource");
        });
        it(JasmineExtender_1.hasProperty(JasmineExtender_1.STATIC, "eTag", "string"), function () {
            expect(C.Predicate.eTag).toBeDefined();
            expect(Utils.isString(C.Predicate.eTag)).toBe(true);
            expect(C.Predicate.eTag).toBe("https://carbonldp.com/ns/v1/platform#eTag");
        });
    });
});
