"use strict";
var ObjectSchema = require("./ObjectSchema");
var PersistedResource = require("./PersistedResource");
var RDF = require("./RDF");
function resolveURI(uri) {
    if (RDF.URI.Util.isAbsolute(uri))
        return uri;
    uri = ObjectSchema.Digester.resolvePrefixedURI(new RDF.URI.Class(uri), this.document._documents.getGeneralSchema()).stringValue;
    var schema = this.document._documents.getSchemaFor(this);
    if (schema.vocab)
        uri = RDF.URI.Util.resolve(schema.vocab, uri);
    return uri;
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
