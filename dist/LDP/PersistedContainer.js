"use strict";
var Utils = require("./../Utils");
function createChild(slugOrDocument, document) {
    if (document === void 0) { document = null; }
    var slug = Utils.isString(slugOrDocument) ? slugOrDocument : null;
    document = slug ? document : slugOrDocument;
    if (slug) {
        return this._documents.createChild(this.id, slug, document);
    }
    else {
        return this._documents.createChild(this.id, document);
    }
}
function upload(slugOrBlob, blob) {
    if (blob === void 0) { blob = null; }
    var slug = Utils.isString(slugOrBlob) ? slugOrBlob : null;
    blob = slug ? blob : slugOrBlob;
    if (slug) {
        return this._documents.upload(this.id, slug, blob);
    }
    else {
        return this._documents.upload(this.id, blob);
    }
}
var Factory = (function () {
    function Factory() {
    }
    Factory.hasClassProperties = function (document) {
        return Utils.hasFunction(document, "createChild")
            && Utils.hasFunction(document, "upload");
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
            "upload": {
                writable: false,
                enumerable: false,
                configurable: true,
                value: upload,
            },
        });
        return persistedDocument;
    };
    return Factory;
}());
exports.Factory = Factory;

//# sourceMappingURL=PersistedContainer.js.map
