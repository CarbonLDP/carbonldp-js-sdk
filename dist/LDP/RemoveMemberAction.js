"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Resource_1 = require("../Resource");
var C_1 = require("../Vocabularies/C");
var Utils = require("./../Utils");
var SCHEMA = {
    "targetMembers": {
        "@id": C_1.C.targetMember,
        "@type": "@id",
        "@container": "@set",
    },
};
exports.RemoveMemberAction = {
    TYPE: C_1.C.RemoveMemberAction,
    SCHEMA: SCHEMA,
    isDecorated: function (object) {
        return Utils.hasPropertyDefined(object, "targetMembers");
    },
    create: function (targetMembers) {
        return Resource_1.Resource.createFrom({
            types: [exports.RemoveMemberAction.TYPE],
            targetMembers: targetMembers,
        });
    },
};

//# sourceMappingURL=RemoveMemberAction.js.map
