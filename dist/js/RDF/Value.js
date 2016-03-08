System.register(["./List", "./Literal", "./../NS", "./RDFNode"], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var List, Literal, NS, RDFNode;
    var Util;
    return {
        setters:[
            function (List_1) {
                List = List_1;
            },
            function (Literal_1) {
                Literal = Literal_1;
            },
            function (NS_1) {
                NS = NS_1;
            },
            function (RDFNode_1) {
                RDFNode = RDFNode_1;
            }],
        execute: function() {
            // TODO: Move all getters and setters to RDFNode.Util
            Util = (function () {
                function Util() {
                }
                Util.areEqual = function (value1, value2) {
                    if (Literal.Factory.is(value1) && Literal.Factory.is(value2)) {
                        return Literal.Util.areEqual(value1, value2);
                    }
                    else if (RDFNode.Factory.is(value1) && RDFNode.Factory.is(value2)) {
                        return RDFNode.Util.areEqual(value1, value2);
                    }
                    else
                        return false;
                };
                Util.getProperty = function (expandedObject, propertyURI, pointerLibrary) {
                    var propertyValues = expandedObject[propertyURI];
                    if (!propertyValues)
                        return null;
                    if (!propertyValues.length)
                        return null;
                    var propertyValue = propertyValues[0];
                    return Util.parseValue(propertyValue, pointerLibrary);
                };
                Util.getPropertyPointer = function (expandedObject, propertyURI, pointerLibrary) {
                    var propertyValues = expandedObject[propertyURI];
                    if (!propertyValues)
                        return null;
                    for (var _i = 0, propertyValues_1 = propertyValues; _i < propertyValues_1.length; _i++) {
                        var propertyValue = propertyValues_1[_i];
                        if (!RDFNode.Factory.is(propertyValue))
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
                        listValues.push(Util.parseValue(listValue, pointerLibrary));
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
                        if (!RDFNode.Factory.is(listValue))
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
                Util.getProperties = function (expandedObject, propertyURI, pointerLibrary) {
                    var propertyValues = expandedObject[propertyURI];
                    if (!propertyValues)
                        return null;
                    if (!propertyValues.length)
                        return null;
                    var properties = [];
                    for (var _i = 0, propertyValues_3 = propertyValues; _i < propertyValues_3.length; _i++) {
                        var propertyValue = propertyValues_3[_i];
                        properties.push(Util.parseValue(propertyValue, pointerLibrary));
                    }
                    return properties;
                };
                Util.getPropertyPointers = function (expandedObject, propertyURI, pointerLibrary) {
                    var propertyValues = expandedObject[propertyURI];
                    if (!propertyValues)
                        return null;
                    if (!propertyValues.length)
                        return null;
                    var propertyPointers = [];
                    for (var _i = 0, propertyValues_4 = propertyValues; _i < propertyValues_4.length; _i++) {
                        var propertyValue = propertyValues_4[_i];
                        if (!RDFNode.Factory.is(propertyValue))
                            continue;
                        var pointer = pointerLibrary.getPointer(propertyValue["@id"]);
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
                        if (!RDFNode.Factory.is(propertyValue))
                            continue;
                        propertyURIs.push(propertyValue["@id"]);
                    }
                    return propertyURIs;
                };
                Util.getPropertyLiterals = function (expandedObject, propertyURI, literalType) {
                    var propertyValues = expandedObject[propertyURI];
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
                Util.getPropertyLanguageMap = function (expandedObject, propertyURI) {
                    var propertyValues = expandedObject[propertyURI];
                    if (!propertyValues)
                        return null;
                    var propertyLanguageMap = {};
                    for (var _i = 0, propertyValues_7 = propertyValues; _i < propertyValues_7.length; _i++) {
                        var propertyValue = propertyValues_7[_i];
                        if (!Literal.Factory.is(propertyValue))
                            continue;
                        if (!Literal.Factory.hasType(propertyValue, NS.XSD.DataType.string))
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
                Util.parseValue = function (propertyValue, pointerLibrary) {
                    if (Literal.Factory.is(propertyValue)) {
                        return Literal.Factory.parse(propertyValue);
                    }
                    else if (RDFNode.Factory.is(propertyValue)) {
                        return pointerLibrary.getPointer(propertyValue["@id"]);
                    }
                    else if (List.Factory.is(propertyValue)) {
                        var parsedValue = [];
                        var listValues = propertyValue["@list"];
                        for (var _i = 0, listValues_1 = listValues; _i < listValues_1.length; _i++) {
                            var listValue = listValues_1[_i];
                            parsedValue.push(this.parseValue(listValue, pointerLibrary));
                        }
                        return parsedValue;
                    }
                    else {
                    }
                };
                return Util;
            }());
            exports_1("Util", Util);
        }
    }
});

//# sourceMappingURL=Value.js.map
