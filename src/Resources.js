define(["require", "exports", "jsonld"], function (require, exports, jsonld) {
    /// <reference path="../typings/es6-promise/es6-promise.d.ts" />
    /// <reference path="../typings/jsonld.js/jsonld.js.d.ts" />
    var Resources = (function () {
        function Resources(documents) {
            this.documents = documents;
        }
        Resources.prototype.get = function (uri) {
            return this.documents.get(uri).then(function (processedResponse) {
                // TODO: Implement
                return null;
            });
        };
        return Resources;
    })();
    exports.default = Resources;
});
//# sourceMappingURL=Resources.js.map