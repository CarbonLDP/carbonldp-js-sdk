"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var C_1 = require("../Vocabularies/C");
var XSD_1 = require("../Vocabularies/XSD");
exports.RDF_CLASS = C_1.C.ErrorResponse;
exports.SCHEMA = {
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
var Util = (function () {
    function Util() {
    }
    Util.getMessage = function (errorResponse) {
        return errorResponse
            .errors
            .map(function (error) { return error.errorMessage; })
            .join(", ");
    };
    return Util;
}());
exports.Util = Util;

//# sourceMappingURL=ErrorResponse.js.map
