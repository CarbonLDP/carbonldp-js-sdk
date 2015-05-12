define(["require", "exports", '../Utils', './URI'], function (require, exports, Utils, URI) {
    var Factory = (function () {
        function Factory() {
        }
        Factory.is = function (object) {
            if (!Utils.hasProperty(object, '@graph'))
                return false;
            if (!Utils.hasProperty(object, '@id'))
                return false;
            return true;
        };
        Factory.create = function (uri, resources) {
            return {
                '@id': uri,
                '@graph': resources
            };
        };
        return Factory;
    })();
    exports.Factory = Factory;
    var Util = (function () {
        function Util() {
        }
        Util.getResources = function (document) {
            if (Utils.isArray(document))
                return document;
            else
                return document['@graph'];
        };
        Util.getDocumentResources = function (document) {
            var resources = Util.getResources(document);
            var documentResources = [];
            for (var i = 0, length = resources.length; i < length; i++) {
                var resource = resources[i];
                var uri = resource['@id'];
                if (!uri)
                    continue;
                if (!URI.Util.hasFragment(uri))
                    documentResources.push(resource);
            }
            return documentResources;
        };
        Util.getFragmentResources = function (document, documentResource) {
            var resources = Util.getResources(document);
            var documentURIToMatch = null;
            if (documentResource) {
                if (Utils.isString(documentResource))
                    documentURIToMatch = documentResource;
                else
                    documentURIToMatch = documentResource['@id'];
            }
            var fragmentResources = [];
            for (var i = 0, length = resources.length; i < length; i++) {
                var resource = resources[i];
                var uri = resource['@id'];
                if (!uri)
                    continue;
                if (!URI.Util.hasFragment(uri))
                    continue;
                if (!documentURIToMatch)
                    fragmentResources.push(resource);
                else {
                    var documentURI = URI.Util.getDocumentURI(uri);
                    if (documentURI === documentURIToMatch)
                        fragmentResources.push(resource);
                }
            }
            return fragmentResources;
        };
        return Util;
    })();
    exports.Util = Util;
});
//# sourceMappingURL=RDFDocument.js.map