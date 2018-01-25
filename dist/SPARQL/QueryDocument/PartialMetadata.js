"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Errors_1 = require("../../Errors");
var ObjectSchema_1 = require("../../ObjectSchema");
var URI = require("../../RDF/URI");
exports.ALL = Object.freeze(new ObjectSchema_1.DigestedObjectSchema());
var Class = (function () {
    function Class(schema, previousPartial) {
        this.schema = this.mergeSchemas(previousPartial ? previousPartial.schema : new ObjectSchema_1.DigestedObjectSchema(), schema);
    }
    Class.prototype.mergeSchemas = function (oldSchema, newSchema) {
        if (newSchema === exports.ALL || oldSchema === exports.ALL)
            return exports.ALL;
        newSchema.prefixes.forEach(function (newURI, namespace) {
            if (!oldSchema.prefixes.has(namespace))
                return oldSchema.prefixes.set(namespace, newURI);
            var oldURI = oldSchema.prefixes.get(namespace);
            if (oldURI.stringValue !== newURI.stringValue)
                throw new Errors_1.IllegalArgumentError("Prefix \"" + namespace + "\" has different values: \"" + oldURI.stringValue + "\", \"" + newURI.stringValue + "\"");
        });
        newSchema.properties.forEach(function (newDefinition, propertyName) {
            if (!oldSchema.properties.has(propertyName))
                return oldSchema.properties.set(propertyName, newDefinition);
            var oldDefinition = oldSchema.properties.get(propertyName);
            for (var key in newDefinition) {
                var newValue = newDefinition[key] instanceof URI.Class ? newDefinition[key].stringValue : newDefinition[key];
                var oldValue = oldDefinition[key] instanceof URI.Class ? oldDefinition[key].stringValue : oldDefinition[key];
                if (newValue !== oldValue)
                    throw new Errors_1.IllegalArgumentError("Property \"" + propertyName + "\" has different \"" + key + "\": \"" + oldValue + "\", \"" + newValue + "\"");
            }
        });
        return oldSchema;
    };
    return Class;
}());
exports.Class = Class;
exports.default = Class;

//# sourceMappingURL=PartialMetadata.js.map
