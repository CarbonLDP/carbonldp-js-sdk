"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Document = require("./../Document");
var NS = require("./../NS");
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
    Factory.createDocument = function (targetMembers) {
        var document = Document.Factory.create();
        var fragment = document.createFragment({ targetMembers: targetMembers });
        fragment.types.push(exports.RDF_CLASS);
        return document;
    };
    return Factory;
}());
exports.Factory = Factory;

//# sourceMappingURL=RemoveMemberAction.js.map
