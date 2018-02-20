"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var C_1 = require("../Vocabularies/C");
var XSD_1 = require("../Vocabularies/XSD");
exports.RDF_CLASS = C_1.C.Error;
exports.SCHEMA = {
    "errorCode": {
        "@id": C_1.C.errorCode,
        "@type": XSD_1.XSD.string,
    },
    "errorMessage": {
        "@id": C_1.C.errorMessage,
        "@language": "en",
    },
    "errorParameters": {
        "@id": C_1.C.errorParameters,
        "@type": "@id",
    },
};

//# sourceMappingURL=Error.js.map
