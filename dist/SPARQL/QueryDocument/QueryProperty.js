"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tokens_1 = require("sparqler/tokens");
var ObjectSchema_1 = require("../../ObjectSchema");
var Class = (function () {
    function Class(context, name, isOptional) {
        if (isOptional === void 0) { isOptional = true; }
        this.name = name;
        this.variable = context.getVariable(name);
        this._optional = isOptional;
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
        if (!this._optional)
            return this._patterns;
        return [(_a = new tokens_1.OptionalToken()).addPattern.apply(_a, this._patterns),];
        var _a;
    };
    Class.prototype.getSchema = function () {
        if (this._schema)
            return this._schema;
        this._schema = new ObjectSchema_1.DigestedObjectSchema();
        this._schema.vocab = this._context.expandIRI("") || null;
        return this._schema;
    };
    Class.prototype.setOptional = function (optional) {
        this._optional = optional;
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
