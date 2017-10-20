"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Class = (function () {
    function Class(context, name) {
        this._variable = context.getVariable(name);
    }
    Class.prototype.toString = function () {
        return "" + this._variable;
    };
    return Class;
}());
exports.Class = Class;
exports.default = Class;

//# sourceMappingURL=QueryProperty.js.map
