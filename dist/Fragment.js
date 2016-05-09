"use strict";
var RDF = require("./RDF");
var Resource = require("./Resource");
var Utils = require("./Utils");
var Factory = (function () {
    function Factory() {
    }
    Factory.hasClassProperties = function (resource) {
        return (Utils.hasPropertyDefined(resource, "document"));
    };
    Factory.create = function (idOrDocument, document) {
        if (document === void 0) { document = null; }
        return this.createFrom({}, idOrDocument, document);
    };
    Factory.createFrom = function (object, idOrDocument, document) {
        if (document === void 0) { document = null; }
        var id = !!document ? idOrDocument : RDF.URI.Util.generateBNodeID();
        document = document || idOrDocument;
        var resource = Resource.Factory.createFrom(object, id);
        if (Factory.hasClassProperties(resource))
            return resource;
        Object.defineProperties(resource, {
            "document": {
                writable: false,
                enumerable: false,
                configurable: true,
                value: document,
            },
        });
        return resource;
    };
    return Factory;
}());
exports.Factory = Factory;

//# sourceMappingURL=Fragment.js.map
