"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Class = (function () {
    function Class(context, name, pattern) {
        this.name = name;
        this.variable = context.getVariable(name);
        this._patterns = [pattern];
    }
    Class.prototype.addPattern = function (pattern) {
        this._patterns.push(pattern);
        return this;
    };
    Class.prototype.hasFilters = function () {
        return this._patterns.some(function (pattern) { return pattern.token === "filter"; });
    };
    Class.prototype.getPatterns = function () {
        return this._patterns;
    };
    Class.prototype.toString = function () {
        return "" + this.variable;
    };
    return Class;
}());
exports.Class = Class;
exports.default = Class;

//# sourceMappingURL=QueryProperty.js.map
