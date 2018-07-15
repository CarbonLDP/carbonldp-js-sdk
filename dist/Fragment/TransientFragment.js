"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var IllegalArgumentError_1 = require("../Errors/IllegalArgumentError");
var ModelDecorator_1 = require("../Model/ModelDecorator");
var URI_1 = require("../RDF/URI");
var Resource_1 = require("../Resource/Resource");
exports.TransientFragment = {
    PROTOTYPE: {
        get $registry() {
            throw new IllegalArgumentError_1.IllegalArgumentError("Property \"$registry\" is required.");
        },
        get $slug() {
            return URI_1.URI.generateBNodeID();
        },
        get $id() {
            if (URI_1.URI.isBNodeID(this.$slug))
                return this.$slug;
            return this.$document.$id + "#" + this.$slug;
        },
        set $id(value) {
            if (URI_1.URI.isBNodeID(value))
                this.$slug = value;
            else
                this.$slug = URI_1.URI.getFragment(value);
        },
        get $document() {
            return this.$registry;
        },
        set $document(document) {
            this.$registry = document;
        },
    },
    isDecorated: function (object) {
        return Resource_1.Resource.isDecorated(object);
    },
    decorate: function (object) {
        if (exports.TransientFragment.isDecorated(object))
            return object;
        var target = ModelDecorator_1.ModelDecorator
            .decorateMultiple(object, Resource_1.Resource);
        if (!target.$registry)
            delete target.$registry;
        if (!target.$slug)
            delete target.$slug;
        return ModelDecorator_1.ModelDecorator
            .definePropertiesFrom(exports.TransientFragment.PROTOTYPE, target);
    },
    is: function (value) {
        return Resource_1.Resource.is(value);
    },
    create: function (data) {
        var copy = Object.assign({}, data);
        return exports.TransientFragment.createFrom(copy);
    },
    createFrom: function (object) {
        return exports.TransientFragment.decorate(object);
    },
};

//# sourceMappingURL=TransientFragment.js.map
