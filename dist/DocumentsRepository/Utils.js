"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var FreeResources_1 = require("../FreeResources/FreeResources");
var JSONLDParser_1 = require("../JSONLD/JSONLDParser");
var ErrorResponse_1 = require("../LDP/ErrorResponse");
var Pointer_1 = require("../Pointer/Pointer");
var Document_1 = require("../RDF/Document");
var URI_1 = require("../RDF/URI");
var Utils_1 = require("../Utils");
function _parseURIParams(resource, uri, args) {
    var _uri = Utils_1.isString(uri) ?
        URI_1.URI.resolve(resource.$id, uri) : resource.$id;
    var _args = !Utils_1.isString(uri) ?
        Array.from(args) :
        Array.prototype.slice.call(args, 1);
    return { _uri: _uri, _args: _args };
}
exports._parseURIParams = _parseURIParams;
function _parseResourceParams(resource, $resource, args) {
    var _resource = Pointer_1.Pointer.is($resource) ?
        $resource : resource;
    var _args = !Pointer_1.Pointer.is($resource) ?
        Array.from(args) :
        Array.prototype.slice.call(args, 1);
    return { _resource: _resource, _args: _args };
}
exports._parseResourceParams = _parseResourceParams;
function _getErrorResponseParserFn(registry) {
    return function (error) {
        if (!("response" in error))
            return Promise.reject(error);
        if (!error.response.data)
            return Promise.reject(error);
        return new JSONLDParser_1.JSONLDParser()
            .parse(error.response.data)
            .then(function (rdfNodes) {
            var freeNodes = Document_1.RDFDocument.getFreeNodes(rdfNodes);
            var freeResources = FreeResources_1.FreeResources.parseFreeNodes(registry, freeNodes);
            var errorResponses = freeResources
                .getPointers(true)
                .filter(ErrorResponse_1.ErrorResponse.is);
            if (errorResponses.length === 0)
                return Promise.reject(error);
            var errorResponse = Object.assign(error, errorResponses[0]);
            error.message = ErrorResponse_1.ErrorResponse.getMessage(errorResponse);
            return Promise.reject(error);
        }, function () {
            return Promise.reject(error);
        });
    };
}
exports._getErrorResponseParserFn = _getErrorResponseParserFn;

//# sourceMappingURL=Utils.js.map
