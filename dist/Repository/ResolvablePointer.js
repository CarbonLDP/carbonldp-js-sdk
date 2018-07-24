"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Utils_1 = require("../DocumentsRepository/Utils");
var IllegalArgumentError_1 = require("../Errors/IllegalArgumentError");
var ModelDecorator_1 = require("../Model/ModelDecorator");
var Pointer_1 = require("../Pointer/Pointer");
var Utils_2 = require("../Utils");
function __internalRevert(target, source) {
    if (!Utils_2.isObject(target) || !Utils_2.isObject(source))
        return;
    new Set(Object.keys(target).concat(Object.keys(source))).forEach(function (key) {
        var sourceValue = Array.isArray(source[key]) ? source[key].slice() : source[key];
        if (sourceValue === null || sourceValue === void 0) {
            delete target[key];
            return;
        }
        if (Utils_2.isFunction(sourceValue))
            return;
        target[key] = sourceValue;
    });
}
exports.ResolvablePointer = {
    PROTOTYPE: {
        get $repository() {
            throw new IllegalArgumentError_1.IllegalArgumentError("Property \"$repository\" is required.");
        },
        $eTag: void 0,
        _resolved: false,
        isResolved: function () {
            return this._resolved;
        },
        _snapshot: {},
        _syncSnapshot: function () {
            var clone = Utils_2.ObjectUtils.clone(this, { arrays: true });
            if (this.types)
                clone.types = this.types.slice();
            this._snapshot = clone;
        },
        isDirty: function () {
            return !Utils_2.ObjectUtils
                .areEqual(this, this._snapshot, { arrays: true });
        },
        revert: function () {
            __internalRevert(this, this._snapshot);
            if (!this.types)
                this.types = [];
        },
        get: function (uri) {
            var _a = Utils_1._parseURIParams(this, uri, arguments), _uri = _a._uri, _args = _a._args;
            return (_b = this.$repository).get.apply(_b, [_uri].concat(_args));
            var _b;
        },
        resolve: function (resource) {
            var _a = Utils_1._parseResourceParams(this, resource, arguments), _resource = _a._resource, _args = _a._args;
            return (_b = this.$repository).resolve.apply(_b, [_resource].concat(_args));
            var _b;
        },
        exists: function (uri) {
            var _a = Utils_1._parseURIParams(this, uri, arguments), _uri = _a._uri, _args = _a._args;
            return (_b = this.$repository).exists.apply(_b, [_uri].concat(_args));
            var _b;
        },
        refresh: function (resource) {
            var args = [];
            for (var _i = 1; _i < arguments.length; _i++) {
                args[_i - 1] = arguments[_i];
            }
            var _a = Utils_1._parseResourceParams(this, resource, arguments), _resource = _a._resource, _args = _a._args;
            return (_b = this.$repository).refresh.apply(_b, [_resource].concat(_args));
            var _b;
        },
        save: function (resource) {
            var args = [];
            for (var _i = 1; _i < arguments.length; _i++) {
                args[_i - 1] = arguments[_i];
            }
            var _a = Utils_1._parseResourceParams(this, resource, arguments), _resource = _a._resource, _args = _a._args;
            return (_b = this.$repository).save.apply(_b, [_resource].concat(_args));
            var _b;
        },
        saveAndRefresh: function (resource) {
            var args = [];
            for (var _i = 1; _i < arguments.length; _i++) {
                args[_i - 1] = arguments[_i];
            }
            var _a = Utils_1._parseResourceParams(this, resource, arguments), _resource = _a._resource, _args = _a._args;
            return (_b = this.$repository).saveAndRefresh.apply(_b, [_resource].concat(_args));
            var _b;
        },
        delete: function (uri) {
            var args = [];
            for (var _i = 1; _i < arguments.length; _i++) {
                args[_i - 1] = arguments[_i];
            }
            var _a = Utils_1._parseURIParams(this, uri, arguments), _uri = _a._uri, _args = _a._args;
            return (_b = this.$repository).delete.apply(_b, [_uri].concat(_args));
            var _b;
        },
    },
    isDecorated: function (object) {
        return ModelDecorator_1.ModelDecorator
            .hasPropertiesFrom(exports.ResolvablePointer.PROTOTYPE, object);
    },
    decorate: function (object) {
        if (exports.ResolvablePointer.isDecorated(object))
            return object;
        var resource = ModelDecorator_1.ModelDecorator
            .decorateMultiple(object, Pointer_1.Pointer);
        return ModelDecorator_1.ModelDecorator
            .definePropertiesFrom(exports.ResolvablePointer.PROTOTYPE, resource);
    },
    is: function (value) {
        return Pointer_1.Pointer.is(value)
            && exports.ResolvablePointer.isDecorated(value);
    },
};

//# sourceMappingURL=ResolvablePointer.js.map
