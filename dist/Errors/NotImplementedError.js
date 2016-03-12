"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var AbstractError_1 = require("./AbstractError");
var NotImplementedError = (function (_super) {
    __extends(NotImplementedError, _super);
    function NotImplementedError(message) {
        if (message === void 0) { message = ""; }
        _super.call(this, message);
    }
    Object.defineProperty(NotImplementedError.prototype, "name", {
        get: function () { return "NotImplementedError"; },
        enumerable: true,
        configurable: true
    });
    return NotImplementedError;
}(AbstractError_1.default));
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = NotImplementedError;

//# sourceMappingURL=NotImplementedError.js.map
