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
var NS = require("./../NS");
var Message = require("./Message");
exports.SCHEMA = __assign({}, Message.SCHEMA, { "details": {
        "@id": NS.C.Predicate.details,
        "@type": "@id",
    } });

//# sourceMappingURL=DocumentCreated.js.map
