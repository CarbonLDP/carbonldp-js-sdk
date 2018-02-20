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
exports.RDF_CLASS = NS.C.ErrorResponse;
exports.SCHEMA = {
    "errors": {
        "@id": NS.C.error,
        "@type": "@id",
        "@container": "@set",
    },
    "requestID": {
        "@id": NS.C.requestID,
        "@type": NS.XSD.string,
    },
    "statusCode": {
        "@id": NS.C.httpStatusCode,
        "@type": NS.XSD.int,
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
