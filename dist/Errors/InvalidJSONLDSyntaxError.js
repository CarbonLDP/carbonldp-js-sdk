"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var AbstractError_1 = require("./AbstractError");
var InvalidJSONLDSyntaxError = (function (_super) {
    __extends(InvalidJSONLDSyntaxError, _super);
    function InvalidJSONLDSyntaxError() {
        _super.apply(this, arguments);
    }
    Object.defineProperty(InvalidJSONLDSyntaxError.prototype, "name", {
        get: function () { return "InvalidJSONLDSyntaxError"; },
        enumerable: true,
        configurable: true
    });
    return InvalidJSONLDSyntaxError;
}(AbstractError_1.default));
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = InvalidJSONLDSyntaxError;

//# sourceMappingURL=InvalidJSONLDSyntaxError.js.map
