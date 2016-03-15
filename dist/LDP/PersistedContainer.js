"use strict";
var Utils = require("./../Utils");
function createChild(slugOrDocument, document) {
    if (slugOrDocument === void 0) { slugOrDocument = null; }
    if (document === void 0) { document = null; }
    var slug = Utils.isString(slugOrDocument) ? slugOrDocument : null;
    document = !!slugOrDocument && !Utils.isString(slugOrDocument) ? slugOrDocument : (!!document ? document : null);
    if (slug !== null) {
        return this._documents.createChild(this.id, slug, document);
    }
    else
        return this._documents.createChild(this.id, document);
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
