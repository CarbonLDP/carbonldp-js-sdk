"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var HTTPError_1 = require("./../HTTPError");
var name = "ConflictError";
var statusCode = 409;
var ConflictError = (function (_super) {
    __extends(ConflictError, _super);
    function ConflictError(message, response) {
        var _this = _super.call(this, message, response) || this;
        Object.setPrototypeOf(_this, ConflictError.prototype);
        return _this;
    }
    Object.defineProperty(ConflictError, "statusCode", {
        get: function () { return statusCode; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ConflictError.prototype, "name", {
        get: function () { return name; },
        enumerable: true,
        configurable: true
    });
    return ConflictError;
}(HTTPError_1.default));
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = ConflictError;

//# sourceMappingURL=ConflictError.js.map
