"use strict";
var BlankNode = require("./BlankNode");
var Errors = require("./Errors");
var Converter_1 = require("./JSONLD/Converter");
var NamedFragment = require("./NamedFragment");
var NS = require("./NS");
var ObjectSchema = require("./ObjectSchema");
var Pointer = require("./Pointer");
var RDF = require("./RDF");
var Resource = require("./Resource");
var Utils = require("./Utils");
exports.RDF_CLASS = NS.C.Class.Document;
exports.SCHEMA = {
    "contains": {
        "@id": NS.LDP.Predicate.contains,
        "@container": "@set",
        "@type": "@id",
    },
    "members": {
        "@id": NS.LDP.Predicate.member,
        "@container": "@set",
        "@type": "@id",
    },
    "membershipResource": {
        "@id": NS.LDP.Predicate.membershipResource,
        "@type": "@id",
    },
    "isMemberOfRelation": {
        "@id": NS.LDP.Predicate.isMemberOfRelation,
        "@type": "@id",
    },
    "hasMemberRelation": {
        "@id": NS.LDP.Predicate.hasMemberRelation,
        "@type": "@id",
    },
    "insertedContentRelation": {
        "@id": NS.LDP.Predicate.insertedContentRelation,
        "@type": "@id",
    },
    "created": {
        "@id": NS.C.Predicate.created,
        "@type": NS.XSD.DataType.dateTime,
    },
    "modified": {
        "@id": NS.C.Predicate.modified,
        "@type": NS.XSD.DataType.dateTime,
    },
    "defaultInteractionModel": {
        "@id": NS.C.Predicate.defaultInteractionModel,
        "@type": "@id",
    },
    "accessPoints": {
        "@id": NS.C.Predicate.accessPoint,
        "@type": "@id",
        "@container": "@set",
    },
};
function hasPointer(id) {
    var document = this;
    if (id === document.id)
        return true;
    if (!document.inScope(id))
        return false;
    return document.hasFragment(id);
}
function getPointer(id) {
    var document = this;
    if (!document.inScope(id))
        return null;
    if (id === document.id)
        return document;
    var fragment = document.getFragment(id);
    fragment = !fragment ? document.createFragment(id) : fragment;
    return fragment;
}
function inScope(idOrPointer) {
    var document = this;
    var id = Pointer.Factory.is(idOrPointer) ? idOrPointer.id : idOrPointer;
    if (id === document.id)
        return true;
    if (RDF.URI.Util.isBNodeID(id))
        return true;
    if (RDF.URI.Util.isFragmentOf(id, document.id))
        return true;
    return RDF.URI.Util.isFragmentOf(id, "");
}
function hasFragment(id) {
    var document = this;
    if (RDF.URI.Util.isAbsolute(id)) {
        if (!RDF.URI.Util.isFragmentOf(id, document.id))
            return false;
        id = RDF.URI.Util.hasFragment(id) ? RDF.URI.Util.getFragment(id) : id;
    }
    else if (Utils.S.startsWith(id, "#"))
        id = id.substring(1);
    return document._fragmentsIndex.has(id);
}
function getFragment(id) {
    var document = this;
    if (!RDF.URI.Util.isBNodeID(id))
        return document.getNamedFragment(id);
    return document._fragmentsIndex.get(id) || null;
}
function getNamedFragment(id) {
    var document = this;
    if (RDF.URI.Util.isBNodeID(id))
        throw new Errors.IllegalArgumentError("Named fragments can't have a id that starts with '_:'.");
    if (RDF.URI.Util.isAbsolute(id)) {
        if (!RDF.URI.Util.isFragmentOf(id, document.id))
            throw new Errors.IllegalArgumentError("The id is out of scope.");
        id = RDF.URI.Util.hasFragment(id) ? RDF.URI.Util.getFragment(id) : id;
    }
    else if (Utils.S.startsWith(id, "#"))
        id = id.substring(1);
    return document._fragmentsIndex.get(id) || null;
}
function getFragments() {
    var document = this;
    return Utils.A.from(document._fragmentsIndex.values());
}
function createFragment(slugOrObject, slug) {
    var document = this;
    slug = Utils.isString(slugOrObject) ? slugOrObject : slug;
    var object = !Utils.isString(slugOrObject) && !!slugOrObject ? slugOrObject : {};
    if (slug) {
        if (!RDF.URI.Util.isBNodeID(slug))
            return document.createNamedFragment(object, slug);
        if (this._fragmentsIndex.has(slug))
            throw new Errors.IDAlreadyInUseError("The slug provided is already being used by a fragment.");
    }
    var fragment = BlankNode.Factory.createFrom(object, slug, document);
    document._fragmentsIndex.set(fragment.id, fragment);
    convertNestedObjects(document, fragment);
    return fragment;
}
function createNamedFragment(slugOrObject, slug) {
    var document = this;
    slug = Utils.isString(slugOrObject) ? slugOrObject : slug;
    var object = !Utils.isString(slugOrObject) && !!slugOrObject ? slugOrObject : {};
    if (RDF.URI.Util.isBNodeID(slug))
        throw new Errors.IllegalArgumentError("Named fragments can't have a slug that starts with '_:'.");
    if (RDF.URI.Util.isAbsolute(slug)) {
        if (!RDF.URI.Util.isFragmentOf(slug, document.id))
            throw new Errors.IllegalArgumentError("The slug is out of scope.");
        slug = RDF.URI.Util.hasFragment(slug) ? RDF.URI.Util.getFragment(slug) : slug;
    }
    else if (Utils.S.startsWith(slug, "#"))
        slug = slug.substring(1);
    if (document._fragmentsIndex.has(slug))
        throw new Errors.IDAlreadyInUseError("The slug provided is already being used by a fragment.");
    var fragment = NamedFragment.Factory.createFrom(object, slug, document);
    document._fragmentsIndex.set(slug, fragment);
    convertNestedObjects(document, fragment);
    return fragment;
}
function removeFragment(fragmentOrSlug) {
    var document = this;
    var id = Utils.isString(fragmentOrSlug) ? fragmentOrSlug : fragmentOrSlug.id;
    if (RDF.URI.Util.isAbsolute(id)) {
        if (!RDF.URI.Util.isFragmentOf(id, document.id))
            return;
        id = RDF.URI.Util.hasFragment(id) ? RDF.URI.Util.getFragment(id) : id;
    }
    else if (Utils.S.startsWith(id, "#"))
        id = id.substring(1);
    document._fragmentsIndex.delete(id);
}
function removeNamedFragment(fragmentOrSlug) {
    var document = this;
    var id = Utils.isString(fragmentOrSlug) ? fragmentOrSlug : fragmentOrSlug.id;
    if (RDF.URI.Util.isBNodeID(id))
        throw new Errors.IllegalArgumentError("You can only remove NamedFragments.");
    document._removeFragment(id);
}
function toJSON(objectSchemaResolver, jsonldConverter) {
    if (objectSchemaResolver === void 0) { objectSchemaResolver = null; }
    if (jsonldConverter === void 0) { jsonldConverter = null; }
    var generalSchema = objectSchemaResolver ? objectSchemaResolver.getGeneralSchema() : new ObjectSchema.DigestedObjectSchema();
    jsonldConverter = !!jsonldConverter ? jsonldConverter : new Converter_1.default();
    var resources = [];
    resources.push(this);
    resources = resources.concat(this.getFragments());
    var expandedResources = [];
    for (var _i = 0, resources_1 = resources; _i < resources_1.length; _i++) {
        var resource = resources_1[_i];
        var resourceSchema = objectSchemaResolver ? objectSchemaResolver.getSchemaFor(resource) : new ObjectSchema.DigestedObjectSchema();
        expandedResources.push(jsonldConverter.expand(resource, generalSchema, resourceSchema));
    }
    var graph = {
        "@id": this.id,
        "@graph": expandedResources,
    };
    return JSON.stringify(graph);
}
function normalize() {
    var _this = this;
    var currentFragments = this.getFragments().filter(function (fragment) { return RDF.URI.Util.isBNodeID(fragment.id); });
    var usedFragmentsIDs = new Set();
    convertNestedObjects(this, this, usedFragmentsIDs);
    currentFragments.forEach(function (fragment) {
        if (!usedFragmentsIDs.has(fragment.id)) {
            _this._fragmentsIndex.delete(fragment.id);
        }
    });
}
var Factory = (function () {
    function Factory() {
    }
    Factory.hasClassProperties = function (documentResource) {
        return (Utils.isObject(documentResource) &&
            Utils.hasPropertyDefined(documentResource, "_fragmentsIndex") &&
            Utils.hasFunction(documentResource, "_normalize") &&
            Utils.hasFunction(documentResource, "_removeFragment") &&
            Utils.hasFunction(documentResource, "hasFragment") &&
            Utils.hasFunction(documentResource, "getFragment") &&
            Utils.hasFunction(documentResource, "getNamedFragment") &&
            Utils.hasFunction(documentResource, "getFragments") &&
            Utils.hasFunction(documentResource, "createFragment") &&
            Utils.hasFunction(documentResource, "createNamedFragment") &&
            Utils.hasFunction(documentResource, "removeNamedFragment") &&
            Utils.hasFunction(documentResource, "toJSON"));
    };
    Factory.is = function (object) {
        return (Resource.Factory.is(object) &&
            Factory.hasClassProperties(object));
    };
    Factory.create = function () {
        return Factory.createFrom({});
    };
    Factory.createFrom = function (object) {
        if (Factory.is(object))
            throw new Errors.IllegalArgumentError("The object provided is already a Document");
        var resource = object;
        if (!Resource.Factory.is(object))
            resource = Resource.Factory.createFrom(object);
        var document = Factory.decorate(resource);
        convertNestedObjects(document, document);
        return document;
    };
    Factory.decorate = function (object) {
        Resource.Factory.decorate(object);
        if (Factory.hasClassProperties(object))
            return object;
        Object.defineProperties(object, {
            "_fragmentsIndex": {
                writable: false,
                enumerable: false,
                configurable: true,
                value: new Map(),
            },
            "_normalize": {
                writable: false,
                enumerable: false,
                configurable: true,
                value: normalize,
            },
            "_removeFragment": {
                writable: true,
                enumerable: false,
                configurable: true,
                value: removeFragment,
            },
            "hasPointer": {
                writable: true,
                enumerable: false,
                configurable: true,
                value: hasPointer,
            },
            "getPointer": {
                writable: true,
                enumerable: false,
                configurable: true,
                value: getPointer,
            },
            "inScope": {
                writable: true,
                enumerable: false,
                configurable: true,
                value: inScope,
            },
            "hasFragment": {
                writable: true,
                enumerable: false,
                configurable: true,
                value: hasFragment,
            },
            "getFragment": {
                writable: true,
                enumerable: false,
                configurable: true,
                value: getFragment,
            },
            "getNamedFragment": {
                writable: true,
                enumerable: false,
                configurable: true,
                value: getNamedFragment,
            },
            "getFragments": {
                writable: true,
                enumerable: false,
                configurable: true,
                value: getFragments,
            },
            "createFragment": {
                writable: true,
                enumerable: false,
                configurable: true,
                value: createFragment,
            },
            "createNamedFragment": {
                writable: true,
                enumerable: false,
                configurable: true,
                value: createNamedFragment,
            },
            "removeNamedFragment": {
                writable: true,
                enumerable: false,
                configurable: true,
                value: removeNamedFragment,
            },
            "toJSON": {
                writable: true,
                enumerable: false,
                configurable: true,
                value: toJSON,
            },
        });
        return object;
    };
    return Factory;
}());
exports.Factory = Factory;
function convertNestedObjects(parent, actual, fragmentsTracker) {
    if (fragmentsTracker === void 0) { fragmentsTracker = new Set(); }
    var next;
    var idOrSlug;
    var fragment;
    var keys = Object.keys(actual);
    for (var _i = 0, keys_1 = keys; _i < keys_1.length; _i++) {
        var key = keys_1[_i];
        next = actual[key];
        if (Utils.isArray(next)) {
            convertNestedObjects(parent, next, fragmentsTracker);
            continue;
        }
        if (!Utils.isPlainObject(next))
            continue;
        if (Pointer.Factory.is(next)) {
            if (parent.hasFragment(next.id) && !fragmentsTracker.has(next.id)) {
                fragmentsTracker.add(next.id);
                convertNestedObjects(parent, next, fragmentsTracker);
            }
            continue;
        }
        idOrSlug = ("id" in next) ? next.id : (("slug" in next) ? "#" + next.slug : "");
        if (!!idOrSlug && !parent.inScope(idOrSlug))
            continue;
        var parentFragment = parent.getFragment(idOrSlug);
        if (!parentFragment) {
            fragment = parent.createFragment(next, idOrSlug);
            convertNestedObjects(parent, fragment, fragmentsTracker);
        }
        else if (parentFragment !== next) {
            Object.assign(parentFragment, next);
            fragment = actual[key] = parentFragment;
            convertNestedObjects(parent, fragment, fragmentsTracker);
        }
    }
}

//# sourceMappingURL=Document.js.map
