"use strict";
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
}
Object.defineProperty(exports, "__esModule", { value: true });
var NS = __importStar(require("./../NS"));
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
