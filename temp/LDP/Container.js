"use strict";
var NS = require("./../NS");
var Utils = require("./../Utils");
exports.RDF_CLASS = NS.LDP.Class.Container;
exports.SCHEMA = {
    "contains": {
        "@id": NS.LDP.Predicate.contains,
        "@container": "@set",
        "@type": "@id",
    },
    "members": {
        "@id": NS.LDP.Predicate.member,
        "@container": "@set",
        "@type": "@id",
    },
    "membershipResource": {
        "@id": NS.LDP.Predicate.membershipResource,
        "@type": "@id",
    },
    "memberOfRelation": {
        "@id": NS.LDP.Predicate.memberOfRelation,
        "@type": "@id",
    },
    "hasMemberRelation": {
        "@id": NS.LDP.Predicate.hasMemberRelation,
        "@type": "@id",
    },
    "insertedContentRelation": {
        "@id": NS.LDP.Predicate.insertedContentRelation,
        "@type": "@id",
    },
};
var Factory = (function () {
    function Factory() {
    }
    Factory.hasClassProperties = function (resource) {
        return (Utils.hasPropertyDefined(resource, "memberOfRelation") &&
            Utils.hasPropertyDefined(resource, "hasMemberRelation"));
    };
    Factory.hasRDFClass = function (resourceOrExpandedObject) {
        var types = [];
        if ("@type" in resourceOrExpandedObject) {
            types = resourceOrExpandedObject["@type"];
        }
        else if ("types" in resourceOrExpandedObject) {
            var resource = resourceOrExpandedObject;
            types = resource.types;
        }
        return (types.indexOf(exports.RDF_CLASS) !== -1 ||
            types.indexOf(NS.LDP.Class.BasicContainer) !== -1 ||
            types.indexOf(NS.LDP.Class.DirectContainer) !== -1 ||
            types.indexOf(NS.LDP.Class.IndirectContainer) !== -1);
    };
    return Factory;
}());
exports.Factory = Factory;
