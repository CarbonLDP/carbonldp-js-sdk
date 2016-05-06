"use strict";
var namespace = "http://www.w3.org/ns/ldp#";
exports.namespace = namespace;
var Class = (function () {
    function Class() {
    }
    Object.defineProperty(Class, "Resource", {
        get: function () { return namespace + "Resource"; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Class, "RDFSource", {
        get: function () { return namespace + "RDFSource"; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Class, "Container", {
        get: function () { return namespace + "Container"; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Class, "BasicContainer", {
        get: function () { return namespace + "BasicContainer"; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Class, "DirectContainer", {
        get: function () { return namespace + "DirectContainer"; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Class, "IndirectContainer", {
        get: function () { return namespace + "IndirectContainer"; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Class, "NonRDFSource", {
        get: function () { return namespace + "NonRDFSource"; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Class, "MemberSubject", {
        get: function () { return namespace + "MemberSubject"; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Class, "PreferContainment", {
        get: function () { return namespace + "PreferContainment"; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Class, "PreferMembership", {
        get: function () { return namespace + "PreferMembership"; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Class, "PreferEmptyContainer", {
        get: function () { return namespace + "PreferEmptyContainer"; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Class, "PreferMinimalContainer", {
        get: function () { return namespace + "PreferMinimalContainer"; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Class, "Page", {
        get: function () { return namespace + "Page"; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Class, "PageSortCriterion", {
        get: function () { return namespace + "PageSortCriterion"; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Class, "Ascending", {
        get: function () { return namespace + "Ascending"; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Class, "Descending", {
        get: function () { return namespace + "Descending"; },
        enumerable: true,
        configurable: true
    });
    return Class;
}());
exports.Class = Class;
var Predicate = (function () {
    function Predicate() {
    }
    Object.defineProperty(Predicate, "contains", {
        get: function () { return namespace + "contains"; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Predicate, "member", {
        get: function () { return namespace + "member"; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Predicate, "hasMemberRelation", {
        get: function () { return namespace + "hasMemberRelation"; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Predicate, "memberOfRelation", {
        get: function () { return namespace + "memberOfRelation"; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Predicate, "membershipResource", {
        get: function () { return namespace + "membershipResource"; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Predicate, "insertedContentRelation", {
        get: function () { return namespace + "insertedContentRelation"; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Predicate, "constrainedBy", {
        get: function () { return namespace + "constrainedBy"; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Predicate, "pageSortCriteria", {
        get: function () { return namespace + "pageSortCriteria"; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Predicate, "pageSortOrder", {
        get: function () { return namespace + "pageSortOrder"; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Predicate, "pageSortCollation", {
        get: function () { return namespace + "pageSortCollation"; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Predicate, "pageSequence", {
        get: function () { return namespace + "pageSequence"; },
        enumerable: true,
        configurable: true
    });
    return Predicate;
}());
exports.Predicate = Predicate;
