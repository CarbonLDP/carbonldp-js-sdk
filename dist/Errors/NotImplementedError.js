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
var AbstractError_1 = require("./AbstractError");
var NotImplementedError = (function (_super) {
    __extends(NotImplementedError, _super);
    function NotImplementedError(message) {
        return _super.call(this, message) || this;
    }
    Object.defineProperty(NotImplementedError.prototype, "name", {
        get: function () { return "NotImplementedError"; },
        enumerable: true,
        configurable: true
    });
    return NotImplementedError;
}(AbstractError_1.default));
exports.NotImplementedError = NotImplementedError;
exports.default = NotImplementedError;

//# sourceMappingURL=NotImplementedError.js.map
