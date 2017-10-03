"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var NS = require("./../NS");
var Resource = require("./../Resource");
var Utils = require("./../Utils");
exports.RDF_CLASS = NS.C.Class.RemoveMemberAction;
exports.SCHEMA = {
    "targetMembers": {
        "@id": NS.C.Predicate.targetMember,
        "@type": "@id",
        "@container": "@set",
    },
};
var Factory = (function () {
    function Factory() {
    }
    Factory.hasClassProperties = function (object) {
        return Utils.hasPropertyDefined(object, "targetMembers");
    };
    Factory.create = function (targetMembers) {
        return Resource.Factory.createFrom({
            types: [exports.RDF_CLASS],
            targetMembers: targetMembers,
        });
    };
    return Factory;
}());
exports.Factory = Factory;

//# sourceMappingURL=RemoveMemberAction.js.map
