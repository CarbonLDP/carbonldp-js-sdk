"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var C_1 = require("../Vocabularies/C");
var XSD_1 = require("../Vocabularies/XSD");
exports.RDF_CLASS = C_1.C.Platform;
exports.SCHEMA = {
    "version": {
        "@id": C_1.C.version,
        "@type": XSD_1.XSD.string,
    },
    "buildDate": {
        "@id": C_1.C.buildDate,
        "@type": XSD_1.XSD.dateTime,
    },
};

//# sourceMappingURL=PlatformMetadata.js.map
