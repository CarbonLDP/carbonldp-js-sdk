"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var PersistedDocument = require("../PersistedDocument");
var Pointer = require("../Pointer");
var RDFDocument = require("../RDF/Document");
var URI_1 = require("../RDF/URI");
var QueryDocument_1 = require("../SPARQL/QueryDocument");
function getRelativeID(node) {
    var id = node["@id"];
    return URI_1.Util.hasFragment(id) ? URI_1.Util.getFragment(id) : id;
}
var Class = (function () {
    function Class(documents, root, schemaResolver, jsonldConverter) {
        this.documents = documents;
        this.root = root;
        this.resolver = schemaResolver || documents;
        this.converter = jsonldConverter || documents.jsonldConverter;
        this.compactionMap = new Map();
    }
    Class.prototype.compactDocument = function (rdfDocument) {
        var rdfDocuments = [rdfDocument];
        return this.compactDocuments(rdfDocuments)[0];
    };
    Class.prototype.compactDocuments = function (rdfDocuments, mainDocuments) {
        var _this = this;
        if (mainDocuments === void 0) { mainDocuments = rdfDocuments; }
        rdfDocuments.forEach(function (rdfDocument) {
            var _a = RDFDocument.Util.getNodes(rdfDocument), documentNode = _a[0][0], fragmentNodes = _a[1];
            var targetDocument = _this.getResource(documentNode, _this.documents, true);
            var fragmentsSet = new Set(targetDocument._fragmentsIndex.keys());
            fragmentNodes.forEach(function (fragmentNode) {
                var fragmentID = getRelativeID(fragmentNode);
                if (fragmentsSet.has(fragmentID))
                    fragmentsSet.delete(fragmentID);
                _this.getResource(fragmentNode, targetDocument);
            });
            fragmentsSet.forEach(targetDocument._removeFragment, targetDocument);
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
            this.processCompactionQueue(compactionQueue);
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
            persistedDocument._resolved = true;
            persistedDocument.types
                .map(function (type) { return _this.documents.documentDecorators.get(type); })
                .forEach(function (decorator) { return decorator && decorator.call(void 0, persistedDocument, _this.documents); });
        });
        return mainCompactedDocuments;
    };
    Class.prototype.compactNode = function (node, resource, containerLibrary, path) {
        var schema = this.resolver.getSchemaFor(node, path);
        if (this.resolver instanceof QueryDocument_1.QueryContextBuilder.Class) {
            var type = this.resolver.hasProperty(path) ?
                this.resolver.getProperty(path).getType() : void 0;
            if (type === QueryDocument_1.QueryProperty.PropertyType.PARTIAL || type === QueryDocument_1.QueryProperty.PropertyType.ALL) {
                resource._partialMetadata = new QueryDocument_1.PartialMetadata.Class(type === QueryDocument_1.QueryProperty.PropertyType.ALL ? QueryDocument_1.PartialMetadata.ALL : schema, resource._partialMetadata);
            }
        }
        var compactedData = this.converter.compact(node, {}, schema, containerLibrary, resource.isPartial());
        var addedProperties = [];
        new Set(Object.keys(resource).concat(Object.keys(compactedData))).forEach(function (key) {
            if (!compactedData.hasOwnProperty(key)) {
                if (!resource.isPartial() || schema.properties.has(key))
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
        var schemaAddedProperties = addedProperties
            .filter(function (x) { return schema.properties.has(x); });
        schemaAddedProperties
            .map(function (x) { return schema.properties.get(x).uri; })
            .forEach(function (x) { return delete node[x]; });
        return schemaAddedProperties;
    };
    Class.prototype.getResource = function (node, containerLibrary, isDocument) {
        var resource = containerLibrary.getPointer(node["@id"]);
        if (isDocument)
            containerLibrary = PersistedDocument.Factory.decorate(resource, this.documents);
        this.compactionMap.set(resource.id, { paths: [], node: node, resource: resource, containerLibrary: containerLibrary });
        return resource;
    };
    Class.prototype.processCompactionQueue = function (compactionQueue) {
        while (compactionQueue.length) {
            var targetNode = compactionQueue.shift();
            if (!this.compactionMap.has(targetNode))
                continue;
            var compactionNode = this.compactionMap.get(targetNode);
            compactionNode.processed = true;
            var targetPath = compactionNode.paths.shift();
            var addedProperties = this.compactNode(compactionNode.node, compactionNode.resource, compactionNode.containerLibrary, targetPath);
            compactionNode.resource._syncSnapshot();
            for (var _i = 0, addedProperties_1 = addedProperties; _i < addedProperties_1.length; _i++) {
                var propertyName = addedProperties_1[_i];
                if (!compactionNode.resource.hasOwnProperty(propertyName))
                    continue;
                var value = compactionNode.resource[propertyName];
                var values = Array.isArray(value) ? value : [value];
                var pointers = values.filter(Pointer.Factory.is);
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
    return Class;
}());
exports.Class = Class;
exports.default = Class;

//# sourceMappingURL=Compacter.js.map
