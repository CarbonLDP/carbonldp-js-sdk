"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("../core");
var Errors_1 = require("../Errors");
var HTTP_1 = require("../HTTP");
var Resource_1 = require("../Resource");
var Utils_1 = require("../Utils");
var Builder_1 = require("./Builder");
var Service_1 = require("./Service");
function getRegistry(repository) {
    if (repository._registry)
        return repository._registry;
    throw new Errors_1.IllegalActionError("\"" + repository.id + "\" doesn't support SPARQL requests.");
}
function parseParams(resource, registry, uriOrQuery, queryOrOptions, options) {
    if (options === void 0) { options = {}; }
    var iri;
    var query = uriOrQuery;
    if (Utils_1.isObject(queryOrOptions)) {
        options = queryOrOptions;
    }
    else if (queryOrOptions !== void 0) {
        query = queryOrOptions;
        iri = uriOrQuery;
    }
    var url = HTTP_1.RequestUtils.getRequestURLFor(registry, resource, iri);
    if (registry.context && registry.context.auth)
        registry.context.auth.addAuthentication(options);
    return { url: url, query: query, options: options };
}
var PROTOTYPE = {
    _registry: void 0,
    executeRawASKQuery: function (uriOrQuery, queryOrOptions, requestOptions) {
        var _this = this;
        return Utils_1.promiseMethod(function () {
            var registry = getRegistry(_this);
            var _a = parseParams(_this, registry, uriOrQuery, queryOrOptions, requestOptions), url = _a.url, query = _a.query, options = _a.options;
            return Service_1.SPARQLService
                .executeRawASKQuery(url, query, options)
                .then(function (_a) {
                var rawResults = _a[0];
                return rawResults;
            })
                .catch(registry._parseFailedResponse.bind(_this));
        });
    },
    executeASKQuery: function (uriOrQuery, queryOrOptions, requestOptions) {
        var _this = this;
        return Utils_1.promiseMethod(function () {
            var registry = getRegistry(_this);
            var _a = parseParams(_this, registry, uriOrQuery, queryOrOptions, requestOptions), url = _a.url, query = _a.query, options = _a.options;
            return Service_1.SPARQLService
                .executeASKQuery(url, query, options)
                .then(function (_a) {
                var rawResults = _a[0];
                return rawResults;
            })
                .catch(registry._parseFailedResponse.bind(_this));
        });
    },
    executeRawSELECTQuery: function (uriOrQuery, queryOrOptions, requestOptions) {
        var _this = this;
        return Utils_1.promiseMethod(function () {
            var registry = getRegistry(_this);
            var _a = parseParams(_this, registry, uriOrQuery, queryOrOptions, requestOptions), url = _a.url, query = _a.query, options = _a.options;
            return Service_1.SPARQLService
                .executeRawSELECTQuery(url, query, options)
                .then(function (_a) {
                var rawResults = _a[0];
                return rawResults;
            })
                .catch(registry._parseFailedResponse.bind(_this));
        });
    },
    executeSELECTQuery: function (uriOrQuery, queryOrOptions, requestOptions) {
        var _this = this;
        return Utils_1.promiseMethod(function () {
            var registry = getRegistry(_this);
            var _a = parseParams(_this, registry, uriOrQuery, queryOrOptions, requestOptions), url = _a.url, query = _a.query, options = _a.options;
            return Service_1.SPARQLService
                .executeSELECTQuery(url, query, _this._registry, options)
                .then(function (_a) {
                var selectResults = _a[0];
                return selectResults;
            })
                .catch(registry._parseFailedResponse.bind(_this));
        });
    },
    executeRawCONSTRUCTQuery: function (uriOrQuery, queryOrOptions, requestOptions) {
        var _this = this;
        return Utils_1.promiseMethod(function () {
            var registry = getRegistry(_this);
            var _a = parseParams(_this, registry, uriOrQuery, queryOrOptions, requestOptions), url = _a.url, query = _a.query, options = _a.options;
            return Service_1.SPARQLService
                .executeRawCONSTRUCTQuery(url, query, options)
                .then(function (_a) {
                var strConstruct = _a[0];
                return strConstruct;
            })
                .catch(registry._parseFailedResponse.bind(_this));
        });
    },
    executeRawDESCRIBEQuery: function (uriOrQuery, queryOrOptions, requestOptions) {
        var _this = this;
        return Utils_1.promiseMethod(function () {
            var registry = getRegistry(_this);
            var _a = parseParams(_this, registry, uriOrQuery, queryOrOptions, requestOptions), url = _a.url, query = _a.query, options = _a.options;
            return Service_1.SPARQLService
                .executeRawDESCRIBEQuery(url, query, options)
                .then(function (_a) {
                var strDescribe = _a[0];
                return strDescribe;
            })
                .catch(registry._parseFailedResponse.bind(_this));
        });
    },
    executeUPDATE: function (uriOrQuery, updateOrOptions, requestOptions) {
        var _this = this;
        return Utils_1.promiseMethod(function () {
            var registry = getRegistry(_this);
            var _a = parseParams(_this, registry, uriOrQuery, updateOrOptions, requestOptions), url = _a.url, update = _a.query, options = _a.options;
            return Service_1.SPARQLService
                .executeUPDATE(url, update, options)
                .then(function () { })
                .catch(registry._parseFailedResponse.bind(_this));
        });
    },
    sparql: function (uri) {
        var registry = getRegistry(this);
        var iri = HTTP_1.RequestUtils.getRequestURLFor(registry, this, uri);
        var schema = registry.getGeneralSchema();
        var builder = new Builder_1.SPARQLBuilder(this, iri)
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
            .decorateMultiple(object, Resource_1.TransientResource);
        return core_1.ModelDecorator
            .definePropertiesFrom(PROTOTYPE, resource);
    },
};

//# sourceMappingURL=SPARQLDocument.js.map
