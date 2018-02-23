"use strict";
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
}
Object.defineProperty(exports, "__esModule", { value: true });
var C_1 = require("../Vocabularies/C");
var Resource_1 = require("./../Resource");
var Utils = __importStar(require("./../Utils"));
exports.RDF_CLASS = C_1.C.AddMemberAction;
exports.SCHEMA = {
    "targetMembers": {
        "@id": C_1.C.targetMember,
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
        return Resource_1.Resource.createFrom({
            types: [exports.RDF_CLASS],
            targetMembers: targetMembers,
        });
    };
    return Factory;
}());
exports.Factory = Factory;

//# sourceMappingURL=AddMemberAction.js.map
