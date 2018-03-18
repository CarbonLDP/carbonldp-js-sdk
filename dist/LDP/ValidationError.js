"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var C_1 = require("../Vocabularies/C");
var SCHEMA = {
    "errorDetails": {
        "@id": C_1.C.errorDetails,
        "@type": "@id",
    },
};
exports.ValidationError = {
    TYPE: C_1.C.ValidationError,
    SCHEMA: SCHEMA,
};
exports.default = exports.ValidationError;

//# sourceMappingURL=ValidationError.js.map
