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
var InvalidJSONLDSyntaxError = (function (_super) {
    __extends(InvalidJSONLDSyntaxError, _super);
    function InvalidJSONLDSyntaxError() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Object.defineProperty(InvalidJSONLDSyntaxError.prototype, "name", {
        get: function () { return "InvalidJSONLDSyntaxError"; },
        enumerable: true,
        configurable: true
    });
    return InvalidJSONLDSyntaxError;
}(AbstractError_1.default));
exports.InvalidJSONLDSyntaxError = InvalidJSONLDSyntaxError;
exports.default = InvalidJSONLDSyntaxError;

//# sourceMappingURL=InvalidJSONLDSyntaxError.js.map
