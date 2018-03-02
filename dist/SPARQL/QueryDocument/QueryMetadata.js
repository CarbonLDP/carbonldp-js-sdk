"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var VolatileResource_1 = require("../../LDP/VolatileResource");
var C_1 = require("../../Vocabularies/C");
var SCHEMA = {
    "target": {
        "@id": C_1.C.target,
        "@type": "@id",
        "@container": "@set",
    },
};
exports.QueryMetadata = {
    TYPE: C_1.C.QueryMetadata,
    SCHEMA: SCHEMA,
    is: function (object) {
        return VolatileResource_1.VolatileResource.is(object)
            && object.hasType(exports.QueryMetadata.TYPE);
    },
};
exports.default = exports.QueryMetadata;

//# sourceMappingURL=QueryMetadata.js.map
