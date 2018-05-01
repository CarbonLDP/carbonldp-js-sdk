"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var C_1 = require("../Vocabularies/C");
var XSD_1 = require("../Vocabularies/XSD");
var SCHEMA = {
    "relatedDocument": {
        "@id": C_1.C.relatedDocument,
        "@type": "@id",
    },
    "eTag": {
        "@id": C_1.C.eTag,
        "@type": XSD_1.XSD.string,
    },
    "bNodesMap": {
        "@id": C_1.C.bNodesMap,
        "@type": "@id",
    },
};
exports.DocumentMetadata = {
    TYPE: C_1.C.DocumentMetadata,
    SCHEMA: SCHEMA,
};

//# sourceMappingURL=DocumentMetadata.js.map
