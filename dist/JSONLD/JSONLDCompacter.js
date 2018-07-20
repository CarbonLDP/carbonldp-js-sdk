"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var IllegalArgumentError_1 = require("../Errors/IllegalArgumentError");
var Pointer_1 = require("../Pointer/Pointer");
var QueryableMetadata_1 = require("../QueryDocuments/QueryableMetadata");
var QueryContextBuilder_1 = require("../QueryDocuments/QueryContextBuilder");
var QueryContextPartial_1 = require("../QueryDocuments/QueryContextPartial");
var QueryProperty_1 = require("../QueryDocuments/QueryProperty");
var Document_1 = require("../RDF/Document");
var Registry_1 = require("../Registry/Registry");
var JSONLDCompacter = (function () {
    function JSONLDCompacter(registry, root, schemaResolver, jsonldConverter) {
        this.registry = registry;
        this.root = root;
        this.resolver = schemaResolver || registry;
        this.converter = jsonldConverter || registry.context.jsonldConverter;
        this.compactionMap = new Map();
    }
    JSONLDCompacter.prototype.compactDocument = function (rdfDocument) {
        var rdfDocuments = [rdfDocument];
        return this.compactDocuments(rdfDocuments)[0];
    };
    JSONLDCompacter.prototype.compactDocuments = function (rdfDocuments, mainDocuments) {
        var _this = this;
        if (!mainDocuments || !mainDocuments.length)
            mainDocuments = rdfDocuments;
        var documents = rdfDocuments.map(function (rdfDocument) {
            var _a = Document_1.RDFDocument.getNodes(rdfDocument), documentNodes = _a[0], fragmentNodes = _a[1];
            if (documentNodes.length === 0)
                throw new IllegalArgumentError_1.IllegalArgumentError("The RDFDocument \"" + rdfDocument["@id"] + "\" does not contain a document resource.");
            if (documentNodes.length > 1)
                throw new IllegalArgumentError_1.IllegalArgumentError("The RDFDocument \"" + rdfDocument["@id"] + "\" contains multiple document resources.");
            var document = _this.__getResource(documentNodes[0], _this.registry);
            _this.__processFragments(document, fragmentNodes);
            return document;
        });
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
            this.__processCompactionQueue(compactionQueue);
            this.compactionMap.forEach(function (node, key, map) {
                if (node.processed)
                    map.delete(key);
            });
            if (this.compactionMap.size)
                compactionQueue
                    .push(this.compactionMap.keys().next().value);
        }
        documents
            .forEach(function (persistedDocument) {
            persistedDocument.$_syncSnapshot();
            _this.registry.decorate(persistedDocument);
        });
        return mainCompactedDocuments;
    };
    JSONLDCompacter.prototype.__compactNode = function (node, resource, containerLibrary, path) {
        var schema = this.resolver.getSchemaFor(node, path);
        var isPartial = this.__setOrRemovePartial(resource, schema, path);
        var compactedData = this.converter.compact(node, {}, schema, containerLibrary, isPartial);
        var addedProperties = [];
        new Set(Object.keys(resource).concat(Object.keys(compactedData))).forEach(function (key) {
            var _a;
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
        });
        return addedProperties
            .filter(function (x) { return schema.properties.has(x); });
    };
    JSONLDCompacter.prototype.__getResource = function (node, registry) {
        var resource = Registry_1._getPointer(registry, node["@id"], true);
        if (Registry_1.Registry.isDecorated(resource))
            registry = resource;
        this.compactionMap
            .set(resource.$id, { paths: [], node: node, resource: resource, registry: registry });
        return resource;
    };
    JSONLDCompacter.prototype.__processFragments = function (document, fragmentNodes) {
        var _this = this;
        var currentFragments = document
            .$getPointers(true)
            .map(function (pointer) { return pointer.$id; });
        var newFragments = fragmentNodes
            .map(function (fragmentNode) { return _this.__getResource(fragmentNode, document); })
            .map(function (fragment) { return fragment.$id; });
        var newFragmentsSet = new Set(newFragments);
        currentFragments
            .filter(function (id) { return !newFragmentsSet.has(id); })
            .forEach(function (id) { return document.$removePointer(id); });
    };
    JSONLDCompacter.prototype.__processCompactionQueue = function (compactionQueue) {
        while (compactionQueue.length) {
            var targetNode = compactionQueue.shift();
            if (!this.compactionMap.has(targetNode))
                continue;
            var compactionNode = this.compactionMap.get(targetNode);
            compactionNode.processed = true;
            var targetPath = compactionNode.paths.shift();
            var addedProperties = this.__compactNode(compactionNode.node, compactionNode.resource, compactionNode.registry, targetPath);
            for (var _i = 0, addedProperties_1 = addedProperties; _i < addedProperties_1.length; _i++) {
                var propertyName = addedProperties_1[_i];
                if (!compactionNode.resource.hasOwnProperty(propertyName))
                    continue;
                var value = compactionNode.resource[propertyName];
                var values = Array.isArray(value) ? value : [value];
                var pointers = values.filter(Pointer_1.Pointer.is);
                for (var _a = 0, pointers_1 = pointers; _a < pointers_1.length; _a++) {
                    var pointer = pointers_1[_a];
                    if (!this.compactionMap.has(pointer.$id))
                        continue;
                    var subCompactionNode = this.compactionMap.get(pointer.$id);
                    if (targetPath) {
                        var subPath = targetPath + "." + propertyName;
                        if (!this.resolver.hasSchemaFor(subCompactionNode.node, subPath))
                            continue;
                        subCompactionNode.paths.push(subPath);
                        compactionQueue.push(pointer.$id);
                    }
                }
            }
        }
    };
    JSONLDCompacter.prototype.__setOrRemovePartial = function (resource, schema, path) {
        if (this.__willBePartial(resource, schema, path))
            return true;
        if (resource.$_queryableMetadata)
            resource.$_queryableMetadata = void 0;
        return false;
    };
    JSONLDCompacter.prototype.__willBePartial = function (resource, schema, path) {
        if (this.resolver instanceof QueryContextPartial_1.QueryContextPartial)
            return true;
        if (!(this.resolver instanceof QueryContextBuilder_1.QueryContextBuilder))
            return false;
        var type = this.resolver.hasProperty(path) ?
            this.resolver.getProperty(path).getType() : void 0;
        if (type !== QueryProperty_1.QueryPropertyType.PARTIAL && type !== QueryProperty_1.QueryPropertyType.ALL)
            return false;
        resource.$_queryableMetadata = new QueryableMetadata_1.QueryableMetadata(type === QueryProperty_1.QueryPropertyType.ALL ? QueryableMetadata_1.QueryableMetadata.ALL : schema, resource.$_queryableMetadata);
        return true;
    };
    return JSONLDCompacter;
}());
exports.JSONLDCompacter = JSONLDCompacter;

//# sourceMappingURL=JSONLDCompacter.js.map
