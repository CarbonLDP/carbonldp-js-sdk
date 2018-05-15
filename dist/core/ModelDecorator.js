"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Utils_1 = require("../Utils");
exports.ModelDecorator = {
    hasPropertiesFrom: function (prototype, object) {
        return Object
            .keys(prototype)
            .every(function (key) {
            var definition = Object
                .getOwnPropertyDescriptor(prototype, key);
            if (definition.value && Utils_1.isFunction(definition.value))
                return Utils_1.hasFunction(object, key);
            return object.hasOwnProperty(key);
        });
    },
    definePropertiesFrom: function (prototype, object) {
        Object
            .keys(prototype)
            .forEach(function (key) {
            var descriptor = {
                enumerable: false,
                configurable: true,
                writable: true,
            };
            var value = prototype[key];
            if (Utils_1.isFunction(value)) {
                descriptor.writable = false;
                descriptor.value = value;
            }
            else {
                descriptor.value = object[key] !== void 0 ?
                    object[key] : value;
            }
            Object.defineProperty(object, key, descriptor);
        });
        return object;
    },
    decorateMultiple: function (object) {
        var models = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            models[_i - 1] = arguments[_i];
        }
        models.forEach(function (model) { return model.decorate(object); });
        return object;
    },
};

//# sourceMappingURL=ModelDecorator.js.map
