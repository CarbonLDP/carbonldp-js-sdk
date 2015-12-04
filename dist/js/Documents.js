/// <reference path="../typings/tsd.d.ts" />
var jsonld = require("jsonld");
var Errors = require("./Errors");
var HTTP = require("./HTTP");
var RDF = require("./RDF");
var Document = require("./Document");
var PersistedDocument = require("./PersistedDocument");
var LDP = require("./NS/LDP");
function parse(input) {
    try {
        return JSON.parse(input);
    }
    catch (error) {
        // TODO: Handle SyntaxError
        throw error;
    }
}
function expand(input, options) {
    return new Promise(function (resolve, reject) {
        jsonld.expand(input.result, options, function (error, expanded) {
            if (error) {
                // TODO: Handle jsonld.expand error
                throw error;
            }
            input.result = expanded;
            resolve(input);
        });
    });
}
var Documents = (function () {
    function Documents(context) {
        this.context = context;
    }
    Documents.prototype.get = function (uri, requestOptions) {
        var _this = this;
        if (requestOptions === void 0) { requestOptions = {}; }
        if (RDF.URI.Util.isRelative(uri)) {
            if (!this.context)
                throw new Errors.IllegalArgumentError("IllegalArgument: This module doesn't support relative URIs.");
            uri = this.context.resolve(uri);
        }
        if (this.context && this.context.Auth.isAuthenticated())
            this.context.Auth.addAuthentication(requestOptions);
        HTTP.Request.Util.setAcceptHeader("application/ld+json", requestOptions);
        HTTP.Request.Util.setPreferredInteractionModel(LDP.Class.RDFSource, requestOptions);
        return HTTP.Request.Service.get(uri, requestOptions).then(function (response) {
            var parsedObject = parse(response.data);
            return expand({
                result: parsedObject,
                response: response,
            });
        }).then(function (processedResponse) {
            var expandedResult = processedResponse.result;
            var rdfDocuments = RDF.Document.Util.getDocuments(expandedResult);
            var rdfDocument = _this.getRDFDocument(rdfDocuments, processedResponse.response);
            var document = Document.factory.from(rdfDocument);
            _this.injectDefinitions(document.getFragments().concat(document));
            return {
                result: document,
                response: processedResponse.response,
            };
        }).then(function (processedResponse) {
            var document = processedResponse.result;
            var persistedDocument = PersistedDocument.Factory.from(document, _this.context);
            var etag = HTTP.Response.Util.getETag(processedResponse.response);
            if (etag === null)
                throw new HTTP.Errors.BadResponseError("The response doesn't contain an ETag", processedResponse.response);
            persistedDocument._etag = etag;
            // TODO: Inject persisted container behavior
            return {
                result: persistedDocument,
                response: processedResponse.response,
            };
        });
    };
    Documents.prototype.save = function (persistedDocument, requestOptions) {
        if (requestOptions === void 0) { requestOptions = {}; }
        if (!persistedDocument.isDirty())
            return new Promise(function (resolve) {
                resolve(null);
            });
        if (this.context && this.context.Auth.isAuthenticated())
            this.context.Auth.addAuthentication(requestOptions);
        HTTP.Request.Util.setAcceptHeader("application/ld+json", requestOptions);
        HTTP.Request.Util.setContentTypeHeader("application/ld+json", requestOptions);
        HTTP.Request.Util.setPreferredInteractionModel(LDP.Class.RDFSource, requestOptions);
        HTTP.Request.Util.setIfMatchHeader(persistedDocument._etag, requestOptions);
        return HTTP.Request.Service.put(persistedDocument.uri, persistedDocument.toJSON(), requestOptions);
    };
    Documents.prototype.delete = function (persistedDocument, requestOptions) {
        if (requestOptions === void 0) { requestOptions = {}; }
        if (this.context && this.context.Auth.isAuthenticated())
            this.context.Auth.addAuthentication(requestOptions);
        HTTP.Request.Util.setAcceptHeader("application/ld+json", requestOptions);
        HTTP.Request.Util.setPreferredInteractionModel(LDP.Class.RDFSource, requestOptions);
        HTTP.Request.Util.setIfMatchHeader(persistedDocument._etag, requestOptions);
        return HTTP.Request.Service.delete(persistedDocument.uri, persistedDocument.toJSON(), requestOptions);
    };
    Documents.prototype.getRDFDocument = function (rdfDocuments, response) {
        if (rdfDocuments.length === 0)
            throw new HTTP.Errors.BadResponseError("No document was returned.", response);
        if (rdfDocuments.length > 1)
            throw new Error("Unsupported: Multiple graphs are currently not supported.");
        return rdfDocuments[0];
    };
    Documents.prototype.injectDefinitions = function (resources) {
        var definitionURIs = this.context.getDefinitionURIs();
        for (var i = 0, length_1 = definitionURIs.length; i < length_1; i++) {
            var definitionURI = definitionURIs[i];
            var toInject = [];
            for (var j = 0, resourcesLength = resources.length; j < resourcesLength; j++) {
                var resource = resources[j];
                if (resource.types.indexOf(definitionURI) !== -1)
                    toInject.push(resource);
            }
            if (toInject.length > 0)
                RDF.Resource.Factory.injectDescriptions(toInject, this.context.getDefinition(definitionURI));
        }
        return resources;
    };
    return Documents;
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = Documents;

//# sourceMappingURL=Documents.js.map
