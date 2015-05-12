/// <reference path="../../typings/es6/es6.d.ts" />
define(["require", "exports", './DocumentResource', '../Utils', './Value'], function (require, exports, DocumentResource, Utils, Value) {
    var Modifications = (function () {
        function Modifications() {
            this.add = new Map();
            this.set = new Map();
            this.delete = new Map();
        }
        return Modifications;
    })();
    var ModificationType;
    (function (ModificationType) {
        ModificationType[ModificationType["ADD"] = 0] = "ADD";
        ModificationType[ModificationType["SET"] = 1] = "SET";
        ModificationType[ModificationType["DELETE"] = 2] = "DELETE";
    })(ModificationType || (ModificationType = {}));
    var SpecialValue;
    (function (SpecialValue) {
        SpecialValue[SpecialValue["ALL_VALUES"] = 0] = "ALL_VALUES";
    })(SpecialValue || (SpecialValue = {}));
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
        }
        return modifications;
    }
    function addModification(type, propertyURI, value) {
        var modifications = getModifications.call(this, type, propertyURI);
        var values;
        if (modifications.has(propertyURI)) {
            values = modifications.get(propertyURI);
            for (var i = 0, length_1 = values.length; i < length_1; i++) {
                if (Value.Util.areEqual(values[i], value))
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
            if (Value.Util.areEqual(values[i], value)) {
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
                if (Value.Util.areEqual(deleteModifications[i], value)) {
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
    var Factory = (function () {
        function Factory() {
        }
        Factory.is = function (value) {
            return (DocumentResource.Factory.is(value) &&
                Utils.hasProperty(value, '_dirty') &&
                Utils.hasProperty(value, '_modifications') &&
                Utils.hasProperty(value, '_parent') &&
                Utils.hasFunction(value, '_clean') &&
                Utils.hasFunction(value, 'isDirty') &&
                Utils.hasFunction(value, 'commit') &&
                Utils.hasFunction(value, 'delete'));
        };
        Factory.from = function (documentResource, parent) {
            var persisted = documentResource;
            if (!Factory.is(persisted)) {
                Object.defineProperties(persisted, {
                    '_dirty': {
                        writable: true,
                        enumerable: false,
                        value: false
                    },
                    '_modifications': {
                        writable: false,
                        enumerable: false,
                        value: new Map()
                    },
                    '_parent': {
                        writable: false,
                        enumerable: false,
                        value: parent
                    }
                });
                persisted._propertyAddedCallbacks.push(registerAddModification);
                persisted._propertyDeletedCallbacks.push(registerDeleteModification);
            }
            return persisted;
        };
        return Factory;
    })();
    exports.Factory = Factory;
});
//# sourceMappingURL=PersistedDocumentResource.js.map