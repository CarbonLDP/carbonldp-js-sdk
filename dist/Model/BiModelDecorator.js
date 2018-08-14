"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Pointer_1 = require("../Pointer/Pointer");
var ModelDecorator_1 = require("./ModelDecorator");
exports.BiModelDecorator = {
    hasPropertiesFrom: function (prototype, object) {
        return ModelDecorator_1.ModelDecorator.hasPropertiesFrom(prototype, object);
    },
    definePropertiesFrom: function (prototype, object) {
        if ("$id" in object)
            Pointer_1.Pointer
                .decorate(object);
        return ModelDecorator_1.ModelDecorator
            .definePropertiesFrom(prototype, object);
    },
    decorateMultiple: ModelDecorator_1.ModelDecorator.decorateMultiple,
};

//# sourceMappingURL=BiModelDecorator.js.map
