"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var NS = require("./../NS");
exports.RDF_CLASS = NS.C.Class.Platform;
exports.SCHEMA = {
    "version": {
        "@id": NS.C.Predicate.version,
        "@type": NS.XSD.DataType.string,
    },
    "buildDate": {
        "@id": NS.C.Predicate.buildDate,
        "@type": NS.XSD.DataType.dateTime,
    },
};

//# sourceMappingURL=PlatformMetadata.js.map
