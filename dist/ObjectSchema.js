"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Errors = require("./Errors");
var NS = require("./NS");
var RDF = require("./RDF");
var Utils = require("./Utils");
var ContainerType;
(function (ContainerType) {
    ContainerType[ContainerType["SET"] = 0] = "SET";
    ContainerType[ContainerType["LIST"] = 1] = "LIST";
    ContainerType[ContainerType["LANGUAGE"] = 2] = "LANGUAGE";
})(ContainerType = exports.ContainerType || (exports.ContainerType = {}));
var PointerType;
(function (PointerType) {
    PointerType[PointerType["ID"] = 0] = "ID";
    PointerType[PointerType["VOCAB"] = 1] = "VOCAB";
})(PointerType = exports.PointerType || (exports.PointerType = {}));
var DigestedObjectSchema = (function () {
    function DigestedObjectSchema() {
        this.base = "";
        this.vocab = null;
        this.language = null;
        this.prefixes = new Map();
        this.properties = new Map();
    }
    return DigestedObjectSchema;
}());
exports.DigestedObjectSchema = DigestedObjectSchema;
var DigestedPropertyDefinition = (function () {
    function DigestedPropertyDefinition() {
        this.uri = null;
        this.literal = null;
        this.literalType = null;
        this.pointerType = null;
        this.containerType = null;
    }
    return DigestedPropertyDefinition;
}());
exports.DigestedPropertyDefinition = DigestedPropertyDefinition;
var Digester = (function () {
    function Digester() {
    }
    Digester.digestSchema = function (schemaOrSchemas, generalSchema) {
        var schemas = Array.isArray(schemaOrSchemas) ? schemaOrSchemas : [schemaOrSchemas];
        var digestedSchemas = schemas
            .map(function (schema) { return Digester.digestSingleSchema(schema, generalSchema); });
        return Digester.combineDigestedObjectSchemas(digestedSchemas);
    };
    Digester.combineDigestedObjectSchemas = function (digestedSchemas) {
        if (digestedSchemas.length === 0)
            throw new Errors.IllegalArgumentError("At least one DigestedObjectSchema needs to be specified.");
        var target = new DigestedObjectSchema();
        target.vocab = digestedSchemas[0].vocab;
        target.base = digestedSchemas[0].base;
        target.language = digestedSchemas[0].language;
        for (var _i = 0, digestedSchemas_1 = digestedSchemas; _i < digestedSchemas_1.length; _i++) {
            var digestedSchema = digestedSchemas_1[_i];
            Utils.M.extend(target.prefixes, digestedSchema.prefixes);
            Utils.M.extend(target.properties, digestedSchema.properties);
        }
        return target;
    };
    Digester.digestPropertyDefinition = function (digestedSchema, propertyName, propertyDefinition, generalSchema) {
        var digestedDefinition = new DigestedPropertyDefinition();
        if ("@id" in propertyDefinition) {
            if (RDF.URI.Util.isPrefixed(propertyName))
                throw new Errors.IllegalArgumentError("A prefixed property cannot have assigned another URI.");
            if (!Utils.isString(propertyDefinition["@id"]))
                throw new Errors.IllegalArgumentError("@id needs to point to a string");
        }
        digestedDefinition.uri = Util.resolveURI(propertyDefinition["@id"] || propertyName, digestedSchema, generalSchema);
        if ("@type" in propertyDefinition) {
            if (!Utils.isString(propertyDefinition["@type"]))
                throw new Errors.IllegalArgumentError("@type needs to point to a string");
            if (propertyDefinition["@type"] === "@id" || propertyDefinition["@type"] === "@vocab") {
                digestedDefinition.literal = false;
                digestedDefinition.pointerType = (propertyDefinition["@type"] === "@id") ? PointerType.ID : PointerType.VOCAB;
            }
            else {
                digestedDefinition.literal = true;
                var type = propertyDefinition["@type"];
                digestedDefinition.literalType = RDF.URI.Util.isRelative(type) && type in NS.XSD.DataType ?
                    NS.XSD.DataType[type] : Util.resolveURI(type, digestedSchema, generalSchema);
            }
        }
        if ("@language" in propertyDefinition) {
            var language = propertyDefinition["@language"];
            if (language !== null && !Utils.isString(language))
                throw new Errors.IllegalArgumentError("@language needs to point to a string or null.");
            digestedDefinition.language = language;
        }
        if ("@container" in propertyDefinition) {
            switch (propertyDefinition["@container"]) {
                case "@set":
                    digestedDefinition.containerType = ContainerType.SET;
                    break;
                case "@list":
                    digestedDefinition.containerType = ContainerType.LIST;
                    break;
                case "@language":
                    if (Utils.isString(digestedDefinition.language))
                        throw new Errors.IllegalArgumentError("@container cannot be set to @language when the property definition already contains an @language tag.");
                    digestedDefinition.containerType = ContainerType.LANGUAGE;
                    break;
                default:
                    throw new Errors.IllegalArgumentError("@container needs to be equal to '@list', '@set', or '@language'");
            }
        }
        return digestedDefinition;
    };
    Digester.digestSingleSchema = function (schema, generalSchema) {
        var digestedSchema = new DigestedObjectSchema();
        for (var _i = 0, _a = ["@base", "@vocab"]; _i < _a.length; _i++) {
            var propertyName = _a[_i];
            if (!(propertyName in schema))
                continue;
            var value = schema[propertyName];
            if (value !== null && !Utils.isString(value))
                throw new Errors.IllegalArgumentError("The value of '" + propertyName + "' must be a string or null.");
            if ((propertyName === "@vocab" && value === "") || !RDF.URI.Util.isAbsolute(value) && !RDF.URI.Util.isBNodeID(value))
                throw new Errors.IllegalArgumentError("The value of '" + propertyName + "' must be an absolute URI" + (propertyName === "@base" ? " or an empty string" : "") + ".");
            digestedSchema[propertyName.substr(1)] = value;
        }
        digestedSchema.base = digestedSchema.base || "";
        if ("@language" in schema) {
            var value = schema["@language"];
            if (value !== null && !Utils.isString(value))
                throw new Errors.InvalidJSONLDSyntaxError("The value of '@language' must be a string or null.");
            digestedSchema.language = value;
        }
        var properties = [];
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
                if (RDF.URI.Util.isPrefixed(propertyName))
                    throw new Errors.IllegalArgumentError("A prefixed property cannot be equal to another URI.");
                var uri = Util.resolveURI(propertyValue, digestedSchema);
                digestedSchema.prefixes.set(propertyName, uri);
            }
            else if (!!propertyValue && Utils.isObject(propertyValue)) {
                properties.push([propertyName, propertyValue]);
            }
            else {
                throw new Errors.IllegalArgumentError("ObjectSchema Properties can only have string values or object values.");
            }
        }
        properties.forEach(function (_a) {
            var propertyName = _a[0], definition = _a[1];
            var digestedDefinition = Digester
                .digestPropertyDefinition(digestedSchema, propertyName, definition, generalSchema);
            digestedSchema.properties.set(propertyName, digestedDefinition);
        });
        return digestedSchema;
    };
    return Digester;
}());
exports.Digester = Digester;
var Util = (function () {
    function Util() {
    }
    Util.resolveURI = function (uri, schema, generalSchema) {
        if (RDF.URI.Util.isAbsolute(uri))
            return uri;
        if (RDF.URI.Util.isPrefixed(uri))
            return Util._resolvePrefixedName(uri, schema, generalSchema);
        return Util._resolveRelativeURI(uri, schema, generalSchema);
    };
    Util.resolvePrefixedURI = function (uri, schema) {
        if (!RDF.URI.Util.isPrefixed(uri))
            return uri;
        return this._resolvePrefixedName(uri, schema);
    };
    Util._resolveRelativeURI = function (uri, schema, generalSchema) {
        if (schema && schema.vocab !== null)
            return schema.vocab + uri;
        if (generalSchema && generalSchema.vocab !== null)
            return generalSchema.vocab + uri;
        return uri;
    };
    Util._resolvePrefixedName = function (uri, schema, generalSchema) {
        var _a = uri.split(":"), namespace = _a[0], localName = _a[1];
        if (schema && schema.prefixes.has(namespace))
            return schema.prefixes.get(namespace) + localName;
        if (generalSchema && generalSchema.prefixes.has(namespace))
            return generalSchema.prefixes.get(namespace) + localName;
        throw new Errors.IllegalArgumentError("The URI \"" + uri + "\" cannot be resolved, its prefix \"" + namespace + "\" has not been declared.");
    };
    return Util;
}());
exports.Util = Util;

//# sourceMappingURL=ObjectSchema.js.map
