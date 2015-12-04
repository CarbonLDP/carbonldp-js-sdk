/// <reference path="./../typings/es6/es6.d.ts" />
var Errors = require("./Errors");
var RDF = require("./RDF");
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
var SpecialValue;
(function (SpecialValue) {
    SpecialValue[SpecialValue["ALL_VALUES"] = 0] = "ALL_VALUES";
})(SpecialValue || (SpecialValue = {}));
(function (ModificationType) {
    ModificationType[ModificationType["ADD"] = 0] = "ADD";
    ModificationType[ModificationType["SET"] = 1] = "SET";
    ModificationType[ModificationType["DELETE"] = 2] = "DELETE";
})(exports.ModificationType || (exports.ModificationType = {}));
var ModificationType = exports.ModificationType;
function modificationsDeleteAllValues(deleteModifications) {
    return deleteModifications.length === 1 && deleteModifications[0] === SpecialValue.ALL_VALUES;
}
function getModifications(type) {
    var modifications;
    switch (type) {
        case ModificationType.ADD:
            modifications = this._modifications.add;
            break;
        case ModificationType.SET:
            modifications = this._modifications.set;
            break;
        case ModificationType.DELETE:
            modifications = this._modifications.delete;
            break;
        default:
            throw new Errors.IllegalStateError("");
    }
    return modifications;
}
function addModification(type, propertyURI, value) {
    var modifications = getModifications.call(this, type, propertyURI);
    var values;
    if (modifications.has(propertyURI)) {
        values = modifications.get(propertyURI);
        for (var i = 0, length_1 = values.length; i < length_1; i++) {
            if (RDF.Value.Util.areEqual(values[i], value))
                return;
        }
    }
    else {
        values = [];
        modifications.set(propertyURI, values);
    }
    values.push(value);
}
function removeModification(type, propertyURI, value) {
    var modifications = getModifications.call(this, type, propertyURI);
    var values = modifications.get(propertyURI);
    for (var i = 0, length_2 = values.length; i < length_2; i++) {
        if (RDF.Value.Util.areEqual(values[i], value)) {
            values.splice(i, 1);
            break;
        }
    }
}
function registerAddModification(propertyURI, value) {
    this._dirty = true;
    if (this._modifications.delete.has(propertyURI)) {
        var deleteModifications = this._modifications.delete.get(propertyURI);
        if (modificationsDeleteAllValues(deleteModifications)) {
            this._modifications.delete.delete(propertyURI);
            addModification.call(this, ModificationType.SET, propertyURI, value);
            return;
        }
        removeModification.call(this, ModificationType.DELETE, propertyURI, value);
        for (var i = 0, length_3 = deleteModifications.length; i < length_3; i++) {
            if (RDF.Value.Util.areEqual(deleteModifications[i], value)) {
                deleteModifications.splice(i, 1);
                break;
            }
        }
    }
    else if (this._modifications.set.has(propertyURI)) {
        addModification.call(this, ModificationType.SET, propertyURI, value);
    }
    else {
        addModification.call(this, ModificationType.ADD, propertyURI, value);
    }
}
function registerDeleteModification(propertyURI, value) {
    if (value === void 0) { value = null; }
    this._dirty = true;
    if (Utils.isNull(value))
        value = SpecialValue.ALL_VALUES;
    if (value === SpecialValue.ALL_VALUES) {
        if (this._modifications.add.has(propertyURI))
            this._modifications.add.delete(propertyURI);
        if (this._modifications.set.has(propertyURI))
            this._modifications.set.delete(propertyURI);
        if (this._modifications.delete.has(propertyURI))
            this._modifications.delete.delete(propertyURI);
    }
    else {
        if (this._modifications.add.has(propertyURI))
            removeModification.call(this, ModificationType.ADD, propertyURI, value);
        if (this._modifications.set.has(propertyURI))
            removeModification.call(this, ModificationType.SET, propertyURI, value);
    }
    addModification.call(this, ModificationType.DELETE, propertyURI, value);
}
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
        for (var i = 0, length_4 = objectOrObjects.length; i < length_4; i++) {
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
                value: false,
            },
            "_modifications": {
                writable: true,
                enumerable: false,
                configurable: true,
                value: new Modifications(),
            },
            "isDirty": {
                writable: true,
                enumerable: false,
                configurable: true,
                value: isDirty,
            },
        });
        persistedResource._propertyAddedCallbacks.push(registerAddModification);
        persistedResource._propertyDeletedCallbacks.push(registerDeleteModification);
        return persistedResource;
    };
    return Factory;
})();
exports.Factory = Factory;

//# sourceMappingURL=PersistedResource.js.map
