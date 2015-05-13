define(["require", "exports", "jsonld", './RDF'], function (require, exports, jsonld, RDF_1) {
    /// <reference path="../typings/es6-promise/es6-promise.d.ts" />
    /// <reference path="../typings/jsonld.js/jsonld.js.d.ts" />
    //@formatter:on
    var Resources = (function () {
        function Resources(documents) {
            this.documents = documents;
        }
        Resources.prototype.get = function (uri) {
            var _this = this;
            return this.documents.get(uri).then(function (processedResponse) {
                var document = processedResponse.result;
                var documentResourceNodes = RDF_1.RDFDocument.Util.getDocumentResources(document);
                var documentResources = [];
                for (var i = 0, length_1 = documentResourceNodes.length; i < length_1; i++) {
                    var documentResourceNode = documentResourceNodes[i];
                    var fragmentNodes = RDF_1.RDFDocument.Util.getFragmentResources(document, documentResourceNode);
                    var documentResource = RDF_1.DocumentResource.Factory.from(documentResourceNode, fragmentNodes);
                    var persistedDocumentResource = RDF_1.PersistedDocumentResource.Factory.from(documentResource, _this);
                }
                // TODO: Finish implementing
                return null;
            });
        };
        Resources.prototype.commit = function (object) {
            if (object === void 0) { object = null; }
            // TODO: Implement
            return null;
        };
        return Resources;
    })();
    exports.default = Resources;
});
//# sourceMappingURL=Resources.js.map