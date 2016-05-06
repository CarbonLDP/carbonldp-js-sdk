"use strict";
var JasmineExtender_1 = require("./../test/JasmineExtender");
var Utils = require("./../Utils");
var LDP = require("./LDP");
describe(JasmineExtender_1.module("Carbon/NS/LDP"), function () {
    it(JasmineExtender_1.isDefined(), function () {
        expect(LDP).toBeDefined();
        expect(Utils.isObject(LDP)).toBe(true);
    });
    it(JasmineExtender_1.hasProperty(JasmineExtender_1.STATIC, "namespace", "string"), function () {
        expect(LDP.namespace).toBeDefined();
        expect(Utils.isString(LDP.namespace)).toBe(true);
        expect(LDP.namespace).toBe("http://www.w3.org/ns/ldp#");
    });
    describe(JasmineExtender_1.clazz("Carbon.NS.LDP.Class", "Class that contains objects defined in the W3C Linked Data Platform (LDP) vocabulary"), function () {
        it(JasmineExtender_1.isDefined(), function () {
            expect(LDP.Class).toBeDefined();
            expect(Utils.isFunction(LDP.Class)).toBe(true);
            expect(Object.keys(LDP.Class).length).toBe(16);
        });
        it(JasmineExtender_1.hasProperty(JasmineExtender_1.STATIC, "Resource", "string"), function () {
            expect(LDP.Class.Resource).toBeDefined();
            expect(Utils.isString(LDP.Class.Resource)).toBe(true);
            expect(LDP.Class.Resource).toBe("http://www.w3.org/ns/ldp#Resource");
        });
        it(JasmineExtender_1.hasProperty(JasmineExtender_1.STATIC, "RDFSource", "string"), function () {
            expect(LDP.Class.RDFSource).toBeDefined();
            expect(Utils.isString(LDP.Class.RDFSource)).toBe(true);
            expect(LDP.Class.RDFSource).toBe("http://www.w3.org/ns/ldp#RDFSource");
        });
        it(JasmineExtender_1.hasProperty(JasmineExtender_1.STATIC, "Container", "string"), function () {
            expect(LDP.Class.Container).toBeDefined();
            expect(Utils.isString(LDP.Class.Container)).toBe(true);
            expect(LDP.Class.Container).toBe("http://www.w3.org/ns/ldp#Container");
        });
        it(JasmineExtender_1.hasProperty(JasmineExtender_1.STATIC, "BasicContainer", "string"), function () {
            expect(LDP.Class.BasicContainer).toBeDefined();
            expect(Utils.isString(LDP.Class.BasicContainer)).toBe(true);
            expect(LDP.Class.BasicContainer).toBe("http://www.w3.org/ns/ldp#BasicContainer");
        });
        it(JasmineExtender_1.hasProperty(JasmineExtender_1.STATIC, "DirectContainer", "string"), function () {
            expect(LDP.Class.DirectContainer).toBeDefined();
            expect(Utils.isString(LDP.Class.DirectContainer)).toBe(true);
            expect(LDP.Class.DirectContainer).toBe("http://www.w3.org/ns/ldp#DirectContainer");
        });
        it(JasmineExtender_1.hasProperty(JasmineExtender_1.STATIC, "IndirectContainer", "string"), function () {
            expect(LDP.Class.IndirectContainer).toBeDefined();
            expect(Utils.isString(LDP.Class.IndirectContainer)).toBe(true);
            expect(LDP.Class.IndirectContainer).toBe("http://www.w3.org/ns/ldp#IndirectContainer");
        });
        it(JasmineExtender_1.hasProperty(JasmineExtender_1.STATIC, "NonRDFSource", "string"), function () {
            expect(LDP.Class.NonRDFSource).toBeDefined();
            expect(Utils.isString(LDP.Class.NonRDFSource)).toBe(true);
            expect(LDP.Class.NonRDFSource).toBe("http://www.w3.org/ns/ldp#NonRDFSource");
        });
        it(JasmineExtender_1.hasProperty(JasmineExtender_1.STATIC, "MemberSubject", "string"), function () {
            expect(LDP.Class.MemberSubject).toBeDefined();
            expect(Utils.isString(LDP.Class.MemberSubject)).toBe(true);
            expect(LDP.Class.MemberSubject).toBe("http://www.w3.org/ns/ldp#MemberSubject");
        });
        it(JasmineExtender_1.hasProperty(JasmineExtender_1.STATIC, "PreferContainment", "string"), function () {
            expect(LDP.Class.PreferContainment).toBeDefined();
            expect(Utils.isString(LDP.Class.PreferContainment)).toBe(true);
            expect(LDP.Class.PreferContainment).toBe("http://www.w3.org/ns/ldp#PreferContainment");
        });
        it(JasmineExtender_1.hasProperty(JasmineExtender_1.STATIC, "PreferMembership", "string"), function () {
            expect(LDP.Class.PreferMembership).toBeDefined();
            expect(Utils.isString(LDP.Class.PreferMembership)).toBe(true);
            expect(LDP.Class.PreferMembership).toBe("http://www.w3.org/ns/ldp#PreferMembership");
        });
        it(JasmineExtender_1.hasProperty(JasmineExtender_1.STATIC, "PreferEmptyContainer", "string"), function () {
            expect(LDP.Class.PreferEmptyContainer).toBeDefined();
            expect(Utils.isString(LDP.Class.PreferEmptyContainer)).toBe(true);
            expect(LDP.Class.PreferEmptyContainer).toBe("http://www.w3.org/ns/ldp#PreferEmptyContainer");
        });
        it(JasmineExtender_1.hasProperty(JasmineExtender_1.STATIC, "PreferMinimalContainer", "string"), function () {
            expect(LDP.Class.PreferMinimalContainer).toBeDefined();
            expect(Utils.isString(LDP.Class.PreferMinimalContainer)).toBe(true);
            expect(LDP.Class.PreferMinimalContainer).toBe("http://www.w3.org/ns/ldp#PreferMinimalContainer");
        });
        it(JasmineExtender_1.hasProperty(JasmineExtender_1.STATIC, "Page", "string"), function () {
            expect(LDP.Class.Page).toBeDefined();
            expect(Utils.isString(LDP.Class.Page)).toBe(true);
            expect(LDP.Class.Page).toBe("http://www.w3.org/ns/ldp#Page");
        });
        it(JasmineExtender_1.hasProperty(JasmineExtender_1.STATIC, "PageSortCriterion", "string"), function () {
            expect(LDP.Class.PageSortCriterion).toBeDefined();
            expect(Utils.isString(LDP.Class.PageSortCriterion)).toBe(true);
            expect(LDP.Class.PageSortCriterion).toBe("http://www.w3.org/ns/ldp#PageSortCriterion");
        });
        it(JasmineExtender_1.hasProperty(JasmineExtender_1.STATIC, "Ascending", "string"), function () {
            expect(LDP.Class.Ascending).toBeDefined();
            expect(Utils.isString(LDP.Class.Ascending)).toBe(true);
            expect(LDP.Class.Ascending).toBe("http://www.w3.org/ns/ldp#Ascending");
        });
        it(JasmineExtender_1.hasProperty(JasmineExtender_1.STATIC, "Descending", "string"), function () {
            expect(LDP.Class.Descending).toBeDefined();
            expect(Utils.isString(LDP.Class.Descending)).toBe(true);
            expect(LDP.Class.Descending).toBe("http://www.w3.org/ns/ldp#Descending");
        });
    });
    describe(JasmineExtender_1.clazz("Carbon.NS.LDP.Predicate", "Class that contains predicates defined in the W3C Linked Data Platform (LDP) vocabulary"), function () {
        it(JasmineExtender_1.isDefined(), function () {
            expect(LDP.Predicate).toBeDefined();
            expect(Utils.isFunction(LDP.Predicate)).toBe(true);
            expect(Object.keys(LDP.Predicate).length).toBe(11);
        });
        it(JasmineExtender_1.hasProperty(JasmineExtender_1.STATIC, "contains", "string"), function () {
            expect(LDP.Predicate.contains).toBeDefined();
            expect(Utils.isString(LDP.Predicate.contains)).toBe(true);
            expect(LDP.Predicate.contains).toBe("http://www.w3.org/ns/ldp#contains");
        });
        it(JasmineExtender_1.hasProperty(JasmineExtender_1.STATIC, "member", "string"), function () {
            expect(LDP.Predicate.member).toBeDefined();
            expect(Utils.isString(LDP.Predicate.member)).toBe(true);
            expect(LDP.Predicate.member).toBe("http://www.w3.org/ns/ldp#member");
        });
        it(JasmineExtender_1.hasProperty(JasmineExtender_1.STATIC, "hasMemberRelation", "string"), function () {
            expect(LDP.Predicate.hasMemberRelation).toBeDefined();
            expect(Utils.isString(LDP.Predicate.hasMemberRelation)).toBe(true);
            expect(LDP.Predicate.hasMemberRelation).toBe("http://www.w3.org/ns/ldp#hasMemberRelation");
        });
        it(JasmineExtender_1.hasProperty(JasmineExtender_1.STATIC, "isMemberOfRelation", "string"), function () {
            expect(LDP.Predicate.memberOfRelation).toBeDefined();
            expect(Utils.isString(LDP.Predicate.memberOfRelation)).toBe(true);
            expect(LDP.Predicate.memberOfRelation).toBe("http://www.w3.org/ns/ldp#memberOfRelation");
        });
        it(JasmineExtender_1.hasProperty(JasmineExtender_1.STATIC, "membershipResource", "string"), function () {
            expect(LDP.Predicate.membershipResource).toBeDefined();
            expect(Utils.isString(LDP.Predicate.membershipResource)).toBe(true);
            expect(LDP.Predicate.membershipResource).toBe("http://www.w3.org/ns/ldp#membershipResource");
        });
        it(JasmineExtender_1.hasProperty(JasmineExtender_1.STATIC, "insertedContentRelation", "string"), function () {
            expect(LDP.Predicate.insertedContentRelation).toBeDefined();
            expect(Utils.isString(LDP.Predicate.insertedContentRelation)).toBe(true);
            expect(LDP.Predicate.insertedContentRelation).toBe("http://www.w3.org/ns/ldp#insertedContentRelation");
        });
        it(JasmineExtender_1.hasProperty(JasmineExtender_1.STATIC, "constrainedBy", "string"), function () {
            expect(LDP.Predicate.constrainedBy).toBeDefined();
            expect(Utils.isString(LDP.Predicate.constrainedBy)).toBe(true);
            expect(LDP.Predicate.constrainedBy).toBe("http://www.w3.org/ns/ldp#constrainedBy");
        });
        it(JasmineExtender_1.hasProperty(JasmineExtender_1.STATIC, "pageSortCriteria", "string"), function () {
            expect(LDP.Predicate.pageSortCriteria).toBeDefined();
            expect(Utils.isString(LDP.Predicate.pageSortCriteria)).toBe(true);
            expect(LDP.Predicate.pageSortCriteria).toBe("http://www.w3.org/ns/ldp#pageSortCriteria");
        });
        it(JasmineExtender_1.hasProperty(JasmineExtender_1.STATIC, "pageSortOrder", "string"), function () {
            expect(LDP.Predicate.pageSortOrder).toBeDefined();
            expect(Utils.isString(LDP.Predicate.pageSortOrder)).toBe(true);
            expect(LDP.Predicate.pageSortOrder).toBe("http://www.w3.org/ns/ldp#pageSortOrder");
        });
        it(JasmineExtender_1.hasProperty(JasmineExtender_1.STATIC, "pageSortCollation", "string"), function () {
            expect(LDP.Predicate.pageSortCollation).toBeDefined();
            expect(Utils.isString(LDP.Predicate.pageSortCollation)).toBe(true);
            expect(LDP.Predicate.pageSortCollation).toBe("http://www.w3.org/ns/ldp#pageSortCollation");
        });
        it(JasmineExtender_1.hasProperty(JasmineExtender_1.STATIC, "pageSequence", "string"), function () {
            expect(LDP.Predicate.pageSequence).toBeDefined();
            expect(Utils.isString(LDP.Predicate.pageSequence)).toBe(true);
            expect(LDP.Predicate.pageSequence).toBe("http://www.w3.org/ns/ldp#pageSequence");
        });
    });
});
