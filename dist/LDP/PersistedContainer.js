"use strict";
var Utils = require("./../Utils");
function addMember(memberOrUri) {
    var that = this;
    return that._documents.addMember(that.id, memberOrUri);
}
function createChild(slugOrObject, object) {
    var slug = Utils.isString(slugOrObject) ? slugOrObject : null;
    object = Utils.isString(slugOrObject) ? object : slugOrObject;
    object = object || {};
    if (slug) {
        return this._documents.createChild(this.id, slug, object);
    }
    else {
        return this._documents.createChild(this.id, object);
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
function getMembers(includeNonReadable) {
    if (includeNonReadable === void 0) { includeNonReadable = true; }
    return this._documents.getMembers(this.id, includeNonReadable);
}
var Factory = (function () {
    function Factory() {
    }
    Factory.hasClassProperties = function (document) {
        return Utils.hasFunction(document, "createChild")
            && Utils.hasFunction(document, "upload")
            && Utils.hasFunction(document, "getMembers");
    };
    Factory.decorate = function (persistedDocument) {
        if (Factory.hasClassProperties(persistedDocument))
            return persistedDocument;
        Object.defineProperties(persistedDocument, {
            "addMember": {
                writable: false,
                enumerable: false,
                configurable: true,
                value: addMember,
            },
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
            "getMembers": {
                writable: false,
                enumerable: false,
                configurable: true,
                value: getMembers,
            },
        });
        return persistedDocument;
    };
    return Factory;
}());
exports.Factory = Factory;

//# sourceMappingURL=PersistedContainer.js.map
