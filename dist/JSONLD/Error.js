"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var AbstractError_1 = require("./../Errors/AbstractError");
var InvalidJSONLDSyntax = (function (_super) {
    __extends(InvalidJSONLDSyntax, _super);
    function InvalidJSONLDSyntax() {
        _super.apply(this, arguments);
    }
    Object.defineProperty(InvalidJSONLDSyntax.prototype, "name", {
        get: function () { return "InvalidJSONLDSyntax"; },
        enumerable: true,
        configurable: true
    });
    return InvalidJSONLDSyntax;
}(AbstractError_1.default));
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = InvalidJSONLDSyntax;

//# sourceMappingURL=Error.js.map
