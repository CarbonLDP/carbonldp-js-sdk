"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Vocabularies_1 = require("../Vocabularies");
var VolatileResource_1 = require("./VolatileResource");
var SCHEMA = {
    "documentsMetadata": {
        "@id": Vocabularies_1.C.documentMetadata,
        "@type": "@id",
        "@container": "@set",
    },
    "authToken": {
        "@id": Vocabularies_1.CS.authToken,
        "@type": "@id",
    },
};
exports.ResponseMetadata = {
    TYPE: Vocabularies_1.C.ResponseMetadata,
    SCHEMA: SCHEMA,
    is: function (object) {
        return VolatileResource_1.VolatileResource.is(object)
            && object.hasType(exports.ResponseMetadata.TYPE);
    },
};

//# sourceMappingURL=ResponseMetadata.js.map
