"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Utils = require("./Utils");
function syncSnapshot() {
    var resource = this;
    resource._snapshot = Utils.O.clone(resource, { arrays: true });
    if ("id" in resource)
        resource._snapshot.id = resource.id;
    if ("types" in resource)
        resource._snapshot.types = Utils.O.clone(resource.types);
}
function isDirty() {
    var resource = this;
    if (!Utils.O.areEqual(resource, resource._snapshot, { arrays: true }, { id: true, types: true }))
        return true;
    var response = false;
    if ("id" in resource)
        response = response || resource._snapshot.id !== resource.id;
    if ("types" in resource)
        response = response || !Utils.O.areEqual(resource._snapshot.types, resource.types);
    return response;
}
function revert() {
    var resource = this;
    for (var _i = 0, _a = Object.keys(resource); _i < _a.length; _i++) {
        var key = _a[_i];
        if (!(key in resource._snapshot))
            delete resource[key];
    }
    Utils.O.extend(resource, resource._snapshot, { arrays: true });
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
    Factory.decorate = function (object, snapshot) {
        if (snapshot === void 0) { snapshot = {}; }
        if (Factory.hasClassProperties(object))
            return object;
        var persistedResource = object;
        Object.defineProperties(persistedResource, {
            "_snapshot": {
                writable: true,
                enumerable: false,
                configurable: true,
                value: snapshot,
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
