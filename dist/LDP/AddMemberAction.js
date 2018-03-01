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
exports.SCHEMA = {
    "targetMembers": {
        "@id": C_1.C.targetMember,
        "@type": "@id",
        "@container": "@set",
    },
};
exports.AddMemberAction = {
    TYPE: C_1.C.AddMemberAction,
    SCHEMA: exports.SCHEMA,
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
exports.default = exports.AddMemberAction;

//# sourceMappingURL=AddMemberAction.js.map
