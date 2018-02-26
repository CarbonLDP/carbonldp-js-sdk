"use strict";
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
}
Object.defineProperty(exports, "__esModule", { value: true });
var Utils = __importStar(require("./Utils"));
function syncSnapshot() {
    this._snapshot = Utils.ObjectUtils.clone(this, { arrays: true });
    this._snapshot.id = this.id;
    this._snapshot.types = this.types.slice();
}
function isDirty() {
    var resource = this;
    if (!Utils.ObjectUtils.areEqual(resource, resource._snapshot, { arrays: true }))
        return true;
    var response = false;
    if ("id" in resource)
        response = response || resource._snapshot.id !== resource.id;
    if ("types" in resource)
        response = response || !Utils.ObjectUtils.areEqual(resource._snapshot.types, resource.types);
    return response;
}
function revert() {
    var resource = this;
    for (var _i = 0, _a = Object.keys(resource); _i < _a.length; _i++) {
        var key = _a[_i];
        if (!(key in resource._snapshot))
            delete resource[key];
    }
    Utils.ObjectUtils.extend(resource, resource._snapshot, { arrays: true });
}
function isPartial() {
    return !!this._partialMetadata;
}
var Factory = (function () {
    function Factory() {
    }
    Factory.hasClassProperties = function (object) {
        return (Utils.hasPropertyDefined(object, "_snapshot")
            && Utils.hasFunction(object, "_syncSnapshot")
            && Utils.hasFunction(object, "isDirty")
            && Utils.hasFunction(object, "isPartial")
            && Utils.hasFunction(object, "revert"));
    };
    Factory.decorate = function (object) {
        if (Factory.hasClassProperties(object))
            return object;
        var persistedResource = object;
        Object.defineProperties(persistedResource, {
            "_snapshot": {
                writable: true,
                enumerable: false,
                configurable: true,
                value: {},
            },
            "_syncSnapshot": {
                writable: false,
                enumerable: false,
                configurable: true,
                value: syncSnapshot,
            },
            "_partialMetadata": {
                writable: true,
                enumerable: false,
                configurable: true,
            },
            "isDirty": {
                writable: false,
                enumerable: false,
                configurable: true,
                value: isDirty,
            },
            "revert": {
                writable: false,
                enumerable: false,
                configurable: true,
                value: revert,
            },
            "isPartial": {
                writable: false,
                enumerable: false,
                configurable: true,
                value: isPartial,
            },
        });
        return persistedResource;
    };
    return Factory;
}());
exports.Factory = Factory;

//# sourceMappingURL=PersistedResource.js.map
