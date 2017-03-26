"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var ObjectSchema = require("./ObjectSchema");
var PersistedResource = require("./PersistedResource");
var RDF = require("./RDF");
function resolveURI(uri) {
    if (RDF.URI.Util.isAbsolute(uri))
        return uri;
    var schema = this.document._documents.getGeneralSchema();
    return ObjectSchema.Util.resolveURI(uri, schema);
}
function extendAddType(superFunction) {
    return function (type) {
        type = resolveURI.call(this, type);
        superFunction.call(this, type);
    };
}
function extendHasType(superFunction) {
    return function (type) {
        type = resolveURI.call(this, type);
        return superFunction.call(this, type);
    };
}
function extendRemoveType(superFunction) {
    return function (type) {
        type = resolveURI.call(this, type);
        superFunction.call(this, type);
    };
}
var Factory = (function () {
    function Factory() {
    }
    Factory.decorate = function (fragment, snapshot) {
        if (snapshot === void 0) { snapshot = {}; }
        PersistedResource.Factory.decorate(fragment, snapshot);
        Object.defineProperties(fragment, {
            "addType": {
                writable: false,
                enumerable: false,
                configurable: true,
                value: extendAddType(fragment.addType),
            },
            "hasType": {
                writable: false,
                enumerable: false,
                configurable: true,
                value: extendHasType(fragment.hasType),
            },
            "removeType": {
                writable: false,
                enumerable: false,
                configurable: true,
                value: extendRemoveType(fragment.removeType),
            },
        });
        return fragment;
    };
    return Factory;
}());
exports.Factory = Factory;

//# sourceMappingURL=PersistedFragment.js.map
