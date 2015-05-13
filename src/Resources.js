define(["require", "exports", "jsonld", './RDF'], function (require, exports, jsonld, RDF_1) {
    /// <reference path="../typings/es6-promise/es6-promise.d.ts" />
    /// <reference path="../typings/jsonld.js/jsonld.js.d.ts" />
    var Resources = (function () {
        function Resources(documents) {
            this.documents = documents;
        }
        Resources.prototype.get = function (uri) {
            var _this = this;
            return this.documents.get(uri).then(function (processedResponse) {
                var document = processedResponse.result;
                var documentResourceNodes = RDF_1.RDFDocument.Util.getDocumentResources(document);
                if (documentResourceNodes.length > 1)
                    throw new Error('NotSupported: Multiple document resources were returned.');
                var documentResourceNode = documentResourceNodes[0];
                var fragmentNodes = RDF_1.RDFDocument.Util.getFragmentResources(document, documentResourceNode);
                var documentResource = RDF_1.DocumentResource.Factory.from(documentResourceNode, fragmentNodes);
                var persistedDocumentResource = RDF_1.PersistedDocumentResource.Factory.from(documentResource, _this);
                return {
                    result: persistedDocumentResource,
                    response: processedResponse.response
                };
            });
        };
        Resources.prototype.commit = function (object) {
            if (object === void 0) { object = null; }
            return null;
        };
        return Resources;
    })();
    exports.default = Resources;
});
//# sourceMappingURL=Resources.js.map