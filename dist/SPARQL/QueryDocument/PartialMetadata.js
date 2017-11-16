"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var URI = require("../../RDF/URI");
var Errors_1 = require("../../Errors");
var Class = (function () {
    function Class(schema, query, partialData) {
        this.schema = partialData ? this.mergeSchemas(partialData.schema, schema) : schema;
        this.query = partialData ? this.mergeQueries(partialData.query, query) : query;
    }
    Class.prototype.mergeSchemas = function (oldSchema, newSchema) {
        oldSchema.prefixes.forEach(function (oldURI, namespace) {
            if (!newSchema.prefixes.has(namespace))
                return newSchema.prefixes.set(namespace, oldURI);
            var newURI = newSchema.prefixes.get(namespace);
            if (newURI.stringValue !== oldURI.stringValue)
                throw new Errors_1.IllegalArgumentError("Prefix \"" + namespace + "\" has different values: \"" + oldURI.stringValue + "\", \"" + newURI.stringValue + "\"");
        });
        oldSchema.properties.forEach(function (oldDefinition, propertyName) {
            if (!newSchema.properties.has(propertyName))
                return newSchema.properties.set(propertyName, oldDefinition);
            var newDefinition = newSchema.properties.get(propertyName);
            for (var definitionProperty in newDefinition) {
                var newValue = newDefinition[definitionProperty] instanceof URI.Class ? newDefinition[definitionProperty].stringValue : newDefinition[definitionProperty];
                var oldValue = oldDefinition[definitionProperty] instanceof URI.Class ? oldDefinition[definitionProperty].stringValue : oldDefinition[definitionProperty];
                if (newValue !== oldValue)
                    throw new Errors_1.IllegalArgumentError("Property \"" + propertyName + "\" has different \"" + propertyName + "\": \"" + oldValue + "\", \"" + newValue + "\"");
            }
        });
        return newSchema;
    };
    Class.prototype.mergeQueries = function (oldQuery, newQuery) {
        var getPredicate = function (optional) {
            return "" + optional.patterns[0].predicates[0];
        };
        var newPredicates = new Set(newQuery.map(getPredicate));
        oldQuery.forEach(function (optional) {
            var oldPredicate = getPredicate(optional);
            if (!newPredicates.has(oldPredicate))
                newQuery.push(optional);
        });
        return newQuery;
    };
    return Class;
}());
exports.Class = Class;
exports.default = Class;

//# sourceMappingURL=PartialMetadata.js.map
