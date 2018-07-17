"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var ModelDecorator_1 = require("../Model/ModelDecorator");
var Node_1 = require("../RDF/Node");
var URI_1 = require("../RDF/URI");
var C_1 = require("../Vocabularies/C");
var DigestedObjectSchema_1 = require("./DigestedObjectSchema");
var ObjectSchemaDigester_1 = require("./ObjectSchemaDigester");
function __getSchemaForNode($context, node) {
    var types = Node_1.RDFNode.getTypes(node);
    return __getSchema($context, types, node["@id"]);
}
function __getSchemaForResource($context, resource) {
    var types = resource.types || [];
    return __getSchema($context, types, resource.$id);
}
function __getSchema($context, objectTypes, objectID) {
    if (!$context)
        return new DigestedObjectSchema_1.DigestedObjectSchema();
    if (objectID !== void 0 && !URI_1.URI.hasFragment(objectID) && !URI_1.URI.isBNodeID(objectID) && objectTypes.indexOf(C_1.C.Document) === -1)
        objectTypes = objectTypes.concat(C_1.C.Document);
    var objectSchemas = objectTypes
        .filter(function (type) { return $context.hasObjectSchema(type); })
        .map(function (type) { return $context.getObjectSchema(type); });
    return ObjectSchemaDigester_1.ObjectSchemaDigester
        ._combineSchemas([
        $context.getObjectSchema()
    ].concat(objectSchemas));
}
exports.ObjectSchemaResolver = {
    PROTOTYPE: {
        $context: undefined,
        getGeneralSchema: function () {
            if (!this.$context)
                return new DigestedObjectSchema_1.DigestedObjectSchema();
            return this.$context.getObjectSchema();
        },
        hasSchemaFor: function (object, path) {
            return !path;
        },
        getSchemaFor: function (object) {
            var schema = "types" in object || "$id" in object ?
                __getSchemaForResource(this.$context, object) :
                __getSchemaForNode(this.$context, object);
            if (!("$_queryableMetadata" in object) || !object.$_queryableMetadata)
                return schema;
            return ObjectSchemaDigester_1.ObjectSchemaDigester
                ._combineSchemas([
                schema,
                object.$_queryableMetadata.schema,
            ]);
        },
    },
    isDecorated: function (object) {
        return ModelDecorator_1.ModelDecorator.hasPropertiesFrom(exports.ObjectSchemaResolver.PROTOTYPE, object);
    },
    decorate: function (object) {
        return ModelDecorator_1.ModelDecorator.definePropertiesFrom(exports.ObjectSchemaResolver.PROTOTYPE, object);
    },
};

//# sourceMappingURL=ObjectSchemaResolver.js.map
