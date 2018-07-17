"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var NotImplementedError_1 = require("../Errors/NotImplementedError");
var ModelDecorator_1 = require("../Model/ModelDecorator");
function __throwNotImplemented() {
    return Promise.reject(new NotImplementedError_1.NotImplementedError("Must be implemented for a specific repository implementation."));
}
exports.Repository = {
    PROTOTYPE: {
        $get: __throwNotImplemented,
        $resolve: __throwNotImplemented,
        $exists: __throwNotImplemented,
        $refresh: __throwNotImplemented,
        $save: __throwNotImplemented,
        $saveAndRefresh: __throwNotImplemented,
        $delete: __throwNotImplemented,
    },
    isDecorated: function (object) {
        return ModelDecorator_1.ModelDecorator
            .hasPropertiesFrom(exports.Repository.PROTOTYPE, object);
    },
    decorate: function (object) {
        if (exports.Repository.isDecorated(object))
            return;
        return ModelDecorator_1.ModelDecorator
            .definePropertiesFrom(exports.Repository.PROTOTYPE, object);
    },
};

//# sourceMappingURL=Repository.js.map
