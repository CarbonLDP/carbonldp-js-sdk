var Errors = require("./Errors");
var PersistedResource = require("./PersistedResource");
var PersistedFragment = require("./PersistedFragment");
var RDF = require("./RDF");
var Utils = require("./Utils");
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
        case PersistedResource.ModificationType.ADD:
            modifications = this._modifications.add;
            break;
        case PersistedResource.ModificationType.SET:
            modifications = this._modifications.set;
            break;
        case PersistedResource.ModificationType.DELETE:
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
            addModification.call(this, PersistedResource.ModificationType.SET, propertyURI, value);
            return;
        }
        removeModification.call(this, PersistedResource.ModificationType.DELETE, propertyURI, value);
        for (var i = 0, length_3 = deleteModifications.length; i < length_3; i++) {
            if (RDF.Value.Util.areEqual(deleteModifications[i], value)) {
                deleteModifications.splice(i, 1);
                break;
            }
        }
    }
    else if (this._modifications.set.has(propertyURI)) {
        addModification.call(this, PersistedResource.ModificationType.SET, propertyURI, value);
    }
    else {
        addModification.call(this, PersistedResource.ModificationType.ADD, propertyURI, value);
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
            removeModification.call(this, PersistedResource.ModificationType.ADD, propertyURI, value);
        if (this._modifications.set.has(propertyURI))
            removeModification.call(this, PersistedResource.ModificationType.SET, propertyURI, value);
    }
    addModification.call(this, PersistedResource.ModificationType.DELETE, propertyURI, value);
}
function isDirty() {
    /* tslint:disable: typedef */
    for (var _i = 0, _a = this.getFragments(); _i < _a.length; _i++) {
        var fragment = _a[_i];
        /* tslint:enable: typedef */
        if (fragment.isDirty())
            return true;
    }
    return false;
}
function refresh() {
    // TODO
    return null;
}
function save() {
    // TODO: FT
    return this._context.Documents.save(this);
}
function destroy() {
    // TODO
    return null;
}
var Factory = (function () {
    function Factory() {
    }
    Factory.hasClassProperties = function (document) {
        return (Utils.hasPropertyDefined(document, "_context") &&
            Utils.hasPropertyDefined(document, "_etag") &&
            Utils.hasFunction(document, "refresh") &&
            Utils.hasFunction(document, "save") &&
            Utils.hasFunction(document, "destroy"));
    };
    Factory.from = function (documents, context) {
        if (!context)
            throw new Errors.IllegalArgumentError("The context cannot be null/undefined.");
        if (!Utils.isArray(documents))
            return Factory.singleFrom(documents, context);
        for (var i = 0, length_4 = documents.length; i < length_4; i++) {
            var document_1 = documents[i];
            Factory.singleFrom(document_1, context);
        }
        return documents;
    };
    Factory.singleFrom = function (document, context) {
        var persisted = PersistedResource.Factory.from(document);
        var persistedDocument = Factory.hasClassProperties(document) ? persisted : Factory.injectBehavior(persisted, context);
        PersistedFragment.Factory.from(persistedDocument.getFragments());
        return persistedDocument;
    };
    Factory.injectBehavior = function (persisted, context) {
        if (Factory.hasClassProperties(persisted))
            return persisted;
        Object.defineProperties(persisted, {
            "_context": {
                writable: false,
                enumerable: false,
                configurable: true,
                value: context
            },
            "_etag": {
                writable: true,
                enumerable: false,
                configurable: true,
                value: null
            },
            "refresh": {
                writable: false,
                enumerable: false,
                configurable: true,
                value: refresh
            },
            "save": {
                writable: false,
                enumerable: false,
                configurable: true,
                value: save
            },
            "destroy": {
                writable: false,
                enumerable: false,
                configurable: true,
                value: destroy
            }
        });
        // Overwrite isDirty to also take into account the fragments state
        persisted.isDirty = (function () {
            var superFunction = persisted.isDirty;
            return function () {
                return superFunction.call(this) || isDirty.call(this);
            };
        })();
        persisted._propertyAddedCallbacks.push(registerAddModification);
        persisted._propertyDeletedCallbacks.push(registerDeleteModification);
        return persisted;
    };
    return Factory;
})();
exports.Factory = Factory;

//# sourceMappingURL=PersistedDocument.js.map
