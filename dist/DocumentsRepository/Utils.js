"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var IllegalArgumentError_1 = require("../Errors/IllegalArgumentError");
var FreeResources_1 = require("../FreeResources/FreeResources");
var Parser_1 = require("../JSONLD/Parser");
var ErrorResponse_1 = require("../LDP/ErrorResponse");
var Pointer_1 = require("../Pointer/Pointer");
var URI_1 = require("../RDF/URI");
var Utils_1 = require("../Utils");
function _getNotInContextMessage(uri) {
    return "\"" + uri + "\" is out of scope.";
}
exports._getNotInContextMessage = _getNotInContextMessage;
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
        return new Parser_1.JSONLDParser()
            .parse(error.response.data)
            .then(function (freeNodes) {
            var freeResources = FreeResources_1.FreeResources.parseFreeNodes(registry, freeNodes);
            var errorResponses = freeResources
                .getPointers(true)
                .filter(ErrorResponse_1.ErrorResponse.is);
            if (errorResponses.length === 0)
                return Promise.reject(new IllegalArgumentError_1.IllegalArgumentError("The response string does not contains a c:ErrorResponse."));
            if (errorResponses.length > 1)
                return Promise.reject(new IllegalArgumentError_1.IllegalArgumentError("The response string contains multiple c:ErrorResponse."));
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
