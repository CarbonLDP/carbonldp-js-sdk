"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Class = (function () {
    function Class(context, name, pattern) {
        this._variable = context.getVariable(name);
        this._pattern = pattern;
        this._filters = [];
    }
    Class.prototype.addFilter = function (filter) {
        this._filters.push(filter);
        return this;
    };
    Class.prototype.hasFilters = function () {
        return this._filters.length !== 0;
    };
    Class.prototype.getPatterns = function () {
        return [
            this._pattern
        ].concat(this._filters);
    };
    Class.prototype.toString = function () {
        return "" + this._variable;
    };
    return Class;
}());
exports.Class = Class;
exports.default = Class;

//# sourceMappingURL=QueryProperty.js.map
