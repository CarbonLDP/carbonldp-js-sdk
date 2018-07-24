"use strict";
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
}
Object.defineProperty(exports, "__esModule", { value: true });
var Utils = __importStar(require("../Utils"));
var XSD_1 = require("../Vocabularies/XSD");
var List_1 = require("./List");
var Literal_1 = require("./Literal");
var URI_1 = require("./URI");
exports.RDFNode = {
    is: function (value) {
        return Utils.hasProperty(value, "@id")
            && Utils.isString(value["@id"]);
    },
    create: function (uri) {
        return {
            "@id": uri,
        };
    },
    getID: function (node) {
        return node["@id"];
    },
    getRelativeID: function (node) {
        var id = exports.RDFNode.getID(node);
        return URI_1.URI.hasFragment(id) ? URI_1.URI.getFragment(id) : id;
    },
    areEqual: function (node1, node2) {
        return exports.RDFNode.getID(node1) === exports.RDFNode.getID(node2);
    },
    isFragment: function (node) {
        var id = exports.RDFNode.getID(node);
        return URI_1.URI.hasFragment(id) || URI_1.URI.isBNodeID(id);
    },
    hasType: function (node, type) {
        return exports.RDFNode.getTypes(node).indexOf(type) !== -1;
    },
    getTypes: function (node) {
        if (!("@type" in node))
            return [];
        return node["@type"];
    },
    getList: function (propertyValues) {
        if (!Array.isArray(propertyValues))
            return;
        return propertyValues
            .find(List_1.RDFList.is);
    },
    getPropertyLiterals: function (propertyValues, literalType) {
        if (!Array.isArray(propertyValues))
            return;
        return propertyValues
            .filter(Literal_1.RDFLiteral.is)
            .filter(function (literal) { return Literal_1.RDFLiteral.hasType(literal, literalType); })
            .map(Literal_1.RDFLiteral.parse);
    },
    getPropertyLanguageMap: function (propertyValues) {
        if (!Array.isArray(propertyValues))
            return;
        var propertyLanguageMap = {};
        for (var _i = 0, propertyValues_1 = propertyValues; _i < propertyValues_1.length; _i++) {
            var propertyValue = propertyValues_1[_i];
            if (!Literal_1.RDFLiteral.is(propertyValue))
                continue;
            if (!Literal_1.RDFLiteral.hasType(propertyValue, XSD_1.XSD.string))
                continue;
            var languageTag = propertyValue["@language"];
            if (!languageTag)
                continue;
            propertyLanguageMap[languageTag] = Literal_1.RDFLiteral.parse(propertyValue);
        }
        return propertyLanguageMap;
    },
};

//# sourceMappingURL=Node.js.map
