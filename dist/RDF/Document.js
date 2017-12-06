"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var JSONLD = require("./../JSONLD");
var Node = require("./Node");
var Utils = require("./../Utils");
var URI = require("./URI");
var Factory = (function () {
    function Factory() {
    }
    Factory.is = function (object) {
        return Utils.hasProperty(object, "@graph")
            && Utils.isArray(object["@graph"]);
    };
    Factory.create = function (resources, uri) {
        var document = uri ? Node.Factory.create(uri) : {};
        document["@graph"] = resources;
        return document;
    };
    return Factory;
}());
exports.Factory = Factory;
var Util = (function () {
    function Util() {
    }
    Util.getDocuments = function (value) {
        if (Utils.isArray(value)) {
            var array = value;
            return array.filter(function (element) { return Factory.is(element); });
        }
        else if (Utils.isObject(value)) {
            if (Factory.is(value))
                return [value];
        }
        return [];
    };
    Util.getResources = function (value) {
        var freeNodes = Node.Util.getFreeNodes(value);
        var documents = Util.getDocuments(value);
        var resources = [].concat(freeNodes);
        for (var _i = 0, documents_1 = documents; _i < documents_1.length; _i++) {
            var document_1 = documents_1[_i];
            resources = resources.concat(document_1["@graph"]);
        }
        return resources;
    };
    Util.getDocumentResources = function (document) {
        var resources = Util.getResources(document);
        var documentResources = [];
        for (var i = 0, length_1 = resources.length; i < length_1; i++) {
            var resource = resources[i];
            var uri = resource["@id"];
            if (!uri)
                continue;
            if (!URI.Util.hasFragment(uri) && !URI.Util.isBNodeID(uri))
                documentResources.push(resource);
        }
        return documentResources;
    };
    Util.getFragmentResources = function (document, documentResource) {
        var resources = Util.getResources(document);
        var documentURIToMatch = null;
        if (documentResource) {
            if (Utils.isString(documentResource)) {
                documentURIToMatch = documentResource;
            }
            else
                documentURIToMatch = documentResource["@id"];
        }
        var fragmentResources = [];
        for (var i = 0, length_2 = resources.length; i < length_2; i++) {
            var resource = resources[i];
            var uri = resource["@id"];
            if (!uri)
                continue;
            if (!URI.Util.hasFragment(uri))
                continue;
            if (!documentURIToMatch) {
                fragmentResources.push(resource);
            }
            else {
                var documentURI = URI.Util.getDocumentURI(uri);
                if (documentURI === documentURIToMatch)
                    fragmentResources.push(resource);
            }
        }
        return fragmentResources;
    };
    Util.getBNodeResources = function (document) {
        var resources = Util.getResources(document);
        var bnodes = [];
        for (var i = 0, length_3 = resources.length; i < length_3; i++) {
            var resource = resources[i];
            if (!("@id" in resource) || URI.Util.isBNodeID(resource["@id"]))
                bnodes.push(resource);
        }
        return bnodes;
    };
    Util.getNodes = function (rdfDocument) {
        var documentNodes = [];
        var fragmentNodes = [];
        for (var _i = 0, _a = rdfDocument["@graph"]; _i < _a.length; _i++) {
            var node = _a[_i];
            (Util.isNodeFragment(node) ? fragmentNodes : documentNodes).push(node);
        }
        return [documentNodes, fragmentNodes];
    };
    Util.isNodeFragment = function (node) {
        return URI.Util.hasFragment(node["@id"]) || URI.Util.isBNodeID(node["@id"]);
    };
    return Util;
}());
exports.Util = Util;
var Parser = (function () {
    function Parser() {
    }
    Parser.prototype.parse = function (input) {
        var jsonLDParser = new JSONLD.Parser.Class();
        return jsonLDParser.parse(input).then(function (expandedResult) {
            return Util.getDocuments(expandedResult);
        });
    };
    return Parser;
}());
exports.Parser = Parser;

//# sourceMappingURL=Document.js.map
