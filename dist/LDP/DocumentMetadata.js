"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Vocabularies_1 = require("../Vocabularies");
var SCHEMA = {
    "relatedDocument": {
        "@id": Vocabularies_1.C.relatedDocument,
        "@type": "@id",
    },
    "eTag": {
        "@id": Vocabularies_1.C.eTag,
        "@type": Vocabularies_1.XSD.string,
    },
    "bNodesMap": {
        "@id": Vocabularies_1.C.bNodesMap,
        "@type": "@id",
    },
};
exports.DocumentMetadata = {
    TYPE: Vocabularies_1.C.DocumentMetadata,
    SCHEMA: SCHEMA,
};

//# sourceMappingURL=DocumentMetadata.js.map
