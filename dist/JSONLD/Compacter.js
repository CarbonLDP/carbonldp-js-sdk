"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Errors_1 = require("../Errors");
var Pointer_1 = require("../Pointer");
var RDF_1 = require("../RDF");
var Registry_1 = require("../Registry");
var Resource_1 = require("../Resource");
var QueryDocument_1 = require("../SPARQL/QueryDocument");
var JSONLDCompacter = (function () {
    function JSONLDCompacter(registry, root, schemaResolver, jsonldConverter) {
        this.registry = registry;
        this.root = root;
        this.resolver = schemaResolver || registry;
        this.converter = jsonldConverter || registry.jsonldConverter;
        this.compactionMap = new Map();
    }
    JSONLDCompacter.prototype.compactDocument = function (rdfDocument) {
        var rdfDocuments = [rdfDocument];
        return this.compactDocuments(rdfDocuments)[0];
    };
    JSONLDCompacter.prototype.compactDocuments = function (rdfDocuments, mainDocuments) {
        var _this = this;
        if (mainDocuments === void 0) { mainDocuments = rdfDocuments; }
        rdfDocuments.forEach(function (rdfDocument) {
            var _a = RDF_1.RDFDocument.getNodes(rdfDocument), documentNodes = _a[0], fragmentNodes = _a[1];
            if (documentNodes.length === 0)
                throw new Errors_1.IllegalArgumentError("The RDFDocument \"" + rdfDocument["@id"] + "\" does not contain a document resource.");
            if (documentNodes.length > 1)
                throw new Errors_1.IllegalArgumentError("The RDFDocument \"" + rdfDocument["@id"] + "\" contains multiple document resources.");
            var documentNode = documentNodes[0];
            var targetDocument = _this._getResource(documentNode, _this.registry);
            var currentFragments = targetDocument
                .getPointers(true)
                .map(function (pointer) { return pointer.id; });
            var newFragments = fragmentNodes
                .map(function (fragmentNode) { return _this._getResource(fragmentNode, targetDocument); })
                .map(function (fragment) { return fragment.id; });
            var newFragmentsSet = new Set(newFragments);
            currentFragments
                .filter(function (id) { return !newFragmentsSet.has(id); })
                .forEach(function (id) { return targetDocument.removePointer(id); });
        });
        var compactedDocuments = rdfDocuments
            .map(function (rdfDocument) { return rdfDocument["@id"]; })
            .map(this.compactionMap.get, this.compactionMap)
            .map(function (compactionNode) { return compactionNode.resource; });
        var compactionQueue = mainDocuments
            .map(function (rdfDocument) { return rdfDocument["@id"]; });
        var mainCompactedDocuments = compactionQueue
            .map(this.compactionMap.get, this.compactionMap)
            .map(function (compactionNode) {
            if (_this.root)
                compactionNode.paths.push(_this.root);
            return compactionNode.resource;
        });
        while (compactionQueue.length) {
            this._processCompactionQueue(compactionQueue);
            this.compactionMap.forEach(function (node, key, map) {
                if (node.processed)
                    map.delete(key);
            });
            if (this.compactionMap.size)
                compactionQueue
                    .push(this.compactionMap.keys().next().value);
        }
        compactedDocuments.forEach(function (persistedDocument) {
            persistedDocument._syncSavedFragments();
            persistedDocument.types
                .map(function (type) { return _this.registry.documentDecorators.get(type); })
                .forEach(function (decorator) { return decorator && decorator.call(void 0, persistedDocument, _this.registry); });
        });
        return mainCompactedDocuments;
    };
    JSONLDCompacter.prototype._compactNode = function (node, resource, containerLibrary, path) {
        var schema = this.resolver.getSchemaFor(node, path);
        var isPartial = this._setOrRemovePartial(resource, schema, path);
        var compactedData = this.converter.compact(node, {}, schema, containerLibrary, isPartial);
        var addedProperties = [];
        new Set(Object.keys(resource).concat(Object.keys(compactedData))).forEach(function (key) {
            if (!compactedData.hasOwnProperty(key)) {
                if (!isPartial || schema.properties.has(key))
                    delete resource[key];
                return;
            }
            addedProperties.push(key);
            if (!Array.isArray(resource[key])) {
                resource[key] = compactedData[key];
                return;
            }
            var values = Array.isArray(compactedData[key]) ? compactedData[key] : [compactedData[key]];
            resource[key].length = 0;
            (_a = resource[key]).push.apply(_a, values);
            var _a;
        });
        return addedProperties
            .filter(function (x) { return schema.properties.has(x); });
    };
    JSONLDCompacter.prototype._getResource = function (node, registry) {
        var resource = registry.getPointer(node["@id"], true);
        if (Registry_1.Registry.isDecorated(resource))
            registry = resource;
        this.compactionMap
            .set(resource.id, { paths: [], node: node, resource: resource, registry: registry });
        return resource;
    };
    JSONLDCompacter.prototype._processCompactionQueue = function (compactionQueue) {
        while (compactionQueue.length) {
            var targetNode = compactionQueue.shift();
            if (!this.compactionMap.has(targetNode))
                continue;
            var compactionNode = this.compactionMap.get(targetNode);
            compactionNode.processed = true;
            var targetPath = compactionNode.paths.shift();
            var addedProperties = this._compactNode(compactionNode.node, compactionNode.resource, compactionNode.registry, targetPath);
            if (Resource_1.PersistedResource.is(compactionNode.resource))
                compactionNode.resource._syncSnapshot();
            for (var _i = 0, addedProperties_1 = addedProperties; _i < addedProperties_1.length; _i++) {
                var propertyName = addedProperties_1[_i];
                if (!compactionNode.resource.hasOwnProperty(propertyName))
                    continue;
                var value = compactionNode.resource[propertyName];
                var values = Array.isArray(value) ? value : [value];
                var pointers = values.filter(Pointer_1.Pointer.is);
                for (var _a = 0, pointers_1 = pointers; _a < pointers_1.length; _a++) {
                    var pointer = pointers_1[_a];
                    if (!this.compactionMap.has(pointer.id))
                        continue;
                    var subCompactionNode = this.compactionMap.get(pointer.id);
                    if (targetPath) {
                        var subPath = targetPath + "." + propertyName;
                        if (!this.resolver.hasSchemaFor(subCompactionNode.node, subPath))
                            continue;
                        subCompactionNode.paths.push(subPath);
                        compactionQueue.push(pointer.id);
                    }
                }
            }
        }
    };
    JSONLDCompacter.prototype._setOrRemovePartial = function (resource, schema, path) {
        if (!Resource_1.PersistedResource.is(resource))
            return false;
        if (this._willBePartial(resource, schema, path))
            return true;
        if (resource._partialMetadata)
            delete resource._partialMetadata;
        return false;
    };
    JSONLDCompacter.prototype._willBePartial = function (resource, schema, path) {
        if (!(this.resolver instanceof QueryDocument_1.QueryContextBuilder))
            return false;
        var type = this.resolver.hasProperty(path) ?
            this.resolver.getProperty(path).getType() : void 0;
        if (type !== QueryDocument_1.QueryPropertyType.PARTIAL && type !== QueryDocument_1.QueryPropertyType.ALL)
            return false;
        resource._partialMetadata = new QueryDocument_1.PartialMetadata(type === QueryDocument_1.QueryPropertyType.ALL ? QueryDocument_1.PartialMetadata.ALL : schema, resource._partialMetadata);
        return true;
    };
    return JSONLDCompacter;
}());
exports.JSONLDCompacter = JSONLDCompacter;

//# sourceMappingURL=Compacter.js.map
