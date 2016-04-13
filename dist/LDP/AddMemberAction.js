"use strict";
var Document = require("./../Document");
var NS = require("./../NS");
var Utils = require("./../Utils");
exports.RDF_CLASS = NS.C.Class.AddMemberAction;
exports.SCHEMA = {
    "targetMember": {
        "@id": NS.C.Predicate.targetMember,
        "@type": "@id",
        "@container": "@set",
    },
};
var Factory = (function () {
    function Factory() {
    }
    Factory.hasClassProperties = function (object) {
        return Utils.hasPropertyDefined(object, "targetMember");
    };
    Factory.createDocument = function (targetMember) {
        var document = Document.Factory.create();
        var fragment = document.createFragment({ targetMember: targetMember });
        fragment.types.push(exports.RDF_CLASS);
        return document;
    };
    return Factory;
}());
exports.Factory = Factory;

//# sourceMappingURL=AddMemberAction.js.map
