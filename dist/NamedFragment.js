"use strict";
var Fragment = require("./Fragment");
var RDF = require("./RDF");
var Utils = require("./Utils");
var Factory = (function () {
    function Factory() {
    }
    Factory.prototype.hasClassProperties = function (resource) {
        return (Utils.hasPropertyDefined(resource, "slug"));
    };
    Factory.prototype.create = function (slug, document) {
        return this.createFrom({}, slug, document);
    };
    Factory.prototype.createFrom = function (object, slug, document) {
        var uri = document.id + "#" + slug;
        var fragment = Fragment.factory.createFrom(object, uri, document);
        if (this.hasClassProperties(fragment))
            return fragment;
        Object.defineProperties(fragment, {
            "slug": {
                enumerable: false,
                configurable: true,
                get: function () {
                    return RDF.URI.Util.getFragment(fragment.id);
                },
                set: function (value) {
                    this.id = this.document.id + "#" + value;
                },
            },
        });
        return fragment;
    };
    return Factory;
}());
exports.Factory = Factory;
exports.factory = new Factory();

//# sourceMappingURL=NamedFragment.js.map
