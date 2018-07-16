"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var IllegalArgumentError_1 = require("../Errors/IllegalArgumentError");
var DigestedObjectSchema_1 = require("../ObjectSchema/DigestedObjectSchema");
var ObjectSchemaDigester_1 = require("../ObjectSchema/ObjectSchemaDigester");
var ObjectSchemaUtils_1 = require("../ObjectSchema/ObjectSchemaUtils");
var QueryContext_1 = require("./QueryContext");
var QueryProperty_1 = require("./QueryProperty");
var Utils_1 = require("./Utils");
var QueryContextBuilder = (function (_super) {
    __extends(QueryContextBuilder, _super);
    function QueryContextBuilder(context) {
        var _this = _super.call(this, context) || this;
        _this._propertiesMap = new Map();
        return _this;
    }
    QueryContextBuilder.prototype.hasProperty = function (name) {
        return this._propertiesMap.has(name);
    };
    QueryContextBuilder.prototype.hasProperties = function (name) {
        var levelRegex = Utils_1._getLevelRegExp(name);
        return Array.from(this._propertiesMap.keys())
            .some(function (propertyName) { return levelRegex.test(propertyName); });
    };
    QueryContextBuilder.prototype.addProperty = function (name) {
        var property = new QueryProperty_1.QueryProperty(this, name);
        this._propertiesMap.set(name, property);
        return property;
    };
    QueryContextBuilder.prototype.getProperty = function (name) {
        return this._propertiesMap.get(name);
    };
    QueryContextBuilder.prototype.getProperties = function (name) {
        var levelRegex = Utils_1._getLevelRegExp(name);
        return Array.from(this._propertiesMap.entries())
            .filter(function (_a) {
            var propertyName = _a[0];
            return levelRegex.test(propertyName);
        })
            .map(function (_a) {
            var propertyName = _a[0], property = _a[1];
            return property;
        });
    };
    QueryContextBuilder.prototype.getInheritTypeDefinition = function (existingSchema, propertyName, propertyURI) {
        var schemas = [existingSchema].concat(this.__getTypeSchemas());
        for (var _i = 0, schemas_1 = schemas; _i < schemas_1.length; _i++) {
            var schema = schemas_1[_i];
            if (!schema.properties.has(propertyName))
                continue;
            var mergeSchema = ObjectSchemaDigester_1.ObjectSchemaDigester.combineDigestedObjectSchemas([existingSchema, schema]);
            var digestedProperty = ObjectSchemaUtils_1.ObjectSchemaUtils._resolveProperty(mergeSchema, schema.properties.get(propertyName));
            if (!propertyURI || propertyURI === digestedProperty.uri)
                return digestedProperty;
        }
    };
    QueryContextBuilder.prototype.hasSchemaFor = function (object, path) {
        if (path === void 0)
            return _super.prototype.hasSchemaFor.call(this, object);
        if (!this.hasProperty(path))
            return false;
        var type = this
            .getProperty(path)
            .getType();
        return type !== void 0 && type !== QueryProperty_1.QueryPropertyType.EMPTY;
    };
    QueryContextBuilder.prototype.getSchemaFor = function (object, path) {
        if (path === void 0)
            return _super.prototype.getSchemaFor.call(this, object);
        var property = this.getProperty(path);
        if (property) {
            switch (property.getType()) {
                case QueryProperty_1.QueryPropertyType.PARTIAL:
                    return this.getProperty(path).getSchema();
                case QueryProperty_1.QueryPropertyType.FULL:
                case QueryProperty_1.QueryPropertyType.ALL:
                    return _super.prototype.getSchemaFor.call(this, object);
                case QueryProperty_1.QueryPropertyType.EMPTY:
                    return new DigestedObjectSchema_1.DigestedObjectSchema();
                default:
                    throw new IllegalArgumentError_1.IllegalArgumentError("Property \"" + path + "\" is not a resource.");
            }
        }
        var parent = this.getProperty(Utils_1._getParentPath(path));
        if (!parent || parent.getType() !== QueryProperty_1.QueryPropertyType.FULL)
            throw new IllegalArgumentError_1.IllegalArgumentError("Schema path \"" + path + "\" does not exists.");
        return _super.prototype.getSchemaFor.call(this, object);
    };
    QueryContextBuilder.prototype.__getTypeSchemas = function () {
        if (this._schemas)
            return this._schemas;
        return this._schemas = this.context ?
            this.context._getTypeObjectSchemas() :
            [];
    };
    return QueryContextBuilder;
}(QueryContext_1.QueryContext));
exports.QueryContextBuilder = QueryContextBuilder;

//# sourceMappingURL=QueryContextBuilder.js.map
