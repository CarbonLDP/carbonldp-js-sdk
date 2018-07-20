"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Resource_1 = require("../Resource/Resource");
var C_1 = require("../Vocabularies/C");
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
    is: function (value) {
        return Resource_1.Resource.is(value)
            && value.$hasType(exports.RemoveMemberAction.TYPE);
    },
    create: function (data) {
        var copy = Object.assign({}, data);
        return exports.RemoveMemberAction.createFrom(copy);
    },
    createFrom: function (object) {
        var resource = Resource_1.Resource.createFrom(object);
        resource.$addType(exports.RemoveMemberAction.TYPE);
        return resource;
    },
};

//# sourceMappingURL=RemoveMemberAction.js.map
