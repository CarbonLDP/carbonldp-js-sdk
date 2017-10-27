"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var PersistedDocument = require("../PersistedDocument");
var Pointer = require("../Pointer");
var RDFDocument = require("../RDF/Document");
var URI_1 = require("../RDF/URI");
function getRelativeID(node) {
    var id = node["@id"];
    return URI_1.Util.hasFragment(id) ? URI_1.Util.getFragment(id) : id;
}
var Class = (function () {
    function Class(documents, schemaResolver, jsonldConverter) {
        this.documents = documents;
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
            .map(function (compactionNode) { return compactionNode.resource; });
        this.processCompactionQueue(compactionQueue);
        while (this.compactionMap.size) {
            var first = this.compactionMap.keys().next().value;
            this.processCompactionQueue([first]);
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
        var digestedSchema = this.resolver.getSchemaFor(node, path);
        var compactedData = this.converter.compact(node, {}, digestedSchema, containerLibrary);
        new Set(Object.keys(resource).concat(Object.keys(compactedData))).forEach(function (key) {
            if (!compactedData.hasOwnProperty(key)) {
                delete resource[key];
                return;
            }
            if (!Array.isArray(resource[key])) {
                resource[key] = compactedData[key];
                return;
            }
            var values = Array.isArray(compactedData[key]) ? compactedData[key] : [compactedData[key]];
            resource[key].length = 0;
            (_a = resource[key]).push.apply(_a, values);
            var _a;
        });
    };
    Class.prototype.getResource = function (node, containerLibrary, isDocument) {
        var resource = containerLibrary.getPointer(node["@id"]);
        if (isDocument)
            containerLibrary = PersistedDocument.Factory.decorate(resource, this.documents);
        this.compactionMap.set(resource.id, { path: "", node: node, resource: resource, containerLibrary: containerLibrary });
        return resource;
    };
    Class.prototype.processCompactionQueue = function (compactionQueue) {
        while (compactionQueue.length) {
            var targetNode = compactionQueue.shift();
            var compactionNode = this.compactionMap.get(targetNode);
            this.compactionMap.delete(targetNode);
            this.compactNode(compactionNode.node, compactionNode.resource, compactionNode.containerLibrary, compactionNode.path);
            compactionNode.resource._syncSnapshot();
            for (var propertyName in compactionNode.resource) {
                if (!compactionNode.resource.hasOwnProperty(propertyName))
                    continue;
                var value = compactionNode.resource[propertyName];
                var values = Array.isArray(value) ? value : [value];
                var pointers = values.filter(Pointer.Factory.is);
                for (var _i = 0, pointers_1 = pointers; _i < pointers_1.length; _i++) {
                    var pointer = pointers_1[_i];
                    var subCompactionNode = this.compactionMap.get(pointer.id);
                    if (!subCompactionNode || subCompactionNode.added)
                        continue;
                    subCompactionNode.path = compactionNode.path + "." + propertyName;
                    subCompactionNode.added = true;
                    compactionQueue.push(pointer.id);
                }
            }
        }
    };
    return Class;
}());
exports.Class = Class;
exports.default = Class;

//# sourceMappingURL=Compacter.js.map
