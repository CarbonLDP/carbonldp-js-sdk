"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var IllegalArgumentError_1 = require("../../Errors/IllegalArgumentError");
var ObjectSchema_1 = require("../../ObjectSchema");
var PartialMetadata = (function () {
    function PartialMetadata(schema, previousPartial) {
        this.schema = this.mergeSchemas(previousPartial ? previousPartial.schema : new ObjectSchema_1.DigestedObjectSchema(), schema);
    }
    PartialMetadata.prototype.mergeSchemas = function (oldSchema, newSchema) {
        if (newSchema === PartialMetadata.ALL || oldSchema === PartialMetadata.ALL)
            return PartialMetadata.ALL;
        newSchema.prefixes.forEach(function (newURI, namespace) {
            newURI = ObjectSchema_1.ObjectSchemaUtils.resolveURI(newURI, newSchema);
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
    PartialMetadata.ALL = Object.freeze(new ObjectSchema_1.DigestedObjectSchema());
    return PartialMetadata;
}());
exports.PartialMetadata = PartialMetadata;

//# sourceMappingURL=PartialMetadata.js.map
