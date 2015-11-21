var Utils = require("./Utils");
var Modifications = (function () {
    function Modifications() {
        this.add = new Map();
        this.set = new Map();
        this.delete = new Map();
    }
    return Modifications;
})();
exports.Modifications = Modifications;
(function (ModificationType) {
    ModificationType[ModificationType["ADD"] = 0] = "ADD";
    ModificationType[ModificationType["SET"] = 1] = "SET";
    ModificationType[ModificationType["DELETE"] = 2] = "DELETE";
})(exports.ModificationType || (exports.ModificationType = {}));
var ModificationType = exports.ModificationType;
function isDirty() {
    return this._dirty;
}
var Factory = (function () {
    function Factory() {
    }
    Factory.hasClassProperties = function (object) {
        return (Utils.hasPropertyDefined(object, "_dirty") &&
            Utils.hasPropertyDefined(object, "_modifications") &&
            Utils.hasFunction(object, "isDirty"));
    };
    Factory.is = function (object) {
        return (Factory.hasClassProperties(object));
    };
    Factory.from = function (objectOrObjects) {
        if (!Utils.isArray(objectOrObjects))
            return Factory.singleFrom(objectOrObjects);
        for (var i = 0, length_1 = objectOrObjects.length; i < length_1; i++) {
            Factory.singleFrom(objectOrObjects[i]);
        }
        return objectOrObjects;
    };
    Factory.singleFrom = function (object) {
        var persistedResource = object;
        if (!Factory.hasClassProperties(object))
            persistedResource = this.injectBehavior(persistedResource);
        return persistedResource;
    };
    Factory.injectBehavior = function (persistedResource) {
        Object.defineProperties(persistedResource, {
            "_dirty": {
                writable: true,
                enumerable: false,
                configurable: true,
                value: false
            },
            "_modifications": {
                writable: true,
                enumerable: false,
                configurable: true,
                value: new Modifications()
            },
            "isDirty": {
                writable: true,
                enumerable: false,
                configurable: true,
                value: isDirty
            }
        });
        return persistedResource;
    };
    return Factory;
})();
exports.Factory = Factory;

//# sourceMappingURL=PersistedResource.js.map
