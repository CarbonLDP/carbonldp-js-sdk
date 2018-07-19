"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var IllegalArgumentError_1 = require("../Errors/IllegalArgumentError");
var ModelDecorator_1 = require("../Model/ModelDecorator");
var Pointer_1 = require("../Pointer/Pointer");
exports.RegisteredPointer = {
    PROTOTYPE: {
        get $registry() {
            throw new IllegalArgumentError_1.IllegalArgumentError("Property \"$registry\" is required.");
        },
    },
    isDecorated: function (object) {
        return ModelDecorator_1.ModelDecorator
            .hasPropertiesFrom(exports.RegisteredPointer.PROTOTYPE, object);
    },
    decorate: function (object) {
        if (exports.RegisteredPointer.isDecorated(object))
            return object;
        var resource = ModelDecorator_1.ModelDecorator
            .decorateMultiple(object, Pointer_1.Pointer);
        return ModelDecorator_1.ModelDecorator
            .definePropertiesFrom(exports.RegisteredPointer.PROTOTYPE, resource);
    },
    create: function (data) {
        var copy = Object.assign({}, data);
        return exports.RegisteredPointer.createFrom(copy);
    },
    createFrom: function (object) {
        return exports.RegisteredPointer.decorate(object);
    },
    is: function (value) {
        return Pointer_1.Pointer.is(value)
            && exports.RegisteredPointer.isDecorated(value);
    },
};

//# sourceMappingURL=RegisteredPointer.js.map
