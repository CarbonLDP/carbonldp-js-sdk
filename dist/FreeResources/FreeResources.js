"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var IllegalArgumentError_1 = require("../Errors/IllegalArgumentError");
var ModelDecorator_1 = require("../Model/ModelDecorator");
var URI_1 = require("../RDF/URI");
var Registry_1 = require("../Registry/Registry");
var Resource_1 = require("../Resource/Resource");
exports.FreeResources = {
    PROTOTYPE: {
        registry: void 0,
        _getLocalID: function (id) {
            if (URI_1.URI.isBNodeID(id))
                return id;
            throw new IllegalArgumentError_1.IllegalArgumentError("\"" + id + "\" is out of scope.");
        },
        _addPointer: function (base) {
            if (!base.$id)
                base.$id = URI_1.URI.generateBNodeID();
            return Registry_1.Registry.PROTOTYPE._addPointer.call(this, base);
        },
        toJSON: function (contextOrKey) {
            return this
                .getPointers(true)
                .map(function (resource) { return resource.toJSON(contextOrKey); });
        },
    },
    is: function (value) {
        return Registry_1.Registry.isDecorated(value)
            && exports.FreeResources.isDecorated(value);
    },
    isDecorated: function (object) {
        return ModelDecorator_1.ModelDecorator
            .hasPropertiesFrom(exports.FreeResources.PROTOTYPE, object);
    },
    create: function (data) {
        var copy = Object.assign({}, data);
        return exports.FreeResources.createFrom(copy);
    },
    createFrom: function (object) {
        return exports.FreeResources.decorate(object);
    },
    decorate: function (object) {
        if (exports.FreeResources.isDecorated(object))
            return object;
        var base = Object.assign(object, {
            __modelDecorator: Resource_1.Resource,
        });
        var resource = ModelDecorator_1.ModelDecorator
            .decorateMultiple(base, Registry_1.Registry);
        return ModelDecorator_1.ModelDecorator
            .definePropertiesFrom(exports.FreeResources.PROTOTYPE, resource);
    },
    parseFreeNodes: function (registry, freeNodes) {
        var freeResources = exports.FreeResources
            .createFrom({ registry: registry });
        freeNodes
            .forEach(function (node) {
            var digestedSchema = registry.getSchemaFor(node);
            var target = freeResources.getPointer(node["@id"], true);
            registry.context.jsonldConverter.compact(node, target, digestedSchema, freeResources);
        });
        return freeResources;
    },
};

//# sourceMappingURL=FreeResources.js.map
