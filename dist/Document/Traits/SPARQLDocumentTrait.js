"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var ModelDecorator_1 = require("../../Model/ModelDecorator");
var URI_1 = require("../../RDF/URI");
var ResolvablePointer_1 = require("../../Repository/ResolvablePointer");
var Utils_1 = require("../../Utils");
var TransientDocument_1 = require("../TransientDocument");
function __parseParams(resource, uriOrQuery, queryOrOptions, options) {
    var uri = resource.$id;
    var query = uriOrQuery;
    if (Utils_1.isObject(queryOrOptions)) {
        options = queryOrOptions;
    }
    else if (queryOrOptions !== void 0) {
        query = queryOrOptions;
        uri = URI_1.URI.resolve(resource.$id, uriOrQuery);
    }
    return { uri: uri, query: query, options: options };
}
exports.SPARQLDocumentTrait = {
    PROTOTYPE: {
        $executeASKQuery: function (uriOrQuery, queryOrOptions, requestOptions) {
            var _a = __parseParams(this, uriOrQuery, queryOrOptions, requestOptions), uri = _a.uri, query = _a.query, options = _a.options;
            return this.$repository.executeASKQuery(uri, query, options);
        },
        $executeSELECTQuery: function (uriOrQuery, queryOrOptions, requestOptions) {
            var _a = __parseParams(this, uriOrQuery, queryOrOptions, requestOptions), uri = _a.uri, query = _a.query, options = _a.options;
            return this.$repository.executeSELECTQuery(uri, query, options);
        },
        $executeUPDATE: function (uriOrQuery, updateOrOptions, requestOptions) {
            var _a = __parseParams(this, uriOrQuery, updateOrOptions, requestOptions), uri = _a.uri, query = _a.query, options = _a.options;
            return this.$repository.executeUPDATE(uri, query, options);
        },
        $sparql: function (uri) {
            var $uri = uri ? URI_1.URI.resolve(this.$id, uri) : this.$id;
            return this.$repository.sparql($uri);
        },
    },
    isDecorated: function (object) {
        return Utils_1.isObject(object)
            && ModelDecorator_1.ModelDecorator
                .hasPropertiesFrom(exports.SPARQLDocumentTrait.PROTOTYPE, object);
    },
    decorate: function (object) {
        if (exports.SPARQLDocumentTrait.isDecorated(object))
            return object;
        var target = ModelDecorator_1.ModelDecorator
            .decorateMultiple(object, TransientDocument_1.TransientDocument, ResolvablePointer_1.ResolvablePointer);
        return ModelDecorator_1.ModelDecorator
            .definePropertiesFrom(exports.SPARQLDocumentTrait.PROTOTYPE, target);
    },
};

//# sourceMappingURL=SPARQLDocumentTrait.js.map
