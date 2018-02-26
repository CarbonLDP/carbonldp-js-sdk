"use strict";
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
}
Object.defineProperty(exports, "__esModule", { value: true });
var tokens_1 = require("sparqler/tokens");
var ObjectSchema_1 = require("../../ObjectSchema");
var Utils_1 = require("../../Utils");
var Errors_1 = require("../../Errors");
var QueryObject = __importStar(require("./QueryObject"));
var QueryProperty = __importStar(require("./QueryProperty"));
var QueryValue = __importStar(require("./QueryValue"));
var Utils_2 = require("./Utils");
var INHERIT = Object.freeze({});
exports.ALL = Object.freeze({});
var Class = (function () {
    function Class(queryContext, property) {
        this.inherit = INHERIT;
        this.all = exports.ALL;
        this._context = queryContext;
        property._builder = this;
        this._document = property;
        this._typesTriple = new tokens_1.SubjectToken(property.variable).addPredicate(new tokens_1.PredicateToken("a"));
        this._values = new tokens_1.ValuesToken().addValues(property.variable);
        this._schema = this._context.getSchemaFor({ id: "" });
    }
    Class.prototype.property = function (name) {
        if (name === void 0)
            return this._document;
        var parent = this._document.name;
        while (parent) {
            var fullPath = parent + "." + name;
            if (this._context.hasProperty(fullPath))
                return this._context.getProperty(fullPath);
            var directPath = Utils_2.getParentPath(fullPath);
            if (this._context.hasProperty(directPath)) {
                var direct = this._context.getProperty(directPath);
                var directType = direct.getType();
                if (directType === QueryProperty.PropertyType.FULL || directType === QueryProperty.PropertyType.ALL) {
                    var propertyName = fullPath.substr(directPath.length + 1);
                    return direct._builder._addProperty(propertyName, INHERIT);
                }
            }
            parent = Utils_2.getParentPath(parent);
        }
        throw new Errors_1.IllegalArgumentError("The \"" + name + "\" property was not declared.");
    };
    Class.prototype.value = function (value) {
        return new QueryValue.Class(this._context, value);
    };
    Class.prototype.object = function (object) {
        return new QueryObject.Class(this._context, object);
    };
    Class.prototype.withType = function (type) {
        if (this._context.hasProperties(this._document.name))
            throw new Errors_1.IllegalStateError("Types must be specified before the properties.");
        type = ObjectSchema_1.ObjectSchemaUtils.resolveURI(type, this._schema, { vocab: true, base: true });
        if (!this._typesTriple.predicates[0].objects.length)
            this._document.addPattern(this._typesTriple);
        this._typesTriple.predicates[0].addObject(this._context.compactIRI(type));
        if (!this._context.context)
            return this;
        var schema = this._context.context.getObjectSchema(type);
        if (schema) {
            this._schema = ObjectSchema_1.ObjectSchemaDigester.combineDigestedObjectSchemas([this._schema, schema]);
        }
        return this;
    };
    Class.prototype.properties = function (propertiesSchema) {
        if (propertiesSchema === exports.ALL) {
            this._document.setType(QueryProperty.PropertyType.ALL);
            return this;
        }
        for (var propertyName in propertiesSchema) {
            var queryPropertySchema = propertiesSchema[propertyName];
            var propertyDefinition = Utils_1.isObject(queryPropertySchema) ? queryPropertySchema : { "@id": queryPropertySchema };
            this._addProperty(propertyName, propertyDefinition);
        }
        return this;
    };
    Class.prototype.filter = function (constraint) {
        var baseName = this._document.name.split(".")[0];
        this._context
            .getProperty(baseName)
            .addPattern(new tokens_1.FilterToken(constraint));
        return this;
    };
    Class.prototype.values = function () {
        var values = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            values[_i] = arguments[_i];
        }
        var termTokens = values.map(function (value) {
            var token = value.getToken();
            if (token.token === "blankNode")
                throw new Errors_1.IllegalArgumentError("Blank node \"" + token.label + "\" is not a valid value.");
            return token;
        });
        if (!this._values.values[0].length)
            this._document.addPattern(this._values);
        (_a = this._values.values[0]).push.apply(_a, termTokens);
        var property = this._document;
        while (property.isOptional()) {
            property.setOptional(false);
            var parentPath = Utils_2.getParentPath(property.name);
            property = this._context.getProperty(parentPath);
        }
        return this;
        var _a;
    };
    Class.prototype._addProperty = function (propertyName, propertyDefinition) {
        var digestedDefinition = this.addPropertyDefinition(propertyName, propertyDefinition);
        var name = this._document.name + "." + propertyName;
        var property = (_a = this._context
            .addProperty(name)).addPattern.apply(_a, Utils_2.createPropertyPatterns(this._context, this._document.name, name, digestedDefinition));
        if ("query" in propertyDefinition) {
            if (digestedDefinition.literal === false) {
                property.setType(QueryProperty.PropertyType.PARTIAL);
            }
            var builder = new Class(this._context, property);
            if (builder !== propertyDefinition["query"].call(void 0, builder))
                throw new Errors_1.IllegalArgumentError("The provided query builder was not returned");
        }
        (_b = this._document).addPattern.apply(_b, property.getPatterns());
        return property;
        var _a, _b;
    };
    Class.prototype.addPropertyDefinition = function (propertyName, propertyDefinition) {
        var digestedDefinition = ObjectSchema_1.ObjectSchemaDigester.digestProperty(propertyName, propertyDefinition, this._schema);
        var uri = "@id" in propertyDefinition ? digestedDefinition.uri : void 0;
        var inheritDefinition = this._context.getInheritTypeDefinition(this._schema, propertyName, uri);
        if (inheritDefinition) {
            for (var key in inheritDefinition) {
                if (digestedDefinition[key] !== null && key !== "uri")
                    continue;
                digestedDefinition[key] = inheritDefinition[key];
            }
        }
        if (!digestedDefinition.uri)
            throw new Errors_1.IllegalArgumentError("Invalid property \"" + propertyName + "\" definition, \"@id\" is necessary.");
        this._document.getSchema()
            .properties.set(propertyName, digestedDefinition);
        return digestedDefinition;
    };
    return Class;
}());
exports.Class = Class;
exports.default = Class;

//# sourceMappingURL=QueryDocumentBuilder.js.map
