"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var NS = require("./../NS");
exports.RDF_CLASS = NS.SHACL.Class.ValidationReport;
exports.SCHEMA = {
    "conforms": {
        "@id": NS.SHACL.Predicate.conforms,
        "@type": NS.XSD.DataType.boolean,
    },
    "results": {
        "@id": NS.SHACL.Predicate.result,
        "@type": "@id",
        "@container": "@set",
    },
    "shapesGraphWellFormed": {
        "@id": NS.SHACL.Predicate.shapesGraphWellFormed,
        "@type": NS.XSD.DataType.boolean,
    },
};

//# sourceMappingURL=ValidationReport.js.map
