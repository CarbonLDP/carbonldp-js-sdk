"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var IllegalArgumentError_1 = require("../Errors/IllegalArgumentError");
var DigestedObjectSchema_1 = require("../ObjectSchema/DigestedObjectSchema");
var QueryableMetadata = (function () {
    function QueryableMetadata(schema, previousPartial) {
        this.schema = this.__mergeSchemas(previousPartial ? previousPartial.schema : new DigestedObjectSchema_1.DigestedObjectSchema(), schema);
    }
    QueryableMetadata.prototype.__mergeSchemas = function (oldSchema, newSchema) {
        if (newSchema === QueryableMetadata.ALL || oldSchema === QueryableMetadata.ALL)
            return QueryableMetadata.ALL;
        newSchema.prefixes.forEach(function (newURI, namespace) {
            newURI = newSchema.resolveURI(newURI);
            if (!oldSchema.prefixes.has(namespace))
                return oldSchema.prefixes.set(namespace, newURI);
            var oldURI = oldSchema.prefixes.get(namespace);
            if (oldURI !== newURI)
                throw new IllegalArgumentError_1.IllegalArgumentError("Prefix \"" + namespace + "\" has different value: \"" + oldURI + "\", \"" + newURI + "\".");
        });
        newSchema.properties.forEach(function (newDefinition, propertyName) {
            if (!oldSchema.properties.has(propertyName))
                return oldSchema.properties.set(propertyName, newDefinition);
            var oldDefinition = oldSchema.properties.get(propertyName);
            for (var key in newDefinition) {
                var newValue = newDefinition[key];
                var oldValue = oldDefinition[key];
                if (newValue !== oldValue)
                    throw new IllegalArgumentError_1.IllegalArgumentError("Property \"" + propertyName + "\" has different \"" + key + "\": \"" + oldValue + "\", \"" + newValue + "\".");
            }
        });
        return oldSchema;
    };
    QueryableMetadata.ALL = Object.freeze(new DigestedObjectSchema_1.DigestedObjectSchema());
    return QueryableMetadata;
}());
exports.QueryableMetadata = QueryableMetadata;

//# sourceMappingURL=QueryableMetadata.js.map
