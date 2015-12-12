var Document = require("./Document");
var Utils = require("./Utils");
function isDirty() {
    // TODO
    return null;
}
function refresh() {
    // TODO
    return null;
}
function save() {
    return this._documents.save(this).then(function (response) {
        // TODO
    });
}
function destroy() {
    return this._documents.delete(this).then(function (response) {
        // TODO
    });
}
var Factory = (function () {
    function Factory() {
    }
    Factory.hasClassProperties = function (document) {
        return (Utils.hasPropertyDefined(document, "_decorate") &&
            Utils.hasPropertyDefined(document, "_etag") &&
            Utils.hasFunction(document, "refresh") &&
            Utils.hasFunction(document, "save") &&
            Utils.hasFunction(document, "destroy"));
    };
    Factory.create = function (uri, documents) {
        var document = Document.factory.create(uri);
        return Factory.decorate(document, documents);
    };
    Factory.createFrom = function (object, uri, documents) {
        var document = Document.factory.createFrom(object, uri);
        return Factory.decorate(document, documents);
    };
    Factory.decorate = function (document, documents) {
        if (Factory.hasClassProperties(document))
            return document;
        var persistedDocument = document;
        Object.defineProperties(persistedDocument, {
            "_documents": {
                writable: false,
                enumerable: false,
                configurable: true,
                value: documents,
            },
            "_etag": {
                writable: true,
                enumerable: false,
                configurable: true,
                value: null,
            },
            "hasPointer": {
                writable: false,
                enumerable: false,
                configurable: true,
                value: (function () {
                    var superFunction = persistedDocument.hasPointer;
                    return function (id) {
                        if (superFunction.call(this, id))
                            return true;
                        return this._documents.hasPointer(id);
                    };
                })(),
            },
            "getPointer": {
                writable: false,
                enumerable: false,
                configurable: true,
                value: (function () {
                    var superFunction = persistedDocument.getPointer;
                    var inScopeFunction = persistedDocument.inScope;
                    return function (id) {
                        if (inScopeFunction.call(this, id))
                            return superFunction.call(this, id);
                        return this._documents.getPointer(id);
                    };
                })(),
            },
            "inScope": {
                writable: false,
                enumerable: false,
                configurable: true,
                value: (function () {
                    var superFunction = persistedDocument.inScope;
                    return function (id) {
                        if (superFunction.call(this, id))
                            return true;
                        return this._documents.inScope(id);
                    };
                })(),
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
        /*

        // TODO: Overwrite isDirty to also take into account the fragments state
        // TODO: Update with the new comparison system
        persistedDocument.isDirty = (function():() => boolean {
            let superFunction:() => boolean = persistedDocument.isDirty;
            return function():boolean {
                return superFunction.call( this ) || isDirty.call( this );
            };
        })();

        */
        return persistedDocument;
    };
    return Factory;
})();
exports.Factory = Factory;

//# sourceMappingURL=PersistedDocument.js.map
