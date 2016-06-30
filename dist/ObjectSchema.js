"use strict";
var Errors = require("./Errors");
var RDF = require("./RDF");
var Utils = require("./Utils");
(function (ContainerType) {
    ContainerType[ContainerType["SET"] = 0] = "SET";
    ContainerType[ContainerType["LIST"] = 1] = "LIST";
    ContainerType[ContainerType["LANGUAGE"] = 2] = "LANGUAGE";
})(exports.ContainerType || (exports.ContainerType = {}));
var ContainerType = exports.ContainerType;
var DigestedObjectSchema = (function () {
    function DigestedObjectSchema() {
        this.base = "";
        this.vocab = "";
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
        this.language = null;
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
        if (!RDF.URI.Util.isPrefixed(uri.stringValue))
            return uri;
        var uriParts = uri.stringValue.split(":");
        var prefix = uriParts[0];
        var slug = uriParts[1];
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
        for (var propertyName in schema) {
            if (!schema.hasOwnProperty(propertyName))
                continue;
            if (propertyName === "@reverse")
                continue;
            if (propertyName === "@index")
                continue;
            var propertyValue = schema[propertyName];
            if (propertyName === "@base" || propertyName === "@vocab") {
                if (!Utils.isString(propertyValue))
                    throw new Errors.IllegalArgumentError("The value of '" + propertyName + "' must be a string or null.");
                digestedSchema[propertyName.substr(1)] = propertyValue;
                continue;
            }
            if (Utils.isString(propertyValue)) {
                if (RDF.URI.Util.isPrefixed(propertyName))
                    throw new Errors.IllegalArgumentError("A prefixed property cannot be equal to another URI.");
                var uri = new RDF.URI.Class(propertyValue);
                if (RDF.URI.Util.isPrefixed(uri.stringValue))
                    uri = Digester.resolvePrefixedURI(uri, digestedSchema);
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
                    digestedDefinition.uri = Digester.resolvePrefixedURI(new RDF.URI.Class(schemaDefinition["@id"]), digestedSchema);
                }
                else if (RDF.URI.Util.isPrefixed(propertyName)) {
                    digestedDefinition.uri = Digester.resolvePrefixedURI(new RDF.URI.Class(propertyName), digestedSchema);
                }
                else {
                    throw new Errors.IllegalArgumentError("Every property definition needs to have a uri defined.");
                }
                if ("@type" in schemaDefinition) {
                    if (!Utils.isString(schemaDefinition["@type"]))
                        throw new Errors.IllegalArgumentError("@type needs to point to a string");
                    if (schemaDefinition["@type"] === "@id") {
                        digestedDefinition.literal = false;
                    }
                    else {
                        digestedDefinition.literal = true;
                        digestedDefinition.literalType = Digester.resolvePrefixedURI(new RDF.URI.Class(schemaDefinition["@type"]), digestedSchema);
                    }
                }
                if ("@language" in schemaDefinition) {
                    if (!Utils.isString(schemaDefinition["@language"]))
                        throw new Errors.IllegalArgumentError("@language needs to point to a string");
                    digestedDefinition.language = schemaDefinition["@language"];
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
                            if (digestedDefinition.language !== null)
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
                Digester.resolvePrefixedURI(prefixedURI, digestedSchema);
            }
            digestedSchema.prefixedURIs.delete(prefixName);
        });
        return digestedSchema;
    };
    return Digester;
}());
exports.Digester = Digester;

//# sourceMappingURL=ObjectSchema.js.map
