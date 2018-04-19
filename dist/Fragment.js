"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var TransientFragment_1 = require("./TransientFragment");
var ObjectSchema_1 = require("./ObjectSchema");
var PersistedResource_1 = require("./PersistedResource");
var URI_1 = require("./RDF/URI");
var Resource_1 = require("./Resource");
var Utils_1 = require("./Utils");
function resolveURI(fragment, uri) {
    if (URI_1.URI.isAbsolute(uri))
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
exports.Fragment = {
    isDecorated: function (object) {
        return Utils_1.isObject(object) &&
            object["addType"] === addTypeInPersistedFragment &&
            object["hasType"] === hasTypeInPersistedFragment &&
            object["removeType"] === removeTypeInPersistedFragment;
    },
    is: function (object) {
        return TransientFragment_1.TransientFragment.is(object) &&
            PersistedResource_1.PersistedResource.isDecorated(object) &&
            exports.Fragment.isDecorated(object);
    },
    decorate: function (object) {
        if (exports.Fragment.isDecorated(object))
            return object;
        TransientFragment_1.TransientFragment.decorate(object);
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
        return exports.Fragment.createFrom({}, document, id);
    },
    createFrom: function (object, document, id) {
        var fragment = exports.Fragment.decorate(object);
        fragment._document = document;
        if (id)
            fragment.id = id;
        return fragment;
    },
};

//# sourceMappingURL=Fragment.js.map
