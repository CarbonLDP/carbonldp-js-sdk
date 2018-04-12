"use strict";
var __assign = (this && this.__assign) || Object.assign || function(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
            t[p] = s[p];
    }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
var Document_1 = require("../Document");
var CS_1 = require("../Vocabularies/CS");
var XSD_1 = require("../Vocabularies/XSD");
var SCHEMA = {
    "name": {
        "@id": CS_1.CS.name,
        "@type": XSD_1.XSD.string,
    },
    "description": {
        "@id": CS_1.CS.description,
        "@type": XSD_1.XSD.string,
    },
    "parent": {
        "@id": CS_1.CS.parent,
        "@type": "@id",
    },
    "children": {
        "@id": CS_1.CS.child,
        "@type": "@id",
        "@container": "@set",
    },
    "users": {
        "@id": CS_1.CS.user,
        "@type": "@id",
        "@container": "@set",
    },
};
exports.Role = {
    TYPE: CS_1.CS.Role,
    SCHEMA: SCHEMA,
    is: function (value) {
        return Document_1.Document.is(value)
            && value.hasOwnProperty("name");
    },
    create: function (data) {
        return exports.Role.createFrom(__assign({}, data));
    },
    createFrom: function (object) {
        var role = Document_1.Document.isDecorated(object) ?
            object : Document_1.Document.createFrom(object);
        role.addType(exports.Role.TYPE);
        return role;
    },
};

//# sourceMappingURL=Role.js.map
