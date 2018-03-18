"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var C_1 = require("../Vocabularies/C");
var SCHEMA = {
    "createdDocuments": {
        "@id": C_1.C.createdDocument,
        "@type": "@id",
        "@container": "@set",
    },
};
exports.DocumentCreatedDetails = {
    TYPE: C_1.C.DocumentCreatedDetails,
    SCHEMA: SCHEMA,
};
exports.default = exports.DocumentCreatedDetails;

//# sourceMappingURL=DocumentCreatedDetails.js.map
