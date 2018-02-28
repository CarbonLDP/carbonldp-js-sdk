"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var iri_1 = require("sparqler/iri");
var tokens_1 = require("sparqler/tokens");
var IllegalArgumentError_1 = require("../../Errors/IllegalArgumentError");
var ObjectSchema_1 = require("../../ObjectSchema");
var QueryVariable_1 = require("./QueryVariable");
var QueryContext = (function () {
    function QueryContext(context) {
        this.context = context;
        this._variablesCounter = 0;
        this._variablesMap = new Map();
        this._prefixesMap = new Map();
    }
    QueryContext.prototype.getVariable = function (name) {
        if (this._variablesMap.has(name))
            return this._variablesMap.get(name);
        var variable = new QueryVariable_1.QueryVariable(name, this._variablesCounter++);
        this._variablesMap.set(name, variable);
        return variable;
    };
    QueryContext.prototype.serializeLiteral = function (type, value) {
        if (!this.context || !this.context.documents.jsonldConverter.literalSerializers.has(type))
            return "" + value;
        return this.context.documents.jsonldConverter.literalSerializers.get(type).serialize(value);
    };
    QueryContext.prototype.compactIRI = function (iri) {
        if (!this.context) {
            if (iri_1.isPrefixed(iri))
                return new tokens_1.PrefixedNameToken(iri);
            return new tokens_1.IRIToken(iri);
        }
        var schema = this.context.getObjectSchema();
        var namespace;
        var localName;
        if (!iri_1.isPrefixed(iri)) {
            for (var _i = 0, _a = Array.from(schema.prefixes.entries()); _i < _a.length; _i++) {
                var _b = _a[_i], prefixName = _b[0], prefixURI = _b[1];
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
                throw new IllegalArgumentError_1.IllegalArgumentError("Prefix \"" + namespace + "\" has not been declared.");
            var prefixIRI = new tokens_1.IRIToken(schema.prefixes.get(namespace));
            this._prefixesMap.set(namespace, new tokens_1.PrefixToken(namespace, prefixIRI));
        }
        return prefixedName;
    };
    QueryContext.prototype.getPrologues = function () {
        return Array.from(this._prefixesMap.values());
    };
    QueryContext.prototype.getGeneralSchema = function () {
        if (!this.context)
            return new ObjectSchema_1.DigestedObjectSchema();
        return this.context.documents.getGeneralSchema();
    };
    QueryContext.prototype.hasSchemaFor = function (object, path) {
        if (!this.context)
            return false;
        return this.context.documents.hasSchemaFor(object);
    };
    QueryContext.prototype.getSchemaFor = function (object, path) {
        if (!this.context)
            return new ObjectSchema_1.DigestedObjectSchema();
        return this.context.documents.getSchemaFor(object);
    };
    return QueryContext;
}());
exports.QueryContext = QueryContext;
exports.default = QueryContext;

//# sourceMappingURL=QueryContext.js.map
