"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Errors_1 = require("../../Errors");
var URI = require("../../RDF/URI");
var Class = (function () {
    function Class(schema, partialData) {
        this.schema = partialData ? this.mergeSchemas(partialData.schema, schema) : schema;
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
            for (var key in newDefinition) {
                var newValue = newDefinition[key] instanceof URI.Class ? newDefinition[key].stringValue : newDefinition[key];
                var oldValue = oldDefinition[key] instanceof URI.Class ? oldDefinition[key].stringValue : oldDefinition[key];
                if (newValue !== oldValue)
                    throw new Errors_1.IllegalArgumentError("Property \"" + propertyName + "\" has different \"" + key + "\": \"" + oldValue + "\", \"" + newValue + "\"");
            }
        });
        return newSchema;
    };
    return Class;
}());
exports.Class = Class;
exports.default = Class;

//# sourceMappingURL=PartialMetadata.js.map
