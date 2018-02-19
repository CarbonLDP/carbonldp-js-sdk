"use strict";
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
}
Object.defineProperty(exports, "__esModule", { value: true });
var Utils = __importStar(require("./../Utils"));
var Document = __importStar(require("./Document"));
var List = __importStar(require("./List"));
var Literal = __importStar(require("./Literal"));
var Value = __importStar(require("./Value"));
var XSD = __importStar(require("../Vocabularies/XSD"));
var Factory = (function () {
    function Factory() {
    }
    Factory.is = function (value) {
        return Utils.hasProperty(value, "@id")
            && Utils.isString(value["@id"]);
    };
    Factory.create = function (uri) {
        return {
            "@id": uri,
        };
    };
    return Factory;
}());
exports.Factory = Factory;
var Util = (function () {
    function Util() {
    }
    Util.areEqual = function (node1, node2) {
        return node1["@id"] === node2["@id"];
    };
    Util.hasType = function (node, type) {
        return Util.getTypes(node).indexOf(type) !== -1;
    };
    Util.getTypes = function (node) {
        if (!("@type" in node))
            return [];
        return node["@type"];
    };
    Util.getPropertyURI = function (node, predicate) {
        if (!(predicate in node))
            return null;
        if (!Utils.isArray(node[predicate]))
            return null;
        var uri = node[predicate].find(function (value) { return Factory.is(value); });
        return typeof uri !== "undefined" ? uri["@id"] : null;
    };
    Util.getFreeNodes = function (value) {
        if (!Utils.isArray(value))
            return [];
        var array = value;
        return array
            .filter(function (element) { return !Document.Factory.is(element); })
            .filter(function (element) { return Factory.is(element); });
    };
    Util.getProperty = function (expandedObject, propertyURI, pointerLibrary) {
        var propertyValues = expandedObject[propertyURI];
        if (!propertyValues)
            return null;
        if (!propertyValues.length)
            return null;
        var propertyValue = propertyValues[0];
        return Value.Util.parseValue(propertyValue, pointerLibrary);
    };
    Util.getPropertyPointer = function (expandedObject, propertyURI, pointerLibrary) {
        var propertyValues = expandedObject[propertyURI];
        if (!propertyValues)
            return null;
        for (var _i = 0, propertyValues_1 = propertyValues; _i < propertyValues_1.length; _i++) {
            var propertyValue = propertyValues_1[_i];
            if (!Factory.is(propertyValue))
                continue;
            return pointerLibrary.getPointer(propertyValue["@id"]);
        }
        return null;
    };
    Util.getPropertyLiteral = function (expandedObject, propertyURI, literalType) {
        var propertyValues = expandedObject[propertyURI];
        if (!propertyValues)
            return null;
        for (var _i = 0, propertyValues_2 = propertyValues; _i < propertyValues_2.length; _i++) {
            var propertyValue = propertyValues_2[_i];
            if (!Literal.Factory.is(propertyValue))
                continue;
            if (!Literal.Factory.hasType(propertyValue, literalType))
                continue;
            return Literal.Factory.parse(propertyValue);
        }
        return null;
    };
    Util.getPropertyList = function (expandedObject, propertyURI, pointerLibrary) {
        var propertyValues = expandedObject[propertyURI];
        if (!propertyValues)
            return null;
        var propertyList = Util.getList(propertyValues);
        if (!propertyList)
            return null;
        var listValues = [];
        for (var _i = 0, _a = propertyList["@list"]; _i < _a.length; _i++) {
            var listValue = _a[_i];
            listValues.push(Value.Util.parseValue(listValue, pointerLibrary));
        }
        return listValues;
    };
    Util.getPropertyPointerList = function (expandedObject, propertyURI, pointerLibrary) {
        var propertyValues = expandedObject[propertyURI];
        if (!propertyValues)
            return null;
        var propertyList = Util.getList(propertyValues);
        if (!propertyList)
            return null;
        var listPointers = [];
        for (var _i = 0, _a = propertyList["@list"]; _i < _a.length; _i++) {
            var listValue = _a[_i];
            if (!Factory.is(listValue))
                continue;
            var pointer = pointerLibrary.getPointer(listValue["@id"]);
            listPointers.push(pointer);
        }
        return listPointers;
    };
    Util.getPropertyLiteralList = function (expandedObject, propertyURI, literalType) {
        var propertyValues = expandedObject[propertyURI];
        if (!propertyValues)
            return null;
        var propertyList = Util.getList(propertyValues);
        if (!propertyList)
            return null;
        var listLiterals = [];
        for (var _i = 0, _a = propertyList["@list"]; _i < _a.length; _i++) {
            var listValue = _a[_i];
            if (!Literal.Factory.is(listValue))
                continue;
            if (!Literal.Factory.hasType(listValue, literalType))
                continue;
            listLiterals.push(Literal.Factory.parse(listValue));
        }
        return listLiterals;
    };
    Util.getProperties = function (propertyValues, pointerLibrary) {
        if (!propertyValues)
            return null;
        if (!propertyValues.length)
            return null;
        var properties = [];
        for (var _i = 0, propertyValues_3 = propertyValues; _i < propertyValues_3.length; _i++) {
            var propertyValue = propertyValues_3[_i];
            var parsedValue = Value.Util.parseValue(propertyValue, pointerLibrary);
            if (parsedValue !== null)
                properties.push(parsedValue);
        }
        return properties;
    };
    Util.getPropertyPointers = function (propertyValues, pointerLibrary) {
        if (!propertyValues)
            return [];
        if (!propertyValues.length)
            return [];
        var propertyPointers = [];
        for (var _i = 0, propertyValues_4 = propertyValues; _i < propertyValues_4.length; _i++) {
            var propertyValue = propertyValues_4[_i];
            if (!Factory.is(propertyValue))
                continue;
            var pointer = pointerLibrary.getPointer(propertyValue["@id"]);
            if (pointer !== null)
                propertyPointers.push(pointer);
        }
        return propertyPointers;
    };
    Util.getPropertyURIs = function (expandedObject, propertyURI) {
        var propertyValues = expandedObject[propertyURI];
        if (!propertyValues)
            return null;
        if (!propertyValues.length)
            return null;
        var propertyURIs = [];
        for (var _i = 0, propertyValues_5 = propertyValues; _i < propertyValues_5.length; _i++) {
            var propertyValue = propertyValues_5[_i];
            if (!Factory.is(propertyValue))
                continue;
            propertyURIs.push(propertyValue["@id"]);
        }
        return propertyURIs;
    };
    Util.getPropertyLiterals = function (propertyValues, literalType) {
        if (!propertyValues)
            return null;
        var propertyLiterals = [];
        for (var _i = 0, propertyValues_6 = propertyValues; _i < propertyValues_6.length; _i++) {
            var propertyValue = propertyValues_6[_i];
            if (!Literal.Factory.is(propertyValue))
                continue;
            if (!Literal.Factory.hasType(propertyValue, literalType))
                continue;
            propertyLiterals.push(Literal.Factory.parse(propertyValue));
        }
        return propertyLiterals;
    };
    Util.getPropertyLanguageMap = function (propertyValues) {
        if (!propertyValues)
            return null;
        var propertyLanguageMap = {};
        for (var _i = 0, propertyValues_7 = propertyValues; _i < propertyValues_7.length; _i++) {
            var propertyValue = propertyValues_7[_i];
            if (!Literal.Factory.is(propertyValue))
                continue;
            if (!Literal.Factory.hasType(propertyValue, XSD.DataType.string))
                continue;
            var languageTag = propertyValue["@language"];
            if (!languageTag)
                continue;
            propertyLanguageMap[languageTag] = Literal.Factory.parse(propertyValue);
        }
        return propertyLanguageMap;
    };
    Util.getList = function (propertyValues) {
        for (var _i = 0, propertyValues_8 = propertyValues; _i < propertyValues_8.length; _i++) {
            var propertyValue = propertyValues_8[_i];
            if (!List.Factory.is(propertyValue))
                continue;
            return propertyValue;
        }
        return null;
    };
    return Util;
}());
exports.Util = Util;

//# sourceMappingURL=Node.js.map
