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
exports.AddMemberAction = {
    TYPE: C_1.C.AddMemberAction,
    SCHEMA: SCHEMA,
    is: function (value) {
        return Resource_1.Resource.is(value)
            && value.hasType(exports.AddMemberAction.TYPE);
    },
    create: function (data) {
        var copy = Object.assign({}, data);
        return exports.AddMemberAction.createFrom(copy);
    },
    createFrom: function (object) {
        var resource = Resource_1.Resource.createFrom(object);
        resource.addType(exports.AddMemberAction.TYPE);
        return resource;
    },
};

//# sourceMappingURL=AddMemberAction.js.map
