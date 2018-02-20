"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var SHACL_1 = require("../Vocabularies/SHACL");
var XSD_1 = require("../Vocabularies/XSD");
exports.RDF_CLASS = SHACL_1.SHACL.ValidationReport;
exports.SCHEMA = {
    "conforms": {
        "@id": SHACL_1.SHACL.conforms,
        "@type": XSD_1.XSD.boolean,
    },
    "results": {
        "@id": SHACL_1.SHACL.result,
        "@type": "@id",
        "@container": "@set",
    },
    "shapesGraphWellFormed": {
        "@id": SHACL_1.SHACL.shapesGraphWellFormed,
        "@type": XSD_1.XSD.boolean,
    },
};

//# sourceMappingURL=ValidationReport.js.map
