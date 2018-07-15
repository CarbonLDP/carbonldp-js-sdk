"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var IllegalArgumentError_1 = require("../../Errors/IllegalArgumentError");
var GeneralRepository_1 = require("../../GeneralRepository/GeneralRepository");
var ModelDecorator_1 = require("../../Model/ModelDecorator");
var Builder_1 = require("../../SPARQL/Builder");
var Service_1 = require("../../SPARQL/Service");
var Utils_1 = require("../Utils");
exports.SPARQLDocumentsRepositoryTrait = {
    PROTOTYPE: {
        executeASKQuery: function (uri, askQuery, requestOptions) {
            if (!this.$context.registry.inScope(uri, true))
                return Promise.reject(new IllegalArgumentError_1.IllegalArgumentError("\"" + uri + "\" is out of scope."));
            var url = this.$context.getObjectSchema().resolveURI(uri, { base: true });
            return Service_1.SPARQLService
                .executeASKQuery(url, askQuery, requestOptions)
                .then(function (_a) {
                var rawResults = _a[0];
                return rawResults;
            })
                .catch(Utils_1._getErrorResponseParserFn(this.$context.registry));
        },
        executeSELECTQuery: function (uri, selectQuery, requestOptions) {
            if (!this.$context.registry.inScope(uri, true))
                return Promise.reject(new IllegalArgumentError_1.IllegalArgumentError("\"" + uri + "\" is out of scope."));
            var url = this.$context.getObjectSchema().resolveURI(uri, { base: true });
            return Service_1.SPARQLService
                .executeSELECTQuery(url, selectQuery, this.$context.registry, requestOptions)
                .then(function (_a) {
                var selectResults = _a[0];
                return selectResults;
            })
                .catch(Utils_1._getErrorResponseParserFn(this.$context.registry));
        },
        executeUPDATE: function (uri, update, requestOptions) {
            if (!this.$context.registry.inScope(uri, true))
                return Promise.reject(new IllegalArgumentError_1.IllegalArgumentError("\"" + uri + "\" is out of scope."));
            var url = this.$context.getObjectSchema().resolveURI(uri, { base: true });
            return Service_1.SPARQLService
                .executeUPDATE(url, update, requestOptions)
                .then(function () { })
                .catch(Utils_1._getErrorResponseParserFn(this.$context.registry));
        },
        sparql: function (uri) {
            if (!this.$context.registry.inScope(uri, true))
                throw new IllegalArgumentError_1.IllegalArgumentError("\"" + uri + "\" is out of scope.");
            var url = this.$context.getObjectSchema().resolveURI(uri, { base: true });
            var schema = this.$context.registry.getGeneralSchema();
            var builder = new Builder_1.SPARQLBuilder(this, url)
                .base(schema.base)
                .vocab(schema.vocab);
            schema.prefixes.forEach(function (name, prefix) {
                builder = builder.prefix(prefix, name);
            });
            return builder;
        },
    },
    isDecorated: function (object) {
        return ModelDecorator_1.ModelDecorator
            .hasPropertiesFrom(exports.SPARQLDocumentsRepositoryTrait.PROTOTYPE, object);
    },
    decorate: function (object) {
        if (exports.SPARQLDocumentsRepositoryTrait.isDecorated(object))
            return object;
        var target = ModelDecorator_1.ModelDecorator
            .decorateMultiple(object, GeneralRepository_1.GeneralRepository);
        return ModelDecorator_1.ModelDecorator
            .definePropertiesFrom(exports.SPARQLDocumentsRepositoryTrait.PROTOTYPE, target);
    },
};

//# sourceMappingURL=SPARQLDocumentsRepositoryTrait.js.map
