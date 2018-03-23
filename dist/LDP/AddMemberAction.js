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
exports.AddMemberAction = {
    TYPE: C_1.C.AddMemberAction,
    SCHEMA: SCHEMA,
    isDecorated: function (object) {
        return Utils.hasPropertyDefined(object, "targetMembers");
    },
    create: function (targetMembers) {
        return Resource_1.Resource.createFrom({
            types: [exports.AddMemberAction.TYPE],
            targetMembers: targetMembers,
        });
    },
};

//# sourceMappingURL=AddMemberAction.js.map
