"use strict";
var Document = require("./../Document");
var NS = require("./../NS");
var RDFDocument = require("./../RDF/Document");
var SDKContext_1 = require("./../SDKContext");
exports.RDF_CLASS = NS.C.Class.ErrorResponse;
exports.SCHEMA = {
    "errors": {
        "@id": NS.C.Predicate.error,
        "@type": "@id",
        "@container": "@set",
    },
    "statusCode": {
        "@id": NS.C.Predicate.httpStatusCode,
        "@type": NS.XSD.DataType.int,
    },
};
var Factory = (function () {
    function Factory() {
    }
    Factory.create = function (data) {
        var errorResponse;
        var errors = [];
        var parser = new RDFDocument.Parser();
        var pointerLib = Document.Factory.create();
        return parser.parse(data).then(function (parsedData) {
            if (parsedData.length === 0)
                return null;
            var nodes = parsedData[0]["@graph"];
            for (var _i = 0, nodes_1 = nodes; _i < nodes_1.length; _i++) {
                var node = nodes_1[_i];
                var compacted = {};
                SDKContext_1.default.documents.compact(node, compacted, pointerLib);
                if (compacted.types.indexOf(exports.RDF_CLASS) !== -1) {
                    errorResponse = compacted;
                }
                else {
                    errors.push(compacted);
                }
                delete compacted.id;
                delete compacted.types;
            }
            errorResponse.errors = errors;
            return errorResponse;
        });
    };
    return Factory;
}());
exports.Factory = Factory;
var Utils = (function () {
    function Utils() {
    }
    Utils.getMessage = function (errorResponse) {
        var messages = [];
        for (var _i = 0, _a = errorResponse.errors; _i < _a.length; _i++) {
            var error = _a[_i];
            messages.push(error.message);
        }
        return messages.join(", ");
    };
    return Utils;
}());
exports.Utils = Utils;

//# sourceMappingURL=ErrorResponse.js.map
