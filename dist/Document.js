"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var BlankNode_1 = require("./BlankNode");
var IDAlreadyInUseError_1 = require("./Errors/IDAlreadyInUseError");
var IllegalArgumentError_1 = require("./Errors/IllegalArgumentError");
var Converter_1 = require("./JSONLD/Converter");
var NamedFragment_1 = require("./NamedFragment");
var ObjectSchema_1 = require("./ObjectSchema");
var Pointer_1 = require("./Pointer");
var URI_1 = require("./RDF/URI");
var Resource_1 = require("./Resource");
var Utils_1 = require("./Utils");
var C_1 = require("./Vocabularies/C");
var LDP_1 = require("./Vocabularies/LDP");
var XSD_1 = require("./Vocabularies/XSD");
var SCHEMA = {
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
};
exports.Document = {
    TYPE: C_1.C.Document,
    SCHEMA: SCHEMA,
    isDecorated: function (object) {
        return Utils_1.isObject(object) &&
            Utils_1.hasPropertyDefined(object, "_fragmentsIndex") &&
            Utils_1.hasFunction(object, "_normalize") &&
            Utils_1.hasFunction(object, "_removeFragment") &&
            Utils_1.hasFunction(object, "hasPointer") &&
            Utils_1.hasFunction(object, "getPointer") &&
            Utils_1.hasFunction(object, "inScope") &&
            Utils_1.hasFunction(object, "hasFragment") &&
            Utils_1.hasFunction(object, "getFragment") &&
            Utils_1.hasFunction(object, "getNamedFragment") &&
            Utils_1.hasFunction(object, "getFragments") &&
            Utils_1.hasFunction(object, "createFragment") &&
            Utils_1.hasFunction(object, "createNamedFragment") &&
            Utils_1.hasFunction(object, "removeNamedFragment") &&
            Utils_1.hasFunction(object, "toJSON");
    },
    is: function (object) {
        return Resource_1.Resource.is(object) &&
            exports.Document.isDecorated(object);
    },
    decorate: function (object) {
        if (exports.Document.isDecorated(object))
            return object;
        Resource_1.Resource.decorate(object);
        Object.defineProperties(object, {
            "_fragmentsIndex": {
                configurable: true,
                value: new Map(),
            },
            "_normalize": {
                configurable: true,
                value: normalize,
            },
            "_removeFragment": {
                configurable: true,
                value: removeFragment,
            },
            "hasPointer": {
                configurable: true,
                value: hasPointer,
            },
            "getPointer": {
                configurable: true,
                value: getPointer,
            },
            "inScope": {
                configurable: true,
                value: inScope,
            },
            "hasFragment": {
                configurable: true,
                value: hasFragment,
            },
            "getFragment": {
                configurable: true,
                value: getFragment,
            },
            "getNamedFragment": {
                configurable: true,
                value: getNamedFragment,
            },
            "getFragments": {
                configurable: true,
                value: getFragments,
            },
            "createFragment": {
                configurable: true,
                value: createFragment,
            },
            "createNamedFragment": {
                configurable: true,
                value: createNamedFragment,
            },
            "removeNamedFragment": {
                configurable: true,
                value: removeNamedFragment,
            },
            "toJSON": {
                configurable: true,
                value: toJSON,
            },
        });
        return object;
    },
    createFrom: function (object) {
        if (exports.Document.is(object))
            throw new IllegalArgumentError_1.IllegalArgumentError("The object provided is already a Document.");
        var document = exports.Document.decorate(object);
        exports.Document._convertNestedObjects(document, document);
        return document;
    },
    create: function () { return exports.Document.createFrom({}); },
    _convertNestedObjects: function (parent, actual, fragmentsTracker) {
        if (fragmentsTracker === void 0) { fragmentsTracker = new Set(); }
        var next;
        var idOrSlug;
        var fragment;
        var keys = Object.keys(actual);
        for (var _i = 0, keys_1 = keys; _i < keys_1.length; _i++) {
            var key = keys_1[_i];
            next = actual[key];
            if (Array.isArray(next)) {
                exports.Document._convertNestedObjects(parent, next, fragmentsTracker);
                continue;
            }
            if (!Utils_1.isPlainObject(next))
                continue;
            if (Pointer_1.Pointer.is(next)) {
                if (parent.hasFragment(next.id) && !fragmentsTracker.has(next.id)) {
                    fragmentsTracker.add(next.id);
                    exports.Document._convertNestedObjects(parent, next, fragmentsTracker);
                }
                continue;
            }
            idOrSlug = ("id" in next) ? next.id : (("slug" in next) ? URI_1.URI.hasFragment(next.slug) ? next.slug : "#" + next.slug : "");
            if (!!idOrSlug && !parent.inScope(idOrSlug))
                continue;
            var parentFragment = parent.getFragment(idOrSlug);
            if (!parentFragment) {
                fragment = parent.createFragment(next, idOrSlug);
                exports.Document._convertNestedObjects(parent, fragment, fragmentsTracker);
            }
            else if (parentFragment !== next) {
                Object.assign(parentFragment, next);
                fragment = actual[key] = parentFragment;
                exports.Document._convertNestedObjects(parent, fragment, fragmentsTracker);
            }
        }
    },
};
function hasPointer(id) {
    if (id === this.id)
        return true;
    if (!this.inScope(id))
        return false;
    return this.hasFragment(id);
}
function getPointer(id) {
    if (!this.inScope(id))
        return null;
    if (id === this.id)
        return this;
    return this.hasFragment(id) ?
        this.getFragment(id) :
        this.createFragment(id);
}
function inScope(idOrPointer) {
    var id = Utils_1.isString(idOrPointer) ? idOrPointer : idOrPointer.id;
    if (id === this.id)
        return true;
    if (URI_1.URI.isBNodeID(id))
        return true;
    if (URI_1.URI.isFragmentOf(id, this.id))
        return true;
    return id.startsWith("#");
}
function hasFragment(id) {
    if (URI_1.URI.isAbsolute(id)) {
        if (!URI_1.URI.isFragmentOf(id, this.id))
            return false;
        id = URI_1.URI.hasFragment(id) ? URI_1.URI.getFragment(id) : id;
    }
    else if (id.startsWith("#")) {
        id = id.substring(1);
    }
    return this._fragmentsIndex.has(id);
}
function getFragment(id) {
    if (!URI_1.URI.isBNodeID(id))
        return this.getNamedFragment(id);
    return this._fragmentsIndex.get(id) || null;
}
function getNamedFragment(id) {
    if (URI_1.URI.isBNodeID(id))
        throw new IllegalArgumentError_1.IllegalArgumentError("Named fragments can't have a id that starts with '_:'.");
    if (URI_1.URI.isAbsolute(id)) {
        if (!URI_1.URI.isFragmentOf(id, this.id))
            throw new IllegalArgumentError_1.IllegalArgumentError("The id is out of scope.");
        id = URI_1.URI.hasFragment(id) ? URI_1.URI.getFragment(id) : id;
    }
    else if (id.startsWith("#")) {
        id = id.substring(1);
    }
    return this._fragmentsIndex.get(id) || null;
}
function getFragments() {
    return Array.from(this._fragmentsIndex.values());
}
function createFragment(slugOrObject, slug) {
    slug = Utils_1.isString(slugOrObject) ? slugOrObject : slug;
    var object = !Utils_1.isString(slugOrObject) && !!slugOrObject ? slugOrObject : {};
    if (slug) {
        if (!URI_1.URI.isBNodeID(slug))
            return this.createNamedFragment(object, slug);
        if (this._fragmentsIndex.has(slug))
            throw new IDAlreadyInUseError_1.IDAlreadyInUseError("The slug provided is already being used by a fragment.");
    }
    var fragment = BlankNode_1.BlankNode.createFrom(object, this, slug);
    this._fragmentsIndex.set(fragment.id, fragment);
    exports.Document._convertNestedObjects(this, fragment);
    return fragment;
}
function createNamedFragment(slugOrObject, slug) {
    slug = Utils_1.isString(slugOrObject) ? slugOrObject : slug;
    var object = !Utils_1.isString(slugOrObject) && !!slugOrObject ? slugOrObject : {};
    if (URI_1.URI.isBNodeID(slug))
        throw new IllegalArgumentError_1.IllegalArgumentError("Named fragments can't have a slug that starts with '_:'.");
    if (URI_1.URI.isAbsolute(slug)) {
        if (!URI_1.URI.isFragmentOf(slug, this.id))
            throw new IllegalArgumentError_1.IllegalArgumentError("The slug is out of scope.");
        slug = URI_1.URI.hasFragment(slug) ? URI_1.URI.getFragment(slug) : slug;
    }
    else if (slug.startsWith("#"))
        slug = slug.substring(1);
    if (this._fragmentsIndex.has(slug))
        throw new IDAlreadyInUseError_1.IDAlreadyInUseError("The slug provided is already being used by a fragment.");
    var fragment = NamedFragment_1.NamedFragment.createFrom(object, this, slug);
    this._fragmentsIndex.set(slug, fragment);
    exports.Document._convertNestedObjects(this, fragment);
    return fragment;
}
function removeFragment(fragmentOrSlug) {
    var id = Utils_1.isString(fragmentOrSlug) ? fragmentOrSlug : fragmentOrSlug.id;
    if (URI_1.URI.isAbsolute(id)) {
        if (!URI_1.URI.isFragmentOf(id, this.id))
            return;
        id = URI_1.URI.hasFragment(id) ? URI_1.URI.getFragment(id) : id;
    }
    else if (id.startsWith("#")) {
        id = id.substring(1);
    }
    this._fragmentsIndex.delete(id);
}
function removeNamedFragment(fragmentOrSlug) {
    var id = Utils_1.isString(fragmentOrSlug) ? fragmentOrSlug : fragmentOrSlug.id;
    if (URI_1.URI.isBNodeID(id))
        throw new IllegalArgumentError_1.IllegalArgumentError("You can only remove NamedFragments.");
    this._removeFragment(id);
}
function toJSON(keyOrObjectSchemaResolver, jsonldConverter) {
    if (jsonldConverter === void 0) { jsonldConverter = new Converter_1.JSONLDConverter(); }
    var objectSchemaResolver = Utils_1.isObject(keyOrObjectSchemaResolver) ?
        keyOrObjectSchemaResolver : null;
    var generalSchema = objectSchemaResolver ?
        objectSchemaResolver.getGeneralSchema() : new ObjectSchema_1.DigestedObjectSchema();
    var resources = [this].concat(this.getFragments());
    var expandedResources = resources.map(function (resource) {
        var resourceSchema = objectSchemaResolver ? objectSchemaResolver.getSchemaFor(resource) : new ObjectSchema_1.DigestedObjectSchema();
        return jsonldConverter.expand(resource, generalSchema, resourceSchema);
    });
    return {
        "@id": this.id,
        "@graph": expandedResources,
    };
}
function normalize() {
    var _this = this;
    var currentFragments = this.getFragments()
        .filter(function (fragment) { return URI_1.URI.isBNodeID(fragment.id); });
    var usedFragmentsIDs = new Set();
    exports.Document._convertNestedObjects(this, this, usedFragmentsIDs);
    currentFragments.forEach(function (fragment) {
        if (usedFragmentsIDs.has(fragment.id))
            return;
        _this._fragmentsIndex.delete(fragment.id);
    });
}

//# sourceMappingURL=Document.js.map
