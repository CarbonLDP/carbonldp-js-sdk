var Errors = require("./Errors");
var PersistedResource = require("./PersistedResource");
var PersistedFragment = require("./PersistedFragment");
var Utils = require("./Utils");
function isDirty() {
    for (var _i = 0, _a = this.getFragments(); _i < _a.length; _i++) {
        var fragment = _a[_i];
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
    return this._context.Documents.save(this).then(function (response) {
        // TODO
    });
}
function destroy() {
    return this._context.Documents.delete(this).then(function (response) {
        // TODO
    });
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
        for (var i = 0, length_1 = documents.length; i < length_1; i++) {
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
                value: context,
            },
            "_etag": {
                writable: true,
                enumerable: false,
                configurable: true,
                value: null,
            },
            "refresh": {
                writable: false,
                enumerable: false,
                configurable: true,
                value: refresh,
            },
            "save": {
                writable: false,
                enumerable: false,
                configurable: true,
                value: save,
            },
            "destroy": {
                writable: false,
                enumerable: false,
                configurable: true,
                value: destroy,
            },
        });
        // Overwrite isDirty to also take into account the fragments state
        persisted.isDirty = (function () {
            var superFunction = persisted.isDirty;
            return function () {
                return superFunction.call(this) || isDirty.call(this);
            };
        })();
        return persisted;
    };
    return Factory;
})();
exports.Factory = Factory;

//# sourceMappingURL=PersistedDocument.js.map
