"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("../core");
var Errors_1 = require("../Errors");
var ObjectSchema_1 = require("../ObjectSchema");
var Pointer_1 = require("../Pointer");
var Utils_1 = require("../Utils");
var PROTOTYPE = {
    get _resourcesMap() { return new Map(); },
    _context: void 0,
    _registry: void 0,
    inScope: function (idOrPointer) {
        try {
            var id = Pointer_1.Pointer.getID(idOrPointer);
            return this._getLocalID(id) !== null;
        }
        catch (_a) {
            return false;
        }
    },
    hasPointer: function (id, local) {
        if (!this.inScope(id)) {
            if (local === true || !this._registry)
                return false;
            return this._registry.hasPointer(id);
        }
        var localID = this._getLocalID(id);
        return this._resourcesMap.has(localID);
    },
    getPointer: function (id, local) {
        if (!this.inScope(id)) {
            if (local === true || !this._registry)
                throw new Errors_1.IllegalArgumentError("\"" + id + "\" is outside scope.");
            return this._registry.getPointer(id);
        }
        var localID = this._getLocalID(id);
        if (this._resourcesMap.has(localID))
            return this._resourcesMap.get(localID);
        return this._register({ id: id });
    },
    getPointers: function (local) {
        var pointers = Array.from(this._resourcesMap.values());
        if (local === true || !this._registry)
            return pointers;
        return this._registry.getPointers().concat(pointers);
    },
    removePointer: function (idOrPointer, local) {
        var id = Pointer_1.Pointer.getID(idOrPointer);
        if (!this.inScope(id)) {
            if (local === true || !this._registry)
                return false;
            return this._registry.removePointer(idOrPointer);
        }
        var localID = this._getLocalID(id);
        return this._resourcesMap.delete(localID);
    },
    _getLocalID: function (id) {
        if (!this._context)
            return id;
        return ObjectSchema_1.ObjectSchemaUtils.resolveURI(id, this._context.getObjectSchema());
    },
    _register: function (base) {
        if (!base.id)
            throw new Errors_1.IllegalArgumentError("The resource ID is required.");
        var localID = this._getLocalID(base.id);
        if (localID === null)
            throw new Errors_1.IllegalArgumentError("\"" + base.id + "\" is outside scope.");
        if (this._resourcesMap.has(localID))
            throw new Errors_1.IDAlreadyInUseError("\"" + base.id + "\" is already being used.");
        var resource = Pointer_1.Pointer.decorate(base);
        resource._registry = this;
        this._resourcesMap.set(localID, resource);
        return resource;
    },
};
exports.Registry = {
    PROTOTYPE: PROTOTYPE,
    isDecorated: function (object) {
        return Utils_1.isObject(object)
            && core_1.ModelDecorator
                .hasPropertiesFrom(PROTOTYPE, object);
    },
    decorate: function (object) {
        if (exports.Registry.isDecorated(object))
            return object;
        return core_1.ModelDecorator
            .definePropertiesFrom(PROTOTYPE, object);
    },
    create: function (base) {
        var copy = Object.assign({}, base);
        return exports.Registry.decorate(copy);
    },
};

//# sourceMappingURL=Registry.js.map
