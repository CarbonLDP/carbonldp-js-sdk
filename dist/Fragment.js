"use strict";
var Resource = require("./Resource");
var Utils = require("./Utils");
var Factory = (function () {
    function Factory() {
    }
    Factory.prototype.hasClassProperties = function (resource) {
        return (Utils.hasPropertyDefined(resource, "document"));
    };
    Factory.prototype.create = function (idOrDocument, document) {
        if (document === void 0) { document = null; }
        return this.createFrom({}, idOrDocument, document);
    };
    Factory.prototype.createFrom = function (object, idOrDocument, document) {
        if (document === void 0) { document = null; }
        var id = !!document ? idOrDocument : Util.generateID();
        var resource = Resource.Factory.createFrom(object, id);
        if (this.hasClassProperties(resource))
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
exports.factory = new Factory();
var Util = (function () {
    function Util() {
    }
    Util.generateID = function () {
        return "_:" + Utils.UUID.generate();
    };
    return Util;
}());
exports.Util = Util;

//# sourceMappingURL=Fragment.js.map
