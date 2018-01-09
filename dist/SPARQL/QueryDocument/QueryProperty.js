"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tokens_1 = require("sparqler/tokens");
var ObjectSchema_1 = require("../../ObjectSchema");
var Utils_1 = require("./Utils");
var PropertyType;
(function (PropertyType) {
    PropertyType[PropertyType["FULL"] = 0] = "FULL";
    PropertyType[PropertyType["PARTIAL"] = 1] = "PARTIAL";
})(PropertyType = exports.PropertyType || (exports.PropertyType = {}));
var Class = (function () {
    function Class(context, name) {
        this.name = name;
        this.variable = context.getVariable(name);
        this._optional = true;
        this._context = context;
        this._patterns = [];
    }
    Class.prototype.addPattern = function () {
        var patterns = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            patterns[_i] = arguments[_i];
        }
        (_a = this._patterns).push.apply(_a, patterns);
        return this;
        var _a;
    };
    Class.prototype.getPatterns = function () {
        var patterns = this._patterns.slice();
        if (this._type !== void 0) {
            var fn = this._type === PropertyType.PARTIAL ? Utils_1.createTypesPattern : Utils_1.createGraphPattern;
            var index = patterns.findIndex(function (pattern) { return pattern === void 0; });
            patterns[index] = fn(this._context, this.name);
        }
        if (!this._optional)
            return patterns;
        return [(_a = new tokens_1.OptionalToken()).addPattern.apply(_a, patterns),];
        var _a;
    };
    Class.prototype.getSchema = function () {
        if (this._schema)
            return this._schema;
        this._schema = new ObjectSchema_1.DigestedObjectSchema();
        this._schema.vocab = this._context.expandIRI("") || null;
        return this._schema;
    };
    Class.prototype.isOptional = function () {
        return this._optional;
    };
    Class.prototype.setOptional = function (optional) {
        this._optional = optional;
        return this;
    };
    Class.prototype.getType = function () {
        return this._type;
    };
    Class.prototype.setType = function (type) {
        if (this._type === void 0)
            this._patterns.push(void 0);
        this._type = type;
        return this;
    };
    Class.prototype.getTriple = function () {
        return this._patterns
            .find(function (pattern) { return pattern instanceof tokens_1.SubjectToken; });
    };
    Class.prototype.toString = function () {
        return "" + this.variable;
    };
    return Class;
}());
exports.Class = Class;
exports.default = Class;

//# sourceMappingURL=QueryProperty.js.map
