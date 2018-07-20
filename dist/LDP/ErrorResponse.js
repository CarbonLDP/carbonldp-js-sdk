"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Resource_1 = require("../Resource/Resource");
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
        return Resource_1.Resource.is(value)
            && value.$hasType(exports.ErrorResponse.TYPE);
    },
    getMessage: function (errorResponse) {
        var errors = getErrors(errorResponse);
        return errors
            .map(getErrorMessage)
            .join(", ");
    },
};
function getErrors(errorResponse) {
    if (errorResponse.errors && errorResponse.errors.length)
        return errorResponse.errors;
    if (!errorResponse[C_1.C.error])
        return [];
    if (Array.isArray(errorResponse[C_1.C.error]))
        return errorResponse[C_1.C.error];
    return [errorResponse[C_1.C.error]];
}
function getErrorMessage(error) {
    if ("errorMessage" in error)
        return error.errorMessage;
    return error[C_1.C.errorMessage];
}

//# sourceMappingURL=ErrorResponse.js.map
