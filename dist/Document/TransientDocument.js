"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var iri_1 = require("sparqler/iri");
var BlankNode_1 = require("../BlankNode");
var core_1 = require("../core");
var Errors_1 = require("../Errors");
var JSONLD_1 = require("../JSONLD");
var NamedFragment_1 = require("../NamedFragment");
var ObjectSchema_1 = require("../ObjectSchema");
var Pointer_1 = require("../Pointer");
var RDF_1 = require("../RDF");
var Registry_1 = require("../Registry");
var Resource_1 = require("../Resource");
var Utils_1 = require("../Utils");
var Vocabularies_1 = require("../Vocabularies");
function getLabelFrom(slug) {
    if (!iri_1.isRelative(slug) || slug.startsWith("#"))
        return slug;
    return "#" + slug;
}
function getNestedObjectId(object) {
    if ("id" in object)
        return object.id;
    if ("slug" in object)
        return RDF_1.URI.hasFragment(object.slug) ?
            object.slug : getLabelFrom(object.slug);
    return "";
}
function internalConverter(resource, target, tracker) {
    if (tracker === void 0) { tracker = new Set(); }
    Object
        .keys(target)
        .map(function (key) { return target[key]; })
        .forEach(function (next) {
        if (Array.isArray(next))
            return internalConverter(resource, next, tracker);
        if (!Utils_1.isPlainObject(next))
            return;
        if (exports.TransientDocument.is(next))
            return;
        if (next._registry && next._registry !== resource)
            return;
        var idOrSlug = getNestedObjectId(next);
        if (tracker.has(idOrSlug))
            return;
        if (idOrSlug && !resource.inScope(idOrSlug, true))
            return;
        var fragment = idOrSlug && resource.hasPointer(idOrSlug, true) ?
            resource.getPointer(idOrSlug, true) :
            resource._register(next);
        tracker.add(fragment.id);
        internalConverter(resource, fragment, tracker);
    });
}
var PROTOTYPE = {
    _registry: void 0,
    _normalize: function () {
        var usedFragments = new Set();
        internalConverter(this, this, usedFragments);
        this.getPointers(true)
            .map(Pointer_1.Pointer.getID)
            .filter(RDF_1.URI.isBNodeID)
            .filter(function (id) { return !usedFragments.has(id); })
            .forEach(this.removePointer, this);
    },
    _getLocalID: function (id) {
        if (RDF_1.URI.isBNodeID(id))
            return id;
        if (RDF_1.URI.isFragmentOf(id, this.id))
            return RDF_1.URI.getFragment(id);
        return Registry_1.Registry.PROTOTYPE._getLocalID.call(this, id);
    },
    _register: function (base) {
        var id = "slug" in base ? getLabelFrom(base.slug) :
            base.id ? base.id : RDF_1.URI.generateBNodeID();
        var targetBase = Object.assign(base, { id: id });
        var pointer = Registry_1.Registry.PROTOTYPE._register.call(this, targetBase);
        if (RDF_1.URI.isBNodeID(pointer.id))
            return BlankNode_1.TransientBlankNode.decorate(pointer);
        return NamedFragment_1.TransientNamedFragment.decorate(pointer);
    },
    hasFragment: function (id) {
        id = getLabelFrom(id);
        if (!this.inScope(id, true))
            return false;
        var localID = this._getLocalID(id);
        return this._resourcesMap.has(localID);
    },
    getFragment: function (id) {
        id = getLabelFrom(id);
        if (!this.inScope(id, true))
            throw new Errors_1.IllegalArgumentError("\"" + id + "\" is out of scope.");
        var localID = this._getLocalID(id);
        var resource = this._resourcesMap.get(localID);
        if (!resource)
            return null;
        return resource;
    },
    getNamedFragment: function (slug) {
        if (RDF_1.URI.isBNodeID(slug))
            throw new Errors_1.IllegalArgumentError("A named fragment slug can't start with \"_:\".");
        return this.getFragment(slug);
    },
    getFragments: function () {
        return this.getPointers(true);
    },
    createFragment: function (isOrObject, id) {
        var object = Utils_1.isObject(isOrObject) ? isOrObject : {};
        id = Utils_1.isString(isOrObject) ? isOrObject : id;
        if (id)
            object.id = getLabelFrom(id);
        var fragment = this._register(object);
        exports.TransientDocument._convertNestedObjects(this, fragment);
        return fragment;
    },
    createNamedFragment: function (slugOrObject, slug) {
        slug = Utils_1.isString(slugOrObject) ? slugOrObject : slug;
        if (!slug)
            throw new Errors_1.IllegalArgumentError("The slug can't be empty.");
        if (RDF_1.URI.isBNodeID(slug))
            throw new Errors_1.IllegalArgumentError("A named fragment slug can't start with \"_:\".");
        var object = Utils_1.isObject(slugOrObject) ? slugOrObject : {};
        var base = Object.assign(object, { slug: slug });
        var fragment = this._register(base);
        exports.TransientDocument._convertNestedObjects(this, fragment);
        return fragment;
    },
    removeNamedFragment: function (fragmentOrSlug) {
        var slug = Pointer_1.Pointer.getID(fragmentOrSlug);
        if (RDF_1.URI.isBNodeID(slug))
            throw new Errors_1.IllegalArgumentError("A named fragment slug can't start with \"_:\".");
        return this._removeFragment(slug);
    },
    _removeFragment: function (fragmentOrSlug) {
        var id = getLabelFrom(Pointer_1.Pointer.getID(fragmentOrSlug));
        if (!this.inScope(id, true))
            return false;
        return this.removePointer(id);
    },
    toJSON: function (registryOrKey) {
        var registry = Utils_1.isObject(registryOrKey) ?
            registryOrKey : this._registry;
        var generalSchema = registry ?
            registry.getGeneralSchema() : new ObjectSchema_1.DigestedObjectSchema();
        var jsonldConverter = registry ?
            registry.jsonldConverter : new JSONLD_1.JSONLDConverter();
        var expandedResources = [this].concat(this.getFragments()).map(function (resource) {
            var resourceSchema = registry ?
                registry.getSchemaFor(resource) :
                new ObjectSchema_1.DigestedObjectSchema();
            return jsonldConverter.expand(resource, generalSchema, resourceSchema);
        });
        return {
            "@id": this.id,
            "@graph": expandedResources,
        };
    },
};
exports.TransientDocument = {
    PROTOTYPE: PROTOTYPE,
    TYPE: Vocabularies_1.C.Document,
    isDecorated: function (object) {
        return Utils_1.isObject(object)
            && core_1.ModelDecorator
                .hasPropertiesFrom(PROTOTYPE, object);
    },
    is: function (value) {
        return Resource_1.TransientResource.is(value) &&
            Registry_1.Registry.isDecorated(value) &&
            exports.TransientDocument.isDecorated(value);
    },
    decorate: function (object) {
        if (exports.TransientDocument.isDecorated(object))
            return object;
        var resource = core_1.ModelDecorator
            .decorateMultiple(object, Resource_1.TransientResource, Registry_1.Registry);
        return core_1.ModelDecorator
            .definePropertiesFrom(PROTOTYPE, resource);
    },
    createFrom: function (object) {
        if (exports.TransientDocument.is(object))
            throw new Errors_1.IllegalArgumentError("The object provided is already a Document.");
        var document = exports.TransientDocument.decorate(object);
        exports.TransientDocument._convertNestedObjects(document, document);
        return document;
    },
    create: function (data) {
        var copy = Object.assign({}, data);
        return exports.TransientDocument.createFrom(copy);
    },
    _convertNestedObjects: function (resource, target) {
        internalConverter(resource, target);
        return target;
    },
};

//# sourceMappingURL=TransientDocument.js.map
