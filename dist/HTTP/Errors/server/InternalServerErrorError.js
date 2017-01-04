"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var HTTPError_1 = require("./../HTTPError");
var name = "InternalServerErrorError";
var statusCode = 500;
var InternalServerErrorError = (function (_super) {
    __extends(InternalServerErrorError, _super);
    function InternalServerErrorError(message, response) {
        var _this = _super.call(this, message, response) || this;
        Object.setPrototypeOf(_this, InternalServerErrorError.prototype);
        return _this;
    }
    Object.defineProperty(InternalServerErrorError, "statusCode", {
        get: function () { return statusCode; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(InternalServerErrorError.prototype, "name", {
        get: function () { return name; },
        enumerable: true,
        configurable: true
    });
    return InternalServerErrorError;
}(HTTPError_1.default));
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = InternalServerErrorError;

//# sourceMappingURL=InternalServerErrorError.js.map
