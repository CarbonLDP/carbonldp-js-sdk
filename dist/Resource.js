"use strict";
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
}
Object.defineProperty(exports, "__esModule", { value: true });
var Pointer_1 = require("./Pointer");
var Utils = __importStar(require("./Utils"));
function addTypeInResource(type) {
    this.types.push(type);
}
exports.addTypeInResource = addTypeInResource;
function hasTypeInResource(type) {
    return this.types.indexOf(type) !== -1;
}
exports.hasTypeInResource = hasTypeInResource;
function removeTypeInResource(type) {
    var index = this.types.indexOf(type);
    if (index !== -1)
        this.types.splice(index, 1);
}
exports.removeTypeInResource = removeTypeInResource;
exports.Resource = {
    isDecorated: function (object) {
        return (Utils.hasPropertyDefined(object, "types")
            && Utils.hasFunction(object, "addType")
            && Utils.hasFunction(object, "hasType")
            && Utils.hasFunction(object, "removeType"));
    },
    is: function (object) {
        return Pointer_1.Pointer.is(object)
            && exports.Resource.isDecorated(object);
    },
    create: function (id, types) {
        return exports.Resource.createFrom({}, id, types);
    },
    createFrom: function (object, id, types) {
        var resource = exports.Resource.decorate(object);
        if (id)
            resource.id = id;
        if (types)
            resource.types = types;
        return resource;
    },
    decorate: function (object) {
        var resource = object;
        if (exports.Resource.isDecorated(object))
            return resource;
        Pointer_1.Pointer.decorate(resource);
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
                value: addTypeInResource,
            },
            "hasType": {
                writable: true,
                enumerable: false,
                configurable: true,
                value: hasTypeInResource,
            },
            "removeType": {
                writable: true,
                enumerable: false,
                configurable: true,
                value: removeTypeInResource,
            },
        });
        return resource;
    },
};

//# sourceMappingURL=Resource.js.map
