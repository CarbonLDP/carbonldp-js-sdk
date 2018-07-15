"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Converter_1 = require("../JSONLD/Converter");
var ModelDecorator_1 = require("../Model/ModelDecorator");
var DigestedObjectSchema_1 = require("../ObjectSchema/DigestedObjectSchema");
var Pointer_1 = require("../Pointer/Pointer");
var URI_1 = require("../RDF/URI");
var RegisteredPointer_1 = require("../Registry/RegisteredPointer");
var Utils_1 = require("../Utils");
function __getContext(registry) {
    if (!registry)
        return;
    if ("$context" in registry && registry.$context)
        return registry.$context;
    return __getContext(registry.$registry);
}
function __resolveURI(resource, uri) {
    if (URI_1.URI.isAbsolute(uri))
        return uri;
    var context = __getContext(resource.$registry);
    if (!context)
        return uri;
    return context
        .getObjectSchema()
        .resolveURI(uri, { vocab: true });
}
exports.Resource = {
    PROTOTYPE: {
        get types() { return []; },
        get $slug() {
            if (URI_1.URI.isBNodeID(this.$id))
                return this.$id;
            return URI_1.URI.getSlug(this.$id);
        },
        set $slug(slug) { },
        addType: function (type) {
            type = __resolveURI(this, type);
            if (this.types.indexOf(type) !== -1)
                return;
            this.types.push(type);
        },
        hasType: function (type) {
            type = __resolveURI(this, type);
            return this.types.indexOf(type) !== -1;
        },
        removeType: function (type) {
            type = __resolveURI(this, type);
            var index = this.types.indexOf(type);
            if (index !== -1)
                this.types.splice(index, 1);
        },
        toJSON: function (contextOrKey) {
            var context = typeof contextOrKey === "object" ?
                contextOrKey : __getContext(this.$registry);
            var generalSchema = context ?
                context.registry.getGeneralSchema() : new DigestedObjectSchema_1.DigestedObjectSchema();
            var resourceSchema = context && context.registry ?
                context.registry.getSchemaFor(this) : generalSchema;
            var jsonldConverter = context ?
                context.jsonldConverter : new Converter_1.JSONLDConverter();
            return jsonldConverter.expand(this, generalSchema, resourceSchema);
        },
    },
    isDecorated: function (object) {
        return Utils_1.isObject(object)
            && ModelDecorator_1.ModelDecorator
                .hasPropertiesFrom(exports.Resource.PROTOTYPE, object);
    },
    is: function (value) {
        return Pointer_1.Pointer.is(value)
            && exports.Resource.isDecorated(value);
    },
    create: function (data) {
        var clone = Object.assign({}, data);
        return exports.Resource.createFrom(clone);
    },
    createFrom: function (object) {
        return exports.Resource.decorate(object);
    },
    decorate: function (object) {
        if (exports.Resource.isDecorated(object))
            return object;
        if (!object.hasOwnProperty("$registry"))
            object.$registry = void 0;
        var resource = ModelDecorator_1.ModelDecorator
            .decorateMultiple(object, RegisteredPointer_1.RegisteredPointer);
        return ModelDecorator_1.ModelDecorator
            .definePropertiesFrom(exports.Resource.PROTOTYPE, resource);
    },
};

//# sourceMappingURL=Resource.js.map
