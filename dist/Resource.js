"use strict";
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
}
Object.defineProperty(exports, "__esModule", { value: true });
var Pointer = __importStar(require("./Pointer"));
var Utils = __importStar(require("./Utils"));
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
        var resource = object;
        resource.id = id || resource.id;
        resource.types = types || resource.types;
        return Factory.decorate(resource);
    };
    Factory.decorate = function (object) {
        var resource = object;
        if (Factory.hasClassProperties(object))
            return resource;
        Pointer.Factory.decorate(resource);
        Object.defineProperties(resource, {
            "types": {
                writable: true,
                enumerable: false,
                configurable: true,
                value: resource.types || [],
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
        return resource;
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
