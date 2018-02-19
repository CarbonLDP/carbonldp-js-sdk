"use strict";
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
}
Object.defineProperty(exports, "__esModule", { value: true });
var Errors = __importStar(require("./Errors"));
var NS = __importStar(require("./NS"));
var RDF = __importStar(require("./RDF"));
var Utils = __importStar(require("./Utils"));
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
var Digester = (function () {
    function Digester() {
    }
    Digester.digestSchema = function (schemas) {
        if (!Array.isArray(schemas))
            return Digester._digestSchema(schemas);
        var digestedSchemas = schemas
            .map(function (schema) { return Digester._digestSchema(schema); });
        return Digester._combineSchemas(digestedSchemas);
    };
    Digester.digestProperty = function (name, definition, digestedSchema) {
        var digestedDefinition = new DigestedPropertyDefinition();
        if ("@id" in definition) {
            var uri = definition["@id"];
            if (RDF.URI.Util.isPrefixed(name))
                throw new Errors.IllegalArgumentError("A prefixed property cannot have assigned another URI.");
            if (!Utils.isString(uri))
                throw new Errors.IllegalArgumentError("@id needs to point to a string");
            digestedDefinition.uri = uri;
        }
        else {
            digestedDefinition.uri = name;
        }
        if ("@type" in definition) {
            var type = definition["@type"];
            if (!Utils.isString(type))
                throw new Errors.IllegalArgumentError("@type needs to point to a string");
            if (type === "@id" || type === "@vocab") {
                digestedDefinition.literal = false;
                digestedDefinition.pointerType = type === "@id" ? PointerType.ID : PointerType.VOCAB;
            }
            else {
                if (RDF.URI.Util.isRelative(type) && type in NS.XSD.DataType)
                    type = NS.XSD.DataType[type];
                digestedDefinition.literal = true;
                digestedDefinition.literalType = type;
            }
        }
        if ("@language" in definition) {
            var language = definition["@language"];
            if (language !== null && !Utils.isString(language))
                throw new Errors.IllegalArgumentError("@language needs to point to a string or null.");
            digestedDefinition.literal = true;
            digestedDefinition.language = language;
        }
        if ("@container" in definition) {
            switch (definition["@container"]) {
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
        return digestedSchema ?
            Util.resolveProperty(digestedSchema, digestedDefinition, true) :
            digestedDefinition;
    };
    Digester.combineDigestedObjectSchemas = function (digestedSchemas) {
        if (digestedSchemas.length === 0)
            throw new Errors.IllegalArgumentError("At least one DigestedObjectSchema needs to be specified.");
        digestedSchemas.unshift(new DigestedObjectSchema());
        return Digester._combineSchemas(digestedSchemas);
    };
    Digester._digestSchema = function (schema) {
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
                digestedSchema.prefixes.set(propertyName, propertyValue);
            }
            else if (!!propertyValue && Utils.isObject(propertyValue)) {
                var definition = Digester.digestProperty(propertyName, propertyValue);
                digestedSchema.properties.set(propertyName, definition);
            }
            else {
                throw new Errors.IllegalArgumentError("ObjectSchema Properties can only have string values or object values.");
            }
        }
        return digestedSchema;
    };
    Digester._combineSchemas = function (digestedSchemas) {
        var targetSchema = digestedSchemas[0], restSchemas = digestedSchemas.slice(1);
        restSchemas.forEach(function (schema) {
            if (schema.vocab !== null)
                targetSchema.vocab = schema.vocab;
            if (schema.base !== "")
                targetSchema.base = schema.base;
            if (schema.language !== null)
                targetSchema.language = schema.language;
            Utils.M.extend(targetSchema.prefixes, schema.prefixes);
            Utils.M.extend(targetSchema.properties, schema.properties);
        });
        return targetSchema;
    };
    return Digester;
}());
exports.Digester = Digester;
var Util = (function () {
    function Util() {
    }
    Util.resolveURI = function (uri, schema, relativeTo) {
        if (relativeTo === void 0) { relativeTo = {}; }
        if (uri === null || RDF.URI.Util.isAbsolute(uri) || RDF.URI.Util.isBNodeID(uri))
            return uri;
        var _a = uri.split(":"), prefix = _a[0], _b = _a[1], localName = _b === void 0 ? "" : _b;
        var definedReference = schema.prefixes.has(prefix) ?
            schema.prefixes.get(prefix) : schema.properties.has(prefix) ?
            schema.properties.get(prefix).uri
            : null;
        if (definedReference !== null && definedReference !== prefix) {
            return Util.resolveURI(definedReference + localName, schema, { vocab: true });
        }
        if (localName)
            return uri;
        if (relativeTo.vocab && schema.vocab !== null)
            return schema.vocab + uri;
        if (relativeTo.base)
            return RDF.URI.Util.resolve(schema.base, uri);
        return uri;
    };
    Util.resolveProperty = function (schema, definition, inSame) {
        var uri = definition.uri;
        var type = definition.literalType;
        var resolvedURI = Util.resolveURI(uri, schema, { vocab: true });
        var resolvedType = Util.resolveURI(type, schema, { vocab: true, base: true });
        if (resolvedURI !== uri || resolvedType !== type) {
            definition = inSame ? definition : Utils.O.clone(definition);
            definition.uri = resolvedURI;
            definition.literalType = resolvedType;
        }
        return definition;
    };
    return Util;
}());
exports.Util = Util;

//# sourceMappingURL=ObjectSchema.js.map
