"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var HTTPError_1 = require("./../HTTPError");
var name = "MethodNotAllowedError";
var statusCode = 405;
var MethodNotAllowedError = (function (_super) {
    __extends(MethodNotAllowedError, _super);
    function MethodNotAllowedError() {
        return _super.apply(this, arguments) || this;
    }
    Object.defineProperty(MethodNotAllowedError, "statusCode", {
        get: function () { return statusCode; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MethodNotAllowedError.prototype, "name", {
        get: function () { return name; },
        enumerable: true,
        configurable: true
    });
    return MethodNotAllowedError;
}(HTTPError_1.default));
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = MethodNotAllowedError;

//# sourceMappingURL=MethodNotAllowedError.js.map
