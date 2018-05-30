"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Resource_1 = require("../Resource");
var Vocabularies_1 = require("../Vocabularies");
var SCHEMA = {
    "targetMembers": {
        "@id": Vocabularies_1.C.targetMember,
        "@type": "@id",
        "@container": "@set",
    },
};
exports.RemoveMemberAction = {
    TYPE: Vocabularies_1.C.RemoveMemberAction,
    SCHEMA: SCHEMA,
    is: function (value) {
        return Resource_1.TransientResource.is(value)
            && value.hasOwnProperty("targetMembers");
    },
    create: function (data) {
        var copy = Object.assign({}, data);
        return exports.RemoveMemberAction.createFrom(copy);
    },
    createFrom: function (object) {
        var resource = Resource_1.TransientResource.createFrom(object);
        resource.addType(exports.RemoveMemberAction.TYPE);
        return resource;
    },
};

//# sourceMappingURL=RemoveMemberAction.js.map
