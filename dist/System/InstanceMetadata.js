"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var NS = require("./../NS");
exports.RDF_CLASS = NS.C.Class.Instance;
exports.SCHEMA = {
    "name": {
        "@id": NS.CS.Predicate.namae,
        "@type": NS.XSD.DataType.string,
    },
    "description": {
        "@id": NS.CS.Predicate.description,
        "@type": NS.XSD.DataType.string,
    },
    "allowsOrigins": {
        "@id": NS.CS.Predicate.allowsOrigin,
        "@container": "@set",
    },
};

//# sourceMappingURL=InstanceMetadata.js.map
