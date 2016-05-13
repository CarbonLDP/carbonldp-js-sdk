"use strict";
var Utils = require("./../Utils");
function addMember(memberOrUri) {
    var that = this;
    return that._documents.addMember(that.id, memberOrUri);
}
function addMembers(members) {
    var that = this;
    return that._documents.addMembers(that.id, members);
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
function listChildren() {
    var that = this;
    return this._documents.listChildren(that.id);
}
function getChildren(retrievalPreferences) {
    var that = this;
    return this._documents.getChildren(that.id, retrievalPreferences);
}
function listMembers(includeNonReadable) {
    if (includeNonReadable === void 0) { includeNonReadable = true; }
    return this._documents.listMembers(this.id, includeNonReadable);
}
function getMembers(nonReadRetPref, retrievalPreferences) {
    if (nonReadRetPref === void 0) { nonReadRetPref = true; }
    return this._documents.getMembers(this.id, nonReadRetPref, retrievalPreferences);
}
function removeMember(memberOrUri) {
    var that = this;
    return that._documents.removeMember(that.id, memberOrUri);
}
function removeMembers(members) {
    var that = this;
    return that._documents.removeMembers(that.id, members);
}
function removeAllMembers() {
    var that = this;
    return that._documents.removeAllMembers(that.id);
}
function upload(slugOrData, data) {
    if (data === void 0) { data = null; }
    var slug = Utils.isString(slugOrData) ? slugOrData : null;
    data = slug ? data : slugOrData;
    if (slug) {
        return this._documents.upload(this.id, slug, data);
    }
    else {
        return this._documents.upload(this.id, data);
    }
}
var Factory = (function () {
    function Factory() {
    }
    Factory.hasClassProperties = function (document) {
        return Utils.isObject(document)
            && Utils.hasFunction(document, "addMember")
            && Utils.hasFunction(document, "addMembers")
            && Utils.hasFunction(document, "createChild")
            && Utils.hasFunction(document, "listChildren")
            && Utils.hasFunction(document, "getChildren")
            && Utils.hasFunction(document, "listMembers")
            && Utils.hasFunction(document, "getMembers")
            && Utils.hasFunction(document, "removeMember")
            && Utils.hasFunction(document, "removeMembers")
            && Utils.hasFunction(document, "removeAllMembers")
            && Utils.hasFunction(document, "upload");
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
            "addMembers": {
                writable: false,
                enumerable: false,
                configurable: true,
                value: addMembers,
            },
            "createChild": {
                writable: false,
                enumerable: false,
                configurable: true,
                value: createChild,
            },
            "listChildren": {
                writable: false,
                enumerable: false,
                configurable: true,
                value: listChildren,
            },
            "getChildren": {
                writable: false,
                enumerable: false,
                configurable: true,
                value: getChildren,
            },
            "listMembers": {
                writable: false,
                enumerable: false,
                configurable: true,
                value: listMembers,
            },
            "getMembers": {
                writable: false,
                enumerable: false,
                configurable: true,
                value: getMembers,
            },
            "removeMember": {
                writable: false,
                enumerable: false,
                configurable: true,
                value: removeMember,
            },
            "removeMembers": {
                writable: false,
                enumerable: false,
                configurable: true,
                value: removeMembers,
            },
            "removeAllMembers": {
                writable: false,
                enumerable: false,
                configurable: true,
                value: removeAllMembers,
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
