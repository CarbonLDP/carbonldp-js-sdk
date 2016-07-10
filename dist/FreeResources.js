"use strict";
var Errors = require("./Errors");
var Pointer = require("./Pointer");
var RDF = require("./RDF");
var Resource = require("./Resource");
var Utils = require("./Utils");
function hasPointer(id) {
    var freeResources = this;
    if (!inLocalScope(id)) {
        return freeResources._documents.hasPointer(id);
    }
    return freeResources.hasResource(id);
}
function getPointer(id) {
    var freeResources = this;
    if (!inLocalScope(id)) {
        return freeResources._documents.getPointer(id);
    }
    var resource = freeResources.getResource(id);
    return !resource ? freeResources.createResource(id) : resource;
}
function inLocalScope(id) {
    return RDF.URI.Util.isBNodeID(id);
}
function inScope(idOrPointer) {
    var freeResources = this;
    var id = Pointer.Factory.is(idOrPointer) ? idOrPointer.id : idOrPointer;
    return inLocalScope(id)
        || freeResources._documents.inScope(id);
}
function hasResource(id) {
    var freeResources = this;
    return freeResources._resourcesIndex.has(id);
}
function getResource(id) {
    var freeResources = this;
    return freeResources._resourcesIndex.get(id) || null;
}
function getResources() {
    var freeResources = this;
    return Utils.A.from(freeResources._resourcesIndex.values());
}
function createResource(id) {
    var freeResources = this;
    if (id) {
        if (!inLocalScope(id))
            throw new Errors.IllegalArgumentError("The id \"" + id + "\" is out of scope.");
        if (freeResources._resourcesIndex.has(id))
            throw new Errors.IDAlreadyInUseError("The id \"" + id + "\" is already in use by another resource.");
    }
    else {
        id = RDF.URI.Util.generateBNodeID();
    }
    var resource = Resource.Factory.create(id);
    freeResources._resourcesIndex.set(id, resource);
    return resource;
}
function toJSON() {
    var resources = this.getResources();
    var expandedResources = [];
    for (var _i = 0, resources_1 = resources; _i < resources_1.length; _i++) {
        var resource = resources_1[_i];
        expandedResources.push(this._documents.jsonldConverter.expand(resource, this._documents.getSchemaFor(resource)));
    }
    return JSON.stringify(expandedResources);
}
var Factory = (function () {
    function Factory() {
    }
    Factory.hasClassProperties = function (object) {
        return (Utils.hasPropertyDefined(object, "_documents") &&
            Utils.hasPropertyDefined(object, "_resourcesIndex") &&
            Utils.hasFunction(object, "hasResource") &&
            Utils.hasFunction(object, "getResource") &&
            Utils.hasFunction(object, "getResources") &&
            Utils.hasFunction(object, "createResource") &&
            Utils.hasFunction(object, "hasPointer") &&
            Utils.hasFunction(object, "getPointer") &&
            Utils.hasFunction(object, "inScope") &&
            Utils.hasFunction(object, "toJSON"));
    };
    Factory.create = function (documents) {
        return Factory.createFrom({}, documents);
    };
    Factory.createFrom = function (object, documents) {
        var freeResources = Factory.decorate(object);
        freeResources._documents = documents;
        return freeResources;
    };
    Factory.decorate = function (object) {
        if (Factory.hasClassProperties(object))
            return object;
        Object.defineProperties(object, {
            "_resourcesIndex": {
                writable: false,
                enumerable: false,
                configurable: true,
                value: new Map(),
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
            "hasResource": {
                writable: true,
                enumerable: false,
                configurable: true,
                value: hasResource,
            },
            "getResource": {
                writable: true,
                enumerable: false,
                configurable: true,
                value: getResource,
            },
            "getResources": {
                writable: true,
                enumerable: false,
                configurable: true,
                value: getResources,
            },
            "createResource": {
                writable: true,
                enumerable: false,
                configurable: true,
                value: createResource,
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

//# sourceMappingURL=FreeResources.js.map
