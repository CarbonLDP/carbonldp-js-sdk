"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
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
var PROTOTYPE = {
    _context: void 0,
    _registry: void 0,
    _normalize: function () {
        var _this = this;
        var currentBNodes = this.getFragments()
            .map(Pointer_1.Pointer.getID)
            .filter(RDF_1.URI.isBNodeID);
        var usedFragmentsIDs = new Set();
        exports.TransientDocument._convertNestedObjects(this, this, usedFragmentsIDs);
        currentBNodes.forEach(function (bNode) {
            if (usedFragmentsIDs.has(bNode))
                return;
            _this._resourcesMap.delete(bNode);
        });
    },
    _getLocalID: function (id) {
        id = Registry_1.Registry.PROTOTYPE._getLocalID.call(this, id);
        if (RDF_1.URI.isBNodeID(id))
            return id;
        if (RDF_1.URI.isFragmentOf(id, this.id))
            return RDF_1.URI.getFragment(id);
        if (RDF_1.URI.isRelative(id))
            return id;
        return null;
    },
    _register: function (base) {
        if (base.slug)
            base.id = base.slug;
        if (!base.id)
            base.id = RDF_1.URI.generateBNodeID();
        var pointer = Registry_1.Registry.PROTOTYPE._register.call(this, base);
        exports.TransientDocument._convertNestedObjects(this, pointer);
        if (RDF_1.URI.isBNodeID(pointer.id))
            return BlankNode_1.TransientBlankNode.decorate(pointer);
        var resource = NamedFragment_1.TransientNamedFragment.decorate(pointer);
        resource.slug = this._getLocalID(resource._id);
        return resource;
    },
    hasFragment: function (id) {
        if (!this.inScope(id))
            return false;
        var localID = this._getLocalID(id);
        return this._resourcesMap.has(localID);
    },
    getFragment: function (id) {
        if (!this.inScope(id))
            throw new Errors_1.IllegalArgumentError("\"" + id + "\" is outside the scope of the registry.");
        var localID = this._getLocalID(id);
        var resource = this._resourcesMap.get(localID);
        if (!resource)
            return null;
        return resource;
    },
    getNamedFragment: function (slug) {
        if (RDF_1.URI.isBNodeID(slug))
            throw new Errors_1.IllegalArgumentError("Invalid named fragment slug \"" + slug + "\", it can't start with \"_:\".");
        return this.getFragment(slug);
    },
    getFragments: function () {
        return Array.from(this._resourcesMap.values());
    },
    createFragment: function (isOrObject, id) {
        var object = Utils_1.isObject(isOrObject) ? isOrObject : {};
        id = Utils_1.isString(isOrObject) ? isOrObject : id;
        if (id)
            object.id = id;
        return this._register(object);
    },
    createNamedFragment: function (slugOrObject, slug) {
        slug = Utils_1.isString(slugOrObject) ? slugOrObject : slug;
        if (!slug)
            throw new Errors_1.IllegalArgumentError("The slug can't be empty.");
        if (RDF_1.URI.isBNodeID(slug))
            throw new Errors_1.IllegalArgumentError("Invalid named fragment slug \"" + slug + "\", it can't start with \"_:\".");
        var object = Utils_1.isObject(slugOrObject) ? slugOrObject : {};
        var base = Object.assign(object, { slug: slug });
        return this._register(base);
    },
    removeNamedFragment: function (fragmentOrSlug) {
        var id = Pointer_1.Pointer.getID(fragmentOrSlug);
        if (RDF_1.URI.isBNodeID(id))
            throw new Errors_1.IllegalArgumentError("\"" + id + "\" is not a valid named fragment.");
        return this._removeFragment(id);
    },
    _removeFragment: function (fragmentOrSlug) {
        if (!this.inScope(fragmentOrSlug))
            return false;
        return this.removePointer(fragmentOrSlug);
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
    _convertNestedObjects: function (parent, actual, fragmentsTracker) {
        if (fragmentsTracker === void 0) { fragmentsTracker = new Set(); }
        for (var _i = 0, _a = Object.keys(actual); _i < _a.length; _i++) {
            var key = _a[_i];
            var next = actual[key];
            if (Array.isArray(next)) {
                exports.TransientDocument._convertNestedObjects(parent, next, fragmentsTracker);
                continue;
            }
            if (!Utils_1.isPlainObject(next))
                continue;
            if (next._registry)
                continue;
            if (exports.TransientDocument.is(next))
                continue;
            var idOrSlug = getNestedObjectId(next);
            if (!!idOrSlug && !parent.inScope(idOrSlug))
                continue;
            var parentFragment = parent.getFragment(idOrSlug);
            if (!parentFragment) {
                var fragment = parent.createFragment(next, idOrSlug);
                exports.TransientDocument._convertNestedObjects(parent, fragment, fragmentsTracker);
            }
            else if (parentFragment !== next) {
                var fragment = actual[key] = Object.assign(parentFragment, next);
                exports.TransientDocument._convertNestedObjects(parent, fragment, fragmentsTracker);
            }
            else if (!fragmentsTracker.has(next.id)) {
                fragmentsTracker.add(next.id);
                exports.TransientDocument._convertNestedObjects(parent, next, fragmentsTracker);
            }
        }
        return actual;
    },
};
function getNestedObjectId(object) {
    if ("id" in object)
        return object.id;
    if ("slug" in object)
        return RDF_1.URI.hasFragment(object.slug) ?
            object.slug : "#" + object.slug;
    return "";
}

//# sourceMappingURL=TransientDocument.js.map
