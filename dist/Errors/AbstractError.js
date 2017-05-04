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
var Class = (function (_super) {
    __extends(Class, _super);
    function Class(message) {
        var _this = _super.call(this, message) || this;
        Object.setPrototypeOf(_this, Class.prototype);
        if ("captureStackTrace" in Error)
            Error.captureStackTrace(_this, _this.constructor);
        _this.message = message;
        return _this;
    }
    Object.defineProperty(Class.prototype, "name", {
        get: function () { return "AbstractError"; },
        enumerable: true,
        configurable: true
    });
    Class.prototype.toString = function () {
        return this.name + ": " + this.message;
    };
    return Class;
}(Error));
exports.Class = Class;
exports.default = Class;

//# sourceMappingURL=AbstractError.js.map
