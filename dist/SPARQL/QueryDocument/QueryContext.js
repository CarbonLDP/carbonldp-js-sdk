"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var iri_1 = require("sparqler/iri");
var tokens_1 = require("sparqler/tokens");
var ObjectSchema_1 = require("../../ObjectSchema");
var QueryProperty = require("./QueryProperty");
var QueryVariable = require("./QueryVariable");
var Class = (function () {
    function Class(context) {
        this._context = context;
        this._propertiesMap = new Map();
        this._variablesCounter = 0;
        this._variablesMap = new Map();
        this._prefixesMap = new Map();
    }
    Object.defineProperty(Class.prototype, "context", {
        get: function () { return this._context; },
        enumerable: true,
        configurable: true
    });
    Class.prototype.getVariable = function (name) {
        if (this._variablesMap.has(name))
            return this._variablesMap.get(name);
        var variable = new QueryVariable.Class(name, this._variablesCounter++);
        this._variablesMap.set(name, variable);
        return variable;
    };
    Class.prototype.hasProperties = function (propertyName) {
        propertyName += ".";
        return Array.from(this._propertiesMap.keys())
            .some(function (key) { return key.startsWith(propertyName); });
    };
    Class.prototype.addProperty = function (name, pattern) {
        var property = new QueryProperty.Class(this, name, pattern);
        this._propertiesMap.set(name, property);
        return property;
    };
    Class.prototype.getProperty = function (name) {
        if (!this._propertiesMap.has(name))
            throw new Error("The \"" + name + "\" property was not declared.");
        return this._propertiesMap.get(name);
    };
    Class.prototype.serializeLiteral = function (type, value) {
        type = this.expandIRI(type);
        if (!this._context.documents.jsonldConverter.literalSerializers.has(type))
            return "" + value;
        return this._context.documents.jsonldConverter.literalSerializers.get(type).serialize(value);
    };
    Class.prototype.expandIRI = function (iri) {
        var vocab = this._context.hasSetting("vocabulary") ? this._context.resolve(this._context.getSetting("vocabulary")) : void 0;
        iri = ObjectSchema_1.Util.resolveURI(iri, this._context.getObjectSchema(), vocab);
        if (iri_1.isPrefixed(iri))
            throw new Error("Prefix \"" + iri.split(":")[0] + "\" has not been declared.");
        return iri;
    };
    Class.prototype.compactIRI = function (iri) {
        var schema = this.context.getObjectSchema();
        var namespace;
        var localName;
        if (!iri_1.isPrefixed(iri)) {
            for (var _i = 0, _a = Array.from(schema.prefixes.entries()); _i < _a.length; _i++) {
                var _b = _a[_i], prefixName = _b[0], prefixURI = _b[1].stringValue;
                if (!iri.startsWith(prefixURI))
                    continue;
                namespace = prefixName;
                localName = iri.substr(prefixURI.length);
                break;
            }
            if (namespace === void 0)
                return new tokens_1.IRIToken(iri);
        }
        var prefixedName = new tokens_1.PrefixedNameToken(namespace || iri, localName);
        namespace = prefixedName.namespace;
        if (!this._prefixesMap.has(namespace)) {
            if (!schema.prefixes.has(namespace))
                throw new Error("Prefix \"" + namespace + "\" has not been declared.");
            var prefixIRI = new tokens_1.IRIToken(schema.prefixes.get(namespace).stringValue);
            this._prefixesMap.set(namespace, new tokens_1.PrefixToken(namespace, prefixIRI));
        }
        return prefixedName;
    };
    Class.prototype.getInheritTypeDefinition = function (propertyName, propertyURI, context) {
        if (context === void 0) { context = this._context; }
        if (context === null)
            return null;
        var typeSchemas = Array.from(context["typeObjectSchemaMap"].values());
        for (var _i = 0, typeSchemas_1 = typeSchemas; _i < typeSchemas_1.length; _i++) {
            var schema = typeSchemas_1[_i];
            if (!schema.properties.has(propertyName))
                continue;
            var digestedProperty = schema.properties.get(propertyName);
            if (propertyURI && digestedProperty.uri.stringValue !== propertyURI)
                continue;
            return digestedProperty;
        }
        return this.getInheritTypeDefinition(propertyName, propertyURI, context.parentContext);
    };
    return Class;
}());
exports.Class = Class;
exports.default = Class;

//# sourceMappingURL=QueryContext.js.map
