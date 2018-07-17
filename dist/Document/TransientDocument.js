"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var iri_1 = require("sparqler/iri");
var IllegalArgumentError_1 = require("../Errors/IllegalArgumentError");
var TransientFragment_1 = require("../Fragment/TransientFragment");
var ModelDecorator_1 = require("../Model/ModelDecorator");
var Pointer_1 = require("../Pointer/Pointer");
var URI_1 = require("../RDF/URI");
var Registry_1 = require("../Registry/Registry");
var Resource_1 = require("../Resource/Resource");
var Utils_1 = require("../Utils");
function __getLabelFrom(slug) {
    if (!iri_1.isRelative(slug) || slug.startsWith("#"))
        return slug;
    return "#" + slug;
}
function __getObjectId(object) {
    if ("$id" in object)
        return object.$id;
    if ("$slug" in object)
        return URI_1.URI.hasFragment(object.$slug) ?
            object.$slug : __getLabelFrom(object.$slug);
    return URI_1.URI.generateBNodeID();
}
function __convertNested(resource, target, tracker) {
    if (tracker === void 0) { tracker = new Set(); }
    Object
        .keys(target)
        .map(function (key) { return target[key]; })
        .forEach(function (next) {
        if (Array.isArray(next))
            return __convertNested(resource, next, tracker);
        if (!Utils_1.isPlainObject(next))
            return;
        if (exports.TransientDocument.is(next))
            return;
        if (next._registry && next._registry !== resource)
            return;
        var idOrSlug = __getObjectId(next);
        if (tracker.has(idOrSlug))
            return;
        if (!resource.$inScope(idOrSlug, true))
            return;
        var fragment = resource.$hasPointer(idOrSlug, true) ?
            resource.$getPointer(idOrSlug, true) :
            resource.$createFragment(next, idOrSlug);
        tracker.add(fragment.$id);
        __convertNested(resource, fragment, tracker);
    });
}
exports.TransientDocument = {
    PROTOTYPE: {
        $registry: void 0,
        $_normalize: function () {
            var usedFragments = new Set();
            __convertNested(this, this, usedFragments);
            this.$getPointers(true)
                .map(Pointer_1.Pointer.getID)
                .filter(URI_1.URI.isBNodeID)
                .filter(function (id) { return !usedFragments.has(id); })
                .forEach(this.$removePointer, this);
        },
        $_getLocalID: function (id) {
            if (URI_1.URI.isBNodeID(id))
                return id;
            if (URI_1.URI.isFragmentOf(id, this.$id))
                return URI_1.URI.getFragment(id);
            throw new IllegalArgumentError_1.IllegalArgumentError("\"" + id + "\" is out of scope.");
        },
        $getPointer: function (id, local) {
            id = URI_1.URI.resolve(this.$id, id);
            return Registry_1.Registry.PROTOTYPE.$getPointer.call(this, id, local);
        },
        $hasFragment: function (id) {
            id = __getLabelFrom(id);
            if (!this.$inScope(id, true))
                return false;
            var localID = this.$_getLocalID(id);
            return this.$__resourcesMap.has(localID);
        },
        $getFragment: function (id) {
            id = __getLabelFrom(id);
            var localID = this.$_getLocalID(id);
            var resource = this.$__resourcesMap.get(localID);
            if (!resource)
                return null;
            return resource;
        },
        $getFragments: function () {
            return this.$getPointers(true);
        },
        $createFragment: function (isOrObject, id) {
            var object = Utils_1.isObject(isOrObject) ? isOrObject : {};
            if (Utils_1.isString(isOrObject))
                id = isOrObject;
            var $id = id ? __getLabelFrom(id) : __getObjectId(object);
            var fragment = this.$_addPointer(Object
                .assign(object, { $id: $id }));
            __convertNested(this, fragment);
            return fragment;
        },
        $removeFragment: function (fragmentOrSlug) {
            var id = __getLabelFrom(Pointer_1.Pointer.getID(fragmentOrSlug));
            if (!this.$inScope(id, true))
                return false;
            return this.$removePointer(id);
        },
        toJSON: function (contextOrKey) {
            var nodes = [
                Resource_1.Resource.PROTOTYPE.toJSON.call(this, contextOrKey)
            ].concat(this
                .$getFragments()
                .map(function (resource) { return resource.toJSON(contextOrKey); }));
            return {
                "@id": this.$id,
                "@graph": nodes,
            };
        },
    },
    isDecorated: function (object) {
        return ModelDecorator_1.ModelDecorator
            .hasPropertiesFrom(exports.TransientDocument.PROTOTYPE, object);
    },
    decorate: function (object) {
        if (exports.TransientDocument.isDecorated(object))
            return object;
        var base = ModelDecorator_1.ModelDecorator.definePropertiesFrom({
            $__modelDecorator: TransientFragment_1.TransientFragment,
        }, object);
        var resource = ModelDecorator_1.ModelDecorator
            .decorateMultiple(base, Resource_1.Resource, Registry_1.Registry);
        return ModelDecorator_1.ModelDecorator
            .definePropertiesFrom(exports.TransientDocument.PROTOTYPE, resource);
    },
    is: function (value) {
        return Resource_1.Resource.is(value) &&
            Registry_1.Registry.isDecorated(value) &&
            exports.TransientDocument.isDecorated(value);
    },
    createFrom: function (object) {
        if (exports.TransientDocument.is(object))
            throw new IllegalArgumentError_1.IllegalArgumentError("The object provided is already a Document.");
        var document = exports.TransientDocument.decorate(object);
        __convertNested(document, document);
        return document;
    },
    create: function (data) {
        var copy = Object.assign({}, data);
        return exports.TransientDocument.createFrom(copy);
    },
};

//# sourceMappingURL=TransientDocument.js.map
