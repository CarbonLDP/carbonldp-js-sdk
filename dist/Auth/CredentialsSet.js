"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Vocabularies_1 = require("../Vocabularies");
var SCHEMA = {
    "user": {
        "@id": Vocabularies_1.CS.user,
        "@type": "@id",
    },
    "credentials": {
        "@id": Vocabularies_1.CS.credentials,
        "@type": "@id",
        "@container": "@set",
    },
};
exports.CredentialsSet = {
    TYPE: Vocabularies_1.CS.CredentialsSet,
    SCHEMA: SCHEMA,
};

//# sourceMappingURL=CredentialsSet.js.map
