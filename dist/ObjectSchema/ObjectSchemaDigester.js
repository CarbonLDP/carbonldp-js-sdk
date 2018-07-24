"use strict";
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
}
Object.defineProperty(exports, "__esModule", { value: true });
var IllegalArgumentError_1 = require("../Errors/IllegalArgumentError");
var InvalidJSONLDSyntaxError_1 = require("../Errors/InvalidJSONLDSyntaxError");
var URI_1 = require("../RDF/URI");
var Utils = __importStar(require("../Utils"));
var XSD_1 = require("../Vocabularies/XSD");
var ContainerType_1 = require("./ContainerType");
var DigestedObjectSchema_1 = require("./DigestedObjectSchema");
var DigestedObjectSchemaProperty_1 = require("./DigestedObjectSchemaProperty");
var ObjectSchemaUtils_1 = require("./ObjectSchemaUtils");
var PointerType_1 = require("./PointerType");
var ObjectSchemaDigester = (function () {
    function ObjectSchemaDigester() {
    }
    ObjectSchemaDigester.digestSchema = function (schemas) {
        if (!Array.isArray(schemas))
            return ObjectSchemaDigester._digestSchema(schemas);
        var digestedSchemas = schemas
            .map(function (schema) { return ObjectSchemaDigester._digestSchema(schema); });
        return ObjectSchemaDigester._combineSchemas(digestedSchemas);
    };
    ObjectSchemaDigester.digestProperty = function (name, definition, digestedSchema) {
        var digestedDefinition = new DigestedObjectSchemaProperty_1.DigestedObjectSchemaProperty();
        if ("@id" in definition) {
            var uri = definition["@id"];
            if (URI_1.URI.isPrefixed(name))
                throw new IllegalArgumentError_1.IllegalArgumentError("A prefixed property cannot have assigned another URI.");
            if (!Utils.isString(uri))
                throw new IllegalArgumentError_1.IllegalArgumentError("@id needs to point to a string");
            digestedDefinition.uri = uri;
        }
        else {
            digestedDefinition.uri = name;
        }
        if ("@type" in definition) {
            var type = definition["@type"];
            if (!Utils.isString(type))
                throw new IllegalArgumentError_1.IllegalArgumentError("@type needs to point to a string");
            if (type === "@id" || type === "@vocab") {
                digestedDefinition.literal = false;
                digestedDefinition.pointerType = type === "@id" ? PointerType_1.PointerType.ID : PointerType_1.PointerType.VOCAB;
            }
            else {
                if (URI_1.URI.isRelative(type) && type in XSD_1.XSD)
                    type = XSD_1.XSD[type];
                digestedDefinition.literal = true;
                digestedDefinition.literalType = type;
            }
        }
        if ("@language" in definition) {
            var language = definition["@language"];
            if (language !== null && !Utils.isString(language))
                throw new IllegalArgumentError_1.IllegalArgumentError("@language needs to point to a string or null.");
            digestedDefinition.literal = true;
            digestedDefinition.language = language;
        }
        if ("@container" in definition) {
            switch (definition["@container"]) {
                case "@set":
                    digestedDefinition.containerType = ContainerType_1.ContainerType.SET;
                    break;
                case "@list":
                    digestedDefinition.containerType = ContainerType_1.ContainerType.LIST;
                    break;
                case "@language":
                    if (Utils.isString(digestedDefinition.language))
                        throw new IllegalArgumentError_1.IllegalArgumentError("@container cannot be set to @language when the property definition already contains an @language tag.");
                    digestedDefinition.containerType = ContainerType_1.ContainerType.LANGUAGE;
                    break;
                default:
                    throw new IllegalArgumentError_1.IllegalArgumentError("@container needs to be equal to '@list', '@set', or '@language'");
            }
        }
        return digestedSchema ?
            ObjectSchemaUtils_1.ObjectSchemaUtils._resolveProperty(digestedSchema, digestedDefinition, true) :
            digestedDefinition;
    };
    ObjectSchemaDigester.combineDigestedObjectSchemas = function (digestedSchemas) {
        if (digestedSchemas.length === 0)
            throw new IllegalArgumentError_1.IllegalArgumentError("At least one DigestedObjectSchema needs to be specified.");
        digestedSchemas.unshift(new DigestedObjectSchema_1.DigestedObjectSchema());
        return ObjectSchemaDigester._combineSchemas(digestedSchemas);
    };
    ObjectSchemaDigester._digestSchema = function (schema) {
        var digestedSchema = new DigestedObjectSchema_1.DigestedObjectSchema();
        for (var _i = 0, _a = ["@base", "@vocab"]; _i < _a.length; _i++) {
            var propertyName = _a[_i];
            if (!(propertyName in schema))
                continue;
            var value = schema[propertyName];
            if (value !== null && !Utils.isString(value))
                throw new IllegalArgumentError_1.IllegalArgumentError("The value of '" + propertyName + "' must be a string or null.");
            if ((propertyName === "@vocab" && value === "") || !URI_1.URI.isAbsolute(value) && !URI_1.URI.isBNodeID(value))
                throw new IllegalArgumentError_1.IllegalArgumentError("The value of '" + propertyName + "' must be an absolute URI" + (propertyName === "@base" ? " or an empty string" : "") + ".");
            digestedSchema[propertyName.substr(1)] = value;
        }
        digestedSchema.base = digestedSchema.base || "";
        if ("@language" in schema) {
            var value = schema["@language"];
            if (value !== null && !Utils.isString(value))
                throw new InvalidJSONLDSyntaxError_1.InvalidJSONLDSyntaxError("The value of '@language' must be a string or null.");
            digestedSchema.language = value;
        }
        for (var propertyName in schema) {
            if (!schema.hasOwnProperty(propertyName))
                continue;
            if (propertyName === "@reverse")
                continue;
            if (propertyName === "@index")
                continue;
            if (propertyName === "@base")
                continue;
            if (propertyName === "@vocab")
                continue;
            if (propertyName === "@language")
                continue;
            var propertyValue = schema[propertyName];
            if (Utils.isString(propertyValue)) {
                if (URI_1.URI.isPrefixed(propertyName))
                    throw new IllegalArgumentError_1.IllegalArgumentError("A prefixed property cannot be equal to another URI.");
                digestedSchema.prefixes.set(propertyName, propertyValue);
            }
            else if (!!propertyValue && Utils.isObject(propertyValue)) {
                var definition = ObjectSchemaDigester.digestProperty(propertyName, propertyValue);
                digestedSchema.properties.set(propertyName, definition);
            }
            else {
                throw new IllegalArgumentError_1.IllegalArgumentError("ObjectSchema Properties can only have string values or object values.");
            }
        }
        return digestedSchema;
    };
    ObjectSchemaDigester._combineSchemas = function (digestedSchemas) {
        var targetSchema = digestedSchemas[0], restSchemas = digestedSchemas.slice(1);
        restSchemas.forEach(function (schema) {
            if (schema.vocab !== void 0)
                targetSchema.vocab = schema.vocab;
            if (schema.base !== "")
                targetSchema.base = schema.base;
            if (schema.language !== null)
                targetSchema.language = schema.language;
            Utils.MapUtils.extend(targetSchema.prefixes, schema.prefixes);
            Utils.MapUtils.extend(targetSchema.properties, schema.properties);
        });
        return targetSchema;
    };
    return ObjectSchemaDigester;
}());
exports.ObjectSchemaDigester = ObjectSchemaDigester;

//# sourceMappingURL=ObjectSchemaDigester.js.map
