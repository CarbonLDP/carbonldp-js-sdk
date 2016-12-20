"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var HTTPError_1 = require("./../HTTPError");
var name = "UnsupportedMediaTypeError";
var statusCode = 415;
var UnsupportedMediaTypeError = (function (_super) {
    __extends(UnsupportedMediaTypeError, _super);
    function UnsupportedMediaTypeError(message, response) {
        var _this = _super.call(this, message, response) || this;
        Object.setPrototypeOf(_this, UnsupportedMediaTypeError.prototype);
        return _this;
    }
    Object.defineProperty(UnsupportedMediaTypeError, "statusCode", {
        get: function () { return statusCode; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(UnsupportedMediaTypeError.prototype, "name", {
        get: function () { return name; },
        enumerable: true,
        configurable: true
    });
    return UnsupportedMediaTypeError;
}(HTTPError_1.default));
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = UnsupportedMediaTypeError;

//# sourceMappingURL=UnsupportedMediaTypeError.js.map
