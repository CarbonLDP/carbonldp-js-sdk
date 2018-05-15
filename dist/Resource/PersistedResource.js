"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var util_1 = require("util");
var core_1 = require("../core");
var Utils_1 = require("../Utils");
var TransientResource_1 = require("./TransientResource");
function internalRevert(target, source) {
    if (!Utils_1.isObject(target) || !Utils_1.isObject(source))
        return;
    new Set(Object.keys(target).concat(Object.keys(source))).forEach(function (key) {
        var sourceValue = Array.isArray(source[key]) ? source[key].slice() : source[key];
        if (sourceValue === null || sourceValue === void 0) {
            delete target[key];
            return;
        }
        if (util_1.isFunction(sourceValue))
            return;
        target[key] = sourceValue;
    });
}
var PROTOTYPE = {
    get _snapshot() { return {}; },
    _partialMetadata: void 0,
    _syncSnapshot: function () {
        var clone = Utils_1.ObjectUtils.clone(this, { arrays: true });
        clone.types = this.types.slice();
        this._snapshot = clone;
    },
    isDirty: function () {
        return !Utils_1.ObjectUtils
            .areEqual(this, this._snapshot, { arrays: true });
    },
    revert: function () {
        internalRevert(this, this._snapshot);
        if (!this.types)
            this.types = [];
    },
    isPartial: function () {
        return !!this._partialMetadata;
    },
};
exports.PersistedResource = {
    PROTOTYPE: PROTOTYPE,
    isDecorated: function (object) {
        return Utils_1.isObject(object)
            && core_1.ModelDecorator
                .hasPropertiesFrom(PROTOTYPE, object);
    },
    is: function (value) {
        return Utils_1.isObject(value)
            && exports.PersistedResource.isDecorated(value);
    },
    decorate: function (object) {
        if (exports.PersistedResource.isDecorated(object))
            return object;
        var resource = TransientResource_1.TransientResource.decorate(object);
        return core_1.ModelDecorator
            .definePropertiesFrom(PROTOTYPE, resource);
    },
};

//# sourceMappingURL=PersistedResource.js.map
