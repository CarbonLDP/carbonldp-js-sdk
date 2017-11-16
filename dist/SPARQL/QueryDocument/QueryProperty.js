"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tokens_1 = require("sparqler/tokens");
var ObjectSchema_1 = require("../../ObjectSchema");
var Class = (function () {
    function Class(context, name, pattern) {
        this.name = name;
        this.variable = context.getVariable(name);
        this._context = context;
        this._patterns = [];
        if (pattern)
            this._patterns.push(pattern);
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
    Class.prototype.addOptionalPattern = function () {
        var patterns = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            patterns[_i] = arguments[_i];
        }
        var first = this._patterns[0];
        var patternAdder = first && first.token === "optional" ? first : this;
        patternAdder.addPattern.apply(patternAdder, patterns);
        return this;
    };
    Class.prototype.getPatterns = function () {
        return this._patterns;
    };
    Class.prototype.getOptionalPattern = function () {
        var first = this._patterns[0];
        return first instanceof tokens_1.OptionalToken ? first.patterns : this.getPatterns();
    };
    Class.prototype.getSchema = function () {
        if (!this._schema)
            this._schema = this._context.getSchemaFor({ id: "" });
        return this._schema;
    };
    Class.prototype.addSchema = function (schema) {
        this._schema = ObjectSchema_1.Digester.combineDigestedObjectSchemas([this.getSchema(), schema]);
    };
    Class.prototype.toString = function () {
        return "" + this.variable;
    };
    return Class;
}());
exports.Class = Class;
exports.default = Class;

//# sourceMappingURL=QueryProperty.js.map
