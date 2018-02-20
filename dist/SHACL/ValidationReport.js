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
exports.RDF_CLASS = NS.SHACL.ValidationReport;
exports.SCHEMA = {
    "conforms": {
        "@id": NS.SHACL.conforms,
        "@type": NS.XSD.boolean,
    },
    "results": {
        "@id": NS.SHACL.result,
        "@type": "@id",
        "@container": "@set",
    },
    "shapesGraphWellFormed": {
        "@id": NS.SHACL.shapesGraphWellFormed,
        "@type": NS.XSD.boolean,
    },
};

//# sourceMappingURL=ValidationReport.js.map
