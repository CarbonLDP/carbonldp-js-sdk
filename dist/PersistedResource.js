"use strict";
var Utils = require("./Utils");
function syncSnapshot() {
    var resource = this;
    resource._snapshot = Utils.O.clone(resource, { arrays: true });
}
function isDirty() {
    var resource = this;
    return !Utils.O.areEqual(resource, resource._snapshot, { arrays: true });
}
var Factory = (function () {
    function Factory() {
    }
    Factory.hasClassProperties = function (object) {
        return (Utils.hasPropertyDefined(object, "_snapshot") &&
            Utils.hasFunction(object, "_syncSnapshot") &&
            Utils.hasFunction(object, "isDirty"));
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
            "isDirty": {
                writable: false,
                enumerable: false,
                configurable: true,
                value: isDirty,
            },
        });
        return persistedResource;
    };
    return Factory;
}());
exports.Factory = Factory;

//# sourceMappingURL=PersistedResource.js.map
