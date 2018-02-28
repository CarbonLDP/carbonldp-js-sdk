"use strict";
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
}
Object.defineProperty(exports, "__esModule", { value: true });
var Fragment_1 = require("./Fragment");
var ObjectSchema_1 = require("./ObjectSchema");
var PersistedResource_1 = require("./PersistedResource");
var RDF = __importStar(require("./RDF"));
var Resource_1 = require("./Resource");
var Utils_1 = require("./Utils");
function resolveURI(fragment, uri) {
    if (RDF.URI.Util.isAbsolute(uri))
        return uri;
    var schema = fragment._document._documents.getGeneralSchema();
    return ObjectSchema_1.ObjectSchemaUtils.resolveURI(uri, schema, { vocab: true });
}
function addTypeInPersistedFragment(type) {
    type = resolveURI(this, type);
    return Resource_1.addTypeInResource.call(this, type);
}
function hasTypeInPersistedFragment(type) {
    type = resolveURI(this, type);
    return Resource_1.hasTypeInResource.call(this, type);
}
function removeTypeInPersistedFragment(type) {
    type = resolveURI(this, type);
    return Resource_1.removeTypeInResource.call(this, type);
}
exports.PersistedFragment = {
    isDecorated: function (object) {
        return Utils_1.isObject(object) &&
            object["addType"] === addTypeInPersistedFragment &&
            object["hasType"] === hasTypeInPersistedFragment &&
            object["removeType"] === removeTypeInPersistedFragment;
    },
    is: function (object) {
        return Fragment_1.Fragment.is(object) &&
            PersistedResource_1.PersistedResource.isDecorated(object) &&
            exports.PersistedFragment.isDecorated(object);
    },
    decorate: function (object) {
        if (exports.PersistedFragment.isDecorated(object))
            return object;
        Fragment_1.Fragment.decorate(object);
        PersistedResource_1.PersistedResource.decorate(object);
        var fragment = object;
        Object.defineProperties(object, {
            "addType": {
                writable: false,
                enumerable: false,
                configurable: true,
                value: addTypeInPersistedFragment,
            },
            "hasType": {
                writable: false,
                enumerable: false,
                configurable: true,
                value: hasTypeInPersistedFragment,
            },
            "removeType": {
                writable: false,
                enumerable: false,
                configurable: true,
                value: removeTypeInPersistedFragment,
            },
        });
        return fragment;
    },
    create: function (document, id) {
        return exports.PersistedFragment.createFrom({}, document, id);
    },
    createFrom: function (object, document, id) {
        var fragment = exports.PersistedFragment.decorate(object);
        fragment._document = document;
        if (id)
            fragment.id = id;
        return fragment;
    },
};
exports.default = exports.PersistedFragment;

//# sourceMappingURL=PersistedFragment.js.map
