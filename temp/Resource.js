"use strict";
var Pointer = require("./Pointer");
var Utils = require("./Utils");
var Factory = (function () {
    function Factory() {
    }
    Factory.hasClassProperties = function (resource) {
        return (Utils.hasPropertyDefined(resource, "types"));
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
        });
        return object;
    };
    return Factory;
}());
exports.Factory = Factory;
