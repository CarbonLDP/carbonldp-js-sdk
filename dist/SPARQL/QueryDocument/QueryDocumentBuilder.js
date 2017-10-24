"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tokens_1 = require("sparqler/tokens");
var ObjectSchema_1 = require("../../ObjectSchema");
var Utils_1 = require("../../Utils");
var QueryObject = require("./QueryObject");
var QueryValue = require("./QueryValue");
var inherit = Object.freeze({});
var Class = (function () {
    function Class(queryContext, property) {
        this.inherit = inherit;
        this._context = queryContext;
        this._schema = queryContext.context.documents.getSchemaFor({});
        this._document = property
            .addPattern(new tokens_1.SubjectToken(property.variable)
            .addPredicate(this._typesPredicate = new tokens_1.PredicateToken("a")
            .addObject(queryContext.getVariable(property.name + "___type"))));
    }
    Class.prototype.property = function (name) {
        return this._context.getProperty(this._document.name + "." + name);
    };
    Class.prototype.value = function (value) {
        return new QueryValue.Class(this._context, value);
    };
    Class.prototype.object = function (object) {
        return new QueryObject.Class(this._context, object);
    };
    Class.prototype.withType = function (type) {
        if (this._context.hasProperties(this._document.name))
            throw new Error("Types must be specified before the properties.");
        type = this._context.expandIRI(type);
        this._typesPredicate.addObject(this._context.compactIRI(type));
        var schema = this._context.context.getObjectSchema(type);
        if (schema)
            this._schema = ObjectSchema_1.Digester.combineDigestedObjectSchemas([this._schema, schema]);
        return this;
    };
    Class.prototype.properties = function (propertiesSchema) {
        for (var propertyName in propertiesSchema) {
            var queryProperty = propertiesSchema[propertyName];
            var propertyDefinition = Utils_1.isObject(queryProperty) ? queryProperty : { "@id": queryProperty };
            var _a = this.addPropertyDefinition(propertyName, propertyDefinition), uri = _a.uri, literalType = _a.literalType;
            var name_1 = this._document.name + "." + propertyName;
            var propertyPath = this._context.compactIRI(uri.stringValue);
            var propertyObject = this._context.getVariable(name_1);
            var propertyPattern = new tokens_1.OptionalToken()
                .addPattern(new tokens_1.SubjectToken(this._document.variable)
                .addPredicate(new tokens_1.PredicateToken(propertyPath)
                .addObject(propertyObject)));
            if (literalType)
                propertyPattern
                    .addPattern(new tokens_1.FilterToken("datatype( " + propertyObject + " ) = " + this._context.compactIRI(literalType.stringValue)));
            this._context.addProperty(name_1, propertyPattern);
        }
        return this;
    };
    Class.prototype.addPropertyDefinition = function (propertyName, propertyDefinition) {
        var digestedDefinition = ObjectSchema_1.Digester.digestPropertyDefinition(this._schema, propertyName, propertyDefinition);
        var inheritDefinition = this._schema.properties.has(propertyName) ?
            this._schema.properties.get(propertyName) : this._context.getInheritTypeDefinition(propertyName, digestedDefinition.uri && digestedDefinition.uri.stringValue);
        if (inheritDefinition) {
            for (var key in inheritDefinition) {
                if (key !== "uri" && key in digestedDefinition)
                    continue;
                digestedDefinition[key] = inheritDefinition[key];
            }
        }
        if (!digestedDefinition.uri)
            throw new Error("Invalid property \"" + propertyName + "\" definition, URI \"@id\" is missing.");
        this._schema.properties.set(propertyName, digestedDefinition);
        return digestedDefinition;
    };
    return Class;
}());
exports.Class = Class;
exports.default = Class;

//# sourceMappingURL=QueryDocumentBuilder.js.map
