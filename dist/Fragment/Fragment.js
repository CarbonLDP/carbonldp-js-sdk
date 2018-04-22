"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var ObjectSchema_1 = require("../ObjectSchema");
var RDF_1 = require("../RDF");
var Resource_1 = require("../Resource");
var Utils_1 = require("../Utils");
var TransientFragment_1 = require("./TransientFragment");
function resolveURI(fragment, uri) {
    if (RDF_1.URI.isAbsolute(uri))
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
    is: function (value) {
        return TransientFragment_1.TransientFragment.is(value) &&
            Resource_1.Resource.isDecorated(value) &&
            exports.Fragment.isDecorated(value);
    },
    decorate: function (object) {
        if (exports.Fragment.isDecorated(object))
            return object;
        TransientFragment_1.TransientFragment.decorate(object);
        Resource_1.Resource.decorate(object);
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
    create: TransientFragment_1.TransientFragment.create,
    createFrom: TransientFragment_1.TransientFragment.createFrom,
};

//# sourceMappingURL=Fragment.js.map
