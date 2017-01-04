"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var AbstractError_1 = require("./AbstractError");
var IllegalArgumentError = (function (_super) {
    __extends(IllegalArgumentError, _super);
    function IllegalArgumentError(message) {
        var _this = _super.call(this, message) || this;
        Object.setPrototypeOf(_this, IllegalArgumentError.prototype);
        return _this;
    }
    Object.defineProperty(IllegalArgumentError.prototype, "name", {
        get: function () { return "IllegalArgumentError"; },
        enumerable: true,
        configurable: true
    });
    return IllegalArgumentError;
}(AbstractError_1.default));
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = IllegalArgumentError;

//# sourceMappingURL=IllegalArgumentError.js.map
