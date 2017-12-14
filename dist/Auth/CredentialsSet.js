"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var NS = require("./../NS");
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
