"use strict";
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
}
Object.defineProperty(exports, "__esModule", { value: true });
var Fragment = __importStar(require("./Fragment"));
var RDF = __importStar(require("./RDF"));
var Utils = __importStar(require("./Utils"));
var Factory = (function () {
    function Factory() {
    }
    Factory.hasClassProperties = function (resource) {
        return (Utils.hasPropertyDefined(resource, "slug"));
    };
    Factory.create = function (slug, document) {
        return this.createFrom({}, slug, document);
    };
    Factory.createFrom = function (object, slug, document) {
        var uri = document.id + "#" + slug;
        var fragment = Fragment.Factory.createFrom(object, uri, document);
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

//# sourceMappingURL=NamedFragment.js.map
