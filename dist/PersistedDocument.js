"use strict";
var Document = require("./Document");
var PersistedResource = require("./PersistedResource");
var PersistedFragment = require("./PersistedFragment");
var PersistedNamedFragment = require("./PersistedNamedFragment");
var Pointer = require("./Pointer");
var RDF = require("./RDF");
var Utils = require("./Utils");
var URI = require("./RDF/URI");
var ObjectSchema = require("./ObjectSchema");
function extendIsDirty(superFunction) {
    return function () {
        var isDirty = superFunction.call(this);
        if (isDirty)
            return true;
        var document = this;
        for (var _i = 0, _a = document.getFragments(); _i < _a.length; _i++) {
            var fragment = _a[_i];
            if (fragment.isDirty())
                return true;
        }
        for (var _b = 0, _c = document._savedFragments; _b < _c.length; _b++) {
            var fragment = _c[_b];
            if (!document.hasFragment(fragment.id))
                return true;
        }
        return false;
    };
}
function syncSavedFragments() {
    var document = this;
    document._savedFragments = Utils.A.from(document._fragmentsIndex.values());
}
function extendCreateFragment(superFunction) {
    return function (slugOrObject, slug) {
        var fragment = superFunction.call(this, slugOrObject, slug);
        var id = fragment.id;
        if (RDF.URI.Util.isBNodeID(id)) {
            PersistedFragment.Factory.decorate(fragment);
        }
        else {
            PersistedNamedFragment.Factory.decorate(fragment);
        }
        return fragment;
    };
}
function extendCreateNamedFragment(superFunction) {
    return function (slugOrObject, slug) {
        var fragment = superFunction.call(this, slugOrObject, slug);
        return PersistedFragment.Factory.decorate(fragment);
    };
}
function refresh() {
    return this._documents.refresh(this);
}
function save() {
    return this._documents.save(this);
}
function saveAndRefresh() {
    return this._documents.saveAndRefresh(this);
}
function _delete() {
    return this._documents.delete(this.id);
}
function getDownloadURL() {
    return this._documents.getDownloadURL(this.id);
}
function addMember(memberOrUri) {
    return this._documents.addMember(this.id, memberOrUri);
}
function addMembers(members) {
    return this._documents.addMembers(this.id, members);
}
function createChild(slugOrObject, slug) {
    var object = !Utils.isString(slugOrObject) && !!slugOrObject ? slugOrObject : {};
    slug = Utils.isString(slugOrObject) ? slugOrObject : slug;
    return this._documents.createChild(this.id, object, slug);
}
function createChildAndRetrieve(slugOrObject, slug) {
    var object = !Utils.isString(slugOrObject) && !!slugOrObject ? slugOrObject : {};
    slug = Utils.isString(slugOrObject) ? slugOrObject : slug;
    return this._documents.createChildAndRetrieve(this.id, object, slug);
}
function createAccessPoint(accessPoint, slugOrRequestOptions, requestOptions) {
    return this._documents.createAccessPoint(this.id, accessPoint, slugOrRequestOptions, requestOptions);
}
function listChildren() {
    return this._documents.listChildren(this.id);
}
function getChildren(retrievalPreferences) {
    return this._documents.getChildren(this.id, retrievalPreferences);
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
    return this._documents.removeMember(this.id, memberOrUri);
}
function removeMembers(members) {
    return this._documents.removeMembers(this.id, members);
}
function removeAllMembers() {
    return this._documents.removeAllMembers(this.id);
}
function upload(data, slug) {
    return this._documents.upload(this.id, data, slug);
}
function executeRawASKQuery(askQuery, requestOptions) {
    if (requestOptions === void 0) { requestOptions = {}; }
    return this._documents.executeRawASKQuery(this.id, askQuery, requestOptions);
}
function executeASKQuery(askQuery, requestOptions) {
    if (requestOptions === void 0) { requestOptions = {}; }
    return this._documents.executeASKQuery(this.id, askQuery, requestOptions);
}
function executeRawSELECTQuery(selectQuery, requestOptions) {
    if (requestOptions === void 0) { requestOptions = {}; }
    return this._documents.executeRawSELECTQuery(this.id, selectQuery, requestOptions);
}
function executeSELECTQuery(selectQuery, requestOptions) {
    if (requestOptions === void 0) { requestOptions = {}; }
    return this._documents.executeSELECTQuery(this.id, selectQuery, requestOptions);
}
function executeRawCONSTRUCTQuery(constructQuery, requestOptions) {
    if (requestOptions === void 0) { requestOptions = {}; }
    return this._documents.executeRawCONSTRUCTQuery(this.id, constructQuery, requestOptions);
}
function executeRawDESCRIBEQuery(describeQuery, requestOptions) {
    if (requestOptions === void 0) { requestOptions = {}; }
    return this._documents.executeRawDESCRIBEQuery(this.id, describeQuery, requestOptions);
}
function executeUPDATE(updateQuery, requestOptions) {
    if (requestOptions === void 0) { requestOptions = {}; }
    return this._documents.executeUPDATE(this.id, updateQuery, requestOptions);
}
var Factory = (function () {
    function Factory() {
    }
    Factory.hasClassProperties = function (object) {
        return Utils.hasPropertyDefined(object, "_documents")
            && Utils.hasPropertyDefined(object, "_etag")
            && Utils.hasFunction(object, "refresh")
            && Utils.hasFunction(object, "save")
            && Utils.hasFunction(object, "saveAndRefresh")
            && Utils.hasFunction(object, "delete")
            && Utils.hasFunction(object, "getDownloadURL")
            && Utils.hasFunction(object, "addMember")
            && Utils.hasFunction(object, "addMembers")
            && Utils.hasFunction(object, "createAccessPoint")
            && Utils.hasFunction(object, "createChild")
            && Utils.hasFunction(object, "createChildAndRetrieve")
            && Utils.hasFunction(object, "getChildren")
            && Utils.hasFunction(object, "getMembers")
            && Utils.hasFunction(object, "listChildren")
            && Utils.hasFunction(object, "listMembers")
            && Utils.hasFunction(object, "removeMember")
            && Utils.hasFunction(object, "removeMembers")
            && Utils.hasFunction(object, "removeAllMembers")
            && Utils.hasFunction(object, "upload")
            && Utils.hasFunction(object, "executeRawASKQuery")
            && Utils.hasFunction(object, "executeASKQuery")
            && Utils.hasFunction(object, "executeRawSELECTQuery")
            && Utils.hasFunction(object, "executeSELECTQuery")
            && Utils.hasFunction(object, "executeRawDESCRIBEQuery")
            && Utils.hasFunction(object, "executeRawCONSTRUCTQuery")
            && Utils.hasFunction(object, "executeUPDATE");
    };
    Factory.is = function (object) {
        return Factory.hasClassProperties(object)
            && Document.Factory.is(object);
    };
    Factory.create = function (uri, documents, snapshot) {
        if (snapshot === void 0) { snapshot = {}; }
        var document = Document.Factory.create();
        document.id = uri;
        return Factory.decorate(document, documents, snapshot);
    };
    Factory.createFrom = function (object, uri, documents, snapshot) {
        if (snapshot === void 0) { snapshot = {}; }
        var document = Document.Factory.createFrom(object);
        document.id = uri;
        return Factory.decorate(document, documents, snapshot);
    };
    Factory.decorate = function (document, documents, snapshot) {
        if (snapshot === void 0) { snapshot = {}; }
        Document.Factory.decorate(document);
        PersistedResource.Factory.decorate(document, snapshot);
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
            "_savedFragments": {
                writable: true,
                enumerable: false,
                configurable: true,
                value: [],
            },
            "_syncSavedFragments": {
                writable: false,
                enumerable: false,
                configurable: true,
                value: syncSavedFragments,
            },
            "hasPointer": {
                writable: false,
                enumerable: false,
                configurable: true,
                value: (function () {
                    var superFunction = persistedDocument.hasPointer;
                    return function (id) {
                        if (RDF.URI.Util.isPrefixed(id)) {
                            id = ObjectSchema.Digester.resolvePrefixedURI(new RDF.URI.Class(id), this._documents.getSchemaFor(this)).stringValue;
                        }
                        if (superFunction.call(this, id))
                            return true;
                        return !URI.Util.isBNodeID(id) && this._documents.hasPointer(id);
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
                        if (RDF.URI.Util.isPrefixed(id)) {
                            id = ObjectSchema.Digester.resolvePrefixedURI(new RDF.URI.Class(id), this._documents.getSchemaFor(this)).stringValue;
                        }
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
                    return function (idOrPointer) {
                        var uri = Pointer.Factory.is(idOrPointer) ? idOrPointer.id : idOrPointer;
                        if (RDF.URI.Util.isPrefixed(uri)) {
                            uri = ObjectSchema.Digester.resolvePrefixedURI(new RDF.URI.Class(uri), this._documents.getSchemaFor(this)).stringValue;
                        }
                        if (superFunction.call(this, uri))
                            return true;
                        return this._documents.inScope(uri);
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
            "saveAndRefresh": {
                writable: false,
                enumerable: false,
                configurable: true,
                value: saveAndRefresh,
            },
            "delete": {
                writable: false,
                enumerable: false,
                configurable: true,
                value: _delete,
            },
            "getDownloadURL": {
                writable: false,
                enumerable: false,
                configurable: true,
                value: getDownloadURL,
            },
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
            "createChildAndRetrieve": {
                writable: false,
                enumerable: false,
                configurable: true,
                value: createChildAndRetrieve,
            },
            "createAccessPoint": {
                writable: false,
                enumerable: false,
                configurable: true,
                value: createAccessPoint,
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
            "executeRawASKQuery": {
                writable: false,
                enumerable: false,
                configurable: true,
                value: executeRawASKQuery,
            },
            "executeASKQuery": {
                writable: false,
                enumerable: false,
                configurable: true,
                value: executeASKQuery,
            },
            "executeRawSELECTQuery": {
                writable: false,
                enumerable: false,
                configurable: true,
                value: executeRawSELECTQuery,
            },
            "executeSELECTQuery": {
                writable: false,
                enumerable: false,
                configurable: true,
                value: executeSELECTQuery,
            },
            "executeRawCONSTRUCTQuery": {
                writable: false,
                enumerable: false,
                configurable: true,
                value: executeRawCONSTRUCTQuery,
            },
            "executeRawDESCRIBEQuery": {
                writable: false,
                enumerable: false,
                configurable: true,
                value: executeRawDESCRIBEQuery,
            },
            "executeUPDATE": {
                writable: false,
                enumerable: false,
                configurable: true,
                value: executeUPDATE,
            },
            "createFragment": {
                writable: false,
                enumerable: false,
                configurable: true,
                value: extendCreateFragment(persistedDocument.createFragment),
            },
            "createNamedFragment": {
                writable: false,
                enumerable: false,
                configurable: true,
                value: extendCreateNamedFragment(persistedDocument.createNamedFragment),
            },
            "isDirty": {
                writable: false,
                enumerable: false,
                configurable: true,
                value: extendIsDirty(persistedDocument.isDirty),
            },
        });
        return persistedDocument;
    };
    return Factory;
}());
exports.Factory = Factory;

//# sourceMappingURL=PersistedDocument.js.map
