"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Utils_1 = require("../Utils");
exports.ModelDecorator = {
    hasPropertiesFrom: function (prototype, object) {
        var prototypeKeys = Object
            .keys(prototype);
        var shouldAddDollar = "$id" in object
            && !prototypeKeys.some(function (key) { return key.startsWith("$"); });
        return prototypeKeys
            .every(function (key) {
            var targetKey = shouldAddDollar ?
                "$" + key : key;
            var definition = Object
                .getOwnPropertyDescriptor(prototype, key);
            if (!definition)
                return false;
            var targetDefinition = Object
                .getOwnPropertyDescriptor(object, targetKey);
            if (!targetDefinition)
                return false;
            if (Utils_1.isFunction(definition.value))
                return Utils_1.isFunction(targetDefinition.value);
            return !targetDefinition.enumerable;
        });
    },
    definePropertiesFrom: function (prototype, object) {
        var prototypeKeys = Object
            .keys(prototype);
        var shouldAddDollar = "$id" in object
            && !prototypeKeys.some(function (key) { return key.startsWith("$"); });
        prototypeKeys
            .forEach(function (key) {
            var targetKey = shouldAddDollar ?
                "$" + key : key;
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
                descriptor.value = object.hasOwnProperty(targetKey) ?
                    object[targetKey] : definition.get ?
                    definition.get() : definition.value;
            }
            else {
                descriptor.get = definition.get;
                descriptor.set = definition.set;
            }
            Object.defineProperty(object, targetKey, descriptor);
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
