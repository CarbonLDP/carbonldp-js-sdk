"use strict";
var Errors = require("./Errors");
var ObjectSchema = require("./ObjectSchema");
var NS = require("./NS");
var Pointer = require("./Pointer");
var RDF = require("./RDF");
var Utils = require("./Utils");
var Class = (function () {
    function Class(literalSerializers) {
        if (literalSerializers === void 0) { literalSerializers = null; }
        this._literalSerializers = !!literalSerializers ? literalSerializers : Class.getDefaultSerializers();
    }
    Object.defineProperty(Class.prototype, "literalSerializers", {
        get: function () { return this._literalSerializers; },
        enumerable: true,
        configurable: true
    });
    ;
    Class.getDefaultSerializers = function () {
        var literalSerializers = new Map();
        literalSerializers.set(NS.XSD.DataType.date, RDF.Literal.Serializers.XSD.dateSerializer);
        literalSerializers.set(NS.XSD.DataType.dateTime, RDF.Literal.Serializers.XSD.dateTimeSerializer);
        literalSerializers.set(NS.XSD.DataType.time, RDF.Literal.Serializers.XSD.timeSerializer);
        literalSerializers.set(NS.XSD.DataType.integer, RDF.Literal.Serializers.XSD.integerSerializer);
        literalSerializers.set(NS.XSD.DataType.int, RDF.Literal.Serializers.XSD.integerSerializer);
        literalSerializers.set(NS.XSD.DataType.unsignedInt, RDF.Literal.Serializers.XSD.unsignedIntegerSerializer);
        literalSerializers.set(NS.XSD.DataType.float, RDF.Literal.Serializers.XSD.floatSerializer);
        literalSerializers.set(NS.XSD.DataType.double, RDF.Literal.Serializers.XSD.floatSerializer);
        literalSerializers.set(NS.XSD.DataType.boolean, RDF.Literal.Serializers.XSD.booleanSerializer);
        literalSerializers.set(NS.XSD.DataType.string, RDF.Literal.Serializers.XSD.stringSerializer);
        return literalSerializers;
    };
    Class.prototype.compact = function (expandedObjectOrObjects, targetObjectOrObjectsOrDigestedContext, digestedSchemaOrPointerLibrary, pointerLibrary) {
        if (pointerLibrary === void 0) { pointerLibrary = null; }
        var targetObjectOrObjects = !pointerLibrary ? null : targetObjectOrObjectsOrDigestedContext;
        var digestedSchema = !pointerLibrary ? targetObjectOrObjectsOrDigestedContext : digestedSchemaOrPointerLibrary;
        pointerLibrary = !pointerLibrary ? digestedSchemaOrPointerLibrary : pointerLibrary;
        if (!Utils.isArray(expandedObjectOrObjects))
            return this.compactSingle(expandedObjectOrObjects, targetObjectOrObjects, digestedSchema, pointerLibrary);
        var expandedObjects = expandedObjectOrObjects;
        var targetObjects = !!targetObjectOrObjects ? targetObjectOrObjects : [];
        for (var i = 0, length_1 = expandedObjects.length; i < length_1; i++) {
            var expandedObject = expandedObjects[i];
            var targetObject = targetObjects[i] = !!targetObjects[i] ? targetObjects[i] : {};
            this.compactSingle(expandedObject, targetObject, digestedSchema, pointerLibrary);
        }
        return targetObjects;
    };
    Class.prototype.expand = function (compactedObjectOrObjects, digestedSchema, pointerValidator) {
        if (pointerValidator === void 0) { pointerValidator = null; }
        if (!Utils.isArray(compactedObjectOrObjects))
            return this.expandSingle(compactedObjectOrObjects, digestedSchema, pointerValidator);
    };
    Class.prototype.expandSingle = function (compactedObject, digestedSchema, pointerValidator) {
        var _this = this;
        var expandedObject = {};
        expandedObject["@id"] = !!compactedObject["id"] ? compactedObject["id"] : "";
        if (!!compactedObject["types"])
            expandedObject["@type"] = compactedObject["types"];
        Utils.forEachOwnProperty(compactedObject, function (propertyName, value) {
            if (propertyName === "id")
                return;
            if (digestedSchema.properties.has(propertyName)) {
                var definition = digestedSchema.properties.get(propertyName);
                var expandedValue = _this.expandProperty(value, definition, pointerValidator);
                if (!expandedValue)
                    return;
                expandedObject[definition.uri.toString()] = expandedValue;
            }
            else if (RDF.URI.Util.isAbsolute(propertyName)) {
                var expandedValue = _this.expandPropertyValues(value, pointerValidator);
                if (!expandedValue)
                    return;
                expandedObject[propertyName] = expandedValue;
            }
            else {
            }
        });
        return expandedObject;
    };
    Class.prototype.expandProperty = function (propertyValue, propertyDefinition, pointerValidator) {
        switch (propertyDefinition.containerType) {
            case null:
                if (propertyDefinition.literal) {
                    return this.expandPropertyLiteral(propertyValue, propertyDefinition.literalType.toString());
                }
                else if (propertyDefinition.literal === false) {
                    return this.expandPropertyPointer(propertyValue, pointerValidator);
                }
                else {
                    return this.expandPropertyValue(propertyValue, pointerValidator);
                }
            case ObjectSchema.ContainerType.LIST:
                if (propertyDefinition.literal) {
                    return this.expandPropertyLiteralList(propertyValue, propertyDefinition.literalType.toString());
                }
                else if (propertyDefinition.literal === false) {
                    return this.expandPropertyPointerList(propertyValue, pointerValidator);
                }
                else {
                    return this.expandPropertyList(propertyValue, pointerValidator);
                }
            case ObjectSchema.ContainerType.SET:
                if (propertyDefinition.literal) {
                    return this.expandPropertyLiterals(propertyValue, propertyDefinition.literalType.toString());
                }
                else if (propertyDefinition.literal === false) {
                    return this.expandPropertyPointers(propertyValue, pointerValidator);
                }
                else {
                    return this.expandPropertyValues(propertyValue, pointerValidator);
                }
            case ObjectSchema.ContainerType.LANGUAGE:
                return this.expandPropertyLanguageMap(propertyValue);
            default:
                throw new Errors.IllegalArgumentError("The containerType specified is not supported.");
        }
    };
    Class.prototype.expandPropertyValue = function (propertyValue, pointerValidator) {
        if (Utils.isArray(propertyValue)) {
            return this.expandPropertyValues(propertyValue, pointerValidator);
        }
        else {
            var expandedValue = this.expandValue(propertyValue, pointerValidator);
            if (!expandedValue)
                return null;
            return [expandedValue];
        }
    };
    Class.prototype.expandPropertyPointer = function (propertyValue, pointerValidator) {
        var expandedPointer = this.expandPointer(propertyValue, pointerValidator);
        if (!expandedPointer)
            return null;
        return [expandedPointer];
    };
    Class.prototype.expandPropertyLiteral = function (propertyValue, literalType) {
        var serializedValue = this.serializeLiteral(propertyValue, literalType);
        if (serializedValue === null)
            return null;
        return [
            { "@value": serializedValue, "@type": literalType },
        ];
    };
    Class.prototype.expandPropertyList = function (propertyValues, pointerValidator) {
        propertyValues = Utils.isArray(propertyValues) ? propertyValues : [propertyValues];
        var expandedArray = this.expandArray(propertyValues, pointerValidator);
        if (!expandedArray)
            return null;
        return [
            { "@list": expandedArray },
        ];
    };
    Class.prototype.expandPropertyPointerList = function (propertyValues, pointerValidator) {
        var listValues = this.expandPropertyPointers(propertyValues, pointerValidator);
        return [
            { "@list": listValues },
        ];
    };
    Class.prototype.expandPropertyLiteralList = function (propertyValues, literalType) {
        var listValues = this.expandPropertyLiterals(propertyValues, literalType);
        return [
            { "@list": listValues },
        ];
    };
    Class.prototype.expandPropertyValues = function (propertyValues, pointerValidator) {
        propertyValues = Utils.isArray(propertyValues) ? propertyValues : [propertyValues];
        var expandedArray = this.expandArray(propertyValues, pointerValidator);
        if (!expandedArray)
            return null;
        return expandedArray;
    };
    Class.prototype.expandPropertyPointers = function (propertyValues, pointerValidator) {
        propertyValues = Utils.isArray(propertyValues) ? propertyValues : [propertyValues];
        var expandedPointers = [];
        for (var _i = 0, propertyValues_1 = propertyValues; _i < propertyValues_1.length; _i++) {
            var propertyValue = propertyValues_1[_i];
            var expandedPointer = this.expandPointer(propertyValue, pointerValidator);
            if (!expandedPointer)
                continue;
            expandedPointers.push(expandedPointer);
        }
        return expandedPointers;
    };
    Class.prototype.expandPropertyLiterals = function (propertyValues, literalType) {
        propertyValues = Utils.isArray(propertyValues) ? propertyValues : [propertyValues];
        var listValues = [];
        for (var _i = 0, propertyValues_2 = propertyValues; _i < propertyValues_2.length; _i++) {
            var propertyValue = propertyValues_2[_i];
            var serializedValue = this.serializeLiteral(propertyValue, literalType);
            if (!serializedValue)
                continue;
            listValues.push({ "@value": serializedValue, "@type": literalType });
        }
        return listValues;
    };
    Class.prototype.expandPropertyLanguageMap = function (propertyValue) {
        var _this = this;
        if (!Utils.isObject(propertyValue)) {
            return null;
        }
        var mapValues = [];
        Utils.forEachOwnProperty(propertyValue, function (languageTag, value) {
            var serializedValue = _this.literalSerializers.get(NS.XSD.DataType.string).serialize(value);
            mapValues.push({ "@value": serializedValue, "@type": NS.XSD.DataType.string, "@language": languageTag });
        });
        return mapValues;
    };
    Class.prototype.serializeLiteral = function (propertyValue, literalType) {
        if (Pointer.Factory.is(propertyValue)) {
            return null;
        }
        if (!this.literalSerializers.has(literalType)) {
            return null;
        }
        try {
            return this.literalSerializers.get(literalType).serialize(propertyValue);
        }
        catch (error) {
            return null;
        }
    };
    Class.prototype.expandPointer = function (propertyValue, pointerValidator) {
        if (!Pointer.Factory.is(propertyValue)) {
            return null;
        }
        return { "@id": propertyValue.id };
    };
    Class.prototype.expandArray = function (propertyValue, pointerValidator) {
        var listValues = [];
        for (var _i = 0, propertyValue_1 = propertyValue; _i < propertyValue_1.length; _i++) {
            var listValue = propertyValue_1[_i];
            var expandedValue = this.expandValue(listValue, pointerValidator);
            if (!expandedValue)
                continue;
            listValues.push(expandedValue);
        }
        if (!listValues.length)
            return null;
        return listValues;
    };
    Class.prototype.expandValue = function (propertyValue, pointerValidator) {
        if (Utils.isArray(propertyValue)) {
            return null;
        }
        else if (Pointer.Factory.is(propertyValue)) {
            return this.expandPointer(propertyValue, pointerValidator);
        }
        else {
            return this.expandLiteral(propertyValue);
        }
    };
    Class.prototype.expandLiteral = function (literalValue) {
        var serializedValue;
        var literalType;
        switch (true) {
            case Utils.isFunction(literalValue):
                return null;
            case Utils.isDate(literalValue):
                literalType = NS.XSD.DataType.dateTime;
                break;
            case Utils.isNumber(literalValue):
                literalType = NS.XSD.DataType.float;
                break;
            case Utils.isBoolean(literalValue):
                literalType = NS.XSD.DataType.boolean;
                break;
            case Utils.isString(literalValue):
                literalType = NS.XSD.DataType.string;
                break;
            default:
                return null;
        }
        serializedValue = this.literalSerializers.get(literalType).serialize(literalValue);
        return { "@value": serializedValue, "@type": literalType };
    };
    Class.prototype.compactSingle = function (expandedObject, targetObject, digestedSchema, pointerLibrary) {
        var _this = this;
        var propertyURINameMap = this.getPropertyURINameMap(digestedSchema);
        if (!expandedObject["@id"])
            throw new Errors.IllegalArgumentError("The expandedObject doesn't have an @id defined.");
        targetObject["id"] = expandedObject["@id"];
        targetObject["types"] = !!expandedObject["@type"] ? expandedObject["@type"] : [];
        Utils.forEachOwnProperty(expandedObject, function (propertyURI, value) {
            if (propertyURI === "@id")
                return;
            if (propertyURI === "@type")
                return;
            if (propertyURINameMap.has(propertyURI)) {
                var propertyName = propertyURINameMap.get(propertyURI);
                _this.assignProperty(targetObject, expandedObject, propertyName, digestedSchema, pointerLibrary);
            }
            else {
                _this.assignURIProperty(targetObject, expandedObject, propertyURI, pointerLibrary);
            }
        });
        return targetObject;
    };
    Class.prototype.assignProperty = function (compactedObject, expandedObject, propertyName, digestedSchema, pointerLibrary) {
        var propertyDefinition = digestedSchema.properties.get(propertyName);
        compactedObject[propertyName] = this.getPropertyValue(expandedObject, propertyDefinition, pointerLibrary);
    };
    Class.prototype.assignURIProperty = function (compactedObject, expandedObject, propertyURI, pointerLibrary) {
        var guessedDefinition = new ObjectSchema.DigestedPropertyDefinition();
        guessedDefinition.uri = new RDF.URI.Class(propertyURI);
        guessedDefinition.containerType = this.getPropertyContainerType(expandedObject[propertyURI]);
        compactedObject[propertyURI] = this.getPropertyValue(expandedObject, guessedDefinition, pointerLibrary);
    };
    Class.prototype.getPropertyContainerType = function (propertyValues) {
        if (propertyValues.length === 1) {
            if (RDF.List.Factory.is(propertyValues[0]))
                return ObjectSchema.ContainerType.LIST;
        }
        else {
            return ObjectSchema.ContainerType.SET;
        }
        return null;
    };
    Class.prototype.getPropertyValue = function (expandedObject, propertyDefinition, pointerLibrary) {
        var propertyURI = propertyDefinition.uri.toString();
        switch (propertyDefinition.containerType) {
            case null:
                if (propertyDefinition.literal) {
                    return this.getPropertyLiteral(expandedObject, propertyURI, propertyDefinition.literalType.toString());
                }
                else if (propertyDefinition.literal === false) {
                    return this.getPropertyPointer(expandedObject, propertyURI, pointerLibrary);
                }
                else {
                    return this.getProperty(expandedObject, propertyURI, pointerLibrary);
                }
            case ObjectSchema.ContainerType.LIST:
                if (propertyDefinition.literal) {
                    return this.getPropertyLiteralList(expandedObject, propertyURI, propertyDefinition.literalType.toString());
                }
                else if (propertyDefinition.literal === false) {
                    return this.getPropertyPointerList(expandedObject, propertyURI, pointerLibrary);
                }
                else {
                    return this.getPropertyList(expandedObject, propertyURI, pointerLibrary);
                }
            case ObjectSchema.ContainerType.SET:
                if (propertyDefinition.literal) {
                    return this.getPropertyLiterals(expandedObject, propertyURI, propertyDefinition.literalType.toString());
                }
                else if (propertyDefinition.literal === false) {
                    return this.getPropertyPointers(expandedObject, propertyURI, pointerLibrary);
                }
                else {
                    return this.getProperties(expandedObject, propertyURI, pointerLibrary);
                }
            case ObjectSchema.ContainerType.LANGUAGE:
                return this.getPropertyLanguageMap(expandedObject, propertyURI);
            default:
                throw new Errors.IllegalArgumentError("The containerType specified is not supported.");
        }
    };
    Class.prototype.getProperty = function (expandedObject, propertyURI, pointerLibrary) {
        var propertyValues = expandedObject[propertyURI];
        if (!propertyValues)
            return null;
        if (!propertyValues.length)
            return null;
        var propertyValue = propertyValues[0];
        return this.parseValue(propertyValue, pointerLibrary);
    };
    Class.prototype.getPropertyPointer = function (expandedObject, propertyURI, pointerLibrary) {
        var propertyValues = expandedObject[propertyURI];
        if (!propertyValues)
            return null;
        for (var _i = 0, propertyValues_3 = propertyValues; _i < propertyValues_3.length; _i++) {
            var propertyValue = propertyValues_3[_i];
            if (!RDF.Node.Factory.is(propertyValue))
                continue;
            return pointerLibrary.getPointer(propertyValue["@id"]);
        }
        return null;
    };
    Class.prototype.getPropertyLiteral = function (expandedObject, propertyURI, literalType) {
        var propertyValues = expandedObject[propertyURI];
        if (!propertyValues)
            return null;
        for (var _i = 0, propertyValues_4 = propertyValues; _i < propertyValues_4.length; _i++) {
            var propertyValue = propertyValues_4[_i];
            if (!RDF.Literal.Factory.is(propertyValue))
                continue;
            if (!RDF.Literal.Factory.hasType(propertyValue, literalType))
                continue;
            return RDF.Literal.Factory.parse(propertyValue);
        }
        return null;
    };
    Class.prototype.getPropertyList = function (expandedObject, propertyURI, pointerLibrary) {
        var propertyValues = expandedObject[propertyURI];
        if (!propertyValues)
            return null;
        var propertyList = this.getList(propertyValues);
        if (!propertyList)
            return null;
        var listValues = [];
        for (var _i = 0, _a = propertyList["@list"]; _i < _a.length; _i++) {
            var listValue = _a[_i];
            listValues.push(this.parseValue(listValue, pointerLibrary));
        }
        return listValues;
    };
    Class.prototype.getPropertyPointerList = function (expandedObject, propertyURI, pointerLibrary) {
        var propertyValues = expandedObject[propertyURI];
        if (!propertyValues)
            return null;
        var propertyList = this.getList(propertyValues);
        if (!propertyList)
            return null;
        var listPointers = [];
        for (var _i = 0, _a = propertyList["@list"]; _i < _a.length; _i++) {
            var listValue = _a[_i];
            if (!RDF.Node.Factory.is(listValue))
                continue;
            var pointer = pointerLibrary.getPointer(listValue["@id"]);
            listPointers.push(pointer);
        }
        return listPointers;
    };
    Class.prototype.getPropertyLiteralList = function (expandedObject, propertyURI, literalType) {
        var propertyValues = expandedObject[propertyURI];
        if (!propertyValues)
            return null;
        var propertyList = this.getList(propertyValues);
        if (!propertyList)
            return null;
        var listLiterals = [];
        for (var _i = 0, _a = propertyList["@list"]; _i < _a.length; _i++) {
            var listValue = _a[_i];
            if (!RDF.Literal.Factory.is(listValue))
                continue;
            if (!RDF.Literal.Factory.hasType(listValue, literalType))
                continue;
            listLiterals.push(RDF.Literal.Factory.parse(listValue));
        }
        return listLiterals;
    };
    Class.prototype.getProperties = function (expandedObject, propertyURI, pointerLibrary) {
        var propertyValues = expandedObject[propertyURI];
        if (!propertyValues)
            return null;
        if (!propertyValues.length)
            return null;
        var properties = [];
        for (var _i = 0, propertyValues_5 = propertyValues; _i < propertyValues_5.length; _i++) {
            var propertyValue = propertyValues_5[_i];
            properties.push(this.parseValue(propertyValue, pointerLibrary));
        }
        return properties;
    };
    Class.prototype.getPropertyPointers = function (expandedObject, propertyURI, pointerLibrary) {
        var propertyValues = expandedObject[propertyURI];
        if (!propertyValues)
            return null;
        if (!propertyValues.length)
            return null;
        var propertyPointers = [];
        for (var _i = 0, propertyValues_6 = propertyValues; _i < propertyValues_6.length; _i++) {
            var propertyValue = propertyValues_6[_i];
            if (!RDF.Node.Factory.is(propertyValue))
                continue;
            var pointer = pointerLibrary.getPointer(propertyValue["@id"]);
            propertyPointers.push(pointer);
        }
        return propertyPointers;
    };
    Class.prototype.getPropertyLiterals = function (expandedObject, propertyURI, literalType) {
        var propertyValues = expandedObject[propertyURI];
        if (!propertyValues)
            return null;
        var propertyLiterals = [];
        for (var _i = 0, propertyValues_7 = propertyValues; _i < propertyValues_7.length; _i++) {
            var propertyValue = propertyValues_7[_i];
            if (!RDF.Literal.Factory.is(propertyValue))
                continue;
            if (!RDF.Literal.Factory.hasType(propertyValue, literalType))
                continue;
            propertyLiterals.push(RDF.Literal.Factory.parse(propertyValue));
        }
        return propertyLiterals;
    };
    Class.prototype.getPropertyLanguageMap = function (expandedObject, propertyURI) {
        var propertyValues = expandedObject[propertyURI];
        if (!propertyValues)
            return null;
        var propertyLanguageMap = {};
        for (var _i = 0, propertyValues_8 = propertyValues; _i < propertyValues_8.length; _i++) {
            var propertyValue = propertyValues_8[_i];
            if (!RDF.Literal.Factory.is(propertyValue))
                continue;
            if (!RDF.Literal.Factory.hasType(propertyValue, NS.XSD.DataType.string))
                continue;
            var languageTag = propertyValue["@language"];
            if (!languageTag)
                continue;
            propertyLanguageMap[languageTag] = RDF.Literal.Factory.parse(propertyValue);
        }
        return propertyLanguageMap;
    };
    Class.prototype.getList = function (propertyValues) {
        for (var _i = 0, propertyValues_9 = propertyValues; _i < propertyValues_9.length; _i++) {
            var propertyValue = propertyValues_9[_i];
            if (!RDF.List.Factory.is(propertyValue))
                continue;
            return propertyValue;
        }
        return null;
    };
    Class.prototype.getPropertyURINameMap = function (digestedSchema) {
        var map = new Map();
        digestedSchema.properties.forEach(function (definition, propertyName) {
            map.set(definition.uri.toString(), propertyName);
        });
        return map;
    };
    Class.prototype.parseValue = function (propertyValue, pointerLibrary) {
        if (RDF.Literal.Factory.is(propertyValue)) {
            return RDF.Literal.Factory.parse(propertyValue);
        }
        else if (RDF.Node.Factory.is(propertyValue)) {
            return pointerLibrary.getPointer(propertyValue["@id"]);
        }
        else if (RDF.List.Factory.is(propertyValue)) {
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
    return Class;
}());
exports.Class = Class;
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = Class;
