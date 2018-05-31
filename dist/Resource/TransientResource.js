"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("../core");
var ObjectSchema_1 = require("../ObjectSchema");
var Pointer_1 = require("../Pointer");
var RDF_1 = require("../RDF");
var Utils_1 = require("../Utils");
function getSchemaResolver(registry) {
    if (!registry)
        return;
    if (ObjectSchema_1.ObjectSchemaResolver.is(registry))
        return registry;
    return getSchemaResolver(registry._registry);
}
function resolveURI(resource, uri) {
    if (RDF_1.URI.isAbsolute(uri))
        return uri;
    var registry = getSchemaResolver(resource._registry);
    if (!registry)
        return uri;
    var schema = registry.getGeneralSchema();
    return ObjectSchema_1.ObjectSchemaUtils.resolveURI(uri, schema, { vocab: true });
}
var PROTOTYPE = {
    get types() { return []; },
    addType: function (type) {
        type = resolveURI(this, type);
        if (this.types.indexOf(type) !== -1)
            return;
        this.types.push(type);
    },
    hasType: function (type) {
        type = resolveURI(this, type);
        return this.types.indexOf(type) !== -1;
    },
    removeType: function (type) {
        type = resolveURI(this, type);
        var index = this.types.indexOf(type);
        if (index !== -1)
            this.types.splice(index, 1);
    },
};
exports.TransientResource = {
    isDecorated: function (object) {
        return Utils_1.isObject(object)
            && core_1.ModelDecorator
                .hasPropertiesFrom(PROTOTYPE, object);
    },
    is: function (value) {
        return Pointer_1.Pointer.is(value)
            && exports.TransientResource.isDecorated(value);
    },
    create: function (data) {
        var clone = Object.assign({}, data);
        return exports.TransientResource.createFrom(clone);
    },
    createFrom: function (object) {
        return exports.TransientResource.decorate(object);
    },
    decorate: function (object) {
        if (exports.TransientResource.isDecorated(object))
            return object;
        var resource = core_1.ModelDecorator
            .decorateMultiple(object, Pointer_1.Pointer);
        return core_1.ModelDecorator
            .definePropertiesFrom(PROTOTYPE, resource);
    },
};

//# sourceMappingURL=TransientResource.js.map
