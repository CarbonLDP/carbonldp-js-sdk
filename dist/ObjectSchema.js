"use strict";
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
        this.prefixedURIs = new Map();
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
    Digester.digestSchema = function (schemaOrSchemas) {
        if (!Utils.isArray(schemaOrSchemas))
            return Digester.digestSingleSchema(schemaOrSchemas);
        var digestedSchemas = [];
        for (var _i = 0, _a = schemaOrSchemas; _i < _a.length; _i++) {
            var schema = _a[_i];
            digestedSchemas.push(Digester.digestSingleSchema(schema));
        }
        return Digester.combineDigestedObjectSchemas(digestedSchemas);
    };
    Digester.combineDigestedObjectSchemas = function (digestedSchemas) {
        if (digestedSchemas.length === 0)
            throw new Errors.IllegalArgumentError("At least one DigestedObjectSchema needs to be specified.");
        var combinedSchema = new DigestedObjectSchema();
        combinedSchema.vocab = digestedSchemas[0].vocab;
        combinedSchema.base = digestedSchemas[0].base;
        combinedSchema.language = digestedSchemas[0].language;
        for (var _i = 0, digestedSchemas_1 = digestedSchemas; _i < digestedSchemas_1.length; _i++) {
            var digestedSchema = digestedSchemas_1[_i];
            Utils.M.extend(combinedSchema.prefixes, digestedSchema.prefixes);
            Utils.M.extend(combinedSchema.prefixedURIs, digestedSchema.prefixedURIs);
            Utils.M.extend(combinedSchema.properties, digestedSchema.properties);
        }
        Digester.resolvePrefixedURIs(combinedSchema);
        return combinedSchema;
    };
    Digester.resolvePrefixedURI = function (uri, digestedSchema) {
        if (uri === null)
            return null;
        if (!RDF.URI.Util.isPrefixed(uri))
            return uri;
        var _a = uri.split(":"), prefix = _a[0], slug = _a[1];
        if (digestedSchema.prefixes.has(prefix)) {
            uri = digestedSchema.prefixes.get(prefix) + slug;
        }
        return uri;
    };
    Digester._resolvePrefixedURI = function (uri, digestedSchema) {
        if (uri.stringValue === null || !RDF.URI.Util.isPrefixed(uri.stringValue))
            return uri;
        var _a = uri.stringValue.split(":"), prefix = _a[0], slug = _a[1];
        if (digestedSchema.prefixes.has(prefix)) {
            uri.stringValue = digestedSchema.prefixes.get(prefix) + slug;
        }
        else {
            if (!digestedSchema.prefixedURIs.has(prefix))
                digestedSchema.prefixedURIs.set(prefix, []);
            digestedSchema.prefixedURIs.get(prefix).push(uri);
        }
        return uri;
    };
    Digester.digestSingleSchema = function (schema) {
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
                var uri = new RDF.URI.Class(propertyValue);
                if (RDF.URI.Util.isPrefixed(uri.stringValue))
                    uri = Digester._resolvePrefixedURI(uri, digestedSchema);
                digestedSchema.prefixes.set(propertyName, uri);
            }
            else if (!!propertyValue && Utils.isObject(propertyValue)) {
                var schemaDefinition = propertyValue;
                var digestedDefinition = new DigestedPropertyDefinition();
                if ("@id" in schemaDefinition) {
                    if (RDF.URI.Util.isPrefixed(propertyName))
                        throw new Errors.IllegalArgumentError("A prefixed property cannot have assigned another URI.");
                    if (!Utils.isString(schemaDefinition["@id"]))
                        throw new Errors.IllegalArgumentError("@id needs to point to a string");
                    digestedDefinition.uri = Digester._resolvePrefixedURI(new RDF.URI.Class(schemaDefinition["@id"]), digestedSchema);
                }
                else if (RDF.URI.Util.isPrefixed(propertyName)) {
                    digestedDefinition.uri = Digester._resolvePrefixedURI(new RDF.URI.Class(propertyName), digestedSchema);
                }
                else if (digestedSchema.vocab !== null) {
                    digestedDefinition.uri = new RDF.URI.Class(digestedSchema.vocab + propertyName);
                }
                if ("@type" in schemaDefinition) {
                    if (!Utils.isString(schemaDefinition["@type"]))
                        throw new Errors.IllegalArgumentError("@type needs to point to a string");
                    if (schemaDefinition["@type"] === "@id" || schemaDefinition["@type"] === "@vocab") {
                        digestedDefinition.literal = false;
                        digestedDefinition.pointerType = (schemaDefinition["@type"] === "@id") ? PointerType.ID : PointerType.VOCAB;
                    }
                    else {
                        digestedDefinition.literal = true;
                        var type = Digester._resolvePrefixedURI(new RDF.URI.Class(schemaDefinition["@type"]), digestedSchema);
                        if (RDF.URI.Util.isRelative(type.stringValue) && type.stringValue in NS.XSD.DataType)
                            type.stringValue = NS.XSD.DataType[type.stringValue];
                        digestedDefinition.literalType = type;
                    }
                }
                if ("@language" in schemaDefinition) {
                    var language = schemaDefinition["@language"];
                    if (language !== null && !Utils.isString(language))
                        throw new Errors.IllegalArgumentError("@language needs to point to a string or null.");
                    digestedDefinition.language = language;
                }
                if ("@container" in schemaDefinition) {
                    switch (schemaDefinition["@container"]) {
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
                digestedSchema.properties.set(propertyName, digestedDefinition);
            }
            else {
                throw new Errors.IllegalArgumentError("ObjectSchema Properties can only have string values or object values.");
            }
        }
        Digester.resolvePrefixedURIs(digestedSchema);
        return digestedSchema;
    };
    Digester.resolvePrefixedURIs = function (digestedSchema) {
        digestedSchema.prefixes.forEach(function (prefixValue, prefixName) {
            if (!digestedSchema.prefixedURIs.has(prefixName))
                return;
            var prefixedURIs = digestedSchema.prefixedURIs.get(prefixName);
            for (var _i = 0, prefixedURIs_1 = prefixedURIs; _i < prefixedURIs_1.length; _i++) {
                var prefixedURI = prefixedURIs_1[_i];
                Digester._resolvePrefixedURI(prefixedURI, digestedSchema);
            }
            digestedSchema.prefixedURIs.delete(prefixName);
        });
        return digestedSchema;
    };
    return Digester;
}());
exports.Digester = Digester;
var Util = (function () {
    function Util() {
    }
    Util.resolveURI = function (uri, schema) {
        if (RDF.URI.Util.isAbsolute(uri))
            return uri;
        if (RDF.URI.Util.isPrefixed(uri)) {
            uri = Digester.resolvePrefixedURI(uri, schema);
        }
        else if (schema.vocab !== null) {
            uri = schema.vocab + uri;
        }
        return uri;
    };
    return Util;
}());
exports.Util = Util;

//# sourceMappingURL=ObjectSchema.js.map
