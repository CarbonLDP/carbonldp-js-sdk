"use strict";
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
}
Object.defineProperty(exports, "__esModule", { value: true });
var Errors = __importStar(require("./Errors"));
var Utils = __importStar(require("./Utils"));
var Factory = (function () {
    function Factory() {
    }
    Factory.hasClassProperties = function (object) {
        return (Utils.hasPropertyDefined(object, "_id") &&
            Utils.hasPropertyDefined(object, "_resolved") &&
            Utils.hasPropertyDefined(object, "id") &&
            Utils.hasFunction(object, "isResolved") &&
            Utils.hasPropertyDefined(object, "resolve"));
    };
    Factory.is = function (value) {
        return (Utils.isObject(value) &&
            Factory.hasClassProperties(value));
    };
    Factory.create = function (id) {
        return Factory.createFrom({}, id);
    };
    Factory.createFrom = function (object, id) {
        var pointer = object;
        pointer.id = id || pointer.id;
        return Factory.decorate(pointer);
    };
    Factory.decorate = function (object) {
        var pointer = object;
        if (Factory.hasClassProperties(object))
            return pointer;
        Object.defineProperties(pointer, {
            "_id": {
                writable: true,
                enumerable: false,
                configurable: true,
                value: pointer.id,
            },
            "_resolved": {
                writable: true,
                enumerable: false,
                configurable: true,
                value: !!pointer._resolved,
            },
            "id": {
                enumerable: false,
                configurable: true,
                get: function () {
                    if (!this._id)
                        return "";
                    return this._id || "";
                },
                set: function (value) {
                    this._id = value;
                },
            },
            "isResolved": {
                writable: false,
                enumerable: false,
                configurable: true,
                value: function () {
                    return this._resolved;
                },
            },
            "resolve": {
                writable: false,
                enumerable: false,
                configurable: true,
                value: function () {
                    return Promise.reject(new Errors.NotImplementedError("A simple pointer cannot be resolved by it self."));
                },
            },
        });
        return pointer;
    };
    return Factory;
}());
exports.Factory = Factory;
var Util = (function () {
    function Util() {
    }
    Util.areEqual = function (pointer1, pointer2) {
        return pointer1.id === pointer2.id;
    };
    Util.getIDs = function (pointers) {
        var ids = [];
        for (var _i = 0, pointers_1 = pointers; _i < pointers_1.length; _i++) {
            var pointer = pointers_1[_i];
            ids.push(pointer.id);
        }
        return ids;
    };
    Util.resolveAll = function (pointers) {
        var promises = pointers.map(function (pointer) { return pointer.resolve(); });
        return Promise
            .all(promises)
            .then(function (results) {
            var resolvedPointers = results.map(function (result) { return result[0]; });
            var responses = results.map(function (result) { return result[1]; });
            return [resolvedPointers, responses];
        });
    };
    return Util;
}());
exports.Util = Util;

//# sourceMappingURL=Pointer.js.map
