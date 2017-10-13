"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var NS = require("./../NS");
exports.RDF_CLASS = NS.C.Class.Error;
exports.SCHEMA = {
    "errorCode": {
        "@id": NS.C.Predicate.errorCode,
        "@type": NS.XSD.DataType.string,
    },
    "errorMessage": {
        "@id": NS.C.Predicate.errorMessage,
        "@language": "en",
    },
    "errorParameters": {
        "@id": NS.C.Predicate.errorParameters,
        "@type": "@id",
    },
};

//# sourceMappingURL=Error.js.map
