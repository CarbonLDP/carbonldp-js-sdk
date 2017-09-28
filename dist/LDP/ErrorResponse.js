"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var FreeResources = require("./../FreeResources");
var Parser_1 = require("./../JSONLD/Parser");
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
        return errorResponse
            .errors
            .map(function (error) { return error.errorMessage; })
            .join(", ");
    };
    return Util;
}());
exports.Util = Util;
var Parser = (function () {
    function Parser() {
    }
    Parser.prototype.parse = function (input, errorResponse) {
        if (errorResponse === void 0) { errorResponse = {}; }
        var documents = SDKContext_1.default.documents;
        var parser = new Parser_1.default();
        return parser.parse(input).then(function (freeNodes) {
            var freeResources = FreeResources.Factory.create(documents);
            for (var _i = 0, freeNodes_1 = freeNodes; _i < freeNodes_1.length; _i++) {
                var node = freeNodes_1[_i];
                var resource = void 0;
                var errorResponseFound = false;
                if (RDF.Node.Util.hasType(node, exports.RDF_CLASS)) {
                    if (errorResponseFound)
                        throw new IllegalArgumentError_1.default("The input string contains more than once c:ErrorResponse.");
                    resource = freeResources.createResourceFrom(errorResponse);
                    errorResponseFound = true;
                }
                else {
                    resource = freeResources.getPointer(node["@id"]);
                }
                documents.jsonldConverter.compact(node, resource, documents.getSchemaFor(node), freeResources);
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
