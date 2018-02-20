"use strict";
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
}
Object.defineProperty(exports, "__esModule", { value: true });
var NS = __importStar(require("../Vocabularies/index"));
exports.RDF_CLASS = NS.SHACL.ValidationResult;
exports.SCHEMA = {
    "focusNode": {
        "@id": NS.SHACL.focusNode,
        "@type": "@id",
    },
    "resultPath": {
        "@id": NS.SHACL.resultPath,
        "@type": "@id",
    },
    "value": {
        "@id": NS.SHACL.value,
    },
    "sourceShape": {
        "@id": NS.SHACL.sourceShape,
        "@type": "@id",
    },
    "sourceConstraintComponent": {
        "@id": NS.SHACL.sourceConstraintComponent,
        "@type": "@id",
    },
    "detail": {
        "@id": NS.SHACL.detail,
        "@type": "@id",
    },
    "resultMessage": {
        "@id": NS.SHACL.resultMessage,
        "@type": NS.XSD.string,
    },
    "resultSeverity": {
        "@id": NS.SHACL.resultSeverity,
        "@type": "@id",
    },
};

//# sourceMappingURL=ValidationResult.js.map
