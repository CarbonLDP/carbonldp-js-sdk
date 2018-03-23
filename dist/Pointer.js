"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var IllegalStateError_1 = require("./Errors/IllegalStateError");
var Utils = require("./Utils");
function isPointerResolved() {
    return this._resolved;
}
exports.isPointerResolved = isPointerResolved;
function resolveStandalonePointer() {
    return Promise.reject(new IllegalStateError_1.IllegalStateError("The pointer has not been assigned to a context."));
}
exports.resolveStandalonePointer = resolveStandalonePointer;
exports.Pointer = {
    isDecorated: function (object) {
        return (Utils.hasPropertyDefined(object, "_id") &&
            Utils.hasPropertyDefined(object, "_resolved") &&
            Utils.hasPropertyDefined(object, "id") &&
            Utils.hasFunction(object, "isResolved") &&
            Utils.hasPropertyDefined(object, "resolve"));
    },
    is: function (object) {
        return (Utils.isObject(object) &&
            exports.Pointer.isDecorated(object));
    },
    create: function (id) {
        return exports.Pointer.createFrom({}, id);
    },
    createFrom: function (object, id) {
        var pointer = exports.Pointer.decorate(object);
        if (id)
            pointer.id = id;
        return pointer;
    },
    decorate: function (object) {
        if (exports.Pointer.isDecorated(object))
            return object;
        var pointer = object;
        Object.defineProperties(pointer, {
            "_id": {
                writable: true,
                configurable: true,
                value: pointer.id || "",
            },
            "_resolved": {
                writable: true,
                configurable: true,
                value: pointer._resolved || false,
            },
            "id": {
                enumerable: false,
                configurable: true,
                get: function () {
                    return this._id;
                },
                set: function (value) {
                    this._id = value;
                },
            },
            "isResolved": {
                configurable: true,
                value: isPointerResolved,
            },
            "resolve": {
                writable: false,
                enumerable: false,
                configurable: true,
                value: resolveStandalonePointer,
            },
        });
        return pointer;
    },
    areEqual: function (pointer1, pointer2) {
        return pointer1.id === pointer2.id;
    },
    getIDs: function (pointers) {
        return pointers
            .map(function (pointer) { return pointer.id; });
    },
};

//# sourceMappingURL=Pointer.js.map
