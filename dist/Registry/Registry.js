"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var IDAlreadyInUseError_1 = require("../Errors/IDAlreadyInUseError");
var IllegalArgumentError_1 = require("../Errors/IllegalArgumentError");
var ModelDecorator_1 = require("../Model/ModelDecorator");
var Pointer_1 = require("../Pointer/Pointer");
var Utils_1 = require("../Utils");
exports.Registry = {
    PROTOTYPE: {
        $registry: void 0,
        get __modelDecorator() {
            throw new IllegalArgumentError_1.IllegalArgumentError("Property \"__modelDecorator\" is required");
        },
        get __resourcesMap() { return new Map(); },
        inScope: function (idOrPointer, local) {
            try {
                var id = Pointer_1.Pointer.getID(idOrPointer);
                this._getLocalID(id);
                return true;
            }
            catch (_a) {
                if (local === true || !this.$registry)
                    return false;
                return this.$registry.inScope(idOrPointer);
            }
        },
        hasPointer: function (id, local) {
            if (this.inScope(id, true)) {
                var localID = this._getLocalID(id);
                if (this.__resourcesMap.has(localID))
                    return true;
            }
            if (local === true || !this.$registry)
                return false;
            return this.$registry.hasPointer(id);
        },
        getPointer: function (id, local) {
            if (!this.inScope(id, true)) {
                if (local === true || !this.$registry)
                    throw new IllegalArgumentError_1.IllegalArgumentError("\"" + id + "\" is out of scope.");
                return this.$registry.getPointer(id);
            }
            var localID = this._getLocalID(id);
            if (this.__resourcesMap.has(localID))
                return this.__resourcesMap.get(localID);
            if (local !== true && this.$registry && this.$registry.hasPointer(id))
                return this.$registry.getPointer(id);
            return this._addPointer({ $id: id });
        },
        getPointers: function (local) {
            var pointers = Array.from(this.__resourcesMap.values());
            if (local === true || !this.$registry)
                return pointers;
            return this.$registry.getPointers().concat(pointers);
        },
        removePointer: function (idOrPointer, local) {
            var id = Pointer_1.Pointer.getID(idOrPointer);
            if (this.inScope(id, true)) {
                var localID = this._getLocalID(id);
                if (this.__resourcesMap.delete(localID))
                    return true;
            }
            if (local === true || !this.$registry)
                return false;
            return this.$registry.removePointer(idOrPointer);
        },
        _addPointer: function (pointer) {
            if (!pointer.$id)
                throw new IllegalArgumentError_1.IllegalArgumentError("The pointer $id cannot be empty.");
            var localID = this._getLocalID(pointer.$id);
            if (this.__resourcesMap.has(localID))
                throw new IDAlreadyInUseError_1.IDAlreadyInUseError("\"" + pointer.$id + "\" is already being used.");
            var resource = this.__modelDecorator
                .decorate(Object.assign(pointer, {
                $registry: this,
            }));
            this.__resourcesMap.set(localID, resource);
            return resource;
        },
        _getLocalID: function (id) {
            throw new IllegalArgumentError_1.IllegalArgumentError("\"" + id + "\" is out of scope.");
        },
    },
    isDecorated: function (object) {
        return Utils_1.isObject(object)
            && ModelDecorator_1.ModelDecorator
                .hasPropertiesFrom(exports.Registry.PROTOTYPE, object);
    },
    decorate: function (object) {
        if (exports.Registry.isDecorated(object))
            return object;
        return ModelDecorator_1.ModelDecorator
            .definePropertiesFrom(exports.Registry.PROTOTYPE, object);
    },
    create: function (data) {
        var copy = Object.assign({}, data);
        return exports.Registry.createFrom(copy);
    },
    createFrom: function (object) {
        return exports.Registry.decorate(object);
    },
};

//# sourceMappingURL=Registry.js.map
