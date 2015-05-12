define(["require", "exports", './RDF', './Utils'], function (require, exports, RDF, Utils) {
    var Apps = (function () {
        function Apps(parent, containerURI) {
            this.parent = parent;
            this.containerURI = containerURI;
        }
        Apps.prototype.get = function (uri) {
            if (RDF.URI.Util.isRelative(uri)) {
                if (!Utils.S.startsWith(uri, this.containerURI))
                    uri = RDF.URI.Util.resolve(this.containerURI, uri);
                this.parent.resolve(uri);
            }
            return new Promise(function (resolve, reject) {
                // TODO: Implement
                reject("Not implemented");
            });
        };
        return Apps;
    })();
    exports.default = Apps;
});
//# sourceMappingURL=Apps.js.map