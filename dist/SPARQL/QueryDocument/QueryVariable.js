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
var tokens_1 = require("sparqler/tokens");
var Class = (function (_super) {
    __extends(Class, _super);
    function Class(name, index) {
        var _this = _super.call(this, name
            .replace(/[:]/g, "_")
            .replace(/[.]/g, "__")) || this;
        _this.index = index;
        return _this;
    }
    Class.prototype.toString = function () {
        if (process.env.NODE_ENV === "prod")
            return "?_" + this.index;
        return _super.prototype.toString.call(this);
    };
    return Class;
}(tokens_1.VariableToken));
exports.Class = Class;
exports.default = Class;

//# sourceMappingURL=QueryVariable.js.map
