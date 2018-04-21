"use strict";
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
}
Object.defineProperty(exports, "__esModule", { value: true });
var Resource_1 = require("../Resource");
var C_1 = require("../Vocabularies/C");
var Utils = __importStar(require("./../Utils"));
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
        return Resource_1.TransientResource.createFrom({
            types: [exports.RemoveMemberAction.TYPE],
            targetMembers: targetMembers,
        });
    },
};

//# sourceMappingURL=RemoveMemberAction.js.map
