"use strict";
var Errors = require("./../Errors");
var ObjectSchema = require("./../ObjectSchema");
var NS = require("./../NS");
var Pointer = require("./../Pointer");
var RDF = require("./../RDF");
var Utils = require("./../Utils");
var Class = (function () {
    function Class(literalSerializers) {
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
        literalSerializers.set(NS.XSD.DataType.long, RDF.Literal.Serializers.XSD.integerSerializer);
        literalSerializers.set(NS.XSD.DataType.unsignedLong, RDF.Literal.Serializers.XSD.unsignedIntegerSerializer);
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
    Class.prototype.expand = function (compactedObjectOrObjects, generalSchema, digestedSchema) {
        if (!Utils.isArray(compactedObjectOrObjects))
            return this.expandSingle(compactedObjectOrObjects, generalSchema, digestedSchema);
    };
    Class.prototype.expandSingle = function (compactedObject, generalSchema, digestedSchema) {
        var _this = this;
        var expandedObject = {};
        expandedObject["@id"] = !!compactedObject["id"] ? compactedObject["id"] : "";
        if (!!compactedObject["types"])
            expandedObject["@type"] = compactedObject["types"].map(function (type) { return ObjectSchema.Util.resolveURI(type, generalSchema); });
        Utils.forEachOwnProperty(compactedObject, function (propertyName, value) {
            if (propertyName === "id")
                return;
            if (propertyName === "types")
                return;
            var expandedValue;
            if (digestedSchema.properties.has(propertyName)) {
                var definition = digestedSchema.properties.get(propertyName);
                expandedValue = _this.expandProperty(value, definition, generalSchema, digestedSchema);
                propertyName = definition.uri.toString();
            }
            else if (RDF.URI.Util.isAbsolute(propertyName)) {
                expandedValue = _this.expandPropertyValues(value, generalSchema, digestedSchema);
            }
            else if (digestedSchema.vocab) {
                expandedValue = _this.expandPropertyValue(value, generalSchema, digestedSchema);
                propertyName = ObjectSchema.Util.resolveURI(propertyName, generalSchema);
            }
            if (!expandedValue)
                return;
            expandedObject[propertyName] = expandedValue;
        });
        return expandedObject;
    };
    Class.prototype.expandProperty = function (propertyValue, propertyDefinition, generalSchema, digestedSchema) {
        switch (propertyDefinition.containerType) {
            case null:
                if (propertyDefinition.literal) {
                    return this.expandPropertyLiteral(propertyValue, propertyDefinition.literalType.toString());
                }
                else if (propertyDefinition.literal === false) {
                    return this.expandPropertyPointer(propertyValue, generalSchema, digestedSchema);
                }
                else {
                    return this.expandPropertyValue(propertyValue, generalSchema, digestedSchema);
                }
            case ObjectSchema.ContainerType.LIST:
                if (propertyDefinition.literal) {
                    return this.expandPropertyLiteralList(propertyValue, propertyDefinition.literalType.toString());
                }
                else if (propertyDefinition.literal === false) {
                    return this.expandPropertyPointerList(propertyValue, generalSchema, digestedSchema);
                }
                else {
                    return this.expandPropertyList(propertyValue, generalSchema, digestedSchema);
                }
            case ObjectSchema.ContainerType.SET:
                if (propertyDefinition.literal) {
                    return this.expandPropertyLiterals(propertyValue, propertyDefinition.literalType.toString());
                }
                else if (propertyDefinition.literal === false) {
                    return this.expandPropertyPointers(propertyValue, generalSchema, digestedSchema);
                }
                else {
                    return this.expandPropertyValues(propertyValue, generalSchema, digestedSchema);
                }
            case ObjectSchema.ContainerType.LANGUAGE:
                return this.expandPropertyLanguageMap(propertyValue);
            default:
                throw new Errors.IllegalArgumentError("The containerType specified is not supported.");
        }
    };
    Class.prototype.expandPropertyValue = function (propertyValue, generalSchema, digestedSchema) {
        if (Utils.isArray(propertyValue)) {
            return this.expandPropertyValues(propertyValue, generalSchema, digestedSchema);
        }
        else {
            var expandedValue = this.expandValue(propertyValue, generalSchema, digestedSchema);
            if (!expandedValue)
                return null;
            return [expandedValue];
        }
    };
    Class.prototype.expandPropertyPointer = function (propertyValue, generalSchema, digestedSchema) {
        var expandedPointer = this.expandPointer(propertyValue, generalSchema, digestedSchema);
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
    Class.prototype.expandPropertyList = function (propertyValues, generalSchema, digestedSchema) {
        propertyValues = Utils.isArray(propertyValues) ? propertyValues : [propertyValues];
        var expandedArray = this.expandArray(propertyValues, generalSchema, digestedSchema);
        if (!expandedArray)
            return null;
        return [
            { "@list": expandedArray },
        ];
    };
    Class.prototype.expandPropertyPointerList = function (propertyValues, generalSchema, digestedSchema) {
        var listValues = this.expandPropertyPointers(propertyValues, generalSchema, digestedSchema);
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
    Class.prototype.expandPropertyValues = function (propertyValues, generalSchema, digestedSchema) {
        propertyValues = Utils.isArray(propertyValues) ? propertyValues : [propertyValues];
        var expandedArray = this.expandArray(propertyValues, generalSchema, digestedSchema);
        if (!expandedArray)
            return null;
        return expandedArray;
    };
    Class.prototype.expandPropertyPointers = function (propertyValues, generalSchema, digestedSchema) {
        propertyValues = Utils.isArray(propertyValues) ? propertyValues : [propertyValues];
        var expandedPointers = [];
        for (var _i = 0, propertyValues_1 = propertyValues; _i < propertyValues_1.length; _i++) {
            var propertyValue = propertyValues_1[_i];
            var expandedPointer = this.expandPointer(propertyValue, generalSchema, digestedSchema);
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
    Class.prototype.expandPointer = function (propertyValue, generalSchema, digestedSchema) {
        var notPointer = Utils.isString(propertyValue);
        var id = Pointer.Factory.is(propertyValue) ? propertyValue.id : Utils.isString(propertyValue) ? propertyValue : null;
        if (id === null) {
            return null;
        }
        id = ObjectSchema.Digester.resolvePrefixedURI(id, generalSchema);
        if (generalSchema.properties.has(id)) {
            var definition = generalSchema.properties.get(id);
            if (definition.uri)
                id = definition.uri.stringValue;
        }
        if (notPointer && !!digestedSchema.vocab)
            id = ObjectSchema.Util.resolveURI(id, generalSchema);
        return { "@id": id };
    };
    Class.prototype.expandArray = function (propertyValue, generalSchema, digestedSchema) {
        var listValues = [];
        for (var _i = 0, propertyValue_1 = propertyValue; _i < propertyValue_1.length; _i++) {
            var listValue = propertyValue_1[_i];
            var expandedValue = this.expandValue(listValue, generalSchema, digestedSchema);
            if (!expandedValue)
                continue;
            listValues.push(expandedValue);
        }
        if (!listValues.length)
            return null;
        return listValues;
    };
    Class.prototype.expandValue = function (propertyValue, generalSchema, digestedSchema) {
        if (Utils.isArray(propertyValue)) {
            return null;
        }
        else if (Pointer.Factory.is(propertyValue)) {
            return this.expandPointer(propertyValue, generalSchema, digestedSchema);
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
                var propertyName = digestedSchema.vocab ? RDF.URI.Util.getRelativeURI(propertyURI, digestedSchema.vocab) : propertyURI;
                _this.assignURIProperty(targetObject, expandedObject, propertyURI, propertyName, pointerLibrary);
            }
        });
        return targetObject;
    };
    Class.prototype.assignProperty = function (compactedObject, expandedObject, propertyName, digestedSchema, pointerLibrary) {
        var propertyDefinition = digestedSchema.properties.get(propertyName);
        compactedObject[propertyName] = this.getPropertyValue(expandedObject, propertyDefinition, pointerLibrary);
    };
    Class.prototype.assignURIProperty = function (compactedObject, expandedObject, propertyURI, propertyName, pointerLibrary) {
        var guessedDefinition = new ObjectSchema.DigestedPropertyDefinition();
        guessedDefinition.uri = new RDF.URI.Class(propertyURI);
        guessedDefinition.containerType = this.getPropertyContainerType(expandedObject[propertyURI]);
        compactedObject[propertyName] = this.getPropertyValue(expandedObject, guessedDefinition, pointerLibrary);
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
                    return RDF.Node.Util.getPropertyLiteral(expandedObject, propertyURI, propertyDefinition.literalType.toString());
                }
                else if (propertyDefinition.literal === false) {
                    return RDF.Node.Util.getPropertyPointer(expandedObject, propertyURI, pointerLibrary);
                }
                else {
                    return RDF.Node.Util.getProperty(expandedObject, propertyURI, pointerLibrary);
                }
            case ObjectSchema.ContainerType.LIST:
                if (propertyDefinition.literal) {
                    return RDF.Node.Util.getPropertyLiteralList(expandedObject, propertyURI, propertyDefinition.literalType.toString());
                }
                else if (propertyDefinition.literal === false) {
                    return RDF.Node.Util.getPropertyPointerList(expandedObject, propertyURI, pointerLibrary);
                }
                else {
                    return RDF.Node.Util.getPropertyList(expandedObject, propertyURI, pointerLibrary);
                }
            case ObjectSchema.ContainerType.SET:
                if (propertyDefinition.literal) {
                    return RDF.Node.Util.getPropertyLiterals(expandedObject, propertyURI, propertyDefinition.literalType.toString());
                }
                else if (propertyDefinition.literal === false) {
                    return RDF.Node.Util.getPropertyPointers(expandedObject, propertyURI, pointerLibrary);
                }
                else {
                    return RDF.Node.Util.getProperties(expandedObject, propertyURI, pointerLibrary);
                }
            case ObjectSchema.ContainerType.LANGUAGE:
                return RDF.Node.Util.getPropertyLanguageMap(expandedObject, propertyURI);
            default:
                throw new Errors.IllegalArgumentError("The containerType specified is not supported.");
        }
    };
    Class.prototype.getPropertyURINameMap = function (digestedSchema) {
        var map = new Map();
        digestedSchema.properties.forEach(function (definition, propertyName) {
            map.set(definition.uri.toString(), propertyName);
        });
        return map;
    };
    return Class;
}());
exports.Class = Class;
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = Class;

//# sourceMappingURL=Converter.js.map
