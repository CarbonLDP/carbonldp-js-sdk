"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
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
    Class.prototype.getSchema = function () {
        if (this._schema)
            return this._schema;
        this._schema = new ObjectSchema_1.DigestedObjectSchema();
        this._schema.vocab = this._context.expandIRI("") || null;
        return this._schema;
    };
    Class.prototype.toString = function () {
        return "" + this.variable;
    };
    return Class;
}());
exports.Class = Class;
exports.default = Class;

//# sourceMappingURL=QueryProperty.js.map
