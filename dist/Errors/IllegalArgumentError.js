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
var IllegalArgumentError = (function (_super) {
    __extends(IllegalArgumentError, _super);
    function IllegalArgumentError() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Object.defineProperty(IllegalArgumentError.prototype, "name", {
        get: function () { return "IllegalArgumentError"; },
        enumerable: true,
        configurable: true
    });
    return IllegalArgumentError;
}(AbstractError_1.default));
exports.IllegalArgumentError = IllegalArgumentError;
exports.default = IllegalArgumentError;

//# sourceMappingURL=IllegalArgumentError.js.map
