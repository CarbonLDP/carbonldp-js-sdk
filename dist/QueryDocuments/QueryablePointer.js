"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var ModelDecorator_1 = require("../Model/ModelDecorator");
var ResolvablePointer_1 = require("../Repository/ResolvablePointer");
exports.QueryablePointer = {
    PROTOTYPE: {
        _queryableMetadata: void 0,
        isQueried: function () {
            return !!this._queryableMetadata;
        },
    },
    isDecorated: function (object) {
        return ModelDecorator_1.ModelDecorator
            .hasPropertiesFrom(exports.QueryablePointer.PROTOTYPE, object);
    },
    decorate: function (object) {
        if (exports.QueryablePointer.isDecorated(object))
            return object;
        var target = ModelDecorator_1.ModelDecorator
            .decorateMultiple(object, ResolvablePointer_1.ResolvablePointer);
        return ModelDecorator_1.ModelDecorator
            .definePropertiesFrom(exports.QueryablePointer.PROTOTYPE, target);
    },
    is: function (value) {
        return ResolvablePointer_1.ResolvablePointer.is(value)
            && exports.QueryablePointer.isDecorated(value);
    },
};

//# sourceMappingURL=QueryablePointer.js.map
