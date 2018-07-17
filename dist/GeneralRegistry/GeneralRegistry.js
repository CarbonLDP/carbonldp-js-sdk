"use strict";
var __assign = (this && this.__assign) || Object.assign || function(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
            t[p] = s[p];
    }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
var IllegalArgumentError_1 = require("../Errors/IllegalArgumentError");
var ModelDecorator_1 = require("../Model/ModelDecorator");
var ObjectSchemaResolver_1 = require("../ObjectSchema/ObjectSchemaResolver");
var URI_1 = require("../RDF/URI");
var Registry_1 = require("../Registry/Registry");
var Utils_1 = require("../Utils");
exports.GeneralRegistry = {
    PROTOTYPE: {
        get $context() {
            throw new IllegalArgumentError_1.IllegalArgumentError("Property $context is required.");
        },
        get $registry() {
            if (!this.$context || !this.$context.parentContext)
                return;
            return this.$context.parentContext.registry;
        },
        set $registry(value) { },
        get __modelDecorators() { return new Map(); },
        addDecorator: function (decorator) {
            if (!decorator.TYPE)
                throw new IllegalArgumentError_1.IllegalArgumentError("No TYPE specified in the model decorator.");
            this.__modelDecorators.set(decorator.TYPE, decorator);
            return this;
        },
        decorate: function (object) {
            var _this = this;
            if (!object.types)
                return;
            object.types
                .filter(function (type) { return _this.__modelDecorators.has(type); })
                .map(function (type) { return _this.__modelDecorators.get(type); })
                .forEach(function (decorator) { return decorator.decorate(object); });
        },
        $_addPointer: function (pointer) {
            if (this.$context.repository)
                Object.assign(pointer, { $repository: this.$context.repository });
            var resource = Registry_1.Registry.PROTOTYPE.$_addPointer.call(this, pointer);
            resource.$id = this.$context.getObjectSchema().resolveURI(resource.$id, { base: true });
            return resource;
        },
        $_getLocalID: function (id) {
            var uri = this.$context.getObjectSchema().resolveURI(id, { base: true });
            if (!URI_1.URI.isAbsolute(uri) || !URI_1.URI.isBaseOf(this.$context.baseURI, uri))
                throw new IllegalArgumentError_1.IllegalArgumentError("\"" + uri + "\" is out of scope.");
            return URI_1.URI.getRelativeURI(uri, this.$context.baseURI);
        },
    },
    isDecorated: function (object) {
        return ModelDecorator_1.ModelDecorator
            .hasPropertiesFrom(exports.GeneralRegistry.PROTOTYPE, object);
    },
    decorate: function (object) {
        if (exports.GeneralRegistry.isDecorated(object))
            return object;
        var target = ModelDecorator_1.ModelDecorator
            .decorateMultiple(object, Registry_1.Registry, ObjectSchemaResolver_1.ObjectSchemaResolver);
        if (!target.$context)
            delete target.$context;
        return ModelDecorator_1.ModelDecorator
            .definePropertiesFrom(exports.GeneralRegistry.PROTOTYPE, target);
    },
    create: function (data) {
        return exports.GeneralRegistry.createFrom(__assign({}, data));
    },
    createFrom: function (object) {
        var registry = exports.GeneralRegistry.decorate(object);
        if (registry.$registry)
            Utils_1.MapUtils.extend(registry.__modelDecorators, registry.$registry.__modelDecorators);
        return registry;
    },
};

//# sourceMappingURL=GeneralRegistry.js.map
