"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("../core");
var Errors_1 = require("../Errors");
var SPARQL_1 = require("../SPARQL");
var Utils_1 = require("../Utils");
var TransientDocument_1 = require("./TransientDocument");
function getRegistry(repository) {
    if (repository._registry)
        return repository._registry;
    throw new Errors_1.IllegalActionError("\"" + repository.id + "\" doesn't support SPARQL requests.");
}
function parseParams(resource, uriOrQuery, queryOrOptions, options) {
    if (options === void 0) { options = {}; }
    var registry = getRegistry(resource);
    var iri;
    var query = uriOrQuery;
    if (Utils_1.isObject(queryOrOptions)) {
        options = queryOrOptions;
    }
    else if (queryOrOptions !== void 0) {
        query = queryOrOptions;
        iri = uriOrQuery;
    }
    iri = registry._requestURLFor(resource, iri);
    if (registry._context && registry._context.auth)
        registry._context.auth.addAuthentication(options);
    return { iri: iri, query: query, options: options };
}
var PROTOTYPE = {
    executeRawASKQuery: function (uriOrQuery, queryOrOptions, requestOptions) {
        var _this = this;
        return Utils_1.promiseMethod(function () {
            var _a = parseParams(_this, uriOrQuery, queryOrOptions, requestOptions), iri = _a.iri, query = _a.query, options = _a.options;
            return SPARQL_1.SPARQLService
                .executeRawASKQuery(iri, query, options)
                .then(function (_a) {
                var rawResults = _a[0];
                return rawResults;
            })
                .catch(_this._registry._parseErrorResponse.bind(_this));
        });
    },
    executeASKQuery: function (uriOrQuery, queryOrOptions, requestOptions) {
        var _this = this;
        return Utils_1.promiseMethod(function () {
            var _a = parseParams(_this, uriOrQuery, queryOrOptions, requestOptions), iri = _a.iri, query = _a.query, options = _a.options;
            return SPARQL_1.SPARQLService
                .executeASKQuery(iri, query, options)
                .then(function (_a) {
                var rawResults = _a[0];
                return rawResults;
            })
                .catch(_this._registry._parseErrorResponse.bind(_this));
        });
    },
    executeRawSELECTQuery: function (uriOrQuery, queryOrOptions, requestOptions) {
        var _this = this;
        return Utils_1.promiseMethod(function () {
            var _a = parseParams(_this, uriOrQuery, queryOrOptions, requestOptions), iri = _a.iri, query = _a.query, options = _a.options;
            return SPARQL_1.SPARQLService
                .executeRawSELECTQuery(iri, query, options)
                .then(function (_a) {
                var rawResults = _a[0];
                return rawResults;
            })
                .catch(_this._registry._parseErrorResponse.bind(_this));
        });
    },
    executeSELECTQuery: function (uriOrQuery, queryOrOptions, requestOptions) {
        var _this = this;
        return Utils_1.promiseMethod(function () {
            var _a = parseParams(_this, uriOrQuery, queryOrOptions, requestOptions), iri = _a.iri, query = _a.query, options = _a.options;
            return SPARQL_1.SPARQLService
                .executeSELECTQuery(iri, query, _this._registry, options)
                .then(function (_a) {
                var selectResults = _a[0];
                return selectResults;
            })
                .catch(_this._registry._parseErrorResponse.bind(_this));
        });
    },
    executeRawCONSTRUCTQuery: function (uriOrQuery, queryOrOptions, requestOptions) {
        var _this = this;
        return Utils_1.promiseMethod(function () {
            var _a = parseParams(_this, uriOrQuery, queryOrOptions, requestOptions), iri = _a.iri, query = _a.query, options = _a.options;
            return SPARQL_1.SPARQLService
                .executeRawCONSTRUCTQuery(iri, query, options)
                .then(function (_a) {
                var strConstruct = _a[0];
                return strConstruct;
            })
                .catch(_this._registry._parseErrorResponse.bind(_this));
        });
    },
    executeRawDESCRIBEQuery: function (uriOrQuery, queryOrOptions, requestOptions) {
        var _this = this;
        return Utils_1.promiseMethod(function () {
            var _a = parseParams(_this, uriOrQuery, queryOrOptions, requestOptions), iri = _a.iri, query = _a.query, options = _a.options;
            return SPARQL_1.SPARQLService
                .executeRawDESCRIBEQuery(iri, query, options)
                .then(function (_a) {
                var strDescribe = _a[0];
                return strDescribe;
            })
                .catch(_this._registry._parseErrorResponse.bind(_this));
        });
    },
    executeUPDATE: function (uriOrQuery, updateOrOptions, requestOptions) {
        var _this = this;
        return Utils_1.promiseMethod(function () {
            var _a = parseParams(_this, uriOrQuery, updateOrOptions, requestOptions), iri = _a.iri, update = _a.query, options = _a.options;
            return SPARQL_1.SPARQLService
                .executeUPDATE(iri, update, options)
                .then(function () { })
                .catch(_this._registry._parseErrorResponse.bind(_this));
        });
    },
    sparql: function (uri) {
        var registry = getRegistry(this);
        var iri = registry._requestURLFor(this, uri);
        var schema = registry.getGeneralSchema();
        var builder = new SPARQL_1.SPARQLBuilder(this, iri)
            .base(schema.base)
            .vocab(schema.vocab);
        schema.prefixes.forEach(function (name, prefix) {
            builder = builder.prefix(prefix, name);
        });
        return builder;
    },
};
exports.SPARQLDocument = {
    PROTOTYPE: PROTOTYPE,
    isDecorated: function (object) {
        return Utils_1.isObject(object)
            && core_1.ModelDecorator
                .hasPropertiesFrom(PROTOTYPE, object);
    },
    decorate: function (object) {
        if (exports.SPARQLDocument.isDecorated(object))
            return object;
        var resource = core_1.ModelDecorator
            .decorateMultiple(object, TransientDocument_1.TransientDocument);
        return core_1.ModelDecorator
            .definePropertiesFrom(PROTOTYPE, resource);
    },
};

//# sourceMappingURL=SPARQLDocument.js.map
