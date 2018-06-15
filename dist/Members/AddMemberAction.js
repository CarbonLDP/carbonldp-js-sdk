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
exports.AddMemberAction = {
    TYPE: Vocabularies_1.C.AddMemberAction,
    SCHEMA: SCHEMA,
    is: function (value) {
        return Resource_1.TransientResource.is(value)
            && value.hasType(exports.AddMemberAction.TYPE);
    },
    create: function (data) {
        var copy = Object.assign({}, data);
        return exports.AddMemberAction.createFrom(copy);
    },
    createFrom: function (object) {
        var resource = Resource_1.TransientResource.createFrom(object);
        resource.addType(exports.AddMemberAction.TYPE);
        return resource;
    },
};

//# sourceMappingURL=AddMemberAction.js.map
