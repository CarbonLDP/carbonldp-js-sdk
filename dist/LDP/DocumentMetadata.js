"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Utils = require("../Utils");
var C_1 = require("../Vocabularies/C");
var XSD_1 = require("../Vocabularies/XSD");
var VolatileResource_1 = require("./VolatileResource");
exports.SCHEMA = {
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
    SCHEMA: exports.SCHEMA,
    isDecorated: function (object) {
        return Utils.hasPropertyDefined(object, "relatedDocument");
    },
    is: function (object) {
        return VolatileResource_1.VolatileResource.is(object)
            && object.hasType(exports.DocumentMetadata.TYPE)
            && exports.DocumentMetadata.isDecorated(object);
    },
};
exports.default = exports.DocumentMetadata;

//# sourceMappingURL=DocumentMetadata.js.map
