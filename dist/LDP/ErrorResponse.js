"use strict";
var FreeResources = require("./../FreeResources");
var JSONLDParser_1 = require("./../HTTP/JSONLDParser");
var NS = require("./../NS");
var RDF = require("./../RDF");
var SDKContext_1 = require("./../SDKContext");
var IllegalArgumentError_1 = require("../Errors/IllegalArgumentError");
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
var Parser = (function () {
    function Parser() {
    }
    Parser.prototype.parse = function (input) {
        var documents = SDKContext_1.default.documents;
        var parser = new JSONLDParser_1.default();
        return parser.parse(input).then(function (freeNodes) {
            var errorResponse = null;
            var freeResources = FreeResources.Factory.create(documents);
            for (var _i = 0, freeNodes_1 = freeNodes; _i < freeNodes_1.length; _i++) {
                var node = freeNodes_1[_i];
                var resource = freeResources.getPointer(node["@id"]);
                documents.jsonldConverter.compact(node, resource, documents.getSchemaFor(node), freeResources);
                if (RDF.Node.Util.hasType(node, exports.RDF_CLASS)) {
                    if (errorResponse)
                        throw new IllegalArgumentError_1.default("The input string contains more than once c:ErrorResponse.");
                    errorResponse = resource;
                }
            }
            if (!errorResponse)
                throw new IllegalArgumentError_1.default("The input string does not contains a c:ErrorResponse.");
            return errorResponse;
        });
    };
    return Parser;
}());
exports.Parser = Parser;

//# sourceMappingURL=ErrorResponse.js.map
