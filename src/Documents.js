define(["require", "exports", "jsonld", './REST', './Utils', './RDF'], function (require, exports, jsonld, REST, Utils, RDF) {
    /// <reference path="../typings/es6-promise/es6-promise.d.ts" />
    /// <reference path="../typings/jsonld.js/jsonld.js.d.ts" />
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
                if (!error) {
                    input.result = expanded;
                    resolve(input);
                }
                else
                    reject(error);
            });
        });
    }
    var Documents = (function () {
        function Documents(parent) {
            if (parent === void 0) { parent = null; }
            this.parent = parent;
        }
        Documents.prototype.get = function (uri) {
            if (RDF.URI.Util.isRelative(uri)) {
                if (!this.parent)
                    throw new Error("IllegalArgument: This module doesn't support relative URIs.");
                uri = this.parent.resolve(uri);
            }
            return REST.get(uri).then(function (response) {
                var parsedObject = parse(response.data);
                return expand({
                    result: parsedObject,
                    response: response
                });
            }).then(function (processedResponse) {
                var expandedResult = processedResponse.result;
                if (!Utils.isArray(expandedResult)) {
                    if (RDF.RDFDocument.Factory.is(expandedResult))
                        return processedResponse;
                    expandedResult = [expandedResult];
                }
                var uri;
                // TODO: Get URI
                var document = RDF.RDFDocument.Factory.create(uri, expandedResult);
                return {
                    result: document,
                    response: processedResponse.response
                };
            });
        };
        return Documents;
    })();
    exports.default = Documents;
});
//# sourceMappingURL=Documents.js.map