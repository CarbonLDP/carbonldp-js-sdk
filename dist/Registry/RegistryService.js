"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Document_1 = require("../Document");
var FreeResources_1 = require("../FreeResources");
var JSONLD_1 = require("../JSONLD");
var ObjectSchema_1 = require("../ObjectSchema");
var RDF_1 = require("../RDF");
var Resource_1 = require("../Resource");
var Utils_1 = require("../Utils");
var Registry_1 = require("./Registry");
var RegistryService = (function () {
    function RegistryService(model, context) {
        this.inScope = Registry_1.Registry.PROTOTYPE.inScope;
        this.hasPointer = Registry_1.Registry.PROTOTYPE.hasPointer;
        this.getPointer = Registry_1.Registry.PROTOTYPE.getPointer;
        this.getPointers = Registry_1.Registry.PROTOTYPE.getPointers;
        this.removePointer = Registry_1.Registry.PROTOTYPE.removePointer;
        this._context = context;
        this._model = model;
        this._resourcesMap = new Map();
        this._documentDecorators = Utils_1.MapUtils.extend(new Map(), context && context.parentContext && context.parentContext.registry.documentDecorators);
        this._jsonldConverter = new JSONLD_1.JSONLDConverter(context && context.parentContext && context.parentContext.registry.jsonldConverter.literalSerializers);
    }
    Object.defineProperty(RegistryService.prototype, "_registry", {
        get: function () {
            return this._context
                && this._context.parentContext
                && this._context.parentContext.registry;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(RegistryService.prototype, "documentDecorators", {
        get: function () { return this._documentDecorators; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(RegistryService.prototype, "jsonldConverter", {
        get: function () { return this._jsonldConverter; },
        enumerable: true,
        configurable: true
    });
    RegistryService.prototype._getLocalID = function (id) {
        if (!this._context)
            return id;
        var iri = ObjectSchema_1.ObjectSchemaUtils.resolveURI(id, this._context.getObjectSchema());
        if (!RDF_1.URI.isBaseOf(this._context.baseURI, iri))
            return null;
        return RDF_1.URI.getRelativeURI(iri, this._context.baseURI);
    };
    RegistryService.prototype._register = function (base) {
        var pointer = Registry_1.Registry.PROTOTYPE._register.call(this, base);
        return this._model.decorate(pointer);
    };
    RegistryService.prototype.getGeneralSchema = function () {
        if (!this._context)
            return new ObjectSchema_1.DigestedObjectSchema();
        return this._context.getObjectSchema();
    };
    RegistryService.prototype.hasSchemaFor = function (object, path) {
        return !path;
    };
    RegistryService.prototype.getSchemaFor = function (object) {
        var schema = "types" in object ?
            this._getSchemaForResource(object) :
            this._getSchemaForNode(object);
        if (!Resource_1.PersistedResource.isDecorated(object) || !object.isPartial())
            return schema;
        return ObjectSchema_1.ObjectSchemaDigester
            ._combineSchemas([
            schema,
            object._partialMetadata.schema,
        ]);
    };
    RegistryService.prototype._getSchemaForNode = function (node) {
        var types = RDF_1.RDFNode.getTypes(node);
        return this._getSchema(types, node["@id"]);
    };
    RegistryService.prototype._getSchemaForResource = function (resource) {
        var types = resource.types || [];
        return this._getSchema(types, resource.id);
    };
    RegistryService.prototype._getSchema = function (objectTypes, objectID) {
        var _this = this;
        if (!this._context)
            return new ObjectSchema_1.DigestedObjectSchema();
        if (objectID !== void 0 && !RDF_1.URI.hasFragment(objectID) && !RDF_1.URI.isBNodeID(objectID) && objectTypes.indexOf(Document_1.TransientDocument.TYPE) === -1)
            objectTypes = objectTypes.concat(Document_1.TransientDocument.TYPE);
        var objectSchemas = objectTypes
            .filter(function (type) { return _this._context.hasObjectSchema(type); })
            .map(function (type) { return _this._context.getObjectSchema(type); });
        return ObjectSchema_1.ObjectSchemaDigester
            ._combineSchemas([
            this._context.getObjectSchema()
        ].concat(objectSchemas));
    };
    RegistryService.prototype._parseFreeNodes = function (freeNodes) {
        var freeResourcesDocument = FreeResources_1.FreeResources
            .createFrom({ _registry: this, _context: this._context });
        var resources = freeNodes
            .map(function (node) { return freeResourcesDocument._register({ id: node["@id"] }); });
        this._compactRDFNodes(freeNodes, resources, freeResourcesDocument);
        return freeResourcesDocument;
    };
    RegistryService.prototype._compactRDFNodes = function (nodes, targets, library) {
        for (var i = 0; i < nodes.length; i++) {
            var node = nodes[i];
            var target = targets[i] || {};
            this._compactRDFNode(node, target, library);
        }
    };
    RegistryService.prototype._compactRDFNode = function (node, target, library) {
        var digestedSchema = this.getSchemaFor(node);
        this.jsonldConverter.compact(node, target, digestedSchema, library);
    };
    return RegistryService;
}());
exports.RegistryService = RegistryService;

//# sourceMappingURL=RegistryService.js.map
