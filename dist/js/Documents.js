/// <reference path="../typings/tsd.d.ts" />
var jsonld = require('jsonld');
var Errors = require('./Errors');
var HTTP = require('./HTTP');
var RDF = require('./RDF');
var Document = require('./Document');
var LDP = require('./NS/LDP');
//@formatter:on
var InteractionModel;
(function (InteractionModel) {
    InteractionModel[InteractionModel["RDFSource"] = 0] = "RDFSource";
    InteractionModel[InteractionModel["Container"] = 1] = "Container";
})(InteractionModel || (InteractionModel = {}));
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
function setPreferredInteractionModel(interactionModel, requestOptions) {
    var headers = requestOptions.headers ? requestOptions.headers : requestOptions.headers = new Map();
    if (!headers.has("Prefer"))
        headers.set("Prefer", new HTTP.Header.Class());
    var prefer = headers.get("Prefer");
    prefer.values.push(new HTTP.Header.Value(LDP.Class.RDFSource + "; rel=interaction-model"));
}
function setAcceptHeader(requestOptions) {
    var headers = requestOptions.headers ? requestOptions.headers : requestOptions.headers = new Map();
    headers.set("Accept", new HTTP.Header.Class("application/ld+json"));
}
var Documents = (function () {
    function Documents(parent) {
        if (parent === void 0) { parent = null; }
        this.parent = parent;
    }
    Documents.prototype.get = function (uri, requestOptions) {
        var _this = this;
        if (requestOptions === void 0) { requestOptions = {}; }
        if (RDF.URI.Util.isRelative(uri)) {
            if (!this.parent)
                throw new Errors.IllegalArgumentError("IllegalArgument: This module doesn't support relative URIs.");
            uri = this.parent.resolve(uri);
        }
        if (this.parent && this.parent.Auth.isAuthenticated())
            this.parent.Auth.addAuthentication(requestOptions);
        setAcceptHeader(requestOptions);
        setPreferredInteractionModel(InteractionModel.RDFSource, requestOptions);
        return HTTP.Request.Service.get(uri, requestOptions).then(function (response) {
            var parsedObject = parse(response.data);
            return expand({
                result: parsedObject,
                response: response
            });
        }).then(function (processedResponse) {
            var expandedResult = processedResponse.result;
            var rdfDocuments = RDF.Document.Util.getDocuments(expandedResult);
            var rdfDocument = _this.getRDFDocument(rdfDocuments);
            var document = Document.factory.from(rdfDocument);
            _this.injectDefinitions(document.getFragments().concat(document));
            // TODO: Inject persisted states
            return {
                result: document,
                response: processedResponse.response
            };
        });
    };
    Documents.prototype.commit = function (document, requestOptions) {
        // TODO: Check if the document was already persisted
        // TODO: Check if the document is dirty
        if (requestOptions === void 0) { requestOptions = {}; }
        if (this.parent && this.parent.Auth.isAuthenticated())
            this.parent.Auth.addAuthentication(requestOptions);
        setAcceptHeader(requestOptions);
        setPreferredInteractionModel(InteractionModel.RDFSource, requestOptions);
        return HTTP.Request.Service.put(document.uri, document.toJSON(), requestOptions);
    };
    Documents.prototype.getRDFDocument = function (rdfDocuments) {
        if (rdfDocuments.length === 0)
            throw new Error('BadResponse: No document was returned.');
        if (rdfDocuments.length > 1)
            throw new Error('Unsupported: Multiple graphs are currently not supported.');
        return rdfDocuments[0];
    };
    Documents.prototype.injectDefinitions = function (resources) {
        var definitionURIs = this.parent.getDefinitionURIs();
        for (var i = 0, length_1 = definitionURIs.length; i < length_1; i++) {
            var definitionURI = definitionURIs[i];
            var toInject = [];
            for (var j = 0, resourcesLength = resources.length; j < resourcesLength; j++) {
                var resource = resources[j];
                if (resource.types.indexOf(definitionURI) !== -1)
                    toInject.push(resource);
            }
            if (toInject.length > 0)
                RDF.Resource.Factory.injectDescriptions(toInject, this.parent.getDefinition(definitionURI));
        }
        return resources;
    };
    return Documents;
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = Documents;

//# sourceMappingURL=Documents.js.map
