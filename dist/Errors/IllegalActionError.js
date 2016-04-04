"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var AbstractError_1 = require("./AbstractError");
var IllegalActionError = (function (_super) {
    __extends(IllegalActionError, _super);
    function IllegalActionError() {
        _super.apply(this, arguments);
    }
    Object.defineProperty(IllegalActionError.prototype, "name", {
        get: function () { return "IllegalActionError"; },
        enumerable: true,
        configurable: true
    });
    return IllegalActionError;
}(AbstractError_1.default));
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = IllegalActionError;

//# sourceMappingURL=IllegalActionError.js.map
