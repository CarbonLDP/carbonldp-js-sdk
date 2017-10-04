"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var NS = require("./../NS");
exports.RDF_CLASS = NS.C.Class.ErrorResponse;
exports.SCHEMA = {
    "errors": {
        "@id": NS.C.Predicate.error,
        "@type": "@id",
        "@container": "@set",
    },
    "requestID": {
        "@id": NS.C.Predicate.requestID,
        "@type": NS.XSD.DataType.string,
    },
    "statusCode": {
        "@id": NS.C.Predicate.httpStatusCode,
        "@type": NS.XSD.DataType.int,
    },
};
var Util = (function () {
    function Util() {
    }
    Util.getMessage = function (errorResponse) {
        var messages = [];
        for (var _i = 0, _a = errorResponse.errors; _i < _a.length; _i++) {
            var error = _a[_i];
            messages.push(error.message);
        }
        return messages.join(", ");
    };
    return Util;
}());
exports.Util = Util;

//# sourceMappingURL=ErrorResponse.js.map
