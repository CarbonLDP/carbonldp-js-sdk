"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var AbstractError_1 = require("./../../Errors/AbstractError");
var HTTPError = (function (_super) {
    __extends(HTTPError, _super);
    function HTTPError(message, response) {
        _super.call(this, message);
        this.response = response;
    }
    Object.defineProperty(HTTPError, "statusCode", {
        get: function () { return null; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(HTTPError.prototype, "name", {
        get: function () { return "HTTPError"; },
        enumerable: true,
        configurable: true
    });
    return HTTPError;
}(AbstractError_1.default));
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = HTTPError;
