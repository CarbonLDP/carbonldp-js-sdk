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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
}
Object.defineProperty(exports, "__esModule", { value: true });
var AbstractError_1 = __importDefault(require("./AbstractError"));
var Class = (function (_super) {
    __extends(Class, _super);
    function Class(message) {
        if (message === void 0) { message = ""; }
        var _this = _super.call(this, message) || this;
        Object.setPrototypeOf(_this, Class.prototype);
        return _this;
    }
    Object.defineProperty(Class.prototype, "name", {
        get: function () { return "NotImplementedError"; },
        enumerable: true,
        configurable: true
    });
    return Class;
}(AbstractError_1.default));
exports.Class = Class;
exports.default = Class;

//# sourceMappingURL=NotImplementedError.js.map
