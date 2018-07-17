"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var C_1 = require("../Vocabularies/C");
var VolatileResource_1 = require("./VolatileResource");
var SCHEMA = {
    "documentsMetadata": {
        "@id": C_1.C.documentMetadata,
        "@type": "@id",
        "@container": "@set",
    },
};
exports.ResponseMetadata = {
    TYPE: C_1.C.ResponseMetadata,
    SCHEMA: SCHEMA,
    is: function (object) {
        return VolatileResource_1.VolatileResource.is(object)
            && object.$hasType(exports.ResponseMetadata.TYPE);
    },
};

//# sourceMappingURL=ResponseMetadata.js.map
