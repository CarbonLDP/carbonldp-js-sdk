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
var Members_1 = require("../Members");
var Messaging_1 = require("../Messaging");
var Resource_1 = require("../Resource");
var SPARQL_1 = require("../SPARQL");
var QueryDocument_1 = require("../SPARQL/QueryDocument");
var Utils = __importStar(require("../Utils"));
var Utils_1 = require("../Utils");
var Vocabularies_1 = require("../Vocabularies");
var CRUDDocument_1 = require("./CRUDDocument");
var TransientDocument_1 = require("./TransientDocument");
function addEnsureIfPartial(iri, resource, requestOptions) {
    if (requestOptions.ensureLatest)
        return;
    if (!resource._registry || !resource._registry.hasPointer(iri, true))
        return;
    var target = resource._registry.getPointer(iri, true);
    if (target.isPartial())
        requestOptions.ensureLatest = true;
}
var PROTOTYPE = {
    get: function (uriOrOptionsOrQueryBuilderFn, optionsOrQueryBuilderFn, queryBuilderFn) {
        var iri = Utils_1.isString(uriOrOptionsOrQueryBuilderFn) ? uriOrOptionsOrQueryBuilderFn : this.id;
        var requestOptions = Utils_1.isObject(uriOrOptionsOrQueryBuilderFn) ?
            uriOrOptionsOrQueryBuilderFn : Utils_1.isObject(optionsOrQueryBuilderFn) ? optionsOrQueryBuilderFn : {};
        queryBuilderFn = Utils_1.isFunction(uriOrOptionsOrQueryBuilderFn) ? uriOrOptionsOrQueryBuilderFn :
            Utils_1.isFunction(optionsOrQueryBuilderFn) ? optionsOrQueryBuilderFn : queryBuilderFn;
        if (queryBuilderFn)
            return QueryDocument_1.QueryDocumentDocument.PROTOTYPE
                .get.call(this, iri, requestOptions, queryBuilderFn);
        addEnsureIfPartial(iri, this, requestOptions);
        return CRUDDocument_1.CRUDDocument.PROTOTYPE.get.call(this, iri, requestOptions);
    },
    resolve: function (optionsOrQueryBuilderFn, queryBuilderFn) {
        var requestOptions = Utils_1.isObject(optionsOrQueryBuilderFn) ?
            optionsOrQueryBuilderFn : {};
        if (Utils_1.isFunction(optionsOrQueryBuilderFn))
            queryBuilderFn = optionsOrQueryBuilderFn;
        if (queryBuilderFn)
            return QueryDocument_1.QueryDocumentDocument.PROTOTYPE.resolve.call(this, requestOptions, queryBuilderFn);
        addEnsureIfPartial(this.id, this, requestOptions);
        return CRUDDocument_1.CRUDDocument.PROTOTYPE.resolve.call(this, requestOptions);
    },
    refresh: function (requestOptions) {
        if (this.isPartial())
            return QueryDocument_1.QueryDocumentDocument.PROTOTYPE.refresh.call(this, requestOptions);
        return CRUDDocument_1.CRUDDocument.PROTOTYPE.refresh.call(this, requestOptions);
    },
    save: function (requestOptions) {
        if (this.isPartial())
            return QueryDocument_1.QueryDocumentDocument.PROTOTYPE.save.call(this, requestOptions);
        return CRUDDocument_1.CRUDDocument.PROTOTYPE.save.call(this, requestOptions);
    },
    saveAndRefresh: function (requestOptions) {
        if (this.isPartial())
            return QueryDocument_1.QueryDocumentDocument.PROTOTYPE.saveAndRefresh.call(this, requestOptions);
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
            && Members_1.MembersDocument.isDecorated(object)
            && SPARQL_1.SPARQLDocument.isDecorated(object)
            && Messaging_1.MessagingDocument.isDecorated(object)
            && QueryDocument_1.QueryDocumentDocument.isDecorated(object)
            && exports.Document.isDecorated(object);
    },
    decorate: function (object) {
        if (exports.Document.isDecorated(object))
            return object;
        var resource = core_1.ModelDecorator
            .decorateMultiple(object, CRUDDocument_1.CRUDDocument, Members_1.MembersDocument, SPARQL_1.SPARQLDocument, Messaging_1.MessagingDocument, QueryDocument_1.QueryDocumentDocument);
        return core_1.ModelDecorator
            .definePropertiesFrom(PROTOTYPE, resource);
    },
    create: TransientDocument_1.TransientDocument.create,
    createFrom: TransientDocument_1.TransientDocument.createFrom,
};

//# sourceMappingURL=Document.js.map
