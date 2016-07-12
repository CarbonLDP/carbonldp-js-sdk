"use strict";
var NS = require("./../NS");
var Pointer = require("./../Pointer");
var Resource = require("./../Resource");
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
    Factory.hasClassProperties = function (object) {
        return (Utils.hasPropertyDefined(object, "memberOfRelation") ||
            Utils.hasPropertyDefined(object, "hasMemberRelation"));
    };
    Factory.decorate = function (object, hasMemberRelation, memberOfRelation) {
        Resource.Factory.decorate(object);
        var container = object;
        hasMemberRelation = hasMemberRelation || container.hasMemberRelation;
        memberOfRelation = memberOfRelation || container.memberOfRelation;
        container.types.push(NS.LDP.Class.Container);
        if (!!hasMemberRelation) {
            container.hasMemberRelation = Pointer.Factory.is(hasMemberRelation) ? hasMemberRelation : Pointer.Factory.create(hasMemberRelation);
        }
        if (!!memberOfRelation) {
            container.memberOfRelation = Pointer.Factory.is(memberOfRelation) ? memberOfRelation : Pointer.Factory.create(memberOfRelation);
        }
        return container;
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

//# sourceMappingURL=Container.js.map
