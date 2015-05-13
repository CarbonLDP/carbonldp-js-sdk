/// <reference path="../typings/es6/es6.d.ts" />
define(["require", "exports", './Documents', './Resources', './RDF'], function (require, exports, Documents_1, Resources_1, RDF) {
    var App = (function () {
        function App(parent, base) {
            this.parent = parent;
            this.base = base;
            this.Definitions = new Map();
            this.Documents = new Documents_1.default(this);
            this.Resources = new Resources_1.default(this.Documents);
        }
        App.prototype.resolve = function (relativeURI) {
            var finalURI = this.parent.resolve(this.base);
            return RDF.URI.Util.resolve(finalURI, relativeURI);
        };
        return App;
    })();
    exports.default = App;
});
//# sourceMappingURL=App.js.map