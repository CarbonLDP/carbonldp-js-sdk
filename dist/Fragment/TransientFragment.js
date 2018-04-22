"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Errors_1 = require("../Errors");
var Resource_1 = require("../Resource");
var Utils_1 = require("../Utils");
exports.TransientFragment = {
    isDecorated: function (object) {
        return Utils_1.isObject(object)
            && object.hasOwnProperty("_document") && !object.propertyIsEnumerable("_document");
    },
    is: function (value) {
        return Resource_1.TransientResource.is(value) &&
            exports.TransientFragment.isDecorated(value);
    },
    create: function (data) {
        var copy = Object.assign({}, data);
        return exports.TransientFragment.createFrom(copy);
    },
    createFrom: function (object) {
        return exports.TransientFragment.decorate(object);
    },
    decorate: function (object) {
        if (exports.TransientFragment.isDecorated(object))
            return object;
        Resource_1.TransientResource.decorate(object);
        var fragment = object;
        Object.defineProperties(fragment, {
            "_document": {
                writable: true,
                enumerable: false,
                configurable: true,
            },
            "resolve": {
                configurable: true,
                value: resolveFragment,
            },
        });
        return fragment;
    },
};
function resolveFragment() {
    throw new Errors_1.IllegalActionError("A fragment cannot be resolved by itself.");
}

//# sourceMappingURL=TransientFragment.js.map
