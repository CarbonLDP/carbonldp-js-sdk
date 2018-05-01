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
var Vocabularies_1 = require("../Vocabularies");
var EventMessage_1 = require("./EventMessage");
var SCHEMA = __assign({}, EventMessage_1.EventMessage.SCHEMA, { "details": {
        "@id": Vocabularies_1.C.details,
        "@type": "@id",
    } });
exports.DocumentCreated = {
    SCHEMA: SCHEMA,
};

//# sourceMappingURL=DocumentCreated.js.map
