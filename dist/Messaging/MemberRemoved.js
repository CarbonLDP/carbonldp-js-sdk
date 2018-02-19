"use strict";
var __assign = (this && this.__assign) || Object.assign || function(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
            t[p] = s[p];
    }
    return t;
};
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
}
Object.defineProperty(exports, "__esModule", { value: true });
var NS = __importStar(require("../Vocabularies/index"));
var Message = __importStar(require("./Message"));
exports.RDF_CLASS = NS.C.Class.MemberRemoved;
exports.SCHEMA = __assign({}, Message.SCHEMA, { "details": {
        "@id": NS.C.Predicate.details,
        "@type": "@id",
    } });

//# sourceMappingURL=MemberRemoved.js.map
