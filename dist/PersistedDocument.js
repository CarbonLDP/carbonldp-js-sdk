"use strict";
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
}
Object.defineProperty(exports, "__esModule", { value: true });
var Document_1 = require("./Document");
var Request_1 = require("./HTTP/Request");
var Document_2 = require("./Messaging/Document");
var ObjectSchema = __importStar(require("./ObjectSchema"));
var PersistedFragment_1 = require("./PersistedFragment");
var PersistedNamedFragment_1 = require("./PersistedNamedFragment");
var PersistedResource_1 = require("./PersistedResource");
var Pointer_1 = require("./Pointer");
var URI_1 = require("./RDF/URI");
var ServiceAwareDocument_1 = require("./ServiceAwareDocument");
var Utils = __importStar(require("./Utils"));
exports.PersistedDocument = {
    isDecorated: function (object) {
        return Utils.hasPropertyDefined(object, "_eTag")
            && Utils.hasFunction(object, "isLocallyOutDated")
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
            && Utils.hasFunction(object, "listChildren")
            && Utils.hasFunction(object, "getChildren")
            && Utils.hasFunction(object, "listMembers")
            && Utils.hasFunction(object, "getMembers")
            && Utils.hasFunction(object, "removeMember")
            && Utils.hasFunction(object, "removeMembers")
            && Utils.hasFunction(object, "removeAllMembers")
            && Utils.hasFunction(object, "executeRawASKQuery")
            && Utils.hasFunction(object, "executeASKQuery")
            && Utils.hasFunction(object, "executeRawSELECTQuery")
            && Utils.hasFunction(object, "executeSELECTQuery")
            && Utils.hasFunction(object, "executeRawDESCRIBEQuery")
            && Utils.hasFunction(object, "executeRawCONSTRUCTQuery")
            && Utils.hasFunction(object, "executeUPDATE")
            && Utils.hasFunction(object, "sparql");
    },
    is: function (object) {
        return Document_1.Document.is(object)
            && Document_2.MessagingDocument.isDecorated(object)
            && exports.PersistedDocument.isDecorated(object);
    },
    create: function (documents, uri) {
        return exports.PersistedDocument.createFrom({}, documents, uri);
    },
    createFrom: function (object, documents, uri) {
        var document = exports.PersistedDocument.decorate(object, documents);
        document.id = uri;
        Document_1.Document._convertNestedObjects(document, document);
        return document;
    },
    decorate: function (object, documents) {
        if (exports.PersistedDocument.isDecorated(object))
            return object;
        Document_1.Document.decorate(object);
        PersistedResource_1.PersistedResource.decorate(object);
        ServiceAwareDocument_1.ServiceAwareDocument.decorate(object, documents);
        Document_2.MessagingDocument.decorate(object);
        var persistedDocument = object;
        return Object.defineProperties(persistedDocument, {
            "_eTag": {
                writable: true,
                enumerable: false,
                configurable: true,
            },
            "isLocallyOutDated": {
                writable: false,
                enumerable: false,
                configurable: true,
                value: isLocallyOutDated,
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
                        id = ObjectSchema.ObjectSchemaUtils.resolveURI(id, this._documents.getGeneralSchema());
                        if (superFunction.call(this, id))
                            return true;
                        return !URI_1.URI.isBNodeID(id) && this._documents.hasPointer(id);
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
                        id = ObjectSchema.ObjectSchemaUtils.resolveURI(id, this._documents.getGeneralSchema());
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
                        var id = Pointer_1.Pointer.is(idOrPointer) ? idOrPointer.id : idOrPointer;
                        id = ObjectSchema.ObjectSchemaUtils.resolveURI(id, this._documents.getGeneralSchema());
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
    },
};
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
function isLocallyOutDated() {
    return this._eTag === null;
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
    document._savedFragments = Utils.ArrayUtils.from(document._fragmentsIndex.values());
}
function resolveURI(uri) {
    if (URI_1.URI.isAbsolute(uri))
        return uri;
    var schema = this._documents.getGeneralSchema();
    return ObjectSchema.ObjectSchemaUtils.resolveURI(uri, schema, { vocab: true });
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
        if (URI_1.URI.isBNodeID(id))
            PersistedFragment_1.PersistedFragment.decorate(fragment);
        return fragment;
    };
}
function extendCreateNamedFragment(superFunction) {
    return function (slugOrObject, slug) {
        var fragment = superFunction.call(this, slugOrObject, slug);
        return PersistedNamedFragment_1.PersistedNamedFragment.decorate(fragment);
    };
}
function refresh(requestOptions) {
    return this._documents.refresh(this, requestOptions);
}
function save(requestOptions) {
    return this._documents.save(this, requestOptions);
}
function saveAndRefresh(requestOptions) {
    return this._documents.saveAndRefresh(this, requestOptions);
}
function _delete(requestOptions) {
    return this._documents.delete(this.id, requestOptions);
}
function getDownloadURL(requestOptions) {
    return this._documents.getDownloadURL(this.id, requestOptions);
}
function addMember(memberOrUri, requestOptions) {
    return this._documents.addMember(this.id, memberOrUri, requestOptions);
}
function addMembers(members, requestOptions) {
    return this._documents.addMembers(this.id, members, requestOptions);
}
function get(relativeURI, optionsOrQueryBuilderFn, queryBuilderFn) {
    var uri = URI_1.URI.resolve(this.id, relativeURI);
    return this._documents
        .get(uri, optionsOrQueryBuilderFn, queryBuilderFn)
        .then(function (data) { return data[0]; });
}
function createChild(objectOrSlugOrRequestOptions, slugOrRequestOptions, requestOptions) {
    requestOptions = Request_1.RequestUtils.isOptions(objectOrSlugOrRequestOptions) ? objectOrSlugOrRequestOptions : Request_1.RequestUtils.isOptions(slugOrRequestOptions) ? slugOrRequestOptions : requestOptions;
    var object = Utils.isString(objectOrSlugOrRequestOptions) || Request_1.RequestUtils.isOptions(objectOrSlugOrRequestOptions) || !objectOrSlugOrRequestOptions ? {} : objectOrSlugOrRequestOptions;
    var slug = Utils.isString(objectOrSlugOrRequestOptions) ? objectOrSlugOrRequestOptions : Utils.isString(slugOrRequestOptions) ? slugOrRequestOptions : null;
    return this._documents.createChild(this.id, object, slug, requestOptions);
}
function createChildren(objects, slugsOrRequestOptions, requestOptions) {
    return this._documents.createChildren(this.id, objects, slugsOrRequestOptions, requestOptions);
}
function createChildAndRetrieve(objectOrSlugOrRequestOptions, slugOrRequestOptions, requestOptions) {
    requestOptions = Request_1.RequestUtils.isOptions(objectOrSlugOrRequestOptions) ? objectOrSlugOrRequestOptions : Request_1.RequestUtils.isOptions(slugOrRequestOptions) ? slugOrRequestOptions : requestOptions;
    var object = Utils.isString(objectOrSlugOrRequestOptions) || Request_1.RequestUtils.isOptions(objectOrSlugOrRequestOptions) || !objectOrSlugOrRequestOptions ? {} : objectOrSlugOrRequestOptions;
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
function listChildren(requestOptions) {
    return this._documents.listChildren(this.id, requestOptions);
}
function getChildren(requestOptionsOrQueryBuilderFn, queryBuilderFn) {
    return this._documents.getChildren(this.id, requestOptionsOrQueryBuilderFn, queryBuilderFn);
}
function listMembers(requestOptions) {
    return this._documents.listMembers(this.id, requestOptions);
}
function getMembers(requestOptionsOrQueryBuilderFn, childrenQuery) {
    return this._documents.getMembers(this.id, requestOptionsOrQueryBuilderFn, childrenQuery);
}
function removeMember(memberOrUri, requestOptions) {
    return this._documents.removeMember(this.id, memberOrUri, requestOptions);
}
function removeMembers(members, requestOptions) {
    return this._documents.removeMembers(this.id, members, requestOptions);
}
function removeAllMembers(requestOptions) {
    return this._documents.removeAllMembers(this.id, requestOptions);
}
function executeRawASKQuery(askQuery, requestOptions) {
    return this._documents.executeRawASKQuery(this.id, askQuery, requestOptions);
}
function executeASKQuery(askQuery, requestOptions) {
    return this._documents.executeASKQuery(this.id, askQuery, requestOptions);
}
function executeRawSELECTQuery(selectQuery, requestOptions) {
    return this._documents.executeRawSELECTQuery(this.id, selectQuery, requestOptions);
}
function executeSELECTQuery(selectQuery, requestOptions) {
    return this._documents.executeSELECTQuery(this.id, selectQuery, requestOptions);
}
function executeRawCONSTRUCTQuery(constructQuery, requestOptions) {
    return this._documents.executeRawCONSTRUCTQuery(this.id, constructQuery, requestOptions);
}
function executeRawDESCRIBEQuery(describeQuery, requestOptions) {
    return this._documents.executeRawDESCRIBEQuery(this.id, describeQuery, requestOptions);
}
function executeUPDATE(updateQuery, requestOptions) {
    return this._documents.executeUPDATE(this.id, updateQuery, requestOptions);
}
function sparql() {
    return this._documents.sparql(this.id);
}
exports.default = exports.PersistedDocument;

//# sourceMappingURL=PersistedDocument.js.map
