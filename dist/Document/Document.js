"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Fragment_1 = require("../Fragment/Fragment");
var ModelDecorator_1 = require("../Model/ModelDecorator");
var ResolvablePointer_1 = require("../Repository/ResolvablePointer");
var Utils_1 = require("../Utils");
var C_1 = require("../Vocabularies/C");
var LDP_1 = require("../Vocabularies/LDP");
var XSD_1 = require("../Vocabularies/XSD");
var EventEmitterDocumentTrait_1 = require("./Traits/EventEmitterDocumentTrait");
var QueryableDocumentTrait_1 = require("./Traits/QueryableDocumentTrait");
var SPARQLDocumentTrait_1 = require("./Traits/SPARQLDocumentTrait");
var TransientDocument_1 = require("./TransientDocument");
exports.Document = {
    TYPE: C_1.C.Document,
    SCHEMA: {
        "contains": {
            "@id": LDP_1.LDP.contains,
            "@container": "@set",
            "@type": "@id",
        },
        "members": {
            "@id": LDP_1.LDP.member,
            "@container": "@set",
            "@type": "@id",
        },
        "membershipResource": {
            "@id": LDP_1.LDP.membershipResource,
            "@type": "@id",
        },
        "isMemberOfRelation": {
            "@id": LDP_1.LDP.isMemberOfRelation,
            "@type": "@id",
        },
        "hasMemberRelation": {
            "@id": LDP_1.LDP.hasMemberRelation,
            "@type": "@id",
        },
        "insertedContentRelation": {
            "@id": LDP_1.LDP.insertedContentRelation,
            "@type": "@id",
        },
        "created": {
            "@id": C_1.C.created,
            "@type": XSD_1.XSD.dateTime,
        },
        "modified": {
            "@id": C_1.C.modified,
            "@type": XSD_1.XSD.dateTime,
        },
        "defaultInteractionModel": {
            "@id": C_1.C.defaultInteractionModel,
            "@type": "@id",
        },
        "accessPoints": {
            "@id": C_1.C.accessPoint,
            "@type": "@id",
            "@container": "@set",
        },
    },
    PROTOTYPE: {
        get __savedFragments() { return []; },
        _syncSavedFragments: function () {
            this.__savedFragments = Array
                .from(this.__resourcesMap.values());
            this.__savedFragments
                .forEach(function (fragment) { return fragment._syncSnapshot(); });
        },
        _syncSnapshot: function () {
            ResolvablePointer_1.ResolvablePointer.PROTOTYPE._syncSnapshot.call(this);
            this._syncSavedFragments();
        },
        isDirty: function () {
            var _this = this;
            var isSelfDirty = ResolvablePointer_1.ResolvablePointer.PROTOTYPE.isDirty.call(this);
            if (isSelfDirty)
                return true;
            var hasRemovedFragments = this
                .__savedFragments
                .some(function (fragment) { return !_this.hasFragment(fragment.$id); });
            if (hasRemovedFragments)
                return true;
            var hasNewFragments = this
                .__savedFragments.length !== this.__resourcesMap.size;
            if (hasNewFragments)
                return true;
            return this
                .__savedFragments
                .some(function (fragment) { return fragment.isDirty(); });
        },
        revert: function () {
            var _this = this;
            ResolvablePointer_1.ResolvablePointer.PROTOTYPE.revert.call(this);
            this.__resourcesMap.clear();
            this
                .__savedFragments
                .forEach(function (fragment) {
                fragment.revert();
                _this.__resourcesMap.set(fragment.$slug, fragment);
            });
        },
    },
    isDecorated: function (object) {
        return Utils_1.isObject(object)
            && ModelDecorator_1.ModelDecorator
                .hasPropertiesFrom(exports.Document.PROTOTYPE, object);
    },
    is: function (object) {
        return TransientDocument_1.TransientDocument.is(object)
            && SPARQLDocumentTrait_1.SPARQLDocumentTrait.isDecorated(object)
            && EventEmitterDocumentTrait_1.EventEmitterDocumentTrait.isDecorated(object)
            && QueryableDocumentTrait_1.QueryableDocumentTrait.isDecorated(object)
            && exports.Document.isDecorated(object);
    },
    decorate: function (object) {
        if (exports.Document.isDecorated(object))
            return object;
        var base = Object.assign(object, {
            __modelDecorator: Fragment_1.Fragment,
        });
        var target = ModelDecorator_1.ModelDecorator
            .decorateMultiple(base, SPARQLDocumentTrait_1.SPARQLDocumentTrait, EventEmitterDocumentTrait_1.EventEmitterDocumentTrait, QueryableDocumentTrait_1.QueryableDocumentTrait);
        return ModelDecorator_1.ModelDecorator
            .definePropertiesFrom(exports.Document.PROTOTYPE, target);
    },
    create: TransientDocument_1.TransientDocument.create,
    createFrom: TransientDocument_1.TransientDocument.createFrom,
};

//# sourceMappingURL=Document.js.map
