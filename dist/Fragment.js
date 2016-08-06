"use strict";
var Resource = require("./Resource");
var Utils = require("./Utils");
var Factory = (function () {
    function Factory() {
    }
    Factory.hasClassProperties = function (resource) {
        return (Utils.hasPropertyDefined(resource, "document"));
    };
    Factory.create = function (idOrDocument, document) {
        return this.createFrom({}, idOrDocument, document);
    };
    Factory.createFrom = function (object, idOrDocument, document) {
        if (document === void 0) { document = null; }
        var id = !!idOrDocument && Utils.isString(idOrDocument) ? idOrDocument : "";
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
