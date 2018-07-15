"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var LDP_1 = require("../LDP");
var Vocabularies_1 = require("../Vocabularies");
var SCHEMA = {
    "target": {
        "@id": Vocabularies_1.C.target,
        "@type": "@id",
        "@container": "@set",
    },
};
exports.QueryMetadata = {
    TYPE: Vocabularies_1.C.QueryMetadata,
    SCHEMA: SCHEMA,
    is: function (value) {
        return LDP_1.VolatileResource.is(value)
            && value.hasType(exports.QueryMetadata.TYPE);
    },
};

//# sourceMappingURL=QueryMetadata.js.map
