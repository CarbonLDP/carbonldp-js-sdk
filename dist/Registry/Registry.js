"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var IDAlreadyInUseError_1 = require("../Errors/IDAlreadyInUseError");
var IllegalArgumentError_1 = require("../Errors/IllegalArgumentError");
var BiModelDecorator_1 = require("../Model/BiModelDecorator");
var Pointer_1 = require("../Pointer/Pointer");
function __getResourcesMaps(registry) {
    return "$id" in registry ? registry.$__resourcesMap : registry.__resourcesMap;
}
function __getParentResource(registry) {
    return "$id" in registry ? registry.$registry : registry.registry;
}
function __getDecorator(registry) {
    return "$id" in registry ?
        registry.$__modelDecorator : registry.__modelDecorator;
}
function __getLocalID(registry, id) {
    return "$id" in registry ?
        registry.$_getLocalID(id) : registry._getLocalID(id);
}
function __addPointer(registry, pointer) {
    return "$id" in registry ?
        registry.$_addPointer(pointer) : registry._addPointer(pointer);
}
function __inScope(idOrPointer, local) {
    if (!this)
        return false;
    try {
        var id = Pointer_1.Pointer.getID(idOrPointer);
        __getLocalID(this, id);
        return true;
    }
    catch (_a) {
        if (local === true)
            return false;
        var parentRegistry = __getParentResource(this);
        return __inScope.call(parentRegistry, idOrPointer);
    }
}
function __hasPointer(id, local) {
    if (!this)
        return false;
    if (__inScope.call(this, id, true)) {
        var localID = __getLocalID(this, id);
        var resourcesMap = __getResourcesMaps(this);
        if (resourcesMap.has(localID))
            return true;
    }
    if (local === true)
        return false;
    var parentRegistry = __getParentResource(this);
    return __hasPointer.call(parentRegistry, id);
}
function __getPointer(id, local) {
    var parentRegistry = __getParentResource(this);
    if (!__inScope.call(this, id, true)) {
        if (local === true || !parentRegistry)
            throw new IllegalArgumentError_1.IllegalArgumentError("\"" + id + "\" is out of scope.");
        return __getPointer.call(parentRegistry, id);
    }
    var localID = __getLocalID(this, id);
    var resourcesMap = __getResourcesMaps(this);
    if (resourcesMap.has(localID))
        return resourcesMap.get(localID);
    if (local !== true && __hasPointer.call(parentRegistry, id))
        return __getPointer.call(parentRegistry, id);
    return __addPointer(this, { $id: id });
}
function __getPointers(local) {
    var resourcesMap = __getResourcesMaps(this);
    var pointers = Array.from(resourcesMap.values());
    var parentRegistry = __getParentResource(this);
    if (local === true || !parentRegistry)
        return pointers;
    return __getPointers.call(parentRegistry).concat(pointers);
}
function __removePointer(idOrPointer, local) {
    if (!this)
        return false;
    var id = Pointer_1.Pointer.getID(idOrPointer);
    if (__inScope.call(this, id, true)) {
        var localID = __getLocalID(this, id);
        var resourcesMap = __getResourcesMaps(this);
        if (resourcesMap.delete(localID))
            return true;
    }
    if (local === true)
        return false;
    var parentRegistry = __getParentResource(this);
    return __removePointer.call(parentRegistry, idOrPointer);
}
function _getPointer(registry, id, local) {
    return "$id" in registry ?
        registry.$getPointer(id, local) :
        registry.getPointer(id, local);
}
exports._getPointer = _getPointer;
exports.Registry = {
    PROTOTYPE: {
        registry: void 0,
        get __modelDecorator() {
            throw new IllegalArgumentError_1.IllegalArgumentError("Property \"__modelDecorator\" is required");
        },
        get __resourcesMap() { return new Map(); },
        inScope: __inScope,
        hasPointer: __hasPointer,
        getPointer: __getPointer,
        getPointers: __getPointers,
        removePointer: __removePointer,
        _addPointer: function (pointer) {
            if (!pointer.$id)
                throw new IllegalArgumentError_1.IllegalArgumentError("The pointer $id cannot be empty.");
            var localID = __getLocalID(this, pointer.$id);
            var resourcesMap = __getResourcesMaps(this);
            if (resourcesMap.has(localID))
                throw new IDAlreadyInUseError_1.IDAlreadyInUseError("\"" + pointer.$id + "\" is already being used.");
            var resource = __getDecorator(this)
                .decorate(Object.assign(pointer, {
                $registry: this,
            }));
            resourcesMap.set(localID, resource);
            return resource;
        },
        _getLocalID: function (id) {
            return id;
        },
    },
    isDecorated: function (object) {
        return BiModelDecorator_1.BiModelDecorator
            .hasPropertiesFrom(exports.Registry.PROTOTYPE, object);
    },
    decorate: function (object) {
        if (exports.Registry.isDecorated(object))
            return object;
        return BiModelDecorator_1.BiModelDecorator
            .definePropertiesFrom(exports.Registry.PROTOTYPE, object);
    },
};

//# sourceMappingURL=Registry.js.map
