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
var IllegalActionError = (function (_super) {
    __extends(IllegalActionError, _super);
    function IllegalActionError(message) {
        var _this = _super.call(this, message) || this;
        Object.setPrototypeOf(_this, IllegalActionError.prototype);
        return _this;
    }
    Object.defineProperty(IllegalActionError.prototype, "name", {
        get: function () { return "IllegalActionError"; },
        enumerable: true,
        configurable: true
    });
    return IllegalActionError;
}(AbstractError_1.default));
exports.IllegalActionError = IllegalActionError;
exports.default = IllegalActionError;

//# sourceMappingURL=IllegalActionError.js.map
