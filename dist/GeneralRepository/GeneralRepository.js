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
var Repository_1 = require("../Repository/Repository");
exports.GeneralRepository = {
    PROTOTYPE: {
        get context() {
            throw new IllegalArgumentError_1.IllegalArgumentError("Property \"context\" is required.");
        },
    },
    isDecorated: function (object) {
        return ModelDecorator_1.ModelDecorator
            .hasPropertiesFrom(exports.GeneralRepository.PROTOTYPE, object);
    },
    decorate: function (object) {
        if (exports.GeneralRepository.isDecorated(object))
            return object;
        var target = ModelDecorator_1.ModelDecorator
            .decorateMultiple(object, Repository_1.Repository);
        return ModelDecorator_1.ModelDecorator
            .definePropertiesFrom(exports.GeneralRepository.PROTOTYPE, target);
    },
    create: function (data) {
        return exports.GeneralRepository.createFrom(__assign({}, data));
    },
    createFrom: function (object) {
        return exports.GeneralRepository.decorate(object);
    },
};

//# sourceMappingURL=GeneralRepository.js.map
