"use strict";
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
}
Object.defineProperty(exports, "__esModule", { value: true });
var NS = __importStar(require("./../NS"));
exports.RDF_CLASS = NS.CS.Class.CredentialsSet;
exports.SCHEMA = {
    "user": {
        "@id": NS.CS.Predicate.user,
        "@type": "@id",
    },
    "credentials": {
        "@id": NS.CS.Predicate.credentials,
        "@type": "@id",
        "@container": "@set",
    },
};

//# sourceMappingURL=CredentialsSet.js.map
