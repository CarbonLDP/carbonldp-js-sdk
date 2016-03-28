"use strict";
var Utils = require("./../Utils");
function createChild(slugOrDocumentOrBlob, documentOrBlob) {
    if (documentOrBlob === void 0) { documentOrBlob = null; }
    var slug = Utils.isString(slugOrDocumentOrBlob) ? slugOrDocumentOrBlob : null;
    documentOrBlob = slug ? documentOrBlob : slugOrDocumentOrBlob;
    if (slug)
        return this._documents.createChild(this.id, slug, documentOrBlob);
    return this._documents.createChild(this.id, documentOrBlob);
}
var Factory = (function () {
    function Factory() {
    }
    Factory.hasClassProperties = function (document) {
        return (Utils.hasFunction(document, "createChild"));
    };
    Factory.decorate = function (persistedDocument) {
        if (Factory.hasClassProperties(persistedDocument))
            return persistedDocument;
        Object.defineProperties(persistedDocument, {
            "createChild": {
                writable: false,
                enumerable: false,
                configurable: true,
                value: createChild,
            },
        });
        return persistedDocument;
    };
    return Factory;
}());
exports.Factory = Factory;

//# sourceMappingURL=PersistedContainer.js.map
