"use strict";
var Pointer = require("./Pointer");
var Utils = require("./Utils");
function addType(type) {
    this.types.push(type);
}
function hasType(type) {
    return this.types.indexOf(type) !== -1;
}
function removeType(type) {
    var index = this.types.indexOf(type);
    if (index !== -1)
        this.types.splice(index, 1);
}
var Factory = (function () {
    function Factory() {
    }
    Factory.hasClassProperties = function (object) {
        return (Utils.hasPropertyDefined(object, "types")
            && Utils.hasFunction(object, "addType")
            && Utils.hasFunction(object, "hasType")
            && Utils.hasFunction(object, "removeType"));
    };
    Factory.is = function (object) {
        return Pointer.Factory.is(object)
            && Factory.hasClassProperties(object);
    };
    Factory.create = function (id, types) {
        if (id === void 0) { id = null; }
        if (types === void 0) { types = null; }
        return Factory.createFrom({}, id, types);
    };
    Factory.createFrom = function (object, id, types) {
        if (id === void 0) { id = null; }
        if (types === void 0) { types = null; }
        id = !!id ? id : (object.id || "");
        types = !!types ? types : (object.types || []);
        var resource = Factory.decorate(object);
        resource.id = id;
        resource.types = types;
        return resource;
    };
    Factory.decorate = function (object) {
        Pointer.Factory.decorate(object);
        if (Factory.hasClassProperties(object))
            return object;
        Object.defineProperties(object, {
            "types": {
                writable: true,
                enumerable: false,
                configurable: true,
                value: [],
            },
            "addType": {
                writable: true,
                enumerable: false,
                configurable: true,
                value: addType,
            },
            "hasType": {
                writable: true,
                enumerable: false,
                configurable: true,
                value: hasType,
            },
            "removeType": {
                writable: true,
                enumerable: false,
                configurable: true,
                value: removeType,
            },
        });
        return object;
    };
    return Factory;
}());
exports.Factory = Factory;
var Util = (function () {
    function Util() {
    }
    Util.hasType = function (resource, type) {
        return Util.getTypes(resource).indexOf(type) !== -1;
    };
    Util.getTypes = function (resource) {
        return resource.types || [];
    };
    return Util;
}());
exports.Util = Util;

//# sourceMappingURL=Resource.js.map
