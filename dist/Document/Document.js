"use strict";
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("../core");
var Messaging_1 = require("../Messaging");
var Resource_1 = require("../Resource");
var Utils = __importStar(require("../Utils"));
var Utils_1 = require("../Utils");
var Vocabularies_1 = require("../Vocabularies");
var CRUDDocument_1 = require("./CRUDDocument");
var MembersDocument_1 = require("./MembersDocument");
var QueryDocumentDocument_1 = require("./QueryDocumentDocument");
var SPARQLDocument_1 = require("./SPARQLDocument");
var TransientDocument_1 = require("./TransientDocument");
var PROTOTYPE = {
    get: function (uriOrOptionsOrQueryBuilderFn, optionsOrQueryBuilderFn, queryBuilderFn) {
        var iri = Utils_1.isString(uriOrOptionsOrQueryBuilderFn) ? uriOrOptionsOrQueryBuilderFn : "";
        var requestOptions = Utils_1.isObject(uriOrOptionsOrQueryBuilderFn) ?
            uriOrOptionsOrQueryBuilderFn : Utils_1.isObject(optionsOrQueryBuilderFn) ? optionsOrQueryBuilderFn : {};
        queryBuilderFn = Utils_1.isFunction(uriOrOptionsOrQueryBuilderFn) ? uriOrOptionsOrQueryBuilderFn :
            Utils_1.isFunction(optionsOrQueryBuilderFn) ? optionsOrQueryBuilderFn : queryBuilderFn;
        if (queryBuilderFn)
            return QueryDocumentDocument_1.QueryDocumentDocument.PROTOTYPE
                .get.call(this, iri, requestOptions, queryBuilderFn);
        if (this._registry.hasPointer(iri) && !requestOptions.ensureLatest) {
            var resource = this._registry.getPointer(iri);
            if (resource.isPartial())
                requestOptions.ensureLatest = true;
        }
        return CRUDDocument_1.CRUDDocument.PROTOTYPE.get.call(this, uriOrOptionsOrQueryBuilderFn, optionsOrQueryBuilderFn);
    },
    resolve: function (optionsOrQueryBuilderFn, queryBuilderFn) {
        return this.get(optionsOrQueryBuilderFn, queryBuilderFn);
    },
    refresh: function (requestOptions) {
        if (this.isPartial())
            return QueryDocumentDocument_1.QueryDocumentDocument.PROTOTYPE.refresh.call(this, requestOptions);
        return CRUDDocument_1.CRUDDocument.PROTOTYPE.refresh.call(this, requestOptions);
    },
    save: function (requestOptions) {
        if (this.isPartial())
            return QueryDocumentDocument_1.QueryDocumentDocument.PROTOTYPE.save.call(this, requestOptions);
        return CRUDDocument_1.CRUDDocument.PROTOTYPE.save.call(this, requestOptions);
    },
    saveAndRefresh: function (requestOptions) {
        if (this.isPartial())
            return QueryDocumentDocument_1.QueryDocumentDocument.PROTOTYPE.saveAndRefresh.call(this, requestOptions);
        return CRUDDocument_1.CRUDDocument.PROTOTYPE.saveAndRefresh.call(this, requestOptions);
    },
    isDirty: function () {
        var _this = this;
        var isSelfDirty = Resource_1.PersistedResource.PROTOTYPE.isDirty.call(this);
        if (isSelfDirty)
            return true;
        var hasRemovedFragments = this
            ._savedFragments
            .some(function (fragment) { return !_this.hasFragment(fragment.id); });
        if (hasRemovedFragments)
            return true;
        var hasNewFragments = this
            ._savedFragments.length !== this._resourcesMap.size;
        if (hasNewFragments)
            return true;
        return this
            ._savedFragments
            .some(function (fragment) { return fragment.isDirty(); });
    },
    revert: function () {
        var _this = this;
        Resource_1.PersistedResource.PROTOTYPE.revert.call(this);
        this._resourcesMap.clear();
        this
            ._savedFragments
            .forEach(function (fragment) {
            fragment.revert();
            var localID = "slug" in fragment ?
                fragment.slug : fragment.id;
            _this._resourcesMap.set(localID, fragment);
        });
    },
};
exports.Document = {
    PROTOTYPE: PROTOTYPE,
    TYPE: Vocabularies_1.C.Document,
    SCHEMA: {
        "contains": {
            "@id": Vocabularies_1.LDP.contains,
            "@container": "@set",
            "@type": "@id",
        },
        "members": {
            "@id": Vocabularies_1.LDP.member,
            "@container": "@set",
            "@type": "@id",
        },
        "membershipResource": {
            "@id": Vocabularies_1.LDP.membershipResource,
            "@type": "@id",
        },
        "isMemberOfRelation": {
            "@id": Vocabularies_1.LDP.isMemberOfRelation,
            "@type": "@id",
        },
        "hasMemberRelation": {
            "@id": Vocabularies_1.LDP.hasMemberRelation,
            "@type": "@id",
        },
        "insertedContentRelation": {
            "@id": Vocabularies_1.LDP.insertedContentRelation,
            "@type": "@id",
        },
        "created": {
            "@id": Vocabularies_1.C.created,
            "@type": Vocabularies_1.XSD.dateTime,
        },
        "modified": {
            "@id": Vocabularies_1.C.modified,
            "@type": Vocabularies_1.XSD.dateTime,
        },
        "defaultInteractionModel": {
            "@id": Vocabularies_1.C.defaultInteractionModel,
            "@type": "@id",
        },
        "accessPoints": {
            "@id": Vocabularies_1.C.accessPoint,
            "@type": "@id",
            "@container": "@set",
        },
    },
    isDecorated: function (object) {
        return Utils.isObject(object)
            && core_1.ModelDecorator
                .hasPropertiesFrom(PROTOTYPE, object);
    },
    is: function (object) {
        return CRUDDocument_1.CRUDDocument.is(object)
            && MembersDocument_1.MembersDocument.isDecorated(object)
            && SPARQLDocument_1.SPARQLDocument.isDecorated(object)
            && Messaging_1.MessagingDocument.isDecorated(object)
            && QueryDocumentDocument_1.QueryDocumentDocument.isDecorated(object)
            && exports.Document.isDecorated(object);
    },
    decorate: function (object) {
        if (exports.Document.isDecorated(object))
            return object;
        var resource = core_1.ModelDecorator
            .decorateMultiple(object, CRUDDocument_1.CRUDDocument, MembersDocument_1.MembersDocument, SPARQLDocument_1.SPARQLDocument, Messaging_1.MessagingDocument, QueryDocumentDocument_1.QueryDocumentDocument);
        return core_1.ModelDecorator
            .definePropertiesFrom(PROTOTYPE, resource);
    },
    create: TransientDocument_1.TransientDocument.create,
    createFrom: TransientDocument_1.TransientDocument.createFrom,
};

//# sourceMappingURL=Document.js.map
