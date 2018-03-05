"use strict";
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
}
Object.defineProperty(exports, "__esModule", { value: true });
var BlankNode_1 = require("../BlankNode");
var Errors = __importStar(require("../Errors"));
var Converter_1 = require("../JSONLD/Converter");
var NamedFragment_1 = require("../NamedFragment");
var ObjectSchema = __importStar(require("../ObjectSchema"));
var Pointer_1 = require("../Pointer");
var URI_1 = require("../RDF/URI");
var Utils = __importStar(require("../Utils"));
function hasPointer(id) {
    if (id === this.id)
        return true;
    if (!this.inScope(id))
        return false;
    return this.hasFragment(id);
}
exports.hasPointer = hasPointer;
function getPointer(id) {
    if (!this.inScope(id))
        return null;
    if (id === this.id)
        return this;
    return this.hasFragment(id) ?
        this.getFragment(id) :
        this.createFragment(id);
}
exports.getPointer = getPointer;
function inScope(idOrPointer) {
    var id = Utils.isObject(idOrPointer) ? idOrPointer.id : idOrPointer;
    if (id === this.id)
        return true;
    if (URI_1.URI.isBNodeID(id))
        return true;
    if (URI_1.URI.isFragmentOf(id, this.id))
        return true;
    return id.startsWith("#");
}
exports.inScope = inScope;
function hasFragment(id) {
    if (URI_1.URI.isAbsolute(id)) {
        if (!URI_1.URI.isFragmentOf(id, this.id))
            return false;
        id = URI_1.URI.hasFragment(id) ? URI_1.URI.getFragment(id) : id;
    }
    else if (Utils.StringUtils.startsWith(id, "#")) {
        id = id.substring(1);
    }
    return this._fragmentsIndex.has(id);
}
exports.hasFragment = hasFragment;
function getFragment(id) {
    if (!URI_1.URI.isBNodeID(id))
        return this.getNamedFragment(id);
    return this._fragmentsIndex.get(id) || null;
}
exports.getFragment = getFragment;
function getNamedFragment(id) {
    if (URI_1.URI.isBNodeID(id))
        throw new Errors.IllegalArgumentError("Named fragments can't have a id that starts with '_:'.");
    if (URI_1.URI.isAbsolute(id)) {
        if (!URI_1.URI.isFragmentOf(id, this.id))
            throw new Errors.IllegalArgumentError("The id is out of scope.");
        id = URI_1.URI.hasFragment(id) ? URI_1.URI.getFragment(id) : id;
    }
    else if (Utils.StringUtils.startsWith(id, "#")) {
        id = id.substring(1);
    }
    return this._fragmentsIndex.get(id) || null;
}
exports.getNamedFragment = getNamedFragment;
function getFragments() {
    return Utils.ArrayUtils.from(this._fragmentsIndex.values());
}
exports.getFragments = getFragments;
function createFragment(slugOrObject, slug) {
    slug = Utils.isString(slugOrObject) ? slugOrObject : slug;
    var object = !Utils.isString(slugOrObject) && !!slugOrObject ? slugOrObject : {};
    if (slug) {
        if (!URI_1.URI.isBNodeID(slug))
            return this.createNamedFragment(object, slug);
        if (this._fragmentsIndex.has(slug))
            throw new Errors.IDAlreadyInUseError("The slug provided is already being used by a fragment.");
    }
    var fragment = BlankNode_1.BlankNode.createFrom(object, this, slug);
    this._fragmentsIndex.set(fragment.id, fragment);
    exports.convertNestedObjects(this, fragment);
    return fragment;
}
exports.createFragment = createFragment;
function createNamedFragment(slugOrObject, slug) {
    slug = Utils.isString(slugOrObject) ? slugOrObject : slug;
    var object = !Utils.isString(slugOrObject) && !!slugOrObject ? slugOrObject : {};
    if (URI_1.URI.isBNodeID(slug))
        throw new Errors.IllegalArgumentError("Named fragments can't have a slug that starts with '_:'.");
    if (URI_1.URI.isAbsolute(slug)) {
        if (!URI_1.URI.isFragmentOf(slug, this.id))
            throw new Errors.IllegalArgumentError("The slug is out of scope.");
        slug = URI_1.URI.hasFragment(slug) ? URI_1.URI.getFragment(slug) : slug;
    }
    else if (Utils.StringUtils.startsWith(slug, "#"))
        slug = slug.substring(1);
    if (this._fragmentsIndex.has(slug))
        throw new Errors.IDAlreadyInUseError("The slug provided is already being used by a fragment.");
    var fragment = NamedFragment_1.NamedFragment.createFrom(object, this, slug);
    this._fragmentsIndex.set(slug, fragment);
    exports.convertNestedObjects(this, fragment);
    return fragment;
}
exports.createNamedFragment = createNamedFragment;
function removeFragment(fragmentOrSlug) {
    var id = Utils.isString(fragmentOrSlug) ? fragmentOrSlug : fragmentOrSlug.id;
    if (URI_1.URI.isAbsolute(id)) {
        if (!URI_1.URI.isFragmentOf(id, this.id))
            return;
        id = URI_1.URI.hasFragment(id) ? URI_1.URI.getFragment(id) : id;
    }
    else if (Utils.StringUtils.startsWith(id, "#")) {
        id = id.substring(1);
    }
    this._fragmentsIndex.delete(id);
}
exports.removeFragment = removeFragment;
function removeNamedFragment(fragmentOrSlug) {
    var id = Utils.isString(fragmentOrSlug) ? fragmentOrSlug : fragmentOrSlug.id;
    if (URI_1.URI.isBNodeID(id))
        throw new Errors.IllegalArgumentError("You can only remove NamedFragments.");
    this._removeFragment(id);
}
exports.removeNamedFragment = removeNamedFragment;
function toJSON(keyOrObjectSchemaResolver, jsonldConverter) {
    if (jsonldConverter === void 0) { jsonldConverter = new Converter_1.JSONLDConverter(); }
    var objectSchemaResolver = Utils.isObject(keyOrObjectSchemaResolver) ? keyOrObjectSchemaResolver : null;
    var generalSchema = objectSchemaResolver ?
        objectSchemaResolver.getGeneralSchema() : new ObjectSchema.DigestedObjectSchema();
    var resources = [this].concat(this.getFragments());
    var expandedResources = resources.map(function (resource) {
        var resourceSchema = objectSchemaResolver ? objectSchemaResolver.getSchemaFor(resource) : new ObjectSchema.DigestedObjectSchema();
        return jsonldConverter.expand(resource, generalSchema, resourceSchema);
    });
    return {
        "@id": this.id,
        "@graph": expandedResources,
    };
}
exports.toJSON = toJSON;
function normalize() {
    var _this = this;
    var currentFragments = this.getFragments()
        .filter(function (fragment) { return URI_1.URI.isBNodeID(fragment.id); });
    var usedFragmentsIDs = new Set();
    exports.convertNestedObjects(this, this, usedFragmentsIDs);
    currentFragments.forEach(function (fragment) {
        if (usedFragmentsIDs.has(fragment.id))
            return;
        _this._fragmentsIndex.delete(fragment.id);
    });
}
exports.normalize = normalize;
exports.convertNestedObjects = function (parent, actual, fragmentsTracker) {
    if (fragmentsTracker === void 0) { fragmentsTracker = new Set(); }
    var next;
    var idOrSlug;
    var fragment;
    var keys = Object.keys(actual);
    for (var _i = 0, keys_1 = keys; _i < keys_1.length; _i++) {
        var key = keys_1[_i];
        next = actual[key];
        if (Utils.isArray(next)) {
            exports.convertNestedObjects(parent, next, fragmentsTracker);
            continue;
        }
        if (!Utils.isPlainObject(next))
            continue;
        if (Pointer_1.Pointer.is(next)) {
            if (parent.hasFragment(next.id) && !fragmentsTracker.has(next.id)) {
                fragmentsTracker.add(next.id);
                exports.convertNestedObjects(parent, next, fragmentsTracker);
            }
            continue;
        }
        idOrSlug = ("id" in next) ? next.id : (("slug" in next) ? URI_1.URI.hasFragment(next.slug) ? next.slug : "#" + next.slug : "");
        if (!!idOrSlug && !parent.inScope(idOrSlug))
            continue;
        var parentFragment = parent.getFragment(idOrSlug);
        if (!parentFragment) {
            fragment = parent.createFragment(next, idOrSlug);
            exports.convertNestedObjects(parent, fragment, fragmentsTracker);
        }
        else if (parentFragment !== next) {
            Object.assign(parentFragment, next);
            fragment = actual[key] = parentFragment;
            exports.convertNestedObjects(parent, fragment, fragmentsTracker);
        }
    }
};

//# sourceMappingURL=prototype.js.map
