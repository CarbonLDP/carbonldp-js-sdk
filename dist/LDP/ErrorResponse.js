"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Resource_1 = require("../Resource");
var C_1 = require("../Vocabularies/C");
var XSD_1 = require("../Vocabularies/XSD");
var SCHEMA = {
    "errors": {
        "@id": C_1.C.error,
        "@type": "@id",
        "@container": "@set",
    },
    "requestID": {
        "@id": C_1.C.requestID,
        "@type": XSD_1.XSD.string,
    },
    "statusCode": {
        "@id": C_1.C.httpStatusCode,
        "@type": XSD_1.XSD.int,
    },
};
exports.ErrorResponse = {
    TYPE: C_1.C.ErrorResponse,
    SCHEMA: SCHEMA,
    is: function (value) {
        return Resource_1.TransientResource.is(value)
            && value.hasType(exports.ErrorResponse.TYPE);
    },
    getMessage: function (errorResponse) {
        return errorResponse
            .errors
            .map(function (error) { return error.errorMessage; })
            .join(", ");
    },
};

//# sourceMappingURL=ErrorResponse.js.map
