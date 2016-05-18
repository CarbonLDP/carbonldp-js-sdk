"use strict";
var IllegalArgumentError_1 = require("../Errors/IllegalArgumentError");
var NS = require("./../NS");
var PersistedDocument = require("./../PersistedDocument");
var Utils = require("./../Utils");
exports.RDF_CLASS = NS.CS.Class.AccessControlList;
exports.SCHEMA = {
    "accessControlEntries": {
        "@id": NS.CS.Predicate.accessControlEntry,
        "@type": "@id",
        "@container": "@set",
    },
    "accessTo": {
        "@id": NS.CS.Predicate.accessTo,
        "@type": "@id",
    },
    "inheritableEntries": {
        "@id": NS.CS.Predicate.inheritableEntry,
        "@type": "@id",
        "@container": "@set",
    },
};
var Factory = (function () {
    function Factory() {
    }
    Factory.hasClassProperties = function (object) {
        return Utils.hasPropertyDefined(object, "accessTo");
    };
    Factory.decorate = function (document) {
        if (!PersistedDocument.Factory.is(document))
            throw new IllegalArgumentError_1.default("The object provided must be a PersistedDocument.");
        var acl = document;
        if (Factory.hasClassProperties(acl))
            return acl;
        return acl;
    };
    return Factory;
}());
exports.Factory = Factory;

//# sourceMappingURL=ACL.js.map
