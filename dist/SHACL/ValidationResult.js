"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var SHACL_1 = require("../Vocabularies/SHACL");
var XSD_1 = require("../Vocabularies/XSD");
var SCHEMA = {
    "focusNode": {
        "@id": SHACL_1.SHACL.focusNode,
        "@type": "@id",
    },
    "resultPath": {
        "@id": SHACL_1.SHACL.resultPath,
        "@type": "@id",
    },
    "value": {
        "@id": SHACL_1.SHACL.value,
    },
    "sourceShape": {
        "@id": SHACL_1.SHACL.sourceShape,
        "@type": "@id",
    },
    "sourceConstraintComponent": {
        "@id": SHACL_1.SHACL.sourceConstraintComponent,
        "@type": "@id",
    },
    "detail": {
        "@id": SHACL_1.SHACL.detail,
        "@type": "@id",
    },
    "resultMessage": {
        "@id": SHACL_1.SHACL.resultMessage,
        "@type": XSD_1.XSD.string,
    },
    "resultSeverity": {
        "@id": SHACL_1.SHACL.resultSeverity,
        "@type": "@id",
    },
};
exports.ValidationResult = {
    TYPE: SHACL_1.SHACL.ValidationResult,
    SCHEMA: SCHEMA,
};
exports.default = exports.ValidationResult;

//# sourceMappingURL=ValidationResult.js.map
