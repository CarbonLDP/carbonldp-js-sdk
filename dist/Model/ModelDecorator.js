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
            return object.hasOwnProperty(key) && !object.propertyIsEnumerable(key);
        });
    },
    definePropertiesFrom: function (prototype, object) {
        Object
            .keys(prototype)
            .forEach(function (key) {
            var definition = Object
                .getOwnPropertyDescriptor(prototype, key);
            var descriptor = {
                enumerable: false,
                configurable: true,
            };
            if (Utils_1.isFunction(definition.value)) {
                descriptor.writable = false;
                descriptor.value = definition.value;
            }
            else if (!definition.set) {
                descriptor.writable = true;
                descriptor.value = object.hasOwnProperty(key) ?
                    object[key] : definition.get ?
                    definition.get() : definition.value;
            }
            else {
                descriptor.get = definition.get;
                descriptor.set = definition.set;
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
