"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var NS = require("./../NS");
exports.RDF_CLASS = NS.SHACL.Class.ValidationResult;
exports.SCHEMA = {
    "focusNode": {
        "@id": NS.SHACL.Predicate.focusNode,
        "@type": "@id",
    },
    "resultPath": {
        "@id": NS.SHACL.Predicate.resultPath,
        "@type": "@id",
    },
    "value": {
        "@id": NS.SHACL.Predicate.value,
    },
    "sourceShape": {
        "@id": NS.SHACL.Predicate.sourceShape,
        "@type": "@id",
    },
    "sourceConstraintComponent": {
        "@id": NS.SHACL.Predicate.sourceConstraintComponent,
        "@type": "@id",
    },
    "detail": {
        "@id": NS.SHACL.Predicate.detail,
        "@type": "@id",
    },
    "resultMessage": {
        "@id": NS.SHACL.Predicate.resultMessage,
        "@type": NS.XSD.DataType.string,
    },
    "resultSeverity": {
        "@id": NS.SHACL.Predicate.resultSeverity,
        "@type": "@id",
    },
};

//# sourceMappingURL=ValidationResult.js.map
