"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Errors = require("./Errors");
var Utils = require("./Utils");
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
        id = !!id ? id : "";
        var pointer = Factory.decorate(object);
        pointer.id = id;
        return pointer;
    };
    Factory.decorate = function (object) {
        if (Factory.hasClassProperties(object))
            return object;
        Object.defineProperties(object, {
            "_id": {
                writable: true,
                enumerable: false,
                configurable: true,
                value: "",
            },
            "_resolved": {
                writable: true,
                enumerable: false,
                configurable: true,
                value: false,
            },
            "id": {
                enumerable: false,
                configurable: true,
                get: function () {
                    if (!this._id)
                        return "";
                    return this._id;
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
        return object;
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
        return Promise.all(promises).then(function (results) {
            var resolvedPointers = results.map(function (result) { return result[0]; });
            var responses = results.map(function (result) { return result[1]; });
            return [resolvedPointers, responses];
        });
    };
    return Util;
}());
exports.Util = Util;

//# sourceMappingURL=Pointer.js.map
