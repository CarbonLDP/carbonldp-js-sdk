"use strict";
var NS = require("./../NS");
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
    Factory.decorate = function (object) {
        var acl = object;
        if (Factory.hasClassProperties(acl))
            return acl;
        return acl;
    };
    return Factory;
}());
exports.Factory = Factory;

//# sourceMappingURL=ACL.js.map
