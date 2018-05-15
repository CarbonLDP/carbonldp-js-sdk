"use strict";
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
var Utils = __importStar(require("../Utils"));
exports.Pointer = {
    isDecorated: function (object) {
        return (Utils.hasPropertyDefined(object, "_id") &&
            Utils.hasPropertyDefined(object, "id"));
    },
    is: function (value) {
        return (Utils.isObject(value) &&
            exports.Pointer.isDecorated(value));
    },
    create: function (data) {
        var clone = Object.assign({}, data);
        return exports.Pointer.createFrom(clone);
    },
    createFrom: function (object) {
        return exports.Pointer.decorate(object);
    },
    decorate: function (object) {
        if (exports.Pointer.isDecorated(object))
            return object;
        var pointer = object;
        Object.defineProperties(pointer, {
            "_registry": {
                writable: true,
                enumerable: false,
                configurable: true,
            },
            "_id": {
                writable: true,
                enumerable: false,
                configurable: true,
                value: pointer.id || "",
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
    getID: function (pointerOrIRI) {
        return Utils.isString(pointerOrIRI) ? pointerOrIRI : pointerOrIRI.id;
    },
};

//# sourceMappingURL=Pointer.js.map
