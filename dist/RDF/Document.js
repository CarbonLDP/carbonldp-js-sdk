"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
}
Object.defineProperty(exports, "__esModule", { value: true });
var JSONLD = __importStar(require("./../JSONLD"));
var Utils = __importStar(require("./../Utils"));
var Node = __importStar(require("./Node"));
var URI = __importStar(require("./URI"));
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
var RDFDocumentParser = (function (_super) {
    __extends(RDFDocumentParser, _super);
    function RDFDocumentParser() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    RDFDocumentParser.prototype.parse = function (input) {
        return _super.prototype.parse.call(this, input).then(Util.getDocuments);
    };
    return RDFDocumentParser;
}(JSONLD.Parser.Class));
exports.RDFDocumentParser = RDFDocumentParser;

//# sourceMappingURL=Document.js.map
