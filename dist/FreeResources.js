"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("./core");
var JSONLD_1 = require("./JSONLD");
var ObjectSchema_1 = require("./ObjectSchema");
var RDF_1 = require("./RDF");
var Registry_1 = require("./Registry");
var Resource_1 = require("./Resource");
var Utils_1 = require("./Utils");
var PROTOTYPE = {
    _registry: void 0,
    _getLocalID: function (id) {
        if (RDF_1.URI.isBNodeID(id))
            return id;
        return Registry_1.Registry.PROTOTYPE._getLocalID.call(this, id);
    },
    _register: function (base) {
        if (!base.id)
            base.id = RDF_1.URI.generateBNodeID();
        var pointer = Registry_1.Registry.PROTOTYPE._register.call(this, base);
        return Resource_1.TransientResource.decorate(pointer);
    },
    toJSON: function () {
        var _this = this;
        var generalSchema = this._registry ?
            this._registry.getGeneralSchema() : new ObjectSchema_1.DigestedObjectSchema();
        var jsonldConverter = this._registry ?
            this._registry.jsonldConverter : new JSONLD_1.JSONLDConverter();
        return this
            .getPointers(true)
            .map(function (resource) {
            var resourceSchema = _this._registry ?
                _this._registry.getSchemaFor(resource) : generalSchema;
            return jsonldConverter.expand(resource, generalSchema, resourceSchema);
        });
    },
};
exports.FreeResources = {
    PROTOTYPE: PROTOTYPE,
    is: function (value) {
        return Utils_1.isObject(value)
            && exports.FreeResources.isDecorated(value);
    },
    isDecorated: function (object) {
        return Utils_1.isObject(object)
            && core_1.ModelDecorator
                .hasPropertiesFrom(PROTOTYPE, object);
    },
    create: function (data) {
        var copy = Object.assign({}, data);
        return exports.FreeResources.createFrom(copy);
    },
    createFrom: function (object) {
        return exports.FreeResources.decorate(object);
    },
    decorate: function (object) {
        if (exports.FreeResources.isDecorated(object))
            return object;
        var resource = Registry_1.Registry.decorate(object);
        return core_1.ModelDecorator
            .definePropertiesFrom(PROTOTYPE, resource);
    },
};

//# sourceMappingURL=FreeResources.js.map
