"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Document = require("./Document");
var HTTP = require("./HTTP");
var MessagingDocument = require("./Messaging/Document");
var ObjectSchema = require("./ObjectSchema");
var PersistedFragment = require("./PersistedFragment");
var PersistedNamedFragment = require("./PersistedNamedFragment");
var PersistedResource = require("./PersistedResource");
var Pointer = require("./Pointer");
var RDF = require("./RDF");
var URI = require("./RDF/URI");
var ServiceAwareDocument = require("./ServiceAwareDocument");
var Utils = require("./Utils");
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
function extendRevert(superFunction) {
    return function () {
        var persistedDocument = this;
        persistedDocument._fragmentsIndex.clear();
        for (var _i = 0, _a = persistedDocument._savedFragments; _i < _a.length; _i++) {
            var fragment = _a[_i];
            var slug = "slug" in fragment ? fragment.slug : fragment.id;
            fragment.revert();
            persistedDocument._fragmentsIndex.set(slug, fragment);
        }
        superFunction.call(persistedDocument);
    };
}
function syncSavedFragments() {
    var document = this;
    document._savedFragments = Utils.A.from(document._fragmentsIndex.values());
}
function resolveURI(uri) {
    if (URI.Util.isAbsolute(uri))
        return uri;
    var schema = this._documents.getGeneralSchema();
    return ObjectSchema.Util.resolveURI(uri, schema);
}
function extendAddType(superFunction) {
    return function (type) {
        type = resolveURI.call(this, type);
        superFunction.call(this, type);
    };
}
function extendHasType(superFunction) {
    return function (type) {
        type = resolveURI.call(this, type);
        return superFunction.call(this, type);
    };
}
function extendRemoveType(superFunction) {
    return function (type) {
        type = resolveURI.call(this, type);
        superFunction.call(this, type);
    };
}
function extendCreateFragment(superFunction) {
    return function (slugOrObject, slug) {
        var fragment = superFunction.call(this, slugOrObject, slug);
        var id = fragment.id;
        if (RDF.URI.Util.isBNodeID(id))
            PersistedFragment.Factory.decorate(fragment);
        return fragment;
    };
}
function extendCreateNamedFragment(superFunction) {
    return function (slugOrObject, slug) {
        var fragment = superFunction.call(this, slugOrObject, slug);
        return PersistedNamedFragment.Factory.decorate(fragment);
    };
}
function refresh() {
    return this._documents.refresh(this);
}
function save(requestOptions) {
    return this._documents.save(this, requestOptions);
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
function createChild(objectOrSlugOrRequestOptions, slugOrRequestOptions, requestOptions) {
    if (requestOptions === void 0) { requestOptions = {}; }
    requestOptions = HTTP.Request.Util.isOptions(objectOrSlugOrRequestOptions) ? objectOrSlugOrRequestOptions : HTTP.Request.Util.isOptions(slugOrRequestOptions) ? slugOrRequestOptions : requestOptions;
    var object = Utils.isString(objectOrSlugOrRequestOptions) || HTTP.Request.Util.isOptions(objectOrSlugOrRequestOptions) || !objectOrSlugOrRequestOptions ? {} : objectOrSlugOrRequestOptions;
    var slug = Utils.isString(objectOrSlugOrRequestOptions) ? objectOrSlugOrRequestOptions : Utils.isString(slugOrRequestOptions) ? slugOrRequestOptions : null;
    return this._documents.createChild(this.id, object, slug, requestOptions);
}
function createChildren(objects, slugsOrRequestOptions, requestOptions) {
    return this._documents.createChildren(this.id, objects, slugsOrRequestOptions, requestOptions);
}
function createChildAndRetrieve(objectOrSlugOrRequestOptions, slugOrRequestOptions, requestOptions) {
    if (requestOptions === void 0) { requestOptions = {}; }
    requestOptions = HTTP.Request.Util.isOptions(objectOrSlugOrRequestOptions) ? objectOrSlugOrRequestOptions : HTTP.Request.Util.isOptions(slugOrRequestOptions) ? slugOrRequestOptions : requestOptions;
    var object = Utils.isString(objectOrSlugOrRequestOptions) || HTTP.Request.Util.isOptions(objectOrSlugOrRequestOptions) || !objectOrSlugOrRequestOptions ? {} : objectOrSlugOrRequestOptions;
    var slug = Utils.isString(objectOrSlugOrRequestOptions) ? objectOrSlugOrRequestOptions : Utils.isString(slugOrRequestOptions) ? slugOrRequestOptions : null;
    return this._documents.createChildAndRetrieve(this.id, object, slug, requestOptions);
}
function createChildrenAndRetrieve(objects, slugsOrRequestOptions, requestOptions) {
    return this._documents.createChildrenAndRetrieve(this.id, objects, slugsOrRequestOptions, requestOptions);
}
function createAccessPoint(accessPoint, slugOrRequestOptions, requestOptions) {
    return this._documents.createAccessPoint(this.id, accessPoint, slugOrRequestOptions, requestOptions);
}
function createAccessPoints(accessPoints, slugsOrRequestOptions, requestOptions) {
    return this._documents.createAccessPoints(this.id, accessPoints, slugsOrRequestOptions, requestOptions);
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
function getMembers(includeNonReadableOrRetrievalPreferences, retrievalPreferences) {
    var includeNonReadable = true;
    if (Utils.isBoolean(includeNonReadableOrRetrievalPreferences)) {
        includeNonReadable = includeNonReadableOrRetrievalPreferences;
    }
    else {
        retrievalPreferences = includeNonReadableOrRetrievalPreferences;
    }
    return this._documents.getMembers(this.id, includeNonReadable, retrievalPreferences);
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
function sparql() {
    return this._documents.sparql(this.id);
}
var Factory = (function () {
    function Factory() {
    }
    Factory.hasClassProperties = function (object) {
        return Utils.hasPropertyDefined(object, "_etag")
            && Utils.hasFunction(object, "refresh")
            && Utils.hasFunction(object, "save")
            && Utils.hasFunction(object, "saveAndRefresh")
            && Utils.hasFunction(object, "delete")
            && Utils.hasFunction(object, "getDownloadURL")
            && Utils.hasFunction(object, "addMember")
            && Utils.hasFunction(object, "addMembers")
            && Utils.hasFunction(object, "createAccessPoint")
            && Utils.hasFunction(object, "createAccessPoints")
            && Utils.hasFunction(object, "createChild")
            && Utils.hasFunction(object, "createChildren")
            && Utils.hasFunction(object, "createChildAndRetrieve")
            && Utils.hasFunction(object, "createChildrenAndRetrieve")
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
            && Utils.hasFunction(object, "executeUPDATE")
            && Utils.hasFunction(object, "sparql");
    };
    Factory.is = function (object) {
        return Document.Factory.is(object)
            && Factory.hasClassProperties(object)
            && MessagingDocument.Factory.hasClassProperties(object);
    };
    Factory.create = function (uri, documents, snapshot) {
        if (snapshot === void 0) { snapshot = {}; }
        var document = Document.Factory.create();
        document.id = uri;
        return Factory.decorate(document, documents, snapshot);
    };
    Factory.createFrom = function (object, uri, documents, snapshot) {
        if (snapshot === void 0) { snapshot = {}; }
        var document = Factory.decorate(object, documents, snapshot);
        document.id = uri;
        return document;
    };
    Factory.decorate = function (object, documents, snapshot) {
        if (snapshot === void 0) { snapshot = {}; }
        if (Factory.hasClassProperties(object))
            return object;
        Document.Factory.decorate(object);
        PersistedResource.Factory.decorate(object, snapshot);
        ServiceAwareDocument.Factory.decorate(object, documents);
        MessagingDocument.Factory.decorate(object);
        var persistedDocument = object;
        return Object.defineProperties(persistedDocument, {
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
            "addType": {
                writable: false,
                enumerable: false,
                configurable: true,
                value: extendAddType(persistedDocument.addType),
            },
            "hasType": {
                writable: false,
                enumerable: false,
                configurable: true,
                value: extendHasType(persistedDocument.hasType),
            },
            "removeType": {
                writable: false,
                enumerable: false,
                configurable: true,
                value: extendRemoveType(persistedDocument.removeType),
            },
            "hasPointer": {
                writable: false,
                enumerable: false,
                configurable: true,
                value: (function () {
                    var superFunction = persistedDocument.hasPointer;
                    return function (id) {
                        if (RDF.URI.Util.isPrefixed(id)) {
                            id = ObjectSchema.Digester.resolvePrefixedURI(id, this._documents.getGeneralSchema());
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
                            id = ObjectSchema.Digester.resolvePrefixedURI(id, this._documents.getGeneralSchema());
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
                            uri = ObjectSchema.Digester.resolvePrefixedURI(uri, this._documents.getGeneralSchema());
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
            "createChildren": {
                writable: false,
                enumerable: false,
                configurable: true,
                value: createChildren,
            },
            "createChildAndRetrieve": {
                writable: false,
                enumerable: false,
                configurable: true,
                value: createChildAndRetrieve,
            },
            "createChildrenAndRetrieve": {
                writable: false,
                enumerable: false,
                configurable: true,
                value: createChildrenAndRetrieve,
            },
            "createAccessPoint": {
                writable: false,
                enumerable: false,
                configurable: true,
                value: createAccessPoint,
            },
            "createAccessPoints": {
                writable: false,
                enumerable: false,
                configurable: true,
                value: createAccessPoints,
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
            "sparql": {
                writable: false,
                enumerable: false,
                configurable: true,
                value: sparql,
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
            "revert": {
                writable: false,
                enumerable: false,
                configurable: true,
                value: extendRevert(persistedDocument.revert),
            },
        });
    };
    return Factory;
}());
exports.Factory = Factory;

//# sourceMappingURL=PersistedDocument.js.map
