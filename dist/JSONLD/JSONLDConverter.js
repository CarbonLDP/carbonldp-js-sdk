"use strict";
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
var IllegalArgumentError_1 = require("../Errors/IllegalArgumentError");
var ContainerType_1 = require("../ObjectSchema/ContainerType");
var Pointer_1 = require("../Pointer/Pointer");
var List_1 = require("../RDF/List");
var XSDSerializers = __importStar(require("../RDF/Literal/Serializers/XSD"));
var Node_1 = require("../RDF/Node");
var URI_1 = require("../RDF/URI");
var Value_1 = require("../RDF/Value");
var Utils_1 = require("../Utils");
var XSD_1 = require("../Vocabularies/XSD");
var Utils_2 = require("./Utils");
var JSONLDConverter = (function () {
    function JSONLDConverter(literalSerializers) {
        this._literalSerializers = literalSerializers ?
            Utils_1.MapUtils.extend(new Map(), literalSerializers) :
            JSONLDConverter.getDefaultSerializers();
    }
    Object.defineProperty(JSONLDConverter.prototype, "literalSerializers", {
        get: function () { return this._literalSerializers; },
        enumerable: true,
        configurable: true
    });
    JSONLDConverter.getDefaultSerializers = function () {
        var literalSerializers = new Map();
        literalSerializers.set(XSD_1.XSD.date, XSDSerializers.dateSerializer);
        literalSerializers.set(XSD_1.XSD.dateTime, XSDSerializers.dateTimeSerializer);
        literalSerializers.set(XSD_1.XSD.time, XSDSerializers.timeSerializer);
        literalSerializers.set(XSD_1.XSD.integer, XSDSerializers.integerSerializer);
        literalSerializers.set(XSD_1.XSD.int, XSDSerializers.integerSerializer);
        literalSerializers.set(XSD_1.XSD.unsignedInt, XSDSerializers.unsignedIntegerSerializer);
        literalSerializers.set(XSD_1.XSD.long, XSDSerializers.longSerializer);
        literalSerializers.set(XSD_1.XSD.unsignedLong, XSDSerializers.unsignedLongSerializer);
        literalSerializers.set(XSD_1.XSD.float, XSDSerializers.floatSerializer);
        literalSerializers.set(XSD_1.XSD.double, XSDSerializers.floatSerializer);
        literalSerializers.set(XSD_1.XSD.boolean, XSDSerializers.booleanSerializer);
        literalSerializers.set(XSD_1.XSD.string, XSDSerializers.stringSerializer);
        return literalSerializers;
    };
    JSONLDConverter.prototype.compact = function (expandedObjectOrObjects, targetObjectOrObjectsOrDigestedContext, digestedSchemaOrPointerLibrary, pointerLibrary, strict) {
        if (pointerLibrary === void 0) { pointerLibrary = null; }
        var targetObjectOrObjects = !pointerLibrary ? null : targetObjectOrObjectsOrDigestedContext;
        var digestedSchema = !pointerLibrary ? targetObjectOrObjectsOrDigestedContext : digestedSchemaOrPointerLibrary;
        pointerLibrary = !pointerLibrary ? digestedSchemaOrPointerLibrary : pointerLibrary;
        if (!Array.isArray(expandedObjectOrObjects))
            return this.compactSingle(expandedObjectOrObjects, targetObjectOrObjects, digestedSchema, pointerLibrary, strict);
        var expandedObjects = expandedObjectOrObjects;
        var targetObjects = !!targetObjectOrObjects ? targetObjectOrObjects : [];
        for (var i = 0, length_1 = expandedObjects.length; i < length_1; i++) {
            var expandedObject = expandedObjects[i];
            var targetObject = targetObjects[i] = !!targetObjects[i] ? targetObjects[i] : {};
            this.compactSingle(expandedObject, targetObject, digestedSchema, pointerLibrary, strict);
        }
        return targetObjects;
    };
    JSONLDConverter.prototype.expand = function (compactedObjectOrObjects, generalSchema, digestedSchema) {
        if (!Array.isArray(compactedObjectOrObjects))
            return this.expandSingle(compactedObjectOrObjects, generalSchema, digestedSchema);
    };
    JSONLDConverter.prototype.expandSingle = function (compactedObject, generalSchema, digestedSchema) {
        var _this = this;
        var expandedObject = {};
        expandedObject["@id"] = !!compactedObject["$id"] ? compactedObject["$id"] : "";
        if (compactedObject["types"]) {
            var types = Array.isArray(compactedObject["types"]) ?
                compactedObject["types"] : [compactedObject["types"]];
            if (types.length)
                expandedObject["@type"] = types
                    .map(function (type) { return generalSchema.resolveURI(type, { vocab: true, base: true }); });
        }
        Utils_1.forEachOwnProperty(compactedObject, function (propertyName, value) {
            if (propertyName === "$id")
                return;
            if (propertyName === "types")
                return;
            var expandedPropertyName = digestedSchema.resolveURI(propertyName, { vocab: true });
            if (URI_1.URI.isRelative(expandedPropertyName))
                return;
            var expandedValue = _this.expandProperty(propertyName, value, digestedSchema, generalSchema);
            if (expandedValue === null)
                return;
            expandedObject[expandedPropertyName] = expandedValue;
        });
        return expandedObject;
    };
    JSONLDConverter.prototype.expandProperty = function (propertyName, propertyValue, digestedSchema, generalSchema) {
        var definition = digestedSchema.properties.get(propertyName);
        var propertyContainer = definition ? definition.containerType : void 0;
        if (propertyContainer === ContainerType_1.ContainerType.LANGUAGE)
            return this.expandPropertyLanguageMap(propertyValue);
        propertyValue = Array.isArray(propertyValue) ? propertyValue : [propertyValue];
        if (propertyContainer === null)
            propertyValue = [propertyValue[0]];
        var propertyType = definition ? definition.literal : null;
        var expandedValues = propertyType === true ?
            this.expandPropertyLiteral(propertyValue, definition, digestedSchema) :
            propertyType === false ?
                this.expandPropertyPointer(propertyValue, digestedSchema, generalSchema) :
                this.expandPropertyValue(propertyValue, digestedSchema, generalSchema);
        var filteredValues = expandedValues.filter(function (value) { return value !== null; });
        if (!filteredValues.length)
            return null;
        if (propertyContainer === ContainerType_1.ContainerType.LIST)
            return [
                { "@list": filteredValues },
            ];
        return filteredValues;
    };
    JSONLDConverter.prototype.expandPropertyValue = function (propertyValue, digestedSchema, generalSchema) {
        var _this = this;
        return propertyValue.map(function (value) { return _this.expandValue(value, digestedSchema, generalSchema); });
    };
    JSONLDConverter.prototype.expandPropertyPointer = function (propertyValue, digestedSchema, generalSchema) {
        var _this = this;
        return propertyValue.map(function (value) { return _this.expandPointerValue(value, digestedSchema, generalSchema); });
    };
    JSONLDConverter.prototype.expandPropertyLiteral = function (propertyValue, definition, digestedSchema) {
        var _this = this;
        var literalType = digestedSchema.resolveURI(definition.literalType, { vocab: true, base: true });
        var expandedValues = propertyValue.map(function (value) { return _this.expandLiteralValue(value, literalType); });
        if (definition.language)
            expandedValues.forEach(function (value) { return value["@language"] = definition.language; });
        return expandedValues;
    };
    JSONLDConverter.prototype.expandPropertyLanguageMap = function (propertyValue) {
        var _this = this;
        if (!Utils_1.isObject(propertyValue)) {
            return null;
        }
        var mapValues = [];
        Utils_1.forEachOwnProperty(propertyValue, function (languageTag, value) {
            var serializedValue = _this.literalSerializers.get(XSD_1.XSD.string).serialize(value);
            mapValues.push({ "@value": serializedValue, "@type": XSD_1.XSD.string, "@language": languageTag });
        });
        return mapValues;
    };
    JSONLDConverter.prototype.expandPointerValue = function (propertyValue, digestedSchema, generalSchema) {
        var isStringID = Utils_1.isString(propertyValue);
        var id = Pointer_1.Pointer.is(propertyValue) ?
            propertyValue.$id :
            isStringID ?
                propertyValue :
                null;
        if (!id)
            return null;
        var resolved = generalSchema.resolveURI(id, { vocab: isStringID });
        return { "@id": resolved };
    };
    JSONLDConverter.prototype.expandValue = function (propertyValue, digestedSchema, generalSchema) {
        if (Array.isArray(propertyValue))
            return null;
        return Pointer_1.Pointer.is(propertyValue) ?
            this.expandPointerValue(propertyValue, generalSchema, digestedSchema) :
            this.expandLiteralValue(propertyValue, Utils_2.guessXSDType(propertyValue));
    };
    JSONLDConverter.prototype.expandLiteralValue = function (literalValue, literalType) {
        if (literalType === null)
            return null;
        if (!this.literalSerializers.has(literalType))
            return null;
        var serializedValue = this.literalSerializers
            .get(literalType)
            .serialize(literalValue);
        return { "@value": serializedValue, "@type": literalType };
    };
    JSONLDConverter.prototype.compactSingle = function (expandedObject, targetObject, digestedSchema, pointerLibrary, strict) {
        var _this = this;
        if (!expandedObject["@id"])
            throw new IllegalArgumentError_1.IllegalArgumentError("The expandedObject doesn't have an @id defined.");
        targetObject["$id"] = expandedObject["@id"];
        targetObject["types"] = !!expandedObject["@type"] ? expandedObject["@type"] : [];
        var propertyURINameMap = this.getPropertyURINameMap(digestedSchema);
        Utils_1.forEachOwnProperty(expandedObject, function (propertyURI, propertyValues) {
            if (propertyURI === "@id")
                return;
            if (propertyURI === "@type")
                return;
            if (!propertyURINameMap.has(propertyURI) && strict)
                return;
            var propertyName = propertyURINameMap.has(propertyURI) ?
                propertyURINameMap.get(propertyURI) :
                digestedSchema.vocab !== null ?
                    URI_1.URI.getRelativeURI(propertyURI, digestedSchema.vocab) :
                    propertyURI;
            var targetValue = _this.getPropertyValue(propertyName, propertyValues, digestedSchema, pointerLibrary);
            if (targetValue === null || targetValue === void 0)
                return;
            targetObject[propertyName] = targetValue;
        });
        return targetObject;
    };
    JSONLDConverter.prototype.getPropertyContainerType = function (propertyValues) {
        if (propertyValues.length === 1) {
            if (List_1.RDFList.is(propertyValues[0]))
                return ContainerType_1.ContainerType.LIST;
        }
        else {
            return ContainerType_1.ContainerType.SET;
        }
        return null;
    };
    JSONLDConverter.prototype.getPropertyValue = function (propertyName, propertyValues, digestedSchema, pointerLibrary) {
        var definition = digestedSchema.properties.get(propertyName);
        var propertyContainer = definition ?
            definition.containerType :
            this.getPropertyContainerType(propertyValues);
        if (propertyContainer === ContainerType_1.ContainerType.LANGUAGE)
            return Node_1.RDFNode.getPropertyLanguageMap(propertyValues);
        if (propertyContainer === ContainerType_1.ContainerType.LIST) {
            var list = Node_1.RDFNode.getList(propertyValues);
            if (!list)
                return null;
            propertyValues = list["@list"];
        }
        var propertyType = definition ? definition.literal : null;
        if (propertyType === true && definition.language) {
            propertyValues = propertyValues.filter(function (value) { return value["@language"] === definition.language; });
        }
        if (propertyContainer === null)
            propertyValues = [propertyValues[0]];
        var compactedValues = propertyType === true ?
            this.compactPropertyLiteral(propertyValues, definition, digestedSchema) :
            propertyType === false ?
                this.getPropertyPointers(propertyValues, pointerLibrary) :
                this.getProperties(propertyValues, pointerLibrary);
        if (!compactedValues)
            return null;
        var filteredValues = compactedValues.filter(function (value) { return value !== null; });
        if (!filteredValues.length)
            return null;
        if (propertyContainer === null)
            return filteredValues[0];
        return filteredValues;
    };
    JSONLDConverter.prototype.getPropertyURINameMap = function (digestedSchema) {
        var map = new Map();
        digestedSchema.properties.forEach(function (definition, propertyName) {
            var uri = digestedSchema.resolveURI(definition.uri, { vocab: true });
            map.set(uri, propertyName);
        });
        return map;
    };
    JSONLDConverter.prototype.compactPropertyLiteral = function (propertyValues, definition, digestedSchema) {
        var literalType = definition.literalType === null ?
            XSD_1.XSD.string : digestedSchema.resolveURI(definition.literalType, { vocab: true, base: true });
        return Node_1.RDFNode.getPropertyLiterals(propertyValues, literalType);
    };
    JSONLDConverter.prototype.getProperties = function (propertyValues, pointerLibrary) {
        if (!Array.isArray(propertyValues))
            return;
        return propertyValues
            .map(Value_1.RDFValue.parse.bind(null, pointerLibrary))
            .filter(function (value) { return !Utils_1.isNull(value); });
    };
    JSONLDConverter.prototype.getPropertyPointers = function (propertyValues, pointerLibrary) {
        if (!Array.isArray(propertyValues))
            return;
        return propertyValues
            .filter(Node_1.RDFNode.is)
            .map(Node_1.RDFNode.getID)
            .map(pointerLibrary.getPointer, pointerLibrary)
            .filter(function (pointer) { return !Utils_1.isNull(pointer); });
    };
    return JSONLDConverter;
}());
exports.JSONLDConverter = JSONLDConverter;

//# sourceMappingURL=JSONLDConverter.js.map
