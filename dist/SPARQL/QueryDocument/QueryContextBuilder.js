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
var Errors_1 = require("../../Errors");
var QueryContext = require("./QueryContext");
var QueryProperty = require("./QueryProperty");
var Utils_1 = require("./Utils");
var Class = (function (_super) {
    __extends(Class, _super);
    function Class(context) {
        var _this = _super.call(this, context) || this;
        _this._propertiesMap = new Map();
        return _this;
    }
    Class.prototype.hasProperty = function (name) {
        return this._propertiesMap.has(name);
    };
    Class.prototype.hasProperties = function (name) {
        name += ".";
        return Array.from(this._propertiesMap.keys())
            .some(function (key) { return key.startsWith(name); });
    };
    Class.prototype.addProperty = function (name, pattern) {
        var property = new QueryProperty.Class(this, name, pattern);
        this._propertiesMap.set(name, property);
        return property;
    };
    Class.prototype.getProperty = function (name) {
        return this._propertiesMap.get(name);
    };
    Class.prototype.getProperties = function (propertyLevel) {
        var levelRegex = Utils_1.getLevelRegExp(propertyLevel);
        return Array.from(this._propertiesMap.entries())
            .filter(function (_a) {
            var name = _a[0];
            return levelRegex.test(name);
        })
            .map(function (_a) {
            var name = _a[0], property = _a[1];
            return property;
        });
    };
    Class.prototype.getInheritTypeDefinition = function (propertyName, propertyURI, existingSchema) {
        if (existingSchema === void 0) { existingSchema = this.context.getObjectSchema(); }
        var schemas = [existingSchema].concat(this._getTypeSchemas());
        for (var _i = 0, schemas_1 = schemas; _i < schemas_1.length; _i++) {
            var schema = schemas_1[_i];
            if (!schema.properties.has(propertyName))
                continue;
            var digestedProperty = schema.properties.get(propertyName);
            if (propertyURI && digestedProperty.uri.stringValue !== propertyURI)
                continue;
            return digestedProperty;
        }
    };
    Class.prototype.getSchemaFor = function (object, path) {
        if (path === void 0)
            return _super.prototype.getSchemaFor.call(this, object);
        var property = this._propertiesMap.get(path);
        if (!property)
            throw new Errors_1.IllegalArgumentError("Schema path \"" + path + "\" does not exists.");
        return property.getSchema();
    };
    Class.prototype._getTypeSchemas = function () {
        var _this = this;
        if (this._schemas)
            return this._schemas;
        var schemasTypes = new Set();
        (function addSchemasTypes(context) {
            if (!context)
                return;
            Array.from(context["typeObjectSchemaMap"].keys()).forEach(schemasTypes.add, schemasTypes);
            addSchemasTypes(context.parentContext);
        })(this.context);
        this._schemas = [];
        schemasTypes.forEach(function (type) { return _this._schemas.push(_this.context.getObjectSchema(type)); });
        return this._schemas;
    };
    return Class;
}(QueryContext.Class));
exports.Class = Class;
exports.default = Class;

//# sourceMappingURL=QueryContextBuilder.js.map
